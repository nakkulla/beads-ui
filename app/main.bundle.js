var __=Object.create;var Ga=Object.defineProperty;var m_=Object.getOwnPropertyDescriptor;var g_=Object.getOwnPropertyNames;var b_=Object.getPrototypeOf,h_=Object.prototype.hasOwnProperty;var y_=(e,t,n)=>t in e?Ga(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ka=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var v_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of g_(t))!h_.call(e,s)&&s!==n&&Ga(e,s,{get:()=>t[s],enumerable:!(r=m_(t,s))||r.enumerable});return e};var w_=(e,t,n)=>(n=e!=null?__(b_(e)):{},v_(t||!e||!e.__esModule?Ga(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>y_(e,typeof t!="symbol"?t+"":t,n);var Ac=Ka((zv,xc)=>{var Nr=1e3,qr=Nr*60,Fr=qr*60,wr=Fr*24,x_=wr*7,A_=wr*365.25;xc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return S_(e);if(n==="number"&&isFinite(e))return t.long?T_(e):E_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function S_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*A_;case"weeks":case"week":case"w":return n*x_;case"days":case"day":case"d":return n*wr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return n*qr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function E_(e){var t=Math.abs(e);return t>=wr?Math.round(e/wr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=qr?Math.round(e/qr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function T_(e){var t=Math.abs(e);return t>=wr?bo(e,t,wr,"day"):t>=Fr?bo(e,t,Fr,"hour"):t>=qr?bo(e,t,qr,"minute"):t>=Nr?bo(e,t,Nr,"second"):e+" ms"}function bo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Ec=Ka((Hv,Sc)=>{function C_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Ac(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let g=0;for(let h=0;h<d.length;h++)g=(g<<5)-g+d.charCodeAt(h),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(d){let g,h=null,b,w;function D(...B){if(!D.enabled)return;let Y=D,le=Number(new Date),V=le-(g||le);Y.diff=V,Y.prev=g,Y.curr=le,g=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let N=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(K,L)=>{if(K==="%%")return"%";N++;let I=n.formatters[L];if(typeof I=="function"){let te=B[N];K=I.call(Y,te),B.splice(N,1),N--}return K}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return D.namespace=d,D.useColors=n.useColors(),D.color=n.selectColor(d),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,w=n.enabled(d)),w),set:B=>{h=B}}),typeof n.init=="function"&&n.init(D),D}function r(d,g){let h=n(this.namespace+(typeof g>"u"?":":g)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let g=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,g){let h=0,b=0,w=-1,D=0;for(;h<d.length;)if(b<g.length&&(g[b]===d[h]||g[b]==="*"))g[b]==="*"?(w=b,D=h,b++):(h++,b++);else if(w!==-1)b=w+1,D++,h=D;else return!1;for(;b<g.length&&g[b]==="*";)b++;return b===g.length}function a(){let d=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),d}function i(d){for(let g of n.skips)if(o(d,g))return!1;for(let g of n.names)if(o(d,g))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Sc.exports=C_});var Tc=Ka((yn,ho)=>{yn.formatArgs=O_;yn.save=L_;yn.load=I_;yn.useColors=R_;yn.storage=P_();yn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();yn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function R_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function O_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ho.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}yn.log=console.debug||console.log||(()=>{});function L_(e){try{e?yn.storage.setItem("debug",e):yn.storage.removeItem("debug")}catch{}}function I_(){let e;try{e=yn.storage.getItem("debug")||yn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function P_(){try{return localStorage}catch{}}ho.exports=Ec()(yn);var{formatters:M_}=ho.exports;M_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var as=globalThis,co=as.trustedTypes,lc=co?co.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ya="$lit$",Vn=`lit$${Math.random().toFixed(9).slice(2)}$`,Za="?"+Vn,k_=`<${Za}>`,br=document,is=()=>br.createComment(""),ls=e=>e===null||typeof e!="object"&&typeof e!="function",Qa=Array.isArray,_c=e=>Qa(e)||typeof e?.[Symbol.iterator]=="function",Va=`[ 	
\f\r]`,os=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cc=/-->/g,uc=/>/g,mr=RegExp(`>|${Va}(?:([^\\s"'>=/]+)(${Va}*=${Va}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dc=/'/g,pc=/"/g,mc=/^(?:script|style|textarea|title)$/i,Xa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Xa(1),us=Xa(2),Nv=Xa(3),Rn=Symbol.for("lit-noChange"),Zt=Symbol.for("lit-nothing"),fc=new WeakMap,gr=br.createTreeWalker(br,129);function gc(e,t){if(!Qa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return lc!==void 0?lc.createHTML(t):t}var bc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=os;for(let i=0;i<n;i++){let l=e[i],u,d,g=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===os?d[1]==="!--"?a=cc:d[1]!==void 0?a=uc:d[2]!==void 0?(mc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=mr):d[3]!==void 0&&(a=mr):a===mr?d[0]===">"?(a=s??os,g=-1):d[1]===void 0?g=-2:(g=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?mr:d[3]==='"'?pc:dc):a===pc||a===dc?a=mr:a===cc||a===uc?a=os:(a=mr,s=void 0);let b=a===mr&&e[i+1].startsWith("/>")?" ":"";o+=a===os?l+k_:g>=0?(r.push(u),l.slice(0,g)+Ya+l.slice(g)+Vn+b):l+Vn+(g===-2?i:b)}return[gc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},cs=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=bc(t,n);if(this.el=e.createElement(u,r),gr.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=gr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Ya)){let h=d[a++],b=s.getAttribute(g).split(Vn),w=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:w[2],strings:b,ctor:w[1]==="."?po:w[1]==="?"?fo:w[1]==="@"?_o:yr}),s.removeAttribute(g)}else g.startsWith(Vn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(mc.test(s.tagName)){let g=s.textContent.split(Vn),h=g.length-1;if(h>0){s.textContent=co?co.emptyScript:"";for(let b=0;b<h;b++)s.append(g[b],is()),gr.nextNode(),l.push({type:2,index:++o});s.append(g[h],is())}}}else if(s.nodeType===8)if(s.data===Za)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Vn,g+1))!==-1;)l.push({type:7,index:o}),g+=Vn.length-1}o++}}static createElement(t,n){let r=br.createElement("template");return r.innerHTML=t,r}};function hr(e,t,n=e,r){if(t===Rn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ls(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=hr(e,s._$AS(e,t.values),s,r)),t}var uo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??br).importNode(n,!0);gr.currentNode=s;let o=gr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Mr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new mo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=gr.nextNode(),a++)}return gr.currentNode=br,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Zt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=hr(this,t,n),ls(t)?t===Zt||t==null||t===""?(this._$AH!==Zt&&this._$AR(),this._$AH=Zt):t!==this._$AH&&t!==Rn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_c(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Zt&&ls(this._$AH)?this._$AA.nextSibling.data=t:this.T(br.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=cs.createElement(gc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new uo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=fc.get(t.strings);return n===void 0&&fc.set(t.strings,n=new cs(t)),n}k(t){Qa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(is()),this.O(is()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Zt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Zt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=hr(this,t,n,0),a=!ls(t)||t!==this._$AH&&t!==Rn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=hr(this,i[r+l],n,l),u===Rn&&(u=this._$AH[l]),a||(a=!ls(u)||u!==this._$AH[l]),u===Zt?t=Zt:t!==Zt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},po=class extends yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Zt?void 0:t}},fo=class extends yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Zt)}},_o=class extends yr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=hr(this,t,n,0)??Zt)===Rn)return;let r=this._$AH,s=t===Zt&&r!==Zt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Zt&&(r===Zt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){hr(this,t)}},hc={M:Ya,P:Vn,A:Za,C:1,L:bc,R:uo,D:_c,V:hr,I:Mr,H:yr,N:fo,U:_o,B:po,F:mo},$_=as.litHtmlPolyfillSupport;$_?.(cs,Mr),(as.litHtmlVersions??(as.litHtmlVersions=[])).push("3.3.1");var st=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Mr(t.insertBefore(is(),o),o,void 0,n??{})}return s._$AI(e),s};var go="today",yc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Dr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Wn(e){return e==="today"?"today":"7d"}function Ja(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function kc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function $c(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Cc=w_(Tc(),1);function Gt(e){return(0,Cc.default)(`beads-ui:${e}`)}function Mn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kr(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Lc(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function yo(e,t){let n=Mn(e.updated_at),r=Mn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ic(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Mn(e.created_at),o=Mn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Pc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var D_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Rc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=D_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e,t){let n=Rc(e),r=Rc(t);if(n!==r)return n<r?-1:1;let s=Oc(e),o=Oc(t);if(s!==o)return s<o?-1:1;let a=Mn(e&&e.created_at),i=Mn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ei=2**20;function jr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Mn(e&&e.created_at)}function vo(e){return(t,n)=>{let r=jr(t,e),s=jr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ti(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:jr(i,n)-ei};if(!i)return{rank:jr(a,n)+ei};let l=jr(a,n),u=jr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((g,h)=>({bead_id:g.id,rank:h*ei}))}}function ni(e,t={}){let n=Gt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||kr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function g(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let w=Array.isArray(h.issues)?h.issues:[];for(let D of w)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);d(),o=b,u();return}if(h.type==="upsert"){let w=h.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let D=r.get(w.id);if(!D)r.set(w.id,w);else{let B=Number.isFinite(D.updated_at)?D.updated_at:0,Y=Number.isFinite(w.updated_at)?w.updated_at:0;if(B<=Y){for(let le of Object.keys(D))le in w||delete D[le];for(let[le,V]of Object.entries(w))D[le]=V}}d()}o=b,u()}else if(h.type==="delete"){let w=String(h.issue_id||"");w&&(r.delete(w),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function wo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Dc(e){let t=Gt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let w=n.get(b);if(!w)continue;let D=w.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&D.set(B,!0);for(let B of g)typeof B=="string"&&B.length>0&&D.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&D.delete(B)}}async function o(i,l){let u=wo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let g=n.get(i);if(g&&g.key!==u){let h=r.get(g.key);h&&(h.delete(i),h.size===0&&r.delete(g.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(g){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),g}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let g=n.get(i)||null;if(g){let h=r.get(g.key);h&&(h.delete(i),h.size===0&&r.delete(g.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:wo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Nc(){let e=Gt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let g=u?wo(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),b&&h&&g&&h!==g){let w=t.get(l);if(w)try{w.dispose()}catch{}let D=s.get(l);if(D){try{D()}catch{}s.delete(l)}let B=ni(l,d);t.set(l,B);let Y=B.subscribe(()=>o());s.set(l,Y)}else if(!b){let w=ni(l,d);t.set(l,w);let D=w.subscribe(()=>o());s.set(l,D)}return n.set(l,g),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function jc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ri(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function N_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function q_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Bc(e){let t=Gt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):N_(r),a=q_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ri(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ri(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var F_=Object.freeze({workspace_config:{default_workspace:null}});function Uc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:F_.workspace_config.default_workspace}}}function Wc(e={}){let t=Gt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Uc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Uc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function zc(e){let t=Gt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,h)=>{let b=s++,w=Date.now();r.set(b,{type:g,start_ts:w}),t("request start id=%d type=%s count=%d",b,g,n+1),a();let D=!1,B=()=>{D||(D=!0,r.delete(b),i())},Y=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,g,Date.now()-w),B())},3e4);try{let le=await u(g,h),V=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",b,g,V),le}catch(le){let V=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,g,V,le),le}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,g])=>({id:d,type:g.type,elapsed_ms:u-g.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function ko(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Pc),l;switch(i){case"created_desc":return l.sort(kr),l;case"created_asc":return l.sort(Lc),l;case"updated_desc":return l.sort(yo),l;case"priority":return l.sort(Ic),l;case"manual":default:{let u=n();return u?l.sort(vo(u)):l.sort(kr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function zn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function cn(e){let t=zn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function vn(e,t){let n=zn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Hc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=zn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function $o(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function xo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=$o(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ao(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Hc(n);return{total:n.length,count:r,current:s,children:n}}function So(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ti(i,l,u.order),a);s(u,d);let g=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(h);let b=r(ti(i,l,h.order),a);s(h,b);let w=await t("ui-order-set",{expected_revision:h.revision,entries:b});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Gc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Eo(e,t){let n=Gc(e),r=Gc(t);return n.length===0||r.length===0?!1:n!==r}function To(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function si(e,t){return!t||typeof e!="string"||e.length===0||To(t.visible_labels).includes(e)?!0:To(t.hidden_labels).includes(e)?!1:!To(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Kc(e,t){return To(e).filter(n=>si(n,t))}function or(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function j_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function B_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function U_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${j_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Co(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Mc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?B_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>U_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var W_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Yc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},z_={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function H_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Zc(e){let t=e&&e.fill||"none";return t==="none"?ar.none:e&&e.stale===!0?ar.stale:t==="dim"?ar.dim:e&&e.glyph==="review"?ar.review:e&&e.glyph==="skip"?ar.skip:ar.done}function G_(e){if(!e||e.fill==="none"||!e.approval_state)return Zc(e);let t=[];return e.glyph==="review"?t.push(ar.review):e.glyph==="skip"&&t.push(ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function K_(e,t,n,r){let s=W_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=z_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",g=Yc[e]||e,h=r?Qc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let b=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function Qc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ro(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Vc[e.route]||Vc.spec_backed,o=e.stages,a=H_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Yc[u]||u} ${u==="plan"?G_(o[u]||{}):Zc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Qc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>K_(u,o[u]||{},u===a,r))}
    </div>
  `}function V_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Xc=2;function Jc(e){let t=e.slice(0,Xc).join(", "),n=e.length-Xc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Y_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Eo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Jc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Jc(o)}</span
      >`),n}function oi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Oo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Yn(e){return`${e.kind}:${Oo(e)}@${e.sha}`}function Lo(e,t){if(!e)return null;let n=oi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=oi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Yn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function eu(e,t){let n=Lo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Z_(e){if(!e)return null;let t=oi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Yn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Q_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&or(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&or(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&or(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=eu(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Yn(i)}`}
        >${`exec ${i.kind==="delegated"?Oo(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Kc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&or(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),or(n,"blocked")&&s.push(...Y_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&or(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function X_(e){let t=vn(e.created_at),n=vn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function J_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Co(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:X_(e),empty_label:"children \uC5C6\uC74C",childChips:ai,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ai(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Lo(t,n)?c`<span class="board-card__roll-child-chips">
    ${eu(t,n)}
    ${Z_(n)}
  </span>`:null}function Io(e,t){let n=V_(e.priority);return c`
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
      ${Q_(e,t)}
      ${e.workflow&&or(t.policy||null,"stepper")?Ro(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${J_(e,t)}
    </article>
  `}function Br(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${yc.map(o=>c`<option
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
        ${e.items.map(o=>Io(o,t))}
      </div>
    </section>
  `}function tu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Io(r,t))}
        </div>
      </div>
    </dialog>
  `}var em=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],tm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],nm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function rm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function nu(e,t,n){return c`
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
        ${em.map(r=>c`<option
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
        ${tm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${rm(e,t,n)}
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
        ${nm.map(r=>c`<option
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
  `}var sm=200,om={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},am=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ru="beads-ui.board.sort",su=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function im(){try{let e=window.localStorage.getItem(ru);if(e&&su.has(e))return e}catch{}return"created_desc"}function ou(e,t){let n=Gt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,g=t.openDoc,h=t.closedRange||go,b=s?ko(s,a):null,w=So({transport:o,uiOrderStore:a}),D=[],B=[],Y=[],le=[],V=[],N=[],M=!1,K=0,L=im(),I=new Map,te=new Map,xe=new Map,ke=new Set,_e={search:"",priority:"",type:"",labels:[]},ae=!1,Te=null;function Pe(S){return String(S.status||"open")==="open"}function $e(S){let H=String(S.status||"open");return H==="open"||H==="blocked"}function ee(S){let H=_e.search.trim().toLowerCase(),Le=_e.priority,$=_e.type,O=_e.labels;return S.filter(X=>{if(H){let me=String(X.id||"").toLowerCase(),Ae=String(X.title||"").toLowerCase();if(!me.includes(H)&&!Ae.includes(H))return!1}if(Le!==""&&String(X.priority)!==Le||$!==""&&String(X.issue_type||"")!==$)return!1;if(O.length>0){let me=Array.isArray(X.labels)?X.labels:[];if(!O.some(Ae=>me.includes(Ae)))return!1}return!0})}function Z(){let S=new Set;for(let H of[D,B,Y,le,V,N])for(let Le of H){let $=Array.isArray(Le.labels)?Le.labels:[];for(let O of $)typeof O=="string"&&O.length>0&&S.add(O)}return Array.from(S).sort()}function Ce(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function z(){try{if(b){let S=b.selectBoardColumn("tab:board:in-progress","in_progress",L),H=b.selectBoardColumn("tab:board:blocked","blocked",L).filter($e),Le=new Set(S.map(ie=>ie.id)),$=b.selectBoardColumn("tab:board:ready","ready",L).filter(ie=>Pe(ie)&&!Le.has(ie.id)),O=b.selectBoardColumn("tab:board:resolved","resolved",L),X=b.selectBoardColumn("tab:board:deferred","deferred",L),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,sm),Ae=[...H,...$,...S,...O,...me];ne(Ae);let v=new Set;for(let ie of Ae)ie&&ie.id&&!$o(ie)&&v.add(ie.id);let U=!Ce();D=U?ds(H,v):H,B=U?ds($,v):$,Y=U?ds(S,v):S,le=U?ds(O,v):O,V=X,K=X.length,N=U?ds(me,v):me,I=new Map;for(let ie of D)I.set(ie.id,"open");for(let ie of B)I.set(ie.id,"open");for(let ie of Y)I.set(ie.id,"in_progress");for(let ie of le)I.set(ie.id,"resolved");for(let ie of V)I.set(ie.id,"deferred");for(let ie of N)I.set(ie.id,"closed");te=new Map;for(let ie of D)te.set(ie.id,"blocked-col");for(let ie of B)te.set(ie.id,"ready-col");for(let ie of Y)te.set(ie.id,"in-progress-col");for(let ie of le)te.set(ie.id,"resolved-col");for(let ie of N)te.set(ie.id,"closed-col")}_t()}catch{D=[],B=[],Y=[],le=[],V=[],N=[],xe=new Map,_t()}}function ne(S){xe=xo(S)}function ge(S){return Ao(xe,S)}function Se(S){return!ke.has(S)}function Ze(S,H){S.preventDefault(),S.stopPropagation(),ke.has(H)?ke.delete(H):ke.add(H),_t()}function ue(S,H){S.preventDefault(),S.stopPropagation(),r(H)}function Ue(S,H){S.preventDefault(),S.stopPropagation(),r(H)}function mt(S,H){Te||r(H)}function At(S,H){S.preventDefault(),S.stopPropagation(),lm(H).then(Le=>{Le&&de("\uBCF5\uC0AC\uB428","success",1200)})}function $t(S,H){Te=H,S.dataTransfer&&(S.dataTransfer.setData("text/plain",H),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function ct(S){S.target.classList.remove("board-card--dragging"),Lt(),setTimeout(()=>{Te=null},0)}function T(S){let H=String(S.target.value||"");!H||H===h||(h=H,u&&u(H),_t())}function ce(){return i?i.get():null}function Ie(S){let H=l?l.get():null,Le=H?H.cleanup_failed:null;if(!Le||typeof Le!="object"||Array.isArray(Le))return null;let $=Le[S];return!$||typeof $!="object"||Array.isArray($)?null:$}let De={onCardClick:mt,onCopyId:At,onDragStart:$t,onDragEnd:ct,onClosedRangeChange:T,rollupFor:ge,isExpanded:Se,onRollupToggle:Ze,onChildClick:ue,onFromChipClick:Ue,onOpenDoc:g?(S,H)=>g(H):void 0,cleanupFailureFor:Ie,get policy(){return ce()}};function Qe(S,H){Te||(we(),r(H))}function rt(S,H){S.preventDefault(),S.stopPropagation(),we(),r(H)}let gt={...De,onCardClick:Qe,onChildClick:rt,onFromChipClick:rt,onOpenDoc:g?(S,H)=>{we(),g(H)}:void 0,get policy(){return ce()}};function ht(S){let H=S.target,Le=e.querySelector(".board-filter__labels");H&&Le&&Le.contains(H)||Fe()}function re(S){S.key==="Escape"&&Fe()}function Q(){ae||(ae=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",re),_t())}function Fe(){ae&&(ae=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",re),_t())}function ot(S){S.key==="Escape"&&we()}function ze(){M||(M=!0,document.addEventListener("keydown",ot),_t())}function we(){M&&(M=!1,document.removeEventListener("keydown",ot),_t())}let Ke={onClose:we,onOverlayClick(S){S.target===S.currentTarget&&we()}},ut={onSearchInput(S){_e.search=String(S.target.value||""),z()},onPriorityChange(S){_e.priority=String(S.target.value||""),z()},onTypeChange(S){_e.type=String(S.target.value||""),z()},onSortChange(S){let H=String(S.target.value||"");if(!(!su.has(H)||H===L)){L=H;try{window.localStorage.setItem(ru,H)}catch{}z()}},onDeferredToggle(){M?we():ze()},onLabelMenuToggle(){ae?Fe():Q()},onLabelToggle(S){let H=_e.labels.indexOf(S);H===-1?_e.labels.push(S):_e.labels.splice(H,1),z()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],z())},onNewIssue(){d&&d()}};function ft(){return c`
      <div class="board-view">
        ${nu(_e,ut,{sort_mode:L,deferred_popup_open:M,deferred_count:K,label_options:Z(),label_menu_open:ae})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:ee(D)},De)}
          ${Br({title:"Ready",id:"ready-col",items:ee(B)},De)}
          ${Br({title:"In progress",id:"in-progress-col",items:ee(Y)},De)}
          ${Br({title:"Resolved",id:"resolved-col",items:ee(le)},De)}
          ${Br({title:"Closed",id:"closed-col",items:ee(N),is_closed:!0,closed_range:h},De)}
        </div>
        ${M?tu({items:ee(V),count:K},gt,Ke):""}
      </div>
    `}function _t(){st(ft(),e),Pt()}function Pt(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Le of H)Array.from(Le.querySelectorAll(".board-card")).forEach((O,X)=>{O.tabIndex=X===0?0:-1})}catch{}}async function Kt(S,H){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:H}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Le){n("update-status failed: %o",Le),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(S){switch(S){case"blocked-col":return D;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return le;default:return[]}}function Rt(S,H,Le){if(!o||!a)return;let $=Ht(S),O=$.find(U=>U.id===H);if(!O)return;let X=$.filter(U=>U.id!==H),me=Le.closest?Le.closest(".board-card"):null,Ae=X.length;if(me){let U=me.getAttribute("data-issue-id");if(U===H)return;let ie=X.findIndex(Ve=>Ve.id===U);ie>=0&&(Ae=ie)}let v=X.slice();v.splice(Ae,0,O),w.applyReorder(H,v,Ae)}function Lt(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Le=S.target.closest(".board-column");Le&&Le!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),Le.classList.add("board-column--drag-over"),Je=Le)}),e.addEventListener("dragleave",S=>{let H=S.relatedTarget;(!H||!e.contains(H))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",S=>{S.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let H=S.target,Le=H.closest(".board-column");if(!Le)return;let $=S.dataTransfer?.getData("text/plain")||"";if(!$)return;let O=Le.id,X=te.get($);if(X&&X===O){if(am.has(O)){if(L!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Rt(O,$,H)}return}let me=om[O];if(!me){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get($)!==me&&Kt($,me)}),e.addEventListener("keydown",S=>{let H=S.target;if(!(H instanceof HTMLElement))return;let Le=String(H.tagName||"").toLowerCase();if(Le==="input"||Le==="textarea"||Le==="select"||Le==="button"||Le==="a"||H.isContentEditable===!0)return;let $=H.closest(".board-card");if(!$)return;let O=String(S.key||"");if(O==="Enter"||O===" "){S.preventDefault();let v=$.getAttribute("data-issue-id");v&&r(v);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;S.preventDefault();let X=$.closest(".board-column");if(!X)return;let me=Array.from(X.querySelectorAll(".board-card")),Ae=me.indexOf($);if(O==="ArrowDown"&&Ae<me.length-1){Ne($,me[Ae+1]);return}if(O==="ArrowUp"&&Ae>0){Ne($,me[Ae-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let v=Array.from(e.querySelectorAll(".board-column")),U=v.indexOf(X),ie=O==="ArrowRight"?1:-1,Ve=U+ie;for(;Ve>=0&&Ve<v.length;){let je=v[Ve].querySelector(".board-card");if(je){Ne($,je);return}Ve+=ie}}});function Ne(S,H){try{S.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{z()}catch{}}));let J=null;i&&i.subscribe&&(J=i.subscribe(()=>{try{z()}catch{}}));let ve=null;return l&&l.subscribe&&(ve=l.subscribe(()=>{_t()})),{async load(){n("load"),z()},clear(){Fe(),we(),P&&(P(),P=null),J&&(J(),J=null),ve&&(ve(),ve=null),e.replaceChildren(),D=[],B=[],Y=[],le=[],V=[],N=[],I=new Map,te=new Map}}}function ds(e,t){return e.filter(n=>{let r=$o(n);return!(r&&t.has(r))})}async function lm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function $r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ps(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function cm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${$r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${$r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await cm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var um=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],au={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},dm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vt(e){return typeof e=="string"&&e.length>0?e:null}function Ur(e){return e.startsWith("gpt-")?e.slice(4):e}function Wt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function lu(e,t,n){let r=Vt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Vt(n[e]);return s===null?null:{value:s,source:"global"}}function fs(e,t,n,r){return lu(e,t,n)||{value:r,source:"base"}}function ii(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let a=Vt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let a of Object.values(s))if(sn(a)){let i=Vt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Vt(r?.runners?.[o]?.models?.[e]?.id)||e}function pm(e,t){return Vt(t?.review?.reviewers?.[e]?.model)||e}function Wr(e,t,n=!1){if(e==="default")return Wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ur(e):e;return Wt(e,t,r,e,"explicit")}function cu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function fm(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function _m(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of fm(t,n)){let o=cu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function li(e){return Wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function iu(e,t,n){let r=lu(e,t,n);return r?Wr(r.value,r.source):Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function wn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,a=sn(e.runner_catalog)?e.runner_catalog:null,i=Vt(n.quick_fix_impl_model),l=_m(i,s,a),u={};if(s){let d=fs("workflow_mode",t,n,Vt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Wr(d.value,d.source);for(let V of["spec_review","plan_review","impl_review"]){let N=`${V}_model`,M=Vt(V==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),K=fs(N,t,n,M);if(K.value===null)u[N]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(K.value!=="self"&&K.value!=="skip"&&!sn(s.review?.reviewers?.[K.value]))u[N]=li(Wt(K.value,K.source,"",null,"explicit"));else{let L=pm(K.value,s);u[N]=Wt(K.value,K.source,Ur(L),L,K.source==="base"?"default":"explicit")}}for(let[V,N]of Object.entries(au)){let M=u[N].value;if(M==="self"||M==="skip"){u[V]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let K=Vt(s.review?.reviewers?.[M||""]?.effort),L=fs(V,t,n,K);u[V]=L.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let g=sn(s.implementation?.default)?s.implementation.default:{},h=Vt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),w=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=b&&sn(w[h])?w[h]:{};for(let V of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=fs(V,t,n,V==="impl_dispatch"?Vt(D.dispatch)||Vt(g.dispatch):Vt(g[V.replace("impl_","")]));u[V]=N.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let B=Vt(t.impl_runtime),Y=B==="inherit"?Vt(e.controller_runtime):B,le=h==="quick_fix"&&Vt(t.impl_dispatch)===null&&l.runtime!==null&&(B===null||Y===l.runtime);if(le){let V=l.runtime,N=i;u.impl_dispatch=Wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Wt(V,"global",`${V} (\uC720\uB3C4)`,V,"explicit")),Vt(t.impl_model)===null&&(u.impl_model=Wt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let V of["impl_runtime","impl_model","impl_effort","impl_speed"])u[V]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let V=u.impl_runtime.value==="inherit"?Vt(e.controller_runtime):u.impl_runtime.value,N=V?cu(V,s,a):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=li(u.impl_model);else{let M=ii(u.impl_model.value,V,s,a);u.impl_model.display=Ur(M),u.impl_model.full_value=M}}if(u.impl_effort.value==="auto"){let V=Vt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=V?Vt(s.implementation?.effort_by_transport?.[V]?.auto):null;N&&!dm.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",u.impl_speed.source))}}else for(let d of um.filter(g=>!g.startsWith("orchestration_")))u[d]=iu(d,t,n);if(!s){for(let[d,g]of Object.entries(au))(u[g].value==="self"||u[g].value==="skip")&&(u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=iu(d,t,n);continue}let g=d.replace("orchestration_",""),h=Vt(o[g]),b=fs(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let w=b.source==="base"?Vt(o.model_id)||b.value:ii(b.value,null,s,a);u[d]=Wt(b.value,b.source,Ur(w),w,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",b.source);continue}u[d]=Wr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ur(d)})`,null,"default")}else if(l.runtime!==null){let d=ii(i,l.runtime,s,a);u.quick_fix_impl_model=Wt(i,"global",Ur(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=li(Wt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Wr(i,"global");return u}function mm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Po(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let h={...r,...g};return wn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Vt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:mm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(g=>{let h=s({...o,[e.key]:g})[e.key];return{value:g,label:h.display,full_value:h.full_value}})}}function zr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(g))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),d())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ci(e){return`session:${e.provider}:${e.session_id}`}function _s(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function gm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Hr(e,t,n,r){return{attempt_id:ci(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:_s(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:gm(e,n)}}}var ui="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",bm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",uu="\uBD84\uD574 \uC5C6\uB294 leg";function Jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Gn,"reasoning_output_tokens"],hm={codex:["implementation","review-consult"],claude:["subagent"]};function di(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Gn.some(t=>Number.isFinite(e[t]))}function ym(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function pi(e){let t=0;for(let n of Gn)t+=Jt(e?.[n]);return t}function vm(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function du(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function wm(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function pu(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function fu(e,t){return di(t)?Jt(t.total_tokens):e==="codex"?Jt(t.input_tokens)+Jt(t.output_tokens):pi(t)}function km(e){return e==="claude"?"Claude":"Codex"}function $m(e){return`\u03C4 ${mu(e)}`}function xm(e,t){let n=t.breakdown||{},r=Jt(t.total_only_subtotal);if(di(n)||r>0&&!ym(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,bm];return t.replayed&&u.push(ui),u.join(`
`)}let s=[`\uC785\uB825 ${Jt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Jt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${uu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${uu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ui),l.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${km(n)} ${$m(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:xm(n,r)})}return t}function Do(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Jt(i.total_only_subtotal)+Jt(a.total_only_subtotal));for(let l of Gr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Jt(i.breakdown[l])+Jt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function fi(e){return!e||typeof e!="object"?null:On({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Am(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:wm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Mo(e,t,n){e.subtotal+=t.subtotal,di(t.usage)&&(e.total_only+=t.subtotal);for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Jt(e.breakdown[r])+Jt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function _u(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function mu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return vm(e)?`\u03C4 ${mu(pi(e))}`:null}function Qn(e){let t=Kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ms(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${pi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ui),n.join(`
`)}function On(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(du(l)){let d=Am(i.runner),g=pu(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:g,subtotal:fu(d,g)};g.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Mo(n[d],h,!0),Mo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let g=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!hm[g].includes(d.role)||!du(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=pu(d.usage),w={provider:g,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:fu(g,b)};w.receipt_id=h,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),b.replayed===!0&&(w.replayed=!0),Mo(n[g],w,!1),Mo(r[w.role][g],w,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=_u(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={..._u(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:xu,setPrototypeOf:gu,isFrozen:Sm,getPrototypeOf:Em,getOwnPropertyDescriptor:Tm}=Object,{freeze:mn,seal:Ln,create:vi}=Object,{apply:wi,construct:ki}=typeof Reflect<"u"&&Reflect;mn||(mn=function(t){return t});Ln||(Ln=function(t){return t});wi||(wi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ki||(ki=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var No=gn(Array.prototype.forEach),Cm=gn(Array.prototype.lastIndexOf),bu=gn(Array.prototype.pop),gs=gn(Array.prototype.push),Rm=gn(Array.prototype.splice),Fo=gn(String.prototype.toLowerCase),_i=gn(String.prototype.toString),mi=gn(String.prototype.match),bs=gn(String.prototype.replace),Om=gn(String.prototype.indexOf),Lm=gn(String.prototype.trim),Dn=gn(Object.prototype.hasOwnProperty),_n=gn(RegExp.prototype.test),hs=Im(TypeError);function gn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return wi(e,t,r)}}function Im(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ki(e,n)}}function kt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fo;gu&&gu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Sm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Pm(e){for(let t=0;t<e.length;t++)Dn(e,t)||(e[t]=null);return e}function Xn(e){let t=vi(null);for(let[n,r]of xu(e))Dn(e,n)&&(Array.isArray(r)?t[n]=Pm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function ys(e,t){for(;e!==null;){let r=Tm(e,t);if(r){if(r.get)return gn(r.get);if(typeof r.value=="function")return gn(r.value)}e=Em(e)}function n(){return null}return n}var hu=mn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gi=mn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bi=mn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Mm=mn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),hi=mn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Dm=mn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),yu=mn(["#text"]),vu=mn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yi=mn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wu=mn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),qo=mn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nm=Ln(/\{\{[\w\W]*|[\w\W]*\}\}/gm),qm=Ln(/<%[\w\W]*|[\w\W]*%>/gm),Fm=Ln(/\$\{[\w\W]*/gm),jm=Ln(/^data-[\-\w.\u00B7-\uFFFF]+$/),Bm=Ln(/^aria-[\-\w]+$/),Au=Ln(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Um=Ln(/^(?:\w+script|data):/i),Wm=Ln(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Su=Ln(/^html$/i),zm=Ln(/^[a-z][.\w]*(-[.\w]+)+$/i),ku=Object.freeze({__proto__:null,ARIA_ATTR:Bm,ATTR_WHITESPACE:Wm,CUSTOM_ELEMENT:zm,DATA_ATTR:jm,DOCTYPE_NAME:Su,ERB_EXPR:qm,IS_ALLOWED_URI:Au,IS_SCRIPT_OR_DATA:Um,MUSTACHE_EXPR:Nm,TMPLIT_EXPR:Fm}),vs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Hm=function(){return typeof window>"u"?null:window},Gm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},$u=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Eu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hm(),t=Me=>Eu(Me);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==vs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:b}=e,w=l.prototype,D=ys(w,"cloneNode"),B=ys(w,"remove"),Y=ys(w,"nextSibling"),le=ys(w,"childNodes"),V=ys(w,"parentNode");if(typeof a=="function"){let Me=n.createElement("template");Me.content&&Me.content.ownerDocument&&(n=Me.content.ownerDocument)}let N,M="",{implementation:K,createNodeIterator:L,createDocumentFragment:I,getElementsByTagName:te}=n,{importNode:xe}=r,ke=$u();t.isSupported=typeof xu=="function"&&typeof V=="function"&&K&&K.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:ae,TMPLIT_EXPR:Te,DATA_ATTR:Pe,ARIA_ATTR:$e,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:Ce}=ku,{IS_ALLOWED_URI:z}=ku,ne=null,ge=kt({},[...hu,...gi,...bi,...hi,...yu]),Se=null,Ze=kt({},[...vu,...yi,...wu,...qo]),ue=Object.seal(vi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ue=null,mt=null,At=Object.seal(vi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),$t=!0,ct=!0,T=!1,ce=!0,Ie=!1,De=!0,Qe=!1,rt=!1,gt=!1,ht=!1,re=!1,Q=!1,Fe=!0,ot=!1,ze="user-content-",we=!0,Ke=!1,ut={},ft=null,_t=kt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Kt=kt({},["audio","video","img","source","image","track"]),Ht=null,Rt=kt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Lt="http://www.w3.org/1998/Math/MathML",Je="http://www.w3.org/2000/svg",Ne="http://www.w3.org/1999/xhtml",P=Ne,J=!1,ve=null,S=kt({},[Lt,Je,Ne],_i),H=kt({},["mi","mo","mn","ms","mtext"]),Le=kt({},["annotation-xml"]),$=kt({},["title","style","font","a","script"]),O=null,X=["application/xhtml+xml","text/html"],me="text/html",Ae=null,v=null,U=n.createElement("form"),ie=function(C){return C instanceof RegExp||C instanceof Function},Ve=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(v&&v===C)){if((!C||typeof C!="object")&&(C={}),C=Xn(C),O=X.indexOf(C.PARSER_MEDIA_TYPE)===-1?me:C.PARSER_MEDIA_TYPE,Ae=O==="application/xhtml+xml"?_i:Fo,ne=Dn(C,"ALLOWED_TAGS")?kt({},C.ALLOWED_TAGS,Ae):ge,Se=Dn(C,"ALLOWED_ATTR")?kt({},C.ALLOWED_ATTR,Ae):Ze,ve=Dn(C,"ALLOWED_NAMESPACES")?kt({},C.ALLOWED_NAMESPACES,_i):S,Ht=Dn(C,"ADD_URI_SAFE_ATTR")?kt(Xn(Rt),C.ADD_URI_SAFE_ATTR,Ae):Rt,Pt=Dn(C,"ADD_DATA_URI_TAGS")?kt(Xn(Kt),C.ADD_DATA_URI_TAGS,Ae):Kt,ft=Dn(C,"FORBID_CONTENTS")?kt({},C.FORBID_CONTENTS,Ae):_t,Ue=Dn(C,"FORBID_TAGS")?kt({},C.FORBID_TAGS,Ae):Xn({}),mt=Dn(C,"FORBID_ATTR")?kt({},C.FORBID_ATTR,Ae):Xn({}),ut=Dn(C,"USE_PROFILES")?C.USE_PROFILES:!1,$t=C.ALLOW_ARIA_ATTR!==!1,ct=C.ALLOW_DATA_ATTR!==!1,T=C.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=C.SAFE_FOR_TEMPLATES||!1,De=C.SAFE_FOR_XML!==!1,Qe=C.WHOLE_DOCUMENT||!1,ht=C.RETURN_DOM||!1,re=C.RETURN_DOM_FRAGMENT||!1,Q=C.RETURN_TRUSTED_TYPE||!1,gt=C.FORCE_BODY||!1,Fe=C.SANITIZE_DOM!==!1,ot=C.SANITIZE_NAMED_PROPS||!1,we=C.KEEP_CONTENT!==!1,Ke=C.IN_PLACE||!1,z=C.ALLOWED_URI_REGEXP||Au,P=C.NAMESPACE||Ne,H=C.MATHML_TEXT_INTEGRATION_POINTS||H,Le=C.HTML_INTEGRATION_POINTS||Le,ue=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&ie(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&ie(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(ct=!1),re&&(ht=!0),ut&&(ne=kt({},yu),Se=[],ut.html===!0&&(kt(ne,hu),kt(Se,vu)),ut.svg===!0&&(kt(ne,gi),kt(Se,yi),kt(Se,qo)),ut.svgFilters===!0&&(kt(ne,bi),kt(Se,yi),kt(Se,qo)),ut.mathMl===!0&&(kt(ne,hi),kt(Se,wu),kt(Se,qo))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?At.tagCheck=C.ADD_TAGS:(ne===ge&&(ne=Xn(ne)),kt(ne,C.ADD_TAGS,Ae))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?At.attributeCheck=C.ADD_ATTR:(Se===Ze&&(Se=Xn(Se)),kt(Se,C.ADD_ATTR,Ae))),C.ADD_URI_SAFE_ATTR&&kt(Ht,C.ADD_URI_SAFE_ATTR,Ae),C.FORBID_CONTENTS&&(ft===_t&&(ft=Xn(ft)),kt(ft,C.FORBID_CONTENTS,Ae)),we&&(ne["#text"]=!0),Qe&&kt(ne,["html","head","body"]),ne.table&&(kt(ne,["tbody"]),delete Ue.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw hs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw hs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=C.TRUSTED_TYPES_POLICY,M=N.createHTML("")}else N===void 0&&(N=Gm(b,s)),N!==null&&typeof M=="string"&&(M=N.createHTML(""));mn&&mn(C),v=C}},je=kt({},[...gi,...bi,...Mm]),he=kt({},[...hi,...Dm]),Ot=function(C){let ye=V(C);(!ye||!ye.tagName)&&(ye={namespaceURI:P,tagName:"template"});let qe=Fo(C.tagName),xt=Fo(ye.tagName);return ve[C.namespaceURI]?C.namespaceURI===Je?ye.namespaceURI===Ne?qe==="svg":ye.namespaceURI===Lt?qe==="svg"&&(xt==="annotation-xml"||H[xt]):!!je[qe]:C.namespaceURI===Lt?ye.namespaceURI===Ne?qe==="math":ye.namespaceURI===Je?qe==="math"&&Le[xt]:!!he[qe]:C.namespaceURI===Ne?ye.namespaceURI===Je&&!Le[xt]||ye.namespaceURI===Lt&&!H[xt]?!1:!he[qe]&&($[qe]||!je[qe]):!!(O==="application/xhtml+xml"&&ve[C.namespaceURI]):!1},yt=function(C){gs(t.removed,{element:C});try{V(C).removeChild(C)}catch{B(C)}},bt=function(C,ye){try{gs(t.removed,{attribute:ye.getAttributeNode(C),from:ye})}catch{gs(t.removed,{attribute:null,from:ye})}if(ye.removeAttribute(C),C==="is")if(ht||re)try{yt(ye)}catch{}else try{ye.setAttribute(C,"")}catch{}},Qt=function(C){let ye=null,qe=null;if(gt)C="<remove></remove>"+C;else{let wt=mi(C,/^[\r\n\t ]+/);qe=wt&&wt[0]}O==="application/xhtml+xml"&&P===Ne&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let xt=N?N.createHTML(C):C;if(P===Ne)try{ye=new h().parseFromString(xt,O)}catch{}if(!ye||!ye.documentElement){ye=K.createDocument(P,"template",null);try{ye.documentElement.innerHTML=J?M:xt}catch{}}let jt=ye.body||ye.documentElement;return C&&qe&&jt.insertBefore(n.createTextNode(qe),jt.childNodes[0]||null),P===Ne?te.call(ye,Qe?"html":"body")[0]:Qe?ye.documentElement:jt},Ft=function(C){return L.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},an=function(C){return C instanceof g&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},en=function(C){return typeof i=="function"&&C instanceof i};function nn(Me,C,ye){No(Me,qe=>{qe.call(t,C,ye,v)})}let Xt=function(C){let ye=null;if(nn(ke.beforeSanitizeElements,C,null),an(C))return yt(C),!0;let qe=Ae(C.nodeName);if(nn(ke.uponSanitizeElement,C,{tagName:qe,allowedTags:ne}),De&&C.hasChildNodes()&&!en(C.firstElementChild)&&_n(/<[/\w!]/g,C.innerHTML)&&_n(/<[/\w!]/g,C.textContent)||C.nodeType===vs.progressingInstruction||De&&C.nodeType===vs.comment&&_n(/<[/\w]/g,C.data))return yt(C),!0;if(!(At.tagCheck instanceof Function&&At.tagCheck(qe))&&(!ne[qe]||Ue[qe])){if(!Ue[qe]&&Ye(qe)&&(ue.tagNameCheck instanceof RegExp&&_n(ue.tagNameCheck,qe)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(qe)))return!1;if(we&&!ft[qe]){let xt=V(C)||C.parentNode,jt=le(C)||C.childNodes;if(jt&&xt){let wt=jt.length;for(let Bt=wt-1;Bt>=0;--Bt){let tn=D(jt[Bt],!0);tn.__removalCount=(C.__removalCount||0)+1,xt.insertBefore(tn,Y(C))}}}return yt(C),!0}return C instanceof l&&!Ot(C)||(qe==="noscript"||qe==="noembed"||qe==="noframes")&&_n(/<\/no(script|embed|frames)/i,C.innerHTML)?(yt(C),!0):(Ie&&C.nodeType===vs.text&&(ye=C.textContent,No([_e,ae,Te],xt=>{ye=bs(ye,xt," ")}),C.textContent!==ye&&(gs(t.removed,{element:C.cloneNode()}),C.textContent=ye)),nn(ke.afterSanitizeElements,C,null),!1)},on=function(C,ye,qe){if(Fe&&(ye==="id"||ye==="name")&&(qe in n||qe in U))return!1;if(!(ct&&!mt[ye]&&_n(Pe,ye))){if(!($t&&_n($e,ye))){if(!(At.attributeCheck instanceof Function&&At.attributeCheck(ye,C))){if(!Se[ye]||mt[ye]){if(!(Ye(C)&&(ue.tagNameCheck instanceof RegExp&&_n(ue.tagNameCheck,C)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(C))&&(ue.attributeNameCheck instanceof RegExp&&_n(ue.attributeNameCheck,ye)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(ye,C))||ye==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&_n(ue.tagNameCheck,qe)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(qe))))return!1}else if(!Ht[ye]){if(!_n(z,bs(qe,Z,""))){if(!((ye==="src"||ye==="xlink:href"||ye==="href")&&C!=="script"&&Om(qe,"data:")===0&&Pt[C])){if(!(T&&!_n(ee,bs(qe,Z,"")))){if(qe)return!1}}}}}}}return!0},Ye=function(C){return C!=="annotation-xml"&&mi(C,Ce)},hn=function(C){nn(ke.beforeSanitizeAttributes,C,null);let{attributes:ye}=C;if(!ye||an(C))return;let qe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0},xt=ye.length;for(;xt--;){let jt=ye[xt],{name:wt,namespaceURI:Bt,value:tn}=jt,ln=Ae(wt),$n=tn,Ut=wt==="value"?$n:Lm($n);if(qe.attrName=ln,qe.attrValue=Ut,qe.keepAttr=!0,qe.forceKeepAttr=void 0,nn(ke.uponSanitizeAttribute,C,qe),Ut=qe.attrValue,ot&&(ln==="id"||ln==="name")&&(bt(wt,C),Ut=ze+Ut),De&&_n(/((--!?|])>)|<\/(style|title|textarea)/i,Ut)){bt(wt,C);continue}if(ln==="attributename"&&mi(Ut,"href")){bt(wt,C);continue}if(qe.forceKeepAttr)continue;if(!qe.keepAttr){bt(wt,C);continue}if(!ce&&_n(/\/>/i,Ut)){bt(wt,C);continue}Ie&&No([_e,ae,Te],xn=>{Ut=bs(Ut,xn," ")});let Cn=Ae(C.nodeName);if(!on(Cn,ln,Ut)){bt(wt,C);continue}if(N&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(Cn,ln)){case"TrustedHTML":{Ut=N.createHTML(Ut);break}case"TrustedScriptURL":{Ut=N.createScriptURL(Ut);break}}if(Ut!==$n)try{Bt?C.setAttributeNS(Bt,wt,Ut):C.setAttribute(wt,Ut),an(C)?yt(C):bu(t.removed)}catch{bt(wt,C)}}nn(ke.afterSanitizeAttributes,C,null)},tt=function Me(C){let ye=null,qe=Ft(C);for(nn(ke.beforeSanitizeShadowDOM,C,null);ye=qe.nextNode();)nn(ke.uponSanitizeShadowNode,ye,null),Xt(ye),hn(ye),ye.content instanceof o&&Me(ye.content);nn(ke.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Me){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ye=null,qe=null,xt=null,jt=null;if(J=!Me,J&&(Me="<!-->"),typeof Me!="string"&&!en(Me))if(typeof Me.toString=="function"){if(Me=Me.toString(),typeof Me!="string")throw hs("dirty is not a string, aborting")}else throw hs("toString is not a function");if(!t.isSupported)return Me;if(rt||Ve(C),t.removed=[],typeof Me=="string"&&(Ke=!1),Ke){if(Me.nodeName){let tn=Ae(Me.nodeName);if(!ne[tn]||Ue[tn])throw hs("root node is forbidden and cannot be sanitized in-place")}}else if(Me instanceof i)ye=Qt("<!---->"),qe=ye.ownerDocument.importNode(Me,!0),qe.nodeType===vs.element&&qe.nodeName==="BODY"||qe.nodeName==="HTML"?ye=qe:ye.appendChild(qe);else{if(!ht&&!Ie&&!Qe&&Me.indexOf("<")===-1)return N&&Q?N.createHTML(Me):Me;if(ye=Qt(Me),!ye)return ht?null:Q?M:""}ye&&gt&&yt(ye.firstChild);let wt=Ft(Ke?Me:ye);for(;xt=wt.nextNode();)Xt(xt),hn(xt),xt.content instanceof o&&tt(xt.content);if(Ke)return Me;if(ht){if(re)for(jt=I.call(ye.ownerDocument);ye.firstChild;)jt.appendChild(ye.firstChild);else jt=ye;return(Se.shadowroot||Se.shadowrootmode)&&(jt=xe.call(r,jt,!0)),jt}let Bt=Qe?ye.outerHTML:ye.innerHTML;return Qe&&ne["!doctype"]&&ye.ownerDocument&&ye.ownerDocument.doctype&&ye.ownerDocument.doctype.name&&_n(Su,ye.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+ye.ownerDocument.doctype.name+`>
`+Bt),Ie&&No([_e,ae,Te],tn=>{Bt=bs(Bt,tn," ")}),N&&Q?N.createHTML(Bt):Bt},t.setConfig=function(){let Me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ve(Me),rt=!0},t.clearConfig=function(){v=null,rt=!1},t.isValidAttribute=function(Me,C,ye){v||Ve({});let qe=Ae(Me),xt=Ae(C);return on(qe,xt,ye)},t.addHook=function(Me,C){typeof C=="function"&&gs(ke[Me],C)},t.removeHook=function(Me,C){if(C!==void 0){let ye=Cm(ke[Me],C);return ye===-1?void 0:Rm(ke[Me],ye,1)[0]}return bu(ke[Me])},t.removeHooks=function(Me){ke[Me]=[]},t.removeAllHooks=function(){ke=$u()},t}var Tu=Eu();var Jn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jo=e=>(...t)=>({_$litDirective$:e,values:t}),Vr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ws=class extends Vr{constructor(t){if(super(t),this.it=Zt,t.type!==Jn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Zt||t==null)return this._t=void 0,this.it=t;if(t===Rn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ws.directiveName="unsafeHTML",ws.resultType=1;var Cu=jo(ws);function Si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ar=Si();function Du(e){Ar=e}var As={exec:()=>null};function Ct(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(bn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Km=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Vm=/^(?:[ \t]*(?:\n|$))+/,Ym=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Zm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ss=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Qm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ei=/(?:[*+-]|\d{1,9}[.)])/,Nu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qu=Ct(Nu).replace(/bull/g,Ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xm=Ct(Nu).replace(/bull/g,Ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ti=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Jm=/^[^\n]+/,Ci=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,eg=Ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ci).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),tg=Ct(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ei).getRegex(),Go="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ri=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ng=Ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ri).replace("tag",Go).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Fu=Ct(Ti).replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),rg=Ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Fu).getRegex(),Oi={blockquote:rg,code:Ym,def:eg,fences:Zm,heading:Qm,hr:Ss,html:ng,lheading:qu,list:tg,newline:Vm,paragraph:Fu,table:As,text:Jm},Ru=Ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),sg={...Oi,lheading:Xm,table:Ru,paragraph:Ct(Ti).replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ru).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex()},og={...Oi,html:Ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ri).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:As,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ct(Ti).replace("hr",Ss).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ag=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ig=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ju=/^( {2,}|\\)\n(?!\s*$)/,lg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ko=/[\p{P}\p{S}]/u,Li=/[\s\p{P}\p{S}]/u,Bu=/[^\s\p{P}\p{S}]/u,cg=Ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Li).getRegex(),Uu=/(?!~)[\p{P}\p{S}]/u,ug=/(?!~)[\s\p{P}\p{S}]/u,dg=/(?:[^\s\p{P}\p{S}]|~)/u,pg=Ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Km?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Wu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,fg=Ct(Wu,"u").replace(/punct/g,Ko).getRegex(),_g=Ct(Wu,"u").replace(/punct/g,Uu).getRegex(),zu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mg=Ct(zu,"gu").replace(/notPunctSpace/g,Bu).replace(/punctSpace/g,Li).replace(/punct/g,Ko).getRegex(),gg=Ct(zu,"gu").replace(/notPunctSpace/g,dg).replace(/punctSpace/g,ug).replace(/punct/g,Uu).getRegex(),bg=Ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bu).replace(/punctSpace/g,Li).replace(/punct/g,Ko).getRegex(),hg=Ct(/\\(punct)/,"gu").replace(/punct/g,Ko).getRegex(),yg=Ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),vg=Ct(Ri).replace("(?:-->|$)","-->").getRegex(),wg=Ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",vg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Wo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,kg=Ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Wo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hu=Ct(/^!?\[(label)\]\[(ref)\]/).replace("label",Wo).replace("ref",Ci).getRegex(),Gu=Ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ci).getRegex(),$g=Ct("reflink|nolink(?!\\()","g").replace("reflink",Hu).replace("nolink",Gu).getRegex(),Ou=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ii={_backpedal:As,anyPunctuation:hg,autolink:yg,blockSkip:pg,br:ju,code:ig,del:As,emStrongLDelim:fg,emStrongRDelimAst:mg,emStrongRDelimUnd:bg,escape:ag,link:kg,nolink:Gu,punctuation:cg,reflink:Hu,reflinkSearch:$g,tag:wg,text:lg,url:As},xg={...Ii,link:Ct(/^!?\[(label)\]\((.*?)\)/).replace("label",Wo).getRegex(),reflink:Ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wo).getRegex()},$i={...Ii,emStrongRDelimAst:gg,emStrongLDelim:_g,url:Ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ou).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ou).getRegex()},Ag={...$i,br:Ct(ju).replace("{2,}","*").getRegex(),text:Ct($i.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bo={normal:Oi,gfm:sg,pedantic:og},ks={normal:Ii,gfm:$i,breaks:Ag,pedantic:xg},Sg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Lu=e=>Sg[e];function er(e,t){if(t){if(bn.escapeTest.test(e))return e.replace(bn.escapeReplace,Lu)}else if(bn.escapeTestNoEncode.test(e))return e.replace(bn.escapeReplaceNoEncode,Lu);return e}function Iu(e){try{e=encodeURI(e).replace(bn.percentDecode,"%")}catch{return null}return e}function Pu(e,t){let n=e.replace(bn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(bn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(bn.slashPipe,"|");return r}function $s(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Eg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Mu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Tg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var zo=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Ar}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:$s(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Tg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=$s(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$s(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=$s(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=g,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,w=b.raw+`
`+n.join(`
`),D=this.blockquote(w);o[o.length-1]=D,r=r.substring(0,r.length-b.raw.length)+D.raw,s=s.substring(0,s.length-b.text.length)+D.text;break}else if(h?.type==="list"){let b=h,w=b.raw+`
`+n.join(`
`),D=this.list(w);o[o.length-1]=D,r=r.substring(0,r.length-h.raw.length)+D.raw,s=s.substring(0,s.length-b.raw.length)+D.raw,n=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),h=e.split(`
`,1)[0],b=!g.trim(),w=0;if(this.options.pedantic?(w=2,d=g.trimStart()):b?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=g.slice(w),w+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let D=this.rules.other.nextBulletRegex(w),B=this.rules.other.hrRegex(w),Y=this.rules.other.fencesBeginRegex(w),le=this.rules.other.headingBeginRegex(w),V=this.rules.other.htmlBeginRegex(w);for(;e;){let N=e.split(`
`,1)[0],M;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),M=h):M=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||le.test(h)||V.test(h)||D.test(h)||B.test(h))break;if(M.search(this.rules.other.nonSpaceChar)>=w||!h.trim())d+=`
`+M.slice(w);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(g)||le.test(g)||B.test(g))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=N+`
`,e=e.substring(N.length+1),g=M.slice(w)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Pu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Pu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=$s(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Eg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Mu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Mu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,g=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class xi{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ar,this.options.tokenizer=this.options.tokenizer||new zo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:bn,block:Bo.normal,inline:ks.normal};this.options.pedantic?(n.block=Bo.pedantic,n.inline=ks.pedantic):this.options.gfm&&(n.block=Bo.gfm,this.options.breaks?n.inline=ks.breaks:n.inline=ks.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bo,inline:ks}}static lex(t,n){return new xi(n).lex(t)}static lexInline(t,n){return new xi(n).inlineTokens(t)}lex(t){t=t.replace(bn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(bn.tabCharGlobal,"    ").replace(bn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},g),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ho=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Ar}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(bn.notSpaceStart)?.[0],s=e.replace(bn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+er(r)+'">'+(n?s:er(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:er(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Iu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Iu(e);if(s===null)return er(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},Pi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qn=class Ai{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Ar,this.options.renderer=this.options.renderer||new Ho,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pi}static parse(t,n){return new Ai(n).parse(t)}static parseInline(t,n){return new Ai(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Uo,xs=(Uo=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Ar}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?qn.parse:qn.parseInline}},qt(Uo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(Uo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Uo),Cg=class{constructor(...e){qt(this,"defaults",Si());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",qn);qt(this,"Renderer",Ho);qt(this,"TextRenderer",Pi);qt(this,"Lexer",Nn);qt(this,"Tokenizer",zo);qt(this,"Hooks",xs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ho(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new zo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new xs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];xs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&xs.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await i.call(s,u);return l.call(s,g)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await i.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return qn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qn.parse:qn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qn.parse:qn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+er(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},xr=new Cg;function It(e,t){return xr.parse(e,t)}It.options=It.setOptions=function(e){return xr.setOptions(e),It.defaults=xr.defaults,Du(It.defaults),It};It.getDefaults=Si;It.defaults=Ar;It.use=function(...e){return xr.use(...e),It.defaults=xr.defaults,Du(It.defaults),It};It.walkTokens=function(e,t){return xr.walkTokens(e,t)};It.parseInline=xr.parseInline;It.Parser=qn;It.parser=qn.parse;It.Renderer=Ho;It.TextRenderer=Pi;It.Lexer=Nn;It.lexer=Nn.lex;It.Tokenizer=zo;It.Hooks=xs;It.parse=It;var bk=It.options,hk=It.setOptions,yk=It.use,vk=It.walkTokens,wk=It.parseInline;var kk=qn.parse,$k=Nn.lex;function ir(e){let t=It.parse(e),n=Tu.sanitize(t);return Cu(n)}function tr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Yr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Vo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Vu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Rg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Og=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Lg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Mi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Di(e,t){let n=Mi(e),r=Mi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Yu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Fn(s)&&typeof s.text=="string"?s.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ig(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Vu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Mi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Di(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Di(Fn(i)?i.old_string:"",Fn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ni(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Pg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Zu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Pg,"").trim();return n.length>0?{kind:"user",text:n}:null}function qi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Og.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Lg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Mg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Dg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Fn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(qi(a.text));else if(a.type==="thinking"){let i=Ni(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Ig(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Ku(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Fn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=Yu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Zu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Ku([s],n):[s]}return[]}function Ku(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Ng(e){let t=typeof e.command=="string"?e.command:"",n=Yu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Vu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function qg(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[qi(t.text)];if(t.type==="user_message"){let n=Zu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ni(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Ng(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Fg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[qi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ni(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Rg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function jg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Bg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Qu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Bg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Mg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Fg(o):jg(o)?qg(o):Dg(o,n);return a.length>0&&(r.progress=null),a}}}function Fi(e){let t=[],n=Qu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Ug=5,Wg=10,zg=/Task\s+#(\d+)/,Hg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Es(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Kg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Vg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Yg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=zg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Zg(e){if(e.tool==="Bash"){let t=e.command||"";return Hg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Qg(e){let t=e.filter(s=>s.kind==="tool").slice(-Wg),n=new Map;t.forEach((s,o)=>{let a=Zg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Xg(e){let t=Vg(e);if(t)return{text:t,guess:!1};let n=Yg(e);if(n)return{text:n,guess:!1};let r=Qg(e);return r?{text:r,guess:!0}:null}function Jg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:vn(e,t)}function Zr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,g={},h=!0,b=new Set,w=new Set,D=null,B=null,Y=!1,le=!1,V=!1,N=null,M=null;function K(){Y=!1,le=!1,V=!1,N=null,M=null}async function L(re){if(n){le=!0,V=!1,Ue();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(o!==re)return;!Q||typeof Q!="object"||Array.isArray(Q)?V=!0:(N=Q,M=re)}catch{o===re&&(V=!0)}finally{o===re&&(le=!1,Ue())}}}function I(){if(Y=!Y,Y&&o&&M!==o){L(o);return}Ue()}function te(){if(!Y)return"";let re=Yr({loading:le,error:V});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Vo(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function xe(){if(!l||!r)return[];let re=r.get(l);return Fi(re?re.lines:[])}function ke(){if(!l||!r)return null;let re=r.get(l),Q=re?re.last_event_at:null;return typeof Q=="number"?Q:null}function _e(){return g.status==="running"}function ae(){if(_e()&&o){B||(B=setInterval(()=>Ue(),1e3));return}Te()}function Te(){B&&(clearInterval(B),B=null)}function Pe(re){let Q=[],Fe=0;for(;Fe<re.length;){let{idx:ot,line:ze}=re[Fe];if(ze.kind==="tool"){let we=Fe;for(;we<re.length&&re[we].line.kind==="tool"&&re[we].line.tool===ze.tool;)we+=1;if(we-Fe>=Ug&&!w.has(ot)){Q.push({kind:"group",idx:ot,tool:ze.tool||"",lines:re.slice(Fe,we)}),Fe=we;continue}}Q.push({kind:"line",idx:ot,line:ze}),Fe+=1}return Q}function $e(re){let Q=[],Fe=new Map;for(let we=0;we<re.length;we+=1){let Ke=re[we],ut=Ke.parent_tool_use_id;if(typeof ut=="string"&&ut.length>0){let ft=Fe.get(ut);ft||(ft={kind:"subagent",idx:we,launch_id:ut,agent_type:null,header:null,lines:[]},Fe.set(ut,ft),Q.push(ft)),ft.lines.push({idx:we,line:Ke});continue}if(Ke.kind==="tool"&&Ke.tool==="Agent"&&typeof Ke.launch_id=="string"&&Ke.launch_id.length>0){let ft=ee(Ke),_t=Fe.get(Ke.launch_id);if(_t){_t.header={idx:we,line:Ke},_t.agent_type=ft;continue}let Pt={kind:"subagent",idx:we,launch_id:Ke.launch_id,agent_type:ft,header:{idx:we,line:Ke},lines:[]};Fe.set(Ke.launch_id,Pt),Q.push(Pt);continue}Q.push({kind:"entry",idx:we,line:Ke})}let ot=[],ze=0;for(;ze<Q.length;){if(Q[ze].kind!=="entry"){ot.push(Q[ze]),ze+=1;continue}let we=ze;for(;we<Q.length&&Q[we].kind==="entry";)we+=1;ot.push(...Pe(Q.slice(ze,we))),ze=we}return ot}function ee(re){let Q=re.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Z(re){for(let Q=re.length-1;Q>=0;Q-=1){let Fe=re[Q];if(Fe.kind==="result"||Fe.kind==="error")return null;if(Fe.kind==="tool"&&!Object.hasOwn(Fe,"result"))return Fe}return null}function Ce(re){for(let Q=re.length-1;Q>=0;Q-=1)if(re[Q].kind==="thinking")return re[Q];return null}function z(re,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ir(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Fe=b.has(re);return c`<div
        class="sv__think${Fe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>At(re)}
      >
        <span class="sv__think-line">💭 ${Es(Q.text)}</span>
        ${Fe?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let Fe=b.has(re);return c`<div
        class="sv__line sv__line--user${Fe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>At(re)}
      >
        <span class="sv__user-line">▷ ${Es(Q.text)}</span>
        ${Fe?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Fe=b.has(re),ot=Q.tool==="Bash"?Kg(Q.command):0,ze=Q.tool==="Bash"?ot>1?Es(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Fe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>At(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${ze?c`<span class="sv__tool-detail">${ze}</span>`:""}
          ${ot>1?c`<span class="sv__tool-more">⋯ ${ot}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Fe?c`<pre class="sv__tool-expand">${ne(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ir(Q.text||"")}</div>`}function ne(re){let Q=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)Q.push(re.command);else if(re.input!==void 0)try{Q.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&Q.push(`output:
${re.output}`),Q.join(`

`)}function ge(){if(!o)return c``;let re=xe(),Q=(a?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),Fe=g.session_id||"",ot=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,ze=_e(),we=ze?Jg(ke(),Date.now()):"",Ke=ze?Z(re):null,ut=ze?Ce(re):null,ft=Xg(re);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(a?g.role||"":o)}</span
        >
        ${ft?c`<span
              class="sv__stage${ft.guess?" sv__stage--guess":""}"
              title=${ft.text}
              >${ft.text}</span
            >`:""}
        ${ze?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?c`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${Fe?c`<button
              type="button"
              class="sv__session"
              title=${Fe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Fe}`}
              @click=${()=>ct(Fe)}
            >
              ⧉ ${Fe.slice(0,8)}
            </button>`:""}
        ${g.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>ct(g.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${g.worktree?c`<span class="sv__wt" title=${g.worktree}
              >${g.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
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
          aria-label=${ot}
          @click=${$t}
        >
          <span class="sv__follow-full">⇣ ${ot}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ht()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":te()}
      <div class="sv__body">
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(re).map(_t=>_t.kind==="subagent"?Ze(_t):_t.kind==="group"?Se(_t):z(_t.idx,_t.line))}
      </div>
      ${Ke||ut?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ke?c`<span class="sv__now-icon">${Ke.icon}</span>
                  <span class="sv__now-name">${Ke.tool}</span>
                  <span class="sv__now-detail"
                    >${Ke.tool==="Bash"?Es(Ke.command):Ke.path||Ke.command||""}</span
                  >`:""}
            ${ut?c`<span class="sv__now-think"
                  >💭 ${Es(ut.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ue(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ze(re){let Q=w.has(re.idx),Fe=re.header?re.header.line:null,ot=Fe?Fe.is_error===!0?"\u2717":typeof Fe.result=="string"?"\u2713":"\u27F3":"",ze=Fe&&Fe.command?Fe.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${ze?c`<span class="sv__sub-detail">${ze}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${ot?c`<span class="sv__sub-state">${ot}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Pe(re.lines).map(we=>we.kind==="group"?Se(we):z(we.idx,we.line))}
          </div>`:""}
    </div>`}function ue(re){w.add(re),Ue()}function Ue(){st(ge(),e),ae(),h&&mt()}function mt(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function At(re){b.has(re)?b.delete(re):b.add(re),Ue()}function $t(){h=!h,Ue()}function ct(re){Sn(re).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(re){!o||!re||(g={...g,...re},Ue())}function ce(re){let Q=re.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&h&&(h=!1,Ue())}e.addEventListener("scroll",ce,!0);function Ie(re){let Q=re.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||ht()}let De=!1;function Qe(){De||(document.addEventListener("mousedown",Ie),De=!0)}function rt(){De&&(document.removeEventListener("mousedown",Ie),De=!1)}function gt(re){let Q=re&&re.attempt_id;if(!Q)return;let Fe=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,ot=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(Fe&&ot)return;let ze=l;o=Q,a=Fe,i=ot,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&ze&&ze!==l&&Promise.resolve(n("unsubscribe-session-log",{id:ze})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,g=re.meta||{},d=re.hide_prompt===!0,h=!0,b.clear(),w.clear(),K(),!D&&r&&(D=r.subscribe(Ue)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Qe(),Ue()}function ht(){let re=l;rt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),w.clear(),K(),Te(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),st(c``,e),s&&s()}return{open:gt,updateMeta:T,close:ht,isOpen(){return o!==null},destroy(){Te(),rt(),D&&(D(),D=null),e.removeEventListener("scroll",ce,!0),o=null,a=null,i=null,l=null,u=null,d=!1,st(c``,e)}}}function eb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Yo(t.spec_id),s=Yo(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Yo(e){return typeof e=="string"?e.trim():""}function tb(e){let t=eb(e);if(t.path)return t;let n=Yo(Xu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Xu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var nb=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ts(e){let t=tb(e),n=Yo(Xu(e).spec_review),r=nb.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function rb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function sb(e){let t=e&&e.metadata||{},n=Ts(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:rb(t)?null:"plan_pending"}),r}function Ju(e,t){let n=sb(e);return c`
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
  `}var ob="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ab=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ib=/^\*\*결론\*\* — (.+)$/;function Zo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ob)return null;let n=ab.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ib.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ed=20;function td(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function lb(e){return e.length>ed?`${e.slice(0,ed)}\u2026`:e}function cb(e,t,n,r){let s=`${t.lane} ${lb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${td(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${ir(t.body)}
        </div>`:""}
  </div>`}function ub(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${td(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ir(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function nd(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Zo(typeof l.text=="string"?l.text:"");return u?cb(l,u,t,s.has(l.id)):ub(l)})}
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
  `}var{I:s$}=hc;var rd=e=>e.strings===void 0;var db={},sd=(e,t=db)=>e._$AH=t;var Sr=jo(class extends Vr{constructor(e){if(super(e),e.type!==Jn.PROPERTY&&e.type!==Jn.ATTRIBUTE&&e.type!==Jn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!rd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Rn||t===Zt)return t;let n=e.element,r=e.name;if(e.type===Jn.PROPERTY){if(t===n[r])return Rn}else if(e.type===Jn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Rn}else if(e.type===Jn.ATTRIBUTE&&n.getAttribute(r)===t+"")return Rn;return sd(e),t}});var Qo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Bi=[...Qo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Xo=[...Qo,...nr],pb=Bi.filter(e=>Xo.includes(e)),od=["delegated","main"],Jo=["inherit","claude","codex"],Cs=["default","fast"],Rs=["standard","fast_track"],Os=["codex","opus","fable","self","skip"],ea=["codex","fable","skip"],ta=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ad(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Qr(e,t){let n=ad(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Tn,...r.flatMap(([,s])=>s)]}function id(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!En(a)||!En(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Tn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Tn,...s]}function Xr(e,t,n){return id(e,t,n,(r,s)=>En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ui(e,t,n){return id(e,t,n,(r,s)=>En(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ls(e,t){let n=ad(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function ld(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Qr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Xr(t,s,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var fb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ji=[...pb,...nr],_b=[...Xo,...Bi].filter((e,t,n)=>n.indexOf(e)===t&&!ji.includes(e));function cd(e,t){let n=En(e)?e:{},r=En(t)?t:{},s=[];for(let a of ji){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:fb[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[..._b,...Object.keys(r)])!ji.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Wi(e,t,n,r,s,o){return Po({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function ud(e,t){let n={};for(let r of Bi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function dd(e,t){let n={};for(let r of nr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var zi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],lr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},na={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Hi(e,t,n,r,s,o=null){let a=wn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function pd(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Hi(e,t,n,r,s,o))a[i.source]+=1;return a}function fd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function _d(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var m$=[...Qo,...nr];var mb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Gi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},md={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},gb={pin:"pin",global:"global",base:"base"};function bb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${gb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function hb(e,t,n){switch(e){case"workflow_mode":return Rs;case"spec_review_model":case"impl_review_model":return Os;case"plan_review_model":return ea;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ta;case"impl_dispatch":return od;case"impl_runtime":return Jo;case"impl_model":return Qr(n,t.impl_runtime);case"impl_effort":return Xr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Cs;case"orchestration_model":return Ls(n,null);case"orchestration_effort":return Xr(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function yb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${bb(e.source)}
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
      >${na[e.source]}</span
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
  </div>`}function gd(e,t){let n=zi.flatMap(l=>l.keys),r=Hi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=pd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${vb(o)}</span
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
          ${zi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Po({key:u.key,choices:hb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return yb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Sr(e.preset_id)}
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
  </details>`}function vb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function wb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function bd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=wb(n.exec_receipt),l=i?Yn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Lo(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,h=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${kb(s).map(b=>$b(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function kb(e){let n=typeof e=="string"&&Object.hasOwn(Gi,e)&&Gi[e]||Gi.spec_backed;return mb.filter(r=>n.includes(r.id))}var ra={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function $b(e,t,n,r){let s=xb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",g=u?ra.stale:i?ra.on:l?ra.current:ra.none,h=Ab(e,n),b=`${r.label} \xB7 ${g}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,w=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,D=c`<span class="detail-summary__gate-label"
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
      title=${b}
      >${D}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${D}</span
  >`}function xb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Ab(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(md,n)?md[n]:""}function sa(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function hd(e){return sa(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function yd(e,t){let n=e&&e[t];if(!sa(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(hd),s=hd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function kd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function oa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${kd(e)}${t}`}function Jr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${kd(e)}`}function Sb(e,t,n){if(n!==null){let s=e==="claude"?oa:Jr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Jr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function vd(e,t){if(!sa(e)||e.state!=="usable"||!sa(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function wd(e){let t=e.provider_key==="claude"?oa:Jr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Sb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function $d({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${wd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:yd(t,"claude"),selected:s,workspace_default:vd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${wd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:yd(t,"codex"),selected:o,workspace_default:vd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var xd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Is(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function aa(e){if(!Is(e)||!Is(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Is(n)&&Is(n.models));return t.length>0?t:null}function jn(e,t){let n=aa(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Ad(e,t){return Is(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Sd(e,t){let n=aa(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Ad(r,r.models[t]);return[]}function Eb(e){let t=aa(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Ad(r,s))n.includes(o)||n.push(o);return n}function Tb(e,t){if(!t)return Eb(e);let r=aa(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Sd(e,o))s.includes(a)||s.push(a);return s}function Ed(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=jn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Sd(t,r.impl_model):Tb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Cb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Rb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ia(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(D){D.key==="Escape"&&s&&(D.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Cb(s)}</span
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
                        >`}${ir(a)}`}
          </div>
        </div>
      </div>
    `:c``}function g(){st(d(),e)}async function h(D,B={}){s=D,o="loading",a="",i=null,l="",g();let Y=B.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let le="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(D);try{let V=await r(le),N=await V.json().catch(()=>({}));if(!V.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||V.status)+")",g();return}let M=Rb(String(N.content||""));i=M.front,a=M.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function b(){s=null,st(c``,e)}function w(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:w}}var Ob=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Rd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",la=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Lb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Td(e){return typeof e=="string"&&Lb.has(e)}var Ib=["running","done","failed","interrupted"],Pb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Mb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Db(e){let t=un(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Rd}
          >부분 집계</span
        >`:""}`}function Cd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Yi(e){if(typeof e=="number")return Ps(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ps(t):""}function Nb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function qb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ki(e){return e===null||typeof e=="string"&&e.trim().length>0}function Vi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Fb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!la.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ki(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ki(t.effort))||!(!("agent_type"in t)||Ki(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ib.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Vi(t.started_at)||!Vi(t.last_event_at)||!Vi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function jb(e,t,n){let s=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Yi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Yi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Bb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?un({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ps(e.last_event_at):s?Yi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Nb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=qb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Pb[e.status]}</span
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
  </button>`}function Ub(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Wb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let g=Fb(d);!g||s.has(g.launch_id)||Td(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((d,g)=>(d.started_at||0)-(g.started_at||0));let a={};for(let{role:d,provider:g}of la){let h=t?t.roles[d]?.[g]:null;a[d]=h?[...h.legs]:[]}let i=la.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:g}of la){for(let h of r.filter(b=>b.role===d&&b.provider===g)){let b=i.find(w=>w.receipt_id===h.launch_id)||null;b&&!Ub(h,b)||(b&&l.add(b.receipt_id),u.push(Bb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Td(h.agent_type)&&u.push(jb(d,g,h))}return u}function zb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ob,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Mb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Rd}</span>`:""}
  </div>`}var Hb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Gb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Kb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Vb(e,t){let n=Kb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ci(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${_s(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ps(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Od(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,w)=>w.index-b.index)],i=a.map(b=>Vb(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let D=typeof b.session_id=="string"&&b.session_id.length>0,B=u.has(b.attempt_id),Y=D&&!B,le=D?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${le}
      @click=${V=>{V.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let D=b.cause_detail,B=D&&typeof D.reason=="string"&&D.reason.length>0?typeof D.command=="string"&&D.command.length>0?`${D.reason} \xB7 ${D.command}`:D.reason:b.cause;return c`<div class="detail-session__cause" title=${B}>
      ${b.cause}
    </div>`},h=b=>{let w=Cd(fi(b));if(un(w).length===0&&!Kr(b.usage))return"";let D=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${D?"true":"false"}
      title=${D?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Db(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let w=fi(b),D=Cd(w),B=un(D);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Hb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ps(b)?c`<span
                  class="detail-session__resumed"
                  title=${ps(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${$r(b)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Kr(b.usage)?c`<span class="detail-session__usage"
                    >${Kr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ps(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${g(b)} ${Gb(b)}
          ${l.has(b.attempt_id)&&b.usage?zb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Wb(b,w,t)}
        </div>`})}
    </div>
  `}function Ld(e,t={}){return c`
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
          ${Yb(e)}
        </div>`:""}
  `}function Yb(e){let t=Yr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Vo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Zb=["open","in_progress","deferred","resolved","closed"],Qb=[0,1,2,3,4];function Id(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,g={},h="",b=!1,w=[],D=!1,B={},Y={claude:null,codex:null},le=null,V=null,N=0,M=!1,K=!1,L="",I="",te="";function xe(){M=!1,K=!1,L="",I="",te=""}function ke(){Y={claude:null,codex:null},le=null,V=null,N+=1}async function _e(){if(!s)return null;try{let x=await Promise.resolve(s("get-workspace-accounts",{}));return x&&typeof x.state=="string"?x:null}catch{return null}}async function ae(x){try{let se=await fetch(x);if(!se.ok)return null;let F=await se.json();if(!F||typeof F!="object"||!Array.isArray(F.accounts))return null;let Ee=F.accounts.filter(pt=>pt!==null&&typeof pt=="object"&&!Array.isArray(pt));return{accounts:Ee,active:Ee.find(pt=>pt.active===!0)||null}}catch{return null}}async function Te(x){V=x;let se=++N,[F,Ee,pt]=await Promise.all([ae("/api/claude-usage"),ae("/api/codex-usage"),_e()]);se!==N||x!==u||(Y={claude:F,codex:Ee},le=pt,Oe())}let Pe=[],$e=null,ee=null,Z=!1,Ce="",z=!1,ne=0,ge=new Set;function Se(){Pe=[],$e=null,ee=null,Z=!1,Ce="",z=!1,ne+=1,ge.clear()}async function Ze(x){if(!s)return;let se=++ne;try{let F=await Promise.resolve(s("get-comments",{id:x}));if(se!==ne||x!==u)return;Pe=Array.isArray(F)?F:[],Z=!1}catch{if(se!==ne||x!==u)return;Z=!0}Oe()}function ue(){if(!s||!u)return;let x=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,ee=x,Ze(u);return}x!==null&&x!==ee&&(ee=x,Ze(u))}function Ue(x){ge.has(x)?ge.delete(x):ge.add(x),Oe()}function mt(x){let se=Ce.trim().length===0;Ce=x,se!==(x.trim().length===0)&&Oe()}async function At(){let x=Ce.trim();if(!s||!u||x.length===0||z)return;let se=u;z=!0,Oe();let F=!1;try{let Ee=await Promise.resolve(s("add-comment",{id:se,text:x}));Array.isArray(Ee)&&Ee.length>0&&(F=!0,se===u&&(Pe=Ee,Z=!1,Ce="",ee=Ee.length))}catch{F=!1}F||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),se===u&&(z=!1),Oe()}let $t={onToggle:Ue,onDraftInput:mt,onSubmit:At},ct=t.mdViewer||null,T=null;ct||(T=document.createElement("div"),T.className="md-viewer-root",document.body.appendChild(T));let ce=ct||ia(T,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ie=document.createElement("div");Ie.className="session-log-root",document.body.appendChild(Ie);let De=Zr(Ie,{transport:s?(x,se)=>Promise.resolve(s(x,se)):void 0,sessionLogStore:l}),Qe=!1,rt=!1,gt=!1,ht=null,re=null,Q=0;function Fe(x){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}`}function ot(){Qe=!1,rt=!1,gt=!1,ht=null,re=null,Q+=1}async function ze(x){if(!s)return;let se=++Q;rt=!0,gt=!1,Oe();try{let F=await Promise.resolve(s("get-bead-prompt",{bead_id:x}));if(se!==Q)return;!F||typeof F!="object"||Array.isArray(F)?gt=!0:(ht=F,re=Fe(x))}catch{se===Q&&(gt=!0)}finally{se===Q&&(rt=!1,Oe())}}let we=[],Ke=null,ut=0;function ft(x,se){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}::${se}`}function _t(){we=[],Ke=null,ut+=1}async function Pt(x,se){if(!s)return;let F=++ut,Ee;try{Ee=await Promise.resolve(s("get-session-refs",{bead_id:x}))}catch{Ee=null}F!==ut||se!==Ke||(we=Ee&&Array.isArray(Ee.sessions)?Ee.sessions:[],Oe())}function Kt(){if(!s||!u)return;let x=d&&d.metadata,se=x&&typeof x=="object"&&typeof x.session_ref=="string"?x.session_ref:null;if(se===null){_t();return}let F=ft(u,se);Ke!==F&&(we=[],Ke=F,Pt(u,F))}function Ht(){if(Qe=!Qe,Qe&&u&&re!==Fe(u)){ht=null,ze(u);return}Oe()}function Rt(){if(!a||!u)return[];let x=a.get();return(x&&x.attempts?Object.values(x.attempts):[]).filter(F=>F&&F.bead_id===u).sort((F,Ee)=>(Ee.started_at||0)-(F.started_at||0)).map(F=>({attempt_id:F.attempt_id,bead_id:F.bead_id,status:F.status,started_at:typeof F.started_at=="number"?F.started_at:null,runner:F.runner||null,model:F.model||null,effort:F.effort||F.observed_effort||null,speed:F.speed||null,session_id:F.session_id||null,resumed_from:F.resumed_from||null,continuation_mode:F.continuation_mode||null,dismissed_at:typeof F.dismissed_at=="number"?F.dismissed_at:null,cause:typeof F.cause=="string"?F.cause:null,cause_detail:F.cause_detail||null,exec_default_preset_id:typeof F.exec_default_preset_id=="string"?F.exec_default_preset_id:null,exec_default_preset_revision:typeof F.exec_default_preset_revision=="number"?F.exec_default_preset_revision:null,exec_values:F.exec_values&&typeof F.exec_values=="object"?F.exec_values:null,usage:F.usage||null,usage_legs:Array.isArray(F.usage_legs)?F.usage_legs:[],delegation_sessions:Array.isArray(F.delegation_sessions)?F.delegation_sessions:[]}))}function Lt(){if(!a||!u)return null;let x=a.get();return On(x&&x.attempts||{},u)}let Je=new Set;function Ne(x){Je.has(x)?Je.delete(x):Je.add(x),Oe()}function P(x){let se=a?a.get():null,F=se&&se.attempts?se.attempts[x]:null;De.open({attempt_id:x,meta:F?{runner:F.runner||void 0,model:F.model||void 0,effort:F.effort||void 0,status:F.status||void 0,session_id:F.session_id||void 0}:{}})}function J(x,se){let F=a?a.get():null,Ee=F&&F.attempts?F.attempts[x]:null,Xe=(Ee&&Array.isArray(Ee.delegation_sessions)?Ee.delegation_sessions:[]).find(vt=>vt&&typeof vt=="object"&&vt.launch_id===se);Xe&&De.open({attempt_id:x,launch_id:se,meta:{runner:Xe.provider==="claude"?"claude":"codex",role:Xe.role,...typeof Xe.agent_type=="string"?{agent_type:Xe.agent_type}:{},model:Xe.model,effort:Xe.effort,session_id:Xe.session_id,status:Xe.status}})}async function ve(x){if(!s||!x)return;let se=await zr();if(se===null)return;let F=()=>{let vt=a?a.get():null;return vt&&typeof vt.revision=="number"?vt.revision:0},Ee=async(vt={},it=F())=>await s("worker-attempt-resume",{attempt_id:x,expected_revision:it,...se!==""?{instructions:se}:{},...vt}),pt=vt=>{vt?.queue&&a?.set&&a.set(vt.queue)},Xe=await Ee();if(pt(Xe),Xe&&Xe.conflict){let vt=Xe.queue&&typeof Xe.queue.revision=="number"?Xe.queue.revision:F();Xe=await Ee({},vt),pt(Xe)}Xe=await Zn(Xe,(vt,it)=>Ee({continuation:vt,decision_token:it}),{onResult:pt,refresh:()=>Ee()}),Xe&&Xe.resumed===!1&&!Xe.conflict&&Xe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Xe.reason}`,"error",2400)}function S(x){!x||!u||De.open(Hr(x,u,d&&d.status))}let H={onOpen:P,onOpenDelegation:J,onResume:ve,onToggleUsage:Ne,onOpenSessionRef:S,onCopyResumeCommand:bt};function Le(){let x=a?a.get():null,se={...B};for(let F of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ee=x&&x[F];typeof Ee=="string"&&(se[F]=Ee)}return se}async function $(){if(s){try{let x=await Promise.resolve(s("get-session-defaults",{}));B=x&&x.values&&typeof x.values=="object"?x.values:{}}catch{B={}}Oe()}}function O(){let x=a?a.get():null;return x&&x.runner_catalog||null}function X(){let x=a?a.get():null;return x&&typeof x.execution_defaults=="object"?x.execution_defaults:null}function me(){let x=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},F=wn({pin:{...x,...g},global:Le(),execution_defaults:X(),runner_catalog:O(),route:typeof x.route=="string"?x.route:null}).orchestration_model.value||"";return jn(O(),F)}function Ae(){let x=i?i.get():null;return!x||typeof x.revision!="number"?null:{revision:x.revision,presets:Array.isArray(x.presets)?x.presets:[]}}function v(x){return x?.compatible===!1}function U(x){i&&x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&i.set({revision:x.revision,presets:x.presets})}async function ie(){let x=Ae(),se=x?.presets.find(F=>F.id===h);if(!(!s||!u||!x||!se||v(se)||b)){b=!0,w=[],Oe();try{let F=await Promise.resolve(s("apply-impl-preset",_d(u,se.id,x.revision)));if(F&&F.conflict){U(F),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ee=F&&Array.isArray(F.issue)?F.issue[0]:F?.issue;if(F&&F.applied&&Ee&&typeof Ee=="object"){d=Ee,w=Array.isArray(F.skipped_orchestration_keys)?F.skipped_orchestration_keys.filter(pt=>typeof pt=="string"):[];for(let pt of xd)delete g[pt];de(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}F&&F.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(F){F&&typeof F=="object"&&F.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Oe()}}}let Ve=null;n&&n.subscribe&&(Ve=n.subscribe(()=>yt()));let je=null;a&&typeof a.subscribe=="function"&&(je=a.subscribe(()=>{u&&Oe()}));let he=null;i&&typeof i.subscribe=="function"&&(he=i.subscribe(()=>{u&&Oe()}));function Ot(x){x.key==="Escape"&&u&&(x.preventDefault(),r())}document.addEventListener("keydown",Ot);function yt(){if(u){if(n&&typeof n.snapshotFor=="function"){let x=n.snapshotFor("detail:"+u)||[];d=x.find(F=>F&&F.id===u)||x[0]||d}ue(),Kt(),Oe()}}function bt(x){Sn(x).then(se=>{se?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Qt(x){x.preventDefault(),x.stopPropagation(),u&&bt(u)}function Ft(x,se){x.preventDefault(),x.stopPropagation(),bt(se)}function an(x,se,F){x.preventDefault(),x.stopPropagation(),ce.open(se,{missing_state:F})}function en(x,se){g[x]=se,Oe(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",fd(u,x,se.length===0?null:se))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function nn(x,se){let F=d||{},Ee=F.metadata&&typeof F.metadata=="object"?F.metadata:{},pt={};for(let it of["impl_runtime","impl_model","impl_effort"])pt[it]=Object.hasOwn(g,it)?g[it]:typeof Ee[it]=="string"?Ee[it]:"";pt[x]=se;let Xe=Ed(pt,O(),me()),vt={};for(let it of["impl_runtime","impl_model","impl_effort"])vt[it]=g[it],g[it]=Xe[it]||"";Oe(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Xe,orchestration_runtime:me()})).then(it=>{let Tt=Array.isArray(it)?it[0]:it;if(!Tt||typeof Tt!="object"||!Tt.id)throw new Error("implementation target readback failed");d=Tt;for(let p of["impl_runtime","impl_model","impl_effort"])delete g[p];Oe()}).catch(()=>{for(let it of["impl_runtime","impl_model","impl_effort"])vt[it]===void 0?delete g[it]:g[it]=vt[it];Oe(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Xt(x,se,F){if(!s||!u)return!1;try{let Ee=await Promise.resolve(s(x,se)),pt=Array.isArray(Ee)?Ee[0]:Ee;return pt&&typeof pt=="object"&&pt.id?(d=pt,!0):(de(F,"error"),!1)}catch{return de(F,"error"),!1}}function on(x){setTimeout(()=>{try{let se=e.querySelector(x);se&&typeof se.focus=="function"&&se.focus()}catch{}},0)}function Ye(){M=!0,L=d&&d.title||"",Oe(),on('.detail-edit__input[data-edit="title"]')}function hn(x){L=x.target.value}function tt(){M=!1,L="",Oe()}function Me(){Xt("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(se=>{se&&(M=!1,L=""),Oe()})}function C(){K=!0,I=d&&d.description||"",Oe(),on('.detail-edit__textarea[data-edit="description"]')}function ye(x){I=x.target.value}function qe(){K=!1,I="",Oe()}function xt(){Xt("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(se=>{se&&(K=!1,I=""),Oe()})}function jt(x,se,F,Ee){if(x.key==="Escape"){x.stopPropagation(),F();return}x.key==="Enter"&&(!Ee||x.ctrlKey||x.metaKey)&&(x.preventDefault(),se())}function wt(x){let se=x.target.value;Xt("update-status",{id:u,status:se},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Oe())}function Bt(x){let se=Number(x.target.value);Xt("update-priority",{id:u,priority:se},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Oe())}function tn(x){te=x.target.value}function ln(){let x=te.trim();x.length!==0&&Xt("label-add",{id:u,label:x},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(se=>{se&&(te=""),Oe()})}function $n(x){if(x.key==="Escape"){x.stopPropagation(),te="",Oe();return}x.key==="Enter"&&(x.preventDefault(),ln())}function Ut(x){Xt("label-remove",{id:u,label:x},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Oe())}let Cn={onCopyPath:Ft,onOpenDoc:an};function xn(x){return typeof x=="string"?x:x&&typeof x=="object"?String(x.id||x.to||x.issue_id||x.depends_on||""):""}function rr(x){switch(x&&typeof x=="object"?String(x.dependency_type||x.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function E(x){let F=(Array.isArray(x.dependencies)?x.dependencies:[]).map(Ee=>({id:xn(Ee),icon:rr(Ee)})).filter(Ee=>Ee.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${F.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${F.map(Ee=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Ee.id)}
                  >
                    ${Ee.icon?`${Ee.icon} `:""}${Ee.id}
                  </button>`:c`<span class="detail-dep"
                    >${Ee.icon?`${Ee.icon} `:""}${Ee.id}</span
                  >`)}
          </div>`}
    `}function R(x){let se=x.metadata||{},F=x.workflow||{},Ee=F.stages||{},pt=Ee.spec&&Ee.spec.stale,Xe=Ee.impl&&Ee.impl.stale,vt=F.quick_fix_review?.state==="stale",it=Ee.plan||null,Tt=F.route_source==="derived",p=F.route||se.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Tt?" detail-kv__v--derived":""}"
          title=${Tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Tt?"unset":p}</span
        >
      </div>
      ${F.route!=="quick_fix"||Object.hasOwn(se,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${se.spec_review||"\uC5C6\uC74C"}${pt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${it?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${it?.approval_receipt||"\uC5C6\uC74C"}${it?.approval_state==="stale"?" \xB7 stale":it?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${F.route!=="quick_fix"||Object.hasOwn(se,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${se.impl_review||"\uC5C6\uC74C"}${Xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${F.resolver.attempt} \xB7 ${F.resolver.prior_sha} \u2192 ${F.resolver.sha}`}
              >${`${F.resolver.prior_sha.slice(0,7)} \u2192 ${F.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${F.route==="quick_fix"||Object.hasOwn(se,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${se.quick_fix_review||"\uC5C6\uC74C"}${vt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${F.planned_execution.kind}</span>
            </div>
            ${F.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${F.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${F.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Yn(F.exec_receipt)}</span
            >
          </div>`:""}
      ${F.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${F.impl_entry.actor}@${F.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${se.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${se.pr_url}</span>
          </div>`:""}
    `}let Be={route:["quick_fix","spec_backed","full_plan"]};async function He(x,se){let F=se.target.value;if(x==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&F!=="full_plan"&&!window.confirm(`full_plan \u2192 ${F||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Oe();return}await Xt("update-workflow-meta",{id:u,key:x,value:F},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Oe()}function at(x){let se=x.metadata||{};return c` ${((Ee,pt)=>{let Xe=Be[Ee],vt=typeof se[Ee]=="string"?se[Ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ee}
          data-edit=${`wfmeta-${Ee}`}
          @change=${it=>He(Ee,it)}
        >
          <option value="" ?selected=${!Xe.includes(vt)}>
            ${pt}
          </option>
          ${Xe.map(it=>c`<option value=${it} ?selected=${vt===it}>${it}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Et(x,se){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${hn}
            @keydown=${F=>jt(F,Me,tt,!1)}
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
              @click=${tt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${x}</h2>
        ${un(se).map(F=>c`<span class="detail-usage-total" title=${F.tooltip}
              >${F.label}</span
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
    `}function f(x){let se=cn(x.created_at),F=cn(x.updated_at);return!se&&!F?c``:c`
      ${se?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${se}</span>
          </div>`:""}
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
    `}function k(x,se){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${wt}
        >
          ${Zb.map(F=>c`<option value=${F} ?selected=${F===x}>${F}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Bt}
        >
          ${Qb.map(F=>c`<option value=${String(F)} ?selected=${F===se}>
                P${F}
              </option>`)}
        </select>
      </div>
    `}function j(x){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${K?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${C}
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
              .value=${I}
              @input=${ye}
              @keydown=${se=>jt(se,xt,qe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${xt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${qe}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${x||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fe(x){let se=typeof x.notes=="string"?x.notes:"";return se.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${se}</div>
    `}function Re(x){let se=Array.isArray(x.labels)?x.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${se.map(F=>c`<span class="detail-label-chip"
              >${F}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${F}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+F}
                @click=${()=>Ut(F)}
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
            @input=${tn}
            @keydown=${$n}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ln}
          >
            추가
          </button>
        </span>
      </div>
    `}function dt(){if(!u)return c``;let x=d||{},se=String(x.id||u),F=x.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ee=Lt(),pt=x.status||"open",Xe=typeof x.priority=="number"?Math.max(0,Math.min(4,x.priority)):"",vt=x.description||"",it={...x,metadata:{...x.metadata||{},...g}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Qt}
            >
              ${se}
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
          ${Et(F,Ee)}
          ${bd(it)}
          ${gd({metadata:it.metadata,workspace_values:Le(),catalog:O(),execution_defaults:X(),expanded:D,presets:Ae()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:w},{onToggle:Tt=>{D=Tt,Oe()},onEdit:(Tt,p)=>{if(Tt==="impl_runtime"||Tt==="impl_model"||Tt==="impl_effort"){nn(Tt,p??"");return}en(Tt,p??"")},onPresetSelect:Tt=>{h=Tt,w=[],Oe()},onPresetApply:()=>{ie()}})}
          ${$d({md:it.metadata,catalog:Y,workspace_defaults:le,handlers:{onExecChange:en}})}
          ${k(pt,Xe)} ${f(x)}
          ${j(vt)}
          ${nd(Pe,$t,{expanded:ge,draft:Ce,sending:z,error:Z})}
          ${fe(x)} ${Re(x)} ${E(x)}
          ${R(x)} ${at(x)}
          ${Ju(x,Cn)}
          ${Ld({expanded:Qe,loading:rt,error:gt,data:ht},{onToggle:Ht})}
          ${Od(Rt(),H,{total:Ee,expanded:Je},we)}
        </div>
      </div>
    `}function Oe(){st(dt(),e)}return{load(x){x!==u&&(g={},h="",w=[],D=!1,xe(),Se(),ot(),_t(),ke()),u=x,d=null,yt(),$(),V!==x&&Te(x)},clear(){u=null,d=null,g={},h="",b=!1,w=[],D=!1,xe(),Se(),ot(),_t(),ke(),ce.close(),De.close(),st(c``,e)},destroy(){Ve&&(Ve(),Ve=null),je&&(je(),je=null),he&&(he(),he=null),document.removeEventListener("keydown",Ot),ct||(ce.destroy(),T&&T.parentNode&&T.parentNode.removeChild(T)),De.destroy(),Ie.parentNode&&Ie.parentNode.removeChild(Ie),u=null,d=null,ke(),h="",b=!1,w=[],Se(),ot(),_t(),st(c``,e)}}}function Pd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function ca(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ua(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function da(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function pa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Xb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ca(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Md(e,t){let n=Xb(e,t);return n?c`<button
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
            title=${n.deploy.at?cn(n.deploy.at):""}
            >${pa(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ds(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function es(e){let t=vn(e.created_at),n=vn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Jb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ns(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function fa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Bn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,h)=>(g.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Jb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Ms(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var eh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Dd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:eh[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function _a(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function th(e){return c`<div
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
  </div>`}function ma(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
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
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${i.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
                data-root-dir=${i.root_dir||""}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?th(s):""}
  </div>`}function ga(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function nh(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Nd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ba(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function rh(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=Qn(e.usage),s=vn(e.done_at);return c`<div
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
            title=${`\uC644\uB8CC ${cn(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${ms(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Ds(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function cr(e){if(e.lane==="done"&&e.done_layout==="three_line")return rh(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=un(e.usage),s=Qn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?vn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,w=e.lane==="done"?"":ga(e.workflow),D=e.lane==="done"?"":Nd(e.from_id),B=ba(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",V=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",N=n.map(ge=>ge===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ge}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ge===e.completion_badge&&e.completion_title||""}
          >${ge}</span
        >`),M=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",K=r.length>0?r.map(ge=>c`<span class="worker-usage" title=${ge.tooltip}
              >${ge.label}</span
            >`):s?c`<span class="worker-usage" title=${ms(e.usage)}
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
      </button>`:"",te=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",xe=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ke=e.discard,_e=ke?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ke?.attempt_id||""}
          data-operation-id=${ke?.operation?.operation_id||""}
          data-discard-mode=${ke?.confirmation||"unmerged"}
          ?disabled=${ke?!ke.enabled:e.discard_enabled===!1}
          title=${ke?ke.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ke?.label||"\uD3D0\uAE30"}
        </button>`:"",ae=e.stale_work||null,Te=ae?c`${ae.can_resume||ae.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ae.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ae.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            다시 확인
          </button>`:""}`:"",Pe=ae?c`<div class="worker-mini__stale">
        <strong>${ae.title}</strong>
        <span>${ae.summary}</span>
        <span>${ae.cause}</span>
        ${ae.can_backup_fresh?c`<small
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
        </button>`:"",ee=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=h||w||D||ee||K?c`<div class="worker-chips">
          ${h}${w}${D}${ee?_a(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${K}
        </div>`:"",Ce=ma(e.dependency_chips),z=Ms(e),ne=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ke?.operation||e.revise_action||ae);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${b}${B}${D}${Y}
          </div>
          <div class="worker-mini__row2">
            ${K}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${cn(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ds(e.work_ms)}</span
                >`:""}${N}${L}
            <span class="worker-mini__actions"
              >${I}${te}${xe}${_e}</span
            >
            ${es(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${b}${B}${le}${V}${N}${g}${M}
            </div>
            <div class="worker-mini__body">${Y}${Pe}</div>
            ${Ce}${Z}${ne?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${I}${te}${xe}${_e}${$e}${Te}</span
                  >
                  ${Ms(e)}
                </div>`:""}
            ${es(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${b}${B}${Y}${le}${V}${N}${g}${M}${L}${I}${te}${xe}${_e}
            </div>
            ${Ce}${Z}${z} ${es(e)}`}
  </div>`}function sh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var oh={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Zi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=oh[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=ma(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=ga(l),w=Nd(e.from_id),D=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ba(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${nh(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Ro(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${h||b||w||D?c`<div class="worker-chips">
          ${h}${b}${w}${_a(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${sh(t.lanes,e.id)}
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
    ${es(e)}
  </div>`}function In(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?Zi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):cr(r))}
          </div>`}
  </section>`}function ha(e){return e.replace(/\/+$/,"")}function ah(e,t){let n=ha(e),r=ha(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ya(e,t){let n=new Set;for(let r of e)for(let s of t){if(!ah(r,s))continue;let o=ha(r),a=ha(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Fd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ya(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var qd=["parallel","serial","candidate"];function qs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=qd.includes(r.kind),l=qd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=ih(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${qs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${qs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ih(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var jd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Bd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Ud(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Xi(e){for(let t of Ud(e))if(Object.hasOwn(jd,t))return jd[t];return null}function Ji(e){let t=null;for(let n of Ud(e))Object.hasOwn(Bd,n)&&(t=Bd[n]);return t}function va(e){let t=Xi(e),n=Ji(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Wd(e,t){let n=Xi(e)??Xi(t),r=Ji(t)??Ji(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var zd=160;function lh(e){return e.length>zd?`${e.slice(0,zd)}\u2026`:e}function ch(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${lh(e.command)}</code>`:""}
  </div>`}function uh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function dh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Hd(e){let t=e.failure?va(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${ch(e.failure.cause_detail,e.failure.reason)}
          ${uh(e.failure.reason)}
          ${Ms({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function ph(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var fh=new Set(["codex-runner"]);function _h(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&fh.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?vn(r.last_event_at,t):"",g=r?vn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${vn(a,t)}</span
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
      </div>`:""}`}var mh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function gh(e){if(!e)return"";let t=mh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function el(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(ae=>ae&&ae.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?dh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ps(e),g=un(e.usage),h=Qn(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,D=e.landing,B=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,le=ph(Y),V=Y?ma(Y.dependency_chips):"",N=_h(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),M=s&&e.workflow?.chips?.exec_receipt||null,K=ga(e.workflow),L=M?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Yn(M)}`}
        >${`${M.kind}:${Oo(M)}`}</span
      >`:"",I=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${_s(o)}</span
      >`:"",te=le||K||I||L?c`<div class="rtile__meta">
          ${le}${K}${I}${L}
        </div>`:"",xe=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${w?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${w}</span
      >`:""}`,ke=s?"":es(e),_e=e.discard?.action?c`<button
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
      ${ba(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${xe}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${gh(o)}<span
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
    ${N}${e.rollup?Co(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ai}):""}
    ${D?c`<div class="rtile__landing">
          <span
            class="merge-step${D.failed?" merge-step--failed":""}"
            style=${`--progress: ${D.percent}%`}
            >${D.label}${D.index>0?c`<span class="merge-step__n"
                  >${D.index}/${D.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${V}
    ${s?te:le||K||u||g.length>0||h?c`<div class="rtile__meta">
            ${le}${K}${_a(e.exec_chips)}
            ${g.length>0?g.map(ae=>c`<span class="worker-usage" title=${ae.tooltip}
                      >${ae.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${ms(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Ms(e)} ${ke}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function tl(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>el(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var nl=new Set(["unavailable","not_applicable"]);function ur(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Gd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function dr(e,t){return t===null?null:`${lr[e]}: ${t.display} (${na[t.source]})`}function rl(e){return e.filter(t=>t!==null).join(`
`)}function Fs(e){if(typeof e!="object"||e===null)return null;let t=$r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(lr.orchestration_model,e.model),n(lr.orchestration_effort,e.effort),n(lr.orchestration_speed,e.speed)])}}function Er(e,t){let n=ur(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ur(e,"orchestration_effort"),s=ur(e,"orchestration_speed"),o=Gd([jn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",dr("orchestration_model",n),dr("orchestration_effort",r),dr("orchestration_speed",s)])}}function bh(e,t){return e===null||e.value===null||nl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function hh(e){return e===null||nl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function yh(e){return e===null?null:e.value==="auto"?"auto":nl.has(e.resolution)?null:e.display}function pr(e,t){if(typeof e!="object"||e===null)return null;let n=ur(e,"impl_dispatch"),r=ur(e,"impl_runtime"),s=ur(e,"impl_model"),o=ur(e,"impl_effort"),a=ur(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Gd([bh(r,t??null),hh(s),yh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:rl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",dr("impl_dispatch",n),dr("impl_runtime",r),dr("impl_model",s),dr("impl_effort",o),dr("impl_speed",a)])}}var dn="",vh=["impl_runtime","impl_model","impl_effort"],wh=["claude_account","codex_account"],kh=5,wa=1;function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ka(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>de(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},g={},h=Promise.resolve(),b={claude:null,codex:null},w=!1,D=null,B={},Y="",le="",V=!1,N=!1,M=!1,K=null,L=!1;function I(){let P=t.queue?t.queue():null;return kn(P)?P:null}function te(){let P=I();return P?P.runner_catalog:null}function xe(){let P=I();return P&&kn(P.execution_defaults)?P.execution_defaults:null}function ke(){let P=t.implPresetStore?.get();return kn(P)&&Array.isArray(P.presets)?P:null}function _e(){return r===null?{}:{root_dir:r}}async function ae(P,J){return L||!n?null:await n(P,J)}function Te(P){P&&kn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function Pe(P,J){let ve=I();if(!ve||L)return null;let S=await ae(P,{...J,..._e(),expected_revision:ve.revision});if(Te(S),r!==null&&S&&S.conflict){let H=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I()?.revision??ve.revision;S=await ae(P,{...J,..._e(),expected_revision:H}),Te(S)}return S}async function $e(){l=!0,Ne();try{let P=await ae("get-session-defaults",{..._e()});o=kn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,Ne()}}async function ee(){let P=ud(o,a);if(Object.keys(P).length!==0){try{let J=await ae("set-session-defaults",{values:P,..._e()});o=kn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}function Z(P,J){if(!kn(P))return;let ve=P.state;u={state:ve==="usable"||ve==="unusable"||ve==="absent"?ve:"absent",values:kn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},g={...u.values},J&&(d={...g})}async function Ce(){try{Z(await ae("get-workspace-accounts",{..._e()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Ne()}async function z(P){try{let J=await fetch(P);if(!J.ok)return null;let ve=await J.json();if(!kn(ve)||!Array.isArray(ve.accounts))return null;let S=ve.accounts.filter(H=>kn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:S,active:S.find(H=>H.active===!0)||null}}catch{return null}}async function ne(){w=!0;let[P,J]=await Promise.all([z("/api/claude-usage"),z("/api/codex-usage")]);L||(b={claude:P,codex:J},Ne())}function ge(){let P={};for(let J of wh){let ve=Object.hasOwn(d,J)?d[J]:null,S=Object.hasOwn(g,J)?g[J]:null;ve!==S&&(P[J]=ve)}return P}async function Se(){let P=ge();if(Object.keys(P).length!==0){try{Z(await ae("set-workspace-accounts",{values:P,..._e()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}function Ze(P,J){J===dn?delete d[P]:d[P]=J,Ne(),h=h.then(()=>Se())}function ue(P,J){if(vh.includes(P)){At(P,J);return}J===dn?delete a[P]:a[P]=J,Ne(),ee()}function Ue(){let P=Lt().orchestration_model,J=wn({global:{orchestration_model:P??void 0},execution_defaults:xe(),runner_catalog:te()}).orchestration_model.value;return J?jn(te(),J):null}function mt(P,J){typeof J=="string"&&J.length>0?a[P]=J:delete a[P]}function At(P,J){let ve=J===dn?void 0:J,S=ld({impl_runtime:P==="impl_runtime"?ve:a.impl_runtime,impl_model:P==="impl_model"?ve:a.impl_model,impl_effort:P==="impl_effort"?ve:a.impl_effort},te(),Ue());mt("impl_runtime",S.impl_runtime),mt("impl_model",S.impl_model),mt("impl_effort",S.impl_effort),Ne(),ee()}async function $t(){let P=I();if(!P)return;let J={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ve=dd(J,{...J,...B});if(Object.keys(ve).length!==0){try{let S=await Pe("worker-queue-set-orchestration-defaults",{values:ve});if(S&&S.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(S){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}}function ct(P,J){B[P]=J===dn?null:J,Ne(),$t()}function T(P){if(D=P,!P){Ne();return}let J=te(),ve=Lt(),S=ve.orchestration_model;S&&!Ls(J,P).includes(S)&&(B.orchestration_model=null,S=null);let H=ve.orchestration_effort;H&&!Ui(J,P,S||Tn).includes(H)&&(B.orchestration_effort=null),Ne(),$t()}async function ce(P){if(!(!I()||P<wa)){try{await Pe("worker-queue-set-slots",{slots:P})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}async function Ie(P){if(!(!I()||P<wa||P>kh)){try{await Pe("worker-queue-set-serial-lane-count",{count:P})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}Ne()}}async function De(P,J){let ve=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Pe(ve,{on:J})}catch(S){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}function Qe(){let P={},J=Lt();for(let ve of Xo){let S=nr.includes(ve)?J[ve]:a[ve];typeof S=="string"&&S.length>0&&(P[ve]=S)}return P}async function rt(){let P=ke();if(!P)return;let J=Qe();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ve=(P.presets||[]).find(H=>H.id===Y),S=le.trim()||(ve?ve.name:"");if(!S){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ve?await ae("impl-preset-update",{expected_revision:P.revision,id:ve.id,name:S,settings:J}):await ae("impl-preset-create",{expected_revision:P.revision,name:S,settings:J});if(H&&H.applied){if(le="",!ve&&Array.isArray(H.presets)){let Le=H.presets.find($=>$.name===S);Y=Le?Le.id:Y}Ne()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function gt(){let P=ke();if(!(!P||Y.length===0))try{let J=await ae("impl-preset-delete",{expected_revision:P.revision,id:Y});J&&J.applied?(Y="",Ne()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function ht(P){o=kn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],kn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function re(){let P=ke(),J=I();if(!P||!J||Y.length===0)return;let ve=S=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:S,..._e()});try{let S=await ae("apply-impl-preset-global",ve(J.revision));if(S&&S.applied&&ht(S),r!==null&&S&&S.queue_applied===!1){let H=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I()?.revision??J.revision;S=await ae("apply-impl-preset-global",ve(H)),S&&S.applied&&ht(S)}S&&S.applied?S.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Ne()}async function Q(){N=!0,M=!1,Ne();try{let P=await ae("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?M=!0:K=P}catch{M=!0}finally{N=!1,Ne()}}function Fe(){if(V=!V,V&&!K){Q();return}Ne()}function ot(){let P=Yr({loading:N,error:M});if(P)return P;if(!K)return"";let J=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
      ${K.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(ve=>c`<div class="settings-dialog__sp-variant" data-variant=${ve.key}>
            <div class="settings-dialog__sp-cond">${ve.condition}</div>
            ${tr(ve.label,ve.system_prompt)}
          </div>`)}
    </div>`}function ze(){return c`<section
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
        @click=${Fe}
      >
        ${V?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${V?ot():""}
    </section>`}function we(P,J,ve,S,H,Le,$){let O=H[P]??dn,X=Wi(P,ve,H,xe(),te(),$),me=X.options.find(v=>v.value===O),Ae=O===dn?X.full_value:me?.full_value;return c`<select
        class=${O===dn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${J}
        title=${Ae||""}
        ?disabled=${Le===!0||X.disabled}
        .value=${Sr(String(O))}
        @change=${v=>S(P,String(v.target.value))}
      >
        <option value=${dn} ?selected=${O===dn}>
          ${X.unset_label}
        </option>
        ${X.options.map(v=>c`<option
              value=${v.value}
              title=${v.full_value||""}
              ?selected=${v.value===O}
            >
              ${v.label}
            </option>`)}
      </select>
      ${O===dn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ke(P,J,ve,S,H,Le=!1,$){return c`<div
      class=${`settings-dialog__row${Le?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${we(P,J,ve,S,H,Le,$)}
      </span>
    </div>`}function ut(P,J){let ve=J?J.active:null;return kn(ve)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ve.email:Jr({...ve,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ft(P,J,ve){let S=b[ve],H=Object.hasOwn(d,P)?d[P]:dn,Le=ve==="claude"?oa:Jr,$=!!S?.accounts.some(O=>O.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${P}
          @change=${O=>Ze(P,String(O.target.value))}
        >
          <option value=${dn} ?selected=${H.length===0}>
            ${ut(ve,S)}
          </option>
          ${H.length>0&&!$?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(O=>c`<option value=${O.key} ?selected=${O.key===H}>
                ${Le(O)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _t(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Pt(P,J,ve,S,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${we(ve,`${P} \uBAA8\uB378`,S,ue,a,!1)}
        ${we(H,`${P} effort`,ta,ue,a,!1)}
      </span>
    </div>`}function Kt(P,J,ve,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${S?"true":"false"}
          aria-label=${J}
          @click=${()=>De(P,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ve}</span>
      </span>
    </div>`}function Ht(P,J,ve,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>S(ve-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ve}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>S(ve+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Rt(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
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
    </div>`}function Lt(){let P=I(),J={};for(let ve of nr)J[ve]=Object.prototype.hasOwnProperty.call(B,ve)?B[ve]:P&&typeof P[ve]=="string"?P[ve]:null;return J}function Je(){let P=te(),J=a.impl_runtime,ve=a.impl_model,S=ke(),H=I(),Le=Lt(),$=Ls(P,D),O=Qr(P,void 0).filter(he=>he!==Tn),X=Ui(P,D,Le.orchestration_model||Tn).filter(he=>he!==Tn),me=Y?(S?.presets||[]).find(he=>he.id===Y):null,Ae=me?cd(Qe(),kn(me.settings)?me.settings:{}):null,v=H&&typeof H.slots=="number"?H.slots:wa+1,U=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:wa,ie=xe()?.supported===!0,Ve=_t(),je=Wi("workflow_mode",Rs,a,xe(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Ve?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ve}
          </div>`:""}
      ${ie?"":c`<div
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
                .value=${Sr(Y)}
                @change=${he=>{Y=String(he.target.value),Ne()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(he=>c`<option
                      value=${he.id}
                      ?selected=${he.id===Y}
                    >
                      ${he.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ae||Ae.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Sr(le)}
                @input=${he=>{le=String(he.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${rt}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${gt}
              >
                삭제
              </button>
            </div>
            ${Ae?Rt(Ae):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Sr(D||dn)}
                    @change=${he=>{let Ot=String(he.target.value);T(Ot===dn?null:Ot)}}
                  >
                    <option value=${dn} ?selected=${!D}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${D==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${D==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ke("orchestration_model","\uBAA8\uB378",$,ct,Le)}
              ${Ke("orchestration_effort","effort",X,ct,Le)}
              ${Ke("orchestration_speed","\uC18D\uB3C4",Cs,ct,Le)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${ft("claude_account","Claude","claude")}
              ${ft("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${dn}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ue("workflow_mode",dn)}
                    >
                      ${je.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Rs.map(he=>c`<button
                          type="button"
                          data-mode=${he}
                          aria-pressed=${String(a.workflow_mode===he)}
                          @click=${()=>ue("workflow_mode",he)}
                        >
                          ${he}
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
              ${Pt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Os,"spec_review_effort")}
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ea,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Os,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ke("impl_runtime","\uC704\uC784 \uB300\uC0C1",Jo,ue,a)}
              ${Ke("impl_model","\uBAA8\uB378",Qr(P,J),ue,a)}
              ${Ke("impl_effort","effort",Xr(P,J,ve),ue,a)}
              ${Ke("impl_speed","\uC18D\uB3C4",Cs,ue,a)}
              ${Ke("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",O,ue,a,!1,{...a,...Le})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Kt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Kt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Kt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",v,he=>ce(he))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",U,he=>Ie(he))}
            </div>
            ${ze()}
          `}
    `}function Ne(){L||st(Je(),e)}return{load(){B={};let P=[$e(),Ce()];return w||P.push(ne()),Promise.all(P).then(()=>{})},render:Ne,sessionDraft:()=>({...a}),destroy(){L=!0,st(c``,e)}}}function $a(e){return c`<svg
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
  </svg>`}function Kd(){return $a(us`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Vd(){return $a(us`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Yd(){return $a(us`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Zd(){return $a(us`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Qd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Xd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return un(Do(t));let n={};for(let i of Gn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Gn){let g=l[d];typeof g=="number"&&Number.isFinite(g)&&(n[d]+=g,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Qn(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function sl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function $h(e,t){if(!Un(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function xh(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=wn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=jn(e.runner_catalog,n.orchestration_model.value??""),s=Er(n,e.runner_catalog),o=pr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Jd(e,t){let n=t.notify||(z=>de(z,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,g=null,h=new Map;function b(){let z=t.workspacesState?t.workspacesState():[];return Array.isArray(z)?z.filter(ne=>Un(ne)):[]}function w(z){return b().find(ne=>ne.root_dir===z)||null}function D(z){return $h(w(z),h.get(z))}function B(){for(let z of b()){let ne=h.get(z.root_dir);ne&&typeof ne.revision=="number"&&typeof z.revision=="number"&&z.revision>=ne.revision&&h.delete(z.root_dir)}}async function Y(z,ne,ge){let Se=t.transport,Ze=D(ne);if(!(!Se||!Un(Ze))){try{let ue=await Se(z,{...ge,root_dir:ne,expected_revision:Ze.revision});if(Un(ue?.queue)&&h.set(ne,ue.queue),ue&&ue.conflict){let Ue=Un(ue.queue)&&typeof ue.queue.revision=="number"?ue.queue.revision:D(ne)?.revision;ue=await Se(z,{...ge,root_dir:ne,expected_revision:Ue}),Un(ue?.queue)&&h.set(ne,ue.queue)}}catch(ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}ee()}}function le(z){u!==z&&(u=z,t.onFocusChange?.(u),ee())}function V(z){le(u===z?null:z)}function N(z){if(d===z){K();return}M(),d=z;let ne=w(z);a.textContent=`${ne?.name||z} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=ka(l,{root_dir:z,queue:()=>D(z),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ge=>{h.set(z,ge),ee()}}),g.load(),ee()}function M(){g?.destroy(),g=null}function K(z){M(),d=null,s.hidden=!0,a.textContent="",z!==!0&&ee()}let L=()=>K();i.addEventListener("click",L);function I(z){z.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",I);function te(z,ne){let ge=Math.max(ne,z,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${z}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ge},(Se,Ze)=>Ze<z?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function xe(z){let ne=z.auto_advance===!0,ge=z.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Vd():Kd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ge?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ge?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Yd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===z.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===z.root_dir?"true":"false"}
        aria-label=${`${z.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Zd()}
      </button>`}function ke(z){let ne=xh(z);return ne?c`<div class="mon2-deck__chips">
      ${ne.orchestration?c`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?c`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function _e(z){let ne=[];for(let[ge,Se]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ze=sl(z,ge);Ze>0&&ne.push(`${Se} ${Ze}`)}return ne.join(" \xB7 ")}function ae(z){let ne=sl(z,"running"),ge=typeof z.slots=="number"?z.slots:1;return c`<div
      class=${`mon2-deck__tile${u===z.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${z.root_dir}
      aria-pressed=${u===z.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${z.root_dir}>${z.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ge}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${ge}</span>
          ${te(ne,ge)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${z.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${xe(z)}</div>
        <span class="mon2-deck__counts">${_e(z)}</span>
        ${ke(z)}
      </div>
    </div>`}function Te(z){let ne=t.doneItems?t.doneItems():[],ge=t.rangeLabel?t.rangeLabel():"",Se=Xd(Array.isArray(ne)?ne:[]),Ze=ue=>z.reduce((Ue,mt)=>Ue+sl(mt,ue),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${z.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ge}`}
        >실행 ${Ze("running")} · 대기 ${Ze("queue")} · PR
        ${Ze("pr_wait")}${Ze("session_active")>0?` \xB7 \uC138\uC158 ${Ze("session_active")}`:""}
        · ${ge} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${Se===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Se=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Qd(ge)}
                  >${Se}</span
                >`:Se.map(ue=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ue.provider}
                      title=${ue.tooltip}
                      >${ue.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let z=b();return z.length===0?"":c`${Te(z)}
      <div class="mon2-deck__strip">
        ${z.map(ne=>ae(ne))}
      </div>`}function $e(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function ee(){B(),$e(),d!==null&&!w(d)&&K(!0),st(Pe(),r),g?.render()}function Z(z){let ne=z.target;if(!ne||typeof ne.closest!="function")return;let ge=ne.closest("[data-root-dir]");if(!ge)return;let Se=ge.getAttribute("data-root-dir")||"",Ze=ne.closest("[data-act]")?.getAttribute("data-act");if(Ze==="worker"){t.gotoWorkerTab?.(Se);return}if(Ze==="auto"){Y("worker-automation-toggle",Se,{on:D(Se)?.auto_advance!==!0});return}if(Ze==="merge"){Y("worker-merge-auto-toggle",Se,{on:D(Se)?.auto_merge!==!0});return}if(Ze==="gear"){N(Se);return}V(Se)}function Ce(z){if(z.key!=="Enter"&&z.key!==" ")return;let ne=z.target;if(!ne||typeof ne.closest!="function")return;let ge=ne.closest('[data-root-dir][role="button"]');!ge||ge!==ne||(z.preventDefault(),V(ge.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",Ce),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",Z),r.removeEventListener("keydown",Ce),i.removeEventListener("click",L),M(),st(c``,r),e.replaceChildren()}}}function ep(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let g=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));g&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Ah="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Aa="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Sh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Eh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ts="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function js(e,t){return`${e}\0${t}`}function Th(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Ch(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ws(e,t){let n=e.entries,r=n.map(g=>g.bead_id),s=Th(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[g,h]of s)for(let b of h)o.push({blocker:b,blockee:g});let a=Ch(e,t),i=new Map(r.map((g,h)=>[g,h])),l=r.slice(0,a).filter(g=>s.get(g).some(h=>Number(i.get(h))>Number(i.get(g)))),u=ep(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(g=>[g.bead_id,g]));return{entries:[...n.slice(0,a),...u.order.map(g=>d.get(g))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function tp(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ws(n,t)}function Rh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Oh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Lh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ol(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Ih(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(js(a,l));let r=new Map,s=new Map;for(let a of e){let i=js(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=js(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ph(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Mh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function xa(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function al(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function zs(e){let t=Lh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Oh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,g)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(ol(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),g!==void 0&&r.add(js(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...g===void 0?{}:{lane_id:g}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let g=t.get(u)||[];if(!g.includes(d))return;let h=o(u);h!==null&&(t.set(u,g.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(js(u,d))}}function Hs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Ih(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Rh(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function np(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Bs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function rp(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function sp(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(xa(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Us(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Sa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function il(e,t,n){let r=zs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ah};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Sh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ts}}if(e.kind==="chain"&&d===void 0)return{refused:ts};let g=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(V=>V.bead_id===e.bead_id);if(w<0)return;let D=w>0?d.entries[w-1]:null,B=w+1<d.entries.length?d.entries[w+1]:null,Y=Bs(d,w),le=B!==null&&Bs(d,w+1);Y&&D!==null&&r.removeDep(e.bead_id,D.bead_id),le&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(Y||le)&&D!==null&&B!==null&&r.addDep(B.bead_id,D.bead_id,u)},h=(w,D)=>{let B=n.cross_lanes.get(w),Y=B.entries.findIndex(xe=>xe.bead_id===e.bead_id),le=B.entries.filter(xe=>xe.bead_id!==e.bead_id),V=Math.max(0,Math.min(le.length,Y>=0&&D>Y?D-1:D)),N=-1;if(le.forEach((xe,ke)=>{n.fixed_members.has(xe.bead_id)&&(N=ke)}),V<=N){r.state.refusal=Eh;return}let M=Y>=0?B.entries[Y]:d?.entries.find(xe=>xe.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Ws({status:B.status,entries:[...le.slice(0,V),M,...le.slice(V)]},n);let K=i.entries;if(Sa(K,B.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:w,entries:Us(K)}}),B.status!=="confirmed")return;let L=K.findIndex(xe=>xe.bead_id===e.bead_id),I=L>0?K[L-1].bead_id:null,te=L+1<K.length?K[L+1].bead_id:null;if(I===null){te!==null&&r.addDep(te,e.bead_id,w);return}if(r.addDep(e.bead_id,I,w),te!==null&&(r.graph.get(te)||[]).includes(I)){let xe=B.entries.findIndex(ke=>ke.bead_id===te);(r.laneCreated(te,I)||xe>0&&B.entries[xe-1].bead_id===I&&Bs(B,xe))&&r.removeDep(te,I),r.addDep(te,e.bead_id,w)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(g(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...rp(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Us(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Ph(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(xa(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let D=n.parallel_rows,B=D[Math.max(0,Math.min(D.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Mh(n,e.root_dir)&&b!==void 0){let le=b>w?w:w-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&o.push(xa(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let w=b>t.index?t.index:t.index-1;w>=0&&w!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else o.push(xa(e.bead_id,e.root_dir,t.index,t.lane_id));return Hs(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function op(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ws(n,t);if(r.held)return{refused:Aa};let s=r.entries,o=zs(t),a=[];np(o,s,e),o.state.refusal===null&&sp(o,t,s,a);let i=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Hs(o,t,i,a,{lane_id:e,correction:r})}function ap(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=Ws(n,t),s=r.entries,o=zs(t),a=[];np(o,s,e),o.state.refusal===null&&sp(o,t,s,a);let i=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}];return Hs(o,t,i,a,{lane_id:e,correction:r})}function ip(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=Ws(n,t),s=r.entries;return Hs(zs(t),t,Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}],[],{lane_id:e,correction:r})}function lp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=zs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Bs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Hs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:rp(t,n,e,n.entries)})}function cp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Bs(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${al(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function up(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function dp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function ll(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Dh="\uC0AC\uC774\uD074";function pp(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=ol(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Dh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function fp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var _p={running:3,paused:2,failed:1};function Tr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function mp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function gp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Tr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Tr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),g=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=_p[u.run_state],g=_p[i];if(d>g||d===g&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var bp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Gs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ea(e,t){let n=bp.find(s=>s.step===e);if(!n)return null;let r=bp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function hp(e){let t=Gs.findIndex(n=>n.step===e);return Gs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=Gs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Nh(e){let t=Gs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Gs.length}}function Ta(e){let t=Nh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ul=new Set(["queued","running","retry_pending","repairing"]),yp=new Set(["failed","succeeded"]),qh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ks={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ks.base_containment,child_sweep:Ks.child_sweep,branch_cleanup:Ks.branch_cleanup,parent_close:Ks.parent_close};function jh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ul,...yp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Uh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function cl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=qh[s];if(!o)return null;let a=Ea(n,`${r} ${o}`);return a?{...a,active:ul.has(s),failed:s==="failed"}:null}function Wh(e){return!e||typeof e!="object"?null:Fh[e.step]||null}function Vs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=jh(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&Bh(w,t,i)).sort(Uh):[],u=a?l:[],d=u.find(w=>ul.has(w.state));if(d)return cl(d);if(s)return s.step==="repo_operations"&&l[0]?cl(l[0],!0):null;let g=u.find(w=>yp.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return cl(g);if(r){let w=Ea(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Ks[e.cleanup_cursor]:null;if(!h)return null;let b=Ea(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var zh="\uBBF8\uC801\uC7AC";function dl(e,t){let n=Eo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function vp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=dl(o,{id:l,location_label:s.get(l)||zh}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function pl(e,t){return`${e}\0${t}`}function wp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function fl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ys(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function kp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ys(s)})`,location_label:Ys(s),scope:null,same_lane_ahead:!1};let a=fl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function $p(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=pl(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=pl(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let w of h){let D=r.get(w);D&&D!==u&&!b.includes(D)&&b.push(D)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let g=d.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),d.push(...s.get(g)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let g=n.get(d);o(d,i)&&g&&u.push(g)}u.length>0&&a.set(i,u)}return a}function xp(e,t){return pl(e,t)}var Ap=1,Zs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ml=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ns={show_blocked:!0,spec:"all"},Sp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Hh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Tr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Gh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Tr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Kh(e,t){let{winners:n,resumed_from_ids:r}=gp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:On(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Ep(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function zt(e){return e&&typeof e=="object"?e:{}}function Vh(e,t,n){let r=zt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>wn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Tp(Er(l,o),Er(u,o)),g=Tp(pr(l,null),pr(u,null));return d||g?{orchestration:d,worker:g}:null}function Tp(e,t){return!e||t&&t.text===e.text?null:e}function Cp(e,t){let n=fl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Yh(e,t,n){let r=t.get(e);if(!r)return Cp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ys(r)}function Zh(e,t,n,r){let s=t.get(e);if(!s)return{label:Cp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ys(s),title:""}}function Qh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Xh(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Jh(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let g=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,le)=>{let V=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(V.length===0)return;let N=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",M=n.get(V),K=M?M.state:void 0,L=K==="running"||K==="pr_wait"||K==="done",I=!M||K==="runnable",te=M&&M.lane==="parallel"&&typeof M.position=="number"?M.position-1:null,xe=Zh(V,n,r,t),ke=b.length>0?b[b.length-1].id:null,_e=g==="confirmed"&&ke!==null&&!(t.get(V)||[]).includes(ke);b.push({id:V,title:s.get(V)||V,root_dir:M?M.root_dir:N,workspace_name:M?M.workspace_name:o.get(N)||"",seq:le+1,location_label:xe.label,location_title:xe.title,draggable:!L,fixed:L,done:K==="done",unplaced:I,mismatch:_e,...te!==null?{queue_index:te}:{}})}),b.forEach((Y,le)=>{Y.seq=le+1});let w=b.length>0&&b.every(Y=>Y.done),D=b.filter(Y=>!Y.fixed&&a.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),B=Xh(d,g,b,w,D,a);i.push({lane_id:d,status:g,draft:g==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:w,can_confirm:g==="draft"&&b.length>=2,has_mismatch:g==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:D,...B})}),i}function ey(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function ty(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:g,state:h}=ey(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:g})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,g=a.get(d);g?g.push(l):a.set(d,[l])}let i=(l,u,d)=>{let g=u.cards[0],h={id:g.id,title:g.title,location_label:Yh(g.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let g=ya(l[u].scope,l[d].scope);g.length!==0&&(i(l[u],l[d],g),i(l[d],l[u],g))}}function _l(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ra(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function gl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...ns,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Zs.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T);let d=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);let g=[],h=[],b=[],w=[],D=[],B=[],Y=new Map,le=new Map,V=new Map,N=new Map,M=new Map,K=new Map,L=new Map,I=new Set,te=new Map,xe=new Map,ke=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let ce=T.root_dir,Ie=T.name||ce,De=u.get(ce),Qe=De&&typeof De.revision=="number"?De.revision:typeof T.revision=="number"?T.revision:0,rt=zt(T.attempts),gt=zt(T.bead_titles);for(let[v,U]of Object.entries(gt))typeof U=="string"&&U.length>0&&ke.set(v,U);let ht=zt(T.bead_times),re=zt(T.pr_observations),Q=zt(T.admission),Fe=zt(T.revise_parked),ot=zt(T.merge_queue_state),ze=zt(T.cleanup_failed),we=zt(T.discard_operations),Ke=zt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&te.set(ce,zt(T.bead_scope));let ut=zt(T.bead_workflow),ft=zt(T.pr_activity),_t=Array.isArray(T.repo_operations)?T.repo_operations:[],Pt=Array.isArray(T.merge_queue)?T.merge_queue:[],Kt=new Set(Pt.filter(v=>v&&typeof v.bead_id=="string").map(v=>v.bead_id)),Ht=new Map(Pt.filter(v=>v&&typeof v.bead_id=="string").map(v=>[v.bead_id,v])),Rt=Array.isArray(T.queue)?T.queue:[];for(let v of[...Rt,...Array.isArray(T.pr_wait)?T.pr_wait:[]])v&&typeof v.bead_id=="string"&&typeof v.armed_by_lane=="string"&&v.armed_by_lane.length>0&&K.set(v.bead_id,v.armed_by_lane);for(let v of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof v=="string"&&v.length>0&&I.add(v);let Lt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(v=>v&&/^s[1-5]$/.test(v.id)&&Array.isArray(v.entries)),Je=zt(T.lane_states),Ne=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Lt.length);V.set(ce,Ne),N.set(ce,Rt.length);let P=new Map(Lt.map(v=>[v.id,v])),J=new Map;for(let v of Lt)for(let U of v.entries)U&&typeof U.bead_id=="string"&&J.set(U.bead_id,v.id);for(let[v,U]of Object.entries(Ke))Array.isArray(U)&&M.set(v,U.filter(ie=>typeof ie=="string"&&ie.length>0));let ve=Array.isArray(T.done)?T.done:[];for(let v of ve)v&&typeof v.bead_id=="string"&&B.push({id:v.bead_id,root_dir:ce,workspace_name:Ie});let S=new Map;for(let v of ve)v&&typeof v.bead_id=="string"&&typeof v.added_at=="number"&&S.set(v.bead_id,v.added_at);let H=v=>({id:v,title:gt[v]||v,root_dir:ce,workspace_name:Ie,expected_revision:Qe,draggable:!1,...zt(ht[v]).created_at?{created_at:zt(ht[v]).created_at}:{},...zt(ht[v]).updated_at?{updated_at:zt(ht[v]).updated_at}:{}}),Le=v=>Object.hasOwn(Ke,v)?{blocked_by:Array.isArray(Ke[v])?Ke[v].filter(U=>typeof U=="string"&&U.length>0):[]}:{},$=new Set;for(let[v,U]of Kh(rt,S)){$.add(v);let ie=U.run_state==="failed"?Qh(rt,U.attempt_id):null;ie!==null&&L.set(v,ie),h.push({...H(v),lane:"running",...Le(v),...J.has(v)?{serial_lane_id:J.get(v)}:{},attempt_id:U.attempt_id,run_state:U.run_state,status:U.status||void 0,workflow:ut[v]||null,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,last_activity:U.last_activity,legs:U.legs,runner:U.runner,model:U.model,effort:U.effort,speed:U.speed,resumed_from:U.resumed_from,continuation_mode:U.continuation_mode,usage:U.usage,exec_chips:{orchestration:Fs(U),worker:null},discard:Bn(we,v,{attempt_id:U.attempt_id}),badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"})}for(let[v,U]of mp(rt)){if(h.some(je=>je.id===v))continue;let ie=U.attempt,Ve=U.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(v),lane:"running",kind:"session",...Le(v),attempt_id:typeof ie.attempt_id=="string"?ie.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ut[v]||null,can_pause:!1,can_resume:!1,started_at:U.started_at,last_event_at:typeof ie.last_event_at=="number"?ie.last_event_at:null,last_activity:ie.last_activity&&typeof ie.last_activity=="object"?ie.last_activity:null,legs:Array.isArray(ie.legs)?ie.legs:[],runner:typeof ie.runner=="string"?ie.runner:null,model:typeof ie.model=="string"?ie.model:null,effort:typeof ie.effort=="string"?ie.effort:null,speed:typeof ie.speed=="string"?ie.speed:null,resumed_from:null,continuation_mode:null,usage:ie.usage&&typeof ie.usage=="object"?ie.usage:null,exec_chips:{orchestration:Fs(ie),worker:null},discard:Bn(we,v,{merge_queued:!0}),badges:[U.origin==="auto"?`${Ve} \xB7 \uC790\uB3D9`:Ve],alert:!1})}for(let v of Array.isArray(T.session_active)?T.session_active:[]){let U=v&&v.bead_id;typeof U!="string"||$.has(U)||($.add(U),Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&M.set(U,v.blocked_by.filter(ie=>typeof ie=="string"&&ie.length>0)),typeof v.title=="string"&&v.title.length>0&&ke.set(U,v.title),h.push({...H(U),title:v.title||gt[U]||U,lane:"running",kind:"session",status:"in_progress",started_at:_l(v.started_at)??_l(v.updated_at)??void 0,updated_at:_l(v.updated_at)??void 0,workflow:v.workflow||null,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(ie=>typeof ie=="string"&&ie.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(v.session_refs)?v.session_refs:[],badges:[],alert:!1}))}for(let v of Array.isArray(T.pr_wait)?T.pr_wait:[]){let U=v&&v.bead_id;if(typeof U!="string"||$.has(U))continue;$.add(U);let ie=zt(re[U]),Ve=zt(ie.pr),je=ie.gate?zt(ie.gate):null,he=Kt.has(U),Ot=Ht.get(U)?.continuation_action||null,yt=!!Ot&&Ot.continuation===null,bt=ot.active===U,Qt=v.external===!0,Ft=ze[U]||null,an=zt(ft[U]),en=Vs({bead_id:U,merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,merge_progress:an.merge_progress||null,cleanup_failed:Ft,repo_operations:_t}),nn=Ca(en),Xt=!!je&&je.base_badge==="\uCDA9\uB3CC",on=!!Ft&&["child_sweep","branch_cleanup","parent_close"].includes(Ft.step)&&!!je&&je.tier==="merged",Ye=Qt&&!!Ft&&!!je&&je.tier==="merged",hn=!!je&&["closed_unmerged","review","undecidable"].includes(je.tier)&&je.reason!=="review_receipt_undetermined",tt=Bn(we,U,{external:Qt,merge_active:bt||en?.step==="merge",merge_queued:he,cleanup_active:nn,merged:!!Ft||je?.tier==="merged"}),Me=!!tt.operation;b.push({...H(U),lane:"pr_wait",...Le(U),workflow:ut[U]||null,pr_number:typeof Ve.number=="number"?Ve.number:null,pr_url:typeof Ve.url=="string"?Ve.url:void 0,external:Qt,usage:On(rt,U),merge_step:en,badges:yt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:en?[je?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ft?[Cr(Ft.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(Ft.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof je?.gate_badge=="string"&&je.gate_badge.length>0?[je.gate_badge]:[],alert:en?en.failed===!0:!!Ft||hn,reason:Ft&&en?.active!==!0?Ta(Ft.step):"PR \uB300\uAE30",merge_action:je?.tier==="merged"&&!on&&!Ye?!1:!he||yt,merge_enabled:!Me&&(yt||je?.enabled===!0||Xt||on||Ye),merge_label:yt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ye||on?"\uC815\uB9AC \uC7AC\uAC1C":Xt&&!on?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:yt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?tt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${tt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${tt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":on?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":je?.enabled===!0?`\uBA38\uC9C0 (${je.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${je?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:he&&!yt,cancel_enabled:!bt,continuation_mismatch:Ot?.mismatch||null,discard:tt,discard_action:tt.action,discard_enabled:tt.enabled,discard_title:tt.title})}let O=(v,U,ie,Ve)=>{let je=v&&v.bead_id;if(typeof je!="string"||$.has(je))return null;$.add(je);let he=Fe[je],Ot=Bn(we,je),yt=Ot.operation?Ot:null,bt={...H(je),lane:U,workflow:ut[je]||null,draggable:!yt,discard:yt||void 0,reason:Ep(Q,je),seq:ie+1,queue_position:ie+1,queue_index:ie,queue_length:Ve,badges:he?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!he,revise_action:!!he,revise_enabled:!!he&&!yt,revise_title:he?he.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${he.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Qt=Le(je);return Object.hasOwn(Qt,"blocked_by")&&(bt.blocked_by=Qt.blocked_by),bt};for(let v=0;v<Rt.length;v++){let U=O(Rt[v],"queue",v,Rt.length);if(!U)continue;w.push(U);let ie=Y.get(ce);ie?ie.push(U):Y.set(ce,[U])}let X=v=>{let U=b.find(he=>he.id===v&&he.root_dir===ce);if(U)return{id:v,title:U.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ie=h.find(he=>he.id===v&&he.root_dir===ce),Ve=ie?ie.run_state:Hh(rt,v),je=Ve==="failed"||Ve==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ve==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:v,title:ie?ie.title:H(v).title,badge:je}},me=[];for(let v=0;v<Math.max(Ne,Lt.length);v++){let U=`s${v+1}`,ie=P.get(U),Ve=ie&&Array.isArray(ie.entries)?ie.entries:[],je=zt(Je[U]),he=Array.isArray(je.occupied_by)?je.occupied_by.filter(bt=>typeof bt=="string"):[],Ot=new Set(he),yt=[];for(let bt=0;bt<Ve.length;bt++){let Qt=Ve[bt]&&Ve[bt].bead_id;if(typeof Qt=="string"&&Ot.has(Qt)){$.add(Qt);continue}let Ft=O(Ve[bt],U,bt,Ve.length);Ft&&(yt.push(Ft),w.push(Ft))}yt.length===0&&he.length===0&&(Ne<=1||v>=Ne)||me.push({id:U,index:v,items:yt,raw_length:Ve.length,occupied_by:he,occupants:he.map(bt=>X(bt)),corrections:Array.isArray(je.corrections)?je.corrections.length:0,cycle:je.cycle===!0,...yt.length===0&&he.length===0?{empty:!0}:{}})}le.set(ce,me);let Ae=Array.from({length:Ne},(v,U)=>{let ie=`s${U+1}`,Ve=P.get(ie),je=Ve&&Array.isArray(Ve.entries)?Ve.entries:[],he=zt(Je[ie]);return{id:ie,index:je.length,length:je.length,occupied_by:Array.isArray(he.occupied_by)?he.occupied_by.filter(Ot=>typeof Ot=="string"):[]}});for(let v of Array.isArray(T.runnable)?T.runnable:[]){let U=v&&v.bead_id;if(typeof U!="string"||$.has(U))continue;$.add(U);let ie=v.workflow&&typeof v.workflow=="object"?v.workflow:null,Ve=ie&&typeof ie.route=="string"&&ie.route||(typeof v.route=="string"?v.route:null),je=Vh(zt(De),v.exec_pins,Ve);Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&M.set(U,v.blocked_by.filter(he=>typeof he=="string"&&he.length>0)),typeof v.title=="string"&&v.title.length>0&&ke.set(U,v.title),Array.isArray(v.scope)&&xe.set(U,v.scope.filter(he=>typeof he=="string"&&he.length>0)),g.push({...H(U),title:v.title||gt[U]||U,lane:"runnable",draggable:!0,reason:Ep(Q,U),created_at:v.created_at??void 0,updated_at:v.updated_at??void 0,status:typeof v.status=="string"?v.status:void 0,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",published:v.published===!0,workflow:ie||(Ve?{route:Ve,chips:{route:Ve}}:null),...je?{exec_chips:je}:{},blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(he=>typeof he=="string"&&he.length>0)}:{},place_index:Rt.length,place_lanes:Ae})}for(let v of ve){let U=v&&v.bead_id;if(typeof U!="string"||$.has(U)||($.add(U),o!==void 0&&typeof v.added_at=="number"&&v.added_at<o))continue;let ie=Gh(rt,U),Ve=ie&&typeof ie.done_kind=="string"?ie.done_kind:null;D.push({...H(U),lane:"done",done:!0,done_layout:"three_line",usage:On(rt,U),work_ms:da(rt,U),done_at:typeof v.added_at=="number"?v.added_at:void 0,done_kind:Ve,badges:[...Ve&&Sp[Ve]?[Sp[Ve]]:[],...ua(rt,U)]})}}let _e=new Map;s.forEach((T,ce)=>{T&&typeof T.root_dir=="string"&&_e.set(T.root_dir,ce)});let ae=n&&n.running_sort==="repo"?"repo":"started";h.sort((T,ce)=>{let Ie=T.kind==="session",De=ce.kind==="session";if(Ie!==De)return Ie?1:-1;if(Ie&&De){let gt=Ra(ce.updated_at)-Ra(T.updated_at);return gt!==0?gt:T.id.localeCompare(ce.id)}if(ae==="repo"){let gt=_e.get(T.root_dir)??Number.MAX_SAFE_INTEGER,ht=_e.get(ce.root_dir)??Number.MAX_SAFE_INTEGER;if(gt!==ht)return gt-ht}let Qe=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,rt=typeof ce.started_at=="number"&&Number.isFinite(ce.started_at)?ce.started_at:null;return Qe!==null&&rt!==null&&Qe!==rt?Qe-rt:Qe===null&&rt!==null?1:Qe!==null&&rt===null?-1:T.id.localeCompare(ce.id)}),D.sort((T,ce)=>(ce.done_at??0)-(T.done_at??0));let Te=s.length>0?s:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),Pe=new Set(g.map(T=>T.root_dir)),$e=[];for(let T of Te){if(!T||typeof T.root_dir!="string")continue;let ce=Y.get(T.root_dir)||[],Ie=le.get(T.root_dir)||[];!(ce.length>0||Ie.some(Qe=>Qe.items.length>0||Qe.occupied_by.length>0))&&!Pe.has(T.root_dir)||$e.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=Ap?T.slots:Ap,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:zt(T.runner_catalog),items:ce,sublanes:{parallel:ce,serial:Ie},serial_lane_count:V.get(T.root_dir)||0,raw_queue_length:N.get(T.root_dir)||0})}let ee={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:w,queue_groups:$e,running:h,pr_wait:b,done:D,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(N),owner_of:{}},Z=wp(ee);for(let T of B)Z.has(T.id)||Z.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let ce=Z.get(T.id);T.blockers=(T.blocked_by||[]).map(Ie=>kp(Ie,ce,Z,s))}for(let T of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let ce=(T.blockers||[]).map(De=>({...dl(T.id,De),openable:!0}));if(ce.length===0)continue;let Ie={predecessors:ce};T.dependency_chips=Ie}ty(ee,te,xe,Z,s);let Ce=$p(ee.queue_groups);for(let T of ee.queue_groups)for(let ce of T.sublanes.serial){let Ie=Ce.get(xp(T.root_dir,ce.id));Ie&&(ce.cross_wait_peers=Ie)}ee.chain_lanes=Jh(i&&Array.isArray(i.lanes)?i.lanes:[],M,Z,s,ke,d,{armed_by_bead:K,failed_by_bead:L,disarmed_lanes:I});let z=new Map;for(let T of[...ee.queue,...ee.runnable])z.has(T.id)||z.set(T.id,T);let ne=new Set;for(let T of ee.chain_lanes)for(let ce of T.rows){if(T.status==="confirmed"&&!ce.unplaced&&!ce.fixed&&ne.add(ce.id),!T.draft&&!ce.unplaced)continue;let Ie=z.get(ce.id);Ie&&(Ie.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let ge=new Map(ee.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...ee.queue,...ee.running]){let ce=K.get(T.id);if(typeof ce!="string"||ce.length===0)continue;let Ie=ge.get(ce);T.armed_lane_chip=Ie===void 0?{lane_id:ce,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ce,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let Se=[];for(let T of Y.values())for(let ce of T)ne.has(ce.id)||Se.push(ce);Se.sort((T,ce)=>{let Ie=T.workspace_name.localeCompare(ce.workspace_name);return Ie!==0?Ie:(T.queue_index??0)-(ce.queue_index??0)}),ee.parallel_rows=Se;let Ze={};for(let[T,ce]of Z)typeof ce.root_dir=="string"&&ce.root_dir.length>0&&(Ze[T]=ce.root_dir);for(let T of ee.chain_lanes)for(let ce of T.rows)!Object.hasOwn(Ze,ce.id)&&ce.root_dir.length>0&&d.has(ce.root_dir)&&(Ze[ce.id]=ce.root_dir);ee.owner_of=Ze;let ue=ee.runnable.length;ee.runnable_all=ee.runnable.slice();let Ue=ee.runnable;a.show_blocked||(Ue=Ue.filter(T=>T.blocked!==!0));let mt=Ue.length;a.spec==="with"?Ue=Ue.filter(T=>T.published===!0):a.spec==="without"&&(Ue=Ue.filter(T=>T.published!==!0)),ee.runnable_hidden={blocked:ue-mt,spec:mt-Ue.length};let At=(T,ce)=>{let Ie=Ra(ce.updated_at)-Ra(T.updated_at);return Ie!==0?Ie:T.id.localeCompare(ce.id)},ct=l==="repo_spec"?(T,ce)=>{let Ie=T.published===!0?0:1,De=ce.published===!0?0:1;return Ie!==De?Ie-De:At(T,ce)}:At;if(l==="updated_flat")ee.runnable=Ue.slice().sort(At),ee.runnable_sections=[];else{let T=new Map;for(let De of Ue){let Qe=T.get(De.root_dir);Qe?Qe.push(De):T.set(De.root_dir,[De])}let ce=[],Ie=[];for(let De of Te){if(!De||typeof De.root_dir!="string")continue;let Qe=(T.get(De.root_dir)||[]).slice().sort(ct);T.delete(De.root_dir),Qe.length!==0&&(ce.push({root_dir:De.root_dir,name:De.name||De.root_dir,items:Qe.map(rt=>({...rt,workspace_name:""}))}),Ie.push(...Qe))}for(let[De,Qe]of T){let rt=Qe.slice().sort(ct);ce.push({root_dir:De,name:rt[0]?.workspace_name||De,items:rt.map(gt=>({...gt,workspace_name:""}))}),Ie.push(...rt)}ee.runnable=Ie,ee.runnable_sections=ce}return ee}var Rp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",ny=1e4;function Op(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Lp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Dp="bdui.monitor.done-range",Np="bdui.monitor.running_sort",qp="bdui.monitor.candidate_sort",Fp="beads-ui.monitor.candidate-filter",jp="beads-ui.monitor.sections";function ry(){try{let e=window.localStorage.getItem(Fp);if(!e)return{...ns};let t=JSON.parse(e);return!t||typeof t!="object"?{...ns}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ns.show_blocked,spec:ml.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ns}}}function Ip(e){try{window.localStorage.setItem(Fp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function sy(){try{let e=window.localStorage.getItem(qp);return Zs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function oy(e){try{window.localStorage.setItem(qp,e)}catch{}}function ay(){try{let e=window.localStorage.getItem(jp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Pp(e){try{window.localStorage.setItem(jp,JSON.stringify(e))}catch{}}function iy(){try{let e=window.localStorage.getItem(Dp);return e===null?"today":Wn(e)}catch{return"today"}}function ly(e){try{window.localStorage.setItem(Dp,e)}catch{}}function cy(){try{return window.localStorage.getItem(Np)==="repo"?"repo":"started"}catch{return"started"}}function uy(e){try{window.localStorage.setItem(Np,e)}catch{}}var Bp="tab:monitor:pipeline",dy=1e3,py=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Mp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function fy(e){return e>=1&&e<=Mp.length?Mp[e-1]:`(${e})`}function Up(e,t){let n=Gt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),g=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=iy(),b=cy(),w=ry(),D=sy(),B=ay(),Y=null,le=null,V=null,N=null,M=[],K=null,L=null,I=null,te=null;function xe(p){return te===null&&(te=Ye()),tp(p,te)}function ke(p,_){_e(),!(_<=0)&&(L={lane_id:p,corrected:_},I=setTimeout(()=>{I=null,L=null,v()},ny))}function _e(){I!==null&&(clearTimeout(I),I=null),L=null}function ae(){let p=Dr.find(_=>_.value===h);return p?p.label:""}let Te=document.createElement("div");Te.className="mon",e.appendChild(Te);let Pe=document.createElement("div");Pe.className="worker-drawer-overlay",Pe.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let ee=document.createElement("div");ee.className="worker-drawer-host mon2-drawer",Pe.append($e,ee),e.appendChild(Pe);let Z=gl(null,null),Ce=new Map,z=new Map,ne=null,ge=null,Se=null,Ze=Zr(ee,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,Pe.hidden=!0,v()}});async function ue(p,_,y,A,W=!0){if(!o||!y)return null;let G=await o(p,{..._,root_dir:y,expected_revision:A});if(G&&G.conflict&&W){G.queue&&z.set(y,G.queue);let oe=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:A;G=await o(p,{..._,root_dir:y,expected_revision:oe})}return G&&G.queue&&y&&z.set(y,G.queue),G}function Ue(p,_){let y=z.get(p),A=s&&s.get?s.get():null,W=(Array.isArray(A)?A:[]).find(oe=>oe?.root_dir===p);return(y||W)?.merge_queue?.find(oe=>oe.bead_id===_)?.continuation_action}async function mt(p,_,y,A){let W=await ue(p,_,y,A),G=z.get(y)?.revision??W?.queue?.revision??A;return Zn(W,(oe,be)=>ue(p,{..._,continuation:oe,decision_token:be},y,G,!1),{refresh:oe=>ue(p,_,y,oe?.queue?.revision??z.get(y)?.revision??G,!1)})}async function At(p,_,y,A){let W=await Zn({continuation_mismatch:A},(oe,be)=>ue("worker-merge-queue-add",{bead_id:_,continuation:oe,decision_token:be},p,y,!1)),G=W?.queue?.merge_queue?.find(oe=>oe.bead_id===_)?.continuation_action;W?.applied!==!0&&G?.continuation===null&&G.mismatch&&await At(p,_,W.queue.revision,G.mismatch)}async function $t(p,_,y){let A=await ue("worker-discard",p,_,y);if(A&&A.discarded===!0){de(fa(A),"success",5e3);return}if(A&&A.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${A.reason}`,"error");return}if(A&&A.accepted&&A.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(A&&A.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${A.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}A&&!A.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ct(p,_,y){return!o||!y?null:await o(p,{..._,root_dir:y})}async function T(){let p=new Map;for(let _ of Z.pr_wait)p.has(_.root_dir)||p.set(_.root_dir,_.expected_revision);for(let[_,y]of p)await ue("worker-merge-queue-add-all",{},_,y)}function ce(p){let _=B[p];return!!(_&&_.runnable===!0)}function Ie(p){let _={...B[p]||{}};_.runnable=!_.runnable,B={...B,[p]:_},Pp(B),v()}function De(p){return B[p]===!0}function Qe(p){B={...B,[p]:B[p]!==!0},Pp(B),v()}function rt(p){let _=Z.queue_groups.find(y=>y.root_dir===p);if(!_)return null;for(let y=0;y<_.serial_lane_count;y+=1){let A=`s${y+1}`,W=_.sublanes.serial.find(G=>G.id===A);if(!W||W.raw_length===0&&W.occupied_by.length===0)return A}return null}function gt(p,_){let y=Z.queue_groups.find(W=>W.root_dir===p),A=y?y.sublanes.serial.find(W=>W.id===_):void 0;return A?A.raw_length:0}function ht(p,_){let y=Ce.get(p),A=Ce.get(_);if(!y||!A)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let W=Op(y),G=Op(A);if(W!==null&&W===G&&y.root_dir===A.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let oe=Lp(y),be=Lp(A);if(oe&&G!==null){let et=G;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:A.root_dir,ops:[{bead_id:p,lane:et,index:gt(A.root_dir,et)}]}}if(W!==null&&be&&G===null){let et=W;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:_,lane:et,index:gt(y.root_dir,et)}]}}if(oe&&W===null&&be&&G===null){let et=rt(y.root_dir);return et===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${et} \uB808\uC778\uC5D0 ${_} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:_,lane:et,index:0},{bead_id:p,lane:et,index:1}]}}return!oe&&!be?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:oe?{kind:"note",text:`${qs(A.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${qs(y.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function re(p,_){let y=ht(p,_.id);return{id:_.id,title:_.title,location_label:_.location_label,prefixes:_.prefixes,action:y.kind==="note"?{kind:"note",text:y.text}:y.kind==="disabled"?{kind:"disabled",label:Rp,title:y.title}:{kind:"place",label:Rp,title:y.title}}}function Q(p,_){if(!V||V.bead_id!==p)return null;let y=V.counterpart_id,A=_.filter(W=>W.id===y);return A.length===0?null:{rows:A.map(W=>re(p,W))}}function Fe(p){let _=p.dependency_chips||null,y=p.overlap_chips||[],A=p.scope_state==="missing",W=p.cross_lane_chip,G=p.armed_lane_chip;if(!_&&y.length===0&&!A&&!W&&!G)return null;let oe=Q(p.id,y);return{..._||{},...y.length>0?{overlaps:y}:{},...A?{scope_missing:!0}:{},...W?{cross_lane:{lane_id:W.lane_id,label:W.label}}:{},...G?{armed_lane:G}:{},...oe?{popover:oe}:{}}}function ot(p){let _=Fe(p);return _?{...p,dependency_chips:_}:p}async function ze(p,_){let y=ht(p,_);if(V=null,y.kind!=="ops"){v();return}let A=tt(y.root_dir,y.ops[0].bead_id);for(let W of y.ops){let G=await we(W,y.root_dir,A);if(G===null)break;A=G}v()}async function we(p,_,y){try{let A=await ue("worker-queue-place",p,_,y,!1);if(A&&A.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!A||A.applied!==!0)return de(A&&typeof A.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${A.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let W=A.queue?A.queue.revision:void 0;return typeof W!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):W}catch(A){return de(bt(A),"error"),null}}function Ke(p){let _=ce(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${_?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${_?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${_?"\u25B8":"\u25BE"}
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
    </header>`}function ut(p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${_}
    </div>`}function ft(p){if(le!==p.id)return null;let _=Z.queue_groups.find(G=>G.root_dir===p.root_dir),y=p.place_lanes||[],A=Z.cross_lanes_revision!==null,W=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let G of Z.chain_lanes)W.push({id:`lane:${G.lane_id}`,label:`\uC5F0\uACB0 ${G.number} (${G.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:G.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A});W.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!A,title:A?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let G of y)W.push({id:`serial:${G.id}`,label:`\uC9C1\uB82C ${Number(G.id.slice(1))}`,count:G.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:W}}function _t(){let p=[],_=new Set,y=(A,W)=>{for(let G of A)_.has(G.id)||(_.add(G.id),p.push({bead_id:G.id,root_dir:G.root_dir,workspace_name:G.workspace_name,title:G.title,lane:W}))};return y(Z.running,"running"),y(Z.pr_wait,"pr_wait"),y(Z.queue,"queue"),y(Z.runnable_all,"runnable"),p}function Pt(p){if(!N||N.bead_id!==p)return"";let _=nn(),y=_t(),A=new Map;for(let be of y)A.set(be.bead_id,be);let W=(_.get(p)||[]).filter(be=>A.has(be)),G=fp(pp(p,{issues:y,blocked_by_map:_}),N.query),oe=Z.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${W.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${W.map(be=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${be}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
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
        .value=${N.query}
      />
      <div class="mon-deppanel__list">
        ${G.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:G.map(be=>c`<button
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
      ${oe===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Kt(p){return ut(p,c`${Zi(ot(p),ft(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(_,y)=>i(y,p.root_dir):void 0})}${Pt(p.id)}`)}function Ht(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(p=>Kt(p))}
      </div>`:c`${Z.runnable_sections.map(p=>{let _=ce(p.root_dir);return c`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Ke({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${_?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(y=>Kt(y))}
            </div>`}
      </section>`})}`}function Rt(p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${cr(ot(p))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${p.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${p.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${Pt(p.id)}
    </div>`}function Lt(){let p=De("parallel");return c`<section
      class="mon2-area mon2-parallel${p?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${Z.parallel_rows.length}</span>
      </header>
      ${p?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${Z.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:Z.parallel_rows.map((_,y)=>Rt(_,y))}
          </div>`}
    </section>`}function Je(p,_,y,A){return c`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${y}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${fy(_.seq)}</span
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
      ${A.includes(_.id)?c`<span
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
    </div>`}function Ne(p){let _=Z.cross_lanes_revision!==null,y=xe(p.lane_id),A=y?.held===!0,W=y?.cycle===!0,G=y?y.mismatched:[],oe=L&&L.lane_id===p.lane_id?L.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${oe>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${oe}건 자동 교정</span
            >`:""}
        ${W?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${A?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Aa}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!_||!p.can_confirm||A}
              title=${A?Aa:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!_}
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
            </div>`:p.rows.map((be,et)=>Je(p,be,et,G))}
      </div>
    </div>`}function P(p,_,y){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.id}
      data-row-index=${y}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${cr(ot(_))}
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
      ${Pt(_.id)}
    </div>`}function J(p){if(p.length===0)return"";let _=p.length-1;return`${p[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function ve(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${cr({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function S(p,_){return c`<div
      class="mon2-lane${_.empty?" mon2-lane--empty":""}"
      data-root-dir=${p.root_dir}
      data-lane-length=${String(_.raw_length)}
    >
      ${In({id:"",lane:_.id,title:`${p.name} \xB7 \uC9C1\uB82C ${_.index+1}`,items:_.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${p.root_dir}
          data-lane-id=${_.id}
          data-lane-length=${String(_.raw_length)}
        >
          ${_.occupants.map(y=>ve(y))}
          ${_.items.length>0?_.items.map((y,A)=>P(_,y,A)):_.occupants.length>0?"":c`<div class="worker-pane__empty">
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
            data-root-dir=${p.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${_.empty?c`<div class="mon2-lane__hint">
            ${p.name} 직렬 ${_.index+1} 비어 있음
          </div>`:""}
      ${_.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(_.cross_wait_peers||[]).map(y=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function H(){let p=De("serial"),_=Z.cross_lanes_revision!==null,y=Z.chain_lanes.some(A=>A.draft&&A.rows.length===0);return c`<section
      class="mon2-area mon2-serial${p?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
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
      ${p?"":c`<div class="mon2-area__body">
            ${Z.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${Z.chain_lanes.map(A=>Ne(A))}
            ${Z.queue_groups.map(A=>A.sublanes.serial.map(W=>S(A,W)))}
          </div>`}
    </section>`}function Le(){return c`<div class="mon2-wait">${Lt()}${H()}</div>`}function $(p){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(_=>el({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:_.can_resume!==!1,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,discard:_.discard},p,Y,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:Fe(_)}}))}
    </div>`}function O(p){let _={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${py.map(y=>{let A=_[y.lane],W=y.lane==="runnable"?Z.runnable_flat?A.length>0?Ht():void 0:Z.runnable_sections.length>0?Ht():void 0:y.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Le():void 0:y.lane==="running"?$(p):A.length>0?c`${A.map(G=>cr(G))}`:void 0;return In({id:`monitor-${y.lane}`,lane:y.pane,title:y.lane==="done"?`\uC644\uB8CC\xB7${ae()}`:y.title,items:A,empty:y.empty,body:W,live:y.lane==="running"&&A.length>0,controls:y.lane==="runnable"?X():void 0,header_control:me(y.lane,A.length)})})}
      </div>`}function X(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ml.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${w.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${w.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function me(p,_){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${D}
      >
        ${Zs.map(y=>c`<option
              value=${y.value}
              ?selected=${D===y.value}
            >
              ${y.label}
            </option>`)}
      </select>`:p==="running"?c`<select
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
      </select>`:p==="pr_wait"&&_>0?c`<button
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
        ${Dr.map(y=>c`<option value=${y.value} ?selected=${h===y.value}>
              ${y.label}
            </option>`)}
      </select>`:""}function Ae(p){let _=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,W={done_since:vr(h,d()),running_sort:b,candidate_filter:w,candidate_sort:D};return A!==void 0&&(W.cross_lanes=A),gl(_,y,W)}function v(){let p=d();Z=Ae(),te=null,Ce=new Map;for(let _ of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!_.non_occupying&&!Ce.has(_.id)&&Ce.set(_.id,_);st(O(p),Te),ie()?.render(),U(),Ve()}function U(){let p=new Map;for(let _ of Z.queue_groups)p.set(_.root_dir,_.auto_advance);for(let _ of Array.from(Te.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let y=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",A=p.get(y);typeof A=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${A?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ie(){if(Se)return Se;let p=Te.querySelector(".mon2-deck");return p?(Se=Jd(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ae,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:he,onFocusChange:_=>{K=_,Ve()}}),Se):null}function Ve(){Te.classList.toggle("has-focus",K!==null);for(let p of Array.from(Te.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K);for(let p of Array.from(Te.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=Ce.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",K!==null&&!!_&&_.root_dir===K)}for(let p of Array.from(Te.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K)}function je(p,_){let y=a?a():void 0;if(!_||!y||_===y||!l){r(p);return}l(_).then(()=>{r(p)}).catch(A=>{n("workspace switch for %s failed: %o",_,A)})}function he(p){if(!p)return;let _=a?a():void 0,y=()=>{try{u?.gotoView("worker")}catch(A){n("gotoView(worker) failed: %o",A)}};if(!l||_&&_===p){y();return}l(p).then(y).catch(A=>{n("workspace switch for %s failed: %o",p,A),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ot(p){Sn(p).then(_=>{de(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function yt(p){let _=Ce.get(p)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}function bt(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let _=p;if(typeof _.message=="string"&&_.message.length>0)return _.message;if(typeof _.error=="string"&&_.error.length>0)return _.error;if(_.error&&typeof _.error=="object"&&typeof _.error.message=="string")return _.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Qt(p,_,y){let A=Z.owner_of[_];if(typeof A!="string"||A.length===0){de(`${_}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await ct(p,{a:_,b:y},A),await Ft(p,_,y)}catch(W){de(bt(W),"error")}v()}async function Ft(p,_,y){if(p!=="dep-add")return;let A=Z.chain_lanes.find(W=>W.rows.some(G=>G.id===_));!A||!A.rows.some(W=>W.id===y)||await wt(W=>ip(A.lane_id,W),"",[{type:p,a:_,b:y}])}function an(p){return Z.runnable.some(_=>_.id===p)||Z.parallel_rows.some(_=>_.id===p)?!0:Z.queue_groups.some(_=>_.sublanes.serial.some(y=>y.items.some(A=>A.id===p)))}function en(p){!p||!an(p)||(N=N&&N.bead_id===p?null:{bead_id:p,query:""},v())}function nn(){let p=new Map,_=s&&s.get?s.get():null,y=A=>Array.isArray(A)?A.filter(W=>typeof W=="string"&&W.length>0):[];for(let A of Array.isArray(_)?_:[]){if(!A||typeof A!="object")continue;let W=A.bead_blocked_by&&typeof A.bead_blocked_by=="object"?A.bead_blocked_by:{};for(let[G,oe]of Object.entries(W))Array.isArray(oe)&&p.set(G,y(oe));for(let G of[...Array.isArray(A.runnable)?A.runnable:[],...Array.isArray(A.session_active)?A.session_active:[]])G&&typeof G.bead_id=="string"&&Array.isArray(G.blocked_by)&&G.blocked_by.length>0&&p.set(G.bead_id,y(G.blocked_by))}return p}function Xt(){let p=new Map,_=new Map,y=s&&s.get?s.get():null,A=W=>Array.isArray(W)?W.filter(G=>typeof G=="string"&&G.length>0):[];for(let W of Array.isArray(y)?y:[]){if(!W||typeof W!="object")continue;let G=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[oe,be]of Object.entries(G))Array.isArray(be)&&p.set(oe,A(be));for(let oe of Array.isArray(W.runnable)?W.runnable:[])oe&&typeof oe.bead_id=="string"&&Array.isArray(oe.blocked_by)&&_.set(oe.bead_id,A(oe.blocked_by))}for(let W of M)for(let G of[p,_]){let oe=G.get(W.a);oe!==void 0&&G.set(W.a,W.type==="dep-remove"?oe.filter(be=>be!==W.b):oe.includes(W.b)?oe:[...oe,W.b])}return{snapshot:p,runnable:_}}function on(){let p=nn();for(let _ of M){let y=(p.get(_.a)||[]).slice();_.type==="dep-remove"?p.set(_.a,y.filter(A=>A!==_.b)):y.includes(_.b)||p.set(_.a,[...y,_.b])}return p}function Ye(p=Z,_=hn()){let y=new Map;for(let lt of Array.isArray(_?.lanes)?_.lanes:[]){let rn=new Map;for(let Mt of Array.isArray(lt?.entries)?lt.entries:[])Mt&&typeof Mt.bead_id=="string"&&rn.set(Mt.bead_id,Mt.dep_created_by_lane===!0);y.set(typeof lt?.id=="string"?lt.id:"",rn)}let A=new Map,W=new Map,G=new Set,oe=new Set;for(let lt of p.chain_lanes){let rn=y.get(lt.lane_id);A.set(lt.lane_id,{status:lt.status,entries:lt.rows.map((Mt,pn)=>({bead_id:Mt.id,root_dir:Mt.root_dir,...pn===0?{}:{dep_created_by_lane:rn?.get(Mt.id)===!0}}))});for(let Mt of lt.rows)W.set(Mt.id,lt.lane_id),Mt.fixed&&G.add(Mt.id),Mt.unplaced||oe.add(Mt.id)}let be=new Map;for(let lt of p.parallel_rows)typeof lt.queue_index=="number"&&be.set(lt.id,lt.queue_index);for(let lt of p.queue_groups)for(let rn of lt.sublanes.serial)for(let Mt of rn.items)typeof Mt.queue_index=="number"&&be.set(Mt.id,Mt.queue_index);let et=Xt();return{blocked_by_map:on(),snapshot_blocked_by:et.snapshot,runnable_blocked_by:et.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:A,owner_lane_of:W,fixed_members:G,placed_members:oe,parallel_rows:p.parallel_rows.map(lt=>({bead_id:lt.id,root_dir:lt.root_dir,queue_index:lt.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:be}}function hn(){return(s&&s.crossLanes?s.crossLanes():null)??null}function tt(p,_){let y=Ce.get(_);if(y&&y.root_dir===p)return y.expected_revision;let A=Z.queue_groups.find(W=>W.root_dir===p);return A?A.revision:0}async function Me(p,_,y){if(p.type==="worker-queue-disarm"){try{let A=await ue(p.type,p.payload,p.root_dir,y.get(p.root_dir)??tt(p.root_dir,_));A&&A.queue&&typeof A.queue.revision=="number"&&y.set(p.root_dir,A.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await C(p.type,p.payload,p.root_dir,y,{bead_id:_})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await ct(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch(A){return de(bt(A),"error"),!1}}async function C(p,_,y,A,W){try{let G=await ue(p,_,y,A.get(y)??tt(y,W.bead_id));return!G||typeof G.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(G.queue&&typeof G.queue.revision=="number"&&A.set(y,G.queue.revision),G.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):G.applied===!1?(de(G.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${G.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):G.queue&&typeof G.queue.revision=="number"?G.queue.revision:A.get(y)??0)}catch(G){return de(bt(G),"error"),null}}function ye(p){(p.type==="dep-add"||p.type==="dep-remove")&&(M=[...M,{type:p.type,a:p.a,b:p.b}])}async function qe(p,_){if(!o)return{ok:!1};try{let y=await o(p.type,{...p.payload,expected_revision:_});return!y||typeof y.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:y.revision}}catch(y){let A=y,W=A&&A.code==="conflict"?A.details?.cross_lanes:null;return W&&typeof W.revision=="number"&&Array.isArray(W.lanes)?{ok:!1,conflict:W}:(de(bt(y),"error"),{ok:!1})}}async function xt(p,_,y){let A=new Map,W=[],G=p.ops.slice(0,p.lane_op_index),oe=p.ops.slice(p.lane_op_index);for(let et of G){if(!await Me(et,y,A))return{done:!0};ye(et)}let be=_;for(let et of p.lane_ops){if(be===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let lt=await qe(et,be);if(!lt.ok)return lt.conflict?{done:!1,conflict:lt.conflict}:{done:!0};be=lt.revision}for(let et of oe){if(!await Me(et,y,A))return{done:!0};ye(et),et.type==="dep-add"&&W.push(et)}for(let et of up(W))be=await jt(et,be);return{done:!0}}async function jt(p,_){if(_===null||!o)return _;let y=p.pairs,A=_;for(let W=0;W<2;W+=1){if(y.length===0)return A;try{let G=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:y.map(oe=>({bead_id:oe.bead_id,after:oe.after,value:!0})),expected_revision:A});return G&&typeof G.revision=="number"?G.revision:A}catch(G){let oe=G,be=oe&&oe.code==="conflict"?oe.details?.cross_lanes:null;if(!be||typeof be.revision!="number"||!Array.isArray(be.lanes))return A;let et=be.lanes.find(lt=>lt&&lt.id===p.lane_id);y=dp(Array.isArray(et?.entries)?et.entries:[],y),A=be.revision}}return A}async function wt(p,_,y=[]){M=y,_e();let A=Z,W=hn();for(let G=0;;G+=1){let oe=p(Ye(A,W));if("refused"in oe){de(oe.refused,"error");break}let be=await xt(oe,A.cross_lanes_revision,_);if(be.done){oe.correction&&ke(oe.correction.lane_id,oe.correction.corrected);break}if(G>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}A=Ae(be.conflict),W=be.conflict}M=[],v()}async function Bt(p,_){await wt(y=>il(p,_,y),p.bead_id)}async function tn(p,_){if(p==="run"){await $n(_);return}if(p==="stop"){await Ut(_);return}if(p==="create"){await wt(y=>ll(null,y),"");return}if(p==="remove"){let y=cp(_,Ye());if(y!==null&&!g(y))return;await wt(A=>lp(_,A),"");return}await wt(y=>p==="confirm"?op(_,y):ap(_,y),"")}function ln(p){let _=new Map;for(let y of p.rows){let A=Z.owner_of[y.id]||y.root_dir;typeof A!="string"||A.length===0||_.set(A,[..._.get(A)||[],y.id])}return _}async function $n(p){let _=Z.chain_lanes.find(G=>G.lane_id===p);if(!_||Z.cross_lanes_revision===null){v();return}_e();let y=new Map,A=new Map,W=ln(_);for(let G of _.rows){if(!G.unplaced)continue;let oe=Z.owner_of[G.id]||G.root_dir;if(typeof oe!="string"||oe.length===0){de(`${G.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),v();return}let be=A.get(oe)??0;if(await C("worker-queue-place",{bead_id:G.id,lane:"parallel",index:(Z.parallel_raw_length[oe]??0)+be},oe,y,{bead_id:G.id})===null){v();return}A.set(oe,be+1)}for(let[G,oe]of W)if(await C("worker-queue-arm",{bead_ids:oe,lane_id:p},G,y,{bead_id:oe[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),v();return}v()}async function Ut(p){let _=Z.chain_lanes.find(A=>A.lane_id===p);if(!_||Z.cross_lanes_revision===null){v();return}_e();let y=new Map;for(let[A,W]of ln(_))if(await C("worker-queue-disarm",{lane_id:p},A,y,{bead_id:W[0]})===null)break;v()}async function Cn(p,_){let{root_dir:y,revision:A}=yt(p);if(y.length===0){v();return}await C("worker-queue-disarm",{bead_ids:[p],lane_id:_},y,new Map([[y,A]]),{bead_id:p}),v()}async function xn(p,_){let y=Ce.get(p);if(!y){v();return}let A={kind:"candidate",bead_id:p,root_dir:y.root_dir};if(_==="new-lane"){await wt(W=>ll({bead_id:p,root_dir:y.root_dir},W),p);return}if(_.startsWith("lane:")){let W=_.slice(5);if(!Z.chain_lanes.find(oe=>oe.lane_id===W)){v();return}await wt(oe=>il(A,{kind:"chain",lane_id:W,marker_index:(oe.cross_lanes.get(W)?.entries??[]).length},oe),p);return}if(_.startsWith("serial:")){let W=_.slice(7),G=(y.place_lanes||[]).find(oe=>oe.id===W);await Bt(A,{kind:"repo-serial",root_dir:y.root_dir,lane_id:W,index:G?G.index:0});return}await Bt(A,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function rr(p,_){let y=Z.parallel_rows,A=y.findIndex(lt=>lt.id===p);if(A<0)return;let W=y[A].root_dir,G=[];y.forEach((lt,rn)=>{lt.root_dir===W&&G.push(rn)});let oe=G.indexOf(A),be=G[oe+_];if(typeof be!="number")return;let et=_===-1?be:G[oe+2]??Math.min(y.length,be+1);await Bt({kind:"parallel",bead_id:p,root_dir:W,queue_index:y[A].queue_index??0},{kind:"parallel",marker_index:et})}async function E(p){for(let _ of Z.chain_lanes){let y=_.rows.find(A=>A.id===p);if(y){await Bt({kind:"chain",bead_id:p,root_dir:y.root_dir,lane_id:_.lane_id,...typeof y.queue_index=="number"?{queue_index:y.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let R=null,Be=!1,He=null;function at(){He!==null&&clearTimeout(He),He=setTimeout(()=>{He=null,Be=!1},0)}function Et(p,_){let y=_&&typeof _.closest=="function"?_.closest("[data-row-index]"):null;if(y&&p.contains(y)){let A=Number(y.getAttribute("data-row-index"));return Number.isFinite(A)?A:0}return p.querySelectorAll("[data-row-index]").length}function f(p){let _=p.target,y=typeof _?.closest=="function"?_.closest("[data-drop]"):null;if(!y||!R)return null;let A=y.getAttribute("data-drop");if(A==="candidate")return{zone:y,target:{kind:"candidate"}};if(A==="parallel")return{zone:y,target:{kind:"parallel",marker_index:Et(y,_)}};if(A==="chain")return{zone:y,target:{kind:"chain",lane_id:y.getAttribute("data-lane-id")||"",marker_index:Et(y,_)}};if(A==="repo-serial"){let W=y.getAttribute("data-root-dir")||"";if(W!==R.root_dir)return null;let G=typeof _?.closest=="function"?_.closest("[data-queue-index]"):null,oe=G&&y.contains(G)?G.getAttribute("data-queue-index"):y.getAttribute("data-lane-length"),be=Number(oe);return{zone:y,target:{kind:"repo-serial",root_dir:W,lane_id:y.getAttribute("data-lane-id")||"",index:Number.isFinite(be)?be:0}}}return null}function k(){for(let p of Array.from(Te.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}function j(p){let _=p.target,y=typeof _?.closest=="function"?_.closest('[draggable="true"][data-bead-id]'):null,A=y?y.closest("[data-drag-kind]"):null;if(!A)return;let W=A.getAttribute("data-bead-id")||"",G=A.getAttribute("data-drag-kind")||"",oe=A.getAttribute("data-root-dir")||"";if(!W||!G||!oe)return;let be=A.getAttribute("data-queue-index")||"",et=Number(be),lt=A.getAttribute("data-lane-id")||"";R={kind:G,bead_id:W,root_dir:oe,...be!==""&&Number.isFinite(et)?{queue_index:et}:{},...lt?{lane_id:lt}:{}},Be=!0,le=null,Te.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",W),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function fe(p){let _=f(p);_&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),_.zone.classList.add("is-drop-over"))}function Re(p){let _=p.target;typeof _?.closest=="function"&&_.closest("[data-drop]")?.classList.remove("is-drop-over")}function dt(){R=null,k(),Te.classList.remove("is-dragging"),at()}function Oe(p){let _=f(p),y=R;R=null,k(),Te.classList.remove("is-dragging"),!(!_||!y)&&(p.preventDefault(),Bt(y,_.target))}function x(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function se(p,_){let{item:y,root_dir:A,revision:W}=yt(_),G=y?.attempt_id||"",oe=p.classList;if(oe.contains("mon2-rowops__up")||oe.contains("mon2-rowops__down")){rr(_,oe.contains("mon2-rowops__up")?-1:1);return}if(oe.contains("mon2-rowops__remove")){ue("worker-queue-remove",{bead_id:_},A,W);return}if(oe.contains("mon2-crow__detach")){E(_);return}if(oe.contains("mon-dep__btn")){en(_);return}if(oe.contains("worker-dep__open")){en(_);return}if(oe.contains("mon2-arm__release")){Cn(_,p.getAttribute("data-lane-id")||"");return}if(oe.contains("mon-lane__chip")){let be=p.getAttribute("data-lane-id")||"";Te.querySelector(`.mon2-clane[data-lane-id="${be}"]`)?.scrollIntoView({block:"nearest"});return}if(oe.contains("mon-deppanel__unlink")){let be=p.getAttribute("data-dep-a")||"",et=p.getAttribute("data-dep-b")||"";g(`${et}\uAC00 ${be}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Qt("dep-remove",be,et);return}if(oe.contains("mon-deppanel__cand")){let be=p.getAttribute("data-dep-cand")||"";N&&be&&Qt("dep-add",N.bead_id,be);return}if(oe.contains("mon-overlap__chip")){let be=p.getAttribute("data-overlap-id")||"";V=!!V&&V.bead_id===_&&V.counterpart_id===be?null:{bead_id:_,counterpart_id:be},v();return}if(oe.contains("mon-overlap__place")){ze(_,p.getAttribute("data-counterpart-id")||"");return}if(oe.contains("worker-card__place")){le=le===_?null:_,v();return}if(oe.contains("worker-card__place-cancel")){le=null,v();return}if(oe.contains("worker-card__place-lane")){let be=p.getAttribute("data-lane")||"parallel";le=null,xn(_,be);return}if(oe.contains("rtile__session")){if(y&&y.kind==="session"){let be=(y.session_refs||[]).find(et=>et&&et.current===!0);be&&(Pe.hidden=!1,Ze.open(Hr(be,_,"in_progress",A)),v());return}Y=G,G&&y&&(Pe.hidden=!1,Ze.open({attempt_id:G,root_dir:A,meta:x(y)})),v();return}if(oe.contains("rtile__pause")){ct("worker-attempt-pause",{attempt_id:G},A);return}if(oe.contains("rtile__resume")){zr().then(be=>{if(be!==null)return mt("worker-attempt-resume",{attempt_id:G,...be!==""?{instructions:be}:{}},A,W)});return}if(oe.contains("rtile__dismiss")){ue("worker-attempt-dismiss",{attempt_id:G},A,W);return}if(oe.contains("rtile__discard")){if(!g(Ns(_,"unmerged")))return;$t({bead_id:_,...G?{attempt_id:G}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},A,W);return}if(oe.contains("worker-mini__merge")){let be=Ue(A,_);be?.mismatch&&be.continuation===null?At(A,_,W,be.mismatch):ue("worker-merge-queue-add",{bead_id:_},A,W);return}if(oe.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:_},A,W);return}if(oe.contains("worker-mini__discard")){let be=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Ns(_,be)))return;$t({bead_id:_,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},A,W);return}if(oe.contains("worker-mini__revise-fix")){mt("worker-revise-fix",{bead_id:_},A,W);return}oe.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:_},A,W)}function F(p){let _=Be;Be=!1;let y=p.target;if(!y||typeof y.closest!="function"||y.closest("dialog")||y.closest(".worker-drawer-overlay")||y.closest("a"))return;let A=y.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(A){p.preventDefault();let An=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||A.textContent?.trim()||"";An&&Ot(An);return}let W=y.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(W){p.preventDefault();let pn=W.getAttribute("data-root-dir")||Ce.get(y.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||W.getAttribute("title")||"";he(pn);return}let G=y.closest(".mon2-sec__toggle");if(G){p.preventDefault(),Ie(G.getAttribute("data-root-dir")||"");return}let oe=y.closest(".mon2-area__toggle");if(oe){p.preventDefault(),Qe(oe.getAttribute("data-area")||"parallel");return}if(y.closest(".mon2-newlane")){p.preventDefault(),tn("create","");return}let be=y.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(be){p.preventDefault();let pn=be.getAttribute("data-lane-id")||"",An=be.classList;tn(An.contains("mon2-clane__confirm")?"confirm":An.contains("mon2-clane__reapply")?"reapply":An.contains("mon2-clane__run")?"run":An.contains("mon2-clane__stop")?"stop":"remove",pn);return}if(y.closest(".mon-merge-all")){p.preventDefault(),T();return}let et=y.closest(".mon-filter__spec");if(et){p.preventDefault(),w={...w,spec:et.getAttribute("data-spec")||"all"},Ip(w),v();return}let lt=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!lt)return;let rn=lt.getAttribute("data-bead-id")||"",Mt=y.closest("button");if(Mt){p.preventDefault(),se(Mt,rn);return}rn&&!_&&(p.preventDefault(),je(rn,lt.getAttribute("data-root-dir")||yt(rn).root_dir))}function Ee(p){let _=p.target;if(!_||typeof _.closest!="function")return;let y=_.closest(".mon-filter__blocked");if(y){w={...w,show_blocked:y.checked},Ip(w),v();return}let A=_.closest(".mon-candidate-sort");if(A){D=Zs.some(oe=>oe.value===A.value)?A.value:"repo_spec",oy(D),v();return}let W=_.closest(".mon-running-sort");if(W){b=W.value==="repo"?"repo":"started",uy(b),v();return}let G=_.closest(".mon-done-range");G&&(h=Wn(G.value),ly(h),v())}function pt(p){let _=p.target,y=_&&typeof _.closest=="function"?W=>_.closest(W):()=>null,A=!1;V&&!y(".mon-overlap__popover, .mon-overlap__chip")&&(V=null,A=!0),N&&!y(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(N=null,A=!0),A&&v()}function Xe(p){p.key!=="Escape"||!V&&!N||(V=null,N=null,v())}function vt(p){let _=p.target;!_||typeof _.closest!="function"||!_.closest(".mon-deppanel__search")||!N||(N={...N,query:_.value},v())}e.addEventListener("click",F),e.addEventListener("change",Ee),e.addEventListener("input",vt),document.addEventListener("click",pt),document.addEventListener("keydown",Xe),e.addEventListener("dragstart",j),e.addEventListener("dragover",fe),e.addEventListener("dragleave",Re),e.addEventListener("drop",Oe),e.addEventListener("dragend",dt),s&&typeof s.subscribe=="function"&&(ne=s.subscribe(()=>{try{z.clear(),v()}catch{}}));function it(){ge!==null&&(clearInterval(ge),ge=null)}function Tt(){He!==null&&(clearTimeout(He),He=null)}return{load(){n("load"),v(),ge===null&&(ge=setInterval(()=>{try{v()}catch{}},dy))},pause(){it()},clear(){it(),Tt(),ne&&(ne(),ne=null),Ze.destroy(),Pe.hidden=!0,Se?.destroy(),Se=null,e.removeEventListener("click",F),e.removeEventListener("change",Ee),e.removeEventListener("input",vt),document.removeEventListener("click",pt),document.removeEventListener("keydown",Xe),e.removeEventListener("dragstart",j),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",Re),e.removeEventListener("drop",Oe),e.removeEventListener("dragend",dt),e.replaceChildren()}}}function Wp(e,t,n){let r=Gt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let w=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",w),n.gotoView(w)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function g(){s&&st(u(),s),o&&st(d(),o)}return g(),a=t.subscribe(()=>g()),{destroy(){a&&(a(),a=null),s&&st(c``,s),o&&st(c``,o)}}}var zp=["bug","feature","task","epic","chore"];function Hp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Gp=["Critical","High","Medium","Low","Backlog"];function Kp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let M=document.createElement("option");M.value="",M.textContent="\u2014 Select \u2014",o.appendChild(M);for(let K of zp){let L=document.createElement("option");L.value=K,L.textContent=Hp(K),o.appendChild(L)}a.replaceChildren();for(let K=0;K<=4;K+=1){let L=document.createElement("option");L.value=String(K);let I=Gp[K]||"Medium";L.textContent=`${K} \u2013 ${I}`,a.appendChild(L)}}b();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(M){s.disabled=M,o.disabled=M,a.disabled=M,i.disabled=M,l.disabled=M,d.disabled=M,g.disabled=M,g.textContent=M?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(M){u.textContent=M}function le(){try{let M=window.localStorage.getItem("beads-ui.new.type");M?o.value=M:o.value="";let K=window.localStorage.getItem("beads-ui.new.priority");K&&/^\d$/.test(K)?a.value=K:a.value="2"}catch{o.value="",a.value="2"}}function V(){let M=o.value||"",K=a.value||"";M.length>0&&window.localStorage.setItem("beads-ui.new.type",M),K.length>0&&window.localStorage.setItem("beads-ui.new.priority",K)}async function N(){B();let M=String(s.value||"").trim();if(M.length===0){Y("Title is required"),s.focus();return}let K=Number(a.value||"2");if(!(K>=0&&K<=4)){Y("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),I=String(l.value||""),te={title:M};L.length>0&&(te.type=L),String(K).length>0&&(te.priority=K),I.length>0&&(te.description=I),D(!0);try{await t("create-issue",te)}catch{D(!1),Y("Failed to create issue");return}V(),D(!1),w()}return n.addEventListener("cancel",M=>{M.preventDefault(),w()}),h.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",M=>{M.key==="Enter"&&(M.ctrlKey||M.metaKey)&&(M.preventDefault(),N())}),r.addEventListener("submit",M=>{M.preventDefault(),N()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var _y=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function my(e,t){return si(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Vp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=my(r,e);return c`<button
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
  `}function Yp(e,t,n){return c`
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
  `}function Zp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${_y.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var gy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Qp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ae=>de(ae,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function g(){if(d)return d;let ae=a.querySelector('[data-pane="execution"]');return ae?(d=ka(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function h(){return c`
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
    `}function b(){let ae=r.get();return c`
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
        ${ae?c`
              ${Vp(ae,s(),Y)}
              ${Yp(ae,u,{onDraft:Te=>{u=Te},onAdd:le,onRemove:V})}
              ${Zp(ae,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(ae){let Te=r.get();if(Te)try{let Pe=await n("display-policy-set",{expected_revision:Te.revision,policy:ae(Te)});D(Pe),Pe&&Pe.conflict&&Pe.policy&&(Pe=await n("display-policy-set",{expected_revision:Pe.policy.revision,policy:ae(Pe.policy)}),D(Pe)),Pe&&Pe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(ae){ae&&ae.policy&&typeof ae.policy=="object"&&r.set(ae.policy)}function B(ae){w(ae)}function Y(ae){let Te=r.get();if(!Te)return;let Pe=!by(ae,Te);B($e=>hy(ae,$e,Pe))}function le(){let ae=u.trim();ae.length!==0&&(u="",B(Te=>Te.hidden_prefixes.includes(ae)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,ae]}),M())}function V(ae){B(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(Pe=>Pe!==ae)}))}function N(ae){let Te=r.get();if(!Te)return;let Pe=Te.chips[ae]===!1;B(()=>({chips:{[ae]:Pe}}))}function M(){st(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${gy.map(ae=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(i===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>K(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
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
      `,a),g()}function K(ae){i=ae,M()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let I=ae=>{ae.target===a&&_e()};a.addEventListener("click",I);let te=null;r.subscribe&&(te=r.subscribe(()=>{l&&M()}));let xe=null;t.implPresetStore?.subscribe&&(xe=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function ke(ae="execution"){l||(l=!0,t.onOpenChange?.(!0),i=ae,u="",M(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),g()?.load())}function _e(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ke,close:_e,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",I),te&&(te(),te=null),xe&&(xe(),xe=null),d?.destroy(),d=null,a.remove()}}}function by(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function hy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var yy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Xp="usage-meter-card",vy="usage-meter-layer",bl=600,wy=["token_expired","relogin_required"];function Jp(e){return String(e).padStart(2,"0")}function ky(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ef(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Jp(r.getHours())}:${Jp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${yy[r.getMonth()]} ${r.getDate()} ${o}`;return`${ky(n,t)} \xB7 ${i}`}function $y(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function tf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function nf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var rf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function of(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function xy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:of(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Ay(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=xy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?of(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Sy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Ay(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function af(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Ey(e,t){return!e.held||af(e,t)<=bl?e:{...e,available:!1,windows:[],accounts:[]}}function sf(e,t){return`${e}:${t}`}function lf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){st(c``,e),e.hidden=!0,g()}function d(){if(l===null){let $e=e.ownerDocument;l=$e.createElement("div"),l.id=vy,l.className="usage-meter__layer",$e.body.appendChild(l)}return l}function g(){l!==null&&(st(c``,l),l.remove(),l=null)}function h($e){n!==$e&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",B),window.addEventListener("resize",D)),n=$e)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",B),window.removeEventListener("resize",D))}function w($e){let ee=$e.target;ee&&(e.contains(ee)||l!==null&&l.contains(ee))||(b(),_e())}function D(){_e()}function B($e){$e.key==="Escape"&&(b(),_e())}function Y($e){n===$e?b():h($e),_e()}function le(){b(),_e()}async function V($e,ee){if(r.has($e.key))return;let Z=sf($e.key,ee);r.set($e.key,ee),a.delete(Z),_e();let Ce=null;try{Ce=await(await fetch($e.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Ce=null}if(t)return;if(r.delete($e.key),!Ce||Ce.ok!==!0){let ne=Ce&&typeof Ce.error=="string"&&Ce.error.length>0?Ce.error:"network_error";a.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),_e();return}let z=Array.isArray(Ce.warnings)?Ce.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];z.length>0&&a.set(Z,{kind:"warn",text:z.join(" \xB7 ")}),_e(),await Pe()}function N($e,ee,Z,Ce){let z=nf($e.pct),ge=`resets ${ef($e.resetsAt,Ce)}${ee?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${tf(z)}"
      style=${`--progress: ${z}%`}
      title=${ge}
    >
      <span class="usage-meter__label">${$e.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${z}%</span>
    </span>`}function M($e,ee,Z){let Ce=af(ee,Z),z=ee.available&&(ee.held||Ce>bl),ne=z?`${Math.floor(Ce/60)}\uBD84 \uC804 \uCE21\uC815`:"",ge=ee.accounts.filter(Ue=>!Ue.active).length,Se=`usage-meter__group${z?" usage-meter__group--stale":""}`,Ze=c`<span class="usage-meter__provider"
        >${$e.label}</span
      >
      ${ee.available?ee.windows.map(Ue=>N(Ue,z,ne,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ge>0?c`<span class="usage-meter__badge">+${ge}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${Se}
        aria-label=${`${$e.label} usage`}
        >${Ze}</span
      >`;let ue=n===$e.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${$e.label} usage`}
      aria-expanded=${ue?"true":"false"}
      aria-controls=${Xp}
      @click=${()=>Y($e.key)}
    >
      ${Ze}
    </button>`}function K($e,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${$e.map(Z=>M(Z.provider,Z.snapshot,ee))}
    </span>`}function L($e,ee){let Z=nf($e.pct),Ce=ef($e.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${tf(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${$e.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${Ce.length>0?`\u21BB ${Ce}`:""}</span
      >
    </span>`}function I($e,ee){return wy.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${$e.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te($e,ee,Z){let Ce=ee.status==="ok",z=typeof ee.ageSeconds=="number"&&ee.ageSeconds>bl,ne=a.get(sf($e.key,ee.number)),ge=r.get($e.key),Se=ge!==void 0,Ze=ge===ee.number,ue=["usage-meter__account"];return ee.active&&ue.push("usage-meter__account--active"),Ce||ue.push("usage-meter__account--unavailable"),z&&ue.push("usage-meter__account--stale"),c`<div class=${ue.join(" ")}>
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
              >${$y(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Se}
              @click=${()=>{V($e,ee.number)}}
            >
              ${Ze?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ce?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Ue=>L(Ue,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${I($e,ee.status)}
          </div>`}
      ${ne===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function xe($e,ee,Z){let Ce=ee.accounts.filter(z=>z.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${$e.label} · 활성 ${Ce} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(z=>te($e,z,Z))}
    </section>`}function ke($e,ee){return c`<div
      class="usage-meter__card"
      id=${Xp}
      role="dialog"
      aria-label=${`${$e.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${xe($e.provider,$e.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function _e(){let $e=Date.now(),ee=[];for(let Ce of rf){let z=o.get(Ce.key);z&&ee.push({provider:Ce,snapshot:Ey(z,$e)})}if(ee.length===0){b(),u();return}let Z=ee.find(Ce=>Ce.provider.key===n&&Ce.snapshot.accounts.length>0);Z||b(),st(K(ee,$e),e),e.hidden=!1,Z?ae(Z,$e):g()}function ae($e,ee){let Z=d(),Ce=e.getBoundingClientRect(),z=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${Ce.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,z-Ce.right)}px`),st(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${ke($e,ee)}`,Z)}async function Te($e){try{let ee=await fetch($e.endpoint);return ee.ok?Sy(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Pe(){i+=1;let $e=i,ee=await Promise.all(rf.map(async Z=>({provider:Z,read:await Te(Z)})));if(!(t||$e!==i)){for(let Z of ee){let Ce=Z.provider.key;if(Z.read.kind==="ok"){o.set(Ce,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(Ce);continue}let z=o.get(Ce);z!==void 0&&!z.held&&o.set(Ce,{...z,held:!0})}_e()}}return u(),Pe(),s=setInterval(()=>{Pe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function cf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Ty="worker-ineligible";function Qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function uf(e){return Qs(e).includes(Ty)}var Cy="session-preferred",Ry=["exclusive_machine"];function df(e,t){if(!Qs(e).includes(Cy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Ry.includes(n)?n:""}var Oy="worker-serial";function hl(e){return Qs(e).includes(Oy)}function yl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Ly=new Set(["done","failed","orphaned","stopped","discarded"]),Iy={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Py={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},My={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function vl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:My[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function pf(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,g=null,h=null,b=null,w=new Set,D=!1,B=0,Y=null,le=new Set;function V(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function N(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function M(){return o&&o()||""}async function K(){if(!s)return;let $=++B;D=!0,b=null,w.clear(),Je();try{let O=await s("worker-parallel-analysis-targets",{root_dir:M()});if($!==B||!Ne)return;let X=Array.isArray(O?.qualified)?O.qualified:[],me=Array.isArray(O?.excluded)?O.excluded:[];b={qualified:X,excluded:me};for(let Ae of X)Ae&&typeof Ae.id=="string"&&w.add(Ae.id)}catch{$===B&&Ne&&(b={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{$===B&&(D=!1,Ne&&Je())}}function L($){return Array.isArray($.runs)?$.runs:[]}function I(){let $=V(),O=new Set;for(let X of Object.values($.attempts||{})){let me=X;me&&typeof me.bead_id=="string"&&!Ly.has(me.status)&&O.add(me.bead_id)}for(let X of Array.isArray($.pr_wait)?$.pr_wait:[])X&&typeof X.bead_id=="string"&&O.add(X.bead_id);for(let X of Object.values($.discard_operations||{})){let me=X;me&&me.phase!=="done"&&typeof me.bead_id=="string"&&O.add(me.bead_id)}return O}function te($){return $.filter(O=>xe(O)===null)}function xe($){let O=V();for(let X of Array.isArray(O.serial_lanes)?O.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(me=>me.bead_id===$))return X.id;return(Array.isArray(O.queue)?O.queue:[]).some(X=>X.bead_id===$)?"parallel":null}function ke($,O){let X=l.get($);return X||[...O.order]}function _e($){if($.length<2)return!1;let O=xe($[0]);if(!O||O==="parallel")return!1;let X=V(),me=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(v=>v.id===O)?.entries.map(v=>v.bead_id);if(!Array.isArray(me))return!1;let Ae=$.map(v=>me.indexOf(v));return Ae.every(v=>v>=0)&&Ae.every((v,U)=>U===0||v>Ae[U-1])}function ae(){let $=V(),O=Array.isArray($.serial_lanes)?$.serial_lanes:[],X=O.find(me=>Array.isArray(me.entries)&&me.entries.length===0);return X?X.id:O[0]?.id||"s1"}function Te($){let O=V().bead_titles||{};return typeof O[$]=="string"?O[$]:$}async function Pe($,O){if(!s||d)return null;d=!0,Je();try{return await s($,O)}finally{d=!1,Je()}}async function $e($){r?.setPending?.(!0);try{let O=await Pe("worker-parallel-analysis-start",{force:$,target_ids:Array.from(w)});O&&O.applied===!1&&O.reason&&(O.reason==="target_not_qualified"&&Array.isArray(O.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${O.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${O.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ee(){let $=N().job;!s||!$||await s("worker-parallel-analysis-cancel",{job_id:$.job_id})}async function Z($){if(!(!s||le.has($))){le.add($),Je();try{let O=await s("worker-parallel-analysis-prompt",{root_dir:M(),run_id:$});if(!Ne)return;if(O?.ok===!0&&typeof O.prompt=="string"){Y={run_id:$,prompt:O.prompt};return}de(O?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete($),Je()}}}function Ce(){Y=null,Je()}async function z(){if(!Y)return;let $=await Sn(Y.prompt);de($?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",$?"success":"error",1400)}function ne($,O){a&&a($,vl(O))}function ge(){return V().runner_catalog}function Se($){return Object.keys(ge()?.runners?.[$]?.models||{})}function Ze($){let O=Se($),X=ge()?.runners?.[$]?.default_model;return typeof X=="string"&&O.includes(X)?X:O[0]||""}function ue(){let $=N().settings,O=g||$.runner||"claude",X=Se(O),me=g?Ze(O):$.model||X[0]||"",Ae=yl(ge(),O,me),v=$.effort||"",U=Ae.includes(v)?v:Ae[0]||"";return{runner:O,model:me,effort:U,models:X,efforts:Ae}}async function Ue($){let O=N().settings,X=await Pe("worker-parallel-analysis-settings-update",{expected_revision:O.revision,runner:$.runner,model:$.model,effort:$.effort});(!X||X.applied!==!0)&&(g=null,Je(),X&&X.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function mt($){g=$,Je();let O=ue();Ue({runner:$,model:O.model,effort:O.effort})}function At($){let O=ue(),X=yl(ge(),O.runner,$);Ue({runner:O.runner,model:$,effort:X.includes(O.effort)?O.effort:X[0]||""})}function $t($){let O=ue();Ue({runner:O.runner,model:O.model,effort:$})}async function ct($,O){if(!s||d)return;let X=ke($,O),me=N();if(X.length<2||!me.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ae=u.get($)||ae(),v=()=>({snapshot_digest:me.last_good.identity_digest,group_index:$,lane:Ae,ordered_bead_ids:X,expected_revision:V().revision});d=!0,Je();try{let U=await s("worker-parallel-analysis-submit",v());U&&U.queue&&n&&n.set(U.queue),U&&U.applied!==!0&&U.conflict===!0&&(U=await s("worker-parallel-analysis-submit",v()),U&&U.queue&&n&&n.set(U.queue)),U&&U.applied===!0?(l.delete($),de(`\uC9C1\uB82C \uB808\uC778 ${Ae}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${U?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Je()}}function T($,O,X){l.set($,ke($,O).filter(me=>me!==X)),Je()}function ce($){l.delete($),Je()}function Ie($,O,X,me){let Ae=[...ke($,O)],v=Ae.indexOf(X),U=v+me;v<0||U<0||U>=Ae.length||(Ae.splice(U,0,...Ae.splice(v,1)),l.set($,Ae),Je())}function De(){let $=N().settings,O=Object.keys(ge()?.runners||{}),X=ue();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${me=>mt(me.target.value)}
        >
          ${O.map(me=>c`<option
                value=${me}
                ?selected=${X.runner===me}
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
          @change=${me=>At(me.target.value)}
        >
          ${X.models.map(me=>c`<option
                value=${me}
                ?selected=${X.model===me}
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
          @change=${me=>$t(me.target.value)}
        >
          ${X.efforts.map(me=>c`<option
                value=${me}
                ?selected=${X.effort===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      ${Qe($)}
    </div>`}function Qe($){return!gt($)||rt($)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:$.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${$.runner}/${$.model} · effort
        ${$.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:$.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function rt($){return $.is_default===!0&&$.compatible===!1}function gt($){return!!($.runner&&$.model&&$.effort)}function ht($){return gt($)&&$.compatible!==!1}function re($){let O=Math.max(0,Math.floor($/1e3)),X=Math.floor(O/60),me=O%60;return`${X}:${String(me).padStart(2,"0")}`}function Q($){let O=$.job;if(O){let X=typeof O.started_at=="number"?O.started_at:0,me=`${O.runner||"?"}/${O.model||"?"}`,Ae=X?` \xB7 \uACBD\uACFC ${re(Date.now()-X)}`:"",v=typeof O.session_id=="string"?O.session_id:"",U=L($).find(ie=>ie.run_id===O.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${me} · effort ${O.effort||"?"}${Ae}</span
        >
        ${v?c`<code class="pa-session-id" title=${v}
              >${v.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ne(O.job_id,U||O)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${U?.prompt_saved!==!0||le.has(O.job_id)}
          @click=${()=>{Z(O.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ot()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Fe($){let O=Q($);return O===""?"":c`<div class="pa__strip">${O}</div>`}function ot(){return r?.isPending?.()===!0}function ze($){let O=!!$.job,X=ht($.settings),me=b!==null&&w.size===0,Ae=O||d||ot()||D;return c`<div class="pa-meta">
      ${$.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date($.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!X||Ae||me}
        @click=${()=>{$e(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!X||Ae||me}
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
    </div>`}function we($){return typeof $=="string"&&$.length>0?$:"\uBBF8\uBC30\uCE58"}function Ke($,O){O?w.add($):w.delete($),Je()}function ut($){let O=Array.isArray($.scope)?$.scope:[],X=Array.isArray($.overlaps)?$.overlaps:[];return O.length===0&&X.length===0?c``:c`<span class="pa-target__signals">
      ${O.length>0?c`<details class="pa-target__scope" title=${O.join(`
`)}>
            <summary>scope ${O.length}</summary>
            <ul>
              ${O.map(me=>c`<li><code>${me}</code></li>`)}
            </ul>
          </details>`:""}
      ${X.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${X.join(", ")}`}
            >겹침 ${X.join(", ")}</span
          >`:""}
    </span>`}function ft(){let $=b?.qualified||[],O=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${D?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${$.length} \xB7 \uC81C\uC678 ${O.length}`}</span
        >
      </header>
      ${b&&$.length>0?c`<ul class="pa-targets__list">
            ${$.map(X=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${X.id}
                      .checked=${w.has(X.id)}
                      @change=${me=>Ke(X.id,me.target.checked)}
                    />
                    <span class="pa-target__title">${X.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ut(X)}
                    <span class="pa-target__route">${X.route}</span>
                    <span class="pa-target__lane"
                      >${we(X.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&$.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&O.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${O.length}</summary>
            <ul class="pa-targets__list">
              ${O.map(X=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${X.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Iy[X.reason]||X.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${we(X.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function _t($){let O=typeof $.session_id=="string"&&$.session_id.length>0,X=O?$.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${$.outcome}"
        >${Py[$.outcome]||$.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date($.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${$.runner||"?"} / ${$.model||"?"} / ${$.effort||"?"}</span
      >
      ${O?c`<code class="pa-session-id" title=${X}
            >${X.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${$.outcome==="failure"&&$.reason?c`<span class="pa-run-row__reason">${$.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ne($.run_id,$)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${$.prompt_saved!==!0||le.has($.run_id)}
          @click=${()=>{Z($.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Pt($){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${$.length>0?c`<ul class="pa-runs__list">
            ${$.map(O=>_t(O))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Kt(){return Y?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Ce}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{z()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Ce}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function Ht($,O){let X=ke($,O),me=I(),Ae=X.filter(he=>me.has(he)),v=te(X),U=_e(X),ie=Array.isArray(V().serial_lanes)?V().serial_lanes:[],Ve=u.get($)||ae(),je=O.eligible!==!0||X.length<2||Ae.length>0||v.length>0||U||d;return c`<section class="pa-group" data-group-index=${String($)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${O.confidence}</span>
        ${O.categories.map(he=>c`<span class="pa-group__category">${he}</span>`)}
        ${U?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${O.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${v.length>0?c`<span class="pa-group__stale"
              >stale — ${v.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${O.reason}</p>
      <ol class="pa-group__members">
        ${X.map((he,Ot)=>c`<li class="pa-member" data-bead-id=${he}>
              <span class="pa-member__seq">${Ot+1}</span>
              <span class="pa-member__title">${Te(he)}</span>
              ${me.has(he)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${he}
                ?disabled=${Ot===0}
                aria-label=${`${he} \uC704\uB85C`}
                @click=${()=>Ie($,O,he,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${he}
                ?disabled=${Ot===X.length-1}
                aria-label=${`${he} \uC544\uB798\uB85C`}
                @click=${()=>Ie($,O,he,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${he}
                aria-label=${`${he} \uC81C\uC678`}
                @click=${()=>T($,O,he)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${O.evidence.map(he=>c`<li class="pa-evidence">
              <code>${he.path}</code>
              <span class="pa-evidence__locator">${he.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ce($)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${he=>{u.set($,he.target.value),Je()}}
          >
            ${ie.map((he,Ot)=>c`<option
                  value=${he.id}
                  ?selected=${Ve===he.id}
                >
                  직렬 ${Ot+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${je}
          @click=${()=>{ct($,O)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Rt($){let O=Array.isArray($.issues)?$.issues:[],X=O.filter(Ae=>Ae.verdict==="parallel_ok").length,me=O.filter(Ae=>Ae.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${X}</span>
      <span>uncertain ${me}</span>
    </div>`}function Lt(){let $=Ne&&!!N().job;if($&&h===null){h=setInterval(()=>Je(),1e3);return}!$&&h!==null&&(clearInterval(h),h=null)}function Je(){let $=N();g&&$.settings.runner===g&&(g=null);let O=$.last_good?.result;Lt(),st(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Le}
            >
              ×
            </button>
          </header>
          ${Fe($)}
          <div class="pa__body">
            ${De()} ${ze($)} ${ft()}
            ${O?c`${O.groups.map((X,me)=>Ht(me,X))}
                ${O.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Rt(O)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Pt(L($))}
          </div>
        </div>
        ${Kt()}
      `,i)}let Ne=!1,P=()=>{Ne=!1,Y=null,B+=1,Lt()},J=$=>{$.target===$.currentTarget&&Le()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",J);let ve=null;n&&n.subscribe&&(ve=n.subscribe(()=>{Ne&&Je()}));let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{Ne&&Je()}));function H(){Ne||(Ne=!0,Je(),K(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Le(){Ne&&(Ne=!1,Y=null,B+=1,Lt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Le,destroy(){Ne=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",J),ve&&(ve(),ve=null),S&&(S(),S=null),i.remove()}}}var ff=new Set(["sh","bash","zsh","dash","ksh"]),_f=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function mf(e){let t=e.split("/");return t[t.length-1]||""}function Dy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=mf(n[0]);if(r!=="env")return ff.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&ff.has(mf(s))}function Ny(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function qy(e){let t=[],n=0;_f.lastIndex=0;for(let r of e.matchAll(_f)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Ny(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Fy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function gf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function g(M,K){return K?qy(M).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):M}function h(){if(!s)return c``;let M=o==="ready"&&Dy(a),K=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
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
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${K.map((L,I)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${I+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(L,M)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){st(h(),r)}async function w(){if(o!=="ready")return;let M=await Sn(a);de(M?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",M?"success":"error")}function D(M){M.key==="Escape"&&s&&(M.preventDefault(),V())}function B(){d||(document.addEventListener("keydown",D),d=!0)}function Y(){d&&(document.removeEventListener("keydown",D),d=!1)}async function le(M,K=null){let L=++l;B(),s={...M},u=K||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let xe="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(M.lane)+"&base_sha="+encodeURIComponent(M.base_sha);try{let ke=await n(xe),_e=await ke.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==te){V();return}if(!ke.ok||!_e||_e.ok!==!0){o="error",i=Fy(_e&&typeof _e.error=="string"?_e.error:""),b();return}s={lane:_e.lane,base_sha:_e.base_sha,path:_e.path,base_ref:_e.base_ref},a=String(_e.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function V(){l+=1,Y(),s=null,a="",b();let M=u;u=null,M?.isConnected&&M.focus()}function N(){V(),r.remove()}return{open:le,close:V,destroy:N}}function bf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${I}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let I=L/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function g(L){let I=d(L);return I?u("config",I):""}function h(L,I,te){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${te.script}
      @click=${xe=>{s&&s({lane:L,base_sha:I.base_sha,path:te.script,base_ref:I.base_ref},xe.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function w(L,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${te=>{le(L,!te.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function D(L){let I=typeof L.base_sha=="string"?L.base_sha:"",te=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,xe=b(),ke=!!L.verify&&xe.verify,_e=!!L.deploy&&xe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${te}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${h("verify",L,L.verify)}
              ${g(L.verify.timeout_ms)}
              ${ke?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${L.verify?w("verify",xe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${h("deploy",L,L.deploy)}
              ${g(L.deploy.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${L.deploy?w("deploy",xe.deploy):""}
      </div>
    </section>`}function B(L){let I=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?D(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Y(L){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(I),I&&I.conflict){let te=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(te)}r()}async function le(L,I){if(!n)return;let te=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});if(i(te),te&&te.conflict){let xe=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});i(xe)}r()}let V={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function N(L,I,te){return c`<div class="worker-repo-ops__policy-group" data-policy=${te}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(xe=>c`<li data-token=${xe}>
              ${V[xe]||xe}
            </li>`)}
      </ul>
    </div>`}function M(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(I=>{let te=[V[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?te.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?te.push(`${V[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&te.push(`${I.sessions_per_user_action}\uD68C`,V[I.user_actions]||I.user_actions),I.applies_when&&te.push(V[I.applies_when]||I.applies_when),c`<li data-token=${I.id}>
            <strong>${V[I.id]||I.id}</strong>
            <span>${te.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function K(){let L=o(),I=L.auto_repair!==!1,te=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,xe=Array.isArray(L.repo_operations)?L.repo_operations:[],ke=xe.find(Pe=>Pe.state==="repairing"),_e=xe.filter(Pe=>Pe.state==="failed"||Pe.state==="repairing"),ae=_e.length?Math.min(..._e.map(Pe=>typeof Pe.repair?.remaining=="number"?Pe.repair.remaining:0)):te?.auto_repair?.resolution_ladder?.find(Pe=>Pe.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(te?.auto_repair?.resolution_ladder)?te.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${Pe=>{Y(Pe.target.checked)}}
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
          >남은 자동 해결 ${ae}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ke?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ke.repair?.owner_bead||ke.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${te?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(te.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(te.never_automatic||[]).length}</span
              >
            </summary>
            ${N("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",te.worker_automatic||[],"worker-automatic")}
            ${te.supported===!1||te.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${te.schema_version})`}
                </div>`:M(Te)}
            ${N("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",te.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(l())} ${K()}
      </details>`}}}var wf=20,jy=5,By=new Set(["failed","repairing","running","queued","retry_pending"]),hf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},yf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Uy(e,t,n=wf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Wy(e){if(e.type==="cleanup")return!0;let t=e.operation;return By.has(t.state)&&!t.dismissed&&!t.superseded_by}function zy(e,t,n={}){let r=Uy(e,t,1/0),s=n.expanded===!0?wf:jy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Wy(i));return{visible:a,hidden:r.length-a.length}}function vf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Hy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function $f(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Gy(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(yf,r)?yf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Ky(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${pa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${vf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(hf,t.kind)?hf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ca(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ds(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${vf(e)}"
          >${Hy(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?$f(Wd(t.failure_kind,r)):""}
      ${Gy(t)}
      ${kf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ca(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Vy(e){let t=e.cleanup,n=Cr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${pa(e.at)||"\u2014"}</span
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
        ${hp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${$f(va(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${kf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Yy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Vy(r):Ky(r))}
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
  </section>`}function xf(e,t={}){let n=null;function r(){if(n===null){st(c``,e);return}let a=zy(n.operations,n.cleanup_failures,{expanded:n.expanded});st(Yy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Zy=Gt("views:worker"),Qy="tab:worker:ready",Xy="tab:worker:blocked",Jy="tab:worker:in-progress",ev="tab:worker:resolved",tv="tab:worker:closed",Oa=1,Af=5;function Sf(e){return Ts(e).evidence==="published"}var nv=new Set(["quick_fix","spec_backed","full_plan"]);function Ef(e){return typeof e=="string"&&nv.has(e)}var Of="beads-ui.worker.candidate-filter",wl={show_blocked:!1,spec:"all"};function rv(){try{let e=window.localStorage.getItem(Of);if(!e)return{...wl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...wl}}}function sv(e){try{window.localStorage.setItem(Of,JSON.stringify(e))}catch{}}function ov(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var av=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Lf="bdui.worker.candidate_sort",If=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],$l="spec";function Pf(e){return If.some(t=>t.value===e)?e:$l}function iv(){try{return Pf(window.localStorage.getItem(Lf))}catch{return $l}}function lv(e){try{window.localStorage.setItem(Lf,e)}catch{}}var Mf="bdui.worker.done-range";function cv(){try{let e=window.localStorage.getItem(Mf);return e===null?"today":Wn(e)}catch{return"today"}}function uv(e){try{window.localStorage.setItem(Mf,e)}catch{}}var dv="(max-width: 640px)",Df="beads-ui.worker.lane-collapsed",Xs={queue:!0,done:!0};function pv(){try{let e=window.localStorage.getItem(Df);if(!e)return{...Xs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Xs}:{queue:typeof t.queue=="boolean"?t.queue:Xs.queue,done:typeof t.done=="boolean"?t.done:Xs.done}}catch{return{...Xs}}}function fv(e){try{window.localStorage.setItem(Df,JSON.stringify(e))}catch{}}function Tf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function _v(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(kr):t==="updated"?r.sort(yo):(r.sort(vo(n)),t==="board"?r:[...r.filter(Sf),...r.filter(s=>!Sf(s))])}function mv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function gv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var bv="\u{1F512} blocked";function Cf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function hv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function yv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function vv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function wv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function kv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function kl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var $v=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),xv=new Set(["waiting_metadata","reviewing","retrying"]);function Av(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?cn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Sv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Ev(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Sv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!$v.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Rf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Tv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Rf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Rf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=hv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Cf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Cf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Cv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,g=null,h=null,b={},w=!1,D=!1,B={},Y=null){let le=!!l&&l.position>0,V=!!l?.continuation_action&&l.continuation_action.continuation===null,N=!!l&&l.active===!0,M=l&&l.failure||null,K=vv(l?l.waiting:null,h),L=n[e]||null,I=L&&L.gate?L.gate:null,te=L&&L.pr?L.pr:null,xe=wv(l?l.resolution:null),ke=kv(l?l.head_review:null),_e=l&&l.head_review||null,ae=Av(h,_e),Te=Ev(h,ae),Pe=l&&l.authority||null,$e=!!_e&&["pending","reviewing","revising"].includes(_e.state),ee=!!h&&typeof h=="object"&&xv.has(h.phase),Z=le&&!N&&(_e?.state==="failed"||!Pe||ee||Pe.source==="automatic"&&!D),Ce=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":xe?xe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":K,z=!!I&&I.base_badge==="\uCDA9\uB3CC",ne=!!I&&I.enabled===!0,ge=Vs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),Se=Ca(ge),Ze=o&&!ge&&(o.queueing??null)?o.queueing:null,ue=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!I&&I.tier==="merged",Ue=i&&!!r&&!!I&&I.tier==="merged",mt=Z&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ue||Ue),At=i&&z&&u===!1,$t=Bn(b,e,{external:i,merge_active:N||ge?.step==="merge",merge_queued:le,conflict_active:!!a,cleanup_active:Se,merged:!!r||I?.tier==="merged"}),ct=!!$t.operation,T=!ue&&!!r&&r.step==="repo_operations",ce=Tv({continuation_required:V,queueing:Ze,merge_step:ge,conflict_badge:Ce,conflict_live:xe?.live===!0||a==="running",head_review:_e&&ke?{...ke,state:_e.state,failure_reason:_e.failure_reason}:null,auto_resolution:ae,recovery:Te,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:g,conflicting:z,gate:I,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:M,auto_skip:d,queued:le,queue_active:N,queue_position:l?l.position:0,activity:Ce?null:o&&o.activity||null}),Ie=ce?.live===!0&&ce.title?c`<span title=${ce.title}>${ce.label}</span>`:ce?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ge?.active!==!0?Ta(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:w,...Y?{dependency_chips:Y}:{},external:i,pr_number:te&&typeof te.number=="number"?te.number:null,pr_url:te&&typeof te.url=="string"?te.url:"",completion_badge:ce?.live!==!0&&ce?.title?ce.label:null,completion_title:ce?.title||"",completion_repair_pr_url:Te?Te.repair_pr_url:"",completion_repair_pr_number:Te?Te.repair_pr_number:null,badges:Ie?[Ie]:[],live_badge:ce?.live===!0?Ie:null,usage:s,alert:ce?.alert===!0,merge_action:I?.tier==="merged"&&!ue&&!Ue||T?!1:!le||V||Z,timeline_action:T,cancel_action:le&&!V,cancel_enabled:(!N||$e)&&!(Te&&Te.lock_actions),cancel_title:Te&&Te.lock_actions?`${Te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$t,discard_action:$t.action,merge_step:ge,discard_enabled:$t.enabled,discard_title:$t.title,merge_enabled:!ge&&!Ze&&!a&&!ct&&!g&&!(Te&&Te.lock_actions)&&!At&&!T&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ue||Ue||mt||ee&&!N),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Ue?"\uC815\uB9AC \uC7AC\uAC1C":z&&!ge&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":I?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ct?$t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ze?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ge?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ge.label}`:Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":At?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":z?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":I?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ne?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:g,doneRange:h,onDoneRangeChange:b}=t,w=r?ko(r,i):null,D=So({transport:n,uiOrderStore:i}),B=null,Y=[],le=rv(),V=null,N=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},K=iv(),L=h?Wn(h):cv(),I=new Map;function te(){let f=Dr.find(k=>k.value===L);return f?f.label:"\uC624\uB298"}let xe=pv(),ke=!1,_e=new Set,ae=new Set,Te=new Set,Pe=new Set,$e=new Set,ee={},Z=null,Ce=0,z=null,ne=[];function ge(f){return Z===f?ee:{}}async function Se(){if(!n)return;let f=u?.()||"";if(Z===f||z&&z.key===f&&z.generation===Ce)return;let k=++Ce;z={key:f,generation:k};let j=null;try{j=await Promise.resolve(n("get-session-defaults",{}))}catch(fe){if(k!==Ce)return;z=null,Zy("get-session-defaults failed: %o",fe),Ye();return}k===Ce&&(ee=j&&typeof j.values=="object"&&j.values!==null?{...j.values}:{},Z=f,z=null,Ye())}function Ze(){Z=null,Ce+=1,Se()}let ue=document.createElement("div");ue.className="worker-console";let Ue=document.createElement("div");Ue.className="worker-top";let mt=document.createElement("div");mt.className="worker-drawer-overlay",mt.hidden=!0;let At=document.createElement("div");At.className="worker-drawer-overlay__backdrop";let $t=document.createElement("div");$t.className="worker-drawer-host";let ct=document.createElement("div");ct.className="worker-drawer-host",ct.hidden=!0,mt.append(At,$t,ct);let T=document.createElement("div");T.className="worker-lanes-host",ue.append(Ue,mt,T),e.appendChild(ue);let ce=null,Ie=null,De=Zr($t,{transport:n,sessionLogStore:a,onClose:()=>{ce=null,Ie=null,mt.hidden=!0,Ye()}}),Qe=xf(ct,{onClose:()=>{ct.hidden=!0,mt.hidden=!0,Ye()}}),rt=gf({getWorkspacePath:u||(()=>"")}),gt=u&&u()||"",ht=bf({queueStore:s,transport:n,onChanged:()=>Ye(),onOpenScript:(f,k)=>{rt.open(f,k)}}),re=o?pf(ue,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,k)=>E(f,k)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(){let f=Q(),k=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,j=Array.isArray(f.serial_lanes)?f.serial_lanes:[],fe=[];for(let dt of j){if(fe.length>=k)break;!dt||typeof dt.id!="string"||!/^s[1-5]$/.test(dt.id)||!Array.isArray(dt.entries)||fe.push({id:dt.id,label:`\uC9C1\uB82C ${dt.id.slice(1)}`,count:dt.entries.length})}return fe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...fe]}function ot(f){if(!V||!f.some(j=>j.id===V))return null;let k=Fe();return k?{bead_id:V,lanes:k}:null}function ze(){let f=Q();return typeof f.revision=="number"?f.revision:0}function we(f){f&&f.queue&&s&&s.set(f.queue)}function Ke(){let f=Q().queue;return Array.isArray(f)?f.length:0}async function ut(f,k,j){if(!n)return;let fe=()=>({bead_id:f,...k==="parallel"?{}:{lane:k},...j===void 0?{}:{index:j},expected_revision:ze()}),Re=await n("worker-queue-place",fe());we(Re),Re&&Re.conflict&&await n("worker-queue-place",fe()).then(we)}async function ft(f,k,j){if(!n)return;let fe=()=>({bead_id:f,...k==="parallel"?{}:{lane:k},to_index:j,expected_revision:ze()}),Re=await n("worker-queue-reorder",fe());we(Re),Re&&Re.conflict&&await n("worker-queue-reorder",fe()).then(we)}async function _t(f){if(!n)return;let k=await n("worker-queue-remove",{bead_id:f,expected_revision:ze()});we(k),k&&k.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:ze()}).then(we)}async function Pt(f){if(!n||!f)return;let k=await n("worker-attempt-pause",{attempt_id:f});k&&k.paused===!1&&k.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Kt(f){if(!n||!f)return;let k=await zr();if(k===null)return;let j=async(Re={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:ze(),...k!==""?{instructions:k}:{},...Re}),fe=await j();we(fe),fe&&fe.conflict&&(fe=await j(),we(fe)),fe=await Zn(fe,(Re,dt)=>j({continuation:Re,decision_token:dt}),{onResult:we,refresh:()=>j()}),fe&&fe.resumed===!1&&!fe.conflict&&fe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${fe.reason}`,"error",2400)}async function Ht(f){if(!n||!f)return;let k=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:ze()});we(k),k&&k.conflict&&(k=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:ze()}),we(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Rt(f,k,j=!0){if(!n)return null;let fe=n,Re=await fe(f,{...k,expected_revision:ze()});return we(Re),Re&&Re.conflict&&j&&(Re=await fe(f,{...k,expected_revision:ze()}),we(Re)),Re}async function Lt(f){if(!n||!f)return;let k=Q().merge_queue?.find(fe=>fe.bead_id===f)?.continuation_action;if(k?.mismatch&&k.continuation===null){await Ne(f,k.mismatch);return}_e.add(f),Ye();let j;try{j=await Rt("worker-merge-queue-add",{bead_id:f})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{_e.delete(f),Ye()}if(!(!j||j.applied)){if(j.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(yv(j.reason),"error",2400)}}async function Je(f){if(!(!n||!f||ae.has(f))){ae.add(f),Ye();try{let k=await n("worker-cleanup-retry",{bead_id:f,expected_revision:ze()});we(k),k&&!k.retried&&!k.conflict&&k.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${k.reason}`,"error",2400)}finally{ae.delete(f),Ye()}}}async function Ne(f,k){let j=await Zn({continuation_mismatch:k},(Re,dt)=>Rt("worker-merge-queue-add",{bead_id:f,continuation:Re,decision_token:dt},!1)),fe=j?.queue?.merge_queue?.find(Re=>Re.bead_id===f)?.continuation_action;if(j?.applied!==!0&&fe?.continuation===null&&fe.mismatch){await Ne(f,fe.mismatch);return}j&&j.applied===!1&&!j.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(f){if(!n)return;let k=await Rt("worker-merge-auto-toggle",{on:f});!k||k.conflict||de(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function J(f){if(!n||!f)return;let k=await Rt("worker-merge-queue-remove",{bead_id:f});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ve(){await Rt("worker-merge-queue-remove",{all:!0})}async function S(f,k=null,j="unmerged",fe=null){if(!n||!f)return;let Re=Ns(f,j);if(!(!!fe||typeof globalThis.confirm!="function"||globalThis.confirm(Re)))return;let Oe=await n("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...fe?{operation_id:fe}:{},expected_revision:ze()});if(we(Oe),Oe&&Oe.conflict&&(Oe=await n("worker-discard",{bead_id:f,...k?{attempt_id:k}:{},...fe?{operation_id:fe}:{},expected_revision:ze()}),we(Oe)),Oe&&Oe.discarded===!0){de(fa(Oe),"success",5e3);return}if(Oe&&Oe.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Oe.reason}`,"error",2800);return}if(Oe&&Oe.accepted&&Oe.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Oe&&Oe.accepted&&!Oe.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Oe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Oe&&!Oe.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(f,k,j){if(!(!n||!k||!j||Pe.has(k))){Pe.add(k),Ye();try{let fe=await n(f,{bead_id:k,action_id:j,expected_revision:ze()});we(fe),fe?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!fe?.ok&&fe?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(fe.reason)}`,"error",2800)}finally{Pe.delete(k),Ye()}}}async function Le(f,k){if(!n||!k||Te.has(k))return;Te.add(k),Ye();let j;try{let fe=async(Re={})=>await n(f,{bead_id:k,expected_revision:ze(),...Re});j=await fe(),we(j),j&&j.conflict&&(j=await n(f,{bead_id:k,expected_revision:ze()}),we(j)),f==="worker-revise-fix"&&(j=await Zn(j,(Re,dt)=>fe({continuation:Re,decision_token:dt}),{onResult:we,refresh:()=>fe()}))}finally{Te.delete(k),Ye()}if(!(!j||j.conflict)){if(j.ok){de(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${j.reason||""}`,"error",3e3)}}async function $(f){if(!n)return;let k=await n("worker-automation-toggle",{on:f,expected_revision:ze()});we(k),k&&k.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:ze()}).then(we)}async function O(f){if(!n||!f)return;let k=await n("worker-repo-operation-repair",{operation_id:f});if(we(k),k&&k.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${k.reason||""}`,"error",3e3);return}k&&k.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function X(f){if(!n||!f)return;let k=await n("worker-repo-operation-dismiss",{operation_id:f});we(k),k&&k.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${k.reason||""}`,"error",3e3)}async function me(f){if(!n||!Number.isFinite(f))return;let k=Math.max(Oa,Math.floor(f)),j=await n("worker-queue-set-slots",{slots:k,expected_revision:ze()});we(j),j&&j.conflict&&await n("worker-queue-set-slots",{slots:k,expected_revision:ze()}).then(we)}async function Ae(f){if(!n||!Number.isInteger(f)||f<1||f>Af)return;let k=Q(),j=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).slice(f).reduce((dt,Oe)=>dt+(Array.isArray(Oe?.entries)?Oe.entries.length:0),0),fe=()=>({count:f,expected_revision:ze()}),Re=await n("worker-queue-set-serial-lane-count",fe());we(Re),Re&&Re.conflict&&(Re=await n("worker-queue-set-serial-lane-count",fe()),we(Re)),Re&&Re.applied&&j>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${j}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let v="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function U(f,k){let j=Qi(f,k.id,M);return{id:k.id,title:k.title,location_label:k.location_label,prefixes:k.prefixes,action:j.kind==="note"?{kind:"note",text:j.text}:j.kind==="disabled"?{kind:"disabled",label:v,title:j.title}:{kind:"place",label:v,title:j.title}}}function ie(f,k){if(!N||N.bead_id!==f)return null;let j=N.counterpart_id,fe=k.filter(Re=>Re.id===j);return fe.length===0?null:{rows:fe.map(Re=>U(f,Re))}}async function Ve(f,k){let j=Qi(f,k,M);if(N=null,j.kind!=="ops"){Ye();return}let fe=ze();for(let Re of j.ops){let dt=await je(Re,fe);if(dt===null)break;fe=dt}Ye()}async function je(f,k){if(!n)return null;try{let j=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:k});if(we(j),j&&j.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!j||j.applied!==!0)return de(j&&typeof j.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${j.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let fe=j.queue?j.queue.revision:void 0;return typeof fe!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):fe}catch(j){return de(j instanceof Error&&j.message?j.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function he(){let f=Q(),k=w?w.selectBoardColumn(Qy,"ready"):[],j=w?w.selectBoardColumn(Xy,"blocked"):[],fe=w?w.selectBoardColumn(tv,"closed"):[],Re=w?w.selectBoardColumn(Jy,"in_progress"):[],dt=w?w.selectBoardColumn(ev,"resolved"):[],Oe=xo([...k,...j,...Re,...dt,...fe]),x=new Map;for(let m of[...k,...j,...Re])m&&m.id&&!x.has(m.id)&&x.set(m.id,m);let se={...ge(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=f[m];typeof q=="string"&&(se[m]=q)}function F(m,q){let pe=x.get(m);if(!pe)return null;let Ge=pe.metadata&&typeof pe.metadata=="object"?pe.metadata:{},nt=pe.workflow?.route,Yt=Ge.route,Dt=Ef(nt)?nt:Ef(Yt)?Yt:null;return wn({pin:Ge,global:se,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Dt,controller_runtime:q})}function Ee(m){let q=m.runner||null,pe=F(m.bead_id,q),Ge=Fs(m),nt=pe?pr(pe,q):null;return Ge||nt?{orchestration:Ge,worker:nt}:null}let pt=new Map;function Xe(m){if(pt.has(m))return pt.get(m)??null;let q=F(m,null),pe=null;if(q){let Ge=jn(f.runner_catalog??null,q.orchestration_model.value??""),nt=Ge===null?q:F(m,Ge),Yt=Er(nt,f.runner_catalog??null),Dt=pr(nt,Ge);pe=Yt||Dt?{orchestration:Yt,worker:Dt}:null}return pt.set(m,pe),pe}function vt(m){let q=Ao(Oe,m);return q.total===0?null:q}let it=f.bead_titles||{},Tt=new Map;for(let[m,q]of Object.entries(it))typeof q=="string"&&q.length>0&&Tt.set(m,q);for(let m of[...k,...j])Tt.set(m.id,m.title||m.id);let p=new Map;for(let m of[...k,...j,...Re,...dt,...fe])m&&m.id&&typeof m.from_id=="string"&&p.set(m.id,m.from_id);let _=new Map;for(let m of[...k,...j,...Re,...dt,...fe])m&&m.id&&typeof m.priority=="number"&&_.set(m.id,m.priority);let y=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},A=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},W=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},G=new Map;for(let[m,q]of Object.entries(A))Array.isArray(q)&&G.set(m,hl(q));for(let m of[...k,...j]){let q=m.labels;Array.isArray(q)&&!G.has(m.id)&&G.set(m.id,hl(q))}let oe=new Map,be=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(be)?be:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let q=m.members.map(Ge=>{let nt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Yt=>Yt.entries.some(Dt=>Dt.bead_id===Ge));return nt?nt.id:null});if(!(q.every(Ge=>Ge!==null)&&new Set(q).size===1))for(let Ge of m.members)oe.set(Ge,m.members.filter(nt=>nt!==Ge))}let et=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},lt=f.blocker_workspaces&&typeof f.blocker_workspaces=="object"&&!Array.isArray(f.blocker_workspaces)?f.blocker_workspaces:{},rn=new Map;for(let[m,q]of Object.entries(y))q&&typeof q=="object"&&rn.set(m,q);for(let m of[...k,...j])rn.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let Mt=m=>rn.get(m)||{},pn=f.pr_wait||[],An=f.pr_observations||{},We=f.pr_activity||{},St=f.cleanup_failed||{},fn=Object.entries(St).map(([m,q])=>({bead_id:m,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),La=f.queue||[],Yf=new Set([...La.map(m=>m.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(q=>q.bead_id)),...pn.map(m=>m.bead_id),...f.done.map(m=>m.bead_id)]),Zf=new Set(j.map(m=>m.id)),Qf=i?i.get()?.order||{}:{},Tl=new Set,Cl=[];for(let m of[...k,...j])Yf.has(m.id)||Tl.has(m.id)||mv(m)||(Tl.add(m.id),Cl.push(m));Y=_v(Cl,K,Qf);let Xf=f.admission||{},Rl=m=>{let q=Xf[m];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let pe=typeof q.reason=="string"?q.reason:"",Ge=pe.indexOf(":");return Ge>0&&Ge<pe.length-1?`\u26D4 ${pe.slice(0,Ge)} (${pe.slice(Ge+1)})`:`\u26D4 ${pe}`},Ol=new Map,Jf=Y.map(m=>{let q=Ts(m),pe=q.evidence==="published",Ge=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",nt=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,Yt=Object.hasOwn(m,"labels")&&uf(m.labels),Dt=Yt||!Object.hasOwn(m,"labels")?"":df(m.labels,m.metadata),Ir=Dt.length>0,Nt=!Yt&&(Ge?nt:pe&&!q.conflict),io=Zf.has(m.id),Kn=[];if(io){let lo=gv(m);lo.length>0?Ol.set(m.id,lo):Kn.push(bv)}Ge&&!nt?Kn.push("missing_description"):!Ge&&q.conflict?Kn.push("spec_id_conflict"):!Ge&&q.evidence==="none"?Kn.push("spec \uC5C6\uC74C"):!Ge&&q.evidence==="draft"&&Kn.push("spec \uBBF8\uBC1C\uD589(draft)");let Pr=Rl(m.id);return Pr&&Kn.push(Pr),{id:m.id,title:m.title||m.id,reason:Kn.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:Ge,status:m.status,worker_ineligible:Yt,session_preferred:Ir,session_preferred_reason:Dt,blocked:io,has_spec:pe,exec_chips:Xe(m.id),from_id:m.from_id||void 0,priority:_.get(m.id)}}),Ia=ov(Jf,le),Pa=Ia.visible,e_=f.revise_parked||{},Js=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Ma=(m,q)=>m.map((pe,Ge)=>{let nt=q!=="done",Yt=q!=="done"&&q!=="queue",Dt=nt?e_[pe.bead_id]:null,Ir=nt?Bn(Js,pe.bead_id):null,Nt=Ir?.operation?Ir:null,io=nt&&G.get(pe.bead_id)===!0,Kn=f.admission&&typeof f.admission=="object"?f.admission[pe.bead_id]:null,Pr=nt?Dd(Kn,!!Nt||Pe.has(pe.bead_id)):null,lo=nt&&!Pr?Rl(pe.bead_id):null,f_=nt?[lo]:[],ic=[],Ha=nt?oe.get(pe.bead_id):void 0;return Ha&&Ha.length>0&&ic.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ha.join(", ")}\uC640`),{id:pe.bead_id,title:Tt.get(pe.bead_id)||pe.bead_id,reason:f_.filter(Boolean).join(" \xB7 "),draggable:nt&&!Nt&&!Pr,done:q==="done",lane:q,seq:Yt?Ge+1:void 0,worker_serial:io,discard:Nt,stale_work:Pr,badges:[...ic,...Dt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...q==="done"?ua(f.attempts||{},pe.bead_id):[]],alert:!!Dt,revise_action:!!Dt,revise_enabled:!!Dt&&!Nt&&!Te.has(pe.bead_id),revise_title:Dt?Dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?On(f.attempts||{},pe.bead_id):null,work_ms:q==="done"?da(f.attempts||{},pe.bead_id):null,done_at:q==="done"&&typeof pe.added_at=="number"?pe.added_at:void 0,exec_chips:nt?Xe(pe.bead_id):null,workflow:nt&&W[pe.bead_id]||null,from_id:p.get(pe.bead_id)||void 0,priority:_.get(pe.bead_id),...Mt(pe.bead_id)}}),Rr=f.attempts?Object.values(f.attempts).filter(Tr):[],Da=new Set;for(let m of Rr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&Da.add(m.resumed_from);let Ll=new Map;for(let m of Rr)Ll.set(m.bead_id,m.attempt_id);let rs=new Map;for(let m of Rr)rs.set(m.attempt_id,m);function Na(m){let q=new Set,pe=m;for(;pe&&!q.has(pe.attempt_id);){if(pe.conflict_resolution===!0)return!0;q.add(pe.attempt_id),pe=typeof pe.resumed_from=="string"&&pe.resumed_from.length>0&&rs.get(pe.resumed_from)||null}return!1}let eo=typeof f.declared_base=="string"?f.declared_base:null;function t_(m){let q=null;for(let pe of Rr)!pe||pe.bead_id!==m||Na(pe)||(q===null||(typeof pe.started_at=="number"?pe.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=pe);return q&&typeof q.target_base=="string"?q.target_base:null}let qa=[],to=[],n_=cf(f),Il=m=>{let q=typeof m.session_id=="string"&&m.session_id.length>0,pe=Da.has(m.attempt_id);return{eligible:q&&!pe,reason:q?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pn=null;for(let m of Rr){let q=m.status==="paused"&&!Da.has(m.attempt_id);if(m.status==="running"||q)to.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Tt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:q,conflict_resolution:Na(m),base_exception:kl(eo,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:Bn(Js,m.bead_id,{attempt_id:m.attempt_id}),workflow:W[m.bead_id]||null,priority:_.get(m.bead_id),usage:On(f.attempts||{},m.bead_id),rollup:vt(m.bead_id),rollup_expanded:$e.has(m.bead_id),exec_chips:Ee(m),...Mt(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&n_(m)){let pe=Il(m);qa.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Tt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Bn(Js,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:pe.eligible,resume_reason:pe.reason,conflict_resolution:Na(m),base_exception:kl(eo,m.target_base),workflow:W[m.bead_id]||null,priority:_.get(m.bead_id),usage:On(f.attempts||{},m.bead_id),rollup:vt(m.bead_id),rollup_expanded:$e.has(m.bead_id),exec_chips:Ee(m),...Mt(m.bead_id)}),Pn=m}}let Pl=new Set([...qa,...to].map(m=>m.bead_id)),Ml=new Map;for(let m of Array.isArray(f.session_active)?f.session_active:[]){let q=m&&m.bead_id;if(!(typeof q!="string"||q.length===0||Pl.has(q))){if(Pl.add(q),Array.isArray(m.blocked_by)){let pe=m.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0);pe.length>0&&Ml.set(q,pe)}to.push({bead_id:q,attempt_id:null,kind:"session",title:m.title||Tt.get(q)||q,status:"in_progress",started_at:zn(m.started_at)??zn(m.updated_at),updated_at:zn(m.updated_at),workflow:m.workflow||null,session_refs:Array.isArray(m.session_refs)?m.session_refs:[],priority:_.get(q),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Or=[...qa,...to].map(m=>{let q=rs.get(m.attempt_id),pe=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!pe||typeof pe!="object")return m;let Ge=typeof pe.reason=="string"&&pe.reason.length>0?pe.reason:null,nt=Vs({bead_id:q.bead_id,merge_sha:pe.head_sha,cleanup_cursor:pe.cursor,cleanup_failed:Ge?{step:pe.cursor,reason:Ge}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return nt?{...m,landing:nt}:m}),Dl=null;if(Pn){let m=Il(Pn),q=Pn.cause_detail;Dl={bead_id:Pn.bead_id,repo:Pn.repo||"",reason:Pn.cause||Pn.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Pn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:Bn(Js,Pn.bead_id,{attempt_id:Pn.attempt_id})}}let Nl=new Set(Or.map(m=>m.bead_id)),Fa=Array.isArray(f.merge_queue)?f.merge_queue:[],ql=new Map,Fl=new Map,jl=new Map,Bl=new Map,Ul=new Map;Fa.forEach((m,q)=>{m&&typeof m.bead_id=="string"&&(ql.set(m.bead_id,q+1),Fl.set(m.bead_id,m.resolution),jl.set(m.bead_id,m.continuation_action||null),Bl.set(m.bead_id,m.head_review||null),Ul.set(m.bead_id,m.authority||null))});let Lr=f.merge_queue_state||{active:null,failures:{}},r_=Lr.failures||{},Wl=Lr.waiting&&typeof Lr.waiting.bead_id=="string"&&typeof Lr.waiting.reason=="string"?Lr.waiting:null,s_=f.auto_merge_skips||{},zl=m=>{let q=s_[m];if(!q)return null;let pe=An[m],Ge=pe&&pe.pr?pe.pr.head_sha:null;return Ge&&Ge===q.head_sha?q.reason||"":null},no=new Map;for(let m of Or)m.failed!==!0&&m.conflict_resolution&&(m.paused?no.has(m.bead_id)||no.set(m.bead_id,"paused"):no.set(m.bead_id,"running"));let Hl=Or.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,Gl=(f.workspace_info||{}).slots,Kl=typeof Gl=="number"?Gl:typeof f.slots=="number"?f.slots:Oa,o_=Hl>Kl,ro=vr(L),a_=(Array.isArray(f.done)?f.done.slice():[]).filter(m=>ro===void 0||typeof m.added_at!="number"||m.added_at>=ro).sort((m,q)=>(q.added_at||0)-(m.added_at||0)),ss=Ma(a_,"done"),i_=new Set((Array.isArray(f.done)?f.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),Vl=[],l_=u?.()||"";for(let m of fe){let q=zn(m.closed_at);if(typeof m.id!="string"||i_.has(m.id)||q===null||ro!==void 0&&q<ro||typeof m.comment_count!="number"||m.comment_count<=0)continue;let pe=`${l_}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,Ge=I.get(pe);Ge===void 0&&n&&(I.set(pe,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(nt=>{let Yt=Array.isArray(nt)&&nt.some(Dt=>Zo(typeof Dt?.text=="string"?Dt.text:"")?.lane==="session");I.set(pe,Yt?"session":"not-session"),Ye()}).catch(()=>{I.set(pe,"failed"),Ye()})),Ge==="session"&&Vl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:m.created_at,updated_at:m.updated_at})}ss.push(...Vl),ss.sort((m,q)=>(q.done_at||0)-(m.done_at||0));let so={};for(let m of Gn)so[m]=0;let Yl=!1,Zl=0,ja=0,Ql=0;for(let m of ss){let q=m.usage;if(q&&typeof q=="object"){let pe=!1;for(let Ge of Gn)Number.isFinite(q[Ge])&&(so[Ge]+=q[Ge],Yl=!0,pe=!0);pe&&(ja+=1,Number.isFinite(q.total_cost_usd)&&(Zl+=q.total_cost_usd,Ql+=1))}}ja>0&&Ql===ja&&(so.total_cost_usd=Zl);let Xl=ss.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),c_=Xl.length>0?un(Do(Xl)):Yl?Qn(so):null,Jl=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},ec=Array.isArray(f.serial_lanes)?f.serial_lanes:[],tc=m=>{if(pn.some(Ge=>Ge.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Rr.filter(Ge=>Ge&&Ge.bead_id===m),pe=q.length>0?q[q.length-1].status:null;return pe==="failed"||pe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":pe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},oo=ec.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,q)=>{let pe=Jl[m.id]||{},Ge=new Map((Array.isArray(pe.corrections)?pe.corrections:[]).filter(Nt=>Nt&&typeof Nt.bead_id=="string"&&typeof Nt.after=="string").map(Nt=>[Nt.bead_id,Nt.after])),nt=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(Nt=>typeof Nt=="string"):[],Yt=new Set(nt),Dt=Ma(m.entries.filter(Nt=>!Nl.has(Nt.bead_id)&&!Yt.has(Nt.bead_id)),m.id).map(Nt=>Ge.has(Nt.id)?{...Nt,badges:[`\u{1F517} ${Ge.get(Nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Nt.badges]}:Nt),Ir=nt.map(Nt=>({id:Nt,title:Tt.get(Nt)||Nt,draggable:!1,lane:m.id,ghost:!0,badges:[tc(Nt)]}));return{id:m.id,index:q+1,rows:[...Ir,...Dt],occupied:nt.length>0,badge:nt.length>0?tc(nt[0]):"\uB300\uAE30",cycle:pe.cycle===!0}}),nc=typeof f.serial_lane_count=="number"?f.serial_lane_count:oo.length,Ba=Ma(La.filter(m=>!Nl.has(m.bead_id)),"queue"),rc=new Map,sc=new Set;for(let[m,q]of Object.entries(Jl)){if(!/^s[1-5]$/.test(m))continue;let pe=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let Ge of pe)typeof Ge=="string"&&rc.set(Ge,m);pe.length>0&&sc.add(m)}let sr=[];for(let m of Or)typeof m.bead_id=="string"&&sr.push({id:m.bead_id,title:Tt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:rc.get(m.bead_id)??null});for(let m of pn){let q=m&&m.bead_id;typeof q!="string"||q.length===0||sr.push({id:q,title:Tt.get(q)||q,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let m of oo)for(let q of m.rows)q.ghost!==!0&&sr.push({id:q.id,title:q.title,location_label:`${m.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:m.id});Ba.forEach((m,q)=>{sr.push({id:m.id,title:m.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let m of Pa)sr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let oc={};for(let m of ec)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(oc[m.id]=m.entries.length);let Ua=new Map;for(let m of sr)Ua.has(m.id)||Ua.set(m.id,m);M={members_by_id:Ua,serial_raw_lengths:oc,serial_lane_count:nc,occupied_lanes:sc};let u_=Fd(f.bead_scope,sr),ao=new Map;for(let[m,q]of Ml)ao.set(m,q);for(let[m,q]of Ol)ao.set(m,q);for(let[m,q]of Object.entries(et))Array.isArray(q)&&ao.set(m,q.filter(pe=>typeof pe=="string"&&pe.length>0));let d_=vp(ao,sr,lt),Wa=(m,q=null)=>{let pe=u_.get(m),Ge=d_.get(m)||null,nt=pe&&pe.overlaps.length>0?pe.overlaps:null,Yt=!!pe&&pe.scope_missing;if(!Ge&&!nt&&!Yt)return q;let Dt=nt?ie(m,nt):null;return{...q||{},...Ge?{predecessors:Ge}:{},...nt?{overlaps:nt}:{},...Yt?{scope_missing:!0}:{},...Dt?{popover:Dt}:{}}},za=m=>{let q=Wa(m.id,m.dependency_chips||null);return q&&(m.dependency_chips=q),m};for(let m of Ba)za(m);for(let m of oo)for(let q of m.rows)q.ghost!==!0&&za(q);for(let m of Pa)za(m);let ac=new Map;for(let m of Or){let q=typeof m.bead_id=="string"?m.bead_id:"";if(q.length===0)continue;let pe=m.kind==="session",Ge=Wa(q),nt=typeof m.attempt_id=="string"&&m.attempt_id.length>0?rs.get(m.attempt_id):void 0,Yt=nt&&nt.last_activity&&typeof nt.last_activity=="object"?nt.last_activity:null,Dt=nt&&Array.isArray(nt.legs)?nt.legs:[];!Ge&&!Yt&&Dt.length===0&&!pe||ac.set(q,{...Yt?{last_activity:Yt}:{},...Dt.length>0?{legs:Dt}:{},...Ge?{dependency_chips:Ge}:{}})}let p_=pn.map(m=>Cv(m.bead_id,Tt.get(m.bead_id)||m.bead_id,An,St[m.bead_id]||null,On(f.attempts||{},m.bead_id),We[m.bead_id]||(_e.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ae.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),no.get(m.bead_id)||null,m.external===!0,{position:ql.get(m.bead_id)||0,active:Lr.active===m.bead_id,failure:r_[m.bead_id]||null,waiting:Wl?.bead_id===m.bead_id?Wl.reason:null,resolution:Fl.get(m.bead_id),continuation_action:jl.get(m.bead_id),head_review:Bl.get(m.bead_id)||null,authority:Ul.get(m.bead_id)||null},m.wt_present!==!1,f.auto_merge===!0?zl(m.bead_id):null,kl(eo,t_(m.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[m.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},rs.get(Ll.get(m.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Wa(m.bead_id))).map(m=>({...m,workflow:W[m.id]||null,priority:_.get(m.id),...Mt(m.id)}));return{queue:f,idToTitle:Tt,candidates:Pa,candidate_hidden:{blocked:Ia.hidden_blocked,spec:Ia.hidden_spec},running:Or,live_count:Hl,slots:Kl,over_cap:o_,failure:Dl,waiting:Ba,serial_lanes:oo,serial_lane_count:nc,running_overlays:ac,pr_wait:p_,merge_queue_length:Fa.length,merge_queue_running:Fa.length>0,auto_excluded:pn.map(m=>m.bead_id).filter(m=>zl(m)!==null),declared_base:eo,done:ss,token_total:c_,cleanup_failures:fn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Ot(){let k=!!o?.get()?.job,j=!k&&o?.isPending?.()===!0,fe=k?"\uBD84\uC11D \uC911":j?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${fe?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${fe?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${fe?c`<span class="worker-analysis-btn__badge">${fe}</span>`:""}
    </button>`}function yt(f){let k=f.waiting.length>0?f.waiting[0].id:"\u2014",j=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,fe=nn(f),Re=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",dt=f.queue.auto_advance?0:(Array.isArray(f.queue.queue)?f.queue.queue:[]).filter(Xe=>Xe&&typeof Xe.armed_by_lane=="string"&&Xe.armed_by_lane.length>0).length,Oe=dt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${dt}건 진행 중</span
          >`:"",x=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${te()} 완료 <b>${f.done.length}</b></span
      >`,se=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,F=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Oa}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Af},(Xe,vt)=>vt+1).map(Xe=>c`<option
                value=${String(Xe)}
                ?selected=${f.serial_lane_count===Xe}
              >
                ${Xe}
              </option>`)}
        </select>
      </label>
      ${o?Ot():""} `,Ee=Hd({failure:f.failure}),pt=Md(f.repo_operations,f.cleanup_failures);return ke?c`<div class="worker-ribbon">
          ${j} ${fe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Re}${Oe}${x}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${F}</div>
          <div class="worker-kpi">${se}</div>
        </div>
        ${pt}${ht.template()}${Ee}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${j}${fe}${F}</div>
        <div class="worker-kpi">
          ${Re}${Oe}${x}${se}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${te()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xe=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xe.tooltip}
                >${te()} 완료 · 누적 ${Xe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${pt}${ht.template()}${Ee}`}function bt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let k=f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0);return c`<section
      class="worker-now${k?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?tl(f.running,Date.now(),ce,f.running_overlays):""}
      ${f.pr_wait.map(j=>cr(j))}
    </section>`}function Qt(f){let k=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${le.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${av.map(j=>c`<button
              type="button"
              class="worker-filter__chip${le.spec===j.value?" is-active":""}"
              data-spec=${j.value}
              aria-pressed=${le.spec===j.value?"true":"false"}
            >
              ${j.label}
            </button>`)}
        ${k.spec>0?c`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function Ft(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${If.map(f=>c`<option value=${f.value} ?selected=${K===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function an(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Dr.map(f=>c`<option value=${f.value} ?selected=${L===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function en(f){let k=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,j=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return In({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:k,controls:j})}function nn(f){let k=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(k)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let j=new Set(f.auto_excluded),fe=f.pr_wait.filter(Re=>Re.merge_action&&Re.merge_enabled&&!j.has(Re.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${fe>0?` ${fe}`:""}
    </button>`}function Xt(f){let k=In({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ft(),controls:Qt(f),place_menu:ot(f.candidates),onOpenDoc:g?(j,fe)=>g(fe):void 0});return ke?c`<div class="worker-lanes worker-lanes--mobile">
        ${bt(f)}
        ${In({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:xe.queue,preview:Tf(f.waiting)})}
        ${f.serial_lanes.map(j=>en(j))}
        ${k}
        ${In({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:an(),collapsible:!0,collapsed:xe.done,preview:Array.isArray(f.token_total)?f.token_total.map(j=>j.label).join(" \xB7 "):f.token_total||Tf(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${k}
      <div class="worker-wait">
        ${In({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(j=>en(j))}
      </div>
      ${In({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0),body:tl(f.running,Date.now(),ce,f.running_overlays)})}
      ${In({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${In({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${te()} ${f.done.length}`,items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:an()})}
    </div>`}function on(f){xe={...xe,[f]:!xe[f]},fv(xe),Ye()}function Ye(){let f=he();st(yt(f),Ue),st(Xt(f),T)}function hn(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(dv);ke=!!f.matches;let k=j=>{let fe=!!(j&&typeof j.matches=="boolean"?j.matches:f.matches);fe!==ke&&(ke=fe,Ye())};typeof f.addEventListener=="function"?(f.addEventListener("change",k),ne.push(()=>f.removeEventListener("change",k))):typeof f.addListener=="function"&&(f.addListener(k),ne.push(()=>f.removeListener(k)))}let tt=null;function Me(f){tt=f.target instanceof Element?f.target:null}function C(f){let j=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!j)return;if(tt&&j.contains(tt)&&tt.closest("input, button, a")){f.preventDefault();return}let fe=j.dataset.beadId||"",Re=j.dataset.lane||"";B={bead_id:fe,from_lane:Re};try{f.dataTransfer?.setData("text/plain",fe),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function ye(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;let j=k.dataset.lane||"";j!=="candidate"&&j!=="queue"&&!/^s[1-5]$/.test(j)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function qe(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function xt(f,k){let j=Y.find(Oe=>Oe.id===f);if(!j)return;let fe=Y.filter(Oe=>Oe.id!==f),Re=fe.length;if(k){let Oe=k.dataset.beadId;if(Oe===f)return;let x=fe.findIndex(se=>se.id===Oe);x>=0&&(Re=x)}let dt=fe.slice();dt.splice(Re,0,j),D.applyReorder(f,dt,Re)}function jt(f){let k=f.target?.closest?.(".worker-pane");if(!k)return;f.preventDefault(),k.classList.remove("worker-pane--drag-over");let j=k.dataset.lane||"",fe=B?.bead_id||f.dataTransfer?.getData("text/plain")||"",Re=B?.from_lane||"";if(B=null,!fe)return;let dt=f.target?.closest?.(".worker-mini, .worker-card"),Oe=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),x=Oe.length;if(dt){let se=Oe.indexOf(dt);se>=0&&(x=se)}if(x=Math.max(0,x-k.querySelectorAll(".worker-mini--ghost").length),k.classList.contains("worker-pane--collapsed")&&(x=Ke()),j==="candidate"){if(Re==="candidate"){xt(fe,dt);return}(Re==="queue"||/^s[1-5]$/.test(Re))&&_t(fe);return}if(j==="queue"||/^s[1-5]$/.test(j)){let se=j==="queue"?"parallel":j;Re===j?ft(fe,se,x):ut(fe,se)}}function wt(f){le=f,sv(f),Ye()}function Bt(f){K=Pf(f),lv(K),Ye()}function tn(f){L=Wn(f),uv(L),b?.(L),Ye()}function ln(f){let k=f.target?.closest?.(".worker-serial-lane-count");if(k){let x=Number.parseInt(k.value,10);Number.isFinite(x)&&Ae(x).then(Ye);return}let j=f.target?.closest?.(".worker-filter__blocked");if(j){wt({...le,show_blocked:j.checked});return}let fe=f.target?.closest?.(".worker-done-range");if(fe){tn(fe.value);return}let Re=f.target?.closest?.(".worker-sort");if(Re){Bt(Re.value||$l);return}let dt=f.target?.closest?.(".worker-slots__input");if(!dt)return;let Oe=Number.parseInt(dt.value,10);if(!Number.isFinite(Oe)){Ye();return}me(Oe).then(Ye)}function $n(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function Ut(){let f=he();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Cn(){ce&&De.close(),ct.hidden=!1,mt.hidden=!1,Qe.open(Ut()),Ye()}function xn(f){let k=Q(),j=k.attempts?k.attempts[f]:null;ce=f,Ie=null,Qe.close(),ct.hidden=!0,mt.hidden=!1,De.open({attempt_id:f,meta:$n(j)}),Ye()}function rr(f){let k=Q(),j=(Array.isArray(k.session_active)?k.session_active:[]).find(Re=>Re&&Re.bead_id===f),fe=(j&&Array.isArray(j.session_refs)?j.session_refs:[]).find(Re=>Re&&Re.current===!0);fe&&(Qe.close(),ct.hidden=!0,mt.hidden=!1,De.open(Hr(fe,f,"in_progress")),Ye())}function E(f,k){ce=null,Ie=f,Qe.close(),ct.hidden=!0,mt.hidden=!1,De.open({attempt_id:f,meta:k,hide_prompt:!0}),Ye()}function R(){if(Qe.isOpen()&&Qe.refresh(Ut()),Ie){let j=(o?.get()?.runs||[]).find(fe=>fe.run_id===Ie);j?De.updateMeta(vl(j)):De.close();return}if(!ce)return;let f=Q(),k=f.attempts?f.attempts[ce]:null;if(k){De.updateMeta($n(k));return}De.close()}function Be(f,k){if(f.length===0||!l)return;let j=u?u():void 0;if(k.length===0||!j||k===j||!d){l(f);return}Promise.resolve(d(k)).then(()=>{l(f)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function He(f){let k=f.target;if(k?.closest?.(".worker-mini__serial, .worker-mini__grip")||k?.closest?.("#worker-parallel-analysis-dialog"))return;let j=k?.closest?.(".worker-dep__open");if(j){Be(j.getAttribute("data-dep-id")||"",j.getAttribute("data-root-dir")||"");return}let fe=k?.closest?.(".mon-overlap__chip");if(fe){let We=fe.closest("[data-bead-id]"),St=We&&We.getAttribute("data-bead-id")||"";if(St){let fn=fe.getAttribute("data-overlap-id")||"";N=!!N&&N.bead_id===St&&N.counterpart_id===fn?null:{bead_id:St,counterpart_id:fn},Ye()}return}let Re=k?.closest?.(".mon-overlap__place");if(Re){let We=Re.closest("[data-bead-id]"),St=We&&We.getAttribute("data-bead-id")||"";St&&Ve(St,Re.getAttribute("data-counterpart-id")||"");return}if(k?.closest?.(".mon-overlap__popover"))return;if(k?.closest?.(".worker-analysis-btn")){re?.open();return}if(k?.closest?.(".worker-repo-strip")||k?.closest?.(".worker-mini__timeline")){Cn();return}let dt=k?.closest?.(".worker-repo-op__session");if(dt){let We=dt.dataset.attemptId;We&&xn(We);return}let Oe=k?.closest?.(".worker-repo-op__resolve");if(Oe){O(Oe.dataset.operationId||"");return}let x=k?.closest?.(".worker-repo-op__dismiss");if(x){X(x.dataset.operationId||"");return}let se=k?.closest?.(".worker-cleanup__resume");if(se){let We=se.dataset.beadId;We&&Je(We);return}let F=k?.closest?.(".worker-banner__resume");if(F){let We=F.dataset.attemptId;We&&Kt(We);return}let Ee=k?.closest?.(".worker-banner__discard");if(Ee){let We=Ee.dataset.confirmation==="merged"?"merged":"unmerged";S(Ee.dataset.beadId||"",Ee.dataset.attemptId||null,We,Ee.dataset.operationId||null);return}let pt=k?.closest?.(".worker-banner__dismiss");if(pt){let We=pt.dataset.attemptId;We&&Ht(We);return}if(k?.closest?.(".worker-play")){$(!Q().auto_advance);return}let Xe=k?.closest?.(".worker-merge-all");if(Xe){Xe.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?P(!1):ve():P(!0);return}let vt=k?.closest?.(".worker-pane__hd--toggle");if(vt){let We=vt.dataset.lane;(We==="queue"||We==="done")&&on(We);return}let it=k?.closest?.(".worker-card__place-lane");if(it){let We=it.dataset.beadId,St=it.dataset.lane;We&&(St==="parallel"||/^s[1-5]$/.test(St||""))&&(V=null,Ye(),ut(We,St));return}if(k?.closest?.(".worker-card__place-cancel")){V=null,Ye();return}let p=k?.closest?.(".worker-card__place");if(p){let We=p.dataset.beadId;We&&!p.disabled&&(Fe()?(V=We,Ye()):ut(We,"parallel"));return}let _=k?.closest?.(".worker-filter__chip");if(_){let We=_.dataset.spec;(We==="all"||We==="with"||We==="without")&&wt({...le,spec:We});return}let y=k?.closest?.(".worker-mini__merge");if(y){let We=y.dataset.beadId||"";Q().cleanup_failed?.[We]?Je(We):Lt(We);return}let A=k?.closest?.(".worker-mini__merge-cancel");if(A){J(A.dataset.beadId||"");return}let W=k?.closest?.(".worker-mini__discard");if(W){S(W.dataset.beadId||"",W.dataset.attemptId||null,W.dataset.discardMode==="merged"?"merged":"unmerged",W.dataset.operationId||null);return}let G=k?.closest?.(".worker-mini__stale-continue");if(G){H("worker-stale-work-continue",G.dataset.beadId||"",G.dataset.actionId||"");return}let oe=k?.closest?.(".worker-mini__stale-backup");if(oe){H("worker-stale-work-backup-fresh",oe.dataset.beadId||"",oe.dataset.actionId||"");return}let be=k?.closest?.(".worker-mini__stale-recheck");if(be){H("worker-stale-work-recheck",be.dataset.beadId||"",be.dataset.actionId||"");return}let et=k?.closest?.(".worker-mini__revise-fix");if(et){Le("worker-revise-fix",et.dataset.beadId||"");return}let lt=k?.closest?.(".worker-mini__revise-approve");if(lt){Le("worker-revise-approve",lt.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__discard")){let We=k?.closest?.(".rtile"),St=We?.dataset?.beadId,fn=We?.dataset?.attemptId;St&&S(St,fn||null,"unmerged",k?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(k?.closest?.(".rtile__dismiss")){let St=k?.closest?.(".rtile")?.dataset?.attemptId;St&&Ht(St);return}if(k?.closest?.(".rtile__pause")){let St=k?.closest?.(".rtile")?.dataset?.attemptId;St&&Pt(St);return}if(k?.closest?.(".rtile__resume")){let St=k?.closest?.(".rtile")?.dataset?.attemptId;St&&Kt(St);return}if(k?.closest?.(".rtile__session")){let We=k?.closest?.(".rtile"),St=We?.dataset?.attemptId;if(St){xn(St);return}let fn=We?.dataset?.beadId;fn&&rr(fn);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),De.close();return}if(k?.closest?.(".worker-drawer-host"))return;let rn=k?.closest?.(".rtile .board-card__roll-toggle");if(rn){let We=rn.dataset.rollParent;We&&($e.has(We)?$e.delete(We):$e.add(We),Ye());return}let Mt=k?.closest?.(".rtile .board-card__roll-child");if(Mt){let We=Mt.dataset.childId;We&&l&&l(We);return}let pn=k?.closest?.(".rtile");if(pn){if(k?.closest?.(".rtile__id")){let St=pn.dataset.beadId;St&&Sn(St).then(fn=>{fn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let We=pn.dataset.beadId;We&&l&&l(We);return}let An=k?.closest?.(".worker-mini, .worker-card");if(An){let We=An.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){We&&Sn(We).then(fn=>{fn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let St=k?.closest?.(".ctl-chip--from");if(St){let fn=St.dataset.fromId;fn&&l&&l(fn);return}We&&l&&l(We)}}e.addEventListener("pointerdown",Me),e.addEventListener("dragstart",C),e.addEventListener("dragover",ye),e.addEventListener("dragleave",qe),e.addEventListener("drop",jt),e.addEventListener("click",He),e.addEventListener("change",ln);function at(f){if(!N)return;let k=f.target;k&&typeof k.closest=="function"&&k.closest(".mon-overlap__popover, .mon-overlap__chip")||(N=null,Ye())}function Et(f){f.key!=="Escape"||!N||(N=null,Ye())}return document.addEventListener("click",at),document.addEventListener("keydown",Et),ne.push(()=>{document.removeEventListener("click",at),document.removeEventListener("keydown",Et)}),hn(),w&&ne.push(w.subscribe(()=>{for(let[f,k]of I)k==="failed"&&I.delete(f);Ye()})),s&&ne.push(s.subscribe(()=>{let f=u&&u()||"";f!==gt&&(gt=f,rt.close()),Ye(),R()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>{R(),Ye()})),Ye(),{load(){Se(),Ye()},refreshSessionDefaults:Ze,destroy(){for(let f of ne.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Me),e.removeEventListener("dragstart",C),e.removeEventListener("dragover",ye),e.removeEventListener("dragleave",qe),e.removeEventListener("drop",jt),e.removeEventListener("click",He),e.removeEventListener("change",ln);try{De.destroy()}catch{}mt.hidden=!0;try{re?.destroy()}catch{}try{rt.destroy()}catch{}st(c``,e)}}}function Al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Nf(e,t,n,r=async()=>{},s=async()=>{}){let o=Gt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(K){let I=K.target.value,xe=t.getState().workspace?.current?.path||"";if(I&&I!==xe){o("switching workspace to %s",I),i=!0,M();try{await n(I)}catch(ke){o("workspace switch failed: %o",ke)}finally{i=!1,M()}}}async function g(){let K=t.getState(),L=K.workspace?.current?.path||K.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,M();try{await r(L)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,M()}}}function h(K){let L=K.target;L&&e.contains(L)||D()}function b(K){K.key==="Escape"&&D()}function w(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),M())}function D(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),M())}function B(){u?D():w()}async function Y(K){let L=K.target,I=L.value,te=L.checked;o("toggling visibility %s \u2192 %s",I,String(te));try{await s(I,te)}catch(xe){o("workspace visibility toggle failed: %o",xe)}}function le(K){return K?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function V(K,L){return c`
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
                ${K.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!L.has(I.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Al(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let K=t.getState(),L=K.workspace?.current,I=K.workspace?.available||[],te=new Set(K.workspace?.hidden||[]),xe=L?.path||I[0]?.path||"";if(I.length===0)return c``;let ke=I.filter(_e=>!te.has(_e.path)||_e.path===xe);if(ke.length<=1){let _e=ke[0]||I[0],ae=Al(_e.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${ae}</span
          >
          ${V(I,te)}
          ${le(xe)}
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
          ${ke.map(_e=>c`
              <option
                value="${_e.path}"
                ?selected=${_e.path===xe}
                title="${_e.path}"
              >
                ${Al(_e.path)}
              </option>
            `)}
        </select>
        ${V(I,te)}
        ${le(xe)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function M(){st(N(),e)}return M(),a=t.subscribe(()=>M()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),st(c``,e)}}}var qf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ff(e,t,n=Sl()){return{id:n,type:e,payload:t}}function jf(e={}){let t=Gt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],g=new Map,h=new Set;function b(N){for(let M of Array.from(h))try{M(N)}catch{}}function w(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),M=(n.jitterRatio||0)*N,K=Math.max(0,Math.round(N+(Math.random()*2-1)*M));t("ws retry in %d ms (attempt %d)",K,a+1),i=setTimeout(()=>{i=null,V()},K)}function D(N){try{s?.send(JSON.stringify(N))}catch(M){t("ws send failed",M)}}function B(){for(o="open",t("ws open"),b(o),a=0;d.length;){let N=d.shift();N&&D(N)}}function Y(N){let M;try{M=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!M||typeof M.id!="string"||typeof M.type!="string"){t("ws received invalid envelope");return}if(u.has(M.id)){let L=u.get(M.id);u.delete(M.id),M.ok?L?.resolve(M.payload):L?.reject(M.error||new Error("ws error"));return}let K=g.get(M.type);if(K&&K.size>0)for(let L of Array.from(K))try{L(M.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",M.type)}function le(){o="closed",t("ws closed"),b(o);for(let[N,M]of u.entries())M.reject(new Error("ws disconnected")),u.delete(N);a+=1,w()}function V(){if(!l)return;let N=r();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(M){t("ws connect failed %o",M),w()}}return V(),{send(N,M){if(!qf.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let K=Sl(),L=Ff(N,M,K);return t("send %s id=%s",N,K),new Promise((I,te)=>{u.set(K,{resolve:I,reject:te,type:N}),s&&s.readyState===s.OPEN?D(L):(t("queue %s id=%s (state=%s)",N,K,o),d.push(L))})},on(N,M){g.has(N)||g.set(N,new Set);let K=g.get(N);return K?.add(M),()=>{K?.delete(M)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,V()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Rv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ov(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var El=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Bf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],fr="tab:worker:closed",Lv="bdui.worker.done-range",Uf=Bp,Wf="worker:queue",zf="worker:parallel-analysis",Hf="ui:order",Gf="ui:display-policy",Kf="exec:presets",_r="tab:board:closed",Vf="beads-ui.board.closed-range";function Iv(e){let t=Gt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;st(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&lf(a),i&&l&&u&&d){let ne=function(E,R){let Be="Request failed",He="";if(E&&typeof E=="object"){let Et=E;if(typeof Et.message=="string"&&Et.message.length>0&&(Be=Et.message),typeof Et.details=="string")He=Et.details;else if(Et.details&&typeof Et.details=="object")try{He=JSON.stringify(Et.details,null,2)}catch{He=""}}else typeof E=="string"&&E.length>0&&(Be=E);let at=R&&R.length>0?`Failed to load ${R}`:"Request failed";z.open(at,Be,He)},Fe=function(E){return`${tt.getState().workspace.current?.path||""}\0${E}`},ot=function(){Ie&&(Ie().catch(()=>{}),Ie=null),De=null,Qe=null},we=function(E){rt=E;let R=()=>{rt!==E||tt.getState().selected_id!==E||(rt=null,ze(E))};if(!re){ht.then(R);return}R()},_t=function(E,R,Be,He,at){return Be!==ft[R]?(at().catch(()=>{}),!1):(E.set(He,at),!0)},Kt=function(){let E=tt.getState();Ne(E.view==="board"),Le(E.view==="worker"),Ae(E.view==="monitor"),O(E.view==="board"||E.view==="worker"||Pt||!!E.selected_id)},Lt=function(){let E=vr(Ht);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},Je=function(){let E=vr(Rt);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},Ne=function(E){if(E)for(let[R,Be]of El){if(Ke.has(R)||ut.has(R))continue;let He=R===_r?Lt():{type:Be};try{ue.register(R,He)}catch(f){t("register %s store failed: %o",R,f)}ut.add(R);let at=ft.board,Et=!1;Ze.subscribeList(R,He).then(f=>{Et=!_t(Ke,"board",at,R,f)}).catch(f=>{t("subscribe %s failed: %o",R,f),ne(f,"board")}).finally(()=>{ut.delete(R),Et&&Kt()})}else ve()},ve=function(){ft.board+=1;for(let[E]of El){let R=Ke.get(E);R&&(R().catch(()=>{}),Ke.delete(E));try{ue.unregister(E)}catch(Be){t("unregister %s failed: %o",E,Be)}}},Le=function(E){if(!E){$();return}for(let[R,Be]of Bf){if(S.has(R)||ut.has(R))continue;let He=R===fr?Je():{type:Be};try{ue.register(R,He)}catch(f){t("register %s store failed: %o",R,f)}ut.add(R);let at=ft.worker,Et=!1;Ze.subscribeList(R,He).then(f=>{Et=!_t(S,"worker",at,R,f)}).catch(f=>{t("subscribe %s failed: %o",R,f),ne(f,"worker")}).finally(()=>{ut.delete(R),Et&&Kt()})}},$=function(){ft.worker+=1;for(let[E]of Bf){let R=S.get(E);R&&(R().catch(()=>{}),S.delete(E));try{ue.unregister(E)}catch(Be){t("unregister %s failed: %o",E,Be)}}},O=function(E){if(!E){X();return}H||(Se("subscribe-worker-queue",{id:Wf}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),Se("subscribe-worker-parallel-analysis",{id:zf}).catch(R=>{t("subscribe-worker-parallel-analysis failed: %o",R)}),H=()=>(Se("unsubscribe-worker-parallel-analysis",{id:zf}),Se("unsubscribe-worker-queue",{id:Wf})))},X=function(){H&&(H().catch(()=>{}),H=null),mt.clear()},Ae=function(E){if(!E){v();return}me||(Se("subscribe-monitor-pipeline",{id:Uf}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),me=()=>Se("unsubscribe-monitor-pipeline",{id:Uf}))},v=function(){me&&(me().catch(()=>{}),me=null)},ie=function(){U||(Se("subscribe-ui-order",{id:Hf}).catch(E=>{t("subscribe-ui-order failed: %o",E)}),U=()=>Se("unsubscribe-ui-order",{id:Hf}))},Ve=function(){U&&(U().catch(()=>{}),U=null),$t.clear()},he=function(){je||(Se("subscribe-display-policy",{id:Gf}).catch(E=>{t("subscribe-display-policy failed: %o",E)}),je=()=>Se("unsubscribe-display-policy",{id:Gf}))},Ot=function(){je&&(je().catch(()=>{}),je=null),ct.clear()},bt=function(){yt||(Se("subscribe-impl-presets",{id:Kf}).catch(E=>{t("subscribe-impl-presets failed: %o",E)}),yt=()=>Se("unsubscribe-impl-presets",{id:Kf}))},Xt=function(E){if(!E)return"Unknown";let R=E.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},tn=function(E,R){Bt.open(E.path,{missing_state:E.missing_state,...R?{workspace:R}:{}})};var g=ne,h=Fe,b=ot,w=we,D=_t,B=Kt,Y=Lt,le=Je,V=Ne,N=ve,M=Le,K=$,L=O,I=X,te=Ae,xe=v,ke=ie,_e=Ve,ae=he,Te=Ot,Pe=bt,$e=Xt,ee=tn;let Z=document.getElementById("header-loading"),Ce=zc(Z),z=Pd(e),ge=jf(),Se=Ce.wrapSend((E,R)=>ge.send(E,R)),Ze=Dc(Se),ue=Nc(),Ue=jc(),mt=Fc(),At=kc(),$t=qc(),ct=vc(),T=wc(),ce=$c();ge.on("impl-presets-snapshot",E=>{let R=E;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&T.set({revision:R.revision,presets:R.presets})}),ge.on("monitor-pipeline-snapshot",E=>{let R=E;if(!(!R||!Array.isArray(R.workspaces)))try{At.set(R.workspaces,R.workspaces_state,R.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",E=>{let R=E;if(R&&typeof R.revision=="number")try{$t.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),ge.on("display-policy-snapshot",E=>{let R=E;if(R&&R.policy&&typeof R.policy=="object")try{ct.set(R.policy)}catch{}}),ge.on("session-log-snapshot",E=>{let R=E;if(R&&typeof R.id=="string")try{ce.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),ge.on("session-log-append",E=>{let R=E;if(R&&typeof R.id=="string")try{ce.append(R.id,R.event)}catch{}}),ge.on("snapshot",E=>{let R=E,Be=R&&typeof R.id=="string"?R.id:"",He=Be?ue.getStore(Be):null;if(He&&R&&R.type==="snapshot")try{He.applyPush(R)}catch{}}),ge.on("upsert",E=>{let R=E,Be=R&&typeof R.id=="string"?R.id:"",He=Be?ue.getStore(Be):null;if(He&&R&&R.type==="upsert")try{He.applyPush(R)}catch{}}),ge.on("delete",E=>{let R=E,Be=R&&typeof R.id=="string"?R.id:"",He=Be?ue.getStore(Be):null;if(He&&R&&R.type==="delete")try{He.applyPush(R)}catch{}});let Ie=null,De=null,Qe=null,rt=null,gt=()=>{},ht=new Promise(E=>{gt=()=>E(void 0)}),re=!1,Q=!1;async function ze(E){let R=Fe(E);if(R===De||R===Qe)return;Qe=R;let Be=`detail:${E}`,He={type:"issue-detail",params:{id:E}};try{ue.register(Be,He)}catch(at){t("register detail store failed: %o",at)}try{let at=await Ze.subscribeList(Be,He);if(tt.getState().selected_id!==E||Fe(E)!==R){await at().catch(()=>{});return}Ie&&await Ie().catch(()=>{}),Ie=at,De=R}catch(at){t("detail subscribe failed: %o",at),ne(at,"issue details")}finally{Qe===R&&(Qe=null)}}let Ke=new Map,ut=new Set,ft={board:0,worker:0},Pt=!1,Ht=go;try{let E=window.localStorage.getItem(Vf);Ja(E)&&(Ht=E)}catch{}let Rt="today";try{let E=window.localStorage.getItem(Lv);E!==null&&(Rt=Wn(E))}catch{}async function P(E){if(!Ja(E)||E===Ht)return;Ht=E;try{window.localStorage.setItem(Vf,E)}catch{}let R=Ke.get(_r);if(!R)return;Ke.delete(_r),await R().catch(()=>{});let Be=Lt();try{ue.register(_r,Be)}catch(He){t("register %s store failed: %o",_r,He)}try{let He=await Ze.subscribeList(_r,Be);Ke.set(_r,He)}catch(He){t("re-subscribe %s failed: %o",_r,He),ne(He,"board")}}async function J(E){let R=Wn(E);if(R===Rt)return;Rt=R;let Be=S.get(fr);if(!Be)return;S.delete(fr),await Be().catch(()=>{});let He=Je();try{ue.register(fr,He)}catch(at){t("register %s store failed: %o",fr,at)}try{let at=await Ze.subscribeList(fr,He);S.set(fr,at)}catch(at){t("re-subscribe %s failed: %o",fr,at),ne(at,"worker")}}let S=new Map,H=null,me=null,U=null,je=null,yt=null;async function Qt(){je=null,ct.clear(),yt=null,T.clear(),H=null,me=null,Ke.clear(),S.clear(),ft.board+=1,ft.worker+=1,bt();let E=tt.getState().workspace.current?.path;if(E)try{await ge.send("set-workspace",{path:E})}catch(Be){t("workspace restore after reconnect failed: %o",Be);return}he();let R=tt.getState();Ne(R.view==="board"),Le(R.view==="worker"),Ae(R.view==="monitor"),O(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function Ft(){t("clearing all subscriptions for workspace switch"),ve(),$(),X(),Ue.clear(),Ve(),ie(),Ot(),he(),ot();let E=tt.getState();if(E.selected_id)try{ue.unregister(`detail:${E.selected_id}`)}catch{}let R=tt.getState();Ne(R.view==="board"),Le(R.view==="worker"),Ae(R.view==="monitor"),O(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&we(R.selected_id)}async function an(E){t("requesting workspace switch to %s",E),Q=!0;try{let R=await ge.send("set-workspace",{path:E});t("workspace switch result: %o",R),R&&R.workspace&&(tt.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",E),R.changed&&(await Ft(),de("Switched to "+Xt(E),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),de("Failed to switch workspace","error",3e3),R}finally{Q=!1}}async function en(E){t("requesting workspace git pull for %s",E);try{let R=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let Be=R?.status;if(Be==="up_to_date"){de("Already up to date","success",2e3);return}if(Be==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Xt(E),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let Be=R?.code,He=R?.message;if(Be==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Be==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Be==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let at=He?`: ${He}`:"";throw de(`Git pull failed${at}`,"error",3e3),R}}async function nn(E,R){t("setting workspace visibility %s \u2192 %s",E,String(R));try{await ge.send("set-workspace-visibility",{path:E,visible:R}),await on()}catch(Be){t("workspace visibility update failed: %o",Be),de("Failed to update project visibility","error",3e3)}}async function on(){try{let E=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",E),E&&Array.isArray(E.workspaces)){let R=E.workspaces.map(Et=>({path:Et.path,database:Et.database,pid:Et.pid,version:Et.version})),Be=E.current?{path:E.current.root_dir,database:E.current.db_path}:null,He=Array.isArray(E.hidden)?E.hidden.filter(Et=>typeof Et=="string"):[];tt.setState({workspace:{current:Be,available:R,hidden:He}});let at=window.localStorage.getItem("beads-ui.workspace");at&&(!R.some(f=>f.path===at)||He.includes(at)?window.localStorage.removeItem("beads-ui.workspace"):Be&&at!==Be.path&&(t("restoring saved workspace preference: %s",at),await an(at)))}}catch(E){t("failed to load workspaces: %o",E)}}ge.on("workspace-changed",E=>{t("workspace-changed event: %o",E),E&&E.root_dir&&(tt.setState({workspace:{current:{path:E.root_dir,database:E.db_path}}}),on(),Ft())});let Ye=!1;if(typeof ge.onConnection=="function"){let E=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(Ye=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&Ye&&(Ye=!1,de("Reconnected","success",2200),Ov(tt,(Be,He)=>{t(`${Be}: %o`,He)}),Qt())};ge.onConnection(E)}let hn="board";try{let E=window.localStorage.getItem("beads-ui.view");(E==="board"||E==="worker"||E==="monitor")&&(hn=E)}catch(E){t("view parse error: %o",E)}let tt=Wc({config:Rv(),view:hn});ge.on("worker-queue-snapshot",E=>{let R=E;if(!R||!R.queue)return;let Be=tt.getState().workspace.current?.path;if(typeof Be=="string"&&Be.length>0&&R.root_dir!==Be){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{Ue.set(R.queue)}catch{}}),ge.on("worker-parallel-analysis-snapshot",E=>{let R=E;if(!R)return;let Be=tt.getState().workspace.current?.path;if(!(typeof Be=="string"&&Be.length>0&&typeof R.root_dir=="string"&&R.root_dir!==Be))try{mt.set({settings:R.settings,job:R.job??null,runs:Array.isArray(R.runs)?R.runs:[],last_good:R.last_good??null})}catch{}});let Me=Bc(tt);Me.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ye=async(E,R)=>{try{return await Se(E,R)}catch(Be){if(C.has(E))throw Be;return[]}};Wp({global_element:r,repo_element:s},tt,Me);let qe=document.getElementById("workspace-picker");qe&&Nf(qe,tt,an,en,nn);let xt=Kp(e,(E,R)=>Se(E,R));try{let E=document.getElementById("new-issue-btn");E&&E.addEventListener("click",()=>xt.open())}catch{}let jt=Qp(e,{policyStore:ct,queueStore:Ue,implPresetStore:T,transport:(E,R)=>Se(E,R),onOpenChange:E=>{let R=Pt;Pt=E,Kt(),R&&E===!1&&$n.refreshSessionDefaults()},labelOptions:()=>{let E=new Set;for(let[R]of El)for(let Be of ue.snapshotFor(R)||[]){let He=Be.labels;if(Array.isArray(He))for(let at of He)typeof at=="string"&&at.length>0&&E.add(at)}return Array.from(E).sort()}});try{let E=document.getElementById("display-settings-btn");E&&(E.setAttribute("aria-label","\uC124\uC815"),E.setAttribute("title","\uC124\uC815"),E.addEventListener("click",()=>jt.open()))}catch{}let wt=document.createElement("div");wt.className="md-viewer-root",document.body.appendChild(wt);let Bt=ia(wt,{getWorkspacePath:()=>tt.getState().workspace.current?.path}),ln=ou(i,{gotoIssue:E=>Me.gotoIssue(E),issueStores:ue,transport:ye,workerQueueStore:Ue,uiOrderStore:$t,displayPolicyStore:ct,closedRange:Ht,onClosedRangeChange:E=>{P(E)},onNewIssue:()=>xt.open(),openDoc:tn}),$n=xl(l,{transport:ye,issueStores:ue,queueStore:Ue,analysisStore:mt,sessionLogStore:ce,uiOrderStore:$t,gotoIssue:E=>tt.setState({selected_id:E}),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:E=>an(E),openDoc:tn,doneRange:Rt,onDoneRangeChange:E=>{J(E)}}),Ut=Up(u,{transport:ye,pipelineStore:At,execPresetStore:T,sessionLogStore:ce,router:Me,gotoIssue:E=>Me.gotoIssue(E),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:E=>an(E),openDoc:tn}),Cn=Id(d,{issueStores:ue,transport:ye,queueStore:Ue,execPresetStore:T,sessionLogStore:ce,getWorkspacePath:()=>tt.getState().workspace.current?.path,mdViewer:Bt,onNavigate:E=>{tt.getState().view==="worker"?tt.setState({selected_id:E}):Me.gotoIssue(E)},onClose:()=>{let E=tt.getState();tt.setState({selected_id:null});try{Me.gotoView(E.view==="worker"||E.view==="monitor"?E.view:"board")}catch{}},onOpenExecPresets:()=>{jt.open("execution")}}),xn=tt.getState().selected_id;xn&&(d.hidden=!1,Cn.load(xn),we(xn)),tt.subscribe(E=>{let R=E.selected_id;R?(d.hidden=!1,Cn.load(R),Q||we(R)):(Cn.clear(),d.hidden=!0,ot())});let rr=E=>{i.hidden=E.view!=="board",l.hidden=E.view!=="worker",u.hidden=E.view!=="monitor",o&&o.classList.toggle("is-quiet",E.view==="monitor"),Ne(E.view==="board"),Le(E.view==="worker"),Ae(E.view==="monitor"),O(E.view==="board"||E.view==="worker"||Pt||!!E.selected_id),!E.selected_id&&E.view==="board"&&ln.load(),E.view==="worker"&&$n.load(),E.view==="monitor"?Ut.load():Ut.pause(),window.localStorage.setItem("beads-ui.view",E.view)};tt.subscribe(rr),rr(tt.getState()),ie(),he(),bt(),on().finally(()=>{re=!0,gt()}),window.addEventListener("keydown",E=>{let R=E.ctrlKey||E.metaKey,Be=String(E.key||"").toLowerCase(),He=E.target,at=He&&He.tagName?String(He.tagName).toLowerCase():"",Et=at==="input"||at==="textarea"||at==="select"||He&&typeof He.isContentEditable=="boolean"&&He.isContentEditable;R&&Be==="n"&&(Et||(E.preventDefault(),xt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Iv(t)});export{Iv as bootstrap,Rv as readBootstrapConfig,Ov as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
