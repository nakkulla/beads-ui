var m_=Object.create;var Xi=Object.defineProperty;var g_=Object.getOwnPropertyDescriptor;var b_=Object.getOwnPropertyNames;var h_=Object.getPrototypeOf,y_=Object.prototype.hasOwnProperty;var v_=(e,t,n)=>t in e?Xi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ji=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var w_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of b_(t))!y_.call(e,s)&&s!==n&&Xi(e,s,{get:()=>t[s],enumerable:!(r=g_(t,s))||r.enumerable});return e};var k_=(e,t,n)=>(n=e!=null?m_(h_(e)):{},w_(t||!e||!e.__esModule?Xi(n,"default",{value:e,enumerable:!0}):n,e));var Mt=(e,t,n)=>v_(e,typeof t!="symbol"?t+"":t,n);var Ac=Ji((Yv,xc)=>{var Ur=1e3,Wr=Ur*60,zr=Wr*60,xr=zr*24,A_=xr*7,S_=xr*365.25;xc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return E_(e);if(n==="number"&&isFinite(e))return t.long?C_(e):T_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function E_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*S_;case"weeks":case"week":case"w":return n*A_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Wr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function T_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=zr?Math.round(e/zr)+"h":t>=Wr?Math.round(e/Wr)+"m":t>=Ur?Math.round(e/Ur)+"s":e+"ms"}function C_(e){var t=Math.abs(e);return t>=xr?ko(e,t,xr,"day"):t>=zr?ko(e,t,zr,"hour"):t>=Wr?ko(e,t,Wr,"minute"):t>=Ur?ko(e,t,Ur,"second"):e+" ms"}function ko(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Ec=Ji((Zv,Sc)=>{function R_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=Ac(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let g=0;for(let h=0;h<d.length;h++)g=(g<<5)-g+d.charCodeAt(h),g|=0;return n.colors[Math.abs(g)%n.colors.length]}n.selectColor=t;function n(d){let g,h=null,b,k;function N(...G){if(!N.enabled)return;let V=N,ae=Number(new Date),X=ae-(g||ae);V.diff=X,V.prev=g,V.curr=ae,g=ae,G[0]=n.coerce(G[0]),typeof G[0]!="string"&&G.unshift("%O");let B=0;G[0]=G[0].replace(/%([a-zA-Z%])/g,(j,Y)=>{if(j==="%%")return"%";B++;let Q=n.formatters[Y];if(typeof Q=="function"){let ce=G[B];j=Q.call(V,ce),G.splice(B,1),B--}return j}),n.formatArgs.call(V,G),(V.log||n.log).apply(V,G)}return N.namespace=d,N.useColors=n.useColors(),N.color=n.selectColor(d),N.extend=r,N.destroy=n.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:G=>{h=G}}),typeof n.init=="function"&&n.init(N),N}function r(d,g){let h=n(this.namespace+(typeof g>"u"?":":g)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let g=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,g){let h=0,b=0,k=-1,N=0;for(;h<d.length;)if(b<g.length&&(g[b]===d[h]||g[b]==="*"))g[b]==="*"?(k=b,N=h,b++):(h++,b++);else if(k!==-1)b=k+1,N++,h=N;else return!1;for(;b<g.length&&g[b]==="*";)b++;return b===g.length}function i(){let d=[...n.names,...n.skips.map(g=>"-"+g)].join(",");return n.enable(""),d}function a(d){for(let g of n.skips)if(o(d,g))return!1;for(let g of n.names)if(o(d,g))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Sc.exports=R_});var Tc=Ji((gn,$o)=>{gn.formatArgs=L_;gn.save=I_;gn.load=P_;gn.useColors=O_;gn.storage=M_();gn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();gn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function O_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function L_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+$o.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}gn.log=console.debug||console.log||(()=>{});function I_(e){try{e?gn.storage.setItem("debug",e):gn.storage.removeItem("debug")}catch{}}function P_(){let e;try{e=gn.storage.getItem("debug")||gn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function M_(){try{return localStorage}catch{}}$o.exports=Ec()(gn);var{formatters:D_}=$o.exports;D_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ps=globalThis,mo=ps.trustedTypes,lc=mo?mo.createPolicy("lit-html",{createHTML:e=>e}):void 0,ta="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,na="?"+Qn,$_=`<${na}>`,vr=document,fs=()=>vr.createComment(""),_s=e=>e===null||typeof e!="object"&&typeof e!="function",ra=Array.isArray,_c=e=>ra(e)||typeof e?.[Symbol.iterator]=="function",ea=`[ 	
\f\r]`,ds=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cc=/-->/g,uc=/>/g,hr=RegExp(`>|${ea}(?:([^\\s"'>=/]+)(${ea}*=${ea}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dc=/'/g,pc=/"/g,mc=/^(?:script|style|textarea|title)$/i,sa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=sa(1),gs=sa(2),Uv=sa(3),En=Symbol.for("lit-noChange"),Gt=Symbol.for("lit-nothing"),fc=new WeakMap,yr=vr.createTreeWalker(vr,129);function gc(e,t){if(!ra(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return lc!==void 0?lc.createHTML(t):t}var bc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=ds;for(let a=0;a<n;a++){let l=e[a],u,d,g=-1,h=0;for(;h<l.length&&(i.lastIndex=h,d=i.exec(l),d!==null);)h=i.lastIndex,i===ds?d[1]==="!--"?i=cc:d[1]!==void 0?i=uc:d[2]!==void 0?(mc.test(d[2])&&(s=RegExp("</"+d[2],"g")),i=hr):d[3]!==void 0&&(i=hr):i===hr?d[0]===">"?(i=s??ds,g=-1):d[1]===void 0?g=-2:(g=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?hr:d[3]==='"'?pc:dc):i===pc||i===dc?i=hr:i===cc||i===uc?i=ds:(i=hr,s=void 0);let b=i===hr&&e[a+1].startsWith("/>")?" ":"";o+=i===ds?l+$_:g>=0?(r.push(u),l.slice(0,g)+ta+l.slice(g)+Qn+b):l+Qn+(g===-2?a:b)}return[gc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ms=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[u,d]=bc(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ta)){let h=d[i++],b=s.getAttribute(g).split(Qn),k=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?bo:k[1]==="?"?ho:k[1]==="@"?yo:kr}),s.removeAttribute(g)}else g.startsWith(Qn)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(mc.test(s.tagName)){let g=s.textContent.split(Qn),h=g.length-1;if(h>0){s.textContent=mo?mo.emptyScript:"";for(let b=0;b<h;b++)s.append(g[b],fs()),yr.nextNode(),l.push({type:2,index:++o});s.append(g[h],fs())}}}else if(s.nodeType===8)if(s.data===na)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Qn,g+1))!==-1;)l.push({type:7,index:o}),g+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===En)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=_s(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var go=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new jr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new vo(o,this,t)),this._$AV.push(u),l=r[++a]}i!==l?.index&&(o=yr.nextNode(),i++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Gt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),_s(t)?t===Gt||t==null||t===""?(this._$AH!==Gt&&this._$AR(),this._$AH=Gt):t!==this._$AH&&t!==En&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_c(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Gt&&_s(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ms.createElement(gc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new go(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=fc.get(t.strings);return n===void 0&&fc.set(t.strings,n=new ms(t)),n}k(t){ra(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(fs()),this.O(fs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Gt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Gt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=wr(this,t,n,0),i=!_s(t)||t!==this._$AH&&t!==En,i&&(this._$AH=t);else{let a=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=wr(this,a[r+l],n,l),u===En&&(u=this._$AH[l]),i||(i=!_s(u)||u!==this._$AH[l]),u===Gt?t=Gt:t!==Gt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}i&&!s&&this.j(t)}j(t){t===Gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bo=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Gt?void 0:t}},ho=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Gt)}},yo=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Gt)===En)return;let r=this._$AH,s=t===Gt&&r!==Gt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Gt&&(r===Gt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},hc={M:ta,P:Qn,A:na,C:1,L:bc,R:go,D:_c,V:wr,I:jr,H:kr,N:ho,U:yo,B:bo,F:vo},x_=ps.litHtmlPolyfillSupport;x_?.(ms,jr),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new jr(t.insertBefore(fs(),o),o,void 0,n??{})}return s._$AI(e),s};var wo="today",yc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Br=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Hn(e){return e==="today"?"today":"7d"}function oa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function kc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,a){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function $c(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,o],a.last_event_at=Date.now(),e.set(i,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Cc=k_(Tc(),1);function Ht(e){return(0,Cc.default)(`beads-ui:${e}`)}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Lc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function xo(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ic(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=In(e.created_at),o=In(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Pc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var N_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Rc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Oc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=N_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e,t){let n=Rc(e),r=Rc(t);if(n!==r)return n<r?-1:1;let s=Oc(e),o=Oc(t);if(s!==o)return s<o?-1:1;let i=In(e&&e.created_at),a=In(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ia=2**20;function Hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Ao(e){return(t,n)=>{let r=Hr(t,e),s=Hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function aa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:Hr(a,n)-ia};if(!a)return{rank:Hr(i,n)+ia};let l=Hr(i,n),u=Hr(a,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((g,h)=>({bead_id:g.id,rank:h*ia}))}}function la(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||Ar;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function g(h){if(a||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let N of k)N&&typeof N.id=="string"&&N.id.length>0&&r.set(N.id,N);d(),o=b,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let N=r.get(k.id);if(!N)r.set(k.id,k);else{let G=Number.isFinite(N.updated_at)?N.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(G<=V){for(let ae of Object.keys(N))ae in k||delete N[ae];for(let[ae,X]of Object.entries(k))N[ae]=X}}d()}o=b,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:g,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function So(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Dc(e){let t=Ht("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let N=k.itemsById;for(let G of d)typeof G=="string"&&G.length>0&&N.set(G,!0);for(let G of g)typeof G=="string"&&G.length>0&&N.set(G,!0);for(let G of h)typeof G=="string"&&G.length>0&&N.delete(G)}}async function o(a,l){let u=So(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let g=n.get(a);if(g&&g.key!==u){let h=r.get(g.key);h&&(h.delete(a),h.size===0&&r.delete(g.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(g){let h=n.get(a)||null;if(h){let b=r.get(h.key);b&&(b.delete(a),b.size===0&&r.delete(h.key))}throw n.delete(a),g}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let g=n.get(a)||null;if(g){let h=r.get(g.key);h&&(h.delete(a),h.size===0&&r.delete(g.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:So,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Nc(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,u,d){let g=u?So(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),b&&h&&g&&h!==g){let k=t.get(l);if(k)try{k.dispose()}catch{}let N=s.get(l);if(N){try{N()}catch{}s.delete(l)}let G=la(l,d);t.set(l,G);let V=G.subscribe(()=>o());s.set(l,V)}else if(!b){let k=la(l,d);t.set(l,k);let N=k.subscribe(()=>o());s.set(l,N)}return n.set(l,g),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function qc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ca(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function q_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function F_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function jc(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):q_(r),i=F_(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=ca(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ca(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var j_=Object.freeze({workspace_config:{default_workspace:null}});function Bc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:j_.workspace_config.default_workspace}}}function Uc(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Bc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Bc(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Wc(e){let t=Ht("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(g,h)=>{let b=s++,k=Date.now();r.set(b,{type:g,start_ts:k}),t("request start id=%d type=%s count=%d",b,g,n+1),i();let N=!1,G=()=>{N||(N=!0,r.delete(b),a())},V=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,g,Date.now()-k),G())},3e4);try{let ae=await u(g,h),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,g,X),ae}catch(ae){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,g,X,ae),ae}finally{clearTimeout(V),G()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,g])=>({id:d,type:g.type,elapsed_ms:u-g.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(Pc),l;switch(a){case"created_desc":return l.sort(Ar),l;case"created_asc":return l.sort(Lc),l;case"updated_desc":return l.sort(xo),l;case"priority":return l.sort(Ic),l;case"manual":default:{let u=n();return u?l.sort(Ao(u)):l.sort(Ar),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Pn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ln(e){let t=Pn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function bn(e,t){let n=Pn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Pn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function To(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Co(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=To(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ro(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=zc(n);return{total:n.length,count:r,current:s,children:n}}function Oo(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(aa(a,l,u.order),i);s(u,d);let g=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};n.set(h);let b=r(aa(a,l,h.order),i);s(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Hc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Lo(e,t){let n=Hc(e),r=Hc(t);return n.length===0||r.length===0?!1:n!==r}function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ua(e,t){return!t||typeof e!="string"||e.length===0||Io(t.visible_labels).includes(e)?!0:Io(t.hidden_labels).includes(e)?!1:!Io(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Gc(e,t){return Io(e).filter(n=>ua(n,t))}function lr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function B_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function U_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function W_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${B_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Po(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(Mc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?U_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>W_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var z_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Kc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},H_={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function G_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yc(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function K_(e){if(!e||e.fill==="none"||!e.approval_state)return Yc(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function V_(e,t,n,r){let s=z_[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,a=H_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),i&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",g=Vc[e]||e,h=r?Zc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${a}</div>
        <div class=${u}>${g}</div>
      </div>
    `;let b=`${g} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${l} style=${d}>${a}</div>
      <div class=${u}>${g}</div>
    </button>
  `}function Zc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Mo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Kc[e.route]||Kc.spec_backed,o=e.stages,i=G_(s,o,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Vc[u]||u} ${u==="plan"?K_(o[u]||{}):Yc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Zc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(u=>V_(u,o[u]||{},u===i,r))}
    </div>
  `}function Y_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Qc=2;function Xc(e){let t=e.slice(0,Qc).join(", "),n=e.length-Qc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Z_(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(Lo(e,i)?o:s).push(i);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Xc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Xc(o)}</span
      >`),n}function da(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Do(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xn(e){return`${e.kind}:${Do(e)}@${e.sha}`}function No(e,t){if(!e)return null;let n=da(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=da(t?.kind),i=o!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Xn(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function Jc(e,t){let n=No(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Q_(e){if(!e)return null;let t=da(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function X_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&lr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&lr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&lr(n,"pr")){let a=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let o=Jc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let a=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(a)}`}
        >${`exec ${a.kind==="delegated"?Do(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Gc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(n,"blocked")&&s.push(...Z_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function J_(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function em(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Po(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:J_(e),empty_label:"children \uC5C6\uC74C",childChips:pa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function pa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return No(t,n)?c`<span class="board-card__roll-child-chips">
    ${Jc(t,n)}
    ${Q_(n)}
  </span>`:null}function qo(e,t){let n=Y_(e.priority);return c`
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
      ${X_(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Mo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${em(e,t)}
    </article>
  `}function Gr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
        ${e.items.map(o=>qo(o,t))}
      </div>
    </section>
  `}function eu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>qo(r,t))}
        </div>
      </div>
    </dialog>
  `}var tm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],nm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],rm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function sm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function tu(e,t,n){return c`
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
        ${tm.map(r=>c`<option
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
        ${nm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${sm(e,t,n)}
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
        ${rm.map(r=>c`<option
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
  `}var om=200,im={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},am=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),nu="beads-ui.board.sort",ru=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function lm(){try{let e=window.localStorage.getItem(nu);if(e&&ru.has(e))return e}catch{}return"created_desc"}function su(e,t){let n=Ht("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,g=t.openDoc,h=t.closedRange||wo,b=s?Eo(s,i):null,k=Oo({transport:o,uiOrderStore:i}),N=[],G=[],V=[],ae=[],X=[],B=[],L=!1,j=0,Y=lm(),Q=new Map,ce=new Map,U=new Map,ee=new Set,ne={search:"",priority:"",type:"",labels:[]},oe=!1,ye=null;function Ne(T){return String(T.status||"open")==="open"}function he(T){let H=String(T.status||"open");return H==="open"||H==="blocked"}function Z(T){let H=ne.search.trim().toLowerCase(),Le=ne.priority,Fe=ne.type,Ae=ne.labels;return T.filter(Xe=>{if(H){let ut=String(Xe.id||"").toLowerCase(),ze=String(Xe.title||"").toLowerCase();if(!ut.includes(H)&&!ze.includes(H))return!1}if(Le!==""&&String(Xe.priority)!==Le||Fe!==""&&String(Xe.issue_type||"")!==Fe)return!1;if(Ae.length>0){let ut=Array.isArray(Xe.labels)?Xe.labels:[];if(!Ae.some(ze=>ut.includes(ze)))return!1}return!0})}function ve(){let T=new Set;for(let H of[N,G,V,ae,X,B])for(let Le of H){let Fe=Array.isArray(Le.labels)?Le.labels:[];for(let Ae of Fe)typeof Ae=="string"&&Ae.length>0&&T.add(Ae)}return Array.from(T).sort()}function Ee(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function W(){try{if(b){let T=b.selectBoardColumn("tab:board:in-progress","in_progress",Y),H=b.selectBoardColumn("tab:board:blocked","blocked",Y).filter(he),Le=new Set(T.map(C=>C.id)),Fe=b.selectBoardColumn("tab:board:ready","ready",Y).filter(C=>Ne(C)&&!Le.has(C.id)),Ae=b.selectBoardColumn("tab:board:resolved","resolved",Y),Xe=b.selectBoardColumn("tab:board:deferred","deferred",Y),ut=b.selectBoardColumn("tab:board:closed","closed").slice(0,om),ze=[...H,...Fe,...T,...Ae,...ut];P(ze);let tt=new Set;for(let C of ze)C&&C.id&&!To(C)&&tt.add(C.id);let I=!Ee();N=I?bs(H,tt):H,G=I?bs(Fe,tt):Fe,V=I?bs(T,tt):T,ae=I?bs(Ae,tt):Ae,X=Xe,j=Xe.length,B=I?bs(ut,tt):ut,Q=new Map;for(let C of N)Q.set(C.id,"open");for(let C of G)Q.set(C.id,"open");for(let C of V)Q.set(C.id,"in_progress");for(let C of ae)Q.set(C.id,"resolved");for(let C of X)Q.set(C.id,"deferred");for(let C of B)Q.set(C.id,"closed");ce=new Map;for(let C of N)ce.set(C.id,"blocked-col");for(let C of G)ce.set(C.id,"ready-col");for(let C of V)ce.set(C.id,"in-progress-col");for(let C of ae)ce.set(C.id,"resolved-col");for(let C of B)ce.set(C.id,"closed-col")}ct()}catch{N=[],G=[],V=[],ae=[],X=[],B=[],U=new Map,ct()}}function P(T){U=Co(T)}function _e(T){return Ro(U,T)}function $e(T){return!ee.has(T)}function Ie(T,H){T.preventDefault(),T.stopPropagation(),ee.has(H)?ee.delete(H):ee.add(H),ct()}function fe(T,H){T.preventDefault(),T.stopPropagation(),r(H)}function Te(T,H){T.preventDefault(),T.stopPropagation(),r(H)}function St(T,H){ye||r(H)}function nt(T,H){T.preventDefault(),T.stopPropagation(),cm(H).then(Le=>{Le&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function ft(T,H){ye=H,T.dataTransfer&&(T.dataTransfer.setData("text/plain",H),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function vt(T){T.target.classList.remove("board-card--dragging"),Ot(),setTimeout(()=>{ye=null},0)}function E(T){let H=String(T.target.value||"");!H||H===h||(h=H,u&&u(H),ct())}function se(){return a?a.get():null}function Ce(T){let H=l?l.get():null,Le=H?H.cleanup_failed:null;if(!Le||typeof Le!="object"||Array.isArray(Le))return null;let Fe=Le[T];return!Fe||typeof Fe!="object"||Array.isArray(Fe)?null:Fe}let Pe={onCardClick:St,onCopyId:nt,onDragStart:ft,onDragEnd:vt,onClosedRangeChange:E,rollupFor:_e,isExpanded:$e,onRollupToggle:Ie,onChildClick:fe,onFromChipClick:Te,onOpenDoc:g?(T,H)=>g(H):void 0,cleanupFailureFor:Ce,get policy(){return se()}};function Qe(T,H){ye||(Oe(),r(H))}function st(T,H){T.preventDefault(),T.stopPropagation(),Oe(),r(H)}let ot={...Pe,onCardClick:Qe,onChildClick:st,onFromChipClick:st,onOpenDoc:g?(T,H)=>{Oe(),g(H)}:void 0,get policy(){return se()}};function mt(T){let H=T.target,Le=e.querySelector(".board-filter__labels");H&&Le&&Le.contains(H)||be()}function te(T){T.key==="Escape"&&be()}function K(){oe||(oe=!0,document.addEventListener("mousedown",mt),document.addEventListener("keydown",te),ct())}function be(){oe&&(oe=!1,document.removeEventListener("mousedown",mt),document.removeEventListener("keydown",te),ct())}function pt(T){T.key==="Escape"&&Oe()}function et(){L||(L=!0,document.addEventListener("keydown",pt),ct())}function Oe(){L&&(L=!1,document.removeEventListener("keydown",pt),ct())}let qe={onClose:Oe,onOverlayClick(T){T.target===T.currentTarget&&Oe()}},lt={onSearchInput(T){ne.search=String(T.target.value||""),W()},onPriorityChange(T){ne.priority=String(T.target.value||""),W()},onTypeChange(T){ne.type=String(T.target.value||""),W()},onSortChange(T){let H=String(T.target.value||"");if(!(!ru.has(H)||H===Y)){Y=H;try{window.localStorage.setItem(nu,H)}catch{}W()}},onDeferredToggle(){L?Oe():et()},onLabelMenuToggle(){oe?be():K()},onLabelToggle(T){let H=ne.labels.indexOf(T);H===-1?ne.labels.push(T):ne.labels.splice(H,1),W()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],W())},onNewIssue(){d&&d()}};function _t(){return c`
      <div class="board-view">
        ${tu(ne,lt,{sort_mode:Y,deferred_popup_open:L,deferred_count:j,label_options:ve(),label_menu_open:oe})}
        <div class="board-root">
          ${Gr({title:"Blocked",id:"blocked-col",items:Z(N)},Pe)}
          ${Gr({title:"Ready",id:"ready-col",items:Z(G)},Pe)}
          ${Gr({title:"In progress",id:"in-progress-col",items:Z(V)},Pe)}
          ${Gr({title:"Resolved",id:"resolved-col",items:Z(ae)},Pe)}
          ${Gr({title:"Closed",id:"closed-col",items:Z(B),is_closed:!0,closed_range:h},Pe)}
        </div>
        ${L?eu({items:Z(X),count:j},ot,qe):""}
      </div>
    `}function ct(){rt(_t(),e),Tt()}function Tt(){try{let T=e.querySelector("#deferred-popup");T&&!T.open&&(typeof T.showModal=="function"?T.showModal():T.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Le of H)Array.from(Le.querySelectorAll(".board-card")).forEach((Ae,Xe)=>{Ae.tabIndex=Xe===0?0:-1})}catch{}}async function Jt(T,H){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:H}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Le){n("update-status failed: %o",Le),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Yt(T){switch(T){case"blocked-col":return N;case"ready-col":return G;case"in-progress-col":return V;case"resolved-col":return ae;default:return[]}}function Bt(T,H,Le){if(!o||!i)return;let Fe=Yt(T),Ae=Fe.find(I=>I.id===H);if(!Ae)return;let Xe=Fe.filter(I=>I.id!==H),ut=Le.closest?Le.closest(".board-card"):null,ze=Xe.length;if(ut){let I=ut.getAttribute("data-issue-id");if(I===H)return;let C=Xe.findIndex(ge=>ge.id===I);C>=0&&(ze=C)}let tt=Xe.slice();tt.splice(ze,0,Ae),k.applyReorder(H,tt,ze)}function Ot(){for(let T of Array.from(e.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let ht=null;e.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Le=T.target.closest(".board-column");Le&&Le!==ht&&(ht&&ht.classList.remove("board-column--drag-over"),Le.classList.add("board-column--drag-over"),ht=Le)}),e.addEventListener("dragleave",T=>{let H=T.relatedTarget;(!H||!e.contains(H))&&ht&&(ht.classList.remove("board-column--drag-over"),ht=null)}),e.addEventListener("drop",T=>{T.preventDefault(),ht&&(ht.classList.remove("board-column--drag-over"),ht=null);let H=T.target,Le=H.closest(".board-column");if(!Le)return;let Fe=T.dataTransfer?.getData("text/plain")||"";if(!Fe)return;let Ae=Le.id,Xe=ce.get(Fe);if(Xe&&Xe===Ae){if(am.has(Ae)){if(Y!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Bt(Ae,Fe,H)}return}let ut=im[Ae];if(!ut){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Q.get(Fe)!==ut&&Jt(Fe,ut)}),e.addEventListener("keydown",T=>{let H=T.target;if(!(H instanceof HTMLElement))return;let Le=String(H.tagName||"").toLowerCase();if(Le==="input"||Le==="textarea"||Le==="select"||Le==="button"||Le==="a"||H.isContentEditable===!0)return;let Fe=H.closest(".board-card");if(!Fe)return;let Ae=String(T.key||"");if(Ae==="Enter"||Ae===" "){T.preventDefault();let tt=Fe.getAttribute("data-issue-id");tt&&r(tt);return}if(Ae!=="ArrowUp"&&Ae!=="ArrowDown"&&Ae!=="ArrowLeft"&&Ae!=="ArrowRight")return;T.preventDefault();let Xe=Fe.closest(".board-column");if(!Xe)return;let ut=Array.from(Xe.querySelectorAll(".board-card")),ze=ut.indexOf(Fe);if(Ae==="ArrowDown"&&ze<ut.length-1){We(Fe,ut[ze+1]);return}if(Ae==="ArrowUp"&&ze>0){We(Fe,ut[ze-1]);return}if(Ae==="ArrowLeft"||Ae==="ArrowRight"){let tt=Array.from(e.querySelectorAll(".board-column")),I=tt.indexOf(Xe),C=Ae==="ArrowRight"?1:-1,ge=I+C;for(;ge>=0&&ge<tt.length;){let Ue=tt[ge].querySelector(".board-card");if(Ue){We(Fe,Ue);return}ge+=C}}});function We(T,H){try{T.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let R=null;b&&b.subscribe&&(R=b.subscribe(()=>{try{W()}catch{}}));let J=null;a&&a.subscribe&&(J=a.subscribe(()=>{try{W()}catch{}}));let pe=null;return l&&l.subscribe&&(pe=l.subscribe(()=>{ct()})),{async load(){n("load"),W()},clear(){be(),Oe(),R&&(R(),R=null),J&&(J(),J=null),pe&&(pe(),pe=null),e.replaceChildren(),N=[],G=[],V=[],ae=[],X=[],B=[],Q=new Map,ce=new Map}}}function bs(e,t){return e.filter(n=>{let r=To(n);return!(r&&t.has(r))})}async function cm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Mn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Sr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function hs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function um(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${Sr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,a,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Jn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await um(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var dm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],ou={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},pm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Kt(e){return typeof e=="string"&&e.length>0?e:null}function Kr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ft(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function au(e,t,n){let r=Kt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Kt(n[e]);return s===null?null:{value:s,source:"global"}}function ys(e,t,n,r){return au(e,t,n)||{value:r,source:"base"}}function fa(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let i=Kt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let i of Object.values(s))if(sn(i)){let a=Kt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return Kt(r?.runners?.[o]?.models?.[e]?.id)||e}function fm(e,t){return Kt(t?.review?.reviewers?.[e]?.model)||e}function Vr(e,t,n=!1){if(e==="default")return Ft(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Kr(e):e;return Ft(e,t,r,e,"explicit")}function lu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function _m(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function mm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of _m(t,n)){let o=lu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function _a(e){return Ft(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function iu(e,t,n){let r=au(e,t,n);return r?Vr(r.value,r.source):Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function hn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,i=sn(e.runner_catalog)?e.runner_catalog:null,a=Kt(n.quick_fix_impl_model),l=mm(a,s,i),u={};if(s){let d=ys("workflow_mode",t,n,Kt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ft(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Vr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let B=`${X}_model`,L=Kt(X==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=ys(B,t,n,L);if(j.value===null)u[B]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!sn(s.review?.reviewers?.[j.value]))u[B]=_a(Ft(j.value,j.source,"",null,"explicit"));else{let Y=fm(j.value,s);u[B]=Ft(j.value,j.source,Kr(Y),Y,j.source==="base"?"default":"explicit")}}for(let[X,B]of Object.entries(ou)){let L=u[B].value;if(L==="self"||L==="skip"){u[X]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=Kt(s.review?.reviewers?.[L||""]?.effort),Y=ys(X,t,n,j);u[X]=Y.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(Y.value,Y.source,Y.value,Y.value,Y.source==="base"?"default":"explicit")}let g=sn(s.implementation?.default)?s.implementation.default:{},h=Kt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},N=b&&sn(k[h])?k[h]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=ys(X,t,n,X==="impl_dispatch"?Kt(N.dispatch)||Kt(g.dispatch):Kt(g[X.replace("impl_","")]));u[X]=B.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let G=Kt(t.impl_runtime),V=G==="inherit"?Kt(e.controller_runtime):G,ae=h==="quick_fix"&&Kt(t.impl_dispatch)===null&&l.runtime!==null&&(G===null||V===l.runtime);if(ae){let X=l.runtime,B=a;u.impl_dispatch=Ft("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),G===null&&(u.impl_runtime=Ft(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),Kt(t.impl_model)===null&&(u.impl_model=Ft(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Kt(e.controller_runtime):u.impl_runtime.value,B=X?lu(X,s,i):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=_a(u.impl_model);else{let L=fa(u.impl_model.value,X,s,i);u.impl_model.display=Kr(L),u.impl_model.full_value=L}}if(u.impl_effort.value==="auto"){let X=Kt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=X?Kt(s.implementation?.effort_by_transport?.[X]?.auto):null;B&&!pm.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",u.impl_speed.source))}}else for(let d of dm.filter(g=>!g.startsWith("orchestration_")))u[d]=iu(d,t,n);if(!s){for(let[d,g]of Object.entries(ou))(u[g].value==="self"||u[g].value==="skip")&&(u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=iu(d,t,n);continue}let g=d.replace("orchestration_",""),h=Kt(o[g]),b=ys(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Ft(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Kt(o.model_id)||b.value:fa(b.value,null,s,i);u[d]=Ft(b.value,b.source,Kr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",b.source);continue}u[d]=Vr(b.value,b.source)}if(s)if(a===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ft(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Kr(d)})`,null,"default")}else if(l.runtime!==null){let d=fa(a,l.runtime,s,i);u.quick_fix_impl_model=Ft(a,"global",Kr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=_a(Ft(a,"global","",null,"explicit")):u.quick_fix_impl_model=Vr(a,"global");return u}function gm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Fo(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=g=>{let h={...r,...g};return hn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let a=s(i)[e.key],l=s(o)[e.key],u=Kt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:gm(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(g=>{let h=s({...o,[e.key]:g})[e.key];return{value:g,label:h.display,full_value:h.full_value}})}}function Yr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(a=>{let l=!1,u=g=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(g))},d=()=>u(r.value.trim());o.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),d())}),t.addEventListener("cancel",g=>{g.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ma(e){return`session:${e.provider}:${e.session_id}`}function vs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function bm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:ma(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:vs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:bm(e,n)}}}var ga="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",hm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",cu="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Qr=[...Kn,"reasoning_output_tokens"],ym={codex:["implementation","review-consult"],claude:["subagent"]};function ba(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function vm(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))}function ha(e){let t=0;for(let n of Kn)t+=Xt(e?.[n]);return t}function wm(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function uu(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function km(e){let t={};for(let n of Qr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function du(e){let t={};for(let n of Qr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function pu(e,t){return ba(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):ha(t)}function $m(e){return e==="claude"?"Claude":"Codex"}function xm(e){return`\u03C4 ${_u(e)}`}function Am(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(ba(n)||r>0&&!vm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,hm];return t.replayed&&u.push(ga),u.join(`
`)}let s=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${cu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${cu}`:o,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ga),l.join(`
`)}function cn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${$m(n)} ${xm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Am(n,r)})}return t}function Bo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=Xt(a.total_only_subtotal)+Xt(i.total_only_subtotal));for(let l of Qr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=Xt(a.breakdown[l])+Xt(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ya(e){return!e||typeof e!="object"?null:Tn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Sm(e){return e==="codex"?"codex":"claude"}function Gn(){return{subtotal:0,breakdown:km(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function jo(e,t,n){e.subtotal+=t.subtotal,ba(t.usage)&&(e.total_only+=t.subtotal);for(let r of Qr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function fu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function _u(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return wm(e)?`\u03C4 ${_u(ha(e))}`:null}function er(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ws(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ha(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ga),n.join(`
`)}function Tn(e,t){let n={claude:Gn(),codex:Gn()},r={orchestrator:{claude:Gn(),codex:Gn()},implementation:{claude:Gn(),codex:Gn()},"review-consult":{claude:Gn(),codex:Gn()},subagent:{claude:Gn(),codex:Gn()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(uu(l)){let d=Sm(a.runner),g=du(l),h={provider:d,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:g,subtotal:pu(d,g)};g.replayed===!0&&(h.replayed=!0),typeof a.model=="string"&&(h.model=a.model),typeof a.session_id=="string"&&(h.session_id=a.session_id),jo(n[d],h,!0),jo(r.orchestrator[d],h,!0)}let u=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let d of u){let g=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!ym[g].includes(d.role)||!uu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=du(d.usage),k={provider:g,role:d.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:pu(g,b)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),jo(n[g],k,!1),jo(r[k.role][g],k,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let u=fu(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[a]=u}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[a][u];d.legs.length>0&&(l[u]={...fu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}var{entries:$u,setPrototypeOf:mu,isFrozen:Em,getPrototypeOf:Tm,getOwnPropertyDescriptor:Cm}=Object,{freeze:pn,seal:Cn,create:Sa}=Object,{apply:Ea,construct:Ta}=typeof Reflect<"u"&&Reflect;pn||(pn=function(t){return t});Cn||(Cn=function(t){return t});Ea||(Ea=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ta||(Ta=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Uo=fn(Array.prototype.forEach),Rm=fn(Array.prototype.lastIndexOf),gu=fn(Array.prototype.pop),ks=fn(Array.prototype.push),Om=fn(Array.prototype.splice),zo=fn(String.prototype.toLowerCase),va=fn(String.prototype.toString),wa=fn(String.prototype.match),$s=fn(String.prototype.replace),Lm=fn(String.prototype.indexOf),Im=fn(String.prototype.trim),Dn=fn(Object.prototype.hasOwnProperty),dn=fn(RegExp.prototype.test),xs=Pm(TypeError);function fn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ea(e,t,r)}}function Pm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ta(e,n)}}function bt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zo;mu&&mu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Em(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Mm(e){for(let t=0;t<e.length;t++)Dn(e,t)||(e[t]=null);return e}function tr(e){let t=Sa(null);for(let[n,r]of $u(e))Dn(e,n)&&(Array.isArray(r)?t[n]=Mm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=tr(r):t[n]=r);return t}function As(e,t){for(;e!==null;){let r=Cm(e,t);if(r){if(r.get)return fn(r.get);if(typeof r.value=="function")return fn(r.value)}e=Tm(e)}function n(){return null}return n}var bu=pn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ka=pn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),$a=pn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Dm=pn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xa=pn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Nm=pn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hu=pn(["#text"]),yu=pn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Aa=pn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vu=pn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wo=pn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qm=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fm=Cn(/<%[\w\W]*|[\w\W]*%>/gm),jm=Cn(/\$\{[\w\W]*/gm),Bm=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Um=Cn(/^aria-[\-\w]+$/),xu=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wm=Cn(/^(?:\w+script|data):/i),zm=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Au=Cn(/^html$/i),Hm=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),wu=Object.freeze({__proto__:null,ARIA_ATTR:Um,ATTR_WHITESPACE:zm,CUSTOM_ELEMENT:Hm,DATA_ATTR:Bm,DOCTYPE_NAME:Au,ERB_EXPR:Fm,IS_ALLOWED_URI:xu,IS_SCRIPT_OR_DATA:Wm,MUSTACHE_EXPR:qm,TMPLIT_EXPR:jm}),Ss={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Gm=function(){return typeof window>"u"?null:window},Km=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ku=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Su(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gm(),t=Re=>Su(Re);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ss.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:b}=e,k=l.prototype,N=As(k,"cloneNode"),G=As(k,"remove"),V=As(k,"nextSibling"),ae=As(k,"childNodes"),X=As(k,"parentNode");if(typeof i=="function"){let Re=n.createElement("template");Re.content&&Re.content.ownerDocument&&(n=Re.content.ownerDocument)}let B,L="",{implementation:j,createNodeIterator:Y,createDocumentFragment:Q,getElementsByTagName:ce}=n,{importNode:U}=r,ee=ku();t.isSupported=typeof $u=="function"&&typeof X=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ne,ERB_EXPR:oe,TMPLIT_EXPR:ye,DATA_ATTR:Ne,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:Z,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Ee}=wu,{IS_ALLOWED_URI:W}=wu,P=null,_e=bt({},[...bu,...ka,...$a,...xa,...hu]),$e=null,Ie=bt({},[...yu,...Aa,...vu,...Wo]),fe=Object.seal(Sa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Te=null,St=null,nt=Object.seal(Sa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ft=!0,vt=!0,E=!1,se=!0,Ce=!1,Pe=!0,Qe=!1,st=!1,ot=!1,mt=!1,te=!1,K=!1,be=!0,pt=!1,et="user-content-",Oe=!0,qe=!1,lt={},_t=null,ct=bt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Tt=null,Jt=bt({},["audio","video","img","source","image","track"]),Yt=null,Bt=bt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ot="http://www.w3.org/1998/Math/MathML",ht="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",R=We,J=!1,pe=null,T=bt({},[Ot,ht,We],va),H=bt({},["mi","mo","mn","ms","mtext"]),Le=bt({},["annotation-xml"]),Fe=bt({},["title","style","font","a","script"]),Ae=null,Xe=["application/xhtml+xml","text/html"],ut="text/html",ze=null,tt=null,I=n.createElement("form"),C=function(S){return S instanceof RegExp||S instanceof Function},ge=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(tt&&tt===S)){if((!S||typeof S!="object")&&(S={}),S=tr(S),Ae=Xe.indexOf(S.PARSER_MEDIA_TYPE)===-1?ut:S.PARSER_MEDIA_TYPE,ze=Ae==="application/xhtml+xml"?va:zo,P=Dn(S,"ALLOWED_TAGS")?bt({},S.ALLOWED_TAGS,ze):_e,$e=Dn(S,"ALLOWED_ATTR")?bt({},S.ALLOWED_ATTR,ze):Ie,pe=Dn(S,"ALLOWED_NAMESPACES")?bt({},S.ALLOWED_NAMESPACES,va):T,Yt=Dn(S,"ADD_URI_SAFE_ATTR")?bt(tr(Bt),S.ADD_URI_SAFE_ATTR,ze):Bt,Tt=Dn(S,"ADD_DATA_URI_TAGS")?bt(tr(Jt),S.ADD_DATA_URI_TAGS,ze):Jt,_t=Dn(S,"FORBID_CONTENTS")?bt({},S.FORBID_CONTENTS,ze):ct,Te=Dn(S,"FORBID_TAGS")?bt({},S.FORBID_TAGS,ze):tr({}),St=Dn(S,"FORBID_ATTR")?bt({},S.FORBID_ATTR,ze):tr({}),lt=Dn(S,"USE_PROFILES")?S.USE_PROFILES:!1,ft=S.ALLOW_ARIA_ATTR!==!1,vt=S.ALLOW_DATA_ATTR!==!1,E=S.ALLOW_UNKNOWN_PROTOCOLS||!1,se=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=S.SAFE_FOR_TEMPLATES||!1,Pe=S.SAFE_FOR_XML!==!1,Qe=S.WHOLE_DOCUMENT||!1,mt=S.RETURN_DOM||!1,te=S.RETURN_DOM_FRAGMENT||!1,K=S.RETURN_TRUSTED_TYPE||!1,ot=S.FORCE_BODY||!1,be=S.SANITIZE_DOM!==!1,pt=S.SANITIZE_NAMED_PROPS||!1,Oe=S.KEEP_CONTENT!==!1,qe=S.IN_PLACE||!1,W=S.ALLOWED_URI_REGEXP||xu,R=S.NAMESPACE||We,H=S.MATHML_TEXT_INTEGRATION_POINTS||H,Le=S.HTML_INTEGRATION_POINTS||Le,fe=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&C(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&C(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(fe.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(vt=!1),te&&(mt=!0),lt&&(P=bt({},hu),$e=[],lt.html===!0&&(bt(P,bu),bt($e,yu)),lt.svg===!0&&(bt(P,ka),bt($e,Aa),bt($e,Wo)),lt.svgFilters===!0&&(bt(P,$a),bt($e,Aa),bt($e,Wo)),lt.mathMl===!0&&(bt(P,xa),bt($e,vu),bt($e,Wo))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?nt.tagCheck=S.ADD_TAGS:(P===_e&&(P=tr(P)),bt(P,S.ADD_TAGS,ze))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?nt.attributeCheck=S.ADD_ATTR:($e===Ie&&($e=tr($e)),bt($e,S.ADD_ATTR,ze))),S.ADD_URI_SAFE_ATTR&&bt(Yt,S.ADD_URI_SAFE_ATTR,ze),S.FORBID_CONTENTS&&(_t===ct&&(_t=tr(_t)),bt(_t,S.FORBID_CONTENTS,ze)),Oe&&(P["#text"]=!0),Qe&&bt(P,["html","head","body"]),P.table&&(bt(P,["tbody"]),delete Te.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw xs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw xs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=S.TRUSTED_TYPES_POLICY,L=B.createHTML("")}else B===void 0&&(B=Km(b,s)),B!==null&&typeof L=="string"&&(L=B.createHTML(""));pn&&pn(S),tt=S}},Ue=bt({},[...ka,...$a,...Dm]),we=bt({},[...xa,...Nm]),Ye=function(S){let me=X(S);(!me||!me.tagName)&&(me={namespaceURI:R,tagName:"template"});let Se=zo(S.tagName),yt=zo(me.tagName);return pe[S.namespaceURI]?S.namespaceURI===ht?me.namespaceURI===We?Se==="svg":me.namespaceURI===Ot?Se==="svg"&&(yt==="annotation-xml"||H[yt]):!!Ue[Se]:S.namespaceURI===Ot?me.namespaceURI===We?Se==="math":me.namespaceURI===ht?Se==="math"&&Le[yt]:!!we[Se]:S.namespaceURI===We?me.namespaceURI===ht&&!Le[yt]||me.namespaceURI===Ot&&!H[yt]?!1:!we[Se]&&(Fe[Se]||!Ue[Se]):!!(Ae==="application/xhtml+xml"&&pe[S.namespaceURI]):!1},kt=function(S){ks(t.removed,{element:S});try{X(S).removeChild(S)}catch{G(S)}},$t=function(S,me){try{ks(t.removed,{attribute:me.getAttributeNode(S),from:me})}catch{ks(t.removed,{attribute:null,from:me})}if(me.removeAttribute(S),S==="is")if(mt||te)try{kt(me)}catch{}else try{me.setAttribute(S,"")}catch{}},At=function(S){let me=null,Se=null;if(ot)S="<remove></remove>"+S;else{let Ct=wa(S,/^[\r\n\t ]+/);Se=Ct&&Ct[0]}Ae==="application/xhtml+xml"&&R===We&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let yt=B?B.createHTML(S):S;if(R===We)try{me=new h().parseFromString(yt,Ae)}catch{}if(!me||!me.documentElement){me=j.createDocument(R,"template",null);try{me.documentElement.innerHTML=J?L:yt}catch{}}let Dt=me.body||me.documentElement;return S&&Se&&Dt.insertBefore(n.createTextNode(Se),Dt.childNodes[0]||null),R===We?ce.call(me,Qe?"html":"body")[0]:Qe?me.documentElement:Dt},Lt=function(S){return Y.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},It=function(S){return S instanceof g&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},vn=function(S){return typeof a=="function"&&S instanceof a};function Me(Re,S,me){Uo(Re,Se=>{Se.call(t,S,me,tt)})}let en=function(S){let me=null;if(Me(ee.beforeSanitizeElements,S,null),It(S))return kt(S),!0;let Se=ze(S.nodeName);if(Me(ee.uponSanitizeElement,S,{tagName:Se,allowedTags:P}),Pe&&S.hasChildNodes()&&!vn(S.firstElementChild)&&dn(/<[/\w!]/g,S.innerHTML)&&dn(/<[/\w!]/g,S.textContent)||S.nodeType===Ss.progressingInstruction||Pe&&S.nodeType===Ss.comment&&dn(/<[/\w]/g,S.data))return kt(S),!0;if(!(nt.tagCheck instanceof Function&&nt.tagCheck(Se))&&(!P[Se]||Te[Se])){if(!Te[Se]&&on(Se)&&(fe.tagNameCheck instanceof RegExp&&dn(fe.tagNameCheck,Se)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Se)))return!1;if(Oe&&!_t[Se]){let yt=X(S)||S.parentNode,Dt=ae(S)||S.childNodes;if(Dt&&yt){let Ct=Dt.length;for(let Ut=Ct-1;Ut>=0;--Ut){let Vt=N(Dt[Ut],!0);Vt.__removalCount=(S.__removalCount||0)+1,yt.insertBefore(Vt,V(S))}}}return kt(S),!0}return S instanceof l&&!Ye(S)||(Se==="noscript"||Se==="noembed"||Se==="noframes")&&dn(/<\/no(script|embed|frames)/i,S.innerHTML)?(kt(S),!0):(Ce&&S.nodeType===Ss.text&&(me=S.textContent,Uo([ne,oe,ye],yt=>{me=$s(me,yt," ")}),S.textContent!==me&&(ks(t.removed,{element:S.cloneNode()}),S.textContent=me)),Me(ee.afterSanitizeElements,S,null),!1)},tn=function(S,me,Se){if(be&&(me==="id"||me==="name")&&(Se in n||Se in I))return!1;if(!(vt&&!St[me]&&dn(Ne,me))){if(!(ft&&dn(he,me))){if(!(nt.attributeCheck instanceof Function&&nt.attributeCheck(me,S))){if(!$e[me]||St[me]){if(!(on(S)&&(fe.tagNameCheck instanceof RegExp&&dn(fe.tagNameCheck,S)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(S))&&(fe.attributeNameCheck instanceof RegExp&&dn(fe.attributeNameCheck,me)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(me,S))||me==="is"&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&dn(fe.tagNameCheck,Se)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Se))))return!1}else if(!Yt[me]){if(!dn(W,$s(Se,ve,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&S!=="script"&&Lm(Se,"data:")===0&&Tt[S])){if(!(E&&!dn(Z,$s(Se,ve,"")))){if(Se)return!1}}}}}}}return!0},on=function(S){return S!=="annotation-xml"&&wa(S,Ee)},it=function(S){Me(ee.beforeSanitizeAttributes,S,null);let{attributes:me}=S;if(!me||It(S))return;let Se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},yt=me.length;for(;yt--;){let Dt=me[yt],{name:Ct,namespaceURI:Ut,value:Vt}=Dt,rn=ze(Ct),wn=Vt,Pt=Ct==="value"?wn:Im(wn);if(Se.attrName=rn,Se.attrValue=Pt,Se.keepAttr=!0,Se.forceKeepAttr=void 0,Me(ee.uponSanitizeAttribute,S,Se),Pt=Se.attrValue,pt&&(rn==="id"||rn==="name")&&($t(Ct,S),Pt=et+Pt),Pe&&dn(/((--!?|])>)|<\/(style|title|textarea)/i,Pt)){$t(Ct,S);continue}if(rn==="attributename"&&wa(Pt,"href")){$t(Ct,S);continue}if(Se.forceKeepAttr)continue;if(!Se.keepAttr){$t(Ct,S);continue}if(!se&&dn(/\/>/i,Pt)){$t(Ct,S);continue}Ce&&Uo([ne,oe,ye],Rn=>{Pt=$s(Pt,Rn," ")});let An=ze(S.nodeName);if(!tn(An,rn,Pt)){$t(Ct,S);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Ut)switch(b.getAttributeType(An,rn)){case"TrustedHTML":{Pt=B.createHTML(Pt);break}case"TrustedScriptURL":{Pt=B.createScriptURL(Pt);break}}if(Pt!==wn)try{Ut?S.setAttributeNS(Ut,Ct,Pt):S.setAttribute(Ct,Pt),It(S)?kt(S):gu(t.removed)}catch{$t(Ct,S)}}Me(ee.afterSanitizeAttributes,S,null)},nn=function Re(S){let me=null,Se=Lt(S);for(Me(ee.beforeSanitizeShadowDOM,S,null);me=Se.nextNode();)Me(ee.uponSanitizeShadowNode,me,null),en(me),it(me),me.content instanceof o&&Re(me.content);Me(ee.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Re){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,Se=null,yt=null,Dt=null;if(J=!Re,J&&(Re="<!-->"),typeof Re!="string"&&!vn(Re))if(typeof Re.toString=="function"){if(Re=Re.toString(),typeof Re!="string")throw xs("dirty is not a string, aborting")}else throw xs("toString is not a function");if(!t.isSupported)return Re;if(st||ge(S),t.removed=[],typeof Re=="string"&&(qe=!1),qe){if(Re.nodeName){let Vt=ze(Re.nodeName);if(!P[Vt]||Te[Vt])throw xs("root node is forbidden and cannot be sanitized in-place")}}else if(Re instanceof a)me=At("<!---->"),Se=me.ownerDocument.importNode(Re,!0),Se.nodeType===Ss.element&&Se.nodeName==="BODY"||Se.nodeName==="HTML"?me=Se:me.appendChild(Se);else{if(!mt&&!Ce&&!Qe&&Re.indexOf("<")===-1)return B&&K?B.createHTML(Re):Re;if(me=At(Re),!me)return mt?null:K?L:""}me&&ot&&kt(me.firstChild);let Ct=Lt(qe?Re:me);for(;yt=Ct.nextNode();)en(yt),it(yt),yt.content instanceof o&&nn(yt.content);if(qe)return Re;if(mt){if(te)for(Dt=Q.call(me.ownerDocument);me.firstChild;)Dt.appendChild(me.firstChild);else Dt=me;return($e.shadowroot||$e.shadowrootmode)&&(Dt=U.call(r,Dt,!0)),Dt}let Ut=Qe?me.outerHTML:me.innerHTML;return Qe&&P["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&dn(Au,me.ownerDocument.doctype.name)&&(Ut="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+Ut),Ce&&Uo([ne,oe,ye],Vt=>{Ut=$s(Ut,Vt," ")}),B&&K?B.createHTML(Ut):Ut},t.setConfig=function(){let Re=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ge(Re),st=!0},t.clearConfig=function(){tt=null,st=!1},t.isValidAttribute=function(Re,S,me){tt||ge({});let Se=ze(Re),yt=ze(S);return tn(Se,yt,me)},t.addHook=function(Re,S){typeof S=="function"&&ks(ee[Re],S)},t.removeHook=function(Re,S){if(S!==void 0){let me=Rm(ee[Re],S);return me===-1?void 0:Om(ee[Re],me,1)[0]}return gu(ee[Re])},t.removeHooks=function(Re){ee[Re]=[]},t.removeAllHooks=function(){ee=ku()},t}var Eu=Su();var nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ho=e=>(...t)=>({_$litDirective$:e,values:t}),Jr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Es=class extends Jr{constructor(t){if(super(t),this.it=Gt,t.type!==nr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Gt||t==null)return this._t=void 0,this.it=t;if(t===En)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Es.directiveName="unsafeHTML",Es.resultType=1;var Tu=Ho(Es);function La(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=La();function Mu(e){Tr=e}var Os={exec:()=>null};function xt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(_n.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var Vm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ym=/^(?:[ \t]*(?:\n|$))+/,Zm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ls=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Xm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ia=/(?:[*+-]|\d{1,9}[.)])/,Du=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Nu=xt(Du).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jm=xt(Du).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,eg=/^[^\n]+/,Ma=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tg=xt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ma).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ng=xt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ia).getRegex(),Qo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Da=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,rg=xt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Da).replace("tag",Qo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),qu=xt(Pa).replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),sg=xt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",qu).getRegex(),Na={blockquote:sg,code:Zm,def:tg,fences:Qm,heading:Xm,hr:Ls,html:rg,lheading:Nu,list:ng,newline:Ym,paragraph:qu,table:Os,text:eg},Cu=xt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),og={...Na,lheading:Jm,table:Cu,paragraph:xt(Pa).replace("hr",Ls).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Cu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex()},ig={...Na,html:xt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Da).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Os,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:xt(Pa).replace("hr",Ls).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Nu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ag=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,lg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fu=/^( {2,}|\\)\n(?!\s*$)/,cg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xo=/[\p{P}\p{S}]/u,qa=/[\s\p{P}\p{S}]/u,ju=/[^\s\p{P}\p{S}]/u,ug=xt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,qa).getRegex(),Bu=/(?!~)[\p{P}\p{S}]/u,dg=/(?!~)[\s\p{P}\p{S}]/u,pg=/(?:[^\s\p{P}\p{S}]|~)/u,fg=xt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Vm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Uu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,_g=xt(Uu,"u").replace(/punct/g,Xo).getRegex(),mg=xt(Uu,"u").replace(/punct/g,Bu).getRegex(),Wu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gg=xt(Wu,"gu").replace(/notPunctSpace/g,ju).replace(/punctSpace/g,qa).replace(/punct/g,Xo).getRegex(),bg=xt(Wu,"gu").replace(/notPunctSpace/g,pg).replace(/punctSpace/g,dg).replace(/punct/g,Bu).getRegex(),hg=xt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ju).replace(/punctSpace/g,qa).replace(/punct/g,Xo).getRegex(),yg=xt(/\\(punct)/,"gu").replace(/punct/g,Xo).getRegex(),vg=xt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wg=xt(Da).replace("(?:-->|$)","-->").getRegex(),kg=xt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,$g=xt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zu=xt(/^!?\[(label)\]\[(ref)\]/).replace("label",Vo).replace("ref",Ma).getRegex(),Hu=xt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ma).getRegex(),xg=xt("reflink|nolink(?!\\()","g").replace("reflink",zu).replace("nolink",Hu).getRegex(),Ru=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Fa={_backpedal:Os,anyPunctuation:yg,autolink:vg,blockSkip:fg,br:Fu,code:lg,del:Os,emStrongLDelim:_g,emStrongRDelimAst:gg,emStrongRDelimUnd:hg,escape:ag,link:$g,nolink:Hu,punctuation:ug,reflink:zu,reflinkSearch:xg,tag:kg,text:cg,url:Os},Ag={...Fa,link:xt(/^!?\[(label)\]\((.*?)\)/).replace("label",Vo).getRegex(),reflink:xt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vo).getRegex()},Ca={...Fa,emStrongRDelimAst:bg,emStrongLDelim:mg,url:xt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ru).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:xt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ru).getRegex()},Sg={...Ca,br:xt(Fu).replace("{2,}","*").getRegex(),text:xt(Ca.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Go={normal:Na,gfm:og,pedantic:ig},Ts={normal:Fa,gfm:Ca,breaks:Sg,pedantic:Ag},Eg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ou=e=>Eg[e];function rr(e,t){if(t){if(_n.escapeTest.test(e))return e.replace(_n.escapeReplace,Ou)}else if(_n.escapeTestNoEncode.test(e))return e.replace(_n.escapeReplaceNoEncode,Ou);return e}function Lu(e){try{e=encodeURI(e).replace(_n.percentDecode,"%")}catch{return null}return e}function Iu(e,t){let n=e.replace(_n.findPipe,(o,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(_n.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(_n.slashPipe,"|");return r}function Cs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Tg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Pu(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function Cg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yo=class{constructor(e){Mt(this,"options");Mt(this,"rules");Mt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Cs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Cg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Cs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Cs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Cs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=g,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),N=this.blockquote(k);o[o.length-1]=N,r=r.substring(0,r.length-b.raw.length)+N.raw,s=s.substring(0,s.length-b.text.length)+N.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),N=this.list(k);o[o.length-1]=N,r=r.substring(0,r.length-h.raw.length)+N.raw,s=s.substring(0,s.length-b.raw.length)+N.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),h=e.split(`
`,1)[0],b=!g.trim(),k=0;if(this.options.pedantic?(k=2,d=g.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=g.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let N=this.rules.other.nextBulletRegex(k),G=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),ae=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],L;if(h=B,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||ae.test(h)||X.test(h)||N.test(h)||G.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+L.slice(k);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(g)||ae.test(g)||G.test(g))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=B+`
`,e=e.substring(B.length+1),g=L.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Iu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Iu(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Cs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Tg(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Pu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Pu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let d=[...r[0]][0].length,g=e.slice(0,s+r.index+d+i);if(Math.min(s,i)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class Ra{constructor(t){Mt(this,"tokens");Mt(this,"options");Mt(this,"state");Mt(this,"inlineQueue");Mt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_n,block:Go.normal,inline:Ts.normal};this.options.pedantic?(n.block=Go.pedantic,n.inline=Ts.pedantic):this.options.gfm&&(n.block=Go.gfm,this.options.breaks?n.inline=Ts.breaks:n.inline=Ts.gfm),this.tokenizer.rules=n}static get rules(){return{block:Go,inline:Ts}}static lex(t,n){return new Ra(n).lex(t)}static lexInline(t,n){return new Ra(n).inlineTokens(t)}lex(t){t=t.replace(_n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_n.tabCharGlobal,"    ").replace(_n.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},g),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Zo=class{constructor(e){Mt(this,"options");Mt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_n.notSpaceStart)?.[0],s=e.replace(_n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+rr(r)+'">'+(n?s:rr(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:rr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let a=e.items[i];r+=this.listitem(a)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let i=0;i<o.length;i++)n+=this.tablecell(o[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Lu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Lu(e);if(s===null)return rr(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},ja=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qn=class Oa{constructor(t){Mt(this,"options");Mt(this,"renderer");Mt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Zo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ja}static parse(t,n){return new Oa(n).parse(t)}static parseInline(t,n){return new Oa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},Ko,Rs=(Ko=class{constructor(e){Mt(this,"options");Mt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?qn.parse:qn.parseInline}},Mt(Ko,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Mt(Ko,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ko),Rg=class{constructor(...e){Mt(this,"defaults",La());Mt(this,"options",this.setOptions);Mt(this,"parse",this.parseMarkdown(!0));Mt(this,"parseInline",this.parseMarkdown(!1));Mt(this,"Parser",qn);Mt(this,"Renderer",Zo);Mt(this,"TextRenderer",ja);Mt(this,"Lexer",Nn);Mt(this,"Tokenizer",Yo);Mt(this,"Hooks",Rs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Zo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Yo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...u)=>{let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Rs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];Rs.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&Rs.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await a.call(s,u);return l.call(s,g)})();let d=a.call(s,u);return l.call(s,d)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await a.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let d=a.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return qn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qn.parse:qn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?qn.parse:qn.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+rr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new Rg;function Et(e,t){return Er.parse(e,t)}Et.options=Et.setOptions=function(e){return Er.setOptions(e),Et.defaults=Er.defaults,Mu(Et.defaults),Et};Et.getDefaults=La;Et.defaults=Tr;Et.use=function(...e){return Er.use(...e),Et.defaults=Er.defaults,Mu(Et.defaults),Et};Et.walkTokens=function(e,t){return Er.walkTokens(e,t)};Et.parseInline=Er.parseInline;Et.Parser=qn;Et.parser=qn.parse;Et.Renderer=Zo;Et.TextRenderer=ja;Et.Lexer=Nn;Et.lexer=Nn.lex;Et.Tokenizer=Yo;Et.Hooks=Rs;Et.parse=Et;var wk=Et.options,kk=Et.setOptions,$k=Et.use,xk=Et.walkTokens,Ak=Et.parseInline;var Sk=qn.parse,Ek=Nn.lex;function ur(e){let t=Et.parse(e),n=Eu.sanitize(t);return Tu(n)}function sr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function es(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ku={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Og={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Lg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ig=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Ba(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ua(e,t){let n=Ba(e),r=Ba(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function Vu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Fn(s)&&typeof s.text=="string"?s.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Pg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ku[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ba(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Ua(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=Ua(Fn(a)?a.old_string:"",Fn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Wa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Mg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Yu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Mg,"").trim();return n.length>0?{kind:"user",text:n}:null}function za(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Lg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ig.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Dg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Ng(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(Fn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(za(i.text));else if(i.type==="thinking"){let a=Wa(i.thinking);a&&o.push(a)}else if(i.type==="tool_use"){let a=Pg(i);typeof i.id=="string"&&t.set(i.id,a),o.push(a)}}return n?Gu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(Fn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=Vu(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let o=Yu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Gu([s],n):[s]}return[]}function Gu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function qg(e){let t=typeof e.command=="string"?e.command:"",n=Vu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ku.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Fg(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[za(t.text)];if(t.type==="user_message"){let n=Yu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Wa(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[qg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function jg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[za(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=Wa(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Og[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Bg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ug(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Zu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Ug(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Dg(o,r);let i=o.schema==="codex-delegation-monitor-v1"?jg(o):Bg(o)?Fg(o):Ng(o,n);return i.length>0&&(r.progress=null),i}}}function Ha(e){let t=[],n=Zu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Wg=5,zg=10,Hg=/Task\s+#(\d+)/,Gg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Kg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Vg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Yg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Zg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Hg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Qg(e){if(e.tool==="Bash"){let t=e.command||"";return Gg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Kg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Xg(e){let t=e.filter(s=>s.kind==="tool").slice(-zg),n=new Map;t.forEach((s,o)=>{let i=Qg(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Jg(e){let t=Yg(e);if(t)return{text:t,guess:!1};let n=Zg(e);if(n)return{text:n,guess:!1};let r=Xg(e);return r?{text:r,guess:!0}:null}function eb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:bn(e,t)}function ts(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,a=null,l=null,u=null,d=!1,g={},h=!0,b=new Set,k=new Set,N=null,G=null,V=!1,ae=!1,X=!1,B=null,L=null;function j(){V=!1,ae=!1,X=!1,B=null,L=null}async function Y(te){if(n){ae=!0,X=!1,Te();try{let K=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(o!==te)return;!K||typeof K!="object"||Array.isArray(K)?X=!0:(B=K,L=te)}catch{o===te&&(X=!0)}finally{o===te&&(ae=!1,Te())}}}function Q(){if(V=!V,V&&o&&L!==o){Y(o);return}Te()}function ce(){if(!V)return"";let te=es({loading:ae,error:X});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let K=Jo(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${K?c`<div class="prompt-block__meta">${K} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function U(){if(!l||!r)return[];let te=r.get(l);return Ha(te?te.lines:[])}function ee(){if(!l||!r)return null;let te=r.get(l),K=te?te.last_event_at:null;return typeof K=="number"?K:null}function ne(){return g.status==="running"}function oe(){if(ne()&&o){G||(G=setInterval(()=>Te(),1e3));return}ye()}function ye(){G&&(clearInterval(G),G=null)}function Ne(te){let K=[],be=0;for(;be<te.length;){let{idx:pt,line:et}=te[be];if(et.kind==="tool"){let Oe=be;for(;Oe<te.length&&te[Oe].line.kind==="tool"&&te[Oe].line.tool===et.tool;)Oe+=1;if(Oe-be>=Wg&&!k.has(pt)){K.push({kind:"group",idx:pt,tool:et.tool||"",lines:te.slice(be,Oe)}),be=Oe;continue}}K.push({kind:"line",idx:pt,line:et}),be+=1}return K}function he(te){let K=[],be=new Map;for(let Oe=0;Oe<te.length;Oe+=1){let qe=te[Oe],lt=qe.parent_tool_use_id;if(typeof lt=="string"&&lt.length>0){let _t=be.get(lt);_t||(_t={kind:"subagent",idx:Oe,launch_id:lt,agent_type:null,header:null,lines:[]},be.set(lt,_t),K.push(_t)),_t.lines.push({idx:Oe,line:qe});continue}if(qe.kind==="tool"&&qe.tool==="Agent"&&typeof qe.launch_id=="string"&&qe.launch_id.length>0){let _t=Z(qe),ct=be.get(qe.launch_id);if(ct){ct.header={idx:Oe,line:qe},ct.agent_type=_t;continue}let Tt={kind:"subagent",idx:Oe,launch_id:qe.launch_id,agent_type:_t,header:{idx:Oe,line:qe},lines:[]};be.set(qe.launch_id,Tt),K.push(Tt);continue}K.push({kind:"entry",idx:Oe,line:qe})}let pt=[],et=0;for(;et<K.length;){if(K[et].kind!=="entry"){pt.push(K[et]),et+=1;continue}let Oe=et;for(;Oe<K.length&&K[Oe].kind==="entry";)Oe+=1;pt.push(...Ne(K.slice(et,Oe))),et=Oe}return pt}function Z(te){let K=te.input;return K&&typeof K.subagent_type=="string"?K.subagent_type:null}function ve(te){for(let K=te.length-1;K>=0;K-=1){let be=te[K];if(be.kind==="result"||be.kind==="error")return null;if(be.kind==="tool"&&!Object.hasOwn(be,"result"))return be}return null}function Ee(te){for(let K=te.length-1;K>=0;K-=1)if(te[K].kind==="thinking")return te[K];return null}function W(te,K){if(K.kind==="gate")return c`<div class="sv__gate">${K.text}</div>`;if(K.kind==="phase")return c`<div class="sv__phase">${K.text}</div>`;if(K.kind==="result")return c`<div
        class="sv__result${K.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${K.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ur(K.text||(K.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(K.kind==="thinking"){let be=b.has(te);return c`<div
        class="sv__think${be?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>nt(te)}
      >
        <span class="sv__think-line">💭 ${Is(K.text)}</span>
        ${be?c`<pre class="sv__think-expand">${K.text}</pre>`:""}
      </div>`}if(K.kind==="user"){let be=b.has(te);return c`<div
        class="sv__line sv__line--user${be?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>nt(te)}
      >
        <span class="sv__user-line">▷ ${Is(K.text)}</span>
        ${be?c`<pre class="sv__user-expand">${K.text}</pre>`:""}
      </div>`}if(K.kind==="error")return c`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="blocker")return c`<div class="sv__error">⛔ ${K.text}</div>`;if(K.kind==="tool"){let be=b.has(te),pt=K.tool==="Bash"?Vg(K.command):0,et=K.tool==="Bash"?pt>1?Is(K.command):K.command:K.path||K.command||"";return c`<div
        class="sv__tool${be?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>nt(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${K.icon}</span>
          <span class="sv__tool-name">${K.tool}</span>
          ${et?c`<span class="sv__tool-detail">${et}</span>`:""}
          ${pt>1?c`<span class="sv__tool-more">⋯ ${pt}줄</span>`:""}
          ${typeof K.added=="number"?c`<span class="sv__diff-add">+${K.added}</span>`:""}
          ${typeof K.removed=="number"?c`<span class="sv__diff-del">−${K.removed}</span>`:""}
          ${K.result?c`<span class="sv__tool-ok">→ ${K.result}</span>`:""}
        </span>
        ${be?c`<pre class="sv__tool-expand">${P(K)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ur(K.text||"")}</div>`}function P(te){let K=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)K.push(te.command);else if(te.input!==void 0)try{K.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&K.push(`output:
${te.output}`),K.join(`

`)}function _e(){if(!o)return c``;let te=U(),K=(i?[g.agent_type,g.model,g.effort]:[g.runner,g.model,g.effort]).filter(Boolean).join(" \xB7 "),be=g.session_id||"",pt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,et=ne(),Oe=et?eb(ee(),Date.now()):"",qe=et?ve(te):null,lt=et?Ee(te):null,_t=Jg(te);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${g.label||(i?g.role||"":o)}</span
        >
        ${_t?c`<span
              class="sv__stage${_t.guess?" sv__stage--guess":""}"
              title=${_t.text}
              >${_t.text}</span
            >`:""}
        ${et?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Oe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Oe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Oe?c`<span class="sv__live-ago">${Oe}</span>`:""}</span
            >`:""}
        ${be?c`<button
              type="button"
              class="sv__session"
              title=${be}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${be}`}
              @click=${()=>vt(be)}
            >
              ⧉ ${be.slice(0,8)}
            </button>`:""}
        ${g.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${g.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${g.resume_command}`}
              @click=${()=>vt(g.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${K?c`<span class="sv__meta">${K}</span>`:""}
        ${g.worktree?c`<span class="sv__wt" title=${g.worktree}
              >${g.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
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
          aria-label=${pt}
          @click=${ft}
        >
          <span class="sv__follow-full">⇣ ${pt}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>mt()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":ce()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:he(te).map(ct=>ct.kind==="subagent"?Ie(ct):ct.kind==="group"?$e(ct):W(ct.idx,ct.line))}
      </div>
      ${qe||lt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${qe?c`<span class="sv__now-icon">${qe.icon}</span>
                  <span class="sv__now-name">${qe.tool}</span>
                  <span class="sv__now-detail"
                    >${qe.tool==="Bash"?Is(qe.command):qe.path||qe.command||""}</span
                  >`:""}
            ${lt?c`<span class="sv__now-think"
                  >💭 ${Is(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>fe(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ie(te){let K=k.has(te.idx),be=te.header?te.header.line:null,pt=be?be.is_error===!0?"\u2717":typeof be.result=="string"?"\u2713":"\u27F3":"",et=be&&be.command?be.command:"";return c`<div class="sv__sub${K?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>fe(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${et?c`<span class="sv__sub-detail">${et}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${pt?c`<span class="sv__sub-state">${pt}</span>`:""}
        ${K?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${K?c`<div class="sv__sub-body">
            ${Ne(te.lines).map(Oe=>Oe.kind==="group"?$e(Oe):W(Oe.idx,Oe.line))}
          </div>`:""}
    </div>`}function fe(te){k.add(te),Te()}function Te(){rt(_e(),e),oe(),h&&St()}function St(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function nt(te){b.has(te)?b.delete(te):b.add(te),Te()}function ft(){h=!h,Te()}function vt(te){Mn(te).then(K=>{K?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function E(te){!o||!te||(g={...g,...te},Te())}function se(te){let K=te.target;if(!K||!K.classList||!K.classList.contains("sv__body"))return;!(K.scrollHeight-K.scrollTop-K.clientHeight<=4)&&h&&(h=!1,Te())}e.addEventListener("scroll",se,!0);function Ce(te){let K=te.target;!K||typeof K.closest!="function"||e.contains(K)||K.closest("dialog")||K.closest(".md-viewer-root")||mt()}let Pe=!1;function Qe(){Pe||(document.addEventListener("mousedown",Ce),Pe=!0)}function st(){Pe&&(document.removeEventListener("mousedown",Ce),Pe=!1)}function ot(te){let K=te&&te.attempt_id;if(!K)return;let be=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,pt=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if(be&&pt)return;let et=l;o=K,i=be,a=pt,l=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&et&&et!==l&&Promise.resolve(n("unsubscribe-session-log",{id:et})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,g=te.meta||{},d=te.hide_prompt===!0,h=!0,b.clear(),k.clear(),j(),!N&&r&&(N=r.subscribe(Te)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Qe(),Te()}function mt(){let te=l;st(),o=null,i=null,a=null,l=null,u=null,d=!1,b.clear(),k.clear(),j(),ye(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),rt(c``,e),s&&s()}return{open:ot,updateMeta:E,close:mt,isOpen(){return o!==null},destroy(){ye(),st(),N&&(N(),N=null),e.removeEventListener("scroll",se,!0),o=null,i=null,a=null,l=null,u=null,d=!1,rt(c``,e)}}}function tb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ei(t.spec_id),s=ei(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ei(e){return typeof e=="string"?e.trim():""}function nb(e){let t=tb(e);if(t.path)return t;let n=ei(Qu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Qu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var rb=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ps(e){let t=nb(e),n=ei(Qu(e).spec_review),r=rb.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function sb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function ob(e){let t=e&&e.metadata||{},n=Ps(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:sb(t)?null:"plan_pending"}),r}function Xu(e,t){let n=ob(e);return c`
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
  `}var ib="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ab=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,lb=/^\*\*결론\*\* — (.+)$/;function ti(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ib)return null;let n=ab.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?lb.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Ju=20;function ed(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function cb(e){return e.length>Ju?`${e.slice(0,Ju)}\u2026`:e}function ub(e,t,n,r){let s=`${t.lane} ${cb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ed(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${ur(t.body)}
        </div>`:""}
  </div>`}function db(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ed(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ur(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function td(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let u=ti(typeof l.text=="string"?l.text:"");return u?ub(l,u,t,s.has(l.id)):db(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:l$}=hc;var nd=e=>e.strings===void 0;var pb={},rd=(e,t=pb)=>e._$AH=t;var Cr=Ho(class extends Jr{constructor(e){if(super(e),e.type!==nr.PROPERTY&&e.type!==nr.ATTRIBUTE&&e.type!==nr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!nd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===En||t===Gt)return t;let n=e.element,r=e.name;if(e.type===nr.PROPERTY){if(t===n[r])return En}else if(e.type===nr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return En}else if(e.type===nr.ATTRIBUTE&&n.getAttribute(r)===t+"")return En;return rd(e),t}});var ni=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ka=[...ni.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],or=["orchestration_model","orchestration_effort","orchestration_speed"],ri=[...ni,...or],fb=Ka.filter(e=>ri.includes(e)),sd=["delegated","main"],si=["inherit","claude","codex"],Ms=["default","fast"],Ds=["standard","fast_track"],Ns=["codex","opus","fable","self","skip"],oi=["codex","fable","skip"],ii=["low","medium","high","xhigh"],xn="auto";function $n(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function od(e){if(!$n(e)||!$n(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))$n(r)&&$n(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ns(e,t){let n=od(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[xn,...r.flatMap(([,s])=>s)]}function id(e,t,n,r){if(!$n(e)||!$n(e.runners))return[xn];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!$n(i)||!$n(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==xn&&a!==n)continue;let u=r(i,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[xn,...s]}function rs(e,t,n){return id(e,t,n,(r,s)=>$n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Va(e,t,n){return id(e,t,n,(r,s)=>$n(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:$n(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function qs(e,t){let n=od(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function ad(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!ns(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!rs(t,s,r.impl_model||xn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var _b={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ga=[...fb,...or],mb=[...ri,...Ka].filter((e,t,n)=>n.indexOf(e)===t&&!Ga.includes(e));function ld(e,t){let n=$n(e)?e:{},r=$n(t)?t:{},s=[];for(let i of Ga){let a=n[i]??null,l=r[i]??null;a!==l&&s.push({key:i,label:_b[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let o=[];for(let i of[...mb,...Object.keys(r)])!Ga.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function Ya(e,t,n,r,s,o){return Fo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function cd(e,t){let n={};for(let r of Ka){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ud(e,t){let n={};for(let r of or){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Za=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...or]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ai={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Qa(e,t,n,r,s,o=null){let i=hn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(a=>({key:a,...i[a]}))}function dd(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let a of Qa(e,t,n,r,s,o))i[a.source]+=1;return i}function pd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function fd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var y$=[...ni,...or];var gb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Xa={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},_d={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},bb={pin:"pin",global:"global",base:"base"};function hb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${bb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function yb(e,t,n){switch(e){case"workflow_mode":return Ds;case"spec_review_model":case"impl_review_model":return Ns;case"plan_review_model":return oi;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ii;case"impl_dispatch":return sd;case"impl_runtime":return si;case"impl_model":return ns(n,t.impl_runtime);case"impl_effort":return rs(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ms;case"orchestration_model":return qs(n,null);case"orchestration_effort":return rs(n,void 0,t.orchestration_model||xn).filter(r=>r!==xn);default:return[]}}function vb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${hb(e.source)}
    <span class="detail-effective__k"
      >${dr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ai[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${dr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function md(e,t){let n=Za.flatMap(l=>l.keys),r=Qa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=dd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),i=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
      <span class="detail-effective__summary" title=${a}
        >${wb(o)}</span
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
          ${Za.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Fo({key:u.key,choices:yb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return vb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Cr(e.preset_id)}
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
  </details>`}function wb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function kb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function gd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",i=typeof t.exec_receipt=="string"?t.exec_receipt:"",a=kb(n.exec_receipt),l=a?Xn(a):i,u=a?`${a.kind}:${a.actor}`:i.split("@")[0],d=No(n.planned_execution,n.exec_receipt),g=n.chips?.pr?.number,h=typeof g=="number"?`PR #${g}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${u}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${$b(s).map(b=>xb(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function $b(e){let n=typeof e=="string"&&Object.hasOwn(Xa,e)&&Xa[e]||Xa.spec_backed;return gb.filter(r=>n.includes(r.id))}var li={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function xb(e,t,n,r){let s=Ab(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,a=i?i==="full":s.length>0,l=!a&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",g=u?li.stale:a?li.on:l?li.current:li.none,h=Sb(e,n),b=`${r.label} \xB7 ${g}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,N=c`<span class="detail-summary__gate-label"
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
      >${N}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${N}</span
  >`}function Ab(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Sb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(_d,n)?_d[n]:""}function ci(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bd(e){return ci(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function hd(e,t){let n=e&&e[t];if(!ci(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(bd),s=bd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function wd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ui(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${wd(e)}${t}`}function ss(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${wd(e)}`}function Eb(e,t,n){if(n!==null){let s=e==="claude"?ui:ss,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ss({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function yd(e,t){if(!ci(e)||e.state!=="usable"||!ci(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function vd(e){let t=e.provider_key==="claude"?ui:ss,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Eb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function kd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${vd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:hd(t,"claude"),selected:s,workspace_default:yd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${vd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:hd(t,"codex"),selected:o,workspace_default:yd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var $d=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Fs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function di(e){if(!Fs(e)||!Fs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Fs(n)&&Fs(n.models));return t.length>0?t:null}function jn(e,t){let n=di(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function xd(e,t){return Fs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ad(e,t){let n=di(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return xd(r,r.models[t]);return[]}function Tb(e){let t=di(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of xd(r,s))n.includes(o)||n.push(o);return n}function Cb(e,t){if(!t)return Tb(e);let r=di(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of Ad(e,o))s.includes(i)||s.push(i);return s}function Sd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=jn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Ad(t,r.impl_model):Cb(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}function Rb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ob(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function pi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a=null,l="";function u(N){N.key==="Escape"&&s&&(N.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Rb(s)}</span
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
                    </div>`:c`${a===null?null:c`<pre class="mv__front">
${a}</pre
                        >`}${ur(i)}`}
          </div>
        </div>
      </div>
    `:c``}function g(){rt(d(),e)}async function h(N,G={}){s=N,o="loading",i="",a=null,l="",g();let V=G.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let ae="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(N);try{let X=await r(ae),B=await X.json().catch(()=>({}));if(!X.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&G.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",g();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||X.status)+")",g();return}let L=Ob(String(B.content||""));a=L.front,i=L.body,o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function b(){s=null,rt(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:k}}var Lb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Cd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ib=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ed(e){return typeof e=="string"&&Ib.has(e)}var Pb=["running","done","failed","interrupted"],Mb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Db(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Nb(e){let t=cn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Cd}
          >부분 집계</span
        >`:""}`}function Td(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function tl(e){if(typeof e=="number")return js(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?js(t):""}function qb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Fb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Ja(e){return e===null||typeof e=="string"&&e.trim().length>0}function el(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function jb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!fi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Ja(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Ja(t.effort))||!(!("agent_type"in t)||Ja(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Pb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!el(t.started_at)||!el(t.last_event_at)||!el(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Bb(e,t,n){let s=cn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${tl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${tl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Ub(e,t,n,r){let s=e.status==="running"?null:t,i=(s?cn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?js(e.last_event_at):s?tl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,qb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Fb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Mb[e.status]}</span
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
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function Wb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function zb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let g=jb(d);!g||s.has(g.launch_id)||Ed(g.agent_type)||(s.add(g.launch_id),r.push(g))}r.sort((d,g)=>(d.started_at||0)-(g.started_at||0));let i={};for(let{role:d,provider:g}of fi){let h=t?t.roles[d]?.[g]:null;i[d]=h?[...h.legs]:[]}let a=fi.flatMap(({role:d})=>i[d]),l=new Set,u=[];for(let{role:d,provider:g}of fi){for(let h of r.filter(b=>b.role===d&&b.provider===g)){let b=a.find(k=>k.receipt_id===h.launch_id)||null;b&&!Wb(h,b)||(b&&l.add(b.receipt_id),u.push(Ub(h,b,e.attempt_id,n)))}for(let h of i[d])!l.has(h.receipt_id)&&!Ed(h.agent_type)&&u.push(Bb(d,g,h))}return u}function Hb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Lb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Db(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Cd}</span>`:""}
  </div>`}var Gb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function js(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Kb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Vb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Yb(e,t){let n=Vb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ma(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${vs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${js(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Rd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],a=i.map(b=>Yb(b,t)),l=n.expanded||new Set;if(s.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let N=typeof b.session_id=="string"&&b.session_id.length>0,G=u.has(b.attempt_id),V=N&&!G,ae=N?G?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!V}
      title=${ae}
      @click=${X=>{X.stopPropagation(),V&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},g=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let N=b.cause_detail,G=N&&typeof N.reason=="string"&&N.reason.length>0?typeof N.command=="string"&&N.command.length>0?`${N.reason} \xB7 ${N.command}`:N.reason:b.cause;return c`<div class="detail-session__cause" title=${G}>
      ${b.cause}
    </div>`},h=b=>{let k=Td(ya(b));if(cn(k).length===0&&!Xr(b.usage))return"";let N=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${N?"true":"false"}
      title=${N?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${G=>{G.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Nb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(b=>{let k=ya(b),N=Td(k),G=cn(N);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Gb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${hs(b)?c`<span
                  class="detail-session__resumed"
                  title=${hs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sr(b)}</span>
            ${G.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${G.length>0?G.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${js(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${g(b)} ${Kb(b)}
          ${l.has(b.attempt_id)&&b.usage?Hb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${zb(b,k,t)}
        </div>`})}
    </div>
  `}function Od(e,t={}){return c`
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
          ${Zb(e)}
        </div>`:""}
  `}function Zb(e){let t=es(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?sr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Jo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Qb=["open","in_progress","deferred","resolved","closed"],Xb=[0,1,2,3,4];function Ld(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,g={},h="",b=!1,k=[],N=!1,G={},V={claude:null,codex:null},ae=null,X=null,B=0,L=!1,j=!1,Y="",Q="",ce="";function U(){L=!1,j=!1,Y="",Q="",ce=""}function ee(){V={claude:null,codex:null},ae=null,X=null,B+=1}async function ne(){if(!s)return null;try{let $=await Promise.resolve(s("get-workspace-accounts",{}));return $&&typeof $.state=="string"?$:null}catch{return null}}async function oe($){try{let re=await fetch($);if(!re.ok)return null;let M=await re.json();if(!M||typeof M!="object"||!Array.isArray(M.accounts))return null;let xe=M.accounts.filter(gt=>gt!==null&&typeof gt=="object"&&!Array.isArray(gt));return{accounts:xe,active:xe.find(gt=>gt.active===!0)||null}}catch{return null}}async function ye($){X=$;let re=++B,[M,xe,gt]=await Promise.all([oe("/api/claude-usage"),oe("/api/codex-usage"),ne()]);re!==B||$!==u||(V={claude:M,codex:xe},ae=gt,He())}let Ne=[],he=null,Z=null,ve=!1,Ee="",W=!1,P=0,_e=new Set;function $e(){Ne=[],he=null,Z=null,ve=!1,Ee="",W=!1,P+=1,_e.clear()}async function Ie($){if(!s)return;let re=++P;try{let M=await Promise.resolve(s("get-comments",{id:$}));if(re!==P||$!==u)return;Ne=Array.isArray(M)?M:[],ve=!1}catch{if(re!==P||$!==u)return;ve=!0}He()}function fe(){if(!s||!u)return;let $=d&&typeof d.comment_count=="number"?d.comment_count:null;if(he!==u){he=u,Z=$,Ie(u);return}$!==null&&$!==Z&&(Z=$,Ie(u))}function Te($){_e.has($)?_e.delete($):_e.add($),He()}function St($){let re=Ee.trim().length===0;Ee=$,re!==($.trim().length===0)&&He()}async function nt(){let $=Ee.trim();if(!s||!u||$.length===0||W)return;let re=u;W=!0,He();let M=!1;try{let xe=await Promise.resolve(s("add-comment",{id:re,text:$}));Array.isArray(xe)&&xe.length>0&&(M=!0,re===u&&(Ne=xe,ve=!1,Ee="",Z=xe.length))}catch{M=!1}M||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),re===u&&(W=!1),He()}let ft={onToggle:Te,onDraftInput:St,onSubmit:nt},vt=t.mdViewer||null,E=null;vt||(E=document.createElement("div"),E.className="md-viewer-root",document.body.appendChild(E));let se=vt||pi(E,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ce=document.createElement("div");Ce.className="session-log-root",document.body.appendChild(Ce);let Pe=ts(Ce,{transport:s?($,re)=>Promise.resolve(s($,re)):void 0,sessionLogStore:l}),Qe=!1,st=!1,ot=!1,mt=null,te=null,K=0;function be($){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${$}`}function pt(){Qe=!1,st=!1,ot=!1,mt=null,te=null,K+=1}async function et($){if(!s)return;let re=++K;st=!0,ot=!1,He();try{let M=await Promise.resolve(s("get-bead-prompt",{bead_id:$}));if(re!==K)return;!M||typeof M!="object"||Array.isArray(M)?ot=!0:(mt=M,te=be($))}catch{re===K&&(ot=!0)}finally{re===K&&(st=!1,He())}}let Oe=[],qe=null,lt=0;function _t($,re){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${$}::${re}`}function ct(){Oe=[],qe=null,lt+=1}async function Tt($,re){if(!s)return;let M=++lt,xe;try{xe=await Promise.resolve(s("get-session-refs",{bead_id:$}))}catch{xe=null}M!==lt||re!==qe||(Oe=xe&&Array.isArray(xe.sessions)?xe.sessions:[],He())}function Jt(){if(!s||!u)return;let $=d&&d.metadata,re=$&&typeof $=="object"&&typeof $.session_ref=="string"?$.session_ref:null;if(re===null){ct();return}let M=_t(u,re);qe!==M&&(Oe=[],qe=M,Tt(u,M))}function Yt(){if(Qe=!Qe,Qe&&u&&te!==be(u)){mt=null,et(u);return}He()}function Bt(){if(!i||!u)return[];let $=i.get();return($&&$.attempts?Object.values($.attempts):[]).filter(M=>M&&M.bead_id===u).sort((M,xe)=>(xe.started_at||0)-(M.started_at||0)).map(M=>({attempt_id:M.attempt_id,bead_id:M.bead_id,status:M.status,started_at:typeof M.started_at=="number"?M.started_at:null,runner:M.runner||null,model:M.model||null,effort:M.effort||M.observed_effort||null,speed:M.speed||null,session_id:M.session_id||null,resumed_from:M.resumed_from||null,continuation_mode:M.continuation_mode||null,dismissed_at:typeof M.dismissed_at=="number"?M.dismissed_at:null,cause:typeof M.cause=="string"?M.cause:null,cause_detail:M.cause_detail||null,exec_default_preset_id:typeof M.exec_default_preset_id=="string"?M.exec_default_preset_id:null,exec_default_preset_revision:typeof M.exec_default_preset_revision=="number"?M.exec_default_preset_revision:null,exec_values:M.exec_values&&typeof M.exec_values=="object"?M.exec_values:null,usage:M.usage||null,usage_legs:Array.isArray(M.usage_legs)?M.usage_legs:[],delegation_sessions:Array.isArray(M.delegation_sessions)?M.delegation_sessions:[]}))}function Ot(){if(!i||!u)return null;let $=i.get();return Tn($&&$.attempts||{},u)}let ht=new Set;function We($){ht.has($)?ht.delete($):ht.add($),He()}function R($){let re=i?i.get():null,M=re&&re.attempts?re.attempts[$]:null;Pe.open({attempt_id:$,meta:M?{runner:M.runner||void 0,model:M.model||void 0,effort:M.effort||void 0,status:M.status||void 0,session_id:M.session_id||void 0}:{}})}function J($,re){let M=i?i.get():null,xe=M&&M.attempts?M.attempts[$]:null,Ge=(xe&&Array.isArray(xe.delegation_sessions)?xe.delegation_sessions:[]).find(wt=>wt&&typeof wt=="object"&&wt.launch_id===re);Ge&&Pe.open({attempt_id:$,launch_id:re,meta:{runner:Ge.provider==="claude"?"claude":"codex",role:Ge.role,...typeof Ge.agent_type=="string"?{agent_type:Ge.agent_type}:{},model:Ge.model,effort:Ge.effort,session_id:Ge.session_id,status:Ge.status}})}async function pe($){if(!s||!$)return;let re=await Yr();if(re===null)return;let M=()=>{let wt=i?i.get():null;return wt&&typeof wt.revision=="number"?wt.revision:0},xe=async(wt={},Ve=M())=>await s("worker-attempt-resume",{attempt_id:$,expected_revision:Ve,...re!==""?{instructions:re}:{},...wt}),gt=wt=>{wt?.queue&&i?.set&&i.set(wt.queue)},Ge=await xe();if(gt(Ge),Ge&&Ge.conflict){let wt=Ge.queue&&typeof Ge.queue.revision=="number"?Ge.queue.revision:M();Ge=await xe({},wt),gt(Ge)}Ge=await Jn(Ge,(wt,Ve)=>xe({continuation:wt,decision_token:Ve}),{onResult:gt,refresh:()=>xe()}),Ge&&Ge.resumed===!1&&!Ge.conflict&&Ge.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ge.reason}`,"error",2400)}function T($){!$||!u||Pe.open(Zr($,u,d&&d.status))}let H={onOpen:R,onOpenDelegation:J,onResume:pe,onToggleUsage:We,onOpenSessionRef:T,onCopyResumeCommand:$t};function Le(){let $=i?i.get():null,re={...G};for(let M of["orchestration_model","orchestration_effort","orchestration_speed"]){let xe=$&&$[M];typeof xe=="string"&&(re[M]=xe)}return re}async function Fe(){if(s){try{let $=await Promise.resolve(s("get-session-defaults",{}));G=$&&$.values&&typeof $.values=="object"?$.values:{}}catch{G={}}He()}}function Ae(){let $=i?i.get():null;return $&&$.runner_catalog||null}function Xe(){let $=i?i.get():null;return $&&typeof $.execution_defaults=="object"?$.execution_defaults:null}function ut(){let $=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},M=hn({pin:{...$,...g},global:Le(),execution_defaults:Xe(),runner_catalog:Ae(),route:typeof $.route=="string"?$.route:null}).orchestration_model.value||"";return jn(Ae(),M)}function ze(){let $=a?a.get():null;return!$||typeof $.revision!="number"?null:{revision:$.revision,presets:Array.isArray($.presets)?$.presets:[]}}function tt($){return $?.compatible===!1}function I($){a&&$&&typeof $.revision=="number"&&Array.isArray($.presets)&&a.set({revision:$.revision,presets:$.presets})}async function C(){let $=ze(),re=$?.presets.find(M=>M.id===h);if(!(!s||!u||!$||!re||tt(re)||b)){b=!0,k=[],He();try{let M=await Promise.resolve(s("apply-impl-preset",fd(u,re.id,$.revision)));if(M&&M.conflict){I(M),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let xe=M&&Array.isArray(M.issue)?M.issue[0]:M?.issue;if(M&&M.applied&&xe&&typeof xe=="object"){d=xe,k=Array.isArray(M.skipped_orchestration_keys)?M.skipped_orchestration_keys.filter(gt=>typeof gt=="string"):[];for(let gt of $d)delete g[gt];ue(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}M&&M.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(M){M&&typeof M=="object"&&M.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,He()}}}let ge=null;n&&n.subscribe&&(ge=n.subscribe(()=>kt()));let Ue=null;i&&typeof i.subscribe=="function"&&(Ue=i.subscribe(()=>{u&&He()}));let we=null;a&&typeof a.subscribe=="function"&&(we=a.subscribe(()=>{u&&He()}));function Ye($){$.key==="Escape"&&u&&($.preventDefault(),r())}document.addEventListener("keydown",Ye);function kt(){if(u){if(n&&typeof n.snapshotFor=="function"){let $=n.snapshotFor("detail:"+u)||[];d=$.find(M=>M&&M.id===u)||$[0]||d}fe(),Jt(),He()}}function $t($){Mn($).then(re=>{re?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function At($){$.preventDefault(),$.stopPropagation(),u&&$t(u)}function Lt($,re){$.preventDefault(),$.stopPropagation(),$t(re)}function It($,re,M){$.preventDefault(),$.stopPropagation(),se.open(re,{missing_state:M})}function vn($,re){g[$]=re,He(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",pd(u,$,re.length===0?null:re))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Me($,re){let M=d||{},xe=M.metadata&&typeof M.metadata=="object"?M.metadata:{},gt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])gt[Ve]=Object.hasOwn(g,Ve)?g[Ve]:typeof xe[Ve]=="string"?xe[Ve]:"";gt[$]=re;let Ge=Sd(gt,Ae(),ut()),wt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])wt[Ve]=g[Ve],g[Ve]=Ge[Ve]||"";He(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ge,orchestration_runtime:ut()})).then(Ve=>{let Wt=Array.isArray(Ve)?Ve[0]:Ve;if(!Wt||typeof Wt!="object"||!Wt.id)throw new Error("implementation target readback failed");d=Wt;for(let an of["impl_runtime","impl_model","impl_effort"])delete g[an];He()}).catch(()=>{for(let Ve of["impl_runtime","impl_model","impl_effort"])wt[Ve]===void 0?delete g[Ve]:g[Ve]=wt[Ve];He(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function en($,re,M){if(!s||!u)return!1;try{let xe=await Promise.resolve(s($,re)),gt=Array.isArray(xe)?xe[0]:xe;return gt&&typeof gt=="object"&&gt.id?(d=gt,!0):(ue(M,"error"),!1)}catch{return ue(M,"error"),!1}}function tn($){setTimeout(()=>{try{let re=e.querySelector($);re&&typeof re.focus=="function"&&re.focus()}catch{}},0)}function on(){L=!0,Y=d&&d.title||"",He(),tn('.detail-edit__input[data-edit="title"]')}function it($){Y=$.target.value}function nn(){L=!1,Y="",He()}function Re(){en("edit-text",{id:u,field:"title",value:Y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(L=!1,Y=""),He()})}function S(){j=!0,Q=d&&d.description||"",He(),tn('.detail-edit__textarea[data-edit="description"]')}function me($){Q=$.target.value}function Se(){j=!1,Q="",He()}function yt(){en("edit-text",{id:u,field:"description",value:Q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(j=!1,Q=""),He()})}function Dt($,re,M,xe){if($.key==="Escape"){$.stopPropagation(),M();return}$.key==="Enter"&&(!xe||$.ctrlKey||$.metaKey)&&($.preventDefault(),re())}function Ct($){let re=$.target.value;en("update-status",{id:u,status:re},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>He())}function Ut($){let re=Number($.target.value);en("update-priority",{id:u,priority:re},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>He())}function Vt($){ce=$.target.value}function rn(){let $=ce.trim();$.length!==0&&en("label-add",{id:u,label:$},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(re=>{re&&(ce=""),He()})}function wn($){if($.key==="Escape"){$.stopPropagation(),ce="",He();return}$.key==="Enter"&&($.preventDefault(),rn())}function Pt($){en("label-remove",{id:u,label:$},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>He())}let An={onCopyPath:Lt,onOpenDoc:It};function Rn($){return typeof $=="string"?$:$&&typeof $=="object"?String($.id||$.to||$.issue_id||$.depends_on||""):""}function A($){switch($&&typeof $=="object"?String($.dependency_type||$.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function O($){let M=(Array.isArray($.dependencies)?$.dependencies:[]).map(xe=>({id:Rn(xe),icon:A(xe)})).filter(xe=>xe.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${M.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${M.map(xe=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(xe.id)}
                  >
                    ${xe.icon?`${xe.icon} `:""}${xe.id}
                  </button>`:c`<span class="detail-dep"
                    >${xe.icon?`${xe.icon} `:""}${xe.id}</span
                  >`)}
          </div>`}
    `}function De($){let re=$.metadata||{},M=$.workflow||{},xe=M.stages||{},gt=xe.spec&&xe.spec.stale,Ge=xe.impl&&xe.impl.stale,wt=M.quick_fix_review?.state==="stale",Ve=xe.plan||null,Wt=M.route_source==="derived",an=M.route||re.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Wt?" detail-kv__v--derived":""}"
          title=${Wt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Wt?"unset":an}</span
        >
      </div>
      ${M.route!=="quick_fix"||Object.hasOwn(re,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${re.spec_review||"\uC5C6\uC74C"}${gt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${M.route!=="quick_fix"||Object.hasOwn(re,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${re.impl_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${M.resolver.attempt} \xB7 ${M.resolver.prior_sha} \u2192 ${M.resolver.sha}`}
              >${`${M.resolver.prior_sha.slice(0,7)} \u2192 ${M.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${M.route==="quick_fix"||Object.hasOwn(re,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${re.quick_fix_review||"\uC5C6\uC74C"}${wt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${M.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${M.planned_execution.kind}</span>
            </div>
            ${M.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${M.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${M.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xn(M.exec_receipt)}</span
            >
          </div>`:""}
      ${M.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${M.impl_entry.actor}@${M.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${re.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${re.pr_url}</span>
          </div>`:""}
    `}let je={route:["quick_fix","spec_backed","full_plan"]};async function p($,re){let M=re.target.value;if($==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&M!=="full_plan"&&!window.confirm(`full_plan \u2192 ${M||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){He();return}await en("update-workflow-meta",{id:u,key:$,value:M},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),He()}function v($){let re=$.metadata||{};return c` ${((xe,gt)=>{let Ge=je[xe],wt=typeof re[xe]=="string"?re[xe]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${xe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${xe}
          data-edit=${`wfmeta-${xe}`}
          @change=${Ve=>p(xe,Ve)}
        >
          <option value="" ?selected=${!Ge.includes(wt)}>
            ${gt}
          </option>
          ${Ge.map(Ve=>c`<option value=${Ve} ?selected=${wt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function F($,re){return L?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Y}
            @input=${it}
            @keydown=${M=>Dt(M,Re,nn,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Re}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${nn}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${$}</h2>
        ${cn(re).map(M=>c`<span class="detail-usage-total" title=${M.tooltip}
              >${M.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${on}
        >
          ✎
        </button>
      </div>
    `}function de($){let re=ln($.created_at),M=ln($.updated_at);return!re&&!M?c``:c`
      ${re?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${re}</span>
          </div>`:""}
      ${M?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${M}</span>
          </div>`:""}
    `}function ke($,re){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ct}
        >
          ${Qb.map(M=>c`<option value=${M} ?selected=${M===$}>${M}</option>`)}
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
          ${Xb.map(M=>c`<option value=${String(M)} ?selected=${M===re}>
                P${M}
              </option>`)}
        </select>
      </div>
    `}function at($){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${j?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${S}
            >
              ✎
            </button>`}
      </div>
      ${j?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Q}
              @input=${me}
              @keydown=${re=>Dt(re,yt,Se,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${yt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${$||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Je($){let re=typeof $.notes=="string"?$.notes:"";return re.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${re}</div>
    `}function Zt($){let re=Array.isArray($.labels)?$.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${re.map(M=>c`<span class="detail-label-chip"
              >${M}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${M}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+M}
                @click=${()=>Pt(M)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${ce}
            @input=${Vt}
            @keydown=${wn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${rn}
          >
            추가
          </button>
        </span>
      </div>
    `}function Nt(){if(!u)return c``;let $=d||{},re=String($.id||u),M=$.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",xe=Ot(),gt=$.status||"open",Ge=typeof $.priority=="number"?Math.max(0,Math.min(4,$.priority)):"",wt=$.description||"",Ve={...$,metadata:{...$.metadata||{},...g}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${At}
            >
              ${re}
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
          ${F(M,xe)}
          ${gd(Ve)}
          ${md({metadata:Ve.metadata,workspace_values:Le(),catalog:Ae(),execution_defaults:Xe(),expanded:N,presets:ze()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:Wt=>{N=Wt,He()},onEdit:(Wt,an)=>{if(Wt==="impl_runtime"||Wt==="impl_model"||Wt==="impl_effort"){Me(Wt,an??"");return}vn(Wt,an??"")},onPresetSelect:Wt=>{h=Wt,k=[],He()},onPresetApply:()=>{C()}})}
          ${kd({md:Ve.metadata,catalog:V,workspace_defaults:ae,handlers:{onExecChange:vn}})}
          ${ke(gt,Ge)} ${de($)}
          ${at(wt)}
          ${td(Ne,ft,{expanded:_e,draft:Ee,sending:W,error:ve})}
          ${Je($)} ${Zt($)} ${O($)}
          ${De($)} ${v($)}
          ${Xu($,An)}
          ${Od({expanded:Qe,loading:st,error:ot,data:mt},{onToggle:Yt})}
          ${Rd(Bt(),H,{total:xe,expanded:ht},Oe)}
        </div>
      </div>
    `}function He(){rt(Nt(),e)}return{load($){$!==u&&(g={},h="",k=[],N=!1,U(),$e(),pt(),ct(),ee()),u=$,d=null,kt(),Fe(),X!==$&&ye($)},clear(){u=null,d=null,g={},h="",b=!1,k=[],N=!1,U(),$e(),pt(),ct(),ee(),se.close(),Pe.close(),rt(c``,e)},destroy(){ge&&(ge(),ge=null),Ue&&(Ue(),Ue=null),we&&(we(),we=null),document.removeEventListener("keydown",Ye),vt||(se.destroy(),E&&E.parentNode&&E.parentNode.removeChild(E)),Pe.destroy(),Ce.parentNode&&Ce.parentNode.removeChild(Ce),u=null,d=null,ee(),h="",b=!1,k=[],$e(),pt(),ct(),rt(c``,e)}}}function Id(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,g="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}var Jb="(max-width: 640px)";function _i(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Jb),n=!!t.matches;e(n);let r=s=>{let i=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function eh(){return{lanes:{done:!0},areas:{}}}function Bs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function th(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Bs(r.lanes),areas:Bs(r.areas)}:{lanes:Bs(r),areas:{}}}catch{return null}}function Pd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function mi(e,t=eh()){let n={lanes:Bs(t.lanes),areas:Bs(t.areas)},r=th(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let i=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:i}},Pd(e,s),i},toggleArea(o){let i=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:i}},Pd(e,s),i}}}var Vn=e=>e??Gt;function gi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Dd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Rr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function bi(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function hi(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,a=o.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function yi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function nh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:gi(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Nd(e,t){let n=nh(e,t);return n?c`<button
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
            >${yi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Rr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function os(e){let t=bn(e.created_at),n=bn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${ln(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${ln(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function rh(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ws(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function vi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Bn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&g.phase!=="done").sort((g,h)=>(g.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?rh(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:a,confirmation:d}}function Us(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var sh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function qd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(u){return Number.isInteger(i[u])?Number(i[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:sh[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function wi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function oh(e){return c`<div
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
  </div>`}function ki(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,i=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!i?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
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
    ${t.map(a=>c`<span
          class=${`worker-dep worker-dep--pred${a.foreign?" worker-dep--foreign":""}`}
          title=${a.title||""}
          >${a.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${a.id}
                data-root-dir=${a.root_dir||""}
              >
                ${a.label}
              </button>`:a.label}</span
        >`)}${n.map(a=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${a.id}
          aria-label=${`scope \uACB9\uCE68 ${a.id} (${a.location_label})`}
          title=${[`\uACB9\uCE68 ${a.id} (${a.location_label})`,...a.prefixes].join(`
`)}
        >
          ⧉ ${a.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?oh(s):""}
  </div>`}function $i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function ih(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Fd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function jd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function xi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function ah(e){let t=Array.isArray(e.badges)?e.badges:[],n=cn(e.usage),r=er(e.usage),s=bn(e.done_at);return c`<div
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
      ${jd(e.pr_url,e.pr_number)}${s?c`<span
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
              >`):r?c`<span class="worker-usage" title=${ws(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Dd(e.work_kind)}
            >작업 ${Rr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Un(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return ah(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=cn(e.usage),o=er(e.usage),i=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,u=l?bn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",g=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,N=e.lane==="done"?"":$i(e.workflow),G=e.lane==="done"?"":Fd(e.from_id),V=xi(e.priority),ae=c`<span class="worker-mini__title">${e.title}</span>`,X=jd(e.pr_url,e.pr_number),B=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",L=r.map(Ie=>Ie===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ie}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ie===e.completion_badge&&e.completion_title||""}
          >${Ie}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",Y=s.length>0?s.map(Ie=>c`<span class="worker-usage" title=${Ie.tooltip}
              >${Ie.label}</span
            >`):o?c`<span class="worker-usage" title=${ws(e.usage)}
            >${o}</span
          >`:"",Q=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",ce=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ee=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ne=e.discard,oe=ne?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ne?.attempt_id||""}
          data-operation-id=${ne?.operation?.operation_id||""}
          data-discard-mode=${ne?.confirmation||"unmerged"}
          ?disabled=${ne?!ne.enabled:e.discard_enabled===!1}
          title=${ne?ne.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ne?.label||"\uD3D0\uAE30"}
        </button>`:"",ye=e.stale_work||null,Ne=ye?c`${ye.can_resume||ye.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ye.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ye.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            다시 확인
          </button>`:""}`:"",he=ye?c`<div class="worker-mini__stale">
        <strong>${ye.title}</strong>
        <span>${ye.summary}</span>
        <span>${ye.cause}</span>
        ${ye.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Z=e.revise_action?c`<button
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
        </button>`:"",ve=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=b||N||G||ve||Y?c`<div class="worker-chips">
          ${b}${N}${G}${ve?wi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Y}
        </div>`:"",W=ki(e.dependency_chips),P=Us(e),_e=t.actions?t.actions:"",$e=!!(i||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ne?.operation||e.revise_action||ye);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${V}${G}${X}${ae}${_e}
          </div>
          <div class="worker-mini__row2">
            ${Y}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ln(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Dd(e.work_kind)}
                  >작업 ${Rr(e.work_ms)}</span
                >`:""}${L}${Q}
            <span class="worker-mini__actions"
              >${ce}${U}${ee}${oe}</span
            >
            ${os(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${g}${k}${V}${X}${B}${L}${h}${j}${_e}
            </div>
            <div class="worker-mini__body">${ae}${he}</div>
            ${W}${Ee}${$e?c`<div class="worker-mini__foot">
                  ${Q}
                  <span class="worker-mini__actions"
                    >${ce}${U}${ee}${oe}${Z}${Ne}</span
                  >
                  ${Us(e)}
                </div>`:""}
            ${os(e)}`:c`<div class="worker-mini__line">
              ${d}${g}${k}${V}${ae}${X}${B}${L}${h}${j}${Q}${ce}${U}${ee}${oe}${_e}
            </div>
            ${W}${Ee}${P} ${os(e)}`}
  </div>`}function lh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var ch={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function nl(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,i=e.session_preferred===!0,a=ch[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=ki(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=$i(l),k=Fd(e.from_id),N=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${xi(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:i?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${ih(l)}${n.dep_action===!0?c`<span class="worker-card__head-actions"
            ><button
              type="button"
              class="worker-card__dep mon-dep__btn"
              data-bead-id=${e.id}
              title="의존성"
              aria-label="의존성"
            >
              ⛓
            </button></span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Mo(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${g}
    ${h||b||k||N?c`<div class="worker-chips">
          ${h}${b}${k}${wi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${lh(t.lanes,e.id)}
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
              대기로 ↴
            </button>`}
    </div>
    ${os(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Vn(e.id||void 0)}
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
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?nl(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Un(s))}
          </div>`}
  </section>`}function Md(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ai(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Md("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${Vn(r.drop)}
            data-root-dir=${Vn(r.root_dir)}
            data-lane-id=${Vn(r.lane_id)}
            data-lane-length=${Vn(r.lane_length)}
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
        ${Md("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>uh(s))}
          </div>`}
    </section>
  </div>`}function uh(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${Vn(t.drop)}
        data-root-dir=${Vn(t.root_dir)}
        data-lane-id=${Vn(t.lane_id)}
        data-lane-length=${Vn(t.lane_length)}
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
  </div>`}function Si(e){return e.count?c`<section
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
  </section>`:""}function Ei(e){return e.replace(/\/+$/,"")}function dh(e,t){let n=Ei(e),r=Ei(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ti(e,t){let n=new Set;for(let r of e)for(let s of t){if(!dh(r,s))continue;let o=Ei(r),i=Ei(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function Ud(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:l})}for(let i=0;i<s.length;i+=1)for(let a=i+1;a<s.length;a+=1){let l=Ti(s[i].scope,s[a].scope);if(l.length===0)continue;let u=s[i].member,d=s[a].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Bd=["parallel","serial","candidate"];function zs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function rl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=Bd.includes(r.kind),l=Bd.includes(s.kind);if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&l&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(a&&o===null&&l&&i===null){let u=ph(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${zs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ph(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Wd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},zd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function il(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function sl(e){for(let t of il(e))if(Object.hasOwn(Wd,t))return Wd[t];return null}function ol(e){let t=null;for(let n of il(e))Object.hasOwn(zd,n)&&(t=zd[n]);return t}function is(e){let t=sl(e),n=ol(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Gd(e,t){let n=sl(e)??sl(t),r=ol(t)??ol(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var fh=new Set(["repo_operation_timeout_unresolved"]);function _h(e){for(let t of il(e))if(fh.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function mh(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Kd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||_h(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(mh(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Rr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Hd={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Vd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Hd,t.blocked_reason)?Hd[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=is(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=is(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Yd=160;function gh(e){return e.length>Yd?`${e.slice(0,Yd)}\u2026`:e}function bh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${gh(e.command)}</code>`:""}
  </div>`}function hh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function yh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Zd(e){let t=e.failure?is(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${bh(e.failure.cause_detail,e.failure.reason)}
          ${hh(e.failure.reason)}
          ${Us({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function vh(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var wh=new Set(["codex-runner"]);function kh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&wh.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),u=a.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?bn(r.last_event_at,t):"",g=r?bn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:g?`\uAC31\uC2E0 ${g}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${bn(i,t)}</span
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
      </div>`:""}`}var $h={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function xh(e){if(!e)return"";let t=$h[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function al(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(oe=>oe&&oe.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?yh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=hs(e),g=cn(e.usage),h=er(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,N=e.landing,G=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,ae=vh(V),X=V?ki(V.dependency_chips):"",B=kh(V,t,a,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),L=s&&e.workflow?.chips?.exec_receipt||null,j=$i(e.workflow),Y=L?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(L)}`}
        >${`${L.kind}:${Do(L)}`}</span
      >`:"",Q=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${vs(o)}</span
      >`:"",ce=ae||j||Q||Y?c`<div class="rtile__meta">
          ${ae}${j}${Q}${Y}
        </div>`:"",U=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ee=s?"":os(e),ne=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${G?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${xi(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${U}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${xh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${ne}
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
                ${a?c`<button
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
                ${ne}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${B}${e.rollup?Po(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:pa}):""}
    ${N?c`<div class="rtile__landing">
          <span
            class="merge-step${N.failed?" merge-step--failed":""}"
            style=${`--progress: ${N.percent}%`}
            >${N.label}${N.index>0?c`<span class="merge-step__n"
                  >${N.index}/${N.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${X}
    ${s?ce:ae||j||u||g.length>0||h?c`<div class="rtile__meta">
            ${ae}${j}${wi(e.exec_chips)}
            ${g.length>0?g.map(oe=>c`<span class="worker-usage" title=${oe.tooltip}
                      >${oe.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${ws(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Us(e)} ${ee}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qd(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>al(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var ll=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Xd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${ai[t.source]})`}function cl(e){return e.filter(t=>t!==null).join(`
`)}function Hs(e){if(typeof e!="object"||e===null)return null;let t=Sr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:cl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function Or(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),s=pr(e,"orchestration_speed"),o=Xd([jn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:cl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",s)])}}function Ah(e,t){return e===null||e.value===null||ll.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Sh(e){return e===null||ll.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Eh(e){return e===null?null:e.value==="auto"?"auto":ll.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),s=pr(e,"impl_model"),o=pr(e,"impl_effort"),i=pr(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":Xd([Ah(r,t??null),Sh(s),Eh(o),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:cl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",s),fr("impl_effort",o),fr("impl_speed",i)])}}var un="",Th=["impl_runtime","impl_model","impl_effort"],Ch=["claude_account","codex_account"],Rh=5,Ci=1;function yn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ri(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(R=>ue(R,"error",4e3)),o={},i={},a=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},g={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,N=null,G={},V="",ae="",X=!1,B=!1,L=!1,j=null,Y=!1;function Q(){let R=t.queue?t.queue():null;return yn(R)?R:null}function ce(){let R=Q();return R?R.runner_catalog:null}function U(){let R=Q();return R&&yn(R.execution_defaults)?R.execution_defaults:null}function ee(){let R=t.implPresetStore?.get();return yn(R)&&Array.isArray(R.presets)?R:null}function ne(){return r===null?{}:{root_dir:r}}async function oe(R,J){return Y||!n?null:await n(R,J)}function ye(R){R&&yn(R.queue)&&t.onQueueAdopt?.(R.queue)}async function Ne(R,J){let pe=Q();if(!pe||Y)return null;let T=await oe(R,{...J,...ne(),expected_revision:pe.revision});if(ye(T),r!==null&&T&&T.conflict){let H=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:Q()?.revision??pe.revision;T=await oe(R,{...J,...ne(),expected_revision:H}),ye(T)}return T}async function he(){l=!0,We();try{let R=await oe("get-session-defaults",{...ne()});o=yn(R?.values)?{...R.values}:{},i={...o},a=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){a=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{l=!1,We()}}async function Z(){let R=cd(o,i);if(Object.keys(R).length!==0){try{let J=await oe("set-session-defaults",{values:R,...ne()});o=yn(J?.values)?{...J.values}:{},i={...o},a=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}function ve(R,J){if(!yn(R))return;let pe=R.state;u={state:pe==="usable"||pe==="unusable"||pe==="absent"?pe:"absent",values:yn(R.values)?{...R.values}:{},warnings:Array.isArray(R.warnings)?R.warnings:[]},g={...u.values},J&&(d={...g})}async function Ee(){try{ve(await oe("get-workspace-accounts",{...ne()}),!0)}catch(R){u={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}We()}async function W(R){try{let J=await fetch(R);if(!J.ok)return null;let pe=await J.json();if(!yn(pe)||!Array.isArray(pe.accounts))return null;let T=pe.accounts.filter(H=>yn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:T,active:T.find(H=>H.active===!0)||null}}catch{return null}}async function P(){k=!0;let[R,J]=await Promise.all([W("/api/claude-usage"),W("/api/codex-usage")]);Y||(b={claude:R,codex:J},We())}function _e(){let R={};for(let J of Ch){let pe=Object.hasOwn(d,J)?d[J]:null,T=Object.hasOwn(g,J)?g[J]:null;pe!==T&&(R[J]=pe)}return R}async function $e(){let R=_e();if(Object.keys(R).length!==0){try{ve(await oe("set-workspace-accounts",{values:R,...ne()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}function Ie(R,J){J===un?delete d[R]:d[R]=J,We(),h=h.then(()=>$e())}function fe(R,J){if(Th.includes(R)){nt(R,J);return}J===un?delete i[R]:i[R]=J,We(),Z()}function Te(){let R=Ot().orchestration_model,J=hn({global:{orchestration_model:R??void 0},execution_defaults:U(),runner_catalog:ce()}).orchestration_model.value;return J?jn(ce(),J):null}function St(R,J){typeof J=="string"&&J.length>0?i[R]=J:delete i[R]}function nt(R,J){let pe=J===un?void 0:J,T=ad({impl_runtime:R==="impl_runtime"?pe:i.impl_runtime,impl_model:R==="impl_model"?pe:i.impl_model,impl_effort:R==="impl_effort"?pe:i.impl_effort},ce(),Te());St("impl_runtime",T.impl_runtime),St("impl_model",T.impl_model),St("impl_effort",T.impl_effort),We(),Z()}async function ft(){let R=Q();if(!R)return;let J={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},pe=ud(J,{...J,...G});if(Object.keys(pe).length!==0){try{let T=await Ne("worker-queue-set-orchestration-defaults",{values:pe});if(T&&T.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}G={}}catch(T){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}We()}}function vt(R,J){G[R]=J===un?null:J,We(),ft()}function E(R){if(N=R,!R){We();return}let J=ce(),pe=Ot(),T=pe.orchestration_model;T&&!qs(J,R).includes(T)&&(G.orchestration_model=null,T=null);let H=pe.orchestration_effort;H&&!Va(J,R,T||xn).includes(H)&&(G.orchestration_effort=null),We(),ft()}async function se(R){if(!(!Q()||R<Ci)){try{await Ne("worker-queue-set-slots",{slots:R})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}async function Ce(R){if(!(!Q()||R<Ci||R>Rh)){try{await Ne("worker-queue-set-serial-lane-count",{count:R})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}async function Pe(R,J){let pe=R==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Ne(pe,{on:J})}catch(T){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}We()}function Qe(){let R={},J=Ot();for(let pe of ri){let T=or.includes(pe)?J[pe]:i[pe];typeof T=="string"&&T.length>0&&(R[pe]=T)}return R}async function st(){let R=ee();if(!R)return;let J=Qe();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let pe=(R.presets||[]).find(H=>H.id===V),T=ae.trim()||(pe?pe.name:"");if(!T){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=pe?await oe("impl-preset-update",{expected_revision:R.revision,id:pe.id,name:T,settings:J}):await oe("impl-preset-create",{expected_revision:R.revision,name:T,settings:J});if(H&&H.applied){if(ae="",!pe&&Array.isArray(H.presets)){let Le=H.presets.find(Fe=>Fe.name===T);V=Le?Le.id:V}We()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function ot(){let R=ee();if(!(!R||V.length===0))try{let J=await oe("impl-preset-delete",{expected_revision:R.revision,id:V});J&&J.applied?(V="",We()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function mt(R){o=yn(R.values)?{...R.values}:{},i={...o},a=Array.isArray(R.warnings)?R.warnings:[],yn(R.queue)&&(t.onQueueAdopt?.(R.queue),G={})}async function te(){let R=ee(),J=Q();if(!R||!J||V.length===0)return;let pe=T=>({preset_id:V,expected_revision:R.revision,expected_queue_revision:T,...ne()});try{let T=await oe("apply-impl-preset-global",pe(J.revision));if(T&&T.applied&&mt(T),r!==null&&T&&T.queue_applied===!1){let H=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:Q()?.revision??J.revision;T=await oe("apply-impl-preset-global",pe(H)),T&&T.applied&&mt(T)}T&&T.applied?T.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):T&&T.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(T){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${T instanceof Error?T.message:String(T)}`)}We()}async function K(){B=!0,L=!1,We();try{let R=await oe("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?L=!0:j=R}catch{L=!0}finally{B=!1,We()}}function be(){if(X=!X,X&&!j){K();return}We()}function pt(){let R=es({loading:B,error:L});if(R)return R;if(!j)return"";let J=Array.isArray(j.variants)?j.variants:[];return c`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(pe=>c`<div class="settings-dialog__sp-variant" data-variant=${pe.key}>
            <div class="settings-dialog__sp-cond">${pe.condition}</div>
            ${sr(pe.label,pe.system_prompt)}
          </div>`)}
    </div>`}function et(){return c`<section
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
        @click=${be}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?pt():""}
    </section>`}function Oe(R,J,pe,T,H,Le,Fe){let Ae=H[R]??un,Xe=Ya(R,pe,H,U(),ce(),Fe),ut=Xe.options.find(tt=>tt.value===Ae),ze=Ae===un?Xe.full_value:ut?.full_value;return c`<select
        class=${Ae===un?"settings-dialog__unset":""}
        data-key=${R}
        aria-label=${J}
        title=${ze||""}
        ?disabled=${Le===!0||Xe.disabled}
        .value=${Cr(String(Ae))}
        @change=${tt=>T(R,String(tt.target.value))}
      >
        <option value=${un} ?selected=${Ae===un}>
          ${Xe.unset_label}
        </option>
        ${Xe.options.map(tt=>c`<option
              value=${tt.value}
              title=${tt.full_value||""}
              ?selected=${tt.value===Ae}
            >
              ${tt.label}
            </option>`)}
      </select>
      ${Ae===un?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function qe(R,J,pe,T,H,Le=!1,Fe){return c`<div
      class=${`settings-dialog__row${Le?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Oe(R,J,pe,T,H,Le,Fe)}
      </span>
    </div>`}function lt(R,J){let pe=J?J.active:null;return yn(pe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${R==="claude"?pe.email:ss({...pe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function _t(R,J,pe){let T=b[pe],H=Object.hasOwn(d,R)?d[R]:un,Le=pe==="claude"?ui:ss,Fe=!!T?.accounts.some(Ae=>Ae.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${R}
          @change=${Ae=>Ie(R,String(Ae.target.value))}
        >
          <option value=${un} ?selected=${H.length===0}>
            ${lt(pe,T)}
          </option>
          ${H.length>0&&!Fe?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${T?.accounts.map(Ae=>c`<option value=${Ae.key} ?selected=${Ae.key===H}>
                ${Le(Ae)}
              </option>`)||""}
        </select>
        ${T?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ct(){let R=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${R} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${R}`:null}function Tt(R,J,pe,T,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${Oe(pe,`${R} \uBAA8\uB378`,T,fe,i,!1)}
        ${Oe(H,`${R} effort`,ii,fe,i,!1)}
      </span>
    </div>`}function Jt(R,J,pe,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${T?" is-on":""}`}
          data-automation=${R}
          aria-pressed=${T?"true":"false"}
          aria-label=${J}
          @click=${()=>Pe(R,!T)}
        >
          ${T?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${pe}</span>
      </span>
    </div>`}function Yt(R,J,pe,T){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${R}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>T(pe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${pe}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>T(pe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Bt(R){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${R.rows.length>0?`\uBCC0\uACBD ${R.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${R.rows.map(J=>c`<div
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
      ${R.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${R.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ot(){let R=Q(),J={};for(let pe of or)J[pe]=Object.prototype.hasOwnProperty.call(G,pe)?G[pe]:R&&typeof R[pe]=="string"?R[pe]:null;return J}function ht(){let R=ce(),J=i.impl_runtime,pe=i.impl_model,T=ee(),H=Q(),Le=Ot(),Fe=qs(R,N),Ae=ns(R,void 0).filter(we=>we!==xn),Xe=Va(R,N,Le.orchestration_model||xn).filter(we=>we!==xn),ut=V?(T?.presets||[]).find(we=>we.id===V):null,ze=ut?ld(Qe(),yn(ut.settings)?ut.settings:{}):null,tt=H&&typeof H.slots=="number"?H.slots:Ci+1,I=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:Ci,C=U()?.supported===!0,ge=ct(),Ue=Ya("workflow_mode",Ds,i,U(),R);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${ge?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ge}
          </div>`:""}
      ${C?"":c`<div
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
                .value=${Cr(V)}
                @change=${we=>{V=String(we.target.value),We()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(T?.presets||[]).map(we=>c`<option
                      value=${we.id}
                      ?selected=${we.id===V}
                    >
                      ${we.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ze||ze.rows.length===0}
                @click=${te}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Cr(ae)}
                @input=${we=>{ae=String(we.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${st}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${ot}
              >
                삭제
              </button>
            </div>
            ${ze?Bt(ze):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Cr(N||un)}
                    @change=${we=>{let Ye=String(we.target.value);E(Ye===un?null:Ye)}}
                  >
                    <option value=${un} ?selected=${!N}>
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
              ${qe("orchestration_model","\uBAA8\uB378",Fe,vt,Le)}
              ${qe("orchestration_effort","effort",Xe,vt,Le)}
              ${qe("orchestration_speed","\uC18D\uB3C4",Ms,vt,Le)}
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
                      data-mode=${un}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>fe("workflow_mode",un)}
                    >
                      ${Ue.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ds.map(we=>c`<button
                          type="button"
                          data-mode=${we}
                          aria-pressed=${String(i.workflow_mode===we)}
                          @click=${()=>fe("workflow_mode",we)}
                        >
                          ${we}
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
              ${Tt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ns,"spec_review_effort")}
              ${Tt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",oi,"plan_review_effort")}
              ${Tt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ns,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${qe("impl_runtime","\uC704\uC784 \uB300\uC0C1",si,fe,i)}
              ${qe("impl_model","\uBAA8\uB378",ns(R,J),fe,i)}
              ${qe("impl_effort","effort",rs(R,J,pe),fe,i)}
              ${qe("impl_speed","\uC18D\uB3C4",Ms,fe,i)}
              ${qe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ae,fe,i,!1,{...i,...Le})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Jt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Jt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Yt("slots","\uB3D9\uC2DC \uC2E4\uD589",tt,we=>se(we))}
              ${Yt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",I,we=>Ce(we))}
            </div>
            ${et()}
          `}
    `}function We(){Y||rt(ht(),e)}return{load(){G={};let R=[he(),Ee()];return k||R.push(P()),Promise.all(R).then(()=>{})},render:We,sessionDraft:()=>({...i}),destroy(){Y=!0,rt(c``,e)}}}function Oi(e){return c`<svg
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
  </svg>`}function Jd(){return Oi(gs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ep(){return Oi(gs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function tp(){return Oi(gs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function np(){return Oi(gs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function rp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function sp(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return cn(Bo(t));let n={};for(let a of Kn)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Kn){let g=l[d];typeof g=="number"&&Number.isFinite(g)&&(n[d]+=g,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?er(n):null}function Wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ul(e,t){let n=Wn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Oh(e,t){if(!Wn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Lh(e){if(!Wn(e)||!Wn(e.execution_defaults)||!Wn(e.runner_catalog)||!Wn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=hn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=jn(e.runner_catalog,n.orchestration_model.value??""),s=Or(n,e.runner_catalog),o=_r(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function op(e,t){let n=t.notify||(W=>ue(W,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",o.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,g=null,h=new Map;function b(){let W=t.workspacesState?t.workspacesState():[];return Array.isArray(W)?W.filter(P=>Wn(P)):[]}function k(W){return b().find(P=>P.root_dir===W)||null}function N(W){return Oh(k(W),h.get(W))}function G(){for(let W of b()){let P=h.get(W.root_dir);P&&typeof P.revision=="number"&&typeof W.revision=="number"&&W.revision>=P.revision&&h.delete(W.root_dir)}}async function V(W,P,_e){let $e=t.transport,Ie=N(P);if(!(!$e||!Wn(Ie))){try{let fe=await $e(W,{..._e,root_dir:P,expected_revision:Ie.revision});if(Wn(fe?.queue)&&h.set(P,fe.queue),fe&&fe.conflict){let Te=Wn(fe.queue)&&typeof fe.queue.revision=="number"?fe.queue.revision:N(P)?.revision;fe=await $e(W,{..._e,root_dir:P,expected_revision:Te}),Wn(fe?.queue)&&h.set(P,fe.queue)}}catch(fe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}Z()}}function ae(W){u!==W&&(u=W,t.onFocusChange?.(u),Z())}function X(W){ae(u===W?null:W)}function B(W){if(d===W){j();return}L(),d=W;let P=k(W);i.textContent=`${P?.name||W} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,g=Ri(l,{root_dir:W,queue:()=>N(W),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:_e=>{h.set(W,_e),Z()}}),g.load(),Z()}function L(){g?.destroy(),g=null}function j(W){L(),d=null,s.hidden=!0,i.textContent="",W!==!0&&Z()}let Y=()=>j();a.addEventListener("click",Y);function Q(W){W.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",Q);function ce(W,P){let _e=Math.max(P,W,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${P}\uAC1C \uC911 ${W}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:_e},($e,Ie)=>Ie<W?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function U(W){let P=W.auto_advance===!0,_e=W.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${P?" is-on":""}`}
        data-act="auto"
        aria-pressed=${P?"true":"false"}
        aria-label=${`${W.name} \uC790\uB3D9\uD654`}
        title=${P?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${P?ep():Jd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${_e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${_e?"true":"false"}
        aria-label=${`${W.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${_e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${tp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===W.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===W.root_dir?"true":"false"}
        aria-label=${`${W.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${np()}
      </button>`}function ee(W){let P=Lh(W);return P?c`<div class="mon2-deck__chips">
      ${P.orchestration?c`<span class="mon2-deck__chip" title=${P.orchestration.title}
            >오케 ${P.orchestration.text}</span
          >`:""}
      ${P.worker?c`<span class="mon2-deck__chip" title=${P.worker.title}
            >워커 ${P.worker.text}</span
          >`:""}
    </div>`:""}function ne(W){let P=[];for(let[_e,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ie=ul(W,_e);Ie>0&&P.push(`${$e} ${Ie}`)}return P.join(" \xB7 ")}function oe(W){let P=ul(W,"running"),_e=typeof W.slots=="number"?W.slots:1;return c`<div
      class=${`mon2-deck__tile${u===W.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${W.root_dir}
      aria-pressed=${u===W.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${W.root_dir}>${W.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${_e}\uAC1C \uC911 ${P}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${P}/${_e}</span>
          ${ce(P,_e)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${W.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${U(W)}</div>
        <span class="mon2-deck__counts">${ne(W)}</span>
        ${ee(W)}
      </div>
    </div>`}function ye(W){let P=t.doneItems?t.doneItems():[],_e=t.rangeLabel?t.rangeLabel():"",$e=sp(Array.isArray(P)?P:[]),Ie=fe=>W.reduce((Te,St)=>Te+ul(St,fe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${W.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${_e}`}
        >실행 ${Ie("running")} · 대기 ${Ie("queue")} · PR
        ${Ie("pr_wait")}${Ie("session_active")>0?` \xB7 \uC138\uC158 ${Ie("session_active")}`:""}
        · ${_e} 완료
        ${Array.isArray(P)?P.length:0}</span
      >
      ${$e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${rp(_e)}
                  >${$e}</span
                >`:$e.map(fe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${fe.provider}
                      title=${fe.tooltip}
                      >${fe.label}</span
                    >`)}
          </span>`}
    </div>`}function Ne(){let W=b();return W.length===0?"":c`${ye(W)}
      <div class="mon2-deck__strip">
        ${W.map(P=>oe(P))}
      </div>`}function he(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function Z(){G(),he(),d!==null&&!k(d)&&j(!0),rt(Ne(),r),g?.render()}function ve(W){let P=W.target;if(!P||typeof P.closest!="function")return;let _e=P.closest("[data-root-dir]");if(!_e)return;let $e=_e.getAttribute("data-root-dir")||"",Ie=P.closest("[data-act]")?.getAttribute("data-act");if(Ie==="worker"){t.gotoWorkerTab?.($e);return}if(Ie==="auto"){V("worker-automation-toggle",$e,{on:N($e)?.auto_advance!==!0});return}if(Ie==="merge"){V("worker-merge-auto-toggle",$e,{on:N($e)?.auto_merge!==!0});return}if(Ie==="gear"){B($e);return}X($e)}function Ee(W){if(W.key!=="Enter"&&W.key!==" ")return;let P=W.target;if(!P||typeof P.closest!="function")return;let _e=P.closest('[data-root-dir][role="button"]');!_e||_e!==P||(W.preventDefault(),X(_e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ve),r.addEventListener("keydown",Ee),{render:Z,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Q),r.removeEventListener("click",ve),r.removeEventListener("keydown",Ee),a.removeEventListener("click",Y),L(),rt(c``,r),e.replaceChildren()}}}function ip(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let i=[],a=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let g=Number(n.get(l))<Number(n.get(d)),h=Number(a.get(l))>Number(a.get(d));g&&h&&(u===null||Number(a.get(d))>Number(a.get(u)))&&(u=d)}u!==null&&i.push({bead_id:l,after:u})}return{order:o,corrections:i,cycle:!1}}var Ih="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ii="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ph="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Mh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",as="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Gs(e,t){return`${e}\0${t}`}function Dh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(a=>a!==s&&n.has(a)))}return r}function Nh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ys(e,t){let n=e.entries,r=n.map(g=>g.bead_id),s=Dh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[g,h]of s)for(let b of h)o.push({blocker:b,blockee:g});let i=Nh(e,t),a=new Map(r.map((g,h)=>[g,h])),l=r.slice(0,i).filter(g=>s.get(g).some(h=>Number(a.get(h))>Number(a.get(g)))),u=ip(r.slice(i),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(g=>[g.bead_id,g]));return{entries:[...n.slice(0,i),...u.order.map(g=>d.get(g))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function ap(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ys(n,t)}function qh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Fh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function jh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function dl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function Bh(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add(Gs(i,l));let r=new Map,s=new Map;for(let i of e){let a=Gs(i.a,i.b);r.set(a,i),s.set(a,i.type==="dep-add")}let o=[];for(let i of e){let a=Gs(i.a,i.b);r.get(a)===i&&s.get(a)!==n.has(a)&&o.push(i)}return o}function Uh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Wh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Li(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function pl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Zs(e){let t=jh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Fh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,g)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(dl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),g!==void 0&&r.add(Gs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...g===void 0?{}:{lane_id:g}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let g=t.get(u)||[];if(!g.includes(d))return;let h=o(u);h!==null&&(t.set(u,g.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Gs(u,d))}}function Qs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Bh(e.dep_ops,t.blocked_by_map),i=o.filter(d=>d.type==="dep-remove"),a=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:qh(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...u===void 0?{}:{correction:u}}}function lp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Ks(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function cp(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||o.set(a,[...o.get(a)||[],i.bead_id])}for(let[i,a]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return s}function up(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let a=s.get(i)??0;r.push(Li(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),s.set(i,a+1)}}function Vs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Pi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function fl(e,t,n){let r=Zs(n),s=[],o=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ih};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ph};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:as}}if(e.kind==="chain"&&d===void 0)return{refused:as};let g=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(k<0)return;let N=k>0?d.entries[k-1]:null,G=k+1<d.entries.length?d.entries[k+1]:null,V=Ks(d,k),ae=G!==null&&Ks(d,k+1);V&&N!==null&&r.removeDep(e.bead_id,N.bead_id),ae&&G!==null&&r.removeDep(G.bead_id,e.bead_id),(V||ae)&&N!==null&&G!==null&&r.addDep(G.bead_id,N.bead_id,u)},h=(k,N)=>{let G=n.cross_lanes.get(k),V=G.entries.findIndex(U=>U.bead_id===e.bead_id),ae=G.entries.filter(U=>U.bead_id!==e.bead_id),X=Math.max(0,Math.min(ae.length,V>=0&&N>V?N-1:N)),B=-1;if(ae.forEach((U,ee)=>{n.fixed_members.has(U.bead_id)&&(B=ee)}),X<=B){r.state.refusal=Mh;return}let L=V>=0?G.entries[V]:d?.entries.find(U=>U.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=Ys({status:G.status,entries:[...ae.slice(0,X),L,...ae.slice(X)]},n);let j=a.entries;if(Pi(j,G.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Vs(j)}}),G.status!=="confirmed")return;let Y=j.findIndex(U=>U.bead_id===e.bead_id),Q=Y>0?j[Y-1].bead_id:null,ce=Y+1<j.length?j[Y+1].bead_id:null;if(Q===null){ce!==null&&r.addDep(ce,e.bead_id,k);return}if(r.addDep(e.bead_id,Q,k),ce!==null&&(r.graph.get(ce)||[]).includes(Q)){let U=G.entries.findIndex(ee=>ee.bead_id===ce);(r.laneCreated(ce,Q)||U>0&&G.entries[U-1].bead_id===Q&&Ks(G,U))&&r.removeDep(ce,Q),r.addDep(ce,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(g(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...cp(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Vs(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Uh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Li(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let N=n.parallel_rows,G=N[Math.max(0,Math.min(N.length,t.marker_index))];if(!(!!G&&G.bead_id===e.bead_id)&&Wh(n,e.root_dir)&&b!==void 0){let ae=b>k?k:k-1;ae>=0&&ae!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Li(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Li(e.bead_id,e.root_dir,t.index,t.lane_id));return Qs(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function dp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ys(n,t);if(r.held)return{refused:Ii};let s=r.entries,o=Zs(t),i=[];lp(o,s,e),o.state.refusal===null&&up(o,t,s,i);let a=Pi(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Qs(o,t,a,i,{lane_id:e,correction:r})}function pp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries,o=Zs(t),i=[];lp(o,s,e),o.state.refusal===null&&up(o,t,s,i);let a=Pi(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return Qs(o,t,a,i,{lane_id:e,correction:r})}function fp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries;return Qs(Zs(t),t,Pi(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}],[],{lane_id:e,correction:r})}function _p(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Zs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Ks(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Qs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:cp(t,n,e,n.entries)})}function mp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Ks(n,i)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${pl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function gp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function bp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function _l(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var zh="\uC0AC\uC774\uD074";function hp(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let a=dl(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:a,...a?{reason:zh}:{}})}return o.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),o}function yp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var vp={running:3,paused:2,failed:1};function Lr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function wp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function kp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Lr(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Lr(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),g=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!g&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,u=o.get(i.bead_id);if(u){let d=vp[u.run_state],g=vp[a];if(d>g||d===g&&(u.started_at??0)>(l??0))continue}o.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:o,resumed_from_ids:r}}var $p=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Xs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Mi(e,t){let n=$p.find(s=>s.step===e);if(!n)return null;let r=$p.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function xp(e){let t=Xs.findIndex(n=>n.step===e);return Xs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Ir(e){let t=Xs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Hh(e){let t=Xs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Xs.length}}function Di(e){let t=Hh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var gl=new Set(["queued","running","retry_pending"]),Ap=new Set(["failed","succeeded"]),Gh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Js={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Kh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Js.base_containment,child_sweep:Js.child_sweep,branch_cleanup:Js.branch_cleanup,parent_close:Js.parent_close};function Vh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Yh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...gl,...Ap].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Zh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function ml(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Gh[s];if(!o)return null;let i=Mi(n,`${r} ${o}`);return i?{...i,active:gl.has(s),failed:s==="failed"}:null}function Qh(e){return!e||typeof e!="object"?null:Kh[e.step]||null}function eo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Qh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Vh(e.merge_sha)?e.merge_sha:null,l=!o&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Yh(k,t,a)).sort(Zh):[],u=i?l:[],d=u.find(k=>gl.has(k.state));if(d)return ml(d);if(s)return s.step==="repo_operations"&&l[0]?ml(l[0],!0):null;let g=u.find(k=>Ap.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(g)return ml(g);if(r){let k=Mi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Js[e.cleanup_cursor]:null;if(!h)return null;let b=Mi(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Ni(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Xh="\uBBF8\uC801\uC7AC";function bl(e,t){let n=Lo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function Sp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let u=bl(o,{id:l,location_label:s.get(l)||Xh}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),a.push(u)}a.length>0&&r.set(o,a)}return r}function hl(e,t){return`${e}\0${t}`}function Ep(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function yl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function to(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Tp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${to(s)})`,location_label:to(s),scope:null,same_lane_ahead:!1};let i=yl(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function Cp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=hl(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=hl(a.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of h){let N=r.get(k);N&&N!==u&&!b.includes(N)&&b.push(N)}}let o=(a,l)=>{let u=new Set,d=[a];for(;d.length>0;){let g=d.pop();if(g===l)return!0;!g||u.has(g)||(u.add(g),d.push(...s.get(g)||[]))}return!1},i=new Map;for(let[a,l]of s){let u=[];for(let d of l){let g=n.get(d);o(d,a)&&g&&u.push(g)}u.length>0&&i.set(a,u)}return i}function Rp(e,t){return hl(e,t)}var Op=1,no=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],wl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ls={show_blocked:!0,spec:"all"},Lp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Jh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Lr(r)||(n=typeof r.status=="string"?r.status:null);return n}function ey(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Lr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function ty(e,t){let{winners:n,resumed_from_ids:r}=kp(e,t),s=new Map;for(let[o,i]of n){let a=i.attempt,l=i.run_state,u=i.started_at,d=typeof a.session_id=="string"&&a.session_id.length>0;s.set(o,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:Tn(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(a.attempt_id)})}return s}function Ip(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function jt(e){return e&&typeof e=="object"?e:{}}function ny(e,t,n){let r=jt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let a=h=>hn({pin:h,global:i,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let d=Pp(Or(l,o),Or(u,o)),g=Pp(_r(l,null),_r(u,null));return d||g?{orchestration:d,worker:g}:null}function Pp(e,t){return!e||t&&t.text===e.text?null:e}function Mp(e,t){let n=yl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ry(e,t,n){let r=t.get(e);if(!r)return Mp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return to(r)}function sy(e,t,n,r){let s=t.get(e);if(!s)return{label:Mp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),a=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${a} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":to(s),title:""}}function oy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function iy(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ay(e,t,n,r,s,o,i){let a=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let g=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((V,ae)=>{let X=V&&typeof V.bead_id=="string"?V.bead_id:"";if(X.length===0)return;let B=V&&typeof V.root_dir=="string"?V.root_dir:"",L=n.get(X),j=L?L.state:void 0,Y=j==="running"||j==="pr_wait"||j==="done",Q=!L||j==="runnable",ce=L&&L.lane==="parallel"&&typeof L.position=="number"?L.position-1:null,U=sy(X,n,r,t),ee=b.length>0?b[b.length-1].id:null,ne=g==="confirmed"&&ee!==null&&!(t.get(X)||[]).includes(ee);b.push({id:X,title:s.get(X)||X,root_dir:L?L.root_dir:B,workspace_name:L?L.workspace_name:o.get(B)||"",seq:ae+1,location_label:U.label,location_title:U.title,draggable:!Y,fixed:Y,done:j==="done",unplaced:Q,mismatch:ne,...ce!==null?{queue_index:ce}:{}})}),b.forEach((V,ae)=>{V.seq=ae+1});let k=b.length>0&&b.every(V=>V.done),N=b.filter(V=>!V.fixed&&i.armed_by_bead.get(V.id)!==d).map(V=>V.id),G=iy(d,g,b,k,N,i);a.push({lane_id:d,status:g,draft:g==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:g==="draft"&&b.length>=2,has_mismatch:g==="confirmed"&&b.some(V=>V.mismatch||V.unplaced),unlaunched:N,...G})}),a}function ly(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function cy(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:g,state:h}=ly(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:g})}let i=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,g=i.get(d);g?g.push(l):i.set(d,[l])}let a=(l,u,d)=>{let g=u.cards[0],h={id:g.id,title:g.title,location_label:ry(g.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of i.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let g=Ti(l[u].scope,l[d].scope);g.length!==0&&(a(l[u],l[d],g),a(l[d],l[u],g))}}function vl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function qi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function kl(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...ls,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&no.some(E=>E.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&u.set(E.root_dir,E);let d=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&d.set(E.root_dir,E.name||E.root_dir);for(let E of r)E&&typeof E.root_dir=="string"&&d.set(E.root_dir,E.name||E.root_dir);let g=[],h=[],b=[],k=[],N=[],G=[],V=new Map,ae=new Map,X=new Map,B=new Map,L=new Map,j=new Map,Y=new Map,Q=new Set,ce=new Map,U=new Map,ee=new Map;for(let E of r){if(!E||typeof E.root_dir!="string")continue;let se=E.root_dir,Ce=E.name||se,Pe=u.get(se),Qe=Pe&&typeof Pe.revision=="number"?Pe.revision:typeof E.revision=="number"?E.revision:0,st=jt(E.attempts),ot=jt(E.bead_titles);for(let[I,C]of Object.entries(ot))typeof C=="string"&&C.length>0&&ee.set(I,C);let mt=jt(E.bead_times),te=jt(E.pr_observations),K=jt(E.admission),be=jt(E.revise_parked),pt=jt(E.merge_queue_state),et=jt(E.cleanup_failed),Oe=jt(E.discard_operations),qe=jt(E.bead_blocked_by);Object.hasOwn(E,"bead_scope")&&ce.set(se,jt(E.bead_scope));let lt=jt(E.bead_workflow),_t=jt(E.pr_activity),ct=Array.isArray(E.repo_operations)?E.repo_operations:[],Tt=Array.isArray(E.merge_queue)?E.merge_queue:[],Jt=new Set(Tt.filter(I=>I&&typeof I.bead_id=="string").map(I=>I.bead_id)),Yt=new Map(Tt.filter(I=>I&&typeof I.bead_id=="string").map(I=>[I.bead_id,I])),Bt=Array.isArray(E.queue)?E.queue:[];for(let I of[...Bt,...Array.isArray(E.pr_wait)?E.pr_wait:[]])I&&typeof I.bead_id=="string"&&typeof I.armed_by_lane=="string"&&I.armed_by_lane.length>0&&j.set(I.bead_id,I.armed_by_lane);for(let I of Array.isArray(E.disarmed_on_load)?E.disarmed_on_load:[])typeof I=="string"&&I.length>0&&Q.add(I);let Ot=(Array.isArray(E.serial_lanes)?E.serial_lanes:[]).filter(I=>I&&/^s[1-5]$/.test(I.id)&&Array.isArray(I.entries)),ht=jt(E.lane_states),We=typeof E.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(E.serial_lane_count))):Math.min(5,Ot.length);X.set(se,We),B.set(se,Bt.length);let R=new Map(Ot.map(I=>[I.id,I])),J=new Map;for(let I of Ot)for(let C of I.entries)C&&typeof C.bead_id=="string"&&J.set(C.bead_id,I.id);for(let[I,C]of Object.entries(qe))Array.isArray(C)&&L.set(I,C.filter(ge=>typeof ge=="string"&&ge.length>0));let pe=Array.isArray(E.done)?E.done:[];for(let I of pe)I&&typeof I.bead_id=="string"&&G.push({id:I.bead_id,root_dir:se,workspace_name:Ce});let T=new Map;for(let I of pe)I&&typeof I.bead_id=="string"&&typeof I.added_at=="number"&&T.set(I.bead_id,I.added_at);let H=I=>({id:I,title:ot[I]||I,root_dir:se,workspace_name:Ce,expected_revision:Qe,draggable:!1,...jt(mt[I]).created_at?{created_at:jt(mt[I]).created_at}:{},...jt(mt[I]).updated_at?{updated_at:jt(mt[I]).updated_at}:{}}),Le=I=>{let C=lt[I]?.chips?.pr;return C&&typeof C.number=="number"&&typeof C.url=="string"?{pr_number:C.number,pr_url:C.url}:{}},Fe=I=>Object.hasOwn(qe,I)?{blocked_by:Array.isArray(qe[I])?qe[I].filter(C=>typeof C=="string"&&C.length>0):[]}:{},Ae=new Set;for(let[I,C]of ty(st,T)){Ae.add(I);let ge=C.run_state==="failed"?oy(st,C.attempt_id):null;ge!==null&&Y.set(I,ge),h.push({...H(I),lane:"running",...Fe(I),...J.has(I)?{serial_lane_id:J.get(I)}:{},attempt_id:C.attempt_id,run_state:C.run_state,status:C.status||void 0,workflow:lt[I]||null,can_pause:C.can_pause,can_resume:C.can_resume,started_at:C.started_at,last_event_at:C.last_event_at,last_activity:C.last_activity,legs:C.legs,runner:C.runner,model:C.model,effort:C.effort,speed:C.speed,resumed_from:C.resumed_from,continuation_mode:C.continuation_mode,usage:C.usage,exec_chips:{orchestration:Hs(C),worker:null},discard:Bn(Oe,I,{attempt_id:C.attempt_id}),badges:C.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:C.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:C.run_state==="failed"})}for(let[I,C]of wp(st)){if(h.some(we=>we.id===I))continue;let ge=C.attempt,Ue=C.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(I),lane:"running",kind:"session",...Fe(I),attempt_id:typeof ge.attempt_id=="string"?ge.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:lt[I]||null,can_pause:!1,can_resume:!1,started_at:C.started_at,last_event_at:typeof ge.last_event_at=="number"?ge.last_event_at:null,last_activity:ge.last_activity&&typeof ge.last_activity=="object"?ge.last_activity:null,legs:Array.isArray(ge.legs)?ge.legs:[],runner:typeof ge.runner=="string"?ge.runner:null,model:typeof ge.model=="string"?ge.model:null,effort:typeof ge.effort=="string"?ge.effort:null,speed:typeof ge.speed=="string"?ge.speed:null,resumed_from:null,continuation_mode:null,usage:ge.usage&&typeof ge.usage=="object"?ge.usage:null,exec_chips:{orchestration:Hs(ge),worker:null},discard:Bn(Oe,I,{merge_queued:!0}),badges:[C.origin==="auto"?`${Ue} \xB7 \uC790\uB3D9`:Ue],alert:!1})}for(let I of Array.isArray(E.session_active)?E.session_active:[]){let C=I&&I.bead_id;typeof C!="string"||Ae.has(C)||(Ae.add(C),Array.isArray(I.blocked_by)&&I.blocked_by.length>0&&L.set(C,I.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)),typeof I.title=="string"&&I.title.length>0&&ee.set(C,I.title),h.push({...H(C),title:I.title||ot[C]||C,lane:"running",kind:"session",status:"in_progress",started_at:vl(I.started_at)??vl(I.updated_at)??void 0,updated_at:vl(I.updated_at)??void 0,workflow:I.workflow||null,labels:Array.isArray(I.labels)?I.labels:[],spec_id:typeof I.spec_id=="string"?I.spec_id:"",blocked:I.blocked===!0,...Array.isArray(I.blocked_by)?{blocked_by:I.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(I.session_refs)?I.session_refs:[],badges:[],alert:!1}))}for(let I of Array.isArray(E.pr_wait)?E.pr_wait:[]){let C=I&&I.bead_id;if(typeof C!="string"||Ae.has(C))continue;Ae.add(C);let ge=jt(te[C]),Ue=jt(ge.pr),we=ge.gate?jt(ge.gate):null,Ye=Jt.has(C),kt=Yt.get(C)?.continuation_action||null,$t=!!kt&&kt.continuation===null,At=pt.active===C,Lt=I.external===!0,It=et[C]||null,vn=jt(_t[C]),Me=eo({bead_id:C,merge_sha:I.merge_sha,cleanup_cursor:I.cleanup_cursor,merge_progress:vn.merge_progress||null,cleanup_failed:It,repo_operations:ct}),en=Ni(Me),tn=!!we&&we.base_badge==="\uCDA9\uB3CC",on=!!It&&["child_sweep","branch_cleanup","parent_close"].includes(It.step)&&!!we&&we.tier==="merged",it=Lt&&!!It&&!!we&&we.tier==="merged",nn=!!we&&["closed_unmerged","review","undecidable"].includes(we.tier)&&we.reason!=="review_receipt_undetermined",Re=Bn(Oe,C,{external:Lt,merge_active:At||Me?.step==="merge",merge_queued:Ye,cleanup_active:en,merged:!!It||we?.tier==="merged"}),S=!!Re.operation;b.push({...H(C),lane:"pr_wait",...Fe(C),workflow:lt[C]||null,pr_number:typeof Ue.number=="number"?Ue.number:null,pr_url:typeof Ue.url=="string"?Ue.url:void 0,external:Lt,usage:Tn(st,C),merge_step:Me,badges:$t?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Me?[we?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:It?[Ir(It.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ir(It.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof we?.gate_badge=="string"&&we.gate_badge.length>0?[we.gate_badge]:[],alert:Me?Me.failed===!0:!!It||nn,reason:It&&Me?.active!==!0?Di(It.step):"PR \uB300\uAE30",merge_action:we?.tier==="merged"&&!on&&!it?!1:!Ye||$t,merge_enabled:!S&&($t||we?.enabled===!0||tn||on||it),merge_label:$t?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":it||on?"\uC815\uB9AC \uC7AC\uAC1C":tn&&!on?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$t?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":S?Re.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Re.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Re.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:it?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":on?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":tn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ye&&!$t,cancel_enabled:!At,continuation_mismatch:kt?.mismatch||null,discard:Re,discard_action:Re.action,discard_enabled:Re.enabled,discard_title:Re.title})}let Xe=(I,C,ge,Ue)=>{let we=I&&I.bead_id;if(typeof we!="string"||Ae.has(we))return null;Ae.add(we);let Ye=be[we],kt=Bn(Oe,we),$t=kt.operation?kt:null,At={...H(we),lane:C,workflow:lt[we]||null,draggable:!$t,discard:$t||void 0,reason:Ip(K,we),seq:ge+1,queue_position:ge+1,queue_index:ge,queue_length:Ue,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!$t,revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Lt=Fe(we);return Object.hasOwn(Lt,"blocked_by")&&(At.blocked_by=Lt.blocked_by),At};for(let I=0;I<Bt.length;I++){let C=Xe(Bt[I],"queue",I,Bt.length);if(!C)continue;k.push(C);let ge=V.get(se);ge?ge.push(C):V.set(se,[C])}let ut=I=>{let C=b.find(Ye=>Ye.id===I&&Ye.root_dir===se);if(C)return{id:I,title:C.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ge=h.find(Ye=>Ye.id===I&&Ye.root_dir===se),Ue=ge?ge.run_state:Jh(st,I),we=Ue==="failed"||Ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:I,title:ge?ge.title:H(I).title,badge:we}},ze=[];for(let I=0;I<Math.max(We,Ot.length);I++){let C=`s${I+1}`,ge=R.get(C),Ue=ge&&Array.isArray(ge.entries)?ge.entries:[],we=jt(ht[C]),Ye=Array.isArray(we.occupied_by)?we.occupied_by.filter(At=>typeof At=="string"):[],kt=new Set(Ye),$t=[];for(let At=0;At<Ue.length;At++){let Lt=Ue[At]&&Ue[At].bead_id;if(typeof Lt=="string"&&kt.has(Lt)){Ae.add(Lt);continue}let It=Xe(Ue[At],C,At,Ue.length);It&&($t.push(It),k.push(It))}$t.length===0&&Ye.length===0&&(We<=1||I>=We)||ze.push({id:C,index:I,items:$t,raw_length:Ue.length,occupied_by:Ye,occupants:Ye.map(At=>ut(At)),corrections:Array.isArray(we.corrections)?we.corrections.length:0,cycle:we.cycle===!0,...$t.length===0&&Ye.length===0?{empty:!0}:{}})}ae.set(se,ze);let tt=Array.from({length:We},(I,C)=>{let ge=`s${C+1}`,Ue=R.get(ge),we=Ue&&Array.isArray(Ue.entries)?Ue.entries:[],Ye=jt(ht[ge]);return{id:ge,index:we.length,length:we.length,occupied_by:Array.isArray(Ye.occupied_by)?Ye.occupied_by.filter(kt=>typeof kt=="string"):[]}});for(let I of Array.isArray(E.runnable)?E.runnable:[]){let C=I&&I.bead_id;if(typeof C!="string"||Ae.has(C))continue;Ae.add(C);let ge=I.workflow&&typeof I.workflow=="object"?I.workflow:null,Ue=ge&&typeof ge.route=="string"&&ge.route||(typeof I.route=="string"?I.route:null),we=ny(jt(Pe),I.exec_pins,Ue);Array.isArray(I.blocked_by)&&I.blocked_by.length>0&&L.set(C,I.blocked_by.filter(Ye=>typeof Ye=="string"&&Ye.length>0)),typeof I.title=="string"&&I.title.length>0&&ee.set(C,I.title),Array.isArray(I.scope)&&U.set(C,I.scope.filter(Ye=>typeof Ye=="string"&&Ye.length>0)),g.push({...H(C),title:I.title||ot[C]||C,lane:"runnable",draggable:!0,reason:Ip(K,C),created_at:I.created_at??void 0,updated_at:I.updated_at??void 0,status:typeof I.status=="string"?I.status:void 0,labels:Array.isArray(I.labels)?I.labels:[],spec_id:typeof I.spec_id=="string"?I.spec_id:"",published:I.published===!0,workflow:ge||(Ue?{route:Ue,chips:{route:Ue}}:null),...we?{exec_chips:we}:{},blocked:I.blocked===!0,...Array.isArray(I.blocked_by)?{blocked_by:I.blocked_by.filter(Ye=>typeof Ye=="string"&&Ye.length>0)}:{},place_index:Bt.length,place_lanes:tt})}for(let I of pe){let C=I&&I.bead_id;if(typeof C!="string"||Ae.has(C)||(Ae.add(C),o!==void 0&&typeof I.added_at=="number"&&I.added_at<o))continue;let ge=ey(st,C),Ue=ge&&typeof ge.done_kind=="string"?ge.done_kind:null;N.push({...H(C),lane:"done",done:!0,done_layout:"three_line",usage:Tn(st,C),work_ms:hi(st,C),done_at:typeof I.added_at=="number"?I.added_at:void 0,done_kind:Ue,...Le(C),badges:[...Ue&&Lp[Ue]?[Lp[Ue]]:[],...bi(st,C)]})}}let ne=new Map;s.forEach((E,se)=>{E&&typeof E.root_dir=="string"&&ne.set(E.root_dir,se)});let oe=n&&n.running_sort==="repo"?"repo":"started";h.sort((E,se)=>{let Ce=E.kind==="session",Pe=se.kind==="session";if(Ce!==Pe)return Ce?1:-1;if(Ce&&Pe){let ot=qi(se.updated_at)-qi(E.updated_at);return ot!==0?ot:E.id.localeCompare(se.id)}if(oe==="repo"){let ot=ne.get(E.root_dir)??Number.MAX_SAFE_INTEGER,mt=ne.get(se.root_dir)??Number.MAX_SAFE_INTEGER;if(ot!==mt)return ot-mt}let Qe=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,st=typeof se.started_at=="number"&&Number.isFinite(se.started_at)?se.started_at:null;return Qe!==null&&st!==null&&Qe!==st?Qe-st:Qe===null&&st!==null?1:Qe!==null&&st===null?-1:E.id.localeCompare(se.id)}),N.sort((E,se)=>(se.done_at??0)-(E.done_at??0));let ye=s.length>0?s:r.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),Ne=new Set(g.map(E=>E.root_dir)),he=[];for(let E of ye){if(!E||typeof E.root_dir!="string")continue;let se=V.get(E.root_dir)||[],Ce=ae.get(E.root_dir)||[];!(se.length>0||Ce.some(Qe=>Qe.items.length>0||Qe.occupied_by.length>0))&&!Ne.has(E.root_dir)||he.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=Op?E.slots:Op,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:jt(E.runner_catalog),items:se,sublanes:{parallel:se,serial:Ce},serial_lane_count:X.get(E.root_dir)||0,raw_queue_length:B.get(E.root_dir)||0})}let Z={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:he,running:h,pr_wait:b,done:N,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},ve=Ep(Z);for(let E of G)ve.has(E.id)||ve.set(E.id,{root_dir:E.root_dir,workspace_name:E.workspace_name,lane:"done",state:"done"});for(let E of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){if(!Object.hasOwn(E,"blocked_by"))continue;let se=ve.get(E.id);E.blockers=(E.blocked_by||[]).map(Ce=>Tp(Ce,se,ve,s))}for(let E of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let se=(E.blockers||[]).map(Pe=>({...bl(E.id,Pe),openable:!0}));if(se.length===0)continue;let Ce={predecessors:se};E.dependency_chips=Ce}cy(Z,ce,U,ve,s);let Ee=Cp(Z.queue_groups);for(let E of Z.queue_groups)for(let se of E.sublanes.serial){let Ce=Ee.get(Rp(E.root_dir,se.id));Ce&&(se.cross_wait_peers=Ce)}Z.chain_lanes=ay(a&&Array.isArray(a.lanes)?a.lanes:[],L,ve,s,ee,d,{armed_by_bead:j,failed_by_bead:Y,disarmed_lanes:Q});let W=new Map;for(let E of[...Z.queue,...Z.runnable])W.has(E.id)||W.set(E.id,E);let P=new Set;for(let E of Z.chain_lanes)for(let se of E.rows){if(E.status==="confirmed"&&!se.unplaced&&!se.fixed&&P.add(se.id),!E.draft&&!se.unplaced)continue;let Ce=W.get(se.id);Ce&&(Ce.cross_lane_chip={lane_id:E.lane_id,number:E.number,status:E.status,label:E.draft?`\uC5F0\uACB0 ${E.number} (draft)`:`\uC5F0\uACB0 ${E.number}`})}let _e=new Map(Z.chain_lanes.map(E=>[E.lane_id,E.number]));for(let E of[...Z.queue,...Z.running]){let se=j.get(E.id);if(typeof se!="string"||se.length===0)continue;let Ce=_e.get(se);E.armed_lane_chip=Ce===void 0?{lane_id:se,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:se,label:`\u25B6 \uC5F0\uACB0 ${Ce}`,orphan:!1}}let $e=[];for(let E of V.values())for(let se of E)P.has(se.id)||$e.push(se);$e.sort((E,se)=>{let Ce=E.workspace_name.localeCompare(se.workspace_name);return Ce!==0?Ce:(E.queue_index??0)-(se.queue_index??0)}),Z.parallel_rows=$e;let Ie={};for(let[E,se]of ve)typeof se.root_dir=="string"&&se.root_dir.length>0&&(Ie[E]=se.root_dir);for(let E of Z.chain_lanes)for(let se of E.rows)!Object.hasOwn(Ie,se.id)&&se.root_dir.length>0&&d.has(se.root_dir)&&(Ie[se.id]=se.root_dir);Z.owner_of=Ie;let fe=Z.runnable.length;Z.runnable_all=Z.runnable.slice();let Te=Z.runnable;i.show_blocked||(Te=Te.filter(E=>E.blocked!==!0));let St=Te.length;i.spec==="with"?Te=Te.filter(E=>E.published===!0):i.spec==="without"&&(Te=Te.filter(E=>E.published!==!0)),Z.runnable_hidden={blocked:fe-St,spec:St-Te.length};let nt=(E,se)=>{let Ce=qi(se.updated_at)-qi(E.updated_at);return Ce!==0?Ce:E.id.localeCompare(se.id)},vt=l==="repo_spec"?(E,se)=>{let Ce=E.published===!0?0:1,Pe=se.published===!0?0:1;return Ce!==Pe?Ce-Pe:nt(E,se)}:nt;if(l==="updated_flat")Z.runnable=Te.slice().sort(nt),Z.runnable_sections=[];else{let E=new Map;for(let Pe of Te){let Qe=E.get(Pe.root_dir);Qe?Qe.push(Pe):E.set(Pe.root_dir,[Pe])}let se=[],Ce=[];for(let Pe of ye){if(!Pe||typeof Pe.root_dir!="string")continue;let Qe=(E.get(Pe.root_dir)||[]).slice().sort(vt);E.delete(Pe.root_dir),Qe.length!==0&&(se.push({root_dir:Pe.root_dir,name:Pe.name||Pe.root_dir,items:Qe.map(st=>({...st,workspace_name:""}))}),Ce.push(...Qe))}for(let[Pe,Qe]of E){let st=Qe.slice().sort(vt);se.push({root_dir:Pe,name:st[0]?.workspace_name||Pe,items:st.map(ot=>({...ot,workspace_name:""}))}),Ce.push(...st)}Z.runnable=Ce,Z.runnable_sections=se}return Z}var Dp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",uy=1e4;function Np(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function qp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Up="bdui.monitor.done-range",Wp="bdui.monitor.running_sort",zp="bdui.monitor.candidate_sort",Hp="beads-ui.monitor.candidate-filter",Gp="beads-ui.monitor.sections";function dy(){try{let e=window.localStorage.getItem(Hp);if(!e)return{...ls};let t=JSON.parse(e);return!t||typeof t!="object"?{...ls}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ls.show_blocked,spec:wl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ls}}}function Fp(e){try{window.localStorage.setItem(Hp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function py(){try{let e=window.localStorage.getItem(zp);return no.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function fy(e){try{window.localStorage.setItem(zp,e)}catch{}}function _y(){try{let e=window.localStorage.getItem(Gp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function my(e){try{window.localStorage.setItem(Gp,JSON.stringify(e))}catch{}}function gy(){try{let e=window.localStorage.getItem(Up);return e===null?"today":Hn(e)}catch{return"today"}}function by(e){try{window.localStorage.setItem(Up,e)}catch{}}function hy(){try{return window.localStorage.getItem(Wp)==="repo"?"repo":"started"}catch{return"started"}}function yy(e){try{window.localStorage.setItem(Wp,e)}catch{}}var Kp="tab:monitor:pipeline",vy=1e3,jp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],wy=["queue","runnable","done"],Bp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ky(e){return e>=1&&e<=Bp.length?Bp[e-1]:`(${e})`}function Vp(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),g=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),h=gy(),b=hy(),k=dy(),N=py(),G=_y(),V=mi("beads-ui.monitor.lane-collapsed"),ae=!1,X=null,B=null,L=null,j=null,Y=null,Q=[],ce=null,U=null,ee=null,ne=null;function oe(f){return ne===null&&(ne=nn()),ap(f,ne)}function ye(f,m){Ne(),!(m<=0)&&(U={lane_id:f,corrected:m},ee=setTimeout(()=>{ee=null,U=null,C()},uy))}function Ne(){ee!==null&&(clearTimeout(ee),ee=null),U=null}function he(){let f=Br.find(m=>m.value===h);return f?f.label:""}let Z=document.createElement("div");Z.className="mon",e.appendChild(Z);let ve=document.createElement("div");ve.className="worker-drawer-overlay",ve.hidden=!0;let Ee=document.createElement("div");Ee.className="worker-drawer-overlay__backdrop";let W=document.createElement("div");W.className="worker-drawer-host mon2-drawer",ve.append(Ee,W),e.appendChild(ve);let P=kl(null,null),_e=new Map,$e=new Map,Ie=null,fe=null,Te=null,St=ts(W,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,ve.hidden=!0,C()}});async function nt(f,m,y,w,q=!0){if(!o||!y)return null;let x=await o(f,{...m,root_dir:y,expected_revision:w});if(x&&x.conflict&&q){x.queue&&$e.set(y,x.queue);let z=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:w;x=await o(f,{...m,root_dir:y,expected_revision:z})}return x&&x.queue&&y&&$e.set(y,x.queue),x}function ft(f,m){let y=$e.get(f),w=s&&s.get?s.get():null,q=(Array.isArray(w)?w:[]).find(z=>z?.root_dir===f);return(y||q)?.merge_queue?.find(z=>z.bead_id===m)?.continuation_action}async function vt(f,m,y,w){let q=await nt(f,m,y,w),x=$e.get(y)?.revision??q?.queue?.revision??w;return Jn(q,(z,ie)=>nt(f,{...m,continuation:z,decision_token:ie},y,x,!1),{refresh:z=>nt(f,m,y,z?.queue?.revision??$e.get(y)?.revision??x,!1)})}async function E(f,m,y,w){let q=await Jn({continuation_mismatch:w},(z,ie)=>nt("worker-merge-queue-add",{bead_id:m,continuation:z,decision_token:ie},f,y,!1)),x=q?.queue?.merge_queue?.find(z=>z.bead_id===m)?.continuation_action;q?.applied!==!0&&x?.continuation===null&&x.mismatch&&await E(f,m,q.queue.revision,x.mismatch)}async function se(f,m,y){let w=await nt("worker-discard",f,m,y);if(w&&w.discarded===!0){ue(vi(w),"success",5e3);return}if(w&&w.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${w.reason}`,"error");return}if(w&&w.accepted&&w.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(w&&w.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${w.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}w&&!w.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ce(f,m,y){return!o||!y?null:await o(f,{...m,root_dir:y})}async function Pe(){let f=new Map;for(let m of P.pr_wait)f.has(m.root_dir)||f.set(m.root_dir,m.expected_revision);for(let[m,y]of f)await nt("worker-merge-queue-add-all",{},m,y)}function Qe(f){let m=G[f];return!!(m&&m.runnable===!0)}function st(f){let m={...G[f]||{}};m.runnable=!m.runnable,G={...G,[f]:m},my(G),C()}function ot(f){V.toggle(f),C()}function mt(f){V.toggleArea(f),C()}function te(f){let m=P.queue_groups.find(y=>y.root_dir===f);if(!m)return null;for(let y=0;y<m.serial_lane_count;y+=1){let w=`s${y+1}`,q=m.sublanes.serial.find(x=>x.id===w);if(!q||q.raw_length===0&&q.occupied_by.length===0)return w}return null}function K(f,m){let y=P.queue_groups.find(q=>q.root_dir===f),w=y?y.sublanes.serial.find(q=>q.id===m):void 0;return w?w.raw_length:0}function be(f,m){let y=_e.get(f),w=_e.get(m);if(!y||!w)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let q=Np(y),x=Np(w);if(q!==null&&q===x&&y.root_dir===w.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let z=qp(y),ie=qp(w);if(z&&x!==null){let Ke=x;return{kind:"ops",title:`${Ke} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:f,lane:Ke,index:K(w.root_dir,Ke)}]}}if(q!==null&&ie&&x===null){let Ke=q;return{kind:"ops",title:`${Ke} \uB05D\uC5D0 ${m}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:m,lane:Ke,index:K(y.root_dir,Ke)}]}}if(z&&q===null&&ie&&x===null){let Ke=te(y.root_dir);return Ke===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ke} \uB808\uC778\uC5D0 ${m} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:m,lane:Ke,index:0},{bead_id:f,lane:Ke,index:1}]}}return!z&&!ie?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:z?{kind:"note",text:`${zs(w.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(y.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function pt(f,m){let y=be(f,m.id);return{id:m.id,title:m.title,location_label:m.location_label,prefixes:m.prefixes,action:y.kind==="note"?{kind:"note",text:y.text}:y.kind==="disabled"?{kind:"disabled",label:Dp,title:y.title}:{kind:"place",label:Dp,title:y.title}}}function et(f,m){if(!j||j.bead_id!==f)return null;let y=j.counterpart_id,w=m.filter(q=>q.id===y);return w.length===0?null:{rows:w.map(q=>pt(f,q))}}function Oe(f){let m=f.dependency_chips||null,y=f.overlap_chips||[],w=f.scope_state==="missing",q=f.cross_lane_chip,x=f.armed_lane_chip;if(!m&&y.length===0&&!w&&!q&&!x)return null;let z=et(f.id,y);return{...m||{},...y.length>0?{overlaps:y}:{},...w?{scope_missing:!0}:{},...q?{cross_lane:{lane_id:q.lane_id,label:q.label}}:{},...x?{armed_lane:x}:{},...z?{popover:z}:{}}}function qe(f){let m=Oe(f);return m?{...f,dependency_chips:m}:f}async function lt(f,m){let y=be(f,m);if(j=null,y.kind!=="ops"){C();return}let w=S(y.root_dir,y.ops[0].bead_id);for(let q of y.ops){let x=await _t(q,y.root_dir,w);if(x===null)break;w=x}C()}async function _t(f,m,y){try{let w=await nt("worker-queue-place",f,m,y,!1);if(w&&w.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!w||w.applied!==!0)return ue(w&&typeof w.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${w.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let q=w.queue?w.queue.revision:void 0;return typeof q!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):q}catch(w){return ue(Lt(w),"error"),null}}function ct(f){let m=Qe(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${m?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${m?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${m?"\u25B8":"\u25BE"}
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
    </header>`}function Tt(f,m){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${m}
    </div>`}function Jt(f){if(L!==f.id)return null;let m=P.queue_groups.find(x=>x.root_dir===f.root_dir),y=f.place_lanes||[],w=P.cross_lanes_revision!==null,q=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let x of P.chain_lanes)q.push({id:`lane:${x.lane_id}`,label:`\uC5F0\uACB0 ${x.number} (${x.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:x.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w});q.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!w,title:w?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let x of y)q.push({id:`serial:${x.id}`,label:`\uC9C1\uB82C ${Number(x.id.slice(1))}`,count:x.length,group:`${m?m.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:q}}function Yt(){let f=[],m=new Set,y=(w,q)=>{for(let x of w)m.has(x.id)||(m.add(x.id),f.push({bead_id:x.id,root_dir:x.root_dir,workspace_name:x.workspace_name,title:x.title,lane:q}))};return y(P.running,"running"),y(P.pr_wait,"pr_wait"),y(P.queue,"queue"),y(P.runnable_all,"runnable"),f}function Bt(f){if(!Y||Y.bead_id!==f)return"";let m=tn(),y=Yt(),w=new Map;for(let ie of y)w.set(ie.bead_id,ie);let q=(m.get(f)||[]).filter(ie=>w.has(ie)),x=yp(hp(f,{issues:y,blocked_by_map:m}),Y.query),z=P.owner_of[f];return c`<div
      class="mon-deppanel"
      data-bead-id=${f}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${q.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${q.map(ie=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${ie}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${f}
                data-dep-b=${ie}
                aria-label=${`${ie} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${Y.query}
      />
      <div class="mon-deppanel__list">
        ${x.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:x.map(ie=>c`<button
                  type="button"
                  class="mon-deppanel__cand${ie.disabled?" is-disabled":""}"
                  data-dep-cand=${ie.bead_id}
                  ?disabled=${ie.disabled}
                  title=${ie.reason||ie.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${ie.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${ie.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${ie.title}</span
                  >${ie.reason?c`<span class="mon-deppanel__cand-reason"
                        >${ie.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${z===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Ot(f){return Tt(f,c`${nl(qe(f),Jt(f),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:a?(m,y)=>a(y,f.root_dir):void 0})}${Bt(f.id)}`)}function ht(){return P.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${P.runnable.map(f=>Ot(f))}
      </div>`:c`${P.runnable_sections.map(f=>{let m=Qe(f.root_dir);return c`<section
        class="mon2-sec${m?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${ct({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${m?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(y=>Ot(y))}
            </div>`}
      </section>`})}`}function We(f,m=!1){return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="mon-dep__btn"
        data-bead-id=${f.id}
        title="의존성"
        aria-label="의존성"
      >
        ⛓
      </button>
      ${m?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${f.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${f.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${f.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function R(f,m){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${m}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Un(qe(f),{actions:We(f,!0)})}
      ${Bt(f.id)}
    </div>`}function J(f,m,y,w){return c`<div
      class="mon2-crow${m.fixed?" mon2-crow--fixed":""}"
      draggable=${m.draggable?"true":"false"}
      data-bead-id=${m.id}
      data-drag-kind="chain"
      data-root-dir=${m.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${y}
      data-queue-index=${typeof m.queue_index=="number"?String(m.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${ky(m.seq)}</span
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
      ${w.includes(m.id)?c`<span
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
    </div>`}function pe(f){let m=P.cross_lanes_revision!==null,y=oe(f.lane_id),w=y?.held===!0,q=y?.cycle===!0,x=y?y.mismatched:[],z=U&&U.lane_id===f.lane_id?U.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${z>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${z}건 자동 교정</span
            >`:""}
        ${q?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${w?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ii}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!m||!f.can_confirm||w}
              title=${w?Ii:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!m}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!m}
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
            </div>`:f.rows.map((ie,Ke)=>J(f,ie,Ke,x))}
      </div>
    </div>`}function T(f,m,y){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="repo-serial"
      data-root-dir=${m.root_dir}
      data-lane-id=${f.id}
      data-row-index=${y}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${Un(qe(m),{actions:We(m)})}
      ${Bt(m.id)}
    </div>`}function H(f){if(f.length===0)return"";let m=f.length-1;return`${f[0].id} \uC810\uC720${m>0?` +${m}`:""}`}function Le(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Un({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function Fe(f,m){let y=m.occupants,w=m.cross_wait_peers||[];return{id:m.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${m.index+1}`,rows:[...y.map(q=>Le(q)),...m.items.map((q,x)=>T(m,q,x))],count:m.items.length,empty:m.empty===!0,...y.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${y.map(q=>`${q.id} \u2014 ${q.badge}`).join(`
`)}
              >${H(y)}</span
            >`,held:!0}:{},cycle:m.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...w.length>0?{after:c`${w.map(q=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${q.workspace_name}·${q.lane}과 교차 대기
                </div>`)}`}:{}}}function Ae(){let f=P.cross_lanes_revision!==null,m=P.chain_lanes.some(y=>y.draft&&y.rows.length===0);return Ai({parallel:{rows:P.parallel_rows.map((y,w)=>R(y,w)),count:P.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:P.queue_groups.flatMap(y=>y.sublanes.serial.map(w=>({...Fe(y,w),drop:{drop:"repo-serial",root_dir:y.root_dir,lane_id:w.id,lane_length:String(w.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:P.chain_lanes.map(y=>pe(y)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${m||!f}
          title=${f?m?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...P.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Xe(f){return c`<div class="worker-rungrid">
      ${P.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:P.running.map(m=>al({bead_id:m.id,attempt_id:m.attempt_id||"",title:m.title,runner:m.runner??null,model:m.model??null,effort:m.effort??null,speed:m.speed??null,started_at:m.started_at??null,kind:m.kind,...m.kind==="session"?{updated_at:m.updated_at,session_refs:m.session_refs||[]}:{},workflow:m.workflow||null,resumed_from:m.resumed_from??null,continuation_mode:m.continuation_mode??null,paused:m.run_state==="paused",failed:m.run_state==="failed",status:m.status,status_label:m.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:m.can_resume!==!1,can_pause:m.can_pause!==!1,exec_chips:m.exec_chips||null,usage:m.usage||null,discard:m.discard},f,B,{monitor:{repo:m.workspace_name,root_dir:m.root_dir,serial_lane_id:m.serial_lane_id,last_activity:m.last_activity||null,legs:m.legs||[],dependency_chips:Oe(m)}}))}
    </div>`}function ut(f){let m={runnable:P.runnable,queue:P.queue,running:P.running,pr_wait:P.pr_wait,done:P.done},y=w=>{let q=m[w.lane],x=w.lane==="runnable"?P.runnable_flat?q.length>0?ht():void 0:P.runnable_sections.length>0?ht():void 0:w.lane==="queue"?P.queue_groups.length>0||P.chain_lanes.length>0||P.parallel_rows.length>0||P.cross_lanes_unreadable?Ae():void 0:w.lane==="running"?Xe(f):q.length>0?c`${q.map(z=>Un(z))}`:void 0;return Yn({id:`monitor-${w.lane}`,lane:w.pane,title:w.title,items:q,count:q.length,src:w.lane==="runnable",empty:w.empty,body:x,live:w.lane==="running"&&q.length>0,collapsible:!0,collapsed:V.isCollapsed(w.pane),controls:w.lane==="runnable"?ze():void 0,header_control:tt(w.lane,q.length)})};if(ae){let w=wy.map(q=>jp.find(x=>x.lane===q)).filter(q=>q!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Si({live:P.running.length>0,running_body:P.running.length>0?Xe(f):"",pr_wait_rows:P.pr_wait.map(q=>Un(q)),count:P.running.length+P.pr_wait.length})}
            ${w.map(q=>y(q))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${jp.map(w=>y(w))}
        </div>
      </div>`}function ze(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${P.runnable_hidden.blocked>0?` ${P.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${wl.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${P.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${P.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function tt(f,m){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${N}
      >
        ${no.map(y=>c`<option
              value=${y.value}
              ?selected=${N===y.value}
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
      </select>`:f==="pr_wait"&&m>0?c`<button
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
        ${Br.map(y=>c`<option value=${y.value} ?selected=${h===y.value}>
              ${y.label}
            </option>`)}
      </select>`:""}function I(f){let m=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],w=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,q={done_since:$r(h,d()),running_sort:b,candidate_filter:k,candidate_sort:N};return w!==void 0&&(q.cross_lanes=w),kl(m,y,q)}function C(){let f=d();P=I(),ne=null,_e=new Map;for(let m of[...P.runnable,...P.queue,...P.running,...P.pr_wait,...P.done])!m.non_occupying&&!_e.has(m.id)&&_e.set(m.id,m);rt(ut(f),Z),Ue()?.render(),ge(),we()}function ge(){let f=new Map;for(let m of P.queue_groups)f.set(m.root_dir,m.auto_advance);for(let m of Array.from(Z.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let y=m.closest(".mon2-item")?.getAttribute("data-root-dir")||"",w=f.get(y);typeof w=="boolean"&&m.setAttribute("title",`${m.textContent||""} \xB7 ${w?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ue(){if(Te)return Te;let f=Z.querySelector(".mon2-deck");return f?(Te=op(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>P.done,rangeLabel:he,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:kt,onFocusChange:m=>{ce=m,we()}}),Te):null}function we(){Z.classList.toggle("has-focus",ce!==null);for(let f of Array.from(Z.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",ce!==null&&f.getAttribute("data-root-dir")===ce);for(let f of Array.from(Z.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let m=_e.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",ce!==null&&!!m&&m.root_dir===ce)}for(let f of Array.from(Z.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",ce!==null&&f.getAttribute("data-root-dir")===ce)}function Ye(f,m){let y=i?i():void 0;if(!m||!y||m===y||!l){r(f);return}l(m).then(()=>{r(f)}).catch(w=>{n("workspace switch for %s failed: %o",m,w)})}function kt(f){if(!f)return;let m=i?i():void 0,y=()=>{try{u?.gotoView("worker")}catch(w){n("gotoView(worker) failed: %o",w)}};if(!l||m&&m===f){y();return}l(f).then(y).catch(w=>{n("workspace switch for %s failed: %o",f,w),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function $t(f){Mn(f).then(m=>{ue(m?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",m?"success":"error",1400)})}function At(f){let m=_e.get(f)||null;return{item:m,root_dir:m?m.root_dir:"",revision:m?m.expected_revision:0}}function Lt(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let m=f;if(typeof m.message=="string"&&m.message.length>0)return m.message;if(typeof m.error=="string"&&m.error.length>0)return m.error;if(m.error&&typeof m.error=="object"&&typeof m.error.message=="string")return m.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function It(f,m,y){let w=P.owner_of[m];if(typeof w!="string"||w.length===0){ue(`${m}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Ce(f,{a:m,b:y},w),await vn(f,m,y)}catch(q){ue(Lt(q),"error")}C()}async function vn(f,m,y){if(f!=="dep-add")return;let w=P.chain_lanes.find(q=>q.rows.some(x=>x.id===m));!w||!w.rows.some(q=>q.id===y)||await Vt(q=>fp(w.lane_id,q),"",[{type:f,a:m,b:y}])}function Me(f){return P.runnable.some(m=>m.id===f)||P.parallel_rows.some(m=>m.id===f)?!0:P.queue_groups.some(m=>m.sublanes.serial.some(y=>y.items.some(w=>w.id===f)))}function en(f){!f||!Me(f)||(Y=Y&&Y.bead_id===f?null:{bead_id:f,query:""},C())}function tn(){let f=new Map,m=s&&s.get?s.get():null,y=w=>Array.isArray(w)?w.filter(q=>typeof q=="string"&&q.length>0):[];for(let w of Array.isArray(m)?m:[]){if(!w||typeof w!="object")continue;let q=w.bead_blocked_by&&typeof w.bead_blocked_by=="object"?w.bead_blocked_by:{};for(let[x,z]of Object.entries(q))Array.isArray(z)&&f.set(x,y(z));for(let x of[...Array.isArray(w.runnable)?w.runnable:[],...Array.isArray(w.session_active)?w.session_active:[]])x&&typeof x.bead_id=="string"&&Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&f.set(x.bead_id,y(x.blocked_by))}return f}function on(){let f=new Map,m=new Map,y=s&&s.get?s.get():null,w=q=>Array.isArray(q)?q.filter(x=>typeof x=="string"&&x.length>0):[];for(let q of Array.isArray(y)?y:[]){if(!q||typeof q!="object")continue;let x=q.bead_blocked_by&&typeof q.bead_blocked_by=="object"?q.bead_blocked_by:{};for(let[z,ie]of Object.entries(x))Array.isArray(ie)&&f.set(z,w(ie));for(let z of Array.isArray(q.runnable)?q.runnable:[])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&m.set(z.bead_id,w(z.blocked_by))}for(let q of Q)for(let x of[f,m]){let z=x.get(q.a);z!==void 0&&x.set(q.a,q.type==="dep-remove"?z.filter(ie=>ie!==q.b):z.includes(q.b)?z:[...z,q.b])}return{snapshot:f,runnable:m}}function it(){let f=tn();for(let m of Q){let y=(f.get(m.a)||[]).slice();m.type==="dep-remove"?f.set(m.a,y.filter(w=>w!==m.b)):y.includes(m.b)||f.set(m.a,[...y,m.b])}return f}function nn(f=P,m=Re()){let y=new Map;for(let dt of Array.isArray(m?.lanes)?m.lanes:[]){let mn=new Map;for(let zt of Array.isArray(dt?.entries)?dt.entries:[])zt&&typeof zt.bead_id=="string"&&mn.set(zt.bead_id,zt.dep_created_by_lane===!0);y.set(typeof dt?.id=="string"?dt.id:"",mn)}let w=new Map,q=new Map,x=new Set,z=new Set;for(let dt of f.chain_lanes){let mn=y.get(dt.lane_id);w.set(dt.lane_id,{status:dt.status,entries:dt.rows.map((zt,br)=>({bead_id:zt.id,root_dir:zt.root_dir,...br===0?{}:{dep_created_by_lane:mn?.get(zt.id)===!0}}))});for(let zt of dt.rows)q.set(zt.id,dt.lane_id),zt.fixed&&x.add(zt.id),zt.unplaced||z.add(zt.id)}let ie=new Map;for(let dt of f.parallel_rows)typeof dt.queue_index=="number"&&ie.set(dt.id,dt.queue_index);for(let dt of f.queue_groups)for(let mn of dt.sublanes.serial)for(let zt of mn.items)typeof zt.queue_index=="number"&&ie.set(zt.id,zt.queue_index);let Ke=on();return{blocked_by_map:it(),snapshot_blocked_by:Ke.snapshot,runnable_blocked_by:Ke.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:w,owner_lane_of:q,fixed_members:x,placed_members:z,parallel_rows:f.parallel_rows.map(dt=>({bead_id:dt.id,root_dir:dt.root_dir,queue_index:dt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:ie}}function Re(){return(s&&s.crossLanes?s.crossLanes():null)??null}function S(f,m){let y=_e.get(m);if(y&&y.root_dir===f)return y.expected_revision;let w=P.queue_groups.find(q=>q.root_dir===f);return w?w.revision:0}async function me(f,m,y){if(f.type==="worker-queue-disarm"){try{let w=await nt(f.type,f.payload,f.root_dir,y.get(f.root_dir)??S(f.root_dir,m));w&&w.queue&&typeof w.queue.revision=="number"&&y.set(f.root_dir,w.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await Se(f.type,f.payload,f.root_dir,y,{bead_id:m})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await Ce(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch(w){return ue(Lt(w),"error"),!1}}async function Se(f,m,y,w,q){try{let x=await nt(f,m,y,w.get(y)??S(y,q.bead_id));return!x||typeof x.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(x.queue&&typeof x.queue.revision=="number"&&w.set(y,x.queue.revision),x.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):x.applied===!1?(ue(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):x.queue&&typeof x.queue.revision=="number"?x.queue.revision:w.get(y)??0)}catch(x){return ue(Lt(x),"error"),null}}function yt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(Q=[...Q,{type:f.type,a:f.a,b:f.b}])}async function Dt(f,m){if(!o)return{ok:!1};try{let y=await o(f.type,{...f.payload,expected_revision:m});return!y||typeof y.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:y.revision}}catch(y){let w=y,q=w&&w.code==="conflict"?w.details?.cross_lanes:null;return q&&typeof q.revision=="number"&&Array.isArray(q.lanes)?{ok:!1,conflict:q}:(ue(Lt(y),"error"),{ok:!1})}}async function Ct(f,m,y){let w=new Map,q=[],x=f.ops.slice(0,f.lane_op_index),z=f.ops.slice(f.lane_op_index);for(let Ke of x){if(!await me(Ke,y,w))return{done:!0};yt(Ke)}let ie=m;for(let Ke of f.lane_ops){if(ie===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let dt=await Dt(Ke,ie);if(!dt.ok)return dt.conflict?{done:!1,conflict:dt.conflict}:{done:!0};ie=dt.revision}for(let Ke of z){if(!await me(Ke,y,w))return{done:!0};yt(Ke),Ke.type==="dep-add"&&q.push(Ke)}for(let Ke of gp(q))ie=await Ut(Ke,ie);return{done:!0}}async function Ut(f,m){if(m===null||!o)return m;let y=f.pairs,w=m;for(let q=0;q<2;q+=1){if(y.length===0)return w;try{let x=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:y.map(z=>({bead_id:z.bead_id,after:z.after,value:!0})),expected_revision:w});return x&&typeof x.revision=="number"?x.revision:w}catch(x){let z=x,ie=z&&z.code==="conflict"?z.details?.cross_lanes:null;if(!ie||typeof ie.revision!="number"||!Array.isArray(ie.lanes))return w;let Ke=ie.lanes.find(dt=>dt&&dt.id===f.lane_id);y=bp(Array.isArray(Ke?.entries)?Ke.entries:[],y),w=ie.revision}}return w}async function Vt(f,m,y=[]){Q=y,Ne();let w=P,q=Re();for(let x=0;;x+=1){let z=f(nn(w,q));if("refused"in z){ue(z.refused,"error");break}let ie=await Ct(z,w.cross_lanes_revision,m);if(ie.done){z.correction&&ye(z.correction.lane_id,z.correction.corrected);break}if(x>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}w=I(ie.conflict),q=ie.conflict}Q=[],C()}async function rn(f,m){await Vt(y=>fl(f,m,y),f.bead_id)}async function wn(f,m){if(f==="run"){await An(m);return}if(f==="stop"){await Rn(m);return}if(f==="create"){await Vt(y=>_l(null,y),"");return}if(f==="remove"){let y=mp(m,nn());if(y!==null&&!g(y))return;await Vt(w=>_p(m,w),"");return}await Vt(y=>f==="confirm"?dp(m,y):pp(m,y),"")}function Pt(f){let m=new Map;for(let y of f.rows){let w=P.owner_of[y.id]||y.root_dir;typeof w!="string"||w.length===0||m.set(w,[...m.get(w)||[],y.id])}return m}async function An(f){let m=P.chain_lanes.find(x=>x.lane_id===f);if(!m||P.cross_lanes_revision===null){C();return}Ne();let y=new Map,w=new Map,q=Pt(m);for(let x of m.rows){if(!x.unplaced)continue;let z=P.owner_of[x.id]||x.root_dir;if(typeof z!="string"||z.length===0){ue(`${x.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),C();return}let ie=w.get(z)??0;if(await Se("worker-queue-place",{bead_id:x.id,lane:"parallel",index:(P.parallel_raw_length[z]??0)+ie},z,y,{bead_id:x.id})===null){C();return}w.set(z,ie+1)}for(let[x,z]of q)if(await Se("worker-queue-arm",{bead_ids:z,lane_id:f},x,y,{bead_id:z[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),C();return}C()}async function Rn(f){let m=P.chain_lanes.find(w=>w.lane_id===f);if(!m||P.cross_lanes_revision===null){C();return}Ne();let y=new Map;for(let[w,q]of Pt(m))if(await Se("worker-queue-disarm",{lane_id:f},w,y,{bead_id:q[0]})===null)break;C()}async function A(f,m){let{root_dir:y,revision:w}=At(f);if(y.length===0){C();return}await Se("worker-queue-disarm",{bead_ids:[f],lane_id:m},y,new Map([[y,w]]),{bead_id:f}),C()}async function O(f,m){let y=_e.get(f);if(!y){C();return}let w={kind:"candidate",bead_id:f,root_dir:y.root_dir};if(m==="new-lane"){await Vt(q=>_l({bead_id:f,root_dir:y.root_dir},q),f);return}if(m.startsWith("lane:")){let q=m.slice(5);if(!P.chain_lanes.find(z=>z.lane_id===q)){C();return}await Vt(z=>fl(w,{kind:"chain",lane_id:q,marker_index:(z.cross_lanes.get(q)?.entries??[]).length},z),f);return}if(m.startsWith("serial:")){let q=m.slice(7),x=(y.place_lanes||[]).find(z=>z.id===q);await rn(w,{kind:"repo-serial",root_dir:y.root_dir,lane_id:q,index:x?x.index:0});return}await rn(w,{kind:"parallel",marker_index:P.parallel_rows.length})}async function De(f,m){let y=P.parallel_rows,w=y.findIndex(dt=>dt.id===f);if(w<0)return;let q=y[w].root_dir,x=[];y.forEach((dt,mn)=>{dt.root_dir===q&&x.push(mn)});let z=x.indexOf(w),ie=x[z+m];if(typeof ie!="number")return;let Ke=m===-1?ie:x[z+2]??Math.min(y.length,ie+1);await rn({kind:"parallel",bead_id:f,root_dir:q,queue_index:y[w].queue_index??0},{kind:"parallel",marker_index:Ke})}async function je(f){for(let m of P.chain_lanes){let y=m.rows.find(w=>w.id===f);if(y){await rn({kind:"chain",bead_id:f,root_dir:y.root_dir,lane_id:m.lane_id,...typeof y.queue_index=="number"?{queue_index:y.queue_index}:{}},{kind:"parallel",marker_index:P.parallel_rows.length});return}}}let p=null,v=!1,F=null;function de(){F!==null&&clearTimeout(F),F=setTimeout(()=>{F=null,v=!1},0)}function ke(f,m){let y=m&&typeof m.closest=="function"?m.closest("[data-row-index]"):null;if(y&&f.contains(y)){let w=Number(y.getAttribute("data-row-index"));return Number.isFinite(w)?w:0}return f.querySelectorAll("[data-row-index]").length}function at(f){let m=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!m)return null;let y=m.getAttribute("data-lane");return y==="queue"?{zone:m,target:{kind:"parallel",marker_index:P.parallel_rows.length}}:y==="candidate"?{zone:m,target:{kind:"candidate"}}:null}function Je(f){let m=f.target;if(!p)return null;let y=typeof m?.closest=="function"?m.closest("[data-drop]"):null;if(!y)return at(m);let w=y.getAttribute("data-drop");if(w==="candidate")return{zone:y,target:{kind:"candidate"}};if(w==="parallel")return{zone:y,target:{kind:"parallel",marker_index:ke(y,m)}};if(w==="chain")return{zone:y,target:{kind:"chain",lane_id:y.getAttribute("data-lane-id")||"",marker_index:ke(y,m)}};if(w==="repo-serial"){let q=y.getAttribute("data-root-dir")||"";if(q!==p.root_dir)return null;let x=typeof m?.closest=="function"?m.closest("[data-queue-index]"):null,z=x&&y.contains(x)?x.getAttribute("data-queue-index"):y.getAttribute("data-lane-length"),ie=Number(z);return{zone:y,target:{kind:"repo-serial",root_dir:q,lane_id:y.getAttribute("data-lane-id")||"",index:Number.isFinite(ie)?ie:0}}}return null}function Zt(){for(let f of Array.from(Z.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let Nt=null;function He(f){Nt=f.target instanceof Element?f.target:null}function $(f){let m=f.target,y=typeof m?.closest=="function"?m.closest('[draggable="true"][data-bead-id]'):null,w=y?y.closest("[data-drag-kind]"):null;if(!w)return;if(y&&Nt&&y.contains(Nt)&&typeof Nt.closest=="function"&&Nt.closest("input, button, a")){f.preventDefault();return}let q=w.getAttribute("data-bead-id")||"",x=w.getAttribute("data-drag-kind")||"",z=w.getAttribute("data-root-dir")||"";if(!q||!x||!z)return;let ie=w.getAttribute("data-queue-index")||"",Ke=Number(ie),dt=w.getAttribute("data-lane-id")||"";p={kind:x,bead_id:q,root_dir:z,...ie!==""&&Number.isFinite(Ke)?{queue_index:Ke}:{},...dt?{lane_id:dt}:{}},v=!0,L=null,Z.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",q),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function re(f){let m=Je(f);m&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),m.zone.classList.add("is-drop-over"))}function M(f){let m=f.target;typeof m?.closest=="function"&&(m.closest("[data-drop]")?.classList.remove("is-drop-over"),m.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function xe(){p=null,Zt(),Z.classList.remove("is-dragging"),de()}function gt(f){let m=Je(f),y=p;p=null,Zt(),Z.classList.remove("is-dragging"),!(!m||!y)&&(f.preventDefault(),rn(y,m.target))}function Ge(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function wt(f,m){let{item:y,root_dir:w,revision:q}=At(m),x=y?.attempt_id||"",z=f.classList;if(z.contains("worker-mini__rowops-up")||z.contains("worker-mini__rowops-down")){De(m,z.contains("worker-mini__rowops-up")?-1:1);return}if(z.contains("worker-mini__rowops-remove")){nt("worker-queue-remove",{bead_id:m},w,q);return}if(z.contains("mon2-crow__detach")){je(m);return}if(z.contains("mon-dep__btn")){en(m);return}if(z.contains("worker-dep__open")){en(m);return}if(z.contains("mon2-arm__release")){A(m,f.getAttribute("data-lane-id")||"");return}if(z.contains("mon-lane__chip")){let ie=f.getAttribute("data-lane-id")||"";Z.querySelector(`.mon2-clane[data-lane-id="${ie}"]`)?.scrollIntoView({block:"nearest"});return}if(z.contains("mon-deppanel__unlink")){let ie=f.getAttribute("data-dep-a")||"",Ke=f.getAttribute("data-dep-b")||"";g(`${Ke}\uAC00 ${ie}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&It("dep-remove",ie,Ke);return}if(z.contains("mon-deppanel__cand")){let ie=f.getAttribute("data-dep-cand")||"";Y&&ie&&It("dep-add",Y.bead_id,ie);return}if(z.contains("mon-overlap__chip")){let ie=f.getAttribute("data-overlap-id")||"";j=!!j&&j.bead_id===m&&j.counterpart_id===ie?null:{bead_id:m,counterpart_id:ie},C();return}if(z.contains("mon-overlap__place")){lt(m,f.getAttribute("data-counterpart-id")||"");return}if(z.contains("worker-card__place")){L=L===m?null:m,C();return}if(z.contains("worker-card__place-cancel")){L=null,C();return}if(z.contains("worker-card__place-lane")){let ie=f.getAttribute("data-lane")||"parallel";L=null,O(m,ie);return}if(z.contains("rtile__session")){if(y&&y.kind==="session"){let ie=(y.session_refs||[]).find(Ke=>Ke&&Ke.current===!0);ie&&(ve.hidden=!1,St.open(Zr(ie,m,"in_progress",w)),C());return}B=x,x&&y&&(ve.hidden=!1,St.open({attempt_id:x,root_dir:w,meta:Ge(y)})),C();return}if(z.contains("rtile__pause")){Ce("worker-attempt-pause",{attempt_id:x},w);return}if(z.contains("rtile__resume")){Yr().then(ie=>{if(ie!==null)return vt("worker-attempt-resume",{attempt_id:x,...ie!==""?{instructions:ie}:{}},w,q)});return}if(z.contains("rtile__dismiss")){nt("worker-attempt-dismiss",{attempt_id:x},w,q);return}if(z.contains("rtile__discard")){if(!g(Ws(m,"unmerged")))return;se({bead_id:m,...x?{attempt_id:x}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},w,q);return}if(z.contains("worker-mini__merge")){let ie=ft(w,m);ie?.mismatch&&ie.continuation===null?E(w,m,q,ie.mismatch):nt("worker-merge-queue-add",{bead_id:m},w,q);return}if(z.contains("worker-mini__merge-cancel")){nt("worker-merge-queue-remove",{bead_id:m},w,q);return}if(z.contains("worker-mini__discard")){let ie=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!g(Ws(m,ie)))return;se({bead_id:m,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},w,q);return}if(z.contains("worker-mini__revise-fix")){vt("worker-revise-fix",{bead_id:m},w,q);return}z.contains("worker-mini__revise-approve")&&nt("worker-revise-approve",{bead_id:m},w,q)}function Ve(f){let m=v;v=!1;let y=f.target;if(!y||typeof y.closest!="function"||y.closest("dialog")||y.closest(".worker-drawer-overlay")||y.closest("a"))return;let w=y.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(w){f.preventDefault();let zn=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||w.textContent?.trim()||"";zn&&$t(zn);return}let q=y.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(q){f.preventDefault();let kn=q.getAttribute("data-root-dir")||_e.get(y.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||q.getAttribute("title")||"";kt(kn);return}let x=y.closest(".mon2-sec__toggle");if(x){f.preventDefault(),st(x.getAttribute("data-root-dir")||"");return}let z=y.closest(".worker-pane__toggle[data-lane]");if(z){f.preventDefault();let kn=z.getAttribute("data-lane")||"";(kn==="candidate"||kn==="queue"||kn==="running"||kn==="pr_wait"||kn==="done")&&ot(kn);return}let ie=y.closest(".worker-wait__area-toggle[data-area]");if(ie){f.preventDefault(),mt(ie.getAttribute("data-area")||"parallel");return}if(y.closest(".mon2-newlane")){f.preventDefault(),wn("create","");return}let Ke=y.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ke){f.preventDefault();let kn=Ke.getAttribute("data-lane-id")||"",zn=Ke.classList;wn(zn.contains("mon2-clane__confirm")?"confirm":zn.contains("mon2-clane__reapply")?"reapply":zn.contains("mon2-clane__run")?"run":zn.contains("mon2-clane__stop")?"stop":"remove",kn);return}if(y.closest(".mon-merge-all")){f.preventDefault(),Pe();return}let dt=y.closest(".mon-filter__spec");if(dt){f.preventDefault(),k={...k,spec:dt.getAttribute("data-spec")||"all"},Fp(k),C();return}let mn=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!mn)return;let zt=mn.getAttribute("data-bead-id")||"",br=y.closest("button");if(br){f.preventDefault(),wt(br,zt);return}zt&&!m&&(f.preventDefault(),Ye(zt,mn.getAttribute("data-root-dir")||At(zt).root_dir))}function Wt(f){let m=f.target;if(!m||typeof m.closest!="function")return;let y=m.closest(".mon-filter__blocked");if(y){k={...k,show_blocked:y.checked},Fp(k),C();return}let w=m.closest(".mon-candidate-sort");if(w){N=no.some(z=>z.value===w.value)?w.value:"repo_spec",fy(N),C();return}let q=m.closest(".mon-running-sort");if(q){b=q.value==="repo"?"repo":"started",yy(b),C();return}let x=m.closest(".mon-done-range");x&&(h=Hn(x.value),by(h),C())}function an(f){let m=f.target,y=m&&typeof m.closest=="function"?q=>m.closest(q):()=>null,w=!1;j&&!y(".mon-overlap__popover, .mon-overlap__chip")&&(j=null,w=!0),Y&&!y(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(Y=null,w=!0),w&&C()}function Sn(f){f.key!=="Escape"||!j&&!Y||(j=null,Y=null,C())}function On(f){let m=f.target;!m||typeof m.closest!="function"||!m.closest(".mon-deppanel__search")||!Y||(Y={...Y,query:m.value},C())}e.addEventListener("click",Ve),e.addEventListener("change",Wt),e.addEventListener("input",On),e.addEventListener("pointerdown",He),document.addEventListener("click",an),document.addEventListener("keydown",Sn),e.addEventListener("dragstart",$),e.addEventListener("dragover",re),e.addEventListener("dragleave",M),e.addEventListener("drop",gt),e.addEventListener("dragend",xe);{let f=!0;X=_i(m=>{if(ae=m,f){f=!1;return}C()})}s&&typeof s.subscribe=="function"&&(Ie=s.subscribe(()=>{try{$e.clear(),C()}catch{}}));function ir(){fe!==null&&(clearInterval(fe),fe=null)}function Pr(){F!==null&&(clearTimeout(F),F=null)}return{load(){n("load"),C(),fe===null&&(fe=setInterval(()=>{try{C()}catch{}},vy))},pause(){ir()},clear(){ir(),Pr(),Ie&&(Ie(),Ie=null),X&&(X(),X=null),St.destroy(),ve.hidden=!0,Te?.destroy(),Te=null,e.removeEventListener("click",Ve),e.removeEventListener("change",Wt),e.removeEventListener("input",On),e.removeEventListener("pointerdown",He),document.removeEventListener("click",an),document.removeEventListener("keydown",Sn),e.removeEventListener("dragstart",$),e.removeEventListener("dragover",re),e.removeEventListener("dragleave",M),e.removeEventListener("drop",gt),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function Yp(e,t,n){let r=Ht("views:nav"),{global_element:s,repo_element:o}=e,i=null;function a(h){return b=>{b.preventDefault();let k=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${a("monitor")}
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
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function g(){s&&rt(u(),s),o&&rt(d(),o)}return g(),i=t.subscribe(()=>g()),{destroy(){i&&(i(),i=null),s&&rt(c``,s),o&&rt(c``,o)}}}var Zp=["bug","feature","task","epic","chore"];function Qp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xp=["Critical","High","Medium","Low","Backlog"];function Jp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),g=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let j of Zp){let Y=document.createElement("option");Y.value=j,Y.textContent=Qp(j),o.appendChild(Y)}i.replaceChildren();for(let j=0;j<=4;j+=1){let Y=document.createElement("option");Y.value=String(j);let Q=Xp[j]||"Medium";Y.textContent=`${j} \u2013 ${Q}`,i.appendChild(Y)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function N(L){s.disabled=L,o.disabled=L,i.disabled=L,a.disabled=L,l.disabled=L,d.disabled=L,g.disabled=L,g.textContent=L?"Creating\u2026":"Create"}function G(){u.textContent=""}function V(L){u.textContent=L}function ae(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?i.value=j:i.value="2"}catch{o.value="",i.value="2"}}function X(){let L=o.value||"",j=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function B(){G();let L=String(s.value||"").trim();if(L.length===0){V("Title is required"),s.focus();return}let j=Number(i.value||"2");if(!(j>=0&&j<=4)){V("Priority must be 0..4"),i.focus();return}let Y=String(o.value||""),Q=String(l.value||""),ce={title:L};Y.length>0&&(ce.type=Y),String(j).length>0&&(ce.priority=j),Q.length>0&&(ce.description=Q),N(!0);try{await t("create-issue",ce)}catch{N(!1),V("Failed to create issue");return}X(),N(!1),k()}return n.addEventListener("cancel",L=>{L.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),B())}),r.addEventListener("submit",L=>{L.preventDefault(),B()}),{open(){r.reset(),G(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var $y=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function xy(e,t){return ua(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ef(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=xy(r,e);return c`<button
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
  `}function tf(e,t,n){return c`
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
  `}function nf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${$y.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Ay=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function rf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(oe=>ue(oe,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,u="",d=null;function g(){if(d)return d;let oe=i.querySelector('[data-pane="execution"]');return oe?(d=Ri(oe,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),d):null}function h(){return c`
      <section
        class=${`settings-dialog__pane${a==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function b(){let oe=r.get();return c`
      <section
        class=${`settings-dialog__pane${a==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${oe?c`
              ${ef(oe,s(),V)}
              ${tf(oe,u,{onDraft:ye=>{u=ye},onAdd:ae,onRemove:X})}
              ${nf(oe,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(oe){let ye=r.get();if(ye)try{let Ne=await n("display-policy-set",{expected_revision:ye.revision,policy:oe(ye)});N(Ne),Ne&&Ne.conflict&&Ne.policy&&(Ne=await n("display-policy-set",{expected_revision:Ne.policy.revision,policy:oe(Ne.policy)}),N(Ne)),Ne&&Ne.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function N(oe){oe&&oe.policy&&typeof oe.policy=="object"&&r.set(oe.policy)}function G(oe){k(oe)}function V(oe){let ye=r.get();if(!ye)return;let Ne=!Sy(oe,ye);G(he=>Ey(oe,he,Ne))}function ae(){let oe=u.trim();oe.length!==0&&(u="",G(ye=>ye.hidden_prefixes.includes(oe)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,oe]}),L())}function X(oe){G(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(Ne=>Ne!==oe)}))}function B(oe){let ye=r.get();if(!ye)return;let Ne=ye.chips[oe]===!1;G(()=>({chips:{[oe]:Ne}}))}function L(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ay.map(oe=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${oe.id}
                  aria-selected=${String(a===oe.id)}
                  aria-controls=${`settings-pane-${oe.id}`}
                  @click=${()=>j(oe.id)}
                >
                  <span class="settings-dialog__glyph">${oe.glyph}</span>
                  ${oe.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ne}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,i),g()}function j(oe){a=oe,L()}let Y=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",Y),i.addEventListener("cancel",Y);let Q=oe=>{oe.target===i&&ne()};i.addEventListener("click",Q);let ce=null;r.subscribe&&(ce=r.subscribe(()=>{l&&L()}));let U=null;t.implPresetStore?.subscribe&&(U=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function ee(oe="execution"){l||(l=!0,t.onOpenChange?.(!0),a=oe,u="",L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),g()?.load())}function ne(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ee,close:ne,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",Y),i.removeEventListener("cancel",Y),i.removeEventListener("click",Q),ce&&(ce(),ce=null),U&&(U(),U=null),d?.destroy(),d=null,i.remove()}}}function Sy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ey(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Ty=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],sf="usage-meter-card",Cy="usage-meter-layer",$l=600,Ry=["token_expired","relogin_required"];function of(e){return String(e).padStart(2,"0")}function Oy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function af(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${of(r.getHours())}:${of(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Ty[r.getMonth()]} ${r.getDate()} ${o}`;return`${Oy(n,t)} \xB7 ${a}`}function Ly(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function lf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function cf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var uf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function pf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Iy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:pf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Py(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=Iy(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?pf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function My(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Py(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function ff(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Dy(e,t){return!e.held||ff(e,t)<=$l?e:{...e,available:!1,windows:[],accounts:[]}}function df(e,t){return`${e}:${t}`}function _f(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,a=0,l=null;function u(){rt(c``,e),e.hidden=!0,g()}function d(){if(l===null){let he=e.ownerDocument;l=he.createElement("div"),l.id=Cy,l.className="usage-meter__layer",he.body.appendChild(l)}return l}function g(){l!==null&&(rt(c``,l),l.remove(),l=null)}function h(he){n!==he&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",G),window.addEventListener("resize",N)),n=he)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",G),window.removeEventListener("resize",N))}function k(he){let Z=he.target;Z&&(e.contains(Z)||l!==null&&l.contains(Z))||(b(),ne())}function N(){ne()}function G(he){he.key==="Escape"&&(b(),ne())}function V(he){n===he?b():h(he),ne()}function ae(){b(),ne()}async function X(he,Z){if(r.has(he.key))return;let ve=df(he.key,Z);r.set(he.key,Z),i.delete(ve),ne();let Ee=null;try{Ee=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Z})})).json()}catch{Ee=null}if(t)return;if(r.delete(he.key),!Ee||Ee.ok!==!0){let P=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";i.set(ve,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${P}`}),ne();return}let W=Array.isArray(Ee.warnings)?Ee.warnings.filter(P=>typeof P=="string"&&P.length>0):[];W.length>0&&i.set(ve,{kind:"warn",text:W.join(" \xB7 ")}),ne(),await Ne()}function B(he,Z,ve,Ee){let W=cf(he.pct),_e=`resets ${af(he.resetsAt,Ee)}${Z?` \xB7 ${ve}`:""}`;return c`<span
      class="usage-meter__window ${lf(W)}"
      style=${`--progress: ${W}%`}
      title=${_e}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${W}%</span>
    </span>`}function L(he,Z,ve){let Ee=ff(Z,ve),W=Z.available&&(Z.held||Ee>$l),P=W?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",_e=Z.accounts.filter(Te=>!Te.active).length,$e=`usage-meter__group${W?" usage-meter__group--stale":""}`,Ie=c`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${Z.available?Z.windows.map(Te=>B(Te,W,P,ve)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${_e>0?c`<span class="usage-meter__badge">+${_e}</span>`:""}`;if(Z.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${he.label} usage`}
        >${Ie}</span
      >`;let fe=n===he.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${fe?"true":"false"}
      aria-controls=${sf}
      @click=${()=>V(he.key)}
    >
      ${Ie}
    </button>`}function j(he,Z){return c`<span class="usage-meter" aria-label="Usage">
      ${he.map(ve=>L(ve.provider,ve.snapshot,Z))}
    </span>`}function Y(he,Z){let ve=cf(he.pct),Ee=af(he.resetsAt,Z);return c`<span
      class="usage-meter__account-window ${lf(ve)}"
      style=${`--progress: ${ve}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ve}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function Q(he,Z){return Ry.includes(Z)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ce(he,Z,ve){let Ee=Z.status==="ok",W=typeof Z.ageSeconds=="number"&&Z.ageSeconds>$l,P=i.get(df(he.key,Z.number)),_e=r.get(he.key),$e=_e!==void 0,Ie=_e===Z.number,fe=["usage-meter__account"];return Z.active&&fe.push("usage-meter__account--active"),Ee||fe.push("usage-meter__account--unavailable"),W&&fe.push("usage-meter__account--stale"),c`<div class=${fe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${Z.email}
          >${Z.alias===null?Z.email:Z.alias}</span
        >
        ${Z.plan===null?"":c`<span class="usage-meter__account-tag">${Z.plan}</span>`}
        ${Z.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${Z.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Ly(Z.ageSeconds)}</span
            >`}
        ${Z.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{X(he,Z.number)}}
            >
              ${Ie?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${Z.windows.map(Te=>Y(Te,ve))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Q(he,Z.status)}
          </div>`}
      ${P===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${P.kind}"
          >
            ${P.text}
          </div>`}
    </div>`}function U(he,Z,ve){let Ee=Z.accounts.filter(W=>W.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${Ee} / 전체
        ${Z.accounts.length}
      </h2>
      ${Z.accounts.map(W=>ce(he,W,ve))}
    </section>`}function ee(he,Z){return c`<div
      class="usage-meter__card"
      id=${sf}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${U(he.provider,he.snapshot,Z)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ne(){let he=Date.now(),Z=[];for(let Ee of uf){let W=o.get(Ee.key);W&&Z.push({provider:Ee,snapshot:Dy(W,he)})}if(Z.length===0){b(),u();return}let ve=Z.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);ve||b(),rt(j(Z,he),e),e.hidden=!1,ve?oe(ve,he):g()}function oe(he,Z){let ve=d(),Ee=e.getBoundingClientRect(),W=e.ownerDocument.documentElement.clientWidth;ve.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),ve.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,W-Ee.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${ee(he,Z)}`,ve)}async function ye(he){try{let Z=await fetch(he.endpoint);return Z.ok?My(await Z.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ne(){a+=1;let he=a,Z=await Promise.all(uf.map(async ve=>({provider:ve,read:await ye(ve)})));if(!(t||he!==a)){for(let ve of Z){let Ee=ve.provider.key;if(ve.read.kind==="ok"){o.set(Ee,ve.read.snapshot);continue}if(ve.read.kind==="empty"){o.delete(Ee);continue}let W=o.get(Ee);W!==void 0&&!W.held&&o.set(Ee,{...W,held:!0})}ne()}}return u(),Ne(),s=setInterval(()=>{Ne()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function mf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),a=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!a&&typeof s.dismissed_at!="number"}}var Ny="worker-ineligible";function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gf(e){return ro(e).includes(Ny)}var qy="session-preferred",Fy=["exclusive_machine","iterative_user_judgment","visual_verification"];function bf(e,t){if(!ro(e).includes(qy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Fy.includes(n)?n:""}var jy="worker-serial";function xl(e){return ro(e).includes(jy)}var hf=new Set(["sh","bash","zsh","dash","ksh"]),yf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function vf(e){let t=e.split("/");return t[t.length-1]||""}function By(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=vf(n[0]);if(r!=="env")return hf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&hf.has(vf(s))}function Uy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Wy(e){let t=[],n=0;yf.lastIndex=0;for(let r of e.matchAll(yf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Uy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function zy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function wf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",a="",l=0,u=null,d=!1;function g(L,j){return j?Wy(L).map(Y=>Y.kind==="plain"?Y.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${Y.kind}"
            >${Y.text}</span
          >`):L}function h(){if(!s)return c``;let L=o==="ready"&&By(i),j=o==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
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
              @click=${()=>X()}
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
                  ${a}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${j.map((Y,Q)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Q+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${g(Y,L)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){rt(h(),r)}async function k(){if(o!=="ready")return;let L=await Mn(i);ue(L?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",L?"success":"error")}function N(L){L.key==="Escape"&&s&&(L.preventDefault(),X())}function G(){d||(document.addEventListener("keydown",N),d=!0)}function V(){d&&(document.removeEventListener("keydown",N),d=!1)}async function ae(L,j=null){let Y=++l;G(),s={...L},u=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let ce=t?t():"";if(!ce){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let U="/api/repo-ops-script?workspace="+encodeURIComponent(ce)+"&lane="+encodeURIComponent(L.lane)+"&base_sha="+encodeURIComponent(L.base_sha);try{let ee=await n(U),ne=await ee.json().catch(()=>({}));if(Y!==l)return;if((t?t():"")!==ce){X();return}if(!ee.ok||!ne||ne.ok!==!0){o="error",a=zy(ne&&typeof ne.error=="string"?ne.error:""),b();return}s={lane:ne.lane,base_sha:ne.base_sha,path:ne.path,base_ref:ne.base_ref},i=String(ne.content),o="ready",b()}catch{if(Y!==l)return;o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function X(){l+=1,V(),s=null,i="",b();let L=u;u=null,L?.isConnected&&L.focus()}function B(){X(),r.remove()}return{open:ae,close:X,destroy:B}}var kf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Hy=new Set(["queued","running","retry_pending"]);function $f(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let U=o();return typeof U.revision=="number"?U.revision:0}function a(U){t&&U&&U.queue&&typeof U.queue=="object"&&t.set(U.queue)}function l(){let U=o().workspace_info;return U&&typeof U=="object"?U:{}}function u(U,ee){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${U}"
      >${ee}</span
    >`}function d(U){if(typeof U!="number"||!Number.isFinite(U))return"";let ee=U/6e4;return Number.isInteger(ee)?`timeout ${ee}\uBD84`:`timeout ${Math.round(U/1e3)}\uCD08`}function g(U){let ee=d(U);return ee?u("config",ee):""}function h(U,ee,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${oe=>{s&&s({lane:U,base_sha:ee.base_sha,path:ne.script,base_ref:ee.base_ref},oe.currentTarget)}}
    ></button>`}function b(){let U=o().repo_operations;return Array.isArray(U)?U:[]}function k(){let U=l().repo_ops,ee=U&&typeof U=="object"?U.repo_id:null;return typeof ee=="string"&&ee?ee:null}function N(){return b().some(U=>U&&U.kind==="deploy"&&Hy.has(U.state))}function G(){let U=N(),ee=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${U||ee}
      title=${U?"\uBC30\uD3EC \uC9C4\uD589 \uC911":ee?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{j()}}
    >
      배포 실행
    </button>`}function V(){let U=o().repo_ops_opt_out;return{verify:U?.verify===!0,deploy:U?.deploy===!0}}function ae(U,ee){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!ee}
        @change=${ne=>{L(U,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(U){let ee=typeof U.base_sha=="string"?U.base_sha:"",ne=`${U.source_path||"repo-ops/config.toml"} @ ${U.base_ref||"?"}${ee?`@${ee.slice(0,7)}`:""}`,oe=V(),ye=!!U.verify&&oe.verify,Ne=!!U.deploy&&oe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${U.verify?c`${h("verify",U,U.verify)}
              ${g(U.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":U.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${U.verify?ae("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ne?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${U.deploy?c`${h("deploy",U,U.deploy)}
              ${g(U.deploy.timeout_ms)}
              ${Ne?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):G()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ne?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":U.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${U.deploy?ae("deploy",oe.deploy):""}
      </div>
    </section>`}function B(U){let ee=U.repo_ops&&typeof U.repo_ops=="object"?U.repo_ops:null;return ee&&(ee.status==="resolved"||ee.status==="absent")?X(ee):ee&&(ee.status==="pending"||ee.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${ee.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${ee.error_code?c` — <code>${ee.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(U,ee){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:U,opted_out:ee,expected_revision:i()});if(a(ne),ne&&ne.conflict){let oe=await n("worker-repo-ops-opt-out-toggle",{kind:U,opted_out:ee,expected_revision:i()});a(oe)}r()}async function j(){let U=k();if(!n||U===null)return;let ee=await n("worker-repo-operation-deploy-run",{repo_id:U});if(a(ee),!ee||ee.ok!==!0){let ne=ee&&typeof ee.reason=="string"?ee.reason:"",oe=Object.hasOwn(kf,ne)?kf[ne]:ne||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ue(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${oe}`,"error")}else ue("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let Y={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Q(U,ee,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${U}</div>
      <ul class="worker-repo-ops__policy-list">
        ${ee.map(oe=>c`<li data-token=${oe}>
              ${Y[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function ce(){let U=o(),ee=U.repo_operation_policy&&typeof U.repo_operation_policy=="object"?U.repo_operation_policy:null;return ee?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(ee.worker_automatic||[]).length} · 금지
            ${(ee.never_automatic||[]).length}</span
          >
        </summary>
        ${ee.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ee.schema_version})`}
            </div>`:""}
        ${Q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ee.worker_automatic||[],"worker-automatic")}
        ${Q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ee.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${B(l())} ${ce()}
      </details>`}}}var Sf=20,Gy=5,Ky=new Set(["failed","running","queued","retry_pending"]),xf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Vy(e,t,n=Sf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Yy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ky.has(t.state)&&!t.dismissed&&!t.superseded_by}function Zy(e,t,n={}){let r=Vy(e,t,1/0),s=n.expanded===!0?Sf:Gy,o=new Set(r.slice(0,s)),i=r.filter(a=>o.has(a)||Yy(a));return{visible:i,hidden:r.length-i.length}}function Af(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Qy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ef(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Tf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Xy(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function Jy(e,t){let n=Kd(e,t),r=Vd(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function ev(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function tv(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${yi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Af(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(xf,n.kind)?xf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${gi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Rr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Af(e)}"
          >${Qy(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Tf(Gd(n.failure_kind,s)):""}
      ${Jy(n,Xy(t,n))}
      ${ev(n)}
      ${Ef([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${gi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||""},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function nv(e){let t=e.cleanup,n=Ir(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ln(e.at):""}
      >${yi(e.at)||"\u2014"}</span
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
        ${xp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Tf(is(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${Ef([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function rv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?nv(r):tv(r,e.repo_ops))}
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
  </section>`}function Cf(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Zy(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(rv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){o();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var sv=Ht("views:worker"),ov="tab:worker:ready",iv="tab:worker:blocked",av="tab:worker:in-progress",lv="tab:worker:resolved",cv="tab:worker:closed",Fi=1,Rf=5;function Of(e){return Ps(e).evidence==="published"}var uv=new Set(["quick_fix","spec_backed","full_plan"]);function Lf(e){return typeof e=="string"&&uv.has(e)}var Df="beads-ui.worker.candidate-filter",Al={show_blocked:!1,spec:"all"};function dv(){try{let e=window.localStorage.getItem(Df);if(!e)return{...Al};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Al};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Al}}}function pv(e){try{window.localStorage.setItem(Df,JSON.stringify(e))}catch{}}function fv(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),u=r(a);l&&u?s.push(a):!l&&u?o+=1:l&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var _v=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Nf="bdui.worker.candidate_sort",qf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],El="spec";function Ff(e){return qf.some(t=>t.value===e)?e:El}function mv(){try{return Ff(window.localStorage.getItem(Nf))}catch{return El}}function gv(e){try{window.localStorage.setItem(Nf,e)}catch{}}var jf="bdui.worker.done-range";function bv(){try{let e=window.localStorage.getItem(jf);return e===null?"today":Hn(e)}catch{return"today"}}function hv(e){try{window.localStorage.setItem(jf,e)}catch{}}function If(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function yv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Ar):t==="updated"?r.sort(xo):(r.sort(Ao(n)),t==="board"?r:[...r.filter(Of),...r.filter(s=>!Of(s))])}function vv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var kv="\u{1F512} blocked";function Pf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function $v(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function xv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Av(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Sv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Ev(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Sl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Tv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Cv=new Set(["waiting_metadata","reviewing","retrying"]);function Rv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",a=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",a?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${a}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,a=typeof r.next_at=="number"?ln(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,a?`\uB2E4\uC74C \uC2DC\uAC01 ${a}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Ov(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Lv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Ov(e.terminal_reason);l&&a.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])a.push(u);return e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&a.push(`repair ${s.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:i,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:!Tv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Mf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Iv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Mf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Mf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=$v(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Pf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Pf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Pv(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,u=!0,d=null,g=null,h=null,b={},k=!1,N=!1,G={},V=null){let ae=!!l&&l.position>0,X=!!l?.continuation_action&&l.continuation_action.continuation===null,B=!!l&&l.active===!0,L=l&&l.failure||null,j=Av(l?l.waiting:null,h),Y=n[e]||null,Q=Y&&Y.gate?Y.gate:null,ce=Y&&Y.pr?Y.pr:null,U=Sv(l?l.resolution:null),ee=Ev(l?l.head_review:null),ne=l&&l.head_review||null,oe=Rv(h,ne),ye=Lv(h,oe),Ne=l&&l.authority||null,he=!!ne&&["pending","reviewing","revising"].includes(ne.state),Z=!!h&&typeof h=="object"&&Cv.has(h.phase),ve=ae&&!B&&(ne?.state==="failed"||!Ne||Z||Ne.source==="automatic"&&!N),Ee=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":U?U.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":j,W=!!Q&&Q.base_badge==="\uCDA9\uB3CC",P=!!Q&&Q.enabled===!0,_e=eo({bead_id:e,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:G.repo_operations}),$e=Ni(_e),Ie=o&&!_e&&(o.queueing??null)?o.queueing:null,fe=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!Q&&Q.tier==="merged",Te=a&&!!r&&!!Q&&Q.tier==="merged",St=ve&&(P||W||Q?.reason==="base_behind"||Q?.reason==="review_receipt_missing"||Q?.reason==="review_receipt_stale"||Q?.reason==="review_receipt_undetermined"||fe||Te),nt=a&&W&&u===!1,ft=Bn(b,e,{external:a,merge_active:B||_e?.step==="merge",merge_queued:ae,conflict_active:!!i,cleanup_active:$e,merged:!!r||Q?.tier==="merged"}),vt=!!ft.operation,E=!fe&&!!r&&r.step==="repo_operations",se=Iv({continuation_required:X,queueing:Ie,merge_step:_e,conflict_badge:Ee,conflict_live:U?.live===!0||i==="running",head_review:ne&&ee?{...ee,state:ne.state,failure_reason:ne.failure_reason}:null,auto_resolution:oe,recovery:ye,cleanup_failed:r,cleanup_label:r?Ir(r.step):null,base_exception:g,conflicting:W,gate:Q,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:L,auto_skip:d,queued:ae,queue_active:B,queue_position:l?l.position:0,activity:Ee?null:o&&o.activity||null}),Ce=se?.live===!0&&se.title?c`<span title=${se.title}>${se.label}</span>`:se?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&_e?.active!==!0?Di(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...V?{dependency_chips:V}:{},external:a,pr_number:ce&&typeof ce.number=="number"?ce.number:null,pr_url:ce&&typeof ce.url=="string"?ce.url:"",completion_badge:se?.live!==!0&&se?.title?se.label:null,completion_title:se?.title||"",completion_repair_pr_url:ye?ye.repair_pr_url:"",completion_repair_pr_number:ye?ye.repair_pr_number:null,badges:Ce?[Ce]:[],live_badge:se?.live===!0?Ce:null,usage:s,alert:se?.alert===!0,merge_action:Q?.tier==="merged"&&!fe&&!Te||E?!1:!ae||X||ve,timeline_action:E,cancel_action:ae&&!X,cancel_enabled:(!B||he)&&!(ye&&ye.lock_actions),cancel_title:ye&&ye.lock_actions?`${ye.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!he?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":he?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ft,discard_action:ft.action,merge_step:_e,discard_enabled:ft.enabled,discard_title:ft.title,merge_enabled:!_e&&!Ie&&!i&&!vt&&!g&&!(ye&&ye.lock_actions)&&!nt&&!E&&(P||W||Q?.reason==="base_behind"||Q?.reason==="review_receipt_missing"||Q?.reason==="review_receipt_stale"||Q?.reason==="review_receipt_undetermined"||fe||Te||St||Z&&!B),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||Te?"\uC815\uB9AC \uC7AC\uAC1C":W&&!_e&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Q?.reason==="review_receipt_missing"||Q?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ve?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:vt?ft.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ft.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ft.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ie?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":nt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":W?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":Q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":P?`\uBA38\uC9C0 (${Q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:Q&&Q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${Q&&Q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Tl(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:a,getWorkspacePath:l,switchWorkspace:u,openDoc:d,doneRange:g,onDoneRangeChange:h}=t,b=r?Eo(r,i):null,k=Oo({transport:n,uiOrderStore:i}),N=null,G=[],V=dv(),ae=null,X=null,B={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},L=mv(),j=g?Hn(g):bv(),Y=new Map;function Q(){let p=Br.find(v=>v.value===j);return p?p.label:"\uC624\uB298"}let ce=mi("beads-ui.worker.lane-collapsed"),U=!1,ee=new Set,ne=new Set,oe=new Set,ye=new Set,Ne=new Set,he={},Z=null,ve=0,Ee=null,W=[];function P(p){return Z===p?he:{}}async function _e(){if(!n)return;let p=l?.()||"";if(Z===p||Ee&&Ee.key===p&&Ee.generation===ve)return;let v=++ve;Ee={key:p,generation:v};let F=null;try{F=await Promise.resolve(n("get-session-defaults",{}))}catch(de){if(v!==ve)return;Ee=null,sv("get-session-defaults failed: %o",de),Me();return}v===ve&&(he=F&&typeof F.values=="object"&&F.values!==null?{...F.values}:{},Z=p,Ee=null,Me())}function $e(){Z=null,ve+=1,_e()}let Ie=document.createElement("div");Ie.className="worker-console";let fe=document.createElement("div");fe.className="worker-top";let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let St=document.createElement("div");St.className="worker-drawer-overlay__backdrop";let nt=document.createElement("div");nt.className="worker-drawer-host";let ft=document.createElement("div");ft.className="worker-drawer-host",ft.hidden=!0,Te.append(St,nt,ft);let vt=document.createElement("div");vt.className="worker-lanes-host",Ie.append(fe,Te,vt),e.appendChild(Ie);let E=null,se=ts(nt,{transport:n,sessionLogStore:o,onClose:()=>{E=null,Te.hidden=!0,Me()}}),Ce=Cf(ft,{onClose:()=>{ft.hidden=!0,Te.hidden=!0,Me()}}),Pe=wf({getWorkspacePath:l||(()=>"")}),Qe=l&&l()||"",st=$f({queueStore:s,transport:n,onChanged:()=>Me(),onOpenScript:(p,v)=>{Pe.open(p,v)}});function ot(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Fi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function mt(){let p=ot(),v=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,F=Array.isArray(p.serial_lanes)?p.serial_lanes:[],de=[];for(let at of F){if(de.length>=v)break;!at||typeof at.id!="string"||!/^s[1-5]$/.test(at.id)||!Array.isArray(at.entries)||de.push({id:at.id,label:`\uC9C1\uB82C ${at.id.slice(1)}`,count:at.entries.length})}return de.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...de]}function te(p){if(!ae||!p.some(F=>F.id===ae))return null;let v=mt();return v?{bead_id:ae,lanes:v}:null}function K(){let p=ot();return typeof p.revision=="number"?p.revision:0}function be(p){p&&p.queue&&s&&s.set(p.queue)}function pt(){let p=ot().queue;return Array.isArray(p)?p.length:0}async function et(p,v,F){if(!n)return;let de=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},...F===void 0?{}:{index:F},expected_revision:K()}),ke=await n("worker-queue-place",de());be(ke),ke&&ke.conflict&&await n("worker-queue-place",de()).then(be)}async function Oe(p,v,F){if(!n)return;let de=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:F,expected_revision:K()}),ke=await n("worker-queue-reorder",de());be(ke),ke&&ke.conflict&&await n("worker-queue-reorder",de()).then(be)}async function qe(p){if(!n)return;let v=await n("worker-queue-remove",{bead_id:p,expected_revision:K()});be(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:K()}).then(be)}async function lt(p){if(!n||!p)return;let v=await n("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function _t(p){if(!n||!p)return;let v=await Yr();if(v===null)return;let F=async(ke={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:K(),...v!==""?{instructions:v}:{},...ke}),de=await F();be(de),de&&de.conflict&&(de=await F(),be(de)),de=await Jn(de,(ke,at)=>F({continuation:ke,decision_token:at}),{onResult:be,refresh:()=>F()}),de&&de.resumed===!1&&!de.conflict&&de.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2400)}async function ct(p){if(!n||!p)return;let v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:K()});be(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:K()}),be(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Tt(p,v,F=!0){if(!n)return null;let de=n,ke=await de(p,{...v,expected_revision:K()});return be(ke),ke&&ke.conflict&&F&&(ke=await de(p,{...v,expected_revision:K()}),be(ke)),ke}async function Jt(p){if(!n||!p)return;let v=ot().merge_queue?.find(de=>de.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Bt(p,v.mismatch);return}ee.add(p),Me();let F;try{F=await Tt("worker-merge-queue-add",{bead_id:p})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ee.delete(p),Me()}if(!(!F||F.applied)){if(F.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(xv(F.reason),"error",2400)}}async function Yt(p){if(!(!n||!p||ne.has(p))){ne.add(p),Me();try{let v=await n("worker-cleanup-retry",{bead_id:p,expected_revision:K()});be(v),v&&!v.retried&&!v.conflict&&v.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{ne.delete(p),Me()}}}async function Bt(p,v){let F=await Jn({continuation_mismatch:v},(ke,at)=>Tt("worker-merge-queue-add",{bead_id:p,continuation:ke,decision_token:at},!1)),de=F?.queue?.merge_queue?.find(ke=>ke.bead_id===p)?.continuation_action;if(F?.applied!==!0&&de?.continuation===null&&de.mismatch){await Bt(p,de.mismatch);return}F&&F.applied===!1&&!F.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ot(p){if(!n)return;let v=await Tt("worker-merge-auto-toggle",{on:p});!v||v.conflict||ue(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function ht(p){if(!n||!p)return;let v=await Tt("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function We(){await Tt("worker-merge-queue-remove",{all:!0})}async function R(p,v=null,F="unmerged",de=null){if(!n||!p)return;let ke=Ws(p,F);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(ke)))return;let Je=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...de?{operation_id:de}:{},expected_revision:K()});if(be(Je),Je&&Je.conflict&&(Je=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...de?{operation_id:de}:{},expected_revision:K()}),be(Je)),Je&&Je.discarded===!0){ue(vi(Je),"success",5e3);return}if(Je&&Je.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${Je.reason}`,"error",2800);return}if(Je&&Je.accepted&&Je.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Je&&Je.accepted&&!Je.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${Je.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Je&&!Je.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function J(p,v,F){if(!(!n||!v||!F||ye.has(v))){ye.add(v),Me();try{let de=await n(p,{bead_id:v,action_id:F,expected_revision:K()});be(de),de?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&de?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(de.reason)}`,"error",2800)}finally{ye.delete(v),Me()}}}async function pe(p,v){if(!n||!v||oe.has(v))return;oe.add(v),Me();let F;try{let de=async(ke={})=>await n(p,{bead_id:v,expected_revision:K(),...ke});F=await de(),be(F),F&&F.conflict&&(F=await n(p,{bead_id:v,expected_revision:K()}),be(F)),p==="worker-revise-fix"&&(F=await Jn(F,(ke,at)=>de({continuation:ke,decision_token:at}),{onResult:be,refresh:()=>de()}))}finally{oe.delete(v),Me()}if(!(!F||F.conflict)){if(F.ok){ue(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function T(p){if(!n)return;let v=await n("worker-automation-toggle",{on:p,expected_revision:K()});be(v),v&&v.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:K()}).then(be)}async function H(p){if(!n||!p)return;let v=await n("worker-repo-operation-dismiss",{operation_id:p});be(v),v&&v.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Le(p){if(!n||!Number.isFinite(p))return;let v=Math.max(Fi,Math.floor(p)),F=await n("worker-queue-set-slots",{slots:v,expected_revision:K()});be(F),F&&F.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:K()}).then(be)}async function Fe(p){if(!n||!Number.isInteger(p)||p<1||p>Rf)return;let v=ot(),F=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((at,Je)=>at+(Array.isArray(Je?.entries)?Je.entries.length:0),0),de=()=>({count:p,expected_revision:K()}),ke=await n("worker-queue-set-serial-lane-count",de());be(ke),ke&&ke.conflict&&(ke=await n("worker-queue-set-serial-lane-count",de()),be(ke)),ke&&ke.applied&&F>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Ae="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Xe(p,v){let F=rl(p,v.id,B);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:F.kind==="note"?{kind:"note",text:F.text}:F.kind==="disabled"?{kind:"disabled",label:Ae,title:F.title}:{kind:"place",label:Ae,title:F.title}}}function ut(p,v){if(!X||X.bead_id!==p)return null;let F=X.counterpart_id,de=v.filter(ke=>ke.id===F);return de.length===0?null:{rows:de.map(ke=>Xe(p,ke))}}async function ze(p,v){let F=rl(p,v,B);if(X=null,F.kind!=="ops"){Me();return}let de=K();for(let ke of F.ops){let at=await tt(ke,de);if(at===null)break;de=at}Me()}async function tt(p,v){if(!n)return null;try{let F=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:v});if(be(F),F&&F.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!F||F.applied!==!0)return ue(F&&typeof F.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${F.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let de=F.queue?F.queue.revision:void 0;return typeof de!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):de}catch(F){return ue(F instanceof Error&&F.message?F.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function I(){let p=ot(),v=b?b.selectBoardColumn(ov,"ready"):[],F=b?b.selectBoardColumn(iv,"blocked"):[],de=b?b.selectBoardColumn(cv,"closed"):[],ke=b?b.selectBoardColumn(av,"in_progress"):[],at=b?b.selectBoardColumn(lv,"resolved"):[],Je=Co([...v,...F,...ke,...at,...de]),Zt=new Map;for(let _ of[...v,...F,...ke])_&&_.id&&!Zt.has(_.id)&&Zt.set(_.id,_);let Nt={...P(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let D=p[_];typeof D=="string"&&(Nt[_]=D)}function He(_,D){let le=Zt.get(_);if(!le)return null;let Be=le.metadata&&typeof le.metadata=="object"?le.metadata:{},Ze=le.workflow?.route,Qt=Be.route,qt=Lf(Ze)?Ze:Lf(Qt)?Qt:null;return hn({pin:Be,global:Nt,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:qt,controller_runtime:D})}function $(_){let D=_.runner||null,le=He(_.bead_id,D),Be=Hs(_),Ze=le?_r(le,D):null;return Be||Ze?{orchestration:Be,worker:Ze}:null}let re=new Map;function M(_){if(re.has(_))return re.get(_)??null;let D=He(_,null),le=null;if(D){let Be=jn(p.runner_catalog??null,D.orchestration_model.value??""),Ze=Be===null?D:He(_,Be),Qt=Or(Ze,p.runner_catalog??null),qt=_r(Ze,Be);le=Qt||qt?{orchestration:Qt,worker:qt}:null}return re.set(_,le),le}function xe(_){let D=Ro(Je,_);return D.total===0?null:D}let gt=p.bead_titles||{},Ge=new Map;for(let[_,D]of Object.entries(gt))typeof D=="string"&&D.length>0&&Ge.set(_,D);for(let _ of[...v,...F])Ge.set(_.id,_.title||_.id);let wt=new Map;for(let _ of[...v,...F,...ke,...at,...de])_&&_.id&&typeof _.from_id=="string"&&wt.set(_.id,_.from_id);let Ve=new Map;for(let _ of[...v,...F,...ke,...at,...de])_&&_.id&&typeof _.priority=="number"&&Ve.set(_.id,_.priority);let Wt=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},an=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Sn=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},On=new Map;for(let[_,D]of Object.entries(an))Array.isArray(D)&&On.set(_,xl(D));for(let _ of[...v,...F]){let D=_.labels;Array.isArray(D)&&!On.has(_.id)&&On.set(_.id,xl(D))}let ir=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Pr=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},f=new Map;for(let[_,D]of Object.entries(Wt))D&&typeof D=="object"&&f.set(_,D);for(let _ of[...v,...F])f.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let m=_=>f.get(_)||{},y=p.pr_wait||[],w=p.pr_observations||{},q=p.pr_activity||{},x=p.cleanup_failed||{},z=Object.entries(x).map(([_,D])=>({bead_id:_,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0})),ie=p.queue||[],Ke=new Set([...ie.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(D=>D.bead_id)),...y.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),dt=new Set(F.map(_=>_.id)),mn=i?i.get()?.order||{}:{},zt=new Set,br=[];for(let _ of[...v,...F])Ke.has(_.id)||zt.has(_.id)||vv(_)||(zt.add(_.id),br.push(_));G=yv(br,L,mn);let kn=p.admission||{},zn=_=>{let D=kn[_];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof D.reason=="string"?D.reason:"",Be=le.indexOf(":");return Be>0&&Be<le.length-1?`\u26D4 ${le.slice(0,Be)} (${le.slice(Be+1)})`:`\u26D4 ${le}`},Ll=new Map,Xf=G.map(_=>{let D=Ps(_),le=D.evidence==="published",Be=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Ze=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Qt=Object.hasOwn(_,"labels")&&gf(_.labels),qt=Qt||!Object.hasOwn(_,"labels")?"":bf(_.labels,_.metadata),qr=qt.length>0,Rt=!Qt&&(Be?Ze:le&&!D.conflict),fo=dt.has(_.id),Zn=[];if(fo){let _o=wv(_);_o.length>0?Ll.set(_.id,_o):Zn.push(kv)}Be&&!Ze?Zn.push("missing_description"):!Be&&D.conflict?Zn.push("spec_id_conflict"):!Be&&D.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Be&&D.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Fr=zn(_.id);return Fr&&Zn.push(Fr),{id:_.id,title:_.title||_.id,reason:Zn.join(" \xB7 "),draggable:Rt,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Be,status:_.status,worker_ineligible:Qt,session_preferred:qr,session_preferred_reason:qt,blocked:fo,has_spec:le,exec_chips:M(_.id),from_id:_.from_id||void 0,priority:Ve.get(_.id)}}),ji=fv(Xf,V),Bi=ji.visible,Jf=p.revise_parked||{},so=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},e_=_=>{let D=Sn[_]?.chips?.pr;return D&&typeof D.number=="number"&&typeof D.url=="string"?{pr_number:D.number,pr_url:D.url}:{}},Ui=(_,D)=>_.map((le,Be)=>{let Ze=D!=="done",Qt=D!=="done"&&D!=="queue",qt=Ze?Jf[le.bead_id]:null,qr=Ze?Bn(so,le.bead_id):null,Rt=qr?.operation?qr:null,fo=Ze&&On.get(le.bead_id)===!0,Zn=p.admission&&typeof p.admission=="object"?p.admission[le.bead_id]:null,Fr=Ze?qd(Zn,!!Rt||ye.has(le.bead_id)):null,_o=Ze&&!Fr?zn(le.bead_id):null,f_=Ze?[_o]:[],__=[];return{id:le.bead_id,title:Ge.get(le.bead_id)||le.bead_id,reason:f_.filter(Boolean).join(" \xB7 "),draggable:Ze&&!Rt&&!Fr,done:D==="done",lane:D,seq:Qt?Be+1:void 0,worker_serial:fo,discard:Rt,stale_work:Fr,badges:[...__,...qt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...D==="done"?bi(p.attempts||{},le.bead_id):[]],alert:!!qt,revise_action:!!qt,revise_enabled:!!qt&&!Rt&&!oe.has(le.bead_id),revise_title:qt?qt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Tn(p.attempts||{},le.bead_id):null,work_ms:D==="done"?hi(p.attempts||{},le.bead_id):null,done_at:D==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:Ze?M(le.bead_id):null,workflow:Ze&&Sn[le.bead_id]||null,...D==="done"?e_(le.bead_id):{},from_id:wt.get(le.bead_id)||void 0,priority:Ve.get(le.bead_id),...m(le.bead_id)}}),Mr=p.attempts?Object.values(p.attempts).filter(Lr):[],Wi=new Set;for(let _ of Mr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Wi.add(_.resumed_from);let Il=new Map;for(let _ of Mr)Il.set(_.bead_id,_.attempt_id);let cs=new Map;for(let _ of Mr)cs.set(_.attempt_id,_);function zi(_){let D=new Set,le=_;for(;le&&!D.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;D.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&cs.get(le.resumed_from)||null}return!1}let oo=typeof p.declared_base=="string"?p.declared_base:null;function t_(_){let D=null;for(let le of Mr)!le||le.bead_id!==_||zi(le)||(D===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=le);return D&&typeof D.target_base=="string"?D.target_base:null}let Hi=[],io=[],n_=mf(p),Pl=_=>{let D=typeof _.session_id=="string"&&_.session_id.length>0,le=Wi.has(_.attempt_id);return{eligible:D&&!le,reason:D?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ln=null;for(let _ of Mr){let D=_.status==="paused"&&!Wi.has(_.attempt_id);if(_.status==="running"||D)io.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ge.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:D,conflict_resolution:zi(_),base_exception:Sl(oo,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Bn(so,_.bead_id,{attempt_id:_.attempt_id}),workflow:Sn[_.bead_id]||null,priority:Ve.get(_.bead_id),usage:Tn(p.attempts||{},_.bead_id),rollup:xe(_.bead_id),rollup_expanded:Ne.has(_.bead_id),exec_chips:$(_),...m(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&n_(_)){let le=Pl(_);Hi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:Ge.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Bn(so,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:zi(_),base_exception:Sl(oo,_.target_base),workflow:Sn[_.bead_id]||null,priority:Ve.get(_.bead_id),usage:Tn(p.attempts||{},_.bead_id),rollup:xe(_.bead_id),rollup_expanded:Ne.has(_.bead_id),exec_chips:$(_),...m(_.bead_id)}),Ln=_}}let Ml=new Set([...Hi,...io].map(_=>_.bead_id)),Dl=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let D=_&&_.bead_id;if(!(typeof D!="string"||D.length===0||Ml.has(D))){if(Ml.add(D),Array.isArray(_.blocked_by)){let le=_.blocked_by.filter(Be=>typeof Be=="string"&&Be.length>0);le.length>0&&Dl.set(D,le)}io.push({bead_id:D,attempt_id:null,kind:"session",title:_.title||Ge.get(D)||D,status:"in_progress",started_at:Pn(_.started_at)??Pn(_.updated_at),updated_at:Pn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:Ve.get(D),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Hi,...io].map(_=>{let D=cs.get(_.attempt_id),le=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!le||typeof le!="object")return _;let Be=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,Ze=eo({bead_id:D.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Be?{step:le.cursor,reason:Be}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Ze?{..._,landing:Ze}:_}),Nl=null;if(Ln){let _=Pl(Ln),D=Ln.cause_detail;Nl={bead_id:Ln.bead_id,repo:Ln.repo||"",reason:Ln.cause||Ln.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Ln.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Bn(so,Ln.bead_id,{attempt_id:Ln.attempt_id})}}let ql=new Set(Dr.map(_=>_.bead_id)),Gi=Array.isArray(p.merge_queue)?p.merge_queue:[],Fl=new Map,jl=new Map,Bl=new Map,Ul=new Map,Wl=new Map;Gi.forEach((_,D)=>{_&&typeof _.bead_id=="string"&&(Fl.set(_.bead_id,D+1),jl.set(_.bead_id,_.resolution),Bl.set(_.bead_id,_.continuation_action||null),Ul.set(_.bead_id,_.head_review||null),Wl.set(_.bead_id,_.authority||null))});let Nr=p.merge_queue_state||{active:null,failures:{}},r_=Nr.failures||{},zl=Nr.waiting&&typeof Nr.waiting.bead_id=="string"&&typeof Nr.waiting.reason=="string"?Nr.waiting:null,s_=p.auto_merge_skips||{},Hl=_=>{let D=s_[_];if(!D)return null;let le=w[_],Be=le&&le.pr?le.pr.head_sha:null;return Be&&Be===D.head_sha?D.reason||"":null},ao=new Map;for(let _ of Dr)_.failed!==!0&&_.conflict_resolution&&(_.paused?ao.has(_.bead_id)||ao.set(_.bead_id,"paused"):ao.set(_.bead_id,"running"));let Gl=Dr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,Kl=(p.workspace_info||{}).slots,Vl=typeof Kl=="number"?Kl:typeof p.slots=="number"?p.slots:Fi,o_=Gl>Vl,lo=$r(j),i_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>lo===void 0||typeof _.added_at!="number"||_.added_at>=lo).sort((_,D)=>(D.added_at||0)-(_.added_at||0)),us=Ui(i_,"done"),a_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),Yl=[],l_=l?.()||"";for(let _ of de){let D=Pn(_.closed_at);if(typeof _.id!="string"||a_.has(_.id)||D===null||lo!==void 0&&D<lo||typeof _.comment_count!="number"||_.comment_count<=0)continue;let le=`${l_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Be=Y.get(le);if(Be===void 0&&n&&(Y.set(le,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Ze=>{let Qt=Array.isArray(Ze)&&Ze.some(qt=>ti(typeof qt?.text=="string"?qt.text:"")?.lane==="session");Y.set(le,Qt?"session":"not-session"),Me()}).catch(()=>{Y.set(le,"failed"),Me()})),Be==="session"){let Ze=Pn(_.started_at);Yl.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Ze!==null&&D>=Ze?D-Ze:null,work_kind:"session",done_at:D,created_at:_.created_at,updated_at:_.updated_at})}}us.push(...Yl),us.sort((_,D)=>(D.done_at||0)-(_.done_at||0));let co={};for(let _ of Kn)co[_]=0;let Zl=!1,Ql=0,Ki=0,Xl=0;for(let _ of us){let D=_.usage;if(D&&typeof D=="object"){let le=!1;for(let Be of Kn)Number.isFinite(D[Be])&&(co[Be]+=D[Be],Zl=!0,le=!0);le&&(Ki+=1,Number.isFinite(D.total_cost_usd)&&(Ql+=D.total_cost_usd,Xl+=1))}}Ki>0&&Xl===Ki&&(co.total_cost_usd=Ql);let Jl=us.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),c_=Jl.length>0?cn(Bo(Jl)):Zl?er(co):null,ec=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},tc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],nc=_=>{if(y.some(Be=>Be.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Mr.filter(Be=>Be&&Be.bead_id===_),le=D.length>0?D[D.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},uo=tc.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,D)=>{let le=ec[_.id]||{},Be=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(Rt=>Rt&&typeof Rt.bead_id=="string"&&typeof Rt.after=="string").map(Rt=>[Rt.bead_id,Rt.after])),Ze=Array.isArray(le.occupied_by)?le.occupied_by.filter(Rt=>typeof Rt=="string"):[],Qt=new Set(Ze),qt=Ui(_.entries.filter(Rt=>!ql.has(Rt.bead_id)&&!Qt.has(Rt.bead_id)),_.id).map(Rt=>Be.has(Rt.id)?{...Rt,badges:[`\u{1F517} ${Be.get(Rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Rt.badges]}:Rt),qr=Ze.map(Rt=>({id:Rt,title:Ge.get(Rt)||Rt,draggable:!1,lane:_.id,ghost:!0,badges:[nc(Rt)]}));return{id:_.id,index:D+1,rows:[...qr,...qt],occupied:Ze.length>0,badge:Ze.length>0?nc(Ze[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),rc=typeof p.serial_lane_count=="number"?p.serial_lane_count:uo.length,Vi=Ui(ie.filter(_=>!ql.has(_.bead_id)),"queue"),sc=new Map,oc=new Set;for(let[_,D]of Object.entries(ec)){if(!/^s[1-5]$/.test(_))continue;let le=D&&Array.isArray(D.occupied_by)?D.occupied_by:[];for(let Be of le)typeof Be=="string"&&sc.set(Be,_);le.length>0&&oc.add(_)}let ar=[];for(let _ of Dr)typeof _.bead_id=="string"&&ar.push({id:_.bead_id,title:Ge.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:sc.get(_.bead_id)??null});for(let _ of y){let D=_&&_.bead_id;typeof D!="string"||D.length===0||ar.push({id:D,title:Ge.get(D)||D,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of uo)for(let D of _.rows)D.ghost!==!0&&ar.push({id:D.id,title:D.title,location_label:`${_.id} #${D.seq??""}`.trim(),kind:"serial",lane_id:_.id});Vi.forEach((_,D)=>{ar.push({id:_.id,title:_.title,location_label:`#${D+1}`,kind:"parallel",lane_id:null})});for(let _ of Bi)ar.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let ic={};for(let _ of tc)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(ic[_.id]=_.entries.length);let Yi=new Map;for(let _ of ar)Yi.has(_.id)||Yi.set(_.id,_);B={members_by_id:Yi,serial_raw_lengths:ic,serial_lane_count:rc,occupied_lanes:oc};let u_=Ud(p.bead_scope,ar),po=new Map;for(let[_,D]of Dl)po.set(_,D);for(let[_,D]of Ll)po.set(_,D);for(let[_,D]of Object.entries(ir))Array.isArray(D)&&po.set(_,D.filter(le=>typeof le=="string"&&le.length>0));let d_=Sp(po,ar,Pr),Zi=(_,D=null)=>{let le=u_.get(_),Be=d_.get(_)||null,Ze=le&&le.overlaps.length>0?le.overlaps:null,Qt=!!le&&le.scope_missing;if(!Be&&!Ze&&!Qt)return D;let qt=Ze?ut(_,Ze):null;return{...D||{},...Be?{predecessors:Be}:{},...Ze?{overlaps:Ze}:{},...Qt?{scope_missing:!0}:{},...qt?{popover:qt}:{}}},Qi=_=>{let D=Zi(_.id,_.dependency_chips||null);return D&&(_.dependency_chips=D),_};for(let _ of Vi)Qi(_);for(let _ of uo)for(let D of _.rows)D.ghost!==!0&&Qi(D);for(let _ of Bi)Qi(_);let ac=new Map;for(let _ of Dr){let D=typeof _.bead_id=="string"?_.bead_id:"";if(D.length===0)continue;let le=_.kind==="session",Be=Zi(D),Ze=typeof _.attempt_id=="string"&&_.attempt_id.length>0?cs.get(_.attempt_id):void 0,Qt=Ze&&Ze.last_activity&&typeof Ze.last_activity=="object"?Ze.last_activity:null,qt=Ze&&Array.isArray(Ze.legs)?Ze.legs:[];!Be&&!Qt&&qt.length===0&&!le||ac.set(D,{...Qt?{last_activity:Qt}:{},...qt.length>0?{legs:qt}:{},...Be?{dependency_chips:Be}:{}})}let p_=y.map(_=>Pv(_.bead_id,Ge.get(_.bead_id)||_.bead_id,w,x[_.bead_id]||null,Tn(p.attempts||{},_.bead_id),q[_.bead_id]||(ee.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ne.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ao.get(_.bead_id)||null,_.external===!0,{position:Fl.get(_.bead_id)||0,active:Nr.active===_.bead_id,failure:r_[_.bead_id]||null,waiting:zl?.bead_id===_.bead_id?zl.reason:null,resolution:jl.get(_.bead_id),continuation_action:Bl.get(_.bead_id),head_review:Ul.get(_.bead_id)||null,authority:Wl.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?Hl(_.bead_id):null,Sl(oo,t_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},cs.get(Il.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},Zi(_.bead_id))).map(_=>({..._,workflow:Sn[_.id]||null,priority:Ve.get(_.id),...m(_.id)}));return{queue:p,idToTitle:Ge,candidates:Bi,candidate_hidden:{blocked:ji.hidden_blocked,spec:ji.hidden_spec},running:Dr,live_count:Gl,slots:Vl,over_cap:o_,failure:Nl,waiting:Vi,serial_lanes:uo,serial_lane_count:rc,running_overlays:ac,pr_wait:p_,merge_queue_length:Gi.length,merge_queue_running:Gi.length>0,auto_excluded:y.map(_=>_.bead_id).filter(_=>Hl(_)!==null),declared_base:oo,done:us,token_total:c_,cleanup_failures:z,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function C(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",F=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,de=Ye(p),ke=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",at=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(M=>M&&typeof M.armed_by_lane=="string"&&M.armed_by_lane.length>0).length,Je=at>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${at}건 진행 중</span
          >`:"",Zt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Q()} 완료 <b>${p.done.length}</b></span
      >`,Nt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,He=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Fi}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Rf},(M,xe)=>xe+1).map(M=>c`<option
                value=${String(M)}
                ?selected=${p.serial_lane_count===M}
              >
                ${M}
              </option>`)}
        </select>
      </label> `,$=Zd({failure:p.failure}),re=Nd(p.repo_operations,p.cleanup_failures);return U?c`<div class="worker-ribbon">
          ${F} ${de}
          <div class="worker-kpi worker-kpi--ribbon">
            ${ke}${Je}${Zt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${He}</div>
          <div class="worker-kpi">${Nt}</div>
        </div>
        ${re}${st.template()}${$}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${de}${He}</div>
        <div class="worker-kpi">
          ${ke}${Je}${Zt}${Nt}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${Q()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(M=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${M.tooltip}
                >${Q()} 완료 · 누적 ${M.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${re}${st.template()}${$}`}function ge(p){let v=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${V.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${_v.map(F=>c`<button
              type="button"
              class="worker-filter__chip${V.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${V.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Ue(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${L}
    >
      ${qf.map(p=>c`<option value=${p.value} ?selected=${L===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function we(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${Br.map(p=>c`<option value=${p.value} ?selected=${j===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function Ye(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
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
      </button>`;let F=new Set(p.auto_excluded),de=p.pr_wait.filter(ke=>ke.merge_action&&ke.merge_enabled&&!F.has(ke.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${de>0?` ${de}`:""}
    </button>`}function kt(p){return Ai({parallel:{rows:p.waiting.map(v=>Un(v)),count:p.waiting.length,collapsed:ce.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(v=>({id:v.id,title:`\uC9C1\uB82C ${v.index}`,rows:v.rows.map(F=>Un(F)),count:v.rows.length,empty:v.rows.length===0,badge:v.badge,held:v.occupied,cycle:v.cycle})),collapsed:ce.isAreaCollapsed("serial")}})}function $t(p){return Qd(p.running,Date.now(),E,p.running_overlays)}function At(p){return p.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0)}function Lt(p){let v=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ue(),controls:ge(p),collapsible:!0,collapsed:ce.isCollapsed("candidate"),place_menu:te(p.candidates),onOpenDoc:d?(de,ke)=>d(ke):void 0}),F=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${Q()} \uC644\uB8CC \uC5C6\uC74C`,header_control:we(),collapsible:!0,collapsed:ce.isCollapsed("done"),preview:U?Array.isArray(p.token_total)?p.token_total.map(de=>de.label).join(" \xB7 "):p.token_total||If(p.done):void 0});return U?c`<div class="worker-lanes worker-lanes--mobile">
        ${Si({live:At(p),running_body:p.running.length>0?$t(p):"",pr_wait_rows:p.pr_wait.map(de=>Un(de)),count:p.running.length+p.pr_wait.length})}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:ce.isCollapsed("queue"),preview:If(p.waiting),body:kt(p)})}
        ${v} ${F}
      </div>`:c`<div class="worker-lanes">
      ${v}
      ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:ce.isCollapsed("queue"),body:kt(p)})}
      ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:At(p),collapsible:!0,collapsed:ce.isCollapsed("running"),body:$t(p)})}
      ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:ce.isCollapsed("pr_wait")})}
      ${F}
    </div>`}function It(p){ce.toggle(p),Me()}function vn(p){ce.toggleArea(p),Me()}function Me(){let p=I();rt(C(p),fe),rt(Lt(p),vt)}function en(){let p=!0,v=_i(F=>{if(U=F,p){p=!1;return}Me()});W.push(v)}let tn=null;function on(p){tn=p.target instanceof Element?p.target:null}function it(p){let F=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(tn&&F.contains(tn)&&tn.closest("input, button, a")){p.preventDefault();return}let de=F.dataset.beadId||"",ke=F.dataset.lane||"";N={bead_id:de,from_lane:ke},Ie.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",de),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function nn(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let F=v.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function Re(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function S(){Ie.classList.remove("is-dragging")}function me(p,v){let F=G.find(Je=>Je.id===p);if(!F)return;let de=G.filter(Je=>Je.id!==p),ke=de.length;if(v){let Je=v.dataset.beadId;if(Je===p)return;let Zt=de.findIndex(Nt=>Nt.id===Je);Zt>=0&&(ke=Zt)}let at=de.slice();at.splice(ke,0,F),k.applyReorder(p,at,ke)}function Se(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over"),Ie.classList.remove("is-dragging");let F=v.dataset.lane||"",de=N?.bead_id||p.dataTransfer?.getData("text/plain")||"",ke=N?.from_lane||"";if(N=null,!de)return;let at=p.target?.closest?.(".worker-mini, .worker-card"),Je=F==="queue"&&v.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||v,Zt=Array.from(Je.querySelectorAll(".worker-mini, .worker-card")),Nt=Zt.length;if(at){let He=Zt.indexOf(at);He>=0&&(Nt=He)}if(Nt=Math.max(0,Nt-Je.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(Nt=pt()),F==="candidate"){if(ke==="candidate"){me(de,at);return}(ke==="queue"||/^s[1-5]$/.test(ke))&&qe(de);return}if(F==="queue"||/^s[1-5]$/.test(F)){let He=F==="queue"?"parallel":F;ke===F?Oe(de,He,Nt):et(de,He)}}function yt(p){V=p,pv(p),Me()}function Dt(p){L=Ff(p),gv(L),Me()}function Ct(p){j=Hn(p),hv(j),h?.(j),Me()}function Ut(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let Zt=Number.parseInt(v.value,10);Number.isFinite(Zt)&&Fe(Zt).then(Me);return}let F=p.target?.closest?.(".worker-filter__blocked");if(F){yt({...V,show_blocked:F.checked});return}let de=p.target?.closest?.(".worker-done-range");if(de){Ct(de.value);return}let ke=p.target?.closest?.(".worker-sort");if(ke){Dt(ke.value||El);return}let at=p.target?.closest?.(".worker-slots__input");if(!at)return;let Je=Number.parseInt(at.value,10);if(!Number.isFinite(Je)){Me();return}Le(Je).then(Me)}function Vt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rn(){let p=I(),v=ot().workspace_info,F=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:F}}function wn(){E&&se.close(),ft.hidden=!1,Te.hidden=!1,Ce.open(rn()),Me()}function Pt(p){let v=ot(),F=v.attempts?v.attempts[p]:null;E=p,Ce.close(),ft.hidden=!0,Te.hidden=!1,se.open({attempt_id:p,meta:Vt(F)}),Me()}function An(p){let v=ot(),F=(Array.isArray(v.session_active)?v.session_active:[]).find(ke=>ke&&ke.bead_id===p),de=(F&&Array.isArray(F.session_refs)?F.session_refs:[]).find(ke=>ke&&ke.current===!0);de&&(Ce.close(),ft.hidden=!0,Te.hidden=!1,se.open(Zr(de,p,"in_progress")),Me())}function Rn(){if(Ce.isOpen()&&Ce.refresh(rn()),!E)return;let p=ot(),v=p.attempts?p.attempts[E]:null;if(v){se.updateMeta(Vt(v));return}se.close()}function A(p,v){if(p.length===0||!a)return;let F=l?l():void 0;if(v.length===0||!F||v===F||!u){a(p);return}Promise.resolve(u(v)).then(()=>{a(p)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function O(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let F=v?.closest?.(".worker-dep__open");if(F){A(F.getAttribute("data-dep-id")||"",F.getAttribute("data-root-dir")||"");return}let de=v?.closest?.(".mon-overlap__chip");if(de){let x=de.closest("[data-bead-id]"),z=x&&x.getAttribute("data-bead-id")||"";if(z){let ie=de.getAttribute("data-overlap-id")||"";X=!!X&&X.bead_id===z&&X.counterpart_id===ie?null:{bead_id:z,counterpart_id:ie},Me()}return}let ke=v?.closest?.(".mon-overlap__place");if(ke){let x=ke.closest("[data-bead-id]"),z=x&&x.getAttribute("data-bead-id")||"";z&&ze(z,ke.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){wn();return}let at=v?.closest?.(".worker-repo-op__dismiss");if(at){H(at.dataset.operationId||"");return}let Je=v?.closest?.(".worker-cleanup__resume");if(Je){let x=Je.dataset.beadId;x&&Yt(x);return}let Zt=v?.closest?.(".worker-banner__resume");if(Zt){let x=Zt.dataset.attemptId;x&&_t(x);return}let Nt=v?.closest?.(".worker-banner__discard");if(Nt){let x=Nt.dataset.confirmation==="merged"?"merged":"unmerged";R(Nt.dataset.beadId||"",Nt.dataset.attemptId||null,x,Nt.dataset.operationId||null);return}let He=v?.closest?.(".worker-banner__dismiss");if(He){let x=He.dataset.attemptId;x&&ct(x);return}if(v?.closest?.(".worker-play")){T(!ot().auto_advance);return}let $=v?.closest?.(".worker-merge-all");if($){$.classList.contains("worker-merge-all--stop")?ot().auto_merge===!0?Ot(!1):We():Ot(!0);return}let re=v?.closest?.(".worker-pane__toggle[data-lane]");if(re){let x=re.dataset.lane;(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&It(x);return}let M=v?.closest?.(".worker-wait__area-toggle[data-area]");if(M){let x=M.dataset.area;(x==="parallel"||x==="serial")&&vn(x);return}let xe=v?.closest?.(".worker-card__place-lane");if(xe){let x=xe.dataset.beadId,z=xe.dataset.lane;x&&(z==="parallel"||/^s[1-5]$/.test(z||""))&&(ae=null,Me(),et(x,z));return}if(v?.closest?.(".worker-card__place-cancel")){ae=null,Me();return}let Ge=v?.closest?.(".worker-card__place");if(Ge){let x=Ge.dataset.beadId;x&&!Ge.disabled&&(mt()?(ae=x,Me()):et(x,"parallel"));return}let wt=v?.closest?.(".worker-filter__chip");if(wt){let x=wt.dataset.spec;(x==="all"||x==="with"||x==="without")&&yt({...V,spec:x});return}let Ve=v?.closest?.(".worker-mini__merge");if(Ve){let x=Ve.dataset.beadId||"";ot().cleanup_failed?.[x]?Yt(x):Jt(x);return}let Wt=v?.closest?.(".worker-mini__merge-cancel");if(Wt){ht(Wt.dataset.beadId||"");return}let an=v?.closest?.(".worker-mini__discard");if(an){R(an.dataset.beadId||"",an.dataset.attemptId||null,an.dataset.discardMode==="merged"?"merged":"unmerged",an.dataset.operationId||null);return}let Sn=v?.closest?.(".worker-mini__stale-continue");if(Sn){J("worker-stale-work-continue",Sn.dataset.beadId||"",Sn.dataset.actionId||"");return}let On=v?.closest?.(".worker-mini__stale-backup");if(On){J("worker-stale-work-backup-fresh",On.dataset.beadId||"",On.dataset.actionId||"");return}let ir=v?.closest?.(".worker-mini__stale-recheck");if(ir){J("worker-stale-work-recheck",ir.dataset.beadId||"",ir.dataset.actionId||"");return}let Pr=v?.closest?.(".worker-mini__revise-fix");if(Pr){pe("worker-revise-fix",Pr.dataset.beadId||"");return}let f=v?.closest?.(".worker-mini__revise-approve");if(f){pe("worker-revise-approve",f.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let x=v?.closest?.(".rtile"),z=x?.dataset?.beadId,ie=x?.dataset?.attemptId;z&&R(z,ie||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let z=v?.closest?.(".rtile")?.dataset?.attemptId;z&&ct(z);return}if(v?.closest?.(".rtile__pause")){let z=v?.closest?.(".rtile")?.dataset?.attemptId;z&&lt(z);return}if(v?.closest?.(".rtile__resume")){let z=v?.closest?.(".rtile")?.dataset?.attemptId;z&&_t(z);return}if(v?.closest?.(".rtile__session")){let x=v?.closest?.(".rtile"),z=x?.dataset?.attemptId;if(z){Pt(z);return}let ie=x?.dataset?.beadId;ie&&An(ie);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Ce.close(),se.close();return}if(v?.closest?.(".worker-drawer-host"))return;let m=v?.closest?.(".rtile .board-card__roll-toggle");if(m){let x=m.dataset.rollParent;x&&(Ne.has(x)?Ne.delete(x):Ne.add(x),Me());return}let y=v?.closest?.(".rtile .board-card__roll-child");if(y){let x=y.dataset.childId;x&&a&&a(x);return}let w=v?.closest?.(".rtile");if(w){if(v?.closest?.(".rtile__id")){let z=w.dataset.beadId;z&&Mn(z).then(ie=>{ie?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let x=w.dataset.beadId;x&&a&&a(x);return}let q=v?.closest?.(".worker-mini, .worker-card");if(q){let x=q.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){x&&Mn(x).then(ie=>{ie?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let z=v?.closest?.(".ctl-chip--from");if(z){let ie=z.dataset.fromId;ie&&a&&a(ie);return}x&&a&&a(x)}}e.addEventListener("pointerdown",on),e.addEventListener("dragstart",it),e.addEventListener("dragover",nn),e.addEventListener("dragleave",Re),e.addEventListener("dragend",S),e.addEventListener("drop",Se),e.addEventListener("click",O),e.addEventListener("change",Ut);function De(p){if(!X)return;let v=p.target;v&&typeof v.closest=="function"&&v.closest(".mon-overlap__popover, .mon-overlap__chip")||(X=null,Me())}function je(p){p.key!=="Escape"||!X||(X=null,Me())}return document.addEventListener("click",De),document.addEventListener("keydown",je),W.push(()=>{document.removeEventListener("click",De),document.removeEventListener("keydown",je)}),en(),b&&W.push(b.subscribe(()=>{for(let[p,v]of Y)v==="failed"&&Y.delete(p);Me()})),s&&W.push(s.subscribe(()=>{let p=l&&l()||"";p!==Qe&&(Qe=p,Pe.close()),Me(),Rn()})),Me(),{load(){_e(),Me()},refreshSessionDefaults:$e,destroy(){for(let p of W.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",on),e.removeEventListener("dragstart",it),e.removeEventListener("dragover",nn),e.removeEventListener("dragleave",Re),e.removeEventListener("dragend",S),e.removeEventListener("drop",Se),e.removeEventListener("click",O),e.removeEventListener("change",Ut);try{se.destroy()}catch{}Te.hidden=!0;try{Pe.destroy()}catch{}rt(c``,e)}}}function Cl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Bf(e,t,n,r=async()=>{},s=async()=>{}){let o=Ht("views:workspace-picker"),i=null,a=!1,l=!1,u=!1;async function d(j){let Q=j.target.value,U=t.getState().workspace?.current?.path||"";if(Q&&Q!==U){o("switching workspace to %s",Q),a=!0,L();try{await n(Q)}catch(ee){o("workspace switch failed: %o",ee)}finally{a=!1,L()}}}async function g(){let j=t.getState(),Y=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!Y||l)){o("git-pulling workspace %s",Y),l=!0,L();try{await r(Y)}catch(Q){o("workspace git pull failed: %o",Q)}finally{l=!1,L()}}}function h(j){let Y=j.target;Y&&e.contains(Y)||N()}function b(j){j.key==="Escape"&&N()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),L())}function N(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),L())}function G(){u?N():k()}async function V(j){let Y=j.target,Q=Y.value,ce=Y.checked;o("toggling visibility %s \u2192 %s",Q,String(ce));try{await s(Q,ce)}catch(U){o("workspace visibility toggle failed: %o",U)}}function ae(j){return j?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(j,Y){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${G}
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
                ${j.map(Q=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Q.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Q.path}"
                        .checked=${!Y.has(Q.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Cl(Q.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let j=t.getState(),Y=j.workspace?.current,Q=j.workspace?.available||[],ce=new Set(j.workspace?.hidden||[]),U=Y?.path||Q[0]?.path||"";if(Q.length===0)return c``;let ee=Q.filter(ne=>!ce.has(ne.path)||ne.path===U);if(ee.length<=1){let ne=ee[0]||Q[0],oe=Cl(ne.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ne.path}"
            >${oe}</span
          >
          ${X(Q,ce)}
          ${ae(U)}
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
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${ee.map(ne=>c`
              <option
                value="${ne.path}"
                ?selected=${ne.path===U}
                title="${ne.path}"
              >
                ${Cl(ne.path)}
              </option>
            `)}
        </select>
        ${X(Q,ce)}
        ${ae(U)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){rt(B(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),rt(c``,e)}}}var Uf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Rl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Wf(e,t,n=Rl()){return{id:n,type:e,payload:t}}function zf(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,u=new Map,d=[],g=new Map,h=new Set;function b(B){for(let L of Array.from(h))try{L(B)}catch{}}function k(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*B,j=Math.max(0,Math.round(B+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",j,i+1),a=setTimeout(()=>{a=null,X()},j)}function N(B){try{s?.send(JSON.stringify(B))}catch(L){t("ws send failed",L)}}function G(){for(o="open",t("ws open"),b(o),i=0;d.length;){let B=d.shift();B&&N(B)}}function V(B){let L;try{L=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let Y=u.get(L.id);u.delete(L.id),L.ok?Y?.resolve(L.payload):Y?.reject(L.error||new Error("ws error"));return}let j=g.get(L.type);if(j&&j.size>0)for(let Y of Array.from(j))try{Y(L.payload)}catch(Q){t("ws event handler error",Q)}else t("ws received unhandled message type: %s",L.type)}function ae(){o="closed",t("ws closed"),b(o);for(let[B,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(B);i+=1,k()}function X(){if(!l)return;let B=r();try{s=new WebSocket(B),t("ws connecting %s",B),o="connecting",b(o),s.addEventListener("open",G),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(L){t("ws connect failed %o",L),k()}}return X(),{send(B,L){if(!Uf.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let j=Rl(),Y=Wf(B,L,j);return t("send %s id=%s",B,j),new Promise((Q,ce)=>{u.set(j,{resolve:Q,reject:ce,type:B}),s&&s.readyState===s.OPEN?N(Y):(t("queue %s id=%s (state=%s)",B,j,o),d.push(Y))})},on(B,L){g.has(B)||g.set(B,new Set);let j=g.get(B);return j?.add(L),()=>{j?.delete(L)}},onConnection(B){return h.add(B),()=>{h.delete(B)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,X()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function Mv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Dv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ol=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Hf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],mr="tab:worker:closed",Nv="bdui.worker.done-range",Gf=Kp,Kf="worker:queue",Vf="ui:order",Yf="ui:display-policy",Zf="exec:presets",gr="tab:board:closed",Qf="beads-ui.board.closed-range";function qv(e){let t=Ht("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&_f(i),a&&l&&u&&d){let P=function(A,O){let De="Request failed",je="";if(A&&typeof A=="object"){let v=A;if(typeof v.message=="string"&&v.message.length>0&&(De=v.message),typeof v.details=="string")je=v.details;else if(v.details&&typeof v.details=="object")try{je=JSON.stringify(v.details,null,2)}catch{je=""}}else typeof A=="string"&&A.length>0&&(De=A);let p=O&&O.length>0?`Failed to load ${O}`:"Request failed";W.open(p,De,je)},K=function(A){return`${it.getState().workspace.current?.path||""}\0${A}`},be=function(){se&&(se().catch(()=>{}),se=null),Ce=null,Pe=null},et=function(A){Qe=A;let O=()=>{Qe!==A||it.getState().selected_id!==A||(Qe=null,pt(A))};if(!mt){ot.then(O);return}O()},_t=function(A,O,De,je,p){return De!==lt[O]?(p().catch(()=>{}),!1):(A.set(je,p),!0)},Tt=function(){let A=it.getState();ht(A.view==="board"),H(A.view==="worker"),ut(A.view==="monitor"),Fe(A.view==="board"||A.view==="worker"||ct||!!A.selected_id)},Bt=function(){let A=$r(Jt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},Ot=function(){let A=$r(Yt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},ht=function(A){if(A)for(let[O,De]of Ol){if(Oe.has(O)||qe.has(O))continue;let je=O===gr?Bt():{type:De};try{fe.register(O,je)}catch(F){t("register %s store failed: %o",O,F)}qe.add(O);let p=lt.board,v=!1;Ie.subscribeList(O,je).then(F=>{v=!_t(Oe,"board",p,O,F)}).catch(F=>{t("subscribe %s failed: %o",O,F),P(F,"board")}).finally(()=>{qe.delete(O),v&&Tt()})}else J()},J=function(){lt.board+=1;for(let[A]of Ol){let O=Oe.get(A);O&&(O().catch(()=>{}),Oe.delete(A));try{fe.unregister(A)}catch(De){t("unregister %s failed: %o",A,De)}}},H=function(A){if(!A){Le();return}for(let[O,De]of Hf){if(pe.has(O)||qe.has(O))continue;let je=O===mr?Ot():{type:De};try{fe.register(O,je)}catch(F){t("register %s store failed: %o",O,F)}qe.add(O);let p=lt.worker,v=!1;Ie.subscribeList(O,je).then(F=>{v=!_t(pe,"worker",p,O,F)}).catch(F=>{t("subscribe %s failed: %o",O,F),P(F,"worker")}).finally(()=>{qe.delete(O),v&&Tt()})}},Le=function(){lt.worker+=1;for(let[A]of Hf){let O=pe.get(A);O&&(O().catch(()=>{}),pe.delete(A));try{fe.unregister(A)}catch(De){t("unregister %s failed: %o",A,De)}}},Fe=function(A){if(!A){Ae();return}T||($e("subscribe-worker-queue",{id:Kf}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),T=()=>$e("unsubscribe-worker-queue",{id:Kf}))},Ae=function(){T&&(T().catch(()=>{}),T=null)},ut=function(A){if(!A){ze();return}Xe||($e("subscribe-monitor-pipeline",{id:Gf}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),Xe=()=>$e("unsubscribe-monitor-pipeline",{id:Gf}))},ze=function(){Xe&&(Xe().catch(()=>{}),Xe=null)},I=function(){tt||($e("subscribe-ui-order",{id:Vf}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),tt=()=>$e("unsubscribe-ui-order",{id:Vf}))},C=function(){tt&&(tt().catch(()=>{}),tt=null),nt.clear()},Ue=function(){ge||($e("subscribe-display-policy",{id:Yf}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),ge=()=>$e("unsubscribe-display-policy",{id:Yf}))},we=function(){ge&&(ge().catch(()=>{}),ge=null),ft.clear()},kt=function(){Ye||($e("subscribe-impl-presets",{id:Zf}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),Ye=()=>$e("unsubscribe-impl-presets",{id:Zf}))},Me=function(A){if(!A)return"Unknown";let O=A.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},Ut=function(A,O){Ct.open(A.path,{missing_state:A.missing_state,...O?{workspace:O}:{}})};var g=P,h=K,b=be,k=et,N=_t,G=Tt,V=Bt,ae=Ot,X=ht,B=J,L=H,j=Le,Y=Fe,Q=Ae,ce=ut,U=ze,ee=I,ne=C,oe=Ue,ye=we,Ne=kt,he=Me,Z=Ut;let ve=document.getElementById("header-loading"),Ee=Wc(ve),W=Id(e),_e=zf(),$e=Ee.wrapSend((A,O)=>_e.send(A,O)),Ie=Dc($e),fe=Nc(),Te=Fc(),St=kc(),nt=qc(),ft=vc(),vt=wc(),E=$c();_e.on("impl-presets-snapshot",A=>{let O=A;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&vt.set({revision:O.revision,presets:O.presets})}),_e.on("monitor-pipeline-snapshot",A=>{let O=A;if(!(!O||!Array.isArray(O.workspaces)))try{St.set(O.workspaces,O.workspaces_state,O.cross_lanes)}catch{}}),_e.on("ui-order-snapshot",A=>{let O=A;if(O&&typeof O.revision=="number")try{nt.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),_e.on("display-policy-snapshot",A=>{let O=A;if(O&&O.policy&&typeof O.policy=="object")try{ft.set(O.policy)}catch{}}),_e.on("session-log-snapshot",A=>{let O=A;if(O&&typeof O.id=="string")try{E.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),_e.on("session-log-append",A=>{let O=A;if(O&&typeof O.id=="string")try{E.append(O.id,O.event)}catch{}}),_e.on("snapshot",A=>{let O=A,De=O&&typeof O.id=="string"?O.id:"",je=De?fe.getStore(De):null;if(je&&O&&O.type==="snapshot")try{je.applyPush(O)}catch{}}),_e.on("upsert",A=>{let O=A,De=O&&typeof O.id=="string"?O.id:"",je=De?fe.getStore(De):null;if(je&&O&&O.type==="upsert")try{je.applyPush(O)}catch{}}),_e.on("delete",A=>{let O=A,De=O&&typeof O.id=="string"?O.id:"",je=De?fe.getStore(De):null;if(je&&O&&O.type==="delete")try{je.applyPush(O)}catch{}});let se=null,Ce=null,Pe=null,Qe=null,st=()=>{},ot=new Promise(A=>{st=()=>A(void 0)}),mt=!1,te=!1;async function pt(A){let O=K(A);if(O===Ce||O===Pe)return;Pe=O;let De=`detail:${A}`,je={type:"issue-detail",params:{id:A}};try{fe.register(De,je)}catch(p){t("register detail store failed: %o",p)}try{let p=await Ie.subscribeList(De,je);if(it.getState().selected_id!==A||K(A)!==O){await p().catch(()=>{});return}se&&await se().catch(()=>{}),se=p,Ce=O}catch(p){t("detail subscribe failed: %o",p),P(p,"issue details")}finally{Pe===O&&(Pe=null)}}let Oe=new Map,qe=new Set,lt={board:0,worker:0},ct=!1,Jt=wo;try{let A=window.localStorage.getItem(Qf);oa(A)&&(Jt=A)}catch{}let Yt="today";try{let A=window.localStorage.getItem(Nv);A!==null&&(Yt=Hn(A))}catch{}async function We(A){if(!oa(A)||A===Jt)return;Jt=A;try{window.localStorage.setItem(Qf,A)}catch{}let O=Oe.get(gr);if(!O)return;Oe.delete(gr),await O().catch(()=>{});let De=Bt();try{fe.register(gr,De)}catch(je){t("register %s store failed: %o",gr,je)}try{let je=await Ie.subscribeList(gr,De);Oe.set(gr,je)}catch(je){t("re-subscribe %s failed: %o",gr,je),P(je,"board")}}async function R(A){let O=Hn(A);if(O===Yt)return;Yt=O;let De=pe.get(mr);if(!De)return;pe.delete(mr),await De().catch(()=>{});let je=Ot();try{fe.register(mr,je)}catch(p){t("register %s store failed: %o",mr,p)}try{let p=await Ie.subscribeList(mr,je);pe.set(mr,p)}catch(p){t("re-subscribe %s failed: %o",mr,p),P(p,"worker")}}let pe=new Map,T=null,Xe=null,tt=null,ge=null,Ye=null;async function $t(){ge=null,ft.clear(),Ye=null,vt.clear(),T=null,Xe=null,Oe.clear(),pe.clear(),lt.board+=1,lt.worker+=1,kt();let A=it.getState().workspace.current?.path;if(A)try{await _e.send("set-workspace",{path:A})}catch(De){t("workspace restore after reconnect failed: %o",De);return}Ue();let O=it.getState();ht(O.view==="board"),H(O.view==="worker"),ut(O.view==="monitor"),Fe(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function At(){t("clearing all subscriptions for workspace switch"),J(),Le(),Ae(),Te.clear(),C(),I(),we(),Ue(),be();let A=it.getState();if(A.selected_id)try{fe.unregister(`detail:${A.selected_id}`)}catch{}let O=it.getState();ht(O.view==="board"),H(O.view==="worker"),ut(O.view==="monitor"),Fe(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&et(O.selected_id)}async function Lt(A){t("requesting workspace switch to %s",A),te=!0;try{let O=await _e.send("set-workspace",{path:A});t("workspace switch result: %o",O),O&&O.workspace&&(it.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),O.changed&&(await At(),ue("Switched to "+Me(A),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),ue("Failed to switch workspace","error",3e3),O}finally{te=!1}}async function It(A){t("requesting workspace git pull for %s",A);try{let O=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let De=O?.status;if(De==="up_to_date"){ue("Already up to date","success",2e3);return}if(De==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Me(A),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let De=O?.code,je=O?.message;if(De==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(De==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(De==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let p=je?`: ${je}`:"";throw ue(`Git pull failed${p}`,"error",3e3),O}}async function vn(A,O){t("setting workspace visibility %s \u2192 %s",A,String(O));try{await _e.send("set-workspace-visibility",{path:A,visible:O}),await en()}catch(De){t("workspace visibility update failed: %o",De),ue("Failed to update project visibility","error",3e3)}}async function en(){try{let A=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let O=A.workspaces.map(v=>({path:v.path,database:v.database,pid:v.pid,version:v.version})),De=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,je=Array.isArray(A.hidden)?A.hidden.filter(v=>typeof v=="string"):[];it.setState({workspace:{current:De,available:O,hidden:je}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!O.some(F=>F.path===p)||je.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):De&&p!==De.path&&(t("restoring saved workspace preference: %s",p),await Lt(p)))}}catch(A){t("failed to load workspaces: %o",A)}}_e.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(it.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),en(),At())});let tn=!1;if(typeof _e.onConnection=="function"){let A=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(tn=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&tn&&(tn=!1,ue("Reconnected","success",2200),Dv(it,(De,je)=>{t(`${De}: %o`,je)}),$t())};_e.onConnection(A)}let on="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(on=A)}catch(A){t("view parse error: %o",A)}let it=Uc({config:Mv(),view:on});_e.on("worker-queue-snapshot",A=>{let O=A;if(!O||!O.queue)return;let De=it.getState().workspace.current?.path;if(typeof De=="string"&&De.length>0&&O.root_dir!==De){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{Te.set(O.queue)}catch{}});let nn=jc(it);nn.start();let Re=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),S=async(A,O)=>{try{return await $e(A,O)}catch(De){if(Re.has(A))throw De;return[]}};Yp({global_element:r,repo_element:s},it,nn);let me=document.getElementById("workspace-picker");me&&Bf(me,it,Lt,It,vn);let Se=Jp(e,(A,O)=>$e(A,O));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>Se.open())}catch{}let yt=rf(e,{policyStore:ft,queueStore:Te,implPresetStore:vt,transport:(A,O)=>$e(A,O),onOpenChange:A=>{let O=ct;ct=A,Tt(),O&&A===!1&&rn.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[O]of Ol)for(let De of fe.snapshotFor(O)||[]){let je=De.labels;if(Array.isArray(je))for(let p of je)typeof p=="string"&&p.length>0&&A.add(p)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>yt.open()))}catch{}let Dt=document.createElement("div");Dt.className="md-viewer-root",document.body.appendChild(Dt);let Ct=pi(Dt,{getWorkspacePath:()=>it.getState().workspace.current?.path}),Vt=su(a,{gotoIssue:A=>nn.gotoIssue(A),issueStores:fe,transport:S,workerQueueStore:Te,uiOrderStore:nt,displayPolicyStore:ft,closedRange:Jt,onClosedRangeChange:A=>{We(A)},onNewIssue:()=>Se.open(),openDoc:Ut}),rn=Tl(l,{transport:S,issueStores:fe,queueStore:Te,sessionLogStore:E,uiOrderStore:nt,gotoIssue:A=>it.setState({selected_id:A}),getWorkspacePath:()=>it.getState().workspace.current?.path,switchWorkspace:A=>Lt(A),openDoc:Ut,doneRange:Yt,onDoneRangeChange:A=>{R(A)}}),wn=Vp(u,{transport:S,pipelineStore:St,execPresetStore:vt,sessionLogStore:E,router:nn,gotoIssue:A=>nn.gotoIssue(A),getWorkspacePath:()=>it.getState().workspace.current?.path,switchWorkspace:A=>Lt(A),openDoc:Ut}),Pt=Ld(d,{issueStores:fe,transport:S,queueStore:Te,execPresetStore:vt,sessionLogStore:E,getWorkspacePath:()=>it.getState().workspace.current?.path,mdViewer:Ct,onNavigate:A=>{it.getState().view==="worker"?it.setState({selected_id:A}):nn.gotoIssue(A)},onClose:()=>{let A=it.getState();it.setState({selected_id:null});try{nn.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{yt.open("execution")}}),An=it.getState().selected_id;An&&(d.hidden=!1,Pt.load(An),et(An)),it.subscribe(A=>{let O=A.selected_id;O?(d.hidden=!1,Pt.load(O),te||et(O)):(Pt.clear(),d.hidden=!0,be())});let Rn=A=>{a.hidden=A.view!=="board",l.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",o&&o.classList.toggle("is-quiet",A.view==="monitor"),ht(A.view==="board"),H(A.view==="worker"),ut(A.view==="monitor"),Fe(A.view==="board"||A.view==="worker"||ct||!!A.selected_id),!A.selected_id&&A.view==="board"&&Vt.load(),A.view==="worker"&&rn.load(),A.view==="monitor"?wn.load():wn.pause(),window.localStorage.setItem("beads-ui.view",A.view)};it.subscribe(Rn),Rn(it.getState()),I(),Ue(),kt(),en().finally(()=>{mt=!0,st()}),window.addEventListener("keydown",A=>{let O=A.ctrlKey||A.metaKey,De=String(A.key||"").toLowerCase(),je=A.target,p=je&&je.tagName?String(je.tagName).toLowerCase():"",v=p==="input"||p==="textarea"||p==="select"||je&&typeof je.isContentEditable=="boolean"&&je.isContentEditable;O&&De==="n"&&(v||(A.preventDefault(),Se.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&qv(t)});export{qv as bootstrap,Mv as readBootstrapConfig,Dv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
