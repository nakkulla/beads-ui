var W_=Object.create;var oa=Object.defineProperty;var z_=Object.getOwnPropertyDescriptor;var H_=Object.getOwnPropertyNames;var G_=Object.getPrototypeOf,K_=Object.prototype.hasOwnProperty;var V_=(e,t,n)=>t in e?oa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ia=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Y_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of H_(t))!K_.call(e,s)&&s!==n&&oa(e,s,{get:()=>t[s],enumerable:!(r=z_(t,s))||r.enumerable});return e};var X_=(e,t,n)=>(n=e!=null?W_(G_(e)):{},Y_(t||!e||!e.__esModule?oa(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>V_(e,typeof t!="symbol"?t+"":t,n);var Mc=ia((Ow,Pc)=>{var jr=1e3,Br=jr*60,Ur=Br*60,xr=Ur*24,J_=xr*7,em=xr*365.25;Pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return tm(e);if(n==="number"&&isFinite(e))return t.long?rm(e):nm(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function tm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*em;case"weeks":case"week":case"w":return n*J_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return n*Br;case"seconds":case"second":case"secs":case"sec":case"s":return n*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function nm(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function rm(e){var t=Math.abs(e);return t>=xr?Co(e,t,xr,"day"):t>=Ur?Co(e,t,Ur,"hour"):t>=Br?Co(e,t,Br,"minute"):t>=jr?Co(e,t,jr,"second"):e+" ms"}function Co(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var qc=ia((Lw,Nc)=>{function sm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=s,n.enabled=l,n.humanize=Mc(),n.destroy=c,Object.keys(e).forEach(u=>{n[u]=e[u]}),n.names=[],n.skips=[],n.formatters={};function t(u){let m=0;for(let y=0;y<u.length;y++)m=(m<<5)-m+u.charCodeAt(y),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(u){let m,y=null,b,k;function D(...q){if(!D.enabled)return;let Y=D,ae=Number(new Date),ee=ae-(m||ae);Y.diff=ee,Y.prev=m,Y.curr=ae,m=ae,q[0]=n.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let j=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(U,X)=>{if(U==="%%")return"%";j++;let V=n.formatters[X];if(typeof V=="function"){let _e=q[j];U=V.call(Y,_e),q.splice(j,1),j--}return U}),n.formatArgs.call(Y,q),(Y.log||n.log).apply(Y,q)}return D.namespace=u,D.useColors=n.useColors(),D.color=n.selectColor(u),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(u)),k),set:q=>{y=q}}),typeof n.init=="function"&&n.init(D),D}function r(u,m){let y=n(this.namespace+(typeof m>"u"?":":m)+u);return y.log=this.log,y}function s(u){n.save(u),n.namespaces=u,n.names=[],n.skips=[];let m=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of m)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(u,m){let y=0,b=0,k=-1,D=0;for(;y<u.length;)if(b<m.length&&(m[b]===u[y]||m[b]==="*"))m[b]==="*"?(k=b,D=y,b++):(y++,b++);else if(k!==-1)b=k+1,D++,y=D;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let u=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),u}function l(u){for(let m of n.skips)if(o(u,m))return!1;for(let m of n.names)if(o(u,m))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Nc.exports=sm});var Fc=ia((vn,Ro)=>{vn.formatArgs=im;vn.save=am;vn.load=lm;vn.useColors=om;vn.storage=cm();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function om(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function im(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ro.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function am(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function lm(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function cm(){try{return localStorage}catch{}}Ro.exports=qc()(vn);var{formatters:dm}=Ro.exports;dm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var _s=globalThis,ko=_s.trustedTypes,yc=ko?ko.createPolicy("lit-html",{createHTML:e=>e}):void 0,la="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,ca="?"+Qn,Z_=`<${ca}>`,vr=document,ms=()=>vr.createComment(""),gs=e=>e===null||typeof e!="object"&&typeof e!="function",da=Array.isArray,Ac=e=>da(e)||typeof e?.[Symbol.iterator]=="function",aa=`[ 	
\f\r]`,fs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vc=/-->/g,wc=/>/g,hr=RegExp(`>|${aa}(?:([^\\s"'>=/]+)(${aa}*=${aa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kc=/'/g,$c=/"/g,Sc=/^(?:script|style|textarea|title)$/i,ua=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=ua(1),hs=ua(2),xw=ua(3),Rn=Symbol.for("lit-noChange"),Wt=Symbol.for("lit-nothing"),xc=new WeakMap,yr=vr.createTreeWalker(vr,129);function Ec(e,t){if(!da(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yc!==void 0?yc.createHTML(t):t}var Tc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=fs;for(let l=0;l<n;l++){let a=e[l],c,u,m=-1,y=0;for(;y<a.length&&(i.lastIndex=y,u=i.exec(a),u!==null);)y=i.lastIndex,i===fs?u[1]==="!--"?i=vc:u[1]!==void 0?i=wc:u[2]!==void 0?(Sc.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=hr):u[3]!==void 0&&(i=hr):i===hr?u[0]===">"?(i=s??fs,m=-1):u[1]===void 0?m=-2:(m=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?hr:u[3]==='"'?$c:kc):i===$c||i===kc?i=hr:i===vc||i===wc?i=fs:(i=hr,s=void 0);let b=i===hr&&e[l+1].startsWith("/>")?" ":"";o+=i===fs?a+Z_:m>=0?(r.push(c),a.slice(0,m)+la+a.slice(m)+Qn+b):a+Qn+(m===-2?l:b)}return[Ec(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},bs=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[c,u]=Tc(t,n);if(this.el=e.createElement(c,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(la)){let y=u[i++],b=s.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?xo:k[1]==="?"?Ao:k[1]==="@"?So:kr}),s.removeAttribute(m)}else m.startsWith(Qn)&&(a.push({type:6,index:o}),s.removeAttribute(m));if(Sc.test(s.tagName)){let m=s.textContent.split(Qn),y=m.length-1;if(y>0){s.textContent=ko?ko.emptyScript:"";for(let b=0;b<y;b++)s.append(m[b],ms()),yr.nextNode(),a.push({type:2,index:++o});s.append(m[y],ms())}}}else if(s.nodeType===8)if(s.data===ca)a.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Qn,m+1))!==-1;)a.push({type:7,index:o}),m+=Qn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===Rn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=gs(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var $o=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new qr(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Eo(o,this,t)),this._$AV.push(c),a=r[++l]}i!==a?.index&&(o=yr.nextNode(),i++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Wt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),gs(t)?t===Wt||t==null||t===""?(this._$AH!==Wt&&this._$AR(),this._$AH=Wt):t!==this._$AH&&t!==Rn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Wt&&gs(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=bs.createElement(Ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new $o(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=xc.get(t.strings);return n===void 0&&xc.set(t.strings,n=new bs(t)),n}k(t){da(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(ms()),this.O(ms()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Wt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Wt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=wr(this,t,n,0),i=!gs(t)||t!==this._$AH&&t!==Rn,i&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=wr(this,l[r+a],n,a),c===Rn&&(c=this._$AH[a]),i||(i=!gs(c)||c!==this._$AH[a]),c===Wt?t=Wt:t!==Wt&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(t)}j(t){t===Wt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},xo=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Wt?void 0:t}},Ao=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Wt)}},So=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Wt)===Rn)return;let r=this._$AH,s=t===Wt&&r!==Wt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Wt&&(r===Wt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Eo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Cc={M:la,P:Qn,A:ca,C:1,L:Tc,R:$o,D:Ac,V:wr,I:qr,H:kr,N:Ao,U:So,B:xo,F:Eo},Q_=_s.litHtmlPolyfillSupport;Q_?.(bs,qr),(_s.litHtmlVersions??(_s.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new qr(t.insertBefore(ms(),o),o,void 0,n??{})}return s._$AI(e),s};var To="today",Rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Fr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Gn(e){return e==="today"?"today":"7d"}function pa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,l){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Dc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(i,l),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var jc=X_(Fc(),1);function qt(e){return(0,jc.default)(`beads-ui:${e}`)}function um(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Oo(t.spec_id),s=Oo(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oo(e){return typeof e=="string"?e.trim():""}function pm(e){let t=um(e);if(t.path)return t;let n=Oo(Bc(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Bc(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var fm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Wr(e){let t=pm(e),n=Oo(Bc(e).spec_review),r=fm.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function Dn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ys(e,t){let n=Dn(e.created_at),r=Dn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Kc(e,t){let n=Dn(e.created_at),r=Dn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Vc(e,t){let n=Dn(e.updated_at),r=Dn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Yc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Dn(e.created_at),o=Dn(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Xc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Lo=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function _m(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Lo,e)}function _a(e){if(!e||typeof e!="object")return!1;let t=e;return _m(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Wr(e).evidence==="published"?1:0;case"created":return Uc(e.created_at);case"updated":return Uc(e.updated_at);default:return null}}function zc(e,t,n){let r=Wc(e,n.key),s=Wc(t,n.key);if(r===null||s===null)return r===s?0:r===null?1:-1;if(r===s)return 0;let o=r<s?-1:1;return n.dir==="desc"?-o:o}function Zc(e){let t=Array.isArray(e)?e.filter(_a):[];return(n,r)=>{for(let l of t){let a=zc(n,r,l);if(a!==0)return a}let s=zc(n,r,{key:"created",dir:"asc"});if(s!==0)return s;let o=n.id,i=r.id;return o<i?-1:o>i?1:0}}var mm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Hc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Gc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=mm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Qc(e,t){let n=Hc(e),r=Hc(t);if(n!==r)return n<r?-1:1;let s=Gc(e),o=Gc(t);if(s!==o)return s<o?-1:1;let i=Dn(e&&e.created_at),l=Dn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,c=t&&t.id;return a===c?0:String(a)<String(c)?-1:1}var fa=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Dn(e&&e.created_at)}function Jc(e){return(t,n)=>{let r=zr(t,e),s=zr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function ma(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,l=o+1<s?r[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:zr(l,n)-fa};if(!l)return{rank:zr(i,n)+fa};let a=zr(i,n),c=zr(l,n),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:r.map((m,y)=>({bead_id:m.id,rank:y*fa}))}}function ga(e,t={}){let n=qt(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||ys;function c(){for(let y of Array.from(i))try{y()}catch{}}function u(){s=Array.from(r.values()).sort(a)}function m(y){if(l||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let D of k)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);u(),o=b,c();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let D=r.get(k.id);if(!D)r.set(k.id,k);else{let q=Number.isFinite(D.updated_at)?D.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(q<=Y){for(let ae of Object.keys(D))ae in k||delete D[ae];for(let[ae,ee]of Object.entries(k))D[ae]=ee}}u()}o=b,c()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(r.delete(k),u()),o=b,c()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){l=!0,r.clear(),s=[],i.clear(),o=0}}}function Io(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ed(e){let t=qt("subs"),n=new Map,r=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=r.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let b of Array.from(c)){let k=n.get(b);if(!k)continue;let D=k.itemsById;for(let q of u)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of m)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of y)typeof q=="string"&&q.length>0&&D.delete(q)}}async function o(l,a){let c=Io(a);if(t("subscribe %s key=%s",l,c),!n.has(l))n.set(l,{key:c,itemsById:new Map});else{let m=n.get(l);if(m&&m.key!==c){let y=r.get(m.key);y&&(y.delete(l),y.size===0&&r.delete(m.key)),n.set(l,{key:c,itemsById:new Map})}}r.has(c)||r.set(c,new Set);let u=r.get(c);u&&u.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let y=n.get(l)||null;if(y){let b=r.get(y.key);b&&(b.delete(l),b.size===0&&r.delete(y.key))}throw n.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,c);try{await e("unsubscribe-list",{id:l})}catch{}let m=n.get(l)||null;if(m){let y=r.get(m.key);y&&(y.delete(l),y.size===0&&r.delete(m.key))}n.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Io,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=n.get(l);return c?c.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function td(){let e=qt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let a of Array.from(r))try{a()}catch{}}function i(a,c,u){let m=c?Io(c):"",y=n.get(a)||"",b=t.has(a);if(e("register %s key=%s (prev=%s)",a,m,y),b&&y&&m&&y!==m){let k=t.get(a);if(k)try{k.dispose()}catch{}let D=s.get(a);if(D){try{D()}catch{}s.delete(a)}let q=ga(a,u);t.set(a,q);let Y=q.subscribe(()=>o());s.set(a,Y)}else if(!b){let k=ga(a,u);t.set(a,k);let D=k.subscribe(()=>o());s.set(a,D)}return n.set(a,m),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let c=t.get(a);c&&(c.dispose(),t.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let c=t.get(a);return c?c.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function nd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function rd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ba(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function gm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function bm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function sd(e){let t=qt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):gm(r),i=bm(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=ba(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ba(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var hm=Object.freeze({workspace_config:{default_workspace:null}});function od(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:hm.workspace_config.default_workspace}}}function id(e={}){let t=qt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:od(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?od(o.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==n.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===n.worker.show_closed_children[u])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function ad(e){let t=qt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let c=n>0;e.toggleAttribute("hidden",!c),e.setAttribute("aria-busy",c?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function l(){let c=n;n=Math.max(0,n-1),c<=0?t("done called but count was already %d",c):t("done count=%d\u2192%d",c,n),o()}function a(c){return async(m,y)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let D=!1,q=()=>{D||(D=!0,r.delete(b),l())},Y=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),q())},3e4);try{let ae=await c(m,y),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,ee),ae}catch(ae){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,ee,ae),ae}finally{clearTimeout(Y),q()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let c=Date.now();return Array.from(r.entries()).map(([u,m])=>({id:u,type:m.type,elapsed_ms:c-m.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Do(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Xc),a;switch(l){case"created_desc":return a.sort(ys),a;case"created_asc":return a.sort(Kc),a;case"updated_desc":return a.sort(Vc),a;case"priority":return a.sort(Yc),a;case"manual":default:{let c=n();return c?a.sort(Jc(c)):a.sort(ys),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Pn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function sn(e){let t=Pn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Pn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ld(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Pn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Po(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Mo(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Po(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function No(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=ld(n);return{total:n.length,count:r,current:s,children:n}}function cd(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;n&&n.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!n)return;let c=n.get()||{revision:0,order:{}},u=r(ma(l,a,c.order),i);s(c,u);let m=await t("ui-order-set",{expected_revision:c.revision,entries:u});if(m&&m.conflict){let y={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(y);let b=r(ma(l,a,y.order),i);s(y,b);let k=await t("ui-order-set",{expected_revision:y.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function dd(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function vs(e,t){let n=dd(e),r=dd(t);return n.length===0||r.length===0?!1:n!==r}function qo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ha(e,t){return!t||typeof e!="string"||e.length===0||qo(t.visible_labels).includes(e)?!0:qo(t.hidden_labels).includes(e)?!1:!qo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ud(e,t){return qo(e).filter(n=>ha(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function ym(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function vm(e,t,n,r,s){return d`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function wm(e,t,n,r){return d`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${ym(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Fo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Qc):i;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?vm(t.parent_id,e.count,n,r,t.onToggle):d`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?d`<div class="board-card__roll-list">
            ${l.map((a,c)=>wm(a,c+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var km={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},$m={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function xm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function _d(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function Am(e){if(!e||e.fill==="none"||!e.approval_state)return _d(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Sm(e,t,n,r){let s=km[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,l=$m[t&&t.glyph||""]||"",a="bar";o==="dim"?a+=` b-${s} dim`:o==="full"&&(a+=` b-${s} full`),i&&(a+=" stale"),n&&(a+=" cur");let c=o==="none"?"lbl":`lbl l-${s} on`,u=n?`color: var(--stage-${s}-on)`:"",m=fd[e]||e,y=r?md(t):null;if(!y)return d`
      <div class="seg">
        <div class=${a} style=${u}>${l}</div>
        <div class=${c}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return d`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,y,e)}}
    >
      <div class=${a} style=${u}>${l}</div>
      <div class=${c}>${m}</div>
    </button>
  `}function md(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function jo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=pd[e.route]||pd.spec_backed,o=e.stages,i=xm(s,o,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(c=>`${fd[c]||c} ${c==="plan"?Am(o[c]||{}):_d(o[c]||{})}`).join(" \xB7 ")}`,a=!!r&&s.some(c=>md(o[c]||{})!==null);return d`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${s.map(c=>Sm(c,o[c]||{},c===i,r))}
    </div>
  `}function Em(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gd=2;function bd(e){let t=e.slice(0,gd).join(", "),n=e.length-gd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Tm(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(d`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(vs(e,i)?o:s).push(i);return s.length>0&&n.push(d`<span class="ctl-chip ctl-chip--blocked-dep"
        >${bd(s)}</span
      >`),o.length>0&&n.push(d`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${bd(o)}</span
      >`),n}function ya(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Bo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Bo(e)}@${e.sha}`}function Uo(e,t){if(!e)return null;let n=ya(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ya(t?.kind),i=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,c=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${c}`}}function hd(e,t){let n=Uo(e,t);return n?d`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Cm(e){if(!e)return null;let t=ya(e.kind);return t?d`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Rm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&cr(n,"route")){let l=r.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let l=r.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=hd(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let l=r.exec_receipt;s.push(d`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?Bo(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;s.push(d`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of ud(e.labels,n))s.push(d`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&cr(n,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")&&s.push(...Tm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&s.push(d`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Om(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":d`<span class="board-card__times">
    ${t?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${sn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?d`<span class="board-card__time-sep">·</span>`:""}
    ${n?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${sn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Lm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Fo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Om(e),empty_label:"children \uC5C6\uC74C",childChips:va,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function va(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Uo(t,n)?d`<span class="board-card__roll-child-chips">
    ${hd(t,n)}
    ${Cm(n)}
  </span>`:null}function Wo(e,t){let n=Em(e.priority);return d`
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
        ${n?d`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Rm(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?jo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Lm(e,t)}
    </article>
  `}function Hr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return d`
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
        ${r?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Rc.map(o=>d`<option
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
        ${e.items.map(o=>Wo(o,t))}
      </div>
    </section>
  `}function yd(e,t,n){return d`
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
          ${e.items.length===0?d`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Wo(r,t))}
        </div>
      </div>
    </dialog>
  `}var Im=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Dm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Pm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Mm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return d`
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
      ${n.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function vd(e,t,n){return d`
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
        ${Im.map(r=>d`<option
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
        ${Dm.map(r=>d`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Mm(e,t,n)}
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
        ${Pm.map(r=>d`<option
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
  `}var Nm=200,qm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Fm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),wd="beads-ui.board.sort",kd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function jm(){try{let e=window.localStorage.getItem(wd);if(e&&kd.has(e))return e}catch{}return"created_desc"}function $d(e,t){let n=qt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,c=t.onClosedRangeChange,u=t.onNewIssue,m=t.openDoc,y=t.closedRange||To,b=s?Do(s,i):null,k=cd({transport:o,uiOrderStore:i}),D=[],q=[],Y=[],ae=[],ee=[],j=[],P=!1,U=0,X=jm(),V=new Map,_e=new Map,W=new Map,Z=new Set,ie={search:"",priority:"",type:"",labels:[]},te=!1,Ee=null;function He(E){return String(E.status||"open")==="open"}function pe(E){let G=String(E.status||"open");return G==="open"||G==="blocked"}function Q(E){let G=ie.search.trim().toLowerCase(),Re=ie.priority,ze=ie.type,xe=ie.labels;return E.filter(at=>{if(G){let st=String(at.id||"").toLowerCase(),he=String(at.title||"").toLowerCase();if(!st.includes(G)&&!he.includes(G))return!1}if(Re!==""&&String(at.priority)!==Re||ze!==""&&String(at.issue_type||"")!==ze)return!1;if(xe.length>0){let st=Array.isArray(at.labels)?at.labels:[];if(!xe.some(he=>st.includes(he)))return!1}return!0})}function Te(){let E=new Set;for(let G of[D,q,Y,ae,ee,j])for(let Re of G){let ze=Array.isArray(Re.labels)?Re.labels:[];for(let xe of ze)typeof xe=="string"&&xe.length>0&&E.add(xe)}return Array.from(E).sort()}function Ie(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function S(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",X),G=b.selectBoardColumn("tab:board:blocked","blocked",X).filter(pe),Re=new Set(E.map(F=>F.id)),ze=b.selectBoardColumn("tab:board:ready","ready",X).filter(F=>He(F)&&!Re.has(F.id)),xe=b.selectBoardColumn("tab:board:resolved","resolved",X),at=b.selectBoardColumn("tab:board:deferred","deferred",X),st=b.selectBoardColumn("tab:board:closed","closed").slice(0,Nm),he=[...G,...ze,...E,...xe,...st];oe(he);let Je=new Set;for(let F of he)F&&F.id&&!Po(F)&&Je.add(F.id);let M=!Ie();D=M?ws(G,Je):G,q=M?ws(ze,Je):ze,Y=M?ws(E,Je):E,ae=M?ws(xe,Je):xe,ee=at,U=at.length,j=M?ws(st,Je):st,V=new Map;for(let F of D)V.set(F.id,"open");for(let F of q)V.set(F.id,"open");for(let F of Y)V.set(F.id,"in_progress");for(let F of ae)V.set(F.id,"resolved");for(let F of ee)V.set(F.id,"deferred");for(let F of j)V.set(F.id,"closed");_e=new Map;for(let F of D)_e.set(F.id,"blocked-col");for(let F of q)_e.set(F.id,"ready-col");for(let F of Y)_e.set(F.id,"in-progress-col");for(let F of ae)_e.set(F.id,"resolved-col");for(let F of j)_e.set(F.id,"closed-col")}_t()}catch{D=[],q=[],Y=[],ae=[],ee=[],j=[],W=new Map,_t()}}function oe(E){W=Mo(E)}function ye(E){return No(W,E)}function ve(E){return!Z.has(E)}function $e(E,G){E.preventDefault(),E.stopPropagation(),Z.has(G)?Z.delete(G):Z.add(G),_t()}function be(E,G){E.preventDefault(),E.stopPropagation(),r(G)}function Oe(E,G){E.preventDefault(),E.stopPropagation(),r(G)}function Ke(E,G){Ee||r(G)}function yt(E,G){E.preventDefault(),E.stopPropagation(),Bm(G).then(Re=>{Re&&de("\uBCF5\uC0AC\uB428","success",1200)})}function St(E,G){Ee=G,E.dataTransfer&&(E.dataTransfer.setData("text/plain",G),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function ct(E){E.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{Ee=null},0)}function T(E){let G=String(E.target.value||"");!G||G===y||(y=G,c&&c(G),_t())}function ce(){return l?l.get():null}function Le(E){let G=a?a.get():null,Re=G?G.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let ze=Re[E];return!ze||typeof ze!="object"||Array.isArray(ze)?null:ze}let je={onCardClick:Ke,onCopyId:yt,onDragStart:St,onDragEnd:ct,onClosedRangeChange:T,rollupFor:ye,isExpanded:ve,onRollupToggle:$e,onChildClick:be,onFromChipClick:Oe,onOpenDoc:m?(E,G)=>m(G):void 0,cleanupFailureFor:Le,get policy(){return ce()}};function Me(E,G){Ee||(Pe(),r(G))}function et(E,G){E.preventDefault(),E.stopPropagation(),Pe(),r(G)}let bt={...je,onCardClick:Me,onChildClick:et,onFromChipClick:et,onOpenDoc:m?(E,G)=>{Pe(),m(G)}:void 0,get policy(){return ce()}};function Ve(E){let G=E.target,Re=e.querySelector(".board-filter__labels");G&&Re&&Re.contains(G)||De()}function z(E){E.key==="Escape"&&De()}function ne(){te||(te=!0,document.addEventListener("mousedown",Ve),document.addEventListener("keydown",z),_t())}function De(){te&&(te=!1,document.removeEventListener("mousedown",Ve),document.removeEventListener("keydown",z),_t())}function lt(E){E.key==="Escape"&&Pe()}function it(){P||(P=!0,document.addEventListener("keydown",lt),_t())}function Pe(){P&&(P=!1,document.removeEventListener("keydown",lt),_t())}let Ue={onClose:Pe,onOverlayClick(E){E.target===E.currentTarget&&Pe()}},dt={onSearchInput(E){ie.search=String(E.target.value||""),S()},onPriorityChange(E){ie.priority=String(E.target.value||""),S()},onTypeChange(E){ie.type=String(E.target.value||""),S()},onSortChange(E){let G=String(E.target.value||"");if(!(!kd.has(G)||G===X)){X=G;try{window.localStorage.setItem(wd,G)}catch{}S()}},onDeferredToggle(){P?Pe():it()},onLabelMenuToggle(){te?De():ne()},onLabelToggle(E){let G=ie.labels.indexOf(E);G===-1?ie.labels.push(E):ie.labels.splice(G,1),S()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],S())},onNewIssue(){u&&u()}};function tt(){return d`
      <div class="board-view">
        ${vd(ie,dt,{sort_mode:X,deferred_popup_open:P,deferred_count:U,label_options:Te(),label_menu_open:te})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:Q(D)},je)}
          ${Hr({title:"Ready",id:"ready-col",items:Q(q)},je)}
          ${Hr({title:"In progress",id:"in-progress-col",items:Q(Y)},je)}
          ${Hr({title:"Resolved",id:"resolved-col",items:Q(ae)},je)}
          ${Hr({title:"Closed",id:"closed-col",items:Q(j),is_closed:!0,closed_range:y},je)}
        </div>
        ${P?yd({items:Q(ee),count:U},bt,Ue):""}
      </div>
    `}function _t(){rt(tt(),e),Pt()}function Pt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of G)Array.from(Re.querySelectorAll(".board-card")).forEach((xe,at)=>{xe.tabIndex=at===0?0:-1})}catch{}}async function Ft(E,G){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:G}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(E){switch(E){case"blocked-col":return D;case"ready-col":return q;case"in-progress-col":return Y;case"resolved-col":return ae;default:return[]}}function Mt(E,G,Re){if(!o||!i)return;let ze=Ht(E),xe=ze.find(M=>M.id===G);if(!xe)return;let at=ze.filter(M=>M.id!==G),st=Re.closest?Re.closest(".board-card"):null,he=at.length;if(st){let M=st.getAttribute("data-issue-id");if(M===G)return;let F=at.findIndex(we=>we.id===M);F>=0&&(he=F)}let Je=at.slice();Je.splice(he,0,xe),k.applyReorder(G,Je,he)}function Nt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let wt=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Re=E.target.closest(".board-column");Re&&Re!==wt&&(wt&&wt.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),wt=Re)}),e.addEventListener("dragleave",E=>{let G=E.relatedTarget;(!G||!e.contains(G))&&wt&&(wt.classList.remove("board-column--drag-over"),wt=null)}),e.addEventListener("drop",E=>{E.preventDefault(),wt&&(wt.classList.remove("board-column--drag-over"),wt=null);let G=E.target,Re=G.closest(".board-column");if(!Re)return;let ze=E.dataTransfer?.getData("text/plain")||"";if(!ze)return;let xe=Re.id,at=_e.get(ze);if(at&&at===xe){if(Fm.has(xe)){if(X!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(xe,ze,G)}return}let st=qm[xe];if(!st){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(ze)!==st&&Ft(ze,st)}),e.addEventListener("keydown",E=>{let G=E.target;if(!(G instanceof HTMLElement))return;let Re=String(G.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||G.isContentEditable===!0)return;let ze=G.closest(".board-card");if(!ze)return;let xe=String(E.key||"");if(xe==="Enter"||xe===" "){E.preventDefault();let Je=ze.getAttribute("data-issue-id");Je&&r(Je);return}if(xe!=="ArrowUp"&&xe!=="ArrowDown"&&xe!=="ArrowLeft"&&xe!=="ArrowRight")return;E.preventDefault();let at=ze.closest(".board-column");if(!at)return;let st=Array.from(at.querySelectorAll(".board-card")),he=st.indexOf(ze);if(xe==="ArrowDown"&&he<st.length-1){We(ze,st[he+1]);return}if(xe==="ArrowUp"&&he>0){We(ze,st[he-1]);return}if(xe==="ArrowLeft"||xe==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),M=Je.indexOf(at),F=xe==="ArrowRight"?1:-1,we=M+F;for(;we>=0&&we<Je.length;){let Xe=Je[we].querySelector(".board-card");if(Xe){We(ze,Xe);return}we+=F}}});function We(E,G){try{E.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let O=null;b&&b.subscribe&&(O=b.subscribe(()=>{try{S()}catch{}}));let J=null;l&&l.subscribe&&(J=l.subscribe(()=>{try{S()}catch{}}));let me=null;return a&&a.subscribe&&(me=a.subscribe(()=>{_t()})),{async load(){n("load"),S()},clear(){De(),Pe(),O&&(O(),O=null),J&&(J(),J=null),me&&(me(),me=null),e.replaceChildren(),D=[],q=[],Y=[],ae=[],ee=[],j=[],V=new Map,_e=new Map}}}function ws(e,t){return e.filter(n=>{let r=Po(n);return!(r&&t.has(r))})}async function Bm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var kn=e=>e??Wt;async function Mn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ks(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Um(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,l,r,s,o),t.body.append(n),new Promise(a=>{let c=u=>{typeof n.close=="function"&&n.close(),n.remove(),a(u)};r.addEventListener("click",()=>c("prior_session")),s.addEventListener("click",()=>c("fresh_current")),o.addEventListener("click",()=>c(null)),n.addEventListener("cancel",u=>{u.preventDefault(),c(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Um(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Wm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],xd={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},zm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function It(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Sd(e,t,n){let r=zt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=zt(n[e]);return s===null?null:{value:s,source:"global"}}function $s(e,t,n,r){return Sd(e,t,n)||{value:r,source:"base"}}function wa(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&tn(s?.[t])){let i=zt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&tn(s)){for(let i of Object.values(s))if(tn(i)){let l=zt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return zt(r?.runners?.[o]?.models?.[e]?.id)||e}function Hm(e,t){return zt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return It(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return It(e,t,r,e,"explicit")}function Ed(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];tn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(tn(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function Gm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(tn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Km(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Gm(t,n)){let o=Ed(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ka(e){return It(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ad(e,t,n){let r=Sd(e,t,n);return r?Kr(r.value,r.source):It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function $n(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&tn(r.session)?r.session:null,o=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,i=tn(e.runner_catalog)?e.runner_catalog:null,l=zt(n.quick_fix_impl_model),a=Km(l,s,i),c={};if(s){let u=$s("workflow_mode",t,n,zt(s.workflow_mode_default));c.workflow_mode=u.source==="base"?It(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):Kr(u.value,u.source);for(let ee of["spec_review","plan_review","impl_review"]){let j=`${ee}_model`,P=zt(ee==="plan_review"?u.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=$s(j,t,n,P);if(U.value===null)c[j]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!tn(s.review?.reviewers?.[U.value]))c[j]=ka(It(U.value,U.source,"",null,"explicit"));else{let X=Hm(U.value,s);c[j]=It(U.value,U.source,Gr(X),X,U.source==="base"?"default":"explicit")}}for(let[ee,j]of Object.entries(xd)){let P=c[j].value;if(P==="self"||P==="skip"){c[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=zt(s.review?.reviewers?.[P||""]?.effort),X=$s(ee,t,n,U);c[ee]=X.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(X.value,X.source,X.value,X.value,X.source==="base"?"default":"explicit")}let m=tn(s.implementation?.default)?s.implementation.default:{},y=zt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),k=tn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=b&&tn(k[y])?k[y]:{};for(let ee of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=$s(ee,t,n,ee==="impl_dispatch"?zt(D.dispatch)||zt(m.dispatch):zt(m[ee.replace("impl_","")]));c[ee]=j.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let q=zt(t.impl_runtime),Y=q==="inherit"?zt(e.controller_runtime):q,ae=y==="quick_fix"&&zt(t.impl_dispatch)===null&&a.runtime!==null&&(q===null||Y===a.runtime);if(ae){let ee=a.runtime,j=l;c.impl_dispatch=It("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),q===null&&(c.impl_runtime=It(ee,"global",`${ee} (\uC720\uB3C4)`,ee,"explicit")),zt(t.impl_model)===null&&(c.impl_model=It(j,"global",j,j,"explicit"))}if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let ee of["impl_runtime","impl_model","impl_effort","impl_speed"])c[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(c.impl_dispatch.value==="delegated"&&!ae&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_model.value!==null){let ee=c.impl_runtime.value==="inherit"?zt(e.controller_runtime):c.impl_runtime.value,j=ee?Ed(ee,s,i):[];if(c.impl_model.value!=="auto"&&j.length>0&&!j.includes(c.impl_model.value))c.impl_model=ka(c.impl_model);else{let P=wa(c.impl_model.value,ee,s,i);c.impl_model.display=Gr(P),c.impl_model.full_value=P}}if(c.impl_effort.value==="auto"){let ee=zt(e.transport)||(c.impl_runtime.value==="codex"?"codex-native-spawn":c.impl_runtime.value==="claude"?"implement-claude":null),j=ee?zt(s.implementation?.effort_by_transport?.[ee]?.auto):null;j&&!zm.has(j)?(c.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,c.impl_effort.full_value=j,c.impl_effort.resolution="incompatible"):(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}c.impl_speed.value==="default"&&(c.impl_speed=c.impl_speed.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",c.impl_speed.source))}}else for(let u of Wm.filter(m=>!m.startsWith("orchestration_")))c[u]=Ad(u,t,n);if(!s){for(let[u,m]of Object.entries(xd))(c[m].value==="self"||c[m].value==="skip")&&(c[u]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])c[u]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else c.impl_dispatch.value==="delegated"&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_effort.value==="auto"&&(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){c[u]=Ad(u,t,n);continue}let m=u.replace("orchestration_",""),y=zt(o[m]),b=$s(u,t,n,y);if(u==="orchestration_effort"&&b.source==="base"){c[u]=It(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){c[u]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let k=b.source==="base"?zt(o.model_id)||b.value:wa(b.value,null,s,i);c[u]=It(b.value,b.source,Gr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){c[u]=b.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}c[u]=Kr(b.value,b.source)}if(s)if(l===null){let u=c.orchestration_model.full_value;c.quick_fix_impl_model=It(null,"base",u===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(u)})`,null,"default")}else if(a.runtime!==null){let u=wa(l,a.runtime,s,i);c.quick_fix_impl_model=It(l,"global",Gr(u),u,"explicit")}else a.offered?c.quick_fix_impl_model=ka(It(l,"global","",null,"explicit")):c.quick_fix_impl_model=Kr(l,"global");return c}function Vm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function zo(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let y={...r,...m};return $n({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let l=s(i)[e.key],a=s(o)[e.key],c=zt(o[e.key]),u=[...e.choices];return c!==null&&!u.includes(c)&&u.unshift(c),{unset_label:Vm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:u.map(m=>{let y=s({...o,[e.key]:m})[e.key];return{value:m,label:y.display,full_value:y.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(l=>{let a=!1,c=m=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(m))},u=()=>c(r.value.trim());o.addEventListener("click",u),i.addEventListener("click",()=>c(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),u())}),t.addEventListener("cancel",m=>{m.preventDefault(),c(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function $a(e){return`session:${e.provider}:${e.session_id}`}function xs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Ym(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:$a(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:xs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Ym(e,n)}}}var xa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Xm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Td="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Vn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Xr=[...Vn,"reasoning_output_tokens"],Zm={codex:["implementation","review-consult"],claude:["subagent"]};function Aa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Vn.some(t=>Number.isFinite(e[t]))}function Qm(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))}function Sa(e){let t=0;for(let n of Vn)t+=Zt(e?.[n]);return t}function Jm(e){return!e||typeof e!="object"?!1:Vn.some(t=>Number.isFinite(e[t]))}function Cd(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function eg(e){let t={};for(let n of Xr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Rd(e){let t={};for(let n of Xr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Od(e,t){return Aa(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):Sa(t)}function tg(e){return e==="claude"?"Claude":"Codex"}function ng(e){return`\u03C4 ${Id(e)}`}function rg(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(Aa(n)||r>0&&!Qm(n)){let c=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Xm];return t.replayed&&c.push(xa),c.join(`
`)}let s=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Td} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${Td}`:o,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(xa),a.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${tg(n)} ${ng(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:rg(n,r)})}return t}function Go(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Zt(l.total_only_subtotal)+Zt(i.total_only_subtotal));for(let a of Xr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Zt(l.breakdown[a])+Zt(i.breakdown[a]));i.replayed&&(l.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ea(e){return!e||typeof e!="object"?null:On({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function sg(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:eg(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ho(e,t,n){e.subtotal+=t.subtotal,Aa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Xr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ld(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Id(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Zr(e){return Jm(e)?`\u03C4 ${Id(Sa(e))}`:null}function tr(e){let t=Zr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function As(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Sa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(xa),n.join(`
`)}function On(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Cd(a)){let u=sg(l.runner),m=Rd(a),y={provider:u,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Od(u,m)};m.replayed===!0&&(y.replayed=!0),typeof l.model=="string"&&(y.model=l.model),typeof l.session_id=="string"&&(y.session_id=l.session_id),Ho(n[u],y,!0),Ho(r.orchestrator[u],y,!0)}let c=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let u of c){let m=u&&u.provider==="claude"?"claude":"codex";if(!u||u.provider!=="codex"&&u.provider!=="claude"||!Zm[m].includes(u.role)||!Cd(u.usage))continue;let y=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let b=Rd(u.usage),k={provider:m,role:u.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Od(m,b)};k.receipt_id=y,typeof u.agent_type=="string"&&(k.agent_type=u.agent_type),typeof u.agent_id=="string"&&(k.agent_id=u.agent_id),typeof u.model=="string"&&(k.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&(k.effort=u.effort),typeof u.session_id=="string"?k.session_id=u.session_id:typeof u.thread_id=="string"&&(k.session_id=u.thread_id),typeof u.turn_id=="string"&&(k.turn_id=u.turn_id),(typeof u.completed_at=="string"||typeof u.completed_at=="number"&&Number.isFinite(u.completed_at))&&(k.completed_at=u.completed_at),b.replayed===!0&&(k.replayed=!0),Ho(n[m],k,!1),Ho(r[k.role][m],k,!1)}}let o={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let c=Ld(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(c.total_cost_usd=a.outer_cost),o[l]=c}if(Object.keys(o).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let c of["claude","codex"]){let u=r[l][c];u.legs.length>0&&(a[c]={...Ld(u,!0),legs:u.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:o,roles:i}}function Dd(e,t){let n=new Map(e.map((a,c)=>[a,c])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let s=new Set,o=[];for(;o.length<e.length;){let a=e.find(c=>{if(s.has(c))return!1;for(let u of r.get(c))if(!s.has(u))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(a),o.push(a)}let i=[],l=new Map(o.map((a,c)=>[a,c]));for(let a of o){let c=null;for(let u of r.get(a)){let m=Number(n.get(a))<Number(n.get(u)),y=Number(l.get(a))>Number(l.get(u));m&&y&&(c===null||Number(l.get(u))>Number(l.get(c)))&&(c=u)}c!==null&&i.push({bead_id:a,after:c})}return{order:o,corrections:i,cycle:!1}}var og="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Vo="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",ig="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ag="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Ss(e,t){return`${e}\0${t}`}function lg(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(l=>l!==s&&n.has(l)))}return r}function cg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Cs(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=lg(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,y]of s)for(let b of y)o.push({blocker:b,blockee:m});let i=cg(e,t),l=new Map(r.map((m,y)=>[m,y])),a=r.slice(0,i).filter(m=>s.get(m).some(y=>Number(l.get(y))>Number(l.get(m)))),c=Dd(r.slice(i),o);if(c.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let u=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...c.order.map(m=>u.get(m))],corrections:c.corrections,cycle:!1,held:!1,mismatched:a}}function Pd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Cs(n,t)}function dg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function ug(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function pg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ta(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function fg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Ss(i,a));let r=new Map,s=new Map;for(let i of e){let l=Ss(i.a,i.b);r.set(l,i),s.set(l,i.type==="dep-add")}let o=[];for(let i of e){let l=Ss(i.a,i.b);r.get(l)===i&&s.get(l)!==n.has(l)&&o.push(i)}return o}function _g(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function mg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ko(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ca(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Rs(e){let t=pg(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=c=>{let u=e.owner_of.get(c);return typeof u!="string"||u.length===0?(s.refusal=ug(c),null):u};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(c,u,m)=>{if(s.refusal!==null||c===u)return;let y=t.get(c)||[];if(y.includes(u))return;let b=o(c);if(b!==null){if(Ta(t,u,c)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${c}\uAC00 \uC774\uBBF8 ${u}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(c,[...y,u]),m!==void 0&&r.add(Ss(c,u)),n.push({type:"dep-add",a:c,b:u,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(c,u)=>{if(s.refusal!==null||c===u)return;let m=t.get(c)||[];if(!m.includes(u))return;let y=o(c);y!==null&&(t.set(c,m.filter(b=>b!==u)),n.push({type:"dep-remove",a:c,b:u,root_dir:y}))},laneCreated:(c,u)=>r.has(Ss(c,u))}}function Os(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=fg(e.dep_ops,t.blocked_by_map),i=o.filter(u=>u.type==="dep-remove"),l=o.filter(u=>u.type==="dep-add"),a=s.disarm_ops??[],c=s.lane_id===void 0||s.correction===void 0?void 0:dg(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...c===void 0?{}:{correction:c}}}function Md(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Es(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Nd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||o.set(l,[...o.get(l)||[],i.bead_id])}for(let[i,l]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return s}function qd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let l=s.get(i)??0;r.push(Ko(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),s.set(i,l+1)}}function Ts(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Yo(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ra(e,t,n){let r=Rs(n),s=[],o=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),c=e.kind==="chain"?e.lane_id??a:void 0,u=c===void 0?void 0:n.cross_lanes.get(c);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:og};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ig};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ca(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&u===void 0)return{refused:Qr};let m=()=>{if(u===void 0||u.status!=="confirmed")return;let k=u.entries.findIndex(ee=>ee.bead_id===e.bead_id);if(k<0)return;let D=k>0?u.entries[k-1]:null,q=k+1<u.entries.length?u.entries[k+1]:null,Y=Es(u,k),ae=q!==null&&Es(u,k+1);Y&&D!==null&&r.removeDep(e.bead_id,D.bead_id),ae&&q!==null&&r.removeDep(q.bead_id,e.bead_id),(Y||ae)&&D!==null&&q!==null&&r.addDep(q.bead_id,D.bead_id,c)},y=(k,D)=>{let q=n.cross_lanes.get(k),Y=q.entries.findIndex(W=>W.bead_id===e.bead_id),ae=q.entries.filter(W=>W.bead_id!==e.bead_id),ee=Math.max(0,Math.min(ae.length,Y>=0&&D>Y?D-1:D)),j=-1;if(ae.forEach((W,Z)=>{n.fixed_members.has(W.bead_id)&&(j=Z)}),ee<=j){r.state.refusal=ag;return}let P=Y>=0?q.entries[Y]:u?.entries.find(W=>W.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Cs({status:q.status,entries:[...ae.slice(0,ee),P,...ae.slice(ee)]},n);let U=l.entries;if(Yo(U,q.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Ts(U)}}),q.status!=="confirmed")return;let X=U.findIndex(W=>W.bead_id===e.bead_id),V=X>0?U[X-1].bead_id:null,_e=X+1<U.length?U[X+1].bead_id:null;if(V===null){_e!==null&&r.addDep(_e,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),_e!==null&&(r.graph.get(_e)||[]).includes(V)){let W=q.entries.findIndex(Z=>Z.bead_id===_e);(r.laneCreated(_e,V)||W>0&&q.entries[W-1].bead_id===V&&Es(q,W))&&r.removeDep(_e,V),r.addDep(_e,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),u!==void 0&&(t.kind!=="chain"||t.lane_id!==c)&&(i.push(...Nd(n,u,c,u.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:c,entries:Ts(u.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=_g(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Ko(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let D=n.parallel_rows,q=D[Math.max(0,Math.min(D.length,t.marker_index))];if(!(!!q&&q.bead_id===e.bead_id)&&mg(n,e.root_dir)&&b!==void 0){let ae=b>k?k:k-1;ae>=0&&ae!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Ko(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Ko(e.bead_id,e.root_dir,t.index,t.lane_id));return Os(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Cs(n,t);if(r.held)return{refused:Vo};let s=r.entries,o=Rs(t),i=[];Md(o,s,e),o.state.refusal===null&&qd(o,t,s,i);let l=Yo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ts(s)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Os(o,t,l,i,{lane_id:e,correction:r})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Cs(n,t),s=r.entries,o=Rs(t),i=[];Md(o,s,e),o.state.refusal===null&&qd(o,t,s,i);let l=Yo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ts(s)}}];return Os(o,t,l,i,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Cs(n,t),s=r.entries;return Os(Rs(t),t,Yo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ts(s)}}],[],{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Rs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Es(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Os(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Nd(t,n,e,n.entries)})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Es(n,i)?r.push(l):s.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${Ca(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function zd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Hd(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function Oa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ca(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Gd={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Kd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Vd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let u=t.get(i.bead_id),m=typeof u=="number"&&u>0&&typeof i.finished_at=="number"&&u>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,c=o.get(i.bead_id);if(c){let u=Gd[c.run_state],m=Gd[l];if(u>m||u===m&&(c.started_at??0)>(a??0))continue}o.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:o,resumed_from_ids:r}}var Xo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ia=[...Xo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Zo=[...Xo,...nr],gg=Ia.filter(e=>Zo.includes(e)),Yd=["delegated","main"],Qo=["inherit","claude","codex"],Ls=["default","fast"],Is=["standard","fast_track"],Ds=["codex","opus","fable","self","skip"],Jo=["codex","fable","skip"],ei=["low","medium","high","xhigh"],En="auto";function Sn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xd(e){if(!Sn(e)||!Sn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))Sn(r)&&Sn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Xd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[En,...r.flatMap(([,s])=>s)]}function Zd(e,t,n,r){if(!Sn(e)||!Sn(e.runners))return[En];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!Sn(i)||!Sn(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==En&&l!==n)continue;let c=r(i,a);if(Array.isArray(c))for(let u of c)typeof u=="string"&&!s.includes(u)&&s.push(u)}return[En,...s]}function es(e,t,n){return Zd(e,t,n,(r,s)=>Sn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Da(e,t,n){return Zd(e,t,n,(r,s)=>Sn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Sn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ps(e,t){let n=Xd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Qd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Jr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!es(t,s,r.impl_model||En).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var bg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},La=[...gg,...nr],hg=[...Zo,...Ia].filter((e,t,n)=>n.indexOf(e)===t&&!La.includes(e));function Jd(e,t){let n=Sn(e)?e:{},r=Sn(t)?t:{},s=[];for(let i of La){let l=n[i]??null,a=r[i]??null;l!==a&&s.push({key:i,label:bg[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let o=[];for(let i of[...hg,...Object.keys(r)])!La.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function Pa(e,t,n,r,s,o){return zo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function eu(e,t){let n={};for(let r of Ia){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function tu(e,t){let n={};for(let r of nr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Ma=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],ur={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ti={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Na(e,t,n,r,s,o=null){let i=$n({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(l=>({key:l,...i[l]}))}function nu(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let l of Na(e,t,n,r,s,o))i[l.source]+=1;return i}function ru(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function su(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var d$=[...Xo,...nr];var ou=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Ms(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ni(e){if(!Ms(e)||!Ms(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Ms(n)&&Ms(n.models));return t.length>0?t:null}function Nn(e,t){let n=ni(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function iu(e,t){return Ms(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function au(e,t){let n=ni(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return iu(r,r.models[t]);return[]}function yg(e){let t=ni(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of iu(r,s))n.includes(o)||n.push(o);return n}function vg(e,t){if(!t)return yg(e);let r=ni(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of au(e,o))s.includes(i)||s.push(i);return s}function lu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Nn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?au(t,r.impl_model):vg(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var qa=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function cu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${ur[e]}: ${t.display} (${ti[t.source]})`}function Fa(e){return e.filter(t=>t!==null).join(`
`)}function Ns(e){if(typeof e!="object"||e===null)return null;let t=Ar(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ur.orchestration_model,e.model),n(ur.orchestration_effort,e.effort),n(ur.orchestration_speed,e.speed)])}}function Er(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),s=pr(e,"orchestration_speed"),o=cu([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",s)])}}function wg(e,t){return e===null||e.value===null||qa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function kg(e){return e===null||qa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function $g(e){return e===null?null:e.value==="auto"?"auto":qa.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),s=pr(e,"impl_model"),o=pr(e,"impl_effort"),i=pr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":cu([wg(r,t??null),kg(s),$g(o),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Fa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",s),fr("impl_effort",o),fr("impl_speed",i)])}}var xg=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var du={orchestration_model:["fable"],impl_runtime:["claude"]},Ag={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function uu(e){return typeof e=="object"&&e!==null?e:null}function pu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Sg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>xg.includes(t))}function ts(e,t=e){let n=uu(e);if(!n)return null;let r=pu(n.rec_orchestration_model,du.orchestration_model);if(r.length===0)return null;let s=pu(n.rec_impl_runtime,du.impl_runtime),o={orchestration_model:r};s.length>0&&(o.impl_runtime=s);let i=uu(t)||{},l=Object.keys(o),a=0,c=0;for(let m of l){let y=i[m];typeof y=="string"&&y.length>0&&(a+=1,y===o[m]&&(c+=1))}let u=a===0?"unapplied":c===l.length?"applied":"diverged";return{reasons:Sg(n.rec_reason),rec:o,state:u}}function ri(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=Ag[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function si(e){return e.replace(/\/+$/,"")}function Eg(e,t){let n=si(e),r=si(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function oi(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Eg(r,s))continue;let o=si(r),i=si(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function ii(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function _u(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Tr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ai(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function li(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,l=o.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function ci(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:ii(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function mu(e,t){let n=Tg(e,t);return n?d`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?d`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?sn(n.deploy.at):""}
            >${ci(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Tr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ns(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":d`<div class="worker-mini__meta">
    ${t?d`<span title=${`\uC0DD\uC131 ${sn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?d`<span>·</span>`:""}${n?d`<span title=${`\uC218\uC815 ${sn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Cg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function di(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,y)=>(m.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,a=s?Cg(s.phase):null,c=s?.kind==="stale_work_backup_fresh",u=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!l),label:c?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?c?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:a,error:l,confirmation:u}}function qs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return d`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?d`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?d`<code>백업: ${r}</code>`:t.error?d`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?d`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?d`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Rg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function gu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(c){return Number.isInteger(i[c])?Number(i[c]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Rg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ui(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return d`${e.orchestration?d`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?d`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Og(e){return d`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>d`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>d`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?d`<p class="mon-overlap__note">${t.action.text}</p>`:d`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function pi(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,s=Array.isArray(e.overlaps)?e.overlaps:[],o=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&s.length===0&&!o&&!l&&!a?"":d`<div class="worker-deps">
    ${l?d`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
        </button>`:""}
    ${a?d`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?d`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(c=>d`<span
          class=${`worker-dep worker-dep--pred${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?d`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${n.map(c=>d`<span
          class=${`worker-dep worker-dep--released${c.foreign?" worker-dep--foreign":""}`}
          title=${c.title||""}
          >${c.openable===!0?d`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${c.id}
                data-root-dir=${c.root_dir||""}
              >
                ${c.label}
              </button>`:c.label}</span
        >`)}${r?d`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${s.map(c=>d`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${c.id}
          aria-label=${`scope \uACB9\uCE68 ${c.id} (${c.location_label})`}
          title=${[`\uACB9\uCE68 ${c.id} (${c.location_label})`,...c.prefixes].join(`
`)}
        >
          ⧉ ${c.id}
        </button>`)}${o?d`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?Og(i):""}
  </div>`}function fi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?d`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Lg(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return d`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function bu(e){return e?d`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function _i(e){return e?d`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${ri(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function hu(e,t){return!e||typeof t!="number"?"":d`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function mi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return d`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Ig(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),s=wn(e.done_at);return d`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?d`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${hu(e.pr_url,e.pr_number)}${s?d`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${sn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>d`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>d`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?d`<span class="worker-usage" title=${As(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?d`<span
            class="worker-mini__work"
            title=${_u(e.work_kind)}
            >작업 ${Tr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Fn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Ig(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=an(e.usage),o=tr(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,c=a?wn(e.done_at):"",u=n?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?d`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",y=e.worker_serial===!0?d`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?d`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,D=e.lane==="done"?"":fi(e.workflow),q=e.lane==="done"?"":bu(e.from_id),Y=mi(e.priority),ae=d`<span class="worker-mini__title">${e.title}</span>`,ee=hu(e.pr_url,e.pr_number),j=e.completion_repair_pr_url&&e.completion_repair_pr_number?d`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",P=r.map($e=>$e===e.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${$e}</span
        >`:d`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${$e===e.completion_badge&&e.completion_title||""}
          >${$e}</span
        >`),U=e.reason?d`<span class="worker-mini__reason">${e.reason}</span>`:"",X=s.length>0?s.map($e=>d`<span class="worker-usage" title=${$e.tooltip}
              >${$e.label}</span
            >`):o?d`<span class="worker-usage" title=${As(e.usage)}
            >${o}</span
          >`:"",V=i?d`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?d`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",_e=e.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",W=e.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Z=e.discard,ie=Z?.action||e.discard_action?d`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Z?.attempt_id||""}
          data-operation-id=${Z?.operation?.operation_id||""}
          data-discard-mode=${Z?.confirmation||"unmerged"}
          ?disabled=${Z?!Z.enabled:e.discard_enabled===!1}
          title=${Z?Z.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Z?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,Ee=te?d`${te.can_resume||te.can_continue?d`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?d`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?d`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",He=te?d`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?d`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",pe=e.revise_action?d`<button
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
        </button>`:"",Q=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Te=_i(e.rec),Ie=b||D||q||Q||Te||X?d`<div class="worker-chips">
          ${b}${D}${q}${Q?ui(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Te}${X}
        </div>`:"",S=pi(e.dependency_chips),oe=qs(e),ye=t.actions?t.actions:"",ve=!!(i||e.merge_action||e.cancel_action||e.discard_action||Z?.operation||e.revise_action||te);return d`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?d`<div class="worker-mini__row1">
            ${b}${k}${Y}${q}${ee}${ae}${ye}
          </div>
          <div class="worker-mini__row2">
            ${X}${c?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${sn(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?d`<span
                  class="worker-mini__work"
                  title=${_u(e.work_kind)}
                  >작업 ${Tr(e.work_ms)}</span
                >`:""}${P}${V}
            <span class="worker-mini__actions"
              >${_e}${W}${ie}</span
            >
            ${ns(e)}
          </div>`:l?d`<div class="worker-mini__head">
              ${u}${m}${k}${Y}${ee}${j}${P}${y}${U}${ye}
            </div>
            <div class="worker-mini__body">${ae}${He}</div>
            ${S}${Ie}${ve?d`<div class="worker-mini__foot">
                  ${V}
                  <span class="worker-mini__actions"
                    >${_e}${W}${ie}${pe}${Ee}</span
                  >
                  ${qs(e)}
                </div>`:""}
            ${ns(e)}`:d`<div class="worker-mini__line">
              ${u}${m}${k}${Y}${ae}${ee}${j}${P}${y}${U}${V}${_e}${W}${ie}${ye}
            </div>
            ${S}${Ie}${oe} ${ns(e)}`}
  </div>`}function Dg(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(d`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(d`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?d`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return d`${r}`}var Pg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Ba(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=e.queue_placeable===!0&&!e.done&&!r,i=o&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Pg[e.session_preferred_reason||""]||"",c=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),y=pi(e.dependency_chips),b=e.workspace_name?d`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=fi(c),D=bu(e.from_id),q=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return d`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${mi(e.priority)}
      ${r?d`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?d`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${_i(e.rec)}${Lg(c)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?jo(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${y}
    ${b||k||D||q?d`<div class="worker-chips">
          ${b}${k}${D}${ui(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?d`<div class="worker-card__place-menu">
            ${Dg(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:d`${e.reason?d`<span
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
              ?disabled=${!o}
              title=${o?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${ns(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=d`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?d`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${kn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?d`<header class="worker-pane__hd">
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
        </header>`:d`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":d`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?d`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?Ba(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Fn(s))}
          </div>`}
  </section>`}function fu(e,t,n){return d`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function gi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return d`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${fu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":d`<div
            class="worker-wait__area-body"
            data-drop=${kn(r.drop)}
            data-root-dir=${kn(r.root_dir)}
            data-lane-id=${kn(r.lane_id)}
            data-lane-length=${kn(r.lane_length)}
          >
            ${t.rows.length===0?d`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${fu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":d`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>Mg(s))}
          </div>`}
    </section>
  </div>`}function Mg(e){let t=e.drop||{},n=e.badge?d`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return d`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:d`${n}${e.header_control?e.header_control:""}`,body:d`<div
        class="worker-wait__rows"
        data-drop=${kn(t.drop)}
        data-root-dir=${kn(t.root_dir)}
        data-lane-id=${kn(t.lane_id)}
        data-lane-length=${kn(t.lane_length)}
      >
        ${e.rows.length===0?d`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?d`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?d`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function bi(e){return e.count?d`<section
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
  </section>`:""}var yu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],js=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function hi(e,t){let n=yu.find(s=>s.step===e);if(!n)return null;let r=yu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function vu(e){let t=js.findIndex(n=>n.step===e);return js.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=js.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Ng(e){let t=js.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:js.length}}function yi(e){let t=Ng(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Wa=new Set(["queued","running","retry_pending"]),wu=new Set(["failed","succeeded"]),qg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bs.base_containment,child_sweep:Bs.child_sweep,branch_cleanup:Bs.branch_cleanup,parent_close:Bs.parent_close};function jg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Wa,...wu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ug(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=c=>c.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ua(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=qg[s];if(!o)return null;let i=hi(n,`${r} ${o}`);return i?{...i,active:Wa.has(s),failed:s==="failed"}:null}function Wg(e){return!e||typeof e!="object"?null:Fg[e.step]||null}function Us(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wg(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=jg(e.merge_sha)?e.merge_sha:null,a=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Bg(k,t,l)).sort(Ug):[],c=i?a:[],u=c.find(k=>Wa.has(k.state));if(u)return Ua(u);if(s)return s.step==="repo_operations"&&a[0]?Ua(a[0],!0):null;let m=c.find(k=>wu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Ua(m);if(r){let k=hi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Bs[e.cleanup_cursor]:null;if(!y)return null;let b=hi(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function vi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var zg="\uBBF8\uC801\uC7AC";function za(e,t){let n=vs(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Hg=10080*60*1e3;function ku(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Hg)return null;let s=vs(e,t.id),o=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${sn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...s?{foreign:!0}:{}};return s?o.length>0&&(i.openable=!0,i.root_dir=o):i.openable=!0,i}function $u(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(o=>typeof o=="string"&&o.length>0):[],r=t-n.length,s=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(o=>o.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${s.join(" ")}`}}function xu(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let c=za(o,{id:a,location_label:s.get(a)||zg}),u=n[a];c.foreign!==!0?c.openable=!0:typeof u=="string"&&u.length>0&&(c.openable=!0,c.root_dir=u),l.push(c)}l.length>0&&r.set(o,l)}return r}function Ha(e,t){return`${e}\0${t}`}function Au(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ga(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ws(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Su(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ws(s)})`,location_label:Ws(s),scope:null,same_lane_ahead:!1};let i=Ga(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Eu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=Ha(l.root_dir,a.id);n.set(c,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),s.set(c,[]);for(let u of Array.isArray(a.items)?a.items:[])r.set(u.id,c)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=Ha(l.root_dir,a.id),u=Array.isArray(a.items)?a.items[0]:null,y=!!u&&u.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],b=s.get(c);if(b)for(let k of y){let D=r.get(k);D&&D!==c&&!b.includes(D)&&b.push(D)}}let o=(l,a)=>{let c=new Set,u=[l];for(;u.length>0;){let m=u.pop();if(m===a)return!0;!m||c.has(m)||(c.add(m),u.push(...s.get(m)||[]))}return!1},i=new Map;for(let[l,a]of s){let c=[];for(let u of a){let m=n.get(u);o(u,l)&&m&&c.push(m)}c.length>0&&i.set(l,c)}return i}function Tu(e,t){return Ha(e,t)}var Cu=1,zs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Va=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rs={show_blocked:!0,spec:"all"},Ru={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Gg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Kg(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Sr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Vg(e,t){let{winners:n,resumed_from_ids:r}=Vd(e,t),s=new Map;for(let[o,i]of n){let l=i.attempt,a=i.run_state,c=i.started_at,u=typeof l.session_id=="string"&&l.session_id.length>0;s.set(o,{attempt_id:typeof l.attempt_id=="string"?l.attempt_id:"",run_state:a,started_at:c,last_event_at:typeof l.last_event_at=="number"?l.last_event_at:null,last_activity:l.last_activity&&typeof l.last_activity=="object"?l.last_activity:null,legs:Array.isArray(l.legs)?l.legs:[],runner:typeof l.runner=="string"?l.runner:null,model:typeof l.model=="string"?l.model:null,effort:typeof l.effort=="string"?l.effort:null,speed:typeof l.speed=="string"?l.speed:null,resumed_from:typeof l.resumed_from=="string"?l.resumed_from:null,continuation_mode:l.continuation_mode==="session"||l.continuation_mode==="fresh"?l.continuation_mode:null,status:typeof l.status=="string"?l.status:null,usage:On(e,l.bead_id),can_pause:a==="running"&&u,can_resume:a!=="running"&&u&&!r.has(l.attempt_id)})}return s}function Ou(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Dt(e){return e&&typeof e=="object"?e:{}}function Yg(e,t,n){let r=Dt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let l=y=>$n({pin:y,global:i,execution_defaults:s,runner_catalog:o,route:n}),a,c;try{a=l(r),c=l(null)}catch{return null}let u=Lu(Er(a,o),Er(c,o)),m=Lu(_r(a,null),_r(c,null));return u||m?{orchestration:u,worker:m}:null}function Lu(e,t){return!e||t&&t.text===e.text?null:e}function Iu(e,t){let n=Ga(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Xg(e,t,n){let r=t.get(e);if(!r)return Iu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ws(r)}function Zg(e,t,n,r){let s=t.get(e);if(!s)return{label:Iu(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),l=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${l} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ws(s),title:""}}function Qg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Jg(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function eb(e,t,n,r,s,o,i){let l=[];return e.forEach((a,c)=>{let u=typeof a.id=="string"?a.id:"";if(u.length===0)return;let m=a.status==="confirmed"?"confirmed":"draft",y=Array.isArray(a.entries)?a.entries:[],b=[];y.forEach((Y,ae)=>{let ee=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(ee.length===0)return;let j=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",P=n.get(ee),U=P?P.state:void 0,X=U==="running"||U==="pr_wait"||U==="done",V=!P||U==="runnable",_e=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,W=Zg(ee,n,r,t),Z=b.length>0?b[b.length-1].id:null,ie=m==="confirmed"&&Z!==null&&!(t.get(ee)||[]).includes(Z);b.push({id:ee,title:s.get(ee)||ee,root_dir:P?P.root_dir:j,workspace_name:P?P.workspace_name:o.get(j)||"",seq:ae+1,location_label:W.label,location_title:W.title,draggable:!X,fixed:X,done:U==="done",unplaced:V,mismatch:ie,..._e!==null?{queue_index:_e}:{}})}),b.forEach((Y,ae)=>{Y.seq=ae+1});let k=b.length>0&&b.every(Y=>Y.done),D=b.filter(Y=>!Y.fixed&&i.armed_by_bead.get(Y.id)!==u).map(Y=>Y.id),q=Jg(u,m,b,k,D,i);l.push({lane_id:u,status:m,draft:m==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:D,...q})}),l}function tb(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function nb(e,t,n,r,s){let o=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let c=`${a.root_dir}\0${a.id}`,u=o.get(c);if(u){u.cards.push(a);continue}let{scope:m,state:y}=tb(a,t,n);y!==void 0&&(a.scope_state=y),o.set(c,{cards:[a],scope:m})}let i=new Map;for(let a of o.values()){let c=a.cards[0].scope_state;if(c!==void 0)for(let y of a.cards)y.scope_state=c;if(a.scope.length===0)continue;let u=a.cards[0].root_dir,m=i.get(u);m?m.push(a):i.set(u,[a])}let l=(a,c,u)=>{let m=c.cards[0],y={id:m.id,title:m.title,location_label:Xg(m.id,r,s),prefixes:u};for(let b of a.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let a of i.values())for(let c=0;c<a.length;c+=1)for(let u=c+1;u<a.length;u+=1){let m=oi(a[c].scope,a[u].scope);m.length!==0&&(l(a[c],a[u],m),l(a[u],a[c],m))}}function Ka(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function wi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Hs(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...rs,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&zs.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&c.set(T.root_dir,T);let u=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);let m=[],y=[],b=[],k=[],D=[],q=[],Y=new Map,ae=new Map,ee=new Map,j=new Map,P=new Map,U=new Map,X=new Map,V=new Set,_e=new Map,W=new Map,Z=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let ce=T.root_dir,Le=T.name||ce,je=c.get(ce),Me=je&&typeof je.revision=="number"?je.revision:typeof T.revision=="number"?T.revision:0,et=Dt(T.attempts),bt=Dt(T.bead_titles);for(let[M,F]of Object.entries(bt))typeof F=="string"&&F.length>0&&Z.set(M,F);let Ve=Dt(T.bead_times),z=Dt(T.pr_observations),ne=Dt(T.admission),De=Dt(T.revise_parked),lt=Dt(T.merge_queue_state),it=Dt(T.cleanup_failed),Pe=Dt(T.discard_operations),Ue=Dt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&_e.set(ce,Dt(T.bead_scope));let dt=Dt(T.bead_workflow),tt=Dt(T.pr_activity),_t=Array.isArray(T.repo_operations)?T.repo_operations:[],Pt=Array.isArray(T.merge_queue)?T.merge_queue:[],Ft=new Set(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>M.bead_id)),Ht=new Map(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>[M.bead_id,M])),Mt=Array.isArray(T.queue)?T.queue:[];for(let M of[...Mt,...Array.isArray(T.pr_wait)?T.pr_wait:[]])M&&typeof M.bead_id=="string"&&typeof M.armed_by_lane=="string"&&M.armed_by_lane.length>0&&U.set(M.bead_id,M.armed_by_lane);for(let M of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof M=="string"&&M.length>0&&V.add(M);let Nt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(M=>M&&/^s[1-5]$/.test(M.id)&&Array.isArray(M.entries)),wt=Dt(T.lane_states),We=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Nt.length);ee.set(ce,We),j.set(ce,Mt.length);let O=new Map(Nt.map(M=>[M.id,M])),J=new Map;for(let M of Nt)for(let F of M.entries)F&&typeof F.bead_id=="string"&&J.set(F.bead_id,M.id);for(let[M,F]of Object.entries(Ue))Array.isArray(F)&&P.set(M,F.filter(we=>typeof we=="string"&&we.length>0));let me=Array.isArray(T.done)?T.done:[];for(let M of me)M&&typeof M.bead_id=="string"&&q.push({id:M.bead_id,root_dir:ce,workspace_name:Le});let E=new Map;for(let M of me)M&&typeof M.bead_id=="string"&&typeof M.added_at=="number"&&E.set(M.bead_id,M.added_at);let G=M=>({id:M,title:bt[M]||M,root_dir:ce,workspace_name:Le,expected_revision:Me,draggable:!1,...Dt(Ve[M]).created_at?{created_at:Dt(Ve[M]).created_at}:{},...Dt(Ve[M]).updated_at?{updated_at:Dt(Ve[M]).updated_at}:{}}),Re=M=>{let F=dt[M]?.chips?.pr;return F&&typeof F.number=="number"&&typeof F.url=="string"?{pr_number:F.number,pr_url:F.url}:{}},ze=M=>Object.hasOwn(Ue,M)?{blocked_by:Array.isArray(Ue[M])?Ue[M].filter(F=>typeof F=="string"&&F.length>0):[]}:{},xe=new Set;for(let[M,F]of Vg(et,E)){xe.add(M);let we=F.run_state==="failed"?Qg(et,F.attempt_id):null;we!==null&&X.set(M,we),y.push({...G(M),lane:"running",...ze(M),...J.has(M)?{serial_lane_id:J.get(M)}:{},attempt_id:F.attempt_id,run_state:F.run_state,status:F.status||void 0,workflow:dt[M]||null,can_pause:F.can_pause,can_resume:F.can_resume,started_at:F.started_at,last_event_at:F.last_event_at,last_activity:F.last_activity,legs:F.legs,runner:F.runner,model:F.model,effort:F.effort,speed:F.speed,resumed_from:F.resumed_from,continuation_mode:F.continuation_mode,usage:F.usage,exec_chips:{orchestration:Ns(F),worker:null},discard:qn(Pe,M,{attempt_id:F.attempt_id}),badges:F.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:F.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:F.run_state==="failed"})}for(let[M,F]of Kd(et)){if(y.some(ke=>ke.id===M))continue;let we=F.attempt,Xe=F.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...G(M),lane:"running",kind:"session",...ze(M),attempt_id:typeof we.attempt_id=="string"?we.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[M]||null,can_pause:!1,can_resume:!1,started_at:F.started_at,last_event_at:typeof we.last_event_at=="number"?we.last_event_at:null,last_activity:we.last_activity&&typeof we.last_activity=="object"?we.last_activity:null,legs:Array.isArray(we.legs)?we.legs:[],runner:typeof we.runner=="string"?we.runner:null,model:typeof we.model=="string"?we.model:null,effort:typeof we.effort=="string"?we.effort:null,speed:typeof we.speed=="string"?we.speed:null,resumed_from:null,continuation_mode:null,usage:we.usage&&typeof we.usage=="object"?we.usage:null,exec_chips:{orchestration:Ns(we),worker:null},discard:qn(Pe,M,{merge_queued:!0}),badges:[F.origin==="auto"?`${Xe} \xB7 \uC790\uB3D9`:Xe],alert:!1})}for(let M of Array.isArray(T.session_active)?T.session_active:[]){let F=M&&M.bead_id;typeof F!="string"||xe.has(F)||(xe.add(F),Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&P.set(F,M.blocked_by.filter(we=>typeof we=="string"&&we.length>0)),typeof M.title=="string"&&M.title.length>0&&Z.set(F,M.title),y.push({...G(F),title:M.title||bt[F]||F,lane:"running",kind:"session",status:"in_progress",started_at:Ka(M.started_at)??Ka(M.updated_at)??void 0,updated_at:Ka(M.updated_at)??void 0,workflow:M.workflow||null,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(we=>typeof we=="string"&&we.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(M.session_refs)?M.session_refs:[],badges:[],alert:!1}))}for(let M of Array.isArray(T.pr_wait)?T.pr_wait:[]){let F=M&&M.bead_id;if(typeof F!="string"||xe.has(F))continue;xe.add(F);let we=Dt(z[F]),Xe=Dt(we.pr),ke=we.gate?Dt(we.gate):null,Ze=Ft.has(F),ot=Ht.get(F)?.continuation_action||null,mt=!!ot&&ot.continuation===null,$t=lt.active===F,Kt=M.external===!0,Et=it[F]||null,Jt=Dt(tt[F]),Ne=Us({bead_id:F,merge_sha:M.merge_sha,cleanup_cursor:M.cleanup_cursor,merge_progress:Jt.merge_progress||null,cleanup_failed:Et,repo_operations:_t}),mn=vi(Ne),en=!!ke&&ke.base_badge==="\uCDA9\uB3CC",jt=!!Et&&["child_sweep","branch_cleanup","parent_close"].includes(Et.step)&&!!ke&&ke.tier==="merged",Qt=Kt&&!!Et&&!!ke&&ke.tier==="merged",gn=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier)&&ke.reason!=="review_receipt_undetermined",fe=qn(Pe,F,{external:Kt,merge_active:$t||Ne?.step==="merge",merge_queued:Ze,cleanup_active:mn,merged:!!Et||ke?.tier==="merged"}),A=!!fe.operation;b.push({...G(F),lane:"pr_wait",...ze(F),workflow:dt[F]||null,pr_number:typeof Xe.number=="number"?Xe.number:null,pr_url:typeof Xe.url=="string"?Xe.url:void 0,external:Kt,usage:On(et,F),merge_step:Ne,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ne?[ke?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Et?[Cr(Et.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(Et.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:Ne?Ne.failed===!0:!!Et||gn,reason:Et&&Ne?.active!==!0?yi(Et.step):"PR \uB300\uAE30",merge_action:ke?.tier==="merged"&&!jt&&!Qt?!1:!Ze||mt,merge_enabled:!A&&(mt||ke?.enabled===!0||en||jt||Qt),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Qt||jt?"\uC815\uB9AC \uC7AC\uAC1C":en&&!jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":en?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ze&&!mt,cancel_enabled:!$t,continuation_mismatch:ot?.mismatch||null,discard:fe,discard_action:fe.action,discard_enabled:fe.enabled,discard_title:fe.title})}let at=(M,F,we,Xe)=>{let ke=M&&M.bead_id;if(typeof ke!="string"||xe.has(ke))return null;xe.add(ke);let Ze=De[ke],ot=qn(Pe,ke),mt=ot.operation?ot:null,$t={...G(ke),lane:F,workflow:dt[ke]||null,draggable:!mt,discard:mt||void 0,reason:Ou(ne,ke),seq:we+1,queue_position:we+1,queue_index:we,queue_length:Xe,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!mt,revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Kt=ze(ke);return Object.hasOwn(Kt,"blocked_by")&&($t.blocked_by=Kt.blocked_by),$t};for(let M=0;M<Mt.length;M++){let F=at(Mt[M],"queue",M,Mt.length);if(!F)continue;k.push(F);let we=Y.get(ce);we?we.push(F):Y.set(ce,[F])}let st=M=>{let F=b.find(Ze=>Ze.id===M&&Ze.root_dir===ce);if(F)return{id:M,title:F.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let we=y.find(Ze=>Ze.id===M&&Ze.root_dir===ce),Xe=we?we.run_state:Gg(et,M),ke=Xe==="failed"||Xe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Xe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:M,title:we?we.title:G(M).title,badge:ke}},he=[];for(let M=0;M<Math.max(We,Nt.length);M++){let F=`s${M+1}`,we=O.get(F),Xe=we&&Array.isArray(we.entries)?we.entries:[],ke=Dt(wt[F]),Ze=Array.isArray(ke.occupied_by)?ke.occupied_by.filter($t=>typeof $t=="string"):[],ot=new Set(Ze),mt=[];for(let $t=0;$t<Xe.length;$t++){let Kt=Xe[$t]&&Xe[$t].bead_id;if(typeof Kt=="string"&&ot.has(Kt)){xe.add(Kt);continue}let Et=at(Xe[$t],F,$t,Xe.length);Et&&(mt.push(Et),k.push(Et))}mt.length===0&&Ze.length===0&&(We<=1||M>=We)||he.push({id:F,index:M,items:mt,raw_length:Xe.length,occupied_by:Ze,occupants:Ze.map($t=>st($t)),corrections:Array.isArray(ke.corrections)?ke.corrections.length:0,cycle:ke.cycle===!0,...mt.length===0&&Ze.length===0?{empty:!0}:{}})}ae.set(ce,he);let Je=Array.from({length:We},(M,F)=>{let we=`s${F+1}`,Xe=O.get(we),ke=Xe&&Array.isArray(Xe.entries)?Xe.entries:[],Ze=Dt(wt[we]);return{id:we,index:ke.length,length:ke.length,occupied_by:Array.isArray(Ze.occupied_by)?Ze.occupied_by.filter(ot=>typeof ot=="string"):[]}});for(let M of Array.isArray(T.runnable)?T.runnable:[]){let F=M&&M.bead_id;if(typeof F!="string"||xe.has(F))continue;xe.add(F);let we=M.workflow&&typeof M.workflow=="object"?M.workflow:null,Xe=we&&typeof we.route=="string"&&we.route||(typeof M.route=="string"?M.route:null),ke=Yg(Dt(je),M.exec_pins,Xe),Ze=ts(M.rec,M.exec_pins);Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&P.set(F,M.blocked_by.filter(ot=>typeof ot=="string"&&ot.length>0)),typeof M.title=="string"&&M.title.length>0&&Z.set(F,M.title),Array.isArray(M.scope)&&W.set(F,M.scope.filter(ot=>typeof ot=="string"&&ot.length>0)),m.push({...G(F),title:M.title||bt[F]||F,lane:"runnable",draggable:!0,queue_placeable:!0,reason:Ou(ne,F),created_at:M.created_at??void 0,updated_at:M.updated_at??void 0,status:typeof M.status=="string"?M.status:void 0,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",published:M.published===!0,workflow:we||(Xe?{route:Xe,chips:{route:Xe}}:null),...ke?{exec_chips:ke}:{},...Ze?{rec:Ze}:{},blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(ot=>typeof ot=="string"&&ot.length>0)}:{},place_index:Mt.length,place_lanes:Je})}for(let M of me){let F=M&&M.bead_id;if(typeof F!="string"||xe.has(F)||(xe.add(F),o!==void 0&&typeof M.added_at=="number"&&M.added_at<o))continue;let we=Kg(et,F),Xe=we&&typeof we.done_kind=="string"?we.done_kind:null;D.push({...G(F),lane:"done",done:!0,done_layout:"three_line",usage:On(et,F),work_ms:li(et,F),done_at:typeof M.added_at=="number"?M.added_at:void 0,done_kind:Xe,...Re(F),badges:[...Xe&&Ru[Xe]?[Ru[Xe]]:[],...ai(et,F)]})}}let ie=new Map;s.forEach((T,ce)=>{T&&typeof T.root_dir=="string"&&ie.set(T.root_dir,ce)});let te=n&&n.running_sort==="repo"?"repo":"started";y.sort((T,ce)=>{let Le=T.kind==="session",je=ce.kind==="session";if(Le!==je)return Le?1:-1;if(Le&&je){let bt=wi(ce.updated_at)-wi(T.updated_at);return bt!==0?bt:T.id.localeCompare(ce.id)}if(te==="repo"){let bt=ie.get(T.root_dir)??Number.MAX_SAFE_INTEGER,Ve=ie.get(ce.root_dir)??Number.MAX_SAFE_INTEGER;if(bt!==Ve)return bt-Ve}let Me=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,et=typeof ce.started_at=="number"&&Number.isFinite(ce.started_at)?ce.started_at:null;return Me!==null&&et!==null&&Me!==et?Me-et:Me===null&&et!==null?1:Me!==null&&et===null?-1:T.id.localeCompare(ce.id)}),D.sort((T,ce)=>(ce.done_at??0)-(T.done_at??0));let Ee=s.length>0?s:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),He=new Set(m.map(T=>T.root_dir)),pe=[];for(let T of Ee){if(!T||typeof T.root_dir!="string")continue;let ce=Y.get(T.root_dir)||[],Le=ae.get(T.root_dir)||[];!(ce.length>0||Le.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!He.has(T.root_dir)||pe.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=Cu?T.slots:Cu,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:Dt(T.runner_catalog),items:ce,sublanes:{parallel:ce,serial:Le},serial_lane_count:ee.get(T.root_dir)||0,raw_queue_length:j.get(T.root_dir)||0})}let Q={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat",queue:k,queue_groups:pe,running:y,pr_wait:b,done:D,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Te=Au(Q);for(let T of q)Te.has(T.id)||Te.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let ce=Te.get(T.id);T.blockers=(T.blocked_by||[]).map(Le=>Su(Le,ce,Te,s))}for(let T of[...Q.queue,...Q.runnable,...Q.running,...Q.pr_wait]){let ce=(T.blockers||[]).map(je=>{let Me=Te.get(je.id)?.root_dir;return{...za(T.id,je),openable:!0,...typeof Me=="string"&&Me.length>0?{root_dir:Me}:{}}});if(ce.length===0)continue;let Le={predecessors:ce};T.dependency_chips=Le}nb(Q,_e,W,Te,s);let Ie=Eu(Q.queue_groups);for(let T of Q.queue_groups)for(let ce of T.sublanes.serial){let Le=Ie.get(Tu(T.root_dir,ce.id));Le&&(ce.cross_wait_peers=Le)}Q.chain_lanes=eb(l&&Array.isArray(l.lanes)?l.lanes:[],P,Te,s,Z,u,{armed_by_bead:U,failed_by_bead:X,disarmed_lanes:V});let S=new Map;for(let T of[...Q.queue,...Q.runnable])S.has(T.id)||S.set(T.id,T);let oe=new Set;for(let T of Q.chain_lanes)for(let ce of T.rows){if(T.status==="confirmed"&&!ce.unplaced&&!ce.fixed&&oe.add(ce.id),!T.draft&&!ce.unplaced)continue;let Le=S.get(ce.id);Le&&(Le.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let ye=new Map(Q.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...Q.queue,...Q.running]){let ce=U.get(T.id);if(typeof ce!="string"||ce.length===0)continue;let Le=ye.get(ce);T.armed_lane_chip=Le===void 0?{lane_id:ce,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ce,label:`\u25B6 \uC5F0\uACB0 ${Le}`,orphan:!1}}let ve=[];for(let T of Y.values())for(let ce of T)oe.has(ce.id)||ve.push(ce);ve.sort((T,ce)=>{let Le=T.workspace_name.localeCompare(ce.workspace_name);return Le!==0?Le:(T.queue_index??0)-(ce.queue_index??0)}),Q.parallel_rows=ve;let $e={};for(let[T,ce]of Te)typeof ce.root_dir=="string"&&ce.root_dir.length>0&&($e[T]=ce.root_dir);for(let T of Q.chain_lanes)for(let ce of T.rows)!Object.hasOwn($e,ce.id)&&ce.root_dir.length>0&&u.has(ce.root_dir)&&($e[ce.id]=ce.root_dir);Q.owner_of=$e;let be=Q.runnable.length;Q.runnable_all=Q.runnable.slice();let Oe=Q.runnable;i.show_blocked||(Oe=Oe.filter(T=>T.blocked!==!0));let Ke=Oe.length;i.spec==="with"?Oe=Oe.filter(T=>T.published===!0):i.spec==="without"&&(Oe=Oe.filter(T=>T.published!==!0)),Q.runnable_hidden={blocked:be-Ke,spec:Ke-Oe.length};let yt=(T,ce)=>{let Le=wi(ce.updated_at)-wi(T.updated_at);return Le!==0?Le:T.id.localeCompare(ce.id)},ct=a==="repo_spec"?(T,ce)=>{let Le=T.published===!0?0:1,je=ce.published===!0?0:1;return Le!==je?Le-je:yt(T,ce)}:yt;if(a==="updated_flat")Q.runnable=Oe.slice().sort(yt),Q.runnable_sections=[];else{let T=new Map;for(let je of Oe){let Me=T.get(je.root_dir);Me?Me.push(je):T.set(je.root_dir,[je])}let ce=[],Le=[];for(let je of Ee){if(!je||typeof je.root_dir!="string")continue;let Me=(T.get(je.root_dir)||[]).slice().sort(ct);T.delete(je.root_dir),Me.length!==0&&(ce.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Me.map(et=>({...et,workspace_name:""}))}),Le.push(...Me))}for(let[je,Me]of T){let et=Me.slice().sort(ct);ce.push({root_dir:je,name:et[0]?.workspace_name||je,items:et.map(bt=>({...bt,workspace_name:""}))}),Le.push(...et)}Q.runnable=Le,Q.runnable_sections=ce}return Q}var rb="\uC0AC\uC774\uD074";function sb(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[o,i]of Object.entries(s))Array.isArray(i)&&t.set(o,n(i));for(let o of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])o&&typeof o.bead_id=="string"&&Array.isArray(o.blocked_by)&&o.blocked_by.length>0&&t.set(o.bead_id,n(o.blocked_by))}return t}function Ya(e,t,n){let r=Hs(e,t),s=[],o=new Set,i=(a,c)=>{for(let u of a)o.has(u.id)||(o.add(u.id),s.push({bead_id:u.id,root_dir:u.root_dir,workspace_name:u.workspace_name,title:u.title,lane:c}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?s:s.filter(a=>a.root_dir===l),blocked_by_map:sb(e)}}function Du(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let l=Ta(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:l,...l?{reason:rb}:{}})}return o.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,c=r!==void 0&&l.root_dir===r;return a!==c?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),o}function Pu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:zu,setPrototypeOf:Mu,isFrozen:ob,getPrototypeOf:ib,getOwnPropertyDescriptor:ab}=Object,{freeze:pn,seal:Ln,create:nl}=Object,{apply:rl,construct:sl}=typeof Reflect<"u"&&Reflect;pn||(pn=function(t){return t});Ln||(Ln=function(t){return t});rl||(rl=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});sl||(sl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var ki=fn(Array.prototype.forEach),lb=fn(Array.prototype.lastIndexOf),Nu=fn(Array.prototype.pop),Gs=fn(Array.prototype.push),cb=fn(Array.prototype.splice),xi=fn(String.prototype.toLowerCase),Xa=fn(String.prototype.toString),Za=fn(String.prototype.match),Ks=fn(String.prototype.replace),db=fn(String.prototype.indexOf),ub=fn(String.prototype.trim),jn=fn(Object.prototype.hasOwnProperty),un=fn(RegExp.prototype.test),Vs=pb(TypeError);function fn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return rl(e,t,r)}}function pb(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return sl(e,n)}}function gt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xi;Mu&&Mu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(ob(t)||(t[r]=o),s=o)}e[s]=!0}return e}function fb(e){for(let t=0;t<e.length;t++)jn(e,t)||(e[t]=null);return e}function rr(e){let t=nl(null);for(let[n,r]of zu(e))jn(e,n)&&(Array.isArray(r)?t[n]=fb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=rr(r):t[n]=r);return t}function Ys(e,t){for(;e!==null;){let r=ab(e,t);if(r){if(r.get)return fn(r.get);if(typeof r.value=="function")return fn(r.value)}e=ib(e)}function n(){return null}return n}var qu=pn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Qa=pn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ja=pn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_b=pn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),el=pn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mb=pn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fu=pn(["#text"]),ju=pn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),tl=pn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bu=pn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),$i=pn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),gb=Ln(/\{\{[\w\W]*|[\w\W]*\}\}/gm),bb=Ln(/<%[\w\W]*|[\w\W]*%>/gm),hb=Ln(/\$\{[\w\W]*/gm),yb=Ln(/^data-[\-\w.\u00B7-\uFFFF]+$/),vb=Ln(/^aria-[\-\w]+$/),Hu=Ln(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),wb=Ln(/^(?:\w+script|data):/i),kb=Ln(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Gu=Ln(/^html$/i),$b=Ln(/^[a-z][.\w]*(-[.\w]+)+$/i),Uu=Object.freeze({__proto__:null,ARIA_ATTR:vb,ATTR_WHITESPACE:kb,CUSTOM_ELEMENT:$b,DATA_ATTR:yb,DOCTYPE_NAME:Gu,ERB_EXPR:bb,IS_ALLOWED_URI:Hu,IS_SCRIPT_OR_DATA:wb,MUSTACHE_EXPR:gb,TMPLIT_EXPR:hb}),Xs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},xb=function(){return typeof window>"u"?null:window},Ab=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Wu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ku(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xb(),t=fe=>Ku(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Xs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:y,trustedTypes:b}=e,k=a.prototype,D=Ys(k,"cloneNode"),q=Ys(k,"remove"),Y=Ys(k,"nextSibling"),ae=Ys(k,"childNodes"),ee=Ys(k,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let j,P="",{implementation:U,createNodeIterator:X,createDocumentFragment:V,getElementsByTagName:_e}=n,{importNode:W}=r,Z=Wu();t.isSupported=typeof zu=="function"&&typeof ee=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:te,TMPLIT_EXPR:Ee,DATA_ATTR:He,ARIA_ATTR:pe,IS_SCRIPT_OR_DATA:Q,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:Ie}=Uu,{IS_ALLOWED_URI:S}=Uu,oe=null,ye=gt({},[...qu,...Qa,...Ja,...el,...Fu]),ve=null,$e=gt({},[...ju,...tl,...Bu,...$i]),be=Object.seal(nl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,Ke=null,yt=Object.seal(nl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),St=!0,ct=!0,T=!1,ce=!0,Le=!1,je=!0,Me=!1,et=!1,bt=!1,Ve=!1,z=!1,ne=!1,De=!0,lt=!1,it="user-content-",Pe=!0,Ue=!1,dt={},tt=null,_t=gt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Ft=gt({},["audio","video","img","source","image","track"]),Ht=null,Mt=gt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",wt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",O=We,J=!1,me=null,E=gt({},[Nt,wt,We],Xa),G=gt({},["mi","mo","mn","ms","mtext"]),Re=gt({},["annotation-xml"]),ze=gt({},["title","style","font","a","script"]),xe=null,at=["application/xhtml+xml","text/html"],st="text/html",he=null,Je=null,M=n.createElement("form"),F=function(A){return A instanceof RegExp||A instanceof Function},we=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===A)){if((!A||typeof A!="object")&&(A={}),A=rr(A),xe=at.indexOf(A.PARSER_MEDIA_TYPE)===-1?st:A.PARSER_MEDIA_TYPE,he=xe==="application/xhtml+xml"?Xa:xi,oe=jn(A,"ALLOWED_TAGS")?gt({},A.ALLOWED_TAGS,he):ye,ve=jn(A,"ALLOWED_ATTR")?gt({},A.ALLOWED_ATTR,he):$e,me=jn(A,"ALLOWED_NAMESPACES")?gt({},A.ALLOWED_NAMESPACES,Xa):E,Ht=jn(A,"ADD_URI_SAFE_ATTR")?gt(rr(Mt),A.ADD_URI_SAFE_ATTR,he):Mt,Pt=jn(A,"ADD_DATA_URI_TAGS")?gt(rr(Ft),A.ADD_DATA_URI_TAGS,he):Ft,tt=jn(A,"FORBID_CONTENTS")?gt({},A.FORBID_CONTENTS,he):_t,Oe=jn(A,"FORBID_TAGS")?gt({},A.FORBID_TAGS,he):rr({}),Ke=jn(A,"FORBID_ATTR")?gt({},A.FORBID_ATTR,he):rr({}),dt=jn(A,"USE_PROFILES")?A.USE_PROFILES:!1,St=A.ALLOW_ARIA_ATTR!==!1,ct=A.ALLOW_DATA_ATTR!==!1,T=A.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=A.SAFE_FOR_TEMPLATES||!1,je=A.SAFE_FOR_XML!==!1,Me=A.WHOLE_DOCUMENT||!1,Ve=A.RETURN_DOM||!1,z=A.RETURN_DOM_FRAGMENT||!1,ne=A.RETURN_TRUSTED_TYPE||!1,bt=A.FORCE_BODY||!1,De=A.SANITIZE_DOM!==!1,lt=A.SANITIZE_NAMED_PROPS||!1,Pe=A.KEEP_CONTENT!==!1,Ue=A.IN_PLACE||!1,S=A.ALLOWED_URI_REGEXP||Hu,O=A.NAMESPACE||We,G=A.MATHML_TEXT_INTEGRATION_POINTS||G,Re=A.HTML_INTEGRATION_POINTS||Re,be=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&F(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&F(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(ct=!1),z&&(Ve=!0),dt&&(oe=gt({},Fu),ve=[],dt.html===!0&&(gt(oe,qu),gt(ve,ju)),dt.svg===!0&&(gt(oe,Qa),gt(ve,tl),gt(ve,$i)),dt.svgFilters===!0&&(gt(oe,Ja),gt(ve,tl),gt(ve,$i)),dt.mathMl===!0&&(gt(oe,el),gt(ve,Bu),gt(ve,$i))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?yt.tagCheck=A.ADD_TAGS:(oe===ye&&(oe=rr(oe)),gt(oe,A.ADD_TAGS,he))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?yt.attributeCheck=A.ADD_ATTR:(ve===$e&&(ve=rr(ve)),gt(ve,A.ADD_ATTR,he))),A.ADD_URI_SAFE_ATTR&&gt(Ht,A.ADD_URI_SAFE_ATTR,he),A.FORBID_CONTENTS&&(tt===_t&&(tt=rr(tt)),gt(tt,A.FORBID_CONTENTS,he)),Pe&&(oe["#text"]=!0),Me&&gt(oe,["html","head","body"]),oe.table&&(gt(oe,["tbody"]),delete Oe.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=A.TRUSTED_TYPES_POLICY,P=j.createHTML("")}else j===void 0&&(j=Ab(b,s)),j!==null&&typeof P=="string"&&(P=j.createHTML(""));pn&&pn(A),Je=A}},Xe=gt({},[...Qa,...Ja,..._b]),ke=gt({},[...el,...mb]),Ze=function(A){let ue=ee(A);(!ue||!ue.tagName)&&(ue={namespaceURI:O,tagName:"template"});let Ce=xi(A.tagName),vt=xi(ue.tagName);return me[A.namespaceURI]?A.namespaceURI===wt?ue.namespaceURI===We?Ce==="svg":ue.namespaceURI===Nt?Ce==="svg"&&(vt==="annotation-xml"||G[vt]):!!Xe[Ce]:A.namespaceURI===Nt?ue.namespaceURI===We?Ce==="math":ue.namespaceURI===wt?Ce==="math"&&Re[vt]:!!ke[Ce]:A.namespaceURI===We?ue.namespaceURI===wt&&!Re[vt]||ue.namespaceURI===Nt&&!G[vt]?!1:!ke[Ce]&&(ze[Ce]||!Xe[Ce]):!!(xe==="application/xhtml+xml"&&me[A.namespaceURI]):!1},ot=function(A){Gs(t.removed,{element:A});try{ee(A).removeChild(A)}catch{q(A)}},mt=function(A,ue){try{Gs(t.removed,{attribute:ue.getAttributeNode(A),from:ue})}catch{Gs(t.removed,{attribute:null,from:ue})}if(ue.removeAttribute(A),A==="is")if(Ve||z)try{ot(ue)}catch{}else try{ue.setAttribute(A,"")}catch{}},$t=function(A){let ue=null,Ce=null;if(bt)A="<remove></remove>"+A;else{let xt=Za(A,/^[\r\n\t ]+/);Ce=xt&&xt[0]}xe==="application/xhtml+xml"&&O===We&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let vt=j?j.createHTML(A):A;if(O===We)try{ue=new y().parseFromString(vt,xe)}catch{}if(!ue||!ue.documentElement){ue=U.createDocument(O,"template",null);try{ue.documentElement.innerHTML=J?P:vt}catch{}}let Tt=ue.body||ue.documentElement;return A&&Ce&&Tt.insertBefore(n.createTextNode(Ce),Tt.childNodes[0]||null),O===We?_e.call(ue,Me?"html":"body")[0]:Me?ue.documentElement:Tt},Kt=function(A){return X.call(A.ownerDocument||A,A,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Et=function(A){return A instanceof m&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof u)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Jt=function(A){return typeof l=="function"&&A instanceof l};function Ne(fe,A,ue){ki(fe,Ce=>{Ce.call(t,A,ue,Je)})}let mn=function(A){let ue=null;if(Ne(Z.beforeSanitizeElements,A,null),Et(A))return ot(A),!0;let Ce=he(A.nodeName);if(Ne(Z.uponSanitizeElement,A,{tagName:Ce,allowedTags:oe}),je&&A.hasChildNodes()&&!Jt(A.firstElementChild)&&un(/<[/\w!]/g,A.innerHTML)&&un(/<[/\w!]/g,A.textContent)||A.nodeType===Xs.progressingInstruction||je&&A.nodeType===Xs.comment&&un(/<[/\w]/g,A.data))return ot(A),!0;if(!(yt.tagCheck instanceof Function&&yt.tagCheck(Ce))&&(!oe[Ce]||Oe[Ce])){if(!Oe[Ce]&&jt(Ce)&&(be.tagNameCheck instanceof RegExp&&un(be.tagNameCheck,Ce)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Ce)))return!1;if(Pe&&!tt[Ce]){let vt=ee(A)||A.parentNode,Tt=ae(A)||A.childNodes;if(Tt&&vt){let xt=Tt.length;for(let Bt=xt-1;Bt>=0;--Bt){let nn=D(Tt[Bt],!0);nn.__removalCount=(A.__removalCount||0)+1,vt.insertBefore(nn,Y(A))}}}return ot(A),!0}return A instanceof a&&!Ze(A)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&un(/<\/no(script|embed|frames)/i,A.innerHTML)?(ot(A),!0):(Le&&A.nodeType===Xs.text&&(ue=A.textContent,ki([ie,te,Ee],vt=>{ue=Ks(ue,vt," ")}),A.textContent!==ue&&(Gs(t.removed,{element:A.cloneNode()}),A.textContent=ue)),Ne(Z.afterSanitizeElements,A,null),!1)},en=function(A,ue,Ce){if(De&&(ue==="id"||ue==="name")&&(Ce in n||Ce in M))return!1;if(!(ct&&!Ke[ue]&&un(He,ue))){if(!(St&&un(pe,ue))){if(!(yt.attributeCheck instanceof Function&&yt.attributeCheck(ue,A))){if(!ve[ue]||Ke[ue]){if(!(jt(A)&&(be.tagNameCheck instanceof RegExp&&un(be.tagNameCheck,A)||be.tagNameCheck instanceof Function&&be.tagNameCheck(A))&&(be.attributeNameCheck instanceof RegExp&&un(be.attributeNameCheck,ue)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(ue,A))||ue==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&un(be.tagNameCheck,Ce)||be.tagNameCheck instanceof Function&&be.tagNameCheck(Ce))))return!1}else if(!Ht[ue]){if(!un(S,Ks(Ce,Te,""))){if(!((ue==="src"||ue==="xlink:href"||ue==="href")&&A!=="script"&&db(Ce,"data:")===0&&Pt[A])){if(!(T&&!un(Q,Ks(Ce,Te,"")))){if(Ce)return!1}}}}}}}return!0},jt=function(A){return A!=="annotation-xml"&&Za(A,Ie)},Qt=function(A){Ne(Z.beforeSanitizeAttributes,A,null);let{attributes:ue}=A;if(!ue||Et(A))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},vt=ue.length;for(;vt--;){let Tt=ue[vt],{name:xt,namespaceURI:Bt,value:nn}=Tt,rn=he(xt),Tn=nn,Ot=xt==="value"?Tn:ub(Tn);if(Ce.attrName=rn,Ce.attrValue=Ot,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,Ne(Z.uponSanitizeAttribute,A,Ce),Ot=Ce.attrValue,lt&&(rn==="id"||rn==="name")&&(mt(xt,A),Ot=it+Ot),je&&un(/((--!?|])>)|<\/(style|title|textarea)/i,Ot)){mt(xt,A);continue}if(rn==="attributename"&&Za(Ot,"href")){mt(xt,A);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){mt(xt,A);continue}if(!ce&&un(/\/>/i,Ot)){mt(xt,A);continue}Le&&ki([ie,te,Ee],cn=>{Ot=Ks(Ot,cn," ")});let on=he(A.nodeName);if(!en(on,rn,Ot)){mt(xt,A);continue}if(j&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(on,rn)){case"TrustedHTML":{Ot=j.createHTML(Ot);break}case"TrustedScriptURL":{Ot=j.createScriptURL(Ot);break}}if(Ot!==Tn)try{Bt?A.setAttributeNS(Bt,xt,Ot):A.setAttribute(xt,Ot),Et(A)?ot(A):Nu(t.removed)}catch{mt(xt,A)}}Ne(Z.afterSanitizeAttributes,A,null)},gn=function fe(A){let ue=null,Ce=Kt(A);for(Ne(Z.beforeSanitizeShadowDOM,A,null);ue=Ce.nextNode();)Ne(Z.uponSanitizeShadowNode,ue,null),mn(ue),Qt(ue),ue.content instanceof o&&fe(ue.content);Ne(Z.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(fe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ue=null,Ce=null,vt=null,Tt=null;if(J=!fe,J&&(fe="<!-->"),typeof fe!="string"&&!Jt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Vs("dirty is not a string, aborting")}else throw Vs("toString is not a function");if(!t.isSupported)return fe;if(et||we(A),t.removed=[],typeof fe=="string"&&(Ue=!1),Ue){if(fe.nodeName){let nn=he(fe.nodeName);if(!oe[nn]||Oe[nn])throw Vs("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)ue=$t("<!---->"),Ce=ue.ownerDocument.importNode(fe,!0),Ce.nodeType===Xs.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?ue=Ce:ue.appendChild(Ce);else{if(!Ve&&!Le&&!Me&&fe.indexOf("<")===-1)return j&&ne?j.createHTML(fe):fe;if(ue=$t(fe),!ue)return Ve?null:ne?P:""}ue&&bt&&ot(ue.firstChild);let xt=Kt(Ue?fe:ue);for(;vt=xt.nextNode();)mn(vt),Qt(vt),vt.content instanceof o&&gn(vt.content);if(Ue)return fe;if(Ve){if(z)for(Tt=V.call(ue.ownerDocument);ue.firstChild;)Tt.appendChild(ue.firstChild);else Tt=ue;return(ve.shadowroot||ve.shadowrootmode)&&(Tt=W.call(r,Tt,!0)),Tt}let Bt=Me?ue.outerHTML:ue.innerHTML;return Me&&oe["!doctype"]&&ue.ownerDocument&&ue.ownerDocument.doctype&&ue.ownerDocument.doctype.name&&un(Gu,ue.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+ue.ownerDocument.doctype.name+`>
`+Bt),Le&&ki([ie,te,Ee],nn=>{Bt=Ks(Bt,nn," ")}),j&&ne?j.createHTML(Bt):Bt},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};we(fe),et=!0},t.clearConfig=function(){Je=null,et=!1},t.isValidAttribute=function(fe,A,ue){Je||we({});let Ce=he(fe),vt=he(A);return en(Ce,vt,ue)},t.addHook=function(fe,A){typeof A=="function"&&Gs(Z[fe],A)},t.removeHook=function(fe,A){if(A!==void 0){let ue=lb(Z[fe],A);return ue===-1?void 0:cb(Z[fe],ue,1)[0]}return Nu(Z[fe])},t.removeHooks=function(fe){Z[fe]=[]},t.removeAllHooks=function(){Z=Wu()},t}var Vu=Ku();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ai=e=>(...t)=>({_$litDirective$:e,values:t}),ss=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Zs=class extends ss{constructor(t){if(super(t),this.it=Wt,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Wt||t==null)return this._t=void 0,this.it=t;if(t===Rn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Zs.directiveName="unsafeHTML",Zs.resultType=1;var Yu=Ai(Zs);function ll(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=ll();function np(e){Or=e}var to={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(_n.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var Sb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Eb=/^(?:[ \t]*(?:\n|$))+/,Tb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Cb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,no=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Rb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,cl=/(?:[*+-]|\d{1,9}[.)])/,rp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,sp=kt(rp).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ob=kt(rp).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),dl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lb=/^[^\n]+/,ul=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ib=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ul).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Db=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,cl).getRegex(),Oi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",pl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pb=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",pl).replace("tag",Oi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),op=kt(dl).replace("hr",no).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex(),Mb=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",op).getRegex(),fl={blockquote:Mb,code:Tb,def:Ib,fences:Cb,heading:Rb,hr:no,html:Pb,lheading:sp,list:Db,newline:Eb,paragraph:op,table:to,text:Lb},Xu=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",no).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex(),Nb={...fl,lheading:Ob,table:Xu,paragraph:kt(dl).replace("hr",no).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex()},qb={...fl,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",pl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:to,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt(dl).replace("hr",no).replace("heading",` *#{1,6} *[^
]`).replace("lheading",sp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,jb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ip=/^( {2,}|\\)\n(?!\s*$)/,Bb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Li=/[\p{P}\p{S}]/u,_l=/[\s\p{P}\p{S}]/u,ap=/[^\s\p{P}\p{S}]/u,Ub=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,_l).getRegex(),lp=/(?!~)[\p{P}\p{S}]/u,Wb=/(?!~)[\s\p{P}\p{S}]/u,zb=/(?:[^\s\p{P}\p{S}]|~)/u,Hb=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),cp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Gb=kt(cp,"u").replace(/punct/g,Li).getRegex(),Kb=kt(cp,"u").replace(/punct/g,lp).getRegex(),dp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Vb=kt(dp,"gu").replace(/notPunctSpace/g,ap).replace(/punctSpace/g,_l).replace(/punct/g,Li).getRegex(),Yb=kt(dp,"gu").replace(/notPunctSpace/g,zb).replace(/punctSpace/g,Wb).replace(/punct/g,lp).getRegex(),Xb=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ap).replace(/punctSpace/g,_l).replace(/punct/g,Li).getRegex(),Zb=kt(/\\(punct)/,"gu").replace(/punct/g,Li).getRegex(),Qb=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Jb=kt(pl).replace("(?:-->|$)","-->").getRegex(),eh=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Jb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ti=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,th=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ti).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),up=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ti).replace("ref",ul).getRegex(),pp=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ul).getRegex(),nh=kt("reflink|nolink(?!\\()","g").replace("reflink",up).replace("nolink",pp).getRegex(),Zu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ml={_backpedal:to,anyPunctuation:Zb,autolink:Qb,blockSkip:Hb,br:ip,code:jb,del:to,emStrongLDelim:Gb,emStrongRDelimAst:Vb,emStrongRDelimUnd:Xb,escape:Fb,link:th,nolink:pp,punctuation:Ub,reflink:up,reflinkSearch:nh,tag:eh,text:Bb,url:to},rh={...ml,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ti).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ti).getRegex()},ol={...ml,emStrongRDelimAst:Yb,emStrongLDelim:Kb,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zu).getRegex()},sh={...ol,br:kt(ip).replace("{2,}","*").getRegex(),text:kt(ol.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Si={normal:fl,gfm:Nb,pedantic:qb},Qs={normal:ml,gfm:ol,breaks:sh,pedantic:rh},oh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Qu=e=>oh[e];function or(e,t){if(t){if(_n.escapeTest.test(e))return e.replace(_n.escapeReplace,Qu)}else if(_n.escapeTestNoEncode.test(e))return e.replace(_n.escapeReplaceNoEncode,Qu);return e}function Ju(e){try{e=encodeURI(e).replace(_n.percentDecode,"%")}catch{return null}return e}function ep(e,t){let n=e.replace(_n.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),r=n.split(_n.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(_n.slashPipe,"|");return r}function Js(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function ih(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function tp(e,t,n,r,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ah(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ci=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Js(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ah(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Js(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Js(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Js(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,s=s?`${s}
${u}`:u;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=m,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,k=b.raw+`
`+n.join(`
`),D=this.blockquote(k);o[o.length-1]=D,r=r.substring(0,r.length-b.raw.length)+D.raw,s=s.substring(0,s.length-b.text.length)+D.text;break}else if(y?.type==="list"){let b=y,k=b.raw+`
`+n.join(`
`),D=this.list(k);o[o.length-1]=D,r=r.substring(0,r.length-y.raw.length)+D.raw,s=s.substring(0,s.length-b.raw.length)+D.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,c="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),y=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,u=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(c+=y+`
`,e=e.substring(y.length+1),a=!0),!a){let D=this.rules.other.nextBulletRegex(k),q=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),ae=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let j=e.split(`
`,1)[0],P;if(y=j,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),P=y):P=y.replace(this.rules.other.tabCharGlobal,"    "),Y.test(y)||ae.test(y)||ee.test(y)||D.test(y)||q.test(y))break;if(P.search(this.rules.other.nonSpaceChar)>=k||!y.trim())u+=`
`+P.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(m)||ae.test(m)||q.test(m))break;u+=`
`+y}!b&&!y.trim()&&(b=!0),c+=j+`
`,e=e.substring(j.length+1),m=P.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(m=>m.type==="space"),u=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ep(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(ep(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Js(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=ih(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),tp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return tp(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,l=s,a=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(r=c.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...r[0]][0].length,m=e.slice(0,s+r.index+u+i);if(Math.min(s,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Bn=class il{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new Ci,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_n,block:Si.normal,inline:Qs.normal};this.options.pedantic?(n.block=Si.pedantic,n.inline=Qs.pedantic):this.options.gfm&&(n.block=Si.gfm,this.options.breaks?n.inline=Qs.breaks:n.inline=Qs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Si,inline:Qs}}static lex(t,n){return new il(n).lex(t)}static lexInline(t,n){return new il(n).inlineTokens(t)}lex(t){t=t.replace(_n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_n.tabCharGlobal,"    ").replace(_n.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let u=n.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let c=t;if(this.options.extensions?.startInline){let u=1/0,m=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},m),typeof y=="number"&&y>=0&&(u=Math.min(u,y))}),u<1/0&&u>=0&&(c=t.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=n.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Ri=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_n.notSpaceStart)?.[0],s=e.replace(_n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+or(r)+'">'+(n?s:or(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:or(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${or(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Ju(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+or(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Ju(e);if(s===null)return or(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${or(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:or(e.text)}},gl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Un=class al{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new Ri,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new gl}static parse(t,n){return new al(n).parse(t)}static parseInline(t,n){return new al(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=l||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ei,eo=(Ei=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Un.parse:Un.parseInline}},Rt(Ei,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(Ei,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ei),lh=class{constructor(...e){Rt(this,"defaults",ll());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",Un);Rt(this,"Renderer",Ri);Rt(this,"TextRenderer",gl);Rt(this,"Lexer",Bn);Rt(this,"Tokenizer",Ci);Rt(this,"Hooks",eo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ri(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=n.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Ci(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=n.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new eo;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=n.hooks[i],a=s[i];eo.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&eo.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,c);return a.call(s,m)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,c);return m===!1&&(m=await a.apply(s,c)),m})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bn.lex(e,t??this.defaults)}parser(e,t){return Un.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?Un.parse:Un.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Un.parse:Un.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+or(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Rr=new lh;function At(e,t){return Rr.parse(e,t)}At.options=At.setOptions=function(e){return Rr.setOptions(e),At.defaults=Rr.defaults,np(At.defaults),At};At.getDefaults=ll;At.defaults=Or;At.use=function(...e){return Rr.use(...e),At.defaults=Rr.defaults,np(At.defaults),At};At.walkTokens=function(e,t){return Rr.walkTokens(e,t)};At.parseInline=Rr.parseInline;At.Parser=Un;At.parser=Un.parse;At.Renderer=Ri;At.TextRenderer=gl;At.Lexer=Bn;At.lexer=Bn.lex;At.Tokenizer=Ci;At.Hooks=eo;At.parse=At;var tx=At.options,nx=At.setOptions,rx=At.use,sx=At.walkTokens,ox=At.parseInline;var ix=Un.parse,ax=Bn.lex;function mr(e){let t=At.parse(e),n=Vu.sanitize(t);return Yu(n)}function ir(e,t){return d`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function os(e){return e.loading?d`<div class="prompt-block__status">불러오는 중…</div>`:e.error?d`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ii(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var _p={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ch={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},dh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,uh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Wn(e){return!!e&&typeof e=="object"}function bl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function hl(e,t){let n=bl(e),r=bl(t),s=new Map;for(let l of n)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of r){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function mp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Wn(s)&&typeof s.text=="string"?s.text:"").join(""):Wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ph(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:_p[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=bl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=hl(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=hl(Wn(l)?l.old_string:"",Wn(l)?l.new_string:"");s+=a.added,o+=a.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function yl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var fh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function gp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Wn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(fh,"").trim();return n.length>0?{kind:"user",text:n}:null}function vl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=dh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:uh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function _h(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function mh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(Wn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(vl(i.text));else if(i.type==="thinking"){let l=yl(i.thinking);l&&o.push(l)}else if(i.type==="tool_use"){let l=ph(i);typeof i.id=="string"&&t.set(i.id,l),o.push(l)}}return n?fp(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(Wn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=mp(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let o=gp(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?fp([s],n):[s]}return[]}function fp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function gh(e){let t=typeof e.command=="string"?e.command:"",n=mp(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:_p.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function bh(e){if(e.type==="item.completed"&&Wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[vl(t.text)];if(t.type==="user_message"){let n=gp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=yl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[gh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function hh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[vl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=yl(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ch[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function yh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function vh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Wn(t)?t:null}function bp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=vh(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return _h(o,r);let i=o.schema==="codex-delegation-monitor-v1"?hh(o):yh(o)?bh(o):mh(o,n);return i.length>0&&(r.progress=null),i}}}function wl(e){let t=[],n=bp(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var wh=5,kh=10,$h=/Task\s+#(\d+)/,xh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ah=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ro(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Sh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Eh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Th(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=$h.exec(s.output||s.result||""),c=String(o.activeForm||o.subject||"").trim();if(!a||c.length===0)continue;t.set(a[1],{label:c,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Ch(e){if(e.tool==="Bash"){let t=e.command||"";return xh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ah.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Rh(e){let t=e.filter(s=>s.kind==="tool").slice(-kh),n=new Map;t.forEach((s,o)=>{let i=Ch(s);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=o,n.set(i,l)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Oh(e){let t=Eh(e);if(t)return{text:t,guess:!1};let n=Th(e);if(n)return{text:n,guess:!1};let r=Rh(e);return r?{text:r,guess:!0}:null}function Lh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function is(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,l=null,a=null,c=null,u=!1,m={},y=!0,b=new Set,k=new Set,D=null,q=null,Y=!1,ae=!1,ee=!1,j=null,P=null;function U(){Y=!1,ae=!1,ee=!1,j=null,P=null}async function X(z){if(n){ae=!0,ee=!1,Oe();try{let ne=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...c?{root_dir:c}:{}}));if(o!==z)return;!ne||typeof ne!="object"||Array.isArray(ne)?ee=!0:(j=ne,P=z)}catch{o===z&&(ee=!0)}finally{o===z&&(ae=!1,Oe())}}}function V(){if(Y=!Y,Y&&o&&P!==o){X(o);return}Oe()}function _e(){if(!Y)return"";let z=os({loading:ae,error:ee});if(z)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!j)return"";if(j.missing)return d`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ne=Ii(j.recorded_at);return d`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ne?d`<div class="prompt-block__meta">${ne} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function W(){if(!a||!r)return[];let z=r.get(a);return wl(z?z.lines:[])}function Z(){if(!a||!r)return null;let z=r.get(a),ne=z?z.last_event_at:null;return typeof ne=="number"?ne:null}function ie(){return m.status==="running"}function te(){if(ie()&&o){q||(q=setInterval(()=>Oe(),1e3));return}Ee()}function Ee(){q&&(clearInterval(q),q=null)}function He(z){let ne=[],De=0;for(;De<z.length;){let{idx:lt,line:it}=z[De];if(it.kind==="tool"){let Pe=De;for(;Pe<z.length&&z[Pe].line.kind==="tool"&&z[Pe].line.tool===it.tool;)Pe+=1;if(Pe-De>=wh&&!k.has(lt)){ne.push({kind:"group",idx:lt,tool:it.tool||"",lines:z.slice(De,Pe)}),De=Pe;continue}}ne.push({kind:"line",idx:lt,line:it}),De+=1}return ne}function pe(z){let ne=[],De=new Map;for(let Pe=0;Pe<z.length;Pe+=1){let Ue=z[Pe],dt=Ue.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let tt=De.get(dt);tt||(tt={kind:"subagent",idx:Pe,launch_id:dt,agent_type:null,header:null,lines:[]},De.set(dt,tt),ne.push(tt)),tt.lines.push({idx:Pe,line:Ue});continue}if(Ue.kind==="tool"&&Ue.tool==="Agent"&&typeof Ue.launch_id=="string"&&Ue.launch_id.length>0){let tt=Q(Ue),_t=De.get(Ue.launch_id);if(_t){_t.header={idx:Pe,line:Ue},_t.agent_type=tt;continue}let Pt={kind:"subagent",idx:Pe,launch_id:Ue.launch_id,agent_type:tt,header:{idx:Pe,line:Ue},lines:[]};De.set(Ue.launch_id,Pt),ne.push(Pt);continue}ne.push({kind:"entry",idx:Pe,line:Ue})}let lt=[],it=0;for(;it<ne.length;){if(ne[it].kind!=="entry"){lt.push(ne[it]),it+=1;continue}let Pe=it;for(;Pe<ne.length&&ne[Pe].kind==="entry";)Pe+=1;lt.push(...He(ne.slice(it,Pe))),it=Pe}return lt}function Q(z){let ne=z.input;return ne&&typeof ne.subagent_type=="string"?ne.subagent_type:null}function Te(z){for(let ne=z.length-1;ne>=0;ne-=1){let De=z[ne];if(De.kind==="result"||De.kind==="error")return null;if(De.kind==="tool"&&!Object.hasOwn(De,"result"))return De}return null}function Ie(z){for(let ne=z.length-1;ne>=0;ne-=1)if(z[ne].kind==="thinking")return z[ne];return null}function S(z,ne){if(ne.kind==="gate")return d`<div class="sv__gate">${ne.text}</div>`;if(ne.kind==="phase")return d`<div class="sv__phase">${ne.text}</div>`;if(ne.kind==="result")return d`<div
        class="sv__result${ne.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ne.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(ne.text||(ne.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ne.kind==="thinking"){let De=b.has(z);return d`<div
        class="sv__think${De?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>yt(z)}
      >
        <span class="sv__think-line">💭 ${ro(ne.text)}</span>
        ${De?d`<pre class="sv__think-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="user"){let De=b.has(z);return d`<div
        class="sv__line sv__line--user${De?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>yt(z)}
      >
        <span class="sv__user-line">▷ ${ro(ne.text)}</span>
        ${De?d`<pre class="sv__user-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="error")return d`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="blocker")return d`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="tool"){let De=b.has(z),lt=ne.tool==="Bash"?Sh(ne.command):0,it=ne.tool==="Bash"?lt>1?ro(ne.command):ne.command:ne.path||ne.command||"";return d`<div
        class="sv__tool${De?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>yt(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ne.icon}</span>
          <span class="sv__tool-name">${ne.tool}</span>
          ${it?d`<span class="sv__tool-detail">${it}</span>`:""}
          ${lt>1?d`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof ne.added=="number"?d`<span class="sv__diff-add">+${ne.added}</span>`:""}
          ${typeof ne.removed=="number"?d`<span class="sv__diff-del">−${ne.removed}</span>`:""}
          ${ne.result?d`<span class="sv__tool-ok">→ ${ne.result}</span>`:""}
        </span>
        ${De?d`<pre class="sv__tool-expand">${oe(ne)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${mr(ne.text||"")}</div>`}function oe(z){let ne=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)ne.push(z.command);else if(z.input!==void 0)try{ne.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&ne.push(`output:
${z.output}`),ne.join(`

`)}function ye(){if(!o)return d``;let z=W(),ne=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),De=m.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,it=ie(),Pe=it?Lh(Z(),Date.now()):"",Ue=it?Te(z):null,dt=it?Ie(z):null,tt=Oh(z);return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":o)}</span
        >
        ${tt?d`<span
              class="sv__stage${tt.guess?" sv__stage--guess":""}"
              title=${tt.text}
              >${tt.text}</span
            >`:""}
        ${it?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Pe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Pe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Pe?d`<span class="sv__live-ago">${Pe}</span>`:""}</span
            >`:""}
        ${De?d`<button
              type="button"
              class="sv__session"
              title=${De}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${De}`}
              @click=${()=>ct(De)}
            >
              ⧉ ${De.slice(0,8)}
            </button>`:""}
        ${m.resume_command?d`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>ct(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ne?d`<span class="sv__meta">${ne}</span>`:""}
        ${m.worktree?d`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||u?"":d`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${lt}
          @click=${St}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ve()}
        >
          ✕
        </button>
      </div>
      ${i||u?"":_e()}
      <div class="sv__body">
        ${z.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:pe(z).map(_t=>_t.kind==="subagent"?$e(_t):_t.kind==="group"?ve(_t):S(_t.idx,_t.line))}
      </div>
      ${Ue||dt?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ue?d`<span class="sv__now-icon">${Ue.icon}</span>
                  <span class="sv__now-name">${Ue.tool}</span>
                  <span class="sv__now-detail"
                    >${Ue.tool==="Bash"?ro(Ue.command):Ue.path||Ue.command||""}</span
                  >`:""}
            ${dt?d`<span class="sv__now-think"
                  >💭 ${ro(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(z){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>be(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function $e(z){let ne=k.has(z.idx),De=z.header?z.header.line:null,lt=De?De.is_error===!0?"\u2717":typeof De.result=="string"?"\u2713":"\u27F3":"",it=De&&De.command?De.command:"";return d`<div class="sv__sub${ne?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${it?d`<span class="sv__sub-detail">${it}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${lt?d`<span class="sv__sub-state">${lt}</span>`:""}
        ${ne?"":d`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ne?d`<div class="sv__sub-body">
            ${He(z.lines).map(Pe=>Pe.kind==="group"?ve(Pe):S(Pe.idx,Pe.line))}
          </div>`:""}
    </div>`}function be(z){k.add(z),Oe()}function Oe(){rt(ye(),e),te(),y&&Ke()}function Ke(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function yt(z){b.has(z)?b.delete(z):b.add(z),Oe()}function St(){y=!y,Oe()}function ct(z){Mn(z).then(ne=>{ne?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(z){!o||!z||(m={...m,...z},Oe())}function ce(z){let ne=z.target;if(!ne||!ne.classList||!ne.classList.contains("sv__body"))return;!(ne.scrollHeight-ne.scrollTop-ne.clientHeight<=4)&&y&&(y=!1,Oe())}e.addEventListener("scroll",ce,!0);function Le(z){let ne=z.target;!ne||typeof ne.closest!="function"||e.contains(ne)||ne.closest("dialog")||ne.closest(".md-viewer-root")||Ve()}let je=!1;function Me(){je||(document.addEventListener("mousedown",Le),je=!0)}function et(){je&&(document.removeEventListener("mousedown",Le),je=!1)}function bt(z){let ne=z&&z.attempt_id;if(!ne)return;let De=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,lt=z.session_ref&&typeof z.session_ref=="object"?z.session_ref:null;if(De&&lt)return;let it=a;o=ne,i=De,l=lt,a=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&it&&it!==a&&Promise.resolve(n("unsubscribe-session-log",{id:it})).catch(()=>{}),c=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,m=z.meta||{},u=z.hide_prompt===!0,y=!0,b.clear(),k.clear(),U(),!D&&r&&(D=r.subscribe(Oe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:o,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...c?{root_dir:c}:{}})).catch(()=>{}),Me(),Oe()}function Ve(){let z=a;et(),o=null,i=null,l=null,a=null,c=null,u=!1,b.clear(),k.clear(),U(),Ee(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),rt(d``,e),s&&s()}return{open:bt,updateMeta:T,close:Ve,isOpen(){return o!==null},destroy(){Ee(),et(),D&&(D(),D=null),e.removeEventListener("scroll",ce,!0),o=null,i=null,l=null,a=null,c=null,u=!1,rt(d``,e)}}}function Ih(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Dh(e){let t=e&&e.metadata||{},n=Wr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ih(t)?null:"plan_pending"}),r}function hp(e,t){let n=Dh(e);return d`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${n.map(r=>d`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?d`<span class="detail-art__badge">draft</span>`:null}
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
  `}var Ph="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Mh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Nh=/^\*\*결론\*\* — (.+)$/;function Di(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ph)return null;let n=Mh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Nh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",c=l?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:a,body:t.slice(c).join(`
`).trim()}}var yp=20;function vp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function qh(e){return e.length>yp?`${e.slice(0,yp)}\u2026`:e}function Fh(e,t,n,r){let s=`${t.lane} ${qh(t.identifier)}`;return d`<div class="detail-report">
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
        <span class="detail-report__time">${vp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?d`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function jh(e){return d`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${vp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function wp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,c)=>String(c.created_at||"").localeCompare(String(a.created_at||"")));return d`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?d`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?d`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:d`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let c=Di(typeof a.text=="string"?a.text:"");return c?Fh(a,c,t,s.has(a.id)):jh(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
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
  `}var{I:Bx}=Cc;var kp=e=>e.strings===void 0;var Bh={},$p=(e,t=Bh)=>e._$AH=t;var Lr=Ai(class extends ss{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!kp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Rn||t===Wt)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return Rn}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Rn}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Rn;return $p(e),t}});var Uh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],kl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},xp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Wh={pin:"pin",global:"global",base:"base"};function zh(e){return d`<span
    class=${`detail-layer-rail detail-layer-rail--${Wh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Hh(e,t,n){switch(e){case"workflow_mode":return Is;case"spec_review_model":case"impl_review_model":return Ds;case"plan_review_model":return Jo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ei;case"impl_dispatch":return Yd;case"impl_runtime":return Qo;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return es(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ls;case"orchestration_model":return Ps(n,null);case"orchestration_effort":return es(n,void 0,t.orchestration_model||En).filter(r=>r!==En);default:return[]}}function Gh(e,t){return d`<div class="detail-effective__row" data-key=${e.key}>
    ${zh(e.source)}
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
      >${ti[e.source]}</span
    >
    ${t.expanded?d`<select
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
          ${t.options.map(n=>d`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Ap(e,t){let n=Ma.flatMap(a=>a.keys),r=Na(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=nu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return d`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let c=a.currentTarget.parentElement;t.onToggle(!c.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Kh(o)}</span
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
    ${e.expanded?d`<div class="detail-effective__body">
          ${Ma.map(a=>d`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(c=>a.keys.includes(c.key)).map(c=>{let u=zo({key:c.key,choices:Hh(c.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Gh(c,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Lr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>d`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?d`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Kh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Vh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Sp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},o=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Vh(r.exec_receipt),c=a?Jn(a):l,u=a?`${a.kind}:${a.actor}`:l.split("@")[0],m=Uo(r.planned_execution,r.exec_receipt),y=r.chips?.pr?.number,b=typeof y=="number"?`PR #${y}`:"PR",k=ts(n),D=t.onApplyRec;return d`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${o?d`<span class="detail-summary__chip detail-summary__chip--route"
            >${o}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?d`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?d`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${m?d`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${m.kind}
            title=${m.title}
            >${m.label}</span
          >`:""}
      ${c?d`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${a?.effort?d`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${k?d`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${k.state}
            title=${ri(k)}
            ?disabled=${k.state==="applied"}
            @click=${()=>D?.(k.rec,k.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Yh(o).map(q=>Xh(q,n,s,{label:q.id==="pr"?b:q.label,href:q.id==="pr"?i:""}))}
    </div>
  </section>`}function Yh(e){let n=typeof e=="string"&&Object.hasOwn(kl,e)&&kl[e]||kl.spec_backed;return Uh.filter(r=>n.includes(r.id))}var Pi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Xh(e,t,n,r){let s=Zh(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,l=i?i==="full":s.length>0,a=!l&&i==="dim",c=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,u=s&&s.split("@")[1]?.slice(0,7)||"",m=c?Pi.stale:l?Pi.on:a?Pi.current:Pi.none,y=Qh(e,n),b=`${r.label} \xB7 ${m}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${c?" detail-summary__gate--stale":""}${u?" detail-summary__gate--receipt":""}`,D=d`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${u}</span>`;return r.href?d`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${D}</a
    >`:d`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${D}</span
  >`}function Zh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Qh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(xp,n)?xp[n]:""}function Mi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ep(e){return Mi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Tp(e,t){let n=e&&e[t];if(!Mi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Ep),s=Ep(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Op(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ni(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Op(e)}${t}`}function as(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Op(e)}`}function Jh(e,t,n){if(n!==null){let s=e==="claude"?Ni:as,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:as({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Cp(e,t){if(!Mi(e)||e.state!=="usable"||!Mi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Rp(e){let t=e.provider_key==="claude"?Ni:as,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return d`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Jh(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?d`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>d`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?d`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":d`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Lp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return d`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Rp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Tp(t,"claude"),selected:s,workspace_default:Cp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Rp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Tp(t,"codex"),selected:o,workspace_default:Cp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function ey(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ty(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l=null,a="";function c(D){D.key==="Escape"&&s&&(D.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ey(s)}</span
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
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="pending"?d`<div class="mv__status">${a}</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:d`${l===null?null:d`<pre class="mv__front">
${l}</pre
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:d``}function m(){rt(u(),e)}async function y(D,q={}){s=D,o="loading",i="",l=null,a="",m();let Y=q.workspace||(n?n():"");if(!Y){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ae="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(D);try{let ee=await r(ae),j=await ee.json().catch(()=>({}));if(!ee.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&q.missing_state==="plan_pending"){o="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||ee.status)+")",m();return}let P=ty(String(j.content||""));l=P.front,i=P.body,o="ready",m()}catch{o="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,rt(d``,e)}function k(){document.removeEventListener("keydown",c),b()}return{open:y,close:b,destroy:k}}var ny=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Pp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Fi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],ry=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ip(e){return typeof e=="string"&&ry.has(e)}var sy=["running","done","failed","interrupted"],oy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function iy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ay(e){let t=an(e);if(t.length>0)return t.map(s=>d`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Zr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?d`<span class="detail-usage-partial" title=${Pp}
          >부분 집계</span
        >`:""}`}function Dp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Al(e){if(typeof e=="number")return so(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?so(t):""}function ly(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function cy(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function $l(e){return e===null||typeof e=="string"&&e.trim().length>0}function xl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function dy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Fi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?$l(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||$l(t.effort))||!(!("agent_type"in t)||$l(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!sy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!xl(t.started_at)||!xl(t.last_event_at)||!xl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function uy(e,t,n){let s=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return d`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?d`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${Al(n.completed_at)?d`<span class="detail-session__leg-time detail-session__time"
          >${Al(n.completed_at)}</span
        >`:""}
    ${s?d`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function py(e,t,n,r){let s=e.status==="running"?null:t,i=(s?an({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?so(e.last_event_at):s?Al(s.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,ly(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),c=cy(e,s);return d`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${oy[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${c.title}
      >${c.text}</span
    >
    ${l?d`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?d`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function fy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function _y(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of o){let m=dy(u);!m||s.has(m.launch_id)||Ip(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((u,m)=>(u.started_at||0)-(m.started_at||0));let i={};for(let{role:u,provider:m}of Fi){let y=t?t.roles[u]?.[m]:null;i[u]=y?[...y.legs]:[]}let l=Fi.flatMap(({role:u})=>i[u]),a=new Set,c=[];for(let{role:u,provider:m}of Fi){for(let y of r.filter(b=>b.role===u&&b.provider===m)){let b=l.find(k=>k.receipt_id===y.launch_id)||null;b&&!fy(y,b)||(b&&a.add(b.receipt_id),c.push(py(y,b,e.attempt_id,n)))}for(let y of i[u])!a.has(y.receipt_id)&&!Ip(y.agent_type)&&c.push(uy(u,m,y))}return c}function my(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ny,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return d`<div class="detail-session__usage-detail">
    ${r.map(s=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${iy(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?d`<span class="detail-session__usage-note">${Pp}</span>`:""}
  </div>`}var gy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function so(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function by(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return d`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?d`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var hy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function yy(e,t){let n=hy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return d`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${$a(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${xs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${so(e.last_event_at)}</span>
    </button>
    ${e.resume_command?d`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Mp(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],l=i.map(b=>yy(b,t)),a=n.expanded||new Set;if(s.length===0&&i.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let c=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&c.add(b.resumed_from);let u=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let D=typeof b.session_id=="string"&&b.session_id.length>0,q=c.has(b.attempt_id),Y=D&&!q,ae=D?q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${ae}
      @click=${ee=>{ee.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let D=b.cause_detail,q=D&&typeof D.reason=="string"&&D.reason.length>0?typeof D.command=="string"&&D.command.length>0?`${D.reason} \xB7 ${D.command}`:D.reason:b.cause;return d`<div class="detail-session__cause" title=${q}>
      ${b.cause}
    </div>`},y=b=>{let k=Dp(Ea(b));if(an(k).length===0&&!Zr(b.usage))return"";let D=a.has(b.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${D?"true":"false"}
      title=${D?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${q=>{q.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${ay(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${s.map(b=>{let k=Ea(b),D=Dp(k),q=an(D);return d`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${gy[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ks(b)?d`<span
                  class="detail-session__resumed"
                  title=${ks(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ar(b)}</span>
            ${q.length>0?d`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?d`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${q.length>0?q.map(Y=>d`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Zr(b.usage)?d`<span class="detail-session__usage"
                    >${Zr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${so(b.started_at)}</span>
          </button>
          ${y(b)} ${u(b)} ${m(b)} ${by(b)}
          ${a.has(b.attempt_id)&&b.usage?my(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${_y(b,k,t)}
        </div>`})}
    </div>
  `}function Np(e,t={}){return d`
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
    ${e.expanded?d`<div class="detail-prompt" data-seam="task-prompt">
          ${vy(e)}
        </div>`:""}
  `}function vy(e){let t=os(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return d`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ii(n.recorded_at);return d`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var wy=["open","in_progress","deferred","resolved","closed"],ky=[0,1,2,3,4];function qp(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,c=null,u=null,m={},y="",b=!1,k=[],D=!1,q={},Y={claude:null,codex:null},ae=null,ee=null,j=0,P=!1,U=!1,X="",V="",_e="",W="",Z=!1;function ie(){P=!1,U=!1,X="",V="",_e="",W="",Z=!1}function te(){Y={claude:null,codex:null},ae=null,ee=null,j+=1}async function Ee(){if(!s)return null;try{let v=await Promise.resolve(s("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function He(v){try{let K=await fetch(v);if(!K.ok)return null;let L=await K.json();if(!L||typeof L!="object"||!Array.isArray(L.accounts))return null;let B=L.accounts.filter(Ae=>Ae!==null&&typeof Ae=="object"&&!Array.isArray(Ae));return{accounts:B,active:B.find(Ae=>Ae.active===!0)||null}}catch{return null}}async function pe(v){ee=v;let K=++j,[L,B,Ae]=await Promise.all([He("/api/claude-usage"),He("/api/codex-usage"),Ee()]);K!==j||v!==c||(Y={claude:L,codex:B},ae=Ae,Fe())}let Q=[],Te=null,Ie=null,S=!1,oe="",ye=!1,ve=0,$e=new Set;function be(){Q=[],Te=null,Ie=null,S=!1,oe="",ye=!1,ve+=1,$e.clear()}async function Oe(v){if(!s)return;let K=++ve;try{let L=await Promise.resolve(s("get-comments",{id:v}));if(K!==ve||v!==c)return;Q=Array.isArray(L)?L:[],S=!1}catch{if(K!==ve||v!==c)return;S=!0}Fe()}function Ke(){if(!s||!c)return;let v=u&&typeof u.comment_count=="number"?u.comment_count:null;if(Te!==c){Te=c,Ie=v,Oe(c);return}v!==null&&v!==Ie&&(Ie=v,Oe(c))}function yt(v){$e.has(v)?$e.delete(v):$e.add(v),Fe()}function St(v){let K=oe.trim().length===0;oe=v,K!==(v.trim().length===0)&&Fe()}async function ct(){let v=oe.trim();if(!s||!c||v.length===0||ye)return;let K=c;ye=!0,Fe();let L=!1;try{let B=await Promise.resolve(s("add-comment",{id:K,text:v}));Array.isArray(B)&&B.length>0&&(L=!0,K===c&&(Q=B,S=!1,oe="",Ie=B.length))}catch{L=!1}L||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),K===c&&(ye=!1),Fe()}let T={onToggle:yt,onDraftInput:St,onSubmit:ct},ce=t.mdViewer||null,Le=null;ce||(Le=document.createElement("div"),Le.className="md-viewer-root",document.body.appendChild(Le));let je=ce||qi(Le,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let et=is(Me,{transport:s?(v,K)=>Promise.resolve(s(v,K)):void 0,sessionLogStore:a}),bt=!1,Ve=!1,z=!1,ne=null,De=null,lt=0;function it(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function Pe(){bt=!1,Ve=!1,z=!1,ne=null,De=null,lt+=1}async function Ue(v){if(!s)return;let K=++lt;Ve=!0,z=!1,Fe();try{let L=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(K!==lt)return;!L||typeof L!="object"||Array.isArray(L)?z=!0:(ne=L,De=it(v))}catch{K===lt&&(z=!0)}finally{K===lt&&(Ve=!1,Fe())}}let dt=[],tt=null,_t=0;function Pt(v,K){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${K}`}function Ft(){dt=[],tt=null,_t+=1}async function Ht(v,K){if(!s)return;let L=++_t,B;try{B=await Promise.resolve(s("get-session-refs",{bead_id:v}))}catch{B=null}L!==_t||K!==tt||(dt=B&&Array.isArray(B.sessions)?B.sessions:[],Fe())}function Mt(){if(!s||!c)return;let v=u&&u.metadata,K=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(K===null){Ft();return}let L=Pt(c,K);tt!==L&&(dt=[],tt=L,Ht(c,L))}function Nt(){if(bt=!bt,bt&&c&&De!==it(c)){ne=null,Ue(c);return}Fe()}function wt(){if(!i||!c)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(L=>L&&L.bead_id===c).sort((L,B)=>(B.started_at||0)-(L.started_at||0)).map(L=>({attempt_id:L.attempt_id,bead_id:L.bead_id,status:L.status,started_at:typeof L.started_at=="number"?L.started_at:null,runner:L.runner||null,model:L.model||null,effort:L.effort||L.observed_effort||null,speed:L.speed||null,session_id:L.session_id||null,resumed_from:L.resumed_from||null,continuation_mode:L.continuation_mode||null,dismissed_at:typeof L.dismissed_at=="number"?L.dismissed_at:null,cause:typeof L.cause=="string"?L.cause:null,cause_detail:L.cause_detail||null,exec_default_preset_id:typeof L.exec_default_preset_id=="string"?L.exec_default_preset_id:null,exec_default_preset_revision:typeof L.exec_default_preset_revision=="number"?L.exec_default_preset_revision:null,exec_values:L.exec_values&&typeof L.exec_values=="object"?L.exec_values:null,usage:L.usage||null,usage_legs:Array.isArray(L.usage_legs)?L.usage_legs:[],delegation_sessions:Array.isArray(L.delegation_sessions)?L.delegation_sessions:[]}))}function We(){if(!i||!c)return null;let v=i.get();return On(v&&v.attempts||{},c)}let O=new Set;function J(v){O.has(v)?O.delete(v):O.add(v),Fe()}function me(v){let K=i?i.get():null,L=K&&K.attempts?K.attempts[v]:null;et.open({attempt_id:v,meta:L?{runner:L.runner||void 0,model:L.model||void 0,effort:L.effort||void 0,status:L.status||void 0,session_id:L.session_id||void 0}:{}})}function E(v,K){let L=i?i.get():null,B=L&&L.attempts?L.attempts[v]:null,qe=(B&&Array.isArray(B.delegation_sessions)?B.delegation_sessions:[]).find(ht=>ht&&typeof ht=="object"&&ht.launch_id===K);qe&&et.open({attempt_id:v,launch_id:K,meta:{runner:qe.provider==="claude"?"claude":"codex",role:qe.role,...typeof qe.agent_type=="string"?{agent_type:qe.agent_type}:{},model:qe.model,effort:qe.effort,session_id:qe.session_id,status:qe.status}})}async function G(v){if(!s||!v)return;let K=await Vr();if(K===null)return;let L=()=>{let ht=i?i.get():null;return ht&&typeof ht.revision=="number"?ht.revision:0},B=async(ht={},Ge=L())=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:Ge,...K!==""?{instructions:K}:{},...ht}),Ae=ht=>{ht?.queue&&i?.set&&i.set(ht.queue)},qe=await B();if(Ae(qe),qe&&qe.conflict){let ht=qe.queue&&typeof qe.queue.revision=="number"?qe.queue.revision:L();qe=await B({},ht),Ae(qe)}qe=await er(qe,(ht,Ge)=>B({continuation:ht,decision_token:Ge}),{onResult:Ae,refresh:()=>B()}),qe&&qe.resumed===!1&&!qe.conflict&&qe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${qe.reason}`,"error",2400)}function Re(v){!v||!c||et.open(Yr(v,c,u&&u.status))}let ze={onOpen:me,onOpenDelegation:E,onResume:G,onToggleUsage:J,onOpenSessionRef:Re,onCopyResumeCommand:Jt};function xe(){let v=i?i.get():null,K={...q};for(let L of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=v&&v[L];typeof B=="string"&&(K[L]=B)}return K}async function at(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));q=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{q={}}Fe()}}function st(){let v=i?i.get():null;return v&&v.runner_catalog||null}function he(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Je(){let v=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},L=$n({pin:{...v,...m},global:xe(),execution_defaults:he(),runner_catalog:st(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Nn(st(),L)}function M(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function F(v){return v?.compatible===!1}function we(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Xe(){let v=M(),K=v?.presets.find(L=>L.id===y);if(!(!s||!c||!v||!K||F(K)||b)){b=!0,k=[],Fe();try{let L=await Promise.resolve(s("apply-impl-preset",su(c,K.id,v.revision)));if(L&&L.conflict){we(L),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let B=L&&Array.isArray(L.issue)?L.issue[0]:L?.issue;if(L&&L.applied&&B&&typeof B=="object"){u=B,k=Array.isArray(L.skipped_orchestration_keys)?L.skipped_orchestration_keys.filter(Ae=>typeof Ae=="string"):[];for(let Ae of ou)delete m[Ae];de(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}L&&L.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(L){L&&typeof L=="object"&&L.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Fe()}}}let ke=null;n&&n.subscribe&&(ke=n.subscribe(()=>Et()));let Ze=null;i&&typeof i.subscribe=="function"&&(Ze=i.subscribe(()=>{c&&Fe()}));let ot=null,mt=null;function $t(){mt&&(mt(),mt=null)}l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{c&&Fe()}));function Kt(v){v.key==="Escape"&&c&&(v.preventDefault(),r())}document.addEventListener("keydown",Kt);function Et(){if(c){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+c)||[];u=v.find(L=>L&&L.id===c)||v[0]||u}Ke(),Mt(),Fe()}}function Jt(v){Mn(v).then(K=>{K?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ne(v){v.preventDefault(),v.stopPropagation(),c&&Jt(c)}function mn(v,K){v.preventDefault(),v.stopPropagation(),Jt(K)}function en(v,K,L){v.preventDefault(),v.stopPropagation(),je.open(K,{missing_state:L})}async function jt(v,K){let L=Object.hasOwn(m,v),B=m[v];if(m[v]=K,Fe(),!(!s||!c))try{let Ae=await Promise.resolve(s("update-exec-settings",ru(c,v,K.length===0?null:K))),qe=Array.isArray(Ae)?Ae[0]:Ae;if(!qe||typeof qe!="object"||!qe.id)throw new Error("exec settings readback failed");u=qe,delete m[v],Fe()}catch(Ae){throw L?m[v]=B:delete m[v],Fe(),de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ae}}function Qt(v){v.catch(()=>{})}async function gn(v,K){let L=u||{},B=L.metadata&&typeof L.metadata=="object"?L.metadata:{},Ae={};for(let Ge of["impl_runtime","impl_model","impl_effort"])Ae[Ge]=Object.hasOwn(m,Ge)?m[Ge]:typeof B[Ge]=="string"?B[Ge]:"";Ae[v]=K;let qe=lu(Ae,st(),Je()),ht={};for(let Ge of["impl_runtime","impl_model","impl_effort"])ht[Ge]=m[Ge],m[Ge]=qe[Ge]||"";if(Fe(),!(!s||!c))return Promise.resolve(s("update-impl-target",{id:c,...qe,orchestration_runtime:Je()})).then(Ge=>{let ft=Array.isArray(Ge)?Ge[0]:Ge;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");u=ft;for(let yn of["impl_runtime","impl_model","impl_effort"])delete m[yn];Fe()}).catch(Ge=>{for(let ft of["impl_runtime","impl_model","impl_effort"])ht[ft]===void 0?delete m[ft]:m[ft]=ht[ft];throw Fe(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ge})}async function fe(v,K){if(!(!v||typeof v!="object")&&!(K==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await jt("orchestration_model",v.orchestration_model)}catch{return}if(typeof v.impl_runtime=="string"&&v.impl_runtime.length>0)try{await gn("impl_runtime",v.impl_runtime)}catch{}}}async function A(v,K,L){if(!s||!c)return!1;try{let B=await Promise.resolve(s(v,K)),Ae=Array.isArray(B)?B[0]:B;return Ae&&typeof Ae=="object"&&Ae.id?(u=Ae,!0):(de(L,"error"),!1)}catch(B){return B&&typeof B=="object"&&B.code==="bd_readback_failed"?(de("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(de(L,"error"),!1)}}function ue(v){setTimeout(()=>{try{let K=e.querySelector(v);K&&typeof K.focus=="function"&&K.focus()}catch{}},0)}function Ce(){P=!0,X=u&&u.title||"",Fe(),ue('.detail-edit__input[data-edit="title"]')}function vt(v){X=v.target.value}function Tt(){P=!1,X="",Fe()}function xt(){A("edit-text",{id:c,field:"title",value:X},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(P=!1,X=""),Fe()})}function Bt(){U=!0,V=u&&u.description||"",Fe(),ue('.detail-edit__textarea[data-edit="description"]')}function nn(v){V=v.target.value}function rn(){U=!1,V="",Fe()}function Tn(){A("edit-text",{id:c,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(U=!1,V=""),Fe()})}function Ot(v,K,L,B){if(v.key==="Escape"){v.stopPropagation(),L();return}v.key==="Enter"&&(!B||v.ctrlKey||v.metaKey)&&(v.preventDefault(),K())}function on(v){let K=v.target.value;A("update-status",{id:c,status:K},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function cn(v){let K=Number(v.target.value);A("update-priority",{id:c,priority:K},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function dn(v){_e=v.target.value}function Hn(){let v=_e.trim();v.length!==0&&A("label-add",{id:c,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(K=>{K===!0&&(_e=""),Fe()})}function x(v){if(v.key==="Escape"){v.stopPropagation(),_e="",Fe();return}v.key==="Enter"&&(v.preventDefault(),Hn())}function C(v){A("label-remove",{id:c,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Fe())}let p={onCopyPath:mn,onOpenDoc:en};function h(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function R(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function re(v){switch(v){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return v.length>0?`${v} `:""}}function ge(v){if(!v||typeof v!="object")return;let K=typeof v.status=="string"?v.status:"",L=typeof v.title=="string"?v.title:"";return K.length>0&&L.length>0?`${K} \xB7 ${L}`:void 0}function pt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function ut(){return t.depCandidates?t.depCandidates():null}async function Vt(v,K,L){let B=pt(),Ae=c;if(!Ae)return;if(B.length===0){de("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let qe=await A(v,{a:Ae,b:K,view_id:Ae,root_dir:B},L),ht=qe===!0||qe!==!1&&qe.saved===!0;ht&&t.onDepChanged&&t.onDepChanged({type:v,a:Ae,b:K}),v==="dep-add"&&ht&&(W="",Z=!1),Fe()}function Ut(v){if(!c)return;let K=globalThis.confirm;typeof K=="function"&&!K(`${v}\uAC00 ${c}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Vt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(v){v.disabled||Vt("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Cn(v){W=v.target.value,Z=!0,Fe()}function bn(){Z||(Z=!0,Fe())}function Yt(v,K){if(v.key==="Escape"){v.stopPropagation(),W="",Z=!1,Fe();return}v.key==="Enter"&&(v.preventDefault(),K.length===1&&!K[0].disabled&&Gt(K[0]))}function An(v){return d`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${W}
        @focus=${bn}
        @input=${Cn}
        @keydown=${K=>Yt(K,v)}
      />
      ${Z||W.length>0?d`<div class="detail-dep-add__list">
            ${v.length===0?d`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(K=>d`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${K.bead_id}
                      ?disabled=${K.disabled}
                      title=${kn(K.reason)}
                      @click=${()=>Gt(K)}
                    >
                      <span class="detail-dep-add__repo"
                        >${K.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${K.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${K.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function hn(v,K){let L=K.get(v.id),B=o?d`<button
          type="button"
          class="detail-dep__link"
          title=${kn(v.title)}
          @click=${()=>L===void 0?o(v.id):o(v.id,L)}
        >
          ${v.label}
        </button>`:d`<span class="detail-dep__link" title=${kn(v.title)}
          >${v.label}</span
        >`;return d`<span
      class=${`detail-dep detail-dep--${v.kind}${o?" detail-dep--link":""}`}
      >${B}${v.kind==="pred"?d`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Ut(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function ar(v){let K=Array.isArray(v.dependencies)?v.dependencies:[],L=Array.isArray(v.dependents)?v.dependents:[],B=[];for(let Ge of K){let ft=h(Ge);ft.length>0&&R(Ge)==="blocks"&&B.push({id:ft,label:`\u26D3 \uB9C9\uB294 ${ft}`,kind:"pred",title:ge(Ge)})}for(let Ge of L){let ft=h(Ge);ft.length>0&&R(Ge)==="blocks"&&B.push({id:ft,label:`\u26D3 \uB9C9\uD788\uB294 ${ft}`,kind:"succ",title:ge(Ge)})}for(let Ge of K){let ft=h(Ge),yn=R(Ge);ft.length>0&&yn!=="blocks"&&B.push({id:ft,label:`${re(yn)}${ft}`,kind:"other",title:ge(Ge)})}let Ae=ut(),qe=new Map;if(Ae)for(let Ge of Ae.issues)qe.has(Ge.bead_id)||qe.set(Ge.bead_id,Ge.root_dir);let ht=Ae&&c?Pu(Du(c,Ae),W):[];return d`
      <div class="detail-section-label">의존성</div>
      ${B.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${B.map(Ge=>hn(Ge,qe))}
          </div>`}
      ${Ae===null?d`<div class="detail-empty">후보를 불러올 수 없음</div>`:An(ht)}
    `}function Xn(v){let K=v.metadata||{},L=v.workflow||{},B=L.stages||{},Ae=B.spec&&B.spec.stale,qe=B.impl&&B.impl.stale,ht=L.quick_fix_review?.state==="stale",Ge=B.plan||null,ft=L.route_source==="derived",yn=L.route||K.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ft?" detail-kv__v--derived":""}"
          title=${ft?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ft?"unset":yn}</span
        >
      </div>
      ${L.route!=="quick_fix"||Object.hasOwn(K,"spec_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${K.spec_review||"\uC5C6\uC74C"}${Ae?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.route==="full_plan"?d`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ge?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ge?.approval_receipt||"\uC5C6\uC74C"}${Ge?.approval_state==="stale"?" \xB7 stale":Ge?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${L.route!=="quick_fix"||Object.hasOwn(K,"impl_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${K.impl_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.resolver?d`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${L.resolver.attempt} \xB7 ${L.resolver.prior_sha} \u2192 ${L.resolver.sha}`}
              >${`${L.resolver.prior_sha.slice(0,7)} \u2192 ${L.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${L.route==="quick_fix"||Object.hasOwn(K,"quick_fix_review")?d`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${K.quick_fix_review||"\uC5C6\uC74C"}${ht?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.planned_execution?d`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${L.planned_execution.kind}</span>
            </div>
            ${L.planned_execution.kind==="main"?d`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${L.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${L.exec_receipt?d`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(L.exec_receipt)}</span
            >
          </div>`:""}
      ${L.impl_entry?d`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${L.impl_entry.actor}@${L.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${K.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${K.pr_url}</span>
          </div>`:""}
    `}let f={route:["quick_fix","spec_backed","full_plan"]};async function g(v,K){let L=K.target.value;if(v==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&L!=="full_plan"&&!window.confirm(`full_plan \u2192 ${L||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Fe();return}await A("update-workflow-meta",{id:c,key:v,value:L},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Fe()}function w(v){let K=v.metadata||{};return d` ${((B,Ae)=>{let qe=f[B],ht=typeof K[B]=="string"?K[B]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${B}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${B}
          data-edit=${`wfmeta-${B}`}
          @change=${Ge=>g(B,Ge)}
        >
          <option value="" ?selected=${!qe.includes(ht)}>
            ${Ae}
          </option>
          ${qe.map(Ge=>d`<option value=${Ge} ?selected=${ht===Ge}>${Ge}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(v,K){return P?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${X}
            @input=${vt}
            @keydown=${L=>Ot(L,xt,Tt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Tt}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${an(K).map(L=>d`<span class="detail-usage-total" title=${L.tooltip}
              >${L.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ce}
        >
          ✎
        </button>
      </div>
    `}function N(v){let K=sn(v.created_at),L=sn(v.updated_at);return!K&&!L?d``:d`
      ${K?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
    `}function H(v,K){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${on}
        >
          ${wy.map(L=>d`<option value=${L} ?selected=${L===v}>${L}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${cn}
        >
          ${ky.map(L=>d`<option value=${String(L)} ?selected=${L===K}>
                P${L}
              </option>`)}
        </select>
      </div>
    `}function se(v){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${U?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Bt}
            >
              ✎
            </button>`}
      </div>
      ${U?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${nn}
              @keydown=${K=>Ot(K,Tn,rn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Tn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${rn}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Se(v){let K=typeof v.notes=="string"?v.notes:"";return K.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${K}</div>
    `}function Ye(v){let K=Array.isArray(v.labels)?v.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${K.map(L=>d`<span class="detail-label-chip"
              >${L}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${L}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+L}
                @click=${()=>C(L)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${_e}
            @input=${dn}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Hn}
          >
            추가
          </button>
        </span>
      </div>
    `}function nt(){if(!c)return d``;let v=u||{},K=String(v.id||c),L=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",B=We(),Ae=v.status||"open",qe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",ht=v.description||"",Ge={...v,metadata:{...v.metadata||{},...m}};return d`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Ne}
            >
              ${K}
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
          ${$(L,B)}
          ${Sp(Ge,{onApplyRec:fe})}
          ${Ap({metadata:Ge.metadata,workspace_values:xe(),catalog:st(),execution_defaults:he(),expanded:D,presets:M()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:k},{onToggle:ft=>{D=ft,Fe()},onEdit:(ft,yn)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){Qt(gn(ft,yn??""));return}Qt(jt(ft,yn??""))},onPresetSelect:ft=>{y=ft,k=[],Fe()},onPresetApply:()=>{Xe()}})}
          ${Lp({md:Ge.metadata,catalog:Y,workspace_defaults:ae,handlers:{onExecChange:(ft,yn)=>Qt(jt(ft,yn))}})}
          ${H(Ae,qe)} ${N(v)}
          ${se(ht)}
          ${wp(Q,T,{expanded:$e,draft:oe,sending:ye,error:S})}
          ${Se(v)} ${Ye(v)} ${ar(v)}
          ${Xn(v)} ${w(v)}
          ${hp(v,p)}
          ${Np({expanded:bt,loading:Ve,error:z,data:ne},{onToggle:Nt})}
          ${Mp(wt(),ze,{total:B,expanded:O},dt)}
        </div>
      </div>
    `}function Fe(){rt(nt(),e)}return{load(v){v!==c&&(m={},y="",k=[],D=!1,ie(),be(),Pe(),Ft(),te()),c=v,u=null,!mt&&t.subscribeCandidates&&(mt=t.subscribeCandidates(()=>{c&&Fe()})),Et(),at(),ee!==v&&pe(v)},clear(){c=null,u=null,m={},y="",b=!1,k=[],D=!1,ie(),be(),Pe(),Ft(),te(),$t(),je.close(),et.close(),rt(d``,e)},destroy(){ke&&(ke(),ke=null),Ze&&(Ze(),Ze=null),ot&&(ot(),ot=null),$t(),document.removeEventListener("keydown",Kt),ce||(je.destroy(),Le&&Le.parentNode&&Le.parentNode.removeChild(Le)),et.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),c=null,u=null,te(),y="",b=!1,k=[],be(),Pe(),Ft(),rt(d``,e)}}}function Fp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(c,u,m="")=>{n&&(n.textContent=c||"Unexpected Error"),r&&(r.textContent=u||"An unrecoverable error occurred.");let y=typeof m=="string"?m.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var $y="(max-width: 640px)";function ji(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia($y),n=!!t.matches;e(n);let r=s=>{let i=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function xy(){return{lanes:{done:!0},areas:{}}}function oo(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Ay(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:oo(r.lanes),areas:oo(r.areas)}:{lanes:oo(r),areas:{}}}catch{return null}}function jp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Bi(e,t=xy()){let n={lanes:oo(t.lanes),areas:oo(t.areas)},r=Ay(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let i=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:i}},jp(e,s),i},toggleArea(o){let i=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:i}},jp(e,s),i}}}function Up(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(c=>typeof c=="string"&&c.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:a})}for(let i=0;i<s.length;i+=1)for(let l=i+1;l<s.length;l+=1){let a=oi(s[i].scope,s[l].scope);if(a.length===0)continue;let c=s[i].member,u=s[l].member;n.get(c.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a}),n.get(u.id)?.overlaps.push({id:c.id,title:c.title,location_label:c.location_label,prefixes:a})}return n}var Sy=["parallel","serial","candidate"];function Bp(e){return Sy.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function io(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Sl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Bp(r),a=Bp(s);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(s.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&a&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(l&&o===null&&a&&i===null){let c=Ey(n);return c===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${c} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:c,index:0},{bead_id:e,lane:c,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${io(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${io(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ey(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Wp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},zp={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Cl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function El(e){for(let t of Cl(e))if(Object.hasOwn(Wp,t))return Wp[t];return null}function Tl(e){let t=null;for(let n of Cl(e))Object.hasOwn(zp,n)&&(t=zp[n]);return t}function ls(e){let t=El(e),n=Tl(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Gp(e,t){let n=El(e)??El(t),r=Tl(t)??Tl(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ty=new Set(["repo_operation_timeout_unresolved"]);function Cy(e){for(let t of Cl(e))if(Ty.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ry(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Kp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Cy(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ry(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Tr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Hp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Vp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Hp,t.blocked_reason)?Hp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ls(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ls(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Yp=160;function Oy(e){return e.length>Yp?`${e.slice(0,Yp)}\u2026`:e}function Ly(e,t){return!e||!e.reason?"":d`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?d` · <code>${Oy(e.command)}</code>`:""}
  </div>`}function Iy(e){return e?d`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Dy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Xp(e){let t=e.failure?ls(e.failure.reason):"";return d`<div class="worker-banners">
    ${e.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?d`<button
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
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Ly(e.failure.cause_detail,e.failure.reason)}
          ${Iy(e.failure.reason)}
          ${qs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Py(e){return!e||!e.repo&&!e.serial_lane_id?"":d`${e.repo?d`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?d`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var My=new Set(["codex-runner"]);function Ny(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&My.has(b.agent_type))),a=l.filter(b=>b&&b.state==="live"),c=l.filter(b=>b&&b.state!=="live"),u=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",m=r?wn(r.updated_at,t):"",y=u?`\uCD5C\uADFC \uD65C\uB3D9 ${u}`:m?`\uAC31\uC2E0 ${m}`:"";return d`${o?d`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?d`<span class="rtile__activity-age"
              >${wn(i,t)}</span
            >`:""}
      </div>`:y?d`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
        </div>`:""}${a.length>0||c.length>0?d`<div class="rtile__legs">
        ${a.map(b=>d`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${c.length>0?d`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${c.map(b=>b.label).join(", ")}`}
              >위임 완료 ${c.length}</span
            >`:""}
      </div>`:""}`}var qy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Fy(e){if(!e)return"";let t=qy[e.locality]||"";return d`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Rl(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,i=e.failed===!0,l=!!e.paused,a=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):l?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Dy(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ks(e),m=an(e.usage),y=tr(e.usage),b=e.conflict_resolution?l?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,D=e.landing,q=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,ae=Py(Y),ee=Y?pi(Y.dependency_chips):"",j=Ny(Y,t,l,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),P=s&&e.workflow?.chips?.exec_receipt||null,U=fi(e.workflow),X=_i(e.rec),V=P?d`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(P)}`}
        >${`${P.kind}:${Bo(P)}`}</span
      >`:"",_e=o?d`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${xs(o)}</span
      >`:"",W=ae||U||_e||V||X?d`<div class="rtile__meta">
          ${ae}${U}${_e}${V}${X}
        </div>`:"",Z=d`${b?d`<span class="worker-mini__badge">${b}</span>`:""}${k?d`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ie=s?"":ns(e),te=e.discard?.action?d`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return d`<div
    class="rtile${q?" rtile--sel":""}${l?" rtile--paused":""}${i?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${mi(e.priority)}${u?d`<span class="rtile__resumed" title=${u}>↻</span>`:""}${Z}
      <div class="rtile__hd-actions">
        ${s?d`${typeof e.started_at=="number"?d`<span class="rtile__elapsed">${a}</span>`:""}${Fy(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:d`<span class="rtile__elapsed">${a}</span>`}
        ${s?"":i?d`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${te}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
                  aria-label="실패 기록 닫기"
                >
                  ✕
                </button>`:d`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${l?d`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:d`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${te}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?Fo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:va}):""}
    ${D?d`<div class="rtile__landing">
          <span
            class="merge-step${D.failed?" merge-step--failed":""}"
            style=${`--progress: ${D.percent}%`}
            >${D.label}${D.index>0?d`<span class="merge-step__n"
                  >${D.index}/${D.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${ee}
    ${s?W:ae||U||c||X||m.length>0||y?d`<div class="rtile__meta">
            ${ae}${U}${ui(e.exec_chips)}${X}
            ${m.length>0?m.map(Ee=>d`<span class="worker-usage" title=${Ee.tooltip}
                      >${Ee.label}</span
                    >`):y?d`<span
                    class="worker-usage"
                    title=${As(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${qs(e)} ${ie}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||l?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Zp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Rl(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var ln="",jy=["impl_runtime","impl_model","impl_effort"],By=["claude_account","codex_account"],Uy=5,Ui=1;function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(O=>de(O,"error",4e3)),o={},i={},l=[],a=!1,c={state:"absent",values:{},warnings:[]},u={},m={},y=Promise.resolve(),b={claude:null,codex:null},k=!1,D=null,q={},Y="",ae="",ee=!1,j=!1,P=!1,U=null,X=!1;function V(){let O=t.queue?t.queue():null;return xn(O)?O:null}function _e(){let O=V();return O?O.runner_catalog:null}function W(){let O=V();return O&&xn(O.execution_defaults)?O.execution_defaults:null}function Z(){let O=t.implPresetStore?.get();return xn(O)&&Array.isArray(O.presets)?O:null}function ie(){return r===null?{}:{root_dir:r}}async function te(O,J){return X||!n?null:await n(O,J)}function Ee(O){O&&xn(O.queue)&&t.onQueueAdopt?.(O.queue)}async function He(O,J){let me=V();if(!me||X)return null;let E=await te(O,{...J,...ie(),expected_revision:me.revision});if(Ee(E),r!==null&&E&&E.conflict){let G=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:V()?.revision??me.revision;E=await te(O,{...J,...ie(),expected_revision:G}),Ee(E)}return E}async function pe(){a=!0,We();try{let O=await te("get-session-defaults",{...ie()});o=xn(O?.values)?{...O.values}:{},i={...o},l=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){l=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{a=!1,We()}}async function Q(){let O=eu(o,i);if(Object.keys(O).length!==0){try{let J=await te("set-session-defaults",{values:O,...ie()});o=xn(J?.values)?{...J.values}:{},i={...o},l=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}function Te(O,J){if(!xn(O))return;let me=O.state;c={state:me==="usable"||me==="unusable"||me==="absent"?me:"absent",values:xn(O.values)?{...O.values}:{},warnings:Array.isArray(O.warnings)?O.warnings:[]},m={...c.values},J&&(u={...m})}async function Ie(){try{Te(await te("get-workspace-accounts",{...ie()}),!0)}catch(O){c={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},u={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}We()}async function S(O){try{let J=await fetch(O);if(!J.ok)return null;let me=await J.json();if(!xn(me)||!Array.isArray(me.accounts))return null;let E=me.accounts.filter(G=>xn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:E,active:E.find(G=>G.active===!0)||null}}catch{return null}}async function oe(){k=!0;let[O,J]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);X||(b={claude:O,codex:J},We())}function ye(){let O={};for(let J of By){let me=Object.hasOwn(u,J)?u[J]:null,E=Object.hasOwn(m,J)?m[J]:null;me!==E&&(O[J]=me)}return O}async function ve(){let O=ye();if(Object.keys(O).length!==0){try{Te(await te("set-workspace-accounts",{values:O,...ie()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}function $e(O,J){J===ln?delete u[O]:u[O]=J,We(),y=y.then(()=>ve())}function be(O,J){if(jy.includes(O)){yt(O,J);return}J===ln?delete i[O]:i[O]=J,We(),Q()}function Oe(){let O=Nt().orchestration_model,J=$n({global:{orchestration_model:O??void 0},execution_defaults:W(),runner_catalog:_e()}).orchestration_model.value;return J?Nn(_e(),J):null}function Ke(O,J){typeof J=="string"&&J.length>0?i[O]=J:delete i[O]}function yt(O,J){let me=J===ln?void 0:J,E=Qd({impl_runtime:O==="impl_runtime"?me:i.impl_runtime,impl_model:O==="impl_model"?me:i.impl_model,impl_effort:O==="impl_effort"?me:i.impl_effort},_e(),Oe());Ke("impl_runtime",E.impl_runtime),Ke("impl_model",E.impl_model),Ke("impl_effort",E.impl_effort),We(),Q()}async function St(){let O=V();if(!O)return;let J={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},me=tu(J,{...J,...q});if(Object.keys(me).length!==0){try{let E=await He("worker-queue-set-orchestration-defaults",{values:me});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}}function ct(O,J){q[O]=J===ln?null:J,We(),St()}function T(O){if(D=O,!O){We();return}let J=_e(),me=Nt(),E=me.orchestration_model;E&&!Ps(J,O).includes(E)&&(q.orchestration_model=null,E=null);let G=me.orchestration_effort;G&&!Da(J,O,E||En).includes(G)&&(q.orchestration_effort=null),We(),St()}async function ce(O){if(!(!V()||O<Ui)){try{await He("worker-queue-set-slots",{slots:O})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}async function Le(O){if(!(!V()||O<Ui||O>Uy)){try{await He("worker-queue-set-serial-lane-count",{count:O})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}We()}}async function je(O,J){let me=O==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await He(me,{on:J})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}function Me(){let O={},J=Nt();for(let me of Zo){let E=nr.includes(me)?J[me]:i[me];typeof E=="string"&&E.length>0&&(O[me]=E)}return O}async function et(){let O=Z();if(!O)return;let J=Me();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let me=(O.presets||[]).find(G=>G.id===Y),E=ae.trim()||(me?me.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=me?await te("impl-preset-update",{expected_revision:O.revision,id:me.id,name:E,settings:J}):await te("impl-preset-create",{expected_revision:O.revision,name:E,settings:J});if(G&&G.applied){if(ae="",!me&&Array.isArray(G.presets)){let Re=G.presets.find(ze=>ze.name===E);Y=Re?Re.id:Y}We()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(G){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function bt(){let O=Z();if(!(!O||Y.length===0))try{let J=await te("impl-preset-delete",{expected_revision:O.revision,id:Y});J&&J.applied?(Y="",We()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function Ve(O){o=xn(O.values)?{...O.values}:{},i={...o},l=Array.isArray(O.warnings)?O.warnings:[],xn(O.queue)&&(t.onQueueAdopt?.(O.queue),q={})}async function z(){let O=Z(),J=V();if(!O||!J||Y.length===0)return;let me=E=>({preset_id:Y,expected_revision:O.revision,expected_queue_revision:E,...ie()});try{let E=await te("apply-impl-preset-global",me(J.revision));if(E&&E.applied&&Ve(E),r!==null&&E&&E.queue_applied===!1){let G=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:V()?.revision??J.revision;E=await te("apply-impl-preset-global",me(G)),E&&E.applied&&Ve(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}async function ne(){j=!0,P=!1,We();try{let O=await te("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?P=!0:U=O}catch{P=!0}finally{j=!1,We()}}function De(){if(ee=!ee,ee&&!U){ne();return}We()}function lt(){let O=os({loading:j,error:P});if(O)return O;if(!U)return"";let J=Array.isArray(U.variants)?U.variants:[];return d`<div class="settings-dialog__sp-body">
      ${U.target_base_placeholder?d`<div class="prompt-block__meta">
            \`${U.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(me=>d`<div class="settings-dialog__sp-variant" data-variant=${me.key}>
            <div class="settings-dialog__sp-cond">${me.condition}</div>
            ${ir(me.label,me.system_prompt)}
          </div>`)}
    </div>`}function it(){return d`<section
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
        aria-expanded=${ee?"true":"false"}
        @click=${De}
      >
        ${ee?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${ee?lt():""}
    </section>`}function Pe(O,J,me,E,G,Re,ze){let xe=G[O]??ln,at=Pa(O,me,G,W(),_e(),ze),st=at.options.find(Je=>Je.value===xe),he=xe===ln?at.full_value:st?.full_value;return d`<select
        class=${xe===ln?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${J}
        title=${he||""}
        ?disabled=${Re===!0||at.disabled}
        .value=${Lr(String(xe))}
        @change=${Je=>E(O,String(Je.target.value))}
      >
        <option value=${ln} ?selected=${xe===ln}>
          ${at.unset_label}
        </option>
        ${at.options.map(Je=>d`<option
              value=${Je.value}
              title=${Je.full_value||""}
              ?selected=${Je.value===xe}
            >
              ${Je.label}
            </option>`)}
      </select>
      ${xe===ln?d`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ue(O,J,me,E,G,Re=!1,ze){return d`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Pe(O,J,me,E,G,Re,ze)}
      </span>
    </div>`}function dt(O,J){let me=J?J.active:null;return xn(me)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${O==="claude"?me.email:as({...me,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function tt(O,J,me){let E=b[me],G=Object.hasOwn(u,O)?u[O]:ln,Re=me==="claude"?Ni:as,ze=!!E?.accounts.some(xe=>xe.key===G);return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${O}
          @change=${xe=>$e(O,String(xe.target.value))}
        >
          <option value=${ln} ?selected=${G.length===0}>
            ${dt(me,E)}
          </option>
          ${G.length>0&&!ze?d`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(xe=>d`<option value=${xe.key} ?selected=${xe.key===G}>
                ${Re(xe)}
              </option>`)||""}
        </select>
        ${E?"":d`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _t(){let O=c.warnings.join(", ");return c.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${O} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:c.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${O}`:null}function Pt(O,J,me,E,G){return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(me,`${O} \uBAA8\uB378`,E,be,i,!1)}
        ${Pe(G,`${O} effort`,ei,be,i,!1)}
      </span>
    </div>`}function Ft(O,J,me,E){return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${E?"true":"false"}
          aria-label=${J}
          @click=${()=>je(O,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${me}</span>
      </span>
    </div>`}function Ht(O,J,me,E){return d`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>E(me-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${me}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>E(me+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(O){return d`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(J=>d`<div
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
      ${O.ignored_keys.length>0?d`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Nt(){let O=V(),J={};for(let me of nr)J[me]=Object.prototype.hasOwnProperty.call(q,me)?q[me]:O&&typeof O[me]=="string"?O[me]:null;return J}function wt(){let O=_e(),J=i.impl_runtime,me=i.impl_model,E=Z(),G=V(),Re=Nt(),ze=Ps(O,D),xe=Jr(O,void 0).filter(ke=>ke!==En),at=Da(O,D,Re.orchestration_model||En).filter(ke=>ke!==En),st=Y?(E?.presets||[]).find(ke=>ke.id===Y):null,he=st?Jd(Me(),xn(st.settings)?st.settings:{}):null,Je=G&&typeof G.slots=="number"?G.slots:Ui+1,M=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Ui,F=W()?.supported===!0,we=_t(),Xe=Pa("workflow_mode",Is,i,W(),O);return d`
      ${l.length>0?d`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${we?d`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${we}
          </div>`:""}
      ${F?"":d`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?d`<div class="settings-dialog__empty">불러오는 중…</div>`:d`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Lr(Y)}
                @change=${ke=>{Y=String(ke.target.value),We()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(ke=>d`<option
                      value=${ke.id}
                      ?selected=${ke.id===Y}
                    >
                      ${ke.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!he||he.rows.length===0}
                @click=${z}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Lr(ae)}
                @input=${ke=>{ae=String(ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
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
            ${he?Mt(he):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Lr(D||ln)}
                    @change=${ke=>{let Ze=String(ke.target.value);T(Ze===ln?null:Ze)}}
                  >
                    <option value=${ln} ?selected=${!D}>
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
              ${Ue("orchestration_model","\uBAA8\uB378",ze,ct,Re)}
              ${Ue("orchestration_effort","effort",at,ct,Re)}
              ${Ue("orchestration_speed","\uC18D\uB3C4",Ls,ct,Re)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${tt("claude_account","Claude","claude")}
              ${tt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${ln}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>be("workflow_mode",ln)}
                    >
                      ${Xe.unset_label}
                    </button>
                    ${i.workflow_mode?"":d`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Is.map(ke=>d`<button
                          type="button"
                          data-mode=${ke}
                          aria-pressed=${String(i.workflow_mode===ke)}
                          @click=${()=>be("workflow_mode",ke)}
                        >
                          ${ke}
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
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Jo,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ds,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ue("impl_runtime","\uC704\uC784 \uB300\uC0C1",Qo,be,i)}
              ${Ue("impl_model","\uBAA8\uB378",Jr(O,J),be,i)}
              ${Ue("impl_effort","effort",es(O,J,me),be,i)}
              ${Ue("impl_speed","\uC18D\uB3C4",Ls,be,i)}
              ${Ue("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",xe,be,i,!1,{...i,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ft("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",G?.auto_advance===!0)}
              ${Ft("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",G?.auto_merge===!0)}
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Je,ke=>ce(ke))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",M,ke=>Le(ke))}
            </div>
            ${it()}
          `}
    `}function We(){X||rt(wt(),e)}return{load(){q={};let O=[pe(),Ie()];return k||O.push(oe()),Promise.all(O).then(()=>{})},render:We,sessionDraft:()=>({...i}),destroy(){X=!0,rt(d``,e)}}}function zi(e){return d`<svg
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
  </svg>`}function Qp(){return zi(hs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Jp(){return zi(hs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ef(){return zi(hs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function tf(){return zi(hs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function nf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function rf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return an(Go(t));let n={};for(let l of Vn)n[l]=0;let r=!1,s=0,o=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let c=!1;for(let u of Vn){let m=a[u];typeof m=="number"&&Number.isFinite(m)&&(n[u]+=m,r=!0,c=!0)}if(c){o+=1;let u=a.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(s+=u,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?tr(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ol(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Wy(e,t){if(!zn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function zy(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=$n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),s=Er(n,e.runner_catalog),o=_r(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function sf(e,t){let n=t.notify||(S=>de(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",o.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",s.append(o,a),e.appendChild(s);let c=null,u=null,m=null,y=new Map;function b(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(oe=>zn(oe)):[]}function k(S){return b().find(oe=>oe.root_dir===S)||null}function D(S){return Wy(k(S),y.get(S))}function q(){for(let S of b()){let oe=y.get(S.root_dir);oe&&typeof oe.revision=="number"&&typeof S.revision=="number"&&S.revision>=oe.revision&&y.delete(S.root_dir)}}async function Y(S,oe,ye){let ve=t.transport,$e=D(oe);if(!(!ve||!zn($e))){try{let be=await ve(S,{...ye,root_dir:oe,expected_revision:$e.revision});if(zn(be?.queue)&&y.set(oe,be.queue),be&&be.conflict){let Oe=zn(be.queue)&&typeof be.queue.revision=="number"?be.queue.revision:D(oe)?.revision;be=await ve(S,{...ye,root_dir:oe,expected_revision:Oe}),zn(be?.queue)&&y.set(oe,be.queue)}}catch(be){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${be instanceof Error?be.message:String(be)}`)}Q()}}function ae(S){c!==S&&(c=S,t.onFocusChange?.(c),Q())}function ee(S){ae(c===S?null:S)}function j(S){if(u===S){U();return}P(),u=S;let oe=k(S);i.textContent=`${oe?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=Wi(a,{root_dir:S,queue:()=>D(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{y.set(S,ye),Q()}}),m.load(),Q()}function P(){m?.destroy(),m=null}function U(S){P(),u=null,s.hidden=!0,i.textContent="",S!==!0&&Q()}let X=()=>U();l.addEventListener("click",X);function V(S){S.key==="Escape"&&c!==null&&ae(null)}document.addEventListener("keydown",V);function _e(S,oe){let ye=Math.max(oe,S,1);return d`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(ve,$e)=>$e<S?d`<i class="mon2-deck__slot is-run"></i>`:d`<i class="mon2-deck__slot"></i>`)}
    </span>`}function W(S){let oe=S.auto_advance===!0,ye=S.auto_merge===!0;return d`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?Jp():Qp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${ef()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${u===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${u===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${tf()}
      </button>`}function Z(S){let oe=zy(S);return oe?d`<div class="mon2-deck__chips">
      ${oe.orchestration?d`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?d`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function ie(S){let oe=[];for(let[ye,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let $e=Ol(S,ye);$e>0&&oe.push(`${ve} ${$e}`)}return oe.join(" \xB7 ")}function te(S){let oe=Ol(S,"running"),ye=typeof S.slots=="number"?S.slots:1;return d`<div
      class=${`mon2-deck__tile${c===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${c===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${ye}</span>
          ${_e(oe,ye)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${S.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${W(S)}</div>
        <span class="mon2-deck__counts">${ie(S)}</span>
        ${Z(S)}
      </div>
    </div>`}function Ee(S){let oe=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",ve=rf(Array.isArray(oe)?oe:[]),$e=be=>S.reduce((Oe,Ke)=>Oe+Ol(Ke,be),0);return d`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${$e("running")} · 대기 ${$e("queue")} · PR
        ${$e("pr_wait")}${$e("session_active")>0?` \xB7 \uC138\uC158 ${$e("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${ve===null?"":d`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?d`<span
                  class="mon2-deck__tok"
                  title=${nf(ye)}
                  >${ve}</span
                >`:ve.map(be=>d`<span
                      class="mon2-deck__tok"
                      data-provider=${be.provider}
                      title=${be.tooltip}
                      >${be.label}</span
                    >`)}
          </span>`}
    </div>`}function He(){let S=b();return S.length===0?"":d`${Ee(S)}
      <div class="mon2-deck__strip">
        ${S.map(oe=>te(oe))}
      </div>`}function pe(){c!==null&&!k(c)&&(c=null,t.onFocusChange?.(null))}function Q(){q(),pe(),u!==null&&!k(u)&&U(!0),rt(He(),r),m?.render()}function Te(S){let oe=S.target;if(!oe||typeof oe.closest!="function")return;let ye=oe.closest("[data-root-dir]");if(!ye)return;let ve=ye.getAttribute("data-root-dir")||"",$e=oe.closest("[data-act]")?.getAttribute("data-act");if($e==="worker"){t.gotoWorkerTab?.(ve);return}if($e==="auto"){Y("worker-automation-toggle",ve,{on:D(ve)?.auto_advance!==!0});return}if($e==="merge"){Y("worker-merge-auto-toggle",ve,{on:D(ve)?.auto_merge!==!0});return}if($e==="gear"){j(ve);return}ee(ve)}function Ie(S){if(S.key!=="Enter"&&S.key!==" ")return;let oe=S.target;if(!oe||typeof oe.closest!="function")return;let ye=oe.closest('[data-root-dir][role="button"]');!ye||ye!==oe||(S.preventDefault(),ee(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Te),r.addEventListener("keydown",Ie),{render:Q,focusRoot:()=>c,panelRoot:()=>u,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",Te),r.removeEventListener("keydown",Ie),l.removeEventListener("click",X),P(),rt(d``,r),e.replaceChildren()}}}var of="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Hy=1e4;function af(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function lf(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var pf="bdui.monitor.done-range",ff="bdui.monitor.running_sort",_f="bdui.monitor.candidate_sort",mf="beads-ui.monitor.candidate-filter",gf="beads-ui.monitor.sections";function Gy(){try{let e=window.localStorage.getItem(mf);if(!e)return{...rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...rs}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:rs.show_blocked,spec:Va.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...rs}}}function cf(e){try{window.localStorage.setItem(mf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ky(){try{let e=window.localStorage.getItem(_f);return zs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Vy(e){try{window.localStorage.setItem(_f,e)}catch{}}function Yy(){try{let e=window.localStorage.getItem(gf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Xy(e){try{window.localStorage.setItem(gf,JSON.stringify(e))}catch{}}function Zy(){try{let e=window.localStorage.getItem(pf);return e===null?"today":Gn(e)}catch{return"today"}}function Qy(e){try{window.localStorage.setItem(pf,e)}catch{}}function Jy(){try{return window.localStorage.getItem(ff)==="repo"?"repo":"started"}catch{return"started"}}function ev(e){try{window.localStorage.setItem(ff,e)}catch{}}var bf="tab:monitor:pipeline",tv=1e3,df=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],nv=["queue","runnable","done"],uf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function rv(e){return e>=1&&e<=uf.length?uf[e-1]:`(${e})`}function hf(e,t){let n=qt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),y=Zy(),b=Jy(),k=Gy(),D=Ky(),q=Yy(),Y=Bi("beads-ui.monitor.lane-collapsed"),ae=!1,ee=null,j=null,P=null,U=null,X=[],V=null,_e=null,W=null,Z=null;function ie(f){return Z===null&&(Z=Jt()),Pd(f,Z)}function te(f,g){Ee(),!(g<=0)&&(_e={lane_id:f,corrected:g},W=setTimeout(()=>{W=null,_e=null,he()},Hy))}function Ee(){W!==null&&(clearTimeout(W),W=null),_e=null}function He(){let f=Fr.find(g=>g.value===y);return f?f.label:""}let pe=document.createElement("div");pe.className="mon",e.appendChild(pe);let Q=document.createElement("div");Q.className="worker-drawer-overlay",Q.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let Ie=document.createElement("div");Ie.className="worker-drawer-host mon2-drawer",Q.append(Te,Ie),e.appendChild(Q);let S=Hs(null,null),oe=new Map,ye=new Map,ve=null,$e=null,be=null,Oe=is(Ie,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,Q.hidden=!0,he()}});async function Ke(f,g,w,$,N=!0){if(!o||!w)return null;let H=await o(f,{...g,root_dir:w,expected_revision:$});if(H&&H.conflict&&N){H.queue&&ye.set(w,H.queue);let se=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$;H=await o(f,{...g,root_dir:w,expected_revision:se})}return H&&H.queue&&w&&ye.set(w,H.queue),H}function yt(f,g){let w=ye.get(f),$=s&&s.get?s.get():null,N=(Array.isArray($)?$:[]).find(se=>se?.root_dir===f);return(w||N)?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action}async function St(f,g,w,$){let N=await Ke(f,g,w,$),H=ye.get(w)?.revision??N?.queue?.revision??$;return er(N,(se,Se)=>Ke(f,{...g,continuation:se,decision_token:Se},w,H,!1),{refresh:se=>Ke(f,g,w,se?.queue?.revision??ye.get(w)?.revision??H,!1)})}async function ct(f,g,w,$){let N=await er({continuation_mismatch:$},(se,Se)=>Ke("worker-merge-queue-add",{bead_id:g,continuation:se,decision_token:Se},f,w,!1)),H=N?.queue?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action;N?.applied!==!0&&H?.continuation===null&&H.mismatch&&await ct(f,g,N.queue.revision,H.mismatch)}async function T(f,g,w){let $=await Ke("worker-discard",f,g,w);if($&&$.discarded===!0){de(di($),"success",5e3);return}if($&&$.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ce(f,g,w){return!o||!w?null:await o(f,{...g,root_dir:w})}async function Le(){let f=new Map;for(let g of S.pr_wait)f.has(g.root_dir)||f.set(g.root_dir,g.expected_revision);for(let[g,w]of f)await Ke("worker-merge-queue-add-all",{},g,w)}function je(f){let g=q[f];return!!(g&&g.runnable===!0)}function Me(f){let g={...q[f]||{}};g.runnable=!g.runnable,q={...q,[f]:g},Xy(q),he()}function et(f){Y.toggle(f),he()}function bt(f){Y.toggleArea(f),he()}function Ve(f){let g=S.queue_groups.find(w=>w.root_dir===f);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let $=`s${w+1}`,N=g.sublanes.serial.find(H=>H.id===$);if(!N||N.raw_length===0&&N.occupied_by.length===0)return $}return null}function z(f,g){let w=S.queue_groups.find(N=>N.root_dir===f),$=w?w.sublanes.serial.find(N=>N.id===g):void 0;return $?$.raw_length:0}function ne(f,g){let w=oe.get(f),$=oe.get(g);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let N=af(w),H=af($);if(N!==null&&N===H&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let se=lf(w),Se=lf($);if(se&&H!==null){let Ye=H;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:f,lane:Ye,index:z($.root_dir,Ye)}]}}if(N!==null&&Se&&H===null){let Ye=N;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ye,index:z(w.root_dir,Ye)}]}}if(se&&N===null&&Se&&H===null){let Ye=Ve(w.root_dir);return Ye===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ye} \uB808\uC778\uC5D0 ${g} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ye,index:0},{bead_id:f,lane:Ye,index:1}]}}return!se&&!Se?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:se?{kind:"note",text:`${io($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${io(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function De(f,g){let w=ne(f,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:of,title:w.title}:{kind:"place",label:of,title:w.title}}}function lt(f,g){if(!U||U.bead_id!==f)return null;let w=U.counterpart_id,$=g.filter(N=>N.id===w);return $.length===0?null:{rows:$.map(N=>De(f,N))}}function it(f){let g=f.dependency_chips||null,w=f.overlap_chips||[],$=f.scope_state==="missing",N=f.cross_lane_chip,H=f.armed_lane_chip;if(!g&&w.length===0&&!$&&!N&&!H)return null;let se=lt(f.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...N?{cross_lane:{lane_id:N.lane_id,label:N.label}}:{},...H?{armed_lane:H}:{},...se?{popover:se}:{}}}function Pe(f){let g=it(f);return g?{...f,dependency_chips:g}:f}async function Ue(f,g){let w=ne(f,g);if(U=null,w.kind!=="ops"){he();return}let $=mn(w.root_dir,w.ops[0].bead_id);for(let N of w.ops){let H=await dt(N,w.root_dir,$);if(H===null)break;$=H}he()}async function dt(f,g,w){try{let $=await Ke("worker-queue-place",f,g,w,!1);if($&&$.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return de($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let N=$.queue?$.queue.revision:void 0;return typeof N!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):N}catch($){return de(ot($),"error"),null}}function tt(f){let g=je(f.root_dir);return d`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
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
    </header>`}function _t(f,g){return d`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${g}
    </div>`}function Pt(f){if(P!==f.id)return null;let g=S.queue_groups.find(H=>H.root_dir===f.root_dir),w=f.place_lanes||[],$=S.cross_lanes_revision!==null,N=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let H of S.chain_lanes)N.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});N.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of w)N.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:N}}function Ft(f){return _t(f,d`${Ba(Pe(f),Pt(f),{exec_chips_mode:"pinned_only",onOpenDoc:l?(g,w)=>l(w,f.root_dir):void 0})}`)}function Ht(){return S.runnable_flat?d`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(f=>Ft(f))}
      </div>`:d`${S.runnable_sections.map(f=>{let g=je(f.root_dir);return d`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${tt({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${g?"":d`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(w=>Ft(w))}
            </div>`}
      </section>`})}`}function Mt(f,g=!1){return d`<span class="worker-mini__rowops">
      ${g?d`<button
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
    </span>`}function Nt(f,g){return d`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${g}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Fn(Pe(f),{actions:Mt(f,!0)})}
    </div>`}function wt(f,g,w,$){return d`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${w}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${rv(g.seq)}</span
      >
      ${g.workspace_name?d`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?d`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(g.id)?d`<span
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
    </div>`}function We(f){let g=S.cross_lanes_revision!==null,w=ie(f.lane_id),$=w?.held===!0,N=w?.cycle===!0,H=w?w.mismatched:[],se=_e&&_e.lane_id===f.lane_id?_e.corrected:0;return d`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${se>0?d`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${N?d`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?d`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Vo}</span
            >`:""}
        ${f.draft?d`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!g||!f.can_confirm||$}
              title=${$?Vo:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?d`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?d`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?d`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!g}
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
        ${f.rows.length===0?d`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((Se,Ye)=>wt(f,Se,Ye,H))}
      </div>
    </div>`}function O(f,g,w){return d`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.id}
      data-row-index=${w}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Fn(Pe(g),{actions:Mt(g)})}
    </div>`}function J(f){if(f.length===0)return"";let g=f.length-1;return`${f[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function me(f){return d`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Fn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function E(f,g){let w=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(N=>me(N)),...g.items.map((N,H)=>O(g,N,H))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:d`<span
              class="mon2-lane__occupant"
              title=${w.map(N=>`${N.id} \u2014 ${N.badge}`).join(`
`)}
              >${J(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:d`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:d`${$.map(N=>d`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${N.workspace_name}·${N.lane}과 교차 대기
                </div>`)}`}:{}}}function G(){let f=S.cross_lanes_revision!==null,g=S.chain_lanes.some(w=>w.draft&&w.rows.length===0);return gi({parallel:{rows:S.parallel_rows.map((w,$)=>Nt(w,$)),count:S.parallel_rows.length,collapsed:Y.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(w=>w.sublanes.serial.map($=>({...E(w,$),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Y.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(w=>We(w)),header_control:d`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!f}
          title=${f?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:d`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Re(f){return d`<div class="worker-rungrid">
      ${S.running.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(g=>Rl({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},f,j,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:it(g)}}))}
    </div>`}function ze(f){let g={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},w=$=>{let N=g[$.lane],H=$.lane==="runnable"?S.runnable_flat?N.length>0?Ht():void 0:S.runnable_sections.length>0?Ht():void 0:$.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?G():void 0:$.lane==="running"?Re(f):N.length>0?d`${N.map(se=>Fn(se))}`:void 0;return Yn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:N,count:N.length,src:$.lane==="runnable",empty:$.empty,body:H,live:$.lane==="running"&&N.length>0,collapsible:!0,collapsed:Y.isCollapsed($.pane),controls:$.lane==="runnable"?xe():void 0,header_control:at($.lane,N.length)})};if(ae){let $=nv.map(N=>df.find(H=>H.lane===N)).filter(N=>N!==void 0);return d`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${bi({live:S.running.length>0,running_body:S.running.length>0?Re(f):"",pr_wait_rows:S.pr_wait.map(N=>Fn(N)),count:S.running.length+S.pr_wait.length})}
            ${$.map(N=>w(N))}
          </div>
        </div>`}return d`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${df.map($=>w($))}
        </div>
      </div>`}function xe(){return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${S.runnable_hidden.blocked>0?` ${S.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Va.map(f=>d`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?d`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function at(f,g){return f==="runnable"?d`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${D}
      >
        ${zs.map(w=>d`<option
              value=${w.value}
              ?selected=${D===w.value}
            >
              ${w.label}
            </option>`)}
      </select>`:f==="running"?d`<select
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
      </select>`:f==="pr_wait"&&g>0?d`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?d`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${Fr.map(w=>d`<option value=${w.value} ?selected=${y===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function st(f){let g=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,N={done_since:$r(y,u()),running_sort:b,candidate_filter:k,candidate_sort:D};return $!==void 0&&(N.cross_lanes=$),Hs(g,w,N)}function he(){let f=u();S=st(),Z=null,oe=new Map;for(let g of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!g.non_occupying&&!oe.has(g.id)&&oe.set(g.id,g);rt(ze(f),pe),M()?.render(),Je(),F()}function Je(){let f=new Map;for(let g of S.queue_groups)f.set(g.root_dir,g.auto_advance);for(let g of Array.from(pe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=f.get(w);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function M(){if(be)return be;let f=pe.querySelector(".mon2-deck");return f?(be=sf(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:He,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:g=>{V=g,F()}}),be):null}function F(){pe.classList.toggle("has-focus",V!==null);for(let f of Array.from(pe.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V);for(let f of Array.from(pe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=oe.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",V!==null&&!!g&&g.root_dir===V)}for(let f of Array.from(pe.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V)}function we(f,g){let w=i?i():void 0;if(!g||!w||g===w||!a){r(f);return}a(g).then(()=>{r(f)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function Xe(f){if(!f)return;let g=i?i():void 0,w=()=>{try{c?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||g&&g===f){w();return}a(f).then(w).catch($=>{n("workspace switch for %s failed: %o",f,$),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ke(f){Mn(f).then(g=>{de(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Ze(f){let g=oe.get(f)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function ot(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function mt(f,g,w){if(f!=="dep-add")return;let $=S.chain_lanes.find(N=>N.rows.some(H=>H.id===g));!$||!$.rows.some(N=>N.id===w)||await ue(N=>Bd($.lane_id,N),"",[{type:f,a:g,b:w}])}function $t(){let f=new Map,g=s&&s.get?s.get():null,w=$=>Array.isArray($)?$.filter(N=>typeof N=="string"&&N.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let N=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[H,se]of Object.entries(N))Array.isArray(se)&&f.set(H,w(se));for(let H of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&f.set(H.bead_id,w(H.blocked_by))}return f}function Kt(){let f=new Map,g=new Map,w=s&&s.get?s.get():null,$=N=>Array.isArray(N)?N.filter(H=>typeof H=="string"&&H.length>0):[];for(let N of Array.isArray(w)?w:[]){if(!N||typeof N!="object")continue;let H=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[se,Se]of Object.entries(H))Array.isArray(Se)&&f.set(se,$(Se));for(let se of Array.isArray(N.runnable)?N.runnable:[])se&&typeof se.bead_id=="string"&&Array.isArray(se.blocked_by)&&g.set(se.bead_id,$(se.blocked_by))}for(let N of X)for(let H of[f,g]){let se=H.get(N.a);se!==void 0&&H.set(N.a,N.type==="dep-remove"?se.filter(Se=>Se!==N.b):se.includes(N.b)?se:[...se,N.b])}return{snapshot:f,runnable:g}}function Et(){let f=$t();for(let g of X){let w=(f.get(g.a)||[]).slice();g.type==="dep-remove"?f.set(g.a,w.filter($=>$!==g.b)):w.includes(g.b)||f.set(g.a,[...w,g.b])}return f}function Jt(f=S,g=Ne()){let w=new Map;for(let nt of Array.isArray(g?.lanes)?g.lanes:[]){let Fe=new Map;for(let v of Array.isArray(nt?.entries)?nt.entries:[])v&&typeof v.bead_id=="string"&&Fe.set(v.bead_id,v.dep_created_by_lane===!0);w.set(typeof nt?.id=="string"?nt.id:"",Fe)}let $=new Map,N=new Map,H=new Set,se=new Set;for(let nt of f.chain_lanes){let Fe=w.get(nt.lane_id);$.set(nt.lane_id,{status:nt.status,entries:nt.rows.map((v,K)=>({bead_id:v.id,root_dir:v.root_dir,...K===0?{}:{dep_created_by_lane:Fe?.get(v.id)===!0}}))});for(let v of nt.rows)N.set(v.id,nt.lane_id),v.fixed&&H.add(v.id),v.unplaced||se.add(v.id)}let Se=new Map;for(let nt of f.parallel_rows)typeof nt.queue_index=="number"&&Se.set(nt.id,nt.queue_index);for(let nt of f.queue_groups)for(let Fe of nt.sublanes.serial)for(let v of Fe.items)typeof v.queue_index=="number"&&Se.set(v.id,v.queue_index);let Ye=Kt();return{blocked_by_map:Et(),snapshot_blocked_by:Ye.snapshot,runnable_blocked_by:Ye.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:$,owner_lane_of:N,fixed_members:H,placed_members:se,parallel_rows:f.parallel_rows.map(nt=>({bead_id:nt.id,root_dir:nt.root_dir,queue_index:nt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:Se}}function Ne(){return(s&&s.crossLanes?s.crossLanes():null)??null}function mn(f,g){let w=oe.get(g);if(w&&w.root_dir===f)return w.expected_revision;let $=S.queue_groups.find(N=>N.root_dir===f);return $?$.revision:0}async function en(f,g,w){if(f.type==="worker-queue-disarm"){try{let $=await Ke(f.type,f.payload,f.root_dir,w.get(f.root_dir)??mn(f.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&w.set(f.root_dir,$.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await jt(f.type,f.payload,f.root_dir,w,{bead_id:g})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await ce(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch($){return de(ot($),"error"),!1}}async function jt(f,g,w,$,N){try{let H=await Ke(f,g,w,$.get(w)??mn(w,N.bead_id));return!H||typeof H.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(H.queue&&typeof H.queue.revision=="number"&&$.set(w,H.queue.revision),H.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):H.applied===!1?(de(H.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${H.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$.get(w)??0)}catch(H){return de(ot(H),"error"),null}}function Qt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(X=[...X,{type:f.type,a:f.a,b:f.b}])}async function gn(f,g){if(!o)return{ok:!1};try{let w=await o(f.type,{...f.payload,expected_revision:g});return!w||typeof w.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,N=$&&$.code==="conflict"?$.details?.cross_lanes:null;return N&&typeof N.revision=="number"&&Array.isArray(N.lanes)?{ok:!1,conflict:N}:(de(ot(w),"error"),{ok:!1})}}async function fe(f,g,w){let $=new Map,N=[],H=f.ops.slice(0,f.lane_op_index),se=f.ops.slice(f.lane_op_index);for(let Ye of H){if(!await en(Ye,w,$))return{done:!0};Qt(Ye)}let Se=g;for(let Ye of f.lane_ops){if(Se===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let nt=await gn(Ye,Se);if(!nt.ok)return nt.conflict?{done:!1,conflict:nt.conflict}:{done:!0};Se=nt.revision}for(let Ye of se){if(!await en(Ye,w,$))return{done:!0};Qt(Ye),Ye.type==="dep-add"&&N.push(Ye)}for(let Ye of zd(N))Se=await A(Ye,Se);return{done:!0}}async function A(f,g){if(g===null||!o)return g;let w=f.pairs,$=g;for(let N=0;N<2;N+=1){if(w.length===0)return $;try{let H=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:w.map(se=>({bead_id:se.bead_id,after:se.after,value:!0})),expected_revision:$});return H&&typeof H.revision=="number"?H.revision:$}catch(H){let se=H,Se=se&&se.code==="conflict"?se.details?.cross_lanes:null;if(!Se||typeof Se.revision!="number"||!Array.isArray(Se.lanes))return $;let Ye=Se.lanes.find(nt=>nt&&nt.id===f.lane_id);w=Hd(Array.isArray(Ye?.entries)?Ye.entries:[],w),$=Se.revision}}return $}async function ue(f,g,w=[]){X=w,Ee();let $=S,N=Ne();for(let H=0;;H+=1){let se=f(Jt($,N));if("refused"in se){de(se.refused,"error");break}let Se=await fe(se,$.cross_lanes_revision,g);if(Se.done){se.correction&&te(se.correction.lane_id,se.correction.corrected);break}if(H>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=st(Se.conflict),N=Se.conflict}X=[],he()}async function Ce(f,g){await ue(w=>Ra(f,g,w),f.bead_id)}async function vt(f,g){if(f==="run"){await xt(g);return}if(f==="stop"){await Bt(g);return}if(f==="create"){await ue(w=>Oa(null,w),"");return}if(f==="remove"){let w=Wd(g,Jt());if(w!==null&&!m(w))return;await ue($=>Ud(g,$),"");return}await ue(w=>f==="confirm"?Fd(g,w):jd(g,w),"")}function Tt(f){let g=new Map;for(let w of f.rows){let $=S.owner_of[w.id]||w.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],w.id])}return g}async function xt(f){let g=S.chain_lanes.find(H=>H.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Ee();let w=new Map,$=new Map,N=Tt(g);for(let H of g.rows){if(!H.unplaced)continue;let se=S.owner_of[H.id]||H.root_dir;if(typeof se!="string"||se.length===0){de(`${H.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),he();return}let Se=$.get(se)??0;if(await jt("worker-queue-place",{bead_id:H.id,lane:"parallel",index:(S.parallel_raw_length[se]??0)+Se},se,w,{bead_id:H.id})===null){he();return}$.set(se,Se+1)}for(let[H,se]of N)if(await jt("worker-queue-arm",{bead_ids:se,lane_id:f},H,w,{bead_id:se[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),he();return}he()}async function Bt(f){let g=S.chain_lanes.find($=>$.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Ee();let w=new Map;for(let[$,N]of Tt(g))if(await jt("worker-queue-disarm",{lane_id:f},$,w,{bead_id:N[0]})===null)break;he()}async function nn(f,g){let{root_dir:w,revision:$}=Ze(f);if(w.length===0){he();return}await jt("worker-queue-disarm",{bead_ids:[f],lane_id:g},w,new Map([[w,$]]),{bead_id:f}),he()}async function rn(f,g){let w=oe.get(f);if(!w){he();return}let $={kind:"candidate",bead_id:f,root_dir:w.root_dir};if(g==="new-lane"){await ue(N=>Oa({bead_id:f,root_dir:w.root_dir},N),f);return}if(g.startsWith("lane:")){let N=g.slice(5);if(!S.chain_lanes.find(se=>se.lane_id===N)){he();return}await ue(se=>Ra($,{kind:"chain",lane_id:N,marker_index:(se.cross_lanes.get(N)?.entries??[]).length},se),f);return}if(g.startsWith("serial:")){let N=g.slice(7),H=(w.place_lanes||[]).find(se=>se.id===N);await Ce($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:N,index:H?H.index:0});return}await Ce($,{kind:"parallel",marker_index:S.parallel_rows.length})}async function Tn(f,g){let w=S.parallel_rows,$=w.findIndex(nt=>nt.id===f);if($<0)return;let N=w[$].root_dir,H=[];w.forEach((nt,Fe)=>{nt.root_dir===N&&H.push(Fe)});let se=H.indexOf($),Se=H[se+g];if(typeof Se!="number")return;let Ye=g===-1?Se:H[se+2]??Math.min(w.length,Se+1);await Ce({kind:"parallel",bead_id:f,root_dir:N,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:Ye})}async function Ot(f){for(let g of S.chain_lanes){let w=g.rows.find($=>$.id===f);if(w){await Ce({kind:"chain",bead_id:f,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}let on=null,cn=!1,dn=null;function Hn(){dn!==null&&clearTimeout(dn),dn=setTimeout(()=>{dn=null,cn=!1},0)}function x(f,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&f.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return f.querySelectorAll("[data-row-index]").length}function C(f){let g=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:S.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function p(f){let g=f.target;if(!on)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return C(g);let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:x(w,g)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:x(w,g)}};if($==="repo-serial"){let N=w.getAttribute("data-root-dir")||"";if(N!==on.root_dir)return null;let H=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,se=H&&w.contains(H)?H.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Se=Number(se);return{zone:w,target:{kind:"repo-serial",root_dir:N,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Se)?Se:0}}}return null}function h(){for(let f of Array.from(pe.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let R=null;function re(f){R=f.target instanceof Element?f.target:null}function ge(f){let g=f.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;if(w&&R&&w.contains(R)&&typeof R.closest=="function"&&R.closest("input, button, a")){f.preventDefault();return}let N=$.getAttribute("data-bead-id")||"",H=$.getAttribute("data-drag-kind")||"",se=$.getAttribute("data-root-dir")||"";if(!N||!H||!se)return;let Se=$.getAttribute("data-queue-index")||"",Ye=Number(Se),nt=$.getAttribute("data-lane-id")||"";on={kind:H,bead_id:N,root_dir:se,...Se!==""&&Number.isFinite(Ye)?{queue_index:Ye}:{},...nt?{lane_id:nt}:{}},cn=!0,P=null,pe.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",N),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function pt(f){let g=p(f);g&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function ut(f){let g=f.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Vt(){on=null,h(),pe.classList.remove("is-dragging"),Hn()}function Ut(f){let g=p(f),w=on;on=null,h(),pe.classList.remove("is-dragging"),!(!g||!w)&&(f.preventDefault(),Ce(w,g.target))}function Gt(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Cn(f,g){let{item:w,root_dir:$,revision:N}=Ze(g),H=w?.attempt_id||"",se=f.classList;if(se.contains("worker-mini__rowops-up")||se.contains("worker-mini__rowops-down")){Tn(g,se.contains("worker-mini__rowops-up")?-1:1);return}if(se.contains("worker-mini__rowops-remove")){Ke("worker-queue-remove",{bead_id:g},$,N);return}if(se.contains("mon2-crow__detach")){Ot(g);return}if(se.contains("worker-dep__open")){we(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(se.contains("mon2-arm__release")){nn(g,f.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let Se=f.getAttribute("data-lane-id")||"";pe.querySelector(`.mon2-clane[data-lane-id="${Se}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("mon-overlap__chip")){let Se=f.getAttribute("data-overlap-id")||"";U=!!U&&U.bead_id===g&&U.counterpart_id===Se?null:{bead_id:g,counterpart_id:Se},he();return}if(se.contains("mon-overlap__place")){Ue(g,f.getAttribute("data-counterpart-id")||"");return}if(se.contains("worker-card__place")){P=P===g?null:g,he();return}if(se.contains("worker-card__place-cancel")){P=null,he();return}if(se.contains("worker-card__place-lane")){let Se=f.getAttribute("data-lane")||"parallel";P=null,rn(g,Se);return}if(se.contains("rtile__session")){if(w&&w.kind==="session"){let Se=(w.session_refs||[]).find(Ye=>Ye&&Ye.current===!0);Se&&(Q.hidden=!1,Oe.open(Yr(Se,g,"in_progress",$)),he());return}j=H,H&&w&&(Q.hidden=!1,Oe.open({attempt_id:H,root_dir:$,meta:Gt(w)})),he();return}if(se.contains("rtile__pause")){ce("worker-attempt-pause",{attempt_id:H},$);return}if(se.contains("rtile__resume")){Vr().then(Se=>{if(Se!==null)return St("worker-attempt-resume",{attempt_id:H,...Se!==""?{instructions:Se}:{}},$,N)});return}if(se.contains("rtile__dismiss")){Ke("worker-attempt-dismiss",{attempt_id:H},$,N);return}if(se.contains("rtile__discard")){if(!m(Fs(g,"unmerged")))return;T({bead_id:g,...H?{attempt_id:H}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(se.contains("worker-mini__merge")){let Se=yt($,g);Se?.mismatch&&Se.continuation===null?ct($,g,N,Se.mismatch):Ke("worker-merge-queue-add",{bead_id:g},$,N);return}if(se.contains("worker-mini__merge-cancel")){Ke("worker-merge-queue-remove",{bead_id:g},$,N);return}if(se.contains("worker-mini__discard")){let Se=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Fs(g,Se)))return;T({bead_id:g,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(se.contains("worker-mini__revise-fix")){St("worker-revise-fix",{bead_id:g},$,N);return}se.contains("worker-mini__revise-approve")&&Ke("worker-revise-approve",{bead_id:g},$,N)}function bn(f){let g=cn;cn=!1;let w=f.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){f.preventDefault();let B=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";B&&ke(B);return}let N=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(N){f.preventDefault();let L=N.getAttribute("data-root-dir")||oe.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||N.getAttribute("title")||"";Xe(L);return}let H=w.closest(".mon2-sec__toggle");if(H){f.preventDefault(),Me(H.getAttribute("data-root-dir")||"");return}let se=w.closest(".worker-pane__toggle[data-lane]");if(se){f.preventDefault();let L=se.getAttribute("data-lane")||"";(L==="candidate"||L==="queue"||L==="running"||L==="pr_wait"||L==="done")&&et(L);return}let Se=w.closest(".worker-wait__area-toggle[data-area]");if(Se){f.preventDefault(),bt(Se.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){f.preventDefault(),vt("create","");return}let Ye=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ye){f.preventDefault();let L=Ye.getAttribute("data-lane-id")||"",B=Ye.classList;vt(B.contains("mon2-clane__confirm")?"confirm":B.contains("mon2-clane__reapply")?"reapply":B.contains("mon2-clane__run")?"run":B.contains("mon2-clane__stop")?"stop":"remove",L);return}if(w.closest(".mon-merge-all")){f.preventDefault(),Le();return}let nt=w.closest(".mon-filter__spec");if(nt){f.preventDefault(),k={...k,spec:nt.getAttribute("data-spec")||"all"},cf(k),he();return}let Fe=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Fe)return;let v=Fe.getAttribute("data-bead-id")||"",K=w.closest("button");if(K){f.preventDefault(),Cn(K,v);return}v&&!g&&(f.preventDefault(),we(v,Fe.getAttribute("data-root-dir")||Ze(v).root_dir))}function Yt(f){let g=f.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){k={...k,show_blocked:w.checked},cf(k),he();return}let $=g.closest(".mon-candidate-sort");if($){D=zs.some(se=>se.value===$.value)?$.value:"repo_spec",Vy(D),he();return}let N=g.closest(".mon-running-sort");if(N){b=N.value==="repo"?"repo":"started",ev(b),he();return}let H=g.closest(".mon-done-range");H&&(y=Gn(H.value),Qy(y),he())}function An(f){let g=f.target,w=g&&typeof g.closest=="function"?N=>g.closest(N):()=>null,$=!1;U&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(U=null,$=!0),$&&he()}function hn(f){f.key!=="Escape"||!U||(U=null,he())}e.addEventListener("click",bn),e.addEventListener("change",Yt),e.addEventListener("pointerdown",re),document.addEventListener("click",An),document.addEventListener("keydown",hn),e.addEventListener("dragstart",ge),e.addEventListener("dragover",pt),e.addEventListener("dragleave",ut),e.addEventListener("drop",Ut),e.addEventListener("dragend",Vt);{let f=!0;ee=ji(g=>{if(ae=g,f){f=!1;return}he()})}s&&typeof s.subscribe=="function"&&(ve=s.subscribe(()=>{try{ye.clear(),he()}catch{}}));function ar(){$e!==null&&(clearInterval($e),$e=null)}function Xn(){dn!==null&&(clearTimeout(dn),dn=null)}return{recorrectSharedLane:mt,load(){n("load"),he(),$e===null&&($e=setInterval(()=>{try{he()}catch{}},tv))},pause(){ar()},clear(){ar(),Xn(),ve&&(ve(),ve=null),ee&&(ee(),ee=null),Oe.destroy(),Q.hidden=!0,be?.destroy(),be=null,e.removeEventListener("click",bn),e.removeEventListener("change",Yt),e.removeEventListener("pointerdown",re),document.removeEventListener("click",An),document.removeEventListener("keydown",hn),e.removeEventListener("dragstart",ge),e.removeEventListener("dragover",pt),e.removeEventListener("dragleave",ut),e.removeEventListener("drop",Ut),e.removeEventListener("dragend",Vt),e.replaceChildren()}}}function yf(e,t,n){let r=qt("views:nav"),{global_element:s,repo_element:o}=e,i=null;function l(y){return b=>{b.preventDefault();let k=y==="monitor"&&a()==="monitor"?"worker":y;r("click tab %s",k),n.gotoView(k)}}function a(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function c(){let y=a();return d`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function u(){let y=a();return d`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function m(){s&&rt(c(),s),o&&rt(u(),o)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),s&&rt(d``,s),o&&rt(d``,o)}}}var vf=["bug","feature","task","epic","chore"];function wf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var kf=["Critical","High","Medium","Low","Backlog"];function $f(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),c=n.querySelector("#new-issue-error"),u=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",o.appendChild(P);for(let U of vf){let X=document.createElement("option");X.value=U,X.textContent=wf(U),o.appendChild(X)}i.replaceChildren();for(let U=0;U<=4;U+=1){let X=document.createElement("option");X.value=String(U);let V=kf[U]||"Medium";X.textContent=`${U} \u2013 ${V}`,i.appendChild(X)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(P){s.disabled=P,o.disabled=P,i.disabled=P,l.disabled=P,a.disabled=P,u.disabled=P,m.disabled=P,m.textContent=P?"Creating\u2026":"Create"}function q(){c.textContent=""}function Y(P){c.textContent=P}function ae(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?o.value=P:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?i.value=U:i.value="2"}catch{o.value="",i.value="2"}}function ee(){let P=o.value||"",U=i.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function j(){q();let P=String(s.value||"").trim();if(P.length===0){Y("Title is required"),s.focus();return}let U=Number(i.value||"2");if(!(U>=0&&U<=4)){Y("Priority must be 0..4"),i.focus();return}let X=String(o.value||""),V=String(a.value||""),_e={title:P};X.length>0&&(_e.type=X),String(U).length>0&&(_e.priority=U),V.length>0&&(_e.description=V),D(!0);try{await t("create-issue",_e)}catch{D(!1),Y("Failed to create issue");return}ee(),D(!1),k()}return n.addEventListener("cancel",P=>{P.preventDefault(),k()}),y.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),j())}),r.addEventListener("submit",P=>{P.preventDefault(),j()}),{open(){r.reset(),q(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var sv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ov(e,t){return ha(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function xf(e,t,n){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?d`<div class="settings-dialog__empty">라벨 없음</div>`:d`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=ov(r,e);return d`<button
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
  `}function Af(e,t,n){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>d`<span class="settings-dialog__prefix">
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
  `}function Sf(e,t){return d`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${sv.map(([n,r])=>d`<label class="settings-dialog__toggle">
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
  `}var iv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Ef(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(te=>de(te,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,c="",u=null;function m(){if(u)return u;let te=i.querySelector('[data-pane="execution"]');return te?(u=Wi(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),u):null}function y(){return d`
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
    `}function b(){let te=r.get();return d`
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
        ${te?d`
              ${xf(te,s(),Y)}
              ${Af(te,c,{onDraft:Ee=>{c=Ee},onAdd:ae,onRemove:ee})}
              ${Sf(te,j)}
            `:d`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(te){let Ee=r.get();if(Ee)try{let He=await n("display-policy-set",{expected_revision:Ee.revision,policy:te(Ee)});D(He),He&&He.conflict&&He.policy&&(He=await n("display-policy-set",{expected_revision:He.policy.revision,policy:te(He.policy)}),D(He)),He&&He.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function q(te){k(te)}function Y(te){let Ee=r.get();if(!Ee)return;let He=!av(te,Ee);q(pe=>lv(te,pe,He))}function ae(){let te=c.trim();te.length!==0&&(c="",q(Ee=>Ee.hidden_prefixes.includes(te)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,te]}),P())}function ee(te){q(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(He=>He!==te)}))}function j(te){let Ee=r.get();if(!Ee)return;let He=Ee.chips[te]===!1;q(()=>({chips:{[te]:He}}))}function P(){rt(d`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${iv.map(te=>d`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(l===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>U(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ie}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${y()} ${b()}
          </div>
        </div>
      `,i),m()}function U(te){l=te,P()}let X=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",X),i.addEventListener("cancel",X);let V=te=>{te.target===i&&ie()};i.addEventListener("click",V);let _e=null;r.subscribe&&(_e=r.subscribe(()=>{a&&P()}));let W=null;t.implPresetStore?.subscribe&&(W=t.implPresetStore.subscribe(()=>{a&&u?.render()}));function Z(te="execution"){a||(a=!0,t.onOpenChange?.(!0),l=te,c="",P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function ie(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Z,close:ie,sessionDraft:()=>u?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",X),i.removeEventListener("cancel",X),i.removeEventListener("click",V),_e&&(_e(),_e=null),W&&(W(),W=null),u?.destroy(),u=null,i.remove()}}}function av(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function lv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var cv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Tf="usage-meter-card",dv="usage-meter-layer",Ll=600,uv=["token_expired","relogin_required"];function Cf(e){return String(e).padStart(2,"0")}function pv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Rf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Cf(r.getHours())}:${Cf(r.getMinutes())}`,l=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${cv[r.getMonth()]} ${r.getDate()} ${o}`;return`${pv(n,t)} \xB7 ${l}`}function fv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Of(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Lf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var If=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Pf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function _v(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Pf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function mv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=_v(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Pf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function gv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=mv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Mf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function bv(e,t){return!e.held||Mf(e,t)<=Ll?e:{...e,available:!1,windows:[],accounts:[]}}function Df(e,t){return`${e}:${t}`}function Nf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,l=0,a=null;function c(){rt(d``,e),e.hidden=!0,m()}function u(){if(a===null){let pe=e.ownerDocument;a=pe.createElement("div"),a.id=dv,a.className="usage-meter__layer",pe.body.appendChild(a)}return a}function m(){a!==null&&(rt(d``,a),a.remove(),a=null)}function y(pe){n!==pe&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",q),window.addEventListener("resize",D)),n=pe)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",q),window.removeEventListener("resize",D))}function k(pe){let Q=pe.target;Q&&(e.contains(Q)||a!==null&&a.contains(Q))||(b(),ie())}function D(){ie()}function q(pe){pe.key==="Escape"&&(b(),ie())}function Y(pe){n===pe?b():y(pe),ie()}function ae(){b(),ie()}async function ee(pe,Q){if(r.has(pe.key))return;let Te=Df(pe.key,Q);r.set(pe.key,Q),i.delete(Te),ie();let Ie=null;try{Ie=await(await fetch(pe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Q})})).json()}catch{Ie=null}if(t)return;if(r.delete(pe.key),!Ie||Ie.ok!==!0){let oe=Ie&&typeof Ie.error=="string"&&Ie.error.length>0?Ie.error:"network_error";i.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),ie();return}let S=Array.isArray(Ie.warnings)?Ie.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];S.length>0&&i.set(Te,{kind:"warn",text:S.join(" \xB7 ")}),ie(),await He()}function j(pe,Q,Te,Ie){let S=Lf(pe.pct),ye=`resets ${Rf(pe.resetsAt,Ie)}${Q?` \xB7 ${Te}`:""}`;return d`<span
      class="usage-meter__window ${Of(S)}"
      style=${`--progress: ${S}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${pe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function P(pe,Q,Te){let Ie=Mf(Q,Te),S=Q.available&&(Q.held||Ie>Ll),oe=S?`${Math.floor(Ie/60)}\uBD84 \uC804 \uCE21\uC815`:"",ye=Q.accounts.filter(Oe=>!Oe.active).length,ve=`usage-meter__group${S?" usage-meter__group--stale":""}`,$e=d`<span class="usage-meter__provider"
        >${pe.label}</span
      >
      ${Q.available?Q.windows.map(Oe=>j(Oe,S,oe,Te)):d`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ye>0?d`<span class="usage-meter__badge">+${ye}</span>`:""}`;if(Q.accounts.length===0)return d`<span
        class=${ve}
        aria-label=${`${pe.label} usage`}
        >${$e}</span
      >`;let be=n===pe.key;return d`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${pe.label} usage`}
      aria-expanded=${be?"true":"false"}
      aria-controls=${Tf}
      @click=${()=>Y(pe.key)}
    >
      ${$e}
    </button>`}function U(pe,Q){return d`<span class="usage-meter" aria-label="Usage">
      ${pe.map(Te=>P(Te.provider,Te.snapshot,Q))}
    </span>`}function X(pe,Q){let Te=Lf(pe.pct),Ie=Rf(pe.resetsAt,Q);return d`<span
      class="usage-meter__account-window ${Of(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${pe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${Ie.length>0?`\u21BB ${Ie}`:""}</span
      >
    </span>`}function V(pe,Q){return uv.includes(Q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${pe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function _e(pe,Q,Te){let Ie=Q.status==="ok",S=typeof Q.ageSeconds=="number"&&Q.ageSeconds>Ll,oe=i.get(Df(pe.key,Q.number)),ye=r.get(pe.key),ve=ye!==void 0,$e=ye===Q.number,be=["usage-meter__account"];return Q.active&&be.push("usage-meter__account--active"),Ie||be.push("usage-meter__account--unavailable"),S&&be.push("usage-meter__account--stale"),d`<div class=${be.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${Q.email}
          >${Q.alias===null?Q.email:Q.alias}</span
        >
        ${Q.plan===null?"":d`<span class="usage-meter__account-tag">${Q.plan}</span>`}
        ${Q.active?d`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${Q.ageSeconds===null?"":d`<span class="usage-meter__account-age"
              >${fv(Q.ageSeconds)}</span
            >`}
        ${Q.active?"":d`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{ee(pe,Q.number)}}
            >
              ${$e?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ie?d`<div class="usage-meter__account-windows">
            ${Q.windows.map(Oe=>X(Oe,Te))}
          </div>`:d`<div class="usage-meter__account-status">
            ${V(pe,Q.status)}
          </div>`}
      ${oe===void 0?"":d`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function W(pe,Q,Te){let Ie=Q.accounts.filter(S=>S.active).length;return d`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${pe.label} · 활성 ${Ie} / 전체
        ${Q.accounts.length}
      </h2>
      ${Q.accounts.map(S=>_e(pe,S,Te))}
    </section>`}function Z(pe,Q){return d`<div
      class="usage-meter__card"
      id=${Tf}
      role="dialog"
      aria-label=${`${pe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${W(pe.provider,pe.snapshot,Q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ie(){let pe=Date.now(),Q=[];for(let Ie of If){let S=o.get(Ie.key);S&&Q.push({provider:Ie,snapshot:bv(S,pe)})}if(Q.length===0){b(),c();return}let Te=Q.find(Ie=>Ie.provider.key===n&&Ie.snapshot.accounts.length>0);Te||b(),rt(U(Q,pe),e),e.hidden=!1,Te?te(Te,pe):m()}function te(pe,Q){let Te=u(),Ie=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${Ie.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Ie.right)}px`),rt(d`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${Z(pe,Q)}`,Te)}async function Ee(pe){try{let Q=await fetch(pe.endpoint);return Q.ok?gv(await Q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function He(){l+=1;let pe=l,Q=await Promise.all(If.map(async Te=>({provider:Te,read:await Ee(Te)})));if(!(t||pe!==l)){for(let Te of Q){let Ie=Te.provider.key;if(Te.read.kind==="ok"){o.set(Ie,Te.read.snapshot);continue}if(Te.read.kind==="empty"){o.delete(Ie);continue}let S=o.get(Ie);S!==void 0&&!S.held&&o.set(Ie,{...S,held:!0})}ie()}}return c(),He(),s=setInterval(()=>{He()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),c()}}}function qf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),l=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var hv="worker-ineligible";function ao(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ff(e){return ao(e).includes(hv)}var yv="session-preferred",vv=["exclusive_machine","iterative_user_judgment","visual_verification"];function jf(e,t){if(!ao(e).includes(yv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&vv.includes(n)?n:""}var wv="worker-serial";function Il(e){return ao(e).includes(wv)}var Wf="bdui.worker.candidate_sort",lo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Hi=Object.freeze({preset:"spec"}),zf=3,Hf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Bf(e){return lo.some(t=>t.id===e)}function Uf(e){let t=lo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function kv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function co(e){return e&&"preset"in e?Uf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Uf("spec")}function Dl(e){return e&&"preset"in e?e.preset:null}function uo(e){if(typeof e=="string"){let o;try{o=JSON.parse(e)}catch{return Bf(e)?{preset:e}:Hi}return uo(o)}if(!e||typeof e!="object")return Hi;let t=e;if(Bf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>zf||!n.every(_a))return Hi;let r=[];for(let o of n)r.some(i=>i.key===o.key)||r.push({key:o.key,dir:o.dir});let s=lo.find(o=>kv(o.chain,r));return s?{preset:s.id}:{chain:r}}function Gf(){try{return uo(window.localStorage.getItem(Wf))}catch{return Hi}}function Pl(e){try{window.localStorage.setItem(Wf,JSON.stringify(e))}catch{}}function Kf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Lo,n))return r;let s=n;if(r.slice(0,t).some(a=>a.key===s))return r.slice(0,t);let o={key:s,dir:r[t]&&r[t].key===s?r[t].dir:Lo[s]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==s);return[...i,o,...l].slice(0,zf)}function Vf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Yf(e,t,n){let r=Array.isArray(e)?e.slice():[];return r.sort(Zc(co(t))),!n||n.size===0?r:[...r.filter(s=>!n.has(s.id)),...r.filter(s=>n.has(s.id))]}var Xf=new Set(["sh","bash","zsh","dash","ksh"]),Zf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Qf(e){let t=e.split("/");return t[t.length-1]||""}function $v(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Qf(n[0]);if(r!=="env")return Xf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Xf.has(Qf(s))}function xv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Av(e){let t=[],n=0;Zf.lastIndex=0;for(let r of e.matchAll(Zf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:xv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Jf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",l="",a=0,c=null,u=!1;function m(P,U){return U?Av(P).map(X=>X.kind==="plain"?X.text:d`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${X.kind}"
            >${X.text}</span
          >`):P}function y(){if(!s)return d``;let P=o==="ready"&&$v(i),U=o==="ready"?i.split(`
`):[];return d`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>ee()}
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
              @click=${()=>ee()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?d`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?d`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:d`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${U.map((X,V)=>d`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(X,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){rt(y(),r)}async function k(){if(o!=="ready")return;let P=await Mn(i);de(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function D(P){P.key==="Escape"&&s&&(P.preventDefault(),ee())}function q(){u||(document.addEventListener("keydown",D),u=!0)}function Y(){u&&(document.removeEventListener("keydown",D),u=!1)}async function ae(P,U=null){let X=++a;q(),s={...P},c=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",l="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let _e=t?t():"";if(!_e){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let W="/api/repo-ops-script?workspace="+encodeURIComponent(_e)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let Z=await n(W),ie=await Z.json().catch(()=>({}));if(X!==a)return;if((t?t():"")!==_e){ee();return}if(!Z.ok||!ie||ie.ok!==!0){o="error",l=Sv(ie&&typeof ie.error=="string"?ie.error:""),b();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},i=String(ie.content),o="ready",b()}catch{if(X!==a)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function ee(){a+=1,Y(),s=null,i="",b();let P=c;c=null,P?.isConnected&&P.focus()}function j(){ee(),r.remove()}return{open:ae,close:ee,destroy:j}}var e_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Ev=new Set(["queued","running","retry_pending"]);function t_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let W=o();return typeof W.revision=="number"?W.revision:0}function l(W){t&&W&&W.queue&&typeof W.queue=="object"&&t.set(W.queue)}function a(){let W=o().workspace_info;return W&&typeof W=="object"?W:{}}function c(W,Z){return d`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${W}"
      >${Z}</span
    >`}function u(W){if(typeof W!="number"||!Number.isFinite(W))return"";let Z=W/6e4;return Number.isInteger(Z)?`timeout ${Z}\uBD84`:`timeout ${Math.round(W/1e3)}\uCD08`}function m(W){let Z=u(W);return Z?c("config",Z):""}function y(W,Z,ie){return d`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ie.script}
      @click=${te=>{s&&s({lane:W,base_sha:Z.base_sha,path:ie.script,base_ref:Z.base_ref},te.currentTarget)}}
    ></button>`}function b(){let W=o().repo_operations;return Array.isArray(W)?W:[]}function k(){let W=a().repo_ops,Z=W&&typeof W=="object"?W.repo_id:null;return typeof Z=="string"&&Z?Z:null}function D(){return b().some(W=>W&&W.kind==="deploy"&&Ev.has(W.state))}function q(){let W=D(),Z=k()===null;return d`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${W||Z}
      title=${W?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Z?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{U()}}
    >
      배포 실행
    </button>`}function Y(){let W=o().repo_ops_opt_out;return{verify:W?.verify===!0,deploy:W?.deploy===!0}}function ae(W,Z){return d`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Z}
        @change=${ie=>{P(W,!ie.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function ee(W){let Z=typeof W.base_sha=="string"?W.base_sha:"",ie=`${W.source_path||"repo-ops/config.toml"} @ ${W.base_ref||"?"}${Z?`@${Z.slice(0,7)}`:""}`,te=Y(),Ee=!!W.verify&&te.verify,He=!!W.deploy&&te.deploy;return d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ie}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${W.verify?d`${y("verify",W,W.verify)}
              ${m(W.verify.timeout_ms)}
              ${Ee?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:d`선언 없음${c("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":W.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${W.verify?ae("verify",te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${He?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${W.deploy?d`${y("deploy",W,W.deploy)}
              ${m(W.deploy.timeout_ms)}
              ${He?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):q()}`:d`선언 없음${c("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${He?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":W.deploy?d`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${W.deploy?ae("deploy",te.deploy):""}
      </div>
    </section>`}function j(W){let Z=W.repo_ops&&typeof W.repo_ops=="object"?W.repo_ops:null;return Z&&(Z.status==="resolved"||Z.status==="absent")?ee(Z):Z&&(Z.status==="pending"||Z.status==="error")?d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Z.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":d`선언 읽기
              실패${Z.error_code?d` — <code>${Z.error_code}</code>`:""}`}
        </div>
      </section>`:d`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function P(W,Z){if(!n)return;let ie=await n("worker-repo-ops-opt-out-toggle",{kind:W,opted_out:Z,expected_revision:i()});if(l(ie),ie&&ie.conflict){let te=await n("worker-repo-ops-opt-out-toggle",{kind:W,opted_out:Z,expected_revision:i()});l(te)}r()}async function U(){let W=k();if(!n||W===null)return;let Z=await n("worker-repo-operation-deploy-run",{repo_id:W});if(l(Z),!Z||Z.ok!==!0){let ie=Z&&typeof Z.reason=="string"?Z.reason:"",te=Object.hasOwn(e_,ie)?e_[ie]:ie||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";de(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${te}`,"error")}else de("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let X={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(W,Z,ie){return d`<div class="worker-repo-ops__policy-group" data-policy=${ie}>
      <div class="worker-repo-ops__policy-label">${W}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Z.map(te=>d`<li data-token=${te}>
              ${X[te]||te}
            </li>`)}
      </ul>
    </div>`}function _e(){let W=o(),Z=W.repo_operation_policy&&typeof W.repo_operation_policy=="object"?W.repo_operation_policy:null;return Z?d`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Z.worker_automatic||[]).length} · 금지
            ${(Z.never_automatic||[]).length}</span
          >
        </summary>
        ${Z.supported===!1?d`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Z.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Z.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Z.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return d`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${j(a())} ${_e()}
      </details>`}}}var s_=20,Tv=5,Cv=new Set(["failed","running","queued","retry_pending"]),n_={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Rv(e,t,n=s_){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Ov(e){if(e.type==="cleanup")return!0;let t=e.operation;return Cv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Lv(e,t,n={}){let r=Rv(e,t,1/0),s=n.expanded===!0?s_:Tv,o=new Set(r.slice(0,s)),i=r.filter(l=>o.has(l)||Ov(l));return{visible:i,hidden:r.length-i.length}}function r_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Iv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function o_(e){let t=e.filter(n=>n.value);return t.length===0?"":d`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>d`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function i_(e,t="",n=!1){return!e&&!t?"":d`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?d`<br />${t}`:""}
  </p>`}function Dv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function Pv(e,t){let n=Kp(e,t),r=Vp(e);return!n&&!r?"":d`<p class="worker-ev__why">
    ${n?d`<span class="worker-ev__why-line">${n}</span>`:""}${r?d`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Mv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":d`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Nv(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return d`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?sn(e.at):""}
      >${ci(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${r_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(n_,n.kind)?n_[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${ii(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Tr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${r_(e)}"
          >${Iv(e)}</span
        >
        ${n.dismissed?d`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?d`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?d`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?i_(Gp(n.failure_kind,s)):""}
      ${Pv(n,Dv(t,n))}
      ${Mv(n)}
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ii(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||""},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function qv(e){let t=e.cleanup,n=Cr(t.step);return d`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?sn(e.at):""}
      >${ci(e.at)||"\u2014"}</span
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
        ${vu(t.step).map(r=>d`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${i_(ls(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return d`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?d`<div class="worker-repo-drawer__empty">기록 없음</div>`:d`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?qv(r):Nv(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?d`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function a_(e,t={}){let n=null;function r(){if(n===null){rt(d``,e);return}let i=Lv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(Fv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){o();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var jv=qt("views:worker"),Bv="tab:worker:ready",Uv="tab:worker:blocked",Wv="tab:worker:in-progress",zv="tab:worker:resolved",Hv="tab:worker:closed",Gi=1,l_=5,Gv=new Set(["quick_fix","spec_backed","full_plan"]);function c_(e){return typeof e=="string"&&Gv.has(e)}var p_="beads-ui.worker.candidate-filter",Ml={show_blocked:!1,spec:"all"};function Kv(){try{let e=window.localStorage.getItem(p_);if(!e)return{...Ml};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ml};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Ml}}}function Vv(e){try{window.localStorage.setItem(p_,JSON.stringify(e))}catch{}}function Yv(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=n(l),c=r(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Xv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],f_="bdui.worker.done-range";function Zv(){try{let e=window.localStorage.getItem(f_);return e===null?"today":Gn(e)}catch{return"today"}}function Qv(e){try{window.localStorage.setItem(f_,e)}catch{}}function d_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Jv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ew(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var tw=2;function nw(e,t){let n=e?.release_info,s=(n&&typeof n=="object"&&Array.isArray(n.released_by)?n.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,c)=>(typeof c.closed_at=="number"?c.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),o=[];for(let a of s){let c=ku(e.id,a,t);c&&o.push(c)}if(o.length===0)return null;let i=o.slice(0,tw),l=o.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}var rw="\u{1F512} blocked";function u_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function sw(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function ow(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function iw(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function aw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function lw(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Nl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var cw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),dw=new Set(["waiting_metadata","reviewing","retrying"]);function uw(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",l=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",l?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${l}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,l=typeof r.next_at=="number"?sn(r.next_at):"",a=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,l?`\uB2E4\uC74C \uC2DC\uAC01 ${l}`:"",a?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${a}`:""].filter(Boolean),live:!0}}default:return null}}function pw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function fw(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let l=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&l.push(`head ${e.head_sha}`),e.base_sha&&l.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&l.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let a=pw(e.terminal_reason);a&&l.push(`\uC6D0 \uC0AC\uC720: ${a}`);for(let c of t?t.details:[])l.push(c);return e.active_attempt_id&&l.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&l.push(`repair ${s.bead_id}`),e.evidence&&l.push(e.evidence),e.log_path&&l.push(e.log_path),{badge:i,title:l.join(`
`),alert:e.phase==="needs_human",lock_actions:!cw.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function _w(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function mw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,o={})=>{let i=[o.title||"",t].filter(Boolean);return{label:s,title:i.join(`
`),live:o.live===!0,alert:o.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});let r=_w(e.receipt_check);if(r.length>0)return n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let s=sw(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${s.label}`,{title:e.head_review.failure_reason?`${s.action} (${e.head_review.failure_reason})`:s.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${u_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${u_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function gw(e,t,n,r,s=null,o=null,i=null,l=!1,a=null,c=!0,u=null,m=null,y=null,b={},k=!1,D=!1,q={},Y=null){let ae=!!a&&a.position>0,ee=!!a?.continuation_action&&a.continuation_action.continuation===null,j=!!a&&a.active===!0,P=a&&a.failure||null,U=iw(a?a.waiting:null,y),X=n[e]||null,V=X&&X.gate?X.gate:null,_e=X&&X.pr?X.pr:null,W=aw(a?a.resolution:null),Z=lw(a?a.head_review:null),ie=a&&a.head_review||null,te=uw(y,ie),Ee=fw(y,te),He=a&&a.authority||null,pe=!!ie&&["pending","reviewing","revising"].includes(ie.state),Q=!!y&&typeof y=="object"&&dw.has(y.phase),Te=ae&&!j&&(ie?.state==="failed"||!He||Q||He.source==="automatic"&&!D),Ie=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":W?W.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,S=!!V&&V.base_badge==="\uCDA9\uB3CC",oe=!!V&&V.enabled===!0,ye=Us({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:q.repo_operations}),ve=vi(ye),$e=o&&!ye&&(o.queueing??null)?o.queueing:null,be=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!V&&V.tier==="merged",Oe=r&&r.step==="repo_operations"&&ye?.failed===!0&&(ye.step==="deploy"||ye.step==="verify")?ye.step:null,Ke=l&&!!r&&!!V&&V.tier==="merged",yt=Te&&(oe||S||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||be||Ke),St=l&&S&&c===!1,ct=qn(b,e,{external:l,merge_active:j||ye?.step==="merge",merge_queued:ae,conflict_active:!!i,cleanup_active:ve,merged:!!r||V?.tier==="merged"}),T=!!ct.operation,ce=mw({continuation_required:ee,queueing:$e,merge_step:ye,conflict_badge:Ie,conflict_live:W?.live===!0||i==="running",head_review:ie&&Z?{...Z,state:ie.state,failure_reason:ie.failure_reason}:null,auto_resolution:te,recovery:Ee,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:m,conflicting:S,gate:V,receipt_check:X&&X.receipt_check?X.receipt_check:null,queue_failure:P,auto_skip:u,queued:ae,queue_active:j,queue_position:a?a.position:0,activity:Ie?null:o&&o.activity||null}),Le=ce?.live===!0&&ce.title?d`<span title=${ce.title}>${ce.label}</span>`:ce?.label||null;return{id:e,title:l?d`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ye?.active!==!0?yi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Y?{dependency_chips:Y}:{},external:l,pr_number:_e&&typeof _e.number=="number"?_e.number:null,pr_url:_e&&typeof _e.url=="string"?_e.url:"",completion_badge:ce?.live!==!0&&ce?.title?ce.label:null,completion_title:ce?.title||"",completion_repair_pr_url:Ee?Ee.repair_pr_url:"",completion_repair_pr_number:Ee?Ee.repair_pr_number:null,badges:Le?[Le]:[],live_badge:ce?.live===!0?Le:null,usage:s,alert:ce?.alert===!0,merge_action:V?.tier==="merged"&&!be&&!Ke?!1:!ae||ee||Te,cancel_action:ae&&!ee,cancel_enabled:(!j||pe)&&!(Ee&&Ee.lock_actions),cancel_title:Ee&&Ee.lock_actions?`${Ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:j&&!pe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":pe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ct,discard_action:ct.action,merge_step:ye,discard_enabled:ct.enabled,discard_title:ct.title,merge_enabled:!ye&&!$e&&!i&&!T&&!m&&!(Ee&&Ee.lock_actions)&&!St&&(oe||S||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||be||Ke||yt||Q&&!j),merge_label:ee?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||Ke?Oe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Oe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":S&&!ye&&!be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":V?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:T?ct.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ct.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ct.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ee?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$e?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ye?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ye.label}`:Oe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Oe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":St?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":S?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":V?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":oe?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:V&&V.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${V&&V.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ql(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:c,doneRange:u,onDoneRangeChange:m}=t,y=r?Do(r):null,b=null,k=Kv(),D=null,q=null,Y={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ae=Gf(),ee=Dl(ae)===null,j=u?Gn(u):Zv(),P=new Map;function U(){let p=Fr.find(h=>h.value===j);return p?p.label:"\uC624\uB298"}let X=Bi("beads-ui.worker.lane-collapsed"),V=!1,_e=new Set,W=new Set,Z=new Set,ie=new Set,te=new Set,Ee={},He=null,pe=0,Q=null,Te=[];function Ie(p){return He===p?Ee:{}}async function S(){if(!n)return;let p=l?.()||"";if(He===p||Q&&Q.key===p&&Q.generation===pe)return;let h=++pe;Q={key:p,generation:h};let R=null;try{R=await Promise.resolve(n("get-session-defaults",{}))}catch(re){if(h!==pe)return;Q=null,jv("get-session-defaults failed: %o",re),Ne();return}h===pe&&(Ee=R&&typeof R.values=="object"&&R.values!==null?{...R.values}:{},He=p,Q=null,Ne())}function oe(){He=null,pe+=1,S()}let ye=document.createElement("div");ye.className="worker-console";let ve=document.createElement("div");ve.className="worker-top";let $e=document.createElement("div");$e.className="worker-drawer-overlay",$e.hidden=!0;let be=document.createElement("div");be.className="worker-drawer-overlay__backdrop";let Oe=document.createElement("div");Oe.className="worker-drawer-host";let Ke=document.createElement("div");Ke.className="worker-drawer-host",Ke.hidden=!0,$e.append(be,Oe,Ke);let yt=document.createElement("div");yt.className="worker-lanes-host",ye.append(ve,$e,yt),e.appendChild(ye);let St=null,ct=is(Oe,{transport:n,sessionLogStore:o,onClose:()=>{St=null,$e.hidden=!0,Ne()}}),T=a_(Ke,{onClose:()=>{Ke.hidden=!0,$e.hidden=!0,Ne()}}),ce=Jf({getWorkspacePath:l||(()=>"")}),Le=l&&l()||"",je=t_({queueStore:s,transport:n,onChanged:()=>Ne(),onOpenScript:(p,h)=>{ce.open(p,h)}});function Me(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Gi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(){let p=Me(),h=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,R=Array.isArray(p.serial_lanes)?p.serial_lanes:[],re=[];for(let pt of R){if(re.length>=h)break;!pt||typeof pt.id!="string"||!/^s[1-5]$/.test(pt.id)||!Array.isArray(pt.entries)||re.push({id:pt.id,label:`\uC9C1\uB82C ${pt.id.slice(1)}`,count:pt.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...re]}function bt(p){if(!D||!p.some(R=>R.id===D))return null;let h=et();return h?{bead_id:D,lanes:h}:null}function Ve(){let p=Me();return typeof p.revision=="number"?p.revision:0}function z(p){p&&p.queue&&s&&s.set(p.queue)}function ne(){let p=Me().queue;return Array.isArray(p)?p.length:0}async function De(p,h,R){if(!n)return;let re=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},...R===void 0?{}:{index:R},expected_revision:Ve()}),ge=await n("worker-queue-place",re());z(ge),ge&&ge.conflict&&await n("worker-queue-place",re()).then(z)}async function lt(p,h,R){if(!n)return;let re=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},to_index:R,expected_revision:Ve()}),ge=await n("worker-queue-reorder",re());z(ge),ge&&ge.conflict&&await n("worker-queue-reorder",re()).then(z)}async function it(p){if(!n)return;let h=await n("worker-queue-remove",{bead_id:p,expected_revision:Ve()});z(h),h&&h.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Ve()}).then(z)}async function Pe(p){if(!n||!p)return;let h=await n("worker-attempt-pause",{attempt_id:p});h&&h.paused===!1&&h.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Ue(p){if(!n||!p)return;let h=await Vr();if(h===null)return;let R=async(ge={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Ve(),...h!==""?{instructions:h}:{},...ge}),re=await R();z(re),re&&re.conflict&&(re=await R(),z(re)),re=await er(re,(ge,pt)=>R({continuation:ge,decision_token:pt}),{onResult:z,refresh:()=>R()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function dt(p){if(!n||!p)return;let h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ve()});z(h),h&&h.conflict&&(h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ve()}),z(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function tt(p,h,R=!0){if(!n)return null;let re=n,ge=await re(p,{...h,expected_revision:Ve()});return z(ge),ge&&ge.conflict&&R&&(ge=await re(p,{...h,expected_revision:Ve()}),z(ge)),ge}async function _t(p){if(!n||!p)return;let h=Me().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ft(p,h.mismatch);return}_e.add(p),Ne();let R;try{R=await tt("worker-merge-queue-add",{bead_id:p})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{_e.delete(p),Ne()}if(!(!R||R.applied)){if(R.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(ow(R.reason),"error",2400)}}async function Pt(p){if(!(!n||!p||W.has(p))){W.add(p),Ne();try{let h=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Ve()});z(h),h&&!h.retried&&!h.conflict&&h.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{W.delete(p),Ne()}}}async function Ft(p,h){let R=await er({continuation_mismatch:h},(ge,pt)=>tt("worker-merge-queue-add",{bead_id:p,continuation:ge,decision_token:pt},!1)),re=R?.queue?.merge_queue?.find(ge=>ge.bead_id===p)?.continuation_action;if(R?.applied!==!0&&re?.continuation===null&&re.mismatch){await Ft(p,re.mismatch);return}R&&R.applied===!1&&!R.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ht(p){if(!n)return;let h=await tt("worker-merge-auto-toggle",{on:p});!h||h.conflict||de(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Mt(p){if(!n||!p)return;let h=await tt("worker-merge-queue-remove",{bead_id:p});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Nt(){await tt("worker-merge-queue-remove",{all:!0})}async function wt(p,h=null,R="unmerged",re=null){if(!n||!p)return;let ge=Fs(p,R);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Ve()});if(z(ut),ut&&ut.conflict&&(ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Ve()}),z(ut)),ut&&ut.discarded===!0){de(di(ut),"success",5e3);return}if(ut&&ut.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${ut.reason}`,"error",2800);return}if(ut&&ut.accepted&&ut.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ut&&ut.accepted&&!ut.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${ut.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ut&&!ut.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(p,h,R){if(!(!n||!h||!R||ie.has(h))){ie.add(h),Ne();try{let re=await n(p,{bead_id:h,action_id:R,expected_revision:Ve()});z(re),re?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{ie.delete(h),Ne()}}}async function O(p,h){if(!n||!h||Z.has(h))return;Z.add(h),Ne();let R;try{let re=async(ge={})=>await n(p,{bead_id:h,expected_revision:Ve(),...ge});R=await re(),z(R),R&&R.conflict&&(R=await n(p,{bead_id:h,expected_revision:Ve()}),z(R)),p==="worker-revise-fix"&&(R=await er(R,(ge,pt)=>re({continuation:ge,decision_token:pt}),{onResult:z,refresh:()=>re()}))}finally{Z.delete(h),Ne()}if(!(!R||R.conflict)){if(R.ok){de(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function J(p){if(!n)return;let h=await n("worker-automation-toggle",{on:p,expected_revision:Ve()});z(h),h&&h.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Ve()}).then(z)}async function me(p){if(!n||!p)return;let h=await n("worker-repo-operation-dismiss",{operation_id:p});z(h),h&&h.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function E(p){if(!n||!Number.isFinite(p))return;let h=Math.max(Gi,Math.floor(p)),R=await n("worker-queue-set-slots",{slots:h,expected_revision:Ve()});z(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Ve()}).then(z)}async function G(p){if(!n||!Number.isInteger(p)||p<1||p>l_)return;let h=Me(),R=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(p).reduce((pt,ut)=>pt+(Array.isArray(ut?.entries)?ut.entries.length:0),0),re=()=>({count:p,expected_revision:Ve()}),ge=await n("worker-queue-set-serial-lane-count",re());z(ge),ge&&ge.conflict&&(ge=await n("worker-queue-set-serial-lane-count",re()),z(ge)),ge&&ge.applied&&R>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Re="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ze(p,h){let R=Sl(p,h.id,Y);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:R.kind==="note"?{kind:"note",text:R.text}:R.kind==="disabled"?{kind:"disabled",label:Re,title:R.title}:{kind:"place",label:Re,title:R.title}}}function xe(p,h){if(!q||q.bead_id!==p)return null;let R=q.counterpart_id,re=h.filter(ge=>ge.id===R);return re.length===0?null:{rows:re.map(ge=>ze(p,ge))}}async function at(p,h){let R=Sl(p,h,Y);if(q=null,R.kind!=="ops"){Ne();return}let re=Ve();for(let ge of R.ops){let pt=await st(ge,re);if(pt===null)break;re=pt}Ne()}async function st(p,h){if(!n)return null;try{let R=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:h});if(z(R),R&&R.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!R||R.applied!==!0)return de(R&&typeof R.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${R.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let re=R.queue?R.queue.revision:void 0;return typeof re!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):re}catch(R){return de(R instanceof Error&&R.message?R.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function he(){let p=Me(),h=y?y.selectBoardColumn(Bv,"ready"):[],R=y?y.selectBoardColumn(Uv,"blocked"):[],re=y?y.selectBoardColumn(Hv,"closed"):[],ge=y?y.selectBoardColumn(Wv,"in_progress"):[],pt=y?y.selectBoardColumn(zv,"resolved"):[],ut=Mo([...h,...R,...ge,...pt,...re]),Vt=new Map;for(let _ of[...h,...R,...ge])_&&_.id&&!Vt.has(_.id)&&Vt.set(_.id,_);let Ut={...Ie(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let I=p[_];typeof I=="string"&&(Ut[_]=I)}function Gt(_,I){let le=Vt.get(_);if(!le)return null;let Be=le.metadata&&typeof le.metadata=="object"?le.metadata:{},Qe=le.workflow?.route,Xt=Be.route,Lt=c_(Qe)?Qe:c_(Xt)?Xt:null;return $n({pin:Be,global:Ut,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Lt,controller_runtime:I})}function Cn(_){let I=_.runner||null,le=Gt(_.bead_id,I),Be=Ns(_),Qe=le?_r(le,I):null;return Be||Qe?{orchestration:Be,worker:Qe}:null}let bn=new Map;function Yt(_){if(bn.has(_))return bn.get(_)??null;let I=Gt(_,null),le=null;if(I){let Be=Nn(p.runner_catalog??null,I.orchestration_model.value??""),Qe=Be===null?I:Gt(_,Be),Xt=Er(Qe,p.runner_catalog??null),Lt=_r(Qe,Be);le=Xt||Lt?{orchestration:Xt,worker:Lt}:null}return bn.set(_,le),le}let An=new Map;function hn(_){if(An.has(_))return An.get(_)??null;let I=Vt.get(_),le=I&&I.metadata&&typeof I.metadata=="object"?I.metadata:null,Be=le?ts(le):null;return An.set(_,Be),Be}function ar(_){let I=No(ut,_);return I.total===0?null:I}let Xn=p.bead_titles||{},f=new Map;for(let[_,I]of Object.entries(Xn))typeof I=="string"&&I.length>0&&f.set(_,I);for(let _ of[...h,...R])f.set(_.id,_.title||_.id);let g=new Map;for(let _ of[...h,...R,...ge,...pt,...re])_&&_.id&&typeof _.from_id=="string"&&g.set(_.id,_.from_id);let w=new Map;for(let _ of[...h,...R,...ge,...pt,...re])_&&_.id&&typeof _.priority=="number"&&w.set(_.id,_.priority);let $=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},N=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},H=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},se=new Map;for(let[_,I]of Object.entries(N))Array.isArray(I)&&se.set(_,Il(I));for(let _ of[...h,...R]){let I=_.labels;Array.isArray(I)&&!se.has(_.id)&&se.set(_.id,Il(I))}let Se=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Ye=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},nt=new Map;for(let[_,I]of Object.entries($))I&&typeof I=="object"&&nt.set(_,I);for(let _ of[...h,...R])nt.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Fe=_=>nt.get(_)||{},v=p.pr_wait||[],K=p.pr_observations||{},L=p.pr_activity||{},B=p.cleanup_failed||{},Ae=Object.entries(B).map(([_,I])=>({bead_id:_,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})),qe=p.queue||[],ht=new Set([...qe.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(I=>I.bead_id)),...v.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),Ge=new Set(R.map(_=>_.id)),ft=new Set,yn=[];for(let _ of[...h,...R])ht.has(_.id)||ft.has(_.id)||Jv(_)||(ft.add(_.id),yn.push(_));let A_=Yf(yn,ae,Ge),S_=p.admission||{},Ul=_=>{let I=S_[_];if(!I)return"";if(I.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof I.reason=="string"?I.reason:"",Be=le.indexOf(":");return Be>0&&Be<le.length-1?`\u26D4 ${le.slice(0,Be)} (${le.slice(Be+1)})`:`\u26D4 ${le}`},Wl=new Map,E_=Date.now(),T_=A_.map(_=>{let I=Wr(_),le=I.evidence==="published",Be=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Qe=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Xt=Object.hasOwn(_,"labels")&&Ff(_.labels),Lt=Xt||!Object.hasOwn(_,"labels")?"":jf(_.labels,_.metadata),Mr=Lt.length>0,Ct=!Xt&&(Be?Qe:le&&!I.conflict),vo=Ge.has(_.id),Zn=[];if(vo){let wo=ew(_);wo.length>0?Wl.set(_.id,wo):Zn.push(rw)}Be&&!Qe?Zn.push("missing_description"):!Be&&I.conflict?Zn.push("spec_id_conflict"):!Be&&I.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Be&&I.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Nr=Ul(_.id);Nr&&Zn.push(Nr);let us=nw(_,E_),ps=_.dependents_info&&typeof _.dependents_info=="object"?$u(_.dependents_info):null;return{id:_.id,title:_.title||_.id,reason:Zn.join(" \xB7 "),draggable:!1,queue_placeable:Ct,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Be,status:_.status,worker_ineligible:Xt,session_preferred:Mr,session_preferred_reason:Lt,blocked:vo,has_spec:le,exec_chips:Yt(_.id),rec:hn(_.id),from_id:_.from_id||void 0,priority:w.get(_.id),...us||ps?{dependency_chips:{...us?{released:us}:{},...ps?{dependents:ps}:{}}}:{}}}),Ki=Yv(T_,k),Vi=Ki.visible,C_=p.revise_parked||{},po=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},R_=_=>{let I=H[_]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Yi=(_,I)=>_.map((le,Be)=>{let Qe=I!=="done",Xt=I!=="done"&&I!=="queue",Lt=Qe?C_[le.bead_id]:null,Mr=Qe?qn(po,le.bead_id):null,Ct=Mr?.operation?Mr:null,vo=Qe&&se.get(le.bead_id)===!0,Zn=p.admission&&typeof p.admission=="object"?p.admission[le.bead_id]:null,Nr=Qe?gu(Zn,!!Ct||ie.has(le.bead_id)):null,us=Qe&&!Nr?Ul(le.bead_id):null,ps=Qe?[us]:[],wo=[];return{id:le.bead_id,title:f.get(le.bead_id)||le.bead_id,reason:ps.filter(Boolean).join(" \xB7 "),draggable:Qe&&!Ct&&!Nr,done:I==="done",lane:I,seq:Xt?Be+1:void 0,worker_serial:vo,discard:Ct,stale_work:Nr,badges:[...wo,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...I==="done"?ai(p.attempts||{},le.bead_id):[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!Ct&&!Z.has(le.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:I==="done"?On(p.attempts||{},le.bead_id):null,work_ms:I==="done"?li(p.attempts||{},le.bead_id):null,done_at:I==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:Qe?Yt(le.bead_id):null,rec:hn(le.bead_id),workflow:Qe&&H[le.bead_id]||null,...I==="done"?R_(le.bead_id):{},from_id:g.get(le.bead_id)||void 0,priority:w.get(le.bead_id),...Fe(le.bead_id)}}),Ir=p.attempts?Object.values(p.attempts).filter(Sr):[],Xi=new Set;for(let _ of Ir)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Xi.add(_.resumed_from);let zl=new Map;for(let _ of Ir)zl.set(_.bead_id,_.attempt_id);let cs=new Map;for(let _ of Ir)cs.set(_.attempt_id,_);function Zi(_){let I=new Set,le=_;for(;le&&!I.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;I.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&cs.get(le.resumed_from)||null}return!1}let fo=typeof p.declared_base=="string"?p.declared_base:null;function O_(_){let I=null;for(let le of Ir)!le||le.bead_id!==_||Zi(le)||(I===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof I.started_at=="number"?I.started_at:0))&&(I=le);return I&&typeof I.target_base=="string"?I.target_base:null}let Qi=[],_o=[],L_=qf(p),Hl=_=>{let I=typeof _.session_id=="string"&&_.session_id.length>0,le=Xi.has(_.attempt_id);return{eligible:I&&!le,reason:I?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},In=null;for(let _ of Ir){let I=_.status==="paused"&&!Xi.has(_.attempt_id);if(_.status==="running"||I)_o.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:I,conflict_resolution:Zi(_),base_exception:Nl(fo,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:qn(po,_.bead_id,{attempt_id:_.attempt_id}),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:On(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:te.has(_.bead_id),exec_chips:Cn(_),rec:hn(_.bead_id),...Fe(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&L_(_)){let le=Hl(_);Qi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(po,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:Zi(_),base_exception:Nl(fo,_.target_base),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:On(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:te.has(_.bead_id),exec_chips:Cn(_),rec:hn(_.bead_id),...Fe(_.bead_id)}),In=_}}let Gl=new Set([...Qi,..._o].map(_=>_.bead_id)),Kl=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let I=_&&_.bead_id;if(!(typeof I!="string"||I.length===0||Gl.has(I))){if(Gl.add(I),Array.isArray(_.blocked_by)){let le=_.blocked_by.filter(Be=>typeof Be=="string"&&Be.length>0);le.length>0&&Kl.set(I,le)}_o.push({bead_id:I,attempt_id:null,kind:"session",title:_.title||f.get(I)||I,status:"in_progress",started_at:Pn(_.started_at)??Pn(_.updated_at),updated_at:Pn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:w.get(I),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:hn(I),usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Qi,..._o].map(_=>{let I=cs.get(_.attempt_id),le=I?.quickfix_landing;if(I?.quickfix_lane!==!0||!le||typeof le!="object")return _;let Be=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,Qe=Us({bead_id:I.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Be?{step:le.cursor,reason:Be}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Qe?{..._,landing:Qe}:_}),Vl=null;if(In){let _=Hl(In),I=In.cause_detail;Vl={bead_id:In.bead_id,repo:In.repo||"",reason:In.cause||In.status,cause_detail:I&&typeof I.reason=="string"?{reason:I.reason,command:typeof I.command=="string"?I.command:null}:null,resume_attempt_id:In.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:qn(po,In.bead_id,{attempt_id:In.attempt_id})}}let Yl=new Set(Dr.map(_=>_.bead_id)),Ji=Array.isArray(p.merge_queue)?p.merge_queue:[],Xl=new Map,Zl=new Map,Ql=new Map,Jl=new Map,ec=new Map;Ji.forEach((_,I)=>{_&&typeof _.bead_id=="string"&&(Xl.set(_.bead_id,I+1),Zl.set(_.bead_id,_.resolution),Ql.set(_.bead_id,_.continuation_action||null),Jl.set(_.bead_id,_.head_review||null),ec.set(_.bead_id,_.authority||null))});let Pr=p.merge_queue_state||{active:null,failures:{}},I_=Pr.failures||{},tc=Pr.waiting&&typeof Pr.waiting.bead_id=="string"&&typeof Pr.waiting.reason=="string"?Pr.waiting:null,D_=p.auto_merge_skips||{},nc=_=>{let I=D_[_];if(!I)return null;let le=K[_],Be=le&&le.pr?le.pr.head_sha:null;return Be&&Be===I.head_sha?I.reason||"":null},mo=new Map;for(let _ of Dr)_.failed!==!0&&_.conflict_resolution&&(_.paused?mo.has(_.bead_id)||mo.set(_.bead_id,"paused"):mo.set(_.bead_id,"running"));let rc=Dr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,sc=(p.workspace_info||{}).slots,oc=typeof sc=="number"?sc:typeof p.slots=="number"?p.slots:Gi,P_=rc>oc,go=$r(j),M_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>go===void 0||typeof _.added_at!="number"||_.added_at>=go).sort((_,I)=>(I.added_at||0)-(_.added_at||0)),ds=Yi(M_,"done"),N_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),ic=[],q_=l?.()||"";for(let _ of re){let I=Pn(_.closed_at);if(typeof _.id!="string"||N_.has(_.id)||I===null||go!==void 0&&I<go||typeof _.comment_count!="number"||_.comment_count<=0)continue;let le=`${q_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Be=P.get(le);if(Be===void 0&&n&&(P.set(le,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Qe=>{let Xt=Array.isArray(Qe)&&Qe.some(Lt=>Di(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");P.set(le,Xt?"session":"not-session"),Ne()}).catch(()=>{P.set(le,"failed"),Ne()})),Be==="session"){let Qe=Pn(_.started_at);ic.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Qe!==null&&I>=Qe?I-Qe:null,work_kind:"session",done_at:I,created_at:_.created_at,updated_at:_.updated_at})}}ds.push(...ic),ds.sort((_,I)=>(I.done_at||0)-(_.done_at||0));let bo={};for(let _ of Vn)bo[_]=0;let ac=!1,lc=0,ea=0,cc=0;for(let _ of ds){let I=_.usage;if(I&&typeof I=="object"){let le=!1;for(let Be of Vn)Number.isFinite(I[Be])&&(bo[Be]+=I[Be],ac=!0,le=!0);le&&(ea+=1,Number.isFinite(I.total_cost_usd)&&(lc+=I.total_cost_usd,cc+=1))}}ea>0&&cc===ea&&(bo.total_cost_usd=lc);let dc=ds.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),F_=dc.length>0?an(Go(dc)):ac?tr(bo):null,uc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},pc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],fc=_=>{if(v.some(Be=>Be.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let I=Ir.filter(Be=>Be&&Be.bead_id===_),le=I.length>0?I[I.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ho=pc.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,I)=>{let le=uc[_.id]||{},Be=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(Ct=>Ct&&typeof Ct.bead_id=="string"&&typeof Ct.after=="string").map(Ct=>[Ct.bead_id,Ct.after])),Qe=Array.isArray(le.occupied_by)?le.occupied_by.filter(Ct=>typeof Ct=="string"):[],Xt=new Set(Qe),Lt=Yi(_.entries.filter(Ct=>!Yl.has(Ct.bead_id)&&!Xt.has(Ct.bead_id)),_.id).map(Ct=>Be.has(Ct.id)?{...Ct,badges:[`\u{1F517} ${Be.get(Ct.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Ct.badges]}:Ct),Mr=Qe.map(Ct=>({id:Ct,title:f.get(Ct)||Ct,draggable:!1,lane:_.id,ghost:!0,badges:[fc(Ct)]}));return{id:_.id,index:I+1,rows:[...Mr,...Lt],occupied:Qe.length>0,badge:Qe.length>0?fc(Qe[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),_c=typeof p.serial_lane_count=="number"?p.serial_lane_count:ho.length,ta=Yi(qe.filter(_=>!Yl.has(_.bead_id)),"queue"),mc=new Map,gc=new Set;for(let[_,I]of Object.entries(uc)){if(!/^s[1-5]$/.test(_))continue;let le=I&&Array.isArray(I.occupied_by)?I.occupied_by:[];for(let Be of le)typeof Be=="string"&&mc.set(Be,_);le.length>0&&gc.add(_)}let lr=[];for(let _ of Dr)typeof _.bead_id=="string"&&lr.push({id:_.bead_id,title:f.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:mc.get(_.bead_id)??null});for(let _ of v){let I=_&&_.bead_id;typeof I!="string"||I.length===0||lr.push({id:I,title:f.get(I)||I,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of ho)for(let I of _.rows)I.ghost!==!0&&lr.push({id:I.id,title:I.title,location_label:`${_.id} #${I.seq??""}`.trim(),kind:"serial",lane_id:_.id});ta.forEach((_,I)=>{lr.push({id:_.id,title:_.title,location_label:`#${I+1}`,kind:"parallel",lane_id:null})});for(let _ of Vi)lr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:_.queue_placeable===!0});let bc={};for(let _ of pc)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(bc[_.id]=_.entries.length);let na=new Map;for(let _ of lr)na.has(_.id)||na.set(_.id,_);Y={members_by_id:na,serial_raw_lengths:bc,serial_lane_count:_c,occupied_lanes:gc};let j_=Up(p.bead_scope,lr),yo=new Map;for(let[_,I]of Kl)yo.set(_,I);for(let[_,I]of Wl)yo.set(_,I);for(let[_,I]of Object.entries(Se))Array.isArray(I)&&yo.set(_,I.filter(le=>typeof le=="string"&&le.length>0));let B_=xu(yo,lr,Ye),ra=(_,I=null)=>{let le=j_.get(_),Be=B_.get(_)||null,Qe=le&&le.overlaps.length>0?le.overlaps:null,Xt=!!le&&le.scope_missing;if(!Be&&!Qe&&!Xt)return I;let Lt=Qe?xe(_,Qe):null;return{...I||{},...Be?{predecessors:Be}:{},...Qe?{overlaps:Qe}:{},...Xt?{scope_missing:!0}:{},...Lt?{popover:Lt}:{}}},sa=_=>{let I=ra(_.id,_.dependency_chips||null);return I&&(_.dependency_chips=I),_};for(let _ of ta)sa(_);for(let _ of ho)for(let I of _.rows)I.ghost!==!0&&sa(I);for(let _ of Vi)sa(_);let hc=new Map;for(let _ of Dr){let I=typeof _.bead_id=="string"?_.bead_id:"";if(I.length===0)continue;let le=_.kind==="session",Be=ra(I),Qe=typeof _.attempt_id=="string"&&_.attempt_id.length>0?cs.get(_.attempt_id):void 0,Xt=Qe&&Qe.last_activity&&typeof Qe.last_activity=="object"?Qe.last_activity:null,Lt=Qe&&Array.isArray(Qe.legs)?Qe.legs:[];!Be&&!Xt&&Lt.length===0&&!le||hc.set(I,{...Xt?{last_activity:Xt}:{},...Lt.length>0?{legs:Lt}:{},...Be?{dependency_chips:Be}:{}})}let U_=v.map(_=>gw(_.bead_id,f.get(_.bead_id)||_.bead_id,K,B[_.bead_id]||null,On(p.attempts||{},_.bead_id),L[_.bead_id]||(_e.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:W.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),mo.get(_.bead_id)||null,_.external===!0,{position:Xl.get(_.bead_id)||0,active:Pr.active===_.bead_id,failure:I_[_.bead_id]||null,waiting:tc?.bead_id===_.bead_id?tc.reason:null,resolution:Zl.get(_.bead_id),continuation_action:Ql.get(_.bead_id),head_review:Jl.get(_.bead_id)||null,authority:ec.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?nc(_.bead_id):null,Nl(fo,O_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},cs.get(zl.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},ra(_.bead_id))).map(_=>({..._,workflow:H[_.id]||null,priority:w.get(_.id),...Fe(_.id)}));return{queue:p,idToTitle:f,candidates:Vi,candidate_hidden:{blocked:Ki.hidden_blocked,spec:Ki.hidden_spec},running:Dr,live_count:rc,slots:oc,over_cap:P_,failure:Vl,waiting:ta,serial_lanes:ho,serial_lane_count:_c,running_overlays:hc,pr_wait:U_,merge_queue_length:Ji.length,merge_queue_running:Ji.length>0,auto_excluded:v.map(_=>_.bead_id).filter(_=>nc(_)!==null),declared_base:fo,done:ds,token_total:F_,cleanup_failures:Ae,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Je(p){let h=p.waiting.length>0?p.waiting[0].id:"\u2014",R=d`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=ke(p),ge=p.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",pt=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,ut=pt>0?d`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${pt}건 진행 중</span
          >`:"",Vt=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${U()} 완료 <b>${p.done.length}</b></span
      >`,Ut=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Gt=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Gi}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:l_},(Yt,An)=>An+1).map(Yt=>d`<option
                value=${String(Yt)}
                ?selected=${p.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,Cn=Xp({failure:p.failure}),bn=mu(p.repo_operations,p.cleanup_failures);return V?d`<div class="worker-ribbon">
          ${R} ${re}
          <div class="worker-kpi worker-kpi--ribbon">
            ${ge}${ut}${Vt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Gt}</div>
          <div class="worker-kpi">${Ut}</div>
        </div>
        ${bn}${je.template()}${Cn}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${re}${Gt}</div>
        <div class="worker-kpi">
          ${ge}${ut}${Vt}${Ut}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${U()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Yt=>d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Yt.tooltip}
                >${U()} 완료 · 누적 ${Yt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${bn}${je.template()}${Cn}`}function M(p){let h=p.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Xv.map(R=>d`<button
              type="button"
              class="worker-filter__chip${k.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${k.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${h.spec>0?d`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function F(){let p=ee?"custom":Dl(ae)||"custom";return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${p}
    >
      ${lo.map(h=>d`<option value=${h.id} ?selected=${p===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${p==="custom"}>
        사용자 지정…
      </option>
    </select>`}function we(){let p=co(ae);return d`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let R=p[h];return d`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${h===0?"":d`<option value="" ?selected=${!R}>없음</option>`}
            ${Hf.map(re=>d`<option
                  value=${re.key}
                  ?selected=${!!R&&R.key===re.key}
                >
                  ${re.label}
                </option>`)}
          </select>
          ${R?d`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${R.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Xe(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${Fr.map(p=>d`<option value=${p.value} ?selected=${j===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ke(p){let h=p.queue.auto_merge===!0;if(p.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${h?" is-active":""}"
        title=${h?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${h?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(h)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(p.auto_excluded),re=p.pr_wait.filter(ge=>ge.merge_action&&ge.merge_enabled&&!R.has(ge.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function Ze(p){if(!(p.draggable!==!0||p.done===!0))return d`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${p.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function ot(p){return gi({parallel:{rows:p.waiting.map(h=>Fn(h,{actions:Ze(h)})),count:p.waiting.length,collapsed:X.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(h=>({id:h.id,title:`\uC9C1\uB82C ${h.index}`,rows:h.rows.map(R=>Fn(R,{actions:Ze(R)})),count:h.rows.length,empty:h.rows.length===0,badge:h.badge,held:h.occupied,cycle:h.cycle})),collapsed:X.isAreaCollapsed("serial")}})}function mt(p){return Zp(p.running,Date.now(),St,p.running_overlays)}function $t(p){return p.running.some(h=>h.kind!=="session"&&!h.paused&&h.failed!==!0)}function Kt(p){let h=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:F(),header_row:ee?we():void 0,controls:M(p),collapsible:!0,collapsed:X.isCollapsed("candidate"),place_menu:bt(p.candidates),onOpenDoc:c?(re,ge)=>c(ge):void 0}),R=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${U()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Xe(),collapsible:!0,collapsed:X.isCollapsed("done"),preview:V?Array.isArray(p.token_total)?p.token_total.map(re=>re.label).join(" \xB7 "):p.token_total||d_(p.done):void 0});return V?d`<div class="worker-lanes worker-lanes--mobile">
        ${bi({live:$t(p),running_body:p.running.length>0?mt(p):"",pr_wait_rows:p.pr_wait.map(re=>Fn(re)),count:p.running.length+p.pr_wait.length})}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:X.isCollapsed("queue"),preview:d_(p.waiting),body:ot(p)})}
        ${h} ${R}
      </div>`:d`<div class="worker-lanes">
      ${h}
      ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:X.isCollapsed("queue"),body:ot(p)})}
      ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:d`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:$t(p),collapsible:!0,collapsed:X.isCollapsed("running"),body:mt(p)})}
      ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:X.isCollapsed("pr_wait")})}
      ${R}
    </div>`}function Et(p){X.toggle(p),Ne()}function Jt(p){X.toggleArea(p),Ne()}function Ne(){let p=he();rt(Je(p),ve),rt(Kt(p),yt)}function mn(){let p=!0,h=ji(R=>{if(V=R,p){p=!1;return}Ne()});Te.push(h)}let en=null;function jt(p){en=p.target instanceof Element?p.target:null}function Qt(p){let R=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;if(en&&R.contains(en)&&en.closest("input, button, a")){p.preventDefault();return}let re=R.dataset.beadId||"",ge=R.dataset.lane||"";b={bead_id:re,from_lane:ge},ye.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",re),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function gn(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;let R=h.dataset.lane||"";R!=="queue"&&!/^s[1-5]$/.test(R)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function fe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function A(){ye.classList.remove("is-dragging")}function ue(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;p.preventDefault(),h.classList.remove("worker-pane--drag-over"),ye.classList.remove("is-dragging");let R=h.dataset.lane||"",re=b?.bead_id||p.dataTransfer?.getData("text/plain")||"",ge=b?.from_lane||"";if(b=null,!re)return;let pt=p.target?.closest?.(".worker-mini, .worker-card"),ut=R==="queue"&&h.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||h,Vt=Array.from(ut.querySelectorAll(".worker-mini, .worker-card")),Ut=Vt.length;if(pt){let Gt=Vt.indexOf(pt);Gt>=0&&(Ut=Gt)}if(Ut=Math.max(0,Ut-ut.querySelectorAll(".worker-mini--ghost").length),h.classList.contains("worker-pane--collapsed")&&(Ut=ne()),R==="queue"||/^s[1-5]$/.test(R)){let Gt=R==="queue"?"parallel":R;ge===R?lt(re,Gt,Ut):De(re,Gt)}}function Ce(p){k=p,Vv(p),Ne()}function vt(p){if(p==="custom"){ee=!0,Ne();return}ae=uo(p),Pl(ae),ee=!1,Ne()}function Tt(p){ae=uo({chain:p}),Pl(ae),Ne()}function xt(p){j=Gn(p),Qv(j),m?.(j),Ne()}function Bt(p){let h=p.target?.closest?.(".worker-serial-lane-count");if(h){let Ut=Number.parseInt(h.value,10);Number.isFinite(Ut)&&G(Ut).then(Ne);return}let R=p.target?.closest?.(".worker-filter__blocked");if(R){Ce({...k,show_blocked:R.checked});return}let re=p.target?.closest?.(".worker-sort-chain__key");if(re){let Ut=Number.parseInt(re.getAttribute("data-step")||"",10);Number.isFinite(Ut)&&Tt(Kf(co(ae),Ut,re.value));return}let ge=p.target?.closest?.(".worker-done-range");if(ge){xt(ge.value);return}let pt=p.target?.closest?.(".worker-sort");if(pt){vt(pt.value);return}let ut=p.target?.closest?.(".worker-slots__input");if(!ut)return;let Vt=Number.parseInt(ut.value,10);if(!Number.isFinite(Vt)){Ne();return}E(Vt).then(Ne)}function nn(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rn(){let p=he(),h=Me().workspace_info,R=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:R}}function Tn(){St&&ct.close(),Ke.hidden=!1,$e.hidden=!1,T.open(rn()),Ne()}function Ot(p){let h=Me(),R=h.attempts?h.attempts[p]:null;St=p,T.close(),Ke.hidden=!0,$e.hidden=!1,ct.open({attempt_id:p,meta:nn(R)}),Ne()}function on(p){let h=Me(),R=(Array.isArray(h.session_active)?h.session_active:[]).find(ge=>ge&&ge.bead_id===p),re=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(ge=>ge&&ge.current===!0);re&&(T.close(),Ke.hidden=!0,$e.hidden=!1,ct.open(Yr(re,p,"in_progress")),Ne())}function cn(){if(T.isOpen()&&T.refresh(rn()),!St)return;let p=Me(),h=p.attempts?p.attempts[St]:null;if(h){ct.updateMeta(nn(h));return}ct.close()}function dn(p,h){if(p.length===0||!i)return;let R=l?l():void 0;if(h.length===0||!R||h===R||!a){i(p);return}Promise.resolve(a(h)).then(()=>{i(p)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Hn(p){let h=p.target;if(h?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let R=h?.closest?.(".worker-sort-chain__dir");if(R){let B=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(B)&&Tt(Vf(co(ae),B));return}let re=h?.closest?.(".worker-dep__open");if(re){dn(re.getAttribute("data-dep-id")||"",re.getAttribute("data-root-dir")||"");return}let ge=h?.closest?.(".mon-overlap__chip");if(ge){let B=ge.closest("[data-bead-id]"),Ae=B&&B.getAttribute("data-bead-id")||"";if(Ae){let qe=ge.getAttribute("data-overlap-id")||"";q=!!q&&q.bead_id===Ae&&q.counterpart_id===qe?null:{bead_id:Ae,counterpart_id:qe},Ne()}return}let pt=h?.closest?.(".mon-overlap__place");if(pt){let B=pt.closest("[data-bead-id]"),Ae=B&&B.getAttribute("data-bead-id")||"";Ae&&at(Ae,pt.getAttribute("data-counterpart-id")||"");return}if(h?.closest?.(".mon-overlap__popover"))return;if(h?.closest?.(".worker-repo-strip")){Tn();return}let ut=h?.closest?.(".worker-repo-op__dismiss");if(ut){me(ut.dataset.operationId||"");return}let Vt=h?.closest?.(".worker-cleanup__resume");if(Vt){let B=Vt.dataset.beadId;B&&Pt(B);return}let Ut=h?.closest?.(".worker-banner__resume");if(Ut){let B=Ut.dataset.attemptId;B&&Ue(B);return}let Gt=h?.closest?.(".worker-banner__discard");if(Gt){let B=Gt.dataset.confirmation==="merged"?"merged":"unmerged";wt(Gt.dataset.beadId||"",Gt.dataset.attemptId||null,B,Gt.dataset.operationId||null);return}let Cn=h?.closest?.(".worker-banner__dismiss");if(Cn){let B=Cn.dataset.attemptId;B&&dt(B);return}if(h?.closest?.(".worker-play")){J(!Me().auto_advance);return}let bn=h?.closest?.(".worker-merge-all");if(bn){bn.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?Ht(!1):Nt():Ht(!0);return}let Yt=h?.closest?.(".worker-pane__toggle[data-lane]");if(Yt){let B=Yt.dataset.lane;(B==="candidate"||B==="queue"||B==="running"||B==="pr_wait"||B==="done")&&Et(B);return}let An=h?.closest?.(".worker-wait__area-toggle[data-area]");if(An){let B=An.dataset.area;(B==="parallel"||B==="serial")&&Jt(B);return}let hn=h?.closest?.(".worker-card__place-lane");if(hn){let B=hn.dataset.beadId,Ae=hn.dataset.lane;B&&(Ae==="parallel"||/^s[1-5]$/.test(Ae||""))&&(D=null,Ne(),De(B,Ae));return}if(h?.closest?.(".worker-card__place-cancel")){D=null,Ne();return}let Xn=h?.closest?.(".worker-card__place");if(Xn){let B=Xn.dataset.beadId;B&&!Xn.disabled&&(et()?(D=B,Ne()):De(B,"parallel"));return}let f=h?.closest?.(".worker-filter__chip");if(f){let B=f.dataset.spec;(B==="all"||B==="with"||B==="without")&&Ce({...k,spec:B});return}let g=h?.closest?.('[data-action="queue-remove"]');if(g){let B=g.dataset.beadId||"";B&&it(B);return}let w=h?.closest?.(".worker-mini__merge");if(w){let B=w.dataset.beadId||"";Me().cleanup_failed?.[B]?Pt(B):_t(B);return}let $=h?.closest?.(".worker-mini__merge-cancel");if($){Mt($.dataset.beadId||"");return}let N=h?.closest?.(".worker-mini__discard");if(N){wt(N.dataset.beadId||"",N.dataset.attemptId||null,N.dataset.discardMode==="merged"?"merged":"unmerged",N.dataset.operationId||null);return}let H=h?.closest?.(".worker-mini__stale-continue");if(H){We("worker-stale-work-continue",H.dataset.beadId||"",H.dataset.actionId||"");return}let se=h?.closest?.(".worker-mini__stale-backup");if(se){We("worker-stale-work-backup-fresh",se.dataset.beadId||"",se.dataset.actionId||"");return}let Se=h?.closest?.(".worker-mini__stale-recheck");if(Se){We("worker-stale-work-recheck",Se.dataset.beadId||"",Se.dataset.actionId||"");return}let Ye=h?.closest?.(".worker-mini__revise-fix");if(Ye){O("worker-revise-fix",Ye.dataset.beadId||"");return}let nt=h?.closest?.(".worker-mini__revise-approve");if(nt){O("worker-revise-approve",nt.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let B=h?.closest?.(".rtile"),Ae=B?.dataset?.beadId,qe=B?.dataset?.attemptId;Ae&&wt(Ae,qe||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let Ae=h?.closest?.(".rtile")?.dataset?.attemptId;Ae&&dt(Ae);return}if(h?.closest?.(".rtile__pause")){let Ae=h?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Pe(Ae);return}if(h?.closest?.(".rtile__resume")){let Ae=h?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Ue(Ae);return}if(h?.closest?.(".rtile__session")){let B=h?.closest?.(".rtile"),Ae=B?.dataset?.attemptId;if(Ae){Ot(Ae);return}let qe=B?.dataset?.beadId;qe&&on(qe);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){T.close(),ct.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Fe=h?.closest?.(".rtile .board-card__roll-toggle");if(Fe){let B=Fe.dataset.rollParent;B&&(te.has(B)?te.delete(B):te.add(B),Ne());return}let v=h?.closest?.(".rtile .board-card__roll-child");if(v){let B=v.dataset.childId;B&&i&&i(B);return}let K=h?.closest?.(".rtile");if(K){if(h?.closest?.(".rtile__id")){let Ae=K.dataset.beadId;Ae&&Mn(Ae).then(qe=>{qe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let B=K.dataset.beadId;B&&i&&i(B);return}let L=h?.closest?.(".worker-mini, .worker-card");if(L){let B=L.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){B&&Mn(B).then(qe=>{qe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ae=h?.closest?.(".ctl-chip--from");if(Ae){let qe=Ae.dataset.fromId;qe&&i&&i(qe);return}B&&i&&i(B)}}e.addEventListener("pointerdown",jt),e.addEventListener("dragstart",Qt),e.addEventListener("dragover",gn),e.addEventListener("dragleave",fe),e.addEventListener("dragend",A),e.addEventListener("drop",ue),e.addEventListener("click",Hn),e.addEventListener("change",Bt);function x(p){if(!q)return;let h=p.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(q=null,Ne())}function C(p){p.key!=="Escape"||!q||(q=null,Ne())}return document.addEventListener("click",x),document.addEventListener("keydown",C),Te.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",C)}),mn(),y&&Te.push(y.subscribe(()=>{for(let[p,h]of P)h==="failed"&&P.delete(p);Ne()})),s&&Te.push(s.subscribe(()=>{let p=l&&l()||"";p!==Le&&(Le=p,ce.close()),Ne(),cn()})),Ne(),{load(){S(),Ne()},refreshSessionDefaults:oe,destroy(){for(let p of Te.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",jt),e.removeEventListener("dragstart",Qt),e.removeEventListener("dragover",gn),e.removeEventListener("dragleave",fe),e.removeEventListener("dragend",A),e.removeEventListener("drop",ue),e.removeEventListener("click",Hn),e.removeEventListener("change",Bt);try{ct.destroy()}catch{}$e.hidden=!0;try{ce.destroy()}catch{}rt(d``,e)}}}function Fl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function __(e,t,n,r=async()=>{},s=async()=>{}){let o=qt("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(U){let V=U.target.value,W=t.getState().workspace?.current?.path||"";if(V&&V!==W){o("switching workspace to %s",V),l=!0,P();try{await n(V)}catch(Z){o("workspace switch failed: %o",Z)}finally{l=!1,P()}}}async function m(){let U=t.getState(),X=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!X||a)){o("git-pulling workspace %s",X),a=!0,P();try{await r(X)}catch(V){o("workspace git pull failed: %o",V)}finally{a=!1,P()}}}function y(U){let X=U.target;X&&e.contains(X)||D()}function b(U){U.key==="Escape"&&D()}function k(){c||(c=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),P())}function D(){c&&(c=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),P())}function q(){c?D():k()}async function Y(U){let X=U.target,V=X.value,_e=X.checked;o("toggling visibility %s \u2192 %s",V,String(_e));try{await s(V,_e)}catch(W){o("workspace visibility toggle failed: %o",W)}}function ae(U){return U?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function ee(U,X){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${U.map(V=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!X.has(V.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Fl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let U=t.getState(),X=U.workspace?.current,V=U.workspace?.available||[],_e=new Set(U.workspace?.hidden||[]),W=X?.path||V[0]?.path||"";if(V.length===0)return d``;let Z=V.filter(ie=>!_e.has(ie.path)||ie.path===W);if(Z.length<=1){let ie=Z[0]||V[0],te=Fl(ie.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${te}</span
          >
          ${ee(V,_e)}
          ${ae(W)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Z.map(ie=>d`
              <option
                value="${ie.path}"
                ?selected=${ie.path===W}
                title="${ie.path}"
              >
                ${Fl(ie.path)}
              </option>
            `)}
        </select>
        ${ee(V,_e)}
        ${ae(W)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){rt(j(),e)}return P(),i=t.subscribe(()=>P()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),rt(d``,e)}}}var m_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function jl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function g_(e,t,n=jl()){return{id:n,type:e,payload:t}}function b_(e={}){let t=qt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],m=new Map,y=new Set;function b(j){for(let P of Array.from(y))try{P(j)}catch{}}function k(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),P=(n.jitterRatio||0)*j,U=Math.max(0,Math.round(j+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",U,i+1),l=setTimeout(()=>{l=null,ee()},U)}function D(j){try{s?.send(JSON.stringify(j))}catch(P){t("ws send failed",P)}}function q(){for(o="open",t("ws open"),b(o),i=0;u.length;){let j=u.shift();j&&D(j)}}function Y(j){let P;try{P=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(c.has(P.id)){let X=c.get(P.id);c.delete(P.id),P.ok?X?.resolve(P.payload):X?.reject(P.error||new Error("ws error"));return}let U=m.get(P.type);if(U&&U.size>0)for(let X of Array.from(U))try{X(P.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",P.type)}function ae(){o="closed",t("ws closed"),b(o);for(let[j,P]of c.entries())P.reject(new Error("ws disconnected")),c.delete(j);i+=1,k()}function ee(){if(!a)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",b(o),s.addEventListener("open",q),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(P){t("ws connect failed %o",P),k()}}return ee(),{send(j,P){if(!m_.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let U=jl(),X=g_(j,P,U);return t("send %s id=%s",j,U),new Promise((V,_e)=>{c.set(U,{resolve:V,reject:_e,type:j}),s&&s.readyState===s.OPEN?D(X):(t("queue %s id=%s (state=%s)",j,U,o),u.push(X))})},on(j,P){m.has(j)||m.set(j,new Set);let U=m.get(j);return U?.add(P),()=>{U?.delete(P)}},onConnection(j){return y.add(j),()=>{y.delete(j)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function bw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function hw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Bl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],h_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",yw="bdui.worker.done-range",y_=bf,v_="worker:queue",w_="ui:order",k_="ui:display-policy",$_="exec:presets",br="tab:board:closed",x_="beads-ui.board.closed-range";function vw(e){let t=qt("main");t("bootstrap start");let n=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(i&&Nf(i),l&&a&&c&&u){let ye=function(x,C){let p="Request failed",h="";if(x&&typeof x=="object"){let re=x;if(typeof re.message=="string"&&re.message.length>0&&(p=re.message),typeof re.details=="string")h=re.details;else if(re.details&&typeof re.details=="object")try{h=JSON.stringify(re.details,null,2)}catch{h=""}}else typeof x=="string"&&x.length>0&&(p=x);let R=C&&C.length>0?`Failed to load ${C}`:"Request failed";oe.open(R,p,h)},De=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},lt=function(){Le&&(Le().catch(()=>{}),Le=null),je=null,Me=null},Pe=function(x){et=x;let C=()=>{et!==x||fe.getState().selected_id!==x||(et=null,it(x))};if(!z){Ve.then(C);return}C()},_t=function(x,C,p,h,R){return p!==tt[C]?(R().catch(()=>{}),!1):(x.set(h,R),!0)},Ft=function(){let x=fe.getState();We(x.view==="board"),Re(x.view==="worker"),Je(he(x)),xe(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id)},Nt=function(){let x=$r(Ht);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},wt=function(){let x=$r(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},We=function(x){if(x)for(let[C,p]of Bl){if(Ue.has(C)||dt.has(C))continue;let h=C===br?Nt():{type:p};try{Oe.register(C,h)}catch(ge){t("register %s store failed: %o",C,ge)}dt.add(C);let R=tt.board,re=!1;be.subscribeList(C,h).then(ge=>{re=!_t(Ue,"board",R,C,ge)}).catch(ge=>{t("subscribe %s failed: %o",C,ge),ye(ge,"board")}).finally(()=>{dt.delete(C),re&&Ft()})}else me()},me=function(){tt.board+=1;for(let[x]of Bl){let C=Ue.get(x);C&&(C().catch(()=>{}),Ue.delete(x));try{Oe.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Re=function(x){if(!x){ze();return}for(let[C,p]of h_){if(E.has(C)||dt.has(C))continue;let h=C===gr?wt():{type:p};try{Oe.register(C,h)}catch(ge){t("register %s store failed: %o",C,ge)}dt.add(C);let R=tt.worker,re=!1;be.subscribeList(C,h).then(ge=>{re=!_t(E,"worker",R,C,ge)}).catch(ge=>{t("subscribe %s failed: %o",C,ge),ye(ge,"worker")}).finally(()=>{dt.delete(C),re&&Ft()})}},ze=function(){tt.worker+=1;for(let[x]of h_){let C=E.get(x);C&&(C().catch(()=>{}),E.delete(x));try{Oe.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},xe=function(x){if(!x){at();return}G||($e("subscribe-worker-queue",{id:v_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),G=()=>$e("unsubscribe-worker-queue",{id:v_}))},at=function(){G&&(G().catch(()=>{}),G=null)},he=function(x){return x.view==="monitor"||x.selected_id!=null},Je=function(x){if(!x){M();return}st||($e("subscribe-monitor-pipeline",{id:y_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),st=()=>$e("unsubscribe-monitor-pipeline",{id:y_}))},M=function(){st&&(st().catch(()=>{}),st=null)},we=function(){F||($e("subscribe-ui-order",{id:w_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),F=()=>$e("unsubscribe-ui-order",{id:w_}))},Xe=function(){F&&(F().catch(()=>{}),F=null),St.clear()},Ze=function(){ke||($e("subscribe-display-policy",{id:k_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),ke=()=>$e("unsubscribe-display-policy",{id:k_}))},ot=function(){ke&&(ke().catch(()=>{}),ke=null),ct.clear()},$t=function(){mt||($e("subscribe-impl-presets",{id:$_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),mt=()=>$e("unsubscribe-impl-presets",{id:$_}))},en=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},rn=function(x,C){nn.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var m=ye,y=De,b=lt,k=Pe,D=_t,q=Ft,Y=Nt,ae=wt,ee=We,j=me,P=Re,U=ze,X=xe,V=at,_e=he,W=Je,Z=M,ie=we,te=Xe,Ee=Ze,He=ot,pe=$t,Q=en,Te=rn;let Ie=document.getElementById("header-loading"),S=ad(Ie),oe=Fp(e),ve=b_(),$e=S.wrapSend((x,C)=>ve.send(x,C)),be=ed($e),Oe=td(),Ke=rd(),yt=Ic(),St=nd(),ct=Oc(),T=Lc(),ce=Dc();ve.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&T.set({revision:C.revision,presets:C.presets})}),ve.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{yt.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{St.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),ve.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{ct.set(C.policy)}catch{}}),ve.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{ce.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),ve.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{ce.append(C.id,C.event)}catch{}}),ve.on("snapshot",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="snapshot")try{h.applyPush(C)}catch{}}),ve.on("upsert",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="upsert")try{h.applyPush(C)}catch{}}),ve.on("delete",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="delete")try{h.applyPush(C)}catch{}});let Le=null,je=null,Me=null,et=null,bt=()=>{},Ve=new Promise(x=>{bt=()=>x(void 0)}),z=!1,ne=!1;async function it(x){let C=De(x);if(C===je||C===Me)return;Me=C;let p=`detail:${x}`,h={type:"issue-detail",params:{id:x}};try{Oe.register(p,h)}catch(R){t("register detail store failed: %o",R)}try{let R=await be.subscribeList(p,h);if(fe.getState().selected_id!==x||De(x)!==C){await R().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=R,je=C}catch(R){t("detail subscribe failed: %o",R),ye(R,"issue details")}finally{Me===C&&(Me=null)}}let Ue=new Map,dt=new Set,tt={board:0,worker:0},Pt=!1,Ht=To;try{let x=window.localStorage.getItem(x_);pa(x)&&(Ht=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(yw);x!==null&&(Mt=Gn(x))}catch{}async function O(x){if(!pa(x)||x===Ht)return;Ht=x;try{window.localStorage.setItem(x_,x)}catch{}let C=Ue.get(br);if(!C)return;Ue.delete(br),await C().catch(()=>{});let p=Nt();try{Oe.register(br,p)}catch(h){t("register %s store failed: %o",br,h)}try{let h=await be.subscribeList(br,p);Ue.set(br,h)}catch(h){t("re-subscribe %s failed: %o",br,h),ye(h,"board")}}async function J(x){let C=Gn(x);if(C===Mt)return;Mt=C;let p=E.get(gr);if(!p)return;E.delete(gr),await p().catch(()=>{});let h=wt();try{Oe.register(gr,h)}catch(R){t("register %s store failed: %o",gr,R)}try{let R=await be.subscribeList(gr,h);E.set(gr,R)}catch(R){t("re-subscribe %s failed: %o",gr,R),ye(R,"worker")}}let E=new Map,G=null,st=null,F=null,ke=null,mt=null;async function Kt(){ke=null,ct.clear(),mt=null,T.clear(),G=null,st=null,Ue.clear(),E.clear(),tt.board+=1,tt.worker+=1,$t();let x=fe.getState().workspace.current?.path;if(x)try{await ve.send("set-workspace",{path:x})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ze();let C=fe.getState();We(C.view==="board"),Re(C.view==="worker"),Je(he(C)),xe(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Et(){t("clearing all subscriptions for workspace switch"),me(),ze(),at(),Ke.clear(),Xe(),we(),ot(),Ze(),lt();let x=fe.getState();if(x.selected_id)try{Oe.unregister(`detail:${x.selected_id}`)}catch{}let C=fe.getState();We(C.view==="board"),Re(C.view==="worker"),Je(he(C)),xe(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&Pe(C.selected_id)}async function Jt(x){t("requesting workspace switch to %s",x),ne=!0;try{let C=await ve.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(fe.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Et(),de("Switched to "+en(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),de("Failed to switch workspace","error",3e3),C}finally{ne=!1}}async function Ne(x){t("requesting workspace git pull for %s",x);try{let C=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let p=C?.status;if(p==="up_to_date"){de("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+en(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let p=C?.code,h=C?.message;if(p==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let R=h?`: ${h}`:"";throw de(`Git pull failed${R}`,"error",3e3),C}}async function mn(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await ve.send("set-workspace-visibility",{path:x,visible:C}),await jt()}catch(p){t("workspace visibility update failed: %o",p),de("Failed to update project visibility","error",3e3)}}async function jt(){try{let x=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),p=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,h=Array.isArray(x.hidden)?x.hidden.filter(re=>typeof re=="string"):[];fe.setState({workspace:{current:p,available:C,hidden:h}});let R=window.localStorage.getItem("beads-ui.workspace");R&&(!C.some(ge=>ge.path===R)||h.includes(R)?window.localStorage.removeItem("beads-ui.workspace"):p&&R!==p.path&&(t("restoring saved workspace preference: %s",R),await Jt(R)))}}catch(x){t("failed to load workspaces: %o",x)}}ve.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),jt(),Et())});let Qt=!1;if(typeof ve.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(Qt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&Qt&&(Qt=!1,de("Reconnected","success",2200),hw(fe,(p,h)=>{t(`${p}: %o`,h)}),Kt())};ve.onConnection(x)}let gn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(gn=x)}catch(x){t("view parse error: %o",x)}let fe=id({config:bw(),view:gn});ve.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let p=fe.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&C.root_dir!==p){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{Ke.set(C.queue)}catch{}});let A=sd(fe);A.start();let ue=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ce=async(x,C)=>{try{return await $e(x,C)}catch(p){if(ue.has(x))throw p;return[]}};yf({global_element:r,repo_element:s},fe,A);let vt=document.getElementById("workspace-picker");vt&&__(vt,fe,Jt,Ne,mn);let Tt=$f(e,(x,C)=>$e(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Tt.open())}catch{}let xt=Ef(e,{policyStore:ct,queueStore:Ke,implPresetStore:T,transport:(x,C)=>$e(x,C),onOpenChange:x=>{let C=Pt;Pt=x,Ft(),C&&x===!1&&Ot.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of Bl)for(let p of Oe.snapshotFor(C)||[]){let h=p.labels;if(Array.isArray(h))for(let R of h)typeof R=="string"&&R.length>0&&x.add(R)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>xt.open()))}catch{}let Bt=document.createElement("div");Bt.className="md-viewer-root",document.body.appendChild(Bt);let nn=qi(Bt,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),Tn=$d(l,{gotoIssue:x=>A.gotoIssue(x),issueStores:Oe,transport:Ce,workerQueueStore:Ke,uiOrderStore:St,displayPolicyStore:ct,closedRange:Ht,onClosedRangeChange:x=>{O(x)},onNewIssue:()=>Tt.open(),openDoc:rn}),Ot=ql(a,{transport:Ce,issueStores:Oe,queueStore:Ke,sessionLogStore:ce,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn,doneRange:Mt,onDoneRangeChange:x=>{J(x)}}),on=hf(c,{transport:Ce,pipelineStore:yt,execPresetStore:T,sessionLogStore:ce,router:A,gotoIssue:x=>A.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn}),cn=qp(u,{issueStores:Oe,transport:Ce,queueStore:Ke,execPresetStore:T,sessionLogStore:ce,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:nn,depCandidates:()=>{let x=yt.get();if(x===null)return null;let C=yt.getWorkspacesState(),p=fe.getState();if(p.view==="monitor")return Ya(x,C);let h=p.workspace.current?.path;return h?Ya(x,C,{root_dir:h}):null},subscribeCandidates:x=>yt.subscribe(x),onDepChanged:({type:x,a:C,b:p})=>{let h=on;x==="dep-add"&&h&&typeof h.recorrectSharedLane=="function"&&h.recorrectSharedLane(x,C,p)},onNavigate:(x,C)=>{let p=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):A.gotoIssue(x)},h=fe.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!h||C===h){p();return}Promise.resolve(Jt(C)).then(p).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{A.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),dn=fe.getState().selected_id;dn&&(u.hidden=!1,cn.load(dn),Pe(dn)),fe.subscribe(x=>{let C=x.selected_id;C?(u.hidden=!1,cn.load(C),ne||Pe(C)):(cn.clear(),u.hidden=!0,lt())});let Hn=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",c.hidden=x.view!=="monitor",o&&o.classList.toggle("is-quiet",x.view==="monitor"),We(x.view==="board"),Re(x.view==="worker"),Je(he(x)),xe(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id),!x.selected_id&&x.view==="board"&&Tn.load(),x.view==="worker"&&Ot.load(),x.view==="monitor"?on.load():on.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(Hn),Hn(fe.getState()),we(),Ze(),$t(),jt().finally(()=>{z=!0,bt()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,p=String(x.key||"").toLowerCase(),h=x.target,R=h&&h.tagName?String(h.tagName).toLowerCase():"",re=R==="input"||R==="textarea"||R==="select"||h&&typeof h.isContentEditable=="boolean"&&h.isContentEditable;C&&p==="n"&&(re||(x.preventDefault(),Tt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&vw(t)});export{vw as bootstrap,bw as readBootstrapConfig,hw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
