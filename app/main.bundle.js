var T_=Object.create;var sa=Object.defineProperty;var C_=Object.getOwnPropertyDescriptor;var R_=Object.getOwnPropertyNames;var O_=Object.getPrototypeOf,I_=Object.prototype.hasOwnProperty;var L_=(e,t,n)=>t in e?sa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ia=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var P_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of R_(t))!I_.call(e,o)&&o!==n&&sa(e,o,{get:()=>t[o],enumerable:!(r=C_(t,o))||r.enumerable});return e};var D_=(e,t,n)=>(n=e!=null?T_(O_(e)):{},P_(t||!e||!e.__esModule?sa(n,"default",{value:e,enumerable:!0}):n,e));var Lt=(e,t,n)=>L_(e,typeof t!="symbol"?t+"":t,n);var fc=ia((rk,pc)=>{var Gr=1e3,Kr=Gr*60,Yr=Kr*60,Cr=Yr*24,q_=Cr*7,j_=Cr*365.25;pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return F_(e);if(n==="number"&&isFinite(e))return t.long?U_(e):B_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function F_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*j_;case"weeks":case"week":case"w":return n*q_;case"days":case"day":case"d":return n*Cr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Yr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Kr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Gr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function B_(e){var t=Math.abs(e);return t>=Cr?Math.round(e/Cr)+"d":t>=Yr?Math.round(e/Yr)+"h":t>=Kr?Math.round(e/Kr)+"m":t>=Gr?Math.round(e/Gr)+"s":e+"ms"}function U_(e){var t=Math.abs(e);return t>=Cr?Es(e,t,Cr,"day"):t>=Yr?Es(e,t,Yr,"hour"):t>=Kr?Es(e,t,Kr,"minute"):t>=Gr?Es(e,t,Gr,"second"):e+" ms"}function Es(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var mc=ia((ok,_c)=>{function W_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=fc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let h=0;h<d.length;h++)p=(p<<5)-p+d.charCodeAt(h),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,h=null,_,k;function R(...N){if(!R.enabled)return;let B=R,le=Number(new Date),z=le-(p||le);B.diff=z,B.prev=p,B.curr=le,p=le,N[0]=n.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let q=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(M,W)=>{if(M==="%%")return"%";q++;let K=n.formatters[W];if(typeof K=="function"){let H=N[q];M=K.call(B,H),N.splice(q,1),q--}return M}),n.formatArgs.call(B,N),(B.log||n.log).apply(B,N)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(_!==n.namespaces&&(_=n.namespaces,k=n.enabled(d)),k),set:N=>{h=N}}),typeof n.init=="function"&&n.init(R),R}function r(d,p){let h=n(this.namespace+(typeof p>"u"?":":p)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of p)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,p){let h=0,_=0,k=-1,R=0;for(;h<d.length;)if(_<p.length&&(p[_]===d[h]||p[_]==="*"))p[_]==="*"?(k=_,R=h,_++):(h++,_++);else if(k!==-1)_=k+1,R++,h=R;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}_c.exports=W_});var gc=ia((vn,Ts)=>{vn.formatArgs=H_;vn.save=G_;vn.load=K_;vn.useColors=z_;vn.storage=Y_();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function z_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function H_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ts.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function G_(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function K_(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Y_(){try{return localStorage}catch{}}Ts.exports=mc()(vn);var{formatters:V_}=Ts.exports;V_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var $o=globalThis,vs=$o.trustedTypes,Xl=vs?vs.createPolicy("lit-html",{createHTML:e=>e}):void 0,la="$lit$",Yn=`lit$${Math.random().toFixed(9).slice(2)}$`,ca="?"+Yn,M_=`<${ca}>`,Ar=document,xo=()=>Ar.createComment(""),Ao=e=>e===null||typeof e!="object"&&typeof e!="function",ua=Array.isArray,nc=e=>ua(e)||typeof e?.[Symbol.iterator]=="function",aa=`[ 	
\f\r]`,ko=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ql=/-->/g,Zl=/>/g,$r=RegExp(`>|${aa}(?:([^\\s"'>=/]+)(${aa}*=${aa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jl=/'/g,ec=/"/g,rc=/^(?:script|style|textarea|title)$/i,da=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=da(1),Eo=da(2),Xw=da(3),Tn=Symbol.for("lit-noChange"),jt=Symbol.for("lit-nothing"),tc=new WeakMap,xr=Ar.createTreeWalker(Ar,129);function oc(e,t){if(!ua(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xl!==void 0?Xl.createHTML(t):t}var sc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=ko;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===ko?d[1]==="!--"?i=Ql:d[1]!==void 0?i=Zl:d[2]!==void 0?(rc.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=$r):d[3]!==void 0&&(i=$r):i===$r?d[0]===">"?(i=o??ko,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?$r:d[3]==='"'?ec:Jl):i===ec||i===Jl?i=$r:i===Ql||i===Zl?i=ko:(i=$r,o=void 0);let _=i===$r&&e[l+1].startsWith("/>")?" ":"";s+=i===ko?a+M_:p>=0?(r.push(u),a.slice(0,p)+la+a.slice(p)+Yn+_):a+Yn+(p===-2?l:_)}return[oc(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},So=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=sc(t,n);if(this.el=e.createElement(u,r),xr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=xr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(la)){let h=d[i++],_=o.getAttribute(p).split(Yn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:_,ctor:k[1]==="."?ks:k[1]==="?"?$s:k[1]==="@"?xs:Er}),o.removeAttribute(p)}else p.startsWith(Yn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(rc.test(o.tagName)){let p=o.textContent.split(Yn),h=p.length-1;if(h>0){o.textContent=vs?vs.emptyScript:"";for(let _=0;_<h;_++)o.append(p[_],xo()),xr.nextNode(),a.push({type:2,index:++s});o.append(p[h],xo())}}}else if(o.nodeType===8)if(o.data===ca)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Yn,p+1))!==-1;)a.push({type:7,index:s}),p+=Yn.length-1}s++}}static createElement(t,n){let r=Ar.createElement("template");return r.innerHTML=t,r}};function Sr(e,t,n=e,r){if(t===Tn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=Ao(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Sr(e,o._$AS(e,t.values),o,r)),t}var ws=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Ar).importNode(n,!0);xr.currentNode=o;let s=xr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new zr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new As(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=xr.nextNode(),i++)}return xr.currentNode=Ar,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},zr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Sr(this,t,n),Ao(t)?t===jt||t==null||t===""?(this._$AH!==jt&&this._$AR(),this._$AH=jt):t!==this._$AH&&t!==Tn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):nc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==jt&&Ao(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ar.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=So.createElement(oc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new ws(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=tc.get(t.strings);return n===void 0&&tc.set(t.strings,n=new So(t)),n}k(t){ua(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(xo()),this.O(xo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Er=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=jt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=Sr(this,t,n,0),i=!Ao(t)||t!==this._$AH&&t!==Tn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=Sr(this,l[r+a],n,a),u===Tn&&(u=this._$AH[a]),i||(i=!Ao(u)||u!==this._$AH[a]),u===jt?t=jt:t!==jt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ks=class extends Er{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===jt?void 0:t}},$s=class extends Er{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==jt)}},xs=class extends Er{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=Sr(this,t,n,0)??jt)===Tn)return;let r=this._$AH,o=t===jt&&r!==jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==jt&&(r===jt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},As=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},ic={M:la,P:Yn,A:ca,C:1,L:sc,R:ws,D:nc,V:Sr,I:zr,H:Er,N:$s,U:xs,B:ks,F:As},N_=$o.litHtmlPolyfillSupport;N_?.(So,zr),($o.litHtmlVersions??($o.litHtmlVersions=[])).push("3.3.1");var dt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new zr(t.insertBefore(xo(),s),s,void 0,n??{})}return o._$AI(e),o};var Ss="today",ac=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Hr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Un(e){return e==="today"?"today":"7d"}function pa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Tr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function uc(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function dc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var hc=D_(gc(),1);function Dt(e){return(0,hc.default)(`beads-ui:${e}`)}function X_(e){let n=bc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function bc(e){return typeof e=="string"?e.trim():""}function Q_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Z_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Vr(e){let t=X_(e),n=bc(Q_(e).spec_review),r=Z_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function To(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function xc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ac(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Sc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=In(e.created_at),s=In(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ec(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Cs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function J_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Cs,e)}function _a(e){if(!e||typeof e!="object")return!1;let t=e;return J_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function yc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function vc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Vr(e).evidence==="published"?1:0;case"created":return yc(e.created_at);case"updated":return yc(e.updated_at);default:return null}}function wc(e,t,n){let r=vc(e,n.key),o=vc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Tc(e){let t=Array.isArray(e)?e.filter(_a):[];return(n,r)=>{for(let l of t){let a=wc(n,r,l);if(a!==0)return a}let o=wc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var em=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function kc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function $c(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=em.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Cc(e,t){let n=kc(e),r=kc(t);if(n!==r)return n<r?-1:1;let o=$c(e),s=$c(t);if(o!==s)return o<s?-1:1;let i=In(e&&e.created_at),l=In(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var fa=2**20;function Xr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Rc(e){return(t,n)=>{let r=Xr(t,e),o=Xr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ma(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Xr(l,n)-fa};if(!l)return{rank:Xr(i,n)+fa};let a=Xr(i,n),u=Xr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,h)=>({bead_id:p.id,rank:h*fa}))}}function ga(e,t={}){let n=Dt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||To;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(h){if(l||!h||h.id!==e)return;let _=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,_),!(_<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(_<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=_,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let N=Number.isFinite(R.updated_at)?R.updated_at:0,B=Number.isFinite(k.updated_at)?k.updated_at:0;if(N<=B){for(let le of Object.keys(R))le in k||delete R[le];for(let[le,z]of Object.entries(k))R[le]=z}}d()}s=_,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),s=_,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function Rs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Oc(e){let t=Dt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(u)){let k=n.get(_);if(!k)continue;let R=k.itemsById;for(let N of d)typeof N=="string"&&N.length>0&&R.set(N,!0);for(let N of p)typeof N=="string"&&N.length>0&&R.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&R.delete(N)}}async function s(l,a){let u=Rs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let h=r.get(p.key);h&&(h.delete(l),h.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let h=n.get(l)||null;if(h){let _=r.get(h.key);_&&(_.delete(l),_.size===0&&r.delete(h.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let h=r.get(p.key);h&&(h.delete(l),h.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Rs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Ic(){let e=Dt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let p=u?Rs(u):"",h=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,h),_&&h&&p&&h!==p){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let N=ga(a,d);t.set(a,N);let B=N.subscribe(()=>s());o.set(a,B)}else if(!_){let k=ga(a,d);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ha(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function tm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function nm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Dc(e){let t=Dt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):tm(r),i=nm(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=ha(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?ha(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var rm=Object.freeze({workspace_config:{default_workspace:null}});function Mc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:rm.workspace_config.default_workspace}}}function Nc(e={}){let t=Dt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Mc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Mc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function qc(e){let t=Dt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(p,h)=>{let _=o++,k=Date.now();r.set(_,{type:p,start_ts:k}),t("request start id=%d type=%s count=%d",_,p,n+1),i();let R=!1,N=()=>{R||(R=!0,r.delete(_),l())},B=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-k),N())},3e4);try{let le=await u(p,h),z=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",_,p,z),le}catch(le){let z=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,z,le),le}finally{clearTimeout(B),N()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Qr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Ec),a;switch(l){case"created_desc":return a.sort(To),a;case"created_asc":return a.sort(xc),a;case"updated_desc":return a.sort(Ac),a;case"priority":return a.sort(Sc),a;case"manual":default:{let u=n();return u?a.sort(Rc(u)):a.sort(To),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function lr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Zt(e){let t=lr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function fn(e,t){let n=lr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function jc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=lr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Os(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Is(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Os(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ls(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=jc(n);return{total:n.length,count:r,current:o,children:n}}function Fc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ma(l,a,u.order),i);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let h={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(h);let _=r(ma(l,a,h.order),i);o(h,_);let k=await t("ui-order-set",{expected_revision:h.revision,entries:_});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function Bc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Vn(e,t){let n=Bc(e),r=Bc(t);return n.length===0||r.length===0?!1:n!==r}function Ps(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ba(e,t){return!t||typeof e!="string"||e.length===0||Ps(t.visible_labels).includes(e)?!0:Ps(t.hidden_labels).includes(e)?!1:!Ps(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Uc(e,t){return Ps(e).filter(n=>ba(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function om(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function sm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function im(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${om(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ds(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Cc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?sm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>im(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var am={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},zc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Wc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},lm={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function cm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Hc(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function um(e){if(!e||e.fill==="none"||!e.approval_state)return Hc(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function dm(e,t,n,r){let o=am[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=lm[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=zc[e]||e,h=r?Gc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Gc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ms(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Wc[e.route]||Wc.spec_backed,s=e.stages,i=cm(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${zc[u]||u} ${u==="plan"?um(s[u]||{}):Hc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Gc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>dm(u,s[u]||{},u===i,r))}
    </div>
  `}function pm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Kc=2;function Yc(e){let t=e.slice(0,Kc).join(", "),n=e.length-Kc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function fm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Vn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Yc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Yc(s)}</span
      >`),n}function _m(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ya(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Ns(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xn(e){return`${e.kind}:${Ns(e)}@${e.sha}`}function qs(e,t){if(!e)return null;let n=ya(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ya(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Xn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Vc(e,t){let n=qs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function mm(e){if(!e)return null;let t=ya(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function gm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&cr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Vc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(l)}`}
        >${`exec ${l.kind==="delegated"?Ns(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Uc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&cr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")){let l=_m(e.metadata);l&&o.push(l),o.push(...fm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function hm(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function bm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ds(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:hm(e),empty_label:"children \uC5C6\uC74C",childChips:va,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function va(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return qs(t,n)?c`<span class="board-card__roll-child-chips">
    ${Vc(t,n)}
    ${mm(n)}
  </span>`:null}function js(e,t){let n=pm(e.priority);return c`
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
      ${gm(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?Ms(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${bm(e,t)}
    </article>
  `}function Zr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${ac.map(s=>c`<option
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
        ${e.items.map(s=>js(s,t))}
      </div>
    </section>
  `}function Xc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>js(r,t))}
        </div>
      </div>
    </dialog>
  `}var ym=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],vm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],wm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function km(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Qc(e,t,n){return c`
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
        ${ym.map(r=>c`<option
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
        ${vm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${km(e,t,n)}
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
        ${wm.map(r=>c`<option
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
  `}var $m=200,xm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Am=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Zc="beads-ui.board.sort",Jc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Sm(){try{let e=window.localStorage.getItem(Zc);if(e&&Jc.has(e))return e}catch{}return"created_desc"}function eu(e,t){let n=Dt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,h=t.closedRange||Ss,_=o?Qr(o,i):null,k=Fc({transport:s,uiOrderStore:i}),R=[],N=[],B=[],le=[],z=[],q=[],O=!1,M=0,W=Sm(),K=new Map,H=new Map,P=new Map,G=new Set,V={search:"",priority:"",type:"",labels:[]},J=!1,ge=null;function Oe(ue){return String(ue.status||"open")==="open"}function F(ue){return String(ue.status||"open")==="open"}function ee(ue){let ie=V.search.trim().toLowerCase(),S=V.priority,j=V.type,se=V.labels;return ue.filter(ae=>{if(ie){let ce=String(ae.id||"").toLowerCase(),je=String(ae.title||"").toLowerCase();if(!ce.includes(ie)&&!je.includes(ie))return!1}if(S!==""&&String(ae.priority)!==S||j!==""&&String(ae.issue_type||"")!==j)return!1;if(se.length>0){let ce=Array.isArray(ae.labels)?ae.labels:[];if(!se.some(je=>ce.includes(je)))return!1}return!0})}function Se(){let ue=new Set;for(let ie of[R,N,B,le,z,q])for(let S of ie){let j=Array.isArray(S.labels)?S.labels:[];for(let se of j)typeof se=="string"&&se.length>0&&ue.add(se)}return Array.from(ue).sort()}function Te(){return V.search.trim()!==""||V.priority!==""||V.type!==""||V.labels.length>0}function C(){try{if(_){let ue=_.selectBoardColumn("tab:board:in-progress","in_progress",W),ie=_.selectBoardColumn("tab:board:blocked","blocked",W).filter(F),S=new Set(ue.map(Be=>Be.id)),j=_.selectBoardColumn("tab:board:ready","ready",W).filter(Be=>Oe(Be)&&!S.has(Be.id)),se=_.selectBoardColumn("tab:board:resolved","resolved",W),ae=_.selectBoardColumn("tab:board:deferred","deferred",W),ce=_.selectBoardColumn("tab:board:closed","closed").slice(0,$m),je=[...ie,...j,...ue,...se,...ce];oe(je);let Ze=new Set;for(let Be of je)Be&&Be.id&&!Os(Be)&&Ze.add(Be.id);let Je=!Te();R=Je?Co(ie,Ze):ie,N=Je?Co(j,Ze):j,B=Je?Co(ue,Ze):ue,le=Je?Co(se,Ze):se,z=ae,M=ae.length,q=Je?Co(ce,Ze):ce,K=new Map;for(let Be of R)K.set(Be.id,"open");for(let Be of N)K.set(Be.id,"open");for(let Be of B)K.set(Be.id,"in_progress");for(let Be of le)K.set(Be.id,"resolved");for(let Be of z)K.set(Be.id,"deferred");for(let Be of q)K.set(Be.id,"closed");H=new Map;for(let Be of R)H.set(Be.id,"blocked-col");for(let Be of N)H.set(Be.id,"ready-col");for(let Be of B)H.set(Be.id,"in-progress-col");for(let Be of le)H.set(Be.id,"resolved-col");for(let Be of q)H.set(Be.id,"closed-col")}Pe()}catch{R=[],N=[],B=[],le=[],z=[],q=[],P=new Map,Pe()}}function oe(ue){P=Is(ue)}function we(ue){return Ls(P,ue)}function ve(ue){return!G.has(ue)}function Me(ue,ie){ue.preventDefault(),ue.stopPropagation(),G.has(ie)?G.delete(ie):G.add(ie),Pe()}function he(ue,ie){ue.preventDefault(),ue.stopPropagation(),r(ie)}function Le(ue,ie){ue.preventDefault(),ue.stopPropagation(),r(ie)}function Ge(ue,ie){ge||r(ie)}function at(ue,ie){ue.preventDefault(),ue.stopPropagation(),Em(ie).then(S=>{S&&be("\uBCF5\uC0AC\uB428","success",1200)})}function D(ue,ie){ge=ie,ue.dataTransfer&&(ue.dataTransfer.setData("text/plain",ie),ue.dataTransfer.effectAllowed="move"),ue.target.classList.add("board-card--dragging")}function pe(ue){ue.target.classList.remove("board-card--dragging"),Wt(),setTimeout(()=>{ge=null},0)}function re(ue){let ie=String(ue.target.value||"");!ie||ie===h||(h=ie,u&&u(ie),Pe())}function _e(){return l?l.get():null}function Ce(ue){let ie=a?a.get():null,S=ie?ie.cleanup_failed:null;if(!S||typeof S!="object"||Array.isArray(S))return null;let j=S[ue];return!j||typeof j!="object"||Array.isArray(j)?null:j}let me={onCardClick:Ge,onCopyId:at,onDragStart:D,onDragEnd:pe,onClosedRangeChange:re,rollupFor:we,isExpanded:ve,onRollupToggle:Me,onChildClick:he,onFromChipClick:Le,onOpenDoc:p?(ue,ie)=>p(ie):void 0,cleanupFailureFor:Ce,get policy(){return _e()}};function De(ue,ie){ge||(He(),r(ie))}function Ue(ue,ie){ue.preventDefault(),ue.stopPropagation(),He(),r(ie)}let Xe={...me,onCardClick:De,onChildClick:Ue,onFromChipClick:Ue,onOpenDoc:p?(ue,ie)=>{He(),p(ie)}:void 0,get policy(){return _e()}};function qe(ue){let ie=ue.target,S=e.querySelector(".board-filter__labels");ie&&S&&S.contains(ie)||$e()}function Z(ue){ue.key==="Escape"&&$e()}function Y(){J||(J=!0,document.addEventListener("mousedown",qe),document.addEventListener("keydown",Z),Pe())}function $e(){J&&(J=!1,document.removeEventListener("mousedown",qe),document.removeEventListener("keydown",Z),Pe())}function ft(ue){ue.key==="Escape"&&He()}function lt(){O||(O=!0,document.addEventListener("keydown",ft),Pe())}function He(){O&&(O=!1,document.removeEventListener("keydown",ft),Pe())}let $={onClose:He,onOverlayClick(ue){ue.target===ue.currentTarget&&He()}},Q={onSearchInput(ue){V.search=String(ue.target.value||""),C()},onPriorityChange(ue){V.priority=String(ue.target.value||""),C()},onTypeChange(ue){V.type=String(ue.target.value||""),C()},onSortChange(ue){let ie=String(ue.target.value||"");if(!(!Jc.has(ie)||ie===W)){W=ie;try{window.localStorage.setItem(Zc,ie)}catch{}C()}},onDeferredToggle(){O?He():lt()},onLabelMenuToggle(){J?$e():Y()},onLabelToggle(ue){let ie=V.labels.indexOf(ue);ie===-1?V.labels.push(ue):V.labels.splice(ie,1),C()},onLabelClear(){V.labels.length!==0&&(V.labels=[],C())},onNewIssue(){d&&d()}};function Re(){return c`
      <div class="board-view">
        ${Qc(V,Q,{sort_mode:W,deferred_popup_open:O,deferred_count:M,label_options:Se(),label_menu_open:J})}
        <div class="board-root">
          ${Zr({title:"Blocked",id:"blocked-col",items:ee(R)},me)}
          ${Zr({title:"Ready",id:"ready-col",items:ee(N)},me)}
          ${Zr({title:"In progress",id:"in-progress-col",items:ee(B)},me)}
          ${Zr({title:"Resolved",id:"resolved-col",items:ee(le)},me)}
          ${Zr({title:"Closed",id:"closed-col",items:ee(q),is_closed:!0,closed_range:h},me)}
        </div>
        ${O?Xc({items:ee(z),count:M},Xe,$):""}
      </div>
    `}function Pe(){dt(Re(),e),Ve()}function Ve(){try{let ue=e.querySelector("#deferred-popup");ue&&!ue.open&&(typeof ue.showModal=="function"?ue.showModal():ue.setAttribute("open",""));let ie=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let S of ie)Array.from(S.querySelectorAll(".board-card")).forEach((se,ae)=>{se.tabIndex=ae===0?0:-1})}catch{}}async function rt(ue,ie){if(!s){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:ue,status:ie}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(S){n("update-status failed: %o",S),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Qe(ue){switch(ue){case"blocked-col":return R;case"ready-col":return N;case"in-progress-col":return B;case"resolved-col":return le;default:return[]}}function ct(ue,ie,S){if(!s||!i)return;let j=Qe(ue),se=j.find(Je=>Je.id===ie);if(!se)return;let ae=j.filter(Je=>Je.id!==ie),ce=S.closest?S.closest(".board-card"):null,je=ae.length;if(ce){let Je=ce.getAttribute("data-issue-id");if(Je===ie)return;let Be=ae.findIndex(Tt=>Tt.id===Je);Be>=0&&(je=Be)}let Ze=ae.slice();Ze.splice(je,0,se),k.applyReorder(ie,Ze,je)}function Wt(){for(let ue of Array.from(e.querySelectorAll(".board-column--drag-over")))ue.classList.remove("board-column--drag-over")}let yt=null;e.addEventListener("dragover",ue=>{ue.preventDefault(),ue.dataTransfer&&(ue.dataTransfer.dropEffect="move");let S=ue.target.closest(".board-column");S&&S!==yt&&(yt&&yt.classList.remove("board-column--drag-over"),S.classList.add("board-column--drag-over"),yt=S)}),e.addEventListener("dragleave",ue=>{let ie=ue.relatedTarget;(!ie||!e.contains(ie))&&yt&&(yt.classList.remove("board-column--drag-over"),yt=null)}),e.addEventListener("drop",ue=>{ue.preventDefault(),yt&&(yt.classList.remove("board-column--drag-over"),yt=null);let ie=ue.target,S=ie.closest(".board-column");if(!S)return;let j=ue.dataTransfer?.getData("text/plain")||"";if(!j)return;let se=S.id,ae=H.get(j);if(ae&&ae===se){if(Am.has(se)){if(W!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ct(se,j,ie)}return}let ce=xm[se];if(!ce){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(j)!==ce&&rt(j,ce)}),e.addEventListener("keydown",ue=>{let ie=ue.target;if(!(ie instanceof HTMLElement))return;let S=String(ie.tagName||"").toLowerCase();if(S==="input"||S==="textarea"||S==="select"||S==="button"||S==="a"||ie.isContentEditable===!0)return;let j=ie.closest(".board-card");if(!j)return;let se=String(ue.key||"");if(se==="Enter"||se===" "){ue.preventDefault();let Ze=j.getAttribute("data-issue-id");Ze&&r(Ze);return}if(se!=="ArrowUp"&&se!=="ArrowDown"&&se!=="ArrowLeft"&&se!=="ArrowRight")return;ue.preventDefault();let ae=j.closest(".board-column");if(!ae)return;let ce=Array.from(ae.querySelectorAll(".board-card")),je=ce.indexOf(j);if(se==="ArrowDown"&&je<ce.length-1){gt(j,ce[je+1]);return}if(se==="ArrowUp"&&je>0){gt(j,ce[je-1]);return}if(se==="ArrowLeft"||se==="ArrowRight"){let Ze=Array.from(e.querySelectorAll(".board-column")),Je=Ze.indexOf(ae),Be=se==="ArrowRight"?1:-1,Tt=Je+Be;for(;Tt>=0&&Tt<Ze.length;){let Bt=Ze[Tt].querySelector(".board-card");if(Bt){gt(j,Bt);return}Tt+=Be}}});function gt(ue,ie){try{ue.tabIndex=-1,ie.tabIndex=0,ie.focus()}catch{}}let vt=null;_&&_.subscribe&&(vt=_.subscribe(()=>{try{C()}catch{}}));let Mt=null;l&&l.subscribe&&(Mt=l.subscribe(()=>{try{C()}catch{}}));let $t=null;return a&&a.subscribe&&($t=a.subscribe(()=>{Pe()})),{async load(){n("load"),C()},clear(){$e(),He(),vt&&(vt(),vt=null),Mt&&(Mt(),Mt=null),$t&&($t(),$t=null),e.replaceChildren(),R=[],N=[],B=[],le=[],z=[],q=[],K=new Map,H=new Map}}}function Co(e,t){return e.filter(n=>{let r=Os(n);return!(r&&t.has(r))})}async function Em(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var cn=e=>e??jt;function xn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ro(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Tm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],tu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},nu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Cm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Xt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ft(e){return typeof e=="string"&&e.length>0?e:null}function eo(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function ou(e,t,n){let r=Ft(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ft(n[e]);return o===null?null:{value:o,source:"global"}}function Jr(e,t,n,r){return ou(e,t,n)||{value:r,source:"base"}}function wa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Xt(o?.[t])){let i=Ft(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Xt(o)){for(let i of Object.values(o))if(Xt(i)){let l=Ft(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ft(r?.runners?.[s]?.models?.[e]?.id)||e}function Rm(e,t){return Ft(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?eo(e):e;return Et(e,t,r,e,"explicit")}function su(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Xt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Xt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Om(e,t){let n=[],r=e?.implementation?.model_catalog;Xt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Xt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Im(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Om(t,n)){let s=su(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ka(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ru(e,t,n){let r=ou(e,t,n);return r?Rr(r.value,r.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function An(e){let t=Xt(e.pin)?e.pin:{},n=Xt(e.global)?e.global:{},r=Xt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Xt(r.session)?r.session:null,s=r?.supported===!0&&Xt(r.orchestration)?r.orchestration:null,i=Xt(e.runner_catalog)?e.runner_catalog:null,l=Ft(n.quick_fix_impl_model),a=Im(l,o,i),u={};if(o){let d=Jr("workflow_mode",t,n,Ft(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Rr(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let q=`${z}_model`,O=Ft(z==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=Jr(q,t,n,O);if(M.value===null)u[q]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!Xt(o.review?.reviewers?.[M.value]))u[q]=ka(Et(M.value,M.source,"",null,"explicit"));else{let W=Rm(M.value,o);u[q]=Et(M.value,M.source,eo(W),W,M.source==="base"?"default":"explicit")}}for(let[z,q]of Object.entries(tu)){let O=u[q].value;if(O==="self"||O==="skip"){u[z]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Ft(o.review?.reviewers?.[O||""]?.effort),W=Jr(z,t,n,M);u[z]=W.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}for(let[z,q]of Object.entries(nu)){let O=u[q];if(O.resolution==="incompatible"||O.value==="self"||O.value==="skip"){u[z]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(O.resolution==="unavailable"){u[z]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=Jr(z,t,n,"default");u[z]=M.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Rr(M.value,M.source)}let p=Xt(o.implementation?.default)?o.implementation.default:{},h=Ft(e.route),_=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=Xt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=_&&Xt(k[h])?k[h]:{};for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Jr(z,t,n,z==="impl_dispatch"?Ft(R.dispatch)||Ft(p.dispatch):Ft(p[z.replace("impl_","")]));u[z]=q.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let N=Ft(t.impl_runtime),B=N==="inherit"?Ft(e.controller_runtime):N,le=h==="quick_fix"&&Ft(t.impl_dispatch)===null&&a.runtime!==null&&(N===null||B===a.runtime);if(le){let z=a.runtime,q=l;u.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),N===null&&(u.impl_runtime=Et(z,"global",`${z} (\uC720\uB3C4)`,z,"explicit")),Ft(t.impl_model)===null&&(u.impl_model=Et(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Ft(e.controller_runtime):u.impl_runtime.value,q=z?su(z,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=ka(u.impl_model);else{let O=wa(u.impl_model.value,z,o,i);u.impl_model.display=eo(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let z=Ft(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=z?Ft(o.implementation?.effort_by_transport?.[z]?.auto):null;q&&!Cm.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",u.impl_speed.source))}}else for(let d of Tm.filter(p=>!p.startsWith("orchestration_")))u[d]=ru(d,t,n);if(!o){for(let[d,p]of Object.entries(tu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(nu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=ru(d,t,n);continue}let p=d.replace("orchestration_",""),h=Ft(s[p]),_=Jr(d,t,n,h);if(d==="orchestration_effort"&&_.source==="base"){u[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){u[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=_.source==="base"?Ft(s.model_id)||_.value:wa(_.value,null,o,i);u[d]=Et(_.value,_.source,eo(k),k,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){u[d]=_.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",_.source);continue}u[d]=Rr(_.value,_.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${eo(d)})`,null,"default")}else if(a.runtime!==null){let d=wa(l,a.runtime,o,i);u.quick_fix_impl_model=Et(l,"global",eo(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ka(Et(l,"global","",null,"explicit")):u.quick_fix_impl_model=Rr(l,"global");return u}function Lm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Fs(e){let t=Xt(e.pin)?e.pin:{},n=Xt(e.global)?e.global:{},r=Xt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let h={...r,...p};return An({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ft(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Lm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let h=o({...s,[e.key]:p})[e.key];return{value:p,label:h.display,full_value:h.full_value}})}}function Pm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${xn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${xn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.className="op-btn",s.textContent="\uCDE8\uC18C",a.append(r,o,s),n.append(i,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),s.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function dr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Pm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function iu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),s=t.createElement("textarea"),i=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",s.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",s.maxLength=4e3,i.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",i.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(s,i),t.body.append(r),new Promise(d=>{let p=!1,h=k=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(k))},_=()=>h(s.value.trim());l.addEventListener("click",_),a.addEventListener("click",()=>h(null)),s.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),_())}),r.addEventListener("cancel",k=>{k.preventDefault(),h(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),s.focus()})}async function to(e){let{context:t,transport:n,adopt:r}=e,o=await iu(t);if(o===null)return null;let s=o===""?{}:{instructions:o},i=await n({...s});if(r?.(i),i&&i.conflict&&(i=await n({...s}),r?.(i)),i=await dr(i,(l,a)=>n({...s,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...s})}),i&&i.resumed===!1&&!i.conflict&&i.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";be(`${l} \uAC70\uBD80: ${i.reason}`,"error",2400)}return i}function $a(e){return`session:${e.provider}:${e.session_id}`}function Oo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Dm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function no(e,t,n,r){return{attempt_id:$a(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Oo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Dm(e,n)}}}var xa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Mm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",au="\uBD84\uD574 \uC5C6\uB294 leg";function Vt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var zn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ro=[...zn,"reasoning_output_tokens"],Nm={codex:["implementation","review-consult"],claude:["subagent"]};function Aa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!zn.some(t=>Number.isFinite(e[t]))}function qm(e){return!e||typeof e!="object"?!1:ro.some(t=>Number.isFinite(e[t]))}function Sa(e){let t=0;for(let n of zn)t+=Vt(e?.[n]);return t}function jm(e){return!e||typeof e!="object"?!1:zn.some(t=>Number.isFinite(e[t]))}function lu(e){return!e||typeof e!="object"?!1:ro.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Fm(e){let t={};for(let n of ro)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function cu(e){let t={};for(let n of ro)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function uu(e,t){return Aa(t)?Vt(t.total_tokens):e==="codex"?Vt(t.input_tokens)+Vt(t.output_tokens):Sa(t)}function Bm(e){return e==="claude"?"Claude":"Codex"}function Um(e){return`\u03C4 ${pu(e)}`}function Wm(e,t){let n=t.breakdown||{},r=Vt(t.total_only_subtotal);if(Aa(n)||r>0&&!qm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Mm];return t.replayed&&u.push(xa),u.join(`
`)}let o=[`\uC785\uB825 ${Vt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Vt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${au} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${au}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(xa),a.join(`
`)}function sn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Bm(n)} ${Um(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Wm(n,r)})}return t}function Us(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Vt(l.total_only_subtotal)+Vt(i.total_only_subtotal));for(let a of ro)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Vt(l.breakdown[a])+Vt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ea(e){return!e||typeof e!="object"?null:Zn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function zm(e){return e==="codex"?"codex":"claude"}function Wn(){return{subtotal:0,breakdown:Fm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bs(e,t,n){e.subtotal+=t.subtotal,Aa(t.usage)&&(e.total_only+=t.subtotal);for(let r of ro)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Vt(e.breakdown[r])+Vt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function du(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function pu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function oo(e){return jm(e)?`\u03C4 ${pu(Sa(e))}`:null}function Qn(e){let t=oo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Io(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Vt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Vt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Sa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(xa),n.join(`
`)}function Zn(e,t){let n={claude:Wn(),codex:Wn()},r={orchestrator:{claude:Wn(),codex:Wn()},implementation:{claude:Wn(),codex:Wn()},"review-consult":{claude:Wn(),codex:Wn()},subagent:{claude:Wn(),codex:Wn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(lu(a)){let d=zm(l.runner),p=cu(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:uu(d,p)};p.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Bs(n[d],h,!0),Bs(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Nm[p].includes(d.role)||!lu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let _=cu(d.usage),k={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:uu(p,_)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),_.replayed===!0&&(k.replayed=!0),Bs(n[p],k,!1),Bs(r[k.role][p],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=du(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...du(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var Hm=".chip-popover, .judgement-chip";function so(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(Hm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function io(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var fu={running:3,paused:2,failed:1};function Jn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function _u(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function mu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Jn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Jn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=fu[u.run_state],p=fu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ws=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ca=[...Ws.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function gu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var er=["orchestration_model","orchestration_effort","orchestration_speed"],ao=[...Ws,...er],Gm=Ca.filter(e=>ao.includes(e)),hu=["delegated","main"],zs=["inherit","claude","codex"],lo=["default","fast"],Lo=["standard","fast_track"],Po=["codex","opus","fable","self","skip"],Hs=["codex","fable","skip"],Gs=["low","medium","high","xhigh"],bu=["default","fast"],En="auto";function Sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function yu(e){if(!Sn(e)||!Sn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))Sn(r)&&Sn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function co(e,t){let n=yu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[En,...r.flatMap(([,o])=>o)]}function vu(e,t,n,r){if(!Sn(e)||!Sn(e.runners))return[En];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!Sn(i)||!Sn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==En&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[En,...o]}function uo(e,t,n){return vu(e,t,n,(r,o)=>Sn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ra(e,t,n){return vu(e,t,n,(r,o)=>Sn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:Sn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Do(e,t){let n=yu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function wu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!co(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!uo(t,o,r.impl_model||En).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Km={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ta=[...Gm,...er],Ym=[...ao,...Ca].filter((e,t,n)=>n.indexOf(e)===t&&!Ta.includes(e));function ku(e,t){let n=Sn(e)?e:{},r=Sn(t)?t:{},o=[];for(let i of Ta){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:Km[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Ym,...Object.keys(r)])!Ta.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Oa(e,t,n,r,o,s){return Fs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function $u(e,t){let n={};for(let r of Ca){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function xu(e,t){let n={};for(let r of er){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...er]}],pr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Ks={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function La(e,t,n,r,o,s=null){let i=An({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Au(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of La(e,t,n,r,o,s))i[l.source]+=1;return i}function Su(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Eu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var j$=[...Ws,...er];var Tu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ys(e){if(!Mo(e)||!Mo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Mo(n)&&Mo(n.models));return t.length>0?t:null}function Ln(e,t){let n=Ys(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Cu(e,t){return Mo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ru(e,t){let n=Ys(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Cu(r,r.models[t]);return[]}function Vm(e){let t=Ys(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Cu(r,o))n.includes(s)||n.push(s);return n}function Xm(e,t){if(!t)return Vm(e);let r=Ys(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Ru(e,s))o.includes(i)||o.push(i);return o}function Ou(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Ln(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Ru(t,r.impl_model):Xm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Pa=new Set(["unavailable","not_applicable"]);function fr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Iu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function _r(e,t){return t===null?null:`${pr[e]}: ${t.display} (${Ks[t.source]})`}function Da(e){return e.filter(t=>t!==null).join(`
`)}function Ma(e){if(typeof e!="object"||e===null)return null;let t=xn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Da(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(pr.orchestration_model,e.model),n(pr.orchestration_effort,e.effort),n(pr.orchestration_speed,e.speed)])}}function po(e,t){let n=fr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=fr(e,"orchestration_effort"),o=fr(e,"orchestration_speed"),s=Iu([Ln(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:Da(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",_r("orchestration_model",n),_r("orchestration_effort",r),_r("orchestration_speed",o)])}}function Qm(e,t){return e===null||e.value===null||Pa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Zm(e){return e===null||Pa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Jm(e){return e===null?null:e.value==="auto"?"auto":Pa.has(e.resolution)?null:e.display}function Or(e,t){if(typeof e!="object"||e===null)return null;let n=fr(e,"impl_dispatch"),r=fr(e,"impl_runtime"),o=fr(e,"impl_model"),s=fr(e,"impl_effort"),i=fr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Iu([Qm(r,t??null),Zm(o),Jm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Da(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",_r("impl_dispatch",n),_r("impl_runtime",r),_r("impl_model",o),_r("impl_effort",s),_r("impl_speed",i)])}}var eg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),tg=Object.freeze(["delivery_unproven:"]);function Vs(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||eg.has(t))return"session";for(let n of tg)if(t.startsWith(n))return"session";return"settlement"}var ng=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var rg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Na(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>rg[n]||"").filter(n=>n.length>0)}var Lu={orchestration_model:["fable"],impl_runtime:["claude"]},qa={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Pu(e){return typeof e=="object"&&e!==null?e:null}function Du(e,t){return typeof e=="string"&&t.includes(e)?e:""}function og(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>ng.includes(t))}function No(e,t=e){let n=Pu(e);if(!n)return null;let r=Du(n.rec_orchestration_model,Lu.orchestration_model);if(r.length===0)return null;let o=Du(n.rec_impl_runtime,Lu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Pu(t)||{},l=Object.keys(s),a=0,u=0;for(let p of l){let h=i[p];typeof h=="string"&&h.length>0&&(a+=1,h===s[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:og(n.rec_reason),rec:s,state:d}}function Xs(e){if(!e||typeof e!="object")return"";let t=Na(e),n=qa[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Qs(e){return e.replace(/\/+$/,"")}function sg(e,t){let n=Qs(e),r=Qs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Zs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!sg(r,o))continue;let s=Qs(r),i=Qs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ja(e,t){return`${e}\0${t}`}function Mu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Fa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function qo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Nu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${qo(o)})`,location_label:qo(o),scope:null,same_lane_ahead:!1};let i=Fa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function qu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(u);if(_)for(let k of h){let R=r.get(k);R&&R!==u&&!_.includes(R)&&_.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&u.push(p)}u.length>0&&i.set(l,u)}return i}function ju(e,t){return ja(e,t)}var ig=Object.freeze(["done","abandoned"]);function Fu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!ig.includes(e.phase)}async function ag(e){let t=await _n(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Ir(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{ag(e)}}
    >
      ⧉
    </button></span
  >`}var lg="worker-ineligible";function jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Bu(e){return jo(e).includes(lg)}var Uu=new WeakMap;function fo(e){return e&&typeof e=="object"?e:{}}function cg(e){let t=Uu.get(e);if(t)return t;let n=zu(e);return Uu.set(e,n),n}function Js(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function ug(e,t){if(e.length===0)return null;if(cg(t).has(e))return{lane:"running"};if(Js(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Js(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=Js(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return Js(t.done,e)>=0?{lane:"done"}:null}function Fo(e,t){let n=fo(e),r=fo(t),o=Vr(n),i=(typeof n.workflow?.route=="string"&&n.workflow.route||(typeof fo(n.metadata).route=="string"?fo(n.metadata).route:""))==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Bu(n.labels),u=Object.hasOwn(fo(n.metadata),"awaiting_user"),d=!a&&!u&&(i?l:o.evidence==="published"&&!o.conflict),p=ug(typeof n.id=="string"?n.id:"",r);return{placeable:d&&p===null,worker_ineligible:a,awaiting_user:u,missing_description:i&&!l,spec:i?"n/a":o.conflict?"conflict":o.evidence,location:p}}function ei(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Bo(e){let t=fo(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let i of r){if(o.length>=n)break;!i||typeof i.id!="string"||!/^s[1-5]$/.test(i.id)||!Array.isArray(i.entries)||o.push({id:i.id,label:`\uC9C1\uB82C ${i.id.slice(1)}`,count:i.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Wu(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function ni(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ku(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Pr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Yu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Hu(e){return e==="auto"||e==="click"?e:null}function Vu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=Hu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=Hu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Xu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function ri(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function dg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:ni(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Qu(e,t){let n=dg(e,t);return n?c`<button
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
            title=${n.deploy.at?Zt(n.deploy.at):""}
            >${ri(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Pr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function _o(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Zt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Zt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function pg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Wo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function zo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function oi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function si(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Zu(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function tr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&Fu(h)).sort((h,_)=>(h.requested_at||0)-(_.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?pg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Zu(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Ju(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ti(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Zu(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,i=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${i.number||"?"} ·
          ${i.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var fg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ed(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:fg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ii(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Uo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function _g(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ba(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function mg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function ai(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ba(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ba(e.dependents),s=Ba(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(d=>Uo(d,"pred"))}${t}${o.map(d=>Uo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Uo(d,"released"))}${s.map(d=>Uo(_g(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function td(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Uo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function li(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function ci(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function gg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function nd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ui(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Xs(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var hg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function bg(e,t=!1){let n=rd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function rd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function od(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function di(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function yg(e){let t=Array.isArray(e.badges)?e.badges:[],n=sn(e.usage),r=Qn(e.usage),o=fn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${od(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Zt(e.done_at)}`}
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
    ${td(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Io(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Ku(e.work_kind)}
            >작업 ${Pr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function mo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function Pn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return yg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=sn(e.usage),s=Qn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?fn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":ci(e.workflow),R=e.lane==="done"?"":nd(e.from_id),N=di(e.priority),B=c`<span class="worker-mini__title">${e.title}</span>`,le=od(e.pr_url,e.pr_number),z=r.map(at=>at===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${at}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${at===e.completion_badge&&e.completion_title||""}
          >${at}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(at=>c`<span class="worker-usage" title=${at.tooltip}
              >${at.label}</span
            >`):s?c`<span class="worker-usage" title=${Io(e.usage)}
            >${s}</span
          >`:"",M=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",W=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",K=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.discard,P=H?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${H?.attempt_id||""}
          data-operation-id=${H?.operation?.operation_id||""}
          data-discard-mode=${H?.confirmation||"unmerged"}
          ?disabled=${H?!H.enabled:e.discard_enabled===!1}
          title=${H?H.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${H?.label||"\uD3D0\uAE30"}
        </button>`:"",G=H?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${H.operation.operation_id}
        data-operation-kind=${H.operation.kind||""}
        data-last-error=${H.error||""}
        title=${H.abandon.title}
      >
        ${H.abandon.label}
      </button>`:"",V=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",J=H?.abandon.action?c`${P}${G}${V}`:c`${V}${P}`,ge=e.stale_work||null,Oe=ge?c`${ge.can_resume||ge.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ge.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ge.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ge.action_id}
            ?disabled=${ge.locked}
          >
            다시 확인
          </button>`:""}`:"",F=ge?c`<div class="worker-mini__stale">
        <strong>${ge.title}</strong>
        <span>${ge.summary}</span>
        <span>${ge.cause}</span>
        ${ge.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ee=e.revise_action?c`<button
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
        </button>`:"",Se=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=ui(e.rec,Lr(e,"rec")),C=bg(e,Lr(e,"receipt")),oe=li(e.cross_lane_chip),we=Ir(e.log_path),ve=h||oe||k||R||Se||Te||C||O||we?c`<div class="worker-chips">
          ${h}${oe}${k}${R}${Se?ii(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${C}${O}${we}${Ua(e)}
        </div>`:"",Me=ai(e.dependency_chips),he=ti(e),Le=t.actions?t.actions:"",Ge=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||H?.operation||e.revise_action||ge);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${_}${N}${R}${le}${B}${Le}
          </div>
          ${td(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Zt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Ku(e.work_kind)}
                  >작업 ${Pr(e.work_ms)}</span
                >`:""}${z}${M}
            <span class="worker-mini__actions"
              >${W}${K}${J}</span
            >
            ${_o(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${_}${N}${le}${z}${q}${Le}
            </div>
            <div class="worker-mini__body">${B}${F}</div>
            ${Me}${ve}${Ge?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${W}${K}${J}${ee}${Oe}</span
                  >
                  ${ti(e)}
                </div>`:""}
            ${_o(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${_}${N}${B}${le}${z}${q}${M}${W}${K}${J}${Le}
            </div>
            ${Me}${ve}${he} ${_o(e)}`}
  </div>`}function za(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var sd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Ha(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=qa[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Na(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=sd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=rd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>hg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var vg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function pi(e,t){for(let n of vg){if(!t(n))continue;let r=Ha(e,n);return r?{chip_key:n,content:r}:null}return null}function Ua(e){return e.chip_popover?io(e.chip_popover.content):""}function Lr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var fi="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ga(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=sd[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),h=d.some(M=>M.startsWith(fi)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Lr(e,"spec_after_blocker"),R=mg(e.spec_after_blocker===!0,k),N=ai(e.dependency_chips,R===""?"":c`${R}${k?Ua(e):""}`),B=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",le=li(e.cross_lane_chip),z=ci(u),q=nd(e.from_id),O=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${di(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Lr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Lr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${ui(e.rec,Lr(e,"rec"))}${gg(u,Lr(e,"qfr"))}
      ${k?"":Ua(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Ms(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${N}
    ${B||le||z||q||O?c`<div class="worker-chips">
          ${B}${le}${z}${q}${ii(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${za(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
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
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${ei({placeable:s,worker_ineligible:r,awaiting_user:h,missing_description:p})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${_o(e)}
  </div>`}function Hn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${cn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ga(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Pn(o))}
          </div>`}
  </section>`}function Gu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function _i(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Gu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${cn(r.drop)}
            data-root-dir=${cn(r.root_dir)}
            data-lane-id=${cn(r.lane_id)}
            data-lane-length=${cn(r.lane_length)}
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
        ${Gu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>wg(o))}
          </div>`}
    </section>
  </div>`}function wg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Hn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${cn(t.drop)}
        data-root-dir=${cn(t.root_dir)}
        data-lane-id=${cn(t.lane_id)}
        data-lane-length=${cn(t.lane_length)}
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
  </div>`}function mi(e){return e.count?c`<section
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
  </section>`:""}var id=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ho=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function gi(e,t){let n=id.find(o=>o.step===e);if(!n)return null;let r=id.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function ad(e){let t=Ho.findIndex(n=>n.step===e);return Ho.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Dr(e){let t=Ho.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function kg(e){let t=Ho.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ho.length}}function hi(e){let t=kg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ya=new Set(["queued","running","retry_pending"]),ld=new Set(["failed","succeeded"]),$g={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Go={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},xg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Go.base_containment,child_sweep:Go.child_sweep,branch_cleanup:Go.branch_cleanup,parent_close:Go.parent_close};function Ag(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Sg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ya,...ld].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Eg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ka(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=$g[o];if(!s)return null;let i=gi(n,`${r} ${s}`);return i?{...i,active:Ya.has(o),failed:o==="failed"}:null}function Tg(e){return!e||typeof e!="object"?null:xg[e.step]||null}function Ko(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Tg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Ag(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Sg(k,t,l)).sort(Eg):[],u=i?a:[],d=u.find(k=>Ya.has(k.state));if(d)return Ka(d);if(o)return o.step==="repo_operations"&&a[0]?Ka(a[0],!0):null;let p=u.find(k=>ld.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Ka(p);if(r){let k=gi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Go[e.cleanup_cursor]:null;if(!h)return null;let _=gi(h.step,h.label);return _?{..._,active:!0,failed:!1}:null}function bi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Cg="\uBBF8\uC801\uC7AC";function Va(e,t){let n=Vn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Rg=10080*60*1e3;function cd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Rg)return null;let o=Vn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Zt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function ud(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Vn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function dd(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Va(s,{id:a,location_label:o.get(a)||Cg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var vi=1,Yo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Za=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],go={show_blocked:!0,spec:"all"},pd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Og(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Jn(r)||(n=typeof r.status=="string"?r.status:null);return n}function Ig(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Jn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function zu(e){let t=tt(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(yd(tt(t.attempts),n).keys())}function yd(e,t,n={}){let{winners:r,resumed_from_ids:o}=mu(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state;if(wd(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,_=Vs(a.quickfix_landing)==="session",k=u!=="running"&&(p||!_)&&!o.has(a.attempt_id),R=!p&&_?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,N=tt(n.observations?.[i]),B=tt(N.pr),le=typeof a.merge_sha=="string"&&a.merge_sha.length>0||B.state==="MERGED",z=tr(n.discard_operations,i,{attempt_id:a.attempt_id,merged:le}),q=u==="failed"?_d(a,{resume_eligible:k,resume_reason:R,confirmation:z.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...fd(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&p,can_resume:k})}for(let[i,l]of Fg(e,t)){if(s.has(i))continue;let a=l.attempt,u=tr(n.discard_operations,i,{attempt_id:a.attempt_id}),d=kd(a),p=l.run_state==="provider_hold"?qg(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[i]}):null;s.set(i,{...fd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:_d(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:Lg(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return s}function fd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Zn(t,e.bead_id)}}function _d(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:kd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Ju(e),confirmation:t.confirmation,...vd(t.history)}}function vd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Lg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function wd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Pg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=tt(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Dg(e,t){if(e===null)return null;let n=tt(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Mg(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Ng(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(i=>i?.attempt_id===e.attempt_id))return"pending";let s=e.auto_resume_refused;return typeof s=="string"&&s.length>0?`refused:${s}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Mg(e,r.attempts)?"disarmed":null}function qg(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Pg(e,t.provider_hold),s=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,i=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Ng(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=Dg(i,t.account_catalog),h=vd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...s||i?{target:{...s?{model:s}:{},...i?{account:i}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...h.log_path?{log_path:h.log_path}:{}}}function kd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var jg=new Set(["parked","retry_wait","waiting"]);function Fg(e,t){let n=Object.values(e||{}),r=new Set(n.map(i=>i?.resumed_from).filter(i=>typeof i=="string")),o=new Map;for(let i of n)i&&typeof i.bead_id=="string"&&Jn(i)&&o.set(i.bead_id,i.attempt_id);let s=new Map;for(let i of n){let l=wd(i);if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Jn(i)||!jg.has(i.status)&&!l||o.get(i.bead_id)!==i.attempt_id||typeof i.dismissed_at=="number"||l&&r.has(i.attempt_id))continue;let a=t.get(i.bead_id);typeof a=="number"&&a>0&&typeof i.finished_at=="number"&&a>=i.finished_at||s.set(i.bead_id,{attempt:i,run_state:l?"provider_hold":i.status})}return s}function md(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function tt(e){return e&&typeof e=="object"?e:{}}function Bg(e){let t=tt(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ug(e,t,n){let r=tt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>An({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=gd(po(a,s),po(u,s)),p=gd(Or(a,null),Or(u,null));return d||p?{orchestration:d,worker:p}:null}function gd(e,t){return!e||t&&t.text===e.text?null:e}function Wg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=cd(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Ja(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var zg=new Set(["quick_fix","spec_backed","full_plan"]);function hd(e){return typeof e=="string"&&zg.has(e)}function Hg(e){let t={...tt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Gg(e,t,n){let r=e.runner_catalog??null,o=Qa(e,t,n,null);if(!o)return null;let s=Ln(r,o.orchestration_model.value??""),i=s===null?o:Qa(e,t,n,s)||o,l=po(i,r),a=Or(i,s);return l||a?{orchestration:l,worker:a}:null}function Qa(e,t,n,r){let o=hd(n)?n:hd(t.route)?t.route:null;try{return An({pin:t,global:Hg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Kg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Or(Qa(e,tt(t.metadata),t.route,n),n)}function el(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Yg(e){let t={};for(let l of zn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of zn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?sn(Us(i)):n?Qn(t):null}function $d(e,t){let n=Fa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Vg(e,t,n){let r=t.get(e);if(!r)return $d(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return qo(r)}function Xg(e,t,n,r){let o=t.get(e);if(!o)return{label:$d(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":qo(o),title:""}}function Qg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Zg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Jg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],_=[];h.forEach((B,le)=>{let z=B&&typeof B.bead_id=="string"?B.bead_id:"";if(z.length===0)return;let q=B&&typeof B.root_dir=="string"?B.root_dir:"",O=n.get(z),M=O?O.state:void 0,W=M==="running"||M==="pr_wait"||M==="done",K=!O||M==="runnable",H=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,P=Xg(z,n,r,t),G=_.length>0?_[_.length-1].id:null,V=p==="confirmed"&&G!==null&&!(t.get(z)||[]).includes(G);_.push({id:z,title:o.get(z)||z,root_dir:O?O.root_dir:q,workspace_name:O?O.workspace_name:s.get(q)||"",seq:le+1,location_label:P.label,location_title:P.title,draggable:!W,fixed:W,done:M==="done",unplaced:K,mismatch:V,...H!==null?{queue_index:H}:{}})}),_.forEach((B,le)=>{B.seq=le+1});let k=_.length>0&&_.every(B=>B.done),R=_.filter(B=>!B.fixed&&i.armed_by_bead.get(B.id)!==d).map(B=>B.id),N=Zg(d,p,_,k,R,i);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:k,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(B=>B.mismatch||B.unplaced),unlaunched:R,...N})}),l}function eh(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function th(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:h}=eh(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],h={id:p.id,title:p.title,location_label:Vg(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(h):_.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=Zs(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function bd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Vn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function nh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Vn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Xa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function yi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function rh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function oh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let s of o.sublanes.serial)n.push(s.items),r.push(s.occupants)}for(let o of n)for(let s of o)s.search_match=t(s);for(let o of r)for(let s of o)s.search_match=t(s)}function mr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...go,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Yo.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),h=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&h.set($.root_dir,$);let _=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);let k=[],R=[],N=[],B=[],le=[],z=[],q=new Map,O=new Map,M=new Map,W=new Map,K=new Map,H=new Map,P=new Map,G=new Map,V=new Map,J=new Map,ge=new Map,Oe=new Map,F=new Map,ee=new Set,Se=new Map,Te=new Map,C=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let Q=$.root_dir,Re=$.name||Q,Pe=h.get(Q),Ve=Pe&&typeof Pe.revision=="number"?Pe.revision:typeof $.revision=="number"?$.revision:0,rt=tt($.attempts),Qe=tt($.bead_titles);for(let[f,m]of Object.entries(Qe))typeof m=="string"&&m.length>0&&C.set(f,m);let ct=tt($.bead_times),Wt=tt($.pr_observations),yt=tt($.admission),gt=tt($.revise_parked),vt=tt($.merge_queue_state),Mt=tt($.cleanup_failed),$t=tt($.discard_operations),ue=tt($.bead_timelines),ie=tt($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&Se.set(Q,tt($.bead_scope));let S=tt($.bead_workflow),j=tt($.pr_activity),se=Array.isArray($.repo_operations)?$.repo_operations:[];G.set(Q,se);let ae=typeof $.declared_base=="string"?$.declared_base:null;P.set(Q,ae),H.set(Q,Object.entries(Mt).map(([f,m])=>({bead_id:f,step:m&&m.step?m.step:"",reason:m&&m.reason?m.reason:"",at:m&&typeof m.at=="number"?m.at:null,detail:m&&typeof m.detail=="string"?m.detail:null,output_tail:m&&typeof m.output_tail=="string"&&m.output_tail?m.output_tail:void 0,log_path:m&&typeof m.log_path=="string"&&m.log_path?m.log_path:void 0,retry_count:m&&typeof m.retry_count=="number"&&Number.isInteger(m.retry_count)&&m.retry_count>0?m.retry_count:0,failure_code:m&&typeof m.failure_code=="string"?m.failure_code:void 0})));for(let[f,m]of Object.entries(tt($.bead_overlay)))m&&typeof m=="object"&&V.set(`${Q}\0${f}`,m);let ce=new Map;for(let f of Object.values(rt))f&&typeof f.attempt_id=="string"&&ce.set(f.attempt_id,f);let je=Array.isArray($.merge_queue)?$.merge_queue:[],Ze=new Set(je.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),Je=new Map(je.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),Be=new Map,Tt=new Map,Bt=new Map,xt=new Map;je.forEach((f,m)=>{f&&typeof f.bead_id=="string"&&(Be.set(f.bead_id,m+1),Tt.set(f.bead_id,f.resolution),Bt.set(f.bead_id,f.continuation_action||null),xt.set(f.bead_id,f.authority||null))});let Qt=tt($.auto_merge_skips),Ct=f=>{let m=Qt[f];if(!m)return null;let L=tt(tt(Wt[f]).pr).head_sha;return L&&L===m.head_sha?m.reason||"":null};K.set(Q,{positions:Be,resolutions:Tt,continuations:Bt,authorities:xt,state:{active:typeof vt.active=="string"?vt.active:null,failures:tt(vt.failures),waiting:vt.waiting&&typeof vt.waiting.bead_id=="string"&&typeof vt.waiting.reason=="string"?vt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&Ct(f)!==null),running:je.length>0});let Rt=Array.isArray($.queue)?$.queue:[];for(let f of[...Rt,...Array.isArray($.pr_wait)?$.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&Oe.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof f=="string"&&f.length>0&&ee.add(f);let Kt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),_t=tt($.lane_states),zt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,Kt.length);M.set(Q,zt),W.set(Q,Rt.length);let Jt=new Map(Kt.map(f=>[f.id,f])),Nt=new Map;for(let f of Kt)for(let m of f.entries)m&&typeof m.bead_id=="string"&&Nt.set(m.bead_id,f.id);for(let[f,m]of Object.entries(tt($.bead_dependents))){let L=Array.isArray(m?.ids)?m.ids:[],X=tt(m?.root_dirs),te=ge.get(f)||{ids:new Set,root_dirs:{}};for(let fe of L)typeof fe=="string"&&fe.length>0&&te.ids.add(fe);for(let[fe,ut]of Object.entries(X))typeof ut=="string"&&ut.length>0&&(te.root_dirs[fe]=ut);ge.set(f,te)}for(let[f,m]of Object.entries(ie))Array.isArray(m)&&J.set(f,m.filter(L=>typeof L=="string"&&L.length>0));let un=Array.isArray($.done)?$.done:[];for(let f of un)f&&typeof f.bead_id=="string"&&z.push({id:f.bead_id,root_dir:Q,workspace_name:Re});let an=new Map;for(let f of un)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&an.set(f.bead_id,f.added_at);let Ht=f=>({id:f,title:Qe[f]||f,root_dir:Q,workspace_name:Re,expected_revision:Ve,draggable:!1,...tt(ct[f]).created_at?{created_at:tt(ct[f]).created_at}:{},...tt(ct[f]).updated_at?{updated_at:tt(ct[f]).updated_at}:{}}),dn=f=>{let m=S[f]?.chips?.pr;return m&&typeof m.number=="number"&&typeof m.url=="string"?{pr_number:m.number,pr_url:m.url}:{}},en=f=>Object.hasOwn(ie,f)?{blocked_by:Array.isArray(ie[f])?ie[f].filter(m=>typeof m=="string"&&m.length>0):[]}:{},Ae=(f,m)=>{let L=en(f),X=(m?.blockers||[]).map(fe=>fe.id);if(X.length===0)return L;let te=[...L.blocked_by||[]];for(let fe of X)te.includes(fe)||te.push(fe);return{blocked_by:te}},E=new Set;for(let[f,m]of yd(rt,an,{discard_operations:$t,observations:Wt,bead_timelines:ue,provider_hold:tt($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:tt($.account_catalog)})){E.add(f);let L=m.run_state==="failed"?Qg(rt,m.attempt_id):null;L!==null&&F.set(f,L);let X=ce.get(m.attempt_id)||null,te=V.get(`${Q}\0${f}`),fe=te&&te.rollup?te.rollup:null,ut=Ja(ae,X?X.target_base:null),mt=X?el(X,ce):!1,pt=X&&X.quickfix_lane===!0&&X.quickfix_landing&&typeof X.quickfix_landing=="object"?X.quickfix_landing:null,It=pt&&typeof pt.reason=="string"&&pt.reason.length>0?pt.reason:null,A=pt?Ko({bead_id:f,merge_sha:pt.head_sha,cleanup_cursor:pt.cursor,cleanup_failed:It?{step:pt.cursor,reason:It}:null,repo_operations:se}):null;R.push({...Ht(f),lane:"running",...Ae(f,m.wait),...Nt.has(f)?{serial_lane_id:Nt.get(f)}:{},attempt_id:m.attempt_id,run_state:m.run_state,status:m.status||void 0,workflow:S[f]||null,can_pause:m.can_pause,can_resume:m.can_resume,started_at:m.started_at,last_event_at:m.last_event_at,last_activity:m.last_activity,legs:m.legs,runner:m.runner,model:m.model,effort:m.effort,speed:m.speed,resumed_from:m.resumed_from,continuation_mode:m.continuation_mode,usage:m.usage,failure:m.failure||null,hold:m.hold||null,wait:m.wait||null,retry:m.retry||null,exec_chips:{orchestration:Ma(m),worker:Kg(tt(Pe),te,m.runner||null)},discard:tr($t,f,{attempt_id:m.attempt_id,merged:m.failure?.confirmation==="merged"||tt(Wt[f]).pr?.state==="MERGED"}),...fe?{rollup:fe}:{},...mt?{conflict_resolution:!0}:{},...ut?{base_exception:ut}:{},...A?{landing:A}:{},badges:m.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:m.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:m.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:m.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:m.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:m.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:m.run_state==="failed"})}for(let[f,m]of _u(rt)){if(R.some(X=>X.id===f))continue;let L=m.attempt;R.push({...Ht(f),lane:"running",kind:"session",...en(f),attempt_id:typeof L.attempt_id=="string"?L.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:S[f]||null,can_pause:!1,can_resume:!1,started_at:m.started_at,last_event_at:typeof L.last_event_at=="number"?L.last_event_at:null,last_activity:L.last_activity&&typeof L.last_activity=="object"?L.last_activity:null,legs:Array.isArray(L.legs)?L.legs:[],runner:typeof L.runner=="string"?L.runner:null,model:typeof L.model=="string"?L.model:null,effort:typeof L.effort=="string"?L.effort:null,speed:typeof L.speed=="string"?L.speed:null,resumed_from:null,continuation_mode:null,usage:L.usage&&typeof L.usage=="object"?L.usage:null,exec_chips:{orchestration:Ma(L),worker:null},discard:tr($t,f,{merge_queued:!0}),badges:[m.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray($.session_active)?$.session_active:[]){let m=f&&f.bead_id;typeof m!="string"||E.has(m)||(E.add(m),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&J.set(m,f.blocked_by.filter(L=>typeof L=="string"&&L.length>0)),typeof f.title=="string"&&f.title.length>0&&C.set(m,f.title),R.push({...Ht(m),title:f.title||Qe[m]||m,lane:"running",kind:"session",status:"in_progress",started_at:Xa(f.started_at)??Xa(f.updated_at)??void 0,updated_at:Xa(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(L=>typeof L=="string"&&L.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray($.pr_wait)?$.pr_wait:[]){let m=f&&f.bead_id;if(typeof m!="string"||E.has(m))continue;E.add(m);let L=tt(Wt[m]),X=tt(L.pr),te=L.gate?tt(L.gate):null,fe=Ze.has(m),ut=Je.get(m)?.continuation_action||null,mt=!!ut&&ut.continuation===null,pt=vt.active===m,It=f.external===!0,A=Mt[m]||null,x=tt(j[m]),xe=Ko({bead_id:m,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:A,repo_operations:se}),Fe=bi(xe),ot=!!te&&te.base_badge==="\uCDA9\uB3CC",ht=!!A&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(A.step)&&!!te&&te.tier==="merged",Ut=It&&!!A&&!!te&&te.tier==="merged",Br=!!te&&["closed_unmerged","review","undecidable"].includes(te.tier),yn=tr($t,m,{external:It,merge_active:pt||xe?.step==="merge",merge_queued:fe,cleanup_active:Fe,merged:!!A||te?.tier==="merged"}),ir=!!yn.operation,kr=Bg(L.receipt_check);N.push({...Ht(m),lane:"pr_wait",...en(m),...kr.length>0?{receipt_badge:{codes:kr}}:{},workflow:S[m]||null,pr_number:typeof X.number=="number"?X.number:null,pr_url:typeof X.url=="string"?X.url:void 0,external:It,usage:Zn(rt,m),merge_step:xe,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:xe?[te?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:A?[Dr(A.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(A.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof te?.gate_badge=="string"&&te.gate_badge.length>0?[te.gate_badge]:[],alert:xe?xe.failed===!0:!!A||Br,reason:A&&xe?.active!==!0?hi(A.step):"PR \uB300\uAE30",merge_action:te?.tier==="merged"&&!ht&&!Ut?!1:!fe||mt,merge_enabled:!ir&&(mt||te?.enabled===!0||ot||ht||Ut),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ut||ht?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":ot&&!ht?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ir?yn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${yn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${yn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ht?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ot?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":te?.enabled===!0?`\uBA38\uC9C0 (${te.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${te?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:fe&&!mt,cancel_enabled:!pt,continuation_mismatch:ut?.mismatch||null,discard:yn,discard_action:yn.action,discard_enabled:yn.enabled,discard_title:yn.title})}let ye=(f,m,L,X)=>{let te=f&&f.bead_id;if(typeof te!="string"||E.has(te))return null;E.add(te);let fe=gt[te],ut=tr($t,te),mt=ut.operation?ut:null,pt={...Ht(te),lane:m,workflow:S[te]||null,draggable:!mt,discard:mt||void 0,reason:md(yt,te),seq:L+1,queue_position:L+1,queue_index:L,queue_length:X,badges:fe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!fe,revise_action:!!fe,revise_enabled:!!fe&&!mt,revise_title:fe?fe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${fe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},It=en(te);return Object.hasOwn(It,"blocked_by")&&(pt.blocked_by=It.blocked_by),pt};for(let f=0;f<Rt.length;f++){let m=ye(Rt[f],"queue",f,Rt.length);if(!m)continue;B.push(m);let L=q.get(Q);L?L.push(m):q.set(Q,[m])}let Ne=f=>{let m=N.find(fe=>fe.id===f&&fe.root_dir===Q);if(m)return{id:f,title:m.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let L=R.find(fe=>fe.id===f&&fe.root_dir===Q),X=L?L.run_state:Og(rt,f),te=X==="failed"||X==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":X==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:L?L.title:Ht(f).title,badge:te}},y=[];for(let f=0;f<Math.max(zt,Kt.length);f++){let m=`s${f+1}`,L=Jt.get(m),X=L&&Array.isArray(L.entries)?L.entries:[],te=tt(_t[m]),fe=Array.isArray(te.occupied_by)?te.occupied_by.filter(pt=>typeof pt=="string"):[],ut=new Set(fe),mt=[];for(let pt=0;pt<X.length;pt++){let It=X[pt]&&X[pt].bead_id;if(typeof It=="string"&&ut.has(It)){E.add(It);continue}let A=ye(X[pt],m,pt,X.length);A&&(mt.push(A),B.push(A))}mt.length===0&&fe.length===0&&(zt<=1||f>=zt)||y.push({id:m,index:f,items:mt,raw_length:X.length,occupied_by:fe,occupants:fe.map(pt=>Ne(pt)),corrections:Array.isArray(te.corrections)?te.corrections.length:0,cycle:te.cycle===!0,...mt.length===0&&fe.length===0?{empty:!0}:{}})}O.set(Q,y);let v=Array.from({length:zt},(f,m)=>{let L=`s${m+1}`,X=Jt.get(L),te=X&&Array.isArray(X.entries)?X.entries:[],fe=tt(_t[L]);return{id:L,index:te.length,length:te.length,occupied_by:Array.isArray(fe.occupied_by)?fe.occupied_by.filter(ut=>typeof ut=="string"):[]}});for(let f of Array.isArray($.runnable)?$.runnable:[]){let m=f&&f.bead_id;if(typeof m!="string"||E.has(m))continue;E.add(m);let L=f.workflow&&typeof f.workflow=="object"?f.workflow:null,X=L&&typeof L.route=="string"&&L.route||(typeof f.route=="string"?f.route:null),te=Ug(tt(Pe),f.exec_pins,X),fe=No(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&J.set(m,f.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)),typeof f.title=="string"&&f.title.length>0&&C.set(m,f.title),Array.isArray(f.scope)&&Te.set(m,f.scope.filter(xe=>typeof xe=="string"&&xe.length>0));let ut=f.eligible!==!1,mt=f.worker_ineligible===!0,pt=Object.hasOwn(f,"eligible"),It=[];typeof f.reason=="string"&&f.reason.length>0&&It.push(f.reason);let A=md(yt,m);A&&It.push(A);let x=Wg(m,f.release_info,p)?.map(xe=>({...xe,...bd({id:m,root_dir:Q},xe.id)}));k.push({...Ht(m),title:f.title||Qe[m]||m,lane:"runnable",draggable:!pt,queue_placeable:ut&&!mt,...mt?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...x?{dependency_chips:{released:x}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:It.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:L||(X?{route:X,chips:{route:X}}:null),...te?{exec_chips:te}:{},...fe?{rec:fe}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)}:{},place_index:Rt.length,place_lanes:v})}for(let f of un){let m=f&&f.bead_id;if(typeof m!="string"||E.has(m)||(E.add(m),s!==void 0&&typeof f.added_at=="number"&&f.added_at<s))continue;let L=Ig(rt,m),X=L&&typeof L.done_kind=="string"?L.done_kind:null;le.push({...Ht(m),lane:"done",done:!0,done_layout:"three_line",usage:Zn(rt,m),work_ms:Xu(rt,m),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:X,...dn(m),badges:[...X&&pd[X]?[pd[X]]:[],...Yu(rt,m)]})}for(let f of Array.isArray($.session_done)?$.session_done:[]){let m=f&&(f.id||f.bead_id);typeof m!="string"||E.has(m)||(E.add(m),le.push({...Ht(m),...f,id:m,root_dir:Q,workspace_name:Re,expected_revision:Ve,lane:"done",done:!0}))}}if(V.size>0)for(let $ of[...k,...B,...R,...N,...le]){let Q=V.get(`${$.root_dir}\0${$.id}`);if(!Q||(typeof Q.priority=="number"&&($.priority=Q.priority),typeof Q.from_id=="string"&&Q.from_id.length>0&&($.from_id=Q.from_id),$.lane==="done"&&Array.isArray(Q.carried_to)&&Q.carried_to.length>0&&($.carried_to=Q.carried_to),!Object.hasOwn(Q,"metadata")))continue;let Re=tt(Q.metadata);if($.rec=No(Re),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let Pe=Gg(tt(h.get($.root_dir)),Re,typeof Q.route=="string"&&Q.route.length>0?Q.route:tt($.workflow).route);Pe&&($.exec_chips=Pe)}}let oe=new Map;o.forEach(($,Q)=>{$&&typeof $.root_dir=="string"&&oe.set($.root_dir,Q)});let we=n&&n.running_sort==="repo"?"repo":"started";R.sort(($,Q)=>{let Re=$.kind==="session",Pe=Q.kind==="session";if(Re!==Pe)return Re?1:-1;if(Re&&Pe){let Qe=yi(Q.updated_at)-yi($.updated_at);return Qe!==0?Qe:$.id.localeCompare(Q.id)}if(we==="repo"){let Qe=oe.get($.root_dir)??Number.MAX_SAFE_INTEGER,ct=oe.get(Q.root_dir)??Number.MAX_SAFE_INTEGER;if(Qe!==ct)return Qe-ct}let Ve=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,rt=typeof Q.started_at=="number"&&Number.isFinite(Q.started_at)?Q.started_at:null;return Ve!==null&&rt!==null&&Ve!==rt?Ve-rt:Ve===null&&rt!==null?1:Ve!==null&&rt===null?-1:$.id.localeCompare(Q.id)}),le.sort(($,Q)=>(Q.done_at??0)-($.done_at??0));let ve=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),Me=new Set(k.map($=>$.root_dir)),he=new Map;for(let $ of R)$.kind==="session"||$.run_state!=="running"||he.set($.root_dir,(he.get($.root_dir)||0)+1);let Le=new Map;for(let $ of le){let Q=Le.get($.root_dir);Q?Q.push($):Le.set($.root_dir,[$])}let Ge={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},at=[];for(let $ of ve){if(!$||typeof $.root_dir!="string")continue;let Q=q.get($.root_dir)||[],Re=O.get($.root_dir)||[],Pe=Q.length>0||Re.some(Qe=>Qe.items.length>0||Qe.occupied_by.length>0);if(u!=="all"&&!Pe&&!Me.has($.root_dir))continue;let Ve=typeof $.slots=="number"&&$.slots>=vi?$.slots:vi,rt=he.get($.root_dir)||0;at.push({live_count:rt,over_cap:rt>Ve,merge:K.get($.root_dir)||Ge,token_total:Yg(Le.get($.root_dir)||[]),cleanup_failures:H.get($.root_dir)||[],declared_base:P.get($.root_dir)??null,repo_operations:G.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:Ve,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:tt($.runner_catalog),items:Q,sublanes:{parallel:Q,serial:Re},serial_lane_count:M.get($.root_dir)||0,raw_queue_length:W.get($.root_dir)||0})}let D={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:B,queue_groups:at,running:R,pr_wait:N,done:le,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},pe=Mu(D);for(let $ of z)pe.has($.id)||pe.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...D.queue,...D.runnable,...D.running,...D.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let Q=pe.get($.id);$.blockers=($.blocked_by||[]).map(Re=>Nu(Re,Q,pe,o))}for(let $ of[...D.queue,...D.runnable,...D.running,...D.pr_wait]){let Q=($.blockers||[]).map(Ve=>({...Va($.id,Ve),...bd($,Ve.id,pe)})),Re=ud($.id,nh(ge.get($.id),$.dependents_info,$,pe));if(Q.length===0&&Re.length===0)continue;let Pe={...$.dependency_chips||{},...Q.length>0?{predecessors:Q}:{},...Re.length>0?{dependents:Re}:{}};$.dependency_chips=Pe}th(D,Se,Te,pe,o);let re=qu(D.queue_groups);for(let $ of D.queue_groups)for(let Q of $.sublanes.serial){let Re=re.get(ju($.root_dir,Q.id));Re&&(Q.cross_wait_peers=Re)}D.chain_lanes=Jg(l&&Array.isArray(l.lanes)?l.lanes:[],J,pe,o,C,_,{armed_by_bead:Oe,failed_by_bead:F,disarmed_lanes:ee});let _e=new Map;for(let $ of[...D.queue,...D.runnable])_e.has($.id)||_e.set($.id,$);let Ce=new Set;for(let $ of D.chain_lanes)for(let Q of $.rows){if($.status==="confirmed"&&!Q.unplaced&&!Q.fixed&&Ce.add(Q.id),!$.draft&&!Q.unplaced)continue;let Re=_e.get(Q.id);Re&&(Re.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let me=new Map(D.chain_lanes.map($=>[$.lane_id,$.number]));for(let $ of[...D.queue,...D.running]){let Q=Oe.get($.id);if(typeof Q!="string"||Q.length===0)continue;let Re=me.get(Q);$.armed_lane_chip=Re===void 0?{lane_id:Q,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Q,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let De=[];for(let $ of q.values())for(let Q of $)Ce.has(Q.id)||De.push(Q);De.sort(($,Q)=>{let Re=$.workspace_name.localeCompare(Q.workspace_name);return Re!==0?Re:($.queue_index??0)-(Q.queue_index??0)}),D.parallel_rows=De;let Ue={};for(let[$,Q]of pe)typeof Q.root_dir=="string"&&Q.root_dir.length>0&&(Ue[$]=Q.root_dir);for(let $ of D.chain_lanes)for(let Q of $.rows)!Object.hasOwn(Ue,Q.id)&&Q.root_dir.length>0&&_.has(Q.root_dir)&&(Ue[Q.id]=Q.root_dir);D.owner_of=Ue;let Xe=D.runnable.length;D.runnable_all=D.runnable.slice();let qe=D.runnable,Z=$=>i.show_blocked||$.blocked!==!0,Y=$=>i.spec==="all"||(i.spec==="with"?$.published===!0:$.published!==!0);if(d==="per_control"){let $=[],Q=0,Re=0;for(let Pe of qe){let Ve=Z(Pe),rt=Y(Pe);Ve&&rt?$.push(Pe):!Ve&&rt?Q+=1:Ve&&!rt&&(Re+=1)}qe=$,D.runnable_hidden={blocked:Q,spec:Re}}else{qe=qe.filter(Z);let $=qe.length;qe=qe.filter(Y),D.runnable_hidden={blocked:Xe-$,spec:$-qe.length}}let $e=($,Q)=>{let Re=yi(Q.updated_at)-yi($.updated_at);return Re!==0?Re:$.id.localeCompare(Q.id)},lt=a==="repo_spec"?($,Q)=>{let Re=$.published===!0?0:1,Pe=Q.published===!0?0:1;return Re!==Pe?Re-Pe:$e($,Q)}:$e;if(a==="as_given")D.runnable=qe,D.runnable_sections=[];else if(a==="updated_flat")D.runnable=qe.slice().sort($e),D.runnable_sections=[];else{let $=new Map;for(let Pe of qe){let Ve=$.get(Pe.root_dir);Ve?Ve.push(Pe):$.set(Pe.root_dir,[Pe])}let Q=[],Re=[];for(let Pe of ve){if(!Pe||typeof Pe.root_dir!="string")continue;let Ve=($.get(Pe.root_dir)||[]).slice().sort(lt);$.delete(Pe.root_dir),Ve.length!==0&&(Q.push({root_dir:Pe.root_dir,name:Pe.name||Pe.root_dir,items:Ve.map(rt=>({...rt,workspace_name:""}))}),Re.push(...Ve))}for(let[Pe,Ve]of $){let rt=Ve.slice().sort(lt);Q.push({root_dir:Pe,name:rt[0]?.workspace_name||Pe,items:rt.map(Qe=>({...Qe,workspace_name:""}))}),Re.push(...rt)}D.runnable=Re,D.runnable_sections=Q}let He=rh(n?n.search:void 0);return He&&oh(D,He),D}function xd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));p&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var sh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ki="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",ih="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ah="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ho="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Vo(e,t){return`${e}\0${t}`}function lh(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function ch(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Zo(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=lh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,h]of o)for(let _ of h)s.push({blocker:_,blockee:p});let i=ch(e,t),l=new Map(r.map((p,h)=>[p,h])),a=r.slice(0,i).filter(p=>o.get(p).some(h=>Number(l.get(h))>Number(l.get(p)))),u=xd(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Ad(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Zo(n,t)}function uh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function dh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ph(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tl(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function fh(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Vo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Vo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Vo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function _h(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function mh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function wi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Jo(e){let t=ph(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=dh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let _=s(u);if(_!==null){if(tl(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),p!==void 0&&r.add(Vo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let h=s(u);h!==null&&(t.set(u,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Vo(u,d))}}function es(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=fh(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:uh(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Sd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Xo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ed(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Td(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(wi(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Qo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function $i(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function xi(e,t,n){let r=Jo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:sh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ih};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ho}}if(e.kind==="chain"&&d===void 0)return{refused:ho};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(k<0)return;let R=k>0?d.entries[k-1]:null,N=k+1<d.entries.length?d.entries[k+1]:null,B=Xo(d,k),le=N!==null&&Xo(d,k+1);B&&R!==null&&r.removeDep(e.bead_id,R.bead_id),le&&N!==null&&r.removeDep(N.bead_id,e.bead_id),(B||le)&&R!==null&&N!==null&&r.addDep(N.bead_id,R.bead_id,u)},h=(k,R)=>{let N=n.cross_lanes.get(k),B=N.entries.findIndex(P=>P.bead_id===e.bead_id),le=N.entries.filter(P=>P.bead_id!==e.bead_id),z=Math.max(0,Math.min(le.length,B>=0&&R>B?R-1:R)),q=-1;if(le.forEach((P,G)=>{n.fixed_members.has(P.bead_id)&&(q=G)}),z<=q){r.state.refusal=ah;return}let O=B>=0?N.entries[B]:d?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Zo({status:N.status,entries:[...le.slice(0,z),O,...le.slice(z)]},n);let M=l.entries;if($i(M,N.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Qo(M)}}),N.status!=="confirmed")return;let W=M.findIndex(P=>P.bead_id===e.bead_id),K=W>0?M[W-1].bead_id:null,H=W+1<M.length?M[W+1].bead_id:null;if(K===null){H!==null&&r.addDep(H,e.bead_id,k);return}if(r.addDep(e.bead_id,K,k),H!==null&&(r.graph.get(H)||[]).includes(K)){let P=N.entries.findIndex(G=>G.bead_id===H);(r.laneCreated(H,K)||P>0&&N.entries[P-1].bead_id===K&&Xo(N,P))&&r.removeDep(H,K),r.addDep(H,e.bead_id,k)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Ed(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Qo(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=_h(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(wi(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,N=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!N&&N.bead_id===e.bead_id)&&mh(n,e.root_dir)&&_!==void 0){let le=_>k?k:k-1;le>=0&&le!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(wi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let k=_>t.index?t.index:t.index-1;k>=0&&k!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(wi(e.bead_id,e.root_dir,t.index,t.lane_id));return es(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ho};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Zo(n,t);if(r.held)return{refused:ki};let o=r.entries,s=Jo(t),i=[];Sd(s,o,e),s.state.refusal===null&&Td(s,t,o,i);let l=$i(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),es(s,t,l,i,{lane_id:e,correction:r})}function Rd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ho};let r=Zo(n,t),o=r.entries,s=Jo(t),i=[];Sd(s,o,e),s.state.refusal===null&&Td(s,t,o,i);let l=$i(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}];return es(s,t,l,i,{lane_id:e,correction:r})}function Od(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ho};let r=Zo(n,t),o=r.entries;return es(Jo(t),t,$i(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Qo(o)}}],[],{lane_id:e,correction:r})}function Id(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ho};let r=Jo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Xo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return es(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ed(t,n,e,n.entries)})}function Ld(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Xo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${nl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Pd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Dd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function rl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var gh="\uC0AC\uC774\uD074";function hh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function ol(e,t,n){let r=mr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:hh(e)}}function Md(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=tl(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:gh}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Nd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Gd,setPrototypeOf:qd,isFrozen:bh,getPrototypeOf:yh,getOwnPropertyDescriptor:vh}=Object,{freeze:gn,seal:Cn,create:dl}=Object,{apply:pl,construct:fl}=typeof Reflect<"u"&&Reflect;gn||(gn=function(t){return t});Cn||(Cn=function(t){return t});pl||(pl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});fl||(fl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ai=hn(Array.prototype.forEach),wh=hn(Array.prototype.lastIndexOf),jd=hn(Array.prototype.pop),ts=hn(Array.prototype.push),kh=hn(Array.prototype.splice),Ei=hn(String.prototype.toLowerCase),sl=hn(String.prototype.toString),il=hn(String.prototype.match),ns=hn(String.prototype.replace),$h=hn(String.prototype.indexOf),xh=hn(String.prototype.trim),Dn=hn(Object.prototype.hasOwnProperty),mn=hn(RegExp.prototype.test),rs=Ah(TypeError);function hn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return pl(e,t,r)}}function Ah(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return fl(e,n)}}function bt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ei;qd&&qd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(bh(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Sh(e){for(let t=0;t<e.length;t++)Dn(e,t)||(e[t]=null);return e}function nr(e){let t=dl(null);for(let[n,r]of Gd(e))Dn(e,n)&&(Array.isArray(r)?t[n]=Sh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=nr(r):t[n]=r);return t}function os(e,t){for(;e!==null;){let r=vh(e,t);if(r){if(r.get)return hn(r.get);if(typeof r.value=="function")return hn(r.value)}e=yh(e)}function n(){return null}return n}var Fd=gn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),al=gn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ll=gn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Eh=gn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),cl=gn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Th=gn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Bd=gn(["#text"]),Ud=gn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ul=gn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wd=gn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Si=gn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ch=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Rh=Cn(/<%[\w\W]*|[\w\W]*%>/gm),Oh=Cn(/\$\{[\w\W]*/gm),Ih=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Lh=Cn(/^aria-[\-\w]+$/),Kd=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ph=Cn(/^(?:\w+script|data):/i),Dh=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yd=Cn(/^html$/i),Mh=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),zd=Object.freeze({__proto__:null,ARIA_ATTR:Lh,ATTR_WHITESPACE:Dh,CUSTOM_ELEMENT:Mh,DATA_ATTR:Ih,DOCTYPE_NAME:Yd,ERB_EXPR:Rh,IS_ALLOWED_URI:Kd,IS_SCRIPT_OR_DATA:Ph,MUSTACHE_EXPR:Ch,TMPLIT_EXPR:Oh}),ss={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Nh=function(){return typeof window>"u"?null:window},qh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Hd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Nh(),t=Ae=>Vd(Ae);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ss.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:h,trustedTypes:_}=e,k=a.prototype,R=os(k,"cloneNode"),N=os(k,"remove"),B=os(k,"nextSibling"),le=os(k,"childNodes"),z=os(k,"parentNode");if(typeof i=="function"){let Ae=n.createElement("template");Ae.content&&Ae.content.ownerDocument&&(n=Ae.content.ownerDocument)}let q,O="",{implementation:M,createNodeIterator:W,createDocumentFragment:K,getElementsByTagName:H}=n,{importNode:P}=r,G=Hd();t.isSupported=typeof Gd=="function"&&typeof z=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:V,ERB_EXPR:J,TMPLIT_EXPR:ge,DATA_ATTR:Oe,ARIA_ATTR:F,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:Te}=zd,{IS_ALLOWED_URI:C}=zd,oe=null,we=bt({},[...Fd,...al,...ll,...cl,...Bd]),ve=null,Me=bt({},[...Ud,...ul,...Wd,...Si]),he=Object.seal(dl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Ge=null,at=Object.seal(dl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),D=!0,pe=!0,re=!1,_e=!0,Ce=!1,me=!0,De=!1,Ue=!1,Xe=!1,qe=!1,Z=!1,Y=!1,$e=!0,ft=!1,lt="user-content-",He=!0,$=!1,Q={},Re=null,Pe=bt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ve=null,rt=bt({},["audio","video","img","source","image","track"]),Qe=null,ct=bt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Wt="http://www.w3.org/1998/Math/MathML",yt="http://www.w3.org/2000/svg",gt="http://www.w3.org/1999/xhtml",vt=gt,Mt=!1,$t=null,ue=bt({},[Wt,yt,gt],sl),ie=bt({},["mi","mo","mn","ms","mtext"]),S=bt({},["annotation-xml"]),j=bt({},["title","style","font","a","script"]),se=null,ae=["application/xhtml+xml","text/html"],ce="text/html",je=null,Ze=null,Je=n.createElement("form"),Be=function(E){return E instanceof RegExp||E instanceof Function},Tt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ze&&Ze===E)){if((!E||typeof E!="object")&&(E={}),E=nr(E),se=ae.indexOf(E.PARSER_MEDIA_TYPE)===-1?ce:E.PARSER_MEDIA_TYPE,je=se==="application/xhtml+xml"?sl:Ei,oe=Dn(E,"ALLOWED_TAGS")?bt({},E.ALLOWED_TAGS,je):we,ve=Dn(E,"ALLOWED_ATTR")?bt({},E.ALLOWED_ATTR,je):Me,$t=Dn(E,"ALLOWED_NAMESPACES")?bt({},E.ALLOWED_NAMESPACES,sl):ue,Qe=Dn(E,"ADD_URI_SAFE_ATTR")?bt(nr(ct),E.ADD_URI_SAFE_ATTR,je):ct,Ve=Dn(E,"ADD_DATA_URI_TAGS")?bt(nr(rt),E.ADD_DATA_URI_TAGS,je):rt,Re=Dn(E,"FORBID_CONTENTS")?bt({},E.FORBID_CONTENTS,je):Pe,Le=Dn(E,"FORBID_TAGS")?bt({},E.FORBID_TAGS,je):nr({}),Ge=Dn(E,"FORBID_ATTR")?bt({},E.FORBID_ATTR,je):nr({}),Q=Dn(E,"USE_PROFILES")?E.USE_PROFILES:!1,D=E.ALLOW_ARIA_ATTR!==!1,pe=E.ALLOW_DATA_ATTR!==!1,re=E.ALLOW_UNKNOWN_PROTOCOLS||!1,_e=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=E.SAFE_FOR_TEMPLATES||!1,me=E.SAFE_FOR_XML!==!1,De=E.WHOLE_DOCUMENT||!1,qe=E.RETURN_DOM||!1,Z=E.RETURN_DOM_FRAGMENT||!1,Y=E.RETURN_TRUSTED_TYPE||!1,Xe=E.FORCE_BODY||!1,$e=E.SANITIZE_DOM!==!1,ft=E.SANITIZE_NAMED_PROPS||!1,He=E.KEEP_CONTENT!==!1,$=E.IN_PLACE||!1,C=E.ALLOWED_URI_REGEXP||Kd,vt=E.NAMESPACE||gt,ie=E.MATHML_TEXT_INTEGRATION_POINTS||ie,S=E.HTML_INTEGRATION_POINTS||S,he=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Be(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Be(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(pe=!1),Z&&(qe=!0),Q&&(oe=bt({},Bd),ve=[],Q.html===!0&&(bt(oe,Fd),bt(ve,Ud)),Q.svg===!0&&(bt(oe,al),bt(ve,ul),bt(ve,Si)),Q.svgFilters===!0&&(bt(oe,ll),bt(ve,ul),bt(ve,Si)),Q.mathMl===!0&&(bt(oe,cl),bt(ve,Wd),bt(ve,Si))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?at.tagCheck=E.ADD_TAGS:(oe===we&&(oe=nr(oe)),bt(oe,E.ADD_TAGS,je))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?at.attributeCheck=E.ADD_ATTR:(ve===Me&&(ve=nr(ve)),bt(ve,E.ADD_ATTR,je))),E.ADD_URI_SAFE_ATTR&&bt(Qe,E.ADD_URI_SAFE_ATTR,je),E.FORBID_CONTENTS&&(Re===Pe&&(Re=nr(Re)),bt(Re,E.FORBID_CONTENTS,je)),He&&(oe["#text"]=!0),De&&bt(oe,["html","head","body"]),oe.table&&(bt(oe,["tbody"]),delete Le.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw rs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=E.TRUSTED_TYPES_POLICY,O=q.createHTML("")}else q===void 0&&(q=qh(_,o)),q!==null&&typeof O=="string"&&(O=q.createHTML(""));gn&&gn(E),Ze=E}},Bt=bt({},[...al,...ll,...Eh]),xt=bt({},[...cl,...Th]),Qt=function(E){let ye=z(E);(!ye||!ye.tagName)&&(ye={namespaceURI:vt,tagName:"template"});let Ne=Ei(E.tagName),y=Ei(ye.tagName);return $t[E.namespaceURI]?E.namespaceURI===yt?ye.namespaceURI===gt?Ne==="svg":ye.namespaceURI===Wt?Ne==="svg"&&(y==="annotation-xml"||ie[y]):!!Bt[Ne]:E.namespaceURI===Wt?ye.namespaceURI===gt?Ne==="math":ye.namespaceURI===yt?Ne==="math"&&S[y]:!!xt[Ne]:E.namespaceURI===gt?ye.namespaceURI===yt&&!S[y]||ye.namespaceURI===Wt&&!ie[y]?!1:!xt[Ne]&&(j[Ne]||!Bt[Ne]):!!(se==="application/xhtml+xml"&&$t[E.namespaceURI]):!1},Ct=function(E){ts(t.removed,{element:E});try{z(E).removeChild(E)}catch{N(E)}},Rt=function(E,ye){try{ts(t.removed,{attribute:ye.getAttributeNode(E),from:ye})}catch{ts(t.removed,{attribute:null,from:ye})}if(ye.removeAttribute(E),E==="is")if(qe||Z)try{Ct(ye)}catch{}else try{ye.setAttribute(E,"")}catch{}},Kt=function(E){let ye=null,Ne=null;if(Xe)E="<remove></remove>"+E;else{let f=il(E,/^[\r\n\t ]+/);Ne=f&&f[0]}se==="application/xhtml+xml"&&vt===gt&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let y=q?q.createHTML(E):E;if(vt===gt)try{ye=new h().parseFromString(y,se)}catch{}if(!ye||!ye.documentElement){ye=M.createDocument(vt,"template",null);try{ye.documentElement.innerHTML=Mt?O:y}catch{}}let v=ye.body||ye.documentElement;return E&&Ne&&v.insertBefore(n.createTextNode(Ne),v.childNodes[0]||null),vt===gt?H.call(ye,De?"html":"body")[0]:De?ye.documentElement:v},_t=function(E){return W.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},zt=function(E){return E instanceof p&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Jt=function(E){return typeof l=="function"&&E instanceof l};function Nt(Ae,E,ye){Ai(Ae,Ne=>{Ne.call(t,E,ye,Ze)})}let un=function(E){let ye=null;if(Nt(G.beforeSanitizeElements,E,null),zt(E))return Ct(E),!0;let Ne=je(E.nodeName);if(Nt(G.uponSanitizeElement,E,{tagName:Ne,allowedTags:oe}),me&&E.hasChildNodes()&&!Jt(E.firstElementChild)&&mn(/<[/\w!]/g,E.innerHTML)&&mn(/<[/\w!]/g,E.textContent)||E.nodeType===ss.progressingInstruction||me&&E.nodeType===ss.comment&&mn(/<[/\w]/g,E.data))return Ct(E),!0;if(!(at.tagCheck instanceof Function&&at.tagCheck(Ne))&&(!oe[Ne]||Le[Ne])){if(!Le[Ne]&&Ht(Ne)&&(he.tagNameCheck instanceof RegExp&&mn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne)))return!1;if(He&&!Re[Ne]){let y=z(E)||E.parentNode,v=le(E)||E.childNodes;if(v&&y){let f=v.length;for(let m=f-1;m>=0;--m){let L=R(v[m],!0);L.__removalCount=(E.__removalCount||0)+1,y.insertBefore(L,B(E))}}}return Ct(E),!0}return E instanceof a&&!Qt(E)||(Ne==="noscript"||Ne==="noembed"||Ne==="noframes")&&mn(/<\/no(script|embed|frames)/i,E.innerHTML)?(Ct(E),!0):(Ce&&E.nodeType===ss.text&&(ye=E.textContent,Ai([V,J,ge],y=>{ye=ns(ye,y," ")}),E.textContent!==ye&&(ts(t.removed,{element:E.cloneNode()}),E.textContent=ye)),Nt(G.afterSanitizeElements,E,null),!1)},an=function(E,ye,Ne){if($e&&(ye==="id"||ye==="name")&&(Ne in n||Ne in Je))return!1;if(!(pe&&!Ge[ye]&&mn(Oe,ye))){if(!(D&&mn(F,ye))){if(!(at.attributeCheck instanceof Function&&at.attributeCheck(ye,E))){if(!ve[ye]||Ge[ye]){if(!(Ht(E)&&(he.tagNameCheck instanceof RegExp&&mn(he.tagNameCheck,E)||he.tagNameCheck instanceof Function&&he.tagNameCheck(E))&&(he.attributeNameCheck instanceof RegExp&&mn(he.attributeNameCheck,ye)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(ye,E))||ye==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&mn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne))))return!1}else if(!Qe[ye]){if(!mn(C,ns(Ne,Se,""))){if(!((ye==="src"||ye==="xlink:href"||ye==="href")&&E!=="script"&&$h(Ne,"data:")===0&&Ve[E])){if(!(re&&!mn(ee,ns(Ne,Se,"")))){if(Ne)return!1}}}}}}}return!0},Ht=function(E){return E!=="annotation-xml"&&il(E,Te)},dn=function(E){Nt(G.beforeSanitizeAttributes,E,null);let{attributes:ye}=E;if(!ye||zt(E))return;let Ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},y=ye.length;for(;y--;){let v=ye[y],{name:f,namespaceURI:m,value:L}=v,X=je(f),te=L,fe=f==="value"?te:xh(te);if(Ne.attrName=X,Ne.attrValue=fe,Ne.keepAttr=!0,Ne.forceKeepAttr=void 0,Nt(G.uponSanitizeAttribute,E,Ne),fe=Ne.attrValue,ft&&(X==="id"||X==="name")&&(Rt(f,E),fe=lt+fe),me&&mn(/((--!?|])>)|<\/(style|title|textarea)/i,fe)){Rt(f,E);continue}if(X==="attributename"&&il(fe,"href")){Rt(f,E);continue}if(Ne.forceKeepAttr)continue;if(!Ne.keepAttr){Rt(f,E);continue}if(!_e&&mn(/\/>/i,fe)){Rt(f,E);continue}Ce&&Ai([V,J,ge],mt=>{fe=ns(fe,mt," ")});let ut=je(E.nodeName);if(!an(ut,X,fe)){Rt(f,E);continue}if(q&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!m)switch(_.getAttributeType(ut,X)){case"TrustedHTML":{fe=q.createHTML(fe);break}case"TrustedScriptURL":{fe=q.createScriptURL(fe);break}}if(fe!==te)try{m?E.setAttributeNS(m,f,fe):E.setAttribute(f,fe),zt(E)?Ct(E):jd(t.removed)}catch{Rt(f,E)}}Nt(G.afterSanitizeAttributes,E,null)},en=function Ae(E){let ye=null,Ne=_t(E);for(Nt(G.beforeSanitizeShadowDOM,E,null);ye=Ne.nextNode();)Nt(G.uponSanitizeShadowNode,ye,null),un(ye),dn(ye),ye.content instanceof s&&Ae(ye.content);Nt(G.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(Ae){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ye=null,Ne=null,y=null,v=null;if(Mt=!Ae,Mt&&(Ae="<!-->"),typeof Ae!="string"&&!Jt(Ae))if(typeof Ae.toString=="function"){if(Ae=Ae.toString(),typeof Ae!="string")throw rs("dirty is not a string, aborting")}else throw rs("toString is not a function");if(!t.isSupported)return Ae;if(Ue||Tt(E),t.removed=[],typeof Ae=="string"&&($=!1),$){if(Ae.nodeName){let L=je(Ae.nodeName);if(!oe[L]||Le[L])throw rs("root node is forbidden and cannot be sanitized in-place")}}else if(Ae instanceof l)ye=Kt("<!---->"),Ne=ye.ownerDocument.importNode(Ae,!0),Ne.nodeType===ss.element&&Ne.nodeName==="BODY"||Ne.nodeName==="HTML"?ye=Ne:ye.appendChild(Ne);else{if(!qe&&!Ce&&!De&&Ae.indexOf("<")===-1)return q&&Y?q.createHTML(Ae):Ae;if(ye=Kt(Ae),!ye)return qe?null:Y?O:""}ye&&Xe&&Ct(ye.firstChild);let f=_t($?Ae:ye);for(;y=f.nextNode();)un(y),dn(y),y.content instanceof s&&en(y.content);if($)return Ae;if(qe){if(Z)for(v=K.call(ye.ownerDocument);ye.firstChild;)v.appendChild(ye.firstChild);else v=ye;return(ve.shadowroot||ve.shadowrootmode)&&(v=P.call(r,v,!0)),v}let m=De?ye.outerHTML:ye.innerHTML;return De&&oe["!doctype"]&&ye.ownerDocument&&ye.ownerDocument.doctype&&ye.ownerDocument.doctype.name&&mn(Yd,ye.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+ye.ownerDocument.doctype.name+`>
`+m),Ce&&Ai([V,J,ge],L=>{m=ns(m,L," ")}),q&&Y?q.createHTML(m):m},t.setConfig=function(){let Ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(Ae),Ue=!0},t.clearConfig=function(){Ze=null,Ue=!1},t.isValidAttribute=function(Ae,E,ye){Ze||Tt({});let Ne=je(Ae),y=je(E);return an(Ne,y,ye)},t.addHook=function(Ae,E){typeof E=="function"&&ts(G[Ae],E)},t.removeHook=function(Ae,E){if(E!==void 0){let ye=wh(G[Ae],E);return ye===-1?void 0:kh(G[Ae],ye,1)[0]}return jd(G[Ae])},t.removeHooks=function(Ae){G[Ae]=[]},t.removeAllHooks=function(){G=Hd()},t}var Xd=Vd();var rr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ti=e=>(...t)=>({_$litDirective$:e,values:t}),bo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var is=class extends bo{constructor(t){if(super(t),this.it=jt,t.type!==rr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===jt||t==null)return this._t=void 0,this.it=t;if(t===Tn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};is.directiveName="unsafeHTML",is.resultType=1;var Qd=Ti(is);function hl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Nr=hl();function op(e){Nr=e}var us={exec:()=>null};function At(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(bn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var jh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Fh=/^(?:[ \t]*(?:\n|$))+/,Bh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Uh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ds=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bl=/(?:[*+-]|\d{1,9}[.)])/,sp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ip=At(sp).replace(/bull/g,bl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zh=At(sp).replace(/bull/g,bl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hh=/^[^\n]+/,vl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gh=At(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Kh=At(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bl).getRegex(),Pi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yh=At("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",wl).replace("tag",Pi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ap=At(yl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex(),Vh=At(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ap).getRegex(),kl={blockquote:Vh,code:Bh,def:Gh,fences:Uh,heading:Wh,hr:ds,html:Yh,lheading:ip,list:Kh,newline:Fh,paragraph:ap,table:us,text:Hh},Zd=At("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex(),Xh={...kl,lheading:zh,table:Zd,paragraph:At(yl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pi).getRegex()},Qh={...kl,html:At(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:us,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:At(yl).replace("hr",ds).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ip).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Zh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Jh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,lp=/^( {2,}|\\)\n(?!\s*$)/,eb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Di=/[\p{P}\p{S}]/u,$l=/[\s\p{P}\p{S}]/u,cp=/[^\s\p{P}\p{S}]/u,tb=At(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,$l).getRegex(),up=/(?!~)[\p{P}\p{S}]/u,nb=/(?!~)[\s\p{P}\p{S}]/u,rb=/(?:[^\s\p{P}\p{S}]|~)/u,ob=At(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",jh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),dp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sb=At(dp,"u").replace(/punct/g,Di).getRegex(),ib=At(dp,"u").replace(/punct/g,up).getRegex(),pp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ab=At(pp,"gu").replace(/notPunctSpace/g,cp).replace(/punctSpace/g,$l).replace(/punct/g,Di).getRegex(),lb=At(pp,"gu").replace(/notPunctSpace/g,rb).replace(/punctSpace/g,nb).replace(/punct/g,up).getRegex(),cb=At("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,cp).replace(/punctSpace/g,$l).replace(/punct/g,Di).getRegex(),ub=At(/\\(punct)/,"gu").replace(/punct/g,Di).getRegex(),db=At(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pb=At(wl).replace("(?:-->|$)","-->").getRegex(),fb=At("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Oi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,_b=At(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Oi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fp=At(/^!?\[(label)\]\[(ref)\]/).replace("label",Oi).replace("ref",vl).getRegex(),_p=At(/^!?\[(ref)\](?:\[\])?/).replace("ref",vl).getRegex(),mb=At("reflink|nolink(?!\\()","g").replace("reflink",fp).replace("nolink",_p).getRegex(),Jd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,xl={_backpedal:us,anyPunctuation:ub,autolink:db,blockSkip:ob,br:lp,code:Jh,del:us,emStrongLDelim:sb,emStrongRDelimAst:ab,emStrongRDelimUnd:cb,escape:Zh,link:_b,nolink:_p,punctuation:tb,reflink:fp,reflinkSearch:mb,tag:fb,text:eb,url:us},gb={...xl,link:At(/^!?\[(label)\]\((.*?)\)/).replace("label",Oi).getRegex(),reflink:At(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Oi).getRegex()},_l={...xl,emStrongRDelimAst:lb,emStrongLDelim:ib,url:At(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Jd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:At(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Jd).getRegex()},hb={..._l,br:At(lp).replace("{2,}","*").getRegex(),text:At(_l.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ci={normal:kl,gfm:Xh,pedantic:Qh},as={normal:xl,gfm:_l,breaks:hb,pedantic:gb},bb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ep=e=>bb[e];function or(e,t){if(t){if(bn.escapeTest.test(e))return e.replace(bn.escapeReplace,ep)}else if(bn.escapeTestNoEncode.test(e))return e.replace(bn.escapeReplaceNoEncode,ep);return e}function tp(e){try{e=encodeURI(e).replace(bn.percentDecode,"%")}catch{return null}return e}function np(e,t){let n=e.replace(bn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(bn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(bn.slashPipe,"|");return r}function ls(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function yb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function rp(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function vb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ii=class{constructor(e){Lt(this,"options");Lt(this,"rules");Lt(this,"lexer");this.options=e||Nr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ls(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=vb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ls(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ls(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ls(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let _=h,k=_.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-_.raw.length)+R.raw,o=o.substring(0,o.length-_.text.length)+R.text;break}else if(h?.type==="list"){let _=h,k=_.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-h.raw.length)+R.raw,o=o.substring(0,o.length-_.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),h=e.split(`
`,1)[0],_=!p.trim(),k=0;if(this.options.pedantic?(k=2,d=p.trimStart()):_?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=p.slice(k),k+=t[1].length),_&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),N=this.rules.other.hrRegex(k),B=this.rules.other.fencesBeginRegex(k),le=this.rules.other.headingBeginRegex(k),z=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],O;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),B.test(h)||le.test(h)||z.test(h)||R.test(h)||N.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+O.slice(k);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(p)||le.test(p)||N.test(p))break;d+=`
`+h}!_&&!h.trim()&&(_=!0),u+=q+`
`,e=e.substring(q.length+1),p=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=np(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(np(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=ls(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=yb(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),rp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return rp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Mn=class ml{constructor(t){Lt(this,"tokens");Lt(this,"options");Lt(this,"state");Lt(this,"inlineQueue");Lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Nr,this.options.tokenizer=this.options.tokenizer||new Ii,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:bn,block:Ci.normal,inline:as.normal};this.options.pedantic?(n.block=Ci.pedantic,n.inline=as.pedantic):this.options.gfm&&(n.block=Ci.gfm,this.options.breaks?n.inline=as.breaks:n.inline=as.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ci,inline:as}}static lex(t,n){return new ml(n).lex(t)}static lexInline(t,n){return new ml(n).inlineTokens(t)}lex(t){t=t.replace(bn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(bn.tabCharGlobal,"    ").replace(bn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),h;this.options.extensions.startInline.forEach(_=>{h=_.call({lexer:this},p),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Li=class{constructor(e){Lt(this,"options");Lt(this,"parser");this.options=e||Nr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(bn.notSpaceStart)?.[0],o=e.replace(bn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+or(r)+'">'+(n?o:or(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:or(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${or(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=tp(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+or(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=tp(e);if(o===null)return or(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${or(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:or(e.text)}},Al=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Nn=class gl{constructor(t){Lt(this,"options");Lt(this,"renderer");Lt(this,"textRenderer");this.options=t||Nr,this.options.renderer=this.options.renderer||new Li,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Al}static parse(t,n){return new gl(n).parse(t)}static parseInline(t,n){return new gl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ri,cs=(Ri=class{constructor(e){Lt(this,"options");Lt(this,"block");this.options=e||Nr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Mn.lex:Mn.lexInline}provideParser(){return this.block?Nn.parse:Nn.parseInline}},Lt(Ri,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Lt(Ri,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ri),wb=class{constructor(...e){Lt(this,"defaults",hl());Lt(this,"options",this.setOptions);Lt(this,"parse",this.parseMarkdown(!0));Lt(this,"parseInline",this.parseMarkdown(!1));Lt(this,"Parser",Nn);Lt(this,"Renderer",Li);Lt(this,"TextRenderer",Al);Lt(this,"Lexer",Mn);Lt(this,"Tokenizer",Ii);Lt(this,"Hooks",cs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Li(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ii(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new cs;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];cs.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&cs.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Mn.lex(e,t??this.defaults)}parser(e,t){return Nn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Mn.lex:Mn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Nn.parse:Nn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Mn.lex:Mn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Nn.parse:Nn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+or(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Mr=new wb;function Ot(e,t){return Mr.parse(e,t)}Ot.options=Ot.setOptions=function(e){return Mr.setOptions(e),Ot.defaults=Mr.defaults,op(Ot.defaults),Ot};Ot.getDefaults=hl;Ot.defaults=Nr;Ot.use=function(...e){return Mr.use(...e),Ot.defaults=Mr.defaults,op(Ot.defaults),Ot};Ot.walkTokens=function(e,t){return Mr.walkTokens(e,t)};Ot.parseInline=Mr.parseInline;Ot.Parser=Nn;Ot.parser=Nn.parse;Ot.Renderer=Li;Ot.TextRenderer=Al;Ot.Lexer=Mn;Ot.lexer=Mn.lex;Ot.Tokenizer=Ii;Ot.Hooks=cs;Ot.parse=Ot;var Qx=Ot.options,Zx=Ot.setOptions,Jx=Ot.use,e0=Ot.walkTokens,t0=Ot.parseInline;var n0=Nn.parse,r0=Mn.lex;function gr(e){let t=Ot.parse(e),n=Xd.sanitize(t);return Qd(n)}function sr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function yo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Mi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var gp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},kb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},$b=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,xb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function qn(e){return!!e&&typeof e=="object"}function Sl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function El(e,t){let n=Sl(e),r=Sl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function hp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>qn(o)&&typeof o.text=="string"?o.text:"").join(""):qn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ab(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:gp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Sl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=El(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=El(qn(l)?l.old_string:"",qn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Tl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Sb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function bp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>qn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Sb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Cl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=$b.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:xb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Eb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Tb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(qn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Cl(i.text));else if(i.type==="thinking"){let l=Tl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Ab(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?mp(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(qn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=hp(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=bp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?mp([o],n):[o]}return[]}function mp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Cb(e){let t=typeof e.command=="string"?e.command:"",n=hp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:gp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function Rb(e){if(e.type==="item.completed"&&qn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Cl(t.text)];if(t.type==="user_message"){let n=bp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Tl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Cb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ob(e){if(e.schema!=="codex-delegation-monitor-v1"||!qn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&qn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Cl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Tl(n.text);return i?[i]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=kb[n.activity];if(!r)return[];let o,s;if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:s,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Ib(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Lb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return qn(t)?t:null}function yp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=Lb(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Eb(s,r);let i=s.schema==="codex-delegation-monitor-v1"?Ob(s):Ib(s)?Rb(s):Tb(s,n);return i.length>0&&(r.progress=null),i}}}function Rl(e){let t=[],n=yp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var Pb=5,Db=10,Mb=/Task\s+#(\d+)/,Nb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,qb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function jb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Fb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Bb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Mb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Ub(e){if(e.tool==="Bash"){let t=e.command||"";return Nb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":qb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Wb(e){let t=e.filter(o=>o.kind==="tool").slice(-Db),n=new Map;t.forEach((o,s)=>{let i=Ub(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function zb(e){let t=Fb(e);if(t)return{text:t,guess:!1};let n=Bb(e);if(n)return{text:n,guess:!1};let r=Wb(e);return r?{text:r,guess:!0}:null}function Hb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:fn(e,t)}function vo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,p={},h=!0,_=new Set,k=new Set,R=null,N=null,B=!1,le=!1,z=!1,q=null,O=null;function M(){B=!1,le=!1,z=!1,q=null,O=null}async function W(Z){if(n){le=!0,z=!1,Le();try{let Y=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Z,...u?{root_dir:u}:{}}));if(s!==Z)return;!Y||typeof Y!="object"||Array.isArray(Y)?z=!0:(q=Y,O=Z)}catch{s===Z&&(z=!0)}finally{s===Z&&(le=!1,Le())}}}function K(){if(B=!B,B&&s&&O!==s){W(s);return}Le()}function H(){if(!B)return"";let Z=yo({loading:le,error:z});if(Z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Z}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Y=Mi(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Y?c`<div class="prompt-block__meta">${Y} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function P(){if(!a||!r)return[];let Z=r.get(a);return Rl(Z?Z.lines:[])}function G(){if(!a||!r)return null;let Z=r.get(a),Y=Z?Z.last_event_at:null;return typeof Y=="number"?Y:null}function V(){return p.status==="running"}function J(){if(V()&&s){N||(N=setInterval(()=>Le(),1e3));return}ge()}function ge(){N&&(clearInterval(N),N=null)}function Oe(Z){let Y=[],$e=0;for(;$e<Z.length;){let{idx:ft,line:lt}=Z[$e];if(lt.kind==="tool"){let He=$e;for(;He<Z.length&&Z[He].line.kind==="tool"&&Z[He].line.tool===lt.tool;)He+=1;if(He-$e>=Pb&&!k.has(ft)){Y.push({kind:"group",idx:ft,tool:lt.tool||"",lines:Z.slice($e,He)}),$e=He;continue}}Y.push({kind:"line",idx:ft,line:lt}),$e+=1}return Y}function F(Z){let Y=[],$e=new Map;for(let He=0;He<Z.length;He+=1){let $=Z[He],Q=$.parent_tool_use_id;if(typeof Q=="string"&&Q.length>0){let Re=$e.get(Q);Re||(Re={kind:"subagent",idx:He,launch_id:Q,agent_type:null,header:null,lines:[]},$e.set(Q,Re),Y.push(Re)),Re.lines.push({idx:He,line:$});continue}if($.kind==="tool"&&$.tool==="Agent"&&typeof $.launch_id=="string"&&$.launch_id.length>0){let Re=ee($),Pe=$e.get($.launch_id);if(Pe){Pe.header={idx:He,line:$},Pe.agent_type=Re;continue}let Ve={kind:"subagent",idx:He,launch_id:$.launch_id,agent_type:Re,header:{idx:He,line:$},lines:[]};$e.set($.launch_id,Ve),Y.push(Ve);continue}Y.push({kind:"entry",idx:He,line:$})}let ft=[],lt=0;for(;lt<Y.length;){if(Y[lt].kind!=="entry"){ft.push(Y[lt]),lt+=1;continue}let He=lt;for(;He<Y.length&&Y[He].kind==="entry";)He+=1;ft.push(...Oe(Y.slice(lt,He))),lt=He}return ft}function ee(Z){let Y=Z.input;return Y&&typeof Y.subagent_type=="string"?Y.subagent_type:null}function Se(Z){for(let Y=Z.length-1;Y>=0;Y-=1){let $e=Z[Y];if($e.kind==="result"||$e.kind==="error")return null;if($e.kind==="tool"&&!Object.hasOwn($e,"result"))return $e}return null}function Te(Z){for(let Y=Z.length-1;Y>=0;Y-=1)if(Z[Y].kind==="thinking")return Z[Y];return null}function C(Z,Y){if(Y.kind==="gate")return c`<div class="sv__gate">${Y.text}</div>`;if(Y.kind==="phase")return c`<div class="sv__phase">${Y.text}</div>`;if(Y.kind==="result")return c`<div
        class="sv__result${Y.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Y.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${gr(Y.text||(Y.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Y.kind==="thinking"){let $e=_.has(Z);return c`<div
        class="sv__think${$e?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>at(Z)}
      >
        <span class="sv__think-line">💭 ${ps(Y.text)}</span>
        ${$e?c`<pre class="sv__think-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="user"){let $e=_.has(Z);return c`<div
        class="sv__line sv__line--user${$e?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>at(Z)}
      >
        <span class="sv__user-line">▷ ${ps(Y.text)}</span>
        ${$e?c`<pre class="sv__user-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="error")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="blocker")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="tool"){let $e=_.has(Z),ft=Y.tool==="Bash"?jb(Y.command):0,lt=Y.tool==="Bash"?ft>1?ps(Y.command):Y.command:Y.path||Y.command||"";return c`<div
        class="sv__tool${$e?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>at(Z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Y.icon}</span>
          <span class="sv__tool-name">${Y.tool}</span>
          ${lt?c`<span class="sv__tool-detail">${lt}</span>`:""}
          ${ft>1?c`<span class="sv__tool-more">⋯ ${ft}줄</span>`:""}
          ${typeof Y.added=="number"?c`<span class="sv__diff-add">+${Y.added}</span>`:""}
          ${typeof Y.removed=="number"?c`<span class="sv__diff-del">−${Y.removed}</span>`:""}
          ${Y.result?c`<span class="sv__tool-ok">→ ${Y.result}</span>`:""}
        </span>
        ${$e?c`<pre class="sv__tool-expand">${oe(Y)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${gr(Y.text||"")}</div>`}function oe(Z){let Y=[];if(Z.tool==="Bash"&&typeof Z.command=="string"&&Z.command.length>0)Y.push(Z.command);else if(Z.input!==void 0)try{Y.push(`input: ${JSON.stringify(Z.input,null,2)}`)}catch{}return typeof Z.output=="string"&&Z.output.length>0&&Y.push(`output:
${Z.output}`),Y.join(`

`)}function we(){if(!s)return c``;let Z=P(),Y=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),$e=p.session_id||"",ft=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,lt=V(),He=lt?Hb(G(),Date.now()):"",$=lt?Se(Z):null,Q=lt?Te(Z):null,Re=zb(Z);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${lt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${$e?c`<button
              type="button"
              class="sv__session"
              title=${$e}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${$e}`}
              @click=${()=>pe($e)}
            >
              ⧉ ${$e.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>pe(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Y?c`<span class="sv__meta">${Y}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${B?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${B?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${K}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${ft}
          @click=${D}
        >
          <span class="sv__follow-full">⇣ ${ft}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>qe()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":H()}
      <div class="sv__body">
        ${Z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:F(Z).map(Pe=>Pe.kind==="subagent"?Me(Pe):Pe.kind==="group"?ve(Pe):C(Pe.idx,Pe.line))}
      </div>
      ${$||Q?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$?c`<span class="sv__now-icon">${$.icon}</span>
                  <span class="sv__now-name">${$.tool}</span>
                  <span class="sv__now-detail"
                    >${$.tool==="Bash"?ps($.command):$.path||$.command||""}</span
                  >`:""}
            ${Q?c`<span class="sv__now-think"
                  >💭 ${ps(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(Z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(Z.idx)}
    >
      <span class="sv__group-icon">${Z.lines[0].line.icon}</span>
      <span class="sv__group-name">${Z.tool}</span>
      <span class="sv__group-count">${Z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Me(Z){let Y=k.has(Z.idx),$e=Z.header?Z.header.line:null,ft=$e?$e.is_error===!0?"\u2717":typeof $e.result=="string"?"\u2713":"\u27F3":"",lt=$e&&$e.command?$e.command:"";return c`<div class="sv__sub${Y?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(Z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Z.agent_type||"subagent"}</span>
        ${lt?c`<span class="sv__sub-detail">${lt}</span>`:""}
        <span class="sv__sub-count">${Z.lines.length}줄</span>
        ${ft?c`<span class="sv__sub-state">${ft}</span>`:""}
        ${Y?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Y?c`<div class="sv__sub-body">
            ${Oe(Z.lines).map(He=>He.kind==="group"?ve(He):C(He.idx,He.line))}
          </div>`:""}
    </div>`}function he(Z){k.add(Z),Le()}function Le(){dt(we(),e),J(),h&&Ge()}function Ge(){let Z=e.querySelector(".sv__body");Z&&(Z.scrollTop=Z.scrollHeight)}function at(Z){_.has(Z)?_.delete(Z):_.add(Z),Le()}function D(){h=!h,Le()}function pe(Z){_n(Z).then(Y=>{Y?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(Z){!s||!Z||(p={...p,...Z},Le())}function _e(Z){let Y=Z.target;if(!Y||!Y.classList||!Y.classList.contains("sv__body"))return;!(Y.scrollHeight-Y.scrollTop-Y.clientHeight<=4)&&h&&(h=!1,Le())}e.addEventListener("scroll",_e,!0);function Ce(Z){let Y=Z.target;!Y||typeof Y.closest!="function"||e.contains(Y)||Y.closest("dialog")||Y.closest(".md-viewer-root")||qe()}let me=!1;function De(){me||(document.addEventListener("mousedown",Ce),me=!0)}function Ue(){me&&(document.removeEventListener("mousedown",Ce),me=!1)}function Xe(Z){let Y=Z&&Z.attempt_id;if(!Y)return;let $e=typeof Z.launch_id=="string"&&Z.launch_id.length>0?Z.launch_id:null,ft=Z.session_ref&&typeof Z.session_ref=="object"?Z.session_ref:null;if($e&&ft)return;let lt=a;s=Y,i=$e,l=ft,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&lt&&lt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:lt})).catch(()=>{}),u=typeof Z.root_dir=="string"&&Z.root_dir.length>0?Z.root_dir:null,p=Z.meta||{},d=Z.hide_prompt===!0,h=!0,_.clear(),k.clear(),M(),!R&&r&&(R=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),Le()}function qe(){let Z=a;Ue(),s=null,i=null,l=null,a=null,u=null,d=!1,_.clear(),k.clear(),M(),ge(),n&&Z&&Promise.resolve(n("unsubscribe-session-log",{id:Z})).catch(()=>{}),dt(c``,e),o&&o()}return{open:Xe,updateMeta:re,close:qe,isOpen(){return s!==null},destroy(){ge(),Ue(),R&&(R(),R=null),e.removeEventListener("scroll",_e,!0),s=null,i=null,l=null,a=null,u=null,d=!1,dt(c``,e)}}}function Gb(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function vp(e,t){let n=Gb(e);return c`
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
  `}var Kb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Yb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Vb=/^\*\*결론\*\* — (.+)$/;function Ni(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Kb)return null;let n=Yb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Vb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var wp=20;function kp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Xb(e){return e.length>wp?`${e.slice(0,wp)}\u2026`:e}function Qb(e,t,n,r){let o=`${t.lane} ${Xb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${kp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${gr(t.body)}
        </div>`:""}
  </div>`}function Zb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${kp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${gr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function $p(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ni(typeof a.text=="string"?a.text:"");return u?Qb(a,u,t,o.has(a.id)):Zb(a)})}
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
  `}var{I:M0}=ic;var xp=e=>e.strings===void 0;var Jb={},Ap=(e,t=Jb)=>e._$AH=t;var hr=Ti(class extends bo{constructor(e){if(super(e),e.type!==rr.PROPERTY&&e.type!==rr.ATTRIBUTE&&e.type!==rr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!xp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Tn||t===jt)return t;let n=e.element,r=e.name;if(e.type===rr.PROPERTY){if(t===n[r])return Tn}else if(e.type===rr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Tn}else if(e.type===rr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Tn;return Ap(e),t}});var ey=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ol={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Sp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},ty={pin:"pin",global:"global",base:"base"};function ny(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ty[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function ry(e,t,n){switch(e){case"workflow_mode":return Lo;case"spec_review_model":case"impl_review_model":return Po;case"plan_review_model":return Hs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Gs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return lo;case"impl_dispatch":return hu;case"impl_runtime":return zs;case"impl_model":return co(n,t.impl_runtime);case"impl_effort":return uo(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return lo;case"orchestration_model":return Do(n,null);case"orchestration_effort":return uo(n,void 0,t.orchestration_model||En).filter(r=>r!==En);default:return[]}}function oy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${ny(e.source)}
    <span class="detail-effective__k"
      >${pr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Ks[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${pr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Ep(e,t){let n=Ia.flatMap(a=>a.keys),r=La(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Au(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${sy(s)}</span
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
          ${Ia.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Fs({key:u.key,choices:ry(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return oy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${hr(e.preset_id)}
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
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function sy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function iy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Tp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=iy(r.exec_receipt),u=a?Xn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=qs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,_=typeof h=="number"?`PR #${h}`:"PR",k=No(n),R=k!==null&&t.isChipOpen?.("rec")===!0,N=R?Ha({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${R?"true":"false"}
            title=${Xs(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${N?io(N):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${ay(s).map(B=>ly(B,n,o,{label:B.id==="pr"?_:B.label,href:B.id==="pr"?i:""}))}
    </div>
  </section>`}function ay(e){let n=typeof e=="string"&&Object.hasOwn(Ol,e)&&Ol[e]||Ol.spec_backed;return ey.filter(r=>n.includes(r.id))}var qi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function ly(e,t,n,r){let o=cy(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?qi.stale:l?qi.on:a?qi.current:qi.none,h=uy(e,n),_=`${r.label} \xB7 ${p}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${R}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${R}</span
  >`}function cy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function uy(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Sp,n)?Sp[n]:""}function ji(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cp(e){return ji(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Rp(e,t){let n=e&&e[t];if(!ji(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Cp),o=Cp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Lp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Fi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Lp(e)}${t}`}function wo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Lp(e)}`}function dy(e,t,n){if(n!==null){let o=e==="claude"?Fi:wo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:wo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Op(e,t){if(!ji(e)||e.state!=="usable"||!ji(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ip(e){let t=e.provider_key==="claude"?Fi:wo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${dy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Pp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ip({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Rp(t,"claude"),selected:o,workspace_default:Op(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ip({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Rp(t,"codex"),selected:s,workspace_default:Op(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function py(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function fy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Bi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),_())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${py(o)}</span
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
                        >`}${gr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){dt(d(),e)}async function h(R,N={}){o=R,s="loading",i="",l=null,a="",p();let B=N.workspace||(n?n():"");if(!B){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let le="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(R);try{let z=await r(le),q=await z.json().catch(()=>({}));if(!z.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&N.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||z.status)+")",p();return}let O=fy(String(q.content||""));l=O.front,i=O.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,dt(c``,e)}function k(){document.removeEventListener("keydown",u),_()}return{open:h,close:_,destroy:k}}var _y=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Np="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ui=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],my=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Dp(e){return typeof e=="string"&&my.has(e)}var gy=["running","done","failed","interrupted"],hy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function by(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function yy(e){let t=sn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=oo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Np}
          >부분 집계</span
        >`:""}`}function Mp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Pl(e){if(typeof e=="number")return fs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?fs(t):""}function vy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function qp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Il(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ll(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function wy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ui.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Il(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Il(t.effort))||!(!("agent_type"in t)||Il(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!gy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ll(t.started_at)||!Ll(t.last_event_at)||!Ll(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function ky(e,t,n,r){let s=sn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=qp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${i.title}
      >${i.text}</span
    >
    ${Pl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Pl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function $y(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?sn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?fs(e.last_event_at):s?Pl(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,vy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=qp(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${hy[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function xy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Ay(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of s){let h=wy(p);!h||o.has(h.launch_id)||Dp(h.agent_type)||(o.add(h.launch_id),r.push(h))}r.sort((p,h)=>(p.started_at||0)-(h.started_at||0));let i={};for(let{role:p,provider:h}of Ui){let _=t?t.roles[p]?.[h]:null;i[p]=_?[..._.legs]:[]}let l=Ui.flatMap(({role:p})=>i[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:h}of Ui){for(let _ of r.filter(k=>k.role===p&&k.provider===h)){let k=l.find(N=>N.receipt_id===_.launch_id)||null;if(k&&!xy(_,k))continue;k&&a.add(k.receipt_id);let R=h==="codex"&&u.has(_.session_id);d.push($y(_,k,e.attempt_id,n,R)),h==="codex"&&u.add(_.session_id)}for(let _ of i[p])if(!a.has(_.receipt_id)&&!Dp(_.agent_type)){let k=typeof _.session_id=="string"&&_.session_id.length>0?_.session_id:null,R=h==="codex"&&k!==null&&u.has(k);d.push(ky(p,h,_,R)),h==="codex"&&k!==null&&u.add(k)}}return d}function Sy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[..._y,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${by(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Np}</span>`:""}
  </div>`}var Ey={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function fs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ty(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Cy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ry(e,t){let n=Cy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${$a(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Oo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${fs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function jp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(_=>_&&_.current===!0),...s.filter(_=>_&&_.current!==!0).sort((_,k)=>k.index-_.index)],l=i.map(_=>Ry(_,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&u.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let R=typeof _.session_id=="string"&&_.session_id.length>0,N=u.has(_.attempt_id),B=R&&!N,le=R?N?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!B}
      title=${le}
      @click=${z=>{z.stopPropagation(),B&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let R=_.cause_detail,N=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:_.cause;return c`<div class="detail-session__cause" title=${N}>
      ${_.cause}
    </div>`},h=_=>{let k=Mp(Ea(_));if(sn(k).length===0&&!oo(_.usage))return"";let R=a.has(_.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${N=>{N.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${yy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let k=Ea(_),R=Mp(k),N=sn(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ey[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${Ro(_)?c`<span
                  class="detail-session__resumed"
                  title=${Ro(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${xn(_)}</span>
            ${N.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?c`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${N.length>0?N.map(B=>c`<span
                      class="detail-session__usage"
                      title=${B.tooltip}
                      >${B.label}</span
                    >`):oo(_.usage)?c`<span class="detail-session__usage"
                    >${oo(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${fs(_.started_at)}</span>
          </button>
          ${h(_)} ${d(_)} ${p(_)} ${Ty(_)}
          ${a.has(_.attempt_id)&&_.usage?Sy(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${Ay(_,k,t)}
        </div>`})}
    </div>
  `}function Fp(e,t={}){return c`
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
          ${Oy(e)}
        </div>`:""}
  `}function Oy(e){let t=yo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?sr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Mi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var qr=10;function Bp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Up(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:qr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${Bp(l.at)?c`<span class="detail-timeline__at"
                  >${Bp(l.at)}</span
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
  `}var Iy=["open","in_progress","deferred","resolved","closed"],Ly=[0,1,2,3,4];function Wp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},h="",_=!1,k=[],R=!1,N=!1,B={},le={claude:null,codex:null},z=null,q=null,O=0,M=!1,W=!1,K="",H="",P="",G="",V=!1;function J(){M=!1,W=!1,K="",H="",P="",G="",V=!1}function ge(){le={claude:null,codex:null},z=null,q=null,O+=1}async function Oe(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function F(w){try{let I=await fetch(w);if(!I.ok)return null;let U=await I.json();if(!U||typeof U!="object"||!Array.isArray(U.accounts))return null;let ke=U.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:ke,active:ke.find(We=>We.active===!0)||null}}catch{return null}}async function ee(w){q=w;let I=++O,[U,ke,We]=await Promise.all([F("/api/claude-usage"),F("/api/codex-usage"),Oe()]);I!==O||w!==u||(le={claude:U,codex:ke},z=We,et())}let Se=[],Te=null,C=null,oe=!1,we="",ve=!1,Me=0,he=new Set;function Le(){Se=[],Te=null,C=null,oe=!1,we="",ve=!1,Me+=1,he.clear()}async function Ge(w){if(!o)return;let I=++Me;try{let U=await Promise.resolve(o("get-comments",{id:w}));if(I!==Me||w!==u)return;Se=Array.isArray(U)?U:[],oe=!1}catch{if(I!==Me||w!==u)return;oe=!0}et()}function at(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,C=w,Ge(u);return}w!==null&&w!==C&&(C=w,Ge(u))}function D(w){he.has(w)?he.delete(w):he.add(w),et()}function pe(w){let I=we.trim().length===0;we=w,I!==(w.trim().length===0)&&et()}async function re(){let w=we.trim();if(!o||!u||w.length===0||ve)return;let I=u;ve=!0,et();let U=!1;try{let ke=await Promise.resolve(o("add-comment",{id:I,text:w}));Array.isArray(ke)&&ke.length>0&&(U=!0,I===u&&(Se=ke,oe=!1,we="",C=ke.length))}catch{U=!1}U||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===u&&(ve=!1),et()}let _e={onToggle:D,onDraftInput:pe,onSubmit:re},Ce=t.mdViewer||null,me=null;Ce||(me=document.createElement("div"),me.className="md-viewer-root",document.body.appendChild(me));let De=Ce||Bi(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ue=document.createElement("div");Ue.className="session-log-root",document.body.appendChild(Ue);let Xe=vo(Ue,{transport:o?(w,I)=>Promise.resolve(o(w,I)):void 0,sessionLogStore:a}),qe=!1,Z=!1,Y=!1,$e=null,ft=null,lt=0;function He(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function $(){qe=!1,Z=!1,Y=!1,$e=null,ft=null,lt+=1}async function Q(w){if(!o)return;let I=++lt;Z=!0,Y=!1,et();try{let U=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(I!==lt)return;!U||typeof U!="object"||Array.isArray(U)?Y=!0:($e=U,ft=He(w))}catch{I===lt&&(Y=!0)}finally{I===lt&&(Z=!1,et())}}let Re=[],Pe=null,Ve=0;function rt(w,I){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${I}`}function Qe(){Re=[],Pe=null,Ve+=1}async function ct(w,I){if(!o)return;let U=++Ve,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{ke=null}U!==Ve||I!==Pe||(Re=ke&&Array.isArray(ke.sessions)?ke.sessions:[],et())}function Wt(){if(!o||!u)return;let w=d&&d.metadata,I=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(I===null){Qe();return}let U=rt(u,I);Pe!==U&&(Re=[],Pe=U,ct(u,U))}let yt=[],gt=[],vt=qr,Mt=null,$t=0;function ue(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ie(){yt=[],gt=[],vt=qr,Mt=null,$t+=1}async function S(w,I){if(!o)return;let U=++$t,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{ke=null}U!==$t||I!==Mt||(yt=ke&&Array.isArray(ke.events)?ke.events:[],gt=ke&&Array.isArray(ke.attempts)?ke.attempts:[],vt=qr,et())}function j(){if(!o||!u)return;let w=ue(u);Mt!==w&&(yt=[],gt=[],vt=qr,Mt=w,S(u,w))}function se(){vt+=qr,et()}function ae(){if(qe=!qe,qe&&u&&ft!==He(u)){$e=null,Q(u);return}et()}function ce(){let w={};for(let U of gt)U&&typeof U=="object"&&U.bead_id===u&&(w[String(U.attempt_id)]=U);let I=i?i.get():null;for(let U of I&&I.attempts?Object.values(I.attempts):[]){let ke=U;ke&&ke.bead_id===u&&(w[String(ke.attempt_id)]=ke)}return w}function je(){return u?Object.values(ce()).sort((I,U)=>(U.started_at||0)-(I.started_at||0)).map(I=>({attempt_id:I.attempt_id,bead_id:I.bead_id,status:I.status,started_at:typeof I.started_at=="number"?I.started_at:null,runner:I.runner||null,model:I.model||null,effort:I.effort||I.observed_effort||null,speed:I.speed||null,session_id:I.session_id||null,resumed_from:I.resumed_from||null,continuation_mode:I.continuation_mode||null,dismissed_at:typeof I.dismissed_at=="number"?I.dismissed_at:null,cause:typeof I.cause=="string"?I.cause:null,cause_detail:I.cause_detail||null,exec_default_preset_id:typeof I.exec_default_preset_id=="string"?I.exec_default_preset_id:null,exec_default_preset_revision:typeof I.exec_default_preset_revision=="number"?I.exec_default_preset_revision:null,exec_values:I.exec_values&&typeof I.exec_values=="object"?I.exec_values:null,usage:I.usage||null,usage_legs:Array.isArray(I.usage_legs)?I.usage_legs:[],delegation_sessions:Array.isArray(I.delegation_sessions)?I.delegation_sessions:[]})):[]}function Ze(){return u?Zn(ce(),u):null}let Je=new Set;function Be(w){Je.has(w)?Je.delete(w):Je.add(w),et()}function Tt(w){let I=i?i.get():null,U=I&&I.attempts?I.attempts[w]:null;Xe.open({attempt_id:w,meta:U?{runner:U.runner||void 0,model:U.model||void 0,effort:U.effort||void 0,status:U.status||void 0,session_id:U.session_id||void 0}:{}})}function Bt(w,I){let U=i?i.get():null,ke=U&&U.attempts?U.attempts[w]:null,nt=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(Pt=>Pt&&typeof Pt=="object"&&Pt.launch_id===I);nt&&Xe.open({attempt_id:w,launch_id:I,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function xt(w){if(!o||!w)return;let I=o,U=()=>{let We=i?i.get():null;return We&&typeof We.revision=="number"?We.revision:0},ke=i?.get()?.attempts?.[w]||null;await to({context:{bead_id:ke?.bead_id||u||"",kind:"session",tuple:ke?xn(ke):""},transport:We=>I("worker-attempt-resume",{attempt_id:w,expected_revision:U(),...We}),adopt:We=>{We?.queue&&i?.set&&i.set(We.queue)}})}async function Qt(w,I){if(!o||!w)return;let U=o,ke=()=>{let Ye=i?i.get():null;return{bead_id:w,...I==="parallel"?{}:{lane:I},expected_revision:Ye&&typeof Ye.revision=="number"?Ye.revision:0}},We=Ye=>{Ye?.queue&&i?.set&&i.set(Ye.queue)},nt=await Promise.resolve(U("worker-queue-place",ke()));if(We(nt),nt&&nt.conflict&&(nt=await Promise.resolve(U("worker-queue-place",ke())),We(nt)),et(),!nt)return;if(nt.applied===!1&&typeof nt.admission_reason=="string"){be(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${nt.admission_reason}`,"error",2400);return}if(nt.reason==="rejected"){be("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(nt.applied===!1)return;let Pt=nt.queue?Fo({id:w},nt.queue).location:null;Pt&&"index"in Pt&&be(`${Wu(Pt.lane)} \uB300\uAE30 #${Pt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function Ct(w,I){if(I){N=!0,et();return}Qt(w,"parallel")}function Rt(w,I){let We=(w.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(N=!1,et(),Qt(I,We)))}function Kt(w){!w||!u||Xe.open(no(w,u,d&&d.status))}let _t={onOpen:Tt,onOpenDelegation:Bt,onResume:xt,onToggleUsage:Be,onOpenSessionRef:Kt,onCopyResumeCommand:X};function zt(){let w=i?i.get():null,I={...B};for(let U of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=w&&w[U];typeof ke=="string"&&(I[U]=ke)}return I}async function Jt(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));B=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{B={}}et()}}function Nt(){let w=i?i.get():null;return w&&w.runner_catalog||null}function un(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function an(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},U=An({pin:{...w,...p},global:zt(),execution_defaults:un(),runner_catalog:Nt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Ln(Nt(),U)}function Ht(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function dn(w){return w?.compatible===!1}function en(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Ae(){let w=Ht(),I=w?.presets.find(U=>U.id===h);if(!(!o||!u||!w||!I||dn(I)||_)){_=!0,k=[],et();try{let U=await Promise.resolve(o("apply-impl-preset",Eu(u,I.id,w.revision)));if(U&&U.conflict){en(U),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=U&&Array.isArray(U.issue)?U.issue[0]:U?.issue;if(U&&U.applied&&ke&&typeof ke=="object"){d=ke,k=Array.isArray(U.skipped_orchestration_keys)?U.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of Tu)delete p[We];be(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}U&&U.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(U){U&&typeof U=="object"&&U.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,et()}}}let E=null;n&&n.subscribe&&(E=n.subscribe(()=>L()));let ye=null;i&&typeof i.subscribe=="function"&&(ye=i.subscribe(()=>{u&&et()}));let Ne=null,y=null;function v(){y&&(y(),y=null)}l&&typeof l.subscribe=="function"&&(Ne=l.subscribe(()=>{u&&et()}));function f(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",f);let m=so(()=>et());m.attach();function L(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(U=>U&&U.id===u)||w[0]||d}at(),Wt(),j(),et()}}function X(w){_n(w).then(I=>{I?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function te(w){w.preventDefault(),w.stopPropagation(),u&&X(u)}function fe(w,I){w.preventDefault(),w.stopPropagation(),X(I)}function ut(w,I,U){w.preventDefault(),w.stopPropagation(),De.open(I,{missing_state:U})}async function mt(w,I){let U=Object.hasOwn(p,w),ke=p[w];if(p[w]=I,et(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Su(u,w,I.length===0?null:I))),nt=Array.isArray(We)?We[0]:We;if(!nt||typeof nt!="object"||!nt.id)throw new Error("exec settings readback failed");d=nt,delete p[w],et()}catch(We){throw U?p[w]=ke:delete p[w],et(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function pt(w){w.catch(()=>{})}async function It(w,I){let U=d||{},ke=U.metadata&&typeof U.metadata=="object"?U.metadata:{},We={};for(let Ye of["impl_runtime","impl_model","impl_effort"])We[Ye]=Object.hasOwn(p,Ye)?p[Ye]:typeof ke[Ye]=="string"?ke[Ye]:"";We[w]=I;let nt=Ou(We,Nt(),an()),Pt={};for(let Ye of["impl_runtime","impl_model","impl_effort"])Pt[Ye]=p[Ye],p[Ye]=nt[Ye]||"";if(et(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...nt,orchestration_runtime:an()})).then(Ye=>{let kt=Array.isArray(Ye)?Ye[0]:Ye;if(!kt||typeof kt!="object"||!kt.id)throw new Error("implementation target readback failed");d=kt;for(let $n of["impl_runtime","impl_model","impl_effort"])delete p[$n];et()}).catch(Ye=>{for(let kt of["impl_runtime","impl_model","impl_effort"])Pt[kt]===void 0?delete p[kt]:p[kt]=Pt[kt];throw et(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ye})}async function A(w,I,U){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(w,I)),We=Array.isArray(ke)?ke[0]:ke;return We&&typeof We=="object"&&We.id?(d=We,!0):(be(U,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(U,"error"),!1)}}function x(w){setTimeout(()=>{try{let I=e.querySelector(w);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function xe(){M=!0,K=d&&d.title||"",et(),x('.detail-edit__input[data-edit="title"]')}function Fe(w){K=w.target.value}function ot(){M=!1,K="",et()}function ht(){A("edit-text",{id:u,field:"title",value:K},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I===!0&&(M=!1,K=""),et()})}function Ut(){W=!0,H=d&&d.description||"",et(),x('.detail-edit__textarea[data-edit="description"]')}function Br(w){H=w.target.value}function yn(){W=!1,H="",et()}function ir(){A("edit-text",{id:u,field:"description",value:H},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I===!0&&(W=!1,H=""),et()})}function kr(w,I,U,ke){if(w.key==="Escape"){w.stopPropagation(),U();return}w.key==="Enter"&&(!ke||w.ctrlKey||w.metaKey)&&(w.preventDefault(),I())}function ea(w){let I=w.target.value;A("update-status",{id:u,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>et())}function ta(w){let I=Number(w.target.value);A("update-priority",{id:u,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>et())}function na(w){P=w.target.value}function bs(){let w=P.trim();w.length!==0&&A("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I===!0&&(P=""),et()})}function ys(w){if(w.key==="Escape"){w.stopPropagation(),P="",et();return}w.key==="Enter"&&(w.preventDefault(),bs())}function ra(w){A("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>et())}let oa={onCopyPath:fe,onOpenDoc:ut};function Ur(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Wr(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function b(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function g(w,I){let U=T(I),ke=[];return w.length>0&&ke.push(w),U&&ke.push(U),ke.length>0?ke.join(`
`):void 0}function T(w){if(!w||typeof w!="object")return;let I=typeof w.status=="string"?w.status:"",U=typeof w.title=="string"?w.title:"";return I.length>0&&U.length>0?`${I} \xB7 ${U}`:void 0}function ne(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function de(){return t.depCandidates?t.depCandidates():null}async function Ie(w,I,U){let ke=ne(),We=u;if(!We)return;if(ke.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await A(w,{a:We,b:I,view_id:We,root_dir:ke},U),Pt=nt===!0||nt!==!1&&nt.saved===!0;Pt&&t.onDepChanged&&t.onDepChanged({type:w,a:We,b:I}),w==="dep-add"&&Pt&&(G="",V=!1),et()}function ze(w){if(!u)return;let I=globalThis.confirm;typeof I=="function"&&!I(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ie("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function wt(w){w.disabled||Ie("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Gt(w){G=w.target.value,V=!0,et()}function st(){V||(V=!0,et())}function tn(w,I){if(w.key==="Escape"){w.stopPropagation(),G="",V=!1,et();return}w.key==="Enter"&&(w.preventDefault(),I.length===1&&!I[0].disabled&&wt(I[0]))}function on(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${G}
        @focus=${st}
        @input=${Gt}
        @keydown=${I=>tn(I,w)}
      />
      ${V||G.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(I=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${I.bead_id}
                      ?disabled=${I.disabled}
                      title=${cn(I.reason)}
                      @click=${()=>wt(I)}
                    >
                      <span class="detail-dep-add__repo"
                        >${I.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${I.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${I.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Fn(w,I){let U=I.get(w.id),ke=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${cn(w.title)}
          @click=${()=>U===void 0?s(w.id):s(w.id,U)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${cn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${ke}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>ze(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function pn(w){let I=Array.isArray(w.dependencies)?w.dependencies:[],U=Array.isArray(w.dependents)?w.dependents:[],ke=[];for(let Ye of I){let kt=Ur(Ye);kt.length>0&&Wr(Ye)==="blocks"&&ke.push({id:kt,label:`\u26D3 ${kt}`,kind:"pred",title:g("\uB9C9\uB294",Ye)})}for(let Ye of U){let kt=Ur(Ye);kt.length>0&&Wr(Ye)==="blocks"&&ke.push({id:kt,label:`\u2192 ${kt}`,kind:"succ",title:g("\uB9C9\uD788\uB294",Ye)})}for(let Ye of I){let kt=Ur(Ye),$n=Wr(Ye);if(kt.length>0&&$n!=="blocks"){let Ee=b($n);ke.push({id:kt,label:`${Ee.glyph}${kt}`,kind:"other",title:g(Ee.relation,Ye)})}}let We=de(),nt=new Map;if(We)for(let Ye of We.issues)nt.has(Ye.bead_id)||nt.set(Ye.bead_id,Ye.root_dir);let Pt=We&&u?Nd(Md(u,We),G):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(Ye=>Fn(Ye,nt))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:on(Pt)}
    `}function ln(w){let I=w.metadata||{},U=w.workflow||{},ke=U.stages||{},We=ke.spec&&ke.spec.stale,nt=ke.impl&&ke.impl.stale,Pt=U.quick_fix_review?.state==="stale",Ye=ke.plan||null,kt=U.route_source==="derived",$n=U.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${kt?" detail-kv__v--derived":""}"
          title=${kt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${kt?"unset":$n}</span
        >
      </div>
      ${U.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${U.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${U.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${U.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${U.resolver.attempt} \xB7 ${U.resolver.prior_sha} \u2192 ${U.resolver.sha}`}
              >${`${U.resolver.prior_sha.slice(0,7)} \u2192 ${U.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${U.route==="quick_fix"||Object.hasOwn(I,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${I.quick_fix_review||"\uC5C6\uC74C"}${Pt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${U.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${U.planned_execution.kind}</span>
            </div>
            ${U.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${U.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${U.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xn(U.exec_receipt)}</span
            >
          </div>`:""}
      ${U.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${U.impl_entry.actor}@${U.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Rn={route:["quick_fix","spec_backed","full_plan"]};async function Gn(w,I){let U=I.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&U!=="full_plan"&&!window.confirm(`full_plan \u2192 ${U||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){et();return}await A("update-workflow-meta",{id:u,key:w,value:U},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),et()}function nn(w){let I=w.metadata||{};return c` ${((ke,We)=>{let nt=Rn[ke],Pt=typeof I[ke]=="string"?I[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${Ye=>Gn(ke,Ye)}
        >
          <option value="" ?selected=${!nt.includes(Pt)}>
            ${We}
          </option>
          ${nt.map(Ye=>c`<option value=${Ye} ?selected=${Pt===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Kn(w,I){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${K}
            @input=${Fe}
            @keydown=${U=>kr(U,ht,ot,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ht}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ot}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${sn(I).map(U=>c`<span class="detail-usage-total" title=${U.tooltip}
              >${U.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${xe}
        >
          ✎
        </button>
      </div>
    `}function ar(w){let I=Zt(w.created_at),U=Zt(w.updated_at);return!I&&!U?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${U?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${U}</span>
          </div>`:""}
    `}function On(w,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ea}
        >
          ${Iy.map(U=>c`<option value=${U} ?selected=${U===w}>${U}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ta}
        >
          ${Ly.map(U=>c`<option value=${String(U)} ?selected=${U===I}>
                P${U}
              </option>`)}
        </select>
      </div>
    `}function Bn(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ut}
            >
              ✎
            </button>`}
      </div>
      ${W?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${H}
              @input=${Br}
              @keydown=${I=>kr(I,ir,yn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ir}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${yn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ke(w){let I=typeof w.notes=="string"?w.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function qt(w){let I=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(U=>c`<span class="detail-label-chip"
              >${U}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${U}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+U}
                @click=${()=>ra(U)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${P}
            @input=${na}
            @keydown=${ys}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${bs}
          >
            추가
          </button>
        </span>
      </div>
    `}function kn(){if(!u)return c``;let w=d||{},I=String(w.id||u),U=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Ze(),We=w.status||"open",nt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",Pt=w.description||"",Ye=i?i.get():null,kt=Ye&&We!=="closed"?Fo({...w,id:I},Ye):null,$n=Ye?Bo(Ye):null,Ee={...w,metadata:{...w.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${te}
            >
              ${I}
            </button>
            ${kt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${I}
                  ?disabled=${!kt.placeable}
                  title=${ei(kt)}
                  @click=${()=>Ct(I,$n)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${kt&&N&&$n?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${it=>Rt(it,I)}
              >
                ${za($n,I)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${I}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{N=!1,et()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Kn(U,ke)}
          ${Tp(Ee,{onChipToggle:it=>m.toggle({bead_id:I,chip_key:it}),isChipOpen:it=>m.isOpen({bead_id:I,chip_key:it})})}
          ${Ep({metadata:Ee.metadata,workspace_values:zt(),catalog:Nt(),execution_defaults:un(),expanded:R,presets:Ht()?.presets||[],preset_id:h,preset_busy:_,skipped_orchestration_keys:k},{onToggle:it=>{R=it,et()},onEdit:(it,Yt)=>{if(it==="impl_runtime"||it==="impl_model"||it==="impl_effort"){pt(It(it,Yt??""));return}pt(mt(it,Yt??""))},onPresetSelect:it=>{h=it,k=[],et()},onPresetApply:()=>{Ae()}})}
          ${Pp({md:Ee.metadata,catalog:le,workspace_defaults:z,handlers:{onExecChange:(it,Yt)=>pt(mt(it,Yt))}})}
          ${On(We,nt)} ${ar(w)}
          ${Bn(Pt)}
          ${$p(Se,_e,{expanded:he,draft:we,sending:ve,error:oe})}
          ${Ke(w)} ${qt(w)} ${pn(w)}
          ${ln(w)} ${nn(w)}
          ${vp(w,oa)}
          ${Fp({expanded:qe,loading:Z,error:Y,data:$e},{onToggle:ae})}
          ${jp(je(),_t,{total:ke,expanded:Je},Re)}
          ${Up({events:yt,shown:vt},{onMore:se})}
        </div>
      </div>
    `}function et(){dt(kn(),e)}return{load(w){w!==u&&(p={},N=!1,h="",k=[],R=!1,J(),Le(),$(),Qe(),ie(),ge()),u=w,d=null,!y&&t.subscribeCandidates&&(y=t.subscribeCandidates(()=>{u&&et()})),L(),Jt(),q!==w&&ee(w)},clear(){u=null,d=null,p={},N=!1,h="",_=!1,k=[],R=!1,J(),Le(),$(),Qe(),ie(),ge(),v(),De.close(),Xe.close(),dt(c``,e)},destroy(){E&&(E(),E=null),ye&&(ye(),ye=null),Ne&&(Ne(),Ne=null),v(),document.removeEventListener("keydown",f),m.detach(),Ce||(De.destroy(),me&&me.parentNode&&me.parentNode.removeChild(me)),Xe.destroy(),Ue.parentNode&&Ue.parentNode.removeChild(Ue),u=null,d=null,ge(),h="",_=!1,k=[],Le(),$(),Qe(),ie(),dt(c``,e)}}}function zp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof p=="string"?p.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Py="(max-width: 640px)";function Wi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Py),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Dy(){return{lanes:{done:!0},areas:{}}}function _s(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function My(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:_s(r.lanes),areas:_s(r.areas)}:{lanes:_s(r),areas:{}}}catch{return null}}function Hp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function zi(e,t=Dy()){let n={lanes:_s(t.lanes),areas:_s(t.areas)},r=My(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Hp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Hp(e,o),i}}}function Dl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Hi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Gi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:h}=e,_=[],k=null,R=!1,N=null,B=null,le=null;function z(){N!==null&&clearTimeout(N),N=setTimeout(()=>{N=null,R=!1},0)}function q(){return s()??null}function O(){let D=new Map,pe=o();for(let re of Array.isArray(pe)?pe:[]){if(!re||typeof re!="object")continue;let _e=re.bead_blocked_by&&typeof re.bead_blocked_by=="object"?re.bead_blocked_by:{};for(let[Ce,me]of Object.entries(_e))Array.isArray(me)&&D.set(Ce,Hi(me));for(let Ce of[...Array.isArray(re.runnable)?re.runnable:[],...Array.isArray(re.session_active)?re.session_active:[]])Ce&&typeof Ce.bead_id=="string"&&Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&D.set(Ce.bead_id,Hi(Ce.blocked_by))}return D}function M(){let D=new Map,pe=new Map,re=o();for(let _e of Array.isArray(re)?re:[]){if(!_e||typeof _e!="object")continue;let Ce=_e.bead_blocked_by&&typeof _e.bead_blocked_by=="object"?_e.bead_blocked_by:{};for(let[me,De]of Object.entries(Ce))Array.isArray(De)&&D.set(me,Hi(De));for(let me of Array.isArray(_e.runnable)?_e.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&pe.set(me.bead_id,Hi(me.blocked_by))}for(let _e of _)for(let Ce of[D,pe]){let me=Ce.get(_e.a);me!==void 0&&Ce.set(_e.a,_e.type==="dep-remove"?me.filter(De=>De!==_e.b):me.includes(_e.b)?me:[...me,_e.b])}return{snapshot:D,runnable:pe}}function W(){let D=O();for(let pe of _){let re=(D.get(pe.a)||[]).slice();pe.type==="dep-remove"?D.set(pe.a,re.filter(_e=>_e!==pe.b)):re.includes(pe.b)||D.set(pe.a,[...re,pe.b])}return D}function K(D=r(),pe=q()){let re=new Map;for(let qe of Array.isArray(pe?.lanes)?pe.lanes:[]){let Z=new Map;for(let Y of Array.isArray(qe?.entries)?qe.entries:[])Y&&typeof Y.bead_id=="string"&&Z.set(Y.bead_id,Y.dep_created_by_lane===!0);re.set(typeof qe?.id=="string"?qe.id:"",Z)}let _e=new Map,Ce=new Map,me=new Set,De=new Set;for(let qe of D.chain_lanes){let Z=re.get(qe.lane_id);_e.set(qe.lane_id,{status:qe.status,entries:qe.rows.map((Y,$e)=>({bead_id:Y.id,root_dir:Y.root_dir,...$e===0?{}:{dep_created_by_lane:Z?.get(Y.id)===!0}}))});for(let Y of qe.rows)Ce.set(Y.id,qe.lane_id),Y.fixed&&me.add(Y.id),Y.unplaced||De.add(Y.id)}let Ue=new Map;for(let qe of D.parallel_rows)typeof qe.queue_index=="number"&&Ue.set(qe.id,qe.queue_index);for(let qe of D.queue_groups)for(let Z of qe.sublanes.serial)for(let Y of Z.items)typeof Y.queue_index=="number"&&Ue.set(Y.id,Y.queue_index);let Xe=M();return{blocked_by_map:W(),snapshot_blocked_by:Xe.snapshot,runnable_blocked_by:Xe.runnable,owner_of:new Map(Object.entries(D.owner_of)),cross_lanes:_e,owner_lane_of:Ce,fixed_members:me,placed_members:De,parallel_rows:D.parallel_rows.map(qe=>({bead_id:qe.id,root_dir:qe.root_dir,queue_index:qe.queue_index??0})),parallel_raw_length:new Map(Object.entries(D.parallel_raw_length)),queue_index_of:Ue}}function H(D,pe){let re=r();for(let Ce of[...re.runnable,...re.queue,...re.running,...re.pr_wait,...re.done])if(!(Ce.non_occupying||Ce.id!==pe)){if(Ce.root_dir===D)return Ce.expected_revision;break}let _e=re.queue_groups.find(Ce=>Ce.root_dir===D);return _e?_e.revision:0}async function P(D,pe,re,_e){if(!t)return null;let me=await t(D,{...pe,...re?{root_dir:re}:{},expected_revision:_e});if(me&&me.conflict){me.queue&&d?.(re,me.queue);let De=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:_e;me=await t(D,{...pe,...re?{root_dir:re}:{},expected_revision:De})}return me&&me.queue&&d?.(re,me.queue),me}async function G(D,pe,re,_e,Ce){try{let me=await P(D,pe,re,_e.get(re)??H(re,Ce.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&_e.set(re,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:_e.get(re)??0)}catch(me){return a(Dl(me),"error"),null}}async function V(D,pe,re=new Map){if(D.type==="worker-queue-disarm"){try{let _e=await P(D.type,D.payload,D.root_dir,re.get(D.root_dir)??H(D.root_dir,pe));_e&&_e.queue&&typeof _e.queue.revision=="number"&&re.set(D.root_dir,_e.queue.revision)}catch{}return!0}if(D.type==="worker-queue-place"||D.type==="worker-queue-reorder"||D.type==="worker-queue-remove")return await G(D.type,D.payload,D.root_dir,re,{bead_id:pe})!==null;try{return(D.type==="dep-add"||D.type==="dep-remove")&&t&&await t(D.type,{a:D.a,b:D.b,...D.root_dir?{root_dir:D.root_dir}:{}}),!0}catch(_e){return a(Dl(_e),"error"),!1}}function J(D){(D.type==="dep-add"||D.type==="dep-remove")&&(_=[..._,{type:D.type,a:D.a,b:D.b}])}async function ge(D,pe){if(!t)return{ok:!1};try{let re=await t(D.type,{...D.payload,expected_revision:pe});return!re||typeof re.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:re.revision}}catch(re){let _e=re,Ce=_e&&_e.code==="conflict"?_e.details?.cross_lanes:null;return Ce&&typeof Ce.revision=="number"&&Array.isArray(Ce.lanes)?{ok:!1,conflict:Ce}:(a(Dl(re),"error"),{ok:!1})}}async function Oe(D,pe,re){let _e=new Map,Ce=[],me=D.ops.slice(0,D.lane_op_index),De=D.ops.slice(D.lane_op_index);for(let Xe of me){if(!await V(Xe,re,_e))return{done:!0};J(Xe)}let Ue=pe;for(let Xe of D.lane_ops){if(Ue===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let qe=await ge(Xe,Ue);if(!qe.ok)return qe.conflict?{done:!1,conflict:qe.conflict}:{done:!0};Ue=qe.revision}for(let Xe of De){if(!await V(Xe,re,_e))return{done:!0};J(Xe),Xe.type==="dep-add"&&Ce.push(Xe)}for(let Xe of Pd(Ce))Ue=await F(Xe,Ue);return{done:!0}}async function F(D,pe){if(pe===null||!t)return pe;let re=D.pairs,_e=pe;for(let Ce=0;Ce<2;Ce+=1){if(re.length===0)return _e;try{let me=await t("monitor-lane-provenance",{lane_id:D.lane_id,pairs:re.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:_e});return me&&typeof me.revision=="number"?me.revision:_e}catch(me){let De=me,Ue=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!Ue||typeof Ue.revision!="number"||!Array.isArray(Ue.lanes))return _e;let Xe=Ue.lanes.find(qe=>qe&&qe.id===D.lane_id);re=Dd(Array.isArray(Xe?.entries)?Xe.entries:[],re),_e=Ue.revision}}return _e}async function ee(D,pe,re=[]){_=re,l("",0);let _e=r(),Ce=q();for(let me=0;;me+=1){let De=D(K(_e,Ce));if("refused"in De){a(De.refused,"error");break}let Ue=await Oe(De,_e.cross_lanes_revision,pe);if(Ue.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Xe=i(Ue.conflict);_e=Xe.lanes,Ce=Xe.raw_lanes}_=[],u()}async function Se(D,pe){await ee(re=>xi(D,pe,re),D.bead_id)}function Te(D,pe){let re=pe&&typeof pe.closest=="function"?pe.closest("[data-row-index]"):null;if(re&&D.contains(re)){let _e=Number(re.getAttribute("data-row-index"));return Number.isFinite(_e)?_e:0}return D.querySelectorAll("[data-row-index]").length}function C(D){let pe=typeof D?.closest=="function"?D.closest(".worker-pane--collapsed[data-lane]"):null;if(!pe)return null;let re=pe.getAttribute("data-lane");return re==="queue"?{zone:pe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:re==="candidate"&&h===!0?{zone:pe,target:{kind:"candidate"}}:null}function oe(D){let pe=D.target;if(!k)return null;let re=typeof pe?.closest=="function"?pe.closest("[data-drop]"):null;if(!re)return C(pe);let _e=re.getAttribute("data-drop");if(_e==="candidate")return{zone:re,target:{kind:"candidate"}};if(_e==="parallel")return{zone:re,target:{kind:"parallel",marker_index:Te(re,pe)}};if(_e==="chain")return{zone:re,target:{kind:"chain",lane_id:re.getAttribute("data-lane-id")||"",marker_index:Te(re,pe)}};if(_e==="repo-serial"){let Ce=re.getAttribute("data-root-dir")||"";if(Ce!==k.root_dir)return null;let me=typeof pe?.closest=="function"?pe.closest("[data-queue-index]"):null,De=me&&re.contains(me)?me.getAttribute("data-queue-index"):re.getAttribute("data-lane-length"),Ue=Number(De);return{zone:re,target:{kind:"repo-serial",root_dir:Ce,lane_id:re.getAttribute("data-lane-id")||"",index:Number.isFinite(Ue)?Ue:0}}}return null}function we(){for(let D of Array.from(n.querySelectorAll(".is-drop-over")))D.classList.remove("is-drop-over")}function ve(D){B=D.target instanceof Element?D.target:null}function Me(D){let pe=D.target,re=typeof pe?.closest=="function"?pe.closest('[draggable="true"][data-bead-id]'):null,_e=re?re.closest("[data-drag-kind]"):null;if(!_e)return;if(re&&B&&re.contains(B)&&typeof B.closest=="function"&&B.closest("input, button, a")){D.preventDefault();return}let Ce=_e.getAttribute("data-bead-id")||"",me=_e.getAttribute("data-drag-kind")||"",De=_e.getAttribute("data-root-dir")||"";if(!Ce||!me)return;let Ue=_e.getAttribute("data-queue-index")||"",Xe=Number(Ue),qe=_e.getAttribute("data-lane-id")||"";k={kind:me,bead_id:Ce,root_dir:De,...Ue!==""&&Number.isFinite(Xe)?{queue_index:Xe}:{},...qe?{lane_id:qe}:{}},R=!0,p?.(),n.classList.add("is-dragging");try{D.dataTransfer?.setData("text/plain",Ce),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}function he(D){let pe=oe(D);pe&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),pe.zone.classList.add("is-drop-over"))}function Le(D){let pe=D.target;typeof pe?.closest=="function"&&(pe.closest("[data-drop]")?.classList.remove("is-drop-over"),pe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ge(){k=null,we(),n.classList.remove("is-dragging"),z()}function at(D){let pe=oe(D),re=k;k=null,we(),n.classList.remove("is-dragging"),!(!pe||!re)&&(D.preventDefault(),Se(re,pe.target))}return{attach(D){le||(le=D,D.addEventListener("pointerdown",ve),D.addEventListener("dragstart",Me),D.addEventListener("dragover",he),D.addEventListener("dragleave",Le),D.addEventListener("drop",at),D.addEventListener("dragend",Ge))},detach(){N!==null&&(clearTimeout(N),N=null);let D=le;le=null,D&&(D.removeEventListener("pointerdown",ve),D.removeEventListener("dragstart",Me),D.removeEventListener("dragover",he),D.removeEventListener("dragleave",Le),D.removeEventListener("drop",at),D.removeEventListener("dragend",Ge))},isDragging(){return k!==null},consumeClickSuppression(){let D=R;return R=!1,D},applyDrop:Se,runPlanned:ee,dropModel:K,sendOp:V,sendQueueCas:G,rememberDep:J}}var Ml=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Gp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},Kp={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Yp={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Ny(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function qy(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,s=Ny(o);return s?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${s}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(Kp,n))return Kp[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Yi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ki(e){for(let t of Yi(e)){if(Object.hasOwn(Gp,t))return Gp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Xp(e){return Yi(e).length===0?null:Ki(e)||"\uC2E4\uD328"}function jr(e){let t=null;for(let n of Yi(e))Object.hasOwn(Ml,n)&&(t=Ml[n]);return t}function br(e,t){if(typeof e=="string"&&Object.hasOwn(Yp,e))return Yp[e];let n=qy(e,t);if(n!==null)return n;let r=Ki(e),o=jr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function Qp(e,t){let n=Ki(e)??Ki(t),r=jr(t)??jr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var jy=new Set(["repo_operation_timeout_unresolved"]);function Fy(e){for(let t of Yi(e))if(jy.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function By(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Zp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Fy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(By(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Pr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Vp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Jp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Vp,t.blocked_reason)?Vp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=br(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=br(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Uy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var ef=200;function Wy(e){return typeof e!="string"||e.length===0?"":e.length>ef?`${e.slice(0,ef)}\u2026`:e}function zy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Nl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Hy(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Nl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Nl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function nf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${tf(s.at)?c`<span class="rtile__history-at"
                    >${tf(s.at)}</span
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
            ${Ir(n)}
          </p>`:""}`}function tf(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Gy(e,t){if(!e||e.open!==!0)return"";let n=jr(e.cause)||br(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${fn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=nf(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${p?c`<div>
            <dt>이력</dt>
            <dd>${p}</dd>
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
  </div>`}function Ky(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Yy(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function Vy(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(s=>typeof s=="string"&&s.length>0).join(" \xB7 "),n=Nl(e.resets_at),r=Ky(e.auto_resume),o=Yy(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${o?c`<div>
            <dt>계정 전환</dt>
            <dd>${o}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Ir(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function Xy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Qy=new Set(["codex-runner"]);function Zy(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&Qy.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),u=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?fn(r.last_event_at,t):"",p=r?fn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${fn(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
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
      </div>`:""}`}var Jy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function ev(e){if(!e)return"";let t=Jy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function tv(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=Wy(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=nf(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function ql(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ce=>Ce&&Ce.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,p=e.provider_hold===!0&&!i&&!a&&!u&&!d,h=a&&e.failure||null,_=d&&e.wait||null,k=p&&e.hold||null,R=a||u||d||p,N=!!e.paused,B=i||R?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):N?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Uy(t-e.started_at):"\u2014",le=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=Ro(e),q=sn(e.usage),O=Qn(e.usage),M=e.conflict_resolution?N?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,W=e.base_exception||null,K=e.landing,H=e.attempt_id&&e.attempt_id===n,P=r.monitor||null,G=Xy(P),V=li(P?.cross_lane_chip),J=P?ai(P.dependency_chips):"",ge=Zy(P,t,N,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),Oe=o&&e.workflow?.chips?.exec_receipt||null,F=ci(e.workflow),ee=ui(e.rec,e.chip_popover?.chip_key==="rec"),Se=e.chip_popover?io(e.chip_popover.content):"",Te=Oe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(Oe)}`}
        >${`${Oe.kind}:${Ns(Oe)}`}</span
      >`:"",C=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Oo(s)}</span
      >`:"",oe=G||V||F||C||Te||ee?c`<div class="rtile__meta">
          ${G}${V}${F}${C}${Te}${ee}${Se}
        </div>`:"",we=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Xp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ve=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${zy(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:p&&k?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${k.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Hy(k)}
            </button>`:"",Me=c`${M?c`<span class="worker-mini__badge">${M}</span>`:""}${W?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${W}</span
      >`:""}${we}${ve}`,he=o?"":_o(e),Le=Vs(l?.quickfix_landing),Ge=Le==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",at=Le==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",D=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",pe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",re=pe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",_e=re?c`${pe}${re}`:pe;return c`<div
    class="rtile${H?" rtile--sel":""}${N?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${R?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${di(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${Me}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${B}</span>`:""}${ev(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${B}</span>`}
        ${o||R?"":i?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Le}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Ge} \uBD88\uAC00`:at}
                  aria-label=${Ge}
                >
                  ↻ ${Ge}
                </button>
                ${_e}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${N?c`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${_e}`}${D}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${R?tv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?h:d?_:k,_e,d?J:""):i?"":c`${ge}${e.rollup?Ds(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:va}):""}
            ${K?c`<div class="rtile__landing">
                  <span
                    class="merge-step${K.failed?" merge-step--failed":""}"
                    style=${`--progress: ${K.percent}%`}
                    >${K.label}${K.index>0?c`<span class="merge-step__n"
                          >${K.index}/${K.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${J}
            ${o?oe:G||V||F||le||ee||q.length>0||O?c`<div class="rtile__meta">
                    ${G}${V}${F}${ii(e.exec_chips)}${ee}
                    ${q.length>0?q.map(Ce=>c`<span
                              class="worker-usage"
                              title=${Ce.tooltip}
                              >${Ce.label}</span
                            >`):O?c`<span
                            class="worker-usage"
                            title=${Io(e.usage)}
                            >${O}</span
                          >`:""}${Se}
                  </div>`:""}
            ${ti(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||N?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Gy(l,t)}${Vy(k)}
  </div>`}function nv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function rf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ql(o,t,n,{monitor:nv(o)}))}
  </div>`}var rn="",rv=["impl_runtime","impl_model","impl_effort"],ov=["claude_account","codex_account"],sv=5,Vi=1;function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(S=>be(S,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},h={},_={},k=Promise.resolve(),R={claude:null,codex:null},N=!1,B=null,le={},z="",q="",O=!1,M=!1,W=!1,K=null,H=!1;function P(){let S=t.queue?t.queue():null;return wn(S)?S:null}function G(){let S=P();return S?S.runner_catalog:null}function V(){let S=P();return S&&wn(S.execution_defaults)?S.execution_defaults:null}function J(){let S=t.implPresetStore?.get();return wn(S)&&Array.isArray(S.presets)?S:null}function ge(){return r===null?{}:{root_dir:r}}async function Oe(S,j){return H||!n?null:await n(S,j)}function F(S){S&&wn(S.queue)&&t.onQueueAdopt?.(S.queue)}async function ee(S,j){let se=P();if(!se||H)return null;let ae=await Oe(S,{...j,...ge(),expected_revision:se.revision});if(F(ae),r!==null&&ae&&ae.conflict){let ce=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:P()?.revision??se.revision;ae=await Oe(S,{...j,...ge(),expected_revision:ce}),F(ae)}return ae}async function Se(){d=!0,ie();try{let S=await Oe("get-session-defaults",{...ge()});s=wn(S?.values)?{...S.values}:{},i={...s},l={},a={},u=Array.isArray(S?.warnings)?S.warnings:[]}catch(S){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}finally{d=!1,ie()}}async function Te(){let S=$u(s,i);if(Object.keys(S).length!==0){try{let j=await Oe("set-session-defaults",{values:S,...ge()});s=wn(j?.values)?{...j.values}:{},i={...s},u=Array.isArray(j?.warnings)?j.warnings:[]}catch(j){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}function C(S,j){if(!wn(S))return;let se=S.state;p={state:se==="usable"||se==="unusable"||se==="absent"?se:"absent",values:wn(S.values)?{...S.values}:{},warnings:Array.isArray(S.warnings)?S.warnings:[]},_={...p.values},j&&(h={..._})}async function oe(){try{C(await Oe("get-workspace-accounts",{...ge()}),!0)}catch(S){p={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},h={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${S instanceof Error?S.message:String(S)}`)}ie()}async function we(S){try{let j=await fetch(S);if(!j.ok)return null;let se=await j.json();if(!wn(se)||!Array.isArray(se.accounts))return null;let ae=se.accounts.filter(ce=>wn(ce)&&typeof ce.key=="string"&&ce.key.length>0&&typeof ce.email=="string"&&ce.email.length>0);return{accounts:ae,active:ae.find(ce=>ce.active===!0)||null}}catch{return null}}async function ve(){N=!0;let[S,j]=await Promise.all([we("/api/claude-usage"),we("/api/codex-usage")]);H||(R={claude:S,codex:j},ie())}function Me(){let S={};for(let j of ov){let se=Object.hasOwn(h,j)?h[j]:null,ae=Object.hasOwn(_,j)?_[j]:null;se!==ae&&(S[j]=se)}return S}async function he(){let S=Me();if(Object.keys(S).length!==0){try{C(await Oe("set-workspace-accounts",{values:S,...ge()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}function Le(S,j){j===rn?delete h[S]:h[S]=j,ie(),k=k.then(()=>he())}function Ge(S,j){if(rv.includes(S)){_e(S,j);return}j===rn?delete i[S]:i[S]=j,ie(),Te()}function at(S,j){l[S]=j,delete a[S]}function D(S,j,se){if(l[S]=j,j.length>0&&!se(j)){a[S]=!0,ie();return}delete l[S],delete a[S],j.length===0?delete i[S]:i[S]=j,ie(),Te()}function pe(){let S=$t().orchestration_model,j=An({global:{orchestration_model:S??void 0},execution_defaults:V(),runner_catalog:G()}).orchestration_model.value;return j?Ln(G(),j):null}function re(S,j){typeof j=="string"&&j.length>0?i[S]=j:delete i[S]}function _e(S,j){let se=j===rn?void 0:j,ae=wu({impl_runtime:S==="impl_runtime"?se:i.impl_runtime,impl_model:S==="impl_model"?se:i.impl_model,impl_effort:S==="impl_effort"?se:i.impl_effort},G(),pe());re("impl_runtime",ae.impl_runtime),re("impl_model",ae.impl_model),re("impl_effort",ae.impl_effort),ie(),Te()}async function Ce(){let S=P();if(!S)return;let j={orchestration_model:S.orchestration_model??null,orchestration_effort:S.orchestration_effort??null,orchestration_speed:S.orchestration_speed??null},se=xu(j,{...j,...le});if(Object.keys(se).length!==0){try{let ae=await ee("worker-queue-set-orchestration-defaults",{values:se});if(ae&&ae.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}le={}}catch(ae){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}ie()}}function me(S,j){le[S]=j===rn?null:j,ie(),Ce()}function De(S){if(B=S,!S){ie();return}let j=G(),se=$t(),ae=se.orchestration_model;ae&&!Do(j,S).includes(ae)&&(le.orchestration_model=null,ae=null);let ce=se.orchestration_effort;ce&&!Ra(j,S,ae||En).includes(ce)&&(le.orchestration_effort=null),ie(),Ce()}async function Ue(S){if(!(!P()||S<Vi)){try{await ee("worker-queue-set-slots",{slots:S})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}async function Xe(S){if(!(!P()||S<Vi||S>sv)){try{await ee("worker-queue-set-serial-lane-count",{count:S})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}async function qe(S,j){let se=S==="auto_advance"?"worker-automation-toggle":S==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await ee(se,{on:j})}catch(ae){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}ie()}function Z(){let S={},j=$t();for(let se of ao){let ae=er.includes(se)?j[se]:i[se];typeof ae=="string"&&ae.length>0&&(S[se]=ae)}return S}async function Y(){let S=J();if(!S)return;let j=Z();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let se=(S.presets||[]).find(ce=>ce.id===z),ae=q.trim()||(se?se.name:"");if(!ae){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ce=se?await Oe("impl-preset-update",{expected_revision:S.revision,id:se.id,name:ae,settings:j}):await Oe("impl-preset-create",{expected_revision:S.revision,name:ae,settings:j});if(ce&&ce.applied){if(q="",!se&&Array.isArray(ce.presets)){let je=ce.presets.find(Ze=>Ze.name===ae);z=je?je.id:z}ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie()}catch(ce){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}}async function $e(){let S=J();if(!(!S||z.length===0))try{let j=await Oe("impl-preset-delete",{expected_revision:S.revision,id:z});j&&j.applied?(z="",ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function ft(S){s=wn(S.values)?{...S.values}:{},i={...s},u=Array.isArray(S.warnings)?S.warnings:[],wn(S.queue)&&(t.onQueueAdopt?.(S.queue),le={})}async function lt(){let S=J(),j=P();if(!S||!j||z.length===0)return;let se=ae=>({preset_id:z,expected_revision:S.revision,expected_queue_revision:ae,...ge()});try{let ae=await Oe("apply-impl-preset-global",se(j.revision));if(ae&&ae.applied&&ft(ae),r!==null&&ae&&ae.queue_applied===!1){let ce=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:P()?.revision??j.revision;ae=await Oe("apply-impl-preset-global",se(ce)),ae&&ae.applied&&ft(ae)}ae&&ae.applied?ae.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ae&&ae.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ae){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}ie()}async function He(){M=!0,W=!1,ie();try{let S=await Oe("get-worker-system-prompt",{});!S||typeof S!="object"||Array.isArray(S)?W=!0:K=S}catch{W=!0}finally{M=!1,ie()}}function $(){if(O=!O,O&&!K){He();return}ie()}function Q(){let S=yo({loading:M,error:W});if(S)return S;if(!K)return"";let j=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(se=>c`<div class="settings-dialog__sp-variant" data-variant=${se.key}>
            <div class="settings-dialog__sp-cond">${se.condition}</div>
            ${sr(se.label,se.system_prompt)}
          </div>`)}
    </div>`}function Re(){return c`<section
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
        aria-expanded=${O?"true":"false"}
        @click=${$}
      >
        ${O?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${O?Q():""}
    </section>`}function Pe(S,j,se,ae,ce,je,Ze){let Je=ce[S]??rn,Be=Oa(S,se,ce,V(),G(),Ze),Tt=Be.options.find(xt=>xt.value===Je),Bt=Je===rn?Be.full_value:Tt?.full_value;return c`<select
        class=${Je===rn?"settings-dialog__unset":""}
        data-key=${S}
        aria-label=${j}
        title=${Bt||""}
        ?disabled=${je===!0||Be.disabled}
        .value=${hr(String(Je))}
        @change=${xt=>ae(S,String(xt.target.value))}
      >
        <option value=${rn} ?selected=${Je===rn}>
          ${Be.unset_label}
        </option>
        ${Be.options.map(xt=>c`<option
              value=${xt.value}
              title=${xt.full_value||""}
              ?selected=${xt.value===Je}
            >
              ${xt.label}
            </option>`)}
      </select>
      ${Je===rn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ve(S,j,se,ae,ce,je=!1,Ze){return c`<div
      class=${`settings-dialog__row${je?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${Pe(S,j,se,ae,ce,je,Ze)}
      </span>
    </div>`}function rt(S,j,se,ae,ce,je){let Ze=Object.hasOwn(a,S),Je=l[S]??i[S]??rn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Ze?" settings-dialog__text--invalid":""}`}
          data-key=${S}
          aria-label=${j}
          aria-invalid=${String(Ze)}
          placeholder=${se}
          .value=${hr(Je)}
          @input=${Be=>at(S,String(Be.target.value))}
          @change=${Be=>D(S,String(Be.target.value).trim(),je)}
        />
        ${Je.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${S}
          >${Ze?ce:ae}</span
        >
      </span>
    </div>`}function Qe(S,j){let se=j?j.active:null;return wn(se)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${S==="claude"?se.email:wo({...se,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ct(S,j,se){let ae=R[se],ce=Object.hasOwn(h,S)?h[S]:rn,je=se==="claude"?Fi:wo,Ze=!!ae?.accounts.some(Je=>Je.key===ce);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${S}
          @change=${Je=>Le(S,String(Je.target.value))}
        >
          <option value=${rn} ?selected=${ce.length===0}>
            ${Qe(se,ae)}
          </option>
          ${ce.length>0&&!Ze?c`<option value=${ce} selected>
                ${ce} (목록에 없음)
              </option>`:""}
          ${ae?.accounts.map(Je=>c`<option value=${Je.key} ?selected=${Je.key===ce}>
                ${je(Je)}
              </option>`)||""}
        </select>
        ${ae?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Wt(){let S=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${S} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${S}`:null}function yt(S,j,se,ae,ce,je){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${S}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(se,`${S} \uBAA8\uB378`,ae,Ge,i,!1)}
        ${Pe(ce,`${S} effort`,Gs,Ge,i,!1)}
        ${Pe(je,`${S} \uC18D\uB3C4`,bu,Ge,i,!1)}
      </span>
    </div>`}function gt(S,j,se,ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ae?" is-on":""}`}
          data-automation=${S}
          aria-pressed=${ae?"true":"false"}
          aria-label=${j}
          @click=${()=>qe(S,!ae)}
        >
          ${ae?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${se}</span>
      </span>
    </div>`}function vt(S,j,se,ae){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${S}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>ae(se-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${se}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>ae(se+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(S){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${S.rows.length>0?`\uBCC0\uACBD ${S.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${S.rows.map(j=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${j.kind}
          >
            <span class="settings-dialog__preset-diff-label">${j.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${j.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${j.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${S.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${S.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function $t(){let S=P(),j={};for(let se of er)j[se]=Object.prototype.hasOwnProperty.call(le,se)?le[se]:S&&typeof S[se]=="string"?S[se]:null;return j}function ue(){let S=G(),j=i.impl_runtime,se=i.impl_model,ae=J(),ce=P(),je=$t(),Ze=Do(S,B),Je=co(S,void 0).filter(_t=>_t!==En),Be=Ra(S,B,je.orchestration_model||En).filter(_t=>_t!==En),Tt=z?(ae?.presets||[]).find(_t=>_t.id===z):null,Bt=Tt?ku(Z(),wn(Tt.settings)?Tt.settings:{}):null,xt=ce&&typeof ce.slots=="number"?ce.slots:Vi+1,Qt=ce&&typeof ce.serial_lane_count=="number"?ce.serial_lane_count:Vi,Ct=V()?.supported===!0,Rt=Wt(),Kt=Oa("workflow_mode",Lo,i,V(),S);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Rt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Rt}
          </div>`:""}
      ${Ct?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${hr(z)}
                @change=${_t=>{z=String(_t.target.value),ie()}}
              >
                <option value="" ?selected=${z===""}>
                  실행 프리셋…
                </option>
                ${(ae?.presets||[]).map(_t=>c`<option
                      value=${_t.id}
                      ?selected=${_t.id===z}
                    >
                      ${_t.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Bt||Bt.rows.length===0}
                @click=${lt}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${hr(q)}
                @input=${_t=>{q=String(_t.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Y}
              >
                ${z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${z.length===0}
                @click=${$e}
              >
                삭제
              </button>
            </div>
            ${Bt?Mt(Bt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${hr(B||rn)}
                    @change=${_t=>{let zt=String(_t.target.value);De(zt===rn?null:zt)}}
                  >
                    <option value=${rn} ?selected=${!B}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${B==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${B==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ve("orchestration_model","\uBAA8\uB378",Ze,me,je)}
              ${Ve("orchestration_effort","effort",Be,me,je)}
              ${Ve("orchestration_speed","\uC18D\uB3C4",lo,me,je)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ct("claude_account","Claude","claude")}
              ${ct("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${ce?.provider_auto_switch!==!1}
                      @change=${_t=>qe("provider_auto_switch",_t.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${rn}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Ge("workflow_mode",rn)}
                    >
                      ${Kt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Lo.map(_t=>c`<button
                          type="button"
                          data-mode=${_t}
                          aria-pressed=${String(i.workflow_mode===_t)}
                          @click=${()=>Ge("workflow_mode",_t)}
                        >
                          ${_t}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${rt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",gu)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${yt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Po,"spec_review_effort","spec_review_speed")}
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Hs,"plan_review_effort","plan_review_speed")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Po,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ve("impl_runtime","\uC704\uC784 \uB300\uC0C1",zs,Ge,i)}
              ${Ve("impl_model","\uBAA8\uB378",co(S,j),Ge,i)}
              ${Ve("impl_effort","effort",uo(S,j,se),Ge,i)}
              ${Ve("impl_speed","\uC18D\uB3C4",lo,Ge,i)}
              ${Ve("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Je,Ge,i,!1,{...i,...je})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${gt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ce?.auto_advance===!0)}
              ${gt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ce?.auto_merge===!0)}
              ${vt("slots","\uB3D9\uC2DC \uC2E4\uD589",xt,_t=>Ue(_t))}
              ${vt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Qt,_t=>Xe(_t))}
            </div>
            ${Re()}
          `}
    `}function ie(){H||dt(ue(),e)}return{load(){le={},l={},a={};let S=[Se(),oe()];return N||S.push(ve()),Promise.all(S).then(()=>{})},render:ie,sessionDraft:()=>({...i}),destroy(){H=!0,dt(c``,e)}}}function Qi(e){return c`<svg
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
  </svg>`}function of(){return Qi(Eo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function sf(){return Qi(Eo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function af(){return Qi(Eo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function lf(){return Qi(Eo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function cf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function uf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return sn(Us(t));let n={};for(let l of zn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of zn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Qn(n):null}function jn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function jl(e,t){let n=jn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function iv(e,t){if(!jn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function av(e){if(!jn(e)||!jn(e.execution_defaults)||!jn(e.runner_catalog)||!jn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=An({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Ln(e.runner_catalog,n.orchestration_model.value??""),o=po(n,e.runner_catalog),s=Or(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function df(e,t){let n=t.notify||(C=>be(C,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,p=null,h=new Map;function _(){let C=t.workspacesState?t.workspacesState():[];return Array.isArray(C)?C.filter(oe=>jn(oe)):[]}function k(C){return _().find(oe=>oe.root_dir===C)||null}function R(C){return iv(k(C),h.get(C))}function N(){for(let C of _()){let oe=h.get(C.root_dir);oe&&typeof oe.revision=="number"&&typeof C.revision=="number"&&C.revision>=oe.revision&&h.delete(C.root_dir)}}async function B(C,oe,we){let ve=t.transport,Me=R(oe);if(!(!ve||!jn(Me))){try{let he=await ve(C,{...we,root_dir:oe,expected_revision:Me.revision});if(jn(he?.queue)&&h.set(oe,he.queue),he&&he.conflict){let Le=jn(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:R(oe)?.revision;he=await ve(C,{...we,root_dir:oe,expected_revision:Le}),jn(he?.queue)&&h.set(oe,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}ee()}}function le(C){u!==C&&(u=C,t.onFocusChange?.(u),ee())}function z(C){le(u===C?null:C)}function q(C){if(d===C){M();return}O(),d=C;let oe=k(C);i.textContent=`${oe?.name||C} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=Xi(a,{root_dir:C,queue:()=>R(C),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:we=>{h.set(C,we),ee()}}),p.load(),ee()}function O(){p?.destroy(),p=null}function M(C){O(),d=null,o.hidden=!0,i.textContent="",C!==!0&&ee()}let W=()=>M();l.addEventListener("click",W);function K(C){C.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",K);function H(C,oe){let we=Math.max(oe,C,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${C}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:we},(ve,Me)=>Me<C?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function P(C){let oe=C.auto_advance===!0,we=C.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?sf():of()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${we?" is-on":""}`}
        data-act="merge"
        aria-pressed=${we?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${we?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${af()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===C.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===C.root_dir?"true":"false"}
        aria-label=${`${C.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${lf()}
      </button>`}function G(C){let oe=av(C);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function V(C){let oe=[];for(let[we,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Me=jl(C,we);Me>0&&oe.push(`${ve} ${Me}`)}return oe.join(" \xB7 ")}function J(C){let oe=jl(C,"running"),we=typeof C.slots=="number"?C.slots:1;return c`<div
      class=${`mon2-deck__tile${u===C.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${C.root_dir}
      aria-pressed=${u===C.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${C.root_dir}>${C.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${we}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${we}</span>
          ${H(oe,we)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${C.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${P(C)}</div>
        <span class="mon2-deck__counts">${V(C)}</span>
        ${G(C)}
      </div>
    </div>`}function ge(C){let oe=t.doneItems?t.doneItems():[],we=t.rangeLabel?t.rangeLabel():"",ve=uf(Array.isArray(oe)?oe:[]),Me=he=>C.reduce((Le,Ge)=>Le+jl(Ge,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${C.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${we}`}
        >실행 ${Me("running")} · 대기 ${Me("queue")} · PR
        ${Me("pr_wait")}${Me("session_active")>0?` \xB7 \uC138\uC158 ${Me("session_active")}`:""}
        · ${we} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${cf(we)}
                  >${ve}</span
                >`:ve.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function Oe(){let C=_();return C.length===0?"":c`${ge(C)}
      <div class="mon2-deck__strip">
        ${C.map(oe=>J(oe))}
      </div>`}function F(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function ee(){N(),F(),d!==null&&!k(d)&&M(!0),dt(Oe(),r),p?.render()}function Se(C){let oe=C.target;if(!oe||typeof oe.closest!="function")return;let we=oe.closest("[data-root-dir]");if(!we)return;let ve=we.getAttribute("data-root-dir")||"",Me=oe.closest("[data-act]")?.getAttribute("data-act");if(Me==="worker"){t.gotoWorkerTab?.(ve);return}if(Me==="auto"){B("worker-automation-toggle",ve,{on:R(ve)?.auto_advance!==!0});return}if(Me==="merge"){B("worker-merge-auto-toggle",ve,{on:R(ve)?.auto_merge!==!0});return}if(Me==="gear"){q(ve);return}z(ve)}function Te(C){if(C.key!=="Enter"&&C.key!==" ")return;let oe=C.target;if(!oe||typeof oe.closest!="function")return;let we=oe.closest('[data-root-dir][role="button"]');!we||we!==oe||(C.preventDefault(),z(we.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Se),r.addEventListener("keydown",Te),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",Se),r.removeEventListener("keydown",Te),l.removeEventListener("click",W),O(),dt(c``,r),e.replaceChildren()}}}var lv=1e4,mf="bdui.monitor.done-range",gf="bdui.monitor.running_sort",hf="bdui.monitor.candidate_sort",bf="beads-ui.monitor.candidate-filter",yf="beads-ui.monitor.sections";function cv(){try{let e=window.localStorage.getItem(bf);if(!e)return{...go};let t=JSON.parse(e);return!t||typeof t!="object"?{...go}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:go.show_blocked,spec:Za.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...go}}}function pf(e){try{window.localStorage.setItem(bf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function uv(){try{let e=window.localStorage.getItem(hf);return Yo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function dv(e){try{window.localStorage.setItem(hf,e)}catch{}}function pv(){try{let e=window.localStorage.getItem(yf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function fv(e){try{window.localStorage.setItem(yf,JSON.stringify(e))}catch{}}function _v(){try{let e=window.localStorage.getItem(mf);return e===null?"today":Un(e)}catch{return"today"}}function mv(e){try{window.localStorage.setItem(mf,e)}catch{}}function gv(){try{return window.localStorage.getItem(gf)==="repo"?"repo":"started"}catch{return"started"}}function hv(e){try{window.localStorage.setItem(gf,e)}catch{}}var vf="tab:monitor:pipeline",bv=1e3,ff=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],yv=["queue","runnable","done"],_f="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function vv(e){return e>=1&&e<=_f.length?_f[e-1]:`(${e})`}function wf(e,t){let n=Dt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),h=_v(),_=gv(),k=cv(),R=uv(),N=pv(),B=zi("beads-ui.monitor.lane-collapsed"),le=!1,z=null,q=null,O=null,M=null,W=so(()=>ce()),K=null,H=null,P=null,G=null;function V(y){return G===null&&(G=D()),Ad(y,G)}function J(y,v){ge(),!(v<=0)&&(H={lane_id:y,corrected:v},P=setTimeout(()=>{P=null,H=null,ce()},lv))}function ge(){P!==null&&(clearTimeout(P),P=null),H=null}function Oe(){let y=Hr.find(v=>v.value===h);return y?y.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let ee=document.createElement("div");ee.className="worker-drawer-overlay",ee.hidden=!0;let Se=document.createElement("div");Se.className="worker-drawer-overlay__backdrop";let Te=document.createElement("div");Te.className="worker-drawer-host mon2-drawer",ee.append(Se,Te),e.appendChild(ee);let C=mr(null,null),oe=new Map,we=new Map,ve=null,Me=null,he=null,Le=vo(Te,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,ee.hidden=!0,ce()}}),Ge=Gi({transport:s,console_el:F,getLanes:()=>C,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Ct,reproject:y=>({lanes:ae(y),raw_lanes:y}),onCorrection:J,showToast:be,requestRender:()=>ce(),adoptQueue:(y,v)=>{we.set(y,v)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:at,dropModel:D,runPlanned:pe,sendQueueCas:re}=Ge;async function _e(y,v,f,m,L=!0){if(!s||!f)return null;let X=await s(y,{...v,root_dir:f,expected_revision:m});if(X&&X.conflict&&L){X.queue&&we.set(f,X.queue);let te=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:m;X=await s(y,{...v,root_dir:f,expected_revision:te})}return X&&X.queue&&f&&we.set(f,X.queue),X}function Ce(y,v){let f=we.get(y),m=o&&o.get?o.get():null,L=(Array.isArray(m)?m:[]).find(te=>te?.root_dir===y);return(f||L)?.merge_queue?.find(te=>te.bead_id===v)?.continuation_action}async function me(y,v,f,m){let L=await _e(y,v,f,m),X=we.get(f)?.revision??L?.queue?.revision??m;return dr(L,(te,fe)=>_e(y,{...v,continuation:te,decision_token:fe},f,X,!1),{refresh:te=>_e(y,v,f,te?.queue?.revision??we.get(f)?.revision??X,!1)})}async function De(y,v,f,m){let L=await dr({continuation_mismatch:m},(te,fe)=>_e("worker-merge-queue-add",{bead_id:v,continuation:te,decision_token:fe},y,f,!1)),X=L?.queue?.merge_queue?.find(te=>te.bead_id===v)?.continuation_action;L?.applied!==!0&&X?.continuation===null&&X.mismatch&&await De(y,v,L.queue.revision,X.mismatch)}async function Ue(y,v,f){let m=await _e("worker-discard",y,v,f);if(m&&m.discarded===!0){be(si(m),"success",5e3);return}if(m&&m.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${m.reason}`,"error");return}if(m&&m.accepted&&m.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(m&&m.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${m.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}m&&!m.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Xe(y,v,f,m){let L=await _e("worker-discard-abandon",y,v,f);if(L&&L.abandoned===!0){be(oi(m),"success",5e3);return}if(L&&L.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${L.reason}`,"error");return}L&&!L.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function qe(y,v,f){return!s||!f?null:await s(y,{...v,root_dir:f})}async function Z(){let y=new Map;for(let v of C.pr_wait)y.has(v.root_dir)||y.set(v.root_dir,v.expected_revision);for(let[v,f]of y)await _e("worker-merge-queue-add-all",{},v,f)}function Y(y){let v=N[y];return!!(v&&v.runnable===!0)}function $e(y){let v={...N[y]||{}};v.runnable=!v.runnable,N={...N,[y]:v},fv(N),ce()}function ft(y){B.toggle(y),ce()}function lt(y){B.toggleArea(y),ce()}function He(y){let v=y.dependency_chips||null,f=y.overlap_chips||[],m=y.scope_state==="missing",L=y.armed_lane_chip;return!v&&f.length===0&&!m&&!L?null:{...v||{},...f.length>0?{overlaps:f}:{},...m?{scope_missing:!0}:{},...L?{armed_lane:L}:{}}}function $(y){return pi(y,v=>W.isOpen({bead_id:y.id,chip_key:v}))}function Q(y){let v=He(y),f=$(y);return v||f?{...y,...v?{dependency_chips:v}:{},...f?{chip_popover:f}:{}}:y}function Re(y){let v=Y(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${v?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${v?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${y.root_dir}>${y.name}</span>
      <span class="mon2-sec__count">${y.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Pe(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${v}
    </div>`}function Ve(y){if(O!==y.id)return null;let v=C.queue_groups.find(X=>X.root_dir===y.root_dir),f=y.place_lanes||[],m=C.cross_lanes_revision!==null,L=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let X of C.chain_lanes)L.push({id:`lane:${X.lane_id}`,label:`\uC5F0\uACB0 ${X.number} (${X.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:X.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!m});L.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!m,title:m?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let X of f)L.push({id:`serial:${X.id}`,label:`\uC9C1\uB82C ${Number(X.id.slice(1))}`,count:X.length,group:`${v?v.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:L}}function rt(y){return Pe(y,c`${Ga(Q(y),Ve(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(v,f)=>l(f,y.root_dir):void 0})}`)}function Qe(){return C.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${C.runnable.map(y=>rt(y))}
      </div>`:c`${C.runnable_sections.map(y=>{let v=Y(y.root_dir);return c`<section
        class="mon2-sec${v?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Re({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${v?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(f=>rt(f))}
            </div>`}
      </section>`})}`}function ct(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${v}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Pn(Q(y),{actions:mo(y,{nudgeable:!0})})}
    </div>`}function Wt(y,v,f,m){return c`<div
      class="mon2-crow${v.fixed?" mon2-crow--fixed":""}"
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${f}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${vv(v.seq)}</span
      >
      ${v.workspace_name?c`<span class="worker-mini__repo" title=${v.root_dir}
            >${v.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${v.id}</span>
      <span class="mon2-crow__title">${v.title}</span>
      ${v.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${m.includes(v.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${v.location_title}
        >${v.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${v.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function yt(y){let v=C.cross_lanes_revision!==null,f=V(y.lane_id),m=f?.held===!0,L=f?.cycle===!0,X=f?f.mismatched:[],te=H&&H.lane_id===y.lane_id?H.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${te>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${te}건 자동 교정</span
            >`:""}
        ${L?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${m?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${ki}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!v||!y.can_confirm||m}
              title=${m?ki:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!v}
          title=${y.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((fe,ut)=>Wt(y,fe,ut,X))}
      </div>
    </div>`}function gt(y,v,f){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.id}
      data-row-index=${f}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Pn(Q(v),{actions:mo(v)})}
    </div>`}function vt(y){if(y.length===0)return"";let v=y.length-1;return`${y[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function Mt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Pn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function $t(y,v){let f=v.occupants,m=v.cross_wait_peers||[];return{id:v.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${v.index+1}`,rows:[...f.map(L=>Mt(L)),...v.items.map((L,X)=>gt(v,L,X))],count:v.items.length,empty:v.empty===!0,...f.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${f.map(L=>`${L.id} \u2014 ${L.badge}`).join(`
`)}
              >${vt(f)}</span
            >`,held:!0}:{},cycle:v.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...m.length>0?{after:c`${m.map(L=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${L.workspace_name}·${L.lane}과 교차 대기
                </div>`)}`}:{}}}function ue(){let y=C.cross_lanes_revision!==null,v=C.chain_lanes.some(f=>f.draft&&f.rows.length===0);return _i({parallel:{rows:C.parallel_rows.map((f,m)=>ct(f,m)),count:C.parallel_rows.length,collapsed:B.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:C.queue_groups.flatMap(f=>f.sublanes.serial.map(m=>({...$t(f,m),drop:{drop:"repo-serial",root_dir:f.root_dir,lane_id:m.id,lane_length:String(m.raw_length)}}))),collapsed:B.isAreaCollapsed("serial"),extra_panes:C.chain_lanes.map(f=>yt(f)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!y}
          title=${y?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...C.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ie(y){return c`<div class="worker-rungrid">
      ${C.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(v=>ql({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at,session_refs:v.session_refs||[]}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",parked:v.run_state==="parked",retry_wait:v.run_state==="retry_wait",waiting:v.run_state==="waiting",wait:v.wait||null,retry:v.retry||null,status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":v.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":v.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":v.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,chip_popover:$(v),discard:v.discard,failure:v.failure?{...v.failure,open:M===v.attempt_id}:null},y,q,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,cross_lane_chip:v.cross_lane_chip||null,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:He(v)}}))}
    </div>`}function S(y){let v={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done},f=m=>{let L=v[m.lane],X=m.lane==="runnable"?C.runnable_flat?L.length>0?Qe():void 0:C.runnable_sections.length>0?Qe():void 0:m.lane==="queue"?C.queue_groups.length>0||C.chain_lanes.length>0||C.parallel_rows.length>0||C.cross_lanes_unreadable?ue():void 0:m.lane==="running"?ie(y):L.length>0?c`${L.map(te=>Pn(Q(te)))}`:void 0;return Hn({id:`monitor-${m.lane}`,lane:m.pane,title:m.title,items:L,count:L.length,src:m.lane==="runnable",empty:m.empty,body:X,live:m.lane==="running"&&L.length>0,collapsible:!0,collapsed:B.isCollapsed(m.pane),controls:m.lane==="runnable"?j():void 0,header_control:se(m.lane,L.length)})};if(le){let m=yv.map(L=>ff.find(X=>X.lane===L)).filter(L=>L!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${mi({live:C.running.length>0,running_body:C.running.length>0?ie(y):"",pr_wait_rows:C.pr_wait.map(L=>Pn(Q(L))),count:C.running.length+C.pr_wait.length})}
            ${m.map(L=>f(L))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${ff.map(m=>f(m))}
        </div>
      </div>`}function j(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Za.map(y=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${k.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${C.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function se(y,v){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Yo.map(f=>c`<option
              value=${f.value}
              ?selected=${R===f.value}
            >
              ${f.label}
            </option>`)}
      </select>`:y==="running"?c`<select
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
      </select>`:y==="pr_wait"&&v>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Hr.map(f=>c`<option value=${f.value} ?selected=${h===f.value}>
              ${f.label}
            </option>`)}
      </select>`:""}function ae(y){let v=o&&o.get?o.get():null,f=o&&o.getWorkspacesState?o.getWorkspacesState():[],m=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,L={done_since:Tr(h,d()),running_sort:_,candidate_filter:k,candidate_sort:R};return m!==void 0&&(L.cross_lanes=m),mr(v,f,L)}function ce(){let y=d();C=ae(),G=null,oe=new Map;for(let v of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])!v.non_occupying&&!oe.has(v.id)&&oe.set(v.id,v);dt(S(y),F),Ze()?.render(),je(),Je()}function je(){let y=new Map;for(let v of C.queue_groups)y.set(v.root_dir,v.auto_advance);for(let v of Array.from(F.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let f=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",m=y.get(f);typeof m=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${m?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(he)return he;let y=F.querySelector(".mon2-deck");return y?(he=df(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>C.done,rangeLabel:Oe,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Tt,onFocusChange:v=>{K=v,Je()}}),he):null}function Je(){F.classList.toggle("has-focus",K!==null);for(let y of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",K!==null&&y.getAttribute("data-root-dir")===K);for(let y of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=oe.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",K!==null&&!!v&&v.root_dir===K)}for(let y of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",K!==null&&y.getAttribute("data-root-dir")===K)}function Be(y,v){let f=i?i():void 0;if(!v||!f||v===f||!a){r(y);return}a(v).then(()=>{r(y)}).catch(m=>{n("workspace switch for %s failed: %o",v,m)})}function Tt(y){if(!y)return;let v=i?i():void 0,f=()=>{try{u?.gotoView("worker")}catch(m){n("gotoView(worker) failed: %o",m)}};if(!a||v&&v===y){f();return}a(y).then(f).catch(m=>{n("workspace switch for %s failed: %o",y,m),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Bt(y){_n(y).then(v=>{be(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function xt(y){let v=oe.get(y)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}async function Qt(y,v,f){if(y!=="dep-add")return;let m=C.chain_lanes.find(L=>L.rows.some(X=>X.id===v));!m||!m.rows.some(L=>L.id===f)||await pe(L=>Od(m.lane_id,L),"",[{type:y,a:v,b:f}])}function Ct(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Rt(y,v){if(y==="run"){await _t(v);return}if(y==="stop"){await zt(v);return}if(y==="create"){await pe(f=>rl(null,f),"");return}if(y==="remove"){let f=Ld(v,D());if(f!==null&&!p(f))return;await pe(m=>Id(v,m),"");return}await pe(f=>y==="confirm"?Cd(v,f):Rd(v,f),"")}function Kt(y){let v=new Map;for(let f of y.rows){let m=C.owner_of[f.id]||f.root_dir;typeof m!="string"||m.length===0||v.set(m,[...v.get(m)||[],f.id])}return v}async function _t(y){let v=C.chain_lanes.find(X=>X.lane_id===y);if(!v||C.cross_lanes_revision===null){ce();return}ge();let f=new Map,m=new Map,L=Kt(v);for(let X of v.rows){if(!X.unplaced)continue;let te=C.owner_of[X.id]||X.root_dir;if(typeof te!="string"||te.length===0){be(`${X.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),ce();return}let fe=m.get(te)??0;if(await re("worker-queue-place",{bead_id:X.id,lane:"parallel",index:(C.parallel_raw_length[te]??0)+fe},te,f,{bead_id:X.id})===null){ce();return}m.set(te,fe+1)}for(let[X,te]of L)if(await re("worker-queue-arm",{bead_ids:te,lane_id:y},X,f,{bead_id:te[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),ce();return}ce()}async function zt(y){let v=C.chain_lanes.find(m=>m.lane_id===y);if(!v||C.cross_lanes_revision===null){ce();return}ge();let f=new Map;for(let[m,L]of Kt(v))if(await re("worker-queue-disarm",{lane_id:y},m,f,{bead_id:L[0]})===null)break;ce()}async function Jt(y,v){let{root_dir:f,revision:m}=xt(y);if(f.length===0){ce();return}await re("worker-queue-disarm",{bead_ids:[y],lane_id:v},f,new Map([[f,m]]),{bead_id:y}),ce()}async function Nt(y,v){let f=oe.get(y);if(!f){ce();return}let m={kind:"candidate",bead_id:y,root_dir:f.root_dir};if(v==="new-lane"){await pe(L=>rl({bead_id:y,root_dir:f.root_dir},L),y);return}if(v.startsWith("lane:")){let L=v.slice(5);if(!C.chain_lanes.find(te=>te.lane_id===L)){ce();return}await pe(te=>xi(m,{kind:"chain",lane_id:L,marker_index:(te.cross_lanes.get(L)?.entries??[]).length},te),y);return}if(v.startsWith("serial:")){let L=v.slice(7),X=(f.place_lanes||[]).find(te=>te.id===L);await at(m,{kind:"repo-serial",root_dir:f.root_dir,lane_id:L,index:X?X.index:0});return}await at(m,{kind:"parallel",marker_index:C.parallel_rows.length})}async function un(y,v){let f=C.parallel_rows,m=f.findIndex(mt=>mt.id===y);if(m<0)return;let L=f[m].root_dir,X=[];f.forEach((mt,pt)=>{mt.root_dir===L&&X.push(pt)});let te=X.indexOf(m),fe=X[te+v];if(typeof fe!="number")return;let ut=v===-1?fe:X[te+2]??Math.min(f.length,fe+1);await at({kind:"parallel",bead_id:y,root_dir:L,queue_index:f[m].queue_index??0},{kind:"parallel",marker_index:ut})}async function an(y){for(let v of C.chain_lanes){let f=v.rows.find(m=>m.id===y);if(f){await at({kind:"chain",bead_id:y,root_dir:f.root_dir,lane_id:v.lane_id,...typeof f.queue_index=="number"?{queue_index:f.queue_index}:{}},{kind:"parallel",marker_index:C.parallel_rows.length});return}}}function Ht(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function dn(y,v){let{item:f,root_dir:m,revision:L}=xt(v),X=f?.attempt_id||"",te=y.classList;if(te.contains("worker-mini__rowops-up")||te.contains("worker-mini__rowops-down")){un(v,te.contains("worker-mini__rowops-up")?-1:1);return}if(te.contains("worker-mini__rowops-remove")){_e("worker-queue-remove",{bead_id:v},m,L);return}if(te.contains("mon2-crow__detach")){an(v);return}if(te.contains("worker-dep__open")){Be(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(te.contains("mon2-arm__release")){Jt(v,y.getAttribute("data-lane-id")||"");return}if(te.contains("mon-lane__chip")){let fe=y.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${fe}"]`)?.scrollIntoView({block:"nearest"});return}if(te.contains("judgement-chip")){let fe=y.getAttribute("data-chip-key")||"";fe&&W.toggle({bead_id:v,chip_key:fe});return}if(te.contains("rtile__failure-badge")){M=M===X?null:X,ce();return}if(te.contains("rtile__attempt-copy")){let fe=y.getAttribute("data-attempt-id")||"";fe&&_n(fe).then(ut=>{be(ut?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ut?"success":"error",1400)});return}if(te.contains("worker-card__place")){O=O===v?null:v,ce();return}if(te.contains("worker-card__place-cancel")){O=null,ce();return}if(te.contains("worker-card__place-lane")){let fe=y.getAttribute("data-lane")||"parallel";O=null,Nt(v,fe);return}if(te.contains("rtile__session")){if(f&&f.kind==="session"){let fe=(f.session_refs||[]).find(ut=>ut&&ut.current===!0);fe&&(ee.hidden=!1,Le.open(no(fe,v,"in_progress",m)),ce());return}q=X,X&&f&&(ee.hidden=!1,Le.open({attempt_id:X,root_dir:m,meta:Ht(f)})),ce();return}if(te.contains("rtile__pause")){qe("worker-attempt-pause",{attempt_id:X},m);return}if(te.contains("rtile__resume")){to({context:{bead_id:v,kind:y.dataset.resumeKind==="settlement"?"settlement":"session",tuple:f?xn(f):""},transport:fe=>_e("worker-attempt-resume",{attempt_id:X,...fe},m,we.get(m)?.revision??xt(v).revision,!1)});return}if(te.contains("rtile__parked-retry")){qe("worker-parked-retry",{bead_id:v,attempt_id:X},m).then(fe=>{fe&&fe.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${fe.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":fe.reason||""}`,"error")});return}if(te.contains("rtile__discard-abandon")){let fe={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(zo(v,fe)))return;Xe({bead_id:v,operation_id:y.dataset.operationId||""},m,L,fe);return}if(te.contains("rtile__discard")){let fe=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Wo(v,fe)))return;Ue({bead_id:v,...X?{attempt_id:X}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},m,L);return}if(te.contains("worker-mini__merge")){let fe=Ce(m,v);fe?.mismatch&&fe.continuation===null?De(m,v,L,fe.mismatch):_e("worker-merge-queue-add",{bead_id:v},m,L);return}if(te.contains("worker-mini__merge-cancel")){_e("worker-merge-queue-remove",{bead_id:v},m,L);return}if(te.contains("worker-mini__discard-abandon")){let fe={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!p(zo(v,fe)))return;Xe({bead_id:v,operation_id:y.dataset.operationId||""},m,L,fe);return}if(te.contains("worker-mini__discard")){let fe=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Wo(v,fe)))return;Ue({bead_id:v,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},m,L);return}if(te.contains("worker-mini__revise-fix")){me("worker-revise-fix",{bead_id:v},m,L);return}te.contains("worker-mini__revise-approve")&&_e("worker-revise-approve",{bead_id:v},m,L)}function en(y){let v=Ge.consumeClickSuppression(),f=y.target;if(!f||typeof f.closest!="function"||f.closest("dialog")||f.closest(".worker-drawer-overlay")||f.closest("a"))return;let m=f.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(m){y.preventDefault();let xe=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||m.textContent?.trim()||"";xe&&Bt(xe);return}let L=f.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(L){y.preventDefault();let x=L.getAttribute("data-root-dir")||oe.get(f.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||L.getAttribute("title")||"";Tt(x);return}let X=f.closest(".mon2-sec__toggle");if(X){y.preventDefault(),$e(X.getAttribute("data-root-dir")||"");return}let te=f.closest(".worker-pane__toggle[data-lane]");if(te){y.preventDefault();let x=te.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&ft(x);return}let fe=f.closest(".worker-wait__area-toggle[data-area]");if(fe){y.preventDefault(),lt(fe.getAttribute("data-area")||"parallel");return}if(f.closest(".mon2-newlane")){y.preventDefault(),Rt("create","");return}let ut=f.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ut){y.preventDefault();let x=ut.getAttribute("data-lane-id")||"",xe=ut.classList;Rt(xe.contains("mon2-clane__confirm")?"confirm":xe.contains("mon2-clane__reapply")?"reapply":xe.contains("mon2-clane__run")?"run":xe.contains("mon2-clane__stop")?"stop":"remove",x);return}if(f.closest(".mon-merge-all")){y.preventDefault(),Z();return}let mt=f.closest(".mon-filter__spec");if(mt){y.preventDefault(),k={...k,spec:mt.getAttribute("data-spec")||"all"},pf(k),ce();return}let pt=f.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!pt)return;let It=pt.getAttribute("data-bead-id")||"",A=f.closest("button");if(A){y.preventDefault(),dn(A,It);return}f.closest(".rtile__failure-pop, .chip-popover")||It&&!v&&(y.preventDefault(),Be(It,pt.getAttribute("data-root-dir")||xt(It).root_dir))}function Ae(y){let v=y.target;if(!v||typeof v.closest!="function")return;let f=v.closest(".mon-filter__blocked");if(f){k={...k,show_blocked:f.checked},pf(k),ce();return}let m=v.closest(".mon-candidate-sort");if(m){R=Yo.some(te=>te.value===m.value)?m.value:"repo_spec",dv(R),ce();return}let L=v.closest(".mon-running-sort");if(L){_=L.value==="repo"?"repo":"started",hv(_),ce();return}let X=v.closest(".mon-done-range");X&&(h=Un(X.value),mv(h),ce())}function E(y){let v=y.target,f=v&&typeof v.closest=="function"?m=>v.closest(m):()=>null;M&&!f(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,ce())}function ye(y){y.key!=="Escape"||M===null||(M=null,ce())}e.addEventListener("click",en),e.addEventListener("change",Ae),document.addEventListener("click",E),document.addEventListener("keydown",ye),W.attach(),Ge.attach(e);{let y=!0;z=Wi(v=>{if(le=v,y){y=!1;return}ce()})}o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{try{we.clear(),ce()}catch{}}));function Ne(){Me!==null&&(clearInterval(Me),Me=null)}return{recorrectSharedLane:Qt,load(){n("load"),ce(),Me===null&&(Me=setInterval(()=>{try{ce()}catch{}},bv))},pause(){Ne()},clear(){Ne(),Ge.detach(),ve&&(ve(),ve=null),z&&(z(),z=null),Le.destroy(),ee.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",en),e.removeEventListener("change",Ae),document.removeEventListener("click",E),document.removeEventListener("keydown",ye),W.detach(),e.replaceChildren()}}}function kf(e,t,n){let r=Dt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return _=>{_.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
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
    `}function p(){o&&dt(u(),o),s&&dt(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&dt(c``,o),s&&dt(c``,s)}}}var $f=["bug","feature","task","epic","chore"];function xf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Af=["Critical","High","Medium","Low","Backlog"];function Sf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function _(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let M of $f){let W=document.createElement("option");W.value=M,W.textContent=xf(M),s.appendChild(W)}i.replaceChildren();for(let M=0;M<=4;M+=1){let W=document.createElement("option");W.value=String(M);let K=Af[M]||"Medium";W.textContent=`${M} \u2013 ${K}`,i.appendChild(W)}}_();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,s.disabled=O,i.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function N(){u.textContent=""}function B(O){u.textContent=O}function le(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function z(){let O=s.value||"",M=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function q(){N();let O=String(o.value||"").trim();if(O.length===0){B("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){B("Priority must be 0..4"),i.focus();return}let W=String(s.value||""),K=String(a.value||""),H={title:O};W.length>0&&(H.type=W),String(M).length>0&&(H.priority=M),K.length>0&&(H.description=K),R(!0);try{await t("create-issue",H)}catch{R(!1),B("Failed to create issue");return}z(),R(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),q())}),r.addEventListener("submit",O=>{O.preventDefault(),q()}),{open(){r.reset(),N(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var wv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function kv(e,t){return ba(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ef(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=kv(r,e);return c`<button
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
  `}function Tf(e,t,n){return c`
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
  `}function Cf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${wv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var $v=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Rf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(J=>be(J,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let J=i.querySelector('[data-pane="execution"]');return J?(d=Xi(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:ge=>t.queueStore?.set?.(ge)}),d):null}function h(){return c`
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
    `}function _(){let J=r.get();return c`
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
        ${J?c`
              ${Ef(J,o(),B)}
              ${Tf(J,u,{onDraft:ge=>{u=ge},onAdd:le,onRemove:z})}
              ${Cf(J,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(J){let ge=r.get();if(ge)try{let Oe=await n("display-policy-set",{expected_revision:ge.revision,policy:J(ge)});R(Oe),Oe&&Oe.conflict&&Oe.policy&&(Oe=await n("display-policy-set",{expected_revision:Oe.policy.revision,policy:J(Oe.policy)}),R(Oe)),Oe&&Oe.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function N(J){k(J)}function B(J){let ge=r.get();if(!ge)return;let Oe=!xv(J,ge);N(F=>Av(J,F,Oe))}function le(){let J=u.trim();J.length!==0&&(u="",N(ge=>ge.hidden_prefixes.includes(J)?{hidden_prefixes:ge.hidden_prefixes}:{hidden_prefixes:[...ge.hidden_prefixes,J]}),O())}function z(J){N(ge=>({hidden_prefixes:ge.hidden_prefixes.filter(Oe=>Oe!==J)}))}function q(J){let ge=r.get();if(!ge)return;let Oe=ge.chips[J]===!1;N(()=>({chips:{[J]:Oe}}))}function O(){dt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${$v.map(J=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${J.id}
                  aria-selected=${String(l===J.id)}
                  aria-controls=${`settings-pane-${J.id}`}
                  @click=${()=>M(J.id)}
                >
                  <span class="settings-dialog__glyph">${J.glyph}</span>
                  ${J.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${V}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${_()}
          </div>
        </div>
      `,i),p()}function M(J){l=J,O()}let W=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",W),i.addEventListener("cancel",W);let K=J=>{J.target===i&&V()};i.addEventListener("click",K);let H=null;r.subscribe&&(H=r.subscribe(()=>{a&&O()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function G(J="execution"){a||(a=!0,t.onOpenChange?.(!0),l=J,u="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function V(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:V,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",W),i.removeEventListener("cancel",W),i.removeEventListener("click",K),H&&(H(),H=null),P&&(P(),P=null),d?.destroy(),d=null,i.remove()}}}function xv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Av(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Sv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Of="usage-meter-card",Ev="usage-meter-layer",Fl=600,Tv=["token_expired","relogin_required"];function If(e){return String(e).padStart(2,"0")}function Cv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Lf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${If(r.getHours())}:${If(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Sv[r.getMonth()]} ${r.getDate()} ${s}`;return`${Cv(n,t)} \xB7 ${l}`}function Rv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Pf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Df(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Mf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function qf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Ov(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:qf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Iv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Ov(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?qf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Lv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Iv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function jf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Pv(e,t){return!e.held||jf(e,t)<=Fl?e:{...e,available:!1,windows:[],accounts:[]}}function Nf(e,t){return`${e}:${t}`}function Ff(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){dt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let F=e.ownerDocument;a=F.createElement("div"),a.id=Ev,a.className="usage-meter__layer",F.body.appendChild(a)}return a}function p(){a!==null&&(dt(c``,a),a.remove(),a=null)}function h(F){n!==F&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",N),window.addEventListener("resize",R)),n=F)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",N),window.removeEventListener("resize",R))}function k(F){let ee=F.target;ee&&(e.contains(ee)||a!==null&&a.contains(ee))||(_(),V())}function R(){V()}function N(F){F.key==="Escape"&&(_(),V())}function B(F){n===F?_():h(F),V()}function le(){_(),V()}async function z(F,ee){if(r.has(F.key))return;let Se=Nf(F.key,ee);r.set(F.key,ee),i.delete(Se),V();let Te=null;try{Te=await(await fetch(F.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Te=null}if(t)return;if(r.delete(F.key),!Te||Te.ok!==!0){let oe=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";i.set(Se,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),V();return}let C=Array.isArray(Te.warnings)?Te.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];C.length>0&&i.set(Se,{kind:"warn",text:C.join(" \xB7 ")}),V(),await Oe()}function q(F,ee,Se,Te){let C=Df(F.pct),we=`resets ${Lf(F.resetsAt,Te)}${ee?` \xB7 ${Se}`:""}`;return c`<span
      class="usage-meter__window ${Pf(C)}"
      style=${`--progress: ${C}%`}
      title=${we}
    >
      <span class="usage-meter__label">${F.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${C}%</span>
    </span>`}function O(F,ee,Se){let Te=jf(ee,Se),C=ee.available&&(ee.held||Te>Fl),oe=C?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",we=ee.accounts.filter(Le=>!Le.active).length,ve=`usage-meter__group${C?" usage-meter__group--stale":""}`,Me=c`<span class="usage-meter__provider"
        >${F.label}</span
      >
      ${ee.available?ee.windows.map(Le=>q(Le,C,oe,Se)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${we>0?c`<span class="usage-meter__badge">+${we}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${F.label} usage`}
        >${Me}</span
      >`;let he=n===F.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${F.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${Of}
      @click=${()=>B(F.key)}
    >
      ${Me}
    </button>`}function M(F,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${F.map(Se=>O(Se.provider,Se.snapshot,ee))}
    </span>`}function W(F,ee){let Se=Df(F.pct),Te=Lf(F.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${Pf(Se)}"
      style=${`--progress: ${Se}%`}
    >
      <span class="usage-meter__account-key">${F.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Se}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function K(F,ee){return Tv.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${F.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function H(F,ee,Se){let Te=ee.status==="ok",C=typeof ee.ageSeconds=="number"&&ee.ageSeconds>Fl,oe=i.get(Nf(F.key,ee.number)),we=r.get(F.key),ve=we!==void 0,Me=we===ee.number,he=["usage-meter__account"];return ee.active&&he.push("usage-meter__account--active"),Te||he.push("usage-meter__account--unavailable"),C&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ee.email}
          >${ee.alias===null?ee.email:ee.alias}</span
        >
        ${ee.plan===null?"":c`<span class="usage-meter__account-tag">${ee.plan}</span>`}
        ${ee.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ee.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Rv(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{z(F,ee.number)}}
            >
              ${Me?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Le=>W(Le,Se))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(F,ee.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function P(F,ee,Se){let Te=ee.accounts.filter(C=>C.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${F.label} · 활성 ${Te} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(C=>H(F,C,Se))}
    </section>`}function G(F,ee){return c`<div
      class="usage-meter__card"
      id=${Of}
      role="dialog"
      aria-label=${`${F.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(F.provider,F.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function V(){let F=Date.now(),ee=[];for(let Te of Mf){let C=s.get(Te.key);C&&ee.push({provider:Te,snapshot:Pv(C,F)})}if(ee.length===0){_(),u();return}let Se=ee.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);Se||_(),dt(M(ee,F),e),e.hidden=!1,Se?J(Se,F):p()}function J(F,ee){let Se=d(),Te=e.getBoundingClientRect(),C=e.ownerDocument.documentElement.clientWidth;Se.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),Se.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,C-Te.right)}px`),dt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${G(F,ee)}`,Se)}async function ge(F){try{let ee=await fetch(F.endpoint);return ee.ok?Lv(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Oe(){l+=1;let F=l,ee=await Promise.all(Mf.map(async Se=>({provider:Se,read:await ge(Se)})));if(!(t||F!==l)){for(let Se of ee){let Te=Se.provider.key;if(Se.read.kind==="ok"){s.set(Te,Se.read.snapshot);continue}if(Se.read.kind==="empty"){s.delete(Te);continue}let C=s.get(Te);C!==void 0&&!C.held&&s.set(Te,{...C,held:!0})}V()}}return u(),Oe(),o=setInterval(()=>{Oe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),u()}}}function ms(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Wf="bdui.worker.candidate_sort",gs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Zi=Object.freeze({preset:"spec"}),zf=3,Hf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Bf(e){return gs.some(t=>t.id===e)}function Uf(e){let t=gs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Dv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function hs(e){return e&&"preset"in e?Uf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Uf("spec")}function Bl(e){return e&&"preset"in e?e.preset:null}function Fr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Bf(e)?{preset:e}:Zi}return Fr(s)}if(!e||typeof e!="object")return Zi;let t=e;if(Bf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>zf||!n.every(_a))return Zi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=gs.find(s=>Dv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Gf(){try{return Fr(window.localStorage.getItem(Wf))}catch{return Zi}}function Ul(e){try{window.localStorage.setItem(Wf,JSON.stringify(e))}catch{}}function Kf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Cs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Cs[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,zf)}function Yf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Mv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ms(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function Vf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Tc(hs(t))),Mv(n)}function Xf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Zs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Qf=new Set(["sh","bash","zsh","dash","ksh"]),Zf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Jf(e){let t=e.split("/");return t[t.length-1]||""}function Nv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Jf(n[0]);if(r!=="env")return Qf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Qf.has(Jf(o))}function qv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function jv(e){let t=[],n=0;Zf.lastIndex=0;for(let r of e.matchAll(Zf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:qv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Fv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function e_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function p(O,M){return M?jv(O).map(W=>W.kind==="plain"?W.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):O}function h(){if(!o)return c``;let O=s==="ready"&&Nv(i),M=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>z()}
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
                  ${M.map((W,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(W,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){dt(h(),r)}async function k(){if(s!=="ready")return;let O=await _n(i);be(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),z())}function N(){d||(document.addEventListener("keydown",R),d=!0)}function B(){d&&(document.removeEventListener("keydown",R),d=!1)}async function le(O,M=null){let W=++a;N(),o={...O},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let H=t?t():"";if(!H){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let P="/api/repo-ops-script?workspace="+encodeURIComponent(H)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let G=await n(P),V=await G.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==H){z();return}if(!G.ok||!V||V.ok!==!0){s="error",l=Fv(V&&typeof V.error=="string"?V.error:""),_();return}o={lane:V.lane,base_sha:V.base_sha,path:V.path,base_ref:V.base_ref},i=String(V.content),s="ready",_()}catch{if(W!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function z(){a+=1,B(),o=null,i="",_();let O=u;u=null,O?.isConnected&&O.focus()}function q(){z(),r.remove()}return{open:le,close:z,destroy:q}}var t_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Bv=new Set(["queued","running","retry_pending"]);function n_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let P=s();return typeof P.revision=="number"?P.revision:0}function l(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function a(){let P=s().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,G){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${G}</span
    >`}function d(P){if(typeof P!="number"||!Number.isFinite(P))return"";let G=P/6e4;return Number.isInteger(G)?`timeout ${G}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function p(P){let G=d(P);return G?u("config",G):""}function h(P,G,V){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${V.script}
      @click=${J=>{o&&o({lane:P,base_sha:G.base_sha,path:V.script,base_ref:G.base_ref},J.currentTarget)}}
    ></button>`}function _(){let P=s().repo_operations;return Array.isArray(P)?P:[]}function k(){let P=a().repo_ops,G=P&&typeof P=="object"?P.repo_id:null;return typeof G=="string"&&G?G:null}function R(){return _().some(P=>P&&P.kind==="deploy"&&Bv.has(P.state))}function N(){let P=R(),G=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${P||G}
      title=${P?"\uBC30\uD3EC \uC9C4\uD589 \uC911":G?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function B(){let P=s().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function le(P,G){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!G}
        @change=${V=>{O(P,!V.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z(P){let G=typeof P.base_sha=="string"?P.base_sha:"",V=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${G?`@${G.slice(0,7)}`:""}`,J=B(),ge=!!P.verify&&J.verify,Oe=!!P.deploy&&J.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${V}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ge?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${P.verify?c`${h("verify",P,P.verify)}
              ${p(P.verify.timeout_ms)}
              ${ge?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ge?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":P.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${P.verify?le("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Oe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?c`${h("deploy",P,P.deploy)}
              ${p(P.deploy.timeout_ms)}
              ${Oe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):N()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Oe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?le("deploy",J.deploy):""}
      </div>
    </section>`}function q(P){let G=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return G&&(G.status==="resolved"||G.status==="absent")?z(G):G&&(G.status==="pending"||G.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${G.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${G.error_code?c` — <code>${G.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(P,G){if(!n)return;let V=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:G,expected_revision:i()});if(l(V),V&&V.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:G,expected_revision:i()});l(J)}r()}async function M(){let P=k();if(!n||P===null)return;let G=await n("worker-repo-operation-deploy-run",{repo_id:P});if(l(G),!G||G.ok!==!0){let V=G&&typeof G.reason=="string"?G.reason:"",J=Object.hasOwn(t_,V)?t_[V]:V||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${J}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(P,G,V){return c`<div class="worker-repo-ops__policy-group" data-policy=${V}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${G.map(J=>c`<li data-token=${J}>
              ${W[J]||J}
            </li>`)}
      </ul>
    </div>`}function H(){let P=s(),G=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null;return G?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(G.worker_automatic||[]).length} · 금지
            ${(G.never_automatic||[]).length}</span
          >
        </summary>
        ${G.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${G.schema_version})`}
            </div>`:""}
        ${K("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",G.worker_automatic||[],"worker-automatic")}
        ${K("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",G.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${H()}
      </details>`}}}var s_=20,Uv=5,Wv=new Set(["failed","running","queued","retry_pending"]),Wl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},r_={verify:"verify",deploy:"deploy",job:"deploy"};function zv(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Hv(e){return!e||typeof e!="object"?"":e.kind==="job"?zv(e.script_path)||Wl.job:Object.hasOwn(Wl,e.kind)?Wl[e.kind]:e.kind}function Gv(e,t,n=s_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Kv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Wv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Yv(e,t,n={}){let r=Gv(e,t,1/0),o=n.expanded===!0?s_:Uv,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Kv(l));return{visible:i,hidden:r.length-i.length}}function o_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Vv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function i_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Ir(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function a_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Xv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(r_,n))return;let r=e[r_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Qv(e,t){let n=Zp(e,t),r=Jp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Zv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Jv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Zt(e.at):""}
      >${ri(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${o_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Hv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${ni(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Pr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${o_(e)}"
          >${Vv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?a_(Qp(n.failure_kind,o)):""}
      ${Qv(n,Xv(t,n))}
      ${Zv(n)}
      ${i_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ni(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function ew(e){let t=e.cleanup,n=Dr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Zt(e.at):""}
      >${ri(e.at)||"\u2014"}</span
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
        ${ad(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${a_(br(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${i_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function tw(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?ew(r):Jv(r,e.repo_ops))}
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
  </section>`}function l_(e,t={}){let n=null;function r(){if(n===null){dt(c``,e);return}let i=Yv(n.operations,n.cleanup_failures,{expanded:n.expanded});dt(tw({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var nw="session-preferred",rw=["external_roundtrip","user_feedback_loop"];function c_(e,t){if(!jo(e).includes(nw)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&rw.includes(n)?n:""}var ow="spec-after-blocker";function u_(e,t){return jo(e).includes(ow)&&Array.isArray(t)&&t.length>0}var sw=Dt("views:worker:adapter"),iw="tab:worker:ready",aw="tab:worker:blocked",lw="tab:worker:in-progress",cw="tab:worker:resolved",uw="tab:worker:closed",dw="\u{1F512} blocked",pw={revision:0,auto_advance:!1,auto_merge:!1,slots:vi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},fw=["claude_account","codex_account"],_w=[...ao,...fw];function mw(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function gw(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${fi}: ${n}`:fi}function yr(e){return e&&typeof e=="object"?e:{}}function hw(e){let t={};for(let n of _w){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function bw(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=yr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of ms(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function yw(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function d_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Qr(n):null,l=new Map,a={},u=null,d=0,p=null,h=!1;function _(){h||!s||s()}function k(M){return u===M?a:{}}async function R(){if(!r||h)return;let M=o?.()||"";if(u===M||p&&p.key===M&&p.generation===d)return;let W=++d;p={key:M,generation:W};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(H){if(W!==d)return;p=null,sw("get-session-defaults failed: %o",H),_();return}W===d&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=M,p=null,_())}function N(){u=null,d+=1,R()}function B(){for(let[M,W]of l)W==="failed"&&l.delete(M)}function le(M,W){return i?i.selectBoardColumn(M,W):[]}function z(M,W,K,H){let P=new Set(K.map(F=>F.id)),G=new Set,V=new Map,J=[];for(let F of[...W,...K]){if(G.has(F.id)||mw(F))continue;let ee=Fo(F,M);ee.location===null&&(G.add(F.id),V.set(F.id,ee),J.push(F))}let ge=Vf(J,Fr(H)),Oe=yr(M.bead_scope);return ge.map(F=>{let ee=V.get(F.id),Se=Vr(F),Te=Se.evidence==="published",C=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),oe=ee.worker_ineligible,we=oe||!Object.hasOwn(F,"labels")?"":c_(F.labels,F.metadata),ve=P.has(F.id),Me=ve?ms(F):[],he=[];ve&&Me.length===0&&he.push(dw),ee.awaiting_user&&he.push(gw(F.metadata)),ee.missing_description?he.push("missing_description"):ee.spec==="conflict"?he.push("spec_id_conflict"):ee.spec==="none"?he.push("spec \uC5C6\uC74C"):ee.spec==="draft"&&he.push("spec \uBBF8\uBC1C\uD589(draft)");let Le=Oe[F.id];return{bead_id:F.id,title:F.title||F.id,route:C,spec_id:Se.conflict?"":Se.path,published:Te,blocked:ve,blocked_by:Me,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:hw(yr(F.metadata)),rec:null,...Le&&Array.isArray(Le.scope)?{scope:Le.scope}:{},eligible:ee.placeable,reason:he.join(" \xB7 "),worker_ineligible:oe,session_preferred:we.length>0,session_preferred_reason:we,spec_after_blocker:u_(F.labels,Me),release_info:F.release_info,dependents_info:F.dependents_info}})}function q(M){let[W,K,H,P,G]=M,V=Is([...W,...K,...H,...P,...G]),J=bw([...W,...K,...H,...P]),ge={},Oe=(F,ee)=>{if(!F||typeof F.id!="string"||F.id.length===0)return;let Se=ge[F.id]||(ge[F.id]={});if(typeof F.priority=="number"&&!("priority"in Se)&&(Se.priority=F.priority),typeof F.from_id=="string"&&!("from_id"in Se)&&(Se.from_id=F.from_id),ee&&!("metadata"in Se)){Se.metadata=yr(F.metadata);let Te=yr(F.workflow).route;typeof Te=="string"&&Te.length>0&&(Se.route=Te)}};for(let F of[...W,...K,...H])Oe(F,!0);for(let F of[...P,...G])Oe(F,!1);for(let F of new Set([...Object.keys(ge),...V.keys()])){let ee=Ls(V,F);if(ee.total>0){let Se=ge[F]||(ge[F]={});Se.rollup=ee}}for(let[F,ee]of J){let Se=ge[F]||(ge[F]={});Se.carried_to=ee}return ge}function O(M,W,K,H){let P=new Set((Array.isArray(M.done)?M.done:[]).map(V=>V?.bead_id).filter(V=>typeof V=="string")),G=[];for(let V of W){let J=lr(V.closed_at);if(typeof V.id!="string"||P.has(V.id)||J===null||H!==void 0&&J<H||typeof V.comment_count!="number"||V.comment_count<=0)continue;let ge=`${K}\0${V.id}\0${String(V.updated_at)}\0${V.comment_count}`,Oe=l.get(ge);if(Oe===void 0&&r&&(l.set(ge,"pending"),Promise.resolve(r("get-comments",{id:V.id})).then(ee=>{let Se=Array.isArray(ee)&&ee.some(Te=>Ni(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(ge,Se?"session":"not-session"),_()}).catch(()=>{l.set(ge,"failed"),_()})),Oe!=="session")continue;let F=lr(V.started_at);G.push({id:V.id,title:V.title||V.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:F!==null&&J>=F?J-F:null,work_kind:"session",done_at:J,created_at:V.created_at,updated_at:V.updated_at})}return G}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||pw,K=o?.()||"",H=M&&typeof M.done_since=="number"?M.done_since:void 0,P=le(iw,"ready"),G=le(aw,"blocked"),V=le(lw,"in_progress"),J=le(cw,"resolved"),ge=le(uw,"closed");return{workspaces:[{...W,bead_titles:{...yr(W.bead_titles),...Object.fromEntries([...P,...G].filter(Oe=>Oe&&typeof Oe.id=="string").map(Oe=>[Oe.id,Oe.title||Oe.id]))},root_dir:K,name:yw(K),runnable:z(W,P,G,M?M.candidate_sort:void 0),session_done:O(W,ge,K,H),bead_overlay:q([P,G,V,J,ge])}],workspaces_state:[{root_dir:K,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof yr(W.workspace_info).slots=="number"?yr(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:k(K),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:N,notifyIssuesChanged:B,destroy(){h=!0,d+=1,p=null,l.clear()}}}var Ji=1,p_=5,vw={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ji,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function St(e){return e&&typeof e=="object"?e:{}}var m_="beads-ui.worker.candidate-filter",zl={show_blocked:!1,spec:"all"};function ww(){try{let e=window.localStorage.getItem(m_);if(!e)return{...zl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...zl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...zl}}}function kw(e){try{window.localStorage.setItem(m_,JSON.stringify(e))}catch{}}var $w=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],g_="bdui.worker.done-range";function xw(){try{let e=window.localStorage.getItem(g_);return e===null?"today":Un(e)}catch{return"today"}}function Aw(e){try{window.localStorage.setItem(g_,e)}catch{}}function f_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Sw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function __(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Ew(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Tw(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Cw(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Rw(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Tw(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Cw(e.fallback_reason)}${t}`}function Ow(e){return e&&e.launched===!0?"success":"error"}function Iw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Lw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Pw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Dw=new Set(["waiting_metadata","reviewing","retrying"]),Hl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Mw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Zt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Nw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function qw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Nw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?jr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Pw.has(e.phase)}}function jw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Fw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Bw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=jw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Hl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Sw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${__(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${__(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Uw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,p=null,h=null,_={},k=!1,R={},N=null,B={active:!1,failure:null,origin:null},le=!1){let z=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,M=a&&a.failure||null,W=Iw(a?a.waiting:null),K=n[e]||null,H=K&&K.gate?K.gate:null,P=K&&K.pr?K.pr:null,G=Lw(a?a.resolution:null),V=Mw(h),J=qw(h,V),ge=a&&a.authority||null,Oe=a&&a.review_dispatch||null,F=a?.hold?.auto_review_wait==="slot"?"slot":null,ee=!!h&&typeof h=="object"&&Dw.has(h.phase),Se=z&&!O&&(!ge||ee||ge.source==="automatic"&&!k),Te=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":G?G.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,C=!!H&&H.base_badge==="\uCDA9\uB3CC",oe=!!H&&H.enabled===!0,we=Ko({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),ve=bi(we),Me=s&&!we&&(s.queueing??null)?s.queueing:null,he=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!H&&H.tier==="merged",Le=r&&r.step==="repo_operations"&&we?.failed===!0&&(we.step==="deploy"||we.step==="verify")?we.step:null,Ge=l&&!!r&&!!H&&H.tier==="merged",at=Se&&(oe||C||H?.reason==="base_behind"||Hl.has(H?.reason)||he||Ge),D=Hl.has(H?.reason),pe=l&&C&&u===!1,re=tr(_,e,{external:l,merge_active:O||we?.step==="merge",merge_queued:z,conflict_active:!!i,cleanup_active:ve,merged:!!r||H?.tier==="merged"}),_e=!!re.operation,Ce=!!r||h?.phase==="needs_human"||!!re.error,me=z&&!M&&!q&&!he&&!(J&&J.lock_actions),De=Bw({auto_pending:me,continuation_required:q,queueing:Me,merge_step:we,conflict_badge:Te,conflict_live:G?.live===!0||i==="running",auto_resolution:V,recovery:J,cleanup_failed:r,cleanup_label:r?Dr(r.step):null,base_exception:p,conflicting:C,gate:H,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:M,auto_skip:d,queued:z,queue_active:O,queue_position:a?a.position:0,review_session:B,review_dispatch:Oe,auto_review_wait:F,activity:Te?null:s&&s.activity||null}),Ue=De?.live===!0&&De.title?c`<span title=${De.title}>${De.label}</span>`:De?.label||null,Xe=Fw(K&&K.receipt_check?K.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&we?.active!==!0?hi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...N?{dependency_chips:N}:{},external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:De?.live!==!0&&De?.title?De.label:null,completion_title:De?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},...Xe.length>0?{receipt_badge:{codes:Xe}}:{},badges:Ue?[Ue]:[],live_badge:De?.live===!0?Ue:null,usage:o,alert:De?.alert===!0,merge_action:H?.tier==="merged"&&!he&&!Ge?!1:!z||q||Se||D,cancel_action:z&&!q,cancel_enabled:!O&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:re,discard_action:re.action,resolve_action:Ce,resolve_enabled:!le,resolve_title:le?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:we,discard_enabled:re.enabled,discard_title:re.title,merge_enabled:!we&&!Me&&!i&&!_e&&!p&&!(J&&J.lock_actions)&&!pe&&B.active!==!0&&(oe||C||H?.reason==="base_behind"||D||he||Ge||at||ee&&!O),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Ge?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":C&&!we&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":H?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":D?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Se?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:_e?re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":we?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${we.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B.active===!0?B.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":oe?`\uBA38\uC9C0 (${H.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:H&&H.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${H&&H.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Gl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,h=r?Qr(r):null,_=ww(),k=null,R=null,N=null,B=null,le=so(()=>x()),z=new Map,q=new Map,O=Gf(),M=Bl(O)===null,W=d?Un(d):xw();function K(){let b=Hr.find(g=>g.value===W);return b?b.label:"\uC624\uB298"}let H=zi("beads-ui.worker.lane-collapsed"),P=!1,G="";function V(){return G.trim().length>0}function J(b){return V()?b.filter(g=>g.search_match===!0).length:void 0}let ge=new Set,Oe=new Set,F=new Set;function ee(b,g){return!g?.error||!b?{}:{resolve_action:!0,resolve_enabled:!F.has(b),resolve_title:F.has(b)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Se=new Set,Te=new Set,C=new Set,oe=null,we=[],ve=d_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>x()});function Me(){ve.refreshSessionDefaults()}let he=document.createElement("div");he.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let Ge=document.createElement("div");Ge.className="worker-drawer-overlay",Ge.hidden=!0;let at=document.createElement("div");at.className="worker-drawer-overlay__backdrop";let D=document.createElement("div");D.className="worker-drawer-host";let pe=document.createElement("div");pe.className="worker-drawer-host",pe.hidden=!0,Ge.append(at,D,pe);let re=document.createElement("div");re.className="worker-lanes-host",he.append(Le,Ge,re),e.appendChild(he);let _e=mr(null,null),Ce=[],me=Gi({transport:n,console_el:he,getLanes:()=>_e,getWorkspaces:()=>Ce,getCrossLanes:()=>null,reproject:()=>({lanes:Qt(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>x(),adoptQueue:(b,g)=>{o&&o.set(g)},onDragBegin:()=>{k=null}}),De=null,Ue=vo(D,{transport:n,sessionLogStore:s,onClose:()=>{De=null,Ge.hidden=!0,x()}}),Xe=l_(pe,{onClose:()=>{pe.hidden=!0,Ge.hidden=!0,x()}}),qe=e_({getWorkspacePath:l||(()=>"")}),Z=l&&l()||"",Y=n_({queueStore:o,transport:n,onChanged:()=>x(),onOpenScript:(b,g)=>{qe.open(b,g)}});function $e(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ji,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ft(b){for(let g of Object.values(St($e().provider_hold)))for(let T of Array.isArray(g?.targets)?g.targets:[])if(Array.isArray(T?.attempt_ids)&&T.attempt_ids.includes(b))return T;return null}function lt(b){if(b?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(b?.status||"\uBBF8\uC0C1")}`};let g=Array.isArray(b.windows)?b.windows:[],T=g.find(de=>de?.key==="5h"),ne=g.find(de=>de?.key==="7d");if(!T||typeof T.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(T.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(ne){if(typeof ne.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(ne.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function He(b){let g=St($e().attempts)[b];if(!g)return;let T=St($e().runner_catalog),ne=St(T.runners),de=typeof g.runner=="string"&&ne[g.runner]?g.runner:Object.keys(ne)[0]||"",Ie=St(ne[de]),ze=St(Ie.models),wt=typeof g.model=="string"&&ze[g.model]?g.model:typeof Ie.default_model=="string"?Ie.default_model:Object.keys(ze)[0]||"",Gt=ft(b),st=typeof g.claude_account=="string"?g.claude_account:typeof Gt?.account=="string"?Gt.account:"";B={attempt_id:b,original_runner:de,runner:de,model:wt,account:st,fresh_current:!1},x()}function $(){B=null,x()}function Q(){let b=B;if(!b||!b.runner||!b.model||b.runner==="claude"&&!b.account)return;let g={runner:b.runner,model:b.model};b.runner==="claude"&&b.account&&(g.claude_account=b.account);let T=b.fresh_current||b.runner!==b.original_runner;B=null,x(),yt(b.attempt_id,"session",{exec_override:g,...T?{continuation:"fresh_current",decision_token:{}}:{}})}function Re(){let b=B;if(!b)return"";let g=St(St($e().runner_catalog).runners),T=Array.isArray(St($e().account_catalog).claude)?St($e().account_catalog).claude:[],ne=b.runner!==b.original_runner;return c`<dialog
      class="provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(g).map(de=>c`<option
                  value=${de}
                  ?selected=${de===b.runner}
                >
                  ${de}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(g).map(([de,Ie])=>c`<optgroup label=${de}>
                  ${Object.keys(St(Ie?.models)).map(ze=>c`<option
                        value=${JSON.stringify([de,ze])}
                        ?selected=${de===b.runner&&ze===b.model}
                      >
                        ${ze}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${b.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${b.account?"":c`<option value="" selected>계정 선택</option>`}
                ${b.account&&!T.some(de=>de?.email===b.account)?c`<option value=${b.account} selected>
                      ${b.account} (목록에 없음)
                    </option>`:""}
                ${T.map(de=>{let Ie=lt(de),ze=de.alias||de.email;return c`<option
                    value=${de.email}
                    ?selected=${de.email===b.account}
                    ?disabled=${!Ie.eligible}
                    title=${Ie.reason}
                  >
                    ${ze}${Ie.reason?` \u2014 ${Ie.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${b.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${ne||b.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="provider-resume-dialog__actions">
        <button type="button" class="provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="provider-resume-dialog__confirm"
          ?disabled=${b.runner==="claude"&&!b.account}
          title=${b.runner==="claude"&&!b.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function Pe(b){if(!k||!b.some(T=>T.id===k))return null;let g=Bo($e());return g?{bead_id:k,lanes:g}:null}function Ve(){return l&&l()||""}async function rt(b,g){await me.sendOp({type:"worker-queue-place",payload:{bead_id:b,...g==="parallel"?{}:{lane:g}},root_dir:Ve()},b)}function Qe(){let b=$e();return typeof b.revision=="number"?b.revision:0}function ct(b){b&&b.queue&&o&&o.set(b.queue)}async function Wt(b){if(!n||!b)return;let g=await n("worker-attempt-pause",{attempt_id:b});g&&g.paused===!1&&g.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function yt(b,g="session",T={}){if(!n||!b)return;let ne=n,de=$e().attempts?.[b]||null;await to({context:{bead_id:de?.bead_id||"",kind:g,tuple:de?xn(de):""},transport:Ie=>ne("worker-attempt-resume",{attempt_id:b,expected_revision:Qe(),...T,...Ie}),adopt:ct})}async function gt(b,g,T=!0){if(!n)return null;let ne=n,de=await ne(b,{...g,expected_revision:Qe()});return ct(de),de&&de.conflict&&T&&(de=await ne(b,{...g,expected_revision:Qe()}),ct(de)),de}async function vt(b){if(!n||!b)return;let g=$e().merge_queue?.find(ne=>ne.bead_id===b)?.continuation_action;if(g?.mismatch&&g.continuation===null){await S(b,g.mismatch);return}ge.add(b),x();let T;try{T=await gt("worker-merge-queue-add",{bead_id:b})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ge.delete(b),x()}if(!(!T||T.applied)){if(T.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(Ew(T.reason),"error",2400)}}async function Mt(b){if(!(!n||!b||Oe.has(b))){Oe.add(b),x();try{let g=await n("worker-cleanup-retry",{bead_id:b,expected_revision:Qe()});ct(g),g&&!g.retried&&!g.conflict&&g.reason&&be(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${g.reason}`,"error",2400)}finally{Oe.delete(b),x()}}}async function $t(b){if(!(!n||!b||F.has(b))){F.add(b),x();try{let g=await n("worker-resolve-in-session",{bead_id:b,expected_revision:Qe()});ct(g),be(Rw(g),Ow(g),4e3)}finally{F.delete(b),x()}}}async function ue(b,g){let T=$e().hold;if(!n||!T||typeof T.since!="number")return;let ne=await n(b,{since:T.since});ct(ne),ne&&ne.ok===!1&&be(`${g}: ${ne.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ne.reason||""}`,"error",2800)}async function ie(b,g){if(!n||!b||!g)return;let T=await n("worker-parked-retry",{bead_id:b,attempt_id:g});ct(T),T&&T.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${T.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":T.reason||""}`,"error",2800)}async function S(b,g){let T=await dr({continuation_mismatch:g},(de,Ie)=>gt("worker-merge-queue-add",{bead_id:b,continuation:de,decision_token:Ie},!1)),ne=T?.queue?.merge_queue?.find(de=>de.bead_id===b)?.continuation_action;if(T?.applied!==!0&&ne?.continuation===null&&ne.mismatch){await S(b,ne.mismatch);return}T&&T.applied===!1&&!T.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function j(b){if(!n)return;let g=await gt("worker-merge-auto-toggle",{on:b});!g||g.conflict||be(b?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",b?"success":"info",2400)}async function se(b){if(!n||!b)return;let g=await gt("worker-merge-queue-remove",{bead_id:b});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ae(){await gt("worker-merge-queue-remove",{all:!0})}async function ce(b,g=null,T="unmerged",ne=null){if(!n||!b)return;let de=Wo(b,T);if(!(!!ne||typeof globalThis.confirm!="function"||globalThis.confirm(de)))return;let ze=await n("worker-discard",{bead_id:b,...g?{attempt_id:g}:{},...ne?{operation_id:ne}:{},expected_revision:Qe()});if(ct(ze),ze&&ze.conflict&&(ze=await n("worker-discard",{bead_id:b,...g?{attempt_id:g}:{},...ne?{operation_id:ne}:{},expected_revision:Qe()}),ct(ze)),ze&&ze.discarded===!0){be(si(ze),"success",5e3);return}if(ze&&ze.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${ze.reason}`,"error",2800);return}if(ze&&ze.accepted&&ze.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ze&&ze.accepted&&!ze.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${ze.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ze&&!ze.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function je(b,g,T){if(!n||!b||!g||typeof globalThis.confirm=="function"&&!globalThis.confirm(zo(b,T)))return;let ne=await n("worker-discard-abandon",{bead_id:b,operation_id:g,expected_revision:Qe()});if(ct(ne),ne&&ne.conflict&&(ne=await n("worker-discard-abandon",{bead_id:b,operation_id:g,expected_revision:Qe()}),ct(ne)),ne&&ne.abandoned===!0){be(oi(T),"success",5e3);return}if(ne&&ne.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${ne.reason}`,"error",2800);return}ne&&!ne.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ze(b,g,T){if(!(!n||!g||!T||Te.has(g))){Te.add(g),x();try{let ne=await n(b,{bead_id:g,action_id:T,expected_revision:Qe()});ct(ne),ne?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ne?.ok&&ne?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ne.reason)}`,"error",2800)}finally{Te.delete(g),x()}}}async function Je(b,g){if(!n||!g||Se.has(g))return;Se.add(g),x();let T;try{let ne=async(de={})=>await n(b,{bead_id:g,expected_revision:Qe(),...de});T=await ne(),ct(T),T&&T.conflict&&(T=await n(b,{bead_id:g,expected_revision:Qe()}),ct(T)),b==="worker-revise-fix"&&(T=await dr(T,(de,Ie)=>ne({continuation:de,decision_token:Ie}),{onResult:ct,refresh:()=>ne()}))}finally{Se.delete(g),x()}if(!(!T||T.conflict)){if(T.ok){be(b==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function Be(b){if(!n)return;let g=await n("worker-automation-toggle",{on:b,expected_revision:Qe()});ct(g),g&&g.conflict&&await n("worker-automation-toggle",{on:b,expected_revision:Qe()}).then(ct)}async function Tt(b){if(!n||!b)return;let g=await n("worker-repo-operation-dismiss",{operation_id:b});ct(g),g&&g.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${g.reason||""}`,"error",3e3)}async function Bt(b){if(!n||!Number.isFinite(b))return;let g=Math.max(Ji,Math.floor(b)),T=await n("worker-queue-set-slots",{slots:g,expected_revision:Qe()});ct(T),T&&T.conflict&&await n("worker-queue-set-slots",{slots:g,expected_revision:Qe()}).then(ct)}async function xt(b){if(!n||!Number.isInteger(b)||b<1||b>p_)return;let g=$e(),T=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).slice(b).reduce((Ie,ze)=>Ie+(Array.isArray(ze?.entries)?ze.entries.length:0),0),ne=()=>({count:b,expected_revision:Qe()}),de=await n("worker-queue-set-serial-lane-count",ne());ct(de),de&&de.conflict&&(de=await n("worker-queue-set-serial-lane-count",ne()),ct(de)),de&&de.applied&&T>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Qt(){let b=Tr(W),g=ve.read({candidate_sort:O,done_since:b});return Ce=g.workspaces,_e=mr(g.workspaces,g.workspaces_state,{done_since:b,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:G}),_e}function Ct(b){return b.queue_groups[0]||vw}function Rt(b){let g=b.dependency_chips||null,T={...g&&g.released?{released:g.released}:{},...g&&g.dependents?{dependents:g.dependents}:{}},ne=z.get(b.id),de=q.get(b.id)||null,Ie=ne&&ne.overlaps.length>0?ne.overlaps:null,ze=!!ne&&ne.scope_missing;return!de&&!Ie&&!ze&&Object.keys(T).length===0?null:{...T,...de?{predecessors:de}:{},...Ie?{overlaps:Ie}:{},...ze?{scope_missing:!0}:{}}}function Kt(b){return{...b,workspace_name:"",done_layout:void 0,dependency_chips:Rt(b)||void 0,chip_popover:_t(b)}}function _t(b){return pi(b,g=>le.isOpen({bead_id:b.id,chip_key:g}))}function zt(){let b=$e(),g=new Map;for(let T of Object.values(St(b.lane_states))){let ne=Array.isArray(T?.corrections)?T.corrections:[];for(let de of ne)de&&typeof de.bead_id=="string"&&typeof de.after=="string"&&g.set(de.bead_id,de.after)}return{admission:St(b.admission),correction_after:g}}function Jt(b,g){let T=Kt(b),ne=ed(g.admission[b.id]||null,!!b.discard||Te.has(b.id)),de=g.correction_after.get(b.id);return{...T,draggable:T.draggable===!0&&!ne,stale_work:ne,reason:ne?"":T.reason,badges:de?[`\u{1F517} ${de} \uB4A4 (blocks \uC790\uB3D9)`,...T.badges||[]]:T.badges,revise_enabled:T.revise_enabled===!0&&!Se.has(b.id)}}function Nt(b){let g=zt();return Ct(b).sublanes.parallel.map(T=>Jt(T,g))}function un(b){let g=zt();return Ct(b).sublanes.serial.map(T=>{let ne=T.occupants.map(de=>({id:de.id,title:de.title,draggable:!1,lane:T.id,ghost:!0,badges:[de.badge],...typeof de.search_match=="boolean"?{search_match:de.search_match}:{}}));return{id:T.id,index:T.index+1,raw_length:T.raw_length,ghosts:ne,items:T.items.map(de=>Jt(de,g)),occupied:T.occupied_by.length>0,badge:T.occupants.length>0?T.occupants[0].badge:"\uB300\uAE30",cycle:T.cycle===!0}})}function an(b){return b.runnable.map(g=>Kt(g))}function Ht(b){return b.done.map(g=>Kt(g))}function dn(b){let g=b.running.filter(T=>T.non_occupying!==!0).map(T=>({...T,bead_id:T.id,attempt_id:T.attempt_id||"",paused:T.run_state==="paused",failed:T.run_state==="failed",parked:T.run_state==="parked",retry_wait:T.run_state==="retry_wait",waiting:T.run_state==="waiting",wait:T.wait||null,provider_hold:T.run_state==="provider_hold",hold:T.hold?{...T.hold,open:N===T.attempt_id}:null,status_label:T.run_state==="failed"?T.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":T.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":T.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":T.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":T.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:T.can_pause!==!1,workspace_name:"",dependency_chips:Rt(T)||void 0,chip_popover:_t(T),rollup_expanded:C.has(T.id),failure:T.failure?{...T.failure,open:R===T.attempt_id}:null,...ee(T.id,T.discard)}));return[...g.filter(T=>T.failed===!0),...g.filter(T=>T.failed!==!0&&T.parked===!0),...g.filter(T=>T.failed!==!0&&T.parked!==!0)]}function en(b){return Ae(b).map(g=>({...g,chip_popover:_t(g)}))}function Ae(b){if(oe&&oe.model===b)return oe.rows;let g=$e(),T=Ct(b),ne=St(g.attempts),de=Object.values(ne).filter(Jn),Ie=new Map;for(let Ke of de)Ie.set(Ke.attempt_id,Ke);let ze=new Map;for(let Ke of de)ze.set(Ke.bead_id,Ke);let wt=new Map;for(let Ke of[...b.pr_wait,...b.running,...b.queue,...b.runnable,...b.done])wt.has(Ke.id)||wt.set(Ke.id,Ke);let Gt=Ke=>{let qt=null;for(let kn of de)!kn||kn.bead_id!==Ke||el(kn,Ie)||(qt===null||(typeof kn.started_at=="number"?kn.started_at:0)>=(typeof qt.started_at=="number"?qt.started_at:0))&&(qt=kn);return qt&&typeof qt.target_base=="string"?qt.target_base:null},st=new Map;for(let Ke of b.running)Ke.run_state==="failed"||Ke.conflict_resolution!==!0||(Ke.run_state!=="paused"?st.set(Ke.id,"running"):st.has(Ke.id)||st.set(Ke.id,"paused"));let tn=St(g.auto_merge_skips),on=new Set(T.merge.auto_excluded),Fn=St(g.pr_observations),pn=St(g.pr_activity),ln=St(g.cleanup_failed),Rn=St(g.discard_operations),Gn=St(g.bead_workflow),nn=St(g.bead_titles),Kn=g.merge_queue_state||{active:null,failures:{}},ar=T.merge.state.waiting,On=new Map;for(let Ke of Array.isArray(g.merge_queue)?g.merge_queue:[])Ke&&typeof Ke=="object"&&Ke.bead_id&&On.set(Ke.bead_id,Ke);let Bn=(Array.isArray(g.pr_wait)?g.pr_wait:[]).map(Ke=>{let qt=wt.get(Ke.bead_id);return{...Uw(Ke.bead_id,qt?.title||nn[Ke.bead_id]||Ke.bead_id,Fn,ln[Ke.bead_id]||null,Zn(ne,Ke.bead_id),pn[Ke.bead_id]||(ge.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Oe.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),st.get(Ke.bead_id)||null,Ke.external===!0,{position:T.merge.positions.get(Ke.bead_id)||0,active:Kn.active===Ke.bead_id,failure:St(Kn.failures)[Ke.bead_id]||null,waiting:ar&&ar.bead_id===Ke.bead_id?ar.reason:null,resolution:T.merge.resolutions.get(Ke.bead_id),continuation_action:T.merge.continuations.get(Ke.bead_id),authority:T.merge.authorities.get(Ke.bead_id)||null,hold:On.get(Ke.bead_id)?.hold||null,review_dispatch:On.get(Ke.bead_id)?.review_dispatch||null},Ke.wt_present!==!1,g.auto_merge===!0&&on.has(Ke.bead_id)?tn[Ke.bead_id]?.reason||"":null,Ja(T.declared_base,Gt(Ke.bead_id)),St(g.completion_status)[Ke.bead_id]||null,Rn,g.auto_merge===!0,{merge_sha:Ke.merge_sha,cleanup_cursor:Ke.cleanup_cursor,repo_operations:T.repo_operations},qt?Rt(qt):null,Vu(ne,Ke.bead_id),F.has(Ke.bead_id)),...qt?.search_match===void 0?{}:{search_match:qt.search_match},workflow:Gn[Ke.bead_id]||null,priority:qt?.priority,from_id:qt?.from_id,...qt?.created_at===void 0?{}:{created_at:qt.created_at},...qt?.updated_at===void 0?{}:{updated_at:qt.updated_at}}});return oe={model:b,rows:Bn},Bn}function E(b){let g=Ct(b),T=[];for(let Ie of b.running)Ie.non_occupying!==!0&&T.push({id:Ie.id,title:Ie.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ie.serial_lane_id??null});for(let Ie of b.pr_wait)T.push({id:Ie.id,title:Ie.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ie of g.sublanes.serial)Ie.items.forEach((ze,wt)=>{T.push({id:ze.id,title:ze.title,location_label:`${Ie.id} #${wt+1}`,kind:"serial",lane_id:Ie.id})});g.sublanes.parallel.forEach((Ie,ze)=>{T.push({id:Ie.id,title:Ie.title,location_label:`#${ze+1}`,kind:"parallel",lane_id:null})});for(let Ie of b.runnable)T.push({id:Ie.id,title:Ie.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ie.queue_placeable===!0});let ne=$e();z=Xf(ne.bead_scope,T);let de=new Map;for(let Ie of[...b.running,...b.runnable])Array.isArray(Ie.blocked_by)&&Ie.blocked_by.length>0&&de.set(Ie.id,Ie.blocked_by);for(let[Ie,ze]of Object.entries(St(ne.bead_blocked_by)))Array.isArray(ze)&&de.set(Ie,ze.filter(wt=>typeof wt=="string"&&wt.length>0));q=dd(de,T,St(ne.blocker_workspaces))}function ye(b){let g=b.hold&&typeof b.hold=="object"?b.hold:null;if(!g||g.kind!=="env"&&g.kind!=="systemic")return"";let T=br(g.cause)||String(g.cause||""),ne=Array.isArray(b.lineages)?b.lineages:[];if(g.kind==="env"){let Ie=ne.map(wt=>wt&&wt.next_at).filter(wt=>typeof wt=="number").sort((wt,Gt)=>wt-Gt)[0],ze=typeof Ie=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ie).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${T} — 재시도 대기${ze}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let de=(Array.isArray(g.bead_ids)?g.bead_ids:[]).filter(Ie=>typeof Ie=="string"&&Ie.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${T}${de.length>0?` \u2014 bead ${de.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ne(b){let g=[];for(let[st,tn]of Object.entries(St(b.provider_hold)))for(let on of Array.isArray(tn?.targets)?tn.targets:[])g.push({runner:st,target:on});if(g.length===0)return"";let T=g.find(st=>st.target?.kind==="outage");if(T){let st=typeof T.target.next_probe_at=="number"?new Date(T.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${T.runner} 공급자 장애 — 신규 디스패치
        보류${st?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${st}`:""}
      </div>`}let ne=Array.isArray(St(b.account_catalog).claude)?St(b.account_catalog).claude:[],de=st=>ne.find(on=>on?.email===st)?.alias||st,Ie=g.find(st=>typeof st.target?.account!="string"),ze=st=>typeof st?.resets_at=="number"?new Date(st.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Ie){let st=ze(Ie.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Ie.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${st?`, \uB9AC\uC14B ${st}`:""}
      </div>`}let wt=[...new Set(g.map(st=>de(String(st.target.account))))],Gt=ze(g[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${wt.join(", ")} 사용 한도 —
      ${wt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Gt?`, \uB9AC\uC14B ${Gt}`:""}
    </div>`}function y(b){let g=$e(),T=Ct(b),ne=T.sublanes.parallel,de=ne.length>0?ne[0].id:"\u2014",Ie=c`<button
      type="button"
      class="worker-play${g.auto_advance?" is-active":""}"
    >
      ${g.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ze=X(b),wt=T.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Gt=g.auto_advance?0:(Array.isArray(g.queue)?g.queue:[]).filter(nn=>nn&&typeof nn.armed_by_lane=="string"&&nn.armed_by_lane.length>0).length,st=Gt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Gt}건 진행 중</span
          >`:"",tn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${T.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${en(b).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${K()} 완료 <b>${b.done.length}</b></span
      >`,on=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${T.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${T.declared_base||"?"}</span
    >`,Fn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ji}
          step="1"
          .value=${String(T.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:p_},(nn,Kn)=>Kn+1).map(nn=>c`<option
                value=${String(nn)}
                ?selected=${T.serial_lane_count===nn}
              >
                ${nn}
              </option>`)}
        </select>
      </label> `,pn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${G}
    />`,ln=Qu(T.repo_operations,T.cleanup_failures),Rn=ye(g),Gn=Ne(g);return P?c`<div class="worker-ribbon">
          ${Ie} ${ze}
          <div class="worker-kpi worker-kpi--ribbon">
            ${wt}${st}${tn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Fn}${pn}</div>
          <div class="worker-kpi">${on}</div>
        </div>
        ${Gn}${Rn}${ln}${Y.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Ie}${ze}${Fn}${pn}
        </div>
        <div class="worker-kpi">
          ${wt}${st}${tn}${on}
          ${(Array.isArray(T.token_total)?T.token_total:T.token_total?[{label:T.token_total,tooltip:`${K()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(nn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${nn.tooltip}
                >${K()} 완료 · 누적 ${nn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${de}</b></span
          >
        </div>
      </div>
      ${Gn}${Rn}${ln}${Y.template()}`}function v(b){let g=b.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${g.blocked>0?` ${g.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${$w.map(T=>c`<button
              type="button"
              class="worker-filter__chip${_.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${_.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${g.spec>0?c`<span class="worker-filter__hidden">숨김 ${g.spec}</span>`:""}
      </div>
    </div>`}function f(){let b=M?"custom":Bl(O)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${b}
    >
      ${gs.map(g=>c`<option value=${g.id} ?selected=${b===g.id}>
            ${g.label}
          </option>`)}
      <option value="custom" ?selected=${b==="custom"}>
        사용자 지정…
      </option>
    </select>`}function m(){let b=hs(O);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(g=>{let T=b[g];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${g}
            aria-label=${`${g+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${T?T.key:""}
          >
            ${g===0?"":c`<option value="" ?selected=${!T}>없음</option>`}
            ${Hf.map(ne=>c`<option
                  value=${ne.key}
                  ?selected=${!!T&&T.key===ne.key}
                >
                  ${ne.label}
                </option>`)}
          </select>
          ${T?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${g}
                aria-label=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${T.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function L(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Hr.map(b=>c`<option value=${b.value} ?selected=${W===b.value}>
              ${b.label}
            </option>`)}
      </select>
    </div>`}function X(b){let g=Ct(b).merge,T=$e().auto_merge===!0;if(g.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${T?" is-active":""}"
        title=${T?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${T?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${g.positions.size}
      </button>`;if(T)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ne=new Set(g.auto_excluded),de=en(b).filter(Ie=>Ie.merge_action&&Ie.merge_enabled&&!ne.has(Ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${de>0?` ${de}`:""}
    </button>`}function te(b,g){return c`<div
      data-bead-id=${b.id}
      data-drag-kind=${g.kind}
      data-root-dir=${g.root_dir}
      data-lane-id=${cn(g.lane_id)}
      data-row-index=${g.row_index}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Pn({...b,...ee(b.id,b.discard)},{actions:mo(b)})}
    </div>`}function fe(b){let g=Nt(b),T=Ve();return _i({parallel:{rows:g.map((ne,de)=>te(ne,{kind:"parallel",root_dir:T,row_index:de})),count:g.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:T}},serial:{lanes:un(b).map(ne=>({id:ne.id,title:`\uC9C1\uB82C ${ne.index}`,rows:[...ne.ghosts.map(de=>Pn({...de,...ee(de.id,de.discard)},{actions:mo(de)})),...ne.items.map((de,Ie)=>te(de,{kind:"repo-serial",root_dir:T,row_index:Ie,lane_id:ne.id}))],count:ne.ghosts.length+ne.items.length,match_count:J([...ne.ghosts,...ne.items]),empty:ne.ghosts.length+ne.items.length===0,badge:ne.badge,held:ne.occupied,cycle:ne.cycle,drop:{drop:"repo-serial",root_dir:T,lane_id:ne.id,lane_length:String(ne.raw_length)}})),collapsed:H.isAreaCollapsed("serial")}})}function ut(b){return rf(dn(b),Date.now(),De)}function mt(b){return b.running.some(g=>g.kind!=="session"&&g.run_state==="running")}function pt(b){let g=Ct(b),T=an(b),ne=Nt(b),de=Ht(b),Ie=en(b),ze=dn(b),wt=Hn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:T,match_count:J(T),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:f(),header_row:M?m():void 0,controls:v(b),collapsible:!0,collapsed:H.isCollapsed("candidate"),place_menu:Pe(T),onOpenDoc:u?(st,tn)=>u(tn):void 0}),Gt=Hn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:de,match_count:J(de),empty:`${K()} \uC644\uB8CC \uC5C6\uC74C`,header_control:L(),collapsible:!0,collapsed:H.isCollapsed("done"),preview:P?Array.isArray(g.token_total)?g.token_total.map(st=>st.label).join(" \xB7 "):g.token_total||f_(de):void 0});return P?c`<div class="worker-lanes worker-lanes--mobile">
          ${mi({live:mt(b),running_body:ze.length>0?ut(b):"",pr_wait_rows:Ie.map(st=>Pn(st)),count:ze.length+Ie.length})}
          ${Hn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ne,count:ne.length,match_count:J(ne),collapsible:!0,collapsed:H.isCollapsed("queue"),preview:f_(ne),body:fe(b)})}
          ${wt} ${Gt}
        </div>
        ${Re()}`:c`<div class="worker-lanes">
        ${wt}
        ${Hn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ne,count:ne.length,match_count:J(ne),collapsible:!0,collapsed:H.isCollapsed("queue"),body:fe(b)})}
        ${Hn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:ze,match_count:J(ze),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${g.slots}</span
          >`,live:mt(b),collapsible:!0,collapsed:H.isCollapsed("running"),body:ut(b)})}
        ${Hn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ie,match_count:J(Ie),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:H.isCollapsed("pr_wait")})}
        ${Gt}
      </div>
      ${Re()}`}function It(b){H.toggle(b),x()}function A(b){H.toggleArea(b),x()}function x(){let b=Qt();E(b),dt(y(b),Le),dt(pt(b),re);let g=re.querySelector(".provider-resume-dialog");g&&!g.open&&(typeof g.showModal=="function"?g.showModal():g.setAttribute("open",""))}function xe(){let b=!0,g=Wi(T=>{if(P=T,b){b=!1;return}x()});we.push(g)}function Fe(b){_=b,kw(b),x()}function ot(b){if(b==="custom"){M=!0,x();return}O=Fr(b),Ul(O),M=!1,x()}function ht(b){O=Fr({chain:b}),Ul(O),x()}function Ut(b){W=Un(b),Aw(W),p?.(W),x()}function Br(b){let g=b.target;if(B){let st=g?.closest?.(".provider-resume-dialog__runner");if(st){let pn=St(St($e().runner_catalog).runners),ln=St(pn[st.value]),Rn=Object.keys(St(ln.models));B={...B,runner:st.value,model:typeof ln.default_model=="string"?ln.default_model:Rn[0]||""},x();return}let tn=g?.closest?.(".provider-resume-dialog__model");if(tn){try{let[pn,ln]=JSON.parse(tn.value);typeof pn=="string"&&typeof ln=="string"&&(B={...B,runner:pn,model:ln},x())}catch{}return}let on=g?.closest?.(".provider-resume-dialog__account");if(on){B={...B,account:on.value},x();return}let Fn=g?.closest?.(".provider-resume-dialog__fresh-input");if(Fn){B={...B,fresh_current:Fn.checked},x();return}}let T=g?.closest?.(".worker-serial-lane-count");if(T){let st=Number.parseInt(T.value,10);Number.isFinite(st)&&xt(st).then(x);return}let ne=b.target?.closest?.(".worker-filter__blocked");if(ne){Fe({..._,show_blocked:ne.checked});return}let de=b.target?.closest?.(".worker-sort-chain__key");if(de){let st=Number.parseInt(de.getAttribute("data-step")||"",10);Number.isFinite(st)&&ht(Kf(hs(O),st,de.value));return}let Ie=b.target?.closest?.(".worker-done-range");if(Ie){Ut(Ie.value);return}let ze=b.target?.closest?.(".worker-sort");if(ze){ot(ze.value);return}let wt=b.target?.closest?.(".worker-slots__input");if(!wt)return;let Gt=Number.parseInt(wt.value,10);if(!Number.isFinite(Gt)){x();return}Bt(Gt).then(x)}function yn(b){return b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,worktree:b.worktree||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}}function ir(){let b=Ct(Qt()),g=$e().workspace_info,T=g&&typeof g=="object"&&g.repo_ops&&typeof g.repo_ops=="object"?g.repo_ops:null;return{operations:b.repo_operations,cleanup_failures:b.cleanup_failures,repo:l&&l()||"",repo_ops:T}}function kr(){De&&Ue.close(),pe.hidden=!1,Ge.hidden=!1,Xe.open(ir()),x()}function ea(b){let g=$e(),T=g.attempts?g.attempts[b]:null;De=b,Xe.close(),pe.hidden=!0,Ge.hidden=!1,Ue.open({attempt_id:b,meta:yn(T)}),x()}function ta(b){let g=$e(),T=(Array.isArray(g.session_active)?g.session_active:[]).find(de=>de&&de.bead_id===b),ne=(T&&Array.isArray(T.session_refs)?T.session_refs:[]).find(de=>de&&de.current===!0);ne&&(Xe.close(),pe.hidden=!0,Ge.hidden=!1,Ue.open(no(ne,b,"in_progress")),x())}function na(){if(Xe.isOpen()&&Xe.refresh(ir()),!De)return;let b=$e(),g=b.attempts?b.attempts[De]:null;if(g){Ue.updateMeta(yn(g));return}Ue.close()}function bs(b,g){if(b.length===0||!i)return;let T=l?l():void 0;if(g.length===0||!T||g===T||!a){i(b);return}Promise.resolve(a(g)).then(()=>{i(b)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ys(b){let g=b.target;if(g?.closest?.(".provider-resume-dialog__cancel")){$();return}if(g?.closest?.(".provider-resume-dialog__confirm")){Q();return}if(g?.closest?.(".provider-resume-dialog")||g?.closest?.(".worker-mini__grip"))return;let T=g?.closest?.(".worker-sort-chain__dir");if(T){let Ee=Number.parseInt(T.getAttribute("data-step")||"",10);Number.isFinite(Ee)&&ht(Yf(hs(O),Ee));return}let ne=g?.closest?.(".worker-dep__open");if(ne){bs(ne.getAttribute("data-dep-id")||"",ne.getAttribute("data-root-dir")||"");return}let de=g?.closest?.(".judgement-chip");if(de){let Ee=de.closest("[data-bead-id]"),it=Ee&&Ee.getAttribute("data-bead-id")||"",Yt=de.getAttribute("data-chip-key")||"";it&&Yt&&le.toggle({bead_id:it,chip_key:Yt});return}if(g?.closest?.(".chip-popover"))return;if(g?.closest?.(".worker-repo-strip")){kr();return}let Ie=g?.closest?.(".worker-repo-op__dismiss");if(Ie){Tt(Ie.dataset.operationId||"");return}let ze=g?.closest?.(".worker-cleanup__resume");if(ze){let Ee=ze.dataset.beadId;Ee&&Mt(Ee);return}let wt=g?.closest?.(".worker-cleanup__resolve");if(wt){let Ee=wt.dataset.beadId;Ee&&$t(Ee);return}if(g?.closest?.(".worker-hold__retry")){ue("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(g?.closest?.(".worker-hold__resume")){ue("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(g?.closest?.(".worker-play")){Be(!$e().auto_advance);return}let Gt=g?.closest?.(".worker-merge-all");if(Gt){Gt.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?j(!1):ae():j(!0);return}let st=g?.closest?.(".worker-pane__toggle[data-lane]");if(st){let Ee=st.dataset.lane;(Ee==="candidate"||Ee==="queue"||Ee==="running"||Ee==="pr_wait"||Ee==="done")&&It(Ee);return}let tn=g?.closest?.(".worker-wait__area-toggle[data-area]");if(tn){let Ee=tn.dataset.area;(Ee==="parallel"||Ee==="serial")&&A(Ee);return}let on=g?.closest?.(".worker-card__place-lane");if(on){let Ee=on.dataset.beadId,it=on.dataset.lane;Ee&&(it==="parallel"||/^s[1-5]$/.test(it||""))&&(k=null,x(),rt(Ee,it));return}if(g?.closest?.(".worker-card__place-cancel")){k=null,x();return}let pn=g?.closest?.(".worker-card__place");if(pn){let Ee=pn.dataset.beadId;Ee&&!pn.disabled&&(Bo($e())?(k=Ee,x()):rt(Ee,"parallel"));return}let ln=g?.closest?.(".worker-filter__chip");if(ln){let Ee=ln.dataset.spec;(Ee==="all"||Ee==="with"||Ee==="without")&&Fe({..._,spec:Ee});return}let Rn=g?.closest?.('[data-action="queue-remove"]');if(Rn){let Ee=Rn.dataset.beadId||"";Ee&&me.sendOp({type:"worker-queue-remove",payload:{bead_id:Ee},root_dir:Ve()},Ee);return}let Gn=g?.closest?.(".worker-mini__merge");if(Gn){let Ee=Gn.dataset.beadId||"";$e().cleanup_failed?.[Ee]?Mt(Ee):vt(Ee);return}let nn=g?.closest?.(".worker-mini__merge-cancel");if(nn){se(nn.dataset.beadId||"");return}let Kn=g?.closest?.(".worker-mini__resolve");if(Kn){$t(Kn.dataset.beadId||"");return}let ar=g?.closest?.(".rtile__resolve");if(ar){let Ee=ar.closest(".rtile");$t(Ee?.dataset.beadId||"");return}let On=g?.closest?.(".worker-mini__discard"),Bn=g?.closest?.(".worker-mini__discard-abandon");if(Bn){je(Bn.dataset.beadId||"",Bn.dataset.operationId||"",{kind:Bn.dataset.operationKind||"",last_error:Bn.dataset.lastError||""});return}if(On){ce(On.dataset.beadId||"",On.dataset.attemptId||null,On.dataset.discardMode==="merged"?"merged":"unmerged",On.dataset.operationId||null);return}let Ke=g?.closest?.(".worker-mini__stale-continue");if(Ke){Ze("worker-stale-work-continue",Ke.dataset.beadId||"",Ke.dataset.actionId||"");return}let qt=g?.closest?.(".worker-mini__stale-backup");if(qt){Ze("worker-stale-work-backup-fresh",qt.dataset.beadId||"",qt.dataset.actionId||"");return}let kn=g?.closest?.(".worker-mini__stale-recheck");if(kn){Ze("worker-stale-work-recheck",kn.dataset.beadId||"",kn.dataset.actionId||"");return}let et=g?.closest?.(".worker-mini__revise-fix");if(et){Je("worker-revise-fix",et.dataset.beadId||"");return}let w=g?.closest?.(".worker-mini__revise-approve");if(w){Je("worker-revise-approve",w.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;let I=g?.closest?.(".rtile__failure-badge");if(I){let Ee=I.dataset.attemptId||"";R=R===Ee?null:Ee,x();return}let U=g?.closest?.(".rtile__provider-hold-badge");if(U){let Ee=U.dataset.attemptId||"";N=N===Ee?null:Ee,x();return}let ke=g?.closest?.(".rtile__attempt-copy");if(ke){let Ee=ke.dataset.attemptId||"";Ee&&_n(Ee).then(it=>{be(it?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",it?"success":"error",1400)});return}if(g?.closest?.(".rtile__parked-retry")){let Ee=g?.closest?.(".rtile");ie(Ee?.dataset?.beadId||"",Ee?.dataset?.attemptId||"");return}let We=g?.closest?.(".rtile__discard-abandon");if(We){let it=g?.closest?.(".rtile")?.dataset?.beadId;it&&je(it,We.dataset.operationId||"",{kind:We.dataset.operationKind||"",last_error:We.dataset.lastError||""});return}let nt=g?.closest?.(".rtile__discard");if(nt){let Ee=g?.closest?.(".rtile"),it=Ee?.dataset?.beadId,Yt=Ee?.dataset?.attemptId;it&&ce(it,Yt||null,nt.dataset.confirmation==="merged"?"merged":"unmerged",nt.dataset.operationId||null);return}if(g?.closest?.(".rtile__pause")){let it=g?.closest?.(".rtile")?.dataset?.attemptId;it&&Wt(it);return}if(g?.closest?.(".rtile__resume-alternate")){let it=g?.closest?.(".rtile")?.dataset?.attemptId;it&&He(it);return}if(g?.closest?.(".rtile__resume")){let Ee=g?.closest?.(".rtile__resume"),Yt=g?.closest?.(".rtile")?.dataset?.attemptId;Yt&&yt(Yt,Ee?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(g?.closest?.(".rtile__session")){let Ee=g?.closest?.(".rtile"),it=Ee?.dataset?.attemptId;if(it){ea(it);return}let Yt=Ee?.dataset?.beadId;Yt&&ta(Yt);return}if(g?.closest?.(".rtile__failure-pop"))return;if(g?.closest?.(".worker-drawer-overlay__backdrop")){Xe.close(),Ue.close();return}if(g?.closest?.(".worker-drawer-host"))return;let Pt=g?.closest?.(".rtile .board-card__roll-toggle");if(Pt){let Ee=Pt.dataset.rollParent;Ee&&(C.has(Ee)?C.delete(Ee):C.add(Ee),x());return}let Ye=g?.closest?.(".rtile .board-card__roll-child");if(Ye){let Ee=Ye.dataset.childId;Ee&&i&&i(Ee);return}let kt=g?.closest?.(".rtile");if(kt){if(g?.closest?.(".rtile__id")){let it=kt.dataset.beadId;it&&_n(it).then(Yt=>{Yt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ee=kt.dataset.beadId;Ee&&i&&i(Ee);return}let $n=g?.closest?.(".worker-mini, .worker-card");if($n){let Ee=$n.dataset.beadId;if(g?.closest?.('[data-seam="log-path-copy"]'))return;if(g?.closest?.(".worker-mini__id, .worker-card__id")){Ee&&_n(Ee).then(Yt=>{Yt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let it=g?.closest?.(".ctl-chip--from");if(it){let Yt=it.dataset.fromId;Yt&&i&&i(Yt);return}Ee&&i&&i(Ee)}}function ra(b){let g=b.target;g?.closest?.(".worker-search")&&(G=g.value,x())}function oa(b){let g=b.target;b.key!=="Escape"||!g?.closest?.(".worker-search")||G.length===0||(G="",x())}me.attach(e),e.addEventListener("click",ys),e.addEventListener("change",Br),e.addEventListener("input",ra),e.addEventListener("keydown",oa);function Ur(b){let g=b.target,T=g&&typeof g.closest=="function"?de=>g.closest(de):()=>null,ne=!1;R&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,ne=!0),N&&!T(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(N=null,ne=!0),ne&&x()}function Wr(b){b.key==="Escape"&&(R===null&&N===null&&B===null||(R=null,N=null,B=null,x()))}return document.addEventListener("click",Ur),document.addEventListener("keydown",Wr),le.attach(),we.push(()=>{document.removeEventListener("click",Ur),document.removeEventListener("keydown",Wr),le.detach()}),xe(),h&&we.push(h.subscribe(()=>{ve.notifyIssuesChanged(),x()})),o&&we.push(o.subscribe(()=>{let b=l&&l()||"";b!==Z&&(Z=b,qe.close()),x(),na()})),x(),{load(){ve.ensureSessionDefaults(),x()},refreshSessionDefaults:Me,destroy(){for(let b of we.splice(0))try{b()}catch{}me.detach(),e.removeEventListener("click",ys),e.removeEventListener("change",Br),ve.destroy();try{Ue.destroy()}catch{}Ge.hidden=!0;try{qe.destroy()}catch{}dt(c``,e)}}}function Kl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function h_(e,t,n,r=async()=>{},o=async()=>{}){let s=Dt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let K=M.target.value,P=t.getState().workspace?.current?.path||"";if(K&&K!==P){s("switching workspace to %s",K),l=!0,O();try{await n(K)}catch(G){s("workspace switch failed: %o",G)}finally{l=!1,O()}}}async function p(){let M=t.getState(),W=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!W||a)){s("git-pulling workspace %s",W),a=!0,O();try{await r(W)}catch(K){s("workspace git pull failed: %o",K)}finally{a=!1,O()}}}function h(M){let W=M.target;W&&e.contains(W)||R()}function _(M){M.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",_),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",_),O())}function N(){u?R():k()}async function B(M){let W=M.target,K=W.value,H=W.checked;s("toggling visibility %s \u2192 %s",K,String(H));try{await o(K,H)}catch(P){s("workspace visibility toggle failed: %o",P)}}function le(M){return M?c`
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
    `:c``}function z(M,W){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${M.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!W.has(K.path)}
                        @change=${B}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Kl(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let M=t.getState(),W=M.workspace?.current,K=M.workspace?.available||[],H=new Set(M.workspace?.hidden||[]),P=W?.path||K[0]?.path||"";if(K.length===0)return c``;let G=K.filter(V=>!H.has(V.path)||V.path===P);if(G.length<=1){let V=G[0]||K[0],J=Kl(V.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${V.path}"
            >${J}</span
          >
          ${z(K,H)}
          ${le(P)}
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
          ${G.map(V=>c`
              <option
                value="${V.path}"
                ?selected=${V.path===P}
                title="${V.path}"
              >
                ${Kl(V.path)}
              </option>
            `)}
        </select>
        ${z(K,H)}
        ${le(P)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){dt(q(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",_),dt(c``,e)}}}var b_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Yl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function y_(e,t,n=Yl()){return{id:n,type:e,payload:t}}function v_(e={}){let t=Dt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],p=new Map,h=new Set;function _(q){for(let O of Array.from(h))try{O(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),_(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*q,M=Math.max(0,Math.round(q+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,z()},M)}function R(q){try{o?.send(JSON.stringify(q))}catch(O){t("ws send failed",O)}}function N(){for(s="open",t("ws open"),_(s),i=0;d.length;){let q=d.shift();q&&R(q)}}function B(q){let O;try{O=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let W=u.get(O.id);u.delete(O.id),O.ok?W?.resolve(O.payload):W?.reject(O.error||new Error("ws error"));return}let M=p.get(O.type);if(M&&M.size>0)for(let W of Array.from(M))try{W(O.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",O.type)}function le(){s="closed",t("ws closed"),_(s);for(let[q,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(q);i+=1,k()}function z(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",_(s),o.addEventListener("open",N),o.addEventListener("message",B),o.addEventListener("error",()=>{}),o.addEventListener("close",le)}catch(O){t("ws connect failed %o",O),k()}}return z(),{send(q,O){if(!b_.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let M=Yl(),W=y_(q,O,M);return t("send %s id=%s",q,M),new Promise((K,H)=>{u.set(M,{resolve:K,reject:H,type:q}),o&&o.readyState===o.OPEN?R(W):(t("queue %s id=%s (state=%s)",q,M,s),d.push(W))})},on(q,O){p.has(q)||p.set(q,new Set);let M=p.get(q);return M?.add(O),()=>{M?.delete(O)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Ww(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function zw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Vl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],w_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],vr="tab:worker:closed",Hw="bdui.worker.done-range",k_=vf,$_="worker:queue",x_="ui:order",A_="ui:display-policy",S_="exec:presets",wr="tab:board:closed",E_="beads-ui.board.closed-range";function Gw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Kw(e))});return n.observe(e),()=>n.disconnect()}function Kw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Yw(e){let t=Dt("main");t("bootstrap start"),Gw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;dt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Ff(i),l&&a&&u&&d){let we=function(A,x){let xe="Request failed",Fe="";if(A&&typeof A=="object"){let ht=A;if(typeof ht.message=="string"&&ht.message.length>0&&(xe=ht.message),typeof ht.details=="string")Fe=ht.details;else if(ht.details&&typeof ht.details=="object")try{Fe=JSON.stringify(ht.details,null,2)}catch{Fe=""}}else typeof A=="string"&&A.length>0&&(xe=A);let ot=x&&x.length>0?`Failed to load ${x}`:"Request failed";oe.open(ot,xe,Fe)},$e=function(A){return`${Ae.getState().workspace.current?.path||""}\0${A}`},ft=function(){Ce&&(Ce().catch(()=>{}),Ce=null),me=null,De=null},He=function(A){Ue=A;let x=()=>{Ue!==A||Ae.getState().selected_id!==A||(Ue=null,lt(A))};if(!Z){qe.then(x);return}x()},Pe=function(A,x,xe,Fe,ot){return xe!==Re[x]?(ot().catch(()=>{}),!1):(A.set(Fe,ot),!0)},rt=function(){let A=Ae.getState();gt(A.view==="board"),S(A.view==="worker"),Ze(je(A)),se(A.view==="board"||A.view==="worker"||Ve||!!A.selected_id)},Wt=function(){let A=Tr(Qe);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},yt=function(){let A=Tr(ct);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},gt=function(A){if(A)for(let[x,xe]of Vl){if($.has(x)||Q.has(x))continue;let Fe=x===wr?Wt():{type:xe};try{Le.register(x,Fe)}catch(Ut){t("register %s store failed: %o",x,Ut)}Q.add(x);let ot=Re.board,ht=!1;he.subscribeList(x,Fe).then(Ut=>{ht=!Pe($,"board",ot,x,Ut)}).catch(Ut=>{t("subscribe %s failed: %o",x,Ut),we(Ut,"board")}).finally(()=>{Q.delete(x),ht&&rt()})}else $t()},$t=function(){Re.board+=1;for(let[A]of Vl){let x=$.get(A);x&&(x().catch(()=>{}),$.delete(A));try{Le.unregister(A)}catch(xe){t("unregister %s failed: %o",A,xe)}}},S=function(A){if(!A){j();return}for(let[x,xe]of w_){if(ue.has(x)||Q.has(x))continue;let Fe=x===vr?yt():{type:xe};try{Le.register(x,Fe)}catch(Ut){t("register %s store failed: %o",x,Ut)}Q.add(x);let ot=Re.worker,ht=!1;he.subscribeList(x,Fe).then(Ut=>{ht=!Pe(ue,"worker",ot,x,Ut)}).catch(Ut=>{t("subscribe %s failed: %o",x,Ut),we(Ut,"worker")}).finally(()=>{Q.delete(x),ht&&rt()})}},j=function(){Re.worker+=1;for(let[A]of w_){let x=ue.get(A);x&&(x().catch(()=>{}),ue.delete(A));try{Le.unregister(A)}catch(xe){t("unregister %s failed: %o",A,xe)}}},se=function(A){if(!A){ae();return}ie||(Me("subscribe-worker-queue",{id:$_}).catch(x=>{t("subscribe-worker-queue failed: %o",x)}),ie=()=>Me("unsubscribe-worker-queue",{id:$_}))},ae=function(){ie&&(ie().catch(()=>{}),ie=null)},je=function(A){return A.view==="monitor"||A.selected_id!=null},Ze=function(A){if(!A){Je();return}ce||(Me("subscribe-monitor-pipeline",{id:k_}).catch(x=>{t("subscribe-monitor-pipeline failed: %o",x)}),ce=()=>Me("unsubscribe-monitor-pipeline",{id:k_}))},Je=function(){ce&&(ce().catch(()=>{}),ce=null)},Tt=function(){Be||(Me("subscribe-ui-order",{id:x_}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),Be=()=>Me("unsubscribe-ui-order",{id:x_}))},Bt=function(){Be&&(Be().catch(()=>{}),Be=null),D.clear()},Qt=function(){xt||(Me("subscribe-display-policy",{id:A_}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),xt=()=>Me("unsubscribe-display-policy",{id:A_}))},Ct=function(){xt&&(xt().catch(()=>{}),xt=null),pe.clear()},Kt=function(){Rt||(Me("subscribe-impl-presets",{id:S_}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),Rt=()=>Me("unsubscribe-impl-presets",{id:S_}))},an=function(A){if(!A)return"Unknown";let x=A.split("/").filter(Boolean);return x.length>0?x[x.length-1]:"Unknown"},X=function(A,x){L.open(A.path,{missing_state:A.missing_state,...x?{workspace:x}:{}})};var p=we,h=$e,_=ft,k=He,R=Pe,N=rt,B=Wt,le=yt,z=gt,q=$t,O=S,M=j,W=se,K=ae,H=je,P=Ze,G=Je,V=Tt,J=Bt,ge=Qt,Oe=Ct,F=Kt,ee=an,Se=X;let Te=document.getElementById("header-loading"),C=qc(Te),oe=zp(e),ve=v_(),Me=C.wrapSend((A,x)=>ve.send(A,x)),he=Oc(Me),Le=Ic(),Ge=Pc(),at=uc(),D=Lc(),pe=lc(),re=cc(),_e=dc();ve.on("impl-presets-snapshot",A=>{let x=A;x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&re.set({revision:x.revision,presets:x.presets})}),ve.on("monitor-pipeline-snapshot",A=>{let x=A;if(!(!x||!Array.isArray(x.workspaces)))try{at.set(x.workspaces,x.workspaces_state,x.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",A=>{let x=A;if(x&&typeof x.revision=="number")try{D.set({revision:x.revision,order:x.order&&typeof x.order=="object"?x.order:{}})}catch{}}),ve.on("display-policy-snapshot",A=>{let x=A;if(x&&x.policy&&typeof x.policy=="object")try{pe.set(x.policy)}catch{}}),ve.on("session-log-snapshot",A=>{let x=A;if(x&&typeof x.id=="string")try{_e.set(x.id,Array.isArray(x.lines)?x.lines:[],typeof x.last_event_at=="number"?x.last_event_at:null)}catch{}}),ve.on("session-log-append",A=>{let x=A;if(x&&typeof x.id=="string")try{_e.append(x.id,x.event)}catch{}}),ve.on("snapshot",A=>{let x=A,xe=x&&typeof x.id=="string"?x.id:"",Fe=xe?Le.getStore(xe):null;if(Fe&&x&&x.type==="snapshot")try{Fe.applyPush(x)}catch{}}),ve.on("upsert",A=>{let x=A,xe=x&&typeof x.id=="string"?x.id:"",Fe=xe?Le.getStore(xe):null;if(Fe&&x&&x.type==="upsert")try{Fe.applyPush(x)}catch{}}),ve.on("delete",A=>{let x=A,xe=x&&typeof x.id=="string"?x.id:"",Fe=xe?Le.getStore(xe):null;if(Fe&&x&&x.type==="delete")try{Fe.applyPush(x)}catch{}});let Ce=null,me=null,De=null,Ue=null,Xe=()=>{},qe=new Promise(A=>{Xe=()=>A(void 0)}),Z=!1,Y=!1;async function lt(A){let x=$e(A);if(x===me||x===De)return;De=x;let xe=`detail:${A}`,Fe={type:"issue-detail",params:{id:A}};try{Le.register(xe,Fe)}catch(ot){t("register detail store failed: %o",ot)}try{let ot=await he.subscribeList(xe,Fe);if(Ae.getState().selected_id!==A||$e(A)!==x){await ot().catch(()=>{});return}Ce&&await Ce().catch(()=>{}),Ce=ot,me=x}catch(ot){t("detail subscribe failed: %o",ot),we(ot,"issue details")}finally{De===x&&(De=null)}}let $=new Map,Q=new Set,Re={board:0,worker:0},Ve=!1,Qe=Ss;try{let A=window.localStorage.getItem(E_);pa(A)&&(Qe=A)}catch{}let ct="today";try{let A=window.localStorage.getItem(Hw);A!==null&&(ct=Un(A))}catch{}async function vt(A){if(!pa(A)||A===Qe)return;Qe=A;try{window.localStorage.setItem(E_,A)}catch{}let x=$.get(wr);if(!x)return;$.delete(wr),await x().catch(()=>{});let xe=Wt();try{Le.register(wr,xe)}catch(Fe){t("register %s store failed: %o",wr,Fe)}try{let Fe=await he.subscribeList(wr,xe);$.set(wr,Fe)}catch(Fe){t("re-subscribe %s failed: %o",wr,Fe),we(Fe,"board")}}async function Mt(A){let x=Un(A);if(x===ct)return;ct=x;let xe=ue.get(vr);if(!xe)return;ue.delete(vr),await xe().catch(()=>{});let Fe=yt();try{Le.register(vr,Fe)}catch(ot){t("register %s store failed: %o",vr,ot)}try{let ot=await he.subscribeList(vr,Fe);ue.set(vr,ot)}catch(ot){t("re-subscribe %s failed: %o",vr,ot),we(ot,"worker")}}let ue=new Map,ie=null,ce=null,Be=null,xt=null,Rt=null;async function _t(){xt=null,pe.clear(),Rt=null,re.clear(),ie=null,ce=null,$.clear(),ue.clear(),Re.board+=1,Re.worker+=1,Kt();let A=Ae.getState().workspace.current?.path;if(A)try{await ve.send("set-workspace",{path:A})}catch(xe){t("workspace restore after reconnect failed: %o",xe);return}Qt();let x=Ae.getState();gt(x.view==="board"),S(x.view==="worker"),Ze(je(x)),se(x.view==="board"||x.view==="worker"||!!x.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),$t(),j(),ae(),Ge.clear(),Bt(),Tt(),Ct(),Qt(),ft();let A=Ae.getState();if(A.selected_id)try{Le.unregister(`detail:${A.selected_id}`)}catch{}let x=Ae.getState();gt(x.view==="board"),S(x.view==="worker"),Ze(je(x)),se(x.view==="board"||x.view==="worker"||!!x.selected_id),x.selected_id&&He(x.selected_id)}async function Jt(A){t("requesting workspace switch to %s",A),Y=!0;try{let x=await ve.send("set-workspace",{path:A});t("workspace switch result: %o",x),x&&x.workspace&&(Ae.setState({workspace:{current:{path:x.workspace.root_dir,database:x.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),x.changed&&(await zt(),be("Switched to "+an(A),"success",2e3)))}catch(x){throw t("workspace switch failed: %o",x),be("Failed to switch workspace","error",3e3),x}finally{Y=!1}}async function Nt(A){t("requesting workspace git pull for %s",A);try{let x=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",x);let xe=x?.status;if(xe==="up_to_date"){be("Already up to date","success",2e3);return}if(xe==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+an(A),"success",2e3)}catch(x){t("workspace git pull failed: %o",x);let xe=x?.code,Fe=x?.message;if(xe==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(xe==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(xe==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let ot=Fe?`: ${Fe}`:"";throw be(`Git pull failed${ot}`,"error",3e3),x}}async function un(A,x){t("setting workspace visibility %s \u2192 %s",A,String(x));try{await ve.send("set-workspace-visibility",{path:A,visible:x}),await Ht()}catch(xe){t("workspace visibility update failed: %o",xe),be("Failed to update project visibility","error",3e3)}}async function Ht(){try{let A=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let x=A.workspaces.map(ht=>({path:ht.path,database:ht.database,pid:ht.pid,version:ht.version})),xe=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,Fe=Array.isArray(A.hidden)?A.hidden.filter(ht=>typeof ht=="string"):[];Ae.setState({workspace:{current:xe,available:x,hidden:Fe}});let ot=window.localStorage.getItem("beads-ui.workspace");ot&&(!x.some(Ut=>Ut.path===ot)||Fe.includes(ot)?window.localStorage.removeItem("beads-ui.workspace"):xe&&ot!==xe.path&&(t("restoring saved workspace preference: %s",ot),await Jt(ot)))}}catch(A){t("failed to load workspaces: %o",A)}}ve.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(Ae.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),Ht(),zt())});let dn=!1;if(typeof ve.onConnection=="function"){let A=x=>{t("ws state %s",x),x==="reconnecting"||x==="closed"?(dn=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):x==="open"&&dn&&(dn=!1,be("Reconnected","success",2200),zw(Ae,(xe,Fe)=>{t(`${xe}: %o`,Fe)}),_t())};ve.onConnection(A)}let en="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(en=A)}catch(A){t("view parse error: %o",A)}let Ae=Nc({config:Ww(),view:en});ve.on("worker-queue-snapshot",A=>{let x=A;if(!x||!x.queue)return;let xe=Ae.getState().workspace.current?.path;if(typeof xe=="string"&&xe.length>0&&x.root_dir!==xe){t("dropping worker-queue snapshot for %s",String(x.root_dir));return}try{Ge.set(x.queue)}catch{}});let E=Dc(Ae);E.start();let ye=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ne=async(A,x)=>{try{return await Me(A,x)}catch(xe){if(ye.has(A))throw xe;return[]}};kf({global_element:r,repo_element:o},Ae,E);let y=document.getElementById("workspace-picker");y&&h_(y,Ae,Jt,Nt,un);let v=Sf(e,(A,x)=>Me(A,x));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>v.open())}catch{}let f=Rf(e,{policyStore:pe,queueStore:Ge,implPresetStore:re,transport:(A,x)=>Me(A,x),onOpenChange:A=>{let x=Ve;Ve=A,rt(),x&&A===!1&&fe.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[x]of Vl)for(let xe of Le.snapshotFor(x)||[]){let Fe=xe.labels;if(Array.isArray(Fe))for(let ot of Fe)typeof ot=="string"&&ot.length>0&&A.add(ot)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>f.open()))}catch{}let m=document.createElement("div");m.className="md-viewer-root",document.body.appendChild(m);let L=Bi(m,{getWorkspacePath:()=>Ae.getState().workspace.current?.path}),te=eu(l,{gotoIssue:A=>E.gotoIssue(A),issueStores:Le,transport:Ne,workerQueueStore:Ge,uiOrderStore:D,displayPolicyStore:pe,closedRange:Qe,onClosedRangeChange:A=>{vt(A)},onNewIssue:()=>v.open(),openDoc:X}),fe=Gl(a,{transport:Ne,issueStores:Le,queueStore:Ge,sessionLogStore:_e,gotoIssue:A=>Ae.setState({selected_id:A}),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:A=>Jt(A),openDoc:X,doneRange:ct,onDoneRangeChange:A=>{Mt(A)}}),ut=wf(u,{transport:Ne,pipelineStore:at,execPresetStore:re,sessionLogStore:_e,router:E,gotoIssue:A=>E.gotoIssue(A),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:A=>Jt(A),openDoc:X}),mt=Wp(d,{issueStores:Le,transport:Ne,queueStore:Ge,execPresetStore:re,sessionLogStore:_e,getWorkspacePath:()=>Ae.getState().workspace.current?.path,mdViewer:L,depCandidates:()=>{let A=at.get();if(A===null)return null;let x=at.getWorkspacesState(),xe=Ae.getState();if(xe.view==="monitor")return ol(A,x);let Fe=xe.workspace.current?.path;return Fe?ol(A,x,{root_dir:Fe}):null},subscribeCandidates:A=>at.subscribe(A),onDepChanged:({type:A,a:x,b:xe})=>{let Fe=ut;A==="dep-add"&&Fe&&typeof Fe.recorrectSharedLane=="function"&&Fe.recorrectSharedLane(A,x,xe)},onNavigate:(A,x)=>{let xe=()=>{Ae.getState().view==="worker"?Ae.setState({selected_id:A}):E.gotoIssue(A)},Fe=Ae.getState().workspace.current?.path;if(typeof x!="string"||x.length===0||!Fe||x===Fe){xe();return}Promise.resolve(Jt(x)).then(xe).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=Ae.getState();Ae.setState({selected_id:null});try{E.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),pt=Ae.getState().selected_id;pt&&(d.hidden=!1,mt.load(pt),He(pt)),Ae.subscribe(A=>{let x=A.selected_id;x?(d.hidden=!1,mt.load(x),Y||He(x)):(mt.clear(),d.hidden=!0,ft())});let It=A=>{l.hidden=A.view!=="board",a.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",s&&s.classList.toggle("is-quiet",A.view==="monitor"),gt(A.view==="board"),S(A.view==="worker"),Ze(je(A)),se(A.view==="board"||A.view==="worker"||Ve||!!A.selected_id),!A.selected_id&&A.view==="board"&&te.load(),A.view==="worker"&&fe.load(),A.view==="monitor"?ut.load():ut.pause(),window.localStorage.setItem("beads-ui.view",A.view)};Ae.subscribe(It),It(Ae.getState()),Tt(),Qt(),Kt(),Ht().finally(()=>{Z=!0,Xe()}),window.addEventListener("keydown",A=>{let x=A.ctrlKey||A.metaKey,xe=String(A.key||"").toLowerCase(),Fe=A.target,ot=Fe&&Fe.tagName?String(Fe.tagName).toLowerCase():"",ht=ot==="input"||ot==="textarea"||ot==="select"||Fe&&typeof Fe.isContentEditable=="boolean"&&Fe.isContentEditable;x&&xe==="n"&&(ht||(A.preventDefault(),v.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Yw(t)});export{Yw as bootstrap,Ww as readBootstrapConfig,zw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
