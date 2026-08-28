var W_=Object.create;var ia=Object.defineProperty;var z_=Object.getOwnPropertyDescriptor;var H_=Object.getOwnPropertyNames;var G_=Object.getPrototypeOf,K_=Object.prototype.hasOwnProperty;var V_=(e,t,n)=>t in e?ia(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var aa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Y_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of H_(t))!K_.call(e,o)&&o!==n&&ia(e,o,{get:()=>t[o],enumerable:!(r=z_(t,o))||r.enumerable});return e};var X_=(e,t,n)=>(n=e!=null?W_(G_(e)):{},Y_(t||!e||!e.__esModule?ia(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>V_(e,typeof t!="symbol"?t+"":t,n);var Mc=aa((Ow,Pc)=>{var jr=1e3,Br=jr*60,Ur=Br*60,xr=Ur*24,J_=xr*7,em=xr*365.25;Pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return tm(e);if(n==="number"&&isFinite(e))return t.long?rm(e):nm(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function tm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*em;case"weeks":case"week":case"w":return n*J_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return n*Br;case"seconds":case"second":case"secs":case"sec":case"s":return n*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function nm(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function rm(e){var t=Math.abs(e);return t>=xr?Rs(e,t,xr,"day"):t>=Ur?Rs(e,t,Ur,"hour"):t>=Br?Rs(e,t,Br,"minute"):t>=jr?Rs(e,t,jr,"second"):e+" ms"}function Rs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var qc=aa((Lw,Nc)=>{function om(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=o,n.enabled=a,n.humanize=Mc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let y=0;y<d.length;y++)m=(m<<5)-m+d.charCodeAt(y),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,y=null,b,k;function P(...F){if(!P.enabled)return;let V=P,ce=Number(new Date),J=ce-(m||ce);V.diff=J,V.prev=m,V.curr=ce,m=ce,F[0]=n.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let B=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(W,Q)=>{if(W==="%%")return"%";B++;let oe=n.formatters[Q];if(typeof oe=="function"){let se=F[B];W=oe.call(V,se),F.splice(B,1),B--}return W}),n.formatArgs.call(V,F),(V.log||n.log).apply(V,F)}return P.namespace=d,P.useColors=n.useColors(),P.color=n.selectColor(d),P.extend=r,P.destroy=n.destroy,Object.defineProperty(P,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:F=>{y=F}}),typeof n.init=="function"&&n.init(P),P}function r(d,m){let y=n(this.namespace+(typeof m>"u"?":":m)+d);return y.log=this.log,y}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of m)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function s(d,m){let y=0,b=0,k=-1,P=0;for(;y<d.length;)if(b<m.length&&(m[b]===d[y]||m[b]==="*"))m[b]==="*"?(k=b,P=y,b++):(y++,b++);else if(k!==-1)b=k+1,P++,y=P;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function a(d){for(let m of n.skips)if(s(d,m))return!1;for(let m of n.names)if(s(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Nc.exports=om});var Fc=aa((vn,Os)=>{vn.formatArgs=im;vn.save=am;vn.load=lm;vn.useColors=sm;vn.storage=cm();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function sm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function im(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function am(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function lm(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function cm(){try{return localStorage}catch{}}Os.exports=qc()(vn);var{formatters:um}=Os.exports;um.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var mo=globalThis,$s=mo.trustedTypes,yc=$s?$s.createPolicy("lit-html",{createHTML:e=>e}):void 0,ca="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,ua="?"+Qn,Z_=`<${ua}>`,vr=document,go=()=>vr.createComment(""),bo=e=>e===null||typeof e!="object"&&typeof e!="function",da=Array.isArray,Ac=e=>da(e)||typeof e?.[Symbol.iterator]=="function",la=`[ 	
\f\r]`,_o=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vc=/-->/g,wc=/>/g,hr=RegExp(`>|${la}(?:([^\\s"'>=/]+)(${la}*=${la}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kc=/'/g,$c=/"/g,Sc=/^(?:script|style|textarea|title)$/i,pa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=pa(1),yo=pa(2),xw=pa(3),On=Symbol.for("lit-noChange"),Wt=Symbol.for("lit-nothing"),xc=new WeakMap,yr=vr.createTreeWalker(vr,129);function Ec(e,t){if(!da(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yc!==void 0?yc.createHTML(t):t}var Tc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=_o;for(let a=0;a<n;a++){let l=e[a],u,d,m=-1,y=0;for(;y<l.length&&(i.lastIndex=y,d=i.exec(l),d!==null);)y=i.lastIndex,i===_o?d[1]==="!--"?i=vc:d[1]!==void 0?i=wc:d[2]!==void 0?(Sc.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=hr):d[3]!==void 0&&(i=hr):i===hr?d[0]===">"?(i=o??_o,m=-1):d[1]===void 0?m=-2:(m=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?hr:d[3]==='"'?$c:kc):i===$c||i===kc?i=hr:i===vc||i===wc?i=_o:(i=hr,o=void 0);let b=i===hr&&e[a+1].startsWith("/>")?" ":"";s+=i===_o?l+Z_:m>=0?(r.push(u),l.slice(0,m)+ca+l.slice(m)+Qn+b):l+Qn+(m===-2?a:b)}return[Ec(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ho=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,a=t.length-1,l=this.parts,[u,d]=Tc(t,n);if(this.el=e.createElement(u,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=yr.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(let m of o.getAttributeNames())if(m.endsWith(ca)){let y=d[i++],b=o.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(y);l.push({type:1,index:s,name:k[2],strings:b,ctor:k[1]==="."?As:k[1]==="?"?Ss:k[1]==="@"?Es:kr}),o.removeAttribute(m)}else m.startsWith(Qn)&&(l.push({type:6,index:s}),o.removeAttribute(m));if(Sc.test(o.tagName)){let m=o.textContent.split(Qn),y=m.length-1;if(y>0){o.textContent=$s?$s.emptyScript:"";for(let b=0;b<y;b++)o.append(m[b],go()),yr.nextNode(),l.push({type:2,index:++s});o.append(m[y],go())}}}else if(o.nodeType===8)if(o.data===ua)l.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(Qn,m+1))!==-1;)l.push({type:7,index:s}),m+=Qn.length-1}s++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===On)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=bo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=wr(e,o._$AS(e,t.values),o,r)),t}var xs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=o;let s=yr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new qr(s,s.nextSibling,this,t):l.type===1?u=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(u=new Ts(s,this,t)),this._$AV.push(u),l=r[++a]}i!==l?.index&&(s=yr.nextNode(),i++)}return yr.currentNode=vr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Wt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),bo(t)?t===Wt||t==null||t===""?(this._$AH!==Wt&&this._$AR(),this._$AH=Wt):t!==this._$AH&&t!==On&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Wt&&bo(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ho.createElement(Ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new xs(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=xc.get(t.strings);return n===void 0&&xc.set(t.strings,n=new ho(t)),n}k(t){da(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(go()),this.O(go()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Wt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Wt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=wr(this,t,n,0),i=!bo(t)||t!==this._$AH&&t!==On,i&&(this._$AH=t);else{let a=t,l,u;for(t=s[0],l=0;l<s.length-1;l++)u=wr(this,a[r+l],n,l),u===On&&(u=this._$AH[l]),i||(i=!bo(u)||u!==this._$AH[l]),u===Wt?t=Wt:t!==Wt&&(t+=(u??"")+s[l+1]),this._$AH[l]=u}i&&!o&&this.j(t)}j(t){t===Wt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Wt?void 0:t}},Ss=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Wt)}},Es=class extends kr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Wt)===On)return;let r=this._$AH,o=t===Wt&&r!==Wt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Wt&&(r===Wt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ts=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Cc={M:ca,P:Qn,A:ua,C:1,L:Tc,R:xs,D:Ac,V:wr,I:qr,H:kr,N:Ss,U:Es,B:As,F:Ts},Q_=mo.litHtmlPolyfillSupport;Q_?.(ho,qr),(mo.litHtmlVersions??(mo.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new qr(t.insertBefore(go(),s),s,void 0,n??{})}return o._$AI(e),o};var Cs="today",Rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Fr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Gn(e){return e==="today"?"today":"7d"}function fa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,a){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Dc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,s],a.last_event_at=Date.now(),e.set(i,a),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var jc=X_(Fc(),1);function qt(e){return(0,jc.default)(`beads-ui:${e}`)}function dm(e){let n=Bc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Bc(e){return typeof e=="string"?e.trim():""}function pm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var fm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Wr(e){let t=dm(e),n=Bc(pm(e).spec_review),r=fm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function vo(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Kc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Vc(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Yc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Pn(e.created_at),s=Pn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Xc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Ls=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function _m(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ls,e)}function ma(e){if(!e||typeof e!="object")return!1;let t=e;return _m(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Wr(e).evidence==="published"?1:0;case"created":return Uc(e.created_at);case"updated":return Uc(e.updated_at);default:return null}}function zc(e,t,n){let r=Wc(e,n.key),o=Wc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Zc(e){let t=Array.isArray(e)?e.filter(ma):[];return(n,r)=>{for(let a of t){let l=zc(n,r,a);if(l!==0)return l}let o=zc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var mm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Hc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Gc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=mm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Qc(e,t){let n=Hc(e),r=Hc(t);if(n!==r)return n<r?-1:1;let o=Gc(e),s=Gc(t);if(o!==s)return o<s?-1:1;let i=Pn(e&&e.created_at),a=Pn(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var _a=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function Jc(e){return(t,n)=>{let r=zr(t,e),o=zr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ga(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,a=s+1<o?r[s+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:zr(a,n)-_a};if(!a)return{rank:zr(i,n)+_a};let l=zr(i,n),u=zr(a,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,y)=>({bead_id:m.id,rank:y*_a}))}}function ba(e,t={}){let n=qt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,a=!1,l=t.sort||vo;function u(){for(let y of Array.from(i))try{y()}catch{}}function d(){o=Array.from(r.values()).sort(l)}function m(y){if(a||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=s&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=s)return;r.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let P of k)P&&typeof P.id=="string"&&P.id.length>0&&r.set(P.id,P);d(),s=b,u();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let P=r.get(k.id);if(!P)r.set(k.id,k);else{let F=Number.isFinite(P.updated_at)?P.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(F<=V){for(let ce of Object.keys(P))ce in k||delete P[ce];for(let[ce,J]of Object.entries(k))P[ce]=J}}d()}s=b,u()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(r.delete(k),d()),s=b,u()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:m,snapshot(){return o},size(){return r.size},getById(y){return r.get(y)},dispose(){a=!0,r.clear(),o=[],i.clear(),s=0}}}function Is(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function eu(e){let t=qt("subs"),n=new Map,r=new Map;function o(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(a);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],y=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let P=k.itemsById;for(let F of d)typeof F=="string"&&F.length>0&&P.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&P.set(F,!0);for(let F of y)typeof F=="string"&&F.length>0&&P.delete(F)}}async function s(a,l){let u=Is(l);if(t("subscribe %s key=%s",a,u),!n.has(a))n.set(a,{key:u,itemsById:new Map});else{let m=n.get(a);if(m&&m.key!==u){let y=r.get(m.key);y&&(y.delete(a),y.size===0&&r.delete(m.key)),n.set(a,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(m){let y=n.get(a)||null;if(y){let b=r.get(y.key);b&&(b.delete(a),b.size===0&&r.delete(y.key))}throw n.delete(a),m}return async()=>{t("unsubscribe %s key=%s",a,u);try{await e("unsubscribe-list",{id:a})}catch{}let m=n.get(a)||null;if(m){let y=r.get(m.key);y&&(y.delete(a),y.size===0&&r.delete(m.key))}n.delete(a)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Is,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let u=n.get(a);return u?u.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function tu(){let e=qt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let l of Array.from(r))try{l()}catch{}}function i(l,u,d){let m=u?Is(u):"",y=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,y),b&&y&&m&&y!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let P=o.get(l);if(P){try{P()}catch{}o.delete(l)}let F=ba(l,d);t.set(l,F);let V=F.subscribe(()=>s());o.set(l,V)}else if(!b){let k=ba(l,d);t.set(l,k);let P=k.subscribe(()=>s());o.set(l,P)}return n.set(l,m),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=o.get(l);if(d){try{d()}catch{}o.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function nu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ru(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ha(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function gm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let a=new URLSearchParams(o).get("issue");if(a)return decodeURIComponent(a)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function bm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ou(e){let t=qt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):gm(r),i=bm(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=ha(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?ha(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var hm=Object.freeze({workspace_config:{default_workspace:null}});function su(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:hm.workspace_config.default_workspace}}}function iu(e={}){let t=qt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:su(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?su(s.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function au(e){let t=qt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function a(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function l(u){return async(m,y)=>{let b=o++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let P=!1,F=()=>{P||(P=!0,r.delete(b),a())},V=setTimeout(()=>{P||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),F())},3e4);try{let ce=await u(m,y),J=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,J),ce}catch(ce){let J=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,J,ce),ce}finally{clearTimeout(V),F()}}}return s(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ds(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,a){let l=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return l.sort(Xc),l;switch(a){case"created_desc":return l.sort(vo),l;case"created_asc":return l.sort(Kc),l;case"updated_desc":return l.sort(Vc),l;case"priority":return l.sort(Yc),l;case"manual":default:{let u=n();return u?l.sort(Jc(u)):l.sort(vo),l}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Mn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function on(e){let t=Mn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=Mn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(o/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let u=Math.floor(a/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function lu(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Mn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ms(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ps(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ns(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=lu(n);return{total:n.length,count:r,current:o,children:n}}function cu(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function o(i,a){let l={...i.order};for(let u of a)l[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:l})}async function s(i,a,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ga(a,l,u.order),i);o(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let y={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(y);let b=r(ga(a,l,y.order),i);o(y,b);let k=await t("ui-order-set",{expected_revision:y.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:s}}function uu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function wo(e,t){let n=uu(e),r=uu(t);return n.length===0||r.length===0?!1:n!==r}function qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ya(e,t){return!t||typeof e!="string"||e.length===0||qs(t.visible_labels).includes(e)?!0:qs(t.hidden_labels).includes(e)?!1:!qs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function du(e,t){return qs(e).filter(n=>ya(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function ym(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function vm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function wm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${ym(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Fs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(Qc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?vm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,u)=>wm(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var km={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},$m={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function xm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function _u(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function Am(e){if(!e||e.fill==="none"||!e.approval_state)return _u(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Sm(e,t,n,r){let o=km[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,a=$m[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${o} dim`:s==="full"&&(l+=` b-${o} full`),i&&(l+=" stale"),n&&(l+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",m=fu[e]||e,y=r?mu(t):null;if(!y)return c`
      <div class="seg">
        <div class=${l} style=${d}>${a}</div>
        <div class=${u}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,y,e)}}
    >
      <div class=${l} style=${d}>${a}</div>
      <div class=${u}>${m}</div>
    </button>
  `}function mu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function js(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=pu[e.route]||pu.spec_backed,s=e.stages,i=xm(o,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${fu[u]||u} ${u==="plan"?Am(s[u]||{}):_u(s[u]||{})}`).join(" \xB7 ")}`,l=!!r&&o.some(u=>mu(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${o.map(u=>Sm(u,s[u]||{},u===i,r))}
    </div>
  `}function Em(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gu=2;function bu(e){let t=e.slice(0,gu).join(", "),n=e.length-gu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Tm(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(wo(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${bu(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${bu(s)}</span
      >`),n}function va(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Bs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Bs(e)}@${e.sha}`}function Us(e,t){if(!e)return null;let n=va(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=va(t?.kind),i=s!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:a,title:`${l}${u}`}}function hu(e,t){let n=Us(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Cm(e){if(!e)return null;let t=va(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Rm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&cr(n,"route")){let a=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let a=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let s=hu(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let a=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(a)}`}
        >${`exec ${a.kind==="delegated"?Bs(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of du(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&cr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")&&o.push(...Tm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Om(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Lm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Fs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Om(e),empty_label:"children \uC5C6\uC74C",childChips:wa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function wa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Us(t,n)?c`<span class="board-card__roll-child-chips">
    ${hu(t,n)}
    ${Cm(n)}
  </span>`:null}function Ws(e,t){let n=Em(e.priority);return c`
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
      ${Rm(e,t)}
      ${e.workflow&&cr(t.policy||null,"stepper")?js(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Lm(e,t)}
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
  `}function yu(e,t,n){return c`
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
  `}var Im=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Dm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Pm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Mm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function vu(e,t,n){return c`
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
        ${Im.map(r=>c`<option
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
        ${Dm.map(r=>c`<option
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
        ${Pm.map(r=>c`<option
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
  `}var Nm=200,qm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Fm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),wu="beads-ui.board.sort",ku=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function jm(){try{let e=window.localStorage.getItem(wu);if(e&&ku.has(e))return e}catch{}return"created_desc"}function $u(e,t){let n=qt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,y=t.closedRange||Cs,b=o?Ds(o,i):null,k=cu({transport:s,uiOrderStore:i}),P=[],F=[],V=[],ce=[],J=[],B=[],O=!1,W=0,Q=jm(),oe=new Map,se=new Map,q=new Map,X=new Set,ne={search:"",priority:"",type:"",labels:[]},ie=!1,Pe=null;function He(E){return String(E.status||"open")==="open"}function fe(E){let G=String(E.status||"open");return G==="open"||G==="blocked"}function Y(E){let G=ne.search.trim().toLowerCase(),Ce=ne.priority,ze=ne.type,$e=ne.labels;return E.filter(at=>{if(G){let ot=String(at.id||"").toLowerCase(),he=String(at.title||"").toLowerCase();if(!ot.includes(G)&&!he.includes(G))return!1}if(Ce!==""&&String(at.priority)!==Ce||ze!==""&&String(at.issue_type||"")!==ze)return!1;if($e.length>0){let ot=Array.isArray(at.labels)?at.labels:[];if(!$e.some(he=>ot.includes(he)))return!1}return!0})}function Ae(){let E=new Set;for(let G of[P,F,V,ce,J,B])for(let Ce of G){let ze=Array.isArray(Ce.labels)?Ce.labels:[];for(let $e of ze)typeof $e=="string"&&$e.length>0&&E.add($e)}return Array.from(E).sort()}function Oe(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function S(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",Q),G=b.selectBoardColumn("tab:board:blocked","blocked",Q).filter(fe),Ce=new Set(E.map(j=>j.id)),ze=b.selectBoardColumn("tab:board:ready","ready",Q).filter(j=>He(j)&&!Ce.has(j.id)),$e=b.selectBoardColumn("tab:board:resolved","resolved",Q),at=b.selectBoardColumn("tab:board:deferred","deferred",Q),ot=b.selectBoardColumn("tab:board:closed","closed").slice(0,Nm),he=[...G,...ze,...E,...$e,...ot];ae(he);let Je=new Set;for(let j of he)j&&j.id&&!Ps(j)&&Je.add(j.id);let M=!Oe();P=M?ko(G,Je):G,F=M?ko(ze,Je):ze,V=M?ko(E,Je):E,ce=M?ko($e,Je):$e,J=at,W=at.length,B=M?ko(ot,Je):ot,oe=new Map;for(let j of P)oe.set(j.id,"open");for(let j of F)oe.set(j.id,"open");for(let j of V)oe.set(j.id,"in_progress");for(let j of ce)oe.set(j.id,"resolved");for(let j of J)oe.set(j.id,"deferred");for(let j of B)oe.set(j.id,"closed");se=new Map;for(let j of P)se.set(j.id,"blocked-col");for(let j of F)se.set(j.id,"ready-col");for(let j of V)se.set(j.id,"in-progress-col");for(let j of ce)se.set(j.id,"resolved-col");for(let j of B)se.set(j.id,"closed-col")}ft()}catch{P=[],F=[],V=[],ce=[],J=[],B=[],q=new Map,ft()}}function ae(E){q=Ms(E)}function Se(E){return Ns(q,E)}function me(E){return!X.has(E)}function we(E,G){E.preventDefault(),E.stopPropagation(),X.has(G)?X.delete(G):X.add(G),ft()}function ye(E,G){E.preventDefault(),E.stopPropagation(),r(G)}function Le(E,G){E.preventDefault(),E.stopPropagation(),r(G)}function Ye(E,G){Pe||r(G)}function bt(E,G){E.preventDefault(),E.stopPropagation(),Bm(G).then(Ce=>{Ce&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ht(E,G){Pe=G,E.dataTransfer&&(E.dataTransfer.setData("text/plain",G),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function mt(E){E.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{Pe=null},0)}function T(E){let G=String(E.target.value||"");!G||G===y||(y=G,u&&u(G),ft())}function ue(){return a?a.get():null}function Re(E){let G=l?l.get():null,Ce=G?G.cleanup_failed:null;if(!Ce||typeof Ce!="object"||Array.isArray(Ce))return null;let ze=Ce[E];return!ze||typeof ze!="object"||Array.isArray(ze)?null:ze}let je={onCardClick:Ye,onCopyId:bt,onDragStart:ht,onDragEnd:mt,onClosedRangeChange:T,rollupFor:Se,isExpanded:me,onRollupToggle:we,onChildClick:ye,onFromChipClick:Le,onOpenDoc:m?(E,G)=>m(G):void 0,cleanupFailureFor:Re,get policy(){return ue()}};function Me(E,G){Pe||(De(),r(G))}function et(E,G){E.preventDefault(),E.stopPropagation(),De(),r(G)}let yt={...je,onCardClick:Me,onChildClick:et,onFromChipClick:et,onOpenDoc:m?(E,G)=>{De(),m(G)}:void 0,get policy(){return ue()}};function Ke(E){let G=E.target,Ce=e.querySelector(".board-filter__labels");G&&Ce&&Ce.contains(G)||Ie()}function z(E){E.key==="Escape"&&Ie()}function ee(){ie||(ie=!0,document.addEventListener("mousedown",Ke),document.addEventListener("keydown",z),ft())}function Ie(){ie&&(ie=!1,document.removeEventListener("mousedown",Ke),document.removeEventListener("keydown",z),ft())}function lt(E){E.key==="Escape"&&De()}function it(){O||(O=!0,document.addEventListener("keydown",lt),ft())}function De(){O&&(O=!1,document.removeEventListener("keydown",lt),ft())}let Ue={onClose:De,onOverlayClick(E){E.target===E.currentTarget&&De()}},ct={onSearchInput(E){ne.search=String(E.target.value||""),S()},onPriorityChange(E){ne.priority=String(E.target.value||""),S()},onTypeChange(E){ne.type=String(E.target.value||""),S()},onSortChange(E){let G=String(E.target.value||"");if(!(!ku.has(G)||G===Q)){Q=G;try{window.localStorage.setItem(wu,G)}catch{}S()}},onDeferredToggle(){O?De():it()},onLabelMenuToggle(){ie?Ie():ee()},onLabelToggle(E){let G=ne.labels.indexOf(E);G===-1?ne.labels.push(E):ne.labels.splice(G,1),S()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],S())},onNewIssue(){d&&d()}};function tt(){return c`
      <div class="board-view">
        ${vu(ne,ct,{sort_mode:Q,deferred_popup_open:O,deferred_count:W,label_options:Ae(),label_menu_open:ie})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:Y(P)},je)}
          ${Hr({title:"Ready",id:"ready-col",items:Y(F)},je)}
          ${Hr({title:"In progress",id:"in-progress-col",items:Y(V)},je)}
          ${Hr({title:"Resolved",id:"resolved-col",items:Y(ce)},je)}
          ${Hr({title:"Closed",id:"closed-col",items:Y(B),is_closed:!0,closed_range:y},je)}
        </div>
        ${O?yu({items:Y(J),count:W},yt,Ue):""}
      </div>
    `}function ft(){rt(tt(),e),Pt()}function Pt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let G=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ce of G)Array.from(Ce.querySelectorAll(".board-card")).forEach(($e,at)=>{$e.tabIndex=at===0?0:-1})}catch{}}async function Ft(E,G){if(!s){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:E,status:G}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ce){n("update-status failed: %o",Ce),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(E){switch(E){case"blocked-col":return P;case"ready-col":return F;case"in-progress-col":return V;case"resolved-col":return ce;default:return[]}}function Mt(E,G,Ce){if(!s||!i)return;let ze=Ht(E),$e=ze.find(M=>M.id===G);if(!$e)return;let at=ze.filter(M=>M.id!==G),ot=Ce.closest?Ce.closest(".board-card"):null,he=at.length;if(ot){let M=ot.getAttribute("data-issue-id");if(M===G)return;let j=at.findIndex(ve=>ve.id===M);j>=0&&(he=j)}let Je=at.slice();Je.splice(he,0,$e),k.applyReorder(G,Je,he)}function Nt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let kt=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Ce=E.target.closest(".board-column");Ce&&Ce!==kt&&(kt&&kt.classList.remove("board-column--drag-over"),Ce.classList.add("board-column--drag-over"),kt=Ce)}),e.addEventListener("dragleave",E=>{let G=E.relatedTarget;(!G||!e.contains(G))&&kt&&(kt.classList.remove("board-column--drag-over"),kt=null)}),e.addEventListener("drop",E=>{E.preventDefault(),kt&&(kt.classList.remove("board-column--drag-over"),kt=null);let G=E.target,Ce=G.closest(".board-column");if(!Ce)return;let ze=E.dataTransfer?.getData("text/plain")||"";if(!ze)return;let $e=Ce.id,at=se.get(ze);if(at&&at===$e){if(Fm.has($e)){if(Q!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt($e,ze,G)}return}let ot=qm[$e];if(!ot){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}oe.get(ze)!==ot&&Ft(ze,ot)}),e.addEventListener("keydown",E=>{let G=E.target;if(!(G instanceof HTMLElement))return;let Ce=String(G.tagName||"").toLowerCase();if(Ce==="input"||Ce==="textarea"||Ce==="select"||Ce==="button"||Ce==="a"||G.isContentEditable===!0)return;let ze=G.closest(".board-card");if(!ze)return;let $e=String(E.key||"");if($e==="Enter"||$e===" "){E.preventDefault();let Je=ze.getAttribute("data-issue-id");Je&&r(Je);return}if($e!=="ArrowUp"&&$e!=="ArrowDown"&&$e!=="ArrowLeft"&&$e!=="ArrowRight")return;E.preventDefault();let at=ze.closest(".board-column");if(!at)return;let ot=Array.from(at.querySelectorAll(".board-card")),he=ot.indexOf(ze);if($e==="ArrowDown"&&he<ot.length-1){We(ze,ot[he+1]);return}if($e==="ArrowUp"&&he>0){We(ze,ot[he-1]);return}if($e==="ArrowLeft"||$e==="ArrowRight"){let Je=Array.from(e.querySelectorAll(".board-column")),M=Je.indexOf(at),j=$e==="ArrowRight"?1:-1,ve=M+j;for(;ve>=0&&ve<Je.length;){let Xe=Je[ve].querySelector(".board-card");if(Xe){We(ze,Xe);return}ve+=j}}});function We(E,G){try{E.tabIndex=-1,G.tabIndex=0,G.focus()}catch{}}let L=null;b&&b.subscribe&&(L=b.subscribe(()=>{try{S()}catch{}}));let Z=null;a&&a.subscribe&&(Z=a.subscribe(()=>{try{S()}catch{}}));let ge=null;return l&&l.subscribe&&(ge=l.subscribe(()=>{ft()})),{async load(){n("load"),S()},clear(){Ie(),De(),L&&(L(),L=null),Z&&(Z(),Z=null),ge&&(ge(),ge=null),e.replaceChildren(),P=[],F=[],V=[],ce=[],J=[],B=[],oe=new Map,se=new Map}}}function ko(e,t){return e.filter(n=>{let r=Ps(n);return!(r&&t.has(r))})}async function Bm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var kn=e=>e??Wt;async function Sn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function $o(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Um(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${Ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,a,r,o,s),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Um(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Wm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],xu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},zm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function zt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function It(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Su(e,t,n){let r=zt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=zt(n[e]);return o===null?null:{value:o,source:"global"}}function xo(e,t,n,r){return Su(e,t,n)||{value:r,source:"base"}}function ka(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&tn(o?.[t])){let i=zt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&tn(o)){for(let i of Object.values(o))if(tn(i)){let a=zt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return zt(r?.runners?.[s]?.models?.[e]?.id)||e}function Hm(e,t){return zt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return It(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return It(e,t,r,e,"explicit")}function Eu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];tn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(tn(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Gm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(tn(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Km(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Gm(t,n)){let s=Eu(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function $a(e){return It(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Au(e,t,n){let r=Su(e,t,n);return r?Kr(r.value,r.source):It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function $n(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&tn(r.session)?r.session:null,s=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,i=tn(e.runner_catalog)?e.runner_catalog:null,a=zt(n.quick_fix_impl_model),l=Km(a,o,i),u={};if(o){let d=xo("workflow_mode",t,n,zt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?It(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Kr(d.value,d.source);for(let J of["spec_review","plan_review","impl_review"]){let B=`${J}_model`,O=zt(J==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),W=xo(B,t,n,O);if(W.value===null)u[B]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!tn(o.review?.reviewers?.[W.value]))u[B]=$a(It(W.value,W.source,"",null,"explicit"));else{let Q=Hm(W.value,o);u[B]=It(W.value,W.source,Gr(Q),Q,W.source==="base"?"default":"explicit")}}for(let[J,B]of Object.entries(xu)){let O=u[B].value;if(O==="self"||O==="skip"){u[J]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=zt(o.review?.reviewers?.[O||""]?.effort),Q=xo(J,t,n,W);u[J]=Q.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(Q.value,Q.source,Q.value,Q.value,Q.source==="base"?"default":"explicit")}let m=tn(o.implementation?.default)?o.implementation.default:{},y=zt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),k=tn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},P=b&&tn(k[y])?k[y]:{};for(let J of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=xo(J,t,n,J==="impl_dispatch"?zt(P.dispatch)||zt(m.dispatch):zt(m[J.replace("impl_","")]));u[J]=B.value===null?It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):It(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let F=zt(t.impl_runtime),V=F==="inherit"?zt(e.controller_runtime):F,ce=y==="quick_fix"&&zt(t.impl_dispatch)===null&&l.runtime!==null&&(F===null||V===l.runtime);if(ce){let J=l.runtime,B=a;u.impl_dispatch=It("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),F===null&&(u.impl_runtime=It(J,"global",`${J} (\uC720\uB3C4)`,J,"explicit")),zt(t.impl_model)===null&&(u.impl_model=It(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let J of["impl_runtime","impl_model","impl_effort","impl_speed"])u[J]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ce&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let J=u.impl_runtime.value==="inherit"?zt(e.controller_runtime):u.impl_runtime.value,B=J?Eu(J,o,i):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=$a(u.impl_model);else{let O=ka(u.impl_model.value,J,o,i);u.impl_model.display=Gr(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let J=zt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=J?zt(o.implementation?.effort_by_transport?.[J]?.auto):null;B&&!zm.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",u.impl_speed.source))}}else for(let d of Wm.filter(m=>!m.startsWith("orchestration_")))u[d]=Au(d,t,n);if(!o){for(let[d,m]of Object.entries(xu))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=It(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Au(d,t,n);continue}let m=d.replace("orchestration_",""),y=zt(s[m]),b=xo(d,t,n,y);if(d==="orchestration_effort"&&b.source==="base"){u[d]=It(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=It(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?zt(s.model_id)||b.value:ka(b.value,null,o,i);u[d]=It(b.value,b.source,Gr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?It("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}u[d]=Kr(b.value,b.source)}if(o)if(a===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=It(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(d)})`,null,"default")}else if(l.runtime!==null){let d=ka(a,l.runtime,o,i);u.quick_fix_impl_model=It(a,"global",Gr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=$a(It(a,"global","",null,"explicit")):u.quick_fix_impl_model=Kr(a,"global");return u}function Vm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function zs(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=m=>{let y={...r,...m};return $n({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let a=o(i)[e.key],l=o(s)[e.key],u=zt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Vm(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let y=o({...s,[e.key]:m})[e.key];return{value:m,label:y.display,full_value:y.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(a=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(m))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function xa(e){return`session:${e.provider}:${e.session_id}`}function Ao(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Ym(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:xa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Ao(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Ym(e,n)}}}var Aa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Xm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Tu="\uBD84\uD574 \uC5C6\uB294 leg";function Zt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Vn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Xr=[...Vn,"reasoning_output_tokens"],Zm={codex:["implementation","review-consult"],claude:["subagent"]};function Sa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Vn.some(t=>Number.isFinite(e[t]))}function Qm(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))}function Ea(e){let t=0;for(let n of Vn)t+=Zt(e?.[n]);return t}function Jm(e){return!e||typeof e!="object"?!1:Vn.some(t=>Number.isFinite(e[t]))}function Cu(e){return!e||typeof e!="object"?!1:Xr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function eg(e){let t={};for(let n of Xr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ru(e){let t={};for(let n of Xr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ou(e,t){return Sa(t)?Zt(t.total_tokens):e==="codex"?Zt(t.input_tokens)+Zt(t.output_tokens):Ea(t)}function tg(e){return e==="claude"?"Claude":"Codex"}function ng(e){return`\u03C4 ${Iu(e)}`}function rg(e,t){let n=t.breakdown||{},r=Zt(t.total_only_subtotal);if(Sa(n)||r>0&&!Qm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Xm];return t.replayed&&u.push(Aa),u.join(`
`)}let o=[`\uC785\uB825 ${Zt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Zt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Zt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Zt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Tu} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Tu}`:s,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(Aa),l.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${tg(n)} ${ng(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:rg(n,r)})}return t}function Gs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let a=t[s];a||(a={subtotal:0,breakdown:{}},t[s]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=Zt(a.total_only_subtotal)+Zt(i.total_only_subtotal));for(let l of Xr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=Zt(a.breakdown[l])+Zt(i.breakdown[l]));i.replayed&&(a.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ta(e){return!e||typeof e!="object"?null:Ln({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function og(e){return e==="codex"?"codex":"claude"}function Kn(){return{subtotal:0,breakdown:eg(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hs(e,t,n){e.subtotal+=t.subtotal,Sa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Xr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Zt(e.breakdown[r])+Zt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Lu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Iu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Zr(e){return Jm(e)?`\u03C4 ${Iu(Ea(e))}`:null}function tr(e){let t=Zr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function So(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Zt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ea(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Aa),n.join(`
`)}function Ln(e,t){let n={claude:Kn(),codex:Kn()},r={orchestrator:{claude:Kn(),codex:Kn()},implementation:{claude:Kn(),codex:Kn()},"review-consult":{claude:Kn(),codex:Kn()},subagent:{claude:Kn(),codex:Kn()}},o=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(Cu(l)){let d=og(a.runner),m=Ru(l),y={provider:d,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:m,subtotal:Ou(d,m)};m.replayed===!0&&(y.replayed=!0),typeof a.model=="string"&&(y.model=a.model),typeof a.session_id=="string"&&(y.session_id=a.session_id),Hs(n[d],y,!0),Hs(r.orchestrator[d],y,!0)}let u=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Zm[m].includes(d.role)||!Cu(d.usage))continue;let y=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!y||o.has(y))continue;o.add(y);let b=Ru(d.usage),k={provider:m,role:d.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:Ou(m,b)};k.receipt_id=y,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),Hs(n[m],k,!1),Hs(r[k.role][m],k,!1)}}let s={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let u=Lu(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),s[a]=u}if(Object.keys(s).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[a][u];d.legs.length>0&&(l[u]={...Lu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:s,roles:i}}function Du(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let o=new Set,s=[];for(;s.length<e.length;){let l=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(l),s.push(l)}let i=[],a=new Map(s.map((l,u)=>[l,u]));for(let l of s){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),y=Number(a.get(l))>Number(a.get(d));m&&y&&(u===null||Number(a.get(d))>Number(a.get(u)))&&(u=d)}u!==null&&i.push({bead_id:l,after:u})}return{order:s,corrections:i,cycle:!1}}var sg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Vs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",ig="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ag="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Eo(e,t){return`${e}\0${t}`}function lg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(a=>a!==o&&n.has(a)))}return r}function cg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ro(e,t){let n=e.entries,r=n.map(m=>m.bead_id),o=lg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[m,y]of o)for(let b of y)s.push({blocker:b,blockee:m});let i=cg(e,t),a=new Map(r.map((m,y)=>[m,y])),l=r.slice(0,i).filter(m=>o.get(m).some(y=>Number(a.get(y))>Number(a.get(m)))),u=Du(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Pu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ro(n,t)}function ug(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function dg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function pg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ca(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function fg(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add(Eo(i,l));let r=new Map,o=new Map;for(let i of e){let a=Eo(i.a,i.b);r.set(a,i),o.set(a,i.type==="dep-add")}let s=[];for(let i of e){let a=Eo(i.a,i.b);r.get(a)===i&&o.get(a)!==n.has(a)&&s.push(i)}return s}function _g(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function mg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ks(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ra(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Oo(e){let t=pg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=dg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,m)=>{if(o.refusal!==null||u===d)return;let y=t.get(u)||[];if(y.includes(d))return;let b=s(u);if(b!==null){if(Ca(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...y,d]),m!==void 0&&r.add(Eo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let y=s(u);y!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:y}))},laneCreated:(u,d)=>r.has(Eo(u,d))}}function Lo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=fg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),a=s.filter(d=>d.type==="dep-add"),l=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:ug(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...u===void 0?{}:{correction:u}}}function Mu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function To(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Nu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||s.set(a,[...s.get(a)||[],i.bead_id])}for(let[i,a]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return o}function qu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let a=o.get(i)??0;r.push(Ks(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),o.set(i,a+1)}}function Co(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ys(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Oa(e,t,n){let r=Oo(n),o=[],s=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:sg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ig};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ra(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&d===void 0)return{refused:Qr};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(J=>J.bead_id===e.bead_id);if(k<0)return;let P=k>0?d.entries[k-1]:null,F=k+1<d.entries.length?d.entries[k+1]:null,V=To(d,k),ce=F!==null&&To(d,k+1);V&&P!==null&&r.removeDep(e.bead_id,P.bead_id),ce&&F!==null&&r.removeDep(F.bead_id,e.bead_id),(V||ce)&&P!==null&&F!==null&&r.addDep(F.bead_id,P.bead_id,u)},y=(k,P)=>{let F=n.cross_lanes.get(k),V=F.entries.findIndex(q=>q.bead_id===e.bead_id),ce=F.entries.filter(q=>q.bead_id!==e.bead_id),J=Math.max(0,Math.min(ce.length,V>=0&&P>V?P-1:P)),B=-1;if(ce.forEach((q,X)=>{n.fixed_members.has(q.bead_id)&&(B=X)}),J<=B){r.state.refusal=ag;return}let O=V>=0?F.entries[V]:d?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=Ro({status:F.status,entries:[...ce.slice(0,J),O,...ce.slice(J)]},n);let W=a.entries;if(Ys(W,F.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Co(W)}}),F.status!=="confirmed")return;let Q=W.findIndex(q=>q.bead_id===e.bead_id),oe=Q>0?W[Q-1].bead_id:null,se=Q+1<W.length?W[Q+1].bead_id:null;if(oe===null){se!==null&&r.addDep(se,e.bead_id,k);return}if(r.addDep(e.bead_id,oe,k),se!==null&&(r.graph.get(se)||[]).includes(oe)){let q=F.entries.findIndex(X=>X.bead_id===se);(r.laneCreated(se,oe)||q>0&&F.entries[q-1].bead_id===oe&&To(F,q))&&r.removeDep(se,oe),r.addDep(se,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Nu(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Co(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=_g(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Ks(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let P=n.parallel_rows,F=P[Math.max(0,Math.min(P.length,t.marker_index))];if(!(!!F&&F.bead_id===e.bead_id)&&mg(n,e.root_dir)&&b!==void 0){let ce=b>k?k:k-1;ce>=0&&ce!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ce},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(Ks(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(Ks(e.bead_id,e.root_dir,t.index,t.lane_id));return Lo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function Fu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ro(n,t);if(r.held)return{refused:Vs};let o=r.entries,s=Oo(t),i=[];Mu(s,o,e),s.state.refusal===null&&qu(s,t,o,i);let a=Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Lo(s,t,a,i,{lane_id:e,correction:r})}function ju(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries,s=Oo(t),i=[];Mu(s,o,e),s.state.refusal===null&&qu(s,t,o,i);let a=Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return Lo(s,t,a,i,{lane_id:e,correction:r})}function Bu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ro(n,t),o=r.entries;return Lo(Oo(t),t,Ys(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}],[],{lane_id:e,correction:r})}function Uu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Oo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)To(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Lo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Nu(t,n,e,n.entries)})}function Wu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;To(n,i)?r.push(a):o.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ra(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function zu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Hu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function La(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ra(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Gu={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ku(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Vu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),m=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Gu[u.run_state],m=Gu[a];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}s.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:s,resumed_from_ids:r}}var Xs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Da=[...Xs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Zs=[...Xs,...nr],gg=Da.filter(e=>Zs.includes(e)),Yu=["delegated","main"],Qs=["inherit","claude","codex"],Io=["default","fast"],Do=["standard","fast_track"],Po=["codex","opus","fable","self","skip"],Js=["codex","fable","skip"],ei=["low","medium","high","xhigh"],Tn="auto";function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xu(e){if(!En(e)||!En(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))En(r)&&En(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Xu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Tn,...r.flatMap(([,o])=>o)]}function Zu(e,t,n,r){if(!En(e)||!En(e.runners))return[Tn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!En(i)||!En(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==Tn&&a!==n)continue;let u=r(i,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[Tn,...o]}function eo(e,t,n){return Zu(e,t,n,(r,o)=>En(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Pa(e,t,n){return Zu(e,t,n,(r,o)=>En(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:En(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Mo(e,t){let n=Xu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Qu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Jr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!eo(t,o,r.impl_model||Tn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var bg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ia=[...gg,...nr],hg=[...Zs,...Da].filter((e,t,n)=>n.indexOf(e)===t&&!Ia.includes(e));function Ju(e,t){let n=En(e)?e:{},r=En(t)?t:{},o=[];for(let i of Ia){let a=n[i]??null,l=r[i]??null;a!==l&&o.push({key:i,label:bg[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let s=[];for(let i of[...hg,...Object.keys(r)])!Ia.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Ma(e,t,n,r,o,s){return zs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function ed(e,t){let n={};for(let r of Da){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function td(e,t){let n={};for(let r of nr){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Na=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ti={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function qa(e,t,n,r,o,s=null){let i=$n({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(a=>({key:a,...i[a]}))}function nd(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let a of qa(e,t,n,r,o,s))i[a.source]+=1;return i}function rd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function od(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var u$=[...Xs,...nr];var sd=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function No(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ni(e){if(!No(e)||!No(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>No(n)&&No(n.models));return t.length>0?t:null}function Nn(e,t){let n=ni(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function id(e,t){return No(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ad(e,t){let n=ni(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return id(r,r.models[t]);return[]}function yg(e){let t=ni(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of id(r,o))n.includes(s)||n.push(s);return n}function vg(e,t){if(!t)return yg(e);let r=ni(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of ad(e,s))o.includes(i)||o.push(i);return o}function ld(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Nn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?ad(t,r.impl_model):vg(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Fa=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function cd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${ti[t.source]})`}function ja(e){return e.filter(t=>t!==null).join(`
`)}function qo(e){if(typeof e!="object"||e===null)return null;let t=Ar(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function Er(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),o=pr(e,"orchestration_speed"),s=cd([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",o)])}}function wg(e,t){return e===null||e.value===null||Fa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function kg(e){return e===null||Fa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function $g(e){return e===null?null:e.value==="auto"?"auto":Fa.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),o=pr(e,"impl_model"),s=pr(e,"impl_effort"),i=pr(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":cd([wg(r,t??null),kg(o),$g(s),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",o),fr("impl_effort",s),fr("impl_speed",i)])}}var xg=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var ud={orchestration_model:["fable"],impl_runtime:["claude"]},Ag={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function dd(e){return typeof e=="object"&&e!==null?e:null}function pd(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Sg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>xg.includes(t))}function to(e,t=e){let n=dd(e);if(!n)return null;let r=pd(n.rec_orchestration_model,ud.orchestration_model);if(r.length===0)return null;let o=pd(n.rec_impl_runtime,ud.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=dd(t)||{},a=Object.keys(s),l=0,u=0;for(let m of a){let y=i[m];typeof y=="string"&&y.length>0&&(l+=1,y===s[m]&&(u+=1))}let d=l===0?"unapplied":u===a.length?"applied":"diverged";return{reasons:Sg(n.rec_reason),rec:s,state:d}}function ri(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=Ag[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function oi(e){return e.replace(/\/+$/,"")}function Eg(e,t){let n=oi(e),r=oi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function si(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Eg(r,o))continue;let s=oi(r),i=oi(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}async function Tg(e){let t=await Sn(e);de(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function ii(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Tg(e)}}
    >
      ⧉
    </button></span
  >`}function ai(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function _d(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Tr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function li(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function md(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let a=typeof i.finished_at=="number"?i.finished_at:0;a>=o&&(o=a,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function ci(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,a=s.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function ui(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Cg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:ai(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function gd(e,t){let n=Cg(e,t);return n?c`<button
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
            >${ui(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Tr(n.deploy.elapsed_ms)}`:""}</span
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
  </div>`}function Rg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function jo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function di(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,y)=>(m.requested_at||0)-(y.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof o?.last_error=="string"?o.last_error:null,l=o?Rg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!a),label:u?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:l,error:a,confirmation:d}}function Fo(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Og={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function bd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(u){return Number.isInteger(i[u])?Number(i[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Og[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function pi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Lg(e){return c`<div
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
  </div>`}function fi(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,a=e.cross_lane||null,l=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!a&&!l?"":c`<div class="worker-deps">
    ${a?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${a.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${a.label}
        </button>`:""}
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
        >`:""}
    ${t.map(u=>c`<span
          class=${`worker-dep worker-dep--pred${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${n.map(u=>c`<span
          class=${`worker-dep worker-dep--released${u.foreign?" worker-dep--foreign":""}`}
          title=${u.title||""}
          >${u.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${u.id}
                data-root-dir=${u.root_dir||""}
              >
                ${u.label}
              </button>`:u.label}</span
        >`)}${r?c`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(u=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${u.id}
          aria-label=${`scope \uACB9\uCE68 ${u.id} (${u.location_label})`}
          title=${[`\uACB9\uCE68 ${u.id} (${u.location_label})`,...u.prefixes].join(`
`)}
        >
          ⧉ ${u.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?Lg(i):""}
  </div>`}function _i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Ig(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function hd(e){return e?c`<button
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
  >`:""}function yd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function gi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Dg(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),o=wn(e.done_at);return c`<div
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
      ${yd(e.pr_url,e.pr_number)}${o?c`<span
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
            title=${_d(e.work_kind)}
            >작업 ${Tr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Fn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Dg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=an(e.usage),s=tr(e.usage),i=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,u=l?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",y=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,P=e.lane==="done"?"":_i(e.workflow),F=e.lane==="done"?"":hd(e.from_id),V=gi(e.priority),ce=c`<span class="worker-mini__title">${e.title}</span>`,J=yd(e.pr_url,e.pr_number),B=r.map(we=>we===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${we}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${we===e.completion_badge&&e.completion_title||""}
          >${we}</span
        >`),O=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",W=o.length>0?o.map(we=>c`<span class="worker-usage" title=${we.tooltip}
              >${we.label}</span
            >`):s?c`<span class="worker-usage" title=${So(e.usage)}
            >${s}</span
          >`:"",Q=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",oe=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",se=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",q=e.discard,X=q?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${q?.attempt_id||""}
          data-operation-id=${q?.operation?.operation_id||""}
          data-discard-mode=${q?.confirmation||"unmerged"}
          ?disabled=${q?!q.enabled:e.discard_enabled===!1}
          title=${q?q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${q?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.stale_work||null,ie=ne?c`${ne.can_resume||ne.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ne.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ne.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            다시 확인
          </button>`:""}`:"",Pe=ne?c`<div class="worker-mini__stale">
        <strong>${ne.title}</strong>
        <span>${ne.summary}</span>
        <span>${ne.cause}</span>
        ${ne.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",He=e.revise_action?c`<button
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
        </button>`:"",fe=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Y=mi(e.rec),Ae=ii(e.log_path),Oe=b||P||F||fe||Y||W||Ae?c`<div class="worker-chips">
          ${b}${P}${F}${fe?pi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Y}${W}${Ae}
        </div>`:"",S=fi(e.dependency_chips),ae=Fo(e),Se=t.actions?t.actions:"",me=!!(i||e.merge_action||e.cancel_action||e.discard_action||q?.operation||e.revise_action||ne);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${V}${F}${J}${ce}${Se}
          </div>
          <div class="worker-mini__row2">
            ${W}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${on(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${_d(e.work_kind)}
                  >작업 ${Tr(e.work_ms)}</span
                >`:""}${B}${Q}
            <span class="worker-mini__actions"
              >${oe}${se}${X}</span
            >
            ${no(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${m}${k}${V}${J}${B}${y}${O}${Se}
            </div>
            <div class="worker-mini__body">${ce}${Pe}</div>
            ${S}${Oe}${me?c`<div class="worker-mini__foot">
                  ${Q}
                  <span class="worker-mini__actions"
                    >${oe}${se}${X}${He}${ie}</span
                  >
                  ${Fo(e)}
                </div>`:""}
            ${no(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${k}${V}${ce}${J}${B}${y}${O}${Q}${oe}${se}${X}${Se}
            </div>
            ${S}${Oe}${ae} ${no(e)}`}
  </div>`}function Pg(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Mg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Ua(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,l=Mg[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),y=fi(e.dependency_chips),b=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=_i(u),P=hd(e.from_id),F=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
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
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${l}
              >세션 권장</span
            >`:""}${mi(e.rec)}${Ig(u)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?js(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${y}
    ${b||k||P||F?c`<div class="worker-chips">
          ${b}${k}${P}${pi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Pg(t.lanes,e.id)}
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
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
  </section>`}function fd(e,t,n){return c`<button
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
        ${fd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${fd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Ng(o))}
          </div>`}
    </section>
  </div>`}function Ng(e){let t=e.drop||{},n=e.badge?c`<span
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
  </section>`:""}var vd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Bo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function yi(e,t){let n=vd.find(o=>o.step===e);if(!n)return null;let r=vd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function wd(e){let t=Bo.findIndex(n=>n.step===e);return Bo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=Bo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function qg(e){let t=Bo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Bo.length}}function vi(e){let t=qg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var za=new Set(["queued","running","retry_pending"]),kd=new Set(["failed","succeeded"]),Fg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Uo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},jg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Uo.base_containment,child_sweep:Uo.child_sweep,branch_cleanup:Uo.branch_cleanup,parent_close:Uo.parent_close};function Bg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Ug(e,t,n){return!["verify","deploy"].includes(e.kind)||![...za,...kd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Wg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function Wa(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Fg[o];if(!s)return null;let i=yi(n,`${r} ${s}`);return i?{...i,active:za.has(o),failed:o==="failed"}:null}function zg(e){return!e||typeof e!="object"?null:jg[e.step]||null}function Wo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=zg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Bg(e.merge_sha)?e.merge_sha:null,l=!s&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Ug(k,t,a)).sort(Wg):[],u=i?l:[],d=u.find(k=>za.has(k.state));if(d)return Wa(d);if(o)return o.step==="repo_operations"&&l[0]?Wa(l[0],!0):null;let m=u.find(k=>kd.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Wa(m);if(r){let k=yi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Uo[e.cleanup_cursor]:null;if(!y)return null;let b=yi(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function wi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Hg="\uBBF8\uC801\uC7AC";function Ha(e,t){let n=wo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Gg=10080*60*1e3;function $d(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Gg)return null;let o=wo(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${on(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function xd(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function Ad(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let u=Ha(s,{id:l,location_label:o.get(l)||Hg}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),a.push(u)}a.length>0&&r.set(s,a)}return r}function Ga(e,t){return`${e}\0${t}`}function Sd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ka(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function zo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ed(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${zo(o)})`,location_label:zo(o),scope:null,same_lane_ahead:!1};let i=Ka(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function Td(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=Ga(a.root_dir,l.id);n.set(u,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),o.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let u=Ga(a.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,y=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=o.get(u);if(b)for(let k of y){let P=r.get(k);P&&P!==u&&!b.includes(P)&&b.push(P)}}let s=(a,l)=>{let u=new Set,d=[a];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...o.get(m)||[]))}return!1},i=new Map;for(let[a,l]of o){let u=[];for(let d of l){let m=n.get(d);s(d,a)&&m&&u.push(m)}u.length>0&&i.set(a,u)}return i}function Cd(e,t){return Ga(e,t)}var Rd=1,Ho=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ya=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ro={show_blocked:!0,spec:"all"},Od={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Kg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Vg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Sr(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Yg(e,t){let{winners:n,resumed_from_ids:r}=Vu(e,t),o=new Map;for(let[s,i]of n){let a=i.attempt,l=i.run_state,u=i.started_at,d=typeof a.session_id=="string"&&a.session_id.length>0;o.set(s,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:Ln(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(a.attempt_id)})}return o}function Ld(e,t){let n=e[t];if(!n)return"";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Dt(e){return e&&typeof e=="object"?e:{}}function Xg(e,t,n){let r=Dt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let a=y=>$n({pin:y,global:i,execution_defaults:o,runner_catalog:s,route:n}),l,u;try{l=a(r),u=a(null)}catch{return null}let d=Id(Er(l,s),Er(u,s)),m=Id(_r(l,null),_r(u,null));return d||m?{orchestration:d,worker:m}:null}function Id(e,t){return!e||t&&t.text===e.text?null:e}function Dd(e,t){let n=Ka(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Zg(e,t,n){let r=t.get(e);if(!r)return Dd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return zo(r)}function Qg(e,t,n,r){let o=t.get(e);if(!o)return{label:Dd(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),a=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${a} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":zo(o),title:""}}function Jg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function eb(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function tb(e,t,n,r,o,s,i){let a=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",y=Array.isArray(l.entries)?l.entries:[],b=[];y.forEach((V,ce)=>{let J=V&&typeof V.bead_id=="string"?V.bead_id:"";if(J.length===0)return;let B=V&&typeof V.root_dir=="string"?V.root_dir:"",O=n.get(J),W=O?O.state:void 0,Q=W==="running"||W==="pr_wait"||W==="done",oe=!O||W==="runnable",se=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,q=Qg(J,n,r,t),X=b.length>0?b[b.length-1].id:null,ne=m==="confirmed"&&X!==null&&!(t.get(J)||[]).includes(X);b.push({id:J,title:o.get(J)||J,root_dir:O?O.root_dir:B,workspace_name:O?O.workspace_name:s.get(B)||"",seq:ce+1,location_label:q.label,location_title:q.title,draggable:!Q,fixed:Q,done:W==="done",unplaced:oe,mismatch:ne,...se!==null?{queue_index:se}:{}})}),b.forEach((V,ce)=>{V.seq=ce+1});let k=b.length>0&&b.every(V=>V.done),P=b.filter(V=>!V.fixed&&i.armed_by_bead.get(V.id)!==d).map(V=>V.id),F=eb(d,m,b,k,P,i);a.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(V=>V.mismatch||V.unplaced),unlaunched:P,...F})}),a}function nb(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function rb(e,t,n,r,o){let s=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=s.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:y}=nb(l,t,n);y!==void 0&&(l.scope_state=y),s.set(u,{cards:[l],scope:m})}let i=new Map;for(let l of s.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let y of l.cards)y.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=i.get(d);m?m.push(l):i.set(d,[l])}let a=(l,u,d)=>{let m=u.cards[0],y={id:m.id,title:m.title,location_label:Zg(m.id,r,o),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let l of i.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=si(l[u].scope,l[d].scope);m.length!==0&&(a(l[u],l[d],m),a(l[d],l[u],m))}}function Va(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ki(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Go(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...ro,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Ho.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let T of o)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T);let d=new Map;for(let T of o)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);let m=[],y=[],b=[],k=[],P=[],F=[],V=new Map,ce=new Map,J=new Map,B=new Map,O=new Map,W=new Map,Q=new Map,oe=new Set,se=new Map,q=new Map,X=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let ue=T.root_dir,Re=T.name||ue,je=u.get(ue),Me=je&&typeof je.revision=="number"?je.revision:typeof T.revision=="number"?T.revision:0,et=Dt(T.attempts),yt=Dt(T.bead_titles);for(let[M,j]of Object.entries(yt))typeof j=="string"&&j.length>0&&X.set(M,j);let Ke=Dt(T.bead_times),z=Dt(T.pr_observations),ee=Dt(T.admission),Ie=Dt(T.revise_parked),lt=Dt(T.merge_queue_state),it=Dt(T.cleanup_failed),De=Dt(T.discard_operations),Ue=Dt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&se.set(ue,Dt(T.bead_scope));let ct=Dt(T.bead_workflow),tt=Dt(T.pr_activity),ft=Array.isArray(T.repo_operations)?T.repo_operations:[],Pt=Array.isArray(T.merge_queue)?T.merge_queue:[],Ft=new Set(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>M.bead_id)),Ht=new Map(Pt.filter(M=>M&&typeof M.bead_id=="string").map(M=>[M.bead_id,M])),Mt=Array.isArray(T.queue)?T.queue:[];for(let M of[...Mt,...Array.isArray(T.pr_wait)?T.pr_wait:[]])M&&typeof M.bead_id=="string"&&typeof M.armed_by_lane=="string"&&M.armed_by_lane.length>0&&W.set(M.bead_id,M.armed_by_lane);for(let M of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof M=="string"&&M.length>0&&oe.add(M);let Nt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(M=>M&&/^s[1-5]$/.test(M.id)&&Array.isArray(M.entries)),kt=Dt(T.lane_states),We=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Nt.length);J.set(ue,We),B.set(ue,Mt.length);let L=new Map(Nt.map(M=>[M.id,M])),Z=new Map;for(let M of Nt)for(let j of M.entries)j&&typeof j.bead_id=="string"&&Z.set(j.bead_id,M.id);for(let[M,j]of Object.entries(Ue))Array.isArray(j)&&O.set(M,j.filter(ve=>typeof ve=="string"&&ve.length>0));let ge=Array.isArray(T.done)?T.done:[];for(let M of ge)M&&typeof M.bead_id=="string"&&F.push({id:M.bead_id,root_dir:ue,workspace_name:Re});let E=new Map;for(let M of ge)M&&typeof M.bead_id=="string"&&typeof M.added_at=="number"&&E.set(M.bead_id,M.added_at);let G=M=>({id:M,title:yt[M]||M,root_dir:ue,workspace_name:Re,expected_revision:Me,draggable:!1,...Dt(Ke[M]).created_at?{created_at:Dt(Ke[M]).created_at}:{},...Dt(Ke[M]).updated_at?{updated_at:Dt(Ke[M]).updated_at}:{}}),Ce=M=>{let j=ct[M]?.chips?.pr;return j&&typeof j.number=="number"&&typeof j.url=="string"?{pr_number:j.number,pr_url:j.url}:{}},ze=M=>Object.hasOwn(Ue,M)?{blocked_by:Array.isArray(Ue[M])?Ue[M].filter(j=>typeof j=="string"&&j.length>0):[]}:{},$e=new Set;for(let[M,j]of Yg(et,E)){$e.add(M);let ve=j.run_state==="failed"?Jg(et,j.attempt_id):null;ve!==null&&Q.set(M,ve),y.push({...G(M),lane:"running",...ze(M),...Z.has(M)?{serial_lane_id:Z.get(M)}:{},attempt_id:j.attempt_id,run_state:j.run_state,status:j.status||void 0,workflow:ct[M]||null,can_pause:j.can_pause,can_resume:j.can_resume,started_at:j.started_at,last_event_at:j.last_event_at,last_activity:j.last_activity,legs:j.legs,runner:j.runner,model:j.model,effort:j.effort,speed:j.speed,resumed_from:j.resumed_from,continuation_mode:j.continuation_mode,usage:j.usage,exec_chips:{orchestration:qo(j),worker:null},discard:qn(De,M,{attempt_id:j.attempt_id}),badges:j.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:j.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:j.run_state==="failed"})}for(let[M,j]of Ku(et)){if(y.some(Xe=>Xe.id===M))continue;let ve=j.attempt;y.push({...G(M),lane:"running",kind:"session",...ze(M),attempt_id:typeof ve.attempt_id=="string"?ve.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ct[M]||null,can_pause:!1,can_resume:!1,started_at:j.started_at,last_event_at:typeof ve.last_event_at=="number"?ve.last_event_at:null,last_activity:ve.last_activity&&typeof ve.last_activity=="object"?ve.last_activity:null,legs:Array.isArray(ve.legs)?ve.legs:[],runner:typeof ve.runner=="string"?ve.runner:null,model:typeof ve.model=="string"?ve.model:null,effort:typeof ve.effort=="string"?ve.effort:null,speed:typeof ve.speed=="string"?ve.speed:null,resumed_from:null,continuation_mode:null,usage:ve.usage&&typeof ve.usage=="object"?ve.usage:null,exec_chips:{orchestration:qo(ve),worker:null},discard:qn(De,M,{merge_queued:!0}),badges:[j.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let M of Array.isArray(T.session_active)?T.session_active:[]){let j=M&&M.bead_id;typeof j!="string"||$e.has(j)||($e.add(j),Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&O.set(j,M.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)),typeof M.title=="string"&&M.title.length>0&&X.set(j,M.title),y.push({...G(j),title:M.title||yt[j]||j,lane:"running",kind:"session",status:"in_progress",started_at:Va(M.started_at)??Va(M.updated_at)??void 0,updated_at:Va(M.updated_at)??void 0,workflow:M.workflow||null,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(M.session_refs)?M.session_refs:[],badges:[],alert:!1}))}for(let M of Array.isArray(T.pr_wait)?T.pr_wait:[]){let j=M&&M.bead_id;if(typeof j!="string"||$e.has(j))continue;$e.add(j);let ve=Dt(z[j]),Xe=Dt(ve.pr),ke=ve.gate?Dt(ve.gate):null,Ze=Ft.has(j),st=Ht.get(j)?.continuation_action||null,_t=!!st&&st.continuation===null,xt=lt.active===j,Kt=M.external===!0,Et=it[j]||null,Jt=Dt(tt[j]),Ne=Wo({bead_id:j,merge_sha:M.merge_sha,cleanup_cursor:M.cleanup_cursor,merge_progress:Jt.merge_progress||null,cleanup_failed:Et,repo_operations:ft}),mn=wi(Ne),en=!!ke&&ke.base_badge==="\uCDA9\uB3CC",jt=!!Et&&["child_sweep","branch_cleanup","parent_close"].includes(Et.step)&&!!ke&&ke.tier==="merged",Qt=Kt&&!!Et&&!!ke&&ke.tier==="merged",gn=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier)&&ke.reason!=="review_receipt_undetermined",_e=qn(De,j,{external:Kt,merge_active:xt||Ne?.step==="merge",merge_queued:Ze,cleanup_active:mn,merged:!!Et||ke?.tier==="merged"}),A=!!_e.operation;b.push({...G(j),lane:"pr_wait",...ze(j),workflow:ct[j]||null,pr_number:typeof Xe.number=="number"?Xe.number:null,pr_url:typeof Xe.url=="string"?Xe.url:void 0,external:Kt,usage:Ln(et,j),merge_step:Ne,badges:_t?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ne?[ke?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Et?[Cr(Et.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(Et.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:Ne?Ne.failed===!0:!!Et||gn,reason:Et&&Ne?.active!==!0?vi(Et.step):"PR \uB300\uAE30",merge_action:ke?.tier==="merged"&&!jt&&!Qt?!1:!Ze||_t,merge_enabled:!A&&(_t||ke?.enabled===!0||en||jt||Qt),merge_label:_t?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Qt||jt?"\uC815\uB9AC \uC7AC\uAC1C":en&&!jt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:_t?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?_e.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_e.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_e.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Qt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":jt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":en?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ze&&!_t,cancel_enabled:!xt,continuation_mismatch:st?.mismatch||null,discard:_e,discard_action:_e.action,discard_enabled:_e.enabled,discard_title:_e.title})}let at=(M,j,ve,Xe)=>{let ke=M&&M.bead_id;if(typeof ke!="string"||$e.has(ke))return null;$e.add(ke);let Ze=Ie[ke],st=qn(De,ke),_t=st.operation?st:null,xt={...G(ke),lane:j,workflow:ct[ke]||null,draggable:!_t,discard:_t||void 0,reason:Ld(ee,ke),seq:ve+1,queue_position:ve+1,queue_index:ve,queue_length:Xe,badges:Ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ze,revise_action:!!Ze,revise_enabled:!!Ze&&!_t,revise_title:Ze?Ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Kt=ze(ke);return Object.hasOwn(Kt,"blocked_by")&&(xt.blocked_by=Kt.blocked_by),xt};for(let M=0;M<Mt.length;M++){let j=at(Mt[M],"queue",M,Mt.length);if(!j)continue;k.push(j);let ve=V.get(ue);ve?ve.push(j):V.set(ue,[j])}let ot=M=>{let j=b.find(Ze=>Ze.id===M&&Ze.root_dir===ue);if(j)return{id:M,title:j.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ve=y.find(Ze=>Ze.id===M&&Ze.root_dir===ue),Xe=ve?ve.run_state:Kg(et,M),ke=Xe==="failed"||Xe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Xe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:M,title:ve?ve.title:G(M).title,badge:ke}},he=[];for(let M=0;M<Math.max(We,Nt.length);M++){let j=`s${M+1}`,ve=L.get(j),Xe=ve&&Array.isArray(ve.entries)?ve.entries:[],ke=Dt(kt[j]),Ze=Array.isArray(ke.occupied_by)?ke.occupied_by.filter(xt=>typeof xt=="string"):[],st=new Set(Ze),_t=[];for(let xt=0;xt<Xe.length;xt++){let Kt=Xe[xt]&&Xe[xt].bead_id;if(typeof Kt=="string"&&st.has(Kt)){$e.add(Kt);continue}let Et=at(Xe[xt],j,xt,Xe.length);Et&&(_t.push(Et),k.push(Et))}_t.length===0&&Ze.length===0&&(We<=1||M>=We)||he.push({id:j,index:M,items:_t,raw_length:Xe.length,occupied_by:Ze,occupants:Ze.map(xt=>ot(xt)),corrections:Array.isArray(ke.corrections)?ke.corrections.length:0,cycle:ke.cycle===!0,..._t.length===0&&Ze.length===0?{empty:!0}:{}})}ce.set(ue,he);let Je=Array.from({length:We},(M,j)=>{let ve=`s${j+1}`,Xe=L.get(ve),ke=Xe&&Array.isArray(Xe.entries)?Xe.entries:[],Ze=Dt(kt[ve]);return{id:ve,index:ke.length,length:ke.length,occupied_by:Array.isArray(Ze.occupied_by)?Ze.occupied_by.filter(st=>typeof st=="string"):[]}});for(let M of Array.isArray(T.runnable)?T.runnable:[]){let j=M&&M.bead_id;if(typeof j!="string"||$e.has(j))continue;$e.add(j);let ve=M.workflow&&typeof M.workflow=="object"?M.workflow:null,Xe=ve&&typeof ve.route=="string"&&ve.route||(typeof M.route=="string"?M.route:null),ke=Xg(Dt(je),M.exec_pins,Xe),Ze=to(M.rec,M.exec_pins);Array.isArray(M.blocked_by)&&M.blocked_by.length>0&&O.set(j,M.blocked_by.filter(st=>typeof st=="string"&&st.length>0)),typeof M.title=="string"&&M.title.length>0&&X.set(j,M.title),Array.isArray(M.scope)&&q.set(j,M.scope.filter(st=>typeof st=="string"&&st.length>0)),m.push({...G(j),title:M.title||yt[j]||j,lane:"runnable",draggable:!0,queue_placeable:!0,reason:Ld(ee,j),created_at:M.created_at??void 0,updated_at:M.updated_at??void 0,status:typeof M.status=="string"?M.status:void 0,labels:Array.isArray(M.labels)?M.labels:[],spec_id:typeof M.spec_id=="string"?M.spec_id:"",published:M.published===!0,workflow:ve||(Xe?{route:Xe,chips:{route:Xe}}:null),...ke?{exec_chips:ke}:{},...Ze?{rec:Ze}:{},blocked:M.blocked===!0,...Array.isArray(M.blocked_by)?{blocked_by:M.blocked_by.filter(st=>typeof st=="string"&&st.length>0)}:{},place_index:Mt.length,place_lanes:Je})}for(let M of ge){let j=M&&M.bead_id;if(typeof j!="string"||$e.has(j)||($e.add(j),s!==void 0&&typeof M.added_at=="number"&&M.added_at<s))continue;let ve=Vg(et,j),Xe=ve&&typeof ve.done_kind=="string"?ve.done_kind:null;P.push({...G(j),lane:"done",done:!0,done_layout:"three_line",usage:Ln(et,j),work_ms:ci(et,j),done_at:typeof M.added_at=="number"?M.added_at:void 0,done_kind:Xe,...Ce(j),badges:[...Xe&&Od[Xe]?[Od[Xe]]:[],...li(et,j)]})}}let ne=new Map;o.forEach((T,ue)=>{T&&typeof T.root_dir=="string"&&ne.set(T.root_dir,ue)});let ie=n&&n.running_sort==="repo"?"repo":"started";y.sort((T,ue)=>{let Re=T.kind==="session",je=ue.kind==="session";if(Re!==je)return Re?1:-1;if(Re&&je){let yt=ki(ue.updated_at)-ki(T.updated_at);return yt!==0?yt:T.id.localeCompare(ue.id)}if(ie==="repo"){let yt=ne.get(T.root_dir)??Number.MAX_SAFE_INTEGER,Ke=ne.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(yt!==Ke)return yt-Ke}let Me=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,et=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return Me!==null&&et!==null&&Me!==et?Me-et:Me===null&&et!==null?1:Me!==null&&et===null?-1:T.id.localeCompare(ue.id)}),P.sort((T,ue)=>(ue.done_at??0)-(T.done_at??0));let Pe=o.length>0?o:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),He=new Set(m.map(T=>T.root_dir)),fe=[];for(let T of Pe){if(!T||typeof T.root_dir!="string")continue;let ue=V.get(T.root_dir)||[],Re=ce.get(T.root_dir)||[];!(ue.length>0||Re.some(Me=>Me.items.length>0||Me.occupied_by.length>0))&&!He.has(T.root_dir)||fe.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=Rd?T.slots:Rd,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:Dt(T.runner_catalog),items:ue,sublanes:{parallel:ue,serial:Re},serial_lane_count:J.get(T.root_dir)||0,raw_queue_length:B.get(T.root_dir)||0})}let Y={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:fe,running:y,pr_wait:b,done:P,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Ae=Sd(Y);for(let T of F)Ae.has(T.id)||Ae.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let ue=Ae.get(T.id);T.blockers=(T.blocked_by||[]).map(Re=>Ed(Re,ue,Ae,o))}for(let T of[...Y.queue,...Y.runnable,...Y.running,...Y.pr_wait]){let ue=(T.blockers||[]).map(je=>{let Me=Ae.get(je.id)?.root_dir;return{...Ha(T.id,je),openable:!0,...typeof Me=="string"&&Me.length>0?{root_dir:Me}:{}}});if(ue.length===0)continue;let Re={predecessors:ue};T.dependency_chips=Re}rb(Y,se,q,Ae,o);let Oe=Td(Y.queue_groups);for(let T of Y.queue_groups)for(let ue of T.sublanes.serial){let Re=Oe.get(Cd(T.root_dir,ue.id));Re&&(ue.cross_wait_peers=Re)}Y.chain_lanes=tb(a&&Array.isArray(a.lanes)?a.lanes:[],O,Ae,o,X,d,{armed_by_bead:W,failed_by_bead:Q,disarmed_lanes:oe});let S=new Map;for(let T of[...Y.queue,...Y.runnable])S.has(T.id)||S.set(T.id,T);let ae=new Set;for(let T of Y.chain_lanes)for(let ue of T.rows){if(T.status==="confirmed"&&!ue.unplaced&&!ue.fixed&&ae.add(ue.id),!T.draft&&!ue.unplaced)continue;let Re=S.get(ue.id);Re&&(Re.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let Se=new Map(Y.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...Y.queue,...Y.running]){let ue=W.get(T.id);if(typeof ue!="string"||ue.length===0)continue;let Re=Se.get(ue);T.armed_lane_chip=Re===void 0?{lane_id:ue,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ue,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let me=[];for(let T of V.values())for(let ue of T)ae.has(ue.id)||me.push(ue);me.sort((T,ue)=>{let Re=T.workspace_name.localeCompare(ue.workspace_name);return Re!==0?Re:(T.queue_index??0)-(ue.queue_index??0)}),Y.parallel_rows=me;let we={};for(let[T,ue]of Ae)typeof ue.root_dir=="string"&&ue.root_dir.length>0&&(we[T]=ue.root_dir);for(let T of Y.chain_lanes)for(let ue of T.rows)!Object.hasOwn(we,ue.id)&&ue.root_dir.length>0&&d.has(ue.root_dir)&&(we[ue.id]=ue.root_dir);Y.owner_of=we;let ye=Y.runnable.length;Y.runnable_all=Y.runnable.slice();let Le=Y.runnable;i.show_blocked||(Le=Le.filter(T=>T.blocked!==!0));let Ye=Le.length;i.spec==="with"?Le=Le.filter(T=>T.published===!0):i.spec==="without"&&(Le=Le.filter(T=>T.published!==!0)),Y.runnable_hidden={blocked:ye-Ye,spec:Ye-Le.length};let bt=(T,ue)=>{let Re=ki(ue.updated_at)-ki(T.updated_at);return Re!==0?Re:T.id.localeCompare(ue.id)},mt=l==="repo_spec"?(T,ue)=>{let Re=T.published===!0?0:1,je=ue.published===!0?0:1;return Re!==je?Re-je:bt(T,ue)}:bt;if(l==="updated_flat")Y.runnable=Le.slice().sort(bt),Y.runnable_sections=[];else{let T=new Map;for(let je of Le){let Me=T.get(je.root_dir);Me?Me.push(je):T.set(je.root_dir,[je])}let ue=[],Re=[];for(let je of Pe){if(!je||typeof je.root_dir!="string")continue;let Me=(T.get(je.root_dir)||[]).slice().sort(mt);T.delete(je.root_dir),Me.length!==0&&(ue.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Me.map(et=>({...et,workspace_name:""}))}),Re.push(...Me))}for(let[je,Me]of T){let et=Me.slice().sort(mt);ue.push({root_dir:je,name:et[0]?.workspace_name||je,items:et.map(yt=>({...yt,workspace_name:""}))}),Re.push(...et)}Y.runnable=Re,Y.runnable_sections=ue}return Y}var ob="\uC0AC\uC774\uD074";function sb(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Xa(e,t,n){let r=Go(e,t),o=[],s=new Set,i=(l,u)=>{for(let d of l)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let a=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:a===null?o:o.filter(l=>l.root_dir===a),blocked_by_map:sb(e)}}function Pd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let a=Ca(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:a,...a?{reason:ob}:{}})}return s.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,u=r!==void 0&&a.root_dir===r;return l!==u?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),s}function Md(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Hd,setPrototypeOf:Nd,isFrozen:ib,getPrototypeOf:ab,getOwnPropertyDescriptor:lb}=Object,{freeze:pn,seal:In,create:rl}=Object,{apply:ol,construct:sl}=typeof Reflect<"u"&&Reflect;pn||(pn=function(t){return t});In||(In=function(t){return t});ol||(ol=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});sl||(sl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var $i=fn(Array.prototype.forEach),cb=fn(Array.prototype.lastIndexOf),qd=fn(Array.prototype.pop),Ko=fn(Array.prototype.push),ub=fn(Array.prototype.splice),Ai=fn(String.prototype.toLowerCase),Za=fn(String.prototype.toString),Qa=fn(String.prototype.match),Vo=fn(String.prototype.replace),db=fn(String.prototype.indexOf),pb=fn(String.prototype.trim),jn=fn(Object.prototype.hasOwnProperty),dn=fn(RegExp.prototype.test),Yo=fb(TypeError);function fn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return ol(e,t,r)}}function fb(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return sl(e,n)}}function gt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ai;Nd&&Nd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(ib(t)||(t[r]=s),o=s)}e[o]=!0}return e}function _b(e){for(let t=0;t<e.length;t++)jn(e,t)||(e[t]=null);return e}function rr(e){let t=rl(null);for(let[n,r]of Hd(e))jn(e,n)&&(Array.isArray(r)?t[n]=_b(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=rr(r):t[n]=r);return t}function Xo(e,t){for(;e!==null;){let r=lb(e,t);if(r){if(r.get)return fn(r.get);if(typeof r.value=="function")return fn(r.value)}e=ab(e)}function n(){return null}return n}var Fd=pn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ja=pn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),el=pn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),mb=pn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),tl=pn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),gb=pn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),jd=pn(["#text"]),Bd=pn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),nl=pn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ud=pn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xi=pn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),bb=In(/\{\{[\w\W]*|[\w\W]*\}\}/gm),hb=In(/<%[\w\W]*|[\w\W]*%>/gm),yb=In(/\$\{[\w\W]*/gm),vb=In(/^data-[\-\w.\u00B7-\uFFFF]+$/),wb=In(/^aria-[\-\w]+$/),Gd=In(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),kb=In(/^(?:\w+script|data):/i),$b=In(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Kd=In(/^html$/i),xb=In(/^[a-z][.\w]*(-[.\w]+)+$/i),Wd=Object.freeze({__proto__:null,ARIA_ATTR:wb,ATTR_WHITESPACE:$b,CUSTOM_ELEMENT:xb,DATA_ATTR:vb,DOCTYPE_NAME:Kd,ERB_EXPR:hb,IS_ALLOWED_URI:Gd,IS_SCRIPT_OR_DATA:kb,MUSTACHE_EXPR:bb,TMPLIT_EXPR:yb}),Zo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ab=function(){return typeof window>"u"?null:window},Sb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},zd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ab(),t=_e=>Vd(_e);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Zo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:y,trustedTypes:b}=e,k=l.prototype,P=Xo(k,"cloneNode"),F=Xo(k,"remove"),V=Xo(k,"nextSibling"),ce=Xo(k,"childNodes"),J=Xo(k,"parentNode");if(typeof i=="function"){let _e=n.createElement("template");_e.content&&_e.content.ownerDocument&&(n=_e.content.ownerDocument)}let B,O="",{implementation:W,createNodeIterator:Q,createDocumentFragment:oe,getElementsByTagName:se}=n,{importNode:q}=r,X=zd();t.isSupported=typeof Hd=="function"&&typeof J=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ne,ERB_EXPR:ie,TMPLIT_EXPR:Pe,DATA_ATTR:He,ARIA_ATTR:fe,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:Oe}=Wd,{IS_ALLOWED_URI:S}=Wd,ae=null,Se=gt({},[...Fd,...Ja,...el,...tl,...jd]),me=null,we=gt({},[...Bd,...nl,...Ud,...xi]),ye=Object.seal(rl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Ye=null,bt=Object.seal(rl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ht=!0,mt=!0,T=!1,ue=!0,Re=!1,je=!0,Me=!1,et=!1,yt=!1,Ke=!1,z=!1,ee=!1,Ie=!0,lt=!1,it="user-content-",De=!0,Ue=!1,ct={},tt=null,ft=gt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Ft=gt({},["audio","video","img","source","image","track"]),Ht=null,Mt=gt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",L=We,Z=!1,ge=null,E=gt({},[Nt,kt,We],Za),G=gt({},["mi","mo","mn","ms","mtext"]),Ce=gt({},["annotation-xml"]),ze=gt({},["title","style","font","a","script"]),$e=null,at=["application/xhtml+xml","text/html"],ot="text/html",he=null,Je=null,M=n.createElement("form"),j=function(A){return A instanceof RegExp||A instanceof Function},ve=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Je&&Je===A)){if((!A||typeof A!="object")&&(A={}),A=rr(A),$e=at.indexOf(A.PARSER_MEDIA_TYPE)===-1?ot:A.PARSER_MEDIA_TYPE,he=$e==="application/xhtml+xml"?Za:Ai,ae=jn(A,"ALLOWED_TAGS")?gt({},A.ALLOWED_TAGS,he):Se,me=jn(A,"ALLOWED_ATTR")?gt({},A.ALLOWED_ATTR,he):we,ge=jn(A,"ALLOWED_NAMESPACES")?gt({},A.ALLOWED_NAMESPACES,Za):E,Ht=jn(A,"ADD_URI_SAFE_ATTR")?gt(rr(Mt),A.ADD_URI_SAFE_ATTR,he):Mt,Pt=jn(A,"ADD_DATA_URI_TAGS")?gt(rr(Ft),A.ADD_DATA_URI_TAGS,he):Ft,tt=jn(A,"FORBID_CONTENTS")?gt({},A.FORBID_CONTENTS,he):ft,Le=jn(A,"FORBID_TAGS")?gt({},A.FORBID_TAGS,he):rr({}),Ye=jn(A,"FORBID_ATTR")?gt({},A.FORBID_ATTR,he):rr({}),ct=jn(A,"USE_PROFILES")?A.USE_PROFILES:!1,ht=A.ALLOW_ARIA_ATTR!==!1,mt=A.ALLOW_DATA_ATTR!==!1,T=A.ALLOW_UNKNOWN_PROTOCOLS||!1,ue=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=A.SAFE_FOR_TEMPLATES||!1,je=A.SAFE_FOR_XML!==!1,Me=A.WHOLE_DOCUMENT||!1,Ke=A.RETURN_DOM||!1,z=A.RETURN_DOM_FRAGMENT||!1,ee=A.RETURN_TRUSTED_TYPE||!1,yt=A.FORCE_BODY||!1,Ie=A.SANITIZE_DOM!==!1,lt=A.SANITIZE_NAMED_PROPS||!1,De=A.KEEP_CONTENT!==!1,Ue=A.IN_PLACE||!1,S=A.ALLOWED_URI_REGEXP||Gd,L=A.NAMESPACE||We,G=A.MATHML_TEXT_INTEGRATION_POINTS||G,Ce=A.HTML_INTEGRATION_POINTS||Ce,ye=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&j(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ye.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&j(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ye.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ye.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(mt=!1),z&&(Ke=!0),ct&&(ae=gt({},jd),me=[],ct.html===!0&&(gt(ae,Fd),gt(me,Bd)),ct.svg===!0&&(gt(ae,Ja),gt(me,nl),gt(me,xi)),ct.svgFilters===!0&&(gt(ae,el),gt(me,nl),gt(me,xi)),ct.mathMl===!0&&(gt(ae,tl),gt(me,Ud),gt(me,xi))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?bt.tagCheck=A.ADD_TAGS:(ae===Se&&(ae=rr(ae)),gt(ae,A.ADD_TAGS,he))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?bt.attributeCheck=A.ADD_ATTR:(me===we&&(me=rr(me)),gt(me,A.ADD_ATTR,he))),A.ADD_URI_SAFE_ATTR&&gt(Ht,A.ADD_URI_SAFE_ATTR,he),A.FORBID_CONTENTS&&(tt===ft&&(tt=rr(tt)),gt(tt,A.FORBID_CONTENTS,he)),De&&(ae["#text"]=!0),Me&&gt(ae,["html","head","body"]),ae.table&&(gt(ae,["tbody"]),delete Le.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yo('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yo('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=A.TRUSTED_TYPES_POLICY,O=B.createHTML("")}else B===void 0&&(B=Sb(b,o)),B!==null&&typeof O=="string"&&(O=B.createHTML(""));pn&&pn(A),Je=A}},Xe=gt({},[...Ja,...el,...mb]),ke=gt({},[...tl,...gb]),Ze=function(A){let pe=J(A);(!pe||!pe.tagName)&&(pe={namespaceURI:L,tagName:"template"});let Te=Ai(A.tagName),wt=Ai(pe.tagName);return ge[A.namespaceURI]?A.namespaceURI===kt?pe.namespaceURI===We?Te==="svg":pe.namespaceURI===Nt?Te==="svg"&&(wt==="annotation-xml"||G[wt]):!!Xe[Te]:A.namespaceURI===Nt?pe.namespaceURI===We?Te==="math":pe.namespaceURI===kt?Te==="math"&&Ce[wt]:!!ke[Te]:A.namespaceURI===We?pe.namespaceURI===kt&&!Ce[wt]||pe.namespaceURI===Nt&&!G[wt]?!1:!ke[Te]&&(ze[Te]||!Xe[Te]):!!($e==="application/xhtml+xml"&&ge[A.namespaceURI]):!1},st=function(A){Ko(t.removed,{element:A});try{J(A).removeChild(A)}catch{F(A)}},_t=function(A,pe){try{Ko(t.removed,{attribute:pe.getAttributeNode(A),from:pe})}catch{Ko(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(A),A==="is")if(Ke||z)try{st(pe)}catch{}else try{pe.setAttribute(A,"")}catch{}},xt=function(A){let pe=null,Te=null;if(yt)A="<remove></remove>"+A;else{let At=Qa(A,/^[\r\n\t ]+/);Te=At&&At[0]}$e==="application/xhtml+xml"&&L===We&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let wt=B?B.createHTML(A):A;if(L===We)try{pe=new y().parseFromString(wt,$e)}catch{}if(!pe||!pe.documentElement){pe=W.createDocument(L,"template",null);try{pe.documentElement.innerHTML=Z?O:wt}catch{}}let Tt=pe.body||pe.documentElement;return A&&Te&&Tt.insertBefore(n.createTextNode(Te),Tt.childNodes[0]||null),L===We?se.call(pe,Me?"html":"body")[0]:Me?pe.documentElement:Tt},Kt=function(A){return Q.call(A.ownerDocument||A,A,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Et=function(A){return A instanceof m&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Jt=function(A){return typeof a=="function"&&A instanceof a};function Ne(_e,A,pe){$i(_e,Te=>{Te.call(t,A,pe,Je)})}let mn=function(A){let pe=null;if(Ne(X.beforeSanitizeElements,A,null),Et(A))return st(A),!0;let Te=he(A.nodeName);if(Ne(X.uponSanitizeElement,A,{tagName:Te,allowedTags:ae}),je&&A.hasChildNodes()&&!Jt(A.firstElementChild)&&dn(/<[/\w!]/g,A.innerHTML)&&dn(/<[/\w!]/g,A.textContent)||A.nodeType===Zo.progressingInstruction||je&&A.nodeType===Zo.comment&&dn(/<[/\w]/g,A.data))return st(A),!0;if(!(bt.tagCheck instanceof Function&&bt.tagCheck(Te))&&(!ae[Te]||Le[Te])){if(!Le[Te]&&jt(Te)&&(ye.tagNameCheck instanceof RegExp&&dn(ye.tagNameCheck,Te)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(Te)))return!1;if(De&&!tt[Te]){let wt=J(A)||A.parentNode,Tt=ce(A)||A.childNodes;if(Tt&&wt){let At=Tt.length;for(let Bt=At-1;Bt>=0;--Bt){let nn=P(Tt[Bt],!0);nn.__removalCount=(A.__removalCount||0)+1,wt.insertBefore(nn,V(A))}}}return st(A),!0}return A instanceof l&&!Ze(A)||(Te==="noscript"||Te==="noembed"||Te==="noframes")&&dn(/<\/no(script|embed|frames)/i,A.innerHTML)?(st(A),!0):(Re&&A.nodeType===Zo.text&&(pe=A.textContent,$i([ne,ie,Pe],wt=>{pe=Vo(pe,wt," ")}),A.textContent!==pe&&(Ko(t.removed,{element:A.cloneNode()}),A.textContent=pe)),Ne(X.afterSanitizeElements,A,null),!1)},en=function(A,pe,Te){if(Ie&&(pe==="id"||pe==="name")&&(Te in n||Te in M))return!1;if(!(mt&&!Ye[pe]&&dn(He,pe))){if(!(ht&&dn(fe,pe))){if(!(bt.attributeCheck instanceof Function&&bt.attributeCheck(pe,A))){if(!me[pe]||Ye[pe]){if(!(jt(A)&&(ye.tagNameCheck instanceof RegExp&&dn(ye.tagNameCheck,A)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(A))&&(ye.attributeNameCheck instanceof RegExp&&dn(ye.attributeNameCheck,pe)||ye.attributeNameCheck instanceof Function&&ye.attributeNameCheck(pe,A))||pe==="is"&&ye.allowCustomizedBuiltInElements&&(ye.tagNameCheck instanceof RegExp&&dn(ye.tagNameCheck,Te)||ye.tagNameCheck instanceof Function&&ye.tagNameCheck(Te))))return!1}else if(!Ht[pe]){if(!dn(S,Vo(Te,Ae,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&A!=="script"&&db(Te,"data:")===0&&Pt[A])){if(!(T&&!dn(Y,Vo(Te,Ae,"")))){if(Te)return!1}}}}}}}return!0},jt=function(A){return A!=="annotation-xml"&&Qa(A,Oe)},Qt=function(A){Ne(X.beforeSanitizeAttributes,A,null);let{attributes:pe}=A;if(!pe||Et(A))return;let Te={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},wt=pe.length;for(;wt--;){let Tt=pe[wt],{name:At,namespaceURI:Bt,value:nn}=Tt,rn=he(At),Cn=nn,Ot=At==="value"?Cn:pb(Cn);if(Te.attrName=rn,Te.attrValue=Ot,Te.keepAttr=!0,Te.forceKeepAttr=void 0,Ne(X.uponSanitizeAttribute,A,Te),Ot=Te.attrValue,lt&&(rn==="id"||rn==="name")&&(_t(At,A),Ot=it+Ot),je&&dn(/((--!?|])>)|<\/(style|title|textarea)/i,Ot)){_t(At,A);continue}if(rn==="attributename"&&Qa(Ot,"href")){_t(At,A);continue}if(Te.forceKeepAttr)continue;if(!Te.keepAttr){_t(At,A);continue}if(!ue&&dn(/\/>/i,Ot)){_t(At,A);continue}Re&&$i([ne,ie,Pe],cn=>{Ot=Vo(Ot,cn," ")});let sn=he(A.nodeName);if(!en(sn,rn,Ot)){_t(At,A);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(sn,rn)){case"TrustedHTML":{Ot=B.createHTML(Ot);break}case"TrustedScriptURL":{Ot=B.createScriptURL(Ot);break}}if(Ot!==Cn)try{Bt?A.setAttributeNS(Bt,At,Ot):A.setAttribute(At,Ot),Et(A)?st(A):qd(t.removed)}catch{_t(At,A)}}Ne(X.afterSanitizeAttributes,A,null)},gn=function _e(A){let pe=null,Te=Kt(A);for(Ne(X.beforeSanitizeShadowDOM,A,null);pe=Te.nextNode();)Ne(X.uponSanitizeShadowNode,pe,null),mn(pe),Qt(pe),pe.content instanceof s&&_e(pe.content);Ne(X.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(_e){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Te=null,wt=null,Tt=null;if(Z=!_e,Z&&(_e="<!-->"),typeof _e!="string"&&!Jt(_e))if(typeof _e.toString=="function"){if(_e=_e.toString(),typeof _e!="string")throw Yo("dirty is not a string, aborting")}else throw Yo("toString is not a function");if(!t.isSupported)return _e;if(et||ve(A),t.removed=[],typeof _e=="string"&&(Ue=!1),Ue){if(_e.nodeName){let nn=he(_e.nodeName);if(!ae[nn]||Le[nn])throw Yo("root node is forbidden and cannot be sanitized in-place")}}else if(_e instanceof a)pe=xt("<!---->"),Te=pe.ownerDocument.importNode(_e,!0),Te.nodeType===Zo.element&&Te.nodeName==="BODY"||Te.nodeName==="HTML"?pe=Te:pe.appendChild(Te);else{if(!Ke&&!Re&&!Me&&_e.indexOf("<")===-1)return B&&ee?B.createHTML(_e):_e;if(pe=xt(_e),!pe)return Ke?null:ee?O:""}pe&&yt&&st(pe.firstChild);let At=Kt(Ue?_e:pe);for(;wt=At.nextNode();)mn(wt),Qt(wt),wt.content instanceof s&&gn(wt.content);if(Ue)return _e;if(Ke){if(z)for(Tt=oe.call(pe.ownerDocument);pe.firstChild;)Tt.appendChild(pe.firstChild);else Tt=pe;return(me.shadowroot||me.shadowrootmode)&&(Tt=q.call(r,Tt,!0)),Tt}let Bt=Me?pe.outerHTML:pe.innerHTML;return Me&&ae["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&dn(Kd,pe.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+Bt),Re&&$i([ne,ie,Pe],nn=>{Bt=Vo(Bt,nn," ")}),B&&ee?B.createHTML(Bt):Bt},t.setConfig=function(){let _e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ve(_e),et=!0},t.clearConfig=function(){Je=null,et=!1},t.isValidAttribute=function(_e,A,pe){Je||ve({});let Te=he(_e),wt=he(A);return en(Te,wt,pe)},t.addHook=function(_e,A){typeof A=="function"&&Ko(X[_e],A)},t.removeHook=function(_e,A){if(A!==void 0){let pe=cb(X[_e],A);return pe===-1?void 0:ub(X[_e],pe,1)[0]}return qd(X[_e])},t.removeHooks=function(_e){X[_e]=[]},t.removeAllHooks=function(){X=zd()},t}var Yd=Vd();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Si=e=>(...t)=>({_$litDirective$:e,values:t}),oo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Qo=class extends oo{constructor(t){if(super(t),this.it=Wt,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Wt||t==null)return this._t=void 0,this.it=t;if(t===On)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Qo.directiveName="unsafeHTML",Qo.resultType=1;var Xd=Si(Qo);function cl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=cl();function rp(e){Or=e}var ns={exec:()=>null};function $t(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(_n.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Eb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Tb=/^(?:[ \t]*(?:\n|$))+/,Cb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Rb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ob=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ul=/(?:[*+-]|\d{1,9}[.)])/,op=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,sp=$t(op).replace(/bull/g,ul).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Lb=$t(op).replace(/bull/g,ul).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),dl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ib=/^[^\n]+/,pl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Db=$t(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",pl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pb=$t(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ul).getRegex(),Li="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mb=$t("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",fl).replace("tag",Li).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ip=$t(dl).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex(),Nb=$t(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ip).getRegex(),_l={blockquote:Nb,code:Cb,def:Db,fences:Rb,heading:Ob,hr:rs,html:Mb,lheading:sp,list:Pb,newline:Tb,paragraph:ip,table:ns,text:Ib},Zd=$t("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex(),qb={..._l,lheading:Lb,table:Zd,paragraph:$t(dl).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Li).getRegex()},Fb={..._l,html:$t(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ns,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$t(dl).replace("hr",rs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",sp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},jb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Bb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ap=/^( {2,}|\\)\n(?!\s*$)/,Ub=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ii=/[\p{P}\p{S}]/u,ml=/[\s\p{P}\p{S}]/u,lp=/[^\s\p{P}\p{S}]/u,Wb=$t(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ml).getRegex(),cp=/(?!~)[\p{P}\p{S}]/u,zb=/(?!~)[\s\p{P}\p{S}]/u,Hb=/(?:[^\s\p{P}\p{S}]|~)/u,Gb=$t(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Eb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),up=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Kb=$t(up,"u").replace(/punct/g,Ii).getRegex(),Vb=$t(up,"u").replace(/punct/g,cp).getRegex(),dp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Yb=$t(dp,"gu").replace(/notPunctSpace/g,lp).replace(/punctSpace/g,ml).replace(/punct/g,Ii).getRegex(),Xb=$t(dp,"gu").replace(/notPunctSpace/g,Hb).replace(/punctSpace/g,zb).replace(/punct/g,cp).getRegex(),Zb=$t("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lp).replace(/punctSpace/g,ml).replace(/punct/g,Ii).getRegex(),Qb=$t(/\\(punct)/,"gu").replace(/punct/g,Ii).getRegex(),Jb=$t(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),eh=$t(fl).replace("(?:-->|$)","-->").getRegex(),th=$t("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",eh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ci=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,nh=$t(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ci).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),pp=$t(/^!?\[(label)\]\[(ref)\]/).replace("label",Ci).replace("ref",pl).getRegex(),fp=$t(/^!?\[(ref)\](?:\[\])?/).replace("ref",pl).getRegex(),rh=$t("reflink|nolink(?!\\()","g").replace("reflink",pp).replace("nolink",fp).getRegex(),Qd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gl={_backpedal:ns,anyPunctuation:Qb,autolink:Jb,blockSkip:Gb,br:ap,code:Bb,del:ns,emStrongLDelim:Kb,emStrongRDelimAst:Yb,emStrongRDelimUnd:Zb,escape:jb,link:nh,nolink:fp,punctuation:Wb,reflink:pp,reflinkSearch:rh,tag:th,text:Ub,url:ns},oh={...gl,link:$t(/^!?\[(label)\]\((.*?)\)/).replace("label",Ci).getRegex(),reflink:$t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ci).getRegex()},il={...gl,emStrongRDelimAst:Xb,emStrongLDelim:Vb,url:$t(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$t(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qd).getRegex()},sh={...il,br:$t(ap).replace("{2,}","*").getRegex(),text:$t(il.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ei={normal:_l,gfm:qb,pedantic:Fb},Jo={normal:gl,gfm:il,breaks:sh,pedantic:oh},ih={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jd=e=>ih[e];function sr(e,t){if(t){if(_n.escapeTest.test(e))return e.replace(_n.escapeReplace,Jd)}else if(_n.escapeTestNoEncode.test(e))return e.replace(_n.escapeReplaceNoEncode,Jd);return e}function ep(e){try{e=encodeURI(e).replace(_n.percentDecode,"%")}catch{return null}return e}function tp(e,t){let n=e.replace(_n.findPipe,(s,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(_n.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(_n.slashPipe,"|");return r}function es(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function ah(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function np(e,t,n,r,o){let s=t.href,i=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function lh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[a]=i;return a.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ri=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:es(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=lh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=es(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:es(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=es(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=m,n.length===0)break;let y=s.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,k=b.raw+`
`+n.join(`
`),P=this.blockquote(k);s[s.length-1]=P,r=r.substring(0,r.length-b.raw.length)+P.raw,o=o.substring(0,o.length-b.text.length)+P.text;break}else if(y?.type==="list"){let b=y,k=b.raw+`
`+n.join(`
`),P=this.list(k);s[s.length-1]=P,r=r.substring(0,r.length-y.raw.length)+P.raw,o=o.substring(0,o.length-b.raw.length)+P.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,P=>" ".repeat(3*P.length)),y=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),l=!0),!l){let P=this.rules.other.nextBulletRegex(k),F=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),ce=this.rules.other.headingBeginRegex(k),J=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],O;if(y=B,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),O=y):O=y.replace(this.rules.other.tabCharGlobal,"    "),V.test(y)||ce.test(y)||J.test(y)||P.test(y)||F.test(y))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!y.trim())d+=`
`+O.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(m)||ce.test(m)||F.test(m))break;d+=`
`+y}!b&&!y.trim()&&(b=!0),u+=B+`
`,e=e.substring(B.length+1),m=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let a=o.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let l of o.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,o.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!o.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));o.loose=d}}if(o.loose)for(let l of o.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=tp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(tp(i,s.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:s.align[l]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=es(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=ah(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),np(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return np(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,a=o,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let d=[...r[0]][0].length,m=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Bn=class al{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new Ri,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_n,block:Ei.normal,inline:Jo.normal};this.options.pedantic?(n.block=Ei.pedantic,n.inline=Jo.pedantic):this.options.gfm&&(n.block=Ei.gfm,this.options.breaks?n.inline=Jo.breaks:n.inline=Jo.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ei,inline:Jo}}static lex(t,n){return new al(n).lex(t)}static lexInline(t,n){return new al(n).inlineTokens(t)}lex(t){t=t.replace(_n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_n.tabCharGlobal,"    ").replace(_n.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},m),typeof y=="number"&&y>=0&&(d=Math.min(d,y))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Oi=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_n.notSpaceStart)?.[0],o=e.replace(_n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+sr(r)+'">'+(n?o:sr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:sr(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let a=e.items[i];r+=this.listitem(a)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=ep(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+sr(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=ep(e);if(o===null)return sr(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${sr(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},bl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Un=class ll{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new Oi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new bl}static parse(t,n){return new ll(n).parse(t)}static parseInline(t,n){return new ll(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=a||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},Ti,ts=(Ti=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Un.parse:Un.parseInline}},Rt(Ti,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(Ti,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ti),ch=class{constructor(...e){Rt(this,"defaults",cl());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",Un);Rt(this,"Renderer",Oi);Rt(this,"TextRenderer",bl);Rt(this,"Lexer",Bn);Rt(this,"Tokenizer",Ri);Rt(this,"Hooks",ts);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let a=o.renderer.apply(this,i);return a===!1&&(a=s.apply(this,i)),a}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Oi(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,a=n.renderer[i],l=o[i];o[i]=(...u)=>{let d=a.apply(o,u);return d===!1&&(d=l.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ri(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,a=n.tokenizer[i],l=o[i];o[i]=(...u)=>{let d=a.apply(o,u);return d===!1&&(d=l.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ts;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,a=n.hooks[i],l=o[i];ts.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&ts.passThroughHooksRespectAsync.has(s))return(async()=>{let m=await a.call(o,u);return l.call(o,m)})();let d=a.call(o,u);return l.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await a.apply(o,u);return m===!1&&(m=await l.apply(o,u)),m})();let d=a.apply(o,u);return d===!1&&(d=l.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(s.call(this,i)),o&&(a=a.concat(o.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bn.lex(e,t??this.defaults)}parser(e,t){return Un.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,a=await(o.hooks?await o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(i,o),l=o.hooks?await o.hooks.processAllTokens(a):a;o.walkTokens&&await Promise.all(this.walkTokens(l,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Un.parse:Un.parseInline)(l,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let a=(o.hooks?o.hooks.provideParser():e?Un.parse:Un.parseInline)(i,o);return o.hooks&&(a=o.hooks.postprocess(a)),a}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+sr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Rr=new ch;function St(e,t){return Rr.parse(e,t)}St.options=St.setOptions=function(e){return Rr.setOptions(e),St.defaults=Rr.defaults,rp(St.defaults),St};St.getDefaults=cl;St.defaults=Or;St.use=function(...e){return Rr.use(...e),St.defaults=Rr.defaults,rp(St.defaults),St};St.walkTokens=function(e,t){return Rr.walkTokens(e,t)};St.parseInline=Rr.parseInline;St.Parser=Un;St.parser=Un.parse;St.Renderer=Oi;St.TextRenderer=bl;St.Lexer=Bn;St.lexer=Bn.lex;St.Tokenizer=Ri;St.Hooks=ts;St.parse=St;var ix=St.options,ax=St.setOptions,lx=St.use,cx=St.walkTokens,ux=St.parseInline;var dx=Un.parse,px=Bn.lex;function mr(e){let t=St.parse(e),n=Yd.sanitize(t);return Xd(n)}function ir(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function so(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Di(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var mp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},uh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},dh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ph=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Wn(e){return!!e&&typeof e=="object"}function hl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function yl(e,t){let n=hl(e),r=hl(t),o=new Map;for(let a of n)o.set(a,(o.get(a)||0)+1);let s=0;for(let a of r){let l=o.get(a)||0;l>0?o.set(a,l-1):s+=1}let i=0;for(let a of o.values())i+=a;return{added:s,removed:i}}function gp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Wn(o)&&typeof o.text=="string"?o.text:"").join(""):Wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function fh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:mp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=hl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=yl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=yl(Wn(a)?a.old_string:"",Wn(a)?a.new_string:"");o+=l.added,s+=l.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function vl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var _h=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function bp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Wn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(_h,"").trim();return n.length>0?{kind:"user",text:n}:null}function wl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=dh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ph.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function mh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function gh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Wn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(wl(i.text));else if(i.type==="thinking"){let a=vl(i.thinking);a&&s.push(a)}else if(i.type==="tool_use"){let a=fh(i);typeof i.id=="string"&&t.set(i.id,a),s.push(a)}}return n?_p(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Wn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=gp(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let s=bp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?_p([o],n):[o]}return[]}function _p(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function bh(e){let t=typeof e.command=="string"?e.command:"",n=gp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:mp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function hh(e){if(e.type==="item.completed"&&Wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[wl(t.text)];if(t.type==="user_message"){let n=bp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=vl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[bh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function yh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[wl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=vl(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=uh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function vh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function wh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Wn(t)?t:null}function hp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=wh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return mh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?yh(s):vh(s)?hh(s):gh(s,n);return i.length>0&&(r.progress=null),i}}}function kl(e){let t=[],n=hp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var kh=5,$h=10,xh=/Task\s+#(\d+)/,Ah=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Sh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function os(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Eh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Th(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Ch(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let l=xh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let a=s.activeForm||s.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Rh(e){if(e.tool==="Bash"){let t=e.command||"";return Ah.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Sh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Oh(e){let t=e.filter(o=>o.kind==="tool").slice(-$h),n=new Map;t.forEach((o,s)=>{let i=Rh(o);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=s,n.set(i,a)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Lh(e){let t=Th(e);if(t)return{text:t,guess:!1};let n=Ch(e);if(n)return{text:n,guess:!1};let r=Oh(e);return r?{text:r,guess:!0}:null}function Ih(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function io(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,a=null,l=null,u=null,d=!1,m={},y=!0,b=new Set,k=new Set,P=null,F=null,V=!1,ce=!1,J=!1,B=null,O=null;function W(){V=!1,ce=!1,J=!1,B=null,O=null}async function Q(z){if(n){ce=!0,J=!1,Le();try{let ee=await Promise.resolve(n("get-attempt-prompt",{attempt_id:z,...u?{root_dir:u}:{}}));if(s!==z)return;!ee||typeof ee!="object"||Array.isArray(ee)?J=!0:(B=ee,O=z)}catch{s===z&&(J=!0)}finally{s===z&&(ce=!1,Le())}}}function oe(){if(V=!V,V&&s&&O!==s){Q(s);return}Le()}function se(){if(!V)return"";let z=so({loading:ce,error:J});if(z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=Di(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?c`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function q(){if(!l||!r)return[];let z=r.get(l);return kl(z?z.lines:[])}function X(){if(!l||!r)return null;let z=r.get(l),ee=z?z.last_event_at:null;return typeof ee=="number"?ee:null}function ne(){return m.status==="running"}function ie(){if(ne()&&s){F||(F=setInterval(()=>Le(),1e3));return}Pe()}function Pe(){F&&(clearInterval(F),F=null)}function He(z){let ee=[],Ie=0;for(;Ie<z.length;){let{idx:lt,line:it}=z[Ie];if(it.kind==="tool"){let De=Ie;for(;De<z.length&&z[De].line.kind==="tool"&&z[De].line.tool===it.tool;)De+=1;if(De-Ie>=kh&&!k.has(lt)){ee.push({kind:"group",idx:lt,tool:it.tool||"",lines:z.slice(Ie,De)}),Ie=De;continue}}ee.push({kind:"line",idx:lt,line:it}),Ie+=1}return ee}function fe(z){let ee=[],Ie=new Map;for(let De=0;De<z.length;De+=1){let Ue=z[De],ct=Ue.parent_tool_use_id;if(typeof ct=="string"&&ct.length>0){let tt=Ie.get(ct);tt||(tt={kind:"subagent",idx:De,launch_id:ct,agent_type:null,header:null,lines:[]},Ie.set(ct,tt),ee.push(tt)),tt.lines.push({idx:De,line:Ue});continue}if(Ue.kind==="tool"&&Ue.tool==="Agent"&&typeof Ue.launch_id=="string"&&Ue.launch_id.length>0){let tt=Y(Ue),ft=Ie.get(Ue.launch_id);if(ft){ft.header={idx:De,line:Ue},ft.agent_type=tt;continue}let Pt={kind:"subagent",idx:De,launch_id:Ue.launch_id,agent_type:tt,header:{idx:De,line:Ue},lines:[]};Ie.set(Ue.launch_id,Pt),ee.push(Pt);continue}ee.push({kind:"entry",idx:De,line:Ue})}let lt=[],it=0;for(;it<ee.length;){if(ee[it].kind!=="entry"){lt.push(ee[it]),it+=1;continue}let De=it;for(;De<ee.length&&ee[De].kind==="entry";)De+=1;lt.push(...He(ee.slice(it,De))),it=De}return lt}function Y(z){let ee=z.input;return ee&&typeof ee.subagent_type=="string"?ee.subagent_type:null}function Ae(z){for(let ee=z.length-1;ee>=0;ee-=1){let Ie=z[ee];if(Ie.kind==="result"||Ie.kind==="error")return null;if(Ie.kind==="tool"&&!Object.hasOwn(Ie,"result"))return Ie}return null}function Oe(z){for(let ee=z.length-1;ee>=0;ee-=1)if(z[ee].kind==="thinking")return z[ee];return null}function S(z,ee){if(ee.kind==="gate")return c`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return c`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return c`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let Ie=b.has(z);return c`<div
        class="sv__think${Ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>bt(z)}
      >
        <span class="sv__think-line">💭 ${os(ee.text)}</span>
        ${Ie?c`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="user"){let Ie=b.has(z);return c`<div
        class="sv__line sv__line--user${Ie?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>bt(z)}
      >
        <span class="sv__user-line">▷ ${os(ee.text)}</span>
        ${Ie?c`<pre class="sv__user-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let Ie=b.has(z),lt=ee.tool==="Bash"?Eh(ee.command):0,it=ee.tool==="Bash"?lt>1?os(ee.command):ee.command:ee.path||ee.command||"";return c`<div
        class="sv__tool${Ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>bt(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${it?c`<span class="sv__tool-detail">${it}</span>`:""}
          ${lt>1?c`<span class="sv__tool-more">⋯ ${lt}줄</span>`:""}
          ${typeof ee.added=="number"?c`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?c`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?c`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${Ie?c`<pre class="sv__tool-expand">${ae(ee)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${mr(ee.text||"")}</div>`}function ae(z){let ee=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)ee.push(z.command);else if(z.input!==void 0)try{ee.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&ee.push(`output:
${z.output}`),ee.join(`

`)}function Se(){if(!s)return c``;let z=q(),ee=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),Ie=m.session_id||"",lt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,it=ne(),De=it?Ih(X(),Date.now()):"",Ue=it?Ae(z):null,ct=it?Oe(z):null,tt=Lh(z);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":s)}</span
        >
        ${tt?c`<span
              class="sv__stage${tt.guess?" sv__stage--guess":""}"
              title=${tt.text}
              >${tt.text}</span
            >`:""}
        ${it?c`<span
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
              @click=${()=>mt(Ie)}
            >
              ⧉ ${Ie.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>mt(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ee?c`<span class="sv__meta">${ee}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${oe}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${lt}
          @click=${ht}
        >
          <span class="sv__follow-full">⇣ ${lt}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ke()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":se()}
      <div class="sv__body">
        ${z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:fe(z).map(ft=>ft.kind==="subagent"?we(ft):ft.kind==="group"?me(ft):S(ft.idx,ft.line))}
      </div>
      ${Ue||ct?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ue?c`<span class="sv__now-icon">${Ue.icon}</span>
                  <span class="sv__now-name">${Ue.tool}</span>
                  <span class="sv__now-detail"
                    >${Ue.tool==="Bash"?os(Ue.command):Ue.path||Ue.command||""}</span
                  >`:""}
            ${ct?c`<span class="sv__now-think"
                  >💭 ${os(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function me(z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ye(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function we(z){let ee=k.has(z.idx),Ie=z.header?z.header.line:null,lt=Ie?Ie.is_error===!0?"\u2717":typeof Ie.result=="string"?"\u2713":"\u27F3":"",it=Ie&&Ie.command?Ie.command:"";return c`<div class="sv__sub${ee?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(z.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${z.agent_type||"subagent"}</span>
        ${it?c`<span class="sv__sub-detail">${it}</span>`:""}
        <span class="sv__sub-count">${z.lines.length}줄</span>
        ${lt?c`<span class="sv__sub-state">${lt}</span>`:""}
        ${ee?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ee?c`<div class="sv__sub-body">
            ${He(z.lines).map(De=>De.kind==="group"?me(De):S(De.idx,De.line))}
          </div>`:""}
    </div>`}function ye(z){k.add(z),Le()}function Le(){rt(Se(),e),ie(),y&&Ye()}function Ye(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function bt(z){b.has(z)?b.delete(z):b.add(z),Le()}function ht(){y=!y,Le()}function mt(z){Sn(z).then(ee=>{ee?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(z){!s||!z||(m={...m,...z},Le())}function ue(z){let ee=z.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&y&&(y=!1,Le())}e.addEventListener("scroll",ue,!0);function Re(z){let ee=z.target;!ee||typeof ee.closest!="function"||e.contains(ee)||ee.closest("dialog")||ee.closest(".md-viewer-root")||Ke()}let je=!1;function Me(){je||(document.addEventListener("mousedown",Re),je=!0)}function et(){je&&(document.removeEventListener("mousedown",Re),je=!1)}function yt(z){let ee=z&&z.attempt_id;if(!ee)return;let Ie=typeof z.launch_id=="string"&&z.launch_id.length>0?z.launch_id:null,lt=z.session_ref&&typeof z.session_ref=="object"?z.session_ref:null;if(Ie&&lt)return;let it=l;s=ee,i=Ie,a=lt,l=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&it&&it!==l&&Promise.resolve(n("unsubscribe-session-log",{id:it})).catch(()=>{}),u=typeof z.root_dir=="string"&&z.root_dir.length>0?z.root_dir:null,m=z.meta||{},d=z.hide_prompt===!0,y=!0,b.clear(),k.clear(),W(),!P&&r&&(P=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:s,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Me(),Le()}function Ke(){let z=l;et(),s=null,i=null,a=null,l=null,u=null,d=!1,b.clear(),k.clear(),W(),Pe(),n&&z&&Promise.resolve(n("unsubscribe-session-log",{id:z})).catch(()=>{}),rt(c``,e),o&&o()}return{open:yt,updateMeta:T,close:Ke,isOpen(){return s!==null},destroy(){Pe(),et(),P&&(P(),P=null),e.removeEventListener("scroll",ue,!0),s=null,i=null,a=null,l=null,u=null,d=!1,rt(c``,e)}}}function Dh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Ph(e){let t=e&&e.metadata||{},n=Wr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Dh(t)?null:"plan_pending"}),r}function yp(e,t){let n=Ph(e);return c`
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
  `}var Mh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Nh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,qh=/^\*\*결론\*\* — (.+)$/;function Pi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Mh)return null;let n=Nh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?qh.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",u=a?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:l,body:t.slice(u).join(`
`).trim()}}var vp=20;function wp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Fh(e){return e.length>vp?`${e.slice(0,vp)}\u2026`:e}function jh(e,t,n,r){let o=`${t.lane} ${Fh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${wp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function Bh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${wp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function kp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let u=Pi(typeof l.text=="string"?l.text:"");return u?jh(l,u,t,o.has(l.id)):Bh(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${s}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var{I:Gx}=Cc;var $p=e=>e.strings===void 0;var Uh={},xp=(e,t=Uh)=>e._$AH=t;var Lr=Si(class extends oo{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$p(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===On||t===Wt)return t;let n=e.element,r=e.name;if(e.type===or.PROPERTY){if(t===n[r])return On}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return On}else if(e.type===or.ATTRIBUTE&&n.getAttribute(r)===t+"")return On;return xp(e),t}});var Wh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],$l={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Ap={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},zh={pin:"pin",global:"global",base:"base"};function Hh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${zh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Gh(e,t,n){switch(e){case"workflow_mode":return Do;case"spec_review_model":case"impl_review_model":return Po;case"plan_review_model":return Js;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ei;case"impl_dispatch":return Yu;case"impl_runtime":return Qs;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return eo(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Io;case"orchestration_model":return Mo(n,null);case"orchestration_effort":return eo(n,void 0,t.orchestration_model||Tn).filter(r=>r!==Tn);default:return[]}}function Kh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Hh(e.source)}
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
      >${ti[e.source]}</span
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
  </div>`}function Sp(e,t){let n=Na.flatMap(l=>l.keys),r=qa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=nd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(l=>[l.key,l])),i=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
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
        >${Vh(s)}</span
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
          ${Na.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=zs({key:u.key,choices:Gh(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Kh(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Lr(e.preset_id)}
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
  </details>`}function Vh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Yh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Ep(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",a=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=Yh(r.exec_receipt),u=l?Jn(l):a,d=l?`${l.kind}:${l.actor}`:a.split("@")[0],m=Us(r.planned_execution,r.exec_receipt),y=r.chips?.pr?.number,b=typeof y=="number"?`PR #${y}`:"PR",k=to(n),P=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${l?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${k.state}
            title=${ri(k)}
            ?disabled=${k.state==="applied"}
            @click=${()=>P?.(k.rec,k.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Xh(s).map(F=>Zh(F,n,o,{label:F.id==="pr"?b:F.label,href:F.id==="pr"?i:""}))}
    </div>
  </section>`}function Xh(e){let n=typeof e=="string"&&Object.hasOwn($l,e)&&$l[e]||$l.spec_backed;return Wh.filter(r=>n.includes(r.id))}var Mi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Zh(e,t,n,r){let o=Qh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,a=i?i==="full":o.length>0,l=!a&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",m=u?Mi.stale:a?Mi.on:l?Mi.current:Mi.none,y=Jh(e,n),b=`${r.label} \xB7 ${m}${y?` \xB7 ${y}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,P=c`<span class="detail-summary__gate-label"
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
      >${P}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${P}</span
  >`}function Qh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Jh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Ap,n)?Ap[n]:""}function Ni(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tp(e){return Ni(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Cp(e,t){let n=e&&e[t];if(!Ni(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Tp),o=Tp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Lp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function qi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Lp(e)}${t}`}function ao(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Lp(e)}`}function ey(e,t,n){if(n!==null){let o=e==="claude"?qi:ao,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:ao({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Rp(e,t){if(!Ni(e)||e.state!=="usable"||!Ni(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Op(e){let t=e.provider_key==="claude"?qi:ao,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${ey(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Ip({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Op({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Cp(t,"claude"),selected:o,workspace_default:Rp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Op({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Cp(t,"codex"),selected:s,workspace_default:Rp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function ty(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ny(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Fi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",a=null,l="";function u(P){P.key==="Escape"&&o&&(P.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${ty(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${l}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${a===null?null:c`<pre class="mv__front">
${a}</pre
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){rt(d(),e)}async function y(P,F={}){o=P,s="loading",i="",a=null,l="",m();let V=F.workspace||(n?n():"");if(!V){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){s="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ce="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(P);try{let J=await r(ce),B=await J.json().catch(()=>({}));if(!J.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&F.missing_state==="plan_pending"){s="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}s="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||J.status)+")",m();return}let O=ny(String(B.content||""));a=O.front,i=O.body,s="ready",m()}catch{s="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){o=null,rt(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:y,close:b,destroy:k}}var ry=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Mp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ji=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],oy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Dp(e){return typeof e=="string"&&oy.has(e)}var sy=["running","done","failed","interrupted"],iy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function ay(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ly(e){let t=an(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Zr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Mp}
          >부분 집계</span
        >`:""}`}function Pp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Sl(e){if(typeof e=="number")return ss(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ss(t):""}function cy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function uy(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function xl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Al(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function dy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ji.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?xl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||xl(t.effort))||!(!("agent_type"in t)||xl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!sy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Al(t.started_at)||!Al(t.last_event_at)||!Al(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function py(e,t,n){let o=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function fy(e,t,n,r){let o=e.status==="running"?null:t,i=(o?an({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ss(e.last_event_at):o?Sl(o.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,cy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=uy(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${iy[e.status]}</span
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
  </button>`}function _y(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function my(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let m=dy(d);!m||o.has(m.launch_id)||Dp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let i={};for(let{role:d,provider:m}of ji){let y=t?t.roles[d]?.[m]:null;i[d]=y?[...y.legs]:[]}let a=ji.flatMap(({role:d})=>i[d]),l=new Set,u=[];for(let{role:d,provider:m}of ji){for(let y of r.filter(b=>b.role===d&&b.provider===m)){let b=a.find(k=>k.receipt_id===y.launch_id)||null;b&&!_y(y,b)||(b&&l.add(b.receipt_id),u.push(fy(y,b,e.attempt_id,n)))}for(let y of i[d])!l.has(y.receipt_id)&&!Dp(y.agent_type)&&u.push(py(d,m,y))}return u}function gy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ry,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${ay(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Mp}</span>`:""}
  </div>`}var by={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ss(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function hy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var yy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function vy(e,t){let n=yy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function Np(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(b=>b&&b.current===!0),...s.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],a=i.map(b=>vy(b,t)),l=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of o)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let P=typeof b.session_id=="string"&&b.session_id.length>0,F=u.has(b.attempt_id),V=P&&!F,ce=P?F?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!V}
      title=${ce}
      @click=${J=>{J.stopPropagation(),V&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let P=b.cause_detail,F=P&&typeof P.reason=="string"&&P.reason.length>0?typeof P.command=="string"&&P.command.length>0?`${P.reason} \xB7 ${P.command}`:P.reason:b.cause;return c`<div class="detail-session__cause" title=${F}>
      ${b.cause}
    </div>`},y=b=>{let k=Pp(Ta(b));if(an(k).length===0&&!Zr(b.usage))return"";let P=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${P?"true":"false"}
      title=${P?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${F=>{F.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${ly(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${o.map(b=>{let k=Ta(b),P=Pp(k),F=an(P);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${by[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${$o(b)?c`<span
                  class="detail-session__resumed"
                  title=${$o(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ar(b)}</span>
            ${F.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${F.length>0?F.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Zr(b.usage)?c`<span class="detail-session__usage"
                    >${Zr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ss(b.started_at)}</span>
          </button>
          ${y(b)} ${d(b)} ${m(b)} ${hy(b)}
          ${l.has(b.attempt_id)&&b.usage?gy(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${my(b,k,t)}
        </div>`})}
    </div>
  `}function qp(e,t={}){return c`
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
          ${wy(e)}
        </div>`:""}
  `}function wy(e){let t=so(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Di(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ky=["open","in_progress","deferred","resolved","closed"],$y=[0,1,2,3,4];function Fp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},y="",b=!1,k=[],P=!1,F={},V={claude:null,codex:null},ce=null,J=null,B=0,O=!1,W=!1,Q="",oe="",se="",q="",X=!1;function ne(){O=!1,W=!1,Q="",oe="",se="",q="",X=!1}function ie(){V={claude:null,codex:null},ce=null,J=null,B+=1}async function Pe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function He(v){try{let K=await fetch(v);if(!K.ok)return null;let I=await K.json();if(!I||typeof I!="object"||!Array.isArray(I.accounts))return null;let U=I.accounts.filter(xe=>xe!==null&&typeof xe=="object"&&!Array.isArray(xe));return{accounts:U,active:U.find(xe=>xe.active===!0)||null}}catch{return null}}async function fe(v){J=v;let K=++B,[I,U,xe]=await Promise.all([He("/api/claude-usage"),He("/api/codex-usage"),Pe()]);K!==B||v!==u||(V={claude:I,codex:U},ce=xe,Fe())}let Y=[],Ae=null,Oe=null,S=!1,ae="",Se=!1,me=0,we=new Set;function ye(){Y=[],Ae=null,Oe=null,S=!1,ae="",Se=!1,me+=1,we.clear()}async function Le(v){if(!o)return;let K=++me;try{let I=await Promise.resolve(o("get-comments",{id:v}));if(K!==me||v!==u)return;Y=Array.isArray(I)?I:[],S=!1}catch{if(K!==me||v!==u)return;S=!0}Fe()}function Ye(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ae!==u){Ae=u,Oe=v,Le(u);return}v!==null&&v!==Oe&&(Oe=v,Le(u))}function bt(v){we.has(v)?we.delete(v):we.add(v),Fe()}function ht(v){let K=ae.trim().length===0;ae=v,K!==(v.trim().length===0)&&Fe()}async function mt(){let v=ae.trim();if(!o||!u||v.length===0||Se)return;let K=u;Se=!0,Fe();let I=!1;try{let U=await Promise.resolve(o("add-comment",{id:K,text:v}));Array.isArray(U)&&U.length>0&&(I=!0,K===u&&(Y=U,S=!1,ae="",Oe=U.length))}catch{I=!1}I||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),K===u&&(Se=!1),Fe()}let T={onToggle:bt,onDraftInput:ht,onSubmit:mt},ue=t.mdViewer||null,Re=null;ue||(Re=document.createElement("div"),Re.className="md-viewer-root",document.body.appendChild(Re));let je=ue||Fi(Re,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Me=document.createElement("div");Me.className="session-log-root",document.body.appendChild(Me);let et=io(Me,{transport:o?(v,K)=>Promise.resolve(o(v,K)):void 0,sessionLogStore:l}),yt=!1,Ke=!1,z=!1,ee=null,Ie=null,lt=0;function it(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function De(){yt=!1,Ke=!1,z=!1,ee=null,Ie=null,lt+=1}async function Ue(v){if(!o)return;let K=++lt;Ke=!0,z=!1,Fe();try{let I=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(K!==lt)return;!I||typeof I!="object"||Array.isArray(I)?z=!0:(ee=I,Ie=it(v))}catch{K===lt&&(z=!0)}finally{K===lt&&(Ke=!1,Fe())}}let ct=[],tt=null,ft=0;function Pt(v,K){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${K}`}function Ft(){ct=[],tt=null,ft+=1}async function Ht(v,K){if(!o)return;let I=++ft,U;try{U=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{U=null}I!==ft||K!==tt||(ct=U&&Array.isArray(U.sessions)?U.sessions:[],Fe())}function Mt(){if(!o||!u)return;let v=d&&d.metadata,K=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(K===null){Ft();return}let I=Pt(u,K);tt!==I&&(ct=[],tt=I,Ht(u,I))}function Nt(){if(yt=!yt,yt&&u&&Ie!==it(u)){ee=null,Ue(u);return}Fe()}function kt(){if(!i||!u)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(I=>I&&I.bead_id===u).sort((I,U)=>(U.started_at||0)-(I.started_at||0)).map(I=>({attempt_id:I.attempt_id,bead_id:I.bead_id,status:I.status,started_at:typeof I.started_at=="number"?I.started_at:null,runner:I.runner||null,model:I.model||null,effort:I.effort||I.observed_effort||null,speed:I.speed||null,session_id:I.session_id||null,resumed_from:I.resumed_from||null,continuation_mode:I.continuation_mode||null,dismissed_at:typeof I.dismissed_at=="number"?I.dismissed_at:null,cause:typeof I.cause=="string"?I.cause:null,cause_detail:I.cause_detail||null,exec_default_preset_id:typeof I.exec_default_preset_id=="string"?I.exec_default_preset_id:null,exec_default_preset_revision:typeof I.exec_default_preset_revision=="number"?I.exec_default_preset_revision:null,exec_values:I.exec_values&&typeof I.exec_values=="object"?I.exec_values:null,usage:I.usage||null,usage_legs:Array.isArray(I.usage_legs)?I.usage_legs:[],delegation_sessions:Array.isArray(I.delegation_sessions)?I.delegation_sessions:[]}))}function We(){if(!i||!u)return null;let v=i.get();return Ln(v&&v.attempts||{},u)}let L=new Set;function Z(v){L.has(v)?L.delete(v):L.add(v),Fe()}function ge(v){let K=i?i.get():null,I=K&&K.attempts?K.attempts[v]:null;et.open({attempt_id:v,meta:I?{runner:I.runner||void 0,model:I.model||void 0,effort:I.effort||void 0,status:I.status||void 0,session_id:I.session_id||void 0}:{}})}function E(v,K){let I=i?i.get():null,U=I&&I.attempts?I.attempts[v]:null,qe=(U&&Array.isArray(U.delegation_sessions)?U.delegation_sessions:[]).find(vt=>vt&&typeof vt=="object"&&vt.launch_id===K);qe&&et.open({attempt_id:v,launch_id:K,meta:{runner:qe.provider==="claude"?"claude":"codex",role:qe.role,...typeof qe.agent_type=="string"?{agent_type:qe.agent_type}:{},model:qe.model,effort:qe.effort,session_id:qe.session_id,status:qe.status}})}async function G(v){if(!o||!v)return;let K=await Vr();if(K===null)return;let I=()=>{let vt=i?i.get():null;return vt&&typeof vt.revision=="number"?vt.revision:0},U=async(vt={},Ge=I())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Ge,...K!==""?{instructions:K}:{},...vt}),xe=vt=>{vt?.queue&&i?.set&&i.set(vt.queue)},qe=await U();if(xe(qe),qe&&qe.conflict){let vt=qe.queue&&typeof qe.queue.revision=="number"?qe.queue.revision:I();qe=await U({},vt),xe(qe)}qe=await er(qe,(vt,Ge)=>U({continuation:vt,decision_token:Ge}),{onResult:xe,refresh:()=>U()}),qe&&qe.resumed===!1&&!qe.conflict&&qe.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${qe.reason}`,"error",2400)}function Ce(v){!v||!u||et.open(Yr(v,u,d&&d.status))}let ze={onOpen:ge,onOpenDelegation:E,onResume:G,onToggleUsage:Z,onOpenSessionRef:Ce,onCopyResumeCommand:Jt};function $e(){let v=i?i.get():null,K={...F};for(let I of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=v&&v[I];typeof U=="string"&&(K[I]=U)}return K}async function at(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));F=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{F={}}Fe()}}function ot(){let v=i?i.get():null;return v&&v.runner_catalog||null}function he(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Je(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},I=$n({pin:{...v,...m},global:$e(),execution_defaults:he(),runner_catalog:ot(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Nn(ot(),I)}function M(){let v=a?a.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function j(v){return v?.compatible===!1}function ve(v){a&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&a.set({revision:v.revision,presets:v.presets})}async function Xe(){let v=M(),K=v?.presets.find(I=>I.id===y);if(!(!o||!u||!v||!K||j(K)||b)){b=!0,k=[],Fe();try{let I=await Promise.resolve(o("apply-impl-preset",od(u,K.id,v.revision)));if(I&&I.conflict){ve(I),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let U=I&&Array.isArray(I.issue)?I.issue[0]:I?.issue;if(I&&I.applied&&U&&typeof U=="object"){d=U,k=Array.isArray(I.skipped_orchestration_keys)?I.skipped_orchestration_keys.filter(xe=>typeof xe=="string"):[];for(let xe of sd)delete m[xe];de(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}I&&I.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(I){I&&typeof I=="object"&&I.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Fe()}}}let ke=null;n&&n.subscribe&&(ke=n.subscribe(()=>Et()));let Ze=null;i&&typeof i.subscribe=="function"&&(Ze=i.subscribe(()=>{u&&Fe()}));let st=null,_t=null;function xt(){_t&&(_t(),_t=null)}a&&typeof a.subscribe=="function"&&(st=a.subscribe(()=>{u&&Fe()}));function Kt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Kt);function Et(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(I=>I&&I.id===u)||v[0]||d}Ye(),Mt(),Fe()}}function Jt(v){Sn(v).then(K=>{K?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ne(v){v.preventDefault(),v.stopPropagation(),u&&Jt(u)}function mn(v,K){v.preventDefault(),v.stopPropagation(),Jt(K)}function en(v,K,I){v.preventDefault(),v.stopPropagation(),je.open(K,{missing_state:I})}async function jt(v,K){let I=Object.hasOwn(m,v),U=m[v];if(m[v]=K,Fe(),!(!o||!u))try{let xe=await Promise.resolve(o("update-exec-settings",rd(u,v,K.length===0?null:K))),qe=Array.isArray(xe)?xe[0]:xe;if(!qe||typeof qe!="object"||!qe.id)throw new Error("exec settings readback failed");d=qe,delete m[v],Fe()}catch(xe){throw I?m[v]=U:delete m[v],Fe(),de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),xe}}function Qt(v){v.catch(()=>{})}async function gn(v,K){let I=d||{},U=I.metadata&&typeof I.metadata=="object"?I.metadata:{},xe={};for(let Ge of["impl_runtime","impl_model","impl_effort"])xe[Ge]=Object.hasOwn(m,Ge)?m[Ge]:typeof U[Ge]=="string"?U[Ge]:"";xe[v]=K;let qe=ld(xe,ot(),Je()),vt={};for(let Ge of["impl_runtime","impl_model","impl_effort"])vt[Ge]=m[Ge],m[Ge]=qe[Ge]||"";if(Fe(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...qe,orchestration_runtime:Je()})).then(Ge=>{let pt=Array.isArray(Ge)?Ge[0]:Ge;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");d=pt;for(let yn of["impl_runtime","impl_model","impl_effort"])delete m[yn];Fe()}).catch(Ge=>{for(let pt of["impl_runtime","impl_model","impl_effort"])vt[pt]===void 0?delete m[pt]:m[pt]=vt[pt];throw Fe(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ge})}async function _e(v,K){if(!(!v||typeof v!="object")&&!(K==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await jt("orchestration_model",v.orchestration_model)}catch{return}if(typeof v.impl_runtime=="string"&&v.impl_runtime.length>0)try{await gn("impl_runtime",v.impl_runtime)}catch{}}}async function A(v,K,I){if(!o||!u)return!1;try{let U=await Promise.resolve(o(v,K)),xe=Array.isArray(U)?U[0]:U;return xe&&typeof xe=="object"&&xe.id?(d=xe,!0):(de(I,"error"),!1)}catch(U){return U&&typeof U=="object"&&U.code==="bd_readback_failed"?(de("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(de(I,"error"),!1)}}function pe(v){setTimeout(()=>{try{let K=e.querySelector(v);K&&typeof K.focus=="function"&&K.focus()}catch{}},0)}function Te(){O=!0,Q=d&&d.title||"",Fe(),pe('.detail-edit__input[data-edit="title"]')}function wt(v){Q=v.target.value}function Tt(){O=!1,Q="",Fe()}function At(){A("edit-text",{id:u,field:"title",value:Q},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(O=!1,Q=""),Fe()})}function Bt(){W=!0,oe=d&&d.description||"",Fe(),pe('.detail-edit__textarea[data-edit="description"]')}function nn(v){oe=v.target.value}function rn(){W=!1,oe="",Fe()}function Cn(){A("edit-text",{id:u,field:"description",value:oe},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K===!0&&(W=!1,oe=""),Fe()})}function Ot(v,K,I,U){if(v.key==="Escape"){v.stopPropagation(),I();return}v.key==="Enter"&&(!U||v.ctrlKey||v.metaKey)&&(v.preventDefault(),K())}function sn(v){let K=v.target.value;A("update-status",{id:u,status:K},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function cn(v){let K=Number(v.target.value);A("update-priority",{id:u,priority:K},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Fe())}function un(v){se=v.target.value}function Hn(){let v=se.trim();v.length!==0&&A("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(K=>{K===!0&&(se=""),Fe()})}function x(v){if(v.key==="Escape"){v.stopPropagation(),se="",Fe();return}v.key==="Enter"&&(v.preventDefault(),Hn())}function C(v){A("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Fe())}let p={onCopyPath:mn,onOpenDoc:en};function h(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function R(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function te(v){switch(v){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return v.length>0?`${v} `:""}}function be(v){if(!v||typeof v!="object")return;let K=typeof v.status=="string"?v.status:"",I=typeof v.title=="string"?v.title:"";return K.length>0&&I.length>0?`${K} \xB7 ${I}`:void 0}function dt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function ut(){return t.depCandidates?t.depCandidates():null}async function Vt(v,K,I){let U=dt(),xe=u;if(!xe)return;if(U.length===0){de("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let qe=await A(v,{a:xe,b:K,view_id:xe,root_dir:U},I),vt=qe===!0||qe!==!1&&qe.saved===!0;vt&&t.onDepChanged&&t.onDepChanged({type:v,a:xe,b:K}),v==="dep-add"&&vt&&(q="",X=!1),Fe()}function Ut(v){if(!u)return;let K=globalThis.confirm;typeof K=="function"&&!K(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Vt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(v){v.disabled||Vt("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Rn(v){q=v.target.value,X=!0,Fe()}function bn(){X||(X=!0,Fe())}function Yt(v,K){if(v.key==="Escape"){v.stopPropagation(),q="",X=!1,Fe();return}v.key==="Enter"&&(v.preventDefault(),K.length===1&&!K[0].disabled&&Gt(K[0]))}function An(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${q}
        @focus=${bn}
        @input=${Rn}
        @keydown=${K=>Yt(K,v)}
      />
      ${X||q.length>0?c`<div class="detail-dep-add__list">
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
    </div>`}function hn(v,K){let I=K.get(v.id),U=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${kn(v.title)}
          @click=${()=>I===void 0?s(v.id):s(v.id,I)}
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
    >`}function ar(v){let K=Array.isArray(v.dependencies)?v.dependencies:[],I=Array.isArray(v.dependents)?v.dependents:[],U=[];for(let Ge of K){let pt=h(Ge);pt.length>0&&R(Ge)==="blocks"&&U.push({id:pt,label:`\u26D3 \uB9C9\uB294 ${pt}`,kind:"pred",title:be(Ge)})}for(let Ge of I){let pt=h(Ge);pt.length>0&&R(Ge)==="blocks"&&U.push({id:pt,label:`\u26D3 \uB9C9\uD788\uB294 ${pt}`,kind:"succ",title:be(Ge)})}for(let Ge of K){let pt=h(Ge),yn=R(Ge);pt.length>0&&yn!=="blocks"&&U.push({id:pt,label:`${te(yn)}${pt}`,kind:"other",title:be(Ge)})}let xe=ut(),qe=new Map;if(xe)for(let Ge of xe.issues)qe.has(Ge.bead_id)||qe.set(Ge.bead_id,Ge.root_dir);let vt=xe&&u?Md(Pd(u,xe),q):[];return c`
      <div class="detail-section-label">의존성</div>
      ${U.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${U.map(Ge=>hn(Ge,qe))}
          </div>`}
      ${xe===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:An(vt)}
    `}function Xn(v){let K=v.metadata||{},I=v.workflow||{},U=I.stages||{},xe=U.spec&&U.spec.stale,qe=U.impl&&U.impl.stale,vt=I.quick_fix_review?.state==="stale",Ge=U.plan||null,pt=I.route_source==="derived",yn=I.route||K.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${pt?" detail-kv__v--derived":""}"
          title=${pt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${pt?"unset":yn}</span
        >
      </div>
      ${I.route!=="quick_fix"||Object.hasOwn(K,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${K.spec_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ge?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ge?.approval_receipt||"\uC5C6\uC74C"}${Ge?.approval_state==="stale"?" \xB7 stale":Ge?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${I.route!=="quick_fix"||Object.hasOwn(K,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${K.impl_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${I.resolver.attempt} \xB7 ${I.resolver.prior_sha} \u2192 ${I.resolver.sha}`}
              >${`${I.resolver.prior_sha.slice(0,7)} \u2192 ${I.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${I.route==="quick_fix"||Object.hasOwn(K,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${K.quick_fix_review||"\uC5C6\uC74C"}${vt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${I.planned_execution.kind}</span>
            </div>
            ${I.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${I.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${I.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(I.exec_receipt)}</span
            >
          </div>`:""}
      ${I.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${I.impl_entry.actor}@${I.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${K.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${K.pr_url}</span>
          </div>`:""}
    `}let f={route:["quick_fix","spec_backed","full_plan"]};async function g(v,K){let I=K.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&I!=="full_plan"&&!window.confirm(`full_plan \u2192 ${I||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Fe();return}await A("update-workflow-meta",{id:u,key:v,value:I},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Fe()}function w(v){let K=v.metadata||{};return c` ${((U,xe)=>{let qe=f[U],vt=typeof K[U]=="string"?K[U]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${U}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${U}
          data-edit=${`wfmeta-${U}`}
          @change=${Ge=>g(U,Ge)}
        >
          <option value="" ?selected=${!qe.includes(vt)}>
            ${xe}
          </option>
          ${qe.map(Ge=>c`<option value=${Ge} ?selected=${vt===Ge}>${Ge}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(v,K){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Q}
            @input=${wt}
            @keydown=${I=>Ot(I,At,Tt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${At}
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
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${an(K).map(I=>c`<span class="detail-usage-total" title=${I.tooltip}
              >${I.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Te}
        >
          ✎
        </button>
      </div>
    `}function N(v){let K=on(v.created_at),I=on(v.updated_at);return!K&&!I?c``:c`
      ${K?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
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
          ${ky.map(I=>c`<option value=${I} ?selected=${I===v}>${I}</option>`)}
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
          ${$y.map(I=>c`<option value=${String(I)} ?selected=${I===K}>
                P${I}
              </option>`)}
        </select>
      </div>
    `}function re(v){return c`
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
              .value=${oe}
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
    `}function Ve(v){let K=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${K.map(I=>c`<span class="detail-label-chip"
              >${I}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${I}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+I}
                @click=${()=>C(I)}
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
            @input=${un}
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
    `}function nt(){if(!u)return c``;let v=d||{},K=String(v.id||u),I=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",U=We(),xe=v.status||"open",qe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",vt=v.description||"",Ge={...v,metadata:{...v.metadata||{},...m}};return c`
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
          ${$(I,U)}
          ${Ep(Ge,{onApplyRec:_e})}
          ${Sp({metadata:Ge.metadata,workspace_values:$e(),catalog:ot(),execution_defaults:he(),expanded:P,presets:M()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:k},{onToggle:pt=>{P=pt,Fe()},onEdit:(pt,yn)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){Qt(gn(pt,yn??""));return}Qt(jt(pt,yn??""))},onPresetSelect:pt=>{y=pt,k=[],Fe()},onPresetApply:()=>{Xe()}})}
          ${Ip({md:Ge.metadata,catalog:V,workspace_defaults:ce,handlers:{onExecChange:(pt,yn)=>Qt(jt(pt,yn))}})}
          ${H(xe,qe)} ${N(v)}
          ${re(vt)}
          ${kp(Y,T,{expanded:we,draft:ae,sending:Se,error:S})}
          ${Ee(v)} ${Ve(v)} ${ar(v)}
          ${Xn(v)} ${w(v)}
          ${yp(v,p)}
          ${qp({expanded:yt,loading:Ke,error:z,data:ee},{onToggle:Nt})}
          ${Np(kt(),ze,{total:U,expanded:L},ct)}
        </div>
      </div>
    `}function Fe(){rt(nt(),e)}return{load(v){v!==u&&(m={},y="",k=[],P=!1,ne(),ye(),De(),Ft(),ie()),u=v,d=null,!_t&&t.subscribeCandidates&&(_t=t.subscribeCandidates(()=>{u&&Fe()})),Et(),at(),J!==v&&fe(v)},clear(){u=null,d=null,m={},y="",b=!1,k=[],P=!1,ne(),ye(),De(),Ft(),ie(),xt(),je.close(),et.close(),rt(c``,e)},destroy(){ke&&(ke(),ke=null),Ze&&(Ze(),Ze=null),st&&(st(),st=null),xt(),document.removeEventListener("keydown",Kt),ue||(je.destroy(),Re&&Re.parentNode&&Re.parentNode.removeChild(Re)),et.destroy(),Me.parentNode&&Me.parentNode.removeChild(Me),u=null,d=null,ie(),y="",b=!1,k=[],ye(),De(),Ft(),rt(c``,e)}}}function jp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let y=typeof m=="string"?m.trim():"";if(o&&(y.length>0?(o.textContent=y,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",u=>{u.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}var xy="(max-width: 640px)";function Bi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(xy),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Ay(){return{lanes:{done:!0},areas:{}}}function is(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Sy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:is(r.lanes),areas:is(r.areas)}:{lanes:is(r),areas:{}}}catch{return null}}function Bp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ui(e,t=Ay()){let n={lanes:is(t.lanes),areas:is(t.areas)},r=Sy(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Bp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Bp(e,o),i}}}function Wp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:l})}for(let i=0;i<o.length;i+=1)for(let a=i+1;a<o.length;a+=1){let l=si(o[i].scope,o[a].scope);if(l.length===0)continue;let u=o[i].member,d=o[a].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Ey=["parallel","serial","candidate"];function Up(e){return Ey.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function as(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function El(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=Up(r),l=Up(o);if(r.kind==="candidate"&&!a)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!l)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&l&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(a&&s===null&&l&&i===null){let u=Ty(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${as(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${as(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ty(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Tl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var zp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"};function Rl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Cl(e){for(let t of Rl(e))if(Object.hasOwn(zp,t))return zp[t];return null}function ls(e){let t=null;for(let n of Rl(e))Object.hasOwn(Tl,n)&&(t=Tl[n]);return t}function lo(e){let t=Cl(e),n=ls(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Gp(e,t){let n=Cl(e)??Cl(t),r=ls(t)??ls(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Cy=new Set(["repo_operation_timeout_unresolved"]);function Ry(e){for(let t of Rl(e))if(Cy.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Oy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Kp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Ry(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Oy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Tr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Hp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Vp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Hp,t.blocked_reason)?Hp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=lo(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=lo(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Yp=160;function Ly(e){return e.length>Yp?`${e.slice(0,Yp)}\u2026`:e}function Iy(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${Ly(e.command)}</code>`:""}
  </div>`}function Dy(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Py(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Xp(e){let t=e.failure?lo(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Iy(e.failure.cause_detail,e.failure.reason)}
          ${Dy(e.failure.reason)}
          ${Fo({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function My(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Ny=new Set(["codex-runner"]);function qy(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Ny.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),u=a.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",m=r?wn(r.updated_at,t):"",y=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${wn(i,t)}</span
            >`:""}
      </div>`:y?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
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
      </div>`:""}`}var Fy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function jy(e){if(!e)return"";let t=Fy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ol(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Pe=>Pe&&Pe.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Py(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=$o(e),m=an(e.usage),y=tr(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,P=e.landing,F=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,ce=My(V),J=V?fi(V.dependency_chips):"",B=qy(V,t,a,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),O=o&&e.workflow?.chips?.exec_receipt||null,W=_i(e.workflow),Q=mi(e.rec),oe=O?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(O)}`}
        >${`${O.kind}:${Bs(O)}`}</span
      >`:"",se=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Ao(s)}</span
      >`:"",q=ce||W||se||oe||Q?c`<div class="rtile__meta">
          ${ce}${W}${se}${oe}${Q}
        </div>`:"",X=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ne=o?"":no(e),ie=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${F?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${gi(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${X}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${jy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${o?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${ie}
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
                ${ie}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${B}${e.rollup?Fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:wa}):""}
    ${P?c`<div class="rtile__landing">
          <span
            class="merge-step${P.failed?" merge-step--failed":""}"
            style=${`--progress: ${P.percent}%`}
            >${P.label}${P.index>0?c`<span class="merge-step__n"
                  >${P.index}/${P.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${J}
    ${o?q:ce||W||u||Q||m.length>0||y?c`<div class="rtile__meta">
            ${ce}${W}${pi(e.exec_chips)}${Q}
            ${m.length>0?m.map(Pe=>c`<span class="worker-usage" title=${Pe.tooltip}
                      >${Pe.label}</span
                    >`):y?c`<span
                    class="worker-usage"
                    title=${So(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Fo(e)} ${ne}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Zp(e,t=Date.now(),n=null,r=null){let o=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${o.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:o.map(s=>Ol(s,t,n,{monitor:r&&r.get(s.bead_id)||null}))}
  </div>`}var ln="",By=["impl_runtime","impl_model","impl_effort"],Uy=["claude_account","codex_account"],Wy=5,Wi=1;function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(L=>de(L,"error",4e3)),s={},i={},a=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},y=Promise.resolve(),b={claude:null,codex:null},k=!1,P=null,F={},V="",ce="",J=!1,B=!1,O=!1,W=null,Q=!1;function oe(){let L=t.queue?t.queue():null;return xn(L)?L:null}function se(){let L=oe();return L?L.runner_catalog:null}function q(){let L=oe();return L&&xn(L.execution_defaults)?L.execution_defaults:null}function X(){let L=t.implPresetStore?.get();return xn(L)&&Array.isArray(L.presets)?L:null}function ne(){return r===null?{}:{root_dir:r}}async function ie(L,Z){return Q||!n?null:await n(L,Z)}function Pe(L){L&&xn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function He(L,Z){let ge=oe();if(!ge||Q)return null;let E=await ie(L,{...Z,...ne(),expected_revision:ge.revision});if(Pe(E),r!==null&&E&&E.conflict){let G=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:oe()?.revision??ge.revision;E=await ie(L,{...Z,...ne(),expected_revision:G}),Pe(E)}return E}async function fe(){l=!0,We();try{let L=await ie("get-session-defaults",{...ne()});s=xn(L?.values)?{...L.values}:{},i={...s},a=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){a=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{l=!1,We()}}async function Y(){let L=ed(s,i);if(Object.keys(L).length!==0){try{let Z=await ie("set-session-defaults",{values:L,...ne()});s=xn(Z?.values)?{...Z.values}:{},i={...s},a=Array.isArray(Z?.warnings)?Z.warnings:[]}catch(Z){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}We()}}function Ae(L,Z){if(!xn(L))return;let ge=L.state;u={state:ge==="usable"||ge==="unusable"||ge==="absent"?ge:"absent",values:xn(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},m={...u.values},Z&&(d={...m})}async function Oe(){try{Ae(await ie("get-workspace-accounts",{...ne()}),!0)}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}We()}async function S(L){try{let Z=await fetch(L);if(!Z.ok)return null;let ge=await Z.json();if(!xn(ge)||!Array.isArray(ge.accounts))return null;let E=ge.accounts.filter(G=>xn(G)&&typeof G.key=="string"&&G.key.length>0&&typeof G.email=="string"&&G.email.length>0);return{accounts:E,active:E.find(G=>G.active===!0)||null}}catch{return null}}async function ae(){k=!0;let[L,Z]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);Q||(b={claude:L,codex:Z},We())}function Se(){let L={};for(let Z of Uy){let ge=Object.hasOwn(d,Z)?d[Z]:null,E=Object.hasOwn(m,Z)?m[Z]:null;ge!==E&&(L[Z]=ge)}return L}async function me(){let L=Se();if(Object.keys(L).length!==0){try{Ae(await ie("set-workspace-accounts",{values:L,...ne()}),!1)}catch(Z){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}We()}}function we(L,Z){Z===ln?delete d[L]:d[L]=Z,We(),y=y.then(()=>me())}function ye(L,Z){if(By.includes(L)){bt(L,Z);return}Z===ln?delete i[L]:i[L]=Z,We(),Y()}function Le(){let L=Nt().orchestration_model,Z=$n({global:{orchestration_model:L??void 0},execution_defaults:q(),runner_catalog:se()}).orchestration_model.value;return Z?Nn(se(),Z):null}function Ye(L,Z){typeof Z=="string"&&Z.length>0?i[L]=Z:delete i[L]}function bt(L,Z){let ge=Z===ln?void 0:Z,E=Qu({impl_runtime:L==="impl_runtime"?ge:i.impl_runtime,impl_model:L==="impl_model"?ge:i.impl_model,impl_effort:L==="impl_effort"?ge:i.impl_effort},se(),Le());Ye("impl_runtime",E.impl_runtime),Ye("impl_model",E.impl_model),Ye("impl_effort",E.impl_effort),We(),Y()}async function ht(){let L=oe();if(!L)return;let Z={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},ge=td(Z,{...Z,...F});if(Object.keys(ge).length!==0){try{let E=await He("worker-queue-set-orchestration-defaults",{values:ge});if(E&&E.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}F={}}catch(E){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}}function mt(L,Z){F[L]=Z===ln?null:Z,We(),ht()}function T(L){if(P=L,!L){We();return}let Z=se(),ge=Nt(),E=ge.orchestration_model;E&&!Mo(Z,L).includes(E)&&(F.orchestration_model=null,E=null);let G=ge.orchestration_effort;G&&!Pa(Z,L,E||Tn).includes(G)&&(F.orchestration_effort=null),We(),ht()}async function ue(L){if(!(!oe()||L<Wi)){try{await He("worker-queue-set-slots",{slots:L})}catch(Z){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}We()}}async function Re(L){if(!(!oe()||L<Wi||L>Wy)){try{await He("worker-queue-set-serial-lane-count",{count:L})}catch(Z){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}We()}}async function je(L,Z){let ge=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await He(ge,{on:Z})}catch(E){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}function Me(){let L={},Z=Nt();for(let ge of Zs){let E=nr.includes(ge)?Z[ge]:i[ge];typeof E=="string"&&E.length>0&&(L[ge]=E)}return L}async function et(){let L=X();if(!L)return;let Z=Me();if(Object.keys(Z).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ge=(L.presets||[]).find(G=>G.id===V),E=ce.trim()||(ge?ge.name:"");if(!E){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=ge?await ie("impl-preset-update",{expected_revision:L.revision,id:ge.id,name:E,settings:Z}):await ie("impl-preset-create",{expected_revision:L.revision,name:E,settings:Z});if(G&&G.applied){if(ce="",!ge&&Array.isArray(G.presets)){let Ce=G.presets.find(ze=>ze.name===E);V=Ce?Ce.id:V}We()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function yt(){let L=X();if(!(!L||V.length===0))try{let Z=await ie("impl-preset-delete",{expected_revision:L.revision,id:V});Z&&Z.applied?(V="",We()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(Z){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}}function Ke(L){s=xn(L.values)?{...L.values}:{},i={...s},a=Array.isArray(L.warnings)?L.warnings:[],xn(L.queue)&&(t.onQueueAdopt?.(L.queue),F={})}async function z(){let L=X(),Z=oe();if(!L||!Z||V.length===0)return;let ge=E=>({preset_id:V,expected_revision:L.revision,expected_queue_revision:E,...ne()});try{let E=await ie("apply-impl-preset-global",ge(Z.revision));if(E&&E.applied&&Ke(E),r!==null&&E&&E.queue_applied===!1){let G=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:oe()?.revision??Z.revision;E=await ie("apply-impl-preset-global",ge(G)),E&&E.applied&&Ke(E)}E&&E.applied?E.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}We()}async function ee(){B=!0,O=!1,We();try{let L=await ie("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?O=!0:W=L}catch{O=!0}finally{B=!1,We()}}function Ie(){if(J=!J,J&&!W){ee();return}We()}function lt(){let L=so({loading:B,error:O});if(L)return L;if(!W)return"";let Z=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Z.map(ge=>c`<div class="settings-dialog__sp-variant" data-variant=${ge.key}>
            <div class="settings-dialog__sp-cond">${ge.condition}</div>
            ${ir(ge.label,ge.system_prompt)}
          </div>`)}
    </div>`}function it(){return c`<section
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
        aria-expanded=${J?"true":"false"}
        @click=${Ie}
      >
        ${J?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${J?lt():""}
    </section>`}function De(L,Z,ge,E,G,Ce,ze){let $e=G[L]??ln,at=Ma(L,ge,G,q(),se(),ze),ot=at.options.find(Je=>Je.value===$e),he=$e===ln?at.full_value:ot?.full_value;return c`<select
        class=${$e===ln?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${Z}
        title=${he||""}
        ?disabled=${Ce===!0||at.disabled}
        .value=${Lr(String($e))}
        @change=${Je=>E(L,String(Je.target.value))}
      >
        <option value=${ln} ?selected=${$e===ln}>
          ${at.unset_label}
        </option>
        ${at.options.map(Je=>c`<option
              value=${Je.value}
              title=${Je.full_value||""}
              ?selected=${Je.value===$e}
            >
              ${Je.label}
            </option>`)}
      </select>
      ${$e===ln?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ue(L,Z,ge,E,G,Ce=!1,ze){return c`<div
      class=${`settings-dialog__row${Ce?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        ${De(L,Z,ge,E,G,Ce,ze)}
      </span>
    </div>`}function ct(L,Z){let ge=Z?Z.active:null;return xn(ge)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?ge.email:ao({...ge,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function tt(L,Z,ge){let E=b[ge],G=Object.hasOwn(d,L)?d[L]:ln,Ce=ge==="claude"?qi:ao,ze=!!E?.accounts.some($e=>$e.key===G);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Z}
          data-account-key=${L}
          @change=${$e=>we(L,String($e.target.value))}
        >
          <option value=${ln} ?selected=${G.length===0}>
            ${ct(ge,E)}
          </option>
          ${G.length>0&&!ze?c`<option value=${G} selected>
                ${G} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map($e=>c`<option value=${$e.key} ?selected=${$e.key===G}>
                ${Ce($e)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ft(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function Pt(L,Z,ge,E,G){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Z}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${De(ge,`${L} \uBAA8\uB378`,E,ye,i,!1)}
        ${De(G,`${L} effort`,ei,ye,i,!1)}
      </span>
    </div>`}function Ft(L,Z,ge,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${E?"true":"false"}
          aria-label=${Z}
          @click=${()=>je(L,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ge}</span>
      </span>
    </div>`}function Ht(L,Z,ge,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${Z} \uAC10\uC18C`}
            @click=${()=>E(ge-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ge}</span>
          <button
            type="button"
            aria-label=${`${Z} \uC99D\uAC00`}
            @click=${()=>E(ge+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(Z=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Z.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Z.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Z.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Z.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Nt(){let L=oe(),Z={};for(let ge of nr)Z[ge]=Object.prototype.hasOwnProperty.call(F,ge)?F[ge]:L&&typeof L[ge]=="string"?L[ge]:null;return Z}function kt(){let L=se(),Z=i.impl_runtime,ge=i.impl_model,E=X(),G=oe(),Ce=Nt(),ze=Mo(L,P),$e=Jr(L,void 0).filter(ke=>ke!==Tn),at=Pa(L,P,Ce.orchestration_model||Tn).filter(ke=>ke!==Tn),ot=V?(E?.presets||[]).find(ke=>ke.id===V):null,he=ot?Ju(Me(),xn(ot.settings)?ot.settings:{}):null,Je=G&&typeof G.slots=="number"?G.slots:Wi+1,M=G&&typeof G.serial_lane_count=="number"?G.serial_lane_count:Wi,j=q()?.supported===!0,ve=ft(),Xe=Ma("workflow_mode",Do,i,q(),L);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${ve?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ve}
          </div>`:""}
      ${j?"":c`<div
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
                .value=${Lr(V)}
                @change=${ke=>{V=String(ke.target.value),We()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(ke=>c`<option
                      value=${ke.id}
                      ?selected=${ke.id===V}
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
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Lr(ce)}
                @input=${ke=>{ce=String(ke.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${yt}
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
                    .value=${Lr(P||ln)}
                    @change=${ke=>{let Ze=String(ke.target.value);T(Ze===ln?null:Ze)}}
                  >
                    <option value=${ln} ?selected=${!P}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${P==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${P==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ue("orchestration_model","\uBAA8\uB378",ze,mt,Ce)}
              ${Ue("orchestration_effort","effort",at,mt,Ce)}
              ${Ue("orchestration_speed","\uC18D\uB3C4",Io,mt,Ce)}
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
                      @click=${()=>ye("workflow_mode",ln)}
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
                          @click=${()=>ye("workflow_mode",ke)}
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
              ${Ue("impl_runtime","\uC704\uC784 \uB300\uC0C1",Qs,ye,i)}
              ${Ue("impl_model","\uBAA8\uB378",Jr(L,Z),ye,i)}
              ${Ue("impl_effort","effort",eo(L,Z,ge),ye,i)}
              ${Ue("impl_speed","\uC18D\uB3C4",Io,ye,i)}
              ${Ue("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",$e,ye,i,!1,{...i,...Ce})}
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
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",Je,ke=>ue(ke))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",M,ke=>Re(ke))}
            </div>
            ${it()}
          `}
    `}function We(){Q||rt(kt(),e)}return{load(){F={};let L=[fe(),Oe()];return k||L.push(ae()),Promise.all(L).then(()=>{})},render:We,sessionDraft:()=>({...i}),destroy(){Q=!0,rt(c``,e)}}}function Hi(e){return c`<svg
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
  </svg>`}function Qp(){return Hi(yo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Jp(){return Hi(yo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ef(){return Hi(yo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function tf(){return Hi(yo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function nf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function rf(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return an(Gs(t));let n={};for(let a of Vn)n[a]=0;let r=!1,o=0,s=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Vn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?tr(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ll(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function zy(e,t){if(!zn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Hy(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=$n({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),o=Er(n,e.runner_catalog),s=_r(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function of(e,t){let n=t.notify||(S=>de(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",s.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",o.append(s,l),e.appendChild(o);let u=null,d=null,m=null,y=new Map;function b(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(ae=>zn(ae)):[]}function k(S){return b().find(ae=>ae.root_dir===S)||null}function P(S){return zy(k(S),y.get(S))}function F(){for(let S of b()){let ae=y.get(S.root_dir);ae&&typeof ae.revision=="number"&&typeof S.revision=="number"&&S.revision>=ae.revision&&y.delete(S.root_dir)}}async function V(S,ae,Se){let me=t.transport,we=P(ae);if(!(!me||!zn(we))){try{let ye=await me(S,{...Se,root_dir:ae,expected_revision:we.revision});if(zn(ye?.queue)&&y.set(ae,ye.queue),ye&&ye.conflict){let Le=zn(ye.queue)&&typeof ye.queue.revision=="number"?ye.queue.revision:P(ae)?.revision;ye=await me(S,{...Se,root_dir:ae,expected_revision:Le}),zn(ye?.queue)&&y.set(ae,ye.queue)}}catch(ye){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}Y()}}function ce(S){u!==S&&(u=S,t.onFocusChange?.(u),Y())}function J(S){ce(u===S?null:S)}function B(S){if(d===S){W();return}O(),d=S;let ae=k(S);i.textContent=`${ae?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,m=zi(l,{root_dir:S,queue:()=>P(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Se=>{y.set(S,Se),Y()}}),m.load(),Y()}function O(){m?.destroy(),m=null}function W(S){O(),d=null,o.hidden=!0,i.textContent="",S!==!0&&Y()}let Q=()=>W();a.addEventListener("click",Q);function oe(S){S.key==="Escape"&&u!==null&&ce(null)}document.addEventListener("keydown",oe);function se(S,ae){let Se=Math.max(ae,S,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ae}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Se},(me,we)=>we<S?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(S){let ae=S.auto_advance===!0,Se=S.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ae?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${ae?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ae?Jp():Qp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Se?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Se?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Se?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${ef()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${tf()}
      </button>`}function X(S){let ae=Hy(S);return ae?c`<div class="mon2-deck__chips">
      ${ae.orchestration?c`<span class="mon2-deck__chip" title=${ae.orchestration.title}
            >오케 ${ae.orchestration.text}</span
          >`:""}
      ${ae.worker?c`<span class="mon2-deck__chip" title=${ae.worker.title}
            >워커 ${ae.worker.text}</span
          >`:""}
    </div>`:""}function ne(S){let ae=[];for(let[Se,me]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let we=Ll(S,Se);we>0&&ae.push(`${me} ${we}`)}return ae.join(" \xB7 ")}function ie(S){let ae=Ll(S,"running"),Se=typeof S.slots=="number"?S.slots:1;return c`<div
      class=${`mon2-deck__tile${u===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${u===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Se}\uAC1C \uC911 ${ae}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ae}/${Se}</span>
          ${se(ae,Se)}
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
        <div class="mon2-deck__ops">${q(S)}</div>
        <span class="mon2-deck__counts">${ne(S)}</span>
        ${X(S)}
      </div>
    </div>`}function Pe(S){let ae=t.doneItems?t.doneItems():[],Se=t.rangeLabel?t.rangeLabel():"",me=rf(Array.isArray(ae)?ae:[]),we=ye=>S.reduce((Le,Ye)=>Le+Ll(Ye,ye),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Se}`}
        >실행 ${we("running")} · 대기 ${we("queue")} · PR
        ${we("pr_wait")}${we("session_active")>0?` \xB7 \uC138\uC158 ${we("session_active")}`:""}
        · ${Se} 완료
        ${Array.isArray(ae)?ae.length:0}</span
      >
      ${me===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof me=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${nf(Se)}
                  >${me}</span
                >`:me.map(ye=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ye.provider}
                      title=${ye.tooltip}
                      >${ye.label}</span
                    >`)}
          </span>`}
    </div>`}function He(){let S=b();return S.length===0?"":c`${Pe(S)}
      <div class="mon2-deck__strip">
        ${S.map(ae=>ie(ae))}
      </div>`}function fe(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function Y(){F(),fe(),d!==null&&!k(d)&&W(!0),rt(He(),r),m?.render()}function Ae(S){let ae=S.target;if(!ae||typeof ae.closest!="function")return;let Se=ae.closest("[data-root-dir]");if(!Se)return;let me=Se.getAttribute("data-root-dir")||"",we=ae.closest("[data-act]")?.getAttribute("data-act");if(we==="worker"){t.gotoWorkerTab?.(me);return}if(we==="auto"){V("worker-automation-toggle",me,{on:P(me)?.auto_advance!==!0});return}if(we==="merge"){V("worker-merge-auto-toggle",me,{on:P(me)?.auto_merge!==!0});return}if(we==="gear"){B(me);return}J(me)}function Oe(S){if(S.key!=="Enter"&&S.key!==" ")return;let ae=S.target;if(!ae||typeof ae.closest!="function")return;let Se=ae.closest('[data-root-dir][role="button"]');!Se||Se!==ae||(S.preventDefault(),J(Se.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",Oe),{render:Y,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",oe),r.removeEventListener("click",Ae),r.removeEventListener("keydown",Oe),a.removeEventListener("click",Q),O(),rt(c``,r),e.replaceChildren()}}}var sf="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Gy=1e4;function af(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function lf(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var pf="bdui.monitor.done-range",ff="bdui.monitor.running_sort",_f="bdui.monitor.candidate_sort",mf="beads-ui.monitor.candidate-filter",gf="beads-ui.monitor.sections";function Ky(){try{let e=window.localStorage.getItem(mf);if(!e)return{...ro};let t=JSON.parse(e);return!t||typeof t!="object"?{...ro}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ro.show_blocked,spec:Ya.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ro}}}function cf(e){try{window.localStorage.setItem(mf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Vy(){try{let e=window.localStorage.getItem(_f);return Ho.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Yy(e){try{window.localStorage.setItem(_f,e)}catch{}}function Xy(){try{let e=window.localStorage.getItem(gf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Zy(e){try{window.localStorage.setItem(gf,JSON.stringify(e))}catch{}}function Qy(){try{let e=window.localStorage.getItem(pf);return e===null?"today":Gn(e)}catch{return"today"}}function Jy(e){try{window.localStorage.setItem(pf,e)}catch{}}function ev(){try{return window.localStorage.getItem(ff)==="repo"?"repo":"started"}catch{return"started"}}function tv(e){try{window.localStorage.setItem(ff,e)}catch{}}var bf="tab:monitor:pipeline",nv=1e3,uf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],rv=["queue","runnable","done"],df="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ov(e){return e>=1&&e<=df.length?df[e-1]:`(${e})`}function hf(e,t){let n=qt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),y=Qy(),b=ev(),k=Ky(),P=Vy(),F=Xy(),V=Ui("beads-ui.monitor.lane-collapsed"),ce=!1,J=null,B=null,O=null,W=null,Q=[],oe=null,se=null,q=null,X=null;function ne(f){return X===null&&(X=Jt()),Pu(f,X)}function ie(f,g){Pe(),!(g<=0)&&(se={lane_id:f,corrected:g},q=setTimeout(()=>{q=null,se=null,he()},Gy))}function Pe(){q!==null&&(clearTimeout(q),q=null),se=null}function He(){let f=Fr.find(g=>g.value===y);return f?f.label:""}let fe=document.createElement("div");fe.className="mon",e.appendChild(fe);let Y=document.createElement("div");Y.className="worker-drawer-overlay",Y.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let Oe=document.createElement("div");Oe.className="worker-drawer-host mon2-drawer",Y.append(Ae,Oe),e.appendChild(Y);let S=Go(null,null),ae=new Map,Se=new Map,me=null,we=null,ye=null,Le=io(Oe,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,Y.hidden=!0,he()}});async function Ye(f,g,w,$,N=!0){if(!s||!w)return null;let H=await s(f,{...g,root_dir:w,expected_revision:$});if(H&&H.conflict&&N){H.queue&&Se.set(w,H.queue);let re=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$;H=await s(f,{...g,root_dir:w,expected_revision:re})}return H&&H.queue&&w&&Se.set(w,H.queue),H}function bt(f,g){let w=Se.get(f),$=o&&o.get?o.get():null,N=(Array.isArray($)?$:[]).find(re=>re?.root_dir===f);return(w||N)?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action}async function ht(f,g,w,$){let N=await Ye(f,g,w,$),H=Se.get(w)?.revision??N?.queue?.revision??$;return er(N,(re,Ee)=>Ye(f,{...g,continuation:re,decision_token:Ee},w,H,!1),{refresh:re=>Ye(f,g,w,re?.queue?.revision??Se.get(w)?.revision??H,!1)})}async function mt(f,g,w,$){let N=await er({continuation_mismatch:$},(re,Ee)=>Ye("worker-merge-queue-add",{bead_id:g,continuation:re,decision_token:Ee},f,w,!1)),H=N?.queue?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action;N?.applied!==!0&&H?.continuation===null&&H.mismatch&&await mt(f,g,N.queue.revision,H.mismatch)}async function T(f,g,w){let $=await Ye("worker-discard",f,g,w);if($&&$.discarded===!0){de(di($),"success",5e3);return}if($&&$.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ue(f,g,w){return!s||!w?null:await s(f,{...g,root_dir:w})}async function Re(){let f=new Map;for(let g of S.pr_wait)f.has(g.root_dir)||f.set(g.root_dir,g.expected_revision);for(let[g,w]of f)await Ye("worker-merge-queue-add-all",{},g,w)}function je(f){let g=F[f];return!!(g&&g.runnable===!0)}function Me(f){let g={...F[f]||{}};g.runnable=!g.runnable,F={...F,[f]:g},Zy(F),he()}function et(f){V.toggle(f),he()}function yt(f){V.toggleArea(f),he()}function Ke(f){let g=S.queue_groups.find(w=>w.root_dir===f);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let $=`s${w+1}`,N=g.sublanes.serial.find(H=>H.id===$);if(!N||N.raw_length===0&&N.occupied_by.length===0)return $}return null}function z(f,g){let w=S.queue_groups.find(N=>N.root_dir===f),$=w?w.sublanes.serial.find(N=>N.id===g):void 0;return $?$.raw_length:0}function ee(f,g){let w=ae.get(f),$=ae.get(g);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let N=af(w),H=af($);if(N!==null&&N===H&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let re=lf(w),Ee=lf($);if(re&&H!==null){let Ve=H;return{kind:"ops",title:`${Ve} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:f,lane:Ve,index:z($.root_dir,Ve)}]}}if(N!==null&&Ee&&H===null){let Ve=N;return{kind:"ops",title:`${Ve} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ve,index:z(w.root_dir,Ve)}]}}if(re&&N===null&&Ee&&H===null){let Ve=Ke(w.root_dir);return Ve===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${Ve} \uB808\uC778\uC5D0 ${g} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:Ve,index:0},{bead_id:f,lane:Ve,index:1}]}}return!re&&!Ee?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:re?{kind:"note",text:`${as($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${as(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Ie(f,g){let w=ee(f,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:sf,title:w.title}:{kind:"place",label:sf,title:w.title}}}function lt(f,g){if(!W||W.bead_id!==f)return null;let w=W.counterpart_id,$=g.filter(N=>N.id===w);return $.length===0?null:{rows:$.map(N=>Ie(f,N))}}function it(f){let g=f.dependency_chips||null,w=f.overlap_chips||[],$=f.scope_state==="missing",N=f.cross_lane_chip,H=f.armed_lane_chip;if(!g&&w.length===0&&!$&&!N&&!H)return null;let re=lt(f.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...N?{cross_lane:{lane_id:N.lane_id,label:N.label}}:{},...H?{armed_lane:H}:{},...re?{popover:re}:{}}}function De(f){let g=it(f);return g?{...f,dependency_chips:g}:f}async function Ue(f,g){let w=ee(f,g);if(W=null,w.kind!=="ops"){he();return}let $=mn(w.root_dir,w.ops[0].bead_id);for(let N of w.ops){let H=await ct(N,w.root_dir,$);if(H===null)break;$=H}he()}async function ct(f,g,w){try{let $=await Ye("worker-queue-place",f,g,w,!1);if($&&$.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return de($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let N=$.queue?$.queue.revision:void 0;return typeof N!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):N}catch($){return de(st($),"error"),null}}function tt(f){let g=je(f.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function ft(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${g}
    </div>`}function Pt(f){if(O!==f.id)return null;let g=S.queue_groups.find(H=>H.root_dir===f.root_dir),w=f.place_lanes||[],$=S.cross_lanes_revision!==null,N=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let H of S.chain_lanes)N.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});N.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of w)N.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:N}}function Ft(f){return ft(f,c`${Ua(De(f),Pt(f),{exec_chips_mode:"pinned_only",onOpenDoc:a?(g,w)=>a(w,f.root_dir):void 0})}`)}function Ht(){return S.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(f=>Ft(f))}
      </div>`:c`${S.runnable_sections.map(f=>{let g=je(f.root_dir);return c`<section
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
    </div>`}function kt(f,g,w,$){return c`<div
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
        >${ov(g.seq)}</span
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
    </div>`}function We(f){let g=S.cross_lanes_revision!==null,w=ne(f.lane_id),$=w?.held===!0,N=w?.cycle===!0,H=w?w.mismatched:[],re=se&&se.lane_id===f.lane_id?se.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${re>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${re}건 자동 교정</span
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
            </div>`:f.rows.map((Ee,Ve)=>kt(f,Ee,Ve,H))}
      </div>
    </div>`}function L(f,g,w){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${f.id}
      data-row-index=${w}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Fn(De(g),{actions:Mt(g)})}
    </div>`}function Z(f){if(f.length===0)return"";let g=f.length-1;return`${f[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function ge(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Fn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function E(f,g){let w=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(N=>ge(N)),...g.items.map((N,H)=>L(g,N,H))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${w.map(N=>`${N.id} \u2014 ${N.badge}`).join(`
`)}
              >${Z(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(N=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${N.workspace_name}·${N.lane}과 교차 대기
                </div>`)}`}:{}}}function G(){let f=S.cross_lanes_revision!==null,g=S.chain_lanes.some(w=>w.draft&&w.rows.length===0);return bi({parallel:{rows:S.parallel_rows.map((w,$)=>Nt(w,$)),count:S.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(w=>w.sublanes.serial.map($=>({...E(w,$),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(w=>We(w)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!f}
          title=${f?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ce(f){return c`<div class="worker-rungrid">
      ${S.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(g=>Ol({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},f,B,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:it(g)}}))}
    </div>`}function ze(f){let g={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},w=$=>{let N=g[$.lane],H=$.lane==="runnable"?S.runnable_flat?N.length>0?Ht():void 0:S.runnable_sections.length>0?Ht():void 0:$.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?G():void 0:$.lane==="running"?Ce(f):N.length>0?c`${N.map(re=>Fn(re))}`:void 0;return Yn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:N,count:N.length,src:$.lane==="runnable",empty:$.empty,body:H,live:$.lane==="running"&&N.length>0,collapsible:!0,collapsed:V.isCollapsed($.pane),controls:$.lane==="runnable"?$e():void 0,header_control:at($.lane,N.length)})};if(ce){let $=rv.map(N=>uf.find(H=>H.lane===N)).filter(N=>N!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${hi({live:S.running.length>0,running_body:S.running.length>0?Ce(f):"",pr_wait_rows:S.pr_wait.map(N=>Fn(N)),count:S.running.length+S.pr_wait.length})}
            ${$.map(N=>w(N))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${uf.map($=>w($))}
        </div>
      </div>`}function $e(){return c`<div class="worker-filter">
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
        ${Ya.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${k.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function at(f,g){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${P}
      >
        ${Ho.map(w=>c`<option
              value=${w.value}
              ?selected=${P===w.value}
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
      </select>`:""}function ot(f){let g=o&&o.get?o.get():null,w=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=f===void 0?o&&o.crossLanes?o.crossLanes():void 0:f,N={done_since:$r(y,d()),running_sort:b,candidate_filter:k,candidate_sort:P};return $!==void 0&&(N.cross_lanes=$),Go(g,w,N)}function he(){let f=d();S=ot(),X=null,ae=new Map;for(let g of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!g.non_occupying&&!ae.has(g.id)&&ae.set(g.id,g);rt(ze(f),fe),M()?.render(),Je(),j()}function Je(){let f=new Map;for(let g of S.queue_groups)f.set(g.root_dir,g.auto_advance);for(let g of Array.from(fe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=f.get(w);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function M(){if(ye)return ye;let f=fe.querySelector(".mon2-deck");return f?(ye=of(f,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:He,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:g=>{oe=g,j()}}),ye):null}function j(){fe.classList.toggle("has-focus",oe!==null);for(let f of Array.from(fe.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",oe!==null&&f.getAttribute("data-root-dir")===oe);for(let f of Array.from(fe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=ae.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",oe!==null&&!!g&&g.root_dir===oe)}for(let f of Array.from(fe.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",oe!==null&&f.getAttribute("data-root-dir")===oe)}function ve(f,g){let w=i?i():void 0;if(!g||!w||g===w||!l){r(f);return}l(g).then(()=>{r(f)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function Xe(f){if(!f)return;let g=i?i():void 0,w=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===f){w();return}l(f).then(w).catch($=>{n("workspace switch for %s failed: %o",f,$),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function ke(f){Sn(f).then(g=>{de(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Ze(f){let g=ae.get(f)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function st(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function _t(f,g,w){if(f!=="dep-add")return;let $=S.chain_lanes.find(N=>N.rows.some(H=>H.id===g));!$||!$.rows.some(N=>N.id===w)||await pe(N=>Bu($.lane_id,N),"",[{type:f,a:g,b:w}])}function xt(){let f=new Map,g=o&&o.get?o.get():null,w=$=>Array.isArray($)?$.filter(N=>typeof N=="string"&&N.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let N=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[H,re]of Object.entries(N))Array.isArray(re)&&f.set(H,w(re));for(let H of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])H&&typeof H.bead_id=="string"&&Array.isArray(H.blocked_by)&&H.blocked_by.length>0&&f.set(H.bead_id,w(H.blocked_by))}return f}function Kt(){let f=new Map,g=new Map,w=o&&o.get?o.get():null,$=N=>Array.isArray(N)?N.filter(H=>typeof H=="string"&&H.length>0):[];for(let N of Array.isArray(w)?w:[]){if(!N||typeof N!="object")continue;let H=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[re,Ee]of Object.entries(H))Array.isArray(Ee)&&f.set(re,$(Ee));for(let re of Array.isArray(N.runnable)?N.runnable:[])re&&typeof re.bead_id=="string"&&Array.isArray(re.blocked_by)&&g.set(re.bead_id,$(re.blocked_by))}for(let N of Q)for(let H of[f,g]){let re=H.get(N.a);re!==void 0&&H.set(N.a,N.type==="dep-remove"?re.filter(Ee=>Ee!==N.b):re.includes(N.b)?re:[...re,N.b])}return{snapshot:f,runnable:g}}function Et(){let f=xt();for(let g of Q){let w=(f.get(g.a)||[]).slice();g.type==="dep-remove"?f.set(g.a,w.filter($=>$!==g.b)):w.includes(g.b)||f.set(g.a,[...w,g.b])}return f}function Jt(f=S,g=Ne()){let w=new Map;for(let nt of Array.isArray(g?.lanes)?g.lanes:[]){let Fe=new Map;for(let v of Array.isArray(nt?.entries)?nt.entries:[])v&&typeof v.bead_id=="string"&&Fe.set(v.bead_id,v.dep_created_by_lane===!0);w.set(typeof nt?.id=="string"?nt.id:"",Fe)}let $=new Map,N=new Map,H=new Set,re=new Set;for(let nt of f.chain_lanes){let Fe=w.get(nt.lane_id);$.set(nt.lane_id,{status:nt.status,entries:nt.rows.map((v,K)=>({bead_id:v.id,root_dir:v.root_dir,...K===0?{}:{dep_created_by_lane:Fe?.get(v.id)===!0}}))});for(let v of nt.rows)N.set(v.id,nt.lane_id),v.fixed&&H.add(v.id),v.unplaced||re.add(v.id)}let Ee=new Map;for(let nt of f.parallel_rows)typeof nt.queue_index=="number"&&Ee.set(nt.id,nt.queue_index);for(let nt of f.queue_groups)for(let Fe of nt.sublanes.serial)for(let v of Fe.items)typeof v.queue_index=="number"&&Ee.set(v.id,v.queue_index);let Ve=Kt();return{blocked_by_map:Et(),snapshot_blocked_by:Ve.snapshot,runnable_blocked_by:Ve.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:$,owner_lane_of:N,fixed_members:H,placed_members:re,parallel_rows:f.parallel_rows.map(nt=>({bead_id:nt.id,root_dir:nt.root_dir,queue_index:nt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:Ee}}function Ne(){return(o&&o.crossLanes?o.crossLanes():null)??null}function mn(f,g){let w=ae.get(g);if(w&&w.root_dir===f)return w.expected_revision;let $=S.queue_groups.find(N=>N.root_dir===f);return $?$.revision:0}async function en(f,g,w){if(f.type==="worker-queue-disarm"){try{let $=await Ye(f.type,f.payload,f.root_dir,w.get(f.root_dir)??mn(f.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&w.set(f.root_dir,$.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await jt(f.type,f.payload,f.root_dir,w,{bead_id:g})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await ue(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch($){return de(st($),"error"),!1}}async function jt(f,g,w,$,N){try{let H=await Ye(f,g,w,$.get(w)??mn(w,N.bead_id));return!H||typeof H.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(H.queue&&typeof H.queue.revision=="number"&&$.set(w,H.queue.revision),H.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):H.applied===!1?(de(H.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${H.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):H.queue&&typeof H.queue.revision=="number"?H.queue.revision:$.get(w)??0)}catch(H){return de(st(H),"error"),null}}function Qt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(Q=[...Q,{type:f.type,a:f.a,b:f.b}])}async function gn(f,g){if(!s)return{ok:!1};try{let w=await s(f.type,{...f.payload,expected_revision:g});return!w||typeof w.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,N=$&&$.code==="conflict"?$.details?.cross_lanes:null;return N&&typeof N.revision=="number"&&Array.isArray(N.lanes)?{ok:!1,conflict:N}:(de(st(w),"error"),{ok:!1})}}async function _e(f,g,w){let $=new Map,N=[],H=f.ops.slice(0,f.lane_op_index),re=f.ops.slice(f.lane_op_index);for(let Ve of H){if(!await en(Ve,w,$))return{done:!0};Qt(Ve)}let Ee=g;for(let Ve of f.lane_ops){if(Ee===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let nt=await gn(Ve,Ee);if(!nt.ok)return nt.conflict?{done:!1,conflict:nt.conflict}:{done:!0};Ee=nt.revision}for(let Ve of re){if(!await en(Ve,w,$))return{done:!0};Qt(Ve),Ve.type==="dep-add"&&N.push(Ve)}for(let Ve of zu(N))Ee=await A(Ve,Ee);return{done:!0}}async function A(f,g){if(g===null||!s)return g;let w=f.pairs,$=g;for(let N=0;N<2;N+=1){if(w.length===0)return $;try{let H=await s("monitor-lane-provenance",{lane_id:f.lane_id,pairs:w.map(re=>({bead_id:re.bead_id,after:re.after,value:!0})),expected_revision:$});return H&&typeof H.revision=="number"?H.revision:$}catch(H){let re=H,Ee=re&&re.code==="conflict"?re.details?.cross_lanes:null;if(!Ee||typeof Ee.revision!="number"||!Array.isArray(Ee.lanes))return $;let Ve=Ee.lanes.find(nt=>nt&&nt.id===f.lane_id);w=Hu(Array.isArray(Ve?.entries)?Ve.entries:[],w),$=Ee.revision}}return $}async function pe(f,g,w=[]){Q=w,Pe();let $=S,N=Ne();for(let H=0;;H+=1){let re=f(Jt($,N));if("refused"in re){de(re.refused,"error");break}let Ee=await _e(re,$.cross_lanes_revision,g);if(Ee.done){re.correction&&ie(re.correction.lane_id,re.correction.corrected);break}if(H>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=ot(Ee.conflict),N=Ee.conflict}Q=[],he()}async function Te(f,g){await pe(w=>Oa(f,g,w),f.bead_id)}async function wt(f,g){if(f==="run"){await At(g);return}if(f==="stop"){await Bt(g);return}if(f==="create"){await pe(w=>La(null,w),"");return}if(f==="remove"){let w=Wu(g,Jt());if(w!==null&&!m(w))return;await pe($=>Uu(g,$),"");return}await pe(w=>f==="confirm"?Fu(g,w):ju(g,w),"")}function Tt(f){let g=new Map;for(let w of f.rows){let $=S.owner_of[w.id]||w.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],w.id])}return g}async function At(f){let g=S.chain_lanes.find(H=>H.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Pe();let w=new Map,$=new Map,N=Tt(g);for(let H of g.rows){if(!H.unplaced)continue;let re=S.owner_of[H.id]||H.root_dir;if(typeof re!="string"||re.length===0){de(`${H.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),he();return}let Ee=$.get(re)??0;if(await jt("worker-queue-place",{bead_id:H.id,lane:"parallel",index:(S.parallel_raw_length[re]??0)+Ee},re,w,{bead_id:H.id})===null){he();return}$.set(re,Ee+1)}for(let[H,re]of N)if(await jt("worker-queue-arm",{bead_ids:re,lane_id:f},H,w,{bead_id:re[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),he();return}he()}async function Bt(f){let g=S.chain_lanes.find($=>$.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Pe();let w=new Map;for(let[$,N]of Tt(g))if(await jt("worker-queue-disarm",{lane_id:f},$,w,{bead_id:N[0]})===null)break;he()}async function nn(f,g){let{root_dir:w,revision:$}=Ze(f);if(w.length===0){he();return}await jt("worker-queue-disarm",{bead_ids:[f],lane_id:g},w,new Map([[w,$]]),{bead_id:f}),he()}async function rn(f,g){let w=ae.get(f);if(!w){he();return}let $={kind:"candidate",bead_id:f,root_dir:w.root_dir};if(g==="new-lane"){await pe(N=>La({bead_id:f,root_dir:w.root_dir},N),f);return}if(g.startsWith("lane:")){let N=g.slice(5);if(!S.chain_lanes.find(re=>re.lane_id===N)){he();return}await pe(re=>Oa($,{kind:"chain",lane_id:N,marker_index:(re.cross_lanes.get(N)?.entries??[]).length},re),f);return}if(g.startsWith("serial:")){let N=g.slice(7),H=(w.place_lanes||[]).find(re=>re.id===N);await Te($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:N,index:H?H.index:0});return}await Te($,{kind:"parallel",marker_index:S.parallel_rows.length})}async function Cn(f,g){let w=S.parallel_rows,$=w.findIndex(nt=>nt.id===f);if($<0)return;let N=w[$].root_dir,H=[];w.forEach((nt,Fe)=>{nt.root_dir===N&&H.push(Fe)});let re=H.indexOf($),Ee=H[re+g];if(typeof Ee!="number")return;let Ve=g===-1?Ee:H[re+2]??Math.min(w.length,Ee+1);await Te({kind:"parallel",bead_id:f,root_dir:N,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:Ve})}async function Ot(f){for(let g of S.chain_lanes){let w=g.rows.find($=>$.id===f);if(w){await Te({kind:"chain",bead_id:f,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}let sn=null,cn=!1,un=null;function Hn(){un!==null&&clearTimeout(un),un=setTimeout(()=>{un=null,cn=!1},0)}function x(f,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&f.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return f.querySelectorAll("[data-row-index]").length}function C(f){let g=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:S.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function p(f){let g=f.target;if(!sn)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return C(g);let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:x(w,g)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:x(w,g)}};if($==="repo-serial"){let N=w.getAttribute("data-root-dir")||"";if(N!==sn.root_dir)return null;let H=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,re=H&&w.contains(H)?H.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Ee=Number(re);return{zone:w,target:{kind:"repo-serial",root_dir:N,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Ee)?Ee:0}}}return null}function h(){for(let f of Array.from(fe.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let R=null;function te(f){R=f.target instanceof Element?f.target:null}function be(f){let g=f.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;if(w&&R&&w.contains(R)&&typeof R.closest=="function"&&R.closest("input, button, a")){f.preventDefault();return}let N=$.getAttribute("data-bead-id")||"",H=$.getAttribute("data-drag-kind")||"",re=$.getAttribute("data-root-dir")||"";if(!N||!H||!re)return;let Ee=$.getAttribute("data-queue-index")||"",Ve=Number(Ee),nt=$.getAttribute("data-lane-id")||"";sn={kind:H,bead_id:N,root_dir:re,...Ee!==""&&Number.isFinite(Ve)?{queue_index:Ve}:{},...nt?{lane_id:nt}:{}},cn=!0,O=null,fe.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",N),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function dt(f){let g=p(f);g&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function ut(f){let g=f.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Vt(){sn=null,h(),fe.classList.remove("is-dragging"),Hn()}function Ut(f){let g=p(f),w=sn;sn=null,h(),fe.classList.remove("is-dragging"),!(!g||!w)&&(f.preventDefault(),Te(w,g.target))}function Gt(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Rn(f,g){let{item:w,root_dir:$,revision:N}=Ze(g),H=w?.attempt_id||"",re=f.classList;if(re.contains("worker-mini__rowops-up")||re.contains("worker-mini__rowops-down")){Cn(g,re.contains("worker-mini__rowops-up")?-1:1);return}if(re.contains("worker-mini__rowops-remove")){Ye("worker-queue-remove",{bead_id:g},$,N);return}if(re.contains("mon2-crow__detach")){Ot(g);return}if(re.contains("worker-dep__open")){ve(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(re.contains("mon2-arm__release")){nn(g,f.getAttribute("data-lane-id")||"");return}if(re.contains("mon-lane__chip")){let Ee=f.getAttribute("data-lane-id")||"";fe.querySelector(`.mon2-clane[data-lane-id="${Ee}"]`)?.scrollIntoView({block:"nearest"});return}if(re.contains("mon-overlap__chip")){let Ee=f.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===Ee?null:{bead_id:g,counterpart_id:Ee},he();return}if(re.contains("mon-overlap__place")){Ue(g,f.getAttribute("data-counterpart-id")||"");return}if(re.contains("worker-card__place")){O=O===g?null:g,he();return}if(re.contains("worker-card__place-cancel")){O=null,he();return}if(re.contains("worker-card__place-lane")){let Ee=f.getAttribute("data-lane")||"parallel";O=null,rn(g,Ee);return}if(re.contains("rtile__session")){if(w&&w.kind==="session"){let Ee=(w.session_refs||[]).find(Ve=>Ve&&Ve.current===!0);Ee&&(Y.hidden=!1,Le.open(Yr(Ee,g,"in_progress",$)),he());return}B=H,H&&w&&(Y.hidden=!1,Le.open({attempt_id:H,root_dir:$,meta:Gt(w)})),he();return}if(re.contains("rtile__pause")){ue("worker-attempt-pause",{attempt_id:H},$);return}if(re.contains("rtile__resume")){Vr().then(Ee=>{if(Ee!==null)return ht("worker-attempt-resume",{attempt_id:H,...Ee!==""?{instructions:Ee}:{}},$,N)});return}if(re.contains("rtile__dismiss")){Ye("worker-attempt-dismiss",{attempt_id:H},$,N);return}if(re.contains("rtile__discard")){if(!m(jo(g,"unmerged")))return;T({bead_id:g,...H?{attempt_id:H}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(re.contains("worker-mini__merge")){let Ee=bt($,g);Ee?.mismatch&&Ee.continuation===null?mt($,g,N,Ee.mismatch):Ye("worker-merge-queue-add",{bead_id:g},$,N);return}if(re.contains("worker-mini__merge-cancel")){Ye("worker-merge-queue-remove",{bead_id:g},$,N);return}if(re.contains("worker-mini__discard")){let Ee=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(jo(g,Ee)))return;T({bead_id:g,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},$,N);return}if(re.contains("worker-mini__revise-fix")){ht("worker-revise-fix",{bead_id:g},$,N);return}re.contains("worker-mini__revise-approve")&&Ye("worker-revise-approve",{bead_id:g},$,N)}function bn(f){let g=cn;cn=!1;let w=f.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){f.preventDefault();let U=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";U&&ke(U);return}let N=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(N){f.preventDefault();let I=N.getAttribute("data-root-dir")||ae.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||N.getAttribute("title")||"";Xe(I);return}let H=w.closest(".mon2-sec__toggle");if(H){f.preventDefault(),Me(H.getAttribute("data-root-dir")||"");return}let re=w.closest(".worker-pane__toggle[data-lane]");if(re){f.preventDefault();let I=re.getAttribute("data-lane")||"";(I==="candidate"||I==="queue"||I==="running"||I==="pr_wait"||I==="done")&&et(I);return}let Ee=w.closest(".worker-wait__area-toggle[data-area]");if(Ee){f.preventDefault(),yt(Ee.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){f.preventDefault(),wt("create","");return}let Ve=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ve){f.preventDefault();let I=Ve.getAttribute("data-lane-id")||"",U=Ve.classList;wt(U.contains("mon2-clane__confirm")?"confirm":U.contains("mon2-clane__reapply")?"reapply":U.contains("mon2-clane__run")?"run":U.contains("mon2-clane__stop")?"stop":"remove",I);return}if(w.closest(".mon-merge-all")){f.preventDefault(),Re();return}let nt=w.closest(".mon-filter__spec");if(nt){f.preventDefault(),k={...k,spec:nt.getAttribute("data-spec")||"all"},cf(k),he();return}let Fe=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Fe)return;let v=Fe.getAttribute("data-bead-id")||"",K=w.closest("button");if(K){f.preventDefault(),Rn(K,v);return}v&&!g&&(f.preventDefault(),ve(v,Fe.getAttribute("data-root-dir")||Ze(v).root_dir))}function Yt(f){let g=f.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){k={...k,show_blocked:w.checked},cf(k),he();return}let $=g.closest(".mon-candidate-sort");if($){P=Ho.some(re=>re.value===$.value)?$.value:"repo_spec",Yy(P),he();return}let N=g.closest(".mon-running-sort");if(N){b=N.value==="repo"?"repo":"started",tv(b),he();return}let H=g.closest(".mon-done-range");H&&(y=Gn(H.value),Jy(y),he())}function An(f){let g=f.target,w=g&&typeof g.closest=="function"?N=>g.closest(N):()=>null,$=!1;W&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,$=!0),$&&he()}function hn(f){f.key!=="Escape"||!W||(W=null,he())}e.addEventListener("click",bn),e.addEventListener("change",Yt),e.addEventListener("pointerdown",te),document.addEventListener("click",An),document.addEventListener("keydown",hn),e.addEventListener("dragstart",be),e.addEventListener("dragover",dt),e.addEventListener("dragleave",ut),e.addEventListener("drop",Ut),e.addEventListener("dragend",Vt);{let f=!0;J=Bi(g=>{if(ce=g,f){f=!1;return}he()})}o&&typeof o.subscribe=="function"&&(me=o.subscribe(()=>{try{Se.clear(),he()}catch{}}));function ar(){we!==null&&(clearInterval(we),we=null)}function Xn(){un!==null&&(clearTimeout(un),un=null)}return{recorrectSharedLane:_t,load(){n("load"),he(),we===null&&(we=setInterval(()=>{try{he()}catch{}},nv))},pause(){ar()},clear(){ar(),Xn(),me&&(me(),me=null),J&&(J(),J=null),Le.destroy(),Y.hidden=!0,ye?.destroy(),ye=null,e.removeEventListener("click",bn),e.removeEventListener("change",Yt),e.removeEventListener("pointerdown",te),document.removeEventListener("click",An),document.removeEventListener("keydown",hn),e.removeEventListener("dragstart",be),e.removeEventListener("dragover",dt),e.removeEventListener("dragleave",ut),e.removeEventListener("drop",Ut),e.removeEventListener("dragend",Vt),e.replaceChildren()}}}function yf(e,t,n){let r=qt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function a(y){return b=>{b.preventDefault();let k=y==="monitor"&&l()==="monitor"?"worker":y;r("click tab %s",k),n.gotoView(k)}}function l(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${a("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let y=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${a("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${a("worker")}
          >Worker</a
        >
      </div>
    `}function m(){o&&rt(u(),o),s&&rt(d(),s)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),o&&rt(c``,o),s&&rt(c``,s)}}}var vf=["bug","feature","task","epic","chore"];function wf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var kf=["Critical","High","Medium","Low","Backlog"];function $f(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let W of vf){let Q=document.createElement("option");Q.value=W,Q.textContent=wf(W),s.appendChild(Q)}i.replaceChildren();for(let W=0;W<=4;W+=1){let Q=document.createElement("option");Q.value=String(W);let oe=kf[W]||"Medium";Q.textContent=`${W} \u2013 ${oe}`,i.appendChild(Q)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function P(O){o.disabled=O,s.disabled=O,i.disabled=O,a.disabled=O,l.disabled=O,d.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function F(){u.textContent=""}function V(O){u.textContent=O}function ce(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?i.value=W:i.value="2"}catch{s.value="",i.value="2"}}function J(){let O=s.value||"",W=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function B(){F();let O=String(o.value||"").trim();if(O.length===0){V("Title is required"),o.focus();return}let W=Number(i.value||"2");if(!(W>=0&&W<=4)){V("Priority must be 0..4"),i.focus();return}let Q=String(s.value||""),oe=String(l.value||""),se={title:O};Q.length>0&&(se.type=Q),String(W).length>0&&(se.priority=W),oe.length>0&&(se.description=oe),P(!0);try{await t("create-issue",se)}catch{P(!1),V("Failed to create issue");return}J(),P(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),y.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),B())}),r.addEventListener("submit",O=>{O.preventDefault(),B()}),{open(){r.reset(),F(),ce();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var sv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function iv(e,t){return ya(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function xf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=iv(r,e);return c`<button
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
  `}function Af(e,t,n){return c`
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
  `}function Sf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${sv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var av=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Ef(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ie=>de(ie,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,u="",d=null;function m(){if(d)return d;let ie=i.querySelector('[data-pane="execution"]');return ie?(d=zi(ie,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Pe=>t.queueStore?.set?.(Pe)}),d):null}function y(){return c`
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
    `}function b(){let ie=r.get();return c`
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
        ${ie?c`
              ${xf(ie,o(),V)}
              ${Af(ie,u,{onDraft:Pe=>{u=Pe},onAdd:ce,onRemove:J})}
              ${Sf(ie,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ie){let Pe=r.get();if(Pe)try{let He=await n("display-policy-set",{expected_revision:Pe.revision,policy:ie(Pe)});P(He),He&&He.conflict&&He.policy&&(He=await n("display-policy-set",{expected_revision:He.policy.revision,policy:ie(He.policy)}),P(He)),He&&He.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function P(ie){ie&&ie.policy&&typeof ie.policy=="object"&&r.set(ie.policy)}function F(ie){k(ie)}function V(ie){let Pe=r.get();if(!Pe)return;let He=!lv(ie,Pe);F(fe=>cv(ie,fe,He))}function ce(){let ie=u.trim();ie.length!==0&&(u="",F(Pe=>Pe.hidden_prefixes.includes(ie)?{hidden_prefixes:Pe.hidden_prefixes}:{hidden_prefixes:[...Pe.hidden_prefixes,ie]}),O())}function J(ie){F(Pe=>({hidden_prefixes:Pe.hidden_prefixes.filter(He=>He!==ie)}))}function B(ie){let Pe=r.get();if(!Pe)return;let He=Pe.chips[ie]===!1;F(()=>({chips:{[ie]:He}}))}function O(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${av.map(ie=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ie.id}
                  aria-selected=${String(a===ie.id)}
                  aria-controls=${`settings-pane-${ie.id}`}
                  @click=${()=>W(ie.id)}
                >
                  <span class="settings-dialog__glyph">${ie.glyph}</span>
                  ${ie.label}
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
            ${y()} ${b()}
          </div>
        </div>
      `,i),m()}function W(ie){a=ie,O()}let Q=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",Q),i.addEventListener("cancel",Q);let oe=ie=>{ie.target===i&&ne()};i.addEventListener("click",oe);let se=null;r.subscribe&&(se=r.subscribe(()=>{l&&O()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function X(ie="execution"){l||(l=!0,t.onOpenChange?.(!0),a=ie,u="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function ne(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:X,close:ne,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",Q),i.removeEventListener("cancel",Q),i.removeEventListener("click",oe),se&&(se(),se=null),q&&(q(),q=null),d?.destroy(),d=null,i.remove()}}}function lv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function cv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var uv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Tf="usage-meter-card",dv="usage-meter-layer",Il=600,pv=["token_expired","relogin_required"];function Cf(e){return String(e).padStart(2,"0")}function fv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Rf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Cf(r.getHours())}:${Cf(r.getMinutes())}`,a=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${uv[r.getMonth()]} ${r.getDate()} ${s}`;return`${fv(n,t)} \xB7 ${a}`}function _v(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Of(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Lf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var If=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Pf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function mv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Pf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function gv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=mv(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Pf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function bv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=gv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Mf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function hv(e,t){return!e.held||Mf(e,t)<=Il?e:{...e,available:!1,windows:[],accounts:[]}}function Df(e,t){return`${e}:${t}`}function Nf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,a=0,l=null;function u(){rt(c``,e),e.hidden=!0,m()}function d(){if(l===null){let fe=e.ownerDocument;l=fe.createElement("div"),l.id=dv,l.className="usage-meter__layer",fe.body.appendChild(l)}return l}function m(){l!==null&&(rt(c``,l),l.remove(),l=null)}function y(fe){n!==fe&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",F),window.addEventListener("resize",P)),n=fe)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",F),window.removeEventListener("resize",P))}function k(fe){let Y=fe.target;Y&&(e.contains(Y)||l!==null&&l.contains(Y))||(b(),ne())}function P(){ne()}function F(fe){fe.key==="Escape"&&(b(),ne())}function V(fe){n===fe?b():y(fe),ne()}function ce(){b(),ne()}async function J(fe,Y){if(r.has(fe.key))return;let Ae=Df(fe.key,Y);r.set(fe.key,Y),i.delete(Ae),ne();let Oe=null;try{Oe=await(await fetch(fe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Y})})).json()}catch{Oe=null}if(t)return;if(r.delete(fe.key),!Oe||Oe.ok!==!0){let ae=Oe&&typeof Oe.error=="string"&&Oe.error.length>0?Oe.error:"network_error";i.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),ne();return}let S=Array.isArray(Oe.warnings)?Oe.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];S.length>0&&i.set(Ae,{kind:"warn",text:S.join(" \xB7 ")}),ne(),await He()}function B(fe,Y,Ae,Oe){let S=Lf(fe.pct),Se=`resets ${Rf(fe.resetsAt,Oe)}${Y?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${Of(S)}"
      style=${`--progress: ${S}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${fe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function O(fe,Y,Ae){let Oe=Mf(Y,Ae),S=Y.available&&(Y.held||Oe>Il),ae=S?`${Math.floor(Oe/60)}\uBD84 \uC804 \uCE21\uC815`:"",Se=Y.accounts.filter(Le=>!Le.active).length,me=`usage-meter__group${S?" usage-meter__group--stale":""}`,we=c`<span class="usage-meter__provider"
        >${fe.label}</span
      >
      ${Y.available?Y.windows.map(Le=>B(Le,S,ae,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Se>0?c`<span class="usage-meter__badge">+${Se}</span>`:""}`;if(Y.accounts.length===0)return c`<span
        class=${me}
        aria-label=${`${fe.label} usage`}
        >${we}</span
      >`;let ye=n===fe.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${me}`}
      aria-label=${`${fe.label} usage`}
      aria-expanded=${ye?"true":"false"}
      aria-controls=${Tf}
      @click=${()=>V(fe.key)}
    >
      ${we}
    </button>`}function W(fe,Y){return c`<span class="usage-meter" aria-label="Usage">
      ${fe.map(Ae=>O(Ae.provider,Ae.snapshot,Y))}
    </span>`}function Q(fe,Y){let Ae=Lf(fe.pct),Oe=Rf(fe.resetsAt,Y);return c`<span
      class="usage-meter__account-window ${Of(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${fe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${Oe.length>0?`\u21BB ${Oe}`:""}</span
      >
    </span>`}function oe(fe,Y){return pv.includes(Y)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${fe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function se(fe,Y,Ae){let Oe=Y.status==="ok",S=typeof Y.ageSeconds=="number"&&Y.ageSeconds>Il,ae=i.get(Df(fe.key,Y.number)),Se=r.get(fe.key),me=Se!==void 0,we=Se===Y.number,ye=["usage-meter__account"];return Y.active&&ye.push("usage-meter__account--active"),Oe||ye.push("usage-meter__account--unavailable"),S&&ye.push("usage-meter__account--stale"),c`<div class=${ye.join(" ")}>
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
              >${_v(Y.ageSeconds)}</span
            >`}
        ${Y.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${me}
              @click=${()=>{J(fe,Y.number)}}
            >
              ${we?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Oe?c`<div class="usage-meter__account-windows">
            ${Y.windows.map(Le=>Q(Le,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${oe(fe,Y.status)}
          </div>`}
      ${ae===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function q(fe,Y,Ae){let Oe=Y.accounts.filter(S=>S.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${fe.label} · 활성 ${Oe} / 전체
        ${Y.accounts.length}
      </h2>
      ${Y.accounts.map(S=>se(fe,S,Ae))}
    </section>`}function X(fe,Y){return c`<div
      class="usage-meter__card"
      id=${Tf}
      role="dialog"
      aria-label=${`${fe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(fe.provider,fe.snapshot,Y)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ne(){let fe=Date.now(),Y=[];for(let Oe of If){let S=s.get(Oe.key);S&&Y.push({provider:Oe,snapshot:hv(S,fe)})}if(Y.length===0){b(),u();return}let Ae=Y.find(Oe=>Oe.provider.key===n&&Oe.snapshot.accounts.length>0);Ae||b(),rt(W(Y,fe),e),e.hidden=!1,Ae?ie(Ae,fe):m()}function ie(fe,Y){let Ae=d(),Oe=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${Oe.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Oe.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ce}
        ></div>
        ${X(fe,Y)}`,Ae)}async function Pe(fe){try{let Y=await fetch(fe.endpoint);return Y.ok?bv(await Y.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function He(){a+=1;let fe=a,Y=await Promise.all(If.map(async Ae=>({provider:Ae,read:await Pe(Ae)})));if(!(t||fe!==a)){for(let Ae of Y){let Oe=Ae.provider.key;if(Ae.read.kind==="ok"){s.set(Oe,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){s.delete(Oe);continue}let S=s.get(Oe);S!==void 0&&!S.held&&s.set(Oe,{...S,held:!0})}ne()}}return u(),He(),o=setInterval(()=>{He()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),b(),u()}}}function qf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let o of t)o&&(o.kind??"implementation")==="implementation"&&n.set(o.bead_id,o.attempt_id);let r=new Map;for(let o of e.done||[])o&&typeof o.bead_id=="string"&&typeof o.added_at=="number"&&r.set(o.bead_id,o.added_at);return o=>{let s=n.get(o.bead_id)!==o.attempt_id,i=r.get(o.bead_id),a=typeof i=="number"&&i>0&&typeof o.finished_at=="number"&&i>=o.finished_at;return!s&&!a&&typeof o.dismissed_at!="number"}}var yv="worker-ineligible";function cs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ff(e){return cs(e).includes(yv)}var vv="session-preferred",wv=["exclusive_machine","iterative_user_judgment","visual_verification"];function jf(e,t){if(!cs(e).includes(vv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&wv.includes(n)?n:""}var kv="worker-serial";function Dl(e){return cs(e).includes(kv)}var Wf="bdui.worker.candidate_sort",us=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Gi=Object.freeze({preset:"spec"}),zf=3,Hf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Bf(e){return us.some(t=>t.id===e)}function Uf(e){let t=us.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function $v(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ds(e){return e&&"preset"in e?Uf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Uf("spec")}function Pl(e){return e&&"preset"in e?e.preset:null}function ps(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Bf(e)?{preset:e}:Gi}return ps(s)}if(!e||typeof e!="object")return Gi;let t=e;if(Bf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>zf||!n.every(ma))return Gi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=us.find(s=>$v(s.chain,r));return o?{preset:o.id}:{chain:r}}function Gf(){try{return ps(window.localStorage.getItem(Wf))}catch{return Gi}}function Ml(e){try{window.localStorage.setItem(Wf,JSON.stringify(e))}catch{}}function Kf(e,t,n){let r=e.map(l=>({...l}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ls,n))return r;let o=n;if(r.slice(0,t).some(l=>l.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ls[o]},i=r.slice(0,t),a=r.slice(t+1).filter(l=>l.key!==o);return[...i,s,...a].slice(0,zf)}function Vf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Yf(e,t,n){let r=Array.isArray(e)?e.slice():[];return r.sort(Zc(ds(t))),!n||n.size===0?r:[...r.filter(o=>!n.has(o.id)),...r.filter(o=>n.has(o.id))]}var Xf=new Set(["sh","bash","zsh","dash","ksh"]),Zf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Qf(e){let t=e.split("/");return t[t.length-1]||""}function xv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Qf(n[0]);if(r!=="env")return Xf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Xf.has(Qf(o))}function Av(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Sv(e){let t=[],n=0;Zf.lastIndex=0;for(let r of e.matchAll(Zf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Av(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ev(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Jf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",a="",l=0,u=null,d=!1;function m(O,W){return W?Sv(O).map(Q=>Q.kind==="plain"?Q.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${Q.kind}"
            >${Q.text}</span
          >`):O}function y(){if(!o)return c``;let O=s==="ready"&&xv(i),W=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>J()}
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
              @click=${()=>J()}
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
                  ${a}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${W.map((Q,oe)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${oe+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(Q,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){rt(y(),r)}async function k(){if(s!=="ready")return;let O=await Sn(i);de(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function P(O){O.key==="Escape"&&o&&(O.preventDefault(),J())}function F(){d||(document.addEventListener("keydown",P),d=!0)}function V(){d&&(document.removeEventListener("keydown",P),d=!1)}async function ce(O,W=null){let Q=++l;F(),o={...O},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let se=t?t():"";if(!se){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){s="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(se)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let X=await n(q),ne=await X.json().catch(()=>({}));if(Q!==l)return;if((t?t():"")!==se){J();return}if(!X.ok||!ne||ne.ok!==!0){s="error",a=Ev(ne&&typeof ne.error=="string"?ne.error:""),b();return}o={lane:ne.lane,base_sha:ne.base_sha,path:ne.path,base_ref:ne.base_ref},i=String(ne.content),s="ready",b()}catch{if(Q!==l)return;s="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function J(){l+=1,V(),o=null,i="",b();let O=u;u=null,O?.isConnected&&O.focus()}function B(){J(),r.remove()}return{open:ce,close:J,destroy:B}}var e_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Tv=new Set(["queued","running","retry_pending"]);function t_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let q=s();return typeof q.revision=="number"?q.revision:0}function a(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function l(){let q=s().workspace_info;return q&&typeof q=="object"?q:{}}function u(q,X){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${X}</span
    >`}function d(q){if(typeof q!="number"||!Number.isFinite(q))return"";let X=q/6e4;return Number.isInteger(X)?`timeout ${X}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function m(q){let X=d(q);return X?u("config",X):""}function y(q,X,ne){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ne.script}
      @click=${ie=>{o&&o({lane:q,base_sha:X.base_sha,path:ne.script,base_ref:X.base_ref},ie.currentTarget)}}
    ></button>`}function b(){let q=s().repo_operations;return Array.isArray(q)?q:[]}function k(){let q=l().repo_ops,X=q&&typeof q=="object"?q.repo_id:null;return typeof X=="string"&&X?X:null}function P(){return b().some(q=>q&&q.kind==="deploy"&&Tv.has(q.state))}function F(){let q=P(),X=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||X}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":X?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{W()}}
    >
      배포 실행
    </button>`}function V(){let q=s().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function ce(q,X){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!X}
        @change=${ne=>{O(q,!ne.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function J(q){let X=typeof q.base_sha=="string"?q.base_sha:"",ne=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${X?`@${X.slice(0,7)}`:""}`,ie=V(),Pe=!!q.verify&&ie.verify,He=!!q.deploy&&ie.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ne}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${q.verify?c`${y("verify",q,q.verify)}
              ${m(q.verify.timeout_ms)}
              ${Pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?ce("verify",ie.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${He?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${y("deploy",q,q.deploy)}
              ${m(q.deploy.timeout_ms)}
              ${He?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):F()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${He?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?ce("deploy",ie.deploy):""}
      </div>
    </section>`}function B(q){let X=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return X&&(X.status==="resolved"||X.status==="absent")?J(X):X&&(X.status==="pending"||X.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${X.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${X.error_code?c` — <code>${X.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(q,X){if(!n)return;let ne=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:X,expected_revision:i()});if(a(ne),ne&&ne.conflict){let ie=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:X,expected_revision:i()});a(ie)}r()}async function W(){let q=k();if(!n||q===null)return;let X=await n("worker-repo-operation-deploy-run",{repo_id:q});if(a(X),!X||X.ok!==!0){let ne=X&&typeof X.reason=="string"?X.reason:"",ie=Object.hasOwn(e_,ne)?e_[ne]:ne||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";de(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ie}`,"error")}else de("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let Q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function oe(q,X,ne){return c`<div class="worker-repo-ops__policy-group" data-policy=${ne}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${X.map(ie=>c`<li data-token=${ie}>
              ${Q[ie]||ie}
            </li>`)}
      </ul>
    </div>`}function se(){let q=s(),X=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return X?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(X.worker_automatic||[]).length} · 금지
            ${(X.never_automatic||[]).length}</span
          >
        </summary>
        ${X.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${X.schema_version})`}
            </div>`:""}
        ${oe("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",X.worker_automatic||[],"worker-automatic")}
        ${oe("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",X.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${B(l())} ${se()}
      </details>`}}}var o_=20,Cv=5,Rv=new Set(["failed","running","queued","retry_pending"]),n_={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ov(e,t,n=o_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Lv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Rv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Iv(e,t,n={}){let r=Ov(e,t,1/0),o=n.expanded===!0?o_:Cv,s=new Set(r.slice(0,o)),i=r.filter(a=>s.has(a)||Lv(a));return{visible:i,hidden:r.length-i.length}}function r_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Dv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function s_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?ii(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function i_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Pv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Mv(e,t){let n=Kp(e,t),r=Vp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Nv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function qv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${ui(e.at)||"\u2014"}</span
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
          >${n.target_base}@${ai(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Tr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${r_(e)}"
          >${Dv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?i_(Gp(n.failure_kind,o)):""}
      ${Mv(n,Pv(t,n))}
      ${Nv(n)}
      ${s_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ai(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Fv(e){let t=e.cleanup,n=Cr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?on(e.at):""}
      >${ui(e.at)||"\u2014"}</span
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
        ${wd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${i_(lo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${s_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function jv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Fv(r):qv(r,e.repo_ops))}
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
  </section>`}function a_(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Iv(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(jv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){s();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Bv=qt("views:worker"),Uv="tab:worker:ready",Wv="tab:worker:blocked",zv="tab:worker:in-progress",Hv="tab:worker:resolved",Gv="tab:worker:closed",Ki=1,l_=5,Kv=new Set(["quick_fix","spec_backed","full_plan"]);function c_(e){return typeof e=="string"&&Kv.has(e)}var p_="beads-ui.worker.candidate-filter",Nl={show_blocked:!1,spec:"all"};function Vv(){try{let e=window.localStorage.getItem(p_);if(!e)return{...Nl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Nl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Nl}}}function Yv(e){try{window.localStorage.setItem(p_,JSON.stringify(e))}catch{}}function Xv(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),o=[],s=0,i=0;for(let a of e){let l=n(a),u=r(a);l&&u?o.push(a):!l&&u?s+=1:l&&!u&&(i+=1)}return{visible:o,hidden_blocked:s,hidden_spec:i}}var Zv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],f_="bdui.worker.done-range";function Qv(){try{let e=window.localStorage.getItem(f_);return e===null?"today":Gn(e)}catch{return"today"}}function Jv(e){try{window.localStorage.setItem(f_,e)}catch{}}function u_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function ew(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function tw(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var nw=2;function rw(e,t){let n=e?.release_info,o=(n&&typeof n=="object"&&Array.isArray(n.released_by)?n.released_by:[]).filter(l=>l&&typeof l=="object"&&typeof l.id=="string").slice().sort((l,u)=>(typeof u.closed_at=="number"?u.closed_at:0)-(typeof l.closed_at=="number"?l.closed_at:0)),s=[];for(let l of o){let u=$d(e.id,l,t);u&&s.push(u)}if(s.length===0)return null;let i=s.slice(0,nw),a=s.length-i.length;if(a>0){let l=i[i.length-1];i[i.length-1]={...l,label:`${l.label} \uC678 ${a}`}}return i}var ow="\u{1F512} blocked";function sw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function d_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function iw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function aw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function lw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function ql(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var cw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),uw=new Set(["waiting_metadata","reviewing","retrying"]);function dw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?on(n.next_at):"",a=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",a?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${a}`:""].filter(Boolean),live:!0}}default:return null}}function pw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function fw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=pw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?ls(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!cw.has(e.phase)}}function _w(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function mw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let a=[i.title||"",t].filter(Boolean);return{label:s,title:a.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=_w(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${sw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${d_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${d_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function gw(e,t,n,r,o=null,s=null,i=null,a=!1,l=null,u=!0,d=null,m=null,y=null,b={},k=!1,P=!1,F={},V=null,ce={active:!1,failure:null}){let J=!!l&&l.position>0,B=!!l?.continuation_action&&l.continuation_action.continuation===null,O=!!l&&l.active===!0,W=l&&l.failure||null,Q=aw(l?l.waiting:null),oe=n[e]||null,se=oe&&oe.gate?oe.gate:null,q=oe&&oe.pr?oe.pr:null,X=lw(l?l.resolution:null),ne=dw(y),ie=fw(y,ne),Pe=l&&l.authority||null,He=!!y&&typeof y=="object"&&uw.has(y.phase),fe=J&&!O&&(!Pe||He||Pe.source==="automatic"&&!P),Y=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":X?X.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":Q,Ae=!!se&&se.base_badge==="\uCDA9\uB3CC",Oe=!!se&&se.enabled===!0,S=Wo({bead_id:e,merge_sha:F.merge_sha,cleanup_cursor:F.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:F.repo_operations}),ae=wi(S),Se=s&&!S&&(s.queueing??null)?s.queueing:null,me=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!se&&se.tier==="merged",we=r&&r.step==="repo_operations"&&S?.failed===!0&&(S.step==="deploy"||S.step==="verify")?S.step:null,ye=a&&!!r&&!!se&&se.tier==="merged",Le=fe&&(Oe||Ae||se?.reason==="base_behind"||se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"||me||ye),Ye=se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale",bt=a&&Ae&&u===!1,ht=qn(b,e,{external:a,merge_active:O||S?.step==="merge",merge_queued:J,conflict_active:!!i,cleanup_active:ae,merged:!!r||se?.tier==="merged"}),mt=!!ht.operation,T=J&&!W&&!B&&!me&&!(ie&&ie.lock_actions),ue=mw({auto_pending:T,continuation_required:B,queueing:Se,merge_step:S,conflict_badge:Y,conflict_live:X?.live===!0||i==="running",auto_resolution:ne,recovery:ie,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:m,conflicting:Ae,gate:se,receipt_check:oe&&oe.receipt_check?oe.receipt_check:null,queue_failure:W,auto_skip:d,queued:J,queue_active:O,queue_position:l?l.position:0,review_session:ce,activity:Y?null:s&&s.activity||null}),Re=ue?.live===!0&&ue.title?c`<span title=${ue.title}>${ue.label}</span>`:ue?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&S?.active!==!0?vi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...V?{dependency_chips:V}:{},external:a,pr_number:q&&typeof q.number=="number"?q.number:null,pr_url:q&&typeof q.url=="string"?q.url:"",completion_badge:ue?.live!==!0&&ue?.title?ue.label:null,completion_title:ue?.title||"",...y?.phase==="needs_human"&&typeof y.log_path=="string"&&y.log_path.length>0?{log_path:y.log_path}:{},badges:Re?[Re]:[],live_badge:ue?.live===!0?Re:null,usage:o,alert:ue?.alert===!0,merge_action:se?.tier==="merged"&&!me&&!ye?!1:!J||B||fe||Ye,cancel_action:J&&!B,cancel_enabled:!O&&!(ie&&ie.lock_actions),cancel_title:ie&&ie.lock_actions?`${ie.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ht,discard_action:ht.action,merge_step:S,discard_enabled:ht.enabled,discard_title:ht.title,merge_enabled:!S&&!Se&&!i&&!mt&&!m&&!(ie&&ie.lock_actions)&&!bt&&ce.active!==!0&&(Oe||Ae||se?.reason==="base_behind"||se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"||me||ye||Le||He&&!O),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":me||ye?we==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":we==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":Ae&&!S&&!me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":se?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":fe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:mt?ht.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ht.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ht.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Se?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":S?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${S.label}`:we?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${we==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":bt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ce.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":se?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Oe?`\uBA38\uC9C0 (${se.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:se&&se.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${se&&se.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Fl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:a,switchWorkspace:l,openDoc:u,doneRange:d,onDoneRangeChange:m}=t,y=r?Ds(r):null,b=null,k=Vv(),P=null,F=null,V={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},ce=Gf(),J=Pl(ce)===null,B=d?Gn(d):Qv(),O=new Map;function W(){let p=Fr.find(h=>h.value===B);return p?p.label:"\uC624\uB298"}let Q=Ui("beads-ui.worker.lane-collapsed"),oe=!1,se=new Set,q=new Set,X=new Set,ne=new Set,ie=new Set,Pe={},He=null,fe=0,Y=null,Ae=[];function Oe(p){return He===p?Pe:{}}async function S(){if(!n)return;let p=a?.()||"";if(He===p||Y&&Y.key===p&&Y.generation===fe)return;let h=++fe;Y={key:p,generation:h};let R=null;try{R=await Promise.resolve(n("get-session-defaults",{}))}catch(te){if(h!==fe)return;Y=null,Bv("get-session-defaults failed: %o",te),Ne();return}h===fe&&(Pe=R&&typeof R.values=="object"&&R.values!==null?{...R.values}:{},He=p,Y=null,Ne())}function ae(){He=null,fe+=1,S()}let Se=document.createElement("div");Se.className="worker-console";let me=document.createElement("div");me.className="worker-top";let we=document.createElement("div");we.className="worker-drawer-overlay",we.hidden=!0;let ye=document.createElement("div");ye.className="worker-drawer-overlay__backdrop";let Le=document.createElement("div");Le.className="worker-drawer-host";let Ye=document.createElement("div");Ye.className="worker-drawer-host",Ye.hidden=!0,we.append(ye,Le,Ye);let bt=document.createElement("div");bt.className="worker-lanes-host",Se.append(me,we,bt),e.appendChild(Se);let ht=null,mt=io(Le,{transport:n,sessionLogStore:s,onClose:()=>{ht=null,we.hidden=!0,Ne()}}),T=a_(Ye,{onClose:()=>{Ye.hidden=!0,we.hidden=!0,Ne()}}),ue=Jf({getWorkspacePath:a||(()=>"")}),Re=a&&a()||"",je=t_({queueStore:o,transport:n,onChanged:()=>Ne(),onOpenScript:(p,h)=>{ue.open(p,h)}});function Me(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ki,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(){let p=Me(),h=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,R=Array.isArray(p.serial_lanes)?p.serial_lanes:[],te=[];for(let dt of R){if(te.length>=h)break;!dt||typeof dt.id!="string"||!/^s[1-5]$/.test(dt.id)||!Array.isArray(dt.entries)||te.push({id:dt.id,label:`\uC9C1\uB82C ${dt.id.slice(1)}`,count:dt.entries.length})}return te.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...te]}function yt(p){if(!P||!p.some(R=>R.id===P))return null;let h=et();return h?{bead_id:P,lanes:h}:null}function Ke(){let p=Me();return typeof p.revision=="number"?p.revision:0}function z(p){p&&p.queue&&o&&o.set(p.queue)}function ee(){let p=Me().queue;return Array.isArray(p)?p.length:0}async function Ie(p,h,R){if(!n)return;let te=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},...R===void 0?{}:{index:R},expected_revision:Ke()}),be=await n("worker-queue-place",te());z(be),be&&be.conflict&&await n("worker-queue-place",te()).then(z)}async function lt(p,h,R){if(!n)return;let te=()=>({bead_id:p,...h==="parallel"?{}:{lane:h},to_index:R,expected_revision:Ke()}),be=await n("worker-queue-reorder",te());z(be),be&&be.conflict&&await n("worker-queue-reorder",te()).then(z)}async function it(p){if(!n)return;let h=await n("worker-queue-remove",{bead_id:p,expected_revision:Ke()});z(h),h&&h.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Ke()}).then(z)}async function De(p){if(!n||!p)return;let h=await n("worker-attempt-pause",{attempt_id:p});h&&h.paused===!1&&h.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Ue(p){if(!n||!p)return;let h=await Vr();if(h===null)return;let R=async(be={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Ke(),...h!==""?{instructions:h}:{},...be}),te=await R();z(te),te&&te.conflict&&(te=await R(),z(te)),te=await er(te,(be,dt)=>R({continuation:be,decision_token:dt}),{onResult:z,refresh:()=>R()}),te&&te.resumed===!1&&!te.conflict&&te.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${te.reason}`,"error",2400)}async function ct(p){if(!n||!p)return;let h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ke()});z(h),h&&h.conflict&&(h=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ke()}),z(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function tt(p,h,R=!0){if(!n)return null;let te=n,be=await te(p,{...h,expected_revision:Ke()});return z(be),be&&be.conflict&&R&&(be=await te(p,{...h,expected_revision:Ke()}),z(be)),be}async function ft(p){if(!n||!p)return;let h=Me().merge_queue?.find(te=>te.bead_id===p)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ft(p,h.mismatch);return}se.add(p),Ne();let R;try{R=await tt("worker-merge-queue-add",{bead_id:p})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{se.delete(p),Ne()}if(!(!R||R.applied)){if(R.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(iw(R.reason),"error",2400)}}async function Pt(p){if(!(!n||!p||q.has(p))){q.add(p),Ne();try{let h=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Ke()});z(h),h&&!h.retried&&!h.conflict&&h.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{q.delete(p),Ne()}}}async function Ft(p,h){let R=await er({continuation_mismatch:h},(be,dt)=>tt("worker-merge-queue-add",{bead_id:p,continuation:be,decision_token:dt},!1)),te=R?.queue?.merge_queue?.find(be=>be.bead_id===p)?.continuation_action;if(R?.applied!==!0&&te?.continuation===null&&te.mismatch){await Ft(p,te.mismatch);return}R&&R.applied===!1&&!R.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ht(p){if(!n)return;let h=await tt("worker-merge-auto-toggle",{on:p});!h||h.conflict||de(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Mt(p){if(!n||!p)return;let h=await tt("worker-merge-queue-remove",{bead_id:p});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Nt(){await tt("worker-merge-queue-remove",{all:!0})}async function kt(p,h=null,R="unmerged",te=null){if(!n||!p)return;let be=jo(p,R);if(!(!!te||typeof globalThis.confirm!="function"||globalThis.confirm(be)))return;let ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...te?{operation_id:te}:{},expected_revision:Ke()});if(z(ut),ut&&ut.conflict&&(ut=await n("worker-discard",{bead_id:p,...h?{attempt_id:h}:{},...te?{operation_id:te}:{},expected_revision:Ke()}),z(ut)),ut&&ut.discarded===!0){de(di(ut),"success",5e3);return}if(ut&&ut.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${ut.reason}`,"error",2800);return}if(ut&&ut.accepted&&ut.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ut&&ut.accepted&&!ut.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${ut.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ut&&!ut.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(p,h,R){if(!(!n||!h||!R||ne.has(h))){ne.add(h),Ne();try{let te=await n(p,{bead_id:h,action_id:R,expected_revision:Ke()});z(te),te?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!te?.ok&&te?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(te.reason)}`,"error",2800)}finally{ne.delete(h),Ne()}}}async function L(p,h){if(!n||!h||X.has(h))return;X.add(h),Ne();let R;try{let te=async(be={})=>await n(p,{bead_id:h,expected_revision:Ke(),...be});R=await te(),z(R),R&&R.conflict&&(R=await n(p,{bead_id:h,expected_revision:Ke()}),z(R)),p==="worker-revise-fix"&&(R=await er(R,(be,dt)=>te({continuation:be,decision_token:dt}),{onResult:z,refresh:()=>te()}))}finally{X.delete(h),Ne()}if(!(!R||R.conflict)){if(R.ok){de(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Z(p){if(!n)return;let h=await n("worker-automation-toggle",{on:p,expected_revision:Ke()});z(h),h&&h.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Ke()}).then(z)}async function ge(p){if(!n||!p)return;let h=await n("worker-repo-operation-dismiss",{operation_id:p});z(h),h&&h.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function E(p){if(!n||!Number.isFinite(p))return;let h=Math.max(Ki,Math.floor(p)),R=await n("worker-queue-set-slots",{slots:h,expected_revision:Ke()});z(R),R&&R.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Ke()}).then(z)}async function G(p){if(!n||!Number.isInteger(p)||p<1||p>l_)return;let h=Me(),R=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(p).reduce((dt,ut)=>dt+(Array.isArray(ut?.entries)?ut.entries.length:0),0),te=()=>({count:p,expected_revision:Ke()}),be=await n("worker-queue-set-serial-lane-count",te());z(be),be&&be.conflict&&(be=await n("worker-queue-set-serial-lane-count",te()),z(be)),be&&be.applied&&R>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${R}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Ce="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function ze(p,h){let R=El(p,h.id,V);return{id:h.id,title:h.title,location_label:h.location_label,prefixes:h.prefixes,action:R.kind==="note"?{kind:"note",text:R.text}:R.kind==="disabled"?{kind:"disabled",label:Ce,title:R.title}:{kind:"place",label:Ce,title:R.title}}}function $e(p,h){if(!F||F.bead_id!==p)return null;let R=F.counterpart_id,te=h.filter(be=>be.id===R);return te.length===0?null:{rows:te.map(be=>ze(p,be))}}async function at(p,h){let R=El(p,h,V);if(F=null,R.kind!=="ops"){Ne();return}let te=Ke();for(let be of R.ops){let dt=await ot(be,te);if(dt===null)break;te=dt}Ne()}async function ot(p,h){if(!n)return null;try{let R=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:h});if(z(R),R&&R.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!R||R.applied!==!0)return de(R&&typeof R.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${R.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let te=R.queue?R.queue.revision:void 0;return typeof te!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):te}catch(R){return de(R instanceof Error&&R.message?R.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function he(){let p=Me(),h=y?y.selectBoardColumn(Uv,"ready"):[],R=y?y.selectBoardColumn(Wv,"blocked"):[],te=y?y.selectBoardColumn(Gv,"closed"):[],be=y?y.selectBoardColumn(zv,"in_progress"):[],dt=y?y.selectBoardColumn(Hv,"resolved"):[],ut=Ms([...h,...R,...be,...dt,...te]),Vt=new Map;for(let _ of[...h,...R,...be])_&&_.id&&!Vt.has(_.id)&&Vt.set(_.id,_);let Ut={...Oe(a?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let D=p[_];typeof D=="string"&&(Ut[_]=D)}function Gt(_,D){let le=Vt.get(_);if(!le)return null;let Be=le.metadata&&typeof le.metadata=="object"?le.metadata:{},Qe=le.workflow?.route,Xt=Be.route,Lt=c_(Qe)?Qe:c_(Xt)?Xt:null;return $n({pin:Be,global:Ut,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Lt,controller_runtime:D})}function Rn(_){let D=_.runner||null,le=Gt(_.bead_id,D),Be=qo(_),Qe=le?_r(le,D):null;return Be||Qe?{orchestration:Be,worker:Qe}:null}let bn=new Map;function Yt(_){if(bn.has(_))return bn.get(_)??null;let D=Gt(_,null),le=null;if(D){let Be=Nn(p.runner_catalog??null,D.orchestration_model.value??""),Qe=Be===null?D:Gt(_,Be),Xt=Er(Qe,p.runner_catalog??null),Lt=_r(Qe,Be);le=Xt||Lt?{orchestration:Xt,worker:Lt}:null}return bn.set(_,le),le}let An=new Map;function hn(_){if(An.has(_))return An.get(_)??null;let D=Vt.get(_),le=D&&D.metadata&&typeof D.metadata=="object"?D.metadata:null,Be=le?to(le):null;return An.set(_,Be),Be}function ar(_){let D=Ns(ut,_);return D.total===0?null:D}let Xn=p.bead_titles||{},f=new Map;for(let[_,D]of Object.entries(Xn))typeof D=="string"&&D.length>0&&f.set(_,D);for(let _ of[...h,...R])f.set(_.id,_.title||_.id);let g=new Map;for(let _ of[...h,...R,...be,...dt,...te])_&&_.id&&typeof _.from_id=="string"&&g.set(_.id,_.from_id);let w=new Map;for(let _ of[...h,...R,...be,...dt,...te])_&&_.id&&typeof _.priority=="number"&&w.set(_.id,_.priority);let $=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},N=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},H=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},re=new Map;for(let[_,D]of Object.entries(N))Array.isArray(D)&&re.set(_,Dl(D));for(let _ of[...h,...R]){let D=_.labels;Array.isArray(D)&&!re.has(_.id)&&re.set(_.id,Dl(D))}let Ee=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Ve=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},nt=new Map;for(let[_,D]of Object.entries($))D&&typeof D=="object"&&nt.set(_,D);for(let _ of[...h,...R])nt.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let Fe=_=>nt.get(_)||{},v=p.pr_wait||[],K=p.pr_observations||{},I=p.pr_activity||{},U=p.cleanup_failed||{},xe=Object.entries(U).map(([_,D])=>({bead_id:_,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0})),qe=p.queue||[],vt=new Set([...qe.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(D=>D.bead_id)),...v.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),Ge=new Set(R.map(_=>_.id)),pt=new Set,yn=[];for(let _ of[...h,...R])vt.has(_.id)||pt.has(_.id)||ew(_)||(pt.add(_.id),yn.push(_));let A_=Yf(yn,ce,Ge),S_=p.admission||{},Wl=_=>{let D=S_[_];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof D.reason=="string"?D.reason:"",Be=le.indexOf(":");return Be>0&&Be<le.length-1?`\u26D4 ${le.slice(0,Be)} (${le.slice(Be+1)})`:`\u26D4 ${le}`},zl=new Map,E_=Date.now(),T_=A_.map(_=>{let D=Wr(_),le=D.evidence==="published",Be=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",Qe=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,Xt=Object.hasOwn(_,"labels")&&Ff(_.labels),Lt=Xt||!Object.hasOwn(_,"labels")?"":jf(_.labels,_.metadata),Mr=Lt.length>0,Ct=!Xt&&(Be?Qe:le&&!D.conflict),ws=Ge.has(_.id),Zn=[];if(ws){let ks=tw(_);ks.length>0?zl.set(_.id,ks):Zn.push(ow)}Be&&!Qe?Zn.push("missing_description"):!Be&&D.conflict?Zn.push("spec_id_conflict"):!Be&&D.evidence==="none"?Zn.push("spec \uC5C6\uC74C"):!Be&&D.evidence==="draft"&&Zn.push("spec \uBBF8\uBC1C\uD589(draft)");let Nr=Wl(_.id);Nr&&Zn.push(Nr);let po=rw(_,E_),fo=_.dependents_info&&typeof _.dependents_info=="object"?xd(_.dependents_info):null;return{id:_.id,title:_.title||_.id,reason:Zn.join(" \xB7 "),draggable:!1,queue_placeable:Ct,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:Be,status:_.status,worker_ineligible:Xt,session_preferred:Mr,session_preferred_reason:Lt,blocked:ws,has_spec:le,exec_chips:Yt(_.id),rec:hn(_.id),from_id:_.from_id||void 0,priority:w.get(_.id),...po||fo?{dependency_chips:{...po?{released:po}:{},...fo?{dependents:fo}:{}}}:{}}}),Vi=Xv(T_,k),Yi=Vi.visible,C_=p.revise_parked||{},fs=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},R_=_=>{let D=H[_]?.chips?.pr;return D&&typeof D.number=="number"&&typeof D.url=="string"?{pr_number:D.number,pr_url:D.url}:{}},Xi=(_,D)=>_.map((le,Be)=>{let Qe=D!=="done",Xt=D!=="done"&&D!=="queue",Lt=Qe?C_[le.bead_id]:null,Mr=Qe?qn(fs,le.bead_id):null,Ct=Mr?.operation?Mr:null,ws=Qe&&re.get(le.bead_id)===!0,Zn=p.admission&&typeof p.admission=="object"?p.admission[le.bead_id]:null,Nr=Qe?bd(Zn,!!Ct||ne.has(le.bead_id)):null,po=Qe&&!Nr?Wl(le.bead_id):null,fo=Qe?[po]:[],ks=[];return{id:le.bead_id,title:f.get(le.bead_id)||le.bead_id,reason:fo.filter(Boolean).join(" \xB7 "),draggable:Qe&&!Ct&&!Nr,done:D==="done",lane:D,seq:Xt?Be+1:void 0,worker_serial:ws,discard:Ct,stale_work:Nr,badges:[...ks,...Lt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...D==="done"?li(p.attempts||{},le.bead_id):[]],alert:!!Lt,revise_action:!!Lt,revise_enabled:!!Lt&&!Ct&&!X.has(le.bead_id),revise_title:Lt?Lt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Lt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Ln(p.attempts||{},le.bead_id):null,work_ms:D==="done"?ci(p.attempts||{},le.bead_id):null,done_at:D==="done"&&typeof le.added_at=="number"?le.added_at:void 0,exec_chips:Qe?Yt(le.bead_id):null,rec:hn(le.bead_id),workflow:Qe&&H[le.bead_id]||null,...D==="done"?R_(le.bead_id):{},from_id:g.get(le.bead_id)||void 0,priority:w.get(le.bead_id),...Fe(le.bead_id)}}),Ir=p.attempts?Object.values(p.attempts).filter(Sr):[],Zi=new Set;for(let _ of Ir)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Zi.add(_.resumed_from);let Hl=new Map;for(let _ of Ir)Hl.set(_.bead_id,_.attempt_id);let co=new Map;for(let _ of Ir)co.set(_.attempt_id,_);function Qi(_){let D=new Set,le=_;for(;le&&!D.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;D.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&co.get(le.resumed_from)||null}return!1}let _s=typeof p.declared_base=="string"?p.declared_base:null;function O_(_){let D=null;for(let le of Ir)!le||le.bead_id!==_||Qi(le)||(D===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=le);return D&&typeof D.target_base=="string"?D.target_base:null}let Ji=[],ms=[],L_=qf(p),Gl=_=>{let D=typeof _.session_id=="string"&&_.session_id.length>0,le=Zi.has(_.attempt_id);return{eligible:D&&!le,reason:D?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dn=null;for(let _ of Ir){let D=_.status==="paused"&&!Zi.has(_.attempt_id);if(_.status==="running"||D)ms.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:D,conflict_resolution:Qi(_),base_exception:ql(_s,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:qn(fs,_.bead_id,{attempt_id:_.attempt_id}),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:Ln(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:ie.has(_.bead_id),exec_chips:Rn(_),rec:hn(_.bead_id),...Fe(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&L_(_)){let le=Gl(_);Ji.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:f.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:qn(fs,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:Qi(_),base_exception:ql(_s,_.target_base),workflow:H[_.bead_id]||null,priority:w.get(_.bead_id),usage:Ln(p.attempts||{},_.bead_id),rollup:ar(_.bead_id),rollup_expanded:ie.has(_.bead_id),exec_chips:Rn(_),rec:hn(_.bead_id),...Fe(_.bead_id)}),Dn=_}}let Kl=new Set([...Ji,...ms].map(_=>_.bead_id)),Vl=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let D=_&&_.bead_id;if(!(typeof D!="string"||D.length===0||Kl.has(D))){if(Kl.add(D),Array.isArray(_.blocked_by)){let le=_.blocked_by.filter(Be=>typeof Be=="string"&&Be.length>0);le.length>0&&Vl.set(D,le)}ms.push({bead_id:D,attempt_id:null,kind:"session",title:_.title||f.get(D)||D,status:"in_progress",started_at:Mn(_.started_at)??Mn(_.updated_at),updated_at:Mn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:w.get(D),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:hn(D),usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...Ji,...ms].map(_=>{let D=co.get(_.attempt_id),le=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!le||typeof le!="object")return _;let Be=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,Qe=Wo({bead_id:D.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Be?{step:le.cursor,reason:Be}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Qe?{..._,landing:Qe}:_}),Yl=null;if(Dn){let _=Gl(Dn),D=Dn.cause_detail;Yl={bead_id:Dn.bead_id,repo:Dn.repo||"",reason:Dn.cause||Dn.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Dn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:qn(fs,Dn.bead_id,{attempt_id:Dn.attempt_id})}}let Xl=new Set(Dr.map(_=>_.bead_id)),ea=Array.isArray(p.merge_queue)?p.merge_queue:[],Zl=new Map,Ql=new Map,Jl=new Map,ec=new Map;ea.forEach((_,D)=>{_&&typeof _.bead_id=="string"&&(Zl.set(_.bead_id,D+1),Ql.set(_.bead_id,_.resolution),Jl.set(_.bead_id,_.continuation_action||null),ec.set(_.bead_id,_.authority||null))});let Pr=p.merge_queue_state||{active:null,failures:{}},I_=Pr.failures||{},tc=Pr.waiting&&typeof Pr.waiting.bead_id=="string"&&typeof Pr.waiting.reason=="string"?Pr.waiting:null,D_=p.auto_merge_skips||{},nc=_=>{let D=D_[_];if(!D)return null;let le=K[_],Be=le&&le.pr?le.pr.head_sha:null;return Be&&Be===D.head_sha?D.reason||"":null},gs=new Map;for(let _ of Dr)_.failed!==!0&&_.conflict_resolution&&(_.paused?gs.has(_.bead_id)||gs.set(_.bead_id,"paused"):gs.set(_.bead_id,"running"));let rc=Dr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,oc=(p.workspace_info||{}).slots,sc=typeof oc=="number"?oc:typeof p.slots=="number"?p.slots:Ki,P_=rc>sc,bs=$r(B),M_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>bs===void 0||typeof _.added_at!="number"||_.added_at>=bs).sort((_,D)=>(D.added_at||0)-(_.added_at||0)),uo=Xi(M_,"done"),N_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),ic=[],q_=a?.()||"";for(let _ of te){let D=Mn(_.closed_at);if(typeof _.id!="string"||N_.has(_.id)||D===null||bs!==void 0&&D<bs||typeof _.comment_count!="number"||_.comment_count<=0)continue;let le=`${q_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,Be=O.get(le);if(Be===void 0&&n&&(O.set(le,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(Qe=>{let Xt=Array.isArray(Qe)&&Qe.some(Lt=>Pi(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");O.set(le,Xt?"session":"not-session"),Ne()}).catch(()=>{O.set(le,"failed"),Ne()})),Be==="session"){let Qe=Mn(_.started_at);ic.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Qe!==null&&D>=Qe?D-Qe:null,work_kind:"session",done_at:D,created_at:_.created_at,updated_at:_.updated_at})}}uo.push(...ic),uo.sort((_,D)=>(D.done_at||0)-(_.done_at||0));let hs={};for(let _ of Vn)hs[_]=0;let ac=!1,lc=0,ta=0,cc=0;for(let _ of uo){let D=_.usage;if(D&&typeof D=="object"){let le=!1;for(let Be of Vn)Number.isFinite(D[Be])&&(hs[Be]+=D[Be],ac=!0,le=!0);le&&(ta+=1,Number.isFinite(D.total_cost_usd)&&(lc+=D.total_cost_usd,cc+=1))}}ta>0&&cc===ta&&(hs.total_cost_usd=lc);let uc=uo.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),F_=uc.length>0?an(Gs(uc)):ac?tr(hs):null,dc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},pc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],fc=_=>{if(v.some(Be=>Be.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Ir.filter(Be=>Be&&Be.bead_id===_),le=D.length>0?D[D.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ys=pc.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,D)=>{let le=dc[_.id]||{},Be=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(Ct=>Ct&&typeof Ct.bead_id=="string"&&typeof Ct.after=="string").map(Ct=>[Ct.bead_id,Ct.after])),Qe=Array.isArray(le.occupied_by)?le.occupied_by.filter(Ct=>typeof Ct=="string"):[],Xt=new Set(Qe),Lt=Xi(_.entries.filter(Ct=>!Xl.has(Ct.bead_id)&&!Xt.has(Ct.bead_id)),_.id).map(Ct=>Be.has(Ct.id)?{...Ct,badges:[`\u{1F517} ${Be.get(Ct.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Ct.badges]}:Ct),Mr=Qe.map(Ct=>({id:Ct,title:f.get(Ct)||Ct,draggable:!1,lane:_.id,ghost:!0,badges:[fc(Ct)]}));return{id:_.id,index:D+1,rows:[...Mr,...Lt],occupied:Qe.length>0,badge:Qe.length>0?fc(Qe[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),_c=typeof p.serial_lane_count=="number"?p.serial_lane_count:ys.length,na=Xi(qe.filter(_=>!Xl.has(_.bead_id)),"queue"),mc=new Map,gc=new Set;for(let[_,D]of Object.entries(dc)){if(!/^s[1-5]$/.test(_))continue;let le=D&&Array.isArray(D.occupied_by)?D.occupied_by:[];for(let Be of le)typeof Be=="string"&&mc.set(Be,_);le.length>0&&gc.add(_)}let lr=[];for(let _ of Dr)typeof _.bead_id=="string"&&lr.push({id:_.bead_id,title:f.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:mc.get(_.bead_id)??null});for(let _ of v){let D=_&&_.bead_id;typeof D!="string"||D.length===0||lr.push({id:D,title:f.get(D)||D,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of ys)for(let D of _.rows)D.ghost!==!0&&lr.push({id:D.id,title:D.title,location_label:`${_.id} #${D.seq??""}`.trim(),kind:"serial",lane_id:_.id});na.forEach((_,D)=>{lr.push({id:_.id,title:_.title,location_label:`#${D+1}`,kind:"parallel",lane_id:null})});for(let _ of Yi)lr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:_.queue_placeable===!0});let bc={};for(let _ of pc)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(bc[_.id]=_.entries.length);let ra=new Map;for(let _ of lr)ra.has(_.id)||ra.set(_.id,_);V={members_by_id:ra,serial_raw_lengths:bc,serial_lane_count:_c,occupied_lanes:gc};let j_=Wp(p.bead_scope,lr),vs=new Map;for(let[_,D]of Vl)vs.set(_,D);for(let[_,D]of zl)vs.set(_,D);for(let[_,D]of Object.entries(Ee))Array.isArray(D)&&vs.set(_,D.filter(le=>typeof le=="string"&&le.length>0));let B_=Ad(vs,lr,Ve),oa=(_,D=null)=>{let le=j_.get(_),Be=B_.get(_)||null,Qe=le&&le.overlaps.length>0?le.overlaps:null,Xt=!!le&&le.scope_missing;if(!Be&&!Qe&&!Xt)return D;let Lt=Qe?$e(_,Qe):null;return{...D||{},...Be?{predecessors:Be}:{},...Qe?{overlaps:Qe}:{},...Xt?{scope_missing:!0}:{},...Lt?{popover:Lt}:{}}},sa=_=>{let D=oa(_.id,_.dependency_chips||null);return D&&(_.dependency_chips=D),_};for(let _ of na)sa(_);for(let _ of ys)for(let D of _.rows)D.ghost!==!0&&sa(D);for(let _ of Yi)sa(_);let hc=new Map;for(let _ of Dr){let D=typeof _.bead_id=="string"?_.bead_id:"";if(D.length===0)continue;let le=_.kind==="session",Be=oa(D),Qe=typeof _.attempt_id=="string"&&_.attempt_id.length>0?co.get(_.attempt_id):void 0,Xt=Qe&&Qe.last_activity&&typeof Qe.last_activity=="object"?Qe.last_activity:null,Lt=Qe&&Array.isArray(Qe.legs)?Qe.legs:[];!Be&&!Xt&&Lt.length===0&&!le||hc.set(D,{...Xt?{last_activity:Xt}:{},...Lt.length>0?{legs:Lt}:{},...Be?{dependency_chips:Be}:{}})}let U_=v.map(_=>gw(_.bead_id,f.get(_.bead_id)||_.bead_id,K,U[_.bead_id]||null,Ln(p.attempts||{},_.bead_id),I[_.bead_id]||(se.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:q.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),gs.get(_.bead_id)||null,_.external===!0,{position:Zl.get(_.bead_id)||0,active:Pr.active===_.bead_id,failure:I_[_.bead_id]||null,waiting:tc?.bead_id===_.bead_id?tc.reason:null,resolution:Ql.get(_.bead_id),continuation_action:Jl.get(_.bead_id),authority:ec.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?nc(_.bead_id):null,ql(_s,O_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},co.get(Hl.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},oa(_.bead_id),md(p.attempts||{},_.bead_id))).map(_=>({..._,workflow:H[_.id]||null,priority:w.get(_.id),...Fe(_.id)}));return{queue:p,idToTitle:f,candidates:Yi,candidate_hidden:{blocked:Vi.hidden_blocked,spec:Vi.hidden_spec},running:Dr,live_count:rc,slots:sc,over_cap:P_,failure:Yl,waiting:na,serial_lanes:ys,serial_lane_count:_c,running_overlays:hc,pr_wait:U_,merge_queue_length:ea.length,merge_queue_running:ea.length>0,auto_excluded:v.map(_=>_.bead_id).filter(_=>nc(_)!==null),declared_base:_s,done:uo,token_total:F_,cleanup_failures:xe,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Je(p){let h=p.waiting.length>0?p.waiting[0].id:"\u2014",R=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,te=ke(p),be=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",dt=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(Yt=>Yt&&typeof Yt.armed_by_lane=="string"&&Yt.armed_by_lane.length>0).length,ut=dt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${dt}건 진행 중</span
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
          ${Array.from({length:l_},(Yt,An)=>An+1).map(Yt=>c`<option
                value=${String(Yt)}
                ?selected=${p.serial_lane_count===Yt}
              >
                ${Yt}
              </option>`)}
        </select>
      </label> `,Rn=Xp({failure:p.failure}),bn=gd(p.repo_operations,p.cleanup_failures);return oe?c`<div class="worker-ribbon">
          ${R} ${te}
          <div class="worker-kpi worker-kpi--ribbon">
            ${be}${ut}${Vt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Gt}</div>
          <div class="worker-kpi">${Ut}</div>
        </div>
        ${bn}${je.template()}${Rn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${te}${Gt}</div>
        <div class="worker-kpi">
          ${be}${ut}${Vt}${Ut}
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
        ${Zv.map(R=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${k.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${h.spec>0?c`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function j(){let p=J?"custom":Pl(ce)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${p}
    >
      ${us.map(h=>c`<option value=${h.id} ?selected=${p===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${p==="custom"}>
        사용자 지정…
      </option>
    </select>`}function ve(){let p=ds(ce);return c`<div
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
            ${Hf.map(te=>c`<option
                  value=${te.key}
                  ?selected=${!!R&&R.key===te.key}
                >
                  ${te.label}
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
      </button>`;let R=new Set(p.auto_excluded),te=p.pr_wait.filter(be=>be.merge_action&&be.merge_enabled&&!R.has(be.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${te>0?` ${te}`:""}
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
    </span>`}function st(p){return bi({parallel:{rows:p.waiting.map(h=>Fn(h,{actions:Ze(h)})),count:p.waiting.length,collapsed:Q.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(h=>({id:h.id,title:`\uC9C1\uB82C ${h.index}`,rows:h.rows.map(R=>Fn(R,{actions:Ze(R)})),count:h.rows.length,empty:h.rows.length===0,badge:h.badge,held:h.occupied,cycle:h.cycle})),collapsed:Q.isAreaCollapsed("serial")}})}function _t(p){return Zp(p.running,Date.now(),ht,p.running_overlays)}function xt(p){return p.running.some(h=>h.kind!=="session"&&!h.paused&&h.failed!==!0)}function Kt(p){let h=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:j(),header_row:J?ve():void 0,controls:M(p),collapsible:!0,collapsed:Q.isCollapsed("candidate"),place_menu:yt(p.candidates),onOpenDoc:u?(te,be)=>u(be):void 0}),R=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Xe(),collapsible:!0,collapsed:Q.isCollapsed("done"),preview:oe?Array.isArray(p.token_total)?p.token_total.map(te=>te.label).join(" \xB7 "):p.token_total||u_(p.done):void 0});return oe?c`<div class="worker-lanes worker-lanes--mobile">
        ${hi({live:xt(p),running_body:p.running.length>0?_t(p):"",pr_wait_rows:p.pr_wait.map(te=>Fn(te)),count:p.running.length+p.pr_wait.length})}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:Q.isCollapsed("queue"),preview:u_(p.waiting),body:st(p)})}
        ${h} ${R}
      </div>`:c`<div class="worker-lanes">
      ${h}
      ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:Q.isCollapsed("queue"),body:st(p)})}
      ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:xt(p),collapsible:!0,collapsed:Q.isCollapsed("running"),body:_t(p)})}
      ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:Q.isCollapsed("pr_wait")})}
      ${R}
    </div>`}function Et(p){Q.toggle(p),Ne()}function Jt(p){Q.toggleArea(p),Ne()}function Ne(){let p=he();rt(Je(p),me),rt(Kt(p),bt)}function mn(){let p=!0,h=Bi(R=>{if(oe=R,p){p=!1;return}Ne()});Ae.push(h)}let en=null;function jt(p){en=p.target instanceof Element?p.target:null}function Qt(p){let R=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;if(en&&R.contains(en)&&en.closest("input, button, a")){p.preventDefault();return}let te=R.dataset.beadId||"",be=R.dataset.lane||"";b={bead_id:te,from_lane:be},Se.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",te),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function gn(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;let R=h.dataset.lane||"";R!=="queue"&&!/^s[1-5]$/.test(R)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function _e(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function A(){Se.classList.remove("is-dragging")}function pe(p){let h=p.target?.closest?.(".worker-pane");if(!h)return;p.preventDefault(),h.classList.remove("worker-pane--drag-over"),Se.classList.remove("is-dragging");let R=h.dataset.lane||"",te=b?.bead_id||p.dataTransfer?.getData("text/plain")||"",be=b?.from_lane||"";if(b=null,!te)return;let dt=p.target?.closest?.(".worker-mini, .worker-card"),ut=R==="queue"&&h.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||h,Vt=Array.from(ut.querySelectorAll(".worker-mini, .worker-card")),Ut=Vt.length;if(dt){let Gt=Vt.indexOf(dt);Gt>=0&&(Ut=Gt)}if(Ut=Math.max(0,Ut-ut.querySelectorAll(".worker-mini--ghost").length),h.classList.contains("worker-pane--collapsed")&&(Ut=ee()),R==="queue"||/^s[1-5]$/.test(R)){let Gt=R==="queue"?"parallel":R;be===R?lt(te,Gt,Ut):Ie(te,Gt)}}function Te(p){k=p,Yv(p),Ne()}function wt(p){if(p==="custom"){J=!0,Ne();return}ce=ps(p),Ml(ce),J=!1,Ne()}function Tt(p){ce=ps({chain:p}),Ml(ce),Ne()}function At(p){B=Gn(p),Jv(B),m?.(B),Ne()}function Bt(p){let h=p.target?.closest?.(".worker-serial-lane-count");if(h){let Ut=Number.parseInt(h.value,10);Number.isFinite(Ut)&&G(Ut).then(Ne);return}let R=p.target?.closest?.(".worker-filter__blocked");if(R){Te({...k,show_blocked:R.checked});return}let te=p.target?.closest?.(".worker-sort-chain__key");if(te){let Ut=Number.parseInt(te.getAttribute("data-step")||"",10);Number.isFinite(Ut)&&Tt(Kf(ds(ce),Ut,te.value));return}let be=p.target?.closest?.(".worker-done-range");if(be){At(be.value);return}let dt=p.target?.closest?.(".worker-sort");if(dt){wt(dt.value);return}let ut=p.target?.closest?.(".worker-slots__input");if(!ut)return;let Vt=Number.parseInt(ut.value,10);if(!Number.isFinite(Vt)){Ne();return}E(Vt).then(Ne)}function nn(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function rn(){let p=he(),h=Me().workspace_info,R=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:a&&a()||"",repo_ops:R}}function Cn(){ht&&mt.close(),Ye.hidden=!1,we.hidden=!1,T.open(rn()),Ne()}function Ot(p){let h=Me(),R=h.attempts?h.attempts[p]:null;ht=p,T.close(),Ye.hidden=!0,we.hidden=!1,mt.open({attempt_id:p,meta:nn(R)}),Ne()}function sn(p){let h=Me(),R=(Array.isArray(h.session_active)?h.session_active:[]).find(be=>be&&be.bead_id===p),te=(R&&Array.isArray(R.session_refs)?R.session_refs:[]).find(be=>be&&be.current===!0);te&&(T.close(),Ye.hidden=!0,we.hidden=!1,mt.open(Yr(te,p,"in_progress")),Ne())}function cn(){if(T.isOpen()&&T.refresh(rn()),!ht)return;let p=Me(),h=p.attempts?p.attempts[ht]:null;if(h){mt.updateMeta(nn(h));return}mt.close()}function un(p,h){if(p.length===0||!i)return;let R=a?a():void 0;if(h.length===0||!R||h===R||!l){i(p);return}Promise.resolve(l(h)).then(()=>{i(p)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function Hn(p){let h=p.target;if(h?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let R=h?.closest?.(".worker-sort-chain__dir");if(R){let U=Number.parseInt(R.getAttribute("data-step")||"",10);Number.isFinite(U)&&Tt(Vf(ds(ce),U));return}let te=h?.closest?.(".worker-dep__open");if(te){un(te.getAttribute("data-dep-id")||"",te.getAttribute("data-root-dir")||"");return}let be=h?.closest?.(".mon-overlap__chip");if(be){let U=be.closest("[data-bead-id]"),xe=U&&U.getAttribute("data-bead-id")||"";if(xe){let qe=be.getAttribute("data-overlap-id")||"";F=!!F&&F.bead_id===xe&&F.counterpart_id===qe?null:{bead_id:xe,counterpart_id:qe},Ne()}return}let dt=h?.closest?.(".mon-overlap__place");if(dt){let U=dt.closest("[data-bead-id]"),xe=U&&U.getAttribute("data-bead-id")||"";xe&&at(xe,dt.getAttribute("data-counterpart-id")||"");return}if(h?.closest?.(".mon-overlap__popover"))return;if(h?.closest?.(".worker-repo-strip")){Cn();return}let ut=h?.closest?.(".worker-repo-op__dismiss");if(ut){ge(ut.dataset.operationId||"");return}let Vt=h?.closest?.(".worker-cleanup__resume");if(Vt){let U=Vt.dataset.beadId;U&&Pt(U);return}let Ut=h?.closest?.(".worker-banner__resume");if(Ut){let U=Ut.dataset.attemptId;U&&Ue(U);return}let Gt=h?.closest?.(".worker-banner__discard");if(Gt){let U=Gt.dataset.confirmation==="merged"?"merged":"unmerged";kt(Gt.dataset.beadId||"",Gt.dataset.attemptId||null,U,Gt.dataset.operationId||null);return}let Rn=h?.closest?.(".worker-banner__dismiss");if(Rn){let U=Rn.dataset.attemptId;U&&ct(U);return}if(h?.closest?.(".worker-play")){Z(!Me().auto_advance);return}let bn=h?.closest?.(".worker-merge-all");if(bn){bn.classList.contains("worker-merge-all--stop")?Me().auto_merge===!0?Ht(!1):Nt():Ht(!0);return}let Yt=h?.closest?.(".worker-pane__toggle[data-lane]");if(Yt){let U=Yt.dataset.lane;(U==="candidate"||U==="queue"||U==="running"||U==="pr_wait"||U==="done")&&Et(U);return}let An=h?.closest?.(".worker-wait__area-toggle[data-area]");if(An){let U=An.dataset.area;(U==="parallel"||U==="serial")&&Jt(U);return}let hn=h?.closest?.(".worker-card__place-lane");if(hn){let U=hn.dataset.beadId,xe=hn.dataset.lane;U&&(xe==="parallel"||/^s[1-5]$/.test(xe||""))&&(P=null,Ne(),Ie(U,xe));return}if(h?.closest?.(".worker-card__place-cancel")){P=null,Ne();return}let Xn=h?.closest?.(".worker-card__place");if(Xn){let U=Xn.dataset.beadId;U&&!Xn.disabled&&(et()?(P=U,Ne()):Ie(U,"parallel"));return}let f=h?.closest?.(".worker-filter__chip");if(f){let U=f.dataset.spec;(U==="all"||U==="with"||U==="without")&&Te({...k,spec:U});return}let g=h?.closest?.('[data-action="queue-remove"]');if(g){let U=g.dataset.beadId||"";U&&it(U);return}let w=h?.closest?.(".worker-mini__merge");if(w){let U=w.dataset.beadId||"";Me().cleanup_failed?.[U]?Pt(U):ft(U);return}let $=h?.closest?.(".worker-mini__merge-cancel");if($){Mt($.dataset.beadId||"");return}let N=h?.closest?.(".worker-mini__discard");if(N){kt(N.dataset.beadId||"",N.dataset.attemptId||null,N.dataset.discardMode==="merged"?"merged":"unmerged",N.dataset.operationId||null);return}let H=h?.closest?.(".worker-mini__stale-continue");if(H){We("worker-stale-work-continue",H.dataset.beadId||"",H.dataset.actionId||"");return}let re=h?.closest?.(".worker-mini__stale-backup");if(re){We("worker-stale-work-backup-fresh",re.dataset.beadId||"",re.dataset.actionId||"");return}let Ee=h?.closest?.(".worker-mini__stale-recheck");if(Ee){We("worker-stale-work-recheck",Ee.dataset.beadId||"",Ee.dataset.actionId||"");return}let Ve=h?.closest?.(".worker-mini__revise-fix");if(Ve){L("worker-revise-fix",Ve.dataset.beadId||"");return}let nt=h?.closest?.(".worker-mini__revise-approve");if(nt){L("worker-revise-approve",nt.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__discard")){let U=h?.closest?.(".rtile"),xe=U?.dataset?.beadId,qe=U?.dataset?.attemptId;xe&&kt(xe,qe||null,"unmerged",h?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(h?.closest?.(".rtile__dismiss")){let xe=h?.closest?.(".rtile")?.dataset?.attemptId;xe&&ct(xe);return}if(h?.closest?.(".rtile__pause")){let xe=h?.closest?.(".rtile")?.dataset?.attemptId;xe&&De(xe);return}if(h?.closest?.(".rtile__resume")){let xe=h?.closest?.(".rtile")?.dataset?.attemptId;xe&&Ue(xe);return}if(h?.closest?.(".rtile__session")){let U=h?.closest?.(".rtile"),xe=U?.dataset?.attemptId;if(xe){Ot(xe);return}let qe=U?.dataset?.beadId;qe&&sn(qe);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){T.close(),mt.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Fe=h?.closest?.(".rtile .board-card__roll-toggle");if(Fe){let U=Fe.dataset.rollParent;U&&(ie.has(U)?ie.delete(U):ie.add(U),Ne());return}let v=h?.closest?.(".rtile .board-card__roll-child");if(v){let U=v.dataset.childId;U&&i&&i(U);return}let K=h?.closest?.(".rtile");if(K){if(h?.closest?.(".rtile__id")){let xe=K.dataset.beadId;xe&&Sn(xe).then(qe=>{qe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let U=K.dataset.beadId;U&&i&&i(U);return}let I=h?.closest?.(".worker-mini, .worker-card");if(I){let U=I.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){U&&Sn(U).then(qe=>{qe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let xe=h?.closest?.(".ctl-chip--from");if(xe){let qe=xe.dataset.fromId;qe&&i&&i(qe);return}U&&i&&i(U)}}e.addEventListener("pointerdown",jt),e.addEventListener("dragstart",Qt),e.addEventListener("dragover",gn),e.addEventListener("dragleave",_e),e.addEventListener("dragend",A),e.addEventListener("drop",pe),e.addEventListener("click",Hn),e.addEventListener("change",Bt);function x(p){if(!F)return;let h=p.target;h&&typeof h.closest=="function"&&h.closest(".mon-overlap__popover, .mon-overlap__chip")||(F=null,Ne())}function C(p){p.key!=="Escape"||!F||(F=null,Ne())}return document.addEventListener("click",x),document.addEventListener("keydown",C),Ae.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",C)}),mn(),y&&Ae.push(y.subscribe(()=>{for(let[p,h]of O)h==="failed"&&O.delete(p);Ne()})),o&&Ae.push(o.subscribe(()=>{let p=a&&a()||"";p!==Re&&(Re=p,ue.close()),Ne(),cn()})),Ne(),{load(){S(),Ne()},refreshSessionDefaults:ae,destroy(){for(let p of Ae.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",jt),e.removeEventListener("dragstart",Qt),e.removeEventListener("dragover",gn),e.removeEventListener("dragleave",_e),e.removeEventListener("dragend",A),e.removeEventListener("drop",pe),e.removeEventListener("click",Hn),e.removeEventListener("change",Bt);try{mt.destroy()}catch{}we.hidden=!0;try{ue.destroy()}catch{}rt(c``,e)}}}function jl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function __(e,t,n,r=async()=>{},o=async()=>{}){let s=qt("views:workspace-picker"),i=null,a=!1,l=!1,u=!1;async function d(W){let oe=W.target.value,q=t.getState().workspace?.current?.path||"";if(oe&&oe!==q){s("switching workspace to %s",oe),a=!0,O();try{await n(oe)}catch(X){s("workspace switch failed: %o",X)}finally{a=!1,O()}}}async function m(){let W=t.getState(),Q=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!Q||l)){s("git-pulling workspace %s",Q),l=!0,O();try{await r(Q)}catch(oe){s("workspace git pull failed: %o",oe)}finally{l=!1,O()}}}function y(W){let Q=W.target;Q&&e.contains(Q)||P()}function b(W){W.key==="Escape"&&P()}function k(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),O())}function P(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),O())}function F(){u?P():k()}async function V(W){let Q=W.target,oe=Q.value,se=Q.checked;s("toggling visibility %s \u2192 %s",oe,String(se));try{await o(oe,se)}catch(q){s("workspace visibility toggle failed: %o",q)}}function ce(W){return W?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function J(W,Q){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
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
                ${W.map(oe=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${oe.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${oe.path}"
                        .checked=${!Q.has(oe.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${jl(oe.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let W=t.getState(),Q=W.workspace?.current,oe=W.workspace?.available||[],se=new Set(W.workspace?.hidden||[]),q=Q?.path||oe[0]?.path||"";if(oe.length===0)return c``;let X=oe.filter(ne=>!se.has(ne.path)||ne.path===q);if(X.length<=1){let ne=X[0]||oe[0],ie=jl(ne.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ne.path}"
            >${ie}</span
          >
          ${J(oe,se)}
          ${ce(q)}
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
          ${X.map(ne=>c`
              <option
                value="${ne.path}"
                ?selected=${ne.path===q}
                title="${ne.path}"
              >
                ${jl(ne.path)}
              </option>
            `)}
        </select>
        ${J(oe,se)}
        ${ce(q)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){rt(B(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),rt(c``,e)}}}var m_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Bl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function g_(e,t,n=Bl()){return{id:n,type:e,payload:t}}function b_(e={}){let t=qt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,a=null,l=!0,u=new Map,d=[],m=new Map,y=new Set;function b(B){for(let O of Array.from(y))try{O(B)}catch{}}function k(){if(!l||a)return;s="reconnecting",t("ws reconnecting\u2026"),b(s);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*B,W=Math.max(0,Math.round(B+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",W,i+1),a=setTimeout(()=>{a=null,J()},W)}function P(B){try{o?.send(JSON.stringify(B))}catch(O){t("ws send failed",O)}}function F(){for(s="open",t("ws open"),b(s),i=0;d.length;){let B=d.shift();B&&P(B)}}function V(B){let O;try{O=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let Q=u.get(O.id);u.delete(O.id),O.ok?Q?.resolve(O.payload):Q?.reject(O.error||new Error("ws error"));return}let W=m.get(O.type);if(W&&W.size>0)for(let Q of Array.from(W))try{Q(O.payload)}catch(oe){t("ws event handler error",oe)}else t("ws received unhandled message type: %s",O.type)}function ce(){s="closed",t("ws closed"),b(s);for(let[B,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(B);i+=1,k()}function J(){if(!l)return;let B=r();try{o=new WebSocket(B),t("ws connecting %s",B),s="connecting",b(s),o.addEventListener("open",F),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",ce)}catch(O){t("ws connect failed %o",O),k()}}return J(),{send(B,O){if(!m_.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let W=Bl(),Q=g_(B,O,W);return t("send %s id=%s",B,W),new Promise((oe,se)=>{u.set(W,{resolve:oe,reject:se,type:B}),o&&o.readyState===o.OPEN?P(Q):(t("queue %s id=%s (state=%s)",B,W,s),d.push(Q))})},on(B,O){m.has(B)||m.set(B,new Set);let W=m.get(B);return W?.add(O),()=>{W?.delete(O)}},onConnection(B){return y.add(B),()=>{y.delete(B)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,J()},close(){l=!1,a&&(clearTimeout(a),a=null);try{o?.close()}catch{}},getState(){return s}}}function bw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function hw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ul=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],h_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",yw="bdui.worker.done-range",y_=bf,v_="worker:queue",w_="ui:order",k_="ui:display-policy",$_="exec:presets",br="tab:board:closed",x_="beads-ui.board.closed-range";function vw(e){let t=qt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Nf(i),a&&l&&u&&d){let Se=function(x,C){let p="Request failed",h="";if(x&&typeof x=="object"){let te=x;if(typeof te.message=="string"&&te.message.length>0&&(p=te.message),typeof te.details=="string")h=te.details;else if(te.details&&typeof te.details=="object")try{h=JSON.stringify(te.details,null,2)}catch{h=""}}else typeof x=="string"&&x.length>0&&(p=x);let R=C&&C.length>0?`Failed to load ${C}`:"Request failed";ae.open(R,p,h)},Ie=function(x){return`${_e.getState().workspace.current?.path||""}\0${x}`},lt=function(){Re&&(Re().catch(()=>{}),Re=null),je=null,Me=null},De=function(x){et=x;let C=()=>{et!==x||_e.getState().selected_id!==x||(et=null,it(x))};if(!z){Ke.then(C);return}C()},ft=function(x,C,p,h,R){return p!==tt[C]?(R().catch(()=>{}),!1):(x.set(h,R),!0)},Ft=function(){let x=_e.getState();We(x.view==="board"),Ce(x.view==="worker"),Je(he(x)),$e(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id)},Nt=function(){let x=$r(Ht);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},kt=function(){let x=$r(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},We=function(x){if(x)for(let[C,p]of Ul){if(Ue.has(C)||ct.has(C))continue;let h=C===br?Nt():{type:p};try{Le.register(C,h)}catch(be){t("register %s store failed: %o",C,be)}ct.add(C);let R=tt.board,te=!1;ye.subscribeList(C,h).then(be=>{te=!ft(Ue,"board",R,C,be)}).catch(be=>{t("subscribe %s failed: %o",C,be),Se(be,"board")}).finally(()=>{ct.delete(C),te&&Ft()})}else ge()},ge=function(){tt.board+=1;for(let[x]of Ul){let C=Ue.get(x);C&&(C().catch(()=>{}),Ue.delete(x));try{Le.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Ce=function(x){if(!x){ze();return}for(let[C,p]of h_){if(E.has(C)||ct.has(C))continue;let h=C===gr?kt():{type:p};try{Le.register(C,h)}catch(be){t("register %s store failed: %o",C,be)}ct.add(C);let R=tt.worker,te=!1;ye.subscribeList(C,h).then(be=>{te=!ft(E,"worker",R,C,be)}).catch(be=>{t("subscribe %s failed: %o",C,be),Se(be,"worker")}).finally(()=>{ct.delete(C),te&&Ft()})}},ze=function(){tt.worker+=1;for(let[x]of h_){let C=E.get(x);C&&(C().catch(()=>{}),E.delete(x));try{Le.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},$e=function(x){if(!x){at();return}G||(we("subscribe-worker-queue",{id:v_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),G=()=>we("unsubscribe-worker-queue",{id:v_}))},at=function(){G&&(G().catch(()=>{}),G=null)},he=function(x){return x.view==="monitor"||x.selected_id!=null},Je=function(x){if(!x){M();return}ot||(we("subscribe-monitor-pipeline",{id:y_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),ot=()=>we("unsubscribe-monitor-pipeline",{id:y_}))},M=function(){ot&&(ot().catch(()=>{}),ot=null)},ve=function(){j||(we("subscribe-ui-order",{id:w_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),j=()=>we("unsubscribe-ui-order",{id:w_}))},Xe=function(){j&&(j().catch(()=>{}),j=null),ht.clear()},Ze=function(){ke||(we("subscribe-display-policy",{id:k_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),ke=()=>we("unsubscribe-display-policy",{id:k_}))},st=function(){ke&&(ke().catch(()=>{}),ke=null),mt.clear()},xt=function(){_t||(we("subscribe-impl-presets",{id:$_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),_t=()=>we("unsubscribe-impl-presets",{id:$_}))},en=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},rn=function(x,C){nn.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var m=Se,y=Ie,b=lt,k=De,P=ft,F=Ft,V=Nt,ce=kt,J=We,B=ge,O=Ce,W=ze,Q=$e,oe=at,se=he,q=Je,X=M,ne=ve,ie=Xe,Pe=Ze,He=st,fe=xt,Y=en,Ae=rn;let Oe=document.getElementById("header-loading"),S=au(Oe),ae=jp(e),me=b_(),we=S.wrapSend((x,C)=>me.send(x,C)),ye=eu(we),Le=tu(),Ye=ru(),bt=Ic(),ht=nu(),mt=Oc(),T=Lc(),ue=Dc();me.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&T.set({revision:C.revision,presets:C.presets})}),me.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{bt.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),me.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{ht.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),me.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{mt.set(C.policy)}catch{}}),me.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{ue.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),me.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{ue.append(C.id,C.event)}catch{}}),me.on("snapshot",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Le.getStore(p):null;if(h&&C&&C.type==="snapshot")try{h.applyPush(C)}catch{}}),me.on("upsert",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Le.getStore(p):null;if(h&&C&&C.type==="upsert")try{h.applyPush(C)}catch{}}),me.on("delete",x=>{let C=x,p=C&&typeof C.id=="string"?C.id:"",h=p?Le.getStore(p):null;if(h&&C&&C.type==="delete")try{h.applyPush(C)}catch{}});let Re=null,je=null,Me=null,et=null,yt=()=>{},Ke=new Promise(x=>{yt=()=>x(void 0)}),z=!1,ee=!1;async function it(x){let C=Ie(x);if(C===je||C===Me)return;Me=C;let p=`detail:${x}`,h={type:"issue-detail",params:{id:x}};try{Le.register(p,h)}catch(R){t("register detail store failed: %o",R)}try{let R=await ye.subscribeList(p,h);if(_e.getState().selected_id!==x||Ie(x)!==C){await R().catch(()=>{});return}Re&&await Re().catch(()=>{}),Re=R,je=C}catch(R){t("detail subscribe failed: %o",R),Se(R,"issue details")}finally{Me===C&&(Me=null)}}let Ue=new Map,ct=new Set,tt={board:0,worker:0},Pt=!1,Ht=Cs;try{let x=window.localStorage.getItem(x_);fa(x)&&(Ht=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(yw);x!==null&&(Mt=Gn(x))}catch{}async function L(x){if(!fa(x)||x===Ht)return;Ht=x;try{window.localStorage.setItem(x_,x)}catch{}let C=Ue.get(br);if(!C)return;Ue.delete(br),await C().catch(()=>{});let p=Nt();try{Le.register(br,p)}catch(h){t("register %s store failed: %o",br,h)}try{let h=await ye.subscribeList(br,p);Ue.set(br,h)}catch(h){t("re-subscribe %s failed: %o",br,h),Se(h,"board")}}async function Z(x){let C=Gn(x);if(C===Mt)return;Mt=C;let p=E.get(gr);if(!p)return;E.delete(gr),await p().catch(()=>{});let h=kt();try{Le.register(gr,h)}catch(R){t("register %s store failed: %o",gr,R)}try{let R=await ye.subscribeList(gr,h);E.set(gr,R)}catch(R){t("re-subscribe %s failed: %o",gr,R),Se(R,"worker")}}let E=new Map,G=null,ot=null,j=null,ke=null,_t=null;async function Kt(){ke=null,mt.clear(),_t=null,T.clear(),G=null,ot=null,Ue.clear(),E.clear(),tt.board+=1,tt.worker+=1,xt();let x=_e.getState().workspace.current?.path;if(x)try{await me.send("set-workspace",{path:x})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ze();let C=_e.getState();We(C.view==="board"),Ce(C.view==="worker"),Je(he(C)),$e(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Et(){t("clearing all subscriptions for workspace switch"),ge(),ze(),at(),Ye.clear(),Xe(),ve(),st(),Ze(),lt();let x=_e.getState();if(x.selected_id)try{Le.unregister(`detail:${x.selected_id}`)}catch{}let C=_e.getState();We(C.view==="board"),Ce(C.view==="worker"),Je(he(C)),$e(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&De(C.selected_id)}async function Jt(x){t("requesting workspace switch to %s",x),ee=!0;try{let C=await me.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(_e.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Et(),de("Switched to "+en(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),de("Failed to switch workspace","error",3e3),C}finally{ee=!1}}async function Ne(x){t("requesting workspace git pull for %s",x);try{let C=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let p=C?.status;if(p==="up_to_date"){de("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+en(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let p=C?.code,h=C?.message;if(p==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let R=h?`: ${h}`:"";throw de(`Git pull failed${R}`,"error",3e3),C}}async function mn(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await me.send("set-workspace-visibility",{path:x,visible:C}),await jt()}catch(p){t("workspace visibility update failed: %o",p),de("Failed to update project visibility","error",3e3)}}async function jt(){try{let x=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(te=>({path:te.path,database:te.database,pid:te.pid,version:te.version})),p=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,h=Array.isArray(x.hidden)?x.hidden.filter(te=>typeof te=="string"):[];_e.setState({workspace:{current:p,available:C,hidden:h}});let R=window.localStorage.getItem("beads-ui.workspace");R&&(!C.some(be=>be.path===R)||h.includes(R)?window.localStorage.removeItem("beads-ui.workspace"):p&&R!==p.path&&(t("restoring saved workspace preference: %s",R),await Jt(R)))}}catch(x){t("failed to load workspaces: %o",x)}}me.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(_e.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),jt(),Et())});let Qt=!1;if(typeof me.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(Qt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&Qt&&(Qt=!1,de("Reconnected","success",2200),hw(_e,(p,h)=>{t(`${p}: %o`,h)}),Kt())};me.onConnection(x)}let gn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(gn=x)}catch(x){t("view parse error: %o",x)}let _e=iu({config:bw(),view:gn});me.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let p=_e.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&C.root_dir!==p){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{Ye.set(C.queue)}catch{}});let A=ou(_e);A.start();let pe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Te=async(x,C)=>{try{return await we(x,C)}catch(p){if(pe.has(x))throw p;return[]}};yf({global_element:r,repo_element:o},_e,A);let wt=document.getElementById("workspace-picker");wt&&__(wt,_e,Jt,Ne,mn);let Tt=$f(e,(x,C)=>we(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Tt.open())}catch{}let At=Ef(e,{policyStore:mt,queueStore:Ye,implPresetStore:T,transport:(x,C)=>we(x,C),onOpenChange:x=>{let C=Pt;Pt=x,Ft(),C&&x===!1&&Ot.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of Ul)for(let p of Le.snapshotFor(C)||[]){let h=p.labels;if(Array.isArray(h))for(let R of h)typeof R=="string"&&R.length>0&&x.add(R)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>At.open()))}catch{}let Bt=document.createElement("div");Bt.className="md-viewer-root",document.body.appendChild(Bt);let nn=Fi(Bt,{getWorkspacePath:()=>_e.getState().workspace.current?.path}),Cn=$u(a,{gotoIssue:x=>A.gotoIssue(x),issueStores:Le,transport:Te,workerQueueStore:Ye,uiOrderStore:ht,displayPolicyStore:mt,closedRange:Ht,onClosedRangeChange:x=>{L(x)},onNewIssue:()=>Tt.open(),openDoc:rn}),Ot=Fl(l,{transport:Te,issueStores:Le,queueStore:Ye,sessionLogStore:ue,gotoIssue:x=>_e.setState({selected_id:x}),getWorkspacePath:()=>_e.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn,doneRange:Mt,onDoneRangeChange:x=>{Z(x)}}),sn=hf(u,{transport:Te,pipelineStore:bt,execPresetStore:T,sessionLogStore:ue,router:A,gotoIssue:x=>A.gotoIssue(x),getWorkspacePath:()=>_e.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:rn}),cn=Fp(d,{issueStores:Le,transport:Te,queueStore:Ye,execPresetStore:T,sessionLogStore:ue,getWorkspacePath:()=>_e.getState().workspace.current?.path,mdViewer:nn,depCandidates:()=>{let x=bt.get();if(x===null)return null;let C=bt.getWorkspacesState(),p=_e.getState();if(p.view==="monitor")return Xa(x,C);let h=p.workspace.current?.path;return h?Xa(x,C,{root_dir:h}):null},subscribeCandidates:x=>bt.subscribe(x),onDepChanged:({type:x,a:C,b:p})=>{let h=sn;x==="dep-add"&&h&&typeof h.recorrectSharedLane=="function"&&h.recorrectSharedLane(x,C,p)},onNavigate:(x,C)=>{let p=()=>{_e.getState().view==="worker"?_e.setState({selected_id:x}):A.gotoIssue(x)},h=_e.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!h||C===h){p();return}Promise.resolve(Jt(C)).then(p).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=_e.getState();_e.setState({selected_id:null});try{A.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{At.open("execution")}}),un=_e.getState().selected_id;un&&(d.hidden=!1,cn.load(un),De(un)),_e.subscribe(x=>{let C=x.selected_id;C?(d.hidden=!1,cn.load(C),ee||De(C)):(cn.clear(),d.hidden=!0,lt())});let Hn=x=>{a.hidden=x.view!=="board",l.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),We(x.view==="board"),Ce(x.view==="worker"),Je(he(x)),$e(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id),!x.selected_id&&x.view==="board"&&Cn.load(),x.view==="worker"&&Ot.load(),x.view==="monitor"?sn.load():sn.pause(),window.localStorage.setItem("beads-ui.view",x.view)};_e.subscribe(Hn),Hn(_e.getState()),ve(),Ze(),xt(),jt().finally(()=>{z=!0,yt()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,p=String(x.key||"").toLowerCase(),h=x.target,R=h&&h.tagName?String(h.tagName).toLowerCase():"",te=R==="input"||R==="textarea"||R==="select"||h&&typeof h.isContentEditable=="boolean"&&h.isContentEditable;C&&p==="n"&&(te||(x.preventDefault(),Tt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&vw(t)});export{vw as bootstrap,bw as readBootstrapConfig,hw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
