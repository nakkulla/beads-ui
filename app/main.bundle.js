var Gf=Object.create;var Fi=Object.defineProperty;var Kf=Object.getOwnPropertyDescriptor;var Yf=Object.getOwnPropertyNames;var Vf=Object.getPrototypeOf,Xf=Object.prototype.hasOwnProperty;var Qf=(e,t,n)=>t in e?Fi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ji=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Zf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Yf(t))!Xf.call(e,o)&&o!==n&&Fi(e,o,{get:()=>t[o],enumerable:!(r=Kf(t,o))||r.enumerable});return e};var Jf=(e,t,n)=>(n=e!=null?Gf(Vf(e)):{},Zf(t||!e||!e.__esModule?Fi(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>Qf(e,typeof t!="symbol"?t+"":t,n);var Wl=ji((Qv,Ul)=>{var Lr=1e3,Ir=Lr*60,Mr=Ir*60,br=Mr*24,n_=br*7,r_=br*365.25;Ul.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return o_(e);if(n==="number"&&isFinite(e))return t.long?i_(e):s_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function o_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*r_;case"weeks":case"week":case"w":return n*n_;case"days":case"day":case"d":return n*br;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Mr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ir;case"seconds":case"second":case"secs":case"sec":case"s":return n*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function s_(e){var t=Math.abs(e);return t>=br?Math.round(e/br)+"d":t>=Mr?Math.round(e/Mr)+"h":t>=Ir?Math.round(e/Ir)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function i_(e){var t=Math.abs(e);return t>=br?fs(e,t,br,"day"):t>=Mr?fs(e,t,Mr,"hour"):t>=Ir?fs(e,t,Ir,"minute"):t>=Lr?fs(e,t,Lr,"second"):e+" ms"}function fs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Hl=ji((Zv,zl)=>{function a_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Wl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,m,w;function C(...F){if(!C.enabled)return;let z=C,se=Number(new Date),X=se-(_||se);z.diff=X,z.prev=_,z.curr=se,_=se,F[0]=n.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(M,B)=>{if(M==="%%")return"%";N++;let Q=n.formatters[B];if(typeof Q=="function"){let ne=F[N];M=Q.call(z,ne),F.splice(N,1),N--}return M}),n.formatArgs.call(z,F),(z.log||n.log).apply(z,F)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,w=n.enabled(d)),w),set:F=>{h=F}}),typeof n.init=="function"&&n.init(C),C}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,_){let h=0,m=0,w=-1,C=0;for(;h<d.length;)if(m<_.length&&(_[m]===d[h]||_[m]==="*"))_[m]==="*"?(w=m,C=h,m++):(h++,m++);else if(w!==-1)m=w+1,C++,h=C;else return!1;for(;m<_.length&&_[m]==="*";)m++;return m===_.length}function i(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function l(d){for(let _ of n.skips)if(s(d,_))return!1;for(let _ of n.names)if(s(d,_))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}zl.exports=a_});var Gl=ji((dn,_s)=>{dn.formatArgs=c_;dn.save=u_;dn.load=d_;dn.useColors=l_;dn.storage=p_();dn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();dn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function l_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function c_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}dn.log=console.debug||console.log||(()=>{});function u_(e){try{e?dn.storage.setItem("debug",e):dn.storage.removeItem("debug")}catch{}}function d_(){let e;try{e=dn.storage.getItem("debug")||dn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function p_(){try{return localStorage}catch{}}_s.exports=Hl()(dn);var{formatters:f_}=_s.exports;f_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var lo=globalThis,is=lo.trustedTypes,Sl=is?is.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ui="$lit$",Bn=`lit$${Math.random().toFixed(9).slice(2)}$`,Wi="?"+Bn,e_=`<${Wi}>`,_r=document,co=()=>_r.createComment(""),uo=e=>e===null||typeof e!="object"&&typeof e!="function",zi=Array.isArray,Ll=e=>zi(e)||typeof e?.[Symbol.iterator]=="function",Bi=`[ 	
\f\r]`,ao=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,El=/-->/g,Tl=/>/g,pr=RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Cl=/'/g,Rl=/"/g,Il=/^(?:script|style|textarea|title)$/i,Hi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Hi(1),fo=Hi(2),zv=Hi(3),yn=Symbol.for("lit-noChange"),Rt=Symbol.for("lit-nothing"),Ol=new WeakMap,fr=_r.createTreeWalker(_r,129);function Ml(e,t){if(!zi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sl!==void 0?Sl.createHTML(t):t}var Dl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=ao;for(let l=0;l<n;l++){let a=e[l],u,d,_=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===ao?d[1]==="!--"?i=El:d[1]!==void 0?i=Tl:d[2]!==void 0?(Il.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=pr):d[3]!==void 0&&(i=pr):i===pr?d[0]===">"?(i=o??ao,_=-1):d[1]===void 0?_=-2:(_=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?pr:d[3]==='"'?Rl:Cl):i===Rl||i===Cl?i=pr:i===El||i===Tl?i=ao:(i=pr,o=void 0);let m=i===pr&&e[l+1].startsWith("/>")?" ":"";s+=i===ao?a+e_:_>=0?(r.push(u),a.slice(0,_)+Ui+a.slice(_)+Bn+m):a+Bn+(_===-2?l:m)}return[Ml(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},po=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Dl(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(o=fr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let _ of o.getAttributeNames())if(_.endsWith(Ui)){let h=d[i++],m=o.getAttribute(_).split(Bn),w=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:w[2],strings:m,ctor:w[1]==="."?ls:w[1]==="?"?cs:w[1]==="@"?us:gr}),o.removeAttribute(_)}else _.startsWith(Bn)&&(a.push({type:6,index:s}),o.removeAttribute(_));if(Il.test(o.tagName)){let _=o.textContent.split(Bn),h=_.length-1;if(h>0){o.textContent=is?is.emptyScript:"";for(let m=0;m<h;m++)o.append(_[m],co()),fr.nextNode(),a.push({type:2,index:++s});o.append(_[h],co())}}}else if(o.nodeType===8)if(o.data===Wi)a.push({type:2,index:s});else{let _=-1;for(;(_=o.data.indexOf(Bn,_+1))!==-1;)a.push({type:7,index:s}),_+=Bn.length-1}s++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=uo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=mr(e,o._$AS(e,t.values),o,r)),t}var as=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=o;let s=fr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Rr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ds(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=fr.nextNode(),i++)}return fr.currentNode=_r,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Rr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Rt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),uo(t)?t===Rt||t==null||t===""?(this._$AH!==Rt&&this._$AR(),this._$AH=Rt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ll(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Rt&&uo(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=po.createElement(Ml(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new as(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Ol.get(t.strings);return n===void 0&&Ol.set(t.strings,n=new po(t)),n}k(t){zi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(co()),this.O(co()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Rt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Rt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=mr(this,t,n,0),i=!uo(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=mr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!uo(u)||u!==this._$AH[a]),u===Rt?t=Rt:t!==Rt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ls=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Rt?void 0:t}},cs=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Rt)}},us=class extends gr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Rt)===yn)return;let r=this._$AH,o=t===Rt&&r!==Rt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Rt&&(r===Rt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ds=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},Pl={M:Ui,P:Bn,A:Wi,C:1,L:Dl,R:as,D:Ll,V:mr,I:Rr,H:gr,N:cs,U:us,B:ls,F:ds},t_=lo.litHtmlPolyfillSupport;t_?.(po,Rr),(lo.litHtmlVersions??(lo.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Rr(t.insertBefore(co(),s),s,void 0,n??{})}return o._$AI(e),o};var ps="today",Nl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function On(e){return e==="today"?"today":"7d"}function Gi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function hr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ql(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function jl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Bl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Kl=Jf(Gl(),1);function Ct(e){return(0,Kl.default)(`beads-ui:${e}`)}function __(e){let n=Yl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Yl(e){return typeof e=="string"?e.trim():""}function m_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var g_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Dr(e){let t=__(e),n=Yl(m_(e).spec_review),r=g_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function $n(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _o(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ec(e,t){let n=$n(e.created_at),r=$n(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function tc(e,t){let n=$n(e.updated_at),r=$n(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function nc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=$n(e.created_at),s=$n(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function h_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ms,e)}function Yi(e){if(!e||typeof e!="object")return!1;let t=e;return h_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Vl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Xl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Dr(e).evidence==="published"?1:0;case"created":return Vl(e.created_at);case"updated":return Vl(e.updated_at);default:return null}}function Ql(e,t,n){let r=Xl(e,n.key),o=Xl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function oc(e){let t=Array.isArray(e)?e.filter(Yi):[];return(n,r)=>{for(let l of t){let a=Ql(n,r,l);if(a!==0)return a}let o=Ql(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var b_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Zl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Jl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=b_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function sc(e,t){let n=Zl(e),r=Zl(t);if(n!==r)return n<r?-1:1;let o=Jl(e),s=Jl(t);if(o!==s)return o<s?-1:1;let i=$n(e&&e.created_at),l=$n(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ki=2**20;function Pr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$n(e&&e.created_at)}function ic(e){return(t,n)=>{let r=Pr(t,e),o=Pr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Vi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Pr(l,n)-Ki};if(!l)return{rank:Pr(i,n)+Ki};let a=Pr(i,n),u=Pr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ki}))}}function Xi(e,t={}){let n=Ct(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||_o;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function _(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let w=Array.isArray(h.issues)?h.issues:[];for(let C of w)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=m,u();return}if(h.type==="upsert"){let w=h.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let C=r.get(w.id);if(!C)r.set(w.id,w);else{let F=Number.isFinite(C.updated_at)?C.updated_at:0,z=Number.isFinite(w.updated_at)?w.updated_at:0;if(F<=z){for(let se of Object.keys(C))se in w||delete C[se];for(let[se,X]of Object.entries(w))C[se]=X}}d()}s=m,u()}else if(h.type==="delete"){let w=String(h.issue_id||"");w&&(r.delete(w),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:_,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function gs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ac(e){let t=Ct("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let w=n.get(m);if(!w)continue;let C=w.itemsById;for(let F of d)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of _)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of h)typeof F=="string"&&F.length>0&&C.delete(F)}}async function s(l,a){let u=gs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:gs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function lc(){let e=Ct("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let _=u?gs(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,h),m&&h&&_&&h!==_){let w=t.get(a);if(w)try{w.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let F=Xi(a,d);t.set(a,F);let z=F.subscribe(()=>s());o.set(a,z)}else if(!m){let w=Xi(a,d);t.set(a,w);let C=w.subscribe(()=>s());o.set(a,C)}return n.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function uc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Qi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function y_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function v_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function dc(e){let t=Ct("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):y_(r),i=v_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Qi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Qi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var w_=Object.freeze({workspace_config:{default_workspace:null}});function pc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:w_.workspace_config.default_workspace}}}function fc(e={}){let t=Ct("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:pc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?pc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _c(e){let t=Ct("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(_,h)=>{let m=o++,w=Date.now();r.set(m,{type:_,start_ts:w}),t("request start id=%d type=%s count=%d",m,_,n+1),i();let C=!1,F=()=>{C||(C=!0,r.delete(m),l())},z=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,_,Date.now()-w),F())},3e4);try{let se=await u(_,h),X=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",m,_,X),se}catch(se){let X=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,_,X,se),se}finally{clearTimeout(z),F()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Nr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(rc),a;switch(l){case"created_desc":return a.sort(_o),a;case"created_asc":return a.sort(ec),a;case"updated_desc":return a.sort(tc),a;case"priority":return a.sort(nc),a;case"manual":default:{let u=n();return u?a.sort(ic(u)):a.sort(_o),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function nn(e,t){let n=tr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function mc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=tr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ys(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=mc(n);return{total:n.length,count:r,current:o,children:n}}function gc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Vi(l,a,u.order),i);o(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let m=r(Vi(l,a,h.order),i);o(h,m);let w=await t("ui-order-set",{expected_revision:h.revision,entries:m});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:s}}function hc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Un(e,t){let n=hc(e),r=hc(t);return n.length===0||r.length===0?!1:n!==r}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zi(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function bc(e,t){return vs(e).filter(n=>Zi(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function k_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function $_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function x_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${k_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ws(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(sc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?$_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>x_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var A_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},yc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},S_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function E_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function wc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function T_(e){if(!e||e.fill==="none"||!e.approval_state)return wc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function C_(e,t,n,r){let o=A_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=S_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",_=vc[e]||e,h=r?kc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let m=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function kc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ks(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=yc[e.route]||yc.spec_backed,s=e.stages,i=E_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${vc[u]||u} ${u==="plan"?T_(s[u]||{}):wc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>kc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>C_(u,s[u]||{},u===i,r))}
    </div>
  `}function R_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var $c=2;function xc(e){let t=e.slice(0,$c).join(", "),n=e.length-$c;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function O_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Un(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${xc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${xc(s)}</span
      >`),n}function L_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ji(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function $s(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Wn(e){return`${e.kind}:${$s(e)}@${e.sha}`}function xs(e,t){if(!e)return null;let n=Ji(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=Ji(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Wn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Ac(e,t){let n=xs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function I_(e){if(!e)return null;let t=Ji(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Wn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function M_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&nr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Ac(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(l)}`}
        >${`exec ${l.kind==="delegated"?$s(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of bc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&nr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")){let l=L_(e.metadata);l&&o.push(l),o.push(...O_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function D_(e){let t=nn(e.created_at),n=nn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function P_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ws(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:D_(e),empty_label:"children \uC5C6\uC74C",childChips:ea,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ea(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return xs(t,n)?c`<span class="board-card__roll-child-chips">
    ${Ac(t,n)}
    ${I_(n)}
  </span>`:null}function As(e,t){let n=R_(e.priority);return c`
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
      ${M_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?ks(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${P_(e,t)}
    </article>
  `}function qr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Nl.map(s=>c`<option
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
        ${e.items.map(s=>As(s,t))}
      </div>
    </section>
  `}function Sc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>As(r,t))}
        </div>
      </div>
    </dialog>
  `}var N_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],q_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],F_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function j_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Ec(e,t,n){return c`
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
        ${N_.map(r=>c`<option
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
        ${q_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${j_(e,t,n)}
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
        ${F_.map(r=>c`<option
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
  `}var B_=200,U_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},W_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Tc="beads-ui.board.sort",Cc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function z_(){try{let e=window.localStorage.getItem(Tc);if(e&&Cc.has(e))return e}catch{}return"created_desc"}function Rc(e,t){let n=Ct("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||ps,m=o?Nr(o,i):null,w=gc({transport:s,uiOrderStore:i}),C=[],F=[],z=[],se=[],X=[],N=[],L=!1,M=0,B=z_(),Q=new Map,ne=new Map,D=new Map,Y=new Set,U={search:"",priority:"",type:"",labels:[]},Z=!1,Ae=null;function he(S){return String(S.status||"open")==="open"}function ce(S){return String(S.status||"open")==="open"}function q(S){let K=U.search.trim().toLowerCase(),Ie=U.priority,We=U.type,qe=U.labels;return S.filter(et=>{if(K){let Oe=String(et.id||"").toLowerCase(),He=String(et.title||"").toLowerCase();if(!Oe.includes(K)&&!He.includes(K))return!1}if(Ie!==""&&String(et.priority)!==Ie||We!==""&&String(et.issue_type||"")!==We)return!1;if(qe.length>0){let Oe=Array.isArray(et.labels)?et.labels:[];if(!qe.some(He=>Oe.includes(He)))return!1}return!0})}function be(){let S=new Set;for(let K of[C,F,z,se,X,N])for(let Ie of K){let We=Array.isArray(Ie.labels)?Ie.labels:[];for(let qe of We)typeof qe=="string"&&qe.length>0&&S.add(qe)}return Array.from(S).sort()}function xe(){return U.search.trim()!==""||U.priority!==""||U.type!==""||U.labels.length>0}function x(){try{if(m){let S=m.selectBoardColumn("tab:board:in-progress","in_progress",B),K=m.selectBoardColumn("tab:board:blocked","blocked",B).filter(ce),Ie=new Set(S.map(ze=>ze.id)),We=m.selectBoardColumn("tab:board:ready","ready",B).filter(ze=>he(ze)&&!Ie.has(ze.id)),qe=m.selectBoardColumn("tab:board:resolved","resolved",B),et=m.selectBoardColumn("tab:board:deferred","deferred",B),Oe=m.selectBoardColumn("tab:board:closed","closed").slice(0,B_),He=[...K,...We,...S,...qe,...Oe];oe(He);let Ze=new Set;for(let ze of He)ze&&ze.id&&!hs(ze)&&Ze.add(ze.id);let bt=!xe();C=bt?mo(K,Ze):K,F=bt?mo(We,Ze):We,z=bt?mo(S,Ze):S,se=bt?mo(qe,Ze):qe,X=et,M=et.length,N=bt?mo(Oe,Ze):Oe,Q=new Map;for(let ze of C)Q.set(ze.id,"open");for(let ze of F)Q.set(ze.id,"open");for(let ze of z)Q.set(ze.id,"in_progress");for(let ze of se)Q.set(ze.id,"resolved");for(let ze of X)Q.set(ze.id,"deferred");for(let ze of N)Q.set(ze.id,"closed");ne=new Map;for(let ze of C)ne.set(ze.id,"blocked-col");for(let ze of F)ne.set(ze.id,"ready-col");for(let ze of z)ne.set(ze.id,"in-progress-col");for(let ze of se)ne.set(ze.id,"resolved-col");for(let ze of N)ne.set(ze.id,"closed-col")}je()}catch{C=[],F=[],z=[],se=[],X=[],N=[],D=new Map,je()}}function oe(S){D=bs(S)}function $e(S){return ys(D,S)}function de(S){return!Y.has(S)}function Re(S,K){S.preventDefault(),S.stopPropagation(),Y.has(K)?Y.delete(K):Y.add(K),je()}function pe(S,K){S.preventDefault(),S.stopPropagation(),r(K)}function De(S,K){S.preventDefault(),S.stopPropagation(),r(K)}function lt(S,K){Ae||r(K)}function ot(S,K){S.preventDefault(),S.stopPropagation(),H_(K).then(Ie=>{Ie&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function O(S,K){Ae=K,S.dataTransfer&&(S.dataTransfer.setData("text/plain",K),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function ae(S){S.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{Ae=null},0)}function le(S){let K=String(S.target.value||"");!K||K===h||(h=K,u&&u(K),je())}function ie(){return l?l.get():null}function ke(S){let K=a?a.get():null,Ie=K?K.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let We=Ie[S];return!We||typeof We!="object"||Array.isArray(We)?null:We}let ue={onCardClick:lt,onCopyId:ot,onDragStart:O,onDragEnd:ae,onClosedRangeChange:le,rollupFor:$e,isExpanded:de,onRollupToggle:Re,onChildClick:pe,onFromChipClick:De,onOpenDoc:_?(S,K)=>_(K):void 0,cleanupFailureFor:ke,get policy(){return ie()}};function Fe(S,K){Ae||(y(),r(K))}function Ge(S,K){S.preventDefault(),S.stopPropagation(),y(),r(K)}let Qe={...ue,onCardClick:Fe,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:_?(S,K)=>{y(),_(K)}:void 0,get policy(){return ie()}};function Pe(S){let K=S.target,Ie=e.querySelector(".board-filter__labels");K&&Ie&&Ie.contains(K)||Ne()}function V(S){S.key==="Escape"&&Ne()}function j(){Z||(Z=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",V),je())}function Ne(){Z&&(Z=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",V),je())}function ct(S){S.key==="Escape"&&y()}function Je(){L||(L=!0,document.addEventListener("keydown",ct),je())}function y(){L&&(L=!1,document.removeEventListener("keydown",ct),je())}let W={onClose:y,onOverlayClick(S){S.target===S.currentTarget&&y()}},Ee={onSearchInput(S){U.search=String(S.target.value||""),x()},onPriorityChange(S){U.priority=String(S.target.value||""),x()},onTypeChange(S){U.type=String(S.target.value||""),x()},onSortChange(S){let K=String(S.target.value||"");if(!(!Cc.has(K)||K===B)){B=K;try{window.localStorage.setItem(Tc,K)}catch{}x()}},onDeferredToggle(){L?y():Je()},onLabelMenuToggle(){Z?Ne():j()},onLabelToggle(S){let K=U.labels.indexOf(S);K===-1?U.labels.push(S):U.labels.splice(K,1),x()},onLabelClear(){U.labels.length!==0&&(U.labels=[],x())},onNewIssue(){d&&d()}};function Ce(){return c`
      <div class="board-view">
        ${Ec(U,Ee,{sort_mode:B,deferred_popup_open:L,deferred_count:M,label_options:be(),label_menu_open:Z})}
        <div class="board-root">
          ${qr({title:"Blocked",id:"blocked-col",items:q(C)},ue)}
          ${qr({title:"Ready",id:"ready-col",items:q(F)},ue)}
          ${qr({title:"In progress",id:"in-progress-col",items:q(z)},ue)}
          ${qr({title:"Resolved",id:"resolved-col",items:q(se)},ue)}
          ${qr({title:"Closed",id:"closed-col",items:q(N),is_closed:!0,closed_range:h},ue)}
        </div>
        ${L?Sc({items:q(X),count:M},Qe,W):""}
      </div>
    `}function je(){rt(Ce(),e),Ye()}function Ye(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of K)Array.from(Ie.querySelectorAll(".board-card")).forEach((qe,et)=>{qe.tabIndex=et===0?0:-1})}catch{}}async function dt(S,K){if(!s){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:S,status:K}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function wt(S){switch(S){case"blocked-col":return C;case"ready-col":return F;case"in-progress-col":return z;case"resolved-col":return se;default:return[]}}function Lt(S,K,Ie){if(!s||!i)return;let We=wt(S),qe=We.find(bt=>bt.id===K);if(!qe)return;let et=We.filter(bt=>bt.id!==K),Oe=Ie.closest?Ie.closest(".board-card"):null,He=et.length;if(Oe){let bt=Oe.getAttribute("data-issue-id");if(bt===K)return;let ze=et.findIndex(xt=>xt.id===bt);ze>=0&&(He=ze)}let Ze=et.slice();Ze.splice(He,0,qe),w.applyReorder(K,Ze,He)}function kt(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Ie=S.target.closest(".board-column");Ie&&Ie!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),mt=Ie)}),e.addEventListener("dragleave",S=>{let K=S.relatedTarget;(!K||!e.contains(K))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",S=>{S.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let K=S.target,Ie=K.closest(".board-column");if(!Ie)return;let We=S.dataTransfer?.getData("text/plain")||"";if(!We)return;let qe=Ie.id,et=ne.get(We);if(et&&et===qe){if(W_.has(qe)){if(B!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Lt(qe,We,K)}return}let Oe=U_[qe];if(!Oe){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Q.get(We)!==Oe&&dt(We,Oe)}),e.addEventListener("keydown",S=>{let K=S.target;if(!(K instanceof HTMLElement))return;let Ie=String(K.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||K.isContentEditable===!0)return;let We=K.closest(".board-card");if(!We)return;let qe=String(S.key||"");if(qe==="Enter"||qe===" "){S.preventDefault();let Ze=We.getAttribute("data-issue-id");Ze&&r(Ze);return}if(qe!=="ArrowUp"&&qe!=="ArrowDown"&&qe!=="ArrowLeft"&&qe!=="ArrowRight")return;S.preventDefault();let et=We.closest(".board-column");if(!et)return;let Oe=Array.from(et.querySelectorAll(".board-card")),He=Oe.indexOf(We);if(qe==="ArrowDown"&&He<Oe.length-1){Be(We,Oe[He+1]);return}if(qe==="ArrowUp"&&He>0){Be(We,Oe[He-1]);return}if(qe==="ArrowLeft"||qe==="ArrowRight"){let Ze=Array.from(e.querySelectorAll(".board-column")),bt=Ze.indexOf(et),ze=qe==="ArrowRight"?1:-1,xt=bt+ze;for(;xt>=0&&xt<Ze.length;){let qt=Ze[xt].querySelector(".board-card");if(qt){Be(We,qt);return}xt+=ze}}});function Be(S,K){try{S.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let I=null;m&&m.subscribe&&(I=m.subscribe(()=>{try{x()}catch{}}));let J=null;l&&l.subscribe&&(J=l.subscribe(()=>{try{x()}catch{}}));let ye=null;return a&&a.subscribe&&(ye=a.subscribe(()=>{je()})),{async load(){n("load"),x()},clear(){Ne(),y(),I&&(I(),I=null),J&&(J(),J=null),ye&&(ye(),ye=null),e.replaceChildren(),C=[],F=[],z=[],se=[],X=[],N=[],Q=new Map,ne=new Map}}}function mo(e,t){return e.filter(n=>{let r=hs(n);return!(r&&t.has(r))})}async function H_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var tn=e=>e??Rt;async function rn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function yr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function go(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function G_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${yr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${yr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await G_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var K_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Oc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Y_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Bt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Fr(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Ic(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ot(n[e]);return o===null?null:{value:o,source:"global"}}function ho(e,t,n,r){return Ic(e,t,n)||{value:r,source:"base"}}function ta(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Bt(o?.[t])){let i=Ot(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Bt(o)){for(let i of Object.values(o))if(Bt(i)){let l=Ot(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ot(r?.runners?.[s]?.models?.[e]?.id)||e}function V_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function jr(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Fr(e):e;return Tt(e,t,r,e,"explicit")}function Mc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Bt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Bt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function X_(e,t){let n=[],r=e?.implementation?.model_catalog;Bt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Bt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Q_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of X_(t,n)){let s=Mc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function na(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Lc(e,t,n){let r=Ic(e,t,n);return r?jr(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function fn(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Bt(r.session)?r.session:null,s=r?.supported===!0&&Bt(r.orchestration)?r.orchestration:null,i=Bt(e.runner_catalog)?e.runner_catalog:null,l=Ot(n.quick_fix_impl_model),a=Q_(l,o,i),u={};if(o){let d=ho("workflow_mode",t,n,Ot(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):jr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let N=`${X}_model`,L=Ot(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=ho(N,t,n,L);if(M.value===null)u[N]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!Bt(o.review?.reviewers?.[M.value]))u[N]=na(Tt(M.value,M.source,"",null,"explicit"));else{let B=V_(M.value,o);u[N]=Tt(M.value,M.source,Fr(B),B,M.source==="base"?"default":"explicit")}}for(let[X,N]of Object.entries(Oc)){let L=u[N].value;if(L==="self"||L==="skip"){u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Ot(o.review?.reviewers?.[L||""]?.effort),B=ho(X,t,n,M);u[X]=B.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let _=Bt(o.implementation?.default)?o.implementation.default:{},h=Ot(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),w=Bt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&Bt(w[h])?w[h]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=ho(X,t,n,X==="impl_dispatch"?Ot(C.dispatch)||Ot(_.dispatch):Ot(_[X.replace("impl_","")]));u[X]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let F=Ot(t.impl_runtime),z=F==="inherit"?Ot(e.controller_runtime):F,se=h==="quick_fix"&&Ot(t.impl_dispatch)===null&&a.runtime!==null&&(F===null||z===a.runtime);if(se){let X=a.runtime,N=l;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),F===null&&(u.impl_runtime=Tt(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),Ot(t.impl_model)===null&&(u.impl_model=Tt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Ot(e.controller_runtime):u.impl_runtime.value,N=X?Mc(X,o,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=na(u.impl_model);else{let L=ta(u.impl_model.value,X,o,i);u.impl_model.display=Fr(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let X=Ot(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=X?Ot(o.implementation?.effort_by_transport?.[X]?.auto):null;N&&!Y_.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jr("default",u.impl_speed.source))}}else for(let d of K_.filter(_=>!_.startsWith("orchestration_")))u[d]=Lc(d,t,n);if(!o){for(let[d,_]of Object.entries(Oc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Lc(d,t,n);continue}let _=d.replace("orchestration_",""),h=Ot(s[_]),m=ho(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=m.source==="base"?Ot(s.model_id)||m.value:ta(m.value,null,o,i);u[d]=Tt(m.value,m.source,Fr(w),w,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jr("default",m.source);continue}u[d]=jr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Fr(d)})`,null,"default")}else if(a.runtime!==null){let d=ta(l,a.runtime,o,i);u.quick_fix_impl_model=Tt(l,"global",Fr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=na(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=jr(l,"global");return u}function Z_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ss(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=_=>{let h={...r,..._};return fn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ot(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Z_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(_=>{let h=o({...s,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Br(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=_=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ra(e){return`session:${e.provider}:${e.session_id}`}function bo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function J_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Ur(e,t,n,r){return{attempt_id:ra(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:bo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:J_(e,n)}}}var oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",em="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Dc="\uBD84\uD574 \uC5C6\uB294 leg";function Nt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Wr=[...In,"reasoning_output_tokens"],tm={codex:["implementation","review-consult"],claude:["subagent"]};function sa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!In.some(t=>Number.isFinite(e[t]))}function nm(e){return!e||typeof e!="object"?!1:Wr.some(t=>Number.isFinite(e[t]))}function ia(e){let t=0;for(let n of In)t+=Nt(e?.[n]);return t}function rm(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function Pc(e){return!e||typeof e!="object"?!1:Wr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function om(e){let t={};for(let n of Wr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Nc(e){let t={};for(let n of Wr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function qc(e,t){return sa(t)?Nt(t.total_tokens):e==="codex"?Nt(t.input_tokens)+Nt(t.output_tokens):ia(t)}function sm(e){return e==="claude"?"Claude":"Codex"}function im(e){return`\u03C4 ${jc(e)}`}function am(e,t){let n=t.breakdown||{},r=Nt(t.total_only_subtotal);if(sa(n)||r>0&&!nm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,em];return t.replayed&&u.push(oa),u.join(`
`)}let o=[`\uC785\uB825 ${Nt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Nt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Nt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Nt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Dc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Dc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(oa),a.join(`
`)}function Qt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${sm(n)} ${im(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:am(n,r)})}return t}function Ts(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Nt(l.total_only_subtotal)+Nt(i.total_only_subtotal));for(let a of Wr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Nt(l.breakdown[a])+Nt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:Gn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function lm(e){return e==="codex"?"codex":"claude"}function Ln(){return{subtotal:0,breakdown:om(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Es(e,t,n){e.subtotal+=t.subtotal,sa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Wr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Nt(e.breakdown[r])+Nt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Fc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function jc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function zr(e){return rm(e)?`\u03C4 ${jc(ia(e))}`:null}function Hn(e){let t=zr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function yo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Nt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Nt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Nt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Nt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ia(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oa),n.join(`
`)}function Gn(e,t){let n={claude:Ln(),codex:Ln()},r={orchestrator:{claude:Ln(),codex:Ln()},implementation:{claude:Ln(),codex:Ln()},"review-consult":{claude:Ln(),codex:Ln()},subagent:{claude:Ln(),codex:Ln()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Pc(a)){let d=lm(l.runner),_=Nc(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:qc(d,_)};_.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Es(n[d],h,!0),Es(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!tm[_].includes(d.role)||!Pc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=Nc(d.usage),w={provider:_,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:qc(_,m)};w.receipt_id=h,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),m.replayed===!0&&(w.replayed=!0),Es(n[_],w,!1),Es(r[w.role][_],w,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Fc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Fc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var cm=".chip-popover, .judgement-chip";function Hr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let _=d.target;t!==null&&(_&&typeof _.closest=="function"&&_.closest(cm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Gr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Bc={running:3,paused:2,failed:1};function Kn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Uc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Wc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Kn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Kn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),_=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!_&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Bc[u.run_state],_=Bc[l];if(d>_||d===_&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Cs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ca=[...Cs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Yn=["orchestration_model","orchestration_effort","orchestration_speed"],Kr=[...Cs,...Yn],um=ca.filter(e=>Kr.includes(e)),zc=["delegated","main"],Rs=["inherit","claude","codex"],vo=["default","fast"],wo=["standard","fast_track"],ko=["codex","opus","fable","self","skip"],Os=["codex","fable","skip"],Ls=["low","medium","high","xhigh"],mn="auto";function _n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hc(e){if(!_n(e)||!_n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))_n(r)&&_n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Yr(e,t){let n=Hc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[mn,...r.flatMap(([,o])=>o)]}function Gc(e,t,n,r){if(!_n(e)||!_n(e.runners))return[mn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!_n(i)||!_n(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==mn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[mn,...o]}function Vr(e,t,n){return Gc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ua(e,t,n){return Gc(e,t,n,(r,o)=>_n(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:_n(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function $o(e,t){let n=Hc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Kc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Yr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,o,r.impl_model||mn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var dm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},la=[...um,...Yn],pm=[...Kr,...ca].filter((e,t,n)=>n.indexOf(e)===t&&!la.includes(e));function Yc(e,t){let n=_n(e)?e:{},r=_n(t)?t:{},o=[];for(let i of la){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:dm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...pm,...Object.keys(r)])!la.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function da(e,t,n,r,o,s){return Ss({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Vc(e,t){let n={};for(let r of ca){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Xc(e,t){let n={};for(let r of Yn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var pa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Yn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Is={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function fa(e,t,n,r,o,s=null){let i=fn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Qc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of fa(e,t,n,r,o,s))i[l.source]+=1;return i}function Zc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Jc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ck=[...Cs,...Yn];var eu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function xo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ms(e){if(!xo(e)||!xo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>xo(n)&&xo(n.models));return t.length>0?t:null}function xn(e,t){let n=Ms(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function tu(e,t){return xo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function nu(e,t){let n=Ms(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return tu(r,r.models[t]);return[]}function fm(e){let t=Ms(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of tu(r,o))n.includes(s)||n.push(s);return n}function _m(e,t){if(!t)return fm(e);let r=Ms(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of nu(e,s))o.includes(i)||o.push(i);return o}function ru(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=xn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?nu(t,r.impl_model):_m(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var _a=new Set(["unavailable","not_applicable"]);function sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ou(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ir(e,t){return t===null?null:`${or[e]}: ${t.display} (${Is[t.source]})`}function ma(e){return e.filter(t=>t!==null).join(`
`)}function ga(e){if(typeof e!="object"||e===null)return null;let t=yr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function Xr(e,t){let n=sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=sr(e,"orchestration_effort"),o=sr(e,"orchestration_speed"),s=ou([xn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ir("orchestration_model",n),ir("orchestration_effort",r),ir("orchestration_speed",o)])}}function mm(e,t){return e===null||e.value===null||_a.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function gm(e){return e===null||_a.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function hm(e){return e===null?null:e.value==="auto"?"auto":_a.has(e.resolution)?null:e.display}function vr(e,t){if(typeof e!="object"||e===null)return null;let n=sr(e,"impl_dispatch"),r=sr(e,"impl_runtime"),o=sr(e,"impl_model"),s=sr(e,"impl_effort"),i=sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":ou([mm(r,t??null),gm(o),hm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ma(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ir("impl_dispatch",n),ir("impl_runtime",r),ir("impl_model",o),ir("impl_effort",s),ir("impl_speed",i)])}}var bm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),ym=Object.freeze(["delivery_unproven:"]);function Ds(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||bm.has(t))return"session";for(let n of ym)if(t.startsWith(n))return"session";return"settlement"}var vm=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var wm={contract_change:"\uACC4\uC57D \uBB38\uC11C\xB7checker\xB7\uC2A4\uD0AC \uC0AC\uBCF8\uC744 \uD568\uAED8 \uBC14\uAFD4\uC57C \uD55C\uB2E4",multi_repo:"\uB458 \uC774\uC0C1\uC758 \uC800\uC7A5\uC18C\uC5D0 \uC791\uC5C5 \uB2E8\uC704\uAC00 \uC0DD\uAE34\uB2E4",open_design_fork:"\uC2E4\uD589 \uC911\uC5D0\uB3C4 \uC774\uC5B4\uC9C8 \uBBF8\uD574\uACB0 \uC124\uACC4 \uBD84\uAE30\uAC00 \uC788\uB2E4",multi_phase:"\uC5EC\uB7EC Phase \uB610\uB294 \uBCD1\uB82C \uC4F0\uAE30 \uC870\uC815\uC774 \uD544\uC694\uD558\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ha(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>wm[n]||"").filter(n=>n.length>0)}var su={orchestration_model:["fable"],impl_runtime:["claude"]},ba={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function iu(e){return typeof e=="object"&&e!==null?e:null}function au(e,t){return typeof e=="string"&&t.includes(e)?e:""}function km(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>vm.includes(t))}function Ao(e,t=e){let n=iu(e);if(!n)return null;let r=au(n.rec_orchestration_model,su.orchestration_model);if(r.length===0)return null;let o=au(n.rec_impl_runtime,su.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=iu(t)||{},l=Object.keys(s),a=0,u=0;for(let _ of l){let h=i[_];typeof h=="string"&&h.length>0&&(a+=1,h===s[_]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:km(n.rec_reason),rec:s,state:d}}function Ps(e){if(!e||typeof e!="object")return"";let t=ha(e),n=ba[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ns(e){return e.replace(/\/+$/,"")}function $m(e,t){let n=Ns(e),r=Ns(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function qs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!$m(r,o))continue;let s=Ns(r),i=Ns(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ya(e,t){return`${e}\0${t}`}function lu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function va(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function So(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${So(o)})`,location_label:So(o),scope:null,same_lane_ahead:!1};let i=va(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function uu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let w of h){let C=r.get(w);C&&C!==u&&!m.includes(C)&&m.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let _=d.pop();if(_===a)return!0;!_||u.has(_)||(u.add(_),d.push(...o.get(_)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let _=n.get(d);s(d,l)&&_&&u.push(_)}u.length>0&&i.set(l,u)}return i}function du(e,t){return ya(e,t)}async function xm(e){let t=await rn(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{xm(e)}}
    >
      ⧉
    </button></span
  >`}function Bs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function fu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function wr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function _u(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function mu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function gu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Am(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Bs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hu(e,t){let n=Am(e,t);return n?c`<button
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
            title=${n.deploy.at?Ht(n.deploy.at):""}
            >${Us(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${wr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Zr(e){let t=nn(e.created_at),n=nn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Sm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function To(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ws(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Sm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function bu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function js(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Em={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Em[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function zs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Fs(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Tm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function wa(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Hs(e){if(!e)return"";let t=wa(e.predecessors),n=Array.isArray(e.released)?e.released:[],r=wa(e.dependents),o=wa(e.overlaps),s=e.scope_missing===!0,i=e.armed_lane||null,l=!!i||t.length>0||r.length>0,a=n.length>0||o.length>0||s;return!l&&!a?"":c`${l?c`<div class="worker-deps worker-deps--primary">
        ${i?c`<span
              class=${`worker-dep worker-dep--armed${i.orphan?" worker-dep--armed-orphan":""}`}
              title=${i.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${i.orphan?c`${i.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${i.lane_id}
                    >
                      해제
                    </button>`:i.label}</span
            >`:""}${t.map(u=>Fs(u,"pred"))}${r.map(u=>Fs(u,"dependents"))}
      </div>`:""}${a?c`<div class="worker-deps worker-deps--secondary">
        ${n.map(u=>Fs(u,"released"))}${o.map(u=>Fs(Tm(u),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Gs(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Ks(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Cm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function vu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ys(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Ps(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}function wu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Vs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Rm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Qt(e.usage),r=Hn(e.usage),o=nn(e.done_at);return c`<div
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
      ${wu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${yo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${fu(e.work_kind)}
            >작업 ${wr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function An(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Rm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Qt(e.usage),s=Hn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?nn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=e.lane==="done"?"":Ks(e.workflow),F=e.lane==="done"?"":vu(e.from_id),z=Vs(e.priority),se=c`<span class="worker-mini__title">${e.title}</span>`,X=wu(e.pr_url,e.pr_number),N=r.map(pe=>pe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${pe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${pe===e.completion_badge&&e.completion_title||""}
          >${pe}</span
        >`),L=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",M=o.length>0?o.map(pe=>c`<span class="worker-usage" title=${pe.tooltip}
              >${pe.label}</span
            >`):s?c`<span class="worker-usage" title=${yo(e.usage)}
            >${s}</span
          >`:"",B=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",Q=e.merge_action?c`<button
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
        </button>`:"",U=e.stale_work||null,Z=U?c`${U.can_resume||U.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            기존 작업 이어가기
          </button>`:""}${U.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            백업 후 새로 시작
          </button>`:""}${U.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${U.action_id}
            ?disabled=${U.locked}
          >
            다시 확인
          </button>`:""}`:"",Ae=U?c`<div class="worker-mini__stale">
        <strong>${U.title}</strong>
        <span>${U.summary}</span>
        <span>${U.cause}</span>
        ${U.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",he=e.revise_action?c`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=Ys(e.rec,Eo(e,"rec")),be=Gs(e.cross_lane_chip),xe=Qr(e.log_path),x=m||be||C||F||ce||q||M||xe?c`<div class="worker-chips">
          ${m}${be}${C}${F}${ce?zs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${M}${xe}${$u(e)}
        </div>`:"",oe=Hs(e.dependency_chips),$e=js(e),de=t.actions?t.actions:"",Re=!!(i||e.merge_action||e.cancel_action||e.discard_action||D?.operation||e.revise_action||U);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${w}${z}${F}${X}${se}${de}
          </div>
          <div class="worker-mini__row2">
            ${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${fu(e.work_kind)}
                  >작업 ${wr(e.work_ms)}</span
                >`:""}${N}${B}
            <span class="worker-mini__actions"
              >${Q}${ne}${Y}</span
            >
            ${Zr(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${_}${w}${z}${X}${N}${h}${L}${de}
            </div>
            <div class="worker-mini__body">${se}${Ae}</div>
            ${oe}${x}${Re?c`<div class="worker-mini__foot">
                  ${B}
                  <span class="worker-mini__actions"
                    >${Q}${ne}${Y}${he}${Z}</span
                  >
                  ${js(e)}
                </div>`:""}
            ${Zr(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${w}${z}${se}${X}${N}${h}${L}${B}${Q}${ne}${Y}${de}
            </div>
            ${oe}${x}${$e} ${Zr(e)}`}
  </div>`}function Om(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var ku={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function $a(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ba[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ha(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=ku[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Lm=["rec","session_preferred","ineligible","qfr"];function Xs(e,t){for(let n of Lm){if(!t(n))continue;let r=$a(e,n);return r?{chip_key:n,content:r}:null}return null}function $u(e){return e.chip_popover?Gr(e.chip_popover.content):""}function Eo(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Qs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function xa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=ku[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],_=d.includes("missing_description"),h=d.some(N=>N.startsWith(Qs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),w=Hs(e.dependency_chips),C=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",F=Gs(e.cross_lane_chip),z=Ks(u),se=vu(e.from_id),X=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Vs(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Eo(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Eo(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Ys(e.rec,Eo(e,"rec"))}${Cm(u,Eo(e,"qfr"))}
      ${$u(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ks(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${w}
    ${C||F||z||se||X?c`<div class="worker-chips">
          ${C}${F}${z}${se}${zs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Om(t.lanes,e.id)}
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
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":h?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":_?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Zr(e)}
  </div>`}function Mn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?xa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):An(o))}
          </div>`}
  </section>`}function pu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Zs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${pu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${pu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Im(o))}
          </div>`}
    </section>
  </div>`}function Im(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Mn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function Js(e){return e.count?c`<section
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
  </section>`:""}var xu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Co=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ei(e,t){let n=xu.find(o=>o.step===e);if(!n)return null;let r=xu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Au(e){let t=Co.findIndex(n=>n.step===e);return Co.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function kr(e){let t=Co.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Mm(e){let t=Co.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Co.length}}function ti(e){let t=Mm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Sa=new Set(["queued","running","retry_pending"]),Su=new Set(["failed","succeeded"]),Dm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ro={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Pm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ro.base_containment,child_sweep:Ro.child_sweep,branch_cleanup:Ro.branch_cleanup,parent_close:Ro.parent_close};function Nm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function qm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Sa,...Su].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Fm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Aa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Dm[o];if(!s)return null;let i=ei(n,`${r} ${s}`);return i?{...i,active:Sa.has(o),failed:o==="failed"}:null}function jm(e){return!e||typeof e!="object"?null:Pm[e.step]||null}function Oo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=jm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Nm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&qm(w,t,l)).sort(Fm):[],u=i?a:[],d=u.find(w=>Sa.has(w.state));if(d)return Aa(d);if(o)return o.step==="repo_operations"&&a[0]?Aa(a[0],!0):null;let _=u.find(w=>Su.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Aa(_);if(r){let w=ei(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Ro[e.cleanup_cursor]:null;if(!h)return null;let m=ei(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function ni(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Bm="\uBBF8\uC801\uC7AC";function Ea(e,t){let n=Un(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Um=10080*60*1e3;function Eu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Um)return null;let o=Un(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Ht(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Tu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Un(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Cu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ea(s,{id:a,location_label:o.get(a)||Bm}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var oi=1,Lo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ra=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jr={show_blocked:!0,spec:"all"},Ru={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Wm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Kn(r)||(n=typeof r.status=="string"?r.status:null);return n}function zm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Kn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Hm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Wc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,_=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",w=u!=="running"&&(_||!m)&&!o.has(a.attempt_id),C=!_&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,F=at(n.observations?.[i]),z=at(F.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||z.state==="MERGED",X=Vn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),N=u==="failed"?Lu(a,{resume_eligible:w,resume_reason:C,confirmation:X.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Ou(a,e,u),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&_,can_resume:w})}for(let[i,l]of Ym(e,t)){if(s.has(i))continue;let a=l.attempt,u=Vn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Nu(a);s.set(i,{...Ou(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Lu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Ou(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Gn(t,e.bead_id)}}function Lu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Nu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:bu(e),confirmation:t.confirmation,...Gm(t.history)}}function Gm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Nu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Km=new Set(["parked","retry_wait"]);function Ym(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Kn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Kn(s)||!Km.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Iu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function at(e){return e&&typeof e=="object"?e:{}}function Vm(e,t,n){let r=at(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>fn({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Mu(Xr(a,s),Xr(u,s)),_=Mu(vr(a,null),vr(u,null));return d||_?{orchestration:d,worker:_}:null}function Mu(e,t){return!e||t&&t.text===e.text?null:e}function Xm(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Eu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Qm=new Set(["quick_fix","spec_backed","full_plan"]);function Du(e){return typeof e=="string"&&Qm.has(e)}function Zm(e){let t={...at(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Jm(e,t,n){let r=e.runner_catalog??null,o=Ca(e,t,n,null);if(!o)return null;let s=xn(r,o.orchestration_model.value??""),i=s===null?o:Ca(e,t,n,s)||o,l=Xr(i,r),a=vr(i,s);return l||a?{orchestration:l,worker:a}:null}function Ca(e,t,n,r){let o=Du(n)?n:Du(t.route)?t.route:null;try{return fn({pin:t,global:Zm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function eg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:vr(Ca(e,at(t.metadata),t.route,n),n)}function La(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function tg(e){let t={};for(let l of In)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of In)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Qt(Ts(i)):n?Hn(t):null}function qu(e,t){let n=va(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ng(e,t,n){let r=t.get(e);if(!r)return qu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return So(r)}function rg(e,t,n,r){let o=t.get(e);if(!o)return{label:qu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":So(o),title:""}}function og(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function sg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ig(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let _=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((z,se)=>{let X=z&&typeof z.bead_id=="string"?z.bead_id:"";if(X.length===0)return;let N=z&&typeof z.root_dir=="string"?z.root_dir:"",L=n.get(X),M=L?L.state:void 0,B=M==="running"||M==="pr_wait"||M==="done",Q=!L||M==="runnable",ne=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,D=rg(X,n,r,t),Y=m.length>0?m[m.length-1].id:null,U=_==="confirmed"&&Y!==null&&!(t.get(X)||[]).includes(Y);m.push({id:X,title:o.get(X)||X,root_dir:L?L.root_dir:N,workspace_name:L?L.workspace_name:s.get(N)||"",seq:se+1,location_label:D.label,location_title:D.title,draggable:!B,fixed:B,done:M==="done",unplaced:Q,mismatch:U,...ne!==null?{queue_index:ne}:{}})}),m.forEach((z,se)=>{z.seq=se+1});let w=m.length>0&&m.every(z=>z.done),C=m.filter(z=>!z.fixed&&i.armed_by_bead.get(z.id)!==d).map(z=>z.id),F=sg(d,_,m,w,C,i);l.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:w,can_confirm:_==="draft"&&m.length>=2,has_mismatch:_==="confirmed"&&m.some(z=>z.mismatch||z.unplaced),unlaunched:C,...F})}),l}function ag(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function lg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:_,state:h}=ag(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:_})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,_=i.get(d);_?_.push(a):i.set(d,[a])}let l=(a,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:ng(_.id,r,o),prefixes:d,...typeof _.root_dir=="string"&&_.root_dir.length>0?{root_dir:_.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let _=qs(a[u].scope,a[d].scope);_.length!==0&&(l(a[u],a[d],_),l(a[d],a[u],_))}}function Pu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Un(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function cg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Un(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ta(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ri(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Jr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Lo.some(y=>y.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",_=Date.now(),h=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&h.set(y.root_dir,y);let m=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);for(let y of r)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);let w=[],C=[],F=[],z=[],se=[],X=[],N=new Map,L=new Map,M=new Map,B=new Map,Q=new Map,ne=new Map,D=new Map,Y=new Map,U=new Map,Z=new Map,Ae=new Map,he=new Map,ce=new Map,q=new Set,be=new Map,xe=new Map,x=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let W=y.root_dir,Ee=y.name||W,Ce=h.get(W),je=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof y.revision=="number"?y.revision:0,Ye=at(y.attempts),dt=at(y.bead_titles);for(let[p,f]of Object.entries(dt))typeof f=="string"&&f.length>0&&x.set(p,f);let wt=at(y.bead_times),Lt=at(y.pr_observations),kt=at(y.admission),mt=at(y.revise_parked),Be=at(y.merge_queue_state),I=at(y.cleanup_failed),J=at(y.discard_operations),ye=at(y.bead_timelines),S=at(y.bead_blocked_by);Object.hasOwn(y,"bead_scope")&&be.set(W,at(y.bead_scope));let K=at(y.bead_workflow),Ie=at(y.pr_activity),We=Array.isArray(y.repo_operations)?y.repo_operations:[];Y.set(W,We);let qe=typeof y.declared_base=="string"?y.declared_base:null;D.set(W,qe),ne.set(W,Object.entries(I).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(at(y.bead_overlay)))f&&typeof f=="object"&&U.set(`${W}\0${p}`,f);let et=new Map;for(let p of Object.values(Ye))p&&typeof p.attempt_id=="string"&&et.set(p.attempt_id,p);let Oe=Array.isArray(y.merge_queue)?y.merge_queue:[],He=new Set(Oe.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ze=new Map(Oe.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),bt=new Map,ze=new Map,xt=new Map,qt=new Map;Oe.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(bt.set(p.bead_id,f+1),ze.set(p.bead_id,p.resolution),xt.set(p.bead_id,p.continuation_action||null),qt.set(p.bead_id,p.authority||null))});let it=at(y.auto_merge_skips),Yt=p=>{let f=it[p];if(!f)return null;let k=at(at(Lt[p]).pr).head_sha;return k&&k===f.head_sha?f.reason||"":null};Q.set(W,{positions:bt,resolutions:ze,continuations:xt,authorities:qt,state:{active:typeof Be.active=="string"?Be.active:null,failures:at(Be.failures),waiting:Be.waiting&&typeof Be.waiting.bead_id=="string"&&typeof Be.waiting.reason=="string"?Be.waiting:null},auto_excluded:(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Yt(p)!==null),running:Oe.length>0});let St=Array.isArray(y.queue)?y.queue:[];for(let p of[...St,...Array.isArray(y.pr_wait)?y.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&he.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(y.disarmed_on_load)?y.disarmed_on_load:[])typeof p=="string"&&p.length>0&&q.add(p);let It=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Ut=at(y.lane_states),Vt=typeof y.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(y.serial_lane_count))):Math.min(5,It.length);M.set(W,Vt),B.set(W,St.length);let Jt=new Map(It.map(p=>[p.id,p])),Wt=new Map;for(let p of It)for(let f of p.entries)f&&typeof f.bead_id=="string"&&Wt.set(f.bead_id,p.id);for(let[p,f]of Object.entries(at(y.bead_dependents))){let k=Array.isArray(f?.ids)?f.ids:[],R=at(f?.root_dirs),H=Ae.get(p)||{ids:new Set,root_dirs:{}};for(let re of k)typeof re=="string"&&re.length>0&&H.ids.add(re);for(let[re,_e]of Object.entries(R))typeof _e=="string"&&_e.length>0&&(H.root_dirs[re]=_e);Ae.set(p,H)}for(let[p,f]of Object.entries(S))Array.isArray(f)&&Z.set(p,f.filter(k=>typeof k=="string"&&k.length>0));let Dt=Array.isArray(y.done)?y.done:[];for(let p of Dt)p&&typeof p.bead_id=="string"&&X.push({id:p.bead_id,root_dir:W,workspace_name:Ee});let un=new Map;for(let p of Dt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&un.set(p.bead_id,p.added_at);let Mt=p=>({id:p,title:dt[p]||p,root_dir:W,workspace_name:Ee,expected_revision:je,draggable:!1,...at(wt[p]).created_at?{created_at:at(wt[p]).created_at}:{},...at(wt[p]).updated_at?{updated_at:at(wt[p]).updated_at}:{}}),Gt=p=>{let f=K[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},Ft=p=>Object.hasOwn(S,p)?{blocked_by:Array.isArray(S[p])?S[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},$t=new Set;for(let[p,f]of Hm(Ye,un,{discard_operations:J,observations:Lt,bead_timelines:ye})){$t.add(p);let k=f.run_state==="failed"?og(Ye,f.attempt_id):null;k!==null&&ce.set(p,k);let R=et.get(f.attempt_id)||null,H=U.get(`${W}\0${p}`),re=H&&H.rollup?H.rollup:null,_e=Oa(qe,R?R.target_base:null),we=R?La(R,et):!1,Ue=R&&R.quickfix_lane===!0&&R.quickfix_landing&&typeof R.quickfix_landing=="object"?R.quickfix_landing:null,ft=Ue&&typeof Ue.reason=="string"&&Ue.reason.length>0?Ue.reason:null,_t=Ue?Oo({bead_id:p,merge_sha:Ue.head_sha,cleanup_cursor:Ue.cursor,cleanup_failed:ft?{step:Ue.cursor,reason:ft}:null,repo_operations:We}):null;C.push({...Mt(p),lane:"running",...Ft(p),...Wt.has(p)?{serial_lane_id:Wt.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:K[p]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,retry:f.retry||null,exec_chips:{orchestration:ga(f),worker:eg(at(Ce),H,f.runner||null)},discard:Vn(J,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||at(Lt[p]).pr?.state==="MERGED"}),...re?{rollup:re}:{},...we?{conflict_resolution:!0}:{},..._e?{base_exception:_e}:{},..._t?{landing:_t}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:f.run_state==="failed"})}for(let[p,f]of Uc(Ye)){if(C.some(R=>R.id===p))continue;let k=f.attempt;C.push({...Mt(p),lane:"running",kind:"session",...Ft(p),attempt_id:typeof k.attempt_id=="string"?k.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:K[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof k.last_event_at=="number"?k.last_event_at:null,last_activity:k.last_activity&&typeof k.last_activity=="object"?k.last_activity:null,legs:Array.isArray(k.legs)?k.legs:[],runner:typeof k.runner=="string"?k.runner:null,model:typeof k.model=="string"?k.model:null,effort:typeof k.effort=="string"?k.effort:null,speed:typeof k.speed=="string"?k.speed:null,resumed_from:null,continuation_mode:null,usage:k.usage&&typeof k.usage=="object"?k.usage:null,exec_chips:{orchestration:ga(k),worker:null},discard:Vn(J,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(y.session_active)?y.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||$t.has(f)||($t.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&Z.set(f,p.blocked_by.filter(k=>typeof k=="string"&&k.length>0)),typeof p.title=="string"&&p.title.length>0&&x.set(f,p.title),C.push({...Mt(f),title:p.title||dt[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:Ta(p.started_at)??Ta(p.updated_at)??void 0,updated_at:Ta(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(k=>typeof k=="string"&&k.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(y.pr_wait)?y.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||$t.has(f))continue;$t.add(f);let k=at(Lt[f]),R=at(k.pr),H=k.gate?at(k.gate):null,re=He.has(f),_e=Ze.get(f)?.continuation_action||null,we=!!_e&&_e.continuation===null,Ue=Be.active===f,ft=p.external===!0,_t=I[f]||null,en=at(Ie[f]),$=Oo({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:en.merge_progress||null,cleanup_failed:_t,repo_operations:We}),E=ni($),Se=!!H&&H.base_badge==="\uCDA9\uB3CC",g=!!_t&&["child_sweep","branch_cleanup","parent_close"].includes(_t.step)&&!!H&&H.tier==="merged",b=ft&&!!_t&&!!H&&H.tier==="merged",A=!!H&&["closed_unmerged","review","undecidable"].includes(H.tier)&&H.reason!=="review_receipt_undetermined",te=Vn(J,f,{external:ft,merge_active:Ue||$?.step==="merge",merge_queued:re,cleanup_active:E,merged:!!_t||H?.tier==="merged"}),me=!!te.operation;F.push({...Mt(f),lane:"pr_wait",...Ft(f),workflow:K[f]||null,pr_number:typeof R.number=="number"?R.number:null,pr_url:typeof R.url=="string"?R.url:void 0,external:ft,usage:Gn(Ye,f),merge_step:$,badges:we?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:$?[H?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:_t?[kr(_t.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${kr(_t.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof H?.gate_badge=="string"&&H.gate_badge.length>0?[H.gate_badge]:[],alert:$?$.failed===!0:!!_t||A,reason:_t&&$?.active!==!0?ti(_t.step):"PR \uB300\uAE30",merge_action:H?.tier==="merged"&&!g&&!b?!1:!re||we,merge_enabled:!me&&(we||H?.enabled===!0||Se||g||b),merge_label:we?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":b||g?"\uC815\uB9AC \uC7AC\uAC1C":Se&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:we?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":me?te.error?`\uD3D0\uAE30 \uC2E4\uD328: ${te.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${te.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:b?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.enabled===!0?`\uBA38\uC9C0 (${H.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${H?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:re&&!we,cancel_enabled:!Ue,continuation_mismatch:_e?.mismatch||null,discard:te,discard_action:te.action,discard_enabled:te.enabled,discard_title:te.title})}let fe=(p,f,k,R)=>{let H=p&&p.bead_id;if(typeof H!="string"||$t.has(H))return null;$t.add(H);let re=mt[H],_e=Vn(J,H),we=_e.operation?_e:null,Ue={...Mt(H),lane:f,workflow:K[H]||null,draggable:!we,discard:we||void 0,reason:Iu(kt,H),seq:k+1,queue_position:k+1,queue_index:k,queue_length:R,badges:re?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!re,revise_action:!!re,revise_enabled:!!re&&!we,revise_title:re?re.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${re.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},ft=Ft(H);return Object.hasOwn(ft,"blocked_by")&&(Ue.blocked_by=ft.blocked_by),Ue};for(let p=0;p<St.length;p++){let f=fe(St[p],"queue",p,St.length);if(!f)continue;z.push(f);let k=N.get(W);k?k.push(f):N.set(W,[f])}let T=p=>{let f=F.find(re=>re.id===p&&re.root_dir===W);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let k=C.find(re=>re.id===p&&re.root_dir===W),R=k?k.run_state:Wm(Ye,p),H=R==="failed"||R==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":R==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:k?k.title:Mt(p).title,badge:H}},ee=[];for(let p=0;p<Math.max(Vt,It.length);p++){let f=`s${p+1}`,k=Jt.get(f),R=k&&Array.isArray(k.entries)?k.entries:[],H=at(Ut[f]),re=Array.isArray(H.occupied_by)?H.occupied_by.filter(Ue=>typeof Ue=="string"):[],_e=new Set(re),we=[];for(let Ue=0;Ue<R.length;Ue++){let ft=R[Ue]&&R[Ue].bead_id;if(typeof ft=="string"&&_e.has(ft)){$t.add(ft);continue}let _t=fe(R[Ue],f,Ue,R.length);_t&&(we.push(_t),z.push(_t))}we.length===0&&re.length===0&&(Vt<=1||p>=Vt)||ee.push({id:f,index:p,items:we,raw_length:R.length,occupied_by:re,occupants:re.map(Ue=>T(Ue)),corrections:Array.isArray(H.corrections)?H.corrections.length:0,cycle:H.cycle===!0,...we.length===0&&re.length===0?{empty:!0}:{}})}L.set(W,ee);let Le=Array.from({length:Vt},(p,f)=>{let k=`s${f+1}`,R=Jt.get(k),H=R&&Array.isArray(R.entries)?R.entries:[],re=at(Ut[k]);return{id:k,index:H.length,length:H.length,occupied_by:Array.isArray(re.occupied_by)?re.occupied_by.filter(_e=>typeof _e=="string"):[]}});for(let p of Array.isArray(y.runnable)?y.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||$t.has(f))continue;$t.add(f);let k=p.workflow&&typeof p.workflow=="object"?p.workflow:null,R=k&&typeof k.route=="string"&&k.route||(typeof p.route=="string"?p.route:null),H=Vm(at(Ce),p.exec_pins,R),re=Ao(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&Z.set(f,p.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof p.title=="string"&&p.title.length>0&&x.set(f,p.title),Array.isArray(p.scope)&&xe.set(f,p.scope.filter($=>typeof $=="string"&&$.length>0));let _e=p.eligible!==!1,we=p.worker_ineligible===!0,Ue=Object.hasOwn(p,"eligible"),ft=[];typeof p.reason=="string"&&p.reason.length>0&&ft.push(p.reason);let _t=Iu(kt,f);_t&&ft.push(_t);let en=Xm(f,p.release_info,_)?.map($=>({...$,...Pu({id:f,root_dir:W},$.id)}));w.push({...Mt(f),title:p.title||dt[f]||f,lane:"runnable",draggable:!Ue,queue_placeable:_e&&!we,...we?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...en?{dependency_chips:{released:en}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:ft.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:k||(R?{route:R,chips:{route:R}}:null),...H?{exec_chips:H}:{},...re?{rec:re}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},place_index:St.length,place_lanes:Le})}for(let p of Dt){let f=p&&p.bead_id;if(typeof f!="string"||$t.has(f)||($t.add(f),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let k=zm(Ye,f),R=k&&typeof k.done_kind=="string"?k.done_kind:null;se.push({...Mt(f),lane:"done",done:!0,done_layout:"three_line",usage:Gn(Ye,f),work_ms:gu(Ye,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:R,...Gt(f),badges:[...R&&Ru[R]?[Ru[R]]:[],..._u(Ye,f)]})}for(let p of Array.isArray(y.session_done)?y.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||$t.has(f)||($t.add(f),se.push({...Mt(f),...p,id:f,root_dir:W,workspace_name:Ee,expected_revision:je,lane:"done",done:!0}))}}if(U.size>0)for(let y of[...w,...z,...C,...F,...se]){let W=U.get(`${y.root_dir}\0${y.id}`);if(!W||(typeof W.priority=="number"&&(y.priority=W.priority),typeof W.from_id=="string"&&W.from_id.length>0&&(y.from_id=W.from_id),!Object.hasOwn(W,"metadata")))continue;let Ee=at(W.metadata);if(y.rec=Ao(Ee),y.lane==="runnable"||y.lane.startsWith("s")||y.lane==="queue"){let Ce=Jm(at(h.get(y.root_dir)),Ee,typeof W.route=="string"&&W.route.length>0?W.route:at(y.workflow).route);Ce&&(y.exec_chips=Ce)}}let oe=new Map;o.forEach((y,W)=>{y&&typeof y.root_dir=="string"&&oe.set(y.root_dir,W)});let $e=n&&n.running_sort==="repo"?"repo":"started";C.sort((y,W)=>{let Ee=y.kind==="session",Ce=W.kind==="session";if(Ee!==Ce)return Ee?1:-1;if(Ee&&Ce){let dt=ri(W.updated_at)-ri(y.updated_at);return dt!==0?dt:y.id.localeCompare(W.id)}if($e==="repo"){let dt=oe.get(y.root_dir)??Number.MAX_SAFE_INTEGER,wt=oe.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==wt)return dt-wt}let je=typeof y.started_at=="number"&&Number.isFinite(y.started_at)?y.started_at:null,Ye=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return je!==null&&Ye!==null&&je!==Ye?je-Ye:je===null&&Ye!==null?1:je!==null&&Ye===null?-1:y.id.localeCompare(W.id)}),se.sort((y,W)=>(W.done_at??0)-(y.done_at??0));let de=o.length>0?o:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,runner_catalog:y&&y.runner_catalog})),Re=new Set(w.map(y=>y.root_dir)),pe=new Map;for(let y of C)y.kind==="session"||y.run_state!=="running"||pe.set(y.root_dir,(pe.get(y.root_dir)||0)+1);let De=new Map;for(let y of se){let W=De.get(y.root_dir);W?W.push(y):De.set(y.root_dir,[y])}let lt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ot=[];for(let y of de){if(!y||typeof y.root_dir!="string")continue;let W=N.get(y.root_dir)||[],Ee=L.get(y.root_dir)||[],Ce=W.length>0||Ee.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ce&&!Re.has(y.root_dir))continue;let je=typeof y.slots=="number"&&y.slots>=oi?y.slots:oi,Ye=pe.get(y.root_dir)||0;ot.push({live_count:Ye,over_cap:Ye>je,merge:Q.get(y.root_dir)||lt,token_total:tg(De.get(y.root_dir)||[]),cleanup_failures:ne.get(y.root_dir)||[],declared_base:D.get(y.root_dir)??null,repo_operations:Y.get(y.root_dir)||[],root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:je,revision:typeof y.revision=="number"?y.revision:0,runner_catalog:at(y.runner_catalog),items:W,sublanes:{parallel:W,serial:Ee},serial_lane_count:M.get(y.root_dir)||0,raw_queue_length:B.get(y.root_dir)||0})}let O={runnable:w,runnable_all:w,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:z,queue_groups:ot,running:C,pr_wait:F,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},ae=lu(O);for(let y of X)ae.has(y.id)||ae.set(y.id,{root_dir:y.root_dir,workspace_name:y.workspace_name,lane:"done",state:"done"});for(let y of[...O.queue,...O.runnable,...O.running,...O.pr_wait]){if(!Object.hasOwn(y,"blocked_by"))continue;let W=ae.get(y.id);y.blockers=(y.blocked_by||[]).map(Ee=>cu(Ee,W,ae,o))}for(let y of[...O.queue,...O.runnable,...O.running,...O.pr_wait]){let W=(y.blockers||[]).map(je=>({...Ea(y.id,je),...Pu(y,je.id,ae)})),Ee=Tu(y.id,cg(Ae.get(y.id),y.dependents_info,y,ae));if(W.length===0&&Ee.length===0)continue;let Ce={...y.dependency_chips||{},...W.length>0?{predecessors:W}:{},...Ee.length>0?{dependents:Ee}:{}};y.dependency_chips=Ce}lg(O,be,xe,ae,o);let le=uu(O.queue_groups);for(let y of O.queue_groups)for(let W of y.sublanes.serial){let Ee=le.get(du(y.root_dir,W.id));Ee&&(W.cross_wait_peers=Ee)}O.chain_lanes=ig(l&&Array.isArray(l.lanes)?l.lanes:[],Z,ae,o,x,m,{armed_by_bead:he,failed_by_bead:ce,disarmed_lanes:q});let ie=new Map;for(let y of[...O.queue,...O.runnable])ie.has(y.id)||ie.set(y.id,y);let ke=new Set;for(let y of O.chain_lanes)for(let W of y.rows){if(y.status==="confirmed"&&!W.unplaced&&!W.fixed&&ke.add(W.id),!y.draft&&!W.unplaced)continue;let Ee=ie.get(W.id);Ee&&(Ee.cross_lane_chip={lane_id:y.lane_id,number:y.number,status:y.status,label:y.draft?`\uC5F0\uACB0 ${y.number} (draft)`:`\uC5F0\uACB0 ${y.number}`})}let ue=new Map(O.chain_lanes.map(y=>[y.lane_id,y.number]));for(let y of[...O.queue,...O.running]){let W=he.get(y.id);if(typeof W!="string"||W.length===0)continue;let Ee=ue.get(W);y.armed_lane_chip=Ee===void 0?{lane_id:W,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:W,label:`\u25B6 \uC5F0\uACB0 ${Ee}`,orphan:!1}}let Fe=[];for(let y of N.values())for(let W of y)ke.has(W.id)||Fe.push(W);Fe.sort((y,W)=>{let Ee=y.workspace_name.localeCompare(W.workspace_name);return Ee!==0?Ee:(y.queue_index??0)-(W.queue_index??0)}),O.parallel_rows=Fe;let Ge={};for(let[y,W]of ae)typeof W.root_dir=="string"&&W.root_dir.length>0&&(Ge[y]=W.root_dir);for(let y of O.chain_lanes)for(let W of y.rows)!Object.hasOwn(Ge,W.id)&&W.root_dir.length>0&&m.has(W.root_dir)&&(Ge[W.id]=W.root_dir);O.owner_of=Ge;let Qe=O.runnable.length;O.runnable_all=O.runnable.slice();let Pe=O.runnable,V=y=>i.show_blocked||y.blocked!==!0,j=y=>i.spec==="all"||(i.spec==="with"?y.published===!0:y.published!==!0);if(d==="per_control"){let y=[],W=0,Ee=0;for(let Ce of Pe){let je=V(Ce),Ye=j(Ce);je&&Ye?y.push(Ce):!je&&Ye?W+=1:je&&!Ye&&(Ee+=1)}Pe=y,O.runnable_hidden={blocked:W,spec:Ee}}else{Pe=Pe.filter(V);let y=Pe.length;Pe=Pe.filter(j),O.runnable_hidden={blocked:Qe-y,spec:y-Pe.length}}let Ne=(y,W)=>{let Ee=ri(W.updated_at)-ri(y.updated_at);return Ee!==0?Ee:y.id.localeCompare(W.id)},Je=a==="repo_spec"?(y,W)=>{let Ee=y.published===!0?0:1,Ce=W.published===!0?0:1;return Ee!==Ce?Ee-Ce:Ne(y,W)}:Ne;if(a==="as_given")O.runnable=Pe,O.runnable_sections=[];else if(a==="updated_flat")O.runnable=Pe.slice().sort(Ne),O.runnable_sections=[];else{let y=new Map;for(let Ce of Pe){let je=y.get(Ce.root_dir);je?je.push(Ce):y.set(Ce.root_dir,[Ce])}let W=[],Ee=[];for(let Ce of de){if(!Ce||typeof Ce.root_dir!="string")continue;let je=(y.get(Ce.root_dir)||[]).slice().sort(Je);y.delete(Ce.root_dir),je.length!==0&&(W.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:je.map(Ye=>({...Ye,workspace_name:""}))}),Ee.push(...je))}for(let[Ce,je]of y){let Ye=je.slice().sort(Je);W.push({root_dir:Ce,name:Ye[0]?.workspace_name||Ce,items:Ye.map(dt=>({...dt,workspace_name:""}))}),Ee.push(...Ye)}O.runnable=Ee,O.runnable_sections=W}return O}function Fu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let _=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));_&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var ug="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ii="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",dg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",pg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",eo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Io(e,t){return`${e}\0${t}`}function fg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function _g(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Po(e,t){let n=e.entries,r=n.map(_=>_.bead_id),o=fg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[_,h]of o)for(let m of h)s.push({blocker:m,blockee:_});let i=_g(e,t),l=new Map(r.map((_,h)=>[_,h])),a=r.slice(0,i).filter(_=>o.get(_).some(h=>Number(l.get(h))>Number(l.get(_)))),u=Fu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,i),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function ju(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Po(n,t)}function mg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function gg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function hg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ia(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function bg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Io(i,a));let r=new Map,o=new Map;for(let i of e){let l=Io(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Io(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function yg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function vg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ma(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function No(e){let t=hg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=gg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,_)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if(Ia(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(Io(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=s(u);h!==null&&(t.set(u,_.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Io(u,d))}}function qo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=bg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:mg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Bu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Mo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Uu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Wu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(si(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Do(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ai(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function li(e,t,n){let r=No(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ug};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:dg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ma(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:eo}}if(e.kind==="chain"&&d===void 0)return{refused:eo};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(w<0)return;let C=w>0?d.entries[w-1]:null,F=w+1<d.entries.length?d.entries[w+1]:null,z=Mo(d,w),se=F!==null&&Mo(d,w+1);z&&C!==null&&r.removeDep(e.bead_id,C.bead_id),se&&F!==null&&r.removeDep(F.bead_id,e.bead_id),(z||se)&&C!==null&&F!==null&&r.addDep(F.bead_id,C.bead_id,u)},h=(w,C)=>{let F=n.cross_lanes.get(w),z=F.entries.findIndex(D=>D.bead_id===e.bead_id),se=F.entries.filter(D=>D.bead_id!==e.bead_id),X=Math.max(0,Math.min(se.length,z>=0&&C>z?C-1:C)),N=-1;if(se.forEach((D,Y)=>{n.fixed_members.has(D.bead_id)&&(N=Y)}),X<=N){r.state.refusal=pg;return}let L=z>=0?F.entries[z]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Po({status:F.status,entries:[...se.slice(0,X),L,...se.slice(X)]},n);let M=l.entries;if(ai(M,F.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:w,entries:Do(M)}}),F.status!=="confirmed")return;let B=M.findIndex(D=>D.bead_id===e.bead_id),Q=B>0?M[B-1].bead_id:null,ne=B+1<M.length?M[B+1].bead_id:null;if(Q===null){ne!==null&&r.addDep(ne,e.bead_id,w);return}if(r.addDep(e.bead_id,Q,w),ne!==null&&(r.graph.get(ne)||[]).includes(Q)){let D=F.entries.findIndex(Y=>Y.bead_id===ne);(r.laneCreated(ne,Q)||D>0&&F.entries[D-1].bead_id===Q&&Mo(F,D))&&r.removeDep(ne,Q),r.addDep(ne,e.bead_id,w)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Uu(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Do(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=yg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(si(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let C=n.parallel_rows,F=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&vg(n,e.root_dir)&&m!==void 0){let se=m>w?w:w-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&s.push(si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let w=m>t.index?t.index:t.index-1;w>=0&&w!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else s.push(si(e.bead_id,e.root_dir,t.index,t.lane_id));return qo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function zu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Po(n,t);if(r.held)return{refused:ii};let o=r.entries,s=No(t),i=[];Bu(s,o,e),s.state.refusal===null&&Wu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),qo(s,t,l,i,{lane_id:e,correction:r})}function Hu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=Po(n,t),o=r.entries,s=No(t),i=[];Bu(s,o,e),s.state.refusal===null&&Wu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}];return qo(s,t,l,i,{lane_id:e,correction:r})}function Gu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=Po(n,t),o=r.entries;return qo(No(t),t,ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}],[],{lane_id:e,correction:r})}function Ku(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=No(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Mo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return qo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Uu(t,n,e,n.entries)})}function Yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Mo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ma(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Vu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Xu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Da(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ma(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var wg="\uC0AC\uC774\uD074";function kg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Pa(e,t,n){let r=ar(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:kg(e)}}function Qu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ia(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:wg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Zu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:ad,setPrototypeOf:Ju,isFrozen:$g,getPrototypeOf:xg,getOwnPropertyDescriptor:Ag}=Object,{freeze:sn,seal:vn,create:Wa}=Object,{apply:za,construct:Ha}=typeof Reflect<"u"&&Reflect;sn||(sn=function(t){return t});vn||(vn=function(t){return t});za||(za=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ha||(Ha=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ci=an(Array.prototype.forEach),Sg=an(Array.prototype.lastIndexOf),ed=an(Array.prototype.pop),Fo=an(Array.prototype.push),Eg=an(Array.prototype.splice),di=an(String.prototype.toLowerCase),Na=an(String.prototype.toString),qa=an(String.prototype.match),jo=an(String.prototype.replace),Tg=an(String.prototype.indexOf),Cg=an(String.prototype.trim),Sn=an(Object.prototype.hasOwnProperty),on=an(RegExp.prototype.test),Bo=Rg(TypeError);function an(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return za(e,t,r)}}function Rg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ha(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:di;Ju&&Ju(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&($g(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Og(e){for(let t=0;t<e.length;t++)Sn(e,t)||(e[t]=null);return e}function Xn(e){let t=Wa(null);for(let[n,r]of ad(e))Sn(e,n)&&(Array.isArray(r)?t[n]=Og(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function Uo(e,t){for(;e!==null;){let r=Ag(e,t);if(r){if(r.get)return an(r.get);if(typeof r.value=="function")return an(r.value)}e=xg(e)}function n(){return null}return n}var td=sn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fa=sn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ja=sn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Lg=sn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ba=sn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ig=sn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),nd=sn(["#text"]),rd=sn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ua=sn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),od=sn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ui=sn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Mg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Dg=vn(/<%[\w\W]*|[\w\W]*%>/gm),Pg=vn(/\$\{[\w\W]*/gm),Ng=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),qg=vn(/^aria-[\-\w]+$/),ld=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Fg=vn(/^(?:\w+script|data):/i),jg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cd=vn(/^html$/i),Bg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),sd=Object.freeze({__proto__:null,ARIA_ATTR:qg,ATTR_WHITESPACE:jg,CUSTOM_ELEMENT:Bg,DATA_ATTR:Ng,DOCTYPE_NAME:cd,ERB_EXPR:Dg,IS_ALLOWED_URI:ld,IS_SCRIPT_OR_DATA:Fg,MUSTACHE_EXPR:Mg,TMPLIT_EXPR:Pg}),Wo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ug=function(){return typeof window>"u"?null:window},Wg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},id=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ud(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ug(),t=fe=>ud(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Wo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:m}=e,w=a.prototype,C=Uo(w,"cloneNode"),F=Uo(w,"remove"),z=Uo(w,"nextSibling"),se=Uo(w,"childNodes"),X=Uo(w,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let N,L="",{implementation:M,createNodeIterator:B,createDocumentFragment:Q,getElementsByTagName:ne}=n,{importNode:D}=r,Y=id();t.isSupported=typeof ad=="function"&&typeof X=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:U,ERB_EXPR:Z,TMPLIT_EXPR:Ae,DATA_ATTR:he,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:xe}=sd,{IS_ALLOWED_URI:x}=sd,oe=null,$e=pt({},[...td,...Fa,...ja,...Ba,...nd]),de=null,Re=pt({},[...rd,...Ua,...od,...ui]),pe=Object.seal(Wa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,lt=null,ot=Object.seal(Wa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),O=!0,ae=!0,le=!1,ie=!0,ke=!1,ue=!0,Fe=!1,Ge=!1,Qe=!1,Pe=!1,V=!1,j=!1,Ne=!0,ct=!1,Je="user-content-",y=!0,W=!1,Ee={},Ce=null,je=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,dt=pt({},["audio","video","img","source","image","track"]),wt=null,Lt=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),kt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml",I=Be,J=!1,ye=null,S=pt({},[kt,mt,Be],Na),K=pt({},["mi","mo","mn","ms","mtext"]),Ie=pt({},["annotation-xml"]),We=pt({},["title","style","font","a","script"]),qe=null,et=["application/xhtml+xml","text/html"],Oe="text/html",He=null,Ze=null,bt=n.createElement("form"),ze=function(T){return T instanceof RegExp||T instanceof Function},xt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ze&&Ze===T)){if((!T||typeof T!="object")&&(T={}),T=Xn(T),qe=et.indexOf(T.PARSER_MEDIA_TYPE)===-1?Oe:T.PARSER_MEDIA_TYPE,He=qe==="application/xhtml+xml"?Na:di,oe=Sn(T,"ALLOWED_TAGS")?pt({},T.ALLOWED_TAGS,He):$e,de=Sn(T,"ALLOWED_ATTR")?pt({},T.ALLOWED_ATTR,He):Re,ye=Sn(T,"ALLOWED_NAMESPACES")?pt({},T.ALLOWED_NAMESPACES,Na):S,wt=Sn(T,"ADD_URI_SAFE_ATTR")?pt(Xn(Lt),T.ADD_URI_SAFE_ATTR,He):Lt,Ye=Sn(T,"ADD_DATA_URI_TAGS")?pt(Xn(dt),T.ADD_DATA_URI_TAGS,He):dt,Ce=Sn(T,"FORBID_CONTENTS")?pt({},T.FORBID_CONTENTS,He):je,De=Sn(T,"FORBID_TAGS")?pt({},T.FORBID_TAGS,He):Xn({}),lt=Sn(T,"FORBID_ATTR")?pt({},T.FORBID_ATTR,He):Xn({}),Ee=Sn(T,"USE_PROFILES")?T.USE_PROFILES:!1,O=T.ALLOW_ARIA_ATTR!==!1,ae=T.ALLOW_DATA_ATTR!==!1,le=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ie=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ke=T.SAFE_FOR_TEMPLATES||!1,ue=T.SAFE_FOR_XML!==!1,Fe=T.WHOLE_DOCUMENT||!1,Pe=T.RETURN_DOM||!1,V=T.RETURN_DOM_FRAGMENT||!1,j=T.RETURN_TRUSTED_TYPE||!1,Qe=T.FORCE_BODY||!1,Ne=T.SANITIZE_DOM!==!1,ct=T.SANITIZE_NAMED_PROPS||!1,y=T.KEEP_CONTENT!==!1,W=T.IN_PLACE||!1,x=T.ALLOWED_URI_REGEXP||ld,I=T.NAMESPACE||Be,K=T.MATHML_TEXT_INTEGRATION_POINTS||K,Ie=T.HTML_INTEGRATION_POINTS||Ie,pe=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&ze(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&ze(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ke&&(ae=!1),V&&(Pe=!0),Ee&&(oe=pt({},nd),de=[],Ee.html===!0&&(pt(oe,td),pt(de,rd)),Ee.svg===!0&&(pt(oe,Fa),pt(de,Ua),pt(de,ui)),Ee.svgFilters===!0&&(pt(oe,ja),pt(de,Ua),pt(de,ui)),Ee.mathMl===!0&&(pt(oe,Ba),pt(de,od),pt(de,ui))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?ot.tagCheck=T.ADD_TAGS:(oe===$e&&(oe=Xn(oe)),pt(oe,T.ADD_TAGS,He))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?ot.attributeCheck=T.ADD_ATTR:(de===Re&&(de=Xn(de)),pt(de,T.ADD_ATTR,He))),T.ADD_URI_SAFE_ATTR&&pt(wt,T.ADD_URI_SAFE_ATTR,He),T.FORBID_CONTENTS&&(Ce===je&&(Ce=Xn(Ce)),pt(Ce,T.FORBID_CONTENTS,He)),y&&(oe["#text"]=!0),Fe&&pt(oe,["html","head","body"]),oe.table&&(pt(oe,["tbody"]),delete De.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=T.TRUSTED_TYPES_POLICY,L=N.createHTML("")}else N===void 0&&(N=Wg(m,o)),N!==null&&typeof L=="string"&&(L=N.createHTML(""));sn&&sn(T),Ze=T}},qt=pt({},[...Fa,...ja,...Lg]),it=pt({},[...Ba,...Ig]),Yt=function(T){let ee=X(T);(!ee||!ee.tagName)&&(ee={namespaceURI:I,tagName:"template"});let Le=di(T.tagName),p=di(ee.tagName);return ye[T.namespaceURI]?T.namespaceURI===mt?ee.namespaceURI===Be?Le==="svg":ee.namespaceURI===kt?Le==="svg"&&(p==="annotation-xml"||K[p]):!!qt[Le]:T.namespaceURI===kt?ee.namespaceURI===Be?Le==="math":ee.namespaceURI===mt?Le==="math"&&Ie[p]:!!it[Le]:T.namespaceURI===Be?ee.namespaceURI===mt&&!Ie[p]||ee.namespaceURI===kt&&!K[p]?!1:!it[Le]&&(We[Le]||!qt[Le]):!!(qe==="application/xhtml+xml"&&ye[T.namespaceURI]):!1},St=function(T){Fo(t.removed,{element:T});try{X(T).removeChild(T)}catch{F(T)}},It=function(T,ee){try{Fo(t.removed,{attribute:ee.getAttributeNode(T),from:ee})}catch{Fo(t.removed,{attribute:null,from:ee})}if(ee.removeAttribute(T),T==="is")if(Pe||V)try{St(ee)}catch{}else try{ee.setAttribute(T,"")}catch{}},Ut=function(T){let ee=null,Le=null;if(Qe)T="<remove></remove>"+T;else{let k=qa(T,/^[\r\n\t ]+/);Le=k&&k[0]}qe==="application/xhtml+xml"&&I===Be&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let p=N?N.createHTML(T):T;if(I===Be)try{ee=new h().parseFromString(p,qe)}catch{}if(!ee||!ee.documentElement){ee=M.createDocument(I,"template",null);try{ee.documentElement.innerHTML=J?L:p}catch{}}let f=ee.body||ee.documentElement;return T&&Le&&f.insertBefore(n.createTextNode(Le),f.childNodes[0]||null),I===Be?ne.call(ee,Fe?"html":"body")[0]:Fe?ee.documentElement:f},Vt=function(T){return B.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Jt=function(T){return T instanceof _&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Wt=function(T){return typeof l=="function"&&T instanceof l};function Dt(fe,T,ee){ci(fe,Le=>{Le.call(t,T,ee,Ze)})}let un=function(T){let ee=null;if(Dt(Y.beforeSanitizeElements,T,null),Jt(T))return St(T),!0;let Le=He(T.nodeName);if(Dt(Y.uponSanitizeElement,T,{tagName:Le,allowedTags:oe}),ue&&T.hasChildNodes()&&!Wt(T.firstElementChild)&&on(/<[/\w!]/g,T.innerHTML)&&on(/<[/\w!]/g,T.textContent)||T.nodeType===Wo.progressingInstruction||ue&&T.nodeType===Wo.comment&&on(/<[/\w]/g,T.data))return St(T),!0;if(!(ot.tagCheck instanceof Function&&ot.tagCheck(Le))&&(!oe[Le]||De[Le])){if(!De[Le]&&Gt(Le)&&(pe.tagNameCheck instanceof RegExp&&on(pe.tagNameCheck,Le)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Le)))return!1;if(y&&!Ce[Le]){let p=X(T)||T.parentNode,f=se(T)||T.childNodes;if(f&&p){let k=f.length;for(let R=k-1;R>=0;--R){let H=C(f[R],!0);H.__removalCount=(T.__removalCount||0)+1,p.insertBefore(H,z(T))}}}return St(T),!0}return T instanceof a&&!Yt(T)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&on(/<\/no(script|embed|frames)/i,T.innerHTML)?(St(T),!0):(ke&&T.nodeType===Wo.text&&(ee=T.textContent,ci([U,Z,Ae],p=>{ee=jo(ee,p," ")}),T.textContent!==ee&&(Fo(t.removed,{element:T.cloneNode()}),T.textContent=ee)),Dt(Y.afterSanitizeElements,T,null),!1)},Mt=function(T,ee,Le){if(Ne&&(ee==="id"||ee==="name")&&(Le in n||Le in bt))return!1;if(!(ae&&!lt[ee]&&on(he,ee))){if(!(O&&on(ce,ee))){if(!(ot.attributeCheck instanceof Function&&ot.attributeCheck(ee,T))){if(!de[ee]||lt[ee]){if(!(Gt(T)&&(pe.tagNameCheck instanceof RegExp&&on(pe.tagNameCheck,T)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(T))&&(pe.attributeNameCheck instanceof RegExp&&on(pe.attributeNameCheck,ee)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(ee,T))||ee==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&on(pe.tagNameCheck,Le)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Le))))return!1}else if(!wt[ee]){if(!on(x,jo(Le,be,""))){if(!((ee==="src"||ee==="xlink:href"||ee==="href")&&T!=="script"&&Tg(Le,"data:")===0&&Ye[T])){if(!(le&&!on(q,jo(Le,be,"")))){if(Le)return!1}}}}}}}return!0},Gt=function(T){return T!=="annotation-xml"&&qa(T,xe)},Ft=function(T){Dt(Y.beforeSanitizeAttributes,T,null);let{attributes:ee}=T;if(!ee||Jt(T))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},p=ee.length;for(;p--;){let f=ee[p],{name:k,namespaceURI:R,value:H}=f,re=He(k),_e=H,we=k==="value"?_e:Cg(_e);if(Le.attrName=re,Le.attrValue=we,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Dt(Y.uponSanitizeAttribute,T,Le),we=Le.attrValue,ct&&(re==="id"||re==="name")&&(It(k,T),we=Je+we),ue&&on(/((--!?|])>)|<\/(style|title|textarea)/i,we)){It(k,T);continue}if(re==="attributename"&&qa(we,"href")){It(k,T);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){It(k,T);continue}if(!ie&&on(/\/>/i,we)){It(k,T);continue}ke&&ci([U,Z,Ae],ft=>{we=jo(we,ft," ")});let Ue=He(T.nodeName);if(!Mt(Ue,re,we)){It(k,T);continue}if(N&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!R)switch(m.getAttributeType(Ue,re)){case"TrustedHTML":{we=N.createHTML(we);break}case"TrustedScriptURL":{we=N.createScriptURL(we);break}}if(we!==_e)try{R?T.setAttributeNS(R,k,we):T.setAttribute(k,we),Jt(T)?St(T):ed(t.removed)}catch{It(k,T)}}Dt(Y.afterSanitizeAttributes,T,null)},$t=function fe(T){let ee=null,Le=Vt(T);for(Dt(Y.beforeSanitizeShadowDOM,T,null);ee=Le.nextNode();)Dt(Y.uponSanitizeShadowNode,ee,null),un(ee),Ft(ee),ee.content instanceof s&&fe(ee.content);Dt(Y.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(fe){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ee=null,Le=null,p=null,f=null;if(J=!fe,J&&(fe="<!-->"),typeof fe!="string"&&!Wt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Bo("dirty is not a string, aborting")}else throw Bo("toString is not a function");if(!t.isSupported)return fe;if(Ge||xt(T),t.removed=[],typeof fe=="string"&&(W=!1),W){if(fe.nodeName){let H=He(fe.nodeName);if(!oe[H]||De[H])throw Bo("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)ee=Ut("<!---->"),Le=ee.ownerDocument.importNode(fe,!0),Le.nodeType===Wo.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?ee=Le:ee.appendChild(Le);else{if(!Pe&&!ke&&!Fe&&fe.indexOf("<")===-1)return N&&j?N.createHTML(fe):fe;if(ee=Ut(fe),!ee)return Pe?null:j?L:""}ee&&Qe&&St(ee.firstChild);let k=Vt(W?fe:ee);for(;p=k.nextNode();)un(p),Ft(p),p.content instanceof s&&$t(p.content);if(W)return fe;if(Pe){if(V)for(f=Q.call(ee.ownerDocument);ee.firstChild;)f.appendChild(ee.firstChild);else f=ee;return(de.shadowroot||de.shadowrootmode)&&(f=D.call(r,f,!0)),f}let R=Fe?ee.outerHTML:ee.innerHTML;return Fe&&oe["!doctype"]&&ee.ownerDocument&&ee.ownerDocument.doctype&&ee.ownerDocument.doctype.name&&on(cd,ee.ownerDocument.doctype.name)&&(R="<!DOCTYPE "+ee.ownerDocument.doctype.name+`>
`+R),ke&&ci([U,Z,Ae],H=>{R=jo(R,H," ")}),N&&j?N.createHTML(R):R},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(fe),Ge=!0},t.clearConfig=function(){Ze=null,Ge=!1},t.isValidAttribute=function(fe,T,ee){Ze||xt({});let Le=He(fe),p=He(T);return Mt(Le,p,ee)},t.addHook=function(fe,T){typeof T=="function"&&Fo(Y[fe],T)},t.removeHook=function(fe,T){if(T!==void 0){let ee=Sg(Y[fe],T);return ee===-1?void 0:Eg(Y[fe],ee,1)[0]}return ed(Y[fe])},t.removeHooks=function(fe){Y[fe]=[]},t.removeAllHooks=function(){Y=id()},t}var dd=ud();var Qn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pi=e=>(...t)=>({_$litDirective$:e,values:t}),to=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var zo=class extends to{constructor(t){if(super(t),this.it=Rt,t.type!==Qn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Rt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};zo.directiveName="unsafeHTML",zo.resultType=1;var pd=pi(zo);function Va(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xr=Va();function yd(e){xr=e}var Yo={exec:()=>null};function ht(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ln.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var zg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ln={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Hg=/^(?:[ \t]*(?:\n|$))+/,Gg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Kg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Xa=/(?:[*+-]|\d{1,9}[.)])/,vd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,wd=ht(vd).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vg=ht(vd).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Qa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xg=/^[^\n]+/,Za=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Qg=ht(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Za).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Zg=ht(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Xa).getRegex(),bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ja=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Jg=ht("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ja).replace("tag",bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),kd=ht(Qa).replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),eh=ht(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",kd).getRegex(),el={blockquote:eh,code:Gg,def:Qg,fences:Kg,heading:Yg,hr:Vo,html:Jg,lheading:wd,list:Zg,newline:Hg,paragraph:kd,table:Yo,text:Xg},fd=ht("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),th={...el,lheading:Vg,table:fd,paragraph:ht(Qa).replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",fd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex()},nh={...el,html:ht(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ja).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ht(Qa).replace("hr",Vo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",wd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,oh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$d=/^( {2,}|\\)\n(?!\s*$)/,sh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,yi=/[\p{P}\p{S}]/u,tl=/[\s\p{P}\p{S}]/u,xd=/[^\s\p{P}\p{S}]/u,ih=ht(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,tl).getRegex(),Ad=/(?!~)[\p{P}\p{S}]/u,ah=/(?!~)[\s\p{P}\p{S}]/u,lh=/(?:[^\s\p{P}\p{S}]|~)/u,ch=ht(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",zg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Sd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,uh=ht(Sd,"u").replace(/punct/g,yi).getRegex(),dh=ht(Sd,"u").replace(/punct/g,Ad).getRegex(),Ed="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ph=ht(Ed,"gu").replace(/notPunctSpace/g,xd).replace(/punctSpace/g,tl).replace(/punct/g,yi).getRegex(),fh=ht(Ed,"gu").replace(/notPunctSpace/g,lh).replace(/punctSpace/g,ah).replace(/punct/g,Ad).getRegex(),_h=ht("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xd).replace(/punctSpace/g,tl).replace(/punct/g,yi).getRegex(),mh=ht(/\\(punct)/,"gu").replace(/punct/g,yi).getRegex(),gh=ht(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),hh=ht(Ja).replace("(?:-->|$)","-->").getRegex(),bh=ht("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",hh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,yh=ht(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Td=ht(/^!?\[(label)\]\[(ref)\]/).replace("label",mi).replace("ref",Za).getRegex(),Cd=ht(/^!?\[(ref)\](?:\[\])?/).replace("ref",Za).getRegex(),vh=ht("reflink|nolink(?!\\()","g").replace("reflink",Td).replace("nolink",Cd).getRegex(),_d=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,nl={_backpedal:Yo,anyPunctuation:mh,autolink:gh,blockSkip:ch,br:$d,code:oh,del:Yo,emStrongLDelim:uh,emStrongRDelimAst:ph,emStrongRDelimUnd:_h,escape:rh,link:yh,nolink:Cd,punctuation:ih,reflink:Td,reflinkSearch:vh,tag:bh,text:sh,url:Yo},wh={...nl,link:ht(/^!?\[(label)\]\((.*?)\)/).replace("label",mi).getRegex(),reflink:ht(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mi).getRegex()},Ga={...nl,emStrongRDelimAst:fh,emStrongLDelim:dh,url:ht(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",_d).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ht(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",_d).getRegex()},kh={...Ga,br:ht($d).replace("{2,}","*").getRegex(),text:ht(Ga.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fi={normal:el,gfm:th,pedantic:nh},Ho={normal:nl,gfm:Ga,breaks:kh,pedantic:wh},$h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},md=e=>$h[e];function Zn(e,t){if(t){if(ln.escapeTest.test(e))return e.replace(ln.escapeReplace,md)}else if(ln.escapeTestNoEncode.test(e))return e.replace(ln.escapeReplaceNoEncode,md);return e}function gd(e){try{e=encodeURI(e).replace(ln.percentDecode,"%")}catch{return null}return e}function hd(e,t){let n=e.replace(ln.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(ln.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ln.slashPipe,"|");return r}function Go(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function xh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function bd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Ah(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var gi=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||xr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Go(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ah(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Go(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Go(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Go(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=_,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,w=m.raw+`
`+n.join(`
`),C=this.blockquote(w);s[s.length-1]=C,r=r.substring(0,r.length-m.raw.length)+C.raw,o=o.substring(0,o.length-m.text.length)+C.text;break}else if(h?.type==="list"){let m=h,w=m.raw+`
`+n.join(`
`),C=this.list(w);s[s.length-1]=C,r=r.substring(0,r.length-h.raw.length)+C.raw,o=o.substring(0,o.length-m.raw.length)+C.raw,n=w.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),h=e.split(`
`,1)[0],m=!_.trim(),w=0;if(this.options.pedantic?(w=2,d=_.trimStart()):m?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=_.slice(w),w+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(w),F=this.rules.other.hrRegex(w),z=this.rules.other.fencesBeginRegex(w),se=this.rules.other.headingBeginRegex(w),X=this.rules.other.htmlBeginRegex(w);for(;e;){let N=e.split(`
`,1)[0],L;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),z.test(h)||se.test(h)||X.test(h)||C.test(h)||F.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=w||!h.trim())d+=`
`+L.slice(w);else{if(m||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||z.test(_)||se.test(_)||F.test(_))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=N+`
`,e=e.substring(N.length+1),_=L.slice(w)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=hd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(hd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Go(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=xh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),bd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return bd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,_=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=_.slice(1,-1);return{type:"em",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},En=class Ka{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xr,this.options.tokenizer=this.options.tokenizer||new gi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ln,block:fi.normal,inline:Ho.normal};this.options.pedantic?(n.block=fi.pedantic,n.inline=Ho.pedantic):this.options.gfm&&(n.block=fi.gfm,this.options.breaks?n.inline=Ho.breaks:n.inline=Ho.gfm),this.tokenizer.rules=n}static get rules(){return{block:fi,inline:Ho}}static lex(t,n){return new Ka(n).lex(t)}static lexInline(t,n){return new Ka(n).inlineTokens(t)}lex(t){t=t.replace(ln.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ln.tabCharGlobal,"    ").replace(ln.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},hi=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||xr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ln.notSpaceStart)?.[0],o=e.replace(ln.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Zn(r)+'">'+(n?o:Zn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Zn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=gd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Zn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=gd(e);if(o===null)return Zn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Zn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zn(e.text)}},rl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Tn=class Ya{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||xr,this.options.renderer=this.options.renderer||new hi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new rl}static parse(t,n){return new Ya(n).parse(t)}static parseInline(t,n){return new Ya(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},_i,Ko=(_i=class{constructor(e){At(this,"options");At(this,"block");this.options=e||xr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?En.lex:En.lexInline}provideParser(){return this.block?Tn.parse:Tn.parseInline}},At(_i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(_i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_i),Sh=class{constructor(...e){At(this,"defaults",Va());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",Tn);At(this,"Renderer",hi);At(this,"TextRenderer",rl);At(this,"Lexer",En);At(this,"Tokenizer",gi);At(this,"Hooks",Ko);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new hi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new gi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Ko;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Ko.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Ko.passThroughHooksRespectAsync.has(s))return(async()=>{let _=await l.call(o,u);return a.call(o,_)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(o,u);return _===!1&&(_=await a.apply(o,u)),_})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return En.lex(e,t??this.defaults)}parser(e,t){return Tn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?En.lex:En.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?En.lex:En.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Tn.parse:Tn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Zn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},$r=new Sh;function vt(e,t){return $r.parse(e,t)}vt.options=vt.setOptions=function(e){return $r.setOptions(e),vt.defaults=$r.defaults,yd(vt.defaults),vt};vt.getDefaults=Va;vt.defaults=xr;vt.use=function(...e){return $r.use(...e),vt.defaults=$r.defaults,yd(vt.defaults),vt};vt.walkTokens=function(e,t){return $r.walkTokens(e,t)};vt.parseInline=$r.parseInline;vt.Parser=Tn;vt.parser=Tn.parse;vt.Renderer=hi;vt.TextRenderer=rl;vt.Lexer=En;vt.lexer=En.lex;vt.Tokenizer=gi;vt.Hooks=Ko;vt.parse=vt;var I$=vt.options,M$=vt.setOptions,D$=vt.use,P$=vt.walkTokens,N$=vt.parseInline;var q$=Tn.parse,F$=En.lex;function lr(e){let t=vt.parse(e),n=dd.sanitize(t);return pd(n)}function Jn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function no(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function vi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Od={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Eh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Th=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ch=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function ol(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function sl(e,t){let n=ol(e),r=ol(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Ld(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Cn(o)&&typeof o.text=="string"?o.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Rh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Od[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ol(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=sl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=sl(Cn(l)?l.old_string:"",Cn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function il(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Oh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Id(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Cn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Oh,"").trim();return n.length>0?{kind:"user",text:n}:null}function al(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Th.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ch.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Lh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Ih(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Cn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(al(i.text));else if(i.type==="thinking"){let l=il(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Rh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Rd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Cn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Ld(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Id(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Rd([o],n):[o]}return[]}function Rd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Mh(e){let t=typeof e.command=="string"?e.command:"",n=Ld(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Od.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Dh(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[al(t.text)];if(t.type==="user_message"){let n=Id(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=il(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Mh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ph(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[al(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=il(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Eh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Nh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function qh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function Md(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=qh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Lh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Ph(s):Nh(s)?Dh(s):Ih(s,n);return i.length>0&&(r.progress=null),i}}}function ll(e){let t=[],n=Md(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Fh=5,jh=10,Bh=/Task\s+#(\d+)/,Uh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function zh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Hh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Gh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Bh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Kh(e){if(e.tool==="Bash"){let t=e.command||"";return Uh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Yh(e){let t=e.filter(o=>o.kind==="tool").slice(-jh),n=new Map;t.forEach((o,s)=>{let i=Kh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Vh(e){let t=Hh(e);if(t)return{text:t,guess:!1};let n=Gh(e);if(n)return{text:n,guess:!1};let r=Yh(e);return r?{text:r,guess:!0}:null}function Xh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:nn(e,t)}function ro(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,_={},h=!0,m=new Set,w=new Set,C=null,F=null,z=!1,se=!1,X=!1,N=null,L=null;function M(){z=!1,se=!1,X=!1,N=null,L=null}async function B(V){if(n){se=!0,X=!1,De();try{let j=await Promise.resolve(n("get-attempt-prompt",{attempt_id:V,...u?{root_dir:u}:{}}));if(s!==V)return;!j||typeof j!="object"||Array.isArray(j)?X=!0:(N=j,L=V)}catch{s===V&&(X=!0)}finally{s===V&&(se=!1,De())}}}function Q(){if(z=!z,z&&s&&L!==s){B(s);return}De()}function ne(){if(!z)return"";let V=no({loading:se,error:X});if(V)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${V}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=vi(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?c`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let V=r.get(a);return ll(V?V.lines:[])}function Y(){if(!a||!r)return null;let V=r.get(a),j=V?V.last_event_at:null;return typeof j=="number"?j:null}function U(){return _.status==="running"}function Z(){if(U()&&s){F||(F=setInterval(()=>De(),1e3));return}Ae()}function Ae(){F&&(clearInterval(F),F=null)}function he(V){let j=[],Ne=0;for(;Ne<V.length;){let{idx:ct,line:Je}=V[Ne];if(Je.kind==="tool"){let y=Ne;for(;y<V.length&&V[y].line.kind==="tool"&&V[y].line.tool===Je.tool;)y+=1;if(y-Ne>=Fh&&!w.has(ct)){j.push({kind:"group",idx:ct,tool:Je.tool||"",lines:V.slice(Ne,y)}),Ne=y;continue}}j.push({kind:"line",idx:ct,line:Je}),Ne+=1}return j}function ce(V){let j=[],Ne=new Map;for(let y=0;y<V.length;y+=1){let W=V[y],Ee=W.parent_tool_use_id;if(typeof Ee=="string"&&Ee.length>0){let Ce=Ne.get(Ee);Ce||(Ce={kind:"subagent",idx:y,launch_id:Ee,agent_type:null,header:null,lines:[]},Ne.set(Ee,Ce),j.push(Ce)),Ce.lines.push({idx:y,line:W});continue}if(W.kind==="tool"&&W.tool==="Agent"&&typeof W.launch_id=="string"&&W.launch_id.length>0){let Ce=q(W),je=Ne.get(W.launch_id);if(je){je.header={idx:y,line:W},je.agent_type=Ce;continue}let Ye={kind:"subagent",idx:y,launch_id:W.launch_id,agent_type:Ce,header:{idx:y,line:W},lines:[]};Ne.set(W.launch_id,Ye),j.push(Ye);continue}j.push({kind:"entry",idx:y,line:W})}let ct=[],Je=0;for(;Je<j.length;){if(j[Je].kind!=="entry"){ct.push(j[Je]),Je+=1;continue}let y=Je;for(;y<j.length&&j[y].kind==="entry";)y+=1;ct.push(...he(j.slice(Je,y))),Je=y}return ct}function q(V){let j=V.input;return j&&typeof j.subagent_type=="string"?j.subagent_type:null}function be(V){for(let j=V.length-1;j>=0;j-=1){let Ne=V[j];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function xe(V){for(let j=V.length-1;j>=0;j-=1)if(V[j].kind==="thinking")return V[j];return null}function x(V,j){if(j.kind==="gate")return c`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return c`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return c`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${lr(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let Ne=m.has(V);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(V)}
      >
        <span class="sv__think-line">💭 ${Xo(j.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="user"){let Ne=m.has(V);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(V)}
      >
        <span class="sv__user-line">▷ ${Xo(j.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let Ne=m.has(V),ct=j.tool==="Bash"?zh(j.command):0,Je=j.tool==="Bash"?ct>1?Xo(j.command):j.command:j.path||j.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ot(V)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${Je?c`<span class="sv__tool-detail">${Je}</span>`:""}
          ${ct>1?c`<span class="sv__tool-more">⋯ ${ct}줄</span>`:""}
          ${typeof j.added=="number"?c`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?c`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?c`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${oe(j)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${lr(j.text||"")}</div>`}function oe(V){let j=[];if(V.tool==="Bash"&&typeof V.command=="string"&&V.command.length>0)j.push(V.command);else if(V.input!==void 0)try{j.push(`input: ${JSON.stringify(V.input,null,2)}`)}catch{}return typeof V.output=="string"&&V.output.length>0&&j.push(`output:
${V.output}`),j.join(`

`)}function $e(){if(!s)return c``;let V=D(),j=(i?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Ne=_.session_id||"",ct=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Je=U(),y=Je?Xh(Y(),Date.now()):"",W=Je?be(V):null,Ee=Je?xe(V):null,Ce=Vh(V);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(i?_.role||"":s)}</span
        >
        ${Ce?c`<span
              class="sv__stage${Ce.guess?" sv__stage--guess":""}"
              title=${Ce.text}
              >${Ce.text}</span
            >`:""}
        ${Je?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${y?c`<span class="sv__live-ago">${y}</span>`:""}</span
            >`:""}
        ${Ne?c`<button
              type="button"
              class="sv__session"
              title=${Ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ne}`}
              @click=${()=>ae(Ne)}
            >
              ⧉ ${Ne.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>ae(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${j?c`<span class="sv__meta">${j}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${z?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${z?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${Q}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${ct}
          @click=${O}
        >
          <span class="sv__follow-full">⇣ ${ct}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Pe()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ne()}
      <div class="sv__body">
        ${V.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ce(V).map(je=>je.kind==="subagent"?Re(je):je.kind==="group"?de(je):x(je.idx,je.line))}
      </div>
      ${W||Ee?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${W?c`<span class="sv__now-icon">${W.icon}</span>
                  <span class="sv__now-name">${W.tool}</span>
                  <span class="sv__now-detail"
                    >${W.tool==="Bash"?Xo(W.command):W.path||W.command||""}</span
                  >`:""}
            ${Ee?c`<span class="sv__now-think"
                  >💭 ${Xo(Ee.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function de(V){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(V.idx)}
    >
      <span class="sv__group-icon">${V.lines[0].line.icon}</span>
      <span class="sv__group-name">${V.tool}</span>
      <span class="sv__group-count">${V.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Re(V){let j=w.has(V.idx),Ne=V.header?V.header.line:null,ct=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",Je=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${j?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(V.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${V.agent_type||"subagent"}</span>
        ${Je?c`<span class="sv__sub-detail">${Je}</span>`:""}
        <span class="sv__sub-count">${V.lines.length}줄</span>
        ${ct?c`<span class="sv__sub-state">${ct}</span>`:""}
        ${j?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${j?c`<div class="sv__sub-body">
            ${he(V.lines).map(y=>y.kind==="group"?de(y):x(y.idx,y.line))}
          </div>`:""}
    </div>`}function pe(V){w.add(V),De()}function De(){rt($e(),e),Z(),h&&lt()}function lt(){let V=e.querySelector(".sv__body");V&&(V.scrollTop=V.scrollHeight)}function ot(V){m.has(V)?m.delete(V):m.add(V),De()}function O(){h=!h,De()}function ae(V){rn(V).then(j=>{j?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function le(V){!s||!V||(_={..._,...V},De())}function ie(V){let j=V.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&h&&(h=!1,De())}e.addEventListener("scroll",ie,!0);function ke(V){let j=V.target;!j||typeof j.closest!="function"||e.contains(j)||j.closest("dialog")||j.closest(".md-viewer-root")||Pe()}let ue=!1;function Fe(){ue||(document.addEventListener("mousedown",ke),ue=!0)}function Ge(){ue&&(document.removeEventListener("mousedown",ke),ue=!1)}function Qe(V){let j=V&&V.attempt_id;if(!j)return;let Ne=typeof V.launch_id=="string"&&V.launch_id.length>0?V.launch_id:null,ct=V.session_ref&&typeof V.session_ref=="object"?V.session_ref:null;if(Ne&&ct)return;let Je=a;s=j,i=Ne,l=ct,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Je&&Je!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Je})).catch(()=>{}),u=typeof V.root_dir=="string"&&V.root_dir.length>0?V.root_dir:null,_=V.meta||{},d=V.hide_prompt===!0,h=!0,m.clear(),w.clear(),M(),!C&&r&&(C=r.subscribe(De)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Fe(),De()}function Pe(){let V=a;Ge(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),w.clear(),M(),Ae(),n&&V&&Promise.resolve(n("unsubscribe-session-log",{id:V})).catch(()=>{}),rt(c``,e),o&&o()}return{open:Qe,updateMeta:le,close:Pe,isOpen(){return s!==null},destroy(){Ae(),Ge(),C&&(C(),C=null),e.removeEventListener("scroll",ie,!0),s=null,i=null,l=null,a=null,u=null,d=!1,rt(c``,e)}}}function Qh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Zh(e){let t=e&&e.metadata||{},n=Dr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Qh(t)?null:"plan_pending"}),r}function Dd(e,t){let n=Zh(e);return c`
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
  `}var Jh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",eb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,tb=/^\*\*결론\*\* — (.+)$/;function wi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Jh)return null;let n=eb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?tb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Pd=20;function Nd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function nb(e){return e.length>Pd?`${e.slice(0,Pd)}\u2026`:e}function rb(e,t,n,r){let o=`${t.lane} ${nb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Nd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${lr(t.body)}
        </div>`:""}
  </div>`}function ob(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Nd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${lr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function qd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=wi(typeof a.text=="string"?a.text:"");return u?rb(a,u,t,o.has(a.id)):ob(a)})}
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
  `}var{I:yx}=Pl;var Fd=e=>e.strings===void 0;var sb={},jd=(e,t=sb)=>e._$AH=t;var Ar=pi(class extends to{constructor(e){if(super(e),e.type!==Qn.PROPERTY&&e.type!==Qn.ATTRIBUTE&&e.type!==Qn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Fd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Rt)return t;let n=e.element,r=e.name;if(e.type===Qn.PROPERTY){if(t===n[r])return yn}else if(e.type===Qn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Qn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return jd(e),t}});var ib=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],cl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Bd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},ab={pin:"pin",global:"global",base:"base"};function lb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ab[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function cb(e,t,n){switch(e){case"workflow_mode":return wo;case"spec_review_model":case"impl_review_model":return ko;case"plan_review_model":return Os;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ls;case"impl_dispatch":return zc;case"impl_runtime":return Rs;case"impl_model":return Yr(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return vo;case"orchestration_model":return $o(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||mn).filter(r=>r!==mn);default:return[]}}function ub(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${lb(e.source)}
    <span class="detail-effective__k"
      >${or[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Is[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${or[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Ud(e,t){let n=pa.flatMap(a=>a.keys),r=fa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Qc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${db(s)}</span
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
          ${pa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ss({key:u.key,choices:cb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return ub(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ar(e.preset_id)}
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
  </details>`}function db(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function pb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Wd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=pb(r.exec_receipt),u=a?Wn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],_=xs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",w=Ao(n),C=w!==null&&t.isChipOpen?.("rec")===!0,F=C?$a({rec:w},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${m}</a
          >`:""}
      ${_?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${_.kind}
            title=${_.title}
            >${_.label}</span
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
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${w.state}
            aria-expanded=${C?"true":"false"}
            title=${Ps(w)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${F?Gr(F):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${fb(s).map(z=>_b(z,n,o,{label:z.id==="pr"?m:z.label,href:z.id==="pr"?i:""}))}
    </div>
  </section>`}function fb(e){let n=typeof e=="string"&&Object.hasOwn(cl,e)&&cl[e]||cl.spec_backed;return ib.filter(r=>n.includes(r.id))}var ki={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function _b(e,t,n,r){let o=mb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",_=u?ki.stale:l?ki.on:a?ki.current:ki.none,h=gb(e,n),m=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,w=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${w}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${C}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${C}</span
  >`}function mb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function gb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Bd,n)?Bd[n]:""}function $i(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zd(e){return $i(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Hd(e,t){let n=e&&e[t];if(!$i(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(zd),o=zd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Yd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function xi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Yd(e)}${t}`}function oo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Yd(e)}`}function hb(e,t,n){if(n!==null){let o=e==="claude"?xi:oo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:oo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Gd(e,t){if(!$i(e)||e.state!=="usable"||!$i(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Kd(e){let t=e.provider_key==="claude"?xi:oo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${hb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Vd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Kd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Hd(t,"claude"),selected:o,workspace_default:Gd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Kd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Hd(t,"codex"),selected:s,workspace_default:Gd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function bb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function yb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ai(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${bb(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>m()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${lr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){rt(d(),e)}async function h(C,F={}){o=C,s="loading",i="",l=null,a="",_();let z=F.workspace||(n?n():"");if(!z){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let se="/api/doc?workspace="+encodeURIComponent(z)+"&path="+encodeURIComponent(C);try{let X=await r(se),N=await X.json().catch(()=>({}));if(!X.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&F.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||X.status)+")",_();return}let L=yb(String(N.content||""));l=L.front,i=L.body,s="ready",_()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function m(){o=null,rt(c``,e)}function w(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:w}}var vb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Zd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Si=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],wb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Xd(e){return typeof e=="string"&&wb.has(e)}var kb=["running","done","failed","interrupted"],$b={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function xb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ab(e){let t=Qt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=zr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Zd}
          >부분 집계</span
        >`:""}`}function Qd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function pl(e){if(typeof e=="number")return Qo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Qo(t):""}function Sb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Eb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ul(e){return e===null||typeof e=="string"&&e.trim().length>0}function dl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Tb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Si.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ul(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ul(t.effort))||!(!("agent_type"in t)||ul(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!kb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!dl(t.started_at)||!dl(t.last_event_at)||!dl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Cb(e,t,n){let o=Qt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${pl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${pl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function Rb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Qt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Qo(e.last_event_at):o?pl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,Sb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Eb(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${$b[e.status]}</span
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
  </button>`}function Ob(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Lb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let _=Tb(d);!_||o.has(_.launch_id)||Xd(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let i={};for(let{role:d,provider:_}of Si){let h=t?t.roles[d]?.[_]:null;i[d]=h?[...h.legs]:[]}let l=Si.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:_}of Si){for(let h of r.filter(m=>m.role===d&&m.provider===_)){let m=l.find(w=>w.receipt_id===h.launch_id)||null;m&&!Ob(h,m)||(m&&a.add(m.receipt_id),u.push(Rb(h,m,e.attempt_id,n)))}for(let h of i[d])!a.has(h.receipt_id)&&!Xd(h.agent_type)&&u.push(Cb(d,_,h))}return u}function Ib(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...vb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${xb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Zd}</span>`:""}
  </div>`}var Mb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Qo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Db(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Pb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Nb(e,t){let n=Pb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ra(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${bo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Qo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Jd(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,w)=>w.index-m.index)],l=i.map(m=>Nb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,F=u.has(m.attempt_id),z=C&&!F,se=C?F?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!z}
      title=${se}
      @click=${X=>{X.stopPropagation(),z&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,F=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${F}>
      ${m.cause}
    </div>`},h=m=>{let w=Qd(aa(m));if(Qt(w).length===0&&!zr(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${F=>{F.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Ab(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let w=aa(m),C=Qd(w),F=Qt(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Mb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${go(m)?c`<span
                  class="detail-session__resumed"
                  title=${go(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${yr(m)}</span>
            ${F.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${F.length>0?F.map(z=>c`<span
                      class="detail-session__usage"
                      title=${z.tooltip}
                      >${z.label}</span
                    >`):zr(m.usage)?c`<span class="detail-session__usage"
                    >${zr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Qo(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${_(m)} ${Db(m)}
          ${a.has(m.attempt_id)&&m.usage?Ib(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Lb(m,w,t)}
        </div>`})}
    </div>
  `}function ep(e,t={}){return c`
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
          ${qb(e)}
        </div>`:""}
  `}function qb(e){let t=no(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Jn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=vi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Jn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Jn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Sr=10;function tp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function np(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Sr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${tp(l.at)?c`<span class="detail-timeline__at"
                  >${tp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${i>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${i})
        </button>`:""}
  `}var Fb=["open","in_progress","deferred","resolved","closed"],jb=[0,1,2,3,4];function rp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,_={},h="",m=!1,w=[],C=!1,F={},z={claude:null,codex:null},se=null,X=null,N=0,L=!1,M=!1,B="",Q="",ne="",D="",Y=!1;function U(){L=!1,M=!1,B="",Q="",ne="",D="",Y=!1}function Z(){z={claude:null,codex:null},se=null,X=null,N+=1}async function Ae(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function he(v){try{let P=await fetch(v);if(!P.ok)return null;let G=await P.json();if(!G||typeof G!="object"||!Array.isArray(G.accounts))return null;let ve=G.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:ve,active:ve.find(tt=>tt.active===!0)||null}}catch{return null}}async function ce(v){X=v;let P=++N,[G,ve,tt]=await Promise.all([he("/api/claude-usage"),he("/api/codex-usage"),Ae()]);P!==N||v!==u||(z={claude:G,codex:ve},se=tt,st())}let q=[],be=null,xe=null,x=!1,oe="",$e=!1,de=0,Re=new Set;function pe(){q=[],be=null,xe=null,x=!1,oe="",$e=!1,de+=1,Re.clear()}async function De(v){if(!o)return;let P=++de;try{let G=await Promise.resolve(o("get-comments",{id:v}));if(P!==de||v!==u)return;q=Array.isArray(G)?G:[],x=!1}catch{if(P!==de||v!==u)return;x=!0}st()}function lt(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(be!==u){be=u,xe=v,De(u);return}v!==null&&v!==xe&&(xe=v,De(u))}function ot(v){Re.has(v)?Re.delete(v):Re.add(v),st()}function O(v){let P=oe.trim().length===0;oe=v,P!==(v.trim().length===0)&&st()}async function ae(){let v=oe.trim();if(!o||!u||v.length===0||$e)return;let P=u;$e=!0,st();let G=!1;try{let ve=await Promise.resolve(o("add-comment",{id:P,text:v}));Array.isArray(ve)&&ve.length>0&&(G=!0,P===u&&(q=ve,x=!1,oe="",xe=ve.length))}catch{G=!1}G||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&($e=!1),st()}let le={onToggle:ot,onDraftInput:O,onSubmit:ae},ie=t.mdViewer||null,ke=null;ie||(ke=document.createElement("div"),ke.className="md-viewer-root",document.body.appendChild(ke));let ue=ie||Ai(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let Ge=ro(Fe,{transport:o?(v,P)=>Promise.resolve(o(v,P)):void 0,sessionLogStore:a}),Qe=!1,Pe=!1,V=!1,j=null,Ne=null,ct=0;function Je(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function y(){Qe=!1,Pe=!1,V=!1,j=null,Ne=null,ct+=1}async function W(v){if(!o)return;let P=++ct;Pe=!0,V=!1,st();try{let G=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(P!==ct)return;!G||typeof G!="object"||Array.isArray(G)?V=!0:(j=G,Ne=Je(v))}catch{P===ct&&(V=!0)}finally{P===ct&&(Pe=!1,st())}}let Ee=[],Ce=null,je=0;function Ye(v,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${P}`}function dt(){Ee=[],Ce=null,je+=1}async function wt(v,P){if(!o)return;let G=++je,ve;try{ve=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{ve=null}G!==je||P!==Ce||(Ee=ve&&Array.isArray(ve.sessions)?ve.sessions:[],st())}function Lt(){if(!o||!u)return;let v=d&&d.metadata,P=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(P===null){dt();return}let G=Ye(u,P);Ce!==G&&(Ee=[],Ce=G,wt(u,G))}let kt=[],mt=[],Be=Sr,I=null,J=0;function ye(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function S(){kt=[],mt=[],Be=Sr,I=null,J+=1}async function K(v,P){if(!o)return;let G=++J,ve;try{ve=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{ve=null}G!==J||P!==I||(kt=ve&&Array.isArray(ve.events)?ve.events:[],mt=ve&&Array.isArray(ve.attempts)?ve.attempts:[],Be=Sr,st())}function Ie(){if(!o||!u)return;let v=ye(u);I!==v&&(kt=[],mt=[],Be=Sr,I=v,K(u,v))}function We(){Be+=Sr,st()}function qe(){if(Qe=!Qe,Qe&&u&&Ne!==Je(u)){j=null,W(u);return}st()}function et(){let v={};for(let G of mt)G&&typeof G=="object"&&G.bead_id===u&&(v[String(G.attempt_id)]=G);let P=i?i.get():null;for(let G of P&&P.attempts?Object.values(P.attempts):[]){let ve=G;ve&&ve.bead_id===u&&(v[String(ve.attempt_id)]=ve)}return v}function Oe(){return u?Object.values(et()).sort((P,G)=>(G.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function He(){return u?Gn(et(),u):null}let Ze=new Set;function bt(v){Ze.has(v)?Ze.delete(v):Ze.add(v),st()}function ze(v){let P=i?i.get():null,G=P&&P.attempts?P.attempts[v]:null;Ge.open({attempt_id:v,meta:G?{runner:G.runner||void 0,model:G.model||void 0,effort:G.effort||void 0,status:G.status||void 0,session_id:G.session_id||void 0}:{}})}function xt(v,P){let G=i?i.get():null,ve=G&&G.attempts?G.attempts[v]:null,nt=(ve&&Array.isArray(ve.delegation_sessions)?ve.delegation_sessions:[]).find(gt=>gt&&typeof gt=="object"&&gt.launch_id===P);nt&&Ge.open({attempt_id:v,launch_id:P,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function qt(v){if(!o||!v)return;let P=await Br();if(P===null)return;let G=()=>{let gt=i?i.get():null;return gt&&typeof gt.revision=="number"?gt.revision:0},ve=async(gt={},Ve=G())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Ve,...P!==""?{instructions:P}:{},...gt}),tt=gt=>{gt?.queue&&i?.set&&i.set(gt.queue)},nt=await ve();if(tt(nt),nt&&nt.conflict){let gt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:G();nt=await ve({},gt),tt(nt)}nt=await zn(nt,(gt,Ve)=>ve({continuation:gt,decision_token:Ve}),{onResult:tt,refresh:()=>ve()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function it(v){!v||!u||Ge.open(Ur(v,u,d&&d.status))}let Yt={onOpen:ze,onOpenDelegation:xt,onResume:qt,onToggleUsage:bt,onOpenSessionRef:it,onCopyResumeCommand:f};function St(){let v=i?i.get():null,P={...F};for(let G of["orchestration_model","orchestration_effort","orchestration_speed"]){let ve=v&&v[G];typeof ve=="string"&&(P[G]=ve)}return P}async function It(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));F=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{F={}}st()}}function Ut(){let v=i?i.get():null;return v&&v.runner_catalog||null}function Vt(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Jt(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},G=fn({pin:{...v,..._},global:St(),execution_defaults:Vt(),runner_catalog:Ut(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return xn(Ut(),G)}function Wt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Dt(v){return v?.compatible===!1}function un(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Mt(){let v=Wt(),P=v?.presets.find(G=>G.id===h);if(!(!o||!u||!v||!P||Dt(P)||m)){m=!0,w=[],st();try{let G=await Promise.resolve(o("apply-impl-preset",Jc(u,P.id,v.revision)));if(G&&G.conflict){un(G),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ve=G&&Array.isArray(G.issue)?G.issue[0]:G?.issue;if(G&&G.applied&&ve&&typeof ve=="object"){d=ve,w=Array.isArray(G.skipped_orchestration_keys)?G.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of eu)delete _[tt];ge(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}G&&G.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(G){G&&typeof G=="object"&&G.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,st()}}}let Gt=null;n&&n.subscribe&&(Gt=n.subscribe(()=>p()));let Ft=null;i&&typeof i.subscribe=="function"&&(Ft=i.subscribe(()=>{u&&st()}));let $t=null,fe=null;function T(){fe&&(fe(),fe=null)}l&&typeof l.subscribe=="function"&&($t=l.subscribe(()=>{u&&st()}));function ee(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",ee);let Le=Hr(()=>st());Le.attach();function p(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(G=>G&&G.id===u)||v[0]||d}lt(),Lt(),Ie(),st()}}function f(v){rn(v).then(P=>{P?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function k(v){v.preventDefault(),v.stopPropagation(),u&&f(u)}function R(v,P){v.preventDefault(),v.stopPropagation(),f(P)}function H(v,P,G){v.preventDefault(),v.stopPropagation(),ue.open(P,{missing_state:G})}async function re(v,P){let G=Object.hasOwn(_,v),ve=_[v];if(_[v]=P,st(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",Zc(u,v,P.length===0?null:P))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete _[v],st()}catch(tt){throw G?_[v]=ve:delete _[v],st(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function _e(v){v.catch(()=>{})}async function we(v,P){let G=d||{},ve=G.metadata&&typeof G.metadata=="object"?G.metadata:{},tt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])tt[Ve]=Object.hasOwn(_,Ve)?_[Ve]:typeof ve[Ve]=="string"?ve[Ve]:"";tt[v]=P;let nt=ru(tt,Ut(),Jt()),gt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])gt[Ve]=_[Ve],_[Ve]=nt[Ve]||"";if(st(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:Jt()})).then(Ve=>{let ut=Array.isArray(Ve)?Ve[0]:Ve;if(!ut||typeof ut!="object"||!ut.id)throw new Error("implementation target readback failed");d=ut;for(let kn of["impl_runtime","impl_model","impl_effort"])delete _[kn];st()}).catch(Ve=>{for(let ut of["impl_runtime","impl_model","impl_effort"])gt[ut]===void 0?delete _[ut]:_[ut]=gt[ut];throw st(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function Ue(v,P,G){if(!o||!u)return!1;try{let ve=await Promise.resolve(o(v,P)),tt=Array.isArray(ve)?ve[0]:ve;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(ge(G,"error"),!1)}catch(ve){return ve&&typeof ve=="object"&&ve.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(G,"error"),!1)}}function ft(v){setTimeout(()=>{try{let P=e.querySelector(v);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function _t(){L=!0,B=d&&d.title||"",st(),ft('.detail-edit__input[data-edit="title"]')}function en(v){B=v.target.value}function $(){L=!1,B="",st()}function E(){Ue("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(L=!1,B=""),st()})}function Se(){M=!0,Q=d&&d.description||"",st(),ft('.detail-edit__textarea[data-edit="description"]')}function g(v){Q=v.target.value}function b(){M=!1,Q="",st()}function A(){Ue("edit-text",{id:u,field:"description",value:Q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(M=!1,Q=""),st()})}function te(v,P,G,ve){if(v.key==="Escape"){v.stopPropagation(),G();return}v.key==="Enter"&&(!ve||v.ctrlKey||v.metaKey)&&(v.preventDefault(),P())}function me(v){let P=v.target.value;Ue("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function Te(v){let P=Number(v.target.value);Ue("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function Ke(v){ne=v.target.value}function yt(){let v=ne.trim();v.length!==0&&Ue("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(ne=""),st()})}function jt(v){if(v.key==="Escape"){v.stopPropagation(),ne="",st();return}v.key==="Enter"&&(v.preventDefault(),yt())}function Xt(v){Ue("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>st())}let gn={onCopyPath:R,onOpenDoc:H};function Dn(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function hn(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function Pn(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function wn(v,P){let G=Kt(P),ve=[];return v.length>0&&ve.push(v),G&&ve.push(G),ve.length>0?ve.join(`
`):void 0}function Kt(v){if(!v||typeof v!="object")return;let P=typeof v.status=="string"?v.status:"",G=typeof v.title=="string"?v.title:"";return P.length>0&&G.length>0?`${P} \xB7 ${G}`:void 0}function er(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Nn(){return t.depCandidates?t.depCandidates():null}async function qn(v,P,G){let ve=er(),tt=u;if(!tt)return;if(ve.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await Ue(v,{a:tt,b:P,view_id:tt,root_dir:ve},G),gt=nt===!0||nt!==!1&&nt.saved===!0;gt&&t.onDepChanged&&t.onDepChanged({type:v,a:tt,b:P}),v==="dep-add"&&gt&&(D="",Y=!1),st()}function Fn(v){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||qn("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function jn(v){v.disabled||qn("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Xe(v){D=v.target.value,Y=!0,st()}function Pt(){Y||(Y=!0,st())}function bn(v,P){if(v.key==="Escape"){v.stopPropagation(),D="",Y=!1,st();return}v.key==="Enter"&&(v.preventDefault(),P.length===1&&!P[0].disabled&&jn(P[0]))}function ns(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${D}
        @focus=${Pt}
        @input=${Xe}
        @keydown=${P=>bn(P,v)}
      />
      ${Y||D.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(P=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${P.bead_id}
                      ?disabled=${P.disabled}
                      title=${tn(P.reason)}
                      @click=${()=>jn(P)}
                    >
                      <span class="detail-dep-add__repo"
                        >${P.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${P.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${P.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function so(v,P){let G=P.get(v.id),ve=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${tn(v.title)}
          @click=${()=>G===void 0?s(v.id):s(v.id,G)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${tn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${s?" detail-dep--link":""}`}
      >${ve}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Fn(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function rs(v){let P=Array.isArray(v.dependencies)?v.dependencies:[],G=Array.isArray(v.dependents)?v.dependents:[],ve=[];for(let Ve of P){let ut=Dn(Ve);ut.length>0&&hn(Ve)==="blocks"&&ve.push({id:ut,label:`\u26D3 ${ut}`,kind:"pred",title:wn("\uB9C9\uB294",Ve)})}for(let Ve of G){let ut=Dn(Ve);ut.length>0&&hn(Ve)==="blocks"&&ve.push({id:ut,label:`\u2192 ${ut}`,kind:"succ",title:wn("\uB9C9\uD788\uB294",Ve)})}for(let Ve of P){let ut=Dn(Ve),kn=hn(Ve);if(ut.length>0&&kn!=="blocks"){let Al=Pn(kn);ve.push({id:ut,label:`${Al.glyph}${ut}`,kind:"other",title:wn(Al.relation,Ve)})}}let tt=Nn(),nt=new Map;if(tt)for(let Ve of tt.issues)nt.has(Ve.bead_id)||nt.set(Ve.bead_id,Ve.root_dir);let gt=tt&&u?Zu(Qu(u,tt),D):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ve.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ve.map(Ve=>so(Ve,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ns(gt)}
    `}function os(v){let P=v.metadata||{},G=v.workflow||{},ve=G.stages||{},tt=ve.spec&&ve.spec.stale,nt=ve.impl&&ve.impl.stale,gt=G.quick_fix_review?.state==="stale",Ve=ve.plan||null,ut=G.route_source==="derived",kn=G.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ut?" detail-kv__v--derived":""}"
          title=${ut?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ut?"unset":kn}</span
        >
      </div>
      ${G.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${G.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${G.resolver.attempt} \xB7 ${G.resolver.prior_sha} \u2192 ${G.resolver.sha}`}
              >${`${G.resolver.prior_sha.slice(0,7)} \u2192 ${G.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${G.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${G.planned_execution.kind}</span>
            </div>
            ${G.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${G.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${G.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Wn(G.exec_receipt)}</span
            >
          </div>`:""}
      ${G.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${G.impl_entry.actor}@${G.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let io={route:["quick_fix","spec_backed","full_plan"]};async function ss(v,P){let G=P.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&G!=="full_plan"&&!window.confirm(`full_plan \u2192 ${G||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){st();return}await Ue("update-workflow-meta",{id:u,key:v,value:G},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),st()}function Me(v){let P=v.metadata||{};return c` ${((ve,tt)=>{let nt=io[ve],gt=typeof P[ve]=="string"?P[ve]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ve}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ve}
          data-edit=${`wfmeta-${ve}`}
          @change=${Ve=>ss(ve,Ve)}
        >
          <option value="" ?selected=${!nt.includes(gt)}>
            ${tt}
          </option>
          ${nt.map(Ve=>c`<option value=${Ve} ?selected=${gt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Et(v,P){return L?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${en}
            @keydown=${G=>te(G,E,$,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${E}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${$}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${Qt(P).map(G=>c`<span class="detail-usage-total" title=${G.tooltip}
              >${G.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${_t}
        >
          ✎
        </button>
      </div>
    `}function zt(v){let P=Ht(v.created_at),G=Ht(v.updated_at);return!P&&!G?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${G?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${G}</span>
          </div>`:""}
    `}function Bf(v,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${me}
        >
          ${Fb.map(G=>c`<option value=${G} ?selected=${G===v}>${G}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Te}
        >
          ${jb.map(G=>c`<option value=${String(G)} ?selected=${G===P}>
                P${G}
              </option>`)}
        </select>
      </div>
    `}function Uf(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${M?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
            >
              ✎
            </button>`}
      </div>
      ${M?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Q}
              @input=${g}
              @keydown=${P=>te(P,A,b,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${A}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${b}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Wf(v){let P=typeof v.notes=="string"?v.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function zf(v){let P=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(G=>c`<span class="detail-label-chip"
              >${G}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${G}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+G}
                @click=${()=>Xt(G)}
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
            @input=${Ke}
            @keydown=${jt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${yt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Hf(){if(!u)return c``;let v=d||{},P=String(v.id||u),G=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ve=He(),tt=v.status||"open",nt=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",gt=v.description||"",Ve={...v,metadata:{...v.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${k}
            >
              ${P}
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
          ${Et(G,ve)}
          ${Wd(Ve,{onChipToggle:ut=>Le.toggle({bead_id:P,chip_key:ut}),isChipOpen:ut=>Le.isOpen({bead_id:P,chip_key:ut})})}
          ${Ud({metadata:Ve.metadata,workspace_values:St(),catalog:Ut(),execution_defaults:Vt(),expanded:C,presets:Wt()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:w},{onToggle:ut=>{C=ut,st()},onEdit:(ut,kn)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){_e(we(ut,kn??""));return}_e(re(ut,kn??""))},onPresetSelect:ut=>{h=ut,w=[],st()},onPresetApply:()=>{Mt()}})}
          ${Vd({md:Ve.metadata,catalog:z,workspace_defaults:se,handlers:{onExecChange:(ut,kn)=>_e(re(ut,kn))}})}
          ${Bf(tt,nt)} ${zt(v)}
          ${Uf(gt)}
          ${qd(q,le,{expanded:Re,draft:oe,sending:$e,error:x})}
          ${Wf(v)} ${zf(v)} ${rs(v)}
          ${os(v)} ${Me(v)}
          ${Dd(v,gn)}
          ${ep({expanded:Qe,loading:Pe,error:V,data:j},{onToggle:qe})}
          ${Jd(Oe(),Yt,{total:ve,expanded:Ze},Ee)}
          ${np({events:kt,shown:Be},{onMore:We})}
        </div>
      </div>
    `}function st(){rt(Hf(),e)}return{load(v){v!==u&&(_={},h="",w=[],C=!1,U(),pe(),y(),dt(),S(),Z()),u=v,d=null,!fe&&t.subscribeCandidates&&(fe=t.subscribeCandidates(()=>{u&&st()})),p(),It(),X!==v&&ce(v)},clear(){u=null,d=null,_={},h="",m=!1,w=[],C=!1,U(),pe(),y(),dt(),S(),Z(),T(),ue.close(),Ge.close(),rt(c``,e)},destroy(){Gt&&(Gt(),Gt=null),Ft&&(Ft(),Ft=null),$t&&($t(),$t=null),T(),document.removeEventListener("keydown",ee),Le.detach(),ie||(ue.destroy(),ke&&ke.parentNode&&ke.parentNode.removeChild(ke)),Ge.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,Z(),h="",m=!1,w=[],pe(),y(),dt(),S(),rt(c``,e)}}}function op(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Bb="(max-width: 640px)";function Ei(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Bb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Ub(){return{lanes:{done:!0},areas:{}}}function Zo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Wb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Zo(r.lanes),areas:Zo(r.areas)}:{lanes:Zo(r),areas:{}}}catch{return null}}function sp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ti(e,t=Ub()){let n={lanes:Zo(t.lanes),areas:Zo(t.areas)},r=Wb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},sp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},sp(e,o),i}}}function fl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ci(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ri(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:_,candidate_drop:h}=e,m=[],w=null,C=!1,F=null,z=null,se=null;function X(){F!==null&&clearTimeout(F),F=setTimeout(()=>{F=null,C=!1},0)}function N(){return s()??null}function L(){let O=new Map,ae=o();for(let le of Array.isArray(ae)?ae:[]){if(!le||typeof le!="object")continue;let ie=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[ke,ue]of Object.entries(ie))Array.isArray(ue)&&O.set(ke,Ci(ue));for(let ke of[...Array.isArray(le.runnable)?le.runnable:[],...Array.isArray(le.session_active)?le.session_active:[]])ke&&typeof ke.bead_id=="string"&&Array.isArray(ke.blocked_by)&&ke.blocked_by.length>0&&O.set(ke.bead_id,Ci(ke.blocked_by))}return O}function M(){let O=new Map,ae=new Map,le=o();for(let ie of Array.isArray(le)?le:[]){if(!ie||typeof ie!="object")continue;let ke=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[ue,Fe]of Object.entries(ke))Array.isArray(Fe)&&O.set(ue,Ci(Fe));for(let ue of Array.isArray(ie.runnable)?ie.runnable:[])ue&&typeof ue.bead_id=="string"&&Array.isArray(ue.blocked_by)&&ae.set(ue.bead_id,Ci(ue.blocked_by))}for(let ie of m)for(let ke of[O,ae]){let ue=ke.get(ie.a);ue!==void 0&&ke.set(ie.a,ie.type==="dep-remove"?ue.filter(Fe=>Fe!==ie.b):ue.includes(ie.b)?ue:[...ue,ie.b])}return{snapshot:O,runnable:ae}}function B(){let O=L();for(let ae of m){let le=(O.get(ae.a)||[]).slice();ae.type==="dep-remove"?O.set(ae.a,le.filter(ie=>ie!==ae.b)):le.includes(ae.b)||O.set(ae.a,[...le,ae.b])}return O}function Q(O=r(),ae=N()){let le=new Map;for(let Pe of Array.isArray(ae?.lanes)?ae.lanes:[]){let V=new Map;for(let j of Array.isArray(Pe?.entries)?Pe.entries:[])j&&typeof j.bead_id=="string"&&V.set(j.bead_id,j.dep_created_by_lane===!0);le.set(typeof Pe?.id=="string"?Pe.id:"",V)}let ie=new Map,ke=new Map,ue=new Set,Fe=new Set;for(let Pe of O.chain_lanes){let V=le.get(Pe.lane_id);ie.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((j,Ne)=>({bead_id:j.id,root_dir:j.root_dir,...Ne===0?{}:{dep_created_by_lane:V?.get(j.id)===!0}}))});for(let j of Pe.rows)ke.set(j.id,Pe.lane_id),j.fixed&&ue.add(j.id),j.unplaced||Fe.add(j.id)}let Ge=new Map;for(let Pe of O.parallel_rows)typeof Pe.queue_index=="number"&&Ge.set(Pe.id,Pe.queue_index);for(let Pe of O.queue_groups)for(let V of Pe.sublanes.serial)for(let j of V.items)typeof j.queue_index=="number"&&Ge.set(j.id,j.queue_index);let Qe=M();return{blocked_by_map:B(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(O.owner_of)),cross_lanes:ie,owner_lane_of:ke,fixed_members:ue,placed_members:Fe,parallel_rows:O.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(O.parallel_raw_length)),queue_index_of:Ge}}function ne(O,ae){let le=r();for(let ke of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])if(!(ke.non_occupying||ke.id!==ae)){if(ke.root_dir===O)return ke.expected_revision;break}let ie=le.queue_groups.find(ke=>ke.root_dir===O);return ie?ie.revision:0}async function D(O,ae,le,ie){if(!t)return null;let ue=await t(O,{...ae,...le?{root_dir:le}:{},expected_revision:ie});if(ue&&ue.conflict){ue.queue&&d?.(le,ue.queue);let Fe=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:ie;ue=await t(O,{...ae,...le?{root_dir:le}:{},expected_revision:Fe})}return ue&&ue.queue&&d?.(le,ue.queue),ue}async function Y(O,ae,le,ie,ke){try{let ue=await D(O,ae,le,ie.get(le)??ne(le,ke.bead_id));return!ue||typeof ue.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ue.queue&&typeof ue.queue.revision=="number"&&ie.set(le,ue.queue.revision),ue.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ue.applied===!1?(a(ue.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ue.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:ie.get(le)??0)}catch(ue){return a(fl(ue),"error"),null}}async function U(O,ae,le=new Map){if(O.type==="worker-queue-disarm"){try{let ie=await D(O.type,O.payload,O.root_dir,le.get(O.root_dir)??ne(O.root_dir,ae));ie&&ie.queue&&typeof ie.queue.revision=="number"&&le.set(O.root_dir,ie.queue.revision)}catch{}return!0}if(O.type==="worker-queue-place"||O.type==="worker-queue-reorder"||O.type==="worker-queue-remove")return await Y(O.type,O.payload,O.root_dir,le,{bead_id:ae})!==null;try{return(O.type==="dep-add"||O.type==="dep-remove")&&t&&await t(O.type,{a:O.a,b:O.b,...O.root_dir?{root_dir:O.root_dir}:{}}),!0}catch(ie){return a(fl(ie),"error"),!1}}function Z(O){(O.type==="dep-add"||O.type==="dep-remove")&&(m=[...m,{type:O.type,a:O.a,b:O.b}])}async function Ae(O,ae){if(!t)return{ok:!1};try{let le=await t(O.type,{...O.payload,expected_revision:ae});return!le||typeof le.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:le.revision}}catch(le){let ie=le,ke=ie&&ie.code==="conflict"?ie.details?.cross_lanes:null;return ke&&typeof ke.revision=="number"&&Array.isArray(ke.lanes)?{ok:!1,conflict:ke}:(a(fl(le),"error"),{ok:!1})}}async function he(O,ae,le){let ie=new Map,ke=[],ue=O.ops.slice(0,O.lane_op_index),Fe=O.ops.slice(O.lane_op_index);for(let Qe of ue){if(!await U(Qe,le,ie))return{done:!0};Z(Qe)}let Ge=ae;for(let Qe of O.lane_ops){if(Ge===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await Ae(Qe,Ge);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};Ge=Pe.revision}for(let Qe of Fe){if(!await U(Qe,le,ie))return{done:!0};Z(Qe),Qe.type==="dep-add"&&ke.push(Qe)}for(let Qe of Vu(ke))Ge=await ce(Qe,Ge);return{done:!0}}async function ce(O,ae){if(ae===null||!t)return ae;let le=O.pairs,ie=ae;for(let ke=0;ke<2;ke+=1){if(le.length===0)return ie;try{let ue=await t("monitor-lane-provenance",{lane_id:O.lane_id,pairs:le.map(Fe=>({bead_id:Fe.bead_id,after:Fe.after,value:!0})),expected_revision:ie});return ue&&typeof ue.revision=="number"?ue.revision:ie}catch(ue){let Fe=ue,Ge=Fe&&Fe.code==="conflict"?Fe.details?.cross_lanes:null;if(!Ge||typeof Ge.revision!="number"||!Array.isArray(Ge.lanes))return ie;let Qe=Ge.lanes.find(Pe=>Pe&&Pe.id===O.lane_id);le=Xu(Array.isArray(Qe?.entries)?Qe.entries:[],le),ie=Ge.revision}}return ie}async function q(O,ae,le=[]){m=le,l("",0);let ie=r(),ke=N();for(let ue=0;;ue+=1){let Fe=O(Q(ie,ke));if("refused"in Fe){a(Fe.refused,"error");break}let Ge=await he(Fe,ie.cross_lanes_revision,ae);if(Ge.done){Fe.correction&&l(Fe.correction.lane_id,Fe.correction.corrected);break}if(ue>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=i(Ge.conflict);ie=Qe.lanes,ke=Qe.raw_lanes}m=[],u()}async function be(O,ae){await q(le=>li(O,ae,le),O.bead_id)}function xe(O,ae){let le=ae&&typeof ae.closest=="function"?ae.closest("[data-row-index]"):null;if(le&&O.contains(le)){let ie=Number(le.getAttribute("data-row-index"));return Number.isFinite(ie)?ie:0}return O.querySelectorAll("[data-row-index]").length}function x(O){let ae=typeof O?.closest=="function"?O.closest(".worker-pane--collapsed[data-lane]"):null;if(!ae)return null;let le=ae.getAttribute("data-lane");return le==="queue"?{zone:ae,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:le==="candidate"&&h===!0?{zone:ae,target:{kind:"candidate"}}:null}function oe(O){let ae=O.target;if(!w)return null;let le=typeof ae?.closest=="function"?ae.closest("[data-drop]"):null;if(!le)return x(ae);let ie=le.getAttribute("data-drop");if(ie==="candidate")return{zone:le,target:{kind:"candidate"}};if(ie==="parallel")return{zone:le,target:{kind:"parallel",marker_index:xe(le,ae)}};if(ie==="chain")return{zone:le,target:{kind:"chain",lane_id:le.getAttribute("data-lane-id")||"",marker_index:xe(le,ae)}};if(ie==="repo-serial"){let ke=le.getAttribute("data-root-dir")||"";if(ke!==w.root_dir)return null;let ue=typeof ae?.closest=="function"?ae.closest("[data-queue-index]"):null,Fe=ue&&le.contains(ue)?ue.getAttribute("data-queue-index"):le.getAttribute("data-lane-length"),Ge=Number(Fe);return{zone:le,target:{kind:"repo-serial",root_dir:ke,lane_id:le.getAttribute("data-lane-id")||"",index:Number.isFinite(Ge)?Ge:0}}}return null}function $e(){for(let O of Array.from(n.querySelectorAll(".is-drop-over")))O.classList.remove("is-drop-over")}function de(O){z=O.target instanceof Element?O.target:null}function Re(O){let ae=O.target,le=typeof ae?.closest=="function"?ae.closest('[draggable="true"][data-bead-id]'):null,ie=le?le.closest("[data-drag-kind]"):null;if(!ie)return;if(le&&z&&le.contains(z)&&typeof z.closest=="function"&&z.closest("input, button, a")){O.preventDefault();return}let ke=ie.getAttribute("data-bead-id")||"",ue=ie.getAttribute("data-drag-kind")||"",Fe=ie.getAttribute("data-root-dir")||"";if(!ke||!ue)return;let Ge=ie.getAttribute("data-queue-index")||"",Qe=Number(Ge),Pe=ie.getAttribute("data-lane-id")||"";w={kind:ue,bead_id:ke,root_dir:Fe,...Ge!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Pe?{lane_id:Pe}:{}},C=!0,_?.(),n.classList.add("is-dragging");try{O.dataTransfer?.setData("text/plain",ke),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}function pe(O){let ae=oe(O);ae&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),ae.zone.classList.add("is-drop-over"))}function De(O){let ae=O.target;typeof ae?.closest=="function"&&(ae.closest("[data-drop]")?.classList.remove("is-drop-over"),ae.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function lt(){w=null,$e(),n.classList.remove("is-dragging"),X()}function ot(O){let ae=oe(O),le=w;w=null,$e(),n.classList.remove("is-dragging"),!(!ae||!le)&&(O.preventDefault(),be(le,ae.target))}return{attach(O){se||(se=O,O.addEventListener("pointerdown",de),O.addEventListener("dragstart",Re),O.addEventListener("dragover",pe),O.addEventListener("dragleave",De),O.addEventListener("drop",ot),O.addEventListener("dragend",lt))},detach(){F!==null&&(clearTimeout(F),F=null);let O=se;se=null,O&&(O.removeEventListener("pointerdown",de),O.removeEventListener("dragstart",Re),O.removeEventListener("dragover",pe),O.removeEventListener("dragleave",De),O.removeEventListener("drop",ot),O.removeEventListener("dragend",lt))},isDragging(){return w!==null},consumeClickSuppression(){let O=C;return C=!1,O},applyDrop:be,runPlanned:q,dropModel:Q,sendOp:U,sendQueueCas:Y,rememberDep:Z}}var _l=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var ip={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Li(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Oi(e){for(let t of Li(e)){if(Object.hasOwn(ip,t))return ip[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function lp(e){return Li(e).length===0?null:Oi(e)||"\uC2E4\uD328"}function Er(e){let t=null;for(let n of Li(e))Object.hasOwn(_l,n)&&(t=_l[n]);return t}function cr(e){let t=Oi(e),n=Er(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function cp(e,t){let n=Oi(e)??Oi(t),r=Er(t)??Er(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var zb=new Set(["repo_operation_timeout_unresolved"]);function Hb(e){for(let t of Li(e))if(zb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Gb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function up(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Hb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Gb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${wr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var ap={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function dp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(ap,t.blocked_reason)?ap[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=cr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=cr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Kb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var pp=200;function Yb(e){return typeof e!="string"||e.length===0?"":e.length>pp?`${e.slice(0,pp)}\u2026`:e}function Vb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function _p(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${fp(s.at)?c`<span class="rtile__history-at"
                    >${fp(s.at)}</span
                  >`:""}<span class="rtile__history-summary">${s.summary}</span>
            </li>`)}
      </ol>`:""}${o?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${Qr(n)}
          </p>`:""}`}function fp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Xb(e,t){if(!e||e.open!==!0)return"";let n=Er(e.cause)||cr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${nn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",_=_p(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${_?c`<div>
            <dt>이력</dt>
            <dd>${_}</dd>
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
  </div>`}function Qb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Zb=new Set(["codex-runner"]);function Jb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Zb.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?nn(r.last_event_at,t):"",_=r?nn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${nn(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(m=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${m.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(m=>m.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var ey={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function ty(e){if(!e)return"";let t=ey[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function ny(e,t,n){if(!e)return"";let r=Yb(t?.summary),o=_p(t);return c`${r?c`<p class="rtile__held-summary">${r}</p>`:""}${o}
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
    </div>`}function ml(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(De=>De&&De.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,_=a||u,h=!!e.paused,m=i||_?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):h?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Kb(t-e.started_at):"\u2014",w=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,C=go(e),F=Qt(e.usage),z=Hn(e.usage),se=e.conflict_resolution?h?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,X=e.base_exception||null,N=e.landing,L=e.attempt_id&&e.attempt_id===n,M=r.monitor||null,B=Qb(M),Q=Gs(M?.cross_lane_chip),ne=M?Hs(M.dependency_chips):"",D=Jb(M,t,h,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),Y=o&&e.workflow?.chips?.exec_receipt||null,U=Ks(e.workflow),Z=Ys(e.rec,e.chip_popover?.chip_key==="rec"),Ae=e.chip_popover?Gr(e.chip_popover.content):"",he=Y?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Wn(Y)}`}
        >${`${Y.kind}:${$s(Y)}`}</span
      >`:"",ce=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${bo(s)}</span
      >`:"",q=B||Q||U||ce||he||Z?c`<div class="rtile__meta">
          ${B}${Q}${U}${ce}${he}${Z}${Ae}
        </div>`:"",be=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${lp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",xe=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Vb(e.retry)}</span
        >`:"",x=c`${se?c`<span class="worker-mini__badge">${se}</span>`:""}${X?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${X}</span
      >`:""}${be}${xe}`,oe=o?"":Zr(e),$e=Ds(l?.quickfix_landing),de=$e==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Re=$e==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",pe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${L?" rtile--sel":""}${h?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${_?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Vs(e.priority)}${C?c`<span class="rtile__resumed" title=${C}>↻</span>`:""}${x}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${m}</span>`:""}${ty(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${m}</span>`}
        ${o||_?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${$e}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${de} \uBD88\uAC00`:Re}
                  aria-label=${de}
                >
                  ↻ ${de}
                </button>
                ${pe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${h?c`<button
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
                ${pe}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${_?ny(a,d,pe):i?"":c`${D}${e.rollup?ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ea}):""}
            ${N?c`<div class="rtile__landing">
                  <span
                    class="merge-step${N.failed?" merge-step--failed":""}"
                    style=${`--progress: ${N.percent}%`}
                    >${N.label}${N.index>0?c`<span class="merge-step__n"
                          >${N.index}/${N.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?q:B||Q||U||w||Z||F.length>0||z?c`<div class="rtile__meta">
                    ${B}${Q}${U}${zs(e.exec_chips)}${Z}
                    ${F.length>0?F.map(De=>c`<span
                              class="worker-usage"
                              title=${De.tooltip}
                              >${De.label}</span
                            >`):z?c`<span
                            class="worker-usage"
                            title=${yo(e.usage)}
                            >${z}</span
                          >`:""}${Ae}
                  </div>`:""}
            ${js(e)} ${oe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||h?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Xb(l,t)}
  </div>`}function ry(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function mp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ml(o,t,n,{monitor:ry(o)}))}
  </div>`}var Zt="",oy=["impl_runtime","impl_model","impl_effort"],sy=["claude_account","codex_account"],iy=5,Ii=1;function pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(I=>ge(I,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),m={claude:null,codex:null},w=!1,C=null,F={},z="",se="",X=!1,N=!1,L=!1,M=null,B=!1;function Q(){let I=t.queue?t.queue():null;return pn(I)?I:null}function ne(){let I=Q();return I?I.runner_catalog:null}function D(){let I=Q();return I&&pn(I.execution_defaults)?I.execution_defaults:null}function Y(){let I=t.implPresetStore?.get();return pn(I)&&Array.isArray(I.presets)?I:null}function U(){return r===null?{}:{root_dir:r}}async function Z(I,J){return B||!n?null:await n(I,J)}function Ae(I){I&&pn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function he(I,J){let ye=Q();if(!ye||B)return null;let S=await Z(I,{...J,...U(),expected_revision:ye.revision});if(Ae(S),r!==null&&S&&S.conflict){let K=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:Q()?.revision??ye.revision;S=await Z(I,{...J,...U(),expected_revision:K}),Ae(S)}return S}async function ce(){a=!0,Be();try{let I=await Z("get-session-defaults",{...U()});s=pn(I?.values)?{...I.values}:{},i={...s},l=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{a=!1,Be()}}async function q(){let I=Vc(s,i);if(Object.keys(I).length!==0){try{let J=await Z("set-session-defaults",{values:I,...U()});s=pn(J?.values)?{...J.values}:{},i={...s},l=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Be()}}function be(I,J){if(!pn(I))return;let ye=I.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:pn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},_={...u.values},J&&(d={..._})}async function xe(){try{be(await Z("get-workspace-accounts",{...U()}),!0)}catch(I){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}Be()}async function x(I){try{let J=await fetch(I);if(!J.ok)return null;let ye=await J.json();if(!pn(ye)||!Array.isArray(ye.accounts))return null;let S=ye.accounts.filter(K=>pn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:S,active:S.find(K=>K.active===!0)||null}}catch{return null}}async function oe(){w=!0;let[I,J]=await Promise.all([x("/api/claude-usage"),x("/api/codex-usage")]);B||(m={claude:I,codex:J},Be())}function $e(){let I={};for(let J of sy){let ye=Object.hasOwn(d,J)?d[J]:null,S=Object.hasOwn(_,J)?_[J]:null;ye!==S&&(I[J]=ye)}return I}async function de(){let I=$e();if(Object.keys(I).length!==0){try{be(await Z("set-workspace-accounts",{values:I,...U()}),!1)}catch(J){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Be()}}function Re(I,J){J===Zt?delete d[I]:d[I]=J,Be(),h=h.then(()=>de())}function pe(I,J){if(oy.includes(I)){ot(I,J);return}J===Zt?delete i[I]:i[I]=J,Be(),q()}function De(){let I=kt().orchestration_model,J=fn({global:{orchestration_model:I??void 0},execution_defaults:D(),runner_catalog:ne()}).orchestration_model.value;return J?xn(ne(),J):null}function lt(I,J){typeof J=="string"&&J.length>0?i[I]=J:delete i[I]}function ot(I,J){let ye=J===Zt?void 0:J,S=Kc({impl_runtime:I==="impl_runtime"?ye:i.impl_runtime,impl_model:I==="impl_model"?ye:i.impl_model,impl_effort:I==="impl_effort"?ye:i.impl_effort},ne(),De());lt("impl_runtime",S.impl_runtime),lt("impl_model",S.impl_model),lt("impl_effort",S.impl_effort),Be(),q()}async function O(){let I=Q();if(!I)return;let J={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},ye=Xc(J,{...J,...F});if(Object.keys(ye).length!==0){try{let S=await he("worker-queue-set-orchestration-defaults",{values:ye});if(S&&S.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}F={}}catch(S){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Be()}}function ae(I,J){F[I]=J===Zt?null:J,Be(),O()}function le(I){if(C=I,!I){Be();return}let J=ne(),ye=kt(),S=ye.orchestration_model;S&&!$o(J,I).includes(S)&&(F.orchestration_model=null,S=null);let K=ye.orchestration_effort;K&&!ua(J,I,S||mn).includes(K)&&(F.orchestration_effort=null),Be(),O()}async function ie(I){if(!(!Q()||I<Ii)){try{await he("worker-queue-set-slots",{slots:I})}catch(J){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Be()}}async function ke(I){if(!(!Q()||I<Ii||I>iy)){try{await he("worker-queue-set-serial-lane-count",{count:I})}catch(J){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Be()}}async function ue(I,J){let ye=I==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await he(ye,{on:J})}catch(S){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Be()}function Fe(){let I={},J=kt();for(let ye of Kr){let S=Yn.includes(ye)?J[ye]:i[ye];typeof S=="string"&&S.length>0&&(I[ye]=S)}return I}async function Ge(){let I=Y();if(!I)return;let J=Fe();if(Object.keys(J).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(I.presets||[]).find(K=>K.id===z),S=se.trim()||(ye?ye.name:"");if(!S){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=ye?await Z("impl-preset-update",{expected_revision:I.revision,id:ye.id,name:S,settings:J}):await Z("impl-preset-create",{expected_revision:I.revision,name:S,settings:J});if(K&&K.applied){if(se="",!ye&&Array.isArray(K.presets)){let Ie=K.presets.find(We=>We.name===S);z=Ie?Ie.id:z}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Qe(){let I=Y();if(!(!I||z.length===0))try{let J=await Z("impl-preset-delete",{expected_revision:I.revision,id:z});J&&J.applied?(z="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(J){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function Pe(I){s=pn(I.values)?{...I.values}:{},i={...s},l=Array.isArray(I.warnings)?I.warnings:[],pn(I.queue)&&(t.onQueueAdopt?.(I.queue),F={})}async function V(){let I=Y(),J=Q();if(!I||!J||z.length===0)return;let ye=S=>({preset_id:z,expected_revision:I.revision,expected_queue_revision:S,...U()});try{let S=await Z("apply-impl-preset-global",ye(J.revision));if(S&&S.applied&&Pe(S),r!==null&&S&&S.queue_applied===!1){let K=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:Q()?.revision??J.revision;S=await Z("apply-impl-preset-global",ye(K)),S&&S.applied&&Pe(S)}S&&S.applied?S.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Be()}async function j(){N=!0,L=!1,Be();try{let I=await Z("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?L=!0:M=I}catch{L=!0}finally{N=!1,Be()}}function Ne(){if(X=!X,X&&!M){j();return}Be()}function ct(){let I=no({loading:N,error:L});if(I)return I;if(!M)return"";let J=Array.isArray(M.variants)?M.variants:[];return c`<div class="settings-dialog__sp-body">
      ${M.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${Jn(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function Je(){return c`<section
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
        @click=${Ne}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?ct():""}
    </section>`}function y(I,J,ye,S,K,Ie,We){let qe=K[I]??Zt,et=da(I,ye,K,D(),ne(),We),Oe=et.options.find(Ze=>Ze.value===qe),He=qe===Zt?et.full_value:Oe?.full_value;return c`<select
        class=${qe===Zt?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${J}
        title=${He||""}
        ?disabled=${Ie===!0||et.disabled}
        .value=${Ar(String(qe))}
        @change=${Ze=>S(I,String(Ze.target.value))}
      >
        <option value=${Zt} ?selected=${qe===Zt}>
          ${et.unset_label}
        </option>
        ${et.options.map(Ze=>c`<option
              value=${Ze.value}
              title=${Ze.full_value||""}
              ?selected=${Ze.value===qe}
            >
              ${Ze.label}
            </option>`)}
      </select>
      ${qe===Zt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function W(I,J,ye,S,K,Ie=!1,We){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${y(I,J,ye,S,K,Ie,We)}
      </span>
    </div>`}function Ee(I,J){let ye=J?J.active:null;return pn(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?ye.email:oo({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ce(I,J,ye){let S=m[ye],K=Object.hasOwn(d,I)?d[I]:Zt,Ie=ye==="claude"?xi:oo,We=!!S?.accounts.some(qe=>qe.key===K);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${I}
          @change=${qe=>Re(I,String(qe.target.value))}
        >
          <option value=${Zt} ?selected=${K.length===0}>
            ${Ee(ye,S)}
          </option>
          ${K.length>0&&!We?c`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(qe=>c`<option value=${qe.key} ?selected=${qe.key===K}>
                ${Ie(qe)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function je(){let I=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function Ye(I,J,ye,S,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${y(ye,`${I} \uBAA8\uB378`,S,pe,i,!1)}
        ${y(K,`${I} effort`,Ls,pe,i,!1)}
      </span>
    </div>`}function dt(I,J,ye,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${S?"true":"false"}
          aria-label=${J}
          @click=${()=>ue(I,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function wt(I,J,ye,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>S(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>S(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(J=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${J.kind}
          >
            <span class="settings-dialog__preset-diff-label">${J.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${J.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${J.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function kt(){let I=Q(),J={};for(let ye of Yn)J[ye]=Object.prototype.hasOwnProperty.call(F,ye)?F[ye]:I&&typeof I[ye]=="string"?I[ye]:null;return J}function mt(){let I=ne(),J=i.impl_runtime,ye=i.impl_model,S=Y(),K=Q(),Ie=kt(),We=$o(I,C),qe=Yr(I,void 0).filter(it=>it!==mn),et=ua(I,C,Ie.orchestration_model||mn).filter(it=>it!==mn),Oe=z?(S?.presets||[]).find(it=>it.id===z):null,He=Oe?Yc(Fe(),pn(Oe.settings)?Oe.settings:{}):null,Ze=K&&typeof K.slots=="number"?K.slots:Ii+1,bt=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Ii,ze=D()?.supported===!0,xt=je(),qt=da("workflow_mode",wo,i,D(),I);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${xt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${xt}
          </div>`:""}
      ${ze?"":c`<div
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
                .value=${Ar(z)}
                @change=${it=>{z=String(it.target.value),Be()}}
              >
                <option value="" ?selected=${z===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(it=>c`<option
                      value=${it.id}
                      ?selected=${it.id===z}
                    >
                      ${it.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!He||He.rows.length===0}
                @click=${V}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ar(se)}
                @input=${it=>{se=String(it.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ge}
              >
                ${z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${z.length===0}
                @click=${Qe}
              >
                삭제
              </button>
            </div>
            ${He?Lt(He):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ar(C||Zt)}
                    @change=${it=>{let Yt=String(it.target.value);le(Yt===Zt?null:Yt)}}
                  >
                    <option value=${Zt} ?selected=${!C}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${C==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${C==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${W("orchestration_model","\uBAA8\uB378",We,ae,Ie)}
              ${W("orchestration_effort","effort",et,ae,Ie)}
              ${W("orchestration_speed","\uC18D\uB3C4",vo,ae,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ce("claude_account","Claude","claude")}
              ${Ce("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Zt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>pe("workflow_mode",Zt)}
                    >
                      ${qt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${wo.map(it=>c`<button
                          type="button"
                          data-mode=${it}
                          aria-pressed=${String(i.workflow_mode===it)}
                          @click=${()=>pe("workflow_mode",it)}
                        >
                          ${it}
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
              ${Ye("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ko,"spec_review_effort")}
              ${Ye("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Os,"plan_review_effort")}
              ${Ye("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ko,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${W("impl_runtime","\uC704\uC784 \uB300\uC0C1",Rs,pe,i)}
              ${W("impl_model","\uBAA8\uB378",Yr(I,J),pe,i)}
              ${W("impl_effort","effort",Vr(I,J,ye),pe,i)}
              ${W("impl_speed","\uC18D\uB3C4",vo,pe,i)}
              ${W("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",qe,pe,i,!1,{...i,...Ie})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${dt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${dt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${wt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ze,it=>ie(it))}
              ${wt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",bt,it=>ke(it))}
            </div>
            ${Je()}
          `}
    `}function Be(){B||rt(mt(),e)}return{load(){F={};let I=[ce(),xe()];return w||I.push(oe()),Promise.all(I).then(()=>{})},render:Be,sessionDraft:()=>({...i}),destroy(){B=!0,rt(c``,e)}}}function Di(e){return c`<svg
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
  </svg>`}function gp(){return Di(fo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function hp(){return Di(fo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function bp(){return Di(fo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function yp(){return Di(fo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function vp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function wp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Qt(Ts(t));let n={};for(let l of In)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of In){let _=a[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Hn(n):null}function Rn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gl(e,t){let n=Rn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function ay(e,t){if(!Rn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function ly(e){if(!Rn(e)||!Rn(e.execution_defaults)||!Rn(e.runner_catalog)||!Rn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=fn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=xn(e.runner_catalog,n.orchestration_model.value??""),o=Xr(n,e.runner_catalog),s=vr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function kp(e,t){let n=t.notify||(x=>ge(x,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,_=null,h=new Map;function m(){let x=t.workspacesState?t.workspacesState():[];return Array.isArray(x)?x.filter(oe=>Rn(oe)):[]}function w(x){return m().find(oe=>oe.root_dir===x)||null}function C(x){return ay(w(x),h.get(x))}function F(){for(let x of m()){let oe=h.get(x.root_dir);oe&&typeof oe.revision=="number"&&typeof x.revision=="number"&&x.revision>=oe.revision&&h.delete(x.root_dir)}}async function z(x,oe,$e){let de=t.transport,Re=C(oe);if(!(!de||!Rn(Re))){try{let pe=await de(x,{...$e,root_dir:oe,expected_revision:Re.revision});if(Rn(pe?.queue)&&h.set(oe,pe.queue),pe&&pe.conflict){let De=Rn(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:C(oe)?.revision;pe=await de(x,{...$e,root_dir:oe,expected_revision:De}),Rn(pe?.queue)&&h.set(oe,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}q()}}function se(x){u!==x&&(u=x,t.onFocusChange?.(u),q())}function X(x){se(u===x?null:x)}function N(x){if(d===x){M();return}L(),d=x;let oe=w(x);i.textContent=`${oe?.name||x} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,_=Mi(a,{root_dir:x,queue:()=>C(x),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{h.set(x,$e),q()}}),_.load(),q()}function L(){_?.destroy(),_=null}function M(x){L(),d=null,o.hidden=!0,i.textContent="",x!==!0&&q()}let B=()=>M();l.addEventListener("click",B);function Q(x){x.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",Q);function ne(x,oe){let $e=Math.max(oe,x,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${x}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(de,Re)=>Re<x?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(x){let oe=x.auto_advance===!0,$e=x.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${x.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?hp():gp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${$e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${$e?"true":"false"}
        aria-label=${`${x.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${$e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${bp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===x.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===x.root_dir?"true":"false"}
        aria-label=${`${x.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${yp()}
      </button>`}function Y(x){let oe=ly(x);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function U(x){let oe=[];for(let[$e,de]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Re=gl(x,$e);Re>0&&oe.push(`${de} ${Re}`)}return oe.join(" \xB7 ")}function Z(x){let oe=gl(x,"running"),$e=typeof x.slots=="number"?x.slots:1;return c`<div
      class=${`mon2-deck__tile${u===x.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${x.root_dir}
      aria-pressed=${u===x.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${x.root_dir}>${x.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${$e}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${$e}</span>
          ${ne(oe,$e)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${x.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(x)}</div>
        <span class="mon2-deck__counts">${U(x)}</span>
        ${Y(x)}
      </div>
    </div>`}function Ae(x){let oe=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",de=wp(Array.isArray(oe)?oe:[]),Re=pe=>x.reduce((De,lt)=>De+gl(lt,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${x.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${Re("running")} · 대기 ${Re("queue")} · PR
        ${Re("pr_wait")}${Re("session_active")>0?` \xB7 \uC138\uC158 ${Re("session_active")}`:""}
        · ${$e} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${de===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof de=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${vp($e)}
                  >${de}</span
                >`:de.map(pe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${pe.provider}
                      title=${pe.tooltip}
                      >${pe.label}</span
                    >`)}
          </span>`}
    </div>`}function he(){let x=m();return x.length===0?"":c`${Ae(x)}
      <div class="mon2-deck__strip">
        ${x.map(oe=>Z(oe))}
      </div>`}function ce(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function q(){F(),ce(),d!==null&&!w(d)&&M(!0),rt(he(),r),_?.render()}function be(x){let oe=x.target;if(!oe||typeof oe.closest!="function")return;let $e=oe.closest("[data-root-dir]");if(!$e)return;let de=$e.getAttribute("data-root-dir")||"",Re=oe.closest("[data-act]")?.getAttribute("data-act");if(Re==="worker"){t.gotoWorkerTab?.(de);return}if(Re==="auto"){z("worker-automation-toggle",de,{on:C(de)?.auto_advance!==!0});return}if(Re==="merge"){z("worker-merge-auto-toggle",de,{on:C(de)?.auto_merge!==!0});return}if(Re==="gear"){N(de);return}X(de)}function xe(x){if(x.key!=="Enter"&&x.key!==" ")return;let oe=x.target;if(!oe||typeof oe.closest!="function")return;let $e=oe.closest('[data-root-dir][role="button"]');!$e||$e!==oe||(x.preventDefault(),X($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",be),r.addEventListener("keydown",xe),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Q),r.removeEventListener("click",be),r.removeEventListener("keydown",xe),l.removeEventListener("click",B),L(),rt(c``,r),e.replaceChildren()}}}var cy=1e4,Sp="bdui.monitor.done-range",Ep="bdui.monitor.running_sort",Tp="bdui.monitor.candidate_sort",Cp="beads-ui.monitor.candidate-filter",Rp="beads-ui.monitor.sections";function uy(){try{let e=window.localStorage.getItem(Cp);if(!e)return{...Jr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Jr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Jr.show_blocked,spec:Ra.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Jr}}}function $p(e){try{window.localStorage.setItem(Cp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function dy(){try{let e=window.localStorage.getItem(Tp);return Lo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function py(e){try{window.localStorage.setItem(Tp,e)}catch{}}function fy(){try{let e=window.localStorage.getItem(Rp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function _y(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function my(){try{let e=window.localStorage.getItem(Sp);return e===null?"today":On(e)}catch{return"today"}}function gy(e){try{window.localStorage.setItem(Sp,e)}catch{}}function hy(){try{return window.localStorage.getItem(Ep)==="repo"?"repo":"started"}catch{return"started"}}function by(e){try{window.localStorage.setItem(Ep,e)}catch{}}var Op="tab:monitor:pipeline",yy=1e3,xp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],vy=["queue","runnable","done"],Ap="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function wy(e){return e>=1&&e<=Ap.length?Ap[e-1]:`(${e})`}function Lp(e,t){let n=Ct("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=my(),m=hy(),w=uy(),C=dy(),F=fy(),z=Ti("beads-ui.monitor.lane-collapsed"),se=!1,X=null,N=null,L=null,M=null,B=Hr(()=>Oe()),Q=null,ne=null,D=null,Y=null;function U(p){return Y===null&&(Y=O()),ju(p,Y)}function Z(p,f){Ae(),!(f<=0)&&(ne={lane_id:p,corrected:f},D=setTimeout(()=>{D=null,ne=null,Oe()},cy))}function Ae(){D!==null&&(clearTimeout(D),D=null),ne=null}function he(){let p=Or.find(f=>f.value===h);return p?p.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let be=document.createElement("div");be.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host mon2-drawer",q.append(be,xe),e.appendChild(q);let x=ar(null,null),oe=new Map,$e=new Map,de=null,Re=null,pe=null,De=ro(xe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,q.hidden=!0,Oe()}}),lt=Ri({transport:s,console_el:ce,getLanes:()=>x,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:St,reproject:p=>({lanes:et(p),raw_lanes:p}),onCorrection:Z,showToast:ge,requestRender:()=>Oe(),adoptQueue:(p,f)=>{$e.set(p,f)},onDragBegin:()=>{L=null},candidate_drop:!0}),{applyDrop:ot,dropModel:O,runPlanned:ae,sendQueueCas:le}=lt;async function ie(p,f,k,R,H=!0){if(!s||!k)return null;let re=await s(p,{...f,root_dir:k,expected_revision:R});if(re&&re.conflict&&H){re.queue&&$e.set(k,re.queue);let _e=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:R;re=await s(p,{...f,root_dir:k,expected_revision:_e})}return re&&re.queue&&k&&$e.set(k,re.queue),re}function ke(p,f){let k=$e.get(p),R=o&&o.get?o.get():null,H=(Array.isArray(R)?R:[]).find(_e=>_e?.root_dir===p);return(k||H)?.merge_queue?.find(_e=>_e.bead_id===f)?.continuation_action}async function ue(p,f,k,R){let H=await ie(p,f,k,R),re=$e.get(k)?.revision??H?.queue?.revision??R;return zn(H,(_e,we)=>ie(p,{...f,continuation:_e,decision_token:we},k,re,!1),{refresh:_e=>ie(p,f,k,_e?.queue?.revision??$e.get(k)?.revision??re,!1)})}async function Fe(p,f,k,R){let H=await zn({continuation_mismatch:R},(_e,we)=>ie("worker-merge-queue-add",{bead_id:f,continuation:_e,decision_token:we},p,k,!1)),re=H?.queue?.merge_queue?.find(_e=>_e.bead_id===f)?.continuation_action;H?.applied!==!0&&re?.continuation===null&&re.mismatch&&await Fe(p,f,H.queue.revision,re.mismatch)}async function Ge(p,f,k){let R=await ie("worker-discard",p,f,k);if(R&&R.discarded===!0){ge(Ws(R),"success",5e3);return}if(R&&R.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${R.reason}`,"error");return}if(R&&R.accepted&&R.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(R&&R.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${R.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}R&&!R.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(p,f,k){return!s||!k?null:await s(p,{...f,root_dir:k})}async function Pe(){let p=new Map;for(let f of x.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,k]of p)await ie("worker-merge-queue-add-all",{},f,k)}function V(p){let f=F[p];return!!(f&&f.runnable===!0)}function j(p){let f={...F[p]||{}};f.runnable=!f.runnable,F={...F,[p]:f},_y(F),Oe()}function Ne(p){z.toggle(p),Oe()}function ct(p){z.toggleArea(p),Oe()}function Je(p){let f=p.dependency_chips||null,k=p.overlap_chips||[],R=p.scope_state==="missing",H=p.armed_lane_chip;return!f&&k.length===0&&!R&&!H?null:{...f||{},...k.length>0?{overlaps:k}:{},...R?{scope_missing:!0}:{},...H?{armed_lane:H}:{}}}function y(p){return Xs(p,f=>B.isOpen({bead_id:p.id,chip_key:f}))}function W(p){let f=Je(p),k=y(p);return f||k?{...p,...f?{dependency_chips:f}:{},...k?{chip_popover:k}:{}}:p}function Ee(p){let f=V(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${f?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${f?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Ce(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function je(p){if(L!==p.id)return null;let f=x.queue_groups.find(re=>re.root_dir===p.root_dir),k=p.place_lanes||[],R=x.cross_lanes_revision!==null,H=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let re of x.chain_lanes)H.push({id:`lane:${re.lane_id}`,label:`\uC5F0\uACB0 ${re.number} (${re.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:re.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!R});H.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!R,title:R?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let re of k)H.push({id:`serial:${re.id}`,label:`\uC9C1\uB82C ${Number(re.id.slice(1))}`,count:re.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:H}}function Ye(p){return Ce(p,c`${xa(W(p),je(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(f,k)=>l(k,p.root_dir):void 0})}`)}function dt(){return x.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${x.runnable.map(p=>Ye(p))}
      </div>`:c`${x.runnable_sections.map(p=>{let f=V(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Ee({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(k=>Ye(k))}
            </div>`}
      </section>`})}`}function wt(p,f=!1){return c`<span class="worker-mini__rowops">
      ${f?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${p.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Lt(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${An(W(p),{actions:wt(p,!0)})}
    </div>`}function kt(p,f,k,R){return c`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${k}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${wy(f.seq)}</span
      >
      ${f.workspace_name?c`<span class="worker-mini__repo" title=${f.root_dir}
            >${f.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${f.id}</span>
      <span class="mon2-crow__title">${f.title}</span>
      ${f.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${R.includes(f.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${f.location_title}
        >${f.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${f.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function mt(p){let f=x.cross_lanes_revision!==null,k=U(p.lane_id),R=k?.held===!0,H=k?.cycle===!0,re=k?k.mismatched:[],_e=ne&&ne.lane_id===p.lane_id?ne.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${_e>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${_e}건 자동 교정</span
            >`:""}
        ${H?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${R?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ii}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!f||!p.can_confirm||R}
              title=${R?ii:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!f}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((we,Ue)=>kt(p,we,Ue,re))}
      </div>
    </div>`}function Be(p,f,k){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.id}
      data-row-index=${k}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${An(W(f),{actions:wt(f)})}
    </div>`}function I(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function J(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${An({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function ye(p,f){let k=f.occupants,R=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...k.map(H=>J(H)),...f.items.map((H,re)=>Be(f,H,re))],count:f.items.length,empty:f.empty===!0,...k.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${k.map(H=>`${H.id} \u2014 ${H.badge}`).join(`
`)}
              >${I(k)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...R.length>0?{after:c`${R.map(H=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${H.workspace_name}·${H.lane}과 교차 대기
                </div>`)}`}:{}}}function S(){let p=x.cross_lanes_revision!==null,f=x.chain_lanes.some(k=>k.draft&&k.rows.length===0);return Zs({parallel:{rows:x.parallel_rows.map((k,R)=>Lt(k,R)),count:x.parallel_rows.length,collapsed:z.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:x.queue_groups.flatMap(k=>k.sublanes.serial.map(R=>({...ye(k,R),drop:{drop:"repo-serial",root_dir:k.root_dir,lane_id:R.id,lane_length:String(R.raw_length)}}))),collapsed:z.isAreaCollapsed("serial"),extra_panes:x.chain_lanes.map(k=>mt(k)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...x.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function K(p){return c`<div class="worker-rungrid">
      ${x.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:x.running.map(f=>ml({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:y(f),discard:f.discard,failure:f.failure?{...f.failure,open:M===f.attempt_id}:null},p,N,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:Je(f)}}))}
    </div>`}function Ie(p){let f={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done},k=R=>{let H=f[R.lane],re=R.lane==="runnable"?x.runnable_flat?H.length>0?dt():void 0:x.runnable_sections.length>0?dt():void 0:R.lane==="queue"?x.queue_groups.length>0||x.chain_lanes.length>0||x.parallel_rows.length>0||x.cross_lanes_unreadable?S():void 0:R.lane==="running"?K(p):H.length>0?c`${H.map(_e=>An(W(_e)))}`:void 0;return Mn({id:`monitor-${R.lane}`,lane:R.pane,title:R.title,items:H,count:H.length,src:R.lane==="runnable",empty:R.empty,body:re,live:R.lane==="running"&&H.length>0,collapsible:!0,collapsed:z.isCollapsed(R.pane),controls:R.lane==="runnable"?We():void 0,header_control:qe(R.lane,H.length)})};if(se){let R=vy.map(H=>xp.find(re=>re.lane===H)).filter(H=>H!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Js({live:x.running.length>0,running_body:x.running.length>0?K(p):"",pr_wait_rows:x.pr_wait.map(H=>An(W(H))),count:x.running.length+x.pr_wait.length})}
            ${R.map(H=>k(H))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${xp.map(R=>k(R))}
        </div>
      </div>`}function We(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${x.runnable_hidden.blocked>0?` ${x.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ra.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${w.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${x.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${x.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function qe(p,f){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${Lo.map(k=>c`<option
              value=${k.value}
              ?selected=${C===k.value}
            >
              ${k.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${m}
      >
        <option value="started" ?selected=${m==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${m==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&f>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Or.map(k=>c`<option value=${k.value} ?selected=${h===k.value}>
              ${k.label}
            </option>`)}
      </select>`:""}function et(p){let f=o&&o.get?o.get():null,k=o&&o.getWorkspacesState?o.getWorkspacesState():[],R=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,H={done_since:hr(h,d()),running_sort:m,candidate_filter:w,candidate_sort:C};return R!==void 0&&(H.cross_lanes=R),ar(f,k,H)}function Oe(){let p=d();x=et(),Y=null,oe=new Map;for(let f of[...x.runnable,...x.queue,...x.running,...x.pr_wait,...x.done])!f.non_occupying&&!oe.has(f.id)&&oe.set(f.id,f);rt(Ie(p),ce),Ze()?.render(),He(),bt()}function He(){let p=new Map;for(let f of x.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let k=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",R=p.get(k);typeof R=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${R?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(pe)return pe;let p=ce.querySelector(".mon2-deck");return p?(pe=kp(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>x.done,rangeLabel:he,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:xt,onFocusChange:f=>{Q=f,bt()}}),pe):null}function bt(){ce.classList.toggle("has-focus",Q!==null);for(let p of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",Q!==null&&p.getAttribute("data-root-dir")===Q);for(let p of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=oe.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",Q!==null&&!!f&&f.root_dir===Q)}for(let p of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",Q!==null&&p.getAttribute("data-root-dir")===Q)}function ze(p,f){let k=i?i():void 0;if(!f||!k||f===k||!a){r(p);return}a(f).then(()=>{r(p)}).catch(R=>{n("workspace switch for %s failed: %o",f,R)})}function xt(p){if(!p)return;let f=i?i():void 0,k=()=>{try{u?.gotoView("worker")}catch(R){n("gotoView(worker) failed: %o",R)}};if(!a||f&&f===p){k();return}a(p).then(k).catch(R=>{n("workspace switch for %s failed: %o",p,R),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(p){rn(p).then(f=>{ge(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function it(p){let f=oe.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function Yt(p,f,k){if(p!=="dep-add")return;let R=x.chain_lanes.find(H=>H.rows.some(re=>re.id===f));!R||!R.rows.some(H=>H.id===k)||await ae(H=>Gu(R.lane_id,H),"",[{type:p,a:f,b:k}])}function St(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function It(p,f){if(p==="run"){await Vt(f);return}if(p==="stop"){await Jt(f);return}if(p==="create"){await ae(k=>Da(null,k),"");return}if(p==="remove"){let k=Yu(f,O());if(k!==null&&!_(k))return;await ae(R=>Ku(f,R),"");return}await ae(k=>p==="confirm"?zu(f,k):Hu(f,k),"")}function Ut(p){let f=new Map;for(let k of p.rows){let R=x.owner_of[k.id]||k.root_dir;typeof R!="string"||R.length===0||f.set(R,[...f.get(R)||[],k.id])}return f}async function Vt(p){let f=x.chain_lanes.find(re=>re.lane_id===p);if(!f||x.cross_lanes_revision===null){Oe();return}Ae();let k=new Map,R=new Map,H=Ut(f);for(let re of f.rows){if(!re.unplaced)continue;let _e=x.owner_of[re.id]||re.root_dir;if(typeof _e!="string"||_e.length===0){ge(`${re.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Oe();return}let we=R.get(_e)??0;if(await le("worker-queue-place",{bead_id:re.id,lane:"parallel",index:(x.parallel_raw_length[_e]??0)+we},_e,k,{bead_id:re.id})===null){Oe();return}R.set(_e,we+1)}for(let[re,_e]of H)if(await le("worker-queue-arm",{bead_ids:_e,lane_id:p},re,k,{bead_id:_e[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Oe();return}Oe()}async function Jt(p){let f=x.chain_lanes.find(R=>R.lane_id===p);if(!f||x.cross_lanes_revision===null){Oe();return}Ae();let k=new Map;for(let[R,H]of Ut(f))if(await le("worker-queue-disarm",{lane_id:p},R,k,{bead_id:H[0]})===null)break;Oe()}async function Wt(p,f){let{root_dir:k,revision:R}=it(p);if(k.length===0){Oe();return}await le("worker-queue-disarm",{bead_ids:[p],lane_id:f},k,new Map([[k,R]]),{bead_id:p}),Oe()}async function Dt(p,f){let k=oe.get(p);if(!k){Oe();return}let R={kind:"candidate",bead_id:p,root_dir:k.root_dir};if(f==="new-lane"){await ae(H=>Da({bead_id:p,root_dir:k.root_dir},H),p);return}if(f.startsWith("lane:")){let H=f.slice(5);if(!x.chain_lanes.find(_e=>_e.lane_id===H)){Oe();return}await ae(_e=>li(R,{kind:"chain",lane_id:H,marker_index:(_e.cross_lanes.get(H)?.entries??[]).length},_e),p);return}if(f.startsWith("serial:")){let H=f.slice(7),re=(k.place_lanes||[]).find(_e=>_e.id===H);await ot(R,{kind:"repo-serial",root_dir:k.root_dir,lane_id:H,index:re?re.index:0});return}await ot(R,{kind:"parallel",marker_index:x.parallel_rows.length})}async function un(p,f){let k=x.parallel_rows,R=k.findIndex(ft=>ft.id===p);if(R<0)return;let H=k[R].root_dir,re=[];k.forEach((ft,_t)=>{ft.root_dir===H&&re.push(_t)});let _e=re.indexOf(R),we=re[_e+f];if(typeof we!="number")return;let Ue=f===-1?we:re[_e+2]??Math.min(k.length,we+1);await ot({kind:"parallel",bead_id:p,root_dir:H,queue_index:k[R].queue_index??0},{kind:"parallel",marker_index:Ue})}async function Mt(p){for(let f of x.chain_lanes){let k=f.rows.find(R=>R.id===p);if(k){await ot({kind:"chain",bead_id:p,root_dir:k.root_dir,lane_id:f.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:x.parallel_rows.length});return}}}function Gt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Ft(p,f){let{item:k,root_dir:R,revision:H}=it(f),re=k?.attempt_id||"",_e=p.classList;if(_e.contains("worker-mini__rowops-up")||_e.contains("worker-mini__rowops-down")){un(f,_e.contains("worker-mini__rowops-up")?-1:1);return}if(_e.contains("worker-mini__rowops-remove")){ie("worker-queue-remove",{bead_id:f},R,H);return}if(_e.contains("mon2-crow__detach")){Mt(f);return}if(_e.contains("worker-dep__open")){ze(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(_e.contains("mon2-arm__release")){Wt(f,p.getAttribute("data-lane-id")||"");return}if(_e.contains("mon-lane__chip")){let we=p.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${we}"]`)?.scrollIntoView({block:"nearest"});return}if(_e.contains("judgement-chip")){let we=p.getAttribute("data-chip-key")||"";we&&B.toggle({bead_id:f,chip_key:we});return}if(_e.contains("rtile__failure-badge")){M=M===re?null:re,Oe();return}if(_e.contains("rtile__attempt-copy")){let we=p.getAttribute("data-attempt-id")||"";we&&rn(we).then(Ue=>{ge(Ue?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ue?"success":"error",1400)});return}if(_e.contains("worker-card__place")){L=L===f?null:f,Oe();return}if(_e.contains("worker-card__place-cancel")){L=null,Oe();return}if(_e.contains("worker-card__place-lane")){let we=p.getAttribute("data-lane")||"parallel";L=null,Dt(f,we);return}if(_e.contains("rtile__session")){if(k&&k.kind==="session"){let we=(k.session_refs||[]).find(Ue=>Ue&&Ue.current===!0);we&&(q.hidden=!1,De.open(Ur(we,f,"in_progress",R)),Oe());return}N=re,re&&k&&(q.hidden=!1,De.open({attempt_id:re,root_dir:R,meta:Gt(k)})),Oe();return}if(_e.contains("rtile__pause")){Qe("worker-attempt-pause",{attempt_id:re},R);return}if(_e.contains("rtile__resume")){Br().then(we=>{if(we!==null)return ue("worker-attempt-resume",{attempt_id:re,...we!==""?{instructions:we}:{}},R,H)});return}if(_e.contains("rtile__parked-retry")){Qe("worker-parked-retry",{bead_id:f,attempt_id:re},R).then(we=>{we&&we.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${we.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":we.reason||""}`,"error")});return}if(_e.contains("rtile__discard")){let we=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!_(To(f,we)))return;Ge({bead_id:f,...re?{attempt_id:re}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},R,H);return}if(_e.contains("worker-mini__merge")){let we=ke(R,f);we?.mismatch&&we.continuation===null?Fe(R,f,H,we.mismatch):ie("worker-merge-queue-add",{bead_id:f},R,H);return}if(_e.contains("worker-mini__merge-cancel")){ie("worker-merge-queue-remove",{bead_id:f},R,H);return}if(_e.contains("worker-mini__discard")){let we=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(To(f,we)))return;Ge({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},R,H);return}if(_e.contains("worker-mini__revise-fix")){ue("worker-revise-fix",{bead_id:f},R,H);return}_e.contains("worker-mini__revise-approve")&&ie("worker-revise-approve",{bead_id:f},R,H)}function $t(p){let f=lt.consumeClickSuppression(),k=p.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".worker-drawer-overlay")||k.closest("a"))return;let R=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(R){p.preventDefault();let Se=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||R.textContent?.trim()||"";Se&&qt(Se);return}let H=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(H){p.preventDefault();let E=H.getAttribute("data-root-dir")||oe.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||H.getAttribute("title")||"";xt(E);return}let re=k.closest(".mon2-sec__toggle");if(re){p.preventDefault(),j(re.getAttribute("data-root-dir")||"");return}let _e=k.closest(".worker-pane__toggle[data-lane]");if(_e){p.preventDefault();let E=_e.getAttribute("data-lane")||"";(E==="candidate"||E==="queue"||E==="running"||E==="pr_wait"||E==="done")&&Ne(E);return}let we=k.closest(".worker-wait__area-toggle[data-area]");if(we){p.preventDefault(),ct(we.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){p.preventDefault(),It("create","");return}let Ue=k.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ue){p.preventDefault();let E=Ue.getAttribute("data-lane-id")||"",Se=Ue.classList;It(Se.contains("mon2-clane__confirm")?"confirm":Se.contains("mon2-clane__reapply")?"reapply":Se.contains("mon2-clane__run")?"run":Se.contains("mon2-clane__stop")?"stop":"remove",E);return}if(k.closest(".mon-merge-all")){p.preventDefault(),Pe();return}let ft=k.closest(".mon-filter__spec");if(ft){p.preventDefault(),w={...w,spec:ft.getAttribute("data-spec")||"all"},$p(w),Oe();return}let _t=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!_t)return;let en=_t.getAttribute("data-bead-id")||"",$=k.closest("button");if($){p.preventDefault(),Ft($,en);return}k.closest(".rtile__failure-pop, .chip-popover")||en&&!f&&(p.preventDefault(),ze(en,_t.getAttribute("data-root-dir")||it(en).root_dir))}function fe(p){let f=p.target;if(!f||typeof f.closest!="function")return;let k=f.closest(".mon-filter__blocked");if(k){w={...w,show_blocked:k.checked},$p(w),Oe();return}let R=f.closest(".mon-candidate-sort");if(R){C=Lo.some(_e=>_e.value===R.value)?R.value:"repo_spec",py(C),Oe();return}let H=f.closest(".mon-running-sort");if(H){m=H.value==="repo"?"repo":"started",by(m),Oe();return}let re=f.closest(".mon-done-range");re&&(h=On(re.value),gy(h),Oe())}function T(p){let f=p.target,k=f&&typeof f.closest=="function"?R=>f.closest(R):()=>null;M&&!k(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,Oe())}function ee(p){p.key!=="Escape"||M===null||(M=null,Oe())}e.addEventListener("click",$t),e.addEventListener("change",fe),document.addEventListener("click",T),document.addEventListener("keydown",ee),B.attach(),lt.attach(e);{let p=!0;X=Ei(f=>{if(se=f,p){p=!1;return}Oe()})}o&&typeof o.subscribe=="function"&&(de=o.subscribe(()=>{try{$e.clear(),Oe()}catch{}}));function Le(){Re!==null&&(clearInterval(Re),Re=null)}return{recorrectSharedLane:Yt,load(){n("load"),Oe(),Re===null&&(Re=setInterval(()=>{try{Oe()}catch{}},yy))},pause(){Le()},clear(){Le(),lt.detach(),de&&(de(),de=null),X&&(X(),X=null),De.destroy(),q.hidden=!0,pe?.destroy(),pe=null,e.removeEventListener("click",$t),e.removeEventListener("change",fe),document.removeEventListener("click",T),document.removeEventListener("keydown",ee),B.detach(),e.replaceChildren()}}}function Ip(e,t,n){let r=Ct("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let w=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",w),n.gotoView(w)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function _(){o&&rt(u(),o),s&&rt(d(),s)}return _(),i=t.subscribe(()=>_()),{destroy(){i&&(i(),i=null),o&&rt(c``,o),s&&rt(c``,s)}}}var Mp=["bug","feature","task","epic","chore"];function Dp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Pp=["Critical","High","Medium","Low","Backlog"];function Np(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",s.appendChild(L);for(let M of Mp){let B=document.createElement("option");B.value=M,B.textContent=Dp(M),s.appendChild(B)}i.replaceChildren();for(let M=0;M<=4;M+=1){let B=document.createElement("option");B.value=String(M);let Q=Pp[M]||"Medium";B.textContent=`${M} \u2013 ${Q}`,i.appendChild(B)}}m();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(L){o.disabled=L,s.disabled=L,i.disabled=L,l.disabled=L,a.disabled=L,d.disabled=L,_.disabled=L,_.textContent=L?"Creating\u2026":"Create"}function F(){u.textContent=""}function z(L){u.textContent=L}function se(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?s.value=L:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function X(){let L=s.value||"",M=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function N(){F();let L=String(o.value||"").trim();if(L.length===0){z("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){z("Priority must be 0..4"),i.focus();return}let B=String(s.value||""),Q=String(a.value||""),ne={title:L};B.length>0&&(ne.type=B),String(M).length>0&&(ne.priority=M),Q.length>0&&(ne.description=Q),C(!0);try{await t("create-issue",ne)}catch{C(!1),z("Failed to create issue");return}X(),C(!1),w()}return n.addEventListener("cancel",L=>{L.preventDefault(),w()}),h.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),N())}),r.addEventListener("submit",L=>{L.preventDefault(),N()}),{open(){r.reset(),F(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){w()}}}var ky=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function $y(e,t){return Zi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function qp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=$y(r,e);return c`<button
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
  `}function Fp(e,t,n){return c`
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
  `}function jp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ky.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var xy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Bp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(Z=>ge(Z,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function _(){if(d)return d;let Z=i.querySelector('[data-pane="execution"]');return Z?(d=Mi(Z,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Ae=>t.queueStore?.set?.(Ae)}),d):null}function h(){return c`
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
    `}function m(){let Z=r.get();return c`
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
              ${qp(Z,o(),z)}
              ${Fp(Z,u,{onDraft:Ae=>{u=Ae},onAdd:se,onRemove:X})}
              ${jp(Z,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(Z){let Ae=r.get();if(Ae)try{let he=await n("display-policy-set",{expected_revision:Ae.revision,policy:Z(Ae)});C(he),he&&he.conflict&&he.policy&&(he=await n("display-policy-set",{expected_revision:he.policy.revision,policy:Z(he.policy)}),C(he)),he&&he.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(Z){Z&&Z.policy&&typeof Z.policy=="object"&&r.set(Z.policy)}function F(Z){w(Z)}function z(Z){let Ae=r.get();if(!Ae)return;let he=!Ay(Z,Ae);F(ce=>Sy(Z,ce,he))}function se(){let Z=u.trim();Z.length!==0&&(u="",F(Ae=>Ae.hidden_prefixes.includes(Z)?{hidden_prefixes:Ae.hidden_prefixes}:{hidden_prefixes:[...Ae.hidden_prefixes,Z]}),L())}function X(Z){F(Ae=>({hidden_prefixes:Ae.hidden_prefixes.filter(he=>he!==Z)}))}function N(Z){let Ae=r.get();if(!Ae)return;let he=Ae.chips[Z]===!1;F(()=>({chips:{[Z]:he}}))}function L(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${xy.map(Z=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Z.id}
                  aria-selected=${String(l===Z.id)}
                  aria-controls=${`settings-pane-${Z.id}`}
                  @click=${()=>M(Z.id)}
                >
                  <span class="settings-dialog__glyph">${Z.glyph}</span>
                  ${Z.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${U}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${m()}
          </div>
        </div>
      `,i),_()}function M(Z){l=Z,L()}let B=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",B),i.addEventListener("cancel",B);let Q=Z=>{Z.target===i&&U()};i.addEventListener("click",Q);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{a&&L()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Y(Z="execution"){a||(a=!0,t.onOpenChange?.(!0),l=Z,u="",L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),_()?.load())}function U(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Y,close:U,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",B),i.removeEventListener("cancel",B),i.removeEventListener("click",Q),ne&&(ne(),ne=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function Ay(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Sy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Ey=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Up="usage-meter-card",Ty="usage-meter-layer",hl=600,Cy=["token_expired","relogin_required"];function Wp(e){return String(e).padStart(2,"0")}function Ry(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function zp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Wp(r.getHours())}:${Wp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Ey[r.getMonth()]} ${r.getDate()} ${s}`;return`${Ry(n,t)} \xB7 ${l}`}function Oy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Hp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Gp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Vp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ly(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Vp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Iy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Ly(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Vp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function My(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Iy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Xp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Dy(e,t){return!e.held||Xp(e,t)<=hl?e:{...e,available:!1,windows:[],accounts:[]}}function Yp(e,t){return`${e}:${t}`}function Qp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){rt(c``,e),e.hidden=!0,_()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=Ty,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function _(){a!==null&&(rt(c``,a),a.remove(),a=null)}function h(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",F),window.addEventListener("resize",C)),n=ce)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",F),window.removeEventListener("resize",C))}function w(ce){let q=ce.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(m(),U())}function C(){U()}function F(ce){ce.key==="Escape"&&(m(),U())}function z(ce){n===ce?m():h(ce),U()}function se(){m(),U()}async function X(ce,q){if(r.has(ce.key))return;let be=Yp(ce.key,q);r.set(ce.key,q),i.delete(be),U();let xe=null;try{xe=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{xe=null}if(t)return;if(r.delete(ce.key),!xe||xe.ok!==!0){let oe=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";i.set(be,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),U();return}let x=Array.isArray(xe.warnings)?xe.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];x.length>0&&i.set(be,{kind:"warn",text:x.join(" \xB7 ")}),U(),await he()}function N(ce,q,be,xe){let x=Gp(ce.pct),$e=`resets ${zp(ce.resetsAt,xe)}${q?` \xB7 ${be}`:""}`;return c`<span
      class="usage-meter__window ${Hp(x)}"
      style=${`--progress: ${x}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${x}%</span>
    </span>`}function L(ce,q,be){let xe=Xp(q,be),x=q.available&&(q.held||xe>hl),oe=x?`${Math.floor(xe/60)}\uBD84 \uC804 \uCE21\uC815`:"",$e=q.accounts.filter(De=>!De.active).length,de=`usage-meter__group${x?" usage-meter__group--stale":""}`,Re=c`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${q.available?q.windows.map(De=>N(De,x,oe,be)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${$e>0?c`<span class="usage-meter__badge">+${$e}</span>`:""}`;if(q.accounts.length===0)return c`<span
        class=${de}
        aria-label=${`${ce.label} usage`}
        >${Re}</span
      >`;let pe=n===ce.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${de}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${Up}
      @click=${()=>z(ce.key)}
    >
      ${Re}
    </button>`}function M(ce,q){return c`<span class="usage-meter" aria-label="Usage">
      ${ce.map(be=>L(be.provider,be.snapshot,q))}
    </span>`}function B(ce,q){let be=Gp(ce.pct),xe=zp(ce.resetsAt,q);return c`<span
      class="usage-meter__account-window ${Hp(be)}"
      style=${`--progress: ${be}%`}
    >
      <span class="usage-meter__account-key">${ce.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${be}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function Q(ce,q){return Cy.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ce,q,be){let xe=q.status==="ok",x=typeof q.ageSeconds=="number"&&q.ageSeconds>hl,oe=i.get(Yp(ce.key,q.number)),$e=r.get(ce.key),de=$e!==void 0,Re=$e===q.number,pe=["usage-meter__account"];return q.active&&pe.push("usage-meter__account--active"),xe||pe.push("usage-meter__account--unavailable"),x&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${Oy(q.ageSeconds)}</span
            >`}
        ${q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${de}
              @click=${()=>{X(ce,q.number)}}
            >
              ${Re?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${q.windows.map(De=>B(De,be))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Q(ce,q.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function D(ce,q,be){let xe=q.accounts.filter(x=>x.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${xe} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(x=>ne(ce,x,be))}
    </section>`}function Y(ce,q){return c`<div
      class="usage-meter__card"
      id=${Up}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(ce.provider,ce.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function U(){let ce=Date.now(),q=[];for(let xe of Kp){let x=s.get(xe.key);x&&q.push({provider:xe,snapshot:Dy(x,ce)})}if(q.length===0){m(),u();return}let be=q.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);be||m(),rt(M(q,ce),e),e.hidden=!1,be?Z(be,ce):_()}function Z(ce,q){let be=d(),xe=e.getBoundingClientRect(),x=e.ownerDocument.documentElement.clientWidth;be.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),be.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,x-xe.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${Y(ce,q)}`,be)}async function Ae(ce){try{let q=await fetch(ce.endpoint);return q.ok?My(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function he(){l+=1;let ce=l,q=await Promise.all(Kp.map(async be=>({provider:be,read:await Ae(be)})));if(!(t||ce!==l)){for(let be of q){let xe=be.provider.key;if(be.read.kind==="ok"){s.set(xe,be.read.snapshot);continue}if(be.read.kind==="empty"){s.delete(xe);continue}let x=s.get(xe);x!==void 0&&!x.held&&s.set(xe,{...x,held:!0})}U()}}return u(),he(),o=setInterval(()=>{he()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}var Py="worker-ineligible";function Jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zp(e){return Jo(e).includes(Py)}var Ny="worker-serial";function Jp(e){return Jo(e).includes(Ny)}function Pi(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var nf="bdui.worker.candidate_sort",es=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ni=Object.freeze({preset:"spec"}),rf=3,of=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function ef(e){return es.some(t=>t.id===e)}function tf(e){let t=es.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function qy(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ts(e){return e&&"preset"in e?tf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):tf("spec")}function bl(e){return e&&"preset"in e?e.preset:null}function Tr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return ef(e)?{preset:e}:Ni}return Tr(s)}if(!e||typeof e!="object")return Ni;let t=e;if(ef(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>rf||!n.every(Yi))return Ni;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=es.find(s=>qy(s.chain,r));return o?{preset:o.id}:{chain:r}}function sf(){try{return Tr(window.localStorage.getItem(nf))}catch{return Ni}}function yl(e){try{window.localStorage.setItem(nf,JSON.stringify(e))}catch{}}function af(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ms[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,rf)}function lf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Fy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Pi(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function cf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(oc(ts(t))),Fy(n)}function uf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=qs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var df=new Set(["sh","bash","zsh","dash","ksh"]),pf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function ff(e){let t=e.split("/");return t[t.length-1]||""}function jy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=ff(n[0]);if(r!=="env")return df.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&df.has(ff(o))}function By(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Uy(e){let t=[],n=0;pf.lastIndex=0;for(let r of e.matchAll(pf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:By(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Wy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function _f(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function _(L,M){return M?Uy(L).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):L}function h(){if(!o)return c``;let L=s==="ready"&&jy(i),M=s==="ready"?i.split(`
`):[];return c`<div
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
              @click=${()=>{w()}}
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
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${M.map((B,Q)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Q+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(B,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){rt(h(),r)}async function w(){if(s!=="ready")return;let L=await rn(i);ge(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function C(L){L.key==="Escape"&&o&&(L.preventDefault(),X())}function F(){d||(document.addEventListener("keydown",C),d=!0)}function z(){d&&(document.removeEventListener("keydown",C),d=!1)}async function se(L,M=null){let B=++a;F(),o={...L},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let Y=await n(D),U=await Y.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==ne){X();return}if(!Y.ok||!U||U.ok!==!0){s="error",l=Wy(U&&typeof U.error=="string"?U.error:""),m();return}o={lane:U.lane,base_sha:U.base_sha,path:U.path,base_ref:U.base_ref},i=String(U.content),s="ready",m()}catch{if(B!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function X(){a+=1,z(),o=null,i="",m();let L=u;u=null,L?.isConnected&&L.focus()}function N(){X(),r.remove()}return{open:se,close:X,destroy:N}}var mf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},zy=new Set(["queued","running","retry_pending"]);function gf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,Y){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${Y}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let Y=D/6e4;return Number.isInteger(Y)?`timeout ${Y}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function _(D){let Y=d(D);return Y?u("config",Y):""}function h(D,Y,U){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${U.script}
      @click=${Z=>{o&&o({lane:D,base_sha:Y.base_sha,path:U.script,base_ref:Y.base_ref},Z.currentTarget)}}
    ></button>`}function m(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function w(){let D=a().repo_ops,Y=D&&typeof D=="object"?D.repo_id:null;return typeof Y=="string"&&Y?Y:null}function C(){return m().some(D=>D&&D.kind==="deploy"&&zy.has(D.state))}function F(){let D=C(),Y=w()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||Y}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Y?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function z(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function se(D,Y){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Y}
        @change=${U=>{L(D,!U.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(D){let Y=typeof D.base_sha=="string"?D.base_sha:"",U=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${Y?`@${Y.slice(0,7)}`:""}`,Z=z(),Ae=!!D.verify&&Z.verify,he=!!D.deploy&&Z.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${U}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ae?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${h("verify",D,D.verify)}
              ${_(D.verify.timeout_ms)}
              ${Ae?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ae?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?se("verify",Z.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${h("deploy",D,D.deploy)}
              ${_(D.deploy.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):F()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?se("deploy",Z.deploy):""}
      </div>
    </section>`}function N(D){let Y=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return Y&&(Y.status==="resolved"||Y.status==="absent")?X(Y):Y&&(Y.status==="pending"||Y.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function L(D,Y){if(!n)return;let U=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});if(l(U),U&&U.conflict){let Z=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});l(Z)}r()}async function M(){let D=w();if(!n||D===null)return;let Y=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(Y),!Y||Y.ok!==!0){let U=Y&&typeof Y.reason=="string"?Y.reason:"",Z=Object.hasOwn(mf,U)?mf[U]:U||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${Z}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Q(D,Y,U){return c`<div class="worker-repo-ops__policy-group" data-policy=${U}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Y.map(Z=>c`<li data-token=${Z}>
              ${B[Z]||Z}
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
        ${Q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
        ${Q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(a())} ${ne()}
      </details>`}}}var yf=20,Hy=5,Gy=new Set(["failed","running","queued","retry_pending"]),hf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ky(e,t,n=yf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Yy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Gy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Vy(e,t,n={}){let r=Ky(e,t,1/0),o=n.expanded===!0?yf:Hy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Yy(l));return{visible:i,hidden:r.length-i.length}}function bf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Xy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function vf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Qr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function wf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Qy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Zy(e,t){let n=up(e,t),r=dp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Jy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function ev(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Us(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${bf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(hf,n.kind)?hf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Bs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${wr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${bf(e)}"
          >${Xy(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?wf(cp(n.failure_kind,o)):""}
      ${Zy(n,Qy(t,n))}
      ${Jy(n)}
      ${vf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Bs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function tv(e){let t=e.cleanup,n=kr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${Us(e.at)||"\u2014"}</span
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
        ${Au(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${wf(cr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${vf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function nv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?tv(r):ev(r,e.repo_ops))}
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
  </section>`}function kf(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Vy(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(nv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var rv="session-preferred",ov=["exclusive_machine","iterative_user_judgment","visual_verification"];function $f(e,t){if(!Jo(e).includes(rv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&ov.includes(n)?n:""}var sv=Ct("views:worker:adapter"),iv="tab:worker:ready",av="tab:worker:blocked",lv="tab:worker:in-progress",cv="tab:worker:resolved",uv="tab:worker:closed",dv="\u{1F512} blocked",pv={revision:0,auto_advance:!1,auto_merge:!1,slots:oi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},fv=["claude_account","codex_account"],_v=[...Kr,...fv];function mv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function gv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Qs}: ${n}`:Qs}function Cr(e){return e&&typeof e=="object"?e:{}}function hv(e){let t={};for(let n of _v){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function bv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function xf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Nr(n):null,l=new Map,a={},u=null,d=0,_=null,h=!1;function m(){h||!s||s()}function w(M){return u===M?a:{}}async function C(){if(!r||h)return;let M=o?.()||"";if(u===M||_&&_.key===M&&_.generation===d)return;let B=++d;_={key:M,generation:B};let Q=null;try{Q=await Promise.resolve(r("get-session-defaults",{}))}catch(ne){if(B!==d)return;_=null,sv("get-session-defaults failed: %o",ne),m();return}B===d&&(a=Q&&typeof Q.values=="object"&&Q.values!==null?{...Q.values}:{},u=M,_=null,m())}function F(){u=null,d+=1,C()}function z(){for(let[M,B]of l)B==="failed"&&l.delete(M)}function se(M,B){return i?i.selectBoardColumn(M,B):[]}function X(M,B,Q,ne){let D=Array.isArray(M.queue)?M.queue:[],Y=new Set([...D.map(q=>q.bead_id),...(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map(be=>be.bead_id)),...(Array.isArray(M.pr_wait)?M.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(M.done)?M.done:[]).map(q=>q.bead_id)]),U=new Set(Q.map(q=>q.id)),Z=new Set,Ae=[];for(let q of[...B,...Q])Y.has(q.id)||Z.has(q.id)||mv(q)||(Z.add(q.id),Ae.push(q));let he=cf(Ae,Tr(ne)),ce=Cr(M.bead_scope);return he.map(q=>{let be=Dr(q),xe=be.evidence==="published",x=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),oe=x==="quick_fix",$e=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,de=Object.hasOwn(q,"labels")&&Zp(q.labels),Re=de||!Object.hasOwn(q,"labels")?"":$f(q.labels,q.metadata),pe=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,De=!de&&!pe&&(oe?$e:xe&&!be.conflict),lt=U.has(q.id),ot=lt?Pi(q):[],O=[];lt&&ot.length===0&&O.push(dv),pe&&O.push(gv(q.metadata)),oe&&!$e?O.push("missing_description"):!oe&&be.conflict?O.push("spec_id_conflict"):!oe&&be.evidence==="none"?O.push("spec \uC5C6\uC74C"):!oe&&be.evidence==="draft"&&O.push("spec \uBBF8\uBC1C\uD589(draft)");let ae=ce[q.id];return{bead_id:q.id,title:q.title||q.id,route:x,spec_id:be.conflict?"":be.path,published:xe,blocked:lt,blocked_by:ot,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:hv(Cr(q.metadata)),rec:null,...ae&&Array.isArray(ae.scope)?{scope:ae.scope}:{},eligible:De,reason:O.join(" \xB7 "),worker_ineligible:de,session_preferred:Re.length>0,session_preferred_reason:Re,release_info:q.release_info,dependents_info:q.dependents_info}})}function N(M){let[B,Q,ne,D,Y]=M,U=bs([...B,...Q,...ne,...D,...Y]),Z={},Ae=(he,ce)=>{if(!he||typeof he.id!="string"||he.id.length===0)return;let q=Z[he.id]||(Z[he.id]={});if(typeof he.priority=="number"&&!("priority"in q)&&(q.priority=he.priority),typeof he.from_id=="string"&&!("from_id"in q)&&(q.from_id=he.from_id),ce&&!("metadata"in q)){q.metadata=Cr(he.metadata);let be=Cr(he.workflow).route;typeof be=="string"&&be.length>0&&(q.route=be)}};for(let he of[...B,...Q,...ne])Ae(he,!0);for(let he of[...D,...Y])Ae(he,!1);for(let he of new Set([...Object.keys(Z),...U.keys()])){let ce=ys(U,he);if(ce.total>0){let q=Z[he]||(Z[he]={});q.rollup=ce}}return Z}function L(M,B,Q,ne){let D=new Set((Array.isArray(M.done)?M.done:[]).map(U=>U?.bead_id).filter(U=>typeof U=="string")),Y=[];for(let U of B){let Z=tr(U.closed_at);if(typeof U.id!="string"||D.has(U.id)||Z===null||ne!==void 0&&Z<ne||typeof U.comment_count!="number"||U.comment_count<=0)continue;let Ae=`${Q}\0${U.id}\0${String(U.updated_at)}\0${U.comment_count}`,he=l.get(Ae);if(he===void 0&&r&&(l.set(Ae,"pending"),Promise.resolve(r("get-comments",{id:U.id})).then(q=>{let be=Array.isArray(q)&&q.some(xe=>wi(typeof xe?.text=="string"?xe.text:"")?.lane==="session");l.set(Ae,be?"session":"not-session"),m()}).catch(()=>{l.set(Ae,"failed"),m()})),he!=="session")continue;let ce=tr(U.started_at);Y.push({id:U.id,title:U.title||U.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&Z>=ce?Z-ce:null,work_kind:"session",done_at:Z,created_at:U.created_at,updated_at:U.updated_at})}return Y}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||pv,Q=o?.()||"",ne=M&&typeof M.done_since=="number"?M.done_since:void 0,D=se(iv,"ready"),Y=se(av,"blocked"),U=se(lv,"in_progress"),Z=se(cv,"resolved"),Ae=se(uv,"closed");return{workspaces:[{...B,bead_titles:{...Cr(B.bead_titles),...Object.fromEntries([...D,...Y].filter(he=>he&&typeof he.id=="string").map(he=>[he.id,he.title||he.id]))},root_dir:Q,name:bv(Q),runnable:X(B,D,Y,M?M.candidate_sort:void 0),session_done:L(B,Ae,Q,ne),bead_overlay:N([D,Y,U,Z,Ae])}],workspaces_state:[{root_dir:Q,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof Cr(B.workspace_info).slots=="number"?Cr(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:w(Q),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:F,notifyIssuesChanged:z,destroy(){h=!0,d+=1,_=null,l.clear()}}}var qi=1,Af=5,yv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:qi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function cn(e){return e&&typeof e=="object"?e:{}}var Tf="beads-ui.worker.candidate-filter",vl={show_blocked:!1,spec:"all"};function vv(){try{let e=window.localStorage.getItem(Tf);if(!e)return{...vl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...vl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...vl}}}function wv(e){try{window.localStorage.setItem(Tf,JSON.stringify(e))}catch{}}var kv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Cf="bdui.worker.done-range";function $v(){try{let e=window.localStorage.getItem(Cf);return e===null?"today":On(e)}catch{return"today"}}function xv(e){try{window.localStorage.setItem(Cf,e)}catch{}}function Sf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Av(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Ef(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Sv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Ev(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Tv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Cv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Rv=new Set(["waiting_metadata","reviewing","retrying"]);function Ov(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Ht(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Lv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Iv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Lv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Er(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Cv.has(e.phase)}}function Mv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Dv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Mv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${Av(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ef(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ef(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Pv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,_=null,h=null,m={},w=!1,C=!1,F={},z=null,se={active:!1,failure:null}){let X=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,L=!!a&&a.active===!0,M=a&&a.failure||null,B=Ev(a?a.waiting:null),Q=n[e]||null,ne=Q&&Q.gate?Q.gate:null,D=Q&&Q.pr?Q.pr:null,Y=Tv(a?a.resolution:null),U=Ov(h),Z=Iv(h,U),Ae=a&&a.authority||null,he=!!h&&typeof h=="object"&&Rv.has(h.phase),ce=X&&!L&&(!Ae||he||Ae.source==="automatic"&&!C),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Y?Y.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,be=!!ne&&ne.base_badge==="\uCDA9\uB3CC",xe=!!ne&&ne.enabled===!0,x=Oo({bead_id:e,merge_sha:F.merge_sha,cleanup_cursor:F.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:F.repo_operations}),oe=ni(x),$e=s&&!x&&(s.queueing??null)?s.queueing:null,de=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!ne&&ne.tier==="merged",Re=r&&r.step==="repo_operations"&&x?.failed===!0&&(x.step==="deploy"||x.step==="verify")?x.step:null,pe=l&&!!r&&!!ne&&ne.tier==="merged",De=ce&&(xe||be||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||de||pe),lt=ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale",ot=l&&be&&u===!1,O=Vn(m,e,{external:l,merge_active:L||x?.step==="merge",merge_queued:X,conflict_active:!!i,cleanup_active:oe,merged:!!r||ne?.tier==="merged"}),ae=!!O.operation,le=X&&!M&&!N&&!de&&!(Z&&Z.lock_actions),ie=Dv({auto_pending:le,continuation_required:N,queueing:$e,merge_step:x,conflict_badge:q,conflict_live:Y?.live===!0||i==="running",auto_resolution:U,recovery:Z,cleanup_failed:r,cleanup_label:r?kr(r.step):null,base_exception:_,conflicting:be,gate:ne,receipt_check:Q&&Q.receipt_check?Q.receipt_check:null,queue_failure:M,auto_skip:d,queued:X,queue_active:L,queue_position:a?a.position:0,review_session:se,activity:q?null:s&&s.activity||null}),ke=ie?.live===!0&&ie.title?c`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&x?.active!==!0?ti(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:w,...z?{dependency_chips:z}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},badges:ke?[ke]:[],live_badge:ie?.live===!0?ke:null,usage:o,alert:ie?.alert===!0,merge_action:ne?.tier==="merged"&&!de&&!pe?!1:!X||N||ce||lt,cancel_action:X&&!N,cancel_enabled:!L&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:L?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:O,discard_action:O.action,merge_step:x,discard_enabled:O.enabled,discard_title:O.title,merge_enabled:!x&&!$e&&!i&&!ae&&!_&&!(Z&&Z.lock_actions)&&!ot&&se.active!==!0&&(xe||be||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||de||pe||De||he&&!L),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":de||pe?Re==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Re==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":be&&!x&&!de?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":ne?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?O.error?`\uD3D0\uAE30 \uC2E4\uD328: ${O.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${O.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$e?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:Re?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Re==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ot?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":de?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":xe?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:ne&&ne.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${ne&&ne.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function wl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:_}=t,h=r?Nr(r):null,m=vv(),w=null,C=null,F=Hr(()=>ee()),z=new Map,se=new Map,X=sf(),N=bl(X)===null,L=d?On(d):$v();function M(){let g=Or.find(b=>b.value===L);return g?g.label:"\uC624\uB298"}let B=Ti("beads-ui.worker.lane-collapsed"),Q=!1,ne=new Set,D=new Set,Y=new Set,U=new Set,Z=new Set,Ae=null,he=[],ce=xf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ee()});function q(){ce.refreshSessionDefaults()}let be=document.createElement("div");be.className="worker-console";let xe=document.createElement("div");xe.className="worker-top";let x=document.createElement("div");x.className="worker-drawer-overlay",x.hidden=!0;let oe=document.createElement("div");oe.className="worker-drawer-overlay__backdrop";let $e=document.createElement("div");$e.className="worker-drawer-host";let de=document.createElement("div");de.className="worker-drawer-host",de.hidden=!0,x.append(oe,$e,de);let Re=document.createElement("div");Re.className="worker-lanes-host",be.append(xe,x,Re),e.appendChild(be);let pe=ar(null,null),De=[],lt=Ri({transport:n,console_el:be,getLanes:()=>pe,getWorkspaces:()=>De,getCrossLanes:()=>null,reproject:()=>({lanes:S(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>ee(),adoptQueue:(g,b)=>{o&&o.set(b)},onDragBegin:()=>{w=null}}),ot=null,O=ro($e,{transport:n,sessionLogStore:s,onClose:()=>{ot=null,x.hidden=!0,ee()}}),ae=kf(de,{onClose:()=>{de.hidden=!0,x.hidden=!0,ee()}}),le=_f({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",ke=gf({queueStore:o,transport:n,onChanged:()=>ee(),onOpenScript:(g,b)=>{le.open(g,b)}});function ue(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:qi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let g=ue(),b=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,A=Array.isArray(g.serial_lanes)?g.serial_lanes:[],te=[];for(let Te of A){if(te.length>=b)break;!Te||typeof Te.id!="string"||!/^s[1-5]$/.test(Te.id)||!Array.isArray(Te.entries)||te.push({id:Te.id,label:`\uC9C1\uB82C ${Te.id.slice(1)}`,count:Te.entries.length})}return te.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...te]}function Ge(g){if(!w||!g.some(A=>A.id===w))return null;let b=Fe();return b?{bead_id:w,lanes:b}:null}function Qe(){return l&&l()||""}async function Pe(g,b){await lt.sendOp({type:"worker-queue-place",payload:{bead_id:g,...b==="parallel"?{}:{lane:b}},root_dir:Qe()},g)}function V(){let g=ue();return typeof g.revision=="number"?g.revision:0}function j(g){g&&g.queue&&o&&o.set(g.queue)}async function Ne(g){if(!n||!g)return;let b=await n("worker-attempt-pause",{attempt_id:g});b&&b.paused===!1&&b.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function ct(g,b="session"){if(!n||!g)return;let A=await Br();if(A===null)return;let te=async(Te={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:V(),...A!==""?{instructions:A}:{},...Te}),me=await te();j(me),me&&me.conflict&&(me=await te(),j(me)),me=await zn(me,(Te,Ke)=>te({continuation:Te,decision_token:Ke}),{onResult:j,refresh:()=>te()}),me&&me.resumed===!1&&!me.conflict&&me.reason&&ge(`${b==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${me.reason}`,"error",2400)}async function Je(g,b,A=!0){if(!n)return null;let te=n,me=await te(g,{...b,expected_revision:V()});return j(me),me&&me.conflict&&A&&(me=await te(g,{...b,expected_revision:V()}),j(me)),me}async function y(g){if(!n||!g)return;let b=ue().merge_queue?.find(te=>te.bead_id===g)?.continuation_action;if(b?.mismatch&&b.continuation===null){await je(g,b.mismatch);return}ne.add(g),ee();let A;try{A=await Je("worker-merge-queue-add",{bead_id:g})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ne.delete(g),ee()}if(!(!A||A.applied)){if(A.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(Sv(A.reason),"error",2400)}}async function W(g){if(!(!n||!g||D.has(g))){D.add(g),ee();try{let b=await n("worker-cleanup-retry",{bead_id:g,expected_revision:V()});j(b),b&&!b.retried&&!b.conflict&&b.reason&&ge(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{D.delete(g),ee()}}}async function Ee(g,b){let A=ue().hold;if(!n||!A||typeof A.since!="number")return;let te=await n(g,{since:A.since});j(te),te&&te.ok===!1&&ge(`${b}: ${te.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":te.reason||""}`,"error",2800)}async function Ce(g,b){if(!n||!g||!b)return;let A=await n("worker-parked-retry",{bead_id:g,attempt_id:b});j(A),A&&A.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${A.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":A.reason||""}`,"error",2800)}async function je(g,b){let A=await zn({continuation_mismatch:b},(me,Te)=>Je("worker-merge-queue-add",{bead_id:g,continuation:me,decision_token:Te},!1)),te=A?.queue?.merge_queue?.find(me=>me.bead_id===g)?.continuation_action;if(A?.applied!==!0&&te?.continuation===null&&te.mismatch){await je(g,te.mismatch);return}A&&A.applied===!1&&!A.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ye(g){if(!n)return;let b=await Je("worker-merge-auto-toggle",{on:g});!b||b.conflict||ge(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function dt(g){if(!n||!g)return;let b=await Je("worker-merge-queue-remove",{bead_id:g});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function wt(){await Je("worker-merge-queue-remove",{all:!0})}async function Lt(g,b=null,A="unmerged",te=null){if(!n||!g)return;let me=To(g,A);if(!(!!te||typeof globalThis.confirm!="function"||globalThis.confirm(me)))return;let Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...te?{operation_id:te}:{},expected_revision:V()});if(j(Ke),Ke&&Ke.conflict&&(Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...te?{operation_id:te}:{},expected_revision:V()}),j(Ke)),Ke&&Ke.discarded===!0){ge(Ws(Ke),"success",5e3);return}if(Ke&&Ke.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.reason}`,"error",2800);return}if(Ke&&Ke.accepted&&Ke.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ke&&Ke.accepted&&!Ke.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${Ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ke&&!Ke.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function kt(g,b,A){if(!(!n||!b||!A||U.has(b))){U.add(b),ee();try{let te=await n(g,{bead_id:b,action_id:A,expected_revision:V()});j(te),te?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!te?.ok&&te?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(te.reason)}`,"error",2800)}finally{U.delete(b),ee()}}}async function mt(g,b){if(!n||!b||Y.has(b))return;Y.add(b),ee();let A;try{let te=async(me={})=>await n(g,{bead_id:b,expected_revision:V(),...me});A=await te(),j(A),A&&A.conflict&&(A=await n(g,{bead_id:b,expected_revision:V()}),j(A)),g==="worker-revise-fix"&&(A=await zn(A,(me,Te)=>te({continuation:me,decision_token:Te}),{onResult:j,refresh:()=>te()}))}finally{Y.delete(b),ee()}if(!(!A||A.conflict)){if(A.ok){ge(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function Be(g){if(!n)return;let b=await n("worker-automation-toggle",{on:g,expected_revision:V()});j(b),b&&b.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:V()}).then(j)}async function I(g){if(!n||!g)return;let b=await n("worker-repo-operation-dismiss",{operation_id:g});j(b),b&&b.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function J(g){if(!n||!Number.isFinite(g))return;let b=Math.max(qi,Math.floor(g)),A=await n("worker-queue-set-slots",{slots:b,expected_revision:V()});j(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:V()}).then(j)}async function ye(g){if(!n||!Number.isInteger(g)||g<1||g>Af)return;let b=ue(),A=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(g).reduce((Te,Ke)=>Te+(Array.isArray(Ke?.entries)?Ke.entries.length:0),0),te=()=>({count:g,expected_revision:V()}),me=await n("worker-queue-set-serial-lane-count",te());j(me),me&&me.conflict&&(me=await n("worker-queue-set-serial-lane-count",te()),j(me)),me&&me.applied&&A>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function S(){let g=hr(L),b=ce.read({candidate_sort:X,done_since:g});return De=b.workspaces,pe=ar(b.workspaces,b.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),pe}function K(g){return g.queue_groups[0]||yv}function Ie(g){let b=g.dependency_chips||null,A={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},te=z.get(g.id),me=se.get(g.id)||null,Te=te&&te.overlaps.length>0?te.overlaps:null,Ke=!!te&&te.scope_missing;return!me&&!Te&&!Ke&&Object.keys(A).length===0?null:{...A,...me?{predecessors:me}:{},...Te?{overlaps:Te}:{},...Ke?{scope_missing:!0}:{}}}function We(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:qe(g)}}function qe(g){return Xs(g,b=>F.isOpen({bead_id:g.id,chip_key:b}))}function et(){let g=ue(),b=new Map;for(let A of Object.values(cn(g.lane_states))){let te=Array.isArray(A?.corrections)?A.corrections:[];for(let me of te)me&&typeof me.bead_id=="string"&&typeof me.after=="string"&&b.set(me.bead_id,me.after)}return{admission:cn(g.admission),bead_labels:cn(g.bead_labels),correction_after:b}}function Oe(g,b){let A=We(g),te=yu(b.admission[g.id]||null,!!g.discard||U.has(g.id)),me=b.bead_labels[g.id],Te=b.correction_after.get(g.id);return{...A,draggable:A.draggable===!0&&!te,stale_work:te,reason:te?"":A.reason,worker_serial:Array.isArray(me)&&Jp(me),badges:Te?[`\u{1F517} ${Te} \uB4A4 (blocks \uC790\uB3D9)`,...A.badges||[]]:A.badges,revise_enabled:A.revise_enabled===!0&&!Y.has(g.id)}}function He(g){let b=et();return K(g).sublanes.parallel.map(A=>Oe(A,b))}function Ze(g){let b=et();return K(g).sublanes.serial.map(A=>{let te=A.occupants.map(me=>({id:me.id,title:me.title,draggable:!1,lane:A.id,ghost:!0,badges:[me.badge]}));return{id:A.id,index:A.index+1,raw_length:A.raw_length,ghosts:te,items:A.items.map(me=>Oe(me,b)),occupied:A.occupied_by.length>0,badge:A.occupants.length>0?A.occupants[0].badge:"\uB300\uAE30",cycle:A.cycle===!0}})}function bt(g){return g.runnable.map(b=>We(b))}function ze(g){return g.done.map(b=>We(b))}function xt(g){let b=g.running.filter(A=>A.non_occupying!==!0).map(A=>({...A,bead_id:A.id,attempt_id:A.attempt_id||"",paused:A.run_state==="paused",failed:A.run_state==="failed",parked:A.run_state==="parked",retry_wait:A.run_state==="retry_wait",status_label:A.run_state==="failed"?A.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":A.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":A.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:A.can_pause!==!1,workspace_name:"",dependency_chips:Ie(A)||void 0,chip_popover:qe(A),rollup_expanded:Z.has(A.id),failure:A.failure?{...A.failure,open:C===A.attempt_id}:null}));return[...b.filter(A=>A.failed===!0),...b.filter(A=>A.failed!==!0&&A.parked===!0),...b.filter(A=>A.failed!==!0&&A.parked!==!0)]}function qt(g){if(Ae&&Ae.model===g)return Ae.rows;let b=ue(),A=K(g),te=cn(b.attempts),me=Object.values(te).filter(Kn),Te=new Map;for(let Xe of me)Te.set(Xe.attempt_id,Xe);let Ke=new Map;for(let Xe of me)Ke.set(Xe.bead_id,Xe);let yt=new Map;for(let Xe of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])yt.has(Xe.id)||yt.set(Xe.id,Xe);let jt=Xe=>{let Pt=null;for(let bn of me)!bn||bn.bead_id!==Xe||La(bn,Te)||(Pt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Pt.started_at=="number"?Pt.started_at:0))&&(Pt=bn);return Pt&&typeof Pt.target_base=="string"?Pt.target_base:null},Xt=new Map;for(let Xe of g.running)Xe.run_state==="failed"||Xe.conflict_resolution!==!0||(Xe.run_state!=="paused"?Xt.set(Xe.id,"running"):Xt.has(Xe.id)||Xt.set(Xe.id,"paused"));let gn=cn(b.auto_merge_skips),Dn=new Set(A.merge.auto_excluded),hn=cn(b.pr_observations),Pn=cn(b.pr_activity),wn=cn(b.cleanup_failed),Kt=cn(b.discard_operations),er=cn(b.bead_workflow),Nn=cn(b.bead_titles),qn=b.merge_queue_state||{active:null,failures:{}},Fn=A.merge.state.waiting,jn=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Xe=>{let Pt=yt.get(Xe.bead_id);return{...Pv(Xe.bead_id,Pt?.title||Nn[Xe.bead_id]||Xe.bead_id,hn,wn[Xe.bead_id]||null,Gn(te,Xe.bead_id),Pn[Xe.bead_id]||(ne.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:D.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Xt.get(Xe.bead_id)||null,Xe.external===!0,{position:A.merge.positions.get(Xe.bead_id)||0,active:qn.active===Xe.bead_id,failure:cn(qn.failures)[Xe.bead_id]||null,waiting:Fn&&Fn.bead_id===Xe.bead_id?Fn.reason:null,resolution:A.merge.resolutions.get(Xe.bead_id),continuation_action:A.merge.continuations.get(Xe.bead_id),authority:A.merge.authorities.get(Xe.bead_id)||null},Xe.wt_present!==!1,b.auto_merge===!0&&Dn.has(Xe.bead_id)?gn[Xe.bead_id]?.reason||"":null,Oa(A.declared_base,jt(Xe.bead_id)),cn(b.completion_status)[Xe.bead_id]||null,Kt,Ke.get(Xe.bead_id)?.worker_serial===!0,b.auto_merge===!0,{merge_sha:Xe.merge_sha,cleanup_cursor:Xe.cleanup_cursor,repo_operations:A.repo_operations},Pt?Ie(Pt):null,mu(te,Xe.bead_id)),workflow:er[Xe.bead_id]||null,priority:Pt?.priority,from_id:Pt?.from_id,...Pt?.created_at===void 0?{}:{created_at:Pt.created_at},...Pt?.updated_at===void 0?{}:{updated_at:Pt.updated_at}}});return Ae={model:g,rows:jn},jn}function it(g){let b=K(g),A=[];for(let Te of g.running)Te.non_occupying!==!0&&A.push({id:Te.id,title:Te.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Te.serial_lane_id??null});for(let Te of g.pr_wait)A.push({id:Te.id,title:Te.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Te of b.sublanes.serial)Te.items.forEach((Ke,yt)=>{A.push({id:Ke.id,title:Ke.title,location_label:`${Te.id} #${yt+1}`,kind:"serial",lane_id:Te.id})});b.sublanes.parallel.forEach((Te,Ke)=>{A.push({id:Te.id,title:Te.title,location_label:`#${Ke+1}`,kind:"parallel",lane_id:null})});for(let Te of g.runnable)A.push({id:Te.id,title:Te.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Te.queue_placeable===!0});let te=ue();z=uf(te.bead_scope,A);let me=new Map;for(let Te of[...g.running,...g.runnable])Array.isArray(Te.blocked_by)&&Te.blocked_by.length>0&&me.set(Te.id,Te.blocked_by);for(let[Te,Ke]of Object.entries(cn(te.bead_blocked_by)))Array.isArray(Ke)&&me.set(Te,Ke.filter(yt=>typeof yt=="string"&&yt.length>0));se=Cu(me,A,cn(te.blocker_workspaces))}function Yt(g){let b=g.hold&&typeof g.hold=="object"?g.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let A=cr(b.cause)||String(b.cause||""),te=Array.isArray(g.lineages)?g.lineages:[];if(b.kind==="env"){let Te=te.map(yt=>yt&&yt.next_at).filter(yt=>typeof yt=="number").sort((yt,jt)=>yt-jt)[0],Ke=typeof Te=="number"?` \xB7 \uB2E4\uC74C ${new Date(Te).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${A} — 재시도 대기${Ke}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let me=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(Te=>typeof Te=="string"&&Te.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${A}${me.length>0?` \u2014 bead ${me.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function St(g){let b=ue(),A=K(g),te=A.sublanes.parallel,me=te.length>0?te[0].id:"\u2014",Te=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ke=Wt(g),yt=A.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",jt=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(Kt=>Kt&&typeof Kt.armed_by_lane=="string"&&Kt.armed_by_lane.length>0).length,Xt=jt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${jt}건 진행 중</span
          >`:"",gn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${A.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${g.done.length}</b></span
      >`,Dn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${A.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${A.declared_base||"?"}</span
    >`,hn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${qi}
          step="1"
          .value=${String(A.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Af},(Kt,er)=>er+1).map(Kt=>c`<option
                value=${String(Kt)}
                ?selected=${A.serial_lane_count===Kt}
              >
                ${Kt}
              </option>`)}
        </select>
      </label> `,Pn=hu(A.repo_operations,A.cleanup_failures),wn=Yt(b);return Q?c`<div class="worker-ribbon">
          ${Te} ${Ke}
          <div class="worker-kpi worker-kpi--ribbon">
            ${yt}${Xt}${gn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${hn}</div>
          <div class="worker-kpi">${Dn}</div>
        </div>
        ${wn}${Pn}${ke.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Te}${Ke}${hn}</div>
        <div class="worker-kpi">
          ${yt}${Xt}${gn}${Dn}
          ${(Array.isArray(A.token_total)?A.token_total:A.token_total?[{label:A.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Kt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Kt.tooltip}
                >${M()} 완료 · 누적 ${Kt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${me}</b></span
          >
        </div>
      </div>
      ${wn}${Pn}${ke.template()}`}function It(g){let b=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${kv.map(A=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${m.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function Ut(){let g=N?"custom":bl(X)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${es.map(b=>c`<option value=${b.id} ?selected=${g===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Vt(){let g=ts(X);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(b=>{let A=g[b];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${b}
            aria-label=${`${b+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${A?A.key:""}
          >
            ${b===0?"":c`<option value="" ?selected=${!A}>없음</option>`}
            ${of.map(te=>c`<option
                  value=${te.key}
                  ?selected=${!!A&&A.key===te.key}
                >
                  ${te.label}
                </option>`)}
          </select>
          ${A?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${b}
                aria-label=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${A.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${A.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Or.map(g=>c`<option value=${g.value} ?selected=${L===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function Wt(g){let b=K(g).merge,A=ue().auto_merge===!0;if(b.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${b.positions.size}
      </button>`;if(A)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let te=new Set(b.auto_excluded),me=qt(g).filter(Te=>Te.merge_action&&Te.merge_enabled&&!te.has(Te.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${me>0?` ${me}`:""}
    </button>`}function Dt(g){if(!(g.draggable!==!0||g.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${g.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function un(g,b){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${tn(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${An(g,{actions:Dt(g)})}
    </div>`}function Mt(g){let b=He(g),A=Qe();return Zs({parallel:{rows:b.map((te,me)=>un(te,{kind:"parallel",root_dir:A,row_index:me})),count:b.length,collapsed:B.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:A}},serial:{lanes:Ze(g).map(te=>({id:te.id,title:`\uC9C1\uB82C ${te.index}`,rows:[...te.ghosts.map(me=>An(me,{actions:Dt(me)})),...te.items.map((me,Te)=>un(me,{kind:"repo-serial",root_dir:A,row_index:Te,lane_id:te.id}))],count:te.ghosts.length+te.items.length,empty:te.ghosts.length+te.items.length===0,badge:te.badge,held:te.occupied,cycle:te.cycle,drop:{drop:"repo-serial",root_dir:A,lane_id:te.id,lane_length:String(te.raw_length)}})),collapsed:B.isAreaCollapsed("serial")}})}function Gt(g){return mp(xt(g),Date.now(),ot)}function Ft(g){return g.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function $t(g){let b=K(g),A=bt(g),te=He(g),me=ze(g),Te=qt(g),Ke=xt(g),yt=Mn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:A,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ut(),header_row:N?Vt():void 0,controls:It(g),collapsible:!0,collapsed:B.isCollapsed("candidate"),place_menu:Ge(A),onOpenDoc:u?(Xt,gn)=>u(gn):void 0}),jt=Mn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:me,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Jt(),collapsible:!0,collapsed:B.isCollapsed("done"),preview:Q?Array.isArray(b.token_total)?b.token_total.map(Xt=>Xt.label).join(" \xB7 "):b.token_total||Sf(me):void 0});return Q?c`<div class="worker-lanes worker-lanes--mobile">
        ${Js({live:Ft(g),running_body:Ke.length>0?Gt(g):"",pr_wait_rows:Te.map(Xt=>An(Xt)),count:Ke.length+Te.length})}
        ${Mn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:te,count:te.length,collapsible:!0,collapsed:B.isCollapsed("queue"),preview:Sf(te),body:Mt(g)})}
        ${yt} ${jt}
      </div>`:c`<div class="worker-lanes">
      ${yt}
      ${Mn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:te,count:te.length,collapsible:!0,collapsed:B.isCollapsed("queue"),body:Mt(g)})}
      ${Mn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ke,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${b.slots}</span
        >`,live:Ft(g),collapsible:!0,collapsed:B.isCollapsed("running"),body:Gt(g)})}
      ${Mn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Te,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:B.isCollapsed("pr_wait")})}
      ${jt}
    </div>`}function fe(g){B.toggle(g),ee()}function T(g){B.toggleArea(g),ee()}function ee(){let g=S();it(g),rt(St(g),xe),rt($t(g),Re)}function Le(){let g=!0,b=Ei(A=>{if(Q=A,g){g=!1;return}ee()});he.push(b)}function p(g){m=g,wv(g),ee()}function f(g){if(g==="custom"){N=!0,ee();return}X=Tr(g),yl(X),N=!1,ee()}function k(g){X=Tr({chain:g}),yl(X),ee()}function R(g){L=On(g),xv(L),_?.(L),ee()}function H(g){let b=g.target?.closest?.(".worker-serial-lane-count");if(b){let jt=Number.parseInt(b.value,10);Number.isFinite(jt)&&ye(jt).then(ee);return}let A=g.target?.closest?.(".worker-filter__blocked");if(A){p({...m,show_blocked:A.checked});return}let te=g.target?.closest?.(".worker-sort-chain__key");if(te){let jt=Number.parseInt(te.getAttribute("data-step")||"",10);Number.isFinite(jt)&&k(af(ts(X),jt,te.value));return}let me=g.target?.closest?.(".worker-done-range");if(me){R(me.value);return}let Te=g.target?.closest?.(".worker-sort");if(Te){f(Te.value);return}let Ke=g.target?.closest?.(".worker-slots__input");if(!Ke)return;let yt=Number.parseInt(Ke.value,10);if(!Number.isFinite(yt)){ee();return}J(yt).then(ee)}function re(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function _e(){let g=K(S()),b=ue().workspace_info,A=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:A}}function we(){ot&&O.close(),de.hidden=!1,x.hidden=!1,ae.open(_e()),ee()}function Ue(g){let b=ue(),A=b.attempts?b.attempts[g]:null;ot=g,ae.close(),de.hidden=!0,x.hidden=!1,O.open({attempt_id:g,meta:re(A)}),ee()}function ft(g){let b=ue(),A=(Array.isArray(b.session_active)?b.session_active:[]).find(me=>me&&me.bead_id===g),te=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(me=>me&&me.current===!0);te&&(ae.close(),de.hidden=!0,x.hidden=!1,O.open(Ur(te,g,"in_progress")),ee())}function _t(){if(ae.isOpen()&&ae.refresh(_e()),!ot)return;let g=ue(),b=g.attempts?g.attempts[ot]:null;if(b){O.updateMeta(re(b));return}O.close()}function en(g,b){if(g.length===0||!i)return;let A=l?l():void 0;if(b.length===0||!A||b===A||!a){i(g);return}Promise.resolve(a(b)).then(()=>{i(g)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function $(g){let b=g.target;if(b?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let A=b?.closest?.(".worker-sort-chain__dir");if(A){let Me=Number.parseInt(A.getAttribute("data-step")||"",10);Number.isFinite(Me)&&k(lf(ts(X),Me));return}let te=b?.closest?.(".worker-dep__open");if(te){en(te.getAttribute("data-dep-id")||"",te.getAttribute("data-root-dir")||"");return}let me=b?.closest?.(".judgement-chip");if(me){let Me=me.closest("[data-bead-id]"),Et=Me&&Me.getAttribute("data-bead-id")||"",zt=me.getAttribute("data-chip-key")||"";Et&&zt&&F.toggle({bead_id:Et,chip_key:zt});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){we();return}let Te=b?.closest?.(".worker-repo-op__dismiss");if(Te){I(Te.dataset.operationId||"");return}let Ke=b?.closest?.(".worker-cleanup__resume");if(Ke){let Me=Ke.dataset.beadId;Me&&W(Me);return}if(b?.closest?.(".worker-hold__retry")){Ee("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){Ee("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Be(!ue().auto_advance);return}let yt=b?.closest?.(".worker-merge-all");if(yt){yt.classList.contains("worker-merge-all--stop")?ue().auto_merge===!0?Ye(!1):wt():Ye(!0);return}let jt=b?.closest?.(".worker-pane__toggle[data-lane]");if(jt){let Me=jt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&fe(Me);return}let Xt=b?.closest?.(".worker-wait__area-toggle[data-area]");if(Xt){let Me=Xt.dataset.area;(Me==="parallel"||Me==="serial")&&T(Me);return}let gn=b?.closest?.(".worker-card__place-lane");if(gn){let Me=gn.dataset.beadId,Et=gn.dataset.lane;Me&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(w=null,ee(),Pe(Me,Et));return}if(b?.closest?.(".worker-card__place-cancel")){w=null,ee();return}let hn=b?.closest?.(".worker-card__place");if(hn){let Me=hn.dataset.beadId;Me&&!hn.disabled&&(Fe()?(w=Me,ee()):Pe(Me,"parallel"));return}let Pn=b?.closest?.(".worker-filter__chip");if(Pn){let Me=Pn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&p({...m,spec:Me});return}let wn=b?.closest?.('[data-action="queue-remove"]');if(wn){let Me=wn.dataset.beadId||"";Me&&lt.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Qe()},Me);return}let Kt=b?.closest?.(".worker-mini__merge");if(Kt){let Me=Kt.dataset.beadId||"";ue().cleanup_failed?.[Me]?W(Me):y(Me);return}let er=b?.closest?.(".worker-mini__merge-cancel");if(er){dt(er.dataset.beadId||"");return}let Nn=b?.closest?.(".worker-mini__discard");if(Nn){Lt(Nn.dataset.beadId||"",Nn.dataset.attemptId||null,Nn.dataset.discardMode==="merged"?"merged":"unmerged",Nn.dataset.operationId||null);return}let qn=b?.closest?.(".worker-mini__stale-continue");if(qn){kt("worker-stale-work-continue",qn.dataset.beadId||"",qn.dataset.actionId||"");return}let Fn=b?.closest?.(".worker-mini__stale-backup");if(Fn){kt("worker-stale-work-backup-fresh",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let jn=b?.closest?.(".worker-mini__stale-recheck");if(jn){kt("worker-stale-work-recheck",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let Xe=b?.closest?.(".worker-mini__revise-fix");if(Xe){mt("worker-revise-fix",Xe.dataset.beadId||"");return}let Pt=b?.closest?.(".worker-mini__revise-approve");if(Pt){mt("worker-revise-approve",Pt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let bn=b?.closest?.(".rtile__failure-badge");if(bn){let Me=bn.dataset.attemptId||"";C=C===Me?null:Me,ee();return}let ns=b?.closest?.(".rtile__attempt-copy");if(ns){let Me=ns.dataset.attemptId||"";Me&&rn(Me).then(Et=>{ge(Et?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Et?"success":"error",1400)});return}if(b?.closest?.(".rtile__parked-retry")){let Me=b?.closest?.(".rtile");Ce(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let so=b?.closest?.(".rtile__discard");if(so){let Me=b?.closest?.(".rtile"),Et=Me?.dataset?.beadId,zt=Me?.dataset?.attemptId;Et&&Lt(Et,zt||null,so.dataset.confirmation==="merged"?"merged":"unmerged",so.dataset.operationId||null);return}if(b?.closest?.(".rtile__pause")){let Et=b?.closest?.(".rtile")?.dataset?.attemptId;Et&&Ne(Et);return}if(b?.closest?.(".rtile__resume")){let Me=b?.closest?.(".rtile__resume"),zt=b?.closest?.(".rtile")?.dataset?.attemptId;zt&&ct(zt,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let Me=b?.closest?.(".rtile"),Et=Me?.dataset?.attemptId;if(Et){Ue(Et);return}let zt=Me?.dataset?.beadId;zt&&ft(zt);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){ae.close(),O.close();return}if(b?.closest?.(".worker-drawer-host"))return;let rs=b?.closest?.(".rtile .board-card__roll-toggle");if(rs){let Me=rs.dataset.rollParent;Me&&(Z.has(Me)?Z.delete(Me):Z.add(Me),ee());return}let os=b?.closest?.(".rtile .board-card__roll-child");if(os){let Me=os.dataset.childId;Me&&i&&i(Me);return}let io=b?.closest?.(".rtile");if(io){if(b?.closest?.(".rtile__id")){let Et=io.dataset.beadId;Et&&rn(Et).then(zt=>{zt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=io.dataset.beadId;Me&&i&&i(Me);return}let ss=b?.closest?.(".worker-mini, .worker-card");if(ss){let Me=ss.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){Me&&rn(Me).then(zt=>{zt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=b?.closest?.(".ctl-chip--from");if(Et){let zt=Et.dataset.fromId;zt&&i&&i(zt);return}Me&&i&&i(Me)}}lt.attach(e),e.addEventListener("click",$),e.addEventListener("change",H);function E(g){let b=g.target,A=b&&typeof b.closest=="function"?te=>b.closest(te):()=>null;C&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,ee())}function Se(g){g.key!=="Escape"||C===null||(C=null,ee())}return document.addEventListener("click",E),document.addEventListener("keydown",Se),F.attach(),he.push(()=>{document.removeEventListener("click",E),document.removeEventListener("keydown",Se),F.detach()}),Le(),h&&he.push(h.subscribe(()=>{ce.notifyIssuesChanged(),ee()})),o&&he.push(o.subscribe(()=>{let g=l&&l()||"";g!==ie&&(ie=g,le.close()),ee(),_t()})),ee(),{load(){ce.ensureSessionDefaults(),ee()},refreshSessionDefaults:q,destroy(){for(let g of he.splice(0))try{g()}catch{}lt.detach(),e.removeEventListener("click",$),e.removeEventListener("change",H),ce.destroy();try{O.destroy()}catch{}x.hidden=!0;try{le.destroy()}catch{}rt(c``,e)}}}function kl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Rf(e,t,n,r=async()=>{},o=async()=>{}){let s=Ct("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let Q=M.target.value,D=t.getState().workspace?.current?.path||"";if(Q&&Q!==D){s("switching workspace to %s",Q),l=!0,L();try{await n(Q)}catch(Y){s("workspace switch failed: %o",Y)}finally{l=!1,L()}}}async function _(){let M=t.getState(),B=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!B||a)){s("git-pulling workspace %s",B),a=!0,L();try{await r(B)}catch(Q){s("workspace git pull failed: %o",Q)}finally{a=!1,L()}}}function h(M){let B=M.target;B&&e.contains(B)||C()}function m(M){M.key==="Escape"&&C()}function w(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),L())}function C(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),L())}function F(){u?C():w()}async function z(M){let B=M.target,Q=B.value,ne=B.checked;s("toggling visibility %s \u2192 %s",Q,String(ne));try{await o(Q,ne)}catch(D){s("workspace visibility toggle failed: %o",D)}}function se(M){return M?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(M,B){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
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
                ${M.map(Q=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Q.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Q.path}"
                        .checked=${!B.has(Q.path)}
                        @change=${z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${kl(Q.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let M=t.getState(),B=M.workspace?.current,Q=M.workspace?.available||[],ne=new Set(M.workspace?.hidden||[]),D=B?.path||Q[0]?.path||"";if(Q.length===0)return c``;let Y=Q.filter(U=>!ne.has(U.path)||U.path===D);if(Y.length<=1){let U=Y[0]||Q[0],Z=kl(U.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${U.path}"
            >${Z}</span
          >
          ${X(Q,ne)}
          ${se(D)}
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
          ${Y.map(U=>c`
              <option
                value="${U.path}"
                ?selected=${U.path===D}
                title="${U.path}"
              >
                ${kl(U.path)}
              </option>
            `)}
        </select>
        ${X(Q,ne)}
        ${se(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){rt(N(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),rt(c``,e)}}}var Of=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function $l(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Lf(e,t,n=$l()){return{id:n,type:e,payload:t}}function If(e={}){let t=Ct("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],_=new Map,h=new Set;function m(N){for(let L of Array.from(h))try{L(N)}catch{}}function w(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*N,M=Math.max(0,Math.round(N+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,X()},M)}function C(N){try{o?.send(JSON.stringify(N))}catch(L){t("ws send failed",L)}}function F(){for(s="open",t("ws open"),m(s),i=0;d.length;){let N=d.shift();N&&C(N)}}function z(N){let L;try{L=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let B=u.get(L.id);u.delete(L.id),L.ok?B?.resolve(L.payload):B?.reject(L.error||new Error("ws error"));return}let M=_.get(L.type);if(M&&M.size>0)for(let B of Array.from(M))try{B(L.payload)}catch(Q){t("ws event handler error",Q)}else t("ws received unhandled message type: %s",L.type)}function se(){s="closed",t("ws closed"),m(s);for(let[N,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(N);i+=1,w()}function X(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),s="connecting",m(s),o.addEventListener("open",F),o.addEventListener("message",z),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(L){t("ws connect failed %o",L),w()}}return X(),{send(N,L){if(!Of.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let M=$l(),B=Lf(N,L,M);return t("send %s id=%s",N,M),new Promise((Q,ne)=>{u.set(M,{resolve:Q,reject:ne,type:N}),o&&o.readyState===o.OPEN?C(B):(t("queue %s id=%s (state=%s)",N,M,s),d.push(B))})},on(N,L){_.has(N)||_.set(N,new Set);let M=_.get(N);return M?.add(L),()=>{M?.delete(L)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Nv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function qv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var xl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",Fv="bdui.worker.done-range",Df=Op,Pf="worker:queue",Nf="ui:order",qf="ui:display-policy",Ff="exec:presets",dr="tab:board:closed",jf="beads-ui.board.closed-range";function jv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Bv(e))});return n.observe(e),()=>n.disconnect()}function Bv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Uv(e){let t=Ct("main");t("bootstrap start"),jv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Qp(i),l&&a&&u&&d){let $e=function($,E){let Se="Request failed",g="";if($&&typeof $=="object"){let A=$;if(typeof A.message=="string"&&A.message.length>0&&(Se=A.message),typeof A.details=="string")g=A.details;else if(A.details&&typeof A.details=="object")try{g=JSON.stringify(A.details,null,2)}catch{g=""}}else typeof $=="string"&&$.length>0&&(Se=$);let b=E&&E.length>0?`Failed to load ${E}`:"Request failed";oe.open(b,Se,g)},Ne=function($){return`${fe.getState().workspace.current?.path||""}\0${$}`},ct=function(){ke&&(ke().catch(()=>{}),ke=null),ue=null,Fe=null},y=function($){Ge=$;let E=()=>{Ge!==$||fe.getState().selected_id!==$||(Ge=null,Je($))};if(!V){Pe.then(E);return}E()},je=function($,E,Se,g,b){return Se!==Ce[E]?(b().catch(()=>{}),!1):($.set(g,b),!0)},dt=function(){let $=fe.getState();Be($.view==="board"),Ie($.view==="worker"),Ze(He($)),qe($.view==="board"||$.view==="worker"||Ye||!!$.selected_id)},kt=function(){let $=hr(wt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},mt=function(){let $=hr(Lt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},Be=function($){if($)for(let[E,Se]of xl){if(W.has(E)||Ee.has(E))continue;let g=E===dr?kt():{type:Se};try{De.register(E,g)}catch(te){t("register %s store failed: %o",E,te)}Ee.add(E);let b=Ce.board,A=!1;pe.subscribeList(E,g).then(te=>{A=!je(W,"board",b,E,te)}).catch(te=>{t("subscribe %s failed: %o",E,te),$e(te,"board")}).finally(()=>{Ee.delete(E),A&&dt()})}else ye()},ye=function(){Ce.board+=1;for(let[$]of xl){let E=W.get($);E&&(E().catch(()=>{}),W.delete($));try{De.unregister($)}catch(Se){t("unregister %s failed: %o",$,Se)}}},Ie=function($){if(!$){We();return}for(let[E,Se]of Mf){if(S.has(E)||Ee.has(E))continue;let g=E===ur?mt():{type:Se};try{De.register(E,g)}catch(te){t("register %s store failed: %o",E,te)}Ee.add(E);let b=Ce.worker,A=!1;pe.subscribeList(E,g).then(te=>{A=!je(S,"worker",b,E,te)}).catch(te=>{t("subscribe %s failed: %o",E,te),$e(te,"worker")}).finally(()=>{Ee.delete(E),A&&dt()})}},We=function(){Ce.worker+=1;for(let[$]of Mf){let E=S.get($);E&&(E().catch(()=>{}),S.delete($));try{De.unregister($)}catch(Se){t("unregister %s failed: %o",$,Se)}}},qe=function($){if(!$){et();return}K||(Re("subscribe-worker-queue",{id:Pf}).catch(E=>{t("subscribe-worker-queue failed: %o",E)}),K=()=>Re("unsubscribe-worker-queue",{id:Pf}))},et=function(){K&&(K().catch(()=>{}),K=null)},He=function($){return $.view==="monitor"||$.selected_id!=null},Ze=function($){if(!$){bt();return}Oe||(Re("subscribe-monitor-pipeline",{id:Df}).catch(E=>{t("subscribe-monitor-pipeline failed: %o",E)}),Oe=()=>Re("unsubscribe-monitor-pipeline",{id:Df}))},bt=function(){Oe&&(Oe().catch(()=>{}),Oe=null)},xt=function(){ze||(Re("subscribe-ui-order",{id:Nf}).catch($=>{t("subscribe-ui-order failed: %o",$)}),ze=()=>Re("unsubscribe-ui-order",{id:Nf}))},qt=function(){ze&&(ze().catch(()=>{}),ze=null),O.clear()},Yt=function(){it||(Re("subscribe-display-policy",{id:qf}).catch($=>{t("subscribe-display-policy failed: %o",$)}),it=()=>Re("unsubscribe-display-policy",{id:qf}))},St=function(){it&&(it().catch(()=>{}),it=null),ae.clear()},Ut=function(){It||(Re("subscribe-impl-presets",{id:Ff}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),It=()=>Re("unsubscribe-impl-presets",{id:Ff}))},Mt=function($){if(!$)return"Unknown";let E=$.split("/").filter(Boolean);return E.length>0?E[E.length-1]:"Unknown"},re=function($,E){H.open($.path,{missing_state:$.missing_state,...E?{workspace:E}:{}})};var _=$e,h=Ne,m=ct,w=y,C=je,F=dt,z=kt,se=mt,X=Be,N=ye,L=Ie,M=We,B=qe,Q=et,ne=He,D=Ze,Y=bt,U=xt,Z=qt,Ae=Yt,he=St,ce=Ut,q=Mt,be=re;let xe=document.getElementById("header-loading"),x=_c(xe),oe=op(e),de=If(),Re=x.wrapSend(($,E)=>de.send($,E)),pe=ac(Re),De=lc(),lt=uc(),ot=jl(),O=cc(),ae=ql(),le=Fl(),ie=Bl();de.on("impl-presets-snapshot",$=>{let E=$;E&&typeof E.revision=="number"&&Array.isArray(E.presets)&&le.set({revision:E.revision,presets:E.presets})}),de.on("monitor-pipeline-snapshot",$=>{let E=$;if(!(!E||!Array.isArray(E.workspaces)))try{ot.set(E.workspaces,E.workspaces_state,E.cross_lanes)}catch{}}),de.on("ui-order-snapshot",$=>{let E=$;if(E&&typeof E.revision=="number")try{O.set({revision:E.revision,order:E.order&&typeof E.order=="object"?E.order:{}})}catch{}}),de.on("display-policy-snapshot",$=>{let E=$;if(E&&E.policy&&typeof E.policy=="object")try{ae.set(E.policy)}catch{}}),de.on("session-log-snapshot",$=>{let E=$;if(E&&typeof E.id=="string")try{ie.set(E.id,Array.isArray(E.lines)?E.lines:[],typeof E.last_event_at=="number"?E.last_event_at:null)}catch{}}),de.on("session-log-append",$=>{let E=$;if(E&&typeof E.id=="string")try{ie.append(E.id,E.event)}catch{}}),de.on("snapshot",$=>{let E=$,Se=E&&typeof E.id=="string"?E.id:"",g=Se?De.getStore(Se):null;if(g&&E&&E.type==="snapshot")try{g.applyPush(E)}catch{}}),de.on("upsert",$=>{let E=$,Se=E&&typeof E.id=="string"?E.id:"",g=Se?De.getStore(Se):null;if(g&&E&&E.type==="upsert")try{g.applyPush(E)}catch{}}),de.on("delete",$=>{let E=$,Se=E&&typeof E.id=="string"?E.id:"",g=Se?De.getStore(Se):null;if(g&&E&&E.type==="delete")try{g.applyPush(E)}catch{}});let ke=null,ue=null,Fe=null,Ge=null,Qe=()=>{},Pe=new Promise($=>{Qe=()=>$(void 0)}),V=!1,j=!1;async function Je($){let E=Ne($);if(E===ue||E===Fe)return;Fe=E;let Se=`detail:${$}`,g={type:"issue-detail",params:{id:$}};try{De.register(Se,g)}catch(b){t("register detail store failed: %o",b)}try{let b=await pe.subscribeList(Se,g);if(fe.getState().selected_id!==$||Ne($)!==E){await b().catch(()=>{});return}ke&&await ke().catch(()=>{}),ke=b,ue=E}catch(b){t("detail subscribe failed: %o",b),$e(b,"issue details")}finally{Fe===E&&(Fe=null)}}let W=new Map,Ee=new Set,Ce={board:0,worker:0},Ye=!1,wt=ps;try{let $=window.localStorage.getItem(jf);Gi($)&&(wt=$)}catch{}let Lt="today";try{let $=window.localStorage.getItem(Fv);$!==null&&(Lt=On($))}catch{}async function I($){if(!Gi($)||$===wt)return;wt=$;try{window.localStorage.setItem(jf,$)}catch{}let E=W.get(dr);if(!E)return;W.delete(dr),await E().catch(()=>{});let Se=kt();try{De.register(dr,Se)}catch(g){t("register %s store failed: %o",dr,g)}try{let g=await pe.subscribeList(dr,Se);W.set(dr,g)}catch(g){t("re-subscribe %s failed: %o",dr,g),$e(g,"board")}}async function J($){let E=On($);if(E===Lt)return;Lt=E;let Se=S.get(ur);if(!Se)return;S.delete(ur),await Se().catch(()=>{});let g=mt();try{De.register(ur,g)}catch(b){t("register %s store failed: %o",ur,b)}try{let b=await pe.subscribeList(ur,g);S.set(ur,b)}catch(b){t("re-subscribe %s failed: %o",ur,b),$e(b,"worker")}}let S=new Map,K=null,Oe=null,ze=null,it=null,It=null;async function Vt(){it=null,ae.clear(),It=null,le.clear(),K=null,Oe=null,W.clear(),S.clear(),Ce.board+=1,Ce.worker+=1,Ut();let $=fe.getState().workspace.current?.path;if($)try{await de.send("set-workspace",{path:$})}catch(Se){t("workspace restore after reconnect failed: %o",Se);return}Yt();let E=fe.getState();Be(E.view==="board"),Ie(E.view==="worker"),Ze(He(E)),qe(E.view==="board"||E.view==="worker"||!!E.selected_id)}async function Jt(){t("clearing all subscriptions for workspace switch"),ye(),We(),et(),lt.clear(),qt(),xt(),St(),Yt(),ct();let $=fe.getState();if($.selected_id)try{De.unregister(`detail:${$.selected_id}`)}catch{}let E=fe.getState();Be(E.view==="board"),Ie(E.view==="worker"),Ze(He(E)),qe(E.view==="board"||E.view==="worker"||!!E.selected_id),E.selected_id&&y(E.selected_id)}async function Wt($){t("requesting workspace switch to %s",$),j=!0;try{let E=await de.send("set-workspace",{path:$});t("workspace switch result: %o",E),E&&E.workspace&&(fe.setState({workspace:{current:{path:E.workspace.root_dir,database:E.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),E.changed&&(await Jt(),ge("Switched to "+Mt($),"success",2e3)))}catch(E){throw t("workspace switch failed: %o",E),ge("Failed to switch workspace","error",3e3),E}finally{j=!1}}async function Dt($){t("requesting workspace git pull for %s",$);try{let E=await de.send("git-pull-workspace",{});t("workspace git pull result: %o",E);let Se=E?.status;if(Se==="up_to_date"){ge("Already up to date","success",2e3);return}if(Se==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Mt($),"success",2e3)}catch(E){t("workspace git pull failed: %o",E);let Se=E?.code,g=E?.message;if(Se==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Se==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Se==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let b=g?`: ${g}`:"";throw ge(`Git pull failed${b}`,"error",3e3),E}}async function un($,E){t("setting workspace visibility %s \u2192 %s",$,String(E));try{await de.send("set-workspace-visibility",{path:$,visible:E}),await Gt()}catch(Se){t("workspace visibility update failed: %o",Se),ge("Failed to update project visibility","error",3e3)}}async function Gt(){try{let $=await de.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let E=$.workspaces.map(A=>({path:A.path,database:A.database,pid:A.pid,version:A.version})),Se=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,g=Array.isArray($.hidden)?$.hidden.filter(A=>typeof A=="string"):[];fe.setState({workspace:{current:Se,available:E,hidden:g}});let b=window.localStorage.getItem("beads-ui.workspace");b&&(!E.some(te=>te.path===b)||g.includes(b)?window.localStorage.removeItem("beads-ui.workspace"):Se&&b!==Se.path&&(t("restoring saved workspace preference: %s",b),await Wt(b)))}}catch($){t("failed to load workspaces: %o",$)}}de.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(fe.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),Gt(),Jt())});let Ft=!1;if(typeof de.onConnection=="function"){let $=E=>{t("ws state %s",E),E==="reconnecting"||E==="closed"?(Ft=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):E==="open"&&Ft&&(Ft=!1,ge("Reconnected","success",2200),qv(fe,(Se,g)=>{t(`${Se}: %o`,g)}),Vt())};de.onConnection($)}let $t="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&($t=$)}catch($){t("view parse error: %o",$)}let fe=fc({config:Nv(),view:$t});de.on("worker-queue-snapshot",$=>{let E=$;if(!E||!E.queue)return;let Se=fe.getState().workspace.current?.path;if(typeof Se=="string"&&Se.length>0&&E.root_dir!==Se){t("dropping worker-queue snapshot for %s",String(E.root_dir));return}try{lt.set(E.queue)}catch{}});let T=dc(fe);T.start();let ee=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async($,E)=>{try{return await Re($,E)}catch(Se){if(ee.has($))throw Se;return[]}};Ip({global_element:r,repo_element:o},fe,T);let p=document.getElementById("workspace-picker");p&&Rf(p,fe,Wt,Dt,un);let f=Np(e,($,E)=>Re($,E));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>f.open())}catch{}let k=Bp(e,{policyStore:ae,queueStore:lt,implPresetStore:le,transport:($,E)=>Re($,E),onOpenChange:$=>{let E=Ye;Ye=$,dt(),E&&$===!1&&we.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[E]of xl)for(let Se of De.snapshotFor(E)||[]){let g=Se.labels;if(Array.isArray(g))for(let b of g)typeof b=="string"&&b.length>0&&$.add(b)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>k.open()))}catch{}let R=document.createElement("div");R.className="md-viewer-root",document.body.appendChild(R);let H=Ai(R,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),_e=Rc(l,{gotoIssue:$=>T.gotoIssue($),issueStores:De,transport:Le,workerQueueStore:lt,uiOrderStore:O,displayPolicyStore:ae,closedRange:wt,onClosedRangeChange:$=>{I($)},onNewIssue:()=>f.open(),openDoc:re}),we=wl(a,{transport:Le,issueStores:De,queueStore:lt,sessionLogStore:ie,gotoIssue:$=>fe.setState({selected_id:$}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:$=>Wt($),openDoc:re,doneRange:Lt,onDoneRangeChange:$=>{J($)}}),Ue=Lp(u,{transport:Le,pipelineStore:ot,execPresetStore:le,sessionLogStore:ie,router:T,gotoIssue:$=>T.gotoIssue($),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:$=>Wt($),openDoc:re}),ft=rp(d,{issueStores:De,transport:Le,queueStore:lt,execPresetStore:le,sessionLogStore:ie,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:H,depCandidates:()=>{let $=ot.get();if($===null)return null;let E=ot.getWorkspacesState(),Se=fe.getState();if(Se.view==="monitor")return Pa($,E);let g=Se.workspace.current?.path;return g?Pa($,E,{root_dir:g}):null},subscribeCandidates:$=>ot.subscribe($),onDepChanged:({type:$,a:E,b:Se})=>{let g=Ue;$==="dep-add"&&g&&typeof g.recorrectSharedLane=="function"&&g.recorrectSharedLane($,E,Se)},onNavigate:($,E)=>{let Se=()=>{fe.getState().view==="worker"?fe.setState({selected_id:$}):T.gotoIssue($)},g=fe.getState().workspace.current?.path;if(typeof E!="string"||E.length===0||!g||E===g){Se();return}Promise.resolve(Wt(E)).then(Se).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let $=fe.getState();fe.setState({selected_id:null});try{T.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{k.open("execution")}}),_t=fe.getState().selected_id;_t&&(d.hidden=!1,ft.load(_t),y(_t)),fe.subscribe($=>{let E=$.selected_id;E?(d.hidden=!1,ft.load(E),j||y(E)):(ft.clear(),d.hidden=!0,ct())});let en=$=>{l.hidden=$.view!=="board",a.hidden=$.view!=="worker",u.hidden=$.view!=="monitor",s&&s.classList.toggle("is-quiet",$.view==="monitor"),Be($.view==="board"),Ie($.view==="worker"),Ze(He($)),qe($.view==="board"||$.view==="worker"||Ye||!!$.selected_id),!$.selected_id&&$.view==="board"&&_e.load(),$.view==="worker"&&we.load(),$.view==="monitor"?Ue.load():Ue.pause(),window.localStorage.setItem("beads-ui.view",$.view)};fe.subscribe(en),en(fe.getState()),xt(),Yt(),Ut(),Gt().finally(()=>{V=!0,Qe()}),window.addEventListener("keydown",$=>{let E=$.ctrlKey||$.metaKey,Se=String($.key||"").toLowerCase(),g=$.target,b=g&&g.tagName?String(g.tagName).toLowerCase():"",A=b==="input"||b==="textarea"||b==="select"||g&&typeof g.isContentEditable=="boolean"&&g.isContentEditable;E&&Se==="n"&&(A||($.preventDefault(),f.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Uv(t)});export{Uv as bootstrap,Nv as readBootstrapConfig,qv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
