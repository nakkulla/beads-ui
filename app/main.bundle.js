var U_=Object.create;var sa=Object.defineProperty;var W_=Object.getOwnPropertyDescriptor;var z_=Object.getOwnPropertyNames;var H_=Object.getPrototypeOf,G_=Object.prototype.hasOwnProperty;var K_=(e,t,n)=>t in e?sa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var oa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var V_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of z_(t))!G_.call(e,s)&&s!==n&&sa(e,s,{get:()=>t[s],enumerable:!(r=W_(t,s))||r.enumerable});return e};var Y_=(e,t,n)=>(n=e!=null?U_(H_(e)):{},V_(t||!e||!e.__esModule?sa(n,"default",{value:e,enumerable:!0}):n,e));var Pt=(e,t,n)=>K_(e,typeof t!="symbol"?t+"":t,n);var qc=oa((Sw,Nc)=>{var jr=1e3,Br=jr*60,Ur=Br*60,xr=Ur*24,Q_=xr*7,J_=xr*365.25;Nc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return em(e);if(n==="number"&&isFinite(e))return t.long?nm(e):tm(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function em(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*J_;case"weeks":case"week":case"w":return n*Q_;case"days":case"day":case"d":return n*xr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return n*Br;case"seconds":case"second":case"secs":case"sec":case"s":return n*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function tm(e){var t=Math.abs(e);return t>=xr?Math.round(e/xr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function nm(e){var t=Math.abs(e);return t>=xr?So(e,t,xr,"day"):t>=Ur?So(e,t,Ur,"hour"):t>=Br?So(e,t,Br,"minute"):t>=jr?So(e,t,jr,"second"):e+" ms"}function So(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var jc=oa((Ew,Fc)=>{function rm(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=qc(),n.destroy=d,Object.keys(e).forEach(u=>{n[u]=e[u]}),n.names=[],n.skips=[],n.formatters={};function t(u){let m=0;for(let y=0;y<u.length;y++)m=(m<<5)-m+u.charCodeAt(y),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(u){let m,y=null,b,$;function D(...W){if(!D.enabled)return;let K=D,le=Number(new Date),Y=le-(m||le);K.diff=Y,K.prev=m,K.curr=le,m=le,W[0]=n.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let j=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(B,Z)=>{if(B==="%%")return"%";j++;let G=n.formatters[Z];if(typeof G=="function"){let _e=W[j];B=G.call(K,_e),W.splice(j,1),j--}return B}),n.formatArgs.call(K,W),(K.log||n.log).apply(K,W)}return D.namespace=u,D.useColors=n.useColors(),D.color=n.selectColor(u),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,$=n.enabled(u)),$),set:W=>{y=W}}),typeof n.init=="function"&&n.init(D),D}function r(u,m){let y=n(this.namespace+(typeof m>"u"?":":m)+u);return y.log=this.log,y}function s(u){n.save(u),n.namespaces=u,n.names=[],n.skips=[];let m=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of m)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(u,m){let y=0,b=0,$=-1,D=0;for(;y<u.length;)if(b<m.length&&(m[b]===u[y]||m[b]==="*"))m[b]==="*"?($=b,D=y,b++):(y++,b++);else if($!==-1)b=$+1,D++,y=D;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let u=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),u}function a(u){for(let m of n.skips)if(o(u,m))return!1;for(let m of n.names)if(o(u,m))return!0;return!1}function l(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Fc.exports=rm});var Bc=oa((wn,Eo)=>{wn.formatArgs=om;wn.save=im;wn.load=am;wn.useColors=sm;wn.storage=lm();wn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();wn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function sm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function om(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Eo.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}wn.log=console.debug||console.log||(()=>{});function im(e){try{e?wn.storage.setItem("debug",e):wn.storage.removeItem("debug")}catch{}}function am(){let e;try{e=wn.storage.getItem("debug")||wn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function lm(){try{return localStorage}catch{}}Eo.exports=jc()(wn);var{formatters:cm}=Eo.exports;cm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ps=globalThis,yo=ps.trustedTypes,wc=yo?yo.createPolicy("lit-html",{createHTML:e=>e}):void 0,aa="$lit$",Jn=`lit$${Math.random().toFixed(9).slice(2)}$`,la="?"+Jn,Z_=`<${la}>`,vr=document,fs=()=>vr.createComment(""),_s=e=>e===null||typeof e!="object"&&typeof e!="function",ca=Array.isArray,Ec=e=>ca(e)||typeof e?.[Symbol.iterator]=="function",ia=`[ 	
\f\r]`,us=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,kc=/-->/g,$c=/>/g,hr=RegExp(`>|${ia}(?:([^\\s"'>=/]+)(${ia}*=${ia}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xc=/'/g,Ac=/"/g,Tc=/^(?:script|style|textarea|title)$/i,da=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=da(1),gs=da(2),yw=da(3),Ln=Symbol.for("lit-noChange"),Ht=Symbol.for("lit-nothing"),Sc=new WeakMap,yr=vr.createTreeWalker(vr,129);function Cc(e,t){if(!ca(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return wc!==void 0?wc.createHTML(t):t}var Rc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=us;for(let a=0;a<n;a++){let l=e[a],d,u,m=-1,y=0;for(;y<l.length&&(i.lastIndex=y,u=i.exec(l),u!==null);)y=i.lastIndex,i===us?u[1]==="!--"?i=kc:u[1]!==void 0?i=$c:u[2]!==void 0?(Tc.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=hr):u[3]!==void 0&&(i=hr):i===hr?u[0]===">"?(i=s??us,m=-1):u[1]===void 0?m=-2:(m=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?hr:u[3]==='"'?Ac:xc):i===Ac||i===xc?i=hr:i===kc||i===$c?i=us:(i=hr,s=void 0);let b=i===hr&&e[a+1].startsWith("/>")?" ":"";o+=i===us?l+Z_:m>=0?(r.push(d),l.slice(0,m)+aa+l.slice(m)+Jn+b):l+Jn+(m===-2?a:b)}return[Cc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ms=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[d,u]=Rc(t,n);if(this.el=e.createElement(d,r),yr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yr.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(aa)){let y=u[i++],b=s.getAttribute(m).split(Jn),$=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:$[2],strings:b,ctor:$[1]==="."?wo:$[1]==="?"?ko:$[1]==="@"?$o:kr}),s.removeAttribute(m)}else m.startsWith(Jn)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(Tc.test(s.tagName)){let m=s.textContent.split(Jn),y=m.length-1;if(y>0){s.textContent=yo?yo.emptyScript:"";for(let b=0;b<y;b++)s.append(m[b],fs()),yr.nextNode(),l.push({type:2,index:++o});s.append(m[y],fs())}}}else if(s.nodeType===8)if(s.data===la)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Jn,m+1))!==-1;)l.push({type:7,index:o}),m+=Jn.length-1}o++}}static createElement(t,n){let r=vr.createElement("template");return r.innerHTML=t,r}};function wr(e,t,n=e,r){if(t===Ln)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=_s(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=wr(e,s._$AS(e,t.values),s,r)),t}var vo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??vr).importNode(n,!0);yr.currentNode=s;let o=yr.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new qr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new xo(o,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(o=yr.nextNode(),i++)}return yr.currentNode=vr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ht,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=wr(this,t,n),_s(t)?t===Ht||t==null||t===""?(this._$AH!==Ht&&this._$AR(),this._$AH=Ht):t!==this._$AH&&t!==Ln&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ec(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ht&&_s(this._$AH)?this._$AA.nextSibling.data=t:this.T(vr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ms.createElement(Cc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new vo(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=Sc.get(t.strings);return n===void 0&&Sc.set(t.strings,n=new ms(t)),n}k(t){ca(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(fs()),this.O(fs()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ht,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ht}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=wr(this,t,n,0),i=!_s(t)||t!==this._$AH&&t!==Ln,i&&(this._$AH=t);else{let a=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=wr(this,a[r+l],n,l),d===Ln&&(d=this._$AH[l]),i||(i=!_s(d)||d!==this._$AH[l]),d===Ht?t=Ht:t!==Ht&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}i&&!s&&this.j(t)}j(t){t===Ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},wo=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ht?void 0:t}},ko=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ht)}},$o=class extends kr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=wr(this,t,n,0)??Ht)===Ln)return;let r=this._$AH,s=t===Ht&&r!==Ht||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ht&&(r===Ht||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){wr(this,t)}},Oc={M:aa,P:Jn,A:la,C:1,L:Rc,R:vo,D:Ec,V:wr,I:qr,H:kr,N:ko,U:$o,B:wo,F:xo},X_=ps.litHtmlPolyfillSupport;X_?.(ms,qr),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new qr(t.insertBefore(fs(),o),o,void 0,n??{})}return s._$AI(e),s};var Ao="today",Lc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Fr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Kn(e){return e==="today"?"today":"7d"}function ua(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Pc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Dc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,i,a){e=Array.isArray(o)?o:null,t=Array.isArray(i)?i:[],n=a===void 0?void 0:a!==null&&typeof a=="object"&&typeof a.revision=="number"&&Array.isArray(a.lanes)?{revision:a.revision,lanes:a.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Mc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,i=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof i=="number"?i:null}),r()},append(s,o){let i=n(s),a=e.get(i)||{lines:[],last_event_at:null};a.lines=[...a.lines,o],a.last_event_at=Date.now(),e.set(i,a),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Uc=Y_(Bc(),1);function zt(e){return(0,Uc.default)(`beads-ui:${e}`)}function dm(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=To(t.spec_id),s=To(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function To(e){return typeof e=="string"?e.trim():""}function um(e){let t=dm(e);if(t.path)return t;let n=To(Wc(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Wc(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var pm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Wr(e){let t=um(e),n=To(Wc(e).spec_review),r=pm.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function Mn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function bs(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Yc(e,t){let n=Mn(e.created_at),r=Mn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Zc(e,t){let n=Mn(e.updated_at),r=Mn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Xc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Mn(e.created_at),o=Mn(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Qc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Co=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function fm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Co,e)}function fa(e){if(!e||typeof e!="object")return!1;let t=e;return fm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function zc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Hc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Wr(e).evidence==="published"?1:0;case"created":return zc(e.created_at);case"updated":return zc(e.updated_at);default:return null}}function Gc(e,t,n){let r=Hc(e,n.key),s=Hc(t,n.key);if(r===null||s===null)return r===s?0:r===null?1:-1;if(r===s)return 0;let o=r<s?-1:1;return n.dir==="desc"?-o:o}function Jc(e){let t=Array.isArray(e)?e.filter(fa):[];return(n,r)=>{for(let a of t){let l=Gc(n,r,a);if(l!==0)return l}let s=Gc(n,r,{key:"created",dir:"asc"});if(s!==0)return s;let o=n.id,i=r.id;return o<i?-1:o>i?1:0}}var _m=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Kc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Vc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=_m.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ed(e,t){let n=Kc(e),r=Kc(t);if(n!==r)return n<r?-1:1;let s=Vc(e),o=Vc(t);if(s!==o)return s<o?-1:1;let i=Mn(e&&e.created_at),a=Mn(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var pa=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Mn(e&&e.created_at)}function td(e){return(t,n)=>{let r=zr(t,e),s=zr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function _a(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:zr(a,n)-pa};if(!a)return{rank:zr(i,n)+pa};let l=zr(i,n),d=zr(a,n),u=(l+d)/2;return l<u&&u<d?{rank:u}:{renormalize:r.map((m,y)=>({bead_id:m.id,rank:y*pa}))}}function ma(e,t={}){let n=zt(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||bs;function d(){for(let y of Array.from(i))try{y()}catch{}}function u(){s=Array.from(r.values()).sort(l)}function m(y){if(a||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=o)return;r.clear();let $=Array.isArray(y.issues)?y.issues:[];for(let D of $)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);u(),o=b,d();return}if(y.type==="upsert"){let $=y.issue;if($&&typeof $.id=="string"&&$.id.length>0){let D=r.get($.id);if(!D)r.set($.id,$);else{let W=Number.isFinite(D.updated_at)?D.updated_at:0,K=Number.isFinite($.updated_at)?$.updated_at:0;if(W<=K){for(let le of Object.keys(D))le in $||delete D[le];for(let[le,Y]of Object.entries($))D[le]=Y}}u()}o=b,d()}else if(y.type==="delete"){let $=String(y.issue_id||"");$&&(r.delete($),u()),o=b,d()}}}return{id:e,subscribe(y){return i.add(y),()=>{i.delete(y)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function Ro(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function nd(e){let t=zt("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=r.get(a);if(!d||d.size===0)return;let u=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],y=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(d)){let $=n.get(b);if(!$)continue;let D=$.itemsById;for(let W of u)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of m)typeof W=="string"&&W.length>0&&D.set(W,!0);for(let W of y)typeof W=="string"&&W.length>0&&D.delete(W)}}async function o(a,l){let d=Ro(l);if(t("subscribe %s key=%s",a,d),!n.has(a))n.set(a,{key:d,itemsById:new Map});else{let m=n.get(a);if(m&&m.key!==d){let y=r.get(m.key);y&&(y.delete(a),y.size===0&&r.delete(m.key)),n.set(a,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let u=r.get(d);u&&u.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(m){let y=n.get(a)||null;if(y){let b=r.get(y.key);b&&(b.delete(a),b.size===0&&r.delete(y.key))}throw n.delete(a),m}return async()=>{t("unsubscribe %s key=%s",a,d);try{await e("unsubscribe-list",{id:a})}catch{}let m=n.get(a)||null;if(m){let y=r.get(m.key);y&&(y.delete(a),y.size===0&&r.delete(m.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ro,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let d=n.get(a);return d?d.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),d={};if(!l)return d;for(let u of l.itemsById.keys())d[u]=!0;return d}}}}function rd(){let e=zt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,d,u){let m=d?Ro(d):"",y=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,y),b&&y&&m&&y!==m){let $=t.get(l);if($)try{$.dispose()}catch{}let D=s.get(l);if(D){try{D()}catch{}s.delete(l)}let W=ma(l,u);t.set(l,W);let K=W.subscribe(()=>o());s.set(l,K)}else if(!b){let $=ma(l,u);t.set(l,$);let D=$.subscribe(()=>o());s.set(l,D)}return n.set(l,m),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let u=s.get(l);if(u){try{u()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function sd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function od(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ga(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function mm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function gm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function id(e){let t=zt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):mm(r),i=gm(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=ga(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ga(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var bm=Object.freeze({workspace_config:{default_workspace:null}});function ad(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:bm.workspace_config.default_workspace}}}function ld(e={}){let t=zt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ad(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?ad(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((d,u)=>d!==n.workspace.hidden[u]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,u)=>d===n.worker.show_closed_children[u])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function cd(e){let t=zt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function l(d){return async(m,y)=>{let b=s++,$=Date.now();r.set(b,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let D=!1,W=()=>{D||(D=!0,r.delete(b),a())},K=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-$),W())},3e4);try{let le=await d(m,y),Y=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",b,m,Y),le}catch(le){let Y=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,Y,le),le}finally{clearTimeout(K),W()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([u,m])=>({id:u,type:m.type,elapsed_ms:d-m.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Oo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(Qc),l;switch(a){case"created_desc":return l.sort(bs),l;case"created_asc":return l.sort(Yc),l;case"updated_desc":return l.sort(Zc),l;case"priority":return l.sort(Xc),l;case"manual":default:{let d=n();return d?l.sort(td(d)):l.sort(bs),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Nn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function cn(e){let t=Nn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function kn(e,t){let n=Nn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let d=Math.floor(a/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function dd(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Nn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Lo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Io(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Lo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Po(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=dd(n);return{total:n.length,count:r,current:s,children:n}}function Do(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let d of a)l[d.bead_id]=d.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},u=r(_a(a,l,d.order),i);s(d,u);let m=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(m&&m.conflict){let y={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(y);let b=r(_a(a,l,y.order),i);s(y,b);let $=await t("ui-order-set",{expected_revision:y.revision,entries:b});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function ud(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Mo(e,t){let n=ud(e),r=ud(t);return n.length===0||r.length===0?!1:n!==r}function No(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ba(e,t){return!t||typeof e!="string"||e.length===0||No(t.visible_labels).includes(e)?!0:No(t.hidden_labels).includes(e)?!1:!No(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function pd(e,t){return No(e).filter(n=>ba(n,t))}function cr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function hm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ym(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function vm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${hm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function qo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let i=Array.isArray(e.children)?e.children:[],a=n>0?i.slice().sort(ed):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?ym(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${a.map((l,d)=>vm(l,d+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var wm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},_d={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},fd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},km={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $m(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function md(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function xm(e){if(!e||e.fill==="none"||!e.approval_state)return md(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Am(e,t,n,r){let s=wm[e]||e,o=t&&t.fill||"none",i=!!t&&t.stale===!0,a=km[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),i&&(l+=" stale"),n&&(l+=" cur");let d=o==="none"?"lbl":`lbl l-${s} on`,u=n?`color: var(--stage-${s}-on)`:"",m=_d[e]||e,y=r?gd(t):null;if(!y)return c`
      <div class="seg">
        <div class=${l} style=${u}>${a}</div>
        <div class=${d}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,y,e)}}
    >
      <div class=${l} style=${u}>${a}</div>
      <div class=${d}>${m}</div>
    </button>
  `}function gd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Fo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=fd[e.route]||fd.spec_backed,o=e.stages,i=$m(s,o,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(d=>`${_d[d]||d} ${d==="plan"?xm(o[d]||{}):md(o[d]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(d=>gd(o[d]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${a}
    >
      ${s.map(d=>Am(d,o[d]||{},d===i,r))}
    </div>
  `}function Sm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var bd=2;function hd(e){let t=e.slice(0,bd).join(", "),n=e.length-bd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Em(e,t){if(!t)return[];let n=[];if(t.external){let i=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${i}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let i of r)(Mo(e,i)?o:s).push(i);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${hd(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${hd(o)}</span
      >`),n}function ha(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function jo(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function er(e){return`${e.kind}:${jo(e)}@${e.sha}`}function Bo(e,t){if(!e)return null;let n=ha(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=ha(t?.kind),i=o!==null&&t?.kind!==e.kind,a=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${er(t)}`:"";return{kind:e.kind,label:a,title:`${l}${d}`}}function yd(e,t){let n=Bo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Tm(e){if(!e)return null;let t=ha(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${er(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Cm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&cr(n,"route")){let a=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":r.route}</span
      >`)}if(r.fast_track&&cr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&cr(n,"pr")){let a=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}let o=yd(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let a=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(a)}`}
        >${`exec ${a.kind==="delegated"?jo(a):`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let a=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of pd(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&cr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),cr(n,"blocked")&&s.push(...Em(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&cr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Rm(e){let t=kn(e.created_at),n=kn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Om(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return qo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Rm(e),empty_label:"children \uC5C6\uC74C",childChips:ya,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function ya(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Bo(t,n)?c`<span class="board-card__roll-child-chips">
    ${yd(t,n)}
    ${Tm(n)}
  </span>`:null}function Uo(e,t){let n=Sm(e.priority);return c`
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
      ${e.workflow&&cr(t.policy||null,"stepper")?Fo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
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
              ${Lc.map(o=>c`<option
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
        ${e.items.map(o=>Uo(o,t))}
      </div>
    </section>
  `}function vd(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Uo(r,t))}
        </div>
      </div>
    </dialog>
  `}var Lm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Im=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Pm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Dm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function wd(e,t,n){return c`
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
      ${Dm(e,t,n)}
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
  `}var Mm=200,Nm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},qm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),kd="beads-ui.board.sort",$d=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Fm(){try{let e=window.localStorage.getItem(kd);if(e&&$d.has(e))return e}catch{}return"created_desc"}function xd(e,t){let n=zt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,m=t.openDoc,y=t.closedRange||Ao,b=s?Oo(s,i):null,$=Do({transport:o,uiOrderStore:i}),D=[],W=[],K=[],le=[],Y=[],j=[],O=!1,B=0,Z=Fm(),G=new Map,_e=new Map,q=new Map,V=new Set,ie={search:"",priority:"",type:"",labels:[]},te=!1,Se=null;function Xe(E){return String(E.status||"open")==="open"}function pe(E){let z=String(E.status||"open");return z==="open"||z==="blocked"}function X(E){let z=ie.search.trim().toLowerCase(),Le=ie.priority,Ke=ie.type,Ae=ie.labels;return E.filter(ct=>{if(z){let dt=String(ct.id||"").toLowerCase(),he=String(ct.title||"").toLowerCase();if(!dt.includes(z)&&!he.includes(z))return!1}if(Le!==""&&String(ct.priority)!==Le||Ke!==""&&String(ct.issue_type||"")!==Ke)return!1;if(Ae.length>0){let dt=Array.isArray(ct.labels)?ct.labels:[];if(!Ae.some(he=>dt.includes(he)))return!1}return!0})}function Re(){let E=new Set;for(let z of[D,W,K,le,Y,j])for(let Le of z){let Ke=Array.isArray(Le.labels)?Le.labels:[];for(let Ae of Ke)typeof Ae=="string"&&Ae.length>0&&E.add(Ae)}return Array.from(E).sort()}function Ie(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function S(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",Z),z=b.selectBoardColumn("tab:board:blocked","blocked",Z).filter(pe),Le=new Set(E.map(N=>N.id)),Ke=b.selectBoardColumn("tab:board:ready","ready",Z).filter(N=>Xe(N)&&!Le.has(N.id)),Ae=b.selectBoardColumn("tab:board:resolved","resolved",Z),ct=b.selectBoardColumn("tab:board:deferred","deferred",Z),dt=b.selectBoardColumn("tab:board:closed","closed").slice(0,Mm),he=[...z,...Ke,...E,...Ae,...dt];ne(he);let st=new Set;for(let N of he)N&&N.id&&!Lo(N)&&st.add(N.id);let P=!Ie();D=P?hs(z,st):z,W=P?hs(Ke,st):Ke,K=P?hs(E,st):E,le=P?hs(Ae,st):Ae,Y=ct,B=ct.length,j=P?hs(dt,st):dt,G=new Map;for(let N of D)G.set(N.id,"open");for(let N of W)G.set(N.id,"open");for(let N of K)G.set(N.id,"in_progress");for(let N of le)G.set(N.id,"resolved");for(let N of Y)G.set(N.id,"deferred");for(let N of j)G.set(N.id,"closed");_e=new Map;for(let N of D)_e.set(N.id,"blocked-col");for(let N of W)_e.set(N.id,"ready-col");for(let N of K)_e.set(N.id,"in-progress-col");for(let N of le)_e.set(N.id,"resolved-col");for(let N of j)_e.set(N.id,"closed-col")}ht()}catch{D=[],W=[],K=[],le=[],Y=[],j=[],q=new Map,ht()}}function ne(E){q=Io(E)}function $e(E){return Po(q,E)}function ve(E){return!V.has(E)}function Ce(E,z){E.preventDefault(),E.stopPropagation(),V.has(z)?V.delete(z):V.add(z),ht()}function ge(E,z){E.preventDefault(),E.stopPropagation(),r(z)}function Pe(E,z){E.preventDefault(),E.stopPropagation(),r(z)}function Ye(E,z){Se||r(z)}function $t(E,z){E.preventDefault(),E.stopPropagation(),jm(z).then(Le=>{Le&&de("\uBCF5\uC0AC\uB428","success",1200)})}function Dt(E,z){Se=z,E.dataTransfer&&(E.dataTransfer.setData("text/plain",z),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function _t(E){E.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{Se=null},0)}function T(E){let z=String(E.target.value||"");!z||z===y||(y=z,d&&d(z),ht())}function oe(){return a?a.get():null}function Ee(E){let z=l?l.get():null,Le=z?z.cleanup_failed:null;if(!Le||typeof Le!="object"||Array.isArray(Le))return null;let Ke=Le[E];return!Ke||typeof Ke!="object"||Array.isArray(Ke)?null:Ke}let je={onCardClick:Ye,onCopyId:$t,onDragStart:Dt,onDragEnd:_t,onClosedRangeChange:T,rollupFor:$e,isExpanded:ve,onRollupToggle:Ce,onChildClick:ge,onFromChipClick:Pe,onOpenDoc:m?(E,z)=>m(z):void 0,cleanupFailureFor:Ee,get policy(){return oe()}};function Ze(E,z){Se||(Me(),r(z))}function it(E,z){E.preventDefault(),E.stopPropagation(),Me(),r(z)}let wt={...je,onCardClick:Ze,onChildClick:it,onFromChipClick:it,onOpenDoc:m?(E,z)=>{Me(),m(z)}:void 0,get policy(){return oe()}};function at(E){let z=E.target,Le=e.querySelector(".board-filter__labels");z&&Le&&Le.contains(z)||ke()}function J(E){E.key==="Escape"&&ke()}function ee(){te||(te=!0,document.addEventListener("mousedown",at),document.addEventListener("keydown",J),ht())}function ke(){te&&(te=!1,document.removeEventListener("mousedown",at),document.removeEventListener("keydown",J),ht())}function qe(E){E.key==="Escape"&&Me()}function ut(){O||(O=!0,document.addEventListener("keydown",qe),ht())}function Me(){O&&(O=!1,document.removeEventListener("keydown",qe),ht())}let ze={onClose:Me,onOverlayClick(E){E.target===E.currentTarget&&Me()}},gt={onSearchInput(E){ie.search=String(E.target.value||""),S()},onPriorityChange(E){ie.priority=String(E.target.value||""),S()},onTypeChange(E){ie.type=String(E.target.value||""),S()},onSortChange(E){let z=String(E.target.value||"");if(!(!$d.has(z)||z===Z)){Z=z;try{window.localStorage.setItem(kd,z)}catch{}S()}},onDeferredToggle(){O?Me():ut()},onLabelMenuToggle(){te?ke():ee()},onLabelToggle(E){let z=ie.labels.indexOf(E);z===-1?ie.labels.push(E):ie.labels.splice(z,1),S()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],S())},onNewIssue(){u&&u()}};function mt(){return c`
      <div class="board-view">
        ${wd(ie,gt,{sort_mode:Z,deferred_popup_open:O,deferred_count:B,label_options:Re(),label_menu_open:te})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:X(D)},je)}
          ${Hr({title:"Ready",id:"ready-col",items:X(W)},je)}
          ${Hr({title:"In progress",id:"in-progress-col",items:X(K)},je)}
          ${Hr({title:"Resolved",id:"resolved-col",items:X(le)},je)}
          ${Hr({title:"Closed",id:"closed-col",items:X(j),is_closed:!0,closed_range:y},je)}
        </div>
        ${O?vd({items:X(Y),count:B},wt,ze):""}
      </div>
    `}function ht(){lt(mt(),e),Ut()}function Ut(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Le of z)Array.from(Le.querySelectorAll(".board-card")).forEach((Ae,ct)=>{Ae.tabIndex=ct===0?0:-1})}catch{}}async function Lt(E,z){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:z}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Le){n("update-status failed: %o",Le),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Yt(E){switch(E){case"blocked-col":return D;case"ready-col":return W;case"in-progress-col":return K;case"resolved-col":return le;default:return[]}}function Mt(E,z,Le){if(!o||!i)return;let Ke=Yt(E),Ae=Ke.find(P=>P.id===z);if(!Ae)return;let ct=Ke.filter(P=>P.id!==z),dt=Le.closest?Le.closest(".board-card"):null,he=ct.length;if(dt){let P=dt.getAttribute("data-issue-id");if(P===z)return;let N=ct.findIndex(ye=>ye.id===P);N>=0&&(he=N)}let st=ct.slice();st.splice(he,0,Ae),$.applyReorder(z,st,he)}function Nt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let At=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Le=E.target.closest(".board-column");Le&&Le!==At&&(At&&At.classList.remove("board-column--drag-over"),Le.classList.add("board-column--drag-over"),At=Le)}),e.addEventListener("dragleave",E=>{let z=E.relatedTarget;(!z||!e.contains(z))&&At&&(At.classList.remove("board-column--drag-over"),At=null)}),e.addEventListener("drop",E=>{E.preventDefault(),At&&(At.classList.remove("board-column--drag-over"),At=null);let z=E.target,Le=z.closest(".board-column");if(!Le)return;let Ke=E.dataTransfer?.getData("text/plain")||"";if(!Ke)return;let Ae=Le.id,ct=_e.get(Ke);if(ct&&ct===Ae){if(qm.has(Ae)){if(Z!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(Ae,Ke,z)}return}let dt=Nm[Ae];if(!dt){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}G.get(Ke)!==dt&&Lt(Ke,dt)}),e.addEventListener("keydown",E=>{let z=E.target;if(!(z instanceof HTMLElement))return;let Le=String(z.tagName||"").toLowerCase();if(Le==="input"||Le==="textarea"||Le==="select"||Le==="button"||Le==="a"||z.isContentEditable===!0)return;let Ke=z.closest(".board-card");if(!Ke)return;let Ae=String(E.key||"");if(Ae==="Enter"||Ae===" "){E.preventDefault();let st=Ke.getAttribute("data-issue-id");st&&r(st);return}if(Ae!=="ArrowUp"&&Ae!=="ArrowDown"&&Ae!=="ArrowLeft"&&Ae!=="ArrowRight")return;E.preventDefault();let ct=Ke.closest(".board-column");if(!ct)return;let dt=Array.from(ct.querySelectorAll(".board-card")),he=dt.indexOf(Ke);if(Ae==="ArrowDown"&&he<dt.length-1){Ge(Ke,dt[he+1]);return}if(Ae==="ArrowUp"&&he>0){Ge(Ke,dt[he-1]);return}if(Ae==="ArrowLeft"||Ae==="ArrowRight"){let st=Array.from(e.querySelectorAll(".board-column")),P=st.indexOf(ct),N=Ae==="ArrowRight"?1:-1,ye=P+N;for(;ye>=0&&ye<st.length;){let et=st[ye].querySelector(".board-card");if(et){Ge(Ke,et);return}ye+=N}}});function Ge(E,z){try{E.tabIndex=-1,z.tabIndex=0,z.focus()}catch{}}let L=null;b&&b.subscribe&&(L=b.subscribe(()=>{try{S()}catch{}}));let Q=null;a&&a.subscribe&&(Q=a.subscribe(()=>{try{S()}catch{}}));let me=null;return l&&l.subscribe&&(me=l.subscribe(()=>{ht()})),{async load(){n("load"),S()},clear(){ke(),Me(),L&&(L(),L=null),Q&&(Q(),Q=null),me&&(me(),me=null),e.replaceChildren(),D=[],W=[],K=[],le=[],Y=[],j=[],G=new Map,_e=new Map}}}function hs(e,t){return e.filter(n=>{let r=Lo(n);return!(r&&t.has(r))})}async function jm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var $n=e=>e??Ht;async function qn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ys(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Bm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),i=t.createElement("h2"),a=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",a.textContent=`${Ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(i,a,r,s,o),t.body.append(n),new Promise(l=>{let d=u=>{typeof n.close=="function"&&n.close(),n.remove(),l(u)};r.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),n.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function tr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await Bm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var Um=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ad={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Wm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function jt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Ed(e,t,n){let r=Gt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Gt(n[e]);return s===null?null:{value:s,source:"global"}}function vs(e,t,n,r){return Ed(e,t,n)||{value:r,source:"base"}}function va(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let i=Gt(s[t][e]);if(i!==null)return i}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let i of Object.values(s))if(sn(i)){let a=Gt(i[e]);if(a!==null)return a}else if(Array.isArray(i)&&i.includes(e))return e}let o=r?.model_index?.[e];return Gt(r?.runners?.[o]?.models?.[e]?.id)||e}function zm(e,t){return Gt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return jt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return jt(e,t,r,e,"explicit")}function Td(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(i=>typeof i=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let i of Object.keys(o))s.includes(i)||s.push(i);return s}function Hm(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Gm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Hm(t,n)){let o=Td(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function wa(e){return jt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Sd(e,t,n){let r=Ed(e,t,n);return r?Kr(r.value,r.source):jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function xn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,i=sn(e.runner_catalog)?e.runner_catalog:null,a=Gt(n.quick_fix_impl_model),l=Gm(a,s,i),d={};if(s){let u=vs("workflow_mode",t,n,Gt(s.workflow_mode_default));d.workflow_mode=u.source==="base"?jt(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):Kr(u.value,u.source);for(let Y of["spec_review","plan_review","impl_review"]){let j=`${Y}_model`,O=Gt(Y==="plan_review"?u.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),B=vs(j,t,n,O);if(B.value===null)d[j]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(B.value!=="self"&&B.value!=="skip"&&!sn(s.review?.reviewers?.[B.value]))d[j]=wa(jt(B.value,B.source,"",null,"explicit"));else{let Z=zm(B.value,s);d[j]=jt(B.value,B.source,Gr(Z),Z,B.source==="base"?"default":"explicit")}}for(let[Y,j]of Object.entries(Ad)){let O=d[j].value;if(O==="self"||O==="skip"){d[Y]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let B=Gt(s.review?.reviewers?.[O||""]?.effort),Z=vs(Y,t,n,B);d[Y]=Z.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(Z.value,Z.source,Z.value,Z.value,Z.source==="base"?"default":"explicit")}let m=sn(s.implementation?.default)?s.implementation.default:{},y=Gt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),$=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=b&&sn($[y])?$[y]:{};for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=vs(Y,t,n,Y==="impl_dispatch"?Gt(D.dispatch)||Gt(m.dispatch):Gt(m[Y.replace("impl_","")]));d[Y]=j.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let W=Gt(t.impl_runtime),K=W==="inherit"?Gt(e.controller_runtime):W,le=y==="quick_fix"&&Gt(t.impl_dispatch)===null&&l.runtime!==null&&(W===null||K===l.runtime);if(le){let Y=l.runtime,j=a;d.impl_dispatch=jt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),W===null&&(d.impl_runtime=jt(Y,"global",`${Y} (\uC720\uB3C4)`,Y,"explicit")),Gt(t.impl_model)===null&&(d.impl_model=jt(j,"global",j,j,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])d[Y]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!le&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let Y=d.impl_runtime.value==="inherit"?Gt(e.controller_runtime):d.impl_runtime.value,j=Y?Td(Y,s,i):[];if(d.impl_model.value!=="auto"&&j.length>0&&!j.includes(d.impl_model.value))d.impl_model=wa(d.impl_model);else{let O=va(d.impl_model.value,Y,s,i);d.impl_model.display=Gr(O),d.impl_model.full_value=O}}if(d.impl_effort.value==="auto"){let Y=Gt(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),j=Y?Gt(s.implementation?.effort_by_transport?.[Y]?.auto):null;j&&!Wm.has(j)?(d.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=j,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",d.impl_speed.source))}}else for(let u of Um.filter(m=>!m.startsWith("orchestration_")))d[u]=Sd(u,t,n);if(!s){for(let[u,m]of Object.entries(Ad))(d[m].value==="self"||d[m].value==="skip")&&(d[u]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])d[u]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[u]=Sd(u,t,n);continue}let m=u.replace("orchestration_",""),y=Gt(o[m]),b=vs(u,t,n,y);if(u==="orchestration_effort"&&b.source==="base"){d[u]=jt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){d[u]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let $=b.source==="base"?Gt(o.model_id)||b.value:va(b.value,null,s,i);d[u]=jt(b.value,b.source,Gr($),$,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){d[u]=b.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}d[u]=Kr(b.value,b.source)}if(s)if(a===null){let u=d.orchestration_model.full_value;d.quick_fix_impl_model=jt(null,"base",u===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(u)})`,null,"default")}else if(l.runtime!==null){let u=va(a,l.runtime,s,i);d.quick_fix_impl_model=jt(a,"global",Gr(u),u,"explicit")}else l.offered?d.quick_fix_impl_model=wa(jt(a,"global","",null,"explicit")):d.quick_fix_impl_model=Kr(a,"global");return d}function Km(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Wo(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let y={...r,...m};return xn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,i={...o};delete i[e.key];let a=s(i)[e.key],l=s(o)[e.key],d=Gt(o[e.key]),u=[...e.choices];return d!==null&&!u.includes(d)&&u.unshift(d),{unset_label:Km(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:u.map(m=>{let y=s({...o,[e.key]:m})[e.key];return{value:m,label:y.display,full_value:y.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",s.append(o,i),t.append(n,r,s),e.body.append(t),new Promise(a=>{let l=!1,d=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),a(m))},u=()=>d(r.value.trim());o.addEventListener("click",u),i.addEventListener("click",()=>d(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),u())}),t.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ka(e){return`session:${e.provider}:${e.session_id}`}function ws(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Vm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:ka(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:ws(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Vm(e,n)}}}var $a="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ym="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Cd="\uBD84\uD574 \uC5C6\uB294 leg";function nn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Yn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Zr=[...Yn,"reasoning_output_tokens"],Zm={codex:["implementation","review-consult"],claude:["subagent"]};function xa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Yn.some(t=>Number.isFinite(e[t]))}function Xm(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))}function Aa(e){let t=0;for(let n of Yn)t+=nn(e?.[n]);return t}function Qm(e){return!e||typeof e!="object"?!1:Yn.some(t=>Number.isFinite(e[t]))}function Rd(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Jm(e){let t={};for(let n of Zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Od(e){let t={};for(let n of Zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ld(e,t){return xa(t)?nn(t.total_tokens):e==="codex"?nn(t.input_tokens)+nn(t.output_tokens):Aa(t)}function eg(e){return e==="claude"?"Claude":"Codex"}function tg(e){return`\u03C4 ${Pd(e)}`}function ng(e,t){let n=t.breakdown||{},r=nn(t.total_only_subtotal);if(xa(n)||r>0&&!Xm(n)){let d=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Ym];return t.replayed&&d.push($a),d.join(`
`)}let s=[`\uC785\uB825 ${nn(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nn(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${nn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nn(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${nn(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${nn(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${nn(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${Cd} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${o} + ${Cd}`:o,l=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push($a),l.join(`
`)}function dn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${eg(n)} ${tg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:ng(n,r)})}return t}function Ho(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(a.total_only_subtotal=nn(a.total_only_subtotal)+nn(i.total_only_subtotal));for(let l of Zr)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=nn(a.breakdown[l])+nn(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Sa(e){return!e||typeof e!="object"?null:In({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function rg(e){return e==="codex"?"codex":"claude"}function Vn(){return{subtotal:0,breakdown:Jm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function zo(e,t,n){e.subtotal+=t.subtotal,xa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=nn(e.breakdown[r])+nn(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Id(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Pd(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return Qm(e)?`\u03C4 ${Pd(Aa(e))}`:null}function nr(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ks(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${nn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${nn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Aa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push($a),n.join(`
`)}function In(e,t){let n={claude:Vn(),codex:Vn()},r={orchestrator:{claude:Vn(),codex:Vn()},implementation:{claude:Vn(),codex:Vn()},"review-consult":{claude:Vn(),codex:Vn()},subagent:{claude:Vn(),codex:Vn()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(Rd(l)){let u=rg(a.runner),m=Od(l),y={provider:u,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:m,subtotal:Ld(u,m)};m.replayed===!0&&(y.replayed=!0),typeof a.model=="string"&&(y.model=a.model),typeof a.session_id=="string"&&(y.session_id=a.session_id),zo(n[u],y,!0),zo(r.orchestrator[u],y,!0)}let d=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let u of d){let m=u&&u.provider==="claude"?"claude":"codex";if(!u||u.provider!=="codex"&&u.provider!=="claude"||!Zm[m].includes(u.role)||!Rd(u.usage))continue;let y=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let b=Od(u.usage),$={provider:m,role:u.role,attempt_id:String(a.attempt_id||""),usage:b,subtotal:Ld(m,b)};$.receipt_id=y,typeof u.agent_type=="string"&&($.agent_type=u.agent_type),typeof u.agent_id=="string"&&($.agent_id=u.agent_id),typeof u.model=="string"&&($.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&($.effort=u.effort),typeof u.session_id=="string"?$.session_id=u.session_id:typeof u.thread_id=="string"&&($.session_id=u.thread_id),typeof u.turn_id=="string"&&($.turn_id=u.turn_id),(typeof u.completed_at=="string"||typeof u.completed_at=="number"&&Number.isFinite(u.completed_at))&&($.completed_at=u.completed_at),b.replayed===!0&&($.replayed=!0),zo(n[m],$,!1),zo(r[$.role][m],$,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let d=Id(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[a]=d}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let d of["claude","codex"]){let u=r[a][d];u.legs.length>0&&(l[d]={...Id(u,!0),legs:u.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}function Dd(e,t){let n=new Map(e.map((l,d)=>[l,d])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(d=>{if(s.has(d))return!1;for(let u of r.get(d))if(!s.has(u))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let i=[],a=new Map(o.map((l,d)=>[l,d]));for(let l of o){let d=null;for(let u of r.get(l)){let m=Number(n.get(l))<Number(n.get(u)),y=Number(a.get(l))>Number(a.get(u));m&&y&&(d===null||Number(a.get(u))>Number(a.get(d)))&&(d=u)}d!==null&&i.push({bead_id:l,after:d})}return{order:o,corrections:i,cycle:!1}}var sg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ko="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",og="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",ig="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Qr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function $s(e,t){return`${e}\0${t}`}function ag(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,i=o instanceof Map?o.get(s):void 0;if(!Array.isArray(i))return null;r.set(s,i.filter(a=>a!==s&&n.has(a)))}return r}function lg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Ss(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=ag(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,y]of s)for(let b of y)o.push({blocker:b,blockee:m});let i=lg(e,t),a=new Map(r.map((m,y)=>[m,y])),l=r.slice(0,i).filter(m=>s.get(m).some(y=>Number(a.get(y))>Number(a.get(m)))),d=Dd(r.slice(i),o);if(d.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let u=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...d.order.map(m=>u.get(m))],corrections:d.corrections,cycle:!1,held:!1,mismatched:l}}function Md(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ss(n,t)}function cg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function dg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ug(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ea(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let i of e.get(o)||[]){if(i===n)return!0;r.has(i)||(r.add(i),s.push(i))}}return!1}function pg(e,t){let n=new Set;for(let[i,a]of t)for(let l of a)n.add($s(i,l));let r=new Map,s=new Map;for(let i of e){let a=$s(i.a,i.b);r.set(a,i),s.set(a,i.type==="dep-add")}let o=[];for(let i of e){let a=$s(i.a,i.b);r.get(a)===i&&s.get(a)!==n.has(a)&&o.push(i)}return o}function fg(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let i=s-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=s;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function _g(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Go(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ta(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Es(e){let t=ug(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=d=>{let u=e.owner_of.get(d);return typeof u!="string"||u.length===0?(s.refusal=dg(d),null):u};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(d,u,m)=>{if(s.refusal!==null||d===u)return;let y=t.get(d)||[];if(y.includes(u))return;let b=o(d);if(b!==null){if(Ea(t,u,d)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${d}\uAC00 \uC774\uBBF8 ${u}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(d,[...y,u]),m!==void 0&&r.add($s(d,u)),n.push({type:"dep-add",a:d,b:u,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(d,u)=>{if(s.refusal!==null||d===u)return;let m=t.get(d)||[];if(!m.includes(u))return;let y=o(d);y!==null&&(t.set(d,m.filter(b=>b!==u)),n.push({type:"dep-remove",a:d,b:u,root_dir:y}))},laneCreated:(d,u)=>r.has($s(d,u))}}function Ts(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=pg(e.dep_ops,t.blocked_by_map),i=o.filter(u=>u.type==="dep-remove"),a=o.filter(u=>u.type==="dep-add"),l=s.disarm_ops??[],d=s.lane_id===void 0||s.correction===void 0?void 0:cg(s.lane_id,s.correction);return{lane_ops:n,ops:[...i,...l,...a,...r],lane_op_index:i.length+l.length,...d===void 0?{}:{correction:d}}}function Nd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function xs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function qd(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let i of r){let a=e.owner_of.get(i.bead_id)||i.root_dir;typeof a!="string"||a.length===0||o.set(a,[...o.get(a)||[],i.bead_id])}for(let[i,a]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:a,lane_id:n},root_dir:i});return s}function Fd(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let i=e.ownerOf(o.bead_id);if(i===null)return;let a=s.get(i)??0;r.push(Go(o.bead_id,i,(t.parallel_raw_length.get(i)??0)+a)),s.set(i,a+1)}}function As(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Vo(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ca(e,t,n){let r=Es(n),s=[],o=[],i=[],a,l=n.owner_lane_of.get(e.bead_id),d=e.kind==="chain"?e.lane_id??l:void 0,u=d===void 0?void 0:n.cross_lanes.get(d);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:sg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:og};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ta(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Qr}}if(e.kind==="chain"&&u===void 0)return{refused:Qr};let m=()=>{if(u===void 0||u.status!=="confirmed")return;let $=u.entries.findIndex(Y=>Y.bead_id===e.bead_id);if($<0)return;let D=$>0?u.entries[$-1]:null,W=$+1<u.entries.length?u.entries[$+1]:null,K=xs(u,$),le=W!==null&&xs(u,$+1);K&&D!==null&&r.removeDep(e.bead_id,D.bead_id),le&&W!==null&&r.removeDep(W.bead_id,e.bead_id),(K||le)&&D!==null&&W!==null&&r.addDep(W.bead_id,D.bead_id,d)},y=($,D)=>{let W=n.cross_lanes.get($),K=W.entries.findIndex(q=>q.bead_id===e.bead_id),le=W.entries.filter(q=>q.bead_id!==e.bead_id),Y=Math.max(0,Math.min(le.length,K>=0&&D>K?D-1:D)),j=-1;if(le.forEach((q,V)=>{n.fixed_members.has(q.bead_id)&&(j=V)}),Y<=j){r.state.refusal=ig;return}let O=K>=0?W.entries[K]:u?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};a=Ss({status:W.status,entries:[...le.slice(0,Y),O,...le.slice(Y)]},n);let B=a.entries;if(Vo(B,W.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:$,entries:As(B)}}),W.status!=="confirmed")return;let Z=B.findIndex(q=>q.bead_id===e.bead_id),G=Z>0?B[Z-1].bead_id:null,_e=Z+1<B.length?B[Z+1].bead_id:null;if(G===null){_e!==null&&r.addDep(_e,e.bead_id,$);return}if(r.addDep(e.bead_id,G,$),_e!==null&&(r.graph.get(_e)||[]).includes(G)){let q=W.entries.findIndex(V=>V.bead_id===_e);(r.laneCreated(_e,G)||q>0&&W.entries[q-1].bead_id===G&&xs(W,q))&&r.removeDep(_e,G),r.addDep(_e,e.bead_id,$)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),u!==void 0&&(t.kind!=="chain"||t.lane_id!==d)&&(i.push(...qd(n,u,d,u.entries.filter($=>$.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:d,entries:As(u.entries.filter($=>$.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let $=fg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Go(e.bead_id,e.root_dir,$));else if(e.kind==="parallel"){let D=n.parallel_rows,W=D[Math.max(0,Math.min(D.length,t.marker_index))];if(!(!!W&&W.bead_id===e.bead_id)&&_g(n,e.root_dir)&&b!==void 0){let le=b>$?$:$-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let $=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&$.status==="confirmed"&&o.push(Go(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let $=b>t.index?t.index:t.index-1;$>=0&&$!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:$},root_dir:e.root_dir})}}else o.push(Go(e.bead_id,e.root_dir,t.index,t.lane_id));return Ts(r,n,s,o,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:a}:{}})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ss(n,t);if(r.held)return{refused:Ko};let s=r.entries,o=Es(t),i=[];Nd(o,s,e),o.state.refusal===null&&Fd(o,t,s,i);let a=Vo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:As(s)}}];return a.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ts(o,t,a,i,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ss(n,t),s=r.entries,o=Es(t),i=[];Nd(o,s,e),o.state.refusal===null&&Fd(o,t,s,i);let a=Vo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:As(s)}}];return Ts(o,t,a,i,{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Ss(n,t),s=r.entries;return Ts(Es(t),t,Vo(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:As(s)}}],[],{lane_id:e,correction:r})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Qr};let r=Es(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)xs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Ts(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:qd(t,n,e,n.entries)})}function zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let i=1;i<n.entries.length;i+=1){let a=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;xs(n,i)?r.push(a):s.push(`${a} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${Ta(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Hd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Gd(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function Ra(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ta(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Kd={running:3,paused:2,failed:1};function Sr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Vd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Yd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Sr(i)&&s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Sr(i))continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let u=t.get(i.bead_id),m=typeof u=="number"&&u>0&&typeof i.finished_at=="number"&&u>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let u=Kd[d.run_state],m=Kd[a];if(u>m||u===m&&(d.started_at??0)>(l??0))continue}o.set(i.bead_id,{attempt:i,run_state:a,started_at:l})}return{winners:o,resumed_from_ids:r}}var Yo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],La=[...Yo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],rr=["orchestration_model","orchestration_effort","orchestration_speed"],Zo=[...Yo,...rr],mg=La.filter(e=>Zo.includes(e)),Zd=["delegated","main"],Xo=["inherit","claude","codex"],Cs=["default","fast"],Rs=["standard","fast_track"],Os=["codex","opus","fable","self","skip"],Qo=["codex","fable","skip"],Jo=["low","medium","high","xhigh"],Rn="auto";function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xd(e){if(!Cn(e)||!Cn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))Cn(r)&&Cn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Xd(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Rn,...r.flatMap(([,s])=>s)]}function Qd(e,t,n,r){if(!Cn(e)||!Cn(e.runners))return[Rn];let s=[];for(let[o,i]of Object.entries(e.runners))if(!(!Cn(i)||!Cn(i.models))&&!(t&&t!=="inherit"&&o!==t))for(let[a,l]of Object.entries(i.models)){if(n&&n!==Rn&&a!==n)continue;let d=r(i,l);if(Array.isArray(d))for(let u of d)typeof u=="string"&&!s.includes(u)&&s.push(u)}return[Rn,...s]}function es(e,t,n){return Qd(e,t,n,(r,s)=>Cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ia(e,t,n){return Qd(e,t,n,(r,s)=>Cn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ls(e,t){let n=Xd(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Jd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Jr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!es(t,s,r.impl_model||Rn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var gg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Oa=[...mg,...rr],bg=[...Zo,...La].filter((e,t,n)=>n.indexOf(e)===t&&!Oa.includes(e));function eu(e,t){let n=Cn(e)?e:{},r=Cn(t)?t:{},s=[];for(let i of Oa){let a=n[i]??null,l=r[i]??null;a!==l&&s.push({key:i,label:gg[i]||i,before:a,after:l,kind:a===null?"added":l===null?"removed":"changed"})}let o=[];for(let i of[...bg,...Object.keys(r)])!Oa.includes(i)&&!o.includes(i)&&Object.hasOwn(r,i)&&o.push(i);return{rows:s,ignored_keys:o}}function Pa(e,t,n,r,s,o){return Wo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function tu(e,t){let n={};for(let r of La){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function nu(e,t){let n={};for(let r of rr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Da=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...rr]}],ur={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ei={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ma(e,t,n,r,s,o=null){let i=xn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(a=>({key:a,...i[a]}))}function ru(e,t,n,r,s,o=null){let i={pin:0,global:0,base:0};for(let a of Ma(e,t,n,r,s,o))i[a.source]+=1;return i}function su(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ou(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var o$=[...Yo,...rr];var iu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Is(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ti(e){if(!Is(e)||!Is(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Is(n)&&Is(n.models));return t.length>0?t:null}function Fn(e,t){let n=ti(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function au(e,t){return Is(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lu(e,t){let n=ti(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return au(r,r.models[t]);return[]}function hg(e){let t=ti(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of au(r,s))n.includes(o)||n.push(o);return n}function yg(e,t){if(!t)return hg(e);let r=ti(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of lu(e,o))s.includes(i)||s.push(i);return s}function cu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Fn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?lu(t,r.impl_model):yg(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Na=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function du(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${ur[e]}: ${t.display} (${ei[t.source]})`}function qa(e){return e.filter(t=>t!==null).join(`
`)}function Ps(e){if(typeof e!="object"||e===null)return null;let t=Ar(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ur.orchestration_model,e.model),n(ur.orchestration_effort,e.effort),n(ur.orchestration_speed,e.speed)])}}function Er(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),s=pr(e,"orchestration_speed"),o=du([Fn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",s)])}}function vg(e,t){return e===null||e.value===null||Na.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function wg(e){return e===null||Na.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function kg(e){return e===null?null:e.value==="auto"?"auto":Na.has(e.resolution)?null:e.display}function _r(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),s=pr(e,"impl_model"),o=pr(e,"impl_effort"),i=pr(e,"impl_speed"),a=n!==null&&n.value==="main"?"\uBA54\uC778":du([vg(r,t??null),wg(s),kg(o),i!==null&&i.value==="fast"?"Fast":null]);return a===""?null:{text:a,title:qa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",s),fr("impl_effort",o),fr("impl_speed",i)])}}var $g=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var uu={orchestration_model:["fable"],impl_runtime:["claude"]},xg={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function pu(e){return typeof e=="object"&&e!==null?e:null}function fu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Ag(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>$g.includes(t))}function ts(e,t=e){let n=pu(e);if(!n)return null;let r=fu(n.rec_orchestration_model,uu.orchestration_model);if(r.length===0)return null;let s=fu(n.rec_impl_runtime,uu.impl_runtime),o={orchestration_model:r};s.length>0&&(o.impl_runtime=s);let i=pu(t)||{},a=Object.keys(o),l=0,d=0;for(let m of a){let y=i[m];typeof y=="string"&&y.length>0&&(l+=1,y===o[m]&&(d+=1))}let u=l===0?"unapplied":d===a.length?"applied":"diverged";return{reasons:Ag(n.rec_reason),rec:o,state:u}}function ni(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=xg[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ri(e){return e.replace(/\/+$/,"")}function Sg(e,t){let n=ri(e),r=ri(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function si(e,t){let n=new Set;for(let r of e)for(let s of t){if(!Sg(r,s))continue;let o=ri(r),i=ri(s);n.add(o.length>=i.length?o:i)}return[...n].sort()}function oi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function mu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Tr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ii(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let i=o.kind;n.set(i,(n.get(i)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let i=n.get(s);i!==void 0&&r.push(i?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ai(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let i=o.started_at,a=o.finished_at;typeof i!="number"||typeof a!="number"||!Number.isFinite(i)||!Number.isFinite(a)||a<i||(n+=a-i,r=!0)}return r?n:null}function li(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Eg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:s?{sha:oi(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function gu(e,t){let n=Eg(e,t);return n?c`<button
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
            >${li(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Tr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ns(e){let t=kn(e.created_at),n=kn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Tg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ms(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ci(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function jn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,y)=>(m.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,a=typeof s?.last_error=="string"?s.last_error:null,l=s?Tg(s.phase):null,d=s?.kind==="stale_work_backup_fresh",u=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!s||!!a),label:d?a?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":a?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(a?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${a} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${a} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:a,confirmation:u}}function Ds(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
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
  </div>`}var Cg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function bu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(i[d])?Number(i[d]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Cg[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function di(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Rg(e){return c`<div
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
  </div>`}function ui(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,i=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!i?"":c`<div class="worker-deps">
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
        >`:""}${s?Rg(s):""}
  </div>`}function pi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Og(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function hu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function fi(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${ni(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function yu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function _i(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Lg(e){let t=Array.isArray(e.badges)?e.badges:[],n=dn(e.usage),r=nr(e.usage),s=kn(e.done_at);return c`<div
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
      ${yu(e.pr_url,e.pr_number)}${s?c`<span
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
              >`):r?c`<span class="worker-usage" title=${ks(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${mu(e.work_kind)}
            >작업 ${Tr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Bn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Lg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=dn(e.usage),o=nr(e.usage),i=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,d=l?kn(e.done_at):"",u=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",y=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,D=e.lane==="done"?"":pi(e.workflow),W=e.lane==="done"?"":hu(e.from_id),K=_i(e.priority),le=c`<span class="worker-mini__title">${e.title}</span>`,Y=yu(e.pr_url,e.pr_number),j=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",O=r.map(Ce=>Ce===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ce}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ce===e.completion_badge&&e.completion_title||""}
          >${Ce}</span
        >`),B=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",Z=s.length>0?s.map(Ce=>c`<span class="worker-usage" title=${Ce.tooltip}
              >${Ce.label}</span
            >`):o?c`<span class="worker-usage" title=${ks(e.usage)}
            >${o}</span
          >`:"",G=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",_e=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",q=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",V=e.discard,ie=V?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${V?.attempt_id||""}
          data-operation-id=${V?.operation?.operation_id||""}
          data-discard-mode=${V?.confirmation||"unmerged"}
          ?disabled=${V?!V.enabled:e.discard_enabled===!1}
          title=${V?V.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${V?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,Se=te?c`${te.can_resume||te.can_continue?c`<button
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
          </button>`:""}`:"",Xe=te?c`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",pe=e.revise_action?c`<button
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
        </button>`:"",X=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Re=fi(e.rec),Ie=b||D||W||X||Re||Z?c`<div class="worker-chips">
          ${b}${D}${W}${X?di(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Re}${Z}
        </div>`:"",S=ui(e.dependency_chips),ne=Ds(e),$e=t.actions?t.actions:"",ve=!!(i||e.merge_action||e.cancel_action||e.discard_action||V?.operation||e.revise_action||te);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${$}${K}${W}${Y}${le}${$e}
          </div>
          <div class="worker-mini__row2">
            ${Z}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${cn(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${mu(e.work_kind)}
                  >작업 ${Tr(e.work_ms)}</span
                >`:""}${O}${G}
            <span class="worker-mini__actions"
              >${_e}${q}${ie}</span
            >
            ${ns(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${m}${$}${K}${Y}${j}${O}${y}${B}${$e}
            </div>
            <div class="worker-mini__body">${le}${Xe}</div>
            ${S}${Ie}${ve?c`<div class="worker-mini__foot">
                  ${G}
                  <span class="worker-mini__actions"
                    >${_e}${q}${ie}${pe}${Se}</span
                  >
                  ${Ds(e)}
                </div>`:""}
            ${ns(e)}`:c`<div class="worker-mini__line">
              ${u}${m}${$}${K}${le}${Y}${j}${O}${y}${B}${G}${_e}${q}${ie}${$e}
            </div>
            ${S}${Ie}${ne} ${ns(e)}`}
  </div>`}function Ig(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var Pg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function ja(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,i=e.session_preferred===!0,a=Pg[e.session_preferred_reason||""]||"",l=e.workflow,d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),u=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=ui(e.dependency_chips),y=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=pi(l),$=hu(e.from_id),D=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${_i(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:i?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${fi(e.rec)}${Og(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Fo(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${m}
    ${y||b||$||D?c`<div class="worker-chips">
          ${y}${b}${$}${di(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${Ig(t.lanes,e.id)}
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
                  class="worker-card__reason${u?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${ns(e)}
  </div>`}function Zn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${$n(e.id||void 0)}
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
                  </div>`:e.items.map(s=>e.lane==="candidate"?ja(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Bn(s))}
          </div>`}
  </section>`}function _u(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function mi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${_u("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${$n(r.drop)}
            data-root-dir=${$n(r.root_dir)}
            data-lane-id=${$n(r.lane_id)}
            data-lane-length=${$n(r.lane_length)}
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
        ${_u("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>Dg(s))}
          </div>`}
    </section>
  </div>`}function Dg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Zn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${$n(t.drop)}
        data-root-dir=${$n(t.root_dir)}
        data-lane-id=${$n(t.lane_id)}
        data-lane-length=${$n(t.lane_length)}
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
  </div>`}function gi(e){return e.count?c`<section
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
  </section>`:""}var vu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ns=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function bi(e,t){let n=vu.find(s=>s.step===e);if(!n)return null;let r=vu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function wu(e){let t=Ns.findIndex(n=>n.step===e);return Ns.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Cr(e){let t=Ns.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Mg(e){let t=Ns.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ns.length}}function hi(e){let t=Mg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ua=new Set(["queued","running","retry_pending"]),ku=new Set(["failed","succeeded"]),Ng={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},qs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},qg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:qs.base_containment,child_sweep:qs.child_sweep,branch_cleanup:qs.branch_cleanup,parent_close:qs.parent_close};function Fg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function jg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ua,...ku].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Bg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(o!==i)return i-o;let a=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return a.localeCompare(l)}function Ba(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Ng[s];if(!o)return null;let i=bi(n,`${r} ${o}`);return i?{...i,active:Ua.has(s),failed:s==="failed"}:null}function Ug(e){return!e||typeof e!="object"?null:qg[e.step]||null}function Fs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Ug(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),a=Fg(e.merge_sha)?e.merge_sha:null,l=!o&&a&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&jg($,t,a)).sort(Bg):[],d=i?l:[],u=d.find($=>Ua.has($.state));if(u)return Ba(u);if(s)return s.step==="repo_operations"&&l[0]?Ba(l[0],!0):null;let m=d.find($=>ku.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Ba(m);if(r){let $=bi(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?qs[e.cleanup_cursor]:null;if(!y)return null;let b=bi(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function yi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Wg="\uBBF8\uC801\uC7AC";function Wa(e,t){let n=Mo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function $u(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,i]of e){if(typeof o!="string"||o.length===0)continue;let a=[];for(let l of Array.isArray(i)?i:[]){if(typeof l!="string"||l.length===0)continue;let d=Wa(o,{id:l,location_label:s.get(l)||Wg}),u=n[l];d.foreign!==!0?d.openable=!0:typeof u=="string"&&u.length>0&&(d.openable=!0,d.root_dir=u),a.push(d)}a.length>0&&r.set(o,a)}return r}function za(e,t){return`${e}\0${t}`}function xu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ha(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function js(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Au(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${js(s)})`,location_label:js(s),scope:null,same_lane_ahead:!1};let i=Ha(e,r),a=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${a})`,location_label:a,scope:i,same_lane_ahead:!1}}function Su(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let d=za(a.root_dir,l.id);n.set(d,{root_dir:a.root_dir,workspace_name:a.name,lane:l.id}),s.set(d,[]);for(let u of Array.isArray(l.items)?l.items:[])r.set(u.id,d)}for(let a of t)for(let l of Array.isArray(a.sublanes?.serial)?a.sublanes.serial:[]){let d=za(a.root_dir,l.id),u=Array.isArray(l.items)?l.items[0]:null,y=!!u&&u.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],b=s.get(d);if(b)for(let $ of y){let D=r.get($);D&&D!==d&&!b.includes(D)&&b.push(D)}}let o=(a,l)=>{let d=new Set,u=[a];for(;u.length>0;){let m=u.pop();if(m===l)return!0;!m||d.has(m)||(d.add(m),u.push(...s.get(m)||[]))}return!1},i=new Map;for(let[a,l]of s){let d=[];for(let u of l){let m=n.get(u);o(u,a)&&m&&d.push(m)}d.length>0&&i.set(a,d)}return i}function Eu(e,t){return za(e,t)}var Tu=1,Bs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ka=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rs={show_blocked:!0,spec:"all"},Cu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function zg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Sr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Hg(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Sr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Gg(e,t){let{winners:n,resumed_from_ids:r}=Yd(e,t),s=new Map;for(let[o,i]of n){let a=i.attempt,l=i.run_state,d=i.started_at,u=typeof a.session_id=="string"&&a.session_id.length>0;s.set(o,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:d,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:In(e,a.bead_id),can_pause:l==="running"&&u,can_resume:l!=="running"&&u&&!r.has(a.attempt_id)})}return s}function Ru(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Bt(e){return e&&typeof e=="object"?e:{}}function Kg(e,t,n){let r=Bt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,i=e.session_defaults;if(!s||!o||!i)return null;let a=y=>xn({pin:y,global:i,execution_defaults:s,runner_catalog:o,route:n}),l,d;try{l=a(r),d=a(null)}catch{return null}let u=Ou(Er(l,o),Er(d,o)),m=Ou(_r(l,null),_r(d,null));return u||m?{orchestration:u,worker:m}:null}function Ou(e,t){return!e||t&&t.text===e.text?null:e}function Lu(e,t){let n=Ha(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Vg(e,t,n){let r=t.get(e);if(!r)return Lu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return js(r)}function Yg(e,t,n,r){let s=t.get(e);if(!s)return{label:Lu(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let i=r.get(e),a=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${a} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":js(s),title:""}}function Zg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Xg(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>o.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>o.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Qg(e,t,n,r,s,o,i){let a=[];return e.forEach((l,d)=>{let u=typeof l.id=="string"?l.id:"";if(u.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",y=Array.isArray(l.entries)?l.entries:[],b=[];y.forEach((K,le)=>{let Y=K&&typeof K.bead_id=="string"?K.bead_id:"";if(Y.length===0)return;let j=K&&typeof K.root_dir=="string"?K.root_dir:"",O=n.get(Y),B=O?O.state:void 0,Z=B==="running"||B==="pr_wait"||B==="done",G=!O||B==="runnable",_e=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,q=Yg(Y,n,r,t),V=b.length>0?b[b.length-1].id:null,ie=m==="confirmed"&&V!==null&&!(t.get(Y)||[]).includes(V);b.push({id:Y,title:s.get(Y)||Y,root_dir:O?O.root_dir:j,workspace_name:O?O.workspace_name:o.get(j)||"",seq:le+1,location_label:q.label,location_title:q.title,draggable:!Z,fixed:Z,done:B==="done",unplaced:G,mismatch:ie,..._e!==null?{queue_index:_e}:{}})}),b.forEach((K,le)=>{K.seq=le+1});let $=b.length>0&&b.every(K=>K.done),D=b.filter(K=>!K.fixed&&i.armed_by_bead.get(K.id)!==u).map(K=>K.id),W=Xg(u,m,b,$,D,i);a.push({lane_id:u,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:$,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(K=>K.mismatch||K.unplaced),unlaunched:D,...W})}),a}function Jg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function eb(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let d=`${l.root_dir}\0${l.id}`,u=o.get(d);if(u){u.cards.push(l);continue}let{scope:m,state:y}=Jg(l,t,n);y!==void 0&&(l.scope_state=y),o.set(d,{cards:[l],scope:m})}let i=new Map;for(let l of o.values()){let d=l.cards[0].scope_state;if(d!==void 0)for(let y of l.cards)y.scope_state=d;if(l.scope.length===0)continue;let u=l.cards[0].root_dir,m=i.get(u);m?m.push(l):i.set(u,[l])}let a=(l,d,u)=>{let m=d.cards[0],y={id:m.id,title:m.title,location_label:Vg(m.id,r,s),prefixes:u};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let l of i.values())for(let d=0;d<l.length;d+=1)for(let u=d+1;u<l.length;u+=1){let m=si(l[d].scope,l[u].scope);m.length!==0&&(a(l[d],l[u],m),a(l[u],l[d],m))}}function Ga(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function vi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Us(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...rs,...n&&n.candidate_filter?n.candidate_filter:{}},a=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Bs.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",d=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T);let u=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T.name||T.root_dir);let m=[],y=[],b=[],$=[],D=[],W=[],K=new Map,le=new Map,Y=new Map,j=new Map,O=new Map,B=new Map,Z=new Map,G=new Set,_e=new Map,q=new Map,V=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let oe=T.root_dir,Ee=T.name||oe,je=d.get(oe),Ze=je&&typeof je.revision=="number"?je.revision:typeof T.revision=="number"?T.revision:0,it=Bt(T.attempts),wt=Bt(T.bead_titles);for(let[P,N]of Object.entries(wt))typeof N=="string"&&N.length>0&&V.set(P,N);let at=Bt(T.bead_times),J=Bt(T.pr_observations),ee=Bt(T.admission),ke=Bt(T.revise_parked),qe=Bt(T.merge_queue_state),ut=Bt(T.cleanup_failed),Me=Bt(T.discard_operations),ze=Bt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&_e.set(oe,Bt(T.bead_scope));let gt=Bt(T.bead_workflow),mt=Bt(T.pr_activity),ht=Array.isArray(T.repo_operations)?T.repo_operations:[],Ut=Array.isArray(T.merge_queue)?T.merge_queue:[],Lt=new Set(Ut.filter(P=>P&&typeof P.bead_id=="string").map(P=>P.bead_id)),Yt=new Map(Ut.filter(P=>P&&typeof P.bead_id=="string").map(P=>[P.bead_id,P])),Mt=Array.isArray(T.queue)?T.queue:[];for(let P of[...Mt,...Array.isArray(T.pr_wait)?T.pr_wait:[]])P&&typeof P.bead_id=="string"&&typeof P.armed_by_lane=="string"&&P.armed_by_lane.length>0&&B.set(P.bead_id,P.armed_by_lane);for(let P of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof P=="string"&&P.length>0&&G.add(P);let Nt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(P=>P&&/^s[1-5]$/.test(P.id)&&Array.isArray(P.entries)),At=Bt(T.lane_states),Ge=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Nt.length);Y.set(oe,Ge),j.set(oe,Mt.length);let L=new Map(Nt.map(P=>[P.id,P])),Q=new Map;for(let P of Nt)for(let N of P.entries)N&&typeof N.bead_id=="string"&&Q.set(N.bead_id,P.id);for(let[P,N]of Object.entries(ze))Array.isArray(N)&&O.set(P,N.filter(ye=>typeof ye=="string"&&ye.length>0));let me=Array.isArray(T.done)?T.done:[];for(let P of me)P&&typeof P.bead_id=="string"&&W.push({id:P.bead_id,root_dir:oe,workspace_name:Ee});let E=new Map;for(let P of me)P&&typeof P.bead_id=="string"&&typeof P.added_at=="number"&&E.set(P.bead_id,P.added_at);let z=P=>({id:P,title:wt[P]||P,root_dir:oe,workspace_name:Ee,expected_revision:Ze,draggable:!1,...Bt(at[P]).created_at?{created_at:Bt(at[P]).created_at}:{},...Bt(at[P]).updated_at?{updated_at:Bt(at[P]).updated_at}:{}}),Le=P=>{let N=gt[P]?.chips?.pr;return N&&typeof N.number=="number"&&typeof N.url=="string"?{pr_number:N.number,pr_url:N.url}:{}},Ke=P=>Object.hasOwn(ze,P)?{blocked_by:Array.isArray(ze[P])?ze[P].filter(N=>typeof N=="string"&&N.length>0):[]}:{},Ae=new Set;for(let[P,N]of Gg(it,E)){Ae.add(P);let ye=N.run_state==="failed"?Zg(it,N.attempt_id):null;ye!==null&&Z.set(P,ye),y.push({...z(P),lane:"running",...Ke(P),...Q.has(P)?{serial_lane_id:Q.get(P)}:{},attempt_id:N.attempt_id,run_state:N.run_state,status:N.status||void 0,workflow:gt[P]||null,can_pause:N.can_pause,can_resume:N.can_resume,started_at:N.started_at,last_event_at:N.last_event_at,last_activity:N.last_activity,legs:N.legs,runner:N.runner,model:N.model,effort:N.effort,speed:N.speed,resumed_from:N.resumed_from,continuation_mode:N.continuation_mode,usage:N.usage,exec_chips:{orchestration:Ps(N),worker:null},discard:jn(Me,P,{attempt_id:N.attempt_id}),badges:N.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:N.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:N.run_state==="failed"})}for(let[P,N]of Vd(it)){if(y.some(we=>we.id===P))continue;let ye=N.attempt,et=N.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...z(P),lane:"running",kind:"session",...Ke(P),attempt_id:typeof ye.attempt_id=="string"?ye.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:gt[P]||null,can_pause:!1,can_resume:!1,started_at:N.started_at,last_event_at:typeof ye.last_event_at=="number"?ye.last_event_at:null,last_activity:ye.last_activity&&typeof ye.last_activity=="object"?ye.last_activity:null,legs:Array.isArray(ye.legs)?ye.legs:[],runner:typeof ye.runner=="string"?ye.runner:null,model:typeof ye.model=="string"?ye.model:null,effort:typeof ye.effort=="string"?ye.effort:null,speed:typeof ye.speed=="string"?ye.speed:null,resumed_from:null,continuation_mode:null,usage:ye.usage&&typeof ye.usage=="object"?ye.usage:null,exec_chips:{orchestration:Ps(ye),worker:null},discard:jn(Me,P,{merge_queued:!0}),badges:[N.origin==="auto"?`${et} \xB7 \uC790\uB3D9`:et],alert:!1})}for(let P of Array.isArray(T.session_active)?T.session_active:[]){let N=P&&P.bead_id;typeof N!="string"||Ae.has(N)||(Ae.add(N),Array.isArray(P.blocked_by)&&P.blocked_by.length>0&&O.set(N,P.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof P.title=="string"&&P.title.length>0&&V.set(N,P.title),y.push({...z(N),title:P.title||wt[N]||N,lane:"running",kind:"session",status:"in_progress",started_at:Ga(P.started_at)??Ga(P.updated_at)??void 0,updated_at:Ga(P.updated_at)??void 0,workflow:P.workflow||null,labels:Array.isArray(P.labels)?P.labels:[],spec_id:typeof P.spec_id=="string"?P.spec_id:"",blocked:P.blocked===!0,...Array.isArray(P.blocked_by)?{blocked_by:P.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(P.session_refs)?P.session_refs:[],badges:[],alert:!1}))}for(let P of Array.isArray(T.pr_wait)?T.pr_wait:[]){let N=P&&P.bead_id;if(typeof N!="string"||Ae.has(N))continue;Ae.add(N);let ye=Bt(J[N]),et=Bt(ye.pr),we=ye.gate?Bt(ye.gate):null,nt=Lt.has(N),pt=Yt.get(N)?.continuation_action||null,yt=!!pt&&pt.continuation===null,St=qe.active===N,Zt=P.external===!0,Tt=ut[N]||null,rn=Bt(mt[N]),Wt=Fs({bead_id:N,merge_sha:P.merge_sha,cleanup_cursor:P.cleanup_cursor,merge_progress:rn.merge_progress||null,cleanup_failed:Tt,repo_operations:ht}),hn=yi(Wt),Ve=!!we&&we.base_badge==="\uCDA9\uB3CC",Kt=!!Tt&&["child_sweep","branch_cleanup","parent_close"].includes(Tt.step)&&!!we&&we.tier==="merged",Xt=Zt&&!!Tt&&!!we&&we.tier==="merged",yn=!!we&&["closed_unmerged","review","undecidable"].includes(we.tier)&&we.reason!=="review_receipt_undetermined",fe=jn(Me,N,{external:Zt,merge_active:St||Wt?.step==="merge",merge_queued:nt,cleanup_active:hn,merged:!!Tt||we?.tier==="merged"}),A=!!fe.operation;b.push({...z(N),lane:"pr_wait",...Ke(N),workflow:gt[N]||null,pr_number:typeof et.number=="number"?et.number:null,pr_url:typeof et.url=="string"?et.url:void 0,external:Zt,usage:In(it,N),merge_step:Wt,badges:yt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Wt?[we?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Tt?[Cr(Tt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Cr(Tt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof we?.gate_badge=="string"&&we.gate_badge.length>0?[we.gate_badge]:[],alert:Wt?Wt.failed===!0:!!Tt||yn,reason:Tt&&Wt?.active!==!0?hi(Tt.step):"PR \uB300\uAE30",merge_action:we?.tier==="merged"&&!Kt&&!Xt?!1:!nt||yt,merge_enabled:!A&&(yt||we?.enabled===!0||Ve||Kt||Xt),merge_label:yt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Xt||Kt?"\uC815\uB9AC \uC7AC\uAC1C":Ve&&!Kt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:yt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Xt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Kt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:nt&&!yt,cancel_enabled:!St,continuation_mismatch:pt?.mismatch||null,discard:fe,discard_action:fe.action,discard_enabled:fe.enabled,discard_title:fe.title})}let ct=(P,N,ye,et)=>{let we=P&&P.bead_id;if(typeof we!="string"||Ae.has(we))return null;Ae.add(we);let nt=ke[we],pt=jn(Me,we),yt=pt.operation?pt:null,St={...z(we),lane:N,workflow:gt[we]||null,draggable:!yt,discard:yt||void 0,reason:Ru(ee,we),seq:ye+1,queue_position:ye+1,queue_index:ye,queue_length:et,badges:nt?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!nt,revise_action:!!nt,revise_enabled:!!nt&&!yt,revise_title:nt?nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Zt=Ke(we);return Object.hasOwn(Zt,"blocked_by")&&(St.blocked_by=Zt.blocked_by),St};for(let P=0;P<Mt.length;P++){let N=ct(Mt[P],"queue",P,Mt.length);if(!N)continue;$.push(N);let ye=K.get(oe);ye?ye.push(N):K.set(oe,[N])}let dt=P=>{let N=b.find(nt=>nt.id===P&&nt.root_dir===oe);if(N)return{id:P,title:N.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ye=y.find(nt=>nt.id===P&&nt.root_dir===oe),et=ye?ye.run_state:zg(it,P),we=et==="failed"||et==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":et==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:P,title:ye?ye.title:z(P).title,badge:we}},he=[];for(let P=0;P<Math.max(Ge,Nt.length);P++){let N=`s${P+1}`,ye=L.get(N),et=ye&&Array.isArray(ye.entries)?ye.entries:[],we=Bt(At[N]),nt=Array.isArray(we.occupied_by)?we.occupied_by.filter(St=>typeof St=="string"):[],pt=new Set(nt),yt=[];for(let St=0;St<et.length;St++){let Zt=et[St]&&et[St].bead_id;if(typeof Zt=="string"&&pt.has(Zt)){Ae.add(Zt);continue}let Tt=ct(et[St],N,St,et.length);Tt&&(yt.push(Tt),$.push(Tt))}yt.length===0&&nt.length===0&&(Ge<=1||P>=Ge)||he.push({id:N,index:P,items:yt,raw_length:et.length,occupied_by:nt,occupants:nt.map(St=>dt(St)),corrections:Array.isArray(we.corrections)?we.corrections.length:0,cycle:we.cycle===!0,...yt.length===0&&nt.length===0?{empty:!0}:{}})}le.set(oe,he);let st=Array.from({length:Ge},(P,N)=>{let ye=`s${N+1}`,et=L.get(ye),we=et&&Array.isArray(et.entries)?et.entries:[],nt=Bt(At[ye]);return{id:ye,index:we.length,length:we.length,occupied_by:Array.isArray(nt.occupied_by)?nt.occupied_by.filter(pt=>typeof pt=="string"):[]}});for(let P of Array.isArray(T.runnable)?T.runnable:[]){let N=P&&P.bead_id;if(typeof N!="string"||Ae.has(N))continue;Ae.add(N);let ye=P.workflow&&typeof P.workflow=="object"?P.workflow:null,et=ye&&typeof ye.route=="string"&&ye.route||(typeof P.route=="string"?P.route:null),we=Kg(Bt(je),P.exec_pins,et),nt=ts(P.rec,P.exec_pins);Array.isArray(P.blocked_by)&&P.blocked_by.length>0&&O.set(N,P.blocked_by.filter(pt=>typeof pt=="string"&&pt.length>0)),typeof P.title=="string"&&P.title.length>0&&V.set(N,P.title),Array.isArray(P.scope)&&q.set(N,P.scope.filter(pt=>typeof pt=="string"&&pt.length>0)),m.push({...z(N),title:P.title||wt[N]||N,lane:"runnable",draggable:!0,reason:Ru(ee,N),created_at:P.created_at??void 0,updated_at:P.updated_at??void 0,status:typeof P.status=="string"?P.status:void 0,labels:Array.isArray(P.labels)?P.labels:[],spec_id:typeof P.spec_id=="string"?P.spec_id:"",published:P.published===!0,workflow:ye||(et?{route:et,chips:{route:et}}:null),...we?{exec_chips:we}:{},...nt?{rec:nt}:{},blocked:P.blocked===!0,...Array.isArray(P.blocked_by)?{blocked_by:P.blocked_by.filter(pt=>typeof pt=="string"&&pt.length>0)}:{},place_index:Mt.length,place_lanes:st})}for(let P of me){let N=P&&P.bead_id;if(typeof N!="string"||Ae.has(N)||(Ae.add(N),o!==void 0&&typeof P.added_at=="number"&&P.added_at<o))continue;let ye=Hg(it,N),et=ye&&typeof ye.done_kind=="string"?ye.done_kind:null;D.push({...z(N),lane:"done",done:!0,done_layout:"three_line",usage:In(it,N),work_ms:ai(it,N),done_at:typeof P.added_at=="number"?P.added_at:void 0,done_kind:et,...Le(N),badges:[...et&&Cu[et]?[Cu[et]]:[],...ii(it,N)]})}}let ie=new Map;s.forEach((T,oe)=>{T&&typeof T.root_dir=="string"&&ie.set(T.root_dir,oe)});let te=n&&n.running_sort==="repo"?"repo":"started";y.sort((T,oe)=>{let Ee=T.kind==="session",je=oe.kind==="session";if(Ee!==je)return Ee?1:-1;if(Ee&&je){let wt=vi(oe.updated_at)-vi(T.updated_at);return wt!==0?wt:T.id.localeCompare(oe.id)}if(te==="repo"){let wt=ie.get(T.root_dir)??Number.MAX_SAFE_INTEGER,at=ie.get(oe.root_dir)??Number.MAX_SAFE_INTEGER;if(wt!==at)return wt-at}let Ze=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,it=typeof oe.started_at=="number"&&Number.isFinite(oe.started_at)?oe.started_at:null;return Ze!==null&&it!==null&&Ze!==it?Ze-it:Ze===null&&it!==null?1:Ze!==null&&it===null?-1:T.id.localeCompare(oe.id)}),D.sort((T,oe)=>(oe.done_at??0)-(T.done_at??0));let Se=s.length>0?s:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),Xe=new Set(m.map(T=>T.root_dir)),pe=[];for(let T of Se){if(!T||typeof T.root_dir!="string")continue;let oe=K.get(T.root_dir)||[],Ee=le.get(T.root_dir)||[];!(oe.length>0||Ee.some(Ze=>Ze.items.length>0||Ze.occupied_by.length>0))&&!Xe.has(T.root_dir)||pe.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=Tu?T.slots:Tu,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:Bt(T.runner_catalog),items:oe,sublanes:{parallel:oe,serial:Ee},serial_lane_count:Y.get(T.root_dir)||0,raw_queue_length:j.get(T.root_dir)||0})}let X={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:$,queue_groups:pe,running:y,pr_wait:b,done:D,parallel_rows:[],chain_lanes:[],cross_lanes_revision:a&&typeof a.revision=="number"?a.revision:null,cross_lanes_unreadable:a===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},Re=xu(X);for(let T of W)Re.has(T.id)||Re.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let oe=Re.get(T.id);T.blockers=(T.blocked_by||[]).map(Ee=>Au(Ee,oe,Re,s))}for(let T of[...X.queue,...X.runnable,...X.running,...X.pr_wait]){let oe=(T.blockers||[]).map(je=>{let Ze=Re.get(je.id)?.root_dir;return{...Wa(T.id,je),openable:!0,...typeof Ze=="string"&&Ze.length>0?{root_dir:Ze}:{}}});if(oe.length===0)continue;let Ee={predecessors:oe};T.dependency_chips=Ee}eb(X,_e,q,Re,s);let Ie=Su(X.queue_groups);for(let T of X.queue_groups)for(let oe of T.sublanes.serial){let Ee=Ie.get(Eu(T.root_dir,oe.id));Ee&&(oe.cross_wait_peers=Ee)}X.chain_lanes=Qg(a&&Array.isArray(a.lanes)?a.lanes:[],O,Re,s,V,u,{armed_by_bead:B,failed_by_bead:Z,disarmed_lanes:G});let S=new Map;for(let T of[...X.queue,...X.runnable])S.has(T.id)||S.set(T.id,T);let ne=new Set;for(let T of X.chain_lanes)for(let oe of T.rows){if(T.status==="confirmed"&&!oe.unplaced&&!oe.fixed&&ne.add(oe.id),!T.draft&&!oe.unplaced)continue;let Ee=S.get(oe.id);Ee&&(Ee.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let $e=new Map(X.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...X.queue,...X.running]){let oe=B.get(T.id);if(typeof oe!="string"||oe.length===0)continue;let Ee=$e.get(oe);T.armed_lane_chip=Ee===void 0?{lane_id:oe,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:oe,label:`\u25B6 \uC5F0\uACB0 ${Ee}`,orphan:!1}}let ve=[];for(let T of K.values())for(let oe of T)ne.has(oe.id)||ve.push(oe);ve.sort((T,oe)=>{let Ee=T.workspace_name.localeCompare(oe.workspace_name);return Ee!==0?Ee:(T.queue_index??0)-(oe.queue_index??0)}),X.parallel_rows=ve;let Ce={};for(let[T,oe]of Re)typeof oe.root_dir=="string"&&oe.root_dir.length>0&&(Ce[T]=oe.root_dir);for(let T of X.chain_lanes)for(let oe of T.rows)!Object.hasOwn(Ce,oe.id)&&oe.root_dir.length>0&&u.has(oe.root_dir)&&(Ce[oe.id]=oe.root_dir);X.owner_of=Ce;let ge=X.runnable.length;X.runnable_all=X.runnable.slice();let Pe=X.runnable;i.show_blocked||(Pe=Pe.filter(T=>T.blocked!==!0));let Ye=Pe.length;i.spec==="with"?Pe=Pe.filter(T=>T.published===!0):i.spec==="without"&&(Pe=Pe.filter(T=>T.published!==!0)),X.runnable_hidden={blocked:ge-Ye,spec:Ye-Pe.length};let $t=(T,oe)=>{let Ee=vi(oe.updated_at)-vi(T.updated_at);return Ee!==0?Ee:T.id.localeCompare(oe.id)},_t=l==="repo_spec"?(T,oe)=>{let Ee=T.published===!0?0:1,je=oe.published===!0?0:1;return Ee!==je?Ee-je:$t(T,oe)}:$t;if(l==="updated_flat")X.runnable=Pe.slice().sort($t),X.runnable_sections=[];else{let T=new Map;for(let je of Pe){let Ze=T.get(je.root_dir);Ze?Ze.push(je):T.set(je.root_dir,[je])}let oe=[],Ee=[];for(let je of Se){if(!je||typeof je.root_dir!="string")continue;let Ze=(T.get(je.root_dir)||[]).slice().sort(_t);T.delete(je.root_dir),Ze.length!==0&&(oe.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Ze.map(it=>({...it,workspace_name:""}))}),Ee.push(...Ze))}for(let[je,Ze]of T){let it=Ze.slice().sort(_t);oe.push({root_dir:je,name:it[0]?.workspace_name||je,items:it.map(wt=>({...wt,workspace_name:""}))}),Ee.push(...it)}X.runnable=Ee,X.runnable_sections=oe}return X}var tb="\uC0AC\uC774\uD074";function nb(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[o,i]of Object.entries(s))Array.isArray(i)&&t.set(o,n(i));for(let o of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])o&&typeof o.bead_id=="string"&&Array.isArray(o.blocked_by)&&o.blocked_by.length>0&&t.set(o.bead_id,n(o.blocked_by))}return t}function Va(e,t,n){let r=Us(e,t),s=[],o=new Set,i=(l,d)=>{for(let u of l)o.has(u.id)||(o.add(u.id),s.push({bead_id:u.id,root_dir:u.root_dir,workspace_name:u.workspace_name,title:u.title,lane:d}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let a=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:a===null?s:s.filter(l=>l.root_dir===a),blocked_by_map:nb(e)}}function Iu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||s.includes(i.bead_id))continue;let a=Ea(t.blocked_by_map,i.bead_id,e);o.push({...i,disabled:a,...a?{reason:tb}:{}})}return o.sort((i,a)=>{let l=r!==void 0&&i.root_dir===r,d=r!==void 0&&a.root_dir===r;return l!==d?l?-1:1:i.bead_id.localeCompare(a.bead_id)}),o}function Pu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Wu,setPrototypeOf:Du,isFrozen:rb,getPrototypeOf:sb,getOwnPropertyDescriptor:ob}=Object,{freeze:mn,seal:Pn,create:tl}=Object,{apply:nl,construct:rl}=typeof Reflect<"u"&&Reflect;mn||(mn=function(t){return t});Pn||(Pn=function(t){return t});nl||(nl=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});rl||(rl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var wi=gn(Array.prototype.forEach),ib=gn(Array.prototype.lastIndexOf),Mu=gn(Array.prototype.pop),Ws=gn(Array.prototype.push),ab=gn(Array.prototype.splice),$i=gn(String.prototype.toLowerCase),Ya=gn(String.prototype.toString),Za=gn(String.prototype.match),zs=gn(String.prototype.replace),lb=gn(String.prototype.indexOf),cb=gn(String.prototype.trim),Un=gn(Object.prototype.hasOwnProperty),_n=gn(RegExp.prototype.test),Hs=db(TypeError);function gn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return nl(e,t,r)}}function db(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return rl(e,n)}}function vt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:$i;Du&&Du(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(rb(t)||(t[r]=o),s=o)}e[s]=!0}return e}function ub(e){for(let t=0;t<e.length;t++)Un(e,t)||(e[t]=null);return e}function sr(e){let t=tl(null);for(let[n,r]of Wu(e))Un(e,n)&&(Array.isArray(r)?t[n]=ub(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=sr(r):t[n]=r);return t}function Gs(e,t){for(;e!==null;){let r=ob(e,t);if(r){if(r.get)return gn(r.get);if(typeof r.value=="function")return gn(r.value)}e=sb(e)}function n(){return null}return n}var Nu=mn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Xa=mn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Qa=mn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pb=mn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ja=mn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fb=mn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),qu=mn(["#text"]),Fu=mn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),el=mn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ju=mn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ki=mn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),_b=Pn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mb=Pn(/<%[\w\W]*|[\w\W]*%>/gm),gb=Pn(/\$\{[\w\W]*/gm),bb=Pn(/^data-[\-\w.\u00B7-\uFFFF]+$/),hb=Pn(/^aria-[\-\w]+$/),zu=Pn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yb=Pn(/^(?:\w+script|data):/i),vb=Pn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Hu=Pn(/^html$/i),wb=Pn(/^[a-z][.\w]*(-[.\w]+)+$/i),Bu=Object.freeze({__proto__:null,ARIA_ATTR:hb,ATTR_WHITESPACE:vb,CUSTOM_ELEMENT:wb,DATA_ATTR:bb,DOCTYPE_NAME:Hu,ERB_EXPR:mb,IS_ALLOWED_URI:zu,IS_SCRIPT_OR_DATA:yb,MUSTACHE_EXPR:_b,TMPLIT_EXPR:gb}),Ks={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},kb=function(){return typeof window>"u"?null:window},$b=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Uu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:kb(),t=fe=>Gu(fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ks.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:y,trustedTypes:b}=e,$=l.prototype,D=Gs($,"cloneNode"),W=Gs($,"remove"),K=Gs($,"nextSibling"),le=Gs($,"childNodes"),Y=Gs($,"parentNode");if(typeof i=="function"){let fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let j,O="",{implementation:B,createNodeIterator:Z,createDocumentFragment:G,getElementsByTagName:_e}=n,{importNode:q}=r,V=Uu();t.isSupported=typeof Wu=="function"&&typeof Y=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:te,TMPLIT_EXPR:Se,DATA_ATTR:Xe,ARIA_ATTR:pe,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:Re,CUSTOM_ELEMENT:Ie}=Bu,{IS_ALLOWED_URI:S}=Bu,ne=null,$e=vt({},[...Nu,...Xa,...Qa,...Ja,...qu]),ve=null,Ce=vt({},[...Fu,...el,...ju,...ki]),ge=Object.seal(tl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,Ye=null,$t=Object.seal(tl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Dt=!0,_t=!0,T=!1,oe=!0,Ee=!1,je=!0,Ze=!1,it=!1,wt=!1,at=!1,J=!1,ee=!1,ke=!0,qe=!1,ut="user-content-",Me=!0,ze=!1,gt={},mt=null,ht=vt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ut=null,Lt=vt({},["audio","video","img","source","image","track"]),Yt=null,Mt=vt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",At="http://www.w3.org/2000/svg",Ge="http://www.w3.org/1999/xhtml",L=Ge,Q=!1,me=null,E=vt({},[Nt,At,Ge],Ya),z=vt({},["mi","mo","mn","ms","mtext"]),Le=vt({},["annotation-xml"]),Ke=vt({},["title","style","font","a","script"]),Ae=null,ct=["application/xhtml+xml","text/html"],dt="text/html",he=null,st=null,P=n.createElement("form"),N=function(A){return A instanceof RegExp||A instanceof Function},ye=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(st&&st===A)){if((!A||typeof A!="object")&&(A={}),A=sr(A),Ae=ct.indexOf(A.PARSER_MEDIA_TYPE)===-1?dt:A.PARSER_MEDIA_TYPE,he=Ae==="application/xhtml+xml"?Ya:$i,ne=Un(A,"ALLOWED_TAGS")?vt({},A.ALLOWED_TAGS,he):$e,ve=Un(A,"ALLOWED_ATTR")?vt({},A.ALLOWED_ATTR,he):Ce,me=Un(A,"ALLOWED_NAMESPACES")?vt({},A.ALLOWED_NAMESPACES,Ya):E,Yt=Un(A,"ADD_URI_SAFE_ATTR")?vt(sr(Mt),A.ADD_URI_SAFE_ATTR,he):Mt,Ut=Un(A,"ADD_DATA_URI_TAGS")?vt(sr(Lt),A.ADD_DATA_URI_TAGS,he):Lt,mt=Un(A,"FORBID_CONTENTS")?vt({},A.FORBID_CONTENTS,he):ht,Pe=Un(A,"FORBID_TAGS")?vt({},A.FORBID_TAGS,he):sr({}),Ye=Un(A,"FORBID_ATTR")?vt({},A.FORBID_ATTR,he):sr({}),gt=Un(A,"USE_PROFILES")?A.USE_PROFILES:!1,Dt=A.ALLOW_ARIA_ATTR!==!1,_t=A.ALLOW_DATA_ATTR!==!1,T=A.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=A.SAFE_FOR_TEMPLATES||!1,je=A.SAFE_FOR_XML!==!1,Ze=A.WHOLE_DOCUMENT||!1,at=A.RETURN_DOM||!1,J=A.RETURN_DOM_FRAGMENT||!1,ee=A.RETURN_TRUSTED_TYPE||!1,wt=A.FORCE_BODY||!1,ke=A.SANITIZE_DOM!==!1,qe=A.SANITIZE_NAMED_PROPS||!1,Me=A.KEEP_CONTENT!==!1,ze=A.IN_PLACE||!1,S=A.ALLOWED_URI_REGEXP||zu,L=A.NAMESPACE||Ge,z=A.MATHML_TEXT_INTEGRATION_POINTS||z,Le=A.HTML_INTEGRATION_POINTS||Le,ge=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&N(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&N(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(_t=!1),J&&(at=!0),gt&&(ne=vt({},qu),ve=[],gt.html===!0&&(vt(ne,Nu),vt(ve,Fu)),gt.svg===!0&&(vt(ne,Xa),vt(ve,el),vt(ve,ki)),gt.svgFilters===!0&&(vt(ne,Qa),vt(ve,el),vt(ve,ki)),gt.mathMl===!0&&(vt(ne,Ja),vt(ve,ju),vt(ve,ki))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?$t.tagCheck=A.ADD_TAGS:(ne===$e&&(ne=sr(ne)),vt(ne,A.ADD_TAGS,he))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?$t.attributeCheck=A.ADD_ATTR:(ve===Ce&&(ve=sr(ve)),vt(ve,A.ADD_ATTR,he))),A.ADD_URI_SAFE_ATTR&&vt(Yt,A.ADD_URI_SAFE_ATTR,he),A.FORBID_CONTENTS&&(mt===ht&&(mt=sr(mt)),vt(mt,A.FORBID_CONTENTS,he)),Me&&(ne["#text"]=!0),Ze&&vt(ne,["html","head","body"]),ne.table&&(vt(ne,["tbody"]),delete Pe.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw Hs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Hs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=A.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=$b(b,s)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));mn&&mn(A),st=A}},et=vt({},[...Xa,...Qa,...pb]),we=vt({},[...Ja,...fb]),nt=function(A){let ue=Y(A);(!ue||!ue.tagName)&&(ue={namespaceURI:L,tagName:"template"});let Oe=$i(A.tagName),kt=$i(ue.tagName);return me[A.namespaceURI]?A.namespaceURI===At?ue.namespaceURI===Ge?Oe==="svg":ue.namespaceURI===Nt?Oe==="svg"&&(kt==="annotation-xml"||z[kt]):!!et[Oe]:A.namespaceURI===Nt?ue.namespaceURI===Ge?Oe==="math":ue.namespaceURI===At?Oe==="math"&&Le[kt]:!!we[Oe]:A.namespaceURI===Ge?ue.namespaceURI===At&&!Le[kt]||ue.namespaceURI===Nt&&!z[kt]?!1:!we[Oe]&&(Ke[Oe]||!et[Oe]):!!(Ae==="application/xhtml+xml"&&me[A.namespaceURI]):!1},pt=function(A){Ws(t.removed,{element:A});try{Y(A).removeChild(A)}catch{W(A)}},yt=function(A,ue){try{Ws(t.removed,{attribute:ue.getAttributeNode(A),from:ue})}catch{Ws(t.removed,{attribute:null,from:ue})}if(ue.removeAttribute(A),A==="is")if(at||J)try{pt(ue)}catch{}else try{ue.setAttribute(A,"")}catch{}},St=function(A){let ue=null,Oe=null;if(wt)A="<remove></remove>"+A;else{let Et=Za(A,/^[\r\n\t ]+/);Oe=Et&&Et[0]}Ae==="application/xhtml+xml"&&L===Ge&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let kt=j?j.createHTML(A):A;if(L===Ge)try{ue=new y().parseFromString(kt,Ae)}catch{}if(!ue||!ue.documentElement){ue=B.createDocument(L,"template",null);try{ue.documentElement.innerHTML=Q?O:kt}catch{}}let Rt=ue.body||ue.documentElement;return A&&Oe&&Rt.insertBefore(n.createTextNode(Oe),Rt.childNodes[0]||null),L===Ge?_e.call(ue,Ze?"html":"body")[0]:Ze?ue.documentElement:Rt},Zt=function(A){return Z.call(A.ownerDocument||A,A,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Tt=function(A){return A instanceof m&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof u)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},rn=function(A){return typeof a=="function"&&A instanceof a};function Wt(fe,A,ue){wi(fe,Oe=>{Oe.call(t,A,ue,st)})}let hn=function(A){let ue=null;if(Wt(V.beforeSanitizeElements,A,null),Tt(A))return pt(A),!0;let Oe=he(A.nodeName);if(Wt(V.uponSanitizeElement,A,{tagName:Oe,allowedTags:ne}),je&&A.hasChildNodes()&&!rn(A.firstElementChild)&&_n(/<[/\w!]/g,A.innerHTML)&&_n(/<[/\w!]/g,A.textContent)||A.nodeType===Ks.progressingInstruction||je&&A.nodeType===Ks.comment&&_n(/<[/\w]/g,A.data))return pt(A),!0;if(!($t.tagCheck instanceof Function&&$t.tagCheck(Oe))&&(!ne[Oe]||Pe[Oe])){if(!Pe[Oe]&&Kt(Oe)&&(ge.tagNameCheck instanceof RegExp&&_n(ge.tagNameCheck,Oe)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Oe)))return!1;if(Me&&!mt[Oe]){let kt=Y(A)||A.parentNode,Rt=le(A)||A.childNodes;if(Rt&&kt){let Et=Rt.length;for(let Vt=Et-1;Vt>=0;--Vt){let on=D(Rt[Vt],!0);on.__removalCount=(A.__removalCount||0)+1,kt.insertBefore(on,K(A))}}}return pt(A),!0}return A instanceof l&&!nt(A)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&_n(/<\/no(script|embed|frames)/i,A.innerHTML)?(pt(A),!0):(Ee&&A.nodeType===Ks.text&&(ue=A.textContent,wi([ie,te,Se],kt=>{ue=zs(ue,kt," ")}),A.textContent!==ue&&(Ws(t.removed,{element:A.cloneNode()}),A.textContent=ue)),Wt(V.afterSanitizeElements,A,null),!1)},Ve=function(A,ue,Oe){if(ke&&(ue==="id"||ue==="name")&&(Oe in n||Oe in P))return!1;if(!(_t&&!Ye[ue]&&_n(Xe,ue))){if(!(Dt&&_n(pe,ue))){if(!($t.attributeCheck instanceof Function&&$t.attributeCheck(ue,A))){if(!ve[ue]||Ye[ue]){if(!(Kt(A)&&(ge.tagNameCheck instanceof RegExp&&_n(ge.tagNameCheck,A)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(A))&&(ge.attributeNameCheck instanceof RegExp&&_n(ge.attributeNameCheck,ue)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(ue,A))||ue==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&_n(ge.tagNameCheck,Oe)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Oe))))return!1}else if(!Yt[ue]){if(!_n(S,zs(Oe,Re,""))){if(!((ue==="src"||ue==="xlink:href"||ue==="href")&&A!=="script"&&lb(Oe,"data:")===0&&Ut[A])){if(!(T&&!_n(X,zs(Oe,Re,"")))){if(Oe)return!1}}}}}}}return!0},Kt=function(A){return A!=="annotation-xml"&&Za(A,Ie)},Xt=function(A){Wt(V.beforeSanitizeAttributes,A,null);let{attributes:ue}=A;if(!ue||Tt(A))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},kt=ue.length;for(;kt--;){let Rt=ue[kt],{name:Et,namespaceURI:Vt,value:on}=Rt,an=he(Et),Sn=on,It=Et==="value"?Sn:cb(Sn);if(Oe.attrName=an,Oe.attrValue=It,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,Wt(V.uponSanitizeAttribute,A,Oe),It=Oe.attrValue,qe&&(an==="id"||an==="name")&&(yt(Et,A),It=ut+It),je&&_n(/((--!?|])>)|<\/(style|title|textarea)/i,It)){yt(Et,A);continue}if(an==="attributename"&&Za(It,"href")){yt(Et,A);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){yt(Et,A);continue}if(!oe&&_n(/\/>/i,It)){yt(Et,A);continue}Ee&&wi([ie,te,Se],pn=>{It=zs(It,pn," ")});let ln=he(A.nodeName);if(!Ve(ln,an,It)){yt(Et,A);continue}if(j&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Vt)switch(b.getAttributeType(ln,an)){case"TrustedHTML":{It=j.createHTML(It);break}case"TrustedScriptURL":{It=j.createScriptURL(It);break}}if(It!==Sn)try{Vt?A.setAttributeNS(Vt,Et,It):A.setAttribute(Et,It),Tt(A)?pt(A):Mu(t.removed)}catch{yt(Et,A)}}Wt(V.afterSanitizeAttributes,A,null)},yn=function fe(A){let ue=null,Oe=Zt(A);for(Wt(V.beforeSanitizeShadowDOM,A,null);ue=Oe.nextNode();)Wt(V.uponSanitizeShadowNode,ue,null),hn(ue),Xt(ue),ue.content instanceof o&&fe(ue.content);Wt(V.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(fe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ue=null,Oe=null,kt=null,Rt=null;if(Q=!fe,Q&&(fe="<!-->"),typeof fe!="string"&&!rn(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Hs("dirty is not a string, aborting")}else throw Hs("toString is not a function");if(!t.isSupported)return fe;if(it||ye(A),t.removed=[],typeof fe=="string"&&(ze=!1),ze){if(fe.nodeName){let on=he(fe.nodeName);if(!ne[on]||Pe[on])throw Hs("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof a)ue=St("<!---->"),Oe=ue.ownerDocument.importNode(fe,!0),Oe.nodeType===Ks.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?ue=Oe:ue.appendChild(Oe);else{if(!at&&!Ee&&!Ze&&fe.indexOf("<")===-1)return j&&ee?j.createHTML(fe):fe;if(ue=St(fe),!ue)return at?null:ee?O:""}ue&&wt&&pt(ue.firstChild);let Et=Zt(ze?fe:ue);for(;kt=Et.nextNode();)hn(kt),Xt(kt),kt.content instanceof o&&yn(kt.content);if(ze)return fe;if(at){if(J)for(Rt=G.call(ue.ownerDocument);ue.firstChild;)Rt.appendChild(ue.firstChild);else Rt=ue;return(ve.shadowroot||ve.shadowrootmode)&&(Rt=q.call(r,Rt,!0)),Rt}let Vt=Ze?ue.outerHTML:ue.innerHTML;return Ze&&ne["!doctype"]&&ue.ownerDocument&&ue.ownerDocument.doctype&&ue.ownerDocument.doctype.name&&_n(Hu,ue.ownerDocument.doctype.name)&&(Vt="<!DOCTYPE "+ue.ownerDocument.doctype.name+`>
`+Vt),Ee&&wi([ie,te,Se],on=>{Vt=zs(Vt,on," ")}),j&&ee?j.createHTML(Vt):Vt},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ye(fe),it=!0},t.clearConfig=function(){st=null,it=!1},t.isValidAttribute=function(fe,A,ue){st||ye({});let Oe=he(fe),kt=he(A);return Ve(Oe,kt,ue)},t.addHook=function(fe,A){typeof A=="function"&&Ws(V[fe],A)},t.removeHook=function(fe,A){if(A!==void 0){let ue=ib(V[fe],A);return ue===-1?void 0:ab(V[fe],ue,1)[0]}return Mu(V[fe])},t.removeHooks=function(fe){V[fe]=[]},t.removeAllHooks=function(){V=Uu()},t}var Ku=Gu();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xi=e=>(...t)=>({_$litDirective$:e,values:t}),ss=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Vs=class extends ss{constructor(t){if(super(t),this.it=Ht,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ht||t==null)return this._t=void 0,this.it=t;if(t===Ln)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Vs.directiveName="unsafeHTML",Vs.resultType=1;var Vu=xi(Vs);function al(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=al();function tp(e){Or=e}var Qs={exec:()=>null};function xt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(bn.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var xb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ab=/^(?:[ \t]*(?:\n|$))+/,Sb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Eb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Js=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ll=/(?:[*+-]|\d{1,9}[.)])/,np=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,rp=xt(np).replace(/bull/g,ll).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Cb=xt(np).replace(/bull/g,ll).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),cl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Rb=/^[^\n]+/,dl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ob=xt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",dl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Lb=xt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ll).getRegex(),Ri="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ul=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ib=xt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ul).replace("tag",Ri).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sp=xt(cl).replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ri).getRegex(),Pb=xt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sp).getRegex(),pl={blockquote:Pb,code:Sb,def:Ob,fences:Eb,heading:Tb,hr:Js,html:Ib,lheading:rp,list:Lb,newline:Ab,paragraph:sp,table:Qs,text:Rb},Yu=xt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ri).getRegex(),Db={...pl,lheading:Cb,table:Yu,paragraph:xt(cl).replace("hr",Js).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ri).getRegex()},Mb={...pl,html:xt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ul).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:xt(cl).replace("hr",Js).replace("heading",` *#{1,6} *[^
]`).replace("lheading",rp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Nb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,op=/^( {2,}|\\)\n(?!\s*$)/,Fb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Oi=/[\p{P}\p{S}]/u,fl=/[\s\p{P}\p{S}]/u,ip=/[^\s\p{P}\p{S}]/u,jb=xt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,fl).getRegex(),ap=/(?!~)[\p{P}\p{S}]/u,Bb=/(?!~)[\s\p{P}\p{S}]/u,Ub=/(?:[^\s\p{P}\p{S}]|~)/u,Wb=xt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",xb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zb=xt(lp,"u").replace(/punct/g,Oi).getRegex(),Hb=xt(lp,"u").replace(/punct/g,ap).getRegex(),cp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gb=xt(cp,"gu").replace(/notPunctSpace/g,ip).replace(/punctSpace/g,fl).replace(/punct/g,Oi).getRegex(),Kb=xt(cp,"gu").replace(/notPunctSpace/g,Ub).replace(/punctSpace/g,Bb).replace(/punct/g,ap).getRegex(),Vb=xt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ip).replace(/punctSpace/g,fl).replace(/punct/g,Oi).getRegex(),Yb=xt(/\\(punct)/,"gu").replace(/punct/g,Oi).getRegex(),Zb=xt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xb=xt(ul).replace("(?:-->|$)","-->").getRegex(),Qb=xt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ei=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Jb=xt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ei).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),dp=xt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ei).replace("ref",dl).getRegex(),up=xt(/^!?\[(ref)\](?:\[\])?/).replace("ref",dl).getRegex(),eh=xt("reflink|nolink(?!\\()","g").replace("reflink",dp).replace("nolink",up).getRegex(),Zu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,_l={_backpedal:Qs,anyPunctuation:Yb,autolink:Zb,blockSkip:Wb,br:op,code:qb,del:Qs,emStrongLDelim:zb,emStrongRDelimAst:Gb,emStrongRDelimUnd:Vb,escape:Nb,link:Jb,nolink:up,punctuation:jb,reflink:dp,reflinkSearch:eh,tag:Qb,text:Fb,url:Qs},th={..._l,link:xt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ei).getRegex(),reflink:xt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ei).getRegex()},sl={..._l,emStrongRDelimAst:Kb,emStrongLDelim:Hb,url:xt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:xt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zu).getRegex()},nh={...sl,br:xt(op).replace("{2,}","*").getRegex(),text:xt(sl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ai={normal:pl,gfm:Db,pedantic:Mb},Ys={normal:_l,gfm:sl,breaks:nh,pedantic:th},rh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xu=e=>rh[e];function ir(e,t){if(t){if(bn.escapeTest.test(e))return e.replace(bn.escapeReplace,Xu)}else if(bn.escapeTestNoEncode.test(e))return e.replace(bn.escapeReplaceNoEncode,Xu);return e}function Qu(e){try{e=encodeURI(e).replace(bn.percentDecode,"%")}catch{return null}return e}function Ju(e,t){let n=e.replace(bn.findPipe,(o,i,a)=>{let l=!1,d=i;for(;--d>=0&&a[d]==="\\";)l=!l;return l?"|":" |"}),r=n.split(bn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(bn.slashPipe,"|");return r}function Zs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function sh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ep(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function oh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ti=class{constructor(e){Pt(this,"options");Pt(this,"rules");Pt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Zs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=oh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Zs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Zs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Zs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let d=a.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${u}`:u;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=m,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,$=b.raw+`
`+n.join(`
`),D=this.blockquote($);o[o.length-1]=D,r=r.substring(0,r.length-b.raw.length)+D.raw,s=s.substring(0,s.length-b.text.length)+D.text;break}else if(y?.type==="list"){let b=y,$=b.raw+`
`+n.join(`
`),D=this.list($);o[o.length-1]=D,r=r.substring(0,r.length-y.raw.length)+D.raw,s=s.substring(0,s.length-b.raw.length)+D.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,d="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),y=e.split(`
`,1)[0],b=!m.trim(),$=0;if(this.options.pedantic?($=2,u=m.trimStart()):b?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,u=m.slice($),$+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),l=!0),!l){let D=this.rules.other.nextBulletRegex($),W=this.rules.other.hrRegex($),K=this.rules.other.fencesBeginRegex($),le=this.rules.other.headingBeginRegex($),Y=this.rules.other.htmlBeginRegex($);for(;e;){let j=e.split(`
`,1)[0],O;if(y=j,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),O=y):O=y.replace(this.rules.other.tabCharGlobal,"    "),K.test(y)||le.test(y)||Y.test(y)||D.test(y)||W.test(y))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!y.trim())u+=`
`+O.slice($);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(m)||le.test(m)||W.test(m))break;u+=`
`+y}!b&&!y.trim()&&(b=!0),d+=j+`
`,e=e.substring(j.length+1),m=O.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=d}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=u.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=u.raw+l.tokens[0].raw,l.tokens[0].text=u.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(u)):l.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):l.tokens.unshift(u)}}if(!s.loose){let d=l.tokens.filter(m=>m.type==="space"),u=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=u}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ju(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ju(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Zs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=sh(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ep(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return ep(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let u=[...r[0]][0].length,m=e.slice(0,s+r.index+u+i);if(Math.min(s,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Wn=class ol{constructor(t){Pt(this,"tokens");Pt(this,"options");Pt(this,"state");Pt(this,"inlineQueue");Pt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new Ti,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:bn,block:Ai.normal,inline:Ys.normal};this.options.pedantic?(n.block=Ai.pedantic,n.inline=Ys.pedantic):this.options.gfm&&(n.block=Ai.gfm,this.options.breaks?n.inline=Ys.breaks:n.inline=Ys.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ai,inline:Ys}}static lex(t,n){return new ol(n).lex(t)}static lexInline(t,n){return new ol(n).inlineTokens(t)}lex(t){t=t.replace(bn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(bn.tabCharGlobal,"    ").replace(bn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(u=>(l=u.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let u=n.at(-1);l.type==="text"&&u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,m=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},m),typeof y=="number"&&y>=0&&(u=Math.min(u,y))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let u=n.at(-1);u?.type==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Ci=class{constructor(e){Pt(this,"options");Pt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(bn.notSpaceStart)?.[0],s=e.replace(bn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ir(r)+'">'+(n?s:ir(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:ir(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Qu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ir(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Qu(e);if(s===null)return ir(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${ir(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},ml=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},zn=class il{constructor(t){Pt(this,"options");Pt(this,"renderer");Pt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new Ci,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ml}static parse(t,n){return new il(n).parse(t)}static parseInline(t,n){return new il(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},Si,Xs=(Si=class{constructor(e){Pt(this,"options");Pt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Wn.lex:Wn.lexInline}provideParser(){return this.block?zn.parse:zn.parseInline}},Pt(Si,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Pt(Si,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Si),ih=class{constructor(...e){Pt(this,"defaults",al());Pt(this,"options",this.setOptions);Pt(this,"parse",this.parseMarkdown(!0));Pt(this,"parseInline",this.parseMarkdown(!1));Pt(this,"Parser",zn);Pt(this,"Renderer",Ci);Pt(this,"TextRenderer",ml);Pt(this,"Lexer",Wn);Pt(this,"Tokenizer",Ti);Pt(this,"Hooks",Xs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ci(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...d)=>{let u=a.apply(s,d);return u===!1&&(u=l.apply(s,d)),u||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Ti(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...d)=>{let u=a.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Xs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];Xs.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Xs.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await a.call(s,d);return l.call(s,m)})();let u=a.call(s,d);return l.call(s,u)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await a.apply(s,d);return m===!1&&(m=await l.apply(s,d)),m})();let u=a.apply(s,d);return u===!1&&(u=l.apply(s,d)),u}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Wn.lex(e,t??this.defaults)}parser(e,t){return zn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Wn.lex:Wn.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?zn.parse:zn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Wn.lex:Wn.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?zn.parse:zn.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Rr=new ih;function Ct(e,t){return Rr.parse(e,t)}Ct.options=Ct.setOptions=function(e){return Rr.setOptions(e),Ct.defaults=Rr.defaults,tp(Ct.defaults),Ct};Ct.getDefaults=al;Ct.defaults=Or;Ct.use=function(...e){return Rr.use(...e),Ct.defaults=Rr.defaults,tp(Ct.defaults),Ct};Ct.walkTokens=function(e,t){return Rr.walkTokens(e,t)};Ct.parseInline=Rr.parseInline;Ct.Parser=zn;Ct.parser=zn.parse;Ct.Renderer=Ci;Ct.TextRenderer=ml;Ct.Lexer=Wn;Ct.lexer=Wn.lex;Ct.Tokenizer=Ti;Ct.Hooks=Xs;Ct.parse=Ct;var Y$=Ct.options,Z$=Ct.setOptions,X$=Ct.use,Q$=Ct.walkTokens,J$=Ct.parseInline;var ex=zn.parse,tx=Wn.lex;function mr(e){let t=Ct.parse(e),n=Ku.sanitize(t);return Vu(n)}function ar(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function os(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Li(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var fp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ah={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},lh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ch=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Hn(e){return!!e&&typeof e=="object"}function gl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function bl(e,t){let n=gl(e),r=gl(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function _p(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Hn(s)&&typeof s.text=="string"?s.text:"").join(""):Hn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function dh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:fp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=gl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=bl(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=bl(Hn(a)?a.old_string:"",Hn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function hl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var uh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function mp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Hn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(uh,"").trim();return n.length>0?{kind:"user",text:n}:null}function yl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=lh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ch.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ph(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function fh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let i of s)if(Hn(i)){if(i.type==="text"&&typeof i.text=="string")o.push(yl(i.text));else if(i.type==="thinking"){let a=hl(i.thinking);a&&o.push(a)}else if(i.type==="tool_use"){let a=dh(i);typeof i.id=="string"&&t.set(i.id,a),o.push(a)}}return n?pp(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let i of s)if(Hn(i)&&i.type==="tool_result"){let a=t.get(String(i.tool_use_id));if(a){let l=_p(i.content);a.result=l,a.output=typeof i.content=="string"?i.content:l,i.is_error===!0&&(a.is_error=!0)}}let o=mp(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?pp([s],n):[s]}return[]}function pp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function _h(e){let t=typeof e.command=="string"?e.command:"",n=_p(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:fp.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function mh(e){if(e.type==="item.completed"&&Hn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[yl(t.text)];if(t.type==="user_message"){let n=mp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=hl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[_h(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function gh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Hn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Hn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[yl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let a=hl(n.text);return a?[a]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ah[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",i={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${s}`,i.icon=o,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function bh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function hh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Hn(t)?t:null}function gp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=hh(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return ph(o,r);let i=o.schema==="codex-delegation-monitor-v1"?gh(o):bh(o)?mh(o):fh(o,n);return i.length>0&&(r.progress=null),i}}}function vl(e){let t=[],n=gp(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var yh=5,vh=10,wh=/Task\s+#(\d+)/,kh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,$h=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function eo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function xh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ah(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Sh(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=wh.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Eh(e){if(e.tool==="Bash"){let t=e.command||"";return kh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":$h.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Th(e){let t=e.filter(s=>s.kind==="tool").slice(-vh),n=new Map;t.forEach((s,o)=>{let i=Eh(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Ch(e){let t=Ah(e);if(t)return{text:t,guess:!1};let n=Sh(e);if(n)return{text:n,guess:!1};let r=Th(e);return r?{text:r,guess:!0}:null}function Rh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:kn(e,t)}function is(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i=null,a=null,l=null,d=null,u=!1,m={},y=!0,b=new Set,$=new Set,D=null,W=null,K=!1,le=!1,Y=!1,j=null,O=null;function B(){K=!1,le=!1,Y=!1,j=null,O=null}async function Z(J){if(n){le=!0,Y=!1,Pe();try{let ee=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...d?{root_dir:d}:{}}));if(o!==J)return;!ee||typeof ee!="object"||Array.isArray(ee)?Y=!0:(j=ee,O=J)}catch{o===J&&(Y=!0)}finally{o===J&&(le=!1,Pe())}}}function G(){if(K=!K,K&&o&&O!==o){Z(o);return}Pe()}function _e(){if(!K)return"";let J=os({loading:le,error:Y});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=Li(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?c`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function q(){if(!l||!r)return[];let J=r.get(l);return vl(J?J.lines:[])}function V(){if(!l||!r)return null;let J=r.get(l),ee=J?J.last_event_at:null;return typeof ee=="number"?ee:null}function ie(){return m.status==="running"}function te(){if(ie()&&o){W||(W=setInterval(()=>Pe(),1e3));return}Se()}function Se(){W&&(clearInterval(W),W=null)}function Xe(J){let ee=[],ke=0;for(;ke<J.length;){let{idx:qe,line:ut}=J[ke];if(ut.kind==="tool"){let Me=ke;for(;Me<J.length&&J[Me].line.kind==="tool"&&J[Me].line.tool===ut.tool;)Me+=1;if(Me-ke>=yh&&!$.has(qe)){ee.push({kind:"group",idx:qe,tool:ut.tool||"",lines:J.slice(ke,Me)}),ke=Me;continue}}ee.push({kind:"line",idx:qe,line:ut}),ke+=1}return ee}function pe(J){let ee=[],ke=new Map;for(let Me=0;Me<J.length;Me+=1){let ze=J[Me],gt=ze.parent_tool_use_id;if(typeof gt=="string"&&gt.length>0){let mt=ke.get(gt);mt||(mt={kind:"subagent",idx:Me,launch_id:gt,agent_type:null,header:null,lines:[]},ke.set(gt,mt),ee.push(mt)),mt.lines.push({idx:Me,line:ze});continue}if(ze.kind==="tool"&&ze.tool==="Agent"&&typeof ze.launch_id=="string"&&ze.launch_id.length>0){let mt=X(ze),ht=ke.get(ze.launch_id);if(ht){ht.header={idx:Me,line:ze},ht.agent_type=mt;continue}let Ut={kind:"subagent",idx:Me,launch_id:ze.launch_id,agent_type:mt,header:{idx:Me,line:ze},lines:[]};ke.set(ze.launch_id,Ut),ee.push(Ut);continue}ee.push({kind:"entry",idx:Me,line:ze})}let qe=[],ut=0;for(;ut<ee.length;){if(ee[ut].kind!=="entry"){qe.push(ee[ut]),ut+=1;continue}let Me=ut;for(;Me<ee.length&&ee[Me].kind==="entry";)Me+=1;qe.push(...Xe(ee.slice(ut,Me))),ut=Me}return qe}function X(J){let ee=J.input;return ee&&typeof ee.subagent_type=="string"?ee.subagent_type:null}function Re(J){for(let ee=J.length-1;ee>=0;ee-=1){let ke=J[ee];if(ke.kind==="result"||ke.kind==="error")return null;if(ke.kind==="tool"&&!Object.hasOwn(ke,"result"))return ke}return null}function Ie(J){for(let ee=J.length-1;ee>=0;ee-=1)if(J[ee].kind==="thinking")return J[ee];return null}function S(J,ee){if(ee.kind==="gate")return c`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return c`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return c`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let ke=b.has(J);return c`<div
        class="sv__think${ke?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>$t(J)}
      >
        <span class="sv__think-line">💭 ${eo(ee.text)}</span>
        ${ke?c`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="user"){let ke=b.has(J);return c`<div
        class="sv__line sv__line--user${ke?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>$t(J)}
      >
        <span class="sv__user-line">▷ ${eo(ee.text)}</span>
        ${ke?c`<pre class="sv__user-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return c`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let ke=b.has(J),qe=ee.tool==="Bash"?xh(ee.command):0,ut=ee.tool==="Bash"?qe>1?eo(ee.command):ee.command:ee.path||ee.command||"";return c`<div
        class="sv__tool${ke?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>$t(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${ut?c`<span class="sv__tool-detail">${ut}</span>`:""}
          ${qe>1?c`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof ee.added=="number"?c`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?c`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?c`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${ke?c`<pre class="sv__tool-expand">${ne(ee)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${mr(ee.text||"")}</div>`}function ne(J){let ee=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)ee.push(J.command);else if(J.input!==void 0)try{ee.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&ee.push(`output:
${J.output}`),ee.join(`

`)}function $e(){if(!o)return c``;let J=q(),ee=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),ke=m.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,ut=ie(),Me=ut?Rh(V(),Date.now()):"",ze=ut?Re(J):null,gt=ut?Ie(J):null,mt=Ch(J);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":o)}</span
        >
        ${mt?c`<span
              class="sv__stage${mt.guess?" sv__stage--guess":""}"
              title=${mt.text}
              >${mt.text}</span
            >`:""}
        ${ut?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Me?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Me}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Me?c`<span class="sv__live-ago">${Me}</span>`:""}</span
            >`:""}
        ${ke?c`<button
              type="button"
              class="sv__session"
              title=${ke}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ke}`}
              @click=${()=>_t(ke)}
            >
              ⧉ ${ke.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>_t(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${ee?c`<span class="sv__meta">${ee}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||u?"":c`<button
              type="button"
              class="sv__prompt-toggle${K?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${K?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${G}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${qe}
          @click=${Dt}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>at()}
        >
          ✕
        </button>
      </div>
      ${i||u?"":_e()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:pe(J).map(ht=>ht.kind==="subagent"?Ce(ht):ht.kind==="group"?ve(ht):S(ht.idx,ht.line))}
      </div>
      ${ze||gt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?c`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?eo(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${gt?c`<span class="sv__now-think"
                  >💭 ${eo(gt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ce(J){let ee=$.has(J.idx),ke=J.header?J.header.line:null,qe=ke?ke.is_error===!0?"\u2717":typeof ke.result=="string"?"\u2713":"\u27F3":"",ut=ke&&ke.command?ke.command:"";return c`<div class="sv__sub${ee?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${ut?c`<span class="sv__sub-detail">${ut}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${qe?c`<span class="sv__sub-state">${qe}</span>`:""}
        ${ee?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${ee?c`<div class="sv__sub-body">
            ${Xe(J.lines).map(Me=>Me.kind==="group"?ve(Me):S(Me.idx,Me.line))}
          </div>`:""}
    </div>`}function ge(J){$.add(J),Pe()}function Pe(){lt($e(),e),te(),y&&Ye()}function Ye(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function $t(J){b.has(J)?b.delete(J):b.add(J),Pe()}function Dt(){y=!y,Pe()}function _t(J){qn(J).then(ee=>{ee?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(J){!o||!J||(m={...m,...J},Pe())}function oe(J){let ee=J.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&y&&(y=!1,Pe())}e.addEventListener("scroll",oe,!0);function Ee(J){let ee=J.target;!ee||typeof ee.closest!="function"||e.contains(ee)||ee.closest("dialog")||ee.closest(".md-viewer-root")||at()}let je=!1;function Ze(){je||(document.addEventListener("mousedown",Ee),je=!0)}function it(){je&&(document.removeEventListener("mousedown",Ee),je=!1)}function wt(J){let ee=J&&J.attempt_id;if(!ee)return;let ke=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,qe=J.session_ref&&typeof J.session_ref=="object"?J.session_ref:null;if(ke&&qe)return;let ut=l;o=ee,i=ke,a=qe,l=i?`session-log:${o}:${i}`:`session-log:${o}`,n&&ut&&ut!==l&&Promise.resolve(n("unsubscribe-session-log",{id:ut})).catch(()=>{}),d=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,m=J.meta||{},u=J.hide_prompt===!0,y=!0,b.clear(),$.clear(),B(),!D&&r&&(D=r.subscribe(Pe)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...i?{launch_id:i}:{},...a?{session_ref:a}:{},...d?{root_dir:d}:{}})).catch(()=>{}),Ze(),Pe()}function at(){let J=l;it(),o=null,i=null,a=null,l=null,d=null,u=!1,b.clear(),$.clear(),B(),Se(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),lt(c``,e),s&&s()}return{open:wt,updateMeta:T,close:at,isOpen(){return o!==null},destroy(){Se(),it(),D&&(D(),D=null),e.removeEventListener("scroll",oe,!0),o=null,i=null,a=null,l=null,d=null,u=!1,lt(c``,e)}}}function Oh(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Lh(e){let t=e&&e.metadata||{},n=Wr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Oh(t)?null:"plan_pending"}),r}function bp(e,t){let n=Lh(e);return c`
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
  `}var Ih="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Ph=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Dh=/^\*\*결론\*\* — (.+)$/;function Ii(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ih)return null;let n=Ph.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?Dh.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",d=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var hp=20;function yp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Mh(e){return e.length>hp?`${e.slice(0,hp)}\u2026`:e}function Nh(e,t,n,r){let s=`${t.lane} ${Mh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${yp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function qh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${yp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function vp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let d=Ii(typeof l.text=="string"?l.text:"");return d?Nh(l,d,t,s.has(l.id)):qh(l)})}
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
  `}var{I:Dx}=Oc;var wp=e=>e.strings===void 0;var Fh={},kp=(e,t=Fh)=>e._$AH=t;var Lr=xi(class extends ss{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ln||t===Ht)return t;let n=e.element,r=e.name;if(e.type===or.PROPERTY){if(t===n[r])return Ln}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Ln}else if(e.type===or.ATTRIBUTE&&n.getAttribute(r)===t+"")return Ln;return kp(e),t}});var jh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],wl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},$p={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Bh={pin:"pin",global:"global",base:"base"};function Uh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Bh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Wh(e,t,n){switch(e){case"workflow_mode":return Rs;case"spec_review_model":case"impl_review_model":return Os;case"plan_review_model":return Qo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Jo;case"impl_dispatch":return Zd;case"impl_runtime":return Xo;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return es(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Cs;case"orchestration_model":return Ls(n,null);case"orchestration_effort":return es(n,void 0,t.orchestration_model||Rn).filter(r=>r!==Rn);default:return[]}}function zh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Uh(e.source)}
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
      >${ei[e.source]}</span
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
  </div>`}function xp(e,t){let n=Da.flatMap(l=>l.keys),r=Ma(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ru(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),i=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),a=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let d=l.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${a}
        >${Hh(o)}</span
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
          ${Da.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(d=>l.keys.includes(d.key)).map(d=>{let u=Wo({key:d.key,choices:Wh(d.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return zh(d,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
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
  </details>`}function Hh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Gh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Ap(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},s=r.stages||{},o=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",a=typeof n.exec_receipt=="string"?n.exec_receipt:"",l=Gh(r.exec_receipt),d=l?er(l):a,u=l?`${l.kind}:${l.actor}`:a.split("@")[0],m=Bo(r.planned_execution,r.exec_receipt),y=r.chips?.pr?.number,b=typeof y=="number"?`PR #${y}`:"PR",$=ts(n),D=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${o?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${o}</span
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
            >${u}${l?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
      ${$?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${$.state}
            title=${ni($)}
            ?disabled=${$.state==="applied"}
            @click=${()=>D?.($.rec,$.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Kh(o).map(W=>Vh(W,n,s,{label:W.id==="pr"?b:W.label,href:W.id==="pr"?i:""}))}
    </div>
  </section>`}function Kh(e){let n=typeof e=="string"&&Object.hasOwn(wl,e)&&wl[e]||wl.spec_backed;return jh.filter(r=>n.includes(r.id))}var Pi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Vh(e,t,n,r){let s=Yh(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,i=typeof o?.fill=="string"?o.fill:null,a=i?i==="full":s.length>0,l=!a&&i==="dim",d=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,u=s&&s.split("@")[1]?.slice(0,7)||"",m=d?Pi.stale:a?Pi.on:l?Pi.current:Pi.none,y=Zh(e,n),b=`${r.label} \xB7 ${m}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,$=`detail-summary__gate${a?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${d?" detail-summary__gate--stale":""}${u?" detail-summary__gate--receipt":""}`,D=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${u}</span>`;return r.href?c`<a
      class=${$}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${D}</a
    >`:c`<span
    class=${$}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${D}</span
  >`}function Yh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Zh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn($p,n)?$p[n]:""}function Di(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Sp(e){return Di(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Ep(e,t){let n=e&&e[t];if(!Di(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Sp),s=Sp(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Rp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Mi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Rp(e)}${t}`}function as(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Rp(e)}`}function Xh(e,t,n){if(n!==null){let s=e==="claude"?Mi:as,o=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:as({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Tp(e,t){if(!Di(e)||e.state!=="usable"||!Di(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Cp(e){let t=e.provider_key==="claude"?Mi:as,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Xh(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Op({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Cp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Ep(t,"claude"),selected:s,workspace_default:Tp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Cp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Ep(t,"codex"),selected:o,workspace_default:Tp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Qh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Jh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ni(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a=null,l="";function d(D){D.key==="Escape"&&s&&(D.preventDefault(),b())}document.addEventListener("keydown",d);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Qh(s)}</span
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
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){lt(u(),e)}async function y(D,W={}){s=D,o="loading",i="",a=null,l="",m();let K=W.workspace||(n?n():"");if(!K){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let le="/api/doc?workspace="+encodeURIComponent(K)+"&path="+encodeURIComponent(D);try{let Y=await r(le),j=await Y.json().catch(()=>({}));if(!Y.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&W.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||Y.status)+")",m();return}let O=Jh(String(j.content||""));a=O.front,i=O.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,lt(c``,e)}function $(){document.removeEventListener("keydown",d),b()}return{open:y,close:b,destroy:$}}var ey=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Pp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",qi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],ty=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Lp(e){return typeof e=="string"&&ty.has(e)}var ny=["running","done","failed","interrupted"],ry={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function sy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function oy(e){let t=dn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Pp}
          >부분 집계</span
        >`:""}`}function Ip(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function xl(e){if(typeof e=="number")return to(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?to(t):""}function iy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function ay(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function kl(e){return e===null||typeof e=="string"&&e.trim().length>0}function $l(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function ly(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!qi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?kl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||kl(t.effort))||!(!("agent_type"in t)||kl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!ny.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!$l(t.started_at)||!$l(t.last_event_at)||!$l(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function cy(e,t,n){let s=dn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${xl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${xl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function dy(e,t,n,r){let s=e.status==="running"?null:t,i=(s?dn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?to(e.last_event_at):s?xl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,iy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=ay(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ry[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function uy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function py(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of o){let m=ly(u);!m||s.has(m.launch_id)||Lp(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((u,m)=>(u.started_at||0)-(m.started_at||0));let i={};for(let{role:u,provider:m}of qi){let y=t?t.roles[u]?.[m]:null;i[u]=y?[...y.legs]:[]}let a=qi.flatMap(({role:u})=>i[u]),l=new Set,d=[];for(let{role:u,provider:m}of qi){for(let y of r.filter(b=>b.role===u&&b.provider===m)){let b=a.find($=>$.receipt_id===y.launch_id)||null;b&&!uy(y,b)||(b&&l.add(b.receipt_id),d.push(dy(y,b,e.attempt_id,n)))}for(let y of i[u])!l.has(y.receipt_id)&&!Lp(y.agent_type)&&d.push(cy(u,m,y))}return d}function fy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ey,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${sy(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Pp}</span>`:""}
  </div>`}var _y={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function to(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function my(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var gy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function by(e,t){let n=gy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ka(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${ws(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${to(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Dp(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],i=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,$)=>$.index-b.index)],a=i.map(b=>by(b,t)),l=n.expanded||new Set;if(s.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&d.add(b.resumed_from);let u=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let D=typeof b.session_id=="string"&&b.session_id.length>0,W=d.has(b.attempt_id),K=D&&!W,le=D?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!K}
      title=${le}
      @click=${Y=>{Y.stopPropagation(),K&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let D=b.cause_detail,W=D&&typeof D.reason=="string"&&D.reason.length>0?typeof D.command=="string"&&D.command.length>0?`${D.reason} \xB7 ${D.command}`:D.reason:b.cause;return c`<div class="detail-session__cause" title=${W}>
      ${b.cause}
    </div>`},y=b=>{let $=Ip(Sa(b));if(dn($).length===0&&!Xr(b.usage))return"";let D=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${D?"true":"false"}
      title=${D?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${W=>{W.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${oy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${a}${s.map(b=>{let $=Sa(b),D=Ip($),W=dn(D);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${_y[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ys(b)?c`<span
                  class="detail-session__resumed"
                  title=${ys(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ar(b)}</span>
            ${W.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${W.length>0?W.map(K=>c`<span
                      class="detail-session__usage"
                      title=${K.tooltip}
                      >${K.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${to(b.started_at)}</span>
          </button>
          ${y(b)} ${u(b)} ${m(b)} ${my(b)}
          ${l.has(b.attempt_id)&&b.usage?fy(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${py(b,$,t)}
        </div>`})}
    </div>
  `}function Mp(e,t={}){return c`
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
          ${hy(e)}
        </div>`:""}
  `}function hy(e){let t=os(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ar("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Li(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var yy=["open","in_progress","deferred","resolved","closed"],vy=[0,1,2,3,4];function Np(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,d=null,u=null,m={},y="",b=!1,$=[],D=!1,W={},K={claude:null,codex:null},le=null,Y=null,j=0,O=!1,B=!1,Z="",G="",_e="",q="",V=!1;function ie(){O=!1,B=!1,Z="",G="",_e="",q="",V=!1}function te(){K={claude:null,codex:null},le=null,Y=null,j+=1}async function Se(){if(!s)return null;try{let h=await Promise.resolve(s("get-workspace-accounts",{}));return h&&typeof h.state=="string"?h:null}catch{return null}}async function Xe(h){try{let H=await fetch(h);if(!H.ok)return null;let R=await H.json();if(!R||typeof R!="object"||!Array.isArray(R.accounts))return null;let be=R.accounts.filter(Qe=>Qe!==null&&typeof Qe=="object"&&!Array.isArray(Qe));return{accounts:be,active:be.find(Qe=>Qe.active===!0)||null}}catch{return null}}async function pe(h){Y=h;let H=++j,[R,be,Qe]=await Promise.all([Xe("/api/claude-usage"),Xe("/api/codex-usage"),Se()]);H!==j||h!==d||(K={claude:R,codex:be},le=Qe,Ue())}let X=[],Re=null,Ie=null,S=!1,ne="",$e=!1,ve=0,Ce=new Set;function ge(){X=[],Re=null,Ie=null,S=!1,ne="",$e=!1,ve+=1,Ce.clear()}async function Pe(h){if(!s)return;let H=++ve;try{let R=await Promise.resolve(s("get-comments",{id:h}));if(H!==ve||h!==d)return;X=Array.isArray(R)?R:[],S=!1}catch{if(H!==ve||h!==d)return;S=!0}Ue()}function Ye(){if(!s||!d)return;let h=u&&typeof u.comment_count=="number"?u.comment_count:null;if(Re!==d){Re=d,Ie=h,Pe(d);return}h!==null&&h!==Ie&&(Ie=h,Pe(d))}function $t(h){Ce.has(h)?Ce.delete(h):Ce.add(h),Ue()}function Dt(h){let H=ne.trim().length===0;ne=h,H!==(h.trim().length===0)&&Ue()}async function _t(){let h=ne.trim();if(!s||!d||h.length===0||$e)return;let H=d;$e=!0,Ue();let R=!1;try{let be=await Promise.resolve(s("add-comment",{id:H,text:h}));Array.isArray(be)&&be.length>0&&(R=!0,H===d&&(X=be,S=!1,ne="",Ie=be.length))}catch{R=!1}R||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),H===d&&($e=!1),Ue()}let T={onToggle:$t,onDraftInput:Dt,onSubmit:_t},oe=t.mdViewer||null,Ee=null;oe||(Ee=document.createElement("div"),Ee.className="md-viewer-root",document.body.appendChild(Ee));let je=oe||Ni(Ee,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ze=document.createElement("div");Ze.className="session-log-root",document.body.appendChild(Ze);let it=is(Ze,{transport:s?(h,H)=>Promise.resolve(s(h,H)):void 0,sessionLogStore:l}),wt=!1,at=!1,J=!1,ee=null,ke=null,qe=0;function ut(h){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${h}`}function Me(){wt=!1,at=!1,J=!1,ee=null,ke=null,qe+=1}async function ze(h){if(!s)return;let H=++qe;at=!0,J=!1,Ue();try{let R=await Promise.resolve(s("get-bead-prompt",{bead_id:h}));if(H!==qe)return;!R||typeof R!="object"||Array.isArray(R)?J=!0:(ee=R,ke=ut(h))}catch{H===qe&&(J=!0)}finally{H===qe&&(at=!1,Ue())}}let gt=[],mt=null,ht=0;function Ut(h,H){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${h}::${H}`}function Lt(){gt=[],mt=null,ht+=1}async function Yt(h,H){if(!s)return;let R=++ht,be;try{be=await Promise.resolve(s("get-session-refs",{bead_id:h}))}catch{be=null}R!==ht||H!==mt||(gt=be&&Array.isArray(be.sessions)?be.sessions:[],Ue())}function Mt(){if(!s||!d)return;let h=u&&u.metadata,H=h&&typeof h=="object"&&typeof h.session_ref=="string"?h.session_ref:null;if(H===null){Lt();return}let R=Ut(d,H);mt!==R&&(gt=[],mt=R,Yt(d,R))}function Nt(){if(wt=!wt,wt&&d&&ke!==ut(d)){ee=null,ze(d);return}Ue()}function At(){if(!i||!d)return[];let h=i.get();return(h&&h.attempts?Object.values(h.attempts):[]).filter(R=>R&&R.bead_id===d).sort((R,be)=>(be.started_at||0)-(R.started_at||0)).map(R=>({attempt_id:R.attempt_id,bead_id:R.bead_id,status:R.status,started_at:typeof R.started_at=="number"?R.started_at:null,runner:R.runner||null,model:R.model||null,effort:R.effort||R.observed_effort||null,speed:R.speed||null,session_id:R.session_id||null,resumed_from:R.resumed_from||null,continuation_mode:R.continuation_mode||null,dismissed_at:typeof R.dismissed_at=="number"?R.dismissed_at:null,cause:typeof R.cause=="string"?R.cause:null,cause_detail:R.cause_detail||null,exec_default_preset_id:typeof R.exec_default_preset_id=="string"?R.exec_default_preset_id:null,exec_default_preset_revision:typeof R.exec_default_preset_revision=="number"?R.exec_default_preset_revision:null,exec_values:R.exec_values&&typeof R.exec_values=="object"?R.exec_values:null,usage:R.usage||null,usage_legs:Array.isArray(R.usage_legs)?R.usage_legs:[],delegation_sessions:Array.isArray(R.delegation_sessions)?R.delegation_sessions:[]}))}function Ge(){if(!i||!d)return null;let h=i.get();return In(h&&h.attempts||{},d)}let L=new Set;function Q(h){L.has(h)?L.delete(h):L.add(h),Ue()}function me(h){let H=i?i.get():null,R=H&&H.attempts?H.attempts[h]:null;it.open({attempt_id:h,meta:R?{runner:R.runner||void 0,model:R.model||void 0,effort:R.effort||void 0,status:R.status||void 0,session_id:R.session_id||void 0}:{}})}function E(h,H){let R=i?i.get():null,be=R&&R.attempts?R.attempts[h]:null,se=(be&&Array.isArray(be.delegation_sessions)?be.delegation_sessions:[]).find(Be=>Be&&typeof Be=="object"&&Be.launch_id===H);se&&it.open({attempt_id:h,launch_id:H,meta:{runner:se.provider==="claude"?"claude":"codex",role:se.role,...typeof se.agent_type=="string"?{agent_type:se.agent_type}:{},model:se.model,effort:se.effort,session_id:se.session_id,status:se.status}})}async function z(h){if(!s||!h)return;let H=await Vr();if(H===null)return;let R=()=>{let Be=i?i.get():null;return Be&&typeof Be.revision=="number"?Be.revision:0},be=async(Be={},Fe=R())=>await s("worker-attempt-resume",{attempt_id:h,expected_revision:Fe,...H!==""?{instructions:H}:{},...Be}),Qe=Be=>{Be?.queue&&i?.set&&i.set(Be.queue)},se=await be();if(Qe(se),se&&se.conflict){let Be=se.queue&&typeof se.queue.revision=="number"?se.queue.revision:R();se=await be({},Be),Qe(se)}se=await tr(se,(Be,Fe)=>be({continuation:Be,decision_token:Fe}),{onResult:Qe,refresh:()=>be()}),se&&se.resumed===!1&&!se.conflict&&se.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${se.reason}`,"error",2400)}function Le(h){!h||!d||it.open(Yr(h,d,u&&u.status))}let Ke={onOpen:me,onOpenDelegation:E,onResume:z,onToggleUsage:Q,onOpenSessionRef:Le,onCopyResumeCommand:rn};function Ae(){let h=i?i.get():null,H={...W};for(let R of["orchestration_model","orchestration_effort","orchestration_speed"]){let be=h&&h[R];typeof be=="string"&&(H[R]=be)}return H}async function ct(){if(s){try{let h=await Promise.resolve(s("get-session-defaults",{}));W=h&&h.values&&typeof h.values=="object"?h.values:{}}catch{W={}}Ue()}}function dt(){let h=i?i.get():null;return h&&h.runner_catalog||null}function he(){let h=i?i.get():null;return h&&typeof h.execution_defaults=="object"?h.execution_defaults:null}function st(){let h=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},R=xn({pin:{...h,...m},global:Ae(),execution_defaults:he(),runner_catalog:dt(),route:typeof h.route=="string"?h.route:null}).orchestration_model.value||"";return Fn(dt(),R)}function P(){let h=a?a.get():null;return!h||typeof h.revision!="number"?null:{revision:h.revision,presets:Array.isArray(h.presets)?h.presets:[]}}function N(h){return h?.compatible===!1}function ye(h){a&&h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&a.set({revision:h.revision,presets:h.presets})}async function et(){let h=P(),H=h?.presets.find(R=>R.id===y);if(!(!s||!d||!h||!H||N(H)||b)){b=!0,$=[],Ue();try{let R=await Promise.resolve(s("apply-impl-preset",ou(d,H.id,h.revision)));if(R&&R.conflict){ye(R),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let be=R&&Array.isArray(R.issue)?R.issue[0]:R?.issue;if(R&&R.applied&&be&&typeof be=="object"){u=be,$=Array.isArray(R.skipped_orchestration_keys)?R.skipped_orchestration_keys.filter(Qe=>typeof Qe=="string"):[];for(let Qe of iu)delete m[Qe];de($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}R&&R.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(R){R&&typeof R=="object"&&R.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Ue()}}}let we=null;n&&n.subscribe&&(we=n.subscribe(()=>Tt()));let nt=null;i&&typeof i.subscribe=="function"&&(nt=i.subscribe(()=>{d&&Ue()}));let pt=null,yt=null;function St(){yt&&(yt(),yt=null)}a&&typeof a.subscribe=="function"&&(pt=a.subscribe(()=>{d&&Ue()}));function Zt(h){h.key==="Escape"&&d&&(h.preventDefault(),r())}document.addEventListener("keydown",Zt);function Tt(){if(d){if(n&&typeof n.snapshotFor=="function"){let h=n.snapshotFor("detail:"+d)||[];u=h.find(R=>R&&R.id===d)||h[0]||u}Ye(),Mt(),Ue()}}function rn(h){qn(h).then(H=>{H?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Wt(h){h.preventDefault(),h.stopPropagation(),d&&rn(d)}function hn(h,H){h.preventDefault(),h.stopPropagation(),rn(H)}function Ve(h,H,R){h.preventDefault(),h.stopPropagation(),je.open(H,{missing_state:R})}async function Kt(h,H){let R=Object.hasOwn(m,h),be=m[h];if(m[h]=H,Ue(),!(!s||!d))try{let Qe=await Promise.resolve(s("update-exec-settings",su(d,h,H.length===0?null:H))),se=Array.isArray(Qe)?Qe[0]:Qe;if(!se||typeof se!="object"||!se.id)throw new Error("exec settings readback failed");u=se,delete m[h],Ue()}catch(Qe){throw R?m[h]=be:delete m[h],Ue(),de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Qe}}function Xt(h){h.catch(()=>{})}async function yn(h,H){let R=u||{},be=R.metadata&&typeof R.metadata=="object"?R.metadata:{},Qe={};for(let Fe of["impl_runtime","impl_model","impl_effort"])Qe[Fe]=Object.hasOwn(m,Fe)?m[Fe]:typeof be[Fe]=="string"?be[Fe]:"";Qe[h]=H;let se=cu(Qe,dt(),st()),Be={};for(let Fe of["impl_runtime","impl_model","impl_effort"])Be[Fe]=m[Fe],m[Fe]=se[Fe]||"";if(Ue(),!(!s||!d))return Promise.resolve(s("update-impl-target",{id:d,...se,orchestration_runtime:st()})).then(Fe=>{let bt=Array.isArray(Fe)?Fe[0]:Fe;if(!bt||typeof bt!="object"||!bt.id)throw new Error("implementation target readback failed");u=bt;for(let Tn of["impl_runtime","impl_model","impl_effort"])delete m[Tn];Ue()}).catch(Fe=>{for(let bt of["impl_runtime","impl_model","impl_effort"])Be[bt]===void 0?delete m[bt]:m[bt]=Be[bt];throw Ue(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Fe})}async function fe(h,H){if(!(!h||typeof h!="object")&&!(H==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await Kt("orchestration_model",h.orchestration_model)}catch{return}if(typeof h.impl_runtime=="string"&&h.impl_runtime.length>0)try{await yn("impl_runtime",h.impl_runtime)}catch{}}}async function A(h,H,R){if(!s||!d)return!1;try{let be=await Promise.resolve(s(h,H)),Qe=Array.isArray(be)?be[0]:be;return Qe&&typeof Qe=="object"&&Qe.id?(u=Qe,!0):(de(R,"error"),!1)}catch(be){return be&&typeof be=="object"&&be.code==="bd_readback_failed"?(de("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(de(R,"error"),!1)}}function ue(h){setTimeout(()=>{try{let H=e.querySelector(h);H&&typeof H.focus=="function"&&H.focus()}catch{}},0)}function Oe(){O=!0,Z=u&&u.title||"",Ue(),ue('.detail-edit__input[data-edit="title"]')}function kt(h){Z=h.target.value}function Rt(){O=!1,Z="",Ue()}function Et(){A("edit-text",{id:d,field:"title",value:Z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(H=>{H===!0&&(O=!1,Z=""),Ue()})}function Vt(){B=!0,G=u&&u.description||"",Ue(),ue('.detail-edit__textarea[data-edit="description"]')}function on(h){G=h.target.value}function an(){B=!1,G="",Ue()}function Sn(){A("edit-text",{id:d,field:"description",value:G},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(H=>{H===!0&&(B=!1,G=""),Ue()})}function It(h,H,R,be){if(h.key==="Escape"){h.stopPropagation(),R();return}h.key==="Enter"&&(!be||h.ctrlKey||h.metaKey)&&(h.preventDefault(),H())}function ln(h){let H=h.target.value;A("update-status",{id:d,status:H},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ue())}function pn(h){let H=Number(h.target.value);A("update-priority",{id:d,priority:H},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ue())}function fn(h){_e=h.target.value}function Xn(){let h=_e.trim();h.length!==0&&A("label-add",{id:d,label:h},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(H=>{H===!0&&(_e=""),Ue()})}function x(h){if(h.key==="Escape"){h.stopPropagation(),_e="",Ue();return}h.key==="Enter"&&(h.preventDefault(),Xn())}function C(h){A("label-remove",{id:d,label:h},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ue())}let De={onCopyPath:hn,onOpenDoc:Ve};function Ne(h){return typeof h=="string"?h:h&&typeof h=="object"?String(h.id||h.to||h.issue_id||h.depends_on||""):""}function Je(h){return h&&typeof h=="object"?String(h.dependency_type||h.type||""):""}function p(h){switch(h){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return h.length>0?`${h} `:""}}function v(h){if(!h||typeof h!="object")return;let H=typeof h.status=="string"?h.status:"",R=typeof h.title=="string"?h.title:"";return H.length>0&&R.length>0?`${H} \xB7 ${R}`:void 0}function F(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function ce(){return t.depCandidates?t.depCandidates():null}async function xe(h,H,R){let be=F(),Qe=d;if(!Qe)return;if(be.length===0){de("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let se=await A(h,{a:Qe,b:H,view_id:Qe,root_dir:be},R),Be=se===!0||se!==!1&&se.saved===!0;Be&&t.onDepChanged&&t.onDepChanged({type:h,a:Qe,b:H}),h==="dep-add"&&Be&&(q="",V=!1),Ue()}function ft(h){if(!d)return;let H=globalThis.confirm;typeof H=="function"&&!H(`${h}\uAC00 ${d}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||xe("dep-remove",h,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function ot(h){h.disabled||xe("dep-add",h.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Qt(h){q=h.target.value,V=!0,Ue()}function qt(){V||(V=!0,Ue())}function Jt(h,H){if(h.key==="Escape"){h.stopPropagation(),q="",V=!1,Ue();return}h.key==="Enter"&&(h.preventDefault(),H.length===1&&!H[0].disabled&&ot(H[0]))}function En(h){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${q}
        @focus=${qt}
        @input=${Qt}
        @keydown=${H=>Jt(H,h)}
      />
      ${V||q.length>0?c`<div class="detail-dep-add__list">
            ${h.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:h.map(H=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${H.bead_id}
                      ?disabled=${H.disabled}
                      title=${$n(H.reason)}
                      @click=${()=>ot(H)}
                    >
                      <span class="detail-dep-add__repo"
                        >${H.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${H.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${H.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function vn(h,H){let R=H.get(h.id),be=o?c`<button
          type="button"
          class="detail-dep__link"
          title=${$n(h.title)}
          @click=${()=>R===void 0?o(h.id):o(h.id,R)}
        >
          ${h.label}
        </button>`:c`<span class="detail-dep__link" title=${$n(h.title)}
          >${h.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${h.kind}${o?" detail-dep--link":""}`}
      >${be}${h.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${h.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+h.id}
            @click=${()=>ft(h.id)}
          >
            ✕
          </button>`:""}</span
    >`}function en(h){let H=Array.isArray(h.dependencies)?h.dependencies:[],R=Array.isArray(h.dependents)?h.dependents:[],be=[];for(let Fe of H){let bt=Ne(Fe);bt.length>0&&Je(Fe)==="blocks"&&be.push({id:bt,label:`\u26D3 \uB9C9\uB294 ${bt}`,kind:"pred",title:v(Fe)})}for(let Fe of R){let bt=Ne(Fe);bt.length>0&&Je(Fe)==="blocks"&&be.push({id:bt,label:`\u26D3 \uB9C9\uD788\uB294 ${bt}`,kind:"succ",title:v(Fe)})}for(let Fe of H){let bt=Ne(Fe),Tn=Je(Fe);bt.length>0&&Tn!=="blocks"&&be.push({id:bt,label:`${p(Tn)}${bt}`,kind:"other",title:v(Fe)})}let Qe=ce(),se=new Map;if(Qe)for(let Fe of Qe.issues)se.has(Fe.bead_id)||se.set(Fe.bead_id,Fe.root_dir);let Be=Qe&&d?Pu(Iu(d,Qe),q):[];return c`
      <div class="detail-section-label">의존성</div>
      ${be.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${be.map(Fe=>vn(Fe,se))}
          </div>`}
      ${Qe===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:En(Be)}
    `}function On(h){let H=h.metadata||{},R=h.workflow||{},be=R.stages||{},Qe=be.spec&&be.spec.stale,se=be.impl&&be.impl.stale,Be=R.quick_fix_review?.state==="stale",Fe=be.plan||null,bt=R.route_source==="derived",Tn=R.route||H.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${bt?" detail-kv__v--derived":""}"
          title=${bt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${bt?"unset":Tn}</span
        >
      </div>
      ${R.route!=="quick_fix"||Object.hasOwn(H,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${H.spec_review||"\uC5C6\uC74C"}${Qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Fe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Fe?.approval_receipt||"\uC5C6\uC74C"}${Fe?.approval_state==="stale"?" \xB7 stale":Fe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${R.route!=="quick_fix"||Object.hasOwn(H,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${H.impl_review||"\uC5C6\uC74C"}${se?" \xB7 stale":""}</span
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
      ${R.route==="quick_fix"||Object.hasOwn(H,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${H.quick_fix_review||"\uC5C6\uC74C"}${Be?" \xB7 stale":""}</span
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
              >${er(R.exec_receipt)}</span
            >
          </div>`:""}
      ${R.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${R.impl_entry.actor}@${R.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${H.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${H.pr_url}</span>
          </div>`:""}
    `}let f={route:["quick_fix","spec_backed","full_plan"]};async function g(h,H){let R=H.target.value;if(h==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&R!=="full_plan"&&!window.confirm(`full_plan \u2192 ${R||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ue();return}await A("update-workflow-meta",{id:d,key:h,value:R},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ue()}function w(h){let H=h.metadata||{};return c` ${((be,Qe)=>{let se=f[be],Be=typeof H[be]=="string"?H[be]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${be}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${be}
          data-edit=${`wfmeta-${be}`}
          @change=${Fe=>g(be,Fe)}
        >
          <option value="" ?selected=${!se.includes(Be)}>
            ${Qe}
          </option>
          ${se.map(Fe=>c`<option value=${Fe} ?selected=${Be===Fe}>${Fe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function k(h,H){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Z}
            @input=${kt}
            @keydown=${R=>It(R,Et,Rt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Et}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Rt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${h}</h2>
        ${dn(H).map(R=>c`<span class="detail-usage-total" title=${R.tooltip}
              >${R.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Oe}
        >
          ✎
        </button>
      </div>
    `}function M(h){let H=cn(h.created_at),R=cn(h.updated_at);return!H&&!R?c``:c`
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
          </div>`:""}
      ${R?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
    `}function U(h,H){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ln}
        >
          ${yy.map(R=>c`<option value=${R} ?selected=${R===h}>${R}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${pn}
        >
          ${vy.map(R=>c`<option value=${String(R)} ?selected=${R===H}>
                P${R}
              </option>`)}
        </select>
      </div>
    `}function re(h){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${B?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Vt}
            >
              ✎
            </button>`}
      </div>
      ${B?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${G}
              @input=${on}
              @keydown=${H=>It(H,Sn,an,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Sn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${an}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${h||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Te(h){let H=typeof h.notes=="string"?h.notes:"";return H.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${H}</div>
    `}function He(h){let H=Array.isArray(h.labels)?h.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${H.map(R=>c`<span class="detail-label-chip"
              >${R}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${R}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+R}
                @click=${()=>C(R)}
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
            @input=${fn}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Xn}
          >
            추가
          </button>
        </span>
      </div>
    `}function rt(){if(!d)return c``;let h=u||{},H=String(h.id||d),R=h.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",be=Ge(),Qe=h.status||"open",se=typeof h.priority=="number"?Math.max(0,Math.min(4,h.priority)):"",Be=h.description||"",Fe={...h,metadata:{...h.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Wt}
            >
              ${H}
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
          ${k(R,be)}
          ${Ap(Fe,{onApplyRec:fe})}
          ${xp({metadata:Fe.metadata,workspace_values:Ae(),catalog:dt(),execution_defaults:he(),expanded:D,presets:P()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:$},{onToggle:bt=>{D=bt,Ue()},onEdit:(bt,Tn)=>{if(bt==="impl_runtime"||bt==="impl_model"||bt==="impl_effort"){Xt(yn(bt,Tn??""));return}Xt(Kt(bt,Tn??""))},onPresetSelect:bt=>{y=bt,$=[],Ue()},onPresetApply:()=>{et()}})}
          ${Op({md:Fe.metadata,catalog:K,workspace_defaults:le,handlers:{onExecChange:(bt,Tn)=>Xt(Kt(bt,Tn))}})}
          ${U(Qe,se)} ${M(h)}
          ${re(Be)}
          ${vp(X,T,{expanded:Ce,draft:ne,sending:$e,error:S})}
          ${Te(h)} ${He(h)} ${en(h)}
          ${On(h)} ${w(h)}
          ${bp(h,De)}
          ${Mp({expanded:wt,loading:at,error:J,data:ee},{onToggle:Nt})}
          ${Dp(At(),Ke,{total:be,expanded:L},gt)}
        </div>
      </div>
    `}function Ue(){lt(rt(),e)}return{load(h){h!==d&&(m={},y="",$=[],D=!1,ie(),ge(),Me(),Lt(),te()),d=h,u=null,!yt&&t.subscribeCandidates&&(yt=t.subscribeCandidates(()=>{d&&Ue()})),Tt(),ct(),Y!==h&&pe(h)},clear(){d=null,u=null,m={},y="",b=!1,$=[],D=!1,ie(),ge(),Me(),Lt(),te(),St(),je.close(),it.close(),lt(c``,e)},destroy(){we&&(we(),we=null),nt&&(nt(),nt=null),pt&&(pt(),pt=null),St(),document.removeEventListener("keydown",Zt),oe||(je.destroy(),Ee&&Ee.parentNode&&Ee.parentNode.removeChild(Ee)),it.destroy(),Ze.parentNode&&Ze.parentNode.removeChild(Ze),d=null,u=null,te(),y="",b=!1,$=[],ge(),Me(),Lt(),lt(c``,e)}}}function qp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,u,m="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=u||"An unrecoverable error occurred.");let y=typeof m=="string"?m.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",d=>{d.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}var wy="(max-width: 640px)";function Fi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(wy),n=!!t.matches;e(n);let r=s=>{let i=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ky(){return{lanes:{done:!0},areas:{}}}function no(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function $y(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:no(r.lanes),areas:no(r.areas)}:{lanes:no(r),areas:{}}}catch{return null}}function Fp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ji(e,t=ky()){let n={lanes:no(t.lanes),areas:no(t.areas)},r=$y(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let i=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:i}},Fp(e,s),i},toggleArea(o){let i=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:i}},Fp(e,s),i}}}function Bp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let i of t){if(o.has(i.id))continue;o.add(i.id);let a=r[i.id];if(!a||!Array.isArray(a.scope))continue;let l=a.scope.filter(d=>typeof d=="string"&&d.length>0);if(l.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),s.push({member:i,scope:l})}for(let i=0;i<s.length;i+=1)for(let a=i+1;a<s.length;a+=1){let l=si(s[i].scope,s[a].scope);if(l.length===0)continue;let d=s[i].member,u=s[a].member;n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l}),n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l})}return n}var jp=["parallel","serial","candidate"];function ro(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Al(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,i=s.lane_id;if(o!==null&&o===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let a=jp.includes(r.kind),l=jp.includes(s.kind);if(a&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(o!==null&&l&&i===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(a&&o===null&&l&&i===null){let d=xy(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!a&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:a?{kind:"note",text:`${ro(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ro(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function xy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Up={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Wp={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Tl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Sl(e){for(let t of Tl(e))if(Object.hasOwn(Up,t))return Up[t];return null}function El(e){let t=null;for(let n of Tl(e))Object.hasOwn(Wp,n)&&(t=Wp[n]);return t}function ls(e){let t=Sl(e),n=El(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Hp(e,t){let n=Sl(e)??Sl(t),r=El(t)??El(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ay=new Set(["repo_operation_timeout_unresolved"]);function Sy(e){for(let t of Tl(e))if(Ay.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ey(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Gp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Sy(n.code))return"";if(n.code==="timeout"){let s=Number(t);return Number.isFinite(s)&&s>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(s/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ey(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Tr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var zp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Kp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(zp,t.blocked_reason)?zp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ls(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ls(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}var Vp=160;function Ty(e){return e.length>Vp?`${e.slice(0,Vp)}\u2026`:e}function Cy(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${Ty(e.command)}</code>`:""}
  </div>`}function Ry(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Oy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Yp(e){let t=e.failure?ls(e.failure.reason):"";return c`<div class="worker-banners">
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
          ${Cy(e.failure.cause_detail,e.failure.reason)}
          ${Ry(e.failure.reason)}
          ${Ds({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Ly(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Iy=new Set(["codex-runner"]);function Py(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",i=s&&typeof s.at=="number"?s.at:null,a=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Iy.has(b.agent_type))),l=a.filter(b=>b&&b.state==="live"),d=a.filter(b=>b&&b.state!=="live"),u=r&&typeof r.last_event_at=="number"?kn(r.last_event_at,t):"",m=r?kn(r.updated_at,t):"",y=u?`\uCD5C\uADFC \uD65C\uB3D9 ${u}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${kn(i,t)}</span
            >`:""}
      </div>`:y?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
        </div>`:""}${l.length>0||d.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${d.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(b=>b.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}`}var Dy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function My(e){if(!e)return"";let t=Dy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Cl(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(Se=>Se&&Se.current===!0)||null,i=e.failed===!0,a=!!e.paused,l=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Oy(t-e.started_at):"\u2014",d=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ys(e),m=dn(e.usage),y=nr(e.usage),b=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,$=e.base_exception||null,D=e.landing,W=e.attempt_id&&e.attempt_id===n,K=r.monitor||null,le=Ly(K),Y=K?ui(K.dependency_chips):"",j=Py(K,t,a,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),O=s&&e.workflow?.chips?.exec_receipt||null,B=pi(e.workflow),Z=fi(e.rec),G=O?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(O)}`}
        >${`${O.kind}:${jo(O)}`}</span
      >`:"",_e=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${ws(o)}</span
      >`:"",q=le||B||_e||G||Z?c`<div class="rtile__meta">
          ${le}${B}${_e}${G}${Z}
        </div>`:"",V=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${$?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${$}</span
      >`:""}`,ie=s?"":ns(e),te=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${W?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${_i(e.priority)}${u?c`<span class="rtile__resumed" title=${u}>↻</span>`:""}${V}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${My(o)}<span
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
                ${te}
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
                ${te}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${j}${e.rollup?qo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ya}):""}
    ${D?c`<div class="rtile__landing">
          <span
            class="merge-step${D.failed?" merge-step--failed":""}"
            style=${`--progress: ${D.percent}%`}
            >${D.label}${D.index>0?c`<span class="merge-step__n"
                  >${D.index}/${D.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Y}
    ${s?q:le||B||d||Z||m.length>0||y?c`<div class="rtile__meta">
            ${le}${B}${di(e.exec_chips)}${Z}
            ${m.length>0?m.map(Se=>c`<span class="worker-usage" title=${Se.tooltip}
                      >${Se.label}</span
                    >`):y?c`<span
                    class="worker-usage"
                    title=${ks(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Ds(e)} ${ie}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Zp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Cl(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var un="",Ny=["impl_runtime","impl_model","impl_effort"],qy=["claude_account","codex_account"],Fy=5,Bi=1;function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ui(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(L=>de(L,"error",4e3)),o={},i={},a=[],l=!1,d={state:"absent",values:{},warnings:[]},u={},m={},y=Promise.resolve(),b={claude:null,codex:null},$=!1,D=null,W={},K="",le="",Y=!1,j=!1,O=!1,B=null,Z=!1;function G(){let L=t.queue?t.queue():null;return An(L)?L:null}function _e(){let L=G();return L?L.runner_catalog:null}function q(){let L=G();return L&&An(L.execution_defaults)?L.execution_defaults:null}function V(){let L=t.implPresetStore?.get();return An(L)&&Array.isArray(L.presets)?L:null}function ie(){return r===null?{}:{root_dir:r}}async function te(L,Q){return Z||!n?null:await n(L,Q)}function Se(L){L&&An(L.queue)&&t.onQueueAdopt?.(L.queue)}async function Xe(L,Q){let me=G();if(!me||Z)return null;let E=await te(L,{...Q,...ie(),expected_revision:me.revision});if(Se(E),r!==null&&E&&E.conflict){let z=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:G()?.revision??me.revision;E=await te(L,{...Q,...ie(),expected_revision:z}),Se(E)}return E}async function pe(){l=!0,Ge();try{let L=await te("get-session-defaults",{...ie()});o=An(L?.values)?{...L.values}:{},i={...o},a=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){a=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{l=!1,Ge()}}async function X(){let L=tu(o,i);if(Object.keys(L).length!==0){try{let Q=await te("set-session-defaults",{values:L,...ie()});o=An(Q?.values)?{...Q.values}:{},i={...o},a=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ge()}}function Re(L,Q){if(!An(L))return;let me=L.state;d={state:me==="usable"||me==="unusable"||me==="absent"?me:"absent",values:An(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},m={...d.values},Q&&(u={...m})}async function Ie(){try{Re(await te("get-workspace-accounts",{...ie()}),!0)}catch(L){d={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},u={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Ge()}async function S(L){try{let Q=await fetch(L);if(!Q.ok)return null;let me=await Q.json();if(!An(me)||!Array.isArray(me.accounts))return null;let E=me.accounts.filter(z=>An(z)&&typeof z.key=="string"&&z.key.length>0&&typeof z.email=="string"&&z.email.length>0);return{accounts:E,active:E.find(z=>z.active===!0)||null}}catch{return null}}async function ne(){$=!0;let[L,Q]=await Promise.all([S("/api/claude-usage"),S("/api/codex-usage")]);Z||(b={claude:L,codex:Q},Ge())}function $e(){let L={};for(let Q of qy){let me=Object.hasOwn(u,Q)?u[Q]:null,E=Object.hasOwn(m,Q)?m[Q]:null;me!==E&&(L[Q]=me)}return L}async function ve(){let L=$e();if(Object.keys(L).length!==0){try{Re(await te("set-workspace-accounts",{values:L,...ie()}),!1)}catch(Q){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ge()}}function Ce(L,Q){Q===un?delete u[L]:u[L]=Q,Ge(),y=y.then(()=>ve())}function ge(L,Q){if(Ny.includes(L)){$t(L,Q);return}Q===un?delete i[L]:i[L]=Q,Ge(),X()}function Pe(){let L=Nt().orchestration_model,Q=xn({global:{orchestration_model:L??void 0},execution_defaults:q(),runner_catalog:_e()}).orchestration_model.value;return Q?Fn(_e(),Q):null}function Ye(L,Q){typeof Q=="string"&&Q.length>0?i[L]=Q:delete i[L]}function $t(L,Q){let me=Q===un?void 0:Q,E=Jd({impl_runtime:L==="impl_runtime"?me:i.impl_runtime,impl_model:L==="impl_model"?me:i.impl_model,impl_effort:L==="impl_effort"?me:i.impl_effort},_e(),Pe());Ye("impl_runtime",E.impl_runtime),Ye("impl_model",E.impl_model),Ye("impl_effort",E.impl_effort),Ge(),X()}async function Dt(){let L=G();if(!L)return;let Q={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},me=nu(Q,{...Q,...W});if(Object.keys(me).length!==0){try{let E=await Xe("worker-queue-set-orchestration-defaults",{values:me});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}W={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}}function _t(L,Q){W[L]=Q===un?null:Q,Ge(),Dt()}function T(L){if(D=L,!L){Ge();return}let Q=_e(),me=Nt(),E=me.orchestration_model;E&&!Ls(Q,L).includes(E)&&(W.orchestration_model=null,E=null);let z=me.orchestration_effort;z&&!Ia(Q,L,E||Rn).includes(z)&&(W.orchestration_effort=null),Ge(),Dt()}async function oe(L){if(!(!G()||L<Bi)){try{await Xe("worker-queue-set-slots",{slots:L})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ge()}}async function Ee(L){if(!(!G()||L<Bi||L>Fy)){try{await Xe("worker-queue-set-serial-lane-count",{count:L})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ge()}}async function je(L,Q){let me=L==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Xe(me,{on:Q})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}function Ze(){let L={},Q=Nt();for(let me of Zo){let E=rr.includes(me)?Q[me]:i[me];typeof E=="string"&&E.length>0&&(L[me]=E)}return L}async function it(){let L=V();if(!L)return;let Q=Ze();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let me=(L.presets||[]).find(z=>z.id===K),E=le.trim()||(me?me.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let z=me?await te("impl-preset-update",{expected_revision:L.revision,id:me.id,name:E,settings:Q}):await te("impl-preset-create",{expected_revision:L.revision,name:E,settings:Q});if(z&&z.applied){if(le="",!me&&Array.isArray(z.presets)){let Le=z.presets.find(Ke=>Ke.name===E);K=Le?Le.id:K}Ge()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ge()}catch(z){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}}async function wt(){let L=V();if(!(!L||K.length===0))try{let Q=await te("impl-preset-delete",{expected_revision:L.revision,id:K});Q&&Q.applied?(K="",Ge()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ge())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function at(L){o=An(L.values)?{...L.values}:{},i={...o},a=Array.isArray(L.warnings)?L.warnings:[],An(L.queue)&&(t.onQueueAdopt?.(L.queue),W={})}async function J(){let L=V(),Q=G();if(!L||!Q||K.length===0)return;let me=E=>({preset_id:K,expected_revision:L.revision,expected_queue_revision:E,...ie()});try{let E=await te("apply-impl-preset-global",me(Q.revision));if(E&&E.applied&&at(E),r!==null&&E&&E.queue_applied===!1){let z=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:G()?.revision??Q.revision;E=await te("apply-impl-preset-global",me(z)),E&&E.applied&&at(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}Ge()}async function ee(){j=!0,O=!1,Ge();try{let L=await te("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?O=!0:B=L}catch{O=!0}finally{j=!1,Ge()}}function ke(){if(Y=!Y,Y&&!B){ee();return}Ge()}function qe(){let L=os({loading:j,error:O});if(L)return L;if(!B)return"";let Q=Array.isArray(B.variants)?B.variants:[];return c`<div class="settings-dialog__sp-body">
      ${B.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${B.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(me=>c`<div class="settings-dialog__sp-variant" data-variant=${me.key}>
            <div class="settings-dialog__sp-cond">${me.condition}</div>
            ${ar(me.label,me.system_prompt)}
          </div>`)}
    </div>`}function ut(){return c`<section
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
        aria-expanded=${Y?"true":"false"}
        @click=${ke}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?qe():""}
    </section>`}function Me(L,Q,me,E,z,Le,Ke){let Ae=z[L]??un,ct=Pa(L,me,z,q(),_e(),Ke),dt=ct.options.find(st=>st.value===Ae),he=Ae===un?ct.full_value:dt?.full_value;return c`<select
        class=${Ae===un?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${Q}
        title=${he||""}
        ?disabled=${Le===!0||ct.disabled}
        .value=${Lr(String(Ae))}
        @change=${st=>E(L,String(st.target.value))}
      >
        <option value=${un} ?selected=${Ae===un}>
          ${ct.unset_label}
        </option>
        ${ct.options.map(st=>c`<option
              value=${st.value}
              title=${st.full_value||""}
              ?selected=${st.value===Ae}
            >
              ${st.label}
            </option>`)}
      </select>
      ${Ae===un?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function ze(L,Q,me,E,z,Le=!1,Ke){return c`<div
      class=${`settings-dialog__row${Le?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${Me(L,Q,me,E,z,Le,Ke)}
      </span>
    </div>`}function gt(L,Q){let me=Q?Q.active:null;return An(me)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?me.email:as({...me,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function mt(L,Q,me){let E=b[me],z=Object.hasOwn(u,L)?u[L]:un,Le=me==="claude"?Mi:as,Ke=!!E?.accounts.some(Ae=>Ae.key===z);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${Q}
          data-account-key=${L}
          @change=${Ae=>Ce(L,String(Ae.target.value))}
        >
          <option value=${un} ?selected=${z.length===0}>
            ${gt(me,E)}
          </option>
          ${z.length>0&&!Ke?c`<option value=${z} selected>
                ${z} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(Ae=>c`<option value=${Ae.key} ?selected=${Ae.key===z}>
                ${Le(Ae)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ht(){let L=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function Ut(L,Q,me,E,z){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${Me(me,`${L} \uBAA8\uB378`,E,ge,i,!1)}
        ${Me(z,`${L} effort`,Jo,ge,i,!1)}
      </span>
    </div>`}function Lt(L,Q,me,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${E?"true":"false"}
          aria-label=${Q}
          @click=${()=>je(L,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${me}</span>
      </span>
    </div>`}function Yt(L,Q,me,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>E(me-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${me}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>E(me+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(Q=>c`<div
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
      ${L.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Nt(){let L=G(),Q={};for(let me of rr)Q[me]=Object.prototype.hasOwnProperty.call(W,me)?W[me]:L&&typeof L[me]=="string"?L[me]:null;return Q}function At(){let L=_e(),Q=i.impl_runtime,me=i.impl_model,E=V(),z=G(),Le=Nt(),Ke=Ls(L,D),Ae=Jr(L,void 0).filter(we=>we!==Rn),ct=Ia(L,D,Le.orchestration_model||Rn).filter(we=>we!==Rn),dt=K?(E?.presets||[]).find(we=>we.id===K):null,he=dt?eu(Ze(),An(dt.settings)?dt.settings:{}):null,st=z&&typeof z.slots=="number"?z.slots:Bi+1,P=z&&typeof z.serial_lane_count=="number"?z.serial_lane_count:Bi,N=q()?.supported===!0,ye=ht(),et=Pa("workflow_mode",Rs,i,q(),L);return c`
      ${a.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${a.join(", ")}
          </div>`:""}
      ${ye?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ye}
          </div>`:""}
      ${N?"":c`<div
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
                .value=${Lr(K)}
                @change=${we=>{K=String(we.target.value),Ge()}}
              >
                <option value="" ?selected=${K===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(we=>c`<option
                      value=${we.id}
                      ?selected=${we.id===K}
                    >
                      ${we.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!he||he.rows.length===0}
                @click=${J}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${K?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Lr(le)}
                @input=${we=>{le=String(we.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${K?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${it}
              >
                ${K?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${K.length===0}
                @click=${wt}
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
                    .value=${Lr(D||un)}
                    @change=${we=>{let nt=String(we.target.value);T(nt===un?null:nt)}}
                  >
                    <option value=${un} ?selected=${!D}>
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
              ${ze("orchestration_model","\uBAA8\uB378",Ke,_t,Le)}
              ${ze("orchestration_effort","effort",ct,_t,Le)}
              ${ze("orchestration_speed","\uC18D\uB3C4",Cs,_t,Le)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${mt("claude_account","Claude","claude")}
              ${mt("codex_account","Codex","codex")}
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
                      @click=${()=>ge("workflow_mode",un)}
                    >
                      ${et.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Rs.map(we=>c`<button
                          type="button"
                          data-mode=${we}
                          aria-pressed=${String(i.workflow_mode===we)}
                          @click=${()=>ge("workflow_mode",we)}
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
              ${Ut("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Os,"spec_review_effort")}
              ${Ut("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Qo,"plan_review_effort")}
              ${Ut("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Os,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${ze("impl_runtime","\uC704\uC784 \uB300\uC0C1",Xo,ge,i)}
              ${ze("impl_model","\uBAA8\uB378",Jr(L,Q),ge,i)}
              ${ze("impl_effort","effort",es(L,Q,me),ge,i)}
              ${ze("impl_speed","\uC18D\uB3C4",Cs,ge,i)}
              ${ze("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ae,ge,i,!1,{...i,...Le})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Lt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",z?.auto_advance===!0)}
              ${Lt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",z?.auto_merge===!0)}
              ${Yt("slots","\uB3D9\uC2DC \uC2E4\uD589",st,we=>oe(we))}
              ${Yt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",P,we=>Ee(we))}
            </div>
            ${ut()}
          `}
    `}function Ge(){Z||lt(At(),e)}return{load(){W={};let L=[pe(),Ie()];return $||L.push(ne()),Promise.all(L).then(()=>{})},render:Ge,sessionDraft:()=>({...i}),destroy(){Z=!0,lt(c``,e)}}}function Wi(e){return c`<svg
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
  </svg>`}function Xp(){return Wi(gs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Qp(){return Wi(gs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Jp(){return Wi(gs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ef(){return Wi(gs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function tf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function nf(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return dn(Ho(t));let n={};for(let a of Yn)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let d=!1;for(let u of Yn){let m=l[u];typeof m=="number"&&Number.isFinite(m)&&(n[u]+=m,r=!0,d=!0)}if(d){o+=1;let u=l.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(s+=u,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?nr(n):null}function Gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rl(e,t){let n=Gn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function jy(e,t){if(!Gn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function By(e){if(!Gn(e)||!Gn(e.execution_defaults)||!Gn(e.runner_catalog)||!Gn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=xn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Fn(e.runner_catalog,n.orchestration_model.value??""),s=Er(n,e.runner_catalog),o=_r(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function rf(e,t){let n=t.notify||(S=>de(S,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let a=document.createElement("button");a.type="button",a.className="mon2-deck__panel-close",a.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),a.textContent="\u2715",o.append(i,a);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let d=null,u=null,m=null,y=new Map;function b(){let S=t.workspacesState?t.workspacesState():[];return Array.isArray(S)?S.filter(ne=>Gn(ne)):[]}function $(S){return b().find(ne=>ne.root_dir===S)||null}function D(S){return jy($(S),y.get(S))}function W(){for(let S of b()){let ne=y.get(S.root_dir);ne&&typeof ne.revision=="number"&&typeof S.revision=="number"&&S.revision>=ne.revision&&y.delete(S.root_dir)}}async function K(S,ne,$e){let ve=t.transport,Ce=D(ne);if(!(!ve||!Gn(Ce))){try{let ge=await ve(S,{...$e,root_dir:ne,expected_revision:Ce.revision});if(Gn(ge?.queue)&&y.set(ne,ge.queue),ge&&ge.conflict){let Pe=Gn(ge.queue)&&typeof ge.queue.revision=="number"?ge.queue.revision:D(ne)?.revision;ge=await ve(S,{...$e,root_dir:ne,expected_revision:Pe}),Gn(ge?.queue)&&y.set(ne,ge.queue)}}catch(ge){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ge instanceof Error?ge.message:String(ge)}`)}X()}}function le(S){d!==S&&(d=S,t.onFocusChange?.(d),X())}function Y(S){le(d===S?null:S)}function j(S){if(u===S){B();return}O(),u=S;let ne=$(S);i.textContent=`${ne?.name||S} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=Ui(l,{root_dir:S,queue:()=>D(S),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:$e=>{y.set(S,$e),X()}}),m.load(),X()}function O(){m?.destroy(),m=null}function B(S){O(),u=null,s.hidden=!0,i.textContent="",S!==!0&&X()}let Z=()=>B();a.addEventListener("click",Z);function G(S){S.key==="Escape"&&d!==null&&le(null)}document.addEventListener("keydown",G);function _e(S,ne){let $e=Math.max(ne,S,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${S}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:$e},(ve,Ce)=>Ce<S?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(S){let ne=S.auto_advance===!0,$e=S.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Qp():Xp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${$e?" is-on":""}`}
        data-act="merge"
        aria-pressed=${$e?"true":"false"}
        aria-label=${`${S.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${$e?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Jp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${u===S.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${u===S.root_dir?"true":"false"}
        aria-label=${`${S.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${ef()}
      </button>`}function V(S){let ne=By(S);return ne?c`<div class="mon2-deck__chips">
      ${ne.orchestration?c`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?c`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function ie(S){let ne=[];for(let[$e,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ce=Rl(S,$e);Ce>0&&ne.push(`${ve} ${Ce}`)}return ne.join(" \xB7 ")}function te(S){let ne=Rl(S,"running"),$e=typeof S.slots=="number"?S.slots:1;return c`<div
      class=${`mon2-deck__tile${d===S.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${S.root_dir}
      aria-pressed=${d===S.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${S.root_dir}>${S.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${$e}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${$e}</span>
          ${_e(ne,$e)}
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
        <span class="mon2-deck__counts">${ie(S)}</span>
        ${V(S)}
      </div>
    </div>`}function Se(S){let ne=t.doneItems?t.doneItems():[],$e=t.rangeLabel?t.rangeLabel():"",ve=nf(Array.isArray(ne)?ne:[]),Ce=ge=>S.reduce((Pe,Ye)=>Pe+Rl(Ye,ge),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${S.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${$e}`}
        >실행 ${Ce("running")} · 대기 ${Ce("queue")} · PR
        ${Ce("pr_wait")}${Ce("session_active")>0?` \xB7 \uC138\uC158 ${Ce("session_active")}`:""}
        · ${$e} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${tf($e)}
                  >${ve}</span
                >`:ve.map(ge=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ge.provider}
                      title=${ge.tooltip}
                      >${ge.label}</span
                    >`)}
          </span>`}
    </div>`}function Xe(){let S=b();return S.length===0?"":c`${Se(S)}
      <div class="mon2-deck__strip">
        ${S.map(ne=>te(ne))}
      </div>`}function pe(){d!==null&&!$(d)&&(d=null,t.onFocusChange?.(null))}function X(){W(),pe(),u!==null&&!$(u)&&B(!0),lt(Xe(),r),m?.render()}function Re(S){let ne=S.target;if(!ne||typeof ne.closest!="function")return;let $e=ne.closest("[data-root-dir]");if(!$e)return;let ve=$e.getAttribute("data-root-dir")||"",Ce=ne.closest("[data-act]")?.getAttribute("data-act");if(Ce==="worker"){t.gotoWorkerTab?.(ve);return}if(Ce==="auto"){K("worker-automation-toggle",ve,{on:D(ve)?.auto_advance!==!0});return}if(Ce==="merge"){K("worker-merge-auto-toggle",ve,{on:D(ve)?.auto_merge!==!0});return}if(Ce==="gear"){j(ve);return}Y(ve)}function Ie(S){if(S.key!=="Enter"&&S.key!==" ")return;let ne=S.target;if(!ne||typeof ne.closest!="function")return;let $e=ne.closest('[data-root-dir][role="button"]');!$e||$e!==ne||(S.preventDefault(),Y($e.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Re),r.addEventListener("keydown",Ie),{render:X,focusRoot:()=>d,panelRoot:()=>u,destroy(){document.removeEventListener("keydown",G),r.removeEventListener("click",Re),r.removeEventListener("keydown",Ie),a.removeEventListener("click",Z),O(),lt(c``,r),e.replaceChildren()}}}var sf="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Uy=1e4;function of(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function af(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var uf="bdui.monitor.done-range",pf="bdui.monitor.running_sort",ff="bdui.monitor.candidate_sort",_f="beads-ui.monitor.candidate-filter",mf="beads-ui.monitor.sections";function Wy(){try{let e=window.localStorage.getItem(_f);if(!e)return{...rs};let t=JSON.parse(e);return!t||typeof t!="object"?{...rs}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:rs.show_blocked,spec:Ka.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...rs}}}function lf(e){try{window.localStorage.setItem(_f,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function zy(){try{let e=window.localStorage.getItem(ff);return Bs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Hy(e){try{window.localStorage.setItem(ff,e)}catch{}}function Gy(){try{let e=window.localStorage.getItem(mf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ky(e){try{window.localStorage.setItem(mf,JSON.stringify(e))}catch{}}function Vy(){try{let e=window.localStorage.getItem(uf);return e===null?"today":Kn(e)}catch{return"today"}}function Yy(e){try{window.localStorage.setItem(uf,e)}catch{}}function Zy(){try{return window.localStorage.getItem(pf)==="repo"?"repo":"started"}catch{return"started"}}function Xy(e){try{window.localStorage.setItem(pf,e)}catch{}}var gf="tab:monitor:pipeline",Qy=1e3,cf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Jy=["queue","runnable","done"],df="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function ev(e){return e>=1&&e<=df.length?df[e-1]:`(${e})`}function bf(e,t){let n=zt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,a=t.openDoc,l=t.switchWorkspace,d=t.router,u=t.now||(()=>Date.now()),m=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),y=Vy(),b=Zy(),$=Wy(),D=zy(),W=Gy(),K=ji("beads-ui.monitor.lane-collapsed"),le=!1,Y=null,j=null,O=null,B=null,Z=[],G=null,_e=null,q=null,V=null;function ie(f){return V===null&&(V=rn()),Md(f,V)}function te(f,g){Se(),!(g<=0)&&(_e={lane_id:f,corrected:g},q=setTimeout(()=>{q=null,_e=null,he()},Uy))}function Se(){q!==null&&(clearTimeout(q),q=null),_e=null}function Xe(){let f=Fr.find(g=>g.value===y);return f?f.label:""}let pe=document.createElement("div");pe.className="mon",e.appendChild(pe);let X=document.createElement("div");X.className="worker-drawer-overlay",X.hidden=!0;let Re=document.createElement("div");Re.className="worker-drawer-overlay__backdrop";let Ie=document.createElement("div");Ie.className="worker-drawer-host mon2-drawer",X.append(Re,Ie),e.appendChild(X);let S=Us(null,null),ne=new Map,$e=new Map,ve=null,Ce=null,ge=null,Pe=is(Ie,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,X.hidden=!0,he()}});async function Ye(f,g,w,k,M=!0){if(!o||!w)return null;let U=await o(f,{...g,root_dir:w,expected_revision:k});if(U&&U.conflict&&M){U.queue&&$e.set(w,U.queue);let re=U.queue&&typeof U.queue.revision=="number"?U.queue.revision:k;U=await o(f,{...g,root_dir:w,expected_revision:re})}return U&&U.queue&&w&&$e.set(w,U.queue),U}function $t(f,g){let w=$e.get(f),k=s&&s.get?s.get():null,M=(Array.isArray(k)?k:[]).find(re=>re?.root_dir===f);return(w||M)?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action}async function Dt(f,g,w,k){let M=await Ye(f,g,w,k),U=$e.get(w)?.revision??M?.queue?.revision??k;return tr(M,(re,Te)=>Ye(f,{...g,continuation:re,decision_token:Te},w,U,!1),{refresh:re=>Ye(f,g,w,re?.queue?.revision??$e.get(w)?.revision??U,!1)})}async function _t(f,g,w,k){let M=await tr({continuation_mismatch:k},(re,Te)=>Ye("worker-merge-queue-add",{bead_id:g,continuation:re,decision_token:Te},f,w,!1)),U=M?.queue?.merge_queue?.find(re=>re.bead_id===g)?.continuation_action;M?.applied!==!0&&U?.continuation===null&&U.mismatch&&await _t(f,g,M.queue.revision,U.mismatch)}async function T(f,g,w){let k=await Ye("worker-discard",f,g,w);if(k&&k.discarded===!0){de(ci(k),"success",5e3);return}if(k&&k.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${k.reason}`,"error");return}if(k&&k.accepted&&k.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(k&&k.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${k.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}k&&!k.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function oe(f,g,w){return!o||!w?null:await o(f,{...g,root_dir:w})}async function Ee(){let f=new Map;for(let g of S.pr_wait)f.has(g.root_dir)||f.set(g.root_dir,g.expected_revision);for(let[g,w]of f)await Ye("worker-merge-queue-add-all",{},g,w)}function je(f){let g=W[f];return!!(g&&g.runnable===!0)}function Ze(f){let g={...W[f]||{}};g.runnable=!g.runnable,W={...W,[f]:g},Ky(W),he()}function it(f){K.toggle(f),he()}function wt(f){K.toggleArea(f),he()}function at(f){let g=S.queue_groups.find(w=>w.root_dir===f);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let k=`s${w+1}`,M=g.sublanes.serial.find(U=>U.id===k);if(!M||M.raw_length===0&&M.occupied_by.length===0)return k}return null}function J(f,g){let w=S.queue_groups.find(M=>M.root_dir===f),k=w?w.sublanes.serial.find(M=>M.id===g):void 0;return k?k.raw_length:0}function ee(f,g){let w=ne.get(f),k=ne.get(g);if(!w||!k)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let M=of(w),U=of(k);if(M!==null&&M===U&&w.root_dir===k.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let re=af(w),Te=af(k);if(re&&U!==null){let He=U;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${f}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:k.root_dir,ops:[{bead_id:f,lane:He,index:J(k.root_dir,He)}]}}if(M!==null&&Te&&U===null){let He=M;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:J(w.root_dir,He)}]}}if(re&&M===null&&Te&&U===null){let He=at(w.root_dir);return He===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${He} \uB808\uC778\uC5D0 ${g} \u2192 ${f} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:0},{bead_id:f,lane:He,index:1}]}}return!re&&!Te?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:re?{kind:"note",text:`${ro(k.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ro(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ke(f,g){let w=ee(f,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:sf,title:w.title}:{kind:"place",label:sf,title:w.title}}}function qe(f,g){if(!B||B.bead_id!==f)return null;let w=B.counterpart_id,k=g.filter(M=>M.id===w);return k.length===0?null:{rows:k.map(M=>ke(f,M))}}function ut(f){let g=f.dependency_chips||null,w=f.overlap_chips||[],k=f.scope_state==="missing",M=f.cross_lane_chip,U=f.armed_lane_chip;if(!g&&w.length===0&&!k&&!M&&!U)return null;let re=qe(f.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...k?{scope_missing:!0}:{},...M?{cross_lane:{lane_id:M.lane_id,label:M.label}}:{},...U?{armed_lane:U}:{},...re?{popover:re}:{}}}function Me(f){let g=ut(f);return g?{...f,dependency_chips:g}:f}async function ze(f,g){let w=ee(f,g);if(B=null,w.kind!=="ops"){he();return}let k=hn(w.root_dir,w.ops[0].bead_id);for(let M of w.ops){let U=await gt(M,w.root_dir,k);if(U===null)break;k=U}he()}async function gt(f,g,w){try{let k=await Ye("worker-queue-place",f,g,w,!1);if(k&&k.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!k||k.applied!==!0)return de(k&&typeof k.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${k.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let M=k.queue?k.queue.revision:void 0;return typeof M!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):M}catch(k){return de(pt(k),"error"),null}}function mt(f){let g=je(f.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function ht(f,g){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${g}
    </div>`}function Ut(f){if(O!==f.id)return null;let g=S.queue_groups.find(U=>U.root_dir===f.root_dir),w=f.place_lanes||[],k=S.cross_lanes_revision!==null,M=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let U of S.chain_lanes)M.push({id:`lane:${U.lane_id}`,label:`\uC5F0\uACB0 ${U.number} (${U.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:U.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!k});M.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!k,title:k?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let U of w)M.push({id:`serial:${U.id}`,label:`\uC9C1\uB82C ${Number(U.id.slice(1))}`,count:U.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:M}}function Lt(f){return ht(f,c`${ja(Me(f),Ut(f),{exec_chips_mode:"pinned_only",onOpenDoc:a?(g,w)=>a(w,f.root_dir):void 0})}`)}function Yt(){return S.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${S.runnable.map(f=>Lt(f))}
      </div>`:c`${S.runnable_sections.map(f=>{let g=je(f.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${mt({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(w=>Lt(w))}
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
      ${Bn(Me(f),{actions:Mt(f,!0)})}
    </div>`}function At(f,g,w,k){return c`<div
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
        >${ev(g.seq)}</span
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
      ${k.includes(g.id)?c`<span
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
    </div>`}function Ge(f){let g=S.cross_lanes_revision!==null,w=ie(f.lane_id),k=w?.held===!0,M=w?.cycle===!0,U=w?w.mismatched:[],re=_e&&_e.lane_id===f.lane_id?_e.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
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
        ${M?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${k?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ko}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!g||!f.can_confirm||k}
              title=${k?Ko:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
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
            </div>`:f.rows.map((Te,He)=>At(f,Te,He,U))}
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
      ${Bn(Me(g),{actions:Mt(g)})}
    </div>`}function Q(f){if(f.length===0)return"";let g=f.length-1;return`${f[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function me(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Bn({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function E(f,g){let w=g.occupants,k=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(M=>me(M)),...g.items.map((M,U)=>L(g,M,U))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${w.map(M=>`${M.id} \u2014 ${M.badge}`).join(`
`)}
              >${Q(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...k.length>0?{after:c`${k.map(M=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${M.workspace_name}·${M.lane}과 교차 대기
                </div>`)}`}:{}}}function z(){let f=S.cross_lanes_revision!==null,g=S.chain_lanes.some(w=>w.draft&&w.rows.length===0);return mi({parallel:{rows:S.parallel_rows.map((w,k)=>Nt(w,k)),count:S.parallel_rows.length,collapsed:K.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:S.queue_groups.flatMap(w=>w.sublanes.serial.map(k=>({...E(w,k),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:k.id,lane_length:String(k.raw_length)}}))),collapsed:K.isAreaCollapsed("serial"),extra_panes:S.chain_lanes.map(w=>Ge(w)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!f}
          title=${f?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...S.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Le(f){return c`<div class="worker-rungrid">
      ${S.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:S.running.map(g=>Cl({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},f,j,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:ut(g)}}))}
    </div>`}function Ke(f){let g={runnable:S.runnable,queue:S.queue,running:S.running,pr_wait:S.pr_wait,done:S.done},w=k=>{let M=g[k.lane],U=k.lane==="runnable"?S.runnable_flat?M.length>0?Yt():void 0:S.runnable_sections.length>0?Yt():void 0:k.lane==="queue"?S.queue_groups.length>0||S.chain_lanes.length>0||S.parallel_rows.length>0||S.cross_lanes_unreadable?z():void 0:k.lane==="running"?Le(f):M.length>0?c`${M.map(re=>Bn(re))}`:void 0;return Zn({id:`monitor-${k.lane}`,lane:k.pane,title:k.title,items:M,count:M.length,src:k.lane==="runnable",empty:k.empty,body:U,live:k.lane==="running"&&M.length>0,collapsible:!0,collapsed:K.isCollapsed(k.pane),controls:k.lane==="runnable"?Ae():void 0,header_control:ct(k.lane,M.length)})};if(le){let k=Jy.map(M=>cf.find(U=>U.lane===M)).filter(M=>M!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${gi({live:S.running.length>0,running_body:S.running.length>0?Le(f):"",pr_wait_rows:S.pr_wait.map(M=>Bn(M)),count:S.running.length+S.pr_wait.length})}
            ${k.map(M=>w(M))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${cf.map(k=>w(k))}
        </div>
      </div>`}function Ae(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${S.runnable_hidden.blocked>0?` ${S.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ka.map(f=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${$.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${S.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${S.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ct(f,g){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${D}
      >
        ${Bs.map(w=>c`<option
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
      </select>`:""}function dt(f){let g=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=f===void 0?s&&s.crossLanes?s.crossLanes():void 0:f,M={done_since:$r(y,u()),running_sort:b,candidate_filter:$,candidate_sort:D};return k!==void 0&&(M.cross_lanes=k),Us(g,w,M)}function he(){let f=u();S=dt(),V=null,ne=new Map;for(let g of[...S.runnable,...S.queue,...S.running,...S.pr_wait,...S.done])!g.non_occupying&&!ne.has(g.id)&&ne.set(g.id,g);lt(Ke(f),pe),P()?.render(),st(),N()}function st(){let f=new Map;for(let g of S.queue_groups)f.set(g.root_dir,g.auto_advance);for(let g of Array.from(pe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",k=f.get(w);typeof k=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${k?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function P(){if(ge)return ge;let f=pe.querySelector(".mon2-deck");return f?(ge=rf(f,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>S.done,rangeLabel:Xe,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:et,onFocusChange:g=>{G=g,N()}}),ge):null}function N(){pe.classList.toggle("has-focus",G!==null);for(let f of Array.from(pe.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",G!==null&&f.getAttribute("data-root-dir")===G);for(let f of Array.from(pe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=ne.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",G!==null&&!!g&&g.root_dir===G)}for(let f of Array.from(pe.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",G!==null&&f.getAttribute("data-root-dir")===G)}function ye(f,g){let w=i?i():void 0;if(!g||!w||g===w||!l){r(f);return}l(g).then(()=>{r(f)}).catch(k=>{n("workspace switch for %s failed: %o",g,k)})}function et(f){if(!f)return;let g=i?i():void 0,w=()=>{try{d?.gotoView("worker")}catch(k){n("gotoView(worker) failed: %o",k)}};if(!l||g&&g===f){w();return}l(f).then(w).catch(k=>{n("workspace switch for %s failed: %o",f,k),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function we(f){qn(f).then(g=>{de(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function nt(f){let g=ne.get(f)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function pt(f){if(typeof f=="string"&&f.length>0)return f;if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function yt(f,g,w){if(f!=="dep-add")return;let k=S.chain_lanes.find(M=>M.rows.some(U=>U.id===g));!k||!k.rows.some(M=>M.id===w)||await ue(M=>Ud(k.lane_id,M),"",[{type:f,a:g,b:w}])}function St(){let f=new Map,g=s&&s.get?s.get():null,w=k=>Array.isArray(k)?k.filter(M=>typeof M=="string"&&M.length>0):[];for(let k of Array.isArray(g)?g:[]){if(!k||typeof k!="object")continue;let M=k.bead_blocked_by&&typeof k.bead_blocked_by=="object"?k.bead_blocked_by:{};for(let[U,re]of Object.entries(M))Array.isArray(re)&&f.set(U,w(re));for(let U of[...Array.isArray(k.runnable)?k.runnable:[],...Array.isArray(k.session_active)?k.session_active:[]])U&&typeof U.bead_id=="string"&&Array.isArray(U.blocked_by)&&U.blocked_by.length>0&&f.set(U.bead_id,w(U.blocked_by))}return f}function Zt(){let f=new Map,g=new Map,w=s&&s.get?s.get():null,k=M=>Array.isArray(M)?M.filter(U=>typeof U=="string"&&U.length>0):[];for(let M of Array.isArray(w)?w:[]){if(!M||typeof M!="object")continue;let U=M.bead_blocked_by&&typeof M.bead_blocked_by=="object"?M.bead_blocked_by:{};for(let[re,Te]of Object.entries(U))Array.isArray(Te)&&f.set(re,k(Te));for(let re of Array.isArray(M.runnable)?M.runnable:[])re&&typeof re.bead_id=="string"&&Array.isArray(re.blocked_by)&&g.set(re.bead_id,k(re.blocked_by))}for(let M of Z)for(let U of[f,g]){let re=U.get(M.a);re!==void 0&&U.set(M.a,M.type==="dep-remove"?re.filter(Te=>Te!==M.b):re.includes(M.b)?re:[...re,M.b])}return{snapshot:f,runnable:g}}function Tt(){let f=St();for(let g of Z){let w=(f.get(g.a)||[]).slice();g.type==="dep-remove"?f.set(g.a,w.filter(k=>k!==g.b)):w.includes(g.b)||f.set(g.a,[...w,g.b])}return f}function rn(f=S,g=Wt()){let w=new Map;for(let rt of Array.isArray(g?.lanes)?g.lanes:[]){let Ue=new Map;for(let h of Array.isArray(rt?.entries)?rt.entries:[])h&&typeof h.bead_id=="string"&&Ue.set(h.bead_id,h.dep_created_by_lane===!0);w.set(typeof rt?.id=="string"?rt.id:"",Ue)}let k=new Map,M=new Map,U=new Set,re=new Set;for(let rt of f.chain_lanes){let Ue=w.get(rt.lane_id);k.set(rt.lane_id,{status:rt.status,entries:rt.rows.map((h,H)=>({bead_id:h.id,root_dir:h.root_dir,...H===0?{}:{dep_created_by_lane:Ue?.get(h.id)===!0}}))});for(let h of rt.rows)M.set(h.id,rt.lane_id),h.fixed&&U.add(h.id),h.unplaced||re.add(h.id)}let Te=new Map;for(let rt of f.parallel_rows)typeof rt.queue_index=="number"&&Te.set(rt.id,rt.queue_index);for(let rt of f.queue_groups)for(let Ue of rt.sublanes.serial)for(let h of Ue.items)typeof h.queue_index=="number"&&Te.set(h.id,h.queue_index);let He=Zt();return{blocked_by_map:Tt(),snapshot_blocked_by:He.snapshot,runnable_blocked_by:He.runnable,owner_of:new Map(Object.entries(f.owner_of)),cross_lanes:k,owner_lane_of:M,fixed_members:U,placed_members:re,parallel_rows:f.parallel_rows.map(rt=>({bead_id:rt.id,root_dir:rt.root_dir,queue_index:rt.queue_index??0})),parallel_raw_length:new Map(Object.entries(f.parallel_raw_length)),queue_index_of:Te}}function Wt(){return(s&&s.crossLanes?s.crossLanes():null)??null}function hn(f,g){let w=ne.get(g);if(w&&w.root_dir===f)return w.expected_revision;let k=S.queue_groups.find(M=>M.root_dir===f);return k?k.revision:0}async function Ve(f,g,w){if(f.type==="worker-queue-disarm"){try{let k=await Ye(f.type,f.payload,f.root_dir,w.get(f.root_dir)??hn(f.root_dir,g));k&&k.queue&&typeof k.queue.revision=="number"&&w.set(f.root_dir,k.queue.revision)}catch{}return!0}if(f.type==="worker-queue-place"||f.type==="worker-queue-reorder"||f.type==="worker-queue-remove")return await Kt(f.type,f.payload,f.root_dir,w,{bead_id:g})!==null;try{return(f.type==="dep-add"||f.type==="dep-remove")&&await oe(f.type,{a:f.a,b:f.b},f.root_dir),!0}catch(k){return de(pt(k),"error"),!1}}async function Kt(f,g,w,k,M){try{let U=await Ye(f,g,w,k.get(w)??hn(w,M.bead_id));return!U||typeof U.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(U.queue&&typeof U.queue.revision=="number"&&k.set(w,U.queue.revision),U.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):U.applied===!1?(de(U.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${U.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):U.queue&&typeof U.queue.revision=="number"?U.queue.revision:k.get(w)??0)}catch(U){return de(pt(U),"error"),null}}function Xt(f){(f.type==="dep-add"||f.type==="dep-remove")&&(Z=[...Z,{type:f.type,a:f.a,b:f.b}])}async function yn(f,g){if(!o)return{ok:!1};try{let w=await o(f.type,{...f.payload,expected_revision:g});return!w||typeof w.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let k=w,M=k&&k.code==="conflict"?k.details?.cross_lanes:null;return M&&typeof M.revision=="number"&&Array.isArray(M.lanes)?{ok:!1,conflict:M}:(de(pt(w),"error"),{ok:!1})}}async function fe(f,g,w){let k=new Map,M=[],U=f.ops.slice(0,f.lane_op_index),re=f.ops.slice(f.lane_op_index);for(let He of U){if(!await Ve(He,w,k))return{done:!0};Xt(He)}let Te=g;for(let He of f.lane_ops){if(Te===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let rt=await yn(He,Te);if(!rt.ok)return rt.conflict?{done:!1,conflict:rt.conflict}:{done:!0};Te=rt.revision}for(let He of re){if(!await Ve(He,w,k))return{done:!0};Xt(He),He.type==="dep-add"&&M.push(He)}for(let He of Hd(M))Te=await A(He,Te);return{done:!0}}async function A(f,g){if(g===null||!o)return g;let w=f.pairs,k=g;for(let M=0;M<2;M+=1){if(w.length===0)return k;try{let U=await o("monitor-lane-provenance",{lane_id:f.lane_id,pairs:w.map(re=>({bead_id:re.bead_id,after:re.after,value:!0})),expected_revision:k});return U&&typeof U.revision=="number"?U.revision:k}catch(U){let re=U,Te=re&&re.code==="conflict"?re.details?.cross_lanes:null;if(!Te||typeof Te.revision!="number"||!Array.isArray(Te.lanes))return k;let He=Te.lanes.find(rt=>rt&&rt.id===f.lane_id);w=Gd(Array.isArray(He?.entries)?He.entries:[],w),k=Te.revision}}return k}async function ue(f,g,w=[]){Z=w,Se();let k=S,M=Wt();for(let U=0;;U+=1){let re=f(rn(k,M));if("refused"in re){de(re.refused,"error");break}let Te=await fe(re,k.cross_lanes_revision,g);if(Te.done){re.correction&&te(re.correction.lane_id,re.correction.corrected);break}if(U>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}k=dt(Te.conflict),M=Te.conflict}Z=[],he()}async function Oe(f,g){await ue(w=>Ca(f,g,w),f.bead_id)}async function kt(f,g){if(f==="run"){await Et(g);return}if(f==="stop"){await Vt(g);return}if(f==="create"){await ue(w=>Ra(null,w),"");return}if(f==="remove"){let w=zd(g,rn());if(w!==null&&!m(w))return;await ue(k=>Wd(g,k),"");return}await ue(w=>f==="confirm"?jd(g,w):Bd(g,w),"")}function Rt(f){let g=new Map;for(let w of f.rows){let k=S.owner_of[w.id]||w.root_dir;typeof k!="string"||k.length===0||g.set(k,[...g.get(k)||[],w.id])}return g}async function Et(f){let g=S.chain_lanes.find(U=>U.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Se();let w=new Map,k=new Map,M=Rt(g);for(let U of g.rows){if(!U.unplaced)continue;let re=S.owner_of[U.id]||U.root_dir;if(typeof re!="string"||re.length===0){de(`${U.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),he();return}let Te=k.get(re)??0;if(await Kt("worker-queue-place",{bead_id:U.id,lane:"parallel",index:(S.parallel_raw_length[re]??0)+Te},re,w,{bead_id:U.id})===null){he();return}k.set(re,Te+1)}for(let[U,re]of M)if(await Kt("worker-queue-arm",{bead_ids:re,lane_id:f},U,w,{bead_id:re[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),he();return}he()}async function Vt(f){let g=S.chain_lanes.find(k=>k.lane_id===f);if(!g||S.cross_lanes_revision===null){he();return}Se();let w=new Map;for(let[k,M]of Rt(g))if(await Kt("worker-queue-disarm",{lane_id:f},k,w,{bead_id:M[0]})===null)break;he()}async function on(f,g){let{root_dir:w,revision:k}=nt(f);if(w.length===0){he();return}await Kt("worker-queue-disarm",{bead_ids:[f],lane_id:g},w,new Map([[w,k]]),{bead_id:f}),he()}async function an(f,g){let w=ne.get(f);if(!w){he();return}let k={kind:"candidate",bead_id:f,root_dir:w.root_dir};if(g==="new-lane"){await ue(M=>Ra({bead_id:f,root_dir:w.root_dir},M),f);return}if(g.startsWith("lane:")){let M=g.slice(5);if(!S.chain_lanes.find(re=>re.lane_id===M)){he();return}await ue(re=>Ca(k,{kind:"chain",lane_id:M,marker_index:(re.cross_lanes.get(M)?.entries??[]).length},re),f);return}if(g.startsWith("serial:")){let M=g.slice(7),U=(w.place_lanes||[]).find(re=>re.id===M);await Oe(k,{kind:"repo-serial",root_dir:w.root_dir,lane_id:M,index:U?U.index:0});return}await Oe(k,{kind:"parallel",marker_index:S.parallel_rows.length})}async function Sn(f,g){let w=S.parallel_rows,k=w.findIndex(rt=>rt.id===f);if(k<0)return;let M=w[k].root_dir,U=[];w.forEach((rt,Ue)=>{rt.root_dir===M&&U.push(Ue)});let re=U.indexOf(k),Te=U[re+g];if(typeof Te!="number")return;let He=g===-1?Te:U[re+2]??Math.min(w.length,Te+1);await Oe({kind:"parallel",bead_id:f,root_dir:M,queue_index:w[k].queue_index??0},{kind:"parallel",marker_index:He})}async function It(f){for(let g of S.chain_lanes){let w=g.rows.find(k=>k.id===f);if(w){await Oe({kind:"chain",bead_id:f,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:S.parallel_rows.length});return}}}let ln=null,pn=!1,fn=null;function Xn(){fn!==null&&clearTimeout(fn),fn=setTimeout(()=>{fn=null,pn=!1},0)}function x(f,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&f.contains(w)){let k=Number(w.getAttribute("data-row-index"));return Number.isFinite(k)?k:0}return f.querySelectorAll("[data-row-index]").length}function C(f){let g=typeof f?.closest=="function"?f.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:S.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function De(f){let g=f.target;if(!ln)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return C(g);let k=w.getAttribute("data-drop");if(k==="candidate")return{zone:w,target:{kind:"candidate"}};if(k==="parallel")return{zone:w,target:{kind:"parallel",marker_index:x(w,g)}};if(k==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:x(w,g)}};if(k==="repo-serial"){let M=w.getAttribute("data-root-dir")||"";if(M!==ln.root_dir)return null;let U=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,re=U&&w.contains(U)?U.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Te=Number(re);return{zone:w,target:{kind:"repo-serial",root_dir:M,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Te)?Te:0}}}return null}function Ne(){for(let f of Array.from(pe.querySelectorAll(".is-drop-over")))f.classList.remove("is-drop-over")}let Je=null;function p(f){Je=f.target instanceof Element?f.target:null}function v(f){let g=f.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,k=w?w.closest("[data-drag-kind]"):null;if(!k)return;if(w&&Je&&w.contains(Je)&&typeof Je.closest=="function"&&Je.closest("input, button, a")){f.preventDefault();return}let M=k.getAttribute("data-bead-id")||"",U=k.getAttribute("data-drag-kind")||"",re=k.getAttribute("data-root-dir")||"";if(!M||!U||!re)return;let Te=k.getAttribute("data-queue-index")||"",He=Number(Te),rt=k.getAttribute("data-lane-id")||"";ln={kind:U,bead_id:M,root_dir:re,...Te!==""&&Number.isFinite(He)?{queue_index:He}:{},...rt?{lane_id:rt}:{}},pn=!0,O=null,pe.classList.add("is-dragging");try{f.dataTransfer?.setData("text/plain",M),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function F(f){let g=De(f);g&&(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function ce(f){let g=f.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function xe(){ln=null,Ne(),pe.classList.remove("is-dragging"),Xn()}function ft(f){let g=De(f),w=ln;ln=null,Ne(),pe.classList.remove("is-dragging"),!(!g||!w)&&(f.preventDefault(),Oe(w,g.target))}function ot(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Qt(f,g){let{item:w,root_dir:k,revision:M}=nt(g),U=w?.attempt_id||"",re=f.classList;if(re.contains("worker-mini__rowops-up")||re.contains("worker-mini__rowops-down")){Sn(g,re.contains("worker-mini__rowops-up")?-1:1);return}if(re.contains("worker-mini__rowops-remove")){Ye("worker-queue-remove",{bead_id:g},k,M);return}if(re.contains("mon2-crow__detach")){It(g);return}if(re.contains("worker-dep__open")){ye(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(re.contains("mon2-arm__release")){on(g,f.getAttribute("data-lane-id")||"");return}if(re.contains("mon-lane__chip")){let Te=f.getAttribute("data-lane-id")||"";pe.querySelector(`.mon2-clane[data-lane-id="${Te}"]`)?.scrollIntoView({block:"nearest"});return}if(re.contains("mon-overlap__chip")){let Te=f.getAttribute("data-overlap-id")||"";B=!!B&&B.bead_id===g&&B.counterpart_id===Te?null:{bead_id:g,counterpart_id:Te},he();return}if(re.contains("mon-overlap__place")){ze(g,f.getAttribute("data-counterpart-id")||"");return}if(re.contains("worker-card__place")){O=O===g?null:g,he();return}if(re.contains("worker-card__place-cancel")){O=null,he();return}if(re.contains("worker-card__place-lane")){let Te=f.getAttribute("data-lane")||"parallel";O=null,an(g,Te);return}if(re.contains("rtile__session")){if(w&&w.kind==="session"){let Te=(w.session_refs||[]).find(He=>He&&He.current===!0);Te&&(X.hidden=!1,Pe.open(Yr(Te,g,"in_progress",k)),he());return}j=U,U&&w&&(X.hidden=!1,Pe.open({attempt_id:U,root_dir:k,meta:ot(w)})),he();return}if(re.contains("rtile__pause")){oe("worker-attempt-pause",{attempt_id:U},k);return}if(re.contains("rtile__resume")){Vr().then(Te=>{if(Te!==null)return Dt("worker-attempt-resume",{attempt_id:U,...Te!==""?{instructions:Te}:{}},k,M)});return}if(re.contains("rtile__dismiss")){Ye("worker-attempt-dismiss",{attempt_id:U},k,M);return}if(re.contains("rtile__discard")){if(!m(Ms(g,"unmerged")))return;T({bead_id:g,...U?{attempt_id:U}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},k,M);return}if(re.contains("worker-mini__merge")){let Te=$t(k,g);Te?.mismatch&&Te.continuation===null?_t(k,g,M,Te.mismatch):Ye("worker-merge-queue-add",{bead_id:g},k,M);return}if(re.contains("worker-mini__merge-cancel")){Ye("worker-merge-queue-remove",{bead_id:g},k,M);return}if(re.contains("worker-mini__discard")){let Te=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ms(g,Te)))return;T({bead_id:g,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},k,M);return}if(re.contains("worker-mini__revise-fix")){Dt("worker-revise-fix",{bead_id:g},k,M);return}re.contains("worker-mini__revise-approve")&&Ye("worker-revise-approve",{bead_id:g},k,M)}function qt(f){let g=pn;pn=!1;let w=f.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let k=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(k){f.preventDefault();let be=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||k.textContent?.trim()||"";be&&we(be);return}let M=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(M){f.preventDefault();let R=M.getAttribute("data-root-dir")||ne.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||M.getAttribute("title")||"";et(R);return}let U=w.closest(".mon2-sec__toggle");if(U){f.preventDefault(),Ze(U.getAttribute("data-root-dir")||"");return}let re=w.closest(".worker-pane__toggle[data-lane]");if(re){f.preventDefault();let R=re.getAttribute("data-lane")||"";(R==="candidate"||R==="queue"||R==="running"||R==="pr_wait"||R==="done")&&it(R);return}let Te=w.closest(".worker-wait__area-toggle[data-area]");if(Te){f.preventDefault(),wt(Te.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){f.preventDefault(),kt("create","");return}let He=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(He){f.preventDefault();let R=He.getAttribute("data-lane-id")||"",be=He.classList;kt(be.contains("mon2-clane__confirm")?"confirm":be.contains("mon2-clane__reapply")?"reapply":be.contains("mon2-clane__run")?"run":be.contains("mon2-clane__stop")?"stop":"remove",R);return}if(w.closest(".mon-merge-all")){f.preventDefault(),Ee();return}let rt=w.closest(".mon-filter__spec");if(rt){f.preventDefault(),$={...$,spec:rt.getAttribute("data-spec")||"all"},lf($),he();return}let Ue=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ue)return;let h=Ue.getAttribute("data-bead-id")||"",H=w.closest("button");if(H){f.preventDefault(),Qt(H,h);return}h&&!g&&(f.preventDefault(),ye(h,Ue.getAttribute("data-root-dir")||nt(h).root_dir))}function Jt(f){let g=f.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){$={...$,show_blocked:w.checked},lf($),he();return}let k=g.closest(".mon-candidate-sort");if(k){D=Bs.some(re=>re.value===k.value)?k.value:"repo_spec",Hy(D),he();return}let M=g.closest(".mon-running-sort");if(M){b=M.value==="repo"?"repo":"started",Xy(b),he();return}let U=g.closest(".mon-done-range");U&&(y=Kn(U.value),Yy(y),he())}function En(f){let g=f.target,w=g&&typeof g.closest=="function"?M=>g.closest(M):()=>null,k=!1;B&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(B=null,k=!0),k&&he()}function vn(f){f.key!=="Escape"||!B||(B=null,he())}e.addEventListener("click",qt),e.addEventListener("change",Jt),e.addEventListener("pointerdown",p),document.addEventListener("click",En),document.addEventListener("keydown",vn),e.addEventListener("dragstart",v),e.addEventListener("dragover",F),e.addEventListener("dragleave",ce),e.addEventListener("drop",ft),e.addEventListener("dragend",xe);{let f=!0;Y=Fi(g=>{if(le=g,f){f=!1;return}he()})}s&&typeof s.subscribe=="function"&&(ve=s.subscribe(()=>{try{$e.clear(),he()}catch{}}));function en(){Ce!==null&&(clearInterval(Ce),Ce=null)}function On(){fn!==null&&(clearTimeout(fn),fn=null)}return{recorrectSharedLane:yt,load(){n("load"),he(),Ce===null&&(Ce=setInterval(()=>{try{he()}catch{}},Qy))},pause(){en()},clear(){en(),On(),ve&&(ve(),ve=null),Y&&(Y(),Y=null),Pe.destroy(),X.hidden=!0,ge?.destroy(),ge=null,e.removeEventListener("click",qt),e.removeEventListener("change",Jt),e.removeEventListener("pointerdown",p),document.removeEventListener("click",En),document.removeEventListener("keydown",vn),e.removeEventListener("dragstart",v),e.removeEventListener("dragover",F),e.removeEventListener("dragleave",ce),e.removeEventListener("drop",ft),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function hf(e,t,n){let r=zt("views:nav"),{global_element:s,repo_element:o}=e,i=null;function a(y){return b=>{b.preventDefault();let $=y==="monitor"&&l()==="monitor"?"worker":y;r("click tab %s",$),n.gotoView($)}}function l(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function d(){let y=l();return c`
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
    `}function u(){let y=l();return c`
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
    `}function m(){s&&lt(d(),s),o&&lt(u(),o)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),s&&lt(c``,s),o&&lt(c``,o)}}}var yf=["bug","feature","task","epic","chore"];function vf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wf=["Critical","High","Medium","Low","Backlog"];function kf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),u=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let B of yf){let Z=document.createElement("option");Z.value=B,Z.textContent=vf(B),o.appendChild(Z)}i.replaceChildren();for(let B=0;B<=4;B+=1){let Z=document.createElement("option");Z.value=String(B);let G=wf[B]||"Medium";Z.textContent=`${B} \u2013 ${G}`,i.appendChild(Z)}}b();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(O){s.disabled=O,o.disabled=O,i.disabled=O,a.disabled=O,l.disabled=O,u.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function W(){d.textContent=""}function K(O){d.textContent=O}function le(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?i.value=B:i.value="2"}catch{o.value="",i.value="2"}}function Y(){let O=o.value||"",B=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function j(){W();let O=String(s.value||"").trim();if(O.length===0){K("Title is required"),s.focus();return}let B=Number(i.value||"2");if(!(B>=0&&B<=4)){K("Priority must be 0..4"),i.focus();return}let Z=String(o.value||""),G=String(l.value||""),_e={title:O};Z.length>0&&(_e.type=Z),String(B).length>0&&(_e.priority=B),G.length>0&&(_e.description=G),D(!0);try{await t("create-issue",_e)}catch{D(!1),K("Failed to create issue");return}Y(),D(!1),$()}return n.addEventListener("cancel",O=>{O.preventDefault(),$()}),y.addEventListener("click",()=>$()),u.addEventListener("click",()=>$()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),j())}),r.addEventListener("submit",O=>{O.preventDefault(),j()}),{open(){r.reset(),W(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var tv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function nv(e,t){return ba(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function $f(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=nv(r,e);return c`<button
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
        ${tv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var rv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Sf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(te=>de(te,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let a="execution",l=!1,d="",u=null;function m(){if(u)return u;let te=i.querySelector('[data-pane="execution"]');return te?(u=Ui(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Se=>t.queueStore?.set?.(Se)}),u):null}function y(){return c`
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
    `}function b(){let te=r.get();return c`
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
        ${te?c`
              ${$f(te,s(),K)}
              ${xf(te,d,{onDraft:Se=>{d=Se},onAdd:le,onRemove:Y})}
              ${Af(te,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(te){let Se=r.get();if(Se)try{let Xe=await n("display-policy-set",{expected_revision:Se.revision,policy:te(Se)});D(Xe),Xe&&Xe.conflict&&Xe.policy&&(Xe=await n("display-policy-set",{expected_revision:Xe.policy.revision,policy:te(Xe.policy)}),D(Xe)),Xe&&Xe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function W(te){$(te)}function K(te){let Se=r.get();if(!Se)return;let Xe=!sv(te,Se);W(pe=>ov(te,pe,Xe))}function le(){let te=d.trim();te.length!==0&&(d="",W(Se=>Se.hidden_prefixes.includes(te)?{hidden_prefixes:Se.hidden_prefixes}:{hidden_prefixes:[...Se.hidden_prefixes,te]}),O())}function Y(te){W(Se=>({hidden_prefixes:Se.hidden_prefixes.filter(Xe=>Xe!==te)}))}function j(te){let Se=r.get();if(!Se)return;let Xe=Se.chips[te]===!1;W(()=>({chips:{[te]:Xe}}))}function O(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${rv.map(te=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(a===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>B(te.id)}
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
      `,i),m()}function B(te){a=te,O()}let Z=()=>{l=!1,t.onOpenChange?.(!1)};i.addEventListener("close",Z),i.addEventListener("cancel",Z);let G=te=>{te.target===i&&ie()};i.addEventListener("click",G);let _e=null;r.subscribe&&(_e=r.subscribe(()=>{l&&O()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{l&&u?.render()}));function V(te="execution"){l||(l=!0,t.onOpenChange?.(!0),a=te,d="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function ie(){l&&(l=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:V,close:ie,sessionDraft:()=>u?.sessionDraft()??{},destroy(){l=!1,i.removeEventListener("close",Z),i.removeEventListener("cancel",Z),i.removeEventListener("click",G),_e&&(_e(),_e=null),q&&(q(),q=null),u?.destroy(),u=null,i.remove()}}}function sv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function ov(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var iv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ef="usage-meter-card",av="usage-meter-layer",Ol=600,lv=["token_expired","relogin_required"];function Tf(e){return String(e).padStart(2,"0")}function cv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Cf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Tf(r.getHours())}:${Tf(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${iv[r.getMonth()]} ${r.getDate()} ${o}`;return`${cv(n,t)} \xB7 ${a}`}function dv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Rf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Of(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Lf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Pf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function uv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Pf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function pv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let i=uv(o);i&&r.push(i)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?Pf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function fv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=pv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Df(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function _v(e,t){return!e.held||Df(e,t)<=Ol?e:{...e,available:!1,windows:[],accounts:[]}}function If(e,t){return`${e}:${t}`}function Mf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,i=new Map,a=0,l=null;function d(){lt(c``,e),e.hidden=!0,m()}function u(){if(l===null){let pe=e.ownerDocument;l=pe.createElement("div"),l.id=av,l.className="usage-meter__layer",pe.body.appendChild(l)}return l}function m(){l!==null&&(lt(c``,l),l.remove(),l=null)}function y(pe){n!==pe&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",W),window.addEventListener("resize",D)),n=pe)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",W),window.removeEventListener("resize",D))}function $(pe){let X=pe.target;X&&(e.contains(X)||l!==null&&l.contains(X))||(b(),ie())}function D(){ie()}function W(pe){pe.key==="Escape"&&(b(),ie())}function K(pe){n===pe?b():y(pe),ie()}function le(){b(),ie()}async function Y(pe,X){if(r.has(pe.key))return;let Re=If(pe.key,X);r.set(pe.key,X),i.delete(Re),ie();let Ie=null;try{Ie=await(await fetch(pe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:X})})).json()}catch{Ie=null}if(t)return;if(r.delete(pe.key),!Ie||Ie.ok!==!0){let ne=Ie&&typeof Ie.error=="string"&&Ie.error.length>0?Ie.error:"network_error";i.set(Re,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),ie();return}let S=Array.isArray(Ie.warnings)?Ie.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];S.length>0&&i.set(Re,{kind:"warn",text:S.join(" \xB7 ")}),ie(),await Xe()}function j(pe,X,Re,Ie){let S=Of(pe.pct),$e=`resets ${Cf(pe.resetsAt,Ie)}${X?` \xB7 ${Re}`:""}`;return c`<span
      class="usage-meter__window ${Rf(S)}"
      style=${`--progress: ${S}%`}
      title=${$e}
    >
      <span class="usage-meter__label">${pe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${S}%</span>
    </span>`}function O(pe,X,Re){let Ie=Df(X,Re),S=X.available&&(X.held||Ie>Ol),ne=S?`${Math.floor(Ie/60)}\uBD84 \uC804 \uCE21\uC815`:"",$e=X.accounts.filter(Pe=>!Pe.active).length,ve=`usage-meter__group${S?" usage-meter__group--stale":""}`,Ce=c`<span class="usage-meter__provider"
        >${pe.label}</span
      >
      ${X.available?X.windows.map(Pe=>j(Pe,S,ne,Re)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${$e>0?c`<span class="usage-meter__badge">+${$e}</span>`:""}`;if(X.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${pe.label} usage`}
        >${Ce}</span
      >`;let ge=n===pe.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${pe.label} usage`}
      aria-expanded=${ge?"true":"false"}
      aria-controls=${Ef}
      @click=${()=>K(pe.key)}
    >
      ${Ce}
    </button>`}function B(pe,X){return c`<span class="usage-meter" aria-label="Usage">
      ${pe.map(Re=>O(Re.provider,Re.snapshot,X))}
    </span>`}function Z(pe,X){let Re=Of(pe.pct),Ie=Cf(pe.resetsAt,X);return c`<span
      class="usage-meter__account-window ${Rf(Re)}"
      style=${`--progress: ${Re}%`}
    >
      <span class="usage-meter__account-key">${pe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Re}%</span>
      <span class="usage-meter__account-reset"
        >${Ie.length>0?`\u21BB ${Ie}`:""}</span
      >
    </span>`}function G(pe,X){return lv.includes(X)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${pe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function _e(pe,X,Re){let Ie=X.status==="ok",S=typeof X.ageSeconds=="number"&&X.ageSeconds>Ol,ne=i.get(If(pe.key,X.number)),$e=r.get(pe.key),ve=$e!==void 0,Ce=$e===X.number,ge=["usage-meter__account"];return X.active&&ge.push("usage-meter__account--active"),Ie||ge.push("usage-meter__account--unavailable"),S&&ge.push("usage-meter__account--stale"),c`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${X.email}
          >${X.alias===null?X.email:X.alias}</span
        >
        ${X.plan===null?"":c`<span class="usage-meter__account-tag">${X.plan}</span>`}
        ${X.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${X.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${dv(X.ageSeconds)}</span
            >`}
        ${X.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{Y(pe,X.number)}}
            >
              ${Ce?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ie?c`<div class="usage-meter__account-windows">
            ${X.windows.map(Pe=>Z(Pe,Re))}
          </div>`:c`<div class="usage-meter__account-status">
            ${G(pe,X.status)}
          </div>`}
      ${ne===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function q(pe,X,Re){let Ie=X.accounts.filter(S=>S.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${pe.label} · 활성 ${Ie} / 전체
        ${X.accounts.length}
      </h2>
      ${X.accounts.map(S=>_e(pe,S,Re))}
    </section>`}function V(pe,X){return c`<div
      class="usage-meter__card"
      id=${Ef}
      role="dialog"
      aria-label=${`${pe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(pe.provider,pe.snapshot,X)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ie(){let pe=Date.now(),X=[];for(let Ie of Lf){let S=o.get(Ie.key);S&&X.push({provider:Ie,snapshot:_v(S,pe)})}if(X.length===0){b(),d();return}let Re=X.find(Ie=>Ie.provider.key===n&&Ie.snapshot.accounts.length>0);Re||b(),lt(B(X,pe),e),e.hidden=!1,Re?te(Re,pe):m()}function te(pe,X){let Re=u(),Ie=e.getBoundingClientRect(),S=e.ownerDocument.documentElement.clientWidth;Re.style.setProperty("--usage-meter-anchor-top",`${Ie.bottom}px`),Re.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,S-Ie.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${V(pe,X)}`,Re)}async function Se(pe){try{let X=await fetch(pe.endpoint);return X.ok?fv(await X.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Xe(){a+=1;let pe=a,X=await Promise.all(Lf.map(async Re=>({provider:Re,read:await Se(Re)})));if(!(t||pe!==a)){for(let Re of X){let Ie=Re.provider.key;if(Re.read.kind==="ok"){o.set(Ie,Re.read.snapshot);continue}if(Re.read.kind==="empty"){o.delete(Ie);continue}let S=o.get(Ie);S!==void 0&&!S.held&&o.set(Ie,{...S,held:!0})}ie()}}return d(),Xe(),s=setInterval(()=>{Xe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),d()}}}function Nf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,i=r.get(s.bead_id),a=typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at;return!o&&!a&&typeof s.dismissed_at!="number"}}var mv="worker-ineligible";function so(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qf(e){return so(e).includes(mv)}var gv="session-preferred",bv=["exclusive_machine","iterative_user_judgment","visual_verification"];function Ff(e,t){if(!so(e).includes(gv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&bv.includes(n)?n:""}var hv="worker-serial";function Ll(e){return so(e).includes(hv)}var Uf="bdui.worker.candidate_sort",oo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),zi=Object.freeze({preset:"spec"}),Wf=3,zf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function jf(e){return oo.some(t=>t.id===e)}function Bf(e){let t=oo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function yv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function io(e){return e&&"preset"in e?Bf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Bf("spec")}function Il(e){return e&&"preset"in e?e.preset:null}function ao(e){if(typeof e=="string"){let o;try{o=JSON.parse(e)}catch{return jf(e)?{preset:e}:zi}return ao(o)}if(!e||typeof e!="object")return zi;let t=e;if(jf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Wf||!n.every(fa))return zi;let r=[];for(let o of n)r.some(i=>i.key===o.key)||r.push({key:o.key,dir:o.dir});let s=oo.find(o=>yv(o.chain,r));return s?{preset:s.id}:{chain:r}}function Hf(){try{return ao(window.localStorage.getItem(Uf))}catch{return zi}}function Pl(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}function Gf(e,t,n){let r=e.map(l=>({...l}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Co,n))return r;let s=n;if(r.slice(0,t).some(l=>l.key===s))return r.slice(0,t);let o={key:s,dir:r[t]&&r[t].key===s?r[t].dir:Co[s]},i=r.slice(0,t),a=r.slice(t+1).filter(l=>l.key!==s);return[...i,o,...a].slice(0,Wf)}function Kf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Vf(e,t,n){let r=Array.isArray(e)?e.slice():[];return r.sort(Jc(io(t))),!n||n.size===0?r:[...r.filter(s=>!n.has(s.id)),...r.filter(s=>n.has(s.id))]}var Yf=new Set(["sh","bash","zsh","dash","ksh"]),Zf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Xf(e){let t=e.split("/");return t[t.length-1]||""}function vv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Xf(n[0]);if(r!=="env")return Yf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Yf.has(Xf(s))}function wv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function kv(e){let t=[],n=0;Zf.lastIndex=0;for(let r of e.matchAll(Zf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:wv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function $v(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Qf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",i="",a="",l=0,d=null,u=!1;function m(O,B){return B?kv(O).map(Z=>Z.kind==="plain"?Z.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${Z.kind}"
            >${Z.text}</span
          >`):O}function y(){if(!s)return c``;let O=o==="ready"&&vv(i),B=o==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Y()}
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
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Y()}
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
                  ${B.map((Z,G)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${G+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(Z,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){lt(y(),r)}async function $(){if(o!=="ready")return;let O=await qn(i);de(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function D(O){O.key==="Escape"&&s&&(O.preventDefault(),Y())}function W(){u||(document.addEventListener("keydown",D),u=!0)}function K(){u&&(document.removeEventListener("keydown",D),u=!1)}async function le(O,B=null){let Z=++l;W(),s={...O},d=B||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",i="",a="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let _e=t?t():"";if(!_e){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(_e)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let V=await n(q),ie=await V.json().catch(()=>({}));if(Z!==l)return;if((t?t():"")!==_e){Y();return}if(!V.ok||!ie||ie.ok!==!0){o="error",a=$v(ie&&typeof ie.error=="string"?ie.error:""),b();return}s={lane:ie.lane,base_sha:ie.base_sha,path:ie.path,base_ref:ie.base_ref},i=String(ie.content),o="ready",b()}catch{if(Z!==l)return;o="error",a="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Y(){l+=1,K(),s=null,i="",b();let O=d;d=null,O?.isConnected&&O.focus()}function j(){Y(),r.remove()}return{open:le,close:Y,destroy:j}}var Jf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},xv=new Set(["queued","running","retry_pending"]);function e_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function i(){let q=o();return typeof q.revision=="number"?q.revision:0}function a(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function l(){let q=o().workspace_info;return q&&typeof q=="object"?q:{}}function d(q,V){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${V}</span
    >`}function u(q){if(typeof q!="number"||!Number.isFinite(q))return"";let V=q/6e4;return Number.isInteger(V)?`timeout ${V}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function m(q){let V=u(q);return V?d("config",V):""}function y(q,V,ie){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ie.script}
      @click=${te=>{s&&s({lane:q,base_sha:V.base_sha,path:ie.script,base_ref:V.base_ref},te.currentTarget)}}
    ></button>`}function b(){let q=o().repo_operations;return Array.isArray(q)?q:[]}function $(){let q=l().repo_ops,V=q&&typeof q=="object"?q.repo_id:null;return typeof V=="string"&&V?V:null}function D(){return b().some(q=>q&&q.kind==="deploy"&&xv.has(q.state))}function W(){let q=D(),V=$()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||V}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":V?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{B()}}
    >
      배포 실행
    </button>`}function K(){let q=o().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function le(q,V){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!V}
        @change=${ie=>{O(q,!ie.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function Y(q){let V=typeof q.base_sha=="string"?q.base_sha:"",ie=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${V?`@${V.slice(0,7)}`:""}`,te=K(),Se=!!q.verify&&te.verify,Xe=!!q.deploy&&te.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ie}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Se?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${q.verify?c`${y("verify",q,q.verify)}
              ${m(q.verify.timeout_ms)}
              ${Se?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Se?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?le("verify",te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Xe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${y("deploy",q,q.deploy)}
              ${m(q.deploy.timeout_ms)}
              ${Xe?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):W()}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Xe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?le("deploy",te.deploy):""}
      </div>
    </section>`}function j(q){let V=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return V&&(V.status==="resolved"||V.status==="absent")?Y(V):V&&(V.status==="pending"||V.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${V.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${V.error_code?c` — <code>${V.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(q,V){if(!n)return;let ie=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:V,expected_revision:i()});if(a(ie),ie&&ie.conflict){let te=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:V,expected_revision:i()});a(te)}r()}async function B(){let q=$();if(!n||q===null)return;let V=await n("worker-repo-operation-deploy-run",{repo_id:q});if(a(V),!V||V.ok!==!0){let ie=V&&typeof V.reason=="string"?V.reason:"",te=Object.hasOwn(Jf,ie)?Jf[ie]:ie||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";de(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${te}`,"error")}else de("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let Z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function G(q,V,ie){return c`<div class="worker-repo-ops__policy-group" data-policy=${ie}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${V.map(te=>c`<li data-token=${te}>
              ${Z[te]||te}
            </li>`)}
      </ul>
    </div>`}function _e(){let q=o(),V=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return V?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(V.worker_automatic||[]).length} · 금지
            ${(V.never_automatic||[]).length}</span
          >
        </summary>
        ${V.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
            </div>`:""}
        ${G("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
        ${G("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${j(l())} ${_e()}
      </details>`}}}var r_=20,Av=5,Sv=new Set(["failed","running","queued","retry_pending"]),t_={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ev(e,t,n=r_){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Tv(e){if(e.type==="cleanup")return!0;let t=e.operation;return Sv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Cv(e,t,n={}){let r=Ev(e,t,1/0),s=n.expanded===!0?r_:Av,o=new Set(r.slice(0,s)),i=r.filter(a=>o.has(a)||Tv(a));return{visible:i,hidden:r.length-i.length}}function n_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Rv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function s_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function o_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Ov(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],s=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof s=="number"&&Number.isFinite(s)?s:void 0}function Lv(e,t){let n=Gp(e,t),r=Kp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Iv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Pv(e,t){let n=e.operation,r=n.state==="failed",s=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${li(e.at)||"\u2014"}</span
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
          >${n.target_base}@${oi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Tr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${n_(e)}"
          >${Rv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?o_(Hp(n.failure_kind,s)):""}
      ${Lv(n,Ov(t,n))}
      ${Iv(n)}
      ${s_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?s:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${oi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||""},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Dv(e){let t=e.cleanup,n=Cr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${li(e.at)||"\u2014"}</span
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
        ${wu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${o_(ls(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${s_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Mv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Dv(r):Pv(r,e.repo_ops))}
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
  </section>`}function i_(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let i=Cv(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(Mv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let a=i.target;if(a?.closest?.('[data-seam="repo-ops-close"]')){o();return}a?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Nv=zt("views:worker"),qv="tab:worker:ready",Fv="tab:worker:blocked",jv="tab:worker:in-progress",Bv="tab:worker:resolved",Uv="tab:worker:closed",Hi=1,a_=5,Wv=new Set(["quick_fix","spec_backed","full_plan"]);function l_(e){return typeof e=="string"&&Wv.has(e)}var u_="beads-ui.worker.candidate-filter",Dl={show_blocked:!1,spec:"all"};function zv(){try{let e=window.localStorage.getItem(u_);if(!e)return{...Dl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Dl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Dl}}}function Hv(e){try{window.localStorage.setItem(u_,JSON.stringify(e))}catch{}}function Gv(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),d=r(a);l&&d?s.push(a):!l&&d?o+=1:l&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Kv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],p_="bdui.worker.done-range";function Vv(){try{let e=window.localStorage.getItem(p_);return e===null?"today":Kn(e)}catch{return"today"}}function Yv(e){try{window.localStorage.setItem(p_,e)}catch{}}function c_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Zv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Xv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Qv="\u{1F512} blocked";function d_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function ew(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function tw(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function nw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rw(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Ml(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var sw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),ow=new Set(["waiting_metadata","reviewing","retrying"]);function iw(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",i=typeof t?.effort=="string"?t.effort:"",a=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${i?` \xB7 effort ${i}`:""}`:"",a?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${a}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,i=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,a=typeof r.next_at=="number"?cn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,a?`\uB2E4\uC74C \uC2DC\uAC01 ${a}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function aw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function lw(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,i="";switch(e.phase){case"gating":i=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":i="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":i=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":i=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":i="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;i=t.label;break;case"paused":i="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":i="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[i,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=aw(e.terminal_reason);l&&a.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let d of t?t.details:[])a.push(d);return e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&a.push(`repair ${s.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:i,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:!sw.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function cw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function dw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,o={})=>{let i=[o.title||"",t].filter(Boolean);return{label:s,title:i.join(`
`),live:o.live===!0,alert:o.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});let r=cw(e.receipt_check);if(r.length>0)return n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let s=Jv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${s.label}`,{title:e.head_review.failure_reason?`${s.action} (${e.head_review.failure_reason})`:s.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${d_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${d_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function uw(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,d=!0,u=null,m=null,y=null,b={},$=!1,D=!1,W={},K=null){let le=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,j=!!l&&l.active===!0,O=l&&l.failure||null,B=tw(l?l.waiting:null,y),Z=n[e]||null,G=Z&&Z.gate?Z.gate:null,_e=Z&&Z.pr?Z.pr:null,q=nw(l?l.resolution:null),V=rw(l?l.head_review:null),ie=l&&l.head_review||null,te=iw(y,ie),Se=lw(y,te),Xe=l&&l.authority||null,pe=!!ie&&["pending","reviewing","revising"].includes(ie.state),X=!!y&&typeof y=="object"&&ow.has(y.phase),Re=le&&!j&&(ie?.state==="failed"||!Xe||X||Xe.source==="automatic"&&!D),Ie=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":q?q.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":B,S=!!G&&G.base_badge==="\uCDA9\uB3CC",ne=!!G&&G.enabled===!0,$e=Fs({bead_id:e,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:W.repo_operations}),ve=yi($e),Ce=o&&!$e&&(o.queueing??null)?o.queueing:null,ge=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!G&&G.tier==="merged",Pe=r&&r.step==="repo_operations"&&$e?.failed===!0&&($e.step==="deploy"||$e.step==="verify")?$e.step:null,Ye=a&&!!r&&!!G&&G.tier==="merged",$t=Re&&(ne||S||G?.reason==="base_behind"||G?.reason==="review_receipt_missing"||G?.reason==="review_receipt_stale"||G?.reason==="review_receipt_undetermined"||ge||Ye),Dt=a&&S&&d===!1,_t=jn(b,e,{external:a,merge_active:j||$e?.step==="merge",merge_queued:le,conflict_active:!!i,cleanup_active:ve,merged:!!r||G?.tier==="merged"}),T=!!_t.operation,oe=dw({continuation_required:Y,queueing:Ce,merge_step:$e,conflict_badge:Ie,conflict_live:q?.live===!0||i==="running",head_review:ie&&V?{...V,state:ie.state,failure_reason:ie.failure_reason}:null,auto_resolution:te,recovery:Se,cleanup_failed:r,cleanup_label:r?Cr(r.step):null,base_exception:m,conflicting:S,gate:G,receipt_check:Z&&Z.receipt_check?Z.receipt_check:null,queue_failure:O,auto_skip:u,queued:le,queue_active:j,queue_position:l?l.position:0,activity:Ie?null:o&&o.activity||null}),Ee=oe?.live===!0&&oe.title?c`<span title=${oe.title}>${oe.label}</span>`:oe?.label||null;return{id:e,title:a?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&$e?.active!==!0?hi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,...K?{dependency_chips:K}:{},external:a,pr_number:_e&&typeof _e.number=="number"?_e.number:null,pr_url:_e&&typeof _e.url=="string"?_e.url:"",completion_badge:oe?.live!==!0&&oe?.title?oe.label:null,completion_title:oe?.title||"",completion_repair_pr_url:Se?Se.repair_pr_url:"",completion_repair_pr_number:Se?Se.repair_pr_number:null,badges:Ee?[Ee]:[],live_badge:oe?.live===!0?Ee:null,usage:s,alert:oe?.alert===!0,merge_action:G?.tier==="merged"&&!ge&&!Ye?!1:!le||Y||Re,cancel_action:le&&!Y,cancel_enabled:(!j||pe)&&!(Se&&Se.lock_actions),cancel_title:Se&&Se.lock_actions?`${Se.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:j&&!pe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":pe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:_t,discard_action:_t.action,merge_step:$e,discard_enabled:_t.enabled,discard_title:_t.title,merge_enabled:!$e&&!Ce&&!i&&!T&&!m&&!(Se&&Se.lock_actions)&&!Dt&&(ne||S||G?.reason==="base_behind"||G?.reason==="review_receipt_missing"||G?.reason==="review_receipt_stale"||G?.reason==="review_receipt_undetermined"||ge||Ye||$t||X&&!j),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||Ye?Pe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Pe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":S&&!$e&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":G?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":G?.reason==="review_receipt_missing"||G?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Re?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:T?_t.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_t.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_t.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ce?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":$e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${$e.label}`:Pe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Pe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Dt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":S?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":G?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":G?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":G?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":G?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":G?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ne?`\uBA38\uC9C0 (${G.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:G&&G.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${G&&G.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Nl(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:a,getWorkspacePath:l,switchWorkspace:d,openDoc:u,doneRange:m,onDoneRangeChange:y}=t,b=r?Oo(r,i):null,$=Do({transport:n,uiOrderStore:i}),D=null,W=[],K=zv(),le=null,Y=null,j={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},O=Hf(),B=Il(O)===null,Z=m?Kn(m):Vv(),G=new Map;function _e(){let p=Fr.find(v=>v.value===Z);return p?p.label:"\uC624\uB298"}let q=ji("beads-ui.worker.lane-collapsed"),V=!1,ie=new Set,te=new Set,Se=new Set,Xe=new Set,pe=new Set,X={},Re=null,Ie=0,S=null,ne=[];function $e(p){return Re===p?X:{}}async function ve(){if(!n)return;let p=l?.()||"";if(Re===p||S&&S.key===p&&S.generation===Ie)return;let v=++Ie;S={key:p,generation:v};let F=null;try{F=await Promise.resolve(n("get-session-defaults",{}))}catch(ce){if(v!==Ie)return;S=null,Nv("get-session-defaults failed: %o",ce),Ve();return}v===Ie&&(X=F&&typeof F.values=="object"&&F.values!==null?{...F.values}:{},Re=p,S=null,Ve())}function Ce(){Re=null,Ie+=1,ve()}let ge=document.createElement("div");ge.className="worker-console";let Pe=document.createElement("div");Pe.className="worker-top";let Ye=document.createElement("div");Ye.className="worker-drawer-overlay",Ye.hidden=!0;let $t=document.createElement("div");$t.className="worker-drawer-overlay__backdrop";let Dt=document.createElement("div");Dt.className="worker-drawer-host";let _t=document.createElement("div");_t.className="worker-drawer-host",_t.hidden=!0,Ye.append($t,Dt,_t);let T=document.createElement("div");T.className="worker-lanes-host",ge.append(Pe,Ye,T),e.appendChild(ge);let oe=null,Ee=is(Dt,{transport:n,sessionLogStore:o,onClose:()=>{oe=null,Ye.hidden=!0,Ve()}}),je=i_(_t,{onClose:()=>{_t.hidden=!0,Ye.hidden=!0,Ve()}}),Ze=Qf({getWorkspacePath:l||(()=>"")}),it=l&&l()||"",wt=e_({queueStore:s,transport:n,onChanged:()=>Ve(),onOpenScript:(p,v)=>{Ze.open(p,v)}});function at(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Hi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function J(){let p=at(),v=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,F=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ce=[];for(let ft of F){if(ce.length>=v)break;!ft||typeof ft.id!="string"||!/^s[1-5]$/.test(ft.id)||!Array.isArray(ft.entries)||ce.push({id:ft.id,label:`\uC9C1\uB82C ${ft.id.slice(1)}`,count:ft.entries.length})}return ce.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...ce]}function ee(p){if(!le||!p.some(F=>F.id===le))return null;let v=J();return v?{bead_id:le,lanes:v}:null}function ke(){let p=at();return typeof p.revision=="number"?p.revision:0}function qe(p){p&&p.queue&&s&&s.set(p.queue)}function ut(){let p=at().queue;return Array.isArray(p)?p.length:0}async function Me(p,v,F){if(!n)return;let ce=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},...F===void 0?{}:{index:F},expected_revision:ke()}),xe=await n("worker-queue-place",ce());qe(xe),xe&&xe.conflict&&await n("worker-queue-place",ce()).then(qe)}async function ze(p,v,F){if(!n)return;let ce=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:F,expected_revision:ke()}),xe=await n("worker-queue-reorder",ce());qe(xe),xe&&xe.conflict&&await n("worker-queue-reorder",ce()).then(qe)}async function gt(p){if(!n)return;let v=await n("worker-queue-remove",{bead_id:p,expected_revision:ke()});qe(v),v&&v.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:ke()}).then(qe)}async function mt(p){if(!n||!p)return;let v=await n("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ht(p){if(!n||!p)return;let v=await Vr();if(v===null)return;let F=async(xe={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:ke(),...v!==""?{instructions:v}:{},...xe}),ce=await F();qe(ce),ce&&ce.conflict&&(ce=await F(),qe(ce)),ce=await tr(ce,(xe,ft)=>F({continuation:xe,decision_token:ft}),{onResult:qe,refresh:()=>F()}),ce&&ce.resumed===!1&&!ce.conflict&&ce.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ce.reason}`,"error",2400)}async function Ut(p){if(!n||!p)return;let v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:ke()});qe(v),v&&v.conflict&&(v=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:ke()}),qe(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Lt(p,v,F=!0){if(!n)return null;let ce=n,xe=await ce(p,{...v,expected_revision:ke()});return qe(xe),xe&&xe.conflict&&F&&(xe=await ce(p,{...v,expected_revision:ke()}),qe(xe)),xe}async function Yt(p){if(!n||!p)return;let v=at().merge_queue?.find(ce=>ce.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Nt(p,v.mismatch);return}ie.add(p),Ve();let F;try{F=await Lt("worker-merge-queue-add",{bead_id:p})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ie.delete(p),Ve()}if(!(!F||F.applied)){if(F.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(ew(F.reason),"error",2400)}}async function Mt(p){if(!(!n||!p||te.has(p))){te.add(p),Ve();try{let v=await n("worker-cleanup-retry",{bead_id:p,expected_revision:ke()});qe(v),v&&!v.retried&&!v.conflict&&v.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{te.delete(p),Ve()}}}async function Nt(p,v){let F=await tr({continuation_mismatch:v},(xe,ft)=>Lt("worker-merge-queue-add",{bead_id:p,continuation:xe,decision_token:ft},!1)),ce=F?.queue?.merge_queue?.find(xe=>xe.bead_id===p)?.continuation_action;if(F?.applied!==!0&&ce?.continuation===null&&ce.mismatch){await Nt(p,ce.mismatch);return}F&&F.applied===!1&&!F.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function At(p){if(!n)return;let v=await Lt("worker-merge-auto-toggle",{on:p});!v||v.conflict||de(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Ge(p){if(!n||!p)return;let v=await Lt("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function L(){await Lt("worker-merge-queue-remove",{all:!0})}async function Q(p,v=null,F="unmerged",ce=null){if(!n||!p)return;let xe=Ms(p,F);if(!(!!ce||typeof globalThis.confirm!="function"||globalThis.confirm(xe)))return;let ot=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ce?{operation_id:ce}:{},expected_revision:ke()});if(qe(ot),ot&&ot.conflict&&(ot=await n("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ce?{operation_id:ce}:{},expected_revision:ke()}),qe(ot)),ot&&ot.discarded===!0){de(ci(ot),"success",5e3);return}if(ot&&ot.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${ot.reason}`,"error",2800);return}if(ot&&ot.accepted&&ot.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ot&&ot.accepted&&!ot.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${ot.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ot&&!ot.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function me(p,v,F){if(!(!n||!v||!F||Xe.has(v))){Xe.add(v),Ve();try{let ce=await n(p,{bead_id:v,action_id:F,expected_revision:ke()});qe(ce),ce?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ce?.ok&&ce?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ce.reason)}`,"error",2800)}finally{Xe.delete(v),Ve()}}}async function E(p,v){if(!n||!v||Se.has(v))return;Se.add(v),Ve();let F;try{let ce=async(xe={})=>await n(p,{bead_id:v,expected_revision:ke(),...xe});F=await ce(),qe(F),F&&F.conflict&&(F=await n(p,{bead_id:v,expected_revision:ke()}),qe(F)),p==="worker-revise-fix"&&(F=await tr(F,(xe,ft)=>ce({continuation:xe,decision_token:ft}),{onResult:qe,refresh:()=>ce()}))}finally{Se.delete(v),Ve()}if(!(!F||F.conflict)){if(F.ok){de(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function z(p){if(!n)return;let v=await n("worker-automation-toggle",{on:p,expected_revision:ke()});qe(v),v&&v.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:ke()}).then(qe)}async function Le(p){if(!n||!p)return;let v=await n("worker-repo-operation-dismiss",{operation_id:p});qe(v),v&&v.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Ke(p){if(!n||!Number.isFinite(p))return;let v=Math.max(Hi,Math.floor(p)),F=await n("worker-queue-set-slots",{slots:v,expected_revision:ke()});qe(F),F&&F.conflict&&await n("worker-queue-set-slots",{slots:v,expected_revision:ke()}).then(qe)}async function Ae(p){if(!n||!Number.isInteger(p)||p<1||p>a_)return;let v=at(),F=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((ft,ot)=>ft+(Array.isArray(ot?.entries)?ot.entries.length:0),0),ce=()=>({count:p,expected_revision:ke()}),xe=await n("worker-queue-set-serial-lane-count",ce());qe(xe),xe&&xe.conflict&&(xe=await n("worker-queue-set-serial-lane-count",ce()),qe(xe)),xe&&xe.applied&&F>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let ct="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function dt(p,v){let F=Al(p,v.id,j);return{id:v.id,title:v.title,location_label:v.location_label,prefixes:v.prefixes,action:F.kind==="note"?{kind:"note",text:F.text}:F.kind==="disabled"?{kind:"disabled",label:ct,title:F.title}:{kind:"place",label:ct,title:F.title}}}function he(p,v){if(!Y||Y.bead_id!==p)return null;let F=Y.counterpart_id,ce=v.filter(xe=>xe.id===F);return ce.length===0?null:{rows:ce.map(xe=>dt(p,xe))}}async function st(p,v){let F=Al(p,v,j);if(Y=null,F.kind!=="ops"){Ve();return}let ce=ke();for(let xe of F.ops){let ft=await P(xe,ce);if(ft===null)break;ce=ft}Ve()}async function P(p,v){if(!n)return null;try{let F=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:v});if(qe(F),F&&F.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!F||F.applied!==!0)return de(F&&typeof F.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${F.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ce=F.queue?F.queue.revision:void 0;return typeof ce!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ce}catch(F){return de(F instanceof Error&&F.message?F.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function N(){let p=at(),v=b?b.selectBoardColumn(qv,"ready"):[],F=b?b.selectBoardColumn(Fv,"blocked"):[],ce=b?b.selectBoardColumn(Uv,"closed"):[],xe=b?b.selectBoardColumn(jv,"in_progress"):[],ft=b?b.selectBoardColumn(Bv,"resolved"):[],ot=Io([...v,...F,...xe,...ft,...ce]),Qt=new Map;for(let _ of[...v,...F,...xe])_&&_.id&&!Qt.has(_.id)&&Qt.set(_.id,_);let qt={...$e(l?.()||"")};for(let _ of["orchestration_model","orchestration_effort","orchestration_speed"]){let I=p[_];typeof I=="string"&&(qt[_]=I)}function Jt(_,I){let ae=Qt.get(_);if(!ae)return null;let We=ae.metadata&&typeof ae.metadata=="object"?ae.metadata:{},tt=ae.workflow?.route,tn=We.route,Ft=l_(tt)?tt:l_(tn)?tn:null;return xn({pin:We,global:qt,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Ft,controller_runtime:I})}function En(_){let I=_.runner||null,ae=Jt(_.bead_id,I),We=Ps(_),tt=ae?_r(ae,I):null;return We||tt?{orchestration:We,worker:tt}:null}let vn=new Map;function en(_){if(vn.has(_))return vn.get(_)??null;let I=Jt(_,null),ae=null;if(I){let We=Fn(p.runner_catalog??null,I.orchestration_model.value??""),tt=We===null?I:Jt(_,We),tn=Er(tt,p.runner_catalog??null),Ft=_r(tt,We);ae=tn||Ft?{orchestration:tn,worker:Ft}:null}return vn.set(_,ae),ae}let On=new Map;function f(_){if(On.has(_))return On.get(_)??null;let I=Qt.get(_),ae=I&&I.metadata&&typeof I.metadata=="object"?I.metadata:null,We=ae?ts(ae):null;return On.set(_,We),We}function g(_){let I=Po(ot,_);return I.total===0?null:I}let w=p.bead_titles||{},k=new Map;for(let[_,I]of Object.entries(w))typeof I=="string"&&I.length>0&&k.set(_,I);for(let _ of[...v,...F])k.set(_.id,_.title||_.id);let M=new Map;for(let _ of[...v,...F,...xe,...ft,...ce])_&&_.id&&typeof _.from_id=="string"&&M.set(_.id,_.from_id);let U=new Map;for(let _ of[...v,...F,...xe,...ft,...ce])_&&_.id&&typeof _.priority=="number"&&U.set(_.id,_.priority);let re=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Te=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},He=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},rt=new Map;for(let[_,I]of Object.entries(Te))Array.isArray(I)&&rt.set(_,Ll(I));for(let _ of[...v,...F]){let I=_.labels;Array.isArray(I)&&!rt.has(_.id)&&rt.set(_.id,Ll(I))}let Ue=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},h=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},H=new Map;for(let[_,I]of Object.entries(re))I&&typeof I=="object"&&H.set(_,I);for(let _ of[...v,...F])H.set(_.id,{created_at:_.created_at,updated_at:_.updated_at});let R=_=>H.get(_)||{},be=p.pr_wait||[],Qe=p.pr_observations||{},se=p.pr_activity||{},Be=p.cleanup_failed||{},Fe=Object.entries(Be).map(([_,I])=>({bead_id:_,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})),bt=p.queue||[],Tn=new Set([...bt.map(_=>_.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(_=>(Array.isArray(_?.entries)?_.entries:[]).map(I=>I.bead_id)),...be.map(_=>_.bead_id),...p.done.map(_=>_.bead_id)]),Bl=new Set(F.map(_=>_.id)),Ul=new Set,Wl=[];for(let _ of[...v,...F])Tn.has(_.id)||Ul.has(_.id)||Zv(_)||(Ul.add(_.id),Wl.push(_));W=Vf(Wl,O,Bl);let x_=p.admission||{},zl=_=>{let I=x_[_];if(!I)return"";if(I.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof I.reason=="string"?I.reason:"",We=ae.indexOf(":");return We>0&&We<ae.length-1?`\u26D4 ${ae.slice(0,We)} (${ae.slice(We+1)})`:`\u26D4 ${ae}`},Hl=new Map,A_=W.map(_=>{let I=Wr(_),ae=I.evidence==="published",We=_.workflow?.route==="quick_fix"||_.metadata&&_.metadata.route==="quick_fix",tt=!Object.hasOwn(_,"description")||typeof _.description=="string"&&_.description.trim().length>0,tn=Object.hasOwn(_,"labels")&&qf(_.labels),Ft=tn||!Object.hasOwn(_,"labels")?"":Ff(_.labels,_.metadata),Mr=Ft.length>0,Ot=!tn&&(We?tt:ae&&!I.conflict),bo=Bl.has(_.id),Qn=[];if(bo){let ho=Xv(_);ho.length>0?Hl.set(_.id,ho):Qn.push(Qv)}We&&!tt?Qn.push("missing_description"):!We&&I.conflict?Qn.push("spec_id_conflict"):!We&&I.evidence==="none"?Qn.push("spec \uC5C6\uC74C"):!We&&I.evidence==="draft"&&Qn.push("spec \uBBF8\uBC1C\uD589(draft)");let Nr=zl(_.id);return Nr&&Qn.push(Nr),{id:_.id,title:_.title||_.id,reason:Qn.join(" \xB7 "),draggable:Ot,lane:"candidate",created_at:_.created_at,updated_at:_.updated_at,workflow:_.workflow,is_quick_fix:We,status:_.status,worker_ineligible:tn,session_preferred:Mr,session_preferred_reason:Ft,blocked:bo,has_spec:ae,exec_chips:en(_.id),rec:f(_.id),from_id:_.from_id||void 0,priority:U.get(_.id)}}),Gi=Gv(A_,K),Ki=Gi.visible,S_=p.revise_parked||{},lo=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},E_=_=>{let I=He[_]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Vi=(_,I)=>_.map((ae,We)=>{let tt=I!=="done",tn=I!=="done"&&I!=="queue",Ft=tt?S_[ae.bead_id]:null,Mr=tt?jn(lo,ae.bead_id):null,Ot=Mr?.operation?Mr:null,bo=tt&&rt.get(ae.bead_id)===!0,Qn=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,Nr=tt?bu(Qn,!!Ot||Xe.has(ae.bead_id)):null,ho=tt&&!Nr?zl(ae.bead_id):null,j_=tt?[ho]:[],B_=[];return{id:ae.bead_id,title:k.get(ae.bead_id)||ae.bead_id,reason:j_.filter(Boolean).join(" \xB7 "),draggable:tt&&!Ot&&!Nr,done:I==="done",lane:I,seq:tn?We+1:void 0,worker_serial:bo,discard:Ot,stale_work:Nr,badges:[...B_,...Ft?["\u23F8 REVISE \uD30C\uD0B9"]:[],...I==="done"?ii(p.attempts||{},ae.bead_id):[]],alert:!!Ft,revise_action:!!Ft,revise_enabled:!!Ft&&!Ot&&!Se.has(ae.bead_id),revise_title:Ft?Ft.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ft.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:I==="done"?In(p.attempts||{},ae.bead_id):null,work_ms:I==="done"?ai(p.attempts||{},ae.bead_id):null,done_at:I==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,exec_chips:tt?en(ae.bead_id):null,rec:f(ae.bead_id),workflow:tt&&He[ae.bead_id]||null,...I==="done"?E_(ae.bead_id):{},from_id:M.get(ae.bead_id)||void 0,priority:U.get(ae.bead_id),...R(ae.bead_id)}}),Ir=p.attempts?Object.values(p.attempts).filter(Sr):[],Yi=new Set;for(let _ of Ir)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&Yi.add(_.resumed_from);let Gl=new Map;for(let _ of Ir)Gl.set(_.bead_id,_.attempt_id);let cs=new Map;for(let _ of Ir)cs.set(_.attempt_id,_);function Zi(_){let I=new Set,ae=_;for(;ae&&!I.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;I.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&cs.get(ae.resumed_from)||null}return!1}let co=typeof p.declared_base=="string"?p.declared_base:null;function T_(_){let I=null;for(let ae of Ir)!ae||ae.bead_id!==_||Zi(ae)||(I===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof I.started_at=="number"?I.started_at:0))&&(I=ae);return I&&typeof I.target_base=="string"?I.target_base:null}let Xi=[],uo=[],C_=Nf(p),Kl=_=>{let I=typeof _.session_id=="string"&&_.session_id.length>0,ae=Yi.has(_.attempt_id);return{eligible:I&&!ae,reason:I?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dn=null;for(let _ of Ir){let I=_.status==="paused"&&!Yi.has(_.attempt_id);if(_.status==="running"||I)uo.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:k.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,paused:I,conflict_resolution:Zi(_),base_exception:Ml(co,_.target_base),can_pause:typeof _.session_id=="string"&&_.session_id.length>0,discard:jn(lo,_.bead_id,{attempt_id:_.attempt_id}),workflow:He[_.bead_id]||null,priority:U.get(_.bead_id),usage:In(p.attempts||{},_.bead_id),rollup:g(_.bead_id),rollup_expanded:pe.has(_.bead_id),exec_chips:En(_),rec:f(_.bead_id),...R(_.bead_id)});else if((_.status==="failed"||_.status==="orphaned")&&C_(_)){let ae=Kl(_);Xi.push({bead_id:_.bead_id,attempt_id:_.attempt_id,title:k.get(_.bead_id)||_.bead_id,runner:_.runner||null,model:_.model||null,effort:_.effort||null,speed:_.speed||null,continuation_mode:_.continuation_mode||null,started_at:typeof _.started_at=="number"?_.started_at:null,resumed_from:_.resumed_from||null,failed:!0,status:_.status,status_label:_.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jn(lo,_.bead_id,{attempt_id:_.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:Zi(_),base_exception:Ml(co,_.target_base),workflow:He[_.bead_id]||null,priority:U.get(_.bead_id),usage:In(p.attempts||{},_.bead_id),rollup:g(_.bead_id),rollup_expanded:pe.has(_.bead_id),exec_chips:En(_),rec:f(_.bead_id),...R(_.bead_id)}),Dn=_}}let Vl=new Set([...Xi,...uo].map(_=>_.bead_id)),Yl=new Map;for(let _ of Array.isArray(p.session_active)?p.session_active:[]){let I=_&&_.bead_id;if(!(typeof I!="string"||I.length===0||Vl.has(I))){if(Vl.add(I),Array.isArray(_.blocked_by)){let ae=_.blocked_by.filter(We=>typeof We=="string"&&We.length>0);ae.length>0&&Yl.set(I,ae)}uo.push({bead_id:I,attempt_id:null,kind:"session",title:_.title||k.get(I)||I,status:"in_progress",started_at:Nn(_.started_at)??Nn(_.updated_at),updated_at:Nn(_.updated_at),workflow:_.workflow||null,session_refs:Array.isArray(_.session_refs)?_.session_refs:[],priority:U.get(I),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:f(I),usage:null,rollup:null,rollup_expanded:!1})}}let Pr=[...Xi,...uo].map(_=>{let I=cs.get(_.attempt_id),ae=I?.quickfix_landing;if(I?.quickfix_lane!==!0||!ae||typeof ae!="object")return _;let We=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,tt=Fs({bead_id:I.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:We?{step:ae.cursor,reason:We}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return tt?{..._,landing:tt}:_}),Zl=null;if(Dn){let _=Kl(Dn),I=Dn.cause_detail;Zl={bead_id:Dn.bead_id,repo:Dn.repo||"",reason:Dn.cause||Dn.status,cause_detail:I&&typeof I.reason=="string"?{reason:I.reason,command:typeof I.command=="string"?I.command:null}:null,resume_attempt_id:Dn.attempt_id,resume_eligible:_.eligible,resume_reason:_.reason,discard:jn(lo,Dn.bead_id,{attempt_id:Dn.attempt_id})}}let Xl=new Set(Pr.map(_=>_.bead_id)),Qi=Array.isArray(p.merge_queue)?p.merge_queue:[],Ql=new Map,Jl=new Map,ec=new Map,tc=new Map,nc=new Map;Qi.forEach((_,I)=>{_&&typeof _.bead_id=="string"&&(Ql.set(_.bead_id,I+1),Jl.set(_.bead_id,_.resolution),ec.set(_.bead_id,_.continuation_action||null),tc.set(_.bead_id,_.head_review||null),nc.set(_.bead_id,_.authority||null))});let Dr=p.merge_queue_state||{active:null,failures:{}},R_=Dr.failures||{},rc=Dr.waiting&&typeof Dr.waiting.bead_id=="string"&&typeof Dr.waiting.reason=="string"?Dr.waiting:null,O_=p.auto_merge_skips||{},sc=_=>{let I=O_[_];if(!I)return null;let ae=Qe[_],We=ae&&ae.pr?ae.pr.head_sha:null;return We&&We===I.head_sha?I.reason||"":null},po=new Map;for(let _ of Pr)_.failed!==!0&&_.conflict_resolution&&(_.paused?po.has(_.bead_id)||po.set(_.bead_id,"paused"):po.set(_.bead_id,"running"));let oc=Pr.filter(_=>_.kind!=="session"&&!_.paused&&_.failed!==!0).length,ic=(p.workspace_info||{}).slots,ac=typeof ic=="number"?ic:typeof p.slots=="number"?p.slots:Hi,L_=oc>ac,fo=$r(Z),I_=(Array.isArray(p.done)?p.done.slice():[]).filter(_=>fo===void 0||typeof _.added_at!="number"||_.added_at>=fo).sort((_,I)=>(I.added_at||0)-(_.added_at||0)),ds=Vi(I_,"done"),P_=new Set((Array.isArray(p.done)?p.done:[]).map(_=>_?.bead_id).filter(_=>typeof _=="string")),lc=[],D_=l?.()||"";for(let _ of ce){let I=Nn(_.closed_at);if(typeof _.id!="string"||P_.has(_.id)||I===null||fo!==void 0&&I<fo||typeof _.comment_count!="number"||_.comment_count<=0)continue;let ae=`${D_}\0${_.id}\0${String(_.updated_at)}\0${_.comment_count}`,We=G.get(ae);if(We===void 0&&n&&(G.set(ae,"pending"),Promise.resolve(n("get-comments",{id:_.id})).then(tt=>{let tn=Array.isArray(tt)&&tt.some(Ft=>Ii(typeof Ft?.text=="string"?Ft.text:"")?.lane==="session");G.set(ae,tn?"session":"not-session"),Ve()}).catch(()=>{G.set(ae,"failed"),Ve()})),We==="session"){let tt=Nn(_.started_at);lc.push({id:_.id,title:_.title||_.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:tt!==null&&I>=tt?I-tt:null,work_kind:"session",done_at:I,created_at:_.created_at,updated_at:_.updated_at})}}ds.push(...lc),ds.sort((_,I)=>(I.done_at||0)-(_.done_at||0));let _o={};for(let _ of Yn)_o[_]=0;let cc=!1,dc=0,Ji=0,uc=0;for(let _ of ds){let I=_.usage;if(I&&typeof I=="object"){let ae=!1;for(let We of Yn)Number.isFinite(I[We])&&(_o[We]+=I[We],cc=!0,ae=!0);ae&&(Ji+=1,Number.isFinite(I.total_cost_usd)&&(dc+=I.total_cost_usd,uc+=1))}}Ji>0&&uc===Ji&&(_o.total_cost_usd=dc);let pc=ds.map(_=>_.usage).filter(_=>_&&typeof _=="object"&&_.providers),M_=pc.length>0?dn(Ho(pc)):cc?nr(_o):null,fc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},_c=Array.isArray(p.serial_lanes)?p.serial_lanes:[],mc=_=>{if(be.some(We=>We.bead_id===_))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let I=Ir.filter(We=>We&&We.bead_id===_),ae=I.length>0?I[I.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},mo=_c.filter(_=>_&&typeof _.id=="string"&&Array.isArray(_.entries)).map((_,I)=>{let ae=fc[_.id]||{},We=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(Ot=>Ot&&typeof Ot.bead_id=="string"&&typeof Ot.after=="string").map(Ot=>[Ot.bead_id,Ot.after])),tt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(Ot=>typeof Ot=="string"):[],tn=new Set(tt),Ft=Vi(_.entries.filter(Ot=>!Xl.has(Ot.bead_id)&&!tn.has(Ot.bead_id)),_.id).map(Ot=>We.has(Ot.id)?{...Ot,badges:[`\u{1F517} ${We.get(Ot.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Ot.badges]}:Ot),Mr=tt.map(Ot=>({id:Ot,title:k.get(Ot)||Ot,draggable:!1,lane:_.id,ghost:!0,badges:[mc(Ot)]}));return{id:_.id,index:I+1,rows:[...Mr,...Ft],occupied:tt.length>0,badge:tt.length>0?mc(tt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),gc=typeof p.serial_lane_count=="number"?p.serial_lane_count:mo.length,ea=Vi(bt.filter(_=>!Xl.has(_.bead_id)),"queue"),bc=new Map,hc=new Set;for(let[_,I]of Object.entries(fc)){if(!/^s[1-5]$/.test(_))continue;let ae=I&&Array.isArray(I.occupied_by)?I.occupied_by:[];for(let We of ae)typeof We=="string"&&bc.set(We,_);ae.length>0&&hc.add(_)}let lr=[];for(let _ of Pr)typeof _.bead_id=="string"&&lr.push({id:_.bead_id,title:k.get(_.bead_id)||_.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:bc.get(_.bead_id)??null});for(let _ of be){let I=_&&_.bead_id;typeof I!="string"||I.length===0||lr.push({id:I,title:k.get(I)||I,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let _ of mo)for(let I of _.rows)I.ghost!==!0&&lr.push({id:I.id,title:I.title,location_label:`${_.id} #${I.seq??""}`.trim(),kind:"serial",lane_id:_.id});ea.forEach((_,I)=>{lr.push({id:_.id,title:_.title,location_label:`#${I+1}`,kind:"parallel",lane_id:null})});for(let _ of Ki)lr.push({id:_.id,title:_.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let yc={};for(let _ of _c)_&&typeof _.id=="string"&&Array.isArray(_.entries)&&(yc[_.id]=_.entries.length);let ta=new Map;for(let _ of lr)ta.has(_.id)||ta.set(_.id,_);j={members_by_id:ta,serial_raw_lengths:yc,serial_lane_count:gc,occupied_lanes:hc};let N_=Bp(p.bead_scope,lr),go=new Map;for(let[_,I]of Yl)go.set(_,I);for(let[_,I]of Hl)go.set(_,I);for(let[_,I]of Object.entries(Ue))Array.isArray(I)&&go.set(_,I.filter(ae=>typeof ae=="string"&&ae.length>0));let q_=$u(go,lr,h),na=(_,I=null)=>{let ae=N_.get(_),We=q_.get(_)||null,tt=ae&&ae.overlaps.length>0?ae.overlaps:null,tn=!!ae&&ae.scope_missing;if(!We&&!tt&&!tn)return I;let Ft=tt?he(_,tt):null;return{...I||{},...We?{predecessors:We}:{},...tt?{overlaps:tt}:{},...tn?{scope_missing:!0}:{},...Ft?{popover:Ft}:{}}},ra=_=>{let I=na(_.id,_.dependency_chips||null);return I&&(_.dependency_chips=I),_};for(let _ of ea)ra(_);for(let _ of mo)for(let I of _.rows)I.ghost!==!0&&ra(I);for(let _ of Ki)ra(_);let vc=new Map;for(let _ of Pr){let I=typeof _.bead_id=="string"?_.bead_id:"";if(I.length===0)continue;let ae=_.kind==="session",We=na(I),tt=typeof _.attempt_id=="string"&&_.attempt_id.length>0?cs.get(_.attempt_id):void 0,tn=tt&&tt.last_activity&&typeof tt.last_activity=="object"?tt.last_activity:null,Ft=tt&&Array.isArray(tt.legs)?tt.legs:[];!We&&!tn&&Ft.length===0&&!ae||vc.set(I,{...tn?{last_activity:tn}:{},...Ft.length>0?{legs:Ft}:{},...We?{dependency_chips:We}:{}})}let F_=be.map(_=>uw(_.bead_id,k.get(_.bead_id)||_.bead_id,Qe,Be[_.bead_id]||null,In(p.attempts||{},_.bead_id),se[_.bead_id]||(ie.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:te.has(_.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),po.get(_.bead_id)||null,_.external===!0,{position:Ql.get(_.bead_id)||0,active:Dr.active===_.bead_id,failure:R_[_.bead_id]||null,waiting:rc?.bead_id===_.bead_id?rc.reason:null,resolution:Jl.get(_.bead_id),continuation_action:ec.get(_.bead_id),head_review:tc.get(_.bead_id)||null,authority:nc.get(_.bead_id)||null},_.wt_present!==!1,p.auto_merge===!0?sc(_.bead_id):null,Ml(co,T_(_.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[_.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},cs.get(Gl.get(_.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:_.merge_sha,cleanup_cursor:_.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},na(_.bead_id))).map(_=>({..._,workflow:He[_.id]||null,priority:U.get(_.id),...R(_.id)}));return{queue:p,idToTitle:k,candidates:Ki,candidate_hidden:{blocked:Gi.hidden_blocked,spec:Gi.hidden_spec},running:Pr,live_count:oc,slots:ac,over_cap:L_,failure:Zl,waiting:ea,serial_lanes:mo,serial_lane_count:gc,running_overlays:vc,pr_wait:F_,merge_queue_length:Qi.length,merge_queue_running:Qi.length>0,auto_excluded:be.map(_=>_.bead_id).filter(_=>sc(_)!==null),declared_base:co,done:ds,token_total:M_,cleanup_failures:Fe,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function ye(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",F=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ce=yt(p),xe=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ft=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(en=>en&&typeof en.armed_by_lane=="string"&&en.armed_by_lane.length>0).length,ot=ft>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${ft}건 진행 중</span
          >`:"",Qt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${_e()} 완료 <b>${p.done.length}</b></span
      >`,qt=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Jt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Hi}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:a_},(en,On)=>On+1).map(en=>c`<option
                value=${String(en)}
                ?selected=${p.serial_lane_count===en}
              >
                ${en}
              </option>`)}
        </select>
      </label> `,En=Yp({failure:p.failure}),vn=gu(p.repo_operations,p.cleanup_failures);return V?c`<div class="worker-ribbon">
          ${F} ${ce}
          <div class="worker-kpi worker-kpi--ribbon">
            ${xe}${ot}${Qt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Jt}</div>
          <div class="worker-kpi">${qt}</div>
        </div>
        ${vn}${wt.template()}${En}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${ce}${Jt}</div>
        <div class="worker-kpi">
          ${xe}${ot}${Qt}${qt}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${_e()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(en=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${en.tooltip}
                >${_e()} 완료 · 누적 ${en.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${vn}${wt.template()}${En}`}function et(p){let v=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${K.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Kv.map(F=>c`<button
              type="button"
              class="worker-filter__chip${K.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${K.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function we(){let p=B?"custom":Il(O)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${p}
    >
      ${oo.map(v=>c`<option value=${v.id} ?selected=${p===v.id}>
            ${v.label}
          </option>`)}
      <option value="custom" ?selected=${p==="custom"}>
        사용자 지정…
      </option>
    </select>`}function nt(){let p=io(O);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(v=>{let F=p[v];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${v}
            aria-label=${`${v+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${F?F.key:""}
          >
            ${v===0?"":c`<option value="" ?selected=${!F}>없음</option>`}
            ${zf.map(ce=>c`<option
                  value=${ce.key}
                  ?selected=${!!F&&F.key===ce.key}
                >
                  ${ce.label}
                </option>`)}
          </select>
          ${F?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${v}
                aria-label=${F.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${F.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${F.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function pt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${Z}
      >
        ${Fr.map(p=>c`<option value=${p.value} ?selected=${Z===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function yt(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
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
      </button>`;let F=new Set(p.auto_excluded),ce=p.pr_wait.filter(xe=>xe.merge_action&&xe.merge_enabled&&!F.has(xe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ce>0?` ${ce}`:""}
    </button>`}function St(p){return mi({parallel:{rows:p.waiting.map(v=>Bn(v)),count:p.waiting.length,collapsed:q.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(v=>({id:v.id,title:`\uC9C1\uB82C ${v.index}`,rows:v.rows.map(F=>Bn(F)),count:v.rows.length,empty:v.rows.length===0,badge:v.badge,held:v.occupied,cycle:v.cycle})),collapsed:q.isAreaCollapsed("serial")}})}function Zt(p){return Zp(p.running,Date.now(),oe,p.running_overlays)}function Tt(p){return p.running.some(v=>v.kind!=="session"&&!v.paused&&v.failed!==!0)}function rn(p){let v=Zn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:we(),header_row:B?nt():void 0,controls:et(p),collapsible:!0,collapsed:q.isCollapsed("candidate"),place_menu:ee(p.candidates),onOpenDoc:u?(ce,xe)=>u(xe):void 0}),F=Zn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${_e()} \uC644\uB8CC \uC5C6\uC74C`,header_control:pt(),collapsible:!0,collapsed:q.isCollapsed("done"),preview:V?Array.isArray(p.token_total)?p.token_total.map(ce=>ce.label).join(" \xB7 "):p.token_total||c_(p.done):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${gi({live:Tt(p),running_body:p.running.length>0?Zt(p):"",pr_wait_rows:p.pr_wait.map(ce=>Bn(ce)),count:p.running.length+p.pr_wait.length})}
        ${Zn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:q.isCollapsed("queue"),preview:c_(p.waiting),body:St(p)})}
        ${v} ${F}
      </div>`:c`<div class="worker-lanes">
      ${v}
      ${Zn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:q.isCollapsed("queue"),body:St(p)})}
      ${Zn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:Tt(p),collapsible:!0,collapsed:q.isCollapsed("running"),body:Zt(p)})}
      ${Zn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:q.isCollapsed("pr_wait")})}
      ${F}
    </div>`}function Wt(p){q.toggle(p),Ve()}function hn(p){q.toggleArea(p),Ve()}function Ve(){let p=N();lt(ye(p),Pe),lt(rn(p),T)}function Kt(){let p=!0,v=Fi(F=>{if(V=F,p){p=!1;return}Ve()});ne.push(v)}let Xt=null;function yn(p){Xt=p.target instanceof Element?p.target:null}function fe(p){let F=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(Xt&&F.contains(Xt)&&Xt.closest("input, button, a")){p.preventDefault();return}let ce=F.dataset.beadId||"",xe=F.dataset.lane||"";D={bead_id:ce,from_lane:xe},ge.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",ce),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function A(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let F=v.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ue(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Oe(){ge.classList.remove("is-dragging")}function kt(p,v){let F=W.find(ot=>ot.id===p);if(!F)return;let ce=W.filter(ot=>ot.id!==p),xe=ce.length;if(v){let ot=v.dataset.beadId;if(ot===p)return;let Qt=ce.findIndex(qt=>qt.id===ot);Qt>=0&&(xe=Qt)}let ft=ce.slice();ft.splice(xe,0,F),$.applyReorder(p,ft,xe)}function Rt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over"),ge.classList.remove("is-dragging");let F=v.dataset.lane||"",ce=D?.bead_id||p.dataTransfer?.getData("text/plain")||"",xe=D?.from_lane||"";if(D=null,!ce)return;let ft=p.target?.closest?.(".worker-mini, .worker-card"),ot=F==="queue"&&v.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||v,Qt=Array.from(ot.querySelectorAll(".worker-mini, .worker-card")),qt=Qt.length;if(ft){let Jt=Qt.indexOf(ft);Jt>=0&&(qt=Jt)}if(qt=Math.max(0,qt-ot.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(qt=ut()),F==="candidate"){if(xe==="candidate"){kt(ce,ft);return}(xe==="queue"||/^s[1-5]$/.test(xe))&&gt(ce);return}if(F==="queue"||/^s[1-5]$/.test(F)){let Jt=F==="queue"?"parallel":F;xe===F?ze(ce,Jt,qt):Me(ce,Jt)}}function Et(p){K=p,Hv(p),Ve()}function Vt(p){if(p==="custom"){B=!0,Ve();return}O=ao(p),Pl(O),B=!1,Ve()}function on(p){O=ao({chain:p}),Pl(O),Ve()}function an(p){Z=Kn(p),Yv(Z),y?.(Z),Ve()}function Sn(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let qt=Number.parseInt(v.value,10);Number.isFinite(qt)&&Ae(qt).then(Ve);return}let F=p.target?.closest?.(".worker-filter__blocked");if(F){Et({...K,show_blocked:F.checked});return}let ce=p.target?.closest?.(".worker-sort-chain__key");if(ce){let qt=Number.parseInt(ce.getAttribute("data-step")||"",10);Number.isFinite(qt)&&on(Gf(io(O),qt,ce.value));return}let xe=p.target?.closest?.(".worker-done-range");if(xe){an(xe.value);return}let ft=p.target?.closest?.(".worker-sort");if(ft){Vt(ft.value);return}let ot=p.target?.closest?.(".worker-slots__input");if(!ot)return;let Qt=Number.parseInt(ot.value,10);if(!Number.isFinite(Qt)){Ve();return}Ke(Qt).then(Ve)}function It(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function ln(){let p=N(),v=at().workspace_info,F=v&&typeof v=="object"&&v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:F}}function pn(){oe&&Ee.close(),_t.hidden=!1,Ye.hidden=!1,je.open(ln()),Ve()}function fn(p){let v=at(),F=v.attempts?v.attempts[p]:null;oe=p,je.close(),_t.hidden=!0,Ye.hidden=!1,Ee.open({attempt_id:p,meta:It(F)}),Ve()}function Xn(p){let v=at(),F=(Array.isArray(v.session_active)?v.session_active:[]).find(xe=>xe&&xe.bead_id===p),ce=(F&&Array.isArray(F.session_refs)?F.session_refs:[]).find(xe=>xe&&xe.current===!0);ce&&(je.close(),_t.hidden=!0,Ye.hidden=!1,Ee.open(Yr(ce,p,"in_progress")),Ve())}function x(){if(je.isOpen()&&je.refresh(ln()),!oe)return;let p=at(),v=p.attempts?p.attempts[oe]:null;if(v){Ee.updateMeta(It(v));return}Ee.close()}function C(p,v){if(p.length===0||!a)return;let F=l?l():void 0;if(v.length===0||!F||v===F||!d){a(p);return}Promise.resolve(d(v)).then(()=>{a(p)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function De(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let F=v?.closest?.(".worker-sort-chain__dir");if(F){let se=Number.parseInt(F.getAttribute("data-step")||"",10);Number.isFinite(se)&&on(Kf(io(O),se));return}let ce=v?.closest?.(".worker-dep__open");if(ce){C(ce.getAttribute("data-dep-id")||"",ce.getAttribute("data-root-dir")||"");return}let xe=v?.closest?.(".mon-overlap__chip");if(xe){let se=xe.closest("[data-bead-id]"),Be=se&&se.getAttribute("data-bead-id")||"";if(Be){let Fe=xe.getAttribute("data-overlap-id")||"";Y=!!Y&&Y.bead_id===Be&&Y.counterpart_id===Fe?null:{bead_id:Be,counterpart_id:Fe},Ve()}return}let ft=v?.closest?.(".mon-overlap__place");if(ft){let se=ft.closest("[data-bead-id]"),Be=se&&se.getAttribute("data-bead-id")||"";Be&&st(Be,ft.getAttribute("data-counterpart-id")||"");return}if(v?.closest?.(".mon-overlap__popover"))return;if(v?.closest?.(".worker-repo-strip")){pn();return}let ot=v?.closest?.(".worker-repo-op__dismiss");if(ot){Le(ot.dataset.operationId||"");return}let Qt=v?.closest?.(".worker-cleanup__resume");if(Qt){let se=Qt.dataset.beadId;se&&Mt(se);return}let qt=v?.closest?.(".worker-banner__resume");if(qt){let se=qt.dataset.attemptId;se&&ht(se);return}let Jt=v?.closest?.(".worker-banner__discard");if(Jt){let se=Jt.dataset.confirmation==="merged"?"merged":"unmerged";Q(Jt.dataset.beadId||"",Jt.dataset.attemptId||null,se,Jt.dataset.operationId||null);return}let En=v?.closest?.(".worker-banner__dismiss");if(En){let se=En.dataset.attemptId;se&&Ut(se);return}if(v?.closest?.(".worker-play")){z(!at().auto_advance);return}let vn=v?.closest?.(".worker-merge-all");if(vn){vn.classList.contains("worker-merge-all--stop")?at().auto_merge===!0?At(!1):L():At(!0);return}let en=v?.closest?.(".worker-pane__toggle[data-lane]");if(en){let se=en.dataset.lane;(se==="candidate"||se==="queue"||se==="running"||se==="pr_wait"||se==="done")&&Wt(se);return}let On=v?.closest?.(".worker-wait__area-toggle[data-area]");if(On){let se=On.dataset.area;(se==="parallel"||se==="serial")&&hn(se);return}let f=v?.closest?.(".worker-card__place-lane");if(f){let se=f.dataset.beadId,Be=f.dataset.lane;se&&(Be==="parallel"||/^s[1-5]$/.test(Be||""))&&(le=null,Ve(),Me(se,Be));return}if(v?.closest?.(".worker-card__place-cancel")){le=null,Ve();return}let w=v?.closest?.(".worker-card__place");if(w){let se=w.dataset.beadId;se&&!w.disabled&&(J()?(le=se,Ve()):Me(se,"parallel"));return}let k=v?.closest?.(".worker-filter__chip");if(k){let se=k.dataset.spec;(se==="all"||se==="with"||se==="without")&&Et({...K,spec:se});return}let M=v?.closest?.(".worker-mini__merge");if(M){let se=M.dataset.beadId||"";at().cleanup_failed?.[se]?Mt(se):Yt(se);return}let U=v?.closest?.(".worker-mini__merge-cancel");if(U){Ge(U.dataset.beadId||"");return}let re=v?.closest?.(".worker-mini__discard");if(re){Q(re.dataset.beadId||"",re.dataset.attemptId||null,re.dataset.discardMode==="merged"?"merged":"unmerged",re.dataset.operationId||null);return}let Te=v?.closest?.(".worker-mini__stale-continue");if(Te){me("worker-stale-work-continue",Te.dataset.beadId||"",Te.dataset.actionId||"");return}let He=v?.closest?.(".worker-mini__stale-backup");if(He){me("worker-stale-work-backup-fresh",He.dataset.beadId||"",He.dataset.actionId||"");return}let rt=v?.closest?.(".worker-mini__stale-recheck");if(rt){me("worker-stale-work-recheck",rt.dataset.beadId||"",rt.dataset.actionId||"");return}let Ue=v?.closest?.(".worker-mini__revise-fix");if(Ue){E("worker-revise-fix",Ue.dataset.beadId||"");return}let h=v?.closest?.(".worker-mini__revise-approve");if(h){E("worker-revise-approve",h.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let se=v?.closest?.(".rtile"),Be=se?.dataset?.beadId,Fe=se?.dataset?.attemptId;Be&&Q(Be,Fe||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let Be=v?.closest?.(".rtile")?.dataset?.attemptId;Be&&Ut(Be);return}if(v?.closest?.(".rtile__pause")){let Be=v?.closest?.(".rtile")?.dataset?.attemptId;Be&&mt(Be);return}if(v?.closest?.(".rtile__resume")){let Be=v?.closest?.(".rtile")?.dataset?.attemptId;Be&&ht(Be);return}if(v?.closest?.(".rtile__session")){let se=v?.closest?.(".rtile"),Be=se?.dataset?.attemptId;if(Be){fn(Be);return}let Fe=se?.dataset?.beadId;Fe&&Xn(Fe);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){je.close(),Ee.close();return}if(v?.closest?.(".worker-drawer-host"))return;let H=v?.closest?.(".rtile .board-card__roll-toggle");if(H){let se=H.dataset.rollParent;se&&(pe.has(se)?pe.delete(se):pe.add(se),Ve());return}let R=v?.closest?.(".rtile .board-card__roll-child");if(R){let se=R.dataset.childId;se&&a&&a(se);return}let be=v?.closest?.(".rtile");if(be){if(v?.closest?.(".rtile__id")){let Be=be.dataset.beadId;Be&&qn(Be).then(Fe=>{Fe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let se=be.dataset.beadId;se&&a&&a(se);return}let Qe=v?.closest?.(".worker-mini, .worker-card");if(Qe){let se=Qe.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){se&&qn(se).then(Fe=>{Fe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Be=v?.closest?.(".ctl-chip--from");if(Be){let Fe=Be.dataset.fromId;Fe&&a&&a(Fe);return}se&&a&&a(se)}}e.addEventListener("pointerdown",yn),e.addEventListener("dragstart",fe),e.addEventListener("dragover",A),e.addEventListener("dragleave",ue),e.addEventListener("dragend",Oe),e.addEventListener("drop",Rt),e.addEventListener("click",De),e.addEventListener("change",Sn);function Ne(p){if(!Y)return;let v=p.target;v&&typeof v.closest=="function"&&v.closest(".mon-overlap__popover, .mon-overlap__chip")||(Y=null,Ve())}function Je(p){p.key!=="Escape"||!Y||(Y=null,Ve())}return document.addEventListener("click",Ne),document.addEventListener("keydown",Je),ne.push(()=>{document.removeEventListener("click",Ne),document.removeEventListener("keydown",Je)}),Kt(),b&&ne.push(b.subscribe(()=>{for(let[p,v]of G)v==="failed"&&G.delete(p);Ve()})),s&&ne.push(s.subscribe(()=>{let p=l&&l()||"";p!==it&&(it=p,Ze.close()),Ve(),x()})),Ve(),{load(){ve(),Ve()},refreshSessionDefaults:Ce,destroy(){for(let p of ne.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",yn),e.removeEventListener("dragstart",fe),e.removeEventListener("dragover",A),e.removeEventListener("dragleave",ue),e.removeEventListener("dragend",Oe),e.removeEventListener("drop",Rt),e.removeEventListener("click",De),e.removeEventListener("change",Sn);try{Ee.destroy()}catch{}Ye.hidden=!0;try{Ze.destroy()}catch{}lt(c``,e)}}}function ql(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function f_(e,t,n,r=async()=>{},s=async()=>{}){let o=zt("views:workspace-picker"),i=null,a=!1,l=!1,d=!1;async function u(B){let G=B.target.value,q=t.getState().workspace?.current?.path||"";if(G&&G!==q){o("switching workspace to %s",G),a=!0,O();try{await n(G)}catch(V){o("workspace switch failed: %o",V)}finally{a=!1,O()}}}async function m(){let B=t.getState(),Z=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!Z||l)){o("git-pulling workspace %s",Z),l=!0,O();try{await r(Z)}catch(G){o("workspace git pull failed: %o",G)}finally{l=!1,O()}}}function y(B){let Z=B.target;Z&&e.contains(Z)||D()}function b(B){B.key==="Escape"&&D()}function $(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),O())}function D(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),O())}function W(){d?D():$()}async function K(B){let Z=B.target,G=Z.value,_e=Z.checked;o("toggling visibility %s \u2192 %s",G,String(_e));try{await s(G,_e)}catch(q){o("workspace visibility toggle failed: %o",q)}}function le(B){return B?c`
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
    `:c``}function Y(B,Z){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
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
                ${B.map(G=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${G.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${G.path}"
                        .checked=${!Z.has(G.path)}
                        @change=${K}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ql(G.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let B=t.getState(),Z=B.workspace?.current,G=B.workspace?.available||[],_e=new Set(B.workspace?.hidden||[]),q=Z?.path||G[0]?.path||"";if(G.length===0)return c``;let V=G.filter(ie=>!_e.has(ie.path)||ie.path===q);if(V.length<=1){let ie=V[0]||G[0],te=ql(ie.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${te}</span
          >
          ${Y(G,_e)}
          ${le(q)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${V.map(ie=>c`
              <option
                value="${ie.path}"
                ?selected=${ie.path===q}
                title="${ie.path}"
              >
                ${ql(ie.path)}
              </option>
            `)}
        </select>
        ${Y(G,_e)}
        ${le(q)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){lt(j(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),lt(c``,e)}}}var __=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Fl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function m_(e,t,n=Fl()){return{id:n,type:e,payload:t}}function g_(e={}){let t=zt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,d=new Map,u=[],m=new Map,y=new Set;function b(j){for(let O of Array.from(y))try{O(j)}catch{}}function $(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*j,B=Math.max(0,Math.round(j+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",B,i+1),a=setTimeout(()=>{a=null,Y()},B)}function D(j){try{s?.send(JSON.stringify(j))}catch(O){t("ws send failed",O)}}function W(){for(o="open",t("ws open"),b(o),i=0;u.length;){let j=u.shift();j&&D(j)}}function K(j){let O;try{O=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(d.has(O.id)){let Z=d.get(O.id);d.delete(O.id),O.ok?Z?.resolve(O.payload):Z?.reject(O.error||new Error("ws error"));return}let B=m.get(O.type);if(B&&B.size>0)for(let Z of Array.from(B))try{Z(O.payload)}catch(G){t("ws event handler error",G)}else t("ws received unhandled message type: %s",O.type)}function le(){o="closed",t("ws closed"),b(o);for(let[j,O]of d.entries())O.reject(new Error("ws disconnected")),d.delete(j);i+=1,$()}function Y(){if(!l)return;let j=r();try{s=new WebSocket(j),t("ws connecting %s",j),o="connecting",b(o),s.addEventListener("open",W),s.addEventListener("message",K),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(O){t("ws connect failed %o",O),$()}}return Y(),{send(j,O){if(!__.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let B=Fl(),Z=m_(j,O,B);return t("send %s id=%s",j,B),new Promise((G,_e)=>{d.set(B,{resolve:G,reject:_e,type:j}),s&&s.readyState===s.OPEN?D(Z):(t("queue %s id=%s (state=%s)",j,B,o),u.push(Z))})},on(j,O){m.has(j)||m.set(j,new Set);let B=m.get(j);return B?.add(O),()=>{B?.delete(O)}},onConnection(j){return y.add(j),()=>{y.delete(j)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,Y()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function pw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function fw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var jl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],b_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",_w="bdui.worker.done-range",h_=gf,y_="worker:queue",v_="ui:order",w_="ui:display-policy",k_="exec:presets",br="tab:board:closed",$_="beads-ui.board.closed-range";function mw(e){let t=zt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),a=document.getElementById("board-root"),l=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(i&&Mf(i),a&&l&&d&&u){let $e=function(x,C){let De="Request failed",Ne="";if(x&&typeof x=="object"){let p=x;if(typeof p.message=="string"&&p.message.length>0&&(De=p.message),typeof p.details=="string")Ne=p.details;else if(p.details&&typeof p.details=="object")try{Ne=JSON.stringify(p.details,null,2)}catch{Ne=""}}else typeof x=="string"&&x.length>0&&(De=x);let Je=C&&C.length>0?`Failed to load ${C}`:"Request failed";ne.open(Je,De,Ne)},ke=function(x){return`${fe.getState().workspace.current?.path||""}\0${x}`},qe=function(){Ee&&(Ee().catch(()=>{}),Ee=null),je=null,Ze=null},Me=function(x){it=x;let C=()=>{it!==x||fe.getState().selected_id!==x||(it=null,ut(x))};if(!J){at.then(C);return}C()},ht=function(x,C,De,Ne,Je){return De!==mt[C]?(Je().catch(()=>{}),!1):(x.set(Ne,Je),!0)},Lt=function(){let x=fe.getState();Ge(x.view==="board"),Le(x.view==="worker"),st(he(x)),Ae(x.view==="board"||x.view==="worker"||Ut||!!x.selected_id)},Nt=function(){let x=$r(Yt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},At=function(){let x=$r(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},Ge=function(x){if(x)for(let[C,De]of jl){if(ze.has(C)||gt.has(C))continue;let Ne=C===br?Nt():{type:De};try{Pe.register(C,Ne)}catch(v){t("register %s store failed: %o",C,v)}gt.add(C);let Je=mt.board,p=!1;ge.subscribeList(C,Ne).then(v=>{p=!ht(ze,"board",Je,C,v)}).catch(v=>{t("subscribe %s failed: %o",C,v),$e(v,"board")}).finally(()=>{gt.delete(C),p&&Lt()})}else me()},me=function(){mt.board+=1;for(let[x]of jl){let C=ze.get(x);C&&(C().catch(()=>{}),ze.delete(x));try{Pe.unregister(x)}catch(De){t("unregister %s failed: %o",x,De)}}},Le=function(x){if(!x){Ke();return}for(let[C,De]of b_){if(E.has(C)||gt.has(C))continue;let Ne=C===gr?At():{type:De};try{Pe.register(C,Ne)}catch(v){t("register %s store failed: %o",C,v)}gt.add(C);let Je=mt.worker,p=!1;ge.subscribeList(C,Ne).then(v=>{p=!ht(E,"worker",Je,C,v)}).catch(v=>{t("subscribe %s failed: %o",C,v),$e(v,"worker")}).finally(()=>{gt.delete(C),p&&Lt()})}},Ke=function(){mt.worker+=1;for(let[x]of b_){let C=E.get(x);C&&(C().catch(()=>{}),E.delete(x));try{Pe.unregister(x)}catch(De){t("unregister %s failed: %o",x,De)}}},Ae=function(x){if(!x){ct();return}z||(Ce("subscribe-worker-queue",{id:y_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),z=()=>Ce("unsubscribe-worker-queue",{id:y_}))},ct=function(){z&&(z().catch(()=>{}),z=null)},he=function(x){return x.view==="monitor"||x.selected_id!=null},st=function(x){if(!x){P();return}dt||(Ce("subscribe-monitor-pipeline",{id:h_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),dt=()=>Ce("unsubscribe-monitor-pipeline",{id:h_}))},P=function(){dt&&(dt().catch(()=>{}),dt=null)},ye=function(){N||(Ce("subscribe-ui-order",{id:v_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),N=()=>Ce("unsubscribe-ui-order",{id:v_}))},et=function(){N&&(N().catch(()=>{}),N=null),Dt.clear()},nt=function(){we||(Ce("subscribe-display-policy",{id:w_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),we=()=>Ce("unsubscribe-display-policy",{id:w_}))},pt=function(){we&&(we().catch(()=>{}),we=null),_t.clear()},St=function(){yt||(Ce("subscribe-impl-presets",{id:k_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),yt=()=>Ce("unsubscribe-impl-presets",{id:k_}))},Ve=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},an=function(x,C){on.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var m=$e,y=ke,b=qe,$=Me,D=ht,W=Lt,K=Nt,le=At,Y=Ge,j=me,O=Le,B=Ke,Z=Ae,G=ct,_e=he,q=st,V=P,ie=ye,te=et,Se=nt,Xe=pt,pe=St,X=Ve,Re=an;let Ie=document.getElementById("header-loading"),S=cd(Ie),ne=qp(e),ve=g_(),Ce=S.wrapSend((x,C)=>ve.send(x,C)),ge=nd(Ce),Pe=rd(),Ye=od(),$t=Dc(),Dt=sd(),_t=Ic(),T=Pc(),oe=Mc();ve.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&T.set({revision:C.revision,presets:C.presets})}),ve.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{$t.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{Dt.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),ve.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{_t.set(C.policy)}catch{}}),ve.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{oe.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),ve.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{oe.append(C.id,C.event)}catch{}}),ve.on("snapshot",x=>{let C=x,De=C&&typeof C.id=="string"?C.id:"",Ne=De?Pe.getStore(De):null;if(Ne&&C&&C.type==="snapshot")try{Ne.applyPush(C)}catch{}}),ve.on("upsert",x=>{let C=x,De=C&&typeof C.id=="string"?C.id:"",Ne=De?Pe.getStore(De):null;if(Ne&&C&&C.type==="upsert")try{Ne.applyPush(C)}catch{}}),ve.on("delete",x=>{let C=x,De=C&&typeof C.id=="string"?C.id:"",Ne=De?Pe.getStore(De):null;if(Ne&&C&&C.type==="delete")try{Ne.applyPush(C)}catch{}});let Ee=null,je=null,Ze=null,it=null,wt=()=>{},at=new Promise(x=>{wt=()=>x(void 0)}),J=!1,ee=!1;async function ut(x){let C=ke(x);if(C===je||C===Ze)return;Ze=C;let De=`detail:${x}`,Ne={type:"issue-detail",params:{id:x}};try{Pe.register(De,Ne)}catch(Je){t("register detail store failed: %o",Je)}try{let Je=await ge.subscribeList(De,Ne);if(fe.getState().selected_id!==x||ke(x)!==C){await Je().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=Je,je=C}catch(Je){t("detail subscribe failed: %o",Je),$e(Je,"issue details")}finally{Ze===C&&(Ze=null)}}let ze=new Map,gt=new Set,mt={board:0,worker:0},Ut=!1,Yt=Ao;try{let x=window.localStorage.getItem($_);ua(x)&&(Yt=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(_w);x!==null&&(Mt=Kn(x))}catch{}async function L(x){if(!ua(x)||x===Yt)return;Yt=x;try{window.localStorage.setItem($_,x)}catch{}let C=ze.get(br);if(!C)return;ze.delete(br),await C().catch(()=>{});let De=Nt();try{Pe.register(br,De)}catch(Ne){t("register %s store failed: %o",br,Ne)}try{let Ne=await ge.subscribeList(br,De);ze.set(br,Ne)}catch(Ne){t("re-subscribe %s failed: %o",br,Ne),$e(Ne,"board")}}async function Q(x){let C=Kn(x);if(C===Mt)return;Mt=C;let De=E.get(gr);if(!De)return;E.delete(gr),await De().catch(()=>{});let Ne=At();try{Pe.register(gr,Ne)}catch(Je){t("register %s store failed: %o",gr,Je)}try{let Je=await ge.subscribeList(gr,Ne);E.set(gr,Je)}catch(Je){t("re-subscribe %s failed: %o",gr,Je),$e(Je,"worker")}}let E=new Map,z=null,dt=null,N=null,we=null,yt=null;async function Zt(){we=null,_t.clear(),yt=null,T.clear(),z=null,dt=null,ze.clear(),E.clear(),mt.board+=1,mt.worker+=1,St();let x=fe.getState().workspace.current?.path;if(x)try{await ve.send("set-workspace",{path:x})}catch(De){t("workspace restore after reconnect failed: %o",De);return}nt();let C=fe.getState();Ge(C.view==="board"),Le(C.view==="worker"),st(he(C)),Ae(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Tt(){t("clearing all subscriptions for workspace switch"),me(),Ke(),ct(),Ye.clear(),et(),ye(),pt(),nt(),qe();let x=fe.getState();if(x.selected_id)try{Pe.unregister(`detail:${x.selected_id}`)}catch{}let C=fe.getState();Ge(C.view==="board"),Le(C.view==="worker"),st(he(C)),Ae(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&Me(C.selected_id)}async function rn(x){t("requesting workspace switch to %s",x),ee=!0;try{let C=await ve.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(fe.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Tt(),de("Switched to "+Ve(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),de("Failed to switch workspace","error",3e3),C}finally{ee=!1}}async function Wt(x){t("requesting workspace git pull for %s",x);try{let C=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let De=C?.status;if(De==="up_to_date"){de("Already up to date","success",2e3);return}if(De==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Ve(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let De=C?.code,Ne=C?.message;if(De==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(De==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(De==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let Je=Ne?`: ${Ne}`:"";throw de(`Git pull failed${Je}`,"error",3e3),C}}async function hn(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await ve.send("set-workspace-visibility",{path:x,visible:C}),await Kt()}catch(De){t("workspace visibility update failed: %o",De),de("Failed to update project visibility","error",3e3)}}async function Kt(){try{let x=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(p=>({path:p.path,database:p.database,pid:p.pid,version:p.version})),De=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,Ne=Array.isArray(x.hidden)?x.hidden.filter(p=>typeof p=="string"):[];fe.setState({workspace:{current:De,available:C,hidden:Ne}});let Je=window.localStorage.getItem("beads-ui.workspace");Je&&(!C.some(v=>v.path===Je)||Ne.includes(Je)?window.localStorage.removeItem("beads-ui.workspace"):De&&Je!==De.path&&(t("restoring saved workspace preference: %s",Je),await rn(Je)))}}catch(x){t("failed to load workspaces: %o",x)}}ve.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(fe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Kt(),Tt())});let Xt=!1;if(typeof ve.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(Xt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&Xt&&(Xt=!1,de("Reconnected","success",2200),fw(fe,(De,Ne)=>{t(`${De}: %o`,Ne)}),Zt())};ve.onConnection(x)}let yn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(yn=x)}catch(x){t("view parse error: %o",x)}let fe=ld({config:pw(),view:yn});ve.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let De=fe.getState().workspace.current?.path;if(typeof De=="string"&&De.length>0&&C.root_dir!==De){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{Ye.set(C.queue)}catch{}});let A=id(fe);A.start();let ue=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Oe=async(x,C)=>{try{return await Ce(x,C)}catch(De){if(ue.has(x))throw De;return[]}};hf({global_element:r,repo_element:s},fe,A);let kt=document.getElementById("workspace-picker");kt&&f_(kt,fe,rn,Wt,hn);let Rt=kf(e,(x,C)=>Ce(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Rt.open())}catch{}let Et=Sf(e,{policyStore:_t,queueStore:Ye,implPresetStore:T,transport:(x,C)=>Ce(x,C),onOpenChange:x=>{let C=Ut;Ut=x,Lt(),C&&x===!1&&It.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of jl)for(let De of Pe.snapshotFor(C)||[]){let Ne=De.labels;if(Array.isArray(Ne))for(let Je of Ne)typeof Je=="string"&&Je.length>0&&x.add(Je)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>Et.open()))}catch{}let Vt=document.createElement("div");Vt.className="md-viewer-root",document.body.appendChild(Vt);let on=Ni(Vt,{getWorkspacePath:()=>fe.getState().workspace.current?.path}),Sn=xd(a,{gotoIssue:x=>A.gotoIssue(x),issueStores:Pe,transport:Oe,workerQueueStore:Ye,uiOrderStore:Dt,displayPolicyStore:_t,closedRange:Yt,onClosedRangeChange:x=>{L(x)},onNewIssue:()=>Rt.open(),openDoc:an}),It=Nl(l,{transport:Oe,issueStores:Pe,queueStore:Ye,sessionLogStore:oe,uiOrderStore:Dt,gotoIssue:x=>fe.setState({selected_id:x}),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>rn(x),openDoc:an,doneRange:Mt,onDoneRangeChange:x=>{Q(x)}}),ln=bf(d,{transport:Oe,pipelineStore:$t,execPresetStore:T,sessionLogStore:oe,router:A,gotoIssue:x=>A.gotoIssue(x),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:x=>rn(x),openDoc:an}),pn=Np(u,{issueStores:Pe,transport:Oe,queueStore:Ye,execPresetStore:T,sessionLogStore:oe,getWorkspacePath:()=>fe.getState().workspace.current?.path,mdViewer:on,depCandidates:()=>{let x=$t.get();if(x===null)return null;let C=$t.getWorkspacesState(),De=fe.getState();if(De.view==="monitor")return Va(x,C);let Ne=De.workspace.current?.path;return Ne?Va(x,C,{root_dir:Ne}):null},subscribeCandidates:x=>$t.subscribe(x),onDepChanged:({type:x,a:C,b:De})=>{let Ne=ln;x==="dep-add"&&Ne&&typeof Ne.recorrectSharedLane=="function"&&Ne.recorrectSharedLane(x,C,De)},onNavigate:(x,C)=>{let De=()=>{fe.getState().view==="worker"?fe.setState({selected_id:x}):A.gotoIssue(x)},Ne=fe.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!Ne||C===Ne){De();return}Promise.resolve(rn(C)).then(De).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=fe.getState();fe.setState({selected_id:null});try{A.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{Et.open("execution")}}),fn=fe.getState().selected_id;fn&&(u.hidden=!1,pn.load(fn),Me(fn)),fe.subscribe(x=>{let C=x.selected_id;C?(u.hidden=!1,pn.load(C),ee||Me(C)):(pn.clear(),u.hidden=!0,qe())});let Xn=x=>{a.hidden=x.view!=="board",l.hidden=x.view!=="worker",d.hidden=x.view!=="monitor",o&&o.classList.toggle("is-quiet",x.view==="monitor"),Ge(x.view==="board"),Le(x.view==="worker"),st(he(x)),Ae(x.view==="board"||x.view==="worker"||Ut||!!x.selected_id),!x.selected_id&&x.view==="board"&&Sn.load(),x.view==="worker"&&It.load(),x.view==="monitor"?ln.load():ln.pause(),window.localStorage.setItem("beads-ui.view",x.view)};fe.subscribe(Xn),Xn(fe.getState()),ye(),nt(),St(),Kt().finally(()=>{J=!0,wt()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,De=String(x.key||"").toLowerCase(),Ne=x.target,Je=Ne&&Ne.tagName?String(Ne.tagName).toLowerCase():"",p=Je==="input"||Je==="textarea"||Je==="select"||Ne&&typeof Ne.isContentEditable=="boolean"&&Ne.isContentEditable;C&&De==="n"&&(p||(x.preventDefault(),Rt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&mw(t)});export{mw as bootstrap,pw as readBootstrapConfig,fw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
