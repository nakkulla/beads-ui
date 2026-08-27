var S_=Object.create;var ei=Object.defineProperty;var E_=Object.getOwnPropertyDescriptor;var T_=Object.getOwnPropertyNames;var C_=Object.getPrototypeOf,R_=Object.prototype.hasOwnProperty;var O_=(e,t,n)=>t in e?ei(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ti=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var L_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of T_(t))!R_.call(e,s)&&s!==n&&ei(e,s,{get:()=>t[s],enumerable:!(r=E_(t,s))||r.enumerable});return e};var I_=(e,t,n)=>(n=e!=null?S_(C_(e)):{},L_(t||!e||!e.__esModule?ei(n,"default",{value:e,enumerable:!0}):n,e));var Pt=(e,t,n)=>O_(e,typeof t!="symbol"?t+"":t,n);var Ic=ti((sw,Lc)=>{var Ur=1e3,Wr=Ur*60,zr=Wr*60,xr=zr*24,D_=xr*7,N_=xr*365.25;Lc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return q_(e);if(n==="number"&&isFinite(e))return t.long?j_(e):F_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function q_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*N_;case"weeks":case"week":case"w":return n*D_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Wr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function F_(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=zr?Math.round(e/zr)+"h":t>=Wr?Math.round(e/Wr)+"m":t>=Ur?Math.round(e/Ur)+"s":e+"ms"}function j_(e){var t=Math.abs(e);return t>=xr?ko(e,t,xr,"day"):t>=zr?ko(e,t,zr,"hour"):t>=Wr?ko(e,t,Wr,"minute"):t>=Ur?ko(e,t,Ur,"second"):e+" ms"}function ko(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Pc=ti((ow,Mc)=>{function B_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Ic(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let h=0;h<d.length;h++)m=(m<<5)-m+d.charCodeAt(h),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,h=null,b,k;function j(...K){if(!j.enabled)return;let Y=j,ie=Number(new Date),Q=ie-(m||ie);Y.diff=Q,Y.prev=m,Y.curr=ie,m=ie,K[0]=n.coerce(K[0]),typeof K[0]!="string"&&K.unshift("%O");let U=0;K[0]=K[0].replace(/%([a-zA-Z%])/g,(W,C)=>{if(W==="%%")return"%";U++;let M=n.formatters[C];if(typeof M=="function"){let re=K[U];W=M.call(Y,re),K.splice(U,1),U--}return W}),n.formatArgs.call(Y,K),(Y.log||n.log).apply(Y,K)}return j.namespace=d,j.useColors=n.useColors(),j.color=n.selectColor(d),j.extend=r,j.destroy=n.destroy,Object.defineProperty(j,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:K=>{h=K}}),typeof n.init=="function"&&n.init(j),j}function r(d,m){let h=n(this.namespace+(typeof m>"u"?":":m)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,m){let h=0,b=0,k=-1,j=0;for(;h<d.length;)if(b<m.length&&(m[b]===d[h]||m[b]==="*"))m[b]==="*"?(k=b,j=h,b++):(h++,b++);else if(k!==-1)b=k+1,j++,h=j;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function a(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function i(d){for(let m of n.skips)if(o(d,m))return!1;for(let m of n.names)if(o(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Mc.exports=B_});var Dc=ti((hn,$o)=>{hn.formatArgs=W_;hn.save=z_;hn.load=H_;hn.useColors=U_;hn.storage=G_();hn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();hn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function U_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function W_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+$o.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}hn.log=console.debug||console.log||(()=>{});function z_(e){try{e?hn.storage.setItem("debug",e):hn.storage.removeItem("debug")}catch{}}function H_(){let e;try{e=hn.storage.getItem("debug")||hn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function G_(){try{return localStorage}catch{}}$o.exports=Pc()(hn);var{formatters:K_}=$o.exports;K_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ds=globalThis,mo=ds.trustedTypes,gc=mo?mo.createPolicy("lit-html",{createHTML:e=>e}):void 0,ri="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,si="?"+Qn,M_=`<${si}>`,vr=document,ps=()=>vr.createComment(""),fs=e=>e===null||typeof e!="object"&&typeof e!="function",oi=Array.isArray,kc=e=>oi(e)||typeof e?.[Symbol.iterator]=="function",ni=`[ 	
\f\r]`,us=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bc=/-->/g,hc=/>/g,hr=RegExp(`>|${ni}(?:([^\\s"'>=/]+)(${ni}*=${ni}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yc=/'/g,vc=/"/g,$c=/^(?:script|style|textarea|title)$/i,ai=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ai(1),ms=ai(2),Qv=ai(3),Cn=Symbol.for("lit-noChange"),Gt=Symbol.for("lit-nothing"),wc=new WeakMap,yr=vr.createTreeWalker(vr,129);function xc(e,t){if(!oi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return gc!==void 0?gc.createHTML(t):t}var Ac=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=us;for(let i=0;i<n;i++){let l=e[i],u,d,m=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===us?d[1]==="!--"?a=bc:d[1]!==void 0?a=hc:d[2]!==void 0?($c.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=hr):d[3]!==void 0&&(a=hr):a===hr?d[0]===">"?(a=s??us,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?hr:d[3]==='"'?vc:yc):a===vc||a===yc?a=hr:a===bc||a===hc?a=us:(a=hr,s=void 0);let b=a===hr&&e[i+1].startsWith("/>")?" ":"";o+=a===us?l+M_:m>=0?(r.push(u),l.slice(0,m)+ri+l.slice(m)+Qn+b):l+Qn+(m===-2?i:b)}return[xc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},_s=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Ac(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ri)){let h=d[a++],b=s.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?bo:k[1]==="?"?ho:k[1]==="@"?yo:kr}),s.removeAttribute(m)}else m.startsWith(Qn)&&(l.push({type:6,index:o}),s.removeAttribute(m));if($c.test(s.tagName)){let m=s.textContent.split(Qn),h=m.length-1;if(h>0){s.textContent=mo?mo.emptyScript:"";for(let b=0;b<h;b++)s.append(m[b],ps()),yr.nextNode(),l.push({type:2,index:++o});s.append(m[h],ps())}}}else if(s.nodeType===8)if(s.data===si)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Qn,m+1))!==-1;)l.push({type:7,index:o}),m+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===Cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=fs(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var go=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new jr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new vo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=yr.nextNode(),a++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},jr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Gt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),fs(t)?t===Gt||t==null||t===""?(this._$AH!==Gt&&this._$AR(),this._$AH=Gt):t!==this._$AH&&t!==Cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Gt&&fs(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=_s.createElement(xc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new go(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=wc.get(t.strings);return n===void 0&&wc.set(t.strings,n=new _s(t)),n}k(t){oi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(ps()),this.O(ps()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Gt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Gt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=wr(this,t,n,0),a=!fs(t)||t!==this._$AH&&t!==Cn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=wr(this,i[r+l],n,l),u===Cn&&(u=this._$AH[l]),a||(a=!fs(u)||u!==this._$AH[l]),u===Gt?t=Gt:t!==Gt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bo=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Gt?void 0:t}},ho=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Gt)}},yo=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Gt)===Cn)return;let r=this._$AH,s=t===Gt&&r!==Gt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Gt&&(r===Gt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Sc={M:ri,P:Qn,A:si,C:1,L:Ac,R:go,D:kc,V:wr,I:jr,H:kr,N:ho,U:yo,B:bo,F:vo},P_=ds.litHtmlPolyfillSupport;P_?.(_s,jr),(ds.litHtmlVersions??(ds.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new jr(t.insertBefore(ps(),o),o,void 0,n??{})}return s._$AI(e),s};var wo="today",Ec=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Br=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Wn(e){return e==="today"?"today":"7d"}function ii(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Tc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Rc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Oc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Nc=I_(Dc(),1);function zt(e){return(0,Nc.default)(`beads-ui:${e}`)}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function jc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function xo(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Bc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=In(e.created_at),o=In(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Uc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var V_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function qc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Fc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=V_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Wc(e,t){let n=qc(e),r=qc(t);if(n!==r)return n<r?-1:1;let s=Fc(e),o=Fc(t);if(s!==o)return s<o?-1:1;let a=In(e&&e.created_at),i=In(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var li=2**20;function Hr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Ao(e){return(t,n)=>{let r=Hr(t,e),s=Hr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ci(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Hr(i,n)-li};if(!i)return{rank:Hr(a,n)+li};let l=Hr(a,n),u=Hr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,h)=>({bead_id:m.id,rank:h*li}))}}function ui(e,t={}){let n=zt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Ar;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function m(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let j of k)j&&typeof j.id=="string"&&j.id.length>0&&r.set(j.id,j);d(),o=b,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let j=r.get(k.id);if(!j)r.set(k.id,k);else{let K=Number.isFinite(j.updated_at)?j.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(K<=Y){for(let ie of Object.keys(j))ie in k||delete j[ie];for(let[ie,Q]of Object.entries(k))j[ie]=Q}}d()}o=b,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function So(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function zc(e){let t=zt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let j=k.itemsById;for(let K of d)typeof K=="string"&&K.length>0&&j.set(K,!0);for(let K of m)typeof K=="string"&&K.length>0&&j.set(K,!0);for(let K of h)typeof K=="string"&&K.length>0&&j.delete(K)}}async function o(i,l){let u=So(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let m=n.get(i);if(m&&m.key!==u){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(m){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=n.get(i)||null;if(m){let h=r.get(m.key);h&&(h.delete(i),h.size===0&&r.delete(m.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:So,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Hc(){let e=zt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let m=u?So(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,h),b&&h&&m&&h!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let j=s.get(l);if(j){try{j()}catch{}s.delete(l)}let K=ui(l,d);t.set(l,K);let Y=K.subscribe(()=>o());s.set(l,Y)}else if(!b){let k=ui(l,d);t.set(l,k);let j=k.subscribe(()=>o());s.set(l,j)}return n.set(l,m),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Kc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function di(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Y_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Z_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Yc(e){let t=zt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Y_(r),a=Z_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=di(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?di(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Q_=Object.freeze({workspace_config:{default_workspace:null}});function Zc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Q_.workspace_config.default_workspace}}}function Qc(e={}){let t=zt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Zc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Zc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Xc(e){let t=zt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(m,h)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),a();let j=!1,K=()=>{j||(j=!0,r.delete(b),i())},Y=setTimeout(()=>{j||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),K())},3e4);try{let ie=await u(m,h),Q=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,Q),ie}catch(ie){let Q=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,Q,ie),ie}finally{clearTimeout(Y),K()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Uc),l;switch(i){case"created_desc":return l.sort(Ar),l;case"created_asc":return l.sort(jc),l;case"updated_desc":return l.sort(xo),l;case"priority":return l.sort(Bc),l;case"manual":default:{let u=n();return u?l.sort(Ao(u)):l.sort(Ar),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Mn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function cn(e){let t=Mn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function yn(e,t){let n=Mn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Jc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Mn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function To(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Co(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=To(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ro(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=Jc(n);return{total:n.length,count:r,current:s,children:n}}function Oo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ci(i,l,u.order),a);s(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(h);let b=r(ci(i,l,h.order),a);s(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function eu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Lo(e,t){let n=eu(e),r=eu(t);return n.length===0||r.length===0?!1:n!==r}function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function pi(e,t){return!t||typeof e!="string"||e.length===0||Io(t.visible_labels).includes(e)?!0:Io(t.hidden_labels).includes(e)?!1:!Io(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function tu(e,t){return Io(e).filter(n=>pi(n,t))}function ir(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function X_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function J_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function em(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${X_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Mo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Wc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?J_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>em(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var tm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ru={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},nu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nm={review:"\u2713",skip:"\u2298"},lr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function rm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function su(e){let t=e&&e.fill||"none";return t==="none"?lr.none:e&&e.stale===!0?lr.stale:t==="dim"?lr.dim:e&&e.glyph==="review"?lr.review:e&&e.glyph==="skip"?lr.skip:lr.done}function sm(e){if(!e||e.fill==="none"||!e.approval_state)return su(e);let t=[];return e.glyph==="review"?t.push(lr.review):e.glyph==="skip"&&t.push(lr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function om(e,t,n,r){let s=tm[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=nm[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",m=ru[e]||e,h=r?ou(t):null;if(!h)return c`
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
  `}function ou(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Po(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=nu[e.route]||nu.spec_backed,o=e.stages,a=rm(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${ru[u]||u} ${u==="plan"?sm(o[u]||{}):su(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>ou(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>om(u,o[u]||{},u===a,r))}
    </div>
  `}function am(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var au=2;function iu(e){let t=e.slice(0,au).join(", "),n=e.length-au;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function im(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Lo(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${iu(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${iu(o)}</span
      >`),n}function fi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Do(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xn(e){return`${e.kind}:${Do(e)}@${e.sha}`}function No(e,t){if(!e)return null;let n=fi(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=fi(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Xn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function lu(e,t){let n=No(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function lm(e){if(!e)return null;let t=fi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function cm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&ir(n,"route")){let i=r.route_source==="derived";s.push(c`<span
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
      </button>`),ir(n,"blocked")&&s.push(...im(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ir(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function um(e){let t=yn(e.created_at),n=yn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function dm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Mo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:um(e),empty_label:"children \uC5C6\uC74C",childChips:_i,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function _i(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return No(t,n)?c`<span class="board-card__roll-child-chips">
    ${lu(t,n)}
    ${lm(n)}
  </span>`:null}function qo(e,t){let n=am(e.priority);return c`
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
      ${cm(e,t)}
      ${e.workflow&&ir(t.policy||null,"stepper")?Po(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${dm(e,t)}
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
  `}var pm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],fm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],_m=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function mm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
        ${pm.map(r=>c`<option
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
        ${fm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${mm(e,t,n)}
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
        ${_m.map(r=>c`<option
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
  `}var gm=200,bm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},hm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),du="beads-ui.board.sort",pu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ym(){try{let e=window.localStorage.getItem(du);if(e&&pu.has(e))return e}catch{}return"created_desc"}function fu(e,t){let n=zt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,h=t.closedRange||wo,b=s?Eo(s,a):null,k=Oo({transport:o,uiOrderStore:a}),j=[],K=[],Y=[],ie=[],Q=[],U=[],F=!1,W=0,C=ym(),M=new Map,re=new Map,ge=new Map,xe=new Set,le={search:"",priority:"",type:"",labels:[]},_e=!1,Ee=null;function Fe(E){return String(E.status||"open")==="open"}function we(E){let H=String(E.status||"open");return H==="open"||H==="blocked"}function J(E){let H=le.search.trim().toLowerCase(),Le=le.priority,x=le.type,S=le.labels;return E.filter(te=>{if(H){let fe=String(te.id||"").toLowerCase(),Se=String(te.title||"").toLowerCase();if(!fe.includes(H)&&!Se.includes(H))return!1}if(Le!==""&&String(te.priority)!==Le||x!==""&&String(te.issue_type||"")!==x)return!1;if(S.length>0){let fe=Array.isArray(te.labels)?te.labels:[];if(!S.some(Se=>fe.includes(Se)))return!1}return!0})}function Te(){let E=new Set;for(let H of[j,K,Y,ie,Q,U])for(let Le of H){let x=Array.isArray(Le.labels)?Le.labels:[];for(let S of x)typeof S=="string"&&S.length>0&&E.add(S)}return Array.from(E).sort()}function Me(){return le.search.trim()!==""||le.priority!==""||le.type!==""||le.labels.length>0}function V(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",C),H=b.selectBoardColumn("tab:board:blocked","blocked",C).filter(we),Le=new Set(E.map(P=>P.id)),x=b.selectBoardColumn("tab:board:ready","ready",C).filter(P=>Fe(P)&&!Le.has(P.id)),S=b.selectBoardColumn("tab:board:resolved","resolved",C),te=b.selectBoardColumn("tab:board:deferred","deferred",C),fe=b.selectBoardColumn("tab:board:closed","closed").slice(0,gm),Se=[...H,...x,...E,...S,...fe];q(Se);let Ne=new Set;for(let P of Se)P&&P.id&&!To(P)&&Ne.add(P.id);let A=!Me();j=A?gs(H,Ne):H,K=A?gs(x,Ne):x,Y=A?gs(E,Ne):E,ie=A?gs(S,Ne):S,Q=te,W=te.length,U=A?gs(fe,Ne):fe,M=new Map;for(let P of j)M.set(P.id,"open");for(let P of K)M.set(P.id,"open");for(let P of Y)M.set(P.id,"in_progress");for(let P of ie)M.set(P.id,"resolved");for(let P of Q)M.set(P.id,"deferred");for(let P of U)M.set(P.id,"closed");re=new Map;for(let P of j)re.set(P.id,"blocked-col");for(let P of K)re.set(P.id,"ready-col");for(let P of Y)re.set(P.id,"in-progress-col");for(let P of ie)re.set(P.id,"resolved-col");for(let P of U)re.set(P.id,"closed-col")}ft()}catch{j=[],K=[],Y=[],ie=[],Q=[],U=[],ge=new Map,ft()}}function q(E){ge=Co(E)}function me(E){return Ro(ge,E)}function Ae(E){return!xe.has(E)}function We(E,H){E.preventDefault(),E.stopPropagation(),xe.has(H)?xe.delete(H):xe.add(H),ft()}function pe(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function je(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function pt(E,H){Ee||r(H)}function it(E,H){E.preventDefault(),E.stopPropagation(),vm(H).then(Le=>{Le&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function $t(E,H){Ee=H,E.dataTransfer&&(E.dataTransfer.setData("text/plain",H),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function ut(E){E.target.classList.remove("board-card--dragging"),Et(),setTimeout(()=>{Ee=null},0)}function L(E){let H=String(E.target.value||"");!H||H===h||(h=H,u&&u(H),ft())}function ae(){return i?i.get():null}function Oe(E){let H=l?l.get():null,Le=H?H.cleanup_failed:null;if(!Le||typeof Le!="object"||Array.isArray(Le))return null;let x=Le[E];return!x||typeof x!="object"||Array.isArray(x)?null:x}let qe={onCardClick:pt,onCopyId:it,onDragStart:$t,onDragEnd:ut,onClosedRangeChange:L,rollupFor:me,isExpanded:Ae,onRollupToggle:We,onChildClick:pe,onFromChipClick:je,onOpenDoc:m?(E,H)=>m(H):void 0,cleanupFailureFor:Oe,get policy(){return ae()}};function Ye(E,H){Ee||(ve(),r(H))}function rt(E,H){E.preventDefault(),E.stopPropagation(),ve(),r(H)}let gt={...qe,onCardClick:Ye,onChildClick:rt,onFromChipClick:rt,onOpenDoc:m?(E,H)=>{ve(),m(H)}:void 0,get policy(){return ae()}};function ht(E){let H=E.target,Le=e.querySelector(".board-filter__labels");H&&Le&&Le.contains(H)||Be()}function se(E){E.key==="Escape"&&Be()}function ee(){_e||(_e=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",se),ft())}function Be(){_e&&(_e=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",se),ft())}function lt(E){E.key==="Escape"&&ve()}function He(){F||(F=!0,document.addEventListener("keydown",lt),ft())}function ve(){F&&(F=!1,document.removeEventListener("keydown",lt),ft())}let ze={onClose:ve,onOverlayClick(E){E.target===E.currentTarget&&ve()}},ct={onSearchInput(E){le.search=String(E.target.value||""),V()},onPriorityChange(E){le.priority=String(E.target.value||""),V()},onTypeChange(E){le.type=String(E.target.value||""),V()},onSortChange(E){let H=String(E.target.value||"");if(!(!pu.has(H)||H===C)){C=H;try{window.localStorage.setItem(du,H)}catch{}V()}},onDeferredToggle(){F?ve():He()},onLabelMenuToggle(){_e?Be():ee()},onLabelToggle(E){let H=le.labels.indexOf(E);H===-1?le.labels.push(E):le.labels.splice(H,1),V()},onLabelClear(){le.labels.length!==0&&(le.labels=[],V())},onNewIssue(){d&&d()}};function dt(){return c`
      <div class="board-view">
        ${uu(le,ct,{sort_mode:C,deferred_popup_open:F,deferred_count:W,label_options:Te(),label_menu_open:_e})}
        <div class="board-root">
          ${Gr({title:"Blocked",id:"blocked-col",items:J(j)},qe)}
          ${Gr({title:"Ready",id:"ready-col",items:J(K)},qe)}
          ${Gr({title:"In progress",id:"in-progress-col",items:J(Y)},qe)}
          ${Gr({title:"Resolved",id:"resolved-col",items:J(ie)},qe)}
          ${Gr({title:"Closed",id:"closed-col",items:J(U),is_closed:!0,closed_range:h},qe)}
        </div>
        ${F?cu({items:J(Q),count:W},gt,ze):""}
      </div>
    `}function ft(){ot(dt(),e),Dt()}function Dt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Le of H)Array.from(Le.querySelectorAll(".board-card")).forEach((S,te)=>{S.tabIndex=te===0?0:-1})}catch{}}async function Vt(E,H){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:H}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Le){n("update-status failed: %o",Le),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(E){switch(E){case"blocked-col":return j;case"ready-col":return K;case"in-progress-col":return Y;case"resolved-col":return ie;default:return[]}}function xt(E,H,Le){if(!o||!a)return;let x=Ht(E),S=x.find(A=>A.id===H);if(!S)return;let te=x.filter(A=>A.id!==H),fe=Le.closest?Le.closest(".board-card"):null,Se=te.length;if(fe){let A=fe.getAttribute("data-issue-id");if(A===H)return;let P=te.findIndex($e=>$e.id===A);P>=0&&(Se=P)}let Ne=te.slice();Ne.splice(Se,0,S),k.applyReorder(H,Ne,Se)}function Et(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Xe=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Le=E.target.closest(".board-column");Le&&Le!==Xe&&(Xe&&Xe.classList.remove("board-column--drag-over"),Le.classList.add("board-column--drag-over"),Xe=Le)}),e.addEventListener("dragleave",E=>{let H=E.relatedTarget;(!H||!e.contains(H))&&Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null);let H=E.target,Le=H.closest(".board-column");if(!Le)return;let x=E.dataTransfer?.getData("text/plain")||"";if(!x)return;let S=Le.id,te=re.get(x);if(te&&te===S){if(hm.has(S)){if(C!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}xt(S,x,H)}return}let fe=bm[S];if(!fe){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(x)!==fe&&Vt(x,fe)}),e.addEventListener("keydown",E=>{let H=E.target;if(!(H instanceof HTMLElement))return;let Le=String(H.tagName||"").toLowerCase();if(Le==="input"||Le==="textarea"||Le==="select"||Le==="button"||Le==="a"||H.isContentEditable===!0)return;let x=H.closest(".board-card");if(!x)return;let S=String(E.key||"");if(S==="Enter"||S===" "){E.preventDefault();let Ne=x.getAttribute("data-issue-id");Ne&&r(Ne);return}if(S!=="ArrowUp"&&S!=="ArrowDown"&&S!=="ArrowLeft"&&S!=="ArrowRight")return;E.preventDefault();let te=x.closest(".board-column");if(!te)return;let fe=Array.from(te.querySelectorAll(".board-card")),Se=fe.indexOf(x);if(S==="ArrowDown"&&Se<fe.length-1){De(x,fe[Se+1]);return}if(S==="ArrowUp"&&Se>0){De(x,fe[Se-1]);return}if(S==="ArrowLeft"||S==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),A=Ne.indexOf(te),P=S==="ArrowRight"?1:-1,$e=A+P;for(;$e>=0&&$e<Ne.length;){let Ve=Ne[$e].querySelector(".board-card");if(Ve){De(x,Ve);return}$e+=P}}});function De(E,H){try{E.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let N=null;b&&b.subscribe&&(N=b.subscribe(()=>{try{V()}catch{}}));let ne=null;i&&i.subscribe&&(ne=i.subscribe(()=>{try{V()}catch{}}));let he=null;return l&&l.subscribe&&(he=l.subscribe(()=>{ft()})),{async load(){n("load"),V()},clear(){Be(),ve(),N&&(N(),N=null),ne&&(ne(),ne=null),he&&(he(),he=null),e.replaceChildren(),j=[],K=[],Y=[],ie=[],Q=[],U=[],M=new Map,re=new Map}}}function gs(e,t){return e.filter(n=>{let r=To(n);return!(r&&t.has(r))})}async function vm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Sr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function bs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function wm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Sr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Jn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await wm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var km=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],_u={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},$m=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function nn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Kt(e){return typeof e=="string"&&e.length>0?e:null}function Kr(e){return e.startsWith("gpt-")?e.slice(4):e}function jt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function gu(e,t,n){let r=Kt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Kt(n[e]);return s===null?null:{value:s,source:"global"}}function hs(e,t,n,r){return gu(e,t,n)||{value:r,source:"base"}}function mi(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&nn(s?.[t])){let a=Kt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&nn(s)){for(let a of Object.values(s))if(nn(a)){let i=Kt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Kt(r?.runners?.[o]?.models?.[e]?.id)||e}function xm(e,t){return Kt(t?.review?.reviewers?.[e]?.model)||e}function Vr(e,t,n=!1){if(e==="default")return jt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Kr(e):e;return jt(e,t,r,e,"explicit")}function bu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];nn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(nn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Am(e,t){let n=[],r=e?.implementation?.model_catalog;nn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(nn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Sm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Am(t,n)){let o=bu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function gi(e){return jt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function mu(e,t,n){let r=gu(e,t,n);return r?Vr(r.value,r.source):jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function vn(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&nn(r.session)?r.session:null,o=r?.supported===!0&&nn(r.orchestration)?r.orchestration:null,a=nn(e.runner_catalog)?e.runner_catalog:null,i=Kt(n.quick_fix_impl_model),l=Sm(i,s,a),u={};if(s){let d=hs("workflow_mode",t,n,Kt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?jt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Vr(d.value,d.source);for(let Q of["spec_review","plan_review","impl_review"]){let U=`${Q}_model`,F=Kt(Q==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=hs(U,t,n,F);if(W.value===null)u[U]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!nn(s.review?.reviewers?.[W.value]))u[U]=gi(jt(W.value,W.source,"",null,"explicit"));else{let C=xm(W.value,s);u[U]=jt(W.value,W.source,Kr(C),C,W.source==="base"?"default":"explicit")}}for(let[Q,U]of Object.entries(_u)){let F=u[U].value;if(F==="self"||F==="skip"){u[Q]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Kt(s.review?.reviewers?.[F||""]?.effort),C=hs(Q,t,n,W);u[Q]=C.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(C.value,C.source,C.value,C.value,C.source==="base"?"default":"explicit")}let m=nn(s.implementation?.default)?s.implementation.default:{},h=Kt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=nn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},j=b&&nn(k[h])?k[h]:{};for(let Q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let U=hs(Q,t,n,Q==="impl_dispatch"?Kt(j.dispatch)||Kt(m.dispatch):Kt(m[Q.replace("impl_","")]));u[Q]=U.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}let K=Kt(t.impl_runtime),Y=K==="inherit"?Kt(e.controller_runtime):K,ie=h==="quick_fix"&&Kt(t.impl_dispatch)===null&&l.runtime!==null&&(K===null||Y===l.runtime);if(ie){let Q=l.runtime,U=i;u.impl_dispatch=jt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),K===null&&(u.impl_runtime=jt(Q,"global",`${Q} (\uC720\uB3C4)`,Q,"explicit")),Kt(t.impl_model)===null&&(u.impl_model=jt(U,"global",U,U,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Q of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Q]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Q=u.impl_runtime.value==="inherit"?Kt(e.controller_runtime):u.impl_runtime.value,U=Q?bu(Q,s,a):[];if(u.impl_model.value!=="auto"&&U.length>0&&!U.includes(u.impl_model.value))u.impl_model=gi(u.impl_model);else{let F=mi(u.impl_model.value,Q,s,a);u.impl_model.display=Kr(F),u.impl_model.full_value=F}}if(u.impl_effort.value==="auto"){let Q=Kt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),U=Q?Kt(s.implementation?.effort_by_transport?.[Q]?.auto):null;U&&!$m.has(U)?(u.impl_effort.display=`${U} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=U,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",u.impl_speed.source))}}else for(let d of km.filter(m=>!m.startsWith("orchestration_")))u[d]=mu(d,t,n);if(!s){for(let[d,m]of Object.entries(_u))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=mu(d,t,n);continue}let m=d.replace("orchestration_",""),h=Kt(o[m]),b=hs(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=jt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Kt(o.model_id)||b.value:mi(b.value,null,s,a);u[d]=jt(b.value,b.source,Kr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Vr("default",b.source);continue}u[d]=Vr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=jt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Kr(d)})`,null,"default")}else if(l.runtime!==null){let d=mi(i,l.runtime,s,a);u.quick_fix_impl_model=jt(i,"global",Kr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=gi(jt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Vr(i,"global");return u}function Em(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Fo(e){let t=nn(e.pin)?e.pin:{},n=nn(e.global)?e.global:{},r=nn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let h={...r,...m};return vn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Kt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Em(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let h=s({...o,[e.key]:m})[e.key];return{value:m,label:h.display,full_value:h.full_value}})}}function Yr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(m))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function bi(e){return`session:${e.provider}:${e.session_id}`}function ys(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Tm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:bi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:ys(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Tm(e,n)}}}var hi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Cm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",hu="\uBD84\uD574 \uC5C6\uB294 leg";function Jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Hn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Qr=[...Hn,"reasoning_output_tokens"],Rm={codex:["implementation","review-consult"],claude:["subagent"]};function yi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Hn.some(t=>Number.isFinite(e[t]))}function Om(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))}function vi(e){let t=0;for(let n of Hn)t+=Jt(e?.[n]);return t}function Lm(e){return!e||typeof e!="object"?!1:Hn.some(t=>Number.isFinite(e[t]))}function yu(e){return!e||typeof e!="object"?!1:Qr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Im(e){let t={};for(let n of Qr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function vu(e){let t={};for(let n of Qr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function wu(e,t){return yi(t)?Jt(t.total_tokens):e==="codex"?Jt(t.input_tokens)+Jt(t.output_tokens):vi(t)}function Mm(e){return e==="claude"?"Claude":"Codex"}function Pm(e){return`\u03C4 ${$u(e)}`}function Dm(e,t){let n=t.breakdown||{},r=Jt(t.total_only_subtotal);if(yi(n)||r>0&&!Om(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Cm];return t.replayed&&u.push(hi),u.join(`
`)}let s=[`\uC785\uB825 ${Jt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Jt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${hu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${hu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(hi),l.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Mm(n)} ${Pm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Dm(n,r)})}return t}function Bo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Jt(i.total_only_subtotal)+Jt(a.total_only_subtotal));for(let l of Qr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Jt(i.breakdown[l])+Jt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function wi(e){return!e||typeof e!="object"?null:Rn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Nm(e){return e==="codex"?"codex":"claude"}function zn(){return{subtotal:0,breakdown:Im(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function jo(e,t,n){e.subtotal+=t.subtotal,yi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Qr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Jt(e.breakdown[r])+Jt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ku(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function $u(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return Lm(e)?`\u03C4 ${$u(vi(e))}`:null}function er(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function vs(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${vi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(hi),n.join(`
`)}function Rn(e,t){let n={claude:zn(),codex:zn()},r={orchestrator:{claude:zn(),codex:zn()},implementation:{claude:zn(),codex:zn()},"review-consult":{claude:zn(),codex:zn()},subagent:{claude:zn(),codex:zn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(yu(l)){let d=Nm(i.runner),m=vu(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:wu(d,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),jo(n[d],h,!0),jo(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Rm[m].includes(d.role)||!yu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=vu(d.usage),k={provider:m,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:wu(m,b)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),jo(n[m],k,!1),jo(r[k.role][m],k,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=ku(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...ku(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Lu,setPrototypeOf:xu,isFrozen:qm,getPrototypeOf:Fm,getOwnPropertyDescriptor:jm}=Object,{freeze:_n,seal:On,create:Ti}=Object,{apply:Ci,construct:Ri}=typeof Reflect<"u"&&Reflect;_n||(_n=function(t){return t});On||(On=function(t){return t});Ci||(Ci=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ri||(Ri=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Uo=mn(Array.prototype.forEach),Bm=mn(Array.prototype.lastIndexOf),Au=mn(Array.prototype.pop),ws=mn(Array.prototype.push),Um=mn(Array.prototype.splice),zo=mn(String.prototype.toLowerCase),ki=mn(String.prototype.toString),$i=mn(String.prototype.match),ks=mn(String.prototype.replace),Wm=mn(String.prototype.indexOf),zm=mn(String.prototype.trim),Pn=mn(Object.prototype.hasOwnProperty),fn=mn(RegExp.prototype.test),$s=Hm(TypeError);function mn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ci(e,t,r)}}function Hm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ri(e,n)}}function wt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zo;xu&&xu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(qm(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Gm(e){for(let t=0;t<e.length;t++)Pn(e,t)||(e[t]=null);return e}function tr(e){let t=Ti(null);for(let[n,r]of Lu(e))Pn(e,n)&&(Array.isArray(r)?t[n]=Gm(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=tr(r):t[n]=r);return t}function xs(e,t){for(;e!==null;){let r=jm(e,t);if(r){if(r.get)return mn(r.get);if(typeof r.value=="function")return mn(r.value)}e=Fm(e)}function n(){return null}return n}var Su=_n(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),xi=_n(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ai=_n(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Km=_n(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Si=_n(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vm=_n(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Eu=_n(["#text"]),Tu=_n(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ei=_n(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Cu=_n(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wo=_n(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ym=On(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Zm=On(/<%[\w\W]*|[\w\W]*%>/gm),Qm=On(/\$\{[\w\W]*/gm),Xm=On(/^data-[\-\w.\u00B7-\uFFFF]+$/),Jm=On(/^aria-[\-\w]+$/),Iu=On(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),eg=On(/^(?:\w+script|data):/i),tg=On(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Mu=On(/^html$/i),ng=On(/^[a-z][.\w]*(-[.\w]+)+$/i),Ru=Object.freeze({__proto__:null,ARIA_ATTR:Jm,ATTR_WHITESPACE:tg,CUSTOM_ELEMENT:ng,DATA_ATTR:Xm,DOCTYPE_NAME:Mu,ERB_EXPR:Zm,IS_ALLOWED_URI:Iu,IS_SCRIPT_OR_DATA:eg,MUSTACHE_EXPR:Ym,TMPLIT_EXPR:Qm}),As={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},rg=function(){return typeof window>"u"?null:window},sg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ou=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Pu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rg(),t=Ie=>Pu(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==As.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:b}=e,k=l.prototype,j=xs(k,"cloneNode"),K=xs(k,"remove"),Y=xs(k,"nextSibling"),ie=xs(k,"childNodes"),Q=xs(k,"parentNode");if(typeof a=="function"){let Ie=n.createElement("template");Ie.content&&Ie.content.ownerDocument&&(n=Ie.content.ownerDocument)}let U,F="",{implementation:W,createNodeIterator:C,createDocumentFragment:M,getElementsByTagName:re}=n,{importNode:ge}=r,xe=Ou();t.isSupported=typeof Lu=="function"&&typeof Q=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:_e,TMPLIT_EXPR:Ee,DATA_ATTR:Fe,ARIA_ATTR:we,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:Me}=Ru,{IS_ALLOWED_URI:V}=Ru,q=null,me=wt({},[...Su,...xi,...Ai,...Si,...Eu]),Ae=null,We=wt({},[...Tu,...Ei,...Cu,...Wo]),pe=Object.seal(Ti(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,pt=null,it=Object.seal(Ti(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),$t=!0,ut=!0,L=!1,ae=!0,Oe=!1,qe=!0,Ye=!1,rt=!1,gt=!1,ht=!1,se=!1,ee=!1,Be=!0,lt=!1,He="user-content-",ve=!0,ze=!1,ct={},dt=null,ft=wt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Dt=null,Vt=wt({},["audio","video","img","source","image","track"]),Ht=null,xt=wt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Et="http://www.w3.org/1998/Math/MathML",Xe="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml",N=De,ne=!1,he=null,E=wt({},[Et,Xe,De],ki),H=wt({},["mi","mo","mn","ms","mtext"]),Le=wt({},["annotation-xml"]),x=wt({},["title","style","font","a","script"]),S=null,te=["application/xhtml+xml","text/html"],fe="text/html",Se=null,Ne=null,A=n.createElement("form"),P=function(O){return O instanceof RegExp||O instanceof Function},$e=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===O)){if((!O||typeof O!="object")&&(O={}),O=tr(O),S=te.indexOf(O.PARSER_MEDIA_TYPE)===-1?fe:O.PARSER_MEDIA_TYPE,Se=S==="application/xhtml+xml"?ki:zo,q=Pn(O,"ALLOWED_TAGS")?wt({},O.ALLOWED_TAGS,Se):me,Ae=Pn(O,"ALLOWED_ATTR")?wt({},O.ALLOWED_ATTR,Se):We,he=Pn(O,"ALLOWED_NAMESPACES")?wt({},O.ALLOWED_NAMESPACES,ki):E,Ht=Pn(O,"ADD_URI_SAFE_ATTR")?wt(tr(xt),O.ADD_URI_SAFE_ATTR,Se):xt,Dt=Pn(O,"ADD_DATA_URI_TAGS")?wt(tr(Vt),O.ADD_DATA_URI_TAGS,Se):Vt,dt=Pn(O,"FORBID_CONTENTS")?wt({},O.FORBID_CONTENTS,Se):ft,je=Pn(O,"FORBID_TAGS")?wt({},O.FORBID_TAGS,Se):tr({}),pt=Pn(O,"FORBID_ATTR")?wt({},O.FORBID_ATTR,Se):tr({}),ct=Pn(O,"USE_PROFILES")?O.USE_PROFILES:!1,$t=O.ALLOW_ARIA_ATTR!==!1,ut=O.ALLOW_DATA_ATTR!==!1,L=O.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=O.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=O.SAFE_FOR_TEMPLATES||!1,qe=O.SAFE_FOR_XML!==!1,Ye=O.WHOLE_DOCUMENT||!1,ht=O.RETURN_DOM||!1,se=O.RETURN_DOM_FRAGMENT||!1,ee=O.RETURN_TRUSTED_TYPE||!1,gt=O.FORCE_BODY||!1,Be=O.SANITIZE_DOM!==!1,lt=O.SANITIZE_NAMED_PROPS||!1,ve=O.KEEP_CONTENT!==!1,ze=O.IN_PLACE||!1,V=O.ALLOWED_URI_REGEXP||Iu,N=O.NAMESPACE||De,H=O.MATHML_TEXT_INTEGRATION_POINTS||H,Le=O.HTML_INTEGRATION_POINTS||Le,pe=O.CUSTOM_ELEMENT_HANDLING||{},O.CUSTOM_ELEMENT_HANDLING&&P(O.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=O.CUSTOM_ELEMENT_HANDLING.tagNameCheck),O.CUSTOM_ELEMENT_HANDLING&&P(O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),O.CUSTOM_ELEMENT_HANDLING&&typeof O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(ut=!1),se&&(ht=!0),ct&&(q=wt({},Eu),Ae=[],ct.html===!0&&(wt(q,Su),wt(Ae,Tu)),ct.svg===!0&&(wt(q,xi),wt(Ae,Ei),wt(Ae,Wo)),ct.svgFilters===!0&&(wt(q,Ai),wt(Ae,Ei),wt(Ae,Wo)),ct.mathMl===!0&&(wt(q,Si),wt(Ae,Cu),wt(Ae,Wo))),O.ADD_TAGS&&(typeof O.ADD_TAGS=="function"?it.tagCheck=O.ADD_TAGS:(q===me&&(q=tr(q)),wt(q,O.ADD_TAGS,Se))),O.ADD_ATTR&&(typeof O.ADD_ATTR=="function"?it.attributeCheck=O.ADD_ATTR:(Ae===We&&(Ae=tr(Ae)),wt(Ae,O.ADD_ATTR,Se))),O.ADD_URI_SAFE_ATTR&&wt(Ht,O.ADD_URI_SAFE_ATTR,Se),O.FORBID_CONTENTS&&(dt===ft&&(dt=tr(dt)),wt(dt,O.FORBID_CONTENTS,Se)),ve&&(q["#text"]=!0),Ye&&wt(q,["html","head","body"]),q.table&&(wt(q,["tbody"]),delete je.tbody),O.TRUSTED_TYPES_POLICY){if(typeof O.TRUSTED_TYPES_POLICY.createHTML!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof O.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw $s('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=O.TRUSTED_TYPES_POLICY,F=U.createHTML("")}else U===void 0&&(U=sg(b,s)),U!==null&&typeof F=="string"&&(F=U.createHTML(""));_n&&_n(O),Ne=O}},Ve=wt({},[...xi,...Ai,...Km]),de=wt({},[...Si,...Vm]),Je=function(O){let be=Q(O);(!be||!be.tagName)&&(be={namespaceURI:N,tagName:"template"});let Pe=zo(O.tagName),yt=zo(be.tagName);return he[O.namespaceURI]?O.namespaceURI===Xe?be.namespaceURI===De?Pe==="svg":be.namespaceURI===Et?Pe==="svg"&&(yt==="annotation-xml"||H[yt]):!!Ve[Pe]:O.namespaceURI===Et?be.namespaceURI===De?Pe==="math":be.namespaceURI===Xe?Pe==="math"&&Le[yt]:!!de[Pe]:O.namespaceURI===De?be.namespaceURI===Xe&&!Le[yt]||be.namespaceURI===Et&&!H[yt]?!1:!de[Pe]&&(x[Pe]||!Ve[Pe]):!!(S==="application/xhtml+xml"&&he[O.namespaceURI]):!1},At=function(O){ws(t.removed,{element:O});try{Q(O).removeChild(O)}catch{K(O)}},kt=function(O,be){try{ws(t.removed,{attribute:be.getAttributeNode(O),from:be})}catch{ws(t.removed,{attribute:null,from:be})}if(be.removeAttribute(O),O==="is")if(ht||se)try{At(be)}catch{}else try{be.setAttribute(O,"")}catch{}},Lt=function(O){let be=null,Pe=null;if(gt)O="<remove></remove>"+O;else{let Ct=$i(O,/^[\r\n\t ]+/);Pe=Ct&&Ct[0]}S==="application/xhtml+xml"&&N===De&&(O='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+O+"</body></html>");let yt=U?U.createHTML(O):O;if(N===De)try{be=new h().parseFromString(yt,S)}catch{}if(!be||!be.documentElement){be=W.createDocument(N,"template",null);try{be.documentElement.innerHTML=ne?F:yt}catch{}}let Nt=be.body||be.documentElement;return O&&Pe&&Nt.insertBefore(n.createTextNode(Pe),Nt.childNodes[0]||null),N===De?re.call(be,Ye?"html":"body")[0]:Ye?be.documentElement:Nt},Ut=function(O){return C.call(O.ownerDocument||O,O,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Tt=function(O){return O instanceof m&&(typeof O.nodeName!="string"||typeof O.textContent!="string"||typeof O.removeChild!="function"||!(O.attributes instanceof d)||typeof O.removeAttribute!="function"||typeof O.setAttribute!="function"||typeof O.namespaceURI!="string"||typeof O.insertBefore!="function"||typeof O.hasChildNodes!="function")},bn=function(O){return typeof i=="function"&&O instanceof i};function Wt(Ie,O,be){Uo(Ie,Pe=>{Pe.call(t,O,be,Ne)})}let Qt=function(O){let be=null;if(Wt(xe.beforeSanitizeElements,O,null),Tt(O))return At(O),!0;let Pe=Se(O.nodeName);if(Wt(xe.uponSanitizeElement,O,{tagName:Pe,allowedTags:q}),qe&&O.hasChildNodes()&&!bn(O.firstElementChild)&&fn(/<[/\w!]/g,O.innerHTML)&&fn(/<[/\w!]/g,O.textContent)||O.nodeType===As.progressingInstruction||qe&&O.nodeType===As.comment&&fn(/<[/\w]/g,O.data))return At(O),!0;if(!(it.tagCheck instanceof Function&&it.tagCheck(Pe))&&(!q[Pe]||je[Pe])){if(!je[Pe]&&sn(Pe)&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,Pe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Pe)))return!1;if(ve&&!dt[Pe]){let yt=Q(O)||O.parentNode,Nt=ie(O)||O.childNodes;if(Nt&&yt){let Ct=Nt.length;for(let Zt=Ct-1;Zt>=0;--Zt){let qt=j(Nt[Zt],!0);qt.__removalCount=(O.__removalCount||0)+1,yt.insertBefore(qt,Y(O))}}}return At(O),!0}return O instanceof l&&!Je(O)||(Pe==="noscript"||Pe==="noembed"||Pe==="noframes")&&fn(/<\/no(script|embed|frames)/i,O.innerHTML)?(At(O),!0):(Oe&&O.nodeType===As.text&&(be=O.textContent,Uo([le,_e,Ee],yt=>{be=ks(be,yt," ")}),O.textContent!==be&&(ws(t.removed,{element:O.cloneNode()}),O.textContent=be)),Wt(xe.afterSanitizeElements,O,null),!1)},rn=function(O,be,Pe){if(Be&&(be==="id"||be==="name")&&(Pe in n||Pe in A))return!1;if(!(ut&&!pt[be]&&fn(Fe,be))){if(!($t&&fn(we,be))){if(!(it.attributeCheck instanceof Function&&it.attributeCheck(be,O))){if(!Ae[be]||pt[be]){if(!(sn(O)&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,O)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(O))&&(pe.attributeNameCheck instanceof RegExp&&fn(pe.attributeNameCheck,be)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(be,O))||be==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&fn(pe.tagNameCheck,Pe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Pe))))return!1}else if(!Ht[be]){if(!fn(V,ks(Pe,Te,""))){if(!((be==="src"||be==="xlink:href"||be==="href")&&O!=="script"&&Wm(Pe,"data:")===0&&Dt[O])){if(!(L&&!fn(J,ks(Pe,Te,"")))){if(Pe)return!1}}}}}}}return!0},sn=function(O){return O!=="annotation-xml"&&$i(O,Me)},pn=function(O){Wt(xe.beforeSanitizeAttributes,O,null);let{attributes:be}=O;if(!be||Tt(O))return;let Pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},yt=be.length;for(;yt--;){let Nt=be[yt],{name:Ct,namespaceURI:Zt,value:qt}=Nt,tn=Se(Ct),kn=qt,Ft=Ct==="value"?kn:zm(kn);if(Pe.attrName=tn,Pe.attrValue=Ft,Pe.keepAttr=!0,Pe.forceKeepAttr=void 0,Wt(xe.uponSanitizeAttribute,O,Pe),Ft=Pe.attrValue,lt&&(tn==="id"||tn==="name")&&(kt(Ct,O),Ft=He+Ft),qe&&fn(/((--!?|])>)|<\/(style|title|textarea)/i,Ft)){kt(Ct,O);continue}if(tn==="attributename"&&$i(Ft,"href")){kt(Ct,O);continue}if(Pe.forceKeepAttr)continue;if(!Pe.keepAttr){kt(Ct,O);continue}if(!ae&&fn(/\/>/i,Ft)){kt(Ct,O);continue}Oe&&Uo([le,_e,Ee],xn=>{Ft=ks(Ft,xn," ")});let $n=Se(O.nodeName);if(!rn($n,tn,Ft)){kt(Ct,O);continue}if(U&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Zt)switch(b.getAttributeType($n,tn)){case"TrustedHTML":{Ft=U.createHTML(Ft);break}case"TrustedScriptURL":{Ft=U.createScriptURL(Ft);break}}if(Ft!==kn)try{Zt?O.setAttributeNS(Zt,Ct,Ft):O.setAttribute(Ct,Ft),Tt(O)?At(O):Au(t.removed)}catch{kt(Ct,O)}}Wt(xe.afterSanitizeAttributes,O,null)},Re=function Ie(O){let be=null,Pe=Ut(O);for(Wt(xe.beforeSanitizeShadowDOM,O,null);be=Pe.nextNode();)Wt(xe.uponSanitizeShadowNode,be,null),Qt(be),pn(be),be.content instanceof o&&Ie(be.content);Wt(xe.afterSanitizeShadowDOM,O,null)};return t.sanitize=function(Ie){let O=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},be=null,Pe=null,yt=null,Nt=null;if(ne=!Ie,ne&&(Ie="<!-->"),typeof Ie!="string"&&!bn(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw $s("dirty is not a string, aborting")}else throw $s("toString is not a function");if(!t.isSupported)return Ie;if(rt||$e(O),t.removed=[],typeof Ie=="string"&&(ze=!1),ze){if(Ie.nodeName){let qt=Se(Ie.nodeName);if(!q[qt]||je[qt])throw $s("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)be=Lt("<!---->"),Pe=be.ownerDocument.importNode(Ie,!0),Pe.nodeType===As.element&&Pe.nodeName==="BODY"||Pe.nodeName==="HTML"?be=Pe:be.appendChild(Pe);else{if(!ht&&!Oe&&!Ye&&Ie.indexOf("<")===-1)return U&&ee?U.createHTML(Ie):Ie;if(be=Lt(Ie),!be)return ht?null:ee?F:""}be&&gt&&At(be.firstChild);let Ct=Ut(ze?Ie:be);for(;yt=Ct.nextNode();)Qt(yt),pn(yt),yt.content instanceof o&&Re(yt.content);if(ze)return Ie;if(ht){if(se)for(Nt=M.call(be.ownerDocument);be.firstChild;)Nt.appendChild(be.firstChild);else Nt=be;return(Ae.shadowroot||Ae.shadowrootmode)&&(Nt=ge.call(r,Nt,!0)),Nt}let Zt=Ye?be.outerHTML:be.innerHTML;return Ye&&q["!doctype"]&&be.ownerDocument&&be.ownerDocument.doctype&&be.ownerDocument.doctype.name&&fn(Mu,be.ownerDocument.doctype.name)&&(Zt="<!DOCTYPE "+be.ownerDocument.doctype.name+`>
`+Zt),Oe&&Uo([le,_e,Ee],qt=>{Zt=ks(Zt,qt," ")}),U&&ee?U.createHTML(Zt):Zt},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$e(Ie),rt=!0},t.clearConfig=function(){Ne=null,rt=!1},t.isValidAttribute=function(Ie,O,be){Ne||$e({});let Pe=Se(Ie),yt=Se(O);return rn(Pe,yt,be)},t.addHook=function(Ie,O){typeof O=="function"&&ws(xe[Ie],O)},t.removeHook=function(Ie,O){if(O!==void 0){let be=Bm(xe[Ie],O);return be===-1?void 0:Um(xe[Ie],be,1)[0]}return Au(xe[Ie])},t.removeHooks=function(Ie){xe[Ie]=[]},t.removeAllHooks=function(){xe=Ou()},t}var Du=Pu();var nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ho=e=>(...t)=>({_$litDirective$:e,values:t}),Jr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Ss=class extends Jr{constructor(t){if(super(t),this.it=Gt,t.type!==nr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Gt||t==null)return this._t=void 0,this.it=t;if(t===Cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Ss.directiveName="unsafeHTML",Ss.resultType=1;var Nu=Ho(Ss);function Mi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Mi();function zu(e){Tr=e}var Rs={exec:()=>null};function St(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(gn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var og=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),gn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ag=/^(?:[ \t]*(?:\n|$))+/,ig=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,lg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Os=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,cg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Pi=/(?:[*+-]|\d{1,9}[.)])/,Hu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Gu=St(Hu).replace(/bull/g,Pi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ug=St(Hu).replace(/bull/g,Pi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Di=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,dg=/^[^\n]+/,Ni=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,pg=St(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ni).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fg=St(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Pi).getRegex(),Qo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_g=St("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qi).replace("tag",Qo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ku=St(Di).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),mg=St(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ku).getRegex(),Fi={blockquote:mg,code:ig,def:pg,fences:lg,heading:cg,hr:Os,html:_g,lheading:Gu,list:fg,newline:ag,paragraph:Ku,table:Rs,text:dg},qu=St("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex(),gg={...Fi,lheading:ug,table:qu,paragraph:St(Di).replace("hr",Os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qo).getRegex()},bg={...Fi,html:St(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Rs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:St(Di).replace("hr",Os).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Gu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},hg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,yg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vu=/^( {2,}|\\)\n(?!\s*$)/,vg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xo=/[\p{P}\p{S}]/u,ji=/[\s\p{P}\p{S}]/u,Yu=/[^\s\p{P}\p{S}]/u,wg=St(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ji).getRegex(),Zu=/(?!~)[\p{P}\p{S}]/u,kg=/(?!~)[\s\p{P}\p{S}]/u,$g=/(?:[^\s\p{P}\p{S}]|~)/u,xg=St(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",og?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ag=St(Qu,"u").replace(/punct/g,Xo).getRegex(),Sg=St(Qu,"u").replace(/punct/g,Zu).getRegex(),Xu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Eg=St(Xu,"gu").replace(/notPunctSpace/g,Yu).replace(/punctSpace/g,ji).replace(/punct/g,Xo).getRegex(),Tg=St(Xu,"gu").replace(/notPunctSpace/g,$g).replace(/punctSpace/g,kg).replace(/punct/g,Zu).getRegex(),Cg=St("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Yu).replace(/punctSpace/g,ji).replace(/punct/g,Xo).getRegex(),Rg=St(/\\(punct)/,"gu").replace(/punct/g,Xo).getRegex(),Og=St(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Lg=St(qi).replace("(?:-->|$)","-->").getRegex(),Ig=St("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Lg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Mg=St(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ju=St(/^!?\[(label)\]\[(ref)\]/).replace("label",Vo).replace("ref",Ni).getRegex(),ed=St(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ni).getRegex(),Pg=St("reflink|nolink(?!\\()","g").replace("reflink",Ju).replace("nolink",ed).getRegex(),Fu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Bi={_backpedal:Rs,anyPunctuation:Rg,autolink:Og,blockSkip:xg,br:Vu,code:yg,del:Rs,emStrongLDelim:Ag,emStrongRDelimAst:Eg,emStrongRDelimUnd:Cg,escape:hg,link:Mg,nolink:ed,punctuation:wg,reflink:Ju,reflinkSearch:Pg,tag:Ig,text:vg,url:Rs},Dg={...Bi,link:St(/^!?\[(label)\]\((.*?)\)/).replace("label",Vo).getRegex(),reflink:St(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vo).getRegex()},Oi={...Bi,emStrongRDelimAst:Tg,emStrongLDelim:Sg,url:St(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Fu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:St(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Fu).getRegex()},Ng={...Oi,br:St(Vu).replace("{2,}","*").getRegex(),text:St(Oi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Go={normal:Fi,gfm:gg,pedantic:bg},Es={normal:Bi,gfm:Oi,breaks:Ng,pedantic:Dg},qg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ju=e=>qg[e];function rr(e,t){if(t){if(gn.escapeTest.test(e))return e.replace(gn.escapeReplace,ju)}else if(gn.escapeTestNoEncode.test(e))return e.replace(gn.escapeReplaceNoEncode,ju);return e}function Bu(e){try{e=encodeURI(e).replace(gn.percentDecode,"%")}catch{return null}return e}function Uu(e,t){let n=e.replace(gn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(gn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(gn.slashPipe,"|");return r}function Ts(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Fg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Wu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function jg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yo=class{constructor(e){Pt(this,"options");Pt(this,"rules");Pt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ts(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=jg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Ts(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ts(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Ts(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=m,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),j=this.blockquote(k);o[o.length-1]=j,r=r.substring(0,r.length-b.raw.length)+j.raw,s=s.substring(0,s.length-b.text.length)+j.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),j=this.list(k);o[o.length-1]=j,r=r.substring(0,r.length-h.raw.length)+j.raw,s=s.substring(0,s.length-b.raw.length)+j.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,j=>" ".repeat(3*j.length)),h=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let j=this.rules.other.nextBulletRegex(k),K=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),ie=this.rules.other.headingBeginRegex(k),Q=this.rules.other.htmlBeginRegex(k);for(;e;){let U=e.split(`
`,1)[0],F;if(h=U,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),F=h):F=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||ie.test(h)||Q.test(h)||j.test(h)||K.test(h))break;if(F.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+F.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(m)||ie.test(m)||K.test(m))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=U+`
`,e=e.substring(U.length+1),m=F.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Uu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Uu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Ts(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Fg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Wu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Wu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,m=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Dn=class Li{constructor(t){Pt(this,"tokens");Pt(this,"options");Pt(this,"state");Pt(this,"inlineQueue");Pt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:gn,block:Go.normal,inline:Es.normal};this.options.pedantic?(n.block=Go.pedantic,n.inline=Es.pedantic):this.options.gfm&&(n.block=Go.gfm,this.options.breaks?n.inline=Es.breaks:n.inline=Es.gfm),this.tokenizer.rules=n}static get rules(){return{block:Go,inline:Es}}static lex(t,n){return new Li(n).lex(t)}static lexInline(t,n){return new Li(n).inlineTokens(t)}lex(t){t=t.replace(gn.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},m),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Zo=class{constructor(e){Pt(this,"options");Pt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(gn.notSpaceStart)?.[0],s=e.replace(gn.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Bu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Bu(e);if(s===null)return rr(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},Ui=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Nn=class Ii{constructor(t){Pt(this,"options");Pt(this,"renderer");Pt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Zo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ui}static parse(t,n){return new Ii(n).parse(t)}static parseInline(t,n){return new Ii(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Ko,Cs=(Ko=class{constructor(e){Pt(this,"options");Pt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Dn.lex:Dn.lexInline}provideParser(){return this.block?Nn.parse:Nn.parseInline}},Pt(Ko,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Pt(Ko,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ko),Bg=class{constructor(...e){Pt(this,"defaults",Mi());Pt(this,"options",this.setOptions);Pt(this,"parse",this.parseMarkdown(!0));Pt(this,"parseInline",this.parseMarkdown(!1));Pt(this,"Parser",Nn);Pt(this,"Renderer",Zo);Pt(this,"TextRenderer",Ui);Pt(this,"Lexer",Dn);Pt(this,"Tokenizer",Yo);Pt(this,"Hooks",Cs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Zo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Yo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Cs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];Cs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Cs.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return l.call(s,m)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Dn.lex(e,t??this.defaults)}parser(e,t){return Nn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Nn.parse:Nn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Nn.parse:Nn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+rr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Er=new Bg;function Ot(e,t){return Er.parse(e,t)}Ot.options=Ot.setOptions=function(e){return Er.setOptions(e),Ot.defaults=Er.defaults,zu(Ot.defaults),Ot};Ot.getDefaults=Mi;Ot.defaults=Tr;Ot.use=function(...e){return Er.use(...e),Ot.defaults=Er.defaults,zu(Ot.defaults),Ot};Ot.walkTokens=function(e,t){return Er.walkTokens(e,t)};Ot.parseInline=Er.parseInline;Ot.Parser=Nn;Ot.parser=Nn.parse;Ot.Renderer=Zo;Ot.TextRenderer=Ui;Ot.Lexer=Dn;Ot.lexer=Dn.lex;Ot.Tokenizer=Yo;Ot.Hooks=Cs;Ot.parse=Ot;var Ok=Ot.options,Lk=Ot.setOptions,Ik=Ot.use,Mk=Ot.walkTokens,Pk=Ot.parseInline;var Dk=Nn.parse,Nk=Dn.lex;function cr(e){let t=Ot.parse(e),n=Du.sanitize(t);return Nu(n)}function sr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function es(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Jo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var nd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ug={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Wg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,zg=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function qn(e){return!!e&&typeof e=="object"}function Wi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function zi(e,t){let n=Wi(e),r=Wi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function rd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>qn(s)&&typeof s.text=="string"?s.text:"").join(""):qn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Hg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:nd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Wi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=zi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=zi(qn(i)?i.old_string:"",qn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Hi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Gg=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function sd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>qn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Gg,"").trim();return n.length>0?{kind:"user",text:n}:null}function Gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Wg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:zg.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Kg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Vg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(qn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Gi(a.text));else if(a.type==="thinking"){let i=Hi(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Hg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?td(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(qn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=rd(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=sd(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?td([s],n):[s]}return[]}function td(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Yg(e){let t=typeof e.command=="string"?e.command:"",n=rd(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:nd.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Zg(e){if(e.type==="item.completed"&&qn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Gi(t.text)];if(t.type==="user_message"){let n=sd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Hi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Yg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Qg(e){if(e.schema!=="codex-delegation-monitor-v1"||!qn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&qn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Gi(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Hi(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Ug[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Xg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Jg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return qn(t)?t:null}function od(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Jg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Kg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Qg(o):Xg(o)?Zg(o):Vg(o,n);return a.length>0&&(r.progress=null),a}}}function Ki(e){let t=[],n=od(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var eb=5,tb=10,nb=/Task\s+#(\d+)/,rb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,sb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ls(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ob(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ab(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ib(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=nb.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function lb(e){if(e.tool==="Bash"){let t=e.command||"";return rb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":sb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function cb(e){let t=e.filter(s=>s.kind==="tool").slice(-tb),n=new Map;t.forEach((s,o)=>{let a=lb(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function ub(e){let t=ab(e);if(t)return{text:t,guess:!1};let n=ib(e);if(n)return{text:n,guess:!1};let r=cb(e);return r?{text:r,guess:!0}:null}function db(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:yn(e,t)}function ts(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,m={},h=!0,b=new Set,k=new Set,j=null,K=null,Y=!1,ie=!1,Q=!1,U=null,F=null;function W(){Y=!1,ie=!1,Q=!1,U=null,F=null}async function C(se){if(n){ie=!0,Q=!1,je();try{let ee=await Promise.resolve(n("get-attempt-prompt",{attempt_id:se,...u?{root_dir:u}:{}}));if(o!==se)return;!ee||typeof ee!="object"||Array.isArray(ee)?Q=!0:(U=ee,F=se)}catch{o===se&&(Q=!0)}finally{o===se&&(ie=!1,je())}}}function M(){if(Y=!Y,Y&&o&&F!==o){C(o);return}je()}function re(){if(!Y)return"";let se=es({loading:ie,error:Q});if(se)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${se}
      </div>`;if(!U)return"";if(U.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=Jo(U.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?c`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof U.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",U.task_prompt):""}
      ${typeof U.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",U.system_prompt):""}
    </div>`}function ge(){if(!l||!r)return[];let se=r.get(l);return Ki(se?se.lines:[])}function xe(){if(!l||!r)return null;let se=r.get(l),ee=se?se.last_event_at:null;return typeof ee=="number"?ee:null}function le(){return m.status==="running"}function _e(){if(le()&&o){K||(K=setInterval(()=>je(),1e3));return}Ee()}function Ee(){K&&(clearInterval(K),K=null)}function Fe(se){let ee=[],Be=0;for(;Be<se.length;){let{idx:lt,line:He}=se[Be];if(He.kind==="tool"){let ve=Be;for(;ve<se.length&&se[ve].line.kind==="tool"&&se[ve].line.tool===He.tool;)ve+=1;if(ve-Be>=eb&&!k.has(lt)){ee.push({kind:"group",idx:lt,tool:He.tool||"",lines:se.slice(Be,ve)}),Be=ve;continue}}ee.push({kind:"line",idx:lt,line:He}),Be+=1}return ee}function we(se){let ee=[],Be=new Map;for(let ve=0;ve<se.length;ve+=1){let ze=se[ve],ct=ze.parent_tool_use_id;if(typeof ct=="string"&&ct.length>0){let dt=Be.get(ct);dt||(dt={kind:"subagent",idx:ve,launch_id:ct,agent_type:null,header:null,lines:[]},Be.set(ct,dt),ee.push(dt)),dt.lines.push({idx:ve,line:ze});continue}if(ze.kind==="tool"&&ze.tool==="Agent"&&typeof ze.launch_id=="string"&&ze.launch_id.length>0){let dt=J(ze),ft=Be.get(ze.launch_id);if(ft){ft.header={idx:ve,line:ze},ft.agent_type=dt;continue}let Dt={kind:"subagent",idx:ve,launch_id:ze.launch_id,agent_type:dt,header:{idx:ve,line:ze},lines:[]};Be.set(ze.launch_id,Dt),ee.push(Dt);continue}ee.push({kind:"entry",idx:ve,line:ze})}let lt=[],He=0;for(;He<ee.length;){if(ee[He].kind!=="entry"){lt.push(ee[He]),He+=1;continue}let ve=He;for(;ve<ee.length&&ee[ve].kind==="entry";)ve+=1;lt.push(...Fe(ee.slice(He,ve))),He=ve}return lt}function J(se){let ee=se.input;return ee&&typeof ee.subagent_type=="string"?ee.subagent_type:null}function Te(se){for(let ee=se.length-1;ee>=0;ee-=1){let Be=se[ee];if(Be.kind==="result"||Be.kind==="error")return null;if(Be.kind==="tool"&&!Object.hasOwn(Be,"result"))return Be}return null}function Me(se){for(let ee=se.length-1;ee>=0;ee-=1)if(se[ee].kind==="thinking")return se[ee];return null}function V(se,ee){if(ee.kind==="gate")return c`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return c`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return c`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${cr(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let Be=b.has(se);return c`<div
        class="sv__think${Be?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(se)}
      >
        <span class="sv__think-line">💭 ${Ls(ee.text)}</span>
        ${Be?c`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="user"){let Be=b.has(se);return c`<div
        class="sv__line sv__line--user${Be?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(se)}
      >
        <span class="sv__user-line">▷ ${Ls(ee.text)}</span>
        ${Be?c`<pre class="sv__user-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let Be=b.has(se),lt=ee.tool==="Bash"?ob(ee.command):0,He=ee.tool==="Bash"?lt>1?Ls(ee.command):ee.command:ee.path||ee.command||"";return c`<div
        class="sv__tool${Be?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>it(se)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${He?c`<span class="sv__tool-detail">${He}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof ee.added=="number"?c`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?c`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?c`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${Be?c`<pre class="sv__tool-expand">${q(ee)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${cr(ee.text||"")}</div>`}function q(se){let ee=[];if(se.tool==="Bash"&&typeof se.command=="string"&&se.command.length>0)ee.push(se.command);else if(se.input!==void 0)try{ee.push(`input: ${JSON.stringify(se.input,null,2)}`)}catch{}return typeof se.output=="string"&&se.output.length>0&&ee.push(`output:
${se.output}`),ee.join(`

`)}function me(){if(!o)return c``;let se=ge(),ee=(a?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),Be=m.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,He=le(),ve=He?db(xe(),Date.now()):"",ze=He?Te(se):null,ct=He?Me(se):null,dt=ub(se);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(a?m.role||"":o)}</span
        >
        ${dt?c`<span
              class="sv__stage${dt.guess?" sv__stage--guess":""}"
              title=${dt.text}
              >${dt.text}</span
            >`:""}
        ${He?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?c`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${Be?c`<button
              type="button"
              class="sv__session"
              title=${Be}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Be}`}
              @click=${()=>ut(Be)}
            >
              ⧉ ${Be.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>ut(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ee?c`<span class="sv__meta">${ee}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
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
          aria-label=${lt}
          @click=${$t}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
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
      ${a||d?"":re()}
      <div class="sv__body">
        ${se.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:we(se).map(ft=>ft.kind==="subagent"?We(ft):ft.kind==="group"?Ae(ft):V(ft.idx,ft.line))}
      </div>
      ${ze||ct?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?c`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?Ls(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${ct?c`<span class="sv__now-think"
                  >💭 ${Ls(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(se){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(se.idx)}
    >
      <span class="sv__group-icon">${se.lines[0].line.icon}</span>
      <span class="sv__group-name">${se.tool}</span>
      <span class="sv__group-count">${se.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function We(se){let ee=k.has(se.idx),Be=se.header?se.header.line:null,lt=Be?Be.is_error===!0?"\u2717":typeof Be.result=="string"?"\u2713":"\u27F3":"",He=Be&&Be.command?Be.command:"";return c`<div class="sv__sub${ee?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(se.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${se.agent_type||"subagent"}</span>
        ${He?c`<span class="sv__sub-detail">${He}</span>`:""}
        <span class="sv__sub-count">${se.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${ee?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ee?c`<div class="sv__sub-body">
            ${Fe(se.lines).map(ve=>ve.kind==="group"?Ae(ve):V(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function pe(se){k.add(se),je()}function je(){ot(me(),e),_e(),h&&pt()}function pt(){let se=e.querySelector(".sv__body");se&&(se.scrollTop=se.scrollHeight)}function it(se){b.has(se)?b.delete(se):b.add(se),je()}function $t(){h=!h,je()}function ut(se){Sn(se).then(ee=>{ee?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function L(se){!o||!se||(m={...m,...se},je())}function ae(se){let ee=se.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&h&&(h=!1,je())}e.addEventListener("scroll",ae,!0);function Oe(se){let ee=se.target;!ee||typeof ee.closest!="function"||e.contains(ee)||ee.closest("dialog")||ee.closest(".md-viewer-root")||ht()}let qe=!1;function Ye(){qe||(document.addEventListener("mousedown",Oe),qe=!0)}function rt(){qe&&(document.removeEventListener("mousedown",Oe),qe=!1)}function gt(se){let ee=se&&se.attempt_id;if(!ee)return;let Be=typeof se.launch_id=="string"&&se.launch_id.length>0?se.launch_id:null,lt=se.session_ref&&typeof se.session_ref=="object"?se.session_ref:null;if(Be&&lt)return;let He=l;o=ee,a=Be,i=lt,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&He&&He!==l&&Promise.resolve(n("unsubscribe-session-log",{id:He})).catch(()=>{}),u=typeof se.root_dir=="string"&&se.root_dir.length>0?se.root_dir:null,m=se.meta||{},d=se.hide_prompt===!0,h=!0,b.clear(),k.clear(),W(),!j&&r&&(j=r.subscribe(je)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ye(),je()}function ht(){let se=l;rt(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),k.clear(),W(),Ee(),n&&se&&Promise.resolve(n("unsubscribe-session-log",{id:se})).catch(()=>{}),ot(c``,e),s&&s()}return{open:gt,updateMeta:L,close:ht,isOpen(){return o!==null},destroy(){Ee(),rt(),j&&(j(),j=null),e.removeEventListener("scroll",ae,!0),o=null,a=null,i=null,l=null,u=null,d=!1,ot(c``,e)}}}function pb(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=ea(t.spec_id),s=ea(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ea(e){return typeof e=="string"?e.trim():""}function fb(e){let t=pb(e);if(t.path)return t;let n=ea(ad(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function ad(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var _b=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Is(e){let t=fb(e),n=ea(ad(e).spec_review),r=_b.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function mb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function gb(e){let t=e&&e.metadata||{},n=Is(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:mb(t)?null:"plan_pending"}),r}function id(e,t){let n=gb(e);return c`
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
  `}var bb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",hb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,yb=/^\*\*결론\*\* — (.+)$/;function ta(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==bb)return null;let n=hb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?yb.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ld=20;function cd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function vb(e){return e.length>ld?`${e.slice(0,ld)}\u2026`:e}function wb(e,t,n,r){let s=`${t.lane} ${vb(t.identifier)}`;return c`<div class="detail-report">
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
  </div>`}function kb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
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
            ${i.map(l=>{let u=ta(typeof l.text=="string"?l.text:"");return u?wb(l,u,t,s.has(l.id)):kb(l)})}
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
  `}var{I:h$}=Sc;var dd=e=>e.strings===void 0;var $b={},pd=(e,t=$b)=>e._$AH=t;var Cr=Ho(class extends Jr{constructor(e){if(super(e),e.type!==nr.PROPERTY&&e.type!==nr.ATTRIBUTE&&e.type!==nr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!dd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Cn||t===Gt)return t;let n=e.element,r=e.name;if(e.type===nr.PROPERTY){if(t===n[r])return Cn}else if(e.type===nr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Cn}else if(e.type===nr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Cn;return pd(e),t}});var na=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Yi=[...na.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],or=["orchestration_model","orchestration_effort","orchestration_speed"],ra=[...na,...or],xb=Yi.filter(e=>ra.includes(e)),fd=["delegated","main"],sa=["inherit","claude","codex"],Ms=["default","fast"],Ps=["standard","fast_track"],Ds=["codex","opus","fable","self","skip"],oa=["codex","fable","skip"],aa=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function _d(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function ns(e,t){let n=_d(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Tn,...r.flatMap(([,s])=>s)]}function md(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!En(a)||!En(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Tn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Tn,...s]}function rs(e,t,n){return md(e,t,n,(r,s)=>En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Zi(e,t,n){return md(e,t,n,(r,s)=>En(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:En(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ns(e,t){let n=_d(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function gd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!ns(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!rs(t,s,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Ab={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Vi=[...xb,...or],Sb=[...ra,...Yi].filter((e,t,n)=>n.indexOf(e)===t&&!Vi.includes(e));function bd(e,t){let n=En(e)?e:{},r=En(t)?t:{},s=[];for(let a of Vi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:Ab[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...Sb,...Object.keys(r)])!Vi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Qi(e,t,n,r,s,o){return Fo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function hd(e,t){let n={};for(let r of Yi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function yd(e,t){let n={};for(let r of or){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Xi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...or]}],ur={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ia={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ji(e,t,n,r,s,o=null){let a=vn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function vd(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Ji(e,t,n,r,s,o))a[i.source]+=1;return a}function wd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function kd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var C$=[...na,...or];var Eb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],el={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},$d={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Tb={pin:"pin",global:"global",base:"base"};function Cb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Tb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Rb(e,t,n){switch(e){case"workflow_mode":return Ps;case"spec_review_model":case"impl_review_model":return Ds;case"plan_review_model":return oa;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return aa;case"impl_dispatch":return fd;case"impl_runtime":return sa;case"impl_model":return ns(n,t.impl_runtime);case"impl_effort":return rs(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ms;case"orchestration_model":return Ns(n,null);case"orchestration_effort":return rs(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function Ob(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Cb(e.source)}
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
        >${Lb(o)}</span
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
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Fo({key:u.key,choices:Rb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ob(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Lb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ib(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Ad(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Ib(n.exec_receipt),l=i?Xn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=No(n.planned_execution,n.exec_receipt),m=n.chips?.pr?.number,h=typeof m=="number"?`PR #${m}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${Mb(s).map(b=>Pb(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function Mb(e){let n=typeof e=="string"&&Object.hasOwn(el,e)&&el[e]||el.spec_backed;return Eb.filter(r=>n.includes(r.id))}var la={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Pb(e,t,n,r){let s=Db(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",m=u?la.stale:i?la.on:l?la.current:la.none,h=Nb(e,n),b=`${r.label} \xB7 ${m}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,j=c`<span class="detail-summary__gate-label"
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
      >${j}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${j}</span
  >`}function Db(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Nb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn($d,n)?$d[n]:""}function ca(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Sd(e){return ca(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Ed(e,t){let n=e&&e[t];if(!ca(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Sd),s=Sd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Rd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ua(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Rd(e)}${t}`}function ss(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Rd(e)}`}function qb(e,t,n){if(n!==null){let s=e==="claude"?ua:ss,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ss({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Td(e,t){if(!ca(e)||e.state!=="usable"||!ca(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Cd(e){let t=e.provider_key==="claude"?ua:ss,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${qb(e.provider_key,e.provider,e.workspace_default)}
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
  </section>`}var Ld=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function da(e){if(!qs(e)||!qs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>qs(n)&&qs(n.models));return t.length>0?t:null}function Fn(e,t){let n=da(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Id(e,t){return qs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Md(e,t){let n=da(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Id(r,r.models[t]);return[]}function Fb(e){let t=da(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Id(r,s))n.includes(o)||n.push(o);return n}function jb(e,t){if(!t)return Fb(e);let r=da(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Md(e,o))s.includes(a)||s.push(a);return s}function Pd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Fn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Md(t,r.impl_model):jb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Bb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ub(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function pa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(j){j.key==="Escape"&&s&&(j.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Bb(s)}</span
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
    `:c``}function m(){ot(d(),e)}async function h(j,K={}){s=j,o="loading",a="",i=null,l="",m();let Y=K.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ie="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(j);try{let Q=await r(ie),U=await Q.json().catch(()=>({}));if(!Q.ok||!U||U.ok!==!0){if(U?.error==="not_found"&&K.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(U&&U.error||Q.status)+")",m();return}let F=Ub(String(U.content||""));i=F.front,a=F.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,ot(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:k}}var Wb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],qd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fa=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],zb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Dd(e){return typeof e=="string"&&zb.has(e)}var Hb=["running","done","failed","interrupted"],Gb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Kb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Vb(e){let t=un(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${qd}
          >부분 집계</span
        >`:""}`}function Nd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function rl(e){if(typeof e=="number")return Fs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Fs(t):""}function Yb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Zb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function tl(e){return e===null||typeof e=="string"&&e.trim().length>0}function nl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Qb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!fa.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?tl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||tl(t.effort))||!(!("agent_type"in t)||tl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Hb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!nl(t.started_at)||!nl(t.last_event_at)||!nl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Xb(e,t,n){let s=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function Jb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?un({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Fs(e.last_event_at):s?rl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Yb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Zb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Gb[e.status]}</span
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
  </button>`}function eh(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function th(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let m=Qb(d);!m||s.has(m.launch_id)||Dd(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let a={};for(let{role:d,provider:m}of fa){let h=t?t.roles[d]?.[m]:null;a[d]=h?[...h.legs]:[]}let i=fa.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:m}of fa){for(let h of r.filter(b=>b.role===d&&b.provider===m)){let b=i.find(k=>k.receipt_id===h.launch_id)||null;b&&!eh(h,b)||(b&&l.add(b.receipt_id),u.push(Jb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Dd(h.agent_type)&&u.push(Xb(d,m,h))}return u}function nh(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Wb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Kb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${qd}</span>`:""}
  </div>`}var rh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function sh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var oh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function ah(e,t){let n=oh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function Fd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],i=a.map(b=>ah(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let j=typeof b.session_id=="string"&&b.session_id.length>0,K=u.has(b.attempt_id),Y=j&&!K,ie=j?K?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${ie}
      @click=${Q=>{Q.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let j=b.cause_detail,K=j&&typeof j.reason=="string"&&j.reason.length>0?typeof j.command=="string"&&j.command.length>0?`${j.reason} \xB7 ${j.command}`:j.reason:b.cause;return c`<div class="detail-session__cause" title=${K}>
      ${b.cause}
    </div>`},h=b=>{let k=Nd(wi(b));if(un(k).length===0&&!Xr(b.usage))return"";let j=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${j?"true":"false"}
      title=${j?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${K=>{K.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Vb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let k=wi(b),j=Nd(k),K=un(j);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${rh[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${bs(b)?c`<span
                  class="detail-session__resumed"
                  title=${bs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sr(b)}</span>
            ${K.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${K.length>0?K.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Fs(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${m(b)} ${sh(b)}
          ${l.has(b.attempt_id)&&b.usage?nh(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${th(b,k,t)}
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
          ${ih(e)}
        </div>`:""}
  `}function ih(e){let t=es(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?sr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Jo(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?sr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?sr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var lh=["open","in_progress","deferred","resolved","closed"],ch=[0,1,2,3,4];function Bd(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},h="",b=!1,k=[],j=!1,K={},Y={claude:null,codex:null},ie=null,Q=null,U=0,F=!1,W=!1,C="",M="",re="";function ge(){F=!1,W=!1,C="",M="",re=""}function xe(){Y={claude:null,codex:null},ie=null,Q=null,U+=1}async function le(){if(!s)return null;try{let y=await Promise.resolve(s("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function _e(y){try{let Z=await fetch(y);if(!Z.ok)return null;let R=await Z.json();if(!R||typeof R!="object"||!Array.isArray(R.accounts))return null;let ke=R.accounts.filter(tt=>tt!==null&&typeof tt=="object"&&!Array.isArray(tt));return{accounts:ke,active:ke.find(tt=>tt.active===!0)||null}}catch{return null}}async function Ee(y){Q=y;let Z=++U,[R,ke,tt]=await Promise.all([_e("/api/claude-usage"),_e("/api/codex-usage"),le()]);Z!==U||y!==u||(Y={claude:R,codex:ke},ie=tt,X())}let Fe=[],we=null,J=null,Te=!1,Me="",V=!1,q=0,me=new Set;function Ae(){Fe=[],we=null,J=null,Te=!1,Me="",V=!1,q+=1,me.clear()}async function We(y){if(!s)return;let Z=++q;try{let R=await Promise.resolve(s("get-comments",{id:y}));if(Z!==q||y!==u)return;Fe=Array.isArray(R)?R:[],Te=!1}catch{if(Z!==q||y!==u)return;Te=!0}X()}function pe(){if(!s||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,J=y,We(u);return}y!==null&&y!==J&&(J=y,We(u))}function je(y){me.has(y)?me.delete(y):me.add(y),X()}function pt(y){let Z=Me.trim().length===0;Me=y,Z!==(y.trim().length===0)&&X()}async function it(){let y=Me.trim();if(!s||!u||y.length===0||V)return;let Z=u;V=!0,X();let R=!1;try{let ke=await Promise.resolve(s("add-comment",{id:Z,text:y}));Array.isArray(ke)&&ke.length>0&&(R=!0,Z===u&&(Fe=ke,Te=!1,Me="",J=ke.length))}catch{R=!1}R||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Z===u&&(V=!1),X()}let $t={onToggle:je,onDraftInput:pt,onSubmit:it},ut=t.mdViewer||null,L=null;ut||(L=document.createElement("div"),L.className="md-viewer-root",document.body.appendChild(L));let ae=ut||pa(L,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Oe=document.createElement("div");Oe.className="session-log-root",document.body.appendChild(Oe);let qe=ts(Oe,{transport:s?(y,Z)=>Promise.resolve(s(y,Z)):void 0,sessionLogStore:l}),Ye=!1,rt=!1,gt=!1,ht=null,se=null,ee=0;function Be(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function lt(){Ye=!1,rt=!1,gt=!1,ht=null,se=null,ee+=1}async function He(y){if(!s)return;let Z=++ee;rt=!0,gt=!1,X();try{let R=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(Z!==ee)return;!R||typeof R!="object"||Array.isArray(R)?gt=!0:(ht=R,se=Be(y))}catch{Z===ee&&(gt=!0)}finally{Z===ee&&(rt=!1,X())}}let ve=[],ze=null,ct=0;function dt(y,Z){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${Z}`}function ft(){ve=[],ze=null,ct+=1}async function Dt(y,Z){if(!s)return;let R=++ct,ke;try{ke=await Promise.resolve(s("get-session-refs",{bead_id:y}))}catch{ke=null}R!==ct||Z!==ze||(ve=ke&&Array.isArray(ke.sessions)?ke.sessions:[],X())}function Vt(){if(!s||!u)return;let y=d&&d.metadata,Z=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(Z===null){ft();return}let R=dt(u,Z);ze!==R&&(ve=[],ze=R,Dt(u,R))}function Ht(){if(Ye=!Ye,Ye&&u&&se!==Be(u)){ht=null,He(u);return}X()}function xt(){if(!a||!u)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(R=>R&&R.bead_id===u).sort((R,ke)=>(ke.started_at||0)-(R.started_at||0)).map(R=>({attempt_id:R.attempt_id,bead_id:R.bead_id,status:R.status,started_at:typeof R.started_at=="number"?R.started_at:null,runner:R.runner||null,model:R.model||null,effort:R.effort||R.observed_effort||null,speed:R.speed||null,session_id:R.session_id||null,resumed_from:R.resumed_from||null,continuation_mode:R.continuation_mode||null,dismissed_at:typeof R.dismissed_at=="number"?R.dismissed_at:null,cause:typeof R.cause=="string"?R.cause:null,cause_detail:R.cause_detail||null,exec_default_preset_id:typeof R.exec_default_preset_id=="string"?R.exec_default_preset_id:null,exec_default_preset_revision:typeof R.exec_default_preset_revision=="number"?R.exec_default_preset_revision:null,exec_values:R.exec_values&&typeof R.exec_values=="object"?R.exec_values:null,usage:R.usage||null,usage_legs:Array.isArray(R.usage_legs)?R.usage_legs:[],delegation_sessions:Array.isArray(R.delegation_sessions)?R.delegation_sessions:[]}))}function Et(){if(!a||!u)return null;let y=a.get();return Rn(y&&y.attempts||{},u)}let Xe=new Set;function De(y){Xe.has(y)?Xe.delete(y):Xe.add(y),X()}function N(y){let Z=a?a.get():null,R=Z&&Z.attempts?Z.attempts[y]:null;qe.open({attempt_id:y,meta:R?{runner:R.runner||void 0,model:R.model||void 0,effort:R.effort||void 0,status:R.status||void 0,session_id:R.session_id||void 0}:{}})}function ne(y,Z){let R=a?a.get():null,ke=R&&R.attempts?R.attempts[y]:null,et=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(_t=>_t&&typeof _t=="object"&&_t.launch_id===Z);et&&qe.open({attempt_id:y,launch_id:Z,meta:{runner:et.provider==="claude"?"claude":"codex",role:et.role,...typeof et.agent_type=="string"?{agent_type:et.agent_type}:{},model:et.model,effort:et.effort,session_id:et.session_id,status:et.status}})}async function he(y){if(!s||!y)return;let Z=await Yr();if(Z===null)return;let R=()=>{let _t=a?a.get():null;return _t&&typeof _t.revision=="number"?_t.revision:0},ke=async(_t={},nt=R())=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:nt,...Z!==""?{instructions:Z}:{},..._t}),tt=_t=>{_t?.queue&&a?.set&&a.set(_t.queue)},et=await ke();if(tt(et),et&&et.conflict){let _t=et.queue&&typeof et.queue.revision=="number"?et.queue.revision:R();et=await ke({},_t),tt(et)}et=await Jn(et,(_t,nt)=>ke({continuation:_t,decision_token:nt}),{onResult:tt,refresh:()=>ke()}),et&&et.resumed===!1&&!et.conflict&&et.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${et.reason}`,"error",2400)}function E(y){!y||!u||qe.open(Zr(y,u,d&&d.status))}let H={onOpen:N,onOpenDelegation:ne,onResume:he,onToggleUsage:De,onOpenSessionRef:E,onCopyResumeCommand:kt};function Le(){let y=a?a.get():null,Z={...K};for(let R of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=y&&y[R];typeof ke=="string"&&(Z[R]=ke)}return Z}async function x(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));K=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{K={}}X()}}function S(){let y=a?a.get():null;return y&&y.runner_catalog||null}function te(){let y=a?a.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function fe(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},R=vn({pin:{...y,...m},global:Le(),execution_defaults:te(),runner_catalog:S(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return Fn(S(),R)}function Se(){let y=i?i.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function Ne(y){return y?.compatible===!1}function A(y){i&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&i.set({revision:y.revision,presets:y.presets})}async function P(){let y=Se(),Z=y?.presets.find(R=>R.id===h);if(!(!s||!u||!y||!Z||Ne(Z)||b)){b=!0,k=[],X();try{let R=await Promise.resolve(s("apply-impl-preset",kd(u,Z.id,y.revision)));if(R&&R.conflict){A(R),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=R&&Array.isArray(R.issue)?R.issue[0]:R?.issue;if(R&&R.applied&&ke&&typeof ke=="object"){d=ke,k=Array.isArray(R.skipped_orchestration_keys)?R.skipped_orchestration_keys.filter(tt=>typeof tt=="string"):[];for(let tt of Ld)delete m[tt];ue(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}R&&R.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(R){R&&typeof R=="object"&&R.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,X()}}}let $e=null;n&&n.subscribe&&($e=n.subscribe(()=>At()));let Ve=null;a&&typeof a.subscribe=="function"&&(Ve=a.subscribe(()=>{u&&X()}));let de=null;i&&typeof i.subscribe=="function"&&(de=i.subscribe(()=>{u&&X()}));function Je(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",Je);function At(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(R=>R&&R.id===u)||y[0]||d}pe(),Vt(),X()}}function kt(y){Sn(y).then(Z=>{Z?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Lt(y){y.preventDefault(),y.stopPropagation(),u&&kt(u)}function Ut(y,Z){y.preventDefault(),y.stopPropagation(),kt(Z)}function Tt(y,Z,R){y.preventDefault(),y.stopPropagation(),ae.open(Z,{missing_state:R})}function bn(y,Z){m[y]=Z,X(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",wd(u,y,Z.length===0?null:Z))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Wt(y,Z){let R=d||{},ke=R.metadata&&typeof R.metadata=="object"?R.metadata:{},tt={};for(let nt of["impl_runtime","impl_model","impl_effort"])tt[nt]=Object.hasOwn(m,nt)?m[nt]:typeof ke[nt]=="string"?ke[nt]:"";tt[y]=Z;let et=Pd(tt,S(),fe()),_t={};for(let nt of["impl_runtime","impl_model","impl_effort"])_t[nt]=m[nt],m[nt]=et[nt]||"";X(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...et,orchestration_runtime:fe()})).then(nt=>{let bt=Array.isArray(nt)?nt[0]:nt;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");d=bt;for(let an of["impl_runtime","impl_model","impl_effort"])delete m[an];X()}).catch(()=>{for(let nt of["impl_runtime","impl_model","impl_effort"])_t[nt]===void 0?delete m[nt]:m[nt]=_t[nt];X(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qt(y,Z,R){if(!s||!u)return!1;try{let ke=await Promise.resolve(s(y,Z)),tt=Array.isArray(ke)?ke[0]:ke;return tt&&typeof tt=="object"&&tt.id?(d=tt,!0):(ue(R,"error"),!1)}catch{return ue(R,"error"),!1}}function rn(y){setTimeout(()=>{try{let Z=e.querySelector(y);Z&&typeof Z.focus=="function"&&Z.focus()}catch{}},0)}function sn(){F=!0,C=d&&d.title||"",X(),rn('.detail-edit__input[data-edit="title"]')}function pn(y){C=y.target.value}function Re(){F=!1,C="",X()}function Ie(){Qt("edit-text",{id:u,field:"title",value:C},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z&&(F=!1,C=""),X()})}function O(){W=!0,M=d&&d.description||"",X(),rn('.detail-edit__textarea[data-edit="description"]')}function be(y){M=y.target.value}function Pe(){W=!1,M="",X()}function yt(){Qt("edit-text",{id:u,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Z=>{Z&&(W=!1,M=""),X()})}function Nt(y,Z,R,ke){if(y.key==="Escape"){y.stopPropagation(),R();return}y.key==="Enter"&&(!ke||y.ctrlKey||y.metaKey)&&(y.preventDefault(),Z())}function Ct(y){let Z=y.target.value;Qt("update-status",{id:u,status:Z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function Zt(y){let Z=Number(y.target.value);Qt("update-priority",{id:u,priority:Z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function qt(y){re=y.target.value}function tn(){let y=re.trim();y.length!==0&&Qt("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Z=>{Z&&(re=""),X()})}function kn(y){if(y.key==="Escape"){y.stopPropagation(),re="",X();return}y.key==="Enter"&&(y.preventDefault(),tn())}function Ft(y){Qt("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>X())}let $n={onCopyPath:Ut,onOpenDoc:Tt};function xn(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Vn(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function T(y){let R=(Array.isArray(y.dependencies)?y.dependencies:[]).map(ke=>({id:xn(ke),icon:Vn(ke)})).filter(ke=>ke.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${R.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${R.map(ke=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ke.id)}
                  >
                    ${ke.icon?`${ke.icon} `:""}${ke.id}
                  </button>`:c`<span class="detail-dep"
                    >${ke.icon?`${ke.icon} `:""}${ke.id}</span
                  >`)}
          </div>`}
    `}function I(y){let Z=y.metadata||{},R=y.workflow||{},ke=R.stages||{},tt=ke.spec&&ke.spec.stale,et=ke.impl&&ke.impl.stale,_t=R.quick_fix_review?.state==="stale",nt=ke.plan||null,bt=R.route_source==="derived",an=R.route||Z.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${bt?" detail-kv__v--derived":""}"
          title=${bt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${bt?"unset":an}</span
        >
      </div>
      ${R.route!=="quick_fix"||Object.hasOwn(Z,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Z.spec_review||"\uC5C6\uC74C"}${tt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${nt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${nt?.approval_receipt||"\uC5C6\uC74C"}${nt?.approval_state==="stale"?" \xB7 stale":nt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${R.route!=="quick_fix"||Object.hasOwn(Z,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Z.impl_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${R.resolver.attempt} \xB7 ${R.resolver.prior_sha} \u2192 ${R.resolver.sha}`}
              >${`${R.resolver.prior_sha.slice(0,7)} \u2192 ${R.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${R.route==="quick_fix"||Object.hasOwn(Z,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${Z.quick_fix_review||"\uC5C6\uC74C"}${_t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${R.planned_execution.kind}</span>
            </div>
            ${R.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${R.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${R.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xn(R.exec_receipt)}</span
            >
          </div>`:""}
      ${R.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${R.impl_entry.actor}@${R.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Z.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Z.pr_url}</span>
          </div>`:""}
    `}let Ue={route:["quick_fix","spec_backed","full_plan"]};async function Ke(y,Z){let R=Z.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&R!=="full_plan"&&!window.confirm(`full_plan \u2192 ${R||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){X();return}await Qt("update-workflow-meta",{id:u,key:y,value:R},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),X()}function st(y){let Z=y.metadata||{};return c` ${((ke,tt)=>{let et=Ue[ke],_t=typeof Z[ke]=="string"?Z[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${nt=>Ke(ke,nt)}
        >
          <option value="" ?selected=${!et.includes(_t)}>
            ${tt}
          </option>
          ${et.map(nt=>c`<option value=${nt} ?selected=${_t===nt}>${nt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function vt(y,Z){return F?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${C}
            @input=${pn}
            @keydown=${R=>Nt(R,Ie,Re,!1)}
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
              @click=${Re}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${un(Z).map(R=>c`<span class="detail-usage-total" title=${R.tooltip}
              >${R.label}</span
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
    `}function Xt(y){let Z=cn(y.created_at),R=cn(y.updated_at);return!Z&&!R?c``:c`
      ${Z?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Z}</span>
          </div>`:""}
      ${R?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
    `}function gr(y,Z){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ct}
        >
          ${lh.map(R=>c`<option value=${R} ?selected=${R===y}>${R}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Zt}
        >
          ${ch.map(R=>c`<option value=${String(R)} ?selected=${R===Z}>
                P${R}
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
              @input=${be}
              @keydown=${Z=>Nt(Z,yt,Pe,!0)}
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
                @click=${Pe}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function _(y){let Z=typeof y.notes=="string"?y.notes:"";return Z.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Z}</div>
    `}function w(y){let Z=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Z.map(R=>c`<span class="detail-label-chip"
              >${R}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${R}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+R}
                @click=${()=>Ft(R)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${re}
            @input=${qt}
            @keydown=${kn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${tn}
          >
            추가
          </button>
        </span>
      </div>
    `}function G(){if(!u)return c``;let y=d||{},Z=String(y.id||u),R=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Et(),tt=y.status||"open",et=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",_t=y.description||"",nt={...y,metadata:{...y.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Lt}
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
          ${vt(R,ke)}
          ${Ad(nt)}
          ${xd({metadata:nt.metadata,workspace_values:Le(),catalog:S(),execution_defaults:te(),expanded:j,presets:Se()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:bt=>{j=bt,X()},onEdit:(bt,an)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){Wt(bt,an??"");return}bn(bt,an??"")},onPresetSelect:bt=>{h=bt,k=[],X()},onPresetApply:()=>{P()}})}
          ${Od({md:nt.metadata,catalog:Y,workspace_defaults:ie,handlers:{onExecChange:bn}})}
          ${gr(tt,et)} ${Xt(y)}
          ${Ir(_t)}
          ${ud(Fe,$t,{expanded:me,draft:Me,sending:V,error:Te})}
          ${_(y)} ${w(y)} ${T(y)}
          ${I(y)} ${st(y)}
          ${id(y,$n)}
          ${jd({expanded:Ye,loading:rt,error:gt,data:ht},{onToggle:Ht})}
          ${Fd(xt(),H,{total:ke,expanded:Xe},ve)}
        </div>
      </div>
    `}function X(){ot(G(),e)}return{load(y){y!==u&&(m={},h="",k=[],j=!1,ge(),Ae(),lt(),ft(),xe()),u=y,d=null,At(),x(),Q!==y&&Ee(y)},clear(){u=null,d=null,m={},h="",b=!1,k=[],j=!1,ge(),Ae(),lt(),ft(),xe(),ae.close(),qe.close(),ot(c``,e)},destroy(){$e&&($e(),$e=null),Ve&&(Ve(),Ve=null),de&&(de(),de=null),document.removeEventListener("keydown",Je),ut||(ae.destroy(),L&&L.parentNode&&L.parentNode.removeChild(L)),qe.destroy(),Oe.parentNode&&Oe.parentNode.removeChild(Oe),u=null,d=null,xe(),h="",b=!1,k=[],Ae(),lt(),ft(),ot(c``,e)}}}function Ud(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}var uh="(max-width: 640px)";function _a(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(uh),n=!!t.matches;e(n);let r=s=>{let a=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);a!==n&&(n=a,e(a))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function dh(){return{lanes:{done:!0},areas:{}}}function js(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ph(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:js(r.lanes),areas:js(r.areas)}:{lanes:js(r),areas:{}}}catch{return null}}function Wd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ma(e,t=dh()){let n={lanes:js(t.lanes),areas:js(t.areas)},r=ph(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let a=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:a}},Wd(e,s),a},toggleArea(o){let a=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:a}},Wd(e,s),a}}}var Gn=e=>e??Gt;function ga(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Hd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Us(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ba(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ha(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function ya(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function fh(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ga(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Gd(e,t){let n=fh(e,t);return n?c`<button
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
            >${ya(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Us(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function os(e){let t=yn(e.created_at),n=yn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function _h(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ws(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function va(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function jn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?_h(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Bs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var mh={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Kd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:mh[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function wa(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function gh(e){return c`<div
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
        >`:""}${s?gh(s):""}
  </div>`}function $a(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function bh(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Vd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Yd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function xa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function hh(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=er(e.usage),s=yn(e.done_at);return c`<div
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
      ${Yd(e.pr_url,e.pr_number)}${s?c`<span
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
              >`):r?c`<span class="worker-usage" title=${vs(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Hd(e.work_kind)}
            >작업 ${Us(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Bn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return hh(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=un(e.usage),o=er(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!i,u=l?yn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,j=e.lane==="done"?"":$a(e.workflow),K=e.lane==="done"?"":Vd(e.from_id),Y=xa(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,Q=Yd(e.pr_url,e.pr_number),U=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",F=r.map(We=>We===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${We}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${We===e.completion_badge&&e.completion_title||""}
          >${We}</span
        >`),W=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",C=s.length>0?s.map(We=>c`<span class="worker-usage" title=${We.tooltip}
              >${We.label}</span
            >`):o?c`<span class="worker-usage" title=${vs(e.usage)}
            >${o}</span
          >`:"",M=a?c`<span
        class="merge-step${a.failed?" merge-step--failed":""}"
        style=${`--progress: ${a.percent}%`}
        >${a.label}${a.index>0?c`<span class="merge-step__n"
              >${a.index}/${a.total}</span
            >`:""}</span
      >`:"",re=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ge=e.cancel_action?c`<button
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
      </button>`:"",le=e.discard,_e=le?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${le?.attempt_id||""}
          data-operation-id=${le?.operation?.operation_id||""}
          data-discard-mode=${le?.confirmation||"unmerged"}
          ?disabled=${le?!le.enabled:e.discard_enabled===!1}
          title=${le?le.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${le?.label||"\uD3D0\uAE30"}
        </button>`:"",Ee=e.stale_work||null,Fe=Ee?c`${Ee.can_resume||Ee.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Ee.action_id}
            ?disabled=${Ee.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Ee.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Ee.action_id}
            ?disabled=${Ee.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Ee.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Ee.action_id}
            ?disabled=${Ee.locked}
          >
            다시 확인
          </button>`:""}`:"",we=Ee?c`<div class="worker-mini__stale">
        <strong>${Ee.title}</strong>
        <span>${Ee.summary}</span>
        <span>${Ee.cause}</span>
        ${Ee.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",J=e.revise_action?c`<button
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
        </button>`:"",Te=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Me=b||j||K||Te||C?c`<div class="worker-chips">
          ${b}${j}${K}${Te?wa(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${C}
        </div>`:"",V=ka(e.dependency_chips),q=Bs(e),me=t.actions?t.actions:"",Ae=!!(a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||le?.operation||e.revise_action||Ee);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${a?" worker-mini--merging":""}${a?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${Y}${K}${Q}${ie}${me}
          </div>
          <div class="worker-mini__row2">
            ${C}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${cn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Hd(e.work_kind)}
                  >작업 ${Us(e.work_ms)}</span
                >`:""}${F}${M}
            <span class="worker-mini__actions"
              >${re}${ge}${xe}${_e}</span
            >
            ${os(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${m}${k}${Y}${Q}${U}${F}${h}${W}${me}
            </div>
            <div class="worker-mini__body">${ie}${we}</div>
            ${V}${Me}${Ae?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${re}${ge}${xe}${_e}${J}${Fe}</span
                  >
                  ${Bs(e)}
                </div>`:""}
            ${os(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${k}${Y}${ie}${Q}${U}${F}${h}${W}${M}${re}${ge}${xe}${_e}${me}
            </div>
            ${V}${Me}${q} ${os(e)}`}
  </div>`}function yh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var vh={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function sl(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=vh[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=ka(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=$a(l),k=Vd(e.from_id),j=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
            >`:""}${bh(l)}${n.dep_action===!0?c`<span class="worker-card__head-actions"
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
    ${h||b||k||j?c`<div class="worker-chips">
          ${h}${b}${k}${wa(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${yh(t.lanes,e.id)}
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
                  </div>`:e.items.map(s=>e.lane==="candidate"?sl(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Bn(s))}
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
            ${n.lanes.map(s=>wh(s))}
          </div>`}
    </section>
  </div>`}function wh(e){let t=e.drop||{},n=e.badge?c`<span
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
  </section>`:""}function Ea(e){return e.replace(/\/+$/,"")}function kh(e,t){let n=Ea(e),r=Ea(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ta(e,t){let n=new Set;for(let r of e)for(let s of t){if(!kh(r,s))continue;let o=Ea(r),a=Ea(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function Qd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=Ta(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Zd=["parallel","serial","candidate"];function zs(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function ol(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Zd.includes(r.kind),l=Zd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=$h(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${zs(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function $h(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Xd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Jd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function ep(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function al(e){for(let t of ep(e))if(Object.hasOwn(Xd,t))return Xd[t];return null}function il(e){let t=null;for(let n of ep(e))Object.hasOwn(Jd,n)&&(t=Jd[n]);return t}function Ca(e){let t=al(e),n=il(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function tp(e,t){let n=al(e)??al(t),r=il(t)??il(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var np=160;function xh(e){return e.length>np?`${e.slice(0,np)}\u2026`:e}function Ah(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${xh(e.command)}</code>`:""}
  </div>`}function Sh(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Eh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function rp(e){let t=e.failure?Ca(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Ah(e.failure.cause_detail,e.failure.reason)}
          ${Sh(e.failure.reason)}
          ${Bs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Th(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Ch=new Set(["codex-runner"]);function Rh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Ch.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?yn(r.last_event_at,t):"",m=r?yn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${yn(a,t)}</span
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
      </div>`:""}`}var Oh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Lh(e){if(!e)return"";let t=Oh[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function ll(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(_e=>_e&&_e.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Eh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=bs(e),m=un(e.usage),h=er(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,j=e.landing,K=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,ie=Th(Y),Q=Y?ka(Y.dependency_chips):"",U=Rh(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),F=s&&e.workflow?.chips?.exec_receipt||null,W=$a(e.workflow),C=F?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xn(F)}`}
        >${`${F.kind}:${Do(F)}`}</span
      >`:"",M=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${ys(o)}</span
      >`:"",re=ie||W||M||C?c`<div class="rtile__meta">
          ${ie}${W}${M}${C}
        </div>`:"",ge=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,xe=s?"":os(e),le=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${K?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${xa(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${ge}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${Lh(o)}<span
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
                ${le}
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
                ${le}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${U}${e.rollup?Mo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:_i}):""}
    ${j?c`<div class="rtile__landing">
          <span
            class="merge-step${j.failed?" merge-step--failed":""}"
            style=${`--progress: ${j.percent}%`}
            >${j.label}${j.index>0?c`<span class="merge-step__n"
                  >${j.index}/${j.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Q}
    ${s?re:ie||W||u||m.length>0||h?c`<div class="rtile__meta">
            ${ie}${W}${wa(e.exec_chips)}
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
  </div>`}function sp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>ll(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var cl=new Set(["unavailable","not_applicable"]);function dr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function op(e){return e.filter(t=>t!==null).join(" \xB7 ")}function pr(e,t){return t===null?null:`${ur[e]}: ${t.display} (${ia[t.source]})`}function ul(e){return e.filter(t=>t!==null).join(`
`)}function Hs(e){if(typeof e!="object"||e===null)return null;let t=Sr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:ul(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ur.orchestration_model,e.model),n(ur.orchestration_effort,e.effort),n(ur.orchestration_speed,e.speed)])}}function Rr(e,t){let n=dr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=dr(e,"orchestration_effort"),s=dr(e,"orchestration_speed"),o=op([Fn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:ul(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",pr("orchestration_model",n),pr("orchestration_effort",r),pr("orchestration_speed",s)])}}function Ih(e,t){return e===null||e.value===null||cl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Mh(e){return e===null||cl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Ph(e){return e===null?null:e.value==="auto"?"auto":cl.has(e.resolution)?null:e.display}function fr(e,t){if(typeof e!="object"||e===null)return null;let n=dr(e,"impl_dispatch"),r=dr(e,"impl_runtime"),s=dr(e,"impl_model"),o=dr(e,"impl_effort"),a=dr(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":op([Ih(r,t??null),Mh(s),Ph(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ul(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",pr("impl_dispatch",n),pr("impl_runtime",r),pr("impl_model",s),pr("impl_effort",o),pr("impl_speed",a)])}}var dn="",Dh=["impl_runtime","impl_model","impl_effort"],Nh=["claude_account","codex_account"],qh=5,Ra=1;function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Oa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(N=>ue(N,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,j=null,K={},Y="",ie="",Q=!1,U=!1,F=!1,W=null,C=!1;function M(){let N=t.queue?t.queue():null;return wn(N)?N:null}function re(){let N=M();return N?N.runner_catalog:null}function ge(){let N=M();return N&&wn(N.execution_defaults)?N.execution_defaults:null}function xe(){let N=t.implPresetStore?.get();return wn(N)&&Array.isArray(N.presets)?N:null}function le(){return r===null?{}:{root_dir:r}}async function _e(N,ne){return C||!n?null:await n(N,ne)}function Ee(N){N&&wn(N.queue)&&t.onQueueAdopt?.(N.queue)}async function Fe(N,ne){let he=M();if(!he||C)return null;let E=await _e(N,{...ne,...le(),expected_revision:he.revision});if(Ee(E),r!==null&&E&&E.conflict){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:M()?.revision??he.revision;E=await _e(N,{...ne,...le(),expected_revision:H}),Ee(E)}return E}async function we(){l=!0,De();try{let N=await _e("get-session-defaults",{...le()});o=wn(N?.values)?{...N.values}:{},a={...o},i=Array.isArray(N?.warnings)?N.warnings:[]}catch(N){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${N instanceof Error?N.message:String(N)}`)}finally{l=!1,De()}}async function J(){let N=hd(o,a);if(Object.keys(N).length!==0){try{let ne=await _e("set-session-defaults",{values:N,...le()});o=wn(ne?.values)?{...ne.values}:{},a={...o},i=Array.isArray(ne?.warnings)?ne.warnings:[]}catch(ne){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}De()}}function Te(N,ne){if(!wn(N))return;let he=N.state;u={state:he==="usable"||he==="unusable"||he==="absent"?he:"absent",values:wn(N.values)?{...N.values}:{},warnings:Array.isArray(N.warnings)?N.warnings:[]},m={...u.values},ne&&(d={...m})}async function Me(){try{Te(await _e("get-workspace-accounts",{...le()}),!0)}catch(N){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${N instanceof Error?N.message:String(N)}`)}De()}async function V(N){try{let ne=await fetch(N);if(!ne.ok)return null;let he=await ne.json();if(!wn(he)||!Array.isArray(he.accounts))return null;let E=he.accounts.filter(H=>wn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:E,active:E.find(H=>H.active===!0)||null}}catch{return null}}async function q(){k=!0;let[N,ne]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage")]);C||(b={claude:N,codex:ne},De())}function me(){let N={};for(let ne of Nh){let he=Object.hasOwn(d,ne)?d[ne]:null,E=Object.hasOwn(m,ne)?m[ne]:null;he!==E&&(N[ne]=he)}return N}async function Ae(){let N=me();if(Object.keys(N).length!==0){try{Te(await _e("set-workspace-accounts",{values:N,...le()}),!1)}catch(ne){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}De()}}function We(N,ne){ne===dn?delete d[N]:d[N]=ne,De(),h=h.then(()=>Ae())}function pe(N,ne){if(Dh.includes(N)){it(N,ne);return}ne===dn?delete a[N]:a[N]=ne,De(),J()}function je(){let N=Et().orchestration_model,ne=vn({global:{orchestration_model:N??void 0},execution_defaults:ge(),runner_catalog:re()}).orchestration_model.value;return ne?Fn(re(),ne):null}function pt(N,ne){typeof ne=="string"&&ne.length>0?a[N]=ne:delete a[N]}function it(N,ne){let he=ne===dn?void 0:ne,E=gd({impl_runtime:N==="impl_runtime"?he:a.impl_runtime,impl_model:N==="impl_model"?he:a.impl_model,impl_effort:N==="impl_effort"?he:a.impl_effort},re(),je());pt("impl_runtime",E.impl_runtime),pt("impl_model",E.impl_model),pt("impl_effort",E.impl_effort),De(),J()}async function $t(){let N=M();if(!N)return;let ne={orchestration_model:N.orchestration_model??null,orchestration_effort:N.orchestration_effort??null,orchestration_speed:N.orchestration_speed??null},he=yd(ne,{...ne,...K});if(Object.keys(he).length!==0){try{let E=await Fe("worker-queue-set-orchestration-defaults",{values:he});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}K={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}}function ut(N,ne){K[N]=ne===dn?null:ne,De(),$t()}function L(N){if(j=N,!N){De();return}let ne=re(),he=Et(),E=he.orchestration_model;E&&!Ns(ne,N).includes(E)&&(K.orchestration_model=null,E=null);let H=he.orchestration_effort;H&&!Zi(ne,N,E||Tn).includes(H)&&(K.orchestration_effort=null),De(),$t()}async function ae(N){if(!(!M()||N<Ra)){try{await Fe("worker-queue-set-slots",{slots:N})}catch(ne){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}De()}}async function Oe(N){if(!(!M()||N<Ra||N>qh)){try{await Fe("worker-queue-set-serial-lane-count",{count:N})}catch(ne){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}De()}}async function qe(N,ne){let he=N==="auto_advance"?"worker-automation-toggle":N==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Fe(he,{on:ne})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}function Ye(){let N={},ne=Et();for(let he of ra){let E=or.includes(he)?ne[he]:a[he];typeof E=="string"&&E.length>0&&(N[he]=E)}return N}async function rt(){let N=xe();if(!N)return;let ne=Ye();if(Object.keys(ne).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let he=(N.presets||[]).find(H=>H.id===Y),E=ie.trim()||(he?he.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=he?await _e("impl-preset-update",{expected_revision:N.revision,id:he.id,name:E,settings:ne}):await _e("impl-preset-create",{expected_revision:N.revision,name:E,settings:ne});if(H&&H.applied){if(ie="",!he&&Array.isArray(H.presets)){let Le=H.presets.find(x=>x.name===E);Y=Le?Le.id:Y}De()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function gt(){let N=xe();if(!(!N||Y.length===0))try{let ne=await _e("impl-preset-delete",{expected_revision:N.revision,id:Y});ne&&ne.applied?(Y="",De()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De())}catch(ne){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}}function ht(N){o=wn(N.values)?{...N.values}:{},a={...o},i=Array.isArray(N.warnings)?N.warnings:[],wn(N.queue)&&(t.onQueueAdopt?.(N.queue),K={})}async function se(){let N=xe(),ne=M();if(!N||!ne||Y.length===0)return;let he=E=>({preset_id:Y,expected_revision:N.revision,expected_queue_revision:E,...le()});try{let E=await _e("apply-impl-preset-global",he(ne.revision));if(E&&E.applied&&ht(E),r!==null&&E&&E.queue_applied===!1){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:M()?.revision??ne.revision;E=await _e("apply-impl-preset-global",he(H)),E&&E.applied&&ht(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}async function ee(){U=!0,F=!1,De();try{let N=await _e("get-worker-system-prompt",{});!N||typeof N!="object"||Array.isArray(N)?F=!0:W=N}catch{F=!0}finally{U=!1,De()}}function Be(){if(Q=!Q,Q&&!W){ee();return}De()}function lt(){let N=es({loading:U,error:F});if(N)return N;if(!W)return"";let ne=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ne.map(he=>c`<div class="settings-dialog__sp-variant" data-variant=${he.key}>
            <div class="settings-dialog__sp-cond">${he.condition}</div>
            ${sr(he.label,he.system_prompt)}
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
        aria-expanded=${Q?"true":"false"}
        @click=${Be}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?lt():""}
    </section>`}function ve(N,ne,he,E,H,Le,x){let S=H[N]??dn,te=Qi(N,he,H,ge(),re(),x),fe=te.options.find(Ne=>Ne.value===S),Se=S===dn?te.full_value:fe?.full_value;return c`<select
        class=${S===dn?"settings-dialog__unset":""}
        data-key=${N}
        aria-label=${ne}
        title=${Se||""}
        ?disabled=${Le===!0||te.disabled}
        .value=${Cr(String(S))}
        @change=${Ne=>E(N,String(Ne.target.value))}
      >
        <option value=${dn} ?selected=${S===dn}>
          ${te.unset_label}
        </option>
        ${te.options.map(Ne=>c`<option
              value=${Ne.value}
              title=${Ne.full_value||""}
              ?selected=${Ne.value===S}
            >
              ${Ne.label}
            </option>`)}
      </select>
      ${S===dn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function ze(N,ne,he,E,H,Le=!1,x){return c`<div
      class=${`settings-dialog__row${Le?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        ${ve(N,ne,he,E,H,Le,x)}
      </span>
    </div>`}function ct(N,ne){let he=ne?ne.active:null;return wn(he)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${N==="claude"?he.email:ss({...he,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function dt(N,ne,he){let E=b[he],H=Object.hasOwn(d,N)?d[N]:dn,Le=he==="claude"?ua:ss,x=!!E?.accounts.some(S=>S.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ne}
          data-account-key=${N}
          @change=${S=>We(N,String(S.target.value))}
        >
          <option value=${dn} ?selected=${H.length===0}>
            ${ct(he,E)}
          </option>
          ${H.length>0&&!x?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(S=>c`<option value=${S.key} ?selected=${S.key===H}>
                ${Le(S)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ft(){let N=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${N} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${N}`:null}function Dt(N,ne,he,E,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ne}-on)`}
        ></i>
        ${N}
      </span>
      <span class="settings-dialog__controls">
        ${ve(he,`${N} \uBAA8\uB378`,E,pe,a,!1)}
        ${ve(H,`${N} effort`,aa,pe,a,!1)}
      </span>
    </div>`}function Vt(N,ne,he,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${N}
          aria-pressed=${E?"true":"false"}
          aria-label=${ne}
          @click=${()=>qe(N,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${he}</span>
      </span>
    </div>`}function Ht(N,ne,he,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${N}>
          <button
            type="button"
            aria-label=${`${ne} \uAC10\uC18C`}
            @click=${()=>E(he-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${he}</span>
          <button
            type="button"
            aria-label=${`${ne} \uC99D\uAC00`}
            @click=${()=>E(he+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function xt(N){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${N.rows.length>0?`\uBCC0\uACBD ${N.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${N.rows.map(ne=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ne.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ne.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ne.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ne.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${N.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${N.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Et(){let N=M(),ne={};for(let he of or)ne[he]=Object.prototype.hasOwnProperty.call(K,he)?K[he]:N&&typeof N[he]=="string"?N[he]:null;return ne}function Xe(){let N=re(),ne=a.impl_runtime,he=a.impl_model,E=xe(),H=M(),Le=Et(),x=Ns(N,j),S=ns(N,void 0).filter(de=>de!==Tn),te=Zi(N,j,Le.orchestration_model||Tn).filter(de=>de!==Tn),fe=Y?(E?.presets||[]).find(de=>de.id===Y):null,Se=fe?bd(Ye(),wn(fe.settings)?fe.settings:{}):null,Ne=H&&typeof H.slots=="number"?H.slots:Ra+1,A=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:Ra,P=ge()?.supported===!0,$e=ft(),Ve=Qi("workflow_mode",Ps,a,ge(),N);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${$e?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${$e}
          </div>`:""}
      ${P?"":c`<div
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
                .value=${Cr(Y)}
                @change=${de=>{Y=String(de.target.value),De()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(de=>c`<option
                      value=${de.id}
                      ?selected=${de.id===Y}
                    >
                      ${de.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Se||Se.rows.length===0}
                @click=${se}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Cr(ie)}
                @input=${de=>{ie=String(de.target.value)}}
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
            ${Se?xt(Se):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Cr(j||dn)}
                    @change=${de=>{let Je=String(de.target.value);L(Je===dn?null:Je)}}
                  >
                    <option value=${dn} ?selected=${!j}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${j==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${j==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${ze("orchestration_model","\uBAA8\uB378",x,ut,Le)}
              ${ze("orchestration_effort","effort",te,ut,Le)}
              ${ze("orchestration_speed","\uC18D\uB3C4",Ms,ut,Le)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${dt("claude_account","Claude","claude")}
              ${dt("codex_account","Codex","codex")}
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
                      @click=${()=>pe("workflow_mode",dn)}
                    >
                      ${Ve.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ps.map(de=>c`<button
                          type="button"
                          data-mode=${de}
                          aria-pressed=${String(a.workflow_mode===de)}
                          @click=${()=>pe("workflow_mode",de)}
                        >
                          ${de}
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
              ${Dt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ds,"spec_review_effort")}
              ${Dt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",oa,"plan_review_effort")}
              ${Dt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ds,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${ze("impl_runtime","\uC704\uC784 \uB300\uC0C1",sa,pe,a)}
              ${ze("impl_model","\uBAA8\uB378",ns(N,ne),pe,a)}
              ${ze("impl_effort","effort",rs(N,ne,he),pe,a)}
              ${ze("impl_speed","\uC18D\uB3C4",Ms,pe,a)}
              ${ze("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",S,pe,a,!1,{...a,...Le})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Vt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Vt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Vt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Ne,de=>ae(de))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",A,de=>Oe(de))}
            </div>
            ${He()}
          `}
    `}function De(){C||ot(Xe(),e)}return{load(){K={};let N=[we(),Me()];return k||N.push(q()),Promise.all(N).then(()=>{})},render:De,sessionDraft:()=>({...a}),destroy(){C=!0,ot(c``,e)}}}function La(e){return c`<svg
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
  </svg>`}function ap(){return La(ms`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ip(){return La(ms`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function lp(){return La(ms`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cp(){return La(ms`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function up(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function dp(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return un(Bo(t));let n={};for(let i of Hn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Hn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?er(n):null}function Un(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function dl(e,t){let n=Un(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Fh(e,t){if(!Un(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function jh(e){if(!Un(e)||!Un(e.execution_defaults)||!Un(e.runner_catalog)||!Un(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=vn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Fn(e.runner_catalog,n.orchestration_model.value??""),s=Rr(n,e.runner_catalog),o=fr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function pp(e,t){let n=t.notify||(V=>ue(V,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,m=null,h=new Map;function b(){let V=t.workspacesState?t.workspacesState():[];return Array.isArray(V)?V.filter(q=>Un(q)):[]}function k(V){return b().find(q=>q.root_dir===V)||null}function j(V){return Fh(k(V),h.get(V))}function K(){for(let V of b()){let q=h.get(V.root_dir);q&&typeof q.revision=="number"&&typeof V.revision=="number"&&V.revision>=q.revision&&h.delete(V.root_dir)}}async function Y(V,q,me){let Ae=t.transport,We=j(q);if(!(!Ae||!Un(We))){try{let pe=await Ae(V,{...me,root_dir:q,expected_revision:We.revision});if(Un(pe?.queue)&&h.set(q,pe.queue),pe&&pe.conflict){let je=Un(pe.queue)&&typeof pe.queue.revision=="number"?pe.queue.revision:j(q)?.revision;pe=await Ae(V,{...me,root_dir:q,expected_revision:je}),Un(pe?.queue)&&h.set(q,pe.queue)}}catch(pe){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}J()}}function ie(V){u!==V&&(u=V,t.onFocusChange?.(u),J())}function Q(V){ie(u===V?null:V)}function U(V){if(d===V){W();return}F(),d=V;let q=k(V);a.textContent=`${q?.name||V} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=Oa(l,{root_dir:V,queue:()=>j(V),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:me=>{h.set(V,me),J()}}),m.load(),J()}function F(){m?.destroy(),m=null}function W(V){F(),d=null,s.hidden=!0,a.textContent="",V!==!0&&J()}let C=()=>W();i.addEventListener("click",C);function M(V){V.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",M);function re(V,q){let me=Math.max(q,V,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${q}\uAC1C \uC911 ${V}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:me},(Ae,We)=>We<V?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ge(V){let q=V.auto_advance===!0,me=V.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${q?" is-on":""}`}
        data-act="auto"
        aria-pressed=${q?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9\uD654`}
        title=${q?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${q?ip():ap()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${me?" is-on":""}`}
        data-act="merge"
        aria-pressed=${me?"true":"false"}
        aria-label=${`${V.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${me?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${lp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===V.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===V.root_dir?"true":"false"}
        aria-label=${`${V.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${cp()}
      </button>`}function xe(V){let q=jh(V);return q?c`<div class="mon2-deck__chips">
      ${q.orchestration?c`<span class="mon2-deck__chip" title=${q.orchestration.title}
            >오케 ${q.orchestration.text}</span
          >`:""}
      ${q.worker?c`<span class="mon2-deck__chip" title=${q.worker.title}
            >워커 ${q.worker.text}</span
          >`:""}
    </div>`:""}function le(V){let q=[];for(let[me,Ae]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let We=dl(V,me);We>0&&q.push(`${Ae} ${We}`)}return q.join(" \xB7 ")}function _e(V){let q=dl(V,"running"),me=typeof V.slots=="number"?V.slots:1;return c`<div
      class=${`mon2-deck__tile${u===V.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${V.root_dir}
      aria-pressed=${u===V.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${V.root_dir}>${V.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${me}\uAC1C \uC911 ${q}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${q}/${me}</span>
          ${re(q,me)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${V.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${ge(V)}</div>
        <span class="mon2-deck__counts">${le(V)}</span>
        ${xe(V)}
      </div>
    </div>`}function Ee(V){let q=t.doneItems?t.doneItems():[],me=t.rangeLabel?t.rangeLabel():"",Ae=dp(Array.isArray(q)?q:[]),We=pe=>V.reduce((je,pt)=>je+dl(pt,pe),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${V.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${me}`}
        >실행 ${We("running")} · 대기 ${We("queue")} · PR
        ${We("pr_wait")}${We("session_active")>0?` \xB7 \uC138\uC158 ${We("session_active")}`:""}
        · ${me} 완료
        ${Array.isArray(q)?q.length:0}</span
      >
      ${Ae===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${up(me)}
                  >${Ae}</span
                >`:Ae.map(pe=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${pe.provider}
                      title=${pe.tooltip}
                      >${pe.label}</span
                    >`)}
          </span>`}
    </div>`}function Fe(){let V=b();return V.length===0?"":c`${Ee(V)}
      <div class="mon2-deck__strip">
        ${V.map(q=>_e(q))}
      </div>`}function we(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function J(){K(),we(),d!==null&&!k(d)&&W(!0),ot(Fe(),r),m?.render()}function Te(V){let q=V.target;if(!q||typeof q.closest!="function")return;let me=q.closest("[data-root-dir]");if(!me)return;let Ae=me.getAttribute("data-root-dir")||"",We=q.closest("[data-act]")?.getAttribute("data-act");if(We==="worker"){t.gotoWorkerTab?.(Ae);return}if(We==="auto"){Y("worker-automation-toggle",Ae,{on:j(Ae)?.auto_advance!==!0});return}if(We==="merge"){Y("worker-merge-auto-toggle",Ae,{on:j(Ae)?.auto_merge!==!0});return}if(We==="gear"){U(Ae);return}Q(Ae)}function Me(V){if(V.key!=="Enter"&&V.key!==" ")return;let q=V.target;if(!q||typeof q.closest!="function")return;let me=q.closest('[data-root-dir][role="button"]');!me||me!==q||(V.preventDefault(),Q(me.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Te),r.addEventListener("keydown",Me),{render:J,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",Te),r.removeEventListener("keydown",Me),i.removeEventListener("click",C),F(),ot(c``,r),e.replaceChildren()}}}function fp(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));m&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Bh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ma="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Uh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Wh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",as="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Gs(e,t){return`${e}\0${t}`}function zh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Hh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ys(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=zh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,h]of s)for(let b of h)o.push({blocker:b,blockee:m});let a=Hh(e,t),i=new Map(r.map((m,h)=>[m,h])),l=r.slice(0,a).filter(m=>s.get(m).some(h=>Number(i.get(h))>Number(i.get(m)))),u=fp(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,a),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function _p(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ys(n,t)}function Gh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Kh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Vh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function pl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Yh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(Gs(a,l));let r=new Map,s=new Map;for(let a of e){let i=Gs(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Gs(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Zh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Qh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ia(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function fl(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Zs(e){let t=Vh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Kh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,m)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(pl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),m!==void 0&&r.add(Gs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let h=o(u);h!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Gs(u,d))}}function Qs(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Yh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Gh(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function mp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Ks(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function gp(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function bp(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(Ia(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function Vs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Pa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function _l(e,t,n){let r=Zs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Bh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Uh};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${fl(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:as}}if(e.kind==="chain"&&d===void 0)return{refused:as};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(Q=>Q.bead_id===e.bead_id);if(k<0)return;let j=k>0?d.entries[k-1]:null,K=k+1<d.entries.length?d.entries[k+1]:null,Y=Ks(d,k),ie=K!==null&&Ks(d,k+1);Y&&j!==null&&r.removeDep(e.bead_id,j.bead_id),ie&&K!==null&&r.removeDep(K.bead_id,e.bead_id),(Y||ie)&&j!==null&&K!==null&&r.addDep(K.bead_id,j.bead_id,u)},h=(k,j)=>{let K=n.cross_lanes.get(k),Y=K.entries.findIndex(ge=>ge.bead_id===e.bead_id),ie=K.entries.filter(ge=>ge.bead_id!==e.bead_id),Q=Math.max(0,Math.min(ie.length,Y>=0&&j>Y?j-1:j)),U=-1;if(ie.forEach((ge,xe)=>{n.fixed_members.has(ge.bead_id)&&(U=xe)}),Q<=U){r.state.refusal=Wh;return}let F=Y>=0?K.entries[Y]:d?.entries.find(ge=>ge.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Ys({status:K.status,entries:[...ie.slice(0,Q),F,...ie.slice(Q)]},n);let W=i.entries;if(Pa(W,K.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Vs(W)}}),K.status!=="confirmed")return;let C=W.findIndex(ge=>ge.bead_id===e.bead_id),M=C>0?W[C-1].bead_id:null,re=C+1<W.length?W[C+1].bead_id:null;if(M===null){re!==null&&r.addDep(re,e.bead_id,k);return}if(r.addDep(e.bead_id,M,k),re!==null&&(r.graph.get(re)||[]).includes(M)){let ge=K.entries.findIndex(xe=>xe.bead_id===re);(r.laneCreated(re,M)||ge>0&&K.entries[ge-1].bead_id===M&&Ks(K,ge))&&r.removeDep(re,M),r.addDep(re,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...gp(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Vs(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Zh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Ia(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let j=n.parallel_rows,K=j[Math.max(0,Math.min(j.length,t.marker_index))];if(!(!!K&&K.bead_id===e.bead_id)&&Qh(n,e.root_dir)&&b!==void 0){let ie=b>k?k:k-1;ie>=0&&ie!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Ia(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Ia(e.bead_id,e.root_dir,t.index,t.lane_id));return Qs(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function hp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ys(n,t);if(r.held)return{refused:Ma};let s=r.entries,o=Zs(t),a=[];mp(o,s,e),o.state.refusal===null&&bp(o,t,s,a);let i=Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Qs(o,t,i,a,{lane_id:e,correction:r})}function yp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries,o=Zs(t),a=[];mp(o,s,e),o.state.refusal===null&&bp(o,t,s,a);let i=Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}];return Qs(o,t,i,a,{lane_id:e,correction:r})}function vp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Ys(n,t),s=r.entries;return Qs(Zs(t),t,Pa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Vs(s)}}],[],{lane_id:e,correction:r})}function wp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:as};let r=Zs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Ks(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Qs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:gp(t,n,e,n.entries)})}function kp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Ks(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${fl(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function $p(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function xp(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function ml(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${fl(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Xh="\uC0AC\uC774\uD074";function Ap(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=pl(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Xh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function Sp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Ep={running:3,paused:2,failed:1};function Or(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Tp(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Cp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Or(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Or(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),m=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Ep[u.run_state],m=Ep[i];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var Rp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Xs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Da(e,t){let n=Rp.find(s=>s.step===e);if(!n)return null;let r=Rp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Op(e){let t=Xs.findIndex(n=>n.step===e);return Xs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Lr(e){let t=Xs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Jh(e){let t=Xs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Xs.length}}function Na(e){let t=Jh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var bl=new Set(["queued","running","retry_pending","repairing"]),Lp=new Set(["failed","succeeded"]),ey={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Js={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ty={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Js.base_containment,child_sweep:Js.child_sweep,branch_cleanup:Js.branch_cleanup,parent_close:Js.parent_close};function ny(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ry(e,t,n){return!["verify","deploy"].includes(e.kind)||![...bl,...Lp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function sy(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function gl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=ey[s];if(!o)return null;let a=Da(n,`${r} ${o}`);return a?{...a,active:bl.has(s),failed:s==="failed"}:null}function oy(e){return!e||typeof e!="object"?null:ty[e.step]||null}function eo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=oy(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=ny(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&ry(k,t,i)).sort(sy):[],u=a?l:[],d=u.find(k=>bl.has(k.state));if(d)return gl(d);if(s)return s.step==="repo_operations"&&l[0]?gl(l[0],!0):null;let m=u.find(k=>Lp.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return gl(m);if(r){let k=Da(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Js[e.cleanup_cursor]:null;if(!h)return null;let b=Da(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function qa(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ay="\uBBF8\uC801\uC7AC";function hl(e,t){let n=Lo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function Ip(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=hl(o,{id:l,location_label:s.get(l)||ay}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function yl(e,t){return`${e}\0${t}`}function Mp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function vl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function to(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Pp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${to(s)})`,location_label:to(s),scope:null,same_lane_ahead:!1};let a=vl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function Dp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=yl(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=yl(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of h){let j=r.get(k);j&&j!==u&&!b.includes(j)&&b.push(j)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...s.get(m)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let m=n.get(d);o(d,i)&&m&&u.push(m)}u.length>0&&a.set(i,u)}return a}function Np(e,t){return yl(e,t)}var qp=1,no=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],kl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],is={show_blocked:!0,spec:"all"},Fp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function iy(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Or(r)||(n=typeof r.status=="string"?r.status:null);return n}function ly(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Or(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function cy(e,t){let{winners:n,resumed_from_ids:r}=Cp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Rn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function jp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Bt(e){return e&&typeof e=="object"?e:{}}function uy(e,t,n){let r=Bt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>vn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Bp(Rr(l,o),Rr(u,o)),m=Bp(fr(l,null),fr(u,null));return d||m?{orchestration:d,worker:m}:null}function Bp(e,t){return!e||t&&t.text===e.text?null:e}function Up(e,t){let n=vl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function dy(e,t,n){let r=t.get(e);if(!r)return Up(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return to(r)}function py(e,t,n,r){let s=t.get(e);if(!s)return{label:Up(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":to(s),title:""}}function fy(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function _y(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function my(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,ie)=>{let Q=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(Q.length===0)return;let U=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",F=n.get(Q),W=F?F.state:void 0,C=W==="running"||W==="pr_wait"||W==="done",M=!F||W==="runnable",re=F&&F.lane==="parallel"&&typeof F.position=="number"?F.position-1:null,ge=py(Q,n,r,t),xe=b.length>0?b[b.length-1].id:null,le=m==="confirmed"&&xe!==null&&!(t.get(Q)||[]).includes(xe);b.push({id:Q,title:s.get(Q)||Q,root_dir:F?F.root_dir:U,workspace_name:F?F.workspace_name:o.get(U)||"",seq:ie+1,location_label:ge.label,location_title:ge.title,draggable:!C,fixed:C,done:W==="done",unplaced:M,mismatch:le,...re!==null?{queue_index:re}:{}})}),b.forEach((Y,ie)=>{Y.seq=ie+1});let k=b.length>0&&b.every(Y=>Y.done),j=b.filter(Y=>!Y.fixed&&a.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),K=_y(d,m,b,k,j,a);i.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:j,...K})}),i}function gy(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function by(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:h}=gy(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:m})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=a.get(d);m?m.push(l):a.set(d,[l])}let i=(l,u,d)=>{let m=u.cards[0],h={id:m.id,title:m.title,location_label:dy(m.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=Ta(l[u].scope,l[d].scope);m.length!==0&&(i(l[u],l[d],m),i(l[d],l[u],m))}}function wl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Fa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function $l(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...is,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&no.some(L=>L.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let L of s)L&&typeof L.root_dir=="string"&&u.set(L.root_dir,L);let d=new Map;for(let L of s)L&&typeof L.root_dir=="string"&&d.set(L.root_dir,L.name||L.root_dir);for(let L of r)L&&typeof L.root_dir=="string"&&d.set(L.root_dir,L.name||L.root_dir);let m=[],h=[],b=[],k=[],j=[],K=[],Y=new Map,ie=new Map,Q=new Map,U=new Map,F=new Map,W=new Map,C=new Map,M=new Set,re=new Map,ge=new Map,xe=new Map;for(let L of r){if(!L||typeof L.root_dir!="string")continue;let ae=L.root_dir,Oe=L.name||ae,qe=u.get(ae),Ye=qe&&typeof qe.revision=="number"?qe.revision:typeof L.revision=="number"?L.revision:0,rt=Bt(L.attempts),gt=Bt(L.bead_titles);for(let[A,P]of Object.entries(gt))typeof P=="string"&&P.length>0&&xe.set(A,P);let ht=Bt(L.bead_times),se=Bt(L.pr_observations),ee=Bt(L.admission),Be=Bt(L.revise_parked),lt=Bt(L.merge_queue_state),He=Bt(L.cleanup_failed),ve=Bt(L.discard_operations),ze=Bt(L.bead_blocked_by);Object.hasOwn(L,"bead_scope")&&re.set(ae,Bt(L.bead_scope));let ct=Bt(L.bead_workflow),dt=Bt(L.pr_activity),ft=Array.isArray(L.repo_operations)?L.repo_operations:[],Dt=Array.isArray(L.merge_queue)?L.merge_queue:[],Vt=new Set(Dt.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Ht=new Map(Dt.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),xt=Array.isArray(L.queue)?L.queue:[];for(let A of[...xt,...Array.isArray(L.pr_wait)?L.pr_wait:[]])A&&typeof A.bead_id=="string"&&typeof A.armed_by_lane=="string"&&A.armed_by_lane.length>0&&W.set(A.bead_id,A.armed_by_lane);for(let A of Array.isArray(L.disarmed_on_load)?L.disarmed_on_load:[])typeof A=="string"&&A.length>0&&M.add(A);let Et=(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).filter(A=>A&&/^s[1-5]$/.test(A.id)&&Array.isArray(A.entries)),Xe=Bt(L.lane_states),De=typeof L.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(L.serial_lane_count))):Math.min(5,Et.length);Q.set(ae,De),U.set(ae,xt.length);let N=new Map(Et.map(A=>[A.id,A])),ne=new Map;for(let A of Et)for(let P of A.entries)P&&typeof P.bead_id=="string"&&ne.set(P.bead_id,A.id);for(let[A,P]of Object.entries(ze))Array.isArray(P)&&F.set(A,P.filter($e=>typeof $e=="string"&&$e.length>0));let he=Array.isArray(L.done)?L.done:[];for(let A of he)A&&typeof A.bead_id=="string"&&K.push({id:A.bead_id,root_dir:ae,workspace_name:Oe});let E=new Map;for(let A of he)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&E.set(A.bead_id,A.added_at);let H=A=>({id:A,title:gt[A]||A,root_dir:ae,workspace_name:Oe,expected_revision:Ye,draggable:!1,...Bt(ht[A]).created_at?{created_at:Bt(ht[A]).created_at}:{},...Bt(ht[A]).updated_at?{updated_at:Bt(ht[A]).updated_at}:{}}),Le=A=>{let P=ct[A]?.chips?.pr;return P&&typeof P.number=="number"&&typeof P.url=="string"?{pr_number:P.number,pr_url:P.url}:{}},x=A=>Object.hasOwn(ze,A)?{blocked_by:Array.isArray(ze[A])?ze[A].filter(P=>typeof P=="string"&&P.length>0):[]}:{},S=new Set;for(let[A,P]of cy(rt,E)){S.add(A);let $e=P.run_state==="failed"?fy(rt,P.attempt_id):null;$e!==null&&C.set(A,$e),h.push({...H(A),lane:"running",...x(A),...ne.has(A)?{serial_lane_id:ne.get(A)}:{},attempt_id:P.attempt_id,run_state:P.run_state,status:P.status||void 0,workflow:ct[A]||null,can_pause:P.can_pause,can_resume:P.can_resume,started_at:P.started_at,last_event_at:P.last_event_at,last_activity:P.last_activity,legs:P.legs,runner:P.runner,model:P.model,effort:P.effort,speed:P.speed,resumed_from:P.resumed_from,continuation_mode:P.continuation_mode,usage:P.usage,exec_chips:{orchestration:Hs(P),worker:null},discard:jn(ve,A,{attempt_id:P.attempt_id}),badges:P.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:P.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:P.run_state==="failed"})}for(let[A,P]of Tp(rt)){if(h.some(de=>de.id===A))continue;let $e=P.attempt,Ve=P.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(A),lane:"running",kind:"session",...x(A),attempt_id:typeof $e.attempt_id=="string"?$e.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ct[A]||null,can_pause:!1,can_resume:!1,started_at:P.started_at,last_event_at:typeof $e.last_event_at=="number"?$e.last_event_at:null,last_activity:$e.last_activity&&typeof $e.last_activity=="object"?$e.last_activity:null,legs:Array.isArray($e.legs)?$e.legs:[],runner:typeof $e.runner=="string"?$e.runner:null,model:typeof $e.model=="string"?$e.model:null,effort:typeof $e.effort=="string"?$e.effort:null,speed:typeof $e.speed=="string"?$e.speed:null,resumed_from:null,continuation_mode:null,usage:$e.usage&&typeof $e.usage=="object"?$e.usage:null,exec_chips:{orchestration:Hs($e),worker:null},discard:jn(ve,A,{merge_queued:!0}),badges:[P.origin==="auto"?`${Ve} \xB7 \uC790\uB3D9`:Ve],alert:!1})}for(let A of Array.isArray(L.session_active)?L.session_active:[]){let P=A&&A.bead_id;typeof P!="string"||S.has(P)||(S.add(P),Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&F.set(P,A.blocked_by.filter($e=>typeof $e=="string"&&$e.length>0)),typeof A.title=="string"&&A.title.length>0&&xe.set(P,A.title),h.push({...H(P),title:A.title||gt[P]||P,lane:"running",kind:"session",status:"in_progress",started_at:wl(A.started_at)??wl(A.updated_at)??void 0,updated_at:wl(A.updated_at)??void 0,workflow:A.workflow||null,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter($e=>typeof $e=="string"&&$e.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(A.session_refs)?A.session_refs:[],badges:[],alert:!1}))}for(let A of Array.isArray(L.pr_wait)?L.pr_wait:[]){let P=A&&A.bead_id;if(typeof P!="string"||S.has(P))continue;S.add(P);let $e=Bt(se[P]),Ve=Bt($e.pr),de=$e.gate?Bt($e.gate):null,Je=Vt.has(P),At=Ht.get(P)?.continuation_action||null,kt=!!At&&At.continuation===null,Lt=lt.active===P,Ut=A.external===!0,Tt=He[P]||null,bn=Bt(dt[P]),Wt=eo({bead_id:P,merge_sha:A.merge_sha,cleanup_cursor:A.cleanup_cursor,merge_progress:bn.merge_progress||null,cleanup_failed:Tt,repo_operations:ft}),Qt=qa(Wt),rn=!!de&&de.base_badge==="\uCDA9\uB3CC",sn=!!Tt&&["child_sweep","branch_cleanup","parent_close"].includes(Tt.step)&&!!de&&de.tier==="merged",pn=Ut&&!!Tt&&!!de&&de.tier==="merged",Re=!!de&&["closed_unmerged","review","undecidable"].includes(de.tier)&&de.reason!=="review_receipt_undetermined",Ie=jn(ve,P,{external:Ut,merge_active:Lt||Wt?.step==="merge",merge_queued:Je,cleanup_active:Qt,merged:!!Tt||de?.tier==="merged"}),O=!!Ie.operation;b.push({...H(P),lane:"pr_wait",...x(P),workflow:ct[P]||null,pr_number:typeof Ve.number=="number"?Ve.number:null,pr_url:typeof Ve.url=="string"?Ve.url:void 0,external:Ut,usage:Rn(rt,P),merge_step:Wt,badges:kt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Wt?[de?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Tt?[Lr(Tt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(Tt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof de?.gate_badge=="string"&&de.gate_badge.length>0?[de.gate_badge]:[],alert:Wt?Wt.failed===!0:!!Tt||Re,reason:Tt&&Wt?.active!==!0?Na(Tt.step):"PR \uB300\uAE30",merge_action:de?.tier==="merged"&&!sn&&!pn?!1:!Je||kt,merge_enabled:!O&&(kt||de?.enabled===!0||rn||sn||pn),merge_label:kt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":pn||sn?"\uC815\uB9AC \uC7AC\uAC1C":rn&&!sn?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:kt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":O?Ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:pn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":sn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":rn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?.enabled===!0?`\uBA38\uC9C0 (${de.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${de?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Je&&!kt,cancel_enabled:!Lt,continuation_mismatch:At?.mismatch||null,discard:Ie,discard_action:Ie.action,discard_enabled:Ie.enabled,discard_title:Ie.title})}let te=(A,P,$e,Ve)=>{let de=A&&A.bead_id;if(typeof de!="string"||S.has(de))return null;S.add(de);let Je=Be[de],At=jn(ve,de),kt=At.operation?At:null,Lt={...H(de),lane:P,workflow:ct[de]||null,draggable:!kt,discard:kt||void 0,reason:jp(ee,de),seq:$e+1,queue_position:$e+1,queue_index:$e,queue_length:Ve,badges:Je?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Je,revise_action:!!Je,revise_enabled:!!Je&&!kt,revise_title:Je?Je.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Je.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Ut=x(de);return Object.hasOwn(Ut,"blocked_by")&&(Lt.blocked_by=Ut.blocked_by),Lt};for(let A=0;A<xt.length;A++){let P=te(xt[A],"queue",A,xt.length);if(!P)continue;k.push(P);let $e=Y.get(ae);$e?$e.push(P):Y.set(ae,[P])}let fe=A=>{let P=b.find(Je=>Je.id===A&&Je.root_dir===ae);if(P)return{id:A,title:P.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $e=h.find(Je=>Je.id===A&&Je.root_dir===ae),Ve=$e?$e.run_state:iy(rt,A),de=Ve==="failed"||Ve==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ve==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:A,title:$e?$e.title:H(A).title,badge:de}},Se=[];for(let A=0;A<Math.max(De,Et.length);A++){let P=`s${A+1}`,$e=N.get(P),Ve=$e&&Array.isArray($e.entries)?$e.entries:[],de=Bt(Xe[P]),Je=Array.isArray(de.occupied_by)?de.occupied_by.filter(Lt=>typeof Lt=="string"):[],At=new Set(Je),kt=[];for(let Lt=0;Lt<Ve.length;Lt++){let Ut=Ve[Lt]&&Ve[Lt].bead_id;if(typeof Ut=="string"&&At.has(Ut)){S.add(Ut);continue}let Tt=te(Ve[Lt],P,Lt,Ve.length);Tt&&(kt.push(Tt),k.push(Tt))}kt.length===0&&Je.length===0&&(De<=1||A>=De)||Se.push({id:P,index:A,items:kt,raw_length:Ve.length,occupied_by:Je,occupants:Je.map(Lt=>fe(Lt)),corrections:Array.isArray(de.corrections)?de.corrections.length:0,cycle:de.cycle===!0,...kt.length===0&&Je.length===0?{empty:!0}:{}})}ie.set(ae,Se);let Ne=Array.from({length:De},(A,P)=>{let $e=`s${P+1}`,Ve=N.get($e),de=Ve&&Array.isArray(Ve.entries)?Ve.entries:[],Je=Bt(Xe[$e]);return{id:$e,index:de.length,length:de.length,occupied_by:Array.isArray(Je.occupied_by)?Je.occupied_by.filter(At=>typeof At=="string"):[]}});for(let A of Array.isArray(L.runnable)?L.runnable:[]){let P=A&&A.bead_id;if(typeof P!="string"||S.has(P))continue;S.add(P);let $e=A.workflow&&typeof A.workflow=="object"?A.workflow:null,Ve=$e&&typeof $e.route=="string"&&$e.route||(typeof A.route=="string"?A.route:null),de=uy(Bt(qe),A.exec_pins,Ve);Array.isArray(A.blocked_by)&&A.blocked_by.length>0&&F.set(P,A.blocked_by.filter(Je=>typeof Je=="string"&&Je.length>0)),typeof A.title=="string"&&A.title.length>0&&xe.set(P,A.title),Array.isArray(A.scope)&&ge.set(P,A.scope.filter(Je=>typeof Je=="string"&&Je.length>0)),m.push({...H(P),title:A.title||gt[P]||P,lane:"runnable",draggable:!0,reason:jp(ee,P),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,status:typeof A.status=="string"?A.status:void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_id:typeof A.spec_id=="string"?A.spec_id:"",published:A.published===!0,workflow:$e||(Ve?{route:Ve,chips:{route:Ve}}:null),...de?{exec_chips:de}:{},blocked:A.blocked===!0,...Array.isArray(A.blocked_by)?{blocked_by:A.blocked_by.filter(Je=>typeof Je=="string"&&Je.length>0)}:{},place_index:xt.length,place_lanes:Ne})}for(let A of he){let P=A&&A.bead_id;if(typeof P!="string"||S.has(P)||(S.add(P),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let $e=ly(rt,P),Ve=$e&&typeof $e.done_kind=="string"?$e.done_kind:null;j.push({...H(P),lane:"done",done:!0,done_layout:"three_line",usage:Rn(rt,P),work_ms:ha(rt,P),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Ve,...Le(P),badges:[...Ve&&Fp[Ve]?[Fp[Ve]]:[],...ba(rt,P)]})}}let le=new Map;s.forEach((L,ae)=>{L&&typeof L.root_dir=="string"&&le.set(L.root_dir,ae)});let _e=n&&n.running_sort==="repo"?"repo":"started";h.sort((L,ae)=>{let Oe=L.kind==="session",qe=ae.kind==="session";if(Oe!==qe)return Oe?1:-1;if(Oe&&qe){let gt=Fa(ae.updated_at)-Fa(L.updated_at);return gt!==0?gt:L.id.localeCompare(ae.id)}if(_e==="repo"){let gt=le.get(L.root_dir)??Number.MAX_SAFE_INTEGER,ht=le.get(ae.root_dir)??Number.MAX_SAFE_INTEGER;if(gt!==ht)return gt-ht}let Ye=typeof L.started_at=="number"&&Number.isFinite(L.started_at)?L.started_at:null,rt=typeof ae.started_at=="number"&&Number.isFinite(ae.started_at)?ae.started_at:null;return Ye!==null&&rt!==null&&Ye!==rt?Ye-rt:Ye===null&&rt!==null?1:Ye!==null&&rt===null?-1:L.id.localeCompare(ae.id)}),j.sort((L,ae)=>(ae.done_at??0)-(L.done_at??0));let Ee=s.length>0?s:r.map(L=>({root_dir:L&&L.root_dir,name:L&&L.name,auto_advance:L&&L.auto_advance,auto_merge:L&&L.auto_merge,slots:L&&L.slots,revision:L&&L.revision,runner_catalog:L&&L.runner_catalog})),Fe=new Set(m.map(L=>L.root_dir)),we=[];for(let L of Ee){if(!L||typeof L.root_dir!="string")continue;let ae=Y.get(L.root_dir)||[],Oe=ie.get(L.root_dir)||[];!(ae.length>0||Oe.some(Ye=>Ye.items.length>0||Ye.occupied_by.length>0))&&!Fe.has(L.root_dir)||we.push({root_dir:L.root_dir,name:L.name||L.root_dir,auto_advance:L.auto_advance===!0,auto_merge:L.auto_merge===!0,slots:typeof L.slots=="number"&&L.slots>=qp?L.slots:qp,revision:typeof L.revision=="number"?L.revision:0,runner_catalog:Bt(L.runner_catalog),items:ae,sublanes:{parallel:ae,serial:Oe},serial_lane_count:Q.get(L.root_dir)||0,raw_queue_length:U.get(L.root_dir)||0})}let J={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:we,running:h,pr_wait:b,done:j,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},Te=Mp(J);for(let L of K)Te.has(L.id)||Te.set(L.id,{root_dir:L.root_dir,workspace_name:L.workspace_name,lane:"done",state:"done"});for(let L of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(L,"blocked_by"))continue;let ae=Te.get(L.id);L.blockers=(L.blocked_by||[]).map(Oe=>Pp(Oe,ae,Te,s))}for(let L of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let ae=(L.blockers||[]).map(qe=>({...hl(L.id,qe),openable:!0}));if(ae.length===0)continue;let Oe={predecessors:ae};L.dependency_chips=Oe}by(J,re,ge,Te,s);let Me=Dp(J.queue_groups);for(let L of J.queue_groups)for(let ae of L.sublanes.serial){let Oe=Me.get(Np(L.root_dir,ae.id));Oe&&(ae.cross_wait_peers=Oe)}J.chain_lanes=my(i&&Array.isArray(i.lanes)?i.lanes:[],F,Te,s,xe,d,{armed_by_bead:W,failed_by_bead:C,disarmed_lanes:M});let V=new Map;for(let L of[...J.queue,...J.runnable])V.has(L.id)||V.set(L.id,L);let q=new Set;for(let L of J.chain_lanes)for(let ae of L.rows){if(L.status==="confirmed"&&!ae.unplaced&&!ae.fixed&&q.add(ae.id),!L.draft&&!ae.unplaced)continue;let Oe=V.get(ae.id);Oe&&(Oe.cross_lane_chip={lane_id:L.lane_id,number:L.number,status:L.status,label:L.draft?`\uC5F0\uACB0 ${L.number} (draft)`:`\uC5F0\uACB0 ${L.number}`})}let me=new Map(J.chain_lanes.map(L=>[L.lane_id,L.number]));for(let L of[...J.queue,...J.running]){let ae=W.get(L.id);if(typeof ae!="string"||ae.length===0)continue;let Oe=me.get(ae);L.armed_lane_chip=Oe===void 0?{lane_id:ae,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ae,label:`\u25B6 \uC5F0\uACB0 ${Oe}`,orphan:!1}}let Ae=[];for(let L of Y.values())for(let ae of L)q.has(ae.id)||Ae.push(ae);Ae.sort((L,ae)=>{let Oe=L.workspace_name.localeCompare(ae.workspace_name);return Oe!==0?Oe:(L.queue_index??0)-(ae.queue_index??0)}),J.parallel_rows=Ae;let We={};for(let[L,ae]of Te)typeof ae.root_dir=="string"&&ae.root_dir.length>0&&(We[L]=ae.root_dir);for(let L of J.chain_lanes)for(let ae of L.rows)!Object.hasOwn(We,ae.id)&&ae.root_dir.length>0&&d.has(ae.root_dir)&&(We[ae.id]=ae.root_dir);J.owner_of=We;let pe=J.runnable.length;J.runnable_all=J.runnable.slice();let je=J.runnable;a.show_blocked||(je=je.filter(L=>L.blocked!==!0));let pt=je.length;a.spec==="with"?je=je.filter(L=>L.published===!0):a.spec==="without"&&(je=je.filter(L=>L.published!==!0)),J.runnable_hidden={blocked:pe-pt,spec:pt-je.length};let it=(L,ae)=>{let Oe=Fa(ae.updated_at)-Fa(L.updated_at);return Oe!==0?Oe:L.id.localeCompare(ae.id)},ut=l==="repo_spec"?(L,ae)=>{let Oe=L.published===!0?0:1,qe=ae.published===!0?0:1;return Oe!==qe?Oe-qe:it(L,ae)}:it;if(l==="updated_flat")J.runnable=je.slice().sort(it),J.runnable_sections=[];else{let L=new Map;for(let qe of je){let Ye=L.get(qe.root_dir);Ye?Ye.push(qe):L.set(qe.root_dir,[qe])}let ae=[],Oe=[];for(let qe of Ee){if(!qe||typeof qe.root_dir!="string")continue;let Ye=(L.get(qe.root_dir)||[]).slice().sort(ut);L.delete(qe.root_dir),Ye.length!==0&&(ae.push({root_dir:qe.root_dir,name:qe.name||qe.root_dir,items:Ye.map(rt=>({...rt,workspace_name:""}))}),Oe.push(...Ye))}for(let[qe,Ye]of L){let rt=Ye.slice().sort(ut);ae.push({root_dir:qe,name:rt[0]?.workspace_name||qe,items:rt.map(gt=>({...gt,workspace_name:""}))}),Oe.push(...rt)}J.runnable=Oe,J.runnable_sections=ae}return J}var Wp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",hy=1e4;function zp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Hp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Yp="bdui.monitor.done-range",Zp="bdui.monitor.running_sort",Qp="bdui.monitor.candidate_sort",Xp="beads-ui.monitor.candidate-filter",Jp="beads-ui.monitor.sections";function yy(){try{let e=window.localStorage.getItem(Xp);if(!e)return{...is};let t=JSON.parse(e);return!t||typeof t!="object"?{...is}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:is.show_blocked,spec:kl.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...is}}}function Gp(e){try{window.localStorage.setItem(Xp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function vy(){try{let e=window.localStorage.getItem(Qp);return no.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function wy(e){try{window.localStorage.setItem(Qp,e)}catch{}}function ky(){try{let e=window.localStorage.getItem(Jp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function $y(e){try{window.localStorage.setItem(Jp,JSON.stringify(e))}catch{}}function xy(){try{let e=window.localStorage.getItem(Yp);return e===null?"today":Wn(e)}catch{return"today"}}function Ay(e){try{window.localStorage.setItem(Yp,e)}catch{}}function Sy(){try{return window.localStorage.getItem(Zp)==="repo"?"repo":"started"}catch{return"started"}}function Ey(e){try{window.localStorage.setItem(Zp,e)}catch{}}var ef="tab:monitor:pipeline",Ty=1e3,Kp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Cy=["queue","runnable","done"],Vp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ry(e){return e>=1&&e<=Vp.length?Vp[e-1]:`(${e})`}function tf(e,t){let n=zt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=xy(),b=Sy(),k=yy(),j=vy(),K=ky(),Y=ma("beads-ui.monitor.lane-collapsed"),ie=!1,Q=null,U=null,F=null,W=null,C=null,M=[],re=null,ge=null,xe=null,le=null;function _e(p){return le===null&&(le=Re()),_p(p,le)}function Ee(p,g){Fe(),!(g<=0)&&(ge={lane_id:p,corrected:g},xe=setTimeout(()=>{xe=null,ge=null,P()},hy))}function Fe(){xe!==null&&(clearTimeout(xe),xe=null),ge=null}function we(){let p=Br.find(g=>g.value===h);return p?p.label:""}let J=document.createElement("div");J.className="mon",e.appendChild(J);let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let Me=document.createElement("div");Me.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host mon2-drawer",Te.append(Me,V),e.appendChild(Te);let q=$l(null,null),me=new Map,Ae=new Map,We=null,pe=null,je=null,pt=ts(V,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{U=null,Te.hidden=!0,P()}});async function it(p,g,v,$,B=!0){if(!o||!v)return null;let z=await o(p,{...g,root_dir:v,expected_revision:$});if(z&&z.conflict&&B){z.queue&&Ae.set(v,z.queue);let oe=z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$;z=await o(p,{...g,root_dir:v,expected_revision:oe})}return z&&z.queue&&v&&Ae.set(v,z.queue),z}function $t(p,g){let v=Ae.get(p),$=s&&s.get?s.get():null,B=(Array.isArray($)?$:[]).find(oe=>oe?.root_dir===p);return(v||B)?.merge_queue?.find(oe=>oe.bead_id===g)?.continuation_action}async function ut(p,g,v,$){let B=await it(p,g,v,$),z=Ae.get(v)?.revision??B?.queue?.revision??$;return Jn(B,(oe,ye)=>it(p,{...g,continuation:oe,decision_token:ye},v,z,!1),{refresh:oe=>it(p,g,v,oe?.queue?.revision??Ae.get(v)?.revision??z,!1)})}async function L(p,g,v,$){let B=await Jn({continuation_mismatch:$},(oe,ye)=>it("worker-merge-queue-add",{bead_id:g,continuation:oe,decision_token:ye},p,v,!1)),z=B?.queue?.merge_queue?.find(oe=>oe.bead_id===g)?.continuation_action;B?.applied!==!0&&z?.continuation===null&&z.mismatch&&await L(p,g,B.queue.revision,z.mismatch)}async function ae(p,g,v){let $=await it("worker-discard",p,g,v);if($&&$.discarded===!0){ue(va($),"success",5e3);return}if($&&$.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Oe(p,g,v){return!o||!v?null:await o(p,{...g,root_dir:v})}async function qe(){let p=new Map;for(let g of q.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,v]of p)await it("worker-merge-queue-add-all",{},g,v)}function Ye(p){let g=K[p];return!!(g&&g.runnable===!0)}function rt(p){let g={...K[p]||{}};g.runnable=!g.runnable,K={...K,[p]:g},$y(K),P()}function gt(p){Y.toggle(p),P()}function ht(p){Y.toggleArea(p),P()}function se(p){let g=q.queue_groups.find(v=>v.root_dir===p);if(!g)return null;for(let v=0;v<g.serial_lane_count;v+=1){let $=`s${v+1}`,B=g.sublanes.serial.find(z=>z.id===$);if(!B||B.raw_length===0&&B.occupied_by.length===0)return $}return null}function ee(p,g){let v=q.queue_groups.find(B=>B.root_dir===p),$=v?v.sublanes.serial.find(B=>B.id===g):void 0;return $?$.raw_length:0}function Be(p,g){let v=me.get(p),$=me.get(g);if(!v||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let B=zp(v),z=zp($);if(B!==null&&B===z&&v.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let oe=Hp(v),ye=Hp($);if(oe&&z!==null){let Ze=z;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:p,lane:Ze,index:ee($.root_dir,Ze)}]}}if(B!==null&&ye&&z===null){let Ze=B;return{kind:"ops",title:`${Ze} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:ee(v.root_dir,Ze)}]}}if(oe&&B===null&&ye&&z===null){let Ze=se(v.root_dir);return Ze===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ze} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:Ze,index:0},{bead_id:p,lane:Ze,index:1}]}}return!oe&&!ye?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:oe?{kind:"note",text:`${zs($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${zs(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function lt(p,g){let v=Be(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:Wp,title:v.title}:{kind:"place",label:Wp,title:v.title}}}function He(p,g){if(!W||W.bead_id!==p)return null;let v=W.counterpart_id,$=g.filter(B=>B.id===v);return $.length===0?null:{rows:$.map(B=>lt(p,B))}}function ve(p){let g=p.dependency_chips||null,v=p.overlap_chips||[],$=p.scope_state==="missing",B=p.cross_lane_chip,z=p.armed_lane_chip;if(!g&&v.length===0&&!$&&!B&&!z)return null;let oe=He(p.id,v);return{...g||{},...v.length>0?{overlaps:v}:{},...$?{scope_missing:!0}:{},...B?{cross_lane:{lane_id:B.lane_id,label:B.label}}:{},...z?{armed_lane:z}:{},...oe?{popover:oe}:{}}}function ze(p){let g=ve(p);return g?{...p,dependency_chips:g}:p}async function ct(p,g){let v=Be(p,g);if(W=null,v.kind!=="ops"){P();return}let $=O(v.root_dir,v.ops[0].bead_id);for(let B of v.ops){let z=await dt(B,v.root_dir,$);if(z===null)break;$=z}P()}async function dt(p,g,v){try{let $=await it("worker-queue-place",p,g,v,!1);if($&&$.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ue($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let B=$.queue?$.queue.revision:void 0;return typeof B!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):B}catch($){return ue(Ut($),"error"),null}}function ft(p){let g=Ye(p.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Dt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function Vt(p){if(F!==p.id)return null;let g=q.queue_groups.find(z=>z.root_dir===p.root_dir),v=p.place_lanes||[],$=q.cross_lanes_revision!==null,B=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let z of q.chain_lanes)B.push({id:`lane:${z.lane_id}`,label:`\uC5F0\uACB0 ${z.number} (${z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});B.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let z of v)B.push({id:`serial:${z.id}`,label:`\uC9C1\uB82C ${Number(z.id.slice(1))}`,count:z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:B}}function Ht(){let p=[],g=new Set,v=($,B)=>{for(let z of $)g.has(z.id)||(g.add(z.id),p.push({bead_id:z.id,root_dir:z.root_dir,workspace_name:z.workspace_name,title:z.title,lane:B}))};return v(q.running,"running"),v(q.pr_wait,"pr_wait"),v(q.queue,"queue"),v(q.runnable_all,"runnable"),p}function xt(p){if(!C||C.bead_id!==p)return"";let g=rn(),v=Ht(),$=new Map;for(let ye of v)$.set(ye.bead_id,ye);let B=(g.get(p)||[]).filter(ye=>$.has(ye)),z=Sp(Ap(p,{issues:v,blocked_by_map:g}),C.query),oe=q.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${B.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${B.map(ye=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${ye}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${ye}
                aria-label=${`${ye} \uC5F0\uACB0 \uD574\uC81C`}
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
        .value=${C.query}
      />
      <div class="mon-deppanel__list">
        ${z.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:z.map(ye=>c`<button
                  type="button"
                  class="mon-deppanel__cand${ye.disabled?" is-disabled":""}"
                  data-dep-cand=${ye.bead_id}
                  ?disabled=${ye.disabled}
                  title=${ye.reason||ye.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${ye.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${ye.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${ye.title}</span
                  >${ye.reason?c`<span class="mon-deppanel__cand-reason"
                        >${ye.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${oe===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Et(p){return Dt(p,c`${sl(ze(p),Vt(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(g,v)=>i(v,p.root_dir):void 0})}${xt(p.id)}`)}function Xe(){return q.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${q.runnable.map(p=>Et(p))}
      </div>`:c`${q.runnable_sections.map(p=>{let g=Ye(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${ft({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(v=>Et(v))}
            </div>`}
      </section>`})}`}function De(p,g=!1){return c`<span class="worker-mini__rowops">
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
    </span>`}function N(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Bn(ze(p),{actions:De(p,!0)})}
      ${xt(p.id)}
    </div>`}function ne(p,g,v,$){return c`<div
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
        >${Ry(g.seq)}</span
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
    </div>`}function he(p){let g=q.cross_lanes_revision!==null,v=_e(p.lane_id),$=v?.held===!0,B=v?.cycle===!0,z=v?v.mismatched:[],oe=ge&&ge.lane_id===p.lane_id?ge.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
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
        ${B?c`<span
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
            </div>`:p.rows.map((ye,Ze)=>ne(p,ye,Ze,z))}
      </div>
    </div>`}function E(p,g,v){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${v}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Bn(ze(g),{actions:De(g)})}
      ${xt(g.id)}
    </div>`}function H(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function Le(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Bn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function x(p,g){let v=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...v.map(B=>Le(B)),...g.items.map((B,z)=>E(g,B,z))],count:g.items.length,empty:g.empty===!0,...v.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${v.map(B=>`${B.id} \u2014 ${B.badge}`).join(`
`)}
              >${H(v)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(B=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${B.workspace_name}·${B.lane}과 교차 대기
                </div>`)}`}:{}}}function S(){let p=q.cross_lanes_revision!==null,g=q.chain_lanes.some(v=>v.draft&&v.rows.length===0);return Aa({parallel:{rows:q.parallel_rows.map((v,$)=>N(v,$)),count:q.parallel_rows.length,collapsed:Y.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:q.queue_groups.flatMap(v=>v.sublanes.serial.map($=>({...x(v,$),drop:{drop:"repo-serial",root_dir:v.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Y.isAreaCollapsed("serial"),extra_panes:q.chain_lanes.map(v=>he(v)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!p}
          title=${p?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...q.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function te(p){return c`<div class="worker-rungrid">
      ${q.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:q.running.map(g=>ll({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,U,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:ve(g)}}))}
    </div>`}function fe(p){let g={runnable:q.runnable,queue:q.queue,running:q.running,pr_wait:q.pr_wait,done:q.done},v=$=>{let B=g[$.lane],z=$.lane==="runnable"?q.runnable_flat?B.length>0?Xe():void 0:q.runnable_sections.length>0?Xe():void 0:$.lane==="queue"?q.queue_groups.length>0||q.chain_lanes.length>0||q.parallel_rows.length>0||q.cross_lanes_unreadable?S():void 0:$.lane==="running"?te(p):B.length>0?c`${B.map(oe=>Bn(oe))}`:void 0;return Kn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:B,count:B.length,src:$.lane==="runnable",empty:$.empty,body:z,live:$.lane==="running"&&B.length>0,collapsible:!0,collapsed:Y.isCollapsed($.pane),controls:$.lane==="runnable"?Se():void 0,header_control:Ne($.lane,B.length)})};if(ie){let $=Cy.map(B=>Kp.find(z=>z.lane===B)).filter(B=>B!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Sa({live:q.running.length>0,running_body:q.running.length>0?te(p):"",pr_wait_rows:q.pr_wait.map(B=>Bn(B)),count:q.running.length+q.pr_wait.length})}
            ${$.map(B=>v(B))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Kp.map($=>v($))}
        </div>
      </div>`}function Se(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${q.runnable_hidden.blocked>0?` ${q.runnable_hidden.blocked}`:""}
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
        ${q.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${q.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ne(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${j}
      >
        ${no.map(v=>c`<option
              value=${v.value}
              ?selected=${j===v.value}
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
      </select>`:""}function A(p){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,B={done_since:$r(h,d()),running_sort:b,candidate_filter:k,candidate_sort:j};return $!==void 0&&(B.cross_lanes=$),$l(g,v,B)}function P(){let p=d();q=A(),le=null,me=new Map;for(let g of[...q.runnable,...q.queue,...q.running,...q.pr_wait,...q.done])!g.non_occupying&&!me.has(g.id)&&me.set(g.id,g);ot(fe(p),J),Ve()?.render(),$e(),de()}function $e(){let p=new Map;for(let g of q.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(J.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let v=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=p.get(v);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ve(){if(je)return je;let p=J.querySelector(".mon2-deck");return p?(je=pp(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>q.done,rangeLabel:we,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:At,onFocusChange:g=>{re=g,de()}}),je):null}function de(){J.classList.toggle("has-focus",re!==null);for(let p of Array.from(J.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",re!==null&&p.getAttribute("data-root-dir")===re);for(let p of Array.from(J.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=me.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",re!==null&&!!g&&g.root_dir===re)}for(let p of Array.from(J.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",re!==null&&p.getAttribute("data-root-dir")===re)}function Je(p,g){let v=a?a():void 0;if(!g||!v||g===v||!l){r(p);return}l(g).then(()=>{r(p)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function At(p){if(!p)return;let g=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===p){v();return}l(p).then(v).catch($=>{n("workspace switch for %s failed: %o",p,$),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function kt(p){Sn(p).then(g=>{ue(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Lt(p){let g=me.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function Ut(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Tt(p,g,v){let $=q.owner_of[g];if(typeof $!="string"||$.length===0){ue(`${g}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await Oe(p,{a:g,b:v},$),await bn(p,g,v)}catch(B){ue(Ut(B),"error")}P()}async function bn(p,g,v){if(p!=="dep-add")return;let $=q.chain_lanes.find(B=>B.rows.some(z=>z.id===g));!$||!$.rows.some(B=>B.id===v)||await qt(B=>vp($.lane_id,B),"",[{type:p,a:g,b:v}])}function Wt(p){return q.runnable.some(g=>g.id===p)||q.parallel_rows.some(g=>g.id===p)?!0:q.queue_groups.some(g=>g.sublanes.serial.some(v=>v.items.some($=>$.id===p)))}function Qt(p){!p||!Wt(p)||(C=C&&C.bead_id===p?null:{bead_id:p,query:""},P())}function rn(){let p=new Map,g=s&&s.get?s.get():null,v=$=>Array.isArray($)?$.filter(B=>typeof B=="string"&&B.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let B=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[z,oe]of Object.entries(B))Array.isArray(oe)&&p.set(z,v(oe));for(let z of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])z&&typeof z.bead_id=="string"&&Array.isArray(z.blocked_by)&&z.blocked_by.length>0&&p.set(z.bead_id,v(z.blocked_by))}return p}function sn(){let p=new Map,g=new Map,v=s&&s.get?s.get():null,$=B=>Array.isArray(B)?B.filter(z=>typeof z=="string"&&z.length>0):[];for(let B of Array.isArray(v)?v:[]){if(!B||typeof B!="object")continue;let z=B.bead_blocked_by&&typeof B.bead_blocked_by=="object"?B.bead_blocked_by:{};for(let[oe,ye]of Object.entries(z))Array.isArray(ye)&&p.set(oe,$(ye));for(let oe of Array.isArray(B.runnable)?B.runnable:[])oe&&typeof oe.bead_id=="string"&&Array.isArray(oe.blocked_by)&&g.set(oe.bead_id,$(oe.blocked_by))}for(let B of M)for(let z of[p,g]){let oe=z.get(B.a);oe!==void 0&&z.set(B.a,B.type==="dep-remove"?oe.filter(ye=>ye!==B.b):oe.includes(B.b)?oe:[...oe,B.b])}return{snapshot:p,runnable:g}}function pn(){let p=rn();for(let g of M){let v=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,v.filter($=>$!==g.b)):v.includes(g.b)||p.set(g.a,[...v,g.b])}return p}function Re(p=q,g=Ie()){let v=new Map;for(let at of Array.isArray(g?.lanes)?g.lanes:[]){let en=new Map;for(let Rt of Array.isArray(at?.entries)?at.entries:[])Rt&&typeof Rt.bead_id=="string"&&en.set(Rt.bead_id,Rt.dep_created_by_lane===!0);v.set(typeof at?.id=="string"?at.id:"",en)}let $=new Map,B=new Map,z=new Set,oe=new Set;for(let at of p.chain_lanes){let en=v.get(at.lane_id);$.set(at.lane_id,{status:at.status,entries:at.rows.map((Rt,Yn)=>({bead_id:Rt.id,root_dir:Rt.root_dir,...Yn===0?{}:{dep_created_by_lane:en?.get(Rt.id)===!0}}))});for(let Rt of at.rows)B.set(Rt.id,at.lane_id),Rt.fixed&&z.add(Rt.id),Rt.unplaced||oe.add(Rt.id)}let ye=new Map;for(let at of p.parallel_rows)typeof at.queue_index=="number"&&ye.set(at.id,at.queue_index);for(let at of p.queue_groups)for(let en of at.sublanes.serial)for(let Rt of en.items)typeof Rt.queue_index=="number"&&ye.set(Rt.id,Rt.queue_index);let Ze=sn();return{blocked_by_map:pn(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:$,owner_lane_of:B,fixed_members:z,placed_members:oe,parallel_rows:p.parallel_rows.map(at=>({bead_id:at.id,root_dir:at.root_dir,queue_index:at.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:ye}}function Ie(){return(s&&s.crossLanes?s.crossLanes():null)??null}function O(p,g){let v=me.get(g);if(v&&v.root_dir===p)return v.expected_revision;let $=q.queue_groups.find(B=>B.root_dir===p);return $?$.revision:0}async function be(p,g,v){if(p.type==="worker-queue-disarm"){try{let $=await it(p.type,p.payload,p.root_dir,v.get(p.root_dir)??O(p.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&v.set(p.root_dir,$.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await Pe(p.type,p.payload,p.root_dir,v,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await Oe(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch($){return ue(Ut($),"error"),!1}}async function Pe(p,g,v,$,B){try{let z=await it(p,g,v,$.get(v)??O(v,B.bead_id));return!z||typeof z.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(z.queue&&typeof z.queue.revision=="number"&&$.set(v,z.queue.revision),z.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):z.applied===!1?(ue(z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):z.queue&&typeof z.queue.revision=="number"?z.queue.revision:$.get(v)??0)}catch(z){return ue(Ut(z),"error"),null}}function yt(p){(p.type==="dep-add"||p.type==="dep-remove")&&(M=[...M,{type:p.type,a:p.a,b:p.b}])}async function Nt(p,g){if(!o)return{ok:!1};try{let v=await o(p.type,{...p.payload,expected_revision:g});return!v||typeof v.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let $=v,B=$&&$.code==="conflict"?$.details?.cross_lanes:null;return B&&typeof B.revision=="number"&&Array.isArray(B.lanes)?{ok:!1,conflict:B}:(ue(Ut(v),"error"),{ok:!1})}}async function Ct(p,g,v){let $=new Map,B=[],z=p.ops.slice(0,p.lane_op_index),oe=p.ops.slice(p.lane_op_index);for(let Ze of z){if(!await be(Ze,v,$))return{done:!0};yt(Ze)}let ye=g;for(let Ze of p.lane_ops){if(ye===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let at=await Nt(Ze,ye);if(!at.ok)return at.conflict?{done:!1,conflict:at.conflict}:{done:!0};ye=at.revision}for(let Ze of oe){if(!await be(Ze,v,$))return{done:!0};yt(Ze),Ze.type==="dep-add"&&B.push(Ze)}for(let Ze of $p(B))ye=await Zt(Ze,ye);return{done:!0}}async function Zt(p,g){if(g===null||!o)return g;let v=p.pairs,$=g;for(let B=0;B<2;B+=1){if(v.length===0)return $;try{let z=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:v.map(oe=>({bead_id:oe.bead_id,after:oe.after,value:!0})),expected_revision:$});return z&&typeof z.revision=="number"?z.revision:$}catch(z){let oe=z,ye=oe&&oe.code==="conflict"?oe.details?.cross_lanes:null;if(!ye||typeof ye.revision!="number"||!Array.isArray(ye.lanes))return $;let Ze=ye.lanes.find(at=>at&&at.id===p.lane_id);v=xp(Array.isArray(Ze?.entries)?Ze.entries:[],v),$=ye.revision}}return $}async function qt(p,g,v=[]){M=v,Fe();let $=q,B=Ie();for(let z=0;;z+=1){let oe=p(Re($,B));if("refused"in oe){ue(oe.refused,"error");break}let ye=await Ct(oe,$.cross_lanes_revision,g);if(ye.done){oe.correction&&Ee(oe.correction.lane_id,oe.correction.corrected);break}if(z>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=A(ye.conflict),B=ye.conflict}M=[],P()}async function tn(p,g){await qt(v=>_l(p,g,v),p.bead_id)}async function kn(p,g){if(p==="run"){await $n(g);return}if(p==="stop"){await xn(g);return}if(p==="create"){await qt(v=>ml(null,v),"");return}if(p==="remove"){let v=kp(g,Re());if(v!==null&&!m(v))return;await qt($=>wp(g,$),"");return}await qt(v=>p==="confirm"?hp(g,v):yp(g,v),"")}function Ft(p){let g=new Map;for(let v of p.rows){let $=q.owner_of[v.id]||v.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],v.id])}return g}async function $n(p){let g=q.chain_lanes.find(z=>z.lane_id===p);if(!g||q.cross_lanes_revision===null){P();return}Fe();let v=new Map,$=new Map,B=Ft(g);for(let z of g.rows){if(!z.unplaced)continue;let oe=q.owner_of[z.id]||z.root_dir;if(typeof oe!="string"||oe.length===0){ue(`${z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),P();return}let ye=$.get(oe)??0;if(await Pe("worker-queue-place",{bead_id:z.id,lane:"parallel",index:(q.parallel_raw_length[oe]??0)+ye},oe,v,{bead_id:z.id})===null){P();return}$.set(oe,ye+1)}for(let[z,oe]of B)if(await Pe("worker-queue-arm",{bead_ids:oe,lane_id:p},z,v,{bead_id:oe[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),P();return}P()}async function xn(p){let g=q.chain_lanes.find($=>$.lane_id===p);if(!g||q.cross_lanes_revision===null){P();return}Fe();let v=new Map;for(let[$,B]of Ft(g))if(await Pe("worker-queue-disarm",{lane_id:p},$,v,{bead_id:B[0]})===null)break;P()}async function Vn(p,g){let{root_dir:v,revision:$}=Lt(p);if(v.length===0){P();return}await Pe("worker-queue-disarm",{bead_ids:[p],lane_id:g},v,new Map([[v,$]]),{bead_id:p}),P()}async function T(p,g){let v=me.get(p);if(!v){P();return}let $={kind:"candidate",bead_id:p,root_dir:v.root_dir};if(g==="new-lane"){await qt(B=>ml({bead_id:p,root_dir:v.root_dir},B),p);return}if(g.startsWith("lane:")){let B=g.slice(5);if(!q.chain_lanes.find(oe=>oe.lane_id===B)){P();return}await qt(oe=>_l($,{kind:"chain",lane_id:B,marker_index:(oe.cross_lanes.get(B)?.entries??[]).length},oe),p);return}if(g.startsWith("serial:")){let B=g.slice(7),z=(v.place_lanes||[]).find(oe=>oe.id===B);await tn($,{kind:"repo-serial",root_dir:v.root_dir,lane_id:B,index:z?z.index:0});return}await tn($,{kind:"parallel",marker_index:q.parallel_rows.length})}async function I(p,g){let v=q.parallel_rows,$=v.findIndex(at=>at.id===p);if($<0)return;let B=v[$].root_dir,z=[];v.forEach((at,en)=>{at.root_dir===B&&z.push(en)});let oe=z.indexOf($),ye=z[oe+g];if(typeof ye!="number")return;let Ze=g===-1?ye:z[oe+2]??Math.min(v.length,ye+1);await tn({kind:"parallel",bead_id:p,root_dir:B,queue_index:v[$].queue_index??0},{kind:"parallel",marker_index:Ze})}async function Ue(p){for(let g of q.chain_lanes){let v=g.rows.find($=>$.id===p);if(v){await tn({kind:"chain",bead_id:p,root_dir:v.root_dir,lane_id:g.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:q.parallel_rows.length});return}}}let Ke=null,st=!1,vt=null;function Xt(){vt!==null&&clearTimeout(vt),vt=setTimeout(()=>{vt=null,st=!1},0)}function gr(p,g){let v=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(v&&p.contains(v)){let $=Number(v.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return p.querySelectorAll("[data-row-index]").length}function Ir(p){let g=typeof p?.closest=="function"?p.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let v=g.getAttribute("data-lane");return v==="queue"?{zone:g,target:{kind:"parallel",marker_index:q.parallel_rows.length}}:v==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function _(p){let g=p.target;if(!Ke)return null;let v=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!v)return Ir(g);let $=v.getAttribute("data-drop");if($==="candidate")return{zone:v,target:{kind:"candidate"}};if($==="parallel")return{zone:v,target:{kind:"parallel",marker_index:gr(v,g)}};if($==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:gr(v,g)}};if($==="repo-serial"){let B=v.getAttribute("data-root-dir")||"";if(B!==Ke.root_dir)return null;let z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,oe=z&&v.contains(z)?z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),ye=Number(oe);return{zone:v,target:{kind:"repo-serial",root_dir:B,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(ye)?ye:0}}}return null}function w(){for(let p of Array.from(J.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}let G=null;function X(p){G=p.target instanceof Element?p.target:null}function y(p){let g=p.target,v=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=v?v.closest("[data-drag-kind]"):null;if(!$)return;if(v&&G&&v.contains(G)&&typeof G.closest=="function"&&G.closest("input, button, a")){p.preventDefault();return}let B=$.getAttribute("data-bead-id")||"",z=$.getAttribute("data-drag-kind")||"",oe=$.getAttribute("data-root-dir")||"";if(!B||!z||!oe)return;let ye=$.getAttribute("data-queue-index")||"",Ze=Number(ye),at=$.getAttribute("data-lane-id")||"";Ke={kind:z,bead_id:B,root_dir:oe,...ye!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...at?{lane_id:at}:{}},st=!0,F=null,J.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",B),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Z(p){let g=_(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function R(p){let g=p.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ke(){Ke=null,w(),J.classList.remove("is-dragging"),Xt()}function tt(p){let g=_(p),v=Ke;Ke=null,w(),J.classList.remove("is-dragging"),!(!g||!v)&&(p.preventDefault(),tn(v,g.target))}function et(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function _t(p,g){let{item:v,root_dir:$,revision:B}=Lt(g),z=v?.attempt_id||"",oe=p.classList;if(oe.contains("worker-mini__rowops-up")||oe.contains("worker-mini__rowops-down")){I(g,oe.contains("worker-mini__rowops-up")?-1:1);return}if(oe.contains("worker-mini__rowops-remove")){it("worker-queue-remove",{bead_id:g},$,B);return}if(oe.contains("mon2-crow__detach")){Ue(g);return}if(oe.contains("mon-dep__btn")){Qt(g);return}if(oe.contains("worker-dep__open")){Qt(g);return}if(oe.contains("mon2-arm__release")){Vn(g,p.getAttribute("data-lane-id")||"");return}if(oe.contains("mon-lane__chip")){let ye=p.getAttribute("data-lane-id")||"";J.querySelector(`.mon2-clane[data-lane-id="${ye}"]`)?.scrollIntoView({block:"nearest"});return}if(oe.contains("mon-deppanel__unlink")){let ye=p.getAttribute("data-dep-a")||"",Ze=p.getAttribute("data-dep-b")||"";m(`${Ze}\uAC00 ${ye}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Tt("dep-remove",ye,Ze);return}if(oe.contains("mon-deppanel__cand")){let ye=p.getAttribute("data-dep-cand")||"";C&&ye&&Tt("dep-add",C.bead_id,ye);return}if(oe.contains("mon-overlap__chip")){let ye=p.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===ye?null:{bead_id:g,counterpart_id:ye},P();return}if(oe.contains("mon-overlap__place")){ct(g,p.getAttribute("data-counterpart-id")||"");return}if(oe.contains("worker-card__place")){F=F===g?null:g,P();return}if(oe.contains("worker-card__place-cancel")){F=null,P();return}if(oe.contains("worker-card__place-lane")){let ye=p.getAttribute("data-lane")||"parallel";F=null,T(g,ye);return}if(oe.contains("rtile__session")){if(v&&v.kind==="session"){let ye=(v.session_refs||[]).find(Ze=>Ze&&Ze.current===!0);ye&&(Te.hidden=!1,pt.open(Zr(ye,g,"in_progress",$)),P());return}U=z,z&&v&&(Te.hidden=!1,pt.open({attempt_id:z,root_dir:$,meta:et(v)})),P();return}if(oe.contains("rtile__pause")){Oe("worker-attempt-pause",{attempt_id:z},$);return}if(oe.contains("rtile__resume")){Yr().then(ye=>{if(ye!==null)return ut("worker-attempt-resume",{attempt_id:z,...ye!==""?{instructions:ye}:{}},$,B)});return}if(oe.contains("rtile__dismiss")){it("worker-attempt-dismiss",{attempt_id:z},$,B);return}if(oe.contains("rtile__discard")){if(!m(Ws(g,"unmerged")))return;ae({bead_id:g,...z?{attempt_id:z}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,B);return}if(oe.contains("worker-mini__merge")){let ye=$t($,g);ye?.mismatch&&ye.continuation===null?L($,g,B,ye.mismatch):it("worker-merge-queue-add",{bead_id:g},$,B);return}if(oe.contains("worker-mini__merge-cancel")){it("worker-merge-queue-remove",{bead_id:g},$,B);return}if(oe.contains("worker-mini__discard")){let ye=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ws(g,ye)))return;ae({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,B);return}if(oe.contains("worker-mini__revise-fix")){ut("worker-revise-fix",{bead_id:g},$,B);return}oe.contains("worker-mini__revise-approve")&&it("worker-revise-approve",{bead_id:g},$,B)}function nt(p){let g=st;st=!1;let v=p.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let $=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){p.preventDefault();let mt=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";mt&&kt(mt);return}let B=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(B){p.preventDefault();let Ce=B.getAttribute("data-root-dir")||me.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||B.getAttribute("title")||"";At(Ce);return}let z=v.closest(".mon2-sec__toggle");if(z){p.preventDefault(),rt(z.getAttribute("data-root-dir")||"");return}let oe=v.closest(".worker-pane__toggle[data-lane]");if(oe){p.preventDefault();let Ce=oe.getAttribute("data-lane")||"";(Ce==="candidate"||Ce==="queue"||Ce==="running"||Ce==="pr_wait"||Ce==="done")&&gt(Ce);return}let ye=v.closest(".worker-wait__area-toggle[data-area]");if(ye){p.preventDefault(),ht(ye.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){p.preventDefault(),kn("create","");return}let Ze=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ze){p.preventDefault();let Ce=Ze.getAttribute("data-lane-id")||"",mt=Ze.classList;kn(mt.contains("mon2-clane__confirm")?"confirm":mt.contains("mon2-clane__reapply")?"reapply":mt.contains("mon2-clane__run")?"run":mt.contains("mon2-clane__stop")?"stop":"remove",Ce);return}if(v.closest(".mon-merge-all")){p.preventDefault(),qe();return}let at=v.closest(".mon-filter__spec");if(at){p.preventDefault(),k={...k,spec:at.getAttribute("data-spec")||"all"},Gp(k),P();return}let en=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!en)return;let Rt=en.getAttribute("data-bead-id")||"",Yn=v.closest("button");if(Yn){p.preventDefault(),_t(Yn,Rt);return}Rt&&!g&&(p.preventDefault(),Je(Rt,en.getAttribute("data-root-dir")||Lt(Rt).root_dir))}function bt(p){let g=p.target;if(!g||typeof g.closest!="function")return;let v=g.closest(".mon-filter__blocked");if(v){k={...k,show_blocked:v.checked},Gp(k),P();return}let $=g.closest(".mon-candidate-sort");if($){j=no.some(oe=>oe.value===$.value)?$.value:"repo_spec",wy(j),P();return}let B=g.closest(".mon-running-sort");if(B){b=B.value==="repo"?"repo":"started",Ey(b),P();return}let z=g.closest(".mon-done-range");z&&(h=Wn(z.value),Ay(h),P())}function an(p){let g=p.target,v=g&&typeof g.closest=="function"?B=>g.closest(B):()=>null,$=!1;W&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,$=!0),C&&!v(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(C=null,$=!0),$&&P()}function br(p){p.key!=="Escape"||!W&&!C||(W=null,C=null,P())}function on(p){let g=p.target;!g||typeof g.closest!="function"||!g.closest(".mon-deppanel__search")||!C||(C={...C,query:g.value},P())}e.addEventListener("click",nt),e.addEventListener("change",bt),e.addEventListener("input",on),e.addEventListener("pointerdown",X),document.addEventListener("click",an),document.addEventListener("keydown",br),e.addEventListener("dragstart",y),e.addEventListener("dragover",Z),e.addEventListener("dragleave",R),e.addEventListener("drop",tt),e.addEventListener("dragend",ke);{let p=!0;Q=_a(g=>{if(ie=g,p){p=!1;return}P()})}s&&typeof s.subscribe=="function"&&(We=s.subscribe(()=>{try{Ae.clear(),P()}catch{}}));function Mr(){pe!==null&&(clearInterval(pe),pe=null)}function An(){vt!==null&&(clearTimeout(vt),vt=null)}return{load(){n("load"),P(),pe===null&&(pe=setInterval(()=>{try{P()}catch{}},Ty))},pause(){Mr()},clear(){Mr(),An(),We&&(We(),We=null),Q&&(Q(),Q=null),pt.destroy(),Te.hidden=!0,je?.destroy(),je=null,e.removeEventListener("click",nt),e.removeEventListener("change",bt),e.removeEventListener("input",on),e.removeEventListener("pointerdown",X),document.removeEventListener("click",an),document.removeEventListener("keydown",br),e.removeEventListener("dragstart",y),e.removeEventListener("dragover",Z),e.removeEventListener("dragleave",R),e.removeEventListener("drop",tt),e.removeEventListener("dragend",ke),e.replaceChildren()}}}function nf(e,t,n){let r=zt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let k=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
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
    `}function m(){s&&ot(u(),s),o&&ot(d(),o)}return m(),a=t.subscribe(()=>m()),{destroy(){a&&(a(),a=null),s&&ot(c``,s),o&&ot(c``,o)}}}var rf=["bug","feature","task","epic","chore"];function sf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var of=["Critical","High","Medium","Low","Backlog"];function af(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let F=document.createElement("option");F.value="",F.textContent="\u2014 Select \u2014",o.appendChild(F);for(let W of rf){let C=document.createElement("option");C.value=W,C.textContent=sf(W),o.appendChild(C)}a.replaceChildren();for(let W=0;W<=4;W+=1){let C=document.createElement("option");C.value=String(W);let M=of[W]||"Medium";C.textContent=`${W} \u2013 ${M}`,a.appendChild(C)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function j(F){s.disabled=F,o.disabled=F,a.disabled=F,i.disabled=F,l.disabled=F,d.disabled=F,m.disabled=F,m.textContent=F?"Creating\u2026":"Create"}function K(){u.textContent=""}function Y(F){u.textContent=F}function ie(){try{let F=window.localStorage.getItem("beads-ui.new.type");F?o.value=F:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let F=o.value||"",W=a.value||"";F.length>0&&window.localStorage.setItem("beads-ui.new.type",F),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function U(){K();let F=String(s.value||"").trim();if(F.length===0){Y("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),a.focus();return}let C=String(o.value||""),M=String(l.value||""),re={title:F};C.length>0&&(re.type=C),String(W).length>0&&(re.priority=W),M.length>0&&(re.description=M),j(!0);try{await t("create-issue",re)}catch{j(!1),Y("Failed to create issue");return}Q(),j(!1),k()}return n.addEventListener("cancel",F=>{F.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",F=>{F.key==="Enter"&&(F.ctrlKey||F.metaKey)&&(F.preventDefault(),U())}),r.addEventListener("submit",F=>{F.preventDefault(),U()}),{open(){r.reset(),K(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Oy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Ly(e,t){return pi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function lf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Ly(r,e);return c`<button
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
  `}function cf(e,t,n){return c`
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
  `}function uf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Oy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Iy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function df(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(_e=>ue(_e,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function m(){if(d)return d;let _e=a.querySelector('[data-pane="execution"]');return _e?(d=Oa(_e,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function h(){return c`
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
              ${lf(_e,s(),Y)}
              ${cf(_e,u,{onDraft:Ee=>{u=Ee},onAdd:ie,onRemove:Q})}
              ${uf(_e,U)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(_e){let Ee=r.get();if(Ee)try{let Fe=await n("display-policy-set",{expected_revision:Ee.revision,policy:_e(Ee)});j(Fe),Fe&&Fe.conflict&&Fe.policy&&(Fe=await n("display-policy-set",{expected_revision:Fe.policy.revision,policy:_e(Fe.policy)}),j(Fe)),Fe&&Fe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function j(_e){_e&&_e.policy&&typeof _e.policy=="object"&&r.set(_e.policy)}function K(_e){k(_e)}function Y(_e){let Ee=r.get();if(!Ee)return;let Fe=!My(_e,Ee);K(we=>Py(_e,we,Fe))}function ie(){let _e=u.trim();_e.length!==0&&(u="",K(Ee=>Ee.hidden_prefixes.includes(_e)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,_e]}),F())}function Q(_e){K(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(Fe=>Fe!==_e)}))}function U(_e){let Ee=r.get();if(!Ee)return;let Fe=Ee.chips[_e]===!1;K(()=>({chips:{[_e]:Fe}}))}function F(){ot(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Iy.map(_e=>c`<button
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
              @click=${le}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),m()}function W(_e){i=_e,F()}let C=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",C),a.addEventListener("cancel",C);let M=_e=>{_e.target===a&&le()};a.addEventListener("click",M);let re=null;r.subscribe&&(re=r.subscribe(()=>{l&&F()}));let ge=null;t.implPresetStore?.subscribe&&(ge=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function xe(_e="execution"){l||(l=!0,t.onOpenChange?.(!0),i=_e,u="",F(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),m()?.load())}function le(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:xe,close:le,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",C),a.removeEventListener("cancel",C),a.removeEventListener("click",M),re&&(re(),re=null),ge&&(ge(),ge=null),d?.destroy(),d=null,a.remove()}}}function My(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Py(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Dy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],pf="usage-meter-card",Ny="usage-meter-layer",xl=600,qy=["token_expired","relogin_required"];function ff(e){return String(e).padStart(2,"0")}function Fy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _f(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${ff(r.getHours())}:${ff(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Dy[r.getMonth()]} ${r.getDate()} ${o}`;return`${Fy(n,t)} \xB7 ${i}`}function jy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function mf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function gf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var bf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function yf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function By(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:yf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Uy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=By(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?yf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Wy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Uy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function vf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function zy(e,t){return!e.held||vf(e,t)<=xl?e:{...e,available:!1,windows:[],accounts:[]}}function hf(e,t){return`${e}:${t}`}function wf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){ot(c``,e),e.hidden=!0,m()}function d(){if(l===null){let we=e.ownerDocument;l=we.createElement("div"),l.id=Ny,l.className="usage-meter__layer",we.body.appendChild(l)}return l}function m(){l!==null&&(ot(c``,l),l.remove(),l=null)}function h(we){n!==we&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",K),window.addEventListener("resize",j)),n=we)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",K),window.removeEventListener("resize",j))}function k(we){let J=we.target;J&&(e.contains(J)||l!==null&&l.contains(J))||(b(),le())}function j(){le()}function K(we){we.key==="Escape"&&(b(),le())}function Y(we){n===we?b():h(we),le()}function ie(){b(),le()}async function Q(we,J){if(r.has(we.key))return;let Te=hf(we.key,J);r.set(we.key,J),a.delete(Te),le();let Me=null;try{Me=await(await fetch(we.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:J})})).json()}catch{Me=null}if(t)return;if(r.delete(we.key),!Me||Me.ok!==!0){let q=Me&&typeof Me.error=="string"&&Me.error.length>0?Me.error:"network_error";a.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${q}`}),le();return}let V=Array.isArray(Me.warnings)?Me.warnings.filter(q=>typeof q=="string"&&q.length>0):[];V.length>0&&a.set(Te,{kind:"warn",text:V.join(" \xB7 ")}),le(),await Fe()}function U(we,J,Te,Me){let V=gf(we.pct),me=`resets ${_f(we.resetsAt,Me)}${J?` \xB7 ${Te}`:""}`;return c`<span
      class="usage-meter__window ${mf(V)}"
      style=${`--progress: ${V}%`}
      title=${me}
    >
      <span class="usage-meter__label">${we.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${V}%</span>
    </span>`}function F(we,J,Te){let Me=vf(J,Te),V=J.available&&(J.held||Me>xl),q=V?`${Math.floor(Me/60)}\uBD84 \uC804 \uCE21\uC815`:"",me=J.accounts.filter(je=>!je.active).length,Ae=`usage-meter__group${V?" usage-meter__group--stale":""}`,We=c`<span class="usage-meter__provider"
        >${we.label}</span
      >
      ${J.available?J.windows.map(je=>U(je,V,q,Te)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${me>0?c`<span class="usage-meter__badge">+${me}</span>`:""}`;if(J.accounts.length===0)return c`<span
        class=${Ae}
        aria-label=${`${we.label} usage`}
        >${We}</span
      >`;let pe=n===we.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${we.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${pf}
      @click=${()=>Y(we.key)}
    >
      ${We}
    </button>`}function W(we,J){return c`<span class="usage-meter" aria-label="Usage">
      ${we.map(Te=>F(Te.provider,Te.snapshot,J))}
    </span>`}function C(we,J){let Te=gf(we.pct),Me=_f(we.resetsAt,J);return c`<span
      class="usage-meter__account-window ${mf(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${we.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${Me.length>0?`\u21BB ${Me}`:""}</span
      >
    </span>`}function M(we,J){return qy.includes(J)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${we.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(we,J,Te){let Me=J.status==="ok",V=typeof J.ageSeconds=="number"&&J.ageSeconds>xl,q=a.get(hf(we.key,J.number)),me=r.get(we.key),Ae=me!==void 0,We=me===J.number,pe=["usage-meter__account"];return J.active&&pe.push("usage-meter__account--active"),Me||pe.push("usage-meter__account--unavailable"),V&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${J.email}
          >${J.alias===null?J.email:J.alias}</span
        >
        ${J.plan===null?"":c`<span class="usage-meter__account-tag">${J.plan}</span>`}
        ${J.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${J.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${jy(J.ageSeconds)}</span
            >`}
        ${J.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ae}
              @click=${()=>{Q(we,J.number)}}
            >
              ${We?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Me?c`<div class="usage-meter__account-windows">
            ${J.windows.map(je=>C(je,Te))}
          </div>`:c`<div class="usage-meter__account-status">
            ${M(we,J.status)}
          </div>`}
      ${q===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${q.kind}"
          >
            ${q.text}
          </div>`}
    </div>`}function ge(we,J,Te){let Me=J.accounts.filter(V=>V.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${we.label} · 활성 ${Me} / 전체
        ${J.accounts.length}
      </h2>
      ${J.accounts.map(V=>re(we,V,Te))}
    </section>`}function xe(we,J){return c`<div
      class="usage-meter__card"
      id=${pf}
      role="dialog"
      aria-label=${`${we.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ge(we.provider,we.snapshot,J)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function le(){let we=Date.now(),J=[];for(let Me of bf){let V=o.get(Me.key);V&&J.push({provider:Me,snapshot:zy(V,we)})}if(J.length===0){b(),u();return}let Te=J.find(Me=>Me.provider.key===n&&Me.snapshot.accounts.length>0);Te||b(),ot(W(J,we),e),e.hidden=!1,Te?_e(Te,we):m()}function _e(we,J){let Te=d(),Me=e.getBoundingClientRect(),V=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${Me.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,V-Me.right)}px`),ot(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${xe(we,J)}`,Te)}async function Ee(we){try{let J=await fetch(we.endpoint);return J.ok?Wy(await J.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Fe(){i+=1;let we=i,J=await Promise.all(bf.map(async Te=>({provider:Te,read:await Ee(Te)})));if(!(t||we!==i)){for(let Te of J){let Me=Te.provider.key;if(Te.read.kind==="ok"){o.set(Me,Te.read.snapshot);continue}if(Te.read.kind==="empty"){o.delete(Me);continue}let V=o.get(Me);V!==void 0&&!V.held&&o.set(Me,{...V,held:!0})}le()}}return u(),Fe(),s=setInterval(()=>{Fe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function kf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Hy="worker-ineligible";function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $f(e){return ro(e).includes(Hy)}var Gy="session-preferred",Ky=["exclusive_machine"];function xf(e,t){if(!ro(e).includes(Gy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Ky.includes(n)?n:""}var Vy="worker-serial";function Al(e){return ro(e).includes(Vy)}function Sl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Yy=new Set(["done","failed","orphaned","stopped","discarded"]),Zy={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Qy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Xy={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function El(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Xy[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Af(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,m=null,h=null,b=null,k=new Set,j=!1,K=0,Y=null,ie=new Set;function Q(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function U(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function F(){return o&&o()||""}async function W(){if(!s)return;let x=++K;j=!0,b=null,k.clear(),Xe();try{let S=await s("worker-parallel-analysis-targets",{root_dir:F()});if(x!==K||!De)return;let te=Array.isArray(S?.qualified)?S.qualified:[],fe=Array.isArray(S?.excluded)?S.excluded:[];b={qualified:te,excluded:fe};for(let Se of te)Se&&typeof Se.id=="string"&&k.add(Se.id)}catch{x===K&&De&&(b={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===K&&(j=!1,De&&Xe())}}function C(x){return Array.isArray(x.runs)?x.runs:[]}function M(){let x=Q(),S=new Set;for(let te of Object.values(x.attempts||{})){let fe=te;fe&&typeof fe.bead_id=="string"&&!Yy.has(fe.status)&&S.add(fe.bead_id)}for(let te of Array.isArray(x.pr_wait)?x.pr_wait:[])te&&typeof te.bead_id=="string"&&S.add(te.bead_id);for(let te of Object.values(x.discard_operations||{})){let fe=te;fe&&fe.phase!=="done"&&typeof fe.bead_id=="string"&&S.add(fe.bead_id)}return S}function re(x){return x.filter(S=>ge(S)===null)}function ge(x){let S=Q();for(let te of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(te?.entries)&&te.entries.some(fe=>fe.bead_id===x))return te.id;return(Array.isArray(S.queue)?S.queue:[]).some(te=>te.bead_id===x)?"parallel":null}function xe(x,S){let te=l.get(x);return te||[...S.order]}function le(x){if(x.length<2)return!1;let S=ge(x[0]);if(!S||S==="parallel")return!1;let te=Q(),fe=(Array.isArray(te.serial_lanes)?te.serial_lanes:[]).find(Ne=>Ne.id===S)?.entries.map(Ne=>Ne.bead_id);if(!Array.isArray(fe))return!1;let Se=x.map(Ne=>fe.indexOf(Ne));return Se.every(Ne=>Ne>=0)&&Se.every((Ne,A)=>A===0||Ne>Se[A-1])}function _e(){let x=Q(),S=Array.isArray(x.serial_lanes)?x.serial_lanes:[],te=S.find(fe=>Array.isArray(fe.entries)&&fe.entries.length===0);return te?te.id:S[0]?.id||"s1"}function Ee(x){let S=Q().bead_titles||{};return typeof S[x]=="string"?S[x]:x}async function Fe(x,S){if(!s||d)return null;d=!0,Xe();try{return await s(x,S)}finally{d=!1,Xe()}}async function we(x){r?.setPending?.(!0);try{let S=await Fe("worker-parallel-analysis-start",{force:x,target_ids:Array.from(k)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function J(){let x=U().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Te(x){if(!(!s||ie.has(x))){ie.add(x),Xe();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:F(),run_id:x});if(!De)return;if(S?.ok===!0&&typeof S.prompt=="string"){Y={run_id:x,prompt:S.prompt};return}ue(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ie.delete(x),Xe()}}}function Me(){Y=null,Xe()}async function V(){if(!Y)return;let x=await Sn(Y.prompt);ue(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function q(x,S){a&&a(x,El(S))}function me(){return Q().runner_catalog}function Ae(x){return Object.keys(me()?.runners?.[x]?.models||{})}function We(x){let S=Ae(x),te=me()?.runners?.[x]?.default_model;return typeof te=="string"&&S.includes(te)?te:S[0]||""}function pe(){let x=U().settings,S=m||x.runner||"claude",te=Ae(S),fe=m?We(S):x.model||te[0]||"",Se=Sl(me(),S,fe),Ne=x.effort||"",A=Se.includes(Ne)?Ne:Se[0]||"";return{runner:S,model:fe,effort:A,models:te,efforts:Se}}async function je(x){let S=U().settings,te=await Fe("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:x.runner,model:x.model,effort:x.effort});(!te||te.applied!==!0)&&(m=null,Xe(),te&&te.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${te.reason}`,"error",2800))}function pt(x){m=x,Xe();let S=pe();je({runner:x,model:S.model,effort:S.effort})}function it(x){let S=pe(),te=Sl(me(),S.runner,x);je({runner:S.runner,model:x,effort:te.includes(S.effort)?S.effort:te[0]||""})}function $t(x){let S=pe();je({runner:S.runner,model:S.model,effort:x})}async function ut(x,S){if(!s||d)return;let te=xe(x,S),fe=U();if(te.length<2||!fe.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Se=u.get(x)||_e(),Ne=()=>({snapshot_digest:fe.last_good.identity_digest,group_index:x,lane:Se,ordered_bead_ids:te,expected_revision:Q().revision});d=!0,Xe();try{let A=await s("worker-parallel-analysis-submit",Ne());A&&A.queue&&n&&n.set(A.queue),A&&A.applied!==!0&&A.conflict===!0&&(A=await s("worker-parallel-analysis-submit",Ne()),A&&A.queue&&n&&n.set(A.queue)),A&&A.applied===!0?(l.delete(x),ue(`\uC9C1\uB82C \uB808\uC778 ${Se}\uC5D0 ${te.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${A?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Xe()}}function L(x,S,te){l.set(x,xe(x,S).filter(fe=>fe!==te)),Xe()}function ae(x){l.delete(x),Xe()}function Oe(x,S,te,fe){let Se=[...xe(x,S)],Ne=Se.indexOf(te),A=Ne+fe;Ne<0||A<0||A>=Se.length||(Se.splice(A,0,...Se.splice(Ne,1)),l.set(x,Se),Xe())}function qe(){let x=U().settings,S=Object.keys(me()?.runners||{}),te=pe();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${fe=>pt(fe.target.value)}
        >
          ${S.map(fe=>c`<option
                value=${fe}
                ?selected=${te.runner===fe}
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
          @change=${fe=>it(fe.target.value)}
        >
          ${te.models.map(fe=>c`<option
                value=${fe}
                ?selected=${te.model===fe}
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
          ${te.efforts.map(fe=>c`<option
                value=${fe}
                ?selected=${te.effort===fe}
              >
                ${fe}
              </option>`)}
        </select>
      </label>
      ${Ye(x)}
    </div>`}function Ye(x){return!gt(x)||rt(x)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function rt(x){return x.is_default===!0&&x.compatible===!1}function gt(x){return!!(x.runner&&x.model&&x.effort)}function ht(x){return gt(x)&&x.compatible!==!1}function se(x){let S=Math.max(0,Math.floor(x/1e3)),te=Math.floor(S/60),fe=S%60;return`${te}:${String(fe).padStart(2,"0")}`}function ee(x){let S=x.job;if(S){let te=typeof S.started_at=="number"?S.started_at:0,fe=`${S.runner||"?"}/${S.model||"?"}`,Se=te?` \xB7 \uACBD\uACFC ${se(Date.now()-te)}`:"",Ne=typeof S.session_id=="string"?S.session_id:"",A=C(x).find(P=>P.run_id===S.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${fe} · effort ${S.effort||"?"}${Se}</span
        >
        ${Ne?c`<code class="pa-session-id" title=${Ne}
              >${Ne.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>q(S.job_id,A||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${A?.prompt_saved!==!0||ie.has(S.job_id)}
          @click=${()=>{Te(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return lt()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Be(x){let S=ee(x);return S===""?"":c`<div class="pa__strip">${S}</div>`}function lt(){return r?.isPending?.()===!0}function He(x){let S=!!x.job,te=ht(x.settings),fe=b!==null&&k.size===0,Se=S||d||lt()||j;return c`<div class="pa-meta">
      ${x.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!te||Se||fe}
        @click=${()=>{we(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!te||Se||fe}
        @click=${()=>{we(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{J()}}
      >
        취소
      </button>
    </div>`}function ve(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function ze(x,S){S?k.add(x):k.delete(x),Xe()}function ct(x){let S=Array.isArray(x.scope)?x.scope:[],te=Array.isArray(x.overlaps)?x.overlaps:[];return S.length===0&&te.length===0?c``:c`<span class="pa-target__signals">
      ${S.length>0?c`<details class="pa-target__scope" title=${S.join(`
`)}>
            <summary>scope ${S.length}</summary>
            <ul>
              ${S.map(fe=>c`<li><code>${fe}</code></li>`)}
            </ul>
          </details>`:""}
      ${te.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${te.join(", ")}`}
            >겹침 ${te.join(", ")}</span
          >`:""}
    </span>`}function dt(){let x=b?.qualified||[],S=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${j?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${b&&x.length>0?c`<ul class="pa-targets__list">
            ${x.map(te=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${te.id}
                      .checked=${k.has(te.id)}
                      @change=${fe=>ze(te.id,fe.target.checked)}
                    />
                    <span class="pa-target__title">${te.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ct(te)}
                    <span class="pa-target__route">${te.route}</span>
                    <span class="pa-target__lane"
                      >${ve(te.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&x.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&S.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(te=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${te.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Zy[te.reason]||te.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ve(te.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function ft(x){let S=typeof x.session_id=="string"&&x.session_id.length>0,te=S?x.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${Qy[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${S?c`<code class="pa-session-id" title=${te}
            >${te.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?c`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>q(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||ie.has(x.run_id)}
          @click=${()=>{Te(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Dt(x){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?c`<ul class="pa-runs__list">
            ${x.map(S=>ft(S))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Vt(){return Y?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Me}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{V()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Me}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function Ht(x,S){let te=xe(x,S),fe=M(),Se=te.filter(de=>fe.has(de)),Ne=re(te),A=le(te),P=Array.isArray(Q().serial_lanes)?Q().serial_lanes:[],$e=u.get(x)||_e(),Ve=S.eligible!==!0||te.length<2||Se.length>0||Ne.length>0||A||d;return c`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(de=>c`<span class="pa-group__category">${de}</span>`)}
        ${A?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Ne.length>0?c`<span class="pa-group__stale"
              >stale — ${Ne.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${te.map((de,Je)=>c`<li class="pa-member" data-bead-id=${de}>
              <span class="pa-member__seq">${Je+1}</span>
              <span class="pa-member__title">${Ee(de)}</span>
              ${fe.has(de)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${de}
                ?disabled=${Je===0}
                aria-label=${`${de} \uC704\uB85C`}
                @click=${()=>Oe(x,S,de,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${de}
                ?disabled=${Je===te.length-1}
                aria-label=${`${de} \uC544\uB798\uB85C`}
                @click=${()=>Oe(x,S,de,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${de}
                aria-label=${`${de} \uC81C\uC678`}
                @click=${()=>L(x,S,de)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(de=>c`<li class="pa-evidence">
              <code>${de.path}</code>
              <span class="pa-evidence__locator">${de.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ae(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${de=>{u.set(x,de.target.value),Xe()}}
          >
            ${P.map((de,Je)=>c`<option
                  value=${de.id}
                  ?selected=${$e===de.id}
                >
                  직렬 ${Je+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ve}
          @click=${()=>{ut(x,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function xt(x){let S=Array.isArray(x.issues)?x.issues:[],te=S.filter(Se=>Se.verdict==="parallel_ok").length,fe=S.filter(Se=>Se.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${te}</span>
      <span>uncertain ${fe}</span>
    </div>`}function Et(){let x=De&&!!U().job;if(x&&h===null){h=setInterval(()=>Xe(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function Xe(){let x=U();m&&x.settings.runner===m&&(m=null);let S=x.last_good?.result;Et(),ot(c`
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
          ${Be(x)}
          <div class="pa__body">
            ${qe()} ${He(x)} ${dt()}
            ${S?c`${S.groups.map((te,fe)=>Ht(fe,te))}
                ${S.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${xt(S)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Dt(C(x))}
          </div>
        </div>
        ${Vt()}
      `,i)}let De=!1,N=()=>{De=!1,Y=null,K+=1,Et()},ne=x=>{x.target===x.currentTarget&&Le()};i.addEventListener("close",N),i.addEventListener("cancel",N),i.addEventListener("click",ne);let he=null;n&&n.subscribe&&(he=n.subscribe(()=>{De&&Xe()}));let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{De&&Xe()}));function H(){De||(De=!0,Xe(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Le(){De&&(De=!1,Y=null,K+=1,Et(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Le,destroy(){De=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",N),i.removeEventListener("cancel",N),i.removeEventListener("click",ne),he&&(he(),he=null),E&&(E(),E=null),i.remove()}}}var Sf=new Set(["sh","bash","zsh","dash","ksh"]),Ef=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Tf(e){let t=e.split("/");return t[t.length-1]||""}function Jy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Tf(n[0]);if(r!=="env")return Sf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Sf.has(Tf(s))}function ev(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function tv(e){let t=[],n=0;Ef.lastIndex=0;for(let r of e.matchAll(Ef)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:ev(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function nv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Cf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function m(F,W){return W?tv(F).map(C=>C.kind==="plain"?C.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${C.kind}"
            >${C.text}</span
          >`):F}function h(){if(!s)return c``;let F=o==="ready"&&Jy(a),W=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Q()}
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
              @click=${()=>Q()}
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
                  ${W.map((C,M)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(C,F)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){ot(h(),r)}async function k(){if(o!=="ready")return;let F=await Sn(a);ue(F?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",F?"success":"error")}function j(F){F.key==="Escape"&&s&&(F.preventDefault(),Q())}function K(){d||(document.addEventListener("keydown",j),d=!0)}function Y(){d&&(document.removeEventListener("keydown",j),d=!1)}async function ie(F,W=null){let C=++l;K(),s={...F},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let ge="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(F.lane)+"&base_sha="+encodeURIComponent(F.base_sha);try{let xe=await n(ge),le=await xe.json().catch(()=>({}));if(C!==l)return;if((t?t():"")!==re){Q();return}if(!xe.ok||!le||le.ok!==!0){o="error",i=nv(le&&typeof le.error=="string"?le.error:""),b();return}s={lane:le.lane,base_sha:le.base_sha,path:le.path,base_ref:le.base_ref},a=String(le.content),o="ready",b()}catch{if(C!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Q(){l+=1,Y(),s=null,a="",b();let F=u;u=null,F?.isConnected&&F.focus()}function U(){Q(),r.remove()}return{open:ie,close:Q,destroy:U}}function Rf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let C=o();return typeof C.revision=="number"?C.revision:0}function i(C){t&&C&&C.queue&&typeof C.queue=="object"&&t.set(C.queue)}function l(){let C=o().workspace_info;return C&&typeof C=="object"?C:{}}function u(C,M){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${C}"
      >${M}</span
    >`}function d(C){if(typeof C!="number"||!Number.isFinite(C))return"";let M=C/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(C/1e3)}\uCD08`}function m(C){let M=d(C);return M?u("config",M):""}function h(C,M,re){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${ge=>{s&&s({lane:C,base_sha:M.base_sha,path:re.script,base_ref:M.base_ref},ge.currentTarget)}}
    ></button>`}function b(){let C=o().repo_ops_opt_out;return{verify:C?.verify===!0,deploy:C?.deploy===!0}}function k(C,M){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${re=>{ie(C,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function j(C){let M=typeof C.base_sha=="string"?C.base_sha:"",re=`${C.source_path||"repo-ops/config.toml"} @ ${C.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,ge=b(),xe=!!C.verify&&ge.verify,le=!!C.deploy&&ge.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${xe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${C.verify?c`${h("verify",C,C.verify)}
              ${m(C.verify.timeout_ms)}
              ${xe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${xe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":C.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${C.verify?k("verify",ge.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${le?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${C.deploy?c`${h("deploy",C,C.deploy)}
              ${m(C.deploy.timeout_ms)}
              ${le?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${le?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":C.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${C.deploy?k("deploy",ge.deploy):""}
      </div>
    </section>`}function K(C){let M=C.repo_ops&&typeof C.repo_ops=="object"?C.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?j(M):M&&(M.status==="pending"||M.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function Y(C){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:C,expected_revision:a()});if(i(M),M&&M.conflict){let re=await n("worker-auto-repair-toggle",{on:C,expected_revision:a()});i(re)}r()}async function ie(C,M){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:C,opted_out:M,expected_revision:a()});if(i(re),re&&re.conflict){let ge=await n("worker-repo-ops-opt-out-toggle",{kind:C,opted_out:M,expected_revision:a()});i(ge)}r()}let Q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function U(C,M,re){return c`<div class="worker-repo-ops__policy-group" data-policy=${re}>
      <div class="worker-repo-ops__policy-label">${C}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(ge=>c`<li data-token=${ge}>
              ${Q[ge]||ge}
            </li>`)}
      </ul>
    </div>`}function F(C){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${C.map(M=>{let re=[Q[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?re.push(`${Q[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&re.push(`${M.sessions_per_user_action}\uD68C`,Q[M.user_actions]||M.user_actions),M.applies_when&&re.push(Q[M.applies_when]||M.applies_when),c`<li data-token=${M.id}>
            <strong>${Q[M.id]||M.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let C=o(),M=C.auto_repair!==!1,re=C.repo_operation_policy&&typeof C.repo_operation_policy=="object"?C.repo_operation_policy:null,ge=Array.isArray(C.repo_operations)?C.repo_operations:[],xe=ge.find(Fe=>Fe.state==="repairing"),le=ge.filter(Fe=>Fe.state==="failed"||Fe.state==="repairing"),_e=le.length?Math.min(...le.map(Fe=>typeof Fe.repair?.remaining=="number"?Fe.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find(Fe=>Fe.id==="auto_repair_session")?.attempts??1,Ee=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return c`<section
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
          @change=${Fe=>{Y(Fe.target.checked)}}
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
      ${re?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(re.worker_automatic||[]).length} · 해결 사다리
                ${Ee.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${U("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:F(Ee)}
            ${U("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${K(l())} ${W()}
      </details>`}}}var Mf=20,rv=5,sv=new Set(["failed","repairing","running","queued","retry_pending"]),Of={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Lf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function ov(e,t,n=Mf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function av(e){if(e.type==="cleanup")return!0;let t=e.operation;return sv.has(t.state)&&!t.dismissed&&!t.superseded_by}function iv(e,t,n={}){let r=ov(e,t,1/0),s=n.expanded===!0?Mf:rv,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||av(i));return{visible:a,hidden:r.length-a.length}}function If(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function lv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Pf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Df(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function cv(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Lf,r)?Lf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function uv(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${ya(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${If(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Of,t.kind)?Of[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ga(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Us(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${If(e)}"
          >${lv(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Df(tp(t.failure_kind,r)):""}
      ${cv(t)}
      ${Pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ga(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function dv(e){let t=e.cleanup,n=Lr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
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
        ${Op(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Df(Ca(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function pv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?dv(r):uv(r))}
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
  </section>`}function Nf(e,t={}){let n=null;function r(){if(n===null){ot(c``,e);return}let a=iv(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(pv({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var fv=zt("views:worker"),_v="tab:worker:ready",mv="tab:worker:blocked",gv="tab:worker:in-progress",bv="tab:worker:resolved",hv="tab:worker:closed",ja=1,qf=5;function Ff(e){return Is(e).evidence==="published"}var yv=new Set(["quick_fix","spec_backed","full_plan"]);function jf(e){return typeof e=="string"&&yv.has(e)}var zf="beads-ui.worker.candidate-filter",Tl={show_blocked:!1,spec:"all"};function vv(){try{let e=window.localStorage.getItem(zf);if(!e)return{...Tl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Tl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Tl}}}function wv(e){try{window.localStorage.setItem(zf,JSON.stringify(e))}catch{}}function kv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var $v=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Hf="bdui.worker.candidate_sort",Gf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Rl="spec";function Kf(e){return Gf.some(t=>t.value===e)?e:Rl}function xv(){try{return Kf(window.localStorage.getItem(Hf))}catch{return Rl}}function Av(e){try{window.localStorage.setItem(Hf,e)}catch{}}var Vf="bdui.worker.done-range";function Sv(){try{let e=window.localStorage.getItem(Vf);return e===null?"today":Wn(e)}catch{return"today"}}function Ev(e){try{window.localStorage.setItem(Vf,e)}catch{}}function Bf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Tv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Ar):t==="updated"?r.sort(xo):(r.sort(Ao(n)),t==="board"?r:[...r.filter(Ff),...r.filter(s=>!Ff(s))])}function Cv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Rv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Ov="\u{1F512} blocked";function Uf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Lv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Iv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Mv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Pv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Dv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Cl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Nv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),qv=new Set(["waiting_metadata","reviewing","retrying"]);function Fv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?cn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function jv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Bv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=jv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Nv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Wf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Uv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Wf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Wf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Lv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Uf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Uf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Wv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,m=null,h=null,b={},k=!1,j=!1,K={},Y=null){let ie=!!l&&l.position>0,Q=!!l?.continuation_action&&l.continuation_action.continuation===null,U=!!l&&l.active===!0,F=l&&l.failure||null,W=Mv(l?l.waiting:null,h),C=n[e]||null,M=C&&C.gate?C.gate:null,re=C&&C.pr?C.pr:null,ge=Pv(l?l.resolution:null),xe=Dv(l?l.head_review:null),le=l&&l.head_review||null,_e=Fv(h,le),Ee=Bv(h,_e),Fe=l&&l.authority||null,we=!!le&&["pending","reviewing","revising"].includes(le.state),J=!!h&&typeof h=="object"&&qv.has(h.phase),Te=ie&&!U&&(le?.state==="failed"||!Fe||J||Fe.source==="automatic"&&!j),Me=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ge?ge.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,V=!!M&&M.base_badge==="\uCDA9\uB3CC",q=!!M&&M.enabled===!0,me=eo({bead_id:e,merge_sha:K.merge_sha,cleanup_cursor:K.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:K.repo_operations}),Ae=qa(me),We=o&&!me&&(o.queueing??null)?o.queueing:null,pe=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!M&&M.tier==="merged",je=i&&!!r&&!!M&&M.tier==="merged",pt=Te&&(q||V||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||pe||je),it=i&&V&&u===!1,$t=jn(b,e,{external:i,merge_active:U||me?.step==="merge",merge_queued:ie,conflict_active:!!a,cleanup_active:Ae,merged:!!r||M?.tier==="merged"}),ut=!!$t.operation,L=!pe&&!!r&&r.step==="repo_operations",ae=Uv({continuation_required:Q,queueing:We,merge_step:me,conflict_badge:Me,conflict_live:ge?.live===!0||a==="running",head_review:le&&xe?{...xe,state:le.state,failure_reason:le.failure_reason}:null,auto_resolution:_e,recovery:Ee,cleanup_failed:r,cleanup_label:r?Lr(r.step):null,base_exception:m,conflicting:V,gate:M,receipt_check:C&&C.receipt_check?C.receipt_check:null,queue_failure:F,auto_skip:d,queued:ie,queue_active:U,queue_position:l?l.position:0,activity:Me?null:o&&o.activity||null}),Oe=ae?.live===!0&&ae.title?c`<span title=${ae.title}>${ae.label}</span>`:ae?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&me?.active!==!0?Na(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Y?{dependency_chips:Y}:{},external:i,pr_number:re&&typeof re.number=="number"?re.number:null,pr_url:re&&typeof re.url=="string"?re.url:"",completion_badge:ae?.live!==!0&&ae?.title?ae.label:null,completion_title:ae?.title||"",completion_repair_pr_url:Ee?Ee.repair_pr_url:"",completion_repair_pr_number:Ee?Ee.repair_pr_number:null,badges:Oe?[Oe]:[],live_badge:ae?.live===!0?Oe:null,usage:s,alert:ae?.alert===!0,merge_action:M?.tier==="merged"&&!pe&&!je||L?!1:!ie||Q||Te,timeline_action:L,cancel_action:ie&&!Q,cancel_enabled:(!U||we)&&!(Ee&&Ee.lock_actions),cancel_title:Ee&&Ee.lock_actions?`${Ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:U&&!we?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":we?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$t,discard_action:$t.action,merge_step:me,discard_enabled:$t.enabled,discard_title:$t.title,merge_enabled:!me&&!We&&!a&&!ut&&!m&&!(Ee&&Ee.lock_actions)&&!it&&!L&&(q||V||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||pe||je||pt||J&&!U),merge_label:Q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":pe||je?"\uC815\uB9AC \uC7AC\uAC1C":V&&!me&&!pe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":M?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ut?$t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":We?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":it?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":V?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":M?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":q?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:M&&M.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${M&&M.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ol(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:m,doneRange:h,onDoneRangeChange:b}=t,k=r?Eo(r,i):null,j=Oo({transport:n,uiOrderStore:i}),K=null,Y=[],ie=vv(),Q=null,U=null,F={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},W=xv(),C=h?Wn(h):Sv(),M=new Map;function re(){let _=Br.find(w=>w.value===C);return _?_.label:"\uC624\uB298"}let ge=ma("beads-ui.worker.lane-collapsed"),xe=!1,le=new Set,_e=new Set,Ee=new Set,Fe=new Set,we=new Set,J={},Te=null,Me=0,V=null,q=[];function me(_){return Te===_?J:{}}async function Ae(){if(!n)return;let _=u?.()||"";if(Te===_||V&&V.key===_&&V.generation===Me)return;let w=++Me;V={key:_,generation:w};let G=null;try{G=await Promise.resolve(n("get-session-defaults",{}))}catch(X){if(w!==Me)return;V=null,fv("get-session-defaults failed: %o",X),Re();return}w===Me&&(J=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},Te=_,V=null,Re())}function We(){Te=null,Me+=1,Ae()}let pe=document.createElement("div");pe.className="worker-console";let je=document.createElement("div");je.className="worker-top";let pt=document.createElement("div");pt.className="worker-drawer-overlay",pt.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let $t=document.createElement("div");$t.className="worker-drawer-host";let ut=document.createElement("div");ut.className="worker-drawer-host",ut.hidden=!0,pt.append(it,$t,ut);let L=document.createElement("div");L.className="worker-lanes-host",pe.append(je,pt,L),e.appendChild(pe);let ae=null,Oe=null,qe=ts($t,{transport:n,sessionLogStore:a,onClose:()=>{ae=null,Oe=null,pt.hidden=!0,Re()}}),Ye=Nf(ut,{onClose:()=>{ut.hidden=!0,pt.hidden=!0,Re()}}),rt=Cf({getWorkspacePath:u||(()=>"")}),gt=u&&u()||"",ht=Rf({queueStore:s,transport:n,onChanged:()=>Re(),onOpenScript:(_,w)=>{rt.open(_,w)}}),se=o?Af(pe,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(_,w)=>Ke(_,w)}):null;function ee(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ja,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Be(){let _=ee(),w=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,G=Array.isArray(_.serial_lanes)?_.serial_lanes:[],X=[];for(let Z of G){if(X.length>=w)break;!Z||typeof Z.id!="string"||!/^s[1-5]$/.test(Z.id)||!Array.isArray(Z.entries)||X.push({id:Z.id,label:`\uC9C1\uB82C ${Z.id.slice(1)}`,count:Z.entries.length})}return X.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...X]}function lt(_){if(!Q||!_.some(G=>G.id===Q))return null;let w=Be();return w?{bead_id:Q,lanes:w}:null}function He(){let _=ee();return typeof _.revision=="number"?_.revision:0}function ve(_){_&&_.queue&&s&&s.set(_.queue)}function ze(){let _=ee().queue;return Array.isArray(_)?_.length:0}async function ct(_,w,G){if(!n)return;let X=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},...G===void 0?{}:{index:G},expected_revision:He()}),y=await n("worker-queue-place",X());ve(y),y&&y.conflict&&await n("worker-queue-place",X()).then(ve)}async function dt(_,w,G){if(!n)return;let X=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},to_index:G,expected_revision:He()}),y=await n("worker-queue-reorder",X());ve(y),y&&y.conflict&&await n("worker-queue-reorder",X()).then(ve)}async function ft(_){if(!n)return;let w=await n("worker-queue-remove",{bead_id:_,expected_revision:He()});ve(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:He()}).then(ve)}async function Dt(_){if(!n||!_)return;let w=await n("worker-attempt-pause",{attempt_id:_});w&&w.paused===!1&&w.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Vt(_){if(!n||!_)return;let w=await Yr();if(w===null)return;let G=async(y={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:He(),...w!==""?{instructions:w}:{},...y}),X=await G();ve(X),X&&X.conflict&&(X=await G(),ve(X)),X=await Jn(X,(y,Z)=>G({continuation:y,decision_token:Z}),{onResult:ve,refresh:()=>G()}),X&&X.resumed===!1&&!X.conflict&&X.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${X.reason}`,"error",2400)}async function Ht(_){if(!n||!_)return;let w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:He()});ve(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:He()}),ve(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function xt(_,w,G=!0){if(!n)return null;let X=n,y=await X(_,{...w,expected_revision:He()});return ve(y),y&&y.conflict&&G&&(y=await X(_,{...w,expected_revision:He()}),ve(y)),y}async function Et(_){if(!n||!_)return;let w=ee().merge_queue?.find(X=>X.bead_id===_)?.continuation_action;if(w?.mismatch&&w.continuation===null){await De(_,w.mismatch);return}le.add(_),Re();let G;try{G=await xt("worker-merge-queue-add",{bead_id:_})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{le.delete(_),Re()}if(!(!G||G.applied)){if(G.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Iv(G.reason),"error",2400)}}async function Xe(_){if(!(!n||!_||_e.has(_))){_e.add(_),Re();try{let w=await n("worker-cleanup-retry",{bead_id:_,expected_revision:He()});ve(w),w&&!w.retried&&!w.conflict&&w.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{_e.delete(_),Re()}}}async function De(_,w){let G=await Jn({continuation_mismatch:w},(y,Z)=>xt("worker-merge-queue-add",{bead_id:_,continuation:y,decision_token:Z},!1)),X=G?.queue?.merge_queue?.find(y=>y.bead_id===_)?.continuation_action;if(G?.applied!==!0&&X?.continuation===null&&X.mismatch){await De(_,X.mismatch);return}G&&G.applied===!1&&!G.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function N(_){if(!n)return;let w=await xt("worker-merge-auto-toggle",{on:_});!w||w.conflict||ue(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function ne(_){if(!n||!_)return;let w=await xt("worker-merge-queue-remove",{bead_id:_});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function he(){await xt("worker-merge-queue-remove",{all:!0})}async function E(_,w=null,G="unmerged",X=null){if(!n||!_)return;let y=Ws(_,G);if(!(!!X||typeof globalThis.confirm!="function"||globalThis.confirm(y)))return;let R=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...X?{operation_id:X}:{},expected_revision:He()});if(ve(R),R&&R.conflict&&(R=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...X?{operation_id:X}:{},expected_revision:He()}),ve(R)),R&&R.discarded===!0){ue(va(R),"success",5e3);return}if(R&&R.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${R.reason}`,"error",2800);return}if(R&&R.accepted&&R.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(R&&R.accepted&&!R.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${R.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}R&&!R.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(_,w,G){if(!(!n||!w||!G||Fe.has(w))){Fe.add(w),Re();try{let X=await n(_,{bead_id:w,action_id:G,expected_revision:He()});ve(X),X?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!X?.ok&&X?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(X.reason)}`,"error",2800)}finally{Fe.delete(w),Re()}}}async function Le(_,w){if(!n||!w||Ee.has(w))return;Ee.add(w),Re();let G;try{let X=async(y={})=>await n(_,{bead_id:w,expected_revision:He(),...y});G=await X(),ve(G),G&&G.conflict&&(G=await n(_,{bead_id:w,expected_revision:He()}),ve(G)),_==="worker-revise-fix"&&(G=await Jn(G,(y,Z)=>X({continuation:y,decision_token:Z}),{onResult:ve,refresh:()=>X()}))}finally{Ee.delete(w),Re()}if(!(!G||G.conflict)){if(G.ok){ue(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${G.reason||""}`,"error",3e3)}}async function x(_){if(!n)return;let w=await n("worker-automation-toggle",{on:_,expected_revision:He()});ve(w),w&&w.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:He()}).then(ve)}async function S(_){if(!n||!_)return;let w=await n("worker-repo-operation-repair",{operation_id:_});if(ve(w),w&&w.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function te(_){if(!n||!_)return;let w=await n("worker-repo-operation-dismiss",{operation_id:_});ve(w),w&&w.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function fe(_){if(!n||!Number.isFinite(_))return;let w=Math.max(ja,Math.floor(_)),G=await n("worker-queue-set-slots",{slots:w,expected_revision:He()});ve(G),G&&G.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:He()}).then(ve)}async function Se(_){if(!n||!Number.isInteger(_)||_<1||_>qf)return;let w=ee(),G=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(_).reduce((Z,R)=>Z+(Array.isArray(R?.entries)?R.entries.length:0),0),X=()=>({count:_,expected_revision:He()}),y=await n("worker-queue-set-serial-lane-count",X());ve(y),y&&y.conflict&&(y=await n("worker-queue-set-serial-lane-count",X()),ve(y)),y&&y.applied&&G>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${G}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Ne="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function A(_,w){let G=ol(_,w.id,F);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:G.kind==="note"?{kind:"note",text:G.text}:G.kind==="disabled"?{kind:"disabled",label:Ne,title:G.title}:{kind:"place",label:Ne,title:G.title}}}function P(_,w){if(!U||U.bead_id!==_)return null;let G=U.counterpart_id,X=w.filter(y=>y.id===G);return X.length===0?null:{rows:X.map(y=>A(_,y))}}async function $e(_,w){let G=ol(_,w,F);if(U=null,G.kind!=="ops"){Re();return}let X=He();for(let y of G.ops){let Z=await Ve(y,X);if(Z===null)break;X=Z}Re()}async function Ve(_,w){if(!n)return null;try{let G=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:w});if(ve(G),G&&G.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!G||G.applied!==!0)return ue(G&&typeof G.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${G.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let X=G.queue?G.queue.revision:void 0;return typeof X!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):X}catch(G){return ue(G instanceof Error&&G.message?G.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function de(){let _=ee(),w=k?k.selectBoardColumn(_v,"ready"):[],G=k?k.selectBoardColumn(mv,"blocked"):[],X=k?k.selectBoardColumn(hv,"closed"):[],y=k?k.selectBoardColumn(gv,"in_progress"):[],Z=k?k.selectBoardColumn(bv,"resolved"):[],R=Co([...w,...G,...y,...Z,...X]),ke=new Map;for(let f of[...w,...G,...y])f&&f.id&&!ke.has(f.id)&&ke.set(f.id,f);let tt={...me(u?.()||"")};for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){let D=_[f];typeof D=="string"&&(tt[f]=D)}function et(f,D){let ce=ke.get(f);if(!ce)return null;let Ge=ce.metadata&&typeof ce.metadata=="object"?ce.metadata:{},Qe=ce.workflow?.route,Yt=Ge.route,It=jf(Qe)?Qe:jf(Yt)?Yt:null;return vn({pin:Ge,global:tt,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:It,controller_runtime:D})}function _t(f){let D=f.runner||null,ce=et(f.bead_id,D),Ge=Hs(f),Qe=ce?fr(ce,D):null;return Ge||Qe?{orchestration:Ge,worker:Qe}:null}let nt=new Map;function bt(f){if(nt.has(f))return nt.get(f)??null;let D=et(f,null),ce=null;if(D){let Ge=Fn(_.runner_catalog??null,D.orchestration_model.value??""),Qe=Ge===null?D:et(f,Ge),Yt=Rr(Qe,_.runner_catalog??null),It=fr(Qe,Ge);ce=Yt||It?{orchestration:Yt,worker:It}:null}return nt.set(f,ce),ce}function an(f){let D=Ro(R,f);return D.total===0?null:D}let br=_.bead_titles||{},on=new Map;for(let[f,D]of Object.entries(br))typeof D=="string"&&D.length>0&&on.set(f,D);for(let f of[...w,...G])on.set(f.id,f.title||f.id);let Mr=new Map;for(let f of[...w,...G,...y,...Z,...X])f&&f.id&&typeof f.from_id=="string"&&Mr.set(f.id,f.from_id);let An=new Map;for(let f of[...w,...G,...y,...Z,...X])f&&f.id&&typeof f.priority=="number"&&An.set(f.id,f.priority);let p=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},g=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},v=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},$=new Map;for(let[f,D]of Object.entries(g))Array.isArray(D)&&$.set(f,Al(D));for(let f of[...w,...G]){let D=f.labels;Array.isArray(D)&&!$.has(f.id)&&$.set(f.id,Al(D))}let B=new Map,z=o?.get()?.last_good?.result?.groups;for(let f of Array.isArray(z)?z:[]){if(f?.eligible!==!0||!Array.isArray(f.members))continue;let D=f.members.map(Ge=>{let Qe=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(Yt=>Yt.entries.some(It=>It.bead_id===Ge));return Qe?Qe.id:null});if(!(D.every(Ge=>Ge!==null)&&new Set(D).size===1))for(let Ge of f.members)B.set(Ge,f.members.filter(Qe=>Qe!==Ge))}let oe=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},ye=_.blocker_workspaces&&typeof _.blocker_workspaces=="object"&&!Array.isArray(_.blocker_workspaces)?_.blocker_workspaces:{},Ze=new Map;for(let[f,D]of Object.entries(p))D&&typeof D=="object"&&Ze.set(f,D);for(let f of[...w,...G])Ze.set(f.id,{created_at:f.created_at,updated_at:f.updated_at});let at=f=>Ze.get(f)||{},en=_.pr_wait||[],Rt=_.pr_observations||{},Yn=_.pr_activity||{},Ce=_.cleanup_failed||{},mt=Object.entries(Ce).map(([f,D])=>({bead_id:f,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),ln=_.queue||[],Pl=new Set([...ln.map(f=>f.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(f=>(Array.isArray(f?.entries)?f.entries:[]).map(D=>D.bead_id)),...en.map(f=>f.bead_id),..._.done.map(f=>f.bead_id)]),i_=new Set(G.map(f=>f.id)),l_=i?i.get()?.order||{}:{},Dl=new Set,Nl=[];for(let f of[...w,...G])Pl.has(f.id)||Dl.has(f.id)||Cv(f)||(Dl.add(f.id),Nl.push(f));Y=Tv(Nl,W,l_);let c_=_.admission||{},ql=f=>{let D=c_[f];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof D.reason=="string"?D.reason:"",Ge=ce.indexOf(":");return Ge>0&&Ge<ce.length-1?`\u26D4 ${ce.slice(0,Ge)} (${ce.slice(Ge+1)})`:`\u26D4 ${ce}`},Fl=new Map,u_=Y.map(f=>{let D=Is(f),ce=D.evidence==="published",Ge=f.workflow?.route==="quick_fix"||f.metadata&&f.metadata.route==="quick_fix",Qe=!Object.hasOwn(f,"description")||typeof f.description=="string"&&f.description.trim().length>0,Yt=Object.hasOwn(f,"labels")&&$f(f.labels),It=Yt||!Object.hasOwn(f,"labels")?"":xf(f.labels,f.metadata),qr=It.length>0,Mt=!Yt&&(Ge?Qe:ce&&!D.conflict),fo=i_.has(f.id),Zn=[];if(fo){let _o=Rv(f);_o.length>0?Fl.set(f.id,_o):Zn.push(Ov)}Ge&&!Qe?Zn.push("missing_description"):!Ge&&D.conflict?Zn.push("spec_id_conflict"):!Ge&&D.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Ge&&D.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Fr=ql(f.id);return Fr&&Zn.push(Fr),{id:f.id,title:f.title||f.id,reason:Zn.join(" \xB7 "),draggable:Mt,lane:"candidate",created_at:f.created_at,updated_at:f.updated_at,workflow:f.workflow,is_quick_fix:Ge,status:f.status,worker_ineligible:Yt,session_preferred:qr,session_preferred_reason:It,blocked:fo,has_spec:ce,exec_chips:bt(f.id),from_id:f.from_id||void 0,priority:An.get(f.id)}}),Ba=kv(u_,ie),Ua=Ba.visible,d_=_.revise_parked||{},so=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},p_=f=>{let D=v[f]?.chips?.pr;return D&&typeof D.number=="number"&&typeof D.url=="string"?{pr_number:D.number,pr_url:D.url}:{}},Wa=(f,D)=>f.map((ce,Ge)=>{let Qe=D!=="done",Yt=D!=="done"&&D!=="queue",It=Qe?d_[ce.bead_id]:null,qr=Qe?jn(so,ce.bead_id):null,Mt=qr?.operation?qr:null,fo=Qe&&$.get(ce.bead_id)===!0,Zn=_.admission&&typeof _.admission=="object"?_.admission[ce.bead_id]:null,Fr=Qe?Kd(Zn,!!Mt||Fe.has(ce.bead_id)):null,_o=Qe&&!Fr?ql(ce.bead_id):null,A_=Qe?[_o]:[],mc=[],Ja=Qe?B.get(ce.bead_id):void 0;return Ja&&Ja.length>0&&mc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ja.join(", ")}\uC640`),{id:ce.bead_id,title:on.get(ce.bead_id)||ce.bead_id,reason:A_.filter(Boolean).join(" \xB7 "),draggable:Qe&&!Mt&&!Fr,done:D==="done",lane:D,seq:Yt?Ge+1:void 0,worker_serial:fo,discard:Mt,stale_work:Fr,badges:[...mc,...It?["\u23F8 REVISE \uD30C\uD0B9"]:[],...D==="done"?ba(_.attempts||{},ce.bead_id):[]],alert:!!It,revise_action:!!It,revise_enabled:!!It&&!Mt&&!Ee.has(ce.bead_id),revise_title:It?It.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${It.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Rn(_.attempts||{},ce.bead_id):null,work_ms:D==="done"?ha(_.attempts||{},ce.bead_id):null,done_at:D==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,exec_chips:Qe?bt(ce.bead_id):null,workflow:Qe&&v[ce.bead_id]||null,...D==="done"?p_(ce.bead_id):{},from_id:Mr.get(ce.bead_id)||void 0,priority:An.get(ce.bead_id),...at(ce.bead_id)}}),Pr=_.attempts?Object.values(_.attempts).filter(Or):[],za=new Set;for(let f of Pr)f&&typeof f.resumed_from=="string"&&f.resumed_from.length>0&&za.add(f.resumed_from);let jl=new Map;for(let f of Pr)jl.set(f.bead_id,f.attempt_id);let ls=new Map;for(let f of Pr)ls.set(f.attempt_id,f);function Ha(f){let D=new Set,ce=f;for(;ce&&!D.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;D.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&ls.get(ce.resumed_from)||null}return!1}let oo=typeof _.declared_base=="string"?_.declared_base:null;function f_(f){let D=null;for(let ce of Pr)!ce||ce.bead_id!==f||Ha(ce)||(D===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ce);return D&&typeof D.target_base=="string"?D.target_base:null}let Ga=[],ao=[],__=kf(_),Bl=f=>{let D=typeof f.session_id=="string"&&f.session_id.length>0,ce=za.has(f.attempt_id);return{eligible:D&&!ce,reason:D?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ln=null;for(let f of Pr){let D=f.status==="paused"&&!za.has(f.attempt_id);if(f.status==="running"||D)ao.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:on.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,paused:D,conflict_resolution:Ha(f),base_exception:Cl(oo,f.target_base),can_pause:typeof f.session_id=="string"&&f.session_id.length>0,discard:jn(so,f.bead_id,{attempt_id:f.attempt_id}),workflow:v[f.bead_id]||null,priority:An.get(f.bead_id),usage:Rn(_.attempts||{},f.bead_id),rollup:an(f.bead_id),rollup_expanded:we.has(f.bead_id),exec_chips:_t(f),...at(f.bead_id)});else if((f.status==="failed"||f.status==="orphaned")&&__(f)){let ce=Bl(f);Ga.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:on.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,failed:!0,status:f.status,status_label:f.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jn(so,f.bead_id,{attempt_id:f.attempt_id}),resume_eligible:ce.eligible,resume_reason:ce.reason,conflict_resolution:Ha(f),base_exception:Cl(oo,f.target_base),workflow:v[f.bead_id]||null,priority:An.get(f.bead_id),usage:Rn(_.attempts||{},f.bead_id),rollup:an(f.bead_id),rollup_expanded:we.has(f.bead_id),exec_chips:_t(f),...at(f.bead_id)}),Ln=f}}let Ul=new Set([...Ga,...ao].map(f=>f.bead_id)),Wl=new Map;for(let f of Array.isArray(_.session_active)?_.session_active:[]){let D=f&&f.bead_id;if(!(typeof D!="string"||D.length===0||Ul.has(D))){if(Ul.add(D),Array.isArray(f.blocked_by)){let ce=f.blocked_by.filter(Ge=>typeof Ge=="string"&&Ge.length>0);ce.length>0&&Wl.set(D,ce)}ao.push({bead_id:D,attempt_id:null,kind:"session",title:f.title||on.get(D)||D,status:"in_progress",started_at:Mn(f.started_at)??Mn(f.updated_at),updated_at:Mn(f.updated_at),workflow:f.workflow||null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],priority:An.get(D),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Ga,...ao].map(f=>{let D=ls.get(f.attempt_id),ce=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!ce||typeof ce!="object")return f;let Ge=typeof ce.reason=="string"&&ce.reason.length>0?ce.reason:null,Qe=eo({bead_id:D.bead_id,merge_sha:ce.head_sha,cleanup_cursor:ce.cursor,cleanup_failed:Ge?{step:ce.cursor,reason:Ge}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return Qe?{...f,landing:Qe}:f}),zl=null;if(Ln){let f=Bl(Ln),D=Ln.cause_detail;zl={bead_id:Ln.bead_id,repo:Ln.repo||"",reason:Ln.cause||Ln.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Ln.attempt_id,resume_eligible:f.eligible,resume_reason:f.reason,discard:jn(so,Ln.bead_id,{attempt_id:Ln.attempt_id})}}let Hl=new Set(Dr.map(f=>f.bead_id)),Ka=Array.isArray(_.merge_queue)?_.merge_queue:[],Gl=new Map,Kl=new Map,Vl=new Map,Yl=new Map,Zl=new Map;Ka.forEach((f,D)=>{f&&typeof f.bead_id=="string"&&(Gl.set(f.bead_id,D+1),Kl.set(f.bead_id,f.resolution),Vl.set(f.bead_id,f.continuation_action||null),Yl.set(f.bead_id,f.head_review||null),Zl.set(f.bead_id,f.authority||null))});let Nr=_.merge_queue_state||{active:null,failures:{}},m_=Nr.failures||{},Ql=Nr.waiting&&typeof Nr.waiting.bead_id=="string"&&typeof Nr.waiting.reason=="string"?Nr.waiting:null,g_=_.auto_merge_skips||{},Xl=f=>{let D=g_[f];if(!D)return null;let ce=Rt[f],Ge=ce&&ce.pr?ce.pr.head_sha:null;return Ge&&Ge===D.head_sha?D.reason||"":null},io=new Map;for(let f of Dr)f.failed!==!0&&f.conflict_resolution&&(f.paused?io.has(f.bead_id)||io.set(f.bead_id,"paused"):io.set(f.bead_id,"running"));let Jl=Dr.filter(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0).length,ec=(_.workspace_info||{}).slots,tc=typeof ec=="number"?ec:typeof _.slots=="number"?_.slots:ja,b_=Jl>tc,lo=$r(C),h_=(Array.isArray(_.done)?_.done.slice():[]).filter(f=>lo===void 0||typeof f.added_at!="number"||f.added_at>=lo).sort((f,D)=>(D.added_at||0)-(f.added_at||0)),cs=Wa(h_,"done"),y_=new Set((Array.isArray(_.done)?_.done:[]).map(f=>f?.bead_id).filter(f=>typeof f=="string")),nc=[],v_=u?.()||"";for(let f of X){let D=Mn(f.closed_at);if(typeof f.id!="string"||y_.has(f.id)||D===null||lo!==void 0&&D<lo||typeof f.comment_count!="number"||f.comment_count<=0)continue;let ce=`${v_}\0${f.id}\0${String(f.updated_at)}\0${f.comment_count}`,Ge=M.get(ce);if(Ge===void 0&&n&&(M.set(ce,"pending"),Promise.resolve(n("get-comments",{id:f.id})).then(Qe=>{let Yt=Array.isArray(Qe)&&Qe.some(It=>ta(typeof It?.text=="string"?It.text:"")?.lane==="session");M.set(ce,Yt?"session":"not-session"),Re()}).catch(()=>{M.set(ce,"failed"),Re()})),Ge==="session"){let Qe=Mn(f.started_at);nc.push({id:f.id,title:f.title||f.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Qe!==null&&D>=Qe?D-Qe:null,work_kind:"session",done_at:D,created_at:f.created_at,updated_at:f.updated_at})}}cs.push(...nc),cs.sort((f,D)=>(D.done_at||0)-(f.done_at||0));let co={};for(let f of Hn)co[f]=0;let rc=!1,sc=0,Va=0,oc=0;for(let f of cs){let D=f.usage;if(D&&typeof D=="object"){let ce=!1;for(let Ge of Hn)Number.isFinite(D[Ge])&&(co[Ge]+=D[Ge],rc=!0,ce=!0);ce&&(Va+=1,Number.isFinite(D.total_cost_usd)&&(sc+=D.total_cost_usd,oc+=1))}}Va>0&&oc===Va&&(co.total_cost_usd=sc);let ac=cs.map(f=>f.usage).filter(f=>f&&typeof f=="object"&&f.providers),w_=ac.length>0?un(Bo(ac)):rc?er(co):null,ic=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},lc=Array.isArray(_.serial_lanes)?_.serial_lanes:[],cc=f=>{if(en.some(Ge=>Ge.bead_id===f))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Pr.filter(Ge=>Ge&&Ge.bead_id===f),ce=D.length>0?D[D.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},uo=lc.filter(f=>f&&typeof f.id=="string"&&Array.isArray(f.entries)).map((f,D)=>{let ce=ic[f.id]||{},Ge=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(Mt=>Mt&&typeof Mt.bead_id=="string"&&typeof Mt.after=="string").map(Mt=>[Mt.bead_id,Mt.after])),Qe=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(Mt=>typeof Mt=="string"):[],Yt=new Set(Qe),It=Wa(f.entries.filter(Mt=>!Hl.has(Mt.bead_id)&&!Yt.has(Mt.bead_id)),f.id).map(Mt=>Ge.has(Mt.id)?{...Mt,badges:[`\u{1F517} ${Ge.get(Mt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Mt.badges]}:Mt),qr=Qe.map(Mt=>({id:Mt,title:on.get(Mt)||Mt,draggable:!1,lane:f.id,ghost:!0,badges:[cc(Mt)]}));return{id:f.id,index:D+1,rows:[...qr,...It],occupied:Qe.length>0,badge:Qe.length>0?cc(Qe[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),uc=typeof _.serial_lane_count=="number"?_.serial_lane_count:uo.length,Ya=Wa(ln.filter(f=>!Hl.has(f.bead_id)),"queue"),dc=new Map,pc=new Set;for(let[f,D]of Object.entries(ic)){if(!/^s[1-5]$/.test(f))continue;let ce=D&&Array.isArray(D.occupied_by)?D.occupied_by:[];for(let Ge of ce)typeof Ge=="string"&&dc.set(Ge,f);ce.length>0&&pc.add(f)}let ar=[];for(let f of Dr)typeof f.bead_id=="string"&&ar.push({id:f.bead_id,title:on.get(f.bead_id)||f.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:dc.get(f.bead_id)??null});for(let f of en){let D=f&&f.bead_id;typeof D!="string"||D.length===0||ar.push({id:D,title:on.get(D)||D,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let f of uo)for(let D of f.rows)D.ghost!==!0&&ar.push({id:D.id,title:D.title,location_label:`${f.id} #${D.seq??""}`.trim(),kind:"serial",lane_id:f.id});Ya.forEach((f,D)=>{ar.push({id:f.id,title:f.title,location_label:`#${D+1}`,kind:"parallel",lane_id:null})});for(let f of Ua)ar.push({id:f.id,title:f.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let fc={};for(let f of lc)f&&typeof f.id=="string"&&Array.isArray(f.entries)&&(fc[f.id]=f.entries.length);let Za=new Map;for(let f of ar)Za.has(f.id)||Za.set(f.id,f);F={members_by_id:Za,serial_raw_lengths:fc,serial_lane_count:uc,occupied_lanes:pc};let k_=Qd(_.bead_scope,ar),po=new Map;for(let[f,D]of Wl)po.set(f,D);for(let[f,D]of Fl)po.set(f,D);for(let[f,D]of Object.entries(oe))Array.isArray(D)&&po.set(f,D.filter(ce=>typeof ce=="string"&&ce.length>0));let $_=Ip(po,ar,ye),Qa=(f,D=null)=>{let ce=k_.get(f),Ge=$_.get(f)||null,Qe=ce&&ce.overlaps.length>0?ce.overlaps:null,Yt=!!ce&&ce.scope_missing;if(!Ge&&!Qe&&!Yt)return D;let It=Qe?P(f,Qe):null;return{...D||{},...Ge?{predecessors:Ge}:{},...Qe?{overlaps:Qe}:{},...Yt?{scope_missing:!0}:{},...It?{popover:It}:{}}},Xa=f=>{let D=Qa(f.id,f.dependency_chips||null);return D&&(f.dependency_chips=D),f};for(let f of Ya)Xa(f);for(let f of uo)for(let D of f.rows)D.ghost!==!0&&Xa(D);for(let f of Ua)Xa(f);let _c=new Map;for(let f of Dr){let D=typeof f.bead_id=="string"?f.bead_id:"";if(D.length===0)continue;let ce=f.kind==="session",Ge=Qa(D),Qe=typeof f.attempt_id=="string"&&f.attempt_id.length>0?ls.get(f.attempt_id):void 0,Yt=Qe&&Qe.last_activity&&typeof Qe.last_activity=="object"?Qe.last_activity:null,It=Qe&&Array.isArray(Qe.legs)?Qe.legs:[];!Ge&&!Yt&&It.length===0&&!ce||_c.set(D,{...Yt?{last_activity:Yt}:{},...It.length>0?{legs:It}:{},...Ge?{dependency_chips:Ge}:{}})}let x_=en.map(f=>Wv(f.bead_id,on.get(f.bead_id)||f.bead_id,Rt,Ce[f.bead_id]||null,Rn(_.attempts||{},f.bead_id),Yn[f.bead_id]||(le.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:_e.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),io.get(f.bead_id)||null,f.external===!0,{position:Gl.get(f.bead_id)||0,active:Nr.active===f.bead_id,failure:m_[f.bead_id]||null,waiting:Ql?.bead_id===f.bead_id?Ql.reason:null,resolution:Kl.get(f.bead_id),continuation_action:Vl.get(f.bead_id),head_review:Yl.get(f.bead_id)||null,authority:Zl.get(f.bead_id)||null},f.wt_present!==!1,_.auto_merge===!0?Xl(f.bead_id):null,Cl(oo,f_(f.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[f.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ls.get(jl.get(f.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]},Qa(f.bead_id))).map(f=>({...f,workflow:v[f.id]||null,priority:An.get(f.id),...at(f.id)}));return{queue:_,idToTitle:on,candidates:Ua,candidate_hidden:{blocked:Ba.hidden_blocked,spec:Ba.hidden_spec},running:Dr,live_count:Jl,slots:tc,over_cap:b_,failure:zl,waiting:Ya,serial_lanes:uo,serial_lane_count:uc,running_overlays:_c,pr_wait:x_,merge_queue_length:Ka.length,merge_queue_running:Ka.length>0,auto_excluded:en.map(f=>f.bead_id).filter(f=>Xl(f)!==null),declared_base:oo,done:cs,token_total:w_,cleanup_failures:mt,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Je(){let w=!!o?.get()?.job,G=!w&&o?.isPending?.()===!0,X=w?"\uBD84\uC11D \uC911":G?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${X?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${X?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${X?c`<span class="worker-analysis-btn__badge">${X}</span>`:""}
    </button>`}function At(_){let w=_.waiting.length>0?_.waiting[0].id:"\u2014",G=c`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,X=Tt(_),y=_.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Z=_.queue.auto_advance?0:(Array.isArray(_.queue.queue)?_.queue.queue:[]).filter(bt=>bt&&typeof bt.armed_by_lane=="string"&&bt.armed_by_lane.length>0).length,R=Z>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Z}건 진행 중</span
          >`:"",ke=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${re()} 완료 <b>${_.done.length}</b></span
      >`,tt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,et=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ja}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:qf},(bt,an)=>an+1).map(bt=>c`<option
                value=${String(bt)}
                ?selected=${_.serial_lane_count===bt}
              >
                ${bt}
              </option>`)}
        </select>
      </label>
      ${o?Je():""} `,_t=rp({failure:_.failure}),nt=Gd(_.repo_operations,_.cleanup_failures);return xe?c`<div class="worker-ribbon">
          ${G} ${X}
          <div class="worker-kpi worker-kpi--ribbon">
            ${y}${R}${ke}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${et}</div>
          <div class="worker-kpi">${tt}</div>
        </div>
        ${nt}${ht.template()}${_t}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${G}${X}${et}</div>
        <div class="worker-kpi">
          ${y}${R}${ke}${tt}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${re()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(bt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${bt.tooltip}
                >${re()} 완료 · 누적 ${bt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${nt}${ht.template()}${_t}`}function kt(_){let w=_.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${ie.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${$v.map(G=>c`<button
              type="button"
              class="worker-filter__chip${ie.spec===G.value?" is-active":""}"
              data-spec=${G.value}
              aria-pressed=${ie.spec===G.value?"true":"false"}
            >
              ${G.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Lt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${W}
    >
      ${Gf.map(_=>c`<option value=${_.value} ?selected=${W===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function Ut(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${Br.map(_=>c`<option value=${_.value} ?selected=${C===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Tt(_){let w=_.queue.auto_merge===!0;if(_.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let G=new Set(_.auto_excluded),X=_.pr_wait.filter(y=>y.merge_action&&y.merge_enabled&&!G.has(y.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function bn(_){return Aa({parallel:{rows:_.waiting.map(w=>Bn(w)),count:_.waiting.length,collapsed:ge.isAreaCollapsed("parallel")},serial:{lanes:_.serial_lanes.map(w=>({id:w.id,title:`\uC9C1\uB82C ${w.index}`,rows:w.rows.map(G=>Bn(G)),count:w.rows.length,empty:w.rows.length===0,badge:w.badge,held:w.occupied,cycle:w.cycle})),collapsed:ge.isAreaCollapsed("serial")}})}function Wt(_){return sp(_.running,Date.now(),ae,_.running_overlays)}function Qt(_){return _.running.some(w=>w.kind!=="session"&&!w.paused&&w.failed!==!0)}function rn(_){let w=Kn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Lt(),controls:kt(_),collapsible:!0,collapsed:ge.isCollapsed("candidate"),place_menu:lt(_.candidates),onOpenDoc:m?(X,y)=>m(y):void 0}),G=Kn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${re()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ut(),collapsible:!0,collapsed:ge.isCollapsed("done"),preview:xe?Array.isArray(_.token_total)?_.token_total.map(X=>X.label).join(" \xB7 "):_.token_total||Bf(_.done):void 0});return xe?c`<div class="worker-lanes worker-lanes--mobile">
        ${Sa({live:Qt(_),running_body:_.running.length>0?Wt(_):"",pr_wait_rows:_.pr_wait.map(X=>Bn(X)),count:_.running.length+_.pr_wait.length})}
        ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_.waiting,count:_.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),preview:Bf(_.waiting),body:bn(_)})}
        ${w} ${G}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_.waiting,count:_.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),body:bn(_)})}
      ${Kn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:_.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${_.slots}</span
        >`,live:Qt(_),collapsible:!0,collapsed:ge.isCollapsed("running"),body:Wt(_)})}
      ${Kn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:ge.isCollapsed("pr_wait")})}
      ${G}
    </div>`}function sn(_){ge.toggle(_),Re()}function pn(_){ge.toggleArea(_),Re()}function Re(){let _=de();ot(At(_),je),ot(rn(_),L)}function Ie(){let _=!0,w=_a(G=>{if(xe=G,_){_=!1;return}Re()});q.push(w)}let O=null;function be(_){O=_.target instanceof Element?_.target:null}function Pe(_){let G=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!G)return;if(O&&G.contains(O)&&O.closest("input, button, a")){_.preventDefault();return}let X=G.dataset.beadId||"",y=G.dataset.lane||"";K={bead_id:X,from_lane:y},pe.classList.add("is-dragging");try{_.dataTransfer?.setData("text/plain",X),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function yt(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;let G=w.dataset.lane||"";G!=="candidate"&&G!=="queue"&&!/^s[1-5]$/.test(G)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Nt(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ct(){pe.classList.remove("is-dragging")}function Zt(_,w){let G=Y.find(R=>R.id===_);if(!G)return;let X=Y.filter(R=>R.id!==_),y=X.length;if(w){let R=w.dataset.beadId;if(R===_)return;let ke=X.findIndex(tt=>tt.id===R);ke>=0&&(y=ke)}let Z=X.slice();Z.splice(y,0,G),j.applyReorder(_,Z,y)}function qt(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;_.preventDefault(),w.classList.remove("worker-pane--drag-over"),pe.classList.remove("is-dragging");let G=w.dataset.lane||"",X=K?.bead_id||_.dataTransfer?.getData("text/plain")||"",y=K?.from_lane||"";if(K=null,!X)return;let Z=_.target?.closest?.(".worker-mini, .worker-card"),R=G==="queue"&&w.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||w,ke=Array.from(R.querySelectorAll(".worker-mini, .worker-card")),tt=ke.length;if(Z){let et=ke.indexOf(Z);et>=0&&(tt=et)}if(tt=Math.max(0,tt-R.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(tt=ze()),G==="candidate"){if(y==="candidate"){Zt(X,Z);return}(y==="queue"||/^s[1-5]$/.test(y))&&ft(X);return}if(G==="queue"||/^s[1-5]$/.test(G)){let et=G==="queue"?"parallel":G;y===G?dt(X,et,tt):ct(X,et)}}function tn(_){ie=_,wv(_),Re()}function kn(_){W=Kf(_),Av(W),Re()}function Ft(_){C=Wn(_),Ev(C),b?.(C),Re()}function $n(_){let w=_.target?.closest?.(".worker-serial-lane-count");if(w){let ke=Number.parseInt(w.value,10);Number.isFinite(ke)&&Se(ke).then(Re);return}let G=_.target?.closest?.(".worker-filter__blocked");if(G){tn({...ie,show_blocked:G.checked});return}let X=_.target?.closest?.(".worker-done-range");if(X){Ft(X.value);return}let y=_.target?.closest?.(".worker-sort");if(y){kn(y.value||Rl);return}let Z=_.target?.closest?.(".worker-slots__input");if(!Z)return;let R=Number.parseInt(Z.value,10);if(!Number.isFinite(R)){Re();return}fe(R).then(Re)}function xn(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Vn(){let _=de();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:u&&u()||""}}function T(){ae&&qe.close(),ut.hidden=!1,pt.hidden=!1,Ye.open(Vn()),Re()}function I(_){let w=ee(),G=w.attempts?w.attempts[_]:null;ae=_,Oe=null,Ye.close(),ut.hidden=!0,pt.hidden=!1,qe.open({attempt_id:_,meta:xn(G)}),Re()}function Ue(_){let w=ee(),G=(Array.isArray(w.session_active)?w.session_active:[]).find(y=>y&&y.bead_id===_),X=(G&&Array.isArray(G.session_refs)?G.session_refs:[]).find(y=>y&&y.current===!0);X&&(Ye.close(),ut.hidden=!0,pt.hidden=!1,qe.open(Zr(X,_,"in_progress")),Re())}function Ke(_,w){ae=null,Oe=_,Ye.close(),ut.hidden=!0,pt.hidden=!1,qe.open({attempt_id:_,meta:w,hide_prompt:!0}),Re()}function st(){if(Ye.isOpen()&&Ye.refresh(Vn()),Oe){let G=(o?.get()?.runs||[]).find(X=>X.run_id===Oe);G?qe.updateMeta(El(G)):qe.close();return}if(!ae)return;let _=ee(),w=_.attempts?_.attempts[ae]:null;if(w){qe.updateMeta(xn(w));return}qe.close()}function vt(_,w){if(_.length===0||!l)return;let G=u?u():void 0;if(w.length===0||!G||w===G||!d){l(_);return}Promise.resolve(d(w)).then(()=>{l(_)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Xt(_){let w=_.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let G=w?.closest?.(".worker-dep__open");if(G){vt(G.getAttribute("data-dep-id")||"",G.getAttribute("data-root-dir")||"");return}let X=w?.closest?.(".mon-overlap__chip");if(X){let Ce=X.closest("[data-bead-id]"),mt=Ce&&Ce.getAttribute("data-bead-id")||"";if(mt){let ln=X.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===mt&&U.counterpart_id===ln?null:{bead_id:mt,counterpart_id:ln},Re()}return}let y=w?.closest?.(".mon-overlap__place");if(y){let Ce=y.closest("[data-bead-id]"),mt=Ce&&Ce.getAttribute("data-bead-id")||"";mt&&$e(mt,y.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){se?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){T();return}let Z=w?.closest?.(".worker-repo-op__session");if(Z){let Ce=Z.dataset.attemptId;Ce&&I(Ce);return}let R=w?.closest?.(".worker-repo-op__resolve");if(R){S(R.dataset.operationId||"");return}let ke=w?.closest?.(".worker-repo-op__dismiss");if(ke){te(ke.dataset.operationId||"");return}let tt=w?.closest?.(".worker-cleanup__resume");if(tt){let Ce=tt.dataset.beadId;Ce&&Xe(Ce);return}let et=w?.closest?.(".worker-banner__resume");if(et){let Ce=et.dataset.attemptId;Ce&&Vt(Ce);return}let _t=w?.closest?.(".worker-banner__discard");if(_t){let Ce=_t.dataset.confirmation==="merged"?"merged":"unmerged";E(_t.dataset.beadId||"",_t.dataset.attemptId||null,Ce,_t.dataset.operationId||null);return}let nt=w?.closest?.(".worker-banner__dismiss");if(nt){let Ce=nt.dataset.attemptId;Ce&&Ht(Ce);return}if(w?.closest?.(".worker-play")){x(!ee().auto_advance);return}let bt=w?.closest?.(".worker-merge-all");if(bt){bt.classList.contains("worker-merge-all--stop")?ee().auto_merge===!0?N(!1):he():N(!0);return}let an=w?.closest?.(".worker-pane__toggle[data-lane]");if(an){let Ce=an.dataset.lane;(Ce==="candidate"||Ce==="queue"||Ce==="running"||Ce==="pr_wait"||Ce==="done")&&sn(Ce);return}let br=w?.closest?.(".worker-wait__area-toggle[data-area]");if(br){let Ce=br.dataset.area;(Ce==="parallel"||Ce==="serial")&&pn(Ce);return}let on=w?.closest?.(".worker-card__place-lane");if(on){let Ce=on.dataset.beadId,mt=on.dataset.lane;Ce&&(mt==="parallel"||/^s[1-5]$/.test(mt||""))&&(Q=null,Re(),ct(Ce,mt));return}if(w?.closest?.(".worker-card__place-cancel")){Q=null,Re();return}let An=w?.closest?.(".worker-card__place");if(An){let Ce=An.dataset.beadId;Ce&&!An.disabled&&(Be()?(Q=Ce,Re()):ct(Ce,"parallel"));return}let p=w?.closest?.(".worker-filter__chip");if(p){let Ce=p.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&tn({...ie,spec:Ce});return}let g=w?.closest?.(".worker-mini__merge");if(g){let Ce=g.dataset.beadId||"";ee().cleanup_failed?.[Ce]?Xe(Ce):Et(Ce);return}let v=w?.closest?.(".worker-mini__merge-cancel");if(v){ne(v.dataset.beadId||"");return}let $=w?.closest?.(".worker-mini__discard");if($){E($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let B=w?.closest?.(".worker-mini__stale-continue");if(B){H("worker-stale-work-continue",B.dataset.beadId||"",B.dataset.actionId||"");return}let z=w?.closest?.(".worker-mini__stale-backup");if(z){H("worker-stale-work-backup-fresh",z.dataset.beadId||"",z.dataset.actionId||"");return}let oe=w?.closest?.(".worker-mini__stale-recheck");if(oe){H("worker-stale-work-recheck",oe.dataset.beadId||"",oe.dataset.actionId||"");return}let ye=w?.closest?.(".worker-mini__revise-fix");if(ye){Le("worker-revise-fix",ye.dataset.beadId||"");return}let Ze=w?.closest?.(".worker-mini__revise-approve");if(Ze){Le("worker-revise-approve",Ze.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Ce=w?.closest?.(".rtile"),mt=Ce?.dataset?.beadId,ln=Ce?.dataset?.attemptId;mt&&E(mt,ln||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let mt=w?.closest?.(".rtile")?.dataset?.attemptId;mt&&Ht(mt);return}if(w?.closest?.(".rtile__pause")){let mt=w?.closest?.(".rtile")?.dataset?.attemptId;mt&&Dt(mt);return}if(w?.closest?.(".rtile__resume")){let mt=w?.closest?.(".rtile")?.dataset?.attemptId;mt&&Vt(mt);return}if(w?.closest?.(".rtile__session")){let Ce=w?.closest?.(".rtile"),mt=Ce?.dataset?.attemptId;if(mt){I(mt);return}let ln=Ce?.dataset?.beadId;ln&&Ue(ln);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ye.close(),qe.close();return}if(w?.closest?.(".worker-drawer-host"))return;let at=w?.closest?.(".rtile .board-card__roll-toggle");if(at){let Ce=at.dataset.rollParent;Ce&&(we.has(Ce)?we.delete(Ce):we.add(Ce),Re());return}let en=w?.closest?.(".rtile .board-card__roll-child");if(en){let Ce=en.dataset.childId;Ce&&l&&l(Ce);return}let Rt=w?.closest?.(".rtile");if(Rt){if(w?.closest?.(".rtile__id")){let mt=Rt.dataset.beadId;mt&&Sn(mt).then(ln=>{ln?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=Rt.dataset.beadId;Ce&&l&&l(Ce);return}let Yn=w?.closest?.(".worker-mini, .worker-card");if(Yn){let Ce=Yn.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&Sn(Ce).then(ln=>{ln?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let mt=w?.closest?.(".ctl-chip--from");if(mt){let ln=mt.dataset.fromId;ln&&l&&l(ln);return}Ce&&l&&l(Ce)}}e.addEventListener("pointerdown",be),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",yt),e.addEventListener("dragleave",Nt),e.addEventListener("dragend",Ct),e.addEventListener("drop",qt),e.addEventListener("click",Xt),e.addEventListener("change",$n);function gr(_){if(!U)return;let w=_.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(U=null,Re())}function Ir(_){_.key!=="Escape"||!U||(U=null,Re())}return document.addEventListener("click",gr),document.addEventListener("keydown",Ir),q.push(()=>{document.removeEventListener("click",gr),document.removeEventListener("keydown",Ir)}),Ie(),k&&q.push(k.subscribe(()=>{for(let[_,w]of M)w==="failed"&&M.delete(_);Re()})),s&&q.push(s.subscribe(()=>{let _=u&&u()||"";_!==gt&&(gt=_,rt.close()),Re(),st()})),o&&typeof o.subscribe=="function"&&q.push(o.subscribe(()=>{st(),Re()})),Re(),{load(){Ae(),Re()},refreshSessionDefaults:We,destroy(){for(let _ of q.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",be),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",yt),e.removeEventListener("dragleave",Nt),e.removeEventListener("dragend",Ct),e.removeEventListener("drop",qt),e.removeEventListener("click",Xt),e.removeEventListener("change",$n);try{qe.destroy()}catch{}pt.hidden=!0;try{se?.destroy()}catch{}try{rt.destroy()}catch{}ot(c``,e)}}}function Ll(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Yf(e,t,n,r=async()=>{},s=async()=>{}){let o=zt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(W){let M=W.target.value,ge=t.getState().workspace?.current?.path||"";if(M&&M!==ge){o("switching workspace to %s",M),i=!0,F();try{await n(M)}catch(xe){o("workspace switch failed: %o",xe)}finally{i=!1,F()}}}async function m(){let W=t.getState(),C=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!C||l)){o("git-pulling workspace %s",C),l=!0,F();try{await r(C)}catch(M){o("workspace git pull failed: %o",M)}finally{l=!1,F()}}}function h(W){let C=W.target;C&&e.contains(C)||j()}function b(W){W.key==="Escape"&&j()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),F())}function j(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),F())}function K(){u?j():k()}async function Y(W){let C=W.target,M=C.value,re=C.checked;o("toggling visibility %s \u2192 %s",M,String(re));try{await s(M,re)}catch(ge){o("workspace visibility toggle failed: %o",ge)}}function ie(W){return W?c`
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
    `:c``}function Q(W,C){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${K}
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
                        .checked=${!C.has(M.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ll(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let W=t.getState(),C=W.workspace?.current,M=W.workspace?.available||[],re=new Set(W.workspace?.hidden||[]),ge=C?.path||M[0]?.path||"";if(M.length===0)return c``;let xe=M.filter(le=>!re.has(le.path)||le.path===ge);if(xe.length<=1){let le=xe[0]||M[0],_e=Ll(le.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${le.path}"
            >${_e}</span
          >
          ${Q(M,re)}
          ${ie(ge)}
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
          ${xe.map(le=>c`
              <option
                value="${le.path}"
                ?selected=${le.path===ge}
                title="${le.path}"
              >
                ${Ll(le.path)}
              </option>
            `)}
        </select>
        ${Q(M,re)}
        ${ie(ge)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function F(){ot(U(),e)}return F(),a=t.subscribe(()=>F()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),ot(c``,e)}}}var Zf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Il(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Qf(e,t,n=Il()){return{id:n,type:e,payload:t}}function Xf(e={}){let t=zt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],m=new Map,h=new Set;function b(U){for(let F of Array.from(h))try{F(U)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let U=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),F=(n.jitterRatio||0)*U,W=Math.max(0,Math.round(U+(Math.random()*2-1)*F));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,Q()},W)}function j(U){try{s?.send(JSON.stringify(U))}catch(F){t("ws send failed",F)}}function K(){for(o="open",t("ws open"),b(o),a=0;d.length;){let U=d.shift();U&&j(U)}}function Y(U){let F;try{F=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!F||typeof F.id!="string"||typeof F.type!="string"){t("ws received invalid envelope");return}if(u.has(F.id)){let C=u.get(F.id);u.delete(F.id),F.ok?C?.resolve(F.payload):C?.reject(F.error||new Error("ws error"));return}let W=m.get(F.type);if(W&&W.size>0)for(let C of Array.from(W))try{C(F.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",F.type)}function ie(){o="closed",t("ws closed"),b(o);for(let[U,F]of u.entries())F.reject(new Error("ws disconnected")),u.delete(U);a+=1,k()}function Q(){if(!l)return;let U=r();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",b(o),s.addEventListener("open",K),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ie)}catch(F){t("ws connect failed %o",F),k()}}return Q(),{send(U,F){if(!Zf.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let W=Il(),C=Qf(U,F,W);return t("send %s id=%s",U,W),new Promise((M,re)=>{u.set(W,{resolve:M,reject:re,type:U}),s&&s.readyState===s.OPEN?j(C):(t("queue %s id=%s (state=%s)",U,W,o),d.push(C))})},on(U,F){m.has(U)||m.set(U,new Set);let W=m.get(U);return W?.add(F),()=>{W?.delete(F)}},onConnection(U){return h.add(U),()=>{h.delete(U)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Q()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function zv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Hv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ml=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Jf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],_r="tab:worker:closed",Gv="bdui.worker.done-range",e_=ef,t_="worker:queue",n_="worker:parallel-analysis",r_="ui:order",s_="ui:display-policy",o_="exec:presets",mr="tab:board:closed",a_="beads-ui.board.closed-range";function Kv(e){let t=zt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&wf(a),i&&l&&u&&d){let q=function(T,I){let Ue="Request failed",Ke="";if(T&&typeof T=="object"){let vt=T;if(typeof vt.message=="string"&&vt.message.length>0&&(Ue=vt.message),typeof vt.details=="string")Ke=vt.details;else if(vt.details&&typeof vt.details=="object")try{Ke=JSON.stringify(vt.details,null,2)}catch{Ke=""}}else typeof T=="string"&&T.length>0&&(Ue=T);let st=I&&I.length>0?`Failed to load ${I}`:"Request failed";V.open(st,Ue,Ke)},Be=function(T){return`${Re.getState().workspace.current?.path||""}\0${T}`},lt=function(){Oe&&(Oe().catch(()=>{}),Oe=null),qe=null,Ye=null},ve=function(T){rt=T;let I=()=>{rt!==T||Re.getState().selected_id!==T||(rt=null,He(T))};if(!se){ht.then(I);return}I()},ft=function(T,I,Ue,Ke,st){return Ue!==dt[I]?(st().catch(()=>{}),!1):(T.set(Ke,st),!0)},Vt=function(){let T=Re.getState();De(T.view==="board"),Le(T.view==="worker"),Se(T.view==="monitor"),S(T.view==="board"||T.view==="worker"||Dt||!!T.selected_id)},Et=function(){let T=$r(Ht);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},Xe=function(){let T=$r(xt);return T===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:T}}},De=function(T){if(T)for(let[I,Ue]of Ml){if(ze.has(I)||ct.has(I))continue;let Ke=I===mr?Et():{type:Ue};try{pe.register(I,Ke)}catch(Xt){t("register %s store failed: %o",I,Xt)}ct.add(I);let st=dt.board,vt=!1;We.subscribeList(I,Ke).then(Xt=>{vt=!ft(ze,"board",st,I,Xt)}).catch(Xt=>{t("subscribe %s failed: %o",I,Xt),q(Xt,"board")}).finally(()=>{ct.delete(I),vt&&Vt()})}else he()},he=function(){dt.board+=1;for(let[T]of Ml){let I=ze.get(T);I&&(I().catch(()=>{}),ze.delete(T));try{pe.unregister(T)}catch(Ue){t("unregister %s failed: %o",T,Ue)}}},Le=function(T){if(!T){x();return}for(let[I,Ue]of Jf){if(E.has(I)||ct.has(I))continue;let Ke=I===_r?Xe():{type:Ue};try{pe.register(I,Ke)}catch(Xt){t("register %s store failed: %o",I,Xt)}ct.add(I);let st=dt.worker,vt=!1;We.subscribeList(I,Ke).then(Xt=>{vt=!ft(E,"worker",st,I,Xt)}).catch(Xt=>{t("subscribe %s failed: %o",I,Xt),q(Xt,"worker")}).finally(()=>{ct.delete(I),vt&&Vt()})}},x=function(){dt.worker+=1;for(let[T]of Jf){let I=E.get(T);I&&(I().catch(()=>{}),E.delete(T));try{pe.unregister(T)}catch(Ue){t("unregister %s failed: %o",T,Ue)}}},S=function(T){if(!T){te();return}H||(Ae("subscribe-worker-queue",{id:t_}).catch(I=>{t("subscribe-worker-queue failed: %o",I)}),Ae("subscribe-worker-parallel-analysis",{id:n_}).catch(I=>{t("subscribe-worker-parallel-analysis failed: %o",I)}),H=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:n_}),Ae("unsubscribe-worker-queue",{id:t_})))},te=function(){H&&(H().catch(()=>{}),H=null),pt.clear()},Se=function(T){if(!T){Ne();return}fe||(Ae("subscribe-monitor-pipeline",{id:e_}).catch(I=>{t("subscribe-monitor-pipeline failed: %o",I)}),fe=()=>Ae("unsubscribe-monitor-pipeline",{id:e_}))},Ne=function(){fe&&(fe().catch(()=>{}),fe=null)},P=function(){A||(Ae("subscribe-ui-order",{id:r_}).catch(T=>{t("subscribe-ui-order failed: %o",T)}),A=()=>Ae("unsubscribe-ui-order",{id:r_}))},$e=function(){A&&(A().catch(()=>{}),A=null),$t.clear()},de=function(){Ve||(Ae("subscribe-display-policy",{id:s_}).catch(T=>{t("subscribe-display-policy failed: %o",T)}),Ve=()=>Ae("unsubscribe-display-policy",{id:s_}))},Je=function(){Ve&&(Ve().catch(()=>{}),Ve=null),ut.clear()},kt=function(){At||(Ae("subscribe-impl-presets",{id:o_}).catch(T=>{t("subscribe-impl-presets failed: %o",T)}),At=()=>Ae("unsubscribe-impl-presets",{id:o_}))},Qt=function(T){if(!T)return"Unknown";let I=T.split("/").filter(Boolean);return I.length>0?I[I.length-1]:"Unknown"},qt=function(T,I){Zt.open(T.path,{missing_state:T.missing_state,...I?{workspace:I}:{}})};var m=q,h=Be,b=lt,k=ve,j=ft,K=Vt,Y=Et,ie=Xe,Q=De,U=he,F=Le,W=x,C=S,M=te,re=Se,ge=Ne,xe=P,le=$e,_e=de,Ee=Je,Fe=kt,we=Qt,J=qt;let Te=document.getElementById("header-loading"),Me=Xc(Te),V=Ud(e),me=Xf(),Ae=Me.wrapSend((T,I)=>me.send(T,I)),We=zc(Ae),pe=Hc(),je=Vc(),pt=Kc(),it=Rc(),$t=Gc(),ut=Tc(),L=Cc(),ae=Oc();me.on("impl-presets-snapshot",T=>{let I=T;I&&typeof I.revision=="number"&&Array.isArray(I.presets)&&L.set({revision:I.revision,presets:I.presets})}),me.on("monitor-pipeline-snapshot",T=>{let I=T;if(!(!I||!Array.isArray(I.workspaces)))try{it.set(I.workspaces,I.workspaces_state,I.cross_lanes)}catch{}}),me.on("ui-order-snapshot",T=>{let I=T;if(I&&typeof I.revision=="number")try{$t.set({revision:I.revision,order:I.order&&typeof I.order=="object"?I.order:{}})}catch{}}),me.on("display-policy-snapshot",T=>{let I=T;if(I&&I.policy&&typeof I.policy=="object")try{ut.set(I.policy)}catch{}}),me.on("session-log-snapshot",T=>{let I=T;if(I&&typeof I.id=="string")try{ae.set(I.id,Array.isArray(I.lines)?I.lines:[],typeof I.last_event_at=="number"?I.last_event_at:null)}catch{}}),me.on("session-log-append",T=>{let I=T;if(I&&typeof I.id=="string")try{ae.append(I.id,I.event)}catch{}}),me.on("snapshot",T=>{let I=T,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="snapshot")try{Ke.applyPush(I)}catch{}}),me.on("upsert",T=>{let I=T,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="upsert")try{Ke.applyPush(I)}catch{}}),me.on("delete",T=>{let I=T,Ue=I&&typeof I.id=="string"?I.id:"",Ke=Ue?pe.getStore(Ue):null;if(Ke&&I&&I.type==="delete")try{Ke.applyPush(I)}catch{}});let Oe=null,qe=null,Ye=null,rt=null,gt=()=>{},ht=new Promise(T=>{gt=()=>T(void 0)}),se=!1,ee=!1;async function He(T){let I=Be(T);if(I===qe||I===Ye)return;Ye=I;let Ue=`detail:${T}`,Ke={type:"issue-detail",params:{id:T}};try{pe.register(Ue,Ke)}catch(st){t("register detail store failed: %o",st)}try{let st=await We.subscribeList(Ue,Ke);if(Re.getState().selected_id!==T||Be(T)!==I){await st().catch(()=>{});return}Oe&&await Oe().catch(()=>{}),Oe=st,qe=I}catch(st){t("detail subscribe failed: %o",st),q(st,"issue details")}finally{Ye===I&&(Ye=null)}}let ze=new Map,ct=new Set,dt={board:0,worker:0},Dt=!1,Ht=wo;try{let T=window.localStorage.getItem(a_);ii(T)&&(Ht=T)}catch{}let xt="today";try{let T=window.localStorage.getItem(Gv);T!==null&&(xt=Wn(T))}catch{}async function N(T){if(!ii(T)||T===Ht)return;Ht=T;try{window.localStorage.setItem(a_,T)}catch{}let I=ze.get(mr);if(!I)return;ze.delete(mr),await I().catch(()=>{});let Ue=Et();try{pe.register(mr,Ue)}catch(Ke){t("register %s store failed: %o",mr,Ke)}try{let Ke=await We.subscribeList(mr,Ue);ze.set(mr,Ke)}catch(Ke){t("re-subscribe %s failed: %o",mr,Ke),q(Ke,"board")}}async function ne(T){let I=Wn(T);if(I===xt)return;xt=I;let Ue=E.get(_r);if(!Ue)return;E.delete(_r),await Ue().catch(()=>{});let Ke=Xe();try{pe.register(_r,Ke)}catch(st){t("register %s store failed: %o",_r,st)}try{let st=await We.subscribeList(_r,Ke);E.set(_r,st)}catch(st){t("re-subscribe %s failed: %o",_r,st),q(st,"worker")}}let E=new Map,H=null,fe=null,A=null,Ve=null,At=null;async function Lt(){Ve=null,ut.clear(),At=null,L.clear(),H=null,fe=null,ze.clear(),E.clear(),dt.board+=1,dt.worker+=1,kt();let T=Re.getState().workspace.current?.path;if(T)try{await me.send("set-workspace",{path:T})}catch(Ue){t("workspace restore after reconnect failed: %o",Ue);return}de();let I=Re.getState();De(I.view==="board"),Le(I.view==="worker"),Se(I.view==="monitor"),S(I.view==="board"||I.view==="worker"||!!I.selected_id)}async function Ut(){t("clearing all subscriptions for workspace switch"),he(),x(),te(),je.clear(),$e(),P(),Je(),de(),lt();let T=Re.getState();if(T.selected_id)try{pe.unregister(`detail:${T.selected_id}`)}catch{}let I=Re.getState();De(I.view==="board"),Le(I.view==="worker"),Se(I.view==="monitor"),S(I.view==="board"||I.view==="worker"||!!I.selected_id),I.selected_id&&ve(I.selected_id)}async function Tt(T){t("requesting workspace switch to %s",T),ee=!0;try{let I=await me.send("set-workspace",{path:T});t("workspace switch result: %o",I),I&&I.workspace&&(Re.setState({workspace:{current:{path:I.workspace.root_dir,database:I.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",T),I.changed&&(await Ut(),ue("Switched to "+Qt(T),"success",2e3)))}catch(I){throw t("workspace switch failed: %o",I),ue("Failed to switch workspace","error",3e3),I}finally{ee=!1}}async function bn(T){t("requesting workspace git pull for %s",T);try{let I=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",I);let Ue=I?.status;if(Ue==="up_to_date"){ue("Already up to date","success",2e3);return}if(Ue==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Qt(T),"success",2e3)}catch(I){t("workspace git pull failed: %o",I);let Ue=I?.code,Ke=I?.message;if(Ue==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ue==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ue==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let st=Ke?`: ${Ke}`:"";throw ue(`Git pull failed${st}`,"error",3e3),I}}async function Wt(T,I){t("setting workspace visibility %s \u2192 %s",T,String(I));try{await me.send("set-workspace-visibility",{path:T,visible:I}),await rn()}catch(Ue){t("workspace visibility update failed: %o",Ue),ue("Failed to update project visibility","error",3e3)}}async function rn(){try{let T=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",T),T&&Array.isArray(T.workspaces)){let I=T.workspaces.map(vt=>({path:vt.path,database:vt.database,pid:vt.pid,version:vt.version})),Ue=T.current?{path:T.current.root_dir,database:T.current.db_path}:null,Ke=Array.isArray(T.hidden)?T.hidden.filter(vt=>typeof vt=="string"):[];Re.setState({workspace:{current:Ue,available:I,hidden:Ke}});let st=window.localStorage.getItem("beads-ui.workspace");st&&(!I.some(Xt=>Xt.path===st)||Ke.includes(st)?window.localStorage.removeItem("beads-ui.workspace"):Ue&&st!==Ue.path&&(t("restoring saved workspace preference: %s",st),await Tt(st)))}}catch(T){t("failed to load workspaces: %o",T)}}me.on("workspace-changed",T=>{t("workspace-changed event: %o",T),T&&T.root_dir&&(Re.setState({workspace:{current:{path:T.root_dir,database:T.db_path}}}),rn(),Ut())});let sn=!1;if(typeof me.onConnection=="function"){let T=I=>{t("ws state %s",I),I==="reconnecting"||I==="closed"?(sn=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):I==="open"&&sn&&(sn=!1,ue("Reconnected","success",2200),Hv(Re,(Ue,Ke)=>{t(`${Ue}: %o`,Ke)}),Lt())};me.onConnection(T)}let pn="board";try{let T=window.localStorage.getItem("beads-ui.view");(T==="board"||T==="worker"||T==="monitor")&&(pn=T)}catch(T){t("view parse error: %o",T)}let Re=Qc({config:zv(),view:pn});me.on("worker-queue-snapshot",T=>{let I=T;if(!I||!I.queue)return;let Ue=Re.getState().workspace.current?.path;if(typeof Ue=="string"&&Ue.length>0&&I.root_dir!==Ue){t("dropping worker-queue snapshot for %s",String(I.root_dir));return}try{je.set(I.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",T=>{let I=T;if(!I)return;let Ue=Re.getState().workspace.current?.path;if(!(typeof Ue=="string"&&Ue.length>0&&typeof I.root_dir=="string"&&I.root_dir!==Ue))try{pt.set({settings:I.settings,job:I.job??null,runs:Array.isArray(I.runs)?I.runs:[],last_good:I.last_good??null})}catch{}});let Ie=Yc(Re);Ie.start();let O=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),be=async(T,I)=>{try{return await Ae(T,I)}catch(Ue){if(O.has(T))throw Ue;return[]}};nf({global_element:r,repo_element:s},Re,Ie);let Pe=document.getElementById("workspace-picker");Pe&&Yf(Pe,Re,Tt,bn,Wt);let yt=af(e,(T,I)=>Ae(T,I));try{let T=document.getElementById("new-issue-btn");T&&T.addEventListener("click",()=>yt.open())}catch{}let Nt=df(e,{policyStore:ut,queueStore:je,implPresetStore:L,transport:(T,I)=>Ae(T,I),onOpenChange:T=>{let I=Dt;Dt=T,Vt(),I&&T===!1&&kn.refreshSessionDefaults()},labelOptions:()=>{let T=new Set;for(let[I]of Ml)for(let Ue of pe.snapshotFor(I)||[]){let Ke=Ue.labels;if(Array.isArray(Ke))for(let st of Ke)typeof st=="string"&&st.length>0&&T.add(st)}return Array.from(T).sort()}});try{let T=document.getElementById("display-settings-btn");T&&(T.setAttribute("aria-label","\uC124\uC815"),T.setAttribute("title","\uC124\uC815"),T.addEventListener("click",()=>Nt.open()))}catch{}let Ct=document.createElement("div");Ct.className="md-viewer-root",document.body.appendChild(Ct);let Zt=pa(Ct,{getWorkspacePath:()=>Re.getState().workspace.current?.path}),tn=fu(i,{gotoIssue:T=>Ie.gotoIssue(T),issueStores:pe,transport:be,workerQueueStore:je,uiOrderStore:$t,displayPolicyStore:ut,closedRange:Ht,onClosedRangeChange:T=>{N(T)},onNewIssue:()=>yt.open(),openDoc:qt}),kn=Ol(l,{transport:be,issueStores:pe,queueStore:je,analysisStore:pt,sessionLogStore:ae,uiOrderStore:$t,gotoIssue:T=>Re.setState({selected_id:T}),getWorkspacePath:()=>Re.getState().workspace.current?.path,switchWorkspace:T=>Tt(T),openDoc:qt,doneRange:xt,onDoneRangeChange:T=>{ne(T)}}),Ft=tf(u,{transport:be,pipelineStore:it,execPresetStore:L,sessionLogStore:ae,router:Ie,gotoIssue:T=>Ie.gotoIssue(T),getWorkspacePath:()=>Re.getState().workspace.current?.path,switchWorkspace:T=>Tt(T),openDoc:qt}),$n=Bd(d,{issueStores:pe,transport:be,queueStore:je,execPresetStore:L,sessionLogStore:ae,getWorkspacePath:()=>Re.getState().workspace.current?.path,mdViewer:Zt,onNavigate:T=>{Re.getState().view==="worker"?Re.setState({selected_id:T}):Ie.gotoIssue(T)},onClose:()=>{let T=Re.getState();Re.setState({selected_id:null});try{Ie.gotoView(T.view==="worker"||T.view==="monitor"?T.view:"board")}catch{}},onOpenExecPresets:()=>{Nt.open("execution")}}),xn=Re.getState().selected_id;xn&&(d.hidden=!1,$n.load(xn),ve(xn)),Re.subscribe(T=>{let I=T.selected_id;I?(d.hidden=!1,$n.load(I),ee||ve(I)):($n.clear(),d.hidden=!0,lt())});let Vn=T=>{i.hidden=T.view!=="board",l.hidden=T.view!=="worker",u.hidden=T.view!=="monitor",o&&o.classList.toggle("is-quiet",T.view==="monitor"),De(T.view==="board"),Le(T.view==="worker"),Se(T.view==="monitor"),S(T.view==="board"||T.view==="worker"||Dt||!!T.selected_id),!T.selected_id&&T.view==="board"&&tn.load(),T.view==="worker"&&kn.load(),T.view==="monitor"?Ft.load():Ft.pause(),window.localStorage.setItem("beads-ui.view",T.view)};Re.subscribe(Vn),Vn(Re.getState()),P(),de(),kt(),rn().finally(()=>{se=!0,gt()}),window.addEventListener("keydown",T=>{let I=T.ctrlKey||T.metaKey,Ue=String(T.key||"").toLowerCase(),Ke=T.target,st=Ke&&Ke.tagName?String(Ke.tagName).toLowerCase():"",vt=st==="input"||st==="textarea"||st==="select"||Ke&&typeof Ke.isContentEditable=="boolean"&&Ke.isContentEditable;I&&Ue==="n"&&(vt||(T.preventDefault(),yt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Kv(t)});export{Kv as bootstrap,zv as readBootstrapConfig,Hv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
