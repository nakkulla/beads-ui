var u_=Object.create;var Ba=Object.defineProperty;var d_=Object.getOwnPropertyDescriptor;var p_=Object.getOwnPropertyNames;var f_=Object.getPrototypeOf,__=Object.prototype.hasOwnProperty;var m_=(e,t,n)=>t in e?Ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ua=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var g_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of p_(t))!__.call(e,s)&&s!==n&&Ba(e,s,{get:()=>t[s],enumerable:!(r=d_(t,s))||r.enumerable});return e};var b_=(e,t,n)=>(n=e!=null?u_(f_(e)):{},g_(t||!e||!e.__esModule?Ba(n,"default",{value:e,enumerable:!0}):n,e));var Mt=(e,t,n)=>m_(e,typeof t!="symbol"?t+"":t,n);var wc=Ua((qv,vc)=>{var Pr=1e3,Mr=Pr*60,Dr=Mr*60,hr=Dr*24,v_=hr*7,w_=hr*365.25;vc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return k_(e);if(n==="number"&&isFinite(e))return t.long?x_(e):$_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function k_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*w_;case"weeks":case"week":case"w":return n*v_;case"days":case"day":case"d":return n*hr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Dr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Pr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function $_(e){var t=Math.abs(e);return t>=hr?Math.round(e/hr)+"d":t>=Dr?Math.round(e/Dr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Pr?Math.round(e/Pr)+"s":e+"ms"}function x_(e){var t=Math.abs(e);return t>=hr?po(e,t,hr,"day"):t>=Dr?po(e,t,Dr,"hour"):t>=Mr?po(e,t,Mr,"minute"):t>=Pr?po(e,t,Pr,"second"):e+" ms"}function po(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var $c=Ua((Fv,kc)=>{function A_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=wc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let h=0;h<d.length;h++)m=(m<<5)-m+d.charCodeAt(h),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,h=null,b,k;function M(...B){if(!M.enabled)return;let V=M,ce=Number(new Date),U=ce-(m||ce);V.diff=U,V.prev=m,V.curr=ce,m=ce,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let j=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(z,L)=>{if(z==="%%")return"%";j++;let I=n.formatters[L];if(typeof I=="function"){let ne=B[j];z=I.call(V,ne),B.splice(j,1),j--}return z}),n.formatArgs.call(V,B),(V.log||n.log).apply(V,B)}return M.namespace=d,M.useColors=n.useColors(),M.color=n.selectColor(d),M.extend=r,M.destroy=n.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:B=>{h=B}}),typeof n.init=="function"&&n.init(M),M}function r(d,m){let h=n(this.namespace+(typeof m>"u"?":":m)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,m){let h=0,b=0,k=-1,M=0;for(;h<d.length;)if(b<m.length&&(m[b]===d[h]||m[b]==="*"))m[b]==="*"?(k=b,M=h,b++):(h++,b++);else if(k!==-1)b=k+1,M++,h=M;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function a(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function i(d){for(let m of n.skips)if(o(d,m))return!1;for(let m of n.names)if(o(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}kc.exports=A_});var xc=Ua((gn,fo)=>{gn.formatArgs=E_;gn.save=T_;gn.load=C_;gn.useColors=S_;gn.storage=R_();gn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();gn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function S_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function E_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+fo.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}gn.log=console.debug||console.log||(()=>{});function T_(e){try{e?gn.storage.setItem("debug",e):gn.storage.removeItem("debug")}catch{}}function C_(){let e;try{e=gn.storage.getItem("debug")||gn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function R_(){try{return localStorage}catch{}}fo.exports=$c()(gn);var{formatters:O_}=fo.exports;O_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ns=globalThis,so=ns.trustedTypes,sc=so?so.createPolicy("lit-html",{createHTML:e=>e}):void 0,za="$lit$",Hn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ha="?"+Hn,h_=`<${Ha}>`,_r=document,rs=()=>_r.createComment(""),ss=e=>e===null||typeof e!="object"&&typeof e!="function",Ga=Array.isArray,uc=e=>Ga(e)||typeof e?.[Symbol.iterator]=="function",Wa=`[ 	
\f\r]`,ts=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oc=/-->/g,ac=/>/g,pr=RegExp(`>|${Wa}(?:([^\\s"'>=/]+)(${Wa}*=${Wa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ic=/'/g,lc=/"/g,dc=/^(?:script|style|textarea|title)$/i,Ka=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Ka(1),as=Ka(2),Ov=Ka(3),Sn=Symbol.for("lit-noChange"),Vt=Symbol.for("lit-nothing"),cc=new WeakMap,fr=_r.createTreeWalker(_r,129);function pc(e,t){if(!Ga(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return sc!==void 0?sc.createHTML(t):t}var fc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=ts;for(let i=0;i<n;i++){let l=e[i],u,d,m=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===ts?d[1]==="!--"?a=oc:d[1]!==void 0?a=ac:d[2]!==void 0?(dc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=pr):d[3]!==void 0&&(a=pr):a===pr?d[0]===">"?(a=s??ts,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?pr:d[3]==='"'?lc:ic):a===lc||a===ic?a=pr:a===oc||a===ac?a=ts:(a=pr,s=void 0);let b=a===pr&&e[i+1].startsWith("/>")?" ":"";o+=a===ts?l+h_:m>=0?(r.push(u),l.slice(0,m)+za+l.slice(m)+Hn+b):l+Hn+(m===-2?i:b)}return[pc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},os=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=fc(t,n);if(this.el=e.createElement(u,r),fr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=fr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(za)){let h=d[a++],b=s.getAttribute(m).split(Hn),k=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?ao:k[1]==="?"?io:k[1]==="@"?lo:gr}),s.removeAttribute(m)}else m.startsWith(Hn)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(dc.test(s.tagName)){let m=s.textContent.split(Hn),h=m.length-1;if(h>0){s.textContent=so?so.emptyScript:"";for(let b=0;b<h;b++)s.append(m[b],rs()),fr.nextNode(),l.push({type:2,index:++o});s.append(m[h],rs())}}}else if(s.nodeType===8)if(s.data===Ha)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Hn,m+1))!==-1;)l.push({type:7,index:o}),m+=Hn.length-1}o++}}static createElement(t,n){let r=_r.createElement("template");return r.innerHTML=t,r}};function mr(e,t,n=e,r){if(t===Sn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ss(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=mr(e,s._$AS(e,t.values),s,r)),t}var oo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??_r).importNode(n,!0);fr.currentNode=s;let o=fr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Lr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new co(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=fr.nextNode(),a++)}return fr.currentNode=_r,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Lr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Vt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=mr(this,t,n),ss(t)?t===Vt||t==null||t===""?(this._$AH!==Vt&&this._$AR(),this._$AH=Vt):t!==this._$AH&&t!==Sn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Vt&&ss(this._$AH)?this._$AA.nextSibling.data=t:this.T(_r.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=os.createElement(pc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new oo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=cc.get(t.strings);return n===void 0&&cc.set(t.strings,n=new os(t)),n}k(t){Ga(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(rs()),this.O(rs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Vt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Vt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=mr(this,t,n,0),a=!ss(t)||t!==this._$AH&&t!==Sn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=mr(this,i[r+l],n,l),u===Sn&&(u=this._$AH[l]),a||(a=!ss(u)||u!==this._$AH[l]),u===Vt?t=Vt:t!==Vt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ao=class extends gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vt?void 0:t}},io=class extends gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Vt)}},lo=class extends gr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=mr(this,t,n,0)??Vt)===Sn)return;let r=this._$AH,s=t===Vt&&r!==Vt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Vt&&(r===Vt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},co=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){mr(this,t)}},_c={M:za,P:Hn,A:Ha,C:1,L:fc,R:oo,D:uc,V:mr,I:Lr,H:gr,N:io,U:lo,B:ao,F:co},y_=ns.litHtmlPolyfillSupport;y_?.(os,Lr),(ns.litHtmlVersions??(ns.litHtmlVersions=[])).push("3.3.1");var it=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Lr(t.insertBefore(rs(),o),o,void 0,n??{})}return s._$AI(e),s};var uo="today",mc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Ir=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function jn(e){return e==="today"?"today":"7d"}function Va(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function br(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function hc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function yc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ac=b_(xc(),1);function Wt(e){return(0,Ac.default)(`beads-ui:${e}`)}function Ln(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function yr(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Tc(e,t){let n=Ln(e.created_at),r=Ln(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function _o(e,t){let n=Ln(e.updated_at),r=Ln(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Cc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Ln(e.created_at),o=Ln(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Rc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var L_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Sc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Ec(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=L_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e,t){let n=Sc(e),r=Sc(t);if(n!==r)return n<r?-1:1;let s=Ec(e),o=Ec(t);if(s!==o)return s<o?-1:1;let a=Ln(e&&e.created_at),i=Ln(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ya=2**20;function Nr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ln(e&&e.created_at)}function mo(e){return(t,n)=>{let r=Nr(t,e),s=Nr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Za(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Nr(i,n)-Ya};if(!i)return{rank:Nr(a,n)+Ya};let l=Nr(a,n),u=Nr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,h)=>({bead_id:m.id,rank:h*Ya}))}}function Qa(e,t={}){let n=Wt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||yr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function m(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&r.set(M.id,M);d(),o=b,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=r.get(k.id);if(!M)r.set(k.id,k);else{let B=Number.isFinite(M.updated_at)?M.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(B<=V){for(let ce of Object.keys(M))ce in k||delete M[ce];for(let[ce,U]of Object.entries(k))M[ce]=U}}d()}o=b,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function go(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Lc(e){let t=Wt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let M=k.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&M.set(B,!0);for(let B of m)typeof B=="string"&&B.length>0&&M.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&M.delete(B)}}async function o(i,l){let u=go(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let m=n.get(i);if(m&&m.key!==u){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(m){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=n.get(i)||null;if(m){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:go,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Ic(){let e=Wt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let m=u?go(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,h),b&&h&&m&&h!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let M=s.get(l);if(M){try{M()}catch{}s.delete(l)}let B=Qa(l,d);t.set(l,B);let V=B.subscribe(()=>o());s.set(l,V)}else if(!b){let k=Qa(l,d);t.set(l,k);let M=k.subscribe(()=>o());s.set(l,M)}return n.set(l,m),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Mc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Dc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function I_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function P_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Nc(e){let t=Wt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):I_(r),a=P_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Xa(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Xa(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var M_=Object.freeze({workspace_config:{default_workspace:null}});function qc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:M_.workspace_config.default_workspace}}}function Fc(e={}){let t=Wt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:qc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?qc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function jc(e){let t=Wt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(m,h)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),a();let M=!1,B=()=>{M||(M=!0,r.delete(b),i())},V=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),B())},3e4);try{let ce=await u(m,h),U=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,U),ce}catch(ce){let U=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,U,ce),ce}finally{clearTimeout(V),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function fe(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function bo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Rc),l;switch(i){case"created_desc":return l.sort(yr),l;case"created_asc":return l.sort(Tc),l;case"updated_desc":return l.sort(_o),l;case"priority":return l.sort(Cc),l;case"manual":default:{let u=n();return u?l.sort(mo(u)):l.sort(yr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Bn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ln(e){let t=Bn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function bn(e,t){let n=Bn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Bc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Bn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function ho(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function yo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=ho(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function vo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Bc(n);return{total:n.length,count:r,current:s,children:n}}function wo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Za(i,l,u.order),a);s(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(h);let b=r(Za(i,l,h.order),a);s(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Uc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function ko(e,t){let n=Uc(e),r=Uc(t);return n.length===0||r.length===0?!1:n!==r}function $o(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ja(e,t){return!t||typeof e!="string"||e.length===0||$o(t.visible_labels).includes(e)?!0:$o(t.hidden_labels).includes(e)?!1:!$o(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Wc(e,t){return $o(e).filter(n=>Ja(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function D_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function N_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function q_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${D_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function xo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Oc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?N_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>q_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var F_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Hc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},zc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},j_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function B_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Gc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function U_(e){if(!e||e.fill==="none"||!e.approval_state)return Gc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function W_(e,t,n,r){let s=F_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=j_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",m=Hc[e]||e,h=r?Kc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${m}</div>
    </button>
  `}function Kc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ao(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=zc[e.route]||zc.spec_backed,o=e.stages,a=B_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Hc[u]||u} ${u==="plan"?U_(o[u]||{}):Gc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Kc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>W_(u,o[u]||{},u===a,r))}
    </div>
  `}function z_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Vc=2;function Yc(e){let t=e.slice(0,Vc).join(", "),n=e.length-Vc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function H_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(ko(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Yc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Yc(o)}</span
      >`),n}function ei(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function So(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Gn(e){return`${e.kind}:${So(e)}@${e.sha}`}function Eo(e,t){if(!e)return null;let n=ei(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ei(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Gn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function Zc(e,t){let n=Eo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function G_(e){if(!e)return null;let t=ei(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Gn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function K_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&nr(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Zc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(i)}`}
        >${`exec ${i.kind==="delegated"?So(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Wc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&nr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")&&s.push(...H_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function V_(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ln(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ln(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Y_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return xo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:V_(e),empty_label:"children \uC5C6\uC74C",childChips:ti,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ti(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Eo(t,n)?c`<span class="board-card__roll-child-chips">
    ${Zc(t,n)}
    ${G_(n)}
  </span>`:null}function To(e,t){let n=z_(e.priority);return c`
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
      ${K_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?Ao(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Y_(e,t)}
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
              ${mc.map(o=>c`<option
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
        ${e.items.map(o=>To(o,t))}
      </div>
    </section>
  `}function Qc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>To(r,t))}
        </div>
      </div>
    </dialog>
  `}var Z_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Q_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],X_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function J_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
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
  `}function Xc(e,t,n){return c`
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
        ${Z_.map(r=>c`<option
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
        ${Q_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${J_(e,t,n)}
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
        ${X_.map(r=>c`<option
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
  `}var em=200,tm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},nm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Jc="beads-ui.board.sort",eu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function rm(){try{let e=window.localStorage.getItem(Jc);if(e&&eu.has(e))return e}catch{}return"created_desc"}function tu(e,t){let n=Wt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,h=t.closedRange||uo,b=s?bo(s,a):null,k=wo({transport:o,uiOrderStore:a}),M=[],B=[],V=[],ce=[],U=[],j=[],D=!1,z=0,L=rm(),I=new Map,ne=new Map,ke=new Map,we=new Set,_e={search:"",priority:"",type:"",labels:[]},ie=!1,Ee=null;function Le(S){return String(S.status||"open")==="open"}function $e(S){let G=String(S.status||"open");return G==="open"||G==="blocked"}function ee(S){let G=_e.search.trim().toLowerCase(),Re=_e.priority,$=_e.type,O=_e.labels;return S.filter(Q=>{if(G){let me=String(Q.id||"").toLowerCase(),xe=String(Q.title||"").toLowerCase();if(!me.includes(G)&&!xe.includes(G))return!1}if(Re!==""&&String(Q.priority)!==Re||$!==""&&String(Q.issue_type||"")!==$)return!1;if(O.length>0){let me=Array.isArray(Q.labels)?Q.labels:[];if(!O.some(xe=>me.includes(xe)))return!1}return!0})}function Z(){let S=new Set;for(let G of[M,B,V,ce,U,j])for(let Re of G){let $=Array.isArray(Re.labels)?Re.labels:[];for(let O of $)typeof O=="string"&&O.length>0&&S.add(O)}return Array.from(S).sort()}function Se(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function H(){try{if(b){let S=b.selectBoardColumn("tab:board:in-progress","in_progress",L),G=b.selectBoardColumn("tab:board:blocked","blocked",L).filter($e),Re=new Set(S.map(le=>le.id)),$=b.selectBoardColumn("tab:board:ready","ready",L).filter(le=>Le(le)&&!Re.has(le.id)),O=b.selectBoardColumn("tab:board:resolved","resolved",L),Q=b.selectBoardColumn("tab:board:deferred","deferred",L),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,em),xe=[...G,...$,...S,...O,...me];oe(xe);let w=new Set;for(let le of xe)le&&le.id&&!ho(le)&&w.add(le.id);let W=!Se();M=W?is(G,w):G,B=W?is($,w):$,V=W?is(S,w):S,ce=W?is(O,w):O,U=Q,z=Q.length,j=W?is(me,w):me,I=new Map;for(let le of M)I.set(le.id,"open");for(let le of B)I.set(le.id,"open");for(let le of V)I.set(le.id,"in_progress");for(let le of ce)I.set(le.id,"resolved");for(let le of U)I.set(le.id,"deferred");for(let le of j)I.set(le.id,"closed");ne=new Map;for(let le of M)ne.set(le.id,"blocked-col");for(let le of B)ne.set(le.id,"ready-col");for(let le of V)ne.set(le.id,"in-progress-col");for(let le of ce)ne.set(le.id,"resolved-col");for(let le of j)ne.set(le.id,"closed-col")}pt()}catch{M=[],B=[],V=[],ce=[],U=[],j=[],ke=new Map,pt()}}function oe(S){ke=yo(S)}function ge(S){return vo(ke,S)}function Ae(S){return!we.has(S)}function Ve(S,G){S.preventDefault(),S.stopPropagation(),we.has(G)?we.delete(G):we.add(G),pt()}function de(S,G){S.preventDefault(),S.stopPropagation(),r(G)}function Me(S,G){S.preventDefault(),S.stopPropagation(),r(G)}function At(S,G){Ee||r(G)}function xt(S,G){S.preventDefault(),S.stopPropagation(),sm(G).then(Re=>{Re&&fe("\uBCF5\uC0AC\uB428","success",1200)})}function ft(S,G){Ee=G,S.dataTransfer&&(S.dataTransfer.setData("text/plain",G),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function ht(S){S.target.classList.remove("board-card--dragging"),Et(),setTimeout(()=>{Ee=null},0)}function E(S){let G=String(S.target.value||"");!G||G===h||(h=G,u&&u(G),pt())}function ue(){return i?i.get():null}function Ce(S){let G=l?l.get():null,Re=G?G.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let $=Re[S];return!$||typeof $!="object"||Array.isArray($)?null:$}let Ue={onCardClick:At,onCopyId:xt,onDragStart:ft,onDragEnd:ht,onClosedRangeChange:E,rollupFor:ge,isExpanded:Ae,onRollupToggle:Ve,onChildClick:de,onFromChipClick:Me,onOpenDoc:m?(S,G)=>m(G):void 0,cleanupFailureFor:Ce,get policy(){return ue()}};function Je(S,G){Ee||(qe(),r(G))}function ot(S,G){S.preventDefault(),S.stopPropagation(),qe(),r(G)}let _t={...Ue,onCardClick:Je,onChildClick:ot,onFromChipClick:ot,onOpenDoc:m?(S,G)=>{qe(),m(G)}:void 0,get policy(){return ue()}};function gt(S){let G=S.target,Re=e.querySelector(".board-filter__labels");G&&Re&&Re.contains(G)||We()}function X(S){S.key==="Escape"&&We()}function te(){ie||(ie=!0,document.addEventListener("mousedown",gt),document.addEventListener("keydown",X),pt())}function We(){ie&&(ie=!1,document.removeEventListener("mousedown",gt),document.removeEventListener("keydown",X),pt())}function ze(S){S.key==="Escape"&&qe()}function De(){D||(D=!0,document.addEventListener("keydown",ze),pt())}function qe(){D&&(D=!1,document.removeEventListener("keydown",ze),pt())}let He={onClose:qe,onOverlayClick(S){S.target===S.currentTarget&&qe()}},dt={onSearchInput(S){_e.search=String(S.target.value||""),H()},onPriorityChange(S){_e.priority=String(S.target.value||""),H()},onTypeChange(S){_e.type=String(S.target.value||""),H()},onSortChange(S){let G=String(S.target.value||"");if(!(!eu.has(G)||G===L)){L=G;try{window.localStorage.setItem(Jc,G)}catch{}H()}},onDeferredToggle(){D?qe():De()},onLabelMenuToggle(){ie?We():te()},onLabelToggle(S){let G=_e.labels.indexOf(S);G===-1?_e.labels.push(S):_e.labels.splice(G,1),H()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],H())},onNewIssue(){d&&d()}};function ut(){return c`
      <div class="board-view">
        ${Xc(_e,dt,{sort_mode:L,deferred_popup_open:D,deferred_count:z,label_options:Z(),label_menu_open:ie})}
        <div class="board-root">
          ${qr({title:"Blocked",id:"blocked-col",items:ee(M)},Ue)}
          ${qr({title:"Ready",id:"ready-col",items:ee(B)},Ue)}
          ${qr({title:"In progress",id:"in-progress-col",items:ee(V)},Ue)}
          ${qr({title:"Resolved",id:"resolved-col",items:ee(ce)},Ue)}
          ${qr({title:"Closed",id:"closed-col",items:ee(j),is_closed:!0,closed_range:h},Ue)}
        </div>
        ${D?Qc({items:ee(U),count:z},_t,He):""}
      </div>
    `}function pt(){it(ut(),e),Ct()}function Ct(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of G)Array.from(Re.querySelectorAll(".board-card")).forEach((O,Q)=>{O.tabIndex=Q===0?0:-1})}catch{}}async function zt(S,G){if(!o){fe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:G}),fe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),fe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ot(S){switch(S){case"blocked-col":return M;case"ready-col":return B;case"in-progress-col":return V;case"resolved-col":return ce;default:return[]}}function Dt(S,G,Re){if(!o||!a)return;let $=Ot(S),O=$.find(W=>W.id===G);if(!O)return;let Q=$.filter(W=>W.id!==G),me=Re.closest?Re.closest(".board-card"):null,xe=Q.length;if(me){let W=me.getAttribute("data-issue-id");if(W===G)return;let le=Q.findIndex(Ke=>Ke.id===W);le>=0&&(xe=le)}let w=Q.slice();w.splice(xe,0,O),k.applyReorder(G,w,xe)}function Et(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let Xe=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Re=S.target.closest(".board-column");Re&&Re!==Xe&&(Xe&&Xe.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),Xe=Re)}),e.addEventListener("dragleave",S=>{let G=S.relatedTarget;(!G||!e.contains(G))&&Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null)}),e.addEventListener("drop",S=>{S.preventDefault(),Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null);let G=S.target,Re=G.closest(".board-column");if(!Re)return;let $=S.dataTransfer?.getData("text/plain")||"";if(!$)return;let O=Re.id,Q=ne.get($);if(Q&&Q===O){if(nm.has(O)){if(L!=="manual"){fe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Dt(O,$,G)}return}let me=tm[O];if(!me){fe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get($)!==me&&zt($,me)}),e.addEventListener("keydown",S=>{let G=S.target;if(!(G instanceof HTMLElement))return;let Re=String(G.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||G.isContentEditable===!0)return;let $=G.closest(".board-card");if(!$)return;let O=String(S.key||"");if(O==="Enter"||O===" "){S.preventDefault();let w=$.getAttribute("data-issue-id");w&&r(w);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;S.preventDefault();let Q=$.closest(".board-column");if(!Q)return;let me=Array.from(Q.querySelectorAll(".board-card")),xe=me.indexOf($);if(O==="ArrowDown"&&xe<me.length-1){Ne($,me[xe+1]);return}if(O==="ArrowUp"&&xe>0){Ne($,me[xe-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let w=Array.from(e.querySelectorAll(".board-column")),W=w.indexOf(Q),le=O==="ArrowRight"?1:-1,Ke=W+le;for(;Ke>=0&&Ke<w.length;){let Fe=w[Ke].querySelector(".board-card");if(Fe){Ne($,Fe);return}Ke+=le}}});function Ne(S,G){try{S.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{H()}catch{}}));let J=null;i&&i.subscribe&&(J=i.subscribe(()=>{try{H()}catch{}}));let he=null;return l&&l.subscribe&&(he=l.subscribe(()=>{pt()})),{async load(){n("load"),H()},clear(){We(),qe(),P&&(P(),P=null),J&&(J(),J=null),he&&(he(),he=null),e.replaceChildren(),M=[],B=[],V=[],ce=[],U=[],j=[],I=new Map,ne=new Map}}}function is(e,t){return e.filter(n=>{let r=ho(n);return!(r&&t.has(r))})}async function sm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function kn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function vr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ls(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function om(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${vr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${vr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Kn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await om(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var am=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],nu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},im=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function rn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gt(e){return typeof e=="string"&&e.length>0?e:null}function Fr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ft(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function su(e,t,n){let r=Gt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Gt(n[e]);return s===null?null:{value:s,source:"global"}}function cs(e,t,n,r){return su(e,t,n)||{value:r,source:"base"}}function ni(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&rn(s?.[t])){let a=Gt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&rn(s)){for(let a of Object.values(s))if(rn(a)){let i=Gt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Gt(r?.runners?.[o]?.models?.[e]?.id)||e}function lm(e,t){return Gt(t?.review?.reviewers?.[e]?.model)||e}function jr(e,t,n=!1){if(e==="default")return Ft(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Fr(e):e;return Ft(e,t,r,e,"explicit")}function ou(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];rn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(rn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function cm(e,t){let n=[],r=e?.implementation?.model_catalog;rn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(rn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function um(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of cm(t,n)){let o=ou(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ri(e){return Ft(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function ru(e,t,n){let r=su(e,t,n);return r?jr(r.value,r.source):Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function hn(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&rn(r.session)?r.session:null,o=r?.supported===!0&&rn(r.orchestration)?r.orchestration:null,a=rn(e.runner_catalog)?e.runner_catalog:null,i=Gt(n.quick_fix_impl_model),l=um(i,s,a),u={};if(s){let d=cs("workflow_mode",t,n,Gt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ft(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):jr(d.value,d.source);for(let U of["spec_review","plan_review","impl_review"]){let j=`${U}_model`,D=Gt(U==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),z=cs(j,t,n,D);if(z.value===null)u[j]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(z.value!=="self"&&z.value!=="skip"&&!rn(s.review?.reviewers?.[z.value]))u[j]=ri(Ft(z.value,z.source,"",null,"explicit"));else{let L=lm(z.value,s);u[j]=Ft(z.value,z.source,Fr(L),L,z.source==="base"?"default":"explicit")}}for(let[U,j]of Object.entries(nu)){let D=u[j].value;if(D==="self"||D==="skip"){u[U]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let z=Gt(s.review?.reviewers?.[D||""]?.effort),L=cs(U,t,n,z);u[U]=L.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let m=rn(s.implementation?.default)?s.implementation.default:{},h=Gt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=rn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=b&&rn(k[h])?k[h]:{};for(let U of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=cs(U,t,n,U==="impl_dispatch"?Gt(M.dispatch)||Gt(m.dispatch):Gt(m[U.replace("impl_","")]));u[U]=j.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let B=Gt(t.impl_runtime),V=B==="inherit"?Gt(e.controller_runtime):B,ce=h==="quick_fix"&&Gt(t.impl_dispatch)===null&&l.runtime!==null&&(B===null||V===l.runtime);if(ce){let U=l.runtime,j=i;u.impl_dispatch=Ft("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Ft(U,"global",`${U} (\uC720\uB3C4)`,U,"explicit")),Gt(t.impl_model)===null&&(u.impl_model=Ft(j,"global",j,j,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let U of["impl_runtime","impl_model","impl_effort","impl_speed"])u[U]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ce&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let U=u.impl_runtime.value==="inherit"?Gt(e.controller_runtime):u.impl_runtime.value,j=U?ou(U,s,a):[];if(u.impl_model.value!=="auto"&&j.length>0&&!j.includes(u.impl_model.value))u.impl_model=ri(u.impl_model);else{let D=ni(u.impl_model.value,U,s,a);u.impl_model.display=Fr(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let U=Gt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=U?Gt(s.implementation?.effort_by_transport?.[U]?.auto):null;j&&!im.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):jr("default",u.impl_speed.source))}}else for(let d of am.filter(m=>!m.startsWith("orchestration_")))u[d]=ru(d,t,n);if(!s){for(let[d,m]of Object.entries(nu))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=ru(d,t,n);continue}let m=d.replace("orchestration_",""),h=Gt(o[m]),b=cs(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Ft(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Gt(o.model_id)||b.value:ni(b.value,null,s,a);u[d]=Ft(b.value,b.source,Fr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):jr("default",b.source);continue}u[d]=jr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ft(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Fr(d)})`,null,"default")}else if(l.runtime!==null){let d=ni(i,l.runtime,s,a);u.quick_fix_impl_model=Ft(i,"global",Fr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=ri(Ft(i,"global","",null,"explicit")):u.quick_fix_impl_model=jr(i,"global");return u}function dm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Co(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let h={...r,...m};return hn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Gt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:dm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let h=s({...o,[e.key]:m})[e.key];return{value:m,label:h.display,full_value:h.full_value}})}}function Br(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(m))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function si(e){return`session:${e.provider}:${e.session_id}`}function us(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function pm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Ro(e,t,n,r){return{attempt_id:si(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:us(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:pm(e,n)}}}var oi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",au="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Wn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Ur=[...Wn,"reasoning_output_tokens"],_m={codex:["implementation","review-consult"],claude:["subagent"]};function ai(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Wn.some(t=>Number.isFinite(e[t]))}function mm(e){return!e||typeof e!="object"?!1:Ur.some(t=>Number.isFinite(e[t]))}function ii(e){let t=0;for(let n of Wn)t+=Xt(e?.[n]);return t}function gm(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function iu(e){return!e||typeof e!="object"?!1:Ur.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function bm(e){let t={};for(let n of Ur)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function lu(e){let t={};for(let n of Ur)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function cu(e,t){return ai(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):ii(t)}function hm(e){return e==="claude"?"Claude":"Codex"}function ym(e){return`\u03C4 ${du(e)}`}function vm(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(ai(n)||r>0&&!mm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,fm];return t.replayed&&u.push(oi),u.join(`
`)}let s=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${au} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${au}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(oi),l.join(`
`)}function cn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${hm(n)} ${ym(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:vm(n,r)})}return t}function Lo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Xt(i.total_only_subtotal)+Xt(a.total_only_subtotal));for(let l of Ur)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Xt(i.breakdown[l])+Xt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function li(e){return!e||typeof e!="object"?null:En({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function wm(e){return e==="codex"?"codex":"claude"}function Un(){return{subtotal:0,breakdown:bm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Oo(e,t,n){e.subtotal+=t.subtotal,ai(t.usage)&&(e.total_only+=t.subtotal);for(let r of Ur)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function uu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function du(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Wr(e){return gm(e)?`\u03C4 ${du(ii(e))}`:null}function Vn(e){let t=Wr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ds(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ii(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(oi),n.join(`
`)}function En(e,t){let n={claude:Un(),codex:Un()},r={orchestrator:{claude:Un(),codex:Un()},implementation:{claude:Un(),codex:Un()},"review-consult":{claude:Un(),codex:Un()},subagent:{claude:Un(),codex:Un()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(iu(l)){let d=wm(i.runner),m=lu(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:cu(d,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Oo(n[d],h,!0),Oo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!_m[m].includes(d.role)||!iu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=lu(d.usage),k={provider:m,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:cu(m,b)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),Oo(n[m],k,!1),Oo(r[k.role][m],k,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=uu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...uu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:vu,setPrototypeOf:pu,isFrozen:km,getPrototypeOf:$m,getOwnPropertyDescriptor:xm}=Object,{freeze:fn,seal:Tn,create:mi}=Object,{apply:gi,construct:bi}=typeof Reflect<"u"&&Reflect;fn||(fn=function(t){return t});Tn||(Tn=function(t){return t});gi||(gi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});bi||(bi=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Io=_n(Array.prototype.forEach),Am=_n(Array.prototype.lastIndexOf),fu=_n(Array.prototype.pop),ps=_n(Array.prototype.push),Sm=_n(Array.prototype.splice),Mo=_n(String.prototype.toLowerCase),ci=_n(String.prototype.toString),ui=_n(String.prototype.match),fs=_n(String.prototype.replace),Em=_n(String.prototype.indexOf),Tm=_n(String.prototype.trim),In=_n(Object.prototype.hasOwnProperty),pn=_n(RegExp.prototype.test),_s=Cm(TypeError);function _n(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return gi(e,t,r)}}function Cm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return bi(e,n)}}function vt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mo;pu&&pu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(km(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Rm(e){for(let t=0;t<e.length;t++)In(e,t)||(e[t]=null);return e}function Yn(e){let t=mi(null);for(let[n,r]of vu(e))In(e,n)&&(Array.isArray(r)?t[n]=Rm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Yn(r):t[n]=r);return t}function ms(e,t){for(;e!==null;){let r=xm(e,t);if(r){if(r.get)return _n(r.get);if(typeof r.value=="function")return _n(r.value)}e=$m(e)}function n(){return null}return n}var _u=fn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),di=fn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pi=fn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Om=fn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),fi=fn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Lm=fn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),mu=fn(["#text"]),gu=fn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_i=fn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),bu=fn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Po=fn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Im=Tn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Pm=Tn(/<%[\w\W]*|[\w\W]*%>/gm),Mm=Tn(/\$\{[\w\W]*/gm),Dm=Tn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Nm=Tn(/^aria-[\-\w]+$/),wu=Tn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),qm=Tn(/^(?:\w+script|data):/i),Fm=Tn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ku=Tn(/^html$/i),jm=Tn(/^[a-z][.\w]*(-[.\w]+)+$/i),hu=Object.freeze({__proto__:null,ARIA_ATTR:Nm,ATTR_WHITESPACE:Fm,CUSTOM_ELEMENT:jm,DATA_ATTR:Dm,DOCTYPE_NAME:ku,ERB_EXPR:Pm,IS_ALLOWED_URI:wu,IS_SCRIPT_OR_DATA:qm,MUSTACHE_EXPR:Im,TMPLIT_EXPR:Mm}),gs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Bm=function(){return typeof window>"u"?null:window},Um=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $u(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bm(),t=Pe=>$u(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==gs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:b}=e,k=l.prototype,M=ms(k,"cloneNode"),B=ms(k,"remove"),V=ms(k,"nextSibling"),ce=ms(k,"childNodes"),U=ms(k,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let j,D="",{implementation:z,createNodeIterator:L,createDocumentFragment:I,getElementsByTagName:ne}=n,{importNode:ke}=r,we=yu();t.isSupported=typeof vu=="function"&&typeof U=="function"&&z&&z.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:ie,TMPLIT_EXPR:Ee,DATA_ATTR:Le,ARIA_ATTR:$e,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:Se}=hu,{IS_ALLOWED_URI:H}=hu,oe=null,ge=vt({},[..._u,...di,...pi,...fi,...mu]),Ae=null,Ve=vt({},[...gu,..._i,...bu,...Po]),de=Object.seal(mi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,At=null,xt=Object.seal(mi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ft=!0,ht=!0,E=!1,ue=!0,Ce=!1,Ue=!0,Je=!1,ot=!1,_t=!1,gt=!1,X=!1,te=!1,We=!0,ze=!1,De="user-content-",qe=!0,He=!1,dt={},ut=null,pt=vt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ct=null,zt=vt({},["audio","video","img","source","image","track"]),Ot=null,Dt=vt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Et="http://www.w3.org/1998/Math/MathML",Xe="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml",P=Ne,J=!1,he=null,S=vt({},[Et,Xe,Ne],ci),G=vt({},["mi","mo","mn","ms","mtext"]),Re=vt({},["annotation-xml"]),$=vt({},["title","style","font","a","script"]),O=null,Q=["application/xhtml+xml","text/html"],me="text/html",xe=null,w=null,W=n.createElement("form"),le=function(C){return C instanceof RegExp||C instanceof Function},Ke=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(w&&w===C)){if((!C||typeof C!="object")&&(C={}),C=Yn(C),O=Q.indexOf(C.PARSER_MEDIA_TYPE)===-1?me:C.PARSER_MEDIA_TYPE,xe=O==="application/xhtml+xml"?ci:Mo,oe=In(C,"ALLOWED_TAGS")?vt({},C.ALLOWED_TAGS,xe):ge,Ae=In(C,"ALLOWED_ATTR")?vt({},C.ALLOWED_ATTR,xe):Ve,he=In(C,"ALLOWED_NAMESPACES")?vt({},C.ALLOWED_NAMESPACES,ci):S,Ot=In(C,"ADD_URI_SAFE_ATTR")?vt(Yn(Dt),C.ADD_URI_SAFE_ATTR,xe):Dt,Ct=In(C,"ADD_DATA_URI_TAGS")?vt(Yn(zt),C.ADD_DATA_URI_TAGS,xe):zt,ut=In(C,"FORBID_CONTENTS")?vt({},C.FORBID_CONTENTS,xe):pt,Me=In(C,"FORBID_TAGS")?vt({},C.FORBID_TAGS,xe):Yn({}),At=In(C,"FORBID_ATTR")?vt({},C.FORBID_ATTR,xe):Yn({}),dt=In(C,"USE_PROFILES")?C.USE_PROFILES:!1,ft=C.ALLOW_ARIA_ATTR!==!1,ht=C.ALLOW_DATA_ATTR!==!1,E=C.ALLOW_UNKNOWN_PROTOCOLS||!1,ue=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=C.SAFE_FOR_TEMPLATES||!1,Ue=C.SAFE_FOR_XML!==!1,Je=C.WHOLE_DOCUMENT||!1,gt=C.RETURN_DOM||!1,X=C.RETURN_DOM_FRAGMENT||!1,te=C.RETURN_TRUSTED_TYPE||!1,_t=C.FORCE_BODY||!1,We=C.SANITIZE_DOM!==!1,ze=C.SANITIZE_NAMED_PROPS||!1,qe=C.KEEP_CONTENT!==!1,He=C.IN_PLACE||!1,H=C.ALLOWED_URI_REGEXP||wu,P=C.NAMESPACE||Ne,G=C.MATHML_TEXT_INTEGRATION_POINTS||G,Re=C.HTML_INTEGRATION_POINTS||Re,de=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&le(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&le(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(ht=!1),X&&(gt=!0),dt&&(oe=vt({},mu),Ae=[],dt.html===!0&&(vt(oe,_u),vt(Ae,gu)),dt.svg===!0&&(vt(oe,di),vt(Ae,_i),vt(Ae,Po)),dt.svgFilters===!0&&(vt(oe,pi),vt(Ae,_i),vt(Ae,Po)),dt.mathMl===!0&&(vt(oe,fi),vt(Ae,bu),vt(Ae,Po))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?xt.tagCheck=C.ADD_TAGS:(oe===ge&&(oe=Yn(oe)),vt(oe,C.ADD_TAGS,xe))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?xt.attributeCheck=C.ADD_ATTR:(Ae===Ve&&(Ae=Yn(Ae)),vt(Ae,C.ADD_ATTR,xe))),C.ADD_URI_SAFE_ATTR&&vt(Ot,C.ADD_URI_SAFE_ATTR,xe),C.FORBID_CONTENTS&&(ut===pt&&(ut=Yn(ut)),vt(ut,C.FORBID_CONTENTS,xe)),qe&&(oe["#text"]=!0),Je&&vt(oe,["html","head","body"]),oe.table&&(vt(oe,["tbody"]),delete Me.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw _s('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw _s('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=C.TRUSTED_TYPES_POLICY,D=j.createHTML("")}else j===void 0&&(j=Um(b,s)),j!==null&&typeof D=="string"&&(D=j.createHTML(""));fn&&fn(C),w=C}},Fe=vt({},[...di,...pi,...Om]),ye=vt({},[...fi,...Lm]),Tt=function(C){let ve=U(C);(!ve||!ve.tagName)&&(ve={namespaceURI:P,tagName:"template"});let Be=Mo(C.tagName),wt=Mo(ve.tagName);return he[C.namespaceURI]?C.namespaceURI===Xe?ve.namespaceURI===Ne?Be==="svg":ve.namespaceURI===Et?Be==="svg"&&(wt==="annotation-xml"||G[wt]):!!Fe[Be]:C.namespaceURI===Et?ve.namespaceURI===Ne?Be==="math":ve.namespaceURI===Xe?Be==="math"&&Re[wt]:!!ye[Be]:C.namespaceURI===Ne?ve.namespaceURI===Xe&&!Re[wt]||ve.namespaceURI===Et&&!G[wt]?!1:!ye[Be]&&($[Be]||!Fe[Be]):!!(O==="application/xhtml+xml"&&he[C.namespaceURI]):!1},bt=function(C){ps(t.removed,{element:C});try{U(C).removeChild(C)}catch{B(C)}},mt=function(C,ve){try{ps(t.removed,{attribute:ve.getAttributeNode(C),from:ve})}catch{ps(t.removed,{attribute:null,from:ve})}if(ve.removeAttribute(C),C==="is")if(gt||X)try{bt(ve)}catch{}else try{ve.setAttribute(C,"")}catch{}},Yt=function(C){let ve=null,Be=null;if(_t)C="<remove></remove>"+C;else{let kt=ui(C,/^[\r\n\t ]+/);Be=kt&&kt[0]}O==="application/xhtml+xml"&&P===Ne&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let wt=j?j.createHTML(C):C;if(P===Ne)try{ve=new h().parseFromString(wt,O)}catch{}if(!ve||!ve.documentElement){ve=z.createDocument(P,"template",null);try{ve.documentElement.innerHTML=J?D:wt}catch{}}let Nt=ve.body||ve.documentElement;return C&&Be&&Nt.insertBefore(n.createTextNode(Be),Nt.childNodes[0]||null),P===Ne?ne.call(ve,Je?"html":"body")[0]:Je?ve.documentElement:Nt},Pt=function(C){return L.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},dn=function(C){return C instanceof m&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},en=function(C){return typeof i=="function"&&C instanceof i};function tn(Pe,C,ve){Io(Pe,Be=>{Be.call(t,C,ve,w)})}let Zt=function(C){let ve=null;if(tn(we.beforeSanitizeElements,C,null),dn(C))return bt(C),!0;let Be=xe(C.nodeName);if(tn(we.uponSanitizeElement,C,{tagName:Be,allowedTags:oe}),Ue&&C.hasChildNodes()&&!en(C.firstElementChild)&&pn(/<[/\w!]/g,C.innerHTML)&&pn(/<[/\w!]/g,C.textContent)||C.nodeType===gs.progressingInstruction||Ue&&C.nodeType===gs.comment&&pn(/<[/\w]/g,C.data))return bt(C),!0;if(!(xt.tagCheck instanceof Function&&xt.tagCheck(Be))&&(!oe[Be]||Me[Be])){if(!Me[Be]&&sn(Be)&&(de.tagNameCheck instanceof RegExp&&pn(de.tagNameCheck,Be)||de.tagNameCheck instanceof Function&&de.tagNameCheck(Be)))return!1;if(qe&&!ut[Be]){let wt=U(C)||C.parentNode,Nt=ce(C)||C.childNodes;if(Nt&&wt){let kt=Nt.length;for(let qt=kt-1;qt>=0;--qt){let Qt=M(Nt[qt],!0);Qt.__removalCount=(C.__removalCount||0)+1,wt.insertBefore(Qt,V(C))}}}return bt(C),!0}return C instanceof l&&!Tt(C)||(Be==="noscript"||Be==="noembed"||Be==="noframes")&&pn(/<\/no(script|embed|frames)/i,C.innerHTML)?(bt(C),!0):(Ce&&C.nodeType===gs.text&&(ve=C.textContent,Io([_e,ie,Ee],wt=>{ve=fs(ve,wt," ")}),C.textContent!==ve&&(ps(t.removed,{element:C.cloneNode()}),C.textContent=ve)),tn(we.afterSanitizeElements,C,null),!1)},Ze=function(C,ve,Be){if(We&&(ve==="id"||ve==="name")&&(Be in n||Be in W))return!1;if(!(ht&&!At[ve]&&pn(Le,ve))){if(!(ft&&pn($e,ve))){if(!(xt.attributeCheck instanceof Function&&xt.attributeCheck(ve,C))){if(!Ae[ve]||At[ve]){if(!(sn(C)&&(de.tagNameCheck instanceof RegExp&&pn(de.tagNameCheck,C)||de.tagNameCheck instanceof Function&&de.tagNameCheck(C))&&(de.attributeNameCheck instanceof RegExp&&pn(de.attributeNameCheck,ve)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(ve,C))||ve==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&pn(de.tagNameCheck,Be)||de.tagNameCheck instanceof Function&&de.tagNameCheck(Be))))return!1}else if(!Ot[ve]){if(!pn(H,fs(Be,Z,""))){if(!((ve==="src"||ve==="xlink:href"||ve==="href")&&C!=="script"&&Em(Be,"data:")===0&&Ct[C])){if(!(E&&!pn(ee,fs(Be,Z,"")))){if(Be)return!1}}}}}}}return!0},sn=function(C){return C!=="annotation-xml"&&ui(C,Se)},on=function(C){tn(we.beforeSanitizeAttributes,C,null);let{attributes:ve}=C;if(!ve||dn(C))return;let Be={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},wt=ve.length;for(;wt--;){let Nt=ve[wt],{name:kt,namespaceURI:qt,value:Qt}=Nt,an=xe(kt),vn=Qt,Bt=kt==="value"?vn:Tm(vn);if(Be.attrName=an,Be.attrValue=Bt,Be.keepAttr=!0,Be.forceKeepAttr=void 0,tn(we.uponSanitizeAttribute,C,Be),Bt=Be.attrValue,ze&&(an==="id"||an==="name")&&(mt(kt,C),Bt=De+Bt),Ue&&pn(/((--!?|])>)|<\/(style|title|textarea)/i,Bt)){mt(kt,C);continue}if(an==="attributename"&&ui(Bt,"href")){mt(kt,C);continue}if(Be.forceKeepAttr)continue;if(!Be.keepAttr){mt(kt,C);continue}if(!ue&&pn(/\/>/i,Bt)){mt(kt,C);continue}Ce&&Io([_e,ie,Ee],An=>{Bt=fs(Bt,An," ")});let wn=xe(C.nodeName);if(!Ze(wn,an,Bt)){mt(kt,C);continue}if(j&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!qt)switch(b.getAttributeType(wn,an)){case"TrustedHTML":{Bt=j.createHTML(Bt);break}case"TrustedScriptURL":{Bt=j.createScriptURL(Bt);break}}if(Bt!==vn)try{qt?C.setAttributeNS(qt,kt,Bt):C.setAttribute(kt,Bt),dn(C)?bt(C):fu(t.removed)}catch{mt(kt,C)}}tn(we.afterSanitizeAttributes,C,null)},st=function Pe(C){let ve=null,Be=Pt(C);for(tn(we.beforeSanitizeShadowDOM,C,null);ve=Be.nextNode();)tn(we.uponSanitizeShadowNode,ve,null),Zt(ve),on(ve),ve.content instanceof o&&Pe(ve.content);tn(we.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Pe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ve=null,Be=null,wt=null,Nt=null;if(J=!Pe,J&&(Pe="<!-->"),typeof Pe!="string"&&!en(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw _s("dirty is not a string, aborting")}else throw _s("toString is not a function");if(!t.isSupported)return Pe;if(ot||Ke(C),t.removed=[],typeof Pe=="string"&&(He=!1),He){if(Pe.nodeName){let Qt=xe(Pe.nodeName);if(!oe[Qt]||Me[Qt])throw _s("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)ve=Yt("<!---->"),Be=ve.ownerDocument.importNode(Pe,!0),Be.nodeType===gs.element&&Be.nodeName==="BODY"||Be.nodeName==="HTML"?ve=Be:ve.appendChild(Be);else{if(!gt&&!Ce&&!Je&&Pe.indexOf("<")===-1)return j&&te?j.createHTML(Pe):Pe;if(ve=Yt(Pe),!ve)return gt?null:te?D:""}ve&&_t&&bt(ve.firstChild);let kt=Pt(He?Pe:ve);for(;wt=kt.nextNode();)Zt(wt),on(wt),wt.content instanceof o&&st(wt.content);if(He)return Pe;if(gt){if(X)for(Nt=I.call(ve.ownerDocument);ve.firstChild;)Nt.appendChild(ve.firstChild);else Nt=ve;return(Ae.shadowroot||Ae.shadowrootmode)&&(Nt=ke.call(r,Nt,!0)),Nt}let qt=Je?ve.outerHTML:ve.innerHTML;return Je&&oe["!doctype"]&&ve.ownerDocument&&ve.ownerDocument.doctype&&ve.ownerDocument.doctype.name&&pn(ku,ve.ownerDocument.doctype.name)&&(qt="<!DOCTYPE "+ve.ownerDocument.doctype.name+`>
`+qt),Ce&&Io([_e,ie,Ee],Qt=>{qt=fs(qt,Qt," ")}),j&&te?j.createHTML(qt):qt},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(Pe),ot=!0},t.clearConfig=function(){w=null,ot=!1},t.isValidAttribute=function(Pe,C,ve){w||Ke({});let Be=xe(Pe),wt=xe(C);return Ze(Be,wt,ve)},t.addHook=function(Pe,C){typeof C=="function"&&ps(we[Pe],C)},t.removeHook=function(Pe,C){if(C!==void 0){let ve=Am(we[Pe],C);return ve===-1?void 0:Sm(we[Pe],ve,1)[0]}return fu(we[Pe])},t.removeHooks=function(Pe){we[Pe]=[]},t.removeAllHooks=function(){we=yu()},t}var xu=$u();var Zn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Do=e=>(...t)=>({_$litDirective$:e,values:t}),zr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var bs=class extends zr{constructor(t){if(super(t),this.it=Vt,t.type!==Zn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Vt||t==null)return this._t=void 0,this.it=t;if(t===Sn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};bs.directiveName="unsafeHTML",bs.resultType=1;var Au=Do(bs);function wi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kr=wi();function Lu(e){kr=e}var ws={exec:()=>null};function St(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(mn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Wm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),mn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},zm=/^(?:[ \t]*(?:\n|$))+/,Hm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ks=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Km=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ki=/(?:[*+-]|\d{1,9}[.)])/,Iu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pu=St(Iu).replace(/bull/g,ki).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vm=St(Iu).replace(/bull/g,ki).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$i=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ym=/^[^\n]+/,xi=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Zm=St(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Qm=St(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ki).getRegex(),Uo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ai=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Xm=St("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ai).replace("tag",Uo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mu=St($i).replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Uo).getRegex(),Jm=St(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mu).getRegex(),Si={blockquote:Jm,code:Hm,def:Zm,fences:Gm,heading:Km,hr:ks,html:Xm,lheading:Pu,list:Qm,newline:zm,paragraph:Mu,table:ws,text:Ym},Su=St("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Uo).getRegex(),eg={...Si,lheading:Vm,table:Su,paragraph:St($i).replace("hr",ks).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Su).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Uo).getRegex()},tg={...Si,html:St(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ai).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ws,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:St($i).replace("hr",ks).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ng=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Du=/^( {2,}|\\)\n(?!\s*$)/,sg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wo=/[\p{P}\p{S}]/u,Ei=/[\s\p{P}\p{S}]/u,Nu=/[^\s\p{P}\p{S}]/u,og=St(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ei).getRegex(),qu=/(?!~)[\p{P}\p{S}]/u,ag=/(?!~)[\s\p{P}\p{S}]/u,ig=/(?:[^\s\p{P}\p{S}]|~)/u,lg=St(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Wm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Fu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cg=St(Fu,"u").replace(/punct/g,Wo).getRegex(),ug=St(Fu,"u").replace(/punct/g,qu).getRegex(),ju="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",dg=St(ju,"gu").replace(/notPunctSpace/g,Nu).replace(/punctSpace/g,Ei).replace(/punct/g,Wo).getRegex(),pg=St(ju,"gu").replace(/notPunctSpace/g,ig).replace(/punctSpace/g,ag).replace(/punct/g,qu).getRegex(),fg=St("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nu).replace(/punctSpace/g,Ei).replace(/punct/g,Wo).getRegex(),_g=St(/\\(punct)/,"gu").replace(/punct/g,Wo).getRegex(),mg=St(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gg=St(Ai).replace("(?:-->|$)","-->").getRegex(),bg=St("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Fo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,hg=St(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Fo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bu=St(/^!?\[(label)\]\[(ref)\]/).replace("label",Fo).replace("ref",xi).getRegex(),Uu=St(/^!?\[(ref)\](?:\[\])?/).replace("ref",xi).getRegex(),yg=St("reflink|nolink(?!\\()","g").replace("reflink",Bu).replace("nolink",Uu).getRegex(),Eu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ti={_backpedal:ws,anyPunctuation:_g,autolink:mg,blockSkip:lg,br:Du,code:rg,del:ws,emStrongLDelim:cg,emStrongRDelimAst:dg,emStrongRDelimUnd:fg,escape:ng,link:hg,nolink:Uu,punctuation:og,reflink:Bu,reflinkSearch:yg,tag:bg,text:sg,url:ws},vg={...Ti,link:St(/^!?\[(label)\]\((.*?)\)/).replace("label",Fo).getRegex(),reflink:St(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Fo).getRegex()},hi={...Ti,emStrongRDelimAst:pg,emStrongLDelim:ug,url:St(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Eu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:St(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Eu).getRegex()},wg={...hi,br:St(Du).replace("{2,}","*").getRegex(),text:St(hi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},No={normal:Si,gfm:eg,pedantic:tg},hs={normal:Ti,gfm:hi,breaks:wg,pedantic:vg},kg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Tu=e=>kg[e];function Qn(e,t){if(t){if(mn.escapeTest.test(e))return e.replace(mn.escapeReplace,Tu)}else if(mn.escapeTestNoEncode.test(e))return e.replace(mn.escapeReplaceNoEncode,Tu);return e}function Cu(e){try{e=encodeURI(e).replace(mn.percentDecode,"%")}catch{return null}return e}function Ru(e,t){let n=e.replace(mn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(mn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(mn.slashPipe,"|");return r}function ys(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function $g(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Ou(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function xg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var jo=class{constructor(e){Mt(this,"options");Mt(this,"rules");Mt(this,"lexer");this.options=e||kr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ys(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=xg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ys(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ys(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ys(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=m,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),M=this.blockquote(k);o[o.length-1]=M,r=r.substring(0,r.length-b.raw.length)+M.raw,s=s.substring(0,s.length-b.text.length)+M.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),M=this.list(k);o[o.length-1]=M,r=r.substring(0,r.length-h.raw.length)+M.raw,s=s.substring(0,s.length-b.raw.length)+M.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),h=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let M=this.rules.other.nextBulletRegex(k),B=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),ce=this.rules.other.headingBeginRegex(k),U=this.rules.other.htmlBeginRegex(k);for(;e;){let j=e.split(`
`,1)[0],D;if(h=j,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||ce.test(h)||U.test(h)||M.test(h)||B.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+D.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(m)||ce.test(m)||B.test(m))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=j+`
`,e=e.substring(j.length+1),m=D.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ru(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ru(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ys(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=$g(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ou(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Ou(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,m=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pn=class yi{constructor(t){Mt(this,"tokens");Mt(this,"options");Mt(this,"state");Mt(this,"inlineQueue");Mt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kr,this.options.tokenizer=this.options.tokenizer||new jo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:mn,block:No.normal,inline:hs.normal};this.options.pedantic?(n.block=No.pedantic,n.inline=hs.pedantic):this.options.gfm&&(n.block=No.gfm,this.options.breaks?n.inline=hs.breaks:n.inline=hs.gfm),this.tokenizer.rules=n}static get rules(){return{block:No,inline:hs}}static lex(t,n){return new yi(n).lex(t)}static lexInline(t,n){return new yi(n).inlineTokens(t)}lex(t){t=t.replace(mn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(mn.tabCharGlobal,"    ").replace(mn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},m),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Bo=class{constructor(e){Mt(this,"options");Mt(this,"parser");this.options=e||kr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(mn.notSpaceStart)?.[0],s=e.replace(mn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Qn(r)+'">'+(n?s:Qn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Qn(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Cu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Qn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Cu(e);if(s===null)return Qn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Qn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},Ci=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Mn=class vi{constructor(t){Mt(this,"options");Mt(this,"renderer");Mt(this,"textRenderer");this.options=t||kr,this.options.renderer=this.options.renderer||new Bo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ci}static parse(t,n){return new vi(n).parse(t)}static parseInline(t,n){return new vi(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},qo,vs=(qo=class{constructor(e){Mt(this,"options");Mt(this,"block");this.options=e||kr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pn.lex:Pn.lexInline}provideParser(){return this.block?Mn.parse:Mn.parseInline}},Mt(qo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Mt(qo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),qo),Ag=class{constructor(...e){Mt(this,"defaults",wi());Mt(this,"options",this.setOptions);Mt(this,"parse",this.parseMarkdown(!0));Mt(this,"parseInline",this.parseMarkdown(!1));Mt(this,"Parser",Mn);Mt(this,"Renderer",Bo);Mt(this,"TextRenderer",Ci);Mt(this,"Lexer",Pn);Mt(this,"Tokenizer",jo);Mt(this,"Hooks",vs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Bo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new jo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new vs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];vs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&vs.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return l.call(s,m)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pn.lex(e,t??this.defaults)}parser(e,t){return Mn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Mn.parse:Mn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Mn.parse:Mn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},wr=new Ag;function Rt(e,t){return wr.parse(e,t)}Rt.options=Rt.setOptions=function(e){return wr.setOptions(e),Rt.defaults=wr.defaults,Lu(Rt.defaults),Rt};Rt.getDefaults=wi;Rt.defaults=kr;Rt.use=function(...e){return wr.use(...e),Rt.defaults=wr.defaults,Lu(Rt.defaults),Rt};Rt.walkTokens=function(e,t){return wr.walkTokens(e,t)};Rt.parseInline=wr.parseInline;Rt.Parser=Mn;Rt.parser=Mn.parse;Rt.Renderer=Bo;Rt.TextRenderer=Ci;Rt.Lexer=Pn;Rt.lexer=Pn.lex;Rt.Tokenizer=jo;Rt.Hooks=vs;Rt.parse=Rt;var dk=Rt.options,pk=Rt.setOptions,fk=Rt.use,_k=Rt.walkTokens,mk=Rt.parseInline;var gk=Mn.parse,bk=Pn.lex;function sr(e){let t=Rt.parse(e),n=xu.sanitize(t);return Au(n)}function Xn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Hr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var zu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Sg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Eg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Tg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Dn(e){return!!e&&typeof e=="object"}function Ri(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Oi(e,t){let n=Ri(e),r=Ri(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Hu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Dn(s)&&typeof s.text=="string"?s.text:"").join(""):Dn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Cg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:zu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ri(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Oi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Oi(Dn(i)?i.old_string:"",Dn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Li(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Rg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Gu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Dn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Rg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ii(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Eg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Tg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Og(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Lg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Dn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Ii(a.text));else if(a.type==="thinking"){let i=Li(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Cg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Wu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Dn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=Hu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Gu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Wu([s],n):[s]}return[]}function Wu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Ig(e){let t=typeof e.command=="string"?e.command:"",n=Hu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:zu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Pg(e){if(e.type==="item.completed"&&Dn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ii(t.text)];if(t.type==="user_message"){let n=Gu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Li(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Ig(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Mg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Dn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Dn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ii(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Li(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Sg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Dg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ng(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Dn(t)?t:null}function Ku(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Ng(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Og(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Mg(o):Dg(o)?Pg(o):Lg(o,n);return a.length>0&&(r.progress=null),a}}}function Pi(e){let t=[],n=Ku(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var qg=5,Fg=10,jg=/Task\s+#(\d+)/,Bg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ug=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function $s(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Wg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function zg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Hg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=jg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Gg(e){if(e.tool==="Bash"){let t=e.command||"";return Bg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ug.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Kg(e){let t=e.filter(s=>s.kind==="tool").slice(-Fg),n=new Map;t.forEach((s,o)=>{let a=Gg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Vg(e){let t=zg(e);if(t)return{text:t,guess:!1};let n=Hg(e);if(n)return{text:n,guess:!1};let r=Kg(e);return r?{text:r,guess:!0}:null}function Yg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:bn(e,t)}function Gr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,m={},h=!0,b=new Set,k=new Set,M=null,B=null,V=!1,ce=!1,U=!1,j=null,D=null;function z(){V=!1,ce=!1,U=!1,j=null,D=null}async function L(X){if(n){ce=!0,U=!1,Me();try{let te=await Promise.resolve(n("get-attempt-prompt",{attempt_id:X,...u?{root_dir:u}:{}}));if(o!==X)return;!te||typeof te!="object"||Array.isArray(te)?U=!0:(j=te,D=X)}catch{o===X&&(U=!0)}finally{o===X&&(ce=!1,Me())}}}function I(){if(V=!V,V&&o&&D!==o){L(o);return}Me()}function ne(){if(!V)return"";let X=Hr({loading:ce,error:U});if(X)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${X}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let te=zo(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${te?c`<div class="prompt-block__meta">${te} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function ke(){if(!l||!r)return[];let X=r.get(l);return Pi(X?X.lines:[])}function we(){if(!l||!r)return null;let X=r.get(l),te=X?X.last_event_at:null;return typeof te=="number"?te:null}function _e(){return m.status==="running"}function ie(){if(_e()&&o){B||(B=setInterval(()=>Me(),1e3));return}Ee()}function Ee(){B&&(clearInterval(B),B=null)}function Le(X){let te=[],We=0;for(;We<X.length;){let{idx:ze,line:De}=X[We];if(De.kind==="tool"){let qe=We;for(;qe<X.length&&X[qe].line.kind==="tool"&&X[qe].line.tool===De.tool;)qe+=1;if(qe-We>=qg&&!k.has(ze)){te.push({kind:"group",idx:ze,tool:De.tool||"",lines:X.slice(We,qe)}),We=qe;continue}}te.push({kind:"line",idx:ze,line:De}),We+=1}return te}function $e(X){let te=[],We=new Map;for(let qe=0;qe<X.length;qe+=1){let He=X[qe],dt=He.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let ut=We.get(dt);ut||(ut={kind:"subagent",idx:qe,launch_id:dt,agent_type:null,header:null,lines:[]},We.set(dt,ut),te.push(ut)),ut.lines.push({idx:qe,line:He});continue}if(He.kind==="tool"&&He.tool==="Agent"&&typeof He.launch_id=="string"&&He.launch_id.length>0){let ut=ee(He),pt=We.get(He.launch_id);if(pt){pt.header={idx:qe,line:He},pt.agent_type=ut;continue}let Ct={kind:"subagent",idx:qe,launch_id:He.launch_id,agent_type:ut,header:{idx:qe,line:He},lines:[]};We.set(He.launch_id,Ct),te.push(Ct);continue}te.push({kind:"entry",idx:qe,line:He})}let ze=[],De=0;for(;De<te.length;){if(te[De].kind!=="entry"){ze.push(te[De]),De+=1;continue}let qe=De;for(;qe<te.length&&te[qe].kind==="entry";)qe+=1;ze.push(...Le(te.slice(De,qe))),De=qe}return ze}function ee(X){let te=X.input;return te&&typeof te.subagent_type=="string"?te.subagent_type:null}function Z(X){for(let te=X.length-1;te>=0;te-=1){let We=X[te];if(We.kind==="result"||We.kind==="error")return null;if(We.kind==="tool"&&!Object.hasOwn(We,"result"))return We}return null}function Se(X){for(let te=X.length-1;te>=0;te-=1)if(X[te].kind==="thinking")return X[te];return null}function H(X,te){if(te.kind==="gate")return c`<div class="sv__gate">${te.text}</div>`;if(te.kind==="phase")return c`<div class="sv__phase">${te.text}</div>`;if(te.kind==="result")return c`<div
        class="sv__result${te.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${te.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(te.text||(te.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(te.kind==="thinking"){let We=b.has(X);return c`<div
        class="sv__think${We?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xt(X)}
      >
        <span class="sv__think-line">💭 ${$s(te.text)}</span>
        ${We?c`<pre class="sv__think-expand">${te.text}</pre>`:""}
      </div>`}if(te.kind==="user"){let We=b.has(X);return c`<div
        class="sv__line sv__line--user${We?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xt(X)}
      >
        <span class="sv__user-line">▷ ${$s(te.text)}</span>
        ${We?c`<pre class="sv__user-expand">${te.text}</pre>`:""}
      </div>`}if(te.kind==="error")return c`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="blocker")return c`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="tool"){let We=b.has(X),ze=te.tool==="Bash"?Wg(te.command):0,De=te.tool==="Bash"?ze>1?$s(te.command):te.command:te.path||te.command||"";return c`<div
        class="sv__tool${We?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>xt(X)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${te.icon}</span>
          <span class="sv__tool-name">${te.tool}</span>
          ${De?c`<span class="sv__tool-detail">${De}</span>`:""}
          ${ze>1?c`<span class="sv__tool-more">⋯ ${ze}줄</span>`:""}
          ${typeof te.added=="number"?c`<span class="sv__diff-add">+${te.added}</span>`:""}
          ${typeof te.removed=="number"?c`<span class="sv__diff-del">−${te.removed}</span>`:""}
          ${te.result?c`<span class="sv__tool-ok">→ ${te.result}</span>`:""}
        </span>
        ${We?c`<pre class="sv__tool-expand">${oe(te)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(te.text||"")}</div>`}function oe(X){let te=[];if(X.tool==="Bash"&&typeof X.command=="string"&&X.command.length>0)te.push(X.command);else if(X.input!==void 0)try{te.push(`input: ${JSON.stringify(X.input,null,2)}`)}catch{}return typeof X.output=="string"&&X.output.length>0&&te.push(`output:
${X.output}`),te.join(`

`)}function ge(){if(!o)return c``;let X=ke(),te=(a?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),We=m.session_id||"",ze=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,De=_e(),qe=De?Yg(we(),Date.now()):"",He=De?Z(X):null,dt=De?Se(X):null,ut=Vg(X);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(a?m.role||"":o)}</span
        >
        ${ut?c`<span
              class="sv__stage${ut.guess?" sv__stage--guess":""}"
              title=${ut.text}
              >${ut.text}</span
            >`:""}
        ${De?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${qe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${qe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${qe?c`<span class="sv__live-ago">${qe}</span>`:""}</span
            >`:""}
        ${We?c`<button
              type="button"
              class="sv__session"
              title=${We}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${We}`}
              @click=${()=>ht(We)}
            >
              ⧉ ${We.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>ht(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${te?c`<span class="sv__meta">${te}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${I}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${ze}
          @click=${ft}
        >
          <span class="sv__follow-full">⇣ ${ze}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>gt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":ne()}
      <div class="sv__body">
        ${X.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(X).map(pt=>pt.kind==="subagent"?Ve(pt):pt.kind==="group"?Ae(pt):H(pt.idx,pt.line))}
      </div>
      ${He||dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${He?c`<span class="sv__now-icon">${He.icon}</span>
                  <span class="sv__now-name">${He.tool}</span>
                  <span class="sv__now-detail"
                    >${He.tool==="Bash"?$s(He.command):He.path||He.command||""}</span
                  >`:""}
            ${dt?c`<span class="sv__now-think"
                  >💭 ${$s(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(X){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>de(X.idx)}
    >
      <span class="sv__group-icon">${X.lines[0].line.icon}</span>
      <span class="sv__group-name">${X.tool}</span>
      <span class="sv__group-count">${X.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ve(X){let te=k.has(X.idx),We=X.header?X.header.line:null,ze=We?We.is_error===!0?"\u2717":typeof We.result=="string"?"\u2713":"\u27F3":"",De=We&&We.command?We.command:"";return c`<div class="sv__sub${te?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>de(X.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${X.agent_type||"subagent"}</span>
        ${De?c`<span class="sv__sub-detail">${De}</span>`:""}
        <span class="sv__sub-count">${X.lines.length}줄</span>
        ${ze?c`<span class="sv__sub-state">${ze}</span>`:""}
        ${te?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${te?c`<div class="sv__sub-body">
            ${Le(X.lines).map(qe=>qe.kind==="group"?Ae(qe):H(qe.idx,qe.line))}
          </div>`:""}
    </div>`}function de(X){k.add(X),Me()}function Me(){it(ge(),e),ie(),h&&At()}function At(){let X=e.querySelector(".sv__body");X&&(X.scrollTop=X.scrollHeight)}function xt(X){b.has(X)?b.delete(X):b.add(X),Me()}function ft(){h=!h,Me()}function ht(X){kn(X).then(te=>{te?fe("\uBCF5\uC0AC\uB428","success",1200):fe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function E(X){!o||!X||(m={...m,...X},Me())}function ue(X){let te=X.target;if(!te||!te.classList||!te.classList.contains("sv__body"))return;!(te.scrollHeight-te.scrollTop-te.clientHeight<=4)&&h&&(h=!1,Me())}e.addEventListener("scroll",ue,!0);function Ce(X){let te=X.target;!te||typeof te.closest!="function"||e.contains(te)||te.closest("dialog")||te.closest(".md-viewer-root")||gt()}let Ue=!1;function Je(){Ue||(document.addEventListener("mousedown",Ce),Ue=!0)}function ot(){Ue&&(document.removeEventListener("mousedown",Ce),Ue=!1)}function _t(X){let te=X&&X.attempt_id;if(!te)return;let We=typeof X.launch_id=="string"&&X.launch_id.length>0?X.launch_id:null,ze=X.session_ref&&typeof X.session_ref=="object"?X.session_ref:null;if(We&&ze)return;let De=l;o=te,a=We,i=ze,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&De&&De!==l&&Promise.resolve(n("unsubscribe-session-log",{id:De})).catch(()=>{}),u=typeof X.root_dir=="string"&&X.root_dir.length>0?X.root_dir:null,m=X.meta||{},d=X.hide_prompt===!0,h=!0,b.clear(),k.clear(),z(),!M&&r&&(M=r.subscribe(Me)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Je(),Me()}function gt(){let X=l;ot(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),k.clear(),z(),Ee(),n&&X&&Promise.resolve(n("unsubscribe-session-log",{id:X})).catch(()=>{}),it(c``,e),s&&s()}return{open:_t,updateMeta:E,close:gt,isOpen(){return o!==null},destroy(){Ee(),ot(),M&&(M(),M=null),e.removeEventListener("scroll",ue,!0),o=null,a=null,i=null,l=null,u=null,d=!1,it(c``,e)}}}function Ho(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Mi(t.spec_id),s=Mi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Mi(e){return typeof e=="string"?e.trim():""}function Vu(e){let t=Ho(e);if(t.path)return t;let n=Mi(Zg(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Zg(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Qg(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Xg(e){let t=e&&e.metadata||{},n=Vu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Qg(t)?null:"plan_pending"}),r}function Yu(e,t){let n=Xg(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Jg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",eb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,tb=/^\*\*결론\*\* — (.+)$/;function Go(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Jg)return null;let n=eb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?tb.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Zu=20;function Qu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function nb(e){return e.length>Zu?`${e.slice(0,Zu)}\u2026`:e}function rb(e,t,n,r){let s=`${t.lane} ${nb(t.identifier)}`;return c`<div class="detail-report">
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
          >${s}</span
        >
        <span class="detail-report__time">${Qu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${sr(t.body)}
        </div>`:""}
  </div>`}function sb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Qu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${sr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xu(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Go(typeof l.text=="string"?l.text:"");return u?rb(l,u,t,s.has(l.id)):sb(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var{I:Xk}=_c;var Ju=e=>e.strings===void 0;var ob={},ed=(e,t=ob)=>e._$AH=t;var $r=Do(class extends zr{constructor(e){if(super(e),e.type!==Zn.PROPERTY&&e.type!==Zn.ATTRIBUTE&&e.type!==Zn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ju(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Sn||t===Vt)return t;let n=e.element,r=e.name;if(e.type===Zn.PROPERTY){if(t===n[r])return Sn}else if(e.type===Zn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Sn}else if(e.type===Zn.ATTRIBUTE&&n.getAttribute(r)===t+"")return Sn;return ed(e),t}});var Ko=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ni=[...Ko.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Jn=["orchestration_model","orchestration_effort","orchestration_speed"],Vo=[...Ko,...Jn],ab=Ni.filter(e=>Vo.includes(e)),td=["delegated","main"],Yo=["inherit","claude","codex"],xs=["default","fast"],As=["standard","fast_track"],Ss=["codex","opus","fable","self","skip"],Zo=["codex","fable","skip"],Qo=["low","medium","high","xhigh"],xn="auto";function $n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function nd(e){if(!$n(e)||!$n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))$n(r)&&$n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Kr(e,t){let n=nd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[xn,...r.flatMap(([,s])=>s)]}function rd(e,t,n,r){if(!$n(e)||!$n(e.runners))return[xn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!$n(a)||!$n(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==xn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[xn,...s]}function Vr(e,t,n){return rd(e,t,n,(r,s)=>$n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function qi(e,t,n){return rd(e,t,n,(r,s)=>$n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:$n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Es(e,t){let n=nd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function sd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Kr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,s,r.impl_model||xn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ib={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Di=[...ab,...Jn],lb=[...Vo,...Ni].filter((e,t,n)=>n.indexOf(e)===t&&!Di.includes(e));function od(e,t){let n=$n(e)?e:{},r=$n(t)?t:{},s=[];for(let a of Di){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:ib[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...lb,...Object.keys(r)])!Di.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Fi(e,t,n,r,s,o){return Co({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function ad(e,t){let n={};for(let r of Ni){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function id(e,t){let n={};for(let r of Jn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var ji=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Jn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Xo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Bi(e,t,n,r,s,o=null){let a=hn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ld(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Bi(e,t,n,r,s,o))a[i.source]+=1;return a}function cd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ud(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var c$=[...Ko,...Jn];var cb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ui={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},dd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},ub={pin:"pin",global:"global",base:"base"};function db(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${ub[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function pb(e,t,n){switch(e){case"workflow_mode":return As;case"spec_review_model":case"impl_review_model":return Ss;case"plan_review_model":return Zo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Qo;case"impl_dispatch":return td;case"impl_runtime":return Yo;case"impl_model":return Kr(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return xs;case"orchestration_model":return Es(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||xn).filter(r=>r!==xn);default:return[]}}function fb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${db(e.source)}
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
      >${Xo[e.source]}</span
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
  </div>`}function pd(e,t){let n=ji.flatMap(l=>l.keys),r=Bi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ld(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${_b(o)}</span
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
          ${ji.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Co({key:u.key,choices:pb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return fb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${$r(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function _b(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function mb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function fd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=mb(n.exec_receipt),l=i?Gn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Eo(n.planned_execution,n.exec_receipt),m=n.chips?.pr?.number,h=typeof m=="number"?`PR #${m}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${h}</a
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${gb(s).map(b=>bb(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function gb(e){let n=typeof e=="string"&&Object.hasOwn(Ui,e)&&Ui[e]||Ui.spec_backed;return cb.filter(r=>n.includes(r.id))}var Jo={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function bb(e,t,n,r){let s=hb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",m=u?Jo.stale:i?Jo.on:l?Jo.current:Jo.none,h=yb(e,n),b=`${r.label} \xB7 ${m}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,M=c`<span class="detail-summary__gate-label"
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
      title=${b}
      >${M}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${M}</span
  >`}function hb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function yb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(dd,n)?dd[n]:""}function ea(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _d(e){return ea(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function md(e,t){let n=e&&e[t];if(!ea(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(_d),s=_d(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function hd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ta(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${hd(e)}${t}`}function Yr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${hd(e)}`}function vb(e,t,n){if(n!==null){let s=e==="claude"?ta:Yr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Yr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function gd(e,t){if(!ea(e)||e.state!=="usable"||!ea(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function bd(e){let t=e.provider_key==="claude"?ta:Yr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${vb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function yd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${bd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:md(t,"claude"),selected:s,workspace_default:gd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${bd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:md(t,"codex"),selected:o,workspace_default:gd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var vd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ts(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function na(e){if(!Ts(e)||!Ts(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ts(n)&&Ts(n.models));return t.length>0?t:null}function Nn(e,t){let n=na(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function wd(e,t){return Ts(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function kd(e,t){let n=na(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return wd(r,r.models[t]);return[]}function wb(e){let t=na(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of wd(r,s))n.includes(o)||n.push(o);return n}function kb(e,t){if(!t)return wb(e);let r=na(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of kd(e,o))s.includes(a)||s.push(a);return s}function $d(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Nn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?kd(t,r.impl_model):kb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function $b(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function xb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ra(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(M){M.key==="Escape"&&s&&(M.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${$b(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${sr(a)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){it(d(),e)}async function h(M,B={}){s=M,o="loading",a="",i=null,l="",m();let V=B.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ce="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(M);try{let U=await r(ce),j=await U.json().catch(()=>({}));if(!U.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||U.status)+")",m();return}let D=xb(String(j.content||""));i=D.front,a=D.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,it(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:k}}var Ab=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Sd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",sa=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Sb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function xd(e){return typeof e=="string"&&Sb.has(e)}var Eb=["running","done","failed","interrupted"],Tb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Cb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Rb(e){let t=cn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Wr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Sd}
          >부분 집계</span
        >`:""}`}function Ad(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Hi(e){if(typeof e=="number")return Cs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Cs(t):""}function Ob(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Lb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Wi(e){return e===null||typeof e=="string"&&e.trim().length>0}function zi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Ib(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!sa.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Wi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Wi(t.effort))||!(!("agent_type"in t)||Wi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Eb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!zi(t.started_at)||!zi(t.last_event_at)||!zi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Pb(e,t,n){let s=cn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Hi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Hi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Mb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?cn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Cs(e.last_event_at):s?Hi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Ob(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Lb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Tb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Db(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Nb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let m=Ib(d);!m||s.has(m.launch_id)||xd(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let a={};for(let{role:d,provider:m}of sa){let h=t?t.roles[d]?.[m]:null;a[d]=h?[...h.legs]:[]}let i=sa.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:m}of sa){for(let h of r.filter(b=>b.role===d&&b.provider===m)){let b=i.find(k=>k.receipt_id===h.launch_id)||null;b&&!Db(h,b)||(b&&l.add(b.receipt_id),u.push(Mb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!xd(h.agent_type)&&u.push(Pb(d,m,h))}return u}function qb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ab,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Cb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Sd}</span>`:""}
  </div>`}var Fb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Cs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function jb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Bb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ub(e,t){let n=Bb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${si(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${us(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Cs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Ed(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],i=a.map(b=>Ub(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let M=typeof b.session_id=="string"&&b.session_id.length>0,B=u.has(b.attempt_id),V=M&&!B,ce=M?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!V}
      title=${ce}
      @click=${U=>{U.stopPropagation(),V&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let M=b.cause_detail,B=M&&typeof M.reason=="string"&&M.reason.length>0?typeof M.command=="string"&&M.command.length>0?`${M.reason} \xB7 ${M.command}`:M.reason:b.cause;return c`<div class="detail-session__cause" title=${B}>
      ${b.cause}
    </div>`},h=b=>{let k=Ad(li(b));if(cn(k).length===0&&!Wr(b.usage))return"";let M=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${M?"true":"false"}
      title=${M?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Rb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let k=li(b),M=Ad(k),B=cn(M);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Fb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ls(b)?c`<span
                  class="detail-session__resumed"
                  title=${ls(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${vr(b)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Wr(b.usage)?c`<span class="detail-session__usage"
                    >${Wr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Cs(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${m(b)} ${jb(b)}
          ${l.has(b.attempt_id)&&b.usage?qb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Nb(b,k,t)}
        </div>`})}
    </div>
  `}function Td(e,t={}){return c`
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
          ${Wb(e)}
        </div>`:""}
  `}function Wb(e){let t=Hr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Xn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=zo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Xn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Xn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var zb=["open","in_progress","deferred","resolved","closed"],Hb=[0,1,2,3,4];function Cd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},h="",b=!1,k=[],M=!1,B={},V={claude:null,codex:null},ce=null,U=null,j=0,D=!1,z=!1,L="",I="",ne="";function ke(){D=!1,z=!1,L="",I="",ne=""}function we(){V={claude:null,codex:null},ce=null,U=null,j+=1}async function _e(){if(!s)return null;try{let A=await Promise.resolve(s("get-workspace-accounts",{}));return A&&typeof A.state=="string"?A:null}catch{return null}}async function ie(A){try{let ae=await fetch(A);if(!ae.ok)return null;let q=await ae.json();if(!q||typeof q!="object"||!Array.isArray(q.accounts))return null;let Te=q.accounts.filter(yt=>yt!==null&&typeof yt=="object"&&!Array.isArray(yt));return{accounts:Te,active:Te.find(yt=>yt.active===!0)||null}}catch{return null}}async function Ee(A){U=A;let ae=++j,[q,Te,yt]=await Promise.all([ie("/api/claude-usage"),ie("/api/codex-usage"),_e()]);ae!==j||A!==u||(V={claude:q,codex:Te},ce=yt,nt())}let Le=[],$e=null,ee=null,Z=!1,Se="",H=!1,oe=0,ge=new Set;function Ae(){Le=[],$e=null,ee=null,Z=!1,Se="",H=!1,oe+=1,ge.clear()}async function Ve(A){if(!s)return;let ae=++oe;try{let q=await Promise.resolve(s("get-comments",{id:A}));if(ae!==oe||A!==u)return;Le=Array.isArray(q)?q:[],Z=!1}catch{if(ae!==oe||A!==u)return;Z=!0}nt()}function de(){if(!s||!u)return;let A=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,ee=A,Ve(u);return}A!==null&&A!==ee&&(ee=A,Ve(u))}function Me(A){ge.has(A)?ge.delete(A):ge.add(A),nt()}function At(A){let ae=Se.trim().length===0;Se=A,ae!==(A.trim().length===0)&&nt()}async function xt(){let A=Se.trim();if(!s||!u||A.length===0||H)return;let ae=u;H=!0,nt();let q=!1;try{let Te=await Promise.resolve(s("add-comment",{id:ae,text:A}));Array.isArray(Te)&&Te.length>0&&(q=!0,ae===u&&(Le=Te,Z=!1,Se="",ee=Te.length))}catch{q=!1}q||fe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),ae===u&&(H=!1),nt()}let ft={onToggle:Me,onDraftInput:At,onSubmit:xt},ht=t.mdViewer||null,E=null;ht||(E=document.createElement("div"),E.className="md-viewer-root",document.body.appendChild(E));let ue=ht||ra(E,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ce=document.createElement("div");Ce.className="session-log-root",document.body.appendChild(Ce);let Ue=Gr(Ce,{transport:s?(A,ae)=>Promise.resolve(s(A,ae)):void 0,sessionLogStore:l}),Je=!1,ot=!1,_t=!1,gt=null,X=null,te=0;function We(A){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}`}function ze(){Je=!1,ot=!1,_t=!1,gt=null,X=null,te+=1}async function De(A){if(!s)return;let ae=++te;ot=!0,_t=!1,nt();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:A}));if(ae!==te)return;!q||typeof q!="object"||Array.isArray(q)?_t=!0:(gt=q,X=We(A))}catch{ae===te&&(_t=!0)}finally{ae===te&&(ot=!1,nt())}}let qe=[],He=null,dt=0;function ut(A,ae){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}::${ae}`}function pt(){qe=[],He=null,dt+=1}async function Ct(A,ae){if(!s)return;let q=++dt,Te;try{Te=await Promise.resolve(s("get-session-refs",{bead_id:A}))}catch{Te=null}q!==dt||ae!==He||(qe=Te&&Array.isArray(Te.sessions)?Te.sessions:[],nt())}function zt(){if(!s||!u)return;let A=d&&d.metadata,ae=A&&typeof A=="object"&&typeof A.session_ref=="string"?A.session_ref:null;if(ae===null){pt();return}let q=ut(u,ae);He!==q&&(qe=[],He=q,Ct(u,q))}function Ot(){if(Je=!Je,Je&&u&&X!==We(u)){gt=null,De(u);return}nt()}function Dt(){if(!a||!u)return[];let A=a.get();return(A&&A.attempts?Object.values(A.attempts):[]).filter(q=>q&&q.bead_id===u).sort((q,Te)=>(Te.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]}))}function Et(){if(!a||!u)return null;let A=a.get();return En(A&&A.attempts||{},u)}let Xe=new Set;function Ne(A){Xe.has(A)?Xe.delete(A):Xe.add(A),nt()}function P(A){let ae=a?a.get():null,q=ae&&ae.attempts?ae.attempts[A]:null;Ue.open({attempt_id:A,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}function J(A,ae){let q=a?a.get():null,Te=q&&q.attempts?q.attempts[A]:null,et=(Te&&Array.isArray(Te.delegation_sessions)?Te.delegation_sessions:[]).find($t=>$t&&typeof $t=="object"&&$t.launch_id===ae);et&&Ue.open({attempt_id:A,launch_id:ae,meta:{runner:et.provider==="claude"?"claude":"codex",role:et.role,...typeof et.agent_type=="string"?{agent_type:et.agent_type}:{},model:et.model,effort:et.effort,session_id:et.session_id,status:et.status}})}async function he(A){if(!s||!A)return;let ae=await Br();if(ae===null)return;let q=()=>{let $t=a?a.get():null;return $t&&typeof $t.revision=="number"?$t.revision:0},Te=async($t={},rt=q())=>await s("worker-attempt-resume",{attempt_id:A,expected_revision:rt,...ae!==""?{instructions:ae}:{},...$t}),yt=$t=>{$t?.queue&&a?.set&&a.set($t.queue)},et=await Te();if(yt(et),et&&et.conflict){let $t=et.queue&&typeof et.queue.revision=="number"?et.queue.revision:q();et=await Te({},$t),yt(et)}et=await Kn(et,($t,rt)=>Te({continuation:$t,decision_token:rt}),{onResult:yt,refresh:()=>Te()}),et&&et.resumed===!1&&!et.conflict&&et.reason&&fe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${et.reason}`,"error",2400)}function S(A){!A||!u||Ue.open(Ro(A,u,d&&d.status))}let G={onOpen:P,onOpenDelegation:J,onResume:he,onToggleUsage:Ne,onOpenSessionRef:S,onCopyResumeCommand:mt};function Re(){let A=a?a.get():null,ae={...B};for(let q of["orchestration_model","orchestration_effort","orchestration_speed"]){let Te=A&&A[q];typeof Te=="string"&&(ae[q]=Te)}return ae}async function $(){if(s){try{let A=await Promise.resolve(s("get-session-defaults",{}));B=A&&A.values&&typeof A.values=="object"?A.values:{}}catch{B={}}nt()}}function O(){let A=a?a.get():null;return A&&A.runner_catalog||null}function Q(){let A=a?a.get():null;return A&&typeof A.execution_defaults=="object"?A.execution_defaults:null}function me(){let A=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},q=hn({pin:{...A,...m},global:Re(),execution_defaults:Q(),runner_catalog:O(),route:typeof A.route=="string"?A.route:null}).orchestration_model.value||"";return Nn(O(),q)}function xe(){let A=i?i.get():null;return!A||typeof A.revision!="number"?null:{revision:A.revision,presets:Array.isArray(A.presets)?A.presets:[]}}function w(A){return A?.compatible===!1}function W(A){i&&A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&i.set({revision:A.revision,presets:A.presets})}async function le(){let A=xe(),ae=A?.presets.find(q=>q.id===h);if(!(!s||!u||!A||!ae||w(ae)||b)){b=!0,k=[],nt();try{let q=await Promise.resolve(s("apply-impl-preset",ud(u,ae.id,A.revision)));if(q&&q.conflict){W(q),fe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Te=q&&Array.isArray(q.issue)?q.issue[0]:q?.issue;if(q&&q.applied&&Te&&typeof Te=="object"){d=Te,k=Array.isArray(q.skipped_orchestration_keys)?q.skipped_orchestration_keys.filter(yt=>typeof yt=="string"):[];for(let yt of vd)delete m[yt];fe(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}q&&q.error==="bd_readback_failed"?fe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):fe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(q){q&&typeof q=="object"&&q.code==="bd_readback_failed"?fe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):fe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,nt()}}}let Ke=null;n&&n.subscribe&&(Ke=n.subscribe(()=>bt()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{u&&nt()}));let ye=null;i&&typeof i.subscribe=="function"&&(ye=i.subscribe(()=>{u&&nt()}));function Tt(A){A.key==="Escape"&&u&&(A.preventDefault(),r())}document.addEventListener("keydown",Tt);function bt(){if(u){if(n&&typeof n.snapshotFor=="function"){let A=n.snapshotFor("detail:"+u)||[];d=A.find(q=>q&&q.id===u)||A[0]||d}de(),zt(),nt()}}function mt(A){kn(A).then(ae=>{ae?fe("\uBCF5\uC0AC\uB428","success",1200):fe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Yt(A){A.preventDefault(),A.stopPropagation(),u&&mt(u)}function Pt(A,ae){A.preventDefault(),A.stopPropagation(),mt(ae)}function dn(A,ae,q){A.preventDefault(),A.stopPropagation(),ue.open(ae,{missing_state:q})}function en(A,ae){m[A]=ae,nt(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",cd(u,A,ae.length===0?null:ae))).catch(()=>{fe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function tn(A,ae){let q=d||{},Te=q.metadata&&typeof q.metadata=="object"?q.metadata:{},yt={};for(let rt of["impl_runtime","impl_model","impl_effort"])yt[rt]=Object.hasOwn(m,rt)?m[rt]:typeof Te[rt]=="string"?Te[rt]:"";yt[A]=ae;let et=$d(yt,O(),me()),$t={};for(let rt of["impl_runtime","impl_model","impl_effort"])$t[rt]=m[rt],m[rt]=et[rt]||"";nt(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...et,orchestration_runtime:me()})).then(rt=>{let Ht=Array.isArray(rt)?rt[0]:rt;if(!Ht||typeof Ht!="object"||!Ht.id)throw new Error("implementation target readback failed");d=Ht;for(let f of["impl_runtime","impl_model","impl_effort"])delete m[f];nt()}).catch(()=>{for(let rt of["impl_runtime","impl_model","impl_effort"])$t[rt]===void 0?delete m[rt]:m[rt]=$t[rt];nt(),fe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Zt(A,ae,q){if(!s||!u)return!1;try{let Te=await Promise.resolve(s(A,ae)),yt=Array.isArray(Te)?Te[0]:Te;return yt&&typeof yt=="object"&&yt.id?(d=yt,!0):(fe(q,"error"),!1)}catch{return fe(q,"error"),!1}}function Ze(A){setTimeout(()=>{try{let ae=e.querySelector(A);ae&&typeof ae.focus=="function"&&ae.focus()}catch{}},0)}function sn(){D=!0,L=d&&d.title||"",nt(),Ze('.detail-edit__input[data-edit="title"]')}function on(A){L=A.target.value}function st(){D=!1,L="",nt()}function Pe(){Zt("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(ae=>{ae&&(D=!1,L=""),nt()})}function C(){z=!0,I=d&&d.description||"",nt(),Ze('.detail-edit__textarea[data-edit="description"]')}function ve(A){I=A.target.value}function Be(){z=!1,I="",nt()}function wt(){Zt("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(ae=>{ae&&(z=!1,I=""),nt()})}function Nt(A,ae,q,Te){if(A.key==="Escape"){A.stopPropagation(),q();return}A.key==="Enter"&&(!Te||A.ctrlKey||A.metaKey)&&(A.preventDefault(),ae())}function kt(A){let ae=A.target.value;Zt("update-status",{id:u,status:ae},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function qt(A){let ae=Number(A.target.value);Zt("update-priority",{id:u,priority:ae},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function Qt(A){ne=A.target.value}function an(){let A=ne.trim();A.length!==0&&Zt("label-add",{id:u,label:A},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(ae=>{ae&&(ne=""),nt()})}function vn(A){if(A.key==="Escape"){A.stopPropagation(),ne="",nt();return}A.key==="Enter"&&(A.preventDefault(),an())}function Bt(A){Zt("label-remove",{id:u,label:A},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>nt())}let wn={onCopyPath:Pt,onOpenDoc:dn};function An(A){return typeof A=="string"?A:A&&typeof A=="object"?String(A.id||A.to||A.issue_id||A.depends_on||""):""}function zn(A){switch(A&&typeof A=="object"?String(A.dependency_type||A.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(A){let q=(Array.isArray(A.dependencies)?A.dependencies:[]).map(Te=>({id:An(Te),icon:zn(Te)})).filter(Te=>Te.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${q.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${q.map(Te=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Te.id)}
                  >
                    ${Te.icon?`${Te.icon} `:""}${Te.id}
                  </button>`:c`<span class="detail-dep"
                    >${Te.icon?`${Te.icon} `:""}${Te.id}</span
                  >`)}
          </div>`}
    `}function R(A){let ae=A.metadata||{},q=A.workflow||{},Te=q.stages||{},yt=Te.spec&&Te.spec.stale,et=Te.impl&&Te.impl.stale,$t=q.quick_fix_review?.state==="stale",rt=Te.plan||null,Ht=q.route_source==="derived",f=q.route||ae.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ht?" detail-kv__v--derived":""}"
          title=${Ht?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ht?"unset":f}</span
        >
      </div>
      ${q.route!=="quick_fix"||Object.hasOwn(ae,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${ae.spec_review||"\uC5C6\uC74C"}${yt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${rt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${rt?.approval_receipt||"\uC5C6\uC74C"}${rt?.approval_state==="stale"?" \xB7 stale":rt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${q.route!=="quick_fix"||Object.hasOwn(ae,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${ae.impl_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${q.resolver.attempt} \xB7 ${q.resolver.prior_sha} \u2192 ${q.resolver.sha}`}
              >${`${q.resolver.prior_sha.slice(0,7)} \u2192 ${q.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${q.route==="quick_fix"||Object.hasOwn(ae,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${ae.quick_fix_review||"\uC5C6\uC74C"}${$t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${q.planned_execution.kind}</span>
            </div>
            ${q.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${q.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${q.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Gn(q.exec_receipt)}</span
            >
          </div>`:""}
      ${q.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${q.impl_entry.actor}@${q.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${ae.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${ae.pr_url}</span>
          </div>`:""}
    `}let je={route:["quick_fix","spec_backed","full_plan"]};async function p(A,ae){let q=ae.target.value;if(A==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){nt();return}await Zt("update-workflow-meta",{id:u,key:A,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),nt()}function v(A){let ae=A.metadata||{};return c` ${((Te,yt)=>{let et=je[Te],$t=typeof ae[Te]=="string"?ae[Te]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Te}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Te}
          data-edit=${`wfmeta-${Te}`}
          @change=${rt=>p(Te,rt)}
        >
          <option value="" ?selected=${!et.includes($t)}>
            ${yt}
          </option>
          ${et.map(rt=>c`<option value=${rt} ?selected=${$t===rt}>${rt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function N(A,ae){return D?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${on}
            @keydown=${q=>Nt(q,Pe,st,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Pe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${st}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${A}</h2>
        ${cn(ae).map(q=>c`<span class="detail-usage-total" title=${q.tooltip}
              >${q.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${sn}
        >
          ✎
        </button>
      </div>
    `}function re(A){let ae=ln(A.created_at),q=ln(A.updated_at);return!ae&&!q?c``:c`
      ${ae?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${ae}</span>
          </div>`:""}
      ${q?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function Ie(A,ae){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${kt}
        >
          ${zb.map(q=>c`<option value=${q} ?selected=${q===A}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${qt}
        >
          ${Hb.map(q=>c`<option value=${String(q)} ?selected=${q===ae}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function ct(A){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${z?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${C}
            >
              ✎
            </button>`}
      </div>
      ${z?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${I}
              @input=${ve}
              @keydown=${ae=>Nt(ae,wt,Be,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${wt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Be}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${A||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function at(A){let ae=typeof A.notes=="string"?A.notes:"";return ae.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${ae}</div>
    `}function Ut(A){let ae=Array.isArray(A.labels)?A.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${ae.map(q=>c`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>Bt(q)}
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
            @input=${Qt}
            @keydown=${vn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${an}
          >
            추가
          </button>
        </span>
      </div>
    `}function Jt(){if(!u)return c``;let A=d||{},ae=String(A.id||u),q=A.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Te=Et(),yt=A.status||"open",et=typeof A.priority=="number"?Math.max(0,Math.min(4,A.priority)):"",$t=A.description||"",rt={...A,metadata:{...A.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Yt}
            >
              ${ae}
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
          ${N(q,Te)}
          ${fd(rt)}
          ${pd({metadata:rt.metadata,workspace_values:Re(),catalog:O(),execution_defaults:Q(),expanded:M,presets:xe()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:Ht=>{M=Ht,nt()},onEdit:(Ht,f)=>{if(Ht==="impl_runtime"||Ht==="impl_model"||Ht==="impl_effort"){tn(Ht,f??"");return}en(Ht,f??"")},onPresetSelect:Ht=>{h=Ht,k=[],nt()},onPresetApply:()=>{le()}})}
          ${yd({md:rt.metadata,catalog:V,workspace_defaults:ce,handlers:{onExecChange:en}})}
          ${Ie(yt,et)} ${re(A)}
          ${ct($t)}
          ${Xu(Le,ft,{expanded:ge,draft:Se,sending:H,error:Z})}
          ${at(A)} ${Ut(A)} ${T(A)}
          ${R(A)} ${v(A)}
          ${Yu(A,wn)}
          ${Td({expanded:Je,loading:ot,error:_t,data:gt},{onToggle:Ot})}
          ${Ed(Dt(),G,{total:Te,expanded:Xe},qe)}
        </div>
      </div>
    `}function nt(){it(Jt(),e)}return{load(A){A!==u&&(m={},h="",k=[],M=!1,ke(),Ae(),ze(),pt(),we()),u=A,d=null,bt(),$(),U!==A&&Ee(A)},clear(){u=null,d=null,m={},h="",b=!1,k=[],M=!1,ke(),Ae(),ze(),pt(),we(),ue.close(),Ue.close(),it(c``,e)},destroy(){Ke&&(Ke(),Ke=null),Fe&&(Fe(),Fe=null),ye&&(ye(),ye=null),document.removeEventListener("keydown",Tt),ht||(ue.destroy(),E&&E.parentNode&&E.parentNode.removeChild(E)),Ue.destroy(),Ce.parentNode&&Ce.parentNode.removeChild(Ce),u=null,d=null,we(),h="",b=!1,k=[],Ae(),ze(),pt(),it(c``,e)}}}function Rd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function oa(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Os(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function aa(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ia(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function la(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Gb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:oa(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Od(e,t){let n=Gb(e,t);return n?c`<button
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
            title=${n.deploy.at?ln(n.deploy.at):""}
            >${la(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Os(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Zr(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${ln(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${ln(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Kb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ls(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ca(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Kb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Rs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Vb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ld(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Vb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ua(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Yb(e){return c`<div
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
  </div>`}function da(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.interactive!==!1,s=e.scope_missing===!0,o=e.popover||null,a=e.cross_lane||null,i=e.armed_lane||null;return t.length===0&&n.length===0&&!s&&!a&&!i?"":c`<div class="worker-deps">
    ${a?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${a.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${a.label}
        </button>`:""}
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
        >`:""}
    ${t.map(l=>c`<span
          class=${`worker-dep worker-dep--pred${l.foreign?" worker-dep--foreign":""}`}
          title=${l.title||""}
          >${r?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${l.id}
              >
                ${l.label}
              </button>`:l.label}</span
        >`)}${n.map(l=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${l.id}
          aria-label=${`scope \uACB9\uCE68 ${l.id} (${l.location_label})`}
          title=${[`\uACB9\uCE68 ${l.id} (${l.location_label})`,...l.prefixes].join(`
`)}
        >
          ⧉ ${l.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${o?Yb(o):""}
  </div>`}function pa(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Zb(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Id(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function fa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Qb(e){let t=Array.isArray(e.badges)?e.badges:[],n=cn(e.usage),r=Vn(e.usage),s=bn(e.done_at);return c`<div
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
      ${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${ln(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${ds(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Os(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ar(e){if(e.lane==="done"&&e.done_layout==="three_line")return Qb(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=cn(e.usage),s=Vn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?bn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":pa(e.workflow),M=e.lane==="done"?"":Id(e.from_id),B=fa(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,ce=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",U=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",j=n.map(ge=>ge===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ge}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ge===e.completion_badge&&e.completion_title||""}
          >${ge}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",z=r.length>0?r.map(ge=>c`<span class="worker-usage" title=${ge.tooltip}
              >${ge.label}</span
            >`):s?c`<span class="worker-usage" title=${ds(e.usage)}
            >${s}</span
          >`:"",L=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?c`<button
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
      </button>`:"",ke=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",we=e.discard,_e=we?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${we?.attempt_id||""}
          data-operation-id=${we?.operation?.operation_id||""}
          data-discard-mode=${we?.confirmation||"unmerged"}
          ?disabled=${we?!we.enabled:e.discard_enabled===!1}
          title=${we?we.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${we?.label||"\uD3D0\uAE30"}
        </button>`:"",ie=e.stale_work||null,Ee=ie?c`${ie.can_resume||ie.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ie.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ie.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            다시 확인
          </button>`:""}`:"",Le=ie?c`<div class="worker-mini__stale">
        <strong>${ie.title}</strong>
        <span>${ie.summary}</span>
        <span>${ie.cause}</span>
        ${ie.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",$e=e.revise_action?c`<button
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
        </button>`:"",ee=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=h||k||M||ee||z?c`<div class="worker-chips">
          ${h}${k}${M}${ee?ua(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${z}
        </div>`:"",Se=da(e.dependency_chips),H=Rs(e),oe=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||we?.operation||e.revise_action||ie);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${b}${B}${M}${V}
          </div>
          <div class="worker-mini__row2">
            ${z}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ln(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Os(e.work_ms)}</span
                >`:""}${j}${L}
            <span class="worker-mini__actions"
              >${I}${ne}${ke}${_e}</span
            >
            ${Zr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${b}${B}${ce}${U}${j}${m}${D}
            </div>
            <div class="worker-mini__body">${V}${Le}</div>
            ${Se}${Z}${oe?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${I}${ne}${ke}${_e}${$e}${Ee}</span
                  >
                  ${Rs(e)}
                </div>`:""}
            ${Zr(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${b}${B}${V}${ce}${U}${j}${m}${D}${L}${I}${ne}${ke}${_e}
            </div>
            ${Se}${Z}${H} ${Zr(e)}`}
  </div>`}function Xb(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Jb={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Gi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=Jb[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=da(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=pa(l),k=Id(e.from_id),M=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${fa(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${Zb(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Ao(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${m}
    ${h||b||k||M?c`<div class="worker-chips">
          ${h}${b}${k}${ua(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Xb(t.lanes,e.id)}
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
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴</button
            >${n.dep_action===!0?c`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${e.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`:""}`}
    </div>
    ${Zr(e)}
  </div>`}function Cn(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?Gi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):ar(r))}
          </div>`}
  </section>`}function _a(e){return e.replace(/\/+$/,"")}function eh(e,t){let n=_a(e),r=_a(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ma(e,t){let n=new Set;for(let r of e)for(let s of t){if(!eh(r,s))continue;let o=_a(r),a=_a(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Md(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ma(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Pd=["parallel","serial","candidate"];function Is(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Ki(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Pd.includes(r.kind),l=Pd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=th(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Is(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Is(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function th(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Dd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Nd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function qd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Vi(e){for(let t of qd(e))if(Object.hasOwn(Dd,t))return Dd[t];return null}function Yi(e){let t=null;for(let n of qd(e))Object.hasOwn(Nd,n)&&(t=Nd[n]);return t}function ga(e){let t=Vi(e),n=Yi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Fd(e,t){let n=Vi(e)??Vi(t),r=Yi(t)??Yi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var jd=160;function nh(e){return e.length>jd?`${e.slice(0,jd)}\u2026`:e}function rh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${nh(e.command)}</code>`:""}
  </div>`}function sh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function oh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Bd(e){let t=e.failure?ga(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${rh(e.failure.cause_detail,e.failure.reason)}
          ${sh(e.failure.reason)}
          ${Rs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function ah(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ih=new Set(["codex-runner"]);function lh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&ih.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?bn(r.last_event_at,t):"",m=r?bn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${bn(a,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var ch={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function uh(e){if(!e)return"";let t=ch[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Zi(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(ie=>ie&&ie.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?oh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ls(e),m=cn(e.usage),h=Vn(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,M=e.landing,B=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,ce=ah(V),U=V?da(V.dependency_chips):"",j=lh(V,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),D=s&&e.workflow?.chips?.exec_receipt||null,z=pa(e.workflow),L=D?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Gn(D)}`}
        >${`${D.kind}:${So(D)}`}</span
      >`:"",I=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${us(o)}</span
      >`:"",ne=ce||z||I||L?c`<div class="rtile__meta">
          ${ce}${z}${I}${L}
        </div>`:"",ke=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,we=s?"":Zr(e),_e=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${B?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${fa(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${ke}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${uh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${_e}
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
                ${i?c`<button
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
                ${_e}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?xo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ti}):""}
    ${M?c`<div class="rtile__landing">
          <span
            class="merge-step${M.failed?" merge-step--failed":""}"
            style=${`--progress: ${M.percent}%`}
            >${M.label}${M.index>0?c`<span class="merge-step__n"
                  >${M.index}/${M.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${U}
    ${s?ne:ce||z||u||m.length>0||h?c`<div class="rtile__meta">
            ${ce}${z}${ua(e.exec_chips)}
            ${m.length>0?m.map(ie=>c`<span class="worker-usage" title=${ie.tooltip}
                      >${ie.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${ds(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Rs(e)} ${we}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qi(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Zi(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Xi=new Set(["unavailable","not_applicable"]);function ir(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Ud(e){return e.filter(t=>t!==null).join(" \xB7 ")}function lr(e,t){return t===null?null:`${or[e]}: ${t.display} (${Xo[t.source]})`}function Ji(e){return e.filter(t=>t!==null).join(`
`)}function Ps(e){if(typeof e!="object"||e===null)return null;let t=vr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ji(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function xr(e,t){let n=ir(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ir(e,"orchestration_effort"),s=ir(e,"orchestration_speed"),o=Ud([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ji(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",lr("orchestration_model",n),lr("orchestration_effort",r),lr("orchestration_speed",s)])}}function dh(e,t){return e===null||e.value===null||Xi.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function ph(e){return e===null||Xi.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function fh(e){return e===null?null:e.value==="auto"?"auto":Xi.has(e.resolution)?null:e.display}function cr(e,t){if(typeof e!="object"||e===null)return null;let n=ir(e,"impl_dispatch"),r=ir(e,"impl_runtime"),s=ir(e,"impl_model"),o=ir(e,"impl_effort"),a=ir(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Ud([dh(r,t??null),ph(s),fh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ji(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",lr("impl_dispatch",n),lr("impl_runtime",r),lr("impl_model",s),lr("impl_effort",o),lr("impl_speed",a)])}}var un="",_h=["impl_runtime","impl_model","impl_effort"],mh=["claude_account","codex_account"],gh=5,ba=1;function yn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ha(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>fe(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,M=null,B={},V="",ce="",U=!1,j=!1,D=!1,z=null,L=!1;function I(){let P=t.queue?t.queue():null;return yn(P)?P:null}function ne(){let P=I();return P?P.runner_catalog:null}function ke(){let P=I();return P&&yn(P.execution_defaults)?P.execution_defaults:null}function we(){let P=t.implPresetStore?.get();return yn(P)&&Array.isArray(P.presets)?P:null}function _e(){return r===null?{}:{root_dir:r}}async function ie(P,J){return L||!n?null:await n(P,J)}function Ee(P){P&&yn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function Le(P,J){let he=I();if(!he||L)return null;let S=await ie(P,{...J,..._e(),expected_revision:he.revision});if(Ee(S),r!==null&&S&&S.conflict){let G=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I()?.revision??he.revision;S=await ie(P,{...J,..._e(),expected_revision:G}),Ee(S)}return S}async function $e(){l=!0,Ne();try{let P=await ie("get-session-defaults",{..._e()});o=yn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,Ne()}}async function ee(){let P=ad(o,a);if(Object.keys(P).length!==0){try{let J=await ie("set-session-defaults",{values:P,..._e()});o=yn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}function Z(P,J){if(!yn(P))return;let he=P.state;u={state:he==="usable"||he==="unusable"||he==="absent"?he:"absent",values:yn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},m={...u.values},J&&(d={...m})}async function Se(){try{Z(await ie("get-workspace-accounts",{..._e()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Ne()}async function H(P){try{let J=await fetch(P);if(!J.ok)return null;let he=await J.json();if(!yn(he)||!Array.isArray(he.accounts))return null;let S=he.accounts.filter(G=>yn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:S,active:S.find(G=>G.active===!0)||null}}catch{return null}}async function oe(){k=!0;let[P,J]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage")]);L||(b={claude:P,codex:J},Ne())}function ge(){let P={};for(let J of mh){let he=Object.hasOwn(d,J)?d[J]:null,S=Object.hasOwn(m,J)?m[J]:null;he!==S&&(P[J]=he)}return P}async function Ae(){let P=ge();if(Object.keys(P).length!==0){try{Z(await ie("set-workspace-accounts",{values:P,..._e()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}function Ve(P,J){J===un?delete d[P]:d[P]=J,Ne(),h=h.then(()=>Ae())}function de(P,J){if(_h.includes(P)){xt(P,J);return}J===un?delete a[P]:a[P]=J,Ne(),ee()}function Me(){let P=Et().orchestration_model,J=hn({global:{orchestration_model:P??void 0},execution_defaults:ke(),runner_catalog:ne()}).orchestration_model.value;return J?Nn(ne(),J):null}function At(P,J){typeof J=="string"&&J.length>0?a[P]=J:delete a[P]}function xt(P,J){let he=J===un?void 0:J,S=sd({impl_runtime:P==="impl_runtime"?he:a.impl_runtime,impl_model:P==="impl_model"?he:a.impl_model,impl_effort:P==="impl_effort"?he:a.impl_effort},ne(),Me());At("impl_runtime",S.impl_runtime),At("impl_model",S.impl_model),At("impl_effort",S.impl_effort),Ne(),ee()}async function ft(){let P=I();if(!P)return;let J={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},he=id(J,{...J,...B});if(Object.keys(he).length!==0){try{let S=await Le("worker-queue-set-orchestration-defaults",{values:he});if(S&&S.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(S){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}}function ht(P,J){B[P]=J===un?null:J,Ne(),ft()}function E(P){if(M=P,!P){Ne();return}let J=ne(),he=Et(),S=he.orchestration_model;S&&!Es(J,P).includes(S)&&(B.orchestration_model=null,S=null);let G=he.orchestration_effort;G&&!qi(J,P,S||xn).includes(G)&&(B.orchestration_effort=null),Ne(),ft()}async function ue(P){if(!(!I()||P<ba)){try{await Le("worker-queue-set-slots",{slots:P})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}async function Ce(P){if(!(!I()||P<ba||P>gh)){try{await Le("worker-queue-set-serial-lane-count",{count:P})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}async function Ue(P,J){let he=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Le(he,{on:J})}catch(S){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}function Je(){let P={},J=Et();for(let he of Vo){let S=Jn.includes(he)?J[he]:a[he];typeof S=="string"&&S.length>0&&(P[he]=S)}return P}async function ot(){let P=we();if(!P)return;let J=Je();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let he=(P.presets||[]).find(G=>G.id===V),S=ce.trim()||(he?he.name:"");if(!S){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=he?await ie("impl-preset-update",{expected_revision:P.revision,id:he.id,name:S,settings:J}):await ie("impl-preset-create",{expected_revision:P.revision,name:S,settings:J});if(G&&G.applied){if(ce="",!he&&Array.isArray(G.presets)){let Re=G.presets.find($=>$.name===S);V=Re?Re.id:V}Ne()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function _t(){let P=we();if(!(!P||V.length===0))try{let J=await ie("impl-preset-delete",{expected_revision:P.revision,id:V});J&&J.applied?(V="",Ne()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function gt(P){o=yn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],yn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function X(){let P=we(),J=I();if(!P||!J||V.length===0)return;let he=S=>({preset_id:V,expected_revision:P.revision,expected_queue_revision:S,..._e()});try{let S=await ie("apply-impl-preset-global",he(J.revision));if(S&&S.applied&&gt(S),r!==null&&S&&S.queue_applied===!1){let G=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I()?.revision??J.revision;S=await ie("apply-impl-preset-global",he(G)),S&&S.applied&&gt(S)}S&&S.applied?S.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}async function te(){j=!0,D=!1,Ne();try{let P=await ie("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:z=P}catch{D=!0}finally{j=!1,Ne()}}function We(){if(U=!U,U&&!z){te();return}Ne()}function ze(){let P=Hr({loading:j,error:D});if(P)return P;if(!z)return"";let J=Array.isArray(z.variants)?z.variants:[];return c`<div class="settings-dialog__sp-body">
      ${z.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${z.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(he=>c`<div class="settings-dialog__sp-variant" data-variant=${he.key}>
            <div class="settings-dialog__sp-cond">${he.condition}</div>
            ${Xn(he.label,he.system_prompt)}
          </div>`)}
    </div>`}function De(){return c`<section
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
        aria-expanded=${U?"true":"false"}
        @click=${We}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?ze():""}
    </section>`}function qe(P,J,he,S,G,Re,$){let O=G[P]??un,Q=Fi(P,he,G,ke(),ne(),$),me=Q.options.find(w=>w.value===O),xe=O===un?Q.full_value:me?.full_value;return c`<select
        class=${O===un?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${J}
        title=${xe||""}
        ?disabled=${Re===!0||Q.disabled}
        .value=${$r(String(O))}
        @change=${w=>S(P,String(w.target.value))}
      >
        <option value=${un} ?selected=${O===un}>
          ${Q.unset_label}
        </option>
        ${Q.options.map(w=>c`<option
              value=${w.value}
              title=${w.full_value||""}
              ?selected=${w.value===O}
            >
              ${w.label}
            </option>`)}
      </select>
      ${O===un?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function He(P,J,he,S,G,Re=!1,$){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${qe(P,J,he,S,G,Re,$)}
      </span>
    </div>`}function dt(P,J){let he=J?J.active:null;return yn(he)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?he.email:Yr({...he,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ut(P,J,he){let S=b[he],G=Object.hasOwn(d,P)?d[P]:un,Re=he==="claude"?ta:Yr,$=!!S?.accounts.some(O=>O.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${P}
          @change=${O=>Ve(P,String(O.target.value))}
        >
          <option value=${un} ?selected=${G.length===0}>
            ${dt(he,S)}
          </option>
          ${G.length>0&&!$?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(O=>c`<option value=${O.key} ?selected=${O.key===G}>
                ${Re(O)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Ct(P,J,he,S,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${qe(he,`${P} \uBAA8\uB378`,S,de,a,!1)}
        ${qe(G,`${P} effort`,Qo,de,a,!1)}
      </span>
    </div>`}function zt(P,J,he,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${S?"true":"false"}
          aria-label=${J}
          @click=${()=>Ue(P,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${he}</span>
      </span>
    </div>`}function Ot(P,J,he,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>S(he-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${he}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>S(he+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Dt(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(J=>c`<div
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
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Et(){let P=I(),J={};for(let he of Jn)J[he]=Object.prototype.hasOwnProperty.call(B,he)?B[he]:P&&typeof P[he]=="string"?P[he]:null;return J}function Xe(){let P=ne(),J=a.impl_runtime,he=a.impl_model,S=we(),G=I(),Re=Et(),$=Es(P,M),O=Kr(P,void 0).filter(ye=>ye!==xn),Q=qi(P,M,Re.orchestration_model||xn).filter(ye=>ye!==xn),me=V?(S?.presets||[]).find(ye=>ye.id===V):null,xe=me?od(Je(),yn(me.settings)?me.settings:{}):null,w=G&&typeof G.slots=="number"?G.slots:ba+1,W=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:ba,le=ke()?.supported===!0,Ke=pt(),Fe=Fi("workflow_mode",As,a,ke(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Ke?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ke}
          </div>`:""}
      ${le?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${$r(V)}
                @change=${ye=>{V=String(ye.target.value),Ne()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(ye=>c`<option
                      value=${ye.id}
                      ?selected=${ye.id===V}
                    >
                      ${ye.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!xe||xe.rows.length===0}
                @click=${X}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${$r(ce)}
                @input=${ye=>{ce=String(ye.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ot}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${_t}
              >
                삭제
              </button>
            </div>
            ${xe?Dt(xe):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${$r(M||un)}
                    @change=${ye=>{let Tt=String(ye.target.value);E(Tt===un?null:Tt)}}
                  >
                    <option value=${un} ?selected=${!M}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${M==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${M==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${He("orchestration_model","\uBAA8\uB378",$,ht,Re)}
              ${He("orchestration_effort","effort",Q,ht,Re)}
              ${He("orchestration_speed","\uC18D\uB3C4",xs,ht,Re)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ut("claude_account","Claude","claude")}
              ${ut("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${un}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>de("workflow_mode",un)}
                    >
                      ${Fe.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${As.map(ye=>c`<button
                          type="button"
                          data-mode=${ye}
                          aria-pressed=${String(a.workflow_mode===ye)}
                          @click=${()=>de("workflow_mode",ye)}
                        >
                          ${ye}
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
              ${Ct("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ss,"spec_review_effort")}
              ${Ct("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Zo,"plan_review_effort")}
              ${Ct("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ss,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${He("impl_runtime","\uC704\uC784 \uB300\uC0C1",Yo,de,a)}
              ${He("impl_model","\uBAA8\uB378",Kr(P,J),de,a)}
              ${He("impl_effort","effort",Vr(P,J,he),de,a)}
              ${He("impl_speed","\uC18D\uB3C4",xs,de,a)}
              ${He("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",O,de,a,!1,{...a,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${zt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${zt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${zt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",G?.auto_repair===!0)}
              ${Ot("slots","\uB3D9\uC2DC \uC2E4\uD589",w,ye=>ue(ye))}
              ${Ot("serial-lane-count","\uC9C1\uB82C \uB808\uC778",W,ye=>Ce(ye))}
            </div>
            ${De()}
          `}
    `}function Ne(){L||it(Xe(),e)}return{load(){B={};let P=[$e(),Se()];return k||P.push(oe()),Promise.all(P).then(()=>{})},render:Ne,sessionDraft:()=>({...a}),destroy(){L=!0,it(c``,e)}}}function ya(e){return c`<svg
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
  </svg>`}function Wd(){return ya(as`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function zd(){return ya(as`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Hd(){return ya(as`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Gd(){return ya(as`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Kd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Vd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return cn(Lo(t));let n={};for(let i of Wn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Wn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Vn(n):null}function Fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function el(e,t){let n=Fn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function bh(e,t){if(!Fn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function hh(e){if(!Fn(e)||!Fn(e.execution_defaults)||!Fn(e.runner_catalog)||!Fn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=hn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),s=xr(n,e.runner_catalog),o=cr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Yd(e,t){let n=t.notify||(H=>fe(H,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,m=null,h=new Map;function b(){let H=t.workspacesState?t.workspacesState():[];return Array.isArray(H)?H.filter(oe=>Fn(oe)):[]}function k(H){return b().find(oe=>oe.root_dir===H)||null}function M(H){return bh(k(H),h.get(H))}function B(){for(let H of b()){let oe=h.get(H.root_dir);oe&&typeof oe.revision=="number"&&typeof H.revision=="number"&&H.revision>=oe.revision&&h.delete(H.root_dir)}}async function V(H,oe,ge){let Ae=t.transport,Ve=M(oe);if(!(!Ae||!Fn(Ve))){try{let de=await Ae(H,{...ge,root_dir:oe,expected_revision:Ve.revision});if(Fn(de?.queue)&&h.set(oe,de.queue),de&&de.conflict){let Me=Fn(de.queue)&&typeof de.queue.revision=="number"?de.queue.revision:M(oe)?.revision;de=await Ae(H,{...ge,root_dir:oe,expected_revision:Me}),Fn(de?.queue)&&h.set(oe,de.queue)}}catch(de){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${de instanceof Error?de.message:String(de)}`)}ee()}}function ce(H){u!==H&&(u=H,t.onFocusChange?.(u),ee())}function U(H){ce(u===H?null:H)}function j(H){if(d===H){z();return}D(),d=H;let oe=k(H);a.textContent=`${oe?.name||H} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=ha(l,{root_dir:H,queue:()=>M(H),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ge=>{h.set(H,ge),ee()}}),m.load(),ee()}function D(){m?.destroy(),m=null}function z(H){D(),d=null,s.hidden=!0,a.textContent="",H!==!0&&ee()}let L=()=>z();i.addEventListener("click",L);function I(H){H.key==="Escape"&&u!==null&&ce(null)}document.addEventListener("keydown",I);function ne(H,oe){let ge=Math.max(oe,H,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${H}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ge},(Ae,Ve)=>Ve<H?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ke(H){let oe=H.auto_advance===!0,ge=H.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?zd():Wd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ge?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ge?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Hd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===H.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===H.root_dir?"true":"false"}
        aria-label=${`${H.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Gd()}
      </button>`}function we(H){let oe=hh(H);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function _e(H){let oe=[];for(let[ge,Ae]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ve=el(H,ge);Ve>0&&oe.push(`${Ae} ${Ve}`)}return oe.join(" \xB7 ")}function ie(H){let oe=el(H,"running"),ge=typeof H.slots=="number"?H.slots:1;return c`<div
      class=${`mon2-deck__tile${u===H.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${H.root_dir}
      aria-pressed=${u===H.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${H.root_dir}>${H.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ge}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${ge}</span>
          ${ne(oe,ge)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${H.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${ke(H)}</div>
        <span class="mon2-deck__counts">${_e(H)}</span>
        ${we(H)}
      </div>
    </div>`}function Ee(H){let oe=t.doneItems?t.doneItems():[],ge=t.rangeLabel?t.rangeLabel():"",Ae=Vd(Array.isArray(oe)?oe:[]),Ve=de=>H.reduce((Me,At)=>Me+el(At,de),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${H.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ge}`}
        >실행 ${Ve("running")} · 대기 ${Ve("queue")} · PR
        ${Ve("pr_wait")}${Ve("session_active")>0?` \xB7 \uC138\uC158 ${Ve("session_active")}`:""}
        · ${ge} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${Ae===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Kd(ge)}
                  >${Ae}</span
                >`:Ae.map(de=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${de.provider}
                      title=${de.tooltip}
                      >${de.label}</span
                    >`)}
          </span>`}
    </div>`}function Le(){let H=b();return H.length===0?"":c`${Ee(H)}
      <div class="mon2-deck__strip">
        ${H.map(oe=>ie(oe))}
      </div>`}function $e(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function ee(){B(),$e(),d!==null&&!k(d)&&z(!0),it(Le(),r),m?.render()}function Z(H){let oe=H.target;if(!oe||typeof oe.closest!="function")return;let ge=oe.closest("[data-root-dir]");if(!ge)return;let Ae=ge.getAttribute("data-root-dir")||"",Ve=oe.closest("[data-act]")?.getAttribute("data-act");if(Ve==="worker"){t.gotoWorkerTab?.(Ae);return}if(Ve==="auto"){V("worker-automation-toggle",Ae,{on:M(Ae)?.auto_advance!==!0});return}if(Ve==="merge"){V("worker-merge-auto-toggle",Ae,{on:M(Ae)?.auto_merge!==!0});return}if(Ve==="gear"){j(Ae);return}U(Ae)}function Se(H){if(H.key!=="Enter"&&H.key!==" ")return;let oe=H.target;if(!oe||typeof oe.closest!="function")return;let ge=oe.closest('[data-root-dir][role="button"]');!ge||ge!==oe||(H.preventDefault(),U(ge.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",Se),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",Z),r.removeEventListener("keydown",Se),i.removeEventListener("click",L),D(),it(c``,r),e.replaceChildren()}}}function Zd(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));m&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var yh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",wa="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",vh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",wh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ms(e,t){return`${e}\0${t}`}function kh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function $h(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function qs(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=kh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,h]of s)for(let b of h)o.push({blocker:b,blockee:m});let a=$h(e,t),i=new Map(r.map((m,h)=>[m,h])),l=r.slice(0,a).filter(m=>s.get(m).some(h=>Number(i.get(h))>Number(i.get(m)))),u=Zd(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,a),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Qd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:qs(n,t)}function xh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ah(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Sh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function tl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Eh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Ms(a,l));let r=new Map,s=new Map;for(let a of e){let i=Ms(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ms(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Th(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Ch(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function va(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function nl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Fs(e){let t=Sh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Ah(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,m)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(tl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),m!==void 0&&r.add(Ms(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let h=o(u);h!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Ms(u,d))}}function js(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Eh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:xh(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function Xd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Ds(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Jd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function ep(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(va(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Ns(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ka(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function rl(e,t,n){let r=Fs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:yh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:vh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&d===void 0)return{refused:Qr};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(U=>U.bead_id===e.bead_id);if(k<0)return;let M=k>0?d.entries[k-1]:null,B=k+1<d.entries.length?d.entries[k+1]:null,V=Ds(d,k),ce=B!==null&&Ds(d,k+1);V&&M!==null&&r.removeDep(e.bead_id,M.bead_id),ce&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(V||ce)&&M!==null&&B!==null&&r.addDep(B.bead_id,M.bead_id,u)},h=(k,M)=>{let B=n.cross_lanes.get(k),V=B.entries.findIndex(ke=>ke.bead_id===e.bead_id),ce=B.entries.filter(ke=>ke.bead_id!==e.bead_id),U=Math.max(0,Math.min(ce.length,V>=0&&M>V?M-1:M)),j=-1;if(ce.forEach((ke,we)=>{n.fixed_members.has(ke.bead_id)&&(j=we)}),U<=j){r.state.refusal=wh;return}let D=V>=0?B.entries[V]:d?.entries.find(ke=>ke.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=qs({status:B.status,entries:[...ce.slice(0,U),D,...ce.slice(U)]},n);let z=i.entries;if(ka(z,B.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Ns(z)}}),B.status!=="confirmed")return;let L=z.findIndex(ke=>ke.bead_id===e.bead_id),I=L>0?z[L-1].bead_id:null,ne=L+1<z.length?z[L+1].bead_id:null;if(I===null){ne!==null&&r.addDep(ne,e.bead_id,k);return}if(r.addDep(e.bead_id,I,k),ne!==null&&(r.graph.get(ne)||[]).includes(I)){let ke=B.entries.findIndex(we=>we.bead_id===ne);(r.laneCreated(ne,I)||ke>0&&B.entries[ke-1].bead_id===I&&Ds(B,ke))&&r.removeDep(ne,I),r.addDep(ne,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...Jd(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ns(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Th(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(va(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let M=n.parallel_rows,B=M[Math.max(0,Math.min(M.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Ch(n,e.root_dir)&&b!==void 0){let ce=b>k?k:k-1;ce>=0&&ce!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ce},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(va(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(va(e.bead_id,e.root_dir,t.index,t.lane_id));return js(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function tp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=qs(n,t);if(r.held)return{refused:wa};let s=r.entries,o=Fs(t),a=[];Xd(o,s,e),o.state.refusal===null&&ep(o,t,s,a);let i=ka(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ns(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),js(o,t,i,a,{lane_id:e,correction:r})}function np(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=qs(n,t),s=r.entries,o=Fs(t),a=[];Xd(o,s,e),o.state.refusal===null&&ep(o,t,s,a);let i=ka(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ns(s)}}];return js(o,t,i,a,{lane_id:e,correction:r})}function rp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=qs(n,t),s=r.entries;return js(Fs(t),t,ka(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ns(s)}}],[],{lane_id:e,correction:r})}function sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Fs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Ds(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return js(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Jd(t,n,e,n.entries)})}function op(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Ds(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${nl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function ap(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function ip(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function sl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${nl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Rh="\uC0AC\uC774\uD074";function lp(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=tl(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Rh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function cp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var up={running:3,paused:2,failed:1};function Ar(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function dp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function pp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Ar(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Ar(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),m=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=up[u.run_state],m=up[i];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var fp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Bs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function $a(e,t){let n=fp.find(s=>s.step===e);if(!n)return null;let r=fp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function _p(e){let t=Bs.findIndex(n=>n.step===e);return Bs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Sr(e){let t=Bs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Oh(e){let t=Bs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Bs.length}}function xa(e){let t=Oh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var al=new Set(["queued","running","retry_pending","repairing"]),mp=new Set(["failed","succeeded"]),Lh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Us={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Ih={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Us.base_containment,child_sweep:Us.child_sweep,branch_cleanup:Us.branch_cleanup,parent_close:Us.parent_close};function Ph(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Mh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...al,...mp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Dh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function ol(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Lh[s];if(!o)return null;let a=$a(n,`${r} ${o}`);return a?{...a,active:al.has(s),failed:s==="failed"}:null}function Nh(e){return!e||typeof e!="object"?null:Ih[e.step]||null}function Ws(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Nh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Ph(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Mh(k,t,i)).sort(Dh):[],u=a?l:[],d=u.find(k=>al.has(k.state));if(d)return ol(d);if(s)return s.step==="repo_operations"&&l[0]?ol(l[0],!0):null;let m=u.find(k=>mp.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return ol(m);if(r){let k=$a(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Us[e.cleanup_cursor]:null;if(!h)return null;let b=$a(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Aa(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var qh="\uBBF8\uC801\uC7AC";function il(e,t){let n=ko(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function gp(e,t){let n=new Map,r=new Map;for(let s of t)r.has(s.id)||r.set(s.id,s.location_label);for(let[s,o]of e){if(typeof s!="string"||s.length===0)continue;let a=[];for(let i of Array.isArray(o)?o:[])typeof i!="string"||i.length===0||a.push(il(s,{id:i,location_label:r.get(i)||qh}));a.length>0&&n.set(s,a)}return n}function ll(e,t){return`${e}\0${t}`}function bp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function cl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function zs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function hp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${zs(s)})`,location_label:zs(s),scope:null,same_lane_ahead:!1};let a=cl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function yp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ll(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=ll(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of h){let M=r.get(k);M&&M!==u&&!b.includes(M)&&b.push(M)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...s.get(m)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let m=n.get(d);o(d,i)&&m&&u.push(m)}u.length>0&&a.set(i,u)}return a}function vp(e,t){return ll(e,t)}var wp=1,Hs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],dl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Xr={show_blocked:!0,spec:"all"},kp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Fh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Ar(r)||(n=typeof r.status=="string"?r.status:null);return n}function jh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Ar(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Bh(e,t){let{winners:n,resumed_from_ids:r}=pp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:En(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function $p(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function jt(e){return e&&typeof e=="object"?e:{}}function Uh(e,t,n){let r=jt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>hn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=xp(xr(l,o),xr(u,o)),m=xp(cr(l,null),cr(u,null));return d||m?{orchestration:d,worker:m}:null}function xp(e,t){return!e||t&&t.text===e.text?null:e}function Ap(e,t){let n=cl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Wh(e,t,n){let r=t.get(e);if(!r)return Ap(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return zs(r)}function zh(e,t,n,r){let s=t.get(e);if(!s)return{label:Ap(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":zs(s),title:""}}function Hh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Gh(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Kh(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((V,ce)=>{let U=V&&typeof V.bead_id=="string"?V.bead_id:"";if(U.length===0)return;let j=V&&typeof V.root_dir=="string"?V.root_dir:"",D=n.get(U),z=D?D.state:void 0,L=z==="running"||z==="pr_wait"||z==="done",I=!D||z==="runnable",ne=D&&D.lane==="parallel"&&typeof D.position=="number"?D.position-1:null,ke=zh(U,n,r,t),we=b.length>0?b[b.length-1].id:null,_e=m==="confirmed"&&we!==null&&!(t.get(U)||[]).includes(we);b.push({id:U,title:s.get(U)||U,root_dir:D?D.root_dir:j,workspace_name:D?D.workspace_name:o.get(j)||"",seq:ce+1,location_label:ke.label,location_title:ke.title,draggable:!L,fixed:L,done:z==="done",unplaced:I,mismatch:_e,...ne!==null?{queue_index:ne}:{}})}),b.forEach((V,ce)=>{V.seq=ce+1});let k=b.length>0&&b.every(V=>V.done),M=b.filter(V=>!V.fixed&&a.armed_by_bead.get(V.id)!==d).map(V=>V.id),B=Gh(d,m,b,k,M,a);i.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(V=>V.mismatch||V.unplaced),unlaunched:M,...B})}),i}function Vh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Yh(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:h}=Vh(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:m})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=a.get(d);m?m.push(l):a.set(d,[l])}let i=(l,u,d)=>{let m=u.cards[0],h={id:m.id,title:m.title,location_label:Wh(m.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=ma(l[u].scope,l[d].scope);m.length!==0&&(i(l[u],l[d],m),i(l[d],l[u],m))}}function ul(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Sa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Xr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Hs.some(E=>E.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&u.set(E.root_dir,E);let d=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&d.set(E.root_dir,E.name||E.root_dir);for(let E of r)E&&typeof E.root_dir=="string"&&d.set(E.root_dir,E.name||E.root_dir);let m=[],h=[],b=[],k=[],M=[],B=[],V=new Map,ce=new Map,U=new Map,j=new Map,D=new Map,z=new Map,L=new Map,I=new Set,ne=new Map,ke=new Map,we=new Map;for(let E of r){if(!E||typeof E.root_dir!="string")continue;let ue=E.root_dir,Ce=E.name||ue,Ue=u.get(ue),Je=Ue&&typeof Ue.revision=="number"?Ue.revision:typeof E.revision=="number"?E.revision:0,ot=jt(E.attempts),_t=jt(E.bead_titles);for(let[w,W]of Object.entries(_t))typeof W=="string"&&W.length>0&&we.set(w,W);let gt=jt(E.bead_times),X=jt(E.pr_observations),te=jt(E.admission),We=jt(E.revise_parked),ze=jt(E.merge_queue_state),De=jt(E.cleanup_failed),qe=jt(E.discard_operations),He=jt(E.bead_blocked_by);Object.hasOwn(E,"bead_scope")&&ne.set(ue,jt(E.bead_scope));let dt=jt(E.bead_workflow),ut=jt(E.pr_activity),pt=Array.isArray(E.repo_operations)?E.repo_operations:[],Ct=Array.isArray(E.merge_queue)?E.merge_queue:[],zt=new Set(Ct.filter(w=>w&&typeof w.bead_id=="string").map(w=>w.bead_id)),Ot=new Map(Ct.filter(w=>w&&typeof w.bead_id=="string").map(w=>[w.bead_id,w])),Dt=Array.isArray(E.queue)?E.queue:[];for(let w of[...Dt,...Array.isArray(E.pr_wait)?E.pr_wait:[]])w&&typeof w.bead_id=="string"&&typeof w.armed_by_lane=="string"&&w.armed_by_lane.length>0&&z.set(w.bead_id,w.armed_by_lane);for(let w of Array.isArray(E.disarmed_on_load)?E.disarmed_on_load:[])typeof w=="string"&&w.length>0&&I.add(w);let Et=(Array.isArray(E.serial_lanes)?E.serial_lanes:[]).filter(w=>w&&/^s[1-5]$/.test(w.id)&&Array.isArray(w.entries)),Xe=jt(E.lane_states),Ne=typeof E.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(E.serial_lane_count))):Math.min(5,Et.length);U.set(ue,Ne),j.set(ue,Dt.length);let P=new Map(Et.map(w=>[w.id,w])),J=new Map;for(let w of Et)for(let W of w.entries)W&&typeof W.bead_id=="string"&&J.set(W.bead_id,w.id);for(let[w,W]of Object.entries(He))Array.isArray(W)&&D.set(w,W.filter(le=>typeof le=="string"&&le.length>0));let he=Array.isArray(E.done)?E.done:[];for(let w of he)w&&typeof w.bead_id=="string"&&B.push({id:w.bead_id,root_dir:ue,workspace_name:Ce});let S=new Map;for(let w of he)w&&typeof w.bead_id=="string"&&typeof w.added_at=="number"&&S.set(w.bead_id,w.added_at);let G=w=>({id:w,title:_t[w]||w,root_dir:ue,workspace_name:Ce,expected_revision:Je,draggable:!1,...jt(gt[w]).created_at?{created_at:jt(gt[w]).created_at}:{},...jt(gt[w]).updated_at?{updated_at:jt(gt[w]).updated_at}:{}}),Re=w=>Object.hasOwn(He,w)?{blocked_by:Array.isArray(He[w])?He[w].filter(W=>typeof W=="string"&&W.length>0):[]}:{},$=new Set;for(let[w,W]of Bh(ot,S)){$.add(w);let le=W.run_state==="failed"?Hh(ot,W.attempt_id):null;le!==null&&L.set(w,le),h.push({...G(w),lane:"running",...Re(w),...J.has(w)?{serial_lane_id:J.get(w)}:{},attempt_id:W.attempt_id,run_state:W.run_state,status:W.status||void 0,workflow:dt[w]||null,can_pause:W.can_pause,can_resume:W.can_resume,started_at:W.started_at,last_event_at:W.last_event_at,last_activity:W.last_activity,legs:W.legs,runner:W.runner,model:W.model,effort:W.effort,speed:W.speed,resumed_from:W.resumed_from,continuation_mode:W.continuation_mode,usage:W.usage,exec_chips:{orchestration:Ps(W),worker:null},discard:qn(qe,w,{attempt_id:W.attempt_id}),badges:W.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:W.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:W.run_state==="failed"})}for(let[w,W]of dp(ot)){if(h.some(Fe=>Fe.id===w))continue;let le=W.attempt,Ke=W.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...G(w),lane:"running",kind:"session",...Re(w),attempt_id:typeof le.attempt_id=="string"?le.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[w]||null,can_pause:!1,can_resume:!1,started_at:W.started_at,last_event_at:typeof le.last_event_at=="number"?le.last_event_at:null,last_activity:le.last_activity&&typeof le.last_activity=="object"?le.last_activity:null,legs:Array.isArray(le.legs)?le.legs:[],runner:typeof le.runner=="string"?le.runner:null,model:typeof le.model=="string"?le.model:null,effort:typeof le.effort=="string"?le.effort:null,speed:typeof le.speed=="string"?le.speed:null,resumed_from:null,continuation_mode:null,usage:le.usage&&typeof le.usage=="object"?le.usage:null,exec_chips:{orchestration:Ps(le),worker:null},discard:qn(qe,w,{merge_queued:!0}),badges:[W.origin==="auto"?`${Ke} \xB7 \uC790\uB3D9`:Ke],alert:!1})}for(let w of Array.isArray(E.session_active)?E.session_active:[]){let W=w&&w.bead_id;typeof W!="string"||$.has(W)||($.add(W),Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&D.set(W,w.blocked_by.filter(le=>typeof le=="string"&&le.length>0)),typeof w.title=="string"&&w.title.length>0&&we.set(W,w.title),h.push({...G(W),title:w.title||_t[W]||W,lane:"running",kind:"session",status:"in_progress",started_at:ul(w.started_at)??ul(w.updated_at)??void 0,updated_at:ul(w.updated_at)??void 0,workflow:w.workflow||null,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(le=>typeof le=="string"&&le.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(w.session_refs)?w.session_refs:[],badges:[],alert:!1}))}for(let w of Array.isArray(E.pr_wait)?E.pr_wait:[]){let W=w&&w.bead_id;if(typeof W!="string"||$.has(W))continue;$.add(W);let le=jt(X[W]),Ke=jt(le.pr),Fe=le.gate?jt(le.gate):null,ye=zt.has(W),Tt=Ot.get(W)?.continuation_action||null,bt=!!Tt&&Tt.continuation===null,mt=ze.active===W,Yt=w.external===!0,Pt=De[W]||null,dn=jt(ut[W]),en=Ws({bead_id:W,merge_sha:w.merge_sha,cleanup_cursor:w.cleanup_cursor,merge_progress:dn.merge_progress||null,cleanup_failed:Pt,repo_operations:pt}),tn=Aa(en),Zt=!!Fe&&Fe.base_badge==="\uCDA9\uB3CC",Ze=!!Pt&&["child_sweep","branch_cleanup","parent_close"].includes(Pt.step)&&!!Fe&&Fe.tier==="merged",sn=Yt&&!!Pt&&!!Fe&&Fe.tier==="merged",on=!!Fe&&["closed_unmerged","review","undecidable"].includes(Fe.tier)&&Fe.reason!=="review_receipt_undetermined",st=qn(qe,W,{external:Yt,merge_active:mt||en?.step==="merge",merge_queued:ye,cleanup_active:tn,merged:!!Pt||Fe?.tier==="merged"}),Pe=!!st.operation;b.push({...G(W),lane:"pr_wait",...Re(W),workflow:dt[W]||null,pr_number:typeof Ke.number=="number"?Ke.number:null,pr_url:typeof Ke.url=="string"?Ke.url:void 0,external:Yt,usage:En(ot,W),merge_step:en,badges:bt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:en?[Fe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Pt?[Sr(Pt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Sr(Pt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Fe?.gate_badge=="string"&&Fe.gate_badge.length>0?[Fe.gate_badge]:[],alert:en?en.failed===!0:!!Pt||on,reason:Pt&&en?.active!==!0?xa(Pt.step):"PR \uB300\uAE30",merge_action:Fe?.tier==="merged"&&!Ze&&!sn?!1:!ye||bt,merge_enabled:!Pe&&(bt||Fe?.enabled===!0||Zt||Ze||sn),merge_label:bt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":sn||Ze?"\uC815\uB9AC \uC7AC\uAC1C":Zt&&!Ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:bt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Pe?st.error?`\uD3D0\uAE30 \uC2E4\uD328: ${st.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${st.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:sn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Zt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Fe?.enabled===!0?`\uBA38\uC9C0 (${Fe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Fe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ye&&!bt,cancel_enabled:!mt,continuation_mismatch:Tt?.mismatch||null,discard:st,discard_action:st.action,discard_enabled:st.enabled,discard_title:st.title})}let O=(w,W,le,Ke)=>{let Fe=w&&w.bead_id;if(typeof Fe!="string"||$.has(Fe))return null;$.add(Fe);let ye=We[Fe],Tt=qn(qe,Fe),bt=Tt.operation?Tt:null,mt={...G(Fe),lane:W,workflow:dt[Fe]||null,draggable:!bt,discard:bt||void 0,reason:$p(te,Fe),seq:le+1,queue_position:le+1,queue_index:le,queue_length:Ke,badges:ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ye,revise_action:!!ye,revise_enabled:!!ye&&!bt,revise_title:ye?ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Yt=Re(Fe);return Object.hasOwn(Yt,"blocked_by")&&(mt.blocked_by=Yt.blocked_by),mt};for(let w=0;w<Dt.length;w++){let W=O(Dt[w],"queue",w,Dt.length);if(!W)continue;k.push(W);let le=V.get(ue);le?le.push(W):V.set(ue,[W])}let Q=w=>{let W=b.find(ye=>ye.id===w&&ye.root_dir===ue);if(W)return{id:w,title:W.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let le=h.find(ye=>ye.id===w&&ye.root_dir===ue),Ke=le?le.run_state:Fh(ot,w),Fe=Ke==="failed"||Ke==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ke==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:w,title:le?le.title:G(w).title,badge:Fe}},me=[];for(let w=0;w<Math.max(Ne,Et.length);w++){let W=`s${w+1}`,le=P.get(W),Ke=le&&Array.isArray(le.entries)?le.entries:[],Fe=jt(Xe[W]),ye=Array.isArray(Fe.occupied_by)?Fe.occupied_by.filter(mt=>typeof mt=="string"):[],Tt=new Set(ye),bt=[];for(let mt=0;mt<Ke.length;mt++){let Yt=Ke[mt]&&Ke[mt].bead_id;if(typeof Yt=="string"&&Tt.has(Yt)){$.add(Yt);continue}let Pt=O(Ke[mt],W,mt,Ke.length);Pt&&(bt.push(Pt),k.push(Pt))}bt.length===0&&ye.length===0&&(Ne<=1||w>=Ne)||me.push({id:W,index:w,items:bt,raw_length:Ke.length,occupied_by:ye,occupants:ye.map(mt=>Q(mt)),corrections:Array.isArray(Fe.corrections)?Fe.corrections.length:0,cycle:Fe.cycle===!0,...bt.length===0&&ye.length===0?{empty:!0}:{}})}ce.set(ue,me);let xe=Array.from({length:Ne},(w,W)=>{let le=`s${W+1}`,Ke=P.get(le),Fe=Ke&&Array.isArray(Ke.entries)?Ke.entries:[],ye=jt(Xe[le]);return{id:le,index:Fe.length,length:Fe.length,occupied_by:Array.isArray(ye.occupied_by)?ye.occupied_by.filter(Tt=>typeof Tt=="string"):[]}});for(let w of Array.isArray(E.runnable)?E.runnable:[]){let W=w&&w.bead_id;if(typeof W!="string"||$.has(W))continue;$.add(W);let le=w.workflow&&typeof w.workflow=="object"?w.workflow:null,Ke=le&&typeof le.route=="string"&&le.route||(typeof w.route=="string"?w.route:null),Fe=Uh(jt(Ue),w.exec_pins,Ke);Array.isArray(w.blocked_by)&&w.blocked_by.length>0&&D.set(W,w.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof w.title=="string"&&w.title.length>0&&we.set(W,w.title),Array.isArray(w.scope)&&ke.set(W,w.scope.filter(ye=>typeof ye=="string"&&ye.length>0)),m.push({...G(W),title:w.title||_t[W]||W,lane:"runnable",draggable:!0,reason:$p(te,W),created_at:w.created_at??void 0,updated_at:w.updated_at??void 0,status:typeof w.status=="string"?w.status:void 0,labels:Array.isArray(w.labels)?w.labels:[],spec_id:typeof w.spec_id=="string"?w.spec_id:"",workflow:le||(Ke?{route:Ke,chips:{route:Ke}}:null),...Fe?{exec_chips:Fe}:{},blocked:w.blocked===!0,...Array.isArray(w.blocked_by)?{blocked_by:w.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},place_index:Dt.length,place_lanes:xe})}for(let w of he){let W=w&&w.bead_id;if(typeof W!="string"||$.has(W)||($.add(W),o!==void 0&&typeof w.added_at=="number"&&w.added_at<o))continue;let le=jh(ot,W),Ke=le&&typeof le.done_kind=="string"?le.done_kind:null;M.push({...G(W),lane:"done",done:!0,done_layout:"three_line",usage:En(ot,W),work_ms:ia(ot,W),done_at:typeof w.added_at=="number"?w.added_at:void 0,done_kind:Ke,badges:[...Ke&&kp[Ke]?[kp[Ke]]:[],...aa(ot,W)]})}}let _e=new Map;s.forEach((E,ue)=>{E&&typeof E.root_dir=="string"&&_e.set(E.root_dir,ue)});let ie=n&&n.running_sort==="repo"?"repo":"started";h.sort((E,ue)=>{let Ce=E.kind==="session",Ue=ue.kind==="session";if(Ce!==Ue)return Ce?1:-1;if(Ce&&Ue){let _t=Sa(ue.updated_at)-Sa(E.updated_at);return _t!==0?_t:E.id.localeCompare(ue.id)}if(ie==="repo"){let _t=_e.get(E.root_dir)??Number.MAX_SAFE_INTEGER,gt=_e.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(_t!==gt)return _t-gt}let Je=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,ot=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return Je!==null&&ot!==null&&Je!==ot?Je-ot:Je===null&&ot!==null?1:Je!==null&&ot===null?-1:E.id.localeCompare(ue.id)}),M.sort((E,ue)=>(ue.done_at??0)-(E.done_at??0));let Ee=s.length>0?s:r.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),Le=new Set(m.map(E=>E.root_dir)),$e=[];for(let E of Ee){if(!E||typeof E.root_dir!="string")continue;let ue=V.get(E.root_dir)||[],Ce=ce.get(E.root_dir)||[];!(ue.length>0||Ce.some(Je=>Je.items.length>0||Je.occupied_by.length>0))&&!Le.has(E.root_dir)||$e.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=wp?E.slots:wp,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:jt(E.runner_catalog),items:ue,sublanes:{parallel:ue,serial:Ce},serial_lane_count:U.get(E.root_dir)||0,raw_queue_length:j.get(E.root_dir)||0})}let ee={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:$e,running:h,pr_wait:b,done:M,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Z=bp(ee);for(let E of B)Z.has(E.id)||Z.set(E.id,{root_dir:E.root_dir,workspace_name:E.workspace_name,lane:"done",state:"done"});for(let E of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){if(!Object.hasOwn(E,"blocked_by"))continue;let ue=Z.get(E.id);E.blockers=(E.blocked_by||[]).map(Ce=>hp(Ce,ue,Z,s))}for(let E of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let ue=(E.blockers||[]).map(Ue=>il(E.id,Ue));if(ue.length===0)continue;let Ce={predecessors:ue};E.dependency_chips=Ce}Yh(ee,ne,ke,Z,s);let Se=yp(ee.queue_groups);for(let E of ee.queue_groups)for(let ue of E.sublanes.serial){let Ce=Se.get(vp(E.root_dir,ue.id));Ce&&(ue.cross_wait_peers=Ce)}ee.chain_lanes=Kh(i&&Array.isArray(i.lanes)?i.lanes:[],D,Z,s,we,d,{armed_by_bead:z,failed_by_bead:L,disarmed_lanes:I});let H=new Map;for(let E of[...ee.queue,...ee.runnable])H.has(E.id)||H.set(E.id,E);let oe=new Set;for(let E of ee.chain_lanes)for(let ue of E.rows){if(E.status==="confirmed"&&!ue.unplaced&&!ue.fixed&&oe.add(ue.id),!E.draft&&!ue.unplaced)continue;let Ce=H.get(ue.id);Ce&&(Ce.cross_lane_chip={lane_id:E.lane_id,number:E.number,status:E.status,label:E.draft?`\uC5F0\uACB0 ${E.number} (draft)`:`\uC5F0\uACB0 ${E.number}`})}let ge=new Map(ee.chain_lanes.map(E=>[E.lane_id,E.number]));for(let E of[...ee.queue,...ee.running]){let ue=z.get(E.id);if(typeof ue!="string"||ue.length===0)continue;let Ce=ge.get(ue);E.armed_lane_chip=Ce===void 0?{lane_id:ue,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ue,label:`\u25B6 \uC5F0\uACB0 ${Ce}`,orphan:!1}}let Ae=[];for(let E of V.values())for(let ue of E)oe.has(ue.id)||Ae.push(ue);Ae.sort((E,ue)=>{let Ce=E.workspace_name.localeCompare(ue.workspace_name);return Ce!==0?Ce:(E.queue_index??0)-(ue.queue_index??0)}),ee.parallel_rows=Ae;let Ve={};for(let[E,ue]of Z)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(Ve[E]=ue.root_dir);for(let E of ee.chain_lanes)for(let ue of E.rows)!Object.hasOwn(Ve,ue.id)&&ue.root_dir.length>0&&d.has(ue.root_dir)&&(Ve[ue.id]=ue.root_dir);ee.owner_of=Ve;let de=ee.runnable.length;ee.runnable_all=ee.runnable.slice();let Me=ee.runnable;a.show_blocked||(Me=Me.filter(E=>E.blocked!==!0));let At=Me.length;a.spec==="with"?Me=Me.filter(E=>!!E.spec_id):a.spec==="without"&&(Me=Me.filter(E=>!E.spec_id)),ee.runnable_hidden={blocked:de-At,spec:At-Me.length};let xt=(E,ue)=>{let Ce=Sa(ue.updated_at)-Sa(E.updated_at);return Ce!==0?Ce:E.id.localeCompare(ue.id)},ht=l==="repo_spec"?(E,ue)=>{let Ce=E.spec_id?0:1,Ue=ue.spec_id?0:1;return Ce!==Ue?Ce-Ue:xt(E,ue)}:xt;if(l==="updated_flat")ee.runnable=Me.slice().sort(xt),ee.runnable_sections=[];else{let E=new Map;for(let Ue of Me){let Je=E.get(Ue.root_dir);Je?Je.push(Ue):E.set(Ue.root_dir,[Ue])}let ue=[],Ce=[];for(let Ue of Ee){if(!Ue||typeof Ue.root_dir!="string")continue;let Je=(E.get(Ue.root_dir)||[]).slice().sort(ht);E.delete(Ue.root_dir),Je.length!==0&&(ue.push({root_dir:Ue.root_dir,name:Ue.name||Ue.root_dir,items:Je.map(ot=>({...ot,workspace_name:""}))}),Ce.push(...Je))}for(let[Ue,Je]of E){let ot=Je.slice().sort(ht);ue.push({root_dir:Ue,name:ot[0]?.workspace_name||Ue,items:ot.map(_t=>({..._t,workspace_name:""}))}),Ce.push(...ot)}ee.runnable=Ce,ee.runnable_sections=ue}return ee}var Sp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Zh=1e4;function Ep(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Tp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Lp="bdui.monitor.done-range",Ip="bdui.monitor.running_sort",Pp="bdui.monitor.candidate_sort",Mp="beads-ui.monitor.candidate-filter",Dp="beads-ui.monitor.sections";function Qh(){try{let e=window.localStorage.getItem(Mp);if(!e)return{...Xr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Xr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Xr.show_blocked,spec:dl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Xr}}}function Cp(e){try{window.localStorage.setItem(Mp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Xh(){try{let e=window.localStorage.getItem(Pp);return Hs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Jh(e){try{window.localStorage.setItem(Pp,e)}catch{}}function ey(){try{let e=window.localStorage.getItem(Dp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Rp(e){try{window.localStorage.setItem(Dp,JSON.stringify(e))}catch{}}function ty(){try{let e=window.localStorage.getItem(Lp);return e===null?"today":jn(e)}catch{return"today"}}function ny(e){try{window.localStorage.setItem(Lp,e)}catch{}}function ry(){try{return window.localStorage.getItem(Ip)==="repo"?"repo":"started"}catch{return"started"}}function sy(e){try{window.localStorage.setItem(Ip,e)}catch{}}var Np="tab:monitor:pipeline",oy=1e3,ay=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Op="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function iy(e){return e>=1&&e<=Op.length?Op[e-1]:`(${e})`}function qp(e,t){let n=Wt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),h=ty(),b=ry(),k=Qh(),M=Xh(),B=ey(),V=null,ce=null,U=null,j=null,D=[],z=null,L=null,I=null,ne=null;function ke(f){return ne===null&&(ne=sn()),Qd(f,ne)}function we(f,_){_e(),!(_<=0)&&(L={lane_id:f,corrected:_},I=setTimeout(()=>{I=null,L=null,w()},Zh))}function _e(){I!==null&&(clearTimeout(I),I=null),L=null}function ie(){let f=Ir.find(_=>_.value===h);return f?f.label:""}let Ee=document.createElement("div");Ee.className="mon",e.appendChild(Ee);let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let ee=document.createElement("div");ee.className="worker-drawer-host mon2-drawer",Le.append($e,ee),e.appendChild(Le);let Z=pl(null,null),Se=new Map,H=new Map,oe=null,ge=null,Ae=null,Ve=Gr(ee,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{V=null,Le.hidden=!0,w()}});async function de(f,_,y,x,K=!0){if(!o||!y)return null;let Y=await o(f,{..._,root_dir:y,expected_revision:x});if(Y&&Y.conflict&&K){Y.queue&&H.set(y,Y.queue);let se=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:x;Y=await o(f,{..._,root_dir:y,expected_revision:se})}return Y&&Y.queue&&y&&H.set(y,Y.queue),Y}function Me(f,_){let y=H.get(f),x=s&&s.get?s.get():null,K=(Array.isArray(x)?x:[]).find(se=>se?.root_dir===f);return(y||K)?.merge_queue?.find(se=>se.bead_id===_)?.continuation_action}async function At(f,_,y,x){let K=await de(f,_,y,x),Y=H.get(y)?.revision??K?.queue?.revision??x;return Kn(K,(se,be)=>de(f,{..._,continuation:se,decision_token:be},y,Y,!1),{refresh:se=>de(f,_,y,se?.queue?.revision??H.get(y)?.revision??Y,!1)})}async function xt(f,_,y,x){let K=await Kn({continuation_mismatch:x},(se,be)=>de("worker-merge-queue-add",{bead_id:_,continuation:se,decision_token:be},f,y,!1)),Y=K?.queue?.merge_queue?.find(se=>se.bead_id===_)?.continuation_action;K?.applied!==!0&&Y?.continuation===null&&Y.mismatch&&await xt(f,_,K.queue.revision,Y.mismatch)}async function ft(f,_,y){let x=await de("worker-discard",f,_,y);if(x&&x.discarded===!0){fe(ca(x),"success",5e3);return}if(x&&x.reason){fe(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){fe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){fe(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&fe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ht(f,_,y){return!o||!y?null:await o(f,{..._,root_dir:y})}async function E(){let f=new Map;for(let _ of Z.pr_wait)f.has(_.root_dir)||f.set(_.root_dir,_.expected_revision);for(let[_,y]of f)await de("worker-merge-queue-add-all",{},_,y)}function ue(f){let _=B[f];return!!(_&&_.runnable===!0)}function Ce(f){let _={...B[f]||{}};_.runnable=!_.runnable,B={...B,[f]:_},Rp(B),w()}function Ue(f){return B[f]===!0}function Je(f){B={...B,[f]:B[f]!==!0},Rp(B),w()}function ot(f){let _=Z.queue_groups.find(y=>y.root_dir===f);if(!_)return null;for(let y=0;y<_.serial_lane_count;y+=1){let x=`s${y+1}`,K=_.sublanes.serial.find(Y=>Y.id===x);if(!K||K.raw_length===0&&K.occupied_by.length===0)return x}return null}function _t(f,_){let y=Z.queue_groups.find(K=>K.root_dir===f),x=y?y.sublanes.serial.find(K=>K.id===_):void 0;return x?x.raw_length:0}function gt(f,_){let y=Se.get(f),x=Se.get(_);if(!y||!x)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let K=Ep(y),Y=Ep(x);if(K!==null&&K===Y&&y.root_dir===x.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let se=Tp(y),be=Tp(x);if(se&&Y!==null){let Ye=Y;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:f,lane:Ye,index:_t(x.root_dir,Ye)}]}}if(K!==null&&be&&Y===null){let Ye=K;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:_,lane:Ye,index:_t(y.root_dir,Ye)}]}}if(se&&K===null&&be&&Y===null){let Ye=ot(y.root_dir);return Ye===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ye} \uB808\uC778\uC5D0 ${_} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:_,lane:Ye,index:0},{bead_id:f,lane:Ye,index:1}]}}return!se&&!be?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:se?{kind:"note",text:`${Is(x.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Is(y.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function X(f,_){let y=gt(f,_.id);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:y.kind==="note"?{kind:"note",text:y.text}:y.kind==="disabled"?{kind:"disabled",label:Sp,title:y.title}:{kind:"place",label:Sp,title:y.title}}}function te(f,_){if(!U||U.bead_id!==f)return null;let y=U.counterpart_id,x=_.filter(K=>K.id===y);return x.length===0?null:{rows:x.map(K=>X(f,K))}}function We(f){let _=f.dependency_chips||null,y=f.overlap_chips||[],x=f.scope_state==="missing",K=f.cross_lane_chip,Y=f.armed_lane_chip;if(!_&&y.length===0&&!x&&!K&&!Y)return null;let se=te(f.id,y);return{..._||{},...y.length>0?{overlaps:y}:{},...x?{scope_missing:!0}:{},...K?{cross_lane:{lane_id:K.lane_id,label:K.label}}:{},...Y?{armed_lane:Y}:{},...se?{popover:se}:{}}}function ze(f){let _=We(f);return _?{...f,dependency_chips:_}:f}async function De(f,_){let y=gt(f,_);if(U=null,y.kind!=="ops"){w();return}let x=st(y.root_dir,y.ops[0].bead_id);for(let K of y.ops){let Y=await qe(K,y.root_dir,x);if(Y===null)break;x=Y}w()}async function qe(f,_,y){try{let x=await de("worker-queue-place",f,_,y,!1);if(x&&x.conflict)return fe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return fe(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let K=x.queue?x.queue.revision:void 0;return typeof K!="number"?(fe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):K}catch(x){return fe(mt(x),"error"),null}}function He(f){let _=ue(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${_?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${_?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${f.root_dir}>${f.name}</span>
      <span class="mon2-sec__count">${f.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function dt(f,_){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${_}
    </div>`}function ut(f){if(ce!==f.id)return null;let _=Z.queue_groups.find(Y=>Y.root_dir===f.root_dir),y=f.place_lanes||[],x=Z.cross_lanes_revision!==null,K=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let Y of Z.chain_lanes)K.push({id:`lane:${Y.lane_id}`,label:`\uC5F0\uACB0 ${Y.number} (${Y.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Y.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});K.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Y of y)K.push({id:`serial:${Y.id}`,label:`\uC9C1\uB82C ${Number(Y.id.slice(1))}`,count:Y.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:K}}function pt(){let f=[],_=new Set,y=(x,K)=>{for(let Y of x)_.has(Y.id)||(_.add(Y.id),f.push({bead_id:Y.id,root_dir:Y.root_dir,workspace_name:Y.workspace_name,title:Y.title,lane:K}))};return y(Z.running,"running"),y(Z.pr_wait,"pr_wait"),y(Z.queue,"queue"),y(Z.runnable_all,"runnable"),f}function Ct(f){if(!j||j.bead_id!==f)return"";let _=tn(),y=pt(),x=new Map;for(let be of y)x.set(be.bead_id,be);let K=(_.get(f)||[]).filter(be=>x.has(be)),Y=cp(lp(f,{issues:y,blocked_by_map:_}),j.query),se=Z.owner_of[f];return c`<div
      class="mon-deppanel"
      data-bead-id=${f}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${K.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${K.map(be=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${be}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${f}
                data-dep-b=${be}
                aria-label=${`${be} \uC5F0\uACB0 \uD574\uC81C`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${j.query}
      />
      <div class="mon-deppanel__list">
        ${Y.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:Y.map(be=>c`<button
                  type="button"
                  class="mon-deppanel__cand${be.disabled?" is-disabled":""}"
                  data-dep-cand=${be.bead_id}
                  ?disabled=${be.disabled}
                  title=${be.reason||be.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${be.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${be.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${be.title}</span
                  >${be.reason?c`<span class="mon-deppanel__cand-reason"
                        >${be.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${se===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function zt(f){return dt(f,c`${Gi(ze(f),ut(f),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(_,y)=>i(y,f.root_dir):void 0})}${Ct(f.id)}`)}function Ot(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(f=>zt(f))}
      </div>`:c`${Z.runnable_sections.map(f=>{let _=ue(f.root_dir);return c`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${He({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${_?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(y=>zt(y))}
            </div>`}
      </section>`})}`}function Dt(f,_){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${_}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${ar(ze(f))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${f.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${f.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${f.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${f.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${Ct(f.id)}
    </div>`}function Et(){let f=Ue("parallel");return c`<section
      class="mon2-area mon2-parallel${f?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${f?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${f?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${Z.parallel_rows.length}</span>
      </header>
      ${f?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${Z.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:Z.parallel_rows.map((_,y)=>Dt(_,y))}
          </div>`}
    </section>`}function Xe(f,_,y,x){return c`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${y}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${iy(_.seq)}</span
      >
      ${_.workspace_name?c`<span class="worker-mini__repo" title=${_.root_dir}
            >${_.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${_.id}</span>
      <span class="mon2-crow__title">${_.title}</span>
      ${_.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${x.includes(_.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${_.location_title}
        >${_.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${_.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function Ne(f){let _=Z.cross_lanes_revision!==null,y=ke(f.lane_id),x=y?.held===!0,K=y?.cycle===!0,Y=y?y.mismatched:[],se=L&&L.lane_id===f.lane_id?L.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${se>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${K?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${x?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${wa}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!_||!f.can_confirm||x}
              title=${x?wa:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!_}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!_}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!_}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!_}
          title=${f.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${f.lane_id}
      >
        ${f.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((be,Ye)=>Xe(f,be,Ye,Y))}
      </div>
    </div>`}function P(f,_,y){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${f.id}
      data-row-index=${y}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${ar(ze(_))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${_.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${Ct(_.id)}
    </div>`}function J(f){if(f.length===0)return"";let _=f.length-1;return`${f[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function he(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${ar({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function S(f,_){return c`<div
      class="mon2-lane${_.empty?" mon2-lane--empty":""}"
      data-root-dir=${f.root_dir}
      data-lane-length=${String(_.raw_length)}
    >
      ${Cn({id:"",lane:_.id,title:`${f.name} \xB7 \uC9C1\uB82C ${_.index+1}`,items:_.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${f.root_dir}
          data-lane-id=${_.id}
          data-lane-length=${String(_.raw_length)}
        >
          ${_.occupants.map(y=>he(y))}
          ${_.items.length>0?_.items.map((y,x)=>P(_,y,x)):_.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${_.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${_.occupants.length>0?_.occupants.map(y=>`${y.id} \u2014 ${y.badge}`).join(`
`):""}
            >${J(_.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${f.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${_.empty?c`<div class="mon2-lane__hint">
            ${f.name} 직렬 ${_.index+1} 비어 있음
          </div>`:""}
      ${_.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(_.cross_wait_peers||[]).map(y=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function G(){let f=Ue("serial"),_=Z.cross_lanes_revision!==null,y=Z.chain_lanes.some(x=>x.draft&&x.rows.length===0);return c`<section
      class="mon2-area mon2-serial${f?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${f?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${f?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${y||!_}
          title=${_?y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${f?"":c`<div class="mon2-area__body">
            ${Z.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${Z.chain_lanes.map(x=>Ne(x))}
            ${Z.queue_groups.map(x=>x.sublanes.serial.map(K=>S(x,K)))}
          </div>`}
    </section>`}function Re(){return c`<div class="mon2-wait">${Et()}${G()}</div>`}function $(f){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(_=>Zi({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:_.can_resume!==!1,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,discard:_.discard},f,V,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:We(_)}}))}
    </div>`}function O(f){let _={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ay.map(y=>{let x=_[y.lane],K=y.lane==="runnable"?Z.runnable_flat?x.length>0?Ot():void 0:Z.runnable_sections.length>0?Ot():void 0:y.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Re():void 0:y.lane==="running"?$(f):x.length>0?c`${x.map(Y=>ar(Y))}`:void 0;return Cn({id:`monitor-${y.lane}`,lane:y.pane,title:y.lane==="done"?`\uC644\uB8CC\xB7${ie()}`:y.title,items:x,empty:y.empty,body:K,live:y.lane==="running"&&x.length>0,controls:y.lane==="runnable"?Q():void 0,header_control:me(y.lane,x.length)})})}
      </div>`}function Q(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${dl.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function me(f,_){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${M}
      >
        ${Hs.map(y=>c`<option
              value=${y.value}
              ?selected=${M===y.value}
            >
              ${y.label}
            </option>`)}
      </select>`:f==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:f==="pr_wait"&&_>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Ir.map(y=>c`<option value=${y.value} ?selected=${h===y.value}>
              ${y.label}
            </option>`)}
      </select>`:""}function xe(f){let _=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,K={done_since:br(h,d()),running_sort:b,candidate_filter:k,candidate_sort:M};return x!==void 0&&(K.cross_lanes=x),pl(_,y,K)}function w(){let f=d();Z=xe(),ne=null,Se=new Map;for(let _ of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!_.non_occupying&&!Se.has(_.id)&&Se.set(_.id,_);it(O(f),Ee),le()?.render(),W(),Ke()}function W(){let f=new Map;for(let _ of Z.queue_groups)f.set(_.root_dir,_.auto_advance);for(let _ of Array.from(Ee.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let y=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=f.get(y);typeof x=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function le(){if(Ae)return Ae;let f=Ee.querySelector(".mon2-deck");return f?(Ae=Yd(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ie,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:ye,onFocusChange:_=>{z=_,Ke()}}),Ae):null}function Ke(){Ee.classList.toggle("has-focus",z!==null);for(let f of Array.from(Ee.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",z!==null&&f.getAttribute("data-root-dir")===z);for(let f of Array.from(Ee.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=Se.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",z!==null&&!!_&&_.root_dir===z)}for(let f of Array.from(Ee.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",z!==null&&f.getAttribute("data-root-dir")===z)}function Fe(f,_){let y=a?a():void 0;if(!_||!y||_===y||!l){r(f);return}l(_).then(()=>{r(f)}).catch(x=>{n("workspace switch for %s failed: %o",_,x)})}function ye(f){if(!f)return;let _=a?a():void 0,y=()=>{try{u?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!l||_&&_===f){y();return}l(f).then(y).catch(x=>{n("workspace switch for %s failed: %o",f,x),fe("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Tt(f){kn(f).then(_=>{fe(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function bt(f){let _=Se.get(f)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}function mt(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let _=f;if(typeof _.message=="string"&&_.message.length>0)return _.message;if(typeof _.error=="string"&&_.error.length>0)return _.error;if(_.error&&typeof _.error=="object"&&typeof _.error.message=="string")return _.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Yt(f,_,y){let x=Z.owner_of[_];if(typeof x!="string"||x.length===0){fe(`${_}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await ht(f,{a:_,b:y},x),await Pt(f,_,y)}catch(K){fe(mt(K),"error")}w()}async function Pt(f,_,y){if(f!=="dep-add")return;let x=Z.chain_lanes.find(K=>K.rows.some(Y=>Y.id===_));!x||!x.rows.some(K=>K.id===y)||await kt(K=>rp(x.lane_id,K),"",[{type:f,a:_,b:y}])}function dn(f){return Z.runnable.some(_=>_.id===f)||Z.parallel_rows.some(_=>_.id===f)?!0:Z.queue_groups.some(_=>_.sublanes.serial.some(y=>y.items.some(x=>x.id===f)))}function en(f){!f||!dn(f)||(j=j&&j.bead_id===f?null:{bead_id:f,query:""},w())}function tn(){let f=new Map,_=s&&s.get?s.get():null,y=x=>Array.isArray(x)?x.filter(K=>typeof K=="string"&&K.length>0):[];for(let x of Array.isArray(_)?_:[]){if(!x||typeof x!="object")continue;let K=x.bead_blocked_by&&typeof x.bead_blocked_by=="object"?x.bead_blocked_by:{};for(let[Y,se]of Object.entries(K))Array.isArray(se)&&f.set(Y,y(se));for(let Y of[...Array.isArray(x.runnable)?x.runnable:[],...Array.isArray(x.session_active)?x.session_active:[]])Y&&typeof Y.bead_id=="string"&&Array.isArray(Y.blocked_by)&&Y.blocked_by.length>0&&f.set(Y.bead_id,y(Y.blocked_by))}return f}function Zt(){let f=new Map,_=new Map,y=s&&s.get?s.get():null,x=K=>Array.isArray(K)?K.filter(Y=>typeof Y=="string"&&Y.length>0):[];for(let K of Array.isArray(y)?y:[]){if(!K||typeof K!="object")continue;let Y=K.bead_blocked_by&&typeof K.bead_blocked_by=="object"?K.bead_blocked_by:{};for(let[se,be]of Object.entries(Y))Array.isArray(be)&&f.set(se,x(be));for(let se of Array.isArray(K.runnable)?K.runnable:[])se&&typeof se.bead_id=="string"&&Array.isArray(se.blocked_by)&&_.set(se.bead_id,x(se.blocked_by))}for(let K of D)for(let Y of[f,_]){let se=Y.get(K.a);se!==void 0&&Y.set(K.a,K.type==="dep-remove"?se.filter(be=>be!==K.b):se.includes(K.b)?se:[...se,K.b])}return{snapshot:f,runnable:_}}function Ze(){let f=tn();for(let _ of D){let y=(f.get(_.a)||[]).slice();_.type==="dep-remove"?f.set(_.a,y.filter(x=>x!==_.b)):y.includes(_.b)||f.set(_.a,[...y,_.b])}return f}function sn(f=Z,_=on()){let y=new Map;for(let lt of Array.isArray(_?.lanes)?_.lanes:[]){let Oe=new Map;for(let Qe of Array.isArray(lt?.entries)?lt.entries:[])Qe&&typeof Qe.bead_id=="string"&&Oe.set(Qe.bead_id,Qe.dep_created_by_lane===!0);y.set(typeof lt?.id=="string"?lt.id:"",Oe)}let x=new Map,K=new Map,Y=new Set,se=new Set;for(let lt of f.chain_lanes){let Oe=y.get(lt.lane_id);x.set(lt.lane_id,{status:lt.status,entries:lt.rows.map((Qe,nn)=>({bead_id:Qe.id,root_dir:Qe.root_dir,...nn===0?{}:{dep_created_by_lane:Oe?.get(Qe.id)===!0}}))});for(let Qe of lt.rows)K.set(Qe.id,lt.lane_id),Qe.fixed&&Y.add(Qe.id),Qe.unplaced||se.add(Qe.id)}let be=new Map;for(let lt of f.parallel_rows)typeof lt.queue_index=="number"&&be.set(lt.id,lt.queue_index);for(let lt of f.queue_groups)for(let Oe of lt.sublanes.serial)for(let Qe of Oe.items)typeof Qe.queue_index=="number"&&be.set(Qe.id,Qe.queue_index);let Ye=Zt();return{blocked_by_map:Ze(),snapshot_blocked_by:Ye.snapshot,runnable_blocked_by:Ye.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:x,owner_lane_of:K,fixed_members:Y,placed_members:se,parallel_rows:f.parallel_rows.map(lt=>({bead_id:lt.id,root_dir:lt.root_dir,queue_index:lt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:be}}function on(){return(s&&s.crossLanes?s.crossLanes():null)??null}function st(f,_){let y=Se.get(_);if(y&&y.root_dir===f)return y.expected_revision;let x=Z.queue_groups.find(K=>K.root_dir===f);return x?x.revision:0}async function Pe(f,_,y){if(f.type==="worker-queue-disarm"){try{let x=await de(f.type,f.payload,f.root_dir,y.get(f.root_dir)??st(f.root_dir,_));x&&x.queue&&typeof x.queue.revision=="number"&&y.set(f.root_dir,x.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await C(f.type,f.payload,f.root_dir,y,{bead_id:_})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await ht(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch(x){return fe(mt(x),"error"),!1}}async function C(f,_,y,x,K){try{let Y=await de(f,_,y,x.get(y)??st(y,K.bead_id));return!Y||typeof Y.applied!="boolean"?(fe("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(Y.queue&&typeof Y.queue.revision=="number"&&x.set(y,Y.queue.revision),Y.conflict?(fe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):Y.applied===!1?(fe(Y.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${Y.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:x.get(y)??0)}catch(Y){return fe(mt(Y),"error"),null}}function ve(f){(f.type==="dep-add"||f.type==="dep-remove")&&(D=[...D,{type:f.type,a:f.a,b:f.b}])}async function Be(f,_){if(!o)return{ok:!1};try{let y=await o(f.type,{...f.payload,expected_revision:_});return!y||typeof y.revision!="number"?(fe("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:y.revision}}catch(y){let x=y,K=x&&x.code==="conflict"?x.details?.cross_lanes:null;return K&&typeof K.revision=="number"&&Array.isArray(K.lanes)?{ok:!1,conflict:K}:(fe(mt(y),"error"),{ok:!1})}}async function wt(f,_,y){let x=new Map,K=[],Y=f.ops.slice(0,f.lane_op_index),se=f.ops.slice(f.lane_op_index);for(let Ye of Y){if(!await Pe(Ye,y,x))return{done:!0};ve(Ye)}let be=_;for(let Ye of f.lane_ops){if(be===null)return fe("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let lt=await Be(Ye,be);if(!lt.ok)return lt.conflict?{done:!1,conflict:lt.conflict}:{done:!0};be=lt.revision}for(let Ye of se){if(!await Pe(Ye,y,x))return{done:!0};ve(Ye),Ye.type==="dep-add"&&K.push(Ye)}for(let Ye of ap(K))be=await Nt(Ye,be);return{done:!0}}async function Nt(f,_){if(_===null||!o)return _;let y=f.pairs,x=_;for(let K=0;K<2;K+=1){if(y.length===0)return x;try{let Y=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:y.map(se=>({bead_id:se.bead_id,after:se.after,value:!0})),expected_revision:x});return Y&&typeof Y.revision=="number"?Y.revision:x}catch(Y){let se=Y,be=se&&se.code==="conflict"?se.details?.cross_lanes:null;if(!be||typeof be.revision!="number"||!Array.isArray(be.lanes))return x;let Ye=be.lanes.find(lt=>lt&&lt.id===f.lane_id);y=ip(Array.isArray(Ye?.entries)?Ye.entries:[],y),x=be.revision}}return x}async function kt(f,_,y=[]){D=y,_e();let x=Z,K=on();for(let Y=0;;Y+=1){let se=f(sn(x,K));if("refused"in se){fe(se.refused,"error");break}let be=await wt(se,x.cross_lanes_revision,_);if(be.done){se.correction&&we(se.correction.lane_id,se.correction.corrected);break}if(Y>=1){fe("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}x=xe(be.conflict),K=be.conflict}D=[],w()}async function qt(f,_){await kt(y=>rl(f,_,y),f.bead_id)}async function Qt(f,_){if(f==="run"){await vn(_);return}if(f==="stop"){await Bt(_);return}if(f==="create"){await kt(y=>sl(null,y),"");return}if(f==="remove"){let y=op(_,sn());if(y!==null&&!m(y))return;await kt(x=>sp(_,x),"");return}await kt(y=>f==="confirm"?tp(_,y):np(_,y),"")}function an(f){let _=new Map;for(let y of f.rows){let x=Z.owner_of[y.id]||y.root_dir;typeof x!="string"||x.length===0||_.set(x,[..._.get(x)||[],y.id])}return _}async function vn(f){let _=Z.chain_lanes.find(Y=>Y.lane_id===f);if(!_||Z.cross_lanes_revision===null){w();return}_e();let y=new Map,x=new Map,K=an(_);for(let Y of _.rows){if(!Y.unplaced)continue;let se=Z.owner_of[Y.id]||Y.root_dir;if(typeof se!="string"||se.length===0){fe(`${Y.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),w();return}let be=x.get(se)??0;if(await C("worker-queue-place",{bead_id:Y.id,lane:"parallel",index:(Z.parallel_raw_length[se]??0)+be},se,y,{bead_id:Y.id})===null){w();return}x.set(se,be+1)}for(let[Y,se]of K)if(await C("worker-queue-arm",{bead_ids:se,lane_id:f},Y,y,{bead_id:se[0]})===null){fe("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),w();return}w()}async function Bt(f){let _=Z.chain_lanes.find(x=>x.lane_id===f);if(!_||Z.cross_lanes_revision===null){w();return}_e();let y=new Map;for(let[x,K]of an(_))if(await C("worker-queue-disarm",{lane_id:f},x,y,{bead_id:K[0]})===null)break;w()}async function wn(f,_){let{root_dir:y,revision:x}=bt(f);if(y.length===0){w();return}await C("worker-queue-disarm",{bead_ids:[f],lane_id:_},y,new Map([[y,x]]),{bead_id:f}),w()}async function An(f,_){let y=Se.get(f);if(!y){w();return}let x={kind:"candidate",bead_id:f,root_dir:y.root_dir};if(_==="new-lane"){await kt(K=>sl({bead_id:f,root_dir:y.root_dir},K),f);return}if(_.startsWith("lane:")){let K=_.slice(5);if(!Z.chain_lanes.find(se=>se.lane_id===K)){w();return}await kt(se=>rl(x,{kind:"chain",lane_id:K,marker_index:(se.cross_lanes.get(K)?.entries??[]).length},se),f);return}if(_.startsWith("serial:")){let K=_.slice(7),Y=(y.place_lanes||[]).find(se=>se.id===K);await qt(x,{kind:"repo-serial",root_dir:y.root_dir,lane_id:K,index:Y?Y.index:0});return}await qt(x,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function zn(f,_){let y=Z.parallel_rows,x=y.findIndex(lt=>lt.id===f);if(x<0)return;let K=y[x].root_dir,Y=[];y.forEach((lt,Oe)=>{lt.root_dir===K&&Y.push(Oe)});let se=Y.indexOf(x),be=Y[se+_];if(typeof be!="number")return;let Ye=_===-1?be:Y[se+2]??Math.min(y.length,be+1);await qt({kind:"parallel",bead_id:f,root_dir:K,queue_index:y[x].queue_index??0},{kind:"parallel",marker_index:Ye})}async function T(f){for(let _ of Z.chain_lanes){let y=_.rows.find(x=>x.id===f);if(y){await qt({kind:"chain",bead_id:f,root_dir:y.root_dir,lane_id:_.lane_id,...typeof y.queue_index=="number"?{queue_index:y.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let R=null,je=!1,p=null;function v(){p!==null&&clearTimeout(p),p=setTimeout(()=>{p=null,je=!1},0)}function N(f,_){let y=_&&typeof _.closest=="function"?_.closest("[data-row-index]"):null;if(y&&f.contains(y)){let x=Number(y.getAttribute("data-row-index"));return Number.isFinite(x)?x:0}return f.querySelectorAll("[data-row-index]").length}function re(f){let _=f.target,y=typeof _?.closest=="function"?_.closest("[data-drop]"):null;if(!y||!R)return null;let x=y.getAttribute("data-drop");if(x==="candidate")return{zone:y,target:{kind:"candidate"}};if(x==="parallel")return{zone:y,target:{kind:"parallel",marker_index:N(y,_)}};if(x==="chain")return{zone:y,target:{kind:"chain",lane_id:y.getAttribute("data-lane-id")||"",marker_index:N(y,_)}};if(x==="repo-serial"){let K=y.getAttribute("data-root-dir")||"";if(K!==R.root_dir)return null;let Y=typeof _?.closest=="function"?_.closest("[data-queue-index]"):null,se=Y&&y.contains(Y)?Y.getAttribute("data-queue-index"):y.getAttribute("data-lane-length"),be=Number(se);return{zone:y,target:{kind:"repo-serial",root_dir:K,lane_id:y.getAttribute("data-lane-id")||"",index:Number.isFinite(be)?be:0}}}return null}function Ie(){for(let f of Array.from(Ee.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}function ct(f){let _=f.target,y=typeof _?.closest=="function"?_.closest('[draggable="true"][data-bead-id]'):null,x=y?y.closest("[data-drag-kind]"):null;if(!x)return;let K=x.getAttribute("data-bead-id")||"",Y=x.getAttribute("data-drag-kind")||"",se=x.getAttribute("data-root-dir")||"";if(!K||!Y||!se)return;let be=x.getAttribute("data-queue-index")||"",Ye=Number(be),lt=x.getAttribute("data-lane-id")||"";R={kind:Y,bead_id:K,root_dir:se,...be!==""&&Number.isFinite(Ye)?{queue_index:Ye}:{},...lt?{lane_id:lt}:{}},je=!0,ce=null,Ee.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",K),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function at(f){let _=re(f);_&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),_.zone.classList.add("is-drop-over"))}function Ut(f){let _=f.target;typeof _?.closest=="function"&&_.closest("[data-drop]")?.classList.remove("is-drop-over")}function Jt(){R=null,Ie(),Ee.classList.remove("is-dragging"),v()}function nt(f){let _=re(f),y=R;R=null,Ie(),Ee.classList.remove("is-dragging"),!(!_||!y)&&(f.preventDefault(),qt(y,_.target))}function A(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function ae(f,_){let{item:y,root_dir:x,revision:K}=bt(_),Y=y?.attempt_id||"",se=f.classList;if(se.contains("mon2-rowops__up")||se.contains("mon2-rowops__down")){zn(_,se.contains("mon2-rowops__up")?-1:1);return}if(se.contains("mon2-rowops__remove")){de("worker-queue-remove",{bead_id:_},x,K);return}if(se.contains("mon2-crow__detach")){T(_);return}if(se.contains("mon-dep__btn")){en(_);return}if(se.contains("worker-dep__open")){en(_);return}if(se.contains("mon2-arm__release")){wn(_,f.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let be=f.getAttribute("data-lane-id")||"";Ee.querySelector(`.mon2-clane[data-lane-id="${be}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("mon-deppanel__unlink")){let be=f.getAttribute("data-dep-a")||"",Ye=f.getAttribute("data-dep-b")||"";m(`${Ye}\uAC00 ${be}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Yt("dep-remove",be,Ye);return}if(se.contains("mon-deppanel__cand")){let be=f.getAttribute("data-dep-cand")||"";j&&be&&Yt("dep-add",j.bead_id,be);return}if(se.contains("mon-overlap__chip")){let be=f.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===_&&U.counterpart_id===be?null:{bead_id:_,counterpart_id:be},w();return}if(se.contains("mon-overlap__place")){De(_,f.getAttribute("data-counterpart-id")||"");return}if(se.contains("worker-card__place")){ce=ce===_?null:_,w();return}if(se.contains("worker-card__place-cancel")){ce=null,w();return}if(se.contains("worker-card__place-lane")){let be=f.getAttribute("data-lane")||"parallel";ce=null,An(_,be);return}if(se.contains("rtile__session")){if(y&&y.kind==="session"){let be=(y.session_refs||[]).find(Ye=>Ye&&Ye.current===!0);be&&(Le.hidden=!1,Ve.open(Ro(be,_,"in_progress",x)),w());return}V=Y,Y&&y&&(Le.hidden=!1,Ve.open({attempt_id:Y,root_dir:x,meta:A(y)})),w();return}if(se.contains("rtile__pause")){ht("worker-attempt-pause",{attempt_id:Y},x);return}if(se.contains("rtile__resume")){Br().then(be=>{if(be!==null)return At("worker-attempt-resume",{attempt_id:Y,...be!==""?{instructions:be}:{}},x,K)});return}if(se.contains("rtile__dismiss")){de("worker-attempt-dismiss",{attempt_id:Y},x,K);return}if(se.contains("rtile__discard")){if(!m(Ls(_,"unmerged")))return;ft({bead_id:_,...Y?{attempt_id:Y}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},x,K);return}if(se.contains("worker-mini__merge")){let be=Me(x,_);be?.mismatch&&be.continuation===null?xt(x,_,K,be.mismatch):de("worker-merge-queue-add",{bead_id:_},x,K);return}if(se.contains("worker-mini__merge-cancel")){de("worker-merge-queue-remove",{bead_id:_},x,K);return}if(se.contains("worker-mini__discard")){let be=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ls(_,be)))return;ft({bead_id:_,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},x,K);return}if(se.contains("worker-mini__revise-fix")){At("worker-revise-fix",{bead_id:_},x,K);return}se.contains("worker-mini__revise-approve")&&de("worker-revise-approve",{bead_id:_},x,K)}function q(f){let _=je;je=!1;let y=f.target;if(!y||typeof y.closest!="function"||y.closest("dialog")||y.closest(".worker-drawer-overlay")||y.closest("a"))return;let x=y.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){f.preventDefault();let Rn=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";Rn&&Tt(Rn);return}let K=y.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(K){f.preventDefault();let nn=K.getAttribute("data-root-dir")||Se.get(y.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||K.getAttribute("title")||"";ye(nn);return}let Y=y.closest(".mon2-sec__toggle");if(Y){f.preventDefault(),Ce(Y.getAttribute("data-root-dir")||"");return}let se=y.closest(".mon2-area__toggle");if(se){f.preventDefault(),Je(se.getAttribute("data-area")||"parallel");return}if(y.closest(".mon2-newlane")){f.preventDefault(),Qt("create","");return}let be=y.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(be){f.preventDefault();let nn=be.getAttribute("data-lane-id")||"",Rn=be.classList;Qt(Rn.contains("mon2-clane__confirm")?"confirm":Rn.contains("mon2-clane__reapply")?"reapply":Rn.contains("mon2-clane__run")?"run":Rn.contains("mon2-clane__stop")?"stop":"remove",nn);return}if(y.closest(".mon-merge-all")){f.preventDefault(),E();return}let Ye=y.closest(".mon-filter__spec");if(Ye){f.preventDefault(),k={...k,spec:Ye.getAttribute("data-spec")||"all"},Cp(k),w();return}let lt=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!lt)return;let Oe=lt.getAttribute("data-bead-id")||"",Qe=y.closest("button");if(Qe){f.preventDefault(),ae(Qe,Oe);return}Oe&&!_&&(f.preventDefault(),Fe(Oe,lt.getAttribute("data-root-dir")||bt(Oe).root_dir))}function Te(f){let _=f.target;if(!_||typeof _.closest!="function")return;let y=_.closest(".mon-filter__blocked");if(y){k={...k,show_blocked:y.checked},Cp(k),w();return}let x=_.closest(".mon-candidate-sort");if(x){M=Hs.some(se=>se.value===x.value)?x.value:"repo_spec",Jh(M),w();return}let K=_.closest(".mon-running-sort");if(K){b=K.value==="repo"?"repo":"started",sy(b),w();return}let Y=_.closest(".mon-done-range");Y&&(h=jn(Y.value),ny(h),w())}function yt(f){let _=f.target,y=_&&typeof _.closest=="function"?K=>_.closest(K):()=>null,x=!1;U&&!y(".mon-overlap__popover, .mon-overlap__chip")&&(U=null,x=!0),j&&!y(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(j=null,x=!0),x&&w()}function et(f){f.key!=="Escape"||!U&&!j||(U=null,j=null,w())}function $t(f){let _=f.target;!_||typeof _.closest!="function"||!_.closest(".mon-deppanel__search")||!j||(j={...j,query:_.value},w())}e.addEventListener("click",q),e.addEventListener("change",Te),e.addEventListener("input",$t),document.addEventListener("click",yt),document.addEventListener("keydown",et),e.addEventListener("dragstart",ct),e.addEventListener("dragover",at),e.addEventListener("dragleave",Ut),e.addEventListener("drop",nt),e.addEventListener("dragend",Jt),s&&typeof s.subscribe=="function"&&(oe=s.subscribe(()=>{try{H.clear(),w()}catch{}}));function rt(){ge!==null&&(clearInterval(ge),ge=null)}function Ht(){p!==null&&(clearTimeout(p),p=null)}return{load(){n("load"),w(),ge===null&&(ge=setInterval(()=>{try{w()}catch{}},oy))},pause(){rt()},clear(){rt(),Ht(),oe&&(oe(),oe=null),Ve.destroy(),Le.hidden=!0,Ae?.destroy(),Ae=null,e.removeEventListener("click",q),e.removeEventListener("change",Te),e.removeEventListener("input",$t),document.removeEventListener("click",yt),document.removeEventListener("keydown",et),e.removeEventListener("dragstart",ct),e.removeEventListener("dragover",at),e.removeEventListener("dragleave",Ut),e.removeEventListener("drop",nt),e.removeEventListener("dragend",Jt),e.replaceChildren()}}}function Fp(e,t,n){let r=Wt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let k=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function m(){s&&it(u(),s),o&&it(d(),o)}return m(),a=t.subscribe(()=>m()),{destroy(){a&&(a(),a=null),s&&it(c``,s),o&&it(c``,o)}}}var jp=["bug","feature","task","epic","chore"];function Bp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Up=["Critical","High","Medium","Low","Backlog"];function Wp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let z of jp){let L=document.createElement("option");L.value=z,L.textContent=Bp(z),o.appendChild(L)}a.replaceChildren();for(let z=0;z<=4;z+=1){let L=document.createElement("option");L.value=String(z);let I=Up[z]||"Medium";L.textContent=`${z} \u2013 ${I}`,a.appendChild(L)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function M(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,l.disabled=D,d.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function B(){u.textContent=""}function V(D){u.textContent=D}function ce(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let z=window.localStorage.getItem("beads-ui.new.priority");z&&/^\d$/.test(z)?a.value=z:a.value="2"}catch{o.value="",a.value="2"}}function U(){let D=o.value||"",z=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),z.length>0&&window.localStorage.setItem("beads-ui.new.priority",z)}async function j(){B();let D=String(s.value||"").trim();if(D.length===0){V("Title is required"),s.focus();return}let z=Number(a.value||"2");if(!(z>=0&&z<=4)){V("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),I=String(l.value||""),ne={title:D};L.length>0&&(ne.type=L),String(z).length>0&&(ne.priority=z),I.length>0&&(ne.description=I),M(!0);try{await t("create-issue",ne)}catch{M(!1),V("Failed to create issue");return}U(),M(!1),k()}return n.addEventListener("cancel",D=>{D.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),j())}),r.addEventListener("submit",D=>{D.preventDefault(),j()}),{open(){r.reset(),B(),ce();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var ly=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function cy(e,t){return Ja(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function zp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=cy(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Hp(e,t,n){return c`
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
  `}function Gp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ly.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var uy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Kp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ie=>fe(ie,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function m(){if(d)return d;let ie=a.querySelector('[data-pane="execution"]');return ie?(d=ha(ie,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function h(){return c`
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
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function b(){let ie=r.get();return c`
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
        ${ie?c`
              ${zp(ie,s(),V)}
              ${Hp(ie,u,{onDraft:Ee=>{u=Ee},onAdd:ce,onRemove:U})}
              ${Gp(ie,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ie){let Ee=r.get();if(Ee)try{let Le=await n("display-policy-set",{expected_revision:Ee.revision,policy:ie(Ee)});M(Le),Le&&Le.conflict&&Le.policy&&(Le=await n("display-policy-set",{expected_revision:Le.policy.revision,policy:ie(Le.policy)}),M(Le)),Le&&Le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(ie){ie&&ie.policy&&typeof ie.policy=="object"&&r.set(ie.policy)}function B(ie){k(ie)}function V(ie){let Ee=r.get();if(!Ee)return;let Le=!dy(ie,Ee);B($e=>py(ie,$e,Le))}function ce(){let ie=u.trim();ie.length!==0&&(u="",B(Ee=>Ee.hidden_prefixes.includes(ie)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,ie]}),D())}function U(ie){B(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(Le=>Le!==ie)}))}function j(ie){let Ee=r.get();if(!Ee)return;let Le=Ee.chips[ie]===!1;B(()=>({chips:{[ie]:Le}}))}function D(){it(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${uy.map(ie=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ie.id}
                  aria-selected=${String(i===ie.id)}
                  aria-controls=${`settings-pane-${ie.id}`}
                  @click=${()=>z(ie.id)}
                >
                  <span class="settings-dialog__glyph">${ie.glyph}</span>
                  ${ie.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${_e}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),m()}function z(ie){i=ie,D()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let I=ie=>{ie.target===a&&_e()};a.addEventListener("click",I);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{l&&D()}));let ke=null;t.implPresetStore?.subscribe&&(ke=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function we(ie="execution"){l||(l=!0,t.onOpenChange?.(!0),i=ie,u="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),m()?.load())}function _e(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:we,close:_e,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",I),ne&&(ne(),ne=null),ke&&(ke(),ke=null),d?.destroy(),d=null,a.remove()}}}function dy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var fy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Vp="usage-meter-card",_y="usage-meter-layer",fl=600,my=["token_expired","relogin_required"];function Yp(e){return String(e).padStart(2,"0")}function gy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Zp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Yp(r.getHours())}:${Yp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${fy[r.getMonth()]} ${r.getDate()} ${o}`;return`${gy(n,t)} \xB7 ${i}`}function by(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Qp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Xp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Jp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function tf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function hy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:tf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function yy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=hy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?tf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function vy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=yy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function nf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function wy(e,t){return!e.held||nf(e,t)<=fl?e:{...e,available:!1,windows:[],accounts:[]}}function ef(e,t){return`${e}:${t}`}function rf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){it(c``,e),e.hidden=!0,m()}function d(){if(l===null){let $e=e.ownerDocument;l=$e.createElement("div"),l.id=_y,l.className="usage-meter__layer",$e.body.appendChild(l)}return l}function m(){l!==null&&(it(c``,l),l.remove(),l=null)}function h($e){n!==$e&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",B),window.addEventListener("resize",M)),n=$e)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",B),window.removeEventListener("resize",M))}function k($e){let ee=$e.target;ee&&(e.contains(ee)||l!==null&&l.contains(ee))||(b(),_e())}function M(){_e()}function B($e){$e.key==="Escape"&&(b(),_e())}function V($e){n===$e?b():h($e),_e()}function ce(){b(),_e()}async function U($e,ee){if(r.has($e.key))return;let Z=ef($e.key,ee);r.set($e.key,ee),a.delete(Z),_e();let Se=null;try{Se=await(await fetch($e.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Se=null}if(t)return;if(r.delete($e.key),!Se||Se.ok!==!0){let oe=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";a.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),_e();return}let H=Array.isArray(Se.warnings)?Se.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];H.length>0&&a.set(Z,{kind:"warn",text:H.join(" \xB7 ")}),_e(),await Le()}function j($e,ee,Z,Se){let H=Xp($e.pct),ge=`resets ${Zp($e.resetsAt,Se)}${ee?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${Qp(H)}"
      style=${`--progress: ${H}%`}
      title=${ge}
    >
      <span class="usage-meter__label">${$e.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${H}%</span>
    </span>`}function D($e,ee,Z){let Se=nf(ee,Z),H=ee.available&&(ee.held||Se>fl),oe=H?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",ge=ee.accounts.filter(Me=>!Me.active).length,Ae=`usage-meter__group${H?" usage-meter__group--stale":""}`,Ve=c`<span class="usage-meter__provider"
        >${$e.label}</span
      >
      ${ee.available?ee.windows.map(Me=>j(Me,H,oe,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ge>0?c`<span class="usage-meter__badge">+${ge}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${Ae}
        aria-label=${`${$e.label} usage`}
        >${Ve}</span
      >`;let de=n===$e.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${$e.label} usage`}
      aria-expanded=${de?"true":"false"}
      aria-controls=${Vp}
      @click=${()=>V($e.key)}
    >
      ${Ve}
    </button>`}function z($e,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${$e.map(Z=>D(Z.provider,Z.snapshot,ee))}
    </span>`}function L($e,ee){let Z=Xp($e.pct),Se=Zp($e.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${Qp(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${$e.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function I($e,ee){return my.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${$e.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ne($e,ee,Z){let Se=ee.status==="ok",H=typeof ee.ageSeconds=="number"&&ee.ageSeconds>fl,oe=a.get(ef($e.key,ee.number)),ge=r.get($e.key),Ae=ge!==void 0,Ve=ge===ee.number,de=["usage-meter__account"];return ee.active&&de.push("usage-meter__account--active"),Se||de.push("usage-meter__account--unavailable"),H&&de.push("usage-meter__account--stale"),c`<div class=${de.join(" ")}>
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
              >${by(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ae}
              @click=${()=>{U($e,ee.number)}}
            >
              ${Ve?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Me=>L(Me,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${I($e,ee.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function ke($e,ee,Z){let Se=ee.accounts.filter(H=>H.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${$e.label} · 활성 ${Se} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(H=>ne($e,H,Z))}
    </section>`}function we($e,ee){return c`<div
      class="usage-meter__card"
      id=${Vp}
      role="dialog"
      aria-label=${`${$e.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ke($e.provider,$e.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function _e(){let $e=Date.now(),ee=[];for(let Se of Jp){let H=o.get(Se.key);H&&ee.push({provider:Se,snapshot:wy(H,$e)})}if(ee.length===0){b(),u();return}let Z=ee.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);Z||b(),it(z(ee,$e),e),e.hidden=!1,Z?ie(Z,$e):m()}function ie($e,ee){let Z=d(),Se=e.getBoundingClientRect(),H=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,H-Se.right)}px`),it(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ce}
        ></div>
        ${we($e,ee)}`,Z)}async function Ee($e){try{let ee=await fetch($e.endpoint);return ee.ok?vy(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Le(){i+=1;let $e=i,ee=await Promise.all(Jp.map(async Z=>({provider:Z,read:await Ee(Z)})));if(!(t||$e!==i)){for(let Z of ee){let Se=Z.provider.key;if(Z.read.kind==="ok"){o.set(Se,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(Se);continue}let H=o.get(Se);H!==void 0&&!H.held&&o.set(Se,{...H,held:!0})}_e()}}return u(),Le(),s=setInterval(()=>{Le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function sf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var ky="worker-ineligible";function Gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function of(e){return Gs(e).includes(ky)}var $y="session-preferred",xy=["exclusive_machine"];function af(e,t){if(!Gs(e).includes($y)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&xy.includes(n)?n:""}var Ay="worker-serial";function _l(e){return Gs(e).includes(Ay)}function ml(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Sy=new Set(["done","failed","orphaned","stopped","discarded"]),Ey={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Ty={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Cy={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function gl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Cy[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function lf(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,m=null,h=null,b=null,k=new Set,M=!1,B=0,V=null,ce=new Set;function U(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function j(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function z(){if(!s)return;let $=++B;M=!0,b=null,k.clear(),Xe();try{let O=await s("worker-parallel-analysis-targets",{root_dir:D()});if($!==B||!Ne)return;let Q=Array.isArray(O?.qualified)?O.qualified:[],me=Array.isArray(O?.excluded)?O.excluded:[];b={qualified:Q,excluded:me};for(let xe of Q)xe&&typeof xe.id=="string"&&k.add(xe.id)}catch{$===B&&Ne&&(b={qualified:[],excluded:[]},fe("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{$===B&&(M=!1,Ne&&Xe())}}function L($){return Array.isArray($.runs)?$.runs:[]}function I(){let $=U(),O=new Set;for(let Q of Object.values($.attempts||{})){let me=Q;me&&typeof me.bead_id=="string"&&!Sy.has(me.status)&&O.add(me.bead_id)}for(let Q of Array.isArray($.pr_wait)?$.pr_wait:[])Q&&typeof Q.bead_id=="string"&&O.add(Q.bead_id);for(let Q of Object.values($.discard_operations||{})){let me=Q;me&&me.phase!=="done"&&typeof me.bead_id=="string"&&O.add(me.bead_id)}return O}function ne($){return $.filter(O=>ke(O)===null)}function ke($){let O=U();for(let Q of Array.isArray(O.serial_lanes)?O.serial_lanes:[])if(Array.isArray(Q?.entries)&&Q.entries.some(me=>me.bead_id===$))return Q.id;return(Array.isArray(O.queue)?O.queue:[]).some(Q=>Q.bead_id===$)?"parallel":null}function we($,O){let Q=l.get($);return Q||[...O.order]}function _e($){if($.length<2)return!1;let O=ke($[0]);if(!O||O==="parallel")return!1;let Q=U(),me=(Array.isArray(Q.serial_lanes)?Q.serial_lanes:[]).find(w=>w.id===O)?.entries.map(w=>w.bead_id);if(!Array.isArray(me))return!1;let xe=$.map(w=>me.indexOf(w));return xe.every(w=>w>=0)&&xe.every((w,W)=>W===0||w>xe[W-1])}function ie(){let $=U(),O=Array.isArray($.serial_lanes)?$.serial_lanes:[],Q=O.find(me=>Array.isArray(me.entries)&&me.entries.length===0);return Q?Q.id:O[0]?.id||"s1"}function Ee($){let O=U().bead_titles||{};return typeof O[$]=="string"?O[$]:$}async function Le($,O){if(!s||d)return null;d=!0,Xe();try{return await s($,O)}finally{d=!1,Xe()}}async function $e($){r?.setPending?.(!0);try{let O=await Le("worker-parallel-analysis-start",{force:$,target_ids:Array.from(k)});O&&O.applied===!1&&O.reason&&(O.reason==="target_not_qualified"&&Array.isArray(O.detail)?fe(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${O.detail.join(", ")}`,"error",3200):fe(`\uBD84\uC11D \uC2E4\uD328: ${O.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ee(){let $=j().job;!s||!$||await s("worker-parallel-analysis-cancel",{job_id:$.job_id})}async function Z($){if(!(!s||ce.has($))){ce.add($),Xe();try{let O=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:$});if(!Ne)return;if(O?.ok===!0&&typeof O.prompt=="string"){V={run_id:$,prompt:O.prompt};return}fe(O?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ce.delete($),Xe()}}}function Se(){V=null,Xe()}async function H(){if(!V)return;let $=await kn(V.prompt);fe($?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",$?"success":"error",1400)}function oe($,O){a&&a($,gl(O))}function ge(){return U().runner_catalog}function Ae($){return Object.keys(ge()?.runners?.[$]?.models||{})}function Ve($){let O=Ae($),Q=ge()?.runners?.[$]?.default_model;return typeof Q=="string"&&O.includes(Q)?Q:O[0]||""}function de(){let $=j().settings,O=m||$.runner||"claude",Q=Ae(O),me=m?Ve(O):$.model||Q[0]||"",xe=ml(ge(),O,me),w=$.effort||"",W=xe.includes(w)?w:xe[0]||"";return{runner:O,model:me,effort:W,models:Q,efforts:xe}}async function Me($){let O=j().settings,Q=await Le("worker-parallel-analysis-settings-update",{expected_revision:O.revision,runner:$.runner,model:$.model,effort:$.effort});(!Q||Q.applied!==!0)&&(m=null,Xe(),Q&&Q.reason&&fe(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Q.reason}`,"error",2800))}function At($){m=$,Xe();let O=de();Me({runner:$,model:O.model,effort:O.effort})}function xt($){let O=de(),Q=ml(ge(),O.runner,$);Me({runner:O.runner,model:$,effort:Q.includes(O.effort)?O.effort:Q[0]||""})}function ft($){let O=de();Me({runner:O.runner,model:O.model,effort:$})}async function ht($,O){if(!s||d)return;let Q=we($,O),me=j();if(Q.length<2||!me.last_good){fe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let xe=u.get($)||ie(),w=()=>({snapshot_digest:me.last_good.identity_digest,group_index:$,lane:xe,ordered_bead_ids:Q,expected_revision:U().revision});d=!0,Xe();try{let W=await s("worker-parallel-analysis-submit",w());W&&W.queue&&n&&n.set(W.queue),W&&W.applied!==!0&&W.conflict===!0&&(W=await s("worker-parallel-analysis-submit",w()),W&&W.queue&&n&&n.set(W.queue)),W&&W.applied===!0?(l.delete($),fe(`\uC9C1\uB82C \uB808\uC778 ${xe}\uC5D0 ${Q.length}\uAC1C \uBC30\uCE58`,"success")):fe(`\uC81C\uCD9C \uAC70\uBD80: ${W?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Xe()}}function E($,O,Q){l.set($,we($,O).filter(me=>me!==Q)),Xe()}function ue($){l.delete($),Xe()}function Ce($,O,Q,me){let xe=[...we($,O)],w=xe.indexOf(Q),W=w+me;w<0||W<0||W>=xe.length||(xe.splice(W,0,...xe.splice(w,1)),l.set($,xe),Xe())}function Ue(){let $=j().settings,O=Object.keys(ge()?.runners||{}),Q=de();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${me=>At(me.target.value)}
        >
          ${O.map(me=>c`<option
                value=${me}
                ?selected=${Q.runner===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${me=>xt(me.target.value)}
        >
          ${Q.models.map(me=>c`<option
                value=${me}
                ?selected=${Q.model===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${me=>ft(me.target.value)}
        >
          ${Q.efforts.map(me=>c`<option
                value=${me}
                ?selected=${Q.effort===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      ${Je($)}
    </div>`}function Je($){return!_t($)||ot($)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:$.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${$.runner}/${$.model} · effort
        ${$.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:$.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function ot($){return $.is_default===!0&&$.compatible===!1}function _t($){return!!($.runner&&$.model&&$.effort)}function gt($){return _t($)&&$.compatible!==!1}function X($){let O=Math.max(0,Math.floor($/1e3)),Q=Math.floor(O/60),me=O%60;return`${Q}:${String(me).padStart(2,"0")}`}function te($){let O=$.job;if(O){let Q=typeof O.started_at=="number"?O.started_at:0,me=`${O.runner||"?"}/${O.model||"?"}`,xe=Q?` \xB7 \uACBD\uACFC ${X(Date.now()-Q)}`:"",w=typeof O.session_id=="string"?O.session_id:"",W=L($).find(le=>le.run_id===O.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${me} · effort ${O.effort||"?"}${xe}</span
        >
        ${w?c`<code class="pa-session-id" title=${w}
              >${w.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>oe(O.job_id,W||O)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${W?.prompt_saved!==!0||ce.has(O.job_id)}
          @click=${()=>{Z(O.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ze()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function We($){let O=te($);return O===""?"":c`<div class="pa__strip">${O}</div>`}function ze(){return r?.isPending?.()===!0}function De($){let O=!!$.job,Q=gt($.settings),me=b!==null&&k.size===0,xe=O||d||ze()||M;return c`<div class="pa-meta">
      ${$.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date($.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!Q||xe||me}
        @click=${()=>{$e(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!Q||xe||me}
        @click=${()=>{$e(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!O}
        @click=${()=>{ee()}}
      >
        취소
      </button>
    </div>`}function qe($){return typeof $=="string"&&$.length>0?$:"\uBBF8\uBC30\uCE58"}function He($,O){O?k.add($):k.delete($),Xe()}function dt($){let O=Array.isArray($.scope)?$.scope:[],Q=Array.isArray($.overlaps)?$.overlaps:[];return O.length===0&&Q.length===0?c``:c`<span class="pa-target__signals">
      ${O.length>0?c`<details class="pa-target__scope" title=${O.join(`
`)}>
            <summary>scope ${O.length}</summary>
            <ul>
              ${O.map(me=>c`<li><code>${me}</code></li>`)}
            </ul>
          </details>`:""}
      ${Q.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${Q.join(", ")}`}
            >겹침 ${Q.join(", ")}</span
          >`:""}
    </span>`}function ut(){let $=b?.qualified||[],O=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${$.length} \xB7 \uC81C\uC678 ${O.length}`}</span
        >
      </header>
      ${b&&$.length>0?c`<ul class="pa-targets__list">
            ${$.map(Q=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${Q.id}
                      .checked=${k.has(Q.id)}
                      @change=${me=>He(Q.id,me.target.checked)}
                    />
                    <span class="pa-target__title">${Q.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${dt(Q)}
                    <span class="pa-target__route">${Q.route}</span>
                    <span class="pa-target__lane"
                      >${qe(Q.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&$.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&O.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${O.length}</summary>
            <ul class="pa-targets__list">
              ${O.map(Q=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${Q.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Ey[Q.reason]||Q.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${qe(Q.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function pt($){let O=typeof $.session_id=="string"&&$.session_id.length>0,Q=O?$.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${$.outcome}"
        >${Ty[$.outcome]||$.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date($.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${$.runner||"?"} / ${$.model||"?"} / ${$.effort||"?"}</span
      >
      ${O?c`<code class="pa-session-id" title=${Q}
            >${Q.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${$.outcome==="failure"&&$.reason?c`<span class="pa-run-row__reason">${$.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>oe($.run_id,$)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${$.prompt_saved!==!0||ce.has($.run_id)}
          @click=${()=>{Z($.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Ct($){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${$.length>0?c`<ul class="pa-runs__list">
            ${$.map(O=>pt(O))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function zt(){return V?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Se}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{H()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Se}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function Ot($,O){let Q=we($,O),me=I(),xe=Q.filter(ye=>me.has(ye)),w=ne(Q),W=_e(Q),le=Array.isArray(U().serial_lanes)?U().serial_lanes:[],Ke=u.get($)||ie(),Fe=O.eligible!==!0||Q.length<2||xe.length>0||w.length>0||W||d;return c`<section class="pa-group" data-group-index=${String($)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${O.confidence}</span>
        ${O.categories.map(ye=>c`<span class="pa-group__category">${ye}</span>`)}
        ${W?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${O.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${w.length>0?c`<span class="pa-group__stale"
              >stale — ${w.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${O.reason}</p>
      <ol class="pa-group__members">
        ${Q.map((ye,Tt)=>c`<li class="pa-member" data-bead-id=${ye}>
              <span class="pa-member__seq">${Tt+1}</span>
              <span class="pa-member__title">${Ee(ye)}</span>
              ${me.has(ye)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${ye}
                ?disabled=${Tt===0}
                aria-label=${`${ye} \uC704\uB85C`}
                @click=${()=>Ce($,O,ye,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${ye}
                ?disabled=${Tt===Q.length-1}
                aria-label=${`${ye} \uC544\uB798\uB85C`}
                @click=${()=>Ce($,O,ye,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${ye}
                aria-label=${`${ye} \uC81C\uC678`}
                @click=${()=>E($,O,ye)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${O.evidence.map(ye=>c`<li class="pa-evidence">
              <code>${ye.path}</code>
              <span class="pa-evidence__locator">${ye.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ue($)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${ye=>{u.set($,ye.target.value),Xe()}}
          >
            ${le.map((ye,Tt)=>c`<option
                  value=${ye.id}
                  ?selected=${Ke===ye.id}
                >
                  직렬 ${Tt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Fe}
          @click=${()=>{ht($,O)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Dt($){let O=Array.isArray($.issues)?$.issues:[],Q=O.filter(xe=>xe.verdict==="parallel_ok").length,me=O.filter(xe=>xe.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${Q}</span>
      <span>uncertain ${me}</span>
    </div>`}function Et(){let $=Ne&&!!j().job;if($&&h===null){h=setInterval(()=>Xe(),1e3);return}!$&&h!==null&&(clearInterval(h),h=null)}function Xe(){let $=j();m&&$.settings.runner===m&&(m=null);let O=$.last_good?.result;Et(),it(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Re}
            >
              ×
            </button>
          </header>
          ${We($)}
          <div class="pa__body">
            ${Ue()} ${De($)} ${ut()}
            ${O?c`${O.groups.map((Q,me)=>Ot(me,Q))}
                ${O.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Dt(O)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Ct(L($))}
          </div>
        </div>
        ${zt()}
      `,i)}let Ne=!1,P=()=>{Ne=!1,V=null,B+=1,Et()},J=$=>{$.target===$.currentTarget&&Re()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",J);let he=null;n&&n.subscribe&&(he=n.subscribe(()=>{Ne&&Xe()}));let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{Ne&&Xe()}));function G(){Ne||(Ne=!0,Xe(),z(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Re(){Ne&&(Ne=!1,V=null,B+=1,Et(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:Re,destroy(){Ne=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",J),he&&(he(),he=null),S&&(S(),S=null),i.remove()}}}var cf=new Set(["sh","bash","zsh","dash","ksh"]),uf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function df(e){let t=e.split("/");return t[t.length-1]||""}function Ry(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=df(n[0]);if(r!=="env")return cf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&cf.has(df(s))}function Oy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ly(e){let t=[],n=0;uf.lastIndex=0;for(let r of e.matchAll(uf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Oy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Iy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function pf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function m(D,z){return z?Ly(D).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):D}function h(){if(!s)return c``;let D=o==="ready"&&Ry(a),z=o==="ready"?a.split(`
`):[];return c`<div
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
              @click=${()=>{k()}}
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
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${z.map((L,I)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${I+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(L,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){it(h(),r)}async function k(){if(o!=="ready")return;let D=await kn(a);fe(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function M(D){D.key==="Escape"&&s&&(D.preventDefault(),U())}function B(){d||(document.addEventListener("keydown",M),d=!0)}function V(){d&&(document.removeEventListener("keydown",M),d=!1)}async function ce(D,z=null){let L=++l;B(),s={...D},u=z||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let ke="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let we=await n(ke),_e=await we.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==ne){U();return}if(!we.ok||!_e||_e.ok!==!0){o="error",i=Iy(_e&&typeof _e.error=="string"?_e.error:""),b();return}s={lane:_e.lane,base_sha:_e.base_sha,path:_e.path,base_ref:_e.base_ref},a=String(_e.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function U(){l+=1,V(),s=null,a="",b();let D=u;u=null,D?.isConnected&&D.focus()}function j(){U(),r.remove()}return{open:ce,close:U,destroy:j}}function ff(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${I}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let I=L/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function m(L){let I=d(L);return I?u("config",I):""}function h(L,I,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${ke=>{s&&s({lane:L,base_sha:I.base_sha,path:ne.script,base_ref:I.base_ref},ke.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function k(L,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${ne=>{ce(L,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(L){let I=typeof L.base_sha=="string"?L.base_sha:"",ne=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,ke=b(),we=!!L.verify&&ke.verify,_e=!!L.deploy&&ke.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${h("verify",L,L.verify)}
              ${m(L.verify.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${L.verify?k("verify",ke.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${h("deploy",L,L.deploy)}
              ${m(L.deploy.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${L.deploy?k("deploy",ke.deploy):""}
      </div>
    </section>`}function B(L){let I=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?M(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${I.error_code?c` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(L){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(I),I&&I.conflict){let ne=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(ne)}r()}async function ce(L,I){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});if(i(ne),ne&&ne.conflict){let ke=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});i(ke)}r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function j(L,I,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(ke=>c`<li data-token=${ke}>
              ${U[ke]||ke}
            </li>`)}
      </ul>
    </div>`}function D(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(I=>{let ne=[U[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?ne.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?ne.push(`${U[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&ne.push(`${I.sessions_per_user_action}\uD68C`,U[I.user_actions]||I.user_actions),I.applies_when&&ne.push(U[I.applies_when]||I.applies_when),c`<li data-token=${I.id}>
            <strong>${U[I.id]||I.id}</strong>
            <span>${ne.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let L=o(),I=L.auto_repair!==!1,ne=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,ke=Array.isArray(L.repo_operations)?L.repo_operations:[],we=ke.find(Le=>Le.state==="repairing"),_e=ke.filter(Le=>Le.state==="failed"||Le.state==="repairing"),ie=_e.length?Math.min(..._e.map(Le=>typeof Le.repair?.remaining=="number"?Le.repair.remaining:0)):ne?.auto_repair?.resolution_ladder?.find(Le=>Le.id==="auto_repair_session")?.attempts??1,Ee=Array.isArray(ne?.auto_repair?.resolution_ladder)?ne.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${I}
          @change=${Le=>{V(Le.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${I?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ie}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${we?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${we.repair?.owner_bead||we.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${ne?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(ne.worker_automatic||[]).length} · 해결 사다리
                ${Ee.length} · 금지
                ${(ne.never_automatic||[]).length}</span
              >
            </summary>
            ${j("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ne.worker_automatic||[],"worker-automatic")}
            ${ne.supported===!1||ne.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ne.schema_version})`}
                </div>`:D(Ee)}
            ${j("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ne.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(l())} ${z()}
      </details>`}}}var bf=20,Py=5,My=new Set(["failed","repairing","running","queued","retry_pending"]),_f={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},mf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Dy(e,t,n=bf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Ny(e){if(e.type==="cleanup")return!0;let t=e.operation;return My.has(t.state)&&!t.dismissed&&!t.superseded_by}function qy(e,t,n={}){let r=Dy(e,t,1/0),s=n.expanded===!0?bf:Py,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Ny(i));return{visible:a,hidden:r.length-a.length}}function gf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Fy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function hf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function yf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function jy(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(mf,r)?mf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
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
  </div>`}function By(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${la(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${gf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(_f,t.kind)?_f[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${oa(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Os(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${gf(e)}"
          >${Fy(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?yf(Fd(t.failure_kind,r)):""}
      ${jy(t)}
      ${hf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${oa(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Uy(e){let t=e.cleanup,n=Sr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${la(e.at)||"\u2014"}</span
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
        ${_p(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${yf(ga(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
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
      ${hf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Wy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Uy(r):By(r))}
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
  </section>`}function vf(e,t={}){let n=null;function r(){if(n===null){it(c``,e);return}let a=qy(n.operations,n.cleanup_failures,{expanded:n.expanded});it(Wy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var zy=Wt("views:worker"),Hy="tab:worker:ready",Gy="tab:worker:blocked",Ky="tab:worker:in-progress",Vy="tab:worker:resolved",Yy="tab:worker:closed",Ea=1,wf=5;function kf(e){return Ho(e).path.length>0}var Zy=new Set(["quick_fix","spec_backed","full_plan"]);function $f(e){return typeof e=="string"&&Zy.has(e)}var Ef="beads-ui.worker.candidate-filter",bl={show_blocked:!1,spec:"all"};function Qy(){try{let e=window.localStorage.getItem(Ef);if(!e)return{...bl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...bl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...bl}}}function Xy(e){try{window.localStorage.setItem(Ef,JSON.stringify(e))}catch{}}function Jy(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ev=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Tf="bdui.worker.candidate_sort",Cf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],yl="spec";function Rf(e){return Cf.some(t=>t.value===e)?e:yl}function tv(){try{return Rf(window.localStorage.getItem(Tf))}catch{return yl}}function nv(e){try{window.localStorage.setItem(Tf,e)}catch{}}var Of="bdui.worker.done-range";function rv(){try{let e=window.localStorage.getItem(Of);return e===null?"today":jn(e)}catch{return"today"}}function sv(e){try{window.localStorage.setItem(Of,e)}catch{}}var ov="(max-width: 640px)",Lf="beads-ui.worker.lane-collapsed",Ks={queue:!0,done:!0};function av(){try{let e=window.localStorage.getItem(Lf);if(!e)return{...Ks};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ks}:{queue:typeof t.queue=="boolean"?t.queue:Ks.queue,done:typeof t.done=="boolean"?t.done:Ks.done}}catch{return{...Ks}}}function iv(e){try{window.localStorage.setItem(Lf,JSON.stringify(e))}catch{}}function xf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function lv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(yr):t==="updated"?r.sort(_o):(r.sort(mo(n)),t==="board"?r:[...r.filter(kf),...r.filter(s=>!kf(s))])}function cv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function uv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var dv="\u{1F512} blocked";function Af(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function pv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function fv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function _v(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function mv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function gv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function hl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var bv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),hv=new Set(["waiting_metadata","reviewing","retrying"]);function yv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?ln(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function vv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function wv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=vv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!bv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Sf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function kv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Sf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Sf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=pv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Af(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Af(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $v(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,m=null,h=null,b={},k=!1,M=!1,B={},V=null){let ce=!!l&&l.position>0,U=!!l?.continuation_action&&l.continuation_action.continuation===null,j=!!l&&l.active===!0,D=l&&l.failure||null,z=_v(l?l.waiting:null,h),L=n[e]||null,I=L&&L.gate?L.gate:null,ne=L&&L.pr?L.pr:null,ke=mv(l?l.resolution:null),we=gv(l?l.head_review:null),_e=l&&l.head_review||null,ie=yv(h,_e),Ee=wv(h,ie),Le=l&&l.authority||null,$e=!!_e&&["pending","reviewing","revising"].includes(_e.state),ee=!!h&&typeof h=="object"&&hv.has(h.phase),Z=ce&&!j&&(_e?.state==="failed"||!Le||ee||Le.source==="automatic"&&!M),Se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ke?ke.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":z,H=!!I&&I.base_badge==="\uCDA9\uB3CC",oe=!!I&&I.enabled===!0,ge=Ws({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),Ae=Aa(ge),Ve=o&&!ge&&(o.queueing??null)?o.queueing:null,de=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!I&&I.tier==="merged",Me=i&&!!r&&!!I&&I.tier==="merged",At=Z&&(oe||H||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||de||Me),xt=i&&H&&u===!1,ft=qn(b,e,{external:i,merge_active:j||ge?.step==="merge",merge_queued:ce,conflict_active:!!a,cleanup_active:Ae,merged:!!r||I?.tier==="merged"}),ht=!!ft.operation,E=!de&&!!r&&r.step==="repo_operations",ue=kv({continuation_required:U,queueing:Ve,merge_step:ge,conflict_badge:Se,conflict_live:ke?.live===!0||a==="running",head_review:_e&&we?{...we,state:_e.state,failure_reason:_e.failure_reason}:null,auto_resolution:ie,recovery:Ee,cleanup_failed:r,cleanup_label:r?Sr(r.step):null,base_exception:m,conflicting:H,gate:I,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:D,auto_skip:d,queued:ce,queue_active:j,queue_position:l?l.position:0,activity:Se?null:o&&o.activity||null}),Ce=ue?.live===!0&&ue.title?c`<span title=${ue.title}>${ue.label}</span>`:ue?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ge?.active!==!0?xa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...V?{dependency_chips:V}:{},external:i,pr_number:ne&&typeof ne.number=="number"?ne.number:null,pr_url:ne&&typeof ne.url=="string"?ne.url:"",completion_badge:ue?.live!==!0&&ue?.title?ue.label:null,completion_title:ue?.title||"",completion_repair_pr_url:Ee?Ee.repair_pr_url:"",completion_repair_pr_number:Ee?Ee.repair_pr_number:null,badges:Ce?[Ce]:[],live_badge:ue?.live===!0?Ce:null,usage:s,alert:ue?.alert===!0,merge_action:I?.tier==="merged"&&!de&&!Me||E?!1:!ce||U||Z,timeline_action:E,cancel_action:ce&&!U,cancel_enabled:(!j||$e)&&!(Ee&&Ee.lock_actions),cancel_title:Ee&&Ee.lock_actions?`${Ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:j&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ft,discard_action:ft.action,merge_step:ge,discard_enabled:ft.enabled,discard_title:ft.title,merge_enabled:!ge&&!Ve&&!a&&!ht&&!m&&!(Ee&&Ee.lock_actions)&&!xt&&!E&&(oe||H||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||de||Me||At||ee&&!j),merge_label:U?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":de||Me?"\uC815\uB9AC \uC7AC\uAC1C":H&&!ge&&!de?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":I?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ht?ft.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ft.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ft.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ve?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ge?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ge.label}`:Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":de?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":H?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":I?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":oe?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function vl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,openDoc:d,doneRange:m,onDoneRangeChange:h}=t,b=r?bo(r,i):null,k=wo({transport:n,uiOrderStore:i}),M=null,B=[],V=Qy(),ce=null,U=null,j={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},D=tv(),z=m?jn(m):rv(),L=new Map;function I(){let p=Ir.find(v=>v.value===z);return p?p.label:"\uC624\uB298"}let ne=av(),ke=!1,we=new Set,_e=new Set,ie=new Set,Ee=new Set,Le=new Set,$e={},ee=null,Z=0,Se=null,H=[];function oe(p){return ee===p?$e:{}}async function ge(){if(!n)return;let p=u?.()||"";if(ee===p||Se&&Se.key===p&&Se.generation===Z)return;let v=++Z;Se={key:p,generation:v};let N=null;try{N=await Promise.resolve(n("get-session-defaults",{}))}catch(re){if(v!==Z)return;Se=null,zy("get-session-defaults failed: %o",re),Ze();return}v===Z&&($e=N&&typeof N.values=="object"&&N.values!==null?{...N.values}:{},ee=p,Se=null,Ze())}function Ae(){ee=null,Z+=1,ge()}let Ve=document.createElement("div");Ve.className="worker-console";let de=document.createElement("div");de.className="worker-top";let Me=document.createElement("div");Me.className="worker-drawer-overlay",Me.hidden=!0;let At=document.createElement("div");At.className="worker-drawer-overlay__backdrop";let xt=document.createElement("div");xt.className="worker-drawer-host";let ft=document.createElement("div");ft.className="worker-drawer-host",ft.hidden=!0,Me.append(At,xt,ft);let ht=document.createElement("div");ht.className="worker-lanes-host",Ve.append(de,Me,ht),e.appendChild(Ve);let E=null,ue=null,Ce=Gr(xt,{transport:n,sessionLogStore:a,onClose:()=>{E=null,ue=null,Me.hidden=!0,Ze()}}),Ue=vf(ft,{onClose:()=>{ft.hidden=!0,Me.hidden=!0,Ze()}}),Je=pf({getWorkspacePath:u||(()=>"")}),ot=u&&u()||"",_t=ff({queueStore:s,transport:n,onChanged:()=>Ze(),onOpenScript:(p,v)=>{Je.open(p,v)}}),gt=o?lf(Ve,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(p,v)=>An(p,v)}):null;function X(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ea,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function te(){let p=X(),v=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,N=Array.isArray(p.serial_lanes)?p.serial_lanes:[],re=[];for(let ct of N){if(re.length>=v)break;!ct||typeof ct.id!="string"||!/^s[1-5]$/.test(ct.id)||!Array.isArray(ct.entries)||re.push({id:ct.id,label:`\uC9C1\uB82C ${ct.id.slice(1)}`,count:ct.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...re]}function We(p){if(!ce||!p.some(N=>N.id===ce))return null;let v=te();return v?{bead_id:ce,lanes:v}:null}function ze(){let p=X();return typeof p.revision=="number"?p.revision:0}function De(p){p&&p.queue&&s&&s.set(p.queue)}function qe(){let p=X().queue;return Array.isArray(p)?p.length:0}async function He(p,v,N){if(!n)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},...N===void 0?{}:{index:N},expected_revision:ze()}),Ie=await n("worker-queue-place",re());De(Ie),Ie&&Ie.conflict&&await n("worker-queue-place",re()).then(De)}async function dt(p,v,N){if(!n)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:N,expected_revision:ze()}),Ie=await n("worker-queue-reorder",re());De(Ie),Ie&&Ie.conflict&&await n("worker-queue-reorder",re()).then(De)}async function ut(p){if(!n)return;let v=await n("worker-queue-remove",{bead_id:p,expected_revision:ze()});De(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:ze()}).then(De)}async function pt(p){if(!n||!p)return;let v=await n("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&fe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ct(p){if(!n||!p)return;let v=await Br();if(v===null)return;let N=async(Ie={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:ze(),...v!==""?{instructions:v}:{},...Ie}),re=await N();De(re),re&&re.conflict&&(re=await N(),De(re)),re=await Kn(re,(Ie,ct)=>N({continuation:Ie,decision_token:ct}),{onResult:De,refresh:()=>N()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&fe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function zt(p){if(!n||!p)return;let v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:ze()});De(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:ze()}),De(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&fe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ot(p,v,N=!0){if(!n)return null;let re=n,Ie=await re(p,{...v,expected_revision:ze()});return De(Ie),Ie&&Ie.conflict&&N&&(Ie=await re(p,{...v,expected_revision:ze()}),De(Ie)),Ie}async function Dt(p){if(!n||!p)return;let v=X().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Xe(p,v.mismatch);return}we.add(p),Ze();let N;try{N=await Ot("worker-merge-queue-add",{bead_id:p})}catch{fe("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{we.delete(p),Ze()}if(!(!N||N.applied)){if(N.conflict){fe("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}fe(fv(N.reason),"error",2400)}}async function Et(p){if(!(!n||!p||_e.has(p))){_e.add(p),Ze();try{let v=await n("worker-cleanup-retry",{bead_id:p,expected_revision:ze()});De(v),v&&!v.retried&&!v.conflict&&v.reason&&fe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{_e.delete(p),Ze()}}}async function Xe(p,v){let N=await Kn({continuation_mismatch:v},(Ie,ct)=>Ot("worker-merge-queue-add",{bead_id:p,continuation:Ie,decision_token:ct},!1)),re=N?.queue?.merge_queue?.find(Ie=>Ie.bead_id===p)?.continuation_action;if(N?.applied!==!0&&re?.continuation===null&&re.mismatch){await Xe(p,re.mismatch);return}N&&N.applied===!1&&!N.conflict&&fe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ne(p){if(!n)return;let v=await Ot("worker-merge-auto-toggle",{on:p});!v||v.conflict||fe(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function P(p){if(!n||!p)return;let v=await Ot("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&fe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function J(){await Ot("worker-merge-queue-remove",{all:!0})}async function he(p,v=null,N="unmerged",re=null){if(!n||!p)return;let Ie=Ls(p,N);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(Ie)))return;let at=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:ze()});if(De(at),at&&at.conflict&&(at=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:ze()}),De(at)),at&&at.discarded===!0){fe(ca(at),"success",5e3);return}if(at&&at.reason){fe(`\uD3D0\uAE30 \uC2E4\uD328: ${at.reason}`,"error",2800);return}if(at&&at.accepted&&at.pending==="merged_revert"){fe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(at&&at.accepted&&!at.discarded){fe(`\uD3D0\uAE30 \uC9C4\uD589: ${at.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}at&&!at.conflict&&fe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function S(p,v,N){if(!(!n||!v||!N||Ee.has(v))){Ee.add(v),Ze();try{let re=await n(p,{bead_id:v,action_id:N,expected_revision:ze()});De(re),re?.conflict?fe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&fe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{Ee.delete(v),Ze()}}}async function G(p,v){if(!n||!v||ie.has(v))return;ie.add(v),Ze();let N;try{let re=async(Ie={})=>await n(p,{bead_id:v,expected_revision:ze(),...Ie});N=await re(),De(N),N&&N.conflict&&(N=await n(p,{bead_id:v,expected_revision:ze()}),De(N)),p==="worker-revise-fix"&&(N=await Kn(N,(Ie,ct)=>re({continuation:Ie,decision_token:ct}),{onResult:De,refresh:()=>re()}))}finally{ie.delete(v),Ze()}if(!(!N||N.conflict)){if(N.ok){fe(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}fe(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function Re(p){if(!n)return;let v=await n("worker-automation-toggle",{on:p,expected_revision:ze()});De(v),v&&v.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:ze()}).then(De)}async function $(p){if(!n||!p)return;let v=await n("worker-repo-operation-repair",{operation_id:p});if(De(v),v&&v.ok===!1){fe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&fe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function O(p){if(!n||!p)return;let v=await n("worker-repo-operation-dismiss",{operation_id:p});De(v),v&&v.ok===!1&&fe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Q(p){if(!n||!Number.isFinite(p))return;let v=Math.max(Ea,Math.floor(p)),N=await n("worker-queue-set-slots",{slots:v,expected_revision:ze()});De(N),N&&N.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:ze()}).then(De)}async function me(p){if(!n||!Number.isInteger(p)||p<1||p>wf)return;let v=X(),N=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((ct,at)=>ct+(Array.isArray(at?.entries)?at.entries.length:0),0),re=()=>({count:p,expected_revision:ze()}),Ie=await n("worker-queue-set-serial-lane-count",re());De(Ie),Ie&&Ie.conflict&&(Ie=await n("worker-queue-set-serial-lane-count",re()),De(Ie)),Ie&&Ie.applied&&N>0&&fe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${N}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let xe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function w(p,v){let N=Ki(p,v.id,j);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:N.kind==="note"?{kind:"note",text:N.text}:N.kind==="disabled"?{kind:"disabled",label:xe,title:N.title}:{kind:"place",label:xe,title:N.title}}}function W(p,v){if(!U||U.bead_id!==p)return null;let N=U.counterpart_id,re=v.filter(Ie=>Ie.id===N);return re.length===0?null:{rows:re.map(Ie=>w(p,Ie))}}async function le(p,v){let N=Ki(p,v,j);if(U=null,N.kind!=="ops"){Ze();return}let re=ze();for(let Ie of N.ops){let ct=await Ke(Ie,re);if(ct===null)break;re=ct}Ze()}async function Ke(p,v){if(!n)return null;try{let N=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:v});if(De(N),N&&N.conflict)return fe("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!N||N.applied!==!0)return fe(N&&typeof N.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${N.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let re=N.queue?N.queue.revision:void 0;return typeof re!="number"?(fe("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):re}catch(N){return fe(N instanceof Error&&N.message?N.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function Fe(){let p=X(),v=b?b.selectBoardColumn(Hy,"ready"):[],N=b?b.selectBoardColumn(Gy,"blocked"):[],re=b?b.selectBoardColumn(Yy,"closed"):[],Ie=b?b.selectBoardColumn(Ky,"in_progress"):[],ct=b?b.selectBoardColumn(Vy,"resolved"):[],at=yo([...v,...N,...Ie,...ct,...re]),Ut=new Map;for(let g of[...v,...N,...Ie])g&&g.id&&!Ut.has(g.id)&&Ut.set(g.id,g);let Jt={...oe(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=p[g];typeof F=="string"&&(Jt[g]=F)}function nt(g,F){let pe=Ut.get(g);if(!pe)return null;let Ge=pe.metadata&&typeof pe.metadata=="object"?pe.metadata:{},tt=pe.workflow?.route,Kt=Ge.route,Lt=$f(tt)?tt:$f(Kt)?Kt:null;return hn({pin:Ge,global:Jt,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Lt,controller_runtime:F})}function A(g){let F=g.runner||null,pe=nt(g.bead_id,F),Ge=Ps(g),tt=pe?cr(pe,F):null;return Ge||tt?{orchestration:Ge,worker:tt}:null}let ae=new Map;function q(g){if(ae.has(g))return ae.get(g)??null;let F=nt(g,null),pe=null;if(F){let Ge=Nn(p.runner_catalog??null,F.orchestration_model.value??""),tt=Ge===null?F:nt(g,Ge),Kt=xr(tt,p.runner_catalog??null),Lt=cr(tt,Ge);pe=Kt||Lt?{orchestration:Kt,worker:Lt}:null}return ae.set(g,pe),pe}function Te(g){let F=vo(at,g);return F.total===0?null:F}let yt=p.bead_titles||{},et=new Map;for(let[g,F]of Object.entries(yt))typeof F=="string"&&F.length>0&&et.set(g,F);for(let g of[...v,...N])et.set(g.id,g.title||g.id);let $t=new Map;for(let g of[...v,...N,...Ie,...ct,...re])g&&g.id&&typeof g.from_id=="string"&&$t.set(g.id,g.from_id);let rt=new Map;for(let g of[...v,...N,...Ie,...ct,...re])g&&g.id&&typeof g.priority=="number"&&rt.set(g.id,g.priority);let Ht=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},f=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},_=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},y=new Map;for(let[g,F]of Object.entries(f))Array.isArray(F)&&y.set(g,_l(F));for(let g of[...v,...N]){let F=g.labels;Array.isArray(F)&&!y.has(g.id)&&y.set(g.id,_l(F))}let x=new Map,K=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(K)?K:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let F=g.members.map(Ge=>{let tt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Kt=>Kt.entries.some(Lt=>Lt.bead_id===Ge));return tt?tt.id:null});if(!(F.every(Ge=>Ge!==null)&&new Set(F).size===1))for(let Ge of g.members)x.set(Ge,g.members.filter(tt=>tt!==Ge))}let Y=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},se=new Map;for(let[g,F]of Object.entries(Ht))F&&typeof F=="object"&&se.set(g,F);for(let g of[...v,...N])se.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let be=g=>se.get(g)||{},Ye=p.pr_wait||[],lt=p.pr_observations||{},Oe=p.pr_activity||{},Qe=p.cleanup_failed||{},nn=Object.entries(Qe).map(([g,F])=>({bead_id:g,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),Rn=p.queue||[],Hf=new Set([...Rn.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(F=>F.bead_id)),...Ye.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),Gf=new Set(N.map(g=>g.id)),Kf=i?i.get()?.order||{}:{},xl=new Set,Al=[];for(let g of[...v,...N])Hf.has(g.id)||xl.has(g.id)||cv(g)||(xl.add(g.id),Al.push(g));B=lv(Al,D,Kf);let Vf=p.admission||{},Sl=g=>{let F=Vf[g];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let pe=typeof F.reason=="string"?F.reason:"",Ge=pe.indexOf(":");return Ge>0&&Ge<pe.length-1?`\u26D4 ${pe.slice(0,Ge)} (${pe.slice(Ge+1)})`:`\u26D4 ${pe}`},El=new Map,Yf=B.map(g=>{let F=Ho(g),pe=F.path.length>0,Ge=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",tt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,Kt=Object.hasOwn(g,"labels")&&of(g.labels),Lt=Kt||!Object.hasOwn(g,"labels")?"":af(g.labels,g.metadata),Rr=Lt.length>0,It=!Kt&&(Ge?tt:pe&&!F.conflict),no=Gf.has(g.id),tr=[];if(no){let ro=uv(g);ro.length>0?El.set(g.id,ro):tr.push(dv)}Ge&&!tt?tr.push("missing_description"):!Ge&&F.conflict?tr.push("spec_id_conflict"):!Ge&&!pe&&tr.push("spec \uC5C6\uC74C");let Or=Sl(g.id);return Or&&tr.push(Or),{id:g.id,title:g.title||g.id,reason:tr.join(" \xB7 "),draggable:It,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ge,status:g.status,worker_ineligible:Kt,session_preferred:Rr,session_preferred_reason:Lt,blocked:no,has_spec:pe,exec_chips:q(g.id),from_id:g.from_id||void 0,priority:rt.get(g.id)}}),Ta=Jy(Yf,V),Ca=Ta.visible,Zf=p.revise_parked||{},Vs=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ra=(g,F)=>g.map((pe,Ge)=>{let tt=F!=="done",Kt=F!=="done"&&F!=="queue",Lt=tt?Zf[pe.bead_id]:null,Rr=tt?qn(Vs,pe.bead_id):null,It=Rr?.operation?Rr:null,no=tt&&y.get(pe.bead_id)===!0,tr=p.admission&&typeof p.admission=="object"?p.admission[pe.bead_id]:null,Or=tt?Ld(tr,!!It||Ee.has(pe.bead_id)):null,ro=tt&&!Or?Sl(pe.bead_id):null,c_=tt?[ro]:[],rc=[],ja=tt?x.get(pe.bead_id):void 0;return ja&&ja.length>0&&rc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ja.join(", ")}\uC640`),{id:pe.bead_id,title:et.get(pe.bead_id)||pe.bead_id,reason:c_.filter(Boolean).join(" \xB7 "),draggable:tt&&!It&&!Or,done:F==="done",lane:F,seq:Kt?Ge+1:void 0,worker_serial:no,discard:It,stale_work:Or,badges:[...rc,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?aa(p.attempts||{},pe.bead_id):[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!It&&!ie.has(pe.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?En(p.attempts||{},pe.bead_id):null,work_ms:F==="done"?ia(p.attempts||{},pe.bead_id):null,done_at:F==="done"&&typeof pe.added_at=="number"?pe.added_at:void 0,exec_chips:tt?q(pe.bead_id):null,workflow:tt&&_[pe.bead_id]||null,from_id:$t.get(pe.bead_id)||void 0,priority:rt.get(pe.bead_id),...be(pe.bead_id)}}),Er=p.attempts?Object.values(p.attempts).filter(Ar):[],Oa=new Set;for(let g of Er)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Oa.add(g.resumed_from);let Tl=new Map;for(let g of Er)Tl.set(g.bead_id,g.attempt_id);let Jr=new Map;for(let g of Er)Jr.set(g.attempt_id,g);function La(g){let F=new Set,pe=g;for(;pe&&!F.has(pe.attempt_id);){if(pe.conflict_resolution===!0)return!0;F.add(pe.attempt_id),pe=typeof pe.resumed_from=="string"&&pe.resumed_from.length>0&&Jr.get(pe.resumed_from)||null}return!1}let Ys=typeof p.declared_base=="string"?p.declared_base:null;function Qf(g){let F=null;for(let pe of Er)!pe||pe.bead_id!==g||La(pe)||(F===null||(typeof pe.started_at=="number"?pe.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=pe);return F&&typeof F.target_base=="string"?F.target_base:null}let Ia=[],Zs=[],Xf=sf(p),Cl=g=>{let F=typeof g.session_id=="string"&&g.session_id.length>0,pe=Oa.has(g.attempt_id);return{eligible:F&&!pe,reason:F?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},On=null;for(let g of Er){let F=g.status==="paused"&&!Oa.has(g.attempt_id);if(g.status==="running"||F)Zs.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:et.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:F,conflict_resolution:La(g),base_exception:hl(Ys,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:qn(Vs,g.bead_id,{attempt_id:g.attempt_id}),workflow:_[g.bead_id]||null,priority:rt.get(g.bead_id),usage:En(p.attempts||{},g.bead_id),rollup:Te(g.bead_id),rollup_expanded:Le.has(g.bead_id),exec_chips:A(g),...be(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Xf(g)){let pe=Cl(g);Ia.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:et.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(Vs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:pe.eligible,resume_reason:pe.reason,conflict_resolution:La(g),base_exception:hl(Ys,g.target_base),workflow:_[g.bead_id]||null,priority:rt.get(g.bead_id),usage:En(p.attempts||{},g.bead_id),rollup:Te(g.bead_id),rollup_expanded:Le.has(g.bead_id),exec_chips:A(g),...be(g.bead_id)}),On=g}}let Rl=new Set([...Ia,...Zs].map(g=>g.bead_id)),Ol=new Map;for(let g of Array.isArray(p.session_active)?p.session_active:[]){let F=g&&g.bead_id;if(!(typeof F!="string"||F.length===0||Rl.has(F))){if(Rl.add(F),Array.isArray(g.blocked_by)){let pe=g.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0);pe.length>0&&Ol.set(F,pe)}Zs.push({bead_id:F,attempt_id:null,kind:"session",title:g.title||et.get(F)||F,status:"in_progress",started_at:Bn(g.started_at)??Bn(g.updated_at),updated_at:Bn(g.updated_at),workflow:g.workflow||null,priority:rt.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Tr=[...Ia,...Zs].map(g=>{let F=Jr.get(g.attempt_id),pe=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!pe||typeof pe!="object")return g;let Ge=typeof pe.reason=="string"&&pe.reason.length>0?pe.reason:null,tt=Ws({bead_id:F.bead_id,merge_sha:pe.head_sha,cleanup_cursor:pe.cursor,cleanup_failed:Ge?{step:pe.cursor,reason:Ge}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return tt?{...g,landing:tt}:g}),Ll=null;if(On){let g=Cl(On),F=On.cause_detail;Ll={bead_id:On.bead_id,repo:On.repo||"",reason:On.cause||On.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:On.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:qn(Vs,On.bead_id,{attempt_id:On.attempt_id})}}let Il=new Set(Tr.map(g=>g.bead_id)),Pa=Array.isArray(p.merge_queue)?p.merge_queue:[],Pl=new Map,Ml=new Map,Dl=new Map,Nl=new Map,ql=new Map;Pa.forEach((g,F)=>{g&&typeof g.bead_id=="string"&&(Pl.set(g.bead_id,F+1),Ml.set(g.bead_id,g.resolution),Dl.set(g.bead_id,g.continuation_action||null),Nl.set(g.bead_id,g.head_review||null),ql.set(g.bead_id,g.authority||null))});let Cr=p.merge_queue_state||{active:null,failures:{}},Jf=Cr.failures||{},Fl=Cr.waiting&&typeof Cr.waiting.bead_id=="string"&&typeof Cr.waiting.reason=="string"?Cr.waiting:null,e_=p.auto_merge_skips||{},jl=g=>{let F=e_[g];if(!F)return null;let pe=lt[g],Ge=pe&&pe.pr?pe.pr.head_sha:null;return Ge&&Ge===F.head_sha?F.reason||"":null},Qs=new Map;for(let g of Tr)g.failed!==!0&&g.conflict_resolution&&(g.paused?Qs.has(g.bead_id)||Qs.set(g.bead_id,"paused"):Qs.set(g.bead_id,"running"));let Bl=Tr.filter(g=>g.kind!=="session"&&!g.paused&&g.failed!==!0).length,Ul=(p.workspace_info||{}).slots,Wl=typeof Ul=="number"?Ul:typeof p.slots=="number"?p.slots:Ea,t_=Bl>Wl,Xs=br(z),n_=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Xs===void 0||typeof g.added_at!="number"||g.added_at>=Xs).sort((g,F)=>(F.added_at||0)-(g.added_at||0)),es=Ra(n_,"done"),r_=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),zl=[],s_=u?.()||"";for(let g of re){let F=Bn(g.closed_at);if(typeof g.id!="string"||r_.has(g.id)||F===null||Xs!==void 0&&F<Xs||typeof g.comment_count!="number"||g.comment_count<=0)continue;let pe=`${s_}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ge=L.get(pe);Ge===void 0&&n&&(L.set(pe,"pending"),Promise.resolve(n("get-comments",{id:g.id})).then(tt=>{let Kt=Array.isArray(tt)&&tt.some(Lt=>Go(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");L.set(pe,Kt?"session":"not-session"),Ze()}).catch(()=>{L.set(pe,"failed"),Ze()})),Ge==="session"&&zl.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:g.created_at,updated_at:g.updated_at})}es.push(...zl),es.sort((g,F)=>(F.done_at||0)-(g.done_at||0));let Js={};for(let g of Wn)Js[g]=0;let Hl=!1,Gl=0,Ma=0,Kl=0;for(let g of es){let F=g.usage;if(F&&typeof F=="object"){let pe=!1;for(let Ge of Wn)Number.isFinite(F[Ge])&&(Js[Ge]+=F[Ge],Hl=!0,pe=!0);pe&&(Ma+=1,Number.isFinite(F.total_cost_usd)&&(Gl+=F.total_cost_usd,Kl+=1))}}Ma>0&&Kl===Ma&&(Js.total_cost_usd=Gl);let Vl=es.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),o_=Vl.length>0?cn(Lo(Vl)):Hl?Vn(Js):null,Yl=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Zl=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Ql=g=>{if(Ye.some(Ge=>Ge.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=Er.filter(Ge=>Ge&&Ge.bead_id===g),pe=F.length>0?F[F.length-1].status:null;return pe==="failed"||pe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":pe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},eo=Zl.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,F)=>{let pe=Yl[g.id]||{},Ge=new Map((Array.isArray(pe.corrections)?pe.corrections:[]).filter(It=>It&&typeof It.bead_id=="string"&&typeof It.after=="string").map(It=>[It.bead_id,It.after])),tt=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(It=>typeof It=="string"):[],Kt=new Set(tt),Lt=Ra(g.entries.filter(It=>!Il.has(It.bead_id)&&!Kt.has(It.bead_id)),g.id).map(It=>Ge.has(It.id)?{...It,badges:[`\u{1F517} ${Ge.get(It.id)} \uB4A4 (blocks \uC790\uB3D9)`,...It.badges]}:It),Rr=tt.map(It=>({id:It,title:et.get(It)||It,draggable:!1,lane:g.id,ghost:!0,badges:[Ql(It)]}));return{id:g.id,index:F+1,rows:[...Rr,...Lt],occupied:tt.length>0,badge:tt.length>0?Ql(tt[0]):"\uB300\uAE30",cycle:pe.cycle===!0}}),Xl=typeof p.serial_lane_count=="number"?p.serial_lane_count:eo.length,Da=Ra(Rn.filter(g=>!Il.has(g.bead_id)),"queue"),Jl=new Map,ec=new Set;for(let[g,F]of Object.entries(Yl)){if(!/^s[1-5]$/.test(g))continue;let pe=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let Ge of pe)typeof Ge=="string"&&Jl.set(Ge,g);pe.length>0&&ec.add(g)}let er=[];for(let g of Tr)typeof g.bead_id=="string"&&er.push({id:g.bead_id,title:et.get(g.bead_id)||g.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Jl.get(g.bead_id)??null});for(let g of Ye){let F=g&&g.bead_id;typeof F!="string"||F.length===0||er.push({id:F,title:et.get(F)||F,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let g of eo)for(let F of g.rows)F.ghost!==!0&&er.push({id:F.id,title:F.title,location_label:`${g.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:g.id});Da.forEach((g,F)=>{er.push({id:g.id,title:g.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let g of Ca)er.push({id:g.id,title:g.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let tc={};for(let g of Zl)g&&typeof g.id=="string"&&Array.isArray(g.entries)&&(tc[g.id]=g.entries.length);let Na=new Map;for(let g of er)Na.has(g.id)||Na.set(g.id,g);j={members_by_id:Na,serial_raw_lengths:tc,serial_lane_count:Xl,occupied_lanes:ec};let a_=Md(p.bead_scope,er),to=new Map;for(let[g,F]of Ol)to.set(g,F);for(let[g,F]of El)to.set(g,F);for(let[g,F]of Object.entries(Y))Array.isArray(F)&&to.set(g,F.filter(pe=>typeof pe=="string"&&pe.length>0));let i_=gp(to,er),qa=(g,F=null)=>{let pe=a_.get(g),Ge=i_.get(g)||null,tt=pe&&pe.overlaps.length>0?pe.overlaps:null,Kt=!!pe&&pe.scope_missing;if(!Ge&&!tt&&!Kt)return F;let Lt=tt?W(g,tt):null;return{...F||{},interactive:!1,...Ge?{predecessors:Ge}:{},...tt?{overlaps:tt}:{},...Kt?{scope_missing:!0}:{},...Lt?{popover:Lt}:{}}},Fa=g=>{let F=qa(g.id,g.dependency_chips||null);return F&&(g.dependency_chips=F),g};for(let g of Da)Fa(g);for(let g of eo)for(let F of g.rows)F.ghost!==!0&&Fa(F);for(let g of Ca)Fa(g);let nc=new Map;for(let g of Tr){let F=typeof g.bead_id=="string"?g.bead_id:"";if(F.length===0)continue;let pe=g.kind==="session",Ge=qa(F),tt=typeof g.attempt_id=="string"&&g.attempt_id.length>0?Jr.get(g.attempt_id):void 0,Kt=tt&&tt.last_activity&&typeof tt.last_activity=="object"?tt.last_activity:null,Lt=tt&&Array.isArray(tt.legs)?tt.legs:[];!Ge&&!Kt&&Lt.length===0&&!pe||nc.set(F,{...Kt?{last_activity:Kt}:{},...Lt.length>0?{legs:Lt}:{},...Ge?{dependency_chips:Ge}:{}})}let l_=Ye.map(g=>$v(g.bead_id,et.get(g.bead_id)||g.bead_id,lt,Qe[g.bead_id]||null,En(p.attempts||{},g.bead_id),Oe[g.bead_id]||(we.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:_e.has(g.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Qs.get(g.bead_id)||null,g.external===!0,{position:Pl.get(g.bead_id)||0,active:Cr.active===g.bead_id,failure:Jf[g.bead_id]||null,waiting:Fl?.bead_id===g.bead_id?Fl.reason:null,resolution:Ml.get(g.bead_id),continuation_action:Dl.get(g.bead_id),head_review:Nl.get(g.bead_id)||null,authority:ql.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?jl(g.bead_id):null,hl(Ys,Qf(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Jr.get(Tl.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},qa(g.bead_id))).map(g=>({...g,workflow:_[g.id]||null,priority:rt.get(g.id),...be(g.id)}));return{queue:p,idToTitle:et,candidates:Ca,candidate_hidden:{blocked:Ta.hidden_blocked,spec:Ta.hidden_spec},running:Tr,live_count:Bl,slots:Wl,over_cap:t_,failure:Ll,waiting:Da,serial_lanes:eo,serial_lane_count:Xl,running_overlays:nc,pr_wait:l_,merge_queue_length:Pa.length,merge_queue_running:Pa.length>0,auto_excluded:Ye.map(g=>g.bead_id).filter(g=>jl(g)!==null),declared_base:Ys,done:es,token_total:o_,cleanup_failures:nn,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function ye(){let v=!!o?.get()?.job,N=!v&&o?.isPending?.()===!0,re=v?"\uBD84\uC11D \uC911":N?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${re?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${re?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${re?c`<span class="worker-analysis-btn__badge">${re}</span>`:""}
    </button>`}function Tt(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",N=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=en(p),Ie=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ct=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(q=>q&&typeof q.armed_by_lane=="string"&&q.armed_by_lane.length>0).length,at=ct>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${ct}건 진행 중</span
          >`:"",Ut=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,Jt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,nt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ea}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:wf},(q,Te)=>Te+1).map(q=>c`<option
                value=${String(q)}
                ?selected=${p.serial_lane_count===q}
              >
                ${q}
              </option>`)}
        </select>
      </label>
      ${o?ye():""} `,A=Bd({failure:p.failure}),ae=Od(p.repo_operations,p.cleanup_failures);return ke?c`<div class="worker-ribbon">
          ${N} ${re}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ie}${at}${Ut}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${nt}</div>
          <div class="worker-kpi">${Jt}</div>
        </div>
        ${ae}${_t.template()}${A}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${re}${nt}</div>
        <div class="worker-kpi">
          ${Ie}${at}${Ut}${Jt}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(q=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${q.tooltip}
                >${I()} 완료 · 누적 ${q.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${ae}${_t.template()}${A}`}function bt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0);return c`<section
      class="worker-now${v?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Qi(p.running,Date.now(),E,p.running_overlays):""}
      ${p.pr_wait.map(N=>ar(N))}
    </section>`}function mt(p){let v=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${V.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ev.map(N=>c`<button
              type="button"
              class="worker-filter__chip${V.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${V.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Yt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${D}
    >
      ${Cf.map(p=>c`<option value=${p.value} ?selected=${D===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Pt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${Ir.map(p=>c`<option value=${p.value} ?selected=${z===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function dn(p){let v=c`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,N=p.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Cn({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:N})}function en(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let N=new Set(p.auto_excluded),re=p.pr_wait.filter(Ie=>Ie.merge_action&&Ie.merge_enabled&&!N.has(Ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function tn(p){let v=Cn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Yt(),controls:mt(p),place_menu:We(p.candidates),onOpenDoc:d?(N,re)=>d(re):void 0});return ke?c`<div class="worker-lanes worker-lanes--mobile">
        ${bt(p)}
        ${Cn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:ne.queue,preview:xf(p.waiting)})}
        ${p.serial_lanes.map(N=>dn(N))}
        ${v}
        ${Cn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Pt(),collapsible:!0,collapsed:ne.done,preview:Array.isArray(p.token_total)?p.token_total.map(N=>N.label).join(" \xB7 "):p.token_total||xf(p.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Cn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(N=>dn(N))}
      </div>
      ${Cn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(N=>N.kind!=="session"&&!N.paused&&N.failed!==!0),body:Qi(p.running,Date.now(),E,p.running_overlays)})}
      ${Cn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Cn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Pt()})}
    </div>`}function Zt(p){ne={...ne,[p]:!ne[p]},iv(ne),Ze()}function Ze(){let p=Fe();it(Tt(p),de),it(tn(p),ht)}function sn(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(ov);ke=!!p.matches;let v=N=>{let re=!!(N&&typeof N.matches=="boolean"?N.matches:p.matches);re!==ke&&(ke=re,Ze())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),H.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),H.push(()=>p.removeListener(v)))}let on=null;function st(p){on=p.target instanceof Element?p.target:null}function Pe(p){let N=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!N)return;if(on&&N.contains(on)&&on.closest("input, button, a")){p.preventDefault();return}let re=N.dataset.beadId||"",Ie=N.dataset.lane||"";M={bead_id:re,from_lane:Ie};try{p.dataTransfer?.setData("text/plain",re),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function C(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let N=v.dataset.lane||"";N!=="candidate"&&N!=="queue"&&!/^s[1-5]$/.test(N)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ve(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Be(p,v){let N=B.find(at=>at.id===p);if(!N)return;let re=B.filter(at=>at.id!==p),Ie=re.length;if(v){let at=v.dataset.beadId;if(at===p)return;let Ut=re.findIndex(Jt=>Jt.id===at);Ut>=0&&(Ie=Ut)}let ct=re.slice();ct.splice(Ie,0,N),k.applyReorder(p,ct,Ie)}function wt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let N=v.dataset.lane||"",re=M?.bead_id||p.dataTransfer?.getData("text/plain")||"",Ie=M?.from_lane||"";if(M=null,!re)return;let ct=p.target?.closest?.(".worker-mini, .worker-card"),at=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Ut=at.length;if(ct){let Jt=at.indexOf(ct);Jt>=0&&(Ut=Jt)}if(Ut=Math.max(0,Ut-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(Ut=qe()),N==="candidate"){if(Ie==="candidate"){Be(re,ct);return}(Ie==="queue"||/^s[1-5]$/.test(Ie))&&ut(re);return}if(N==="queue"||/^s[1-5]$/.test(N)){let Jt=N==="queue"?"parallel":N;Ie===N?dt(re,Jt,Ut):He(re,Jt)}}function Nt(p){V=p,Xy(p),Ze()}function kt(p){D=Rf(p),nv(D),Ze()}function qt(p){z=jn(p),sv(z),h?.(z),Ze()}function Qt(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let Ut=Number.parseInt(v.value,10);Number.isFinite(Ut)&&me(Ut).then(Ze);return}let N=p.target?.closest?.(".worker-filter__blocked");if(N){Nt({...V,show_blocked:N.checked});return}let re=p.target?.closest?.(".worker-done-range");if(re){qt(re.value);return}let Ie=p.target?.closest?.(".worker-sort");if(Ie){kt(Ie.value||yl);return}let ct=p.target?.closest?.(".worker-slots__input");if(!ct)return;let at=Number.parseInt(ct.value,10);if(!Number.isFinite(at)){Ze();return}Q(at).then(Ze)}function an(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function vn(){let p=Fe();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Bt(){E&&Ce.close(),ft.hidden=!1,Me.hidden=!1,Ue.open(vn()),Ze()}function wn(p){let v=X(),N=v.attempts?v.attempts[p]:null;E=p,ue=null,Ue.close(),ft.hidden=!0,Me.hidden=!1,Ce.open({attempt_id:p,meta:an(N)}),Ze()}function An(p,v){E=null,ue=p,Ue.close(),ft.hidden=!0,Me.hidden=!1,Ce.open({attempt_id:p,meta:v,hide_prompt:!0}),Ze()}function zn(){if(Ue.isOpen()&&Ue.refresh(vn()),ue){let N=(o?.get()?.runs||[]).find(re=>re.run_id===ue);N?Ce.updateMeta(gl(N)):Ce.close();return}if(!E)return;let p=X(),v=p.attempts?p.attempts[E]:null;if(v){Ce.updateMeta(an(v));return}Ce.close()}function T(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;let N=v?.closest?.(".mon-overlap__chip");if(N){let Oe=N.closest("[data-bead-id]"),Qe=Oe&&Oe.getAttribute("data-bead-id")||"";if(Qe){let nn=N.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===Qe&&U.counterpart_id===nn?null:{bead_id:Qe,counterpart_id:nn},Ze()}return}let re=v?.closest?.(".mon-overlap__place");if(re){let Oe=re.closest("[data-bead-id]"),Qe=Oe&&Oe.getAttribute("data-bead-id")||"";Qe&&le(Qe,re.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-analysis-btn")){gt?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){Bt();return}let Ie=v?.closest?.(".worker-repo-op__session");if(Ie){let Oe=Ie.dataset.attemptId;Oe&&wn(Oe);return}let ct=v?.closest?.(".worker-repo-op__resolve");if(ct){$(ct.dataset.operationId||"");return}let at=v?.closest?.(".worker-repo-op__dismiss");if(at){O(at.dataset.operationId||"");return}let Ut=v?.closest?.(".worker-cleanup__resume");if(Ut){let Oe=Ut.dataset.beadId;Oe&&Et(Oe);return}let Jt=v?.closest?.(".worker-banner__resume");if(Jt){let Oe=Jt.dataset.attemptId;Oe&&Ct(Oe);return}let nt=v?.closest?.(".worker-banner__discard");if(nt){let Oe=nt.dataset.confirmation==="merged"?"merged":"unmerged";he(nt.dataset.beadId||"",nt.dataset.attemptId||null,Oe,nt.dataset.operationId||null);return}let A=v?.closest?.(".worker-banner__dismiss");if(A){let Oe=A.dataset.attemptId;Oe&&zt(Oe);return}if(v?.closest?.(".worker-play")){Re(!X().auto_advance);return}let ae=v?.closest?.(".worker-merge-all");if(ae){ae.classList.contains("worker-merge-all--stop")?X().auto_merge===!0?Ne(!1):J():Ne(!0);return}let q=v?.closest?.(".worker-pane__hd--toggle");if(q){let Oe=q.dataset.lane;(Oe==="queue"||Oe==="done")&&Zt(Oe);return}let Te=v?.closest?.(".worker-card__place-lane");if(Te){let Oe=Te.dataset.beadId,Qe=Te.dataset.lane;Oe&&(Qe==="parallel"||/^s[1-5]$/.test(Qe||""))&&(ce=null,Ze(),He(Oe,Qe));return}if(v?.closest?.(".worker-card__place-cancel")){ce=null,Ze();return}let et=v?.closest?.(".worker-card__place");if(et){let Oe=et.dataset.beadId;Oe&&!et.disabled&&(te()?(ce=Oe,Ze()):He(Oe,"parallel"));return}let $t=v?.closest?.(".worker-filter__chip");if($t){let Oe=$t.dataset.spec;(Oe==="all"||Oe==="with"||Oe==="without")&&Nt({...V,spec:Oe});return}let rt=v?.closest?.(".worker-mini__merge");if(rt){let Oe=rt.dataset.beadId||"";X().cleanup_failed?.[Oe]?Et(Oe):Dt(Oe);return}let Ht=v?.closest?.(".worker-mini__merge-cancel");if(Ht){P(Ht.dataset.beadId||"");return}let f=v?.closest?.(".worker-mini__discard");if(f){he(f.dataset.beadId||"",f.dataset.attemptId||null,f.dataset.discardMode==="merged"?"merged":"unmerged",f.dataset.operationId||null);return}let _=v?.closest?.(".worker-mini__stale-continue");if(_){S("worker-stale-work-continue",_.dataset.beadId||"",_.dataset.actionId||"");return}let y=v?.closest?.(".worker-mini__stale-backup");if(y){S("worker-stale-work-backup-fresh",y.dataset.beadId||"",y.dataset.actionId||"");return}let x=v?.closest?.(".worker-mini__stale-recheck");if(x){S("worker-stale-work-recheck",x.dataset.beadId||"",x.dataset.actionId||"");return}let K=v?.closest?.(".worker-mini__revise-fix");if(K){G("worker-revise-fix",K.dataset.beadId||"");return}let Y=v?.closest?.(".worker-mini__revise-approve");if(Y){G("worker-revise-approve",Y.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Oe=v?.closest?.(".rtile"),Qe=Oe?.dataset?.beadId,nn=Oe?.dataset?.attemptId;Qe&&he(Qe,nn||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let Qe=v?.closest?.(".rtile")?.dataset?.attemptId;Qe&&zt(Qe);return}if(v?.closest?.(".rtile__pause")){let Qe=v?.closest?.(".rtile")?.dataset?.attemptId;Qe&&pt(Qe);return}if(v?.closest?.(".rtile__resume")){let Qe=v?.closest?.(".rtile")?.dataset?.attemptId;Qe&&Ct(Qe);return}if(v?.closest?.(".rtile__session")){let Qe=v?.closest?.(".rtile")?.dataset?.attemptId;Qe&&wn(Qe);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Ue.close(),Ce.close();return}if(v?.closest?.(".worker-drawer-host"))return;let se=v?.closest?.(".rtile .board-card__roll-toggle");if(se){let Oe=se.dataset.rollParent;Oe&&(Le.has(Oe)?Le.delete(Oe):Le.add(Oe),Ze());return}let be=v?.closest?.(".rtile .board-card__roll-child");if(be){let Oe=be.dataset.childId;Oe&&l&&l(Oe);return}let Ye=v?.closest?.(".rtile");if(Ye){if(v?.closest?.(".rtile__id")){let Qe=Ye.dataset.beadId;Qe&&kn(Qe).then(nn=>{nn?fe("\uBCF5\uC0AC\uB428","success",1200):fe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Oe=Ye.dataset.beadId;Oe&&l&&l(Oe);return}let lt=v?.closest?.(".worker-mini, .worker-card");if(lt){let Oe=lt.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Oe&&kn(Oe).then(nn=>{nn?fe("\uBCF5\uC0AC\uB428","success",1200):fe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Qe=v?.closest?.(".ctl-chip--from");if(Qe){let nn=Qe.dataset.fromId;nn&&l&&l(nn);return}Oe&&l&&l(Oe)}}e.addEventListener("pointerdown",st),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",C),e.addEventListener("dragleave",ve),e.addEventListener("drop",wt),e.addEventListener("click",T),e.addEventListener("change",Qt);function R(p){if(!U)return;let v=p.target;v&&typeof v.closest=="function"&&v.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,Ze())}function je(p){p.key!=="Escape"||!U||(U=null,Ze())}return document.addEventListener("click",R),document.addEventListener("keydown",je),H.push(()=>{document.removeEventListener("click",R),document.removeEventListener("keydown",je)}),sn(),b&&H.push(b.subscribe(()=>{for(let[p,v]of L)v==="failed"&&L.delete(p);Ze()})),s&&H.push(s.subscribe(()=>{let p=u&&u()||"";p!==ot&&(ot=p,Je.close()),Ze(),zn()})),o&&typeof o.subscribe=="function"&&H.push(o.subscribe(()=>{zn(),Ze()})),Ze(),{load(){ge(),Ze()},refreshSessionDefaults:Ae,destroy(){for(let p of H.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",st),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",C),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",wt),e.removeEventListener("click",T),e.removeEventListener("change",Qt);try{Ce.destroy()}catch{}Me.hidden=!0;try{gt?.destroy()}catch{}try{Je.destroy()}catch{}it(c``,e)}}}function wl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function If(e,t,n,r=async()=>{},s=async()=>{}){let o=Wt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(z){let I=z.target.value,ke=t.getState().workspace?.current?.path||"";if(I&&I!==ke){o("switching workspace to %s",I),i=!0,D();try{await n(I)}catch(we){o("workspace switch failed: %o",we)}finally{i=!1,D()}}}async function m(){let z=t.getState(),L=z.workspace?.current?.path||z.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,D();try{await r(L)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,D()}}}function h(z){let L=z.target;L&&e.contains(L)||M()}function b(z){z.key==="Escape"&&M()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),D())}function M(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),D())}function B(){u?M():k()}async function V(z){let L=z.target,I=L.value,ne=L.checked;o("toggling visibility %s \u2192 %s",I,String(ne));try{await s(I,ne)}catch(ke){o("workspace visibility toggle failed: %o",ke)}}function ce(z){return z?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function U(z,L){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
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
                ${z.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!L.has(I.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${wl(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let z=t.getState(),L=z.workspace?.current,I=z.workspace?.available||[],ne=new Set(z.workspace?.hidden||[]),ke=L?.path||I[0]?.path||"";if(I.length===0)return c``;let we=I.filter(_e=>!ne.has(_e.path)||_e.path===ke);if(we.length<=1){let _e=we[0]||I[0],ie=wl(_e.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${ie}</span
          >
          ${U(I,ne)}
          ${ce(ke)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${we.map(_e=>c`
              <option
                value="${_e.path}"
                ?selected=${_e.path===ke}
                title="${_e.path}"
              >
                ${wl(_e.path)}
              </option>
            `)}
        </select>
        ${U(I,ne)}
        ${ce(ke)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){it(j(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),it(c``,e)}}}var Pf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function kl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Mf(e,t,n=kl()){return{id:n,type:e,payload:t}}function Df(e={}){let t=Wt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],m=new Map,h=new Set;function b(j){for(let D of Array.from(h))try{D(j)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*j,z=Math.max(0,Math.round(j+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",z,a+1),i=setTimeout(()=>{i=null,U()},z)}function M(j){try{s?.send(JSON.stringify(j))}catch(D){t("ws send failed",D)}}function B(){for(o="open",t("ws open"),b(o),a=0;d.length;){let j=d.shift();j&&M(j)}}function V(j){let D;try{D=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let L=u.get(D.id);u.delete(D.id),D.ok?L?.resolve(D.payload):L?.reject(D.error||new Error("ws error"));return}let z=m.get(D.type);if(z&&z.size>0)for(let L of Array.from(z))try{L(D.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",D.type)}function ce(){o="closed",t("ws closed"),b(o);for(let[j,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(j);a+=1,k()}function U(){if(!l)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",ce)}catch(D){t("ws connect failed %o",D),k()}}return U(),{send(j,D){if(!Pf.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let z=kl(),L=Mf(j,D,z);return t("send %s id=%s",j,z),new Promise((I,ne)=>{u.set(z,{resolve:I,reject:ne,type:j}),s&&s.readyState===s.OPEN?M(L):(t("queue %s id=%s (state=%s)",j,z,o),d.push(L))})},on(j,D){m.has(j)||m.set(j,new Set);let z=m.get(j);return z?.add(D),()=>{z?.delete(D)}},onConnection(j){return h.add(j),()=>{h.delete(j)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,U()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function xv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Av(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var $l=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ur="tab:worker:closed",Sv="bdui.worker.done-range",qf=Np,Ff="worker:queue",jf="worker:parallel-analysis",Bf="ui:order",Uf="ui:display-policy",Wf="exec:presets",dr="tab:board:closed",zf="beads-ui.board.closed-range";function Ev(e){let t=Wt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;it(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&rf(a),i&&l&&u&&d){let oe=function(T,R){let je="Request failed",p="";if(T&&typeof T=="object"){let N=T;if(typeof N.message=="string"&&N.message.length>0&&(je=N.message),typeof N.details=="string")p=N.details;else if(N.details&&typeof N.details=="object")try{p=JSON.stringify(N.details,null,2)}catch{p=""}}else typeof T=="string"&&T.length>0&&(je=T);let v=R&&R.length>0?`Failed to load ${R}`:"Request failed";H.open(v,je,p)},We=function(T){return`${st.getState().workspace.current?.path||""}\0${T}`},ze=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Ue=null,Je=null},qe=function(T){ot=T;let R=()=>{ot!==T||st.getState().selected_id!==T||(ot=null,De(T))};if(!X){gt.then(R);return}R()},pt=function(T,R,je,p,v){return je!==ut[R]?(v().catch(()=>{}),!1):(T.set(p,v),!0)},zt=function(){let T=st.getState();Ne(T.view==="board"),Re(T.view==="worker"),xe(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||Ct||!!T.selected_id)},Et=function(){let T=br(Ot);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Xe=function(){let T=br(Dt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Ne=function(T){if(T)for(let[R,je]of $l){if(He.has(R)||dt.has(R))continue;let p=R===dr?Et():{type:je};try{de.register(R,p)}catch(re){t("register %s store failed: %o",R,re)}dt.add(R);let v=ut.board,N=!1;Ve.subscribeList(R,p).then(re=>{N=!pt(He,"board",v,R,re)}).catch(re=>{t("subscribe %s failed: %o",R,re),oe(re,"board")}).finally(()=>{dt.delete(R),N&&zt()})}else he()},he=function(){ut.board+=1;for(let[T]of $l){let R=He.get(T);R&&(R().catch(()=>{}),He.delete(T));try{de.unregister(T)}catch(je){t("unregister %s failed: %o",T,je)}}},Re=function(T){if(!T){$();return}for(let[R,je]of Nf){if(S.has(R)||dt.has(R))continue;let p=R===ur?Xe():{type:je};try{de.register(R,p)}catch(re){t("register %s store failed: %o",R,re)}dt.add(R);let v=ut.worker,N=!1;Ve.subscribeList(R,p).then(re=>{N=!pt(S,"worker",v,R,re)}).catch(re=>{t("subscribe %s failed: %o",R,re),oe(re,"worker")}).finally(()=>{dt.delete(R),N&&zt()})}},$=function(){ut.worker+=1;for(let[T]of Nf){let R=S.get(T);R&&(R().catch(()=>{}),S.delete(T));try{de.unregister(T)}catch(je){t("unregister %s failed: %o",T,je)}}},O=function(T){if(!T){Q();return}G||(Ae("subscribe-worker-queue",{id:Ff}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),Ae("subscribe-worker-parallel-analysis",{id:jf}).catch(R=>{t("subscribe-worker-parallel-analysis failed: %o",R)}),G=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:jf}),Ae("unsubscribe-worker-queue",{id:Ff})))},Q=function(){G&&(G().catch(()=>{}),G=null),At.clear()},xe=function(T){if(!T){w();return}me||(Ae("subscribe-monitor-pipeline",{id:qf}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),me=()=>Ae("unsubscribe-monitor-pipeline",{id:qf}))},w=function(){me&&(me().catch(()=>{}),me=null)},le=function(){W||(Ae("subscribe-ui-order",{id:Bf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),W=()=>Ae("unsubscribe-ui-order",{id:Bf}))},Ke=function(){W&&(W().catch(()=>{}),W=null),ft.clear()},ye=function(){Fe||(Ae("subscribe-display-policy",{id:Uf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),Fe=()=>Ae("unsubscribe-display-policy",{id:Uf}))},Tt=function(){Fe&&(Fe().catch(()=>{}),Fe=null),ht.clear()},mt=function(){bt||(Ae("subscribe-impl-presets",{id:Wf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),bt=()=>Ae("unsubscribe-impl-presets",{id:Wf}))},Zt=function(T){if(!T)return"Unknown";let R=T.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},Qt=function(T,R){qt.open(T.path,{missing_state:T.missing_state,...R?{workspace:R}:{}})};var m=oe,h=We,b=ze,k=qe,M=pt,B=zt,V=Et,ce=Xe,U=Ne,j=he,D=Re,z=$,L=O,I=Q,ne=xe,ke=w,we=le,_e=Ke,ie=ye,Ee=Tt,Le=mt,$e=Zt,ee=Qt;let Z=document.getElementById("header-loading"),Se=jc(Z),H=Rd(e),ge=Df(),Ae=Se.wrapSend((T,R)=>ge.send(T,R)),Ve=Lc(Ae),de=Ic(),Me=Dc(),At=Mc(),xt=hc(),ft=Pc(),ht=gc(),E=bc(),ue=yc();ge.on("impl-presets-snapshot",T=>{let R=T;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&E.set({revision:R.revision,presets:R.presets})}),ge.on("monitor-pipeline-snapshot",T=>{let R=T;if(!(!R||!Array.isArray(R.workspaces)))try{xt.set(R.workspaces,R.workspaces_state,R.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",T=>{let R=T;if(R&&typeof R.revision=="number")try{ft.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),ge.on("display-policy-snapshot",T=>{let R=T;if(R&&R.policy&&typeof R.policy=="object")try{ht.set(R.policy)}catch{}}),ge.on("session-log-snapshot",T=>{let R=T;if(R&&typeof R.id=="string")try{ue.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),ge.on("session-log-append",T=>{let R=T;if(R&&typeof R.id=="string")try{ue.append(R.id,R.event)}catch{}}),ge.on("snapshot",T=>{let R=T,je=R&&typeof R.id=="string"?R.id:"",p=je?de.getStore(je):null;if(p&&R&&R.type==="snapshot")try{p.applyPush(R)}catch{}}),ge.on("upsert",T=>{let R=T,je=R&&typeof R.id=="string"?R.id:"",p=je?de.getStore(je):null;if(p&&R&&R.type==="upsert")try{p.applyPush(R)}catch{}}),ge.on("delete",T=>{let R=T,je=R&&typeof R.id=="string"?R.id:"",p=je?de.getStore(je):null;if(p&&R&&R.type==="delete")try{p.applyPush(R)}catch{}});let Ce=null,Ue=null,Je=null,ot=null,_t=()=>{},gt=new Promise(T=>{_t=()=>T(void 0)}),X=!1,te=!1;async function De(T){let R=We(T);if(R===Ue||R===Je)return;Je=R;let je=`detail:${T}`,p={type:"issue-detail",params:{id:T}};try{de.register(je,p)}catch(v){t("register detail store failed: %o",v)}try{let v=await Ve.subscribeList(je,p);if(st.getState().selected_id!==T||We(T)!==R){await v().catch(()=>{});return}Ce&&await Ce().catch(()=>{}),Ce=v,Ue=R}catch(v){t("detail subscribe failed: %o",v),oe(v,"issue details")}finally{Je===R&&(Je=null)}}let He=new Map,dt=new Set,ut={board:0,worker:0},Ct=!1,Ot=uo;try{let T=window.localStorage.getItem(zf);Va(T)&&(Ot=T)}catch{}let Dt="today";try{let T=window.localStorage.getItem(Sv);T!==null&&(Dt=jn(T))}catch{}async function P(T){if(!Va(T)||T===Ot)return;Ot=T;try{window.localStorage.setItem(zf,T)}catch{}let R=He.get(dr);if(!R)return;He.delete(dr),await R().catch(()=>{});let je=Et();try{de.register(dr,je)}catch(p){t("register %s store failed: %o",dr,p)}try{let p=await Ve.subscribeList(dr,je);He.set(dr,p)}catch(p){t("re-subscribe %s failed: %o",dr,p),oe(p,"board")}}async function J(T){let R=jn(T);if(R===Dt)return;Dt=R;let je=S.get(ur);if(!je)return;S.delete(ur),await je().catch(()=>{});let p=Xe();try{de.register(ur,p)}catch(v){t("register %s store failed: %o",ur,v)}try{let v=await Ve.subscribeList(ur,p);S.set(ur,v)}catch(v){t("re-subscribe %s failed: %o",ur,v),oe(v,"worker")}}let S=new Map,G=null,me=null,W=null,Fe=null,bt=null;async function Yt(){Fe=null,ht.clear(),bt=null,E.clear(),G=null,me=null,He.clear(),S.clear(),ut.board+=1,ut.worker+=1,mt();let T=st.getState().workspace.current?.path;if(T)try{await ge.send("set-workspace",{path:T})}catch(je){t("workspace restore after reconnect failed: %o",je);return}ye();let R=st.getState();Ne(R.view==="board"),Re(R.view==="worker"),xe(R.view==="monitor"),O(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function Pt(){t("clearing all subscriptions for workspace switch"),he(),$(),Q(),Me.clear(),Ke(),le(),Tt(),ye(),ze();let T=st.getState();if(T.selected_id)try{de.unregister(`detail:${T.selected_id}`)}catch{}let R=st.getState();Ne(R.view==="board"),Re(R.view==="worker"),xe(R.view==="monitor"),O(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&qe(R.selected_id)}async function dn(T){t("requesting workspace switch to %s",T),te=!0;try{let R=await ge.send("set-workspace",{path:T});t("workspace switch result: %o",R),R&&R.workspace&&(st.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),R.changed&&(await Pt(),fe("Switched to "+Zt(T),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),fe("Failed to switch workspace","error",3e3),R}finally{te=!1}}async function en(T){t("requesting workspace git pull for %s",T);try{let R=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let je=R?.status;if(je==="up_to_date"){fe("Already up to date","success",2e3);return}if(je==="stash_pop_conflict"){fe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}fe("Git pulled "+Zt(T),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let je=R?.code,p=R?.message;if(je==="rebase_conflict"){fe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(je==="rebase_conflict_abort_failed"){fe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(je==="busy"){fe("Git pull skipped: another operation is running","warning",3e3);return}let v=p?`: ${p}`:"";throw fe(`Git pull failed${v}`,"error",3e3),R}}async function tn(T,R){t("setting workspace visibility %s \u2192 %s",T,String(R));try{await ge.send("set-workspace-visibility",{path:T,visible:R}),await Ze()}catch(je){t("workspace visibility update failed: %o",je),fe("Failed to update project visibility","error",3e3)}}async function Ze(){try{let T=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let R=T.workspaces.map(N=>({path:N.path,database:N.database,pid:N.pid,version:N.version})),je=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,p=Array.isArray(T.hidden)?T.hidden.filter(N=>typeof N=="string"):[];st.setState({workspace:{current:je,available:R,hidden:p}});let v=window.localStorage.getItem("beads-ui.workspace");v&&(!R.some(re=>re.path===v)||p.includes(v)?window.localStorage.removeItem("beads-ui.workspace"):je&&v!==je.path&&(t("restoring saved workspace preference: %s",v),await dn(v)))}}catch(T){t("failed to load workspaces: %o",T)}}ge.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(st.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),Ze(),Pt())});let sn=!1;if(typeof ge.onConnection=="function"){let T=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(sn=!0,fe("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&sn&&(sn=!1,fe("Reconnected","success",2200),Av(st,(je,p)=>{t(`${je}: %o`,p)}),Yt())};ge.onConnection(T)}let on="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(on=T)}catch(T){t("view parse error: %o",T)}let st=Fc({config:xv(),view:on});ge.on("worker-queue-snapshot",T=>{let R=T;if(!R||!R.queue)return;let je=st.getState().workspace.current?.path;if(typeof je=="string"&&je.length>0&&R.root_dir!==je){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{Me.set(R.queue)}catch{}}),ge.on("worker-parallel-analysis-snapshot",T=>{let R=T;if(!R)return;let je=st.getState().workspace.current?.path;if(!(typeof je=="string"&&je.length>0&&typeof R.root_dir=="string"&&R.root_dir!==je))try{At.set({settings:R.settings,job:R.job??null,runs:Array.isArray(R.runs)?R.runs:[],last_good:R.last_good??null})}catch{}});let Pe=Nc(st);Pe.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ve=async(T,R)=>{try{return await Ae(T,R)}catch(je){if(C.has(T))throw je;return[]}};Fp({global_element:r,repo_element:s},st,Pe);let Be=document.getElementById("workspace-picker");Be&&If(Be,st,dn,en,tn);let wt=Wp(e,(T,R)=>Ae(T,R));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>wt.open())}catch{}let Nt=Kp(e,{policyStore:ht,queueStore:Me,implPresetStore:E,transport:(T,R)=>Ae(T,R),onOpenChange:T=>{let R=Ct;Ct=T,zt(),R&&T===!1&&vn.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[R]of $l)for(let je of de.snapshotFor(R)||[]){let p=je.labels;if(Array.isArray(p))for(let v of p)typeof v=="string"&&v.length>0&&T.add(v)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>Nt.open()))}catch{}let kt=document.createElement("div");kt.className="md-viewer-root",document.body.appendChild(kt);let qt=ra(kt,{getWorkspacePath:()=>st.getState().workspace.current?.path}),an=tu(i,{gotoIssue:T=>Pe.gotoIssue(T),issueStores:de,transport:ve,workerQueueStore:Me,uiOrderStore:ft,displayPolicyStore:ht,closedRange:Ot,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>wt.open(),openDoc:Qt}),vn=vl(l,{transport:ve,issueStores:de,queueStore:Me,analysisStore:At,sessionLogStore:ue,uiOrderStore:ft,gotoIssue:T=>st.setState({selected_id:T}),getWorkspacePath:()=>st.getState().workspace.current?.path,openDoc:Qt,doneRange:Dt,onDoneRangeChange:T=>{J(T)}}),Bt=qp(u,{transport:ve,pipelineStore:xt,execPresetStore:E,sessionLogStore:ue,router:Pe,gotoIssue:T=>Pe.gotoIssue(T),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:T=>dn(T),openDoc:Qt}),wn=Cd(d,{issueStores:de,transport:ve,queueStore:Me,execPresetStore:E,sessionLogStore:ue,getWorkspacePath:()=>st.getState().workspace.current?.path,mdViewer:qt,onNavigate:T=>{st.getState().view==="worker"?st.setState({selected_id:T}):Pe.gotoIssue(T)},onClose:()=>{let T=st.getState();st.setState({selected_id:null});try{Pe.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{Nt.open("execution")}}),An=st.getState().selected_id;An&&(d.hidden=!1,wn.load(An),qe(An)),st.subscribe(T=>{let R=T.selected_id;R?(d.hidden=!1,wn.load(R),te||qe(R)):(wn.clear(),d.hidden=!0,ze())});let zn=T=>{i.hidden=T.view!=="board",l.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),Ne(T.view==="board"),Re(T.view==="worker"),xe(T.view==="monitor"),O(T.view==="board"||T.view==="worker"||Ct||!!T.selected_id),!T.selected_id&&T.view==="board"&&an.load(),T.view==="worker"&&vn.load(),T.view==="monitor"?Bt.load():Bt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};st.subscribe(zn),zn(st.getState()),le(),ye(),mt(),Ze().finally(()=>{X=!0,_t()}),window.addEventListener("keydown",T=>{let R=T.ctrlKey||T.metaKey,je=String(T.key||"").toLowerCase(),p=T.target,v=p&&p.tagName?String(p.tagName).toLowerCase():"",N=v==="input"||v==="textarea"||v==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;R&&je==="n"&&(N||(T.preventDefault(),wt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ev(t)});export{Ev as bootstrap,xv as readBootstrapConfig,Av as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
