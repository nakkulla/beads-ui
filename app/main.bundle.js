var f_=Object.create;var Xi=Object.defineProperty;var __=Object.getOwnPropertyDescriptor;var m_=Object.getOwnPropertyNames;var g_=Object.getPrototypeOf,h_=Object.prototype.hasOwnProperty;var b_=(e,t,n)=>t in e?Xi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Qi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var y_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of m_(t))!h_.call(e,o)&&o!==n&&Xi(e,o,{get:()=>t[o],enumerable:!(r=__(t,o))||r.enumerable});return e};var v_=(e,t,n)=>(n=e!=null?f_(g_(e)):{},y_(t||!e||!e.__esModule?Xi(n,"default",{value:e,enumerable:!0}):n,e));var It=(e,t,n)=>b_(e,typeof t!="symbol"?t+"":t,n);var rc=Qi((Bw,nc)=>{var zr=1e3,Hr=zr*60,Gr=Hr*60,Sr=Gr*24,$_=Sr*7,x_=Sr*365.25;nc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return A_(e);if(n==="number"&&isFinite(e))return t.long?E_(e):S_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function A_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*x_;case"weeks":case"week":case"w":return n*$_;case"days":case"day":case"d":return n*Sr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Gr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Hr;case"seconds":case"second":case"secs":case"sec":case"s":return n*zr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function S_(e){var t=Math.abs(e);return t>=Sr?Math.round(e/Sr)+"d":t>=Gr?Math.round(e/Gr)+"h":t>=Hr?Math.round(e/Hr)+"m":t>=zr?Math.round(e/zr)+"s":e+"ms"}function E_(e){var t=Math.abs(e);return t>=Sr?ks(e,t,Sr,"day"):t>=Gr?ks(e,t,Gr,"hour"):t>=Hr?ks(e,t,Hr,"minute"):t>=zr?ks(e,t,zr,"second"):e+" ms"}function ks(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var sc=Qi((Uw,oc)=>{function T_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=rc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,m,k;function R(...j){if(!R.enabled)return;let B=R,ie=Number(new Date),z=ie-(_||ie);B.diff=z,B.prev=_,B.curr=ie,_=ie,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let N=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(L,U)=>{if(L==="%%")return"%";N++;let K=n.formatters[U];if(typeof K=="function"){let H=j[N];L=K.call(B,H),j.splice(N,1),N--}return L}),n.formatArgs.call(B,j),(B.log||n.log).apply(B,j)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:j=>{h=j}}),typeof n.init=="function"&&n.init(R),R}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,_){let h=0,m=0,k=-1,R=0;for(;h<d.length;)if(m<_.length&&(_[m]===d[h]||_[m]==="*"))_[m]==="*"?(k=m,R=h,m++):(h++,m++);else if(k!==-1)m=k+1,R++,h=R;else return!1;for(;m<_.length&&_[m]==="*";)m++;return m===_.length}function i(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function l(d){for(let _ of n.skips)if(s(d,_))return!1;for(let _ of n.names)if(s(d,_))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}oc.exports=T_});var ic=Qi((yn,$s)=>{yn.formatArgs=R_;yn.save=O_;yn.load=I_;yn.useColors=C_;yn.storage=L_();yn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();yn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function C_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function R_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+$s.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}yn.log=console.debug||console.log||(()=>{});function O_(e){try{e?yn.storage.setItem("debug",e):yn.storage.removeItem("debug")}catch{}}function I_(){let e;try{e=yn.storage.getItem("debug")||yn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function L_(){try{return localStorage}catch{}}$s.exports=sc()(yn);var{formatters:D_}=$s.exports;D_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var vo=globalThis,ms=vo.trustedTypes,Fl=ms?ms.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ji="$lit$",zn=`lit$${Math.random().toFixed(9).slice(2)}$`,ea="?"+zn,w_=`<${ea}>`,kr=document,wo=()=>kr.createComment(""),ko=e=>e===null||typeof e!="object"&&typeof e!="function",ta=Array.isArray,Gl=e=>ta(e)||typeof e?.[Symbol.iterator]=="function",Zi=`[ 	
\f\r]`,yo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bl=/-->/g,Ul=/>/g,vr=RegExp(`>|${Zi}(?:([^\\s"'>=/]+)(${Zi}*=${Zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wl=/'/g,zl=/"/g,Kl=/^(?:script|style|textarea|title)$/i,na=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=na(1),xo=na(2),Dw=na(3),Sn=Symbol.for("lit-noChange"),jt=Symbol.for("lit-nothing"),Hl=new WeakMap,wr=kr.createTreeWalker(kr,129);function Yl(e,t){if(!ta(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fl!==void 0?Fl.createHTML(t):t}var Vl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=yo;for(let l=0;l<n;l++){let a=e[l],u,d,_=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===yo?d[1]==="!--"?i=Bl:d[1]!==void 0?i=Ul:d[2]!==void 0?(Kl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=vr):d[3]!==void 0&&(i=vr):i===vr?d[0]===">"?(i=o??yo,_=-1):d[1]===void 0?_=-2:(_=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?vr:d[3]==='"'?zl:Wl):i===zl||i===Wl?i=vr:i===Bl||i===Ul?i=yo:(i=vr,o=void 0);let m=i===vr&&e[l+1].startsWith("/>")?" ":"";s+=i===yo?a+w_:_>=0?(r.push(u),a.slice(0,_)+Ji+a.slice(_)+zn+m):a+zn+(_===-2?l:m)}return[Yl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},$o=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Vl(t,n);if(this.el=e.createElement(u,r),wr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(o=wr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let _ of o.getAttributeNames())if(_.endsWith(Ji)){let h=d[i++],m=o.getAttribute(_).split(zn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?hs:k[1]==="?"?bs:k[1]==="@"?ys:xr}),o.removeAttribute(_)}else _.startsWith(zn)&&(a.push({type:6,index:s}),o.removeAttribute(_));if(Kl.test(o.tagName)){let _=o.textContent.split(zn),h=_.length-1;if(h>0){o.textContent=ms?ms.emptyScript:"";for(let m=0;m<h;m++)o.append(_[m],wo()),wr.nextNode(),a.push({type:2,index:++s});o.append(_[h],wo())}}}else if(o.nodeType===8)if(o.data===ea)a.push({type:2,index:s});else{let _=-1;for(;(_=o.data.indexOf(zn,_+1))!==-1;)a.push({type:7,index:s}),_+=zn.length-1}s++}}static createElement(t,n){let r=kr.createElement("template");return r.innerHTML=t,r}};function $r(e,t,n=e,r){if(t===Sn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=ko(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=$r(e,o._$AS(e,t.values),o,r)),t}var gs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??kr).importNode(n,!0);wr.currentNode=o;let s=wr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Ur(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new vs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=wr.nextNode(),i++)}return wr.currentNode=kr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Ur=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=$r(this,t,n),ko(t)?t===jt||t==null||t===""?(this._$AH!==jt&&this._$AR(),this._$AH=jt):t!==this._$AH&&t!==Sn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==jt&&ko(this._$AH)?this._$AA.nextSibling.data=t:this.T(kr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=$o.createElement(Yl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new gs(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Hl.get(t.strings);return n===void 0&&Hl.set(t.strings,n=new $o(t)),n}k(t){ta(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(wo()),this.O(wo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},xr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=jt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=$r(this,t,n,0),i=!ko(t)||t!==this._$AH&&t!==Sn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=$r(this,l[r+a],n,a),u===Sn&&(u=this._$AH[a]),i||(i=!ko(u)||u!==this._$AH[a]),u===jt?t=jt:t!==jt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},hs=class extends xr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===jt?void 0:t}},bs=class extends xr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==jt)}},ys=class extends xr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=$r(this,t,n,0)??jt)===Sn)return;let r=this._$AH,o=t===jt&&r!==jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==jt&&(r===jt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){$r(this,t)}},Xl={M:Ji,P:zn,A:ea,C:1,L:Vl,R:gs,D:Gl,V:$r,I:Ur,H:xr,N:bs,U:ys,B:hs,F:vs},k_=vo.litHtmlPolyfillSupport;k_?.($o,Ur),(vo.litHtmlVersions??(vo.litHtmlVersions=[])).push("3.3.1");var at=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Ur(t.insertBefore(wo(),s),s,void 0,n??{})}return o._$AI(e),o};var ws="today",Ql=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Wr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Fn(e){return e==="today"?"today":"7d"}function ra(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ar(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Zl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Jl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ec(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function tc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var ac=v_(ic(),1);function Nt(e){return(0,ac.default)(`beads-ui:${e}`)}function P_(e){let n=lc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function lc(e){return typeof e=="string"?e.trim():""}function M_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var N_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Kr(e){let t=P_(e),n=lc(M_(e).spec_review),r=N_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Rn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ao(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function _c(e,t){let n=Rn(e.created_at),r=Rn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function mc(e,t){let n=Rn(e.updated_at),r=Rn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function gc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Rn(e.created_at),s=Rn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function hc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var xs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function q_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(xs,e)}function sa(e){if(!e||typeof e!="object")return!1;let t=e;return q_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function cc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function uc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Kr(e).evidence==="published"?1:0;case"created":return cc(e.created_at);case"updated":return cc(e.updated_at);default:return null}}function dc(e,t,n){let r=uc(e,n.key),o=uc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function bc(e){let t=Array.isArray(e)?e.filter(sa):[];return(n,r)=>{for(let l of t){let a=dc(n,r,l);if(a!==0)return a}let o=dc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var j_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function pc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function fc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=j_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function yc(e,t){let n=pc(e),r=pc(t);if(n!==r)return n<r?-1:1;let o=fc(e),s=fc(t);if(o!==s)return o<s?-1:1;let i=Rn(e&&e.created_at),l=Rn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var oa=2**20;function Yr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Rn(e&&e.created_at)}function vc(e){return(t,n)=>{let r=Yr(t,e),o=Yr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ia(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Yr(l,n)-oa};if(!l)return{rank:Yr(i,n)+oa};let a=Yr(i,n),u=Yr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*oa}))}}function aa(e,t={}){let n=Nt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||Ao;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function _(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let R of k)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),s=m,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let R=r.get(k.id);if(!R)r.set(k.id,k);else{let j=Number.isFinite(R.updated_at)?R.updated_at:0,B=Number.isFinite(k.updated_at)?k.updated_at:0;if(j<=B){for(let ie of Object.keys(R))ie in k||delete R[ie];for(let[ie,z]of Object.entries(k))R[ie]=z}}d()}s=m,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:_,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function As(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function wc(e){let t=Nt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let R=k.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of _)typeof j=="string"&&j.length>0&&R.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&R.delete(j)}}async function s(l,a){let u=As(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let h=r.get(_.key);h&&(h.delete(l),h.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:As,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function kc(){let e=Nt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let _=u?As(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,h),m&&h&&_&&h!==_){let k=t.get(a);if(k)try{k.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let j=aa(a,d);t.set(a,j);let B=j.subscribe(()=>s());o.set(a,B)}else if(!m){let k=aa(a,d);t.set(a,k);let R=k.subscribe(()=>s());o.set(a,R)}return n.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function $c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function xc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function la(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function F_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function B_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ac(e){let t=Nt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):F_(r),i=B_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=la(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?la(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var U_=Object.freeze({workspace_config:{default_workspace:null}});function Sc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:U_.workspace_config.default_workspace}}}function Ec(e={}){let t=Nt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Sc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Sc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Tc(e){let t=Nt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(_,h)=>{let m=o++,k=Date.now();r.set(m,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",m,_,n+1),i();let R=!1,j=()=>{R||(R=!0,r.delete(m),l())},B=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,_,Date.now()-k),j())},3e4);try{let ie=await u(_,h),z=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,_,z),ie}catch(ie){let z=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,_,z,ie),ie}finally{clearTimeout(B),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Vr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(hc),a;switch(l){case"created_desc":return a.sort(Ao),a;case"created_asc":return a.sort(_c),a;case"updated_desc":return a.sort(mc),a;case"priority":return a.sort(gc),a;case"manual":default:{let u=n();return u?a.sort(vc(u)):a.sort(Ao),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function sr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function en(e){let t=sr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function fn(e,t){let n=sr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Cc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=sr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ss(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Es(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ss(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ts(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Cc(n);return{total:n.length,count:r,current:o,children:n}}function Rc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ia(l,a,u.order),i);o(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let m=r(ia(l,a,h.order),i);o(h,m);let k=await t("ui-order-set",{expected_revision:h.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:s}}function Oc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Hn(e,t){let n=Oc(e),r=Oc(t);return n.length===0||r.length===0?!1:n!==r}function Cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ca(e,t){return!t||typeof e!="string"||e.length===0||Cs(t.visible_labels).includes(e)?!0:Cs(t.hidden_labels).includes(e)?!1:!Cs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Ic(e,t){return Cs(e).filter(n=>ca(n,t))}function ir(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function W_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function z_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function H_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${W_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Rs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(yc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?z_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>H_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var G_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Dc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Lc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},K_={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Y_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Pc(e){let t=e&&e.fill||"none";return t==="none"?ar.none:e&&e.stale===!0?ar.stale:t==="dim"?ar.dim:e&&e.glyph==="review"?ar.review:e&&e.glyph==="skip"?ar.skip:ar.done}function V_(e){if(!e||e.fill==="none"||!e.approval_state)return Pc(e);let t=[];return e.glyph==="review"?t.push(ar.review):e.glyph==="skip"&&t.push(ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function X_(e,t,n,r){let o=G_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=K_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",_=Dc[e]||e,h=r?Mc(t):null;if(!h)return c`
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
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function Mc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Os(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Lc[e.route]||Lc.spec_backed,s=e.stages,i=Y_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Dc[u]||u} ${u==="plan"?V_(s[u]||{}):Pc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Mc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>X_(u,s[u]||{},u===i,r))}
    </div>
  `}function Q_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Nc=2;function qc(e){let t=e.slice(0,Nc).join(", "),n=e.length-Nc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Z_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Hn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${qc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${qc(s)}</span
      >`),n}function J_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ua(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Is(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Gn(e){return`${e.kind}:${Is(e)}@${e.sha}`}function Ls(e,t){if(!e)return null;let n=ua(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ua(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Gn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function jc(e,t){let n=Ls(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function em(e){if(!e)return null;let t=ua(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Gn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function tm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&ir(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&ir(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&ir(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=jc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(l)}`}
        >${`exec ${l.kind==="delegated"?Is(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Ic(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&ir(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ir(n,"blocked")){let l=J_(e.metadata);l&&o.push(l),o.push(...Z_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ir(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function nm(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${en(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${en(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function rm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Rs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:nm(e),empty_label:"children \uC5C6\uC74C",childChips:da,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function da(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ls(t,n)?c`<span class="board-card__roll-child-chips">
    ${jc(t,n)}
    ${em(n)}
  </span>`:null}function Ds(e,t){let n=Q_(e.priority);return c`
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
      ${tm(e,t)}
      ${e.workflow&&ir(t.policy||null,"stepper")?Os(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${rm(e,t)}
    </article>
  `}function Xr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Ql.map(s=>c`<option
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
        ${e.items.map(s=>Ds(s,t))}
      </div>
    </section>
  `}function Fc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ds(r,t))}
        </div>
      </div>
    </dialog>
  `}var om=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],sm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],im=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function am(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Bc(e,t,n){return c`
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
        ${om.map(r=>c`<option
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
        ${sm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${am(e,t,n)}
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
        ${im.map(r=>c`<option
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
  `}var lm=200,cm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},um=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Uc="beads-ui.board.sort",Wc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function dm(){try{let e=window.localStorage.getItem(Uc);if(e&&Wc.has(e))return e}catch{}return"created_desc"}function zc(e,t){let n=Nt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||ws,m=o?Vr(o,i):null,k=Rc({transport:s,uiOrderStore:i}),R=[],j=[],B=[],ie=[],z=[],N=[],C=!1,L=0,U=dm(),K=new Map,H=new Map,D=new Map,Y=new Set,X={search:"",priority:"",type:"",labels:[]},J=!1,_e=null;function Re(le){return String(le.status||"open")==="open"}function re(le){return String(le.status||"open")==="open"}function M(le){let ae=X.search.trim().toLowerCase(),x=X.priority,q=X.type,oe=X.labels;return le.filter(se=>{if(ae){let Ee=String(se.id||"").toLowerCase(),he=String(se.title||"").toLowerCase();if(!Ee.includes(ae)&&!he.includes(ae))return!1}if(x!==""&&String(se.priority)!==x||q!==""&&String(se.issue_type||"")!==q)return!1;if(oe.length>0){let Ee=Array.isArray(se.labels)?se.labels:[];if(!oe.some(he=>Ee.includes(he)))return!1}return!0})}function ve(){let le=new Set;for(let ae of[R,j,B,ie,z,N])for(let x of ae){let q=Array.isArray(x.labels)?x.labels:[];for(let oe of q)typeof oe=="string"&&oe.length>0&&le.add(oe)}return Array.from(le).sort()}function Te(){return X.search.trim()!==""||X.priority!==""||X.type!==""||X.labels.length>0}function E(){try{if(m){let le=m.selectBoardColumn("tab:board:in-progress","in_progress",U),ae=m.selectBoardColumn("tab:board:blocked","blocked",U).filter(re),x=new Set(le.map(ze=>ze.id)),q=m.selectBoardColumn("tab:board:ready","ready",U).filter(ze=>Re(ze)&&!x.has(ze.id)),oe=m.selectBoardColumn("tab:board:resolved","resolved",U),se=m.selectBoardColumn("tab:board:deferred","deferred",U),Ee=m.selectBoardColumn("tab:board:closed","closed").slice(0,lm),he=[...ae,...q,...le,...oe,...Ee];te(he);let Je=new Set;for(let ze of he)ze&&ze.id&&!Ss(ze)&&Je.add(ze.id);let ot=!Te();R=ot?So(ae,Je):ae,j=ot?So(q,Je):q,B=ot?So(le,Je):le,ie=ot?So(oe,Je):oe,z=se,L=se.length,N=ot?So(Ee,Je):Ee,K=new Map;for(let ze of R)K.set(ze.id,"open");for(let ze of j)K.set(ze.id,"open");for(let ze of B)K.set(ze.id,"in_progress");for(let ze of ie)K.set(ze.id,"resolved");for(let ze of z)K.set(ze.id,"deferred");for(let ze of N)K.set(ze.id,"closed");H=new Map;for(let ze of R)H.set(ze.id,"blocked-col");for(let ze of j)H.set(ze.id,"ready-col");for(let ze of B)H.set(ze.id,"in-progress-col");for(let ze of ie)H.set(ze.id,"resolved-col");for(let ze of N)H.set(ze.id,"closed-col")}We()}catch{R=[],j=[],B=[],ie=[],z=[],N=[],D=new Map,We()}}function te(le){D=Es(le)}function ke(le){return Ts(D,le)}function we(le){return!Y.has(le)}function Oe(le,ae){le.preventDefault(),le.stopPropagation(),Y.has(ae)?Y.delete(ae):Y.add(ae),We()}function xe(le,ae){le.preventDefault(),le.stopPropagation(),r(ae)}function Me(le,ae){le.preventDefault(),le.stopPropagation(),r(ae)}function He(le,ae){_e||r(ae)}function Ze(le,ae){le.preventDefault(),le.stopPropagation(),pm(ae).then(x=>{x&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function I(le,ae){_e=ae,le.dataTransfer&&(le.dataTransfer.setData("text/plain",ae),le.dataTransfer.effectAllowed="move"),le.target.classList.add("board-card--dragging")}function de(le){le.target.classList.remove("board-card--dragging"),Ot(),setTimeout(()=>{_e=null},0)}function ne(le){let ae=String(le.target.value||"");!ae||ae===h||(h=ae,u&&u(ae),We())}function ce(){return l?l.get():null}function $e(le){let ae=a?a.get():null,x=ae?ae.cleanup_failed:null;if(!x||typeof x!="object"||Array.isArray(x))return null;let q=x[le];return!q||typeof q!="object"||Array.isArray(q)?null:q}let me={onCardClick:He,onCopyId:Ze,onDragStart:I,onDragEnd:de,onClosedRangeChange:ne,rollupFor:ke,isExpanded:we,onRollupToggle:Oe,onChildClick:xe,onFromChipClick:Me,onOpenDoc:_?(le,ae)=>_(ae):void 0,cleanupFailureFor:$e,get policy(){return ce()}};function Ne(le,ae){_e||(y(),r(ae))}function Ge(le,ae){le.preventDefault(),le.stopPropagation(),y(),r(ae)}let et={...me,onCardClick:Ne,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:_?(le,ae)=>{y(),_(ae)}:void 0,get policy(){return ce()}};function Se(le){let ae=le.target,x=e.querySelector(".board-filter__labels");ae&&x&&x.contains(ae)||Be()}function Q(le){le.key==="Escape"&&Be()}function V(){J||(J=!0,document.addEventListener("mousedown",Se),document.addEventListener("keydown",Q),We())}function Be(){J&&(J=!1,document.removeEventListener("mousedown",Se),document.removeEventListener("keydown",Q),We())}function ut(le){le.key==="Escape"&&y()}function ct(){C||(C=!0,document.addEventListener("keydown",ut),We())}function y(){C&&(C=!1,document.removeEventListener("keydown",ut),We())}let G={onClose:y,onOverlayClick(le){le.target===le.currentTarget&&y()}},Ie={onSearchInput(le){X.search=String(le.target.value||""),E()},onPriorityChange(le){X.priority=String(le.target.value||""),E()},onTypeChange(le){X.type=String(le.target.value||""),E()},onSortChange(le){let ae=String(le.target.value||"");if(!(!Wc.has(ae)||ae===U)){U=ae;try{window.localStorage.setItem(Uc,ae)}catch{}E()}},onDeferredToggle(){C?y():ct()},onLabelMenuToggle(){J?Be():V()},onLabelToggle(le){let ae=X.labels.indexOf(le);ae===-1?X.labels.push(le):X.labels.splice(ae,1),E()},onLabelClear(){X.labels.length!==0&&(X.labels=[],E())},onNewIssue(){d&&d()}};function Pe(){return c`
      <div class="board-view">
        ${Bc(X,Ie,{sort_mode:U,deferred_popup_open:C,deferred_count:L,label_options:ve(),label_menu_open:J})}
        <div class="board-root">
          ${Xr({title:"Blocked",id:"blocked-col",items:M(R)},me)}
          ${Xr({title:"Ready",id:"ready-col",items:M(j)},me)}
          ${Xr({title:"In progress",id:"in-progress-col",items:M(B)},me)}
          ${Xr({title:"Resolved",id:"resolved-col",items:M(ie)},me)}
          ${Xr({title:"Closed",id:"closed-col",items:M(N),is_closed:!0,closed_range:h},me)}
        </div>
        ${C?Fc({items:M(z),count:L},et,G):""}
      </div>
    `}function We(){at(Pe(),e),Fe()}function Fe(){try{let le=e.querySelector("#deferred-popup");le&&!le.open&&(typeof le.showModal=="function"?le.showModal():le.setAttribute("open",""));let ae=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let x of ae)Array.from(x.querySelectorAll(".board-card")).forEach((oe,se)=>{oe.tabIndex=se===0?0:-1})}catch{}}async function Ye(le,ae){if(!s){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:le,status:ae}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(x){n("update-status failed: %o",x),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Rt(le){switch(le){case"blocked-col":return R;case"ready-col":return j;case"in-progress-col":return B;case"resolved-col":return ie;default:return[]}}function Mt(le,ae,x){if(!s||!i)return;let q=Rt(le),oe=q.find(ot=>ot.id===ae);if(!oe)return;let se=q.filter(ot=>ot.id!==ae),Ee=x.closest?x.closest(".board-card"):null,he=se.length;if(Ee){let ot=Ee.getAttribute("data-issue-id");if(ot===ae)return;let ze=se.findIndex(Tt=>Tt.id===ot);ze>=0&&(he=ze)}let Je=se.slice();Je.splice(he,0,oe),k.applyReorder(ae,Je,he)}function Ot(){for(let le of Array.from(e.querySelectorAll(".board-column--drag-over")))le.classList.remove("board-column--drag-over")}let yt=null;e.addEventListener("dragover",le=>{le.preventDefault(),le.dataTransfer&&(le.dataTransfer.dropEffect="move");let x=le.target.closest(".board-column");x&&x!==yt&&(yt&&yt.classList.remove("board-column--drag-over"),x.classList.add("board-column--drag-over"),yt=x)}),e.addEventListener("dragleave",le=>{let ae=le.relatedTarget;(!ae||!e.contains(ae))&&yt&&(yt.classList.remove("board-column--drag-over"),yt=null)}),e.addEventListener("drop",le=>{le.preventDefault(),yt&&(yt.classList.remove("board-column--drag-over"),yt=null);let ae=le.target,x=ae.closest(".board-column");if(!x)return;let q=le.dataTransfer?.getData("text/plain")||"";if(!q)return;let oe=x.id,se=H.get(q);if(se&&se===oe){if(um.has(oe)){if(U!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(oe,q,ae)}return}let Ee=cm[oe];if(!Ee){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}K.get(q)!==Ee&&Ye(q,Ee)}),e.addEventListener("keydown",le=>{let ae=le.target;if(!(ae instanceof HTMLElement))return;let x=String(ae.tagName||"").toLowerCase();if(x==="input"||x==="textarea"||x==="select"||x==="button"||x==="a"||ae.isContentEditable===!0)return;let q=ae.closest(".board-card");if(!q)return;let oe=String(le.key||"");if(oe==="Enter"||oe===" "){le.preventDefault();let Je=q.getAttribute("data-issue-id");Je&&r(Je);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;le.preventDefault();let se=q.closest(".board-column");if(!se)return;let Ee=Array.from(se.querySelectorAll(".board-card")),he=Ee.indexOf(q);if(oe==="ArrowDown"&&he<Ee.length-1){pt(q,Ee[he+1]);return}if(oe==="ArrowUp"&&he>0){pt(q,Ee[he-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),ot=Je.indexOf(se),ze=oe==="ArrowRight"?1:-1,Tt=ot+ze;for(;Tt>=0&&Tt<Je.length;){let Dt=Je[Tt].querySelector(".board-card");if(Dt){pt(q,Dt);return}Tt+=ze}}});function pt(le,ae){try{le.tabIndex=-1,ae.tabIndex=0,ae.focus()}catch{}}let Et=null;m&&m.subscribe&&(Et=m.subscribe(()=>{try{E()}catch{}}));let Lt=null;l&&l.subscribe&&(Lt=l.subscribe(()=>{try{E()}catch{}}));let qt=null;return a&&a.subscribe&&(qt=a.subscribe(()=>{We()})),{async load(){n("load"),E()},clear(){Be(),y(),Et&&(Et(),Et=null),Lt&&(Lt(),Lt=null),qt&&(qt(),qt=null),e.replaceChildren(),R=[],j=[],B=[],ie=[],z=[],N=[],K=new Map,H=new Map}}}function So(e,t){return e.filter(n=>{let r=Ss(n);return!(r&&t.has(r))})}async function pm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var cn=e=>e??jt;async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Er(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Eo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function fm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Er(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Er(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Kn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await fm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var _m=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Hc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Gc={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},mm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ft(e){return typeof e=="string"&&e.length>0?e:null}function Zr(e){return e.startsWith("gpt-")?e.slice(4):e}function St(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Yc(e,t,n){let r=Ft(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ft(n[e]);return o===null?null:{value:o,source:"global"}}function Qr(e,t,n,r){return Yc(e,t,n)||{value:r,source:"base"}}function pa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Qt(o?.[t])){let i=Ft(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Qt(o)){for(let i of Object.values(o))if(Qt(i)){let l=Ft(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ft(r?.runners?.[s]?.models?.[e]?.id)||e}function gm(e,t){return Ft(t?.review?.reviewers?.[e]?.model)||e}function Tr(e,t,n=!1){if(e==="default")return St(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Zr(e):e;return St(e,t,r,e,"explicit")}function Vc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Qt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Qt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function hm(e,t){let n=[],r=e?.implementation?.model_catalog;Qt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Qt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function bm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of hm(t,n)){let s=Vc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function fa(e){return St(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Kc(e,t,n){let r=Yc(e,t,n);return r?Tr(r.value,r.source):St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function $n(e){let t=Qt(e.pin)?e.pin:{},n=Qt(e.global)?e.global:{},r=Qt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Qt(r.session)?r.session:null,s=r?.supported===!0&&Qt(r.orchestration)?r.orchestration:null,i=Qt(e.runner_catalog)?e.runner_catalog:null,l=Ft(n.quick_fix_impl_model),a=bm(l,o,i),u={};if(o){let d=Qr("workflow_mode",t,n,Ft(o.workflow_mode_default));u.workflow_mode=d.source==="base"?St(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Tr(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let N=`${z}_model`,C=Ft(z==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=Qr(N,t,n,C);if(L.value===null)u[N]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!Qt(o.review?.reviewers?.[L.value]))u[N]=fa(St(L.value,L.source,"",null,"explicit"));else{let U=gm(L.value,o);u[N]=St(L.value,L.source,Zr(U),U,L.source==="base"?"default":"explicit")}}for(let[z,N]of Object.entries(Hc)){let C=u[N].value;if(C==="self"||C==="skip"){u[z]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Ft(o.review?.reviewers?.[C||""]?.effort),U=Qr(z,t,n,L);u[z]=U.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}for(let[z,N]of Object.entries(Gc)){let C=u[N];if(C.resolution==="incompatible"||C.value==="self"||C.value==="skip"){u[z]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(C.resolution==="unavailable"){u[z]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let L=Qr(z,t,n,"default");u[z]=L.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Tr(L.value,L.source)}let _=Qt(o.implementation?.default)?o.implementation.default:{},h=Ft(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=Qt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=m&&Qt(k[h])?k[h]:{};for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=Qr(z,t,n,z==="impl_dispatch"?Ft(R.dispatch)||Ft(_.dispatch):Ft(_[z.replace("impl_","")]));u[z]=N.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let j=Ft(t.impl_runtime),B=j==="inherit"?Ft(e.controller_runtime):j,ie=h==="quick_fix"&&Ft(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||B===a.runtime);if(ie){let z=a.runtime,N=l;u.impl_dispatch=St("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=St(z,"global",`${z} (\uC720\uB3C4)`,z,"explicit")),Ft(t.impl_model)===null&&(u.impl_model=St(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Ft(e.controller_runtime):u.impl_runtime.value,N=z?Vc(z,o,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=fa(u.impl_model);else{let C=pa(u.impl_model.value,z,o,i);u.impl_model.display=Zr(C),u.impl_model.full_value=C}}if(u.impl_effort.value==="auto"){let z=Ft(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=z?Ft(o.implementation?.effort_by_transport?.[z]?.auto):null;N&&!mm.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",u.impl_speed.source))}}else for(let d of _m.filter(_=>!_.startsWith("orchestration_")))u[d]=Kc(d,t,n);if(!o){for(let[d,_]of Object.entries(Hc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,_]of Object.entries(Gc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Kc(d,t,n);continue}let _=d.replace("orchestration_",""),h=Ft(s[_]),m=Qr(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=St(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Ft(s.model_id)||m.value:pa(m.value,null,o,i);u[d]=St(m.value,m.source,Zr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):Tr("default",m.source);continue}u[d]=Tr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=St(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Zr(d)})`,null,"default")}else if(a.runtime!==null){let d=pa(l,a.runtime,o,i);u.quick_fix_impl_model=St(l,"global",Zr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=fa(St(l,"global","",null,"explicit")):u.quick_fix_impl_model=Tr(l,"global");return u}function ym(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ps(e){let t=Qt(e.pin)?e.pin:{},n=Qt(e.global)?e.global:{},r=Qt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=_=>{let h={...r,..._};return $n({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ft(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:ym(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(_=>{let h=o({...s,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Jr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=_=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function _a(e){return`session:${e.provider}:${e.session_id}`}function To(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function vm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function eo(e,t,n,r){return{attempt_id:_a(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:To(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:vm(e,n)}}}var ma="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",wm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Xc="\uBD84\uD574 \uC5C6\uB294 leg";function Gt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Un=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],to=[...Un,"reasoning_output_tokens"],km={codex:["implementation","review-consult"],claude:["subagent"]};function ga(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Un.some(t=>Number.isFinite(e[t]))}function $m(e){return!e||typeof e!="object"?!1:to.some(t=>Number.isFinite(e[t]))}function ha(e){let t=0;for(let n of Un)t+=Gt(e?.[n]);return t}function xm(e){return!e||typeof e!="object"?!1:Un.some(t=>Number.isFinite(e[t]))}function Qc(e){return!e||typeof e!="object"?!1:to.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Am(e){let t={};for(let n of to)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Zc(e){let t={};for(let n of to)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Jc(e,t){return ga(t)?Gt(t.total_tokens):e==="codex"?Gt(t.input_tokens)+Gt(t.output_tokens):ha(t)}function Sm(e){return e==="claude"?"Claude":"Codex"}function Em(e){return`\u03C4 ${tu(e)}`}function Tm(e,t){let n=t.breakdown||{},r=Gt(t.total_only_subtotal);if(ga(n)||r>0&&!$m(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,wm];return t.replayed&&u.push(ma),u.join(`
`)}let o=[`\uC785\uB825 ${Gt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Gt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Gt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Gt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Gt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Gt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Gt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Xc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Xc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(ma),a.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Sm(n)} ${Em(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tm(n,r)})}return t}function Ns(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Gt(l.total_only_subtotal)+Gt(i.total_only_subtotal));for(let a of to)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Gt(l.breakdown[a])+Gt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ba(e){return!e||typeof e!="object"?null:Vn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Cm(e){return e==="codex"?"codex":"claude"}function Bn(){return{subtotal:0,breakdown:Am(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ms(e,t,n){e.subtotal+=t.subtotal,ga(t.usage)&&(e.total_only+=t.subtotal);for(let r of to)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Gt(e.breakdown[r])+Gt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function eu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function tu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function no(e){return xm(e)?`\u03C4 ${tu(ha(e))}`:null}function Yn(e){let t=no(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Co(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Gt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Gt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Gt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Gt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ha(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ma),n.join(`
`)}function Vn(e,t){let n={claude:Bn(),codex:Bn()},r={orchestrator:{claude:Bn(),codex:Bn()},implementation:{claude:Bn(),codex:Bn()},"review-consult":{claude:Bn(),codex:Bn()},subagent:{claude:Bn(),codex:Bn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Qc(a)){let d=Cm(l.runner),_=Zc(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Jc(d,_)};_.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Ms(n[d],h,!0),Ms(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!km[_].includes(d.role)||!Qc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=Zc(d.usage),k={provider:_,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Jc(_,m)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Ms(n[_],k,!1),Ms(r[k.role][_],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=eu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...eu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var Rm=".chip-popover, .judgement-chip";function ro(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let _=d.target;t!==null&&(_&&typeof _.closest=="function"&&_.closest(Rm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function oo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var nu={running:3,paused:2,failed:1};function Xn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function ru(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function ou(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Xn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Xn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),_=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!_&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=nu[u.run_state],_=nu[l];if(d>_||d===_&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var qs=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],va=[...qs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function su(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Qn=["orchestration_model","orchestration_effort","orchestration_speed"],so=[...qs,...Qn],Om=va.filter(e=>so.includes(e)),iu=["delegated","main"],js=["inherit","claude","codex"],io=["default","fast"],Ro=["standard","fast_track"],Oo=["codex","opus","fable","self","skip"],Fs=["codex","fable","skip"],Bs=["low","medium","high","xhigh"],au=["default","fast"],An="auto";function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function lu(e){if(!xn(e)||!xn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))xn(r)&&xn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ao(e,t){let n=lu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[An,...r.flatMap(([,o])=>o)]}function cu(e,t,n,r){if(!xn(e)||!xn(e.runners))return[An];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!xn(i)||!xn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==An&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[An,...o]}function lo(e,t,n){return cu(e,t,n,(r,o)=>xn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function wa(e,t,n){return cu(e,t,n,(r,o)=>xn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:xn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Io(e,t){let n=lu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function uu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!ao(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!lo(t,o,r.impl_model||An).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Im={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ya=[...Om,...Qn],Lm=[...so,...va].filter((e,t,n)=>n.indexOf(e)===t&&!ya.includes(e));function du(e,t){let n=xn(e)?e:{},r=xn(t)?t:{},o=[];for(let i of ya){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:Im[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Lm,...Object.keys(r)])!ya.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function ka(e,t,n,r,o,s){return Ps({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function pu(e,t){let n={};for(let r of va){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function fu(e,t){let n={};for(let r of Qn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var $a=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Qn]}],lr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Us={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function xa(e,t,n,r,o,s=null){let i=$n({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function _u(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of xa(e,t,n,r,o,s))i[l.source]+=1;return i}function mu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function gu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var y$=[...qs,...Qn];var hu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Lo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ws(e){if(!Lo(e)||!Lo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Lo(n)&&Lo(n.models));return t.length>0?t:null}function On(e,t){let n=Ws(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function bu(e,t){return Lo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function yu(e,t){let n=Ws(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return bu(r,r.models[t]);return[]}function Dm(e){let t=Ws(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of bu(r,o))n.includes(s)||n.push(s);return n}function Pm(e,t){if(!t)return Dm(e);let r=Ws(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of yu(e,s))o.includes(i)||o.push(i);return o}function vu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=On(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?yu(t,r.impl_model):Pm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Aa=new Set(["unavailable","not_applicable"]);function cr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function wu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ur(e,t){return t===null?null:`${lr[e]}: ${t.display} (${Us[t.source]})`}function Sa(e){return e.filter(t=>t!==null).join(`
`)}function Ea(e){if(typeof e!="object"||e===null)return null;let t=Er(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Sa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(lr.orchestration_model,e.model),n(lr.orchestration_effort,e.effort),n(lr.orchestration_speed,e.speed)])}}function co(e,t){let n=cr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=cr(e,"orchestration_effort"),o=cr(e,"orchestration_speed"),s=wu([On(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:Sa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ur("orchestration_model",n),ur("orchestration_effort",r),ur("orchestration_speed",o)])}}function Mm(e,t){return e===null||e.value===null||Aa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Nm(e){return e===null||Aa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function qm(e){return e===null?null:e.value==="auto"?"auto":Aa.has(e.resolution)?null:e.display}function Cr(e,t){if(typeof e!="object"||e===null)return null;let n=cr(e,"impl_dispatch"),r=cr(e,"impl_runtime"),o=cr(e,"impl_model"),s=cr(e,"impl_effort"),i=cr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":wu([Mm(r,t??null),Nm(o),qm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Sa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ur("impl_dispatch",n),ur("impl_runtime",r),ur("impl_model",o),ur("impl_effort",s),ur("impl_speed",i)])}}var jm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Fm=Object.freeze(["delivery_unproven:"]);function zs(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||jm.has(t))return"session";for(let n of Fm)if(t.startsWith(n))return"session";return"settlement"}var Bm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Um={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ta(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Um[n]||"").filter(n=>n.length>0)}var ku={orchestration_model:["fable"],impl_runtime:["claude"]},Ca={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function $u(e){return typeof e=="object"&&e!==null?e:null}function xu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Wm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Bm.includes(t))}function Do(e,t=e){let n=$u(e);if(!n)return null;let r=xu(n.rec_orchestration_model,ku.orchestration_model);if(r.length===0)return null;let o=xu(n.rec_impl_runtime,ku.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=$u(t)||{},l=Object.keys(s),a=0,u=0;for(let _ of l){let h=i[_];typeof h=="string"&&h.length>0&&(a+=1,h===s[_]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Wm(n.rec_reason),rec:s,state:d}}function Hs(e){if(!e||typeof e!="object")return"";let t=Ta(e),n=Ca[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Gs(e){return e.replace(/\/+$/,"")}function zm(e,t){let n=Gs(e),r=Gs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ks(e,t){let n=new Set;for(let r of e)for(let o of t){if(!zm(r,o))continue;let s=Gs(r),i=Gs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function Ra(e,t){return`${e}\0${t}`}function Au(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Oa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Po(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Su(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Po(o)})`,location_label:Po(o),scope:null,same_lane_ahead:!1};let i=Oa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Eu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ra(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ra(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of h){let R=r.get(k);R&&R!==u&&!m.includes(R)&&m.push(R)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let _=d.pop();if(_===a)return!0;!_||u.has(_)||(u.add(_),d.push(...o.get(_)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let _=n.get(d);s(d,l)&&_&&u.push(_)}u.length>0&&i.set(l,u)}return i}function Tu(e,t){return Ra(e,t)}var Hm=Object.freeze(["done","abandoned"]);function Cu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Hm.includes(e.phase)}async function Gm(e){let t=await _n(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Rr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Gm(e)}}
    >
      ⧉
    </button></span
  >`}function Vs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Iu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ir(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Lu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Ru(e){return e==="auto"||e==="click"?e:null}function Du(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let _=typeof u.started_at=="number"?u.started_at:0;_>=o&&(o=_,r=Ru(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=Ru(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Pu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Km(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Vs(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Mu(e,t){let n=Km(e,t);return n?c`<button
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
            title=${n.deploy.at?en(n.deploy.at):""}
            >${Xs(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ir(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function uo(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${en(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${en(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Ym(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function No(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function qo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Zs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Nu(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function Zn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(h=>h&&h.bead_id===t&&Cu(h)).sort((h,m)=>(h.requested_at||0)-(m.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Ym(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Nu(l),_=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:_,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function qu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ys(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Nu(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,i=n.revert_pr;return c`<div
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
  </div>`}var Vm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ju(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Vm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Js(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Mo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Xm(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ia(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Qm(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function ei(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ia(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ia(e.dependents),s=Ia(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Mo(d,"pred"))}${t}${o.map(d=>Mo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Mo(d,"released"))}${s.map(d=>Mo(Xm(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Fu(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Mo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function ti(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function ni(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Zm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Bu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ri(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Hs(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Jm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function eg(e,t=!1){let n=Uu(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Uu(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Wu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function oi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function tg(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=Yn(e.usage),o=fn(e.done_at);return c`<div
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
      ${Wu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${en(e.done_at)}`}
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
    ${Fu(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Co(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Iu(e.work_kind)}
            >작업 ${Ir(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function In(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return tg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=an(e.usage),s=Yn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?fn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":ni(e.workflow),R=e.lane==="done"?"":Bu(e.from_id),j=oi(e.priority),B=c`<span class="worker-mini__title">${e.title}</span>`,ie=Wu(e.pr_url,e.pr_number),z=r.map(Ze=>Ze===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ze}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ze===e.completion_badge&&e.completion_title||""}
          >${Ze}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",C=o.length>0?o.map(Ze=>c`<span class="worker-usage" title=${Ze.tooltip}
              >${Ze.label}</span
            >`):s?c`<span class="worker-usage" title=${Co(e.usage)}
            >${s}</span
          >`:"",L=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?c`<button
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
      </button>`:"",H=e.discard,D=H?.action||e.discard_action?c`<button
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
        </button>`:"",Y=H?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${H.operation.operation_id}
        data-operation-kind=${H.operation.kind||""}
        data-last-error=${H.error||""}
        title=${H.abandon.title}
      >
        ${H.abandon.label}
      </button>`:"",X=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",J=H?.abandon.action?c`${D}${Y}${X}`:c`${X}${D}`,_e=e.stale_work||null,Re=_e?c`${_e.can_resume||_e.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${_e.action_id}
            ?disabled=${_e.locked}
          >
            기존 작업 이어가기
          </button>`:""}${_e.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${_e.action_id}
            ?disabled=${_e.locked}
          >
            백업 후 새로 시작
          </button>`:""}${_e.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${_e.action_id}
            ?disabled=${_e.locked}
          >
            다시 확인
          </button>`:""}`:"",re=_e?c`<div class="worker-mini__stale">
        <strong>${_e.title}</strong>
        <span>${_e.summary}</span>
        <span>${_e.cause}</span>
        ${_e.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",M=e.revise_action?c`<button
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
        </button>`:"",ve=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=ri(e.rec,Or(e,"rec")),E=eg(e,Or(e,"receipt")),te=ti(e.cross_lane_chip),ke=Rr(e.log_path),we=h||te||k||R||ve||Te||E||C||ke?c`<div class="worker-chips">
          ${h}${te}${k}${R}${ve?Js(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${E}${C}${ke}${La(e)}
        </div>`:"",Oe=ei(e.dependency_chips),xe=Ys(e),Me=t.actions?t.actions:"",He=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||H?.operation||e.revise_action||_e);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${h}${m}${j}${R}${ie}${B}${Me}
          </div>
          ${Fu(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${C}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${en(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Iu(e.work_kind)}
                  >작업 ${Ir(e.work_ms)}</span
                >`:""}${z}${L}
            <span class="worker-mini__actions"
              >${U}${K}${J}</span
            >
            ${uo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${_}${m}${j}${ie}${z}${N}${Me}
            </div>
            <div class="worker-mini__body">${B}${re}</div>
            ${Oe}${we}${He?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${U}${K}${J}${M}${Re}</span
                  >
                  ${Ys(e)}
                </div>`:""}
            ${uo(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${m}${j}${B}${ie}${z}${N}${L}${U}${K}${J}${Me}
            </div>
            ${Oe}${we}${xe} ${uo(e)}`}
  </div>`}function ng(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var zu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Pa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Ca[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ta(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=zu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Uu(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Jm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var rg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function si(e,t){for(let n of rg){if(!t(n))continue;let r=Pa(e,n);return r?{chip_key:n,content:r}:null}return null}function La(e){return e.chip_popover?oo(e.chip_popover.content):""}function Or(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var ii="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ma(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=zu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],_=d.includes("missing_description"),h=d.some(L=>L.startsWith(ii)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Or(e,"spec_after_blocker"),R=Qm(e.spec_after_blocker===!0,k),j=ei(e.dependency_chips,R===""?"":c`${R}${k?La(e):""}`),B=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",ie=ti(e.cross_lane_chip),z=ni(u),N=Bu(e.from_id),C=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${oi(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Or(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Or(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${ri(e.rec,Or(e,"rec"))}${Zm(u,Or(e,"qfr"))}
      ${k?"":La(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Os(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${j}
    ${B||ie||z||N||C?c`<div class="worker-chips">
          ${B}${ie}${z}${N}${Js(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${ng(t.lanes,e.id)}
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
    ${uo(e)}
  </div>`}function Wn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ma(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):In(o))}
          </div>`}
  </section>`}function Ou(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ai(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Ou("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${Ou("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>og(o))}
          </div>`}
    </section>
  </div>`}function og(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Wn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
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
  </div>`}function li(e){return e.count?c`<section
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
  </section>`:""}var Hu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ci(e,t){let n=Hu.find(o=>o.step===e);if(!n)return null;let r=Hu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Gu(e){let t=jo.findIndex(n=>n.step===e);return jo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Lr(e){let t=jo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function sg(e){let t=jo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:jo.length}}function ui(e){let t=sg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var qa=new Set(["queued","running","retry_pending"]),Ku=new Set(["failed","succeeded"]),ig={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Fo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ag={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Fo.base_containment,child_sweep:Fo.child_sweep,branch_cleanup:Fo.branch_cleanup,parent_close:Fo.parent_close};function lg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function cg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...qa,...Ku].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function ug(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Na(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=ig[o];if(!s)return null;let i=ci(n,`${r} ${s}`);return i?{...i,active:qa.has(o),failed:o==="failed"}:null}function dg(e){return!e||typeof e!="object"?null:ag[e.step]||null}function Bo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=dg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=lg(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&cg(k,t,l)).sort(ug):[],u=i?a:[],d=u.find(k=>qa.has(k.state));if(d)return Na(d);if(o)return o.step==="repo_operations"&&a[0]?Na(a[0],!0):null;let _=u.find(k=>Ku.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Na(_);if(r){let k=ci(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Fo[e.cleanup_cursor]:null;if(!h)return null;let m=ci(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function di(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var pg="\uBBF8\uC801\uC7AC";function ja(e,t){let n=Hn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var fg=10080*60*1e3;function Yu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-fg)return null;let o=Hn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${en(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Vu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Hn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Xu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=ja(s,{id:a,location_label:o.get(a)||pg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var fi=1,Uo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ua=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],po={show_blocked:!0,spec:"all"},Qu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function _g(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Xn(r)||(n=typeof r.status=="string"?r.status:null);return n}function mg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Xn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function gg(e,t,n={}){let{winners:r,resumed_from_ids:o}=ou(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state;if(sd(a))continue;let d=l.started_at,_=typeof a.session_id=="string"&&a.session_id.length>0,m=zs(a.quickfix_landing)==="session",k=u!=="running"&&(_||!m)&&!o.has(a.attempt_id),R=!_&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,j=it(n.observations?.[i]),B=it(j.pr),ie=typeof a.merge_sha=="string"&&a.merge_sha.length>0||B.state==="MERGED",z=Zn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:ie}),N=u==="failed"?Ju(a,{resume_eligible:k,resume_reason:R,confirmation:z.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Zu(a,e,u),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&_,can_resume:k})}for(let[i,l]of xg(e,t)){if(s.has(i))continue;let a=l.attempt,u=Zn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=id(a),_=l.run_state==="provider_hold"?kg(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[i]}):null;s.set(i,{...Zu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Ju(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:hg(a)}:{},..._?{hold:_}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return s}function Zu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Vn(t,e.bead_id)}}function Ju(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:id(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:qu(e),confirmation:t.confirmation,...od(t.history)}}function od(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function hg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function sd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function bg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=it(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function yg(e,t){if(e===null)return null;let n=it(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function vg(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function wg(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(i=>i?.attempt_id===e.attempt_id))return"pending";let s=e.auto_resume_refused;return typeof s=="string"&&s.length>0?`refused:${s}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||vg(e,r.attempts)?"disarmed":null}function kg(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=bg(e,t.provider_hold),s=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,i=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=wg(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,_=yg(i,t.account_catalog),h=od(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...s||i?{target:{...s?{model:s}:{},...i?{account:i}:{},..._?{account_alias:_}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...h.log_path?{log_path:h.log_path}:{}}}function id(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var $g=new Set(["parked","retry_wait","waiting"]);function xg(e,t){let n=Object.values(e||{}),r=new Set(n.map(i=>i?.resumed_from).filter(i=>typeof i=="string")),o=new Map;for(let i of n)i&&typeof i.bead_id=="string"&&Xn(i)&&o.set(i.bead_id,i.attempt_id);let s=new Map;for(let i of n){let l=sd(i);if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Xn(i)||!$g.has(i.status)&&!l||o.get(i.bead_id)!==i.attempt_id||typeof i.dismissed_at=="number"||l&&r.has(i.attempt_id))continue;let a=t.get(i.bead_id);typeof a=="number"&&a>0&&typeof i.finished_at=="number"&&a>=i.finished_at||s.set(i.bead_id,{attempt:i,run_state:l?"provider_hold":i.status})}return s}function ed(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function it(e){return e&&typeof e=="object"?e:{}}function Ag(e){let t=it(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Sg(e,t,n){let r=it(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>$n({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=td(co(a,s),co(u,s)),_=td(Cr(a,null),Cr(u,null));return d||_?{orchestration:d,worker:_}:null}function td(e,t){return!e||t&&t.text===e.text?null:e}function Eg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=Yu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Wa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Tg=new Set(["quick_fix","spec_backed","full_plan"]);function nd(e){return typeof e=="string"&&Tg.has(e)}function Cg(e){let t={...it(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Rg(e,t,n){let r=e.runner_catalog??null,o=Ba(e,t,n,null);if(!o)return null;let s=On(r,o.orchestration_model.value??""),i=s===null?o:Ba(e,t,n,s)||o,l=co(i,r),a=Cr(i,s);return l||a?{orchestration:l,worker:a}:null}function Ba(e,t,n,r){let o=nd(n)?n:nd(t.route)?t.route:null;try{return $n({pin:t,global:Cg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Og(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Cr(Ba(e,it(t.metadata),t.route,n),n)}function za(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Ig(e){let t={};for(let l of Un)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Un)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?an(Ns(i)):n?Yn(t):null}function ad(e,t){let n=Oa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Lg(e,t,n){let r=t.get(e);if(!r)return ad(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Po(r)}function Dg(e,t,n,r){let o=t.get(e);if(!o)return{label:ad(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Po(o),title:""}}function Pg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Mg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Ng(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let _=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((B,ie)=>{let z=B&&typeof B.bead_id=="string"?B.bead_id:"";if(z.length===0)return;let N=B&&typeof B.root_dir=="string"?B.root_dir:"",C=n.get(z),L=C?C.state:void 0,U=L==="running"||L==="pr_wait"||L==="done",K=!C||L==="runnable",H=C&&C.lane==="parallel"&&typeof C.position=="number"?C.position-1:null,D=Dg(z,n,r,t),Y=m.length>0?m[m.length-1].id:null,X=_==="confirmed"&&Y!==null&&!(t.get(z)||[]).includes(Y);m.push({id:z,title:o.get(z)||z,root_dir:C?C.root_dir:N,workspace_name:C?C.workspace_name:s.get(N)||"",seq:ie+1,location_label:D.label,location_title:D.title,draggable:!U,fixed:U,done:L==="done",unplaced:K,mismatch:X,...H!==null?{queue_index:H}:{}})}),m.forEach((B,ie)=>{B.seq=ie+1});let k=m.length>0&&m.every(B=>B.done),R=m.filter(B=>!B.fixed&&i.armed_by_bead.get(B.id)!==d).map(B=>B.id),j=Mg(d,_,m,k,R,i);l.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:_==="draft"&&m.length>=2,has_mismatch:_==="confirmed"&&m.some(B=>B.mismatch||B.unplaced),unlaunched:R,...j})}),l}function qg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function jg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:_,state:h}=qg(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:_})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,_=i.get(d);_?_.push(a):i.set(d,[a])}let l=(a,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:Lg(_.id,r,o),prefixes:d,...typeof _.root_dir=="string"&&_.root_dir.length>0?{root_dir:_.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let _=Ks(a[u].scope,a[d].scope);_.length!==0&&(l(a[u],a[d],_),l(a[d],a[u],_))}}function rd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Hn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function Fg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Hn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Fa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function pi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function dr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...po,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Uo.some(y=>y.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",_=Date.now(),h=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&h.set(y.root_dir,y);let m=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);for(let y of r)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);let k=[],R=[],j=[],B=[],ie=[],z=[],N=new Map,C=new Map,L=new Map,U=new Map,K=new Map,H=new Map,D=new Map,Y=new Map,X=new Map,J=new Map,_e=new Map,Re=new Map,re=new Map,M=new Set,ve=new Map,Te=new Map,E=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let G=y.root_dir,Ie=y.name||G,Pe=h.get(G),We=Pe&&typeof Pe.revision=="number"?Pe.revision:typeof y.revision=="number"?y.revision:0,Fe=it(y.attempts),Ye=it(y.bead_titles);for(let[p,f]of Object.entries(Ye))typeof f=="string"&&f.length>0&&E.set(p,f);let Rt=it(y.bead_times),Mt=it(y.pr_observations),Ot=it(y.admission),yt=it(y.revise_parked),pt=it(y.merge_queue_state),Et=it(y.cleanup_failed),Lt=it(y.discard_operations),qt=it(y.bead_timelines),le=it(y.bead_blocked_by);Object.hasOwn(y,"bead_scope")&&ve.set(G,it(y.bead_scope));let ae=it(y.bead_workflow),x=it(y.pr_activity),q=Array.isArray(y.repo_operations)?y.repo_operations:[];Y.set(G,q);let oe=typeof y.declared_base=="string"?y.declared_base:null;D.set(G,oe),H.set(G,Object.entries(Et).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(it(y.bead_overlay)))f&&typeof f=="object"&&X.set(`${G}\0${p}`,f);let se=new Map;for(let p of Object.values(Fe))p&&typeof p.attempt_id=="string"&&se.set(p.attempt_id,p);let Ee=Array.isArray(y.merge_queue)?y.merge_queue:[],he=new Set(Ee.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Je=new Map(Ee.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),ot=new Map,ze=new Map,Tt=new Map,Dt=new Map;Ee.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(ot.set(p.bead_id,f+1),ze.set(p.bead_id,p.resolution),Tt.set(p.bead_id,p.continuation_action||null),Dt.set(p.bead_id,p.authority||null))});let ht=it(y.auto_merge_skips),Yt=p=>{let f=ht[p];if(!f)return null;let $=it(it(Mt[p]).pr).head_sha;return $&&$===f.head_sha?f.reason||"":null};K.set(G,{positions:ot,resolutions:ze,continuations:Tt,authorities:Dt,state:{active:typeof pt.active=="string"?pt.active:null,failures:it(pt.failures),waiting:pt.waiting&&typeof pt.waiting.bead_id=="string"&&typeof pt.waiting.reason=="string"?pt.waiting:null},auto_excluded:(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Yt(p)!==null),running:Ee.length>0});let xt=Array.isArray(y.queue)?y.queue:[];for(let p of[...xt,...Array.isArray(y.pr_wait)?y.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&Re.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(y.disarmed_on_load)?y.disarmed_on_load:[])typeof p=="string"&&p.length>0&&M.add(p);let Pt=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Ht=it(y.lane_states),lt=typeof y.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(y.serial_lane_count))):Math.min(5,Pt.length);L.set(G,lt),U.set(G,xt.length);let Vt=new Map(Pt.map(p=>[p.id,p])),Zt=new Map;for(let p of Pt)for(let f of p.entries)f&&typeof f.bead_id=="string"&&Zt.set(f.bead_id,p.id);for(let[p,f]of Object.entries(it(y.bead_dependents))){let $=Array.isArray(f?.ids)?f.ids:[],O=it(f?.root_dirs),F=_e.get(p)||{ids:new Set,root_dirs:{}};for(let ee of $)typeof ee=="string"&&ee.length>0&&F.ids.add(ee);for(let[ee,pe]of Object.entries(O))typeof pe=="string"&&pe.length>0&&(F.root_dirs[ee]=pe);_e.set(p,F)}for(let[p,f]of Object.entries(le))Array.isArray(f)&&J.set(p,f.filter($=>typeof $=="string"&&$.length>0));let Kt=Array.isArray(y.done)?y.done:[];for(let p of Kt)p&&typeof p.bead_id=="string"&&z.push({id:p.bead_id,root_dir:G,workspace_name:Ie});let wn=new Map;for(let p of Kt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&wn.set(p.bead_id,p.added_at);let Bt=p=>({id:p,title:Ye[p]||p,root_dir:G,workspace_name:Ie,expected_revision:We,draggable:!1,...it(Rt[p]).created_at?{created_at:it(Rt[p]).created_at}:{},...it(Rt[p]).updated_at?{updated_at:it(Rt[p]).updated_at}:{}}),Jt=p=>{let f=ae[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},Xt=p=>Object.hasOwn(le,p)?{blocked_by:Array.isArray(le[p])?le[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},un=(p,f)=>{let $=Xt(p),O=(f?.blockers||[]).map(ee=>ee.id);if(O.length===0)return $;let F=[...$.blocked_by||[]];for(let ee of O)F.includes(ee)||F.push(ee);return{blocked_by:F}},fe=new Set;for(let[p,f]of gg(Fe,wn,{discard_operations:Lt,observations:Mt,bead_timelines:qt,provider_hold:it(y.provider_hold),auto_resume_pending:Array.isArray(y.auto_resume_pending)?y.auto_resume_pending:[],account_catalog:it(y.account_catalog)})){fe.add(p);let $=f.run_state==="failed"?Pg(Fe,f.attempt_id):null;$!==null&&re.set(p,$);let O=se.get(f.attempt_id)||null,F=X.get(`${G}\0${p}`),ee=F&&F.rollup?F.rollup:null,pe=Wa(oe,O?O.target_base:null),Ce=O?za(O,se):!1,Qe=O&&O.quickfix_lane===!0&&O.quickfix_landing&&typeof O.quickfix_landing=="object"?O.quickfix_landing:null,wt=Qe&&typeof Qe.reason=="string"&&Qe.reason.length>0?Qe.reason:null,vt=Qe?Bo({bead_id:p,merge_sha:Qe.head_sha,cleanup_cursor:Qe.cursor,cleanup_failed:wt?{step:Qe.cursor,reason:wt}:null,repo_operations:q}):null;R.push({...Bt(p),lane:"running",...un(p,f.wait),...Zt.has(p)?{serial_lane_id:Zt.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:ae[p]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,hold:f.hold||null,wait:f.wait||null,retry:f.retry||null,exec_chips:{orchestration:Ea(f),worker:Og(it(Pe),F,f.runner||null)},discard:Zn(Lt,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||it(Mt[p]).pr?.state==="MERGED"}),...ee?{rollup:ee}:{},...Ce?{conflict_resolution:!0}:{},...pe?{base_exception:pe}:{},...vt?{landing:vt}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:f.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:f.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:f.run_state==="failed"})}for(let[p,f]of ru(Fe)){if(R.some(O=>O.id===p))continue;let $=f.attempt;R.push({...Bt(p),lane:"running",kind:"session",...Xt(p),attempt_id:typeof $.attempt_id=="string"?$.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ae[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof $.last_event_at=="number"?$.last_event_at:null,last_activity:$.last_activity&&typeof $.last_activity=="object"?$.last_activity:null,legs:Array.isArray($.legs)?$.legs:[],runner:typeof $.runner=="string"?$.runner:null,model:typeof $.model=="string"?$.model:null,effort:typeof $.effort=="string"?$.effort:null,speed:typeof $.speed=="string"?$.speed:null,resumed_from:null,continuation_mode:null,usage:$.usage&&typeof $.usage=="object"?$.usage:null,exec_chips:{orchestration:Ea($),worker:null},discard:Zn(Lt,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(y.session_active)?y.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||fe.has(f)||(fe.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&J.set(f,p.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(f,p.title),R.push({...Bt(f),title:p.title||Ye[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:Fa(p.started_at)??Fa(p.updated_at)??void 0,updated_at:Fa(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(y.pr_wait)?y.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||fe.has(f))continue;fe.add(f);let $=it(Mt[f]),O=it($.pr),F=$.gate?it($.gate):null,ee=he.has(f),pe=Je.get(f)?.continuation_action||null,Ce=!!pe&&pe.continuation===null,Qe=pt.active===f,wt=p.external===!0,vt=Et[f]||null,v=it(x[f]),S=Bo({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:v.merge_progress||null,cleanup_failed:vt,repo_operations:q}),Le=di(S),je=!!F&&F.base_badge==="\uCDA9\uB3CC",nt=!!vt&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(vt.step)&&!!F&&F.tier==="merged",bt=wt&&!!vt&&!!F&&F.tier==="merged",Ut=!!F&&["closed_unmerged","review","undecidable"].includes(F.tier),kn=Zn(Lt,f,{external:wt,merge_active:Qe||S?.step==="merge",merge_queued:ee,cleanup_active:Le,merged:!!vt||F?.tier==="merged"}),br=!!kn.operation,jr=Ag($.receipt_check);j.push({...Bt(f),lane:"pr_wait",...Xt(f),...jr.length>0?{receipt_badge:{codes:jr}}:{},workflow:ae[f]||null,pr_number:typeof O.number=="number"?O.number:null,pr_url:typeof O.url=="string"?O.url:void 0,external:wt,usage:Vn(Fe,f),merge_step:S,badges:Ce?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:S?[F?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:vt?[Lr(vt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(vt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof F?.gate_badge=="string"&&F.gate_badge.length>0?[F.gate_badge]:[],alert:S?S.failed===!0:!!vt||Ut,reason:vt&&S?.active!==!0?ui(vt.step):"PR \uB300\uAE30",merge_action:F?.tier==="merged"&&!nt&&!bt?!1:!ee||Ce,merge_enabled:!br&&(Ce||F?.enabled===!0||je||nt||bt),merge_label:Ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":bt||nt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":je&&!nt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":br?kn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:bt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":je?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.enabled===!0?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${F?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ee&&!Ce,cancel_enabled:!Qe,continuation_mismatch:pe?.mismatch||null,discard:kn,discard_action:kn.action,discard_enabled:kn.enabled,discard_title:kn.title})}let T=(p,f,$,O)=>{let F=p&&p.bead_id;if(typeof F!="string"||fe.has(F))return null;fe.add(F);let ee=yt[F],pe=Zn(Lt,F),Ce=pe.operation?pe:null,Qe={...Bt(F),lane:f,workflow:ae[F]||null,draggable:!Ce,discard:Ce||void 0,reason:ed(Ot,F),seq:$+1,queue_position:$+1,queue_index:$,queue_length:O,badges:ee?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ee,revise_action:!!ee,revise_enabled:!!ee&&!Ce,revise_title:ee?ee.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ee.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},wt=Xt(F);return Object.hasOwn(wt,"blocked_by")&&(Qe.blocked_by=wt.blocked_by),Qe};for(let p=0;p<xt.length;p++){let f=T(xt[p],"queue",p,xt.length);if(!f)continue;B.push(f);let $=N.get(G);$?$.push(f):N.set(G,[f])}let be=p=>{let f=j.find(ee=>ee.id===p&&ee.root_dir===G);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $=R.find(ee=>ee.id===p&&ee.root_dir===G),O=$?$.run_state:_g(Fe,p),F=O==="failed"||O==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":O==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:$?$.title:Bt(p).title,badge:F}},qe=[];for(let p=0;p<Math.max(lt,Pt.length);p++){let f=`s${p+1}`,$=Vt.get(f),O=$&&Array.isArray($.entries)?$.entries:[],F=it(Ht[f]),ee=Array.isArray(F.occupied_by)?F.occupied_by.filter(Qe=>typeof Qe=="string"):[],pe=new Set(ee),Ce=[];for(let Qe=0;Qe<O.length;Qe++){let wt=O[Qe]&&O[Qe].bead_id;if(typeof wt=="string"&&pe.has(wt)){fe.add(wt);continue}let vt=T(O[Qe],f,Qe,O.length);vt&&(Ce.push(vt),B.push(vt))}Ce.length===0&&ee.length===0&&(lt<=1||p>=lt)||qe.push({id:f,index:p,items:Ce,raw_length:O.length,occupied_by:ee,occupants:ee.map(Qe=>be(Qe)),corrections:Array.isArray(F.corrections)?F.corrections.length:0,cycle:F.cycle===!0,...Ce.length===0&&ee.length===0?{empty:!0}:{}})}C.set(G,qe);let ft=Array.from({length:lt},(p,f)=>{let $=`s${f+1}`,O=Vt.get($),F=O&&Array.isArray(O.entries)?O.entries:[],ee=it(Ht[$]);return{id:$,index:F.length,length:F.length,occupied_by:Array.isArray(ee.occupied_by)?ee.occupied_by.filter(pe=>typeof pe=="string"):[]}});for(let p of Array.isArray(y.runnable)?y.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||fe.has(f))continue;fe.add(f);let $=p.workflow&&typeof p.workflow=="object"?p.workflow:null,O=$&&typeof $.route=="string"&&$.route||(typeof p.route=="string"?p.route:null),F=Sg(it(Pe),p.exec_pins,O),ee=Do(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&J.set(f,p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof p.title=="string"&&p.title.length>0&&E.set(f,p.title),Array.isArray(p.scope)&&Te.set(f,p.scope.filter(S=>typeof S=="string"&&S.length>0));let pe=p.eligible!==!1,Ce=p.worker_ineligible===!0,Qe=Object.hasOwn(p,"eligible"),wt=[];typeof p.reason=="string"&&p.reason.length>0&&wt.push(p.reason);let vt=ed(Ot,f);vt&&wt.push(vt);let v=Eg(f,p.release_info,_)?.map(S=>({...S,...rd({id:f,root_dir:G},S.id)}));k.push({...Bt(f),title:p.title||Ye[f]||f,lane:"runnable",draggable:!Qe,queue_placeable:pe&&!Ce,...Ce?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...v?{dependency_chips:{released:v}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:wt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:$||(O?{route:O,chips:{route:O}}:null),...F?{exec_chips:F}:{},...ee?{rec:ee}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},place_index:xt.length,place_lanes:ft})}for(let p of Kt){let f=p&&p.bead_id;if(typeof f!="string"||fe.has(f)||(fe.add(f),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let $=mg(Fe,f),O=$&&typeof $.done_kind=="string"?$.done_kind:null;ie.push({...Bt(f),lane:"done",done:!0,done_layout:"three_line",usage:Vn(Fe,f),work_ms:Pu(Fe,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:O,...Jt(f),badges:[...O&&Qu[O]?[Qu[O]]:[],...Lu(Fe,f)]})}for(let p of Array.isArray(y.session_done)?y.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||fe.has(f)||(fe.add(f),ie.push({...Bt(f),...p,id:f,root_dir:G,workspace_name:Ie,expected_revision:We,lane:"done",done:!0}))}}if(X.size>0)for(let y of[...k,...B,...R,...j,...ie]){let G=X.get(`${y.root_dir}\0${y.id}`);if(!G||(typeof G.priority=="number"&&(y.priority=G.priority),typeof G.from_id=="string"&&G.from_id.length>0&&(y.from_id=G.from_id),y.lane==="done"&&Array.isArray(G.carried_to)&&G.carried_to.length>0&&(y.carried_to=G.carried_to),!Object.hasOwn(G,"metadata")))continue;let Ie=it(G.metadata);if(y.rec=Do(Ie),y.lane==="runnable"||y.lane.startsWith("s")||y.lane==="queue"){let Pe=Rg(it(h.get(y.root_dir)),Ie,typeof G.route=="string"&&G.route.length>0?G.route:it(y.workflow).route);Pe&&(y.exec_chips=Pe)}}let te=new Map;o.forEach((y,G)=>{y&&typeof y.root_dir=="string"&&te.set(y.root_dir,G)});let ke=n&&n.running_sort==="repo"?"repo":"started";R.sort((y,G)=>{let Ie=y.kind==="session",Pe=G.kind==="session";if(Ie!==Pe)return Ie?1:-1;if(Ie&&Pe){let Ye=pi(G.updated_at)-pi(y.updated_at);return Ye!==0?Ye:y.id.localeCompare(G.id)}if(ke==="repo"){let Ye=te.get(y.root_dir)??Number.MAX_SAFE_INTEGER,Rt=te.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(Ye!==Rt)return Ye-Rt}let We=typeof y.started_at=="number"&&Number.isFinite(y.started_at)?y.started_at:null,Fe=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return We!==null&&Fe!==null&&We!==Fe?We-Fe:We===null&&Fe!==null?1:We!==null&&Fe===null?-1:y.id.localeCompare(G.id)}),ie.sort((y,G)=>(G.done_at??0)-(y.done_at??0));let we=o.length>0?o:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,runner_catalog:y&&y.runner_catalog})),Oe=new Set(k.map(y=>y.root_dir)),xe=new Map;for(let y of R)y.kind==="session"||y.run_state!=="running"||xe.set(y.root_dir,(xe.get(y.root_dir)||0)+1);let Me=new Map;for(let y of ie){let G=Me.get(y.root_dir);G?G.push(y):Me.set(y.root_dir,[y])}let He={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Ze=[];for(let y of we){if(!y||typeof y.root_dir!="string")continue;let G=N.get(y.root_dir)||[],Ie=C.get(y.root_dir)||[],Pe=G.length>0||Ie.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0);if(u!=="all"&&!Pe&&!Oe.has(y.root_dir))continue;let We=typeof y.slots=="number"&&y.slots>=fi?y.slots:fi,Fe=xe.get(y.root_dir)||0;Ze.push({live_count:Fe,over_cap:Fe>We,merge:K.get(y.root_dir)||He,token_total:Ig(Me.get(y.root_dir)||[]),cleanup_failures:H.get(y.root_dir)||[],declared_base:D.get(y.root_dir)??null,repo_operations:Y.get(y.root_dir)||[],root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:We,revision:typeof y.revision=="number"?y.revision:0,runner_catalog:it(y.runner_catalog),items:G,sublanes:{parallel:G,serial:Ie},serial_lane_count:L.get(y.root_dir)||0,raw_queue_length:U.get(y.root_dir)||0})}let I={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:B,queue_groups:Ze,running:R,pr_wait:j,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},de=Au(I);for(let y of z)de.has(y.id)||de.set(y.id,{root_dir:y.root_dir,workspace_name:y.workspace_name,lane:"done",state:"done"});for(let y of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){if(!Object.hasOwn(y,"blocked_by"))continue;let G=de.get(y.id);y.blockers=(y.blocked_by||[]).map(Ie=>Su(Ie,G,de,o))}for(let y of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){let G=(y.blockers||[]).map(We=>({...ja(y.id,We),...rd(y,We.id,de)})),Ie=Vu(y.id,Fg(_e.get(y.id),y.dependents_info,y,de));if(G.length===0&&Ie.length===0)continue;let Pe={...y.dependency_chips||{},...G.length>0?{predecessors:G}:{},...Ie.length>0?{dependents:Ie}:{}};y.dependency_chips=Pe}jg(I,ve,Te,de,o);let ne=Eu(I.queue_groups);for(let y of I.queue_groups)for(let G of y.sublanes.serial){let Ie=ne.get(Tu(y.root_dir,G.id));Ie&&(G.cross_wait_peers=Ie)}I.chain_lanes=Ng(l&&Array.isArray(l.lanes)?l.lanes:[],J,de,o,E,m,{armed_by_bead:Re,failed_by_bead:re,disarmed_lanes:M});let ce=new Map;for(let y of[...I.queue,...I.runnable])ce.has(y.id)||ce.set(y.id,y);let $e=new Set;for(let y of I.chain_lanes)for(let G of y.rows){if(y.status==="confirmed"&&!G.unplaced&&!G.fixed&&$e.add(G.id),!y.draft&&!G.unplaced)continue;let Ie=ce.get(G.id);Ie&&(Ie.cross_lane_chip={lane_id:y.lane_id,number:y.number,status:y.status,label:y.draft?`\uC5F0\uACB0 ${y.number} (draft)`:`\uC5F0\uACB0 ${y.number}`})}let me=new Map(I.chain_lanes.map(y=>[y.lane_id,y.number]));for(let y of[...I.queue,...I.running]){let G=Re.get(y.id);if(typeof G!="string"||G.length===0)continue;let Ie=me.get(G);y.armed_lane_chip=Ie===void 0?{lane_id:G,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:G,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let Ne=[];for(let y of N.values())for(let G of y)$e.has(G.id)||Ne.push(G);Ne.sort((y,G)=>{let Ie=y.workspace_name.localeCompare(G.workspace_name);return Ie!==0?Ie:(y.queue_index??0)-(G.queue_index??0)}),I.parallel_rows=Ne;let Ge={};for(let[y,G]of de)typeof G.root_dir=="string"&&G.root_dir.length>0&&(Ge[y]=G.root_dir);for(let y of I.chain_lanes)for(let G of y.rows)!Object.hasOwn(Ge,G.id)&&G.root_dir.length>0&&m.has(G.root_dir)&&(Ge[G.id]=G.root_dir);I.owner_of=Ge;let et=I.runnable.length;I.runnable_all=I.runnable.slice();let Se=I.runnable,Q=y=>i.show_blocked||y.blocked!==!0,V=y=>i.spec==="all"||(i.spec==="with"?y.published===!0:y.published!==!0);if(d==="per_control"){let y=[],G=0,Ie=0;for(let Pe of Se){let We=Q(Pe),Fe=V(Pe);We&&Fe?y.push(Pe):!We&&Fe?G+=1:We&&!Fe&&(Ie+=1)}Se=y,I.runnable_hidden={blocked:G,spec:Ie}}else{Se=Se.filter(Q);let y=Se.length;Se=Se.filter(V),I.runnable_hidden={blocked:et-y,spec:y-Se.length}}let Be=(y,G)=>{let Ie=pi(G.updated_at)-pi(y.updated_at);return Ie!==0?Ie:y.id.localeCompare(G.id)},ct=a==="repo_spec"?(y,G)=>{let Ie=y.published===!0?0:1,Pe=G.published===!0?0:1;return Ie!==Pe?Ie-Pe:Be(y,G)}:Be;if(a==="as_given")I.runnable=Se,I.runnable_sections=[];else if(a==="updated_flat")I.runnable=Se.slice().sort(Be),I.runnable_sections=[];else{let y=new Map;for(let Pe of Se){let We=y.get(Pe.root_dir);We?We.push(Pe):y.set(Pe.root_dir,[Pe])}let G=[],Ie=[];for(let Pe of we){if(!Pe||typeof Pe.root_dir!="string")continue;let We=(y.get(Pe.root_dir)||[]).slice().sort(ct);y.delete(Pe.root_dir),We.length!==0&&(G.push({root_dir:Pe.root_dir,name:Pe.name||Pe.root_dir,items:We.map(Fe=>({...Fe,workspace_name:""}))}),Ie.push(...We))}for(let[Pe,We]of y){let Fe=We.slice().sort(ct);G.push({root_dir:Pe,name:Fe[0]?.workspace_name||Pe,items:Fe.map(Ye=>({...Ye,workspace_name:""}))}),Ie.push(...Fe)}I.runnable=Ie,I.runnable_sections=G}return I}function ld(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let _=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));_&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Bg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",mi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ug="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Wg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",fo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Wo(e,t){return`${e}\0${t}`}function zg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Hg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Go(e,t){let n=e.entries,r=n.map(_=>_.bead_id),o=zg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[_,h]of o)for(let m of h)s.push({blocker:m,blockee:_});let i=Hg(e,t),l=new Map(r.map((_,h)=>[_,h])),a=r.slice(0,i).filter(_=>o.get(_).some(h=>Number(l.get(h))>Number(l.get(_)))),u=ld(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,i),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function cd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Go(n,t)}function Gg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Kg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Yg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ha(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Vg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Wo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Wo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Wo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Xg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Qg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function _i(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ga(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ko(e){let t=Yg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Kg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,_)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if(Ha(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(Wo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=s(u);h!==null&&(t.set(u,_.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Wo(u,d))}}function Yo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Vg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Gg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function ud(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function zo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function dd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function pd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(_i(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Ho(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function gi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function hi(e,t,n){let r=Ko(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Bg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ug};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ga(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:fo}}if(e.kind==="chain"&&d===void 0)return{refused:fo};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(k<0)return;let R=k>0?d.entries[k-1]:null,j=k+1<d.entries.length?d.entries[k+1]:null,B=zo(d,k),ie=j!==null&&zo(d,k+1);B&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ie&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(B||ie)&&R!==null&&j!==null&&r.addDep(j.bead_id,R.bead_id,u)},h=(k,R)=>{let j=n.cross_lanes.get(k),B=j.entries.findIndex(D=>D.bead_id===e.bead_id),ie=j.entries.filter(D=>D.bead_id!==e.bead_id),z=Math.max(0,Math.min(ie.length,B>=0&&R>B?R-1:R)),N=-1;if(ie.forEach((D,Y)=>{n.fixed_members.has(D.bead_id)&&(N=Y)}),z<=N){r.state.refusal=Wg;return}let C=B>=0?j.entries[B]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Go({status:j.status,entries:[...ie.slice(0,z),C,...ie.slice(z)]},n);let L=l.entries;if(gi(L,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Ho(L)}}),j.status!=="confirmed")return;let U=L.findIndex(D=>D.bead_id===e.bead_id),K=U>0?L[U-1].bead_id:null,H=U+1<L.length?L[U+1].bead_id:null;if(K===null){H!==null&&r.addDep(H,e.bead_id,k);return}if(r.addDep(e.bead_id,K,k),H!==null&&(r.graph.get(H)||[]).includes(K)){let D=j.entries.findIndex(Y=>Y.bead_id===H);(r.laneCreated(H,K)||D>0&&j.entries[D-1].bead_id===K&&zo(j,D))&&r.removeDep(H,K),r.addDep(H,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...dd(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ho(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Xg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(_i(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let R=n.parallel_rows,j=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&Qg(n,e.root_dir)&&m!==void 0){let ie=m>k?k:k-1;ie>=0&&ie!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(_i(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(_i(e.bead_id,e.root_dir,t.index,t.lane_id));return Yo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:fo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Go(n,t);if(r.held)return{refused:mi};let o=r.entries,s=Ko(t),i=[];ud(s,o,e),s.state.refusal===null&&pd(s,t,o,i);let l=gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ho(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Yo(s,t,l,i,{lane_id:e,correction:r})}function _d(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:fo};let r=Go(n,t),o=r.entries,s=Ko(t),i=[];ud(s,o,e),s.state.refusal===null&&pd(s,t,o,i);let l=gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ho(o)}}];return Yo(s,t,l,i,{lane_id:e,correction:r})}function md(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:fo};let r=Go(n,t),o=r.entries;return Yo(Ko(t),t,gi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ho(o)}}],[],{lane_id:e,correction:r})}function gd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:fo};let r=Ko(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)zo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Yo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:dd(t,n,e,n.entries)})}function hd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;zo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ga(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function bd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function yd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Ka(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ga(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Zg="\uC0AC\uC774\uD074";function Jg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ya(e,t,n){let r=dr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Jg(e)}}function vd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ha(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Zg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function wd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Rd,setPrototypeOf:kd,isFrozen:eh,getPrototypeOf:th,getOwnPropertyDescriptor:nh}=Object,{freeze:gn,seal:En,create:tl}=Object,{apply:nl,construct:rl}=typeof Reflect<"u"&&Reflect;gn||(gn=function(t){return t});En||(En=function(t){return t});nl||(nl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});rl||(rl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var bi=hn(Array.prototype.forEach),rh=hn(Array.prototype.lastIndexOf),$d=hn(Array.prototype.pop),Vo=hn(Array.prototype.push),oh=hn(Array.prototype.splice),vi=hn(String.prototype.toLowerCase),Va=hn(String.prototype.toString),Xa=hn(String.prototype.match),Xo=hn(String.prototype.replace),sh=hn(String.prototype.indexOf),ih=hn(String.prototype.trim),Ln=hn(Object.prototype.hasOwnProperty),mn=hn(RegExp.prototype.test),Qo=ah(TypeError);function hn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return nl(e,t,r)}}function ah(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return rl(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:vi;kd&&kd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(eh(t)||(t[r]=s),o=s)}e[o]=!0}return e}function lh(e){for(let t=0;t<e.length;t++)Ln(e,t)||(e[t]=null);return e}function Jn(e){let t=tl(null);for(let[n,r]of Rd(e))Ln(e,n)&&(Array.isArray(r)?t[n]=lh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Jn(r):t[n]=r);return t}function Zo(e,t){for(;e!==null;){let r=nh(e,t);if(r){if(r.get)return hn(r.get);if(typeof r.value=="function")return hn(r.value)}e=th(e)}function n(){return null}return n}var xd=gn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Qa=gn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Za=gn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ch=gn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ja=gn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),uh=gn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ad=gn(["#text"]),Sd=gn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),el=gn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ed=gn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),yi=gn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dh=En(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ph=En(/<%[\w\W]*|[\w\W]*%>/gm),fh=En(/\$\{[\w\W]*/gm),_h=En(/^data-[\-\w.\u00B7-\uFFFF]+$/),mh=En(/^aria-[\-\w]+$/),Od=En(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),gh=En(/^(?:\w+script|data):/i),hh=En(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Id=En(/^html$/i),bh=En(/^[a-z][.\w]*(-[.\w]+)+$/i),Td=Object.freeze({__proto__:null,ARIA_ATTR:mh,ATTR_WHITESPACE:hh,CUSTOM_ELEMENT:bh,DATA_ATTR:_h,DOCTYPE_NAME:Id,ERB_EXPR:ph,IS_ALLOWED_URI:Od,IS_SCRIPT_OR_DATA:gh,MUSTACHE_EXPR:dh,TMPLIT_EXPR:fh}),Jo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yh=function(){return typeof window>"u"?null:window},vh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Cd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ld(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yh(),t=fe=>Ld(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Jo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:m}=e,k=a.prototype,R=Zo(k,"cloneNode"),j=Zo(k,"remove"),B=Zo(k,"nextSibling"),ie=Zo(k,"childNodes"),z=Zo(k,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let N,C="",{implementation:L,createNodeIterator:U,createDocumentFragment:K,getElementsByTagName:H}=n,{importNode:D}=r,Y=Cd();t.isSupported=typeof Rd=="function"&&typeof z=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:J,TMPLIT_EXPR:_e,DATA_ATTR:Re,ARIA_ATTR:re,IS_SCRIPT_OR_DATA:M,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Te}=Td,{IS_ALLOWED_URI:E}=Td,te=null,ke=_t({},[...xd,...Qa,...Za,...Ja,...Ad]),we=null,Oe=_t({},[...Sd,...el,...Ed,...yi]),xe=Object.seal(tl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,He=null,Ze=Object.seal(tl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,de=!0,ne=!1,ce=!0,$e=!1,me=!0,Ne=!1,Ge=!1,et=!1,Se=!1,Q=!1,V=!1,Be=!0,ut=!1,ct="user-content-",y=!0,G=!1,Ie={},Pe=null,We=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Fe=null,Ye=_t({},["audio","video","img","source","image","track"]),Rt=null,Mt=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ot="http://www.w3.org/1998/Math/MathML",yt="http://www.w3.org/2000/svg",pt="http://www.w3.org/1999/xhtml",Et=pt,Lt=!1,qt=null,le=_t({},[Ot,yt,pt],Va),ae=_t({},["mi","mo","mn","ms","mtext"]),x=_t({},["annotation-xml"]),q=_t({},["title","style","font","a","script"]),oe=null,se=["application/xhtml+xml","text/html"],Ee="text/html",he=null,Je=null,ot=n.createElement("form"),ze=function(T){return T instanceof RegExp||T instanceof Function},Tt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===T)){if((!T||typeof T!="object")&&(T={}),T=Jn(T),oe=se.indexOf(T.PARSER_MEDIA_TYPE)===-1?Ee:T.PARSER_MEDIA_TYPE,he=oe==="application/xhtml+xml"?Va:vi,te=Ln(T,"ALLOWED_TAGS")?_t({},T.ALLOWED_TAGS,he):ke,we=Ln(T,"ALLOWED_ATTR")?_t({},T.ALLOWED_ATTR,he):Oe,qt=Ln(T,"ALLOWED_NAMESPACES")?_t({},T.ALLOWED_NAMESPACES,Va):le,Rt=Ln(T,"ADD_URI_SAFE_ATTR")?_t(Jn(Mt),T.ADD_URI_SAFE_ATTR,he):Mt,Fe=Ln(T,"ADD_DATA_URI_TAGS")?_t(Jn(Ye),T.ADD_DATA_URI_TAGS,he):Ye,Pe=Ln(T,"FORBID_CONTENTS")?_t({},T.FORBID_CONTENTS,he):We,Me=Ln(T,"FORBID_TAGS")?_t({},T.FORBID_TAGS,he):Jn({}),He=Ln(T,"FORBID_ATTR")?_t({},T.FORBID_ATTR,he):Jn({}),Ie=Ln(T,"USE_PROFILES")?T.USE_PROFILES:!1,I=T.ALLOW_ARIA_ATTR!==!1,de=T.ALLOW_DATA_ATTR!==!1,ne=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=T.SAFE_FOR_TEMPLATES||!1,me=T.SAFE_FOR_XML!==!1,Ne=T.WHOLE_DOCUMENT||!1,Se=T.RETURN_DOM||!1,Q=T.RETURN_DOM_FRAGMENT||!1,V=T.RETURN_TRUSTED_TYPE||!1,et=T.FORCE_BODY||!1,Be=T.SANITIZE_DOM!==!1,ut=T.SANITIZE_NAMED_PROPS||!1,y=T.KEEP_CONTENT!==!1,G=T.IN_PLACE||!1,E=T.ALLOWED_URI_REGEXP||Od,Et=T.NAMESPACE||pt,ae=T.MATHML_TEXT_INTEGRATION_POINTS||ae,x=T.HTML_INTEGRATION_POINTS||x,xe=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&ze(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(xe.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&ze(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(xe.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(xe.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(de=!1),Q&&(Se=!0),Ie&&(te=_t({},Ad),we=[],Ie.html===!0&&(_t(te,xd),_t(we,Sd)),Ie.svg===!0&&(_t(te,Qa),_t(we,el),_t(we,yi)),Ie.svgFilters===!0&&(_t(te,Za),_t(we,el),_t(we,yi)),Ie.mathMl===!0&&(_t(te,Ja),_t(we,Ed),_t(we,yi))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?Ze.tagCheck=T.ADD_TAGS:(te===ke&&(te=Jn(te)),_t(te,T.ADD_TAGS,he))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?Ze.attributeCheck=T.ADD_ATTR:(we===Oe&&(we=Jn(we)),_t(we,T.ADD_ATTR,he))),T.ADD_URI_SAFE_ATTR&&_t(Rt,T.ADD_URI_SAFE_ATTR,he),T.FORBID_CONTENTS&&(Pe===We&&(Pe=Jn(Pe)),_t(Pe,T.FORBID_CONTENTS,he)),y&&(te["#text"]=!0),Ne&&_t(te,["html","head","body"]),te.table&&(_t(te,["tbody"]),delete Me.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Qo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Qo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=T.TRUSTED_TYPES_POLICY,C=N.createHTML("")}else N===void 0&&(N=vh(m,o)),N!==null&&typeof C=="string"&&(C=N.createHTML(""));gn&&gn(T),Je=T}},Dt=_t({},[...Qa,...Za,...ch]),ht=_t({},[...Ja,...uh]),Yt=function(T){let be=z(T);(!be||!be.tagName)&&(be={namespaceURI:Et,tagName:"template"});let qe=vi(T.tagName),ft=vi(be.tagName);return qt[T.namespaceURI]?T.namespaceURI===yt?be.namespaceURI===pt?qe==="svg":be.namespaceURI===Ot?qe==="svg"&&(ft==="annotation-xml"||ae[ft]):!!Dt[qe]:T.namespaceURI===Ot?be.namespaceURI===pt?qe==="math":be.namespaceURI===yt?qe==="math"&&x[ft]:!!ht[qe]:T.namespaceURI===pt?be.namespaceURI===yt&&!x[ft]||be.namespaceURI===Ot&&!ae[ft]?!1:!ht[qe]&&(q[qe]||!Dt[qe]):!!(oe==="application/xhtml+xml"&&qt[T.namespaceURI]):!1},xt=function(T){Vo(t.removed,{element:T});try{z(T).removeChild(T)}catch{j(T)}},Pt=function(T,be){try{Vo(t.removed,{attribute:be.getAttributeNode(T),from:be})}catch{Vo(t.removed,{attribute:null,from:be})}if(be.removeAttribute(T),T==="is")if(Se||Q)try{xt(be)}catch{}else try{be.setAttribute(T,"")}catch{}},Ht=function(T){let be=null,qe=null;if(et)T="<remove></remove>"+T;else{let f=Xa(T,/^[\r\n\t ]+/);qe=f&&f[0]}oe==="application/xhtml+xml"&&Et===pt&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let ft=N?N.createHTML(T):T;if(Et===pt)try{be=new h().parseFromString(ft,oe)}catch{}if(!be||!be.documentElement){be=L.createDocument(Et,"template",null);try{be.documentElement.innerHTML=Lt?C:ft}catch{}}let p=be.body||be.documentElement;return T&&qe&&p.insertBefore(n.createTextNode(qe),p.childNodes[0]||null),Et===pt?H.call(be,Ne?"html":"body")[0]:Ne?be.documentElement:p},lt=function(T){return U.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Vt=function(T){return T instanceof _&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Zt=function(T){return typeof l=="function"&&T instanceof l};function Kt(fe,T,be){bi(fe,qe=>{qe.call(t,T,be,Je)})}let wn=function(T){let be=null;if(Kt(Y.beforeSanitizeElements,T,null),Vt(T))return xt(T),!0;let qe=he(T.nodeName);if(Kt(Y.uponSanitizeElement,T,{tagName:qe,allowedTags:te}),me&&T.hasChildNodes()&&!Zt(T.firstElementChild)&&mn(/<[/\w!]/g,T.innerHTML)&&mn(/<[/\w!]/g,T.textContent)||T.nodeType===Jo.progressingInstruction||me&&T.nodeType===Jo.comment&&mn(/<[/\w]/g,T.data))return xt(T),!0;if(!(Ze.tagCheck instanceof Function&&Ze.tagCheck(qe))&&(!te[qe]||Me[qe])){if(!Me[qe]&&Jt(qe)&&(xe.tagNameCheck instanceof RegExp&&mn(xe.tagNameCheck,qe)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(qe)))return!1;if(y&&!Pe[qe]){let ft=z(T)||T.parentNode,p=ie(T)||T.childNodes;if(p&&ft){let f=p.length;for(let $=f-1;$>=0;--$){let O=R(p[$],!0);O.__removalCount=(T.__removalCount||0)+1,ft.insertBefore(O,B(T))}}}return xt(T),!0}return T instanceof a&&!Yt(T)||(qe==="noscript"||qe==="noembed"||qe==="noframes")&&mn(/<\/no(script|embed|frames)/i,T.innerHTML)?(xt(T),!0):($e&&T.nodeType===Jo.text&&(be=T.textContent,bi([X,J,_e],ft=>{be=Xo(be,ft," ")}),T.textContent!==be&&(Vo(t.removed,{element:T.cloneNode()}),T.textContent=be)),Kt(Y.afterSanitizeElements,T,null),!1)},Bt=function(T,be,qe){if(Be&&(be==="id"||be==="name")&&(qe in n||qe in ot))return!1;if(!(de&&!He[be]&&mn(Re,be))){if(!(I&&mn(re,be))){if(!(Ze.attributeCheck instanceof Function&&Ze.attributeCheck(be,T))){if(!we[be]||He[be]){if(!(Jt(T)&&(xe.tagNameCheck instanceof RegExp&&mn(xe.tagNameCheck,T)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(T))&&(xe.attributeNameCheck instanceof RegExp&&mn(xe.attributeNameCheck,be)||xe.attributeNameCheck instanceof Function&&xe.attributeNameCheck(be,T))||be==="is"&&xe.allowCustomizedBuiltInElements&&(xe.tagNameCheck instanceof RegExp&&mn(xe.tagNameCheck,qe)||xe.tagNameCheck instanceof Function&&xe.tagNameCheck(qe))))return!1}else if(!Rt[be]){if(!mn(E,Xo(qe,ve,""))){if(!((be==="src"||be==="xlink:href"||be==="href")&&T!=="script"&&sh(qe,"data:")===0&&Fe[T])){if(!(ne&&!mn(M,Xo(qe,ve,"")))){if(qe)return!1}}}}}}}return!0},Jt=function(T){return T!=="annotation-xml"&&Xa(T,Te)},Xt=function(T){Kt(Y.beforeSanitizeAttributes,T,null);let{attributes:be}=T;if(!be||Vt(T))return;let qe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},ft=be.length;for(;ft--;){let p=be[ft],{name:f,namespaceURI:$,value:O}=p,F=he(f),ee=O,pe=f==="value"?ee:ih(ee);if(qe.attrName=F,qe.attrValue=pe,qe.keepAttr=!0,qe.forceKeepAttr=void 0,Kt(Y.uponSanitizeAttribute,T,qe),pe=qe.attrValue,ut&&(F==="id"||F==="name")&&(Pt(f,T),pe=ct+pe),me&&mn(/((--!?|])>)|<\/(style|title|textarea)/i,pe)){Pt(f,T);continue}if(F==="attributename"&&Xa(pe,"href")){Pt(f,T);continue}if(qe.forceKeepAttr)continue;if(!qe.keepAttr){Pt(f,T);continue}if(!ce&&mn(/\/>/i,pe)){Pt(f,T);continue}$e&&bi([X,J,_e],Qe=>{pe=Xo(pe,Qe," ")});let Ce=he(T.nodeName);if(!Bt(Ce,F,pe)){Pt(f,T);continue}if(N&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!$)switch(m.getAttributeType(Ce,F)){case"TrustedHTML":{pe=N.createHTML(pe);break}case"TrustedScriptURL":{pe=N.createScriptURL(pe);break}}if(pe!==ee)try{$?T.setAttributeNS($,f,pe):T.setAttribute(f,pe),Vt(T)?xt(T):$d(t.removed)}catch{Pt(f,T)}}Kt(Y.afterSanitizeAttributes,T,null)},un=function fe(T){let be=null,qe=lt(T);for(Kt(Y.beforeSanitizeShadowDOM,T,null);be=qe.nextNode();)Kt(Y.uponSanitizeShadowNode,be,null),wn(be),Xt(be),be.content instanceof s&&fe(be.content);Kt(Y.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(fe){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},be=null,qe=null,ft=null,p=null;if(Lt=!fe,Lt&&(fe="<!-->"),typeof fe!="string"&&!Zt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Qo("dirty is not a string, aborting")}else throw Qo("toString is not a function");if(!t.isSupported)return fe;if(Ge||Tt(T),t.removed=[],typeof fe=="string"&&(G=!1),G){if(fe.nodeName){let O=he(fe.nodeName);if(!te[O]||Me[O])throw Qo("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)be=Ht("<!---->"),qe=be.ownerDocument.importNode(fe,!0),qe.nodeType===Jo.element&&qe.nodeName==="BODY"||qe.nodeName==="HTML"?be=qe:be.appendChild(qe);else{if(!Se&&!$e&&!Ne&&fe.indexOf("<")===-1)return N&&V?N.createHTML(fe):fe;if(be=Ht(fe),!be)return Se?null:V?C:""}be&&et&&xt(be.firstChild);let f=lt(G?fe:be);for(;ft=f.nextNode();)wn(ft),Xt(ft),ft.content instanceof s&&un(ft.content);if(G)return fe;if(Se){if(Q)for(p=K.call(be.ownerDocument);be.firstChild;)p.appendChild(be.firstChild);else p=be;return(we.shadowroot||we.shadowrootmode)&&(p=D.call(r,p,!0)),p}let $=Ne?be.outerHTML:be.innerHTML;return Ne&&te["!doctype"]&&be.ownerDocument&&be.ownerDocument.doctype&&be.ownerDocument.doctype.name&&mn(Id,be.ownerDocument.doctype.name)&&($="<!DOCTYPE "+be.ownerDocument.doctype.name+`>
`+$),$e&&bi([X,J,_e],O=>{$=Xo($,O," ")}),N&&V?N.createHTML($):$},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(fe),Ge=!0},t.clearConfig=function(){Je=null,Ge=!1},t.isValidAttribute=function(fe,T,be){Je||Tt({});let qe=he(fe),ft=he(T);return Bt(qe,ft,be)},t.addHook=function(fe,T){typeof T=="function"&&Vo(Y[fe],T)},t.removeHook=function(fe,T){if(T!==void 0){let be=rh(Y[fe],T);return be===-1?void 0:oh(Y[fe],be,1)[0]}return $d(Y[fe])},t.removeHooks=function(fe){Y[fe]=[]},t.removeAllHooks=function(){Y=Cd()},t}var Dd=Ld();var er={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wi=e=>(...t)=>({_$litDirective$:e,values:t}),_o=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var es=class extends _o{constructor(t){if(super(t),this.it=jt,t.type!==er.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===jt||t==null)return this._t=void 0,this.it=t;if(t===Sn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};es.directiveName="unsafeHTML",es.resultType=1;var Pd=wi(es);function al(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Pr=al();function Ud(e){Pr=e}var os={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(bn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var wh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},kh=/^(?:[ \t]*(?:\n|$))+/,$h=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ss=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ah=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ll=/(?:[*+-]|\d{1,9}[.)])/,Wd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zd=kt(Wd).replace(/bull/g,ll).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Sh=kt(Wd).replace(/bull/g,ll).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),cl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Eh=/^[^\n]+/,ul=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Th=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ul).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ch=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ll).getRegex(),Ei="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",dl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rh=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",dl).replace("tag",Ei).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hd=kt(cl).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex(),Oh=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hd).getRegex(),pl={blockquote:Oh,code:$h,def:Th,fences:xh,heading:Ah,hr:ss,html:Rh,lheading:zd,list:Ch,newline:kh,paragraph:Hd,table:os,text:Eh},Md=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex(),Ih={...pl,lheading:Sh,table:Md,paragraph:kt(cl).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Md).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ei).getRegex()},Lh={...pl,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",dl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:os,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt(cl).replace("hr",ss).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Dh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ph=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Gd=/^( {2,}|\\)\n(?!\s*$)/,Mh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ti=/[\p{P}\p{S}]/u,fl=/[\s\p{P}\p{S}]/u,Kd=/[^\s\p{P}\p{S}]/u,Nh=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,fl).getRegex(),Yd=/(?!~)[\p{P}\p{S}]/u,qh=/(?!~)[\s\p{P}\p{S}]/u,jh=/(?:[^\s\p{P}\p{S}]|~)/u,Fh=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",wh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Vd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bh=kt(Vd,"u").replace(/punct/g,Ti).getRegex(),Uh=kt(Vd,"u").replace(/punct/g,Yd).getRegex(),Xd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wh=kt(Xd,"gu").replace(/notPunctSpace/g,Kd).replace(/punctSpace/g,fl).replace(/punct/g,Ti).getRegex(),zh=kt(Xd,"gu").replace(/notPunctSpace/g,jh).replace(/punctSpace/g,qh).replace(/punct/g,Yd).getRegex(),Hh=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Kd).replace(/punctSpace/g,fl).replace(/punct/g,Ti).getRegex(),Gh=kt(/\\(punct)/,"gu").replace(/punct/g,Ti).getRegex(),Kh=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yh=kt(dl).replace("(?:-->|$)","-->").getRegex(),Vh=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xh=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Qd=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",xi).replace("ref",ul).getRegex(),Zd=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ul).getRegex(),Qh=kt("reflink|nolink(?!\\()","g").replace("reflink",Qd).replace("nolink",Zd).getRegex(),Nd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,_l={_backpedal:os,anyPunctuation:Gh,autolink:Kh,blockSkip:Fh,br:Gd,code:Ph,del:os,emStrongLDelim:Bh,emStrongRDelimAst:Wh,emStrongRDelimUnd:Hh,escape:Dh,link:Xh,nolink:Zd,punctuation:Nh,reflink:Qd,reflinkSearch:Qh,tag:Vh,text:Mh,url:os},Zh={..._l,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",xi).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xi).getRegex()},ol={..._l,emStrongRDelimAst:zh,emStrongLDelim:Uh,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Nd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Nd).getRegex()},Jh={...ol,br:kt(Gd).replace("{2,}","*").getRegex(),text:kt(ol.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ki={normal:pl,gfm:Ih,pedantic:Lh},ts={normal:_l,gfm:ol,breaks:Jh,pedantic:Zh},eb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},qd=e=>eb[e];function tr(e,t){if(t){if(bn.escapeTest.test(e))return e.replace(bn.escapeReplace,qd)}else if(bn.escapeTestNoEncode.test(e))return e.replace(bn.escapeReplaceNoEncode,qd);return e}function jd(e){try{e=encodeURI(e).replace(bn.percentDecode,"%")}catch{return null}return e}function Fd(e,t){let n=e.replace(bn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(bn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(bn.slashPipe,"|");return r}function ns(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function tb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Bd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function nb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ai=class{constructor(e){It(this,"options");It(this,"rules");It(this,"lexer");this.options=e||Pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ns(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=nb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ns(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ns(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ns(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=_,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,k=m.raw+`
`+n.join(`
`),R=this.blockquote(k);s[s.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-m.text.length)+R.text;break}else if(h?.type==="list"){let m=h,k=m.raw+`
`+n.join(`
`),R=this.list(k);s[s.length-1]=R,r=r.substring(0,r.length-h.raw.length)+R.raw,o=o.substring(0,o.length-m.raw.length)+R.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),h=e.split(`
`,1)[0],m=!_.trim(),k=0;if(this.options.pedantic?(k=2,d=_.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=_.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(k),j=this.rules.other.hrRegex(k),B=this.rules.other.fencesBeginRegex(k),ie=this.rules.other.headingBeginRegex(k),z=this.rules.other.htmlBeginRegex(k);for(;e;){let N=e.split(`
`,1)[0],C;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),C=h):C=h.replace(this.rules.other.tabCharGlobal,"    "),B.test(h)||ie.test(h)||z.test(h)||R.test(h)||j.test(h))break;if(C.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+C.slice(k);else{if(m||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(_)||ie.test(_)||j.test(_))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=N+`
`,e=e.substring(N.length+1),_=C.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Fd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Fd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=ns(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=tb(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Bd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Bd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,_=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=_.slice(1,-1);return{type:"em",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Dn=class sl{constructor(t){It(this,"tokens");It(this,"options");It(this,"state");It(this,"inlineQueue");It(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Pr,this.options.tokenizer=this.options.tokenizer||new Ai,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:bn,block:ki.normal,inline:ts.normal};this.options.pedantic?(n.block=ki.pedantic,n.inline=ts.pedantic):this.options.gfm&&(n.block=ki.gfm,this.options.breaks?n.inline=ts.breaks:n.inline=ts.gfm),this.tokenizer.rules=n}static get rules(){return{block:ki,inline:ts}}static lex(t,n){return new sl(n).lex(t)}static lexInline(t,n){return new sl(n).inlineTokens(t)}lex(t){t=t.replace(bn.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Si=class{constructor(e){It(this,"options");It(this,"parser");this.options=e||Pr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(bn.notSpaceStart)?.[0],o=e.replace(bn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+tr(r)+'">'+(n?o:tr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:tr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=jd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+tr(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=jd(e);if(o===null)return tr(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${tr(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},ml=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Pn=class il{constructor(t){It(this,"options");It(this,"renderer");It(this,"textRenderer");this.options=t||Pr,this.options.renderer=this.options.renderer||new Si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ml}static parse(t,n){return new il(n).parse(t)}static parseInline(t,n){return new il(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},$i,rs=($i=class{constructor(e){It(this,"options");It(this,"block");this.options=e||Pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Dn.lex:Dn.lexInline}provideParser(){return this.block?Pn.parse:Pn.parseInline}},It($i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),It($i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$i),rb=class{constructor(...e){It(this,"defaults",al());It(this,"options",this.setOptions);It(this,"parse",this.parseMarkdown(!0));It(this,"parseInline",this.parseMarkdown(!1));It(this,"Parser",Pn);It(this,"Renderer",Si);It(this,"TextRenderer",ml);It(this,"Lexer",Dn);It(this,"Tokenizer",Ai);It(this,"Hooks",rs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Si(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ai(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new rs;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];rs.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&rs.passThroughHooksRespectAsync.has(s))return(async()=>{let _=await l.call(o,u);return a.call(o,_)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(o,u);return _===!1&&(_=await a.apply(o,u)),_})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Dn.lex(e,t??this.defaults)}parser(e,t){return Pn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Pn.parse:Pn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Pn.parse:Pn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+tr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Dr=new rb;function Ct(e,t){return Dr.parse(e,t)}Ct.options=Ct.setOptions=function(e){return Dr.setOptions(e),Ct.defaults=Dr.defaults,Ud(Ct.defaults),Ct};Ct.getDefaults=al;Ct.defaults=Pr;Ct.use=function(...e){return Dr.use(...e),Ct.defaults=Dr.defaults,Ud(Ct.defaults),Ct};Ct.walkTokens=function(e,t){return Dr.walkTokens(e,t)};Ct.parseInline=Dr.parseInline;Ct.Parser=Pn;Ct.parser=Pn.parse;Ct.Renderer=Si;Ct.TextRenderer=ml;Ct.Lexer=Dn;Ct.lexer=Dn.lex;Ct.Tokenizer=Ai;Ct.Hooks=rs;Ct.parse=Ct;var Ax=Ct.options,Sx=Ct.setOptions,Ex=Ct.use,Tx=Ct.walkTokens,Cx=Ct.parseInline;var Rx=Pn.parse,Ox=Dn.lex;function pr(e){let t=Ct.parse(e),n=Dd.sanitize(t);return Pd(n)}function nr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function mo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ci(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var ep={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ob={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},sb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ib=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Mn(e){return!!e&&typeof e=="object"}function gl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function hl(e,t){let n=gl(e),r=gl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function tp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Mn(o)&&typeof o.text=="string"?o.text:"").join(""):Mn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ab(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:ep[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=gl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=hl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=hl(Mn(l)?l.old_string:"",Mn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function bl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var lb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function np(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Mn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(lb,"").trim();return n.length>0?{kind:"user",text:n}:null}function yl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=sb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ib.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function cb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function ub(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Mn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(yl(i.text));else if(i.type==="thinking"){let l=bl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=ab(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Jd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Mn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=tp(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=np(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Jd([o],n):[o]}return[]}function Jd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function db(e){let t=typeof e.command=="string"?e.command:"",n=tp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:ep.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function pb(e){if(e.type==="item.completed"&&Mn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[yl(t.text)];if(t.type==="user_message"){let n=np(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=bl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[db(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function fb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Mn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Mn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[yl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=bl(n.text);return i?[i]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=ob[n.activity];if(!r)return[];let o,s;if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:s,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function _b(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function mb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Mn(t)?t:null}function rp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=mb(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return cb(s,r);let i=s.schema==="codex-delegation-monitor-v1"?fb(s):_b(s)?pb(s):ub(s,n);return i.length>0&&(r.progress=null),i}}}function vl(e){let t=[],n=rp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var gb=5,hb=10,bb=/Task\s+#(\d+)/,yb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,vb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function wb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function kb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function $b(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=bb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function xb(e){if(e.tool==="Bash"){let t=e.command||"";return yb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":vb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ab(e){let t=e.filter(o=>o.kind==="tool").slice(-hb),n=new Map;t.forEach((o,s)=>{let i=xb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Sb(e){let t=kb(e);if(t)return{text:t,guess:!1};let n=$b(e);if(n)return{text:n,guess:!1};let r=Ab(e);return r?{text:r,guess:!0}:null}function Eb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:fn(e,t)}function go(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,_={},h=!0,m=new Set,k=new Set,R=null,j=null,B=!1,ie=!1,z=!1,N=null,C=null;function L(){B=!1,ie=!1,z=!1,N=null,C=null}async function U(Q){if(n){ie=!0,z=!1,Me();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(s!==Q)return;!V||typeof V!="object"||Array.isArray(V)?z=!0:(N=V,C=Q)}catch{s===Q&&(z=!0)}finally{s===Q&&(ie=!1,Me())}}}function K(){if(B=!B,B&&s&&C!==s){U(s);return}Me()}function H(){if(!B)return"";let Q=mo({loading:ie,error:z});if(Q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Ci(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let Q=r.get(a);return vl(Q?Q.lines:[])}function Y(){if(!a||!r)return null;let Q=r.get(a),V=Q?Q.last_event_at:null;return typeof V=="number"?V:null}function X(){return _.status==="running"}function J(){if(X()&&s){j||(j=setInterval(()=>Me(),1e3));return}_e()}function _e(){j&&(clearInterval(j),j=null)}function Re(Q){let V=[],Be=0;for(;Be<Q.length;){let{idx:ut,line:ct}=Q[Be];if(ct.kind==="tool"){let y=Be;for(;y<Q.length&&Q[y].line.kind==="tool"&&Q[y].line.tool===ct.tool;)y+=1;if(y-Be>=gb&&!k.has(ut)){V.push({kind:"group",idx:ut,tool:ct.tool||"",lines:Q.slice(Be,y)}),Be=y;continue}}V.push({kind:"line",idx:ut,line:ct}),Be+=1}return V}function re(Q){let V=[],Be=new Map;for(let y=0;y<Q.length;y+=1){let G=Q[y],Ie=G.parent_tool_use_id;if(typeof Ie=="string"&&Ie.length>0){let Pe=Be.get(Ie);Pe||(Pe={kind:"subagent",idx:y,launch_id:Ie,agent_type:null,header:null,lines:[]},Be.set(Ie,Pe),V.push(Pe)),Pe.lines.push({idx:y,line:G});continue}if(G.kind==="tool"&&G.tool==="Agent"&&typeof G.launch_id=="string"&&G.launch_id.length>0){let Pe=M(G),We=Be.get(G.launch_id);if(We){We.header={idx:y,line:G},We.agent_type=Pe;continue}let Fe={kind:"subagent",idx:y,launch_id:G.launch_id,agent_type:Pe,header:{idx:y,line:G},lines:[]};Be.set(G.launch_id,Fe),V.push(Fe);continue}V.push({kind:"entry",idx:y,line:G})}let ut=[],ct=0;for(;ct<V.length;){if(V[ct].kind!=="entry"){ut.push(V[ct]),ct+=1;continue}let y=ct;for(;y<V.length&&V[y].kind==="entry";)y+=1;ut.push(...Re(V.slice(ct,y))),ct=y}return ut}function M(Q){let V=Q.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function ve(Q){for(let V=Q.length-1;V>=0;V-=1){let Be=Q[V];if(Be.kind==="result"||Be.kind==="error")return null;if(Be.kind==="tool"&&!Object.hasOwn(Be,"result"))return Be}return null}function Te(Q){for(let V=Q.length-1;V>=0;V-=1)if(Q[V].kind==="thinking")return Q[V];return null}function E(Q,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let Be=m.has(Q);return c`<div
        class="sv__think${Be?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(Q)}
      >
        <span class="sv__think-line">💭 ${is(V.text)}</span>
        ${Be?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="user"){let Be=m.has(Q);return c`<div
        class="sv__line sv__line--user${Be?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(Q)}
      >
        <span class="sv__user-line">▷ ${is(V.text)}</span>
        ${Be?c`<pre class="sv__user-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let Be=m.has(Q),ut=V.tool==="Bash"?wb(V.command):0,ct=V.tool==="Bash"?ut>1?is(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${Be?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ze(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${ct?c`<span class="sv__tool-detail">${ct}</span>`:""}
          ${ut>1?c`<span class="sv__tool-more">⋯ ${ut}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${Be?c`<pre class="sv__tool-expand">${te(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${pr(V.text||"")}</div>`}function te(Q){let V=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)V.push(Q.command);else if(Q.input!==void 0)try{V.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&V.push(`output:
${Q.output}`),V.join(`

`)}function ke(){if(!s)return c``;let Q=D(),V=(i?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Be=_.session_id||"",ut=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,ct=X(),y=ct?Eb(Y(),Date.now()):"",G=ct?ve(Q):null,Ie=ct?Te(Q):null,Pe=Sb(Q);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(i?_.role||"":s)}</span
        >
        ${Pe?c`<span
              class="sv__stage${Pe.guess?" sv__stage--guess":""}"
              title=${Pe.text}
              >${Pe.text}</span
            >`:""}
        ${ct?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${y?c`<span class="sv__live-ago">${y}</span>`:""}</span
            >`:""}
        ${Be?c`<button
              type="button"
              class="sv__session"
              title=${Be}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Be}`}
              @click=${()=>de(Be)}
            >
              ⧉ ${Be.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>de(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${V?c`<span class="sv__meta">${V}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
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
          aria-label=${ut}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${ut}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Se()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":H()}
      <div class="sv__body">
        ${Q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:re(Q).map(We=>We.kind==="subagent"?Oe(We):We.kind==="group"?we(We):E(We.idx,We.line))}
      </div>
      ${G||Ie?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${G?c`<span class="sv__now-icon">${G.icon}</span>
                  <span class="sv__now-name">${G.tool}</span>
                  <span class="sv__now-detail"
                    >${G.tool==="Bash"?is(G.command):G.path||G.command||""}</span
                  >`:""}
            ${Ie?c`<span class="sv__now-think"
                  >💭 ${is(Ie.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function we(Q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>xe(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(Q){let V=k.has(Q.idx),Be=Q.header?Q.header.line:null,ut=Be?Be.is_error===!0?"\u2717":typeof Be.result=="string"?"\u2713":"\u27F3":"",ct=Be&&Be.command?Be.command:"";return c`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xe(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${ct?c`<span class="sv__sub-detail">${ct}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${ut?c`<span class="sv__sub-state">${ut}</span>`:""}
        ${V?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?c`<div class="sv__sub-body">
            ${Re(Q.lines).map(y=>y.kind==="group"?we(y):E(y.idx,y.line))}
          </div>`:""}
    </div>`}function xe(Q){k.add(Q),Me()}function Me(){at(ke(),e),J(),h&&He()}function He(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function Ze(Q){m.has(Q)?m.delete(Q):m.add(Q),Me()}function I(){h=!h,Me()}function de(Q){_n(Q).then(V=>{V?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(Q){!s||!Q||(_={..._,...Q},Me())}function ce(Q){let V=Q.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&h&&(h=!1,Me())}e.addEventListener("scroll",ce,!0);function $e(Q){let V=Q.target;!V||typeof V.closest!="function"||e.contains(V)||V.closest("dialog")||V.closest(".md-viewer-root")||Se()}let me=!1;function Ne(){me||(document.addEventListener("mousedown",$e),me=!0)}function Ge(){me&&(document.removeEventListener("mousedown",$e),me=!1)}function et(Q){let V=Q&&Q.attempt_id;if(!V)return;let Be=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,ut=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Be&&ut)return;let ct=a;s=V,i=Be,l=ut,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&ct&&ct!==a&&Promise.resolve(n("unsubscribe-session-log",{id:ct})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,_=Q.meta||{},d=Q.hide_prompt===!0,h=!0,m.clear(),k.clear(),L(),!R&&r&&(R=r.subscribe(Me)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ne(),Me()}function Se(){let Q=a;Ge(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),L(),_e(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),at(c``,e),o&&o()}return{open:et,updateMeta:ne,close:Se,isOpen(){return s!==null},destroy(){_e(),Ge(),R&&(R(),R=null),e.removeEventListener("scroll",ce,!0),s=null,i=null,l=null,a=null,u=null,d=!1,at(c``,e)}}}function Tb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Cb(e){let t=e&&e.metadata||{},n=Kr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Tb(t)?null:"plan_pending"}),r}function op(e,t){let n=Cb(e);return c`
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
  `}var Rb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Ob=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ib=/^\*\*결론\*\* — (.+)$/;function Ri(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Rb)return null;let n=Ob.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Ib.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var sp=20;function ip(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Lb(e){return e.length>sp?`${e.slice(0,sp)}\u2026`:e}function Db(e,t,n,r){let o=`${t.lane} ${Lb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ip(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function Pb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ip(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ap(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ri(typeof a.text=="string"?a.text:"");return u?Db(a,u,t,o.has(a.id)):Pb(a)})}
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
  `}var{I:d0}=Xl;var lp=e=>e.strings===void 0;var Mb={},cp=(e,t=Mb)=>e._$AH=t;var fr=wi(class extends _o{constructor(e){if(super(e),e.type!==er.PROPERTY&&e.type!==er.ATTRIBUTE&&e.type!==er.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!lp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Sn||t===jt)return t;let n=e.element,r=e.name;if(e.type===er.PROPERTY){if(t===n[r])return Sn}else if(e.type===er.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Sn}else if(e.type===er.ATTRIBUTE&&n.getAttribute(r)===t+"")return Sn;return cp(e),t}});var Nb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],wl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},up={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},qb={pin:"pin",global:"global",base:"base"};function jb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${qb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Fb(e,t,n){switch(e){case"workflow_mode":return Ro;case"spec_review_model":case"impl_review_model":return Oo;case"plan_review_model":return Fs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Bs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return io;case"impl_dispatch":return iu;case"impl_runtime":return js;case"impl_model":return ao(n,t.impl_runtime);case"impl_effort":return lo(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return io;case"orchestration_model":return Io(n,null);case"orchestration_effort":return lo(n,void 0,t.orchestration_model||An).filter(r=>r!==An);default:return[]}}function Bb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${jb(e.source)}
    <span class="detail-effective__k"
      >${lr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Us[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${lr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function dp(e,t){let n=$a.flatMap(a=>a.keys),r=xa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=_u(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Ub(s)}</span
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
          ${$a.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ps({key:u.key,choices:Fb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Bb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${fr(e.preset_id)}
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
  </details>`}function Ub(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Wb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function pp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Wb(r.exec_receipt),u=a?Gn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],_=Ls(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",k=Do(n),R=k!==null&&t.isChipOpen?.("rec")===!0,j=R?Pa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${R?"true":"false"}
            title=${Hs(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${j?oo(j):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${zb(s).map(B=>Hb(B,n,o,{label:B.id==="pr"?m:B.label,href:B.id==="pr"?i:""}))}
    </div>
  </section>`}function zb(e){let n=typeof e=="string"&&Object.hasOwn(wl,e)&&wl[e]||wl.spec_backed;return Nb.filter(r=>n.includes(r.id))}var Oi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Hb(e,t,n,r){let o=Gb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",_=u?Oi.stale:l?Oi.on:a?Oi.current:Oi.none,h=Kb(e,n),m=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
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
      title=${m}
      >${R}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${R}</span
  >`}function Gb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Kb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(up,n)?up[n]:""}function Ii(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fp(e){return Ii(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function _p(e,t){let n=e&&e[t];if(!Ii(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(fp),o=fp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function hp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Li(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${hp(e)}${t}`}function ho(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${hp(e)}`}function Yb(e,t,n){if(n!==null){let o=e==="claude"?Li:ho,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ho({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function mp(e,t){if(!Ii(e)||e.state!=="usable"||!Ii(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function gp(e){let t=e.provider_key==="claude"?Li:ho,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Yb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function bp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${gp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:_p(t,"claude"),selected:o,workspace_default:mp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${gp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:_p(t,"codex"),selected:s,workspace_default:mp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Vb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Xb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Di(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Vb(o)}</span
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
                        >`}${pr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){at(d(),e)}async function h(R,j={}){o=R,s="loading",i="",l=null,a="",_();let B=j.workspace||(n?n():"");if(!B){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ie="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(R);try{let z=await r(ie),N=await z.json().catch(()=>({}));if(!z.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||z.status)+")",_();return}let C=Xb(String(N.content||""));l=C.front,i=C.body,s="ready",_()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function m(){o=null,at(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:k}}var Qb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],wp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Pi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Zb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function yp(e){return typeof e=="string"&&Zb.has(e)}var Jb=["running","done","failed","interrupted"],ey={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function ty(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ny(e){let t=an(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=no(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${wp}
          >부분 집계</span
        >`:""}`}function vp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function xl(e){if(typeof e=="number")return as(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?as(t):""}function ry(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function kp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function kl(e){return e===null||typeof e=="string"&&e.trim().length>0}function $l(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function oy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Pi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?kl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||kl(t.effort))||!(!("agent_type"in t)||kl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Jb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!$l(t.started_at)||!$l(t.last_event_at)||!$l(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function sy(e,t,n,r){let s=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=kp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${xl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${xl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function iy(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?an({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?as(e.last_event_at):s?xl(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,ry(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=kp(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ey[e.status]}</span
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
  </button>`}function ay(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function ly(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let _ of s){let h=oy(_);!h||o.has(h.launch_id)||yp(h.agent_type)||(o.add(h.launch_id),r.push(h))}r.sort((_,h)=>(_.started_at||0)-(h.started_at||0));let i={};for(let{role:_,provider:h}of Pi){let m=t?t.roles[_]?.[h]:null;i[_]=m?[...m.legs]:[]}let l=Pi.flatMap(({role:_})=>i[_]),a=new Set,u=new Set,d=[];for(let{role:_,provider:h}of Pi){for(let m of r.filter(k=>k.role===_&&k.provider===h)){let k=l.find(j=>j.receipt_id===m.launch_id)||null;if(k&&!ay(m,k))continue;k&&a.add(k.receipt_id);let R=h==="codex"&&u.has(m.session_id);d.push(iy(m,k,e.attempt_id,n,R)),h==="codex"&&u.add(m.session_id)}for(let m of i[_])if(!a.has(m.receipt_id)&&!yp(m.agent_type)){let k=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,R=h==="codex"&&k!==null&&u.has(k);d.push(sy(_,h,m,R)),h==="codex"&&k!==null&&u.add(k)}}return d}function cy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Qb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${ty(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${wp}</span>`:""}
  </div>`}var uy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function as(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function dy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var py={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function fy(e,t){let n=py[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${_a(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${To(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${as(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function $p(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>fy(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let R=typeof m.session_id=="string"&&m.session_id.length>0,j=u.has(m.attempt_id),B=R&&!j,ie=R?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!B}
      title=${ie}
      @click=${z=>{z.stopPropagation(),B&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let R=m.cause_detail,j=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:m.cause;return c`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},h=m=>{let k=vp(ba(m));if(an(k).length===0&&!no(m.usage))return"";let R=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${ny(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=ba(m),R=vp(k),j=an(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${uy[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${Eo(m)?c`<span
                  class="detail-session__resumed"
                  title=${Eo(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Er(m)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(B=>c`<span
                      class="detail-session__usage"
                      title=${B.tooltip}
                      >${B.label}</span
                    >`):no(m.usage)?c`<span class="detail-session__usage"
                    >${no(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${as(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${_(m)} ${dy(m)}
          ${a.has(m.attempt_id)&&m.usage?cy(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${ly(m,k,t)}
        </div>`})}
    </div>
  `}function xp(e,t={}){return c`
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
          ${_y(e)}
        </div>`:""}
  `}function _y(e){let t=mo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ci(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Mr=10;function Ap(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Sp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Mr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${Ap(l.at)?c`<span class="detail-timeline__at"
                  >${Ap(l.at)}</span
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
  `}var my=["open","in_progress","deferred","resolved","closed"],gy=[0,1,2,3,4];function Ep(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,_={},h="",m=!1,k=[],R=!1,j={},B={claude:null,codex:null},ie=null,z=null,N=0,C=!1,L=!1,U="",K="",H="",D="",Y=!1;function X(){C=!1,L=!1,U="",K="",H="",D="",Y=!1}function J(){B={claude:null,codex:null},ie=null,z=null,N+=1}async function _e(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function Re(w){try{let P=await fetch(w);if(!P.ok)return null;let W=await P.json();if(!W||typeof W!="object"||!Array.isArray(W.accounts))return null;let Ae=W.accounts.filter(rt=>rt!==null&&typeof rt=="object"&&!Array.isArray(rt));return{accounts:Ae,active:Ae.find(rt=>rt.active===!0)||null}}catch{return null}}async function re(w){z=w;let P=++N,[W,Ae,rt]=await Promise.all([Re("/api/claude-usage"),Re("/api/codex-usage"),_e()]);P!==N||w!==u||(B={claude:W,codex:Ae},ie=rt,Ve())}let M=[],ve=null,Te=null,E=!1,te="",ke=!1,we=0,Oe=new Set;function xe(){M=[],ve=null,Te=null,E=!1,te="",ke=!1,we+=1,Oe.clear()}async function Me(w){if(!o)return;let P=++we;try{let W=await Promise.resolve(o("get-comments",{id:w}));if(P!==we||w!==u)return;M=Array.isArray(W)?W:[],E=!1}catch{if(P!==we||w!==u)return;E=!0}Ve()}function He(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ve!==u){ve=u,Te=w,Me(u);return}w!==null&&w!==Te&&(Te=w,Me(u))}function Ze(w){Oe.has(w)?Oe.delete(w):Oe.add(w),Ve()}function I(w){let P=te.trim().length===0;te=w,P!==(w.trim().length===0)&&Ve()}async function de(){let w=te.trim();if(!o||!u||w.length===0||ke)return;let P=u;ke=!0,Ve();let W=!1;try{let Ae=await Promise.resolve(o("add-comment",{id:P,text:w}));Array.isArray(Ae)&&Ae.length>0&&(W=!0,P===u&&(M=Ae,E=!1,te="",Te=Ae.length))}catch{W=!1}W||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&(ke=!1),Ve()}let ne={onToggle:Ze,onDraftInput:I,onSubmit:de},ce=t.mdViewer||null,$e=null;ce||($e=document.createElement("div"),$e.className="md-viewer-root",document.body.appendChild($e));let me=ce||Di($e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let Ge=go(Ne,{transport:o?(w,P)=>Promise.resolve(o(w,P)):void 0,sessionLogStore:a}),et=!1,Se=!1,Q=!1,V=null,Be=null,ut=0;function ct(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function y(){et=!1,Se=!1,Q=!1,V=null,Be=null,ut+=1}async function G(w){if(!o)return;let P=++ut;Se=!0,Q=!1,Ve();try{let W=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(P!==ut)return;!W||typeof W!="object"||Array.isArray(W)?Q=!0:(V=W,Be=ct(w))}catch{P===ut&&(Q=!0)}finally{P===ut&&(Se=!1,Ve())}}let Ie=[],Pe=null,We=0;function Fe(w,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${P}`}function Ye(){Ie=[],Pe=null,We+=1}async function Rt(w,P){if(!o)return;let W=++We,Ae;try{Ae=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{Ae=null}W!==We||P!==Pe||(Ie=Ae&&Array.isArray(Ae.sessions)?Ae.sessions:[],Ve())}function Mt(){if(!o||!u)return;let w=d&&d.metadata,P=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(P===null){Ye();return}let W=Fe(u,P);Pe!==W&&(Ie=[],Pe=W,Rt(u,W))}let Ot=[],yt=[],pt=Mr,Et=null,Lt=0;function qt(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function le(){Ot=[],yt=[],pt=Mr,Et=null,Lt+=1}async function ae(w,P){if(!o)return;let W=++Lt,Ae;try{Ae=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{Ae=null}W!==Lt||P!==Et||(Ot=Ae&&Array.isArray(Ae.events)?Ae.events:[],yt=Ae&&Array.isArray(Ae.attempts)?Ae.attempts:[],pt=Mr,Ve())}function x(){if(!o||!u)return;let w=qt(u);Et!==w&&(Ot=[],yt=[],pt=Mr,Et=w,ae(u,w))}function q(){pt+=Mr,Ve()}function oe(){if(et=!et,et&&u&&Be!==ct(u)){V=null,G(u);return}Ve()}function se(){let w={};for(let W of yt)W&&typeof W=="object"&&W.bead_id===u&&(w[String(W.attempt_id)]=W);let P=i?i.get():null;for(let W of P&&P.attempts?Object.values(P.attempts):[]){let Ae=W;Ae&&Ae.bead_id===u&&(w[String(Ae.attempt_id)]=Ae)}return w}function Ee(){return u?Object.values(se()).sort((P,W)=>(W.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function he(){return u?Vn(se(),u):null}let Je=new Set;function ot(w){Je.has(w)?Je.delete(w):Je.add(w),Ve()}function ze(w){let P=i?i.get():null,W=P&&P.attempts?P.attempts[w]:null;Ge.open({attempt_id:w,meta:W?{runner:W.runner||void 0,model:W.model||void 0,effort:W.effort||void 0,status:W.status||void 0,session_id:W.session_id||void 0}:{}})}function Tt(w,P){let W=i?i.get():null,Ae=W&&W.attempts?W.attempts[w]:null,tt=(Ae&&Array.isArray(Ae.delegation_sessions)?Ae.delegation_sessions:[]).find(gt=>gt&&typeof gt=="object"&&gt.launch_id===P);tt&&Ge.open({attempt_id:w,launch_id:P,meta:{runner:tt.provider==="claude"?"claude":"codex",role:tt.role,...typeof tt.agent_type=="string"?{agent_type:tt.agent_type}:{},model:tt.model,effort:tt.effort,session_id:tt.session_id,status:tt.status}})}async function Dt(w){if(!o||!w)return;let P=await Jr();if(P===null)return;let W=()=>{let gt=i?i.get():null;return gt&&typeof gt.revision=="number"?gt.revision:0},Ae=async(gt={},Xe=W())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Xe,...P!==""?{instructions:P}:{},...gt}),rt=gt=>{gt?.queue&&i?.set&&i.set(gt.queue)},tt=await Ae();if(rt(tt),tt&&tt.conflict){let gt=tt.queue&&typeof tt.queue.revision=="number"?tt.queue.revision:W();tt=await Ae({},gt),rt(tt)}tt=await Kn(tt,(gt,Xe)=>Ae({continuation:gt,decision_token:Xe}),{onResult:rt,refresh:()=>Ae()}),tt&&tt.resumed===!1&&!tt.conflict&&tt.reason&&ge(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${tt.reason}`,"error",2400)}function ht(w){!w||!u||Ge.open(eo(w,u,d&&d.status))}let Yt={onOpen:ze,onOpenDelegation:Tt,onResume:Dt,onToggleUsage:ot,onOpenSessionRef:ht,onCopyResumeCommand:p};function xt(){let w=i?i.get():null,P={...j};for(let W of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ae=w&&w[W];typeof Ae=="string"&&(P[W]=Ae)}return P}async function Pt(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));j=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{j={}}Ve()}}function Ht(){let w=i?i.get():null;return w&&w.runner_catalog||null}function lt(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Vt(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},W=$n({pin:{...w,..._},global:xt(),execution_defaults:lt(),runner_catalog:Ht(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return On(Ht(),W)}function Zt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Kt(w){return w?.compatible===!1}function wn(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Bt(){let w=Zt(),P=w?.presets.find(W=>W.id===h);if(!(!o||!u||!w||!P||Kt(P)||m)){m=!0,k=[],Ve();try{let W=await Promise.resolve(o("apply-impl-preset",gu(u,P.id,w.revision)));if(W&&W.conflict){wn(W),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ae=W&&Array.isArray(W.issue)?W.issue[0]:W?.issue;if(W&&W.applied&&Ae&&typeof Ae=="object"){d=Ae,k=Array.isArray(W.skipped_orchestration_keys)?W.skipped_orchestration_keys.filter(rt=>typeof rt=="string"):[];for(let rt of hu)delete _[rt];ge(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}W&&W.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(W){W&&typeof W=="object"&&W.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,Ve()}}}let Jt=null;n&&n.subscribe&&(Jt=n.subscribe(()=>ft()));let Xt=null;i&&typeof i.subscribe=="function"&&(Xt=i.subscribe(()=>{u&&Ve()}));let un=null,fe=null;function T(){fe&&(fe(),fe=null)}l&&typeof l.subscribe=="function"&&(un=l.subscribe(()=>{u&&Ve()}));function be(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",be);let qe=ro(()=>Ve());qe.attach();function ft(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(W=>W&&W.id===u)||w[0]||d}He(),Mt(),x(),Ve()}}function p(w){_n(w).then(P=>{P?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function f(w){w.preventDefault(),w.stopPropagation(),u&&p(u)}function $(w,P){w.preventDefault(),w.stopPropagation(),p(P)}function O(w,P,W){w.preventDefault(),w.stopPropagation(),me.open(P,{missing_state:W})}async function F(w,P){let W=Object.hasOwn(_,w),Ae=_[w];if(_[w]=P,Ve(),!(!o||!u))try{let rt=await Promise.resolve(o("update-exec-settings",mu(u,w,P.length===0?null:P))),tt=Array.isArray(rt)?rt[0]:rt;if(!tt||typeof tt!="object"||!tt.id)throw new Error("exec settings readback failed");d=tt,delete _[w],Ve()}catch(rt){throw W?_[w]=Ae:delete _[w],Ve(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),rt}}function ee(w){w.catch(()=>{})}async function pe(w,P){let W=d||{},Ae=W.metadata&&typeof W.metadata=="object"?W.metadata:{},rt={};for(let Xe of["impl_runtime","impl_model","impl_effort"])rt[Xe]=Object.hasOwn(_,Xe)?_[Xe]:typeof Ae[Xe]=="string"?Ae[Xe]:"";rt[w]=P;let tt=vu(rt,Ht(),Vt()),gt={};for(let Xe of["impl_runtime","impl_model","impl_effort"])gt[Xe]=_[Xe],_[Xe]=tt[Xe]||"";if(Ve(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...tt,orchestration_runtime:Vt()})).then(Xe=>{let dt=Array.isArray(Xe)?Xe[0]:Xe;if(!dt||typeof dt!="object"||!dt.id)throw new Error("implementation target readback failed");d=dt;for(let pn of["impl_runtime","impl_model","impl_effort"])delete _[pn];Ve()}).catch(Xe=>{for(let dt of["impl_runtime","impl_model","impl_effort"])gt[dt]===void 0?delete _[dt]:_[dt]=gt[dt];throw Ve(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Xe})}async function Ce(w,P,W){if(!o||!u)return!1;try{let Ae=await Promise.resolve(o(w,P)),rt=Array.isArray(Ae)?Ae[0]:Ae;return rt&&typeof rt=="object"&&rt.id?(d=rt,!0):(ge(W,"error"),!1)}catch(Ae){return Ae&&typeof Ae=="object"&&Ae.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(W,"error"),!1)}}function Qe(w){setTimeout(()=>{try{let P=e.querySelector(w);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function wt(){C=!0,U=d&&d.title||"",Ve(),Qe('.detail-edit__input[data-edit="title"]')}function vt(w){U=w.target.value}function v(){C=!1,U="",Ve()}function S(){Ce("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(C=!1,U=""),Ve()})}function Le(){L=!0,K=d&&d.description||"",Ve(),Qe('.detail-edit__textarea[data-edit="description"]')}function je(w){K=w.target.value}function nt(){L=!1,K="",Ve()}function bt(){Ce("edit-text",{id:u,field:"description",value:K},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(L=!1,K=""),Ve()})}function Ut(w,P,W,Ae){if(w.key==="Escape"){w.stopPropagation(),W();return}w.key==="Enter"&&(!Ae||w.ctrlKey||w.metaKey)&&(w.preventDefault(),P())}function kn(w){let P=w.target.value;Ce("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ve())}function br(w){let P=Number(w.target.value);Ce("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ve())}function jr(w){H=w.target.value}function fs(){let w=H.trim();w.length!==0&&Ce("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(H=""),Ve()})}function Ki(w){if(w.key==="Escape"){w.stopPropagation(),H="",Ve();return}w.key==="Enter"&&(w.preventDefault(),fs())}function Yi(w){Ce("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ve())}let Vi={onCopyPath:$,onOpenDoc:O};function Fr(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function Br(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function _s(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function g(w,P){let W=b(P),Ae=[];return w.length>0&&Ae.push(w),W&&Ae.push(W),Ae.length>0?Ae.join(`
`):void 0}function b(w){if(!w||typeof w!="object")return;let P=typeof w.status=="string"?w.status:"",W=typeof w.title=="string"?w.title:"";return P.length>0&&W.length>0?`${P} \xB7 ${W}`:void 0}function A(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Z(){return t.depCandidates?t.depCandidates():null}async function ue(w,P,W){let Ae=A(),rt=u;if(!rt)return;if(Ae.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let tt=await Ce(w,{a:rt,b:P,view_id:rt,root_dir:Ae},W),gt=tt===!0||tt!==!1&&tt.saved===!0;gt&&t.onDepChanged&&t.onDepChanged({type:w,a:rt,b:P}),w==="dep-add"&&gt&&(D="",Y=!1),Ve()}function ye(w){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||ue("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Ue(w){w.disabled||ue("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function mt(w){D=w.target.value,Y=!0,Ve()}function Wt(){Y||(Y=!0,Ve())}function st(w,P){if(w.key==="Escape"){w.stopPropagation(),D="",Y=!1,Ve();return}w.key==="Enter"&&(w.preventDefault(),P.length===1&&!P[0].disabled&&Ue(P[0]))}function tn(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${D}
        @focus=${Wt}
        @input=${mt}
        @keydown=${P=>st(P,w)}
      />
      ${Y||D.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(P=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${P.bead_id}
                      ?disabled=${P.disabled}
                      title=${cn(P.reason)}
                      @click=${()=>Ue(P)}
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
    </div>`}function on(w,P){let W=P.get(w.id),Ae=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${cn(w.title)}
          @click=${()=>W===void 0?s(w.id):s(w.id,W)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${cn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${Ae}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>ye(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function qn(w){let P=Array.isArray(w.dependencies)?w.dependencies:[],W=Array.isArray(w.dependents)?w.dependents:[],Ae=[];for(let Xe of P){let dt=Fr(Xe);dt.length>0&&Br(Xe)==="blocks"&&Ae.push({id:dt,label:`\u26D3 ${dt}`,kind:"pred",title:g("\uB9C9\uB294",Xe)})}for(let Xe of W){let dt=Fr(Xe);dt.length>0&&Br(Xe)==="blocks"&&Ae.push({id:dt,label:`\u2192 ${dt}`,kind:"succ",title:g("\uB9C9\uD788\uB294",Xe)})}for(let Xe of P){let dt=Fr(Xe),pn=Br(Xe);if(dt.length>0&&pn!=="blocks"){let bo=_s(pn);Ae.push({id:dt,label:`${bo.glyph}${dt}`,kind:"other",title:g(bo.relation,Xe)})}}let rt=Z(),tt=new Map;if(rt)for(let Xe of rt.issues)tt.has(Xe.bead_id)||tt.set(Xe.bead_id,Xe.root_dir);let gt=rt&&u?wd(vd(u,rt),D):[];return c`
      <div class="detail-section-label">의존성</div>
      ${Ae.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Ae.map(Xe=>on(Xe,tt))}
          </div>`}
      ${rt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:tn(gt)}
    `}function dn(w){let P=w.metadata||{},W=w.workflow||{},Ae=W.stages||{},rt=Ae.spec&&Ae.spec.stale,tt=Ae.impl&&Ae.impl.stale,gt=W.quick_fix_review?.state==="stale",Xe=Ae.plan||null,dt=W.route_source==="derived",pn=W.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${dt?" detail-kv__v--derived":""}"
          title=${dt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${dt?"unset":pn}</span
        >
      </div>
      ${W.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${W.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${W.resolver.attempt} \xB7 ${W.resolver.prior_sha} \u2192 ${W.resolver.sha}`}
              >${`${W.resolver.prior_sha.slice(0,7)} \u2192 ${W.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${W.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${W.planned_execution.kind}</span>
            </div>
            ${W.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${W.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${W.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Gn(W.exec_receipt)}</span
            >
          </div>`:""}
      ${W.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${W.impl_entry.actor}@${W.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let ln={route:["quick_fix","spec_backed","full_plan"]};async function Tn(w,P){let W=P.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&W!=="full_plan"&&!window.confirm(`full_plan \u2192 ${W||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ve();return}await Ce("update-workflow-meta",{id:u,key:w,value:W},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ve()}function nn(w){let P=w.metadata||{};return c` ${((Ae,rt)=>{let tt=ln[Ae],gt=typeof P[Ae]=="string"?P[Ae]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ae}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ae}
          data-edit=${`wfmeta-${Ae}`}
          @change=${Xe=>Tn(Ae,Xe)}
        >
          <option value="" ?selected=${!tt.includes(gt)}>
            ${rt}
          </option>
          ${tt.map(Xe=>c`<option value=${Xe} ?selected=${gt===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function rr(w,P){return C?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${vt}
            @keydown=${W=>Ut(W,S,v,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${S}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${v}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${an(P).map(W=>c`<span class="detail-usage-total" title=${W.tooltip}
              >${W.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${wt}
        >
          ✎
        </button>
      </div>
    `}function yr(w){let P=en(w.created_at),W=en(w.updated_at);return!P&&!W?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${W?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${W}</span>
          </div>`:""}
    `}function or(w,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${kn}
        >
          ${my.map(W=>c`<option value=${W} ?selected=${W===w}>${W}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${br}
        >
          ${gy.map(W=>c`<option value=${String(W)} ?selected=${W===P}>
                P${W}
              </option>`)}
        </select>
      </div>
    `}function Cn(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Le}
            >
              ✎
            </button>`}
      </div>
      ${L?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${K}
              @input=${je}
              @keydown=${P=>Ut(P,bt,nt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${bt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${nt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function jn(w){let P=typeof w.notes=="string"?w.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function Ke(w){let P=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(W=>c`<span class="detail-label-chip"
              >${W}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${W}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+W}
                @click=${()=>Yi(W)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${H}
            @input=${jr}
            @keydown=${Ki}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${fs}
          >
            추가
          </button>
        </span>
      </div>
    `}function zt(){if(!u)return c``;let w=d||{},P=String(w.id||u),W=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ae=he(),rt=w.status||"open",tt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",gt=w.description||"",Xe={...w,metadata:{...w.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${f}
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
          ${rr(W,Ae)}
          ${pp(Xe,{onChipToggle:dt=>qe.toggle({bead_id:P,chip_key:dt}),isChipOpen:dt=>qe.isOpen({bead_id:P,chip_key:dt})})}
          ${dp({metadata:Xe.metadata,workspace_values:xt(),catalog:Ht(),execution_defaults:lt(),expanded:R,presets:Zt()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:k},{onToggle:dt=>{R=dt,Ve()},onEdit:(dt,pn)=>{if(dt==="impl_runtime"||dt==="impl_model"||dt==="impl_effort"){ee(pe(dt,pn??""));return}ee(F(dt,pn??""))},onPresetSelect:dt=>{h=dt,k=[],Ve()},onPresetApply:()=>{Bt()}})}
          ${bp({md:Xe.metadata,catalog:B,workspace_defaults:ie,handlers:{onExecChange:(dt,pn)=>ee(F(dt,pn))}})}
          ${or(rt,tt)} ${yr(w)}
          ${Cn(gt)}
          ${ap(M,ne,{expanded:Oe,draft:te,sending:ke,error:E})}
          ${jn(w)} ${Ke(w)} ${qn(w)}
          ${dn(w)} ${nn(w)}
          ${op(w,Vi)}
          ${xp({expanded:et,loading:Se,error:Q,data:V},{onToggle:oe})}
          ${$p(Ee(),Yt,{total:Ae,expanded:Je},Ie)}
          ${Sp({events:Ot,shown:pt},{onMore:q})}
        </div>
      </div>
    `}function Ve(){at(zt(),e)}return{load(w){w!==u&&(_={},h="",k=[],R=!1,X(),xe(),y(),Ye(),le(),J()),u=w,d=null,!fe&&t.subscribeCandidates&&(fe=t.subscribeCandidates(()=>{u&&Ve()})),ft(),Pt(),z!==w&&re(w)},clear(){u=null,d=null,_={},h="",m=!1,k=[],R=!1,X(),xe(),y(),Ye(),le(),J(),T(),me.close(),Ge.close(),at(c``,e)},destroy(){Jt&&(Jt(),Jt=null),Xt&&(Xt(),Xt=null),un&&(un(),un=null),T(),document.removeEventListener("keydown",be),qe.detach(),ce||(me.destroy(),$e&&$e.parentNode&&$e.parentNode.removeChild($e)),Ge.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,J(),h="",m=!1,k=[],xe(),y(),Ye(),le(),at(c``,e)}}}function Tp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var hy="(max-width: 640px)";function Mi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(hy),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function by(){return{lanes:{done:!0},areas:{}}}function ls(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function yy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:ls(r.lanes),areas:ls(r.areas)}:{lanes:ls(r),areas:{}}}catch{return null}}function Cp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ni(e,t=by()){let n={lanes:ls(t.lanes),areas:ls(t.areas)},r=yy(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Cp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Cp(e,o),i}}}function Al(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function qi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ji(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:_,candidate_drop:h}=e,m=[],k=null,R=!1,j=null,B=null,ie=null;function z(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,R=!1},0)}function N(){return s()??null}function C(){let I=new Map,de=o();for(let ne of Array.isArray(de)?de:[]){if(!ne||typeof ne!="object")continue;let ce=ne.bead_blocked_by&&typeof ne.bead_blocked_by=="object"?ne.bead_blocked_by:{};for(let[$e,me]of Object.entries(ce))Array.isArray(me)&&I.set($e,qi(me));for(let $e of[...Array.isArray(ne.runnable)?ne.runnable:[],...Array.isArray(ne.session_active)?ne.session_active:[]])$e&&typeof $e.bead_id=="string"&&Array.isArray($e.blocked_by)&&$e.blocked_by.length>0&&I.set($e.bead_id,qi($e.blocked_by))}return I}function L(){let I=new Map,de=new Map,ne=o();for(let ce of Array.isArray(ne)?ne:[]){if(!ce||typeof ce!="object")continue;let $e=ce.bead_blocked_by&&typeof ce.bead_blocked_by=="object"?ce.bead_blocked_by:{};for(let[me,Ne]of Object.entries($e))Array.isArray(Ne)&&I.set(me,qi(Ne));for(let me of Array.isArray(ce.runnable)?ce.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&de.set(me.bead_id,qi(me.blocked_by))}for(let ce of m)for(let $e of[I,de]){let me=$e.get(ce.a);me!==void 0&&$e.set(ce.a,ce.type==="dep-remove"?me.filter(Ne=>Ne!==ce.b):me.includes(ce.b)?me:[...me,ce.b])}return{snapshot:I,runnable:de}}function U(){let I=C();for(let de of m){let ne=(I.get(de.a)||[]).slice();de.type==="dep-remove"?I.set(de.a,ne.filter(ce=>ce!==de.b)):ne.includes(de.b)||I.set(de.a,[...ne,de.b])}return I}function K(I=r(),de=N()){let ne=new Map;for(let Se of Array.isArray(de?.lanes)?de.lanes:[]){let Q=new Map;for(let V of Array.isArray(Se?.entries)?Se.entries:[])V&&typeof V.bead_id=="string"&&Q.set(V.bead_id,V.dep_created_by_lane===!0);ne.set(typeof Se?.id=="string"?Se.id:"",Q)}let ce=new Map,$e=new Map,me=new Set,Ne=new Set;for(let Se of I.chain_lanes){let Q=ne.get(Se.lane_id);ce.set(Se.lane_id,{status:Se.status,entries:Se.rows.map((V,Be)=>({bead_id:V.id,root_dir:V.root_dir,...Be===0?{}:{dep_created_by_lane:Q?.get(V.id)===!0}}))});for(let V of Se.rows)$e.set(V.id,Se.lane_id),V.fixed&&me.add(V.id),V.unplaced||Ne.add(V.id)}let Ge=new Map;for(let Se of I.parallel_rows)typeof Se.queue_index=="number"&&Ge.set(Se.id,Se.queue_index);for(let Se of I.queue_groups)for(let Q of Se.sublanes.serial)for(let V of Q.items)typeof V.queue_index=="number"&&Ge.set(V.id,V.queue_index);let et=L();return{blocked_by_map:U(),snapshot_blocked_by:et.snapshot,runnable_blocked_by:et.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:ce,owner_lane_of:$e,fixed_members:me,placed_members:Ne,parallel_rows:I.parallel_rows.map(Se=>({bead_id:Se.id,root_dir:Se.root_dir,queue_index:Se.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:Ge}}function H(I,de){let ne=r();for(let $e of[...ne.runnable,...ne.queue,...ne.running,...ne.pr_wait,...ne.done])if(!($e.non_occupying||$e.id!==de)){if($e.root_dir===I)return $e.expected_revision;break}let ce=ne.queue_groups.find($e=>$e.root_dir===I);return ce?ce.revision:0}async function D(I,de,ne,ce){if(!t)return null;let me=await t(I,{...de,...ne?{root_dir:ne}:{},expected_revision:ce});if(me&&me.conflict){me.queue&&d?.(ne,me.queue);let Ne=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:ce;me=await t(I,{...de,...ne?{root_dir:ne}:{},expected_revision:Ne})}return me&&me.queue&&d?.(ne,me.queue),me}async function Y(I,de,ne,ce,$e){try{let me=await D(I,de,ne,ce.get(ne)??H(ne,$e.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&ce.set(ne,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:ce.get(ne)??0)}catch(me){return a(Al(me),"error"),null}}async function X(I,de,ne=new Map){if(I.type==="worker-queue-disarm"){try{let ce=await D(I.type,I.payload,I.root_dir,ne.get(I.root_dir)??H(I.root_dir,de));ce&&ce.queue&&typeof ce.queue.revision=="number"&&ne.set(I.root_dir,ce.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await Y(I.type,I.payload,I.root_dir,ne,{bead_id:de})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(ce){return a(Al(ce),"error"),!1}}function J(I){(I.type==="dep-add"||I.type==="dep-remove")&&(m=[...m,{type:I.type,a:I.a,b:I.b}])}async function _e(I,de){if(!t)return{ok:!1};try{let ne=await t(I.type,{...I.payload,expected_revision:de});return!ne||typeof ne.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ne.revision}}catch(ne){let ce=ne,$e=ce&&ce.code==="conflict"?ce.details?.cross_lanes:null;return $e&&typeof $e.revision=="number"&&Array.isArray($e.lanes)?{ok:!1,conflict:$e}:(a(Al(ne),"error"),{ok:!1})}}async function Re(I,de,ne){let ce=new Map,$e=[],me=I.ops.slice(0,I.lane_op_index),Ne=I.ops.slice(I.lane_op_index);for(let et of me){if(!await X(et,ne,ce))return{done:!0};J(et)}let Ge=de;for(let et of I.lane_ops){if(Ge===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Se=await _e(et,Ge);if(!Se.ok)return Se.conflict?{done:!1,conflict:Se.conflict}:{done:!0};Ge=Se.revision}for(let et of Ne){if(!await X(et,ne,ce))return{done:!0};J(et),et.type==="dep-add"&&$e.push(et)}for(let et of bd($e))Ge=await re(et,Ge);return{done:!0}}async function re(I,de){if(de===null||!t)return de;let ne=I.pairs,ce=de;for(let $e=0;$e<2;$e+=1){if(ne.length===0)return ce;try{let me=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:ne.map(Ne=>({bead_id:Ne.bead_id,after:Ne.after,value:!0})),expected_revision:ce});return me&&typeof me.revision=="number"?me.revision:ce}catch(me){let Ne=me,Ge=Ne&&Ne.code==="conflict"?Ne.details?.cross_lanes:null;if(!Ge||typeof Ge.revision!="number"||!Array.isArray(Ge.lanes))return ce;let et=Ge.lanes.find(Se=>Se&&Se.id===I.lane_id);ne=yd(Array.isArray(et?.entries)?et.entries:[],ne),ce=Ge.revision}}return ce}async function M(I,de,ne=[]){m=ne,l("",0);let ce=r(),$e=N();for(let me=0;;me+=1){let Ne=I(K(ce,$e));if("refused"in Ne){a(Ne.refused,"error");break}let Ge=await Re(Ne,ce.cross_lanes_revision,de);if(Ge.done){Ne.correction&&l(Ne.correction.lane_id,Ne.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let et=i(Ge.conflict);ce=et.lanes,$e=et.raw_lanes}m=[],u()}async function ve(I,de){await M(ne=>hi(I,de,ne),I.bead_id)}function Te(I,de){let ne=de&&typeof de.closest=="function"?de.closest("[data-row-index]"):null;if(ne&&I.contains(ne)){let ce=Number(ne.getAttribute("data-row-index"));return Number.isFinite(ce)?ce:0}return I.querySelectorAll("[data-row-index]").length}function E(I){let de=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!de)return null;let ne=de.getAttribute("data-lane");return ne==="queue"?{zone:de,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ne==="candidate"&&h===!0?{zone:de,target:{kind:"candidate"}}:null}function te(I){let de=I.target;if(!k)return null;let ne=typeof de?.closest=="function"?de.closest("[data-drop]"):null;if(!ne)return E(de);let ce=ne.getAttribute("data-drop");if(ce==="candidate")return{zone:ne,target:{kind:"candidate"}};if(ce==="parallel")return{zone:ne,target:{kind:"parallel",marker_index:Te(ne,de)}};if(ce==="chain")return{zone:ne,target:{kind:"chain",lane_id:ne.getAttribute("data-lane-id")||"",marker_index:Te(ne,de)}};if(ce==="repo-serial"){let $e=ne.getAttribute("data-root-dir")||"";if($e!==k.root_dir)return null;let me=typeof de?.closest=="function"?de.closest("[data-queue-index]"):null,Ne=me&&ne.contains(me)?me.getAttribute("data-queue-index"):ne.getAttribute("data-lane-length"),Ge=Number(Ne);return{zone:ne,target:{kind:"repo-serial",root_dir:$e,lane_id:ne.getAttribute("data-lane-id")||"",index:Number.isFinite(Ge)?Ge:0}}}return null}function ke(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function we(I){B=I.target instanceof Element?I.target:null}function Oe(I){let de=I.target,ne=typeof de?.closest=="function"?de.closest('[draggable="true"][data-bead-id]'):null,ce=ne?ne.closest("[data-drag-kind]"):null;if(!ce)return;if(ne&&B&&ne.contains(B)&&typeof B.closest=="function"&&B.closest("input, button, a")){I.preventDefault();return}let $e=ce.getAttribute("data-bead-id")||"",me=ce.getAttribute("data-drag-kind")||"",Ne=ce.getAttribute("data-root-dir")||"";if(!$e||!me)return;let Ge=ce.getAttribute("data-queue-index")||"",et=Number(Ge),Se=ce.getAttribute("data-lane-id")||"";k={kind:me,bead_id:$e,root_dir:Ne,...Ge!==""&&Number.isFinite(et)?{queue_index:et}:{},...Se?{lane_id:Se}:{}},R=!0,_?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",$e),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function xe(I){let de=te(I);de&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),de.zone.classList.add("is-drop-over"))}function Me(I){let de=I.target;typeof de?.closest=="function"&&(de.closest("[data-drop]")?.classList.remove("is-drop-over"),de.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function He(){k=null,ke(),n.classList.remove("is-dragging"),z()}function Ze(I){let de=te(I),ne=k;k=null,ke(),n.classList.remove("is-dragging"),!(!de||!ne)&&(I.preventDefault(),ve(ne,de.target))}return{attach(I){ie||(ie=I,I.addEventListener("pointerdown",we),I.addEventListener("dragstart",Oe),I.addEventListener("dragover",xe),I.addEventListener("dragleave",Me),I.addEventListener("drop",Ze),I.addEventListener("dragend",He))},detach(){j!==null&&(clearTimeout(j),j=null);let I=ie;ie=null,I&&(I.removeEventListener("pointerdown",we),I.removeEventListener("dragstart",Oe),I.removeEventListener("dragover",xe),I.removeEventListener("dragleave",Me),I.removeEventListener("drop",Ze),I.removeEventListener("dragend",He))},isDragging(){return k!==null},consumeClickSuppression(){let I=R;return R=!1,I},applyDrop:ve,runPlanned:M,dropModel:K,sendOp:X,sendQueueCas:Y,rememberDep:J}}var Sl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Rp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},Op={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},Ip={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function vy(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function wy(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,s=vy(o);return s?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${s}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(Op,n))return Op[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Bi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Fi(e){for(let t of Bi(e)){if(Object.hasOwn(Rp,t))return Rp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Dp(e){return Bi(e).length===0?null:Fi(e)||"\uC2E4\uD328"}function Nr(e){let t=null;for(let n of Bi(e))Object.hasOwn(Sl,n)&&(t=Sl[n]);return t}function _r(e,t){if(typeof e=="string"&&Object.hasOwn(Ip,e))return Ip[e];let n=wy(e,t);if(n!==null)return n;let r=Fi(e),o=Nr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function Pp(e,t){let n=Fi(e)??Fi(t),r=Nr(t)??Nr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ky=new Set(["repo_operation_timeout_unresolved"]);function $y(e){for(let t of Bi(e))if(ky.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function xy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Mp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||$y(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(xy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Ir(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Lp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Np(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Lp,t.blocked_reason)?Lp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=_r(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=_r(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Ay(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var qp=200;function Sy(e){return typeof e!="string"||e.length===0?"":e.length>qp?`${e.slice(0,qp)}\u2026`:e}function Ey(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function El(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Ty(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=El(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=El(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function Fp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${jp(s.at)?c`<span class="rtile__history-at"
                    >${jp(s.at)}</span
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
            ${Rr(n)}
          </p>`:""}`}function jp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Cy(e,t){if(!e||e.open!==!0)return"";let n=Nr(e.cause)||_r(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${fn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(h=>typeof h=="string"&&h.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",_=Fp(e);return c`<div
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
  </div>`}function Ry(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Oy(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function Iy(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(s=>typeof s=="string"&&s.length>0).join(" \xB7 "),n=El(e.resets_at),r=Ry(e.auto_resume),o=Oy(e.auto_switch);return c`<div
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
            <dd>${Rr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function Ly(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Dy=new Set(["codex-runner"]);function Py(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Dy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?fn(r.last_event_at,t):"",_=r?fn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${fn(i,t)}</span
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
      </div>`:""}`}var My={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ny(e){if(!e)return"";let t=My[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function qy(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=Sy(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=Fp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function Tl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find($e=>$e&&$e.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,_=e.provider_hold===!0&&!i&&!a&&!u&&!d,h=a&&e.failure||null,m=d&&e.wait||null,k=_&&e.hold||null,R=a||u||d||_,j=!!e.paused,B=i||R?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":_?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):j?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ay(t-e.started_at):"\u2014",ie=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=Eo(e),N=an(e.usage),C=Yn(e.usage),L=e.conflict_resolution?j?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,U=e.base_exception||null,K=e.landing,H=e.attempt_id&&e.attempt_id===n,D=r.monitor||null,Y=Ly(D),X=ti(D?.cross_lane_chip),J=D?ei(D.dependency_chips):"",_e=Py(D,t,j,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),Re=o&&e.workflow?.chips?.exec_receipt||null,re=ni(e.workflow),M=ri(e.rec,e.chip_popover?.chip_key==="rec"),ve=e.chip_popover?oo(e.chip_popover.content):"",Te=Re?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(Re)}`}
        >${`${Re.kind}:${Is(Re)}`}</span
      >`:"",E=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${To(s)}</span
      >`:"",te=Y||X||re||E||Te||M?c`<div class="rtile__meta">
          ${Y}${X}${re}${E}${Te}${M}${ve}
        </div>`:"",ke=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Dp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",we=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Ey(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:_&&k?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${k.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${Ty(k)}
            </button>`:"",Oe=c`${L?c`<span class="worker-mini__badge">${L}</span>`:""}${U?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${U}</span
      >`:""}${ke}${we}`,xe=o?"":uo(e),Me=zs(l?.quickfix_landing),He=Me==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Ze=Me==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",I=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",de=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",ne=de&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",ce=ne?c`${de}${ne}`:de;return c`<div
    class="rtile${H?" rtile--sel":""}${j?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${R?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${_?" rtile--provider-hold":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${oi(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${Oe}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${B}</span>`:""}${Ny(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${B}</span>`}
        ${o||R?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Me}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${He} \uBD88\uAC00`:Ze}
                  aria-label=${He}
                >
                  ↻ ${He}
                </button>
                ${ce}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${j?c`<button
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
                ${ce}`}${I}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${R?qy(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?h:d?m:k,ce,d?J:""):i?"":c`${_e}${e.rollup?Rs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:da}):""}
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
            ${o?te:Y||X||re||ie||M||N.length>0||C?c`<div class="rtile__meta">
                    ${Y}${X}${re}${Js(e.exec_chips)}${M}
                    ${N.length>0?N.map($e=>c`<span
                              class="worker-usage"
                              title=${$e.tooltip}
                              >${$e.label}</span
                            >`):C?c`<span
                            class="worker-usage"
                            title=${Co(e.usage)}
                            >${C}</span
                          >`:""}${ve}
                  </div>`:""}
            ${Ys(e)} ${xe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||j?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Cy(l,t)}${Iy(k)}
  </div>`}function jy(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Bp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Tl(o,t,n,{monitor:jy(o)}))}
  </div>`}var rn="",Fy=["impl_runtime","impl_model","impl_effort"],By=["claude_account","codex_account"],Uy=5,Ui=1;function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(x=>ge(x,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,_={state:"absent",values:{},warnings:[]},h={},m={},k=Promise.resolve(),R={claude:null,codex:null},j=!1,B=null,ie={},z="",N="",C=!1,L=!1,U=!1,K=null,H=!1;function D(){let x=t.queue?t.queue():null;return vn(x)?x:null}function Y(){let x=D();return x?x.runner_catalog:null}function X(){let x=D();return x&&vn(x.execution_defaults)?x.execution_defaults:null}function J(){let x=t.implPresetStore?.get();return vn(x)&&Array.isArray(x.presets)?x:null}function _e(){return r===null?{}:{root_dir:r}}async function Re(x,q){return H||!n?null:await n(x,q)}function re(x){x&&vn(x.queue)&&t.onQueueAdopt?.(x.queue)}async function M(x,q){let oe=D();if(!oe||H)return null;let se=await Re(x,{...q,..._e(),expected_revision:oe.revision});if(re(se),r!==null&&se&&se.conflict){let Ee=se.queue&&typeof se.queue.revision=="number"?se.queue.revision:D()?.revision??oe.revision;se=await Re(x,{...q,..._e(),expected_revision:Ee}),re(se)}return se}async function ve(){d=!0,ae();try{let x=await Re("get-session-defaults",{..._e()});s=vn(x?.values)?{...x.values}:{},i={...s},l={},a={},u=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}finally{d=!1,ae()}}async function Te(){let x=pu(s,i);if(Object.keys(x).length!==0){try{let q=await Re("set-session-defaults",{values:x,..._e()});s=vn(q?.values)?{...q.values}:{},i={...s},u=Array.isArray(q?.warnings)?q.warnings:[]}catch(q){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}function E(x,q){if(!vn(x))return;let oe=x.state;_={state:oe==="usable"||oe==="unusable"||oe==="absent"?oe:"absent",values:vn(x.values)?{...x.values}:{},warnings:Array.isArray(x.warnings)?x.warnings:[]},m={..._.values},q&&(h={...m})}async function te(){try{E(await Re("get-workspace-accounts",{..._e()}),!0)}catch(x){_={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},h={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}ae()}async function ke(x){try{let q=await fetch(x);if(!q.ok)return null;let oe=await q.json();if(!vn(oe)||!Array.isArray(oe.accounts))return null;let se=oe.accounts.filter(Ee=>vn(Ee)&&typeof Ee.key=="string"&&Ee.key.length>0&&typeof Ee.email=="string"&&Ee.email.length>0);return{accounts:se,active:se.find(Ee=>Ee.active===!0)||null}}catch{return null}}async function we(){j=!0;let[x,q]=await Promise.all([ke("/api/claude-usage"),ke("/api/codex-usage")]);H||(R={claude:x,codex:q},ae())}function Oe(){let x={};for(let q of By){let oe=Object.hasOwn(h,q)?h[q]:null,se=Object.hasOwn(m,q)?m[q]:null;oe!==se&&(x[q]=oe)}return x}async function xe(){let x=Oe();if(Object.keys(x).length!==0){try{E(await Re("set-workspace-accounts",{values:x,..._e()}),!1)}catch(q){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}function Me(x,q){q===rn?delete h[x]:h[x]=q,ae(),k=k.then(()=>xe())}function He(x,q){if(Fy.includes(x)){ce(x,q);return}q===rn?delete i[x]:i[x]=q,ae(),Te()}function Ze(x,q){l[x]=q,delete a[x]}function I(x,q,oe){if(l[x]=q,q.length>0&&!oe(q)){a[x]=!0,ae();return}delete l[x],delete a[x],q.length===0?delete i[x]:i[x]=q,ae(),Te()}function de(){let x=qt().orchestration_model,q=$n({global:{orchestration_model:x??void 0},execution_defaults:X(),runner_catalog:Y()}).orchestration_model.value;return q?On(Y(),q):null}function ne(x,q){typeof q=="string"&&q.length>0?i[x]=q:delete i[x]}function ce(x,q){let oe=q===rn?void 0:q,se=uu({impl_runtime:x==="impl_runtime"?oe:i.impl_runtime,impl_model:x==="impl_model"?oe:i.impl_model,impl_effort:x==="impl_effort"?oe:i.impl_effort},Y(),de());ne("impl_runtime",se.impl_runtime),ne("impl_model",se.impl_model),ne("impl_effort",se.impl_effort),ae(),Te()}async function $e(){let x=D();if(!x)return;let q={orchestration_model:x.orchestration_model??null,orchestration_effort:x.orchestration_effort??null,orchestration_speed:x.orchestration_speed??null},oe=fu(q,{...q,...ie});if(Object.keys(oe).length!==0){try{let se=await M("worker-queue-set-orchestration-defaults",{values:oe});if(se&&se.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}ie={}}catch(se){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${se instanceof Error?se.message:String(se)}`)}ae()}}function me(x,q){ie[x]=q===rn?null:q,ae(),$e()}function Ne(x){if(B=x,!x){ae();return}let q=Y(),oe=qt(),se=oe.orchestration_model;se&&!Io(q,x).includes(se)&&(ie.orchestration_model=null,se=null);let Ee=oe.orchestration_effort;Ee&&!wa(q,x,se||An).includes(Ee)&&(ie.orchestration_effort=null),ae(),$e()}async function Ge(x){if(!(!D()||x<Ui)){try{await M("worker-queue-set-slots",{slots:x})}catch(q){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}async function et(x){if(!(!D()||x<Ui||x>Uy)){try{await M("worker-queue-set-serial-lane-count",{count:x})}catch(q){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}async function Se(x,q){let oe=x==="auto_advance"?"worker-automation-toggle":x==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await M(oe,{on:q})}catch(se){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${se instanceof Error?se.message:String(se)}`)}ae()}function Q(){let x={},q=qt();for(let oe of so){let se=Qn.includes(oe)?q[oe]:i[oe];typeof se=="string"&&se.length>0&&(x[oe]=se)}return x}async function V(){let x=J();if(!x)return;let q=Q();if(Object.keys(q).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let oe=(x.presets||[]).find(Ee=>Ee.id===z),se=N.trim()||(oe?oe.name:"");if(!se){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ee=oe?await Re("impl-preset-update",{expected_revision:x.revision,id:oe.id,name:se,settings:q}):await Re("impl-preset-create",{expected_revision:x.revision,name:se,settings:q});if(Ee&&Ee.applied){if(N="",!oe&&Array.isArray(Ee.presets)){let he=Ee.presets.find(Je=>Je.name===se);z=he?he.id:z}ae()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ae()}catch(Ee){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}}async function Be(){let x=J();if(!(!x||z.length===0))try{let q=await Re("impl-preset-delete",{expected_revision:x.revision,id:z});q&&q.applied?(z="",ae()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ae())}catch(q){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}}function ut(x){s=vn(x.values)?{...x.values}:{},i={...s},u=Array.isArray(x.warnings)?x.warnings:[],vn(x.queue)&&(t.onQueueAdopt?.(x.queue),ie={})}async function ct(){let x=J(),q=D();if(!x||!q||z.length===0)return;let oe=se=>({preset_id:z,expected_revision:x.revision,expected_queue_revision:se,..._e()});try{let se=await Re("apply-impl-preset-global",oe(q.revision));if(se&&se.applied&&ut(se),r!==null&&se&&se.queue_applied===!1){let Ee=se.queue&&typeof se.queue.revision=="number"?se.queue.revision:D()?.revision??q.revision;se=await Re("apply-impl-preset-global",oe(Ee)),se&&se.applied&&ut(se)}se&&se.applied?se.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):se&&se.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(se){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${se instanceof Error?se.message:String(se)}`)}ae()}async function y(){L=!0,U=!1,ae();try{let x=await Re("get-worker-system-prompt",{});!x||typeof x!="object"||Array.isArray(x)?U=!0:K=x}catch{U=!0}finally{L=!1,ae()}}function G(){if(C=!C,C&&!K){y();return}ae()}function Ie(){let x=mo({loading:L,error:U});if(x)return x;if(!K)return"";let q=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${q.map(oe=>c`<div class="settings-dialog__sp-variant" data-variant=${oe.key}>
            <div class="settings-dialog__sp-cond">${oe.condition}</div>
            ${nr(oe.label,oe.system_prompt)}
          </div>`)}
    </div>`}function Pe(){return c`<section
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
        aria-expanded=${C?"true":"false"}
        @click=${G}
      >
        ${C?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${C?Ie():""}
    </section>`}function We(x,q,oe,se,Ee,he,Je){let ot=Ee[x]??rn,ze=ka(x,oe,Ee,X(),Y(),Je),Tt=ze.options.find(ht=>ht.value===ot),Dt=ot===rn?ze.full_value:Tt?.full_value;return c`<select
        class=${ot===rn?"settings-dialog__unset":""}
        data-key=${x}
        aria-label=${q}
        title=${Dt||""}
        ?disabled=${he===!0||ze.disabled}
        .value=${fr(String(ot))}
        @change=${ht=>se(x,String(ht.target.value))}
      >
        <option value=${rn} ?selected=${ot===rn}>
          ${ze.unset_label}
        </option>
        ${ze.options.map(ht=>c`<option
              value=${ht.value}
              title=${ht.full_value||""}
              ?selected=${ht.value===ot}
            >
              ${ht.label}
            </option>`)}
      </select>
      ${ot===rn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Fe(x,q,oe,se,Ee,he=!1,Je){return c`<div
      class=${`settings-dialog__row${he?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        ${We(x,q,oe,se,Ee,he,Je)}
      </span>
    </div>`}function Ye(x,q,oe,se,Ee,he){let Je=Object.hasOwn(a,x),ot=l[x]??i[x]??rn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Je?" settings-dialog__text--invalid":""}`}
          data-key=${x}
          aria-label=${q}
          aria-invalid=${String(Je)}
          placeholder=${oe}
          .value=${fr(ot)}
          @input=${ze=>Ze(x,String(ze.target.value))}
          @change=${ze=>I(x,String(ze.target.value).trim(),he)}
        />
        ${ot.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${x}
          >${Je?Ee:se}</span
        >
      </span>
    </div>`}function Rt(x,q){let oe=q?q.active:null;return vn(oe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${x==="claude"?oe.email:ho({...oe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Mt(x,q,oe){let se=R[oe],Ee=Object.hasOwn(h,x)?h[x]:rn,he=oe==="claude"?Li:ho,Je=!!se?.accounts.some(ot=>ot.key===Ee);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${q}
          data-account-key=${x}
          @change=${ot=>Me(x,String(ot.target.value))}
        >
          <option value=${rn} ?selected=${Ee.length===0}>
            ${Rt(oe,se)}
          </option>
          ${Ee.length>0&&!Je?c`<option value=${Ee} selected>
                ${Ee} (목록에 없음)
              </option>`:""}
          ${se?.accounts.map(ot=>c`<option value=${ot.key} ?selected=${ot.key===Ee}>
                ${he(ot)}
              </option>`)||""}
        </select>
        ${se?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Ot(){let x=_.warnings.join(", ");return _.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${x} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:_.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${x}`:null}function yt(x,q,oe,se,Ee,he){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${q}-on)`}
        ></i>
        ${x}
      </span>
      <span class="settings-dialog__controls">
        ${We(oe,`${x} \uBAA8\uB378`,se,He,i,!1)}
        ${We(Ee,`${x} effort`,Bs,He,i,!1)}
        ${We(he,`${x} \uC18D\uB3C4`,au,He,i,!1)}
      </span>
    </div>`}function pt(x,q,oe,se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${se?" is-on":""}`}
          data-automation=${x}
          aria-pressed=${se?"true":"false"}
          aria-label=${q}
          @click=${()=>Se(x,!se)}
        >
          ${se?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${oe}</span>
      </span>
    </div>`}function Et(x,q,oe,se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${x}>
          <button
            type="button"
            aria-label=${`${q} \uAC10\uC18C`}
            @click=${()=>se(oe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${oe}</span>
          <button
            type="button"
            aria-label=${`${q} \uC99D\uAC00`}
            @click=${()=>se(oe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(x){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${x.rows.length>0?`\uBCC0\uACBD ${x.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${x.rows.map(q=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${x.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${x.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function qt(){let x=D(),q={};for(let oe of Qn)q[oe]=Object.prototype.hasOwnProperty.call(ie,oe)?ie[oe]:x&&typeof x[oe]=="string"?x[oe]:null;return q}function le(){let x=Y(),q=i.impl_runtime,oe=i.impl_model,se=J(),Ee=D(),he=qt(),Je=Io(x,B),ot=ao(x,void 0).filter(lt=>lt!==An),ze=wa(x,B,he.orchestration_model||An).filter(lt=>lt!==An),Tt=z?(se?.presets||[]).find(lt=>lt.id===z):null,Dt=Tt?du(Q(),vn(Tt.settings)?Tt.settings:{}):null,ht=Ee&&typeof Ee.slots=="number"?Ee.slots:Ui+1,Yt=Ee&&typeof Ee.serial_lane_count=="number"?Ee.serial_lane_count:Ui,xt=X()?.supported===!0,Pt=Ot(),Ht=ka("workflow_mode",Ro,i,X(),x);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Pt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Pt}
          </div>`:""}
      ${xt?"":c`<div
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
                .value=${fr(z)}
                @change=${lt=>{z=String(lt.target.value),ae()}}
              >
                <option value="" ?selected=${z===""}>
                  실행 프리셋…
                </option>
                ${(se?.presets||[]).map(lt=>c`<option
                      value=${lt.id}
                      ?selected=${lt.id===z}
                    >
                      ${lt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Dt||Dt.rows.length===0}
                @click=${ct}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${fr(N)}
                @input=${lt=>{N=String(lt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${V}
              >
                ${z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${z.length===0}
                @click=${Be}
              >
                삭제
              </button>
            </div>
            ${Dt?Lt(Dt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${fr(B||rn)}
                    @change=${lt=>{let Vt=String(lt.target.value);Ne(Vt===rn?null:Vt)}}
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
              ${Fe("orchestration_model","\uBAA8\uB378",Je,me,he)}
              ${Fe("orchestration_effort","effort",ze,me,he)}
              ${Fe("orchestration_speed","\uC18D\uB3C4",io,me,he)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Mt("claude_account","Claude","claude")}
              ${Mt("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${Ee?.provider_auto_switch!==!1}
                      @change=${lt=>Se("provider_auto_switch",lt.target.checked)}
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
                      @click=${()=>He("workflow_mode",rn)}
                    >
                      ${Ht.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ro.map(lt=>c`<button
                          type="button"
                          data-mode=${lt}
                          aria-pressed=${String(i.workflow_mode===lt)}
                          @click=${()=>He("workflow_mode",lt)}
                        >
                          ${lt}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Ye("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",su)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${yt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Oo,"spec_review_effort","spec_review_speed")}
              ${yt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Fs,"plan_review_effort","plan_review_speed")}
              ${yt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Oo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",js,He,i)}
              ${Fe("impl_model","\uBAA8\uB378",ao(x,q),He,i)}
              ${Fe("impl_effort","effort",lo(x,q,oe),He,i)}
              ${Fe("impl_speed","\uC18D\uB3C4",io,He,i)}
              ${Fe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ot,He,i,!1,{...i,...he})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${pt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Ee?.auto_advance===!0)}
              ${pt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Ee?.auto_merge===!0)}
              ${Et("slots","\uB3D9\uC2DC \uC2E4\uD589",ht,lt=>Ge(lt))}
              ${Et("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Yt,lt=>et(lt))}
            </div>
            ${Pe()}
          `}
    `}function ae(){H||at(le(),e)}return{load(){ie={},l={},a={};let x=[ve(),te()];return j||x.push(we()),Promise.all(x).then(()=>{})},render:ae,sessionDraft:()=>({...i}),destroy(){H=!0,at(c``,e)}}}function zi(e){return c`<svg
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
  </svg>`}function Up(){return zi(xo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Wp(){return zi(xo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function zp(){return zi(xo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Hp(){return zi(xo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Gp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Kp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return an(Ns(t));let n={};for(let l of Un)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Un){let _=a[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Yn(n):null}function Nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Cl(e,t){let n=Nn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Wy(e,t){if(!Nn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function zy(e){if(!Nn(e)||!Nn(e.execution_defaults)||!Nn(e.runner_catalog)||!Nn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=$n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=On(e.runner_catalog,n.orchestration_model.value??""),o=co(n,e.runner_catalog),s=Cr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Yp(e,t){let n=t.notify||(E=>ge(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,_=null,h=new Map;function m(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(te=>Nn(te)):[]}function k(E){return m().find(te=>te.root_dir===E)||null}function R(E){return Wy(k(E),h.get(E))}function j(){for(let E of m()){let te=h.get(E.root_dir);te&&typeof te.revision=="number"&&typeof E.revision=="number"&&E.revision>=te.revision&&h.delete(E.root_dir)}}async function B(E,te,ke){let we=t.transport,Oe=R(te);if(!(!we||!Nn(Oe))){try{let xe=await we(E,{...ke,root_dir:te,expected_revision:Oe.revision});if(Nn(xe?.queue)&&h.set(te,xe.queue),xe&&xe.conflict){let Me=Nn(xe.queue)&&typeof xe.queue.revision=="number"?xe.queue.revision:R(te)?.revision;xe=await we(E,{...ke,root_dir:te,expected_revision:Me}),Nn(xe?.queue)&&h.set(te,xe.queue)}}catch(xe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${xe instanceof Error?xe.message:String(xe)}`)}M()}}function ie(E){u!==E&&(u=E,t.onFocusChange?.(u),M())}function z(E){ie(u===E?null:E)}function N(E){if(d===E){L();return}C(),d=E;let te=k(E);i.textContent=`${te?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,_=Wi(a,{root_dir:E,queue:()=>R(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ke=>{h.set(E,ke),M()}}),_.load(),M()}function C(){_?.destroy(),_=null}function L(E){C(),d=null,o.hidden=!0,i.textContent="",E!==!0&&M()}let U=()=>L();l.addEventListener("click",U);function K(E){E.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",K);function H(E,te){let ke=Math.max(te,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ke},(we,Oe)=>Oe<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(E){let te=E.auto_advance===!0,ke=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?Wp():Up()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ke?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ke?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ke?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${zp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Hp()}
      </button>`}function Y(E){let te=zy(E);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function X(E){let te=[];for(let[ke,we]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Oe=Cl(E,ke);Oe>0&&te.push(`${we} ${Oe}`)}return te.join(" \xB7 ")}function J(E){let te=Cl(E,"running"),ke=typeof E.slots=="number"?E.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${ke}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${ke}</span>
          ${H(te,ke)}
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
        <span class="mon2-deck__counts">${X(E)}</span>
        ${Y(E)}
      </div>
    </div>`}function _e(E){let te=t.doneItems?t.doneItems():[],ke=t.rangeLabel?t.rangeLabel():"",we=Kp(Array.isArray(te)?te:[]),Oe=xe=>E.reduce((Me,He)=>Me+Cl(He,xe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ke}`}
        >실행 ${Oe("running")} · 대기 ${Oe("queue")} · PR
        ${Oe("pr_wait")}${Oe("session_active")>0?` \xB7 \uC138\uC158 ${Oe("session_active")}`:""}
        · ${ke} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${we===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof we=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Gp(ke)}
                  >${we}</span
                >`:we.map(xe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${xe.provider}
                      title=${xe.tooltip}
                      >${xe.label}</span
                    >`)}
          </span>`}
    </div>`}function Re(){let E=m();return E.length===0?"":c`${_e(E)}
      <div class="mon2-deck__strip">
        ${E.map(te=>J(te))}
      </div>`}function re(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function M(){j(),re(),d!==null&&!k(d)&&L(!0),at(Re(),r),_?.render()}function ve(E){let te=E.target;if(!te||typeof te.closest!="function")return;let ke=te.closest("[data-root-dir]");if(!ke)return;let we=ke.getAttribute("data-root-dir")||"",Oe=te.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(we);return}if(Oe==="auto"){B("worker-automation-toggle",we,{on:R(we)?.auto_advance!==!0});return}if(Oe==="merge"){B("worker-merge-auto-toggle",we,{on:R(we)?.auto_merge!==!0});return}if(Oe==="gear"){N(we);return}z(we)}function Te(E){if(E.key!=="Enter"&&E.key!==" ")return;let te=E.target;if(!te||typeof te.closest!="function")return;let ke=te.closest('[data-root-dir][role="button"]');!ke||ke!==te||(E.preventDefault(),z(ke.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ve),r.addEventListener("keydown",Te),{render:M,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",K),r.removeEventListener("click",ve),r.removeEventListener("keydown",Te),l.removeEventListener("click",U),C(),at(c``,r),e.replaceChildren()}}}var Hy=1e4,Zp="bdui.monitor.done-range",Jp="bdui.monitor.running_sort",ef="bdui.monitor.candidate_sort",tf="beads-ui.monitor.candidate-filter",nf="beads-ui.monitor.sections";function Gy(){try{let e=window.localStorage.getItem(tf);if(!e)return{...po};let t=JSON.parse(e);return!t||typeof t!="object"?{...po}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:po.show_blocked,spec:Ua.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...po}}}function Vp(e){try{window.localStorage.setItem(tf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ky(){try{let e=window.localStorage.getItem(ef);return Uo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Yy(e){try{window.localStorage.setItem(ef,e)}catch{}}function Vy(){try{let e=window.localStorage.getItem(nf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Xy(e){try{window.localStorage.setItem(nf,JSON.stringify(e))}catch{}}function Qy(){try{let e=window.localStorage.getItem(Zp);return e===null?"today":Fn(e)}catch{return"today"}}function Zy(e){try{window.localStorage.setItem(Zp,e)}catch{}}function Jy(){try{return window.localStorage.getItem(Jp)==="repo"?"repo":"started"}catch{return"started"}}function ev(e){try{window.localStorage.setItem(Jp,e)}catch{}}var rf="tab:monitor:pipeline",tv=1e3,Xp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],nv=["queue","runnable","done"],Qp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function rv(e){return e>=1&&e<=Qp.length?Qp[e-1]:`(${e})`}function of(e,t){let n=Nt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=Qy(),m=Jy(),k=Gy(),R=Ky(),j=Vy(),B=Ni("beads-ui.monitor.lane-collapsed"),ie=!1,z=null,N=null,C=null,L=null,U=ro(()=>he()),K=null,H=null,D=null,Y=null;function X(p){return Y===null&&(Y=I()),cd(p,Y)}function J(p,f){_e(),!(f<=0)&&(H={lane_id:p,corrected:f},D=setTimeout(()=>{D=null,H=null,he()},Hy))}function _e(){D!==null&&(clearTimeout(D),D=null),H=null}function Re(){let p=Wr.find(f=>f.value===h);return p?p.label:""}let re=document.createElement("div");re.className="mon",e.appendChild(re);let M=document.createElement("div");M.className="worker-drawer-overlay",M.hidden=!0;let ve=document.createElement("div");ve.className="worker-drawer-overlay__backdrop";let Te=document.createElement("div");Te.className="worker-drawer-host mon2-drawer",M.append(ve,Te),e.appendChild(M);let E=dr(null,null),te=new Map,ke=new Map,we=null,Oe=null,xe=null,Me=go(Te,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,M.hidden=!0,he()}}),He=ji({transport:s,console_el:re,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Pt,reproject:p=>({lanes:Ee(p),raw_lanes:p}),onCorrection:J,showToast:ge,requestRender:()=>he(),adoptQueue:(p,f)=>{ke.set(p,f)},onDragBegin:()=>{C=null},candidate_drop:!0}),{applyDrop:Ze,dropModel:I,runPlanned:de,sendQueueCas:ne}=He;async function ce(p,f,$,O,F=!0){if(!s||!$)return null;let ee=await s(p,{...f,root_dir:$,expected_revision:O});if(ee&&ee.conflict&&F){ee.queue&&ke.set($,ee.queue);let pe=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:O;ee=await s(p,{...f,root_dir:$,expected_revision:pe})}return ee&&ee.queue&&$&&ke.set($,ee.queue),ee}function $e(p,f){let $=ke.get(p),O=o&&o.get?o.get():null,F=(Array.isArray(O)?O:[]).find(pe=>pe?.root_dir===p);return($||F)?.merge_queue?.find(pe=>pe.bead_id===f)?.continuation_action}async function me(p,f,$,O){let F=await ce(p,f,$,O),ee=ke.get($)?.revision??F?.queue?.revision??O;return Kn(F,(pe,Ce)=>ce(p,{...f,continuation:pe,decision_token:Ce},$,ee,!1),{refresh:pe=>ce(p,f,$,pe?.queue?.revision??ke.get($)?.revision??ee,!1)})}async function Ne(p,f,$,O){let F=await Kn({continuation_mismatch:O},(pe,Ce)=>ce("worker-merge-queue-add",{bead_id:f,continuation:pe,decision_token:Ce},p,$,!1)),ee=F?.queue?.merge_queue?.find(pe=>pe.bead_id===f)?.continuation_action;F?.applied!==!0&&ee?.continuation===null&&ee.mismatch&&await Ne(p,f,F.queue.revision,ee.mismatch)}async function Ge(p,f,$){let O=await ce("worker-discard",p,f,$);if(O&&O.discarded===!0){ge(Zs(O),"success",5e3);return}if(O&&O.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function et(p,f,$,O){let F=await ce("worker-discard-abandon",p,f,$);if(F&&F.abandoned===!0){ge(Qs(O),"success",5e3);return}if(F&&F.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${F.reason}`,"error");return}F&&!F.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Se(p,f,$){return!s||!$?null:await s(p,{...f,root_dir:$})}async function Q(){let p=new Map;for(let f of E.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,$]of p)await ce("worker-merge-queue-add-all",{},f,$)}function V(p){let f=j[p];return!!(f&&f.runnable===!0)}function Be(p){let f={...j[p]||{}};f.runnable=!f.runnable,j={...j,[p]:f},Xy(j),he()}function ut(p){B.toggle(p),he()}function ct(p){B.toggleArea(p),he()}function y(p){let f=p.dependency_chips||null,$=p.overlap_chips||[],O=p.scope_state==="missing",F=p.armed_lane_chip;return!f&&$.length===0&&!O&&!F?null:{...f||{},...$.length>0?{overlaps:$}:{},...O?{scope_missing:!0}:{},...F?{armed_lane:F}:{}}}function G(p){return si(p,f=>U.isOpen({bead_id:p.id,chip_key:f}))}function Ie(p){let f=y(p),$=G(p);return f||$?{...p,...f?{dependency_chips:f}:{},...$?{chip_popover:$}:{}}:p}function Pe(p){let f=V(p.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function We(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function Fe(p){if(C!==p.id)return null;let f=E.queue_groups.find(ee=>ee.root_dir===p.root_dir),$=p.place_lanes||[],O=E.cross_lanes_revision!==null,F=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ee of E.chain_lanes)F.push({id:`lane:${ee.lane_id}`,label:`\uC5F0\uACB0 ${ee.number} (${ee.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ee.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!O});F.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!O,title:O?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ee of $)F.push({id:`serial:${ee.id}`,label:`\uC9C1\uB82C ${Number(ee.id.slice(1))}`,count:ee.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:F}}function Ye(p){return We(p,c`${Ma(Ie(p),Fe(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(f,$)=>l($,p.root_dir):void 0})}`)}function Rt(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(p=>Ye(p))}
      </div>`:c`${E.runnable_sections.map(p=>{let f=V(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Pe({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map($=>Ye($))}
            </div>`}
      </section>`})}`}function Mt(p,f=!1){return c`<span class="worker-mini__rowops">
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
    </span>`}function Ot(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${In(Ie(p),{actions:Mt(p,!0)})}
    </div>`}function yt(p,f,$,O){return c`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${$}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${rv(f.seq)}</span
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
      ${O.includes(f.id)?c`<span
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
    </div>`}function pt(p){let f=E.cross_lanes_revision!==null,$=X(p.lane_id),O=$?.held===!0,F=$?.cycle===!0,ee=$?$.mismatched:[],pe=H&&H.lane_id===p.lane_id?H.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${pe>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${pe}건 자동 교정</span
            >`:""}
        ${F?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${O?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${mi}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!f||!p.can_confirm||O}
              title=${O?mi:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:p.rows.map((Ce,Qe)=>yt(p,Ce,Qe,ee))}
      </div>
    </div>`}function Et(p,f,$){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.id}
      data-row-index=${$}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${In(Ie(f),{actions:Mt(f)})}
    </div>`}function Lt(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function qt(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${In({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function le(p,f){let $=f.occupants,O=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...$.map(F=>qt(F)),...f.items.map((F,ee)=>Et(f,F,ee))],count:f.items.length,empty:f.empty===!0,...$.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${$.map(F=>`${F.id} \u2014 ${F.badge}`).join(`
`)}
              >${Lt($)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...O.length>0?{after:c`${O.map(F=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${F.workspace_name}·${F.lane}과 교차 대기
                </div>`)}`}:{}}}function ae(){let p=E.cross_lanes_revision!==null,f=E.chain_lanes.some($=>$.draft&&$.rows.length===0);return ai({parallel:{rows:E.parallel_rows.map(($,O)=>Ot($,O)),count:E.parallel_rows.length,collapsed:B.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap($=>$.sublanes.serial.map(O=>({...le($,O),drop:{drop:"repo-serial",root_dir:$.root_dir,lane_id:O.id,lane_length:String(O.raw_length)}}))),collapsed:B.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map($=>pt($)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function x(p){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(f=>Tl({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",waiting:f.run_state==="waiting",wait:f.wait||null,retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":f.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:G(f),discard:f.discard,failure:f.failure?{...f.failure,open:L===f.attempt_id}:null},p,N,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:y(f)}}))}
    </div>`}function q(p){let f={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},$=O=>{let F=f[O.lane],ee=O.lane==="runnable"?E.runnable_flat?F.length>0?Rt():void 0:E.runnable_sections.length>0?Rt():void 0:O.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?ae():void 0:O.lane==="running"?x(p):F.length>0?c`${F.map(pe=>In(Ie(pe)))}`:void 0;return Wn({id:`monitor-${O.lane}`,lane:O.pane,title:O.title,items:F,count:F.length,src:O.lane==="runnable",empty:O.empty,body:ee,live:O.lane==="running"&&F.length>0,collapsible:!0,collapsed:B.isCollapsed(O.pane),controls:O.lane==="runnable"?oe():void 0,header_control:se(O.lane,F.length)})};if(ie){let O=nv.map(F=>Xp.find(ee=>ee.lane===F)).filter(F=>F!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${li({live:E.running.length>0,running_body:E.running.length>0?x(p):"",pr_wait_rows:E.pr_wait.map(F=>In(Ie(F))),count:E.running.length+E.pr_wait.length})}
            ${O.map(F=>$(F))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Xp.map(O=>$(O))}
        </div>
      </div>`}function oe(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${E.runnable_hidden.blocked>0?` ${E.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ua.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function se(p,f){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Uo.map($=>c`<option
              value=${$.value}
              ?selected=${R===$.value}
            >
              ${$.label}
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
        ${Wr.map($=>c`<option value=${$.value} ?selected=${h===$.value}>
              ${$.label}
            </option>`)}
      </select>`:""}function Ee(p){let f=o&&o.get?o.get():null,$=o&&o.getWorkspacesState?o.getWorkspacesState():[],O=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,F={done_since:Ar(h,d()),running_sort:m,candidate_filter:k,candidate_sort:R};return O!==void 0&&(F.cross_lanes=O),dr(f,$,F)}function he(){let p=d();E=Ee(),Y=null,te=new Map;for(let f of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!f.non_occupying&&!te.has(f.id)&&te.set(f.id,f);at(q(p),re),ot()?.render(),Je(),ze()}function Je(){let p=new Map;for(let f of E.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(re.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let $=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",O=p.get($);typeof O=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${O?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ot(){if(xe)return xe;let p=re.querySelector(".mon2-deck");return p?(xe=Yp(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:Re,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Dt,onFocusChange:f=>{K=f,ze()}}),xe):null}function ze(){re.classList.toggle("has-focus",K!==null);for(let p of Array.from(re.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K);for(let p of Array.from(re.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=te.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",K!==null&&!!f&&f.root_dir===K)}for(let p of Array.from(re.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K)}function Tt(p,f){let $=i?i():void 0;if(!f||!$||f===$||!a){r(p);return}a(f).then(()=>{r(p)}).catch(O=>{n("workspace switch for %s failed: %o",f,O)})}function Dt(p){if(!p)return;let f=i?i():void 0,$=()=>{try{u?.gotoView("worker")}catch(O){n("gotoView(worker) failed: %o",O)}};if(!a||f&&f===p){$();return}a(p).then($).catch(O=>{n("workspace switch for %s failed: %o",p,O),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ht(p){_n(p).then(f=>{ge(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function Yt(p){let f=te.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function xt(p,f,$){if(p!=="dep-add")return;let O=E.chain_lanes.find(F=>F.rows.some(ee=>ee.id===f));!O||!O.rows.some(F=>F.id===$)||await de(F=>md(O.lane_id,F),"",[{type:p,a:f,b:$}])}function Pt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ht(p,f){if(p==="run"){await Vt(f);return}if(p==="stop"){await Zt(f);return}if(p==="create"){await de($=>Ka(null,$),"");return}if(p==="remove"){let $=hd(f,I());if($!==null&&!_($))return;await de(O=>gd(f,O),"");return}await de($=>p==="confirm"?fd(f,$):_d(f,$),"")}function lt(p){let f=new Map;for(let $ of p.rows){let O=E.owner_of[$.id]||$.root_dir;typeof O!="string"||O.length===0||f.set(O,[...f.get(O)||[],$.id])}return f}async function Vt(p){let f=E.chain_lanes.find(ee=>ee.lane_id===p);if(!f||E.cross_lanes_revision===null){he();return}_e();let $=new Map,O=new Map,F=lt(f);for(let ee of f.rows){if(!ee.unplaced)continue;let pe=E.owner_of[ee.id]||ee.root_dir;if(typeof pe!="string"||pe.length===0){ge(`${ee.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),he();return}let Ce=O.get(pe)??0;if(await ne("worker-queue-place",{bead_id:ee.id,lane:"parallel",index:(E.parallel_raw_length[pe]??0)+Ce},pe,$,{bead_id:ee.id})===null){he();return}O.set(pe,Ce+1)}for(let[ee,pe]of F)if(await ne("worker-queue-arm",{bead_ids:pe,lane_id:p},ee,$,{bead_id:pe[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),he();return}he()}async function Zt(p){let f=E.chain_lanes.find(O=>O.lane_id===p);if(!f||E.cross_lanes_revision===null){he();return}_e();let $=new Map;for(let[O,F]of lt(f))if(await ne("worker-queue-disarm",{lane_id:p},O,$,{bead_id:F[0]})===null)break;he()}async function Kt(p,f){let{root_dir:$,revision:O}=Yt(p);if($.length===0){he();return}await ne("worker-queue-disarm",{bead_ids:[p],lane_id:f},$,new Map([[$,O]]),{bead_id:p}),he()}async function wn(p,f){let $=te.get(p);if(!$){he();return}let O={kind:"candidate",bead_id:p,root_dir:$.root_dir};if(f==="new-lane"){await de(F=>Ka({bead_id:p,root_dir:$.root_dir},F),p);return}if(f.startsWith("lane:")){let F=f.slice(5);if(!E.chain_lanes.find(pe=>pe.lane_id===F)){he();return}await de(pe=>hi(O,{kind:"chain",lane_id:F,marker_index:(pe.cross_lanes.get(F)?.entries??[]).length},pe),p);return}if(f.startsWith("serial:")){let F=f.slice(7),ee=($.place_lanes||[]).find(pe=>pe.id===F);await Ze(O,{kind:"repo-serial",root_dir:$.root_dir,lane_id:F,index:ee?ee.index:0});return}await Ze(O,{kind:"parallel",marker_index:E.parallel_rows.length})}async function Bt(p,f){let $=E.parallel_rows,O=$.findIndex(wt=>wt.id===p);if(O<0)return;let F=$[O].root_dir,ee=[];$.forEach((wt,vt)=>{wt.root_dir===F&&ee.push(vt)});let pe=ee.indexOf(O),Ce=ee[pe+f];if(typeof Ce!="number")return;let Qe=f===-1?Ce:ee[pe+2]??Math.min($.length,Ce+1);await Ze({kind:"parallel",bead_id:p,root_dir:F,queue_index:$[O].queue_index??0},{kind:"parallel",marker_index:Qe})}async function Jt(p){for(let f of E.chain_lanes){let $=f.rows.find(O=>O.id===p);if($){await Ze({kind:"chain",bead_id:p,root_dir:$.root_dir,lane_id:f.lane_id,...typeof $.queue_index=="number"?{queue_index:$.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function Xt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function un(p,f){let{item:$,root_dir:O,revision:F}=Yt(f),ee=$?.attempt_id||"",pe=p.classList;if(pe.contains("worker-mini__rowops-up")||pe.contains("worker-mini__rowops-down")){Bt(f,pe.contains("worker-mini__rowops-up")?-1:1);return}if(pe.contains("worker-mini__rowops-remove")){ce("worker-queue-remove",{bead_id:f},O,F);return}if(pe.contains("mon2-crow__detach")){Jt(f);return}if(pe.contains("worker-dep__open")){Tt(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(pe.contains("mon2-arm__release")){Kt(f,p.getAttribute("data-lane-id")||"");return}if(pe.contains("mon-lane__chip")){let Ce=p.getAttribute("data-lane-id")||"";re.querySelector(`.mon2-clane[data-lane-id="${Ce}"]`)?.scrollIntoView({block:"nearest"});return}if(pe.contains("judgement-chip")){let Ce=p.getAttribute("data-chip-key")||"";Ce&&U.toggle({bead_id:f,chip_key:Ce});return}if(pe.contains("rtile__failure-badge")){L=L===ee?null:ee,he();return}if(pe.contains("rtile__attempt-copy")){let Ce=p.getAttribute("data-attempt-id")||"";Ce&&_n(Ce).then(Qe=>{ge(Qe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Qe?"success":"error",1400)});return}if(pe.contains("worker-card__place")){C=C===f?null:f,he();return}if(pe.contains("worker-card__place-cancel")){C=null,he();return}if(pe.contains("worker-card__place-lane")){let Ce=p.getAttribute("data-lane")||"parallel";C=null,wn(f,Ce);return}if(pe.contains("rtile__session")){if($&&$.kind==="session"){let Ce=($.session_refs||[]).find(Qe=>Qe&&Qe.current===!0);Ce&&(M.hidden=!1,Me.open(eo(Ce,f,"in_progress",O)),he());return}N=ee,ee&&$&&(M.hidden=!1,Me.open({attempt_id:ee,root_dir:O,meta:Xt($)})),he();return}if(pe.contains("rtile__pause")){Se("worker-attempt-pause",{attempt_id:ee},O);return}if(pe.contains("rtile__resume")){Jr().then(Ce=>{if(Ce!==null)return me("worker-attempt-resume",{attempt_id:ee,...Ce!==""?{instructions:Ce}:{}},O,F)});return}if(pe.contains("rtile__parked-retry")){Se("worker-parked-retry",{bead_id:f,attempt_id:ee},O).then(Ce=>{Ce&&Ce.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${Ce.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":Ce.reason||""}`,"error")});return}if(pe.contains("rtile__discard-abandon")){let Ce={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(qo(f,Ce)))return;et({bead_id:f,operation_id:p.dataset.operationId||""},O,F,Ce);return}if(pe.contains("rtile__discard")){let Ce=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!_(No(f,Ce)))return;Ge({bead_id:f,...ee?{attempt_id:ee}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},O,F);return}if(pe.contains("worker-mini__merge")){let Ce=$e(O,f);Ce?.mismatch&&Ce.continuation===null?Ne(O,f,F,Ce.mismatch):ce("worker-merge-queue-add",{bead_id:f},O,F);return}if(pe.contains("worker-mini__merge-cancel")){ce("worker-merge-queue-remove",{bead_id:f},O,F);return}if(pe.contains("worker-mini__discard-abandon")){let Ce={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(qo(f,Ce)))return;et({bead_id:f,operation_id:p.dataset.operationId||""},O,F,Ce);return}if(pe.contains("worker-mini__discard")){let Ce=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(No(f,Ce)))return;Ge({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},O,F);return}if(pe.contains("worker-mini__revise-fix")){me("worker-revise-fix",{bead_id:f},O,F);return}pe.contains("worker-mini__revise-approve")&&ce("worker-revise-approve",{bead_id:f},O,F)}function fe(p){let f=He.consumeClickSuppression(),$=p.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest(".worker-drawer-overlay")||$.closest("a"))return;let O=$.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(O){p.preventDefault();let je=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||O.textContent?.trim()||"";je&&ht(je);return}let F=$.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(F){p.preventDefault();let Le=F.getAttribute("data-root-dir")||te.get($.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||F.getAttribute("title")||"";Dt(Le);return}let ee=$.closest(".mon2-sec__toggle");if(ee){p.preventDefault(),Be(ee.getAttribute("data-root-dir")||"");return}let pe=$.closest(".worker-pane__toggle[data-lane]");if(pe){p.preventDefault();let Le=pe.getAttribute("data-lane")||"";(Le==="candidate"||Le==="queue"||Le==="running"||Le==="pr_wait"||Le==="done")&&ut(Le);return}let Ce=$.closest(".worker-wait__area-toggle[data-area]");if(Ce){p.preventDefault(),ct(Ce.getAttribute("data-area")||"parallel");return}if($.closest(".mon2-newlane")){p.preventDefault(),Ht("create","");return}let Qe=$.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Qe){p.preventDefault();let Le=Qe.getAttribute("data-lane-id")||"",je=Qe.classList;Ht(je.contains("mon2-clane__confirm")?"confirm":je.contains("mon2-clane__reapply")?"reapply":je.contains("mon2-clane__run")?"run":je.contains("mon2-clane__stop")?"stop":"remove",Le);return}if($.closest(".mon-merge-all")){p.preventDefault(),Q();return}let wt=$.closest(".mon-filter__spec");if(wt){p.preventDefault(),k={...k,spec:wt.getAttribute("data-spec")||"all"},Vp(k),he();return}let vt=$.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!vt)return;let v=vt.getAttribute("data-bead-id")||"",S=$.closest("button");if(S){p.preventDefault(),un(S,v);return}$.closest(".rtile__failure-pop, .chip-popover")||v&&!f&&(p.preventDefault(),Tt(v,vt.getAttribute("data-root-dir")||Yt(v).root_dir))}function T(p){let f=p.target;if(!f||typeof f.closest!="function")return;let $=f.closest(".mon-filter__blocked");if($){k={...k,show_blocked:$.checked},Vp(k),he();return}let O=f.closest(".mon-candidate-sort");if(O){R=Uo.some(pe=>pe.value===O.value)?O.value:"repo_spec",Yy(R),he();return}let F=f.closest(".mon-running-sort");if(F){m=F.value==="repo"?"repo":"started",ev(m),he();return}let ee=f.closest(".mon-done-range");ee&&(h=Fn(ee.value),Zy(h),he())}function be(p){let f=p.target,$=f&&typeof f.closest=="function"?O=>f.closest(O):()=>null;L&&!$(".rtile__failure-pop, .rtile__failure-badge")&&(L=null,he())}function qe(p){p.key!=="Escape"||L===null||(L=null,he())}e.addEventListener("click",fe),e.addEventListener("change",T),document.addEventListener("click",be),document.addEventListener("keydown",qe),U.attach(),He.attach(e);{let p=!0;z=Mi(f=>{if(ie=f,p){p=!1;return}he()})}o&&typeof o.subscribe=="function"&&(we=o.subscribe(()=>{try{ke.clear(),he()}catch{}}));function ft(){Oe!==null&&(clearInterval(Oe),Oe=null)}return{recorrectSharedLane:xt,load(){n("load"),he(),Oe===null&&(Oe=setInterval(()=>{try{he()}catch{}},tv))},pause(){ft()},clear(){ft(),He.detach(),we&&(we(),we=null),z&&(z(),z=null),Me.destroy(),M.hidden=!0,xe?.destroy(),xe=null,e.removeEventListener("click",fe),e.removeEventListener("change",T),document.removeEventListener("click",be),document.removeEventListener("keydown",qe),U.detach(),e.replaceChildren()}}}function sf(e,t,n){let r=Nt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
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
    `}function _(){o&&at(u(),o),s&&at(d(),s)}return _(),i=t.subscribe(()=>_()),{destroy(){i&&(i(),i=null),o&&at(c``,o),s&&at(c``,s)}}}var af=["bug","feature","task","epic","chore"];function lf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var cf=["Critical","High","Medium","Low","Backlog"];function uf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let C=document.createElement("option");C.value="",C.textContent="\u2014 Select \u2014",s.appendChild(C);for(let L of af){let U=document.createElement("option");U.value=L,U.textContent=lf(L),s.appendChild(U)}i.replaceChildren();for(let L=0;L<=4;L+=1){let U=document.createElement("option");U.value=String(L);let K=cf[L]||"Medium";U.textContent=`${L} \u2013 ${K}`,i.appendChild(U)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(C){o.disabled=C,s.disabled=C,i.disabled=C,l.disabled=C,a.disabled=C,d.disabled=C,_.disabled=C,_.textContent=C?"Creating\u2026":"Create"}function j(){u.textContent=""}function B(C){u.textContent=C}function ie(){try{let C=window.localStorage.getItem("beads-ui.new.type");C?s.value=C:s.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?i.value=L:i.value="2"}catch{s.value="",i.value="2"}}function z(){let C=s.value||"",L=i.value||"";C.length>0&&window.localStorage.setItem("beads-ui.new.type",C),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function N(){j();let C=String(o.value||"").trim();if(C.length===0){B("Title is required"),o.focus();return}let L=Number(i.value||"2");if(!(L>=0&&L<=4)){B("Priority must be 0..4"),i.focus();return}let U=String(s.value||""),K=String(a.value||""),H={title:C};U.length>0&&(H.type=U),String(L).length>0&&(H.priority=L),K.length>0&&(H.description=K),R(!0);try{await t("create-issue",H)}catch{R(!1),B("Failed to create issue");return}z(),R(!1),k()}return n.addEventListener("cancel",C=>{C.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",C=>{C.key==="Enter"&&(C.ctrlKey||C.metaKey)&&(C.preventDefault(),N())}),r.addEventListener("submit",C=>{C.preventDefault(),N()}),{open(){r.reset(),j(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var ov=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function sv(e,t){return ca(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function df(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=sv(r,e);return c`<button
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
  `}function pf(e,t,n){return c`
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
  `}function ff(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ov.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var iv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function _f(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(J=>ge(J,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function _(){if(d)return d;let J=i.querySelector('[data-pane="execution"]');return J?(d=Wi(J,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:_e=>t.queueStore?.set?.(_e)}),d):null}function h(){return c`
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
    `}function m(){let J=r.get();return c`
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
              ${df(J,o(),B)}
              ${pf(J,u,{onDraft:_e=>{u=_e},onAdd:ie,onRemove:z})}
              ${ff(J,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(J){let _e=r.get();if(_e)try{let Re=await n("display-policy-set",{expected_revision:_e.revision,policy:J(_e)});R(Re),Re&&Re.conflict&&Re.policy&&(Re=await n("display-policy-set",{expected_revision:Re.policy.revision,policy:J(Re.policy)}),R(Re)),Re&&Re.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(J){J&&J.policy&&typeof J.policy=="object"&&r.set(J.policy)}function j(J){k(J)}function B(J){let _e=r.get();if(!_e)return;let Re=!av(J,_e);j(re=>lv(J,re,Re))}function ie(){let J=u.trim();J.length!==0&&(u="",j(_e=>_e.hidden_prefixes.includes(J)?{hidden_prefixes:_e.hidden_prefixes}:{hidden_prefixes:[..._e.hidden_prefixes,J]}),C())}function z(J){j(_e=>({hidden_prefixes:_e.hidden_prefixes.filter(Re=>Re!==J)}))}function N(J){let _e=r.get();if(!_e)return;let Re=_e.chips[J]===!1;j(()=>({chips:{[J]:Re}}))}function C(){at(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${iv.map(J=>c`<button
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
              @click=${X}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${m()}
          </div>
        </div>
      `,i),_()}function L(J){l=J,C()}let U=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",U),i.addEventListener("cancel",U);let K=J=>{J.target===i&&X()};i.addEventListener("click",K);let H=null;r.subscribe&&(H=r.subscribe(()=>{a&&C()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Y(J="execution"){a||(a=!0,t.onOpenChange?.(!0),l=J,u="",C(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),_()?.load())}function X(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Y,close:X,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",U),i.removeEventListener("cancel",U),i.removeEventListener("click",K),H&&(H(),H=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function av(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function lv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var cv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],mf="usage-meter-card",uv="usage-meter-layer",Rl=600,dv=["token_expired","relogin_required"];function gf(e){return String(e).padStart(2,"0")}function pv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function hf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${gf(r.getHours())}:${gf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${cv[r.getMonth()]} ${r.getDate()} ${s}`;return`${pv(n,t)} \xB7 ${l}`}function fv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function yf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var vf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function kf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function _v(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:kf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function mv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=_v(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?kf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function gv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=mv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function $f(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function hv(e,t){return!e.held||$f(e,t)<=Rl?e:{...e,available:!1,windows:[],accounts:[]}}function wf(e,t){return`${e}:${t}`}function xf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){at(c``,e),e.hidden=!0,_()}function d(){if(a===null){let re=e.ownerDocument;a=re.createElement("div"),a.id=uv,a.className="usage-meter__layer",re.body.appendChild(a)}return a}function _(){a!==null&&(at(c``,a),a.remove(),a=null)}function h(re){n!==re&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",j),window.addEventListener("resize",R)),n=re)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j),window.removeEventListener("resize",R))}function k(re){let M=re.target;M&&(e.contains(M)||a!==null&&a.contains(M))||(m(),X())}function R(){X()}function j(re){re.key==="Escape"&&(m(),X())}function B(re){n===re?m():h(re),X()}function ie(){m(),X()}async function z(re,M){if(r.has(re.key))return;let ve=wf(re.key,M);r.set(re.key,M),i.delete(ve),X();let Te=null;try{Te=await(await fetch(re.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:M})})).json()}catch{Te=null}if(t)return;if(r.delete(re.key),!Te||Te.ok!==!0){let te=Te&&typeof Te.error=="string"&&Te.error.length>0?Te.error:"network_error";i.set(ve,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),X();return}let E=Array.isArray(Te.warnings)?Te.warnings.filter(te=>typeof te=="string"&&te.length>0):[];E.length>0&&i.set(ve,{kind:"warn",text:E.join(" \xB7 ")}),X(),await Re()}function N(re,M,ve,Te){let E=yf(re.pct),ke=`resets ${hf(re.resetsAt,Te)}${M?` \xB7 ${ve}`:""}`;return c`<span
      class="usage-meter__window ${bf(E)}"
      style=${`--progress: ${E}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${re.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function C(re,M,ve){let Te=$f(M,ve),E=M.available&&(M.held||Te>Rl),te=E?`${Math.floor(Te/60)}\uBD84 \uC804 \uCE21\uC815`:"",ke=M.accounts.filter(Me=>!Me.active).length,we=`usage-meter__group${E?" usage-meter__group--stale":""}`,Oe=c`<span class="usage-meter__provider"
        >${re.label}</span
      >
      ${M.available?M.windows.map(Me=>N(Me,E,te,ve)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ke>0?c`<span class="usage-meter__badge">+${ke}</span>`:""}`;if(M.accounts.length===0)return c`<span
        class=${we}
        aria-label=${`${re.label} usage`}
        >${Oe}</span
      >`;let xe=n===re.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${we}`}
      aria-label=${`${re.label} usage`}
      aria-expanded=${xe?"true":"false"}
      aria-controls=${mf}
      @click=${()=>B(re.key)}
    >
      ${Oe}
    </button>`}function L(re,M){return c`<span class="usage-meter" aria-label="Usage">
      ${re.map(ve=>C(ve.provider,ve.snapshot,M))}
    </span>`}function U(re,M){let ve=yf(re.pct),Te=hf(re.resetsAt,M);return c`<span
      class="usage-meter__account-window ${bf(ve)}"
      style=${`--progress: ${ve}%`}
    >
      <span class="usage-meter__account-key">${re.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ve}%</span>
      <span class="usage-meter__account-reset"
        >${Te.length>0?`\u21BB ${Te}`:""}</span
      >
    </span>`}function K(re,M){return dv.includes(M)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${re.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function H(re,M,ve){let Te=M.status==="ok",E=typeof M.ageSeconds=="number"&&M.ageSeconds>Rl,te=i.get(wf(re.key,M.number)),ke=r.get(re.key),we=ke!==void 0,Oe=ke===M.number,xe=["usage-meter__account"];return M.active&&xe.push("usage-meter__account--active"),Te||xe.push("usage-meter__account--unavailable"),E&&xe.push("usage-meter__account--stale"),c`<div class=${xe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${M.email}
          >${M.alias===null?M.email:M.alias}</span
        >
        ${M.plan===null?"":c`<span class="usage-meter__account-tag">${M.plan}</span>`}
        ${M.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${M.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${fv(M.ageSeconds)}</span
            >`}
        ${M.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${we}
              @click=${()=>{z(re,M.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Te?c`<div class="usage-meter__account-windows">
            ${M.windows.map(Me=>U(Me,ve))}
          </div>`:c`<div class="usage-meter__account-status">
            ${K(re,M.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function D(re,M,ve){let Te=M.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${re.label} · 활성 ${Te} / 전체
        ${M.accounts.length}
      </h2>
      ${M.accounts.map(E=>H(re,E,ve))}
    </section>`}function Y(re,M){return c`<div
      class="usage-meter__card"
      id=${mf}
      role="dialog"
      aria-label=${`${re.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(re.provider,re.snapshot,M)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function X(){let re=Date.now(),M=[];for(let Te of vf){let E=s.get(Te.key);E&&M.push({provider:Te,snapshot:hv(E,re)})}if(M.length===0){m(),u();return}let ve=M.find(Te=>Te.provider.key===n&&Te.snapshot.accounts.length>0);ve||m(),at(L(M,re),e),e.hidden=!1,ve?J(ve,re):_()}function J(re,M){let ve=d(),Te=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;ve.style.setProperty("--usage-meter-anchor-top",`${Te.bottom}px`),ve.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-Te.right)}px`),at(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${Y(re,M)}`,ve)}async function _e(re){try{let M=await fetch(re.endpoint);return M.ok?gv(await M.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Re(){l+=1;let re=l,M=await Promise.all(vf.map(async ve=>({provider:ve,read:await _e(ve)})));if(!(t||re!==l)){for(let ve of M){let Te=ve.provider.key;if(ve.read.kind==="ok"){s.set(Te,ve.read.snapshot);continue}if(ve.read.kind==="empty"){s.delete(Te);continue}let E=s.get(Te);E!==void 0&&!E.held&&s.set(Te,{...E,held:!0})}X()}}return u(),Re(),o=setInterval(()=>{Re()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function cs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Ef="bdui.worker.candidate_sort",us=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Hi=Object.freeze({preset:"spec"}),Tf=3,Cf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Af(e){return us.some(t=>t.id===e)}function Sf(e){let t=us.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function bv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ds(e){return e&&"preset"in e?Sf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Sf("spec")}function Ol(e){return e&&"preset"in e?e.preset:null}function qr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Af(e)?{preset:e}:Hi}return qr(s)}if(!e||typeof e!="object")return Hi;let t=e;if(Af(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Tf||!n.every(sa))return Hi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=us.find(s=>bv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Rf(){try{return qr(window.localStorage.getItem(Ef))}catch{return Hi}}function Il(e){try{window.localStorage.setItem(Ef,JSON.stringify(e))}catch{}}function Of(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(xs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:xs[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Tf)}function If(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function yv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=cs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function Lf(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(bc(ds(t))),yv(n)}function Df(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Ks(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Pf=new Set(["sh","bash","zsh","dash","ksh"]),Mf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Nf(e){let t=e.split("/");return t[t.length-1]||""}function vv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Nf(n[0]);if(r!=="env")return Pf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Pf.has(Nf(o))}function wv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function kv(e){let t=[],n=0;Mf.lastIndex=0;for(let r of e.matchAll(Mf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:wv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function $v(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function qf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function _(C,L){return L?kv(C).map(U=>U.kind==="plain"?U.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):C}function h(){if(!o)return c``;let C=s==="ready"&&vv(i),L=s==="ready"?i.split(`
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
                  ${L.map((U,K)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(U,C)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){at(h(),r)}async function k(){if(s!=="ready")return;let C=await _n(i);ge(C?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",C?"success":"error")}function R(C){C.key==="Escape"&&o&&(C.preventDefault(),z())}function j(){d||(document.addEventListener("keydown",R),d=!0)}function B(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ie(C,L=null){let U=++a;j(),o={...C},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let H=t?t():"";if(!H){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(H)+"&lane="+encodeURIComponent(C.lane)+"&base_sha="+encodeURIComponent(C.base_sha);try{let Y=await n(D),X=await Y.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==H){z();return}if(!Y.ok||!X||X.ok!==!0){s="error",l=$v(X&&typeof X.error=="string"?X.error:""),m();return}o={lane:X.lane,base_sha:X.base_sha,path:X.path,base_ref:X.base_ref},i=String(X.content),s="ready",m()}catch{if(U!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function z(){a+=1,B(),o=null,i="",m();let C=u;u=null,C?.isConnected&&C.focus()}function N(){z(),r.remove()}return{open:ie,close:z,destroy:N}}var jf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},xv=new Set(["queued","running","retry_pending"]);function Ff(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,Y){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${Y}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let Y=D/6e4;return Number.isInteger(Y)?`timeout ${Y}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function _(D){let Y=d(D);return Y?u("config",Y):""}function h(D,Y,X){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${X.script}
      @click=${J=>{o&&o({lane:D,base_sha:Y.base_sha,path:X.script,base_ref:Y.base_ref},J.currentTarget)}}
    ></button>`}function m(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function k(){let D=a().repo_ops,Y=D&&typeof D=="object"?D.repo_id:null;return typeof Y=="string"&&Y?Y:null}function R(){return m().some(D=>D&&D.kind==="deploy"&&xv.has(D.state))}function j(){let D=R(),Y=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||Y}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Y?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function B(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function ie(D,Y){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Y}
        @change=${X=>{C(D,!X.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z(D){let Y=typeof D.base_sha=="string"?D.base_sha:"",X=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${Y?`@${Y.slice(0,7)}`:""}`,J=B(),_e=!!D.verify&&J.verify,Re=!!D.deploy&&J.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${X}</span>
      </p>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${h("verify",D,D.verify)}
              ${_(D.verify.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?ie("verify",J.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Re?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${h("deploy",D,D.deploy)}
              ${_(D.deploy.timeout_ms)}
              ${Re?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Re?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?ie("deploy",J.deploy):""}
      </div>
    </section>`}function N(D){let Y=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return Y&&(Y.status==="resolved"||Y.status==="absent")?z(Y):Y&&(Y.status==="pending"||Y.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function C(D,Y){if(!n)return;let X=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});if(l(X),X&&X.conflict){let J=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});l(J)}r()}async function L(){let D=k();if(!n||D===null)return;let Y=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(Y),!Y||Y.ok!==!0){let X=Y&&typeof Y.reason=="string"?Y.reason:"",J=Object.hasOwn(jf,X)?jf[X]:X||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${J}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function K(D,Y,X){return c`<div class="worker-repo-ops__policy-group" data-policy=${X}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Y.map(J=>c`<li data-token=${J}>
              ${U[J]||J}
            </li>`)}
      </ul>
    </div>`}function H(){let D=s(),Y=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return Y?c`<section
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
        ${N(a())} ${H()}
      </details>`}}}var Wf=20,Av=5,Sv=new Set(["failed","running","queued","retry_pending"]),Ll={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Bf={verify:"verify",deploy:"deploy",job:"deploy"};function Ev(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Tv(e){return!e||typeof e!="object"?"":e.kind==="job"?Ev(e.script_path)||Ll.job:Object.hasOwn(Ll,e.kind)?Ll[e.kind]:e.kind}function Cv(e,t,n=Wf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Rv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Sv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Ov(e,t,n={}){let r=Cv(e,t,1/0),o=n.expanded===!0?Wf:Av,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Rv(l));return{visible:i,hidden:r.length-i.length}}function Uf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Iv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function zf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Rr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Hf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Lv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Bf,n))return;let r=e[Bf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Dv(e,t){let n=Mp(e,t),r=Np(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Pv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Mv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?en(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Uf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Tv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Vs(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Ir(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Uf(e)}"
          >${Iv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Hf(Pp(n.failure_kind,o)):""}
      ${Dv(n,Lv(t,n))}
      ${Pv(n)}
      ${zf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Vs(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Nv(e){let t=e.cleanup,n=Lr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?en(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
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
        ${Gu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Hf(_r(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${zf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function qv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Nv(r):Mv(r,e.repo_ops))}
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
  </section>`}function Gf(e,t={}){let n=null;function r(){if(n===null){at(c``,e);return}let i=Ov(n.operations,n.cleanup_failures,{expanded:n.expanded});at(qv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var jv="worker-ineligible";function ps(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Kf(e){return ps(e).includes(jv)}var Fv="session-preferred",Bv=["external_roundtrip","user_feedback_loop"];function Yf(e,t){if(!ps(e).includes(Fv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Bv.includes(n)?n:""}var Uv="spec-after-blocker";function Vf(e,t){return ps(e).includes(Uv)&&Array.isArray(t)&&t.length>0}var Wv=Nt("views:worker:adapter"),zv="tab:worker:ready",Hv="tab:worker:blocked",Gv="tab:worker:in-progress",Kv="tab:worker:resolved",Yv="tab:worker:closed",Vv="\u{1F512} blocked",Xv={revision:0,auto_advance:!1,auto_merge:!1,slots:fi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Qv=["claude_account","codex_account"],Zv=[...so,...Qv];function Jv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ew(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${ii}: ${n}`:ii}function mr(e){return e&&typeof e=="object"?e:{}}function tw(e){let t={};for(let n of Zv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function nw(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=mr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of cs(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function rw(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Xf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Vr(n):null,l=new Map,a={},u=null,d=0,_=null,h=!1;function m(){h||!s||s()}function k(L){return u===L?a:{}}async function R(){if(!r||h)return;let L=o?.()||"";if(u===L||_&&_.key===L&&_.generation===d)return;let U=++d;_={key:L,generation:U};let K=null;try{K=await Promise.resolve(r("get-session-defaults",{}))}catch(H){if(U!==d)return;_=null,Wv("get-session-defaults failed: %o",H),m();return}U===d&&(a=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},u=L,_=null,m())}function j(){u=null,d+=1,R()}function B(){for(let[L,U]of l)U==="failed"&&l.delete(L)}function ie(L,U){return i?i.selectBoardColumn(L,U):[]}function z(L,U,K,H){let D=Array.isArray(L.queue)?L.queue:[],Y=new Set([...D.map(M=>M.bead_id),...(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).flatMap(M=>(Array.isArray(M?.entries)?M.entries:[]).map(ve=>ve.bead_id)),...(Array.isArray(L.pr_wait)?L.pr_wait:[]).map(M=>M.bead_id),...(Array.isArray(L.done)?L.done:[]).map(M=>M.bead_id)]),X=new Set(K.map(M=>M.id)),J=new Set,_e=[];for(let M of[...U,...K])Y.has(M.id)||J.has(M.id)||Jv(M)||(J.add(M.id),_e.push(M));let Re=Lf(_e,qr(H)),re=mr(L.bead_scope);return Re.map(M=>{let ve=Kr(M),Te=ve.evidence==="published",E=typeof M.workflow?.route=="string"&&M.workflow.route||(M.metadata&&typeof M.metadata.route=="string"?M.metadata.route:""),te=E==="quick_fix",ke=!Object.hasOwn(M,"description")||typeof M.description=="string"&&M.description.trim().length>0,we=Object.hasOwn(M,"labels")&&Kf(M.labels),Oe=we||!Object.hasOwn(M,"labels")?"":Yf(M.labels,M.metadata),xe=M.metadata&&typeof M.metadata=="object"?Object.hasOwn(M.metadata,"awaiting_user"):!1,Me=!we&&!xe&&(te?ke:Te&&!ve.conflict),He=X.has(M.id),Ze=He?cs(M):[],I=[];He&&Ze.length===0&&I.push(Vv),xe&&I.push(ew(M.metadata)),te&&!ke?I.push("missing_description"):!te&&ve.conflict?I.push("spec_id_conflict"):!te&&ve.evidence==="none"?I.push("spec \uC5C6\uC74C"):!te&&ve.evidence==="draft"&&I.push("spec \uBBF8\uBC1C\uD589(draft)");let de=re[M.id];return{bead_id:M.id,title:M.title||M.id,route:E,spec_id:ve.conflict?"":ve.path,published:Te,blocked:He,blocked_by:Ze,labels:Array.isArray(M.labels)?M.labels:[],created_at:M.created_at,updated_at:M.updated_at,status:M.status,workflow:M.workflow||null,exec_pins:tw(mr(M.metadata)),rec:null,...de&&Array.isArray(de.scope)?{scope:de.scope}:{},eligible:Me,reason:I.join(" \xB7 "),worker_ineligible:we,session_preferred:Oe.length>0,session_preferred_reason:Oe,spec_after_blocker:Vf(M.labels,Ze),release_info:M.release_info,dependents_info:M.dependents_info}})}function N(L){let[U,K,H,D,Y]=L,X=Es([...U,...K,...H,...D,...Y]),J=nw([...U,...K,...H,...D]),_e={},Re=(re,M)=>{if(!re||typeof re.id!="string"||re.id.length===0)return;let ve=_e[re.id]||(_e[re.id]={});if(typeof re.priority=="number"&&!("priority"in ve)&&(ve.priority=re.priority),typeof re.from_id=="string"&&!("from_id"in ve)&&(ve.from_id=re.from_id),M&&!("metadata"in ve)){ve.metadata=mr(re.metadata);let Te=mr(re.workflow).route;typeof Te=="string"&&Te.length>0&&(ve.route=Te)}};for(let re of[...U,...K,...H])Re(re,!0);for(let re of[...D,...Y])Re(re,!1);for(let re of new Set([...Object.keys(_e),...X.keys()])){let M=Ts(X,re);if(M.total>0){let ve=_e[re]||(_e[re]={});ve.rollup=M}}for(let[re,M]of J){let ve=_e[re]||(_e[re]={});ve.carried_to=M}return _e}function C(L,U,K,H){let D=new Set((Array.isArray(L.done)?L.done:[]).map(X=>X?.bead_id).filter(X=>typeof X=="string")),Y=[];for(let X of U){let J=sr(X.closed_at);if(typeof X.id!="string"||D.has(X.id)||J===null||H!==void 0&&J<H||typeof X.comment_count!="number"||X.comment_count<=0)continue;let _e=`${K}\0${X.id}\0${String(X.updated_at)}\0${X.comment_count}`,Re=l.get(_e);if(Re===void 0&&r&&(l.set(_e,"pending"),Promise.resolve(r("get-comments",{id:X.id})).then(M=>{let ve=Array.isArray(M)&&M.some(Te=>Ri(typeof Te?.text=="string"?Te.text:"")?.lane==="session");l.set(_e,ve?"session":"not-session"),m()}).catch(()=>{l.set(_e,"failed"),m()})),Re!=="session")continue;let re=sr(X.started_at);Y.push({id:X.id,title:X.title||X.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:re!==null&&J>=re?J-re:null,work_kind:"session",done_at:J,created_at:X.created_at,updated_at:X.updated_at})}return Y}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Xv,K=o?.()||"",H=L&&typeof L.done_since=="number"?L.done_since:void 0,D=ie(zv,"ready"),Y=ie(Hv,"blocked"),X=ie(Gv,"in_progress"),J=ie(Kv,"resolved"),_e=ie(Yv,"closed");return{workspaces:[{...U,bead_titles:{...mr(U.bead_titles),...Object.fromEntries([...D,...Y].filter(Re=>Re&&typeof Re.id=="string").map(Re=>[Re.id,Re.title||Re.id]))},root_dir:K,name:rw(K),runnable:z(U,D,Y,L?L.candidate_sort:void 0),session_done:C(U,_e,K,H),bead_overlay:N([D,Y,X,J,_e])}],workspaces_state:[{root_dir:K,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof mr(U.workspace_info).slots=="number"?mr(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:k(K),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:j,notifyIssuesChanged:B,destroy(){h=!0,d+=1,_=null,l.clear()}}}var Gi=1,Qf=5,ow={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Gi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function $t(e){return e&&typeof e=="object"?e:{}}var e_="beads-ui.worker.candidate-filter",Dl={show_blocked:!1,spec:"all"};function sw(){try{let e=window.localStorage.getItem(e_);if(!e)return{...Dl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Dl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Dl}}}function iw(e){try{window.localStorage.setItem(e_,JSON.stringify(e))}catch{}}var aw=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],t_="bdui.worker.done-range";function lw(){try{let e=window.localStorage.getItem(t_);return e===null?"today":Fn(e)}catch{return"today"}}function cw(e){try{window.localStorage.setItem(t_,e)}catch{}}function Zf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function uw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Jf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function dw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function pw(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function fw(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function _w(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${pw(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${fw(e.fallback_reason)}${t}`}function mw(e){return e&&e.launched===!0?"success":"error"}function gw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function hw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var bw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),yw=new Set(["waiting_metadata","reviewing","retrying"]),Pl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function vw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?en(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function ww(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function kw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=ww(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Nr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!bw.has(e.phase)}}function $w(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function xw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Aw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=$w(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Pl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${uw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Jf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Jf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Sw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,_=null,h=null,m={},k=!1,R={},j=null,B={active:!1,failure:null,origin:null},ie=!1){let z=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,C=!!a&&a.active===!0,L=a&&a.failure||null,U=gw(a?a.waiting:null),K=n[e]||null,H=K&&K.gate?K.gate:null,D=K&&K.pr?K.pr:null,Y=hw(a?a.resolution:null),X=vw(h),J=kw(h,X),_e=a&&a.authority||null,Re=a&&a.review_dispatch||null,re=a?.hold?.auto_review_wait==="slot"?"slot":null,M=!!h&&typeof h=="object"&&yw.has(h.phase),ve=z&&!C&&(!_e||M||_e.source==="automatic"&&!k),Te=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Y?Y.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,E=!!H&&H.base_badge==="\uCDA9\uB3CC",te=!!H&&H.enabled===!0,ke=Bo({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),we=di(ke),Oe=s&&!ke&&(s.queueing??null)?s.queueing:null,xe=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!H&&H.tier==="merged",Me=r&&r.step==="repo_operations"&&ke?.failed===!0&&(ke.step==="deploy"||ke.step==="verify")?ke.step:null,He=l&&!!r&&!!H&&H.tier==="merged",Ze=ve&&(te||E||H?.reason==="base_behind"||Pl.has(H?.reason)||xe||He),I=Pl.has(H?.reason),de=l&&E&&u===!1,ne=Zn(m,e,{external:l,merge_active:C||ke?.step==="merge",merge_queued:z,conflict_active:!!i,cleanup_active:we,merged:!!r||H?.tier==="merged"}),ce=!!ne.operation,$e=!!r||h?.phase==="needs_human"||!!ne.error,me=z&&!L&&!N&&!xe&&!(J&&J.lock_actions),Ne=Aw({auto_pending:me,continuation_required:N,queueing:Oe,merge_step:ke,conflict_badge:Te,conflict_live:Y?.live===!0||i==="running",auto_resolution:X,recovery:J,cleanup_failed:r,cleanup_label:r?Lr(r.step):null,base_exception:_,conflicting:E,gate:H,receipt_check:K&&K.receipt_check?K.receipt_check:null,queue_failure:L,auto_skip:d,queued:z,queue_active:C,queue_position:a?a.position:0,review_session:B,review_dispatch:Re,auto_review_wait:re,activity:Te?null:s&&s.activity||null}),Ge=Ne?.live===!0&&Ne.title?c`<span title=${Ne.title}>${Ne.label}</span>`:Ne?.label||null,et=xw(K&&K.receipt_check?K.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ke?.active!==!0?ui(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...j?{dependency_chips:j}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:Ne?.live!==!0&&Ne?.title?Ne.label:null,completion_title:Ne?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},...et.length>0?{receipt_badge:{codes:et}}:{},badges:Ge?[Ge]:[],live_badge:Ne?.live===!0?Ge:null,usage:o,alert:Ne?.alert===!0,merge_action:H?.tier==="merged"&&!xe&&!He?!1:!z||N||ve||I,cancel_action:z&&!N,cancel_enabled:!C&&!(J&&J.lock_actions),cancel_title:J&&J.lock_actions?`${J.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:C?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ne,discard_action:ne.action,resolve_action:$e,resolve_enabled:!ie,resolve_title:ie?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ke,discard_enabled:ne.enabled,discard_title:ne.title,merge_enabled:!ke&&!Oe&&!i&&!ce&&!_&&!(J&&J.lock_actions)&&!de&&B.active!==!0&&(te||E||H?.reason==="base_behind"||I||xe||He||Ze||M&&!C),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":xe||He?Me==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Me==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":E&&!ke&&!xe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":H?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ve?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ce?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:Me?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Me==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:He?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":de?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":B.active===!0?B.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${H.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:H&&H.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${H&&H.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ml(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:_}=t,h=r?Vr(r):null,m=sw(),k=null,R=null,j=null,B=null,ie=ro(()=>v()),z=new Map,N=new Map,C=Rf(),L=Ol(C)===null,U=d?Fn(d):lw();function K(){let g=Wr.find(b=>b.value===U);return g?g.label:"\uC624\uB298"}let H=Ni("beads-ui.worker.lane-collapsed"),D=!1,Y=new Set,X=new Set,J=new Set;function _e(g,b){return!b?.error||!g?{}:{resolve_action:!0,resolve_enabled:!J.has(g),resolve_title:J.has(g)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Re=new Set,re=new Set,M=new Set,ve=null,Te=[],E=Xf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>v()});function te(){E.refreshSessionDefaults()}let ke=document.createElement("div");ke.className="worker-console";let we=document.createElement("div");we.className="worker-top";let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let xe=document.createElement("div");xe.className="worker-drawer-overlay__backdrop";let Me=document.createElement("div");Me.className="worker-drawer-host";let He=document.createElement("div");He.className="worker-drawer-host",He.hidden=!0,Oe.append(xe,Me,He);let Ze=document.createElement("div");Ze.className="worker-lanes-host",ke.append(we,Oe,Ze),e.appendChild(ke);let I=dr(null,null),de=[],ne=ji({transport:n,console_el:ke,getLanes:()=>I,getWorkspaces:()=>de,getCrossLanes:()=>null,reproject:()=>({lanes:Dt(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>v(),adoptQueue:(g,b)=>{o&&o.set(b)},onDragBegin:()=>{k=null}}),ce=null,$e=go(Me,{transport:n,sessionLogStore:s,onClose:()=>{ce=null,Oe.hidden=!0,v()}}),me=Gf(He,{onClose:()=>{He.hidden=!0,Oe.hidden=!0,v()}}),Ne=qf({getWorkspacePath:l||(()=>"")}),Ge=l&&l()||"",et=Ff({queueStore:o,transport:n,onChanged:()=>v(),onOpenScript:(g,b)=>{Ne.open(g,b)}});function Se(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Gi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Q(g){for(let b of Object.values($t(Se().provider_hold)))for(let A of Array.isArray(b?.targets)?b.targets:[])if(Array.isArray(A?.attempt_ids)&&A.attempt_ids.includes(g))return A;return null}function V(g){if(g?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(g?.status||"\uBBF8\uC0C1")}`};let b=Array.isArray(g.windows)?g.windows:[],A=b.find(ue=>ue?.key==="5h"),Z=b.find(ue=>ue?.key==="7d");if(!A||typeof A.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(A.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(Z){if(typeof Z.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(Z.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Be(g){let b=$t(Se().attempts)[g];if(!b)return;let A=$t(Se().runner_catalog),Z=$t(A.runners),ue=typeof b.runner=="string"&&Z[b.runner]?b.runner:Object.keys(Z)[0]||"",ye=$t(Z[ue]),Ue=$t(ye.models),mt=typeof b.model=="string"&&Ue[b.model]?b.model:typeof ye.default_model=="string"?ye.default_model:Object.keys(Ue)[0]||"",Wt=Q(g),st=typeof b.claude_account=="string"?b.claude_account:typeof Wt?.account=="string"?Wt.account:"";B={attempt_id:g,original_runner:ue,runner:ue,model:mt,account:st,fresh_current:!1},v()}function ut(){B=null,v()}function ct(){let g=B;if(!g||!g.runner||!g.model||g.runner==="claude"&&!g.account)return;let b={runner:g.runner,model:g.model};g.runner==="claude"&&g.account&&(b.claude_account=g.account);let A=g.fresh_current||g.runner!==g.original_runner;B=null,v(),Mt(g.attempt_id,"session",{exec_override:b,...A?{continuation:"fresh_current",decision_token:{}}:{}})}function y(){let g=B;if(!g)return"";let b=$t($t(Se().runner_catalog).runners),A=Array.isArray($t(Se().account_catalog).claude)?$t(Se().account_catalog).claude:[],Z=g.runner!==g.original_runner;return c`<dialog
      class="provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(b).map(ue=>c`<option
                  value=${ue}
                  ?selected=${ue===g.runner}
                >
                  ${ue}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(b).map(([ue,ye])=>c`<optgroup label=${ue}>
                  ${Object.keys($t(ye?.models)).map(Ue=>c`<option
                        value=${JSON.stringify([ue,Ue])}
                        ?selected=${ue===g.runner&&Ue===g.model}
                      >
                        ${Ue}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${g.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${g.account?"":c`<option value="" selected>계정 선택</option>`}
                ${g.account&&!A.some(ue=>ue?.email===g.account)?c`<option value=${g.account} selected>
                      ${g.account} (목록에 없음)
                    </option>`:""}
                ${A.map(ue=>{let ye=V(ue),Ue=ue.alias||ue.email;return c`<option
                    value=${ue.email}
                    ?selected=${ue.email===g.account}
                    ?disabled=${!ye.eligible}
                    title=${ye.reason}
                  >
                    ${Ue}${ye.reason?` \u2014 ${ye.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${g.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${Z||g.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="provider-resume-dialog__actions">
        <button type="button" class="provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="provider-resume-dialog__confirm"
          ?disabled=${g.runner==="claude"&&!g.account}
          title=${g.runner==="claude"&&!g.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function G(){let g=Se(),b=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,A=Array.isArray(g.serial_lanes)?g.serial_lanes:[],Z=[];for(let ye of A){if(Z.length>=b)break;!ye||typeof ye.id!="string"||!/^s[1-5]$/.test(ye.id)||!Array.isArray(ye.entries)||Z.push({id:ye.id,label:`\uC9C1\uB82C ${ye.id.slice(1)}`,count:ye.entries.length})}return Z.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...Z]}function Ie(g){if(!k||!g.some(A=>A.id===k))return null;let b=G();return b?{bead_id:k,lanes:b}:null}function Pe(){return l&&l()||""}async function We(g,b){await ne.sendOp({type:"worker-queue-place",payload:{bead_id:g,...b==="parallel"?{}:{lane:b}},root_dir:Pe()},g)}function Fe(){let g=Se();return typeof g.revision=="number"?g.revision:0}function Ye(g){g&&g.queue&&o&&o.set(g.queue)}async function Rt(g){if(!n||!g)return;let b=await n("worker-attempt-pause",{attempt_id:g});b&&b.paused===!1&&b.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Mt(g,b="session",A={}){if(!n||!g)return;let Z=await Jr();if(Z===null)return;let ue=async(Ue={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Fe(),...Z!==""?{instructions:Z}:{},...A,...Ue}),ye=await ue();Ye(ye),ye&&ye.conflict&&(ye=await ue(),Ye(ye)),ye=await Kn(ye,(Ue,mt)=>ue({continuation:Ue,decision_token:mt}),{onResult:Ye,refresh:()=>ue()}),ye&&ye.resumed===!1&&!ye.conflict&&ye.reason&&ge(`${b==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ye.reason}`,"error",2400)}async function Ot(g,b,A=!0){if(!n)return null;let Z=n,ue=await Z(g,{...b,expected_revision:Fe()});return Ye(ue),ue&&ue.conflict&&A&&(ue=await Z(g,{...b,expected_revision:Fe()}),Ye(ue)),ue}async function yt(g){if(!n||!g)return;let b=Se().merge_queue?.find(Z=>Z.bead_id===g)?.continuation_action;if(b?.mismatch&&b.continuation===null){await le(g,b.mismatch);return}Y.add(g),v();let A;try{A=await Ot("worker-merge-queue-add",{bead_id:g})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{Y.delete(g),v()}if(!(!A||A.applied)){if(A.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(dw(A.reason),"error",2400)}}async function pt(g){if(!(!n||!g||X.has(g))){X.add(g),v();try{let b=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Fe()});Ye(b),b&&!b.retried&&!b.conflict&&b.reason&&ge(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{X.delete(g),v()}}}async function Et(g){if(!(!n||!g||J.has(g))){J.add(g),v();try{let b=await n("worker-resolve-in-session",{bead_id:g,expected_revision:Fe()});Ye(b),ge(_w(b),mw(b),4e3)}finally{J.delete(g),v()}}}async function Lt(g,b){let A=Se().hold;if(!n||!A||typeof A.since!="number")return;let Z=await n(g,{since:A.since});Ye(Z),Z&&Z.ok===!1&&ge(`${b}: ${Z.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":Z.reason||""}`,"error",2800)}async function qt(g,b){if(!n||!g||!b)return;let A=await n("worker-parked-retry",{bead_id:g,attempt_id:b});Ye(A),A&&A.ok===!1&&ge(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${A.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":A.reason||""}`,"error",2800)}async function le(g,b){let A=await Kn({continuation_mismatch:b},(ue,ye)=>Ot("worker-merge-queue-add",{bead_id:g,continuation:ue,decision_token:ye},!1)),Z=A?.queue?.merge_queue?.find(ue=>ue.bead_id===g)?.continuation_action;if(A?.applied!==!0&&Z?.continuation===null&&Z.mismatch){await le(g,Z.mismatch);return}A&&A.applied===!1&&!A.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ae(g){if(!n)return;let b=await Ot("worker-merge-auto-toggle",{on:g});!b||b.conflict||ge(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function x(g){if(!n||!g)return;let b=await Ot("worker-merge-queue-remove",{bead_id:g});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function q(){await Ot("worker-merge-queue-remove",{all:!0})}async function oe(g,b=null,A="unmerged",Z=null){if(!n||!g)return;let ue=No(g,A);if(!(!!Z||typeof globalThis.confirm!="function"||globalThis.confirm(ue)))return;let Ue=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...Z?{operation_id:Z}:{},expected_revision:Fe()});if(Ye(Ue),Ue&&Ue.conflict&&(Ue=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...Z?{operation_id:Z}:{},expected_revision:Fe()}),Ye(Ue)),Ue&&Ue.discarded===!0){ge(Zs(Ue),"success",5e3);return}if(Ue&&Ue.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${Ue.reason}`,"error",2800);return}if(Ue&&Ue.accepted&&Ue.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ue&&Ue.accepted&&!Ue.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${Ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ue&&!Ue.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function se(g,b,A){if(!n||!g||!b||typeof globalThis.confirm=="function"&&!globalThis.confirm(qo(g,A)))return;let Z=await n("worker-discard-abandon",{bead_id:g,operation_id:b,expected_revision:Fe()});if(Ye(Z),Z&&Z.conflict&&(Z=await n("worker-discard-abandon",{bead_id:g,operation_id:b,expected_revision:Fe()}),Ye(Z)),Z&&Z.abandoned===!0){ge(Qs(A),"success",5e3);return}if(Z&&Z.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${Z.reason}`,"error",2800);return}Z&&!Z.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ee(g,b,A){if(!(!n||!b||!A||re.has(b))){re.add(b),v();try{let Z=await n(g,{bead_id:b,action_id:A,expected_revision:Fe()});Ye(Z),Z?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!Z?.ok&&Z?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(Z.reason)}`,"error",2800)}finally{re.delete(b),v()}}}async function he(g,b){if(!n||!b||Re.has(b))return;Re.add(b),v();let A;try{let Z=async(ue={})=>await n(g,{bead_id:b,expected_revision:Fe(),...ue});A=await Z(),Ye(A),A&&A.conflict&&(A=await n(g,{bead_id:b,expected_revision:Fe()}),Ye(A)),g==="worker-revise-fix"&&(A=await Kn(A,(ue,ye)=>Z({continuation:ue,decision_token:ye}),{onResult:Ye,refresh:()=>Z()}))}finally{Re.delete(b),v()}if(!(!A||A.conflict)){if(A.ok){ge(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}}async function Je(g){if(!n)return;let b=await n("worker-automation-toggle",{on:g,expected_revision:Fe()});Ye(b),b&&b.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Fe()}).then(Ye)}async function ot(g){if(!n||!g)return;let b=await n("worker-repo-operation-dismiss",{operation_id:g});Ye(b),b&&b.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function ze(g){if(!n||!Number.isFinite(g))return;let b=Math.max(Gi,Math.floor(g)),A=await n("worker-queue-set-slots",{slots:b,expected_revision:Fe()});Ye(A),A&&A.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:Fe()}).then(Ye)}async function Tt(g){if(!n||!Number.isInteger(g)||g<1||g>Qf)return;let b=Se(),A=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(g).reduce((ye,Ue)=>ye+(Array.isArray(Ue?.entries)?Ue.entries.length:0),0),Z=()=>({count:g,expected_revision:Fe()}),ue=await n("worker-queue-set-serial-lane-count",Z());Ye(ue),ue&&ue.conflict&&(ue=await n("worker-queue-set-serial-lane-count",Z()),Ye(ue)),ue&&ue.applied&&A>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${A}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Dt(){let g=Ar(U),b=E.read({candidate_sort:C,done_since:g});return de=b.workspaces,I=dr(b.workspaces,b.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),I}function ht(g){return g.queue_groups[0]||ow}function Yt(g){let b=g.dependency_chips||null,A={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},Z=z.get(g.id),ue=N.get(g.id)||null,ye=Z&&Z.overlaps.length>0?Z.overlaps:null,Ue=!!Z&&Z.scope_missing;return!ue&&!ye&&!Ue&&Object.keys(A).length===0?null:{...A,...ue?{predecessors:ue}:{},...ye?{overlaps:ye}:{},...Ue?{scope_missing:!0}:{}}}function xt(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Yt(g)||void 0,chip_popover:Pt(g)}}function Pt(g){return si(g,b=>ie.isOpen({bead_id:g.id,chip_key:b}))}function Ht(){let g=Se(),b=new Map;for(let A of Object.values($t(g.lane_states))){let Z=Array.isArray(A?.corrections)?A.corrections:[];for(let ue of Z)ue&&typeof ue.bead_id=="string"&&typeof ue.after=="string"&&b.set(ue.bead_id,ue.after)}return{admission:$t(g.admission),correction_after:b}}function lt(g,b){let A=xt(g),Z=ju(b.admission[g.id]||null,!!g.discard||re.has(g.id)),ue=b.correction_after.get(g.id);return{...A,draggable:A.draggable===!0&&!Z,stale_work:Z,reason:Z?"":A.reason,badges:ue?[`\u{1F517} ${ue} \uB4A4 (blocks \uC790\uB3D9)`,...A.badges||[]]:A.badges,revise_enabled:A.revise_enabled===!0&&!Re.has(g.id)}}function Vt(g){let b=Ht();return ht(g).sublanes.parallel.map(A=>lt(A,b))}function Zt(g){let b=Ht();return ht(g).sublanes.serial.map(A=>{let Z=A.occupants.map(ue=>({id:ue.id,title:ue.title,draggable:!1,lane:A.id,ghost:!0,badges:[ue.badge]}));return{id:A.id,index:A.index+1,raw_length:A.raw_length,ghosts:Z,items:A.items.map(ue=>lt(ue,b)),occupied:A.occupied_by.length>0,badge:A.occupants.length>0?A.occupants[0].badge:"\uB300\uAE30",cycle:A.cycle===!0}})}function Kt(g){return g.runnable.map(b=>xt(b))}function wn(g){return g.done.map(b=>xt(b))}function Bt(g){let b=g.running.filter(A=>A.non_occupying!==!0).map(A=>({...A,bead_id:A.id,attempt_id:A.attempt_id||"",paused:A.run_state==="paused",failed:A.run_state==="failed",parked:A.run_state==="parked",retry_wait:A.run_state==="retry_wait",waiting:A.run_state==="waiting",wait:A.wait||null,provider_hold:A.run_state==="provider_hold",hold:A.hold?{...A.hold,open:j===A.attempt_id}:null,status_label:A.run_state==="failed"?A.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":A.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":A.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":A.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":A.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:A.can_pause!==!1,workspace_name:"",dependency_chips:Yt(A)||void 0,chip_popover:Pt(A),rollup_expanded:M.has(A.id),failure:A.failure?{...A.failure,open:R===A.attempt_id}:null,..._e(A.id,A.discard)}));return[...b.filter(A=>A.failed===!0),...b.filter(A=>A.failed!==!0&&A.parked===!0),...b.filter(A=>A.failed!==!0&&A.parked!==!0)]}function Jt(g){return Xt(g).map(b=>({...b,chip_popover:Pt(b)}))}function Xt(g){if(ve&&ve.model===g)return ve.rows;let b=Se(),A=ht(g),Z=$t(b.attempts),ue=Object.values(Z).filter(Xn),ye=new Map;for(let Ke of ue)ye.set(Ke.attempt_id,Ke);let Ue=new Map;for(let Ke of ue)Ue.set(Ke.bead_id,Ke);let mt=new Map;for(let Ke of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])mt.has(Ke.id)||mt.set(Ke.id,Ke);let Wt=Ke=>{let zt=null;for(let Ve of ue)!Ve||Ve.bead_id!==Ke||za(Ve,ye)||(zt===null||(typeof Ve.started_at=="number"?Ve.started_at:0)>=(typeof zt.started_at=="number"?zt.started_at:0))&&(zt=Ve);return zt&&typeof zt.target_base=="string"?zt.target_base:null},st=new Map;for(let Ke of g.running)Ke.run_state==="failed"||Ke.conflict_resolution!==!0||(Ke.run_state!=="paused"?st.set(Ke.id,"running"):st.has(Ke.id)||st.set(Ke.id,"paused"));let tn=$t(b.auto_merge_skips),on=new Set(A.merge.auto_excluded),qn=$t(b.pr_observations),dn=$t(b.pr_activity),ln=$t(b.cleanup_failed),Tn=$t(b.discard_operations),nn=$t(b.bead_workflow),rr=$t(b.bead_titles),yr=b.merge_queue_state||{active:null,failures:{}},or=A.merge.state.waiting,Cn=new Map;for(let Ke of Array.isArray(b.merge_queue)?b.merge_queue:[])Ke&&typeof Ke=="object"&&Ke.bead_id&&Cn.set(Ke.bead_id,Ke);let jn=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Ke=>{let zt=mt.get(Ke.bead_id);return{...Sw(Ke.bead_id,zt?.title||rr[Ke.bead_id]||Ke.bead_id,qn,ln[Ke.bead_id]||null,Vn(Z,Ke.bead_id),dn[Ke.bead_id]||(Y.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:X.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),st.get(Ke.bead_id)||null,Ke.external===!0,{position:A.merge.positions.get(Ke.bead_id)||0,active:yr.active===Ke.bead_id,failure:$t(yr.failures)[Ke.bead_id]||null,waiting:or&&or.bead_id===Ke.bead_id?or.reason:null,resolution:A.merge.resolutions.get(Ke.bead_id),continuation_action:A.merge.continuations.get(Ke.bead_id),authority:A.merge.authorities.get(Ke.bead_id)||null,hold:Cn.get(Ke.bead_id)?.hold||null,review_dispatch:Cn.get(Ke.bead_id)?.review_dispatch||null},Ke.wt_present!==!1,b.auto_merge===!0&&on.has(Ke.bead_id)?tn[Ke.bead_id]?.reason||"":null,Wa(A.declared_base,Wt(Ke.bead_id)),$t(b.completion_status)[Ke.bead_id]||null,Tn,b.auto_merge===!0,{merge_sha:Ke.merge_sha,cleanup_cursor:Ke.cleanup_cursor,repo_operations:A.repo_operations},zt?Yt(zt):null,Du(Z,Ke.bead_id),J.has(Ke.bead_id)),workflow:nn[Ke.bead_id]||null,priority:zt?.priority,from_id:zt?.from_id,...zt?.created_at===void 0?{}:{created_at:zt.created_at},...zt?.updated_at===void 0?{}:{updated_at:zt.updated_at}}});return ve={model:g,rows:jn},jn}function un(g){let b=ht(g),A=[];for(let ye of g.running)ye.non_occupying!==!0&&A.push({id:ye.id,title:ye.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:ye.serial_lane_id??null});for(let ye of g.pr_wait)A.push({id:ye.id,title:ye.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let ye of b.sublanes.serial)ye.items.forEach((Ue,mt)=>{A.push({id:Ue.id,title:Ue.title,location_label:`${ye.id} #${mt+1}`,kind:"serial",lane_id:ye.id})});b.sublanes.parallel.forEach((ye,Ue)=>{A.push({id:ye.id,title:ye.title,location_label:`#${Ue+1}`,kind:"parallel",lane_id:null})});for(let ye of g.runnable)A.push({id:ye.id,title:ye.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:ye.queue_placeable===!0});let Z=Se();z=Df(Z.bead_scope,A);let ue=new Map;for(let ye of[...g.running,...g.runnable])Array.isArray(ye.blocked_by)&&ye.blocked_by.length>0&&ue.set(ye.id,ye.blocked_by);for(let[ye,Ue]of Object.entries($t(Z.bead_blocked_by)))Array.isArray(Ue)&&ue.set(ye,Ue.filter(mt=>typeof mt=="string"&&mt.length>0));N=Xu(ue,A,$t(Z.blocker_workspaces))}function fe(g){let b=g.hold&&typeof g.hold=="object"?g.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let A=_r(b.cause)||String(b.cause||""),Z=Array.isArray(g.lineages)?g.lineages:[];if(b.kind==="env"){let ye=Z.map(mt=>mt&&mt.next_at).filter(mt=>typeof mt=="number").sort((mt,Wt)=>mt-Wt)[0],Ue=typeof ye=="number"?` \xB7 \uB2E4\uC74C ${new Date(ye).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${A} — 재시도 대기${Ue}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ue=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(ye=>typeof ye=="string"&&ye.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${A}${ue.length>0?` \u2014 bead ${ue.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function T(g){let b=[];for(let[st,tn]of Object.entries($t(g.provider_hold)))for(let on of Array.isArray(tn?.targets)?tn.targets:[])b.push({runner:st,target:on});if(b.length===0)return"";let A=b.find(st=>st.target?.kind==="outage");if(A){let st=typeof A.target.next_probe_at=="number"?new Date(A.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${A.runner} 공급자 장애 — 신규 디스패치
        보류${st?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${st}`:""}
      </div>`}let Z=Array.isArray($t(g.account_catalog).claude)?$t(g.account_catalog).claude:[],ue=st=>Z.find(on=>on?.email===st)?.alias||st,ye=b.find(st=>typeof st.target?.account!="string"),Ue=st=>typeof st?.resets_at=="number"?new Date(st.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(ye){let st=Ue(ye.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${ye.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${st?`, \uB9AC\uC14B ${st}`:""}
      </div>`}let mt=[...new Set(b.map(st=>ue(String(st.target.account))))],Wt=Ue(b[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${mt.join(", ")} 사용 한도 —
      ${mt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Wt?`, \uB9AC\uC14B ${Wt}`:""}
    </div>`}function be(g){let b=Se(),A=ht(g),Z=A.sublanes.parallel,ue=Z.length>0?Z[0].id:"\u2014",ye=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ue=$(g),mt=A.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Wt=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(nn=>nn&&typeof nn.armed_by_lane=="string"&&nn.armed_by_lane.length>0).length,st=Wt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Wt}건 진행 중</span
          >`:"",tn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${A.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Jt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${K()} 완료 <b>${g.done.length}</b></span
      >`,on=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${A.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${A.declared_base||"?"}</span
    >`,qn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Gi}
          step="1"
          .value=${String(A.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Qf},(nn,rr)=>rr+1).map(nn=>c`<option
                value=${String(nn)}
                ?selected=${A.serial_lane_count===nn}
              >
                ${nn}
              </option>`)}
        </select>
      </label> `,dn=Mu(A.repo_operations,A.cleanup_failures),ln=fe(b),Tn=T(b);return D?c`<div class="worker-ribbon">
          ${ye} ${Ue}
          <div class="worker-kpi worker-kpi--ribbon">
            ${mt}${st}${tn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qn}</div>
          <div class="worker-kpi">${on}</div>
        </div>
        ${Tn}${ln}${dn}${et.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${ye}${Ue}${qn}</div>
        <div class="worker-kpi">
          ${mt}${st}${tn}${on}
          ${(Array.isArray(A.token_total)?A.token_total:A.token_total?[{label:A.token_total,tooltip:`${K()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(nn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${nn.tooltip}
                >${K()} 완료 · 누적 ${nn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ue}</b></span
          >
        </div>
      </div>
      ${Tn}${ln}${dn}${et.template()}`}function qe(g){let b=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${aw.map(A=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${m.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function ft(){let g=L?"custom":Ol(C)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${us.map(b=>c`<option value=${b.id} ?selected=${g===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function p(){let g=ds(C);return c`<div
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
            ${Cf.map(Z=>c`<option
                  value=${Z.key}
                  ?selected=${!!A&&A.key===Z.key}
                >
                  ${Z.label}
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
    </div>`}function f(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${Wr.map(g=>c`<option value=${g.value} ?selected=${U===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function $(g){let b=ht(g).merge,A=Se().auto_merge===!0;if(b.running)return c`<button
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
      </button>`;let Z=new Set(b.auto_excluded),ue=Jt(g).filter(ye=>ye.merge_action&&ye.merge_enabled&&!Z.has(ye.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ue>0?` ${ue}`:""}
    </button>`}function O(g){if(!(g.draggable!==!0||g.done===!0))return c`<span class="worker-mini__rowops">
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
    </span>`}function F(g,b){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${cn(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${In({...g,..._e(g.id,g.discard)},{actions:O(g)})}
    </div>`}function ee(g){let b=Vt(g),A=Pe();return ai({parallel:{rows:b.map((Z,ue)=>F(Z,{kind:"parallel",root_dir:A,row_index:ue})),count:b.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:A}},serial:{lanes:Zt(g).map(Z=>({id:Z.id,title:`\uC9C1\uB82C ${Z.index}`,rows:[...Z.ghosts.map(ue=>In({...ue,..._e(ue.id,ue.discard)},{actions:O(ue)})),...Z.items.map((ue,ye)=>F(ue,{kind:"repo-serial",root_dir:A,row_index:ye,lane_id:Z.id}))],count:Z.ghosts.length+Z.items.length,empty:Z.ghosts.length+Z.items.length===0,badge:Z.badge,held:Z.occupied,cycle:Z.cycle,drop:{drop:"repo-serial",root_dir:A,lane_id:Z.id,lane_length:String(Z.raw_length)}})),collapsed:H.isAreaCollapsed("serial")}})}function pe(g){return Bp(Bt(g),Date.now(),ce)}function Ce(g){return g.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function Qe(g){let b=ht(g),A=Kt(g),Z=Vt(g),ue=wn(g),ye=Jt(g),Ue=Bt(g),mt=Wn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:A,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ft(),header_row:L?p():void 0,controls:qe(g),collapsible:!0,collapsed:H.isCollapsed("candidate"),place_menu:Ie(A),onOpenDoc:u?(st,tn)=>u(tn):void 0}),Wt=Wn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ue,empty:`${K()} \uC644\uB8CC \uC5C6\uC74C`,header_control:f(),collapsible:!0,collapsed:H.isCollapsed("done"),preview:D?Array.isArray(b.token_total)?b.token_total.map(st=>st.label).join(" \xB7 "):b.token_total||Zf(ue):void 0});return D?c`<div class="worker-lanes worker-lanes--mobile">
          ${li({live:Ce(g),running_body:Ue.length>0?pe(g):"",pr_wait_rows:ye.map(st=>In(st)),count:Ue.length+ye.length})}
          ${Wn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:Z,count:Z.length,collapsible:!0,collapsed:H.isCollapsed("queue"),preview:Zf(Z),body:ee(g)})}
          ${mt} ${Wt}
        </div>
        ${y()}`:c`<div class="worker-lanes">
        ${mt}
        ${Wn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:Z,count:Z.length,collapsible:!0,collapsed:H.isCollapsed("queue"),body:ee(g)})}
        ${Wn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ue,header_control:c`<span class="worker-pane__meta"
            >슬롯 ${b.slots}</span
          >`,live:Ce(g),collapsible:!0,collapsed:H.isCollapsed("running"),body:pe(g)})}
        ${Wn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:ye,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:H.isCollapsed("pr_wait")})}
        ${Wt}
      </div>
      ${y()}`}function wt(g){H.toggle(g),v()}function vt(g){H.toggleArea(g),v()}function v(){let g=Dt();un(g),at(be(g),we),at(Qe(g),Ze);let b=Ze.querySelector(".provider-resume-dialog");b&&!b.open&&(typeof b.showModal=="function"?b.showModal():b.setAttribute("open",""))}function S(){let g=!0,b=Mi(A=>{if(D=A,g){g=!1;return}v()});Te.push(b)}function Le(g){m=g,iw(g),v()}function je(g){if(g==="custom"){L=!0,v();return}C=qr(g),Il(C),L=!1,v()}function nt(g){C=qr({chain:g}),Il(C),v()}function bt(g){U=Fn(g),cw(U),_?.(U),v()}function Ut(g){let b=g.target;if(B){let st=b?.closest?.(".provider-resume-dialog__runner");if(st){let dn=$t($t(Se().runner_catalog).runners),ln=$t(dn[st.value]),Tn=Object.keys($t(ln.models));B={...B,runner:st.value,model:typeof ln.default_model=="string"?ln.default_model:Tn[0]||""},v();return}let tn=b?.closest?.(".provider-resume-dialog__model");if(tn){try{let[dn,ln]=JSON.parse(tn.value);typeof dn=="string"&&typeof ln=="string"&&(B={...B,runner:dn,model:ln},v())}catch{}return}let on=b?.closest?.(".provider-resume-dialog__account");if(on){B={...B,account:on.value},v();return}let qn=b?.closest?.(".provider-resume-dialog__fresh-input");if(qn){B={...B,fresh_current:qn.checked},v();return}}let A=b?.closest?.(".worker-serial-lane-count");if(A){let st=Number.parseInt(A.value,10);Number.isFinite(st)&&Tt(st).then(v);return}let Z=g.target?.closest?.(".worker-filter__blocked");if(Z){Le({...m,show_blocked:Z.checked});return}let ue=g.target?.closest?.(".worker-sort-chain__key");if(ue){let st=Number.parseInt(ue.getAttribute("data-step")||"",10);Number.isFinite(st)&&nt(Of(ds(C),st,ue.value));return}let ye=g.target?.closest?.(".worker-done-range");if(ye){bt(ye.value);return}let Ue=g.target?.closest?.(".worker-sort");if(Ue){je(Ue.value);return}let mt=g.target?.closest?.(".worker-slots__input");if(!mt)return;let Wt=Number.parseInt(mt.value,10);if(!Number.isFinite(Wt)){v();return}ze(Wt).then(v)}function kn(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function br(){let g=ht(Dt()),b=Se().workspace_info,A=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:A}}function jr(){ce&&$e.close(),He.hidden=!1,Oe.hidden=!1,me.open(br()),v()}function fs(g){let b=Se(),A=b.attempts?b.attempts[g]:null;ce=g,me.close(),He.hidden=!0,Oe.hidden=!1,$e.open({attempt_id:g,meta:kn(A)}),v()}function Ki(g){let b=Se(),A=(Array.isArray(b.session_active)?b.session_active:[]).find(ue=>ue&&ue.bead_id===g),Z=(A&&Array.isArray(A.session_refs)?A.session_refs:[]).find(ue=>ue&&ue.current===!0);Z&&(me.close(),He.hidden=!0,Oe.hidden=!1,$e.open(eo(Z,g,"in_progress")),v())}function Yi(){if(me.isOpen()&&me.refresh(br()),!ce)return;let g=Se(),b=g.attempts?g.attempts[ce]:null;if(b){$e.updateMeta(kn(b));return}$e.close()}function Vi(g,b){if(g.length===0||!i)return;let A=l?l():void 0;if(b.length===0||!A||b===A||!a){i(g);return}Promise.resolve(a(b)).then(()=>{i(g)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Fr(g){let b=g.target;if(b?.closest?.(".provider-resume-dialog__cancel")){ut();return}if(b?.closest?.(".provider-resume-dialog__confirm")){ct();return}if(b?.closest?.(".provider-resume-dialog")||b?.closest?.(".worker-mini__grip"))return;let A=b?.closest?.(".worker-sort-chain__dir");if(A){let De=Number.parseInt(A.getAttribute("data-step")||"",10);Number.isFinite(De)&&nt(If(ds(C),De));return}let Z=b?.closest?.(".worker-dep__open");if(Z){Vi(Z.getAttribute("data-dep-id")||"",Z.getAttribute("data-root-dir")||"");return}let ue=b?.closest?.(".judgement-chip");if(ue){let De=ue.closest("[data-bead-id]"),At=De&&De.getAttribute("data-bead-id")||"",sn=ue.getAttribute("data-chip-key")||"";At&&sn&&ie.toggle({bead_id:At,chip_key:sn});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){jr();return}let ye=b?.closest?.(".worker-repo-op__dismiss");if(ye){ot(ye.dataset.operationId||"");return}let Ue=b?.closest?.(".worker-cleanup__resume");if(Ue){let De=Ue.dataset.beadId;De&&pt(De);return}let mt=b?.closest?.(".worker-cleanup__resolve");if(mt){let De=mt.dataset.beadId;De&&Et(De);return}if(b?.closest?.(".worker-hold__retry")){Lt("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){Lt("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Je(!Se().auto_advance);return}let Wt=b?.closest?.(".worker-merge-all");if(Wt){Wt.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?ae(!1):q():ae(!0);return}let st=b?.closest?.(".worker-pane__toggle[data-lane]");if(st){let De=st.dataset.lane;(De==="candidate"||De==="queue"||De==="running"||De==="pr_wait"||De==="done")&&wt(De);return}let tn=b?.closest?.(".worker-wait__area-toggle[data-area]");if(tn){let De=tn.dataset.area;(De==="parallel"||De==="serial")&&vt(De);return}let on=b?.closest?.(".worker-card__place-lane");if(on){let De=on.dataset.beadId,At=on.dataset.lane;De&&(At==="parallel"||/^s[1-5]$/.test(At||""))&&(k=null,v(),We(De,At));return}if(b?.closest?.(".worker-card__place-cancel")){k=null,v();return}let dn=b?.closest?.(".worker-card__place");if(dn){let De=dn.dataset.beadId;De&&!dn.disabled&&(G()?(k=De,v()):We(De,"parallel"));return}let ln=b?.closest?.(".worker-filter__chip");if(ln){let De=ln.dataset.spec;(De==="all"||De==="with"||De==="without")&&Le({...m,spec:De});return}let Tn=b?.closest?.('[data-action="queue-remove"]');if(Tn){let De=Tn.dataset.beadId||"";De&&ne.sendOp({type:"worker-queue-remove",payload:{bead_id:De},root_dir:Pe()},De);return}let nn=b?.closest?.(".worker-mini__merge");if(nn){let De=nn.dataset.beadId||"";Se().cleanup_failed?.[De]?pt(De):yt(De);return}let rr=b?.closest?.(".worker-mini__merge-cancel");if(rr){x(rr.dataset.beadId||"");return}let yr=b?.closest?.(".worker-mini__resolve");if(yr){Et(yr.dataset.beadId||"");return}let or=b?.closest?.(".rtile__resolve");if(or){let De=or.closest(".rtile");Et(De?.dataset.beadId||"");return}let Cn=b?.closest?.(".worker-mini__discard"),jn=b?.closest?.(".worker-mini__discard-abandon");if(jn){se(jn.dataset.beadId||"",jn.dataset.operationId||"",{kind:jn.dataset.operationKind||"",last_error:jn.dataset.lastError||""});return}if(Cn){oe(Cn.dataset.beadId||"",Cn.dataset.attemptId||null,Cn.dataset.discardMode==="merged"?"merged":"unmerged",Cn.dataset.operationId||null);return}let Ke=b?.closest?.(".worker-mini__stale-continue");if(Ke){Ee("worker-stale-work-continue",Ke.dataset.beadId||"",Ke.dataset.actionId||"");return}let zt=b?.closest?.(".worker-mini__stale-backup");if(zt){Ee("worker-stale-work-backup-fresh",zt.dataset.beadId||"",zt.dataset.actionId||"");return}let Ve=b?.closest?.(".worker-mini__stale-recheck");if(Ve){Ee("worker-stale-work-recheck",Ve.dataset.beadId||"",Ve.dataset.actionId||"");return}let w=b?.closest?.(".worker-mini__revise-fix");if(w){he("worker-revise-fix",w.dataset.beadId||"");return}let P=b?.closest?.(".worker-mini__revise-approve");if(P){he("worker-revise-approve",P.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let W=b?.closest?.(".rtile__failure-badge");if(W){let De=W.dataset.attemptId||"";R=R===De?null:De,v();return}let Ae=b?.closest?.(".rtile__provider-hold-badge");if(Ae){let De=Ae.dataset.attemptId||"";j=j===De?null:De,v();return}let rt=b?.closest?.(".rtile__attempt-copy");if(rt){let De=rt.dataset.attemptId||"";De&&_n(De).then(At=>{ge(At?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",At?"success":"error",1400)});return}if(b?.closest?.(".rtile__parked-retry")){let De=b?.closest?.(".rtile");qt(De?.dataset?.beadId||"",De?.dataset?.attemptId||"");return}let tt=b?.closest?.(".rtile__discard-abandon");if(tt){let At=b?.closest?.(".rtile")?.dataset?.beadId;At&&se(At,tt.dataset.operationId||"",{kind:tt.dataset.operationKind||"",last_error:tt.dataset.lastError||""});return}let gt=b?.closest?.(".rtile__discard");if(gt){let De=b?.closest?.(".rtile"),At=De?.dataset?.beadId,sn=De?.dataset?.attemptId;At&&oe(At,sn||null,gt.dataset.confirmation==="merged"?"merged":"unmerged",gt.dataset.operationId||null);return}if(b?.closest?.(".rtile__pause")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&Rt(At);return}if(b?.closest?.(".rtile__resume-alternate")){let At=b?.closest?.(".rtile")?.dataset?.attemptId;At&&Be(At);return}if(b?.closest?.(".rtile__resume")){let De=b?.closest?.(".rtile__resume"),sn=b?.closest?.(".rtile")?.dataset?.attemptId;sn&&Mt(sn,De?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let De=b?.closest?.(".rtile"),At=De?.dataset?.attemptId;if(At){fs(At);return}let sn=De?.dataset?.beadId;sn&&Ki(sn);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){me.close(),$e.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Xe=b?.closest?.(".rtile .board-card__roll-toggle");if(Xe){let De=Xe.dataset.rollParent;De&&(M.has(De)?M.delete(De):M.add(De),v());return}let dt=b?.closest?.(".rtile .board-card__roll-child");if(dt){let De=dt.dataset.childId;De&&i&&i(De);return}let pn=b?.closest?.(".rtile");if(pn){if(b?.closest?.(".rtile__id")){let At=pn.dataset.beadId;At&&_n(At).then(sn=>{sn?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let De=pn.dataset.beadId;De&&i&&i(De);return}let bo=b?.closest?.(".worker-mini, .worker-card");if(bo){let De=bo.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){De&&_n(De).then(sn=>{sn?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let At=b?.closest?.(".ctl-chip--from");if(At){let sn=At.dataset.fromId;sn&&i&&i(sn);return}De&&i&&i(De)}}ne.attach(e),e.addEventListener("click",Fr),e.addEventListener("change",Ut);function Br(g){let b=g.target,A=b&&typeof b.closest=="function"?ue=>b.closest(ue):()=>null,Z=!1;R&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,Z=!0),j&&!A(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(j=null,Z=!0),Z&&v()}function _s(g){g.key==="Escape"&&(R===null&&j===null&&B===null||(R=null,j=null,B=null,v()))}return document.addEventListener("click",Br),document.addEventListener("keydown",_s),ie.attach(),Te.push(()=>{document.removeEventListener("click",Br),document.removeEventListener("keydown",_s),ie.detach()}),S(),h&&Te.push(h.subscribe(()=>{E.notifyIssuesChanged(),v()})),o&&Te.push(o.subscribe(()=>{let g=l&&l()||"";g!==Ge&&(Ge=g,Ne.close()),v(),Yi()})),v(),{load(){E.ensureSessionDefaults(),v()},refreshSessionDefaults:te,destroy(){for(let g of Te.splice(0))try{g()}catch{}ne.detach(),e.removeEventListener("click",Fr),e.removeEventListener("change",Ut),E.destroy();try{$e.destroy()}catch{}Oe.hidden=!0;try{Ne.destroy()}catch{}at(c``,e)}}}function Nl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function n_(e,t,n,r=async()=>{},o=async()=>{}){let s=Nt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(L){let K=L.target.value,D=t.getState().workspace?.current?.path||"";if(K&&K!==D){s("switching workspace to %s",K),l=!0,C();try{await n(K)}catch(Y){s("workspace switch failed: %o",Y)}finally{l=!1,C()}}}async function _(){let L=t.getState(),U=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!U||a)){s("git-pulling workspace %s",U),a=!0,C();try{await r(U)}catch(K){s("workspace git pull failed: %o",K)}finally{a=!1,C()}}}function h(L){let U=L.target;U&&e.contains(U)||R()}function m(L){L.key==="Escape"&&R()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),C())}function R(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),C())}function j(){u?R():k()}async function B(L){let U=L.target,K=U.value,H=U.checked;s("toggling visibility %s \u2192 %s",K,String(H));try{await o(K,H)}catch(D){s("workspace visibility toggle failed: %o",D)}}function ie(L){return L?c`
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
    `:c``}function z(L,U){return c`
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
                ${L.map(K=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!U.has(K.path)}
                        @change=${B}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Nl(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let L=t.getState(),U=L.workspace?.current,K=L.workspace?.available||[],H=new Set(L.workspace?.hidden||[]),D=U?.path||K[0]?.path||"";if(K.length===0)return c``;let Y=K.filter(X=>!H.has(X.path)||X.path===D);if(Y.length<=1){let X=Y[0]||K[0],J=Nl(X.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${J}</span
          >
          ${z(K,H)}
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
          ${Y.map(X=>c`
              <option
                value="${X.path}"
                ?selected=${X.path===D}
                title="${X.path}"
              >
                ${Nl(X.path)}
              </option>
            `)}
        </select>
        ${z(K,H)}
        ${ie(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function C(){at(N(),e)}return C(),i=t.subscribe(()=>C()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),at(c``,e)}}}var r_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function ql(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function o_(e,t,n=ql()){return{id:n,type:e,payload:t}}function s_(e={}){let t=Nt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],_=new Map,h=new Set;function m(N){for(let C of Array.from(h))try{C(N)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),C=(n.jitterRatio||0)*N,L=Math.max(0,Math.round(N+(Math.random()*2-1)*C));t("ws retry in %d ms (attempt %d)",L,i+1),l=setTimeout(()=>{l=null,z()},L)}function R(N){try{o?.send(JSON.stringify(N))}catch(C){t("ws send failed",C)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let N=d.shift();N&&R(N)}}function B(N){let C;try{C=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!C||typeof C.id!="string"||typeof C.type!="string"){t("ws received invalid envelope");return}if(u.has(C.id)){let U=u.get(C.id);u.delete(C.id),C.ok?U?.resolve(C.payload):U?.reject(C.error||new Error("ws error"));return}let L=_.get(C.type);if(L&&L.size>0)for(let U of Array.from(L))try{U(C.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",C.type)}function ie(){s="closed",t("ws closed"),m(s);for(let[N,C]of u.entries())C.reject(new Error("ws disconnected")),u.delete(N);i+=1,k()}function z(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",B),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(C){t("ws connect failed %o",C),k()}}return z(),{send(N,C){if(!r_.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let L=ql(),U=o_(N,C,L);return t("send %s id=%s",N,L),new Promise((K,H)=>{u.set(L,{resolve:K,reject:H,type:N}),o&&o.readyState===o.OPEN?R(U):(t("queue %s id=%s (state=%s)",N,L,s),d.push(U))})},on(N,C){_.has(N)||_.set(N,new Set);let L=_.get(N);return L?.add(C),()=>{L?.delete(C)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function Ew(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Tw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var jl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],i_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Cw="bdui.worker.done-range",a_=rf,l_="worker:queue",c_="ui:order",u_="ui:display-policy",d_="exec:presets",hr="tab:board:closed",p_="beads-ui.board.closed-range";function Rw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Ow(e))});return n.observe(e),()=>n.disconnect()}function Ow(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Iw(e){let t=Nt("main");t("bootstrap start"),Rw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;at(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&xf(i),l&&a&&u&&d){let ke=function(v,S){let Le="Request failed",je="";if(v&&typeof v=="object"){let bt=v;if(typeof bt.message=="string"&&bt.message.length>0&&(Le=bt.message),typeof bt.details=="string")je=bt.details;else if(bt.details&&typeof bt.details=="object")try{je=JSON.stringify(bt.details,null,2)}catch{je=""}}else typeof v=="string"&&v.length>0&&(Le=v);let nt=S&&S.length>0?`Failed to load ${S}`:"Request failed";te.open(nt,Le,je)},Be=function(v){return`${fe.getState().workspace.current?.path||""}\0${v}`},ut=function(){$e&&($e().catch(()=>{}),$e=null),me=null,Ne=null},y=function(v){Ge=v;let S=()=>{Ge!==v||fe.getState().selected_id!==v||(Ge=null,ct(v))};if(!Q){Se.then(S);return}S()},We=function(v,S,Le,je,nt){return Le!==Pe[S]?(nt().catch(()=>{}),!1):(v.set(je,nt),!0)},Ye=function(){let v=fe.getState();pt(v.view==="board"),x(v.view==="worker"),Je(he(v)),oe(v.view==="board"||v.view==="worker"||Fe||!!v.selected_id)},Ot=function(){let v=Ar(Rt);return v===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:v}}},yt=function(){let v=Ar(Mt);return v===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:v}}},pt=function(v){if(v)for(let[S,Le]of jl){if(G.has(S)||Ie.has(S))continue;let je=S===hr?Ot():{type:Le};try{Me.register(S,je)}catch(Ut){t("register %s store failed: %o",S,Ut)}Ie.add(S);let nt=Pe.board,bt=!1;xe.subscribeList(S,je).then(Ut=>{bt=!We(G,"board",nt,S,Ut)}).catch(Ut=>{t("subscribe %s failed: %o",S,Ut),ke(Ut,"board")}).finally(()=>{Ie.delete(S),bt&&Ye()})}else qt()},qt=function(){Pe.board+=1;for(let[v]of jl){let S=G.get(v);S&&(S().catch(()=>{}),G.delete(v));try{Me.unregister(v)}catch(Le){t("unregister %s failed: %o",v,Le)}}},x=function(v){if(!v){q();return}for(let[S,Le]of i_){if(le.has(S)||Ie.has(S))continue;let je=S===gr?yt():{type:Le};try{Me.register(S,je)}catch(Ut){t("register %s store failed: %o",S,Ut)}Ie.add(S);let nt=Pe.worker,bt=!1;xe.subscribeList(S,je).then(Ut=>{bt=!We(le,"worker",nt,S,Ut)}).catch(Ut=>{t("subscribe %s failed: %o",S,Ut),ke(Ut,"worker")}).finally(()=>{Ie.delete(S),bt&&Ye()})}},q=function(){Pe.worker+=1;for(let[v]of i_){let S=le.get(v);S&&(S().catch(()=>{}),le.delete(v));try{Me.unregister(v)}catch(Le){t("unregister %s failed: %o",v,Le)}}},oe=function(v){if(!v){se();return}ae||(Oe("subscribe-worker-queue",{id:l_}).catch(S=>{t("subscribe-worker-queue failed: %o",S)}),ae=()=>Oe("unsubscribe-worker-queue",{id:l_}))},se=function(){ae&&(ae().catch(()=>{}),ae=null)},he=function(v){return v.view==="monitor"||v.selected_id!=null},Je=function(v){if(!v){ot();return}Ee||(Oe("subscribe-monitor-pipeline",{id:a_}).catch(S=>{t("subscribe-monitor-pipeline failed: %o",S)}),Ee=()=>Oe("unsubscribe-monitor-pipeline",{id:a_}))},ot=function(){Ee&&(Ee().catch(()=>{}),Ee=null)},Tt=function(){ze||(Oe("subscribe-ui-order",{id:c_}).catch(v=>{t("subscribe-ui-order failed: %o",v)}),ze=()=>Oe("unsubscribe-ui-order",{id:c_}))},Dt=function(){ze&&(ze().catch(()=>{}),ze=null),I.clear()},Yt=function(){ht||(Oe("subscribe-display-policy",{id:u_}).catch(v=>{t("subscribe-display-policy failed: %o",v)}),ht=()=>Oe("unsubscribe-display-policy",{id:u_}))},xt=function(){ht&&(ht().catch(()=>{}),ht=null),de.clear()},Ht=function(){Pt||(Oe("subscribe-impl-presets",{id:d_}).catch(v=>{t("subscribe-impl-presets failed: %o",v)}),Pt=()=>Oe("unsubscribe-impl-presets",{id:d_}))},Bt=function(v){if(!v)return"Unknown";let S=v.split("/").filter(Boolean);return S.length>0?S[S.length-1]:"Unknown"},F=function(v,S){O.open(v.path,{missing_state:v.missing_state,...S?{workspace:S}:{}})};var _=ke,h=Be,m=ut,k=y,R=We,j=Ye,B=Ot,ie=yt,z=pt,N=qt,C=x,L=q,U=oe,K=se,H=he,D=Je,Y=ot,X=Tt,J=Dt,_e=Yt,Re=xt,re=Ht,M=Bt,ve=F;let Te=document.getElementById("header-loading"),E=Tc(Te),te=Tp(e),we=s_(),Oe=E.wrapSend((v,S)=>we.send(v,S)),xe=wc(Oe),Me=kc(),He=xc(),Ze=ec(),I=$c(),de=Zl(),ne=Jl(),ce=tc();we.on("impl-presets-snapshot",v=>{let S=v;S&&typeof S.revision=="number"&&Array.isArray(S.presets)&&ne.set({revision:S.revision,presets:S.presets})}),we.on("monitor-pipeline-snapshot",v=>{let S=v;if(!(!S||!Array.isArray(S.workspaces)))try{Ze.set(S.workspaces,S.workspaces_state,S.cross_lanes)}catch{}}),we.on("ui-order-snapshot",v=>{let S=v;if(S&&typeof S.revision=="number")try{I.set({revision:S.revision,order:S.order&&typeof S.order=="object"?S.order:{}})}catch{}}),we.on("display-policy-snapshot",v=>{let S=v;if(S&&S.policy&&typeof S.policy=="object")try{de.set(S.policy)}catch{}}),we.on("session-log-snapshot",v=>{let S=v;if(S&&typeof S.id=="string")try{ce.set(S.id,Array.isArray(S.lines)?S.lines:[],typeof S.last_event_at=="number"?S.last_event_at:null)}catch{}}),we.on("session-log-append",v=>{let S=v;if(S&&typeof S.id=="string")try{ce.append(S.id,S.event)}catch{}}),we.on("snapshot",v=>{let S=v,Le=S&&typeof S.id=="string"?S.id:"",je=Le?Me.getStore(Le):null;if(je&&S&&S.type==="snapshot")try{je.applyPush(S)}catch{}}),we.on("upsert",v=>{let S=v,Le=S&&typeof S.id=="string"?S.id:"",je=Le?Me.getStore(Le):null;if(je&&S&&S.type==="upsert")try{je.applyPush(S)}catch{}}),we.on("delete",v=>{let S=v,Le=S&&typeof S.id=="string"?S.id:"",je=Le?Me.getStore(Le):null;if(je&&S&&S.type==="delete")try{je.applyPush(S)}catch{}});let $e=null,me=null,Ne=null,Ge=null,et=()=>{},Se=new Promise(v=>{et=()=>v(void 0)}),Q=!1,V=!1;async function ct(v){let S=Be(v);if(S===me||S===Ne)return;Ne=S;let Le=`detail:${v}`,je={type:"issue-detail",params:{id:v}};try{Me.register(Le,je)}catch(nt){t("register detail store failed: %o",nt)}try{let nt=await xe.subscribeList(Le,je);if(fe.getState().selected_id!==v||Be(v)!==S){await nt().catch(()=>{});return}$e&&await $e().catch(()=>{}),$e=nt,me=S}catch(nt){t("detail subscribe failed: %o",nt),ke(nt,"issue details")}finally{Ne===S&&(Ne=null)}}let G=new Map,Ie=new Set,Pe={board:0,worker:0},Fe=!1,Rt=ws;try{let v=window.localStorage.getItem(p_);ra(v)&&(Rt=v)}catch{}let Mt="today";try{let v=window.localStorage.getItem(Cw);v!==null&&(Mt=Fn(v))}catch{}async function Et(v){if(!ra(v)||v===Rt)return;Rt=v;try{window.localStorage.setItem(p_,v)}catch{}let S=G.get(hr);if(!S)return;G.delete(hr),await S().catch(()=>{});let Le=Ot();try{Me.register(hr,Le)}catch(je){t("register %s store failed: %o",hr,je)}try{let je=await xe.subscribeList(hr,Le);G.set(hr,je)}catch(je){t("re-subscribe %s failed: %o",hr,je),ke(je,"board")}}async function Lt(v){let S=Fn(v);if(S===Mt)return;Mt=S;let Le=le.get(gr);if(!Le)return;le.delete(gr),await Le().catch(()=>{});let je=yt();try{Me.register(gr,je)}catch(nt){t("register %s store failed: %o",gr,nt)}try{let nt=await xe.subscribeList(gr,je);le.set(gr,nt)}catch(nt){t("re-subscribe %s failed: %o",gr,nt),ke(nt,"worker")}}let le=new Map,ae=null,Ee=null,ze=null,ht=null,Pt=null;async function lt(){ht=null,de.clear(),Pt=null,ne.clear(),ae=null,Ee=null,G.clear(),le.clear(),Pe.board+=1,Pe.worker+=1,Ht();let v=fe.getState().workspace.current?.path;if(v)try{await we.send("set-workspace",{path:v})}catch(Le){t("workspace restore after reconnect failed: %o",Le);return}Yt();let S=fe.getState();pt(S.view==="board"),x(S.view==="worker"),Je(he(S)),oe(S.view==="board"||S.view==="worker"||!!S.selected_id)}async function Vt(){t("clearing all subscriptions for workspace switch"),qt(),q(),se(),He.clear(),Dt(),Tt(),xt(),Yt(),ut();let v=fe.getState();if(v.selected_id)try{Me.unregister(`detail:${v.selected_id}`)}catch{}let S=fe.getState();pt(S.view==="board"),x(S.view==="worker"),Je(he(S)),oe(S.view==="board"||S.view==="worker"||!!S.selected_id),S.selected_id&&y(S.selected_id)}async function Zt(v){t("requesting workspace switch to %s",v),V=!0;try{let S=await we.send("set-workspace",{path:v});t("workspace switch result: %o",S),S&&S.workspace&&(fe.setState({workspace:{current:{path:S.workspace.root_dir,database:S.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",v),S.changed&&(await Vt(),ge("Switched to "+Bt(v),"success",2e3)))}catch(S){throw t("workspace switch failed: %o",S),ge("Failed to switch workspace","error",3e3),S}finally{V=!1}}async function Kt(v){t("requesting workspace git pull for %s",v);try{let S=await we.send("git-pull-workspace",{});t("workspace git pull result: %o",S);let Le=S?.status;if(Le==="up_to_date"){ge("Already up to date","success",2e3);return}if(Le==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Bt(v),"success",2e3)}catch(S){t("workspace git pull failed: %o",S);let Le=S?.code,je=S?.message;if(Le==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Le==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Le==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let nt=je?`: ${je}`:"";throw ge(`Git pull failed${nt}`,"error",3e3),S}}async function wn(v,S){t("setting workspace visibility %s \u2192 %s",v,String(S));try{await we.send("set-workspace-visibility",{path:v,visible:S}),await Jt()}catch(Le){t("workspace visibility update failed: %o",Le),ge("Failed to update project visibility","error",3e3)}}async function Jt(){try{let v=await we.send("list-workspaces",{});if(t("workspaces loaded: %o",v),v&&Array.isArray(v.workspaces)){let S=v.workspaces.map(bt=>({path:bt.path,database:bt.database,pid:bt.pid,version:bt.version})),Le=v.current?{path:v.current.root_dir,database:v.current.db_path}:null,je=Array.isArray(v.hidden)?v.hidden.filter(bt=>typeof bt=="string"):[];fe.setState({workspace:{current:Le,available:S,hidden:je}});let nt=window.localStorage.getItem("beads-ui.workspace");nt&&(!S.some(Ut=>Ut.path===nt)||je.includes(nt)?window.localStorage.removeItem("beads-ui.workspace"):Le&&nt!==Le.path&&(t("restoring saved workspace preference: %s",nt),await Zt(nt)))}}catch(v){t("failed to load workspaces: %o",v)}}we.on("workspace-changed",v=>{t("workspace-changed event: %o",v),v&&v.root_dir&&(fe.setState({workspace:{current:{path:v.root_dir,database:v.db_path}}}),Jt(),Vt())});let Xt=!1;if(typeof we.onConnection=="function"){let v=S=>{t("ws state %s",S),S==="reconnecting"||S==="closed"?(Xt=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):S==="open"&&Xt&&(Xt=!1,ge("Reconnected","success",2200),Tw(fe,(Le,je)=>{t(`${Le}: %o`,je)}),lt())};we.onConnection(v)}let un="board";try{let v=window.localStorage.getItem("beads-ui.view");(v==="board"||v==="worker"||v==="monitor")&&(un=v)}catch(v){t("view parse error: %o",v)}let fe=Ec({config:Ew(),view:un});we.on("worker-queue-snapshot",v=>{let S=v;if(!S||!S.queue)return;let Le=fe.getState().workspace.current?.path;if(typeof Le=="string"&&Le.length>0&&S.root_dir!==Le){t("dropping worker-queue snapshot for %s",String(S.root_dir));return}try{He.set(S.queue)}catch{}});let T=Ac(fe);T.start();let be=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),qe=async(v,S)=>{try{return await Oe(v,S)}catch(Le){if(be.has(v))throw Le;return[]}};sf({global_element:r,repo_element:o},fe,T);let ft=document.getElementById("workspace-picker");ft&&n_(ft,fe,Zt,Kt,wn);let p=uf(e,(v,S)=>Oe(v,S));try{let v=document.getElementById("new-issue-btn");v&&v.addEventListener("click",()=>p.open())}catch{}let f=_f(e,{policyStore:de,queueStore:He,implPresetStore:ne,transport:(v,S)=>Oe(v,S),onOpenChange:v=>{let S=Fe;Fe=v,Ye(),S&&v===!1&&pe.refreshSessionDefaults()},labelOptions:()=>{let v=new Set;for(let[S]of jl)for(let Le of Me.snapshotFor(S)||[]){let je=Le.labels;if(Array.isArray(je))for(let nt of je)typeof nt=="string"&&nt.length>0&&v.add(nt)}return Array.from(v).sort()}});try{let v=document.getElementById("display-settings-btn");v&&(v.setAttribute("aria-label","\uC124\uC815"),v.setAttribute("title","\uC124\uC815"),v.addEventListener("click",()=>f.open()))}catch{}let $=document.createElement("div");$.className="md-viewer-root",document.body.appendChild($);let O=Di($,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),ee=zc(l,{gotoIssue:v=>T.gotoIssue(v),issueStores:Me,transport:qe,workerQueueStore:He,uiOrderStore:I,displayPolicyStore:de,closedRange:Rt,onClosedRangeChange:v=>{Et(v)},onNewIssue:()=>p.open(),openDoc:F}),pe=Ml(a,{transport:qe,issueStores:Me,queueStore:He,sessionLogStore:ce,gotoIssue:v=>fe.setState({selected_id:v}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:v=>Zt(v),openDoc:F,doneRange:Mt,onDoneRangeChange:v=>{Lt(v)}}),Ce=of(u,{transport:qe,pipelineStore:Ze,execPresetStore:ne,sessionLogStore:ce,router:T,gotoIssue:v=>T.gotoIssue(v),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:v=>Zt(v),openDoc:F}),Qe=Ep(d,{issueStores:Me,transport:qe,queueStore:He,execPresetStore:ne,sessionLogStore:ce,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:O,depCandidates:()=>{let v=Ze.get();if(v===null)return null;let S=Ze.getWorkspacesState(),Le=fe.getState();if(Le.view==="monitor")return Ya(v,S);let je=Le.workspace.current?.path;return je?Ya(v,S,{root_dir:je}):null},subscribeCandidates:v=>Ze.subscribe(v),onDepChanged:({type:v,a:S,b:Le})=>{let je=Ce;v==="dep-add"&&je&&typeof je.recorrectSharedLane=="function"&&je.recorrectSharedLane(v,S,Le)},onNavigate:(v,S)=>{let Le=()=>{fe.getState().view==="worker"?fe.setState({selected_id:v}):T.gotoIssue(v)},je=fe.getState().workspace.current?.path;if(typeof S!="string"||S.length===0||!je||S===je){Le();return}Promise.resolve(Zt(S)).then(Le).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let v=fe.getState();fe.setState({selected_id:null});try{T.gotoView(v.view==="worker"||v.view==="monitor"?v.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),wt=fe.getState().selected_id;wt&&(d.hidden=!1,Qe.load(wt),y(wt)),fe.subscribe(v=>{let S=v.selected_id;S?(d.hidden=!1,Qe.load(S),V||y(S)):(Qe.clear(),d.hidden=!0,ut())});let vt=v=>{l.hidden=v.view!=="board",a.hidden=v.view!=="worker",u.hidden=v.view!=="monitor",s&&s.classList.toggle("is-quiet",v.view==="monitor"),pt(v.view==="board"),x(v.view==="worker"),Je(he(v)),oe(v.view==="board"||v.view==="worker"||Fe||!!v.selected_id),!v.selected_id&&v.view==="board"&&ee.load(),v.view==="worker"&&pe.load(),v.view==="monitor"?Ce.load():Ce.pause(),window.localStorage.setItem("beads-ui.view",v.view)};fe.subscribe(vt),vt(fe.getState()),Tt(),Yt(),Ht(),Jt().finally(()=>{Q=!0,et()}),window.addEventListener("keydown",v=>{let S=v.ctrlKey||v.metaKey,Le=String(v.key||"").toLowerCase(),je=v.target,nt=je&&je.tagName?String(je.tagName).toLowerCase():"",bt=nt==="input"||nt==="textarea"||nt==="select"||je&&typeof je.isContentEditable=="boolean"&&je.isContentEditable;S&&Le==="n"&&(bt||(v.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Iw(t)});export{Iw as bootstrap,Ew as readBootstrapConfig,Tw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
