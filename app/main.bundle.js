var zf=Object.create;var Fi=Object.defineProperty;var Hf=Object.getOwnPropertyDescriptor;var Gf=Object.getOwnPropertyNames;var Kf=Object.getPrototypeOf,Yf=Object.prototype.hasOwnProperty;var Vf=(e,t,n)=>t in e?Fi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ji=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Xf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Gf(t))!Yf.call(e,o)&&o!==n&&Fi(e,o,{get:()=>t[o],enumerable:!(r=Hf(t,o))||r.enumerable});return e};var Qf=(e,t,n)=>(n=e!=null?zf(Kf(e)):{},Xf(t||!e||!e.__esModule?Fi(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>Vf(e,typeof t!="symbol"?t+"":t,n);var Wl=ji((Vv,Ul)=>{var Lr=1e3,Ir=Lr*60,Mr=Ir*60,br=Mr*24,e_=br*7,t_=br*365.25;Ul.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return n_(e);if(n==="number"&&isFinite(e))return t.long?o_(e):r_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function n_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*t_;case"weeks":case"week":case"w":return n*e_;case"days":case"day":case"d":return n*br;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Mr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ir;case"seconds":case"second":case"secs":case"sec":case"s":return n*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r_(e){var t=Math.abs(e);return t>=br?Math.round(e/br)+"d":t>=Mr?Math.round(e/Mr)+"h":t>=Ir?Math.round(e/Ir)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function o_(e){var t=Math.abs(e);return t>=br?fs(e,t,br,"day"):t>=Mr?fs(e,t,Mr,"hour"):t>=Ir?fs(e,t,Ir,"minute"):t>=Lr?fs(e,t,Lr,"second"):e+" ms"}function fs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Hl=ji((Xv,zl)=>{function s_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Wl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,m,w;function C(...F){if(!C.enabled)return;let H=C,se=Number(new Date),V=se-(_||se);H.diff=V,H.prev=_,H.curr=se,_=se,F[0]=n.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(M,B)=>{if(M==="%%")return"%";N++;let X=n.formatters[B];if(typeof X=="function"){let ne=F[N];M=X.call(H,ne),F.splice(N,1),N--}return M}),n.formatArgs.call(H,F),(H.log||n.log).apply(H,F)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,w=n.enabled(d)),w),set:F=>{h=F}}),typeof n.init=="function"&&n.init(C),C}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,_){let h=0,m=0,w=-1,C=0;for(;h<d.length;)if(m<_.length&&(_[m]===d[h]||_[m]==="*"))_[m]==="*"?(w=m,C=h,m++):(h++,m++);else if(w!==-1)m=w+1,C++,h=C;else return!1;for(;m<_.length&&_[m]==="*";)m++;return m===_.length}function i(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function l(d){for(let _ of n.skips)if(s(d,_))return!1;for(let _ of n.names)if(s(d,_))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}zl.exports=s_});var Gl=ji((pn,_s)=>{pn.formatArgs=a_;pn.save=l_;pn.load=c_;pn.useColors=i_;pn.storage=u_();pn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();pn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function i_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function a_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+_s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}pn.log=console.debug||console.log||(()=>{});function l_(e){try{e?pn.storage.setItem("debug",e):pn.storage.removeItem("debug")}catch{}}function c_(){let e;try{e=pn.storage.getItem("debug")||pn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function u_(){try{return localStorage}catch{}}_s.exports=Hl()(pn);var{formatters:d_}=_s.exports;d_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var lo=globalThis,is=lo.trustedTypes,Sl=is?is.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ui="$lit$",jn=`lit$${Math.random().toFixed(9).slice(2)}$`,Wi="?"+jn,Zf=`<${Wi}>`,_r=document,co=()=>_r.createComment(""),uo=e=>e===null||typeof e!="object"&&typeof e!="function",zi=Array.isArray,Ll=e=>zi(e)||typeof e?.[Symbol.iterator]=="function",Bi=`[ 	
\f\r]`,ao=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,El=/-->/g,Tl=/>/g,pr=RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Cl=/'/g,Rl=/"/g,Il=/^(?:script|style|textarea|title)$/i,Hi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Hi(1),fo=Hi(2),Uv=Hi(3),yn=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),Ol=new WeakMap,fr=_r.createTreeWalker(_r,129);function Ml(e,t){if(!zi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sl!==void 0?Sl.createHTML(t):t}var Dl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=ao;for(let l=0;l<n;l++){let a=e[l],u,d,_=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===ao?d[1]==="!--"?i=El:d[1]!==void 0?i=Tl:d[2]!==void 0?(Il.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=pr):d[3]!==void 0&&(i=pr):i===pr?d[0]===">"?(i=o??ao,_=-1):d[1]===void 0?_=-2:(_=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?pr:d[3]==='"'?Rl:Cl):i===Rl||i===Cl?i=pr:i===El||i===Tl?i=ao:(i=pr,o=void 0);let m=i===pr&&e[l+1].startsWith("/>")?" ":"";s+=i===ao?a+Zf:_>=0?(r.push(u),a.slice(0,_)+Ui+a.slice(_)+jn+m):a+jn+(_===-2?l:m)}return[Ml(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},po=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Dl(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(o=fr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let _ of o.getAttributeNames())if(_.endsWith(Ui)){let h=d[i++],m=o.getAttribute(_).split(jn),w=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:w[2],strings:m,ctor:w[1]==="."?ls:w[1]==="?"?cs:w[1]==="@"?us:gr}),o.removeAttribute(_)}else _.startsWith(jn)&&(a.push({type:6,index:s}),o.removeAttribute(_));if(Il.test(o.tagName)){let _=o.textContent.split(jn),h=_.length-1;if(h>0){o.textContent=is?is.emptyScript:"";for(let m=0;m<h;m++)o.append(_[m],co()),fr.nextNode(),a.push({type:2,index:++s});o.append(_[h],co())}}}else if(o.nodeType===8)if(o.data===Wi)a.push({type:2,index:s});else{let _=-1;for(;(_=o.data.indexOf(jn,_+1))!==-1;)a.push({type:7,index:s}),_+=jn.length-1}s++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=uo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=mr(e,o._$AS(e,t.values),o,r)),t}var as=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=o;let s=fr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Rr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ds(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=fr.nextNode(),i++)}return fr.currentNode=_r,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Rr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),uo(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ll(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&uo(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=po.createElement(Ml(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new as(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Ol.get(t.strings);return n===void 0&&Ol.set(t.strings,n=new po(t)),n}k(t){zi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(co()),this.O(co()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ot}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=mr(this,t,n,0),i=!uo(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=mr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!uo(u)||u!==this._$AH[a]),u===Ot?t=Ot:t!==Ot&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ls=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},cs=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},us=class extends gr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Ot)===yn)return;let r=this._$AH,o=t===Ot&&r!==Ot||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Ot&&(r===Ot||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ds=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},Pl={M:Ui,P:jn,A:Wi,C:1,L:Dl,R:as,D:Ll,V:mr,I:Rr,H:gr,N:cs,U:us,B:ls,F:ds},Jf=lo.litHtmlPolyfillSupport;Jf?.(po,Rr),(lo.litHtmlVersions??(lo.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Rr(t.insertBefore(co(),s),s,void 0,n??{})}return o._$AI(e),o};var ps="today",Nl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Rn(e){return e==="today"?"today":"7d"}function Gi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function hr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ql(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function jl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Bl(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Kl=Qf(Gl(),1);function Rt(e){return(0,Kl.default)(`beads-ui:${e}`)}function p_(e){let n=Yl((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Yl(e){return typeof e=="string"?e.trim():""}function f_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var __=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Dr(e){let t=p_(e),n=Yl(f_(e).spec_review),r=__.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function kn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _o(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ec(e,t){let n=kn(e.created_at),r=kn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function tc(e,t){let n=kn(e.updated_at),r=kn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function nc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=kn(e.created_at),s=kn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function rc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var ms=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function m_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(ms,e)}function Yi(e){if(!e||typeof e!="object")return!1;let t=e;return m_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Vl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Xl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Dr(e).evidence==="published"?1:0;case"created":return Vl(e.created_at);case"updated":return Vl(e.updated_at);default:return null}}function Ql(e,t,n){let r=Xl(e,n.key),o=Xl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function oc(e){let t=Array.isArray(e)?e.filter(Yi):[];return(n,r)=>{for(let l of t){let a=Ql(n,r,l);if(a!==0)return a}let o=Ql(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var g_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Zl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Jl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=g_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function sc(e,t){let n=Zl(e),r=Zl(t);if(n!==r)return n<r?-1:1;let o=Jl(e),s=Jl(t);if(o!==s)return o<s?-1:1;let i=kn(e&&e.created_at),l=kn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ki=2**20;function Pr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-kn(e&&e.created_at)}function ic(e){return(t,n)=>{let r=Pr(t,e),o=Pr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Vi(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Pr(l,n)-Ki};if(!l)return{rank:Pr(i,n)+Ki};let a=Pr(i,n),u=Pr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ki}))}}function Xi(e,t={}){let n=Rt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||_o;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function _(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let w=Array.isArray(h.issues)?h.issues:[];for(let C of w)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=m,u();return}if(h.type==="upsert"){let w=h.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let C=r.get(w.id);if(!C)r.set(w.id,w);else{let F=Number.isFinite(C.updated_at)?C.updated_at:0,H=Number.isFinite(w.updated_at)?w.updated_at:0;if(F<=H){for(let se of Object.keys(C))se in w||delete C[se];for(let[se,V]of Object.entries(w))C[se]=V}}d()}s=m,u()}else if(h.type==="delete"){let w=String(h.issue_id||"");w&&(r.delete(w),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:_,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function gs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ac(e){let t=Rt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let w=n.get(m);if(!w)continue;let C=w.itemsById;for(let F of d)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of _)typeof F=="string"&&F.length>0&&C.set(F,!0);for(let F of h)typeof F=="string"&&F.length>0&&C.delete(F)}}async function s(l,a){let u=gs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:gs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function lc(){let e=Rt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let _=u?gs(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,h),m&&h&&_&&h!==_){let w=t.get(a);if(w)try{w.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let F=Xi(a,d);t.set(a,F);let H=F.subscribe(()=>s());o.set(a,H)}else if(!m){let w=Xi(a,d);t.set(a,w);let C=w.subscribe(()=>s());o.set(a,C)}return n.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function uc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Qi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function h_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function b_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function dc(e){let t=Rt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):h_(r),i=b_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Qi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Qi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var y_=Object.freeze({workspace_config:{default_workspace:null}});function pc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:y_.workspace_config.default_workspace}}}function fc(e={}){let t=Rt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:pc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?pc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _c(e){let t=Rt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(_,h)=>{let m=o++,w=Date.now();r.set(m,{type:_,start_ts:w}),t("request start id=%d type=%s count=%d",m,_,n+1),i();let C=!1,F=()=>{C||(C=!0,r.delete(m),l())},H=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,_,Date.now()-w),F())},3e4);try{let se=await u(_,h),V=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",m,_,V),se}catch(se){let V=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,_,V,se),se}finally{clearTimeout(H),F()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function he(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Nr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(rc),a;switch(l){case"created_desc":return a.sort(_o),a;case"created_asc":return a.sort(ec),a;case"updated_desc":return a.sort(tc),a;case"priority":return a.sort(nc),a;case"manual":default:{let u=n();return u?a.sort(ic(u)):a.sort(_o),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function er(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function zt(e){let t=er(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=er(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function mc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=er(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bs(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ys(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=mc(n);return{total:n.length,count:r,current:o,children:n}}function gc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Vi(l,a,u.order),i);o(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let m=r(Vi(l,a,h.order),i);o(h,m);let w=await t("ui-order-set",{expected_revision:h.revision,entries:m});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:s}}function hc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Bn(e,t){let n=hc(e),r=hc(t);return n.length===0||r.length===0?!1:n!==r}function vs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zi(e,t){return!t||typeof e!="string"||e.length===0||vs(t.visible_labels).includes(e)?!0:vs(t.hidden_labels).includes(e)?!1:!vs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function bc(e,t){return vs(e).filter(n=>Zi(n,t))}function tr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function v_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function w_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function k_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${v_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function ws(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(sc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?w_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>k_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var $_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},yc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},x_={review:"\u2713",skip:"\u2298"},nr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function A_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function wc(e){let t=e&&e.fill||"none";return t==="none"?nr.none:e&&e.stale===!0?nr.stale:t==="dim"?nr.dim:e&&e.glyph==="review"?nr.review:e&&e.glyph==="skip"?nr.skip:nr.done}function S_(e){if(!e||e.fill==="none"||!e.approval_state)return wc(e);let t=[];return e.glyph==="review"?t.push(nr.review):e.glyph==="skip"&&t.push(nr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function E_(e,t,n,r){let o=$_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=x_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",_=vc[e]||e,h=r?kc(t):null;if(!h)return c`
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
  `}function kc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ks(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=yc[e.route]||yc.spec_backed,s=e.stages,i=A_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${vc[u]||u} ${u==="plan"?S_(s[u]||{}):wc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>kc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>E_(u,s[u]||{},u===i,r))}
    </div>
  `}function T_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var $c=2;function xc(e){let t=e.slice(0,$c).join(", "),n=e.length-$c;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function C_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Bn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${xc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${xc(s)}</span
      >`),n}function R_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ji(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function $s(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Un(e){return`${e.kind}:${$s(e)}@${e.sha}`}function xs(e,t){if(!e)return null;let n=Ji(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=Ji(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Un(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Ac(e,t){let n=xs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function O_(e){if(!e)return null;let t=Ji(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Un(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function L_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&tr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&tr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&tr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Ac(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(l)}`}
        >${`exec ${l.kind==="delegated"?$s(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of bc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&tr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),tr(n,"blocked")){let l=R_(e.metadata);l&&o.push(l),o.push(...C_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&tr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function I_(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function M_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return ws(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:I_(e),empty_label:"children \uC5C6\uC74C",childChips:ea,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ea(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return xs(t,n)?c`<span class="board-card__roll-child-chips">
    ${Ac(t,n)}
    ${O_(n)}
  </span>`:null}function As(e,t){let n=T_(e.priority);return c`
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
      ${L_(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?ks(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${M_(e,t)}
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
  `}var D_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],P_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],N_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function q_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${D_.map(r=>c`<option
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
        ${P_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${q_(e,t,n)}
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
        ${N_.map(r=>c`<option
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
  `}var F_=200,j_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},B_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Tc="beads-ui.board.sort",Cc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function U_(){try{let e=window.localStorage.getItem(Tc);if(e&&Cc.has(e))return e}catch{}return"created_desc"}function Rc(e,t){let n=Rt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||ps,m=o?Nr(o,i):null,w=gc({transport:s,uiOrderStore:i}),C=[],F=[],H=[],se=[],V=[],N=[],L=!1,M=0,B=U_(),X=new Map,ne=new Map,P=new Map,K=new Set,U={search:"",priority:"",type:"",labels:[]},Q=!1,Se=null;function be(T){return String(T.status||"open")==="open"}function ce(T){return String(T.status||"open")==="open"}function q(T){let G=U.search.trim().toLowerCase(),Ie=U.priority,Ue=U.type,qe=U.labels;return T.filter(Je=>{if(G){let Ce=String(Je.id||"").toLowerCase(),ze=String(Je.title||"").toLowerCase();if(!Ce.includes(G)&&!ze.includes(G))return!1}if(Ie!==""&&String(Je.priority)!==Ie||Ue!==""&&String(Je.issue_type||"")!==Ue)return!1;if(qe.length>0){let Ce=Array.isArray(Je.labels)?Je.labels:[];if(!qe.some(ze=>Ce.includes(ze)))return!1}return!0})}function ye(){let T=new Set;for(let G of[C,F,H,se,V,N])for(let Ie of G){let Ue=Array.isArray(Ie.labels)?Ie.labels:[];for(let qe of Ue)typeof qe=="string"&&qe.length>0&&T.add(qe)}return Array.from(T).sort()}function xe(){return U.search.trim()!==""||U.priority!==""||U.type!==""||U.labels.length>0}function x(){try{if(m){let T=m.selectBoardColumn("tab:board:in-progress","in_progress",B),G=m.selectBoardColumn("tab:board:blocked","blocked",B).filter(ce),Ie=new Set(T.map(We=>We.id)),Ue=m.selectBoardColumn("tab:board:ready","ready",B).filter(We=>be(We)&&!Ie.has(We.id)),qe=m.selectBoardColumn("tab:board:resolved","resolved",B),Je=m.selectBoardColumn("tab:board:deferred","deferred",B),Ce=m.selectBoardColumn("tab:board:closed","closed").slice(0,F_),ze=[...G,...Ue,...T,...qe,...Ce];oe(ze);let et=new Set;for(let We of ze)We&&We.id&&!hs(We)&&et.add(We.id);let bt=!xe();C=bt?mo(G,et):G,F=bt?mo(Ue,et):Ue,H=bt?mo(T,et):T,se=bt?mo(qe,et):qe,V=Je,M=Je.length,N=bt?mo(Ce,et):Ce,X=new Map;for(let We of C)X.set(We.id,"open");for(let We of F)X.set(We.id,"open");for(let We of H)X.set(We.id,"in_progress");for(let We of se)X.set(We.id,"resolved");for(let We of V)X.set(We.id,"deferred");for(let We of N)X.set(We.id,"closed");ne=new Map;for(let We of C)ne.set(We.id,"blocked-col");for(let We of F)ne.set(We.id,"ready-col");for(let We of H)ne.set(We.id,"in-progress-col");for(let We of se)ne.set(We.id,"resolved-col");for(let We of N)ne.set(We.id,"closed-col")}je()}catch{C=[],F=[],H=[],se=[],V=[],N=[],P=new Map,je()}}function oe(T){P=bs(T)}function $e(T){return ys(P,T)}function de(T){return!K.has(T)}function Oe(T,G){T.preventDefault(),T.stopPropagation(),K.has(G)?K.delete(G):K.add(G),je()}function pe(T,G){T.preventDefault(),T.stopPropagation(),r(G)}function De(T,G){T.preventDefault(),T.stopPropagation(),r(G)}function lt(T,G){Se||r(G)}function ot(T,G){T.preventDefault(),T.stopPropagation(),W_(G).then(Ie=>{Ie&&he("\uBCF5\uC0AC\uB428","success",1200)})}function O(T,G){Se=G,T.dataTransfer&&(T.dataTransfer.setData("text/plain",G),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function ae(T){T.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{Se=null},0)}function le(T){let G=String(T.target.value||"");!G||G===h||(h=G,u&&u(G),je())}function ie(){return l?l.get():null}function we(T){let G=a?a.get():null,Ie=G?G.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let Ue=Ie[T];return!Ue||typeof Ue!="object"||Array.isArray(Ue)?null:Ue}let ue={onCardClick:lt,onCopyId:ot,onDragStart:O,onDragEnd:ae,onClosedRangeChange:le,rollupFor:$e,isExpanded:de,onRollupToggle:Oe,onChildClick:pe,onFromChipClick:De,onOpenDoc:_?(T,G)=>_(G):void 0,cleanupFailureFor:we,get policy(){return ie()}};function Fe(T,G){Se||(y(),r(G))}function He(T,G){T.preventDefault(),T.stopPropagation(),y(),r(G)}let Qe={...ue,onCardClick:Fe,onChildClick:He,onFromChipClick:He,onOpenDoc:_?(T,G)=>{y(),_(G)}:void 0,get policy(){return ie()}};function Pe(T){let G=T.target,Ie=e.querySelector(".board-filter__labels");G&&Ie&&Ie.contains(G)||Ne()}function Y(T){T.key==="Escape"&&Ne()}function j(){Q||(Q=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",Y),je())}function Ne(){Q&&(Q=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",Y),je())}function ct(T){T.key==="Escape"&&y()}function Ze(){L||(L=!0,document.addEventListener("keydown",ct),je())}function y(){L&&(L=!1,document.removeEventListener("keydown",ct),je())}let W={onClose:y,onOverlayClick(T){T.target===T.currentTarget&&y()}},Te={onSearchInput(T){U.search=String(T.target.value||""),x()},onPriorityChange(T){U.priority=String(T.target.value||""),x()},onTypeChange(T){U.type=String(T.target.value||""),x()},onSortChange(T){let G=String(T.target.value||"");if(!(!Cc.has(G)||G===B)){B=G;try{window.localStorage.setItem(Tc,G)}catch{}x()}},onDeferredToggle(){L?y():Ze()},onLabelMenuToggle(){Q?Ne():j()},onLabelToggle(T){let G=U.labels.indexOf(T);G===-1?U.labels.push(T):U.labels.splice(G,1),x()},onLabelClear(){U.labels.length!==0&&(U.labels=[],x())},onNewIssue(){d&&d()}};function Re(){return c`
      <div class="board-view">
        ${Ec(U,Te,{sort_mode:B,deferred_popup_open:L,deferred_count:M,label_options:ye(),label_menu_open:Q})}
        <div class="board-root">
          ${qr({title:"Blocked",id:"blocked-col",items:q(C)},ue)}
          ${qr({title:"Ready",id:"ready-col",items:q(F)},ue)}
          ${qr({title:"In progress",id:"in-progress-col",items:q(H)},ue)}
          ${qr({title:"Resolved",id:"resolved-col",items:q(se)},ue)}
          ${qr({title:"Closed",id:"closed-col",items:q(N),is_closed:!0,closed_range:h},ue)}
        </div>
        ${L?Sc({items:q(V),count:M},Qe,W):""}
      </div>
    `}function je(){rt(Re(),e),Ke()}function Ke(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of G)Array.from(Ie.querySelectorAll(".board-card")).forEach((qe,Je)=>{qe.tabIndex=Je===0?0:-1})}catch{}}async function dt(T,G){if(!s){he("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:T,status:G}),he("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),he("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function vt(T){switch(T){case"blocked-col":return C;case"ready-col":return F;case"in-progress-col":return H;case"resolved-col":return se;default:return[]}}function It(T,G,Ie){if(!s||!i)return;let Ue=vt(T),qe=Ue.find(bt=>bt.id===G);if(!qe)return;let Je=Ue.filter(bt=>bt.id!==G),Ce=Ie.closest?Ie.closest(".board-card"):null,ze=Je.length;if(Ce){let bt=Ce.getAttribute("data-issue-id");if(bt===G)return;let We=Je.findIndex(xt=>xt.id===bt);We>=0&&(ze=We)}let et=Je.slice();et.splice(ze,0,qe),w.applyReorder(G,et,ze)}function wt(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Ie=T.target.closest(".board-column");Ie&&Ie!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),mt=Ie)}),e.addEventListener("dragleave",T=>{let G=T.relatedTarget;(!G||!e.contains(G))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",T=>{T.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let G=T.target,Ie=G.closest(".board-column");if(!Ie)return;let Ue=T.dataTransfer?.getData("text/plain")||"";if(!Ue)return;let qe=Ie.id,Je=ne.get(Ue);if(Je&&Je===qe){if(B_.has(qe)){if(B!=="manual"){he("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}It(qe,Ue,G)}return}let Ce=j_[qe];if(!Ce){he("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(Ue)!==Ce&&dt(Ue,Ce)}),e.addEventListener("keydown",T=>{let G=T.target;if(!(G instanceof HTMLElement))return;let Ie=String(G.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||G.isContentEditable===!0)return;let Ue=G.closest(".board-card");if(!Ue)return;let qe=String(T.key||"");if(qe==="Enter"||qe===" "){T.preventDefault();let et=Ue.getAttribute("data-issue-id");et&&r(et);return}if(qe!=="ArrowUp"&&qe!=="ArrowDown"&&qe!=="ArrowLeft"&&qe!=="ArrowRight")return;T.preventDefault();let Je=Ue.closest(".board-column");if(!Je)return;let Ce=Array.from(Je.querySelectorAll(".board-card")),ze=Ce.indexOf(Ue);if(qe==="ArrowDown"&&ze<Ce.length-1){Be(Ue,Ce[ze+1]);return}if(qe==="ArrowUp"&&ze>0){Be(Ue,Ce[ze-1]);return}if(qe==="ArrowLeft"||qe==="ArrowRight"){let et=Array.from(e.querySelectorAll(".board-column")),bt=et.indexOf(Je),We=qe==="ArrowRight"?1:-1,xt=bt+We;for(;xt>=0&&xt<et.length;){let Ft=et[xt].querySelector(".board-card");if(Ft){Be(Ue,Ft);return}xt+=We}}});function Be(T,G){try{T.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let I=null;m&&m.subscribe&&(I=m.subscribe(()=>{try{x()}catch{}}));let ee=null;l&&l.subscribe&&(ee=l.subscribe(()=>{try{x()}catch{}}));let ge=null;return a&&a.subscribe&&(ge=a.subscribe(()=>{je()})),{async load(){n("load"),x()},clear(){Ne(),y(),I&&(I(),I=null),ee&&(ee(),ee=null),ge&&(ge(),ge=null),e.replaceChildren(),C=[],F=[],H=[],se=[],V=[],N=[],X=new Map,ne=new Map}}}function mo(e,t){return e.filter(n=>{let r=hs(n);return!(r&&t.has(r))})}async function W_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var tn=e=>e??Ot;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function yr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function go(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function z_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${yr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${yr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Wn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await z_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var H_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Oc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},G_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Bt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Lt(e){return typeof e=="string"&&e.length>0?e:null}function Fr(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Ic(e,t,n){let r=Lt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Lt(n[e]);return o===null?null:{value:o,source:"global"}}function ho(e,t,n,r){return Ic(e,t,n)||{value:r,source:"base"}}function ta(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Bt(o?.[t])){let i=Lt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Bt(o)){for(let i of Object.values(o))if(Bt(i)){let l=Lt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Lt(r?.runners?.[s]?.models?.[e]?.id)||e}function K_(e,t){return Lt(t?.review?.reviewers?.[e]?.model)||e}function jr(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Fr(e):e;return Tt(e,t,r,e,"explicit")}function Mc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Bt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Bt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Y_(e,t){let n=[],r=e?.implementation?.model_catalog;Bt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Bt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function V_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Y_(t,n)){let s=Mc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function na(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Lc(e,t,n){let r=Ic(e,t,n);return r?jr(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function _n(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Bt(r.session)?r.session:null,s=r?.supported===!0&&Bt(r.orchestration)?r.orchestration:null,i=Bt(e.runner_catalog)?e.runner_catalog:null,l=Lt(n.quick_fix_impl_model),a=V_(l,o,i),u={};if(o){let d=ho("workflow_mode",t,n,Lt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):jr(d.value,d.source);for(let V of["spec_review","plan_review","impl_review"]){let N=`${V}_model`,L=Lt(V==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=ho(N,t,n,L);if(M.value===null)u[N]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!Bt(o.review?.reviewers?.[M.value]))u[N]=na(Tt(M.value,M.source,"",null,"explicit"));else{let B=K_(M.value,o);u[N]=Tt(M.value,M.source,Fr(B),B,M.source==="base"?"default":"explicit")}}for(let[V,N]of Object.entries(Oc)){let L=u[N].value;if(L==="self"||L==="skip"){u[V]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Lt(o.review?.reviewers?.[L||""]?.effort),B=ho(V,t,n,M);u[V]=B.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let _=Bt(o.implementation?.default)?o.implementation.default:{},h=Lt(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),w=Bt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&Bt(w[h])?w[h]:{};for(let V of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=ho(V,t,n,V==="impl_dispatch"?Lt(C.dispatch)||Lt(_.dispatch):Lt(_[V.replace("impl_","")]));u[V]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let F=Lt(t.impl_runtime),H=F==="inherit"?Lt(e.controller_runtime):F,se=h==="quick_fix"&&Lt(t.impl_dispatch)===null&&a.runtime!==null&&(F===null||H===a.runtime);if(se){let V=a.runtime,N=l;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),F===null&&(u.impl_runtime=Tt(V,"global",`${V} (\uC720\uB3C4)`,V,"explicit")),Lt(t.impl_model)===null&&(u.impl_model=Tt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let V of["impl_runtime","impl_model","impl_effort","impl_speed"])u[V]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let V=u.impl_runtime.value==="inherit"?Lt(e.controller_runtime):u.impl_runtime.value,N=V?Mc(V,o,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=na(u.impl_model);else{let L=ta(u.impl_model.value,V,o,i);u.impl_model.display=Fr(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let V=Lt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=V?Lt(o.implementation?.effort_by_transport?.[V]?.auto):null;N&&!G_.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jr("default",u.impl_speed.source))}}else for(let d of H_.filter(_=>!_.startsWith("orchestration_")))u[d]=Lc(d,t,n);if(!o){for(let[d,_]of Object.entries(Oc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Lc(d,t,n);continue}let _=d.replace("orchestration_",""),h=Lt(s[_]),m=ho(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=m.source==="base"?Lt(s.model_id)||m.value:ta(m.value,null,o,i);u[d]=Tt(m.value,m.source,Fr(w),w,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):jr("default",m.source);continue}u[d]=jr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Fr(d)})`,null,"default")}else if(a.runtime!==null){let d=ta(l,a.runtime,o,i);u.quick_fix_impl_model=Tt(l,"global",Fr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=na(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=jr(l,"global");return u}function X_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ss(e){let t=Bt(e.pin)?e.pin:{},n=Bt(e.global)?e.global:{},r=Bt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=_=>{let h={...r,..._};return _n({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Lt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:X_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(_=>{let h=o({...s,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Br(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=_=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ra(e){return`session:${e.provider}:${e.session_id}`}function bo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Q_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Ur(e,t,n,r){return{attempt_id:ra(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:bo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Q_(e,n)}}}var oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Z_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Dc="\uBD84\uD574 \uC5C6\uB294 leg";function qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Ln=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Wr=[...Ln,"reasoning_output_tokens"],J_={codex:["implementation","review-consult"],claude:["subagent"]};function sa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Ln.some(t=>Number.isFinite(e[t]))}function em(e){return!e||typeof e!="object"?!1:Wr.some(t=>Number.isFinite(e[t]))}function ia(e){let t=0;for(let n of Ln)t+=qt(e?.[n]);return t}function tm(e){return!e||typeof e!="object"?!1:Ln.some(t=>Number.isFinite(e[t]))}function Pc(e){return!e||typeof e!="object"?!1:Wr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function nm(e){let t={};for(let n of Wr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Nc(e){let t={};for(let n of Wr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function qc(e,t){return sa(t)?qt(t.total_tokens):e==="codex"?qt(t.input_tokens)+qt(t.output_tokens):ia(t)}function rm(e){return e==="claude"?"Claude":"Codex"}function om(e){return`\u03C4 ${jc(e)}`}function sm(e,t){let n=t.breakdown||{},r=qt(t.total_only_subtotal);if(sa(n)||r>0&&!em(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Z_];return t.replayed&&u.push(oa),u.join(`
`)}let o=[`\uC785\uB825 ${qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${qt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Dc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Dc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(oa),a.join(`
`)}function Jt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${rm(n)} ${om(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:sm(n,r)})}return t}function Ts(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=qt(l.total_only_subtotal)+qt(i.total_only_subtotal));for(let a of Wr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=qt(l.breakdown[a])+qt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:Hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function im(e){return e==="codex"?"codex":"claude"}function On(){return{subtotal:0,breakdown:nm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Es(e,t,n){e.subtotal+=t.subtotal,sa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Wr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=qt(e.breakdown[r])+qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Fc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function jc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function zr(e){return tm(e)?`\u03C4 ${jc(ia(e))}`:null}function zn(e){let t=zr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function yo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ia(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oa),n.join(`
`)}function Hn(e,t){let n={claude:On(),codex:On()},r={orchestrator:{claude:On(),codex:On()},implementation:{claude:On(),codex:On()},"review-consult":{claude:On(),codex:On()},subagent:{claude:On(),codex:On()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Pc(a)){let d=im(l.runner),_=Nc(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:qc(d,_)};_.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Es(n[d],h,!0),Es(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!J_[_].includes(d.role)||!Pc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=Nc(d.usage),w={provider:_,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:qc(_,m)};w.receipt_id=h,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),m.replayed===!0&&(w.replayed=!0),Es(n[_],w,!1),Es(r[w.role][_],w,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Fc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Fc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var am=".chip-popover, .judgement-chip";function Hr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let _=d.target;t!==null&&(_&&typeof _.closest=="function"&&_.closest(am)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Gr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Bc={running:3,paused:2,failed:1};function Gn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Uc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Wc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Gn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Gn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),_=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!_&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Bc[u.run_state],_=Bc[l];if(d>_||d===_&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Cs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ca=[...Cs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Kn=["orchestration_model","orchestration_effort","orchestration_speed"],Kr=[...Cs,...Kn],lm=ca.filter(e=>Kr.includes(e)),zc=["delegated","main"],Rs=["inherit","claude","codex"],vo=["default","fast"],wo=["standard","fast_track"],ko=["codex","opus","fable","self","skip"],Os=["codex","fable","skip"],Ls=["low","medium","high","xhigh"],gn="auto";function mn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hc(e){if(!mn(e)||!mn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))mn(r)&&mn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Yr(e,t){let n=Hc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[gn,...r.flatMap(([,o])=>o)]}function Gc(e,t,n,r){if(!mn(e)||!mn(e.runners))return[gn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!mn(i)||!mn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==gn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[gn,...o]}function Vr(e,t,n){return Gc(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ua(e,t,n){return Gc(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function $o(e,t){let n=Hc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Kc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Yr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,o,r.impl_model||gn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var cm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},la=[...lm,...Kn],um=[...Kr,...ca].filter((e,t,n)=>n.indexOf(e)===t&&!la.includes(e));function Yc(e,t){let n=mn(e)?e:{},r=mn(t)?t:{},o=[];for(let i of la){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:cm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...um,...Object.keys(r)])!la.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function da(e,t,n,r,o,s){return Ss({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Vc(e,t){let n={};for(let r of ca){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function Xc(e,t){let n={};for(let r of Kn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var pa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Kn]}],rr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Is={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function fa(e,t,n,r,o,s=null){let i=_n({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Qc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of fa(e,t,n,r,o,s))i[l.source]+=1;return i}function Zc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Jc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Ek=[...Cs,...Kn];var eu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function xo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ms(e){if(!xo(e)||!xo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>xo(n)&&xo(n.models));return t.length>0?t:null}function $n(e,t){let n=Ms(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function tu(e,t){return xo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function nu(e,t){let n=Ms(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return tu(r,r.models[t]);return[]}function dm(e){let t=Ms(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of tu(r,o))n.includes(s)||n.push(s);return n}function pm(e,t){if(!t)return dm(e);let r=Ms(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of nu(e,s))o.includes(i)||o.push(i);return o}function ru(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=$n(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?nu(t,r.impl_model):pm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var _a=new Set(["unavailable","not_applicable"]);function or(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ou(e){return e.filter(t=>t!==null).join(" \xB7 ")}function sr(e,t){return t===null?null:`${rr[e]}: ${t.display} (${Is[t.source]})`}function ma(e){return e.filter(t=>t!==null).join(`
`)}function ga(e){if(typeof e!="object"||e===null)return null;let t=yr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(rr.orchestration_model,e.model),n(rr.orchestration_effort,e.effort),n(rr.orchestration_speed,e.speed)])}}function Xr(e,t){let n=or(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=or(e,"orchestration_effort"),o=or(e,"orchestration_speed"),s=ou([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ma(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",sr("orchestration_model",n),sr("orchestration_effort",r),sr("orchestration_speed",o)])}}function fm(e,t){return e===null||e.value===null||_a.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function _m(e){return e===null||_a.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function mm(e){return e===null?null:e.value==="auto"?"auto":_a.has(e.resolution)?null:e.display}function vr(e,t){if(typeof e!="object"||e===null)return null;let n=or(e,"impl_dispatch"),r=or(e,"impl_runtime"),o=or(e,"impl_model"),s=or(e,"impl_effort"),i=or(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":ou([fm(r,t??null),_m(o),mm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ma(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",sr("impl_dispatch",n),sr("impl_runtime",r),sr("impl_model",o),sr("impl_effort",s),sr("impl_speed",i)])}}var gm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),hm=Object.freeze(["delivery_unproven:"]);function Ds(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||gm.has(t))return"session";for(let n of hm)if(t.startsWith(n))return"session";return"settlement"}var bm=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var ym={contract_change:"\uACC4\uC57D \uBB38\uC11C\xB7checker\xB7\uC2A4\uD0AC \uC0AC\uBCF8\uC744 \uD568\uAED8 \uBC14\uAFD4\uC57C \uD55C\uB2E4",multi_repo:"\uB458 \uC774\uC0C1\uC758 \uC800\uC7A5\uC18C\uC5D0 \uC791\uC5C5 \uB2E8\uC704\uAC00 \uC0DD\uAE34\uB2E4",open_design_fork:"\uC2E4\uD589 \uC911\uC5D0\uB3C4 \uC774\uC5B4\uC9C8 \uBBF8\uD574\uACB0 \uC124\uACC4 \uBD84\uAE30\uAC00 \uC788\uB2E4",multi_phase:"\uC5EC\uB7EC Phase \uB610\uB294 \uBCD1\uB82C \uC4F0\uAE30 \uC870\uC815\uC774 \uD544\uC694\uD558\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ha(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>ym[n]||"").filter(n=>n.length>0)}var su={orchestration_model:["fable"],impl_runtime:["claude"]},ba={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function iu(e){return typeof e=="object"&&e!==null?e:null}function au(e,t){return typeof e=="string"&&t.includes(e)?e:""}function vm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>bm.includes(t))}function Ao(e,t=e){let n=iu(e);if(!n)return null;let r=au(n.rec_orchestration_model,su.orchestration_model);if(r.length===0)return null;let o=au(n.rec_impl_runtime,su.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=iu(t)||{},l=Object.keys(s),a=0,u=0;for(let _ of l){let h=i[_];typeof h=="string"&&h.length>0&&(a+=1,h===s[_]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:vm(n.rec_reason),rec:s,state:d}}function Ps(e){if(!e||typeof e!="object")return"";let t=ha(e),n=ba[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ns(e){return e.replace(/\/+$/,"")}function wm(e,t){let n=Ns(e),r=Ns(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function qs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!wm(r,o))continue;let s=Ns(r),i=Ns(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ya(e,t){return`${e}\0${t}`}function lu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function va(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function So(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${So(o)})`,location_label:So(o),scope:null,same_lane_ahead:!1};let i=va(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function uu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ya(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let w of h){let C=r.get(w);C&&C!==u&&!m.includes(C)&&m.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let _=d.pop();if(_===a)return!0;!_||u.has(_)||(u.add(_),d.push(...o.get(_)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let _=n.get(d);s(d,l)&&_&&u.push(_)}u.length>0&&i.set(l,u)}return i}function du(e,t){return ya(e,t)}async function km(e){let t=await on(e);he(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Qr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{km(e)}}
    >
      ⧉
    </button></span
  >`}function Bs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function fu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function wr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function _u(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function mu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function gu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function $m(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Bs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hu(e,t){let n=$m(e,t);return n?c`<button
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
            title=${n.deploy.at?zt(n.deploy.at):""}
            >${Us(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${wr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Zr(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function xm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function To(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ws(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Yn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?xm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function bu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function js(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Am={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function yu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Am[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function zs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Sm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
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
        ${n.map(u=>Fs(u,"released"))}${o.map(u=>Fs(Sm(u),"overlap"))}${s?c`<span
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
  >`:""}function Em(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
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
  >`}function Tm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Jt(e.usage),r=zn(e.usage),o=rn(e.done_at);return c`<div
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
            title=${`\uC644\uB8CC ${zt(e.done_at)}`}
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
  </div>`}function xn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Tm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Jt(e.usage),s=zn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?rn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=e.lane==="done"?"":Ks(e.workflow),F=e.lane==="done"?"":vu(e.from_id),H=Vs(e.priority),se=c`<span class="worker-mini__title">${e.title}</span>`,V=wu(e.pr_url,e.pr_number),N=r.map(pe=>pe===e.live_badge?c`<span
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
      >`:"",X=e.merge_action?c`<button
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
      </button>`:"",P=e.discard,K=P?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${P?.attempt_id||""}
          data-operation-id=${P?.operation?.operation_id||""}
          data-discard-mode=${P?.confirmation||"unmerged"}
          ?disabled=${P?!P.enabled:e.discard_enabled===!1}
          title=${P?P.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${P?.label||"\uD3D0\uAE30"}
        </button>`:"",U=e.stale_work||null,Q=U?c`${U.can_resume||U.can_continue?c`<button
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
          </button>`:""}`:"",Se=U?c`<div class="worker-mini__stale">
        <strong>${U.title}</strong>
        <span>${U.summary}</span>
        <span>${U.cause}</span>
        ${U.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",be=e.revise_action?c`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=Ys(e.rec,Eo(e,"rec")),ye=Gs(e.cross_lane_chip),xe=Qr(e.log_path),x=m||ye||C||F||ce||q||M||xe?c`<div class="worker-chips">
          ${m}${ye}${C}${F}${ce?zs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${M}${xe}${$u(e)}
        </div>`:"",oe=Hs(e.dependency_chips),$e=js(e),de=t.actions?t.actions:"",Oe=!!(i||e.merge_action||e.cancel_action||e.discard_action||P?.operation||e.revise_action||U);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${w}${H}${F}${V}${se}${de}
          </div>
          <div class="worker-mini__row2">
            ${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${zt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${fu(e.work_kind)}
                  >작업 ${wr(e.work_ms)}</span
                >`:""}${N}${B}
            <span class="worker-mini__actions"
              >${X}${ne}${K}</span
            >
            ${Zr(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${_}${w}${H}${V}${N}${h}${L}${de}
            </div>
            <div class="worker-mini__body">${se}${Se}</div>
            ${oe}${x}${Oe?c`<div class="worker-mini__foot">
                  ${B}
                  <span class="worker-mini__actions"
                    >${X}${ne}${K}${be}${Q}</span
                  >
                  ${js(e)}
                </div>`:""}
            ${Zr(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${w}${H}${se}${V}${N}${h}${L}${B}${X}${ne}${K}${de}
            </div>
            ${oe}${x}${$e} ${Zr(e)}`}
  </div>`}function Cm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var ku={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function $a(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ba[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ha(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=ku[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Rm=["rec","session_preferred","ineligible","qfr"];function Xs(e,t){for(let n of Rm){if(!t(n))continue;let r=$a(e,n);return r?{chip_key:n,content:r}:null}return null}function $u(e){return e.chip_popover?Gr(e.chip_popover.content):""}function Eo(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Qs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function xa(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=ku[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],_=d.includes("missing_description"),h=d.some(N=>N.startsWith(Qs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),w=Hs(e.dependency_chips),C=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",F=Gs(e.cross_lane_chip),H=Ks(u),se=vu(e.from_id),V=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            </button>`:""}${Ys(e.rec,Eo(e,"rec"))}${Em(u,Eo(e,"qfr"))}
      ${$u(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ks(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${w}
    ${C||F||H||se||V?c`<div class="worker-chips">
          ${C}${F}${H}${se}${zs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Cm(t.lanes,e.id)}
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
  </div>`}function In(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?xa(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):xn(o))}
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
            ${n.lanes.map(o=>Om(o))}
          </div>`}
    </section>
  </div>`}function Om(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${In({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </section>`:""}var xu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Co=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ei(e,t){let n=xu.find(o=>o.step===e);if(!n)return null;let r=xu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Au(e){let t=Co.findIndex(n=>n.step===e);return Co.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function kr(e){let t=Co.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Lm(e){let t=Co.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Co.length}}function ti(e){let t=Lm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Sa=new Set(["queued","running","retry_pending"]),Su=new Set(["failed","succeeded"]),Im={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ro={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Mm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ro.base_containment,child_sweep:Ro.child_sweep,branch_cleanup:Ro.branch_cleanup,parent_close:Ro.parent_close};function Dm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Pm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Sa,...Su].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Nm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Aa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Im[o];if(!s)return null;let i=ei(n,`${r} ${s}`);return i?{...i,active:Sa.has(o),failed:o==="failed"}:null}function qm(e){return!e||typeof e!="object"?null:Mm[e.step]||null}function Oo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=qm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Dm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&Pm(w,t,l)).sort(Nm):[],u=i?a:[],d=u.find(w=>Sa.has(w.state));if(d)return Aa(d);if(o)return o.step==="repo_operations"&&a[0]?Aa(a[0],!0):null;let _=u.find(w=>Su.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Aa(_);if(r){let w=ei(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Ro[e.cleanup_cursor]:null;if(!h)return null;let m=ei(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function ni(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Fm="\uBBF8\uC801\uC7AC";function Ea(e,t){let n=Bn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var jm=10080*60*1e3;function Eu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-jm)return null;let o=Bn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${zt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Tu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Bn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Cu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ea(s,{id:a,location_label:o.get(a)||Fm}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var oi=1,Lo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ra=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jr={show_blocked:!0,spec:"all"},Ru={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Bm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Gn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Um(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Gn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Wm(e,t,n={}){let{winners:r,resumed_from_ids:o}=Wc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,_=typeof a.session_id=="string"&&a.session_id.length>0,m=Ds(a.quickfix_landing)==="session",w=u!=="running"&&(_||!m)&&!o.has(a.attempt_id),C=!_&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,F=at(n.observations?.[i]),H=at(F.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||H.state==="MERGED",V=Yn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),N=u==="failed"?Lu(a,{resume_eligible:w,resume_reason:C,confirmation:V.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Ou(a,e,u),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&_,can_resume:w})}for(let[i,l]of Gm(e,t)){if(s.has(i))continue;let a=l.attempt,u=Yn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Nu(a);s.set(i,{...Ou(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Lu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Ou(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Hn(t,e.bead_id)}}function Lu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Nu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:bu(e),confirmation:t.confirmation,...zm(t.history)}}function zm(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{}}}function Nu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Hm=new Set(["parked","retry_wait"]);function Gm(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Gn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Gn(s)||!Hm.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Iu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function at(e){return e&&typeof e=="object"?e:{}}function Km(e,t,n){let r=at(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>_n({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Mu(Xr(a,s),Xr(u,s)),_=Mu(vr(a,null),vr(u,null));return d||_?{orchestration:d,worker:_}:null}function Mu(e,t){return!e||t&&t.text===e.text?null:e}function Ym(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Eu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Oa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Vm=new Set(["quick_fix","spec_backed","full_plan"]);function Du(e){return typeof e=="string"&&Vm.has(e)}function Xm(e){let t={...at(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Qm(e,t,n){let r=e.runner_catalog??null,o=Ca(e,t,n,null);if(!o)return null;let s=$n(r,o.orchestration_model.value??""),i=s===null?o:Ca(e,t,n,s)||o,l=Xr(i,r),a=vr(i,s);return l||a?{orchestration:l,worker:a}:null}function Ca(e,t,n,r){let o=Du(n)?n:Du(t.route)?t.route:null;try{return _n({pin:t,global:Xm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Zm(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:vr(Ca(e,at(t.metadata),t.route,n),n)}function La(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Jm(e){let t={};for(let l of Ln)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Ln)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Jt(Ts(i)):n?zn(t):null}function qu(e,t){let n=va(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function eg(e,t,n){let r=t.get(e);if(!r)return qu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return So(r)}function tg(e,t,n,r){let o=t.get(e);if(!o)return{label:qu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":So(o),title:""}}function ng(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function rg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function og(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let _=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((H,se)=>{let V=H&&typeof H.bead_id=="string"?H.bead_id:"";if(V.length===0)return;let N=H&&typeof H.root_dir=="string"?H.root_dir:"",L=n.get(V),M=L?L.state:void 0,B=M==="running"||M==="pr_wait"||M==="done",X=!L||M==="runnable",ne=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,P=tg(V,n,r,t),K=m.length>0?m[m.length-1].id:null,U=_==="confirmed"&&K!==null&&!(t.get(V)||[]).includes(K);m.push({id:V,title:o.get(V)||V,root_dir:L?L.root_dir:N,workspace_name:L?L.workspace_name:s.get(N)||"",seq:se+1,location_label:P.label,location_title:P.title,draggable:!B,fixed:B,done:M==="done",unplaced:X,mismatch:U,...ne!==null?{queue_index:ne}:{}})}),m.forEach((H,se)=>{H.seq=se+1});let w=m.length>0&&m.every(H=>H.done),C=m.filter(H=>!H.fixed&&i.armed_by_bead.get(H.id)!==d).map(H=>H.id),F=rg(d,_,m,w,C,i);l.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:w,can_confirm:_==="draft"&&m.length>=2,has_mismatch:_==="confirmed"&&m.some(H=>H.mismatch||H.unplaced),unlaunched:C,...F})}),l}function sg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function ig(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:_,state:h}=sg(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:_})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,_=i.get(d);_?_.push(a):i.set(d,[a])}let l=(a,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:eg(_.id,r,o),prefixes:d,...typeof _.root_dir=="string"&&_.root_dir.length>0?{root_dir:_.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let _=qs(a[u].scope,a[d].scope);_.length!==0&&(l(a[u],a[d],_),l(a[d],a[u],_))}}function Pu(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Bn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function ag(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Bn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ta(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ri(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ir(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Jr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Lo.some(y=>y.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",_=Date.now(),h=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&h.set(y.root_dir,y);let m=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);for(let y of r)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);let w=[],C=[],F=[],H=[],se=[],V=[],N=new Map,L=new Map,M=new Map,B=new Map,X=new Map,ne=new Map,P=new Map,K=new Map,U=new Map,Q=new Map,Se=new Map,be=new Map,ce=new Map,q=new Set,ye=new Map,xe=new Map,x=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let W=y.root_dir,Te=y.name||W,Re=h.get(W),je=Re&&typeof Re.revision=="number"?Re.revision:typeof y.revision=="number"?y.revision:0,Ke=at(y.attempts),dt=at(y.bead_titles);for(let[p,f]of Object.entries(dt))typeof f=="string"&&f.length>0&&x.set(p,f);let vt=at(y.bead_times),It=at(y.pr_observations),wt=at(y.admission),mt=at(y.revise_parked),Be=at(y.merge_queue_state),I=at(y.cleanup_failed),ee=at(y.discard_operations),ge=at(y.bead_timelines),T=at(y.bead_blocked_by);Object.hasOwn(y,"bead_scope")&&ye.set(W,at(y.bead_scope));let G=at(y.bead_workflow),Ie=at(y.pr_activity),Ue=Array.isArray(y.repo_operations)?y.repo_operations:[];K.set(W,Ue);let qe=typeof y.declared_base=="string"?y.declared_base:null;P.set(W,qe),ne.set(W,Object.entries(I).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(at(y.bead_overlay)))f&&typeof f=="object"&&U.set(`${W}\0${p}`,f);let Je=new Map;for(let p of Object.values(Ke))p&&typeof p.attempt_id=="string"&&Je.set(p.attempt_id,p);let Ce=Array.isArray(y.merge_queue)?y.merge_queue:[],ze=new Set(Ce.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),et=new Map(Ce.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),bt=new Map,We=new Map,xt=new Map,Ft=new Map;Ce.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(bt.set(p.bead_id,f+1),We.set(p.bead_id,p.resolution),xt.set(p.bead_id,p.continuation_action||null),Ft.set(p.bead_id,p.authority||null))});let it=at(y.auto_merge_skips),Yt=p=>{let f=it[p];if(!f)return null;let k=at(at(It[p]).pr).head_sha;return k&&k===f.head_sha?f.reason||"":null};X.set(W,{positions:bt,resolutions:We,continuations:xt,authorities:Ft,state:{active:typeof Be.active=="string"?Be.active:null,failures:at(Be.failures),waiting:Be.waiting&&typeof Be.waiting.bead_id=="string"&&typeof Be.waiting.reason=="string"?Be.waiting:null},auto_excluded:(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Yt(p)!==null),running:Ce.length>0});let kt=Array.isArray(y.queue)?y.queue:[];for(let p of[...kt,...Array.isArray(y.pr_wait)?y.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&be.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(y.disarmed_on_load)?y.disarmed_on_load:[])typeof p=="string"&&p.length>0&&q.add(p);let Mt=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Vt=at(y.lane_states),Xt=typeof y.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(y.serial_lane_count))):Math.min(5,Mt.length);M.set(W,Xt),B.set(W,kt.length);let nn=new Map(Mt.map(p=>[p.id,p])),Ht=new Map;for(let p of Mt)for(let f of p.entries)f&&typeof f.bead_id=="string"&&Ht.set(f.bead_id,p.id);for(let[p,f]of Object.entries(at(y.bead_dependents))){let k=Array.isArray(f?.ids)?f.ids:[],R=at(f?.root_dirs),z=Se.get(p)||{ids:new Set,root_dirs:{}};for(let re of k)typeof re=="string"&&re.length>0&&z.ids.add(re);for(let[re,fe]of Object.entries(R))typeof fe=="string"&&fe.length>0&&(z.root_dirs[re]=fe);Se.set(p,z)}for(let[p,f]of Object.entries(T))Array.isArray(f)&&Q.set(p,f.filter(k=>typeof k=="string"&&k.length>0));let Dt=Array.isArray(y.done)?y.done:[];for(let p of Dt)p&&typeof p.bead_id=="string"&&V.push({id:p.bead_id,root_dir:W,workspace_name:Te});let Qt=new Map;for(let p of Dt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&Qt.set(p.bead_id,p.added_at);let Ct=p=>({id:p,title:dt[p]||p,root_dir:W,workspace_name:Te,expected_revision:je,draggable:!1,...at(vt[p]).created_at?{created_at:at(vt[p]).created_at}:{},...at(vt[p]).updated_at?{updated_at:at(vt[p]).updated_at}:{}}),Gt=p=>{let f=G[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},Pt=p=>Object.hasOwn(T,p)?{blocked_by:Array.isArray(T[p])?T[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},St=new Set;for(let[p,f]of Wm(Ke,Qt,{discard_operations:ee,observations:It,bead_timelines:ge})){St.add(p);let k=f.run_state==="failed"?ng(Ke,f.attempt_id):null;k!==null&&ce.set(p,k);let R=Je.get(f.attempt_id)||null,z=U.get(`${W}\0${p}`),re=z&&z.rollup?z.rollup:null,fe=Oa(qe,R?R.target_base:null),ve=R?La(R,Je):!1,Ye=R&&R.quickfix_lane===!0&&R.quickfix_landing&&typeof R.quickfix_landing=="object"?R.quickfix_landing:null,_t=Ye&&typeof Ye.reason=="string"&&Ye.reason.length>0?Ye.reason:null,ft=Ye?Oo({bead_id:p,merge_sha:Ye.head_sha,cleanup_cursor:Ye.cursor,cleanup_failed:_t?{step:Ye.cursor,reason:_t}:null,repo_operations:Ue}):null;C.push({...Ct(p),lane:"running",...Pt(p),...Ht.has(p)?{serial_lane_id:Ht.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:G[p]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,retry:f.retry||null,exec_chips:{orchestration:ga(f),worker:Zm(at(Re),z,f.runner||null)},discard:Yn(ee,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||at(It[p]).pr?.state==="MERGED"}),...re?{rollup:re}:{},...ve?{conflict_resolution:!0}:{},...fe?{base_exception:fe}:{},...ft?{landing:ft}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:f.run_state==="failed"})}for(let[p,f]of Uc(Ke)){if(C.some(R=>R.id===p))continue;let k=f.attempt;C.push({...Ct(p),lane:"running",kind:"session",...Pt(p),attempt_id:typeof k.attempt_id=="string"?k.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:G[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof k.last_event_at=="number"?k.last_event_at:null,last_activity:k.last_activity&&typeof k.last_activity=="object"?k.last_activity:null,legs:Array.isArray(k.legs)?k.legs:[],runner:typeof k.runner=="string"?k.runner:null,model:typeof k.model=="string"?k.model:null,effort:typeof k.effort=="string"?k.effort:null,speed:typeof k.speed=="string"?k.speed:null,resumed_from:null,continuation_mode:null,usage:k.usage&&typeof k.usage=="object"?k.usage:null,exec_chips:{orchestration:ga(k),worker:null},discard:Yn(ee,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(y.session_active)?y.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||St.has(f)||(St.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&Q.set(f,p.blocked_by.filter(k=>typeof k=="string"&&k.length>0)),typeof p.title=="string"&&p.title.length>0&&x.set(f,p.title),C.push({...Ct(f),title:p.title||dt[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:Ta(p.started_at)??Ta(p.updated_at)??void 0,updated_at:Ta(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(k=>typeof k=="string"&&k.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(y.pr_wait)?y.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||St.has(f))continue;St.add(f);let k=at(It[f]),R=at(k.pr),z=k.gate?at(k.gate):null,re=ze.has(f),fe=et.get(f)?.continuation_action||null,ve=!!fe&&fe.continuation===null,Ye=Be.active===f,_t=p.external===!0,ft=I[f]||null,Zt=at(Ie[f]),$=Oo({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:Zt.merge_progress||null,cleanup_failed:ft,repo_operations:Ue}),E=ni($),Ae=!!z&&z.base_badge==="\uCDA9\uB3CC",g=!!ft&&["child_sweep","branch_cleanup","parent_close"].includes(ft.step)&&!!z&&z.tier==="merged",b=_t&&!!ft&&!!z&&z.tier==="merged",A=!!z&&["closed_unmerged","review","undecidable"].includes(z.tier)&&z.reason!=="review_receipt_undetermined",te=Yn(ee,f,{external:_t,merge_active:Ye||$?.step==="merge",merge_queued:re,cleanup_active:E,merged:!!ft||z?.tier==="merged"}),_e=!!te.operation;F.push({...Ct(f),lane:"pr_wait",...Pt(f),workflow:G[f]||null,pr_number:typeof R.number=="number"?R.number:null,pr_url:typeof R.url=="string"?R.url:void 0,external:_t,usage:Hn(Ke,f),merge_step:$,badges:ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:$?[z?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ft?[kr(ft.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${kr(ft.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof z?.gate_badge=="string"&&z.gate_badge.length>0?[z.gate_badge]:[],alert:$?$.failed===!0:!!ft||A,reason:ft&&$?.active!==!0?ti(ft.step):"PR \uB300\uAE30",merge_action:z?.tier==="merged"&&!g&&!b?!1:!re||ve,merge_enabled:!_e&&(ve||z?.enabled===!0||Ae||g||b),merge_label:ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":b||g?"\uC815\uB9AC \uC7AC\uAC1C":Ae&&!g?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?te.error?`\uD3D0\uAE30 \uC2E4\uD328: ${te.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${te.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:b?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":z?.enabled===!0?`\uBA38\uC9C0 (${z.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${z?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:re&&!ve,cancel_enabled:!Ye,continuation_mismatch:fe?.mismatch||null,discard:te,discard_action:te.action,discard_enabled:te.enabled,discard_title:te.title})}let me=(p,f,k,R)=>{let z=p&&p.bead_id;if(typeof z!="string"||St.has(z))return null;St.add(z);let re=mt[z],fe=Yn(ee,z),ve=fe.operation?fe:null,Ye={...Ct(z),lane:f,workflow:G[z]||null,draggable:!ve,discard:ve||void 0,reason:Iu(wt,z),seq:k+1,queue_position:k+1,queue_index:k,queue_length:R,badges:re?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!re,revise_action:!!re,revise_enabled:!!re&&!ve,revise_title:re?re.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${re.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},_t=Pt(z);return Object.hasOwn(_t,"blocked_by")&&(Ye.blocked_by=_t.blocked_by),Ye};for(let p=0;p<kt.length;p++){let f=me(kt[p],"queue",p,kt.length);if(!f)continue;H.push(f);let k=N.get(W);k?k.push(f):N.set(W,[f])}let S=p=>{let f=F.find(re=>re.id===p&&re.root_dir===W);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let k=C.find(re=>re.id===p&&re.root_dir===W),R=k?k.run_state:Bm(Ke,p),z=R==="failed"||R==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":R==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:k?k.title:Ct(p).title,badge:z}},J=[];for(let p=0;p<Math.max(Xt,Mt.length);p++){let f=`s${p+1}`,k=nn.get(f),R=k&&Array.isArray(k.entries)?k.entries:[],z=at(Vt[f]),re=Array.isArray(z.occupied_by)?z.occupied_by.filter(Ye=>typeof Ye=="string"):[],fe=new Set(re),ve=[];for(let Ye=0;Ye<R.length;Ye++){let _t=R[Ye]&&R[Ye].bead_id;if(typeof _t=="string"&&fe.has(_t)){St.add(_t);continue}let ft=me(R[Ye],f,Ye,R.length);ft&&(ve.push(ft),H.push(ft))}ve.length===0&&re.length===0&&(Xt<=1||p>=Xt)||J.push({id:f,index:p,items:ve,raw_length:R.length,occupied_by:re,occupants:re.map(Ye=>S(Ye)),corrections:Array.isArray(z.corrections)?z.corrections.length:0,cycle:z.cycle===!0,...ve.length===0&&re.length===0?{empty:!0}:{}})}L.set(W,J);let Le=Array.from({length:Xt},(p,f)=>{let k=`s${f+1}`,R=nn.get(k),z=R&&Array.isArray(R.entries)?R.entries:[],re=at(Vt[k]);return{id:k,index:z.length,length:z.length,occupied_by:Array.isArray(re.occupied_by)?re.occupied_by.filter(fe=>typeof fe=="string"):[]}});for(let p of Array.isArray(y.runnable)?y.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||St.has(f))continue;St.add(f);let k=p.workflow&&typeof p.workflow=="object"?p.workflow:null,R=k&&typeof k.route=="string"&&k.route||(typeof p.route=="string"?p.route:null),z=Km(at(Re),p.exec_pins,R),re=Ao(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&Q.set(f,p.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof p.title=="string"&&p.title.length>0&&x.set(f,p.title),Array.isArray(p.scope)&&xe.set(f,p.scope.filter($=>typeof $=="string"&&$.length>0));let fe=p.eligible!==!1,ve=p.worker_ineligible===!0,Ye=Object.hasOwn(p,"eligible"),_t=[];typeof p.reason=="string"&&p.reason.length>0&&_t.push(p.reason);let ft=Iu(wt,f);ft&&_t.push(ft);let Zt=Ym(f,p.release_info,_)?.map($=>({...$,...Pu({id:f,root_dir:W},$.id)}));w.push({...Ct(f),title:p.title||dt[f]||f,lane:"runnable",draggable:!Ye,queue_placeable:fe&&!ve,...ve?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...Zt?{dependency_chips:{released:Zt}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:_t.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:k||(R?{route:R,chips:{route:R}}:null),...z?{exec_chips:z}:{},...re?{rec:re}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},place_index:kt.length,place_lanes:Le})}for(let p of Dt){let f=p&&p.bead_id;if(typeof f!="string"||St.has(f)||(St.add(f),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let k=Um(Ke,f),R=k&&typeof k.done_kind=="string"?k.done_kind:null;se.push({...Ct(f),lane:"done",done:!0,done_layout:"three_line",usage:Hn(Ke,f),work_ms:gu(Ke,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:R,...Gt(f),badges:[...R&&Ru[R]?[Ru[R]]:[],..._u(Ke,f)]})}for(let p of Array.isArray(y.session_done)?y.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||St.has(f)||(St.add(f),se.push({...Ct(f),...p,id:f,root_dir:W,workspace_name:Te,expected_revision:je,lane:"done",done:!0}))}}if(U.size>0)for(let y of[...w,...H,...C,...F,...se]){let W=U.get(`${y.root_dir}\0${y.id}`);if(!W||(typeof W.priority=="number"&&(y.priority=W.priority),typeof W.from_id=="string"&&W.from_id.length>0&&(y.from_id=W.from_id),!Object.hasOwn(W,"metadata")))continue;let Te=at(W.metadata);if(y.rec=Ao(Te),y.lane==="runnable"||y.lane.startsWith("s")||y.lane==="queue"){let Re=Qm(at(h.get(y.root_dir)),Te,typeof W.route=="string"&&W.route.length>0?W.route:at(y.workflow).route);Re&&(y.exec_chips=Re)}}let oe=new Map;o.forEach((y,W)=>{y&&typeof y.root_dir=="string"&&oe.set(y.root_dir,W)});let $e=n&&n.running_sort==="repo"?"repo":"started";C.sort((y,W)=>{let Te=y.kind==="session",Re=W.kind==="session";if(Te!==Re)return Te?1:-1;if(Te&&Re){let dt=ri(W.updated_at)-ri(y.updated_at);return dt!==0?dt:y.id.localeCompare(W.id)}if($e==="repo"){let dt=oe.get(y.root_dir)??Number.MAX_SAFE_INTEGER,vt=oe.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==vt)return dt-vt}let je=typeof y.started_at=="number"&&Number.isFinite(y.started_at)?y.started_at:null,Ke=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return je!==null&&Ke!==null&&je!==Ke?je-Ke:je===null&&Ke!==null?1:je!==null&&Ke===null?-1:y.id.localeCompare(W.id)}),se.sort((y,W)=>(W.done_at??0)-(y.done_at??0));let de=o.length>0?o:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,runner_catalog:y&&y.runner_catalog})),Oe=new Set(w.map(y=>y.root_dir)),pe=new Map;for(let y of C)y.kind==="session"||y.run_state!=="running"||pe.set(y.root_dir,(pe.get(y.root_dir)||0)+1);let De=new Map;for(let y of se){let W=De.get(y.root_dir);W?W.push(y):De.set(y.root_dir,[y])}let lt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ot=[];for(let y of de){if(!y||typeof y.root_dir!="string")continue;let W=N.get(y.root_dir)||[],Te=L.get(y.root_dir)||[],Re=W.length>0||Te.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Re&&!Oe.has(y.root_dir))continue;let je=typeof y.slots=="number"&&y.slots>=oi?y.slots:oi,Ke=pe.get(y.root_dir)||0;ot.push({live_count:Ke,over_cap:Ke>je,merge:X.get(y.root_dir)||lt,token_total:Jm(De.get(y.root_dir)||[]),cleanup_failures:ne.get(y.root_dir)||[],declared_base:P.get(y.root_dir)??null,repo_operations:K.get(y.root_dir)||[],root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:je,revision:typeof y.revision=="number"?y.revision:0,runner_catalog:at(y.runner_catalog),items:W,sublanes:{parallel:W,serial:Te},serial_lane_count:M.get(y.root_dir)||0,raw_queue_length:B.get(y.root_dir)||0})}let O={runnable:w,runnable_all:w,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:H,queue_groups:ot,running:C,pr_wait:F,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},ae=lu(O);for(let y of V)ae.has(y.id)||ae.set(y.id,{root_dir:y.root_dir,workspace_name:y.workspace_name,lane:"done",state:"done"});for(let y of[...O.queue,...O.runnable,...O.running,...O.pr_wait]){if(!Object.hasOwn(y,"blocked_by"))continue;let W=ae.get(y.id);y.blockers=(y.blocked_by||[]).map(Te=>cu(Te,W,ae,o))}for(let y of[...O.queue,...O.runnable,...O.running,...O.pr_wait]){let W=(y.blockers||[]).map(je=>({...Ea(y.id,je),...Pu(y,je.id,ae)})),Te=Tu(y.id,ag(Se.get(y.id),y.dependents_info,y,ae));if(W.length===0&&Te.length===0)continue;let Re={...y.dependency_chips||{},...W.length>0?{predecessors:W}:{},...Te.length>0?{dependents:Te}:{}};y.dependency_chips=Re}ig(O,ye,xe,ae,o);let le=uu(O.queue_groups);for(let y of O.queue_groups)for(let W of y.sublanes.serial){let Te=le.get(du(y.root_dir,W.id));Te&&(W.cross_wait_peers=Te)}O.chain_lanes=og(l&&Array.isArray(l.lanes)?l.lanes:[],Q,ae,o,x,m,{armed_by_bead:be,failed_by_bead:ce,disarmed_lanes:q});let ie=new Map;for(let y of[...O.queue,...O.runnable])ie.has(y.id)||ie.set(y.id,y);let we=new Set;for(let y of O.chain_lanes)for(let W of y.rows){if(y.status==="confirmed"&&!W.unplaced&&!W.fixed&&we.add(W.id),!y.draft&&!W.unplaced)continue;let Te=ie.get(W.id);Te&&(Te.cross_lane_chip={lane_id:y.lane_id,number:y.number,status:y.status,label:y.draft?`\uC5F0\uACB0 ${y.number} (draft)`:`\uC5F0\uACB0 ${y.number}`})}let ue=new Map(O.chain_lanes.map(y=>[y.lane_id,y.number]));for(let y of[...O.queue,...O.running]){let W=be.get(y.id);if(typeof W!="string"||W.length===0)continue;let Te=ue.get(W);y.armed_lane_chip=Te===void 0?{lane_id:W,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:W,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let Fe=[];for(let y of N.values())for(let W of y)we.has(W.id)||Fe.push(W);Fe.sort((y,W)=>{let Te=y.workspace_name.localeCompare(W.workspace_name);return Te!==0?Te:(y.queue_index??0)-(W.queue_index??0)}),O.parallel_rows=Fe;let He={};for(let[y,W]of ae)typeof W.root_dir=="string"&&W.root_dir.length>0&&(He[y]=W.root_dir);for(let y of O.chain_lanes)for(let W of y.rows)!Object.hasOwn(He,W.id)&&W.root_dir.length>0&&m.has(W.root_dir)&&(He[W.id]=W.root_dir);O.owner_of=He;let Qe=O.runnable.length;O.runnable_all=O.runnable.slice();let Pe=O.runnable,Y=y=>i.show_blocked||y.blocked!==!0,j=y=>i.spec==="all"||(i.spec==="with"?y.published===!0:y.published!==!0);if(d==="per_control"){let y=[],W=0,Te=0;for(let Re of Pe){let je=Y(Re),Ke=j(Re);je&&Ke?y.push(Re):!je&&Ke?W+=1:je&&!Ke&&(Te+=1)}Pe=y,O.runnable_hidden={blocked:W,spec:Te}}else{Pe=Pe.filter(Y);let y=Pe.length;Pe=Pe.filter(j),O.runnable_hidden={blocked:Qe-y,spec:y-Pe.length}}let Ne=(y,W)=>{let Te=ri(W.updated_at)-ri(y.updated_at);return Te!==0?Te:y.id.localeCompare(W.id)},Ze=a==="repo_spec"?(y,W)=>{let Te=y.published===!0?0:1,Re=W.published===!0?0:1;return Te!==Re?Te-Re:Ne(y,W)}:Ne;if(a==="as_given")O.runnable=Pe,O.runnable_sections=[];else if(a==="updated_flat")O.runnable=Pe.slice().sort(Ne),O.runnable_sections=[];else{let y=new Map;for(let Re of Pe){let je=y.get(Re.root_dir);je?je.push(Re):y.set(Re.root_dir,[Re])}let W=[],Te=[];for(let Re of de){if(!Re||typeof Re.root_dir!="string")continue;let je=(y.get(Re.root_dir)||[]).slice().sort(Ze);y.delete(Re.root_dir),je.length!==0&&(W.push({root_dir:Re.root_dir,name:Re.name||Re.root_dir,items:je.map(Ke=>({...Ke,workspace_name:""}))}),Te.push(...je))}for(let[Re,je]of y){let Ke=je.slice().sort(Ze);W.push({root_dir:Re,name:Ke[0]?.workspace_name||Re,items:Ke.map(dt=>({...dt,workspace_name:""}))}),Te.push(...Ke)}O.runnable=Te,O.runnable_sections=W}return O}function Fu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let _=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));_&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var lg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ii="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",cg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ug="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",eo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Io(e,t){return`${e}\0${t}`}function dg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function pg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Po(e,t){let n=e.entries,r=n.map(_=>_.bead_id),o=dg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[_,h]of o)for(let m of h)s.push({blocker:m,blockee:_});let i=pg(e,t),l=new Map(r.map((_,h)=>[_,h])),a=r.slice(0,i).filter(_=>o.get(_).some(h=>Number(l.get(h))>Number(l.get(_)))),u=Fu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,i),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function ju(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Po(n,t)}function fg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function _g(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function mg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ia(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function gg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Io(i,a));let r=new Map,o=new Map;for(let i of e){let l=Io(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Io(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function hg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function bg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ma(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function No(e){let t=mg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=_g(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,_)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if(Ia(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(Io(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=s(u);h!==null&&(t.set(u,_.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Io(u,d))}}function qo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=gg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:fg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Bu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Mo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Uu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Wu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(si(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Do(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ai(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function li(e,t,n){let r=No(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:lg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:cg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ma(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:eo}}if(e.kind==="chain"&&d===void 0)return{refused:eo};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(V=>V.bead_id===e.bead_id);if(w<0)return;let C=w>0?d.entries[w-1]:null,F=w+1<d.entries.length?d.entries[w+1]:null,H=Mo(d,w),se=F!==null&&Mo(d,w+1);H&&C!==null&&r.removeDep(e.bead_id,C.bead_id),se&&F!==null&&r.removeDep(F.bead_id,e.bead_id),(H||se)&&C!==null&&F!==null&&r.addDep(F.bead_id,C.bead_id,u)},h=(w,C)=>{let F=n.cross_lanes.get(w),H=F.entries.findIndex(P=>P.bead_id===e.bead_id),se=F.entries.filter(P=>P.bead_id!==e.bead_id),V=Math.max(0,Math.min(se.length,H>=0&&C>H?C-1:C)),N=-1;if(se.forEach((P,K)=>{n.fixed_members.has(P.bead_id)&&(N=K)}),V<=N){r.state.refusal=ug;return}let L=H>=0?F.entries[H]:d?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Po({status:F.status,entries:[...se.slice(0,V),L,...se.slice(V)]},n);let M=l.entries;if(ai(M,F.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:w,entries:Do(M)}}),F.status!=="confirmed")return;let B=M.findIndex(P=>P.bead_id===e.bead_id),X=B>0?M[B-1].bead_id:null,ne=B+1<M.length?M[B+1].bead_id:null;if(X===null){ne!==null&&r.addDep(ne,e.bead_id,w);return}if(r.addDep(e.bead_id,X,w),ne!==null&&(r.graph.get(ne)||[]).includes(X)){let P=F.entries.findIndex(K=>K.bead_id===ne);(r.laneCreated(ne,X)||P>0&&F.entries[P-1].bead_id===X&&Mo(F,P))&&r.removeDep(ne,X),r.addDep(ne,e.bead_id,w)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Uu(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Do(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=hg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(si(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let C=n.parallel_rows,F=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&bg(n,e.root_dir)&&m!==void 0){let se=m>w?w:w-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&s.push(si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let w=m>t.index?t.index:t.index-1;w>=0&&w!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else s.push(si(e.bead_id,e.root_dir,t.index,t.lane_id));return qo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function zu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Po(n,t);if(r.held)return{refused:ii};let o=r.entries,s=No(t),i=[];Bu(s,o,e),s.state.refusal===null&&Wu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),qo(s,t,l,i,{lane_id:e,correction:r})}function Hu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=Po(n,t),o=r.entries,s=No(t),i=[];Bu(s,o,e),s.state.refusal===null&&Wu(s,t,o,i);let l=ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}];return qo(s,t,l,i,{lane_id:e,correction:r})}function Gu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=Po(n,t),o=r.entries;return qo(No(t),t,ai(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Do(o)}}],[],{lane_id:e,correction:r})}function Ku(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:eo};let r=No(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Mo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return qo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Uu(t,n,e,n.entries)})}function Yu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Mo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ma(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Vu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Xu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Da(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ma(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var yg="\uC0AC\uC774\uD074";function vg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Pa(e,t,n){let r=ir(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:vg(e)}}function Qu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ia(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:yg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Zu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:ad,setPrototypeOf:Ju,isFrozen:wg,getPrototypeOf:kg,getOwnPropertyDescriptor:$g}=Object,{freeze:an,seal:vn,create:Wa}=Object,{apply:za,construct:Ha}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});za||(za=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ha||(Ha=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ci=ln(Array.prototype.forEach),xg=ln(Array.prototype.lastIndexOf),ed=ln(Array.prototype.pop),Fo=ln(Array.prototype.push),Ag=ln(Array.prototype.splice),di=ln(String.prototype.toLowerCase),Na=ln(String.prototype.toString),qa=ln(String.prototype.match),jo=ln(String.prototype.replace),Sg=ln(String.prototype.indexOf),Eg=ln(String.prototype.trim),An=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Bo=Tg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return za(e,t,r)}}function Tg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ha(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:di;Ju&&Ju(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(wg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Cg(e){for(let t=0;t<e.length;t++)An(e,t)||(e[t]=null);return e}function Vn(e){let t=Wa(null);for(let[n,r]of ad(e))An(e,n)&&(Array.isArray(r)?t[n]=Cg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Vn(r):t[n]=r);return t}function Uo(e,t){for(;e!==null;){let r=$g(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=kg(e)}function n(){return null}return n}var td=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fa=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ja=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Rg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ba=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Og=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),nd=an(["#text"]),rd=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ua=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),od=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ui=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Lg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ig=vn(/<%[\w\W]*|[\w\W]*%>/gm),Mg=vn(/\$\{[\w\W]*/gm),Dg=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Pg=vn(/^aria-[\-\w]+$/),ld=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ng=vn(/^(?:\w+script|data):/i),qg=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cd=vn(/^html$/i),Fg=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),sd=Object.freeze({__proto__:null,ARIA_ATTR:Pg,ATTR_WHITESPACE:qg,CUSTOM_ELEMENT:Fg,DATA_ATTR:Dg,DOCTYPE_NAME:cd,ERB_EXPR:Ig,IS_ALLOWED_URI:ld,IS_SCRIPT_OR_DATA:Ng,MUSTACHE_EXPR:Lg,TMPLIT_EXPR:Mg}),Wo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},jg=function(){return typeof window>"u"?null:window},Bg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},id=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ud(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jg(),t=me=>ud(me);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Wo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:m}=e,w=a.prototype,C=Uo(w,"cloneNode"),F=Uo(w,"remove"),H=Uo(w,"nextSibling"),se=Uo(w,"childNodes"),V=Uo(w,"parentNode");if(typeof i=="function"){let me=n.createElement("template");me.content&&me.content.ownerDocument&&(n=me.content.ownerDocument)}let N,L="",{implementation:M,createNodeIterator:B,createDocumentFragment:X,getElementsByTagName:ne}=n,{importNode:P}=r,K=id();t.isSupported=typeof ad=="function"&&typeof V=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:U,ERB_EXPR:Q,TMPLIT_EXPR:Se,DATA_ATTR:be,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:ye,CUSTOM_ELEMENT:xe}=sd,{IS_ALLOWED_URI:x}=sd,oe=null,$e=pt({},[...td,...Fa,...ja,...Ba,...nd]),de=null,Oe=pt({},[...rd,...Ua,...od,...ui]),pe=Object.seal(Wa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,lt=null,ot=Object.seal(Wa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),O=!0,ae=!0,le=!1,ie=!0,we=!1,ue=!0,Fe=!1,He=!1,Qe=!1,Pe=!1,Y=!1,j=!1,Ne=!0,ct=!1,Ze="user-content-",y=!0,W=!1,Te={},Re=null,je=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ke=null,dt=pt({},["audio","video","img","source","image","track"]),vt=null,It=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml",I=Be,ee=!1,ge=null,T=pt({},[wt,mt,Be],Na),G=pt({},["mi","mo","mn","ms","mtext"]),Ie=pt({},["annotation-xml"]),Ue=pt({},["title","style","font","a","script"]),qe=null,Je=["application/xhtml+xml","text/html"],Ce="text/html",ze=null,et=null,bt=n.createElement("form"),We=function(S){return S instanceof RegExp||S instanceof Function},xt=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(et&&et===S)){if((!S||typeof S!="object")&&(S={}),S=Vn(S),qe=Je.indexOf(S.PARSER_MEDIA_TYPE)===-1?Ce:S.PARSER_MEDIA_TYPE,ze=qe==="application/xhtml+xml"?Na:di,oe=An(S,"ALLOWED_TAGS")?pt({},S.ALLOWED_TAGS,ze):$e,de=An(S,"ALLOWED_ATTR")?pt({},S.ALLOWED_ATTR,ze):Oe,ge=An(S,"ALLOWED_NAMESPACES")?pt({},S.ALLOWED_NAMESPACES,Na):T,vt=An(S,"ADD_URI_SAFE_ATTR")?pt(Vn(It),S.ADD_URI_SAFE_ATTR,ze):It,Ke=An(S,"ADD_DATA_URI_TAGS")?pt(Vn(dt),S.ADD_DATA_URI_TAGS,ze):dt,Re=An(S,"FORBID_CONTENTS")?pt({},S.FORBID_CONTENTS,ze):je,De=An(S,"FORBID_TAGS")?pt({},S.FORBID_TAGS,ze):Vn({}),lt=An(S,"FORBID_ATTR")?pt({},S.FORBID_ATTR,ze):Vn({}),Te=An(S,"USE_PROFILES")?S.USE_PROFILES:!1,O=S.ALLOW_ARIA_ATTR!==!1,ae=S.ALLOW_DATA_ATTR!==!1,le=S.ALLOW_UNKNOWN_PROTOCOLS||!1,ie=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,we=S.SAFE_FOR_TEMPLATES||!1,ue=S.SAFE_FOR_XML!==!1,Fe=S.WHOLE_DOCUMENT||!1,Pe=S.RETURN_DOM||!1,Y=S.RETURN_DOM_FRAGMENT||!1,j=S.RETURN_TRUSTED_TYPE||!1,Qe=S.FORCE_BODY||!1,Ne=S.SANITIZE_DOM!==!1,ct=S.SANITIZE_NAMED_PROPS||!1,y=S.KEEP_CONTENT!==!1,W=S.IN_PLACE||!1,x=S.ALLOWED_URI_REGEXP||ld,I=S.NAMESPACE||Be,G=S.MATHML_TEXT_INTEGRATION_POINTS||G,Ie=S.HTML_INTEGRATION_POINTS||Ie,pe=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&We(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&We(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(ae=!1),Y&&(Pe=!0),Te&&(oe=pt({},nd),de=[],Te.html===!0&&(pt(oe,td),pt(de,rd)),Te.svg===!0&&(pt(oe,Fa),pt(de,Ua),pt(de,ui)),Te.svgFilters===!0&&(pt(oe,ja),pt(de,Ua),pt(de,ui)),Te.mathMl===!0&&(pt(oe,Ba),pt(de,od),pt(de,ui))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?ot.tagCheck=S.ADD_TAGS:(oe===$e&&(oe=Vn(oe)),pt(oe,S.ADD_TAGS,ze))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?ot.attributeCheck=S.ADD_ATTR:(de===Oe&&(de=Vn(de)),pt(de,S.ADD_ATTR,ze))),S.ADD_URI_SAFE_ATTR&&pt(vt,S.ADD_URI_SAFE_ATTR,ze),S.FORBID_CONTENTS&&(Re===je&&(Re=Vn(Re)),pt(Re,S.FORBID_CONTENTS,ze)),y&&(oe["#text"]=!0),Fe&&pt(oe,["html","head","body"]),oe.table&&(pt(oe,["tbody"]),delete De.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=S.TRUSTED_TYPES_POLICY,L=N.createHTML("")}else N===void 0&&(N=Bg(m,o)),N!==null&&typeof L=="string"&&(L=N.createHTML(""));an&&an(S),et=S}},Ft=pt({},[...Fa,...ja,...Rg]),it=pt({},[...Ba,...Og]),Yt=function(S){let J=V(S);(!J||!J.tagName)&&(J={namespaceURI:I,tagName:"template"});let Le=di(S.tagName),p=di(J.tagName);return ge[S.namespaceURI]?S.namespaceURI===mt?J.namespaceURI===Be?Le==="svg":J.namespaceURI===wt?Le==="svg"&&(p==="annotation-xml"||G[p]):!!Ft[Le]:S.namespaceURI===wt?J.namespaceURI===Be?Le==="math":J.namespaceURI===mt?Le==="math"&&Ie[p]:!!it[Le]:S.namespaceURI===Be?J.namespaceURI===mt&&!Ie[p]||J.namespaceURI===wt&&!G[p]?!1:!it[Le]&&(Ue[Le]||!Ft[Le]):!!(qe==="application/xhtml+xml"&&ge[S.namespaceURI]):!1},kt=function(S){Fo(t.removed,{element:S});try{V(S).removeChild(S)}catch{F(S)}},Mt=function(S,J){try{Fo(t.removed,{attribute:J.getAttributeNode(S),from:J})}catch{Fo(t.removed,{attribute:null,from:J})}if(J.removeAttribute(S),S==="is")if(Pe||Y)try{kt(J)}catch{}else try{J.setAttribute(S,"")}catch{}},Vt=function(S){let J=null,Le=null;if(Qe)S="<remove></remove>"+S;else{let k=qa(S,/^[\r\n\t ]+/);Le=k&&k[0]}qe==="application/xhtml+xml"&&I===Be&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let p=N?N.createHTML(S):S;if(I===Be)try{J=new h().parseFromString(p,qe)}catch{}if(!J||!J.documentElement){J=M.createDocument(I,"template",null);try{J.documentElement.innerHTML=ee?L:p}catch{}}let f=J.body||J.documentElement;return S&&Le&&f.insertBefore(n.createTextNode(Le),f.childNodes[0]||null),I===Be?ne.call(J,Fe?"html":"body")[0]:Fe?J.documentElement:f},Xt=function(S){return B.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},nn=function(S){return S instanceof _&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Ht=function(S){return typeof l=="function"&&S instanceof l};function Dt(me,S,J){ci(me,Le=>{Le.call(t,S,J,et)})}let Qt=function(S){let J=null;if(Dt(K.beforeSanitizeElements,S,null),nn(S))return kt(S),!0;let Le=ze(S.nodeName);if(Dt(K.uponSanitizeElement,S,{tagName:Le,allowedTags:oe}),ue&&S.hasChildNodes()&&!Ht(S.firstElementChild)&&sn(/<[/\w!]/g,S.innerHTML)&&sn(/<[/\w!]/g,S.textContent)||S.nodeType===Wo.progressingInstruction||ue&&S.nodeType===Wo.comment&&sn(/<[/\w]/g,S.data))return kt(S),!0;if(!(ot.tagCheck instanceof Function&&ot.tagCheck(Le))&&(!oe[Le]||De[Le])){if(!De[Le]&&Gt(Le)&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,Le)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Le)))return!1;if(y&&!Re[Le]){let p=V(S)||S.parentNode,f=se(S)||S.childNodes;if(f&&p){let k=f.length;for(let R=k-1;R>=0;--R){let z=C(f[R],!0);z.__removalCount=(S.__removalCount||0)+1,p.insertBefore(z,H(S))}}}return kt(S),!0}return S instanceof a&&!Yt(S)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&sn(/<\/no(script|embed|frames)/i,S.innerHTML)?(kt(S),!0):(we&&S.nodeType===Wo.text&&(J=S.textContent,ci([U,Q,Se],p=>{J=jo(J,p," ")}),S.textContent!==J&&(Fo(t.removed,{element:S.cloneNode()}),S.textContent=J)),Dt(K.afterSanitizeElements,S,null),!1)},Ct=function(S,J,Le){if(Ne&&(J==="id"||J==="name")&&(Le in n||Le in bt))return!1;if(!(ae&&!lt[J]&&sn(be,J))){if(!(O&&sn(ce,J))){if(!(ot.attributeCheck instanceof Function&&ot.attributeCheck(J,S))){if(!de[J]||lt[J]){if(!(Gt(S)&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,S)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(S))&&(pe.attributeNameCheck instanceof RegExp&&sn(pe.attributeNameCheck,J)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(J,S))||J==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&sn(pe.tagNameCheck,Le)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Le))))return!1}else if(!vt[J]){if(!sn(x,jo(Le,ye,""))){if(!((J==="src"||J==="xlink:href"||J==="href")&&S!=="script"&&Sg(Le,"data:")===0&&Ke[S])){if(!(le&&!sn(q,jo(Le,ye,"")))){if(Le)return!1}}}}}}}return!0},Gt=function(S){return S!=="annotation-xml"&&qa(S,xe)},Pt=function(S){Dt(K.beforeSanitizeAttributes,S,null);let{attributes:J}=S;if(!J||nn(S))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},p=J.length;for(;p--;){let f=J[p],{name:k,namespaceURI:R,value:z}=f,re=ze(k),fe=z,ve=k==="value"?fe:Eg(fe);if(Le.attrName=re,Le.attrValue=ve,Le.keepAttr=!0,Le.forceKeepAttr=void 0,Dt(K.uponSanitizeAttribute,S,Le),ve=Le.attrValue,ct&&(re==="id"||re==="name")&&(Mt(k,S),ve=Ze+ve),ue&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,ve)){Mt(k,S);continue}if(re==="attributename"&&qa(ve,"href")){Mt(k,S);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){Mt(k,S);continue}if(!ie&&sn(/\/>/i,ve)){Mt(k,S);continue}we&&ci([U,Q,Se],_t=>{ve=jo(ve,_t," ")});let Ye=ze(S.nodeName);if(!Ct(Ye,re,ve)){Mt(k,S);continue}if(N&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!R)switch(m.getAttributeType(Ye,re)){case"TrustedHTML":{ve=N.createHTML(ve);break}case"TrustedScriptURL":{ve=N.createScriptURL(ve);break}}if(ve!==fe)try{R?S.setAttributeNS(R,k,ve):S.setAttribute(k,ve),nn(S)?kt(S):ed(t.removed)}catch{Mt(k,S)}}Dt(K.afterSanitizeAttributes,S,null)},St=function me(S){let J=null,Le=Xt(S);for(Dt(K.beforeSanitizeShadowDOM,S,null);J=Le.nextNode();)Dt(K.uponSanitizeShadowNode,J,null),Qt(J),Pt(J),J.content instanceof s&&me(J.content);Dt(K.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(me){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},J=null,Le=null,p=null,f=null;if(ee=!me,ee&&(me="<!-->"),typeof me!="string"&&!Ht(me))if(typeof me.toString=="function"){if(me=me.toString(),typeof me!="string")throw Bo("dirty is not a string, aborting")}else throw Bo("toString is not a function");if(!t.isSupported)return me;if(He||xt(S),t.removed=[],typeof me=="string"&&(W=!1),W){if(me.nodeName){let z=ze(me.nodeName);if(!oe[z]||De[z])throw Bo("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof l)J=Vt("<!---->"),Le=J.ownerDocument.importNode(me,!0),Le.nodeType===Wo.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?J=Le:J.appendChild(Le);else{if(!Pe&&!we&&!Fe&&me.indexOf("<")===-1)return N&&j?N.createHTML(me):me;if(J=Vt(me),!J)return Pe?null:j?L:""}J&&Qe&&kt(J.firstChild);let k=Xt(W?me:J);for(;p=k.nextNode();)Qt(p),Pt(p),p.content instanceof s&&St(p.content);if(W)return me;if(Pe){if(Y)for(f=X.call(J.ownerDocument);J.firstChild;)f.appendChild(J.firstChild);else f=J;return(de.shadowroot||de.shadowrootmode)&&(f=P.call(r,f,!0)),f}let R=Fe?J.outerHTML:J.innerHTML;return Fe&&oe["!doctype"]&&J.ownerDocument&&J.ownerDocument.doctype&&J.ownerDocument.doctype.name&&sn(cd,J.ownerDocument.doctype.name)&&(R="<!DOCTYPE "+J.ownerDocument.doctype.name+`>
`+R),we&&ci([U,Q,Se],z=>{R=jo(R,z," ")}),N&&j?N.createHTML(R):R},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(me),He=!0},t.clearConfig=function(){et=null,He=!1},t.isValidAttribute=function(me,S,J){et||xt({});let Le=ze(me),p=ze(S);return Ct(Le,p,J)},t.addHook=function(me,S){typeof S=="function"&&Fo(K[me],S)},t.removeHook=function(me,S){if(S!==void 0){let J=xg(K[me],S);return J===-1?void 0:Ag(K[me],J,1)[0]}return ed(K[me])},t.removeHooks=function(me){K[me]=[]},t.removeAllHooks=function(){K=id()},t}var dd=ud();var Xn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},pi=e=>(...t)=>({_$litDirective$:e,values:t}),to=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var zo=class extends to{constructor(t){if(super(t),this.it=Ot,t.type!==Xn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};zo.directiveName="unsafeHTML",zo.resultType=1;var pd=pi(zo);function Va(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xr=Va();function yd(e){xr=e}var Yo={exec:()=>null};function ht(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Ug=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Wg=/^(?:[ \t]*(?:\n|$))+/,zg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Hg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Gg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Xa=/(?:[*+-]|\d{1,9}[.)])/,vd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,wd=ht(vd).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Kg=ht(vd).replace(/bull/g,Xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Qa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Yg=/^[^\n]+/,Za=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Vg=ht(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Za).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xg=ht(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Xa).getRegex(),bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ja=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Qg=ht("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ja).replace("tag",bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),kd=ht(Qa).replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),Zg=ht(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",kd).getRegex(),el={blockquote:Zg,code:zg,def:Vg,fences:Hg,heading:Gg,hr:Vo,html:Qg,lheading:wd,list:Xg,newline:Wg,paragraph:kd,table:Yo,text:Yg},fd=ht("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),Jg={...el,lheading:Kg,table:fd,paragraph:ht(Qa).replace("hr",Vo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",fd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex()},eh={...el,html:ht(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ja).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ht(Qa).replace("hr",Vo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",wd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},th=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,nh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$d=/^( {2,}|\\)\n(?!\s*$)/,rh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,yi=/[\p{P}\p{S}]/u,tl=/[\s\p{P}\p{S}]/u,xd=/[^\s\p{P}\p{S}]/u,oh=ht(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,tl).getRegex(),Ad=/(?!~)[\p{P}\p{S}]/u,sh=/(?!~)[\s\p{P}\p{S}]/u,ih=/(?:[^\s\p{P}\p{S}]|~)/u,ah=ht(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ug?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Sd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,lh=ht(Sd,"u").replace(/punct/g,yi).getRegex(),ch=ht(Sd,"u").replace(/punct/g,Ad).getRegex(),Ed="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",uh=ht(Ed,"gu").replace(/notPunctSpace/g,xd).replace(/punctSpace/g,tl).replace(/punct/g,yi).getRegex(),dh=ht(Ed,"gu").replace(/notPunctSpace/g,ih).replace(/punctSpace/g,sh).replace(/punct/g,Ad).getRegex(),ph=ht("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xd).replace(/punctSpace/g,tl).replace(/punct/g,yi).getRegex(),fh=ht(/\\(punct)/,"gu").replace(/punct/g,yi).getRegex(),_h=ht(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),mh=ht(Ja).replace("(?:-->|$)","-->").getRegex(),gh=ht("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",mh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,hh=ht(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Td=ht(/^!?\[(label)\]\[(ref)\]/).replace("label",mi).replace("ref",Za).getRegex(),Cd=ht(/^!?\[(ref)\](?:\[\])?/).replace("ref",Za).getRegex(),bh=ht("reflink|nolink(?!\\()","g").replace("reflink",Td).replace("nolink",Cd).getRegex(),_d=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,nl={_backpedal:Yo,anyPunctuation:fh,autolink:_h,blockSkip:ah,br:$d,code:nh,del:Yo,emStrongLDelim:lh,emStrongRDelimAst:uh,emStrongRDelimUnd:ph,escape:th,link:hh,nolink:Cd,punctuation:oh,reflink:Td,reflinkSearch:bh,tag:gh,text:rh,url:Yo},yh={...nl,link:ht(/^!?\[(label)\]\((.*?)\)/).replace("label",mi).getRegex(),reflink:ht(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mi).getRegex()},Ga={...nl,emStrongRDelimAst:dh,emStrongLDelim:ch,url:ht(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",_d).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ht(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",_d).getRegex()},vh={...Ga,br:ht($d).replace("{2,}","*").getRegex(),text:ht(Ga.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fi={normal:el,gfm:Jg,pedantic:eh},Ho={normal:nl,gfm:Ga,breaks:vh,pedantic:yh},wh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},md=e=>wh[e];function Qn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,md)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,md);return e}function gd(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function hd(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function Go(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function kh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function bd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function $h(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var gi=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||xr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Go(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=$h(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Go(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Go(t[0],`
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
`,e=e.substring(h.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(w),F=this.rules.other.hrRegex(w),H=this.rules.other.fencesBeginRegex(w),se=this.rules.other.headingBeginRegex(w),V=this.rules.other.htmlBeginRegex(w);for(;e;){let N=e.split(`
`,1)[0],L;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),H.test(h)||se.test(h)||V.test(h)||C.test(h)||F.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=w||!h.trim())d+=`
`+L.slice(w);else{if(m||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(_)||se.test(_)||F.test(_))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=N+`
`,e=e.substring(N.length+1),_=L.slice(w)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=hd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(hd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Go(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=kh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),bd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return bd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,_=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=_.slice(1,-1);return{type:"em",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Sn=class Ka{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xr,this.options.tokenizer=this.options.tokenizer||new gi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:cn,block:fi.normal,inline:Ho.normal};this.options.pedantic?(n.block=fi.pedantic,n.inline=Ho.pedantic):this.options.gfm&&(n.block=fi.gfm,this.options.breaks?n.inline=Ho.breaks:n.inline=Ho.gfm),this.tokenizer.rules=n}static get rules(){return{block:fi,inline:Ho}}static lex(t,n){return new Ka(n).lex(t)}static lexInline(t,n){return new Ka(n).inlineTokens(t)}lex(t){t=t.replace(cn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},hi=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||xr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(cn.notSpaceStart)?.[0],o=e.replace(cn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Qn(r)+'">'+(n?o:Qn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Qn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=gd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Qn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=gd(e);if(o===null)return Qn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Qn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},rl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},En=class Ya{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||xr,this.options.renderer=this.options.renderer||new hi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new rl}static parse(t,n){return new Ya(n).parse(t)}static parseInline(t,n){return new Ya(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},_i,Ko=(_i=class{constructor(e){At(this,"options");At(this,"block");this.options=e||xr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Sn.lex:Sn.lexInline}provideParser(){return this.block?En.parse:En.parseInline}},At(_i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(_i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_i),xh=class{constructor(...e){At(this,"defaults",Va());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",En);At(this,"Renderer",hi);At(this,"TextRenderer",rl);At(this,"Lexer",Sn);At(this,"Tokenizer",gi);At(this,"Hooks",Ko);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new hi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new gi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Ko;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Ko.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Ko.passThroughHooksRespectAsync.has(s))return(async()=>{let _=await l.call(o,u);return a.call(o,_)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(o,u);return _===!1&&(_=await a.apply(o,u)),_})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Sn.lex(e,t??this.defaults)}parser(e,t){return En.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?En.parse:En.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Sn.lex:Sn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?En.parse:En.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},$r=new xh;function yt(e,t){return $r.parse(e,t)}yt.options=yt.setOptions=function(e){return $r.setOptions(e),yt.defaults=$r.defaults,yd(yt.defaults),yt};yt.getDefaults=Va;yt.defaults=xr;yt.use=function(...e){return $r.use(...e),yt.defaults=$r.defaults,yd(yt.defaults),yt};yt.walkTokens=function(e,t){return $r.walkTokens(e,t)};yt.parseInline=$r.parseInline;yt.Parser=En;yt.parser=En.parse;yt.Renderer=hi;yt.TextRenderer=rl;yt.Lexer=Sn;yt.lexer=Sn.lex;yt.Tokenizer=gi;yt.Hooks=Ko;yt.parse=yt;var O$=yt.options,L$=yt.setOptions,I$=yt.use,M$=yt.walkTokens,D$=yt.parseInline;var P$=En.parse,N$=Sn.lex;function ar(e){let t=yt.parse(e),n=dd.sanitize(t);return pd(n)}function Zn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function no(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function vi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Od={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ah={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Sh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Eh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Tn(e){return!!e&&typeof e=="object"}function ol(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function sl(e,t){let n=ol(e),r=ol(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Ld(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Tn(o)&&typeof o.text=="string"?o.text:"").join(""):Tn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Th(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Od[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ol(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=sl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=sl(Tn(l)?l.old_string:"",Tn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function il(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Ch=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Id(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Tn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Ch,"").trim();return n.length>0?{kind:"user",text:n}:null}function al(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Sh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Eh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Rh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Oh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Tn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(al(i.text));else if(i.type==="thinking"){let l=il(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Th(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Rd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Tn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Ld(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Id(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Rd([o],n):[o]}return[]}function Rd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Lh(e){let t=typeof e.command=="string"?e.command:"",n=Ld(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Od.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Ih(e){if(e.type==="item.completed"&&Tn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[al(t.text)];if(t.type==="user_message"){let n=Id(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=il(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Lh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Mh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Tn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Tn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[al(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=il(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Ah[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Dh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ph(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Tn(t)?t:null}function Md(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Ph(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Rh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Mh(s):Dh(s)?Ih(s):Oh(s,n);return i.length>0&&(r.progress=null),i}}}function ll(e){let t=[],n=Md(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Nh=5,qh=10,Fh=/Task\s+#(\d+)/,jh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Bh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Xo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Uh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Wh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function zh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Fh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Hh(e){if(e.tool==="Bash"){let t=e.command||"";return jh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Bh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Gh(e){let t=e.filter(o=>o.kind==="tool").slice(-qh),n=new Map;t.forEach((o,s)=>{let i=Hh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Kh(e){let t=Wh(e);if(t)return{text:t,guess:!1};let n=zh(e);if(n)return{text:n,guess:!1};let r=Gh(e);return r?{text:r,guess:!0}:null}function Yh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function ro(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,_={},h=!0,m=new Set,w=new Set,C=null,F=null,H=!1,se=!1,V=!1,N=null,L=null;function M(){H=!1,se=!1,V=!1,N=null,L=null}async function B(Y){if(n){se=!0,V=!1,De();try{let j=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...u?{root_dir:u}:{}}));if(s!==Y)return;!j||typeof j!="object"||Array.isArray(j)?V=!0:(N=j,L=Y)}catch{s===Y&&(V=!0)}finally{s===Y&&(se=!1,De())}}}function X(){if(H=!H,H&&s&&L!==s){B(s);return}De()}function ne(){if(!H)return"";let Y=no({loading:se,error:V});if(Y)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=vi(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?c`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function P(){if(!a||!r)return[];let Y=r.get(a);return ll(Y?Y.lines:[])}function K(){if(!a||!r)return null;let Y=r.get(a),j=Y?Y.last_event_at:null;return typeof j=="number"?j:null}function U(){return _.status==="running"}function Q(){if(U()&&s){F||(F=setInterval(()=>De(),1e3));return}Se()}function Se(){F&&(clearInterval(F),F=null)}function be(Y){let j=[],Ne=0;for(;Ne<Y.length;){let{idx:ct,line:Ze}=Y[Ne];if(Ze.kind==="tool"){let y=Ne;for(;y<Y.length&&Y[y].line.kind==="tool"&&Y[y].line.tool===Ze.tool;)y+=1;if(y-Ne>=Nh&&!w.has(ct)){j.push({kind:"group",idx:ct,tool:Ze.tool||"",lines:Y.slice(Ne,y)}),Ne=y;continue}}j.push({kind:"line",idx:ct,line:Ze}),Ne+=1}return j}function ce(Y){let j=[],Ne=new Map;for(let y=0;y<Y.length;y+=1){let W=Y[y],Te=W.parent_tool_use_id;if(typeof Te=="string"&&Te.length>0){let Re=Ne.get(Te);Re||(Re={kind:"subagent",idx:y,launch_id:Te,agent_type:null,header:null,lines:[]},Ne.set(Te,Re),j.push(Re)),Re.lines.push({idx:y,line:W});continue}if(W.kind==="tool"&&W.tool==="Agent"&&typeof W.launch_id=="string"&&W.launch_id.length>0){let Re=q(W),je=Ne.get(W.launch_id);if(je){je.header={idx:y,line:W},je.agent_type=Re;continue}let Ke={kind:"subagent",idx:y,launch_id:W.launch_id,agent_type:Re,header:{idx:y,line:W},lines:[]};Ne.set(W.launch_id,Ke),j.push(Ke);continue}j.push({kind:"entry",idx:y,line:W})}let ct=[],Ze=0;for(;Ze<j.length;){if(j[Ze].kind!=="entry"){ct.push(j[Ze]),Ze+=1;continue}let y=Ze;for(;y<j.length&&j[y].kind==="entry";)y+=1;ct.push(...be(j.slice(Ze,y))),Ze=y}return ct}function q(Y){let j=Y.input;return j&&typeof j.subagent_type=="string"?j.subagent_type:null}function ye(Y){for(let j=Y.length-1;j>=0;j-=1){let Ne=Y[j];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function xe(Y){for(let j=Y.length-1;j>=0;j-=1)if(Y[j].kind==="thinking")return Y[j];return null}function x(Y,j){if(j.kind==="gate")return c`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return c`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return c`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ar(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let Ne=m.has(Y);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(Y)}
      >
        <span class="sv__think-line">💭 ${Xo(j.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="user"){let Ne=m.has(Y);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(Y)}
      >
        <span class="sv__user-line">▷ ${Xo(j.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return c`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let Ne=m.has(Y),ct=j.tool==="Bash"?Uh(j.command):0,Ze=j.tool==="Bash"?ct>1?Xo(j.command):j.command:j.path||j.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ot(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${Ze?c`<span class="sv__tool-detail">${Ze}</span>`:""}
          ${ct>1?c`<span class="sv__tool-more">⋯ ${ct}줄</span>`:""}
          ${typeof j.added=="number"?c`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?c`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?c`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${oe(j)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ar(j.text||"")}</div>`}function oe(Y){let j=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)j.push(Y.command);else if(Y.input!==void 0)try{j.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&j.push(`output:
${Y.output}`),j.join(`

`)}function $e(){if(!s)return c``;let Y=P(),j=(i?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Ne=_.session_id||"",ct=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Ze=U(),y=Ze?Yh(K(),Date.now()):"",W=Ze?ye(Y):null,Te=Ze?xe(Y):null,Re=Kh(Y);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(i?_.role||"":s)}</span
        >
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${Ze?c`<span
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
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${X}
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
        ${Y.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ce(Y).map(je=>je.kind==="subagent"?Oe(je):je.kind==="group"?de(je):x(je.idx,je.line))}
      </div>
      ${W||Te?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${W?c`<span class="sv__now-icon">${W.icon}</span>
                  <span class="sv__now-name">${W.tool}</span>
                  <span class="sv__now-detail"
                    >${W.tool==="Bash"?Xo(W.command):W.path||W.command||""}</span
                  >`:""}
            ${Te?c`<span class="sv__now-think"
                  >💭 ${Xo(Te.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function de(Y){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(Y){let j=w.has(Y.idx),Ne=Y.header?Y.header.line:null,ct=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",Ze=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${j?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${Ze?c`<span class="sv__sub-detail">${Ze}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${ct?c`<span class="sv__sub-state">${ct}</span>`:""}
        ${j?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${j?c`<div class="sv__sub-body">
            ${be(Y.lines).map(y=>y.kind==="group"?de(y):x(y.idx,y.line))}
          </div>`:""}
    </div>`}function pe(Y){w.add(Y),De()}function De(){rt($e(),e),Q(),h&&lt()}function lt(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function ot(Y){m.has(Y)?m.delete(Y):m.add(Y),De()}function O(){h=!h,De()}function ae(Y){on(Y).then(j=>{j?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function le(Y){!s||!Y||(_={..._,...Y},De())}function ie(Y){let j=Y.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&h&&(h=!1,De())}e.addEventListener("scroll",ie,!0);function we(Y){let j=Y.target;!j||typeof j.closest!="function"||e.contains(j)||j.closest("dialog")||j.closest(".md-viewer-root")||Pe()}let ue=!1;function Fe(){ue||(document.addEventListener("mousedown",we),ue=!0)}function He(){ue&&(document.removeEventListener("mousedown",we),ue=!1)}function Qe(Y){let j=Y&&Y.attempt_id;if(!j)return;let Ne=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,ct=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(Ne&&ct)return;let Ze=a;s=j,i=Ne,l=ct,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Ze&&Ze!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Ze})).catch(()=>{}),u=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,_=Y.meta||{},d=Y.hide_prompt===!0,h=!0,m.clear(),w.clear(),M(),!C&&r&&(C=r.subscribe(De)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Fe(),De()}function Pe(){let Y=a;He(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),w.clear(),M(),Se(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),rt(c``,e),o&&o()}return{open:Qe,updateMeta:le,close:Pe,isOpen(){return s!==null},destroy(){Se(),He(),C&&(C(),C=null),e.removeEventListener("scroll",ie,!0),s=null,i=null,l=null,a=null,u=null,d=!1,rt(c``,e)}}}function Vh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Xh(e){let t=e&&e.metadata||{},n=Dr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Vh(t)?null:"plan_pending"}),r}function Dd(e,t){let n=Xh(e);return c`
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
  `}var Qh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Zh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Jh=/^\*\*결론\*\* — (.+)$/;function wi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Qh)return null;let n=Zh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Jh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Pd=20;function Nd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function eb(e){return e.length>Pd?`${e.slice(0,Pd)}\u2026`:e}function tb(e,t,n,r){let o=`${t.lane} ${eb(t.identifier)}`;return c`<div class="detail-report">
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
          ${ar(t.body)}
        </div>`:""}
  </div>`}function nb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Nd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ar(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function qd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=wi(typeof a.text=="string"?a.text:"");return u?tb(a,u,t,o.has(a.id)):nb(a)})}
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
  `}var{I:hx}=Pl;var Fd=e=>e.strings===void 0;var rb={},jd=(e,t=rb)=>e._$AH=t;var Ar=pi(class extends to{constructor(e){if(super(e),e.type!==Xn.PROPERTY&&e.type!==Xn.ATTRIBUTE&&e.type!==Xn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Fd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Ot)return t;let n=e.element,r=e.name;if(e.type===Xn.PROPERTY){if(t===n[r])return yn}else if(e.type===Xn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Xn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return jd(e),t}});var ob=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],cl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Bd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},sb={pin:"pin",global:"global",base:"base"};function ib(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${sb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ab(e,t,n){switch(e){case"workflow_mode":return wo;case"spec_review_model":case"impl_review_model":return ko;case"plan_review_model":return Os;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ls;case"impl_dispatch":return zc;case"impl_runtime":return Rs;case"impl_model":return Yr(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return vo;case"orchestration_model":return $o(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||gn).filter(r=>r!==gn);default:return[]}}function lb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${ib(e.source)}
    <span class="detail-effective__k"
      >${rr[e.key]||e.key}</span
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
          aria-label=${`${rr[e.key]||e.key} \uD3B8\uC9D1`}
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
        >${cb(s)}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ss({key:u.key,choices:ab(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return lb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function cb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ub(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Wd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=ub(r.exec_receipt),u=a?Un(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],_=xs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",w=Ao(n),C=w!==null&&t.isChipOpen?.("rec")===!0,F=C?$a({rec:w},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${db(s).map(H=>pb(H,n,o,{label:H.id==="pr"?m:H.label,href:H.id==="pr"?i:""}))}
    </div>
  </section>`}function db(e){let n=typeof e=="string"&&Object.hasOwn(cl,e)&&cl[e]||cl.spec_backed;return ob.filter(r=>n.includes(r.id))}var ki={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function pb(e,t,n,r){let o=fb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",_=u?ki.stale:l?ki.on:a?ki.current:ki.none,h=_b(e,n),m=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,w=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
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
  >`}function fb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function _b(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Bd,n)?Bd[n]:""}function $i(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zd(e){return $i(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Hd(e,t){let n=e&&e[t];if(!$i(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(zd),o=zd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Yd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function xi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Yd(e)}${t}`}function oo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Yd(e)}`}function mb(e,t,n){if(n!==null){let o=e==="claude"?xi:oo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:oo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Gd(e,t){if(!$i(e)||e.state!=="usable"||!$i(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Kd(e){let t=e.provider_key==="claude"?xi:oo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${mb(e.provider_key,e.provider,e.workspace_default)}
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
  </section>`}function gb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function hb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ai(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${gb(o)}</span
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
                        >`}${ar(i)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){rt(d(),e)}async function h(C,F={}){o=C,s="loading",i="",l=null,a="",_();let H=F.workspace||(n?n():"");if(!H){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let se="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(C);try{let V=await r(se),N=await V.json().catch(()=>({}));if(!V.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&F.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||V.status)+")",_();return}let L=hb(String(N.content||""));l=L.front,i=L.body,s="ready",_()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function m(){o=null,rt(c``,e)}function w(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:w}}var bb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Zd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Si=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],yb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Xd(e){return typeof e=="string"&&yb.has(e)}var vb=["running","done","failed","interrupted"],wb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function kb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function $b(e){let t=Jt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=zr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Zd}
          >부분 집계</span
        >`:""}`}function Qd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function pl(e){if(typeof e=="number")return Qo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Qo(t):""}function xb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Ab(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ul(e){return e===null||typeof e=="string"&&e.trim().length>0}function dl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Sb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Si.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ul(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ul(t.effort))||!(!("agent_type"in t)||ul(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!vb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!dl(t.started_at)||!dl(t.last_event_at)||!dl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Eb(e,t,n){let o=Jt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Tb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Jt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Qo(e.last_event_at):o?pl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,xb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Ab(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${wb[e.status]}</span
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
  </button>`}function Cb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Rb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let _=Sb(d);!_||o.has(_.launch_id)||Xd(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let i={};for(let{role:d,provider:_}of Si){let h=t?t.roles[d]?.[_]:null;i[d]=h?[...h.legs]:[]}let l=Si.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:_}of Si){for(let h of r.filter(m=>m.role===d&&m.provider===_)){let m=l.find(w=>w.receipt_id===h.launch_id)||null;m&&!Cb(h,m)||(m&&a.add(m.receipt_id),u.push(Tb(h,m,e.attempt_id,n)))}for(let h of i[d])!a.has(h.receipt_id)&&!Xd(h.agent_type)&&u.push(Eb(d,_,h))}return u}function Ob(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...bb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${kb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Zd}</span>`:""}
  </div>`}var Lb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Qo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ib(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Mb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Db(e,t){let n=Mb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function Jd(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,w)=>w.index-m.index)],l=i.map(m=>Db(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,F=u.has(m.attempt_id),H=C&&!F,se=C?F?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!H}
      title=${se}
      @click=${V=>{V.stopPropagation(),H&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,F=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${F}>
      ${m.cause}
    </div>`},h=m=>{let w=Qd(aa(m));if(Jt(w).length===0&&!zr(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
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
      세션 이력${$b(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let w=aa(m),C=Qd(w),F=Jt(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Lb[m.status||""]||"\xB7"}</span
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
            ${F.length>0?F.map(H=>c`<span
                      class="detail-session__usage"
                      title=${H.tooltip}
                      >${H.label}</span
                    >`):zr(m.usage)?c`<span class="detail-session__usage"
                    >${zr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Qo(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${_(m)} ${Ib(m)}
          ${a.has(m.attempt_id)&&m.usage?Ob(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Rb(m,w,t)}
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
          ${Pb(e)}
        </div>`:""}
  `}function Pb(e){let t=no(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Zn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=vi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Sr=10;function tp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function np(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Sr,s=r.slice(0,o),i=r.length-s.length;return c`
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
  `}var Nb=["open","in_progress","deferred","resolved","closed"],qb=[0,1,2,3,4];function rp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,_={},h="",m=!1,w=[],C=!1,F={},H={claude:null,codex:null},se=null,V=null,N=0,L=!1,M=!1,B="",X="",ne="",P="",K=!1;function U(){L=!1,M=!1,B="",X="",ne="",P="",K=!1}function Q(){H={claude:null,codex:null},se=null,V=null,N+=1}async function Se(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function be(v){try{let Z=await fetch(v);if(!Z.ok)return null;let D=await Z.json();if(!D||typeof D!="object"||!Array.isArray(D.accounts))return null;let ke=D.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:ke,active:ke.find(tt=>tt.active===!0)||null}}catch{return null}}async function ce(v){V=v;let Z=++N,[D,ke,tt]=await Promise.all([be("/api/claude-usage"),be("/api/codex-usage"),Se()]);Z!==N||v!==u||(H={claude:D,codex:ke},se=tt,st())}let q=[],ye=null,xe=null,x=!1,oe="",$e=!1,de=0,Oe=new Set;function pe(){q=[],ye=null,xe=null,x=!1,oe="",$e=!1,de+=1,Oe.clear()}async function De(v){if(!o)return;let Z=++de;try{let D=await Promise.resolve(o("get-comments",{id:v}));if(Z!==de||v!==u)return;q=Array.isArray(D)?D:[],x=!1}catch{if(Z!==de||v!==u)return;x=!0}st()}function lt(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ye!==u){ye=u,xe=v,De(u);return}v!==null&&v!==xe&&(xe=v,De(u))}function ot(v){Oe.has(v)?Oe.delete(v):Oe.add(v),st()}function O(v){let Z=oe.trim().length===0;oe=v,Z!==(v.trim().length===0)&&st()}async function ae(){let v=oe.trim();if(!o||!u||v.length===0||$e)return;let Z=u;$e=!0,st();let D=!1;try{let ke=await Promise.resolve(o("add-comment",{id:Z,text:v}));Array.isArray(ke)&&ke.length>0&&(D=!0,Z===u&&(q=ke,x=!1,oe="",xe=ke.length))}catch{D=!1}D||he("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Z===u&&($e=!1),st()}let le={onToggle:ot,onDraftInput:O,onSubmit:ae},ie=t.mdViewer||null,we=null;ie||(we=document.createElement("div"),we.className="md-viewer-root",document.body.appendChild(we));let ue=ie||Ai(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let He=ro(Fe,{transport:o?(v,Z)=>Promise.resolve(o(v,Z)):void 0,sessionLogStore:a}),Qe=!1,Pe=!1,Y=!1,j=null,Ne=null,ct=0;function Ze(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function y(){Qe=!1,Pe=!1,Y=!1,j=null,Ne=null,ct+=1}async function W(v){if(!o)return;let Z=++ct;Pe=!0,Y=!1,st();try{let D=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(Z!==ct)return;!D||typeof D!="object"||Array.isArray(D)?Y=!0:(j=D,Ne=Ze(v))}catch{Z===ct&&(Y=!0)}finally{Z===ct&&(Pe=!1,st())}}let Te=[],Re=null,je=0;function Ke(v,Z){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${Z}`}function dt(){Te=[],Re=null,je+=1}async function vt(v,Z){if(!o)return;let D=++je,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{ke=null}D!==je||Z!==Re||(Te=ke&&Array.isArray(ke.sessions)?ke.sessions:[],st())}function It(){if(!o||!u)return;let v=d&&d.metadata,Z=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(Z===null){dt();return}let D=Ke(u,Z);Re!==D&&(Te=[],Re=D,vt(u,D))}let wt=[],mt=Sr,Be=null,I=0;function ee(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function ge(){wt=[],mt=Sr,Be=null,I+=1}async function T(v,Z){if(!o)return;let D=++I,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{ke=null}D!==I||Z!==Be||(wt=ke&&Array.isArray(ke.events)?ke.events:[],mt=Sr,st())}function G(){if(!o||!u)return;let v=ee(u);Be!==v&&(wt=[],mt=Sr,Be=v,T(u,v))}function Ie(){mt+=Sr,st()}function Ue(){if(Qe=!Qe,Qe&&u&&Ne!==Ze(u)){j=null,W(u);return}st()}function qe(){if(!i||!u)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(D=>D&&D.bead_id===u).sort((D,ke)=>(ke.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]}))}function Je(){if(!i||!u)return null;let v=i.get();return Hn(v&&v.attempts||{},u)}let Ce=new Set;function ze(v){Ce.has(v)?Ce.delete(v):Ce.add(v),st()}function et(v){let Z=i?i.get():null,D=Z&&Z.attempts?Z.attempts[v]:null;He.open({attempt_id:v,meta:D?{runner:D.runner||void 0,model:D.model||void 0,effort:D.effort||void 0,status:D.status||void 0,session_id:D.session_id||void 0}:{}})}function bt(v,Z){let D=i?i.get():null,ke=D&&D.attempts?D.attempts[v]:null,nt=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(gt=>gt&&typeof gt=="object"&&gt.launch_id===Z);nt&&He.open({attempt_id:v,launch_id:Z,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function We(v){if(!o||!v)return;let Z=await Br();if(Z===null)return;let D=()=>{let gt=i?i.get():null;return gt&&typeof gt.revision=="number"?gt.revision:0},ke=async(gt={},Ve=D())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Ve,...Z!==""?{instructions:Z}:{},...gt}),tt=gt=>{gt?.queue&&i?.set&&i.set(gt.queue)},nt=await ke();if(tt(nt),nt&&nt.conflict){let gt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:D();nt=await ke({},gt),tt(nt)}nt=await Wn(nt,(gt,Ve)=>ke({continuation:gt,decision_token:Ve}),{onResult:tt,refresh:()=>ke()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&he(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function xt(v){!v||!u||He.open(Ur(v,u,d&&d.status))}let Ft={onOpen:et,onOpenDelegation:bt,onResume:We,onToggleUsage:ze,onOpenSessionRef:xt,onCopyResumeCommand:Le};function it(){let v=i?i.get():null,Z={...F};for(let D of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=v&&v[D];typeof ke=="string"&&(Z[D]=ke)}return Z}async function Yt(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));F=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{F={}}st()}}function kt(){let v=i?i.get():null;return v&&v.runner_catalog||null}function Mt(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Vt(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},D=_n({pin:{...v,..._},global:it(),execution_defaults:Mt(),runner_catalog:kt(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return $n(kt(),D)}function Xt(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function nn(v){return v?.compatible===!1}function Ht(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Dt(){let v=Xt(),Z=v?.presets.find(D=>D.id===h);if(!(!o||!u||!v||!Z||nn(Z)||m)){m=!0,w=[],st();try{let D=await Promise.resolve(o("apply-impl-preset",Jc(u,Z.id,v.revision)));if(D&&D.conflict){Ht(D),he("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=D&&Array.isArray(D.issue)?D.issue[0]:D?.issue;if(D&&D.applied&&ke&&typeof ke=="object"){d=ke,w=Array.isArray(D.skipped_orchestration_keys)?D.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of eu)delete _[tt];he(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}D&&D.error==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(D){D&&typeof D=="object"&&D.code==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,st()}}}let Qt=null;n&&n.subscribe&&(Qt=n.subscribe(()=>J()));let Ct=null;i&&typeof i.subscribe=="function"&&(Ct=i.subscribe(()=>{u&&st()}));let Gt=null,Pt=null;function St(){Pt&&(Pt(),Pt=null)}l&&typeof l.subscribe=="function"&&(Gt=l.subscribe(()=>{u&&st()}));function me(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",me);let S=Hr(()=>st());S.attach();function J(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(D=>D&&D.id===u)||v[0]||d}lt(),It(),G(),st()}}function Le(v){on(v).then(Z=>{Z?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function p(v){v.preventDefault(),v.stopPropagation(),u&&Le(u)}function f(v,Z){v.preventDefault(),v.stopPropagation(),Le(Z)}function k(v,Z,D){v.preventDefault(),v.stopPropagation(),ue.open(Z,{missing_state:D})}async function R(v,Z){let D=Object.hasOwn(_,v),ke=_[v];if(_[v]=Z,st(),!(!o||!u))try{let tt=await Promise.resolve(o("update-exec-settings",Zc(u,v,Z.length===0?null:Z))),nt=Array.isArray(tt)?tt[0]:tt;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete _[v],st()}catch(tt){throw D?_[v]=ke:delete _[v],st(),he("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),tt}}function z(v){v.catch(()=>{})}async function re(v,Z){let D=d||{},ke=D.metadata&&typeof D.metadata=="object"?D.metadata:{},tt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])tt[Ve]=Object.hasOwn(_,Ve)?_[Ve]:typeof ke[Ve]=="string"?ke[Ve]:"";tt[v]=Z;let nt=ru(tt,kt(),Vt()),gt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])gt[Ve]=_[Ve],_[Ve]=nt[Ve]||"";if(st(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:Vt()})).then(Ve=>{let ut=Array.isArray(Ve)?Ve[0]:Ve;if(!ut||typeof ut!="object"||!ut.id)throw new Error("implementation target readback failed");d=ut;for(let wn of["impl_runtime","impl_model","impl_effort"])delete _[wn];st()}).catch(Ve=>{for(let ut of["impl_runtime","impl_model","impl_effort"])gt[ut]===void 0?delete _[ut]:_[ut]=gt[ut];throw st(),he("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function fe(v,Z,D){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(v,Z)),tt=Array.isArray(ke)?ke[0]:ke;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(he(D,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(he("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(he(D,"error"),!1)}}function ve(v){setTimeout(()=>{try{let Z=e.querySelector(v);Z&&typeof Z.focus=="function"&&Z.focus()}catch{}},0)}function Ye(){L=!0,B=d&&d.title||"",st(),ve('.detail-edit__input[data-edit="title"]')}function _t(v){B=v.target.value}function ft(){L=!1,B="",st()}function Zt(){fe("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(L=!1,B=""),st()})}function $(){M=!0,X=d&&d.description||"",st(),ve('.detail-edit__textarea[data-edit="description"]')}function E(v){X=v.target.value}function Ae(){M=!1,X="",st()}function g(){fe("edit-text",{id:u,field:"description",value:X},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z===!0&&(M=!1,X=""),st()})}function b(v,Z,D,ke){if(v.key==="Escape"){v.stopPropagation(),D();return}v.key==="Enter"&&(!ke||v.ctrlKey||v.metaKey)&&(v.preventDefault(),Z())}function A(v){let Z=v.target.value;fe("update-status",{id:u,status:Z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function te(v){let Z=Number(v.target.value);fe("update-priority",{id:u,priority:Z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function _e(v){ne=v.target.value}function Ee(){let v=ne.trim();v.length!==0&&fe("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Z=>{Z===!0&&(ne=""),st()})}function Ge(v){if(v.key==="Escape"){v.stopPropagation(),ne="",st();return}v.key==="Enter"&&(v.preventDefault(),Ee())}function $t(v){fe("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>st())}let jt={onCopyPath:f,onOpenDoc:k};function Ut(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function dn(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function dr(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function hn(v,Z){let D=Mn(Z),ke=[];return v.length>0&&ke.push(v),D&&ke.push(D),ke.length>0?ke.join(`
`):void 0}function Mn(v){if(!v||typeof v!="object")return;let Z=typeof v.status=="string"?v.status:"",D=typeof v.title=="string"?v.title:"";return Z.length>0&&D.length>0?`${Z} \xB7 ${D}`:void 0}function Dn(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Kt(){return t.depCandidates?t.depCandidates():null}async function Pn(v,Z,D){let ke=Dn(),tt=u;if(!tt)return;if(ke.length===0){he("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await fe(v,{a:tt,b:Z,view_id:tt,root_dir:ke},D),gt=nt===!0||nt!==!1&&nt.saved===!0;gt&&t.onDepChanged&&t.onDepChanged({type:v,a:tt,b:Z}),v==="dep-add"&&gt&&(P="",K=!1),st()}function Nn(v){if(!u)return;let Z=globalThis.confirm;typeof Z=="function"&&!Z(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Pn("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function qn(v){v.disabled||Pn("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Fn(v){P=v.target.value,K=!0,st()}function Jn(){K||(K=!0,st())}function Xe(v,Z){if(v.key==="Escape"){v.stopPropagation(),P="",K=!1,st();return}v.key==="Enter"&&(v.preventDefault(),Z.length===1&&!Z[0].disabled&&qn(Z[0]))}function Nt(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${P}
        @focus=${Jn}
        @input=${Fn}
        @keydown=${Z=>Xe(Z,v)}
      />
      ${K||P.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(Z=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${Z.bead_id}
                      ?disabled=${Z.disabled}
                      title=${tn(Z.reason)}
                      @click=${()=>qn(Z)}
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
    </div>`}function bn(v,Z){let D=Z.get(v.id),ke=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${tn(v.title)}
          @click=${()=>D===void 0?s(v.id):s(v.id,D)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${tn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${s?" detail-dep--link":""}`}
      >${ke}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Nn(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function ns(v){let Z=Array.isArray(v.dependencies)?v.dependencies:[],D=Array.isArray(v.dependents)?v.dependents:[],ke=[];for(let Ve of Z){let ut=Ut(Ve);ut.length>0&&dn(Ve)==="blocks"&&ke.push({id:ut,label:`\u26D3 ${ut}`,kind:"pred",title:hn("\uB9C9\uB294",Ve)})}for(let Ve of D){let ut=Ut(Ve);ut.length>0&&dn(Ve)==="blocks"&&ke.push({id:ut,label:`\u2192 ${ut}`,kind:"succ",title:hn("\uB9C9\uD788\uB294",Ve)})}for(let Ve of Z){let ut=Ut(Ve),wn=dn(Ve);if(ut.length>0&&wn!=="blocks"){let Al=dr(wn);ke.push({id:ut,label:`${Al.glyph}${ut}`,kind:"other",title:hn(Al.relation,Ve)})}}let tt=Kt(),nt=new Map;if(tt)for(let Ve of tt.issues)nt.has(Ve.bead_id)||nt.set(Ve.bead_id,Ve.root_dir);let gt=tt&&u?Zu(Qu(u,tt),P):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(Ve=>bn(Ve,nt))}
          </div>`}
      ${tt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Nt(gt)}
    `}function so(v){let Z=v.metadata||{},D=v.workflow||{},ke=D.stages||{},tt=ke.spec&&ke.spec.stale,nt=ke.impl&&ke.impl.stale,gt=D.quick_fix_review?.state==="stale",Ve=ke.plan||null,ut=D.route_source==="derived",wn=D.route||Z.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ut?" detail-kv__v--derived":""}"
          title=${ut?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ut?"unset":wn}</span
        >
      </div>
      ${D.route!=="quick_fix"||Object.hasOwn(Z,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Z.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${D.route!=="quick_fix"||Object.hasOwn(Z,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Z.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${D.resolver.attempt} \xB7 ${D.resolver.prior_sha} \u2192 ${D.resolver.sha}`}
              >${`${D.resolver.prior_sha.slice(0,7)} \u2192 ${D.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${D.route==="quick_fix"||Object.hasOwn(Z,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Z.quick_fix_review||"\uC5C6\uC74C"}${gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${D.planned_execution.kind}</span>
            </div>
            ${D.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${D.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${D.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Un(D.exec_receipt)}</span
            >
          </div>`:""}
      ${D.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${D.impl_entry.actor}@${D.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Z.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Z.pr_url}</span>
          </div>`:""}
    `}let rs={route:["quick_fix","spec_backed","full_plan"]};async function os(v,Z){let D=Z.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&D!=="full_plan"&&!window.confirm(`full_plan \u2192 ${D||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){st();return}await fe("update-workflow-meta",{id:u,key:v,value:D},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),st()}function io(v){let Z=v.metadata||{};return c` ${((ke,tt)=>{let nt=rs[ke],gt=typeof Z[ke]=="string"?Z[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${Ve=>os(ke,Ve)}
        >
          <option value="" ?selected=${!nt.includes(gt)}>
            ${tt}
          </option>
          ${nt.map(Ve=>c`<option value=${Ve} ?selected=${gt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ss(v,Z){return L?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${_t}
            @keydown=${D=>b(D,Zt,ft,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Zt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ft}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${Jt(Z).map(D=>c`<span class="detail-usage-total" title=${D.tooltip}
              >${D.label}</span
            >`)}
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
    `}function Me(v){let Z=zt(v.created_at),D=zt(v.updated_at);return!Z&&!D?c``:c`
      ${Z?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Z}</span>
          </div>`:""}
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
    `}function Et(v,Z){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${A}
        >
          ${Nb.map(D=>c`<option value=${D} ?selected=${D===v}>${D}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${te}
        >
          ${qb.map(D=>c`<option value=${String(D)} ?selected=${D===Z}>
                P${D}
              </option>`)}
        </select>
      </div>
    `}function Wt(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${M?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${$}
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
              .value=${X}
              @input=${E}
              @keydown=${Z=>b(Z,g,Ae,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${g}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ae}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Bf(v){let Z=typeof v.notes=="string"?v.notes:"";return Z.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Z}</div>
    `}function Uf(v){let Z=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Z.map(D=>c`<span class="detail-label-chip"
              >${D}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${D}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+D}
                @click=${()=>$t(D)}
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
            @input=${_e}
            @keydown=${Ge}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ee}
          >
            추가
          </button>
        </span>
      </div>
    `}function Wf(){if(!u)return c``;let v=d||{},Z=String(v.id||u),D=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Je(),tt=v.status||"open",nt=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",gt=v.description||"",Ve={...v,metadata:{...v.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${p}
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
          ${ss(D,ke)}
          ${Wd(Ve,{onChipToggle:ut=>S.toggle({bead_id:Z,chip_key:ut}),isChipOpen:ut=>S.isOpen({bead_id:Z,chip_key:ut})})}
          ${Ud({metadata:Ve.metadata,workspace_values:it(),catalog:kt(),execution_defaults:Mt(),expanded:C,presets:Xt()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:w},{onToggle:ut=>{C=ut,st()},onEdit:(ut,wn)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){z(re(ut,wn??""));return}z(R(ut,wn??""))},onPresetSelect:ut=>{h=ut,w=[],st()},onPresetApply:()=>{Dt()}})}
          ${Vd({md:Ve.metadata,catalog:H,workspace_defaults:se,handlers:{onExecChange:(ut,wn)=>z(R(ut,wn))}})}
          ${Et(tt,nt)} ${Me(v)}
          ${Wt(gt)}
          ${qd(q,le,{expanded:Oe,draft:oe,sending:$e,error:x})}
          ${Bf(v)} ${Uf(v)} ${ns(v)}
          ${so(v)} ${io(v)}
          ${Dd(v,jt)}
          ${ep({expanded:Qe,loading:Pe,error:Y,data:j},{onToggle:Ue})}
          ${Jd(qe(),Ft,{total:ke,expanded:Ce},Te)}
          ${np({events:wt,shown:mt},{onMore:Ie})}
        </div>
      </div>
    `}function st(){rt(Wf(),e)}return{load(v){v!==u&&(_={},h="",w=[],C=!1,U(),pe(),y(),dt(),ge(),Q()),u=v,d=null,!Pt&&t.subscribeCandidates&&(Pt=t.subscribeCandidates(()=>{u&&st()})),J(),Yt(),V!==v&&ce(v)},clear(){u=null,d=null,_={},h="",m=!1,w=[],C=!1,U(),pe(),y(),dt(),ge(),Q(),St(),ue.close(),He.close(),rt(c``,e)},destroy(){Qt&&(Qt(),Qt=null),Ct&&(Ct(),Ct=null),Gt&&(Gt(),Gt=null),St(),document.removeEventListener("keydown",me),S.detach(),ie||(ue.destroy(),we&&we.parentNode&&we.parentNode.removeChild(we)),He.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,Q(),h="",m=!1,w=[],pe(),y(),dt(),ge(),rt(c``,e)}}}function op(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Fb="(max-width: 640px)";function Ei(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Fb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function jb(){return{lanes:{done:!0},areas:{}}}function Zo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Bb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Zo(r.lanes),areas:Zo(r.areas)}:{lanes:Zo(r),areas:{}}}catch{return null}}function sp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ti(e,t=jb()){let n={lanes:Zo(t.lanes),areas:Zo(t.areas)},r=Bb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},sp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},sp(e,o),i}}}function fl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ci(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ri(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:_,candidate_drop:h}=e,m=[],w=null,C=!1,F=null,H=null,se=null;function V(){F!==null&&clearTimeout(F),F=setTimeout(()=>{F=null,C=!1},0)}function N(){return s()??null}function L(){let O=new Map,ae=o();for(let le of Array.isArray(ae)?ae:[]){if(!le||typeof le!="object")continue;let ie=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[we,ue]of Object.entries(ie))Array.isArray(ue)&&O.set(we,Ci(ue));for(let we of[...Array.isArray(le.runnable)?le.runnable:[],...Array.isArray(le.session_active)?le.session_active:[]])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&O.set(we.bead_id,Ci(we.blocked_by))}return O}function M(){let O=new Map,ae=new Map,le=o();for(let ie of Array.isArray(le)?le:[]){if(!ie||typeof ie!="object")continue;let we=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[ue,Fe]of Object.entries(we))Array.isArray(Fe)&&O.set(ue,Ci(Fe));for(let ue of Array.isArray(ie.runnable)?ie.runnable:[])ue&&typeof ue.bead_id=="string"&&Array.isArray(ue.blocked_by)&&ae.set(ue.bead_id,Ci(ue.blocked_by))}for(let ie of m)for(let we of[O,ae]){let ue=we.get(ie.a);ue!==void 0&&we.set(ie.a,ie.type==="dep-remove"?ue.filter(Fe=>Fe!==ie.b):ue.includes(ie.b)?ue:[...ue,ie.b])}return{snapshot:O,runnable:ae}}function B(){let O=L();for(let ae of m){let le=(O.get(ae.a)||[]).slice();ae.type==="dep-remove"?O.set(ae.a,le.filter(ie=>ie!==ae.b)):le.includes(ae.b)||O.set(ae.a,[...le,ae.b])}return O}function X(O=r(),ae=N()){let le=new Map;for(let Pe of Array.isArray(ae?.lanes)?ae.lanes:[]){let Y=new Map;for(let j of Array.isArray(Pe?.entries)?Pe.entries:[])j&&typeof j.bead_id=="string"&&Y.set(j.bead_id,j.dep_created_by_lane===!0);le.set(typeof Pe?.id=="string"?Pe.id:"",Y)}let ie=new Map,we=new Map,ue=new Set,Fe=new Set;for(let Pe of O.chain_lanes){let Y=le.get(Pe.lane_id);ie.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((j,Ne)=>({bead_id:j.id,root_dir:j.root_dir,...Ne===0?{}:{dep_created_by_lane:Y?.get(j.id)===!0}}))});for(let j of Pe.rows)we.set(j.id,Pe.lane_id),j.fixed&&ue.add(j.id),j.unplaced||Fe.add(j.id)}let He=new Map;for(let Pe of O.parallel_rows)typeof Pe.queue_index=="number"&&He.set(Pe.id,Pe.queue_index);for(let Pe of O.queue_groups)for(let Y of Pe.sublanes.serial)for(let j of Y.items)typeof j.queue_index=="number"&&He.set(j.id,j.queue_index);let Qe=M();return{blocked_by_map:B(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(O.owner_of)),cross_lanes:ie,owner_lane_of:we,fixed_members:ue,placed_members:Fe,parallel_rows:O.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(O.parallel_raw_length)),queue_index_of:He}}function ne(O,ae){let le=r();for(let we of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])if(!(we.non_occupying||we.id!==ae)){if(we.root_dir===O)return we.expected_revision;break}let ie=le.queue_groups.find(we=>we.root_dir===O);return ie?ie.revision:0}async function P(O,ae,le,ie){if(!t)return null;let ue=await t(O,{...ae,...le?{root_dir:le}:{},expected_revision:ie});if(ue&&ue.conflict){ue.queue&&d?.(le,ue.queue);let Fe=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:ie;ue=await t(O,{...ae,...le?{root_dir:le}:{},expected_revision:Fe})}return ue&&ue.queue&&d?.(le,ue.queue),ue}async function K(O,ae,le,ie,we){try{let ue=await P(O,ae,le,ie.get(le)??ne(le,we.bead_id));return!ue||typeof ue.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ue.queue&&typeof ue.queue.revision=="number"&&ie.set(le,ue.queue.revision),ue.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ue.applied===!1?(a(ue.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ue.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:ie.get(le)??0)}catch(ue){return a(fl(ue),"error"),null}}async function U(O,ae,le=new Map){if(O.type==="worker-queue-disarm"){try{let ie=await P(O.type,O.payload,O.root_dir,le.get(O.root_dir)??ne(O.root_dir,ae));ie&&ie.queue&&typeof ie.queue.revision=="number"&&le.set(O.root_dir,ie.queue.revision)}catch{}return!0}if(O.type==="worker-queue-place"||O.type==="worker-queue-reorder"||O.type==="worker-queue-remove")return await K(O.type,O.payload,O.root_dir,le,{bead_id:ae})!==null;try{return(O.type==="dep-add"||O.type==="dep-remove")&&t&&await t(O.type,{a:O.a,b:O.b,...O.root_dir?{root_dir:O.root_dir}:{}}),!0}catch(ie){return a(fl(ie),"error"),!1}}function Q(O){(O.type==="dep-add"||O.type==="dep-remove")&&(m=[...m,{type:O.type,a:O.a,b:O.b}])}async function Se(O,ae){if(!t)return{ok:!1};try{let le=await t(O.type,{...O.payload,expected_revision:ae});return!le||typeof le.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:le.revision}}catch(le){let ie=le,we=ie&&ie.code==="conflict"?ie.details?.cross_lanes:null;return we&&typeof we.revision=="number"&&Array.isArray(we.lanes)?{ok:!1,conflict:we}:(a(fl(le),"error"),{ok:!1})}}async function be(O,ae,le){let ie=new Map,we=[],ue=O.ops.slice(0,O.lane_op_index),Fe=O.ops.slice(O.lane_op_index);for(let Qe of ue){if(!await U(Qe,le,ie))return{done:!0};Q(Qe)}let He=ae;for(let Qe of O.lane_ops){if(He===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await Se(Qe,He);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};He=Pe.revision}for(let Qe of Fe){if(!await U(Qe,le,ie))return{done:!0};Q(Qe),Qe.type==="dep-add"&&we.push(Qe)}for(let Qe of Vu(we))He=await ce(Qe,He);return{done:!0}}async function ce(O,ae){if(ae===null||!t)return ae;let le=O.pairs,ie=ae;for(let we=0;we<2;we+=1){if(le.length===0)return ie;try{let ue=await t("monitor-lane-provenance",{lane_id:O.lane_id,pairs:le.map(Fe=>({bead_id:Fe.bead_id,after:Fe.after,value:!0})),expected_revision:ie});return ue&&typeof ue.revision=="number"?ue.revision:ie}catch(ue){let Fe=ue,He=Fe&&Fe.code==="conflict"?Fe.details?.cross_lanes:null;if(!He||typeof He.revision!="number"||!Array.isArray(He.lanes))return ie;let Qe=He.lanes.find(Pe=>Pe&&Pe.id===O.lane_id);le=Xu(Array.isArray(Qe?.entries)?Qe.entries:[],le),ie=He.revision}}return ie}async function q(O,ae,le=[]){m=le,l("",0);let ie=r(),we=N();for(let ue=0;;ue+=1){let Fe=O(X(ie,we));if("refused"in Fe){a(Fe.refused,"error");break}let He=await be(Fe,ie.cross_lanes_revision,ae);if(He.done){Fe.correction&&l(Fe.correction.lane_id,Fe.correction.corrected);break}if(ue>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=i(He.conflict);ie=Qe.lanes,we=Qe.raw_lanes}m=[],u()}async function ye(O,ae){await q(le=>li(O,ae,le),O.bead_id)}function xe(O,ae){let le=ae&&typeof ae.closest=="function"?ae.closest("[data-row-index]"):null;if(le&&O.contains(le)){let ie=Number(le.getAttribute("data-row-index"));return Number.isFinite(ie)?ie:0}return O.querySelectorAll("[data-row-index]").length}function x(O){let ae=typeof O?.closest=="function"?O.closest(".worker-pane--collapsed[data-lane]"):null;if(!ae)return null;let le=ae.getAttribute("data-lane");return le==="queue"?{zone:ae,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:le==="candidate"&&h===!0?{zone:ae,target:{kind:"candidate"}}:null}function oe(O){let ae=O.target;if(!w)return null;let le=typeof ae?.closest=="function"?ae.closest("[data-drop]"):null;if(!le)return x(ae);let ie=le.getAttribute("data-drop");if(ie==="candidate")return{zone:le,target:{kind:"candidate"}};if(ie==="parallel")return{zone:le,target:{kind:"parallel",marker_index:xe(le,ae)}};if(ie==="chain")return{zone:le,target:{kind:"chain",lane_id:le.getAttribute("data-lane-id")||"",marker_index:xe(le,ae)}};if(ie==="repo-serial"){let we=le.getAttribute("data-root-dir")||"";if(we!==w.root_dir)return null;let ue=typeof ae?.closest=="function"?ae.closest("[data-queue-index]"):null,Fe=ue&&le.contains(ue)?ue.getAttribute("data-queue-index"):le.getAttribute("data-lane-length"),He=Number(Fe);return{zone:le,target:{kind:"repo-serial",root_dir:we,lane_id:le.getAttribute("data-lane-id")||"",index:Number.isFinite(He)?He:0}}}return null}function $e(){for(let O of Array.from(n.querySelectorAll(".is-drop-over")))O.classList.remove("is-drop-over")}function de(O){H=O.target instanceof Element?O.target:null}function Oe(O){let ae=O.target,le=typeof ae?.closest=="function"?ae.closest('[draggable="true"][data-bead-id]'):null,ie=le?le.closest("[data-drag-kind]"):null;if(!ie)return;if(le&&H&&le.contains(H)&&typeof H.closest=="function"&&H.closest("input, button, a")){O.preventDefault();return}let we=ie.getAttribute("data-bead-id")||"",ue=ie.getAttribute("data-drag-kind")||"",Fe=ie.getAttribute("data-root-dir")||"";if(!we||!ue)return;let He=ie.getAttribute("data-queue-index")||"",Qe=Number(He),Pe=ie.getAttribute("data-lane-id")||"";w={kind:ue,bead_id:we,root_dir:Fe,...He!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Pe?{lane_id:Pe}:{}},C=!0,_?.(),n.classList.add("is-dragging");try{O.dataTransfer?.setData("text/plain",we),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}function pe(O){let ae=oe(O);ae&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),ae.zone.classList.add("is-drop-over"))}function De(O){let ae=O.target;typeof ae?.closest=="function"&&(ae.closest("[data-drop]")?.classList.remove("is-drop-over"),ae.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function lt(){w=null,$e(),n.classList.remove("is-dragging"),V()}function ot(O){let ae=oe(O),le=w;w=null,$e(),n.classList.remove("is-dragging"),!(!ae||!le)&&(O.preventDefault(),ye(le,ae.target))}return{attach(O){se||(se=O,O.addEventListener("pointerdown",de),O.addEventListener("dragstart",Oe),O.addEventListener("dragover",pe),O.addEventListener("dragleave",De),O.addEventListener("drop",ot),O.addEventListener("dragend",lt))},detach(){F!==null&&(clearTimeout(F),F=null);let O=se;se=null,O&&(O.removeEventListener("pointerdown",de),O.removeEventListener("dragstart",Oe),O.removeEventListener("dragover",pe),O.removeEventListener("dragleave",De),O.removeEventListener("drop",ot),O.removeEventListener("dragend",lt))},isDragging(){return w!==null},consumeClickSuppression(){let O=C;return C=!1,O},applyDrop:ye,runPlanned:q,dropModel:X,sendOp:U,sendQueueCas:K,rememberDep:Q}}var _l=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var ip={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Li(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Oi(e){for(let t of Li(e)){if(Object.hasOwn(ip,t))return ip[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function lp(e){return Li(e).length===0?null:Oi(e)||"\uC2E4\uD328"}function Er(e){let t=null;for(let n of Li(e))Object.hasOwn(_l,n)&&(t=_l[n]);return t}function lr(e){let t=Oi(e),n=Er(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function cp(e,t){let n=Oi(e)??Oi(t),r=Er(t)??Er(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ub=new Set(["repo_operation_timeout_unresolved"]);function Wb(e){for(let t of Li(e))if(Ub.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function zb(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function up(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Wb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(zb(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${wr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var ap={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function dp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(ap,t.blocked_reason)?ap[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=lr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=lr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Hb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var pp=200;function Gb(e){return typeof e!="string"||e.length===0?"":e.length>pp?`${e.slice(0,pp)}\u2026`:e}function Kb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function _p(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0;return t.length===0&&n.length===0&&!r?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(o=>c`<li class="rtile__history-row">
              ${fp(o.at)?c`<span class="rtile__history-at"
                    >${fp(o.at)}</span
                  >`:""}<span class="rtile__history-summary">${o.summary}</span>
            </li>`)}
      </ol>`:""}${r?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="180일 보존 정책으로 삭제됨"
      >
        만료됨
      </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
          ${Qr(n)}
        </p>`:""}`}function fp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Yb(e,t){if(!e||e.open!==!0)return"";let n=Er(e.cause)||lr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${rn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",_=_p(e);return c`<div
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
  </div>`}function Vb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Xb=new Set(["codex-runner"]);function Qb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Xb.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?rn(r.last_event_at,t):"",_=r?rn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${rn(i,t)}</span
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
      </div>`:""}`}var Zb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Jb(e){if(!e)return"";let t=Zb[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function ey(e,t,n){if(!e)return"";let r=Gb(t?.summary),o=_p(t);return c`${r?c`<p class="rtile__held-summary">${r}</p>`:""}${o}
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
    </div>`}function ml(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(De=>De&&De.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,_=a||u,h=!!e.paused,m=i||_?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):h?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Hb(t-e.started_at):"\u2014",w=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,C=go(e),F=Jt(e.usage),H=zn(e.usage),se=e.conflict_resolution?h?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,V=e.base_exception||null,N=e.landing,L=e.attempt_id&&e.attempt_id===n,M=r.monitor||null,B=Vb(M),X=Gs(M?.cross_lane_chip),ne=M?Hs(M.dependency_chips):"",P=Qb(M,t,h,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),K=o&&e.workflow?.chips?.exec_receipt||null,U=Ks(e.workflow),Q=Ys(e.rec,e.chip_popover?.chip_key==="rec"),Se=e.chip_popover?Gr(e.chip_popover.content):"",be=K?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(K)}`}
        >${`${K.kind}:${$s(K)}`}</span
      >`:"",ce=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${bo(s)}</span
      >`:"",q=B||X||U||ce||be||Q?c`<div class="rtile__meta">
          ${B}${X}${U}${ce}${be}${Q}${Se}
        </div>`:"",ye=l?c`<button
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
          >${Kb(e.retry)}</span
        >`:"",x=c`${se?c`<span class="worker-mini__badge">${se}</span>`:""}${V?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${V}</span
      >`:""}${ye}${xe}`,oe=o?"":Zr(e),$e=Ds(l?.quickfix_landing),de=$e==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Oe=$e==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",pe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${m}</span>`:""}${Jb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${m}</span>`}
        ${o||_?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${$e}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${de} \uBD88\uAC00`:Oe}
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
    ${_?ey(a,d,pe):i?"":c`${P}${e.rollup?ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ea}):""}
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
            ${o?q:B||X||U||w||Q||F.length>0||H?c`<div class="rtile__meta">
                    ${B}${X}${U}${zs(e.exec_chips)}${Q}
                    ${F.length>0?F.map(De=>c`<span
                              class="worker-usage"
                              title=${De.tooltip}
                              >${De.label}</span
                            >`):H?c`<span
                            class="worker-usage"
                            title=${yo(e.usage)}
                            >${H}</span
                          >`:""}${Se}
                  </div>`:""}
            ${js(e)} ${oe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||h?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Yb(l,t)}
  </div>`}function ty(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function mp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ml(o,t,n,{monitor:ty(o)}))}
  </div>`}var en="",ny=["impl_runtime","impl_model","impl_effort"],ry=["claude_account","codex_account"],oy=5,Ii=1;function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Mi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(I=>he(I,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),m={claude:null,codex:null},w=!1,C=null,F={},H="",se="",V=!1,N=!1,L=!1,M=null,B=!1;function X(){let I=t.queue?t.queue():null;return fn(I)?I:null}function ne(){let I=X();return I?I.runner_catalog:null}function P(){let I=X();return I&&fn(I.execution_defaults)?I.execution_defaults:null}function K(){let I=t.implPresetStore?.get();return fn(I)&&Array.isArray(I.presets)?I:null}function U(){return r===null?{}:{root_dir:r}}async function Q(I,ee){return B||!n?null:await n(I,ee)}function Se(I){I&&fn(I.queue)&&t.onQueueAdopt?.(I.queue)}async function be(I,ee){let ge=X();if(!ge||B)return null;let T=await Q(I,{...ee,...U(),expected_revision:ge.revision});if(Se(T),r!==null&&T&&T.conflict){let G=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:X()?.revision??ge.revision;T=await Q(I,{...ee,...U(),expected_revision:G}),Se(T)}return T}async function ce(){a=!0,Be();try{let I=await Q("get-session-defaults",{...U()});s=fn(I?.values)?{...I.values}:{},i={...s},l=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{a=!1,Be()}}async function q(){let I=Vc(s,i);if(Object.keys(I).length!==0){try{let ee=await Q("set-session-defaults",{values:I,...U()});s=fn(ee?.values)?{...ee.values}:{},i={...s},l=Array.isArray(ee?.warnings)?ee.warnings:[]}catch(ee){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Be()}}function ye(I,ee){if(!fn(I))return;let ge=I.state;u={state:ge==="usable"||ge==="unusable"||ge==="absent"?ge:"absent",values:fn(I.values)?{...I.values}:{},warnings:Array.isArray(I.warnings)?I.warnings:[]},_={...u.values},ee&&(d={..._})}async function xe(){try{ye(await Q("get-workspace-accounts",{...U()}),!0)}catch(I){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}Be()}async function x(I){try{let ee=await fetch(I);if(!ee.ok)return null;let ge=await ee.json();if(!fn(ge)||!Array.isArray(ge.accounts))return null;let T=ge.accounts.filter(G=>fn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:T,active:T.find(G=>G.active===!0)||null}}catch{return null}}async function oe(){w=!0;let[I,ee]=await Promise.all([x("/api/claude-usage"),x("/api/codex-usage")]);B||(m={claude:I,codex:ee},Be())}function $e(){let I={};for(let ee of ry){let ge=Object.hasOwn(d,ee)?d[ee]:null,T=Object.hasOwn(_,ee)?_[ee]:null;ge!==T&&(I[ee]=ge)}return I}async function de(){let I=$e();if(Object.keys(I).length!==0){try{ye(await Q("set-workspace-accounts",{values:I,...U()}),!1)}catch(ee){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Be()}}function Oe(I,ee){ee===en?delete d[I]:d[I]=ee,Be(),h=h.then(()=>de())}function pe(I,ee){if(ny.includes(I)){ot(I,ee);return}ee===en?delete i[I]:i[I]=ee,Be(),q()}function De(){let I=wt().orchestration_model,ee=_n({global:{orchestration_model:I??void 0},execution_defaults:P(),runner_catalog:ne()}).orchestration_model.value;return ee?$n(ne(),ee):null}function lt(I,ee){typeof ee=="string"&&ee.length>0?i[I]=ee:delete i[I]}function ot(I,ee){let ge=ee===en?void 0:ee,T=Kc({impl_runtime:I==="impl_runtime"?ge:i.impl_runtime,impl_model:I==="impl_model"?ge:i.impl_model,impl_effort:I==="impl_effort"?ge:i.impl_effort},ne(),De());lt("impl_runtime",T.impl_runtime),lt("impl_model",T.impl_model),lt("impl_effort",T.impl_effort),Be(),q()}async function O(){let I=X();if(!I)return;let ee={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},ge=Xc(ee,{...ee,...F});if(Object.keys(ge).length!==0){try{let T=await be("worker-queue-set-orchestration-defaults",{values:ge});if(T&&T.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}F={}}catch(T){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}}function ae(I,ee){F[I]=ee===en?null:ee,Be(),O()}function le(I){if(C=I,!I){Be();return}let ee=ne(),ge=wt(),T=ge.orchestration_model;T&&!$o(ee,I).includes(T)&&(F.orchestration_model=null,T=null);let G=ge.orchestration_effort;G&&!ua(ee,I,T||gn).includes(G)&&(F.orchestration_effort=null),Be(),O()}async function ie(I){if(!(!X()||I<Ii)){try{await be("worker-queue-set-slots",{slots:I})}catch(ee){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Be()}}async function we(I){if(!(!X()||I<Ii||I>oy)){try{await be("worker-queue-set-serial-lane-count",{count:I})}catch(ee){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Be()}}async function ue(I,ee){let ge=I==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await be(ge,{on:ee})}catch(T){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}function Fe(){let I={},ee=wt();for(let ge of Kr){let T=Kn.includes(ge)?ee[ge]:i[ge];typeof T=="string"&&T.length>0&&(I[ge]=T)}return I}async function He(){let I=K();if(!I)return;let ee=Fe();if(Object.keys(ee).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ge=(I.presets||[]).find(G=>G.id===H),T=se.trim()||(ge?ge.name:"");if(!T){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=ge?await Q("impl-preset-update",{expected_revision:I.revision,id:ge.id,name:T,settings:ee}):await Q("impl-preset-create",{expected_revision:I.revision,name:T,settings:ee});if(G&&G.applied){if(se="",!ge&&Array.isArray(G.presets)){let Ie=G.presets.find(Ue=>Ue.name===T);H=Ie?Ie.id:H}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function Qe(){let I=K();if(!(!I||H.length===0))try{let ee=await Q("impl-preset-delete",{expected_revision:I.revision,id:H});ee&&ee.applied?(H="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(ee){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}}function Pe(I){s=fn(I.values)?{...I.values}:{},i={...s},l=Array.isArray(I.warnings)?I.warnings:[],fn(I.queue)&&(t.onQueueAdopt?.(I.queue),F={})}async function Y(){let I=K(),ee=X();if(!I||!ee||H.length===0)return;let ge=T=>({preset_id:H,expected_revision:I.revision,expected_queue_revision:T,...U()});try{let T=await Q("apply-impl-preset-global",ge(ee.revision));if(T&&T.applied&&Pe(T),r!==null&&T&&T.queue_applied===!1){let G=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:X()?.revision??ee.revision;T=await Q("apply-impl-preset-global",ge(G)),T&&T.applied&&Pe(T)}T&&T.applied?T.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}Be()}async function j(){N=!0,L=!1,Be();try{let I=await Q("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?L=!0:M=I}catch{L=!0}finally{N=!1,Be()}}function Ne(){if(V=!V,V&&!M){j();return}Be()}function ct(){let I=no({loading:N,error:L});if(I)return I;if(!M)return"";let ee=Array.isArray(M.variants)?M.variants:[];return c`<div class="settings-dialog__sp-body">
      ${M.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ee.map(ge=>c`<div class="settings-dialog__sp-variant" data-variant=${ge.key}>
            <div class="settings-dialog__sp-cond">${ge.condition}</div>
            ${Zn(ge.label,ge.system_prompt)}
          </div>`)}
    </div>`}function Ze(){return c`<section
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
        aria-expanded=${V?"true":"false"}
        @click=${Ne}
      >
        ${V?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${V?ct():""}
    </section>`}function y(I,ee,ge,T,G,Ie,Ue){let qe=G[I]??en,Je=da(I,ge,G,P(),ne(),Ue),Ce=Je.options.find(et=>et.value===qe),ze=qe===en?Je.full_value:Ce?.full_value;return c`<select
        class=${qe===en?"settings-dialog__unset":""}
        data-key=${I}
        aria-label=${ee}
        title=${ze||""}
        ?disabled=${Ie===!0||Je.disabled}
        .value=${Ar(String(qe))}
        @change=${et=>T(I,String(et.target.value))}
      >
        <option value=${en} ?selected=${qe===en}>
          ${Je.unset_label}
        </option>
        ${Je.options.map(et=>c`<option
              value=${et.value}
              title=${et.full_value||""}
              ?selected=${et.value===qe}
            >
              ${et.label}
            </option>`)}
      </select>
      ${qe===en?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function W(I,ee,ge,T,G,Ie=!1,Ue){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        ${y(I,ee,ge,T,G,Ie,Ue)}
      </span>
    </div>`}function Te(I,ee){let ge=ee?ee.active:null;return fn(ge)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${I==="claude"?ge.email:oo({...ge,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Re(I,ee,ge){let T=m[ge],G=Object.hasOwn(d,I)?d[I]:en,Ie=ge==="claude"?xi:oo,Ue=!!T?.accounts.some(qe=>qe.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ee}
          data-account-key=${I}
          @change=${qe=>Oe(I,String(qe.target.value))}
        >
          <option value=${en} ?selected=${G.length===0}>
            ${Te(ge,T)}
          </option>
          ${G.length>0&&!Ue?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(qe=>c`<option value=${qe.key} ?selected=${qe.key===G}>
                ${Ie(qe)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function je(){let I=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${I} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${I}`:null}function Ke(I,ee,ge,T,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ee}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${y(ge,`${I} \uBAA8\uB378`,T,pe,i,!1)}
        ${y(G,`${I} effort`,Ls,pe,i,!1)}
      </span>
    </div>`}function dt(I,ee,ge,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${I}
          aria-pressed=${T?"true":"false"}
          aria-label=${ee}
          @click=${()=>ue(I,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ge}</span>
      </span>
    </div>`}function vt(I,ee,ge,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${I}>
          <button
            type="button"
            aria-label=${`${ee} \uAC10\uC18C`}
            @click=${()=>T(ge-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ge}</span>
          <button
            type="button"
            aria-label=${`${ee} \uC99D\uAC00`}
            @click=${()=>T(ge+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function It(I){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${I.rows.length>0?`\uBCC0\uACBD ${I.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${I.rows.map(ee=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ee.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ee.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ee.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ee.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${I.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${I.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function wt(){let I=X(),ee={};for(let ge of Kn)ee[ge]=Object.prototype.hasOwnProperty.call(F,ge)?F[ge]:I&&typeof I[ge]=="string"?I[ge]:null;return ee}function mt(){let I=ne(),ee=i.impl_runtime,ge=i.impl_model,T=K(),G=X(),Ie=wt(),Ue=$o(I,C),qe=Yr(I,void 0).filter(it=>it!==gn),Je=ua(I,C,Ie.orchestration_model||gn).filter(it=>it!==gn),Ce=H?(T?.presets||[]).find(it=>it.id===H):null,ze=Ce?Yc(Fe(),fn(Ce.settings)?Ce.settings:{}):null,et=G&&typeof G.slots=="number"?G.slots:Ii+1,bt=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Ii,We=P()?.supported===!0,xt=je(),Ft=da("workflow_mode",wo,i,P(),I);return c`
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
      ${We?"":c`<div
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
                .value=${Ar(H)}
                @change=${it=>{H=String(it.target.value),Be()}}
              >
                <option value="" ?selected=${H===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(it=>c`<option
                      value=${it.id}
                      ?selected=${it.id===H}
                    >
                      ${it.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ze||ze.rows.length===0}
                @click=${Y}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${H?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ar(se)}
                @input=${it=>{se=String(it.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${H?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${He}
              >
                ${H?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${H.length===0}
                @click=${Qe}
              >
                삭제
              </button>
            </div>
            ${ze?It(ze):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ar(C||en)}
                    @change=${it=>{let Yt=String(it.target.value);le(Yt===en?null:Yt)}}
                  >
                    <option value=${en} ?selected=${!C}>
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
              ${W("orchestration_model","\uBAA8\uB378",Ue,ae,Ie)}
              ${W("orchestration_effort","effort",Je,ae,Ie)}
              ${W("orchestration_speed","\uC18D\uB3C4",vo,ae,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Re("claude_account","Claude","claude")}
              ${Re("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${en}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>pe("workflow_mode",en)}
                    >
                      ${Ft.unset_label}
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
              ${Ke("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ko,"spec_review_effort")}
              ${Ke("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Os,"plan_review_effort")}
              ${Ke("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ko,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${W("impl_runtime","\uC704\uC784 \uB300\uC0C1",Rs,pe,i)}
              ${W("impl_model","\uBAA8\uB378",Yr(I,ee),pe,i)}
              ${W("impl_effort","effort",Vr(I,ee,ge),pe,i)}
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
              ${dt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${dt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${vt("slots","\uB3D9\uC2DC \uC2E4\uD589",et,it=>ie(it))}
              ${vt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",bt,it=>we(it))}
            </div>
            ${Ze()}
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
    />`)}function vp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function wp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Jt(Ts(t));let n={};for(let l of Ln)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Ln){let _=a[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?zn(n):null}function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gl(e,t){let n=Cn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function sy(e,t){if(!Cn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function iy(e){if(!Cn(e)||!Cn(e.execution_defaults)||!Cn(e.runner_catalog)||!Cn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=_n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),o=Xr(n,e.runner_catalog),s=vr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function kp(e,t){let n=t.notify||(x=>he(x,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,_=null,h=new Map;function m(){let x=t.workspacesState?t.workspacesState():[];return Array.isArray(x)?x.filter(oe=>Cn(oe)):[]}function w(x){return m().find(oe=>oe.root_dir===x)||null}function C(x){return sy(w(x),h.get(x))}function F(){for(let x of m()){let oe=h.get(x.root_dir);oe&&typeof oe.revision=="number"&&typeof x.revision=="number"&&x.revision>=oe.revision&&h.delete(x.root_dir)}}async function H(x,oe,$e){let de=t.transport,Oe=C(oe);if(!(!de||!Cn(Oe))){try{let pe=await de(x,{...$e,root_dir:oe,expected_revision:Oe.revision});if(Cn(pe?.queue)&&h.set(oe,pe.queue),pe&&pe.conflict){let De=Cn(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:C(oe)?.revision;pe=await de(x,{...$e,root_dir:oe,expected_revision:De}),Cn(pe?.queue)&&h.set(oe,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}q()}}function se(x){u!==x&&(u=x,t.onFocusChange?.(u),q())}function V(x){se(u===x?null:x)}function N(x){if(d===x){M();return}L(),d=x;let oe=w(x);i.textContent=`${oe?.name||x} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,_=Mi(a,{root_dir:x,queue:()=>C(x),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{h.set(x,$e),q()}}),_.load(),q()}function L(){_?.destroy(),_=null}function M(x){L(),d=null,o.hidden=!0,i.textContent="",x!==!0&&q()}let B=()=>M();l.addEventListener("click",B);function X(x){x.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",X);function ne(x,oe){let $e=Math.max(oe,x,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${x}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(de,Oe)=>Oe<x?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function P(x){let oe=x.auto_advance===!0,$e=x.auto_merge===!0;return c`<button
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
      </button>`}function K(x){let oe=iy(x);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function U(x){let oe=[];for(let[$e,de]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Oe=gl(x,$e);Oe>0&&oe.push(`${de} ${Oe}`)}return oe.join(" \xB7 ")}function Q(x){let oe=gl(x,"running"),$e=typeof x.slots=="number"?x.slots:1;return c`<div
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
        <div class="mon2-deck__ops">${P(x)}</div>
        <span class="mon2-deck__counts">${U(x)}</span>
        ${K(x)}
      </div>
    </div>`}function Se(x){let oe=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",de=wp(Array.isArray(oe)?oe:[]),Oe=pe=>x.reduce((De,lt)=>De+gl(lt,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${x.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${Oe("running")} · 대기 ${Oe("queue")} · PR
        ${Oe("pr_wait")}${Oe("session_active")>0?` \xB7 \uC138\uC158 ${Oe("session_active")}`:""}
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
    </div>`}function be(){let x=m();return x.length===0?"":c`${Se(x)}
      <div class="mon2-deck__strip">
        ${x.map(oe=>Q(oe))}
      </div>`}function ce(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function q(){F(),ce(),d!==null&&!w(d)&&M(!0),rt(be(),r),_?.render()}function ye(x){let oe=x.target;if(!oe||typeof oe.closest!="function")return;let $e=oe.closest("[data-root-dir]");if(!$e)return;let de=$e.getAttribute("data-root-dir")||"",Oe=oe.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(de);return}if(Oe==="auto"){H("worker-automation-toggle",de,{on:C(de)?.auto_advance!==!0});return}if(Oe==="merge"){H("worker-merge-auto-toggle",de,{on:C(de)?.auto_merge!==!0});return}if(Oe==="gear"){N(de);return}V(de)}function xe(x){if(x.key!=="Enter"&&x.key!==" ")return;let oe=x.target;if(!oe||typeof oe.closest!="function")return;let $e=oe.closest('[data-root-dir][role="button"]');!$e||$e!==oe||(x.preventDefault(),V($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ye),r.addEventListener("keydown",xe),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",X),r.removeEventListener("click",ye),r.removeEventListener("keydown",xe),l.removeEventListener("click",B),L(),rt(c``,r),e.replaceChildren()}}}var ay=1e4,Sp="bdui.monitor.done-range",Ep="bdui.monitor.running_sort",Tp="bdui.monitor.candidate_sort",Cp="beads-ui.monitor.candidate-filter",Rp="beads-ui.monitor.sections";function ly(){try{let e=window.localStorage.getItem(Cp);if(!e)return{...Jr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Jr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Jr.show_blocked,spec:Ra.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Jr}}}function $p(e){try{window.localStorage.setItem(Cp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function cy(){try{let e=window.localStorage.getItem(Tp);return Lo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function uy(e){try{window.localStorage.setItem(Tp,e)}catch{}}function dy(){try{let e=window.localStorage.getItem(Rp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function py(e){try{window.localStorage.setItem(Rp,JSON.stringify(e))}catch{}}function fy(){try{let e=window.localStorage.getItem(Sp);return e===null?"today":Rn(e)}catch{return"today"}}function _y(e){try{window.localStorage.setItem(Sp,e)}catch{}}function my(){try{return window.localStorage.getItem(Ep)==="repo"?"repo":"started"}catch{return"started"}}function gy(e){try{window.localStorage.setItem(Ep,e)}catch{}}var Op="tab:monitor:pipeline",hy=1e3,xp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],by=["queue","runnable","done"],Ap="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function yy(e){return e>=1&&e<=Ap.length?Ap[e-1]:`(${e})`}function Lp(e,t){let n=Rt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=fy(),m=my(),w=ly(),C=cy(),F=dy(),H=Ti("beads-ui.monitor.lane-collapsed"),se=!1,V=null,N=null,L=null,M=null,B=Hr(()=>Ce()),X=null,ne=null,P=null,K=null;function U(p){return K===null&&(K=O()),ju(p,K)}function Q(p,f){Se(),!(f<=0)&&(ne={lane_id:p,corrected:f},P=setTimeout(()=>{P=null,ne=null,Ce()},ay))}function Se(){P!==null&&(clearTimeout(P),P=null),ne=null}function be(){let p=Or.find(f=>f.value===h);return p?p.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let ye=document.createElement("div");ye.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host mon2-drawer",q.append(ye,xe),e.appendChild(q);let x=ir(null,null),oe=new Map,$e=new Map,de=null,Oe=null,pe=null,De=ro(xe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,q.hidden=!0,Ce()}}),lt=Ri({transport:s,console_el:ce,getLanes:()=>x,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:kt,reproject:p=>({lanes:Je(p),raw_lanes:p}),onCorrection:Q,showToast:he,requestRender:()=>Ce(),adoptQueue:(p,f)=>{$e.set(p,f)},onDragBegin:()=>{L=null},candidate_drop:!0}),{applyDrop:ot,dropModel:O,runPlanned:ae,sendQueueCas:le}=lt;async function ie(p,f,k,R,z=!0){if(!s||!k)return null;let re=await s(p,{...f,root_dir:k,expected_revision:R});if(re&&re.conflict&&z){re.queue&&$e.set(k,re.queue);let fe=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:R;re=await s(p,{...f,root_dir:k,expected_revision:fe})}return re&&re.queue&&k&&$e.set(k,re.queue),re}function we(p,f){let k=$e.get(p),R=o&&o.get?o.get():null,z=(Array.isArray(R)?R:[]).find(fe=>fe?.root_dir===p);return(k||z)?.merge_queue?.find(fe=>fe.bead_id===f)?.continuation_action}async function ue(p,f,k,R){let z=await ie(p,f,k,R),re=$e.get(k)?.revision??z?.queue?.revision??R;return Wn(z,(fe,ve)=>ie(p,{...f,continuation:fe,decision_token:ve},k,re,!1),{refresh:fe=>ie(p,f,k,fe?.queue?.revision??$e.get(k)?.revision??re,!1)})}async function Fe(p,f,k,R){let z=await Wn({continuation_mismatch:R},(fe,ve)=>ie("worker-merge-queue-add",{bead_id:f,continuation:fe,decision_token:ve},p,k,!1)),re=z?.queue?.merge_queue?.find(fe=>fe.bead_id===f)?.continuation_action;z?.applied!==!0&&re?.continuation===null&&re.mismatch&&await Fe(p,f,z.queue.revision,re.mismatch)}async function He(p,f,k){let R=await ie("worker-discard",p,f,k);if(R&&R.discarded===!0){he(Ws(R),"success",5e3);return}if(R&&R.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${R.reason}`,"error");return}if(R&&R.accepted&&R.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(R&&R.accepted){he(`\uD3D0\uAE30 \uC9C4\uD589: ${R.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}R&&!R.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(p,f,k){return!s||!k?null:await s(p,{...f,root_dir:k})}async function Pe(){let p=new Map;for(let f of x.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,k]of p)await ie("worker-merge-queue-add-all",{},f,k)}function Y(p){let f=F[p];return!!(f&&f.runnable===!0)}function j(p){let f={...F[p]||{}};f.runnable=!f.runnable,F={...F,[p]:f},py(F),Ce()}function Ne(p){H.toggle(p),Ce()}function ct(p){H.toggleArea(p),Ce()}function Ze(p){let f=p.dependency_chips||null,k=p.overlap_chips||[],R=p.scope_state==="missing",z=p.armed_lane_chip;return!f&&k.length===0&&!R&&!z?null:{...f||{},...k.length>0?{overlaps:k}:{},...R?{scope_missing:!0}:{},...z?{armed_lane:z}:{}}}function y(p){return Xs(p,f=>B.isOpen({bead_id:p.id,chip_key:f}))}function W(p){let f=Ze(p),k=y(p);return f||k?{...p,...f?{dependency_chips:f}:{},...k?{chip_popover:k}:{}}:p}function Te(p){let f=Y(p.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Re(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function je(p){if(L!==p.id)return null;let f=x.queue_groups.find(re=>re.root_dir===p.root_dir),k=p.place_lanes||[],R=x.cross_lanes_revision!==null,z=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let re of x.chain_lanes)z.push({id:`lane:${re.lane_id}`,label:`\uC5F0\uACB0 ${re.number} (${re.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:re.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!R});z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!R,title:R?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let re of k)z.push({id:`serial:${re.id}`,label:`\uC9C1\uB82C ${Number(re.id.slice(1))}`,count:re.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:z}}function Ke(p){return Re(p,c`${xa(W(p),je(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(f,k)=>l(k,p.root_dir):void 0})}`)}function dt(){return x.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${x.runnable.map(p=>Ke(p))}
      </div>`:c`${x.runnable_sections.map(p=>{let f=Y(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Te({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(k=>Ke(k))}
            </div>`}
      </section>`})}`}function vt(p,f=!1){return c`<span class="worker-mini__rowops">
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
    </span>`}function It(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${xn(W(p),{actions:vt(p,!0)})}
    </div>`}function wt(p,f,k,R){return c`<div
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
        >${yy(f.seq)}</span
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
    </div>`}function mt(p){let f=x.cross_lanes_revision!==null,k=U(p.lane_id),R=k?.held===!0,z=k?.cycle===!0,re=k?k.mismatched:[],fe=ne&&ne.lane_id===p.lane_id?ne.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${fe>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${fe}건 자동 교정</span
            >`:""}
        ${z?c`<span
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
            </div>`:p.rows.map((ve,Ye)=>wt(p,ve,Ye,re))}
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
      ${xn(W(f),{actions:vt(f)})}
    </div>`}function I(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function ee(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${xn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function ge(p,f){let k=f.occupants,R=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...k.map(z=>ee(z)),...f.items.map((z,re)=>Be(f,z,re))],count:f.items.length,empty:f.empty===!0,...k.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${k.map(z=>`${z.id} \u2014 ${z.badge}`).join(`
`)}
              >${I(k)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...R.length>0?{after:c`${R.map(z=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${z.workspace_name}·${z.lane}과 교차 대기
                </div>`)}`}:{}}}function T(){let p=x.cross_lanes_revision!==null,f=x.chain_lanes.some(k=>k.draft&&k.rows.length===0);return Zs({parallel:{rows:x.parallel_rows.map((k,R)=>It(k,R)),count:x.parallel_rows.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:x.queue_groups.flatMap(k=>k.sublanes.serial.map(R=>({...ge(k,R),drop:{drop:"repo-serial",root_dir:k.root_dir,lane_id:R.id,lane_length:String(R.raw_length)}}))),collapsed:H.isAreaCollapsed("serial"),extra_panes:x.chain_lanes.map(k=>mt(k)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...x.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function G(p){return c`<div class="worker-rungrid">
      ${x.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:x.running.map(f=>ml({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:y(f),discard:f.discard,failure:f.failure?{...f.failure,open:M===f.attempt_id}:null},p,N,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:Ze(f)}}))}
    </div>`}function Ie(p){let f={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done},k=R=>{let z=f[R.lane],re=R.lane==="runnable"?x.runnable_flat?z.length>0?dt():void 0:x.runnable_sections.length>0?dt():void 0:R.lane==="queue"?x.queue_groups.length>0||x.chain_lanes.length>0||x.parallel_rows.length>0||x.cross_lanes_unreadable?T():void 0:R.lane==="running"?G(p):z.length>0?c`${z.map(fe=>xn(W(fe)))}`:void 0;return In({id:`monitor-${R.lane}`,lane:R.pane,title:R.title,items:z,count:z.length,src:R.lane==="runnable",empty:R.empty,body:re,live:R.lane==="running"&&z.length>0,collapsible:!0,collapsed:H.isCollapsed(R.pane),controls:R.lane==="runnable"?Ue():void 0,header_control:qe(R.lane,z.length)})};if(se){let R=by.map(z=>xp.find(re=>re.lane===z)).filter(z=>z!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Js({live:x.running.length>0,running_body:x.running.length>0?G(p):"",pr_wait_rows:x.pr_wait.map(z=>xn(W(z))),count:x.running.length+x.pr_wait.length})}
            ${R.map(z=>k(z))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${xp.map(R=>k(R))}
        </div>
      </div>`}function Ue(){return c`<div class="worker-filter">
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
      </select>`:""}function Je(p){let f=o&&o.get?o.get():null,k=o&&o.getWorkspacesState?o.getWorkspacesState():[],R=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,z={done_since:hr(h,d()),running_sort:m,candidate_filter:w,candidate_sort:C};return R!==void 0&&(z.cross_lanes=R),ir(f,k,z)}function Ce(){let p=d();x=Je(),K=null,oe=new Map;for(let f of[...x.runnable,...x.queue,...x.running,...x.pr_wait,...x.done])!f.non_occupying&&!oe.has(f.id)&&oe.set(f.id,f);rt(Ie(p),ce),et()?.render(),ze(),bt()}function ze(){let p=new Map;for(let f of x.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let k=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",R=p.get(k);typeof R=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${R?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function et(){if(pe)return pe;let p=ce.querySelector(".mon2-deck");return p?(pe=kp(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>x.done,rangeLabel:be,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:xt,onFocusChange:f=>{X=f,bt()}}),pe):null}function bt(){ce.classList.toggle("has-focus",X!==null);for(let p of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",X!==null&&p.getAttribute("data-root-dir")===X);for(let p of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=oe.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",X!==null&&!!f&&f.root_dir===X)}for(let p of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",X!==null&&p.getAttribute("data-root-dir")===X)}function We(p,f){let k=i?i():void 0;if(!f||!k||f===k||!a){r(p);return}a(f).then(()=>{r(p)}).catch(R=>{n("workspace switch for %s failed: %o",f,R)})}function xt(p){if(!p)return;let f=i?i():void 0,k=()=>{try{u?.gotoView("worker")}catch(R){n("gotoView(worker) failed: %o",R)}};if(!a||f&&f===p){k();return}a(p).then(k).catch(R=>{n("workspace switch for %s failed: %o",p,R),he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ft(p){on(p).then(f=>{he(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function it(p){let f=oe.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function Yt(p,f,k){if(p!=="dep-add")return;let R=x.chain_lanes.find(z=>z.rows.some(re=>re.id===f));!R||!R.rows.some(z=>z.id===k)||await ae(z=>Gu(R.lane_id,z),"",[{type:p,a:f,b:k}])}function kt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Mt(p,f){if(p==="run"){await Xt(f);return}if(p==="stop"){await nn(f);return}if(p==="create"){await ae(k=>Da(null,k),"");return}if(p==="remove"){let k=Yu(f,O());if(k!==null&&!_(k))return;await ae(R=>Ku(f,R),"");return}await ae(k=>p==="confirm"?zu(f,k):Hu(f,k),"")}function Vt(p){let f=new Map;for(let k of p.rows){let R=x.owner_of[k.id]||k.root_dir;typeof R!="string"||R.length===0||f.set(R,[...f.get(R)||[],k.id])}return f}async function Xt(p){let f=x.chain_lanes.find(re=>re.lane_id===p);if(!f||x.cross_lanes_revision===null){Ce();return}Se();let k=new Map,R=new Map,z=Vt(f);for(let re of f.rows){if(!re.unplaced)continue;let fe=x.owner_of[re.id]||re.root_dir;if(typeof fe!="string"||fe.length===0){he(`${re.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Ce();return}let ve=R.get(fe)??0;if(await le("worker-queue-place",{bead_id:re.id,lane:"parallel",index:(x.parallel_raw_length[fe]??0)+ve},fe,k,{bead_id:re.id})===null){Ce();return}R.set(fe,ve+1)}for(let[re,fe]of z)if(await le("worker-queue-arm",{bead_ids:fe,lane_id:p},re,k,{bead_id:fe[0]})===null){he("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Ce();return}Ce()}async function nn(p){let f=x.chain_lanes.find(R=>R.lane_id===p);if(!f||x.cross_lanes_revision===null){Ce();return}Se();let k=new Map;for(let[R,z]of Vt(f))if(await le("worker-queue-disarm",{lane_id:p},R,k,{bead_id:z[0]})===null)break;Ce()}async function Ht(p,f){let{root_dir:k,revision:R}=it(p);if(k.length===0){Ce();return}await le("worker-queue-disarm",{bead_ids:[p],lane_id:f},k,new Map([[k,R]]),{bead_id:p}),Ce()}async function Dt(p,f){let k=oe.get(p);if(!k){Ce();return}let R={kind:"candidate",bead_id:p,root_dir:k.root_dir};if(f==="new-lane"){await ae(z=>Da({bead_id:p,root_dir:k.root_dir},z),p);return}if(f.startsWith("lane:")){let z=f.slice(5);if(!x.chain_lanes.find(fe=>fe.lane_id===z)){Ce();return}await ae(fe=>li(R,{kind:"chain",lane_id:z,marker_index:(fe.cross_lanes.get(z)?.entries??[]).length},fe),p);return}if(f.startsWith("serial:")){let z=f.slice(7),re=(k.place_lanes||[]).find(fe=>fe.id===z);await ot(R,{kind:"repo-serial",root_dir:k.root_dir,lane_id:z,index:re?re.index:0});return}await ot(R,{kind:"parallel",marker_index:x.parallel_rows.length})}async function Qt(p,f){let k=x.parallel_rows,R=k.findIndex(_t=>_t.id===p);if(R<0)return;let z=k[R].root_dir,re=[];k.forEach((_t,ft)=>{_t.root_dir===z&&re.push(ft)});let fe=re.indexOf(R),ve=re[fe+f];if(typeof ve!="number")return;let Ye=f===-1?ve:re[fe+2]??Math.min(k.length,ve+1);await ot({kind:"parallel",bead_id:p,root_dir:z,queue_index:k[R].queue_index??0},{kind:"parallel",marker_index:Ye})}async function Ct(p){for(let f of x.chain_lanes){let k=f.rows.find(R=>R.id===p);if(k){await ot({kind:"chain",bead_id:p,root_dir:k.root_dir,lane_id:f.lane_id,...typeof k.queue_index=="number"?{queue_index:k.queue_index}:{}},{kind:"parallel",marker_index:x.parallel_rows.length});return}}}function Gt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Pt(p,f){let{item:k,root_dir:R,revision:z}=it(f),re=k?.attempt_id||"",fe=p.classList;if(fe.contains("worker-mini__rowops-up")||fe.contains("worker-mini__rowops-down")){Qt(f,fe.contains("worker-mini__rowops-up")?-1:1);return}if(fe.contains("worker-mini__rowops-remove")){ie("worker-queue-remove",{bead_id:f},R,z);return}if(fe.contains("mon2-crow__detach")){Ct(f);return}if(fe.contains("worker-dep__open")){We(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(fe.contains("mon2-arm__release")){Ht(f,p.getAttribute("data-lane-id")||"");return}if(fe.contains("mon-lane__chip")){let ve=p.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${ve}"]`)?.scrollIntoView({block:"nearest"});return}if(fe.contains("judgement-chip")){let ve=p.getAttribute("data-chip-key")||"";ve&&B.toggle({bead_id:f,chip_key:ve});return}if(fe.contains("rtile__failure-badge")){M=M===re?null:re,Ce();return}if(fe.contains("rtile__attempt-copy")){let ve=p.getAttribute("data-attempt-id")||"";ve&&on(ve).then(Ye=>{he(Ye?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ye?"success":"error",1400)});return}if(fe.contains("worker-card__place")){L=L===f?null:f,Ce();return}if(fe.contains("worker-card__place-cancel")){L=null,Ce();return}if(fe.contains("worker-card__place-lane")){let ve=p.getAttribute("data-lane")||"parallel";L=null,Dt(f,ve);return}if(fe.contains("rtile__session")){if(k&&k.kind==="session"){let ve=(k.session_refs||[]).find(Ye=>Ye&&Ye.current===!0);ve&&(q.hidden=!1,De.open(Ur(ve,f,"in_progress",R)),Ce());return}N=re,re&&k&&(q.hidden=!1,De.open({attempt_id:re,root_dir:R,meta:Gt(k)})),Ce();return}if(fe.contains("rtile__pause")){Qe("worker-attempt-pause",{attempt_id:re},R);return}if(fe.contains("rtile__resume")){Br().then(ve=>{if(ve!==null)return ue("worker-attempt-resume",{attempt_id:re,...ve!==""?{instructions:ve}:{}},R,z)});return}if(fe.contains("rtile__parked-retry")){Qe("worker-parked-retry",{bead_id:f,attempt_id:re},R).then(ve=>{ve&&ve.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ve.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ve.reason||""}`,"error")});return}if(fe.contains("rtile__discard")){let ve=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!_(To(f,ve)))return;He({bead_id:f,...re?{attempt_id:re}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},R,z);return}if(fe.contains("worker-mini__merge")){let ve=we(R,f);ve?.mismatch&&ve.continuation===null?Fe(R,f,z,ve.mismatch):ie("worker-merge-queue-add",{bead_id:f},R,z);return}if(fe.contains("worker-mini__merge-cancel")){ie("worker-merge-queue-remove",{bead_id:f},R,z);return}if(fe.contains("worker-mini__discard")){let ve=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(To(f,ve)))return;He({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},R,z);return}if(fe.contains("worker-mini__revise-fix")){ue("worker-revise-fix",{bead_id:f},R,z);return}fe.contains("worker-mini__revise-approve")&&ie("worker-revise-approve",{bead_id:f},R,z)}function St(p){let f=lt.consumeClickSuppression(),k=p.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest(".worker-drawer-overlay")||k.closest("a"))return;let R=k.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(R){p.preventDefault();let Ae=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||R.textContent?.trim()||"";Ae&&Ft(Ae);return}let z=k.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(z){p.preventDefault();let E=z.getAttribute("data-root-dir")||oe.get(k.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||z.getAttribute("title")||"";xt(E);return}let re=k.closest(".mon2-sec__toggle");if(re){p.preventDefault(),j(re.getAttribute("data-root-dir")||"");return}let fe=k.closest(".worker-pane__toggle[data-lane]");if(fe){p.preventDefault();let E=fe.getAttribute("data-lane")||"";(E==="candidate"||E==="queue"||E==="running"||E==="pr_wait"||E==="done")&&Ne(E);return}let ve=k.closest(".worker-wait__area-toggle[data-area]");if(ve){p.preventDefault(),ct(ve.getAttribute("data-area")||"parallel");return}if(k.closest(".mon2-newlane")){p.preventDefault(),Mt("create","");return}let Ye=k.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ye){p.preventDefault();let E=Ye.getAttribute("data-lane-id")||"",Ae=Ye.classList;Mt(Ae.contains("mon2-clane__confirm")?"confirm":Ae.contains("mon2-clane__reapply")?"reapply":Ae.contains("mon2-clane__run")?"run":Ae.contains("mon2-clane__stop")?"stop":"remove",E);return}if(k.closest(".mon-merge-all")){p.preventDefault(),Pe();return}let _t=k.closest(".mon-filter__spec");if(_t){p.preventDefault(),w={...w,spec:_t.getAttribute("data-spec")||"all"},$p(w),Ce();return}let ft=k.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ft)return;let Zt=ft.getAttribute("data-bead-id")||"",$=k.closest("button");if($){p.preventDefault(),Pt($,Zt);return}k.closest(".rtile__failure-pop, .chip-popover")||Zt&&!f&&(p.preventDefault(),We(Zt,ft.getAttribute("data-root-dir")||it(Zt).root_dir))}function me(p){let f=p.target;if(!f||typeof f.closest!="function")return;let k=f.closest(".mon-filter__blocked");if(k){w={...w,show_blocked:k.checked},$p(w),Ce();return}let R=f.closest(".mon-candidate-sort");if(R){C=Lo.some(fe=>fe.value===R.value)?R.value:"repo_spec",uy(C),Ce();return}let z=f.closest(".mon-running-sort");if(z){m=z.value==="repo"?"repo":"started",gy(m),Ce();return}let re=f.closest(".mon-done-range");re&&(h=Rn(re.value),_y(h),Ce())}function S(p){let f=p.target,k=f&&typeof f.closest=="function"?R=>f.closest(R):()=>null;M&&!k(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,Ce())}function J(p){p.key!=="Escape"||M===null||(M=null,Ce())}e.addEventListener("click",St),e.addEventListener("change",me),document.addEventListener("click",S),document.addEventListener("keydown",J),B.attach(),lt.attach(e);{let p=!0;V=Ei(f=>{if(se=f,p){p=!1;return}Ce()})}o&&typeof o.subscribe=="function"&&(de=o.subscribe(()=>{try{$e.clear(),Ce()}catch{}}));function Le(){Oe!==null&&(clearInterval(Oe),Oe=null)}return{recorrectSharedLane:Yt,load(){n("load"),Ce(),Oe===null&&(Oe=setInterval(()=>{try{Ce()}catch{}},hy))},pause(){Le()},clear(){Le(),lt.detach(),de&&(de(),de=null),V&&(V(),V=null),De.destroy(),q.hidden=!0,pe?.destroy(),pe=null,e.removeEventListener("click",St),e.removeEventListener("change",me),document.removeEventListener("click",S),document.removeEventListener("keydown",J),B.detach(),e.replaceChildren()}}}function Ip(e,t,n){let r=Rt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let w=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",w),n.gotoView(w)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",s.appendChild(L);for(let M of Mp){let B=document.createElement("option");B.value=M,B.textContent=Dp(M),s.appendChild(B)}i.replaceChildren();for(let M=0;M<=4;M+=1){let B=document.createElement("option");B.value=String(M);let X=Pp[M]||"Medium";B.textContent=`${M} \u2013 ${X}`,i.appendChild(B)}}m();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(L){o.disabled=L,s.disabled=L,i.disabled=L,l.disabled=L,a.disabled=L,d.disabled=L,_.disabled=L,_.textContent=L?"Creating\u2026":"Create"}function F(){u.textContent=""}function H(L){u.textContent=L}function se(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?s.value=L:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function V(){let L=s.value||"",M=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function N(){F();let L=String(o.value||"").trim();if(L.length===0){H("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){H("Priority must be 0..4"),i.focus();return}let B=String(s.value||""),X=String(a.value||""),ne={title:L};B.length>0&&(ne.type=B),String(M).length>0&&(ne.priority=M),X.length>0&&(ne.description=X),C(!0);try{await t("create-issue",ne)}catch{C(!1),H("Failed to create issue");return}V(),C(!1),w()}return n.addEventListener("cancel",L=>{L.preventDefault(),w()}),h.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),N())}),r.addEventListener("submit",L=>{L.preventDefault(),N()}),{open(){r.reset(),F(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){w()}}}var vy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function wy(e,t){return Zi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function qp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=wy(r,e);return c`<button
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
        ${vy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var ky=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Bp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(Q=>he(Q,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function _(){if(d)return d;let Q=i.querySelector('[data-pane="execution"]');return Q?(d=Mi(Q,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Se=>t.queueStore?.set?.(Se)}),d):null}function h(){return c`
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
    `}function m(){let Q=r.get();return c`
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
        ${Q?c`
              ${qp(Q,o(),H)}
              ${Fp(Q,u,{onDraft:Se=>{u=Se},onAdd:se,onRemove:V})}
              ${jp(Q,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(Q){let Se=r.get();if(Se)try{let be=await n("display-policy-set",{expected_revision:Se.revision,policy:Q(Se)});C(be),be&&be.conflict&&be.policy&&(be=await n("display-policy-set",{expected_revision:be.policy.revision,policy:Q(be.policy)}),C(be)),be&&be.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(Q){Q&&Q.policy&&typeof Q.policy=="object"&&r.set(Q.policy)}function F(Q){w(Q)}function H(Q){let Se=r.get();if(!Se)return;let be=!$y(Q,Se);F(ce=>xy(Q,ce,be))}function se(){let Q=u.trim();Q.length!==0&&(u="",F(Se=>Se.hidden_prefixes.includes(Q)?{hidden_prefixes:Se.hidden_prefixes}:{hidden_prefixes:[...Se.hidden_prefixes,Q]}),L())}function V(Q){F(Se=>({hidden_prefixes:Se.hidden_prefixes.filter(be=>be!==Q)}))}function N(Q){let Se=r.get();if(!Se)return;let be=Se.chips[Q]===!1;F(()=>({chips:{[Q]:be}}))}function L(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${ky.map(Q=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Q.id}
                  aria-selected=${String(l===Q.id)}
                  aria-controls=${`settings-pane-${Q.id}`}
                  @click=${()=>M(Q.id)}
                >
                  <span class="settings-dialog__glyph">${Q.glyph}</span>
                  ${Q.label}
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
      `,i),_()}function M(Q){l=Q,L()}let B=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",B),i.addEventListener("cancel",B);let X=Q=>{Q.target===i&&U()};i.addEventListener("click",X);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{a&&L()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function K(Q="execution"){a||(a=!0,t.onOpenChange?.(!0),l=Q,u="",L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),_()?.load())}function U(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:K,close:U,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",B),i.removeEventListener("cancel",B),i.removeEventListener("click",X),ne&&(ne(),ne=null),P&&(P(),P=null),d?.destroy(),d=null,i.remove()}}}function $y(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function xy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Ay=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Up="usage-meter-card",Sy="usage-meter-layer",hl=600,Ey=["token_expired","relogin_required"];function Wp(e){return String(e).padStart(2,"0")}function Ty(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function zp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Wp(r.getHours())}:${Wp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Ay[r.getMonth()]} ${r.getDate()} ${s}`;return`${Ty(n,t)} \xB7 ${l}`}function Cy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Hp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Gp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Kp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Vp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ry(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Vp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Oy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Ry(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Vp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Ly(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Oy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Xp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Iy(e,t){return!e.held||Xp(e,t)<=hl?e:{...e,available:!1,windows:[],accounts:[]}}function Yp(e,t){return`${e}:${t}`}function Qp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){rt(c``,e),e.hidden=!0,_()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=Sy,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function _(){a!==null&&(rt(c``,a),a.remove(),a=null)}function h(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",F),window.addEventListener("resize",C)),n=ce)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",F),window.removeEventListener("resize",C))}function w(ce){let q=ce.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(m(),U())}function C(){U()}function F(ce){ce.key==="Escape"&&(m(),U())}function H(ce){n===ce?m():h(ce),U()}function se(){m(),U()}async function V(ce,q){if(r.has(ce.key))return;let ye=Yp(ce.key,q);r.set(ce.key,q),i.delete(ye),U();let xe=null;try{xe=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{xe=null}if(t)return;if(r.delete(ce.key),!xe||xe.ok!==!0){let oe=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";i.set(ye,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),U();return}let x=Array.isArray(xe.warnings)?xe.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];x.length>0&&i.set(ye,{kind:"warn",text:x.join(" \xB7 ")}),U(),await be()}function N(ce,q,ye,xe){let x=Gp(ce.pct),$e=`resets ${zp(ce.resetsAt,xe)}${q?` \xB7 ${ye}`:""}`;return c`<span
      class="usage-meter__window ${Hp(x)}"
      style=${`--progress: ${x}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${x}%</span>
    </span>`}function L(ce,q,ye){let xe=Xp(q,ye),x=q.available&&(q.held||xe>hl),oe=x?`${Math.floor(xe/60)}\uBD84 \uC804 \uCE21\uC815`:"",$e=q.accounts.filter(De=>!De.active).length,de=`usage-meter__group${x?" usage-meter__group--stale":""}`,Oe=c`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${q.available?q.windows.map(De=>N(De,x,oe,ye)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${$e>0?c`<span class="usage-meter__badge">+${$e}</span>`:""}`;if(q.accounts.length===0)return c`<span
        class=${de}
        aria-label=${`${ce.label} usage`}
        >${Oe}</span
      >`;let pe=n===ce.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${de}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${Up}
      @click=${()=>H(ce.key)}
    >
      ${Oe}
    </button>`}function M(ce,q){return c`<span class="usage-meter" aria-label="Usage">
      ${ce.map(ye=>L(ye.provider,ye.snapshot,q))}
    </span>`}function B(ce,q){let ye=Gp(ce.pct),xe=zp(ce.resetsAt,q);return c`<span
      class="usage-meter__account-window ${Hp(ye)}"
      style=${`--progress: ${ye}%`}
    >
      <span class="usage-meter__account-key">${ce.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ye}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function X(ce,q){return Ey.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne(ce,q,ye){let xe=q.status==="ok",x=typeof q.ageSeconds=="number"&&q.ageSeconds>hl,oe=i.get(Yp(ce.key,q.number)),$e=r.get(ce.key),de=$e!==void 0,Oe=$e===q.number,pe=["usage-meter__account"];return q.active&&pe.push("usage-meter__account--active"),xe||pe.push("usage-meter__account--unavailable"),x&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${Cy(q.ageSeconds)}</span
            >`}
        ${q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${de}
              @click=${()=>{V(ce,q.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${q.windows.map(De=>B(De,ye))}
          </div>`:c`<div class="usage-meter__account-status">
            ${X(ce,q.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function P(ce,q,ye){let xe=q.accounts.filter(x=>x.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${xe} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(x=>ne(ce,x,ye))}
    </section>`}function K(ce,q){return c`<div
      class="usage-meter__card"
      id=${Up}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(ce.provider,ce.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function U(){let ce=Date.now(),q=[];for(let xe of Kp){let x=s.get(xe.key);x&&q.push({provider:xe,snapshot:Iy(x,ce)})}if(q.length===0){m(),u();return}let ye=q.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);ye||m(),rt(M(q,ce),e),e.hidden=!1,ye?Q(ye,ce):_()}function Q(ce,q){let ye=d(),xe=e.getBoundingClientRect(),x=e.ownerDocument.documentElement.clientWidth;ye.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),ye.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,x-xe.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${K(ce,q)}`,ye)}async function Se(ce){try{let q=await fetch(ce.endpoint);return q.ok?Ly(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function be(){l+=1;let ce=l,q=await Promise.all(Kp.map(async ye=>({provider:ye,read:await Se(ye)})));if(!(t||ce!==l)){for(let ye of q){let xe=ye.provider.key;if(ye.read.kind==="ok"){s.set(xe,ye.read.snapshot);continue}if(ye.read.kind==="empty"){s.delete(xe);continue}let x=s.get(xe);x!==void 0&&!x.held&&s.set(xe,{...x,held:!0})}U()}}return u(),be(),o=setInterval(()=>{be()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}var My="worker-ineligible";function Jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zp(e){return Jo(e).includes(My)}var Dy="worker-serial";function Jp(e){return Jo(e).includes(Dy)}function Pi(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var nf="bdui.worker.candidate_sort",es=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ni=Object.freeze({preset:"spec"}),rf=3,of=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function ef(e){return es.some(t=>t.id===e)}function tf(e){let t=es.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Py(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ts(e){return e&&"preset"in e?tf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):tf("spec")}function bl(e){return e&&"preset"in e?e.preset:null}function Tr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return ef(e)?{preset:e}:Ni}return Tr(s)}if(!e||typeof e!="object")return Ni;let t=e;if(ef(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>rf||!n.every(Yi))return Ni;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=es.find(s=>Py(s.chain,r));return o?{preset:o.id}:{chain:r}}function sf(){try{return Tr(window.localStorage.getItem(nf))}catch{return Ni}}function yl(e){try{window.localStorage.setItem(nf,JSON.stringify(e))}catch{}}function af(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(ms,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:ms[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,rf)}function lf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Ny(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Pi(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function cf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(oc(ts(t))),Ny(n)}function uf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=qs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var df=new Set(["sh","bash","zsh","dash","ksh"]),pf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function ff(e){let t=e.split("/");return t[t.length-1]||""}function qy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=ff(n[0]);if(r!=="env")return df.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&df.has(ff(o))}function Fy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function jy(e){let t=[],n=0;pf.lastIndex=0;for(let r of e.matchAll(pf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Fy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function By(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function _f(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function _(L,M){return M?jy(L).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):L}function h(){if(!o)return c``;let L=s==="ready"&&qy(i),M=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>V()}
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
              @click=${()=>V()}
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
                  ${M.map((B,X)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${X+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(B,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){rt(h(),r)}async function w(){if(s!=="ready")return;let L=await on(i);he(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function C(L){L.key==="Escape"&&o&&(L.preventDefault(),V())}function F(){d||(document.addEventListener("keydown",C),d=!0)}function H(){d&&(document.removeEventListener("keydown",C),d=!1)}async function se(L,M=null){let B=++a;F(),o={...L},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let P="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let K=await n(P),U=await K.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==ne){V();return}if(!K.ok||!U||U.ok!==!0){s="error",l=By(U&&typeof U.error=="string"?U.error:""),m();return}o={lane:U.lane,base_sha:U.base_sha,path:U.path,base_ref:U.base_ref},i=String(U.content),s="ready",m()}catch{if(B!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function V(){a+=1,H(),o=null,i="",m();let L=u;u=null,L?.isConnected&&L.focus()}function N(){V(),r.remove()}return{open:se,close:V,destroy:N}}var mf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Uy=new Set(["queued","running","retry_pending"]);function gf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let P=s();return typeof P.revision=="number"?P.revision:0}function l(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function a(){let P=s().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,K){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${K}</span
    >`}function d(P){if(typeof P!="number"||!Number.isFinite(P))return"";let K=P/6e4;return Number.isInteger(K)?`timeout ${K}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function _(P){let K=d(P);return K?u("config",K):""}function h(P,K,U){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${U.script}
      @click=${Q=>{o&&o({lane:P,base_sha:K.base_sha,path:U.script,base_ref:K.base_ref},Q.currentTarget)}}
    ></button>`}function m(){let P=s().repo_operations;return Array.isArray(P)?P:[]}function w(){let P=a().repo_ops,K=P&&typeof P=="object"?P.repo_id:null;return typeof K=="string"&&K?K:null}function C(){return m().some(P=>P&&P.kind==="deploy"&&Uy.has(P.state))}function F(){let P=C(),K=w()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${P||K}
      title=${P?"\uBC30\uD3EC \uC9C4\uD589 \uC911":K?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function H(){let P=s().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function se(P,K){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!K}
        @change=${U=>{L(P,!U.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function V(P){let K=typeof P.base_sha=="string"?P.base_sha:"",U=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${K?`@${K.slice(0,7)}`:""}`,Q=H(),Se=!!P.verify&&Q.verify,be=!!P.deploy&&Q.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${U}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${P.verify?c`${h("verify",P,P.verify)}
              ${_(P.verify.timeout_ms)}
              ${Se?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":P.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${P.verify?se("verify",Q.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?c`${h("deploy",P,P.deploy)}
              ${_(P.deploy.timeout_ms)}
              ${be?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):F()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?se("deploy",Q.deploy):""}
      </div>
    </section>`}function N(P){let K=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return K&&(K.status==="resolved"||K.status==="absent")?V(K):K&&(K.status==="pending"||K.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${K.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${K.error_code?c` — <code>${K.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(P,K){if(!n)return;let U=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:K,expected_revision:i()});if(l(U),U&&U.conflict){let Q=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:K,expected_revision:i()});l(Q)}r()}async function M(){let P=w();if(!n||P===null)return;let K=await n("worker-repo-operation-deploy-run",{repo_id:P});if(l(K),!K||K.ok!==!0){let U=K&&typeof K.reason=="string"?K.reason:"",Q=Object.hasOwn(mf,U)?mf[U]:U||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";he(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${Q}`,"error")}else he("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function X(P,K,U){return c`<div class="worker-repo-ops__policy-group" data-policy=${U}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${K.map(Q=>c`<li data-token=${Q}>
              ${B[Q]||Q}
            </li>`)}
      </ul>
    </div>`}function ne(){let P=s(),K=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null;return K?c`<section
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
        ${K.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
            </div>`:""}
        ${X("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
        ${X("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(a())} ${ne()}
      </details>`}}}var yf=20,Wy=5,zy=new Set(["failed","running","queued","retry_pending"]),hf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Hy(e,t,n=yf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Gy(e){if(e.type==="cleanup")return!0;let t=e.operation;return zy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Ky(e,t,n={}){let r=Hy(e,t,1/0),o=n.expanded===!0?yf:Wy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Gy(l));return{visible:i,hidden:r.length-i.length}}function bf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Yy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function vf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
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
  </p>`}function Vy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Xy(e,t){let n=up(e,t),r=dp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Qy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Zy(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
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
          >${Yy(e)}</span
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
      ${Xy(n,Vy(t,n))}
      ${Qy(n)}
      ${vf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Bs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Jy(e){let t=e.cleanup,n=kr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?zt(e.at):""}
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
      ${wf(lr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
  </li>`}function ev(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Jy(r):Zy(r,e.repo_ops))}
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
  </section>`}function kf(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Ky(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(ev({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var tv="session-preferred",nv=["exclusive_machine","iterative_user_judgment","visual_verification"];function $f(e,t){if(!Jo(e).includes(tv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&nv.includes(n)?n:""}var rv=Rt("views:worker:adapter"),ov="tab:worker:ready",sv="tab:worker:blocked",iv="tab:worker:in-progress",av="tab:worker:resolved",lv="tab:worker:closed",cv="\u{1F512} blocked",uv={revision:0,auto_advance:!1,auto_merge:!1,slots:oi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},dv=["claude_account","codex_account"],pv=[...Kr,...dv];function fv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function _v(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Qs}: ${n}`:Qs}function Cr(e){return e&&typeof e=="object"?e:{}}function mv(e){let t={};for(let n of pv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function gv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function xf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Nr(n):null,l=new Map,a={},u=null,d=0,_=null,h=!1;function m(){h||!s||s()}function w(M){return u===M?a:{}}async function C(){if(!r||h)return;let M=o?.()||"";if(u===M||_&&_.key===M&&_.generation===d)return;let B=++d;_={key:M,generation:B};let X=null;try{X=await Promise.resolve(r("get-session-defaults",{}))}catch(ne){if(B!==d)return;_=null,rv("get-session-defaults failed: %o",ne),m();return}B===d&&(a=X&&typeof X.values=="object"&&X.values!==null?{...X.values}:{},u=M,_=null,m())}function F(){u=null,d+=1,C()}function H(){for(let[M,B]of l)B==="failed"&&l.delete(M)}function se(M,B){return i?i.selectBoardColumn(M,B):[]}function V(M,B,X,ne){let P=Array.isArray(M.queue)?M.queue:[],K=new Set([...P.map(q=>q.bead_id),...(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map(ye=>ye.bead_id)),...(Array.isArray(M.pr_wait)?M.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(M.done)?M.done:[]).map(q=>q.bead_id)]),U=new Set(X.map(q=>q.id)),Q=new Set,Se=[];for(let q of[...B,...X])K.has(q.id)||Q.has(q.id)||fv(q)||(Q.add(q.id),Se.push(q));let be=cf(Se,Tr(ne)),ce=Cr(M.bead_scope);return be.map(q=>{let ye=Dr(q),xe=ye.evidence==="published",x=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),oe=x==="quick_fix",$e=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,de=Object.hasOwn(q,"labels")&&Zp(q.labels),Oe=de||!Object.hasOwn(q,"labels")?"":$f(q.labels,q.metadata),pe=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,De=!de&&!pe&&(oe?$e:xe&&!ye.conflict),lt=U.has(q.id),ot=lt?Pi(q):[],O=[];lt&&ot.length===0&&O.push(cv),pe&&O.push(_v(q.metadata)),oe&&!$e?O.push("missing_description"):!oe&&ye.conflict?O.push("spec_id_conflict"):!oe&&ye.evidence==="none"?O.push("spec \uC5C6\uC74C"):!oe&&ye.evidence==="draft"&&O.push("spec \uBBF8\uBC1C\uD589(draft)");let ae=ce[q.id];return{bead_id:q.id,title:q.title||q.id,route:x,spec_id:ye.conflict?"":ye.path,published:xe,blocked:lt,blocked_by:ot,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:mv(Cr(q.metadata)),rec:null,...ae&&Array.isArray(ae.scope)?{scope:ae.scope}:{},eligible:De,reason:O.join(" \xB7 "),worker_ineligible:de,session_preferred:Oe.length>0,session_preferred_reason:Oe,release_info:q.release_info,dependents_info:q.dependents_info}})}function N(M){let[B,X,ne,P,K]=M,U=bs([...B,...X,...ne,...P,...K]),Q={},Se=(be,ce)=>{if(!be||typeof be.id!="string"||be.id.length===0)return;let q=Q[be.id]||(Q[be.id]={});if(typeof be.priority=="number"&&!("priority"in q)&&(q.priority=be.priority),typeof be.from_id=="string"&&!("from_id"in q)&&(q.from_id=be.from_id),ce&&!("metadata"in q)){q.metadata=Cr(be.metadata);let ye=Cr(be.workflow).route;typeof ye=="string"&&ye.length>0&&(q.route=ye)}};for(let be of[...B,...X,...ne])Se(be,!0);for(let be of[...P,...K])Se(be,!1);for(let be of new Set([...Object.keys(Q),...U.keys()])){let ce=ys(U,be);if(ce.total>0){let q=Q[be]||(Q[be]={});q.rollup=ce}}return Q}function L(M,B,X,ne){let P=new Set((Array.isArray(M.done)?M.done:[]).map(U=>U?.bead_id).filter(U=>typeof U=="string")),K=[];for(let U of B){let Q=er(U.closed_at);if(typeof U.id!="string"||P.has(U.id)||Q===null||ne!==void 0&&Q<ne||typeof U.comment_count!="number"||U.comment_count<=0)continue;let Se=`${X}\0${U.id}\0${String(U.updated_at)}\0${U.comment_count}`,be=l.get(Se);if(be===void 0&&r&&(l.set(Se,"pending"),Promise.resolve(r("get-comments",{id:U.id})).then(q=>{let ye=Array.isArray(q)&&q.some(xe=>wi(typeof xe?.text=="string"?xe.text:"")?.lane==="session");l.set(Se,ye?"session":"not-session"),m()}).catch(()=>{l.set(Se,"failed"),m()})),be!=="session")continue;let ce=er(U.started_at);K.push({id:U.id,title:U.title||U.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&Q>=ce?Q-ce:null,work_kind:"session",done_at:Q,created_at:U.created_at,updated_at:U.updated_at})}return K}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||uv,X=o?.()||"",ne=M&&typeof M.done_since=="number"?M.done_since:void 0,P=se(ov,"ready"),K=se(sv,"blocked"),U=se(iv,"in_progress"),Q=se(av,"resolved"),Se=se(lv,"closed");return{workspaces:[{...B,bead_titles:{...Cr(B.bead_titles),...Object.fromEntries([...P,...K].filter(be=>be&&typeof be.id=="string").map(be=>[be.id,be.title||be.id]))},root_dir:X,name:gv(X),runnable:V(B,P,K,M?M.candidate_sort:void 0),session_done:L(B,Se,X,ne),bead_overlay:N([P,K,U,Q,Se])}],workspaces_state:[{root_dir:X,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof Cr(B.workspace_info).slots=="number"?Cr(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:w(X),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:F,notifyIssuesChanged:H,destroy(){h=!0,d+=1,_=null,l.clear()}}}var qi=1,Af=5,hv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:qi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function un(e){return e&&typeof e=="object"?e:{}}var Tf="beads-ui.worker.candidate-filter",vl={show_blocked:!1,spec:"all"};function bv(){try{let e=window.localStorage.getItem(Tf);if(!e)return{...vl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...vl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...vl}}}function yv(e){try{window.localStorage.setItem(Tf,JSON.stringify(e))}catch{}}var vv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Cf="bdui.worker.done-range";function wv(){try{let e=window.localStorage.getItem(Cf);return e===null?"today":Rn(e)}catch{return"today"}}function kv(e){try{window.localStorage.setItem(Cf,e)}catch{}}function Sf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function $v(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Ef(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function xv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Av(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Sv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Ev=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Tv=new Set(["waiting_metadata","reviewing","retrying"]);function Cv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?zt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Rv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Ov(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Rv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Er(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Ev.has(e.phase)}}function Lv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Iv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Lv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${$v(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ef(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ef(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Mv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,_=null,h=null,m={},w=!1,C=!1,F={},H=null,se={active:!1,failure:null}){let V=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,L=!!a&&a.active===!0,M=a&&a.failure||null,B=Av(a?a.waiting:null),X=n[e]||null,ne=X&&X.gate?X.gate:null,P=X&&X.pr?X.pr:null,K=Sv(a?a.resolution:null),U=Cv(h),Q=Ov(h,U),Se=a&&a.authority||null,be=!!h&&typeof h=="object"&&Tv.has(h.phase),ce=V&&!L&&(!Se||be||Se.source==="automatic"&&!C),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":K?K.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,ye=!!ne&&ne.base_badge==="\uCDA9\uB3CC",xe=!!ne&&ne.enabled===!0,x=Oo({bead_id:e,merge_sha:F.merge_sha,cleanup_cursor:F.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:F.repo_operations}),oe=ni(x),$e=s&&!x&&(s.queueing??null)?s.queueing:null,de=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!ne&&ne.tier==="merged",Oe=r&&r.step==="repo_operations"&&x?.failed===!0&&(x.step==="deploy"||x.step==="verify")?x.step:null,pe=l&&!!r&&!!ne&&ne.tier==="merged",De=ce&&(xe||ye||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||de||pe),lt=ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale",ot=l&&ye&&u===!1,O=Yn(m,e,{external:l,merge_active:L||x?.step==="merge",merge_queued:V,conflict_active:!!i,cleanup_active:oe,merged:!!r||ne?.tier==="merged"}),ae=!!O.operation,le=V&&!M&&!N&&!de&&!(Q&&Q.lock_actions),ie=Iv({auto_pending:le,continuation_required:N,queueing:$e,merge_step:x,conflict_badge:q,conflict_live:K?.live===!0||i==="running",auto_resolution:U,recovery:Q,cleanup_failed:r,cleanup_label:r?kr(r.step):null,base_exception:_,conflicting:ye,gate:ne,receipt_check:X&&X.receipt_check?X.receipt_check:null,queue_failure:M,auto_skip:d,queued:V,queue_active:L,queue_position:a?a.position:0,review_session:se,activity:q?null:s&&s.activity||null}),we=ie?.live===!0&&ie.title?c`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&x?.active!==!0?ti(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:w,...H?{dependency_chips:H}:{},external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},badges:we?[we]:[],live_badge:ie?.live===!0?we:null,usage:o,alert:ie?.alert===!0,merge_action:ne?.tier==="merged"&&!de&&!pe?!1:!V||N||ce||lt,cancel_action:V&&!N,cancel_enabled:!L&&!(Q&&Q.lock_actions),cancel_title:Q&&Q.lock_actions?`${Q.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:L?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:O,discard_action:O.action,merge_step:x,discard_enabled:O.enabled,discard_title:O.title,merge_enabled:!x&&!$e&&!i&&!ae&&!_&&!(Q&&Q.lock_actions)&&!ot&&se.active!==!0&&(xe||ye||ne?.reason==="base_behind"||ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"||de||pe||De||be&&!L),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":de||pe?Oe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Oe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":ye&&!x&&!de?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":ne?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":ne?.reason==="review_receipt_missing"||ne?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?O.error?`\uD3D0\uAE30 \uC2E4\uD328: ${O.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${O.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$e?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:Oe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Oe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ot?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":de?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ye?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":xe?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:ne&&ne.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${ne&&ne.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function wl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:_}=t,h=r?Nr(r):null,m=bv(),w=null,C=null,F=Hr(()=>J()),H=new Map,se=new Map,V=sf(),N=bl(V)===null,L=d?Rn(d):wv();function M(){let g=Or.find(b=>b.value===L);return g?g.label:"\uC624\uB298"}let B=Ti("beads-ui.worker.lane-collapsed"),X=!1,ne=new Set,P=new Set,K=new Set,U=new Set,Q=new Set,Se=null,be=[],ce=xf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>J()});function q(){ce.refreshSessionDefaults()}let ye=document.createElement("div");ye.className="worker-console";let xe=document.createElement("div");xe.className="worker-top";let x=document.createElement("div");x.className="worker-drawer-overlay",x.hidden=!0;let oe=document.createElement("div");oe.className="worker-drawer-overlay__backdrop";let $e=document.createElement("div");$e.className="worker-drawer-host";let de=document.createElement("div");de.className="worker-drawer-host",de.hidden=!0,x.append(oe,$e,de);let Oe=document.createElement("div");Oe.className="worker-lanes-host",ye.append(xe,x,Oe),e.appendChild(ye);let pe=ir(null,null),De=[],lt=Ri({transport:n,console_el:ye,getLanes:()=>pe,getWorkspaces:()=>De,getCrossLanes:()=>null,reproject:()=>({lanes:T(),raw_lanes:null}),onCorrection:()=>{},showToast:he,requestRender:()=>J(),adoptQueue:(g,b)=>{o&&o.set(b)},onDragBegin:()=>{w=null}}),ot=null,O=ro($e,{transport:n,sessionLogStore:s,onClose:()=>{ot=null,x.hidden=!0,J()}}),ae=kf(de,{onClose:()=>{de.hidden=!0,x.hidden=!0,J()}}),le=_f({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",we=gf({queueStore:o,transport:n,onChanged:()=>J(),onOpenScript:(g,b)=>{le.open(g,b)}});function ue(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:qi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let g=ue(),b=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,A=Array.isArray(g.serial_lanes)?g.serial_lanes:[],te=[];for(let Ee of A){if(te.length>=b)break;!Ee||typeof Ee.id!="string"||!/^s[1-5]$/.test(Ee.id)||!Array.isArray(Ee.entries)||te.push({id:Ee.id,label:`\uC9C1\uB82C ${Ee.id.slice(1)}`,count:Ee.entries.length})}return te.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...te]}function He(g){if(!w||!g.some(A=>A.id===w))return null;let b=Fe();return b?{bead_id:w,lanes:b}:null}function Qe(){return l&&l()||""}async function Pe(g,b){await lt.sendOp({type:"worker-queue-place",payload:{bead_id:g,...b==="parallel"?{}:{lane:b}},root_dir:Qe()},g)}function Y(){let g=ue();return typeof g.revision=="number"?g.revision:0}function j(g){g&&g.queue&&o&&o.set(g.queue)}async function Ne(g){if(!n||!g)return;let b=await n("worker-attempt-pause",{attempt_id:g});b&&b.paused===!1&&b.reason&&he(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function ct(g,b="session"){if(!n||!g)return;let A=await Br();if(A===null)return;let te=async(Ee={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Y(),...A!==""?{instructions:A}:{},...Ee}),_e=await te();j(_e),_e&&_e.conflict&&(_e=await te(),j(_e)),_e=await Wn(_e,(Ee,Ge)=>te({continuation:Ee,decision_token:Ge}),{onResult:j,refresh:()=>te()}),_e&&_e.resumed===!1&&!_e.conflict&&_e.reason&&he(`${b==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${_e.reason}`,"error",2400)}async function Ze(g,b,A=!0){if(!n)return null;let te=n,_e=await te(g,{...b,expected_revision:Y()});return j(_e),_e&&_e.conflict&&A&&(_e=await te(g,{...b,expected_revision:Y()}),j(_e)),_e}async function y(g){if(!n||!g)return;let b=ue().merge_queue?.find(te=>te.bead_id===g)?.continuation_action;if(b?.mismatch&&b.continuation===null){await je(g,b.mismatch);return}ne.add(g),J();let A;try{A=await Ze("worker-merge-queue-add",{bead_id:g})}catch{he("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ne.delete(g),J()}if(!(!A||A.applied)){if(A.conflict){he("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}he(xv(A.reason),"error",2400)}}async function W(g){if(!(!n||!g||P.has(g))){P.add(g),J();try{let b=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Y()});j(b),b&&!b.retried&&!b.conflict&&b.reason&&he(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{P.delete(g),J()}}}async function Te(g,b){let A=ue().hold;if(!n||!A||typeof A.since!="number")return;let te=await n(g,{since:A.since});j(te),te&&te.ok===!1&&he(`${b}: ${te.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":te.reason||""}`,"error",2800)}async function Re(g,b){if(!n||!g||!b)return;let A=await n("worker-parked-retry",{bead_id:g,attempt_id:b});j(A),A&&A.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${A.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":A.reason||""}`,"error",2800)}async function je(g,b){let A=await Wn({continuation_mismatch:b},(_e,Ee)=>Ze("worker-merge-queue-add",{bead_id:g,continuation:_e,decision_token:Ee},!1)),te=A?.queue?.merge_queue?.find(_e=>_e.bead_id===g)?.continuation_action;if(A?.applied!==!0&&te?.continuation===null&&te.mismatch){await je(g,te.mismatch);return}A&&A.applied===!1&&!A.conflict&&he("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ke(g){if(!n)return;let b=await Ze("worker-merge-auto-toggle",{on:g});!b||b.conflict||he(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function dt(g){if(!n||!g)return;let b=await Ze("worker-merge-queue-remove",{bead_id:g});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&he("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function vt(){await Ze("worker-merge-queue-remove",{all:!0})}async function It(g,b=null,A="unmerged",te=null){if(!n||!g)return;let _e=To(g,A);if(!(!!te||typeof globalThis.confirm!="function"||globalThis.confirm(_e)))return;let Ge=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...te?{operation_id:te}:{},expected_revision:Y()});if(j(Ge),Ge&&Ge.conflict&&(Ge=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...te?{operation_id:te}:{},expected_revision:Y()}),j(Ge)),Ge&&Ge.discarded===!0){he(Ws(Ge),"success",5e3);return}if(Ge&&Ge.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${Ge.reason}`,"error",2800);return}if(Ge&&Ge.accepted&&Ge.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ge&&Ge.accepted&&!Ge.discarded){he(`\uD3D0\uAE30 \uC9C4\uD589: ${Ge.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ge&&!Ge.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function wt(g,b,A){if(!(!n||!b||!A||U.has(b))){U.add(b),J();try{let te=await n(g,{bead_id:b,action_id:A,expected_revision:Y()});j(te),te?.conflict?he("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!te?.ok&&te?.reason&&he(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(te.reason)}`,"error",2800)}finally{U.delete(b),J()}}}async function mt(g,b){if(!n||!b||K.has(b))return;K.add(b),J();let A;try{let te=async(_e={})=>await n(g,{bead_id:b,expected_revision:Y(),..._e});A=await te(),j(A),A&&A.conflict&&(A=await n(g,{bead_id:b,expected_revision:Y()}),j(A)),g==="worker-revise-fix"&&(A=await Wn(A,(_e,Ee)=>te({continuation:_e,decision_token:Ee}),{onResult:j,refresh:()=>te()}))}finally{K.delete(b),J()}if(!(!A||A.conflict)){if(A.ok){he(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}he(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function Be(g){if(!n)return;let b=await n("worker-automation-toggle",{on:g,expected_revision:Y()});j(b),b&&b.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Y()}).then(j)}async function I(g){if(!n||!g)return;let b=await n("worker-repo-operation-dismiss",{operation_id:g});j(b),b&&b.ok===!1&&he(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function ee(g){if(!n||!Number.isFinite(g))return;let b=Math.max(qi,Math.floor(g)),A=await n("worker-queue-set-slots",{slots:b,expected_revision:Y()});j(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:Y()}).then(j)}async function ge(g){if(!n||!Number.isInteger(g)||g<1||g>Af)return;let b=ue(),A=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(g).reduce((Ee,Ge)=>Ee+(Array.isArray(Ge?.entries)?Ge.entries.length:0),0),te=()=>({count:g,expected_revision:Y()}),_e=await n("worker-queue-set-serial-lane-count",te());j(_e),_e&&_e.conflict&&(_e=await n("worker-queue-set-serial-lane-count",te()),j(_e)),_e&&_e.applied&&A>0&&he(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function T(){let g=hr(L),b=ce.read({candidate_sort:V,done_since:g});return De=b.workspaces,pe=ir(b.workspaces,b.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),pe}function G(g){return g.queue_groups[0]||hv}function Ie(g){let b=g.dependency_chips||null,A={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},te=H.get(g.id),_e=se.get(g.id)||null,Ee=te&&te.overlaps.length>0?te.overlaps:null,Ge=!!te&&te.scope_missing;return!_e&&!Ee&&!Ge&&Object.keys(A).length===0?null:{...A,..._e?{predecessors:_e}:{},...Ee?{overlaps:Ee}:{},...Ge?{scope_missing:!0}:{}}}function Ue(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:qe(g)}}function qe(g){return Xs(g,b=>F.isOpen({bead_id:g.id,chip_key:b}))}function Je(){let g=ue(),b=new Map;for(let A of Object.values(un(g.lane_states))){let te=Array.isArray(A?.corrections)?A.corrections:[];for(let _e of te)_e&&typeof _e.bead_id=="string"&&typeof _e.after=="string"&&b.set(_e.bead_id,_e.after)}return{admission:un(g.admission),bead_labels:un(g.bead_labels),correction_after:b}}function Ce(g,b){let A=Ue(g),te=yu(b.admission[g.id]||null,!!g.discard||U.has(g.id)),_e=b.bead_labels[g.id],Ee=b.correction_after.get(g.id);return{...A,draggable:A.draggable===!0&&!te,stale_work:te,reason:te?"":A.reason,worker_serial:Array.isArray(_e)&&Jp(_e),badges:Ee?[`\u{1F517} ${Ee} \uB4A4 (blocks \uC790\uB3D9)`,...A.badges||[]]:A.badges,revise_enabled:A.revise_enabled===!0&&!K.has(g.id)}}function ze(g){let b=Je();return G(g).sublanes.parallel.map(A=>Ce(A,b))}function et(g){let b=Je();return G(g).sublanes.serial.map(A=>{let te=A.occupants.map(_e=>({id:_e.id,title:_e.title,draggable:!1,lane:A.id,ghost:!0,badges:[_e.badge]}));return{id:A.id,index:A.index+1,raw_length:A.raw_length,ghosts:te,items:A.items.map(_e=>Ce(_e,b)),occupied:A.occupied_by.length>0,badge:A.occupants.length>0?A.occupants[0].badge:"\uB300\uAE30",cycle:A.cycle===!0}})}function bt(g){return g.runnable.map(b=>Ue(b))}function We(g){return g.done.map(b=>Ue(b))}function xt(g){let b=g.running.filter(A=>A.non_occupying!==!0).map(A=>({...A,bead_id:A.id,attempt_id:A.attempt_id||"",paused:A.run_state==="paused",failed:A.run_state==="failed",parked:A.run_state==="parked",retry_wait:A.run_state==="retry_wait",status_label:A.run_state==="failed"?A.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":A.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":A.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:A.can_pause!==!1,workspace_name:"",dependency_chips:Ie(A)||void 0,chip_popover:qe(A),rollup_expanded:Q.has(A.id),failure:A.failure?{...A.failure,open:C===A.attempt_id}:null}));return[...b.filter(A=>A.failed===!0),...b.filter(A=>A.failed!==!0&&A.parked===!0),...b.filter(A=>A.failed!==!0&&A.parked!==!0)]}function Ft(g){if(Se&&Se.model===g)return Se.rows;let b=ue(),A=G(g),te=un(b.attempts),_e=Object.values(te).filter(Gn),Ee=new Map;for(let Xe of _e)Ee.set(Xe.attempt_id,Xe);let Ge=new Map;for(let Xe of _e)Ge.set(Xe.bead_id,Xe);let $t=new Map;for(let Xe of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])$t.has(Xe.id)||$t.set(Xe.id,Xe);let jt=Xe=>{let Nt=null;for(let bn of _e)!bn||bn.bead_id!==Xe||La(bn,Ee)||(Nt===null||(typeof bn.started_at=="number"?bn.started_at:0)>=(typeof Nt.started_at=="number"?Nt.started_at:0))&&(Nt=bn);return Nt&&typeof Nt.target_base=="string"?Nt.target_base:null},Ut=new Map;for(let Xe of g.running)Xe.run_state==="failed"||Xe.conflict_resolution!==!0||(Xe.run_state!=="paused"?Ut.set(Xe.id,"running"):Ut.has(Xe.id)||Ut.set(Xe.id,"paused"));let dn=un(b.auto_merge_skips),dr=new Set(A.merge.auto_excluded),hn=un(b.pr_observations),Mn=un(b.pr_activity),Dn=un(b.cleanup_failed),Kt=un(b.discard_operations),Pn=un(b.bead_workflow),Nn=un(b.bead_titles),qn=b.merge_queue_state||{active:null,failures:{}},Fn=A.merge.state.waiting,Jn=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Xe=>{let Nt=$t.get(Xe.bead_id);return{...Mv(Xe.bead_id,Nt?.title||Nn[Xe.bead_id]||Xe.bead_id,hn,Dn[Xe.bead_id]||null,Hn(te,Xe.bead_id),Mn[Xe.bead_id]||(ne.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:P.has(Xe.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Ut.get(Xe.bead_id)||null,Xe.external===!0,{position:A.merge.positions.get(Xe.bead_id)||0,active:qn.active===Xe.bead_id,failure:un(qn.failures)[Xe.bead_id]||null,waiting:Fn&&Fn.bead_id===Xe.bead_id?Fn.reason:null,resolution:A.merge.resolutions.get(Xe.bead_id),continuation_action:A.merge.continuations.get(Xe.bead_id),authority:A.merge.authorities.get(Xe.bead_id)||null},Xe.wt_present!==!1,b.auto_merge===!0&&dr.has(Xe.bead_id)?dn[Xe.bead_id]?.reason||"":null,Oa(A.declared_base,jt(Xe.bead_id)),un(b.completion_status)[Xe.bead_id]||null,Kt,Ge.get(Xe.bead_id)?.worker_serial===!0,b.auto_merge===!0,{merge_sha:Xe.merge_sha,cleanup_cursor:Xe.cleanup_cursor,repo_operations:A.repo_operations},Nt?Ie(Nt):null,mu(te,Xe.bead_id)),workflow:Pn[Xe.bead_id]||null,priority:Nt?.priority,from_id:Nt?.from_id,...Nt?.created_at===void 0?{}:{created_at:Nt.created_at},...Nt?.updated_at===void 0?{}:{updated_at:Nt.updated_at}}});return Se={model:g,rows:Jn},Jn}function it(g){let b=G(g),A=[];for(let Ee of g.running)Ee.non_occupying!==!0&&A.push({id:Ee.id,title:Ee.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ee.serial_lane_id??null});for(let Ee of g.pr_wait)A.push({id:Ee.id,title:Ee.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ee of b.sublanes.serial)Ee.items.forEach((Ge,$t)=>{A.push({id:Ge.id,title:Ge.title,location_label:`${Ee.id} #${$t+1}`,kind:"serial",lane_id:Ee.id})});b.sublanes.parallel.forEach((Ee,Ge)=>{A.push({id:Ee.id,title:Ee.title,location_label:`#${Ge+1}`,kind:"parallel",lane_id:null})});for(let Ee of g.runnable)A.push({id:Ee.id,title:Ee.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ee.queue_placeable===!0});let te=ue();H=uf(te.bead_scope,A);let _e=new Map;for(let Ee of[...g.running,...g.runnable])Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&_e.set(Ee.id,Ee.blocked_by);for(let[Ee,Ge]of Object.entries(un(te.bead_blocked_by)))Array.isArray(Ge)&&_e.set(Ee,Ge.filter($t=>typeof $t=="string"&&$t.length>0));se=Cu(_e,A,un(te.blocker_workspaces))}function Yt(g){let b=g.hold&&typeof g.hold=="object"?g.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let A=lr(b.cause)||String(b.cause||""),te=Array.isArray(g.lineages)?g.lineages:[];if(b.kind==="env"){let Ee=te.map($t=>$t&&$t.next_at).filter($t=>typeof $t=="number").sort(($t,jt)=>$t-jt)[0],Ge=typeof Ee=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ee).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${A} — 재시도 대기${Ge}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let _e=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(Ee=>typeof Ee=="string"&&Ee.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${A}${_e.length>0?` \u2014 bead ${_e.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function kt(g){let b=ue(),A=G(g),te=A.sublanes.parallel,_e=te.length>0?te[0].id:"\u2014",Ee=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ge=Ht(g),$t=A.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",jt=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(Kt=>Kt&&typeof Kt.armed_by_lane=="string"&&Kt.armed_by_lane.length>0).length,Ut=jt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${jt}건 진행 중</span
          >`:"",dn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${A.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Ft(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${g.done.length}</b></span
      >`,dr=c`<span
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
          ${Array.from({length:Af},(Kt,Pn)=>Pn+1).map(Kt=>c`<option
                value=${String(Kt)}
                ?selected=${A.serial_lane_count===Kt}
              >
                ${Kt}
              </option>`)}
        </select>
      </label> `,Mn=hu(A.repo_operations,A.cleanup_failures),Dn=Yt(b);return X?c`<div class="worker-ribbon">
          ${Ee} ${Ge}
          <div class="worker-kpi worker-kpi--ribbon">
            ${$t}${Ut}${dn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${hn}</div>
          <div class="worker-kpi">${dr}</div>
        </div>
        ${Dn}${Mn}${we.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Ee}${Ge}${hn}</div>
        <div class="worker-kpi">
          ${$t}${Ut}${dn}${dr}
          ${(Array.isArray(A.token_total)?A.token_total:A.token_total?[{label:A.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Kt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Kt.tooltip}
                >${M()} 완료 · 누적 ${Kt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_e}</b></span
          >
        </div>
      </div>
      ${Dn}${Mn}${we.template()}`}function Mt(g){let b=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${vv.map(A=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${m.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function Vt(){let g=N?"custom":bl(V)||"custom";return c`<select
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
    </select>`}function Xt(){let g=ts(V);return c`<div
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
    </div>`}function nn(){return c`<div class="worker-done-controls">
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
    </div>`}function Ht(g){let b=G(g).merge,A=ue().auto_merge===!0;if(b.running)return c`<button
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
      </button>`;let te=new Set(b.auto_excluded),_e=Ft(g).filter(Ee=>Ee.merge_action&&Ee.merge_enabled&&!te.has(Ee.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_e>0?` ${_e}`:""}
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
    </span>`}function Qt(g,b){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${tn(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${xn(g,{actions:Dt(g)})}
    </div>`}function Ct(g){let b=ze(g),A=Qe();return Zs({parallel:{rows:b.map((te,_e)=>Qt(te,{kind:"parallel",root_dir:A,row_index:_e})),count:b.length,collapsed:B.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:A}},serial:{lanes:et(g).map(te=>({id:te.id,title:`\uC9C1\uB82C ${te.index}`,rows:[...te.ghosts.map(_e=>xn(_e,{actions:Dt(_e)})),...te.items.map((_e,Ee)=>Qt(_e,{kind:"repo-serial",root_dir:A,row_index:Ee,lane_id:te.id}))],count:te.ghosts.length+te.items.length,empty:te.ghosts.length+te.items.length===0,badge:te.badge,held:te.occupied,cycle:te.cycle,drop:{drop:"repo-serial",root_dir:A,lane_id:te.id,lane_length:String(te.raw_length)}})),collapsed:B.isAreaCollapsed("serial")}})}function Gt(g){return mp(xt(g),Date.now(),ot)}function Pt(g){return g.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function St(g){let b=G(g),A=bt(g),te=ze(g),_e=We(g),Ee=Ft(g),Ge=xt(g),$t=In({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:A,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Vt(),header_row:N?Xt():void 0,controls:Mt(g),collapsible:!0,collapsed:B.isCollapsed("candidate"),place_menu:He(A),onOpenDoc:u?(Ut,dn)=>u(dn):void 0}),jt=In({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_e,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,header_control:nn(),collapsible:!0,collapsed:B.isCollapsed("done"),preview:X?Array.isArray(b.token_total)?b.token_total.map(Ut=>Ut.label).join(" \xB7 "):b.token_total||Sf(_e):void 0});return X?c`<div class="worker-lanes worker-lanes--mobile">
        ${Js({live:Pt(g),running_body:Ge.length>0?Gt(g):"",pr_wait_rows:Ee.map(Ut=>xn(Ut)),count:Ge.length+Ee.length})}
        ${In({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:te,count:te.length,collapsible:!0,collapsed:B.isCollapsed("queue"),preview:Sf(te),body:Ct(g)})}
        ${$t} ${jt}
      </div>`:c`<div class="worker-lanes">
      ${$t}
      ${In({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:te,count:te.length,collapsible:!0,collapsed:B.isCollapsed("queue"),body:Ct(g)})}
      ${In({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ge,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${b.slots}</span
        >`,live:Pt(g),collapsible:!0,collapsed:B.isCollapsed("running"),body:Gt(g)})}
      ${In({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ee,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:B.isCollapsed("pr_wait")})}
      ${jt}
    </div>`}function me(g){B.toggle(g),J()}function S(g){B.toggleArea(g),J()}function J(){let g=T();it(g),rt(kt(g),xe),rt(St(g),Oe)}function Le(){let g=!0,b=Ei(A=>{if(X=A,g){g=!1;return}J()});be.push(b)}function p(g){m=g,yv(g),J()}function f(g){if(g==="custom"){N=!0,J();return}V=Tr(g),yl(V),N=!1,J()}function k(g){V=Tr({chain:g}),yl(V),J()}function R(g){L=Rn(g),kv(L),_?.(L),J()}function z(g){let b=g.target?.closest?.(".worker-serial-lane-count");if(b){let jt=Number.parseInt(b.value,10);Number.isFinite(jt)&&ge(jt).then(J);return}let A=g.target?.closest?.(".worker-filter__blocked");if(A){p({...m,show_blocked:A.checked});return}let te=g.target?.closest?.(".worker-sort-chain__key");if(te){let jt=Number.parseInt(te.getAttribute("data-step")||"",10);Number.isFinite(jt)&&k(af(ts(V),jt,te.value));return}let _e=g.target?.closest?.(".worker-done-range");if(_e){R(_e.value);return}let Ee=g.target?.closest?.(".worker-sort");if(Ee){f(Ee.value);return}let Ge=g.target?.closest?.(".worker-slots__input");if(!Ge)return;let $t=Number.parseInt(Ge.value,10);if(!Number.isFinite($t)){J();return}ee($t).then(J)}function re(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function fe(){let g=G(T()),b=ue().workspace_info,A=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:A}}function ve(){ot&&O.close(),de.hidden=!1,x.hidden=!1,ae.open(fe()),J()}function Ye(g){let b=ue(),A=b.attempts?b.attempts[g]:null;ot=g,ae.close(),de.hidden=!0,x.hidden=!1,O.open({attempt_id:g,meta:re(A)}),J()}function _t(g){let b=ue(),A=(Array.isArray(b.session_active)?b.session_active:[]).find(_e=>_e&&_e.bead_id===g),te=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(_e=>_e&&_e.current===!0);te&&(ae.close(),de.hidden=!0,x.hidden=!1,O.open(Ur(te,g,"in_progress")),J())}function ft(){if(ae.isOpen()&&ae.refresh(fe()),!ot)return;let g=ue(),b=g.attempts?g.attempts[ot]:null;if(b){O.updateMeta(re(b));return}O.close()}function Zt(g,b){if(g.length===0||!i)return;let A=l?l():void 0;if(b.length===0||!A||b===A||!a){i(g);return}Promise.resolve(a(b)).then(()=>{i(g)}).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function $(g){let b=g.target;if(b?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let A=b?.closest?.(".worker-sort-chain__dir");if(A){let Me=Number.parseInt(A.getAttribute("data-step")||"",10);Number.isFinite(Me)&&k(lf(ts(V),Me));return}let te=b?.closest?.(".worker-dep__open");if(te){Zt(te.getAttribute("data-dep-id")||"",te.getAttribute("data-root-dir")||"");return}let _e=b?.closest?.(".judgement-chip");if(_e){let Me=_e.closest("[data-bead-id]"),Et=Me&&Me.getAttribute("data-bead-id")||"",Wt=_e.getAttribute("data-chip-key")||"";Et&&Wt&&F.toggle({bead_id:Et,chip_key:Wt});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){ve();return}let Ee=b?.closest?.(".worker-repo-op__dismiss");if(Ee){I(Ee.dataset.operationId||"");return}let Ge=b?.closest?.(".worker-cleanup__resume");if(Ge){let Me=Ge.dataset.beadId;Me&&W(Me);return}if(b?.closest?.(".worker-hold__retry")){Te("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){Te("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Be(!ue().auto_advance);return}let $t=b?.closest?.(".worker-merge-all");if($t){$t.classList.contains("worker-merge-all--stop")?ue().auto_merge===!0?Ke(!1):vt():Ke(!0);return}let jt=b?.closest?.(".worker-pane__toggle[data-lane]");if(jt){let Me=jt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&me(Me);return}let Ut=b?.closest?.(".worker-wait__area-toggle[data-area]");if(Ut){let Me=Ut.dataset.area;(Me==="parallel"||Me==="serial")&&S(Me);return}let dn=b?.closest?.(".worker-card__place-lane");if(dn){let Me=dn.dataset.beadId,Et=dn.dataset.lane;Me&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(w=null,J(),Pe(Me,Et));return}if(b?.closest?.(".worker-card__place-cancel")){w=null,J();return}let hn=b?.closest?.(".worker-card__place");if(hn){let Me=hn.dataset.beadId;Me&&!hn.disabled&&(Fe()?(w=Me,J()):Pe(Me,"parallel"));return}let Mn=b?.closest?.(".worker-filter__chip");if(Mn){let Me=Mn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&p({...m,spec:Me});return}let Dn=b?.closest?.('[data-action="queue-remove"]');if(Dn){let Me=Dn.dataset.beadId||"";Me&&lt.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Qe()},Me);return}let Kt=b?.closest?.(".worker-mini__merge");if(Kt){let Me=Kt.dataset.beadId||"";ue().cleanup_failed?.[Me]?W(Me):y(Me);return}let Pn=b?.closest?.(".worker-mini__merge-cancel");if(Pn){dt(Pn.dataset.beadId||"");return}let Nn=b?.closest?.(".worker-mini__discard");if(Nn){It(Nn.dataset.beadId||"",Nn.dataset.attemptId||null,Nn.dataset.discardMode==="merged"?"merged":"unmerged",Nn.dataset.operationId||null);return}let qn=b?.closest?.(".worker-mini__stale-continue");if(qn){wt("worker-stale-work-continue",qn.dataset.beadId||"",qn.dataset.actionId||"");return}let Fn=b?.closest?.(".worker-mini__stale-backup");if(Fn){wt("worker-stale-work-backup-fresh",Fn.dataset.beadId||"",Fn.dataset.actionId||"");return}let Jn=b?.closest?.(".worker-mini__stale-recheck");if(Jn){wt("worker-stale-work-recheck",Jn.dataset.beadId||"",Jn.dataset.actionId||"");return}let Xe=b?.closest?.(".worker-mini__revise-fix");if(Xe){mt("worker-revise-fix",Xe.dataset.beadId||"");return}let Nt=b?.closest?.(".worker-mini__revise-approve");if(Nt){mt("worker-revise-approve",Nt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let bn=b?.closest?.(".rtile__failure-badge");if(bn){let Me=bn.dataset.attemptId||"";C=C===Me?null:Me,J();return}let ns=b?.closest?.(".rtile__attempt-copy");if(ns){let Me=ns.dataset.attemptId||"";Me&&on(Me).then(Et=>{he(Et?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Et?"success":"error",1400)});return}if(b?.closest?.(".rtile__parked-retry")){let Me=b?.closest?.(".rtile");Re(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let so=b?.closest?.(".rtile__discard");if(so){let Me=b?.closest?.(".rtile"),Et=Me?.dataset?.beadId,Wt=Me?.dataset?.attemptId;Et&&It(Et,Wt||null,so.dataset.confirmation==="merged"?"merged":"unmerged",so.dataset.operationId||null);return}if(b?.closest?.(".rtile__pause")){let Et=b?.closest?.(".rtile")?.dataset?.attemptId;Et&&Ne(Et);return}if(b?.closest?.(".rtile__resume")){let Me=b?.closest?.(".rtile__resume"),Wt=b?.closest?.(".rtile")?.dataset?.attemptId;Wt&&ct(Wt,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let Me=b?.closest?.(".rtile"),Et=Me?.dataset?.attemptId;if(Et){Ye(Et);return}let Wt=Me?.dataset?.beadId;Wt&&_t(Wt);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){ae.close(),O.close();return}if(b?.closest?.(".worker-drawer-host"))return;let rs=b?.closest?.(".rtile .board-card__roll-toggle");if(rs){let Me=rs.dataset.rollParent;Me&&(Q.has(Me)?Q.delete(Me):Q.add(Me),J());return}let os=b?.closest?.(".rtile .board-card__roll-child");if(os){let Me=os.dataset.childId;Me&&i&&i(Me);return}let io=b?.closest?.(".rtile");if(io){if(b?.closest?.(".rtile__id")){let Et=io.dataset.beadId;Et&&on(Et).then(Wt=>{Wt?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=io.dataset.beadId;Me&&i&&i(Me);return}let ss=b?.closest?.(".worker-mini, .worker-card");if(ss){let Me=ss.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){Me&&on(Me).then(Wt=>{Wt?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=b?.closest?.(".ctl-chip--from");if(Et){let Wt=Et.dataset.fromId;Wt&&i&&i(Wt);return}Me&&i&&i(Me)}}lt.attach(e),e.addEventListener("click",$),e.addEventListener("change",z);function E(g){let b=g.target,A=b&&typeof b.closest=="function"?te=>b.closest(te):()=>null;C&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,J())}function Ae(g){g.key!=="Escape"||C===null||(C=null,J())}return document.addEventListener("click",E),document.addEventListener("keydown",Ae),F.attach(),be.push(()=>{document.removeEventListener("click",E),document.removeEventListener("keydown",Ae),F.detach()}),Le(),h&&be.push(h.subscribe(()=>{ce.notifyIssuesChanged(),J()})),o&&be.push(o.subscribe(()=>{let g=l&&l()||"";g!==ie&&(ie=g,le.close()),J(),ft()})),J(),{load(){ce.ensureSessionDefaults(),J()},refreshSessionDefaults:q,destroy(){for(let g of be.splice(0))try{g()}catch{}lt.detach(),e.removeEventListener("click",$),e.removeEventListener("change",z),ce.destroy();try{O.destroy()}catch{}x.hidden=!0;try{le.destroy()}catch{}rt(c``,e)}}}function kl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Rf(e,t,n,r=async()=>{},o=async()=>{}){let s=Rt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let X=M.target.value,P=t.getState().workspace?.current?.path||"";if(X&&X!==P){s("switching workspace to %s",X),l=!0,L();try{await n(X)}catch(K){s("workspace switch failed: %o",K)}finally{l=!1,L()}}}async function _(){let M=t.getState(),B=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!B||a)){s("git-pulling workspace %s",B),a=!0,L();try{await r(B)}catch(X){s("workspace git pull failed: %o",X)}finally{a=!1,L()}}}function h(M){let B=M.target;B&&e.contains(B)||C()}function m(M){M.key==="Escape"&&C()}function w(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),L())}function C(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),L())}function F(){u?C():w()}async function H(M){let B=M.target,X=B.value,ne=B.checked;s("toggling visibility %s \u2192 %s",X,String(ne));try{await o(X,ne)}catch(P){s("workspace visibility toggle failed: %o",P)}}function se(M){return M?c`
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
    `:c``}function V(M,B){return c`
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
                ${M.map(X=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!B.has(X.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${kl(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let M=t.getState(),B=M.workspace?.current,X=M.workspace?.available||[],ne=new Set(M.workspace?.hidden||[]),P=B?.path||X[0]?.path||"";if(X.length===0)return c``;let K=X.filter(U=>!ne.has(U.path)||U.path===P);if(K.length<=1){let U=K[0]||X[0],Q=kl(U.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${U.path}"
            >${Q}</span
          >
          ${V(X,ne)}
          ${se(P)}
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
          ${K.map(U=>c`
              <option
                value="${U.path}"
                ?selected=${U.path===P}
                title="${U.path}"
              >
                ${kl(U.path)}
              </option>
            `)}
        </select>
        ${V(X,ne)}
        ${se(P)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){rt(N(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),rt(c``,e)}}}var Of=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function $l(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Lf(e,t,n=$l()){return{id:n,type:e,payload:t}}function If(e={}){let t=Rt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],_=new Map,h=new Set;function m(N){for(let L of Array.from(h))try{L(N)}catch{}}function w(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*N,M=Math.max(0,Math.round(N+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,V()},M)}function C(N){try{o?.send(JSON.stringify(N))}catch(L){t("ws send failed",L)}}function F(){for(s="open",t("ws open"),m(s),i=0;d.length;){let N=d.shift();N&&C(N)}}function H(N){let L;try{L=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let B=u.get(L.id);u.delete(L.id),L.ok?B?.resolve(L.payload):B?.reject(L.error||new Error("ws error"));return}let M=_.get(L.type);if(M&&M.size>0)for(let B of Array.from(M))try{B(L.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",L.type)}function se(){s="closed",t("ws closed"),m(s);for(let[N,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(N);i+=1,w()}function V(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),s="connecting",m(s),o.addEventListener("open",F),o.addEventListener("message",H),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(L){t("ws connect failed %o",L),w()}}return V(),{send(N,L){if(!Of.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let M=$l(),B=Lf(N,L,M);return t("send %s id=%s",N,M),new Promise((X,ne)=>{u.set(M,{resolve:X,reject:ne,type:N}),o&&o.readyState===o.OPEN?C(B):(t("queue %s id=%s (state=%s)",N,M,s),d.push(B))})},on(N,L){_.has(N)||_.set(N,new Set);let M=_.get(N);return M?.add(L),()=>{M?.delete(L)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,V()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Dv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Pv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var xl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],cr="tab:worker:closed",Nv="bdui.worker.done-range",Df=Op,Pf="worker:queue",Nf="ui:order",qf="ui:display-policy",Ff="exec:presets",ur="tab:board:closed",jf="beads-ui.board.closed-range";function qv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Fv(e))});return n.observe(e),()=>n.disconnect()}function Fv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function jv(e){let t=Rt("main");t("bootstrap start"),qv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Qp(i),l&&a&&u&&d){let $e=function($,E){let Ae="Request failed",g="";if($&&typeof $=="object"){let A=$;if(typeof A.message=="string"&&A.message.length>0&&(Ae=A.message),typeof A.details=="string")g=A.details;else if(A.details&&typeof A.details=="object")try{g=JSON.stringify(A.details,null,2)}catch{g=""}}else typeof $=="string"&&$.length>0&&(Ae=$);let b=E&&E.length>0?`Failed to load ${E}`:"Request failed";oe.open(b,Ae,g)},Ne=function($){return`${me.getState().workspace.current?.path||""}\0${$}`},ct=function(){we&&(we().catch(()=>{}),we=null),ue=null,Fe=null},y=function($){He=$;let E=()=>{He!==$||me.getState().selected_id!==$||(He=null,Ze($))};if(!Y){Pe.then(E);return}E()},je=function($,E,Ae,g,b){return Ae!==Re[E]?(b().catch(()=>{}),!1):($.set(g,b),!0)},dt=function(){let $=me.getState();Be($.view==="board"),Ie($.view==="worker"),et(ze($)),qe($.view==="board"||$.view==="worker"||Ke||!!$.selected_id)},wt=function(){let $=hr(vt);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},mt=function(){let $=hr(It);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},Be=function($){if($)for(let[E,Ae]of xl){if(W.has(E)||Te.has(E))continue;let g=E===ur?wt():{type:Ae};try{De.register(E,g)}catch(te){t("register %s store failed: %o",E,te)}Te.add(E);let b=Re.board,A=!1;pe.subscribeList(E,g).then(te=>{A=!je(W,"board",b,E,te)}).catch(te=>{t("subscribe %s failed: %o",E,te),$e(te,"board")}).finally(()=>{Te.delete(E),A&&dt()})}else ge()},ge=function(){Re.board+=1;for(let[$]of xl){let E=W.get($);E&&(E().catch(()=>{}),W.delete($));try{De.unregister($)}catch(Ae){t("unregister %s failed: %o",$,Ae)}}},Ie=function($){if(!$){Ue();return}for(let[E,Ae]of Mf){if(T.has(E)||Te.has(E))continue;let g=E===cr?mt():{type:Ae};try{De.register(E,g)}catch(te){t("register %s store failed: %o",E,te)}Te.add(E);let b=Re.worker,A=!1;pe.subscribeList(E,g).then(te=>{A=!je(T,"worker",b,E,te)}).catch(te=>{t("subscribe %s failed: %o",E,te),$e(te,"worker")}).finally(()=>{Te.delete(E),A&&dt()})}},Ue=function(){Re.worker+=1;for(let[$]of Mf){let E=T.get($);E&&(E().catch(()=>{}),T.delete($));try{De.unregister($)}catch(Ae){t("unregister %s failed: %o",$,Ae)}}},qe=function($){if(!$){Je();return}G||(Oe("subscribe-worker-queue",{id:Pf}).catch(E=>{t("subscribe-worker-queue failed: %o",E)}),G=()=>Oe("unsubscribe-worker-queue",{id:Pf}))},Je=function(){G&&(G().catch(()=>{}),G=null)},ze=function($){return $.view==="monitor"||$.selected_id!=null},et=function($){if(!$){bt();return}Ce||(Oe("subscribe-monitor-pipeline",{id:Df}).catch(E=>{t("subscribe-monitor-pipeline failed: %o",E)}),Ce=()=>Oe("unsubscribe-monitor-pipeline",{id:Df}))},bt=function(){Ce&&(Ce().catch(()=>{}),Ce=null)},xt=function(){We||(Oe("subscribe-ui-order",{id:Nf}).catch($=>{t("subscribe-ui-order failed: %o",$)}),We=()=>Oe("unsubscribe-ui-order",{id:Nf}))},Ft=function(){We&&(We().catch(()=>{}),We=null),O.clear()},Yt=function(){it||(Oe("subscribe-display-policy",{id:qf}).catch($=>{t("subscribe-display-policy failed: %o",$)}),it=()=>Oe("unsubscribe-display-policy",{id:qf}))},kt=function(){it&&(it().catch(()=>{}),it=null),ae.clear()},Vt=function(){Mt||(Oe("subscribe-impl-presets",{id:Ff}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),Mt=()=>Oe("unsubscribe-impl-presets",{id:Ff}))},Ct=function($){if(!$)return"Unknown";let E=$.split("/").filter(Boolean);return E.length>0?E[E.length-1]:"Unknown"},re=function($,E){z.open($.path,{missing_state:$.missing_state,...E?{workspace:E}:{}})};var _=$e,h=Ne,m=ct,w=y,C=je,F=dt,H=wt,se=mt,V=Be,N=ge,L=Ie,M=Ue,B=qe,X=Je,ne=ze,P=et,K=bt,U=xt,Q=Ft,Se=Yt,be=kt,ce=Vt,q=Ct,ye=re;let xe=document.getElementById("header-loading"),x=_c(xe),oe=op(e),de=If(),Oe=x.wrapSend(($,E)=>de.send($,E)),pe=ac(Oe),De=lc(),lt=uc(),ot=jl(),O=cc(),ae=ql(),le=Fl(),ie=Bl();de.on("impl-presets-snapshot",$=>{let E=$;E&&typeof E.revision=="number"&&Array.isArray(E.presets)&&le.set({revision:E.revision,presets:E.presets})}),de.on("monitor-pipeline-snapshot",$=>{let E=$;if(!(!E||!Array.isArray(E.workspaces)))try{ot.set(E.workspaces,E.workspaces_state,E.cross_lanes)}catch{}}),de.on("ui-order-snapshot",$=>{let E=$;if(E&&typeof E.revision=="number")try{O.set({revision:E.revision,order:E.order&&typeof E.order=="object"?E.order:{}})}catch{}}),de.on("display-policy-snapshot",$=>{let E=$;if(E&&E.policy&&typeof E.policy=="object")try{ae.set(E.policy)}catch{}}),de.on("session-log-snapshot",$=>{let E=$;if(E&&typeof E.id=="string")try{ie.set(E.id,Array.isArray(E.lines)?E.lines:[],typeof E.last_event_at=="number"?E.last_event_at:null)}catch{}}),de.on("session-log-append",$=>{let E=$;if(E&&typeof E.id=="string")try{ie.append(E.id,E.event)}catch{}}),de.on("snapshot",$=>{let E=$,Ae=E&&typeof E.id=="string"?E.id:"",g=Ae?De.getStore(Ae):null;if(g&&E&&E.type==="snapshot")try{g.applyPush(E)}catch{}}),de.on("upsert",$=>{let E=$,Ae=E&&typeof E.id=="string"?E.id:"",g=Ae?De.getStore(Ae):null;if(g&&E&&E.type==="upsert")try{g.applyPush(E)}catch{}}),de.on("delete",$=>{let E=$,Ae=E&&typeof E.id=="string"?E.id:"",g=Ae?De.getStore(Ae):null;if(g&&E&&E.type==="delete")try{g.applyPush(E)}catch{}});let we=null,ue=null,Fe=null,He=null,Qe=()=>{},Pe=new Promise($=>{Qe=()=>$(void 0)}),Y=!1,j=!1;async function Ze($){let E=Ne($);if(E===ue||E===Fe)return;Fe=E;let Ae=`detail:${$}`,g={type:"issue-detail",params:{id:$}};try{De.register(Ae,g)}catch(b){t("register detail store failed: %o",b)}try{let b=await pe.subscribeList(Ae,g);if(me.getState().selected_id!==$||Ne($)!==E){await b().catch(()=>{});return}we&&await we().catch(()=>{}),we=b,ue=E}catch(b){t("detail subscribe failed: %o",b),$e(b,"issue details")}finally{Fe===E&&(Fe=null)}}let W=new Map,Te=new Set,Re={board:0,worker:0},Ke=!1,vt=ps;try{let $=window.localStorage.getItem(jf);Gi($)&&(vt=$)}catch{}let It="today";try{let $=window.localStorage.getItem(Nv);$!==null&&(It=Rn($))}catch{}async function I($){if(!Gi($)||$===vt)return;vt=$;try{window.localStorage.setItem(jf,$)}catch{}let E=W.get(ur);if(!E)return;W.delete(ur),await E().catch(()=>{});let Ae=wt();try{De.register(ur,Ae)}catch(g){t("register %s store failed: %o",ur,g)}try{let g=await pe.subscribeList(ur,Ae);W.set(ur,g)}catch(g){t("re-subscribe %s failed: %o",ur,g),$e(g,"board")}}async function ee($){let E=Rn($);if(E===It)return;It=E;let Ae=T.get(cr);if(!Ae)return;T.delete(cr),await Ae().catch(()=>{});let g=mt();try{De.register(cr,g)}catch(b){t("register %s store failed: %o",cr,b)}try{let b=await pe.subscribeList(cr,g);T.set(cr,b)}catch(b){t("re-subscribe %s failed: %o",cr,b),$e(b,"worker")}}let T=new Map,G=null,Ce=null,We=null,it=null,Mt=null;async function Xt(){it=null,ae.clear(),Mt=null,le.clear(),G=null,Ce=null,W.clear(),T.clear(),Re.board+=1,Re.worker+=1,Vt();let $=me.getState().workspace.current?.path;if($)try{await de.send("set-workspace",{path:$})}catch(Ae){t("workspace restore after reconnect failed: %o",Ae);return}Yt();let E=me.getState();Be(E.view==="board"),Ie(E.view==="worker"),et(ze(E)),qe(E.view==="board"||E.view==="worker"||!!E.selected_id)}async function nn(){t("clearing all subscriptions for workspace switch"),ge(),Ue(),Je(),lt.clear(),Ft(),xt(),kt(),Yt(),ct();let $=me.getState();if($.selected_id)try{De.unregister(`detail:${$.selected_id}`)}catch{}let E=me.getState();Be(E.view==="board"),Ie(E.view==="worker"),et(ze(E)),qe(E.view==="board"||E.view==="worker"||!!E.selected_id),E.selected_id&&y(E.selected_id)}async function Ht($){t("requesting workspace switch to %s",$),j=!0;try{let E=await de.send("set-workspace",{path:$});t("workspace switch result: %o",E),E&&E.workspace&&(me.setState({workspace:{current:{path:E.workspace.root_dir,database:E.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),E.changed&&(await nn(),he("Switched to "+Ct($),"success",2e3)))}catch(E){throw t("workspace switch failed: %o",E),he("Failed to switch workspace","error",3e3),E}finally{j=!1}}async function Dt($){t("requesting workspace git pull for %s",$);try{let E=await de.send("git-pull-workspace",{});t("workspace git pull result: %o",E);let Ae=E?.status;if(Ae==="up_to_date"){he("Already up to date","success",2e3);return}if(Ae==="stash_pop_conflict"){he("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}he("Git pulled "+Ct($),"success",2e3)}catch(E){t("workspace git pull failed: %o",E);let Ae=E?.code,g=E?.message;if(Ae==="rebase_conflict"){he("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ae==="rebase_conflict_abort_failed"){he("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ae==="busy"){he("Git pull skipped: another operation is running","warning",3e3);return}let b=g?`: ${g}`:"";throw he(`Git pull failed${b}`,"error",3e3),E}}async function Qt($,E){t("setting workspace visibility %s \u2192 %s",$,String(E));try{await de.send("set-workspace-visibility",{path:$,visible:E}),await Gt()}catch(Ae){t("workspace visibility update failed: %o",Ae),he("Failed to update project visibility","error",3e3)}}async function Gt(){try{let $=await de.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let E=$.workspaces.map(A=>({path:A.path,database:A.database,pid:A.pid,version:A.version})),Ae=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,g=Array.isArray($.hidden)?$.hidden.filter(A=>typeof A=="string"):[];me.setState({workspace:{current:Ae,available:E,hidden:g}});let b=window.localStorage.getItem("beads-ui.workspace");b&&(!E.some(te=>te.path===b)||g.includes(b)?window.localStorage.removeItem("beads-ui.workspace"):Ae&&b!==Ae.path&&(t("restoring saved workspace preference: %s",b),await Ht(b)))}}catch($){t("failed to load workspaces: %o",$)}}de.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(me.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),Gt(),nn())});let Pt=!1;if(typeof de.onConnection=="function"){let $=E=>{t("ws state %s",E),E==="reconnecting"||E==="closed"?(Pt=!0,he("Connection lost. Reconnecting\u2026","error",4e3)):E==="open"&&Pt&&(Pt=!1,he("Reconnected","success",2200),Pv(me,(Ae,g)=>{t(`${Ae}: %o`,g)}),Xt())};de.onConnection($)}let St="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(St=$)}catch($){t("view parse error: %o",$)}let me=fc({config:Dv(),view:St});de.on("worker-queue-snapshot",$=>{let E=$;if(!E||!E.queue)return;let Ae=me.getState().workspace.current?.path;if(typeof Ae=="string"&&Ae.length>0&&E.root_dir!==Ae){t("dropping worker-queue snapshot for %s",String(E.root_dir));return}try{lt.set(E.queue)}catch{}});let S=dc(me);S.start();let J=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async($,E)=>{try{return await Oe($,E)}catch(Ae){if(J.has($))throw Ae;return[]}};Ip({global_element:r,repo_element:o},me,S);let p=document.getElementById("workspace-picker");p&&Rf(p,me,Ht,Dt,Qt);let f=Np(e,($,E)=>Oe($,E));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>f.open())}catch{}let k=Bp(e,{policyStore:ae,queueStore:lt,implPresetStore:le,transport:($,E)=>Oe($,E),onOpenChange:$=>{let E=Ke;Ke=$,dt(),E&&$===!1&&ve.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[E]of xl)for(let Ae of De.snapshotFor(E)||[]){let g=Ae.labels;if(Array.isArray(g))for(let b of g)typeof b=="string"&&b.length>0&&$.add(b)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>k.open()))}catch{}let R=document.createElement("div");R.className="md-viewer-root",document.body.appendChild(R);let z=Ai(R,{getWorkspacePath:()=>me.getState().workspace.current?.path}),fe=Rc(l,{gotoIssue:$=>S.gotoIssue($),issueStores:De,transport:Le,workerQueueStore:lt,uiOrderStore:O,displayPolicyStore:ae,closedRange:vt,onClosedRangeChange:$=>{I($)},onNewIssue:()=>f.open(),openDoc:re}),ve=wl(a,{transport:Le,issueStores:De,queueStore:lt,sessionLogStore:ie,gotoIssue:$=>me.setState({selected_id:$}),getWorkspacePath:()=>me.getState().workspace.current?.path,switchWorkspace:$=>Ht($),openDoc:re,doneRange:It,onDoneRangeChange:$=>{ee($)}}),Ye=Lp(u,{transport:Le,pipelineStore:ot,execPresetStore:le,sessionLogStore:ie,router:S,gotoIssue:$=>S.gotoIssue($),getWorkspacePath:()=>me.getState().workspace.current?.path,switchWorkspace:$=>Ht($),openDoc:re}),_t=rp(d,{issueStores:De,transport:Le,queueStore:lt,execPresetStore:le,sessionLogStore:ie,getWorkspacePath:()=>me.getState().workspace.current?.path,mdViewer:z,depCandidates:()=>{let $=ot.get();if($===null)return null;let E=ot.getWorkspacesState(),Ae=me.getState();if(Ae.view==="monitor")return Pa($,E);let g=Ae.workspace.current?.path;return g?Pa($,E,{root_dir:g}):null},subscribeCandidates:$=>ot.subscribe($),onDepChanged:({type:$,a:E,b:Ae})=>{let g=Ye;$==="dep-add"&&g&&typeof g.recorrectSharedLane=="function"&&g.recorrectSharedLane($,E,Ae)},onNavigate:($,E)=>{let Ae=()=>{me.getState().view==="worker"?me.setState({selected_id:$}):S.gotoIssue($)},g=me.getState().workspace.current?.path;if(typeof E!="string"||E.length===0||!g||E===g){Ae();return}Promise.resolve(Ht(E)).then(Ae).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let $=me.getState();me.setState({selected_id:null});try{S.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{k.open("execution")}}),ft=me.getState().selected_id;ft&&(d.hidden=!1,_t.load(ft),y(ft)),me.subscribe($=>{let E=$.selected_id;E?(d.hidden=!1,_t.load(E),j||y(E)):(_t.clear(),d.hidden=!0,ct())});let Zt=$=>{l.hidden=$.view!=="board",a.hidden=$.view!=="worker",u.hidden=$.view!=="monitor",s&&s.classList.toggle("is-quiet",$.view==="monitor"),Be($.view==="board"),Ie($.view==="worker"),et(ze($)),qe($.view==="board"||$.view==="worker"||Ke||!!$.selected_id),!$.selected_id&&$.view==="board"&&fe.load(),$.view==="worker"&&ve.load(),$.view==="monitor"?Ye.load():Ye.pause(),window.localStorage.setItem("beads-ui.view",$.view)};me.subscribe(Zt),Zt(me.getState()),xt(),Yt(),Vt(),Gt().finally(()=>{Y=!0,Qe()}),window.addEventListener("keydown",$=>{let E=$.ctrlKey||$.metaKey,Ae=String($.key||"").toLowerCase(),g=$.target,b=g&&g.tagName?String(g.tagName).toLowerCase():"",A=b==="input"||b==="textarea"||b==="select"||g&&typeof g.isContentEditable=="boolean"&&g.isContentEditable;E&&Ae==="n"&&(A||($.preventDefault(),f.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&jv(t)});export{jv as bootstrap,Dv as readBootstrapConfig,Pv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
