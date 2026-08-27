var U_=Object.create;var ia=Object.defineProperty;var W_=Object.getOwnPropertyDescriptor;var z_=Object.getOwnPropertyNames;var H_=Object.getPrototypeOf,G_=Object.prototype.hasOwnProperty;var K_=(e,t,n)=>t in e?ia(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var aa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var V_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of z_(t))!G_.call(e,o)&&o!==n&&ia(e,o,{get:()=>t[o],enumerable:!(r=W_(t,o))||r.enumerable});return e};var Y_=(e,t,n)=>(n=e!=null?U_(H_(e)):{},V_(t||!e||!e.__esModule?ia(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>K_(e,typeof t!="symbol"?t+"":t,n);var Mc=aa((Cw,Pc)=>{var jr=1e3,Br=jr*60,Ur=Br*60,xr=Ur*24,Q_=xr*7,J_=xr*365.25;Pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return em(e);if(n==="number"&&isFinite(e))return t.long?nm(e):tm(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function em(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*J_;case"weeks":case"week":case"w":return n*Q_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return n*Br;case"seconds":case"second":case"secs":case"sec":case"s":return n*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function tm(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function nm(e){var t=Math.abs(e);return t>=xr?Rs(e,t,xr,"day"):t>=Ur?Rs(e,t,Ur,"hour"):t>=Br?Rs(e,t,Br,"minute"):t>=jr?Rs(e,t,jr,"second"):e+" ms"}function Rs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var qc=aa((Rw,Nc)=>{function rm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Mc(),n.destroy=d,Object.keys(e).forEach(u=>{n[u]=e[u]}),n.names=[],n.skips=[],n.formatters={};function t(u){let m=0;for(let y=0;y<u.length;y++)m=(m<<5)-m+u.charCodeAt(y),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(u){let m,y=null,b,k;function D(...q){if(!D.enabled)return;let X=D,ie=Number(new Date),ee=ie-(m||ie);X.diff=ee,X.prev=m,X.curr=ie,m=ie,q[0]=n.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let B=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(W,Z)=>{if(W==="%%")return"%";B++;let V=n.formatters[Z];if(typeof V=="function"){let _e=q[B];W=V.call(X,_e),q.splice(B,1),B--}return W}),n.formatArgs.call(X,q),(X.log||n.log).apply(X,q)}return D.namespace=u,D.useColors=n.useColors(),D.color=n.selectColor(u),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(u)),k),set:q=>{y=q}}),typeof n.init=="function"&&n.init(D),D}function r(u,m){let y=n(this.namespace+(typeof m>"u"?":":m)+u);return y.log=this.log,y}function o(u){n.save(u),n.namespaces=u,n.names=[],n.skips=[];let m=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of m)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function s(u,m){let y=0,b=0,k=-1,D=0;for(;y<u.length;)if(b<m.length&&(m[b]===u[y]||m[b]==="*"))m[b]==="*"?(k=b,D=y,b++):(y++,b++);else if(k!==-1)b=k+1,D++,y=D;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let u=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),u}function l(u){for(let m of n.skips)if(s(u,m))return!1;for(let m of n.names)if(s(u,m))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Nc.exports=rm});var Fc=aa((vn,Os)=>{vn.formatArgs=sm;vn.save=im;vn.load=am;vn.useColors=om;vn.storage=lm();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function om(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function sm(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function im(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function am(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function lm(){try{return localStorage}catch{}}Os.exports=qc()(vn);var{formatters:cm}=Os.exports;cm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var mo=globalThis,$s=mo.trustedTypes,yc=$s?$s.createPolicy("lit-html",{createHTML:e=>e}):void 0,ca="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,da="?"+Qn,X_=`<${da}>`,vr=document,go=()=>vr.createComment(""),bo=e=>e===null||typeof e!="object"&&typeof e!="function",ua=Array.isArray,Ac=e=>ua(e)||typeof e?.[Symbol.iterator]=="function",la=`[ 	
\f\r]`,_o=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vc=/-->/g,wc=/>/g,hr=RegExp(`>|${la}(?:([^\\s"'>=/]+)(${la}*=${la}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kc=/'/g,$c=/"/g,Sc=/^(?:script|style|textarea|title)$/i,pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=pa(1),yo=pa(2),kw=pa(3),On=Symbol.for("lit-noChange"),Wt=Symbol.for("lit-nothing"),xc=new WeakMap,yr=vr.createTreeWalker(vr,129);function Ec(e,t){if(!ua(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yc!==void 0?yc.createHTML(t):t}var Tc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=_o;for(let l=0;l<n;l++){let a=e[l],d,u,m=-1,y=0;for(;y<a.length&&(i.lastIndex=y,u=i.exec(a),u!==null);)y=i.lastIndex,i===_o?u[1]==="!--"?i=vc:u[1]!==void 0?i=wc:u[2]!==void 0?(Sc.test(u[2])&&(o=RegExp("</"+u[2],"g")),i=hr):u[3]!==void 0&&(i=hr):i===hr?u[0]===">"?(i=o??_o,m=-1):u[1]===void 0?m=-2:(m=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?hr:u[3]==='"'?$c:kc):i===$c||i===kc?i=hr:i===vc||i===wc?i=_o:(i=hr,o=void 0);let b=i===hr&&e[l+1].startsWith("/>")?" ":"";s+=i===_o?a+X_:m>=0?(r.push(d),a.slice(0,m)+ca+a.slice(m)+Qn+b):a+Qn+(m===-2?l:b)}return[Ec(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ho=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[d,u]=Tc(t,n);if(this.el=e.createElement(d,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=yr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let m of o.getAttributeNames())if(m.endsWith(ca)){let y=u[i++],b=o.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:s,name:k[2],strings:b,ctor:k[1]==="."?As:k[1]==="?"?Ss:k[1]==="@"?Es:kr}),o.removeAttribute(m)}else m.startsWith(Qn)&&(a.push({type:6,index:s}),o.removeAttribute(m));if(Sc.test(o.tagName)){let m=o.textContent.split(Qn),y=m.length-1;if(y>0){o.textContent=$s?$s.emptyScript:"";for(let b=0;b<y;b++)o.append(m[b],go()),yr.nextNode(),a.push({type:2,index:++s});o.append(m[y],go())}}}else if(o.nodeType===8)if(o.data===da)a.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(Qn,m+1))!==-1;)a.push({type:7,index:s}),m+=Qn.length-1}s++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===On)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=bo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=wr(e,o._$AS(e,t.values),o,r)),t}var xs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=o;let s=yr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new qr(s,s.nextSibling,this,t):a.type===1?d=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(d=new Ts(s,this,t)),this._$AV.push(d),a=r[++l]}i!==a?.index&&(s=yr.nextNode(),i++)}return yr.currentNode=vr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Wt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),bo(t)?t===Wt||t==null||t===""?(this._$AH!==Wt&&this._$AR(),this._$AH=Wt):t!==this._$AH&&t!==On&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Wt&&bo(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ho.createElement(Ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new xs(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=xc.get(t.strings);return n===void 0&&xc.set(t.strings,n=new ho(t)),n}k(t){ua(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(go()),this.O(go()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Wt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Wt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=wr(this,t,n,0),i=!bo(t)||t!==this._$AH&&t!==On,i&&(this._$AH=t);else{let l=t,a,d;for(t=s[0],a=0;a<s.length-1;a++)d=wr(this,l[r+a],n,a),d===On&&(d=this._$AH[a]),i||(i=!bo(d)||d!==this._$AH[a]),d===Wt?t=Wt:t!==Wt&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}i&&!o&&this.j(t)}j(t){t===Wt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Wt?void 0:t}},Ss=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Wt)}},Es=class extends kr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Wt)===On)return;let r=this._$AH,o=t===Wt&&r!==Wt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Wt&&(r===Wt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ts=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Cc={M:ca,P:Qn,A:da,C:1,L:Tc,R:xs,D:Ac,V:wr,I:qr,H:kr,N:Ss,U:Es,B:As,F:Ts},Z_=mo.litHtmlPolyfillSupport;Z_?.(ho,qr),(mo.litHtmlVersions??(mo.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new qr(t.insertBefore(go(),s),s,void 0,n??{})}return o._$AI(e),o};var Cs="today",Rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Fr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Gn(e){return e==="today"?"today":"7d"}function fa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Dc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var jc=Y_(Fc(),1);function qt(e){return(0,jc.default)(`beads-ui:${e}`)}function dm(e){let n=Bc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Bc(e){return typeof e=="string"?e.trim():""}function um(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var pm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Wr(e){let t=dm(e),n=Bc(um(e).spec_review),r=pm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function vo(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Kc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Vc(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Yc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Pn(e.created_at),s=Pn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Xc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Ls=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function fm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ls,e)}function ma(e){if(!e||typeof e!="object")return!1;let t=e;return fm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Wr(e).evidence==="published"?1:0;case"created":return Uc(e.created_at);case"updated":return Uc(e.updated_at);default:return null}}function zc(e,t,n){let r=Wc(e,n.key),o=Wc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Zc(e){let t=Array.isArray(e)?e.filter(ma):[];return(n,r)=>{for(let l of t){let a=zc(n,r,l);if(a!==0)return a}let o=zc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var _m=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Hc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Gc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=_m.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Qc(e,t){let n=Hc(e),r=Hc(t);if(n!==r)return n<r?-1:1;let o=Gc(e),s=Gc(t);if(o!==s)return o<s?-1:1;let i=Pn(e&&e.created_at),l=Pn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var _a=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function Jc(e){return(t,n)=>{let r=zr(t,e),o=zr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ga(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:zr(l,n)-_a};if(!l)return{rank:zr(i,n)+_a};let a=zr(i,n),d=zr(l,n),u=(a+d)/2;return a<u&&u<d?{rank:u}:{renormalize:r.map((m,y)=>({bead_id:m.id,rank:y*_a}))}}function ba(e,t={}){let n=qt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||vo;function d(){for(let y of Array.from(i))try{y()}catch{}}function u(){o=Array.from(r.values()).sort(a)}function m(y){if(l||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=s&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=s)return;r.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let D of k)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);u(),s=b,d();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let D=r.get(k.id);if(!D)r.set(k.id,k);else{let q=Number.isFinite(D.updated_at)?D.updated_at:0,X=Number.isFinite(k.updated_at)?k.updated_at:0;if(q<=X){for(let ie of Object.keys(D))ie in k||delete D[ie];for(let[ie,ee]of Object.entries(k))D[ie]=ee}}u()}s=b,d()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(r.delete(k),u()),s=b,d()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:m,snapshot(){return o},size(){return r.size},getById(y){return r.get(y)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function Is(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ed(e){let t=qt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=r.get(l);if(!d||d.size===0)return;let u=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],y=Array.isArray(a.removed)?a.removed:[];for(let b of Array.from(d)){let k=n.get(b);if(!k)continue;let D=k.itemsById;for(let q of u)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of m)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of y)typeof q=="string"&&q.length>0&&D.delete(q)}}async function s(l,a){let d=Is(a);if(t("subscribe %s key=%s",l,d),!n.has(l))n.set(l,{key:d,itemsById:new Map});else{let m=n.get(l);if(m&&m.key!==d){let y=r.get(m.key);y&&(y.delete(l),y.size===0&&r.delete(m.key)),n.set(l,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let u=r.get(d);u&&u.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let y=n.get(l)||null;if(y){let b=r.get(y.key);b&&(b.delete(l),b.size===0&&r.delete(y.key))}throw n.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=n.get(l)||null;if(m){let y=r.get(m.key);y&&(y.delete(l),y.size===0&&r.delete(m.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Is,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=n.get(l);return d?d.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),d={};if(!a)return d;for(let u of a.itemsById.keys())d[u]=!0;return d}}}}function td(){let e=qt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,d,u){let m=d?Is(d):"",y=n.get(a)||"",b=t.has(a);if(e("register %s key=%s (prev=%s)",a,m,y),b&&y&&m&&y!==m){let k=t.get(a);if(k)try{k.dispose()}catch{}let D=o.get(a);if(D){try{D()}catch{}o.delete(a)}let q=ba(a,u);t.set(a,q);let X=q.subscribe(()=>s());o.set(a,X)}else if(!b){let k=ba(a,u);t.set(a,k);let D=k.subscribe(()=>s());o.set(a,D)}return n.set(a,m),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let u=o.get(a);if(u){try{u()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function nd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function rd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ha(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function mm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function gm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function od(e){let t=qt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):mm(r),i=gm(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=ha(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?ha(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var bm=Object.freeze({workspace_config:{default_workspace:null}});function sd(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:bm.workspace_config.default_workspace}}}function id(e={}){let t=qt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:sd(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?sd(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((d,u)=>d!==n.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,u)=>d===n.worker.show_closed_children[u])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ad(e){let t=qt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),s()}function a(d){return async(m,y)=>{let b=o++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let D=!1,q=()=>{D||(D=!0,r.delete(b),l())},X=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),q())},3e4);try{let ie=await d(m,y),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,ee),ie}catch(ie){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,ee,ie),ie}finally{clearTimeout(X),q()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([u,m])=>({id:u,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ds(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Xc),a;switch(l){case"created_desc":return a.sort(vo),a;case"created_asc":return a.sort(Kc),a;case"updated_desc":return a.sort(Vc),a;case"priority":return a.sort(Yc),a;case"manual":default:{let d=n();return d?a.sort(Jc(d)):a.sort(vo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Mn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function on(e){let t=Mn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Mn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ld(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Mn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ms(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ps(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ns(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=ld(n);return{total:n.length,count:r,current:o,children:n}}function cd(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},u=r(ga(l,a,d.order),i);o(d,u);let m=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(m&&m.conflict){let y={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(y);let b=r(ga(l,a,y.order),i);o(y,b);let k=await t("ui-order-set",{expected_revision:y.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:s}}function dd(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function wo(e,t){let n=dd(e),r=dd(t);return n.length===0||r.length===0?!1:n!==r}function qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ya(e,t){return!t||typeof e!="string"||e.length===0||qs(t.visible_labels).includes(e)?!0:qs(t.hidden_labels).includes(e)?!1:!qs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ud(e,t){return qs(e).filter(n=>ya(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function hm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ym(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function vm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${hm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Fs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Qc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?ym(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,d)=>vm(a,d+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var wm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},km={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $m(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function _d(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function xm(e){if(!e||e.fill==="none"||!e.approval_state)return _d(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Am(e,t,n,r){let o=wm[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=km[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let d=s==="none"?"lbl":`lbl l-${o} on`,u=n?`color: var(--stage-${o}-on)`:"",m=fd[e]||e,y=r?md(t):null;if(!y)return c`
      <div class="seg">
        <div class=${a} style=${u}>${l}</div>
        <div class=${d}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,y,e)}}
    >
      <div class=${a} style=${u}>${l}</div>
      <div class=${d}>${m}</div>
    </button>
  `}function md(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function js(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=pd[e.route]||pd.spec_backed,s=e.stages,i=$m(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(d=>`${fd[d]||d} ${d==="plan"?xm(s[d]||{}):_d(s[d]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(d=>md(s[d]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(d=>Am(d,s[d]||{},d===i,r))}
    </div>
  `}function Sm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gd=2;function bd(e){let t=e.slice(0,gd).join(", "),n=e.length-gd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Em(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(wo(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${bd(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${bd(s)}</span
      >`),n}function va(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Bs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Bs(e)}@${e.sha}`}function Us(e,t){if(!e)return null;let n=va(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=va(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${d}`}}function hd(e,t){let n=Us(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Tm(e){if(!e)return null;let t=va(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Cm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&cr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=hd(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?Bs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of ud(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&cr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")&&o.push(...Em(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Rm(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Om(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Fs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Rm(e),empty_label:"children \uC5C6\uC74C",childChips:wa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function wa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Us(t,n)?c`<span class="board-card__roll-child-chips">
    ${hd(t,n)}
    ${Tm(n)}
  </span>`:null}function Ws(e,t){let n=Sm(e.priority);return c`
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
      ${Cm(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?js(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Om(e,t)}
    </article>
  `}function Hr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Rc.map(s=>c`<option
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
        ${e.items.map(s=>Ws(s,t))}
      </div>
    </section>
  `}function yd(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ws(r,t))}
        </div>
      </div>
    </dialog>
  `}var Lm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Im=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Dm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Pm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function vd(e,t,n){return c`
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
        ${Lm.map(r=>c`<option
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
        ${Im.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Pm(e,t,n)}
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
        ${Dm.map(r=>c`<option
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
  `}var Mm=200,Nm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},qm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),wd="beads-ui.board.sort",kd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Fm(){try{let e=window.localStorage.getItem(wd);if(e&&kd.has(e))return e}catch{}return"created_desc"}function $d(e,t){let n=qt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,m=t.openDoc,y=t.closedRange||Cs,b=o?Ds(o,i):null,k=cd({transport:s,uiOrderStore:i}),D=[],q=[],X=[],ie=[],ee=[],B=[],P=!1,W=0,Z=Fm(),V=new Map,_e=new Map,F=new Map,J=new Set,te={search:"",priority:"",type:"",labels:[]},le=!1,Pe=null;function Ge(S){return String(S.status||"open")==="open"}function ue(S){let G=String(S.status||"open");return G==="open"||G==="blocked"}function Y(S){let G=te.search.trim().toLowerCase(),Re=te.priority,He=te.type,Ae=te.labels;return S.filter(lt=>{if(G){let st=String(lt.id||"").toLowerCase(),he=String(lt.title||"").toLowerCase();if(!st.includes(G)&&!he.includes(G))return!1}if(Re!==""&&String(lt.priority)!==Re||He!==""&&String(lt.issue_type||"")!==He)return!1;if(Ae.length>0){let st=Array.isArray(lt.labels)?lt.labels:[];if(!Ae.some(he=>st.includes(he)))return!1}return!0})}function Te(){let S=new Set;for(let G of[D,q,X,ie,ee,B])for(let Re of G){let He=Array.isArray(Re.labels)?Re.labels:[];for(let Ae of He)typeof Ae=="string"&&Ae.length>0&&S.add(Ae)}return Array.from(S).sort()}function xe(){return te.search.trim()!==""||te.priority!==""||te.type!==""||te.labels.length>0}function E(){try{if(b){let S=b.selectBoardColumn("tab:board:in-progress","in_progress",Z),G=b.selectBoardColumn("tab:board:blocked","blocked",Z).filter(ue),Re=new Set(S.map(j=>j.id)),He=b.selectBoardColumn("tab:board:ready","ready",Z).filter(j=>Ge(j)&&!Re.has(j.id)),Ae=b.selectBoardColumn("tab:board:resolved","resolved",Z),lt=b.selectBoardColumn("tab:board:deferred","deferred",Z),st=b.selectBoardColumn("tab:board:closed","closed").slice(0,Mm),he=[...G,...He,...S,...Ae,...st];se(he);let Je=new Set;for(let j of he)j&&j.id&&!Ps(j)&&Je.add(j.id);let M=!xe();D=M?ko(G,Je):G,q=M?ko(He,Je):He,X=M?ko(S,Je):S,ie=M?ko(Ae,Je):Ae,ee=lt,W=lt.length,B=M?ko(st,Je):st,V=new Map;for(let j of D)V.set(j.id,"open");for(let j of q)V.set(j.id,"open");for(let j of X)V.set(j.id,"in_progress");for(let j of ie)V.set(j.id,"resolved");for(let j of ee)V.set(j.id,"deferred");for(let j of B)V.set(j.id,"closed");_e=new Map;for(let j of D)_e.set(j.id,"blocked-col");for(let j of q)_e.set(j.id,"ready-col");for(let j of X)_e.set(j.id,"in-progress-col");for(let j of ie)_e.set(j.id,"resolved-col");for(let j of B)_e.set(j.id,"closed-col")}_t()}catch{D=[],q=[],X=[],ie=[],ee=[],B=[],F=new Map,_t()}}function se(S){F=Ms(S)}function $e(S){return Ns(F,S)}function be(S){return!J.has(S)}function ve(S,G){S.preventDefault(),S.stopPropagation(),J.has(G)?J.delete(G):J.add(G),_t()}function we(S,G){S.preventDefault(),S.stopPropagation(),r(G)}function Oe(S,G){S.preventDefault(),S.stopPropagation(),r(G)}function ze(S,G){Pe||r(G)}function bt(S,G){S.preventDefault(),S.stopPropagation(),jm(G).then(Re=>{Re&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function Ct(S,G){Pe=G,S.dataTransfer&&(S.dataTransfer.setData("text/plain",G),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function ot(S){S.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{Pe=null},0)}function T(S){let G=String(S.target.value||"");!G||G===y||(y=G,d&&d(G),_t())}function pe(){return l?l.get():null}function Le(S){let G=a?a.get():null,Re=G?G.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let He=Re[S];return!He||typeof He!="object"||Array.isArray(He)?null:He}let je={onCardClick:ze,onCopyId:bt,onDragStart:Ct,onDragEnd:ot,onClosedRangeChange:T,rollupFor:$e,isExpanded:be,onRollupToggle:ve,onChildClick:we,onFromChipClick:Oe,onOpenDoc:m?(S,G)=>m(G):void 0,cleanupFailureFor:Le,get policy(){return pe()}};function Me(S,G){Pe||(De(),r(G))}function et(S,G){S.preventDefault(),S.stopPropagation(),De(),r(G)}let ht={...je,onCardClick:Me,onChildClick:et,onFromChipClick:et,onOpenDoc:m?(S,G)=>{De(),m(G)}:void 0,get policy(){return pe()}};function Ve(S){let G=S.target,Re=e.querySelector(".board-filter__labels");G&&Re&&Re.contains(G)||Ie()}function z(S){S.key==="Escape"&&Ie()}function ne(){le||(le=!0,document.addEventListener("mousedown",Ve),document.addEventListener("keydown",z),_t())}function Ie(){le&&(le=!1,document.removeEventListener("mousedown",Ve),document.removeEventListener("keydown",z),_t())}function ct(S){S.key==="Escape"&&De()}function at(){P||(P=!0,document.addEventListener("keydown",ct),_t())}function De(){P&&(P=!1,document.removeEventListener("keydown",ct),_t())}let Ue={onClose:De,onOverlayClick(S){S.target===S.currentTarget&&De()}},dt={onSearchInput(S){te.search=String(S.target.value||""),E()},onPriorityChange(S){te.priority=String(S.target.value||""),E()},onTypeChange(S){te.type=String(S.target.value||""),E()},onSortChange(S){let G=String(S.target.value||"");if(!(!kd.has(G)||G===Z)){Z=G;try{window.localStorage.setItem(wd,G)}catch{}E()}},onDeferredToggle(){P?De():at()},onLabelMenuToggle(){le?Ie():ne()},onLabelToggle(S){let G=te.labels.indexOf(S);G===-1?te.labels.push(S):te.labels.splice(G,1),E()},onLabelClear(){te.labels.length!==0&&(te.labels=[],E())},onNewIssue(){u&&u()}};function tt(){return c`
      <div class="board-view">
        ${vd(te,dt,{sort_mode:Z,deferred_popup_open:P,deferred_count:W,label_options:Te(),label_menu_open:le})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:Y(D)},je)}
          ${Hr({title:"Ready",id:"ready-col",items:Y(q)},je)}
          ${Hr({title:"In progress",id:"in-progress-col",items:Y(X)},je)}
          ${Hr({title:"Resolved",id:"resolved-col",items:Y(ie)},je)}
          ${Hr({title:"Closed",id:"closed-col",items:Y(B),is_closed:!0,closed_range:y},je)}
        </div>
        ${P?yd({items:Y(ee),count:W},ht,Ue):""}
      </div>
    `}function _t(){rt(tt(),e),Pt()}function Pt(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of G)Array.from(Re.querySelectorAll(".board-card")).forEach((Ae,lt)=>{Ae.tabIndex=lt===0?0:-1})}catch{}}async function Ft(S,G){if(!s){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:S,status:G}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(S){switch(S){case"blocked-col":return D;case"ready-col":return q;case"in-progress-col":return X;case"resolved-col":return ie;default:return[]}}function Mt(S,G,Re){if(!s||!i)return;let He=Ht(S),Ae=He.find(M=>M.id===G);if(!Ae)return;let lt=He.filter(M=>M.id!==G),st=Re.closest?Re.closest(".board-card"):null,he=lt.length;if(st){let M=st.getAttribute("data-issue-id");if(M===G)return;let j=lt.findIndex(ye=>ye.id===M);j>=0&&(he=j)}let Je=lt.slice();Je.splice(he,0,Ae),k.applyReorder(G,Je,he)}function Nt(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let wt=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Re=S.target.closest(".board-column");Re&&Re!==wt&&(wt&&wt.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),wt=Re)}),e.addEventListener("dragleave",S=>{let G=S.relatedTarget;(!G||!e.contains(G))&&wt&&(wt.classList.remove("board-column--drag-over"),wt=null)}),e.addEventListener("drop",S=>{S.preventDefault(),wt&&(wt.classList.remove("board-column--drag-over"),wt=null);let G=S.target,Re=G.closest(".board-column");if(!Re)return;let He=S.dataTransfer?.getData("text/plain")||"";if(!He)return;let Ae=Re.id,lt=_e.get(He);if(lt&&lt===Ae){if(qm.has(Ae)){if(Z!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(Ae,He,G)}return}let st=Nm[Ae];if(!st){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(He)!==st&&Ft(He,st)}),e.addEventListener("keydown",S=>{let G=S.target;if(!(G instanceof HTMLElement))return;let Re=String(G.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||G.isContentEditable===!0)return;let He=G.closest(".board-card");if(!He)return;let Ae=String(S.key||"");if(Ae==="Enter"||Ae===" "){S.preventDefault();let Je=He.getAttribute("data-issue-id");Je&&r(Je);return}if(Ae!=="ArrowUp"&&Ae!=="ArrowDown"&&Ae!=="ArrowLeft"&&Ae!=="ArrowRight")return;S.preventDefault();let lt=He.closest(".board-column");if(!lt)return;let st=Array.from(lt.querySelectorAll(".board-card")),he=st.indexOf(He);if(Ae==="ArrowDown"&&he<st.length-1){We(He,st[he+1]);return}if(Ae==="ArrowUp"&&he>0){We(He,st[he-1]);return}if(Ae==="ArrowLeft"||Ae==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),M=Je.indexOf(lt),j=Ae==="ArrowRight"?1:-1,ye=M+j;for(;ye>=0&&ye<Je.length;){let Xe=Je[ye].querySelector(".board-card");if(Xe){We(He,Xe);return}ye+=j}}});function We(S,G){try{S.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let O=null;b&&b.subscribe&&(O=b.subscribe(()=>{try{E()}catch{}}));let Q=null;l&&l.subscribe&&(Q=l.subscribe(()=>{try{E()}catch{}}));let me=null;return a&&a.subscribe&&(me=a.subscribe(()=>{_t()})),{async load(){n("load"),E()},clear(){Ie(),De(),O&&(O(),O=null),Q&&(Q(),Q=null),me&&(me(),me=null),e.replaceChildren(),D=[],q=[],X=[],ie=[],ee=[],B=[],V=new Map,_e=new Map}}}function ko(e,t){return e.filter(n=>{let r=Ps(n);return!(r&&t.has(r))})}async function jm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var kn=e=>e??Wt;async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function $o(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Bm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let d=u=>{typeof n.close=="function"&&n.close(),n.remove(),a(u)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),s.addEventListener("click",()=>d(null)),n.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Bm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Um=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],xd={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Wm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function It(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Sd(e,t,n){let r=zt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=zt(n[e]);return o===null?null:{value:o,source:"global"}}function xo(e,t,n,r){return Sd(e,t,n)||{value:r,source:"base"}}function ka(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&tn(o?.[t])){let i=zt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&tn(o)){for(let i of Object.values(o))if(tn(i)){let l=zt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return zt(r?.runners?.[s]?.models?.[e]?.id)||e}function zm(e,t){return zt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return It(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return It(e,t,r,e,"explicit")}function Ed(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];tn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(tn(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Hm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(tn(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Gm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Hm(t,n)){let s=Ed(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function $a(e){return It(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ad(e,t,n){let r=Sd(e,t,n);return r?Kr(r.value,r.source):It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function $n(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&tn(r.session)?r.session:null,s=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,i=tn(e.runner_catalog)?e.runner_catalog:null,l=zt(n.quick_fix_impl_model),a=Gm(l,o,i),d={};if(o){let u=xo("workflow_mode",t,n,zt(o.workflow_mode_default));d.workflow_mode=u.source==="base"?It(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):Kr(u.value,u.source);for(let ee of["spec_review","plan_review","impl_review"]){let B=`${ee}_model`,P=zt(ee==="plan_review"?u.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),W=xo(B,t,n,P);if(W.value===null)d[B]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!tn(o.review?.reviewers?.[W.value]))d[B]=$a(It(W.value,W.source,"",null,"explicit"));else{let Z=zm(W.value,o);d[B]=It(W.value,W.source,Gr(Z),Z,W.source==="base"?"default":"explicit")}}for(let[ee,B]of Object.entries(xd)){let P=d[B].value;if(P==="self"||P==="skip"){d[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=zt(o.review?.reviewers?.[P||""]?.effort),Z=xo(ee,t,n,W);d[ee]=Z.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(Z.value,Z.source,Z.value,Z.value,Z.source==="base"?"default":"explicit")}let m=tn(o.implementation?.default)?o.implementation.default:{},y=zt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),k=tn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},D=b&&tn(k[y])?k[y]:{};for(let ee of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=xo(ee,t,n,ee==="impl_dispatch"?zt(D.dispatch)||zt(m.dispatch):zt(m[ee.replace("impl_","")]));d[ee]=B.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let q=zt(t.impl_runtime),X=q==="inherit"?zt(e.controller_runtime):q,ie=y==="quick_fix"&&zt(t.impl_dispatch)===null&&a.runtime!==null&&(q===null||X===a.runtime);if(ie){let ee=a.runtime,B=l;d.impl_dispatch=It("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),q===null&&(d.impl_runtime=It(ee,"global",`${ee} (\uC720\uB3C4)`,ee,"explicit")),zt(t.impl_model)===null&&(d.impl_model=It(B,"global",B,B,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let ee of["impl_runtime","impl_model","impl_effort","impl_speed"])d[ee]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!ie&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let ee=d.impl_runtime.value==="inherit"?zt(e.controller_runtime):d.impl_runtime.value,B=ee?Ed(ee,o,i):[];if(d.impl_model.value!=="auto"&&B.length>0&&!B.includes(d.impl_model.value))d.impl_model=$a(d.impl_model);else{let P=ka(d.impl_model.value,ee,o,i);d.impl_model.display=Gr(P),d.impl_model.full_value=P}}if(d.impl_effort.value==="auto"){let ee=zt(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),B=ee?zt(o.implementation?.effort_by_transport?.[ee]?.auto):null;B&&!Wm.has(B)?(d.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=B,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",d.impl_speed.source))}}else for(let u of Um.filter(m=>!m.startsWith("orchestration_")))d[u]=Ad(u,t,n);if(!o){for(let[u,m]of Object.entries(xd))(d[m].value==="self"||d[m].value==="skip")&&(d[u]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])d[u]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){d[u]=Ad(u,t,n);continue}let m=u.replace("orchestration_",""),y=zt(s[m]),b=xo(u,t,n,y);if(u==="orchestration_effort"&&b.source==="base"){d[u]=It(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){d[u]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let k=b.source==="base"?zt(s.model_id)||b.value:ka(b.value,null,o,i);d[u]=It(b.value,b.source,Gr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){d[u]=b.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}d[u]=Kr(b.value,b.source)}if(o)if(l===null){let u=d.orchestration_model.full_value;d.quick_fix_impl_model=It(null,"base",u===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(u)})`,null,"default")}else if(a.runtime!==null){let u=ka(l,a.runtime,o,i);d.quick_fix_impl_model=It(l,"global",Gr(u),u,"explicit")}else a.offered?d.quick_fix_impl_model=$a(It(l,"global","",null,"explicit")):d.quick_fix_impl_model=Kr(l,"global");return d}function Km(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function zs(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=m=>{let y={...r,...m};return $n({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],d=zt(s[e.key]),u=[...e.choices];return d!==null&&!u.includes(d)&&u.unshift(d),{unset_label:Km(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:u.map(m=>{let y=o({...s,[e.key]:m})[e.key];return{value:m,label:y.display,full_value:y.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,d=m=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(m))},u=()=>d(r.value.trim());s.addEventListener("click",u),i.addEventListener("click",()=>d(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),u())}),t.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function xa(e){return`session:${e.provider}:${e.session_id}`}function Ao(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Vm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:xa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Ao(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Vm(e,n)}}}var Aa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ym="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Td="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Vn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Xr=[...Vn,"reasoning_output_tokens"],Xm={codex:["implementation","review-consult"],claude:["subagent"]};function Sa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Vn.some(t=>Number.isFinite(e[t]))}function Zm(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))}function Ea(e){let t=0;for(let n of Vn)t+=Zt(e?.[n]);return t}function Qm(e){return!e||typeof e!="object"?!1:Vn.some(t=>Number.isFinite(e[t]))}function Cd(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Jm(e){let t={};for(let n of Xr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Rd(e){let t={};for(let n of Xr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Od(e,t){return Sa(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):Ea(t)}function eg(e){return e==="claude"?"Claude":"Codex"}function tg(e){return`\u03C4 ${Id(e)}`}function ng(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(Sa(n)||r>0&&!Zm(n)){let d=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Ym];return t.replayed&&d.push(Aa),d.join(`
`)}let o=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Td} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Td}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Aa),a.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${eg(n)} ${tg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:ng(n,r)})}return t}function Gs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Zt(l.total_only_subtotal)+Zt(i.total_only_subtotal));for(let a of Xr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Zt(l.breakdown[a])+Zt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ta(e){return!e||typeof e!="object"?null:Ln({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function rg(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:Jm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hs(e,t,n){e.subtotal+=t.subtotal,Sa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Xr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ld(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Id(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Zr(e){return Qm(e)?`\u03C4 ${Id(Ea(e))}`:null}function tr(e){let t=Zr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function So(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ea(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Aa),n.join(`
`)}function Ln(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Cd(a)){let u=rg(l.runner),m=Rd(a),y={provider:u,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Od(u,m)};m.replayed===!0&&(y.replayed=!0),typeof l.model=="string"&&(y.model=l.model),typeof l.session_id=="string"&&(y.session_id=l.session_id),Hs(n[u],y,!0),Hs(r.orchestrator[u],y,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let u of d){let m=u&&u.provider==="claude"?"claude":"codex";if(!u||u.provider!=="codex"&&u.provider!=="claude"||!Xm[m].includes(u.role)||!Cd(u.usage))continue;let y=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!y||o.has(y))continue;o.add(y);let b=Rd(u.usage),k={provider:m,role:u.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Od(m,b)};k.receipt_id=y,typeof u.agent_type=="string"&&(k.agent_type=u.agent_type),typeof u.agent_id=="string"&&(k.agent_id=u.agent_id),typeof u.model=="string"&&(k.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&(k.effort=u.effort),typeof u.session_id=="string"?k.session_id=u.session_id:typeof u.thread_id=="string"&&(k.session_id=u.thread_id),typeof u.turn_id=="string"&&(k.turn_id=u.turn_id),(typeof u.completed_at=="string"||typeof u.completed_at=="number"&&Number.isFinite(u.completed_at))&&(k.completed_at=u.completed_at),b.replayed===!0&&(k.replayed=!0),Hs(n[m],k,!1),Hs(r[k.role][m],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let d=Ld(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(d.total_cost_usd=a.outer_cost),s[l]=d}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let d of["claude","codex"]){let u=r[l][d];u.legs.length>0&&(a[d]={...Ld(u,!0),legs:u.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}function Dd(e,t){let n=new Map(e.map((a,d)=>[a,d])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(d=>{if(o.has(d))return!1;for(let u of r.get(d))if(!o.has(u))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,d)=>[a,d]));for(let a of s){let d=null;for(let u of r.get(a)){let m=Number(n.get(a))<Number(n.get(u)),y=Number(l.get(a))>Number(l.get(u));m&&y&&(d===null||Number(l.get(u))>Number(l.get(d)))&&(d=u)}d!==null&&i.push({bead_id:a,after:d})}return{order:s,corrections:i,cycle:!1}}var og="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Vs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",sg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ig="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Eo(e,t){return`${e}\0${t}`}function ag(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function lg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ro(e,t){let n=e.entries,r=n.map(m=>m.bead_id),o=ag(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[m,y]of o)for(let b of y)s.push({blocker:b,blockee:m});let i=lg(e,t),l=new Map(r.map((m,y)=>[m,y])),a=r.slice(0,i).filter(m=>o.get(m).some(y=>Number(l.get(y))>Number(l.get(m)))),d=Dd(r.slice(i),s);if(d.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let u=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...d.order.map(m=>u.get(m))],corrections:d.corrections,cycle:!1,held:!1,mismatched:a}}function Pd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ro(n,t)}function cg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function dg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ug(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ca(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function pg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Eo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Eo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Eo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function fg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function _g(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ks(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ra(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Oo(e){let t=ug(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=d=>{let u=e.owner_of.get(d);return typeof u!="string"||u.length===0?(o.refusal=dg(d),null):u};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(d,u,m)=>{if(o.refusal!==null||d===u)return;let y=t.get(d)||[];if(y.includes(u))return;let b=s(d);if(b!==null){if(Ca(t,u,d)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${d}\uAC00 \uC774\uBBF8 ${u}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(d,[...y,u]),m!==void 0&&r.add(Eo(d,u)),n.push({type:"dep-add",a:d,b:u,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(d,u)=>{if(o.refusal!==null||d===u)return;let m=t.get(d)||[];if(!m.includes(u))return;let y=s(d);y!==null&&(t.set(d,m.filter(b=>b!==u)),n.push({type:"dep-remove",a:d,b:u,root_dir:y}))},laneCreated:(d,u)=>r.has(Eo(d,u))}}function Lo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=pg(e.dep_ops,t.blocked_by_map),i=s.filter(u=>u.type==="dep-remove"),l=s.filter(u=>u.type==="dep-add"),a=o.disarm_ops??[],d=o.lane_id===void 0||o.correction===void 0?void 0:cg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...d===void 0?{}:{correction:d}}}function Md(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function To(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Nd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function qd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Ks(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Co(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ys(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Oa(e,t,n){let r=Oo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),d=e.kind==="chain"?e.lane_id??a:void 0,u=d===void 0?void 0:n.cross_lanes.get(d);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:og};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:sg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ra(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&u===void 0)return{refused:Qr};let m=()=>{if(u===void 0||u.status!=="confirmed")return;let k=u.entries.findIndex(ee=>ee.bead_id===e.bead_id);if(k<0)return;let D=k>0?u.entries[k-1]:null,q=k+1<u.entries.length?u.entries[k+1]:null,X=To(u,k),ie=q!==null&&To(u,k+1);X&&D!==null&&r.removeDep(e.bead_id,D.bead_id),ie&&q!==null&&r.removeDep(q.bead_id,e.bead_id),(X||ie)&&D!==null&&q!==null&&r.addDep(q.bead_id,D.bead_id,d)},y=(k,D)=>{let q=n.cross_lanes.get(k),X=q.entries.findIndex(F=>F.bead_id===e.bead_id),ie=q.entries.filter(F=>F.bead_id!==e.bead_id),ee=Math.max(0,Math.min(ie.length,X>=0&&D>X?D-1:D)),B=-1;if(ie.forEach((F,J)=>{n.fixed_members.has(F.bead_id)&&(B=J)}),ee<=B){r.state.refusal=ig;return}let P=X>=0?q.entries[X]:u?.entries.find(F=>F.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Ro({status:q.status,entries:[...ie.slice(0,ee),P,...ie.slice(ee)]},n);let W=l.entries;if(Ys(W,q.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Co(W)}}),q.status!=="confirmed")return;let Z=W.findIndex(F=>F.bead_id===e.bead_id),V=Z>0?W[Z-1].bead_id:null,_e=Z+1<W.length?W[Z+1].bead_id:null;if(V===null){_e!==null&&r.addDep(_e,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),_e!==null&&(r.graph.get(_e)||[]).includes(V)){let F=q.entries.findIndex(J=>J.bead_id===_e);(r.laneCreated(_e,V)||F>0&&q.entries[F-1].bead_id===V&&To(q,F))&&r.removeDep(_e,V),r.addDep(_e,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),u!==void 0&&(t.kind!=="chain"||t.lane_id!==d)&&(i.push(...Nd(n,u,d,u.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:d,entries:Co(u.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=fg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Ks(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let D=n.parallel_rows,q=D[Math.max(0,Math.min(D.length,t.marker_index))];if(!(!!q&&q.bead_id===e.bead_id)&&_g(n,e.root_dir)&&b!==void 0){let ie=b>k?k:k-1;ie>=0&&ie!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(Ks(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(Ks(e.bead_id,e.root_dir,t.index,t.lane_id));return Lo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ro(n,t);if(r.held)return{refused:Vs};let o=r.entries,s=Oo(t),i=[];Md(s,o,e),s.state.refusal===null&&qd(s,t,o,i);let l=Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Lo(s,t,l,i,{lane_id:e,correction:r})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries,s=Oo(t),i=[];Md(s,o,e),s.state.refusal===null&&qd(s,t,o,i);let l=Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return Lo(s,t,l,i,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries;return Lo(Oo(t),t,Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}],[],{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Oo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)To(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Lo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Nd(t,n,e,n.entries)})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;To(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ra(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function zd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Hd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function La(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ra(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Gd={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Kd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Vd(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let u=t.get(i.bead_id),m=typeof u=="number"&&u>0&&typeof i.finished_at=="number"&&u>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=s.get(i.bead_id);if(d){let u=Gd[d.run_state],m=Gd[l];if(u>m||u===m&&(d.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Xs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Da=[...Xs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Zs=[...Xs,...nr],mg=Da.filter(e=>Zs.includes(e)),Yd=["delegated","main"],Qs=["inherit","claude","codex"],Io=["default","fast"],Do=["standard","fast_track"],Po=["codex","opus","fable","self","skip"],Js=["codex","fable","skip"],ei=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xd(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Xd(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Tn,...r.flatMap(([,o])=>o)]}function Zd(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!En(i)||!En(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==Tn&&l!==n)continue;let d=r(i,a);if(Array.isArray(d))for(let u of d)typeof u=="string"&&!o.includes(u)&&o.push(u)}return[Tn,...o]}function eo(e,t,n){return Zd(e,t,n,(r,o)=>En(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Pa(e,t,n){return Zd(e,t,n,(r,o)=>En(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:En(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Mo(e,t){let n=Xd(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Qd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Jr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!eo(t,o,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var gg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ia=[...mg,...nr],bg=[...Zs,...Da].filter((e,t,n)=>n.indexOf(e)===t&&!Ia.includes(e));function Jd(e,t){let n=En(e)?e:{},r=En(t)?t:{},o=[];for(let i of Ia){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:gg[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...bg,...Object.keys(r)])!Ia.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Ma(e,t,n,r,o,s){return zs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function eu(e,t){let n={};for(let r of Da){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function tu(e,t){let n={};for(let r of nr){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Na=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],ur={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ti={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function qa(e,t,n,r,o,s=null){let i=$n({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function nu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of qa(e,t,n,r,o,s))i[l.source]+=1;return i}function ru(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ou(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var l$=[...Xs,...nr];var su=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function No(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ni(e){if(!No(e)||!No(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>No(n)&&No(n.models));return t.length>0?t:null}function Nn(e,t){let n=ni(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function iu(e,t){return No(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function au(e,t){let n=ni(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return iu(r,r.models[t]);return[]}function hg(e){let t=ni(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of iu(r,o))n.includes(s)||n.push(s);return n}function yg(e,t){if(!t)return hg(e);let r=ni(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of au(e,s))o.includes(i)||o.push(i);return o}function lu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Nn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?au(t,r.impl_model):yg(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Fa=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function cu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${ur[e]}: ${t.display} (${ti[t.source]})`}function ja(e){return e.filter(t=>t!==null).join(`
`)}function qo(e){if(typeof e!="object"||e===null)return null;let t=Ar(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ur.orchestration_model,e.model),n(ur.orchestration_effort,e.effort),n(ur.orchestration_speed,e.speed)])}}function Er(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),o=pr(e,"orchestration_speed"),s=cu([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",o)])}}function vg(e,t){return e===null||e.value===null||Fa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function wg(e){return e===null||Fa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function kg(e){return e===null?null:e.value==="auto"?"auto":Fa.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),o=pr(e,"impl_model"),s=pr(e,"impl_effort"),i=pr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":cu([vg(r,t??null),wg(o),kg(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",o),fr("impl_effort",s),fr("impl_speed",i)])}}var $g=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var du={orchestration_model:["fable"],impl_runtime:["claude"]},xg={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function uu(e){return typeof e=="object"&&e!==null?e:null}function pu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Ag(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>$g.includes(t))}function to(e,t=e){let n=uu(e);if(!n)return null;let r=pu(n.rec_orchestration_model,du.orchestration_model);if(r.length===0)return null;let o=pu(n.rec_impl_runtime,du.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=uu(t)||{},l=Object.keys(s),a=0,d=0;for(let m of l){let y=i[m];typeof y=="string"&&y.length>0&&(a+=1,y===s[m]&&(d+=1))}let u=a===0?"unapplied":d===l.length?"applied":"diverged";return{reasons:Ag(n.rec_reason),rec:s,state:u}}function ri(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=xg[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function oi(e){return e.replace(/\/+$/,"")}function Sg(e,t){let n=oi(e),r=oi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function si(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Sg(r,o))continue;let s=oi(r),i=oi(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}async function Eg(e){let t=await Sn(e);ce(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function ii(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Eg(e)}}
    >
      ⧉
    </button></span
  >`}function ai(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function _u(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Tr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function li(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function ci(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function di(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:ai(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function mu(e,t){let n=Tg(e,t);return n?c`<button
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
            title=${n.deploy.at?on(n.deploy.at):""}
            >${di(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Tr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function no(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${on(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${on(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Cg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function jo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ui(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,y)=>(m.requested_at||0)-(y.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Cg(o.phase):null,d=o?.kind==="stale_work_backup_fresh",u=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:d?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:u}}function Fo(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Rg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function gu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(d){return Number.isInteger(i[d])?Number(i[d]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Rg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function pi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Og(e){return c`<div
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
  </div>`}function fi(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":c`<div class="worker-deps">
    ${l?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
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
    ${t.map(d=>c`<span
          class=${`worker-dep worker-dep--pred${d.foreign?" worker-dep--foreign":""}`}
          title=${d.title||""}
          >${d.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${d.id}
                data-root-dir=${d.root_dir||""}
              >
                ${d.label}
              </button>`:d.label}</span
        >`)}${n.map(d=>c`<span
          class=${`worker-dep worker-dep--released${d.foreign?" worker-dep--foreign":""}`}
          title=${d.title||""}
          >${d.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${d.id}
                data-root-dir=${d.root_dir||""}
              >
                ${d.label}
              </button>`:d.label}</span
        >`)}${r?c`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(d=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${d.id}
          aria-label=${`scope \uACB9\uCE68 ${d.id} (${d.location_label})`}
          title=${[`\uACB9\uCE68 ${d.id} (${d.location_label})`,...d.prefixes].join(`
`)}
        >
          ⧉ ${d.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?Og(i):""}
  </div>`}function _i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Lg(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function bu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function mi(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${ri(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function hu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function gi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Ig(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),o=wn(e.done_at);return c`<div
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
      ${hu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${on(e.done_at)}`}
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
              >`):r?c`<span class="worker-usage" title=${So(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${_u(e.work_kind)}
            >작업 ${Tr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Fn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Ig(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=an(e.usage),s=tr(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,d=a?wn(e.done_at):"",u=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",y=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,D=e.lane==="done"?"":_i(e.workflow),q=e.lane==="done"?"":bu(e.from_id),X=gi(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,ee=hu(e.pr_url,e.pr_number),B=r.map(ve=>ve===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ve}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ve===e.completion_badge&&e.completion_title||""}
          >${ve}</span
        >`),P=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",W=o.length>0?o.map(ve=>c`<span class="worker-usage" title=${ve.tooltip}
              >${ve.label}</span
            >`):s?c`<span class="worker-usage" title=${So(e.usage)}
            >${s}</span
          >`:"",Z=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",V=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",_e=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",F=e.discard,J=F?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${F?.attempt_id||""}
          data-operation-id=${F?.operation?.operation_id||""}
          data-discard-mode=${F?.confirmation||"unmerged"}
          ?disabled=${F?!F.enabled:e.discard_enabled===!1}
          title=${F?F.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${F?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,le=te?c`${te.can_resume||te.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",Pe=te?c`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ge=e.revise_action?c`<button
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
        </button>`:"",ue=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Y=mi(e.rec),Te=ii(e.log_path),xe=b||D||q||ue||Y||W||Te?c`<div class="worker-chips">
          ${b}${D}${q}${ue?pi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Y}${W}${Te}
        </div>`:"",E=fi(e.dependency_chips),se=Fo(e),$e=t.actions?t.actions:"",be=!!(i||e.merge_action||e.cancel_action||e.discard_action||F?.operation||e.revise_action||te);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${b}${k}${X}${q}${ee}${ie}${$e}
          </div>
          <div class="worker-mini__row2">
            ${W}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${on(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${_u(e.work_kind)}
                  >작업 ${Tr(e.work_ms)}</span
                >`:""}${B}${Z}
            <span class="worker-mini__actions"
              >${V}${_e}${J}</span
            >
            ${no(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${u}${m}${k}${X}${ee}${B}${y}${P}${$e}
            </div>
            <div class="worker-mini__body">${ie}${Pe}</div>
            ${E}${xe}${be?c`<div class="worker-mini__foot">
                  ${Z}
                  <span class="worker-mini__actions"
                    >${V}${_e}${J}${Ge}${le}</span
                  >
                  ${Fo(e)}
                </div>`:""}
            ${no(e)}`:c`<div class="worker-mini__line">
              ${u}${m}${k}${X}${ie}${ee}${B}${y}${P}${Z}${V}${_e}${J}${$e}
            </div>
            ${E}${xe}${se} ${no(e)}`}
  </div>`}function Dg(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Pg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Ua(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Pg[e.session_preferred_reason||""]||"",d=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),y=fi(e.dependency_chips),b=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=_i(d),D=bu(e.from_id),q=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${gi(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${mi(e.rec)}${Lg(d)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${d?js(d,e.status,{onOpenDoc:n.onOpenDoc}):""}${y}
    ${b||k||D||q?c`<div class="worker-chips">
          ${b}${k}${D}${pi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${no(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${kn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ua(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Fn(o))}
          </div>`}
  </section>`}function fu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function bi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${fu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${kn(r.drop)}
            data-root-dir=${kn(r.root_dir)}
            data-lane-id=${kn(r.lane_id)}
            data-lane-length=${kn(r.lane_length)}
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
        ${fu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Mg(o))}
          </div>`}
    </section>
  </div>`}function Mg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${kn(t.drop)}
        data-root-dir=${kn(t.root_dir)}
        data-lane-id=${kn(t.lane_id)}
        data-lane-length=${kn(t.lane_length)}
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
  </div>`}function hi(e){return e.count?c`<section
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
  </section>`:""}var yu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Bo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function yi(e,t){let n=yu.find(o=>o.step===e);if(!n)return null;let r=yu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function vu(e){let t=Bo.findIndex(n=>n.step===e);return Bo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=Bo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Ng(e){let t=Bo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Bo.length}}function vi(e){let t=Ng(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var za=new Set(["queued","running","retry_pending"]),wu=new Set(["failed","succeeded"]),qg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Uo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Uo.base_containment,child_sweep:Uo.child_sweep,branch_cleanup:Uo.branch_cleanup,parent_close:Uo.parent_close};function jg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Bg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...za,...wu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Ug(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Wa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=qg[o];if(!s)return null;let i=yi(n,`${r} ${s}`);return i?{...i,active:za.has(o),failed:o==="failed"}:null}function Wg(e){return!e||typeof e!="object"?null:Fg[e.step]||null}function Wo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Wg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=jg(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Bg(k,t,l)).sort(Ug):[],d=i?a:[],u=d.find(k=>za.has(k.state));if(u)return Wa(u);if(o)return o.step==="repo_operations"&&a[0]?Wa(a[0],!0):null;let m=d.find(k=>wu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Wa(m);if(r){let k=yi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Uo[e.cleanup_cursor]:null;if(!y)return null;let b=yi(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function wi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var zg="\uBBF8\uC801\uC7AC";function Ha(e,t){let n=wo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Hg=10080*60*1e3;function ku(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Hg)return null;let o=wo(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${on(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function $u(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function xu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let d=Ha(s,{id:a,location_label:o.get(a)||zg}),u=n[a];d.foreign!==!0?d.openable=!0:typeof u=="string"&&u.length>0&&(d.openable=!0,d.root_dir=u),l.push(d)}l.length>0&&r.set(s,l)}return r}function Ga(e,t){return`${e}\0${t}`}function Au(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ka(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function zo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Su(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${zo(o)})`,location_label:zo(o),scope:null,same_lane_ahead:!1};let i=Ka(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Eu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let d=Ga(l.root_dir,a.id);n.set(d,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(d,[]);for(let u of Array.isArray(a.items)?a.items:[])r.set(u.id,d)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let d=Ga(l.root_dir,a.id),u=Array.isArray(a.items)?a.items[0]:null,y=!!u&&u.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],b=o.get(d);if(b)for(let k of y){let D=r.get(k);D&&D!==d&&!b.includes(D)&&b.push(D)}}let s=(l,a)=>{let d=new Set,u=[l];for(;u.length>0;){let m=u.pop();if(m===a)return!0;!m||d.has(m)||(d.add(m),u.push(...o.get(m)||[]))}return!1},i=new Map;for(let[l,a]of o){let d=[];for(let u of a){let m=n.get(u);s(u,l)&&m&&d.push(m)}d.length>0&&i.set(l,d)}return i}function Tu(e,t){return Ga(e,t)}var Cu=1,Ho=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ya=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ro={show_blocked:!0,spec:"all"},Ru={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Gg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Kg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Sr(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Vg(e,t){let{winners:n,resumed_from_ids:r}=Vd(e,t),o=new Map;for(let[s,i]of n){let l=i.attempt,a=i.run_state,d=i.started_at,u=typeof l.session_id=="string"&&l.session_id.length>0;o.set(s,{attempt_id:typeof l.attempt_id=="string"?l.attempt_id:"",run_state:a,started_at:d,last_event_at:typeof l.last_event_at=="number"?l.last_event_at:null,last_activity:l.last_activity&&typeof l.last_activity=="object"?l.last_activity:null,legs:Array.isArray(l.legs)?l.legs:[],runner:typeof l.runner=="string"?l.runner:null,model:typeof l.model=="string"?l.model:null,effort:typeof l.effort=="string"?l.effort:null,speed:typeof l.speed=="string"?l.speed:null,resumed_from:typeof l.resumed_from=="string"?l.resumed_from:null,continuation_mode:l.continuation_mode==="session"||l.continuation_mode==="fresh"?l.continuation_mode:null,status:typeof l.status=="string"?l.status:null,usage:Ln(e,l.bead_id),can_pause:a==="running"&&u,can_resume:a!=="running"&&u&&!r.has(l.attempt_id)})}return o}function Ou(e,t){let n=e[t];if(!n)return"";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Dt(e){return e&&typeof e=="object"?e:{}}function Yg(e,t,n){let r=Dt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=y=>$n({pin:y,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,d;try{a=l(r),d=l(null)}catch{return null}let u=Lu(Er(a,s),Er(d,s)),m=Lu(_r(a,null),_r(d,null));return u||m?{orchestration:u,worker:m}:null}function Lu(e,t){return!e||t&&t.text===e.text?null:e}function Iu(e,t){let n=Ka(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Xg(e,t,n){let r=t.get(e);if(!r)return Iu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return zo(r)}function Zg(e,t,n,r){let o=t.get(e);if(!o)return{label:Iu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":zo(o),title:""}}function Qg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Jg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function eb(e,t,n,r,o,s,i){let l=[];return e.forEach((a,d)=>{let u=typeof a.id=="string"?a.id:"";if(u.length===0)return;let m=a.status==="confirmed"?"confirmed":"draft",y=Array.isArray(a.entries)?a.entries:[],b=[];y.forEach((X,ie)=>{let ee=X&&typeof X.bead_id=="string"?X.bead_id:"";if(ee.length===0)return;let B=X&&typeof X.root_dir=="string"?X.root_dir:"",P=n.get(ee),W=P?P.state:void 0,Z=W==="running"||W==="pr_wait"||W==="done",V=!P||W==="runnable",_e=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,F=Zg(ee,n,r,t),J=b.length>0?b[b.length-1].id:null,te=m==="confirmed"&&J!==null&&!(t.get(ee)||[]).includes(J);b.push({id:ee,title:o.get(ee)||ee,root_dir:P?P.root_dir:B,workspace_name:P?P.workspace_name:s.get(B)||"",seq:ie+1,location_label:F.label,location_title:F.title,draggable:!Z,fixed:Z,done:W==="done",unplaced:V,mismatch:te,..._e!==null?{queue_index:_e}:{}})}),b.forEach((X,ie)=>{X.seq=ie+1});let k=b.length>0&&b.every(X=>X.done),D=b.filter(X=>!X.fixed&&i.armed_by_bead.get(X.id)!==u).map(X=>X.id),q=Jg(u,m,b,k,D,i);l.push({lane_id:u,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(X=>X.mismatch||X.unplaced),unlaunched:D,...q})}),l}function tb(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function nb(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let d=`${a.root_dir}\0${a.id}`,u=s.get(d);if(u){u.cards.push(a);continue}let{scope:m,state:y}=tb(a,t,n);y!==void 0&&(a.scope_state=y),s.set(d,{cards:[a],scope:m})}let i=new Map;for(let a of s.values()){let d=a.cards[0].scope_state;if(d!==void 0)for(let y of a.cards)y.scope_state=d;if(a.scope.length===0)continue;let u=a.cards[0].root_dir,m=i.get(u);m?m.push(a):i.set(u,[a])}let l=(a,d,u)=>{let m=d.cards[0],y={id:m.id,title:m.title,location_label:Xg(m.id,r,o),prefixes:u};for(let b of a.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let a of i.values())for(let d=0;d<a.length;d+=1)for(let u=d+1;u<a.length;u+=1){let m=si(a[d].scope,a[u].scope);m.length!==0&&(l(a[d],a[u],m),l(a[u],a[d],m))}}function Va(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ki(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Go(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...ro,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&Ho.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",d=new Map;for(let T of o)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T);let u=new Map;for(let T of o)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);let m=[],y=[],b=[],k=[],D=[],q=[],X=new Map,ie=new Map,ee=new Map,B=new Map,P=new Map,W=new Map,Z=new Map,V=new Set,_e=new Map,F=new Map,J=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let pe=T.root_dir,Le=T.name||pe,je=d.get(pe),Me=je&&typeof je.revision=="number"?je.revision:typeof T.revision=="number"?T.revision:0,et=Dt(T.attempts),ht=Dt(T.bead_titles);for(let[M,j]of Object.entries(ht))typeof j=="string"&&j.length>0&&J.set(M,j);let Ve=Dt(T.bead_times),z=Dt(T.pr_observations),ne=Dt(T.admission),Ie=Dt(T.revise_parked),ct=Dt(T.merge_queue_state),at=Dt(T.cleanup_failed),De=Dt(T.discard_operations),Ue=Dt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&_e.set(pe,Dt(T.bead_scope));let dt=Dt(T.bead_workflow),tt=Dt(T.pr_activity),_t=Array.isArray(T.repo_operations)?T.repo_operations:[],Pt=Array.isArray(T.merge_queue)?T.merge_queue:[],Ft=new Set(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>M.bead_id)),Ht=new Map(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>[M.bead_id,M])),Mt=Array.isArray(T.queue)?T.queue:[];for(let M of[...Mt,...Array.isArray(T.pr_wait)?T.pr_wait:[]])M&&typeof M.bead_id=="string"&&typeof M.armed_by_lane=="string"&&M.armed_by_lane.length>0&&W.set(M.bead_id,M.armed_by_lane);for(let M of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof M=="string"&&M.length>0&&V.add(M);let Nt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(M=>M&&/^s[1-5]$/.test(M.id)&&Array.isArray(M.entries)),wt=Dt(T.lane_states),We=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Nt.length);ee.set(pe,We),B.set(pe,Mt.length);let O=new Map(Nt.map(M=>[M.id,M])),Q=new Map;for(let M of Nt)for(let j of M.entries)j&&typeof j.bead_id=="string"&&Q.set(j.bead_id,M.id);for(let[M,j]of Object.entries(Ue))Array.isArray(j)&&P.set(M,j.filter(ye=>typeof ye=="string"&&ye.length>0));let me=Array.isArray(T.done)?T.done:[];for(let M of me)M&&typeof M.bead_id=="string"&&q.push({id:M.bead_id,root_dir:pe,workspace_name:Le});let S=new Map;for(let M of me)M&&typeof M.bead_id=="string"&&typeof M.added_at=="number"&&S.set(M.bead_id,M.added_at);let G=M=>({id:M,title:ht[M]||M,root_dir:pe,workspace_name:Le,expected_revision:Me,draggable:!1,...Dt(Ve[M]).created_at?{created_at:Dt(Ve[M]).created_at}:{},...Dt(Ve[M]).updated_at?{updated_at:Dt(Ve[M]).updated_at}:{}}),Re=M=>{let j=dt[M]?.chips?.pr;return j&&typeof j.number=="number"&&typeof j.url=="string"?{pr_number:j.number,pr_url:j.url}:{}},He=M=>Object.hasOwn(Ue,M)?{blocked_by:Array.isArray(Ue[M])?Ue[M].filter(j=>typeof j=="string"&&j.length>0):[]}:{},Ae=new Set;for(let[M,j]of Vg(et,S)){Ae.add(M);let ye=j.run_state==="failed"?Qg(et,j.attempt_id):null;ye!==null&&Z.set(M,ye),y.push({...G(M),lane:"running",...He(M),...Q.has(M)?{serial_lane_id:Q.get(M)}:{},attempt_id:j.attempt_id,run_state:j.run_state,status:j.status||void 0,workflow:dt[M]||null,can_pause:j.can_pause,can_resume:j.can_resume,started_at:j.started_at,last_event_at:j.last_event_at,last_activity:j.last_activity,legs:j.legs,runner:j.runner,model:j.model,effort:j.effort,speed:j.speed,resumed_from:j.resumed_from,continuation_mode:j.continuation_mode,usage:j.usage,exec_chips:{orchestration:qo(j),worker:null},discard:qn(De,M,{attempt_id:j.attempt_id}),badges:j.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:j.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:j.run_state==="failed"})}for(let[M,j]of Kd(et)){if(y.some(Xe=>Xe.id===M))continue;let ye=j.attempt;y.push({...G(M),lane:"running",kind:"session",...He(M),attempt_id:typeof ye.attempt_id=="string"?ye.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[M]||null,can_pause:!1,can_resume:!1,started_at:j.started_at,last_event_at:typeof ye.last_event_at=="number"?ye.last_event_at:null,last_activity:ye.last_activity&&typeof ye.last_activity=="object"?ye.last_activity:null,legs:Array.isArray(ye.legs)?ye.legs:[],runner:typeof ye.runner=="string"?ye.runner:null,model:typeof ye.model=="string"?ye.model:null,effort:typeof ye.effort=="string"?ye.effort:null,speed:typeof ye.speed=="string"?ye.speed:null,resumed_from:null,continuation_mode:null,usage:ye.usage&&typeof ye.usage=="object"?ye.usage:null,exec_chips:{orchestration:qo(ye),worker:null},discard:qn(De,M,{merge_queued:!0}),badges:[j.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let M of Array.isArray(T.session_active)?T.session_active:[]){let j=M&&M.bead_id;typeof j!="string"||Ae.has(j)||(Ae.add(j),Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&P.set(j,M.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof M.title=="string"&&M.title.length>0&&J.set(j,M.title),y.push({...G(j),title:M.title||ht[j]||j,lane:"running",kind:"session",status:"in_progress",started_at:Va(M.started_at)??Va(M.updated_at)??void 0,updated_at:Va(M.updated_at)??void 0,workflow:M.workflow||null,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(M.session_refs)?M.session_refs:[],badges:[],alert:!1}))}for(let M of Array.isArray(T.pr_wait)?T.pr_wait:[]){let j=M&&M.bead_id;if(typeof j!="string"||Ae.has(j))continue;Ae.add(j);let ye=Dt(z[j]),Xe=Dt(ye.pr),ke=ye.gate?Dt(ye.gate):null,Ze=Ft.has(j),it=Ht.get(j)?.continuation_action||null,mt=!!it&&it.continuation===null,$t=ct.active===j,Kt=M.external===!0,St=at[j]||null,Jt=Dt(tt[j]),Ne=Wo({bead_id:j,merge_sha:M.merge_sha,cleanup_cursor:M.cleanup_cursor,merge_progress:Jt.merge_progress||null,cleanup_failed:St,repo_operations:_t}),mn=wi(Ne),en=!!ke&&ke.base_badge==="\uCDA9\uB3CC",jt=!!St&&["child_sweep","branch_cleanup","parent_close"].includes(St.step)&&!!ke&&ke.tier==="merged",Qt=Kt&&!!St&&!!ke&&ke.tier==="merged",gn=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier)&&ke.reason!=="review_receipt_undetermined",fe=qn(De,j,{external:Kt,merge_active:$t||Ne?.step==="merge",merge_queued:Ze,cleanup_active:mn,merged:!!St||ke?.tier==="merged"}),A=!!fe.operation;b.push({...G(j),lane:"pr_wait",...He(j),workflow:dt[j]||null,pr_number:typeof Xe.number=="number"?Xe.number:null,pr_url:typeof Xe.url=="string"?Xe.url:void 0,external:Kt,usage:Ln(et,j),merge_step:Ne,badges:mt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ne?[ke?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:St?[Cr(St.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(St.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:Ne?Ne.failed===!0:!!St||gn,reason:St&&Ne?.active!==!0?vi(St.step):"PR \uB300\uAE30",merge_action:ke?.tier==="merged"&&!jt&&!Qt?!1:!Ze||mt,merge_enabled:!A&&(mt||ke?.enabled===!0||en||jt||Qt),merge_label:mt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Qt||jt?"\uC815\uB9AC \uC7AC\uAC1C":en&&!jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:mt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":en?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ze&&!mt,cancel_enabled:!$t,continuation_mismatch:it?.mismatch||null,discard:fe,discard_action:fe.action,discard_enabled:fe.enabled,discard_title:fe.title})}let lt=(M,j,ye,Xe)=>{let ke=M&&M.bead_id;if(typeof ke!="string"||Ae.has(ke))return null;Ae.add(ke);let Ze=Ie[ke],it=qn(De,ke),mt=it.operation?it:null,$t={...G(ke),lane:j,workflow:dt[ke]||null,draggable:!mt,discard:mt||void 0,reason:Ou(ne,ke),seq:ye+1,queue_position:ye+1,queue_index:ye,queue_length:Xe,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!mt,revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Kt=He(ke);return Object.hasOwn(Kt,"blocked_by")&&($t.blocked_by=Kt.blocked_by),$t};for(let M=0;M<Mt.length;M++){let j=lt(Mt[M],"queue",M,Mt.length);if(!j)continue;k.push(j);let ye=X.get(pe);ye?ye.push(j):X.set(pe,[j])}let st=M=>{let j=b.find(Ze=>Ze.id===M&&Ze.root_dir===pe);if(j)return{id:M,title:j.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ye=y.find(Ze=>Ze.id===M&&Ze.root_dir===pe),Xe=ye?ye.run_state:Gg(et,M),ke=Xe==="failed"||Xe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Xe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:M,title:ye?ye.title:G(M).title,badge:ke}},he=[];for(let M=0;M<Math.max(We,Nt.length);M++){let j=`s${M+1}`,ye=O.get(j),Xe=ye&&Array.isArray(ye.entries)?ye.entries:[],ke=Dt(wt[j]),Ze=Array.isArray(ke.occupied_by)?ke.occupied_by.filter($t=>typeof $t=="string"):[],it=new Set(Ze),mt=[];for(let $t=0;$t<Xe.length;$t++){let Kt=Xe[$t]&&Xe[$t].bead_id;if(typeof Kt=="string"&&it.has(Kt)){Ae.add(Kt);continue}let St=lt(Xe[$t],j,$t,Xe.length);St&&(mt.push(St),k.push(St))}mt.length===0&&Ze.length===0&&(We<=1||M>=We)||he.push({id:j,index:M,items:mt,raw_length:Xe.length,occupied_by:Ze,occupants:Ze.map($t=>st($t)),corrections:Array.isArray(ke.corrections)?ke.corrections.length:0,cycle:ke.cycle===!0,...mt.length===0&&Ze.length===0?{empty:!0}:{}})}ie.set(pe,he);let Je=Array.from({length:We},(M,j)=>{let ye=`s${j+1}`,Xe=O.get(ye),ke=Xe&&Array.isArray(Xe.entries)?Xe.entries:[],Ze=Dt(wt[ye]);return{id:ye,index:ke.length,length:ke.length,occupied_by:Array.isArray(Ze.occupied_by)?Ze.occupied_by.filter(it=>typeof it=="string"):[]}});for(let M of Array.isArray(T.runnable)?T.runnable:[]){let j=M&&M.bead_id;if(typeof j!="string"||Ae.has(j))continue;Ae.add(j);let ye=M.workflow&&typeof M.workflow=="object"?M.workflow:null,Xe=ye&&typeof ye.route=="string"&&ye.route||(typeof M.route=="string"?M.route:null),ke=Yg(Dt(je),M.exec_pins,Xe),Ze=to(M.rec,M.exec_pins);Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&P.set(j,M.blocked_by.filter(it=>typeof it=="string"&&it.length>0)),typeof M.title=="string"&&M.title.length>0&&J.set(j,M.title),Array.isArray(M.scope)&&F.set(j,M.scope.filter(it=>typeof it=="string"&&it.length>0)),m.push({...G(j),title:M.title||ht[j]||j,lane:"runnable",draggable:!0,queue_placeable:!0,reason:Ou(ne,j),created_at:M.created_at??void 0,updated_at:M.updated_at??void 0,status:typeof M.status=="string"?M.status:void 0,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",published:M.published===!0,workflow:ye||(Xe?{route:Xe,chips:{route:Xe}}:null),...ke?{exec_chips:ke}:{},...Ze?{rec:Ze}:{},blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(it=>typeof it=="string"&&it.length>0)}:{},place_index:Mt.length,place_lanes:Je})}for(let M of me){let j=M&&M.bead_id;if(typeof j!="string"||Ae.has(j)||(Ae.add(j),s!==void 0&&typeof M.added_at=="number"&&M.added_at<s))continue;let ye=Kg(et,j),Xe=ye&&typeof ye.done_kind=="string"?ye.done_kind:null;D.push({...G(j),lane:"done",done:!0,done_layout:"three_line",usage:Ln(et,j),work_ms:ci(et,j),done_at:typeof M.added_at=="number"?M.added_at:void 0,done_kind:Xe,...Re(j),badges:[...Xe&&Ru[Xe]?[Ru[Xe]]:[],...li(et,j)]})}}let te=new Map;o.forEach((T,pe)=>{T&&typeof T.root_dir=="string"&&te.set(T.root_dir,pe)});let le=n&&n.running_sort==="repo"?"repo":"started";y.sort((T,pe)=>{let Le=T.kind==="session",je=pe.kind==="session";if(Le!==je)return Le?1:-1;if(Le&&je){let ht=ki(pe.updated_at)-ki(T.updated_at);return ht!==0?ht:T.id.localeCompare(pe.id)}if(le==="repo"){let ht=te.get(T.root_dir)??Number.MAX_SAFE_INTEGER,Ve=te.get(pe.root_dir)??Number.MAX_SAFE_INTEGER;if(ht!==Ve)return ht-Ve}let Me=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,et=typeof pe.started_at=="number"&&Number.isFinite(pe.started_at)?pe.started_at:null;return Me!==null&&et!==null&&Me!==et?Me-et:Me===null&&et!==null?1:Me!==null&&et===null?-1:T.id.localeCompare(pe.id)}),D.sort((T,pe)=>(pe.done_at??0)-(T.done_at??0));let Pe=o.length>0?o:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),Ge=new Set(m.map(T=>T.root_dir)),ue=[];for(let T of Pe){if(!T||typeof T.root_dir!="string")continue;let pe=X.get(T.root_dir)||[],Le=ie.get(T.root_dir)||[];!(pe.length>0||Le.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!Ge.has(T.root_dir)||ue.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=Cu?T.slots:Cu,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:Dt(T.runner_catalog),items:pe,sublanes:{parallel:pe,serial:Le},serial_lane_count:ee.get(T.root_dir)||0,raw_queue_length:B.get(T.root_dir)||0})}let Y={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat",queue:k,queue_groups:ue,running:y,pr_wait:b,done:D,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Te=Au(Y);for(let T of q)Te.has(T.id)||Te.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let pe=Te.get(T.id);T.blockers=(T.blocked_by||[]).map(Le=>Su(Le,pe,Te,o))}for(let T of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let pe=(T.blockers||[]).map(je=>{let Me=Te.get(je.id)?.root_dir;return{...Ha(T.id,je),openable:!0,...typeof Me=="string"&&Me.length>0?{root_dir:Me}:{}}});if(pe.length===0)continue;let Le={predecessors:pe};T.dependency_chips=Le}nb(Y,_e,F,Te,o);let xe=Eu(Y.queue_groups);for(let T of Y.queue_groups)for(let pe of T.sublanes.serial){let Le=xe.get(Tu(T.root_dir,pe.id));Le&&(pe.cross_wait_peers=Le)}Y.chain_lanes=eb(l&&Array.isArray(l.lanes)?l.lanes:[],P,Te,o,J,u,{armed_by_bead:W,failed_by_bead:Z,disarmed_lanes:V});let E=new Map;for(let T of[...Y.queue,...Y.runnable])E.has(T.id)||E.set(T.id,T);let se=new Set;for(let T of Y.chain_lanes)for(let pe of T.rows){if(T.status==="confirmed"&&!pe.unplaced&&!pe.fixed&&se.add(pe.id),!T.draft&&!pe.unplaced)continue;let Le=E.get(pe.id);Le&&(Le.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let $e=new Map(Y.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...Y.queue,...Y.running]){let pe=W.get(T.id);if(typeof pe!="string"||pe.length===0)continue;let Le=$e.get(pe);T.armed_lane_chip=Le===void 0?{lane_id:pe,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:pe,label:`\u25B6 \uC5F0\uACB0 ${Le}`,orphan:!1}}let be=[];for(let T of X.values())for(let pe of T)se.has(pe.id)||be.push(pe);be.sort((T,pe)=>{let Le=T.workspace_name.localeCompare(pe.workspace_name);return Le!==0?Le:(T.queue_index??0)-(pe.queue_index??0)}),Y.parallel_rows=be;let ve={};for(let[T,pe]of Te)typeof pe.root_dir=="string"&&pe.root_dir.length>0&&(ve[T]=pe.root_dir);for(let T of Y.chain_lanes)for(let pe of T.rows)!Object.hasOwn(ve,pe.id)&&pe.root_dir.length>0&&u.has(pe.root_dir)&&(ve[pe.id]=pe.root_dir);Y.owner_of=ve;let we=Y.runnable.length;Y.runnable_all=Y.runnable.slice();let Oe=Y.runnable;i.show_blocked||(Oe=Oe.filter(T=>T.blocked!==!0));let ze=Oe.length;i.spec==="with"?Oe=Oe.filter(T=>T.published===!0):i.spec==="without"&&(Oe=Oe.filter(T=>T.published!==!0)),Y.runnable_hidden={blocked:we-ze,spec:ze-Oe.length};let bt=(T,pe)=>{let Le=ki(pe.updated_at)-ki(T.updated_at);return Le!==0?Le:T.id.localeCompare(pe.id)},ot=a==="repo_spec"?(T,pe)=>{let Le=T.published===!0?0:1,je=pe.published===!0?0:1;return Le!==je?Le-je:bt(T,pe)}:bt;if(a==="updated_flat")Y.runnable=Oe.slice().sort(bt),Y.runnable_sections=[];else{let T=new Map;for(let je of Oe){let Me=T.get(je.root_dir);Me?Me.push(je):T.set(je.root_dir,[je])}let pe=[],Le=[];for(let je of Pe){if(!je||typeof je.root_dir!="string")continue;let Me=(T.get(je.root_dir)||[]).slice().sort(ot);T.delete(je.root_dir),Me.length!==0&&(pe.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Me.map(et=>({...et,workspace_name:""}))}),Le.push(...Me))}for(let[je,Me]of T){let et=Me.slice().sort(ot);pe.push({root_dir:je,name:et[0]?.workspace_name||je,items:et.map(ht=>({...ht,workspace_name:""}))}),Le.push(...et)}Y.runnable=Le,Y.runnable_sections=pe}return Y}var rb="\uC0AC\uC774\uD074";function ob(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Xa(e,t,n){let r=Go(e,t),o=[],s=new Set,i=(a,d)=>{for(let u of a)s.has(u.id)||(s.add(u.id),o.push({bead_id:u.id,root_dir:u.root_dir,workspace_name:u.workspace_name,title:u.title,lane:d}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ob(e)}}function Du(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ca(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:rb}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,d=r!==void 0&&l.root_dir===r;return a!==d?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Pu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:zu,setPrototypeOf:Mu,isFrozen:sb,getPrototypeOf:ib,getOwnPropertyDescriptor:ab}=Object,{freeze:pn,seal:In,create:rl}=Object,{apply:ol,construct:sl}=typeof Reflect<"u"&&Reflect;pn||(pn=function(t){return t});In||(In=function(t){return t});ol||(ol=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});sl||(sl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var $i=fn(Array.prototype.forEach),lb=fn(Array.prototype.lastIndexOf),Nu=fn(Array.prototype.pop),Ko=fn(Array.prototype.push),cb=fn(Array.prototype.splice),Ai=fn(String.prototype.toLowerCase),Za=fn(String.prototype.toString),Qa=fn(String.prototype.match),Vo=fn(String.prototype.replace),db=fn(String.prototype.indexOf),ub=fn(String.prototype.trim),jn=fn(Object.prototype.hasOwnProperty),un=fn(RegExp.prototype.test),Yo=pb(TypeError);function fn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return ol(e,t,r)}}function pb(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return sl(e,n)}}function gt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ai;Mu&&Mu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(sb(t)||(t[r]=s),o=s)}e[o]=!0}return e}function fb(e){for(let t=0;t<e.length;t++)jn(e,t)||(e[t]=null);return e}function rr(e){let t=rl(null);for(let[n,r]of zu(e))jn(e,n)&&(Array.isArray(r)?t[n]=fb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=rr(r):t[n]=r);return t}function Xo(e,t){for(;e!==null;){let r=ab(e,t);if(r){if(r.get)return fn(r.get);if(typeof r.value=="function")return fn(r.value)}e=ib(e)}function n(){return null}return n}var qu=pn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ja=pn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),el=pn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_b=pn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),tl=pn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),mb=pn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fu=pn(["#text"]),ju=pn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),nl=pn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bu=pn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xi=pn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),gb=In(/\{\{[\w\W]*|[\w\W]*\}\}/gm),bb=In(/<%[\w\W]*|[\w\W]*%>/gm),hb=In(/\$\{[\w\W]*/gm),yb=In(/^data-[\-\w.\u00B7-\uFFFF]+$/),vb=In(/^aria-[\-\w]+$/),Hu=In(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),wb=In(/^(?:\w+script|data):/i),kb=In(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Gu=In(/^html$/i),$b=In(/^[a-z][.\w]*(-[.\w]+)+$/i),Uu=Object.freeze({__proto__:null,ARIA_ATTR:vb,ATTR_WHITESPACE:kb,CUSTOM_ELEMENT:$b,DATA_ATTR:yb,DOCTYPE_NAME:Gu,ERB_EXPR:bb,IS_ALLOWED_URI:Hu,IS_SCRIPT_OR_DATA:wb,MUSTACHE_EXPR:gb,TMPLIT_EXPR:hb}),Zo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},xb=function(){return typeof window>"u"?null:window},Ab=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Wu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ku(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:xb(),t=fe=>Ku(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Zo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:y,trustedTypes:b}=e,k=a.prototype,D=Xo(k,"cloneNode"),q=Xo(k,"remove"),X=Xo(k,"nextSibling"),ie=Xo(k,"childNodes"),ee=Xo(k,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let B,P="",{implementation:W,createNodeIterator:Z,createDocumentFragment:V,getElementsByTagName:_e}=n,{importNode:F}=r,J=Wu();t.isSupported=typeof zu=="function"&&typeof ee=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:te,ERB_EXPR:le,TMPLIT_EXPR:Pe,DATA_ATTR:Ge,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:xe}=Uu,{IS_ALLOWED_URI:E}=Uu,se=null,$e=gt({},[...qu,...Ja,...el,...tl,...Fu]),be=null,ve=gt({},[...ju,...nl,...Bu,...xi]),we=Object.seal(rl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,ze=null,bt=Object.seal(rl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ct=!0,ot=!0,T=!1,pe=!0,Le=!1,je=!0,Me=!1,et=!1,ht=!1,Ve=!1,z=!1,ne=!1,Ie=!0,ct=!1,at="user-content-",De=!0,Ue=!1,dt={},tt=null,_t=gt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Ft=gt({},["audio","video","img","source","image","track"]),Ht=null,Mt=gt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",wt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",O=We,Q=!1,me=null,S=gt({},[Nt,wt,We],Za),G=gt({},["mi","mo","mn","ms","mtext"]),Re=gt({},["annotation-xml"]),He=gt({},["title","style","font","a","script"]),Ae=null,lt=["application/xhtml+xml","text/html"],st="text/html",he=null,Je=null,M=n.createElement("form"),j=function(A){return A instanceof RegExp||A instanceof Function},ye=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===A)){if((!A||typeof A!="object")&&(A={}),A=rr(A),Ae=lt.indexOf(A.PARSER_MEDIA_TYPE)===-1?st:A.PARSER_MEDIA_TYPE,he=Ae==="application/xhtml+xml"?Za:Ai,se=jn(A,"ALLOWED_TAGS")?gt({},A.ALLOWED_TAGS,he):$e,be=jn(A,"ALLOWED_ATTR")?gt({},A.ALLOWED_ATTR,he):ve,me=jn(A,"ALLOWED_NAMESPACES")?gt({},A.ALLOWED_NAMESPACES,Za):S,Ht=jn(A,"ADD_URI_SAFE_ATTR")?gt(rr(Mt),A.ADD_URI_SAFE_ATTR,he):Mt,Pt=jn(A,"ADD_DATA_URI_TAGS")?gt(rr(Ft),A.ADD_DATA_URI_TAGS,he):Ft,tt=jn(A,"FORBID_CONTENTS")?gt({},A.FORBID_CONTENTS,he):_t,Oe=jn(A,"FORBID_TAGS")?gt({},A.FORBID_TAGS,he):rr({}),ze=jn(A,"FORBID_ATTR")?gt({},A.FORBID_ATTR,he):rr({}),dt=jn(A,"USE_PROFILES")?A.USE_PROFILES:!1,Ct=A.ALLOW_ARIA_ATTR!==!1,ot=A.ALLOW_DATA_ATTR!==!1,T=A.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=A.SAFE_FOR_TEMPLATES||!1,je=A.SAFE_FOR_XML!==!1,Me=A.WHOLE_DOCUMENT||!1,Ve=A.RETURN_DOM||!1,z=A.RETURN_DOM_FRAGMENT||!1,ne=A.RETURN_TRUSTED_TYPE||!1,ht=A.FORCE_BODY||!1,Ie=A.SANITIZE_DOM!==!1,ct=A.SANITIZE_NAMED_PROPS||!1,De=A.KEEP_CONTENT!==!1,Ue=A.IN_PLACE||!1,E=A.ALLOWED_URI_REGEXP||Hu,O=A.NAMESPACE||We,G=A.MATHML_TEXT_INTEGRATION_POINTS||G,Re=A.HTML_INTEGRATION_POINTS||Re,we=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&j(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(we.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&j(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(we.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(we.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(ot=!1),z&&(Ve=!0),dt&&(se=gt({},Fu),be=[],dt.html===!0&&(gt(se,qu),gt(be,ju)),dt.svg===!0&&(gt(se,Ja),gt(be,nl),gt(be,xi)),dt.svgFilters===!0&&(gt(se,el),gt(be,nl),gt(be,xi)),dt.mathMl===!0&&(gt(se,tl),gt(be,Bu),gt(be,xi))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?bt.tagCheck=A.ADD_TAGS:(se===$e&&(se=rr(se)),gt(se,A.ADD_TAGS,he))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?bt.attributeCheck=A.ADD_ATTR:(be===ve&&(be=rr(be)),gt(be,A.ADD_ATTR,he))),A.ADD_URI_SAFE_ATTR&&gt(Ht,A.ADD_URI_SAFE_ATTR,he),A.FORBID_CONTENTS&&(tt===_t&&(tt=rr(tt)),gt(tt,A.FORBID_CONTENTS,he)),De&&(se["#text"]=!0),Me&&gt(se,["html","head","body"]),se.table&&(gt(se,["tbody"]),delete Oe.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=A.TRUSTED_TYPES_POLICY,P=B.createHTML("")}else B===void 0&&(B=Ab(b,o)),B!==null&&typeof P=="string"&&(P=B.createHTML(""));pn&&pn(A),Je=A}},Xe=gt({},[...Ja,...el,..._b]),ke=gt({},[...tl,...mb]),Ze=function(A){let de=ee(A);(!de||!de.tagName)&&(de={namespaceURI:O,tagName:"template"});let Ce=Ai(A.tagName),vt=Ai(de.tagName);return me[A.namespaceURI]?A.namespaceURI===wt?de.namespaceURI===We?Ce==="svg":de.namespaceURI===Nt?Ce==="svg"&&(vt==="annotation-xml"||G[vt]):!!Xe[Ce]:A.namespaceURI===Nt?de.namespaceURI===We?Ce==="math":de.namespaceURI===wt?Ce==="math"&&Re[vt]:!!ke[Ce]:A.namespaceURI===We?de.namespaceURI===wt&&!Re[vt]||de.namespaceURI===Nt&&!G[vt]?!1:!ke[Ce]&&(He[Ce]||!Xe[Ce]):!!(Ae==="application/xhtml+xml"&&me[A.namespaceURI]):!1},it=function(A){Ko(t.removed,{element:A});try{ee(A).removeChild(A)}catch{q(A)}},mt=function(A,de){try{Ko(t.removed,{attribute:de.getAttributeNode(A),from:de})}catch{Ko(t.removed,{attribute:null,from:de})}if(de.removeAttribute(A),A==="is")if(Ve||z)try{it(de)}catch{}else try{de.setAttribute(A,"")}catch{}},$t=function(A){let de=null,Ce=null;if(ht)A="<remove></remove>"+A;else{let xt=Qa(A,/^[\r\n\t ]+/);Ce=xt&&xt[0]}Ae==="application/xhtml+xml"&&O===We&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let vt=B?B.createHTML(A):A;if(O===We)try{de=new y().parseFromString(vt,Ae)}catch{}if(!de||!de.documentElement){de=W.createDocument(O,"template",null);try{de.documentElement.innerHTML=Q?P:vt}catch{}}let Et=de.body||de.documentElement;return A&&Ce&&Et.insertBefore(n.createTextNode(Ce),Et.childNodes[0]||null),O===We?_e.call(de,Me?"html":"body")[0]:Me?de.documentElement:Et},Kt=function(A){return Z.call(A.ownerDocument||A,A,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},St=function(A){return A instanceof m&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof u)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Jt=function(A){return typeof l=="function"&&A instanceof l};function Ne(fe,A,de){$i(fe,Ce=>{Ce.call(t,A,de,Je)})}let mn=function(A){let de=null;if(Ne(J.beforeSanitizeElements,A,null),St(A))return it(A),!0;let Ce=he(A.nodeName);if(Ne(J.uponSanitizeElement,A,{tagName:Ce,allowedTags:se}),je&&A.hasChildNodes()&&!Jt(A.firstElementChild)&&un(/<[/\w!]/g,A.innerHTML)&&un(/<[/\w!]/g,A.textContent)||A.nodeType===Zo.progressingInstruction||je&&A.nodeType===Zo.comment&&un(/<[/\w]/g,A.data))return it(A),!0;if(!(bt.tagCheck instanceof Function&&bt.tagCheck(Ce))&&(!se[Ce]||Oe[Ce])){if(!Oe[Ce]&&jt(Ce)&&(we.tagNameCheck instanceof RegExp&&un(we.tagNameCheck,Ce)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Ce)))return!1;if(De&&!tt[Ce]){let vt=ee(A)||A.parentNode,Et=ie(A)||A.childNodes;if(Et&&vt){let xt=Et.length;for(let Bt=xt-1;Bt>=0;--Bt){let nn=D(Et[Bt],!0);nn.__removalCount=(A.__removalCount||0)+1,vt.insertBefore(nn,X(A))}}}return it(A),!0}return A instanceof a&&!Ze(A)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&un(/<\/no(script|embed|frames)/i,A.innerHTML)?(it(A),!0):(Le&&A.nodeType===Zo.text&&(de=A.textContent,$i([te,le,Pe],vt=>{de=Vo(de,vt," ")}),A.textContent!==de&&(Ko(t.removed,{element:A.cloneNode()}),A.textContent=de)),Ne(J.afterSanitizeElements,A,null),!1)},en=function(A,de,Ce){if(Ie&&(de==="id"||de==="name")&&(Ce in n||Ce in M))return!1;if(!(ot&&!ze[de]&&un(Ge,de))){if(!(Ct&&un(ue,de))){if(!(bt.attributeCheck instanceof Function&&bt.attributeCheck(de,A))){if(!be[de]||ze[de]){if(!(jt(A)&&(we.tagNameCheck instanceof RegExp&&un(we.tagNameCheck,A)||we.tagNameCheck instanceof Function&&we.tagNameCheck(A))&&(we.attributeNameCheck instanceof RegExp&&un(we.attributeNameCheck,de)||we.attributeNameCheck instanceof Function&&we.attributeNameCheck(de,A))||de==="is"&&we.allowCustomizedBuiltInElements&&(we.tagNameCheck instanceof RegExp&&un(we.tagNameCheck,Ce)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Ce))))return!1}else if(!Ht[de]){if(!un(E,Vo(Ce,Te,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&A!=="script"&&db(Ce,"data:")===0&&Pt[A])){if(!(T&&!un(Y,Vo(Ce,Te,"")))){if(Ce)return!1}}}}}}}return!0},jt=function(A){return A!=="annotation-xml"&&Qa(A,xe)},Qt=function(A){Ne(J.beforeSanitizeAttributes,A,null);let{attributes:de}=A;if(!de||St(A))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},vt=de.length;for(;vt--;){let Et=de[vt],{name:xt,namespaceURI:Bt,value:nn}=Et,rn=he(xt),Cn=nn,Ot=xt==="value"?Cn:ub(Cn);if(Ce.attrName=rn,Ce.attrValue=Ot,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,Ne(J.uponSanitizeAttribute,A,Ce),Ot=Ce.attrValue,ct&&(rn==="id"||rn==="name")&&(mt(xt,A),Ot=at+Ot),je&&un(/((--!?|])>)|<\/(style|title|textarea)/i,Ot)){mt(xt,A);continue}if(rn==="attributename"&&Qa(Ot,"href")){mt(xt,A);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){mt(xt,A);continue}if(!pe&&un(/\/>/i,Ot)){mt(xt,A);continue}Le&&$i([te,le,Pe],cn=>{Ot=Vo(Ot,cn," ")});let sn=he(A.nodeName);if(!en(sn,rn,Ot)){mt(xt,A);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(sn,rn)){case"TrustedHTML":{Ot=B.createHTML(Ot);break}case"TrustedScriptURL":{Ot=B.createScriptURL(Ot);break}}if(Ot!==Cn)try{Bt?A.setAttributeNS(Bt,xt,Ot):A.setAttribute(xt,Ot),St(A)?it(A):Nu(t.removed)}catch{mt(xt,A)}}Ne(J.afterSanitizeAttributes,A,null)},gn=function fe(A){let de=null,Ce=Kt(A);for(Ne(J.beforeSanitizeShadowDOM,A,null);de=Ce.nextNode();)Ne(J.uponSanitizeShadowNode,de,null),mn(de),Qt(de),de.content instanceof s&&fe(de.content);Ne(J.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(fe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Ce=null,vt=null,Et=null;if(Q=!fe,Q&&(fe="<!-->"),typeof fe!="string"&&!Jt(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Yo("dirty is not a string, aborting")}else throw Yo("toString is not a function");if(!t.isSupported)return fe;if(et||ye(A),t.removed=[],typeof fe=="string"&&(Ue=!1),Ue){if(fe.nodeName){let nn=he(fe.nodeName);if(!se[nn]||Oe[nn])throw Yo("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof l)de=$t("<!---->"),Ce=de.ownerDocument.importNode(fe,!0),Ce.nodeType===Zo.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?de=Ce:de.appendChild(Ce);else{if(!Ve&&!Le&&!Me&&fe.indexOf("<")===-1)return B&&ne?B.createHTML(fe):fe;if(de=$t(fe),!de)return Ve?null:ne?P:""}de&&ht&&it(de.firstChild);let xt=Kt(Ue?fe:de);for(;vt=xt.nextNode();)mn(vt),Qt(vt),vt.content instanceof s&&gn(vt.content);if(Ue)return fe;if(Ve){if(z)for(Et=V.call(de.ownerDocument);de.firstChild;)Et.appendChild(de.firstChild);else Et=de;return(be.shadowroot||be.shadowrootmode)&&(Et=F.call(r,Et,!0)),Et}let Bt=Me?de.outerHTML:de.innerHTML;return Me&&se["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&un(Gu,de.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+Bt),Le&&$i([te,le,Pe],nn=>{Bt=Vo(Bt,nn," ")}),B&&ne?B.createHTML(Bt):Bt},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ye(fe),et=!0},t.clearConfig=function(){Je=null,et=!1},t.isValidAttribute=function(fe,A,de){Je||ye({});let Ce=he(fe),vt=he(A);return en(Ce,vt,de)},t.addHook=function(fe,A){typeof A=="function"&&Ko(J[fe],A)},t.removeHook=function(fe,A){if(A!==void 0){let de=lb(J[fe],A);return de===-1?void 0:cb(J[fe],de,1)[0]}return Nu(J[fe])},t.removeHooks=function(fe){J[fe]=[]},t.removeAllHooks=function(){J=Wu()},t}var Vu=Ku();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Si=e=>(...t)=>({_$litDirective$:e,values:t}),oo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Qo=class extends oo{constructor(t){if(super(t),this.it=Wt,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Wt||t==null)return this._t=void 0,this.it=t;if(t===On)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Qo.directiveName="unsafeHTML",Qo.resultType=1;var Yu=Si(Qo);function cl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=cl();function np(e){Or=e}var ns={exec:()=>null};function kt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(_n.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Sb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Eb=/^(?:[ \t]*(?:\n|$))+/,Tb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Cb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Rb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,dl=/(?:[*+-]|\d{1,9}[.)])/,rp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,op=kt(rp).replace(/bull/g,dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ob=kt(rp).replace(/bull/g,dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ul=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lb=/^[^\n]+/,pl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ib=kt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",pl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Db=kt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,dl).getRegex(),Li="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pb=kt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",fl).replace("tag",Li).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sp=kt(ul).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex(),Mb=kt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sp).getRegex(),_l={blockquote:Mb,code:Tb,def:Ib,fences:Cb,heading:Rb,hr:rs,html:Pb,lheading:op,list:Db,newline:Eb,paragraph:sp,table:ns,text:Lb},Xu=kt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex(),Nb={..._l,lheading:Ob,table:Xu,paragraph:kt(ul).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex()},qb={..._l,html:kt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ns,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:kt(ul).replace("hr",rs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",op).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,jb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ip=/^( {2,}|\\)\n(?!\s*$)/,Bb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ii=/[\p{P}\p{S}]/u,ml=/[\s\p{P}\p{S}]/u,ap=/[^\s\p{P}\p{S}]/u,Ub=kt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ml).getRegex(),lp=/(?!~)[\p{P}\p{S}]/u,Wb=/(?!~)[\s\p{P}\p{S}]/u,zb=/(?:[^\s\p{P}\p{S}]|~)/u,Hb=kt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),cp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Gb=kt(cp,"u").replace(/punct/g,Ii).getRegex(),Kb=kt(cp,"u").replace(/punct/g,lp).getRegex(),dp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Vb=kt(dp,"gu").replace(/notPunctSpace/g,ap).replace(/punctSpace/g,ml).replace(/punct/g,Ii).getRegex(),Yb=kt(dp,"gu").replace(/notPunctSpace/g,zb).replace(/punctSpace/g,Wb).replace(/punct/g,lp).getRegex(),Xb=kt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ap).replace(/punctSpace/g,ml).replace(/punct/g,Ii).getRegex(),Zb=kt(/\\(punct)/,"gu").replace(/punct/g,Ii).getRegex(),Qb=kt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Jb=kt(fl).replace("(?:-->|$)","-->").getRegex(),eh=kt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Jb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ci=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,th=kt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ci).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),up=kt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ci).replace("ref",pl).getRegex(),pp=kt(/^!?\[(ref)\](?:\[\])?/).replace("ref",pl).getRegex(),nh=kt("reflink|nolink(?!\\()","g").replace("reflink",up).replace("nolink",pp).getRegex(),Zu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gl={_backpedal:ns,anyPunctuation:Zb,autolink:Qb,blockSkip:Hb,br:ip,code:jb,del:ns,emStrongLDelim:Gb,emStrongRDelimAst:Vb,emStrongRDelimUnd:Xb,escape:Fb,link:th,nolink:pp,punctuation:Ub,reflink:up,reflinkSearch:nh,tag:eh,text:Bb,url:ns},rh={...gl,link:kt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ci).getRegex(),reflink:kt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ci).getRegex()},il={...gl,emStrongRDelimAst:Yb,emStrongLDelim:Kb,url:kt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:kt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zu).getRegex()},oh={...il,br:kt(ip).replace("{2,}","*").getRegex(),text:kt(il.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ei={normal:_l,gfm:Nb,pedantic:qb},Jo={normal:gl,gfm:il,breaks:oh,pedantic:rh},sh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Qu=e=>sh[e];function sr(e,t){if(t){if(_n.escapeTest.test(e))return e.replace(_n.escapeReplace,Qu)}else if(_n.escapeTestNoEncode.test(e))return e.replace(_n.escapeReplaceNoEncode,Qu);return e}function Ju(e){try{e=encodeURI(e).replace(_n.percentDecode,"%")}catch{return null}return e}function ep(e,t){let n=e.replace(_n.findPipe,(s,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),r=n.split(_n.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(_n.slashPipe,"|");return r}function es(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function ih(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function tp(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ah(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ri=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:es(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ah(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=es(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:es(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=es(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let d=l.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,o=o?`${o}
${u}`:u;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,s,!0),this.lexer.state.top=m,n.length===0)break;let y=s.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,k=b.raw+`
`+n.join(`
`),D=this.blockquote(k);s[s.length-1]=D,r=r.substring(0,r.length-b.raw.length)+D.raw,o=o.substring(0,o.length-b.text.length)+D.text;break}else if(y?.type==="list"){let b=y,k=b.raw+`
`+n.join(`
`),D=this.list(k);s[s.length-1]=D,r=r.substring(0,r.length-y.raw.length)+D.raw,o=o.substring(0,o.length-b.raw.length)+D.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,d="",u="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),y=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,u=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),a=!0),!a){let D=this.rules.other.nextBulletRegex(k),q=this.rules.other.hrRegex(k),X=this.rules.other.fencesBeginRegex(k),ie=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],P;if(y=B,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),P=y):P=y.replace(this.rules.other.tabCharGlobal,"    "),X.test(y)||ie.test(y)||ee.test(y)||D.test(y)||q.test(y))break;if(P.search(this.rules.other.nonSpaceChar)>=k||!y.trim())u+=`
`+P.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(m)||ie.test(m)||q.test(m))break;u+=`
`+y}!b&&!y.trim()&&(b=!0),d+=B+`
`,e=e.substring(B.length+1),m=P.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),o.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),o.raw+=d}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=u.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!o.loose){let d=a.tokens.filter(m=>m.type==="space"),u=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));o.loose=u}}if(o.loose)for(let a of o.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ep(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(ep(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=es(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=ih(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),tp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return tp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(r=d.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...r[0]][0].length,m=e.slice(0,o+r.index+u+i);if(Math.min(o,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Bn=class al{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new Ri,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_n,block:Ei.normal,inline:Jo.normal};this.options.pedantic?(n.block=Ei.pedantic,n.inline=Jo.pedantic):this.options.gfm&&(n.block=Ei.gfm,this.options.breaks?n.inline=Jo.breaks:n.inline=Jo.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ei,inline:Jo}}static lex(t,n){return new al(n).lex(t)}static lexInline(t,n){return new al(n).inlineTokens(t)}lex(t){t=t.replace(_n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_n.tabCharGlobal,"    ").replace(_n.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let u=n.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,m=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},m),typeof y=="number"&&y>=0&&(u=Math.min(u,y))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=n.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Oi=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_n.notSpaceStart)?.[0],o=e.replace(_n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+sr(r)+'">'+(n?o:sr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:sr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Ju(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+sr(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Ju(e);if(o===null)return sr(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${sr(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},bl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Un=class ll{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new Oi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new bl}static parse(t,n){return new ll(n).parse(t)}static parseInline(t,n){return new ll(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ti,ts=(Ti=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Un.parse:Un.parseInline}},Rt(Ti,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(Ti,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ti),lh=class{constructor(...e){Rt(this,"defaults",cl());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",Un);Rt(this,"Renderer",Oi);Rt(this,"TextRenderer",bl);Rt(this,"Lexer",Bn);Rt(this,"Tokenizer",Ri);Rt(this,"Hooks",ts);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Oi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...d)=>{let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ri(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...d)=>{let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ts;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];ts.passThroughHooks.has(s)?o[i]=d=>{if(this.defaults.async&&ts.passThroughHooksRespectAsync.has(s))return(async()=>{let m=await l.call(o,d);return a.call(o,m)})();let u=l.call(o,d);return a.call(o,u)}:o[i]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(o,d);return m===!1&&(m=await a.apply(o,d)),m})();let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bn.lex(e,t??this.defaults)}parser(e,t){return Un.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let d=await(o.hooks?await o.hooks.provideParser():e?Un.parse:Un.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(d):d})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Un.parse:Un.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+sr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Rr=new lh;function At(e,t){return Rr.parse(e,t)}At.options=At.setOptions=function(e){return Rr.setOptions(e),At.defaults=Rr.defaults,np(At.defaults),At};At.getDefaults=cl;At.defaults=Or;At.use=function(...e){return Rr.use(...e),At.defaults=Rr.defaults,np(At.defaults),At};At.walkTokens=function(e,t){return Rr.walkTokens(e,t)};At.parseInline=Rr.parseInline;At.Parser=Un;At.parser=Un.parse;At.Renderer=Oi;At.TextRenderer=bl;At.Lexer=Bn;At.lexer=Bn.lex;At.Tokenizer=Ri;At.Hooks=ts;At.parse=At;var ox=At.options,sx=At.setOptions,ix=At.use,ax=At.walkTokens,lx=At.parseInline;var cx=Un.parse,dx=Bn.lex;function mr(e){let t=At.parse(e),n=Vu.sanitize(t);return Yu(n)}function ir(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function so(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Di(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var _p={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ch={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},dh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,uh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Wn(e){return!!e&&typeof e=="object"}function hl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function yl(e,t){let n=hl(e),r=hl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function mp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Wn(o)&&typeof o.text=="string"?o.text:"").join(""):Wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ph(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:_p[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=hl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=yl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=yl(Wn(l)?l.old_string:"",Wn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function vl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var fh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function gp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Wn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(fh,"").trim();return n.length>0?{kind:"user",text:n}:null}function wl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=dh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:uh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function _h(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function mh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Wn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(wl(i.text));else if(i.type==="thinking"){let l=vl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=ph(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?fp(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Wn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=mp(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=gp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?fp([o],n):[o]}return[]}function fp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function gh(e){let t=typeof e.command=="string"?e.command:"",n=mp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:_p.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function bh(e){if(e.type==="item.completed"&&Wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[wl(t.text)];if(t.type==="user_message"){let n=gp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=vl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[gh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function hh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[wl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=vl(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ch[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function yh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function vh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Wn(t)?t:null}function bp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=vh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return _h(s,r);let i=s.schema==="codex-delegation-monitor-v1"?hh(s):yh(s)?bh(s):mh(s,n);return i.length>0&&(r.progress=null),i}}}function kl(e){let t=[],n=bp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var wh=5,kh=10,$h=/Task\s+#(\d+)/,xh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ah=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function os(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Sh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Eh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Th(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=$h.exec(o.output||o.result||""),d=String(s.activeForm||s.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Ch(e){if(e.tool==="Bash"){let t=e.command||"";return xh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ah.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Rh(e){let t=e.filter(o=>o.kind==="tool").slice(-kh),n=new Map;t.forEach((o,s)=>{let i=Ch(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Oh(e){let t=Eh(e);if(t)return{text:t,guess:!1};let n=Th(e);if(n)return{text:n,guess:!1};let r=Rh(e);return r?{text:r,guess:!0}:null}function Lh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function io(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,d=null,u=!1,m={},y=!0,b=new Set,k=new Set,D=null,q=null,X=!1,ie=!1,ee=!1,B=null,P=null;function W(){X=!1,ie=!1,ee=!1,B=null,P=null}async function Z(z){if(n){ie=!0,ee=!1,Oe();try{let ne=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...d?{root_dir:d}:{}}));if(s!==z)return;!ne||typeof ne!="object"||Array.isArray(ne)?ee=!0:(B=ne,P=z)}catch{s===z&&(ee=!0)}finally{s===z&&(ie=!1,Oe())}}}function V(){if(X=!X,X&&s&&P!==s){Z(s);return}Oe()}function _e(){if(!X)return"";let z=so({loading:ie,error:ee});if(z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ne=Di(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ne?c`<div class="prompt-block__meta">${ne} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function F(){if(!a||!r)return[];let z=r.get(a);return kl(z?z.lines:[])}function J(){if(!a||!r)return null;let z=r.get(a),ne=z?z.last_event_at:null;return typeof ne=="number"?ne:null}function te(){return m.status==="running"}function le(){if(te()&&s){q||(q=setInterval(()=>Oe(),1e3));return}Pe()}function Pe(){q&&(clearInterval(q),q=null)}function Ge(z){let ne=[],Ie=0;for(;Ie<z.length;){let{idx:ct,line:at}=z[Ie];if(at.kind==="tool"){let De=Ie;for(;De<z.length&&z[De].line.kind==="tool"&&z[De].line.tool===at.tool;)De+=1;if(De-Ie>=wh&&!k.has(ct)){ne.push({kind:"group",idx:ct,tool:at.tool||"",lines:z.slice(Ie,De)}),Ie=De;continue}}ne.push({kind:"line",idx:ct,line:at}),Ie+=1}return ne}function ue(z){let ne=[],Ie=new Map;for(let De=0;De<z.length;De+=1){let Ue=z[De],dt=Ue.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let tt=Ie.get(dt);tt||(tt={kind:"subagent",idx:De,launch_id:dt,agent_type:null,header:null,lines:[]},Ie.set(dt,tt),ne.push(tt)),tt.lines.push({idx:De,line:Ue});continue}if(Ue.kind==="tool"&&Ue.tool==="Agent"&&typeof Ue.launch_id=="string"&&Ue.launch_id.length>0){let tt=Y(Ue),_t=Ie.get(Ue.launch_id);if(_t){_t.header={idx:De,line:Ue},_t.agent_type=tt;continue}let Pt={kind:"subagent",idx:De,launch_id:Ue.launch_id,agent_type:tt,header:{idx:De,line:Ue},lines:[]};Ie.set(Ue.launch_id,Pt),ne.push(Pt);continue}ne.push({kind:"entry",idx:De,line:Ue})}let ct=[],at=0;for(;at<ne.length;){if(ne[at].kind!=="entry"){ct.push(ne[at]),at+=1;continue}let De=at;for(;De<ne.length&&ne[De].kind==="entry";)De+=1;ct.push(...Ge(ne.slice(at,De))),at=De}return ct}function Y(z){let ne=z.input;return ne&&typeof ne.subagent_type=="string"?ne.subagent_type:null}function Te(z){for(let ne=z.length-1;ne>=0;ne-=1){let Ie=z[ne];if(Ie.kind==="result"||Ie.kind==="error")return null;if(Ie.kind==="tool"&&!Object.hasOwn(Ie,"result"))return Ie}return null}function xe(z){for(let ne=z.length-1;ne>=0;ne-=1)if(z[ne].kind==="thinking")return z[ne];return null}function E(z,ne){if(ne.kind==="gate")return c`<div class="sv__gate">${ne.text}</div>`;if(ne.kind==="phase")return c`<div class="sv__phase">${ne.text}</div>`;if(ne.kind==="result")return c`<div
        class="sv__result${ne.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ne.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(ne.text||(ne.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ne.kind==="thinking"){let Ie=b.has(z);return c`<div
        class="sv__think${Ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>bt(z)}
      >
        <span class="sv__think-line">💭 ${os(ne.text)}</span>
        ${Ie?c`<pre class="sv__think-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="user"){let Ie=b.has(z);return c`<div
        class="sv__line sv__line--user${Ie?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>bt(z)}
      >
        <span class="sv__user-line">▷ ${os(ne.text)}</span>
        ${Ie?c`<pre class="sv__user-expand">${ne.text}</pre>`:""}
      </div>`}if(ne.kind==="error")return c`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="blocker")return c`<div class="sv__error">⛔ ${ne.text}</div>`;if(ne.kind==="tool"){let Ie=b.has(z),ct=ne.tool==="Bash"?Sh(ne.command):0,at=ne.tool==="Bash"?ct>1?os(ne.command):ne.command:ne.path||ne.command||"";return c`<div
        class="sv__tool${Ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>bt(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ne.icon}</span>
          <span class="sv__tool-name">${ne.tool}</span>
          ${at?c`<span class="sv__tool-detail">${at}</span>`:""}
          ${ct>1?c`<span class="sv__tool-more">⋯ ${ct}줄</span>`:""}
          ${typeof ne.added=="number"?c`<span class="sv__diff-add">+${ne.added}</span>`:""}
          ${typeof ne.removed=="number"?c`<span class="sv__diff-del">−${ne.removed}</span>`:""}
          ${ne.result?c`<span class="sv__tool-ok">→ ${ne.result}</span>`:""}
        </span>
        ${Ie?c`<pre class="sv__tool-expand">${se(ne)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${mr(ne.text||"")}</div>`}function se(z){let ne=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)ne.push(z.command);else if(z.input!==void 0)try{ne.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&ne.push(`output:
${z.output}`),ne.join(`

`)}function $e(){if(!s)return c``;let z=F(),ne=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),Ie=m.session_id||"",ct=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,at=te(),De=at?Lh(J(),Date.now()):"",Ue=at?Te(z):null,dt=at?xe(z):null,tt=Oh(z);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":s)}</span
        >
        ${tt?c`<span
              class="sv__stage${tt.guess?" sv__stage--guess":""}"
              title=${tt.text}
              >${tt.text}</span
            >`:""}
        ${at?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${De?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${De}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${De?c`<span class="sv__live-ago">${De}</span>`:""}</span
            >`:""}
        ${Ie?c`<button
              type="button"
              class="sv__session"
              title=${Ie}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ie}`}
              @click=${()=>ot(Ie)}
            >
              ⧉ ${Ie.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>ot(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ne?c`<span class="sv__meta">${ne}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||u?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
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
          aria-label=${ct}
          @click=${Ct}
        >
          <span class="sv__follow-full">⇣ ${ct}</span>
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
        ${z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ue(z).map(_t=>_t.kind==="subagent"?ve(_t):_t.kind==="group"?be(_t):E(_t.idx,_t.line))}
      </div>
      ${Ue||dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ue?c`<span class="sv__now-icon">${Ue.icon}</span>
                  <span class="sv__now-name">${Ue.tool}</span>
                  <span class="sv__now-detail"
                    >${Ue.tool==="Bash"?os(Ue.command):Ue.path||Ue.command||""}</span
                  >`:""}
            ${dt?c`<span class="sv__now-think"
                  >💭 ${os(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function be(z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>we(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ve(z){let ne=k.has(z.idx),Ie=z.header?z.header.line:null,ct=Ie?Ie.is_error===!0?"\u2717":typeof Ie.result=="string"?"\u2713":"\u27F3":"",at=Ie&&Ie.command?Ie.command:"";return c`<div class="sv__sub${ne?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>we(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${at?c`<span class="sv__sub-detail">${at}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${ct?c`<span class="sv__sub-state">${ct}</span>`:""}
        ${ne?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ne?c`<div class="sv__sub-body">
            ${Ge(z.lines).map(De=>De.kind==="group"?be(De):E(De.idx,De.line))}
          </div>`:""}
    </div>`}function we(z){k.add(z),Oe()}function Oe(){rt($e(),e),le(),y&&ze()}function ze(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function bt(z){b.has(z)?b.delete(z):b.add(z),Oe()}function Ct(){y=!y,Oe()}function ot(z){Sn(z).then(ne=>{ne?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(z){!s||!z||(m={...m,...z},Oe())}function pe(z){let ne=z.target;if(!ne||!ne.classList||!ne.classList.contains("sv__body"))return;!(ne.scrollHeight-ne.scrollTop-ne.clientHeight<=4)&&y&&(y=!1,Oe())}e.addEventListener("scroll",pe,!0);function Le(z){let ne=z.target;!ne||typeof ne.closest!="function"||e.contains(ne)||ne.closest("dialog")||ne.closest(".md-viewer-root")||Ve()}let je=!1;function Me(){je||(document.addEventListener("mousedown",Le),je=!0)}function et(){je&&(document.removeEventListener("mousedown",Le),je=!1)}function ht(z){let ne=z&&z.attempt_id;if(!ne)return;let Ie=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,ct=z.session_ref&&typeof z.session_ref=="object"?z.session_ref:null;if(Ie&&ct)return;let at=a;s=ne,i=Ie,l=ct,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&at&&at!==a&&Promise.resolve(n("unsubscribe-session-log",{id:at})).catch(()=>{}),d=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,m=z.meta||{},u=z.hide_prompt===!0,y=!0,b.clear(),k.clear(),W(),!D&&r&&(D=r.subscribe(Oe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...d?{root_dir:d}:{}})).catch(()=>{}),Me(),Oe()}function Ve(){let z=a;et(),s=null,i=null,l=null,a=null,d=null,u=!1,b.clear(),k.clear(),W(),Pe(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),rt(c``,e),o&&o()}return{open:ht,updateMeta:T,close:Ve,isOpen(){return s!==null},destroy(){Pe(),et(),D&&(D(),D=null),e.removeEventListener("scroll",pe,!0),s=null,i=null,l=null,a=null,d=null,u=!1,rt(c``,e)}}}function Ih(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Dh(e){let t=e&&e.metadata||{},n=Wr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ih(t)?null:"plan_pending"}),r}function hp(e,t){let n=Dh(e);return c`
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
  `}var Ph="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Mh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Nh=/^\*\*결론\*\* — (.+)$/;function Pi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ph)return null;let n=Mh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Nh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(d).join(`
`).trim()}}var yp=20;function vp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function qh(e){return e.length>yp?`${e.slice(0,yp)}\u2026`:e}function Fh(e,t,n,r){let o=`${t.lane} ${qh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${vp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function jh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
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
  </div>`}function wp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Pi(typeof a.text=="string"?a.text:"");return d?Fh(a,d,t,o.has(a.id)):jh(a)})}
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
  `}var{I:zx}=Cc;var kp=e=>e.strings===void 0;var Bh={},$p=(e,t=Bh)=>e._$AH=t;var Lr=Si(class extends oo{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!kp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===On||t===Wt)return t;let n=e.element,r=e.name;if(e.type===or.PROPERTY){if(t===n[r])return On}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return On}else if(e.type===or.ATTRIBUTE&&n.getAttribute(r)===t+"")return On;return $p(e),t}});var Uh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],$l={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},xp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Wh={pin:"pin",global:"global",base:"base"};function zh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Wh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Hh(e,t,n){switch(e){case"workflow_mode":return Do;case"spec_review_model":case"impl_review_model":return Po;case"plan_review_model":return Js;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ei;case"impl_dispatch":return Yd;case"impl_runtime":return Qs;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return eo(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Io;case"orchestration_model":return Mo(n,null);case"orchestration_effort":return eo(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function Gh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
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
  </div>`}function Ap(e,t){let n=Na.flatMap(a=>a.keys),r=qa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=nu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let d=a.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Kh(s)}</span
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
          ${Na.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(d=>a.keys.includes(d.key)).map(d=>{let u=zs({key:d.key,choices:Hh(d.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Gh(d,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Kh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Vh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Sp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Vh(r.exec_receipt),d=a?Jn(a):l,u=a?`${a.kind}:${a.actor}`:l.split("@")[0],m=Us(r.planned_execution,r.exec_receipt),y=r.chips?.pr?.number,b=typeof y=="number"?`PR #${y}`:"PR",k=to(n),D=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${b}</a
          >`:""}
      ${m?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${m.kind}
            title=${m.title}
            >${m.label}</span
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${d}
            >${u}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${k?c`<button
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
      ${Yh(s).map(q=>Xh(q,n,o,{label:q.id==="pr"?b:q.label,href:q.id==="pr"?i:""}))}
    </div>
  </section>`}function Yh(e){let n=typeof e=="string"&&Object.hasOwn($l,e)&&$l[e]||$l.spec_backed;return Uh.filter(r=>n.includes(r.id))}var Mi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Xh(e,t,n,r){let o=Zh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",d=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,u=o&&o.split("@")[1]?.slice(0,7)||"",m=d?Mi.stale:l?Mi.on:a?Mi.current:Mi.none,y=Qh(e,n),b=`${r.label} \xB7 ${m}${y?` \xB7 ${y}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${d?" detail-summary__gate--stale":""}${u?" detail-summary__gate--receipt":""}`,D=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${u}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${D}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${D}</span
  >`}function Zh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Qh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(xp,n)?xp[n]:""}function Ni(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ep(e){return Ni(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Tp(e,t){let n=e&&e[t];if(!Ni(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Ep),o=Ep(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Op(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function qi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Op(e)}${t}`}function ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Op(e)}`}function Jh(e,t,n){if(n!==null){let o=e==="claude"?qi:ao,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Cp(e,t){if(!Ni(e)||e.state!=="usable"||!Ni(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Rp(e){let t=e.provider_key==="claude"?qi:ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
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
  </div>`}function Lp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Rp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Tp(t,"claude"),selected:o,workspace_default:Cp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Rp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Tp(t,"codex"),selected:s,workspace_default:Cp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function ey(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ty(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function d(D){D.key==="Escape"&&o&&(D.preventDefault(),b())}document.addEventListener("keydown",d);function u(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${ey(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){rt(u(),e)}async function y(D,q={}){o=D,s="loading",i="",l=null,a="",m();let X=q.workspace||(n?n():"");if(!X){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ie="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(D);try{let ee=await r(ie),B=await ee.json().catch(()=>({}));if(!ee.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&q.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||ee.status)+")",m();return}let P=ty(String(B.content||""));l=P.front,i=P.body,s="ready",m()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){o=null,rt(c``,e)}function k(){document.removeEventListener("keydown",d),b()}return{open:y,close:b,destroy:k}}var ny=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Pp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ji=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],ry=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ip(e){return typeof e=="string"&&ry.has(e)}var oy=["running","done","failed","interrupted"],sy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function iy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ay(e){let t=an(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Zr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Pp}
          >부분 집계</span
        >`:""}`}function Dp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Sl(e){if(typeof e=="number")return ss(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ss(t):""}function ly(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function cy(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function xl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Al(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function dy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ji.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?xl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||xl(t.effort))||!(!("agent_type"in t)||xl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!oy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Al(t.started_at)||!Al(t.last_event_at)||!Al(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function uy(e,t,n){let o=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Sl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Sl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function py(e,t,n,r){let o=e.status==="running"?null:t,i=(o?an({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?ss(e.last_event_at):o?Sl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,ly(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=cy(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${sy[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function fy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function _y(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of s){let m=dy(u);!m||o.has(m.launch_id)||Ip(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((u,m)=>(u.started_at||0)-(m.started_at||0));let i={};for(let{role:u,provider:m}of ji){let y=t?t.roles[u]?.[m]:null;i[u]=y?[...y.legs]:[]}let l=ji.flatMap(({role:u})=>i[u]),a=new Set,d=[];for(let{role:u,provider:m}of ji){for(let y of r.filter(b=>b.role===u&&b.provider===m)){let b=l.find(k=>k.receipt_id===y.launch_id)||null;b&&!fy(y,b)||(b&&a.add(b.receipt_id),d.push(py(y,b,e.attempt_id,n)))}for(let y of i[u])!a.has(y.receipt_id)&&!Ip(y.agent_type)&&d.push(uy(u,m,y))}return d}function my(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ny,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${iy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Pp}</span>`:""}
  </div>`}var gy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ss(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function by(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var hy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function yy(e,t){let n=hy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${xa(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Ao(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ss(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Mp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(b=>b&&b.current===!0),...s.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],l=i.map(b=>yy(b,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let b of o)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&d.add(b.resumed_from);let u=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let D=typeof b.session_id=="string"&&b.session_id.length>0,q=d.has(b.attempt_id),X=D&&!q,ie=D?q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!X}
      title=${ie}
      @click=${ee=>{ee.stopPropagation(),X&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let D=b.cause_detail,q=D&&typeof D.reason=="string"&&D.reason.length>0?typeof D.command=="string"&&D.command.length>0?`${D.reason} \xB7 ${D.command}`:D.reason:b.cause;return c`<div class="detail-session__cause" title=${q}>
      ${b.cause}
    </div>`},y=b=>{let k=Dp(Ta(b));if(an(k).length===0&&!Zr(b.usage))return"";let D=a.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${D?"true":"false"}
      title=${D?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${q=>{q.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${ay(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(b=>{let k=Ta(b),D=Dp(k),q=an(D);return c`<div class="detail-session-row">
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
            ${$o(b)?c`<span
                  class="detail-session__resumed"
                  title=${$o(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ar(b)}</span>
            ${q.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${q.length>0?q.map(X=>c`<span
                      class="detail-session__usage"
                      title=${X.tooltip}
                      >${X.label}</span
                    >`):Zr(b.usage)?c`<span class="detail-session__usage"
                    >${Zr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ss(b.started_at)}</span>
          </button>
          ${y(b)} ${u(b)} ${m(b)} ${by(b)}
          ${a.has(b.attempt_id)&&b.usage?my(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${_y(b,k,t)}
        </div>`})}
    </div>
  `}function Np(e,t={}){return c`
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
          ${vy(e)}
        </div>`:""}
  `}function vy(e){let t=so(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Di(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var wy=["open","in_progress","deferred","resolved","closed"],ky=[0,1,2,3,4];function qp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,u=null,m={},y="",b=!1,k=[],D=!1,q={},X={claude:null,codex:null},ie=null,ee=null,B=0,P=!1,W=!1,Z="",V="",_e="",F="",J=!1;function te(){P=!1,W=!1,Z="",V="",_e="",F="",J=!1}function le(){X={claude:null,codex:null},ie=null,ee=null,B+=1}async function Pe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function Ge(v){try{let K=await fetch(v);if(!K.ok)return null;let L=await K.json();if(!L||typeof L!="object"||!Array.isArray(L.accounts))return null;let U=L.accounts.filter(Se=>Se!==null&&typeof Se=="object"&&!Array.isArray(Se));return{accounts:U,active:U.find(Se=>Se.active===!0)||null}}catch{return null}}async function ue(v){ee=v;let K=++B,[L,U,Se]=await Promise.all([Ge("/api/claude-usage"),Ge("/api/codex-usage"),Pe()]);K!==B||v!==d||(X={claude:L,codex:U},ie=Se,Fe())}let Y=[],Te=null,xe=null,E=!1,se="",$e=!1,be=0,ve=new Set;function we(){Y=[],Te=null,xe=null,E=!1,se="",$e=!1,be+=1,ve.clear()}async function Oe(v){if(!o)return;let K=++be;try{let L=await Promise.resolve(o("get-comments",{id:v}));if(K!==be||v!==d)return;Y=Array.isArray(L)?L:[],E=!1}catch{if(K!==be||v!==d)return;E=!0}Fe()}function ze(){if(!o||!d)return;let v=u&&typeof u.comment_count=="number"?u.comment_count:null;if(Te!==d){Te=d,xe=v,Oe(d);return}v!==null&&v!==xe&&(xe=v,Oe(d))}function bt(v){ve.has(v)?ve.delete(v):ve.add(v),Fe()}function Ct(v){let K=se.trim().length===0;se=v,K!==(v.trim().length===0)&&Fe()}async function ot(){let v=se.trim();if(!o||!d||v.length===0||$e)return;let K=d;$e=!0,Fe();let L=!1;try{let U=await Promise.resolve(o("add-comment",{id:K,text:v}));Array.isArray(U)&&U.length>0&&(L=!0,K===d&&(Y=U,E=!1,se="",xe=U.length))}catch{L=!1}L||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),K===d&&($e=!1),Fe()}let T={onToggle:bt,onDraftInput:Ct,onSubmit:ot},pe=t.mdViewer||null,Le=null;pe||(Le=document.createElement("div"),Le.className="md-viewer-root",document.body.appendChild(Le));let je=pe||Fi(Le,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let et=io(Me,{transport:o?(v,K)=>Promise.resolve(o(v,K)):void 0,sessionLogStore:a}),ht=!1,Ve=!1,z=!1,ne=null,Ie=null,ct=0;function at(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function De(){ht=!1,Ve=!1,z=!1,ne=null,Ie=null,ct+=1}async function Ue(v){if(!o)return;let K=++ct;Ve=!0,z=!1,Fe();try{let L=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(K!==ct)return;!L||typeof L!="object"||Array.isArray(L)?z=!0:(ne=L,Ie=at(v))}catch{K===ct&&(z=!0)}finally{K===ct&&(Ve=!1,Fe())}}let dt=[],tt=null,_t=0;function Pt(v,K){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${K}`}function Ft(){dt=[],tt=null,_t+=1}async function Ht(v,K){if(!o)return;let L=++_t,U;try{U=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{U=null}L!==_t||K!==tt||(dt=U&&Array.isArray(U.sessions)?U.sessions:[],Fe())}function Mt(){if(!o||!d)return;let v=u&&u.metadata,K=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(K===null){Ft();return}let L=Pt(d,K);tt!==L&&(dt=[],tt=L,Ht(d,L))}function Nt(){if(ht=!ht,ht&&d&&Ie!==at(d)){ne=null,Ue(d);return}Fe()}function wt(){if(!i||!d)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(L=>L&&L.bead_id===d).sort((L,U)=>(U.started_at||0)-(L.started_at||0)).map(L=>({attempt_id:L.attempt_id,bead_id:L.bead_id,status:L.status,started_at:typeof L.started_at=="number"?L.started_at:null,runner:L.runner||null,model:L.model||null,effort:L.effort||L.observed_effort||null,speed:L.speed||null,session_id:L.session_id||null,resumed_from:L.resumed_from||null,continuation_mode:L.continuation_mode||null,dismissed_at:typeof L.dismissed_at=="number"?L.dismissed_at:null,cause:typeof L.cause=="string"?L.cause:null,cause_detail:L.cause_detail||null,exec_default_preset_id:typeof L.exec_default_preset_id=="string"?L.exec_default_preset_id:null,exec_default_preset_revision:typeof L.exec_default_preset_revision=="number"?L.exec_default_preset_revision:null,exec_values:L.exec_values&&typeof L.exec_values=="object"?L.exec_values:null,usage:L.usage||null,usage_legs:Array.isArray(L.usage_legs)?L.usage_legs:[],delegation_sessions:Array.isArray(L.delegation_sessions)?L.delegation_sessions:[]}))}function We(){if(!i||!d)return null;let v=i.get();return Ln(v&&v.attempts||{},d)}let O=new Set;function Q(v){O.has(v)?O.delete(v):O.add(v),Fe()}function me(v){let K=i?i.get():null,L=K&&K.attempts?K.attempts[v]:null;et.open({attempt_id:v,meta:L?{runner:L.runner||void 0,model:L.model||void 0,effort:L.effort||void 0,status:L.status||void 0,session_id:L.session_id||void 0}:{}})}function S(v,K){let L=i?i.get():null,U=L&&L.attempts?L.attempts[v]:null,qe=(U&&Array.isArray(U.delegation_sessions)?U.delegation_sessions:[]).find(yt=>yt&&typeof yt=="object"&&yt.launch_id===K);qe&&et.open({attempt_id:v,launch_id:K,meta:{runner:qe.provider==="claude"?"claude":"codex",role:qe.role,...typeof qe.agent_type=="string"?{agent_type:qe.agent_type}:{},model:qe.model,effort:qe.effort,session_id:qe.session_id,status:qe.status}})}async function G(v){if(!o||!v)return;let K=await Vr();if(K===null)return;let L=()=>{let yt=i?i.get():null;return yt&&typeof yt.revision=="number"?yt.revision:0},U=async(yt={},Ke=L())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Ke,...K!==""?{instructions:K}:{},...yt}),Se=yt=>{yt?.queue&&i?.set&&i.set(yt.queue)},qe=await U();if(Se(qe),qe&&qe.conflict){let yt=qe.queue&&typeof qe.queue.revision=="number"?qe.queue.revision:L();qe=await U({},yt),Se(qe)}qe=await er(qe,(yt,Ke)=>U({continuation:yt,decision_token:Ke}),{onResult:Se,refresh:()=>U()}),qe&&qe.resumed===!1&&!qe.conflict&&qe.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${qe.reason}`,"error",2400)}function Re(v){!v||!d||et.open(Yr(v,d,u&&u.status))}let He={onOpen:me,onOpenDelegation:S,onResume:G,onToggleUsage:Q,onOpenSessionRef:Re,onCopyResumeCommand:Jt};function Ae(){let v=i?i.get():null,K={...q};for(let L of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=v&&v[L];typeof U=="string"&&(K[L]=U)}return K}async function lt(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));q=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{q={}}Fe()}}function st(){let v=i?i.get():null;return v&&v.runner_catalog||null}function he(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Je(){let v=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},L=$n({pin:{...v,...m},global:Ae(),execution_defaults:he(),runner_catalog:st(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Nn(st(),L)}function M(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function j(v){return v?.compatible===!1}function ye(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Xe(){let v=M(),K=v?.presets.find(L=>L.id===y);if(!(!o||!d||!v||!K||j(K)||b)){b=!0,k=[],Fe();try{let L=await Promise.resolve(o("apply-impl-preset",ou(d,K.id,v.revision)));if(L&&L.conflict){ye(L),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let U=L&&Array.isArray(L.issue)?L.issue[0]:L?.issue;if(L&&L.applied&&U&&typeof U=="object"){u=U,k=Array.isArray(L.skipped_orchestration_keys)?L.skipped_orchestration_keys.filter(Se=>typeof Se=="string"):[];for(let Se of su)delete m[Se];ce(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}L&&L.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(L){L&&typeof L=="object"&&L.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Fe()}}}let ke=null;n&&n.subscribe&&(ke=n.subscribe(()=>St()));let Ze=null;i&&typeof i.subscribe=="function"&&(Ze=i.subscribe(()=>{d&&Fe()}));let it=null,mt=null;function $t(){mt&&(mt(),mt=null)}l&&typeof l.subscribe=="function"&&(it=l.subscribe(()=>{d&&Fe()}));function Kt(v){v.key==="Escape"&&d&&(v.preventDefault(),r())}document.addEventListener("keydown",Kt);function St(){if(d){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+d)||[];u=v.find(L=>L&&L.id===d)||v[0]||u}ze(),Mt(),Fe()}}function Jt(v){Sn(v).then(K=>{K?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ne(v){v.preventDefault(),v.stopPropagation(),d&&Jt(d)}function mn(v,K){v.preventDefault(),v.stopPropagation(),Jt(K)}function en(v,K,L){v.preventDefault(),v.stopPropagation(),je.open(K,{missing_state:L})}async function jt(v,K){let L=Object.hasOwn(m,v),U=m[v];if(m[v]=K,Fe(),!(!o||!d))try{let Se=await Promise.resolve(o("update-exec-settings",ru(d,v,K.length===0?null:K))),qe=Array.isArray(Se)?Se[0]:Se;if(!qe||typeof qe!="object"||!qe.id)throw new Error("exec settings readback failed");u=qe,delete m[v],Fe()}catch(Se){throw L?m[v]=U:delete m[v],Fe(),ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Se}}function Qt(v){v.catch(()=>{})}async function gn(v,K){let L=u||{},U=L.metadata&&typeof L.metadata=="object"?L.metadata:{},Se={};for(let Ke of["impl_runtime","impl_model","impl_effort"])Se[Ke]=Object.hasOwn(m,Ke)?m[Ke]:typeof U[Ke]=="string"?U[Ke]:"";Se[v]=K;let qe=lu(Se,st(),Je()),yt={};for(let Ke of["impl_runtime","impl_model","impl_effort"])yt[Ke]=m[Ke],m[Ke]=qe[Ke]||"";if(Fe(),!(!o||!d))return Promise.resolve(o("update-impl-target",{id:d,...qe,orchestration_runtime:Je()})).then(Ke=>{let ft=Array.isArray(Ke)?Ke[0]:Ke;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");u=ft;for(let yn of["impl_runtime","impl_model","impl_effort"])delete m[yn];Fe()}).catch(Ke=>{for(let ft of["impl_runtime","impl_model","impl_effort"])yt[ft]===void 0?delete m[ft]:m[ft]=yt[ft];throw Fe(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ke})}async function fe(v,K){if(!(!v||typeof v!="object")&&!(K==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await jt("orchestration_model",v.orchestration_model)}catch{return}if(typeof v.impl_runtime=="string"&&v.impl_runtime.length>0)try{await gn("impl_runtime",v.impl_runtime)}catch{}}}async function A(v,K,L){if(!o||!d)return!1;try{let U=await Promise.resolve(o(v,K)),Se=Array.isArray(U)?U[0]:U;return Se&&typeof Se=="object"&&Se.id?(u=Se,!0):(ce(L,"error"),!1)}catch(U){return U&&typeof U=="object"&&U.code==="bd_readback_failed"?(ce("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ce(L,"error"),!1)}}function de(v){setTimeout(()=>{try{let K=e.querySelector(v);K&&typeof K.focus=="function"&&K.focus()}catch{}},0)}function Ce(){P=!0,Z=u&&u.title||"",Fe(),de('.detail-edit__input[data-edit="title"]')}function vt(v){Z=v.target.value}function Et(){P=!1,Z="",Fe()}function xt(){A("edit-text",{id:d,field:"title",value:Z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(P=!1,Z=""),Fe()})}function Bt(){W=!0,V=u&&u.description||"",Fe(),de('.detail-edit__textarea[data-edit="description"]')}function nn(v){V=v.target.value}function rn(){W=!1,V="",Fe()}function Cn(){A("edit-text",{id:d,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(W=!1,V=""),Fe()})}function Ot(v,K,L,U){if(v.key==="Escape"){v.stopPropagation(),L();return}v.key==="Enter"&&(!U||v.ctrlKey||v.metaKey)&&(v.preventDefault(),K())}function sn(v){let K=v.target.value;A("update-status",{id:d,status:K},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function cn(v){let K=Number(v.target.value);A("update-priority",{id:d,priority:K},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function dn(v){_e=v.target.value}function Hn(){let v=_e.trim();v.length!==0&&A("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(K=>{K===!0&&(_e=""),Fe()})}function x(v){if(v.key==="Escape"){v.stopPropagation(),_e="",Fe();return}v.key==="Enter"&&(v.preventDefault(),Hn())}function C(v){A("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Fe())}let p={onCopyPath:mn,onOpenDoc:en};function h(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function R(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function re(v){switch(v){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return v.length>0?`${v} `:""}}function ge(v){if(!v||typeof v!="object")return;let K=typeof v.status=="string"?v.status:"",L=typeof v.title=="string"?v.title:"";return K.length>0&&L.length>0?`${K} \xB7 ${L}`:void 0}function pt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function ut(){return t.depCandidates?t.depCandidates():null}async function Vt(v,K,L){let U=pt(),Se=d;if(!Se)return;if(U.length===0){ce("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let qe=await A(v,{a:Se,b:K,view_id:Se,root_dir:U},L),yt=qe===!0||qe!==!1&&qe.saved===!0;yt&&t.onDepChanged&&t.onDepChanged({type:v,a:Se,b:K}),v==="dep-add"&&yt&&(F="",J=!1),Fe()}function Ut(v){if(!d)return;let K=globalThis.confirm;typeof K=="function"&&!K(`${v}\uAC00 ${d}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Vt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(v){v.disabled||Vt("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Rn(v){F=v.target.value,J=!0,Fe()}function bn(){J||(J=!0,Fe())}function Yt(v,K){if(v.key==="Escape"){v.stopPropagation(),F="",J=!1,Fe();return}v.key==="Enter"&&(v.preventDefault(),K.length===1&&!K[0].disabled&&Gt(K[0]))}function An(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${F}
        @focus=${bn}
        @input=${Rn}
        @keydown=${K=>Yt(K,v)}
      />
      ${J||F.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(K=>c`<button
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
    </div>`}function hn(v,K){let L=K.get(v.id),U=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${kn(v.title)}
          @click=${()=>L===void 0?s(v.id):s(v.id,L)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${kn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${s?" detail-dep--link":""}`}
      >${U}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Ut(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function ar(v){let K=Array.isArray(v.dependencies)?v.dependencies:[],L=Array.isArray(v.dependents)?v.dependents:[],U=[];for(let Ke of K){let ft=h(Ke);ft.length>0&&R(Ke)==="blocks"&&U.push({id:ft,label:`\u26D3 \uB9C9\uB294 ${ft}`,kind:"pred",title:ge(Ke)})}for(let Ke of L){let ft=h(Ke);ft.length>0&&R(Ke)==="blocks"&&U.push({id:ft,label:`\u26D3 \uB9C9\uD788\uB294 ${ft}`,kind:"succ",title:ge(Ke)})}for(let Ke of K){let ft=h(Ke),yn=R(Ke);ft.length>0&&yn!=="blocks"&&U.push({id:ft,label:`${re(yn)}${ft}`,kind:"other",title:ge(Ke)})}let Se=ut(),qe=new Map;if(Se)for(let Ke of Se.issues)qe.has(Ke.bead_id)||qe.set(Ke.bead_id,Ke.root_dir);let yt=Se&&d?Pu(Du(d,Se),F):[];return c`
      <div class="detail-section-label">의존성</div>
      ${U.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${U.map(Ke=>hn(Ke,qe))}
          </div>`}
      ${Se===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:An(yt)}
    `}function Xn(v){let K=v.metadata||{},L=v.workflow||{},U=L.stages||{},Se=U.spec&&U.spec.stale,qe=U.impl&&U.impl.stale,yt=L.quick_fix_review?.state==="stale",Ke=U.plan||null,ft=L.route_source==="derived",yn=L.route||K.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ft?" detail-kv__v--derived":""}"
          title=${ft?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ft?"unset":yn}</span
        >
      </div>
      ${L.route!=="quick_fix"||Object.hasOwn(K,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${K.spec_review||"\uC5C6\uC74C"}${Se?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ke?.approval_receipt||"\uC5C6\uC74C"}${Ke?.approval_state==="stale"?" \xB7 stale":Ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${L.route!=="quick_fix"||Object.hasOwn(K,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${K.impl_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${L.resolver.attempt} \xB7 ${L.resolver.prior_sha} \u2192 ${L.resolver.sha}`}
              >${`${L.resolver.prior_sha.slice(0,7)} \u2192 ${L.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${L.route==="quick_fix"||Object.hasOwn(K,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${K.quick_fix_review||"\uC5C6\uC74C"}${yt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${L.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${L.planned_execution.kind}</span>
            </div>
            ${L.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${L.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${L.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(L.exec_receipt)}</span
            >
          </div>`:""}
      ${L.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${L.impl_entry.actor}@${L.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${K.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${K.pr_url}</span>
          </div>`:""}
    `}let f={route:["quick_fix","spec_backed","full_plan"]};async function g(v,K){let L=K.target.value;if(v==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&L!=="full_plan"&&!window.confirm(`full_plan \u2192 ${L||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Fe();return}await A("update-workflow-meta",{id:d,key:v,value:L},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Fe()}function w(v){let K=v.metadata||{};return c` ${((U,Se)=>{let qe=f[U],yt=typeof K[U]=="string"?K[U]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${U}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${U}
          data-edit=${`wfmeta-${U}`}
          @change=${Ke=>g(U,Ke)}
        >
          <option value="" ?selected=${!qe.includes(yt)}>
            ${Se}
          </option>
          ${qe.map(Ke=>c`<option value=${Ke} ?selected=${yt===Ke}>${Ke}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(v,K){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Z}
            @input=${vt}
            @keydown=${L=>Ot(L,xt,Et,!1)}
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
              @click=${Et}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${an(K).map(L=>c`<span class="detail-usage-total" title=${L.tooltip}
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
    `}function N(v){let K=on(v.created_at),L=on(v.updated_at);return!K&&!L?c``:c`
      ${K?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
      ${L?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
    `}function H(v,K){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sn}
        >
          ${wy.map(L=>c`<option value=${L} ?selected=${L===v}>${L}</option>`)}
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
          ${ky.map(L=>c`<option value=${String(L)} ?selected=${L===K}>
                P${L}
              </option>`)}
        </select>
      </div>
    `}function oe(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Bt}
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
              .value=${V}
              @input=${nn}
              @keydown=${K=>Ot(K,Cn,rn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Cn}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ee(v){let K=typeof v.notes=="string"?v.notes:"";return K.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${K}</div>
    `}function Ye(v){let K=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${K.map(L=>c`<span class="detail-label-chip"
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
    `}function nt(){if(!d)return c``;let v=u||{},K=String(v.id||d),L=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",U=We(),Se=v.status||"open",qe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",yt=v.description||"",Ke={...v,metadata:{...v.metadata||{},...m}};return c`
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
          ${$(L,U)}
          ${Sp(Ke,{onApplyRec:fe})}
          ${Ap({metadata:Ke.metadata,workspace_values:Ae(),catalog:st(),execution_defaults:he(),expanded:D,presets:M()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:k},{onToggle:ft=>{D=ft,Fe()},onEdit:(ft,yn)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){Qt(gn(ft,yn??""));return}Qt(jt(ft,yn??""))},onPresetSelect:ft=>{y=ft,k=[],Fe()},onPresetApply:()=>{Xe()}})}
          ${Lp({md:Ke.metadata,catalog:X,workspace_defaults:ie,handlers:{onExecChange:(ft,yn)=>Qt(jt(ft,yn))}})}
          ${H(Se,qe)} ${N(v)}
          ${oe(yt)}
          ${wp(Y,T,{expanded:ve,draft:se,sending:$e,error:E})}
          ${Ee(v)} ${Ye(v)} ${ar(v)}
          ${Xn(v)} ${w(v)}
          ${hp(v,p)}
          ${Np({expanded:ht,loading:Ve,error:z,data:ne},{onToggle:Nt})}
          ${Mp(wt(),He,{total:U,expanded:O},dt)}
        </div>
      </div>
    `}function Fe(){rt(nt(),e)}return{load(v){v!==d&&(m={},y="",k=[],D=!1,te(),we(),De(),Ft(),le()),d=v,u=null,!mt&&t.subscribeCandidates&&(mt=t.subscribeCandidates(()=>{d&&Fe()})),St(),lt(),ee!==v&&ue(v)},clear(){d=null,u=null,m={},y="",b=!1,k=[],D=!1,te(),we(),De(),Ft(),le(),$t(),je.close(),et.close(),rt(c``,e)},destroy(){ke&&(ke(),ke=null),Ze&&(Ze(),Ze=null),it&&(it(),it=null),$t(),document.removeEventListener("keydown",Kt),pe||(je.destroy(),Le&&Le.parentNode&&Le.parentNode.removeChild(Le)),et.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),d=null,u=null,le(),y="",b=!1,k=[],we(),De(),Ft(),rt(c``,e)}}}function Fp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,u,m="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=u||"An unrecoverable error occurred.");let y=typeof m=="string"?m.trim():"";if(o&&(y.length>0?(o.textContent=y,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var $y="(max-width: 640px)";function Bi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia($y),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function xy(){return{lanes:{done:!0},areas:{}}}function is(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Ay(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:is(r.lanes),areas:is(r.areas)}:{lanes:is(r),areas:{}}}catch{return null}}function jp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ui(e,t=xy()){let n={lanes:is(t.lanes),areas:is(t.areas)},r=Ay(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},jp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},jp(e,o),i}}}function Up(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(d=>typeof d=="string"&&d.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=si(o[i].scope,o[l].scope);if(a.length===0)continue;let d=o[i].member,u=o[l].member;n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a}),n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a})}return n}var Sy=["parallel","serial","candidate"];function Bp(e){return Sy.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function as(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function El(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Bp(r),a=Bp(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let d=Ey(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${as(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${as(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ey(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Tl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Wp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"};function Rl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Cl(e){for(let t of Rl(e))if(Object.hasOwn(Wp,t))return Wp[t];return null}function ls(e){let t=null;for(let n of Rl(e))Object.hasOwn(Tl,n)&&(t=Tl[n]);return t}function lo(e){let t=Cl(e),n=ls(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Hp(e,t){let n=Cl(e)??Cl(t),r=ls(t)??ls(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ty=new Set(["repo_operation_timeout_unresolved"]);function Cy(e){for(let t of Rl(e))if(Ty.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ry(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Gp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Cy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ry(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Tr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var zp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Kp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(zp,t.blocked_reason)?zp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=lo(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=lo(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Vp=160;function Oy(e){return e.length>Vp?`${e.slice(0,Vp)}\u2026`:e}function Ly(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${Oy(e.command)}</code>`:""}
  </div>`}function Iy(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Dy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Yp(e){let t=e.failure?lo(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Ly(e.failure.cause_detail,e.failure.reason)}
          ${Iy(e.failure.reason)}
          ${Fo({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Py(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var My=new Set(["codex-runner"]);function Ny(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&My.has(b.agent_type))),a=l.filter(b=>b&&b.state==="live"),d=l.filter(b=>b&&b.state!=="live"),u=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",m=r?wn(r.updated_at,t):"",y=u?`\uCD5C\uADFC \uD65C\uB3D9 ${u}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${wn(i,t)}</span
            >`:""}
      </div>`:y?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
        </div>`:""}${a.length>0||d.length>0?c`<div class="rtile__legs">
        ${a.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${d.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(b=>b.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}`}var qy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Fy(e){if(!e)return"";let t=qy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ol(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Pe=>Pe&&Pe.current===!0)||null,i=e.failed===!0,l=!!e.paused,a=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):l?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Dy(t-e.started_at):"\u2014",d=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=$o(e),m=an(e.usage),y=tr(e.usage),b=e.conflict_resolution?l?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,D=e.landing,q=e.attempt_id&&e.attempt_id===n,X=r.monitor||null,ie=Py(X),ee=X?fi(X.dependency_chips):"",B=Ny(X,t,l,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),P=o&&e.workflow?.chips?.exec_receipt||null,W=_i(e.workflow),Z=mi(e.rec),V=P?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(P)}`}
        >${`${P.kind}:${Bs(P)}`}</span
      >`:"",_e=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Ao(s)}</span
      >`:"",F=ie||W||_e||V||Z?c`<div class="rtile__meta">
          ${ie}${W}${_e}${V}${Z}
        </div>`:"",J=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,te=o?"":no(e),le=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${q?" rtile--sel":""}${l?" rtile--paused":""}${i?" rtile--failed":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${gi(e.priority)}${u?c`<span class="rtile__resumed" title=${u}>↻</span>`:""}${J}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${a}</span>`:""}${Fy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${a}</span>`}
        ${o?"":i?c`<button
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
                ${l?c`<button
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
    ${B}${e.rollup?Fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:wa}):""}
    ${D?c`<div class="rtile__landing">
          <span
            class="merge-step${D.failed?" merge-step--failed":""}"
            style=${`--progress: ${D.percent}%`}
            >${D.label}${D.index>0?c`<span class="merge-step__n"
                  >${D.index}/${D.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${ee}
    ${o?F:ie||W||d||Z||m.length>0||y?c`<div class="rtile__meta">
            ${ie}${W}${pi(e.exec_chips)}${Z}
            ${m.length>0?m.map(Pe=>c`<span class="worker-usage" title=${Pe.tooltip}
                      >${Pe.label}</span
                    >`):y?c`<span
                    class="worker-usage"
                    title=${So(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Fo(e)} ${te}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||l?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Xp(e,t=Date.now(),n=null,r=null){let o=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${o.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:o.map(s=>Ol(s,t,n,{monitor:r&&r.get(s.bead_id)||null}))}
  </div>`}var ln="",jy=["impl_runtime","impl_model","impl_effort"],By=["claude_account","codex_account"],Uy=5,Wi=1;function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(O=>ce(O,"error",4e3)),s={},i={},l=[],a=!1,d={state:"absent",values:{},warnings:[]},u={},m={},y=Promise.resolve(),b={claude:null,codex:null},k=!1,D=null,q={},X="",ie="",ee=!1,B=!1,P=!1,W=null,Z=!1;function V(){let O=t.queue?t.queue():null;return xn(O)?O:null}function _e(){let O=V();return O?O.runner_catalog:null}function F(){let O=V();return O&&xn(O.execution_defaults)?O.execution_defaults:null}function J(){let O=t.implPresetStore?.get();return xn(O)&&Array.isArray(O.presets)?O:null}function te(){return r===null?{}:{root_dir:r}}async function le(O,Q){return Z||!n?null:await n(O,Q)}function Pe(O){O&&xn(O.queue)&&t.onQueueAdopt?.(O.queue)}async function Ge(O,Q){let me=V();if(!me||Z)return null;let S=await le(O,{...Q,...te(),expected_revision:me.revision});if(Pe(S),r!==null&&S&&S.conflict){let G=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:V()?.revision??me.revision;S=await le(O,{...Q,...te(),expected_revision:G}),Pe(S)}return S}async function ue(){a=!0,We();try{let O=await le("get-session-defaults",{...te()});s=xn(O?.values)?{...O.values}:{},i={...s},l=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{a=!1,We()}}async function Y(){let O=eu(s,i);if(Object.keys(O).length!==0){try{let Q=await le("set-session-defaults",{values:O,...te()});s=xn(Q?.values)?{...Q.values}:{},i={...s},l=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}We()}}function Te(O,Q){if(!xn(O))return;let me=O.state;d={state:me==="usable"||me==="unusable"||me==="absent"?me:"absent",values:xn(O.values)?{...O.values}:{},warnings:Array.isArray(O.warnings)?O.warnings:[]},m={...d.values},Q&&(u={...m})}async function xe(){try{Te(await le("get-workspace-accounts",{...te()}),!0)}catch(O){d={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},u={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}We()}async function E(O){try{let Q=await fetch(O);if(!Q.ok)return null;let me=await Q.json();if(!xn(me)||!Array.isArray(me.accounts))return null;let S=me.accounts.filter(G=>xn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:S,active:S.find(G=>G.active===!0)||null}}catch{return null}}async function se(){k=!0;let[O,Q]=await Promise.all([E("/api/claude-usage"),E("/api/codex-usage")]);Z||(b={claude:O,codex:Q},We())}function $e(){let O={};for(let Q of By){let me=Object.hasOwn(u,Q)?u[Q]:null,S=Object.hasOwn(m,Q)?m[Q]:null;me!==S&&(O[Q]=me)}return O}async function be(){let O=$e();if(Object.keys(O).length!==0){try{Te(await le("set-workspace-accounts",{values:O,...te()}),!1)}catch(Q){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}We()}}function ve(O,Q){Q===ln?delete u[O]:u[O]=Q,We(),y=y.then(()=>be())}function we(O,Q){if(jy.includes(O)){bt(O,Q);return}Q===ln?delete i[O]:i[O]=Q,We(),Y()}function Oe(){let O=Nt().orchestration_model,Q=$n({global:{orchestration_model:O??void 0},execution_defaults:F(),runner_catalog:_e()}).orchestration_model.value;return Q?Nn(_e(),Q):null}function ze(O,Q){typeof Q=="string"&&Q.length>0?i[O]=Q:delete i[O]}function bt(O,Q){let me=Q===ln?void 0:Q,S=Qd({impl_runtime:O==="impl_runtime"?me:i.impl_runtime,impl_model:O==="impl_model"?me:i.impl_model,impl_effort:O==="impl_effort"?me:i.impl_effort},_e(),Oe());ze("impl_runtime",S.impl_runtime),ze("impl_model",S.impl_model),ze("impl_effort",S.impl_effort),We(),Y()}async function Ct(){let O=V();if(!O)return;let Q={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},me=tu(Q,{...Q,...q});if(Object.keys(me).length!==0){try{let S=await Ge("worker-queue-set-orchestration-defaults",{values:me});if(S&&S.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(S){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}}function ot(O,Q){q[O]=Q===ln?null:Q,We(),Ct()}function T(O){if(D=O,!O){We();return}let Q=_e(),me=Nt(),S=me.orchestration_model;S&&!Mo(Q,O).includes(S)&&(q.orchestration_model=null,S=null);let G=me.orchestration_effort;G&&!Pa(Q,O,S||Tn).includes(G)&&(q.orchestration_effort=null),We(),Ct()}async function pe(O){if(!(!V()||O<Wi)){try{await Ge("worker-queue-set-slots",{slots:O})}catch(Q){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}We()}}async function Le(O){if(!(!V()||O<Wi||O>Uy)){try{await Ge("worker-queue-set-serial-lane-count",{count:O})}catch(Q){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}We()}}async function je(O,Q){let me=O==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Ge(me,{on:Q})}catch(S){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}function Me(){let O={},Q=Nt();for(let me of Zs){let S=nr.includes(me)?Q[me]:i[me];typeof S=="string"&&S.length>0&&(O[me]=S)}return O}async function et(){let O=J();if(!O)return;let Q=Me();if(Object.keys(Q).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let me=(O.presets||[]).find(G=>G.id===X),S=ie.trim()||(me?me.name:"");if(!S){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=me?await le("impl-preset-update",{expected_revision:O.revision,id:me.id,name:S,settings:Q}):await le("impl-preset-create",{expected_revision:O.revision,name:S,settings:Q});if(G&&G.applied){if(ie="",!me&&Array.isArray(G.presets)){let Re=G.presets.find(He=>He.name===S);X=Re?Re.id:X}We()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function ht(){let O=J();if(!(!O||X.length===0))try{let Q=await le("impl-preset-delete",{expected_revision:O.revision,id:X});Q&&Q.applied?(X="",We()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(Q){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function Ve(O){s=xn(O.values)?{...O.values}:{},i={...s},l=Array.isArray(O.warnings)?O.warnings:[],xn(O.queue)&&(t.onQueueAdopt?.(O.queue),q={})}async function z(){let O=J(),Q=V();if(!O||!Q||X.length===0)return;let me=S=>({preset_id:X,expected_revision:O.revision,expected_queue_revision:S,...te()});try{let S=await le("apply-impl-preset-global",me(Q.revision));if(S&&S.applied&&Ve(S),r!==null&&S&&S.queue_applied===!1){let G=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:V()?.revision??Q.revision;S=await le("apply-impl-preset-global",me(G)),S&&S.applied&&Ve(S)}S&&S.applied?S.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}async function ne(){B=!0,P=!1,We();try{let O=await le("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?P=!0:W=O}catch{P=!0}finally{B=!1,We()}}function Ie(){if(ee=!ee,ee&&!W){ne();return}We()}function ct(){let O=so({loading:B,error:P});if(O)return O;if(!W)return"";let Q=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(me=>c`<div class="settings-dialog__sp-variant" data-variant=${me.key}>
            <div class="settings-dialog__sp-cond">${me.condition}</div>
            ${ir(me.label,me.system_prompt)}
          </div>`)}
    </div>`}function at(){return c`<section
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
        @click=${Ie}
      >
        ${ee?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${ee?ct():""}
    </section>`}function De(O,Q,me,S,G,Re,He){let Ae=G[O]??ln,lt=Ma(O,me,G,F(),_e(),He),st=lt.options.find(Je=>Je.value===Ae),he=Ae===ln?lt.full_value:st?.full_value;return c`<select
        class=${Ae===ln?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${Q}
        title=${he||""}
        ?disabled=${Re===!0||lt.disabled}
        .value=${Lr(String(Ae))}
        @change=${Je=>S(O,String(Je.target.value))}
      >
        <option value=${ln} ?selected=${Ae===ln}>
          ${lt.unset_label}
        </option>
        ${lt.options.map(Je=>c`<option
              value=${Je.value}
              title=${Je.full_value||""}
              ?selected=${Je.value===Ae}
            >
              ${Je.label}
            </option>`)}
      </select>
      ${Ae===ln?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ue(O,Q,me,S,G,Re=!1,He){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${De(O,Q,me,S,G,Re,He)}
      </span>
    </div>`}function dt(O,Q){let me=Q?Q.active:null;return xn(me)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${O==="claude"?me.email:ao({...me,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function tt(O,Q,me){let S=b[me],G=Object.hasOwn(u,O)?u[O]:ln,Re=me==="claude"?qi:ao,He=!!S?.accounts.some(Ae=>Ae.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Q}
          data-account-key=${O}
          @change=${Ae=>ve(O,String(Ae.target.value))}
        >
          <option value=${ln} ?selected=${G.length===0}>
            ${dt(me,S)}
          </option>
          ${G.length>0&&!He?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(Ae=>c`<option value=${Ae.key} ?selected=${Ae.key===G}>
                ${Re(Ae)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _t(){let O=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${O} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${O}`:null}function Pt(O,Q,me,S,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${De(me,`${O} \uBAA8\uB378`,S,we,i,!1)}
        ${De(G,`${O} effort`,ei,we,i,!1)}
      </span>
    </div>`}function Ft(O,Q,me,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${O}
          aria-pressed=${S?"true":"false"}
          aria-label=${Q}
          @click=${()=>je(O,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${me}</span>
      </span>
    </div>`}function Ht(O,Q,me,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${O}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>S(me-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${me}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>S(me+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(O){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${O.rows.length>0?`\uBCC0\uACBD ${O.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${O.rows.map(Q=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${O.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${O.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Nt(){let O=V(),Q={};for(let me of nr)Q[me]=Object.prototype.hasOwnProperty.call(q,me)?q[me]:O&&typeof O[me]=="string"?O[me]:null;return Q}function wt(){let O=_e(),Q=i.impl_runtime,me=i.impl_model,S=J(),G=V(),Re=Nt(),He=Mo(O,D),Ae=Jr(O,void 0).filter(ke=>ke!==Tn),lt=Pa(O,D,Re.orchestration_model||Tn).filter(ke=>ke!==Tn),st=X?(S?.presets||[]).find(ke=>ke.id===X):null,he=st?Jd(Me(),xn(st.settings)?st.settings:{}):null,Je=G&&typeof G.slots=="number"?G.slots:Wi+1,M=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Wi,j=F()?.supported===!0,ye=_t(),Xe=Ma("workflow_mode",Do,i,F(),O);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${ye?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ye}
          </div>`:""}
      ${j?"":c`<div
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
                .value=${Lr(X)}
                @change=${ke=>{X=String(ke.target.value),We()}}
              >
                <option value="" ?selected=${X===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map(ke=>c`<option
                      value=${ke.id}
                      ?selected=${ke.id===X}
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
                placeholder=${X?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Lr(ie)}
                @input=${ke=>{ie=String(ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${X?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${X?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${X.length===0}
                @click=${ht}
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
              ${Ue("orchestration_model","\uBAA8\uB378",He,ot,Re)}
              ${Ue("orchestration_effort","effort",lt,ot,Re)}
              ${Ue("orchestration_speed","\uC18D\uB3C4",Io,ot,Re)}
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
                      @click=${()=>we("workflow_mode",ln)}
                    >
                      ${Xe.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Do.map(ke=>c`<button
                          type="button"
                          data-mode=${ke}
                          aria-pressed=${String(i.workflow_mode===ke)}
                          @click=${()=>we("workflow_mode",ke)}
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
              ${Pt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Po,"spec_review_effort")}
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Js,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Po,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ue("impl_runtime","\uC704\uC784 \uB300\uC0C1",Qs,we,i)}
              ${Ue("impl_model","\uBAA8\uB378",Jr(O,Q),we,i)}
              ${Ue("impl_effort","effort",eo(O,Q,me),we,i)}
              ${Ue("impl_speed","\uC18D\uB3C4",Io,we,i)}
              ${Ue("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ae,we,i,!1,{...i,...Re})}
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
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Je,ke=>pe(ke))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",M,ke=>Le(ke))}
            </div>
            ${at()}
          `}
    `}function We(){Z||rt(wt(),e)}return{load(){q={};let O=[ue(),xe()];return k||O.push(se()),Promise.all(O).then(()=>{})},render:We,sessionDraft:()=>({...i}),destroy(){Z=!0,rt(c``,e)}}}function Hi(e){return c`<svg
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
  </svg>`}function Zp(){return Hi(yo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Qp(){return Hi(yo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Jp(){return Hi(yo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ef(){return Hi(yo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function tf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function nf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return an(Gs(t));let n={};for(let l of Vn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let d=!1;for(let u of Vn){let m=a[u];typeof m=="number"&&Number.isFinite(m)&&(n[u]+=m,r=!0,d=!0)}if(d){s+=1;let u=a.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(o+=u,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?tr(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ll(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Wy(e,t){if(!zn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function zy(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=$n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),o=Er(n,e.runner_catalog),s=_r(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function rf(e,t){let n=t.notify||(E=>ce(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let d=null,u=null,m=null,y=new Map;function b(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(se=>zn(se)):[]}function k(E){return b().find(se=>se.root_dir===E)||null}function D(E){return Wy(k(E),y.get(E))}function q(){for(let E of b()){let se=y.get(E.root_dir);se&&typeof se.revision=="number"&&typeof E.revision=="number"&&E.revision>=se.revision&&y.delete(E.root_dir)}}async function X(E,se,$e){let be=t.transport,ve=D(se);if(!(!be||!zn(ve))){try{let we=await be(E,{...$e,root_dir:se,expected_revision:ve.revision});if(zn(we?.queue)&&y.set(se,we.queue),we&&we.conflict){let Oe=zn(we.queue)&&typeof we.queue.revision=="number"?we.queue.revision:D(se)?.revision;we=await be(E,{...$e,root_dir:se,expected_revision:Oe}),zn(we?.queue)&&y.set(se,we.queue)}}catch(we){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}Y()}}function ie(E){d!==E&&(d=E,t.onFocusChange?.(d),Y())}function ee(E){ie(d===E?null:E)}function B(E){if(u===E){W();return}P(),u=E;let se=k(E);i.textContent=`${se?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,m=zi(a,{root_dir:E,queue:()=>D(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{y.set(E,$e),Y()}}),m.load(),Y()}function P(){m?.destroy(),m=null}function W(E){P(),u=null,o.hidden=!0,i.textContent="",E!==!0&&Y()}let Z=()=>W();l.addEventListener("click",Z);function V(E){E.key==="Escape"&&d!==null&&ie(null)}document.addEventListener("keydown",V);function _e(E,se){let $e=Math.max(se,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(be,ve)=>ve<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function F(E){let se=E.auto_advance===!0,$e=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?Qp():Zp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${$e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${$e?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${$e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Jp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${u===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${u===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${ef()}
      </button>`}function J(E){let se=zy(E);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function te(E){let se=[];for(let[$e,be]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let ve=Ll(E,$e);ve>0&&se.push(`${be} ${ve}`)}return se.join(" \xB7 ")}function le(E){let se=Ll(E,"running"),$e=typeof E.slots=="number"?E.slots:1;return c`<div
      class=${`mon2-deck__tile${d===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${d===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${$e}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${$e}</span>
          ${_e(se,$e)}
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
        <div class="mon2-deck__ops">${F(E)}</div>
        <span class="mon2-deck__counts">${te(E)}</span>
        ${J(E)}
      </div>
    </div>`}function Pe(E){let se=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",be=nf(Array.isArray(se)?se:[]),ve=we=>E.reduce((Oe,ze)=>Oe+Ll(ze,we),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${ve("running")} · 대기 ${ve("queue")} · PR
        ${ve("pr_wait")}${ve("session_active")>0?` \xB7 \uC138\uC158 ${ve("session_active")}`:""}
        · ${$e} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${be===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof be=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${tf($e)}
                  >${be}</span
                >`:be.map(we=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${we.provider}
                      title=${we.tooltip}
                      >${we.label}</span
                    >`)}
          </span>`}
    </div>`}function Ge(){let E=b();return E.length===0?"":c`${Pe(E)}
      <div class="mon2-deck__strip">
        ${E.map(se=>le(se))}
      </div>`}function ue(){d!==null&&!k(d)&&(d=null,t.onFocusChange?.(null))}function Y(){q(),ue(),u!==null&&!k(u)&&W(!0),rt(Ge(),r),m?.render()}function Te(E){let se=E.target;if(!se||typeof se.closest!="function")return;let $e=se.closest("[data-root-dir]");if(!$e)return;let be=$e.getAttribute("data-root-dir")||"",ve=se.closest("[data-act]")?.getAttribute("data-act");if(ve==="worker"){t.gotoWorkerTab?.(be);return}if(ve==="auto"){X("worker-automation-toggle",be,{on:D(be)?.auto_advance!==!0});return}if(ve==="merge"){X("worker-merge-auto-toggle",be,{on:D(be)?.auto_merge!==!0});return}if(ve==="gear"){B(be);return}ee(be)}function xe(E){if(E.key!=="Enter"&&E.key!==" ")return;let se=E.target;if(!se||typeof se.closest!="function")return;let $e=se.closest('[data-root-dir][role="button"]');!$e||$e!==se||(E.preventDefault(),ee($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Te),r.addEventListener("keydown",xe),{render:Y,focusRoot:()=>d,panelRoot:()=>u,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",Te),r.removeEventListener("keydown",xe),l.removeEventListener("click",Z),P(),rt(c``,r),e.replaceChildren()}}}var of="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Hy=1e4;function sf(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function af(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var uf="bdui.monitor.done-range",pf="bdui.monitor.running_sort",ff="bdui.monitor.candidate_sort",_f="beads-ui.monitor.candidate-filter",mf="beads-ui.monitor.sections";function Gy(){try{let e=window.localStorage.getItem(_f);if(!e)return{...ro};let t=JSON.parse(e);return!t||typeof t!="object"?{...ro}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ro.show_blocked,spec:Ya.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ro}}}function lf(e){try{window.localStorage.setItem(_f,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ky(){try{let e=window.localStorage.getItem(ff);return Ho.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Vy(e){try{window.localStorage.setItem(ff,e)}catch{}}function Yy(){try{let e=window.localStorage.getItem(mf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Xy(e){try{window.localStorage.setItem(mf,JSON.stringify(e))}catch{}}function Zy(){try{let e=window.localStorage.getItem(uf);return e===null?"today":Gn(e)}catch{return"today"}}function Qy(e){try{window.localStorage.setItem(uf,e)}catch{}}function Jy(){try{return window.localStorage.getItem(pf)==="repo"?"repo":"started"}catch{return"started"}}function ev(e){try{window.localStorage.setItem(pf,e)}catch{}}var gf="tab:monitor:pipeline",tv=1e3,cf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],nv=["queue","runnable","done"],df="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function rv(e){return e>=1&&e<=df.length?df[e-1]:`(${e})`}function bf(e,t){let n=qt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,d=t.router,u=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),y=Zy(),b=Jy(),k=Gy(),D=Ky(),q=Yy(),X=Ui("beads-ui.monitor.lane-collapsed"),ie=!1,ee=null,B=null,P=null,W=null,Z=[],V=null,_e=null,F=null,J=null;function te(f){return J===null&&(J=Jt()),Pd(f,J)}function le(f,g){Pe(),!(g<=0)&&(_e={lane_id:f,corrected:g},F=setTimeout(()=>{F=null,_e=null,he()},Hy))}function Pe(){F!==null&&(clearTimeout(F),F=null),_e=null}function Ge(){let f=Fr.find(g=>g.value===y);return f?f.label:""}let ue=document.createElement("div");ue.className="mon",e.appendChild(ue);let Y=document.createElement("div");Y.className="worker-drawer-overlay",Y.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host mon2-drawer",Y.append(Te,xe),e.appendChild(Y);let E=Go(null,null),se=new Map,$e=new Map,be=null,ve=null,we=null,Oe=io(xe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,Y.hidden=!0,he()}});async function ze(f,g,w,$,N=!0){if(!s||!w)return null;let H=await s(f,{...g,root_dir:w,expected_revision:$});if(H&&H.conflict&&N){H.queue&&$e.set(w,H.queue);let oe=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$;H=await s(f,{...g,root_dir:w,expected_revision:oe})}return H&&H.queue&&w&&$e.set(w,H.queue),H}function bt(f,g){let w=$e.get(f),$=o&&o.get?o.get():null,N=(Array.isArray($)?$:[]).find(oe=>oe?.root_dir===f);return(w||N)?.merge_queue?.find(oe=>oe.bead_id===g)?.continuation_action}async function Ct(f,g,w,$){let N=await ze(f,g,w,$),H=$e.get(w)?.revision??N?.queue?.revision??$;return er(N,(oe,Ee)=>ze(f,{...g,continuation:oe,decision_token:Ee},w,H,!1),{refresh:oe=>ze(f,g,w,oe?.queue?.revision??$e.get(w)?.revision??H,!1)})}async function ot(f,g,w,$){let N=await er({continuation_mismatch:$},(oe,Ee)=>ze("worker-merge-queue-add",{bead_id:g,continuation:oe,decision_token:Ee},f,w,!1)),H=N?.queue?.merge_queue?.find(oe=>oe.bead_id===g)?.continuation_action;N?.applied!==!0&&H?.continuation===null&&H.mismatch&&await ot(f,g,N.queue.revision,H.mismatch)}async function T(f,g,w){let $=await ze("worker-discard",f,g,w);if($&&$.discarded===!0){ce(ui($),"success",5e3);return}if($&&$.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function pe(f,g,w){return!s||!w?null:await s(f,{...g,root_dir:w})}async function Le(){let f=new Map;for(let g of E.pr_wait)f.has(g.root_dir)||f.set(g.root_dir,g.expected_revision);for(let[g,w]of f)await ze("worker-merge-queue-add-all",{},g,w)}function je(f){let g=q[f];return!!(g&&g.runnable===!0)}function Me(f){let g={...q[f]||{}};g.runnable=!g.runnable,q={...q,[f]:g},Xy(q),he()}function et(f){X.toggle(f),he()}function ht(f){X.toggleArea(f),he()}function Ve(f){let g=E.queue_groups.find(w=>w.root_dir===f);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let $=`s${w+1}`,N=g.sublanes.serial.find(H=>H.id===$);if(!N||N.raw_length===0&&N.occupied_by.length===0)return $}return null}function z(f,g){let w=E.queue_groups.find(N=>N.root_dir===f),$=w?w.sublanes.serial.find(N=>N.id===g):void 0;return $?$.raw_length:0}function ne(f,g){let w=se.get(f),$=se.get(g);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let N=sf(w),H=sf($);if(N!==null&&N===H&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let oe=af(w),Ee=af($);if(oe&&H!==null){let Ye=H;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:f,lane:Ye,index:z($.root_dir,Ye)}]}}if(N!==null&&Ee&&H===null){let Ye=N;return{kind:"ops",title:`${Ye} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ye,index:z(w.root_dir,Ye)}]}}if(oe&&N===null&&Ee&&H===null){let Ye=Ve(w.root_dir);return Ye===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ye} \uB808\uC778\uC5D0 ${g} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ye,index:0},{bead_id:f,lane:Ye,index:1}]}}return!oe&&!Ee?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:oe?{kind:"note",text:`${as($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${as(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ie(f,g){let w=ne(f,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:of,title:w.title}:{kind:"place",label:of,title:w.title}}}function ct(f,g){if(!W||W.bead_id!==f)return null;let w=W.counterpart_id,$=g.filter(N=>N.id===w);return $.length===0?null:{rows:$.map(N=>Ie(f,N))}}function at(f){let g=f.dependency_chips||null,w=f.overlap_chips||[],$=f.scope_state==="missing",N=f.cross_lane_chip,H=f.armed_lane_chip;if(!g&&w.length===0&&!$&&!N&&!H)return null;let oe=ct(f.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...N?{cross_lane:{lane_id:N.lane_id,label:N.label}}:{},...H?{armed_lane:H}:{},...oe?{popover:oe}:{}}}function De(f){let g=at(f);return g?{...f,dependency_chips:g}:f}async function Ue(f,g){let w=ne(f,g);if(W=null,w.kind!=="ops"){he();return}let $=mn(w.root_dir,w.ops[0].bead_id);for(let N of w.ops){let H=await dt(N,w.root_dir,$);if(H===null)break;$=H}he()}async function dt(f,g,w){try{let $=await ze("worker-queue-place",f,g,w,!1);if($&&$.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ce($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let N=$.queue?$.queue.revision:void 0;return typeof N!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):N}catch($){return ce(it($),"error"),null}}function tt(f){let g=je(f.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function _t(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${g}
    </div>`}function Pt(f){if(P!==f.id)return null;let g=E.queue_groups.find(H=>H.root_dir===f.root_dir),w=f.place_lanes||[],$=E.cross_lanes_revision!==null,N=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let H of E.chain_lanes)N.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});N.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of w)N.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:N}}function Ft(f){return _t(f,c`${Ua(De(f),Pt(f),{exec_chips_mode:"pinned_only",onOpenDoc:l?(g,w)=>l(w,f.root_dir):void 0})}`)}function Ht(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(f=>Ft(f))}
      </div>`:c`${E.runnable_sections.map(f=>{let g=je(f.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${tt({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(w=>Ft(w))}
            </div>`}
      </section>`})}`}function Mt(f,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
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
    </span>`}function Nt(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${g}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Fn(De(f),{actions:Mt(f,!0)})}
    </div>`}function wt(f,g,w,$){return c`<div
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
    </div>`}function We(f){let g=E.cross_lanes_revision!==null,w=te(f.lane_id),$=w?.held===!0,N=w?.cycle===!0,H=w?w.mismatched:[],oe=_e&&_e.lane_id===f.lane_id?_e.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${oe>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${oe}건 자동 교정</span
            >`:""}
        ${N?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Vs}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!g||!f.can_confirm||$}
              title=${$?Vs:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
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
        ${f.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((Ee,Ye)=>wt(f,Ee,Ye,H))}
      </div>
    </div>`}function O(f,g,w){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.id}
      data-row-index=${w}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Fn(De(g),{actions:Mt(g)})}
    </div>`}function Q(f){if(f.length===0)return"";let g=f.length-1;return`${f[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function me(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Fn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function S(f,g){let w=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(N=>me(N)),...g.items.map((N,H)=>O(g,N,H))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${w.map(N=>`${N.id} \u2014 ${N.badge}`).join(`
`)}
              >${Q(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(N=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${N.workspace_name}·${N.lane}과 교차 대기
                </div>`)}`}:{}}}function G(){let f=E.cross_lanes_revision!==null,g=E.chain_lanes.some(w=>w.draft&&w.rows.length===0);return bi({parallel:{rows:E.parallel_rows.map((w,$)=>Nt(w,$)),count:E.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(w=>w.sublanes.serial.map($=>({...S(w,$),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(w=>We(w)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!f}
          title=${f?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Re(f){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(g=>Ol({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},f,B,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:at(g)}}))}
    </div>`}function He(f){let g={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},w=$=>{let N=g[$.lane],H=$.lane==="runnable"?E.runnable_flat?N.length>0?Ht():void 0:E.runnable_sections.length>0?Ht():void 0:$.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?G():void 0:$.lane==="running"?Re(f):N.length>0?c`${N.map(oe=>Fn(oe))}`:void 0;return Yn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:N,count:N.length,src:$.lane==="runnable",empty:$.empty,body:H,live:$.lane==="running"&&N.length>0,collapsible:!0,collapsed:X.isCollapsed($.pane),controls:$.lane==="runnable"?Ae():void 0,header_control:lt($.lane,N.length)})};if(ie){let $=nv.map(N=>cf.find(H=>H.lane===N)).filter(N=>N!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${hi({live:E.running.length>0,running_body:E.running.length>0?Re(f):"",pr_wait_rows:E.pr_wait.map(N=>Fn(N)),count:E.running.length+E.pr_wait.length})}
            ${$.map(N=>w(N))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${cf.map($=>w($))}
        </div>
      </div>`}function Ae(){return c`<div class="worker-filter">
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
        ${Ya.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function lt(f,g){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${D}
      >
        ${Ho.map(w=>c`<option
              value=${w.value}
              ?selected=${D===w.value}
            >
              ${w.label}
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
      </select>`:f==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${Fr.map(w=>c`<option value=${w.value} ?selected=${y===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function st(f){let g=o&&o.get?o.get():null,w=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=f===void 0?o&&o.crossLanes?o.crossLanes():void 0:f,N={done_since:$r(y,u()),running_sort:b,candidate_filter:k,candidate_sort:D};return $!==void 0&&(N.cross_lanes=$),Go(g,w,N)}function he(){let f=u();E=st(),J=null,se=new Map;for(let g of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!g.non_occupying&&!se.has(g.id)&&se.set(g.id,g);rt(He(f),ue),M()?.render(),Je(),j()}function Je(){let f=new Map;for(let g of E.queue_groups)f.set(g.root_dir,g.auto_advance);for(let g of Array.from(ue.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=f.get(w);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function M(){if(we)return we;let f=ue.querySelector(".mon2-deck");return f?(we=rf(f,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:Ge,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:g=>{V=g,j()}}),we):null}function j(){ue.classList.toggle("has-focus",V!==null);for(let f of Array.from(ue.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V);for(let f of Array.from(ue.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=se.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",V!==null&&!!g&&g.root_dir===V)}for(let f of Array.from(ue.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",V!==null&&f.getAttribute("data-root-dir")===V)}function ye(f,g){let w=i?i():void 0;if(!g||!w||g===w||!a){r(f);return}a(g).then(()=>{r(f)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function Xe(f){if(!f)return;let g=i?i():void 0,w=()=>{try{d?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||g&&g===f){w();return}a(f).then(w).catch($=>{n("workspace switch for %s failed: %o",f,$),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ke(f){Sn(f).then(g=>{ce(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Ze(f){let g=se.get(f)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function it(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function mt(f,g,w){if(f!=="dep-add")return;let $=E.chain_lanes.find(N=>N.rows.some(H=>H.id===g));!$||!$.rows.some(N=>N.id===w)||await de(N=>Bd($.lane_id,N),"",[{type:f,a:g,b:w}])}function $t(){let f=new Map,g=o&&o.get?o.get():null,w=$=>Array.isArray($)?$.filter(N=>typeof N=="string"&&N.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let N=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[H,oe]of Object.entries(N))Array.isArray(oe)&&f.set(H,w(oe));for(let H of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&f.set(H.bead_id,w(H.blocked_by))}return f}function Kt(){let f=new Map,g=new Map,w=o&&o.get?o.get():null,$=N=>Array.isArray(N)?N.filter(H=>typeof H=="string"&&H.length>0):[];for(let N of Array.isArray(w)?w:[]){if(!N||typeof N!="object")continue;let H=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[oe,Ee]of Object.entries(H))Array.isArray(Ee)&&f.set(oe,$(Ee));for(let oe of Array.isArray(N.runnable)?N.runnable:[])oe&&typeof oe.bead_id=="string"&&Array.isArray(oe.blocked_by)&&g.set(oe.bead_id,$(oe.blocked_by))}for(let N of Z)for(let H of[f,g]){let oe=H.get(N.a);oe!==void 0&&H.set(N.a,N.type==="dep-remove"?oe.filter(Ee=>Ee!==N.b):oe.includes(N.b)?oe:[...oe,N.b])}return{snapshot:f,runnable:g}}function St(){let f=$t();for(let g of Z){let w=(f.get(g.a)||[]).slice();g.type==="dep-remove"?f.set(g.a,w.filter($=>$!==g.b)):w.includes(g.b)||f.set(g.a,[...w,g.b])}return f}function Jt(f=E,g=Ne()){let w=new Map;for(let nt of Array.isArray(g?.lanes)?g.lanes:[]){let Fe=new Map;for(let v of Array.isArray(nt?.entries)?nt.entries:[])v&&typeof v.bead_id=="string"&&Fe.set(v.bead_id,v.dep_created_by_lane===!0);w.set(typeof nt?.id=="string"?nt.id:"",Fe)}let $=new Map,N=new Map,H=new Set,oe=new Set;for(let nt of f.chain_lanes){let Fe=w.get(nt.lane_id);$.set(nt.lane_id,{status:nt.status,entries:nt.rows.map((v,K)=>({bead_id:v.id,root_dir:v.root_dir,...K===0?{}:{dep_created_by_lane:Fe?.get(v.id)===!0}}))});for(let v of nt.rows)N.set(v.id,nt.lane_id),v.fixed&&H.add(v.id),v.unplaced||oe.add(v.id)}let Ee=new Map;for(let nt of f.parallel_rows)typeof nt.queue_index=="number"&&Ee.set(nt.id,nt.queue_index);for(let nt of f.queue_groups)for(let Fe of nt.sublanes.serial)for(let v of Fe.items)typeof v.queue_index=="number"&&Ee.set(v.id,v.queue_index);let Ye=Kt();return{blocked_by_map:St(),snapshot_blocked_by:Ye.snapshot,runnable_blocked_by:Ye.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:$,owner_lane_of:N,fixed_members:H,placed_members:oe,parallel_rows:f.parallel_rows.map(nt=>({bead_id:nt.id,root_dir:nt.root_dir,queue_index:nt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:Ee}}function Ne(){return(o&&o.crossLanes?o.crossLanes():null)??null}function mn(f,g){let w=se.get(g);if(w&&w.root_dir===f)return w.expected_revision;let $=E.queue_groups.find(N=>N.root_dir===f);return $?$.revision:0}async function en(f,g,w){if(f.type==="worker-queue-disarm"){try{let $=await ze(f.type,f.payload,f.root_dir,w.get(f.root_dir)??mn(f.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&w.set(f.root_dir,$.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await jt(f.type,f.payload,f.root_dir,w,{bead_id:g})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await pe(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch($){return ce(it($),"error"),!1}}async function jt(f,g,w,$,N){try{let H=await ze(f,g,w,$.get(w)??mn(w,N.bead_id));return!H||typeof H.applied!="boolean"?(ce("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(H.queue&&typeof H.queue.revision=="number"&&$.set(w,H.queue.revision),H.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):H.applied===!1?(ce(H.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${H.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$.get(w)??0)}catch(H){return ce(it(H),"error"),null}}function Qt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(Z=[...Z,{type:f.type,a:f.a,b:f.b}])}async function gn(f,g){if(!s)return{ok:!1};try{let w=await s(f.type,{...f.payload,expected_revision:g});return!w||typeof w.revision!="number"?(ce("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,N=$&&$.code==="conflict"?$.details?.cross_lanes:null;return N&&typeof N.revision=="number"&&Array.isArray(N.lanes)?{ok:!1,conflict:N}:(ce(it(w),"error"),{ok:!1})}}async function fe(f,g,w){let $=new Map,N=[],H=f.ops.slice(0,f.lane_op_index),oe=f.ops.slice(f.lane_op_index);for(let Ye of H){if(!await en(Ye,w,$))return{done:!0};Qt(Ye)}let Ee=g;for(let Ye of f.lane_ops){if(Ee===null)return ce("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let nt=await gn(Ye,Ee);if(!nt.ok)return nt.conflict?{done:!1,conflict:nt.conflict}:{done:!0};Ee=nt.revision}for(let Ye of oe){if(!await en(Ye,w,$))return{done:!0};Qt(Ye),Ye.type==="dep-add"&&N.push(Ye)}for(let Ye of zd(N))Ee=await A(Ye,Ee);return{done:!0}}async function A(f,g){if(g===null||!s)return g;let w=f.pairs,$=g;for(let N=0;N<2;N+=1){if(w.length===0)return $;try{let H=await s("monitor-lane-provenance",{lane_id:f.lane_id,pairs:w.map(oe=>({bead_id:oe.bead_id,after:oe.after,value:!0})),expected_revision:$});return H&&typeof H.revision=="number"?H.revision:$}catch(H){let oe=H,Ee=oe&&oe.code==="conflict"?oe.details?.cross_lanes:null;if(!Ee||typeof Ee.revision!="number"||!Array.isArray(Ee.lanes))return $;let Ye=Ee.lanes.find(nt=>nt&&nt.id===f.lane_id);w=Hd(Array.isArray(Ye?.entries)?Ye.entries:[],w),$=Ee.revision}}return $}async function de(f,g,w=[]){Z=w,Pe();let $=E,N=Ne();for(let H=0;;H+=1){let oe=f(Jt($,N));if("refused"in oe){ce(oe.refused,"error");break}let Ee=await fe(oe,$.cross_lanes_revision,g);if(Ee.done){oe.correction&&le(oe.correction.lane_id,oe.correction.corrected);break}if(H>=1){ce("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=st(Ee.conflict),N=Ee.conflict}Z=[],he()}async function Ce(f,g){await de(w=>Oa(f,g,w),f.bead_id)}async function vt(f,g){if(f==="run"){await xt(g);return}if(f==="stop"){await Bt(g);return}if(f==="create"){await de(w=>La(null,w),"");return}if(f==="remove"){let w=Wd(g,Jt());if(w!==null&&!m(w))return;await de($=>Ud(g,$),"");return}await de(w=>f==="confirm"?Fd(g,w):jd(g,w),"")}function Et(f){let g=new Map;for(let w of f.rows){let $=E.owner_of[w.id]||w.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],w.id])}return g}async function xt(f){let g=E.chain_lanes.find(H=>H.lane_id===f);if(!g||E.cross_lanes_revision===null){he();return}Pe();let w=new Map,$=new Map,N=Et(g);for(let H of g.rows){if(!H.unplaced)continue;let oe=E.owner_of[H.id]||H.root_dir;if(typeof oe!="string"||oe.length===0){ce(`${H.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),he();return}let Ee=$.get(oe)??0;if(await jt("worker-queue-place",{bead_id:H.id,lane:"parallel",index:(E.parallel_raw_length[oe]??0)+Ee},oe,w,{bead_id:H.id})===null){he();return}$.set(oe,Ee+1)}for(let[H,oe]of N)if(await jt("worker-queue-arm",{bead_ids:oe,lane_id:f},H,w,{bead_id:oe[0]})===null){ce("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),he();return}he()}async function Bt(f){let g=E.chain_lanes.find($=>$.lane_id===f);if(!g||E.cross_lanes_revision===null){he();return}Pe();let w=new Map;for(let[$,N]of Et(g))if(await jt("worker-queue-disarm",{lane_id:f},$,w,{bead_id:N[0]})===null)break;he()}async function nn(f,g){let{root_dir:w,revision:$}=Ze(f);if(w.length===0){he();return}await jt("worker-queue-disarm",{bead_ids:[f],lane_id:g},w,new Map([[w,$]]),{bead_id:f}),he()}async function rn(f,g){let w=se.get(f);if(!w){he();return}let $={kind:"candidate",bead_id:f,root_dir:w.root_dir};if(g==="new-lane"){await de(N=>La({bead_id:f,root_dir:w.root_dir},N),f);return}if(g.startsWith("lane:")){let N=g.slice(5);if(!E.chain_lanes.find(oe=>oe.lane_id===N)){he();return}await de(oe=>Oa($,{kind:"chain",lane_id:N,marker_index:(oe.cross_lanes.get(N)?.entries??[]).length},oe),f);return}if(g.startsWith("serial:")){let N=g.slice(7),H=(w.place_lanes||[]).find(oe=>oe.id===N);await Ce($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:N,index:H?H.index:0});return}await Ce($,{kind:"parallel",marker_index:E.parallel_rows.length})}async function Cn(f,g){let w=E.parallel_rows,$=w.findIndex(nt=>nt.id===f);if($<0)return;let N=w[$].root_dir,H=[];w.forEach((nt,Fe)=>{nt.root_dir===N&&H.push(Fe)});let oe=H.indexOf($),Ee=H[oe+g];if(typeof Ee!="number")return;let Ye=g===-1?Ee:H[oe+2]??Math.min(w.length,Ee+1);await Ce({kind:"parallel",bead_id:f,root_dir:N,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:Ye})}async function Ot(f){for(let g of E.chain_lanes){let w=g.rows.find($=>$.id===f);if(w){await Ce({kind:"chain",bead_id:f,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}let sn=null,cn=!1,dn=null;function Hn(){dn!==null&&clearTimeout(dn),dn=setTimeout(()=>{dn=null,cn=!1},0)}function x(f,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&f.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return f.querySelectorAll("[data-row-index]").length}function C(f){let g=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:E.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function p(f){let g=f.target;if(!sn)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return C(g);let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:x(w,g)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:x(w,g)}};if($==="repo-serial"){let N=w.getAttribute("data-root-dir")||"";if(N!==sn.root_dir)return null;let H=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,oe=H&&w.contains(H)?H.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Ee=Number(oe);return{zone:w,target:{kind:"repo-serial",root_dir:N,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Ee)?Ee:0}}}return null}function h(){for(let f of Array.from(ue.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let R=null;function re(f){R=f.target instanceof Element?f.target:null}function ge(f){let g=f.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;if(w&&R&&w.contains(R)&&typeof R.closest=="function"&&R.closest("input, button, a")){f.preventDefault();return}let N=$.getAttribute("data-bead-id")||"",H=$.getAttribute("data-drag-kind")||"",oe=$.getAttribute("data-root-dir")||"";if(!N||!H||!oe)return;let Ee=$.getAttribute("data-queue-index")||"",Ye=Number(Ee),nt=$.getAttribute("data-lane-id")||"";sn={kind:H,bead_id:N,root_dir:oe,...Ee!==""&&Number.isFinite(Ye)?{queue_index:Ye}:{},...nt?{lane_id:nt}:{}},cn=!0,P=null,ue.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",N),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function pt(f){let g=p(f);g&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function ut(f){let g=f.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Vt(){sn=null,h(),ue.classList.remove("is-dragging"),Hn()}function Ut(f){let g=p(f),w=sn;sn=null,h(),ue.classList.remove("is-dragging"),!(!g||!w)&&(f.preventDefault(),Ce(w,g.target))}function Gt(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Rn(f,g){let{item:w,root_dir:$,revision:N}=Ze(g),H=w?.attempt_id||"",oe=f.classList;if(oe.contains("worker-mini__rowops-up")||oe.contains("worker-mini__rowops-down")){Cn(g,oe.contains("worker-mini__rowops-up")?-1:1);return}if(oe.contains("worker-mini__rowops-remove")){ze("worker-queue-remove",{bead_id:g},$,N);return}if(oe.contains("mon2-crow__detach")){Ot(g);return}if(oe.contains("worker-dep__open")){ye(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(oe.contains("mon2-arm__release")){nn(g,f.getAttribute("data-lane-id")||"");return}if(oe.contains("mon-lane__chip")){let Ee=f.getAttribute("data-lane-id")||"";ue.querySelector(`.mon2-clane[data-lane-id="${Ee}"]`)?.scrollIntoView({block:"nearest"});return}if(oe.contains("mon-overlap__chip")){let Ee=f.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===Ee?null:{bead_id:g,counterpart_id:Ee},he();return}if(oe.contains("mon-overlap__place")){Ue(g,f.getAttribute("data-counterpart-id")||"");return}if(oe.contains("worker-card__place")){P=P===g?null:g,he();return}if(oe.contains("worker-card__place-cancel")){P=null,he();return}if(oe.contains("worker-card__place-lane")){let Ee=f.getAttribute("data-lane")||"parallel";P=null,rn(g,Ee);return}if(oe.contains("rtile__session")){if(w&&w.kind==="session"){let Ee=(w.session_refs||[]).find(Ye=>Ye&&Ye.current===!0);Ee&&(Y.hidden=!1,Oe.open(Yr(Ee,g,"in_progress",$)),he());return}B=H,H&&w&&(Y.hidden=!1,Oe.open({attempt_id:H,root_dir:$,meta:Gt(w)})),he();return}if(oe.contains("rtile__pause")){pe("worker-attempt-pause",{attempt_id:H},$);return}if(oe.contains("rtile__resume")){Vr().then(Ee=>{if(Ee!==null)return Ct("worker-attempt-resume",{attempt_id:H,...Ee!==""?{instructions:Ee}:{}},$,N)});return}if(oe.contains("rtile__dismiss")){ze("worker-attempt-dismiss",{attempt_id:H},$,N);return}if(oe.contains("rtile__discard")){if(!m(jo(g,"unmerged")))return;T({bead_id:g,...H?{attempt_id:H}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(oe.contains("worker-mini__merge")){let Ee=bt($,g);Ee?.mismatch&&Ee.continuation===null?ot($,g,N,Ee.mismatch):ze("worker-merge-queue-add",{bead_id:g},$,N);return}if(oe.contains("worker-mini__merge-cancel")){ze("worker-merge-queue-remove",{bead_id:g},$,N);return}if(oe.contains("worker-mini__discard")){let Ee=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(jo(g,Ee)))return;T({bead_id:g,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(oe.contains("worker-mini__revise-fix")){Ct("worker-revise-fix",{bead_id:g},$,N);return}oe.contains("worker-mini__revise-approve")&&ze("worker-revise-approve",{bead_id:g},$,N)}function bn(f){let g=cn;cn=!1;let w=f.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){f.preventDefault();let U=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";U&&ke(U);return}let N=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(N){f.preventDefault();let L=N.getAttribute("data-root-dir")||se.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||N.getAttribute("title")||"";Xe(L);return}let H=w.closest(".mon2-sec__toggle");if(H){f.preventDefault(),Me(H.getAttribute("data-root-dir")||"");return}let oe=w.closest(".worker-pane__toggle[data-lane]");if(oe){f.preventDefault();let L=oe.getAttribute("data-lane")||"";(L==="candidate"||L==="queue"||L==="running"||L==="pr_wait"||L==="done")&&et(L);return}let Ee=w.closest(".worker-wait__area-toggle[data-area]");if(Ee){f.preventDefault(),ht(Ee.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){f.preventDefault(),vt("create","");return}let Ye=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ye){f.preventDefault();let L=Ye.getAttribute("data-lane-id")||"",U=Ye.classList;vt(U.contains("mon2-clane__confirm")?"confirm":U.contains("mon2-clane__reapply")?"reapply":U.contains("mon2-clane__run")?"run":U.contains("mon2-clane__stop")?"stop":"remove",L);return}if(w.closest(".mon-merge-all")){f.preventDefault(),Le();return}let nt=w.closest(".mon-filter__spec");if(nt){f.preventDefault(),k={...k,spec:nt.getAttribute("data-spec")||"all"},lf(k),he();return}let Fe=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Fe)return;let v=Fe.getAttribute("data-bead-id")||"",K=w.closest("button");if(K){f.preventDefault(),Rn(K,v);return}v&&!g&&(f.preventDefault(),ye(v,Fe.getAttribute("data-root-dir")||Ze(v).root_dir))}function Yt(f){let g=f.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){k={...k,show_blocked:w.checked},lf(k),he();return}let $=g.closest(".mon-candidate-sort");if($){D=Ho.some(oe=>oe.value===$.value)?$.value:"repo_spec",Vy(D),he();return}let N=g.closest(".mon-running-sort");if(N){b=N.value==="repo"?"repo":"started",ev(b),he();return}let H=g.closest(".mon-done-range");H&&(y=Gn(H.value),Qy(y),he())}function An(f){let g=f.target,w=g&&typeof g.closest=="function"?N=>g.closest(N):()=>null,$=!1;W&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,$=!0),$&&he()}function hn(f){f.key!=="Escape"||!W||(W=null,he())}e.addEventListener("click",bn),e.addEventListener("change",Yt),e.addEventListener("pointerdown",re),document.addEventListener("click",An),document.addEventListener("keydown",hn),e.addEventListener("dragstart",ge),e.addEventListener("dragover",pt),e.addEventListener("dragleave",ut),e.addEventListener("drop",Ut),e.addEventListener("dragend",Vt);{let f=!0;ee=Bi(g=>{if(ie=g,f){f=!1;return}he()})}o&&typeof o.subscribe=="function"&&(be=o.subscribe(()=>{try{$e.clear(),he()}catch{}}));function ar(){ve!==null&&(clearInterval(ve),ve=null)}function Xn(){dn!==null&&(clearTimeout(dn),dn=null)}return{recorrectSharedLane:mt,load(){n("load"),he(),ve===null&&(ve=setInterval(()=>{try{he()}catch{}},tv))},pause(){ar()},clear(){ar(),Xn(),be&&(be(),be=null),ee&&(ee(),ee=null),Oe.destroy(),Y.hidden=!0,we?.destroy(),we=null,e.removeEventListener("click",bn),e.removeEventListener("change",Yt),e.removeEventListener("pointerdown",re),document.removeEventListener("click",An),document.removeEventListener("keydown",hn),e.removeEventListener("dragstart",ge),e.removeEventListener("dragover",pt),e.removeEventListener("dragleave",ut),e.removeEventListener("drop",Ut),e.removeEventListener("dragend",Vt),e.replaceChildren()}}}function hf(e,t,n){let r=qt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(y){return b=>{b.preventDefault();let k=y==="monitor"&&a()==="monitor"?"worker":y;r("click tab %s",k),n.gotoView(k)}}function a(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function d(){let y=a();return c`
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
    `}function u(){let y=a();return c`
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
    `}function m(){o&&rt(d(),o),s&&rt(u(),s)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),o&&rt(c``,o),s&&rt(c``,s)}}}var yf=["bug","feature","task","epic","chore"];function vf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wf=["Critical","High","Medium","Low","Backlog"];function kf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),u=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){s.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",s.appendChild(P);for(let W of yf){let Z=document.createElement("option");Z.value=W,Z.textContent=vf(W),s.appendChild(Z)}i.replaceChildren();for(let W=0;W<=4;W+=1){let Z=document.createElement("option");Z.value=String(W);let V=wf[W]||"Medium";Z.textContent=`${W} \u2013 ${V}`,i.appendChild(Z)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(P){o.disabled=P,s.disabled=P,i.disabled=P,l.disabled=P,a.disabled=P,u.disabled=P,m.disabled=P,m.textContent=P?"Creating\u2026":"Create"}function q(){d.textContent=""}function X(P){d.textContent=P}function ie(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?s.value=P:s.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?i.value=W:i.value="2"}catch{s.value="",i.value="2"}}function ee(){let P=s.value||"",W=i.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function B(){q();let P=String(o.value||"").trim();if(P.length===0){X("Title is required"),o.focus();return}let W=Number(i.value||"2");if(!(W>=0&&W<=4)){X("Priority must be 0..4"),i.focus();return}let Z=String(s.value||""),V=String(a.value||""),_e={title:P};Z.length>0&&(_e.type=Z),String(W).length>0&&(_e.priority=W),V.length>0&&(_e.description=V),D(!0);try{await t("create-issue",_e)}catch{D(!1),X("Failed to create issue");return}ee(),D(!1),k()}return n.addEventListener("cancel",P=>{P.preventDefault(),k()}),y.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),B())}),r.addEventListener("submit",P=>{P.preventDefault(),B()}),{open(){r.reset(),q(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var ov=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function sv(e,t){return ya(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function $f(e,t,n){return c`
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
  `}function xf(e,t,n){return c`
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
  `}function Af(e,t){return c`
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
  `}var iv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Sf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(le=>ce(le,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,d="",u=null;function m(){if(u)return u;let le=i.querySelector('[data-pane="execution"]');return le?(u=zi(le,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Pe=>t.queueStore?.set?.(Pe)}),u):null}function y(){return c`
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
    `}function b(){let le=r.get();return c`
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
        ${le?c`
              ${$f(le,o(),X)}
              ${xf(le,d,{onDraft:Pe=>{d=Pe},onAdd:ie,onRemove:ee})}
              ${Af(le,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(le){let Pe=r.get();if(Pe)try{let Ge=await n("display-policy-set",{expected_revision:Pe.revision,policy:le(Pe)});D(Ge),Ge&&Ge.conflict&&Ge.policy&&(Ge=await n("display-policy-set",{expected_revision:Ge.policy.revision,policy:le(Ge.policy)}),D(Ge)),Ge&&Ge.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(le){le&&le.policy&&typeof le.policy=="object"&&r.set(le.policy)}function q(le){k(le)}function X(le){let Pe=r.get();if(!Pe)return;let Ge=!av(le,Pe);q(ue=>lv(le,ue,Ge))}function ie(){let le=d.trim();le.length!==0&&(d="",q(Pe=>Pe.hidden_prefixes.includes(le)?{hidden_prefixes:Pe.hidden_prefixes}:{hidden_prefixes:[...Pe.hidden_prefixes,le]}),P())}function ee(le){q(Pe=>({hidden_prefixes:Pe.hidden_prefixes.filter(Ge=>Ge!==le)}))}function B(le){let Pe=r.get();if(!Pe)return;let Ge=Pe.chips[le]===!1;q(()=>({chips:{[le]:Ge}}))}function P(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${iv.map(le=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${le.id}
                  aria-selected=${String(l===le.id)}
                  aria-controls=${`settings-pane-${le.id}`}
                  @click=${()=>W(le.id)}
                >
                  <span class="settings-dialog__glyph">${le.glyph}</span>
                  ${le.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${te}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${y()} ${b()}
          </div>
        </div>
      `,i),m()}function W(le){l=le,P()}let Z=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",Z),i.addEventListener("cancel",Z);let V=le=>{le.target===i&&te()};i.addEventListener("click",V);let _e=null;r.subscribe&&(_e=r.subscribe(()=>{a&&P()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{a&&u?.render()}));function J(le="execution"){a||(a=!0,t.onOpenChange?.(!0),l=le,d="",P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function te(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:J,close:te,sessionDraft:()=>u?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",Z),i.removeEventListener("cancel",Z),i.removeEventListener("click",V),_e&&(_e(),_e=null),F&&(F(),F=null),u?.destroy(),u=null,i.remove()}}}function av(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function lv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var cv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ef="usage-meter-card",dv="usage-meter-layer",Il=600,uv=["token_expired","relogin_required"];function Tf(e){return String(e).padStart(2,"0")}function pv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Cf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Tf(r.getHours())}:${Tf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${cv[r.getMonth()]} ${r.getDate()} ${s}`;return`${pv(n,t)} \xB7 ${l}`}function fv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Rf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Of(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Lf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Df(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function _v(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Df(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function mv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=_v(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Df(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function gv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=mv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Pf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function bv(e,t){return!e.held||Pf(e,t)<=Il?e:{...e,available:!1,windows:[],accounts:[]}}function If(e,t){return`${e}:${t}`}function Mf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function d(){rt(c``,e),e.hidden=!0,m()}function u(){if(a===null){let ue=e.ownerDocument;a=ue.createElement("div"),a.id=dv,a.className="usage-meter__layer",ue.body.appendChild(a)}return a}function m(){a!==null&&(rt(c``,a),a.remove(),a=null)}function y(ue){n!==ue&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",q),window.addEventListener("resize",D)),n=ue)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",q),window.removeEventListener("resize",D))}function k(ue){let Y=ue.target;Y&&(e.contains(Y)||a!==null&&a.contains(Y))||(b(),te())}function D(){te()}function q(ue){ue.key==="Escape"&&(b(),te())}function X(ue){n===ue?b():y(ue),te()}function ie(){b(),te()}async function ee(ue,Y){if(r.has(ue.key))return;let Te=If(ue.key,Y);r.set(ue.key,Y),i.delete(Te),te();let xe=null;try{xe=await(await fetch(ue.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Y})})).json()}catch{xe=null}if(t)return;if(r.delete(ue.key),!xe||xe.ok!==!0){let se=xe&&typeof xe.error=="string"&&xe.error.length>0?xe.error:"network_error";i.set(Te,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),te();return}let E=Array.isArray(xe.warnings)?xe.warnings.filter(se=>typeof se=="string"&&se.length>0):[];E.length>0&&i.set(Te,{kind:"warn",text:E.join(" \xB7 ")}),te(),await Ge()}function B(ue,Y,Te,xe){let E=Of(ue.pct),$e=`resets ${Cf(ue.resetsAt,xe)}${Y?` \xB7 ${Te}`:""}`;return c`<span
      class="usage-meter__window ${Rf(E)}"
      style=${`--progress: ${E}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${ue.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function P(ue,Y,Te){let xe=Pf(Y,Te),E=Y.available&&(Y.held||xe>Il),se=E?`${Math.floor(xe/60)}\uBD84 \uC804 \uCE21\uC815`:"",$e=Y.accounts.filter(Oe=>!Oe.active).length,be=`usage-meter__group${E?" usage-meter__group--stale":""}`,ve=c`<span class="usage-meter__provider"
        >${ue.label}</span
      >
      ${Y.available?Y.windows.map(Oe=>B(Oe,E,se,Te)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${$e>0?c`<span class="usage-meter__badge">+${$e}</span>`:""}`;if(Y.accounts.length===0)return c`<span
        class=${be}
        aria-label=${`${ue.label} usage`}
        >${ve}</span
      >`;let we=n===ue.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${be}`}
      aria-label=${`${ue.label} usage`}
      aria-expanded=${we?"true":"false"}
      aria-controls=${Ef}
      @click=${()=>X(ue.key)}
    >
      ${ve}
    </button>`}function W(ue,Y){return c`<span class="usage-meter" aria-label="Usage">
      ${ue.map(Te=>P(Te.provider,Te.snapshot,Y))}
    </span>`}function Z(ue,Y){let Te=Of(ue.pct),xe=Cf(ue.resetsAt,Y);return c`<span
      class="usage-meter__account-window ${Rf(Te)}"
      style=${`--progress: ${Te}%`}
    >
      <span class="usage-meter__account-key">${ue.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Te}%</span>
      <span class="usage-meter__account-reset"
        >${xe.length>0?`\u21BB ${xe}`:""}</span
      >
    </span>`}function V(ue,Y){return uv.includes(Y)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ue.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function _e(ue,Y,Te){let xe=Y.status==="ok",E=typeof Y.ageSeconds=="number"&&Y.ageSeconds>Il,se=i.get(If(ue.key,Y.number)),$e=r.get(ue.key),be=$e!==void 0,ve=$e===Y.number,we=["usage-meter__account"];return Y.active&&we.push("usage-meter__account--active"),xe||we.push("usage-meter__account--unavailable"),E&&we.push("usage-meter__account--stale"),c`<div class=${we.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${Y.email}
          >${Y.alias===null?Y.email:Y.alias}</span
        >
        ${Y.plan===null?"":c`<span class="usage-meter__account-tag">${Y.plan}</span>`}
        ${Y.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${Y.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${fv(Y.ageSeconds)}</span
            >`}
        ${Y.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{ee(ue,Y.number)}}
            >
              ${ve?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${xe?c`<div class="usage-meter__account-windows">
            ${Y.windows.map(Oe=>Z(Oe,Te))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(ue,Y.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function F(ue,Y,Te){let xe=Y.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ue.label} · 활성 ${xe} / 전체
        ${Y.accounts.length}
      </h2>
      ${Y.accounts.map(E=>_e(ue,E,Te))}
    </section>`}function J(ue,Y){return c`<div
      class="usage-meter__card"
      id=${Ef}
      role="dialog"
      aria-label=${`${ue.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${F(ue.provider,ue.snapshot,Y)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function te(){let ue=Date.now(),Y=[];for(let xe of Lf){let E=s.get(xe.key);E&&Y.push({provider:xe,snapshot:bv(E,ue)})}if(Y.length===0){b(),d();return}let Te=Y.find(xe=>xe.provider.key===n&&xe.snapshot.accounts.length>0);Te||b(),rt(W(Y,ue),e),e.hidden=!1,Te?le(Te,ue):m()}function le(ue,Y){let Te=u(),xe=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;Te.style.setProperty("--usage-meter-anchor-top",`${xe.bottom}px`),Te.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-xe.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${J(ue,Y)}`,Te)}async function Pe(ue){try{let Y=await fetch(ue.endpoint);return Y.ok?gv(await Y.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ge(){l+=1;let ue=l,Y=await Promise.all(Lf.map(async Te=>({provider:Te,read:await Pe(Te)})));if(!(t||ue!==l)){for(let Te of Y){let xe=Te.provider.key;if(Te.read.kind==="ok"){s.set(xe,Te.read.snapshot);continue}if(Te.read.kind==="empty"){s.delete(xe);continue}let E=s.get(xe);E!==void 0&&!E.held&&s.set(xe,{...E,held:!0})}te()}}return d(),Ge(),o=setInterval(()=>{Ge()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),b(),d()}}}function Nf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let o of t)o&&(o.kind??"implementation")==="implementation"&&n.set(o.bead_id,o.attempt_id);let r=new Map;for(let o of e.done||[])o&&typeof o.bead_id=="string"&&typeof o.added_at=="number"&&r.set(o.bead_id,o.added_at);return o=>{let s=n.get(o.bead_id)!==o.attempt_id,i=r.get(o.bead_id),l=typeof i=="number"&&i>0&&typeof o.finished_at=="number"&&i>=o.finished_at;return!s&&!l&&typeof o.dismissed_at!="number"}}var hv="worker-ineligible";function cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qf(e){return cs(e).includes(hv)}var yv="session-preferred",vv=["exclusive_machine","iterative_user_judgment","visual_verification"];function Ff(e,t){if(!cs(e).includes(yv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&vv.includes(n)?n:""}var wv="worker-serial";function Dl(e){return cs(e).includes(wv)}var Uf="bdui.worker.candidate_sort",ds=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Gi=Object.freeze({preset:"spec"}),Wf=3,zf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function jf(e){return ds.some(t=>t.id===e)}function Bf(e){let t=ds.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function kv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function us(e){return e&&"preset"in e?Bf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Bf("spec")}function Pl(e){return e&&"preset"in e?e.preset:null}function ps(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return jf(e)?{preset:e}:Gi}return ps(s)}if(!e||typeof e!="object")return Gi;let t=e;if(jf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Wf||!n.every(ma))return Gi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ds.find(s=>kv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Hf(){try{return ps(window.localStorage.getItem(Uf))}catch{return Gi}}function Ml(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}function Gf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ls,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ls[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Wf)}function Kf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Vf(e,t,n){let r=Array.isArray(e)?e.slice():[];return r.sort(Zc(us(t))),!n||n.size===0?r:[...r.filter(o=>!n.has(o.id)),...r.filter(o=>n.has(o.id))]}var Yf=new Set(["sh","bash","zsh","dash","ksh"]),Xf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Zf(e){let t=e.split("/");return t[t.length-1]||""}function $v(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Zf(n[0]);if(r!=="env")return Yf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Yf.has(Zf(o))}function xv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Av(e){let t=[],n=0;Xf.lastIndex=0;for(let r of e.matchAll(Xf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:xv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Qf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,d=null,u=!1;function m(P,W){return W?Av(P).map(Z=>Z.kind==="plain"?Z.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${Z.kind}"
            >${Z.text}</span
          >`):P}function y(){if(!o)return c``;let P=s==="ready"&&$v(i),W=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
              @click=${()=>ee()}
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
                  ${W.map((Z,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(Z,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){rt(y(),r)}async function k(){if(s!=="ready")return;let P=await Sn(i);ce(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function D(P){P.key==="Escape"&&o&&(P.preventDefault(),ee())}function q(){u||(document.addEventListener("keydown",D),u=!0)}function X(){u&&(document.removeEventListener("keydown",D),u=!1)}async function ie(P,W=null){let Z=++a;q(),o={...P},d=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let _e=t?t():"";if(!_e){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let F="/api/repo-ops-script?workspace="+encodeURIComponent(_e)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let J=await n(F),te=await J.json().catch(()=>({}));if(Z!==a)return;if((t?t():"")!==_e){ee();return}if(!J.ok||!te||te.ok!==!0){s="error",l=Sv(te&&typeof te.error=="string"?te.error:""),b();return}o={lane:te.lane,base_sha:te.base_sha,path:te.path,base_ref:te.base_ref},i=String(te.content),s="ready",b()}catch{if(Z!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function ee(){a+=1,X(),o=null,i="",b();let P=d;d=null,P?.isConnected&&P.focus()}function B(){ee(),r.remove()}return{open:ie,close:ee,destroy:B}}var Jf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Ev=new Set(["queued","running","retry_pending"]);function e_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let F=s();return typeof F.revision=="number"?F.revision:0}function l(F){t&&F&&F.queue&&typeof F.queue=="object"&&t.set(F.queue)}function a(){let F=s().workspace_info;return F&&typeof F=="object"?F:{}}function d(F,J){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${F}"
      >${J}</span
    >`}function u(F){if(typeof F!="number"||!Number.isFinite(F))return"";let J=F/6e4;return Number.isInteger(J)?`timeout ${J}\uBD84`:`timeout ${Math.round(F/1e3)}\uCD08`}function m(F){let J=u(F);return J?d("config",J):""}function y(F,J,te){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${te.script}
      @click=${le=>{o&&o({lane:F,base_sha:J.base_sha,path:te.script,base_ref:J.base_ref},le.currentTarget)}}
    ></button>`}function b(){let F=s().repo_operations;return Array.isArray(F)?F:[]}function k(){let F=a().repo_ops,J=F&&typeof F=="object"?F.repo_id:null;return typeof J=="string"&&J?J:null}function D(){return b().some(F=>F&&F.kind==="deploy"&&Ev.has(F.state))}function q(){let F=D(),J=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${F||J}
      title=${F?"\uBC30\uD3EC \uC9C4\uD589 \uC911":J?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{W()}}
    >
      배포 실행
    </button>`}function X(){let F=s().repo_ops_opt_out;return{verify:F?.verify===!0,deploy:F?.deploy===!0}}function ie(F,J){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!J}
        @change=${te=>{P(F,!te.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function ee(F){let J=typeof F.base_sha=="string"?F.base_sha:"",te=`${F.source_path||"repo-ops/config.toml"} @ ${F.base_ref||"?"}${J?`@${J.slice(0,7)}`:""}`,le=X(),Pe=!!F.verify&&le.verify,Ge=!!F.deploy&&le.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${te}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${F.verify?c`${y("verify",F,F.verify)}
              ${m(F.verify.timeout_ms)}
              ${Pe?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":F.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${F.verify?ie("verify",le.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ge?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${F.deploy?c`${y("deploy",F,F.deploy)}
              ${m(F.deploy.timeout_ms)}
              ${Ge?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):q()}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ge?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":F.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${F.deploy?ie("deploy",le.deploy):""}
      </div>
    </section>`}function B(F){let J=F.repo_ops&&typeof F.repo_ops=="object"?F.repo_ops:null;return J&&(J.status==="resolved"||J.status==="absent")?ee(J):J&&(J.status==="pending"||J.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${J.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${J.error_code?c` — <code>${J.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function P(F,J){if(!n)return;let te=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:J,expected_revision:i()});if(l(te),te&&te.conflict){let le=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:J,expected_revision:i()});l(le)}r()}async function W(){let F=k();if(!n||F===null)return;let J=await n("worker-repo-operation-deploy-run",{repo_id:F});if(l(J),!J||J.ok!==!0){let te=J&&typeof J.reason=="string"?J.reason:"",le=Object.hasOwn(Jf,te)?Jf[te]:te||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ce(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${le}`,"error")}else ce("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let Z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(F,J,te){return c`<div class="worker-repo-ops__policy-group" data-policy=${te}>
      <div class="worker-repo-ops__policy-label">${F}</div>
      <ul class="worker-repo-ops__policy-list">
        ${J.map(le=>c`<li data-token=${le}>
              ${Z[le]||le}
            </li>`)}
      </ul>
    </div>`}function _e(){let F=s(),J=F.repo_operation_policy&&typeof F.repo_operation_policy=="object"?F.repo_operation_policy:null;return J?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(J.worker_automatic||[]).length} · 금지
            ${(J.never_automatic||[]).length}</span
          >
        </summary>
        ${J.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${J.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",J.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",J.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${B(a())} ${_e()}
      </details>`}}}var r_=20,Tv=5,Cv=new Set(["failed","running","queued","retry_pending"]),t_={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Rv(e,t,n=r_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Ov(e){if(e.type==="cleanup")return!0;let t=e.operation;return Cv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Lv(e,t,n={}){let r=Rv(e,t,1/0),o=n.expanded===!0?r_:Tv,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Ov(l));return{visible:i,hidden:r.length-i.length}}function n_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Iv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function o_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?ii(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function s_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Dv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Pv(e,t){let n=Gp(e,t),r=Kp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Mv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Nv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${di(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${n_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(t_,n.kind)?t_[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${ai(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Tr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${n_(e)}"
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
      ${r?s_(Hp(n.failure_kind,o)):""}
      ${Pv(n,Dv(t,n))}
      ${Mv(n)}
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ai(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function qv(e){let t=e.cleanup,n=Cr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${di(e.at)||"\u2014"}</span
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
        ${vu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${s_(lo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?qv(r):Nv(r,e.repo_ops))}
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
  </section>`}function i_(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Lv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(Fv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var jv=qt("views:worker"),Bv="tab:worker:ready",Uv="tab:worker:blocked",Wv="tab:worker:in-progress",zv="tab:worker:resolved",Hv="tab:worker:closed",Ki=1,a_=5,Gv=new Set(["quick_fix","spec_backed","full_plan"]);function l_(e){return typeof e=="string"&&Gv.has(e)}var u_="beads-ui.worker.candidate-filter",Nl={show_blocked:!1,spec:"all"};function Kv(){try{let e=window.localStorage.getItem(u_);if(!e)return{...Nl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Nl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Nl}}}function Vv(e){try{window.localStorage.setItem(u_,JSON.stringify(e))}catch{}}function Yv(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),o=[],s=0,i=0;for(let l of e){let a=n(l),d=r(l);a&&d?o.push(l):!a&&d?s+=1:a&&!d&&(i+=1)}return{visible:o,hidden_blocked:s,hidden_spec:i}}var Xv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],p_="bdui.worker.done-range";function Zv(){try{let e=window.localStorage.getItem(p_);return e===null?"today":Gn(e)}catch{return"today"}}function Qv(e){try{window.localStorage.setItem(p_,e)}catch{}}function c_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Jv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ew(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var tw=2;function nw(e,t){let n=e?.release_info,o=(n&&typeof n=="object"&&Array.isArray(n.released_by)?n.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,d)=>(typeof d.closed_at=="number"?d.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let d=ku(e.id,a,t);d&&s.push(d)}if(s.length===0)return null;let i=s.slice(0,tw),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}var rw="\u{1F512} blocked";function d_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function ow(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function sw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function iw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function ql(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var aw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),lw=new Set(["waiting_metadata","reviewing","retrying"]);function cw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?on(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function dw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function uw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=dw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?ls(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!aw.has(e.phase)}}function pw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function fw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=pw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"||r.length>0;return e.auto_pending&&o?n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0}):e.conflicting?n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${d_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${d_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function _w(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,d=!0,u=null,m=null,y=null,b={},k=!1,D=!1,q={},X=null){let ie=!!a&&a.position>0,ee=!!a?.continuation_action&&a.continuation_action.continuation===null,B=!!a&&a.active===!0,P=a&&a.failure||null,W=sw(a?a.waiting:null),Z=n[e]||null,V=Z&&Z.gate?Z.gate:null,_e=Z&&Z.pr?Z.pr:null,F=iw(a?a.resolution:null),J=cw(y),te=uw(y,J),le=a&&a.authority||null,Pe=!!y&&typeof y=="object"&&lw.has(y.phase),Ge=ie&&!B&&(!le||Pe||le.source==="automatic"&&!D),ue=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":F?F.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,Y=!!V&&V.base_badge==="\uCDA9\uB3CC",Te=!!V&&V.enabled===!0,xe=Wo({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:q.repo_operations}),E=wi(xe),se=s&&!xe&&(s.queueing??null)?s.queueing:null,$e=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!V&&V.tier==="merged",be=r&&r.step==="repo_operations"&&xe?.failed===!0&&(xe.step==="deploy"||xe.step==="verify")?xe.step:null,ve=l&&!!r&&!!V&&V.tier==="merged",we=Ge&&(Te||Y||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||$e||ve),Oe=l&&Y&&d===!1,ze=qn(b,e,{external:l,merge_active:B||xe?.step==="merge",merge_queued:ie,conflict_active:!!i,cleanup_active:E,merged:!!r||V?.tier==="merged"}),bt=!!ze.operation,Ct=ie&&!P&&!ee&&!$e&&!(te&&te.lock_actions),ot=fw({auto_pending:Ct,continuation_required:ee,queueing:se,merge_step:xe,conflict_badge:ue,conflict_live:F?.live===!0||i==="running",auto_resolution:J,recovery:te,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:m,conflicting:Y,gate:V,receipt_check:Z&&Z.receipt_check?Z.receipt_check:null,queue_failure:P,auto_skip:u,queued:ie,queue_active:B,queue_position:a?a.position:0,activity:ue?null:s&&s.activity||null}),T=ot?.live===!0&&ot.title?c`<span title=${ot.title}>${ot.label}</span>`:ot?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&xe?.active!==!0?vi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...X?{dependency_chips:X}:{},external:l,pr_number:_e&&typeof _e.number=="number"?_e.number:null,pr_url:_e&&typeof _e.url=="string"?_e.url:"",completion_badge:ot?.live!==!0&&ot?.title?ot.label:null,completion_title:ot?.title||"",...y?.phase==="needs_human"&&typeof y.log_path=="string"&&y.log_path.length>0?{log_path:y.log_path}:{},badges:T?[T]:[],live_badge:ot?.live===!0?T:null,usage:o,alert:ot?.alert===!0,merge_action:V?.tier==="merged"&&!$e&&!ve?!1:!ie||ee||Ge,cancel_action:ie&&!ee,cancel_enabled:!B&&!(te&&te.lock_actions),cancel_title:te&&te.lock_actions?`${te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ze,discard_action:ze.action,merge_step:xe,discard_enabled:ze.enabled,discard_title:ze.title,merge_enabled:!xe&&!se&&!i&&!bt&&!m&&!(te&&te.lock_actions)&&!Oe&&(Te||Y||V?.reason==="base_behind"||V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"||V?.reason==="review_receipt_undetermined"||$e||ve||we||Pe&&!B),merge_label:ee?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":$e||ve?be==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":be==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":Y&&!xe&&!$e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":V?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":V?.reason==="review_receipt_missing"||V?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ge?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:bt?ze.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ze.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ze.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ee?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":se?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":xe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${xe.label}`:be?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${be==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Y?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":V?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Te?`\uBA38\uC9C0 (${V.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:V&&V.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${V&&V.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Fl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:d,doneRange:u,onDoneRangeChange:m}=t,y=r?Ds(r):null,b=null,k=Kv(),D=null,q=null,X={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ie=Hf(),ee=Pl(ie)===null,B=u?Gn(u):Zv(),P=new Map;function W(){let p=Fr.find(h=>h.value===B);return p?p.label:"\uC624\uB298"}let Z=Ui("beads-ui.worker.lane-collapsed"),V=!1,_e=new Set,F=new Set,J=new Set,te=new Set,le=new Set,Pe={},Ge=null,ue=0,Y=null,Te=[];function xe(p){return Ge===p?Pe:{}}async function E(){if(!n)return;let p=l?.()||"";if(Ge===p||Y&&Y.key===p&&Y.generation===ue)return;let h=++ue;Y={key:p,generation:h};let R=null;try{R=await Promise.resolve(n("get-session-defaults",{}))}catch(re){if(h!==ue)return;Y=null,jv("get-session-defaults failed: %o",re),Ne();return}h===ue&&(Pe=R&&typeof R.values=="object"&&R.values!==null?{...R.values}:{},Ge=p,Y=null,Ne())}function se(){Ge=null,ue+=1,E()}let $e=document.createElement("div");$e.className="worker-console";let be=document.createElement("div");be.className="worker-top";let ve=document.createElement("div");ve.className="worker-drawer-overlay",ve.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let Oe=document.createElement("div");Oe.className="worker-drawer-host";let ze=document.createElement("div");ze.className="worker-drawer-host",ze.hidden=!0,ve.append(we,Oe,ze);let bt=document.createElement("div");bt.className="worker-lanes-host",$e.append(be,ve,bt),e.appendChild($e);let Ct=null,ot=io(Oe,{transport:n,sessionLogStore:s,onClose:()=>{Ct=null,ve.hidden=!0,Ne()}}),T=i_(ze,{onClose:()=>{ze.hidden=!0,ve.hidden=!0,Ne()}}),pe=Qf({getWorkspacePath:l||(()=>"")}),Le=l&&l()||"",je=e_({queueStore:o,transport:n,onChanged:()=>Ne(),onOpenScript:(p,h)=>{pe.open(p,h)}});function Me(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ki,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(){let p=Me(),h=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,R=Array.isArray(p.serial_lanes)?p.serial_lanes:[],re=[];for(let pt of R){if(re.length>=h)break;!pt||typeof pt.id!="string"||!/^s[1-5]$/.test(pt.id)||!Array.isArray(pt.entries)||re.push({id:pt.id,label:`\uC9C1\uB82C ${pt.id.slice(1)}`,count:pt.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...re]}function ht(p){if(!D||!p.some(R=>R.id===D))return null;let h=et();return h?{bead_id:D,lanes:h}:null}function Ve(){let p=Me();return typeof p.revision=="number"?p.revision:0}function z(p){p&&p.queue&&o&&o.set(p.queue)}function ne(){let p=Me().queue;return Array.isArray(p)?p.length:0}async function Ie(p,h,R){if(!n)return;let re=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},...R===void 0?{}:{index:R},expected_revision:Ve()}),ge=await n("worker-queue-place",re());z(ge),ge&&ge.conflict&&await n("worker-queue-place",re()).then(z)}async function ct(p,h,R){if(!n)return;let re=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},to_index:R,expected_revision:Ve()}),ge=await n("worker-queue-reorder",re());z(ge),ge&&ge.conflict&&await n("worker-queue-reorder",re()).then(z)}async function at(p){if(!n)return;let h=await n("worker-queue-remove",{bead_id:p,expected_revision:Ve()});z(h),h&&h.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Ve()}).then(z)}async function De(p){if(!n||!p)return;let h=await n("worker-attempt-pause",{attempt_id:p});h&&h.paused===!1&&h.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Ue(p){if(!n||!p)return;let h=await Vr();if(h===null)return;let R=async(ge={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Ve(),...h!==""?{instructions:h}:{},...ge}),re=await R();z(re),re&&re.conflict&&(re=await R(),z(re)),re=await er(re,(ge,pt)=>R({continuation:ge,decision_token:pt}),{onResult:z,refresh:()=>R()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function dt(p){if(!n||!p)return;let h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ve()});z(h),h&&h.conflict&&(h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ve()}),z(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function tt(p,h,R=!0){if(!n)return null;let re=n,ge=await re(p,{...h,expected_revision:Ve()});return z(ge),ge&&ge.conflict&&R&&(ge=await re(p,{...h,expected_revision:Ve()}),z(ge)),ge}async function _t(p){if(!n||!p)return;let h=Me().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ft(p,h.mismatch);return}_e.add(p),Ne();let R;try{R=await tt("worker-merge-queue-add",{bead_id:p})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{_e.delete(p),Ne()}if(!(!R||R.applied)){if(R.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(ow(R.reason),"error",2400)}}async function Pt(p){if(!(!n||!p||F.has(p))){F.add(p),Ne();try{let h=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Ve()});z(h),h&&!h.retried&&!h.conflict&&h.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{F.delete(p),Ne()}}}async function Ft(p,h){let R=await er({continuation_mismatch:h},(ge,pt)=>tt("worker-merge-queue-add",{bead_id:p,continuation:ge,decision_token:pt},!1)),re=R?.queue?.merge_queue?.find(ge=>ge.bead_id===p)?.continuation_action;if(R?.applied!==!0&&re?.continuation===null&&re.mismatch){await Ft(p,re.mismatch);return}R&&R.applied===!1&&!R.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ht(p){if(!n)return;let h=await tt("worker-merge-auto-toggle",{on:p});!h||h.conflict||ce(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Mt(p){if(!n||!p)return;let h=await tt("worker-merge-queue-remove",{bead_id:p});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Nt(){await tt("worker-merge-queue-remove",{all:!0})}async function wt(p,h=null,R="unmerged",re=null){if(!n||!p)return;let ge=jo(p,R);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Ve()});if(z(ut),ut&&ut.conflict&&(ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...re?{operation_id:re}:{},expected_revision:Ve()}),z(ut)),ut&&ut.discarded===!0){ce(ui(ut),"success",5e3);return}if(ut&&ut.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${ut.reason}`,"error",2800);return}if(ut&&ut.accepted&&ut.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ut&&ut.accepted&&!ut.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${ut.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ut&&!ut.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(p,h,R){if(!(!n||!h||!R||te.has(h))){te.add(h),Ne();try{let re=await n(p,{bead_id:h,action_id:R,expected_revision:Ve()});z(re),re?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{te.delete(h),Ne()}}}async function O(p,h){if(!n||!h||J.has(h))return;J.add(h),Ne();let R;try{let re=async(ge={})=>await n(p,{bead_id:h,expected_revision:Ve(),...ge});R=await re(),z(R),R&&R.conflict&&(R=await n(p,{bead_id:h,expected_revision:Ve()}),z(R)),p==="worker-revise-fix"&&(R=await er(R,(ge,pt)=>re({continuation:ge,decision_token:pt}),{onResult:z,refresh:()=>re()}))}finally{J.delete(h),Ne()}if(!(!R||R.conflict)){if(R.ok){ce(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Q(p){if(!n)return;let h=await n("worker-automation-toggle",{on:p,expected_revision:Ve()});z(h),h&&h.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Ve()}).then(z)}async function me(p){if(!n||!p)return;let h=await n("worker-repo-operation-dismiss",{operation_id:p});z(h),h&&h.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function S(p){if(!n||!Number.isFinite(p))return;let h=Math.max(Ki,Math.floor(p)),R=await n("worker-queue-set-slots",{slots:h,expected_revision:Ve()});z(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Ve()}).then(z)}async function G(p){if(!n||!Number.isInteger(p)||p<1||p>a_)return;let h=Me(),R=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(p).reduce((pt,ut)=>pt+(Array.isArray(ut?.entries)?ut.entries.length:0),0),re=()=>({count:p,expected_revision:Ve()}),ge=await n("worker-queue-set-serial-lane-count",re());z(ge),ge&&ge.conflict&&(ge=await n("worker-queue-set-serial-lane-count",re()),z(ge)),ge&&ge.applied&&R>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Re="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function He(p,h){let R=El(p,h.id,X);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:R.kind==="note"?{kind:"note",text:R.text}:R.kind==="disabled"?{kind:"disabled",label:Re,title:R.title}:{kind:"place",label:Re,title:R.title}}}function Ae(p,h){if(!q||q.bead_id!==p)return null;let R=q.counterpart_id,re=h.filter(ge=>ge.id===R);return re.length===0?null:{rows:re.map(ge=>He(p,ge))}}async function lt(p,h){let R=El(p,h,X);if(q=null,R.kind!=="ops"){Ne();return}let re=Ve();for(let ge of R.ops){let pt=await st(ge,re);if(pt===null)break;re=pt}Ne()}async function st(p,h){if(!n)return null;try{let R=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:h});if(z(R),R&&R.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!R||R.applied!==!0)return ce(R&&typeof R.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${R.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let re=R.queue?R.queue.revision:void 0;return typeof re!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):re}catch(R){return ce(R instanceof Error&&R.message?R.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function he(){let p=Me(),h=y?y.selectBoardColumn(Bv,"ready"):[],R=y?y.selectBoardColumn(Uv,"blocked"):[],re=y?y.selectBoardColumn(Hv,"closed"):[],ge=y?y.selectBoardColumn(Wv,"in_progress"):[],pt=y?y.selectBoardColumn(zv,"resolved"):[],ut=Ms([...h,...R,...ge,...pt,...re]),Vt=new Map;for(let _ of[...h,...R,...ge])_&&_.id&&!Vt.has(_.id)&&Vt.set(_.id,_);let Ut={...xe(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let I=p[_];typeof I=="string"&&(Ut[_]=I)}function Gt(_,I){let ae=Vt.get(_);if(!ae)return null;let Be=ae.metadata&&typeof ae.metadata=="object"?ae.metadata:{},Qe=ae.workflow?.route,Xt=Be.route,Lt=l_(Qe)?Qe:l_(Xt)?Xt:null;return $n({pin:Be,global:Ut,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Lt,controller_runtime:I})}function Rn(_){let I=_.runner||null,ae=Gt(_.bead_id,I),Be=qo(_),Qe=ae?_r(ae,I):null;return Be||Qe?{orchestration:Be,worker:Qe}:null}let bn=new Map;function Yt(_){if(bn.has(_))return bn.get(_)??null;let I=Gt(_,null),ae=null;if(I){let Be=Nn(p.runner_catalog??null,I.orchestration_model.value??""),Qe=Be===null?I:Gt(_,Be),Xt=Er(Qe,p.runner_catalog??null),Lt=_r(Qe,Be);ae=Xt||Lt?{orchestration:Xt,worker:Lt}:null}return bn.set(_,ae),ae}let An=new Map;function hn(_){if(An.has(_))return An.get(_)??null;let I=Vt.get(_),ae=I&&I.metadata&&typeof I.metadata=="object"?I.metadata:null,Be=ae?to(ae):null;return An.set(_,Be),Be}function ar(_){let I=Ns(ut,_);return I.total===0?null:I}let Xn=p.bead_titles||{},f=new Map;for(let[_,I]of Object.entries(Xn))typeof I=="string"&&I.length>0&&f.set(_,I);for(let _ of[...h,...R])f.set(_.id,_.title||_.id);let g=new Map;for(let _ of[...h,...R,...ge,...pt,...re])_&&_.id&&typeof _.from_id=="string"&&g.set(_.id,_.from_id);let w=new Map;for(let _ of[...h,...R,...ge,...pt,...re])_&&_.id&&typeof _.priority=="number"&&w.set(_.id,_.priority);let $=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},N=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},H=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},oe=new Map;for(let[_,I]of Object.entries(N))Array.isArray(I)&&oe.set(_,Dl(I));for(let _ of[...h,...R]){let I=_.labels;Array.isArray(I)&&!oe.has(_.id)&&oe.set(_.id,Dl(I))}let Ee=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Ye=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},nt=new Map;for(let[_,I]of Object.entries($))I&&typeof I=="object"&&nt.set(_,I);for(let _ of[...h,...R])nt.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Fe=_=>nt.get(_)||{},v=p.pr_wait||[],K=p.pr_observations||{},L=p.pr_activity||{},U=p.cleanup_failed||{},Se=Object.entries(U).map(([_,I])=>({bead_id:_,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})),qe=p.queue||[],yt=new Set([...qe.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(I=>I.bead_id)),...v.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),Ke=new Set(R.map(_=>_.id)),ft=new Set,yn=[];for(let _ of[...h,...R])yt.has(_.id)||ft.has(_.id)||Jv(_)||(ft.add(_.id),yn.push(_));let x_=Vf(yn,ie,Ke),A_=p.admission||{},Wl=_=>{let I=A_[_];if(!I)return"";if(I.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof I.reason=="string"?I.reason:"",Be=ae.indexOf(":");return Be>0&&Be<ae.length-1?`\u26D4 ${ae.slice(0,Be)} (${ae.slice(Be+1)})`:`\u26D4 ${ae}`},zl=new Map,S_=Date.now(),E_=x_.map(_=>{let I=Wr(_),ae=I.evidence==="published",Be=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Qe=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Xt=Object.hasOwn(_,"labels")&&qf(_.labels),Lt=Xt||!Object.hasOwn(_,"labels")?"":Ff(_.labels,_.metadata),Mr=Lt.length>0,Tt=!Xt&&(Be?Qe:ae&&!I.conflict),ws=Ke.has(_.id),Zn=[];if(ws){let ks=ew(_);ks.length>0?zl.set(_.id,ks):Zn.push(rw)}Be&&!Qe?Zn.push("missing_description"):!Be&&I.conflict?Zn.push("spec_id_conflict"):!Be&&I.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Be&&I.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Nr=Wl(_.id);Nr&&Zn.push(Nr);let po=nw(_,S_),fo=_.dependents_info&&typeof _.dependents_info=="object"?$u(_.dependents_info):null;return{id:_.id,title:_.title||_.id,reason:Zn.join(" \xB7 "),draggable:!1,queue_placeable:Tt,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Be,status:_.status,worker_ineligible:Xt,session_preferred:Mr,session_preferred_reason:Lt,blocked:ws,has_spec:ae,exec_chips:Yt(_.id),rec:hn(_.id),from_id:_.from_id||void 0,priority:w.get(_.id),...po||fo?{dependency_chips:{...po?{released:po}:{},...fo?{dependents:fo}:{}}}:{}}}),Vi=Yv(E_,k),Yi=Vi.visible,T_=p.revise_parked||{},fs=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},C_=_=>{let I=H[_]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Xi=(_,I)=>_.map((ae,Be)=>{let Qe=I!=="done",Xt=I!=="done"&&I!=="queue",Lt=Qe?T_[ae.bead_id]:null,Mr=Qe?qn(fs,ae.bead_id):null,Tt=Mr?.operation?Mr:null,ws=Qe&&oe.get(ae.bead_id)===!0,Zn=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,Nr=Qe?gu(Zn,!!Tt||te.has(ae.bead_id)):null,po=Qe&&!Nr?Wl(ae.bead_id):null,fo=Qe?[po]:[],ks=[];return{id:ae.bead_id,title:f.get(ae.bead_id)||ae.bead_id,reason:fo.filter(Boolean).join(" \xB7 "),draggable:Qe&&!Tt&&!Nr,done:I==="done",lane:I,seq:Xt?Be+1:void 0,worker_serial:ws,discard:Tt,stale_work:Nr,badges:[...ks,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...I==="done"?li(p.attempts||{},ae.bead_id):[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!Tt&&!J.has(ae.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:I==="done"?Ln(p.attempts||{},ae.bead_id):null,work_ms:I==="done"?ci(p.attempts||{},ae.bead_id):null,done_at:I==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,exec_chips:Qe?Yt(ae.bead_id):null,rec:hn(ae.bead_id),workflow:Qe&&H[ae.bead_id]||null,...I==="done"?C_(ae.bead_id):{},from_id:g.get(ae.bead_id)||void 0,priority:w.get(ae.bead_id),...Fe(ae.bead_id)}}),Ir=p.attempts?Object.values(p.attempts).filter(Sr):[],Zi=new Set;for(let _ of Ir)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Zi.add(_.resumed_from);let Hl=new Map;for(let _ of Ir)Hl.set(_.bead_id,_.attempt_id);let co=new Map;for(let _ of Ir)co.set(_.attempt_id,_);function Qi(_){let I=new Set,ae=_;for(;ae&&!I.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;I.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&co.get(ae.resumed_from)||null}return!1}let _s=typeof p.declared_base=="string"?p.declared_base:null;function R_(_){let I=null;for(let ae of Ir)!ae||ae.bead_id!==_||Qi(ae)||(I===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof I.started_at=="number"?I.started_at:0))&&(I=ae);return I&&typeof I.target_base=="string"?I.target_base:null}let Ji=[],ms=[],O_=Nf(p),Gl=_=>{let I=typeof _.session_id=="string"&&_.session_id.length>0,ae=Zi.has(_.attempt_id);return{eligible:I&&!ae,reason:I?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dn=null;for(let _ of Ir){let I=_.status==="paused"&&!Zi.has(_.attempt_id);if(_.status==="running"||I)ms.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:I,conflict_resolution:Qi(_),base_exception:ql(_s,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:qn(fs,_.bead_id,{attempt_id:_.attempt_id}),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:Ln(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:le.has(_.bead_id),exec_chips:Rn(_),rec:hn(_.bead_id),...Fe(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&O_(_)){let ae=Gl(_);Ji.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(fs,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:Qi(_),base_exception:ql(_s,_.target_base),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:Ln(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:le.has(_.bead_id),exec_chips:Rn(_),rec:hn(_.bead_id),...Fe(_.bead_id)}),Dn=_}}let Kl=new Set([...Ji,...ms].map(_=>_.bead_id)),Vl=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let I=_&&_.bead_id;if(!(typeof I!="string"||I.length===0||Kl.has(I))){if(Kl.add(I),Array.isArray(_.blocked_by)){let ae=_.blocked_by.filter(Be=>typeof Be=="string"&&Be.length>0);ae.length>0&&Vl.set(I,ae)}ms.push({bead_id:I,attempt_id:null,kind:"session",title:_.title||f.get(I)||I,status:"in_progress",started_at:Mn(_.started_at)??Mn(_.updated_at),updated_at:Mn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:w.get(I),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:hn(I),usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Ji,...ms].map(_=>{let I=co.get(_.attempt_id),ae=I?.quickfix_landing;if(I?.quickfix_lane!==!0||!ae||typeof ae!="object")return _;let Be=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,Qe=Wo({bead_id:I.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:Be?{step:ae.cursor,reason:Be}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Qe?{..._,landing:Qe}:_}),Yl=null;if(Dn){let _=Gl(Dn),I=Dn.cause_detail;Yl={bead_id:Dn.bead_id,repo:Dn.repo||"",reason:Dn.cause||Dn.status,cause_detail:I&&typeof I.reason=="string"?{reason:I.reason,command:typeof I.command=="string"?I.command:null}:null,resume_attempt_id:Dn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:qn(fs,Dn.bead_id,{attempt_id:Dn.attempt_id})}}let Xl=new Set(Dr.map(_=>_.bead_id)),ea=Array.isArray(p.merge_queue)?p.merge_queue:[],Zl=new Map,Ql=new Map,Jl=new Map,ec=new Map;ea.forEach((_,I)=>{_&&typeof _.bead_id=="string"&&(Zl.set(_.bead_id,I+1),Ql.set(_.bead_id,_.resolution),Jl.set(_.bead_id,_.continuation_action||null),ec.set(_.bead_id,_.authority||null))});let Pr=p.merge_queue_state||{active:null,failures:{}},L_=Pr.failures||{},tc=Pr.waiting&&typeof Pr.waiting.bead_id=="string"&&typeof Pr.waiting.reason=="string"?Pr.waiting:null,I_=p.auto_merge_skips||{},nc=_=>{let I=I_[_];if(!I)return null;let ae=K[_],Be=ae&&ae.pr?ae.pr.head_sha:null;return Be&&Be===I.head_sha?I.reason||"":null},gs=new Map;for(let _ of Dr)_.failed!==!0&&_.conflict_resolution&&(_.paused?gs.has(_.bead_id)||gs.set(_.bead_id,"paused"):gs.set(_.bead_id,"running"));let rc=Dr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,oc=(p.workspace_info||{}).slots,sc=typeof oc=="number"?oc:typeof p.slots=="number"?p.slots:Ki,D_=rc>sc,bs=$r(B),P_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>bs===void 0||typeof _.added_at!="number"||_.added_at>=bs).sort((_,I)=>(I.added_at||0)-(_.added_at||0)),uo=Xi(P_,"done"),M_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),ic=[],N_=l?.()||"";for(let _ of re){let I=Mn(_.closed_at);if(typeof _.id!="string"||M_.has(_.id)||I===null||bs!==void 0&&I<bs||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ae=`${N_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Be=P.get(ae);if(Be===void 0&&n&&(P.set(ae,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Qe=>{let Xt=Array.isArray(Qe)&&Qe.some(Lt=>Pi(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");P.set(ae,Xt?"session":"not-session"),Ne()}).catch(()=>{P.set(ae,"failed"),Ne()})),Be==="session"){let Qe=Mn(_.started_at);ic.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Qe!==null&&I>=Qe?I-Qe:null,work_kind:"session",done_at:I,created_at:_.created_at,updated_at:_.updated_at})}}uo.push(...ic),uo.sort((_,I)=>(I.done_at||0)-(_.done_at||0));let hs={};for(let _ of Vn)hs[_]=0;let ac=!1,lc=0,ta=0,cc=0;for(let _ of uo){let I=_.usage;if(I&&typeof I=="object"){let ae=!1;for(let Be of Vn)Number.isFinite(I[Be])&&(hs[Be]+=I[Be],ac=!0,ae=!0);ae&&(ta+=1,Number.isFinite(I.total_cost_usd)&&(lc+=I.total_cost_usd,cc+=1))}}ta>0&&cc===ta&&(hs.total_cost_usd=lc);let dc=uo.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),q_=dc.length>0?an(Gs(dc)):ac?tr(hs):null,uc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},pc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],fc=_=>{if(v.some(Be=>Be.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let I=Ir.filter(Be=>Be&&Be.bead_id===_),ae=I.length>0?I[I.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ys=pc.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,I)=>{let ae=uc[_.id]||{},Be=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(Tt=>Tt&&typeof Tt.bead_id=="string"&&typeof Tt.after=="string").map(Tt=>[Tt.bead_id,Tt.after])),Qe=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(Tt=>typeof Tt=="string"):[],Xt=new Set(Qe),Lt=Xi(_.entries.filter(Tt=>!Xl.has(Tt.bead_id)&&!Xt.has(Tt.bead_id)),_.id).map(Tt=>Be.has(Tt.id)?{...Tt,badges:[`\u{1F517} ${Be.get(Tt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Tt.badges]}:Tt),Mr=Qe.map(Tt=>({id:Tt,title:f.get(Tt)||Tt,draggable:!1,lane:_.id,ghost:!0,badges:[fc(Tt)]}));return{id:_.id,index:I+1,rows:[...Mr,...Lt],occupied:Qe.length>0,badge:Qe.length>0?fc(Qe[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),_c=typeof p.serial_lane_count=="number"?p.serial_lane_count:ys.length,na=Xi(qe.filter(_=>!Xl.has(_.bead_id)),"queue"),mc=new Map,gc=new Set;for(let[_,I]of Object.entries(uc)){if(!/^s[1-5]$/.test(_))continue;let ae=I&&Array.isArray(I.occupied_by)?I.occupied_by:[];for(let Be of ae)typeof Be=="string"&&mc.set(Be,_);ae.length>0&&gc.add(_)}let lr=[];for(let _ of Dr)typeof _.bead_id=="string"&&lr.push({id:_.bead_id,title:f.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:mc.get(_.bead_id)??null});for(let _ of v){let I=_&&_.bead_id;typeof I!="string"||I.length===0||lr.push({id:I,title:f.get(I)||I,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of ys)for(let I of _.rows)I.ghost!==!0&&lr.push({id:I.id,title:I.title,location_label:`${_.id} #${I.seq??""}`.trim(),kind:"serial",lane_id:_.id});na.forEach((_,I)=>{lr.push({id:_.id,title:_.title,location_label:`#${I+1}`,kind:"parallel",lane_id:null})});for(let _ of Yi)lr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:_.queue_placeable===!0});let bc={};for(let _ of pc)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(bc[_.id]=_.entries.length);let ra=new Map;for(let _ of lr)ra.has(_.id)||ra.set(_.id,_);X={members_by_id:ra,serial_raw_lengths:bc,serial_lane_count:_c,occupied_lanes:gc};let F_=Up(p.bead_scope,lr),vs=new Map;for(let[_,I]of Vl)vs.set(_,I);for(let[_,I]of zl)vs.set(_,I);for(let[_,I]of Object.entries(Ee))Array.isArray(I)&&vs.set(_,I.filter(ae=>typeof ae=="string"&&ae.length>0));let j_=xu(vs,lr,Ye),oa=(_,I=null)=>{let ae=F_.get(_),Be=j_.get(_)||null,Qe=ae&&ae.overlaps.length>0?ae.overlaps:null,Xt=!!ae&&ae.scope_missing;if(!Be&&!Qe&&!Xt)return I;let Lt=Qe?Ae(_,Qe):null;return{...I||{},...Be?{predecessors:Be}:{},...Qe?{overlaps:Qe}:{},...Xt?{scope_missing:!0}:{},...Lt?{popover:Lt}:{}}},sa=_=>{let I=oa(_.id,_.dependency_chips||null);return I&&(_.dependency_chips=I),_};for(let _ of na)sa(_);for(let _ of ys)for(let I of _.rows)I.ghost!==!0&&sa(I);for(let _ of Yi)sa(_);let hc=new Map;for(let _ of Dr){let I=typeof _.bead_id=="string"?_.bead_id:"";if(I.length===0)continue;let ae=_.kind==="session",Be=oa(I),Qe=typeof _.attempt_id=="string"&&_.attempt_id.length>0?co.get(_.attempt_id):void 0,Xt=Qe&&Qe.last_activity&&typeof Qe.last_activity=="object"?Qe.last_activity:null,Lt=Qe&&Array.isArray(Qe.legs)?Qe.legs:[];!Be&&!Xt&&Lt.length===0&&!ae||hc.set(I,{...Xt?{last_activity:Xt}:{},...Lt.length>0?{legs:Lt}:{},...Be?{dependency_chips:Be}:{}})}let B_=v.map(_=>_w(_.bead_id,f.get(_.bead_id)||_.bead_id,K,U[_.bead_id]||null,Ln(p.attempts||{},_.bead_id),L[_.bead_id]||(_e.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:F.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),gs.get(_.bead_id)||null,_.external===!0,{position:Zl.get(_.bead_id)||0,active:Pr.active===_.bead_id,failure:L_[_.bead_id]||null,waiting:tc?.bead_id===_.bead_id?tc.reason:null,resolution:Ql.get(_.bead_id),continuation_action:Jl.get(_.bead_id),authority:ec.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?nc(_.bead_id):null,ql(_s,R_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},co.get(Hl.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},oa(_.bead_id))).map(_=>({..._,workflow:H[_.id]||null,priority:w.get(_.id),...Fe(_.id)}));return{queue:p,idToTitle:f,candidates:Yi,candidate_hidden:{blocked:Vi.hidden_blocked,spec:Vi.hidden_spec},running:Dr,live_count:rc,slots:sc,over_cap:D_,failure:Yl,waiting:na,serial_lanes:ys,serial_lane_count:_c,running_overlays:hc,pr_wait:B_,merge_queue_length:ea.length,merge_queue_running:ea.length>0,auto_excluded:v.map(_=>_.bead_id).filter(_=>nc(_)!==null),declared_base:_s,done:uo,token_total:q_,cleanup_failures:Se,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Je(p){let h=p.waiting.length>0?p.waiting[0].id:"\u2014",R=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=ke(p),ge=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",pt=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,ut=pt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${pt}건 진행 중</span
          >`:"",Vt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${W()} 완료 <b>${p.done.length}</b></span
      >`,Ut=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Gt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ki}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:a_},(Yt,An)=>An+1).map(Yt=>c`<option
                value=${String(Yt)}
                ?selected=${p.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,Rn=Yp({failure:p.failure}),bn=mu(p.repo_operations,p.cleanup_failures);return V?c`<div class="worker-ribbon">
          ${R} ${re}
          <div class="worker-kpi worker-kpi--ribbon">
            ${ge}${ut}${Vt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Gt}</div>
          <div class="worker-kpi">${Ut}</div>
        </div>
        ${bn}${je.template()}${Rn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${re}${Gt}</div>
        <div class="worker-kpi">
          ${ge}${ut}${Vt}${Ut}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${W()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Yt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Yt.tooltip}
                >${W()} 완료 · 누적 ${Yt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${bn}${je.template()}${Rn}`}function M(p){let h=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Xv.map(R=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${k.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function j(){let p=ee?"custom":Pl(ie)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${p}
    >
      ${ds.map(h=>c`<option value=${h.id} ?selected=${p===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${p==="custom"}>
        사용자 지정…
      </option>
    </select>`}function ye(){let p=us(ie);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let R=p[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${R?R.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!R}>없음</option>`}
            ${zf.map(re=>c`<option
                  value=${re.key}
                  ?selected=${!!R&&R.key===re.key}
                >
                  ${re.label}
                </option>`)}
          </select>
          ${R?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${R.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${R.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Xe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${Fr.map(p=>c`<option value=${p.value} ?selected=${B===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ke(p){let h=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${h?" is-active":""}"
        title=${h?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${h?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(h)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(p.auto_excluded),re=p.pr_wait.filter(ge=>ge.merge_action&&ge.merge_enabled&&!R.has(ge.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function Ze(p){if(!(p.draggable!==!0||p.done===!0))return c`<span class="worker-mini__rowops">
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
    </span>`}function it(p){return bi({parallel:{rows:p.waiting.map(h=>Fn(h,{actions:Ze(h)})),count:p.waiting.length,collapsed:Z.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(h=>({id:h.id,title:`\uC9C1\uB82C ${h.index}`,rows:h.rows.map(R=>Fn(R,{actions:Ze(R)})),count:h.rows.length,empty:h.rows.length===0,badge:h.badge,held:h.occupied,cycle:h.cycle})),collapsed:Z.isAreaCollapsed("serial")}})}function mt(p){return Xp(p.running,Date.now(),Ct,p.running_overlays)}function $t(p){return p.running.some(h=>h.kind!=="session"&&!h.paused&&h.failed!==!0)}function Kt(p){let h=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:j(),header_row:ee?ye():void 0,controls:M(p),collapsible:!0,collapsed:Z.isCollapsed("candidate"),place_menu:ht(p.candidates),onOpenDoc:d?(re,ge)=>d(ge):void 0}),R=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Xe(),collapsible:!0,collapsed:Z.isCollapsed("done"),preview:V?Array.isArray(p.token_total)?p.token_total.map(re=>re.label).join(" \xB7 "):p.token_total||c_(p.done):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${hi({live:$t(p),running_body:p.running.length>0?mt(p):"",pr_wait_rows:p.pr_wait.map(re=>Fn(re)),count:p.running.length+p.pr_wait.length})}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:Z.isCollapsed("queue"),preview:c_(p.waiting),body:it(p)})}
        ${h} ${R}
      </div>`:c`<div class="worker-lanes">
      ${h}
      ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:Z.isCollapsed("queue"),body:it(p)})}
      ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:$t(p),collapsible:!0,collapsed:Z.isCollapsed("running"),body:mt(p)})}
      ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:Z.isCollapsed("pr_wait")})}
      ${R}
    </div>`}function St(p){Z.toggle(p),Ne()}function Jt(p){Z.toggleArea(p),Ne()}function Ne(){let p=he();rt(Je(p),be),rt(Kt(p),bt)}function mn(){let p=!0,h=Bi(R=>{if(V=R,p){p=!1;return}Ne()});Te.push(h)}let en=null;function jt(p){en=p.target instanceof Element?p.target:null}function Qt(p){let R=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;if(en&&R.contains(en)&&en.closest("input, button, a")){p.preventDefault();return}let re=R.dataset.beadId||"",ge=R.dataset.lane||"";b={bead_id:re,from_lane:ge},$e.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",re),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function gn(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;let R=h.dataset.lane||"";R!=="queue"&&!/^s[1-5]$/.test(R)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function fe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function A(){$e.classList.remove("is-dragging")}function de(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;p.preventDefault(),h.classList.remove("worker-pane--drag-over"),$e.classList.remove("is-dragging");let R=h.dataset.lane||"",re=b?.bead_id||p.dataTransfer?.getData("text/plain")||"",ge=b?.from_lane||"";if(b=null,!re)return;let pt=p.target?.closest?.(".worker-mini, .worker-card"),ut=R==="queue"&&h.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||h,Vt=Array.from(ut.querySelectorAll(".worker-mini, .worker-card")),Ut=Vt.length;if(pt){let Gt=Vt.indexOf(pt);Gt>=0&&(Ut=Gt)}if(Ut=Math.max(0,Ut-ut.querySelectorAll(".worker-mini--ghost").length),h.classList.contains("worker-pane--collapsed")&&(Ut=ne()),R==="queue"||/^s[1-5]$/.test(R)){let Gt=R==="queue"?"parallel":R;ge===R?ct(re,Gt,Ut):Ie(re,Gt)}}function Ce(p){k=p,Vv(p),Ne()}function vt(p){if(p==="custom"){ee=!0,Ne();return}ie=ps(p),Ml(ie),ee=!1,Ne()}function Et(p){ie=ps({chain:p}),Ml(ie),Ne()}function xt(p){B=Gn(p),Qv(B),m?.(B),Ne()}function Bt(p){let h=p.target?.closest?.(".worker-serial-lane-count");if(h){let Ut=Number.parseInt(h.value,10);Number.isFinite(Ut)&&G(Ut).then(Ne);return}let R=p.target?.closest?.(".worker-filter__blocked");if(R){Ce({...k,show_blocked:R.checked});return}let re=p.target?.closest?.(".worker-sort-chain__key");if(re){let Ut=Number.parseInt(re.getAttribute("data-step")||"",10);Number.isFinite(Ut)&&Et(Gf(us(ie),Ut,re.value));return}let ge=p.target?.closest?.(".worker-done-range");if(ge){xt(ge.value);return}let pt=p.target?.closest?.(".worker-sort");if(pt){vt(pt.value);return}let ut=p.target?.closest?.(".worker-slots__input");if(!ut)return;let Vt=Number.parseInt(ut.value,10);if(!Number.isFinite(Vt)){Ne();return}S(Vt).then(Ne)}function nn(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rn(){let p=he(),h=Me().workspace_info,R=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:R}}function Cn(){Ct&&ot.close(),ze.hidden=!1,ve.hidden=!1,T.open(rn()),Ne()}function Ot(p){let h=Me(),R=h.attempts?h.attempts[p]:null;Ct=p,T.close(),ze.hidden=!0,ve.hidden=!1,ot.open({attempt_id:p,meta:nn(R)}),Ne()}function sn(p){let h=Me(),R=(Array.isArray(h.session_active)?h.session_active:[]).find(ge=>ge&&ge.bead_id===p),re=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(ge=>ge&&ge.current===!0);re&&(T.close(),ze.hidden=!0,ve.hidden=!1,ot.open(Yr(re,p,"in_progress")),Ne())}function cn(){if(T.isOpen()&&T.refresh(rn()),!Ct)return;let p=Me(),h=p.attempts?p.attempts[Ct]:null;if(h){ot.updateMeta(nn(h));return}ot.close()}function dn(p,h){if(p.length===0||!i)return;let R=l?l():void 0;if(h.length===0||!R||h===R||!a){i(p);return}Promise.resolve(a(h)).then(()=>{i(p)}).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Hn(p){let h=p.target;if(h?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let R=h?.closest?.(".worker-sort-chain__dir");if(R){let U=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(U)&&Et(Kf(us(ie),U));return}let re=h?.closest?.(".worker-dep__open");if(re){dn(re.getAttribute("data-dep-id")||"",re.getAttribute("data-root-dir")||"");return}let ge=h?.closest?.(".mon-overlap__chip");if(ge){let U=ge.closest("[data-bead-id]"),Se=U&&U.getAttribute("data-bead-id")||"";if(Se){let qe=ge.getAttribute("data-overlap-id")||"";q=!!q&&q.bead_id===Se&&q.counterpart_id===qe?null:{bead_id:Se,counterpart_id:qe},Ne()}return}let pt=h?.closest?.(".mon-overlap__place");if(pt){let U=pt.closest("[data-bead-id]"),Se=U&&U.getAttribute("data-bead-id")||"";Se&&lt(Se,pt.getAttribute("data-counterpart-id")||"");return}if(h?.closest?.(".mon-overlap__popover"))return;if(h?.closest?.(".worker-repo-strip")){Cn();return}let ut=h?.closest?.(".worker-repo-op__dismiss");if(ut){me(ut.dataset.operationId||"");return}let Vt=h?.closest?.(".worker-cleanup__resume");if(Vt){let U=Vt.dataset.beadId;U&&Pt(U);return}let Ut=h?.closest?.(".worker-banner__resume");if(Ut){let U=Ut.dataset.attemptId;U&&Ue(U);return}let Gt=h?.closest?.(".worker-banner__discard");if(Gt){let U=Gt.dataset.confirmation==="merged"?"merged":"unmerged";wt(Gt.dataset.beadId||"",Gt.dataset.attemptId||null,U,Gt.dataset.operationId||null);return}let Rn=h?.closest?.(".worker-banner__dismiss");if(Rn){let U=Rn.dataset.attemptId;U&&dt(U);return}if(h?.closest?.(".worker-play")){Q(!Me().auto_advance);return}let bn=h?.closest?.(".worker-merge-all");if(bn){bn.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?Ht(!1):Nt():Ht(!0);return}let Yt=h?.closest?.(".worker-pane__toggle[data-lane]");if(Yt){let U=Yt.dataset.lane;(U==="candidate"||U==="queue"||U==="running"||U==="pr_wait"||U==="done")&&St(U);return}let An=h?.closest?.(".worker-wait__area-toggle[data-area]");if(An){let U=An.dataset.area;(U==="parallel"||U==="serial")&&Jt(U);return}let hn=h?.closest?.(".worker-card__place-lane");if(hn){let U=hn.dataset.beadId,Se=hn.dataset.lane;U&&(Se==="parallel"||/^s[1-5]$/.test(Se||""))&&(D=null,Ne(),Ie(U,Se));return}if(h?.closest?.(".worker-card__place-cancel")){D=null,Ne();return}let Xn=h?.closest?.(".worker-card__place");if(Xn){let U=Xn.dataset.beadId;U&&!Xn.disabled&&(et()?(D=U,Ne()):Ie(U,"parallel"));return}let f=h?.closest?.(".worker-filter__chip");if(f){let U=f.dataset.spec;(U==="all"||U==="with"||U==="without")&&Ce({...k,spec:U});return}let g=h?.closest?.('[data-action="queue-remove"]');if(g){let U=g.dataset.beadId||"";U&&at(U);return}let w=h?.closest?.(".worker-mini__merge");if(w){let U=w.dataset.beadId||"";Me().cleanup_failed?.[U]?Pt(U):_t(U);return}let $=h?.closest?.(".worker-mini__merge-cancel");if($){Mt($.dataset.beadId||"");return}let N=h?.closest?.(".worker-mini__discard");if(N){wt(N.dataset.beadId||"",N.dataset.attemptId||null,N.dataset.discardMode==="merged"?"merged":"unmerged",N.dataset.operationId||null);return}let H=h?.closest?.(".worker-mini__stale-continue");if(H){We("worker-stale-work-continue",H.dataset.beadId||"",H.dataset.actionId||"");return}let oe=h?.closest?.(".worker-mini__stale-backup");if(oe){We("worker-stale-work-backup-fresh",oe.dataset.beadId||"",oe.dataset.actionId||"");return}let Ee=h?.closest?.(".worker-mini__stale-recheck");if(Ee){We("worker-stale-work-recheck",Ee.dataset.beadId||"",Ee.dataset.actionId||"");return}let Ye=h?.closest?.(".worker-mini__revise-fix");if(Ye){O("worker-revise-fix",Ye.dataset.beadId||"");return}let nt=h?.closest?.(".worker-mini__revise-approve");if(nt){O("worker-revise-approve",nt.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let U=h?.closest?.(".rtile"),Se=U?.dataset?.beadId,qe=U?.dataset?.attemptId;Se&&wt(Se,qe||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let Se=h?.closest?.(".rtile")?.dataset?.attemptId;Se&&dt(Se);return}if(h?.closest?.(".rtile__pause")){let Se=h?.closest?.(".rtile")?.dataset?.attemptId;Se&&De(Se);return}if(h?.closest?.(".rtile__resume")){let Se=h?.closest?.(".rtile")?.dataset?.attemptId;Se&&Ue(Se);return}if(h?.closest?.(".rtile__session")){let U=h?.closest?.(".rtile"),Se=U?.dataset?.attemptId;if(Se){Ot(Se);return}let qe=U?.dataset?.beadId;qe&&sn(qe);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){T.close(),ot.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Fe=h?.closest?.(".rtile .board-card__roll-toggle");if(Fe){let U=Fe.dataset.rollParent;U&&(le.has(U)?le.delete(U):le.add(U),Ne());return}let v=h?.closest?.(".rtile .board-card__roll-child");if(v){let U=v.dataset.childId;U&&i&&i(U);return}let K=h?.closest?.(".rtile");if(K){if(h?.closest?.(".rtile__id")){let Se=K.dataset.beadId;Se&&Sn(Se).then(qe=>{qe?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let U=K.dataset.beadId;U&&i&&i(U);return}let L=h?.closest?.(".worker-mini, .worker-card");if(L){let U=L.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){U&&Sn(U).then(qe=>{qe?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Se=h?.closest?.(".ctl-chip--from");if(Se){let qe=Se.dataset.fromId;qe&&i&&i(qe);return}U&&i&&i(U)}}e.addEventListener("pointerdown",jt),e.addEventListener("dragstart",Qt),e.addEventListener("dragover",gn),e.addEventListener("dragleave",fe),e.addEventListener("dragend",A),e.addEventListener("drop",de),e.addEventListener("click",Hn),e.addEventListener("change",Bt);function x(p){if(!q)return;let h=p.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(q=null,Ne())}function C(p){p.key!=="Escape"||!q||(q=null,Ne())}return document.addEventListener("click",x),document.addEventListener("keydown",C),Te.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",C)}),mn(),y&&Te.push(y.subscribe(()=>{for(let[p,h]of P)h==="failed"&&P.delete(p);Ne()})),o&&Te.push(o.subscribe(()=>{let p=l&&l()||"";p!==Le&&(Le=p,pe.close()),Ne(),cn()})),Ne(),{load(){E(),Ne()},refreshSessionDefaults:se,destroy(){for(let p of Te.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",jt),e.removeEventListener("dragstart",Qt),e.removeEventListener("dragover",gn),e.removeEventListener("dragleave",fe),e.removeEventListener("dragend",A),e.removeEventListener("drop",de),e.removeEventListener("click",Hn),e.removeEventListener("change",Bt);try{ot.destroy()}catch{}ve.hidden=!0;try{pe.destroy()}catch{}rt(c``,e)}}}function jl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function f_(e,t,n,r=async()=>{},o=async()=>{}){let s=qt("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function u(W){let V=W.target.value,F=t.getState().workspace?.current?.path||"";if(V&&V!==F){s("switching workspace to %s",V),l=!0,P();try{await n(V)}catch(J){s("workspace switch failed: %o",J)}finally{l=!1,P()}}}async function m(){let W=t.getState(),Z=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!Z||a)){s("git-pulling workspace %s",Z),a=!0,P();try{await r(Z)}catch(V){s("workspace git pull failed: %o",V)}finally{a=!1,P()}}}function y(W){let Z=W.target;Z&&e.contains(Z)||D()}function b(W){W.key==="Escape"&&D()}function k(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),P())}function D(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),P())}function q(){d?D():k()}async function X(W){let Z=W.target,V=Z.value,_e=Z.checked;s("toggling visibility %s \u2192 %s",V,String(_e));try{await o(V,_e)}catch(F){s("workspace visibility toggle failed: %o",F)}}function ie(W){return W?c`
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
    `:c``}function ee(W,Z){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${W.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!Z.has(V.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${jl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let W=t.getState(),Z=W.workspace?.current,V=W.workspace?.available||[],_e=new Set(W.workspace?.hidden||[]),F=Z?.path||V[0]?.path||"";if(V.length===0)return c``;let J=V.filter(te=>!_e.has(te.path)||te.path===F);if(J.length<=1){let te=J[0]||V[0],le=jl(te.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${te.path}"
            >${le}</span
          >
          ${ee(V,_e)}
          ${ie(F)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${J.map(te=>c`
              <option
                value="${te.path}"
                ?selected=${te.path===F}
                title="${te.path}"
              >
                ${jl(te.path)}
              </option>
            `)}
        </select>
        ${ee(V,_e)}
        ${ie(F)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){rt(B(),e)}return P(),i=t.subscribe(()=>P()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),rt(c``,e)}}}var __=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Bl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function m_(e,t,n=Bl()){return{id:n,type:e,payload:t}}function g_(e={}){let t=qt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,d=new Map,u=[],m=new Map,y=new Set;function b(B){for(let P of Array.from(y))try{P(B)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),b(s);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),P=(n.jitterRatio||0)*B,W=Math.max(0,Math.round(B+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",W,i+1),l=setTimeout(()=>{l=null,ee()},W)}function D(B){try{o?.send(JSON.stringify(B))}catch(P){t("ws send failed",P)}}function q(){for(s="open",t("ws open"),b(s),i=0;u.length;){let B=u.shift();B&&D(B)}}function X(B){let P;try{P=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(d.has(P.id)){let Z=d.get(P.id);d.delete(P.id),P.ok?Z?.resolve(P.payload):Z?.reject(P.error||new Error("ws error"));return}let W=m.get(P.type);if(W&&W.size>0)for(let Z of Array.from(W))try{Z(P.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",P.type)}function ie(){s="closed",t("ws closed"),b(s);for(let[B,P]of d.entries())P.reject(new Error("ws disconnected")),d.delete(B);i+=1,k()}function ee(){if(!a)return;let B=r();try{o=new WebSocket(B),t("ws connecting %s",B),s="connecting",b(s),o.addEventListener("open",q),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(P){t("ws connect failed %o",P),k()}}return ee(),{send(B,P){if(!__.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let W=Bl(),Z=m_(B,P,W);return t("send %s id=%s",B,W),new Promise((V,_e)=>{d.set(W,{resolve:V,reject:_e,type:B}),o&&o.readyState===o.OPEN?D(Z):(t("queue %s id=%s (state=%s)",B,W,s),u.push(Z))})},on(B,P){m.has(B)||m.set(B,new Set);let W=m.get(B);return W?.add(P),()=>{W?.delete(P)}},onConnection(B){return y.add(B),()=>{y.delete(B)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ee()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function mw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function gw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ul=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],b_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",bw="bdui.worker.done-range",h_=gf,y_="worker:queue",v_="ui:order",w_="ui:display-policy",k_="exec:presets",br="tab:board:closed",$_="beads-ui.board.closed-range";function hw(e){let t=qt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(i&&Mf(i),l&&a&&d&&u){let $e=function(x,C){let p="Request failed",h="";if(x&&typeof x=="object"){let re=x;if(typeof re.message=="string"&&re.message.length>0&&(p=re.message),typeof re.details=="string")h=re.details;else if(re.details&&typeof re.details=="object")try{h=JSON.stringify(re.details,null,2)}catch{h=""}}else typeof x=="string"&&x.length>0&&(p=x);let R=C&&C.length>0?`Failed to load ${C}`:"Request failed";se.open(R,p,h)},Ie=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},ct=function(){Le&&(Le().catch(()=>{}),Le=null),je=null,Me=null},De=function(x){et=x;let C=()=>{et!==x||fe.getState().selected_id!==x||(et=null,at(x))};if(!z){Ve.then(C);return}C()},_t=function(x,C,p,h,R){return p!==tt[C]?(R().catch(()=>{}),!1):(x.set(h,R),!0)},Ft=function(){let x=fe.getState();We(x.view==="board"),Re(x.view==="worker"),Je(he(x)),Ae(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id)},Nt=function(){let x=$r(Ht);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},wt=function(){let x=$r(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},We=function(x){if(x)for(let[C,p]of Ul){if(Ue.has(C)||dt.has(C))continue;let h=C===br?Nt():{type:p};try{Oe.register(C,h)}catch(ge){t("register %s store failed: %o",C,ge)}dt.add(C);let R=tt.board,re=!1;we.subscribeList(C,h).then(ge=>{re=!_t(Ue,"board",R,C,ge)}).catch(ge=>{t("subscribe %s failed: %o",C,ge),$e(ge,"board")}).finally(()=>{dt.delete(C),re&&Ft()})}else me()},me=function(){tt.board+=1;for(let[x]of Ul){let C=Ue.get(x);C&&(C().catch(()=>{}),Ue.delete(x));try{Oe.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Re=function(x){if(!x){He();return}for(let[C,p]of b_){if(S.has(C)||dt.has(C))continue;let h=C===gr?wt():{type:p};try{Oe.register(C,h)}catch(ge){t("register %s store failed: %o",C,ge)}dt.add(C);let R=tt.worker,re=!1;we.subscribeList(C,h).then(ge=>{re=!_t(S,"worker",R,C,ge)}).catch(ge=>{t("subscribe %s failed: %o",C,ge),$e(ge,"worker")}).finally(()=>{dt.delete(C),re&&Ft()})}},He=function(){tt.worker+=1;for(let[x]of b_){let C=S.get(x);C&&(C().catch(()=>{}),S.delete(x));try{Oe.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Ae=function(x){if(!x){lt();return}G||(ve("subscribe-worker-queue",{id:y_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),G=()=>ve("unsubscribe-worker-queue",{id:y_}))},lt=function(){G&&(G().catch(()=>{}),G=null)},he=function(x){return x.view==="monitor"||x.selected_id!=null},Je=function(x){if(!x){M();return}st||(ve("subscribe-monitor-pipeline",{id:h_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),st=()=>ve("unsubscribe-monitor-pipeline",{id:h_}))},M=function(){st&&(st().catch(()=>{}),st=null)},ye=function(){j||(ve("subscribe-ui-order",{id:v_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),j=()=>ve("unsubscribe-ui-order",{id:v_}))},Xe=function(){j&&(j().catch(()=>{}),j=null),Ct.clear()},Ze=function(){ke||(ve("subscribe-display-policy",{id:w_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),ke=()=>ve("unsubscribe-display-policy",{id:w_}))},it=function(){ke&&(ke().catch(()=>{}),ke=null),ot.clear()},$t=function(){mt||(ve("subscribe-impl-presets",{id:k_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),mt=()=>ve("unsubscribe-impl-presets",{id:k_}))},en=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},rn=function(x,C){nn.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var m=$e,y=Ie,b=ct,k=De,D=_t,q=Ft,X=Nt,ie=wt,ee=We,B=me,P=Re,W=He,Z=Ae,V=lt,_e=he,F=Je,J=M,te=ye,le=Xe,Pe=Ze,Ge=it,ue=$t,Y=en,Te=rn;let xe=document.getElementById("header-loading"),E=ad(xe),se=Fp(e),be=g_(),ve=E.wrapSend((x,C)=>be.send(x,C)),we=ed(ve),Oe=td(),ze=rd(),bt=Ic(),Ct=nd(),ot=Oc(),T=Lc(),pe=Dc();be.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&T.set({revision:C.revision,presets:C.presets})}),be.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{bt.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),be.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{Ct.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),be.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{ot.set(C.policy)}catch{}}),be.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{pe.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),be.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{pe.append(C.id,C.event)}catch{}}),be.on("snapshot",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="snapshot")try{h.applyPush(C)}catch{}}),be.on("upsert",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="upsert")try{h.applyPush(C)}catch{}}),be.on("delete",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Oe.getStore(p):null;if(h&&C&&C.type==="delete")try{h.applyPush(C)}catch{}});let Le=null,je=null,Me=null,et=null,ht=()=>{},Ve=new Promise(x=>{ht=()=>x(void 0)}),z=!1,ne=!1;async function at(x){let C=Ie(x);if(C===je||C===Me)return;Me=C;let p=`detail:${x}`,h={type:"issue-detail",params:{id:x}};try{Oe.register(p,h)}catch(R){t("register detail store failed: %o",R)}try{let R=await we.subscribeList(p,h);if(fe.getState().selected_id!==x||Ie(x)!==C){await R().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=R,je=C}catch(R){t("detail subscribe failed: %o",R),$e(R,"issue details")}finally{Me===C&&(Me=null)}}let Ue=new Map,dt=new Set,tt={board:0,worker:0},Pt=!1,Ht=Cs;try{let x=window.localStorage.getItem($_);fa(x)&&(Ht=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(bw);x!==null&&(Mt=Gn(x))}catch{}async function O(x){if(!fa(x)||x===Ht)return;Ht=x;try{window.localStorage.setItem($_,x)}catch{}let C=Ue.get(br);if(!C)return;Ue.delete(br),await C().catch(()=>{});let p=Nt();try{Oe.register(br,p)}catch(h){t("register %s store failed: %o",br,h)}try{let h=await we.subscribeList(br,p);Ue.set(br,h)}catch(h){t("re-subscribe %s failed: %o",br,h),$e(h,"board")}}async function Q(x){let C=Gn(x);if(C===Mt)return;Mt=C;let p=S.get(gr);if(!p)return;S.delete(gr),await p().catch(()=>{});let h=wt();try{Oe.register(gr,h)}catch(R){t("register %s store failed: %o",gr,R)}try{let R=await we.subscribeList(gr,h);S.set(gr,R)}catch(R){t("re-subscribe %s failed: %o",gr,R),$e(R,"worker")}}let S=new Map,G=null,st=null,j=null,ke=null,mt=null;async function Kt(){ke=null,ot.clear(),mt=null,T.clear(),G=null,st=null,Ue.clear(),S.clear(),tt.board+=1,tt.worker+=1,$t();let x=fe.getState().workspace.current?.path;if(x)try{await be.send("set-workspace",{path:x})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ze();let C=fe.getState();We(C.view==="board"),Re(C.view==="worker"),Je(he(C)),Ae(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function St(){t("clearing all subscriptions for workspace switch"),me(),He(),lt(),ze.clear(),Xe(),ye(),it(),Ze(),ct();let x=fe.getState();if(x.selected_id)try{Oe.unregister(`detail:${x.selected_id}`)}catch{}let C=fe.getState();We(C.view==="board"),Re(C.view==="worker"),Je(he(C)),Ae(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&De(C.selected_id)}async function Jt(x){t("requesting workspace switch to %s",x),ne=!0;try{let C=await be.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(fe.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await St(),ce("Switched to "+en(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),ce("Failed to switch workspace","error",3e3),C}finally{ne=!1}}async function Ne(x){t("requesting workspace git pull for %s",x);try{let C=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let p=C?.status;if(p==="up_to_date"){ce("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+en(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let p=C?.code,h=C?.message;if(p==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let R=h?`: ${h}`:"";throw ce(`Git pull failed${R}`,"error",3e3),C}}async function mn(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await be.send("set-workspace-visibility",{path:x,visible:C}),await jt()}catch(p){t("workspace visibility update failed: %o",p),ce("Failed to update project visibility","error",3e3)}}async function jt(){try{let x=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),p=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,h=Array.isArray(x.hidden)?x.hidden.filter(re=>typeof re=="string"):[];fe.setState({workspace:{current:p,available:C,hidden:h}});let R=window.localStorage.getItem("beads-ui.workspace");R&&(!C.some(ge=>ge.path===R)||h.includes(R)?window.localStorage.removeItem("beads-ui.workspace"):p&&R!==p.path&&(t("restoring saved workspace preference: %s",R),await Jt(R)))}}catch(x){t("failed to load workspaces: %o",x)}}be.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),jt(),St())});let Qt=!1;if(typeof be.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(Qt=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&Qt&&(Qt=!1,ce("Reconnected","success",2200),gw(fe,(p,h)=>{t(`${p}: %o`,h)}),Kt())};be.onConnection(x)}let gn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(gn=x)}catch(x){t("view parse error: %o",x)}let fe=id({config:mw(),view:gn});be.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let p=fe.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&C.root_dir!==p){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{ze.set(C.queue)}catch{}});let A=od(fe);A.start();let de=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ce=async(x,C)=>{try{return await ve(x,C)}catch(p){if(de.has(x))throw p;return[]}};hf({global_element:r,repo_element:o},fe,A);let vt=document.getElementById("workspace-picker");vt&&f_(vt,fe,Jt,Ne,mn);let Et=kf(e,(x,C)=>ve(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Et.open())}catch{}let xt=Sf(e,{policyStore:ot,queueStore:ze,implPresetStore:T,transport:(x,C)=>ve(x,C),onOpenChange:x=>{let C=Pt;Pt=x,Ft(),C&&x===!1&&Ot.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of Ul)for(let p of Oe.snapshotFor(C)||[]){let h=p.labels;if(Array.isArray(h))for(let R of h)typeof R=="string"&&R.length>0&&x.add(R)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>xt.open()))}catch{}let Bt=document.createElement("div");Bt.className="md-viewer-root",document.body.appendChild(Bt);let nn=Fi(Bt,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),Cn=$d(l,{gotoIssue:x=>A.gotoIssue(x),issueStores:Oe,transport:Ce,workerQueueStore:ze,uiOrderStore:Ct,displayPolicyStore:ot,closedRange:Ht,onClosedRangeChange:x=>{O(x)},onNewIssue:()=>Et.open(),openDoc:rn}),Ot=Fl(a,{transport:Ce,issueStores:Oe,queueStore:ze,sessionLogStore:pe,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn,doneRange:Mt,onDoneRangeChange:x=>{Q(x)}}),sn=bf(d,{transport:Ce,pipelineStore:bt,execPresetStore:T,sessionLogStore:pe,router:A,gotoIssue:x=>A.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn}),cn=qp(u,{issueStores:Oe,transport:Ce,queueStore:ze,execPresetStore:T,sessionLogStore:pe,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:nn,depCandidates:()=>{let x=bt.get();if(x===null)return null;let C=bt.getWorkspacesState(),p=fe.getState();if(p.view==="monitor")return Xa(x,C);let h=p.workspace.current?.path;return h?Xa(x,C,{root_dir:h}):null},subscribeCandidates:x=>bt.subscribe(x),onDepChanged:({type:x,a:C,b:p})=>{let h=sn;x==="dep-add"&&h&&typeof h.recorrectSharedLane=="function"&&h.recorrectSharedLane(x,C,p)},onNavigate:(x,C)=>{let p=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):A.gotoIssue(x)},h=fe.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!h||C===h){p();return}Promise.resolve(Jt(C)).then(p).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{A.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),dn=fe.getState().selected_id;dn&&(u.hidden=!1,cn.load(dn),De(dn)),fe.subscribe(x=>{let C=x.selected_id;C?(u.hidden=!1,cn.load(C),ne||De(C)):(cn.clear(),u.hidden=!0,ct())});let Hn=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",d.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),We(x.view==="board"),Re(x.view==="worker"),Je(he(x)),Ae(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id),!x.selected_id&&x.view==="board"&&Cn.load(),x.view==="worker"&&Ot.load(),x.view==="monitor"?sn.load():sn.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(Hn),Hn(fe.getState()),ye(),Ze(),$t(),jt().finally(()=>{z=!0,ht()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,p=String(x.key||"").toLowerCase(),h=x.target,R=h&&h.tagName?String(h.tagName).toLowerCase():"",re=R==="input"||R==="textarea"||R==="select"||h&&typeof h.isContentEditable=="boolean"&&h.isContentEditable;C&&p==="n"&&(re||(x.preventDefault(),Et.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&hw(t)});export{hw as bootstrap,mw as readBootstrapConfig,gw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
