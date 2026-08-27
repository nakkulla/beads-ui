var $_=Object.create;var ei=Object.defineProperty;var x_=Object.getOwnPropertyDescriptor;var A_=Object.getOwnPropertyNames;var S_=Object.getPrototypeOf,E_=Object.prototype.hasOwnProperty;var T_=(e,t,n)=>t in e?ei(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ti=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var C_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of A_(t))!E_.call(e,s)&&s!==n&&ei(e,s,{get:()=>t[s],enumerable:!(r=x_(t,s))||r.enumerable});return e};var R_=(e,t,n)=>(n=e!=null?$_(S_(e)):{},C_(t||!e||!e.__esModule?ei(n,"default",{value:e,enumerable:!0}):n,e));var Mt=(e,t,n)=>T_(e,typeof t!="symbol"?t+"":t,n);var Ic=ti((tw,Lc)=>{var Ur=1e3,Wr=Ur*60,zr=Wr*60,xr=zr*24,I_=xr*7,M_=xr*365.25;Lc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return P_(e);if(n==="number"&&isFinite(e))return t.long?N_(e):D_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function P_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*M_;case"weeks":case"week":case"w":return n*I_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Wr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function D_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=zr?Math.round(e/zr)+"h":t>=Wr?Math.round(e/Wr)+"m":t>=Ur?Math.round(e/Ur)+"s":e+"ms"}function N_(e){var t=Math.abs(e);return t>=xr?ko(e,t,xr,"day"):t>=zr?ko(e,t,zr,"hour"):t>=Wr?ko(e,t,Wr,"minute"):t>=Ur?ko(e,t,Ur,"second"):e+" ms"}function ko(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Pc=ti((nw,Mc)=>{function q_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Ic(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let h=0;h<d.length;h++)m=(m<<5)-m+d.charCodeAt(h),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,h=null,b,k;function F(...V){if(!F.enabled)return;let Z=F,le=Number(new Date),X=le-(m||le);Z.diff=X,Z.prev=m,Z.curr=le,m=le,V[0]=n.coerce(V[0]),typeof V[0]!="string"&&V.unshift("%O");let B=0;V[0]=V[0].replace(/%([a-zA-Z%])/g,(W,T)=>{if(W==="%%")return"%";B++;let M=n.formatters[T];if(typeof M=="function"){let se=V[B];W=M.call(Z,se),V.splice(B,1),B--}return W}),n.formatArgs.call(Z,V),(Z.log||n.log).apply(Z,V)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:V=>{h=V}}),typeof n.init=="function"&&n.init(F),F}function r(d,m){let h=n(this.namespace+(typeof m>"u"?":":m)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,m){let h=0,b=0,k=-1,F=0;for(;h<d.length;)if(b<m.length&&(m[b]===d[h]||m[b]==="*"))m[b]==="*"?(k=b,F=h,b++):(h++,b++);else if(k!==-1)b=k+1,F++,h=F;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function a(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function i(d){for(let m of n.skips)if(o(d,m))return!1;for(let m of n.names)if(o(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Mc.exports=q_});var Dc=ti((bn,$o)=>{bn.formatArgs=j_;bn.save=B_;bn.load=U_;bn.useColors=F_;bn.storage=W_();bn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();bn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function F_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function j_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+$o.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}bn.log=console.debug||console.log||(()=>{});function B_(e){try{e?bn.storage.setItem("debug",e):bn.storage.removeItem("debug")}catch{}}function U_(){let e;try{e=bn.storage.getItem("debug")||bn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function W_(){try{return localStorage}catch{}}$o.exports=Pc()(bn);var{formatters:z_}=$o.exports;z_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ds=globalThis,mo=ds.trustedTypes,gc=mo?mo.createPolicy("lit-html",{createHTML:e=>e}):void 0,ri="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,si="?"+Qn,O_=`<${si}>`,vr=document,ps=()=>vr.createComment(""),fs=e=>e===null||typeof e!="object"&&typeof e!="function",oi=Array.isArray,kc=e=>oi(e)||typeof e?.[Symbol.iterator]=="function",ni=`[ 	
\f\r]`,us=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bc=/-->/g,hc=/>/g,hr=RegExp(`>|${ni}(?:([^\\s"'>=/]+)(${ni}*=${ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yc=/'/g,vc=/"/g,$c=/^(?:script|style|textarea|title)$/i,ai=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ai(1),ms=ai(2),Vv=ai(3),Cn=Symbol.for("lit-noChange"),Wt=Symbol.for("lit-nothing"),wc=new WeakMap,yr=vr.createTreeWalker(vr,129);function xc(e,t){if(!oi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return gc!==void 0?gc.createHTML(t):t}var Ac=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=us;for(let i=0;i<n;i++){let l=e[i],u,d,m=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===us?d[1]==="!--"?a=bc:d[1]!==void 0?a=hc:d[2]!==void 0?($c.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=hr):d[3]!==void 0&&(a=hr):a===hr?d[0]===">"?(a=s??us,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?hr:d[3]==='"'?vc:yc):a===vc||a===yc?a=hr:a===bc||a===hc?a=us:(a=hr,s=void 0);let b=a===hr&&e[i+1].startsWith("/>")?" ":"";o+=a===us?l+O_:m>=0?(r.push(u),l.slice(0,m)+ri+l.slice(m)+Qn+b):l+Qn+(m===-2?i:b)}return[xc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},_s=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Ac(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ri)){let h=d[a++],b=s.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?bo:k[1]==="?"?ho:k[1]==="@"?yo:kr}),s.removeAttribute(m)}else m.startsWith(Qn)&&(l.push({type:6,index:o}),s.removeAttribute(m));if($c.test(s.tagName)){let m=s.textContent.split(Qn),h=m.length-1;if(h>0){s.textContent=mo?mo.emptyScript:"";for(let b=0;b<h;b++)s.append(m[b],ps()),yr.nextNode(),l.push({type:2,index:++o});s.append(m[h],ps())}}}else if(s.nodeType===8)if(s.data===si)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Qn,m+1))!==-1;)l.push({type:7,index:o}),m+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===Cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=fs(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var go=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new jr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new vo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Wt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),fs(t)?t===Wt||t==null||t===""?(this._$AH!==Wt&&this._$AR(),this._$AH=Wt):t!==this._$AH&&t!==Cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Wt&&fs(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=_s.createElement(xc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new go(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=wc.get(t.strings);return n===void 0&&wc.set(t.strings,n=new _s(t)),n}k(t){oi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(ps()),this.O(ps()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Wt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Wt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=wr(this,t,n,0),a=!fs(t)||t!==this._$AH&&t!==Cn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=wr(this,i[r+l],n,l),u===Cn&&(u=this._$AH[l]),a||(a=!fs(u)||u!==this._$AH[l]),u===Wt?t=Wt:t!==Wt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Wt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bo=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Wt?void 0:t}},ho=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Wt)}},yo=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Wt)===Cn)return;let r=this._$AH,s=t===Wt&&r!==Wt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Wt&&(r===Wt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Sc={M:ri,P:Qn,A:si,C:1,L:Ac,R:go,D:kc,V:wr,I:jr,H:kr,N:ho,U:yo,B:bo,F:vo},L_=ds.litHtmlPolyfillSupport;L_?.(_s,jr),(ds.litHtmlVersions??(ds.litHtmlVersions=[])).push("3.3.1");var st=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new jr(t.insertBefore(ps(),o),o,void 0,n??{})}return s._$AI(e),s};var wo="today",Ec=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Br=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Un(e){return e==="today"?"today":"7d"}function ii(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Rc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Oc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Nc=R_(Dc(),1);function Bt(e){return(0,Nc.default)(`beads-ui:${e}`)}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function jc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function xo(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Bc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=In(e.created_at),o=In(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Uc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var H_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function qc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Fc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=H_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Wc(e,t){let n=qc(e),r=qc(t);if(n!==r)return n<r?-1:1;let s=Fc(e),o=Fc(t);if(s!==o)return s<o?-1:1;let a=In(e&&e.created_at),i=In(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var li=2**20;function Hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Ao(e){return(t,n)=>{let r=Hr(t,e),s=Hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ci(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Hr(i,n)-li};if(!i)return{rank:Hr(a,n)+li};let l=Hr(a,n),u=Hr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,h)=>({bead_id:m.id,rank:h*li}))}}function ui(e,t={}){let n=Bt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Ar;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function m(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let F of k)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=b,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let F=r.get(k.id);if(!F)r.set(k.id,k);else{let V=Number.isFinite(F.updated_at)?F.updated_at:0,Z=Number.isFinite(k.updated_at)?k.updated_at:0;if(V<=Z){for(let le of Object.keys(F))le in k||delete F[le];for(let[le,X]of Object.entries(k))F[le]=X}}d()}o=b,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function So(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function zc(e){let t=Bt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let F=k.itemsById;for(let V of d)typeof V=="string"&&V.length>0&&F.set(V,!0);for(let V of m)typeof V=="string"&&V.length>0&&F.set(V,!0);for(let V of h)typeof V=="string"&&V.length>0&&F.delete(V)}}async function o(i,l){let u=So(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let m=n.get(i);if(m&&m.key!==u){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(m){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=n.get(i)||null;if(m){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:So,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Hc(){let e=Bt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let m=u?So(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,h),b&&h&&m&&h!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let V=ui(l,d);t.set(l,V);let Z=V.subscribe(()=>o());s.set(l,Z)}else if(!b){let k=ui(l,d);t.set(l,k);let F=k.subscribe(()=>o());s.set(l,F)}return n.set(l,m),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Kc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function di(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function G_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function K_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Yc(e){let t=Bt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):G_(r),a=K_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=di(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?di(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var V_=Object.freeze({workspace_config:{default_workspace:null}});function Zc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:V_.workspace_config.default_workspace}}}function Qc(e={}){let t=Bt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Zc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Zc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Xc(e){let t=Bt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(m,h)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),a();let F=!1,V=()=>{F||(F=!0,r.delete(b),i())},Z=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),V())},3e4);try{let le=await u(m,h),X=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,X),le}catch(le){let X=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,X,le),le}finally{clearTimeout(Z),V()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Uc),l;switch(i){case"created_desc":return l.sort(Ar),l;case"created_asc":return l.sort(jc),l;case"updated_desc":return l.sort(xo),l;case"priority":return l.sort(Bc),l;case"manual":default:{let u=n();return u?l.sort(Ao(u)):l.sort(Ar),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Wn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function un(e){let t=Wn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function hn(e,t){let n=Wn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Jc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Wn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function To(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Co(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=To(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ro(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Jc(n);return{total:n.length,count:r,current:s,children:n}}function Oo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ci(i,l,u.order),a);s(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(h);let b=r(ci(i,l,h.order),a);s(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function eu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Lo(e,t){let n=eu(e),r=eu(t);return n.length===0||r.length===0?!1:n!==r}function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function pi(e,t){return!t||typeof e!="string"||e.length===0||Io(t.visible_labels).includes(e)?!0:Io(t.hidden_labels).includes(e)?!1:!Io(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function tu(e,t){return Io(e).filter(n=>pi(n,t))}function ir(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Y_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Z_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Q_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Y_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Mo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Wc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Z_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>Q_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var X_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ru={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},nu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},J_={review:"\u2713",skip:"\u2298"},lr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function em(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function su(e){let t=e&&e.fill||"none";return t==="none"?lr.none:e&&e.stale===!0?lr.stale:t==="dim"?lr.dim:e&&e.glyph==="review"?lr.review:e&&e.glyph==="skip"?lr.skip:lr.done}function tm(e){if(!e||e.fill==="none"||!e.approval_state)return su(e);let t=[];return e.glyph==="review"?t.push(lr.review):e.glyph==="skip"&&t.push(lr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function nm(e,t,n,r){let s=X_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=J_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",m=ru[e]||e,h=r?ou(t):null;if(!h)return c`
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
  `}function ou(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Po(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=nu[e.route]||nu.spec_backed,o=e.stages,a=em(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${ru[u]||u} ${u==="plan"?tm(o[u]||{}):su(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>ou(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>nm(u,o[u]||{},u===a,r))}
    </div>
  `}function rm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var au=2;function iu(e){let t=e.slice(0,au).join(", "),n=e.length-au;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function sm(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Lo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${iu(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${iu(o)}</span
      >`),n}function fi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Do(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xn(e){return`${e.kind}:${Do(e)}@${e.sha}`}function No(e,t){if(!e)return null;let n=fi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=fi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Xn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function lu(e,t){let n=No(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function om(e){if(!e)return null;let t=fi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function am(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&ir(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&ir(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&ir(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=lu(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(i)}`}
        >${`exec ${i.kind==="delegated"?Do(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of tu(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&ir(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ir(n,"blocked")&&s.push(...sm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ir(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function im(e){let t=hn(e.created_at),n=hn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${un(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${un(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function lm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Mo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:im(e),empty_label:"children \uC5C6\uC74C",childChips:_i,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function _i(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return No(t,n)?c`<span class="board-card__roll-child-chips">
    ${lu(t,n)}
    ${om(n)}
  </span>`:null}function qo(e,t){let n=rm(e.priority);return c`
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
      ${am(e,t)}
      ${e.workflow&&ir(t.policy||null,"stepper")?Po(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${lm(e,t)}
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
              ${Ec.map(o=>c`<option
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
  `}function cu(e,t,n){return c`
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
  `}var cm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],um=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],dm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function pm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function uu(e,t,n){return c`
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
        ${cm.map(r=>c`<option
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
        ${um.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${pm(e,t,n)}
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
        ${dm.map(r=>c`<option
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
  `}var fm=200,_m={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},mm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),du="beads-ui.board.sort",pu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function gm(){try{let e=window.localStorage.getItem(du);if(e&&pu.has(e))return e}catch{}return"created_desc"}function fu(e,t){let n=Bt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,h=t.closedRange||wo,b=s?Eo(s,a):null,k=Oo({transport:o,uiOrderStore:a}),F=[],V=[],Z=[],le=[],X=[],B=[],N=!1,W=0,T=gm(),M=new Map,se=new Map,be=new Map,xe=new Set,ce={search:"",priority:"",type:"",labels:[]},_e=!1,Te=null;function qe(S){return String(S.status||"open")==="open"}function ke(S){let H=String(S.status||"open");return H==="open"||H==="blocked"}function ee(S){let H=ce.search.trim().toLowerCase(),Oe=ce.priority,x=ce.type,L=ce.labels;return S.filter(ne=>{if(H){let fe=String(ne.id||"").toLowerCase(),Ee=String(ne.title||"").toLowerCase();if(!fe.includes(H)&&!Ee.includes(H))return!1}if(Oe!==""&&String(ne.priority)!==Oe||x!==""&&String(ne.issue_type||"")!==x)return!1;if(L.length>0){let fe=Array.isArray(ne.labels)?ne.labels:[];if(!L.some(Ee=>fe.includes(Ee)))return!1}return!0})}function Ce(){let S=new Set;for(let H of[F,V,Z,le,X,B])for(let Oe of H){let x=Array.isArray(Oe.labels)?Oe.labels:[];for(let L of x)typeof L=="string"&&L.length>0&&S.add(L)}return Array.from(S).sort()}function Ie(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function Y(){try{if(b){let S=b.selectBoardColumn("tab:board:in-progress","in_progress",T),H=b.selectBoardColumn("tab:board:blocked","blocked",T).filter(ke),Oe=new Set(S.map(G=>G.id)),x=b.selectBoardColumn("tab:board:ready","ready",T).filter(G=>qe(G)&&!Oe.has(G.id)),L=b.selectBoardColumn("tab:board:resolved","resolved",T),ne=b.selectBoardColumn("tab:board:deferred","deferred",T),fe=b.selectBoardColumn("tab:board:closed","closed").slice(0,fm),Ee=[...H,...x,...S,...L,...fe];D(Ee);let A=new Set;for(let G of Ee)G&&G.id&&!To(G)&&A.add(G.id);let U=!Ie();F=U?gs(H,A):H,V=U?gs(x,A):x,Z=U?gs(S,A):S,le=U?gs(L,A):L,X=ne,W=ne.length,B=U?gs(fe,A):fe,M=new Map;for(let G of F)M.set(G.id,"open");for(let G of V)M.set(G.id,"open");for(let G of Z)M.set(G.id,"in_progress");for(let G of le)M.set(G.id,"resolved");for(let G of X)M.set(G.id,"deferred");for(let G of B)M.set(G.id,"closed");se=new Map;for(let G of F)se.set(G.id,"blocked-col");for(let G of V)se.set(G.id,"ready-col");for(let G of Z)se.set(G.id,"in-progress-col");for(let G of le)se.set(G.id,"resolved-col");for(let G of B)se.set(G.id,"closed-col")}pt()}catch{F=[],V=[],Z=[],le=[],X=[],B=[],be=new Map,pt()}}function D(S){be=Co(S)}function me(S){return Ro(be,S)}function Ae(S){return!xe.has(S)}function We(S,H){S.preventDefault(),S.stopPropagation(),xe.has(H)?xe.delete(H):xe.add(H),pt()}function pe(S,H){S.preventDefault(),S.stopPropagation(),r(H)}function Fe(S,H){S.preventDefault(),S.stopPropagation(),r(H)}function dt(S,H){Te||r(H)}function at(S,H){S.preventDefault(),S.stopPropagation(),bm(H).then(Oe=>{Oe&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function $t(S,H){Te=H,S.dataTransfer&&(S.dataTransfer.setData("text/plain",H),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function ct(S){S.target.classList.remove("board-card--dragging"),St(),setTimeout(()=>{Te=null},0)}function R(S){let H=String(S.target.value||"");!H||H===h||(h=H,u&&u(H),pt())}function ie(){return i?i.get():null}function Le(S){let H=l?l.get():null,Oe=H?H.cleanup_failed:null;if(!Oe||typeof Oe!="object"||Array.isArray(Oe))return null;let x=Oe[S];return!x||typeof x!="object"||Array.isArray(x)?null:x}let Ne={onCardClick:dt,onCopyId:at,onDragStart:$t,onDragEnd:ct,onClosedRangeChange:R,rollupFor:me,isExpanded:Ae,onRollupToggle:We,onChildClick:pe,onFromChipClick:Fe,onOpenDoc:m?(S,H)=>m(H):void 0,cleanupFailureFor:Le,get policy(){return ie()}};function Ye(S,H){Te||(we(),r(H))}function nt(S,H){S.preventDefault(),S.stopPropagation(),we(),r(H)}let mt={...Ne,onCardClick:Ye,onChildClick:nt,onFromChipClick:nt,onOpenDoc:m?(S,H)=>{we(),m(H)}:void 0,get policy(){return ie()}};function bt(S){let H=S.target,Oe=e.querySelector(".board-filter__labels");H&&Oe&&Oe.contains(H)||je()}function oe(S){S.key==="Escape"&&je()}function te(){_e||(_e=!0,document.addEventListener("mousedown",bt),document.addEventListener("keydown",oe),pt())}function je(){_e&&(_e=!1,document.removeEventListener("mousedown",bt),document.removeEventListener("keydown",oe),pt())}function it(S){S.key==="Escape"&&we()}function He(){N||(N=!0,document.addEventListener("keydown",it),pt())}function we(){N&&(N=!1,document.removeEventListener("keydown",it),pt())}let ze={onClose:we,onOverlayClick(S){S.target===S.currentTarget&&we()}},lt={onSearchInput(S){ce.search=String(S.target.value||""),Y()},onPriorityChange(S){ce.priority=String(S.target.value||""),Y()},onTypeChange(S){ce.type=String(S.target.value||""),Y()},onSortChange(S){let H=String(S.target.value||"");if(!(!pu.has(H)||H===T)){T=H;try{window.localStorage.setItem(du,H)}catch{}Y()}},onDeferredToggle(){N?we():He()},onLabelMenuToggle(){_e?je():te()},onLabelToggle(S){let H=ce.labels.indexOf(S);H===-1?ce.labels.push(S):ce.labels.splice(H,1),Y()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],Y())},onNewIssue(){d&&d()}};function ut(){return c`
      <div class="board-view">
        ${uu(ce,lt,{sort_mode:T,deferred_popup_open:N,deferred_count:W,label_options:Ce(),label_menu_open:_e})}
        <div class="board-root">
          ${Gr({title:"Blocked",id:"blocked-col",items:ee(F)},Ne)}
          ${Gr({title:"Ready",id:"ready-col",items:ee(V)},Ne)}
          ${Gr({title:"In progress",id:"in-progress-col",items:ee(Z)},Ne)}
          ${Gr({title:"Resolved",id:"resolved-col",items:ee(le)},Ne)}
          ${Gr({title:"Closed",id:"closed-col",items:ee(B),is_closed:!0,closed_range:h},Ne)}
        </div>
        ${N?cu({items:ee(X),count:W},mt,ze):""}
      </div>
    `}function pt(){st(ut(),e),Pt()}function Pt(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Oe of H)Array.from(Oe.querySelectorAll(".board-card")).forEach((L,ne)=>{L.tabIndex=ne===0?0:-1})}catch{}}async function Ht(S,H){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:S,status:H}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Oe){n("update-status failed: %o",Oe),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ut(S){switch(S){case"blocked-col":return F;case"ready-col":return V;case"in-progress-col":return Z;case"resolved-col":return le;default:return[]}}function xt(S,H,Oe){if(!o||!a)return;let x=Ut(S),L=x.find(U=>U.id===H);if(!L)return;let ne=x.filter(U=>U.id!==H),fe=Oe.closest?Oe.closest(".board-card"):null,Ee=ne.length;if(fe){let U=fe.getAttribute("data-issue-id");if(U===H)return;let G=ne.findIndex(Ve=>Ve.id===U);G>=0&&(Ee=G)}let A=ne.slice();A.splice(Ee,0,L),k.applyReorder(H,A,Ee)}function St(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let Qe=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Oe=S.target.closest(".board-column");Oe&&Oe!==Qe&&(Qe&&Qe.classList.remove("board-column--drag-over"),Oe.classList.add("board-column--drag-over"),Qe=Oe)}),e.addEventListener("dragleave",S=>{let H=S.relatedTarget;(!H||!e.contains(H))&&Qe&&(Qe.classList.remove("board-column--drag-over"),Qe=null)}),e.addEventListener("drop",S=>{S.preventDefault(),Qe&&(Qe.classList.remove("board-column--drag-over"),Qe=null);let H=S.target,Oe=H.closest(".board-column");if(!Oe)return;let x=S.dataTransfer?.getData("text/plain")||"";if(!x)return;let L=Oe.id,ne=se.get(x);if(ne&&ne===L){if(mm.has(L)){if(T!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}xt(L,x,H)}return}let fe=_m[L];if(!fe){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(x)!==fe&&Ht(x,fe)}),e.addEventListener("keydown",S=>{let H=S.target;if(!(H instanceof HTMLElement))return;let Oe=String(H.tagName||"").toLowerCase();if(Oe==="input"||Oe==="textarea"||Oe==="select"||Oe==="button"||Oe==="a"||H.isContentEditable===!0)return;let x=H.closest(".board-card");if(!x)return;let L=String(S.key||"");if(L==="Enter"||L===" "){S.preventDefault();let A=x.getAttribute("data-issue-id");A&&r(A);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;S.preventDefault();let ne=x.closest(".board-column");if(!ne)return;let fe=Array.from(ne.querySelectorAll(".board-card")),Ee=fe.indexOf(x);if(L==="ArrowDown"&&Ee<fe.length-1){Pe(x,fe[Ee+1]);return}if(L==="ArrowUp"&&Ee>0){Pe(x,fe[Ee-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let A=Array.from(e.querySelectorAll(".board-column")),U=A.indexOf(ne),G=L==="ArrowRight"?1:-1,Ve=U+G;for(;Ve>=0&&Ve<A.length;){let Be=A[Ve].querySelector(".board-card");if(Be){Pe(x,Be);return}Ve+=G}}});function Pe(S,H){try{S.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{Y()}catch{}}));let re=null;i&&i.subscribe&&(re=i.subscribe(()=>{try{Y()}catch{}}));let ye=null;return l&&l.subscribe&&(ye=l.subscribe(()=>{pt()})),{async load(){n("load"),Y()},clear(){je(),we(),P&&(P(),P=null),re&&(re(),re=null),ye&&(ye(),ye=null),e.replaceChildren(),F=[],V=[],Z=[],le=[],X=[],B=[],M=new Map,se=new Map}}}function gs(e,t){return e.filter(n=>{let r=To(n);return!(r&&t.has(r))})}async function bm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Sr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function bs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function hm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Sr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Jn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await hm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var ym=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],_u={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},vm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function rn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zt(e){return typeof e=="string"&&e.length>0?e:null}function Kr(e){return e.startsWith("gpt-")?e.slice(4):e}function Ft(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function gu(e,t,n){let r=zt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=zt(n[e]);return s===null?null:{value:s,source:"global"}}function hs(e,t,n,r){return gu(e,t,n)||{value:r,source:"base"}}function mi(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&rn(s?.[t])){let a=zt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&rn(s)){for(let a of Object.values(s))if(rn(a)){let i=zt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return zt(r?.runners?.[o]?.models?.[e]?.id)||e}function wm(e,t){return zt(t?.review?.reviewers?.[e]?.model)||e}function Vr(e,t,n=!1){if(e==="default")return Ft(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Kr(e):e;return Ft(e,t,r,e,"explicit")}function bu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];rn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(rn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function km(e,t){let n=[],r=e?.implementation?.model_catalog;rn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(rn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function $m(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of km(t,n)){let o=bu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function gi(e){return Ft(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function mu(e,t,n){let r=gu(e,t,n);return r?Vr(r.value,r.source):Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function yn(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&rn(r.session)?r.session:null,o=r?.supported===!0&&rn(r.orchestration)?r.orchestration:null,a=rn(e.runner_catalog)?e.runner_catalog:null,i=zt(n.quick_fix_impl_model),l=$m(i,s,a),u={};if(s){let d=hs("workflow_mode",t,n,zt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Ft(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Vr(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let B=`${X}_model`,N=zt(X==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=hs(B,t,n,N);if(W.value===null)u[B]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!rn(s.review?.reviewers?.[W.value]))u[B]=gi(Ft(W.value,W.source,"",null,"explicit"));else{let T=wm(W.value,s);u[B]=Ft(W.value,W.source,Kr(T),T,W.source==="base"?"default":"explicit")}}for(let[X,B]of Object.entries(_u)){let N=u[B].value;if(N==="self"||N==="skip"){u[X]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=zt(s.review?.reviewers?.[N||""]?.effort),T=hs(X,t,n,W);u[X]=T.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(T.value,T.source,T.value,T.value,T.source==="base"?"default":"explicit")}let m=rn(s.implementation?.default)?s.implementation.default:{},h=zt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=rn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=b&&rn(k[h])?k[h]:{};for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=hs(X,t,n,X==="impl_dispatch"?zt(F.dispatch)||zt(m.dispatch):zt(m[X.replace("impl_","")]));u[X]=B.value===null?Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Ft(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let V=zt(t.impl_runtime),Z=V==="inherit"?zt(e.controller_runtime):V,le=h==="quick_fix"&&zt(t.impl_dispatch)===null&&l.runtime!==null&&(V===null||Z===l.runtime);if(le){let X=l.runtime,B=i;u.impl_dispatch=Ft("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),V===null&&(u.impl_runtime=Ft(X,"global",`${X} (\uC720\uB3C4)`,X,"explicit")),zt(t.impl_model)===null&&(u.impl_model=Ft(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?zt(e.controller_runtime):u.impl_runtime.value,B=X?bu(X,s,a):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=gi(u.impl_model);else{let N=mi(u.impl_model.value,X,s,a);u.impl_model.display=Kr(N),u.impl_model.full_value=N}}if(u.impl_effort.value==="auto"){let X=zt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=X?zt(s.implementation?.effort_by_transport?.[X]?.auto):null;B&&!vm.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",u.impl_speed.source))}}else for(let d of ym.filter(m=>!m.startsWith("orchestration_")))u[d]=mu(d,t,n);if(!s){for(let[d,m]of Object.entries(_u))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=mu(d,t,n);continue}let m=d.replace("orchestration_",""),h=zt(o[m]),b=hs(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Ft(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?zt(o.model_id)||b.value:mi(b.value,null,s,a);u[d]=Ft(b.value,b.source,Kr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Ft("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",b.source);continue}u[d]=Vr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Ft(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Kr(d)})`,null,"default")}else if(l.runtime!==null){let d=mi(i,l.runtime,s,a);u.quick_fix_impl_model=Ft(i,"global",Kr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=gi(Ft(i,"global","",null,"explicit")):u.quick_fix_impl_model=Vr(i,"global");return u}function xm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Fo(e){let t=rn(e.pin)?e.pin:{},n=rn(e.global)?e.global:{},r=rn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let h={...r,...m};return yn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=zt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:xm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let h=s({...o,[e.key]:m})[e.key];return{value:m,label:h.display,full_value:h.full_value}})}}function Yr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(m))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function bi(e){return`session:${e.provider}:${e.session_id}`}function ys(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Am(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:bi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:ys(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Am(e,n)}}}var hi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Sm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",hu="\uBD84\uD574 \uC5C6\uB294 leg";function Qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Hn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Qr=[...Hn,"reasoning_output_tokens"],Em={codex:["implementation","review-consult"],claude:["subagent"]};function yi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Hn.some(t=>Number.isFinite(e[t]))}function Tm(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))}function vi(e){let t=0;for(let n of Hn)t+=Qt(e?.[n]);return t}function Cm(e){return!e||typeof e!="object"?!1:Hn.some(t=>Number.isFinite(e[t]))}function yu(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Rm(e){let t={};for(let n of Qr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function vu(e){let t={};for(let n of Qr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function wu(e,t){return yi(t)?Qt(t.total_tokens):e==="codex"?Qt(t.input_tokens)+Qt(t.output_tokens):vi(t)}function Om(e){return e==="claude"?"Claude":"Codex"}function Lm(e){return`\u03C4 ${$u(e)}`}function Im(e,t){let n=t.breakdown||{},r=Qt(t.total_only_subtotal);if(yi(n)||r>0&&!Tm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Sm];return t.replayed&&u.push(hi),u.join(`
`)}let s=[`\uC785\uB825 ${Qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Qt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${hu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${hu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(hi),l.join(`
`)}function dn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Om(n)} ${Lm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Im(n,r)})}return t}function Bo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Qt(i.total_only_subtotal)+Qt(a.total_only_subtotal));for(let l of Qr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Qt(i.breakdown[l])+Qt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function wi(e){return!e||typeof e!="object"?null:Rn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Mm(e){return e==="codex"?"codex":"claude"}function zn(){return{subtotal:0,breakdown:Rm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function jo(e,t,n){e.subtotal+=t.subtotal,yi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Qr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Qt(e.breakdown[r])+Qt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ku(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function $u(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return Cm(e)?`\u03C4 ${$u(vi(e))}`:null}function er(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function vs(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${vi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(hi),n.join(`
`)}function Rn(e,t){let n={claude:zn(),codex:zn()},r={orchestrator:{claude:zn(),codex:zn()},implementation:{claude:zn(),codex:zn()},"review-consult":{claude:zn(),codex:zn()},subagent:{claude:zn(),codex:zn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(yu(l)){let d=Mm(i.runner),m=vu(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:wu(d,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),jo(n[d],h,!0),jo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Em[m].includes(d.role)||!yu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=vu(d.usage),k={provider:m,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:wu(m,b)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),jo(n[m],k,!1),jo(r[k.role][m],k,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=ku(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...ku(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Lu,setPrototypeOf:xu,isFrozen:Pm,getPrototypeOf:Dm,getOwnPropertyDescriptor:Nm}=Object,{freeze:_n,seal:On,create:Ti}=Object,{apply:Ci,construct:Ri}=typeof Reflect<"u"&&Reflect;_n||(_n=function(t){return t});On||(On=function(t){return t});Ci||(Ci=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ri||(Ri=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Uo=mn(Array.prototype.forEach),qm=mn(Array.prototype.lastIndexOf),Au=mn(Array.prototype.pop),ws=mn(Array.prototype.push),Fm=mn(Array.prototype.splice),zo=mn(String.prototype.toLowerCase),ki=mn(String.prototype.toString),$i=mn(String.prototype.match),ks=mn(String.prototype.replace),jm=mn(String.prototype.indexOf),Bm=mn(String.prototype.trim),Mn=mn(Object.prototype.hasOwnProperty),fn=mn(RegExp.prototype.test),$s=Um(TypeError);function mn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ci(e,t,r)}}function Um(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ri(e,n)}}function wt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zo;xu&&xu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Pm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Wm(e){for(let t=0;t<e.length;t++)Mn(e,t)||(e[t]=null);return e}function tr(e){let t=Ti(null);for(let[n,r]of Lu(e))Mn(e,n)&&(Array.isArray(r)?t[n]=Wm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=tr(r):t[n]=r);return t}function xs(e,t){for(;e!==null;){let r=Nm(e,t);if(r){if(r.get)return mn(r.get);if(typeof r.value=="function")return mn(r.value)}e=Dm(e)}function n(){return null}return n}var Su=_n(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),xi=_n(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ai=_n(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zm=_n(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Si=_n(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hm=_n(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Eu=_n(["#text"]),Tu=_n(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ei=_n(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Cu=_n(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wo=_n(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gm=On(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Km=On(/<%[\w\W]*|[\w\W]*%>/gm),Vm=On(/\$\{[\w\W]*/gm),Ym=On(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zm=On(/^aria-[\-\w]+$/),Iu=On(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qm=On(/^(?:\w+script|data):/i),Xm=On(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Mu=On(/^html$/i),Jm=On(/^[a-z][.\w]*(-[.\w]+)+$/i),Ru=Object.freeze({__proto__:null,ARIA_ATTR:Zm,ATTR_WHITESPACE:Xm,CUSTOM_ELEMENT:Jm,DATA_ATTR:Ym,DOCTYPE_NAME:Mu,ERB_EXPR:Km,IS_ALLOWED_URI:Iu,IS_SCRIPT_OR_DATA:Qm,MUSTACHE_EXPR:Gm,TMPLIT_EXPR:Vm}),As={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},eg=function(){return typeof window>"u"?null:window},tg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ou=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Pu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:eg(),t=De=>Pu(De);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==As.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:b}=e,k=l.prototype,F=xs(k,"cloneNode"),V=xs(k,"remove"),Z=xs(k,"nextSibling"),le=xs(k,"childNodes"),X=xs(k,"parentNode");if(typeof a=="function"){let De=n.createElement("template");De.content&&De.content.ownerDocument&&(n=De.content.ownerDocument)}let B,N="",{implementation:W,createNodeIterator:T,createDocumentFragment:M,getElementsByTagName:se}=n,{importNode:be}=r,xe=Ou();t.isSupported=typeof Lu=="function"&&typeof X=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:_e,TMPLIT_EXPR:Te,DATA_ATTR:qe,ARIA_ATTR:ke,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Ce,CUSTOM_ELEMENT:Ie}=Ru,{IS_ALLOWED_URI:Y}=Ru,D=null,me=wt({},[...Su,...xi,...Ai,...Si,...Eu]),Ae=null,We=wt({},[...Tu,...Ei,...Cu,...Wo]),pe=Object.seal(Ti(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Fe=null,dt=null,at=Object.seal(Ti(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),$t=!0,ct=!0,R=!1,ie=!0,Le=!1,Ne=!0,Ye=!1,nt=!1,mt=!1,bt=!1,oe=!1,te=!1,je=!0,it=!1,He="user-content-",we=!0,ze=!1,lt={},ut=null,pt=wt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Ht=wt({},["audio","video","img","source","image","track"]),Ut=null,xt=wt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",Qe="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",P=Pe,re=!1,ye=null,S=wt({},[St,Qe,Pe],ki),H=wt({},["mi","mo","mn","ms","mtext"]),Oe=wt({},["annotation-xml"]),x=wt({},["title","style","font","a","script"]),L=null,ne=["application/xhtml+xml","text/html"],fe="text/html",Ee=null,A=null,U=n.createElement("form"),G=function(O){return O instanceof RegExp||O instanceof Function},Ve=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(A&&A===O)){if((!O||typeof O!="object")&&(O={}),O=tr(O),L=ne.indexOf(O.PARSER_MEDIA_TYPE)===-1?fe:O.PARSER_MEDIA_TYPE,Ee=L==="application/xhtml+xml"?ki:zo,D=Mn(O,"ALLOWED_TAGS")?wt({},O.ALLOWED_TAGS,Ee):me,Ae=Mn(O,"ALLOWED_ATTR")?wt({},O.ALLOWED_ATTR,Ee):We,ye=Mn(O,"ALLOWED_NAMESPACES")?wt({},O.ALLOWED_NAMESPACES,ki):S,Ut=Mn(O,"ADD_URI_SAFE_ATTR")?wt(tr(xt),O.ADD_URI_SAFE_ATTR,Ee):xt,Pt=Mn(O,"ADD_DATA_URI_TAGS")?wt(tr(Ht),O.ADD_DATA_URI_TAGS,Ee):Ht,ut=Mn(O,"FORBID_CONTENTS")?wt({},O.FORBID_CONTENTS,Ee):pt,Fe=Mn(O,"FORBID_TAGS")?wt({},O.FORBID_TAGS,Ee):tr({}),dt=Mn(O,"FORBID_ATTR")?wt({},O.FORBID_ATTR,Ee):tr({}),lt=Mn(O,"USE_PROFILES")?O.USE_PROFILES:!1,$t=O.ALLOW_ARIA_ATTR!==!1,ct=O.ALLOW_DATA_ATTR!==!1,R=O.ALLOW_UNKNOWN_PROTOCOLS||!1,ie=O.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=O.SAFE_FOR_TEMPLATES||!1,Ne=O.SAFE_FOR_XML!==!1,Ye=O.WHOLE_DOCUMENT||!1,bt=O.RETURN_DOM||!1,oe=O.RETURN_DOM_FRAGMENT||!1,te=O.RETURN_TRUSTED_TYPE||!1,mt=O.FORCE_BODY||!1,je=O.SANITIZE_DOM!==!1,it=O.SANITIZE_NAMED_PROPS||!1,we=O.KEEP_CONTENT!==!1,ze=O.IN_PLACE||!1,Y=O.ALLOWED_URI_REGEXP||Iu,P=O.NAMESPACE||Pe,H=O.MATHML_TEXT_INTEGRATION_POINTS||H,Oe=O.HTML_INTEGRATION_POINTS||Oe,pe=O.CUSTOM_ELEMENT_HANDLING||{},O.CUSTOM_ELEMENT_HANDLING&&G(O.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=O.CUSTOM_ELEMENT_HANDLING.tagNameCheck),O.CUSTOM_ELEMENT_HANDLING&&G(O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),O.CUSTOM_ELEMENT_HANDLING&&typeof O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(ct=!1),oe&&(bt=!0),lt&&(D=wt({},Eu),Ae=[],lt.html===!0&&(wt(D,Su),wt(Ae,Tu)),lt.svg===!0&&(wt(D,xi),wt(Ae,Ei),wt(Ae,Wo)),lt.svgFilters===!0&&(wt(D,Ai),wt(Ae,Ei),wt(Ae,Wo)),lt.mathMl===!0&&(wt(D,Si),wt(Ae,Cu),wt(Ae,Wo))),O.ADD_TAGS&&(typeof O.ADD_TAGS=="function"?at.tagCheck=O.ADD_TAGS:(D===me&&(D=tr(D)),wt(D,O.ADD_TAGS,Ee))),O.ADD_ATTR&&(typeof O.ADD_ATTR=="function"?at.attributeCheck=O.ADD_ATTR:(Ae===We&&(Ae=tr(Ae)),wt(Ae,O.ADD_ATTR,Ee))),O.ADD_URI_SAFE_ATTR&&wt(Ut,O.ADD_URI_SAFE_ATTR,Ee),O.FORBID_CONTENTS&&(ut===pt&&(ut=tr(ut)),wt(ut,O.FORBID_CONTENTS,Ee)),we&&(D["#text"]=!0),Ye&&wt(D,["html","head","body"]),D.table&&(wt(D,["tbody"]),delete Fe.tbody),O.TRUSTED_TYPES_POLICY){if(typeof O.TRUSTED_TYPES_POLICY.createHTML!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof O.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=O.TRUSTED_TYPES_POLICY,N=B.createHTML("")}else B===void 0&&(B=tg(b,s)),B!==null&&typeof N=="string"&&(N=B.createHTML(""));_n&&_n(O),A=O}},Be=wt({},[...xi,...Ai,...zm]),ge=wt({},[...Si,...Hm]),Et=function(O){let he=X(O);(!he||!he.tagName)&&(he={namespaceURI:P,tagName:"template"});let Me=zo(O.tagName),yt=zo(he.tagName);return ye[O.namespaceURI]?O.namespaceURI===Qe?he.namespaceURI===Pe?Me==="svg":he.namespaceURI===St?Me==="svg"&&(yt==="annotation-xml"||H[yt]):!!Be[Me]:O.namespaceURI===St?he.namespaceURI===Pe?Me==="math":he.namespaceURI===Qe?Me==="math"&&Oe[yt]:!!ge[Me]:O.namespaceURI===Pe?he.namespaceURI===Qe&&!Oe[yt]||he.namespaceURI===St&&!H[yt]?!1:!ge[Me]&&(x[Me]||!Be[Me]):!!(L==="application/xhtml+xml"&&ye[O.namespaceURI]):!1},ht=function(O){ws(t.removed,{element:O});try{X(O).removeChild(O)}catch{V(O)}},kt=function(O,he){try{ws(t.removed,{attribute:he.getAttributeNode(O),from:he})}catch{ws(t.removed,{attribute:null,from:he})}if(he.removeAttribute(O),O==="is")if(bt||oe)try{ht(he)}catch{}else try{he.setAttribute(O,"")}catch{}},Vt=function(O){let he=null,Me=null;if(mt)O="<remove></remove>"+O;else{let Ct=$i(O,/^[\r\n\t ]+/);Me=Ct&&Ct[0]}L==="application/xhtml+xml"&&P===Pe&&(O='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+O+"</body></html>");let yt=B?B.createHTML(O):O;if(P===Pe)try{he=new h().parseFromString(yt,L)}catch{}if(!he||!he.documentElement){he=W.createDocument(P,"template",null);try{he.documentElement.innerHTML=re?N:yt}catch{}}let Dt=he.body||he.documentElement;return O&&Me&&Dt.insertBefore(n.createTextNode(Me),Dt.childNodes[0]||null),P===Pe?se.call(he,Ye?"html":"body")[0]:Ye?he.documentElement:Dt},Tt=function(O){return T.call(O.ownerDocument||O,O,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},on=function(O){return O instanceof m&&(typeof O.nodeName!="string"||typeof O.textContent!="string"||typeof O.removeChild!="function"||!(O.attributes instanceof d)||typeof O.removeAttribute!="function"||typeof O.setAttribute!="function"||typeof O.namespaceURI!="string"||typeof O.insertBefore!="function"||typeof O.hasChildNodes!="function")},Jt=function(O){return typeof i=="function"&&O instanceof i};function en(De,O,he){Uo(De,Me=>{Me.call(t,O,he,A)})}let Gt=function(O){let he=null;if(en(xe.beforeSanitizeElements,O,null),on(O))return ht(O),!0;let Me=Ee(O.nodeName);if(en(xe.uponSanitizeElement,O,{tagName:Me,allowedTags:D}),Ne&&O.hasChildNodes()&&!Jt(O.firstElementChild)&&fn(/<[/\w!]/g,O.innerHTML)&&fn(/<[/\w!]/g,O.textContent)||O.nodeType===As.progressingInstruction||Ne&&O.nodeType===As.comment&&fn(/<[/\w]/g,O.data))return ht(O),!0;if(!(at.tagCheck instanceof Function&&at.tagCheck(Me))&&(!D[Me]||Fe[Me])){if(!Fe[Me]&&an(Me)&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,Me)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Me)))return!1;if(we&&!ut[Me]){let yt=X(O)||O.parentNode,Dt=le(O)||O.childNodes;if(Dt&&yt){let Ct=Dt.length;for(let Yt=Ct-1;Yt>=0;--Yt){let Nt=F(Dt[Yt],!0);Nt.__removalCount=(O.__removalCount||0)+1,yt.insertBefore(Nt,Z(O))}}}return ht(O),!0}return O instanceof l&&!Et(O)||(Me==="noscript"||Me==="noembed"||Me==="noframes")&&fn(/<\/no(script|embed|frames)/i,O.innerHTML)?(ht(O),!0):(Le&&O.nodeType===As.text&&(he=O.textContent,Uo([ce,_e,Te],yt=>{he=ks(he,yt," ")}),O.textContent!==he&&(ws(t.removed,{element:O.cloneNode()}),O.textContent=he)),en(xe.afterSanitizeElements,O,null),!1)},tn=function(O,he,Me){if(je&&(he==="id"||he==="name")&&(Me in n||Me in U))return!1;if(!(ct&&!dt[he]&&fn(qe,he))){if(!($t&&fn(ke,he))){if(!(at.attributeCheck instanceof Function&&at.attributeCheck(he,O))){if(!Ae[he]||dt[he]){if(!(an(O)&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,O)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(O))&&(pe.attributeNameCheck instanceof RegExp&&fn(pe.attributeNameCheck,he)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(he,O))||he==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,Me)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Me))))return!1}else if(!Ut[he]){if(!fn(Y,ks(Me,Ce,""))){if(!((he==="src"||he==="xlink:href"||he==="href")&&O!=="script"&&jm(Me,"data:")===0&&Pt[O])){if(!(R&&!fn(ee,ks(Me,Ce,"")))){if(Me)return!1}}}}}}}return!0},an=function(O){return O!=="annotation-xml"&&$i(O,Ie)},wn=function(O){en(xe.beforeSanitizeAttributes,O,null);let{attributes:he}=O;if(!he||on(O))return;let Me={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},yt=he.length;for(;yt--;){let Dt=he[yt],{name:Ct,namespaceURI:Yt,value:Nt}=Dt,nn=Ee(Ct),kn=Nt,qt=Ct==="value"?kn:Bm(kn);if(Me.attrName=nn,Me.attrValue=qt,Me.keepAttr=!0,Me.forceKeepAttr=void 0,en(xe.uponSanitizeAttribute,O,Me),qt=Me.attrValue,it&&(nn==="id"||nn==="name")&&(kt(Ct,O),qt=He+qt),Ne&&fn(/((--!?|])>)|<\/(style|title|textarea)/i,qt)){kt(Ct,O);continue}if(nn==="attributename"&&$i(qt,"href")){kt(Ct,O);continue}if(Me.forceKeepAttr)continue;if(!Me.keepAttr){kt(Ct,O);continue}if(!ie&&fn(/\/>/i,qt)){kt(Ct,O);continue}Le&&Uo([ce,_e,Te],xn=>{qt=ks(qt,xn," ")});let $n=Ee(O.nodeName);if(!tn($n,nn,qt)){kt(Ct,O);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Yt)switch(b.getAttributeType($n,nn)){case"TrustedHTML":{qt=B.createHTML(qt);break}case"TrustedScriptURL":{qt=B.createScriptURL(qt);break}}if(qt!==kn)try{Yt?O.setAttributeNS(Yt,Ct,qt):O.setAttribute(Ct,qt),on(O)?ht(O):Au(t.removed)}catch{kt(Ct,O)}}en(xe.afterSanitizeAttributes,O,null)},Se=function De(O){let he=null,Me=Tt(O);for(en(xe.beforeSanitizeShadowDOM,O,null);he=Me.nextNode();)en(xe.uponSanitizeShadowNode,he,null),Gt(he),wn(he),he.content instanceof o&&De(he.content);en(xe.afterSanitizeShadowDOM,O,null)};return t.sanitize=function(De){let O=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},he=null,Me=null,yt=null,Dt=null;if(re=!De,re&&(De="<!-->"),typeof De!="string"&&!Jt(De))if(typeof De.toString=="function"){if(De=De.toString(),typeof De!="string")throw $s("dirty is not a string, aborting")}else throw $s("toString is not a function");if(!t.isSupported)return De;if(nt||Ve(O),t.removed=[],typeof De=="string"&&(ze=!1),ze){if(De.nodeName){let Nt=Ee(De.nodeName);if(!D[Nt]||Fe[Nt])throw $s("root node is forbidden and cannot be sanitized in-place")}}else if(De instanceof i)he=Vt("<!---->"),Me=he.ownerDocument.importNode(De,!0),Me.nodeType===As.element&&Me.nodeName==="BODY"||Me.nodeName==="HTML"?he=Me:he.appendChild(Me);else{if(!bt&&!Le&&!Ye&&De.indexOf("<")===-1)return B&&te?B.createHTML(De):De;if(he=Vt(De),!he)return bt?null:te?N:""}he&&mt&&ht(he.firstChild);let Ct=Tt(ze?De:he);for(;yt=Ct.nextNode();)Gt(yt),wn(yt),yt.content instanceof o&&Se(yt.content);if(ze)return De;if(bt){if(oe)for(Dt=M.call(he.ownerDocument);he.firstChild;)Dt.appendChild(he.firstChild);else Dt=he;return(Ae.shadowroot||Ae.shadowrootmode)&&(Dt=be.call(r,Dt,!0)),Dt}let Yt=Ye?he.outerHTML:he.innerHTML;return Ye&&D["!doctype"]&&he.ownerDocument&&he.ownerDocument.doctype&&he.ownerDocument.doctype.name&&fn(Mu,he.ownerDocument.doctype.name)&&(Yt="<!DOCTYPE "+he.ownerDocument.doctype.name+`>
`+Yt),Le&&Uo([ce,_e,Te],Nt=>{Yt=ks(Yt,Nt," ")}),B&&te?B.createHTML(Yt):Yt},t.setConfig=function(){let De=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ve(De),nt=!0},t.clearConfig=function(){A=null,nt=!1},t.isValidAttribute=function(De,O,he){A||Ve({});let Me=Ee(De),yt=Ee(O);return tn(Me,yt,he)},t.addHook=function(De,O){typeof O=="function"&&ws(xe[De],O)},t.removeHook=function(De,O){if(O!==void 0){let he=qm(xe[De],O);return he===-1?void 0:Fm(xe[De],he,1)[0]}return Au(xe[De])},t.removeHooks=function(De){xe[De]=[]},t.removeAllHooks=function(){xe=Ou()},t}var Du=Pu();var nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ho=e=>(...t)=>({_$litDirective$:e,values:t}),Jr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ss=class extends Jr{constructor(t){if(super(t),this.it=Wt,t.type!==nr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Wt||t==null)return this._t=void 0,this.it=t;if(t===Cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ss.directiveName="unsafeHTML",Ss.resultType=1;var Nu=Ho(Ss);function Mi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Mi();function zu(e){Tr=e}var Rs={exec:()=>null};function At(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(gn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var ng=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),gn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rg=/^(?:[ \t]*(?:\n|$))+/,sg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,og=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Os=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ag=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Pi=/(?:[*+-]|\d{1,9}[.)])/,Hu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Gu=At(Hu).replace(/bull/g,Pi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ig=At(Hu).replace(/bull/g,Pi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Di=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lg=/^[^\n]+/,Ni=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cg=At(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ni).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ug=At(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Pi).getRegex(),Qo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,dg=At("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qi).replace("tag",Qo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ku=At(Di).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),pg=At(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ku).getRegex(),Fi={blockquote:pg,code:sg,def:cg,fences:og,heading:ag,hr:Os,html:dg,lheading:Gu,list:ug,newline:rg,paragraph:Ku,table:Rs,text:lg},qu=At("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),fg={...Fi,lheading:ig,table:qu,paragraph:At(Di).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex()},_g={...Fi,html:At(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Rs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:At(Di).replace("hr",Os).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Gu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vu=/^( {2,}|\\)\n(?!\s*$)/,bg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xo=/[\p{P}\p{S}]/u,ji=/[\s\p{P}\p{S}]/u,Yu=/[^\s\p{P}\p{S}]/u,hg=At(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ji).getRegex(),Zu=/(?!~)[\p{P}\p{S}]/u,yg=/(?!~)[\s\p{P}\p{S}]/u,vg=/(?:[^\s\p{P}\p{S}]|~)/u,wg=At(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ng?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kg=At(Qu,"u").replace(/punct/g,Xo).getRegex(),$g=At(Qu,"u").replace(/punct/g,Zu).getRegex(),Xu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xg=At(Xu,"gu").replace(/notPunctSpace/g,Yu).replace(/punctSpace/g,ji).replace(/punct/g,Xo).getRegex(),Ag=At(Xu,"gu").replace(/notPunctSpace/g,vg).replace(/punctSpace/g,yg).replace(/punct/g,Zu).getRegex(),Sg=At("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Yu).replace(/punctSpace/g,ji).replace(/punct/g,Xo).getRegex(),Eg=At(/\\(punct)/,"gu").replace(/punct/g,Xo).getRegex(),Tg=At(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cg=At(qi).replace("(?:-->|$)","-->").getRegex(),Rg=At("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Og=At(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ju=At(/^!?\[(label)\]\[(ref)\]/).replace("label",Vo).replace("ref",Ni).getRegex(),ed=At(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ni).getRegex(),Lg=At("reflink|nolink(?!\\()","g").replace("reflink",Ju).replace("nolink",ed).getRegex(),Fu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Bi={_backpedal:Rs,anyPunctuation:Eg,autolink:Tg,blockSkip:wg,br:Vu,code:gg,del:Rs,emStrongLDelim:kg,emStrongRDelimAst:xg,emStrongRDelimUnd:Sg,escape:mg,link:Og,nolink:ed,punctuation:hg,reflink:Ju,reflinkSearch:Lg,tag:Rg,text:bg,url:Rs},Ig={...Bi,link:At(/^!?\[(label)\]\((.*?)\)/).replace("label",Vo).getRegex(),reflink:At(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vo).getRegex()},Oi={...Bi,emStrongRDelimAst:Ag,emStrongLDelim:$g,url:At(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Fu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:At(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Fu).getRegex()},Mg={...Oi,br:At(Vu).replace("{2,}","*").getRegex(),text:At(Oi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Go={normal:Fi,gfm:fg,pedantic:_g},Es={normal:Bi,gfm:Oi,breaks:Mg,pedantic:Ig},Pg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ju=e=>Pg[e];function rr(e,t){if(t){if(gn.escapeTest.test(e))return e.replace(gn.escapeReplace,ju)}else if(gn.escapeTestNoEncode.test(e))return e.replace(gn.escapeReplaceNoEncode,ju);return e}function Bu(e){try{e=encodeURI(e).replace(gn.percentDecode,"%")}catch{return null}return e}function Uu(e,t){let n=e.replace(gn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(gn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(gn.slashPipe,"|");return r}function Ts(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Dg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Wu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Ng(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yo=class{constructor(e){Mt(this,"options");Mt(this,"rules");Mt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ts(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Ng(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ts(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ts(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ts(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=m,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),F=this.blockquote(k);o[o.length-1]=F,r=r.substring(0,r.length-b.raw.length)+F.raw,s=s.substring(0,s.length-b.text.length)+F.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),F=this.list(k);o[o.length-1]=F,r=r.substring(0,r.length-h.raw.length)+F.raw,s=s.substring(0,s.length-b.raw.length)+F.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(k),V=this.rules.other.hrRegex(k),Z=this.rules.other.fencesBeginRegex(k),le=this.rules.other.headingBeginRegex(k),X=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],N;if(h=B,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),N=h):N=h.replace(this.rules.other.tabCharGlobal,"    "),Z.test(h)||le.test(h)||X.test(h)||F.test(h)||V.test(h))break;if(N.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+N.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Z.test(m)||le.test(m)||V.test(m))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=B+`
`,e=e.substring(B.length+1),m=N.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Uu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Uu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Ts(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Dg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Wu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Wu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,m=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pn=class Li{constructor(t){Mt(this,"tokens");Mt(this,"options");Mt(this,"state");Mt(this,"inlineQueue");Mt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:gn,block:Go.normal,inline:Es.normal};this.options.pedantic?(n.block=Go.pedantic,n.inline=Es.pedantic):this.options.gfm&&(n.block=Go.gfm,this.options.breaks?n.inline=Es.breaks:n.inline=Es.gfm),this.tokenizer.rules=n}static get rules(){return{block:Go,inline:Es}}static lex(t,n){return new Li(n).lex(t)}static lexInline(t,n){return new Li(n).inlineTokens(t)}lex(t){t=t.replace(gn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(gn.tabCharGlobal,"    ").replace(gn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},m),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Zo=class{constructor(e){Mt(this,"options");Mt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(gn.notSpaceStart)?.[0],s=e.replace(gn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+rr(r)+'">'+(n?s:rr(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:rr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Bu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Bu(e);if(s===null)return rr(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},Ui=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Dn=class Ii{constructor(t){Mt(this,"options");Mt(this,"renderer");Mt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Zo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ui}static parse(t,n){return new Ii(n).parse(t)}static parseInline(t,n){return new Ii(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Ko,Cs=(Ko=class{constructor(e){Mt(this,"options");Mt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pn.lex:Pn.lexInline}provideParser(){return this.block?Dn.parse:Dn.parseInline}},Mt(Ko,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Mt(Ko,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ko),qg=class{constructor(...e){Mt(this,"defaults",Mi());Mt(this,"options",this.setOptions);Mt(this,"parse",this.parseMarkdown(!0));Mt(this,"parseInline",this.parseMarkdown(!1));Mt(this,"Parser",Dn);Mt(this,"Renderer",Zo);Mt(this,"TextRenderer",Ui);Mt(this,"Lexer",Pn);Mt(this,"Tokenizer",Yo);Mt(this,"Hooks",Cs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Zo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Yo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Cs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];Cs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Cs.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return l.call(s,m)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pn.lex(e,t??this.defaults)}parser(e,t){return Dn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Dn.parse:Dn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Dn.parse:Dn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+rr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new qg;function Ot(e,t){return Er.parse(e,t)}Ot.options=Ot.setOptions=function(e){return Er.setOptions(e),Ot.defaults=Er.defaults,zu(Ot.defaults),Ot};Ot.getDefaults=Mi;Ot.defaults=Tr;Ot.use=function(...e){return Er.use(...e),Ot.defaults=Er.defaults,zu(Ot.defaults),Ot};Ot.walkTokens=function(e,t){return Er.walkTokens(e,t)};Ot.parseInline=Er.parseInline;Ot.Parser=Dn;Ot.parser=Dn.parse;Ot.Renderer=Zo;Ot.TextRenderer=Ui;Ot.Lexer=Pn;Ot.lexer=Pn.lex;Ot.Tokenizer=Yo;Ot.Hooks=Cs;Ot.parse=Ot;var Tk=Ot.options,Ck=Ot.setOptions,Rk=Ot.use,Ok=Ot.walkTokens,Lk=Ot.parseInline;var Ik=Dn.parse,Mk=Pn.lex;function cr(e){let t=Ot.parse(e),n=Du.sanitize(t);return Nu(n)}function sr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function es(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var nd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},jg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Bg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Nn(e){return!!e&&typeof e=="object"}function Wi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function zi(e,t){let n=Wi(e),r=Wi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function rd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Nn(s)&&typeof s.text=="string"?s.text:"").join(""):Nn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ug(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:nd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Wi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=zi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=zi(Nn(i)?i.old_string:"",Nn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Hi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Wg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function sd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Nn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Wg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=jg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Bg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function zg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Hg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Nn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Gi(a.text));else if(a.type==="thinking"){let i=Hi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Ug(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?td(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Nn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=rd(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=sd(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?td([s],n):[s]}return[]}function td(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Gg(e){let t=typeof e.command=="string"?e.command:"",n=rd(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:nd.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Kg(e){if(e.type==="item.completed"&&Nn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Gi(t.text)];if(t.type==="user_message"){let n=sd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Hi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Gg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vg(e){if(e.schema!=="codex-delegation-monitor-v1"||!Nn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Nn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Gi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Hi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Yg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Zg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Nn(t)?t:null}function od(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Zg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return zg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Vg(o):Yg(o)?Kg(o):Hg(o,n);return a.length>0&&(r.progress=null),a}}}function Ki(e){let t=[],n=od(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qg=5,Xg=10,Jg=/Task\s+#(\d+)/,eb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,tb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ls(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function nb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function rb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function sb(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Jg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function ob(e){if(e.tool==="Bash"){let t=e.command||"";return eb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":tb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ab(e){let t=e.filter(s=>s.kind==="tool").slice(-Xg),n=new Map;t.forEach((s,o)=>{let a=ob(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function ib(e){let t=rb(e);if(t)return{text:t,guess:!1};let n=sb(e);if(n)return{text:n,guess:!1};let r=ab(e);return r?{text:r,guess:!0}:null}function lb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:hn(e,t)}function ts(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,m={},h=!0,b=new Set,k=new Set,F=null,V=null,Z=!1,le=!1,X=!1,B=null,N=null;function W(){Z=!1,le=!1,X=!1,B=null,N=null}async function T(oe){if(n){le=!0,X=!1,Fe();try{let te=await Promise.resolve(n("get-attempt-prompt",{attempt_id:oe,...u?{root_dir:u}:{}}));if(o!==oe)return;!te||typeof te!="object"||Array.isArray(te)?X=!0:(B=te,N=oe)}catch{o===oe&&(X=!0)}finally{o===oe&&(le=!1,Fe())}}}function M(){if(Z=!Z,Z&&o&&N!==o){T(o);return}Fe()}function se(){if(!Z)return"";let oe=es({loading:le,error:X});if(oe)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${oe}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let te=Jo(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${te?c`<div class="prompt-block__meta">${te} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function be(){if(!l||!r)return[];let oe=r.get(l);return Ki(oe?oe.lines:[])}function xe(){if(!l||!r)return null;let oe=r.get(l),te=oe?oe.last_event_at:null;return typeof te=="number"?te:null}function ce(){return m.status==="running"}function _e(){if(ce()&&o){V||(V=setInterval(()=>Fe(),1e3));return}Te()}function Te(){V&&(clearInterval(V),V=null)}function qe(oe){let te=[],je=0;for(;je<oe.length;){let{idx:it,line:He}=oe[je];if(He.kind==="tool"){let we=je;for(;we<oe.length&&oe[we].line.kind==="tool"&&oe[we].line.tool===He.tool;)we+=1;if(we-je>=Qg&&!k.has(it)){te.push({kind:"group",idx:it,tool:He.tool||"",lines:oe.slice(je,we)}),je=we;continue}}te.push({kind:"line",idx:it,line:He}),je+=1}return te}function ke(oe){let te=[],je=new Map;for(let we=0;we<oe.length;we+=1){let ze=oe[we],lt=ze.parent_tool_use_id;if(typeof lt=="string"&&lt.length>0){let ut=je.get(lt);ut||(ut={kind:"subagent",idx:we,launch_id:lt,agent_type:null,header:null,lines:[]},je.set(lt,ut),te.push(ut)),ut.lines.push({idx:we,line:ze});continue}if(ze.kind==="tool"&&ze.tool==="Agent"&&typeof ze.launch_id=="string"&&ze.launch_id.length>0){let ut=ee(ze),pt=je.get(ze.launch_id);if(pt){pt.header={idx:we,line:ze},pt.agent_type=ut;continue}let Pt={kind:"subagent",idx:we,launch_id:ze.launch_id,agent_type:ut,header:{idx:we,line:ze},lines:[]};je.set(ze.launch_id,Pt),te.push(Pt);continue}te.push({kind:"entry",idx:we,line:ze})}let it=[],He=0;for(;He<te.length;){if(te[He].kind!=="entry"){it.push(te[He]),He+=1;continue}let we=He;for(;we<te.length&&te[we].kind==="entry";)we+=1;it.push(...qe(te.slice(He,we))),He=we}return it}function ee(oe){let te=oe.input;return te&&typeof te.subagent_type=="string"?te.subagent_type:null}function Ce(oe){for(let te=oe.length-1;te>=0;te-=1){let je=oe[te];if(je.kind==="result"||je.kind==="error")return null;if(je.kind==="tool"&&!Object.hasOwn(je,"result"))return je}return null}function Ie(oe){for(let te=oe.length-1;te>=0;te-=1)if(oe[te].kind==="thinking")return oe[te];return null}function Y(oe,te){if(te.kind==="gate")return c`<div class="sv__gate">${te.text}</div>`;if(te.kind==="phase")return c`<div class="sv__phase">${te.text}</div>`;if(te.kind==="result")return c`<div
        class="sv__result${te.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${te.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(te.text||(te.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(te.kind==="thinking"){let je=b.has(oe);return c`<div
        class="sv__think${je?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>at(oe)}
      >
        <span class="sv__think-line">💭 ${Ls(te.text)}</span>
        ${je?c`<pre class="sv__think-expand">${te.text}</pre>`:""}
      </div>`}if(te.kind==="user"){let je=b.has(oe);return c`<div
        class="sv__line sv__line--user${je?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>at(oe)}
      >
        <span class="sv__user-line">▷ ${Ls(te.text)}</span>
        ${je?c`<pre class="sv__user-expand">${te.text}</pre>`:""}
      </div>`}if(te.kind==="error")return c`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="blocker")return c`<div class="sv__error">⛔ ${te.text}</div>`;if(te.kind==="tool"){let je=b.has(oe),it=te.tool==="Bash"?nb(te.command):0,He=te.tool==="Bash"?it>1?Ls(te.command):te.command:te.path||te.command||"";return c`<div
        class="sv__tool${je?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>at(oe)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${te.icon}</span>
          <span class="sv__tool-name">${te.tool}</span>
          ${He?c`<span class="sv__tool-detail">${He}</span>`:""}
          ${it>1?c`<span class="sv__tool-more">⋯ ${it}줄</span>`:""}
          ${typeof te.added=="number"?c`<span class="sv__diff-add">+${te.added}</span>`:""}
          ${typeof te.removed=="number"?c`<span class="sv__diff-del">−${te.removed}</span>`:""}
          ${te.result?c`<span class="sv__tool-ok">→ ${te.result}</span>`:""}
        </span>
        ${je?c`<pre class="sv__tool-expand">${D(te)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(te.text||"")}</div>`}function D(oe){let te=[];if(oe.tool==="Bash"&&typeof oe.command=="string"&&oe.command.length>0)te.push(oe.command);else if(oe.input!==void 0)try{te.push(`input: ${JSON.stringify(oe.input,null,2)}`)}catch{}return typeof oe.output=="string"&&oe.output.length>0&&te.push(`output:
${oe.output}`),te.join(`

`)}function me(){if(!o)return c``;let oe=be(),te=(a?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),je=m.session_id||"",it=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,He=ce(),we=He?lb(xe(),Date.now()):"",ze=He?Ce(oe):null,lt=He?Ie(oe):null,ut=ib(oe);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(a?m.role||"":o)}</span
        >
        ${ut?c`<span
              class="sv__stage${ut.guess?" sv__stage--guess":""}"
              title=${ut.text}
              >${ut.text}</span
            >`:""}
        ${He?c`<span
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
              @click=${()=>ct(je)}
            >
              ⧉ ${je.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>ct(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${te?c`<span class="sv__meta">${te}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Z?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Z?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${M}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${it}
          @click=${$t}
        >
          <span class="sv__follow-full">⇣ ${it}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>bt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":se()}
      <div class="sv__body">
        ${oe.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ke(oe).map(pt=>pt.kind==="subagent"?We(pt):pt.kind==="group"?Ae(pt):Y(pt.idx,pt.line))}
      </div>
      ${ze||lt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?c`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?Ls(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${lt?c`<span class="sv__now-think"
                  >💭 ${Ls(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(oe){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(oe.idx)}
    >
      <span class="sv__group-icon">${oe.lines[0].line.icon}</span>
      <span class="sv__group-name">${oe.tool}</span>
      <span class="sv__group-count">${oe.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function We(oe){let te=k.has(oe.idx),je=oe.header?oe.header.line:null,it=je?je.is_error===!0?"\u2717":typeof je.result=="string"?"\u2713":"\u27F3":"",He=je&&je.command?je.command:"";return c`<div class="sv__sub${te?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(oe.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${oe.agent_type||"subagent"}</span>
        ${He?c`<span class="sv__sub-detail">${He}</span>`:""}
        <span class="sv__sub-count">${oe.lines.length}줄</span>
        ${it?c`<span class="sv__sub-state">${it}</span>`:""}
        ${te?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${te?c`<div class="sv__sub-body">
            ${qe(oe.lines).map(we=>we.kind==="group"?Ae(we):Y(we.idx,we.line))}
          </div>`:""}
    </div>`}function pe(oe){k.add(oe),Fe()}function Fe(){st(me(),e),_e(),h&&dt()}function dt(){let oe=e.querySelector(".sv__body");oe&&(oe.scrollTop=oe.scrollHeight)}function at(oe){b.has(oe)?b.delete(oe):b.add(oe),Fe()}function $t(){h=!h,Fe()}function ct(oe){Sn(oe).then(te=>{te?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function R(oe){!o||!oe||(m={...m,...oe},Fe())}function ie(oe){let te=oe.target;if(!te||!te.classList||!te.classList.contains("sv__body"))return;!(te.scrollHeight-te.scrollTop-te.clientHeight<=4)&&h&&(h=!1,Fe())}e.addEventListener("scroll",ie,!0);function Le(oe){let te=oe.target;!te||typeof te.closest!="function"||e.contains(te)||te.closest("dialog")||te.closest(".md-viewer-root")||bt()}let Ne=!1;function Ye(){Ne||(document.addEventListener("mousedown",Le),Ne=!0)}function nt(){Ne&&(document.removeEventListener("mousedown",Le),Ne=!1)}function mt(oe){let te=oe&&oe.attempt_id;if(!te)return;let je=typeof oe.launch_id=="string"&&oe.launch_id.length>0?oe.launch_id:null,it=oe.session_ref&&typeof oe.session_ref=="object"?oe.session_ref:null;if(je&&it)return;let He=l;o=te,a=je,i=it,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&He&&He!==l&&Promise.resolve(n("unsubscribe-session-log",{id:He})).catch(()=>{}),u=typeof oe.root_dir=="string"&&oe.root_dir.length>0?oe.root_dir:null,m=oe.meta||{},d=oe.hide_prompt===!0,h=!0,b.clear(),k.clear(),W(),!F&&r&&(F=r.subscribe(Fe)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ye(),Fe()}function bt(){let oe=l;nt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),k.clear(),W(),Te(),n&&oe&&Promise.resolve(n("unsubscribe-session-log",{id:oe})).catch(()=>{}),st(c``,e),s&&s()}return{open:mt,updateMeta:R,close:bt,isOpen(){return o!==null},destroy(){Te(),nt(),F&&(F(),F=null),e.removeEventListener("scroll",ie,!0),o=null,a=null,i=null,l=null,u=null,d=!1,st(c``,e)}}}function cb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ea(t.spec_id),s=ea(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ea(e){return typeof e=="string"?e.trim():""}function ub(e){let t=cb(e);if(t.path)return t;let n=ea(ad(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ad(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var db=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Is(e){let t=ub(e),n=ea(ad(e).spec_review),r=db.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function pb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function fb(e){let t=e&&e.metadata||{},n=Is(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:pb(t)?null:"plan_pending"}),r}function id(e,t){let n=fb(e);return c`
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
  `}var _b="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",mb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gb=/^\*\*결론\*\* — (.+)$/;function ta(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_b)return null;let n=mb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?gb.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ld=20;function cd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function bb(e){return e.length>ld?`${e.slice(0,ld)}\u2026`:e}function hb(e,t,n,r){let s=`${t.lane} ${bb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${cd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${cr(t.body)}
        </div>`:""}
  </div>`}function yb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${cd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${cr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ud(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=ta(typeof l.text=="string"?l.text:"");return u?hb(l,u,t,s.has(l.id)):yb(l)})}
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
  `}var{I:m$}=Sc;var dd=e=>e.strings===void 0;var vb={},pd=(e,t=vb)=>e._$AH=t;var Cr=Ho(class extends Jr{constructor(e){if(super(e),e.type!==nr.PROPERTY&&e.type!==nr.ATTRIBUTE&&e.type!==nr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!dd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Cn||t===Wt)return t;let n=e.element,r=e.name;if(e.type===nr.PROPERTY){if(t===n[r])return Cn}else if(e.type===nr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Cn}else if(e.type===nr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Cn;return pd(e),t}});var na=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Yi=[...na.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],or=["orchestration_model","orchestration_effort","orchestration_speed"],ra=[...na,...or],wb=Yi.filter(e=>ra.includes(e)),fd=["delegated","main"],sa=["inherit","claude","codex"],Ms=["default","fast"],Ps=["standard","fast_track"],Ds=["codex","opus","fable","self","skip"],oa=["codex","fable","skip"],aa=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function _d(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ns(e,t){let n=_d(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Tn,...r.flatMap(([,s])=>s)]}function md(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!En(a)||!En(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Tn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Tn,...s]}function rs(e,t,n){return md(e,t,n,(r,s)=>En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Zi(e,t,n){return md(e,t,n,(r,s)=>En(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ns(e,t){let n=_d(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function gd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!ns(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!rs(t,s,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var kb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Vi=[...wb,...or],$b=[...ra,...Yi].filter((e,t,n)=>n.indexOf(e)===t&&!Vi.includes(e));function bd(e,t){let n=En(e)?e:{},r=En(t)?t:{},s=[];for(let a of Vi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:kb[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...$b,...Object.keys(r)])!Vi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Qi(e,t,n,r,s,o){return Fo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function hd(e,t){let n={};for(let r of Yi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function yd(e,t){let n={};for(let r of or){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Xi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...or]}],ur={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ia={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ji(e,t,n,r,s,o=null){let a=yn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function vd(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Ji(e,t,n,r,s,o))a[i.source]+=1;return a}function wd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function kd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var S$=[...na,...or];var xb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],el={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},$d={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Ab={pin:"pin",global:"global",base:"base"};function Sb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Ab[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Eb(e,t,n){switch(e){case"workflow_mode":return Ps;case"spec_review_model":case"impl_review_model":return Ds;case"plan_review_model":return oa;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return aa;case"impl_dispatch":return fd;case"impl_runtime":return sa;case"impl_model":return ns(n,t.impl_runtime);case"impl_effort":return rs(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ms;case"orchestration_model":return Ns(n,null);case"orchestration_effort":return rs(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function Tb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Sb(e.source)}
    <span class="detail-effective__k"
      >${ur[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ia[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${ur[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function xd(e,t){let n=Xi.flatMap(l=>l.keys),r=Ji(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=vd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${Cb(o)}</span
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
          ${Xi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Fo({key:u.key,choices:Eb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Tb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Cb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Rb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Ad(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Rb(n.exec_receipt),l=i?Xn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=No(n.planned_execution,n.exec_receipt),m=n.chips?.pr?.number,h=typeof m=="number"?`PR #${m}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${Ob(s).map(b=>Lb(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function Ob(e){let n=typeof e=="string"&&Object.hasOwn(el,e)&&el[e]||el.spec_backed;return xb.filter(r=>n.includes(r.id))}var la={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Lb(e,t,n,r){let s=Ib(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",m=u?la.stale:i?la.on:l?la.current:la.none,h=Mb(e,n),b=`${r.label} \xB7 ${m}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,F=c`<span class="detail-summary__gate-label"
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
      >${F}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${F}</span
  >`}function Ib(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Mb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn($d,n)?$d[n]:""}function ca(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Sd(e){return ca(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Ed(e,t){let n=e&&e[t];if(!ca(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Sd),s=Sd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Rd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ua(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Rd(e)}${t}`}function ss(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Rd(e)}`}function Pb(e,t,n){if(n!==null){let s=e==="claude"?ua:ss,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ss({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Td(e,t){if(!ca(e)||e.state!=="usable"||!ca(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Cd(e){let t=e.provider_key==="claude"?ua:ss,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Pb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Od({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Cd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Ed(t,"claude"),selected:s,workspace_default:Td(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Cd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Ed(t,"codex"),selected:o,workspace_default:Td(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Ld=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function da(e){if(!qs(e)||!qs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>qs(n)&&qs(n.models));return t.length>0?t:null}function qn(e,t){let n=da(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Id(e,t){return qs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Md(e,t){let n=da(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Id(r,r.models[t]);return[]}function Db(e){let t=da(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Id(r,s))n.includes(o)||n.push(o);return n}function Nb(e,t){if(!t)return Db(e);let r=da(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Md(e,o))s.includes(a)||s.push(a);return s}function Pd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=qn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Md(t,r.impl_model):Nb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function qb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Fb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function pa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${qb(s)}</span
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
                        >`}${cr(a)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){st(d(),e)}async function h(F,V={}){s=F,o="loading",a="",i=null,l="",m();let Z=V.workspace||(n?n():"");if(!Z){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let le="/api/doc?workspace="+encodeURIComponent(Z)+"&path="+encodeURIComponent(F);try{let X=await r(le),B=await X.json().catch(()=>({}));if(!X.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&V.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||X.status)+")",m();return}let N=Fb(String(B.content||""));i=N.front,a=N.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,st(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:k}}var jb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],qd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fa=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Bb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Dd(e){return typeof e=="string"&&Bb.has(e)}var Ub=["running","done","failed","interrupted"],Wb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function zb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Hb(e){let t=dn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${qd}
          >부분 집계</span
        >`:""}`}function Nd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function rl(e){if(typeof e=="number")return Fs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Fs(t):""}function Gb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Kb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function tl(e){return e===null||typeof e=="string"&&e.trim().length>0}function nl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Vb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!fa.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?tl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||tl(t.effort))||!(!("agent_type"in t)||tl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Ub.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!nl(t.started_at)||!nl(t.last_event_at)||!nl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Yb(e,t,n){let s=dn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${rl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${rl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Zb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?dn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Fs(e.last_event_at):s?rl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Gb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Kb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Wb[e.status]}</span
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
  </button>`}function Qb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xb(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let m=Vb(d);!m||s.has(m.launch_id)||Dd(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let a={};for(let{role:d,provider:m}of fa){let h=t?t.roles[d]?.[m]:null;a[d]=h?[...h.legs]:[]}let i=fa.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:m}of fa){for(let h of r.filter(b=>b.role===d&&b.provider===m)){let b=i.find(k=>k.receipt_id===h.launch_id)||null;b&&!Qb(h,b)||(b&&l.add(b.receipt_id),u.push(Zb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Dd(h.agent_type)&&u.push(Yb(d,m,h))}return u}function Jb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...jb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${zb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${qd}</span>`:""}
  </div>`}var eh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function th(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var nh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function rh(e,t){let n=nh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${bi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${ys(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Fs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Fd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],i=a.map(b=>rh(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let F=typeof b.session_id=="string"&&b.session_id.length>0,V=u.has(b.attempt_id),Z=F&&!V,le=F?V?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Z}
      title=${le}
      @click=${X=>{X.stopPropagation(),Z&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let F=b.cause_detail,V=F&&typeof F.reason=="string"&&F.reason.length>0?typeof F.command=="string"&&F.command.length>0?`${F.reason} \xB7 ${F.command}`:F.reason:b.cause;return c`<div class="detail-session__cause" title=${V}>
      ${b.cause}
    </div>`},h=b=>{let k=Nd(wi(b));if(dn(k).length===0&&!Xr(b.usage))return"";let F=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${F?"true":"false"}
      title=${F?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${V=>{V.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Hb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let k=wi(b),F=Nd(k),V=dn(F);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${eh[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${bs(b)?c`<span
                  class="detail-session__resumed"
                  title=${bs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sr(b)}</span>
            ${V.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${V.length>0?V.map(Z=>c`<span
                      class="detail-session__usage"
                      title=${Z.tooltip}
                      >${Z.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Fs(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${m(b)} ${th(b)}
          ${l.has(b.attempt_id)&&b.usage?Jb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Xb(b,k,t)}
        </div>`})}
    </div>
  `}function jd(e,t={}){return c`
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
          ${sh(e)}
        </div>`:""}
  `}function sh(e){let t=es(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?sr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Jo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var oh=["open","in_progress","deferred","resolved","closed"],ah=[0,1,2,3,4];function Bd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},h="",b=!1,k=[],F=!1,V={},Z={claude:null,codex:null},le=null,X=null,B=0,N=!1,W=!1,T="",M="",se="";function be(){N=!1,W=!1,T="",M="",se=""}function xe(){Z={claude:null,codex:null},le=null,X=null,B+=1}async function ce(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function _e(y){try{let Q=await fetch(y);if(!Q.ok)return null;let C=await Q.json();if(!C||typeof C!="object"||!Array.isArray(C.accounts))return null;let $e=C.accounts.filter(et=>et!==null&&typeof et=="object"&&!Array.isArray(et));return{accounts:$e,active:$e.find(et=>et.active===!0)||null}}catch{return null}}async function Te(y){X=y;let Q=++B,[C,$e,et]=await Promise.all([_e("/api/claude-usage"),_e("/api/codex-usage"),ce()]);Q!==B||y!==u||(Z={claude:C,codex:$e},le=et,J())}let qe=[],ke=null,ee=null,Ce=!1,Ie="",Y=!1,D=0,me=new Set;function Ae(){qe=[],ke=null,ee=null,Ce=!1,Ie="",Y=!1,D+=1,me.clear()}async function We(y){if(!s)return;let Q=++D;try{let C=await Promise.resolve(s("get-comments",{id:y}));if(Q!==D||y!==u)return;qe=Array.isArray(C)?C:[],Ce=!1}catch{if(Q!==D||y!==u)return;Ce=!0}J()}function pe(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ke!==u){ke=u,ee=y,We(u);return}y!==null&&y!==ee&&(ee=y,We(u))}function Fe(y){me.has(y)?me.delete(y):me.add(y),J()}function dt(y){let Q=Ie.trim().length===0;Ie=y,Q!==(y.trim().length===0)&&J()}async function at(){let y=Ie.trim();if(!s||!u||y.length===0||Y)return;let Q=u;Y=!0,J();let C=!1;try{let $e=await Promise.resolve(s("add-comment",{id:Q,text:y}));Array.isArray($e)&&$e.length>0&&(C=!0,Q===u&&(qe=$e,Ce=!1,Ie="",ee=$e.length))}catch{C=!1}C||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Q===u&&(Y=!1),J()}let $t={onToggle:Fe,onDraftInput:dt,onSubmit:at},ct=t.mdViewer||null,R=null;ct||(R=document.createElement("div"),R.className="md-viewer-root",document.body.appendChild(R));let ie=ct||pa(R,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Le=document.createElement("div");Le.className="session-log-root",document.body.appendChild(Le);let Ne=ts(Le,{transport:s?(y,Q)=>Promise.resolve(s(y,Q)):void 0,sessionLogStore:l}),Ye=!1,nt=!1,mt=!1,bt=null,oe=null,te=0;function je(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function it(){Ye=!1,nt=!1,mt=!1,bt=null,oe=null,te+=1}async function He(y){if(!s)return;let Q=++te;nt=!0,mt=!1,J();try{let C=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(Q!==te)return;!C||typeof C!="object"||Array.isArray(C)?mt=!0:(bt=C,oe=je(y))}catch{Q===te&&(mt=!0)}finally{Q===te&&(nt=!1,J())}}let we=[],ze=null,lt=0;function ut(y,Q){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${Q}`}function pt(){we=[],ze=null,lt+=1}async function Pt(y,Q){if(!s)return;let C=++lt,$e;try{$e=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{$e=null}C!==lt||Q!==ze||(we=$e&&Array.isArray($e.sessions)?$e.sessions:[],J())}function Ht(){if(!s||!u)return;let y=d&&d.metadata,Q=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(Q===null){pt();return}let C=ut(u,Q);ze!==C&&(we=[],ze=C,Pt(u,C))}function Ut(){if(Ye=!Ye,Ye&&u&&oe!==je(u)){bt=null,He(u);return}J()}function xt(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(C=>C&&C.bead_id===u).sort((C,$e)=>($e.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,effort:C.effort||C.observed_effort||null,speed:C.speed||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,continuation_mode:C.continuation_mode||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,exec_default_preset_id:typeof C.exec_default_preset_id=="string"?C.exec_default_preset_id:null,exec_default_preset_revision:typeof C.exec_default_preset_revision=="number"?C.exec_default_preset_revision:null,exec_values:C.exec_values&&typeof C.exec_values=="object"?C.exec_values:null,usage:C.usage||null,usage_legs:Array.isArray(C.usage_legs)?C.usage_legs:[],delegation_sessions:Array.isArray(C.delegation_sessions)?C.delegation_sessions:[]}))}function St(){if(!a||!u)return null;let y=a.get();return Rn(y&&y.attempts||{},u)}let Qe=new Set;function Pe(y){Qe.has(y)?Qe.delete(y):Qe.add(y),J()}function P(y){let Q=a?a.get():null,C=Q&&Q.attempts?Q.attempts[y]:null;Ne.open({attempt_id:y,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}function re(y,Q){let C=a?a.get():null,$e=C&&C.attempts?C.attempts[y]:null,Xe=($e&&Array.isArray($e.delegation_sessions)?$e.delegation_sessions:[]).find(ft=>ft&&typeof ft=="object"&&ft.launch_id===Q);Xe&&Ne.open({attempt_id:y,launch_id:Q,meta:{runner:Xe.provider==="claude"?"claude":"codex",role:Xe.role,...typeof Xe.agent_type=="string"?{agent_type:Xe.agent_type}:{},model:Xe.model,effort:Xe.effort,session_id:Xe.session_id,status:Xe.status}})}async function ye(y){if(!s||!y)return;let Q=await Yr();if(Q===null)return;let C=()=>{let ft=a?a.get():null;return ft&&typeof ft.revision=="number"?ft.revision:0},$e=async(ft={},tt=C())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:tt,...Q!==""?{instructions:Q}:{},...ft}),et=ft=>{ft?.queue&&a?.set&&a.set(ft.queue)},Xe=await $e();if(et(Xe),Xe&&Xe.conflict){let ft=Xe.queue&&typeof Xe.queue.revision=="number"?Xe.queue.revision:C();Xe=await $e({},ft),et(Xe)}Xe=await Jn(Xe,(ft,tt)=>$e({continuation:ft,decision_token:tt}),{onResult:et,refresh:()=>$e()}),Xe&&Xe.resumed===!1&&!Xe.conflict&&Xe.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Xe.reason}`,"error",2400)}function S(y){!y||!u||Ne.open(Zr(y,u,d&&d.status))}let H={onOpen:P,onOpenDelegation:re,onResume:ye,onToggleUsage:Pe,onOpenSessionRef:S,onCopyResumeCommand:kt};function Oe(){let y=a?a.get():null,Q={...V};for(let C of["orchestration_model","orchestration_effort","orchestration_speed"]){let $e=y&&y[C];typeof $e=="string"&&(Q[C]=$e)}return Q}async function x(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));V=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{V={}}J()}}function L(){let y=a?a.get():null;return y&&y.runner_catalog||null}function ne(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function fe(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},C=yn({pin:{...y,...m},global:Oe(),execution_defaults:ne(),runner_catalog:L(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return qn(L(),C)}function Ee(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function A(y){return y?.compatible===!1}function U(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function G(){let y=Ee(),Q=y?.presets.find(C=>C.id===h);if(!(!s||!u||!y||!Q||A(Q)||b)){b=!0,k=[],J();try{let C=await Promise.resolve(s("apply-impl-preset",kd(u,Q.id,y.revision)));if(C&&C.conflict){U(C),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let $e=C&&Array.isArray(C.issue)?C.issue[0]:C?.issue;if(C&&C.applied&&$e&&typeof $e=="object"){d=$e,k=Array.isArray(C.skipped_orchestration_keys)?C.skipped_orchestration_keys.filter(et=>typeof et=="string"):[];for(let et of Ld)delete m[et];ue(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}C&&C.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(C){C&&typeof C=="object"&&C.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,J()}}}let Ve=null;n&&n.subscribe&&(Ve=n.subscribe(()=>ht()));let Be=null;a&&typeof a.subscribe=="function"&&(Be=a.subscribe(()=>{u&&J()}));let ge=null;i&&typeof i.subscribe=="function"&&(ge=i.subscribe(()=>{u&&J()}));function Et(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",Et);function ht(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(C=>C&&C.id===u)||y[0]||d}pe(),Ht(),J()}}function kt(y){Sn(y).then(Q=>{Q?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Vt(y){y.preventDefault(),y.stopPropagation(),u&&kt(u)}function Tt(y,Q){y.preventDefault(),y.stopPropagation(),kt(Q)}function on(y,Q,C){y.preventDefault(),y.stopPropagation(),ie.open(Q,{missing_state:C})}function Jt(y,Q){m[y]=Q,J(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",wd(u,y,Q.length===0?null:Q))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function en(y,Q){let C=d||{},$e=C.metadata&&typeof C.metadata=="object"?C.metadata:{},et={};for(let tt of["impl_runtime","impl_model","impl_effort"])et[tt]=Object.hasOwn(m,tt)?m[tt]:typeof $e[tt]=="string"?$e[tt]:"";et[y]=Q;let Xe=Pd(et,L(),fe()),ft={};for(let tt of["impl_runtime","impl_model","impl_effort"])ft[tt]=m[tt],m[tt]=Xe[tt]||"";J(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Xe,orchestration_runtime:fe()})).then(tt=>{let gt=Array.isArray(tt)?tt[0]:tt;if(!gt||typeof gt!="object"||!gt.id)throw new Error("implementation target readback failed");d=gt;for(let ln of["impl_runtime","impl_model","impl_effort"])delete m[ln];J()}).catch(()=>{for(let tt of["impl_runtime","impl_model","impl_effort"])ft[tt]===void 0?delete m[tt]:m[tt]=ft[tt];J(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Gt(y,Q,C){if(!s||!u)return!1;try{let $e=await Promise.resolve(s(y,Q)),et=Array.isArray($e)?$e[0]:$e;return et&&typeof et=="object"&&et.id?(d=et,!0):(ue(C,"error"),!1)}catch{return ue(C,"error"),!1}}function tn(y){setTimeout(()=>{try{let Q=e.querySelector(y);Q&&typeof Q.focus=="function"&&Q.focus()}catch{}},0)}function an(){N=!0,T=d&&d.title||"",J(),tn('.detail-edit__input[data-edit="title"]')}function wn(y){T=y.target.value}function Se(){N=!1,T="",J()}function De(){Gt("edit-text",{id:u,field:"title",value:T},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q&&(N=!1,T=""),J()})}function O(){W=!0,M=d&&d.description||"",J(),tn('.detail-edit__textarea[data-edit="description"]')}function he(y){M=y.target.value}function Me(){W=!1,M="",J()}function yt(){Gt("edit-text",{id:u,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q&&(W=!1,M=""),J()})}function Dt(y,Q,C,$e){if(y.key==="Escape"){y.stopPropagation(),C();return}y.key==="Enter"&&(!$e||y.ctrlKey||y.metaKey)&&(y.preventDefault(),Q())}function Ct(y){let Q=y.target.value;Gt("update-status",{id:u,status:Q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>J())}function Yt(y){let Q=Number(y.target.value);Gt("update-priority",{id:u,priority:Q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>J())}function Nt(y){se=y.target.value}function nn(){let y=se.trim();y.length!==0&&Gt("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Q=>{Q&&(se=""),J()})}function kn(y){if(y.key==="Escape"){y.stopPropagation(),se="",J();return}y.key==="Enter"&&(y.preventDefault(),nn())}function qt(y){Gt("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>J())}let $n={onCopyPath:Tt,onOpenDoc:on};function xn(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Vn(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function E(y){let C=(Array.isArray(y.dependencies)?y.dependencies:[]).map($e=>({id:xn($e),icon:Vn($e)})).filter($e=>$e.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${C.map($e=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o($e.id)}
                  >
                    ${$e.icon?`${$e.icon} `:""}${$e.id}
                  </button>`:c`<span class="detail-dep"
                    >${$e.icon?`${$e.icon} `:""}${$e.id}</span
                  >`)}
          </div>`}
    `}function I(y){let Q=y.metadata||{},C=y.workflow||{},$e=C.stages||{},et=$e.spec&&$e.spec.stale,Xe=$e.impl&&$e.impl.stale,ft=C.quick_fix_review?.state==="stale",tt=$e.plan||null,gt=C.route_source==="derived",ln=C.route||Q.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${gt?" detail-kv__v--derived":""}"
          title=${gt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${gt?"unset":ln}</span
        >
      </div>
      ${C.route!=="quick_fix"||Object.hasOwn(Q,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Q.spec_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${tt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${tt?.approval_receipt||"\uC5C6\uC74C"}${tt?.approval_state==="stale"?" \xB7 stale":tt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${C.route!=="quick_fix"||Object.hasOwn(Q,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Q.impl_review||"\uC5C6\uC74C"}${Xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${C.resolver.attempt} \xB7 ${C.resolver.prior_sha} \u2192 ${C.resolver.sha}`}
              >${`${C.resolver.prior_sha.slice(0,7)} \u2192 ${C.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${C.route==="quick_fix"||Object.hasOwn(Q,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Q.quick_fix_review||"\uC5C6\uC74C"}${ft?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${C.planned_execution.kind}</span>
            </div>
            ${C.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${C.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${C.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xn(C.exec_receipt)}</span
            >
          </div>`:""}
      ${C.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${C.impl_entry.actor}@${C.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Q.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Q.pr_url}</span>
          </div>`:""}
    `}let Ue={route:["quick_fix","spec_backed","full_plan"]};async function Ke(y,Q){let C=Q.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){J();return}await Gt("update-workflow-meta",{id:u,key:y,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),J()}function rt(y){let Q=y.metadata||{};return c` ${(($e,et)=>{let Xe=Ue[$e],ft=typeof Q[$e]=="string"?Q[$e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${$e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${$e}
          data-edit=${`wfmeta-${$e}`}
          @change=${tt=>Ke($e,tt)}
        >
          <option value="" ?selected=${!Xe.includes(ft)}>
            ${et}
          </option>
          ${Xe.map(tt=>c`<option value=${tt} ?selected=${ft===tt}>${tt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function vt(y,Q){return N?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${T}
            @input=${wn}
            @keydown=${C=>Dt(C,De,Se,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${De}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Se}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${dn(Q).map(C=>c`<span class="detail-usage-total" title=${C.tooltip}
              >${C.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${an}
        >
          ✎
        </button>
      </div>
    `}function Zt(y){let Q=un(y.created_at),C=un(y.updated_at);return!Q&&!C?c``:c`
      ${Q?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Q}</span>
          </div>`:""}
      ${C?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function gr(y,Q){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ct}
        >
          ${oh.map(C=>c`<option value=${C} ?selected=${C===y}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Yt}
        >
          ${ah.map(C=>c`<option value=${String(C)} ?selected=${C===Q}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function Ir(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${O}
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
              .value=${M}
              @input=${he}
              @keydown=${Q=>Dt(Q,yt,Me,!0)}
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
                @click=${Me}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function f(y){let Q=typeof y.notes=="string"?y.notes:"";return Q.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Q}</div>
    `}function w(y){let Q=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Q.map(C=>c`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>qt(C)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${se}
            @input=${Nt}
            @keydown=${kn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nn}
          >
            추가
          </button>
        </span>
      </div>
    `}function K(){if(!u)return c``;let y=d||{},Q=String(y.id||u),C=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",$e=St(),et=y.status||"open",Xe=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",ft=y.description||"",tt={...y,metadata:{...y.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Vt}
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
          ${vt(C,$e)}
          ${Ad(tt)}
          ${xd({metadata:tt.metadata,workspace_values:Oe(),catalog:L(),execution_defaults:ne(),expanded:F,presets:Ee()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:gt=>{F=gt,J()},onEdit:(gt,ln)=>{if(gt==="impl_runtime"||gt==="impl_model"||gt==="impl_effort"){en(gt,ln??"");return}Jt(gt,ln??"")},onPresetSelect:gt=>{h=gt,k=[],J()},onPresetApply:()=>{G()}})}
          ${Od({md:tt.metadata,catalog:Z,workspace_defaults:le,handlers:{onExecChange:Jt}})}
          ${gr(et,Xe)} ${Zt(y)}
          ${Ir(ft)}
          ${ud(qe,$t,{expanded:me,draft:Ie,sending:Y,error:Ce})}
          ${f(y)} ${w(y)} ${E(y)}
          ${I(y)} ${rt(y)}
          ${id(y,$n)}
          ${jd({expanded:Ye,loading:nt,error:mt,data:bt},{onToggle:Ut})}
          ${Fd(xt(),H,{total:$e,expanded:Qe},we)}
        </div>
      </div>
    `}function J(){st(K(),e)}return{load(y){y!==u&&(m={},h="",k=[],F=!1,be(),Ae(),it(),pt(),xe()),u=y,d=null,ht(),x(),X!==y&&Te(y)},clear(){u=null,d=null,m={},h="",b=!1,k=[],F=!1,be(),Ae(),it(),pt(),xe(),ie.close(),Ne.close(),st(c``,e)},destroy(){Ve&&(Ve(),Ve=null),Be&&(Be(),Be=null),ge&&(ge(),ge=null),document.removeEventListener("keydown",Et),ct||(ie.destroy(),R&&R.parentNode&&R.parentNode.removeChild(R)),Ne.destroy(),Le.parentNode&&Le.parentNode.removeChild(Le),u=null,d=null,xe(),h="",b=!1,k=[],Ae(),it(),pt(),st(c``,e)}}}function Ud(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}var ih="(max-width: 640px)";function _a(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ih),n=!!t.matches;e(n);let r=s=>{let a=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);a!==n&&(n=a,e(a))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function lh(){return{lanes:{done:!0},areas:{}}}function js(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ch(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:js(r.lanes),areas:js(r.areas)}:{lanes:js(r),areas:{}}}catch{return null}}function Wd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ma(e,t=lh()){let n={lanes:js(t.lanes),areas:js(t.areas)},r=ch(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let a=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:a}},Wd(e,s),a},toggleArea(o){let a=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:a}},Wd(e,s),a}}}var Gn=e=>e??Wt;function ga(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ba(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ha(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function ya(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function uh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ga(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Hd(e,t){let n=uh(e,t);return n?c`<button
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
            title=${n.deploy.at?un(n.deploy.at):""}
            >${ya(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Us(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function os(e){let t=hn(e.created_at),n=hn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${un(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${un(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function dh(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ws(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function va(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Fn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?dh(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Bs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var ph={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Gd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:ph[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function wa(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function fh(e){return c`<div
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
  </div>`}function ka(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
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
        >`:""}${s?fh(s):""}
  </div>`}function $a(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function _h(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Kd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function xa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function mh(e){let t=Array.isArray(e.badges)?e.badges:[],n=dn(e.usage),r=er(e.usage),s=hn(e.done_at);return c`<div
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
            title=${`\uC644\uB8CC ${un(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${vs(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Us(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function jn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return mh(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=dn(e.usage),o=er(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!i,u=l?hn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,F=e.lane==="done"?"":$a(e.workflow),V=e.lane==="done"?"":Kd(e.from_id),Z=xa(e.priority),le=c`<span class="worker-mini__title">${e.title}</span>`,X=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",B=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",N=r.map(We=>We===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${We}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${We===e.completion_badge&&e.completion_title||""}
          >${We}</span
        >`),W=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",T=s.length>0?s.map(We=>c`<span class="worker-usage" title=${We.tooltip}
              >${We.label}</span
            >`):o?c`<span class="worker-usage" title=${vs(e.usage)}
            >${o}</span
          >`:"",M=a?c`<span
        class="merge-step${a.failed?" merge-step--failed":""}"
        style=${`--progress: ${a.percent}%`}
        >${a.label}${a.index>0?c`<span class="merge-step__n"
              >${a.index}/${a.total}</span
            >`:""}</span
      >`:"",se=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",be=e.cancel_action?c`<button
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
      </button>`:"",ce=e.discard,_e=ce?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ce?.attempt_id||""}
          data-operation-id=${ce?.operation?.operation_id||""}
          data-discard-mode=${ce?.confirmation||"unmerged"}
          ?disabled=${ce?!ce.enabled:e.discard_enabled===!1}
          title=${ce?ce.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ce?.label||"\uD3D0\uAE30"}
        </button>`:"",Te=e.stale_work||null,qe=Te?c`${Te.can_resume||Te.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Te.action_id}
            ?disabled=${Te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Te.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Te.action_id}
            ?disabled=${Te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Te.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Te.action_id}
            ?disabled=${Te.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=Te?c`<div class="worker-mini__stale">
        <strong>${Te.title}</strong>
        <span>${Te.summary}</span>
        <span>${Te.cause}</span>
        ${Te.can_backup_fresh?c`<small
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
        </button>`:"",Ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ie=b||F||V||Ce||T?c`<div class="worker-chips">
          ${b}${F}${V}${Ce?wa(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${T}
        </div>`:"",Y=ka(e.dependency_chips),D=Bs(e),me=t.actions?t.actions:"",Ae=!!(a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ce?.operation||e.revise_action||Te);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${a?" worker-mini--merging":""}${a?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${Z}${V}${le}${me}
          </div>
          <div class="worker-mini__row2">
            ${T}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${un(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Us(e.work_ms)}</span
                >`:""}${N}${M}
            <span class="worker-mini__actions"
              >${se}${be}${xe}${_e}</span
            >
            ${os(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${m}${k}${Z}${X}${B}${N}${h}${W}${me}
            </div>
            <div class="worker-mini__body">${le}${ke}</div>
            ${Y}${Ie}${Ae?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${se}${be}${xe}${_e}${ee}${qe}</span
                  >
                  ${Bs(e)}
                </div>`:""}
            ${os(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${k}${Z}${le}${X}${B}${N}${h}${W}${M}${se}${be}${xe}${_e}${me}
            </div>
            ${Y}${Ie}${D} ${os(e)}`}
  </div>`}function gh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var bh={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function sl(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=bh[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=ka(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=$a(l),k=Kd(e.from_id),F=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${xa(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${_h(l)}${n.dep_action===!0?c`<span class="worker-card__head-actions"
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
    ${l?Po(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${m}
    ${h||b||k||F?c`<div class="worker-chips">
          ${h}${b}${k}${wa(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${gh(t.lanes,e.id)}
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
  </div>`}function Kn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Gn(e.id||void 0)}
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
                  </div>`:e.items.map(s=>e.lane==="candidate"?sl(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):jn(s))}
          </div>`}
  </section>`}function zd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Aa(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${zd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${Gn(r.drop)}
            data-root-dir=${Gn(r.root_dir)}
            data-lane-id=${Gn(r.lane_id)}
            data-lane-length=${Gn(r.lane_length)}
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
        ${zd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>hh(s))}
          </div>`}
    </section>
  </div>`}function hh(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Kn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${Gn(t.drop)}
        data-root-dir=${Gn(t.root_dir)}
        data-lane-id=${Gn(t.lane_id)}
        data-lane-length=${Gn(t.lane_length)}
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
  </div>`}function Sa(e){return e.count?c`<section
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
  </section>`:""}function Ea(e){return e.replace(/\/+$/,"")}function yh(e,t){let n=Ea(e),r=Ea(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ta(e,t){let n=new Set;for(let r of e)for(let s of t){if(!yh(r,s))continue;let o=Ea(r),a=Ea(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Yd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=Ta(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Vd=["parallel","serial","candidate"];function zs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function ol(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Vd.includes(r.kind),l=Vd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=vh(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${zs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function vh(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Zd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Qd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Xd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function al(e){for(let t of Xd(e))if(Object.hasOwn(Zd,t))return Zd[t];return null}function il(e){let t=null;for(let n of Xd(e))Object.hasOwn(Qd,n)&&(t=Qd[n]);return t}function Ca(e){let t=al(e),n=il(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Jd(e,t){let n=al(e)??al(t),r=il(t)??il(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ep=160;function wh(e){return e.length>ep?`${e.slice(0,ep)}\u2026`:e}function kh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${wh(e.command)}</code>`:""}
  </div>`}function $h(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function tp(e){let t=e.failure?Ca(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${kh(e.failure.cause_detail,e.failure.reason)}
          ${$h(e.failure.reason)}
          ${Bs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Ah(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Sh=new Set(["codex-runner"]);function Eh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Sh.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?hn(r.last_event_at,t):"",m=r?hn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${hn(a,t)}</span
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
      </div>`:""}`}var Th={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ch(e){if(!e)return"";let t=Th[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function ll(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(_e=>_e&&_e.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=bs(e),m=dn(e.usage),h=er(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,F=e.landing,V=e.attempt_id&&e.attempt_id===n,Z=r.monitor||null,le=Ah(Z),X=Z?ka(Z.dependency_chips):"",B=Eh(Z,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),N=s&&e.workflow?.chips?.exec_receipt||null,W=$a(e.workflow),T=N?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(N)}`}
        >${`${N.kind}:${Do(N)}`}</span
      >`:"",M=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${ys(o)}</span
      >`:"",se=le||W||M||T?c`<div class="rtile__meta">
          ${le}${W}${M}${T}
        </div>`:"",be=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,xe=s?"":os(e),ce=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${V?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${xa(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${be}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${Ch(o)}<span
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
                ${ce}
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
                ${ce}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${B}${e.rollup?Mo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:_i}):""}
    ${F?c`<div class="rtile__landing">
          <span
            class="merge-step${F.failed?" merge-step--failed":""}"
            style=${`--progress: ${F.percent}%`}
            >${F.label}${F.index>0?c`<span class="merge-step__n"
                  >${F.index}/${F.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${X}
    ${s?se:le||W||u||m.length>0||h?c`<div class="rtile__meta">
            ${le}${W}${wa(e.exec_chips)}
            ${m.length>0?m.map(_e=>c`<span class="worker-usage" title=${_e.tooltip}
                      >${_e.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${vs(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Bs(e)} ${xe}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function np(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>ll(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var cl=new Set(["unavailable","not_applicable"]);function dr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function rp(e){return e.filter(t=>t!==null).join(" \xB7 ")}function pr(e,t){return t===null?null:`${ur[e]}: ${t.display} (${ia[t.source]})`}function ul(e){return e.filter(t=>t!==null).join(`
`)}function Hs(e){if(typeof e!="object"||e===null)return null;let t=Sr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:ul(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ur.orchestration_model,e.model),n(ur.orchestration_effort,e.effort),n(ur.orchestration_speed,e.speed)])}}function Rr(e,t){let n=dr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=dr(e,"orchestration_effort"),s=dr(e,"orchestration_speed"),o=rp([qn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:ul(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",pr("orchestration_model",n),pr("orchestration_effort",r),pr("orchestration_speed",s)])}}function Rh(e,t){return e===null||e.value===null||cl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Oh(e){return e===null||cl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Lh(e){return e===null?null:e.value==="auto"?"auto":cl.has(e.resolution)?null:e.display}function fr(e,t){if(typeof e!="object"||e===null)return null;let n=dr(e,"impl_dispatch"),r=dr(e,"impl_runtime"),s=dr(e,"impl_model"),o=dr(e,"impl_effort"),a=dr(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":rp([Rh(r,t??null),Oh(s),Lh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ul(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",pr("impl_dispatch",n),pr("impl_runtime",r),pr("impl_model",s),pr("impl_effort",o),pr("impl_speed",a)])}}var pn="",Ih=["impl_runtime","impl_model","impl_effort"],Mh=["claude_account","codex_account"],Ph=5,Ra=1;function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Oa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>ue(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,F=null,V={},Z="",le="",X=!1,B=!1,N=!1,W=null,T=!1;function M(){let P=t.queue?t.queue():null;return vn(P)?P:null}function se(){let P=M();return P?P.runner_catalog:null}function be(){let P=M();return P&&vn(P.execution_defaults)?P.execution_defaults:null}function xe(){let P=t.implPresetStore?.get();return vn(P)&&Array.isArray(P.presets)?P:null}function ce(){return r===null?{}:{root_dir:r}}async function _e(P,re){return T||!n?null:await n(P,re)}function Te(P){P&&vn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function qe(P,re){let ye=M();if(!ye||T)return null;let S=await _e(P,{...re,...ce(),expected_revision:ye.revision});if(Te(S),r!==null&&S&&S.conflict){let H=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:M()?.revision??ye.revision;S=await _e(P,{...re,...ce(),expected_revision:H}),Te(S)}return S}async function ke(){l=!0,Pe();try{let P=await _e("get-session-defaults",{...ce()});o=vn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,Pe()}}async function ee(){let P=hd(o,a);if(Object.keys(P).length!==0){try{let re=await _e("set-session-defaults",{values:P,...ce()});o=vn(re?.values)?{...re.values}:{},a={...o},i=Array.isArray(re?.warnings)?re.warnings:[]}catch(re){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Pe()}}function Ce(P,re){if(!vn(P))return;let ye=P.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:vn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},m={...u.values},re&&(d={...m})}async function Ie(){try{Ce(await _e("get-workspace-accounts",{...ce()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Pe()}async function Y(P){try{let re=await fetch(P);if(!re.ok)return null;let ye=await re.json();if(!vn(ye)||!Array.isArray(ye.accounts))return null;let S=ye.accounts.filter(H=>vn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:S,active:S.find(H=>H.active===!0)||null}}catch{return null}}async function D(){k=!0;let[P,re]=await Promise.all([Y("/api/claude-usage"),Y("/api/codex-usage")]);T||(b={claude:P,codex:re},Pe())}function me(){let P={};for(let re of Mh){let ye=Object.hasOwn(d,re)?d[re]:null,S=Object.hasOwn(m,re)?m[re]:null;ye!==S&&(P[re]=ye)}return P}async function Ae(){let P=me();if(Object.keys(P).length!==0){try{Ce(await _e("set-workspace-accounts",{values:P,...ce()}),!1)}catch(re){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Pe()}}function We(P,re){re===pn?delete d[P]:d[P]=re,Pe(),h=h.then(()=>Ae())}function pe(P,re){if(Ih.includes(P)){at(P,re);return}re===pn?delete a[P]:a[P]=re,Pe(),ee()}function Fe(){let P=St().orchestration_model,re=yn({global:{orchestration_model:P??void 0},execution_defaults:be(),runner_catalog:se()}).orchestration_model.value;return re?qn(se(),re):null}function dt(P,re){typeof re=="string"&&re.length>0?a[P]=re:delete a[P]}function at(P,re){let ye=re===pn?void 0:re,S=gd({impl_runtime:P==="impl_runtime"?ye:a.impl_runtime,impl_model:P==="impl_model"?ye:a.impl_model,impl_effort:P==="impl_effort"?ye:a.impl_effort},se(),Fe());dt("impl_runtime",S.impl_runtime),dt("impl_model",S.impl_model),dt("impl_effort",S.impl_effort),Pe(),ee()}async function $t(){let P=M();if(!P)return;let re={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ye=yd(re,{...re,...V});if(Object.keys(ye).length!==0){try{let S=await qe("worker-queue-set-orchestration-defaults",{values:ye});if(S&&S.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}V={}}catch(S){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Pe()}}function ct(P,re){V[P]=re===pn?null:re,Pe(),$t()}function R(P){if(F=P,!P){Pe();return}let re=se(),ye=St(),S=ye.orchestration_model;S&&!Ns(re,P).includes(S)&&(V.orchestration_model=null,S=null);let H=ye.orchestration_effort;H&&!Zi(re,P,S||Tn).includes(H)&&(V.orchestration_effort=null),Pe(),$t()}async function ie(P){if(!(!M()||P<Ra)){try{await qe("worker-queue-set-slots",{slots:P})}catch(re){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Pe()}}async function Le(P){if(!(!M()||P<Ra||P>Ph)){try{await qe("worker-queue-set-serial-lane-count",{count:P})}catch(re){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Pe()}}async function Ne(P,re){let ye=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await qe(ye,{on:re})}catch(S){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Pe()}function Ye(){let P={},re=St();for(let ye of ra){let S=or.includes(ye)?re[ye]:a[ye];typeof S=="string"&&S.length>0&&(P[ye]=S)}return P}async function nt(){let P=xe();if(!P)return;let re=Ye();if(Object.keys(re).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(P.presets||[]).find(H=>H.id===Z),S=le.trim()||(ye?ye.name:"");if(!S){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ye?await _e("impl-preset-update",{expected_revision:P.revision,id:ye.id,name:S,settings:re}):await _e("impl-preset-create",{expected_revision:P.revision,name:S,settings:re});if(H&&H.applied){if(le="",!ye&&Array.isArray(H.presets)){let Oe=H.presets.find(x=>x.name===S);Z=Oe?Oe.id:Z}Pe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function mt(){let P=xe();if(!(!P||Z.length===0))try{let re=await _e("impl-preset-delete",{expected_revision:P.revision,id:Z});re&&re.applied?(Z="",Pe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Pe())}catch(re){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}}function bt(P){o=vn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],vn(P.queue)&&(t.onQueueAdopt?.(P.queue),V={})}async function oe(){let P=xe(),re=M();if(!P||!re||Z.length===0)return;let ye=S=>({preset_id:Z,expected_revision:P.revision,expected_queue_revision:S,...ce()});try{let S=await _e("apply-impl-preset-global",ye(re.revision));if(S&&S.applied&&bt(S),r!==null&&S&&S.queue_applied===!1){let H=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:M()?.revision??re.revision;S=await _e("apply-impl-preset-global",ye(H)),S&&S.applied&&bt(S)}S&&S.applied?S.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}Pe()}async function te(){B=!0,N=!1,Pe();try{let P=await _e("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?N=!0:W=P}catch{N=!0}finally{B=!1,Pe()}}function je(){if(X=!X,X&&!W){te();return}Pe()}function it(){let P=es({loading:B,error:N});if(P)return P;if(!W)return"";let re=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${re.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${sr(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function He(){return c`<section
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
        @click=${je}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?it():""}
    </section>`}function we(P,re,ye,S,H,Oe,x){let L=H[P]??pn,ne=Qi(P,ye,H,be(),se(),x),fe=ne.options.find(A=>A.value===L),Ee=L===pn?ne.full_value:fe?.full_value;return c`<select
        class=${L===pn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${re}
        title=${Ee||""}
        ?disabled=${Oe===!0||ne.disabled}
        .value=${Cr(String(L))}
        @change=${A=>S(P,String(A.target.value))}
      >
        <option value=${pn} ?selected=${L===pn}>
          ${ne.unset_label}
        </option>
        ${ne.options.map(A=>c`<option
              value=${A.value}
              title=${A.full_value||""}
              ?selected=${A.value===L}
            >
              ${A.label}
            </option>`)}
      </select>
      ${L===pn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function ze(P,re,ye,S,H,Oe=!1,x){return c`<div
      class=${`settings-dialog__row${Oe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        ${we(P,re,ye,S,H,Oe,x)}
      </span>
    </div>`}function lt(P,re){let ye=re?re.active:null;return vn(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ye.email:ss({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function ut(P,re,ye){let S=b[ye],H=Object.hasOwn(d,P)?d[P]:pn,Oe=ye==="claude"?ua:ss,x=!!S?.accounts.some(L=>L.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${re}
          data-account-key=${P}
          @change=${L=>We(P,String(L.target.value))}
        >
          <option value=${pn} ?selected=${H.length===0}>
            ${lt(ye,S)}
          </option>
          ${H.length>0&&!x?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(L=>c`<option value=${L.key} ?selected=${L.key===H}>
                ${Oe(L)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Pt(P,re,ye,S,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${re}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${we(ye,`${P} \uBAA8\uB378`,S,pe,a,!1)}
        ${we(H,`${P} effort`,aa,pe,a,!1)}
      </span>
    </div>`}function Ht(P,re,ye,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${S?"true":"false"}
          aria-label=${re}
          @click=${()=>Ne(P,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function Ut(P,re,ye,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${re}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${re} \uAC10\uC18C`}
            @click=${()=>S(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${re} \uC99D\uAC00`}
            @click=${()=>S(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function xt(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(re=>c`<div
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
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function St(){let P=M(),re={};for(let ye of or)re[ye]=Object.prototype.hasOwnProperty.call(V,ye)?V[ye]:P&&typeof P[ye]=="string"?P[ye]:null;return re}function Qe(){let P=se(),re=a.impl_runtime,ye=a.impl_model,S=xe(),H=M(),Oe=St(),x=Ns(P,F),L=ns(P,void 0).filter(ge=>ge!==Tn),ne=Zi(P,F,Oe.orchestration_model||Tn).filter(ge=>ge!==Tn),fe=Z?(S?.presets||[]).find(ge=>ge.id===Z):null,Ee=fe?bd(Ye(),vn(fe.settings)?fe.settings:{}):null,A=H&&typeof H.slots=="number"?H.slots:Ra+1,U=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:Ra,G=be()?.supported===!0,Ve=pt(),Be=Qi("workflow_mode",Ps,a,be(),P);return c`
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
      ${G?"":c`<div
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
                .value=${Cr(Z)}
                @change=${ge=>{Z=String(ge.target.value),Pe()}}
              >
                <option value="" ?selected=${Z===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(ge=>c`<option
                      value=${ge.id}
                      ?selected=${ge.id===Z}
                    >
                      ${ge.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ee||Ee.rows.length===0}
                @click=${oe}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Cr(le)}
                @input=${ge=>{le=String(ge.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${nt}
              >
                ${Z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Z.length===0}
                @click=${mt}
              >
                삭제
              </button>
            </div>
            ${Ee?xt(Ee):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Cr(F||pn)}
                    @change=${ge=>{let Et=String(ge.target.value);R(Et===pn?null:Et)}}
                  >
                    <option value=${pn} ?selected=${!F}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${F==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${F==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${ze("orchestration_model","\uBAA8\uB378",x,ct,Oe)}
              ${ze("orchestration_effort","effort",ne,ct,Oe)}
              ${ze("orchestration_speed","\uC18D\uB3C4",Ms,ct,Oe)}
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
                      data-mode=${pn}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>pe("workflow_mode",pn)}
                    >
                      ${Be.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ps.map(ge=>c`<button
                          type="button"
                          data-mode=${ge}
                          aria-pressed=${String(a.workflow_mode===ge)}
                          @click=${()=>pe("workflow_mode",ge)}
                        >
                          ${ge}
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
              ${Pt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ds,"spec_review_effort")}
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",oa,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ds,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${ze("impl_runtime","\uC704\uC784 \uB300\uC0C1",sa,pe,a)}
              ${ze("impl_model","\uBAA8\uB378",ns(P,re),pe,a)}
              ${ze("impl_effort","effort",rs(P,re,ye),pe,a)}
              ${ze("impl_speed","\uC18D\uB3C4",Ms,pe,a)}
              ${ze("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",L,pe,a,!1,{...a,...Oe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ht("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Ht("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Ht("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Ut("slots","\uB3D9\uC2DC \uC2E4\uD589",A,ge=>ie(ge))}
              ${Ut("serial-lane-count","\uC9C1\uB82C \uB808\uC778",U,ge=>Le(ge))}
            </div>
            ${He()}
          `}
    `}function Pe(){T||st(Qe(),e)}return{load(){V={};let P=[ke(),Ie()];return k||P.push(D()),Promise.all(P).then(()=>{})},render:Pe,sessionDraft:()=>({...a}),destroy(){T=!0,st(c``,e)}}}function La(e){return c`<svg
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
  </svg>`}function sp(){return La(ms`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function op(){return La(ms`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ap(){return La(ms`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ip(){return La(ms`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function lp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function cp(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return dn(Bo(t));let n={};for(let i of Hn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Hn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?er(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function dl(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Dh(e,t){if(!Bn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function Nh(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=yn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=qn(e.runner_catalog,n.orchestration_model.value??""),s=Rr(n,e.runner_catalog),o=fr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function up(e,t){let n=t.notify||(Y=>ue(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,m=null,h=new Map;function b(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(D=>Bn(D)):[]}function k(Y){return b().find(D=>D.root_dir===Y)||null}function F(Y){return Dh(k(Y),h.get(Y))}function V(){for(let Y of b()){let D=h.get(Y.root_dir);D&&typeof D.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=D.revision&&h.delete(Y.root_dir)}}async function Z(Y,D,me){let Ae=t.transport,We=F(D);if(!(!Ae||!Bn(We))){try{let pe=await Ae(Y,{...me,root_dir:D,expected_revision:We.revision});if(Bn(pe?.queue)&&h.set(D,pe.queue),pe&&pe.conflict){let Fe=Bn(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:F(D)?.revision;pe=await Ae(Y,{...me,root_dir:D,expected_revision:Fe}),Bn(pe?.queue)&&h.set(D,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}ee()}}function le(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),ee())}function X(Y){le(u===Y?null:Y)}function B(Y){if(d===Y){W();return}N(),d=Y;let D=k(Y);a.textContent=`${D?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=Oa(l,{root_dir:Y,queue:()=>F(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:me=>{h.set(Y,me),ee()}}),m.load(),ee()}function N(){m?.destroy(),m=null}function W(Y){N(),d=null,s.hidden=!0,a.textContent="",Y!==!0&&ee()}let T=()=>W();i.addEventListener("click",T);function M(Y){Y.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",M);function se(Y,D){let me=Math.max(D,Y,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${D}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:me},(Ae,We)=>We<Y?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function be(Y){let D=Y.auto_advance===!0,me=Y.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${D?" is-on":""}`}
        data-act="auto"
        aria-pressed=${D?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${D?op():sp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${me?" is-on":""}`}
        data-act="merge"
        aria-pressed=${me?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${me?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${ap()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${ip()}
      </button>`}function xe(Y){let D=Nh(Y);return D?c`<div class="mon2-deck__chips">
      ${D.orchestration?c`<span class="mon2-deck__chip" title=${D.orchestration.title}
            >오케 ${D.orchestration.text}</span
          >`:""}
      ${D.worker?c`<span class="mon2-deck__chip" title=${D.worker.title}
            >워커 ${D.worker.text}</span
          >`:""}
    </div>`:""}function ce(Y){let D=[];for(let[me,Ae]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let We=dl(Y,me);We>0&&D.push(`${Ae} ${We}`)}return D.join(" \xB7 ")}function _e(Y){let D=dl(Y,"running"),me=typeof Y.slots=="number"?Y.slots:1;return c`<div
      class=${`mon2-deck__tile${u===Y.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${Y.root_dir}
      aria-pressed=${u===Y.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${Y.root_dir}>${Y.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${me}\uAC1C \uC911 ${D}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${D}/${me}</span>
          ${se(D,me)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${Y.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${be(Y)}</div>
        <span class="mon2-deck__counts">${ce(Y)}</span>
        ${xe(Y)}
      </div>
    </div>`}function Te(Y){let D=t.doneItems?t.doneItems():[],me=t.rangeLabel?t.rangeLabel():"",Ae=cp(Array.isArray(D)?D:[]),We=pe=>Y.reduce((Fe,dt)=>Fe+dl(dt,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${me}`}
        >실행 ${We("running")} · 대기 ${We("queue")} · PR
        ${We("pr_wait")}${We("session_active")>0?` \xB7 \uC138\uC158 ${We("session_active")}`:""}
        · ${me} 완료
        ${Array.isArray(D)?D.length:0}</span
      >
      ${Ae===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${lp(me)}
                  >${Ae}</span
                >`:Ae.map(pe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${pe.provider}
                      title=${pe.tooltip}
                      >${pe.label}</span
                    >`)}
          </span>`}
    </div>`}function qe(){let Y=b();return Y.length===0?"":c`${Te(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(D=>_e(D))}
      </div>`}function ke(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function ee(){V(),ke(),d!==null&&!k(d)&&W(!0),st(qe(),r),m?.render()}function Ce(Y){let D=Y.target;if(!D||typeof D.closest!="function")return;let me=D.closest("[data-root-dir]");if(!me)return;let Ae=me.getAttribute("data-root-dir")||"",We=D.closest("[data-act]")?.getAttribute("data-act");if(We==="worker"){t.gotoWorkerTab?.(Ae);return}if(We==="auto"){Z("worker-automation-toggle",Ae,{on:F(Ae)?.auto_advance!==!0});return}if(We==="merge"){Z("worker-merge-auto-toggle",Ae,{on:F(Ae)?.auto_merge!==!0});return}if(We==="gear"){B(Ae);return}X(Ae)}function Ie(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let D=Y.target;if(!D||typeof D.closest!="function")return;let me=D.closest('[data-root-dir][role="button"]');!me||me!==D||(Y.preventDefault(),X(me.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ce),r.addEventListener("keydown",Ie),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",Ce),r.removeEventListener("keydown",Ie),i.removeEventListener("click",T),N(),st(c``,r),e.replaceChildren()}}}function dp(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));m&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var qh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ma="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Fh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",jh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",as="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Gs(e,t){return`${e}\0${t}`}function Bh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Uh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ys(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=Bh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,h]of s)for(let b of h)o.push({blocker:b,blockee:m});let a=Uh(e,t),i=new Map(r.map((m,h)=>[m,h])),l=r.slice(0,a).filter(m=>s.get(m).some(h=>Number(i.get(h))>Number(i.get(m)))),u=dp(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,a),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function pp(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ys(n,t)}function Wh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function zh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Hh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function pl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Gh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Gs(a,l));let r=new Map,s=new Map;for(let a of e){let i=Gs(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Gs(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Kh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Vh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ia(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function fl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Zs(e){let t=Hh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=zh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,m)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(pl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),m!==void 0&&r.add(Gs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let h=o(u);h!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Gs(u,d))}}function Qs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Gh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Wh(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function fp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Ks(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function _p(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function mp(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(Ia(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Vs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Pa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function _l(e,t,n){let r=Zs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:qh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Fh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${fl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:as}}if(e.kind==="chain"&&d===void 0)return{refused:as};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(k<0)return;let F=k>0?d.entries[k-1]:null,V=k+1<d.entries.length?d.entries[k+1]:null,Z=Ks(d,k),le=V!==null&&Ks(d,k+1);Z&&F!==null&&r.removeDep(e.bead_id,F.bead_id),le&&V!==null&&r.removeDep(V.bead_id,e.bead_id),(Z||le)&&F!==null&&V!==null&&r.addDep(V.bead_id,F.bead_id,u)},h=(k,F)=>{let V=n.cross_lanes.get(k),Z=V.entries.findIndex(be=>be.bead_id===e.bead_id),le=V.entries.filter(be=>be.bead_id!==e.bead_id),X=Math.max(0,Math.min(le.length,Z>=0&&F>Z?F-1:F)),B=-1;if(le.forEach((be,xe)=>{n.fixed_members.has(be.bead_id)&&(B=xe)}),X<=B){r.state.refusal=jh;return}let N=Z>=0?V.entries[Z]:d?.entries.find(be=>be.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Ys({status:V.status,entries:[...le.slice(0,X),N,...le.slice(X)]},n);let W=i.entries;if(Pa(W,V.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Vs(W)}}),V.status!=="confirmed")return;let T=W.findIndex(be=>be.bead_id===e.bead_id),M=T>0?W[T-1].bead_id:null,se=T+1<W.length?W[T+1].bead_id:null;if(M===null){se!==null&&r.addDep(se,e.bead_id,k);return}if(r.addDep(e.bead_id,M,k),se!==null&&(r.graph.get(se)||[]).includes(M)){let be=V.entries.findIndex(xe=>xe.bead_id===se);(r.laneCreated(se,M)||be>0&&V.entries[be-1].bead_id===M&&Ks(V,be))&&r.removeDep(se,M),r.addDep(se,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(..._p(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Vs(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Kh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Ia(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let F=n.parallel_rows,V=F[Math.max(0,Math.min(F.length,t.marker_index))];if(!(!!V&&V.bead_id===e.bead_id)&&Vh(n,e.root_dir)&&b!==void 0){let le=b>k?k:k-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Ia(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Ia(e.bead_id,e.root_dir,t.index,t.lane_id));return Qs(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function gp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ys(n,t);if(r.held)return{refused:Ma};let s=r.entries,o=Zs(t),a=[];fp(o,s,e),o.state.refusal===null&&mp(o,t,s,a);let i=Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Qs(o,t,i,a,{lane_id:e,correction:r})}function bp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries,o=Zs(t),a=[];fp(o,s,e),o.state.refusal===null&&mp(o,t,s,a);let i=Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return Qs(o,t,i,a,{lane_id:e,correction:r})}function hp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries;return Qs(Zs(t),t,Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}],[],{lane_id:e,correction:r})}function yp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Zs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Ks(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Qs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:_p(t,n,e,n.entries)})}function vp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Ks(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${fl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function wp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function kp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function ml(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${fl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Yh="\uC0AC\uC774\uD074";function $p(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=pl(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Yh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function xp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Ap={running:3,paused:2,failed:1};function Or(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Sp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Ep(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Or(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Or(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),m=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Ap[u.run_state],m=Ap[i];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var Tp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Xs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Da(e,t){let n=Tp.find(s=>s.step===e);if(!n)return null;let r=Tp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Cp(e){let t=Xs.findIndex(n=>n.step===e);return Xs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Lr(e){let t=Xs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Zh(e){let t=Xs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Xs.length}}function Na(e){let t=Zh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var bl=new Set(["queued","running","retry_pending","repairing"]),Rp=new Set(["failed","succeeded"]),Qh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Js={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Xh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Js.base_containment,child_sweep:Js.child_sweep,branch_cleanup:Js.branch_cleanup,parent_close:Js.parent_close};function Jh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ey(e,t,n){return!["verify","deploy"].includes(e.kind)||![...bl,...Rp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function ty(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function gl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Qh[s];if(!o)return null;let a=Da(n,`${r} ${o}`);return a?{...a,active:bl.has(s),failed:s==="failed"}:null}function ny(e){return!e||typeof e!="object"?null:Xh[e.step]||null}function eo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=ny(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Jh(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&ey(k,t,i)).sort(ty):[],u=a?l:[],d=u.find(k=>bl.has(k.state));if(d)return gl(d);if(s)return s.step==="repo_operations"&&l[0]?gl(l[0],!0):null;let m=u.find(k=>Rp.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return gl(m);if(r){let k=Da(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Js[e.cleanup_cursor]:null;if(!h)return null;let b=Da(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function qa(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ry="\uBBF8\uC801\uC7AC";function hl(e,t){let n=Lo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function Op(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=hl(o,{id:l,location_label:s.get(l)||ry}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function yl(e,t){return`${e}\0${t}`}function Lp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function vl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function to(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ip(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${to(s)})`,location_label:to(s),scope:null,same_lane_ahead:!1};let a=vl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function Mp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=yl(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=yl(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of h){let F=r.get(k);F&&F!==u&&!b.includes(F)&&b.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...s.get(m)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let m=n.get(d);o(d,i)&&m&&u.push(m)}u.length>0&&a.set(i,u)}return a}function Pp(e,t){return yl(e,t)}var Dp=1,no=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],kl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],is={show_blocked:!0,spec:"all"},Np={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function sy(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Or(r)||(n=typeof r.status=="string"?r.status:null);return n}function oy(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Or(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function ay(e,t){let{winners:n,resumed_from_ids:r}=Ep(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Rn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function qp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function jt(e){return e&&typeof e=="object"?e:{}}function iy(e,t,n){let r=jt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>yn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Fp(Rr(l,o),Rr(u,o)),m=Fp(fr(l,null),fr(u,null));return d||m?{orchestration:d,worker:m}:null}function Fp(e,t){return!e||t&&t.text===e.text?null:e}function jp(e,t){let n=vl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ly(e,t,n){let r=t.get(e);if(!r)return jp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return to(r)}function cy(e,t,n,r){let s=t.get(e);if(!s)return{label:jp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":to(s),title:""}}function uy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function dy(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function py(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Z,le)=>{let X=Z&&typeof Z.bead_id=="string"?Z.bead_id:"";if(X.length===0)return;let B=Z&&typeof Z.root_dir=="string"?Z.root_dir:"",N=n.get(X),W=N?N.state:void 0,T=W==="running"||W==="pr_wait"||W==="done",M=!N||W==="runnable",se=N&&N.lane==="parallel"&&typeof N.position=="number"?N.position-1:null,be=cy(X,n,r,t),xe=b.length>0?b[b.length-1].id:null,ce=m==="confirmed"&&xe!==null&&!(t.get(X)||[]).includes(xe);b.push({id:X,title:s.get(X)||X,root_dir:N?N.root_dir:B,workspace_name:N?N.workspace_name:o.get(B)||"",seq:le+1,location_label:be.label,location_title:be.title,draggable:!T,fixed:T,done:W==="done",unplaced:M,mismatch:ce,...se!==null?{queue_index:se}:{}})}),b.forEach((Z,le)=>{Z.seq=le+1});let k=b.length>0&&b.every(Z=>Z.done),F=b.filter(Z=>!Z.fixed&&a.armed_by_bead.get(Z.id)!==d).map(Z=>Z.id),V=dy(d,m,b,k,F,a);i.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(Z=>Z.mismatch||Z.unplaced),unlaunched:F,...V})}),i}function fy(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function _y(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:h}=fy(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:m})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=a.get(d);m?m.push(l):a.set(d,[l])}let i=(l,u,d)=>{let m=u.cards[0],h={id:m.id,title:m.title,location_label:ly(m.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=Ta(l[u].scope,l[d].scope);m.length!==0&&(i(l[u],l[d],m),i(l[d],l[u],m))}}function wl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Fa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function $l(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...is,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&no.some(R=>R.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&u.set(R.root_dir,R);let d=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);for(let R of r)R&&typeof R.root_dir=="string"&&d.set(R.root_dir,R.name||R.root_dir);let m=[],h=[],b=[],k=[],F=[],V=[],Z=new Map,le=new Map,X=new Map,B=new Map,N=new Map,W=new Map,T=new Map,M=new Set,se=new Map,be=new Map,xe=new Map;for(let R of r){if(!R||typeof R.root_dir!="string")continue;let ie=R.root_dir,Le=R.name||ie,Ne=u.get(ie),Ye=Ne&&typeof Ne.revision=="number"?Ne.revision:typeof R.revision=="number"?R.revision:0,nt=jt(R.attempts),mt=jt(R.bead_titles);for(let[A,U]of Object.entries(mt))typeof U=="string"&&U.length>0&&xe.set(A,U);let bt=jt(R.bead_times),oe=jt(R.pr_observations),te=jt(R.admission),je=jt(R.revise_parked),it=jt(R.merge_queue_state),He=jt(R.cleanup_failed),we=jt(R.discard_operations),ze=jt(R.bead_blocked_by);Object.hasOwn(R,"bead_scope")&&se.set(ie,jt(R.bead_scope));let lt=jt(R.bead_workflow),ut=jt(R.pr_activity),pt=Array.isArray(R.repo_operations)?R.repo_operations:[],Pt=Array.isArray(R.merge_queue)?R.merge_queue:[],Ht=new Set(Pt.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Ut=new Map(Pt.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),xt=Array.isArray(R.queue)?R.queue:[];for(let A of[...xt,...Array.isArray(R.pr_wait)?R.pr_wait:[]])A&&typeof A.bead_id=="string"&&typeof A.armed_by_lane=="string"&&A.armed_by_lane.length>0&&W.set(A.bead_id,A.armed_by_lane);for(let A of Array.isArray(R.disarmed_on_load)?R.disarmed_on_load:[])typeof A=="string"&&A.length>0&&M.add(A);let St=(Array.isArray(R.serial_lanes)?R.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),Qe=jt(R.lane_states),Pe=typeof R.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(R.serial_lane_count))):Math.min(5,St.length);X.set(ie,Pe),B.set(ie,xt.length);let P=new Map(St.map(A=>[A.id,A])),re=new Map;for(let A of St)for(let U of A.entries)U&&typeof U.bead_id=="string"&&re.set(U.bead_id,A.id);for(let[A,U]of Object.entries(ze))Array.isArray(U)&&N.set(A,U.filter(G=>typeof G=="string"&&G.length>0));let ye=Array.isArray(R.done)?R.done:[];for(let A of ye)A&&typeof A.bead_id=="string"&&V.push({id:A.bead_id,root_dir:ie,workspace_name:Le});let S=new Map;for(let A of ye)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&S.set(A.bead_id,A.added_at);let H=A=>({id:A,title:mt[A]||A,root_dir:ie,workspace_name:Le,expected_revision:Ye,draggable:!1,...jt(bt[A]).created_at?{created_at:jt(bt[A]).created_at}:{},...jt(bt[A]).updated_at?{updated_at:jt(bt[A]).updated_at}:{}}),Oe=A=>Object.hasOwn(ze,A)?{blocked_by:Array.isArray(ze[A])?ze[A].filter(U=>typeof U=="string"&&U.length>0):[]}:{},x=new Set;for(let[A,U]of ay(nt,S)){x.add(A);let G=U.run_state==="failed"?uy(nt,U.attempt_id):null;G!==null&&T.set(A,G),h.push({...H(A),lane:"running",...Oe(A),...re.has(A)?{serial_lane_id:re.get(A)}:{},attempt_id:U.attempt_id,run_state:U.run_state,status:U.status||void 0,workflow:lt[A]||null,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,last_activity:U.last_activity,legs:U.legs,runner:U.runner,model:U.model,effort:U.effort,speed:U.speed,resumed_from:U.resumed_from,continuation_mode:U.continuation_mode,usage:U.usage,exec_chips:{orchestration:Hs(U),worker:null},discard:Fn(we,A,{attempt_id:U.attempt_id}),badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"})}for(let[A,U]of Sp(nt)){if(h.some(Be=>Be.id===A))continue;let G=U.attempt,Ve=U.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(A),lane:"running",kind:"session",...Oe(A),attempt_id:typeof G.attempt_id=="string"?G.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:lt[A]||null,can_pause:!1,can_resume:!1,started_at:U.started_at,last_event_at:typeof G.last_event_at=="number"?G.last_event_at:null,last_activity:G.last_activity&&typeof G.last_activity=="object"?G.last_activity:null,legs:Array.isArray(G.legs)?G.legs:[],runner:typeof G.runner=="string"?G.runner:null,model:typeof G.model=="string"?G.model:null,effort:typeof G.effort=="string"?G.effort:null,speed:typeof G.speed=="string"?G.speed:null,resumed_from:null,continuation_mode:null,usage:G.usage&&typeof G.usage=="object"?G.usage:null,exec_chips:{orchestration:Hs(G),worker:null},discard:Fn(we,A,{merge_queued:!0}),badges:[U.origin==="auto"?`${Ve} \xB7 \uC790\uB3D9`:Ve],alert:!1})}for(let A of Array.isArray(R.session_active)?R.session_active:[]){let U=A&&A.bead_id;typeof U!="string"||x.has(U)||(x.add(U),Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&N.set(U,A.blocked_by.filter(G=>typeof G=="string"&&G.length>0)),typeof A.title=="string"&&A.title.length>0&&xe.set(U,A.title),h.push({...H(U),title:A.title||mt[U]||U,lane:"running",kind:"session",status:"in_progress",started_at:wl(A.started_at)??wl(A.updated_at)??void 0,updated_at:wl(A.updated_at)??void 0,workflow:A.workflow||null,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(G=>typeof G=="string"&&G.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(A.session_refs)?A.session_refs:[],badges:[],alert:!1}))}for(let A of Array.isArray(R.pr_wait)?R.pr_wait:[]){let U=A&&A.bead_id;if(typeof U!="string"||x.has(U))continue;x.add(U);let G=jt(oe[U]),Ve=jt(G.pr),Be=G.gate?jt(G.gate):null,ge=Ht.has(U),Et=Ut.get(U)?.continuation_action||null,ht=!!Et&&Et.continuation===null,kt=it.active===U,Vt=A.external===!0,Tt=He[U]||null,on=jt(ut[U]),Jt=eo({bead_id:U,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:on.merge_progress||null,cleanup_failed:Tt,repo_operations:pt}),en=qa(Jt),Gt=!!Be&&Be.base_badge==="\uCDA9\uB3CC",tn=!!Tt&&["child_sweep","branch_cleanup","parent_close"].includes(Tt.step)&&!!Be&&Be.tier==="merged",an=Vt&&!!Tt&&!!Be&&Be.tier==="merged",wn=!!Be&&["closed_unmerged","review","undecidable"].includes(Be.tier)&&Be.reason!=="review_receipt_undetermined",Se=Fn(we,U,{external:Vt,merge_active:kt||Jt?.step==="merge",merge_queued:ge,cleanup_active:en,merged:!!Tt||Be?.tier==="merged"}),De=!!Se.operation;b.push({...H(U),lane:"pr_wait",...Oe(U),workflow:lt[U]||null,pr_number:typeof Ve.number=="number"?Ve.number:null,pr_url:typeof Ve.url=="string"?Ve.url:void 0,external:Vt,usage:Rn(nt,U),merge_step:Jt,badges:ht?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Jt?[Be?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Tt?[Lr(Tt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(Tt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Be?.gate_badge=="string"&&Be.gate_badge.length>0?[Be.gate_badge]:[],alert:Jt?Jt.failed===!0:!!Tt||wn,reason:Tt&&Jt?.active!==!0?Na(Tt.step):"PR \uB300\uAE30",merge_action:Be?.tier==="merged"&&!tn&&!an?!1:!ge||ht,merge_enabled:!De&&(ht||Be?.enabled===!0||Gt||tn||an),merge_label:ht?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":an||tn?"\uC815\uB9AC \uC7AC\uAC1C":Gt&&!tn?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ht?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":De?Se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:an?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":tn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Gt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Be?.enabled===!0?`\uBA38\uC9C0 (${Be.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Be?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge&&!ht,cancel_enabled:!kt,continuation_mismatch:Et?.mismatch||null,discard:Se,discard_action:Se.action,discard_enabled:Se.enabled,discard_title:Se.title})}let L=(A,U,G,Ve)=>{let Be=A&&A.bead_id;if(typeof Be!="string"||x.has(Be))return null;x.add(Be);let ge=je[Be],Et=Fn(we,Be),ht=Et.operation?Et:null,kt={...H(Be),lane:U,workflow:lt[Be]||null,draggable:!ht,discard:ht||void 0,reason:qp(te,Be),seq:G+1,queue_position:G+1,queue_index:G,queue_length:Ve,badges:ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ge,revise_action:!!ge,revise_enabled:!!ge&&!ht,revise_title:ge?ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Vt=Oe(Be);return Object.hasOwn(Vt,"blocked_by")&&(kt.blocked_by=Vt.blocked_by),kt};for(let A=0;A<xt.length;A++){let U=L(xt[A],"queue",A,xt.length);if(!U)continue;k.push(U);let G=Z.get(ie);G?G.push(U):Z.set(ie,[U])}let ne=A=>{let U=b.find(ge=>ge.id===A&&ge.root_dir===ie);if(U)return{id:A,title:U.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let G=h.find(ge=>ge.id===A&&ge.root_dir===ie),Ve=G?G.run_state:sy(nt,A),Be=Ve==="failed"||Ve==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ve==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:A,title:G?G.title:H(A).title,badge:Be}},fe=[];for(let A=0;A<Math.max(Pe,St.length);A++){let U=`s${A+1}`,G=P.get(U),Ve=G&&Array.isArray(G.entries)?G.entries:[],Be=jt(Qe[U]),ge=Array.isArray(Be.occupied_by)?Be.occupied_by.filter(kt=>typeof kt=="string"):[],Et=new Set(ge),ht=[];for(let kt=0;kt<Ve.length;kt++){let Vt=Ve[kt]&&Ve[kt].bead_id;if(typeof Vt=="string"&&Et.has(Vt)){x.add(Vt);continue}let Tt=L(Ve[kt],U,kt,Ve.length);Tt&&(ht.push(Tt),k.push(Tt))}ht.length===0&&ge.length===0&&(Pe<=1||A>=Pe)||fe.push({id:U,index:A,items:ht,raw_length:Ve.length,occupied_by:ge,occupants:ge.map(kt=>ne(kt)),corrections:Array.isArray(Be.corrections)?Be.corrections.length:0,cycle:Be.cycle===!0,...ht.length===0&&ge.length===0?{empty:!0}:{}})}le.set(ie,fe);let Ee=Array.from({length:Pe},(A,U)=>{let G=`s${U+1}`,Ve=P.get(G),Be=Ve&&Array.isArray(Ve.entries)?Ve.entries:[],ge=jt(Qe[G]);return{id:G,index:Be.length,length:Be.length,occupied_by:Array.isArray(ge.occupied_by)?ge.occupied_by.filter(Et=>typeof Et=="string"):[]}});for(let A of Array.isArray(R.runnable)?R.runnable:[]){let U=A&&A.bead_id;if(typeof U!="string"||x.has(U))continue;x.add(U);let G=A.workflow&&typeof A.workflow=="object"?A.workflow:null,Ve=G&&typeof G.route=="string"&&G.route||(typeof A.route=="string"?A.route:null),Be=iy(jt(Ne),A.exec_pins,Ve);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&N.set(U,A.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)),typeof A.title=="string"&&A.title.length>0&&xe.set(U,A.title),Array.isArray(A.scope)&&be.set(U,A.scope.filter(ge=>typeof ge=="string"&&ge.length>0)),m.push({...H(U),title:A.title||mt[U]||U,lane:"runnable",draggable:!0,reason:qp(te,U),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",published:A.published===!0,workflow:G||(Ve?{route:Ve,chips:{route:Ve}}:null),...Be?{exec_chips:Be}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(ge=>typeof ge=="string"&&ge.length>0)}:{},place_index:xt.length,place_lanes:Ee})}for(let A of ye){let U=A&&A.bead_id;if(typeof U!="string"||x.has(U)||(x.add(U),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let G=oy(nt,U),Ve=G&&typeof G.done_kind=="string"?G.done_kind:null;F.push({...H(U),lane:"done",done:!0,done_layout:"three_line",usage:Rn(nt,U),work_ms:ha(nt,U),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Ve,badges:[...Ve&&Np[Ve]?[Np[Ve]]:[],...ba(nt,U)]})}}let ce=new Map;s.forEach((R,ie)=>{R&&typeof R.root_dir=="string"&&ce.set(R.root_dir,ie)});let _e=n&&n.running_sort==="repo"?"repo":"started";h.sort((R,ie)=>{let Le=R.kind==="session",Ne=ie.kind==="session";if(Le!==Ne)return Le?1:-1;if(Le&&Ne){let mt=Fa(ie.updated_at)-Fa(R.updated_at);return mt!==0?mt:R.id.localeCompare(ie.id)}if(_e==="repo"){let mt=ce.get(R.root_dir)??Number.MAX_SAFE_INTEGER,bt=ce.get(ie.root_dir)??Number.MAX_SAFE_INTEGER;if(mt!==bt)return mt-bt}let Ye=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,nt=typeof ie.started_at=="number"&&Number.isFinite(ie.started_at)?ie.started_at:null;return Ye!==null&&nt!==null&&Ye!==nt?Ye-nt:Ye===null&&nt!==null?1:Ye!==null&&nt===null?-1:R.id.localeCompare(ie.id)}),F.sort((R,ie)=>(ie.done_at??0)-(R.done_at??0));let Te=s.length>0?s:r.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),qe=new Set(m.map(R=>R.root_dir)),ke=[];for(let R of Te){if(!R||typeof R.root_dir!="string")continue;let ie=Z.get(R.root_dir)||[],Le=le.get(R.root_dir)||[];!(ie.length>0||Le.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0))&&!qe.has(R.root_dir)||ke.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=Dp?R.slots:Dp,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:jt(R.runner_catalog),items:ie,sublanes:{parallel:ie,serial:Le},serial_lane_count:X.get(R.root_dir)||0,raw_queue_length:B.get(R.root_dir)||0})}let ee={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:ke,running:h,pr_wait:b,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Ce=Lp(ee);for(let R of V)Ce.has(R.id)||Ce.set(R.id,{root_dir:R.root_dir,workspace_name:R.workspace_name,lane:"done",state:"done"});for(let R of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){if(!Object.hasOwn(R,"blocked_by"))continue;let ie=Ce.get(R.id);R.blockers=(R.blocked_by||[]).map(Le=>Ip(Le,ie,Ce,s))}for(let R of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let ie=(R.blockers||[]).map(Ne=>({...hl(R.id,Ne),openable:!0}));if(ie.length===0)continue;let Le={predecessors:ie};R.dependency_chips=Le}_y(ee,se,be,Ce,s);let Ie=Mp(ee.queue_groups);for(let R of ee.queue_groups)for(let ie of R.sublanes.serial){let Le=Ie.get(Pp(R.root_dir,ie.id));Le&&(ie.cross_wait_peers=Le)}ee.chain_lanes=py(i&&Array.isArray(i.lanes)?i.lanes:[],N,Ce,s,xe,d,{armed_by_bead:W,failed_by_bead:T,disarmed_lanes:M});let Y=new Map;for(let R of[...ee.queue,...ee.runnable])Y.has(R.id)||Y.set(R.id,R);let D=new Set;for(let R of ee.chain_lanes)for(let ie of R.rows){if(R.status==="confirmed"&&!ie.unplaced&&!ie.fixed&&D.add(ie.id),!R.draft&&!ie.unplaced)continue;let Le=Y.get(ie.id);Le&&(Le.cross_lane_chip={lane_id:R.lane_id,number:R.number,status:R.status,label:R.draft?`\uC5F0\uACB0 ${R.number} (draft)`:`\uC5F0\uACB0 ${R.number}`})}let me=new Map(ee.chain_lanes.map(R=>[R.lane_id,R.number]));for(let R of[...ee.queue,...ee.running]){let ie=W.get(R.id);if(typeof ie!="string"||ie.length===0)continue;let Le=me.get(ie);R.armed_lane_chip=Le===void 0?{lane_id:ie,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ie,label:`\u25B6 \uC5F0\uACB0 ${Le}`,orphan:!1}}let Ae=[];for(let R of Z.values())for(let ie of R)D.has(ie.id)||Ae.push(ie);Ae.sort((R,ie)=>{let Le=R.workspace_name.localeCompare(ie.workspace_name);return Le!==0?Le:(R.queue_index??0)-(ie.queue_index??0)}),ee.parallel_rows=Ae;let We={};for(let[R,ie]of Ce)typeof ie.root_dir=="string"&&ie.root_dir.length>0&&(We[R]=ie.root_dir);for(let R of ee.chain_lanes)for(let ie of R.rows)!Object.hasOwn(We,ie.id)&&ie.root_dir.length>0&&d.has(ie.root_dir)&&(We[ie.id]=ie.root_dir);ee.owner_of=We;let pe=ee.runnable.length;ee.runnable_all=ee.runnable.slice();let Fe=ee.runnable;a.show_blocked||(Fe=Fe.filter(R=>R.blocked!==!0));let dt=Fe.length;a.spec==="with"?Fe=Fe.filter(R=>R.published===!0):a.spec==="without"&&(Fe=Fe.filter(R=>R.published!==!0)),ee.runnable_hidden={blocked:pe-dt,spec:dt-Fe.length};let at=(R,ie)=>{let Le=Fa(ie.updated_at)-Fa(R.updated_at);return Le!==0?Le:R.id.localeCompare(ie.id)},ct=l==="repo_spec"?(R,ie)=>{let Le=R.published===!0?0:1,Ne=ie.published===!0?0:1;return Le!==Ne?Le-Ne:at(R,ie)}:at;if(l==="updated_flat")ee.runnable=Fe.slice().sort(at),ee.runnable_sections=[];else{let R=new Map;for(let Ne of Fe){let Ye=R.get(Ne.root_dir);Ye?Ye.push(Ne):R.set(Ne.root_dir,[Ne])}let ie=[],Le=[];for(let Ne of Te){if(!Ne||typeof Ne.root_dir!="string")continue;let Ye=(R.get(Ne.root_dir)||[]).slice().sort(ct);R.delete(Ne.root_dir),Ye.length!==0&&(ie.push({root_dir:Ne.root_dir,name:Ne.name||Ne.root_dir,items:Ye.map(nt=>({...nt,workspace_name:""}))}),Le.push(...Ye))}for(let[Ne,Ye]of R){let nt=Ye.slice().sort(ct);ie.push({root_dir:Ne,name:nt[0]?.workspace_name||Ne,items:nt.map(mt=>({...mt,workspace_name:""}))}),Le.push(...nt)}ee.runnable=Le,ee.runnable_sections=ie}return ee}var Bp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",my=1e4;function Up(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Wp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Kp="bdui.monitor.done-range",Vp="bdui.monitor.running_sort",Yp="bdui.monitor.candidate_sort",Zp="beads-ui.monitor.candidate-filter",Qp="beads-ui.monitor.sections";function gy(){try{let e=window.localStorage.getItem(Zp);if(!e)return{...is};let t=JSON.parse(e);return!t||typeof t!="object"?{...is}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:is.show_blocked,spec:kl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...is}}}function zp(e){try{window.localStorage.setItem(Zp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function by(){try{let e=window.localStorage.getItem(Yp);return no.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function hy(e){try{window.localStorage.setItem(Yp,e)}catch{}}function yy(){try{let e=window.localStorage.getItem(Qp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function vy(e){try{window.localStorage.setItem(Qp,JSON.stringify(e))}catch{}}function wy(){try{let e=window.localStorage.getItem(Kp);return e===null?"today":Un(e)}catch{return"today"}}function ky(e){try{window.localStorage.setItem(Kp,e)}catch{}}function $y(){try{return window.localStorage.getItem(Vp)==="repo"?"repo":"started"}catch{return"started"}}function xy(e){try{window.localStorage.setItem(Vp,e)}catch{}}var Xp="tab:monitor:pipeline",Ay=1e3,Hp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Sy=["queue","runnable","done"],Gp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ey(e){return e>=1&&e<=Gp.length?Gp[e-1]:`(${e})`}function Jp(e,t){let n=Bt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=wy(),b=$y(),k=gy(),F=by(),V=yy(),Z=ma("beads-ui.monitor.lane-collapsed"),le=!1,X=null,B=null,N=null,W=null,T=null,M=[],se=null,be=null,xe=null,ce=null;function _e(p){return ce===null&&(ce=Se()),pp(p,ce)}function Te(p,g){qe(),!(g<=0)&&(be={lane_id:p,corrected:g},xe=setTimeout(()=>{xe=null,be=null,G()},my))}function qe(){xe!==null&&(clearTimeout(xe),xe=null),be=null}function ke(){let p=Br.find(g=>g.value===h);return p?p.label:""}let ee=document.createElement("div");ee.className="mon",e.appendChild(ee);let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let Ie=document.createElement("div");Ie.className="worker-drawer-overlay__backdrop";let Y=document.createElement("div");Y.className="worker-drawer-host mon2-drawer",Ce.append(Ie,Y),e.appendChild(Ce);let D=$l(null,null),me=new Map,Ae=new Map,We=null,pe=null,Fe=null,dt=ts(Y,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,Ce.hidden=!0,G()}});async function at(p,g,v,$,j=!0){if(!o||!v)return null;let z=await o(p,{...g,root_dir:v,expected_revision:$});if(z&&z.conflict&&j){z.queue&&Ae.set(v,z.queue);let ae=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$;z=await o(p,{...g,root_dir:v,expected_revision:ae})}return z&&z.queue&&v&&Ae.set(v,z.queue),z}function $t(p,g){let v=Ae.get(p),$=s&&s.get?s.get():null,j=(Array.isArray($)?$:[]).find(ae=>ae?.root_dir===p);return(v||j)?.merge_queue?.find(ae=>ae.bead_id===g)?.continuation_action}async function ct(p,g,v,$){let j=await at(p,g,v,$),z=Ae.get(v)?.revision??j?.queue?.revision??$;return Jn(j,(ae,ve)=>at(p,{...g,continuation:ae,decision_token:ve},v,z,!1),{refresh:ae=>at(p,g,v,ae?.queue?.revision??Ae.get(v)?.revision??z,!1)})}async function R(p,g,v,$){let j=await Jn({continuation_mismatch:$},(ae,ve)=>at("worker-merge-queue-add",{bead_id:g,continuation:ae,decision_token:ve},p,v,!1)),z=j?.queue?.merge_queue?.find(ae=>ae.bead_id===g)?.continuation_action;j?.applied!==!0&&z?.continuation===null&&z.mismatch&&await R(p,g,j.queue.revision,z.mismatch)}async function ie(p,g,v){let $=await at("worker-discard",p,g,v);if($&&$.discarded===!0){ue(va($),"success",5e3);return}if($&&$.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Le(p,g,v){return!o||!v?null:await o(p,{...g,root_dir:v})}async function Ne(){let p=new Map;for(let g of D.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,v]of p)await at("worker-merge-queue-add-all",{},g,v)}function Ye(p){let g=V[p];return!!(g&&g.runnable===!0)}function nt(p){let g={...V[p]||{}};g.runnable=!g.runnable,V={...V,[p]:g},vy(V),G()}function mt(p){Z.toggle(p),G()}function bt(p){Z.toggleArea(p),G()}function oe(p){let g=D.queue_groups.find(v=>v.root_dir===p);if(!g)return null;for(let v=0;v<g.serial_lane_count;v+=1){let $=`s${v+1}`,j=g.sublanes.serial.find(z=>z.id===$);if(!j||j.raw_length===0&&j.occupied_by.length===0)return $}return null}function te(p,g){let v=D.queue_groups.find(j=>j.root_dir===p),$=v?v.sublanes.serial.find(j=>j.id===g):void 0;return $?$.raw_length:0}function je(p,g){let v=me.get(p),$=me.get(g);if(!v||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let j=Up(v),z=Up($);if(j!==null&&j===z&&v.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let ae=Wp(v),ve=Wp($);if(ae&&z!==null){let Ze=z;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:p,lane:Ze,index:te($.root_dir,Ze)}]}}if(j!==null&&ve&&z===null){let Ze=j;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:te(v.root_dir,Ze)}]}}if(ae&&j===null&&ve&&z===null){let Ze=oe(v.root_dir);return Ze===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ze} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:0},{bead_id:p,lane:Ze,index:1}]}}return!ae&&!ve?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:ae?{kind:"note",text:`${zs($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function it(p,g){let v=je(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Bp,title:v.title}:{kind:"place",label:Bp,title:v.title}}}function He(p,g){if(!W||W.bead_id!==p)return null;let v=W.counterpart_id,$=g.filter(j=>j.id===v);return $.length===0?null:{rows:$.map(j=>it(p,j))}}function we(p){let g=p.dependency_chips||null,v=p.overlap_chips||[],$=p.scope_state==="missing",j=p.cross_lane_chip,z=p.armed_lane_chip;if(!g&&v.length===0&&!$&&!j&&!z)return null;let ae=He(p.id,v);return{...g||{},...v.length>0?{overlaps:v}:{},...$?{scope_missing:!0}:{},...j?{cross_lane:{lane_id:j.lane_id,label:j.label}}:{},...z?{armed_lane:z}:{},...ae?{popover:ae}:{}}}function ze(p){let g=we(p);return g?{...p,dependency_chips:g}:p}async function lt(p,g){let v=je(p,g);if(W=null,v.kind!=="ops"){G();return}let $=O(v.root_dir,v.ops[0].bead_id);for(let j of v.ops){let z=await ut(j,v.root_dir,$);if(z===null)break;$=z}G()}async function ut(p,g,v){try{let $=await at("worker-queue-place",p,g,v,!1);if($&&$.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ue($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let j=$.queue?$.queue.revision:void 0;return typeof j!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):j}catch($){return ue(Tt($),"error"),null}}function pt(p){let g=Ye(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
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
    </header>`}function Pt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function Ht(p){if(N!==p.id)return null;let g=D.queue_groups.find(z=>z.root_dir===p.root_dir),v=p.place_lanes||[],$=D.cross_lanes_revision!==null,j=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let z of D.chain_lanes)j.push({id:`lane:${z.lane_id}`,label:`\uC5F0\uACB0 ${z.number} (${z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});j.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let z of v)j.push({id:`serial:${z.id}`,label:`\uC9C1\uB82C ${Number(z.id.slice(1))}`,count:z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:j}}function Ut(){let p=[],g=new Set,v=($,j)=>{for(let z of $)g.has(z.id)||(g.add(z.id),p.push({bead_id:z.id,root_dir:z.root_dir,workspace_name:z.workspace_name,title:z.title,lane:j}))};return v(D.running,"running"),v(D.pr_wait,"pr_wait"),v(D.queue,"queue"),v(D.runnable_all,"runnable"),p}function xt(p){if(!T||T.bead_id!==p)return"";let g=tn(),v=Ut(),$=new Map;for(let ve of v)$.set(ve.bead_id,ve);let j=(g.get(p)||[]).filter(ve=>$.has(ve)),z=xp($p(p,{issues:v,blocked_by_map:g}),T.query),ae=D.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${j.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${j.map(ve=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${ve}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${ve}
                aria-label=${`${ve} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${T.query}
      />
      <div class="mon-deppanel__list">
        ${z.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:z.map(ve=>c`<button
                  type="button"
                  class="mon-deppanel__cand${ve.disabled?" is-disabled":""}"
                  data-dep-cand=${ve.bead_id}
                  ?disabled=${ve.disabled}
                  title=${ve.reason||ve.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${ve.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${ve.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${ve.title}</span
                  >${ve.reason?c`<span class="mon-deppanel__cand-reason"
                        >${ve.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${ae===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function St(p){return Pt(p,c`${sl(ze(p),Ht(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(g,v)=>i(v,p.root_dir):void 0})}${xt(p.id)}`)}function Qe(){return D.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${D.runnable.map(p=>St(p))}
      </div>`:c`${D.runnable_sections.map(p=>{let g=Ye(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${pt({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(v=>St(v))}
            </div>`}
      </section>`})}`}function Pe(p,g=!1){return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="mon-dep__btn"
        data-bead-id=${p.id}
        title="의존성"
        aria-label="의존성"
      >
        ⛓
      </button>
      ${g?c`<button
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
    </span>`}function P(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${jn(ze(p),{actions:Pe(p,!0)})}
      ${xt(p.id)}
    </div>`}function re(p,g,v,$){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Ey(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ye(p){let g=D.cross_lanes_revision!==null,v=_e(p.lane_id),$=v?.held===!0,j=v?.cycle===!0,z=v?v.mismatched:[],ae=be&&be.lane_id===p.lane_id?be.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${ae>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ae}건 자동 교정</span
            >`:""}
        ${j?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ma}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!g||!p.can_confirm||$}
              title=${$?Ma:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!g}
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
            </div>`:p.rows.map((ve,Ze)=>re(p,ve,Ze,z))}
      </div>
    </div>`}function S(p,g,v){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${v}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${jn(ze(g),{actions:Pe(g)})}
      ${xt(g.id)}
    </div>`}function H(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function Oe(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${jn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function x(p,g){let v=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...v.map(j=>Oe(j)),...g.items.map((j,z)=>S(g,j,z))],count:g.items.length,empty:g.empty===!0,...v.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${v.map(j=>`${j.id} \u2014 ${j.badge}`).join(`
`)}
              >${H(v)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(j=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${j.workspace_name}·${j.lane}과 교차 대기
                </div>`)}`}:{}}}function L(){let p=D.cross_lanes_revision!==null,g=D.chain_lanes.some(v=>v.draft&&v.rows.length===0);return Aa({parallel:{rows:D.parallel_rows.map((v,$)=>P(v,$)),count:D.parallel_rows.length,collapsed:Z.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:D.queue_groups.flatMap(v=>v.sublanes.serial.map($=>({...x(v,$),drop:{drop:"repo-serial",root_dir:v.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Z.isAreaCollapsed("serial"),extra_panes:D.chain_lanes.map(v=>ye(v)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!p}
          title=${p?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...D.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ne(p){return c`<div class="worker-rungrid">
      ${D.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:D.running.map(g=>ll({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,B,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:we(g)}}))}
    </div>`}function fe(p){let g={runnable:D.runnable,queue:D.queue,running:D.running,pr_wait:D.pr_wait,done:D.done},v=$=>{let j=g[$.lane],z=$.lane==="runnable"?D.runnable_flat?j.length>0?Qe():void 0:D.runnable_sections.length>0?Qe():void 0:$.lane==="queue"?D.queue_groups.length>0||D.chain_lanes.length>0||D.parallel_rows.length>0||D.cross_lanes_unreadable?L():void 0:$.lane==="running"?ne(p):j.length>0?c`${j.map(ae=>jn(ae))}`:void 0;return Kn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:j,count:j.length,src:$.lane==="runnable",empty:$.empty,body:z,live:$.lane==="running"&&j.length>0,collapsible:!0,collapsed:Z.isCollapsed($.pane),controls:$.lane==="runnable"?Ee():void 0,header_control:A($.lane,j.length)})};if(le){let $=Sy.map(j=>Hp.find(z=>z.lane===j)).filter(j=>j!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Sa({live:D.running.length>0,running_body:D.running.length>0?ne(p):"",pr_wait_rows:D.pr_wait.map(j=>jn(j)),count:D.running.length+D.pr_wait.length})}
            ${$.map(j=>v(j))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Hp.map($=>v($))}
        </div>
      </div>`}function Ee(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${D.runnable_hidden.blocked>0?` ${D.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${kl.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${D.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${D.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function A(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${no.map(v=>c`<option
              value=${v.value}
              ?selected=${F===v.value}
            >
              ${v.label}
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
      </select>`:p==="pr_wait"&&g>0?c`<button
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
        ${Br.map(v=>c`<option value=${v.value} ?selected=${h===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function U(p){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,j={done_since:$r(h,d()),running_sort:b,candidate_filter:k,candidate_sort:F};return $!==void 0&&(j.cross_lanes=$),$l(g,v,j)}function G(){let p=d();D=U(),ce=null,me=new Map;for(let g of[...D.runnable,...D.queue,...D.running,...D.pr_wait,...D.done])!g.non_occupying&&!me.has(g.id)&&me.set(g.id,g);st(fe(p),ee),Be()?.render(),Ve(),ge()}function Ve(){let p=new Map;for(let g of D.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(ee.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let v=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=p.get(v);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Be(){if(Fe)return Fe;let p=ee.querySelector(".mon2-deck");return p?(Fe=up(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>D.done,rangeLabel:ke,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:ht,onFocusChange:g=>{se=g,ge()}}),Fe):null}function ge(){ee.classList.toggle("has-focus",se!==null);for(let p of Array.from(ee.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",se!==null&&p.getAttribute("data-root-dir")===se);for(let p of Array.from(ee.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=me.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",se!==null&&!!g&&g.root_dir===se)}for(let p of Array.from(ee.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",se!==null&&p.getAttribute("data-root-dir")===se)}function Et(p,g){let v=a?a():void 0;if(!g||!v||g===v||!l){r(p);return}l(g).then(()=>{r(p)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function ht(p){if(!p)return;let g=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===p){v();return}l(p).then(v).catch($=>{n("workspace switch for %s failed: %o",p,$),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function kt(p){Sn(p).then(g=>{ue(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Vt(p){let g=me.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function Tt(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function on(p,g,v){let $=D.owner_of[g];if(typeof $!="string"||$.length===0){ue(`${g}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Le(p,{a:g,b:v},$),await Jt(p,g,v)}catch(j){ue(Tt(j),"error")}G()}async function Jt(p,g,v){if(p!=="dep-add")return;let $=D.chain_lanes.find(j=>j.rows.some(z=>z.id===g));!$||!$.rows.some(j=>j.id===v)||await Nt(j=>hp($.lane_id,j),"",[{type:p,a:g,b:v}])}function en(p){return D.runnable.some(g=>g.id===p)||D.parallel_rows.some(g=>g.id===p)?!0:D.queue_groups.some(g=>g.sublanes.serial.some(v=>v.items.some($=>$.id===p)))}function Gt(p){!p||!en(p)||(T=T&&T.bead_id===p?null:{bead_id:p,query:""},G())}function tn(){let p=new Map,g=s&&s.get?s.get():null,v=$=>Array.isArray($)?$.filter(j=>typeof j=="string"&&j.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let j=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[z,ae]of Object.entries(j))Array.isArray(ae)&&p.set(z,v(ae));for(let z of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&z.blocked_by.length>0&&p.set(z.bead_id,v(z.blocked_by))}return p}function an(){let p=new Map,g=new Map,v=s&&s.get?s.get():null,$=j=>Array.isArray(j)?j.filter(z=>typeof z=="string"&&z.length>0):[];for(let j of Array.isArray(v)?v:[]){if(!j||typeof j!="object")continue;let z=j.bead_blocked_by&&typeof j.bead_blocked_by=="object"?j.bead_blocked_by:{};for(let[ae,ve]of Object.entries(z))Array.isArray(ve)&&p.set(ae,$(ve));for(let ae of Array.isArray(j.runnable)?j.runnable:[])ae&&typeof ae.bead_id=="string"&&Array.isArray(ae.blocked_by)&&g.set(ae.bead_id,$(ae.blocked_by))}for(let j of M)for(let z of[p,g]){let ae=z.get(j.a);ae!==void 0&&z.set(j.a,j.type==="dep-remove"?ae.filter(ve=>ve!==j.b):ae.includes(j.b)?ae:[...ae,j.b])}return{snapshot:p,runnable:g}}function wn(){let p=tn();for(let g of M){let v=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,v.filter($=>$!==g.b)):v.includes(g.b)||p.set(g.a,[...v,g.b])}return p}function Se(p=D,g=De()){let v=new Map;for(let ot of Array.isArray(g?.lanes)?g.lanes:[]){let Xt=new Map;for(let Rt of Array.isArray(ot?.entries)?ot.entries:[])Rt&&typeof Rt.bead_id=="string"&&Xt.set(Rt.bead_id,Rt.dep_created_by_lane===!0);v.set(typeof ot?.id=="string"?ot.id:"",Xt)}let $=new Map,j=new Map,z=new Set,ae=new Set;for(let ot of p.chain_lanes){let Xt=v.get(ot.lane_id);$.set(ot.lane_id,{status:ot.status,entries:ot.rows.map((Rt,Yn)=>({bead_id:Rt.id,root_dir:Rt.root_dir,...Yn===0?{}:{dep_created_by_lane:Xt?.get(Rt.id)===!0}}))});for(let Rt of ot.rows)j.set(Rt.id,ot.lane_id),Rt.fixed&&z.add(Rt.id),Rt.unplaced||ae.add(Rt.id)}let ve=new Map;for(let ot of p.parallel_rows)typeof ot.queue_index=="number"&&ve.set(ot.id,ot.queue_index);for(let ot of p.queue_groups)for(let Xt of ot.sublanes.serial)for(let Rt of Xt.items)typeof Rt.queue_index=="number"&&ve.set(Rt.id,Rt.queue_index);let Ze=an();return{blocked_by_map:wn(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:$,owner_lane_of:j,fixed_members:z,placed_members:ae,parallel_rows:p.parallel_rows.map(ot=>({bead_id:ot.id,root_dir:ot.root_dir,queue_index:ot.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:ve}}function De(){return(s&&s.crossLanes?s.crossLanes():null)??null}function O(p,g){let v=me.get(g);if(v&&v.root_dir===p)return v.expected_revision;let $=D.queue_groups.find(j=>j.root_dir===p);return $?$.revision:0}async function he(p,g,v){if(p.type==="worker-queue-disarm"){try{let $=await at(p.type,p.payload,p.root_dir,v.get(p.root_dir)??O(p.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&v.set(p.root_dir,$.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await Me(p.type,p.payload,p.root_dir,v,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await Le(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch($){return ue(Tt($),"error"),!1}}async function Me(p,g,v,$,j){try{let z=await at(p,g,v,$.get(v)??O(v,j.bead_id));return!z||typeof z.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(z.queue&&typeof z.queue.revision=="number"&&$.set(v,z.queue.revision),z.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):z.applied===!1?(ue(z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$.get(v)??0)}catch(z){return ue(Tt(z),"error"),null}}function yt(p){(p.type==="dep-add"||p.type==="dep-remove")&&(M=[...M,{type:p.type,a:p.a,b:p.b}])}async function Dt(p,g){if(!o)return{ok:!1};try{let v=await o(p.type,{...p.payload,expected_revision:g});return!v||typeof v.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let $=v,j=$&&$.code==="conflict"?$.details?.cross_lanes:null;return j&&typeof j.revision=="number"&&Array.isArray(j.lanes)?{ok:!1,conflict:j}:(ue(Tt(v),"error"),{ok:!1})}}async function Ct(p,g,v){let $=new Map,j=[],z=p.ops.slice(0,p.lane_op_index),ae=p.ops.slice(p.lane_op_index);for(let Ze of z){if(!await he(Ze,v,$))return{done:!0};yt(Ze)}let ve=g;for(let Ze of p.lane_ops){if(ve===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ot=await Dt(Ze,ve);if(!ot.ok)return ot.conflict?{done:!1,conflict:ot.conflict}:{done:!0};ve=ot.revision}for(let Ze of ae){if(!await he(Ze,v,$))return{done:!0};yt(Ze),Ze.type==="dep-add"&&j.push(Ze)}for(let Ze of wp(j))ve=await Yt(Ze,ve);return{done:!0}}async function Yt(p,g){if(g===null||!o)return g;let v=p.pairs,$=g;for(let j=0;j<2;j+=1){if(v.length===0)return $;try{let z=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:v.map(ae=>({bead_id:ae.bead_id,after:ae.after,value:!0})),expected_revision:$});return z&&typeof z.revision=="number"?z.revision:$}catch(z){let ae=z,ve=ae&&ae.code==="conflict"?ae.details?.cross_lanes:null;if(!ve||typeof ve.revision!="number"||!Array.isArray(ve.lanes))return $;let Ze=ve.lanes.find(ot=>ot&&ot.id===p.lane_id);v=kp(Array.isArray(Ze?.entries)?Ze.entries:[],v),$=ve.revision}}return $}async function Nt(p,g,v=[]){M=v,qe();let $=D,j=De();for(let z=0;;z+=1){let ae=p(Se($,j));if("refused"in ae){ue(ae.refused,"error");break}let ve=await Ct(ae,$.cross_lanes_revision,g);if(ve.done){ae.correction&&Te(ae.correction.lane_id,ae.correction.corrected);break}if(z>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=U(ve.conflict),j=ve.conflict}M=[],G()}async function nn(p,g){await Nt(v=>_l(p,g,v),p.bead_id)}async function kn(p,g){if(p==="run"){await $n(g);return}if(p==="stop"){await xn(g);return}if(p==="create"){await Nt(v=>ml(null,v),"");return}if(p==="remove"){let v=vp(g,Se());if(v!==null&&!m(v))return;await Nt($=>yp(g,$),"");return}await Nt(v=>p==="confirm"?gp(g,v):bp(g,v),"")}function qt(p){let g=new Map;for(let v of p.rows){let $=D.owner_of[v.id]||v.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],v.id])}return g}async function $n(p){let g=D.chain_lanes.find(z=>z.lane_id===p);if(!g||D.cross_lanes_revision===null){G();return}qe();let v=new Map,$=new Map,j=qt(g);for(let z of g.rows){if(!z.unplaced)continue;let ae=D.owner_of[z.id]||z.root_dir;if(typeof ae!="string"||ae.length===0){ue(`${z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),G();return}let ve=$.get(ae)??0;if(await Me("worker-queue-place",{bead_id:z.id,lane:"parallel",index:(D.parallel_raw_length[ae]??0)+ve},ae,v,{bead_id:z.id})===null){G();return}$.set(ae,ve+1)}for(let[z,ae]of j)if(await Me("worker-queue-arm",{bead_ids:ae,lane_id:p},z,v,{bead_id:ae[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),G();return}G()}async function xn(p){let g=D.chain_lanes.find($=>$.lane_id===p);if(!g||D.cross_lanes_revision===null){G();return}qe();let v=new Map;for(let[$,j]of qt(g))if(await Me("worker-queue-disarm",{lane_id:p},$,v,{bead_id:j[0]})===null)break;G()}async function Vn(p,g){let{root_dir:v,revision:$}=Vt(p);if(v.length===0){G();return}await Me("worker-queue-disarm",{bead_ids:[p],lane_id:g},v,new Map([[v,$]]),{bead_id:p}),G()}async function E(p,g){let v=me.get(p);if(!v){G();return}let $={kind:"candidate",bead_id:p,root_dir:v.root_dir};if(g==="new-lane"){await Nt(j=>ml({bead_id:p,root_dir:v.root_dir},j),p);return}if(g.startsWith("lane:")){let j=g.slice(5);if(!D.chain_lanes.find(ae=>ae.lane_id===j)){G();return}await Nt(ae=>_l($,{kind:"chain",lane_id:j,marker_index:(ae.cross_lanes.get(j)?.entries??[]).length},ae),p);return}if(g.startsWith("serial:")){let j=g.slice(7),z=(v.place_lanes||[]).find(ae=>ae.id===j);await nn($,{kind:"repo-serial",root_dir:v.root_dir,lane_id:j,index:z?z.index:0});return}await nn($,{kind:"parallel",marker_index:D.parallel_rows.length})}async function I(p,g){let v=D.parallel_rows,$=v.findIndex(ot=>ot.id===p);if($<0)return;let j=v[$].root_dir,z=[];v.forEach((ot,Xt)=>{ot.root_dir===j&&z.push(Xt)});let ae=z.indexOf($),ve=z[ae+g];if(typeof ve!="number")return;let Ze=g===-1?ve:z[ae+2]??Math.min(v.length,ve+1);await nn({kind:"parallel",bead_id:p,root_dir:j,queue_index:v[$].queue_index??0},{kind:"parallel",marker_index:Ze})}async function Ue(p){for(let g of D.chain_lanes){let v=g.rows.find($=>$.id===p);if(v){await nn({kind:"chain",bead_id:p,root_dir:v.root_dir,lane_id:g.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:D.parallel_rows.length});return}}}let Ke=null,rt=!1,vt=null;function Zt(){vt!==null&&clearTimeout(vt),vt=setTimeout(()=>{vt=null,rt=!1},0)}function gr(p,g){let v=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(v&&p.contains(v)){let $=Number(v.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return p.querySelectorAll("[data-row-index]").length}function Ir(p){let g=typeof p?.closest=="function"?p.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let v=g.getAttribute("data-lane");return v==="queue"?{zone:g,target:{kind:"parallel",marker_index:D.parallel_rows.length}}:v==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function f(p){let g=p.target;if(!Ke)return null;let v=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!v)return Ir(g);let $=v.getAttribute("data-drop");if($==="candidate")return{zone:v,target:{kind:"candidate"}};if($==="parallel")return{zone:v,target:{kind:"parallel",marker_index:gr(v,g)}};if($==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:gr(v,g)}};if($==="repo-serial"){let j=v.getAttribute("data-root-dir")||"";if(j!==Ke.root_dir)return null;let z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,ae=z&&v.contains(z)?z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),ve=Number(ae);return{zone:v,target:{kind:"repo-serial",root_dir:j,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(ve)?ve:0}}}return null}function w(){for(let p of Array.from(ee.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}let K=null;function J(p){K=p.target instanceof Element?p.target:null}function y(p){let g=p.target,v=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=v?v.closest("[data-drag-kind]"):null;if(!$)return;if(v&&K&&v.contains(K)&&typeof K.closest=="function"&&K.closest("input, button, a")){p.preventDefault();return}let j=$.getAttribute("data-bead-id")||"",z=$.getAttribute("data-drag-kind")||"",ae=$.getAttribute("data-root-dir")||"";if(!j||!z||!ae)return;let ve=$.getAttribute("data-queue-index")||"",Ze=Number(ve),ot=$.getAttribute("data-lane-id")||"";Ke={kind:z,bead_id:j,root_dir:ae,...ve!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...ot?{lane_id:ot}:{}},rt=!0,N=null,ee.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",j),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Q(p){let g=f(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function C(p){let g=p.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function $e(){Ke=null,w(),ee.classList.remove("is-dragging"),Zt()}function et(p){let g=f(p),v=Ke;Ke=null,w(),ee.classList.remove("is-dragging"),!(!g||!v)&&(p.preventDefault(),nn(v,g.target))}function Xe(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function ft(p,g){let{item:v,root_dir:$,revision:j}=Vt(g),z=v?.attempt_id||"",ae=p.classList;if(ae.contains("worker-mini__rowops-up")||ae.contains("worker-mini__rowops-down")){I(g,ae.contains("worker-mini__rowops-up")?-1:1);return}if(ae.contains("worker-mini__rowops-remove")){at("worker-queue-remove",{bead_id:g},$,j);return}if(ae.contains("mon2-crow__detach")){Ue(g);return}if(ae.contains("mon-dep__btn")){Gt(g);return}if(ae.contains("worker-dep__open")){Gt(g);return}if(ae.contains("mon2-arm__release")){Vn(g,p.getAttribute("data-lane-id")||"");return}if(ae.contains("mon-lane__chip")){let ve=p.getAttribute("data-lane-id")||"";ee.querySelector(`.mon2-clane[data-lane-id="${ve}"]`)?.scrollIntoView({block:"nearest"});return}if(ae.contains("mon-deppanel__unlink")){let ve=p.getAttribute("data-dep-a")||"",Ze=p.getAttribute("data-dep-b")||"";m(`${Ze}\uAC00 ${ve}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&on("dep-remove",ve,Ze);return}if(ae.contains("mon-deppanel__cand")){let ve=p.getAttribute("data-dep-cand")||"";T&&ve&&on("dep-add",T.bead_id,ve);return}if(ae.contains("mon-overlap__chip")){let ve=p.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===ve?null:{bead_id:g,counterpart_id:ve},G();return}if(ae.contains("mon-overlap__place")){lt(g,p.getAttribute("data-counterpart-id")||"");return}if(ae.contains("worker-card__place")){N=N===g?null:g,G();return}if(ae.contains("worker-card__place-cancel")){N=null,G();return}if(ae.contains("worker-card__place-lane")){let ve=p.getAttribute("data-lane")||"parallel";N=null,E(g,ve);return}if(ae.contains("rtile__session")){if(v&&v.kind==="session"){let ve=(v.session_refs||[]).find(Ze=>Ze&&Ze.current===!0);ve&&(Ce.hidden=!1,dt.open(Zr(ve,g,"in_progress",$)),G());return}B=z,z&&v&&(Ce.hidden=!1,dt.open({attempt_id:z,root_dir:$,meta:Xe(v)})),G();return}if(ae.contains("rtile__pause")){Le("worker-attempt-pause",{attempt_id:z},$);return}if(ae.contains("rtile__resume")){Yr().then(ve=>{if(ve!==null)return ct("worker-attempt-resume",{attempt_id:z,...ve!==""?{instructions:ve}:{}},$,j)});return}if(ae.contains("rtile__dismiss")){at("worker-attempt-dismiss",{attempt_id:z},$,j);return}if(ae.contains("rtile__discard")){if(!m(Ws(g,"unmerged")))return;ie({bead_id:g,...z?{attempt_id:z}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,j);return}if(ae.contains("worker-mini__merge")){let ve=$t($,g);ve?.mismatch&&ve.continuation===null?R($,g,j,ve.mismatch):at("worker-merge-queue-add",{bead_id:g},$,j);return}if(ae.contains("worker-mini__merge-cancel")){at("worker-merge-queue-remove",{bead_id:g},$,j);return}if(ae.contains("worker-mini__discard")){let ve=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ws(g,ve)))return;ie({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,j);return}if(ae.contains("worker-mini__revise-fix")){ct("worker-revise-fix",{bead_id:g},$,j);return}ae.contains("worker-mini__revise-approve")&&at("worker-revise-approve",{bead_id:g},$,j)}function tt(p){let g=rt;rt=!1;let v=p.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let $=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){p.preventDefault();let _t=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";_t&&kt(_t);return}let j=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(j){p.preventDefault();let Re=j.getAttribute("data-root-dir")||me.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||j.getAttribute("title")||"";ht(Re);return}let z=v.closest(".mon2-sec__toggle");if(z){p.preventDefault(),nt(z.getAttribute("data-root-dir")||"");return}let ae=v.closest(".worker-pane__toggle[data-lane]");if(ae){p.preventDefault();let Re=ae.getAttribute("data-lane")||"";(Re==="candidate"||Re==="queue"||Re==="running"||Re==="pr_wait"||Re==="done")&&mt(Re);return}let ve=v.closest(".worker-wait__area-toggle[data-area]");if(ve){p.preventDefault(),bt(ve.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){p.preventDefault(),kn("create","");return}let Ze=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ze){p.preventDefault();let Re=Ze.getAttribute("data-lane-id")||"",_t=Ze.classList;kn(_t.contains("mon2-clane__confirm")?"confirm":_t.contains("mon2-clane__reapply")?"reapply":_t.contains("mon2-clane__run")?"run":_t.contains("mon2-clane__stop")?"stop":"remove",Re);return}if(v.closest(".mon-merge-all")){p.preventDefault(),Ne();return}let ot=v.closest(".mon-filter__spec");if(ot){p.preventDefault(),k={...k,spec:ot.getAttribute("data-spec")||"all"},zp(k),G();return}let Xt=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Xt)return;let Rt=Xt.getAttribute("data-bead-id")||"",Yn=v.closest("button");if(Yn){p.preventDefault(),ft(Yn,Rt);return}Rt&&!g&&(p.preventDefault(),Et(Rt,Xt.getAttribute("data-root-dir")||Vt(Rt).root_dir))}function gt(p){let g=p.target;if(!g||typeof g.closest!="function")return;let v=g.closest(".mon-filter__blocked");if(v){k={...k,show_blocked:v.checked},zp(k),G();return}let $=g.closest(".mon-candidate-sort");if($){F=no.some(ae=>ae.value===$.value)?$.value:"repo_spec",hy(F),G();return}let j=g.closest(".mon-running-sort");if(j){b=j.value==="repo"?"repo":"started",xy(b),G();return}let z=g.closest(".mon-done-range");z&&(h=Un(z.value),ky(h),G())}function ln(p){let g=p.target,v=g&&typeof g.closest=="function"?j=>g.closest(j):()=>null,$=!1;W&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,$=!0),T&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(T=null,$=!0),$&&G()}function br(p){p.key!=="Escape"||!W&&!T||(W=null,T=null,G())}function sn(p){let g=p.target;!g||typeof g.closest!="function"||!g.closest(".mon-deppanel__search")||!T||(T={...T,query:g.value},G())}e.addEventListener("click",tt),e.addEventListener("change",gt),e.addEventListener("input",sn),e.addEventListener("pointerdown",J),document.addEventListener("click",ln),document.addEventListener("keydown",br),e.addEventListener("dragstart",y),e.addEventListener("dragover",Q),e.addEventListener("dragleave",C),e.addEventListener("drop",et),e.addEventListener("dragend",$e);{let p=!0;X=_a(g=>{if(le=g,p){p=!1;return}G()})}s&&typeof s.subscribe=="function"&&(We=s.subscribe(()=>{try{Ae.clear(),G()}catch{}}));function Mr(){pe!==null&&(clearInterval(pe),pe=null)}function An(){vt!==null&&(clearTimeout(vt),vt=null)}return{load(){n("load"),G(),pe===null&&(pe=setInterval(()=>{try{G()}catch{}},Ay))},pause(){Mr()},clear(){Mr(),An(),We&&(We(),We=null),X&&(X(),X=null),dt.destroy(),Ce.hidden=!0,Fe?.destroy(),Fe=null,e.removeEventListener("click",tt),e.removeEventListener("change",gt),e.removeEventListener("input",sn),e.removeEventListener("pointerdown",J),document.removeEventListener("click",ln),document.removeEventListener("keydown",br),e.removeEventListener("dragstart",y),e.removeEventListener("dragover",Q),e.removeEventListener("dragleave",C),e.removeEventListener("drop",et),e.removeEventListener("dragend",$e),e.replaceChildren()}}}function ef(e,t,n){let r=Bt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let k=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function m(){s&&st(u(),s),o&&st(d(),o)}return m(),a=t.subscribe(()=>m()),{destroy(){a&&(a(),a=null),s&&st(c``,s),o&&st(c``,o)}}}var tf=["bug","feature","task","epic","chore"];function nf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var rf=["Critical","High","Medium","Low","Backlog"];function sf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let N=document.createElement("option");N.value="",N.textContent="\u2014 Select \u2014",o.appendChild(N);for(let W of tf){let T=document.createElement("option");T.value=W,T.textContent=nf(W),o.appendChild(T)}a.replaceChildren();for(let W=0;W<=4;W+=1){let T=document.createElement("option");T.value=String(W);let M=rf[W]||"Medium";T.textContent=`${W} \u2013 ${M}`,a.appendChild(T)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(N){s.disabled=N,o.disabled=N,a.disabled=N,i.disabled=N,l.disabled=N,d.disabled=N,m.disabled=N,m.textContent=N?"Creating\u2026":"Create"}function V(){u.textContent=""}function Z(N){u.textContent=N}function le(){try{let N=window.localStorage.getItem("beads-ui.new.type");N?o.value=N:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function X(){let N=o.value||"",W=a.value||"";N.length>0&&window.localStorage.setItem("beads-ui.new.type",N),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function B(){V();let N=String(s.value||"").trim();if(N.length===0){Z("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Z("Priority must be 0..4"),a.focus();return}let T=String(o.value||""),M=String(l.value||""),se={title:N};T.length>0&&(se.type=T),String(W).length>0&&(se.priority=W),M.length>0&&(se.description=M),F(!0);try{await t("create-issue",se)}catch{F(!1),Z("Failed to create issue");return}X(),F(!1),k()}return n.addEventListener("cancel",N=>{N.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",N=>{N.key==="Enter"&&(N.ctrlKey||N.metaKey)&&(N.preventDefault(),B())}),r.addEventListener("submit",N=>{N.preventDefault(),B()}),{open(){r.reset(),V(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Ty=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Cy(e,t){return pi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function of(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Cy(r,e);return c`<button
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
  `}function af(e,t,n){return c`
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
  `}function lf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Ty.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Ry=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function cf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(_e=>ue(_e,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function m(){if(d)return d;let _e=a.querySelector('[data-pane="execution"]');return _e?(d=Oa(_e,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function h(){return c`
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
    `}function b(){let _e=r.get();return c`
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
        ${_e?c`
              ${of(_e,s(),Z)}
              ${af(_e,u,{onDraft:Te=>{u=Te},onAdd:le,onRemove:X})}
              ${lf(_e,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(_e){let Te=r.get();if(Te)try{let qe=await n("display-policy-set",{expected_revision:Te.revision,policy:_e(Te)});F(qe),qe&&qe.conflict&&qe.policy&&(qe=await n("display-policy-set",{expected_revision:qe.policy.revision,policy:_e(qe.policy)}),F(qe)),qe&&qe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(_e){_e&&_e.policy&&typeof _e.policy=="object"&&r.set(_e.policy)}function V(_e){k(_e)}function Z(_e){let Te=r.get();if(!Te)return;let qe=!Oy(_e,Te);V(ke=>Ly(_e,ke,qe))}function le(){let _e=u.trim();_e.length!==0&&(u="",V(Te=>Te.hidden_prefixes.includes(_e)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,_e]}),N())}function X(_e){V(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(qe=>qe!==_e)}))}function B(_e){let Te=r.get();if(!Te)return;let qe=Te.chips[_e]===!1;V(()=>({chips:{[_e]:qe}}))}function N(){st(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Ry.map(_e=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${_e.id}
                  aria-selected=${String(i===_e.id)}
                  aria-controls=${`settings-pane-${_e.id}`}
                  @click=${()=>W(_e.id)}
                >
                  <span class="settings-dialog__glyph">${_e.glyph}</span>
                  ${_e.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),m()}function W(_e){i=_e,N()}let T=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",T),a.addEventListener("cancel",T);let M=_e=>{_e.target===a&&ce()};a.addEventListener("click",M);let se=null;r.subscribe&&(se=r.subscribe(()=>{l&&N()}));let be=null;t.implPresetStore?.subscribe&&(be=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function xe(_e="execution"){l||(l=!0,t.onOpenChange?.(!0),i=_e,u="",N(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),m()?.load())}function ce(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:xe,close:ce,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",T),a.removeEventListener("cancel",T),a.removeEventListener("click",M),se&&(se(),se=null),be&&(be(),be=null),d?.destroy(),d=null,a.remove()}}}function Oy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ly(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Iy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],uf="usage-meter-card",My="usage-meter-layer",xl=600,Py=["token_expired","relogin_required"];function df(e){return String(e).padStart(2,"0")}function Dy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function pf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${df(r.getHours())}:${df(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Iy[r.getMonth()]} ${r.getDate()} ${o}`;return`${Dy(n,t)} \xB7 ${i}`}function Ny(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function ff(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function _f(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var mf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function bf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function qy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:bf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Fy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=qy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?bf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function jy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Fy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function hf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function By(e,t){return!e.held||hf(e,t)<=xl?e:{...e,available:!1,windows:[],accounts:[]}}function gf(e,t){return`${e}:${t}`}function yf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){st(c``,e),e.hidden=!0,m()}function d(){if(l===null){let ke=e.ownerDocument;l=ke.createElement("div"),l.id=My,l.className="usage-meter__layer",ke.body.appendChild(l)}return l}function m(){l!==null&&(st(c``,l),l.remove(),l=null)}function h(ke){n!==ke&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",V),window.addEventListener("resize",F)),n=ke)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",V),window.removeEventListener("resize",F))}function k(ke){let ee=ke.target;ee&&(e.contains(ee)||l!==null&&l.contains(ee))||(b(),ce())}function F(){ce()}function V(ke){ke.key==="Escape"&&(b(),ce())}function Z(ke){n===ke?b():h(ke),ce()}function le(){b(),ce()}async function X(ke,ee){if(r.has(ke.key))return;let Ce=gf(ke.key,ee);r.set(ke.key,ee),a.delete(Ce),ce();let Ie=null;try{Ie=await(await fetch(ke.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Ie=null}if(t)return;if(r.delete(ke.key),!Ie||Ie.ok!==!0){let D=Ie&&typeof Ie.error=="string"&&Ie.error.length>0?Ie.error:"network_error";a.set(Ce,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${D}`}),ce();return}let Y=Array.isArray(Ie.warnings)?Ie.warnings.filter(D=>typeof D=="string"&&D.length>0):[];Y.length>0&&a.set(Ce,{kind:"warn",text:Y.join(" \xB7 ")}),ce(),await qe()}function B(ke,ee,Ce,Ie){let Y=_f(ke.pct),me=`resets ${pf(ke.resetsAt,Ie)}${ee?` \xB7 ${Ce}`:""}`;return c`<span
      class="usage-meter__window ${ff(Y)}"
      style=${`--progress: ${Y}%`}
      title=${me}
    >
      <span class="usage-meter__label">${ke.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function N(ke,ee,Ce){let Ie=hf(ee,Ce),Y=ee.available&&(ee.held||Ie>xl),D=Y?`${Math.floor(Ie/60)}\uBD84 \uC804 \uCE21\uC815`:"",me=ee.accounts.filter(Fe=>!Fe.active).length,Ae=`usage-meter__group${Y?" usage-meter__group--stale":""}`,We=c`<span class="usage-meter__provider"
        >${ke.label}</span
      >
      ${ee.available?ee.windows.map(Fe=>B(Fe,Y,D,Ce)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${me>0?c`<span class="usage-meter__badge">+${me}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${Ae}
        aria-label=${`${ke.label} usage`}
        >${We}</span
      >`;let pe=n===ke.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${ke.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${uf}
      @click=${()=>Z(ke.key)}
    >
      ${We}
    </button>`}function W(ke,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${ke.map(Ce=>N(Ce.provider,Ce.snapshot,ee))}
    </span>`}function T(ke,ee){let Ce=_f(ke.pct),Ie=pf(ke.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${ff(Ce)}"
      style=${`--progress: ${Ce}%`}
    >
      <span class="usage-meter__account-key">${ke.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ce}%</span>
      <span class="usage-meter__account-reset"
        >${Ie.length>0?`\u21BB ${Ie}`:""}</span
      >
    </span>`}function M(ke,ee){return Py.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ke.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function se(ke,ee,Ce){let Ie=ee.status==="ok",Y=typeof ee.ageSeconds=="number"&&ee.ageSeconds>xl,D=a.get(gf(ke.key,ee.number)),me=r.get(ke.key),Ae=me!==void 0,We=me===ee.number,pe=["usage-meter__account"];return ee.active&&pe.push("usage-meter__account--active"),Ie||pe.push("usage-meter__account--unavailable"),Y&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${Ny(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ae}
              @click=${()=>{X(ke,ee.number)}}
            >
              ${We?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ie?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Fe=>T(Fe,Ce))}
          </div>`:c`<div class="usage-meter__account-status">
            ${M(ke,ee.status)}
          </div>`}
      ${D===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${D.kind}"
          >
            ${D.text}
          </div>`}
    </div>`}function be(ke,ee,Ce){let Ie=ee.accounts.filter(Y=>Y.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ke.label} · 활성 ${Ie} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(Y=>se(ke,Y,Ce))}
    </section>`}function xe(ke,ee){return c`<div
      class="usage-meter__card"
      id=${uf}
      role="dialog"
      aria-label=${`${ke.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${be(ke.provider,ke.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ce(){let ke=Date.now(),ee=[];for(let Ie of mf){let Y=o.get(Ie.key);Y&&ee.push({provider:Ie,snapshot:By(Y,ke)})}if(ee.length===0){b(),u();return}let Ce=ee.find(Ie=>Ie.provider.key===n&&Ie.snapshot.accounts.length>0);Ce||b(),st(W(ee,ke),e),e.hidden=!1,Ce?_e(Ce,ke):m()}function _e(ke,ee){let Ce=d(),Ie=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;Ce.style.setProperty("--usage-meter-anchor-top",`${Ie.bottom}px`),Ce.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-Ie.right)}px`),st(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${xe(ke,ee)}`,Ce)}async function Te(ke){try{let ee=await fetch(ke.endpoint);return ee.ok?jy(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function qe(){i+=1;let ke=i,ee=await Promise.all(mf.map(async Ce=>({provider:Ce,read:await Te(Ce)})));if(!(t||ke!==i)){for(let Ce of ee){let Ie=Ce.provider.key;if(Ce.read.kind==="ok"){o.set(Ie,Ce.read.snapshot);continue}if(Ce.read.kind==="empty"){o.delete(Ie);continue}let Y=o.get(Ie);Y!==void 0&&!Y.held&&o.set(Ie,{...Y,held:!0})}ce()}}return u(),qe(),s=setInterval(()=>{qe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function vf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Uy="worker-ineligible";function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wf(e){return ro(e).includes(Uy)}var Wy="session-preferred",zy=["exclusive_machine"];function kf(e,t){if(!ro(e).includes(Wy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&zy.includes(n)?n:""}var Hy="worker-serial";function Al(e){return ro(e).includes(Hy)}function Sl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Gy=new Set(["done","failed","orphaned","stopped","discarded"]),Ky={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Vy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Yy={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function El(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Yy[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function $f(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,m=null,h=null,b=null,k=new Set,F=!1,V=0,Z=null,le=new Set;function X(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function B(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function N(){return o&&o()||""}async function W(){if(!s)return;let x=++V;F=!0,b=null,k.clear(),Qe();try{let L=await s("worker-parallel-analysis-targets",{root_dir:N()});if(x!==V||!Pe)return;let ne=Array.isArray(L?.qualified)?L.qualified:[],fe=Array.isArray(L?.excluded)?L.excluded:[];b={qualified:ne,excluded:fe};for(let Ee of ne)Ee&&typeof Ee.id=="string"&&k.add(Ee.id)}catch{x===V&&Pe&&(b={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===V&&(F=!1,Pe&&Qe())}}function T(x){return Array.isArray(x.runs)?x.runs:[]}function M(){let x=X(),L=new Set;for(let ne of Object.values(x.attempts||{})){let fe=ne;fe&&typeof fe.bead_id=="string"&&!Gy.has(fe.status)&&L.add(fe.bead_id)}for(let ne of Array.isArray(x.pr_wait)?x.pr_wait:[])ne&&typeof ne.bead_id=="string"&&L.add(ne.bead_id);for(let ne of Object.values(x.discard_operations||{})){let fe=ne;fe&&fe.phase!=="done"&&typeof fe.bead_id=="string"&&L.add(fe.bead_id)}return L}function se(x){return x.filter(L=>be(L)===null)}function be(x){let L=X();for(let ne of Array.isArray(L.serial_lanes)?L.serial_lanes:[])if(Array.isArray(ne?.entries)&&ne.entries.some(fe=>fe.bead_id===x))return ne.id;return(Array.isArray(L.queue)?L.queue:[]).some(ne=>ne.bead_id===x)?"parallel":null}function xe(x,L){let ne=l.get(x);return ne||[...L.order]}function ce(x){if(x.length<2)return!1;let L=be(x[0]);if(!L||L==="parallel")return!1;let ne=X(),fe=(Array.isArray(ne.serial_lanes)?ne.serial_lanes:[]).find(A=>A.id===L)?.entries.map(A=>A.bead_id);if(!Array.isArray(fe))return!1;let Ee=x.map(A=>fe.indexOf(A));return Ee.every(A=>A>=0)&&Ee.every((A,U)=>U===0||A>Ee[U-1])}function _e(){let x=X(),L=Array.isArray(x.serial_lanes)?x.serial_lanes:[],ne=L.find(fe=>Array.isArray(fe.entries)&&fe.entries.length===0);return ne?ne.id:L[0]?.id||"s1"}function Te(x){let L=X().bead_titles||{};return typeof L[x]=="string"?L[x]:x}async function qe(x,L){if(!s||d)return null;d=!0,Qe();try{return await s(x,L)}finally{d=!1,Qe()}}async function ke(x){r?.setPending?.(!0);try{let L=await qe("worker-parallel-analysis-start",{force:x,target_ids:Array.from(k)});L&&L.applied===!1&&L.reason&&(L.reason==="target_not_qualified"&&Array.isArray(L.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${L.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${L.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ee(){let x=B().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Ce(x){if(!(!s||le.has(x))){le.add(x),Qe();try{let L=await s("worker-parallel-analysis-prompt",{root_dir:N(),run_id:x});if(!Pe)return;if(L?.ok===!0&&typeof L.prompt=="string"){Z={run_id:x,prompt:L.prompt};return}ue(L?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(x),Qe()}}}function Ie(){Z=null,Qe()}async function Y(){if(!Z)return;let x=await Sn(Z.prompt);ue(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function D(x,L){a&&a(x,El(L))}function me(){return X().runner_catalog}function Ae(x){return Object.keys(me()?.runners?.[x]?.models||{})}function We(x){let L=Ae(x),ne=me()?.runners?.[x]?.default_model;return typeof ne=="string"&&L.includes(ne)?ne:L[0]||""}function pe(){let x=B().settings,L=m||x.runner||"claude",ne=Ae(L),fe=m?We(L):x.model||ne[0]||"",Ee=Sl(me(),L,fe),A=x.effort||"",U=Ee.includes(A)?A:Ee[0]||"";return{runner:L,model:fe,effort:U,models:ne,efforts:Ee}}async function Fe(x){let L=B().settings,ne=await qe("worker-parallel-analysis-settings-update",{expected_revision:L.revision,runner:x.runner,model:x.model,effort:x.effort});(!ne||ne.applied!==!0)&&(m=null,Qe(),ne&&ne.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${ne.reason}`,"error",2800))}function dt(x){m=x,Qe();let L=pe();Fe({runner:x,model:L.model,effort:L.effort})}function at(x){let L=pe(),ne=Sl(me(),L.runner,x);Fe({runner:L.runner,model:x,effort:ne.includes(L.effort)?L.effort:ne[0]||""})}function $t(x){let L=pe();Fe({runner:L.runner,model:L.model,effort:x})}async function ct(x,L){if(!s||d)return;let ne=xe(x,L),fe=B();if(ne.length<2||!fe.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ee=u.get(x)||_e(),A=()=>({snapshot_digest:fe.last_good.identity_digest,group_index:x,lane:Ee,ordered_bead_ids:ne,expected_revision:X().revision});d=!0,Qe();try{let U=await s("worker-parallel-analysis-submit",A());U&&U.queue&&n&&n.set(U.queue),U&&U.applied!==!0&&U.conflict===!0&&(U=await s("worker-parallel-analysis-submit",A()),U&&U.queue&&n&&n.set(U.queue)),U&&U.applied===!0?(l.delete(x),ue(`\uC9C1\uB82C \uB808\uC778 ${Ee}\uC5D0 ${ne.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${U?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Qe()}}function R(x,L,ne){l.set(x,xe(x,L).filter(fe=>fe!==ne)),Qe()}function ie(x){l.delete(x),Qe()}function Le(x,L,ne,fe){let Ee=[...xe(x,L)],A=Ee.indexOf(ne),U=A+fe;A<0||U<0||U>=Ee.length||(Ee.splice(U,0,...Ee.splice(A,1)),l.set(x,Ee),Qe())}function Ne(){let x=B().settings,L=Object.keys(me()?.runners||{}),ne=pe();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${fe=>dt(fe.target.value)}
        >
          ${L.map(fe=>c`<option
                value=${fe}
                ?selected=${ne.runner===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${fe=>at(fe.target.value)}
        >
          ${ne.models.map(fe=>c`<option
                value=${fe}
                ?selected=${ne.model===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${fe=>$t(fe.target.value)}
        >
          ${ne.efforts.map(fe=>c`<option
                value=${fe}
                ?selected=${ne.effort===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      ${Ye(x)}
    </div>`}function Ye(x){return!mt(x)||nt(x)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function nt(x){return x.is_default===!0&&x.compatible===!1}function mt(x){return!!(x.runner&&x.model&&x.effort)}function bt(x){return mt(x)&&x.compatible!==!1}function oe(x){let L=Math.max(0,Math.floor(x/1e3)),ne=Math.floor(L/60),fe=L%60;return`${ne}:${String(fe).padStart(2,"0")}`}function te(x){let L=x.job;if(L){let ne=typeof L.started_at=="number"?L.started_at:0,fe=`${L.runner||"?"}/${L.model||"?"}`,Ee=ne?` \xB7 \uACBD\uACFC ${oe(Date.now()-ne)}`:"",A=typeof L.session_id=="string"?L.session_id:"",U=T(x).find(G=>G.run_id===L.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${fe} · effort ${L.effort||"?"}${Ee}</span
        >
        ${A?c`<code class="pa-session-id" title=${A}
              >${A.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>D(L.job_id,U||L)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${U?.prompt_saved!==!0||le.has(L.job_id)}
          @click=${()=>{Ce(L.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return it()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function je(x){let L=te(x);return L===""?"":c`<div class="pa__strip">${L}</div>`}function it(){return r?.isPending?.()===!0}function He(x){let L=!!x.job,ne=bt(x.settings),fe=b!==null&&k.size===0,Ee=L||d||it()||F;return c`<div class="pa-meta">
      ${x.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!ne||Ee||fe}
        @click=${()=>{ke(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!ne||Ee||fe}
        @click=${()=>{ke(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!L}
        @click=${()=>{ee()}}
      >
        취소
      </button>
    </div>`}function we(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function ze(x,L){L?k.add(x):k.delete(x),Qe()}function lt(x){let L=Array.isArray(x.scope)?x.scope:[],ne=Array.isArray(x.overlaps)?x.overlaps:[];return L.length===0&&ne.length===0?c``:c`<span class="pa-target__signals">
      ${L.length>0?c`<details class="pa-target__scope" title=${L.join(`
`)}>
            <summary>scope ${L.length}</summary>
            <ul>
              ${L.map(fe=>c`<li><code>${fe}</code></li>`)}
            </ul>
          </details>`:""}
      ${ne.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${ne.join(", ")}`}
            >겹침 ${ne.join(", ")}</span
          >`:""}
    </span>`}function ut(){let x=b?.qualified||[],L=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${L.length}`}</span
        >
      </header>
      ${b&&x.length>0?c`<ul class="pa-targets__list">
            ${x.map(ne=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${ne.id}
                      .checked=${k.has(ne.id)}
                      @change=${fe=>ze(ne.id,fe.target.checked)}
                    />
                    <span class="pa-target__title">${ne.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${lt(ne)}
                    <span class="pa-target__route">${ne.route}</span>
                    <span class="pa-target__lane"
                      >${we(ne.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&x.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&L.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${L.length}</summary>
            <ul class="pa-targets__list">
              ${L.map(ne=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${ne.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Ky[ne.reason]||ne.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${we(ne.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function pt(x){let L=typeof x.session_id=="string"&&x.session_id.length>0,ne=L?x.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${Vy[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${L?c`<code class="pa-session-id" title=${ne}
            >${ne.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?c`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>D(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||le.has(x.run_id)}
          @click=${()=>{Ce(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Pt(x){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?c`<ul class="pa-runs__list">
            ${x.map(L=>pt(L))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Ht(){return Z?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Ie}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Z.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Y()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Ie}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Z.prompt}</pre
        >
      </section>
    </div>`:""}function Ut(x,L){let ne=xe(x,L),fe=M(),Ee=ne.filter(ge=>fe.has(ge)),A=se(ne),U=ce(ne),G=Array.isArray(X().serial_lanes)?X().serial_lanes:[],Ve=u.get(x)||_e(),Be=L.eligible!==!0||ne.length<2||Ee.length>0||A.length>0||U||d;return c`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${L.confidence}</span>
        ${L.categories.map(ge=>c`<span class="pa-group__category">${ge}</span>`)}
        ${U?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${L.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${A.length>0?c`<span class="pa-group__stale"
              >stale — ${A.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${L.reason}</p>
      <ol class="pa-group__members">
        ${ne.map((ge,Et)=>c`<li class="pa-member" data-bead-id=${ge}>
              <span class="pa-member__seq">${Et+1}</span>
              <span class="pa-member__title">${Te(ge)}</span>
              ${fe.has(ge)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${ge}
                ?disabled=${Et===0}
                aria-label=${`${ge} \uC704\uB85C`}
                @click=${()=>Le(x,L,ge,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${ge}
                ?disabled=${Et===ne.length-1}
                aria-label=${`${ge} \uC544\uB798\uB85C`}
                @click=${()=>Le(x,L,ge,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${ge}
                aria-label=${`${ge} \uC81C\uC678`}
                @click=${()=>R(x,L,ge)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${L.evidence.map(ge=>c`<li class="pa-evidence">
              <code>${ge.path}</code>
              <span class="pa-evidence__locator">${ge.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ie(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${ge=>{u.set(x,ge.target.value),Qe()}}
          >
            ${G.map((ge,Et)=>c`<option
                  value=${ge.id}
                  ?selected=${Ve===ge.id}
                >
                  직렬 ${Et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Be}
          @click=${()=>{ct(x,L)}}
        >
          제출
        </button>
      </footer>
    </section>`}function xt(x){let L=Array.isArray(x.issues)?x.issues:[],ne=L.filter(Ee=>Ee.verdict==="parallel_ok").length,fe=L.filter(Ee=>Ee.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${ne}</span>
      <span>uncertain ${fe}</span>
    </div>`}function St(){let x=Pe&&!!B().job;if(x&&h===null){h=setInterval(()=>Qe(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function Qe(){let x=B();m&&x.settings.runner===m&&(m=null);let L=x.last_good?.result;St(),st(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Oe}
            >
              ×
            </button>
          </header>
          ${je(x)}
          <div class="pa__body">
            ${Ne()} ${He(x)} ${ut()}
            ${L?c`${L.groups.map((ne,fe)=>Ut(fe,ne))}
                ${L.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${xt(L)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Pt(T(x))}
          </div>
        </div>
        ${Ht()}
      `,i)}let Pe=!1,P=()=>{Pe=!1,Z=null,V+=1,St()},re=x=>{x.target===x.currentTarget&&Oe()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",re);let ye=null;n&&n.subscribe&&(ye=n.subscribe(()=>{Pe&&Qe()}));let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{Pe&&Qe()}));function H(){Pe||(Pe=!0,Qe(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Oe(){Pe&&(Pe=!1,Z=null,V+=1,St(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Oe,destroy(){Pe=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",re),ye&&(ye(),ye=null),S&&(S(),S=null),i.remove()}}}var xf=new Set(["sh","bash","zsh","dash","ksh"]),Af=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Sf(e){let t=e.split("/");return t[t.length-1]||""}function Zy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Sf(n[0]);if(r!=="env")return xf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&xf.has(Sf(s))}function Qy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Xy(e){let t=[],n=0;Af.lastIndex=0;for(let r of e.matchAll(Af)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Qy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Jy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Ef(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function m(N,W){return W?Xy(N).map(T=>T.kind==="plain"?T.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${T.kind}"
            >${T.text}</span
          >`):N}function h(){if(!s)return c``;let N=o==="ready"&&Zy(a),W=o==="ready"?a.split(`
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
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${W.map((T,M)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(T,N)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){st(h(),r)}async function k(){if(o!=="ready")return;let N=await Sn(a);ue(N?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",N?"success":"error")}function F(N){N.key==="Escape"&&s&&(N.preventDefault(),X())}function V(){d||(document.addEventListener("keydown",F),d=!0)}function Z(){d&&(document.removeEventListener("keydown",F),d=!1)}async function le(N,W=null){let T=++l;V(),s={...N},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let se=t?t():"";if(!se){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let be="/api/repo-ops-script?workspace="+encodeURIComponent(se)+"&lane="+encodeURIComponent(N.lane)+"&base_sha="+encodeURIComponent(N.base_sha);try{let xe=await n(be),ce=await xe.json().catch(()=>({}));if(T!==l)return;if((t?t():"")!==se){X();return}if(!xe.ok||!ce||ce.ok!==!0){o="error",i=Jy(ce&&typeof ce.error=="string"?ce.error:""),b();return}s={lane:ce.lane,base_sha:ce.base_sha,path:ce.path,base_ref:ce.base_ref},a=String(ce.content),o="ready",b()}catch{if(T!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function X(){l+=1,Z(),s=null,a="",b();let N=u;u=null,N?.isConnected&&N.focus()}function B(){X(),r.remove()}return{open:le,close:X,destroy:B}}function Tf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let T=o();return typeof T.revision=="number"?T.revision:0}function i(T){t&&T&&T.queue&&typeof T.queue=="object"&&t.set(T.queue)}function l(){let T=o().workspace_info;return T&&typeof T=="object"?T:{}}function u(T,M){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${T}"
      >${M}</span
    >`}function d(T){if(typeof T!="number"||!Number.isFinite(T))return"";let M=T/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(T/1e3)}\uCD08`}function m(T){let M=d(T);return M?u("config",M):""}function h(T,M,se){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${se.script}
      @click=${be=>{s&&s({lane:T,base_sha:M.base_sha,path:se.script,base_ref:M.base_ref},be.currentTarget)}}
    ></button>`}function b(){let T=o().repo_ops_opt_out;return{verify:T?.verify===!0,deploy:T?.deploy===!0}}function k(T,M){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${se=>{le(T,!se.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(T){let M=typeof T.base_sha=="string"?T.base_sha:"",se=`${T.source_path||"repo-ops/config.toml"} @ ${T.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,be=b(),xe=!!T.verify&&be.verify,ce=!!T.deploy&&be.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${se}</span>
      </p>
      <div
        class="worker-repo-ops__lane${xe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${T.verify?c`${h("verify",T,T.verify)}
              ${m(T.verify.timeout_ms)}
              ${xe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${xe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":T.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${T.verify?k("verify",be.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${T.deploy?c`${h("deploy",T,T.deploy)}
              ${m(T.deploy.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":T.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${T.deploy?k("deploy",be.deploy):""}
      </div>
    </section>`}function V(T){let M=T.repo_ops&&typeof T.repo_ops=="object"?T.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?F(M):M&&(M.status==="pending"||M.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${M.error_code?c` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Z(T){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});if(i(M),M&&M.conflict){let se=await n("worker-auto-repair-toggle",{on:T,expected_revision:a()});i(se)}r()}async function le(T,M){if(!n)return;let se=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:M,expected_revision:a()});if(i(se),se&&se.conflict){let be=await n("worker-repo-ops-opt-out-toggle",{kind:T,opted_out:M,expected_revision:a()});i(be)}r()}let X={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function B(T,M,se){return c`<div class="worker-repo-ops__policy-group" data-policy=${se}>
      <div class="worker-repo-ops__policy-label">${T}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(be=>c`<li data-token=${be}>
              ${X[be]||be}
            </li>`)}
      </ul>
    </div>`}function N(T){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${T.map(M=>{let se=[X[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?se.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?se.push(`${X[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&se.push(`${M.sessions_per_user_action}\uD68C`,X[M.user_actions]||M.user_actions),M.applies_when&&se.push(X[M.applies_when]||M.applies_when),c`<li data-token=${M.id}>
            <strong>${X[M.id]||M.id}</strong>
            <span>${se.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let T=o(),M=T.auto_repair!==!1,se=T.repo_operation_policy&&typeof T.repo_operation_policy=="object"?T.repo_operation_policy:null,be=Array.isArray(T.repo_operations)?T.repo_operations:[],xe=be.find(qe=>qe.state==="repairing"),ce=be.filter(qe=>qe.state==="failed"||qe.state==="repairing"),_e=ce.length?Math.min(...ce.map(qe=>typeof qe.repair?.remaining=="number"?qe.repair.remaining:0)):se?.auto_repair?.resolution_ladder?.find(qe=>qe.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(se?.auto_repair?.resolution_ladder)?se.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${M}
          @change=${qe=>{Z(qe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${M?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${_e}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${xe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${xe.repair?.owner_bead||xe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${se?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(se.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(se.never_automatic||[]).length}</span
              >
            </summary>
            ${B("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",se.worker_automatic||[],"worker-automatic")}
            ${se.supported===!1||se.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${se.schema_version})`}
                </div>`:N(Te)}
            ${B("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",se.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${V(l())} ${W()}
      </details>`}}}var Lf=20,ev=5,tv=new Set(["failed","repairing","running","queued","retry_pending"]),Cf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Rf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function nv(e,t,n=Lf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function rv(e){if(e.type==="cleanup")return!0;let t=e.operation;return tv.has(t.state)&&!t.dismissed&&!t.superseded_by}function sv(e,t,n={}){let r=nv(e,t,1/0),s=n.expanded===!0?Lf:ev,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||rv(i));return{visible:a,hidden:r.length-a.length}}function Of(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ov(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function If(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Mf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function av(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Rf,r)?Rf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function iv(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?un(e.at):""}
      >${ya(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Of(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Cf,t.kind)?Cf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ga(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Us(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Of(e)}"
          >${ov(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Mf(Jd(t.failure_kind,r)):""}
      ${av(t)}
      ${If([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ga(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function lv(e){let t=e.cleanup,n=Lr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?un(e.at):""}
      >${ya(e.at)||"\u2014"}</span
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
        ${Cp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Mf(Ca(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${If([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function cv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?lv(r):iv(r))}
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
  </section>`}function Pf(e,t={}){let n=null;function r(){if(n===null){st(c``,e);return}let a=sv(n.operations,n.cleanup_failures,{expanded:n.expanded});st(cv({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var uv=Bt("views:worker"),dv="tab:worker:ready",pv="tab:worker:blocked",fv="tab:worker:in-progress",_v="tab:worker:resolved",mv="tab:worker:closed",ja=1,Df=5;function Nf(e){return Is(e).evidence==="published"}var gv=new Set(["quick_fix","spec_backed","full_plan"]);function qf(e){return typeof e=="string"&&gv.has(e)}var Uf="beads-ui.worker.candidate-filter",Tl={show_blocked:!1,spec:"all"};function bv(){try{let e=window.localStorage.getItem(Uf);if(!e)return{...Tl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Tl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Tl}}}function hv(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}function yv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var vv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Wf="bdui.worker.candidate_sort",zf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Rl="spec";function Hf(e){return zf.some(t=>t.value===e)?e:Rl}function wv(){try{return Hf(window.localStorage.getItem(Wf))}catch{return Rl}}function kv(e){try{window.localStorage.setItem(Wf,e)}catch{}}var Gf="bdui.worker.done-range";function $v(){try{let e=window.localStorage.getItem(Gf);return e===null?"today":Un(e)}catch{return"today"}}function xv(e){try{window.localStorage.setItem(Gf,e)}catch{}}function Ff(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Av(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Ar):t==="updated"?r.sort(xo):(r.sort(Ao(n)),t==="board"?r:[...r.filter(Nf),...r.filter(s=>!Nf(s))])}function Sv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ev(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Tv="\u{1F512} blocked";function jf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Cv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Rv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Ov(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Lv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Iv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Cl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Mv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Pv=new Set(["waiting_metadata","reviewing","retrying"]);function Dv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?un(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Nv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function qv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Nv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Mv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Bf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Fv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Bf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Bf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Cv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${jf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${jf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function jv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,m=null,h=null,b={},k=!1,F=!1,V={},Z=null){let le=!!l&&l.position>0,X=!!l?.continuation_action&&l.continuation_action.continuation===null,B=!!l&&l.active===!0,N=l&&l.failure||null,W=Ov(l?l.waiting:null,h),T=n[e]||null,M=T&&T.gate?T.gate:null,se=T&&T.pr?T.pr:null,be=Lv(l?l.resolution:null),xe=Iv(l?l.head_review:null),ce=l&&l.head_review||null,_e=Dv(h,ce),Te=qv(h,_e),qe=l&&l.authority||null,ke=!!ce&&["pending","reviewing","revising"].includes(ce.state),ee=!!h&&typeof h=="object"&&Pv.has(h.phase),Ce=le&&!B&&(ce?.state==="failed"||!qe||ee||qe.source==="automatic"&&!F),Ie=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":be?be.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,Y=!!M&&M.base_badge==="\uCDA9\uB3CC",D=!!M&&M.enabled===!0,me=eo({bead_id:e,merge_sha:V.merge_sha,cleanup_cursor:V.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:V.repo_operations}),Ae=qa(me),We=o&&!me&&(o.queueing??null)?o.queueing:null,pe=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!M&&M.tier==="merged",Fe=i&&!!r&&!!M&&M.tier==="merged",dt=Ce&&(D||Y||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||pe||Fe),at=i&&Y&&u===!1,$t=Fn(b,e,{external:i,merge_active:B||me?.step==="merge",merge_queued:le,conflict_active:!!a,cleanup_active:Ae,merged:!!r||M?.tier==="merged"}),ct=!!$t.operation,R=!pe&&!!r&&r.step==="repo_operations",ie=Fv({continuation_required:X,queueing:We,merge_step:me,conflict_badge:Ie,conflict_live:be?.live===!0||a==="running",head_review:ce&&xe?{...xe,state:ce.state,failure_reason:ce.failure_reason}:null,auto_resolution:_e,recovery:Te,cleanup_failed:r,cleanup_label:r?Lr(r.step):null,base_exception:m,conflicting:Y,gate:M,receipt_check:T&&T.receipt_check?T.receipt_check:null,queue_failure:N,auto_skip:d,queued:le,queue_active:B,queue_position:l?l.position:0,activity:Ie?null:o&&o.activity||null}),Le=ie?.live===!0&&ie.title?c`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&me?.active!==!0?Na(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Z?{dependency_chips:Z}:{},external:i,pr_number:se&&typeof se.number=="number"?se.number:null,pr_url:se&&typeof se.url=="string"?se.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",completion_repair_pr_url:Te?Te.repair_pr_url:"",completion_repair_pr_number:Te?Te.repair_pr_number:null,badges:Le?[Le]:[],live_badge:ie?.live===!0?Le:null,usage:s,alert:ie?.alert===!0,merge_action:M?.tier==="merged"&&!pe&&!Fe||R?!1:!le||X||Ce,timeline_action:R,cancel_action:le&&!X,cancel_enabled:(!B||ke)&&!(Te&&Te.lock_actions),cancel_title:Te&&Te.lock_actions?`${Te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!ke?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ke?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$t,discard_action:$t.action,merge_step:me,discard_enabled:$t.enabled,discard_title:$t.title,merge_enabled:!me&&!We&&!a&&!ct&&!m&&!(Te&&Te.lock_actions)&&!at&&!R&&(D||Y||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||pe||Fe||dt||ee&&!B),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":pe||Fe?"\uC815\uB9AC \uC7AC\uAC1C":Y&&!me&&!pe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":M?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ct?$t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":We?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":at?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Y?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":M?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":D?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:M&&M.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${M&&M.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ol(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:m,doneRange:h,onDoneRangeChange:b}=t,k=r?Eo(r,i):null,F=Oo({transport:n,uiOrderStore:i}),V=null,Z=[],le=bv(),X=null,B=null,N={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},W=wv(),T=h?Un(h):$v(),M=new Map;function se(){let f=Br.find(w=>w.value===T);return f?f.label:"\uC624\uB298"}let be=ma("beads-ui.worker.lane-collapsed"),xe=!1,ce=new Set,_e=new Set,Te=new Set,qe=new Set,ke=new Set,ee={},Ce=null,Ie=0,Y=null,D=[];function me(f){return Ce===f?ee:{}}async function Ae(){if(!n)return;let f=u?.()||"";if(Ce===f||Y&&Y.key===f&&Y.generation===Ie)return;let w=++Ie;Y={key:f,generation:w};let K=null;try{K=await Promise.resolve(n("get-session-defaults",{}))}catch(J){if(w!==Ie)return;Y=null,uv("get-session-defaults failed: %o",J),Se();return}w===Ie&&(ee=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},Ce=f,Y=null,Se())}function We(){Ce=null,Ie+=1,Ae()}let pe=document.createElement("div");pe.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let dt=document.createElement("div");dt.className="worker-drawer-overlay",dt.hidden=!0;let at=document.createElement("div");at.className="worker-drawer-overlay__backdrop";let $t=document.createElement("div");$t.className="worker-drawer-host";let ct=document.createElement("div");ct.className="worker-drawer-host",ct.hidden=!0,dt.append(at,$t,ct);let R=document.createElement("div");R.className="worker-lanes-host",pe.append(Fe,dt,R),e.appendChild(pe);let ie=null,Le=null,Ne=ts($t,{transport:n,sessionLogStore:a,onClose:()=>{ie=null,Le=null,dt.hidden=!0,Se()}}),Ye=Pf(ct,{onClose:()=>{ct.hidden=!0,dt.hidden=!0,Se()}}),nt=Ef({getWorkspacePath:u||(()=>"")}),mt=u&&u()||"",bt=Tf({queueStore:s,transport:n,onChanged:()=>Se(),onOpenScript:(f,w)=>{nt.open(f,w)}}),oe=o?$f(pe,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,w)=>Ke(f,w)}):null;function te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ja,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function je(){let f=te(),w=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,K=Array.isArray(f.serial_lanes)?f.serial_lanes:[],J=[];for(let Q of K){if(J.length>=w)break;!Q||typeof Q.id!="string"||!/^s[1-5]$/.test(Q.id)||!Array.isArray(Q.entries)||J.push({id:Q.id,label:`\uC9C1\uB82C ${Q.id.slice(1)}`,count:Q.entries.length})}return J.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...J]}function it(f){if(!X||!f.some(K=>K.id===X))return null;let w=je();return w?{bead_id:X,lanes:w}:null}function He(){let f=te();return typeof f.revision=="number"?f.revision:0}function we(f){f&&f.queue&&s&&s.set(f.queue)}function ze(){let f=te().queue;return Array.isArray(f)?f.length:0}async function lt(f,w,K){if(!n)return;let J=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},...K===void 0?{}:{index:K},expected_revision:He()}),y=await n("worker-queue-place",J());we(y),y&&y.conflict&&await n("worker-queue-place",J()).then(we)}async function ut(f,w,K){if(!n)return;let J=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:K,expected_revision:He()}),y=await n("worker-queue-reorder",J());we(y),y&&y.conflict&&await n("worker-queue-reorder",J()).then(we)}async function pt(f){if(!n)return;let w=await n("worker-queue-remove",{bead_id:f,expected_revision:He()});we(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:He()}).then(we)}async function Pt(f){if(!n||!f)return;let w=await n("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ht(f){if(!n||!f)return;let w=await Yr();if(w===null)return;let K=async(y={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:He(),...w!==""?{instructions:w}:{},...y}),J=await K();we(J),J&&J.conflict&&(J=await K(),we(J)),J=await Jn(J,(y,Q)=>K({continuation:y,decision_token:Q}),{onResult:we,refresh:()=>K()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}async function Ut(f){if(!n||!f)return;let w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:He()});we(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:He()}),we(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function xt(f,w,K=!0){if(!n)return null;let J=n,y=await J(f,{...w,expected_revision:He()});return we(y),y&&y.conflict&&K&&(y=await J(f,{...w,expected_revision:He()}),we(y)),y}async function St(f){if(!n||!f)return;let w=te().merge_queue?.find(J=>J.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await Pe(f,w.mismatch);return}ce.add(f),Se();let K;try{K=await xt("worker-merge-queue-add",{bead_id:f})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ce.delete(f),Se()}if(!(!K||K.applied)){if(K.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Rv(K.reason),"error",2400)}}async function Qe(f){if(!(!n||!f||_e.has(f))){_e.add(f),Se();try{let w=await n("worker-cleanup-retry",{bead_id:f,expected_revision:He()});we(w),w&&!w.retried&&!w.conflict&&w.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{_e.delete(f),Se()}}}async function Pe(f,w){let K=await Jn({continuation_mismatch:w},(y,Q)=>xt("worker-merge-queue-add",{bead_id:f,continuation:y,decision_token:Q},!1)),J=K?.queue?.merge_queue?.find(y=>y.bead_id===f)?.continuation_action;if(K?.applied!==!0&&J?.continuation===null&&J.mismatch){await Pe(f,J.mismatch);return}K&&K.applied===!1&&!K.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(f){if(!n)return;let w=await xt("worker-merge-auto-toggle",{on:f});!w||w.conflict||ue(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function re(f){if(!n||!f)return;let w=await xt("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ye(){await xt("worker-merge-queue-remove",{all:!0})}async function S(f,w=null,K="unmerged",J=null){if(!n||!f)return;let y=Ws(f,K);if(!(!!J||typeof globalThis.confirm!="function"||globalThis.confirm(y)))return;let C=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...J?{operation_id:J}:{},expected_revision:He()});if(we(C),C&&C.conflict&&(C=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...J?{operation_id:J}:{},expected_revision:He()}),we(C)),C&&C.discarded===!0){ue(va(C),"success",5e3);return}if(C&&C.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${C.reason}`,"error",2800);return}if(C&&C.accepted&&C.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(C&&C.accepted&&!C.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${C.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}C&&!C.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(f,w,K){if(!(!n||!w||!K||qe.has(w))){qe.add(w),Se();try{let J=await n(f,{bead_id:w,action_id:K,expected_revision:He()});we(J),J?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!J?.ok&&J?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(J.reason)}`,"error",2800)}finally{qe.delete(w),Se()}}}async function Oe(f,w){if(!n||!w||Te.has(w))return;Te.add(w),Se();let K;try{let J=async(y={})=>await n(f,{bead_id:w,expected_revision:He(),...y});K=await J(),we(K),K&&K.conflict&&(K=await n(f,{bead_id:w,expected_revision:He()}),we(K)),f==="worker-revise-fix"&&(K=await Jn(K,(y,Q)=>J({continuation:y,decision_token:Q}),{onResult:we,refresh:()=>J()}))}finally{Te.delete(w),Se()}if(!(!K||K.conflict)){if(K.ok){ue(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${K.reason||""}`,"error",3e3)}}async function x(f){if(!n)return;let w=await n("worker-automation-toggle",{on:f,expected_revision:He()});we(w),w&&w.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:He()}).then(we)}async function L(f){if(!n||!f)return;let w=await n("worker-repo-operation-repair",{operation_id:f});if(we(w),w&&w.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ne(f){if(!n||!f)return;let w=await n("worker-repo-operation-dismiss",{operation_id:f});we(w),w&&w.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function fe(f){if(!n||!Number.isFinite(f))return;let w=Math.max(ja,Math.floor(f)),K=await n("worker-queue-set-slots",{slots:w,expected_revision:He()});we(K),K&&K.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:He()}).then(we)}async function Ee(f){if(!n||!Number.isInteger(f)||f<1||f>Df)return;let w=te(),K=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((Q,C)=>Q+(Array.isArray(C?.entries)?C.entries.length:0),0),J=()=>({count:f,expected_revision:He()}),y=await n("worker-queue-set-serial-lane-count",J());we(y),y&&y.conflict&&(y=await n("worker-queue-set-serial-lane-count",J()),we(y)),y&&y.applied&&K>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${K}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let A="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function U(f,w){let K=ol(f,w.id,N);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:K.kind==="note"?{kind:"note",text:K.text}:K.kind==="disabled"?{kind:"disabled",label:A,title:K.title}:{kind:"place",label:A,title:K.title}}}function G(f,w){if(!B||B.bead_id!==f)return null;let K=B.counterpart_id,J=w.filter(y=>y.id===K);return J.length===0?null:{rows:J.map(y=>U(f,y))}}async function Ve(f,w){let K=ol(f,w,N);if(B=null,K.kind!=="ops"){Se();return}let J=He();for(let y of K.ops){let Q=await Be(y,J);if(Q===null)break;J=Q}Se()}async function Be(f,w){if(!n)return null;try{let K=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:w});if(we(K),K&&K.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!K||K.applied!==!0)return ue(K&&typeof K.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${K.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let J=K.queue?K.queue.revision:void 0;return typeof J!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):J}catch(K){return ue(K instanceof Error&&K.message?K.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function ge(){let f=te(),w=k?k.selectBoardColumn(dv,"ready"):[],K=k?k.selectBoardColumn(pv,"blocked"):[],J=k?k.selectBoardColumn(mv,"closed"):[],y=k?k.selectBoardColumn(fv,"in_progress"):[],Q=k?k.selectBoardColumn(_v,"resolved"):[],C=Co([...w,...K,...y,...Q,...J]),$e=new Map;for(let _ of[...w,...K,...y])_&&_.id&&!$e.has(_.id)&&$e.set(_.id,_);let et={...me(u?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=f[_];typeof q=="string"&&(et[_]=q)}function Xe(_,q){let de=$e.get(_);if(!de)return null;let Ge=de.metadata&&typeof de.metadata=="object"?de.metadata:{},Je=de.workflow?.route,Kt=Ge.route,Lt=qf(Je)?Je:qf(Kt)?Kt:null;return yn({pin:Ge,global:et,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Lt,controller_runtime:q})}function ft(_){let q=_.runner||null,de=Xe(_.bead_id,q),Ge=Hs(_),Je=de?fr(de,q):null;return Ge||Je?{orchestration:Ge,worker:Je}:null}let tt=new Map;function gt(_){if(tt.has(_))return tt.get(_)??null;let q=Xe(_,null),de=null;if(q){let Ge=qn(f.runner_catalog??null,q.orchestration_model.value??""),Je=Ge===null?q:Xe(_,Ge),Kt=Rr(Je,f.runner_catalog??null),Lt=fr(Je,Ge);de=Kt||Lt?{orchestration:Kt,worker:Lt}:null}return tt.set(_,de),de}function ln(_){let q=Ro(C,_);return q.total===0?null:q}let br=f.bead_titles||{},sn=new Map;for(let[_,q]of Object.entries(br))typeof q=="string"&&q.length>0&&sn.set(_,q);for(let _ of[...w,...K])sn.set(_.id,_.title||_.id);let Mr=new Map;for(let _ of[...w,...K,...y,...Q,...J])_&&_.id&&typeof _.from_id=="string"&&Mr.set(_.id,_.from_id);let An=new Map;for(let _ of[...w,...K,...y,...Q,...J])_&&_.id&&typeof _.priority=="number"&&An.set(_.id,_.priority);let p=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},g=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},v=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},$=new Map;for(let[_,q]of Object.entries(g))Array.isArray(q)&&$.set(_,Al(q));for(let _ of[...w,...K]){let q=_.labels;Array.isArray(q)&&!$.has(_.id)&&$.set(_.id,Al(q))}let j=new Map,z=o?.get()?.last_good?.result?.groups;for(let _ of Array.isArray(z)?z:[]){if(_?.eligible!==!0||!Array.isArray(_.members))continue;let q=_.members.map(Ge=>{let Je=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Kt=>Kt.entries.some(Lt=>Lt.bead_id===Ge));return Je?Je.id:null});if(!(q.every(Ge=>Ge!==null)&&new Set(q).size===1))for(let Ge of _.members)j.set(Ge,_.members.filter(Je=>Je!==Ge))}let ae=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},ve=f.blocker_workspaces&&typeof f.blocker_workspaces=="object"&&!Array.isArray(f.blocker_workspaces)?f.blocker_workspaces:{},Ze=new Map;for(let[_,q]of Object.entries(p))q&&typeof q=="object"&&Ze.set(_,q);for(let _ of[...w,...K])Ze.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let ot=_=>Ze.get(_)||{},Xt=f.pr_wait||[],Rt=f.pr_observations||{},Yn=f.pr_activity||{},Re=f.cleanup_failed||{},_t=Object.entries(Re).map(([_,q])=>({bead_id:_,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),cn=f.queue||[],Pl=new Set([...cn.map(_=>_.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(q=>q.bead_id)),...Xt.map(_=>_.bead_id),...f.done.map(_=>_.bead_id)]),o_=new Set(K.map(_=>_.id)),a_=i?i.get()?.order||{}:{},Dl=new Set,Nl=[];for(let _ of[...w,...K])Pl.has(_.id)||Dl.has(_.id)||Sv(_)||(Dl.add(_.id),Nl.push(_));Z=Av(Nl,W,a_);let i_=f.admission||{},ql=_=>{let q=i_[_];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let de=typeof q.reason=="string"?q.reason:"",Ge=de.indexOf(":");return Ge>0&&Ge<de.length-1?`\u26D4 ${de.slice(0,Ge)} (${de.slice(Ge+1)})`:`\u26D4 ${de}`},Fl=new Map,l_=Z.map(_=>{let q=Is(_),de=q.evidence==="published",Ge=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Je=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Kt=Object.hasOwn(_,"labels")&&wf(_.labels),Lt=Kt||!Object.hasOwn(_,"labels")?"":kf(_.labels,_.metadata),qr=Lt.length>0,It=!Kt&&(Ge?Je:de&&!q.conflict),fo=o_.has(_.id),Zn=[];if(fo){let _o=Ev(_);_o.length>0?Fl.set(_.id,_o):Zn.push(Tv)}Ge&&!Je?Zn.push("missing_description"):!Ge&&q.conflict?Zn.push("spec_id_conflict"):!Ge&&q.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Ge&&q.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Fr=ql(_.id);return Fr&&Zn.push(Fr),{id:_.id,title:_.title||_.id,reason:Zn.join(" \xB7 "),draggable:It,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Ge,status:_.status,worker_ineligible:Kt,session_preferred:qr,session_preferred_reason:Lt,blocked:fo,has_spec:de,exec_chips:gt(_.id),from_id:_.from_id||void 0,priority:An.get(_.id)}}),Ba=yv(l_,le),Ua=Ba.visible,c_=f.revise_parked||{},so=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Wa=(_,q)=>_.map((de,Ge)=>{let Je=q!=="done",Kt=q!=="done"&&q!=="queue",Lt=Je?c_[de.bead_id]:null,qr=Je?Fn(so,de.bead_id):null,It=qr?.operation?qr:null,fo=Je&&$.get(de.bead_id)===!0,Zn=f.admission&&typeof f.admission=="object"?f.admission[de.bead_id]:null,Fr=Je?Gd(Zn,!!It||qe.has(de.bead_id)):null,_o=Je&&!Fr?ql(de.bead_id):null,k_=Je?[_o]:[],mc=[],Ja=Je?j.get(de.bead_id):void 0;return Ja&&Ja.length>0&&mc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ja.join(", ")}\uC640`),{id:de.bead_id,title:sn.get(de.bead_id)||de.bead_id,reason:k_.filter(Boolean).join(" \xB7 "),draggable:Je&&!It&&!Fr,done:q==="done",lane:q,seq:Kt?Ge+1:void 0,worker_serial:fo,discard:It,stale_work:Fr,badges:[...mc,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...q==="done"?ba(f.attempts||{},de.bead_id):[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!It&&!Te.has(de.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Rn(f.attempts||{},de.bead_id):null,work_ms:q==="done"?ha(f.attempts||{},de.bead_id):null,done_at:q==="done"&&typeof de.added_at=="number"?de.added_at:void 0,exec_chips:Je?gt(de.bead_id):null,workflow:Je&&v[de.bead_id]||null,from_id:Mr.get(de.bead_id)||void 0,priority:An.get(de.bead_id),...ot(de.bead_id)}}),Pr=f.attempts?Object.values(f.attempts).filter(Or):[],za=new Set;for(let _ of Pr)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&za.add(_.resumed_from);let jl=new Map;for(let _ of Pr)jl.set(_.bead_id,_.attempt_id);let ls=new Map;for(let _ of Pr)ls.set(_.attempt_id,_);function Ha(_){let q=new Set,de=_;for(;de&&!q.has(de.attempt_id);){if(de.conflict_resolution===!0)return!0;q.add(de.attempt_id),de=typeof de.resumed_from=="string"&&de.resumed_from.length>0&&ls.get(de.resumed_from)||null}return!1}let oo=typeof f.declared_base=="string"?f.declared_base:null;function u_(_){let q=null;for(let de of Pr)!de||de.bead_id!==_||Ha(de)||(q===null||(typeof de.started_at=="number"?de.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=de);return q&&typeof q.target_base=="string"?q.target_base:null}let Ga=[],ao=[],d_=vf(f),Bl=_=>{let q=typeof _.session_id=="string"&&_.session_id.length>0,de=za.has(_.attempt_id);return{eligible:q&&!de,reason:q?de?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ln=null;for(let _ of Pr){let q=_.status==="paused"&&!za.has(_.attempt_id);if(_.status==="running"||q)ao.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:sn.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:q,conflict_resolution:Ha(_),base_exception:Cl(oo,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:Fn(so,_.bead_id,{attempt_id:_.attempt_id}),workflow:v[_.bead_id]||null,priority:An.get(_.bead_id),usage:Rn(f.attempts||{},_.bead_id),rollup:ln(_.bead_id),rollup_expanded:ke.has(_.bead_id),exec_chips:ft(_),...ot(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&d_(_)){let de=Bl(_);Ga.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:sn.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Fn(so,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:de.eligible,resume_reason:de.reason,conflict_resolution:Ha(_),base_exception:Cl(oo,_.target_base),workflow:v[_.bead_id]||null,priority:An.get(_.bead_id),usage:Rn(f.attempts||{},_.bead_id),rollup:ln(_.bead_id),rollup_expanded:ke.has(_.bead_id),exec_chips:ft(_),...ot(_.bead_id)}),Ln=_}}let Ul=new Set([...Ga,...ao].map(_=>_.bead_id)),Wl=new Map;for(let _ of Array.isArray(f.session_active)?f.session_active:[]){let q=_&&_.bead_id;if(!(typeof q!="string"||q.length===0||Ul.has(q))){if(Ul.add(q),Array.isArray(_.blocked_by)){let de=_.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0);de.length>0&&Wl.set(q,de)}ao.push({bead_id:q,attempt_id:null,kind:"session",title:_.title||sn.get(q)||q,status:"in_progress",started_at:Wn(_.started_at)??Wn(_.updated_at),updated_at:Wn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:An.get(q),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Ga,...ao].map(_=>{let q=ls.get(_.attempt_id),de=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!de||typeof de!="object")return _;let Ge=typeof de.reason=="string"&&de.reason.length>0?de.reason:null,Je=eo({bead_id:q.bead_id,merge_sha:de.head_sha,cleanup_cursor:de.cursor,cleanup_failed:Ge?{step:de.cursor,reason:Ge}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return Je?{..._,landing:Je}:_}),zl=null;if(Ln){let _=Bl(Ln),q=Ln.cause_detail;zl={bead_id:Ln.bead_id,repo:Ln.repo||"",reason:Ln.cause||Ln.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Ln.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:Fn(so,Ln.bead_id,{attempt_id:Ln.attempt_id})}}let Hl=new Set(Dr.map(_=>_.bead_id)),Ka=Array.isArray(f.merge_queue)?f.merge_queue:[],Gl=new Map,Kl=new Map,Vl=new Map,Yl=new Map,Zl=new Map;Ka.forEach((_,q)=>{_&&typeof _.bead_id=="string"&&(Gl.set(_.bead_id,q+1),Kl.set(_.bead_id,_.resolution),Vl.set(_.bead_id,_.continuation_action||null),Yl.set(_.bead_id,_.head_review||null),Zl.set(_.bead_id,_.authority||null))});let Nr=f.merge_queue_state||{active:null,failures:{}},p_=Nr.failures||{},Ql=Nr.waiting&&typeof Nr.waiting.bead_id=="string"&&typeof Nr.waiting.reason=="string"?Nr.waiting:null,f_=f.auto_merge_skips||{},Xl=_=>{let q=f_[_];if(!q)return null;let de=Rt[_],Ge=de&&de.pr?de.pr.head_sha:null;return Ge&&Ge===q.head_sha?q.reason||"":null},io=new Map;for(let _ of Dr)_.failed!==!0&&_.conflict_resolution&&(_.paused?io.has(_.bead_id)||io.set(_.bead_id,"paused"):io.set(_.bead_id,"running"));let Jl=Dr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,ec=(f.workspace_info||{}).slots,tc=typeof ec=="number"?ec:typeof f.slots=="number"?f.slots:ja,__=Jl>tc,lo=$r(T),m_=(Array.isArray(f.done)?f.done.slice():[]).filter(_=>lo===void 0||typeof _.added_at!="number"||_.added_at>=lo).sort((_,q)=>(q.added_at||0)-(_.added_at||0)),cs=Wa(m_,"done"),g_=new Set((Array.isArray(f.done)?f.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),nc=[],b_=u?.()||"";for(let _ of J){let q=Wn(_.closed_at);if(typeof _.id!="string"||g_.has(_.id)||q===null||lo!==void 0&&q<lo||typeof _.comment_count!="number"||_.comment_count<=0)continue;let de=`${b_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Ge=M.get(de);Ge===void 0&&n&&(M.set(de,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Je=>{let Kt=Array.isArray(Je)&&Je.some(Lt=>ta(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");M.set(de,Kt?"session":"not-session"),Se()}).catch(()=>{M.set(de,"failed"),Se()})),Ge==="session"&&nc.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:_.created_at,updated_at:_.updated_at})}cs.push(...nc),cs.sort((_,q)=>(q.done_at||0)-(_.done_at||0));let co={};for(let _ of Hn)co[_]=0;let rc=!1,sc=0,Va=0,oc=0;for(let _ of cs){let q=_.usage;if(q&&typeof q=="object"){let de=!1;for(let Ge of Hn)Number.isFinite(q[Ge])&&(co[Ge]+=q[Ge],rc=!0,de=!0);de&&(Va+=1,Number.isFinite(q.total_cost_usd)&&(sc+=q.total_cost_usd,oc+=1))}}Va>0&&oc===Va&&(co.total_cost_usd=sc);let ac=cs.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),h_=ac.length>0?dn(Bo(ac)):rc?er(co):null,ic=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},lc=Array.isArray(f.serial_lanes)?f.serial_lanes:[],cc=_=>{if(Xt.some(Ge=>Ge.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Pr.filter(Ge=>Ge&&Ge.bead_id===_),de=q.length>0?q[q.length-1].status:null;return de==="failed"||de==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":de==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},uo=lc.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,q)=>{let de=ic[_.id]||{},Ge=new Map((Array.isArray(de.corrections)?de.corrections:[]).filter(It=>It&&typeof It.bead_id=="string"&&typeof It.after=="string").map(It=>[It.bead_id,It.after])),Je=Array.isArray(de.occupied_by)?de.occupied_by.filter(It=>typeof It=="string"):[],Kt=new Set(Je),Lt=Wa(_.entries.filter(It=>!Hl.has(It.bead_id)&&!Kt.has(It.bead_id)),_.id).map(It=>Ge.has(It.id)?{...It,badges:[`\u{1F517} ${Ge.get(It.id)} \uB4A4 (blocks \uC790\uB3D9)`,...It.badges]}:It),qr=Je.map(It=>({id:It,title:sn.get(It)||It,draggable:!1,lane:_.id,ghost:!0,badges:[cc(It)]}));return{id:_.id,index:q+1,rows:[...qr,...Lt],occupied:Je.length>0,badge:Je.length>0?cc(Je[0]):"\uB300\uAE30",cycle:de.cycle===!0}}),uc=typeof f.serial_lane_count=="number"?f.serial_lane_count:uo.length,Ya=Wa(cn.filter(_=>!Hl.has(_.bead_id)),"queue"),dc=new Map,pc=new Set;for(let[_,q]of Object.entries(ic)){if(!/^s[1-5]$/.test(_))continue;let de=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let Ge of de)typeof Ge=="string"&&dc.set(Ge,_);de.length>0&&pc.add(_)}let ar=[];for(let _ of Dr)typeof _.bead_id=="string"&&ar.push({id:_.bead_id,title:sn.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:dc.get(_.bead_id)??null});for(let _ of Xt){let q=_&&_.bead_id;typeof q!="string"||q.length===0||ar.push({id:q,title:sn.get(q)||q,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of uo)for(let q of _.rows)q.ghost!==!0&&ar.push({id:q.id,title:q.title,location_label:`${_.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:_.id});Ya.forEach((_,q)=>{ar.push({id:_.id,title:_.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let _ of Ua)ar.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let fc={};for(let _ of lc)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(fc[_.id]=_.entries.length);let Za=new Map;for(let _ of ar)Za.has(_.id)||Za.set(_.id,_);N={members_by_id:Za,serial_raw_lengths:fc,serial_lane_count:uc,occupied_lanes:pc};let y_=Yd(f.bead_scope,ar),po=new Map;for(let[_,q]of Wl)po.set(_,q);for(let[_,q]of Fl)po.set(_,q);for(let[_,q]of Object.entries(ae))Array.isArray(q)&&po.set(_,q.filter(de=>typeof de=="string"&&de.length>0));let v_=Op(po,ar,ve),Qa=(_,q=null)=>{let de=y_.get(_),Ge=v_.get(_)||null,Je=de&&de.overlaps.length>0?de.overlaps:null,Kt=!!de&&de.scope_missing;if(!Ge&&!Je&&!Kt)return q;let Lt=Je?G(_,Je):null;return{...q||{},...Ge?{predecessors:Ge}:{},...Je?{overlaps:Je}:{},...Kt?{scope_missing:!0}:{},...Lt?{popover:Lt}:{}}},Xa=_=>{let q=Qa(_.id,_.dependency_chips||null);return q&&(_.dependency_chips=q),_};for(let _ of Ya)Xa(_);for(let _ of uo)for(let q of _.rows)q.ghost!==!0&&Xa(q);for(let _ of Ua)Xa(_);let _c=new Map;for(let _ of Dr){let q=typeof _.bead_id=="string"?_.bead_id:"";if(q.length===0)continue;let de=_.kind==="session",Ge=Qa(q),Je=typeof _.attempt_id=="string"&&_.attempt_id.length>0?ls.get(_.attempt_id):void 0,Kt=Je&&Je.last_activity&&typeof Je.last_activity=="object"?Je.last_activity:null,Lt=Je&&Array.isArray(Je.legs)?Je.legs:[];!Ge&&!Kt&&Lt.length===0&&!de||_c.set(q,{...Kt?{last_activity:Kt}:{},...Lt.length>0?{legs:Lt}:{},...Ge?{dependency_chips:Ge}:{}})}let w_=Xt.map(_=>jv(_.bead_id,sn.get(_.bead_id)||_.bead_id,Rt,Re[_.bead_id]||null,Rn(f.attempts||{},_.bead_id),Yn[_.bead_id]||(ce.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:_e.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),io.get(_.bead_id)||null,_.external===!0,{position:Gl.get(_.bead_id)||0,active:Nr.active===_.bead_id,failure:p_[_.bead_id]||null,waiting:Ql?.bead_id===_.bead_id?Ql.reason:null,resolution:Kl.get(_.bead_id),continuation_action:Vl.get(_.bead_id),head_review:Yl.get(_.bead_id)||null,authority:Zl.get(_.bead_id)||null},_.wt_present!==!1,f.auto_merge===!0?Xl(_.bead_id):null,Cl(oo,u_(_.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[_.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ls.get(jl.get(_.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Qa(_.bead_id))).map(_=>({..._,workflow:v[_.id]||null,priority:An.get(_.id),...ot(_.id)}));return{queue:f,idToTitle:sn,candidates:Ua,candidate_hidden:{blocked:Ba.hidden_blocked,spec:Ba.hidden_spec},running:Dr,live_count:Jl,slots:tc,over_cap:__,failure:zl,waiting:Ya,serial_lanes:uo,serial_lane_count:uc,running_overlays:_c,pr_wait:w_,merge_queue_length:Ka.length,merge_queue_running:Ka.length>0,auto_excluded:Xt.map(_=>_.bead_id).filter(_=>Xl(_)!==null),declared_base:oo,done:cs,token_total:h_,cleanup_failures:_t,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Et(){let w=!!o?.get()?.job,K=!w&&o?.isPending?.()===!0,J=w?"\uBD84\uC11D \uC911":K?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${J?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${J?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${J?c`<span class="worker-analysis-btn__badge">${J}</span>`:""}
    </button>`}function ht(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",K=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,J=on(f),y=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Q=f.queue.auto_advance?0:(Array.isArray(f.queue.queue)?f.queue.queue:[]).filter(gt=>gt&&typeof gt.armed_by_lane=="string"&&gt.armed_by_lane.length>0).length,C=Q>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Q}건 진행 중</span
          >`:"",$e=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${se()} 완료 <b>${f.done.length}</b></span
      >`,et=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Xe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ja}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Df},(gt,ln)=>ln+1).map(gt=>c`<option
                value=${String(gt)}
                ?selected=${f.serial_lane_count===gt}
              >
                ${gt}
              </option>`)}
        </select>
      </label>
      ${o?Et():""} `,ft=tp({failure:f.failure}),tt=Hd(f.repo_operations,f.cleanup_failures);return xe?c`<div class="worker-ribbon">
          ${K} ${J}
          <div class="worker-kpi worker-kpi--ribbon">
            ${y}${C}${$e}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Xe}</div>
          <div class="worker-kpi">${et}</div>
        </div>
        ${tt}${bt.template()}${ft}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${K}${J}${Xe}</div>
        <div class="worker-kpi">
          ${y}${C}${$e}${et}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${se()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(gt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${gt.tooltip}
                >${se()} 완료 · 누적 ${gt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${tt}${bt.template()}${ft}`}function kt(f){let w=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${le.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${vv.map(K=>c`<button
              type="button"
              class="worker-filter__chip${le.spec===K.value?" is-active":""}"
              data-spec=${K.value}
              aria-pressed=${le.spec===K.value?"true":"false"}
            >
              ${K.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Vt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${W}
    >
      ${zf.map(f=>c`<option value=${f.value} ?selected=${W===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function Tt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${T}
      >
        ${Br.map(f=>c`<option value=${f.value} ?selected=${T===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function on(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
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
      </button>`;let K=new Set(f.auto_excluded),J=f.pr_wait.filter(y=>y.merge_action&&y.merge_enabled&&!K.has(y.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${J>0?` ${J}`:""}
    </button>`}function Jt(f){return Aa({parallel:{rows:f.waiting.map(w=>jn(w)),count:f.waiting.length,collapsed:be.isAreaCollapsed("parallel")},serial:{lanes:f.serial_lanes.map(w=>({id:w.id,title:`\uC9C1\uB82C ${w.index}`,rows:w.rows.map(K=>jn(K)),count:w.rows.length,empty:w.rows.length===0,badge:w.badge,held:w.occupied,cycle:w.cycle})),collapsed:be.isAreaCollapsed("serial")}})}function en(f){return np(f.running,Date.now(),ie,f.running_overlays)}function Gt(f){return f.running.some(w=>w.kind!=="session"&&!w.paused&&w.failed!==!0)}function tn(f){let w=Kn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Vt(),controls:kt(f),collapsible:!0,collapsed:be.isCollapsed("candidate"),place_menu:it(f.candidates),onOpenDoc:m?(J,y)=>m(y):void 0}),K=Kn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${se()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Tt(),collapsible:!0,collapsed:be.isCollapsed("done"),preview:xe?Array.isArray(f.token_total)?f.token_total.map(J=>J.label).join(" \xB7 "):f.token_total||Ff(f.done):void 0});return xe?c`<div class="worker-lanes worker-lanes--mobile">
        ${Sa({live:Gt(f),running_body:f.running.length>0?en(f):"",pr_wait_rows:f.pr_wait.map(J=>jn(J)),count:f.running.length+f.pr_wait.length})}
        ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,count:f.waiting.length,collapsible:!0,collapsed:be.isCollapsed("queue"),preview:Ff(f.waiting),body:Jt(f)})}
        ${w} ${K}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,count:f.waiting.length,collapsible:!0,collapsed:be.isCollapsed("queue"),body:Jt(f)})}
      ${Kn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:f.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${f.slots}</span
        >`,live:Gt(f),collapsible:!0,collapsed:be.isCollapsed("running"),body:en(f)})}
      ${Kn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:be.isCollapsed("pr_wait")})}
      ${K}
    </div>`}function an(f){be.toggle(f),Se()}function wn(f){be.toggleArea(f),Se()}function Se(){let f=ge();st(ht(f),Fe),st(tn(f),R)}function De(){let f=!0,w=_a(K=>{if(xe=K,f){f=!1;return}Se()});D.push(w)}let O=null;function he(f){O=f.target instanceof Element?f.target:null}function Me(f){let K=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!K)return;if(O&&K.contains(O)&&O.closest("input, button, a")){f.preventDefault();return}let J=K.dataset.beadId||"",y=K.dataset.lane||"";V={bead_id:J,from_lane:y},pe.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",J),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function yt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let K=w.dataset.lane||"";K!=="candidate"&&K!=="queue"&&!/^s[1-5]$/.test(K)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Dt(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ct(){pe.classList.remove("is-dragging")}function Yt(f,w){let K=Z.find(C=>C.id===f);if(!K)return;let J=Z.filter(C=>C.id!==f),y=J.length;if(w){let C=w.dataset.beadId;if(C===f)return;let $e=J.findIndex(et=>et.id===C);$e>=0&&(y=$e)}let Q=J.slice();Q.splice(y,0,K),F.applyReorder(f,Q,y)}function Nt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over"),pe.classList.remove("is-dragging");let K=w.dataset.lane||"",J=V?.bead_id||f.dataTransfer?.getData("text/plain")||"",y=V?.from_lane||"";if(V=null,!J)return;let Q=f.target?.closest?.(".worker-mini, .worker-card"),C=K==="queue"&&w.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||w,$e=Array.from(C.querySelectorAll(".worker-mini, .worker-card")),et=$e.length;if(Q){let Xe=$e.indexOf(Q);Xe>=0&&(et=Xe)}if(et=Math.max(0,et-C.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(et=ze()),K==="candidate"){if(y==="candidate"){Yt(J,Q);return}(y==="queue"||/^s[1-5]$/.test(y))&&pt(J);return}if(K==="queue"||/^s[1-5]$/.test(K)){let Xe=K==="queue"?"parallel":K;y===K?ut(J,Xe,et):lt(J,Xe)}}function nn(f){le=f,hv(f),Se()}function kn(f){W=Hf(f),kv(W),Se()}function qt(f){T=Un(f),xv(T),b?.(T),Se()}function $n(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let $e=Number.parseInt(w.value,10);Number.isFinite($e)&&Ee($e).then(Se);return}let K=f.target?.closest?.(".worker-filter__blocked");if(K){nn({...le,show_blocked:K.checked});return}let J=f.target?.closest?.(".worker-done-range");if(J){qt(J.value);return}let y=f.target?.closest?.(".worker-sort");if(y){kn(y.value||Rl);return}let Q=f.target?.closest?.(".worker-slots__input");if(!Q)return;let C=Number.parseInt(Q.value,10);if(!Number.isFinite(C)){Se();return}fe(C).then(Se)}function xn(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function Vn(){let f=ge();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function E(){ie&&Ne.close(),ct.hidden=!1,dt.hidden=!1,Ye.open(Vn()),Se()}function I(f){let w=te(),K=w.attempts?w.attempts[f]:null;ie=f,Le=null,Ye.close(),ct.hidden=!0,dt.hidden=!1,Ne.open({attempt_id:f,meta:xn(K)}),Se()}function Ue(f){let w=te(),K=(Array.isArray(w.session_active)?w.session_active:[]).find(y=>y&&y.bead_id===f),J=(K&&Array.isArray(K.session_refs)?K.session_refs:[]).find(y=>y&&y.current===!0);J&&(Ye.close(),ct.hidden=!0,dt.hidden=!1,Ne.open(Zr(J,f,"in_progress")),Se())}function Ke(f,w){ie=null,Le=f,Ye.close(),ct.hidden=!0,dt.hidden=!1,Ne.open({attempt_id:f,meta:w,hide_prompt:!0}),Se()}function rt(){if(Ye.isOpen()&&Ye.refresh(Vn()),Le){let K=(o?.get()?.runs||[]).find(J=>J.run_id===Le);K?Ne.updateMeta(El(K)):Ne.close();return}if(!ie)return;let f=te(),w=f.attempts?f.attempts[ie]:null;if(w){Ne.updateMeta(xn(w));return}Ne.close()}function vt(f,w){if(f.length===0||!l)return;let K=u?u():void 0;if(w.length===0||!K||w===K||!d){l(f);return}Promise.resolve(d(w)).then(()=>{l(f)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Zt(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let K=w?.closest?.(".worker-dep__open");if(K){vt(K.getAttribute("data-dep-id")||"",K.getAttribute("data-root-dir")||"");return}let J=w?.closest?.(".mon-overlap__chip");if(J){let Re=J.closest("[data-bead-id]"),_t=Re&&Re.getAttribute("data-bead-id")||"";if(_t){let cn=J.getAttribute("data-overlap-id")||"";B=!!B&&B.bead_id===_t&&B.counterpart_id===cn?null:{bead_id:_t,counterpart_id:cn},Se()}return}let y=w?.closest?.(".mon-overlap__place");if(y){let Re=y.closest("[data-bead-id]"),_t=Re&&Re.getAttribute("data-bead-id")||"";_t&&Ve(_t,y.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){oe?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){E();return}let Q=w?.closest?.(".worker-repo-op__session");if(Q){let Re=Q.dataset.attemptId;Re&&I(Re);return}let C=w?.closest?.(".worker-repo-op__resolve");if(C){L(C.dataset.operationId||"");return}let $e=w?.closest?.(".worker-repo-op__dismiss");if($e){ne($e.dataset.operationId||"");return}let et=w?.closest?.(".worker-cleanup__resume");if(et){let Re=et.dataset.beadId;Re&&Qe(Re);return}let Xe=w?.closest?.(".worker-banner__resume");if(Xe){let Re=Xe.dataset.attemptId;Re&&Ht(Re);return}let ft=w?.closest?.(".worker-banner__discard");if(ft){let Re=ft.dataset.confirmation==="merged"?"merged":"unmerged";S(ft.dataset.beadId||"",ft.dataset.attemptId||null,Re,ft.dataset.operationId||null);return}let tt=w?.closest?.(".worker-banner__dismiss");if(tt){let Re=tt.dataset.attemptId;Re&&Ut(Re);return}if(w?.closest?.(".worker-play")){x(!te().auto_advance);return}let gt=w?.closest?.(".worker-merge-all");if(gt){gt.classList.contains("worker-merge-all--stop")?te().auto_merge===!0?P(!1):ye():P(!0);return}let ln=w?.closest?.(".worker-pane__toggle[data-lane]");if(ln){let Re=ln.dataset.lane;(Re==="candidate"||Re==="queue"||Re==="running"||Re==="pr_wait"||Re==="done")&&an(Re);return}let br=w?.closest?.(".worker-wait__area-toggle[data-area]");if(br){let Re=br.dataset.area;(Re==="parallel"||Re==="serial")&&wn(Re);return}let sn=w?.closest?.(".worker-card__place-lane");if(sn){let Re=sn.dataset.beadId,_t=sn.dataset.lane;Re&&(_t==="parallel"||/^s[1-5]$/.test(_t||""))&&(X=null,Se(),lt(Re,_t));return}if(w?.closest?.(".worker-card__place-cancel")){X=null,Se();return}let An=w?.closest?.(".worker-card__place");if(An){let Re=An.dataset.beadId;Re&&!An.disabled&&(je()?(X=Re,Se()):lt(Re,"parallel"));return}let p=w?.closest?.(".worker-filter__chip");if(p){let Re=p.dataset.spec;(Re==="all"||Re==="with"||Re==="without")&&nn({...le,spec:Re});return}let g=w?.closest?.(".worker-mini__merge");if(g){let Re=g.dataset.beadId||"";te().cleanup_failed?.[Re]?Qe(Re):St(Re);return}let v=w?.closest?.(".worker-mini__merge-cancel");if(v){re(v.dataset.beadId||"");return}let $=w?.closest?.(".worker-mini__discard");if($){S($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let j=w?.closest?.(".worker-mini__stale-continue");if(j){H("worker-stale-work-continue",j.dataset.beadId||"",j.dataset.actionId||"");return}let z=w?.closest?.(".worker-mini__stale-backup");if(z){H("worker-stale-work-backup-fresh",z.dataset.beadId||"",z.dataset.actionId||"");return}let ae=w?.closest?.(".worker-mini__stale-recheck");if(ae){H("worker-stale-work-recheck",ae.dataset.beadId||"",ae.dataset.actionId||"");return}let ve=w?.closest?.(".worker-mini__revise-fix");if(ve){Oe("worker-revise-fix",ve.dataset.beadId||"");return}let Ze=w?.closest?.(".worker-mini__revise-approve");if(Ze){Oe("worker-revise-approve",Ze.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Re=w?.closest?.(".rtile"),_t=Re?.dataset?.beadId,cn=Re?.dataset?.attemptId;_t&&S(_t,cn||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let _t=w?.closest?.(".rtile")?.dataset?.attemptId;_t&&Ut(_t);return}if(w?.closest?.(".rtile__pause")){let _t=w?.closest?.(".rtile")?.dataset?.attemptId;_t&&Pt(_t);return}if(w?.closest?.(".rtile__resume")){let _t=w?.closest?.(".rtile")?.dataset?.attemptId;_t&&Ht(_t);return}if(w?.closest?.(".rtile__session")){let Re=w?.closest?.(".rtile"),_t=Re?.dataset?.attemptId;if(_t){I(_t);return}let cn=Re?.dataset?.beadId;cn&&Ue(cn);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),Ne.close();return}if(w?.closest?.(".worker-drawer-host"))return;let ot=w?.closest?.(".rtile .board-card__roll-toggle");if(ot){let Re=ot.dataset.rollParent;Re&&(ke.has(Re)?ke.delete(Re):ke.add(Re),Se());return}let Xt=w?.closest?.(".rtile .board-card__roll-child");if(Xt){let Re=Xt.dataset.childId;Re&&l&&l(Re);return}let Rt=w?.closest?.(".rtile");if(Rt){if(w?.closest?.(".rtile__id")){let _t=Rt.dataset.beadId;_t&&Sn(_t).then(cn=>{cn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Re=Rt.dataset.beadId;Re&&l&&l(Re);return}let Yn=w?.closest?.(".worker-mini, .worker-card");if(Yn){let Re=Yn.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Re&&Sn(Re).then(cn=>{cn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let _t=w?.closest?.(".ctl-chip--from");if(_t){let cn=_t.dataset.fromId;cn&&l&&l(cn);return}Re&&l&&l(Re)}}e.addEventListener("pointerdown",he),e.addEventListener("dragstart",Me),e.addEventListener("dragover",yt),e.addEventListener("dragleave",Dt),e.addEventListener("dragend",Ct),e.addEventListener("drop",Nt),e.addEventListener("click",Zt),e.addEventListener("change",$n);function gr(f){if(!B)return;let w=f.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(B=null,Se())}function Ir(f){f.key!=="Escape"||!B||(B=null,Se())}return document.addEventListener("click",gr),document.addEventListener("keydown",Ir),D.push(()=>{document.removeEventListener("click",gr),document.removeEventListener("keydown",Ir)}),De(),k&&D.push(k.subscribe(()=>{for(let[f,w]of M)w==="failed"&&M.delete(f);Se()})),s&&D.push(s.subscribe(()=>{let f=u&&u()||"";f!==mt&&(mt=f,nt.close()),Se(),rt()})),o&&typeof o.subscribe=="function"&&D.push(o.subscribe(()=>{rt(),Se()})),Se(),{load(){Ae(),Se()},refreshSessionDefaults:We,destroy(){for(let f of D.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",he),e.removeEventListener("dragstart",Me),e.removeEventListener("dragover",yt),e.removeEventListener("dragleave",Dt),e.removeEventListener("dragend",Ct),e.removeEventListener("drop",Nt),e.removeEventListener("click",Zt),e.removeEventListener("change",$n);try{Ne.destroy()}catch{}dt.hidden=!0;try{oe?.destroy()}catch{}try{nt.destroy()}catch{}st(c``,e)}}}function Ll(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Kf(e,t,n,r=async()=>{},s=async()=>{}){let o=Bt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(W){let M=W.target.value,be=t.getState().workspace?.current?.path||"";if(M&&M!==be){o("switching workspace to %s",M),i=!0,N();try{await n(M)}catch(xe){o("workspace switch failed: %o",xe)}finally{i=!1,N()}}}async function m(){let W=t.getState(),T=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!T||l)){o("git-pulling workspace %s",T),l=!0,N();try{await r(T)}catch(M){o("workspace git pull failed: %o",M)}finally{l=!1,N()}}}function h(W){let T=W.target;T&&e.contains(T)||F()}function b(W){W.key==="Escape"&&F()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),N())}function F(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),N())}function V(){u?F():k()}async function Z(W){let T=W.target,M=T.value,se=T.checked;o("toggling visibility %s \u2192 %s",M,String(se));try{await s(M,se)}catch(be){o("workspace visibility toggle failed: %o",be)}}function le(W){return W?c`
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
    `:c``}function X(W,T){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${V}
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
                ${W.map(M=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${M.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${M.path}"
                        .checked=${!T.has(M.path)}
                        @change=${Z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ll(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let W=t.getState(),T=W.workspace?.current,M=W.workspace?.available||[],se=new Set(W.workspace?.hidden||[]),be=T?.path||M[0]?.path||"";if(M.length===0)return c``;let xe=M.filter(ce=>!se.has(ce.path)||ce.path===be);if(xe.length<=1){let ce=xe[0]||M[0],_e=Ll(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${_e}</span
          >
          ${X(M,se)}
          ${le(be)}
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
          ${xe.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===be}
                title="${ce.path}"
              >
                ${Ll(ce.path)}
              </option>
            `)}
        </select>
        ${X(M,se)}
        ${le(be)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function N(){st(B(),e)}return N(),a=t.subscribe(()=>N()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),st(c``,e)}}}var Vf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Il(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Yf(e,t,n=Il()){return{id:n,type:e,payload:t}}function Zf(e={}){let t=Bt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],m=new Map,h=new Set;function b(B){for(let N of Array.from(h))try{N(B)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),N=(n.jitterRatio||0)*B,W=Math.max(0,Math.round(B+(Math.random()*2-1)*N));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,X()},W)}function F(B){try{s?.send(JSON.stringify(B))}catch(N){t("ws send failed",N)}}function V(){for(o="open",t("ws open"),b(o),a=0;d.length;){let B=d.shift();B&&F(B)}}function Z(B){let N;try{N=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){t("ws received invalid envelope");return}if(u.has(N.id)){let T=u.get(N.id);u.delete(N.id),N.ok?T?.resolve(N.payload):T?.reject(N.error||new Error("ws error"));return}let W=m.get(N.type);if(W&&W.size>0)for(let T of Array.from(W))try{T(N.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",N.type)}function le(){o="closed",t("ws closed"),b(o);for(let[B,N]of u.entries())N.reject(new Error("ws disconnected")),u.delete(B);a+=1,k()}function X(){if(!l)return;let B=r();try{s=new WebSocket(B),t("ws connecting %s",B),o="connecting",b(o),s.addEventListener("open",V),s.addEventListener("message",Z),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(N){t("ws connect failed %o",N),k()}}return X(),{send(B,N){if(!Vf.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let W=Il(),T=Yf(B,N,W);return t("send %s id=%s",B,W),new Promise((M,se)=>{u.set(W,{resolve:M,reject:se,type:B}),s&&s.readyState===s.OPEN?F(T):(t("queue %s id=%s (state=%s)",B,W,o),d.push(T))})},on(B,N){m.has(B)||m.set(B,new Set);let W=m.get(B);return W?.add(N),()=>{W?.delete(N)}},onConnection(B){return h.add(B),()=>{h.delete(B)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,X()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Bv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Uv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ml=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Qf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],_r="tab:worker:closed",Wv="bdui.worker.done-range",Xf=Xp,Jf="worker:queue",e_="worker:parallel-analysis",t_="ui:order",n_="ui:display-policy",r_="exec:presets",mr="tab:board:closed",s_="beads-ui.board.closed-range";function zv(e){let t=Bt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;st(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&yf(a),i&&l&&u&&d){let D=function(E,I){let Ue="Request failed",Ke="";if(E&&typeof E=="object"){let vt=E;if(typeof vt.message=="string"&&vt.message.length>0&&(Ue=vt.message),typeof vt.details=="string")Ke=vt.details;else if(vt.details&&typeof vt.details=="object")try{Ke=JSON.stringify(vt.details,null,2)}catch{Ke=""}}else typeof E=="string"&&E.length>0&&(Ue=E);let rt=I&&I.length>0?`Failed to load ${I}`:"Request failed";Y.open(rt,Ue,Ke)},je=function(E){return`${Se.getState().workspace.current?.path||""}\0${E}`},it=function(){Le&&(Le().catch(()=>{}),Le=null),Ne=null,Ye=null},we=function(E){nt=E;let I=()=>{nt!==E||Se.getState().selected_id!==E||(nt=null,He(E))};if(!oe){bt.then(I);return}I()},pt=function(E,I,Ue,Ke,rt){return Ue!==ut[I]?(rt().catch(()=>{}),!1):(E.set(Ke,rt),!0)},Ht=function(){let E=Se.getState();Pe(E.view==="board"),Oe(E.view==="worker"),Ee(E.view==="monitor"),L(E.view==="board"||E.view==="worker"||Pt||!!E.selected_id)},St=function(){let E=$r(Ut);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},Qe=function(){let E=$r(xt);return E===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:E}}},Pe=function(E){if(E)for(let[I,Ue]of Ml){if(ze.has(I)||lt.has(I))continue;let Ke=I===mr?St():{type:Ue};try{pe.register(I,Ke)}catch(Zt){t("register %s store failed: %o",I,Zt)}lt.add(I);let rt=ut.board,vt=!1;We.subscribeList(I,Ke).then(Zt=>{vt=!pt(ze,"board",rt,I,Zt)}).catch(Zt=>{t("subscribe %s failed: %o",I,Zt),D(Zt,"board")}).finally(()=>{lt.delete(I),vt&&Ht()})}else ye()},ye=function(){ut.board+=1;for(let[E]of Ml){let I=ze.get(E);I&&(I().catch(()=>{}),ze.delete(E));try{pe.unregister(E)}catch(Ue){t("unregister %s failed: %o",E,Ue)}}},Oe=function(E){if(!E){x();return}for(let[I,Ue]of Qf){if(S.has(I)||lt.has(I))continue;let Ke=I===_r?Qe():{type:Ue};try{pe.register(I,Ke)}catch(Zt){t("register %s store failed: %o",I,Zt)}lt.add(I);let rt=ut.worker,vt=!1;We.subscribeList(I,Ke).then(Zt=>{vt=!pt(S,"worker",rt,I,Zt)}).catch(Zt=>{t("subscribe %s failed: %o",I,Zt),D(Zt,"worker")}).finally(()=>{lt.delete(I),vt&&Ht()})}},x=function(){ut.worker+=1;for(let[E]of Qf){let I=S.get(E);I&&(I().catch(()=>{}),S.delete(E));try{pe.unregister(E)}catch(Ue){t("unregister %s failed: %o",E,Ue)}}},L=function(E){if(!E){ne();return}H||(Ae("subscribe-worker-queue",{id:Jf}).catch(I=>{t("subscribe-worker-queue failed: %o",I)}),Ae("subscribe-worker-parallel-analysis",{id:e_}).catch(I=>{t("subscribe-worker-parallel-analysis failed: %o",I)}),H=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:e_}),Ae("unsubscribe-worker-queue",{id:Jf})))},ne=function(){H&&(H().catch(()=>{}),H=null),dt.clear()},Ee=function(E){if(!E){A();return}fe||(Ae("subscribe-monitor-pipeline",{id:Xf}).catch(I=>{t("subscribe-monitor-pipeline failed: %o",I)}),fe=()=>Ae("unsubscribe-monitor-pipeline",{id:Xf}))},A=function(){fe&&(fe().catch(()=>{}),fe=null)},G=function(){U||(Ae("subscribe-ui-order",{id:t_}).catch(E=>{t("subscribe-ui-order failed: %o",E)}),U=()=>Ae("unsubscribe-ui-order",{id:t_}))},Ve=function(){U&&(U().catch(()=>{}),U=null),$t.clear()},ge=function(){Be||(Ae("subscribe-display-policy",{id:n_}).catch(E=>{t("subscribe-display-policy failed: %o",E)}),Be=()=>Ae("unsubscribe-display-policy",{id:n_}))},Et=function(){Be&&(Be().catch(()=>{}),Be=null),ct.clear()},kt=function(){ht||(Ae("subscribe-impl-presets",{id:r_}).catch(E=>{t("subscribe-impl-presets failed: %o",E)}),ht=()=>Ae("unsubscribe-impl-presets",{id:r_}))},Gt=function(E){if(!E)return"Unknown";let I=E.split("/").filter(Boolean);return I.length>0?I[I.length-1]:"Unknown"},Nt=function(E,I){Yt.open(E.path,{missing_state:E.missing_state,...I?{workspace:I}:{}})};var m=D,h=je,b=it,k=we,F=pt,V=Ht,Z=St,le=Qe,X=Pe,B=ye,N=Oe,W=x,T=L,M=ne,se=Ee,be=A,xe=G,ce=Ve,_e=ge,Te=Et,qe=kt,ke=Gt,ee=Nt;let Ce=document.getElementById("header-loading"),Ie=Xc(Ce),Y=Ud(e),me=Zf(),Ae=Ie.wrapSend((E,I)=>me.send(E,I)),We=zc(Ae),pe=Hc(),Fe=Vc(),dt=Kc(),at=Rc(),$t=Gc(),ct=Tc(),R=Cc(),ie=Oc();me.on("impl-presets-snapshot",E=>{let I=E;I&&typeof I.revision=="number"&&Array.isArray(I.presets)&&R.set({revision:I.revision,presets:I.presets})}),me.on("monitor-pipeline-snapshot",E=>{let I=E;if(!(!I||!Array.isArray(I.workspaces)))try{at.set(I.workspaces,I.workspaces_state,I.cross_lanes)}catch{}}),me.on("ui-order-snapshot",E=>{let I=E;if(I&&typeof I.revision=="number")try{$t.set({revision:I.revision,order:I.order&&typeof I.order=="object"?I.order:{}})}catch{}}),me.on("display-policy-snapshot",E=>{let I=E;if(I&&I.policy&&typeof I.policy=="object")try{ct.set(I.policy)}catch{}}),me.on("session-log-snapshot",E=>{let I=E;if(I&&typeof I.id=="string")try{ie.set(I.id,Array.isArray(I.lines)?I.lines:[],typeof I.last_event_at=="number"?I.last_event_at:null)}catch{}}),me.on("session-log-append",E=>{let I=E;if(I&&typeof I.id=="string")try{ie.append(I.id,I.event)}catch{}}),me.on("snapshot",E=>{let I=E,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="snapshot")try{Ke.applyPush(I)}catch{}}),me.on("upsert",E=>{let I=E,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="upsert")try{Ke.applyPush(I)}catch{}}),me.on("delete",E=>{let I=E,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="delete")try{Ke.applyPush(I)}catch{}});let Le=null,Ne=null,Ye=null,nt=null,mt=()=>{},bt=new Promise(E=>{mt=()=>E(void 0)}),oe=!1,te=!1;async function He(E){let I=je(E);if(I===Ne||I===Ye)return;Ye=I;let Ue=`detail:${E}`,Ke={type:"issue-detail",params:{id:E}};try{pe.register(Ue,Ke)}catch(rt){t("register detail store failed: %o",rt)}try{let rt=await We.subscribeList(Ue,Ke);if(Se.getState().selected_id!==E||je(E)!==I){await rt().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=rt,Ne=I}catch(rt){t("detail subscribe failed: %o",rt),D(rt,"issue details")}finally{Ye===I&&(Ye=null)}}let ze=new Map,lt=new Set,ut={board:0,worker:0},Pt=!1,Ut=wo;try{let E=window.localStorage.getItem(s_);ii(E)&&(Ut=E)}catch{}let xt="today";try{let E=window.localStorage.getItem(Wv);E!==null&&(xt=Un(E))}catch{}async function P(E){if(!ii(E)||E===Ut)return;Ut=E;try{window.localStorage.setItem(s_,E)}catch{}let I=ze.get(mr);if(!I)return;ze.delete(mr),await I().catch(()=>{});let Ue=St();try{pe.register(mr,Ue)}catch(Ke){t("register %s store failed: %o",mr,Ke)}try{let Ke=await We.subscribeList(mr,Ue);ze.set(mr,Ke)}catch(Ke){t("re-subscribe %s failed: %o",mr,Ke),D(Ke,"board")}}async function re(E){let I=Un(E);if(I===xt)return;xt=I;let Ue=S.get(_r);if(!Ue)return;S.delete(_r),await Ue().catch(()=>{});let Ke=Qe();try{pe.register(_r,Ke)}catch(rt){t("register %s store failed: %o",_r,rt)}try{let rt=await We.subscribeList(_r,Ke);S.set(_r,rt)}catch(rt){t("re-subscribe %s failed: %o",_r,rt),D(rt,"worker")}}let S=new Map,H=null,fe=null,U=null,Be=null,ht=null;async function Vt(){Be=null,ct.clear(),ht=null,R.clear(),H=null,fe=null,ze.clear(),S.clear(),ut.board+=1,ut.worker+=1,kt();let E=Se.getState().workspace.current?.path;if(E)try{await me.send("set-workspace",{path:E})}catch(Ue){t("workspace restore after reconnect failed: %o",Ue);return}ge();let I=Se.getState();Pe(I.view==="board"),Oe(I.view==="worker"),Ee(I.view==="monitor"),L(I.view==="board"||I.view==="worker"||!!I.selected_id)}async function Tt(){t("clearing all subscriptions for workspace switch"),ye(),x(),ne(),Fe.clear(),Ve(),G(),Et(),ge(),it();let E=Se.getState();if(E.selected_id)try{pe.unregister(`detail:${E.selected_id}`)}catch{}let I=Se.getState();Pe(I.view==="board"),Oe(I.view==="worker"),Ee(I.view==="monitor"),L(I.view==="board"||I.view==="worker"||!!I.selected_id),I.selected_id&&we(I.selected_id)}async function on(E){t("requesting workspace switch to %s",E),te=!0;try{let I=await me.send("set-workspace",{path:E});t("workspace switch result: %o",I),I&&I.workspace&&(Se.setState({workspace:{current:{path:I.workspace.root_dir,database:I.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",E),I.changed&&(await Tt(),ue("Switched to "+Gt(E),"success",2e3)))}catch(I){throw t("workspace switch failed: %o",I),ue("Failed to switch workspace","error",3e3),I}finally{te=!1}}async function Jt(E){t("requesting workspace git pull for %s",E);try{let I=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",I);let Ue=I?.status;if(Ue==="up_to_date"){ue("Already up to date","success",2e3);return}if(Ue==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Gt(E),"success",2e3)}catch(I){t("workspace git pull failed: %o",I);let Ue=I?.code,Ke=I?.message;if(Ue==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ue==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ue==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let rt=Ke?`: ${Ke}`:"";throw ue(`Git pull failed${rt}`,"error",3e3),I}}async function en(E,I){t("setting workspace visibility %s \u2192 %s",E,String(I));try{await me.send("set-workspace-visibility",{path:E,visible:I}),await tn()}catch(Ue){t("workspace visibility update failed: %o",Ue),ue("Failed to update project visibility","error",3e3)}}async function tn(){try{let E=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",E),E&&Array.isArray(E.workspaces)){let I=E.workspaces.map(vt=>({path:vt.path,database:vt.database,pid:vt.pid,version:vt.version})),Ue=E.current?{path:E.current.root_dir,database:E.current.db_path}:null,Ke=Array.isArray(E.hidden)?E.hidden.filter(vt=>typeof vt=="string"):[];Se.setState({workspace:{current:Ue,available:I,hidden:Ke}});let rt=window.localStorage.getItem("beads-ui.workspace");rt&&(!I.some(Zt=>Zt.path===rt)||Ke.includes(rt)?window.localStorage.removeItem("beads-ui.workspace"):Ue&&rt!==Ue.path&&(t("restoring saved workspace preference: %s",rt),await on(rt)))}}catch(E){t("failed to load workspaces: %o",E)}}me.on("workspace-changed",E=>{t("workspace-changed event: %o",E),E&&E.root_dir&&(Se.setState({workspace:{current:{path:E.root_dir,database:E.db_path}}}),tn(),Tt())});let an=!1;if(typeof me.onConnection=="function"){let E=I=>{t("ws state %s",I),I==="reconnecting"||I==="closed"?(an=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):I==="open"&&an&&(an=!1,ue("Reconnected","success",2200),Uv(Se,(Ue,Ke)=>{t(`${Ue}: %o`,Ke)}),Vt())};me.onConnection(E)}let wn="board";try{let E=window.localStorage.getItem("beads-ui.view");(E==="board"||E==="worker"||E==="monitor")&&(wn=E)}catch(E){t("view parse error: %o",E)}let Se=Qc({config:Bv(),view:wn});me.on("worker-queue-snapshot",E=>{let I=E;if(!I||!I.queue)return;let Ue=Se.getState().workspace.current?.path;if(typeof Ue=="string"&&Ue.length>0&&I.root_dir!==Ue){t("dropping worker-queue snapshot for %s",String(I.root_dir));return}try{Fe.set(I.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",E=>{let I=E;if(!I)return;let Ue=Se.getState().workspace.current?.path;if(!(typeof Ue=="string"&&Ue.length>0&&typeof I.root_dir=="string"&&I.root_dir!==Ue))try{dt.set({settings:I.settings,job:I.job??null,runs:Array.isArray(I.runs)?I.runs:[],last_good:I.last_good??null})}catch{}});let De=Yc(Se);De.start();let O=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),he=async(E,I)=>{try{return await Ae(E,I)}catch(Ue){if(O.has(E))throw Ue;return[]}};ef({global_element:r,repo_element:s},Se,De);let Me=document.getElementById("workspace-picker");Me&&Kf(Me,Se,on,Jt,en);let yt=sf(e,(E,I)=>Ae(E,I));try{let E=document.getElementById("new-issue-btn");E&&E.addEventListener("click",()=>yt.open())}catch{}let Dt=cf(e,{policyStore:ct,queueStore:Fe,implPresetStore:R,transport:(E,I)=>Ae(E,I),onOpenChange:E=>{let I=Pt;Pt=E,Ht(),I&&E===!1&&kn.refreshSessionDefaults()},labelOptions:()=>{let E=new Set;for(let[I]of Ml)for(let Ue of pe.snapshotFor(I)||[]){let Ke=Ue.labels;if(Array.isArray(Ke))for(let rt of Ke)typeof rt=="string"&&rt.length>0&&E.add(rt)}return Array.from(E).sort()}});try{let E=document.getElementById("display-settings-btn");E&&(E.setAttribute("aria-label","\uC124\uC815"),E.setAttribute("title","\uC124\uC815"),E.addEventListener("click",()=>Dt.open()))}catch{}let Ct=document.createElement("div");Ct.className="md-viewer-root",document.body.appendChild(Ct);let Yt=pa(Ct,{getWorkspacePath:()=>Se.getState().workspace.current?.path}),nn=fu(i,{gotoIssue:E=>De.gotoIssue(E),issueStores:pe,transport:he,workerQueueStore:Fe,uiOrderStore:$t,displayPolicyStore:ct,closedRange:Ut,onClosedRangeChange:E=>{P(E)},onNewIssue:()=>yt.open(),openDoc:Nt}),kn=Ol(l,{transport:he,issueStores:pe,queueStore:Fe,analysisStore:dt,sessionLogStore:ie,uiOrderStore:$t,gotoIssue:E=>Se.setState({selected_id:E}),getWorkspacePath:()=>Se.getState().workspace.current?.path,switchWorkspace:E=>on(E),openDoc:Nt,doneRange:xt,onDoneRangeChange:E=>{re(E)}}),qt=Jp(u,{transport:he,pipelineStore:at,execPresetStore:R,sessionLogStore:ie,router:De,gotoIssue:E=>De.gotoIssue(E),getWorkspacePath:()=>Se.getState().workspace.current?.path,switchWorkspace:E=>on(E),openDoc:Nt}),$n=Bd(d,{issueStores:pe,transport:he,queueStore:Fe,execPresetStore:R,sessionLogStore:ie,getWorkspacePath:()=>Se.getState().workspace.current?.path,mdViewer:Yt,onNavigate:E=>{Se.getState().view==="worker"?Se.setState({selected_id:E}):De.gotoIssue(E)},onClose:()=>{let E=Se.getState();Se.setState({selected_id:null});try{De.gotoView(E.view==="worker"||E.view==="monitor"?E.view:"board")}catch{}},onOpenExecPresets:()=>{Dt.open("execution")}}),xn=Se.getState().selected_id;xn&&(d.hidden=!1,$n.load(xn),we(xn)),Se.subscribe(E=>{let I=E.selected_id;I?(d.hidden=!1,$n.load(I),te||we(I)):($n.clear(),d.hidden=!0,it())});let Vn=E=>{i.hidden=E.view!=="board",l.hidden=E.view!=="worker",u.hidden=E.view!=="monitor",o&&o.classList.toggle("is-quiet",E.view==="monitor"),Pe(E.view==="board"),Oe(E.view==="worker"),Ee(E.view==="monitor"),L(E.view==="board"||E.view==="worker"||Pt||!!E.selected_id),!E.selected_id&&E.view==="board"&&nn.load(),E.view==="worker"&&kn.load(),E.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",E.view)};Se.subscribe(Vn),Vn(Se.getState()),G(),ge(),kt(),tn().finally(()=>{oe=!0,mt()}),window.addEventListener("keydown",E=>{let I=E.ctrlKey||E.metaKey,Ue=String(E.key||"").toLowerCase(),Ke=E.target,rt=Ke&&Ke.tagName?String(Ke.tagName).toLowerCase():"",vt=rt==="input"||rt==="textarea"||rt==="select"||Ke&&typeof Ke.isContentEditable=="boolean"&&Ke.isContentEditable;I&&Ue==="n"&&(vt||(E.preventDefault(),yt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&zv(t)});export{zv as bootstrap,Bv as readBootstrapConfig,Uv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
