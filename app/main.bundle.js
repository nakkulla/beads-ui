var g_=Object.create;var Ga=Object.defineProperty;var b_=Object.getOwnPropertyDescriptor;var h_=Object.getOwnPropertyNames;var y_=Object.getPrototypeOf,v_=Object.prototype.hasOwnProperty;var w_=(e,t,n)=>t in e?Ga(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ka=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var k_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of h_(t))!v_.call(e,s)&&s!==n&&Ga(e,s,{get:()=>t[s],enumerable:!(r=b_(t,s))||r.enumerable});return e};var $_=(e,t,n)=>(n=e!=null?g_(y_(e)):{},k_(t||!e||!e.__esModule?Ga(n,"default",{value:e,enumerable:!0}):n,e));var jt=(e,t,n)=>w_(e,typeof t!="symbol"?t+"":t,n);var Ac=Ka((Gv,xc)=>{var Nr=1e3,qr=Nr*60,Fr=qr*60,wr=Fr*24,S_=wr*7,E_=wr*365.25;xc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return T_(e);if(n==="number"&&isFinite(e))return t.long?R_(e):C_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function T_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*E_;case"weeks":case"week":case"w":return n*S_;case"days":case"day":case"d":return n*wr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return n*qr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function C_(e){var t=Math.abs(e);return t>=wr?Math.round(e/wr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=qr?Math.round(e/qr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function R_(e){var t=Math.abs(e);return t>=wr?bo(e,t,wr,"day"):t>=Fr?bo(e,t,Fr,"hour"):t>=qr?bo(e,t,qr,"minute"):t>=Nr?bo(e,t,Nr,"second"):e+" ms"}function bo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Ec=Ka((Kv,Sc)=>{function O_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Ac(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let g=0;for(let h=0;h<d.length;h++)g=(g<<5)-g+d.charCodeAt(h),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(d){let g,h=null,b,v;function N(...U){if(!N.enabled)return;let Y=N,ae=Number(new Date),V=ae-(g||ae);Y.diff=V,Y.prev=g,Y.curr=ae,g=ae,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let q=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(K,L)=>{if(K==="%%")return"%";q++;let I=n.formatters[L];if(typeof I=="function"){let te=U[q];K=I.call(Y,te),U.splice(q,1),q--}return K}),n.formatArgs.call(Y,U),(Y.log||n.log).apply(Y,U)}return N.namespace=d,N.useColors=n.useColors(),N.color=n.selectColor(d),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,v=n.enabled(d)),v),set:U=>{h=U}}),typeof n.init=="function"&&n.init(N),N}function r(d,g){let h=n(this.namespace+(typeof g>"u"?":":g)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let g=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,g){let h=0,b=0,v=-1,N=0;for(;h<d.length;)if(b<g.length&&(g[b]===d[h]||g[b]==="*"))g[b]==="*"?(v=b,N=h,b++):(h++,b++);else if(v!==-1)b=v+1,N++,h=N;else return!1;for(;b<g.length&&g[b]==="*";)b++;return b===g.length}function a(){let d=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),d}function i(d){for(let g of n.skips)if(o(d,g))return!1;for(let g of n.names)if(o(d,g))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Sc.exports=O_});var Tc=Ka((yn,ho)=>{yn.formatArgs=I_;yn.save=P_;yn.load=M_;yn.useColors=L_;yn.storage=D_();yn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();yn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function L_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function I_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ho.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}yn.log=console.debug||console.log||(()=>{});function P_(e){try{e?yn.storage.setItem("debug",e):yn.storage.removeItem("debug")}catch{}}function M_(){let e;try{e=yn.storage.getItem("debug")||yn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function D_(){try{return localStorage}catch{}}ho.exports=Ec()(yn);var{formatters:N_}=ho.exports;N_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var as=globalThis,co=as.trustedTypes,lc=co?co.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ya="$lit$",Vn=`lit$${Math.random().toFixed(9).slice(2)}$`,Za="?"+Vn,x_=`<${Za}>`,br=document,is=()=>br.createComment(""),ls=e=>e===null||typeof e!="object"&&typeof e!="function",Qa=Array.isArray,_c=e=>Qa(e)||typeof e?.[Symbol.iterator]=="function",Va=`[ 	
\f\r]`,os=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cc=/-->/g,uc=/>/g,mr=RegExp(`>|${Va}(?:([^\\s"'>=/]+)(${Va}*=${Va}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dc=/'/g,pc=/"/g,mc=/^(?:script|style|textarea|title)$/i,Xa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Xa(1),us=Xa(2),Fv=Xa(3),Rn=Symbol.for("lit-noChange"),Xt=Symbol.for("lit-nothing"),fc=new WeakMap,gr=br.createTreeWalker(br,129);function gc(e,t){if(!Qa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return lc!==void 0?lc.createHTML(t):t}var bc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=os;for(let i=0;i<n;i++){let l=e[i],u,d,g=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===os?d[1]==="!--"?a=cc:d[1]!==void 0?a=uc:d[2]!==void 0?(mc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=mr):d[3]!==void 0&&(a=mr):a===mr?d[0]===">"?(a=s??os,g=-1):d[1]===void 0?g=-2:(g=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?mr:d[3]==='"'?pc:dc):a===pc||a===dc?a=mr:a===cc||a===uc?a=os:(a=mr,s=void 0);let b=a===mr&&e[i+1].startsWith("/>")?" ":"";o+=a===os?l+x_:g>=0?(r.push(u),l.slice(0,g)+Ya+l.slice(g)+Vn+b):l+Vn+(g===-2?i:b)}return[gc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},cs=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=bc(t,n);if(this.el=e.createElement(u,r),gr.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=gr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Ya)){let h=d[a++],b=s.getAttribute(g).split(Vn),v=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:v[2],strings:b,ctor:v[1]==="."?po:v[1]==="?"?fo:v[1]==="@"?_o:yr}),s.removeAttribute(g)}else g.startsWith(Vn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(mc.test(s.tagName)){let g=s.textContent.split(Vn),h=g.length-1;if(h>0){s.textContent=co?co.emptyScript:"";for(let b=0;b<h;b++)s.append(g[b],is()),gr.nextNode(),l.push({type:2,index:++o});s.append(g[h],is())}}}else if(s.nodeType===8)if(s.data===Za)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Vn,g+1))!==-1;)l.push({type:7,index:o}),g+=Vn.length-1}o++}}static createElement(t,n){let r=br.createElement("template");return r.innerHTML=t,r}};function hr(e,t,n=e,r){if(t===Rn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ls(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=hr(e,s._$AS(e,t.values),s,r)),t}var uo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??br).importNode(n,!0);gr.currentNode=s;let o=gr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Mr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new mo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=gr.nextNode(),a++)}return gr.currentNode=br,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Xt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=hr(this,t,n),ls(t)?t===Xt||t==null||t===""?(this._$AH!==Xt&&this._$AR(),this._$AH=Xt):t!==this._$AH&&t!==Rn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_c(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Xt&&ls(this._$AH)?this._$AA.nextSibling.data=t:this.T(br.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=cs.createElement(gc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new uo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=fc.get(t.strings);return n===void 0&&fc.set(t.strings,n=new cs(t)),n}k(t){Qa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(is()),this.O(is()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Xt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Xt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=hr(this,t,n,0),a=!ls(t)||t!==this._$AH&&t!==Rn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=hr(this,i[r+l],n,l),u===Rn&&(u=this._$AH[l]),a||(a=!ls(u)||u!==this._$AH[l]),u===Xt?t=Xt:t!==Xt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Xt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},po=class extends yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Xt?void 0:t}},fo=class extends yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Xt)}},_o=class extends yr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=hr(this,t,n,0)??Xt)===Rn)return;let r=this._$AH,s=t===Xt&&r!==Xt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Xt&&(r===Xt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){hr(this,t)}},hc={M:Ya,P:Vn,A:Za,C:1,L:bc,R:uo,D:_c,V:hr,I:Mr,H:yr,N:fo,U:_o,B:po,F:mo},A_=as.litHtmlPolyfillSupport;A_?.(cs,Mr),(as.litHtmlVersions??(as.litHtmlVersions=[])).push("3.3.1");var st=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Mr(t.insertBefore(is(),o),o,void 0,n??{})}return s._$AI(e),s};var go="today",yc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Dr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Wn(e){return e==="today"?"today":"7d"}function Ja(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function kc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function $c(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Cc=$_(Tc(),1);function Vt(e){return(0,Cc.default)(`beads-ui:${e}`)}function Mn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kr(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Lc(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function yo(e,t){let n=Mn(e.updated_at),r=Mn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ic(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Mn(e.created_at),o=Mn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Pc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var q_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Rc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=q_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e,t){let n=Rc(e),r=Rc(t);if(n!==r)return n<r?-1:1;let s=Oc(e),o=Oc(t);if(s!==o)return s<o?-1:1;let a=Mn(e&&e.created_at),i=Mn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ei=2**20;function jr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Mn(e&&e.created_at)}function vo(e){return(t,n)=>{let r=jr(t,e),s=jr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ti(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:jr(i,n)-ei};if(!i)return{rank:jr(a,n)+ei};let l=jr(a,n),u=jr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((g,h)=>({bead_id:g.id,rank:h*ei}))}}function ni(e,t={}){let n=Vt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||kr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function g(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let v=Array.isArray(h.issues)?h.issues:[];for(let N of v)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);d(),o=b,u();return}if(h.type==="upsert"){let v=h.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let N=r.get(v.id);if(!N)r.set(v.id,v);else{let U=Number.isFinite(N.updated_at)?N.updated_at:0,Y=Number.isFinite(v.updated_at)?v.updated_at:0;if(U<=Y){for(let ae of Object.keys(N))ae in v||delete N[ae];for(let[ae,V]of Object.entries(v))N[ae]=V}}d()}o=b,u()}else if(h.type==="delete"){let v=String(h.issue_id||"");v&&(r.delete(v),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function wo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Dc(e){let t=Vt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let v=n.get(b);if(!v)continue;let N=v.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&N.set(U,!0);for(let U of g)typeof U=="string"&&U.length>0&&N.set(U,!0);for(let U of h)typeof U=="string"&&U.length>0&&N.delete(U)}}async function o(i,l){let u=wo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let g=n.get(i);if(g&&g.key!==u){let h=r.get(g.key);h&&(h.delete(i),h.size===0&&r.delete(g.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(g){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),g}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let g=n.get(i)||null;if(g){let h=r.get(g.key);h&&(h.delete(i),h.size===0&&r.delete(g.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:wo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Nc(){let e=Vt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let g=u?wo(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),b&&h&&g&&h!==g){let v=t.get(l);if(v)try{v.dispose()}catch{}let N=s.get(l);if(N){try{N()}catch{}s.delete(l)}let U=ni(l,d);t.set(l,U);let Y=U.subscribe(()=>o());s.set(l,Y)}else if(!b){let v=ni(l,d);t.set(l,v);let N=v.subscribe(()=>o());s.set(l,N)}return n.set(l,g),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function jc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ri(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function F_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function j_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Bc(e){let t=Vt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):F_(r),a=j_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ri(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ri(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var B_=Object.freeze({workspace_config:{default_workspace:null}});function Uc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:B_.workspace_config.default_workspace}}}function Wc(e={}){let t=Vt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Uc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Uc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function zc(e){let t=Vt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,h)=>{let b=s++,v=Date.now();r.set(b,{type:g,start_ts:v}),t("request start id=%d type=%s count=%d",b,g,n+1),a();let N=!1,U=()=>{N||(N=!0,r.delete(b),i())},Y=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,g,Date.now()-v),U())},3e4);try{let ae=await u(g,h),V=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",b,g,V),ae}catch(ae){let V=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,g,V,ae),ae}finally{clearTimeout(Y),U()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,g])=>({id:d,type:g.type,elapsed_ms:u-g.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function ko(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Pc),l;switch(i){case"created_desc":return l.sort(kr),l;case"created_asc":return l.sort(Lc),l;case"updated_desc":return l.sort(yo),l;case"priority":return l.sort(Ic),l;case"manual":default:{let u=n();return u?l.sort(vo(u)):l.sort(kr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function zn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function cn(e){let t=zn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function vn(e,t){let n=zn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Hc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=zn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function $o(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function xo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=$o(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ao(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Hc(n);return{total:n.length,count:r,current:s,children:n}}function So(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ti(i,l,u.order),a);s(u,d);let g=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(h);let b=r(ti(i,l,h.order),a);s(h,b);let v=await t("ui-order-set",{expected_revision:h.revision,entries:b});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Gc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Eo(e,t){let n=Gc(e),r=Gc(t);return n.length===0||r.length===0?!1:n!==r}function To(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function si(e,t){return!t||typeof e!="string"||e.length===0||To(t.visible_labels).includes(e)?!0:To(t.hidden_labels).includes(e)?!1:!To(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Kc(e,t){return To(e).filter(n=>si(n,t))}function or(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function U_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function W_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function z_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${U_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Co(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Mc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?W_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>z_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var H_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Yc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Vc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},G_={review:"\u2713",skip:"\u2298"},ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function K_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Zc(e){let t=e&&e.fill||"none";return t==="none"?ar.none:e&&e.stale===!0?ar.stale:t==="dim"?ar.dim:e&&e.glyph==="review"?ar.review:e&&e.glyph==="skip"?ar.skip:ar.done}function V_(e){if(!e||e.fill==="none"||!e.approval_state)return Zc(e);let t=[];return e.glyph==="review"?t.push(ar.review):e.glyph==="skip"&&t.push(ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Y_(e,t,n,r){let s=H_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=G_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",g=Yc[e]||e,h=r?Qc(t):null;if(!h)return c`
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
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function Qc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ro(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Vc[e.route]||Vc.spec_backed,o=e.stages,a=K_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Yc[u]||u} ${u==="plan"?V_(o[u]||{}):Zc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Qc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>Y_(u,o[u]||{},u===a,r))}
    </div>
  `}function Z_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Xc=2;function Jc(e){let t=e.slice(0,Xc).join(", "),n=e.length-Xc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Q_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Eo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Jc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Jc(o)}</span
      >`),n}function oi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Oo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Yn(e){return`${e.kind}:${Oo(e)}@${e.sha}`}function Lo(e,t){if(!e)return null;let n=oi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=oi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Yn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function eu(e,t){let n=Lo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function X_(e){if(!e)return null;let t=oi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Yn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function J_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&or(n,"route")){let i=r.route_source==="derived";s.push(c`<span
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
      </button>`),or(n,"blocked")&&s.push(...Q_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&or(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function em(e){let t=vn(e.created_at),n=vn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function tm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Co(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:em(e),empty_label:"children \uC5C6\uC74C",childChips:ai,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ai(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Lo(t,n)?c`<span class="board-card__roll-child-chips">
    ${eu(t,n)}
    ${X_(n)}
  </span>`:null}function Io(e,t){let n=Z_(e.priority);return c`
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
      ${J_(e,t)}
      ${e.workflow&&or(t.policy||null,"stepper")?Ro(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${tm(e,t)}
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
  `}var nm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],rm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],sm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function om(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${nm.map(r=>c`<option
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
        ${rm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${om(e,t,n)}
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
        ${sm.map(r=>c`<option
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
  `}var am=200,im={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},lm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ru="beads-ui.board.sort",su=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function cm(){try{let e=window.localStorage.getItem(ru);if(e&&su.has(e))return e}catch{}return"created_desc"}function ou(e,t){let n=Vt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,g=t.openDoc,h=t.closedRange||go,b=s?ko(s,a):null,v=So({transport:o,uiOrderStore:a}),N=[],U=[],Y=[],ae=[],V=[],q=[],D=!1,K=0,L=cm(),I=new Map,te=new Map,Ae=new Map,ke=new Set,_e={search:"",priority:"",type:"",labels:[]},ie=!1,Ce=null;function De(E){return String(E.status||"open")==="open"}function $e(E){let H=String(E.status||"open");return H==="open"||H==="blocked"}function ee(E){let H=_e.search.trim().toLowerCase(),Pe=_e.priority,x=_e.type,S=_e.labels;return E.filter(X=>{if(H){let me=String(X.id||"").toLowerCase(),Se=String(X.title||"").toLowerCase();if(!me.includes(H)&&!Se.includes(H))return!1}if(Pe!==""&&String(X.priority)!==Pe||x!==""&&String(X.issue_type||"")!==x)return!1;if(S.length>0){let me=Array.isArray(X.labels)?X.labels:[];if(!S.some(Se=>me.includes(Se)))return!1}return!0})}function Z(){let E=new Set;for(let H of[N,U,Y,ae,V,q])for(let Pe of H){let x=Array.isArray(Pe.labels)?Pe.labels:[];for(let S of x)typeof S=="string"&&S.length>0&&E.add(S)}return Array.from(E).sort()}function Re(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function z(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",L),H=b.selectBoardColumn("tab:board:blocked","blocked",L).filter($e),Pe=new Set(E.map(B=>B.id)),x=b.selectBoardColumn("tab:board:ready","ready",L).filter(B=>De(B)&&!Pe.has(B.id)),S=b.selectBoardColumn("tab:board:resolved","resolved",L),X=b.selectBoardColumn("tab:board:deferred","deferred",L),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,am),Se=[...H,...x,...E,...S,...me];ne(Se);let ge=new Set;for(let B of Se)B&&B.id&&!$o(B)&&ge.add(B.id);let A=!Re();N=A?ds(H,ge):H,U=A?ds(x,ge):x,Y=A?ds(E,ge):E,ae=A?ds(S,ge):S,V=X,K=X.length,q=A?ds(me,ge):me,I=new Map;for(let B of N)I.set(B.id,"open");for(let B of U)I.set(B.id,"open");for(let B of Y)I.set(B.id,"in_progress");for(let B of ae)I.set(B.id,"resolved");for(let B of V)I.set(B.id,"deferred");for(let B of q)I.set(B.id,"closed");te=new Map;for(let B of N)te.set(B.id,"blocked-col");for(let B of U)te.set(B.id,"ready-col");for(let B of Y)te.set(B.id,"in-progress-col");for(let B of ae)te.set(B.id,"resolved-col");for(let B of q)te.set(B.id,"closed-col")}mt()}catch{N=[],U=[],Y=[],ae=[],V=[],q=[],Ae=new Map,mt()}}function ne(E){Ae=xo(E)}function be(E){return Ao(Ae,E)}function Ee(E){return!ke.has(E)}function Ze(E,H){E.preventDefault(),E.stopPropagation(),ke.has(H)?ke.delete(H):ke.add(H),mt()}function ce(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function Ue(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function gt(E,H){Ce||r(H)}function At(E,H){E.preventDefault(),E.stopPropagation(),um(H).then(Pe=>{Pe&&de("\uBCF5\uC0AC\uB428","success",1200)})}function $t(E,H){Ce=H,E.dataTransfer&&(E.dataTransfer.setData("text/plain",H),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function dt(E){E.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Ce=null},0)}function R(E){let H=String(E.target.value||"");!H||H===h||(h=H,u&&u(H),mt())}function le(){return i?i.get():null}function Me(E){let H=l?l.get():null,Pe=H?H.cleanup_failed:null;if(!Pe||typeof Pe!="object"||Array.isArray(Pe))return null;let x=Pe[E];return!x||typeof x!="object"||Array.isArray(x)?null:x}let Ne={onCardClick:gt,onCopyId:At,onDragStart:$t,onDragEnd:dt,onClosedRangeChange:R,rollupFor:be,isExpanded:Ee,onRollupToggle:Ze,onChildClick:ce,onFromChipClick:Ue,onOpenDoc:g?(E,H)=>g(H):void 0,cleanupFailureFor:Me,get policy(){return le()}};function Qe(E,H){Ce||(we(),r(H))}function rt(E,H){E.preventDefault(),E.stopPropagation(),we(),r(H)}let bt={...Ne,onCardClick:Qe,onChildClick:rt,onFromChipClick:rt,onOpenDoc:g?(E,H)=>{we(),g(H)}:void 0,get policy(){return le()}};function ht(E){let H=E.target,Pe=e.querySelector(".board-filter__labels");H&&Pe&&Pe.contains(H)||je()}function re(E){E.key==="Escape"&&je()}function Q(){ie||(ie=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",re),mt())}function je(){ie&&(ie=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",re),mt())}function ot(E){E.key==="Escape"&&we()}function ze(){D||(D=!0,document.addEventListener("keydown",ot),mt())}function we(){D&&(D=!1,document.removeEventListener("keydown",ot),mt())}let Ke={onClose:we,onOverlayClick(E){E.target===E.currentTarget&&we()}},ct={onSearchInput(E){_e.search=String(E.target.value||""),z()},onPriorityChange(E){_e.priority=String(E.target.value||""),z()},onTypeChange(E){_e.type=String(E.target.value||""),z()},onSortChange(E){let H=String(E.target.value||"");if(!(!su.has(H)||H===L)){L=H;try{window.localStorage.setItem(ru,H)}catch{}z()}},onDeferredToggle(){D?we():ze()},onLabelMenuToggle(){ie?je():Q()},onLabelToggle(E){let H=_e.labels.indexOf(E);H===-1?_e.labels.push(E):_e.labels.splice(H,1),z()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],z())},onNewIssue(){d&&d()}};function _t(){return c`
      <div class="board-view">
        ${nu(_e,ct,{sort_mode:L,deferred_popup_open:D,deferred_count:K,label_options:Z(),label_menu_open:ie})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:ee(N)},Ne)}
          ${Br({title:"Ready",id:"ready-col",items:ee(U)},Ne)}
          ${Br({title:"In progress",id:"in-progress-col",items:ee(Y)},Ne)}
          ${Br({title:"Resolved",id:"resolved-col",items:ee(ae)},Ne)}
          ${Br({title:"Closed",id:"closed-col",items:ee(q),is_closed:!0,closed_range:h},Ne)}
        </div>
        ${D?tu({items:ee(V),count:K},bt,Ke):""}
      </div>
    `}function mt(){st(_t(),e),Mt()}function Mt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Pe of H)Array.from(Pe.querySelectorAll(".board-card")).forEach((S,X)=>{S.tabIndex=X===0?0:-1})}catch{}}async function Yt(E,H){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:H}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Pe){n("update-status failed: %o",Pe),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Gt(E){switch(E){case"blocked-col":return N;case"ready-col":return U;case"in-progress-col":return Y;case"resolved-col":return ae;default:return[]}}function Ot(E,H,Pe){if(!o||!a)return;let x=Gt(E),S=x.find(A=>A.id===H);if(!S)return;let X=x.filter(A=>A.id!==H),me=Pe.closest?Pe.closest(".board-card"):null,Se=X.length;if(me){let A=me.getAttribute("data-issue-id");if(A===H)return;let B=X.findIndex(xe=>xe.id===A);B>=0&&(Se=B)}let ge=X.slice();ge.splice(Se,0,S),v.applyReorder(H,ge,Se)}function It(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let et=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Pe=E.target.closest(".board-column");Pe&&Pe!==et&&(et&&et.classList.remove("board-column--drag-over"),Pe.classList.add("board-column--drag-over"),et=Pe)}),e.addEventListener("dragleave",E=>{let H=E.relatedTarget;(!H||!e.contains(H))&&et&&(et.classList.remove("board-column--drag-over"),et=null)}),e.addEventListener("drop",E=>{E.preventDefault(),et&&(et.classList.remove("board-column--drag-over"),et=null);let H=E.target,Pe=H.closest(".board-column");if(!Pe)return;let x=E.dataTransfer?.getData("text/plain")||"";if(!x)return;let S=Pe.id,X=te.get(x);if(X&&X===S){if(lm.has(S)){if(L!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ot(S,x,H)}return}let me=im[S];if(!me){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get(x)!==me&&Yt(x,me)}),e.addEventListener("keydown",E=>{let H=E.target;if(!(H instanceof HTMLElement))return;let Pe=String(H.tagName||"").toLowerCase();if(Pe==="input"||Pe==="textarea"||Pe==="select"||Pe==="button"||Pe==="a"||H.isContentEditable===!0)return;let x=H.closest(".board-card");if(!x)return;let S=String(E.key||"");if(S==="Enter"||S===" "){E.preventDefault();let ge=x.getAttribute("data-issue-id");ge&&r(ge);return}if(S!=="ArrowUp"&&S!=="ArrowDown"&&S!=="ArrowLeft"&&S!=="ArrowRight")return;E.preventDefault();let X=x.closest(".board-column");if(!X)return;let me=Array.from(X.querySelectorAll(".board-card")),Se=me.indexOf(x);if(S==="ArrowDown"&&Se<me.length-1){qe(x,me[Se+1]);return}if(S==="ArrowUp"&&Se>0){qe(x,me[Se-1]);return}if(S==="ArrowLeft"||S==="ArrowRight"){let ge=Array.from(e.querySelectorAll(".board-column")),A=ge.indexOf(X),B=S==="ArrowRight"?1:-1,xe=A+B;for(;xe>=0&&xe<ge.length;){let Ve=ge[xe].querySelector(".board-card");if(Ve){qe(x,Ve);return}xe+=B}}});function qe(E,H){try{E.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{z()}catch{}}));let J=null;i&&i.subscribe&&(J=i.subscribe(()=>{try{z()}catch{}}));let ve=null;return l&&l.subscribe&&(ve=l.subscribe(()=>{mt()})),{async load(){n("load"),z()},clear(){je(),we(),P&&(P(),P=null),J&&(J(),J=null),ve&&(ve(),ve=null),e.replaceChildren(),N=[],U=[],Y=[],ae=[],V=[],q=[],I=new Map,te=new Map}}}function ds(e,t){return e.filter(n=>{let r=$o(n);return!(r&&t.has(r))})}async function um(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function $r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ps(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function dm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${$r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${$r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Zn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await dm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var pm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],au={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},fm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Zt(e){return typeof e=="string"&&e.length>0?e:null}function Ur(e){return e.startsWith("gpt-")?e.slice(4):e}function zt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function lu(e,t,n){let r=Zt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Zt(n[e]);return s===null?null:{value:s,source:"global"}}function fs(e,t,n,r){return lu(e,t,n)||{value:r,source:"base"}}function ii(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let a=Zt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let a of Object.values(s))if(sn(a)){let i=Zt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Zt(r?.runners?.[o]?.models?.[e]?.id)||e}function _m(e,t){return Zt(t?.review?.reviewers?.[e]?.model)||e}function Wr(e,t,n=!1){if(e==="default")return zt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Ur(e):e;return zt(e,t,r,e,"explicit")}function cu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function mm(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function gm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of mm(t,n)){let o=cu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function li(e){return zt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function iu(e,t,n){let r=lu(e,t,n);return r?Wr(r.value,r.source):zt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function wn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,a=sn(e.runner_catalog)?e.runner_catalog:null,i=Zt(n.quick_fix_impl_model),l=gm(i,s,a),u={};if(s){let d=fs("workflow_mode",t,n,Zt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?zt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Wr(d.value,d.source);for(let V of["spec_review","plan_review","impl_review"]){let q=`${V}_model`,D=Zt(V==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),K=fs(q,t,n,D);if(K.value===null)u[q]=zt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(K.value!=="self"&&K.value!=="skip"&&!sn(s.review?.reviewers?.[K.value]))u[q]=li(zt(K.value,K.source,"",null,"explicit"));else{let L=_m(K.value,s);u[q]=zt(K.value,K.source,Ur(L),L,K.source==="base"?"default":"explicit")}}for(let[V,q]of Object.entries(au)){let D=u[q].value;if(D==="self"||D==="skip"){u[V]=zt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let K=Zt(s.review?.reviewers?.[D||""]?.effort),L=fs(V,t,n,K);u[V]=L.value===null?zt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):zt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let g=sn(s.implementation?.default)?s.implementation.default:{},h=Zt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),v=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=b&&sn(v[h])?v[h]:{};for(let V of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=fs(V,t,n,V==="impl_dispatch"?Zt(N.dispatch)||Zt(g.dispatch):Zt(g[V.replace("impl_","")]));u[V]=q.value===null?zt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):zt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let U=Zt(t.impl_runtime),Y=U==="inherit"?Zt(e.controller_runtime):U,ae=h==="quick_fix"&&Zt(t.impl_dispatch)===null&&l.runtime!==null&&(U===null||Y===l.runtime);if(ae){let V=l.runtime,q=i;u.impl_dispatch=zt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=zt(V,"global",`${V} (\uC720\uB3C4)`,V,"explicit")),Zt(t.impl_model)===null&&(u.impl_model=zt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let V of["impl_runtime","impl_model","impl_effort","impl_speed"])u[V]=zt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let V=u.impl_runtime.value==="inherit"?Zt(e.controller_runtime):u.impl_runtime.value,q=V?cu(V,s,a):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=li(u.impl_model);else{let D=ii(u.impl_model.value,V,s,a);u.impl_model.display=Ur(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let V=Zt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=V?Zt(s.implementation?.effort_by_transport?.[V]?.auto):null;q&&!fm.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?zt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",u.impl_speed.source))}}else for(let d of pm.filter(g=>!g.startsWith("orchestration_")))u[d]=iu(d,t,n);if(!s){for(let[d,g]of Object.entries(au))(u[g].value==="self"||u[g].value==="skip")&&(u[d]=zt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=zt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=iu(d,t,n);continue}let g=d.replace("orchestration_",""),h=Zt(o[g]),b=fs(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=zt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=zt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let v=b.source==="base"?Zt(o.model_id)||b.value:ii(b.value,null,s,a);u[d]=zt(b.value,b.source,Ur(v),v,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?zt("default","base","default (\uC77C\uBC18)","default","default"):Wr("default",b.source);continue}u[d]=Wr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=zt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Ur(d)})`,null,"default")}else if(l.runtime!==null){let d=ii(i,l.runtime,s,a);u.quick_fix_impl_model=zt(i,"global",Ur(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=li(zt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Wr(i,"global");return u}function bm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Po(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let h={...r,...g};return wn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Zt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:bm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(g=>{let h=s({...o,[e.key]:g})[e.key];return{value:g,label:h.display,full_value:h.full_value}})}}function zr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(g))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),d())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ci(e){return`session:${e.provider}:${e.session_id}`}function _s(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function hm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Hr(e,t,n,r){return{attempt_id:ci(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:_s(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:hm(e,n)}}}var ui="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ym="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",uu="\uBD84\uD574 \uC5C6\uB294 leg";function en(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Gn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gr=[...Gn,"reasoning_output_tokens"],vm={codex:["implementation","review-consult"],claude:["subagent"]};function di(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Gn.some(t=>Number.isFinite(e[t]))}function wm(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))}function pi(e){let t=0;for(let n of Gn)t+=en(e?.[n]);return t}function km(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function du(e){return!e||typeof e!="object"?!1:Gr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function $m(e){let t={};for(let n of Gr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function pu(e){let t={};for(let n of Gr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function fu(e,t){return di(t)?en(t.total_tokens):e==="codex"?en(t.input_tokens)+en(t.output_tokens):pi(t)}function xm(e){return e==="claude"?"Claude":"Codex"}function Am(e){return`\u03C4 ${mu(e)}`}function Sm(e,t){let n=t.breakdown||{},r=en(t.total_only_subtotal);if(di(n)||r>0&&!wm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,ym];return t.replayed&&u.push(ui),u.join(`
`)}let s=[`\uC785\uB825 ${en(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${en(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${en(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${en(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${en(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${en(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${en(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${uu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${uu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ui),l.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${xm(n)} ${Am(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Sm(n,r)})}return t}function Do(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=en(i.total_only_subtotal)+en(a.total_only_subtotal));for(let l of Gr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=en(i.breakdown[l])+en(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function fi(e){return!e||typeof e!="object"?null:On({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Em(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:$m(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Mo(e,t,n){e.subtotal+=t.subtotal,di(t.usage)&&(e.total_only+=t.subtotal);for(let r of Gr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=en(e.breakdown[r])+en(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function _u(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function mu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return km(e)?`\u03C4 ${mu(pi(e))}`:null}function Qn(e){let t=Kr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ms(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${en(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${en(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${en(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${en(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${pi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ui),n.join(`
`)}function On(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(du(l)){let d=Em(i.runner),g=pu(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:g,subtotal:fu(d,g)};g.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Mo(n[d],h,!0),Mo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let g=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!vm[g].includes(d.role)||!du(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=pu(d.usage),v={provider:g,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:fu(g,b)};v.receipt_id=h,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),b.replayed===!0&&(v.replayed=!0),Mo(n[g],v,!1),Mo(r[v.role][g],v,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=_u(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={..._u(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:xu,setPrototypeOf:gu,isFrozen:Tm,getPrototypeOf:Cm,getOwnPropertyDescriptor:Rm}=Object,{freeze:gn,seal:Ln,create:vi}=Object,{apply:wi,construct:ki}=typeof Reflect<"u"&&Reflect;gn||(gn=function(t){return t});Ln||(Ln=function(t){return t});wi||(wi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ki||(ki=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var No=bn(Array.prototype.forEach),Om=bn(Array.prototype.lastIndexOf),bu=bn(Array.prototype.pop),gs=bn(Array.prototype.push),Lm=bn(Array.prototype.splice),Fo=bn(String.prototype.toLowerCase),_i=bn(String.prototype.toString),mi=bn(String.prototype.match),bs=bn(String.prototype.replace),Im=bn(String.prototype.indexOf),Pm=bn(String.prototype.trim),Dn=bn(Object.prototype.hasOwnProperty),mn=bn(RegExp.prototype.test),hs=Mm(TypeError);function bn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return wi(e,t,r)}}function Mm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ki(e,n)}}function kt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fo;gu&&gu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Tm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Dm(e){for(let t=0;t<e.length;t++)Dn(e,t)||(e[t]=null);return e}function Xn(e){let t=vi(null);for(let[n,r]of xu(e))Dn(e,n)&&(Array.isArray(r)?t[n]=Dm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Xn(r):t[n]=r);return t}function ys(e,t){for(;e!==null;){let r=Rm(e,t);if(r){if(r.get)return bn(r.get);if(typeof r.value=="function")return bn(r.value)}e=Cm(e)}function n(){return null}return n}var hu=gn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gi=gn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bi=gn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nm=gn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),hi=gn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qm=gn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),yu=gn(["#text"]),vu=gn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yi=gn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wu=gn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),qo=gn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Fm=Ln(/\{\{[\w\W]*|[\w\W]*\}\}/gm),jm=Ln(/<%[\w\W]*|[\w\W]*%>/gm),Bm=Ln(/\$\{[\w\W]*/gm),Um=Ln(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wm=Ln(/^aria-[\-\w]+$/),Au=Ln(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),zm=Ln(/^(?:\w+script|data):/i),Hm=Ln(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Su=Ln(/^html$/i),Gm=Ln(/^[a-z][.\w]*(-[.\w]+)+$/i),ku=Object.freeze({__proto__:null,ARIA_ATTR:Wm,ATTR_WHITESPACE:Hm,CUSTOM_ELEMENT:Gm,DATA_ATTR:Um,DOCTYPE_NAME:Su,ERB_EXPR:jm,IS_ALLOWED_URI:Au,IS_SCRIPT_OR_DATA:zm,MUSTACHE_EXPR:Fm,TMPLIT_EXPR:Bm}),vs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Km=function(){return typeof window>"u"?null:window},Vm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},$u=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Eu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Km(),t=Ie=>Eu(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==vs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:b}=e,v=l.prototype,N=ys(v,"cloneNode"),U=ys(v,"remove"),Y=ys(v,"nextSibling"),ae=ys(v,"childNodes"),V=ys(v,"parentNode");if(typeof a=="function"){let Ie=n.createElement("template");Ie.content&&Ie.content.ownerDocument&&(n=Ie.content.ownerDocument)}let q,D="",{implementation:K,createNodeIterator:L,createDocumentFragment:I,getElementsByTagName:te}=n,{importNode:Ae}=r,ke=$u();t.isSupported=typeof xu=="function"&&typeof V=="function"&&K&&K.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:ie,TMPLIT_EXPR:Ce,DATA_ATTR:De,ARIA_ATTR:$e,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:Re}=ku,{IS_ALLOWED_URI:z}=ku,ne=null,be=kt({},[...hu,...gi,...bi,...hi,...yu]),Ee=null,Ze=kt({},[...vu,...yi,...wu,...qo]),ce=Object.seal(vi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ue=null,gt=null,At=Object.seal(vi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),$t=!0,dt=!0,R=!1,le=!0,Me=!1,Ne=!0,Qe=!1,rt=!1,bt=!1,ht=!1,re=!1,Q=!1,je=!0,ot=!1,ze="user-content-",we=!0,Ke=!1,ct={},_t=null,mt=kt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Mt=null,Yt=kt({},["audio","video","img","source","image","track"]),Gt=null,Ot=kt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),It="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",qe="http://www.w3.org/1999/xhtml",P=qe,J=!1,ve=null,E=kt({},[It,et,qe],_i),H=kt({},["mi","mo","mn","ms","mtext"]),Pe=kt({},["annotation-xml"]),x=kt({},["title","style","font","a","script"]),S=null,X=["application/xhtml+xml","text/html"],me="text/html",Se=null,ge=null,A=n.createElement("form"),B=function(C){return C instanceof RegExp||C instanceof Function},xe=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ge&&ge===C)){if((!C||typeof C!="object")&&(C={}),C=Xn(C),S=X.indexOf(C.PARSER_MEDIA_TYPE)===-1?me:C.PARSER_MEDIA_TYPE,Se=S==="application/xhtml+xml"?_i:Fo,ne=Dn(C,"ALLOWED_TAGS")?kt({},C.ALLOWED_TAGS,Se):be,Ee=Dn(C,"ALLOWED_ATTR")?kt({},C.ALLOWED_ATTR,Se):Ze,ve=Dn(C,"ALLOWED_NAMESPACES")?kt({},C.ALLOWED_NAMESPACES,_i):E,Gt=Dn(C,"ADD_URI_SAFE_ATTR")?kt(Xn(Ot),C.ADD_URI_SAFE_ATTR,Se):Ot,Mt=Dn(C,"ADD_DATA_URI_TAGS")?kt(Xn(Yt),C.ADD_DATA_URI_TAGS,Se):Yt,_t=Dn(C,"FORBID_CONTENTS")?kt({},C.FORBID_CONTENTS,Se):mt,Ue=Dn(C,"FORBID_TAGS")?kt({},C.FORBID_TAGS,Se):Xn({}),gt=Dn(C,"FORBID_ATTR")?kt({},C.FORBID_ATTR,Se):Xn({}),ct=Dn(C,"USE_PROFILES")?C.USE_PROFILES:!1,$t=C.ALLOW_ARIA_ATTR!==!1,dt=C.ALLOW_DATA_ATTR!==!1,R=C.ALLOW_UNKNOWN_PROTOCOLS||!1,le=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=C.SAFE_FOR_TEMPLATES||!1,Ne=C.SAFE_FOR_XML!==!1,Qe=C.WHOLE_DOCUMENT||!1,ht=C.RETURN_DOM||!1,re=C.RETURN_DOM_FRAGMENT||!1,Q=C.RETURN_TRUSTED_TYPE||!1,bt=C.FORCE_BODY||!1,je=C.SANITIZE_DOM!==!1,ot=C.SANITIZE_NAMED_PROPS||!1,we=C.KEEP_CONTENT!==!1,Ke=C.IN_PLACE||!1,z=C.ALLOWED_URI_REGEXP||Au,P=C.NAMESPACE||qe,H=C.MATHML_TEXT_INTEGRATION_POINTS||H,Pe=C.HTML_INTEGRATION_POINTS||Pe,ce=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&B(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&B(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Me&&(dt=!1),re&&(ht=!0),ct&&(ne=kt({},yu),Ee=[],ct.html===!0&&(kt(ne,hu),kt(Ee,vu)),ct.svg===!0&&(kt(ne,gi),kt(Ee,yi),kt(Ee,qo)),ct.svgFilters===!0&&(kt(ne,bi),kt(Ee,yi),kt(Ee,qo)),ct.mathMl===!0&&(kt(ne,hi),kt(Ee,wu),kt(Ee,qo))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?At.tagCheck=C.ADD_TAGS:(ne===be&&(ne=Xn(ne)),kt(ne,C.ADD_TAGS,Se))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?At.attributeCheck=C.ADD_ATTR:(Ee===Ze&&(Ee=Xn(Ee)),kt(Ee,C.ADD_ATTR,Se))),C.ADD_URI_SAFE_ATTR&&kt(Gt,C.ADD_URI_SAFE_ATTR,Se),C.FORBID_CONTENTS&&(_t===mt&&(_t=Xn(_t)),kt(_t,C.FORBID_CONTENTS,Se)),we&&(ne["#text"]=!0),Qe&&kt(ne,["html","head","body"]),ne.table&&(kt(ne,["tbody"]),delete Ue.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw hs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw hs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=C.TRUSTED_TYPES_POLICY,D=q.createHTML("")}else q===void 0&&(q=Vm(b,s)),q!==null&&typeof D=="string"&&(D=q.createHTML(""));gn&&gn(C),ge=C}},Ve=kt({},[...gi,...bi,...Nm]),pe=kt({},[...hi,...qm]),Xe=function(C){let ye=V(C);(!ye||!ye.tagName)&&(ye={namespaceURI:P,tagName:"template"});let Fe=Fo(C.tagName),xt=Fo(ye.tagName);return ve[C.namespaceURI]?C.namespaceURI===et?ye.namespaceURI===qe?Fe==="svg":ye.namespaceURI===It?Fe==="svg"&&(xt==="annotation-xml"||H[xt]):!!Ve[Fe]:C.namespaceURI===It?ye.namespaceURI===qe?Fe==="math":ye.namespaceURI===et?Fe==="math"&&Pe[xt]:!!pe[Fe]:C.namespaceURI===qe?ye.namespaceURI===et&&!Pe[xt]||ye.namespaceURI===It&&!H[xt]?!1:!pe[Fe]&&(x[Fe]||!Ve[Fe]):!!(S==="application/xhtml+xml"&&ve[C.namespaceURI]):!1},St=function(C){gs(t.removed,{element:C});try{V(C).removeChild(C)}catch{U(C)}},yt=function(C,ye){try{gs(t.removed,{attribute:ye.getAttributeNode(C),from:ye})}catch{gs(t.removed,{attribute:null,from:ye})}if(ye.removeAttribute(C),C==="is")if(ht||re)try{St(ye)}catch{}else try{ye.setAttribute(C,"")}catch{}},Ft=function(C){let ye=null,Fe=null;if(bt)C="<remove></remove>"+C;else{let wt=mi(C,/^[\r\n\t ]+/);Fe=wt&&wt[0]}S==="application/xhtml+xml"&&P===qe&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let xt=q?q.createHTML(C):C;if(P===qe)try{ye=new h().parseFromString(xt,S)}catch{}if(!ye||!ye.documentElement){ye=K.createDocument(P,"template",null);try{ye.documentElement.innerHTML=J?D:xt}catch{}}let Bt=ye.body||ye.documentElement;return C&&Fe&&Bt.insertBefore(n.createTextNode(Fe),Bt.childNodes[0]||null),P===qe?te.call(ye,Qe?"html":"body")[0]:Qe?ye.documentElement:Bt},Jt=function(C){return L.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Lt=function(C){return C instanceof g&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},_n=function(C){return typeof i=="function"&&C instanceof i};function Kt(Ie,C,ye){No(Ie,Fe=>{Fe.call(t,C,ye,ge)})}let nn=function(C){let ye=null;if(Kt(ke.beforeSanitizeElements,C,null),Lt(C))return St(C),!0;let Fe=Se(C.nodeName);if(Kt(ke.uponSanitizeElement,C,{tagName:Fe,allowedTags:ne}),Ne&&C.hasChildNodes()&&!_n(C.firstElementChild)&&mn(/<[/\w!]/g,C.innerHTML)&&mn(/<[/\w!]/g,C.textContent)||C.nodeType===vs.progressingInstruction||Ne&&C.nodeType===vs.comment&&mn(/<[/\w]/g,C.data))return St(C),!0;if(!(At.tagCheck instanceof Function&&At.tagCheck(Fe))&&(!ne[Fe]||Ue[Fe])){if(!Ue[Fe]&&Ye(Fe)&&(ce.tagNameCheck instanceof RegExp&&mn(ce.tagNameCheck,Fe)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(Fe)))return!1;if(we&&!_t[Fe]){let xt=V(C)||C.parentNode,Bt=ae(C)||C.childNodes;if(Bt&&xt){let wt=Bt.length;for(let Ut=wt-1;Ut>=0;--Ut){let tn=N(Bt[Ut],!0);tn.__removalCount=(C.__removalCount||0)+1,xt.insertBefore(tn,Y(C))}}}return St(C),!0}return C instanceof l&&!Xe(C)||(Fe==="noscript"||Fe==="noembed"||Fe==="noframes")&&mn(/<\/no(script|embed|frames)/i,C.innerHTML)?(St(C),!0):(Me&&C.nodeType===vs.text&&(ye=C.textContent,No([_e,ie,Ce],xt=>{ye=bs(ye,xt," ")}),C.textContent!==ye&&(gs(t.removed,{element:C.cloneNode()}),C.textContent=ye)),Kt(ke.afterSanitizeElements,C,null),!1)},on=function(C,ye,Fe){if(je&&(ye==="id"||ye==="name")&&(Fe in n||Fe in A))return!1;if(!(dt&&!gt[ye]&&mn(De,ye))){if(!($t&&mn($e,ye))){if(!(At.attributeCheck instanceof Function&&At.attributeCheck(ye,C))){if(!Ee[ye]||gt[ye]){if(!(Ye(C)&&(ce.tagNameCheck instanceof RegExp&&mn(ce.tagNameCheck,C)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(C))&&(ce.attributeNameCheck instanceof RegExp&&mn(ce.attributeNameCheck,ye)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(ye,C))||ye==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&mn(ce.tagNameCheck,Fe)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(Fe))))return!1}else if(!Gt[ye]){if(!mn(z,bs(Fe,Z,""))){if(!((ye==="src"||ye==="xlink:href"||ye==="href")&&C!=="script"&&Im(Fe,"data:")===0&&Mt[C])){if(!(R&&!mn(ee,bs(Fe,Z,"")))){if(Fe)return!1}}}}}}}return!0},Ye=function(C){return C!=="annotation-xml"&&mi(C,Re)},an=function(C){Kt(ke.beforeSanitizeAttributes,C,null);let{attributes:ye}=C;if(!ye||Lt(C))return;let Fe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ee,forceKeepAttr:void 0},xt=ye.length;for(;xt--;){let Bt=ye[xt],{name:wt,namespaceURI:Ut,value:tn}=Bt,ln=Se(wt),$n=tn,Wt=wt==="value"?$n:Pm($n);if(Fe.attrName=ln,Fe.attrValue=Wt,Fe.keepAttr=!0,Fe.forceKeepAttr=void 0,Kt(ke.uponSanitizeAttribute,C,Fe),Wt=Fe.attrValue,ot&&(ln==="id"||ln==="name")&&(yt(wt,C),Wt=ze+Wt),Ne&&mn(/((--!?|])>)|<\/(style|title|textarea)/i,Wt)){yt(wt,C);continue}if(ln==="attributename"&&mi(Wt,"href")){yt(wt,C);continue}if(Fe.forceKeepAttr)continue;if(!Fe.keepAttr){yt(wt,C);continue}if(!le&&mn(/\/>/i,Wt)){yt(wt,C);continue}Me&&No([_e,ie,Ce],xn=>{Wt=bs(Wt,xn," ")});let Cn=Se(C.nodeName);if(!on(Cn,ln,Wt)){yt(wt,C);continue}if(q&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Ut)switch(b.getAttributeType(Cn,ln)){case"TrustedHTML":{Wt=q.createHTML(Wt);break}case"TrustedScriptURL":{Wt=q.createScriptURL(Wt);break}}if(Wt!==$n)try{Ut?C.setAttributeNS(Ut,wt,Wt):C.setAttribute(wt,Wt),Lt(C)?St(C):bu(t.removed)}catch{yt(wt,C)}}Kt(ke.afterSanitizeAttributes,C,null)},lt=function Ie(C){let ye=null,Fe=Jt(C);for(Kt(ke.beforeSanitizeShadowDOM,C,null);ye=Fe.nextNode();)Kt(ke.uponSanitizeShadowNode,ye,null),nn(ye),an(ye),ye.content instanceof o&&Ie(ye.content);Kt(ke.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Ie){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ye=null,Fe=null,xt=null,Bt=null;if(J=!Ie,J&&(Ie="<!-->"),typeof Ie!="string"&&!_n(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw hs("dirty is not a string, aborting")}else throw hs("toString is not a function");if(!t.isSupported)return Ie;if(rt||xe(C),t.removed=[],typeof Ie=="string"&&(Ke=!1),Ke){if(Ie.nodeName){let tn=Se(Ie.nodeName);if(!ne[tn]||Ue[tn])throw hs("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)ye=Ft("<!---->"),Fe=ye.ownerDocument.importNode(Ie,!0),Fe.nodeType===vs.element&&Fe.nodeName==="BODY"||Fe.nodeName==="HTML"?ye=Fe:ye.appendChild(Fe);else{if(!ht&&!Me&&!Qe&&Ie.indexOf("<")===-1)return q&&Q?q.createHTML(Ie):Ie;if(ye=Ft(Ie),!ye)return ht?null:Q?D:""}ye&&bt&&St(ye.firstChild);let wt=Jt(Ke?Ie:ye);for(;xt=wt.nextNode();)nn(xt),an(xt),xt.content instanceof o&&lt(xt.content);if(Ke)return Ie;if(ht){if(re)for(Bt=I.call(ye.ownerDocument);ye.firstChild;)Bt.appendChild(ye.firstChild);else Bt=ye;return(Ee.shadowroot||Ee.shadowrootmode)&&(Bt=Ae.call(r,Bt,!0)),Bt}let Ut=Qe?ye.outerHTML:ye.innerHTML;return Qe&&ne["!doctype"]&&ye.ownerDocument&&ye.ownerDocument.doctype&&ye.ownerDocument.doctype.name&&mn(Su,ye.ownerDocument.doctype.name)&&(Ut="<!DOCTYPE "+ye.ownerDocument.doctype.name+`>
`+Ut),Me&&No([_e,ie,Ce],tn=>{Ut=bs(Ut,tn," ")}),q&&Q?q.createHTML(Ut):Ut},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xe(Ie),rt=!0},t.clearConfig=function(){ge=null,rt=!1},t.isValidAttribute=function(Ie,C,ye){ge||xe({});let Fe=Se(Ie),xt=Se(C);return on(Fe,xt,ye)},t.addHook=function(Ie,C){typeof C=="function"&&gs(ke[Ie],C)},t.removeHook=function(Ie,C){if(C!==void 0){let ye=Om(ke[Ie],C);return ye===-1?void 0:Lm(ke[Ie],ye,1)[0]}return bu(ke[Ie])},t.removeHooks=function(Ie){ke[Ie]=[]},t.removeAllHooks=function(){ke=$u()},t}var Tu=Eu();var Jn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jo=e=>(...t)=>({_$litDirective$:e,values:t}),Vr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ws=class extends Vr{constructor(t){if(super(t),this.it=Xt,t.type!==Jn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Xt||t==null)return this._t=void 0,this.it=t;if(t===Rn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ws.directiveName="unsafeHTML",ws.resultType=1;var Cu=jo(ws);function Si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ar=Si();function Du(e){Ar=e}var As={exec:()=>null};function Rt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(hn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Ym=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),hn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zm=/^(?:[ \t]*(?:\n|$))+/,Qm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ss=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ei=/(?:[*+-]|\d{1,9}[.)])/,Nu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qu=Rt(Nu).replace(/bull/g,Ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),eg=Rt(Nu).replace(/bull/g,Ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ti=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tg=/^[^\n]+/,Ci=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ng=Rt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ci).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rg=Rt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ei).getRegex(),Go="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ri=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sg=Rt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ri).replace("tag",Go).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Fu=Rt(Ti).replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),og=Rt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Fu).getRegex(),Oi={blockquote:og,code:Qm,def:ng,fences:Xm,heading:Jm,hr:Ss,html:sg,lheading:qu,list:rg,newline:Zm,paragraph:Fu,table:As,text:tg},Ru=Rt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),ag={...Oi,lheading:eg,table:Ru,paragraph:Rt(Ti).replace("hr",Ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ru).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex()},ig={...Oi,html:Rt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ri).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:As,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Rt(Ti).replace("hr",Ss).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ju=/^( {2,}|\\)\n(?!\s*$)/,ug=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ko=/[\p{P}\p{S}]/u,Li=/[\s\p{P}\p{S}]/u,Bu=/[^\s\p{P}\p{S}]/u,dg=Rt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Li).getRegex(),Uu=/(?!~)[\p{P}\p{S}]/u,pg=/(?!~)[\s\p{P}\p{S}]/u,fg=/(?:[^\s\p{P}\p{S}]|~)/u,_g=Rt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ym?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Wu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mg=Rt(Wu,"u").replace(/punct/g,Ko).getRegex(),gg=Rt(Wu,"u").replace(/punct/g,Uu).getRegex(),zu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bg=Rt(zu,"gu").replace(/notPunctSpace/g,Bu).replace(/punctSpace/g,Li).replace(/punct/g,Ko).getRegex(),hg=Rt(zu,"gu").replace(/notPunctSpace/g,fg).replace(/punctSpace/g,pg).replace(/punct/g,Uu).getRegex(),yg=Rt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bu).replace(/punctSpace/g,Li).replace(/punct/g,Ko).getRegex(),vg=Rt(/\\(punct)/,"gu").replace(/punct/g,Ko).getRegex(),wg=Rt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kg=Rt(Ri).replace("(?:-->|$)","-->").getRegex(),$g=Rt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Wo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xg=Rt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Wo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hu=Rt(/^!?\[(label)\]\[(ref)\]/).replace("label",Wo).replace("ref",Ci).getRegex(),Gu=Rt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ci).getRegex(),Ag=Rt("reflink|nolink(?!\\()","g").replace("reflink",Hu).replace("nolink",Gu).getRegex(),Ou=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ii={_backpedal:As,anyPunctuation:vg,autolink:wg,blockSkip:_g,br:ju,code:cg,del:As,emStrongLDelim:mg,emStrongRDelimAst:bg,emStrongRDelimUnd:yg,escape:lg,link:xg,nolink:Gu,punctuation:dg,reflink:Hu,reflinkSearch:Ag,tag:$g,text:ug,url:As},Sg={...Ii,link:Rt(/^!?\[(label)\]\((.*?)\)/).replace("label",Wo).getRegex(),reflink:Rt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wo).getRegex()},$i={...Ii,emStrongRDelimAst:hg,emStrongLDelim:gg,url:Rt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ou).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Rt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ou).getRegex()},Eg={...$i,br:Rt(ju).replace("{2,}","*").getRegex(),text:Rt($i.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bo={normal:Oi,gfm:ag,pedantic:ig},ks={normal:Ii,gfm:$i,breaks:Eg,pedantic:Sg},Tg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Lu=e=>Tg[e];function er(e,t){if(t){if(hn.escapeTest.test(e))return e.replace(hn.escapeReplace,Lu)}else if(hn.escapeTestNoEncode.test(e))return e.replace(hn.escapeReplaceNoEncode,Lu);return e}function Iu(e){try{e=encodeURI(e).replace(hn.percentDecode,"%")}catch{return null}return e}function Pu(e,t){let n=e.replace(hn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(hn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(hn.slashPipe,"|");return r}function $s(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Cg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Mu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Rg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var zo=class{constructor(e){jt(this,"options");jt(this,"rules");jt(this,"lexer");this.options=e||Ar}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:$s(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Rg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=$s(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$s(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=$s(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=g,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,v=b.raw+`
`+n.join(`
`),N=this.blockquote(v);o[o.length-1]=N,r=r.substring(0,r.length-b.raw.length)+N.raw,s=s.substring(0,s.length-b.text.length)+N.text;break}else if(h?.type==="list"){let b=h,v=b.raw+`
`+n.join(`
`),N=this.list(v);o[o.length-1]=N,r=r.substring(0,r.length-h.raw.length)+N.raw,s=s.substring(0,s.length-b.raw.length)+N.raw,n=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),h=e.split(`
`,1)[0],b=!g.trim(),v=0;if(this.options.pedantic?(v=2,d=g.trimStart()):b?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=g.slice(v),v+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let N=this.rules.other.nextBulletRegex(v),U=this.rules.other.hrRegex(v),Y=this.rules.other.fencesBeginRegex(v),ae=this.rules.other.headingBeginRegex(v),V=this.rules.other.htmlBeginRegex(v);for(;e;){let q=e.split(`
`,1)[0],D;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||ae.test(h)||V.test(h)||N.test(h)||U.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=v||!h.trim())d+=`
`+D.slice(v);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(g)||ae.test(g)||U.test(g))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=q+`
`,e=e.substring(q.length+1),g=D.slice(v)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Pu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Pu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=$s(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Cg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Mu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Mu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,g=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class xi{constructor(t){jt(this,"tokens");jt(this,"options");jt(this,"state");jt(this,"inlineQueue");jt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ar,this.options.tokenizer=this.options.tokenizer||new zo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:hn,block:Bo.normal,inline:ks.normal};this.options.pedantic?(n.block=Bo.pedantic,n.inline=ks.pedantic):this.options.gfm&&(n.block=Bo.gfm,this.options.breaks?n.inline=ks.breaks:n.inline=ks.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bo,inline:ks}}static lex(t,n){return new xi(n).lex(t)}static lexInline(t,n){return new xi(n).inlineTokens(t)}lex(t){t=t.replace(hn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(hn.tabCharGlobal,"    ").replace(hn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},g),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ho=class{constructor(e){jt(this,"options");jt(this,"parser");this.options=e||Ar}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(hn.notSpaceStart)?.[0],s=e.replace(hn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Iu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Iu(e);if(s===null)return er(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},Pi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qn=class Ai{constructor(t){jt(this,"options");jt(this,"renderer");jt(this,"textRenderer");this.options=t||Ar,this.options.renderer=this.options.renderer||new Ho,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pi}static parse(t,n){return new Ai(n).parse(t)}static parseInline(t,n){return new Ai(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Uo,xs=(Uo=class{constructor(e){jt(this,"options");jt(this,"block");this.options=e||Ar}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?qn.parse:qn.parseInline}},jt(Uo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),jt(Uo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Uo),Og=class{constructor(...e){jt(this,"defaults",Si());jt(this,"options",this.setOptions);jt(this,"parse",this.parseMarkdown(!0));jt(this,"parseInline",this.parseMarkdown(!1));jt(this,"Parser",qn);jt(this,"Renderer",Ho);jt(this,"TextRenderer",Pi);jt(this,"Lexer",Nn);jt(this,"Tokenizer",zo);jt(this,"Hooks",xs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ho(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new zo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new xs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];xs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&xs.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await i.call(s,u);return l.call(s,g)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await i.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return qn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qn.parse:qn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qn.parse:qn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+er(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},xr=new Og;function Pt(e,t){return xr.parse(e,t)}Pt.options=Pt.setOptions=function(e){return xr.setOptions(e),Pt.defaults=xr.defaults,Du(Pt.defaults),Pt};Pt.getDefaults=Si;Pt.defaults=Ar;Pt.use=function(...e){return xr.use(...e),Pt.defaults=xr.defaults,Du(Pt.defaults),Pt};Pt.walkTokens=function(e,t){return xr.walkTokens(e,t)};Pt.parseInline=xr.parseInline;Pt.Parser=qn;Pt.parser=qn.parse;Pt.Renderer=Ho;Pt.TextRenderer=Pi;Pt.Lexer=Nn;Pt.lexer=Nn.lex;Pt.Tokenizer=zo;Pt.Hooks=xs;Pt.parse=Pt;var yk=Pt.options,vk=Pt.setOptions,wk=Pt.use,kk=Pt.walkTokens,$k=Pt.parseInline;var xk=qn.parse,Ak=Nn.lex;function ir(e){let t=Pt.parse(e),n=Tu.sanitize(t);return Cu(n)}function tr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Yr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Vo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Vu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Lg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Ig=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Pg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Mi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Di(e,t){let n=Mi(e),r=Mi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Yu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Fn(s)&&typeof s.text=="string"?s.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Mg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Vu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Mi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Di(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Di(Fn(i)?i.old_string:"",Fn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ni(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Dg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Zu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Dg,"").trim();return n.length>0?{kind:"user",text:n}:null}function qi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ig.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Pg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ng(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function qg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Fn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(qi(a.text));else if(a.type==="thinking"){let i=Ni(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Mg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Ku(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Fn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=Yu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Zu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Ku([s],n):[s]}return[]}function Ku(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Fg(e){let t=typeof e.command=="string"?e.command:"",n=Yu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Vu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function jg(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[qi(t.text)];if(t.type==="user_message"){let n=Zu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ni(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Fg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Bg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[qi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Ni(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Lg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Ug(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Wg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Qu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Wg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Ng(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Bg(o):Ug(o)?jg(o):qg(o,n);return a.length>0&&(r.progress=null),a}}}function Fi(e){let t=[],n=Qu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var zg=5,Hg=10,Gg=/Task\s+#(\d+)/,Kg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Vg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Es(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Yg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Zg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Qg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Gg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Xg(e){if(e.tool==="Bash"){let t=e.command||"";return Kg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Vg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Jg(e){let t=e.filter(s=>s.kind==="tool").slice(-Hg),n=new Map;t.forEach((s,o)=>{let a=Xg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function eb(e){let t=Zg(e);if(t)return{text:t,guess:!1};let n=Qg(e);if(n)return{text:n,guess:!1};let r=Jg(e);return r?{text:r,guess:!0}:null}function tb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:vn(e,t)}function Zr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,g={},h=!0,b=new Set,v=new Set,N=null,U=null,Y=!1,ae=!1,V=!1,q=null,D=null;function K(){Y=!1,ae=!1,V=!1,q=null,D=null}async function L(re){if(n){ae=!0,V=!1,Ue();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(o!==re)return;!Q||typeof Q!="object"||Array.isArray(Q)?V=!0:(q=Q,D=re)}catch{o===re&&(V=!0)}finally{o===re&&(ae=!1,Ue())}}}function I(){if(Y=!Y,Y&&o&&D!==o){L(o);return}Ue()}function te(){if(!Y)return"";let re=Yr({loading:ae,error:V});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Vo(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function Ae(){if(!l||!r)return[];let re=r.get(l);return Fi(re?re.lines:[])}function ke(){if(!l||!r)return null;let re=r.get(l),Q=re?re.last_event_at:null;return typeof Q=="number"?Q:null}function _e(){return g.status==="running"}function ie(){if(_e()&&o){U||(U=setInterval(()=>Ue(),1e3));return}Ce()}function Ce(){U&&(clearInterval(U),U=null)}function De(re){let Q=[],je=0;for(;je<re.length;){let{idx:ot,line:ze}=re[je];if(ze.kind==="tool"){let we=je;for(;we<re.length&&re[we].line.kind==="tool"&&re[we].line.tool===ze.tool;)we+=1;if(we-je>=zg&&!v.has(ot)){Q.push({kind:"group",idx:ot,tool:ze.tool||"",lines:re.slice(je,we)}),je=we;continue}}Q.push({kind:"line",idx:ot,line:ze}),je+=1}return Q}function $e(re){let Q=[],je=new Map;for(let we=0;we<re.length;we+=1){let Ke=re[we],ct=Ke.parent_tool_use_id;if(typeof ct=="string"&&ct.length>0){let _t=je.get(ct);_t||(_t={kind:"subagent",idx:we,launch_id:ct,agent_type:null,header:null,lines:[]},je.set(ct,_t),Q.push(_t)),_t.lines.push({idx:we,line:Ke});continue}if(Ke.kind==="tool"&&Ke.tool==="Agent"&&typeof Ke.launch_id=="string"&&Ke.launch_id.length>0){let _t=ee(Ke),mt=je.get(Ke.launch_id);if(mt){mt.header={idx:we,line:Ke},mt.agent_type=_t;continue}let Mt={kind:"subagent",idx:we,launch_id:Ke.launch_id,agent_type:_t,header:{idx:we,line:Ke},lines:[]};je.set(Ke.launch_id,Mt),Q.push(Mt);continue}Q.push({kind:"entry",idx:we,line:Ke})}let ot=[],ze=0;for(;ze<Q.length;){if(Q[ze].kind!=="entry"){ot.push(Q[ze]),ze+=1;continue}let we=ze;for(;we<Q.length&&Q[we].kind==="entry";)we+=1;ot.push(...De(Q.slice(ze,we))),ze=we}return ot}function ee(re){let Q=re.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Z(re){for(let Q=re.length-1;Q>=0;Q-=1){let je=re[Q];if(je.kind==="result"||je.kind==="error")return null;if(je.kind==="tool"&&!Object.hasOwn(je,"result"))return je}return null}function Re(re){for(let Q=re.length-1;Q>=0;Q-=1)if(re[Q].kind==="thinking")return re[Q];return null}function z(re,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ir(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let je=b.has(re);return c`<div
        class="sv__think${je?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>At(re)}
      >
        <span class="sv__think-line">💭 ${Es(Q.text)}</span>
        ${je?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let je=b.has(re);return c`<div
        class="sv__line sv__line--user${je?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>At(re)}
      >
        <span class="sv__user-line">▷ ${Es(Q.text)}</span>
        ${je?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let je=b.has(re),ot=Q.tool==="Bash"?Yg(Q.command):0,ze=Q.tool==="Bash"?ot>1?Es(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${je?" sv__tool--expanded":""}"
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
        ${je?c`<pre class="sv__tool-expand">${ne(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ir(Q.text||"")}</div>`}function ne(re){let Q=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)Q.push(re.command);else if(re.input!==void 0)try{Q.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&Q.push(`output:
${re.output}`),Q.join(`

`)}function be(){if(!o)return c``;let re=Ae(),Q=(a?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),je=g.session_id||"",ot=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,ze=_e(),we=ze?tb(ke(),Date.now()):"",Ke=ze?Z(re):null,ct=ze?Re(re):null,_t=eb(re);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(a?g.role||"":o)}</span
        >
        ${_t?c`<span
              class="sv__stage${_t.guess?" sv__stage--guess":""}"
              title=${_t.text}
              >${_t.text}</span
            >`:""}
        ${ze?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?c`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${je?c`<button
              type="button"
              class="sv__session"
              title=${je}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${je}`}
              @click=${()=>dt(je)}
            >
              ⧉ ${je.slice(0,8)}
            </button>`:""}
        ${g.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>dt(g.resume_command||"")}
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
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(re).map(mt=>mt.kind==="subagent"?Ze(mt):mt.kind==="group"?Ee(mt):z(mt.idx,mt.line))}
      </div>
      ${Ke||ct?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ke?c`<span class="sv__now-icon">${Ke.icon}</span>
                  <span class="sv__now-name">${Ke.tool}</span>
                  <span class="sv__now-detail"
                    >${Ke.tool==="Bash"?Es(Ke.command):Ke.path||Ke.command||""}</span
                  >`:""}
            ${ct?c`<span class="sv__now-think"
                  >💭 ${Es(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ee(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ce(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ze(re){let Q=v.has(re.idx),je=re.header?re.header.line:null,ot=je?je.is_error===!0?"\u2717":typeof je.result=="string"?"\u2713":"\u27F3":"",ze=je&&je.command?je.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ce(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${ze?c`<span class="sv__sub-detail">${ze}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${ot?c`<span class="sv__sub-state">${ot}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${De(re.lines).map(we=>we.kind==="group"?Ee(we):z(we.idx,we.line))}
          </div>`:""}
    </div>`}function ce(re){v.add(re),Ue()}function Ue(){st(be(),e),ie(),h&&gt()}function gt(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function At(re){b.has(re)?b.delete(re):b.add(re),Ue()}function $t(){h=!h,Ue()}function dt(re){Sn(re).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function R(re){!o||!re||(g={...g,...re},Ue())}function le(re){let Q=re.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&h&&(h=!1,Ue())}e.addEventListener("scroll",le,!0);function Me(re){let Q=re.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||ht()}let Ne=!1;function Qe(){Ne||(document.addEventListener("mousedown",Me),Ne=!0)}function rt(){Ne&&(document.removeEventListener("mousedown",Me),Ne=!1)}function bt(re){let Q=re&&re.attempt_id;if(!Q)return;let je=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,ot=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(je&&ot)return;let ze=l;o=Q,a=je,i=ot,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&ze&&ze!==l&&Promise.resolve(n("unsubscribe-session-log",{id:ze})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,g=re.meta||{},d=re.hide_prompt===!0,h=!0,b.clear(),v.clear(),K(),!N&&r&&(N=r.subscribe(Ue)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Qe(),Ue()}function ht(){let re=l;rt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),v.clear(),K(),Ce(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),st(c``,e),s&&s()}return{open:bt,updateMeta:R,close:ht,isOpen(){return o!==null},destroy(){Ce(),rt(),N&&(N(),N=null),e.removeEventListener("scroll",le,!0),o=null,a=null,i=null,l=null,u=null,d=!1,st(c``,e)}}}function nb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Yo(t.spec_id),s=Yo(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Yo(e){return typeof e=="string"?e.trim():""}function rb(e){let t=nb(e);if(t.path)return t;let n=Yo(Xu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Xu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var sb=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ts(e){let t=rb(e),n=Yo(Xu(e).spec_review),r=sb.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function ob(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ab(e){let t=e&&e.metadata||{},n=Ts(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ob(t)?null:"plan_pending"}),r}function Ju(e,t){let n=ab(e);return c`
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
  `}var ib="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",lb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,cb=/^\*\*결론\*\* — (.+)$/;function Zo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ib)return null;let n=lb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?cb.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ed=20;function td(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function ub(e){return e.length>ed?`${e.slice(0,ed)}\u2026`:e}function db(e,t,n,r){let s=`${t.lane} ${ub(t.identifier)}`;return c`<div class="detail-report">
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
  </div>`}function pb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
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
            ${i.map(l=>{let u=Zo(typeof l.text=="string"?l.text:"");return u?db(l,u,t,s.has(l.id)):pb(l)})}
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
  `}var{I:a$}=hc;var rd=e=>e.strings===void 0;var fb={},sd=(e,t=fb)=>e._$AH=t;var Sr=jo(class extends Vr{constructor(e){if(super(e),e.type!==Jn.PROPERTY&&e.type!==Jn.ATTRIBUTE&&e.type!==Jn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!rd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Rn||t===Xt)return t;let n=e.element,r=e.name;if(e.type===Jn.PROPERTY){if(t===n[r])return Rn}else if(e.type===Jn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Rn}else if(e.type===Jn.ATTRIBUTE&&n.getAttribute(r)===t+"")return Rn;return sd(e),t}});var Qo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Bi=[...Qo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Xo=[...Qo,...nr],_b=Bi.filter(e=>Xo.includes(e)),od=["delegated","main"],Jo=["inherit","claude","codex"],Cs=["default","fast"],Rs=["standard","fast_track"],Os=["codex","opus","fable","self","skip"],ea=["codex","fable","skip"],ta=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ad(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Qr(e,t){let n=ad(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Tn,...r.flatMap(([,s])=>s)]}function id(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!En(a)||!En(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Tn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Tn,...s]}function Xr(e,t,n){return id(e,t,n,(r,s)=>En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ui(e,t,n){return id(e,t,n,(r,s)=>En(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ls(e,t){let n=ad(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function ld(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Qr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Xr(t,s,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var mb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ji=[..._b,...nr],gb=[...Xo,...Bi].filter((e,t,n)=>n.indexOf(e)===t&&!ji.includes(e));function cd(e,t){let n=En(e)?e:{},r=En(t)?t:{},s=[];for(let a of ji){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:mb[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...gb,...Object.keys(r)])!ji.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Wi(e,t,n,r,s,o){return Po({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function ud(e,t){let n={};for(let r of Bi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function dd(e,t){let n={};for(let r of nr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var zi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],lr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},na={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Hi(e,t,n,r,s,o=null){let a=wn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function pd(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Hi(e,t,n,r,s,o))a[i.source]+=1;return a}function fd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function _d(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var b$=[...Qo,...nr];var bb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Gi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},md={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},hb={pin:"pin",global:"global",base:"base"};function yb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${hb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function vb(e,t,n){switch(e){case"workflow_mode":return Rs;case"spec_review_model":case"impl_review_model":return Os;case"plan_review_model":return ea;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ta;case"impl_dispatch":return od;case"impl_runtime":return Jo;case"impl_model":return Qr(n,t.impl_runtime);case"impl_effort":return Xr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Cs;case"orchestration_model":return Ls(n,null);case"orchestration_effort":return Xr(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function wb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${yb(e.source)}
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
        >${kb(o)}</span
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
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Po({key:u.key,choices:vb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return wb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function kb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function $b(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function bd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=$b(n.exec_receipt),l=i?Yn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Lo(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,h=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${xb(s).map(b=>Ab(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function xb(e){let n=typeof e=="string"&&Object.hasOwn(Gi,e)&&Gi[e]||Gi.spec_backed;return bb.filter(r=>n.includes(r.id))}var ra={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ab(e,t,n,r){let s=Sb(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",g=u?ra.stale:i?ra.on:l?ra.current:ra.none,h=Eb(e,n),b=`${r.label} \xB7 ${g}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,v=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,N=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${v}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${N}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${N}</span
  >`}function Sb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Eb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(md,n)?md[n]:""}function sa(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function hd(e){return sa(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function yd(e,t){let n=e&&e[t];if(!sa(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(hd),s=hd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function kd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function oa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${kd(e)}${t}`}function Jr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${kd(e)}`}function Tb(e,t,n){if(n!==null){let s=e==="claude"?oa:Jr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Jr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function vd(e,t){if(!sa(e)||e.state!=="usable"||!sa(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function wd(e){let t=e.provider_key==="claude"?oa:Jr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Tb(e.provider_key,e.provider,e.workspace_default)}
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
  </section>`}var xd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Is(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function aa(e){if(!Is(e)||!Is(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Is(n)&&Is(n.models));return t.length>0?t:null}function jn(e,t){let n=aa(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Ad(e,t){return Is(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Sd(e,t){let n=aa(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Ad(r,r.models[t]);return[]}function Cb(e){let t=aa(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Ad(r,s))n.includes(o)||n.push(o);return n}function Rb(e,t){if(!t)return Cb(e);let r=aa(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Sd(e,o))s.includes(a)||s.push(a);return s}function Ed(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=jn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Sd(t,r.impl_model):Rb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ob(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Lb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function ia(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(N){N.key==="Escape"&&s&&(N.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ob(s)}</span
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
    `:c``}function g(){st(d(),e)}async function h(N,U={}){s=N,o="loading",a="",i=null,l="",g();let Y=U.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let ae="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(N);try{let V=await r(ae),q=await V.json().catch(()=>({}));if(!V.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&U.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||V.status)+")",g();return}let D=Lb(String(q.content||""));i=D.front,a=D.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function b(){s=null,st(c``,e)}function v(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:v}}var Ib=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Rd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",la=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Pb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Td(e){return typeof e=="string"&&Pb.has(e)}var Mb=["running","done","failed","interrupted"],Db={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Nb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function qb(e){let t=un(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Kr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Rd}
          >부분 집계</span
        >`:""}`}function Cd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Yi(e){if(typeof e=="number")return Ps(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ps(t):""}function Fb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function jb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ki(e){return e===null||typeof e=="string"&&e.trim().length>0}function Vi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Bb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!la.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ki(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ki(t.effort))||!(!("agent_type"in t)||Ki(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Mb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Vi(t.started_at)||!Vi(t.last_event_at)||!Vi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ub(e,t,n){let s=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Wb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?un({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ps(e.last_event_at):s?Yi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Fb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=jb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Db[e.status]}</span
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
  </button>`}function zb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Hb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let g=Bb(d);!g||s.has(g.launch_id)||Td(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((d,g)=>(d.started_at||0)-(g.started_at||0));let a={};for(let{role:d,provider:g}of la){let h=t?t.roles[d]?.[g]:null;a[d]=h?[...h.legs]:[]}let i=la.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:g}of la){for(let h of r.filter(b=>b.role===d&&b.provider===g)){let b=i.find(v=>v.receipt_id===h.launch_id)||null;b&&!zb(h,b)||(b&&l.add(b.receipt_id),u.push(Wb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Td(h.agent_type)&&u.push(Ub(d,g,h))}return u}function Gb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ib,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Nb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Rd}</span>`:""}
  </div>`}var Kb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Vb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Yb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Zb(e,t){let n=Yb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function Od(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,v)=>v.index-b.index)],i=a.map(b=>Zb(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let N=typeof b.session_id=="string"&&b.session_id.length>0,U=u.has(b.attempt_id),Y=N&&!U,ae=N?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${ae}
      @click=${V=>{V.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let N=b.cause_detail,U=N&&typeof N.reason=="string"&&N.reason.length>0?typeof N.command=="string"&&N.command.length>0?`${N.reason} \xB7 ${N.command}`:N.reason:b.cause;return c`<div class="detail-session__cause" title=${U}>
      ${b.cause}
    </div>`},h=b=>{let v=Cd(fi(b));if(un(v).length===0&&!Kr(b.usage))return"";let N=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${N?"true":"false"}
      title=${N?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${qb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let v=fi(b),N=Cd(v),U=un(N);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Kb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ps(b)?c`<span
                  class="detail-session__resumed"
                  title=${ps(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${$r(b)}</span>
            ${U.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Kr(b.usage)?c`<span class="detail-session__usage"
                    >${Kr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ps(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${g(b)} ${Vb(b)}
          ${l.has(b.attempt_id)&&b.usage?Gb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Hb(b,v,t)}
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
          ${Qb(e)}
        </div>`:""}
  `}function Qb(e){let t=Yr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Vo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Xb=["open","in_progress","deferred","resolved","closed"],Jb=[0,1,2,3,4];function Id(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,g={},h="",b=!1,v=[],N=!1,U={},Y={claude:null,codex:null},ae=null,V=null,q=0,D=!1,K=!1,L="",I="",te="";function Ae(){D=!1,K=!1,L="",I="",te=""}function ke(){Y={claude:null,codex:null},ae=null,V=null,q+=1}async function _e(){if(!s)return null;try{let k=await Promise.resolve(s("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function ie(k){try{let se=await fetch(k);if(!se.ok)return null;let F=await se.json();if(!F||typeof F!="object"||!Array.isArray(F.accounts))return null;let Te=F.accounts.filter(ft=>ft!==null&&typeof ft=="object"&&!Array.isArray(ft));return{accounts:Te,active:Te.find(ft=>ft.active===!0)||null}}catch{return null}}async function Ce(k){V=k;let se=++q,[F,Te,ft]=await Promise.all([ie("/api/claude-usage"),ie("/api/codex-usage"),_e()]);se!==q||k!==u||(Y={claude:F,codex:Te},ae=ft,Le())}let De=[],$e=null,ee=null,Z=!1,Re="",z=!1,ne=0,be=new Set;function Ee(){De=[],$e=null,ee=null,Z=!1,Re="",z=!1,ne+=1,be.clear()}async function Ze(k){if(!s)return;let se=++ne;try{let F=await Promise.resolve(s("get-comments",{id:k}));if(se!==ne||k!==u)return;De=Array.isArray(F)?F:[],Z=!1}catch{if(se!==ne||k!==u)return;Z=!0}Le()}function ce(){if(!s||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,ee=k,Ze(u);return}k!==null&&k!==ee&&(ee=k,Ze(u))}function Ue(k){be.has(k)?be.delete(k):be.add(k),Le()}function gt(k){let se=Re.trim().length===0;Re=k,se!==(k.trim().length===0)&&Le()}async function At(){let k=Re.trim();if(!s||!u||k.length===0||z)return;let se=u;z=!0,Le();let F=!1;try{let Te=await Promise.resolve(s("add-comment",{id:se,text:k}));Array.isArray(Te)&&Te.length>0&&(F=!0,se===u&&(De=Te,Z=!1,Re="",ee=Te.length))}catch{F=!1}F||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),se===u&&(z=!1),Le()}let $t={onToggle:Ue,onDraftInput:gt,onSubmit:At},dt=t.mdViewer||null,R=null;dt||(R=document.createElement("div"),R.className="md-viewer-root",document.body.appendChild(R));let le=dt||ia(R,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let Ne=Zr(Me,{transport:s?(k,se)=>Promise.resolve(s(k,se)):void 0,sessionLogStore:l}),Qe=!1,rt=!1,bt=!1,ht=null,re=null,Q=0;function je(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function ot(){Qe=!1,rt=!1,bt=!1,ht=null,re=null,Q+=1}async function ze(k){if(!s)return;let se=++Q;rt=!0,bt=!1,Le();try{let F=await Promise.resolve(s("get-bead-prompt",{bead_id:k}));if(se!==Q)return;!F||typeof F!="object"||Array.isArray(F)?bt=!0:(ht=F,re=je(k))}catch{se===Q&&(bt=!0)}finally{se===Q&&(rt=!1,Le())}}let we=[],Ke=null,ct=0;function _t(k,se){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${se}`}function mt(){we=[],Ke=null,ct+=1}async function Mt(k,se){if(!s)return;let F=++ct,Te;try{Te=await Promise.resolve(s("get-session-refs",{bead_id:k}))}catch{Te=null}F!==ct||se!==Ke||(we=Te&&Array.isArray(Te.sessions)?Te.sessions:[],Le())}function Yt(){if(!s||!u)return;let k=d&&d.metadata,se=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(se===null){mt();return}let F=_t(u,se);Ke!==F&&(we=[],Ke=F,Mt(u,F))}function Gt(){if(Qe=!Qe,Qe&&u&&re!==je(u)){ht=null,ze(u);return}Le()}function Ot(){if(!a||!u)return[];let k=a.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(F=>F&&F.bead_id===u).sort((F,Te)=>(Te.started_at||0)-(F.started_at||0)).map(F=>({attempt_id:F.attempt_id,bead_id:F.bead_id,status:F.status,started_at:typeof F.started_at=="number"?F.started_at:null,runner:F.runner||null,model:F.model||null,effort:F.effort||F.observed_effort||null,speed:F.speed||null,session_id:F.session_id||null,resumed_from:F.resumed_from||null,continuation_mode:F.continuation_mode||null,dismissed_at:typeof F.dismissed_at=="number"?F.dismissed_at:null,cause:typeof F.cause=="string"?F.cause:null,cause_detail:F.cause_detail||null,exec_default_preset_id:typeof F.exec_default_preset_id=="string"?F.exec_default_preset_id:null,exec_default_preset_revision:typeof F.exec_default_preset_revision=="number"?F.exec_default_preset_revision:null,exec_values:F.exec_values&&typeof F.exec_values=="object"?F.exec_values:null,usage:F.usage||null,usage_legs:Array.isArray(F.usage_legs)?F.usage_legs:[],delegation_sessions:Array.isArray(F.delegation_sessions)?F.delegation_sessions:[]}))}function It(){if(!a||!u)return null;let k=a.get();return On(k&&k.attempts||{},u)}let et=new Set;function qe(k){et.has(k)?et.delete(k):et.add(k),Le()}function P(k){let se=a?a.get():null,F=se&&se.attempts?se.attempts[k]:null;Ne.open({attempt_id:k,meta:F?{runner:F.runner||void 0,model:F.model||void 0,effort:F.effort||void 0,status:F.status||void 0,session_id:F.session_id||void 0}:{}})}function J(k,se){let F=a?a.get():null,Te=F&&F.attempts?F.attempts[k]:null,Je=(Te&&Array.isArray(Te.delegation_sessions)?Te.delegation_sessions:[]).find(vt=>vt&&typeof vt=="object"&&vt.launch_id===se);Je&&Ne.open({attempt_id:k,launch_id:se,meta:{runner:Je.provider==="claude"?"claude":"codex",role:Je.role,...typeof Je.agent_type=="string"?{agent_type:Je.agent_type}:{},model:Je.model,effort:Je.effort,session_id:Je.session_id,status:Je.status}})}async function ve(k){if(!s||!k)return;let se=await zr();if(se===null)return;let F=()=>{let vt=a?a.get():null;return vt&&typeof vt.revision=="number"?vt.revision:0},Te=async(vt={},it=F())=>await s("worker-attempt-resume",{attempt_id:k,expected_revision:it,...se!==""?{instructions:se}:{},...vt}),ft=vt=>{vt?.queue&&a?.set&&a.set(vt.queue)},Je=await Te();if(ft(Je),Je&&Je.conflict){let vt=Je.queue&&typeof Je.queue.revision=="number"?Je.queue.revision:F();Je=await Te({},vt),ft(Je)}Je=await Zn(Je,(vt,it)=>Te({continuation:vt,decision_token:it}),{onResult:ft,refresh:()=>Te()}),Je&&Je.resumed===!1&&!Je.conflict&&Je.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Je.reason}`,"error",2400)}function E(k){!k||!u||Ne.open(Hr(k,u,d&&d.status))}let H={onOpen:P,onOpenDelegation:J,onResume:ve,onToggleUsage:qe,onOpenSessionRef:E,onCopyResumeCommand:yt};function Pe(){let k=a?a.get():null,se={...U};for(let F of["orchestration_model","orchestration_effort","orchestration_speed"]){let Te=k&&k[F];typeof Te=="string"&&(se[F]=Te)}return se}async function x(){if(s){try{let k=await Promise.resolve(s("get-session-defaults",{}));U=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{U={}}Le()}}function S(){let k=a?a.get():null;return k&&k.runner_catalog||null}function X(){let k=a?a.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function me(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},F=wn({pin:{...k,...g},global:Pe(),execution_defaults:X(),runner_catalog:S(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return jn(S(),F)}function Se(){let k=i?i.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function ge(k){return k?.compatible===!1}function A(k){i&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&i.set({revision:k.revision,presets:k.presets})}async function B(){let k=Se(),se=k?.presets.find(F=>F.id===h);if(!(!s||!u||!k||!se||ge(se)||b)){b=!0,v=[],Le();try{let F=await Promise.resolve(s("apply-impl-preset",_d(u,se.id,k.revision)));if(F&&F.conflict){A(F),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Te=F&&Array.isArray(F.issue)?F.issue[0]:F?.issue;if(F&&F.applied&&Te&&typeof Te=="object"){d=Te,v=Array.isArray(F.skipped_orchestration_keys)?F.skipped_orchestration_keys.filter(ft=>typeof ft=="string"):[];for(let ft of xd)delete g[ft];de(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}F&&F.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(F){F&&typeof F=="object"&&F.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Le()}}}let xe=null;n&&n.subscribe&&(xe=n.subscribe(()=>St()));let Ve=null;a&&typeof a.subscribe=="function"&&(Ve=a.subscribe(()=>{u&&Le()}));let pe=null;i&&typeof i.subscribe=="function"&&(pe=i.subscribe(()=>{u&&Le()}));function Xe(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",Xe);function St(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(F=>F&&F.id===u)||k[0]||d}ce(),Yt(),Le()}}function yt(k){Sn(k).then(se=>{se?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ft(k){k.preventDefault(),k.stopPropagation(),u&&yt(u)}function Jt(k,se){k.preventDefault(),k.stopPropagation(),yt(se)}function Lt(k,se,F){k.preventDefault(),k.stopPropagation(),le.open(se,{missing_state:F})}function _n(k,se){g[k]=se,Le(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",fd(u,k,se.length===0?null:se))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Kt(k,se){let F=d||{},Te=F.metadata&&typeof F.metadata=="object"?F.metadata:{},ft={};for(let it of["impl_runtime","impl_model","impl_effort"])ft[it]=Object.hasOwn(g,it)?g[it]:typeof Te[it]=="string"?Te[it]:"";ft[k]=se;let Je=Ed(ft,S(),me()),vt={};for(let it of["impl_runtime","impl_model","impl_effort"])vt[it]=g[it],g[it]=Je[it]||"";Le(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Je,orchestration_runtime:me()})).then(it=>{let Ct=Array.isArray(it)?it[0]:it;if(!Ct||typeof Ct!="object"||!Ct.id)throw new Error("implementation target readback failed");d=Ct;for(let p of["impl_runtime","impl_model","impl_effort"])delete g[p];Le()}).catch(()=>{for(let it of["impl_runtime","impl_model","impl_effort"])vt[it]===void 0?delete g[it]:g[it]=vt[it];Le(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function nn(k,se,F){if(!s||!u)return!1;try{let Te=await Promise.resolve(s(k,se)),ft=Array.isArray(Te)?Te[0]:Te;return ft&&typeof ft=="object"&&ft.id?(d=ft,!0):(de(F,"error"),!1)}catch{return de(F,"error"),!1}}function on(k){setTimeout(()=>{try{let se=e.querySelector(k);se&&typeof se.focus=="function"&&se.focus()}catch{}},0)}function Ye(){D=!0,L=d&&d.title||"",Le(),on('.detail-edit__input[data-edit="title"]')}function an(k){L=k.target.value}function lt(){D=!1,L="",Le()}function Ie(){nn("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(se=>{se&&(D=!1,L=""),Le()})}function C(){K=!0,I=d&&d.description||"",Le(),on('.detail-edit__textarea[data-edit="description"]')}function ye(k){I=k.target.value}function Fe(){K=!1,I="",Le()}function xt(){nn("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(se=>{se&&(K=!1,I=""),Le()})}function Bt(k,se,F,Te){if(k.key==="Escape"){k.stopPropagation(),F();return}k.key==="Enter"&&(!Te||k.ctrlKey||k.metaKey)&&(k.preventDefault(),se())}function wt(k){let se=k.target.value;nn("update-status",{id:u,status:se},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Le())}function Ut(k){let se=Number(k.target.value);nn("update-priority",{id:u,priority:se},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Le())}function tn(k){te=k.target.value}function ln(){let k=te.trim();k.length!==0&&nn("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(se=>{se&&(te=""),Le()})}function $n(k){if(k.key==="Escape"){k.stopPropagation(),te="",Le();return}k.key==="Enter"&&(k.preventDefault(),ln())}function Wt(k){nn("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Le())}let Cn={onCopyPath:Jt,onOpenDoc:Lt};function xn(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function rr(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(k){let F=(Array.isArray(k.dependencies)?k.dependencies:[]).map(Te=>({id:xn(Te),icon:rr(Te)})).filter(Te=>Te.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${F.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${F.map(Te=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Te.id)}
                  >
                    ${Te.icon?`${Te.icon} `:""}${Te.id}
                  </button>`:c`<span class="detail-dep"
                    >${Te.icon?`${Te.icon} `:""}${Te.id}</span
                  >`)}
          </div>`}
    `}function O(k){let se=k.metadata||{},F=k.workflow||{},Te=F.stages||{},ft=Te.spec&&Te.spec.stale,Je=Te.impl&&Te.impl.stale,vt=F.quick_fix_review?.state==="stale",it=Te.plan||null,Ct=F.route_source==="derived",p=F.route||se.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ct?" detail-kv__v--derived":""}"
          title=${Ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ct?"unset":p}</span
        >
      </div>
      ${F.route!=="quick_fix"||Object.hasOwn(se,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${se.spec_review||"\uC5C6\uC74C"}${ft?" \xB7 stale":""}</span
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
              >${se.impl_review||"\uC5C6\uC74C"}${Je?" \xB7 stale":""}</span
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
    `}let Be={route:["quick_fix","spec_backed","full_plan"]};async function He(k,se){let F=se.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&F!=="full_plan"&&!window.confirm(`full_plan \u2192 ${F||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Le();return}await nn("update-workflow-meta",{id:u,key:k,value:F},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Le()}function at(k){let se=k.metadata||{};return c` ${((Te,ft)=>{let Je=Be[Te],vt=typeof se[Te]=="string"?se[Te]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Te}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Te}
          data-edit=${`wfmeta-${Te}`}
          @change=${it=>He(Te,it)}
        >
          <option value="" ?selected=${!Je.includes(vt)}>
            ${ft}
          </option>
          ${Je.map(it=>c`<option value=${it} ?selected=${vt===it}>${it}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Tt(k,se){return D?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${an}
            @keydown=${F=>Bt(F,Ie,lt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ie}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${lt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
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
    `}function f(k){let se=cn(k.created_at),F=cn(k.updated_at);return!se&&!F?c``:c`
      ${se?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${se}</span>
          </div>`:""}
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
    `}function w(k,se){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${wt}
        >
          ${Xb.map(F=>c`<option value=${F} ?selected=${F===k}>${F}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ut}
        >
          ${Jb.map(F=>c`<option value=${String(F)} ?selected=${F===se}>
                P${F}
              </option>`)}
        </select>
      </div>
    `}function j(k){return c`
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
              @keydown=${se=>Bt(se,xt,Fe,!0)}
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
                @click=${Fe}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fe(k){let se=typeof k.notes=="string"?k.notes:"";return se.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${se}</div>
    `}function Oe(k){let se=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${se.map(F=>c`<span class="detail-label-chip"
              >${F}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${F}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+F}
                @click=${()=>Wt(F)}
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
    `}function pt(){if(!u)return c``;let k=d||{},se=String(k.id||u),F=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Te=It(),ft=k.status||"open",Je=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",vt=k.description||"",it={...k,metadata:{...k.metadata||{},...g}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Ft}
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
          ${Tt(F,Te)}
          ${bd(it)}
          ${gd({metadata:it.metadata,workspace_values:Pe(),catalog:S(),execution_defaults:X(),expanded:N,presets:Se()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:v},{onToggle:Ct=>{N=Ct,Le()},onEdit:(Ct,p)=>{if(Ct==="impl_runtime"||Ct==="impl_model"||Ct==="impl_effort"){Kt(Ct,p??"");return}_n(Ct,p??"")},onPresetSelect:Ct=>{h=Ct,v=[],Le()},onPresetApply:()=>{B()}})}
          ${$d({md:it.metadata,catalog:Y,workspace_defaults:ae,handlers:{onExecChange:_n}})}
          ${w(ft,Je)} ${f(k)}
          ${j(vt)}
          ${nd(De,$t,{expanded:be,draft:Re,sending:z,error:Z})}
          ${fe(k)} ${Oe(k)} ${T(k)}
          ${O(k)} ${at(k)}
          ${Ju(k,Cn)}
          ${Ld({expanded:Qe,loading:rt,error:bt,data:ht},{onToggle:Gt})}
          ${Od(Ot(),H,{total:Te,expanded:et},we)}
        </div>
      </div>
    `}function Le(){st(pt(),e)}return{load(k){k!==u&&(g={},h="",v=[],N=!1,Ae(),Ee(),ot(),mt(),ke()),u=k,d=null,St(),x(),V!==k&&Ce(k)},clear(){u=null,d=null,g={},h="",b=!1,v=[],N=!1,Ae(),Ee(),ot(),mt(),ke(),le.close(),Ne.close(),st(c``,e)},destroy(){xe&&(xe(),xe=null),Ve&&(Ve(),Ve=null),pe&&(pe(),pe=null),document.removeEventListener("keydown",Xe),dt||(le.destroy(),R&&R.parentNode&&R.parentNode.removeChild(R)),Ne.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),u=null,d=null,ke(),h="",b=!1,v=[],Ee(),ot(),mt(),st(c``,e)}}}function Pd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function ca(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ua(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function da(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function pa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function eh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ca(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Md(e,t){let n=eh(e,t);return n?c`<button
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
  </div>`}function th(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ns(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function fa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Bn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,h)=>(g.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?th(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Ms(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var nh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Dd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:nh[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function _a(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function rh(e){return c`<div
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
        >`:""}${s?rh(s):""}
  </div>`}function ga(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function sh(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
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
  </button>`:""}function qd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function ba(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function oh(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=Qn(e.usage),s=vn(e.done_at);return c`<div
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
      ${qd(e.pr_url,e.pr_number)}${s?c`<span
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
  </div>`}function cr(e){if(e.lane==="done"&&e.done_layout==="three_line")return oh(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=un(e.usage),s=Qn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?vn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,v=e.lane==="done"?"":ga(e.workflow),N=e.lane==="done"?"":Nd(e.from_id),U=ba(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,ae=qd(e.pr_url,e.pr_number),V=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=n.map(be=>be===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${be}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${be===e.completion_badge&&e.completion_title||""}
          >${be}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",K=r.length>0?r.map(be=>c`<span class="worker-usage" title=${be.tooltip}
              >${be.label}</span
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
      </button>`:"",Ae=e.timeline_action?c`<button
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
        </button>`:"",ie=e.stale_work||null,Ce=ie?c`${ie.can_resume||ie.can_continue?c`<button
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
          </button>`:""}`:"",De=ie?c`<div class="worker-mini__stale">
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
        </button>`:"",ee=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=h||v||N||ee||K?c`<div class="worker-chips">
          ${h}${v}${N}${ee?_a(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${K}
        </div>`:"",Re=ma(e.dependency_chips),z=Ms(e),ne=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ke?.operation||e.revise_action||ie);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${b}${U}${N}${ae}${Y}
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
                >`:""}${q}${L}
            <span class="worker-mini__actions"
              >${I}${te}${Ae}${_e}</span
            >
            ${es(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${b}${U}${ae}${V}${q}${g}${D}
            </div>
            <div class="worker-mini__body">${Y}${De}</div>
            ${Re}${Z}${ne?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${I}${te}${Ae}${_e}${$e}${Ce}</span
                  >
                  ${Ms(e)}
                </div>`:""}
            ${es(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${b}${U}${Y}${ae}${V}${q}${g}${D}${L}${I}${te}${Ae}${_e}
            </div>
            ${Re}${Z}${z} ${es(e)}`}
  </div>`}function ah(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var ih={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Zi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=ih[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=ma(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=ga(l),v=Nd(e.from_id),N=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            >`:""}${sh(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Ro(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${h||b||v||N?c`<div class="worker-chips">
          ${h}${b}${v}${_a(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${ah(t.lanes,e.id)}
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
  </section>`}function ha(e){return e.replace(/\/+$/,"")}function lh(e,t){let n=ha(e),r=ha(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ya(e,t){let n=new Set;for(let r of e)for(let s of t){if(!lh(r,s))continue;let o=ha(r),a=ha(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function jd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ya(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Fd=["parallel","serial","candidate"];function qs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Qi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Fd.includes(r.kind),l=Fd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=ch(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${qs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${qs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ch(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Bd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Ud={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Wd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Xi(e){for(let t of Wd(e))if(Object.hasOwn(Bd,t))return Bd[t];return null}function Ji(e){let t=null;for(let n of Wd(e))Object.hasOwn(Ud,n)&&(t=Ud[n]);return t}function va(e){let t=Xi(e),n=Ji(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function zd(e,t){let n=Xi(e)??Xi(t),r=Ji(t)??Ji(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Hd=160;function uh(e){return e.length>Hd?`${e.slice(0,Hd)}\u2026`:e}function dh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${uh(e.command)}</code>`:""}
  </div>`}function ph(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function fh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Gd(e){let t=e.failure?va(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${dh(e.failure.cause_detail,e.failure.reason)}
          ${ph(e.failure.reason)}
          ${Ms({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function _h(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var mh=new Set(["codex-runner"]);function gh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&mh.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?vn(r.last_event_at,t):"",g=r?vn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
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
      </div>`:""}`}var bh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function hh(e){if(!e)return"";let t=bh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function el(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(ie=>ie&&ie.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?fh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=ps(e),g=un(e.usage),h=Qn(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,v=e.base_exception||null,N=e.landing,U=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,ae=_h(Y),V=Y?ma(Y.dependency_chips):"",q=gh(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),D=s&&e.workflow?.chips?.exec_receipt||null,K=ga(e.workflow),L=D?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Yn(D)}`}
        >${`${D.kind}:${Oo(D)}`}</span
      >`:"",I=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${_s(o)}</span
      >`:"",te=ae||K||I||L?c`<div class="rtile__meta">
          ${ae}${K}${I}${L}
        </div>`:"",Ae=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${v?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${v}</span
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
    class="rtile${U?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ba(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${Ae}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${hh(o)}<span
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
    ${q}${e.rollup?Co(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ai}):""}
    ${N?c`<div class="rtile__landing">
          <span
            class="merge-step${N.failed?" merge-step--failed":""}"
            style=${`--progress: ${N.percent}%`}
            >${N.label}${N.index>0?c`<span class="merge-step__n"
                  >${N.index}/${N.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${V}
    ${s?te:ae||K||u||g.length>0||h?c`<div class="rtile__meta">
            ${ae}${K}${_a(e.exec_chips)}
            ${g.length>0?g.map(ie=>c`<span class="worker-usage" title=${ie.tooltip}
                      >${ie.label}</span
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
  </div>`}var nl=new Set(["unavailable","not_applicable"]);function ur(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Kd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function dr(e,t){return t===null?null:`${lr[e]}: ${t.display} (${na[t.source]})`}function rl(e){return e.filter(t=>t!==null).join(`
`)}function Fs(e){if(typeof e!="object"||e===null)return null;let t=$r(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(lr.orchestration_model,e.model),n(lr.orchestration_effort,e.effort),n(lr.orchestration_speed,e.speed)])}}function Er(e,t){let n=ur(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ur(e,"orchestration_effort"),s=ur(e,"orchestration_speed"),o=Kd([jn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:rl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",dr("orchestration_model",n),dr("orchestration_effort",r),dr("orchestration_speed",s)])}}function yh(e,t){return e===null||e.value===null||nl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function vh(e){return e===null||nl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function wh(e){return e===null?null:e.value==="auto"?"auto":nl.has(e.resolution)?null:e.display}function pr(e,t){if(typeof e!="object"||e===null)return null;let n=ur(e,"impl_dispatch"),r=ur(e,"impl_runtime"),s=ur(e,"impl_model"),o=ur(e,"impl_effort"),a=ur(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Kd([yh(r,t??null),vh(s),wh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:rl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",dr("impl_dispatch",n),dr("impl_runtime",r),dr("impl_model",s),dr("impl_effort",o),dr("impl_speed",a)])}}var dn="",kh=["impl_runtime","impl_model","impl_effort"],$h=["claude_account","codex_account"],xh=5,wa=1;function kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ka(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>de(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},g={},h=Promise.resolve(),b={claude:null,codex:null},v=!1,N=null,U={},Y="",ae="",V=!1,q=!1,D=!1,K=null,L=!1;function I(){let P=t.queue?t.queue():null;return kn(P)?P:null}function te(){let P=I();return P?P.runner_catalog:null}function Ae(){let P=I();return P&&kn(P.execution_defaults)?P.execution_defaults:null}function ke(){let P=t.implPresetStore?.get();return kn(P)&&Array.isArray(P.presets)?P:null}function _e(){return r===null?{}:{root_dir:r}}async function ie(P,J){return L||!n?null:await n(P,J)}function Ce(P){P&&kn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function De(P,J){let ve=I();if(!ve||L)return null;let E=await ie(P,{...J,..._e(),expected_revision:ve.revision});if(Ce(E),r!==null&&E&&E.conflict){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:I()?.revision??ve.revision;E=await ie(P,{...J,..._e(),expected_revision:H}),Ce(E)}return E}async function $e(){l=!0,qe();try{let P=await ie("get-session-defaults",{..._e()});o=kn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,qe()}}async function ee(){let P=ud(o,a);if(Object.keys(P).length!==0){try{let J=await ie("set-session-defaults",{values:P,..._e()});o=kn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}qe()}}function Z(P,J){if(!kn(P))return;let ve=P.state;u={state:ve==="usable"||ve==="unusable"||ve==="absent"?ve:"absent",values:kn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},g={...u.values},J&&(d={...g})}async function Re(){try{Z(await ie("get-workspace-accounts",{..._e()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}qe()}async function z(P){try{let J=await fetch(P);if(!J.ok)return null;let ve=await J.json();if(!kn(ve)||!Array.isArray(ve.accounts))return null;let E=ve.accounts.filter(H=>kn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:E,active:E.find(H=>H.active===!0)||null}}catch{return null}}async function ne(){v=!0;let[P,J]=await Promise.all([z("/api/claude-usage"),z("/api/codex-usage")]);L||(b={claude:P,codex:J},qe())}function be(){let P={};for(let J of $h){let ve=Object.hasOwn(d,J)?d[J]:null,E=Object.hasOwn(g,J)?g[J]:null;ve!==E&&(P[J]=ve)}return P}async function Ee(){let P=be();if(Object.keys(P).length!==0){try{Z(await ie("set-workspace-accounts",{values:P,..._e()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}qe()}}function Ze(P,J){J===dn?delete d[P]:d[P]=J,qe(),h=h.then(()=>Ee())}function ce(P,J){if(kh.includes(P)){At(P,J);return}J===dn?delete a[P]:a[P]=J,qe(),ee()}function Ue(){let P=It().orchestration_model,J=wn({global:{orchestration_model:P??void 0},execution_defaults:Ae(),runner_catalog:te()}).orchestration_model.value;return J?jn(te(),J):null}function gt(P,J){typeof J=="string"&&J.length>0?a[P]=J:delete a[P]}function At(P,J){let ve=J===dn?void 0:J,E=ld({impl_runtime:P==="impl_runtime"?ve:a.impl_runtime,impl_model:P==="impl_model"?ve:a.impl_model,impl_effort:P==="impl_effort"?ve:a.impl_effort},te(),Ue());gt("impl_runtime",E.impl_runtime),gt("impl_model",E.impl_model),gt("impl_effort",E.impl_effort),qe(),ee()}async function $t(){let P=I();if(!P)return;let J={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ve=dd(J,{...J,...U});if(Object.keys(ve).length!==0){try{let E=await De("worker-queue-set-orchestration-defaults",{values:ve});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}U={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}qe()}}function dt(P,J){U[P]=J===dn?null:J,qe(),$t()}function R(P){if(N=P,!P){qe();return}let J=te(),ve=It(),E=ve.orchestration_model;E&&!Ls(J,P).includes(E)&&(U.orchestration_model=null,E=null);let H=ve.orchestration_effort;H&&!Ui(J,P,E||Tn).includes(H)&&(U.orchestration_effort=null),qe(),$t()}async function le(P){if(!(!I()||P<wa)){try{await De("worker-queue-set-slots",{slots:P})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}qe()}}async function Me(P){if(!(!I()||P<wa||P>xh)){try{await De("worker-queue-set-serial-lane-count",{count:P})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}qe()}}async function Ne(P,J){let ve=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await De(ve,{on:J})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}qe()}function Qe(){let P={},J=It();for(let ve of Xo){let E=nr.includes(ve)?J[ve]:a[ve];typeof E=="string"&&E.length>0&&(P[ve]=E)}return P}async function rt(){let P=ke();if(!P)return;let J=Qe();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ve=(P.presets||[]).find(H=>H.id===Y),E=ae.trim()||(ve?ve.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ve?await ie("impl-preset-update",{expected_revision:P.revision,id:ve.id,name:E,settings:J}):await ie("impl-preset-create",{expected_revision:P.revision,name:E,settings:J});if(H&&H.applied){if(ae="",!ve&&Array.isArray(H.presets)){let Pe=H.presets.find(x=>x.name===E);Y=Pe?Pe.id:Y}qe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),qe()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function bt(){let P=ke();if(!(!P||Y.length===0))try{let J=await ie("impl-preset-delete",{expected_revision:P.revision,id:Y});J&&J.applied?(Y="",qe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),qe())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function ht(P){o=kn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],kn(P.queue)&&(t.onQueueAdopt?.(P.queue),U={})}async function re(){let P=ke(),J=I();if(!P||!J||Y.length===0)return;let ve=E=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:E,..._e()});try{let E=await ie("apply-impl-preset-global",ve(J.revision));if(E&&E.applied&&ht(E),r!==null&&E&&E.queue_applied===!1){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:I()?.revision??J.revision;E=await ie("apply-impl-preset-global",ve(H)),E&&E.applied&&ht(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}qe()}async function Q(){q=!0,D=!1,qe();try{let P=await ie("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:K=P}catch{D=!0}finally{q=!1,qe()}}function je(){if(V=!V,V&&!K){Q();return}qe()}function ot(){let P=Yr({loading:q,error:D});if(P)return P;if(!K)return"";let J=Array.isArray(K.variants)?K.variants:[];return c`<div class="settings-dialog__sp-body">
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
        @click=${je}
      >
        ${V?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${V?ot():""}
    </section>`}function we(P,J,ve,E,H,Pe,x){let S=H[P]??dn,X=Wi(P,ve,H,Ae(),te(),x),me=X.options.find(ge=>ge.value===S),Se=S===dn?X.full_value:me?.full_value;return c`<select
        class=${S===dn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${J}
        title=${Se||""}
        ?disabled=${Pe===!0||X.disabled}
        .value=${Sr(String(S))}
        @change=${ge=>E(P,String(ge.target.value))}
      >
        <option value=${dn} ?selected=${S===dn}>
          ${X.unset_label}
        </option>
        ${X.options.map(ge=>c`<option
              value=${ge.value}
              title=${ge.full_value||""}
              ?selected=${ge.value===S}
            >
              ${ge.label}
            </option>`)}
      </select>
      ${S===dn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ke(P,J,ve,E,H,Pe=!1,x){return c`<div
      class=${`settings-dialog__row${Pe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${we(P,J,ve,E,H,Pe,x)}
      </span>
    </div>`}function ct(P,J){let ve=J?J.active:null;return kn(ve)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ve.email:Jr({...ve,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function _t(P,J,ve){let E=b[ve],H=Object.hasOwn(d,P)?d[P]:dn,Pe=ve==="claude"?oa:Jr,x=!!E?.accounts.some(S=>S.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${P}
          @change=${S=>Ze(P,String(S.target.value))}
        >
          <option value=${dn} ?selected=${H.length===0}>
            ${ct(ve,E)}
          </option>
          ${H.length>0&&!x?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(S=>c`<option value=${S.key} ?selected=${S.key===H}>
                ${Pe(S)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function mt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Mt(P,J,ve,E,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${we(ve,`${P} \uBAA8\uB378`,E,ce,a,!1)}
        ${we(H,`${P} effort`,ta,ce,a,!1)}
      </span>
    </div>`}function Yt(P,J,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${E?"true":"false"}
          aria-label=${J}
          @click=${()=>Ne(P,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ve}</span>
      </span>
    </div>`}function Gt(P,J,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>E(ve-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ve}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>E(ve+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ot(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
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
    </div>`}function It(){let P=I(),J={};for(let ve of nr)J[ve]=Object.prototype.hasOwnProperty.call(U,ve)?U[ve]:P&&typeof P[ve]=="string"?P[ve]:null;return J}function et(){let P=te(),J=a.impl_runtime,ve=a.impl_model,E=ke(),H=I(),Pe=It(),x=Ls(P,N),S=Qr(P,void 0).filter(pe=>pe!==Tn),X=Ui(P,N,Pe.orchestration_model||Tn).filter(pe=>pe!==Tn),me=Y?(E?.presets||[]).find(pe=>pe.id===Y):null,Se=me?cd(Qe(),kn(me.settings)?me.settings:{}):null,ge=H&&typeof H.slots=="number"?H.slots:wa+1,A=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:wa,B=Ae()?.supported===!0,xe=mt(),Ve=Wi("workflow_mode",Rs,a,Ae(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${xe?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${xe}
          </div>`:""}
      ${B?"":c`<div
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
                @change=${pe=>{Y=String(pe.target.value),qe()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(pe=>c`<option
                      value=${pe.id}
                      ?selected=${pe.id===Y}
                    >
                      ${pe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Se||Se.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Sr(ae)}
                @input=${pe=>{ae=String(pe.target.value)}}
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
                @click=${bt}
              >
                삭제
              </button>
            </div>
            ${Se?Ot(Se):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Sr(N||dn)}
                    @change=${pe=>{let Xe=String(pe.target.value);R(Xe===dn?null:Xe)}}
                  >
                    <option value=${dn} ?selected=${!N}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${N==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${N==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ke("orchestration_model","\uBAA8\uB378",x,dt,Pe)}
              ${Ke("orchestration_effort","effort",X,dt,Pe)}
              ${Ke("orchestration_speed","\uC18D\uB3C4",Cs,dt,Pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${_t("claude_account","Claude","claude")}
              ${_t("codex_account","Codex","codex")}
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
                      @click=${()=>ce("workflow_mode",dn)}
                    >
                      ${Ve.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Rs.map(pe=>c`<button
                          type="button"
                          data-mode=${pe}
                          aria-pressed=${String(a.workflow_mode===pe)}
                          @click=${()=>ce("workflow_mode",pe)}
                        >
                          ${pe}
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
              ${Mt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Os,"spec_review_effort")}
              ${Mt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ea,"plan_review_effort")}
              ${Mt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Os,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ke("impl_runtime","\uC704\uC784 \uB300\uC0C1",Jo,ce,a)}
              ${Ke("impl_model","\uBAA8\uB378",Qr(P,J),ce,a)}
              ${Ke("impl_effort","effort",Xr(P,J,ve),ce,a)}
              ${Ke("impl_speed","\uC18D\uB3C4",Cs,ce,a)}
              ${Ke("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",S,ce,a,!1,{...a,...Pe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Yt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Yt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Yt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Gt("slots","\uB3D9\uC2DC \uC2E4\uD589",ge,pe=>le(pe))}
              ${Gt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",A,pe=>Me(pe))}
            </div>
            ${ze()}
          `}
    `}function qe(){L||st(et(),e)}return{load(){U={};let P=[$e(),Re()];return v||P.push(ne()),Promise.all(P).then(()=>{})},render:qe,sessionDraft:()=>({...a}),destroy(){L=!0,st(c``,e)}}}function $a(e){return c`<svg
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
  </svg>`}function Vd(){return $a(us`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Yd(){return $a(us`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Zd(){return $a(us`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Qd(){return $a(us`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Xd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return un(Do(t));let n={};for(let i of Gn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Gn){let g=l[d];typeof g=="number"&&Number.isFinite(g)&&(n[d]+=g,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Qn(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function sl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Ah(e,t){if(!Un(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Sh(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=wn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=jn(e.runner_catalog,n.orchestration_model.value??""),s=Er(n,e.runner_catalog),o=pr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function ep(e,t){let n=t.notify||(z=>de(z,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,g=null,h=new Map;function b(){let z=t.workspacesState?t.workspacesState():[];return Array.isArray(z)?z.filter(ne=>Un(ne)):[]}function v(z){return b().find(ne=>ne.root_dir===z)||null}function N(z){return Ah(v(z),h.get(z))}function U(){for(let z of b()){let ne=h.get(z.root_dir);ne&&typeof ne.revision=="number"&&typeof z.revision=="number"&&z.revision>=ne.revision&&h.delete(z.root_dir)}}async function Y(z,ne,be){let Ee=t.transport,Ze=N(ne);if(!(!Ee||!Un(Ze))){try{let ce=await Ee(z,{...be,root_dir:ne,expected_revision:Ze.revision});if(Un(ce?.queue)&&h.set(ne,ce.queue),ce&&ce.conflict){let Ue=Un(ce.queue)&&typeof ce.queue.revision=="number"?ce.queue.revision:N(ne)?.revision;ce=await Ee(z,{...be,root_dir:ne,expected_revision:Ue}),Un(ce?.queue)&&h.set(ne,ce.queue)}}catch(ce){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}ee()}}function ae(z){u!==z&&(u=z,t.onFocusChange?.(u),ee())}function V(z){ae(u===z?null:z)}function q(z){if(d===z){K();return}D(),d=z;let ne=v(z);a.textContent=`${ne?.name||z} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=ka(l,{root_dir:z,queue:()=>N(z),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:be=>{h.set(z,be),ee()}}),g.load(),ee()}function D(){g?.destroy(),g=null}function K(z){D(),d=null,s.hidden=!0,a.textContent="",z!==!0&&ee()}let L=()=>K();i.addEventListener("click",L);function I(z){z.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",I);function te(z,ne){let be=Math.max(ne,z,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${z}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:be},(Ee,Ze)=>Ze<z?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Ae(z){let ne=z.auto_advance===!0,be=z.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Yd():Vd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${be?" is-on":""}`}
        data-act="merge"
        aria-pressed=${be?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${be?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Zd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===z.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===z.root_dir?"true":"false"}
        aria-label=${`${z.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Qd()}
      </button>`}function ke(z){let ne=Sh(z);return ne?c`<div class="mon2-deck__chips">
      ${ne.orchestration?c`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?c`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function _e(z){let ne=[];for(let[be,Ee]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ze=sl(z,be);Ze>0&&ne.push(`${Ee} ${Ze}`)}return ne.join(" \xB7 ")}function ie(z){let ne=sl(z,"running"),be=typeof z.slots=="number"?z.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${be}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${be}</span>
          ${te(ne,be)}
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
        <div class="mon2-deck__ops">${Ae(z)}</div>
        <span class="mon2-deck__counts">${_e(z)}</span>
        ${ke(z)}
      </div>
    </div>`}function Ce(z){let ne=t.doneItems?t.doneItems():[],be=t.rangeLabel?t.rangeLabel():"",Ee=Jd(Array.isArray(ne)?ne:[]),Ze=ce=>z.reduce((Ue,gt)=>Ue+sl(gt,ce),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${z.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${be}`}
        >실행 ${Ze("running")} · 대기 ${Ze("queue")} · PR
        ${Ze("pr_wait")}${Ze("session_active")>0?` \xB7 \uC138\uC158 ${Ze("session_active")}`:""}
        · ${be} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${Ee===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Ee=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Xd(be)}
                  >${Ee}</span
                >`:Ee.map(ce=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ce.provider}
                      title=${ce.tooltip}
                      >${ce.label}</span
                    >`)}
          </span>`}
    </div>`}function De(){let z=b();return z.length===0?"":c`${Ce(z)}
      <div class="mon2-deck__strip">
        ${z.map(ne=>ie(ne))}
      </div>`}function $e(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function ee(){U(),$e(),d!==null&&!v(d)&&K(!0),st(De(),r),g?.render()}function Z(z){let ne=z.target;if(!ne||typeof ne.closest!="function")return;let be=ne.closest("[data-root-dir]");if(!be)return;let Ee=be.getAttribute("data-root-dir")||"",Ze=ne.closest("[data-act]")?.getAttribute("data-act");if(Ze==="worker"){t.gotoWorkerTab?.(Ee);return}if(Ze==="auto"){Y("worker-automation-toggle",Ee,{on:N(Ee)?.auto_advance!==!0});return}if(Ze==="merge"){Y("worker-merge-auto-toggle",Ee,{on:N(Ee)?.auto_merge!==!0});return}if(Ze==="gear"){q(Ee);return}V(Ee)}function Re(z){if(z.key!=="Enter"&&z.key!==" ")return;let ne=z.target;if(!ne||typeof ne.closest!="function")return;let be=ne.closest('[data-root-dir][role="button"]');!be||be!==ne||(z.preventDefault(),V(be.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",Re),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",Z),r.removeEventListener("keydown",Re),i.removeEventListener("click",L),D(),st(c``,r),e.replaceChildren()}}}function tp(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let g=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));g&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Eh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Aa="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Th="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ch="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ts="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function js(e,t){return`${e}\0${t}`}function Rh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Oh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ws(e,t){let n=e.entries,r=n.map(g=>g.bead_id),s=Rh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[g,h]of s)for(let b of h)o.push({blocker:b,blockee:g});let a=Oh(e,t),i=new Map(r.map((g,h)=>[g,h])),l=r.slice(0,a).filter(g=>s.get(g).some(h=>Number(i.get(h))>Number(i.get(g)))),u=tp(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(g=>[g.bead_id,g]));return{entries:[...n.slice(0,a),...u.order.map(g=>d.get(g))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function np(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ws(n,t)}function Lh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Ih(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ph(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function ol(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Mh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(js(a,l));let r=new Map,s=new Map;for(let a of e){let i=js(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=js(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Dh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Nh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function xa(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function al(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function zs(e){let t=Ph(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Ih(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,g)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(ol(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),g!==void 0&&r.add(js(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...g===void 0?{}:{lane_id:g}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let g=t.get(u)||[];if(!g.includes(d))return;let h=o(u);h!==null&&(t.set(u,g.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(js(u,d))}}function Hs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Mh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Lh(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function rp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Bs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function sp(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function op(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(xa(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Us(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Sa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function il(e,t,n){let r=zs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Eh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Th};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ts}}if(e.kind==="chain"&&d===void 0)return{refused:ts};let g=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(V=>V.bead_id===e.bead_id);if(v<0)return;let N=v>0?d.entries[v-1]:null,U=v+1<d.entries.length?d.entries[v+1]:null,Y=Bs(d,v),ae=U!==null&&Bs(d,v+1);Y&&N!==null&&r.removeDep(e.bead_id,N.bead_id),ae&&U!==null&&r.removeDep(U.bead_id,e.bead_id),(Y||ae)&&N!==null&&U!==null&&r.addDep(U.bead_id,N.bead_id,u)},h=(v,N)=>{let U=n.cross_lanes.get(v),Y=U.entries.findIndex(Ae=>Ae.bead_id===e.bead_id),ae=U.entries.filter(Ae=>Ae.bead_id!==e.bead_id),V=Math.max(0,Math.min(ae.length,Y>=0&&N>Y?N-1:N)),q=-1;if(ae.forEach((Ae,ke)=>{n.fixed_members.has(Ae.bead_id)&&(q=ke)}),V<=q){r.state.refusal=Ch;return}let D=Y>=0?U.entries[Y]:d?.entries.find(Ae=>Ae.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Ws({status:U.status,entries:[...ae.slice(0,V),D,...ae.slice(V)]},n);let K=i.entries;if(Sa(K,U.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:v,entries:Us(K)}}),U.status!=="confirmed")return;let L=K.findIndex(Ae=>Ae.bead_id===e.bead_id),I=L>0?K[L-1].bead_id:null,te=L+1<K.length?K[L+1].bead_id:null;if(I===null){te!==null&&r.addDep(te,e.bead_id,v);return}if(r.addDep(e.bead_id,I,v),te!==null&&(r.graph.get(te)||[]).includes(I)){let Ae=U.entries.findIndex(ke=>ke.bead_id===te);(r.laneCreated(te,I)||Ae>0&&U.entries[Ae-1].bead_id===I&&Bs(U,Ae))&&r.removeDep(te,I),r.addDep(te,e.bead_id,v)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(g(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...sp(n,d,u,d.entries.filter(v=>v.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Us(d.entries.filter(v=>v.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=Dh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(xa(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let N=n.parallel_rows,U=N[Math.max(0,Math.min(N.length,t.marker_index))];if(!(!!U&&U.bead_id===e.bead_id)&&Nh(n,e.root_dir)&&b!==void 0){let ae=b>v?v:v-1;ae>=0&&ae!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&o.push(xa(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let v=b>t.index?t.index:t.index-1;v>=0&&v!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else o.push(xa(e.bead_id,e.root_dir,t.index,t.lane_id));return Hs(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function ap(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ws(n,t);if(r.held)return{refused:Aa};let s=r.entries,o=zs(t),a=[];rp(o,s,e),o.state.refusal===null&&op(o,t,s,a);let i=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Hs(o,t,i,a,{lane_id:e,correction:r})}function ip(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=Ws(n,t),s=r.entries,o=zs(t),a=[];rp(o,s,e),o.state.refusal===null&&op(o,t,s,a);let i=Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}];return Hs(o,t,i,a,{lane_id:e,correction:r})}function lp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=Ws(n,t),s=r.entries;return Hs(zs(t),t,Sa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Us(s)}}],[],{lane_id:e,correction:r})}function cp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ts};let r=zs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Bs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Hs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:sp(t,n,e,n.entries)})}function up(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Bs(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${al(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function dp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function pp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function ll(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var qh="\uC0AC\uC774\uD074";function fp(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=ol(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:qh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function _p(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var mp={running:3,paused:2,failed:1};function Tr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function gp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function bp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Tr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Tr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),g=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=mp[u.run_state],g=mp[i];if(d>g||d===g&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var hp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Gs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ea(e,t){let n=hp.find(s=>s.step===e);if(!n)return null;let r=hp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function yp(e){let t=Gs.findIndex(n=>n.step===e);return Gs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=Gs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Fh(e){let t=Gs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Gs.length}}function Ta(e){let t=Fh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ul=new Set(["queued","running","retry_pending","repairing"]),vp=new Set(["failed","succeeded"]),jh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ks={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Bh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ks.base_containment,child_sweep:Ks.child_sweep,branch_cleanup:Ks.branch_cleanup,parent_close:Ks.parent_close};function Uh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Wh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ul,...vp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function zh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function cl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=jh[s];if(!o)return null;let a=Ea(n,`${r} ${o}`);return a?{...a,active:ul.has(s),failed:s==="failed"}:null}function Hh(e){return!e||typeof e!="object"?null:Bh[e.step]||null}function Vs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Hh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Uh(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&Wh(v,t,i)).sort(zh):[],u=a?l:[],d=u.find(v=>ul.has(v.state));if(d)return cl(d);if(s)return s.step==="repo_operations"&&l[0]?cl(l[0],!0):null;let g=u.find(v=>vp.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return cl(g);if(r){let v=Ea(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Ks[e.cleanup_cursor]:null;if(!h)return null;let b=Ea(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Ca(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Gh="\uBBF8\uC801\uC7AC";function dl(e,t){let n=Eo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function wp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=dl(o,{id:l,location_label:s.get(l)||Gh}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function pl(e,t){return`${e}\0${t}`}function kp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function fl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ys(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function $p(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ys(s)})`,location_label:Ys(s),scope:null,same_lane_ahead:!1};let a=fl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function xp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=pl(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=pl(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let v of h){let N=r.get(v);N&&N!==u&&!b.includes(N)&&b.push(N)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let g=d.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),d.push(...s.get(g)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let g=n.get(d);o(d,i)&&g&&u.push(g)}u.length>0&&a.set(i,u)}return a}function Ap(e,t){return pl(e,t)}var Sp=1,Zs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ml=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ns={show_blocked:!0,spec:"all"},Ep={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Kh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Tr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Vh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Tr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Yh(e,t){let{winners:n,resumed_from_ids:r}=bp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:On(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Tp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Ht(e){return e&&typeof e=="object"?e:{}}function Zh(e,t,n){let r=Ht(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>wn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Cp(Er(l,o),Er(u,o)),g=Cp(pr(l,null),pr(u,null));return d||g?{orchestration:d,worker:g}:null}function Cp(e,t){return!e||t&&t.text===e.text?null:e}function Rp(e,t){let n=fl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Qh(e,t,n){let r=t.get(e);if(!r)return Rp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ys(r)}function Xh(e,t,n,r){let s=t.get(e);if(!s)return{label:Rp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ys(s),title:""}}function Jh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function ey(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ty(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let g=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,ae)=>{let V=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(V.length===0)return;let q=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",D=n.get(V),K=D?D.state:void 0,L=K==="running"||K==="pr_wait"||K==="done",I=!D||K==="runnable",te=D&&D.lane==="parallel"&&typeof D.position=="number"?D.position-1:null,Ae=Xh(V,n,r,t),ke=b.length>0?b[b.length-1].id:null,_e=g==="confirmed"&&ke!==null&&!(t.get(V)||[]).includes(ke);b.push({id:V,title:s.get(V)||V,root_dir:D?D.root_dir:q,workspace_name:D?D.workspace_name:o.get(q)||"",seq:ae+1,location_label:Ae.label,location_title:Ae.title,draggable:!L,fixed:L,done:K==="done",unplaced:I,mismatch:_e,...te!==null?{queue_index:te}:{}})}),b.forEach((Y,ae)=>{Y.seq=ae+1});let v=b.length>0&&b.every(Y=>Y.done),N=b.filter(Y=>!Y.fixed&&a.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),U=ey(d,g,b,v,N,a);i.push({lane_id:d,status:g,draft:g==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:v,can_confirm:g==="draft"&&b.length>=2,has_mismatch:g==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:N,...U})}),i}function ny(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function ry(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:g,state:h}=ny(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:g})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,g=a.get(d);g?g.push(l):a.set(d,[l])}let i=(l,u,d)=>{let g=u.cards[0],h={id:g.id,title:g.title,location_label:Qh(g.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let g=ya(l[u].scope,l[d].scope);g.length!==0&&(i(l[u],l[d],g),i(l[d],l[u],g))}}function _l(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ra(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function gl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...ns,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Zs.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&u.set(R.root_dir,R);let d=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);for(let R of r)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);let g=[],h=[],b=[],v=[],N=[],U=[],Y=new Map,ae=new Map,V=new Map,q=new Map,D=new Map,K=new Map,L=new Map,I=new Set,te=new Map,Ae=new Map,ke=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let le=R.root_dir,Me=R.name||le,Ne=u.get(le),Qe=Ne&&typeof Ne.revision=="number"?Ne.revision:typeof R.revision=="number"?R.revision:0,rt=Ht(R.attempts),bt=Ht(R.bead_titles);for(let[A,B]of Object.entries(bt))typeof B=="string"&&B.length>0&&ke.set(A,B);let ht=Ht(R.bead_times),re=Ht(R.pr_observations),Q=Ht(R.admission),je=Ht(R.revise_parked),ot=Ht(R.merge_queue_state),ze=Ht(R.cleanup_failed),we=Ht(R.discard_operations),Ke=Ht(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&te.set(le,Ht(R.bead_scope));let ct=Ht(R.bead_workflow),_t=Ht(R.pr_activity),mt=Array.isArray(R.repo_operations)?R.repo_operations:[],Mt=Array.isArray(R.merge_queue)?R.merge_queue:[],Yt=new Set(Mt.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Gt=new Map(Mt.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),Ot=Array.isArray(R.queue)?R.queue:[];for(let A of[...Ot,...Array.isArray(R.pr_wait)?R.pr_wait:[]])A&&typeof A.bead_id=="string"&&typeof A.armed_by_lane=="string"&&A.armed_by_lane.length>0&&K.set(A.bead_id,A.armed_by_lane);for(let A of Array.isArray(R.disarmed_on_load)?R.disarmed_on_load:[])typeof A=="string"&&A.length>0&&I.add(A);let It=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),et=Ht(R.lane_states),qe=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,It.length);V.set(le,qe),q.set(le,Ot.length);let P=new Map(It.map(A=>[A.id,A])),J=new Map;for(let A of It)for(let B of A.entries)B&&typeof B.bead_id=="string"&&J.set(B.bead_id,A.id);for(let[A,B]of Object.entries(Ke))Array.isArray(B)&&D.set(A,B.filter(xe=>typeof xe=="string"&&xe.length>0));let ve=Array.isArray(R.done)?R.done:[];for(let A of ve)A&&typeof A.bead_id=="string"&&U.push({id:A.bead_id,root_dir:le,workspace_name:Me});let E=new Map;for(let A of ve)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&E.set(A.bead_id,A.added_at);let H=A=>({id:A,title:bt[A]||A,root_dir:le,workspace_name:Me,expected_revision:Qe,draggable:!1,...Ht(ht[A]).created_at?{created_at:Ht(ht[A]).created_at}:{},...Ht(ht[A]).updated_at?{updated_at:Ht(ht[A]).updated_at}:{}}),Pe=A=>{let B=ct[A]?.chips?.pr;return B&&typeof B.number=="number"&&typeof B.url=="string"?{pr_number:B.number,pr_url:B.url}:{}},x=A=>Object.hasOwn(Ke,A)?{blocked_by:Array.isArray(Ke[A])?Ke[A].filter(B=>typeof B=="string"&&B.length>0):[]}:{},S=new Set;for(let[A,B]of Yh(rt,E)){S.add(A);let xe=B.run_state==="failed"?Jh(rt,B.attempt_id):null;xe!==null&&L.set(A,xe),h.push({...H(A),lane:"running",...x(A),...J.has(A)?{serial_lane_id:J.get(A)}:{},attempt_id:B.attempt_id,run_state:B.run_state,status:B.status||void 0,workflow:ct[A]||null,can_pause:B.can_pause,can_resume:B.can_resume,started_at:B.started_at,last_event_at:B.last_event_at,last_activity:B.last_activity,legs:B.legs,runner:B.runner,model:B.model,effort:B.effort,speed:B.speed,resumed_from:B.resumed_from,continuation_mode:B.continuation_mode,usage:B.usage,exec_chips:{orchestration:Fs(B),worker:null},discard:Bn(we,A,{attempt_id:B.attempt_id}),badges:B.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:B.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:B.run_state==="failed"})}for(let[A,B]of gp(rt)){if(h.some(pe=>pe.id===A))continue;let xe=B.attempt,Ve=B.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(A),lane:"running",kind:"session",...x(A),attempt_id:typeof xe.attempt_id=="string"?xe.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ct[A]||null,can_pause:!1,can_resume:!1,started_at:B.started_at,last_event_at:typeof xe.last_event_at=="number"?xe.last_event_at:null,last_activity:xe.last_activity&&typeof xe.last_activity=="object"?xe.last_activity:null,legs:Array.isArray(xe.legs)?xe.legs:[],runner:typeof xe.runner=="string"?xe.runner:null,model:typeof xe.model=="string"?xe.model:null,effort:typeof xe.effort=="string"?xe.effort:null,speed:typeof xe.speed=="string"?xe.speed:null,resumed_from:null,continuation_mode:null,usage:xe.usage&&typeof xe.usage=="object"?xe.usage:null,exec_chips:{orchestration:Fs(xe),worker:null},discard:Bn(we,A,{merge_queued:!0}),badges:[B.origin==="auto"?`${Ve} \xB7 \uC790\uB3D9`:Ve],alert:!1})}for(let A of Array.isArray(R.session_active)?R.session_active:[]){let B=A&&A.bead_id;typeof B!="string"||S.has(B)||(S.add(B),Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&D.set(B,A.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)),typeof A.title=="string"&&A.title.length>0&&ke.set(B,A.title),h.push({...H(B),title:A.title||bt[B]||B,lane:"running",kind:"session",status:"in_progress",started_at:_l(A.started_at)??_l(A.updated_at)??void 0,updated_at:_l(A.updated_at)??void 0,workflow:A.workflow||null,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(xe=>typeof xe=="string"&&xe.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(A.session_refs)?A.session_refs:[],badges:[],alert:!1}))}for(let A of Array.isArray(R.pr_wait)?R.pr_wait:[]){let B=A&&A.bead_id;if(typeof B!="string"||S.has(B))continue;S.add(B);let xe=Ht(re[B]),Ve=Ht(xe.pr),pe=xe.gate?Ht(xe.gate):null,Xe=Yt.has(B),St=Gt.get(B)?.continuation_action||null,yt=!!St&&St.continuation===null,Ft=ot.active===B,Jt=A.external===!0,Lt=ze[B]||null,_n=Ht(_t[B]),Kt=Vs({bead_id:B,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:_n.merge_progress||null,cleanup_failed:Lt,repo_operations:mt}),nn=Ca(Kt),on=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Ye=!!Lt&&["child_sweep","branch_cleanup","parent_close"].includes(Lt.step)&&!!pe&&pe.tier==="merged",an=Jt&&!!Lt&&!!pe&&pe.tier==="merged",lt=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier)&&pe.reason!=="review_receipt_undetermined",Ie=Bn(we,B,{external:Jt,merge_active:Ft||Kt?.step==="merge",merge_queued:Xe,cleanup_active:nn,merged:!!Lt||pe?.tier==="merged"}),C=!!Ie.operation;b.push({...H(B),lane:"pr_wait",...x(B),workflow:ct[B]||null,pr_number:typeof Ve.number=="number"?Ve.number:null,pr_url:typeof Ve.url=="string"?Ve.url:void 0,external:Jt,usage:On(rt,B),merge_step:Kt,badges:yt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Kt?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Lt?[Cr(Lt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(Lt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:Kt?Kt.failed===!0:!!Lt||lt,reason:Lt&&Kt?.active!==!0?Ta(Lt.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Ye&&!an?!1:!Xe||yt,merge_enabled:!C&&(yt||pe?.enabled===!0||on||Ye||an),merge_label:yt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":an||Ye?"\uC815\uB9AC \uC7AC\uAC1C":on&&!Ye?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:yt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":C?Ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:an?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":on?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Xe&&!yt,cancel_enabled:!Ft,continuation_mismatch:St?.mismatch||null,discard:Ie,discard_action:Ie.action,discard_enabled:Ie.enabled,discard_title:Ie.title})}let X=(A,B,xe,Ve)=>{let pe=A&&A.bead_id;if(typeof pe!="string"||S.has(pe))return null;S.add(pe);let Xe=je[pe],St=Bn(we,pe),yt=St.operation?St:null,Ft={...H(pe),lane:B,workflow:ct[pe]||null,draggable:!yt,discard:yt||void 0,reason:Tp(Q,pe),seq:xe+1,queue_position:xe+1,queue_index:xe,queue_length:Ve,badges:Xe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Xe,revise_action:!!Xe,revise_enabled:!!Xe&&!yt,revise_title:Xe?Xe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Xe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Jt=x(pe);return Object.hasOwn(Jt,"blocked_by")&&(Ft.blocked_by=Jt.blocked_by),Ft};for(let A=0;A<Ot.length;A++){let B=X(Ot[A],"queue",A,Ot.length);if(!B)continue;v.push(B);let xe=Y.get(le);xe?xe.push(B):Y.set(le,[B])}let me=A=>{let B=b.find(Xe=>Xe.id===A&&Xe.root_dir===le);if(B)return{id:A,title:B.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let xe=h.find(Xe=>Xe.id===A&&Xe.root_dir===le),Ve=xe?xe.run_state:Kh(rt,A),pe=Ve==="failed"||Ve==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ve==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:A,title:xe?xe.title:H(A).title,badge:pe}},Se=[];for(let A=0;A<Math.max(qe,It.length);A++){let B=`s${A+1}`,xe=P.get(B),Ve=xe&&Array.isArray(xe.entries)?xe.entries:[],pe=Ht(et[B]),Xe=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(Ft=>typeof Ft=="string"):[],St=new Set(Xe),yt=[];for(let Ft=0;Ft<Ve.length;Ft++){let Jt=Ve[Ft]&&Ve[Ft].bead_id;if(typeof Jt=="string"&&St.has(Jt)){S.add(Jt);continue}let Lt=X(Ve[Ft],B,Ft,Ve.length);Lt&&(yt.push(Lt),v.push(Lt))}yt.length===0&&Xe.length===0&&(qe<=1||A>=qe)||Se.push({id:B,index:A,items:yt,raw_length:Ve.length,occupied_by:Xe,occupants:Xe.map(Ft=>me(Ft)),corrections:Array.isArray(pe.corrections)?pe.corrections.length:0,cycle:pe.cycle===!0,...yt.length===0&&Xe.length===0?{empty:!0}:{}})}ae.set(le,Se);let ge=Array.from({length:qe},(A,B)=>{let xe=`s${B+1}`,Ve=P.get(xe),pe=Ve&&Array.isArray(Ve.entries)?Ve.entries:[],Xe=Ht(et[xe]);return{id:xe,index:pe.length,length:pe.length,occupied_by:Array.isArray(Xe.occupied_by)?Xe.occupied_by.filter(St=>typeof St=="string"):[]}});for(let A of Array.isArray(R.runnable)?R.runnable:[]){let B=A&&A.bead_id;if(typeof B!="string"||S.has(B))continue;S.add(B);let xe=A.workflow&&typeof A.workflow=="object"?A.workflow:null,Ve=xe&&typeof xe.route=="string"&&xe.route||(typeof A.route=="string"?A.route:null),pe=Zh(Ht(Ne),A.exec_pins,Ve);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&D.set(B,A.blocked_by.filter(Xe=>typeof Xe=="string"&&Xe.length>0)),typeof A.title=="string"&&A.title.length>0&&ke.set(B,A.title),Array.isArray(A.scope)&&Ae.set(B,A.scope.filter(Xe=>typeof Xe=="string"&&Xe.length>0)),g.push({...H(B),title:A.title||bt[B]||B,lane:"runnable",draggable:!0,reason:Tp(Q,B),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",published:A.published===!0,workflow:xe||(Ve?{route:Ve,chips:{route:Ve}}:null),...pe?{exec_chips:pe}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(Xe=>typeof Xe=="string"&&Xe.length>0)}:{},place_index:Ot.length,place_lanes:ge})}for(let A of ve){let B=A&&A.bead_id;if(typeof B!="string"||S.has(B)||(S.add(B),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let xe=Vh(rt,B),Ve=xe&&typeof xe.done_kind=="string"?xe.done_kind:null;N.push({...H(B),lane:"done",done:!0,done_layout:"three_line",usage:On(rt,B),work_ms:da(rt,B),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Ve,...Pe(B),badges:[...Ve&&Ep[Ve]?[Ep[Ve]]:[],...ua(rt,B)]})}}let _e=new Map;s.forEach((R,le)=>{R&&typeof R.root_dir=="string"&&_e.set(R.root_dir,le)});let ie=n&&n.running_sort==="repo"?"repo":"started";h.sort((R,le)=>{let Me=R.kind==="session",Ne=le.kind==="session";if(Me!==Ne)return Me?1:-1;if(Me&&Ne){let bt=Ra(le.updated_at)-Ra(R.updated_at);return bt!==0?bt:R.id.localeCompare(le.id)}if(ie==="repo"){let bt=_e.get(R.root_dir)??Number.MAX_SAFE_INTEGER,ht=_e.get(le.root_dir)??Number.MAX_SAFE_INTEGER;if(bt!==ht)return bt-ht}let Qe=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,rt=typeof le.started_at=="number"&&Number.isFinite(le.started_at)?le.started_at:null;return Qe!==null&&rt!==null&&Qe!==rt?Qe-rt:Qe===null&&rt!==null?1:Qe!==null&&rt===null?-1:R.id.localeCompare(le.id)}),N.sort((R,le)=>(le.done_at??0)-(R.done_at??0));let Ce=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),De=new Set(g.map(R=>R.root_dir)),$e=[];for(let R of Ce){if(!R||typeof R.root_dir!="string")continue;let le=Y.get(R.root_dir)||[],Me=ae.get(R.root_dir)||[];!(le.length>0||Me.some(Qe=>Qe.items.length>0||Qe.occupied_by.length>0))&&!De.has(R.root_dir)||$e.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=Sp?R.slots:Sp,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Ht(R.runner_catalog),items:le,sublanes:{parallel:le,serial:Me},serial_lane_count:V.get(R.root_dir)||0,raw_queue_length:q.get(R.root_dir)||0})}let ee={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:v,queue_groups:$e,running:h,pr_wait:b,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(q),owner_of:{}},Z=kp(ee);for(let R of U)Z.has(R.id)||Z.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});for(let R of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){if(!Object.hasOwn(R,"blocked_by"))continue;let le=Z.get(R.id);R.blockers=(R.blocked_by||[]).map(Me=>$p(Me,le,Z,s))}for(let R of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let le=(R.blockers||[]).map(Ne=>({...dl(R.id,Ne),openable:!0}));if(le.length===0)continue;let Me={predecessors:le};R.dependency_chips=Me}ry(ee,te,Ae,Z,s);let Re=xp(ee.queue_groups);for(let R of ee.queue_groups)for(let le of R.sublanes.serial){let Me=Re.get(Ap(R.root_dir,le.id));Me&&(le.cross_wait_peers=Me)}ee.chain_lanes=ty(i&&Array.isArray(i.lanes)?i.lanes:[],D,Z,s,ke,d,{armed_by_bead:K,failed_by_bead:L,disarmed_lanes:I});let z=new Map;for(let R of[...ee.queue,...ee.runnable])z.has(R.id)||z.set(R.id,R);let ne=new Set;for(let R of ee.chain_lanes)for(let le of R.rows){if(R.status==="confirmed"&&!le.unplaced&&!le.fixed&&ne.add(le.id),!R.draft&&!le.unplaced)continue;let Me=z.get(le.id);Me&&(Me.cross_lane_chip={lane_id:R.lane_id,number:R.number,status:R.status,label:R.draft?`\uC5F0\uACB0 ${R.number} (draft)`:`\uC5F0\uACB0 ${R.number}`})}let be=new Map(ee.chain_lanes.map(R=>[R.lane_id,R.number]));for(let R of[...ee.queue,...ee.running]){let le=K.get(R.id);if(typeof le!="string"||le.length===0)continue;let Me=be.get(le);R.armed_lane_chip=Me===void 0?{lane_id:le,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:le,label:`\u25B6 \uC5F0\uACB0 ${Me}`,orphan:!1}}let Ee=[];for(let R of Y.values())for(let le of R)ne.has(le.id)||Ee.push(le);Ee.sort((R,le)=>{let Me=R.workspace_name.localeCompare(le.workspace_name);return Me!==0?Me:(R.queue_index??0)-(le.queue_index??0)}),ee.parallel_rows=Ee;let Ze={};for(let[R,le]of Z)typeof le.root_dir=="string"&&le.root_dir.length>0&&(Ze[R]=le.root_dir);for(let R of ee.chain_lanes)for(let le of R.rows)!Object.hasOwn(Ze,le.id)&&le.root_dir.length>0&&d.has(le.root_dir)&&(Ze[le.id]=le.root_dir);ee.owner_of=Ze;let ce=ee.runnable.length;ee.runnable_all=ee.runnable.slice();let Ue=ee.runnable;a.show_blocked||(Ue=Ue.filter(R=>R.blocked!==!0));let gt=Ue.length;a.spec==="with"?Ue=Ue.filter(R=>R.published===!0):a.spec==="without"&&(Ue=Ue.filter(R=>R.published!==!0)),ee.runnable_hidden={blocked:ce-gt,spec:gt-Ue.length};let At=(R,le)=>{let Me=Ra(le.updated_at)-Ra(R.updated_at);return Me!==0?Me:R.id.localeCompare(le.id)},dt=l==="repo_spec"?(R,le)=>{let Me=R.published===!0?0:1,Ne=le.published===!0?0:1;return Me!==Ne?Me-Ne:At(R,le)}:At;if(l==="updated_flat")ee.runnable=Ue.slice().sort(At),ee.runnable_sections=[];else{let R=new Map;for(let Ne of Ue){let Qe=R.get(Ne.root_dir);Qe?Qe.push(Ne):R.set(Ne.root_dir,[Ne])}let le=[],Me=[];for(let Ne of Ce){if(!Ne||typeof Ne.root_dir!="string")continue;let Qe=(R.get(Ne.root_dir)||[]).slice().sort(dt);R.delete(Ne.root_dir),Qe.length!==0&&(le.push({root_dir:Ne.root_dir,name:Ne.name||Ne.root_dir,items:Qe.map(rt=>({...rt,workspace_name:""}))}),Me.push(...Qe))}for(let[Ne,Qe]of R){let rt=Qe.slice().sort(dt);le.push({root_dir:Ne,name:rt[0]?.workspace_name||Ne,items:rt.map(bt=>({...bt,workspace_name:""}))}),Me.push(...rt)}ee.runnable=Me,ee.runnable_sections=le}return ee}var Op="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",sy=1e4;function Lp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Ip(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Np="bdui.monitor.done-range",qp="bdui.monitor.running_sort",Fp="bdui.monitor.candidate_sort",jp="beads-ui.monitor.candidate-filter",Bp="beads-ui.monitor.sections";function oy(){try{let e=window.localStorage.getItem(jp);if(!e)return{...ns};let t=JSON.parse(e);return!t||typeof t!="object"?{...ns}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ns.show_blocked,spec:ml.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ns}}}function Pp(e){try{window.localStorage.setItem(jp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function ay(){try{let e=window.localStorage.getItem(Fp);return Zs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function iy(e){try{window.localStorage.setItem(Fp,e)}catch{}}function ly(){try{let e=window.localStorage.getItem(Bp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Mp(e){try{window.localStorage.setItem(Bp,JSON.stringify(e))}catch{}}function cy(){try{let e=window.localStorage.getItem(Np);return e===null?"today":Wn(e)}catch{return"today"}}function uy(e){try{window.localStorage.setItem(Np,e)}catch{}}function dy(){try{return window.localStorage.getItem(qp)==="repo"?"repo":"started"}catch{return"started"}}function py(e){try{window.localStorage.setItem(qp,e)}catch{}}var Up="tab:monitor:pipeline",fy=1e3,_y=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Dp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function my(e){return e>=1&&e<=Dp.length?Dp[e-1]:`(${e})`}function Wp(e,t){let n=Vt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),g=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=cy(),b=dy(),v=oy(),N=ay(),U=ly(),Y=null,ae=null,V=null,q=null,D=[],K=null,L=null,I=null,te=null;function Ae(p){return te===null&&(te=Ye()),np(p,te)}function ke(p,m){_e(),!(m<=0)&&(L={lane_id:p,corrected:m},I=setTimeout(()=>{I=null,L=null,ge()},sy))}function _e(){I!==null&&(clearTimeout(I),I=null),L=null}function ie(){let p=Dr.find(m=>m.value===h);return p?p.label:""}let Ce=document.createElement("div");Ce.className="mon",e.appendChild(Ce);let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let ee=document.createElement("div");ee.className="worker-drawer-host mon2-drawer",De.append($e,ee),e.appendChild(De);let Z=gl(null,null),Re=new Map,z=new Map,ne=null,be=null,Ee=null,Ze=Zr(ee,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,De.hidden=!0,ge()}});async function ce(p,m,y,$,W=!0){if(!o||!y)return null;let G=await o(p,{...m,root_dir:y,expected_revision:$});if(G&&G.conflict&&W){G.queue&&z.set(y,G.queue);let oe=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:$;G=await o(p,{...m,root_dir:y,expected_revision:oe})}return G&&G.queue&&y&&z.set(y,G.queue),G}function Ue(p,m){let y=z.get(p),$=s&&s.get?s.get():null,W=(Array.isArray($)?$:[]).find(oe=>oe?.root_dir===p);return(y||W)?.merge_queue?.find(oe=>oe.bead_id===m)?.continuation_action}async function gt(p,m,y,$){let W=await ce(p,m,y,$),G=z.get(y)?.revision??W?.queue?.revision??$;return Zn(W,(oe,he)=>ce(p,{...m,continuation:oe,decision_token:he},y,G,!1),{refresh:oe=>ce(p,m,y,oe?.queue?.revision??z.get(y)?.revision??G,!1)})}async function At(p,m,y,$){let W=await Zn({continuation_mismatch:$},(oe,he)=>ce("worker-merge-queue-add",{bead_id:m,continuation:oe,decision_token:he},p,y,!1)),G=W?.queue?.merge_queue?.find(oe=>oe.bead_id===m)?.continuation_action;W?.applied!==!0&&G?.continuation===null&&G.mismatch&&await At(p,m,W.queue.revision,G.mismatch)}async function $t(p,m,y){let $=await ce("worker-discard",p,m,y);if($&&$.discarded===!0){de(fa($),"success",5e3);return}if($&&$.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function dt(p,m,y){return!o||!y?null:await o(p,{...m,root_dir:y})}async function R(){let p=new Map;for(let m of Z.pr_wait)p.has(m.root_dir)||p.set(m.root_dir,m.expected_revision);for(let[m,y]of p)await ce("worker-merge-queue-add-all",{},m,y)}function le(p){let m=U[p];return!!(m&&m.runnable===!0)}function Me(p){let m={...U[p]||{}};m.runnable=!m.runnable,U={...U,[p]:m},Mp(U),ge()}function Ne(p){return U[p]===!0}function Qe(p){U={...U,[p]:U[p]!==!0},Mp(U),ge()}function rt(p){let m=Z.queue_groups.find(y=>y.root_dir===p);if(!m)return null;for(let y=0;y<m.serial_lane_count;y+=1){let $=`s${y+1}`,W=m.sublanes.serial.find(G=>G.id===$);if(!W||W.raw_length===0&&W.occupied_by.length===0)return $}return null}function bt(p,m){let y=Z.queue_groups.find(W=>W.root_dir===p),$=y?y.sublanes.serial.find(W=>W.id===m):void 0;return $?$.raw_length:0}function ht(p,m){let y=Re.get(p),$=Re.get(m);if(!y||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let W=Lp(y),G=Lp($);if(W!==null&&W===G&&y.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let oe=Ip(y),he=Ip($);if(oe&&G!==null){let tt=G;return{kind:"ops",title:`${tt} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:p,lane:tt,index:bt($.root_dir,tt)}]}}if(W!==null&&he&&G===null){let tt=W;return{kind:"ops",title:`${tt} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:m,lane:tt,index:bt(y.root_dir,tt)}]}}if(oe&&W===null&&he&&G===null){let tt=rt(y.root_dir);return tt===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${tt} \uB808\uC778\uC5D0 ${m} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:m,lane:tt,index:0},{bead_id:p,lane:tt,index:1}]}}return!oe&&!he?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:oe?{kind:"note",text:`${qs($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${qs(y.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function re(p,m){let y=ht(p,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:y.kind==="note"?{kind:"note",text:y.text}:y.kind==="disabled"?{kind:"disabled",label:Op,title:y.title}:{kind:"place",label:Op,title:y.title}}}function Q(p,m){if(!V||V.bead_id!==p)return null;let y=V.counterpart_id,$=m.filter(W=>W.id===y);return $.length===0?null:{rows:$.map(W=>re(p,W))}}function je(p){let m=p.dependency_chips||null,y=p.overlap_chips||[],$=p.scope_state==="missing",W=p.cross_lane_chip,G=p.armed_lane_chip;if(!m&&y.length===0&&!$&&!W&&!G)return null;let oe=Q(p.id,y);return{...m||{},...y.length>0?{overlaps:y}:{},...$?{scope_missing:!0}:{},...W?{cross_lane:{lane_id:W.lane_id,label:W.label}}:{},...G?{armed_lane:G}:{},...oe?{popover:oe}:{}}}function ot(p){let m=je(p);return m?{...p,dependency_chips:m}:p}async function ze(p,m){let y=ht(p,m);if(V=null,y.kind!=="ops"){ge();return}let $=lt(y.root_dir,y.ops[0].bead_id);for(let W of y.ops){let G=await we(W,y.root_dir,$);if(G===null)break;$=G}ge()}async function we(p,m,y){try{let $=await ce("worker-queue-place",p,m,y,!1);if($&&$.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return de($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let W=$.queue?$.queue.revision:void 0;return typeof W!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):W}catch($){return de(yt($),"error"),null}}function Ke(p){let m=le(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
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
    </header>`}function ct(p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${m}
    </div>`}function _t(p){if(ae!==p.id)return null;let m=Z.queue_groups.find(G=>G.root_dir===p.root_dir),y=p.place_lanes||[],$=Z.cross_lanes_revision!==null,W=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let G of Z.chain_lanes)W.push({id:`lane:${G.lane_id}`,label:`\uC5F0\uACB0 ${G.number} (${G.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:G.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});W.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let G of y)W.push({id:`serial:${G.id}`,label:`\uC9C1\uB82C ${Number(G.id.slice(1))}`,count:G.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:W}}function mt(){let p=[],m=new Set,y=($,W)=>{for(let G of $)m.has(G.id)||(m.add(G.id),p.push({bead_id:G.id,root_dir:G.root_dir,workspace_name:G.workspace_name,title:G.title,lane:W}))};return y(Z.running,"running"),y(Z.pr_wait,"pr_wait"),y(Z.queue,"queue"),y(Z.runnable_all,"runnable"),p}function Mt(p){if(!q||q.bead_id!==p)return"";let m=Kt(),y=mt(),$=new Map;for(let he of y)$.set(he.bead_id,he);let W=(m.get(p)||[]).filter(he=>$.has(he)),G=_p(fp(p,{issues:y,blocked_by_map:m}),q.query),oe=Z.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${W.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${W.map(he=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${he}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${he}
                aria-label=${`${he} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${q.query}
      />
      <div class="mon-deppanel__list">
        ${G.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:G.map(he=>c`<button
                  type="button"
                  class="mon-deppanel__cand${he.disabled?" is-disabled":""}"
                  data-dep-cand=${he.bead_id}
                  ?disabled=${he.disabled}
                  title=${he.reason||he.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${he.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${he.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${he.title}</span
                  >${he.reason?c`<span class="mon-deppanel__cand-reason"
                        >${he.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${oe===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Yt(p){return ct(p,c`${Zi(ot(p),_t(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(m,y)=>i(y,p.root_dir):void 0})}${Mt(p.id)}`)}function Gt(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(p=>Yt(p))}
      </div>`:c`${Z.runnable_sections.map(p=>{let m=le(p.root_dir);return c`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Ke({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${m?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(y=>Yt(y))}
            </div>`}
      </section>`})}`}function Ot(p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${m}
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
      ${Mt(p.id)}
    </div>`}function It(){let p=Ne("parallel");return c`<section
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
                </div>`:Z.parallel_rows.map((m,y)=>Ot(m,y))}
          </div>`}
    </section>`}function et(p,m,y,$){return c`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${y}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${my(m.seq)}</span
      >
      ${m.workspace_name?c`<span class="worker-mini__repo" title=${m.root_dir}
            >${m.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${m.id}</span>
      <span class="mon2-crow__title">${m.title}</span>
      ${m.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(m.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${m.location_title}
        >${m.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${m.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function qe(p){let m=Z.cross_lanes_revision!==null,y=Ae(p.lane_id),$=y?.held===!0,W=y?.cycle===!0,G=y?y.mismatched:[],oe=L&&L.lane_id===p.lane_id?L.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
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
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Aa}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!m||!p.can_confirm||$}
              title=${$?Aa:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!m}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!m}
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
            </div>`:p.rows.map((he,tt)=>et(p,he,tt,G))}
      </div>
    </div>`}function P(p,m,y){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${p.id}
      data-row-index=${y}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${cr(ot(m))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${m.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${Mt(m.id)}
    </div>`}function J(p){if(p.length===0)return"";let m=p.length-1;return`${p[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function ve(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${cr({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function E(p,m){return c`<div
      class="mon2-lane${m.empty?" mon2-lane--empty":""}"
      data-root-dir=${p.root_dir}
      data-lane-length=${String(m.raw_length)}
    >
      ${In({id:"",lane:m.id,title:`${p.name} \xB7 \uC9C1\uB82C ${m.index+1}`,items:m.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${p.root_dir}
          data-lane-id=${m.id}
          data-lane-length=${String(m.raw_length)}
        >
          ${m.occupants.map(y=>ve(y))}
          ${m.items.length>0?m.items.map((y,$)=>P(m,y,$)):m.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${m.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${m.occupants.length>0?m.occupants.map(y=>`${y.id} \u2014 ${y.badge}`).join(`
`):""}
            >${J(m.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${p.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${m.empty?c`<div class="mon2-lane__hint">
            ${p.name} 직렬 ${m.index+1} 비어 있음
          </div>`:""}
      ${m.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(m.cross_wait_peers||[]).map(y=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function H(){let p=Ne("serial"),m=Z.cross_lanes_revision!==null,y=Z.chain_lanes.some($=>$.draft&&$.rows.length===0);return c`<section
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
          ?disabled=${y||!m}
          title=${m?y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${p?"":c`<div class="mon2-area__body">
            ${Z.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${Z.chain_lanes.map($=>qe($))}
            ${Z.queue_groups.map($=>$.sublanes.serial.map(W=>E($,W)))}
          </div>`}
    </section>`}function Pe(){return c`<div class="mon2-wait">${It()}${H()}</div>`}function x(p){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(m=>el({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},p,Y,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:je(m)}}))}
    </div>`}function S(p){let m={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${_y.map(y=>{let $=m[y.lane],W=y.lane==="runnable"?Z.runnable_flat?$.length>0?Gt():void 0:Z.runnable_sections.length>0?Gt():void 0:y.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Pe():void 0:y.lane==="running"?x(p):$.length>0?c`${$.map(G=>cr(G))}`:void 0;return In({id:`monitor-${y.lane}`,lane:y.pane,title:y.lane==="done"?`\uC644\uB8CC\xB7${ie()}`:y.title,items:$,empty:y.empty,body:W,live:y.lane==="running"&&$.length>0,controls:y.lane==="runnable"?X():void 0,header_control:me(y.lane,$.length)})})}
      </div>`}function X(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ml.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${v.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${v.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function me(p,m){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${Zs.map(y=>c`<option
              value=${y.value}
              ?selected=${N===y.value}
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
      </select>`:p==="pr_wait"&&m>0?c`<button
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
      </select>`:""}function Se(p){let m=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,W={done_since:vr(h,d()),running_sort:b,candidate_filter:v,candidate_sort:N};return $!==void 0&&(W.cross_lanes=$),gl(m,y,W)}function ge(){let p=d();Z=Se(),te=null,Re=new Map;for(let m of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!m.non_occupying&&!Re.has(m.id)&&Re.set(m.id,m);st(S(p),Ce),B()?.render(),A(),xe()}function A(){let p=new Map;for(let m of Z.queue_groups)p.set(m.root_dir,m.auto_advance);for(let m of Array.from(Ce.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let y=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=p.get(y);typeof $=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function B(){if(Ee)return Ee;let p=Ce.querySelector(".mon2-deck");return p?(Ee=ep(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ie,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:pe,onFocusChange:m=>{K=m,xe()}}),Ee):null}function xe(){Ce.classList.toggle("has-focus",K!==null);for(let p of Array.from(Ce.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K);for(let p of Array.from(Ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=Re.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",K!==null&&!!m&&m.root_dir===K)}for(let p of Array.from(Ce.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",K!==null&&p.getAttribute("data-root-dir")===K)}function Ve(p,m){let y=a?a():void 0;if(!m||!y||m===y||!l){r(p);return}l(m).then(()=>{r(p)}).catch($=>{n("workspace switch for %s failed: %o",m,$)})}function pe(p){if(!p)return;let m=a?a():void 0,y=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||m&&m===p){y();return}l(p).then(y).catch($=>{n("workspace switch for %s failed: %o",p,$),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Xe(p){Sn(p).then(m=>{de(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function St(p){let m=Re.get(p)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function yt(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let m=p;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Ft(p,m,y){let $=Z.owner_of[m];if(typeof $!="string"||$.length===0){de(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await dt(p,{a:m,b:y},$),await Jt(p,m,y)}catch(W){de(yt(W),"error")}ge()}async function Jt(p,m,y){if(p!=="dep-add")return;let $=Z.chain_lanes.find(W=>W.rows.some(G=>G.id===m));!$||!$.rows.some(W=>W.id===y)||await wt(W=>lp($.lane_id,W),"",[{type:p,a:m,b:y}])}function Lt(p){return Z.runnable.some(m=>m.id===p)||Z.parallel_rows.some(m=>m.id===p)?!0:Z.queue_groups.some(m=>m.sublanes.serial.some(y=>y.items.some($=>$.id===p)))}function _n(p){!p||!Lt(p)||(q=q&&q.bead_id===p?null:{bead_id:p,query:""},ge())}function Kt(){let p=new Map,m=s&&s.get?s.get():null,y=$=>Array.isArray($)?$.filter(W=>typeof W=="string"&&W.length>0):[];for(let $ of Array.isArray(m)?m:[]){if(!$||typeof $!="object")continue;let W=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[G,oe]of Object.entries(W))Array.isArray(oe)&&p.set(G,y(oe));for(let G of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])G&&typeof G.bead_id=="string"&&Array.isArray(G.blocked_by)&&G.blocked_by.length>0&&p.set(G.bead_id,y(G.blocked_by))}return p}function nn(){let p=new Map,m=new Map,y=s&&s.get?s.get():null,$=W=>Array.isArray(W)?W.filter(G=>typeof G=="string"&&G.length>0):[];for(let W of Array.isArray(y)?y:[]){if(!W||typeof W!="object")continue;let G=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[oe,he]of Object.entries(G))Array.isArray(he)&&p.set(oe,$(he));for(let oe of Array.isArray(W.runnable)?W.runnable:[])oe&&typeof oe.bead_id=="string"&&Array.isArray(oe.blocked_by)&&m.set(oe.bead_id,$(oe.blocked_by))}for(let W of D)for(let G of[p,m]){let oe=G.get(W.a);oe!==void 0&&G.set(W.a,W.type==="dep-remove"?oe.filter(he=>he!==W.b):oe.includes(W.b)?oe:[...oe,W.b])}return{snapshot:p,runnable:m}}function on(){let p=Kt();for(let m of D){let y=(p.get(m.a)||[]).slice();m.type==="dep-remove"?p.set(m.a,y.filter($=>$!==m.b)):y.includes(m.b)||p.set(m.a,[...y,m.b])}return p}function Ye(p=Z,m=an()){let y=new Map;for(let ut of Array.isArray(m?.lanes)?m.lanes:[]){let rn=new Map;for(let Dt of Array.isArray(ut?.entries)?ut.entries:[])Dt&&typeof Dt.bead_id=="string"&&rn.set(Dt.bead_id,Dt.dep_created_by_lane===!0);y.set(typeof ut?.id=="string"?ut.id:"",rn)}let $=new Map,W=new Map,G=new Set,oe=new Set;for(let ut of p.chain_lanes){let rn=y.get(ut.lane_id);$.set(ut.lane_id,{status:ut.status,entries:ut.rows.map((Dt,pn)=>({bead_id:Dt.id,root_dir:Dt.root_dir,...pn===0?{}:{dep_created_by_lane:rn?.get(Dt.id)===!0}}))});for(let Dt of ut.rows)W.set(Dt.id,ut.lane_id),Dt.fixed&&G.add(Dt.id),Dt.unplaced||oe.add(Dt.id)}let he=new Map;for(let ut of p.parallel_rows)typeof ut.queue_index=="number"&&he.set(ut.id,ut.queue_index);for(let ut of p.queue_groups)for(let rn of ut.sublanes.serial)for(let Dt of rn.items)typeof Dt.queue_index=="number"&&he.set(Dt.id,Dt.queue_index);let tt=nn();return{blocked_by_map:on(),snapshot_blocked_by:tt.snapshot,runnable_blocked_by:tt.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:$,owner_lane_of:W,fixed_members:G,placed_members:oe,parallel_rows:p.parallel_rows.map(ut=>({bead_id:ut.id,root_dir:ut.root_dir,queue_index:ut.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:he}}function an(){return(s&&s.crossLanes?s.crossLanes():null)??null}function lt(p,m){let y=Re.get(m);if(y&&y.root_dir===p)return y.expected_revision;let $=Z.queue_groups.find(W=>W.root_dir===p);return $?$.revision:0}async function Ie(p,m,y){if(p.type==="worker-queue-disarm"){try{let $=await ce(p.type,p.payload,p.root_dir,y.get(p.root_dir)??lt(p.root_dir,m));$&&$.queue&&typeof $.queue.revision=="number"&&y.set(p.root_dir,$.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await C(p.type,p.payload,p.root_dir,y,{bead_id:m})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await dt(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch($){return de(yt($),"error"),!1}}async function C(p,m,y,$,W){try{let G=await ce(p,m,y,$.get(y)??lt(y,W.bead_id));return!G||typeof G.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(G.queue&&typeof G.queue.revision=="number"&&$.set(y,G.queue.revision),G.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):G.applied===!1?(de(G.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${G.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):G.queue&&typeof G.queue.revision=="number"?G.queue.revision:$.get(y)??0)}catch(G){return de(yt(G),"error"),null}}function ye(p){(p.type==="dep-add"||p.type==="dep-remove")&&(D=[...D,{type:p.type,a:p.a,b:p.b}])}async function Fe(p,m){if(!o)return{ok:!1};try{let y=await o(p.type,{...p.payload,expected_revision:m});return!y||typeof y.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:y.revision}}catch(y){let $=y,W=$&&$.code==="conflict"?$.details?.cross_lanes:null;return W&&typeof W.revision=="number"&&Array.isArray(W.lanes)?{ok:!1,conflict:W}:(de(yt(y),"error"),{ok:!1})}}async function xt(p,m,y){let $=new Map,W=[],G=p.ops.slice(0,p.lane_op_index),oe=p.ops.slice(p.lane_op_index);for(let tt of G){if(!await Ie(tt,y,$))return{done:!0};ye(tt)}let he=m;for(let tt of p.lane_ops){if(he===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ut=await Fe(tt,he);if(!ut.ok)return ut.conflict?{done:!1,conflict:ut.conflict}:{done:!0};he=ut.revision}for(let tt of oe){if(!await Ie(tt,y,$))return{done:!0};ye(tt),tt.type==="dep-add"&&W.push(tt)}for(let tt of dp(W))he=await Bt(tt,he);return{done:!0}}async function Bt(p,m){if(m===null||!o)return m;let y=p.pairs,$=m;for(let W=0;W<2;W+=1){if(y.length===0)return $;try{let G=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:y.map(oe=>({bead_id:oe.bead_id,after:oe.after,value:!0})),expected_revision:$});return G&&typeof G.revision=="number"?G.revision:$}catch(G){let oe=G,he=oe&&oe.code==="conflict"?oe.details?.cross_lanes:null;if(!he||typeof he.revision!="number"||!Array.isArray(he.lanes))return $;let tt=he.lanes.find(ut=>ut&&ut.id===p.lane_id);y=pp(Array.isArray(tt?.entries)?tt.entries:[],y),$=he.revision}}return $}async function wt(p,m,y=[]){D=y,_e();let $=Z,W=an();for(let G=0;;G+=1){let oe=p(Ye($,W));if("refused"in oe){de(oe.refused,"error");break}let he=await xt(oe,$.cross_lanes_revision,m);if(he.done){oe.correction&&ke(oe.correction.lane_id,oe.correction.corrected);break}if(G>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=Se(he.conflict),W=he.conflict}D=[],ge()}async function Ut(p,m){await wt(y=>il(p,m,y),p.bead_id)}async function tn(p,m){if(p==="run"){await $n(m);return}if(p==="stop"){await Wt(m);return}if(p==="create"){await wt(y=>ll(null,y),"");return}if(p==="remove"){let y=up(m,Ye());if(y!==null&&!g(y))return;await wt($=>cp(m,$),"");return}await wt(y=>p==="confirm"?ap(m,y):ip(m,y),"")}function ln(p){let m=new Map;for(let y of p.rows){let $=Z.owner_of[y.id]||y.root_dir;typeof $!="string"||$.length===0||m.set($,[...m.get($)||[],y.id])}return m}async function $n(p){let m=Z.chain_lanes.find(G=>G.lane_id===p);if(!m||Z.cross_lanes_revision===null){ge();return}_e();let y=new Map,$=new Map,W=ln(m);for(let G of m.rows){if(!G.unplaced)continue;let oe=Z.owner_of[G.id]||G.root_dir;if(typeof oe!="string"||oe.length===0){de(`${G.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),ge();return}let he=$.get(oe)??0;if(await C("worker-queue-place",{bead_id:G.id,lane:"parallel",index:(Z.parallel_raw_length[oe]??0)+he},oe,y,{bead_id:G.id})===null){ge();return}$.set(oe,he+1)}for(let[G,oe]of W)if(await C("worker-queue-arm",{bead_ids:oe,lane_id:p},G,y,{bead_id:oe[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),ge();return}ge()}async function Wt(p){let m=Z.chain_lanes.find($=>$.lane_id===p);if(!m||Z.cross_lanes_revision===null){ge();return}_e();let y=new Map;for(let[$,W]of ln(m))if(await C("worker-queue-disarm",{lane_id:p},$,y,{bead_id:W[0]})===null)break;ge()}async function Cn(p,m){let{root_dir:y,revision:$}=St(p);if(y.length===0){ge();return}await C("worker-queue-disarm",{bead_ids:[p],lane_id:m},y,new Map([[y,$]]),{bead_id:p}),ge()}async function xn(p,m){let y=Re.get(p);if(!y){ge();return}let $={kind:"candidate",bead_id:p,root_dir:y.root_dir};if(m==="new-lane"){await wt(W=>ll({bead_id:p,root_dir:y.root_dir},W),p);return}if(m.startsWith("lane:")){let W=m.slice(5);if(!Z.chain_lanes.find(oe=>oe.lane_id===W)){ge();return}await wt(oe=>il($,{kind:"chain",lane_id:W,marker_index:(oe.cross_lanes.get(W)?.entries??[]).length},oe),p);return}if(m.startsWith("serial:")){let W=m.slice(7),G=(y.place_lanes||[]).find(oe=>oe.id===W);await Ut($,{kind:"repo-serial",root_dir:y.root_dir,lane_id:W,index:G?G.index:0});return}await Ut($,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function rr(p,m){let y=Z.parallel_rows,$=y.findIndex(ut=>ut.id===p);if($<0)return;let W=y[$].root_dir,G=[];y.forEach((ut,rn)=>{ut.root_dir===W&&G.push(rn)});let oe=G.indexOf($),he=G[oe+m];if(typeof he!="number")return;let tt=m===-1?he:G[oe+2]??Math.min(y.length,he+1);await Ut({kind:"parallel",bead_id:p,root_dir:W,queue_index:y[$].queue_index??0},{kind:"parallel",marker_index:tt})}async function T(p){for(let m of Z.chain_lanes){let y=m.rows.find($=>$.id===p);if(y){await Ut({kind:"chain",bead_id:p,root_dir:y.root_dir,lane_id:m.lane_id,...typeof y.queue_index=="number"?{queue_index:y.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let O=null,Be=!1,He=null;function at(){He!==null&&clearTimeout(He),He=setTimeout(()=>{He=null,Be=!1},0)}function Tt(p,m){let y=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(y&&p.contains(y)){let $=Number(y.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return p.querySelectorAll("[data-row-index]").length}function f(p){let m=p.target,y=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!y||!O)return null;let $=y.getAttribute("data-drop");if($==="candidate")return{zone:y,target:{kind:"candidate"}};if($==="parallel")return{zone:y,target:{kind:"parallel",marker_index:Tt(y,m)}};if($==="chain")return{zone:y,target:{kind:"chain",lane_id:y.getAttribute("data-lane-id")||"",marker_index:Tt(y,m)}};if($==="repo-serial"){let W=y.getAttribute("data-root-dir")||"";if(W!==O.root_dir)return null;let G=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,oe=G&&y.contains(G)?G.getAttribute("data-queue-index"):y.getAttribute("data-lane-length"),he=Number(oe);return{zone:y,target:{kind:"repo-serial",root_dir:W,lane_id:y.getAttribute("data-lane-id")||"",index:Number.isFinite(he)?he:0}}}return null}function w(){for(let p of Array.from(Ce.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}function j(p){let m=p.target,y=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,$=y?y.closest("[data-drag-kind]"):null;if(!$)return;let W=$.getAttribute("data-bead-id")||"",G=$.getAttribute("data-drag-kind")||"",oe=$.getAttribute("data-root-dir")||"";if(!W||!G||!oe)return;let he=$.getAttribute("data-queue-index")||"",tt=Number(he),ut=$.getAttribute("data-lane-id")||"";O={kind:G,bead_id:W,root_dir:oe,...he!==""&&Number.isFinite(tt)?{queue_index:tt}:{},...ut?{lane_id:ut}:{}},Be=!0,ae=null,Ce.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",W),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function fe(p){let m=f(p);m&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function Oe(p){let m=p.target;typeof m?.closest=="function"&&m.closest("[data-drop]")?.classList.remove("is-drop-over")}function pt(){O=null,w(),Ce.classList.remove("is-dragging"),at()}function Le(p){let m=f(p),y=O;O=null,w(),Ce.classList.remove("is-dragging"),!(!m||!y)&&(p.preventDefault(),Ut(y,m.target))}function k(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function se(p,m){let{item:y,root_dir:$,revision:W}=St(m),G=y?.attempt_id||"",oe=p.classList;if(oe.contains("mon2-rowops__up")||oe.contains("mon2-rowops__down")){rr(m,oe.contains("mon2-rowops__up")?-1:1);return}if(oe.contains("mon2-rowops__remove")){ce("worker-queue-remove",{bead_id:m},$,W);return}if(oe.contains("mon2-crow__detach")){T(m);return}if(oe.contains("mon-dep__btn")){_n(m);return}if(oe.contains("worker-dep__open")){_n(m);return}if(oe.contains("mon2-arm__release")){Cn(m,p.getAttribute("data-lane-id")||"");return}if(oe.contains("mon-lane__chip")){let he=p.getAttribute("data-lane-id")||"";Ce.querySelector(`.mon2-clane[data-lane-id="${he}"]`)?.scrollIntoView({block:"nearest"});return}if(oe.contains("mon-deppanel__unlink")){let he=p.getAttribute("data-dep-a")||"",tt=p.getAttribute("data-dep-b")||"";g(`${tt}\uAC00 ${he}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Ft("dep-remove",he,tt);return}if(oe.contains("mon-deppanel__cand")){let he=p.getAttribute("data-dep-cand")||"";q&&he&&Ft("dep-add",q.bead_id,he);return}if(oe.contains("mon-overlap__chip")){let he=p.getAttribute("data-overlap-id")||"";V=!!V&&V.bead_id===m&&V.counterpart_id===he?null:{bead_id:m,counterpart_id:he},ge();return}if(oe.contains("mon-overlap__place")){ze(m,p.getAttribute("data-counterpart-id")||"");return}if(oe.contains("worker-card__place")){ae=ae===m?null:m,ge();return}if(oe.contains("worker-card__place-cancel")){ae=null,ge();return}if(oe.contains("worker-card__place-lane")){let he=p.getAttribute("data-lane")||"parallel";ae=null,xn(m,he);return}if(oe.contains("rtile__session")){if(y&&y.kind==="session"){let he=(y.session_refs||[]).find(tt=>tt&&tt.current===!0);he&&(De.hidden=!1,Ze.open(Hr(he,m,"in_progress",$)),ge());return}Y=G,G&&y&&(De.hidden=!1,Ze.open({attempt_id:G,root_dir:$,meta:k(y)})),ge();return}if(oe.contains("rtile__pause")){dt("worker-attempt-pause",{attempt_id:G},$);return}if(oe.contains("rtile__resume")){zr().then(he=>{if(he!==null)return gt("worker-attempt-resume",{attempt_id:G,...he!==""?{instructions:he}:{}},$,W)});return}if(oe.contains("rtile__dismiss")){ce("worker-attempt-dismiss",{attempt_id:G},$,W);return}if(oe.contains("rtile__discard")){if(!g(Ns(m,"unmerged")))return;$t({bead_id:m,...G?{attempt_id:G}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,W);return}if(oe.contains("worker-mini__merge")){let he=Ue($,m);he?.mismatch&&he.continuation===null?At($,m,W,he.mismatch):ce("worker-merge-queue-add",{bead_id:m},$,W);return}if(oe.contains("worker-mini__merge-cancel")){ce("worker-merge-queue-remove",{bead_id:m},$,W);return}if(oe.contains("worker-mini__discard")){let he=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Ns(m,he)))return;$t({bead_id:m,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,W);return}if(oe.contains("worker-mini__revise-fix")){gt("worker-revise-fix",{bead_id:m},$,W);return}oe.contains("worker-mini__revise-approve")&&ce("worker-revise-approve",{bead_id:m},$,W)}function F(p){let m=Be;Be=!1;let y=p.target;if(!y||typeof y.closest!="function"||y.closest("dialog")||y.closest(".worker-drawer-overlay")||y.closest("a"))return;let $=y.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){p.preventDefault();let An=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";An&&Xe(An);return}let W=y.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(W){p.preventDefault();let pn=W.getAttribute("data-root-dir")||Re.get(y.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||W.getAttribute("title")||"";pe(pn);return}let G=y.closest(".mon2-sec__toggle");if(G){p.preventDefault(),Me(G.getAttribute("data-root-dir")||"");return}let oe=y.closest(".mon2-area__toggle");if(oe){p.preventDefault(),Qe(oe.getAttribute("data-area")||"parallel");return}if(y.closest(".mon2-newlane")){p.preventDefault(),tn("create","");return}let he=y.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(he){p.preventDefault();let pn=he.getAttribute("data-lane-id")||"",An=he.classList;tn(An.contains("mon2-clane__confirm")?"confirm":An.contains("mon2-clane__reapply")?"reapply":An.contains("mon2-clane__run")?"run":An.contains("mon2-clane__stop")?"stop":"remove",pn);return}if(y.closest(".mon-merge-all")){p.preventDefault(),R();return}let tt=y.closest(".mon-filter__spec");if(tt){p.preventDefault(),v={...v,spec:tt.getAttribute("data-spec")||"all"},Pp(v),ge();return}let ut=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ut)return;let rn=ut.getAttribute("data-bead-id")||"",Dt=y.closest("button");if(Dt){p.preventDefault(),se(Dt,rn);return}rn&&!m&&(p.preventDefault(),Ve(rn,ut.getAttribute("data-root-dir")||St(rn).root_dir))}function Te(p){let m=p.target;if(!m||typeof m.closest!="function")return;let y=m.closest(".mon-filter__blocked");if(y){v={...v,show_blocked:y.checked},Pp(v),ge();return}let $=m.closest(".mon-candidate-sort");if($){N=Zs.some(oe=>oe.value===$.value)?$.value:"repo_spec",iy(N),ge();return}let W=m.closest(".mon-running-sort");if(W){b=W.value==="repo"?"repo":"started",py(b),ge();return}let G=m.closest(".mon-done-range");G&&(h=Wn(G.value),uy(h),ge())}function ft(p){let m=p.target,y=m&&typeof m.closest=="function"?W=>m.closest(W):()=>null,$=!1;V&&!y(".mon-overlap__popover, .mon-overlap__chip")&&(V=null,$=!0),q&&!y(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(q=null,$=!0),$&&ge()}function Je(p){p.key!=="Escape"||!V&&!q||(V=null,q=null,ge())}function vt(p){let m=p.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!q||(q={...q,query:m.value},ge())}e.addEventListener("click",F),e.addEventListener("change",Te),e.addEventListener("input",vt),document.addEventListener("click",ft),document.addEventListener("keydown",Je),e.addEventListener("dragstart",j),e.addEventListener("dragover",fe),e.addEventListener("dragleave",Oe),e.addEventListener("drop",Le),e.addEventListener("dragend",pt),s&&typeof s.subscribe=="function"&&(ne=s.subscribe(()=>{try{z.clear(),ge()}catch{}}));function it(){be!==null&&(clearInterval(be),be=null)}function Ct(){He!==null&&(clearTimeout(He),He=null)}return{load(){n("load"),ge(),be===null&&(be=setInterval(()=>{try{ge()}catch{}},fy))},pause(){it()},clear(){it(),Ct(),ne&&(ne(),ne=null),Ze.destroy(),De.hidden=!0,Ee?.destroy(),Ee=null,e.removeEventListener("click",F),e.removeEventListener("change",Te),e.removeEventListener("input",vt),document.removeEventListener("click",ft),document.removeEventListener("keydown",Je),e.removeEventListener("dragstart",j),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",Oe),e.removeEventListener("drop",Le),e.removeEventListener("dragend",pt),e.replaceChildren()}}}function zp(e,t,n){let r=Vt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let v=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",v),n.gotoView(v)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function g(){s&&st(u(),s),o&&st(d(),o)}return g(),a=t.subscribe(()=>g()),{destroy(){a&&(a(),a=null),s&&st(c``,s),o&&st(c``,o)}}}var Hp=["bug","feature","task","epic","chore"];function Gp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Kp=["Critical","High","Medium","Low","Backlog"];function Vp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let K of Hp){let L=document.createElement("option");L.value=K,L.textContent=Gp(K),o.appendChild(L)}a.replaceChildren();for(let K=0;K<=4;K+=1){let L=document.createElement("option");L.value=String(K);let I=Kp[K]||"Medium";L.textContent=`${K} \u2013 ${I}`,a.appendChild(L)}}b();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,l.disabled=D,d.disabled=D,g.disabled=D,g.textContent=D?"Creating\u2026":"Create"}function U(){u.textContent=""}function Y(D){u.textContent=D}function ae(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let K=window.localStorage.getItem("beads-ui.new.priority");K&&/^\d$/.test(K)?a.value=K:a.value="2"}catch{o.value="",a.value="2"}}function V(){let D=o.value||"",K=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),K.length>0&&window.localStorage.setItem("beads-ui.new.priority",K)}async function q(){U();let D=String(s.value||"").trim();if(D.length===0){Y("Title is required"),s.focus();return}let K=Number(a.value||"2");if(!(K>=0&&K<=4)){Y("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),I=String(l.value||""),te={title:D};L.length>0&&(te.type=L),String(K).length>0&&(te.priority=K),I.length>0&&(te.description=I),N(!0);try{await t("create-issue",te)}catch{N(!1),Y("Failed to create issue");return}V(),N(!1),v()}return n.addEventListener("cancel",D=>{D.preventDefault(),v()}),h.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),q())}),r.addEventListener("submit",D=>{D.preventDefault(),q()}),{open(){r.reset(),U(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}var gy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function by(e,t){return si(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Yp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=by(r,e);return c`<button
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
  `}function Zp(e,t,n){return c`
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
  `}function Qp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${gy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var hy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Xp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ie=>de(ie,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function g(){if(d)return d;let ie=a.querySelector('[data-pane="execution"]');return ie?(d=ka(ie,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ce=>t.queueStore?.set?.(Ce)}),d):null}function h(){return c`
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
              ${Yp(ie,s(),Y)}
              ${Zp(ie,u,{onDraft:Ce=>{u=Ce},onAdd:ae,onRemove:V})}
              ${Qp(ie,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(ie){let Ce=r.get();if(Ce)try{let De=await n("display-policy-set",{expected_revision:Ce.revision,policy:ie(Ce)});N(De),De&&De.conflict&&De.policy&&(De=await n("display-policy-set",{expected_revision:De.policy.revision,policy:ie(De.policy)}),N(De)),De&&De.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(ie){ie&&ie.policy&&typeof ie.policy=="object"&&r.set(ie.policy)}function U(ie){v(ie)}function Y(ie){let Ce=r.get();if(!Ce)return;let De=!yy(ie,Ce);U($e=>vy(ie,$e,De))}function ae(){let ie=u.trim();ie.length!==0&&(u="",U(Ce=>Ce.hidden_prefixes.includes(ie)?{hidden_prefixes:Ce.hidden_prefixes}:{hidden_prefixes:[...Ce.hidden_prefixes,ie]}),D())}function V(ie){U(Ce=>({hidden_prefixes:Ce.hidden_prefixes.filter(De=>De!==ie)}))}function q(ie){let Ce=r.get();if(!Ce)return;let De=Ce.chips[ie]===!1;U(()=>({chips:{[ie]:De}}))}function D(){st(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${hy.map(ie=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ie.id}
                  aria-selected=${String(i===ie.id)}
                  aria-controls=${`settings-pane-${ie.id}`}
                  @click=${()=>K(ie.id)}
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
      `,a),g()}function K(ie){i=ie,D()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let I=ie=>{ie.target===a&&_e()};a.addEventListener("click",I);let te=null;r.subscribe&&(te=r.subscribe(()=>{l&&D()}));let Ae=null;t.implPresetStore?.subscribe&&(Ae=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function ke(ie="execution"){l||(l=!0,t.onOpenChange?.(!0),i=ie,u="",D(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),g()?.load())}function _e(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ke,close:_e,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",I),te&&(te(),te=null),Ae&&(Ae(),Ae=null),d?.destroy(),d=null,a.remove()}}}function yy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function vy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var wy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Jp="usage-meter-card",ky="usage-meter-layer",bl=600,$y=["token_expired","relogin_required"];function ef(e){return String(e).padStart(2,"0")}function xy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function tf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${ef(r.getHours())}:${ef(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${wy[r.getMonth()]} ${r.getDate()} ${o}`;return`${xy(n,t)} \xB7 ${i}`}function Ay(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function nf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function rf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var sf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function af(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Sy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:af(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Ey(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Sy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?af(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Ty(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Ey(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function lf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Cy(e,t){return!e.held||lf(e,t)<=bl?e:{...e,available:!1,windows:[],accounts:[]}}function of(e,t){return`${e}:${t}`}function cf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){st(c``,e),e.hidden=!0,g()}function d(){if(l===null){let $e=e.ownerDocument;l=$e.createElement("div"),l.id=ky,l.className="usage-meter__layer",$e.body.appendChild(l)}return l}function g(){l!==null&&(st(c``,l),l.remove(),l=null)}function h($e){n!==$e&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",U),window.addEventListener("resize",N)),n=$e)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",U),window.removeEventListener("resize",N))}function v($e){let ee=$e.target;ee&&(e.contains(ee)||l!==null&&l.contains(ee))||(b(),_e())}function N(){_e()}function U($e){$e.key==="Escape"&&(b(),_e())}function Y($e){n===$e?b():h($e),_e()}function ae(){b(),_e()}async function V($e,ee){if(r.has($e.key))return;let Z=of($e.key,ee);r.set($e.key,ee),a.delete(Z),_e();let Re=null;try{Re=await(await fetch($e.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Re=null}if(t)return;if(r.delete($e.key),!Re||Re.ok!==!0){let ne=Re&&typeof Re.error=="string"&&Re.error.length>0?Re.error:"network_error";a.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),_e();return}let z=Array.isArray(Re.warnings)?Re.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];z.length>0&&a.set(Z,{kind:"warn",text:z.join(" \xB7 ")}),_e(),await De()}function q($e,ee,Z,Re){let z=rf($e.pct),be=`resets ${tf($e.resetsAt,Re)}${ee?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${nf(z)}"
      style=${`--progress: ${z}%`}
      title=${be}
    >
      <span class="usage-meter__label">${$e.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${z}%</span>
    </span>`}function D($e,ee,Z){let Re=lf(ee,Z),z=ee.available&&(ee.held||Re>bl),ne=z?`${Math.floor(Re/60)}\uBD84 \uC804 \uCE21\uC815`:"",be=ee.accounts.filter(Ue=>!Ue.active).length,Ee=`usage-meter__group${z?" usage-meter__group--stale":""}`,Ze=c`<span class="usage-meter__provider"
        >${$e.label}</span
      >
      ${ee.available?ee.windows.map(Ue=>q(Ue,z,ne,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${be>0?c`<span class="usage-meter__badge">+${be}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${Ee}
        aria-label=${`${$e.label} usage`}
        >${Ze}</span
      >`;let ce=n===$e.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Ee}`}
      aria-label=${`${$e.label} usage`}
      aria-expanded=${ce?"true":"false"}
      aria-controls=${Jp}
      @click=${()=>Y($e.key)}
    >
      ${Ze}
    </button>`}function K($e,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${$e.map(Z=>D(Z.provider,Z.snapshot,ee))}
    </span>`}function L($e,ee){let Z=rf($e.pct),Re=tf($e.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${nf(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${$e.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${Re.length>0?`\u21BB ${Re}`:""}</span
      >
    </span>`}function I($e,ee){return $y.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${$e.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te($e,ee,Z){let Re=ee.status==="ok",z=typeof ee.ageSeconds=="number"&&ee.ageSeconds>bl,ne=a.get(of($e.key,ee.number)),be=r.get($e.key),Ee=be!==void 0,Ze=be===ee.number,ce=["usage-meter__account"];return ee.active&&ce.push("usage-meter__account--active"),Re||ce.push("usage-meter__account--unavailable"),z&&ce.push("usage-meter__account--stale"),c`<div class=${ce.join(" ")}>
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
              >${Ay(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ee}
              @click=${()=>{V($e,ee.number)}}
            >
              ${Ze?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Re?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Ue=>L(Ue,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${I($e,ee.status)}
          </div>`}
      ${ne===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function Ae($e,ee,Z){let Re=ee.accounts.filter(z=>z.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${$e.label} · 활성 ${Re} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(z=>te($e,z,Z))}
    </section>`}function ke($e,ee){return c`<div
      class="usage-meter__card"
      id=${Jp}
      role="dialog"
      aria-label=${`${$e.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Ae($e.provider,$e.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function _e(){let $e=Date.now(),ee=[];for(let Re of sf){let z=o.get(Re.key);z&&ee.push({provider:Re,snapshot:Cy(z,$e)})}if(ee.length===0){b(),u();return}let Z=ee.find(Re=>Re.provider.key===n&&Re.snapshot.accounts.length>0);Z||b(),st(K(ee,$e),e),e.hidden=!1,Z?ie(Z,$e):g()}function ie($e,ee){let Z=d(),Re=e.getBoundingClientRect(),z=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${Re.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,z-Re.right)}px`),st(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${ke($e,ee)}`,Z)}async function Ce($e){try{let ee=await fetch($e.endpoint);return ee.ok?Ty(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function De(){i+=1;let $e=i,ee=await Promise.all(sf.map(async Z=>({provider:Z,read:await Ce(Z)})));if(!(t||$e!==i)){for(let Z of ee){let Re=Z.provider.key;if(Z.read.kind==="ok"){o.set(Re,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(Re);continue}let z=o.get(Re);z!==void 0&&!z.held&&o.set(Re,{...z,held:!0})}_e()}}return u(),De(),s=setInterval(()=>{De()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function uf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Ry="worker-ineligible";function Qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function df(e){return Qs(e).includes(Ry)}var Oy="session-preferred",Ly=["exclusive_machine"];function pf(e,t){if(!Qs(e).includes(Oy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Ly.includes(n)?n:""}var Iy="worker-serial";function hl(e){return Qs(e).includes(Iy)}function yl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Py=new Set(["done","failed","orphaned","stopped","discarded"]),My={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Dy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Ny={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function vl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Ny[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function ff(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,g=null,h=null,b=null,v=new Set,N=!1,U=0,Y=null,ae=new Set;function V(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function D(){return o&&o()||""}async function K(){if(!s)return;let x=++U;N=!0,b=null,v.clear(),et();try{let S=await s("worker-parallel-analysis-targets",{root_dir:D()});if(x!==U||!qe)return;let X=Array.isArray(S?.qualified)?S.qualified:[],me=Array.isArray(S?.excluded)?S.excluded:[];b={qualified:X,excluded:me};for(let Se of X)Se&&typeof Se.id=="string"&&v.add(Se.id)}catch{x===U&&qe&&(b={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===U&&(N=!1,qe&&et())}}function L(x){return Array.isArray(x.runs)?x.runs:[]}function I(){let x=V(),S=new Set;for(let X of Object.values(x.attempts||{})){let me=X;me&&typeof me.bead_id=="string"&&!Py.has(me.status)&&S.add(me.bead_id)}for(let X of Array.isArray(x.pr_wait)?x.pr_wait:[])X&&typeof X.bead_id=="string"&&S.add(X.bead_id);for(let X of Object.values(x.discard_operations||{})){let me=X;me&&me.phase!=="done"&&typeof me.bead_id=="string"&&S.add(me.bead_id)}return S}function te(x){return x.filter(S=>Ae(S)===null)}function Ae(x){let S=V();for(let X of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(me=>me.bead_id===x))return X.id;return(Array.isArray(S.queue)?S.queue:[]).some(X=>X.bead_id===x)?"parallel":null}function ke(x,S){let X=l.get(x);return X||[...S.order]}function _e(x){if(x.length<2)return!1;let S=Ae(x[0]);if(!S||S==="parallel")return!1;let X=V(),me=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(ge=>ge.id===S)?.entries.map(ge=>ge.bead_id);if(!Array.isArray(me))return!1;let Se=x.map(ge=>me.indexOf(ge));return Se.every(ge=>ge>=0)&&Se.every((ge,A)=>A===0||ge>Se[A-1])}function ie(){let x=V(),S=Array.isArray(x.serial_lanes)?x.serial_lanes:[],X=S.find(me=>Array.isArray(me.entries)&&me.entries.length===0);return X?X.id:S[0]?.id||"s1"}function Ce(x){let S=V().bead_titles||{};return typeof S[x]=="string"?S[x]:x}async function De(x,S){if(!s||d)return null;d=!0,et();try{return await s(x,S)}finally{d=!1,et()}}async function $e(x){r?.setPending?.(!0);try{let S=await De("worker-parallel-analysis-start",{force:x,target_ids:Array.from(v)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ee(){let x=q().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Z(x){if(!(!s||ae.has(x))){ae.add(x),et();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:D(),run_id:x});if(!qe)return;if(S?.ok===!0&&typeof S.prompt=="string"){Y={run_id:x,prompt:S.prompt};return}de(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ae.delete(x),et()}}}function Re(){Y=null,et()}async function z(){if(!Y)return;let x=await Sn(Y.prompt);de(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function ne(x,S){a&&a(x,vl(S))}function be(){return V().runner_catalog}function Ee(x){return Object.keys(be()?.runners?.[x]?.models||{})}function Ze(x){let S=Ee(x),X=be()?.runners?.[x]?.default_model;return typeof X=="string"&&S.includes(X)?X:S[0]||""}function ce(){let x=q().settings,S=g||x.runner||"claude",X=Ee(S),me=g?Ze(S):x.model||X[0]||"",Se=yl(be(),S,me),ge=x.effort||"",A=Se.includes(ge)?ge:Se[0]||"";return{runner:S,model:me,effort:A,models:X,efforts:Se}}async function Ue(x){let S=q().settings,X=await De("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:x.runner,model:x.model,effort:x.effort});(!X||X.applied!==!0)&&(g=null,et(),X&&X.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function gt(x){g=x,et();let S=ce();Ue({runner:x,model:S.model,effort:S.effort})}function At(x){let S=ce(),X=yl(be(),S.runner,x);Ue({runner:S.runner,model:x,effort:X.includes(S.effort)?S.effort:X[0]||""})}function $t(x){let S=ce();Ue({runner:S.runner,model:S.model,effort:x})}async function dt(x,S){if(!s||d)return;let X=ke(x,S),me=q();if(X.length<2||!me.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Se=u.get(x)||ie(),ge=()=>({snapshot_digest:me.last_good.identity_digest,group_index:x,lane:Se,ordered_bead_ids:X,expected_revision:V().revision});d=!0,et();try{let A=await s("worker-parallel-analysis-submit",ge());A&&A.queue&&n&&n.set(A.queue),A&&A.applied!==!0&&A.conflict===!0&&(A=await s("worker-parallel-analysis-submit",ge()),A&&A.queue&&n&&n.set(A.queue)),A&&A.applied===!0?(l.delete(x),de(`\uC9C1\uB82C \uB808\uC778 ${Se}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${A?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,et()}}function R(x,S,X){l.set(x,ke(x,S).filter(me=>me!==X)),et()}function le(x){l.delete(x),et()}function Me(x,S,X,me){let Se=[...ke(x,S)],ge=Se.indexOf(X),A=ge+me;ge<0||A<0||A>=Se.length||(Se.splice(A,0,...Se.splice(ge,1)),l.set(x,Se),et())}function Ne(){let x=q().settings,S=Object.keys(be()?.runners||{}),X=ce();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${me=>gt(me.target.value)}
        >
          ${S.map(me=>c`<option
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
      ${Qe(x)}
    </div>`}function Qe(x){return!bt(x)||rt(x)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function rt(x){return x.is_default===!0&&x.compatible===!1}function bt(x){return!!(x.runner&&x.model&&x.effort)}function ht(x){return bt(x)&&x.compatible!==!1}function re(x){let S=Math.max(0,Math.floor(x/1e3)),X=Math.floor(S/60),me=S%60;return`${X}:${String(me).padStart(2,"0")}`}function Q(x){let S=x.job;if(S){let X=typeof S.started_at=="number"?S.started_at:0,me=`${S.runner||"?"}/${S.model||"?"}`,Se=X?` \xB7 \uACBD\uACFC ${re(Date.now()-X)}`:"",ge=typeof S.session_id=="string"?S.session_id:"",A=L(x).find(B=>B.run_id===S.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${me} · effort ${S.effort||"?"}${Se}</span
        >
        ${ge?c`<code class="pa-session-id" title=${ge}
              >${ge.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ne(S.job_id,A||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${A?.prompt_saved!==!0||ae.has(S.job_id)}
          @click=${()=>{Z(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ot()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function je(x){let S=Q(x);return S===""?"":c`<div class="pa__strip">${S}</div>`}function ot(){return r?.isPending?.()===!0}function ze(x){let S=!!x.job,X=ht(x.settings),me=b!==null&&v.size===0,Se=S||d||ot()||N;return c`<div class="pa-meta">
      ${x.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!X||Se||me}
        @click=${()=>{$e(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!X||Se||me}
        @click=${()=>{$e(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{ee()}}
      >
        취소
      </button>
    </div>`}function we(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function Ke(x,S){S?v.add(x):v.delete(x),et()}function ct(x){let S=Array.isArray(x.scope)?x.scope:[],X=Array.isArray(x.overlaps)?x.overlaps:[];return S.length===0&&X.length===0?c``:c`<span class="pa-target__signals">
      ${S.length>0?c`<details class="pa-target__scope" title=${S.join(`
`)}>
            <summary>scope ${S.length}</summary>
            <ul>
              ${S.map(me=>c`<li><code>${me}</code></li>`)}
            </ul>
          </details>`:""}
      ${X.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${X.join(", ")}`}
            >겹침 ${X.join(", ")}</span
          >`:""}
    </span>`}function _t(){let x=b?.qualified||[],S=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${N?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${b&&x.length>0?c`<ul class="pa-targets__list">
            ${x.map(X=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${X.id}
                      .checked=${v.has(X.id)}
                      @change=${me=>Ke(X.id,me.target.checked)}
                    />
                    <span class="pa-target__title">${X.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ct(X)}
                    <span class="pa-target__route">${X.route}</span>
                    <span class="pa-target__lane"
                      >${we(X.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&x.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&S.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(X=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${X.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${My[X.reason]||X.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${we(X.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function mt(x){let S=typeof x.session_id=="string"&&x.session_id.length>0,X=S?x.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${Dy[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${S?c`<code class="pa-session-id" title=${X}
            >${X.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?c`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ne(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||ae.has(x.run_id)}
          @click=${()=>{Z(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Mt(x){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?c`<ul class="pa-runs__list">
            ${x.map(S=>mt(S))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Yt(){return Y?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Re}></div>
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
              @click=${Re}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function Gt(x,S){let X=ke(x,S),me=I(),Se=X.filter(pe=>me.has(pe)),ge=te(X),A=_e(X),B=Array.isArray(V().serial_lanes)?V().serial_lanes:[],xe=u.get(x)||ie(),Ve=S.eligible!==!0||X.length<2||Se.length>0||ge.length>0||A||d;return c`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(pe=>c`<span class="pa-group__category">${pe}</span>`)}
        ${A?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ge.length>0?c`<span class="pa-group__stale"
              >stale — ${ge.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${X.map((pe,Xe)=>c`<li class="pa-member" data-bead-id=${pe}>
              <span class="pa-member__seq">${Xe+1}</span>
              <span class="pa-member__title">${Ce(pe)}</span>
              ${me.has(pe)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${pe}
                ?disabled=${Xe===0}
                aria-label=${`${pe} \uC704\uB85C`}
                @click=${()=>Me(x,S,pe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${pe}
                ?disabled=${Xe===X.length-1}
                aria-label=${`${pe} \uC544\uB798\uB85C`}
                @click=${()=>Me(x,S,pe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${pe}
                aria-label=${`${pe} \uC81C\uC678`}
                @click=${()=>R(x,S,pe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(pe=>c`<li class="pa-evidence">
              <code>${pe.path}</code>
              <span class="pa-evidence__locator">${pe.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>le(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${pe=>{u.set(x,pe.target.value),et()}}
          >
            ${B.map((pe,Xe)=>c`<option
                  value=${pe.id}
                  ?selected=${xe===pe.id}
                >
                  직렬 ${Xe+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ve}
          @click=${()=>{dt(x,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ot(x){let S=Array.isArray(x.issues)?x.issues:[],X=S.filter(Se=>Se.verdict==="parallel_ok").length,me=S.filter(Se=>Se.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${X}</span>
      <span>uncertain ${me}</span>
    </div>`}function It(){let x=qe&&!!q().job;if(x&&h===null){h=setInterval(()=>et(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function et(){let x=q();g&&x.settings.runner===g&&(g=null);let S=x.last_good?.result;It(),st(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Pe}
            >
              ×
            </button>
          </header>
          ${je(x)}
          <div class="pa__body">
            ${Ne()} ${ze(x)} ${_t()}
            ${S?c`${S.groups.map((X,me)=>Gt(me,X))}
                ${S.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ot(S)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Mt(L(x))}
          </div>
        </div>
        ${Yt()}
      `,i)}let qe=!1,P=()=>{qe=!1,Y=null,U+=1,It()},J=x=>{x.target===x.currentTarget&&Pe()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",J);let ve=null;n&&n.subscribe&&(ve=n.subscribe(()=>{qe&&et()}));let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{qe&&et()}));function H(){qe||(qe=!0,et(),K(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Pe(){qe&&(qe=!1,Y=null,U+=1,It(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Pe,destroy(){qe=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",J),ve&&(ve(),ve=null),E&&(E(),E=null),i.remove()}}}var _f=new Set(["sh","bash","zsh","dash","ksh"]),mf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function gf(e){let t=e.split("/");return t[t.length-1]||""}function qy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=gf(n[0]);if(r!=="env")return _f.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&_f.has(gf(s))}function Fy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function jy(e){let t=[],n=0;mf.lastIndex=0;for(let r of e.matchAll(mf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Fy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function By(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function bf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function g(D,K){return K?jy(D).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):D}function h(){if(!s)return c``;let D=o==="ready"&&qy(a),K=o==="ready"?a.split(`
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
              @click=${()=>{v()}}
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
                          >${g(L,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){st(h(),r)}async function v(){if(o!=="ready")return;let D=await Sn(a);de(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function N(D){D.key==="Escape"&&s&&(D.preventDefault(),V())}function U(){d||(document.addEventListener("keydown",N),d=!0)}function Y(){d&&(document.removeEventListener("keydown",N),d=!1)}async function ae(D,K=null){let L=++l;U(),s={...D},u=K||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let Ae="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let ke=await n(Ae),_e=await ke.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==te){V();return}if(!ke.ok||!_e||_e.ok!==!0){o="error",i=By(_e&&typeof _e.error=="string"?_e.error:""),b();return}s={lane:_e.lane,base_sha:_e.base_sha,path:_e.path,base_ref:_e.base_ref},a=String(_e.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function V(){l+=1,Y(),s=null,a="",b();let D=u;u=null,D?.isConnected&&D.focus()}function q(){V(),r.remove()}return{open:ae,close:V,destroy:q}}function hf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${I}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let I=L/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function g(L){let I=d(L);return I?u("config",I):""}function h(L,I,te){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${te.script}
      @click=${Ae=>{s&&s({lane:L,base_sha:I.base_sha,path:te.script,base_ref:I.base_ref},Ae.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function v(L,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${te=>{ae(L,!te.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function N(L){let I=typeof L.base_sha=="string"?L.base_sha:"",te=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,Ae=b(),ke=!!L.verify&&Ae.verify,_e=!!L.deploy&&Ae.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
        ${L.verify?v("verify",Ae.verify):""}
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
        ${L.deploy?v("deploy",Ae.deploy):""}
      </div>
    </section>`}function U(L){let I=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?N(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Y(L){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(I),I&&I.conflict){let te=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(te)}r()}async function ae(L,I){if(!n)return;let te=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});if(i(te),te&&te.conflict){let Ae=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});i(Ae)}r()}let V={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(L,I,te){return c`<div class="worker-repo-ops__policy-group" data-policy=${te}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(Ae=>c`<li data-token=${Ae}>
              ${V[Ae]||Ae}
            </li>`)}
      </ul>
    </div>`}function D(L){return c`<div
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
    </div>`}function K(){let L=o(),I=L.auto_repair!==!1,te=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,Ae=Array.isArray(L.repo_operations)?L.repo_operations:[],ke=Ae.find(De=>De.state==="repairing"),_e=Ae.filter(De=>De.state==="failed"||De.state==="repairing"),ie=_e.length?Math.min(..._e.map(De=>typeof De.repair?.remaining=="number"?De.repair.remaining:0)):te?.auto_repair?.resolution_ladder?.find(De=>De.id==="auto_repair_session")?.attempts??1,Ce=Array.isArray(te?.auto_repair?.resolution_ladder)?te.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${De=>{Y(De.target.checked)}}
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
                ${Ce.length} · 금지
                ${(te.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",te.worker_automatic||[],"worker-automatic")}
            ${te.supported===!1||te.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${te.schema_version})`}
                </div>`:D(Ce)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",te.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(l())} ${K()}
      </details>`}}}var kf=20,Uy=5,Wy=new Set(["failed","repairing","running","queued","retry_pending"]),yf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},vf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function zy(e,t,n=kf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Hy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Wy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Gy(e,t,n={}){let r=zy(e,t,1/0),s=n.expanded===!0?kf:Uy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Hy(i));return{visible:a,hidden:r.length-a.length}}function wf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Ky(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function $f(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function xf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Vy(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(vf,r)?vf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Yy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${wf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(yf,t.kind)?yf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ca(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ds(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${wf(e)}"
          >${Ky(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?xf(zd(t.failure_kind,r)):""}
      ${Vy(t)}
      ${$f([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ca(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Zy(e){let t=e.cleanup,n=Cr(t.step);return c`<li
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
        ${yp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${xf(va(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${$f([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Qy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Zy(r):Yy(r))}
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
  </section>`}function Af(e,t={}){let n=null;function r(){if(n===null){st(c``,e);return}let a=Gy(n.operations,n.cleanup_failures,{expanded:n.expanded});st(Qy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Xy=Vt("views:worker"),Jy="tab:worker:ready",ev="tab:worker:blocked",tv="tab:worker:in-progress",nv="tab:worker:resolved",rv="tab:worker:closed",Oa=1,Sf=5;function Ef(e){return Ts(e).evidence==="published"}var sv=new Set(["quick_fix","spec_backed","full_plan"]);function Tf(e){return typeof e=="string"&&sv.has(e)}var Lf="beads-ui.worker.candidate-filter",wl={show_blocked:!1,spec:"all"};function ov(){try{let e=window.localStorage.getItem(Lf);if(!e)return{...wl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...wl}}}function av(e){try{window.localStorage.setItem(Lf,JSON.stringify(e))}catch{}}function iv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var lv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],If="bdui.worker.candidate_sort",Pf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],$l="spec";function Mf(e){return Pf.some(t=>t.value===e)?e:$l}function cv(){try{return Mf(window.localStorage.getItem(If))}catch{return $l}}function uv(e){try{window.localStorage.setItem(If,e)}catch{}}var Df="bdui.worker.done-range";function dv(){try{let e=window.localStorage.getItem(Df);return e===null?"today":Wn(e)}catch{return"today"}}function pv(e){try{window.localStorage.setItem(Df,e)}catch{}}var fv="(max-width: 640px)",Nf="beads-ui.worker.lane-collapsed",Xs={queue:!0,done:!0};function _v(){try{let e=window.localStorage.getItem(Nf);if(!e)return{...Xs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Xs}:{queue:typeof t.queue=="boolean"?t.queue:Xs.queue,done:typeof t.done=="boolean"?t.done:Xs.done}}catch{return{...Xs}}}function mv(e){try{window.localStorage.setItem(Nf,JSON.stringify(e))}catch{}}function Cf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function gv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(kr):t==="updated"?r.sort(yo):(r.sort(vo(n)),t==="board"?r:[...r.filter(Ef),...r.filter(s=>!Ef(s))])}function bv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function hv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var yv="\u{1F512} blocked";function Rf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function vv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function wv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function kv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function $v(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function xv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function kl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Av=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Sv=new Set(["waiting_metadata","reviewing","retrying"]);function Ev(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?cn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Tv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Cv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Tv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Av.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Of(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Rv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Of(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Of(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=vv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Rf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Rf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Ov(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,g=null,h=null,b={},v=!1,N=!1,U={},Y=null){let ae=!!l&&l.position>0,V=!!l?.continuation_action&&l.continuation_action.continuation===null,q=!!l&&l.active===!0,D=l&&l.failure||null,K=kv(l?l.waiting:null,h),L=n[e]||null,I=L&&L.gate?L.gate:null,te=L&&L.pr?L.pr:null,Ae=$v(l?l.resolution:null),ke=xv(l?l.head_review:null),_e=l&&l.head_review||null,ie=Ev(h,_e),Ce=Cv(h,ie),De=l&&l.authority||null,$e=!!_e&&["pending","reviewing","revising"].includes(_e.state),ee=!!h&&typeof h=="object"&&Sv.has(h.phase),Z=ae&&!q&&(_e?.state==="failed"||!De||ee||De.source==="automatic"&&!N),Re=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Ae?Ae.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":K,z=!!I&&I.base_badge==="\uCDA9\uB3CC",ne=!!I&&I.enabled===!0,be=Vs({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:U.repo_operations}),Ee=Ca(be),Ze=o&&!be&&(o.queueing??null)?o.queueing:null,ce=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!I&&I.tier==="merged",Ue=i&&!!r&&!!I&&I.tier==="merged",gt=Z&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ce||Ue),At=i&&z&&u===!1,$t=Bn(b,e,{external:i,merge_active:q||be?.step==="merge",merge_queued:ae,conflict_active:!!a,cleanup_active:Ee,merged:!!r||I?.tier==="merged"}),dt=!!$t.operation,R=!ce&&!!r&&r.step==="repo_operations",le=Rv({continuation_required:V,queueing:Ze,merge_step:be,conflict_badge:Re,conflict_live:Ae?.live===!0||a==="running",head_review:_e&&ke?{...ke,state:_e.state,failure_reason:_e.failure_reason}:null,auto_resolution:ie,recovery:Ce,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:g,conflicting:z,gate:I,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:D,auto_skip:d,queued:ae,queue_active:q,queue_position:l?l.position:0,activity:Re?null:o&&o.activity||null}),Me=le?.live===!0&&le.title?c`<span title=${le.title}>${le.label}</span>`:le?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&be?.active!==!0?Ta(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:v,...Y?{dependency_chips:Y}:{},external:i,pr_number:te&&typeof te.number=="number"?te.number:null,pr_url:te&&typeof te.url=="string"?te.url:"",completion_badge:le?.live!==!0&&le?.title?le.label:null,completion_title:le?.title||"",completion_repair_pr_url:Ce?Ce.repair_pr_url:"",completion_repair_pr_number:Ce?Ce.repair_pr_number:null,badges:Me?[Me]:[],live_badge:le?.live===!0?Me:null,usage:s,alert:le?.alert===!0,merge_action:I?.tier==="merged"&&!ce&&!Ue||R?!1:!ae||V||Z,timeline_action:R,cancel_action:ae&&!V,cancel_enabled:(!q||$e)&&!(Ce&&Ce.lock_actions),cancel_title:Ce&&Ce.lock_actions?`${Ce.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$t,discard_action:$t.action,merge_step:be,discard_enabled:$t.enabled,discard_title:$t.title,merge_enabled:!be&&!Ze&&!a&&!dt&&!g&&!(Ce&&Ce.lock_actions)&&!At&&!R&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ce||Ue||gt||ee&&!q),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ce||Ue?"\uC815\uB9AC \uC7AC\uAC1C":z&&!be&&!ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":I?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:dt?$t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ze?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":be?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${be.label}`:Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":At?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":z?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":I?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ne?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function xl(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:g,doneRange:h,onDoneRangeChange:b}=t,v=r?ko(r,i):null,N=So({transport:n,uiOrderStore:i}),U=null,Y=[],ae=ov(),V=null,q=null,D={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},K=cv(),L=h?Wn(h):dv(),I=new Map;function te(){let f=Dr.find(w=>w.value===L);return f?f.label:"\uC624\uB298"}let Ae=_v(),ke=!1,_e=new Set,ie=new Set,Ce=new Set,De=new Set,$e=new Set,ee={},Z=null,Re=0,z=null,ne=[];function be(f){return Z===f?ee:{}}async function Ee(){if(!n)return;let f=u?.()||"";if(Z===f||z&&z.key===f&&z.generation===Re)return;let w=++Re;z={key:f,generation:w};let j=null;try{j=await Promise.resolve(n("get-session-defaults",{}))}catch(fe){if(w!==Re)return;z=null,Xy("get-session-defaults failed: %o",fe),Ye();return}w===Re&&(ee=j&&typeof j.values=="object"&&j.values!==null?{...j.values}:{},Z=f,z=null,Ye())}function Ze(){Z=null,Re+=1,Ee()}let ce=document.createElement("div");ce.className="worker-console";let Ue=document.createElement("div");Ue.className="worker-top";let gt=document.createElement("div");gt.className="worker-drawer-overlay",gt.hidden=!0;let At=document.createElement("div");At.className="worker-drawer-overlay__backdrop";let $t=document.createElement("div");$t.className="worker-drawer-host";let dt=document.createElement("div");dt.className="worker-drawer-host",dt.hidden=!0,gt.append(At,$t,dt);let R=document.createElement("div");R.className="worker-lanes-host",ce.append(Ue,gt,R),e.appendChild(ce);let le=null,Me=null,Ne=Zr($t,{transport:n,sessionLogStore:a,onClose:()=>{le=null,Me=null,gt.hidden=!0,Ye()}}),Qe=Af(dt,{onClose:()=>{dt.hidden=!0,gt.hidden=!0,Ye()}}),rt=bf({getWorkspacePath:u||(()=>"")}),bt=u&&u()||"",ht=hf({queueStore:s,transport:n,onChanged:()=>Ye(),onOpenScript:(f,w)=>{rt.open(f,w)}}),re=o?ff(ce,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,w)=>T(f,w)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function je(){let f=Q(),w=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,j=Array.isArray(f.serial_lanes)?f.serial_lanes:[],fe=[];for(let pt of j){if(fe.length>=w)break;!pt||typeof pt.id!="string"||!/^s[1-5]$/.test(pt.id)||!Array.isArray(pt.entries)||fe.push({id:pt.id,label:`\uC9C1\uB82C ${pt.id.slice(1)}`,count:pt.entries.length})}return fe.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...fe]}function ot(f){if(!V||!f.some(j=>j.id===V))return null;let w=je();return w?{bead_id:V,lanes:w}:null}function ze(){let f=Q();return typeof f.revision=="number"?f.revision:0}function we(f){f&&f.queue&&s&&s.set(f.queue)}function Ke(){let f=Q().queue;return Array.isArray(f)?f.length:0}async function ct(f,w,j){if(!n)return;let fe=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},...j===void 0?{}:{index:j},expected_revision:ze()}),Oe=await n("worker-queue-place",fe());we(Oe),Oe&&Oe.conflict&&await n("worker-queue-place",fe()).then(we)}async function _t(f,w,j){if(!n)return;let fe=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:j,expected_revision:ze()}),Oe=await n("worker-queue-reorder",fe());we(Oe),Oe&&Oe.conflict&&await n("worker-queue-reorder",fe()).then(we)}async function mt(f){if(!n)return;let w=await n("worker-queue-remove",{bead_id:f,expected_revision:ze()});we(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:ze()}).then(we)}async function Mt(f){if(!n||!f)return;let w=await n("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Yt(f){if(!n||!f)return;let w=await zr();if(w===null)return;let j=async(Oe={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:ze(),...w!==""?{instructions:w}:{},...Oe}),fe=await j();we(fe),fe&&fe.conflict&&(fe=await j(),we(fe)),fe=await Zn(fe,(Oe,pt)=>j({continuation:Oe,decision_token:pt}),{onResult:we,refresh:()=>j()}),fe&&fe.resumed===!1&&!fe.conflict&&fe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${fe.reason}`,"error",2400)}async function Gt(f){if(!n||!f)return;let w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:ze()});we(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:ze()}),we(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ot(f,w,j=!0){if(!n)return null;let fe=n,Oe=await fe(f,{...w,expected_revision:ze()});return we(Oe),Oe&&Oe.conflict&&j&&(Oe=await fe(f,{...w,expected_revision:ze()}),we(Oe)),Oe}async function It(f){if(!n||!f)return;let w=Q().merge_queue?.find(fe=>fe.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await qe(f,w.mismatch);return}_e.add(f),Ye();let j;try{j=await Ot("worker-merge-queue-add",{bead_id:f})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{_e.delete(f),Ye()}if(!(!j||j.applied)){if(j.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(wv(j.reason),"error",2400)}}async function et(f){if(!(!n||!f||ie.has(f))){ie.add(f),Ye();try{let w=await n("worker-cleanup-retry",{bead_id:f,expected_revision:ze()});we(w),w&&!w.retried&&!w.conflict&&w.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{ie.delete(f),Ye()}}}async function qe(f,w){let j=await Zn({continuation_mismatch:w},(Oe,pt)=>Ot("worker-merge-queue-add",{bead_id:f,continuation:Oe,decision_token:pt},!1)),fe=j?.queue?.merge_queue?.find(Oe=>Oe.bead_id===f)?.continuation_action;if(j?.applied!==!0&&fe?.continuation===null&&fe.mismatch){await qe(f,fe.mismatch);return}j&&j.applied===!1&&!j.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(f){if(!n)return;let w=await Ot("worker-merge-auto-toggle",{on:f});!w||w.conflict||de(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function J(f){if(!n||!f)return;let w=await Ot("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ve(){await Ot("worker-merge-queue-remove",{all:!0})}async function E(f,w=null,j="unmerged",fe=null){if(!n||!f)return;let Oe=Ns(f,j);if(!(!!fe||typeof globalThis.confirm!="function"||globalThis.confirm(Oe)))return;let Le=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...fe?{operation_id:fe}:{},expected_revision:ze()});if(we(Le),Le&&Le.conflict&&(Le=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...fe?{operation_id:fe}:{},expected_revision:ze()}),we(Le)),Le&&Le.discarded===!0){de(fa(Le),"success",5e3);return}if(Le&&Le.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Le.reason}`,"error",2800);return}if(Le&&Le.accepted&&Le.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Le&&Le.accepted&&!Le.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Le.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Le&&!Le.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(f,w,j){if(!(!n||!w||!j||De.has(w))){De.add(w),Ye();try{let fe=await n(f,{bead_id:w,action_id:j,expected_revision:ze()});we(fe),fe?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!fe?.ok&&fe?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(fe.reason)}`,"error",2800)}finally{De.delete(w),Ye()}}}async function Pe(f,w){if(!n||!w||Ce.has(w))return;Ce.add(w),Ye();let j;try{let fe=async(Oe={})=>await n(f,{bead_id:w,expected_revision:ze(),...Oe});j=await fe(),we(j),j&&j.conflict&&(j=await n(f,{bead_id:w,expected_revision:ze()}),we(j)),f==="worker-revise-fix"&&(j=await Zn(j,(Oe,pt)=>fe({continuation:Oe,decision_token:pt}),{onResult:we,refresh:()=>fe()}))}finally{Ce.delete(w),Ye()}if(!(!j||j.conflict)){if(j.ok){de(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${j.reason||""}`,"error",3e3)}}async function x(f){if(!n)return;let w=await n("worker-automation-toggle",{on:f,expected_revision:ze()});we(w),w&&w.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:ze()}).then(we)}async function S(f){if(!n||!f)return;let w=await n("worker-repo-operation-repair",{operation_id:f});if(we(w),w&&w.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function X(f){if(!n||!f)return;let w=await n("worker-repo-operation-dismiss",{operation_id:f});we(w),w&&w.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function me(f){if(!n||!Number.isFinite(f))return;let w=Math.max(Oa,Math.floor(f)),j=await n("worker-queue-set-slots",{slots:w,expected_revision:ze()});we(j),j&&j.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:ze()}).then(we)}async function Se(f){if(!n||!Number.isInteger(f)||f<1||f>Sf)return;let w=Q(),j=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((pt,Le)=>pt+(Array.isArray(Le?.entries)?Le.entries.length:0),0),fe=()=>({count:f,expected_revision:ze()}),Oe=await n("worker-queue-set-serial-lane-count",fe());we(Oe),Oe&&Oe.conflict&&(Oe=await n("worker-queue-set-serial-lane-count",fe()),we(Oe)),Oe&&Oe.applied&&j>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${j}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let ge="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function A(f,w){let j=Qi(f,w.id,D);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:j.kind==="note"?{kind:"note",text:j.text}:j.kind==="disabled"?{kind:"disabled",label:ge,title:j.title}:{kind:"place",label:ge,title:j.title}}}function B(f,w){if(!q||q.bead_id!==f)return null;let j=q.counterpart_id,fe=w.filter(Oe=>Oe.id===j);return fe.length===0?null:{rows:fe.map(Oe=>A(f,Oe))}}async function xe(f,w){let j=Qi(f,w,D);if(q=null,j.kind!=="ops"){Ye();return}let fe=ze();for(let Oe of j.ops){let pt=await Ve(Oe,fe);if(pt===null)break;fe=pt}Ye()}async function Ve(f,w){if(!n)return null;try{let j=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:w});if(we(j),j&&j.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!j||j.applied!==!0)return de(j&&typeof j.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${j.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let fe=j.queue?j.queue.revision:void 0;return typeof fe!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):fe}catch(j){return de(j instanceof Error&&j.message?j.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function pe(){let f=Q(),w=v?v.selectBoardColumn(Jy,"ready"):[],j=v?v.selectBoardColumn(ev,"blocked"):[],fe=v?v.selectBoardColumn(rv,"closed"):[],Oe=v?v.selectBoardColumn(tv,"in_progress"):[],pt=v?v.selectBoardColumn(nv,"resolved"):[],Le=xo([...w,...j,...Oe,...pt,...fe]),k=new Map;for(let _ of[...w,...j,...Oe])_&&_.id&&!k.has(_.id)&&k.set(_.id,_);let se={...be(u?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let M=f[_];typeof M=="string"&&(se[_]=M)}function F(_,M){let ue=k.get(_);if(!ue)return null;let Ge=ue.metadata&&typeof ue.metadata=="object"?ue.metadata:{},nt=ue.workflow?.route,Qt=Ge.route,Nt=Tf(nt)?nt:Tf(Qt)?Qt:null;return wn({pin:Ge,global:se,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Nt,controller_runtime:M})}function Te(_){let M=_.runner||null,ue=F(_.bead_id,M),Ge=Fs(_),nt=ue?pr(ue,M):null;return Ge||nt?{orchestration:Ge,worker:nt}:null}let ft=new Map;function Je(_){if(ft.has(_))return ft.get(_)??null;let M=F(_,null),ue=null;if(M){let Ge=jn(f.runner_catalog??null,M.orchestration_model.value??""),nt=Ge===null?M:F(_,Ge),Qt=Er(nt,f.runner_catalog??null),Nt=pr(nt,Ge);ue=Qt||Nt?{orchestration:Qt,worker:Nt}:null}return ft.set(_,ue),ue}function vt(_){let M=Ao(Le,_);return M.total===0?null:M}let it=f.bead_titles||{},Ct=new Map;for(let[_,M]of Object.entries(it))typeof M=="string"&&M.length>0&&Ct.set(_,M);for(let _ of[...w,...j])Ct.set(_.id,_.title||_.id);let p=new Map;for(let _ of[...w,...j,...Oe,...pt,...fe])_&&_.id&&typeof _.from_id=="string"&&p.set(_.id,_.from_id);let m=new Map;for(let _ of[...w,...j,...Oe,...pt,...fe])_&&_.id&&typeof _.priority=="number"&&m.set(_.id,_.priority);let y=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},$=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},W=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},G=new Map;for(let[_,M]of Object.entries($))Array.isArray(M)&&G.set(_,hl(M));for(let _ of[...w,...j]){let M=_.labels;Array.isArray(M)&&!G.has(_.id)&&G.set(_.id,hl(M))}let oe=new Map,he=o?.get()?.last_good?.result?.groups;for(let _ of Array.isArray(he)?he:[]){if(_?.eligible!==!0||!Array.isArray(_.members))continue;let M=_.members.map(Ge=>{let nt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Qt=>Qt.entries.some(Nt=>Nt.bead_id===Ge));return nt?nt.id:null});if(!(M.every(Ge=>Ge!==null)&&new Set(M).size===1))for(let Ge of _.members)oe.set(Ge,_.members.filter(nt=>nt!==Ge))}let tt=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},ut=f.blocker_workspaces&&typeof f.blocker_workspaces=="object"&&!Array.isArray(f.blocker_workspaces)?f.blocker_workspaces:{},rn=new Map;for(let[_,M]of Object.entries(y))M&&typeof M=="object"&&rn.set(_,M);for(let _ of[...w,...j])rn.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Dt=_=>rn.get(_)||{},pn=f.pr_wait||[],An=f.pr_observations||{},We=f.pr_activity||{},Et=f.cleanup_failed||{},fn=Object.entries(Et).map(([_,M])=>({bead_id:_,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),La=f.queue||[],Zf=new Set([...La.map(_=>_.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(M=>M.bead_id)),...pn.map(_=>_.bead_id),...f.done.map(_=>_.bead_id)]),Qf=new Set(j.map(_=>_.id)),Xf=i?i.get()?.order||{}:{},Tl=new Set,Cl=[];for(let _ of[...w,...j])Zf.has(_.id)||Tl.has(_.id)||bv(_)||(Tl.add(_.id),Cl.push(_));Y=gv(Cl,K,Xf);let Jf=f.admission||{},Rl=_=>{let M=Jf[_];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof M.reason=="string"?M.reason:"",Ge=ue.indexOf(":");return Ge>0&&Ge<ue.length-1?`\u26D4 ${ue.slice(0,Ge)} (${ue.slice(Ge+1)})`:`\u26D4 ${ue}`},Ol=new Map,e_=Y.map(_=>{let M=Ts(_),ue=M.evidence==="published",Ge=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",nt=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Qt=Object.hasOwn(_,"labels")&&df(_.labels),Nt=Qt||!Object.hasOwn(_,"labels")?"":pf(_.labels,_.metadata),Ir=Nt.length>0,qt=!Qt&&(Ge?nt:ue&&!M.conflict),io=Qf.has(_.id),Kn=[];if(io){let lo=hv(_);lo.length>0?Ol.set(_.id,lo):Kn.push(yv)}Ge&&!nt?Kn.push("missing_description"):!Ge&&M.conflict?Kn.push("spec_id_conflict"):!Ge&&M.evidence==="none"?Kn.push("spec \uC5C6\uC74C"):!Ge&&M.evidence==="draft"&&Kn.push("spec \uBBF8\uBC1C\uD589(draft)");let Pr=Rl(_.id);return Pr&&Kn.push(Pr),{id:_.id,title:_.title||_.id,reason:Kn.join(" \xB7 "),draggable:qt,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ge,status:_.status,worker_ineligible:Qt,session_preferred:Ir,session_preferred_reason:Nt,blocked:io,has_spec:ue,exec_chips:Je(_.id),from_id:_.from_id||void 0,priority:m.get(_.id)}}),Ia=iv(e_,ae),Pa=Ia.visible,t_=f.revise_parked||{},Js=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},n_=_=>{let M=W[_]?.chips?.pr;return M&&typeof M.number=="number"&&typeof M.url=="string"?{pr_number:M.number,pr_url:M.url}:{}},Ma=(_,M)=>_.map((ue,Ge)=>{let nt=M!=="done",Qt=M!=="done"&&M!=="queue",Nt=nt?t_[ue.bead_id]:null,Ir=nt?Bn(Js,ue.bead_id):null,qt=Ir?.operation?Ir:null,io=nt&&G.get(ue.bead_id)===!0,Kn=f.admission&&typeof f.admission=="object"?f.admission[ue.bead_id]:null,Pr=nt?Dd(Kn,!!qt||De.has(ue.bead_id)):null,lo=nt&&!Pr?Rl(ue.bead_id):null,m_=nt?[lo]:[],ic=[],Ha=nt?oe.get(ue.bead_id):void 0;return Ha&&Ha.length>0&&ic.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ha.join(", ")}\uC640`),{id:ue.bead_id,title:Ct.get(ue.bead_id)||ue.bead_id,reason:m_.filter(Boolean).join(" \xB7 "),draggable:nt&&!qt&&!Pr,done:M==="done",lane:M,seq:Qt?Ge+1:void 0,worker_serial:io,discard:qt,stale_work:Pr,badges:[...ic,...Nt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...M==="done"?ua(f.attempts||{},ue.bead_id):[]],alert:!!Nt,revise_action:!!Nt,revise_enabled:!!Nt&&!qt&&!Ce.has(ue.bead_id),revise_title:Nt?Nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?On(f.attempts||{},ue.bead_id):null,work_ms:M==="done"?da(f.attempts||{},ue.bead_id):null,done_at:M==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,exec_chips:nt?Je(ue.bead_id):null,workflow:nt&&W[ue.bead_id]||null,...M==="done"?n_(ue.bead_id):{},from_id:p.get(ue.bead_id)||void 0,priority:m.get(ue.bead_id),...Dt(ue.bead_id)}}),Rr=f.attempts?Object.values(f.attempts).filter(Tr):[],Da=new Set;for(let _ of Rr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Da.add(_.resumed_from);let Ll=new Map;for(let _ of Rr)Ll.set(_.bead_id,_.attempt_id);let rs=new Map;for(let _ of Rr)rs.set(_.attempt_id,_);function Na(_){let M=new Set,ue=_;for(;ue&&!M.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;M.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&rs.get(ue.resumed_from)||null}return!1}let eo=typeof f.declared_base=="string"?f.declared_base:null;function r_(_){let M=null;for(let ue of Rr)!ue||ue.bead_id!==_||Na(ue)||(M===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=ue);return M&&typeof M.target_base=="string"?M.target_base:null}let qa=[],to=[],s_=uf(f),Il=_=>{let M=typeof _.session_id=="string"&&_.session_id.length>0,ue=Da.has(_.attempt_id);return{eligible:M&&!ue,reason:M?ue?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pn=null;for(let _ of Rr){let M=_.status==="paused"&&!Da.has(_.attempt_id);if(_.status==="running"||M)to.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ct.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:M,conflict_resolution:Na(_),base_exception:kl(eo,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Bn(Js,_.bead_id,{attempt_id:_.attempt_id}),workflow:W[_.bead_id]||null,priority:m.get(_.bead_id),usage:On(f.attempts||{},_.bead_id),rollup:vt(_.bead_id),rollup_expanded:$e.has(_.bead_id),exec_chips:Te(_),...Dt(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&s_(_)){let ue=Il(_);qa.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ct.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Bn(Js,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ue.eligible,resume_reason:ue.reason,conflict_resolution:Na(_),base_exception:kl(eo,_.target_base),workflow:W[_.bead_id]||null,priority:m.get(_.bead_id),usage:On(f.attempts||{},_.bead_id),rollup:vt(_.bead_id),rollup_expanded:$e.has(_.bead_id),exec_chips:Te(_),...Dt(_.bead_id)}),Pn=_}}let Pl=new Set([...qa,...to].map(_=>_.bead_id)),Ml=new Map;for(let _ of Array.isArray(f.session_active)?f.session_active:[]){let M=_&&_.bead_id;if(!(typeof M!="string"||M.length===0||Pl.has(M))){if(Pl.add(M),Array.isArray(_.blocked_by)){let ue=_.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0);ue.length>0&&Ml.set(M,ue)}to.push({bead_id:M,attempt_id:null,kind:"session",title:_.title||Ct.get(M)||M,status:"in_progress",started_at:zn(_.started_at)??zn(_.updated_at),updated_at:zn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:m.get(M),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Or=[...qa,...to].map(_=>{let M=rs.get(_.attempt_id),ue=M?.quickfix_landing;if(M?.quickfix_lane!==!0||!ue||typeof ue!="object")return _;let Ge=typeof ue.reason=="string"&&ue.reason.length>0?ue.reason:null,nt=Vs({bead_id:M.bead_id,merge_sha:ue.head_sha,cleanup_cursor:ue.cursor,cleanup_failed:Ge?{step:ue.cursor,reason:Ge}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return nt?{..._,landing:nt}:_}),Dl=null;if(Pn){let _=Il(Pn),M=Pn.cause_detail;Dl={bead_id:Pn.bead_id,repo:Pn.repo||"",reason:Pn.cause||Pn.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:Pn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Bn(Js,Pn.bead_id,{attempt_id:Pn.attempt_id})}}let Nl=new Set(Or.map(_=>_.bead_id)),Fa=Array.isArray(f.merge_queue)?f.merge_queue:[],ql=new Map,Fl=new Map,jl=new Map,Bl=new Map,Ul=new Map;Fa.forEach((_,M)=>{_&&typeof _.bead_id=="string"&&(ql.set(_.bead_id,M+1),Fl.set(_.bead_id,_.resolution),jl.set(_.bead_id,_.continuation_action||null),Bl.set(_.bead_id,_.head_review||null),Ul.set(_.bead_id,_.authority||null))});let Lr=f.merge_queue_state||{active:null,failures:{}},o_=Lr.failures||{},Wl=Lr.waiting&&typeof Lr.waiting.bead_id=="string"&&typeof Lr.waiting.reason=="string"?Lr.waiting:null,a_=f.auto_merge_skips||{},zl=_=>{let M=a_[_];if(!M)return null;let ue=An[_],Ge=ue&&ue.pr?ue.pr.head_sha:null;return Ge&&Ge===M.head_sha?M.reason||"":null},no=new Map;for(let _ of Or)_.failed!==!0&&_.conflict_resolution&&(_.paused?no.has(_.bead_id)||no.set(_.bead_id,"paused"):no.set(_.bead_id,"running"));let Hl=Or.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Gl=(f.workspace_info||{}).slots,Kl=typeof Gl=="number"?Gl:typeof f.slots=="number"?f.slots:Oa,i_=Hl>Kl,ro=vr(L),l_=(Array.isArray(f.done)?f.done.slice():[]).filter(_=>ro===void 0||typeof _.added_at!="number"||_.added_at>=ro).sort((_,M)=>(M.added_at||0)-(_.added_at||0)),ss=Ma(l_,"done"),c_=new Set((Array.isArray(f.done)?f.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),Vl=[],u_=u?.()||"";for(let _ of fe){let M=zn(_.closed_at);if(typeof _.id!="string"||c_.has(_.id)||M===null||ro!==void 0&&M<ro||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ue=`${u_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ge=I.get(ue);Ge===void 0&&n&&(I.set(ue,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(nt=>{let Qt=Array.isArray(nt)&&nt.some(Nt=>Zo(typeof Nt?.text=="string"?Nt.text:"")?.lane==="session");I.set(ue,Qt?"session":"not-session"),Ye()}).catch(()=>{I.set(ue,"failed"),Ye()})),Ge==="session"&&Vl.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:M,created_at:_.created_at,updated_at:_.updated_at})}ss.push(...Vl),ss.sort((_,M)=>(M.done_at||0)-(_.done_at||0));let so={};for(let _ of Gn)so[_]=0;let Yl=!1,Zl=0,ja=0,Ql=0;for(let _ of ss){let M=_.usage;if(M&&typeof M=="object"){let ue=!1;for(let Ge of Gn)Number.isFinite(M[Ge])&&(so[Ge]+=M[Ge],Yl=!0,ue=!0);ue&&(ja+=1,Number.isFinite(M.total_cost_usd)&&(Zl+=M.total_cost_usd,Ql+=1))}}ja>0&&Ql===ja&&(so.total_cost_usd=Zl);let Xl=ss.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),d_=Xl.length>0?un(Do(Xl)):Yl?Qn(so):null,Jl=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},ec=Array.isArray(f.serial_lanes)?f.serial_lanes:[],tc=_=>{if(pn.some(Ge=>Ge.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let M=Rr.filter(Ge=>Ge&&Ge.bead_id===_),ue=M.length>0?M[M.length-1].status:null;return ue==="failed"||ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},oo=ec.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,M)=>{let ue=Jl[_.id]||{},Ge=new Map((Array.isArray(ue.corrections)?ue.corrections:[]).filter(qt=>qt&&typeof qt.bead_id=="string"&&typeof qt.after=="string").map(qt=>[qt.bead_id,qt.after])),nt=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(qt=>typeof qt=="string"):[],Qt=new Set(nt),Nt=Ma(_.entries.filter(qt=>!Nl.has(qt.bead_id)&&!Qt.has(qt.bead_id)),_.id).map(qt=>Ge.has(qt.id)?{...qt,badges:[`\u{1F517} ${Ge.get(qt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...qt.badges]}:qt),Ir=nt.map(qt=>({id:qt,title:Ct.get(qt)||qt,draggable:!1,lane:_.id,ghost:!0,badges:[tc(qt)]}));return{id:_.id,index:M+1,rows:[...Ir,...Nt],occupied:nt.length>0,badge:nt.length>0?tc(nt[0]):"\uB300\uAE30",cycle:ue.cycle===!0}}),nc=typeof f.serial_lane_count=="number"?f.serial_lane_count:oo.length,Ba=Ma(La.filter(_=>!Nl.has(_.bead_id)),"queue"),rc=new Map,sc=new Set;for(let[_,M]of Object.entries(Jl)){if(!/^s[1-5]$/.test(_))continue;let ue=M&&Array.isArray(M.occupied_by)?M.occupied_by:[];for(let Ge of ue)typeof Ge=="string"&&rc.set(Ge,_);ue.length>0&&sc.add(_)}let sr=[];for(let _ of Or)typeof _.bead_id=="string"&&sr.push({id:_.bead_id,title:Ct.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:rc.get(_.bead_id)??null});for(let _ of pn){let M=_&&_.bead_id;typeof M!="string"||M.length===0||sr.push({id:M,title:Ct.get(M)||M,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of oo)for(let M of _.rows)M.ghost!==!0&&sr.push({id:M.id,title:M.title,location_label:`${_.id} #${M.seq??""}`.trim(),kind:"serial",lane_id:_.id});Ba.forEach((_,M)=>{sr.push({id:_.id,title:_.title,location_label:`#${M+1}`,kind:"parallel",lane_id:null})});for(let _ of Pa)sr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let oc={};for(let _ of ec)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(oc[_.id]=_.entries.length);let Ua=new Map;for(let _ of sr)Ua.has(_.id)||Ua.set(_.id,_);D={members_by_id:Ua,serial_raw_lengths:oc,serial_lane_count:nc,occupied_lanes:sc};let p_=jd(f.bead_scope,sr),ao=new Map;for(let[_,M]of Ml)ao.set(_,M);for(let[_,M]of Ol)ao.set(_,M);for(let[_,M]of Object.entries(tt))Array.isArray(M)&&ao.set(_,M.filter(ue=>typeof ue=="string"&&ue.length>0));let f_=wp(ao,sr,ut),Wa=(_,M=null)=>{let ue=p_.get(_),Ge=f_.get(_)||null,nt=ue&&ue.overlaps.length>0?ue.overlaps:null,Qt=!!ue&&ue.scope_missing;if(!Ge&&!nt&&!Qt)return M;let Nt=nt?B(_,nt):null;return{...M||{},...Ge?{predecessors:Ge}:{},...nt?{overlaps:nt}:{},...Qt?{scope_missing:!0}:{},...Nt?{popover:Nt}:{}}},za=_=>{let M=Wa(_.id,_.dependency_chips||null);return M&&(_.dependency_chips=M),_};for(let _ of Ba)za(_);for(let _ of oo)for(let M of _.rows)M.ghost!==!0&&za(M);for(let _ of Pa)za(_);let ac=new Map;for(let _ of Or){let M=typeof _.bead_id=="string"?_.bead_id:"";if(M.length===0)continue;let ue=_.kind==="session",Ge=Wa(M),nt=typeof _.attempt_id=="string"&&_.attempt_id.length>0?rs.get(_.attempt_id):void 0,Qt=nt&&nt.last_activity&&typeof nt.last_activity=="object"?nt.last_activity:null,Nt=nt&&Array.isArray(nt.legs)?nt.legs:[];!Ge&&!Qt&&Nt.length===0&&!ue||ac.set(M,{...Qt?{last_activity:Qt}:{},...Nt.length>0?{legs:Nt}:{},...Ge?{dependency_chips:Ge}:{}})}let __=pn.map(_=>Ov(_.bead_id,Ct.get(_.bead_id)||_.bead_id,An,Et[_.bead_id]||null,On(f.attempts||{},_.bead_id),We[_.bead_id]||(_e.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ie.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),no.get(_.bead_id)||null,_.external===!0,{position:ql.get(_.bead_id)||0,active:Lr.active===_.bead_id,failure:o_[_.bead_id]||null,waiting:Wl?.bead_id===_.bead_id?Wl.reason:null,resolution:Fl.get(_.bead_id),continuation_action:jl.get(_.bead_id),head_review:Bl.get(_.bead_id)||null,authority:Ul.get(_.bead_id)||null},_.wt_present!==!1,f.auto_merge===!0?zl(_.bead_id):null,kl(eo,r_(_.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[_.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},rs.get(Ll.get(_.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Wa(_.bead_id))).map(_=>({..._,workflow:W[_.id]||null,priority:m.get(_.id),...Dt(_.id)}));return{queue:f,idToTitle:Ct,candidates:Pa,candidate_hidden:{blocked:Ia.hidden_blocked,spec:Ia.hidden_spec},running:Or,live_count:Hl,slots:Kl,over_cap:i_,failure:Dl,waiting:Ba,serial_lanes:oo,serial_lane_count:nc,running_overlays:ac,pr_wait:__,merge_queue_length:Fa.length,merge_queue_running:Fa.length>0,auto_excluded:pn.map(_=>_.bead_id).filter(_=>zl(_)!==null),declared_base:eo,done:ss,token_total:d_,cleanup_failures:fn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Xe(){let w=!!o?.get()?.job,j=!w&&o?.isPending?.()===!0,fe=w?"\uBD84\uC11D \uC911":j?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${fe?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${fe?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${fe?c`<span class="worker-analysis-btn__badge">${fe}</span>`:""}
    </button>`}function St(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",j=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,fe=Kt(f),Oe=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",pt=f.queue.auto_advance?0:(Array.isArray(f.queue.queue)?f.queue.queue:[]).filter(Je=>Je&&typeof Je.armed_by_lane=="string"&&Je.armed_by_lane.length>0).length,Le=pt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${pt}건 진행 중</span
          >`:"",k=c`<span class="worker-kpi__chip worker-kpi__chip--running"
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
          ${Array.from({length:Sf},(Je,vt)=>vt+1).map(Je=>c`<option
                value=${String(Je)}
                ?selected=${f.serial_lane_count===Je}
              >
                ${Je}
              </option>`)}
        </select>
      </label>
      ${o?Xe():""} `,Te=Gd({failure:f.failure}),ft=Md(f.repo_operations,f.cleanup_failures);return ke?c`<div class="worker-ribbon">
          ${j} ${fe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Oe}${Le}${k}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${F}</div>
          <div class="worker-kpi">${se}</div>
        </div>
        ${ft}${ht.template()}${Te}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${j}${fe}${F}</div>
        <div class="worker-kpi">
          ${Oe}${Le}${k}${se}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${te()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Je=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Je.tooltip}
                >${te()} 완료 · 누적 ${Je.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${ft}${ht.template()}${Te}`}function yt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0);return c`<section
      class="worker-now${w?" worker-pane--live":""}"
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
      ${f.running.length>0?tl(f.running,Date.now(),le,f.running_overlays):""}
      ${f.pr_wait.map(j=>cr(j))}
    </section>`}function Ft(f){let w=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${ae.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${lv.map(j=>c`<button
              type="button"
              class="worker-filter__chip${ae.spec===j.value?" is-active":""}"
              data-spec=${j.value}
              aria-pressed=${ae.spec===j.value?"true":"false"}
            >
              ${j.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Jt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${K}
    >
      ${Pf.map(f=>c`<option value=${f.value} ?selected=${K===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Lt(){return c`<div class="worker-done-controls">
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
    </div>`}function _n(f){let w=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,j=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return In({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:j})}function Kt(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let j=new Set(f.auto_excluded),fe=f.pr_wait.filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!j.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${fe>0?` ${fe}`:""}
    </button>`}function nn(f){let w=In({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Jt(),controls:Ft(f),place_menu:ot(f.candidates),onOpenDoc:g?(j,fe)=>g(fe):void 0});return ke?c`<div class="worker-lanes worker-lanes--mobile">
        ${yt(f)}
        ${In({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:Ae.queue,preview:Cf(f.waiting)})}
        ${f.serial_lanes.map(j=>_n(j))}
        ${w}
        ${In({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:Lt(),collapsible:!0,collapsed:Ae.done,preview:Array.isArray(f.token_total)?f.token_total.map(j=>j.label).join(" \xB7 "):f.token_total||Cf(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${In({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(j=>_n(j))}
      </div>
      ${In({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0),body:tl(f.running,Date.now(),le,f.running_overlays)})}
      ${In({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${In({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${te()} ${f.done.length}`,items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:Lt()})}
    </div>`}function on(f){Ae={...Ae,[f]:!Ae[f]},mv(Ae),Ye()}function Ye(){let f=pe();st(St(f),Ue),st(nn(f),R)}function an(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(fv);ke=!!f.matches;let w=j=>{let fe=!!(j&&typeof j.matches=="boolean"?j.matches:f.matches);fe!==ke&&(ke=fe,Ye())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),ne.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),ne.push(()=>f.removeListener(w)))}let lt=null;function Ie(f){lt=f.target instanceof Element?f.target:null}function C(f){let j=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!j)return;if(lt&&j.contains(lt)&&lt.closest("input, button, a")){f.preventDefault();return}let fe=j.dataset.beadId||"",Oe=j.dataset.lane||"";U={bead_id:fe,from_lane:Oe};try{f.dataTransfer?.setData("text/plain",fe),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function ye(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let j=w.dataset.lane||"";j!=="candidate"&&j!=="queue"&&!/^s[1-5]$/.test(j)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Fe(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function xt(f,w){let j=Y.find(Le=>Le.id===f);if(!j)return;let fe=Y.filter(Le=>Le.id!==f),Oe=fe.length;if(w){let Le=w.dataset.beadId;if(Le===f)return;let k=fe.findIndex(se=>se.id===Le);k>=0&&(Oe=k)}let pt=fe.slice();pt.splice(Oe,0,j),N.applyReorder(f,pt,Oe)}function Bt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let j=w.dataset.lane||"",fe=U?.bead_id||f.dataTransfer?.getData("text/plain")||"",Oe=U?.from_lane||"";if(U=null,!fe)return;let pt=f.target?.closest?.(".worker-mini, .worker-card"),Le=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),k=Le.length;if(pt){let se=Le.indexOf(pt);se>=0&&(k=se)}if(k=Math.max(0,k-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(k=Ke()),j==="candidate"){if(Oe==="candidate"){xt(fe,pt);return}(Oe==="queue"||/^s[1-5]$/.test(Oe))&&mt(fe);return}if(j==="queue"||/^s[1-5]$/.test(j)){let se=j==="queue"?"parallel":j;Oe===j?_t(fe,se,k):ct(fe,se)}}function wt(f){ae=f,av(f),Ye()}function Ut(f){K=Mf(f),uv(K),Ye()}function tn(f){L=Wn(f),pv(L),b?.(L),Ye()}function ln(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let k=Number.parseInt(w.value,10);Number.isFinite(k)&&Se(k).then(Ye);return}let j=f.target?.closest?.(".worker-filter__blocked");if(j){wt({...ae,show_blocked:j.checked});return}let fe=f.target?.closest?.(".worker-done-range");if(fe){tn(fe.value);return}let Oe=f.target?.closest?.(".worker-sort");if(Oe){Ut(Oe.value||$l);return}let pt=f.target?.closest?.(".worker-slots__input");if(!pt)return;let Le=Number.parseInt(pt.value,10);if(!Number.isFinite(Le)){Ye();return}me(Le).then(Ye)}function $n(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function Wt(){let f=pe();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Cn(){le&&Ne.close(),dt.hidden=!1,gt.hidden=!1,Qe.open(Wt()),Ye()}function xn(f){let w=Q(),j=w.attempts?w.attempts[f]:null;le=f,Me=null,Qe.close(),dt.hidden=!0,gt.hidden=!1,Ne.open({attempt_id:f,meta:$n(j)}),Ye()}function rr(f){let w=Q(),j=(Array.isArray(w.session_active)?w.session_active:[]).find(Oe=>Oe&&Oe.bead_id===f),fe=(j&&Array.isArray(j.session_refs)?j.session_refs:[]).find(Oe=>Oe&&Oe.current===!0);fe&&(Qe.close(),dt.hidden=!0,gt.hidden=!1,Ne.open(Hr(fe,f,"in_progress")),Ye())}function T(f,w){le=null,Me=f,Qe.close(),dt.hidden=!0,gt.hidden=!1,Ne.open({attempt_id:f,meta:w,hide_prompt:!0}),Ye()}function O(){if(Qe.isOpen()&&Qe.refresh(Wt()),Me){let j=(o?.get()?.runs||[]).find(fe=>fe.run_id===Me);j?Ne.updateMeta(vl(j)):Ne.close();return}if(!le)return;let f=Q(),w=f.attempts?f.attempts[le]:null;if(w){Ne.updateMeta($n(w));return}Ne.close()}function Be(f,w){if(f.length===0||!l)return;let j=u?u():void 0;if(w.length===0||!j||w===j||!d){l(f);return}Promise.resolve(d(w)).then(()=>{l(f)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function He(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let j=w?.closest?.(".worker-dep__open");if(j){Be(j.getAttribute("data-dep-id")||"",j.getAttribute("data-root-dir")||"");return}let fe=w?.closest?.(".mon-overlap__chip");if(fe){let We=fe.closest("[data-bead-id]"),Et=We&&We.getAttribute("data-bead-id")||"";if(Et){let fn=fe.getAttribute("data-overlap-id")||"";q=!!q&&q.bead_id===Et&&q.counterpart_id===fn?null:{bead_id:Et,counterpart_id:fn},Ye()}return}let Oe=w?.closest?.(".mon-overlap__place");if(Oe){let We=Oe.closest("[data-bead-id]"),Et=We&&We.getAttribute("data-bead-id")||"";Et&&xe(Et,Oe.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){re?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Cn();return}let pt=w?.closest?.(".worker-repo-op__session");if(pt){let We=pt.dataset.attemptId;We&&xn(We);return}let Le=w?.closest?.(".worker-repo-op__resolve");if(Le){S(Le.dataset.operationId||"");return}let k=w?.closest?.(".worker-repo-op__dismiss");if(k){X(k.dataset.operationId||"");return}let se=w?.closest?.(".worker-cleanup__resume");if(se){let We=se.dataset.beadId;We&&et(We);return}let F=w?.closest?.(".worker-banner__resume");if(F){let We=F.dataset.attemptId;We&&Yt(We);return}let Te=w?.closest?.(".worker-banner__discard");if(Te){let We=Te.dataset.confirmation==="merged"?"merged":"unmerged";E(Te.dataset.beadId||"",Te.dataset.attemptId||null,We,Te.dataset.operationId||null);return}let ft=w?.closest?.(".worker-banner__dismiss");if(ft){let We=ft.dataset.attemptId;We&&Gt(We);return}if(w?.closest?.(".worker-play")){x(!Q().auto_advance);return}let Je=w?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?P(!1):ve():P(!0);return}let vt=w?.closest?.(".worker-pane__hd--toggle");if(vt){let We=vt.dataset.lane;(We==="queue"||We==="done")&&on(We);return}let it=w?.closest?.(".worker-card__place-lane");if(it){let We=it.dataset.beadId,Et=it.dataset.lane;We&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(V=null,Ye(),ct(We,Et));return}if(w?.closest?.(".worker-card__place-cancel")){V=null,Ye();return}let p=w?.closest?.(".worker-card__place");if(p){let We=p.dataset.beadId;We&&!p.disabled&&(je()?(V=We,Ye()):ct(We,"parallel"));return}let m=w?.closest?.(".worker-filter__chip");if(m){let We=m.dataset.spec;(We==="all"||We==="with"||We==="without")&&wt({...ae,spec:We});return}let y=w?.closest?.(".worker-mini__merge");if(y){let We=y.dataset.beadId||"";Q().cleanup_failed?.[We]?et(We):It(We);return}let $=w?.closest?.(".worker-mini__merge-cancel");if($){J($.dataset.beadId||"");return}let W=w?.closest?.(".worker-mini__discard");if(W){E(W.dataset.beadId||"",W.dataset.attemptId||null,W.dataset.discardMode==="merged"?"merged":"unmerged",W.dataset.operationId||null);return}let G=w?.closest?.(".worker-mini__stale-continue");if(G){H("worker-stale-work-continue",G.dataset.beadId||"",G.dataset.actionId||"");return}let oe=w?.closest?.(".worker-mini__stale-backup");if(oe){H("worker-stale-work-backup-fresh",oe.dataset.beadId||"",oe.dataset.actionId||"");return}let he=w?.closest?.(".worker-mini__stale-recheck");if(he){H("worker-stale-work-recheck",he.dataset.beadId||"",he.dataset.actionId||"");return}let tt=w?.closest?.(".worker-mini__revise-fix");if(tt){Pe("worker-revise-fix",tt.dataset.beadId||"");return}let ut=w?.closest?.(".worker-mini__revise-approve");if(ut){Pe("worker-revise-approve",ut.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let We=w?.closest?.(".rtile"),Et=We?.dataset?.beadId,fn=We?.dataset?.attemptId;Et&&E(Et,fn||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Gt(Et);return}if(w?.closest?.(".rtile__pause")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Mt(Et);return}if(w?.closest?.(".rtile__resume")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Yt(Et);return}if(w?.closest?.(".rtile__session")){let We=w?.closest?.(".rtile"),Et=We?.dataset?.attemptId;if(Et){xn(Et);return}let fn=We?.dataset?.beadId;fn&&rr(fn);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Ne.close();return}if(w?.closest?.(".worker-drawer-host"))return;let rn=w?.closest?.(".rtile .board-card__roll-toggle");if(rn){let We=rn.dataset.rollParent;We&&($e.has(We)?$e.delete(We):$e.add(We),Ye());return}let Dt=w?.closest?.(".rtile .board-card__roll-child");if(Dt){let We=Dt.dataset.childId;We&&l&&l(We);return}let pn=w?.closest?.(".rtile");if(pn){if(w?.closest?.(".rtile__id")){let Et=pn.dataset.beadId;Et&&Sn(Et).then(fn=>{fn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let We=pn.dataset.beadId;We&&l&&l(We);return}let An=w?.closest?.(".worker-mini, .worker-card");if(An){let We=An.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){We&&Sn(We).then(fn=>{fn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=w?.closest?.(".ctl-chip--from");if(Et){let fn=Et.dataset.fromId;fn&&l&&l(fn);return}We&&l&&l(We)}}e.addEventListener("pointerdown",Ie),e.addEventListener("dragstart",C),e.addEventListener("dragover",ye),e.addEventListener("dragleave",Fe),e.addEventListener("drop",Bt),e.addEventListener("click",He),e.addEventListener("change",ln);function at(f){if(!q)return;let w=f.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(q=null,Ye())}function Tt(f){f.key!=="Escape"||!q||(q=null,Ye())}return document.addEventListener("click",at),document.addEventListener("keydown",Tt),ne.push(()=>{document.removeEventListener("click",at),document.removeEventListener("keydown",Tt)}),an(),v&&ne.push(v.subscribe(()=>{for(let[f,w]of I)w==="failed"&&I.delete(f);Ye()})),s&&ne.push(s.subscribe(()=>{let f=u&&u()||"";f!==bt&&(bt=f,rt.close()),Ye(),O()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>{O(),Ye()})),Ye(),{load(){Ee(),Ye()},refreshSessionDefaults:Ze,destroy(){for(let f of ne.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Ie),e.removeEventListener("dragstart",C),e.removeEventListener("dragover",ye),e.removeEventListener("dragleave",Fe),e.removeEventListener("drop",Bt),e.removeEventListener("click",He),e.removeEventListener("change",ln);try{Ne.destroy()}catch{}gt.hidden=!0;try{re?.destroy()}catch{}try{rt.destroy()}catch{}st(c``,e)}}}function Al(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function qf(e,t,n,r=async()=>{},s=async()=>{}){let o=Vt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(K){let I=K.target.value,Ae=t.getState().workspace?.current?.path||"";if(I&&I!==Ae){o("switching workspace to %s",I),i=!0,D();try{await n(I)}catch(ke){o("workspace switch failed: %o",ke)}finally{i=!1,D()}}}async function g(){let K=t.getState(),L=K.workspace?.current?.path||K.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,D();try{await r(L)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,D()}}}function h(K){let L=K.target;L&&e.contains(L)||N()}function b(K){K.key==="Escape"&&N()}function v(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),D())}function N(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),D())}function U(){u?N():v()}async function Y(K){let L=K.target,I=L.value,te=L.checked;o("toggling visibility %s \u2192 %s",I,String(te));try{await s(I,te)}catch(Ae){o("workspace visibility toggle failed: %o",Ae)}}function ae(K){return K?c`
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
          @click=${U}
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
    `}function q(){let K=t.getState(),L=K.workspace?.current,I=K.workspace?.available||[],te=new Set(K.workspace?.hidden||[]),Ae=L?.path||I[0]?.path||"";if(I.length===0)return c``;let ke=I.filter(_e=>!te.has(_e.path)||_e.path===Ae);if(ke.length<=1){let _e=ke[0]||I[0],ie=Al(_e.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${ie}</span
          >
          ${V(I,te)}
          ${ae(Ae)}
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
                ?selected=${_e.path===Ae}
                title="${_e.path}"
              >
                ${Al(_e.path)}
              </option>
            `)}
        </select>
        ${V(I,te)}
        ${ae(Ae)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){st(q(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),st(c``,e)}}}var Ff=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Sl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function jf(e,t,n=Sl()){return{id:n,type:e,payload:t}}function Bf(e={}){let t=Vt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],g=new Map,h=new Set;function b(q){for(let D of Array.from(h))try{D(q)}catch{}}function v(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),D=(n.jitterRatio||0)*q,K=Math.max(0,Math.round(q+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",K,a+1),i=setTimeout(()=>{i=null,V()},K)}function N(q){try{s?.send(JSON.stringify(q))}catch(D){t("ws send failed",D)}}function U(){for(o="open",t("ws open"),b(o),a=0;d.length;){let q=d.shift();q&&N(q)}}function Y(q){let D;try{D=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let L=u.get(D.id);u.delete(D.id),D.ok?L?.resolve(D.payload):L?.reject(D.error||new Error("ws error"));return}let K=g.get(D.type);if(K&&K.size>0)for(let L of Array.from(K))try{L(D.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",D.type)}function ae(){o="closed",t("ws closed"),b(o);for(let[q,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(q);a+=1,v()}function V(){if(!l)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",b(o),s.addEventListener("open",U),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(D){t("ws connect failed %o",D),v()}}return V(),{send(q,D){if(!Ff.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let K=Sl(),L=jf(q,D,K);return t("send %s id=%s",q,K),new Promise((I,te)=>{u.set(K,{resolve:I,reject:te,type:q}),s&&s.readyState===s.OPEN?N(L):(t("queue %s id=%s (state=%s)",q,K,o),d.push(L))})},on(q,D){g.has(q)||g.set(q,new Set);let K=g.get(q);return K?.add(D),()=>{K?.delete(D)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,V()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Lv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Iv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var El=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Uf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],fr="tab:worker:closed",Pv="bdui.worker.done-range",Wf=Up,zf="worker:queue",Hf="worker:parallel-analysis",Gf="ui:order",Kf="ui:display-policy",Vf="exec:presets",_r="tab:board:closed",Yf="beads-ui.board.closed-range";function Mv(e){let t=Vt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;st(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&cf(a),i&&l&&u&&d){let ne=function(T,O){let Be="Request failed",He="";if(T&&typeof T=="object"){let Tt=T;if(typeof Tt.message=="string"&&Tt.message.length>0&&(Be=Tt.message),typeof Tt.details=="string")He=Tt.details;else if(Tt.details&&typeof Tt.details=="object")try{He=JSON.stringify(Tt.details,null,2)}catch{He=""}}else typeof T=="string"&&T.length>0&&(Be=T);let at=O&&O.length>0?`Failed to load ${O}`:"Request failed";z.open(at,Be,He)},je=function(T){return`${lt.getState().workspace.current?.path||""}\0${T}`},ot=function(){Me&&(Me().catch(()=>{}),Me=null),Ne=null,Qe=null},we=function(T){rt=T;let O=()=>{rt!==T||lt.getState().selected_id!==T||(rt=null,ze(T))};if(!re){ht.then(O);return}O()},mt=function(T,O,Be,He,at){return Be!==_t[O]?(at().catch(()=>{}),!1):(T.set(He,at),!0)},Yt=function(){let T=lt.getState();qe(T.view==="board"),Pe(T.view==="worker"),Se(T.view==="monitor"),S(T.view==="board"||T.view==="worker"||Mt||!!T.selected_id)},It=function(){let T=vr(Gt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},et=function(){let T=vr(Ot);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},qe=function(T){if(T)for(let[O,Be]of El){if(Ke.has(O)||ct.has(O))continue;let He=O===_r?It():{type:Be};try{ce.register(O,He)}catch(f){t("register %s store failed: %o",O,f)}ct.add(O);let at=_t.board,Tt=!1;Ze.subscribeList(O,He).then(f=>{Tt=!mt(Ke,"board",at,O,f)}).catch(f=>{t("subscribe %s failed: %o",O,f),ne(f,"board")}).finally(()=>{ct.delete(O),Tt&&Yt()})}else ve()},ve=function(){_t.board+=1;for(let[T]of El){let O=Ke.get(T);O&&(O().catch(()=>{}),Ke.delete(T));try{ce.unregister(T)}catch(Be){t("unregister %s failed: %o",T,Be)}}},Pe=function(T){if(!T){x();return}for(let[O,Be]of Uf){if(E.has(O)||ct.has(O))continue;let He=O===fr?et():{type:Be};try{ce.register(O,He)}catch(f){t("register %s store failed: %o",O,f)}ct.add(O);let at=_t.worker,Tt=!1;Ze.subscribeList(O,He).then(f=>{Tt=!mt(E,"worker",at,O,f)}).catch(f=>{t("subscribe %s failed: %o",O,f),ne(f,"worker")}).finally(()=>{ct.delete(O),Tt&&Yt()})}},x=function(){_t.worker+=1;for(let[T]of Uf){let O=E.get(T);O&&(O().catch(()=>{}),E.delete(T));try{ce.unregister(T)}catch(Be){t("unregister %s failed: %o",T,Be)}}},S=function(T){if(!T){X();return}H||(Ee("subscribe-worker-queue",{id:zf}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),Ee("subscribe-worker-parallel-analysis",{id:Hf}).catch(O=>{t("subscribe-worker-parallel-analysis failed: %o",O)}),H=()=>(Ee("unsubscribe-worker-parallel-analysis",{id:Hf}),Ee("unsubscribe-worker-queue",{id:zf})))},X=function(){H&&(H().catch(()=>{}),H=null),gt.clear()},Se=function(T){if(!T){ge();return}me||(Ee("subscribe-monitor-pipeline",{id:Wf}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),me=()=>Ee("unsubscribe-monitor-pipeline",{id:Wf}))},ge=function(){me&&(me().catch(()=>{}),me=null)},B=function(){A||(Ee("subscribe-ui-order",{id:Gf}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),A=()=>Ee("unsubscribe-ui-order",{id:Gf}))},xe=function(){A&&(A().catch(()=>{}),A=null),$t.clear()},pe=function(){Ve||(Ee("subscribe-display-policy",{id:Kf}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),Ve=()=>Ee("unsubscribe-display-policy",{id:Kf}))},Xe=function(){Ve&&(Ve().catch(()=>{}),Ve=null),dt.clear()},yt=function(){St||(Ee("subscribe-impl-presets",{id:Vf}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),St=()=>Ee("unsubscribe-impl-presets",{id:Vf}))},nn=function(T){if(!T)return"Unknown";let O=T.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},tn=function(T,O){Ut.open(T.path,{missing_state:T.missing_state,...O?{workspace:O}:{}})};var g=ne,h=je,b=ot,v=we,N=mt,U=Yt,Y=It,ae=et,V=qe,q=ve,D=Pe,K=x,L=S,I=X,te=Se,Ae=ge,ke=B,_e=xe,ie=pe,Ce=Xe,De=yt,$e=nn,ee=tn;let Z=document.getElementById("header-loading"),Re=zc(Z),z=Pd(e),be=Bf(),Ee=Re.wrapSend((T,O)=>be.send(T,O)),Ze=Dc(Ee),ce=Nc(),Ue=jc(),gt=Fc(),At=kc(),$t=qc(),dt=vc(),R=wc(),le=$c();be.on("impl-presets-snapshot",T=>{let O=T;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&R.set({revision:O.revision,presets:O.presets})}),be.on("monitor-pipeline-snapshot",T=>{let O=T;if(!(!O||!Array.isArray(O.workspaces)))try{At.set(O.workspaces,O.workspaces_state,O.cross_lanes)}catch{}}),be.on("ui-order-snapshot",T=>{let O=T;if(O&&typeof O.revision=="number")try{$t.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),be.on("display-policy-snapshot",T=>{let O=T;if(O&&O.policy&&typeof O.policy=="object")try{dt.set(O.policy)}catch{}}),be.on("session-log-snapshot",T=>{let O=T;if(O&&typeof O.id=="string")try{le.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),be.on("session-log-append",T=>{let O=T;if(O&&typeof O.id=="string")try{le.append(O.id,O.event)}catch{}}),be.on("snapshot",T=>{let O=T,Be=O&&typeof O.id=="string"?O.id:"",He=Be?ce.getStore(Be):null;if(He&&O&&O.type==="snapshot")try{He.applyPush(O)}catch{}}),be.on("upsert",T=>{let O=T,Be=O&&typeof O.id=="string"?O.id:"",He=Be?ce.getStore(Be):null;if(He&&O&&O.type==="upsert")try{He.applyPush(O)}catch{}}),be.on("delete",T=>{let O=T,Be=O&&typeof O.id=="string"?O.id:"",He=Be?ce.getStore(Be):null;if(He&&O&&O.type==="delete")try{He.applyPush(O)}catch{}});let Me=null,Ne=null,Qe=null,rt=null,bt=()=>{},ht=new Promise(T=>{bt=()=>T(void 0)}),re=!1,Q=!1;async function ze(T){let O=je(T);if(O===Ne||O===Qe)return;Qe=O;let Be=`detail:${T}`,He={type:"issue-detail",params:{id:T}};try{ce.register(Be,He)}catch(at){t("register detail store failed: %o",at)}try{let at=await Ze.subscribeList(Be,He);if(lt.getState().selected_id!==T||je(T)!==O){await at().catch(()=>{});return}Me&&await Me().catch(()=>{}),Me=at,Ne=O}catch(at){t("detail subscribe failed: %o",at),ne(at,"issue details")}finally{Qe===O&&(Qe=null)}}let Ke=new Map,ct=new Set,_t={board:0,worker:0},Mt=!1,Gt=go;try{let T=window.localStorage.getItem(Yf);Ja(T)&&(Gt=T)}catch{}let Ot="today";try{let T=window.localStorage.getItem(Pv);T!==null&&(Ot=Wn(T))}catch{}async function P(T){if(!Ja(T)||T===Gt)return;Gt=T;try{window.localStorage.setItem(Yf,T)}catch{}let O=Ke.get(_r);if(!O)return;Ke.delete(_r),await O().catch(()=>{});let Be=It();try{ce.register(_r,Be)}catch(He){t("register %s store failed: %o",_r,He)}try{let He=await Ze.subscribeList(_r,Be);Ke.set(_r,He)}catch(He){t("re-subscribe %s failed: %o",_r,He),ne(He,"board")}}async function J(T){let O=Wn(T);if(O===Ot)return;Ot=O;let Be=E.get(fr);if(!Be)return;E.delete(fr),await Be().catch(()=>{});let He=et();try{ce.register(fr,He)}catch(at){t("register %s store failed: %o",fr,at)}try{let at=await Ze.subscribeList(fr,He);E.set(fr,at)}catch(at){t("re-subscribe %s failed: %o",fr,at),ne(at,"worker")}}let E=new Map,H=null,me=null,A=null,Ve=null,St=null;async function Ft(){Ve=null,dt.clear(),St=null,R.clear(),H=null,me=null,Ke.clear(),E.clear(),_t.board+=1,_t.worker+=1,yt();let T=lt.getState().workspace.current?.path;if(T)try{await be.send("set-workspace",{path:T})}catch(Be){t("workspace restore after reconnect failed: %o",Be);return}pe();let O=lt.getState();qe(O.view==="board"),Pe(O.view==="worker"),Se(O.view==="monitor"),S(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function Jt(){t("clearing all subscriptions for workspace switch"),ve(),x(),X(),Ue.clear(),xe(),B(),Xe(),pe(),ot();let T=lt.getState();if(T.selected_id)try{ce.unregister(`detail:${T.selected_id}`)}catch{}let O=lt.getState();qe(O.view==="board"),Pe(O.view==="worker"),Se(O.view==="monitor"),S(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&we(O.selected_id)}async function Lt(T){t("requesting workspace switch to %s",T),Q=!0;try{let O=await be.send("set-workspace",{path:T});t("workspace switch result: %o",O),O&&O.workspace&&(lt.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),O.changed&&(await Jt(),de("Switched to "+nn(T),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),de("Failed to switch workspace","error",3e3),O}finally{Q=!1}}async function _n(T){t("requesting workspace git pull for %s",T);try{let O=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let Be=O?.status;if(Be==="up_to_date"){de("Already up to date","success",2e3);return}if(Be==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+nn(T),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let Be=O?.code,He=O?.message;if(Be==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Be==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Be==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let at=He?`: ${He}`:"";throw de(`Git pull failed${at}`,"error",3e3),O}}async function Kt(T,O){t("setting workspace visibility %s \u2192 %s",T,String(O));try{await be.send("set-workspace-visibility",{path:T,visible:O}),await on()}catch(Be){t("workspace visibility update failed: %o",Be),de("Failed to update project visibility","error",3e3)}}async function on(){try{let T=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let O=T.workspaces.map(Tt=>({path:Tt.path,database:Tt.database,pid:Tt.pid,version:Tt.version})),Be=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,He=Array.isArray(T.hidden)?T.hidden.filter(Tt=>typeof Tt=="string"):[];lt.setState({workspace:{current:Be,available:O,hidden:He}});let at=window.localStorage.getItem("beads-ui.workspace");at&&(!O.some(f=>f.path===at)||He.includes(at)?window.localStorage.removeItem("beads-ui.workspace"):Be&&at!==Be.path&&(t("restoring saved workspace preference: %s",at),await Lt(at)))}}catch(T){t("failed to load workspaces: %o",T)}}be.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(lt.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),on(),Jt())});let Ye=!1;if(typeof be.onConnection=="function"){let T=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(Ye=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&Ye&&(Ye=!1,de("Reconnected","success",2200),Iv(lt,(Be,He)=>{t(`${Be}: %o`,He)}),Ft())};be.onConnection(T)}let an="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(an=T)}catch(T){t("view parse error: %o",T)}let lt=Wc({config:Lv(),view:an});be.on("worker-queue-snapshot",T=>{let O=T;if(!O||!O.queue)return;let Be=lt.getState().workspace.current?.path;if(typeof Be=="string"&&Be.length>0&&O.root_dir!==Be){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{Ue.set(O.queue)}catch{}}),be.on("worker-parallel-analysis-snapshot",T=>{let O=T;if(!O)return;let Be=lt.getState().workspace.current?.path;if(!(typeof Be=="string"&&Be.length>0&&typeof O.root_dir=="string"&&O.root_dir!==Be))try{gt.set({settings:O.settings,job:O.job??null,runs:Array.isArray(O.runs)?O.runs:[],last_good:O.last_good??null})}catch{}});let Ie=Bc(lt);Ie.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),ye=async(T,O)=>{try{return await Ee(T,O)}catch(Be){if(C.has(T))throw Be;return[]}};zp({global_element:r,repo_element:s},lt,Ie);let Fe=document.getElementById("workspace-picker");Fe&&qf(Fe,lt,Lt,_n,Kt);let xt=Vp(e,(T,O)=>Ee(T,O));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>xt.open())}catch{}let Bt=Xp(e,{policyStore:dt,queueStore:Ue,implPresetStore:R,transport:(T,O)=>Ee(T,O),onOpenChange:T=>{let O=Mt;Mt=T,Yt(),O&&T===!1&&$n.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[O]of El)for(let Be of ce.snapshotFor(O)||[]){let He=Be.labels;if(Array.isArray(He))for(let at of He)typeof at=="string"&&at.length>0&&T.add(at)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>Bt.open()))}catch{}let wt=document.createElement("div");wt.className="md-viewer-root",document.body.appendChild(wt);let Ut=ia(wt,{getWorkspacePath:()=>lt.getState().workspace.current?.path}),ln=ou(i,{gotoIssue:T=>Ie.gotoIssue(T),issueStores:ce,transport:ye,workerQueueStore:Ue,uiOrderStore:$t,displayPolicyStore:dt,closedRange:Gt,onClosedRangeChange:T=>{P(T)},onNewIssue:()=>xt.open(),openDoc:tn}),$n=xl(l,{transport:ye,issueStores:ce,queueStore:Ue,analysisStore:gt,sessionLogStore:le,uiOrderStore:$t,gotoIssue:T=>lt.setState({selected_id:T}),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:T=>Lt(T),openDoc:tn,doneRange:Ot,onDoneRangeChange:T=>{J(T)}}),Wt=Wp(u,{transport:ye,pipelineStore:At,execPresetStore:R,sessionLogStore:le,router:Ie,gotoIssue:T=>Ie.gotoIssue(T),getWorkspacePath:()=>lt.getState().workspace.current?.path,switchWorkspace:T=>Lt(T),openDoc:tn}),Cn=Id(d,{issueStores:ce,transport:ye,queueStore:Ue,execPresetStore:R,sessionLogStore:le,getWorkspacePath:()=>lt.getState().workspace.current?.path,mdViewer:Ut,onNavigate:T=>{lt.getState().view==="worker"?lt.setState({selected_id:T}):Ie.gotoIssue(T)},onClose:()=>{let T=lt.getState();lt.setState({selected_id:null});try{Ie.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{Bt.open("execution")}}),xn=lt.getState().selected_id;xn&&(d.hidden=!1,Cn.load(xn),we(xn)),lt.subscribe(T=>{let O=T.selected_id;O?(d.hidden=!1,Cn.load(O),Q||we(O)):(Cn.clear(),d.hidden=!0,ot())});let rr=T=>{i.hidden=T.view!=="board",l.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),qe(T.view==="board"),Pe(T.view==="worker"),Se(T.view==="monitor"),S(T.view==="board"||T.view==="worker"||Mt||!!T.selected_id),!T.selected_id&&T.view==="board"&&ln.load(),T.view==="worker"&&$n.load(),T.view==="monitor"?Wt.load():Wt.pause(),window.localStorage.setItem("beads-ui.view",T.view)};lt.subscribe(rr),rr(lt.getState()),B(),pe(),yt(),on().finally(()=>{re=!0,bt()}),window.addEventListener("keydown",T=>{let O=T.ctrlKey||T.metaKey,Be=String(T.key||"").toLowerCase(),He=T.target,at=He&&He.tagName?String(He.tagName).toLowerCase():"",Tt=at==="input"||at==="textarea"||at==="select"||He&&typeof He.isContentEditable=="boolean"&&He.isContentEditable;O&&Be==="n"&&(Tt||(T.preventDefault(),xt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Mv(t)});export{Mv as bootstrap,Lv as readBootstrapConfig,Iv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
